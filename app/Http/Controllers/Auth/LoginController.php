<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use \Nwidart\Modules\Facades\Module;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */

     /**
     * Get the needed authorization credentials from the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    protected function credentials(\Illuminate\Http\Request $request)
    {
        return ['email' => $request->{$this->username()}, 'password' => $request->password, 'status' => 1];
    }

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function showLoginForm(){
        $allModules = Module::all();
        $allEnabledModules = Module::allEnabled();

        $ModulesInstalled = [];
        $ModulesEnabled = [];

        foreach($allModules as $key => $modules_name){
            $ModulesInstalled[] = $key;
        }

        foreach($allEnabledModules as $key => $modules_name){
            $ModulesEnabled[] = $key;
        }

        return view('auth.login',[
            'ModulesInstalled' => $ModulesInstalled, 
            'ModulesEnabled' => $ModulesEnabled, 
        ]);
    }

    /**
     * Handle a login request to the application.
     * Only allow admins (role_id = 1) to login to CRM.
     * Members (role_id = 2) and Coaches (role_id = 3) should use the mobile app.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(Request $request)
    {
        $this->validateLogin($request);

        // Check if user exists and get their role before attempting login
        $user = \App\Models\User::where('email', $request->email)->first();
        
        if ($user) {
            // Check if user is a member (role_id = 2) or coach (role_id = 3)
            // Only admins (role_id = 1) can access CRM
            if (isset($user->role_id) && ($user->role_id == 2 || $user->role_id == 3)) {
                // Log the attempt
                \Log::warning('CRM login attempt blocked for non-admin user', [
                    'email' => $request->email,
                    'role_id' => $user->role_id,
                    'ip' => $request->ip(),
                ]);

                // Check if request expects JSON (axios requests typically send Accept: application/json)
                $wantsJson = $request->expectsJson() || $request->wantsJson() || $request->ajax() || 
                             $request->header('Accept') === 'application/json' ||
                             str_contains($request->header('Accept', ''), 'application/json');

                // Return error response - always return JSON for API-like requests
                if ($wantsJson || $request->is('api/*')) {
                    return response()->json([
                        'message' => 'Access denied. This login is for administrators only. Members and coaches should use the mobile app. Please download the app to access your account.',
                        'errors' => ['email' => ['Access denied. Please use the mobile app to login.']]
                    ], 403);
                }

                return back()->withErrors([
                    'email' => 'Access denied. This login is for administrators only. Members and coaches should use the mobile app. Please download the app to access your account.',
                ])->withInput($request->only('email'));
            }
        }

        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        if (method_exists($this, 'hasTooManyLoginAttempts') &&
            $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if ($this->attemptLogin($request)) {
            if ($request->hasSession()) {
                $request->session()->put('auth.password_confirmed_at', time());
            }

            return $this->sendLoginResponse($request);
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }

    /**
     * After CRM (web) login succeeds, also set a Passport access token cookie so
     * the SPA can call /api/* routes protected by token middleware.
     *
     * Note: Mobile apps continue using Authorization: Bearer <token> and are not impacted.
     */
    protected function authenticated(Request $request, $user)
    {
        try {
            $tokenResult = $user->createToken('Access Token');
            $accessToken = $tokenResult->accessToken;

            // Browsers generally reject Domain=.localhost, so for localhost/IP we omit Domain (host-only cookie).
            $host = strtolower((string) $request->getHost());
            $isLocal = in_array($host, ['localhost', '127.0.0.1', '::1'], true);
            
            // Use host-only cookie (no Domain) for localhost and for known shared/public-suffix hosts
            // (e.g. *.cloudwaysapps.com) so the cookie is actually stored and sent by the browser.
            $publicSuffixHosts = ['cloudwaysapps.com', 'cloudwaysapps'];
            $parts = $host ? explode('.', $host) : [];
            $isLikelyPublicSuffix = !$isLocal && count($parts) >= 2
                && in_array($parts[count($parts) - 2] . '.' . $parts[count($parts) - 1], $publicSuffixHosts, true);

            $domain = null;
            if (!$isLocal && $host && !$isLikelyPublicSuffix) {
                if (count($parts) >= 2) {
                    $domain = '.' . $parts[count($parts) - 2] . '.' . $parts[count($parts) - 1];
                } else {
                    $domain = $host;
                }
            }

            // Expire far in the future (matches existing BaseController behavior)
            $expires = time() + 2147483647;

            $secure = $request->isSecure();

            // Use options-array signature so we can reliably omit Domain on localhost/IP hosts.
            // HttpOnly=false so VueCookies can read it and axios interceptor can attach Authorization header.
            $baseOptions = [
                'expires' => $expires,
                'path' => '/',
                'secure' => $secure,
                'httponly' => false,
                'samesite' => 'Lax',
            ];

            // Clear old cookie value (best-effort) - try both with and without domain
            $forgetOptions = $baseOptions;
            $forgetOptions['expires'] = time() - 3600;
            
            // Clear cookie without domain first (for existing cookies)
            setcookie('Stocky_token', '', $forgetOptions);
            
            // Then clear with domain if set
            if ($domain) {
                $forgetOptions['domain'] = $domain;
                setcookie('Stocky_token', '', $forgetOptions);
            }

            // Set raw cookie (NOT encrypted) for this host
            $setOptions = $baseOptions;
            if ($domain) {
                $setOptions['domain'] = $domain;
            }
            setcookie('Stocky_token', $accessToken, $setOptions);
        } catch (\Throwable $e) {
            // Don't block login if token creation fails; API calls will fail and surface clearly.
            \Log::warning('LoginController: failed to create Stocky_token after login', [
                'user_id' => $user->id ?? null,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Return a clear message for invalid login credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function sendFailedLoginResponse(Request $request)
    {
        $email = $request->{$this->username()};
        $user = \App\Models\User::where('email', $email)->first();

        if (!$user) {
            $message = 'Incorrect email or password.';
        } elseif (!Hash::check($request->password, $user->password)) {
            $message = 'Incorrect password. Please try again.';
        } elseif ((int) $user->status !== 1) {
            $message = 'This account is not active. Please contact support.';
        } else {
            $message = 'Unable to sign in. Please try again or contact support.';
        }

        throw ValidationException::withMessages([
            $this->username() => [$message],
        ]);
    }
}
