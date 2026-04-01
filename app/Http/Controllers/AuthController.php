<?php
namespace App\Http\Controllers;

use App\Http\Controllers\BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends BaseController
{

    //--------------- Function Login ----------------\\

    public function getAccessToken(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        // Check if user exists and get their role before attempting login
        $user = User::where('email', $request->email)->first();
        
        if ($user) {
            // Check if user is a member (role_id = 2) or coach (role_id = 3)
            // Only admins (role_id = 1) can access CRM
            if (isset($user->role_id) && ($user->role_id == 2 || $user->role_id == 3)) {
                // Log the attempt
                \Log::warning('CRM API login attempt blocked for non-admin user', [
                    'email' => $request->email,
                    'role_id' => $user->role_id,
                    'ip' => $request->ip(),
                ]);

                return response()->json([
                    'message' => 'Access denied. This login is for administrators only. Members and coaches should use the mobile app.',
                    'status' => false,
                ], 403);
            }
        }

        $credentials = request(['email', 'password']);

        if (Auth::attempt($credentials)) {
            $userStatus = Auth::User()->status;
            if ($userStatus === 0) {
                return response()->json([
                    'message' => 'This user not active',
                    'status' => 'NotActive',
                ]);
            }

        } else {
            return response()->json([
                'message' => 'Incorrect Login',
                'status' => false,
            ]);
        }

        $user = auth()->user();
        $tokenResult = $user->createToken('Access Token');
        $token = $tokenResult->token;
        $this->setCookie('Stocky_token', $tokenResult->accessToken);

        return response()->json([
            'Stocky_token' => $tokenResult->accessToken,
            'username' => Auth::User()->username,
            'status' => true,
        ]);
    }

    //--------------- Function Logout ----------------\\

    public function logout()
    {
        if (Auth::check()) {
            $user = Auth::user()->token();
            $user->revoke();
            $this->destroyCookie('Stocky_token');
            return response()->json('success');
        }

    }

}
