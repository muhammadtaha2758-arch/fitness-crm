<?php
namespace App\Http\Controllers;

use App\Mail\Password_Reset_Request;
use App\Mail\Password_Reset_Success;
use App\Models\PasswordReset;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class PasswordResetController extends BaseController
{
    /**
     * Create token password reset
     *
     * @param  [string] email
     * @return [string] message
     */
    public function create(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['status' => false,
                'message' => 'We can\'t find a user with that e-mail address.',
            ]);
        }
        
        // Check status column (prefer 'status', fallback to 'statut' for compatibility)
        $userStatus = isset($user->status) ? $user->status : (isset($user->statut) ? $user->statut : null);
        if (!$userStatus || $userStatus == 0) {
            return response()->json(['status' => false,
                'message' => 'We can\'t find a user with that e-mail address.',
            ]);
        }


        $passwordReset = PasswordReset::updateOrCreate(
            ['email' => $user->email],
            [
                'email' => $user->email,
                'token' => Str::random(60),
            ]
        );
        if ($user && $passwordReset) {
            // Pass gym_id from user for proper email configuration
            $this->Set_config_mail($user->gym_id);
        }
        // Set_config_mail => BaseController
        $url = url('/password/find/' . $passwordReset->token);
        
        // Try to send email, catch errors gracefully
        try {
            Mail::to($user->email)->send(new Password_Reset_Request($passwordReset->token, $url));
        } catch (\Exception $e) {
            // Log the error for admin debugging
            \Log::error('Failed to send password reset email', [
                'email' => $user->email,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            // Return user-friendly error message
            return response()->json([
                'status' => false,
                'message' => 'We were unable to send the password reset email. Please contact support or try again later.',
                'error_code' => 'EMAIL_SEND_FAILED'
            ], 200);
        }

        return response()->json(['status' => true,
            'message' => 'We have e-mailed your password reset link!',
        ], 200);
    }
    /**
     * Find token password reset
     *
     * @param  [string] $token
     * @return [string] message
     * @return [json] passwordReset object
     */
    public function find($token)
    {
        $passwordReset = PasswordReset::where('token', $token)
            ->first();
        if (!$passwordReset) {
            return response()->json([
                'message' => 'This password reset token is invalid.',
                'success' => false,
            ]);
        }

        // Token valid for 24 hours (invitation and reset links)
        $expiryMinutes = (int) env('PASSWORD_RESET_EXPIRY_MINUTES', 1440); // default 24h
        if ($expiryMinutes < 60) {
            $expiryMinutes = 1440;
        }
        if (Carbon::parse($passwordReset->updated_at)->addMinutes($expiryMinutes)->isPast()) {
            $passwordReset->delete();
            return response()->json([
                'message' => 'This password reset link has expired. Please request a new one.',
                'success' => false,
            ]);
        }

        // Pass email to view so it can be pre-filled (more secure than browser autofill)
        return view('auth.passwords.reset', [
            "token" => $token,
            "email" => $passwordReset->email
        ]);
    }
    /**
     * Reset password

     */
    public function reset(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|confirmed',
            'token' => 'required|string',
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json([
                'message' => 'We can\'t find a user with that e-mail address.',
                'status' => false,
                'code' => 2,
            ]);
        }

        $passwordReset = PasswordReset::where([
            ['token', $request->token],
            ['email', $request->email],
        ])->first();
        if (!$passwordReset) {
            return response()->json([
                'message' => 'This password reset token is invalid.',
                'status' => false,
                'code' => 3,
            ]);
        }

        $user->password = bcrypt($request->password);
        $user->password_change_required = false; // Password set here; no need to ask again on onboarding
        $user->save();
        $passwordReset->delete();
        // Pass gym_id from user for proper email configuration
        $this->Set_config_mail($user->gym_id); // Set_config_mail => BaseController
        Mail::to($request->email)->send(new Password_Reset_Success());

        return response()->json([
            'user' => $user,
            'message' => 'Your Password has been changed.',
            'status' => true,
            'code' => 1,
        ]);
    }
}
