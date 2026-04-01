<?php

namespace App\Http\Controllers;

use App\Models\Coach;
use Illuminate\Http\Request;

class CoachPasswordSetupController extends Controller
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
            return view('auth.passwords.setup-coach-error', [
                'error' => 'Password setup token is required.',
                'title' => 'Invalid Link'
            ]);
        }

        // Validate token format
        if (strlen($token) !== 60) {
            return view('auth.passwords.setup-coach-error', [
                'error' => 'Invalid password setup token format.',
                'title' => 'Invalid Link'
            ]);
        }

        // Check if token exists and is not expired
        $coach = Coach::where('password_setup_token', $token)
            ->where('password_setup_token_expires_at', '>', now())
            ->first();

        if (!$coach) {
            return view('auth.passwords.setup-coach-error', [
                'error' => 'This password setup token is invalid or has expired. Please contact support for a new link.',
                'title' => 'Link Expired or Invalid'
            ]);
        }

        // Check if password is already set
        if ($coach->password_hash && !$coach->password_setup_required) {
            return view('auth.passwords.setup-coach-error', [
                'error' => 'This setup link has already been used. Please use the login page to access your account.',
                'title' => 'Link Already Used'
            ]);
        }

        // Token is valid, show the setup form
        return view('auth.passwords.setup-coach', ['token' => $token]);
    }
}

