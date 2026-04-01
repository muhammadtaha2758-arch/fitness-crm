<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;

class MemberPasswordResetController extends Controller
{
    /**
     * Display the password reset form for the given token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showResetForm(Request $request)
    {
        $token = $request->query('token');
        $email = $request->query('email');

        if (!$token) {
            return view('auth.passwords.setup-error', [
                'error' => 'Password reset token is required.',
                'title' => 'Invalid Link'
            ]);
        }

        // Validate token format
        if (strlen($token) !== 60) {
            return view('auth.passwords.setup-error', [
                'error' => 'Invalid password reset token format.',
                'title' => 'Invalid Link'
            ]);
        }

        // Check if token exists and is not expired
        $member = Member::where('password_setup_token', $token)
            ->where('password_setup_token_expires_at', '>', now())
            ->first();

        if (!$member) {
            return view('auth.passwords.setup-error', [
                'error' => 'This password reset token is invalid or has expired. Please request a new password reset link.',
                'title' => 'Link Expired or Invalid'
            ]);
        }

        // Verify email matches if provided
        if ($email && $member->email !== $email) {
            return view('auth.passwords.setup-error', [
                'error' => 'The email address does not match the reset token.',
                'title' => 'Invalid Request'
            ]);
        }

        // Token is valid, show the reset form
        return view('auth.passwords.reset-password', [
            'token' => $token,
            'email' => $member->email
        ]);
    }
}

