<?php

namespace App\Http\Controllers;

use App\Mail\AccountDisableConfirmation;
use App\Models\AccountDisableRequest;
use App\Models\Coach;
use App\Models\Member;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AccountDisableController extends BaseController
{
    /**
     * Request account disable: validate email + password, send confirmation email.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function requestDisable(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'We can\'t find a user with that email address.',
            ], 200);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid credentials.',
            ], 200);
        }

        $userStatus = $user->status ?? null;
        if ($userStatus === 0) {
            return response()->json([
                'status' => false,
                'message' => 'This account is already disabled.',
            ], 200);
        }

        $existing = AccountDisableRequest::where('email', $user->email)->first();
        if ($existing) {
            $existing->delete();
        }

        $token = Str::random(60);
        AccountDisableRequest::create([
            'email' => $user->email,
            'token' => $token,
            'expires_at' => Carbon::now()->addHours(24),
        ]);

        $this->Set_config_mail($user->gym_id);
        $url = url('/account/disable/confirm/' . $token);

        try {
            Mail::to($user->email)->send(new AccountDisableConfirmation($url));
        } catch (\Exception $e) {
            \Log::error('Failed to send account disable confirmation email', [
                'email' => $user->email,
                'error' => $e->getMessage(),
            ]);
            return response()->json([
                'status' => false,
                'message' => 'We were unable to send the confirmation email. Please try again later.',
            ], 200);
        }

        return response()->json([
            'status' => true,
            'message' => 'A confirmation email has been sent to your email address. Please click the link in the email to confirm disabling your account.',
        ], 200);
    }

    /**
     * Show the confirmation page (Blade view with link/button).
     *
     * @param string $token
     * @return \Illuminate\View\View|\Illuminate\Http\RedirectResponse
     */
    public function showConfirmForm($token)
    {
        $request = AccountDisableRequest::where('token', $token)->first();

        if (!$request) {
            return redirect('/login')->with('error', 'This confirmation link is invalid or has expired.');
        }

        if ($request->expires_at && Carbon::parse($request->expires_at)->isPast()) {
            $request->delete();
            return redirect('/login')->with('error', 'This confirmation link has expired.');
        }

        return view('auth.account_disable_confirm', [
            'token' => $token,
        ]);
    }

    /**
     * Confirm disable: disable the user account and related member/coach if any.
     *
     * @param string $token
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function confirmDisable($token)
    {
        $disableRequest = AccountDisableRequest::where('token', $token)->first();

        if (!$disableRequest) {
            if (request()->wantsJson()) {
                return response()->json([
                    'status' => false,
                    'message' => 'This confirmation link is invalid or has expired.',
                ], 400);
            }
            return redirect('/login')->with('error', 'This confirmation link is invalid or has expired.');
        }

        if ($disableRequest->expires_at && Carbon::parse($disableRequest->expires_at)->isPast()) {
            $disableRequest->delete();
            if (request()->wantsJson()) {
                return response()->json([
                    'status' => false,
                    'message' => 'This confirmation link has expired.',
                ], 400);
            }
            return redirect('/login')->with('error', 'This confirmation link has expired.');
        }

        $user = User::where('email', $disableRequest->email)->first();
        if (!$user) {
            $disableRequest->delete();
            if (request()->wantsJson()) {
                return response()->json([
                    'status' => false,
                    'message' => 'User not found.',
                ], 400);
            }
            return redirect('/login')->with('error', 'User not found.');
        }

        $user->status = 0;
        $user->save();

        if ($user->member_id) {
            $member = Member::find($user->member_id);
            if ($member && isset($member->Statuses)) {
                $member->Statuses = 'inactive';
                $member->save();
            }
        }

        if ($user->coach_id) {
            $coach = Coach::find($user->coach_id);
            if ($coach && isset($coach->status)) {
                $coach->status = 0;
                $coach->save();
            }
        }

        $disableRequest->delete();

        if (request()->wantsJson()) {
            return response()->json([
                'status' => true,
                'message' => 'Your account has been disabled successfully.',
            ], 200);
        }

        return redirect('/login')->with('success', 'Your account has been disabled successfully.');
    }
}
