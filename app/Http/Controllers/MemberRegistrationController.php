<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;

class MemberRegistrationController extends Controller
{
    /**
     * Display the registration completion form.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showRegistrationForm(Request $request)
    {
        $token = $request->query('token');

        if (!$token) {
            return view('auth.registration.error', [
                'error' => 'Registration token is required.',
                'title' => 'Invalid Link'
            ]);
        }

        // Verify token by checking if it's a valid access token
        // In a real implementation, you'd verify this against your token storage
        // For now, we'll use the token to get member info via API
        // The Vue component will handle the API call with the token
        
        // Show registration form - token will be validated by API
        return view('auth.registration.complete', [
            'token' => $token
        ]);
    }
}

