<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;

class MemberPasswordSetupController extends Controller
{
    /**
     * Display the password setup form for the given token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|\Illuminate\Http\JsonResponse
     */
    public function showSetupForm(Request $request)
    {
        $token = $request->query('token');

        if (!$token) {
            return view('auth.passwords.setup-error', [
                'error' => 'Password setup token is required.',
                'title' => 'Invalid Link'
            ]);
        }

        // Validate token format
        if (strlen($token) !== 60) {
            return view('auth.passwords.setup-error', [
                'error' => 'Invalid password setup token format.',
                'title' => 'Invalid Link'
            ]);
        }

        // Check if token exists and is not expired
        $member = Member::where('password_setup_token', $token)
            ->where('password_setup_token_expires_at', '>', now())
            ->first();

        if (!$member) {
            return view('auth.passwords.setup-error', [
                'error' => 'This password setup token is invalid or has expired. Please contact support for a new link.',
                'title' => 'Link Expired or Invalid'
            ]);
        }

        // Check if password is already set
        if ($member->password_hash && !$member->password_setup_required) {
            return view('auth.passwords.setup-error', [
                'error' => 'This setup link has already been used. Please use the login page to access your account.',
                'title' => 'Link Already Used'
            ]);
        }

        // Token is valid, show the setup form
        return view('auth.passwords.setup', ['token' => $token]);
    }

    /**
     * Display the invitation form for the given invitation code.
     * Handles format: {member_id}-{token_prefix}
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $invitationCode
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showInvitationForm(Request $request, $invitationCode)
    {
        // Parse invitation code: format is {member_id}-{token_prefix}
        $parts = explode('-', $invitationCode, 2);
        
        if (count($parts) !== 2) {
            return view('auth.passwords.setup-error', [
                'error' => 'Invalid invitation link format.',
                'title' => 'Invalid Link'
            ]);
        }

        $memberId = $parts[0];
        $tokenPrefix = $parts[1];

        // Find member by ID
        $member = Member::find($memberId);

        if (!$member) {
            return view('auth.passwords.setup-error', [
                'error' => 'Invalid invitation link. Member not found.',
                'title' => 'Invalid Link'
            ]);
        }

        // Check if token exists and starts with the prefix
        // Use substr for PHP 7 compatibility instead of str_starts_with (PHP 8+)
        if (!$member->password_setup_token || substr($member->password_setup_token, 0, strlen($tokenPrefix)) !== $tokenPrefix) {
            return view('auth.passwords.setup-error', [
                'error' => 'This invitation link is invalid or has expired. Please contact support for a new link.',
                'title' => 'Link Expired or Invalid'
            ]);
        }

        // Check if token has expired
        if ($member->password_setup_token_expires_at && $member->password_setup_token_expires_at->isPast()) {
            return view('auth.passwords.setup-error', [
                'error' => 'This invitation link has expired. Please contact support for a new link.',
                'title' => 'Link Expired'
            ]);
        }

        // Check if password is already set
        if ($member->password_hash && !$member->password_setup_required) {
            return view('auth.passwords.setup-error', [
                'error' => 'This invitation link has already been used. Please use the login page to access your account.',
                'title' => 'Link Already Used'
            ]);
        }

        // Token is valid, show the password setup form
        return view('auth.passwords.setup', [
            'token' => $member->password_setup_token,
            'member' => $member
        ]);
    }
}

