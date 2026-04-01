<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Http\Controllers\BaseController;
use App\Mail\MemberSignupVerificationEmail;
use App\Models\Member;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class MemberSignupController extends Controller
{
    /**
     * Step 1: Member submits signup form. We store pending data and send verification email.
     * Account is created only after email is verified (verifyEmail).
     */
    public function requestSignup(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'firstname' => 'required|string|max:255',
                'lastname' => 'required|string|max:255',
                'email' => 'required|email',
                'gender' => 'nullable|string|in:male,female,Male,Female',
                'password' => 'required|string|min:6',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $email = $request->email;

            // Do not allow if already a member
            if (Member::where('email', $email)->exists()) {
                return response()->json([
                    'success' => false,
                    'message' => 'An account with this email already exists. Please log in or use a different email.',
                ], 422);
            }

            // Do not allow if already a user (e.g. coach/admin)
            if (User::where('email', $email)->exists()) {
                return response()->json([
                    'success' => false,
                    'message' => 'This email is already registered.',
                ], 422);
            }

            // Delete any existing pending verification for this email
            DB::table('member_signup_verifications')->where('email', $email)->delete();

            $token = Str::random(60);
            $expiresAt = now()->addHours(24);
            $gymId = (int) ($request->input('gym_id', 1));

            DB::table('member_signup_verifications')->insert([
                'email' => $email,
                'token' => $token,
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'gender' => $request->filled('gender') ? $request->gender : null,
                'password_hash' => Hash::make($request->password),
                'gym_id' => $gymId,
                'expires_at' => $expiresAt,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Build verification URL (backend API URL so clicking the link in email hits verify-email)
            $baseUrl = rtrim(config('app.url'), '/');
            $verifyUrl = $baseUrl . '/api/mobile/auth/verify-email?token=' . $token;

            $gymName = config('app.name', 'Fitness App');
            try {
                $mailConfigSet = BaseController::Set_config_mail($gymId);
                if (!$mailConfigSet) {
                    // Fallback: require at least .env mail (e.g. MAIL_MAILER=smtp) for signup emails
                    $defaultMailer = config('mail.default');
                    if (!$defaultMailer || $defaultMailer === 'array' || $defaultMailer === 'log') {
                        \Log::warning('Member signup: mail not configured', ['gym_id' => $gymId]);
                        return response()->json([
                            'success' => false,
                            'message' => 'Email is not configured. Please contact support to enable signup emails.',
                        ], 503);
                    }
                }
                // Send synchronously so we don't depend on queue (database/sync) being configured
                Mail::to($email)->send(new MemberSignupVerificationEmail(
                    $request->firstname,
                    $request->lastname,
                    $verifyUrl,
                    $gymName
                ));
            } catch (\Exception $e) {
                \Log::error('Member signup verification email failed', [
                    'message' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString(),
                ]);
                $userMessage = 'We could not send the verification email. Please try again later or contact support.';
                if (config('app.debug')) {
                    $userMessage .= ' (Debug: ' . $e->getMessage() . ')';
                }
                return response()->json([
                    'success' => false,
                    'message' => $userMessage,
                ], 500);
            }

            return response()->json([
                'success' => true,
                'message' => 'Verification email sent. Please check your inbox and click the link to confirm your email and create your account.',
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Member signup request error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error. Please try again later.',
            ], 500);
        }
    }

    /**
     * Step 2: User clicks link in email. We create Member + User and clear verification.
     */
    public function verifyEmail(Request $request)
    {
        try {
            $token = $request->query('token') ?? $request->input('token');
            if (!$token) {
                return $this->verifyEmailResponse($request, false, 'Invalid verification link.');
            }

            $row = DB::table('member_signup_verifications')
                ->where('token', $token)
                ->where('expires_at', '>', now())
                ->first();

            if (!$row) {
                return $this->verifyEmailResponse($request, false, 'This verification link is invalid or has expired. Please sign up again.');
            }

            // Re-check in case of race
            if (Member::where('email', $row->email)->exists()) {
                DB::table('member_signup_verifications')->where('token', $token)->delete();
                return $this->verifyEmailResponse($request, true, 'Your account is already active. You can log in to the app.');
            }

            $membername = strtolower(Str::slug($row->firstname . '-' . $row->lastname));
            $baseMembername = $membername;
            $counter = 1;
            while (Member::where('membername', $membername)->exists()) {
                $membername = $baseMembername . $counter;
                $counter++;
            }

            $member = Member::create([
                'gym_id' => $row->gym_id,
                'firstname' => $row->firstname,
                'lastname' => $row->lastname,
                'membername' => $membername,
                'email' => $row->email,
                'password_hash' => $row->password_hash,
                'gender' => $row->gender ?? null,
                'mobile_phone' => null,
                'landline_phone' => null,
                'Statuses' => 'active',
            ]);

            $username = strtolower(str_replace(' ', '', $member->firstname . $member->lastname)) . $member->id;
            $originalUsername = $username;
            $counter = 1;
            while (User::where('username', $username)->exists()) {
                $username = $originalUsername . $counter;
                $counter++;
            }

            User::create([
                'firstname' => $member->firstname,
                'lastname' => $member->lastname,
                'username' => $username,
                'email' => $member->email,
                'phone' => $member->mobile_phone ?? $member->landline_phone ?? '',
                'password' => $row->password_hash,
                'status' => 1,
                'role_id' => 2,
                'gym_id' => $member->gym_id,
                'member_id' => $member->id,
            ]);

            DB::table('member_signup_verifications')->where('token', $token)->delete();

            return $this->verifyEmailResponse($request, true, 'Your account has been created. You can now log in to the app.');
        } catch (\Exception $e) {
            \Log::error('Member signup verify error: ' . $e->getMessage());
            return $this->verifyEmailResponse($request, false, 'Something went wrong. Please try signing up again.');
        }
    }

    /**
     * Return JSON or HTML response for verify-email (e.g. link opened in browser).
     */
    private function verifyEmailResponse(Request $request, $success, $message)
    {
        $wantsJson = $request->expectsJson() || $request->ajax() || $request->wantsJson();
        if ($wantsJson) {
            return response()->json([
                'success' => $success,
                'message' => $message,
            ], $success ? 200 : 400);
        }
        $title = $success ? 'Email verified' : 'Verification failed';
        $color = $success ? '#28a745' : '#dc3545';
        $html = '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>' . e($title) . '</title></head><body style="font-family:sans-serif;max-width:500px;margin:50px auto;padding:20px;text-align:center;"><h2 style="color:' . $color . ';">' . e($title) . '</h2><p>' . e($message) . '</p><p style="color:#666;">You can close this page and open the app to log in.</p></body></html>';
        return response($html)->header('Content-Type', 'text/html');
    }
}
