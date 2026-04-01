<?php

namespace App\Http\Controllers\Mobile\coach;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\HandlesApiErrors;
use App\Models\Member;
use App\Models\User;
use App\Models\Coach;
use App\Models\Gym;
use App\Models\GymPlan;
use App\Models\GymSubscription;
use App\Models\ActivityLog;
use App\Models\CoachSignupVerification;
use App\Http\Controllers\BaseController;
use App\Mail\CoachSignupVerificationEmail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Throwable;

class MobileAuthController extends Controller
{
    use HandlesApiErrors;
    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string|min:6',
                'user_type' => 'nullable|string|in:coach,member',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $userType = $request->input('user_type', 'member'); // Default to member
            
            // For coaches, check User table with role_id = 3
            if ($userType === 'coach') {
                $user = User::where('email', $request->email)
                    ->where('role_id', 3) // Role ID 3 is for coaches
                    ->first();
                
                if (!$user) {
                    $this->logFailedActivity($request, 'coach_not_found');
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid credentials',
                        'status' => false,
                    ], 401);
                }

                // Get coach profile to check password setup requirement
                $coach = Coach::where('email', $request->email)->first();
                
                // Check if password setup is required
                if ($coach && $coach->password_setup_required && !$coach->password_hash) {
                    $this->logFailedActivity($request, 'password_setup_required', $user);
                    return response()->json([
                        'success' => false,
                        'message' => 'Password setup required. Please check your email for the password setup link.',
                        'status' => false,
                        'requires_setup' => true,
                    ], 403);
                }

                // Check password
                if (!Hash::check($request->password, $user->password)) {
                    $this->logFailedActivity($request, 'wrong_password', $user);
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid credentials',
                        'status' => false,
                    ], 401);
                }
                
                // Check if user is active
                if ($user->status === 0) {
                    $this->logFailedActivity($request, 'inactive_account', $user);
                    return response()->json([
                        'success' => false,
                        'message' => 'This account is not active. Please contact support.',
                        'status' => 'NotActive',
                    ], 401);
                }

                // Revoke old tokens before creating new one (allow new login from different device)
                // This ensures only one active session per user at a time
                if (Schema::hasColumn('users', 'token') && $user->token) {
                    // Clear old token from users table
                    $user->token = null;
                    if (Schema::hasColumn('users', 'token_expires_at')) {
                        $user->token_expires_at = null;
                    }
                    $user->save();
                }
                
                // Also revoke Passport tokens if they exist
                try {
                    \Laravel\Passport\Token::where('user_id', $user->id)
                        ->where('revoked', false)
                        ->update(['revoked' => true]);
                } catch (\Exception $e) {
                    // Passport might not be configured, ignore
                }

                // Get coach profile if exists (already fetched above)

                // Generate token - ALWAYS save to database for validation
                $token = null;
                $tokenString = null;
                
                // First, try to use Passport token for better security
                try {
                    $tokenResult = $user->createToken('Mobile App');
                    $token = $tokenResult->accessToken;
                    $tokenString = is_string($token) ? $token : $token->accessToken ?? (string)$token;
                    
                    // IMPORTANT: Always save token to database table for validation
                    // This ensures the middleware can always check the token from the database
                    if (Schema::hasColumn('users', 'token')) {
                        $user->token = $tokenString;
                        // Save expiration date if column exists
                        if (Schema::hasColumn('users', 'token_expires_at')) {
                            $user->token_expires_at = now()->addDays(30);
                        }
                        $user->save();
                    } else {
                        // If token column doesn't exist, log a warning
                        \Log::warning('Users table does not have token column. Token not saved to database.');
                    }
                } catch (\Exception $e) {
                    // If Passport fails, generate and save simple token to database
                    \Log::warning('Passport token creation failed, using simple token: ' . $e->getMessage());
                    $tokenString = Str::random(60);
                    $token = $tokenString;
                    
                    // ALWAYS save token to database
                    if (Schema::hasColumn('users', 'token')) {
                        $user->token = $tokenString;
                        // Save expiration date if column exists
                        if (Schema::hasColumn('users', 'token_expires_at')) {
                            $user->token_expires_at = now()->addDays(30);
                        }
                        $user->save();
                    } else {
                        \Log::error('Users table does not have token column. Cannot save token to database.');
                        throw new \Exception('Token column not found in users table. Please add token column to users table.');
                    }
                }
                
                // Verify token was saved to database
                if (Schema::hasColumn('users', 'token')) {
                    $user->refresh(); // Refresh to get latest data
                    if ($user->token !== $tokenString) {
                        \Log::error('Token was not saved to database correctly. Expected: ' . substr($tokenString, 0, 20) . '..., Got: ' . ($user->token ? substr($user->token, 0, 20) . '...' : 'null'));
                        // Try saving again
                        $user->token = $tokenString;
                        $user->save();
                    }
                }

                // Update coach's activated_on and last_online fields
                if ($coach) {
                    $now = now();
                    $updateData = ['last_online' => $now];
                    
                    // Set activated_on only if it's the first time (null)
                    if (!$coach->activated_on) {
                        $updateData['activated_on'] = $now;
                    }
                    
                    $coach->update($updateData);
                }

                // Log the login activity
                $this->logActivity($user, $request, 'success');

                // Prepare user data with coach info
                $userData = [
                    'id' => $user->id,
                    'firstname' => $user->firstname,
                    'lastname' => $user->lastname,
                    'username' => $user->username,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'avatar' => $user->avatar,
                    'role_id' => $user->role_id,
                    'status' => $user->status,
                    'theme' => $user->theme ?? 'system',
                    'background_color' => $user->background_color ?? null,
                    'background_image' => $user->background_image ?? null,
                    'coach' => $coach ? [
                        'id' => $coach->id,
                        'first_name' => $coach->first_name,
                        'last_name' => $coach->last_name,
                        'coach_type' => $coach->coach_type,
                        'specializations' => $coach->specializations,
                        'specialization' => $coach->specialization ?? null, // Include specialization column
                        'profile_image' => $coach->profile_image ?? null, // Include profile_image from coach table
                        'height_cm' => $coach->height_cm ?? null,
                        'weight_kg' => $coach->weight_kg ?? null,
                        'mobile_phone' => $coach->mobile_phone ?? null, // Include mobile_phone from coaches table
                    ] : null,
                    'coach_id' => $coach ? $coach->id : null,
                    'mobile_phone' => $coach ? ($coach->mobile_phone ?? $authUser->mobile_phone ?? $authUser->phone ?? null) : ($authUser->mobile_phone ?? $authUser->phone ?? null),
                ];

                // Ensure we use the token string that was saved to database
                $finalToken = $tokenString ?? (is_string($token) ? $token : $token->accessToken ?? (string)$token);
                
                return response()->json([
                    'success' => true,
                    'message' => 'Login successful',
                    'data' => [
                        'user' => $userData,
                        'token' => [
                            'access_token' => $finalToken,
                            'token_type' => 'Bearer',
                            'expires_at' => now()->addDays(30)->toISOString(),
                        ]
                    ]
                ], 200);
            }

            // For members, use existing Member model logic
            $member = Member::where('email', $request->email)->first();
            
            if (!$member) {
                $this->logFailedActivity($request, 'member_not_found');
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials',
                    'status' => false,
                ], 401);
            }

            // Check password using password_hash column
            if (!Hash::check($request->password, $member->password_hash)) {
                $this->logFailedActivity($request, 'wrong_password', $member);
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials',
                    'status' => false,
                ], 401);
            }
            
            // Check if member is active
            if ($member->statut === 0) {
                $this->logFailedActivity($request, 'inactive_account', $member);
                return response()->json([
                    'success' => false,
                    'message' => 'This account is not active. Please contact support.',
                    'status' => 'NotActive',
                ], 401);
            }

            // Generate simple token
            $token = Str::random(60);
            
            // Update last_login and first_mobile_login
            $member->last_login = now();
            // Also set first_mobile_login if it's the first time
            if (!$member->first_mobile_login) {
                $member->first_mobile_login = now();
            }
            
            // Store token in members table
            $member->token = $token;
            $member->save();

            // Log the login activity
            $this->logActivity($member, $request, 'success');

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'data' => [
                    'user' => [
                        'id' => $member->id,
                        'firstname' => $member->firstname,
                        'lastname' => $member->lastname,
                        'username' => $member->username,
                        'email' => $member->email,
                        'phone' => $member->phone,
                        'profile_image' => $member->profile_image,
                        'avatar' => $member->avatar,
                        'role_id' => $member->role_id,
                        'statut' => $member->statut,
                    ],
                    'token' => [
                        'access_token' => $token,
                        'token_type' => 'Bearer',
                        'expires_at' => now()->addDays(30)->toISOString(),
                    ]
                ]
            ], 200);

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileAuthController@login');
        }
    }

    public function register(Request $request)
    {
        try {
            $userType = $request->input('user_type', 'member');
            
            // For coach registration
            if ($userType === 'coach') {
                $validator = Validator::make($request->all(), [
                    'firstname' => 'required|string|max:255',
                    'lastname' => 'required|string|max:255',
                    'username' => 'required|string|max:255|unique:users',
                    'email' => 'required|email|unique:users',
                    'phone' => 'nullable|string|max:20',
                    'password' => 'required|string|min:6|confirmed',
                ]);

                if ($validator->fails()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Validation error',
                        'errors' => $validator->errors()
                    ], 422);
                }

                // Create new user (coach) in users table
                $user = User::create([
                    'firstname' => $request->firstname,
                    'lastname' => $request->lastname,
                    'username' => $request->username,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'password' => Hash::make($request->password),
                    'statut' => 1, // Active by default
                    'role_id' => 3, // Role ID 3 is for coaches
                ]);

                // Generate token
                $token = Str::random(60);
                if (Schema::hasColumn('users', 'token')) {
                    $user->token = $token;
                    $user->save();
                } else {
                    $tokenResult = $user->createToken('Mobile App');
                    $token = $tokenResult->accessToken;
                }

                // Get or create coach profile
                $coach = Coach::where('email', $request->email)->first();
                if (!$coach) {
                    $coach = Coach::create([
                        'first_name' => $request->firstname,
                        'last_name' => $request->lastname,
                        'email' => $request->email,
                        'mobile_phone' => $request->phone,
                        'status' => 'Active',
                        'coach_type' => $request->coach_type ?? 'Personal Coach',
                    ]);
                    
                    // Update User record with coach_id
                    if ($user && !$user->coach_id) {
                        $user->coach_id = $coach->id;
                        $user->save();
                    }
                } else {
                    // Update User record with coach_id if coach already exists
                    if ($user && !$user->coach_id) {
                        $user->coach_id = $coach->id;
                        $user->save();
                    }
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Coach registration successful',
                    'data' => [
                        'user' => [
                            'id' => $user->id,
                            'firstname' => $user->firstname,
                            'lastname' => $user->lastname,
                            'username' => $user->username,
                            'email' => $user->email,
                            'phone' => $user->phone,
                            'avatar' => $user->avatar,
                            'role_id' => $user->role_id,
                            'status' => $user->status,
                            'coach' => [
                                'id' => $coach->id,
                                'first_name' => $coach->first_name,
                                'last_name' => $coach->last_name,
                                'coach_type' => $coach->coach_type,
                            ],
                            'coach_id' => $coach->id,
                        ],
                        'token' => [
                            'access_token' => is_string($token) ? $token : $token->accessToken ?? $token,
                            'token_type' => 'Bearer',
                            'expires_at' => now()->addDays(30)->toISOString(),
                        ]
                    ]
                ], 201);
            }

            // For member registration (existing logic)
            $validator = Validator::make($request->all(), [
                'firstname' => 'required|string|max:255',
                'lastname' => 'required|string|max:255',
                'username' => 'required|string|max:255|unique:members',
                'email' => 'required|email|unique:members',
                'phone' => 'nullable|string|max:20',
                'password' => 'required|string|min:6|confirmed',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Create new member
            $member = Member::create([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'username' => $request->username,
                'email' => $request->email,
                'phone' => $request->phone,
                'password_hash' => Hash::make($request->password),
                'statut' => 1, // Active by default
                'role_id' => 2, // Assuming 2 is for regular members
            ]);

            // Generate token
            $token = Str::random(60);
            $member->token = $token;
            $member->save();

            return response()->json([
                'success' => true,
                'message' => 'Registration successful',
                'data' => [
                    'user' => [
                        'id' => $member->id,
                        'firstname' => $member->firstname,
                        'lastname' => $member->lastname,
                        'username' => $member->username,
                        'email' => $member->email,
                        'phone' => $member->phone,
                        'avatar' => $member->avatar,
                        'role_id' => $member->role_id,
                        'statut' => $member->statut,
                    ],
                    'token' => [
                        'access_token' => $token,
                        'token_type' => 'Bearer',
                        'expires_at' => now()->addDays(30)->toISOString(),
                    ]
                ]
            ], 201);

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileAuthController@register');
        }
    }

    /**
     * Sign up a new gym owner (coach) from the mobile app.
     * Stores pending verification and sends confirmation email. Account is created only after they confirm via email link.
     */
    public function signUpGymOwner(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6|confirmed',
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'sex' => 'nullable|string|in:Male,Female,Other',
                'business_name' => 'required|string|max:255',
                'business_phone' => 'required|string|max:20',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $email = $request->input('email');
            $firstName = $request->input('first_name');
            $lastName = $request->input('last_name');

            // Remove any existing pending verification for this email (allow resend)
            CoachSignupVerification::where('email', $email)->delete();

            $token = Str::random(60);
            $expiresAt = now()->addHours(24);

            CoachSignupVerification::create([
                'email' => $email,
                'token' => $token,
                'first_name' => $firstName,
                'last_name' => $lastName,
                'sex' => $request->input('sex'),
                'business_name' => $request->input('business_name'),
                'business_phone' => $request->input('business_phone'),
                'password' => Hash::make($request->password),
                'expires_at' => $expiresAt,
            ]);

            // Use BaseController mail config (gym_id null = use first available server/settings)
            $mailConfigSet = BaseController::Set_config_mail(null);
            if (!$mailConfigSet) {
                \Log::warning('Coach signup: mail config missing (gym_id=null). Using default Laravel mail config.');
            }

            $appUrl = rtrim(config('app.url', url('/')), '/');
            $confirmUrl = $appUrl . '/api/coachapp/auth/confirm-signup?token=' . $token;
            $appName = config('app.name', 'Fitness Suite');

            try {
                Mail::to($email)->send(new CoachSignupVerificationEmail($firstName, $lastName, $confirmUrl, $appName));
            } catch (\Exception $e) {
                \Log::error('Coach signup: failed to send verification email', [
                    'email' => $email,
                    'error' => $e->getMessage(),
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'We could not send the confirmation email. Please check your email address or try again later.',
                ], 500);
            }

            return response()->json([
                'success' => true,
                'message' => 'Please check your email to confirm your account. Once confirmed, you can sign in to the Coach app with your email and password.',
                'data' => ['email' => $email],
            ], 201);

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileAuthController@signUpGymOwner');
        }
    }

    /**
     * Confirm coach signup via email link. Creates gym, user, coach, and subscription; returns HTML page.
     */
    public function confirmSignupGymOwner(Request $request)
    {
        $token = $request->query('token');
        if (!$token) {
            return $this->confirmSignupResponse(false, 'Invalid or missing confirmation link.');
        }

        $verification = CoachSignupVerification::where('token', $token)->first();
        if (!$verification) {
            return $this->confirmSignupResponse(false, 'Invalid or expired confirmation link. Please sign up again.');
        }
        if ($verification->isUsed()) {
            return $this->confirmSignupResponse(true, null, true); // already confirmed
        }
        if ($verification->isExpired()) {
            return $this->confirmSignupResponse(false, 'This confirmation link has expired. Please sign up again.');
        }

        if (User::where('email', $verification->email)->exists()) {
            $verification->markAsUsed();
            return $this->confirmSignupResponse(true, null, true);
        }

        try {
            DB::beginTransaction();
            $this->createGymOwnerAccountFromVerification($verification);
            $verification->markAsUsed();
            DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();
            \Log::error('Coach signup confirmation failed', ['token' => $token, 'error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return $this->confirmSignupResponse(false, 'We could not create your account. Please try signing up again or contact support.');
        }

        return $this->confirmSignupResponse(true, null, false);
    }

    /**
     * Create gym, user, coach, and subscription from a verified CoachSignupVerification.
     */
    private function createGymOwnerAccountFromVerification(CoachSignupVerification $verification): void
    {
        $basicPlan = GymPlan::where('is_active', true)
            ->where(function ($q) {
                $q->where('name', 'Basic Plan')->orWhere('sort_order', 1);
            })
            ->orderBy('sort_order')
            ->first();
        if (!$basicPlan) {
            $basicPlan = GymPlan::where('is_active', true)->orderBy('sort_order')->first();
        }

        $firstName = $verification->first_name;
        $lastName = $verification->last_name;
        $email = $verification->email;
        $sex = $verification->sex ?? 'Other';
        $businessName = $verification->business_name;
        $businessPhone = $verification->business_phone;

        $gym = Gym::create([
            'gym_name' => $businessName,
            'contact_email' => $email,
            'subscription_status' => 'active',
            'phone' => $businessPhone,
        ]);

        $username = str_replace([' ', '.'], '_', strtolower($firstName . '_' . $lastName));
        if (User::where('username', $username)->exists()) {
            $username = $username . '_' . substr(Str::random(6), 0, 6);
        }

        $user = User::create([
            'firstname' => $firstName,
            'lastname' => $lastName,
            'username' => $username,
            'email' => $email,
            'password' => $verification->password, // already hashed
            'phone' => $businessPhone,
            'role_id' => 3,
            'gym_id' => $gym->id,
            'status' => 1,
        ]);

        if (Schema::hasColumn('users', 'statut')) {
            $user->statut = 1;
            $user->save();
        }

        $coach = Coach::create([
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'mobile_phone' => $businessPhone,
            'gender' => $sex,
            'gym_id' => $gym->id,
            'status' => 'Active',
            'coach_type' => 'Personal Coach',
            'address' => 'To be updated',
            'city' => 'To be updated',
            'state' => 'To be updated',
            'zip' => 'To be updated',
        ]);

        $user->coach_id = $coach->id;
        $user->save();

        if ($basicPlan) {
            GymSubscription::create([
                'gym_id' => $gym->id,
                'gym_plan_id' => $basicPlan->id,
                'amount' => $basicPlan->price ?? 0,
                'next_billing_date' => now()->addMonth(),
                'status' => 'active',
            ]);
        }
    }

    /**
     * Return HTML response for confirmation page (success or error).
     */
    private function confirmSignupResponse(bool $success, ?string $errorMessage = null, bool $alreadyConfirmed = false): \Illuminate\Http\Response
    {
        $appName = config('app.name', 'Fitness Suite');
        $title = $success ? 'Account confirmed' : 'Confirmation failed';
        if ($success && $alreadyConfirmed) {
            $message = 'Your account was already confirmed. You can sign in to the Coach app with your email and password.';
        } elseif ($success) {
            $message = 'Your account has been created. You can now open the Coach app and sign in with your email and password.';
        } else {
            $message = $errorMessage ?? 'Something went wrong.';
        }

        $html = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>' . e($title) . '</title></head><body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f4f4;display:flex;align-items:center;justify-content:center;min-height:100vh;"><div style="max-width:480px;margin:20px;background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);overflow:hidden;"><div style="padding:24px 24px 16px;background:' . ($success ? '#22c55e' : '#ef4444') . ';color:#fff;text-align:center;"><h1 style="margin:0;font-size:22px;">' . e($title) . '</h1></div><div style="padding:24px;"><p style="margin:0 0 16px;color:#333;font-size:16px;line-height:1.5;">' . e($message) . '</p><p style="margin:0;color:#666;font-size:14px;">' . e($appName) . '</p></div></div></body></html>';

        return response($html, 200)->header('Content-Type', 'text/html; charset=UTF-8');
    }

    public function profile(Request $request)
    {
        try {
            $authUser = $request->get('auth_user') ?? $request->get('auth_member');
            
            if (!$authUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized',
                ], 401);
            }

            // Check if it's a User (coach) or Member
            $isCoach = $authUser instanceof User && $authUser->role_id === 3;
            
            $profileData = [
                'id' => $authUser->id,
                'firstname' => $authUser->firstname ?? $authUser->first_name ?? null,
                'lastname' => $authUser->lastname ?? $authUser->last_name ?? null,
                'username' => $authUser->username ?? null,
                'email' => $authUser->email,
                'mobile_phone' => $authUser->mobile_phone ?? $authUser->phone ?? null,
                'phone' => $authUser->mobile_phone ?? $authUser->phone ?? null, // Keep for backward compatibility
                'avatar' => $authUser->avatar ?? null,
                'role_id' => $authUser->role_id ?? null,
                'status' => $authUser->status ?? null,
                'theme' => $authUser->theme ?? 'system',
                'background_color' => $authUser->background_color ?? null,
                'background_image' => $authUser->background_image ?? null,
            ];

            // Add coach info if it's a coach
            if ($isCoach) {
                // Try to find coach by email first, then by user_id if available
                $coach = Coach::where('email', $authUser->email)->first();
                
                // If not found by email, try to find by user_id (if coaches table has user_id column)
                if (!$coach && Schema::hasColumn('coaches', 'user_id')) {
                    $coach = Coach::where('user_id', $authUser->id)->first();
                }
                
                if ($coach) {
                    // Refresh to ensure we have latest data
                    $coach->refresh();
                    
                    // Log for debugging
                    \Log::info('Profile endpoint (GET) - Coach data', [
                        'coach_id' => $coach->id,
                        'profile_image' => $coach->profile_image,
                        'email' => $authUser->email,
                    ]);
                    
                    $profileData['coach'] = [
                        'id' => $coach->id,
                        'first_name' => $coach->first_name,
                        'last_name' => $coach->last_name,
                        'coach_type' => $coach->coach_type,
                        'specializations' => $coach->specializations,
                        'specialization' => $coach->specialization ?? null, // Include specialization column
                        'profile_image' => $coach->profile_image ?? null, // Include profile_image from coach table
                        'height_cm' => $coach->height_cm ?? null,
                        'weight_kg' => $coach->weight_kg ?? null,
                        'mobile_phone' => $coach->mobile_phone ?? null, // Include mobile_phone from coaches table
                    ];
                    $profileData['coach_id'] = $coach->id;
                    // Also set mobile_phone at top level for easy access
                    $profileData['mobile_phone'] = $coach->mobile_phone ?? $authUser->mobile_phone ?? $authUser->phone ?? null;
                } else {
                    \Log::warning('Profile endpoint (GET) - Coach not found', [
                        'email' => $authUser->email,
                        'user_id' => $authUser->id,
                        'role_id' => $authUser->role_id,
                    ]);
                }
            }
            
            return response()->json([
                'success' => true,
                'data' => $profileData
            ], 200);

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileAuthController@profile');
        }
    }

    public function updateProfile(Request $request)
    {
        try {
            $authUser = $request->get('auth_user') ?? $request->get('auth_member');
            
            if (!$authUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized',
                ], 401);
            }

            $validator = Validator::make($request->all(), [
                'firstname' => 'sometimes|string|max:255',
                'lastname' => 'sometimes|string|max:255',
                'mobile_phone' => 'sometimes|nullable|string|max:20',
                'avatar' => 'sometimes|nullable|string',
                'profile_image' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // 2MB max for profile image
                'theme' => 'sometimes|nullable|string|in:light,dark,system',
                'background_color' => 'sometimes|nullable|string|max:20|regex:/^#?[A-Fa-f0-9]{6}$/',
                'background_image' => 'sometimes|nullable|string',
                'background_image_file' => 'sometimes|nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max
                'specialization' => 'sometimes|nullable|string', // For coach specialization field
                'height_cm' => 'sometimes|nullable|numeric|min:0|max:300', // Height in centimeters
                'weight_kg' => 'sometimes|nullable|numeric|min:0|max:500', // Weight in kilograms
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Handle background image file upload
            $backgroundImagePath = null;
            if ($request->hasFile('background_image_file')) {
                $file = $request->file('background_image_file');
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $uploadPath = public_path('images/user-backgrounds');
                
                // Create directory if it doesn't exist
                if (!file_exists($uploadPath)) {
                    mkdir($uploadPath, 0755, true);
                }
                
                $file->move($uploadPath, $filename);
                $backgroundImagePath = 'images/user-backgrounds/' . $filename;
            }

            // Handle profile image file upload for coach
            $profileImagePath = null;
            if ($request->hasFile('profile_image')) {
                $file = $request->file('profile_image');
                $directory = public_path('storage/coaches');
                
                // Create directory if it doesn't exist
                if (!file_exists($directory)) {
                    mkdir($directory, 0755, true);
                }
                
                // Get file extension
                $extension = $file->getClientOriginalExtension();
                if (empty($extension)) {
                    $extension = $file->guessExtension() ?: 'jpg';
                }
                
                // Generate unique filename
                $filename = time() . '_' . uniqid() . '.' . $extension;
                
                // Move file to directory
                if ($file->move($directory, $filename)) {
                    $profileImagePath = 'storage/coaches/' . $filename;
                    
                    // Log for debugging (remove in production)
                    \Log::info('Profile image uploaded', [
                        'filename' => $filename,
                        'path' => $profileImagePath,
                        'user_email' => $authUser->email,
                    ]);
                } else {
                    \Log::error('Failed to move profile image file', [
                        'filename' => $filename,
                        'directory' => $directory,
                    ]);
                }
            }

            // Update based on model type
            if ($authUser instanceof User) {
                $updateData = [];
                if ($request->has('firstname')) $updateData['firstname'] = $request->firstname;
                if ($request->has('lastname')) $updateData['lastname'] = $request->lastname;
                if ($request->has('mobile_phone')) $updateData['mobile_phone'] = $request->mobile_phone;
                if ($request->has('avatar')) $updateData['avatar'] = $request->avatar;
                if ($request->has('theme')) $updateData['theme'] = $request->theme;
                if ($request->has('background_color')) $updateData['background_color'] = $request->background_color;
                if ($backgroundImagePath) {
                    $updateData['background_image'] = $backgroundImagePath;
                } elseif ($request->has('background_image')) {
                    // Allow clearing the image by sending empty string
                    $updateData['background_image'] = $request->background_image ?: null;
                }
                $authUser->update($updateData);
                
                // Update coach profile if it's a coach
                if ($authUser->role_id === 3) {
                    // Try to find coach by email first, then by user_id if available
                    $coach = Coach::where('email', $authUser->email)->first();
                    
                    // If not found by email, try to find by user_id (if coaches table has user_id column)
                    if (!$coach && Schema::hasColumn('coaches', 'user_id')) {
                        $coach = Coach::where('user_id', $authUser->id)->first();
                    }
                    
                    if ($coach) {
                        $coachUpdated = false;
                        
                        // Update profile_image if uploaded
                        if ($profileImagePath) {
                            // Delete old image if exists
                            if ($coach->profile_image && file_exists(public_path($coach->profile_image))) {
                                @unlink(public_path($coach->profile_image));
                            }
                            $coach->profile_image = $profileImagePath;
                            $coachUpdated = true;
                            
                            // Log for debugging (remove in production)
                            \Log::info('Coach profile_image updated', [
                                'coach_id' => $coach->id,
                                'profile_image' => $profileImagePath,
                                'email' => $authUser->email,
                                'user_id' => $authUser->id,
                            ]);
                        }
                        
                        // Update specialization if provided
                        if ($request->has('specialization')) {
                            $coach->specialization = $request->specialization ?: null;
                            $coachUpdated = true;
                            
                            // Log for debugging
                            \Log::info('Coach specialization updated', [
                                'coach_id' => $coach->id,
                                'specialization' => $request->specialization,
                                'email' => $authUser->email,
                            ]);
                        }
                        
                        // Update height if provided
                        if ($request->has('height_cm')) {
                            $coach->height_cm = $request->height_cm ?: null;
                            $coachUpdated = true;
                            
                            // Log for debugging
                            \Log::info('Coach height updated', [
                                'coach_id' => $coach->id,
                                'height_cm' => $request->height_cm,
                                'email' => $authUser->email,
                            ]);
                        }
                        
                        // Update weight if provided
                        if ($request->has('weight_kg')) {
                            $coach->weight_kg = $request->weight_kg ?: null;
                            $coachUpdated = true;
                            
                            // Log for debugging
                            \Log::info('Coach weight updated', [
                                'coach_id' => $coach->id,
                                'weight_kg' => $request->weight_kg,
                                'email' => $authUser->email,
                            ]);
                        }
                        
                        // Update mobile_phone if provided (coaches table has mobile_phone column)
                        if ($request->has('mobile_phone')) {
                            $coach->mobile_phone = $request->mobile_phone ?: null;
                            $coachUpdated = true;
                            
                            // Log for debugging
                            \Log::info('Coach mobile_phone updated', [
                                'coach_id' => $coach->id,
                                'mobile_phone' => $request->mobile_phone,
                                'email' => $authUser->email,
                            ]);
                        }
                        
                        // Save coach if any updates were made
                        if ($coachUpdated) {
                            $coach->save();
                            $coach->refresh();
                        }
                    } else {
                        \Log::warning('Coach not found for profile update', [
                            'email' => $authUser->email,
                            'user_id' => $authUser->id ?? null,
                            'role_id' => $authUser->role_id,
                        ]);
                    }
                }
            } else {
                // Member model
                $memberUpdateData = $request->only(['firstname', 'lastname', 'phone', 'avatar', 'theme', 'background_color']);
                if ($backgroundImagePath) {
                    $memberUpdateData['background_image'] = $backgroundImagePath;
                } elseif ($request->has('background_image')) {
                    $memberUpdateData['background_image'] = $request->background_image ?: null;
                }
                $authUser->update($memberUpdateData);
            }

            // Check if it's a User (coach) or Member
            $isCoach = $authUser instanceof User && $authUser->role_id === 3;
            
            // Construct full URL for background_image if it exists
            $backgroundImageUrl = null;
            if ($authUser->background_image) {
                // If it's already a full URL, use it as is
                if (strpos($authUser->background_image, 'http://') === 0 || strpos($authUser->background_image, 'https://') === 0) {
                    $backgroundImageUrl = $authUser->background_image;
                } else {
                    // It's a relative path, construct full URL
                    $baseUrl = config('app.url', 'http://localhost:8000');
                    $backgroundImageUrl = $baseUrl . '/' . ltrim($authUser->background_image, '/');
                }
            }
            
            $profileData = [
                'id' => $authUser->id,
                'firstname' => $authUser->firstname ?? $authUser->first_name ?? null,
                'lastname' => $authUser->lastname ?? $authUser->last_name ?? null,
                'username' => $authUser->username ?? null,
                'email' => $authUser->email,
                'mobile_phone' => $authUser->mobile_phone ?? $authUser->phone ?? null,
                'phone' => $authUser->mobile_phone ?? $authUser->phone ?? null, // Keep for backward compatibility
                'avatar' => $authUser->avatar ?? null,
                'role_id' => $authUser->role_id ?? null,
                'status' => $authUser->status ?? null,
                'theme' => $authUser->theme ?? 'system',
                'background_color' => $authUser->background_color ?? null,
                'background_image' => $authUser->background_image ?? null, // Keep relative path for storage
                'background_image_url' => $backgroundImageUrl, // Full URL for display
            ];

            // Add coach info if it's a coach (for consistency with profile endpoint)
            if ($isCoach) {
                // Try to find coach by email first, then by user_id if available
                $coach = Coach::where('email', $authUser->email)->first();
                
                // If not found by email, try to find by user_id (if coaches table has user_id column)
                if (!$coach && Schema::hasColumn('coaches', 'user_id')) {
                    $coach = Coach::where('user_id', $authUser->id)->first();
                }
                
                if ($coach) {
                    // Refresh to ensure we have latest data including profile_image
                    $coach->refresh();
                    
                    // Log for debugging
                    \Log::info('Profile endpoint - Coach data', [
                        'coach_id' => $coach->id,
                        'profile_image' => $coach->profile_image,
                        'email' => $authUser->email,
                    ]);
                    
                    $profileData['coach'] = [
                        'id' => $coach->id,
                        'first_name' => $coach->first_name,
                        'last_name' => $coach->last_name,
                        'coach_type' => $coach->coach_type,
                        'specializations' => $coach->specializations,
                        'specialization' => $coach->specialization ?? null, // Include specialization column
                        'bio' => $coach->bio ?? null,
                        'profile_image' => $coach->profile_image ?? null, // Include profile_image from coach table
                        'height_cm' => $coach->height_cm ?? null,
                        'weight_kg' => $coach->weight_kg ?? null,
                        'mobile_phone' => $coach->mobile_phone ?? null, // Include mobile_phone from coaches table
                    ];
                    $profileData['coach_id'] = $coach->id;
                    // Also set mobile_phone at top level for easy access
                    $profileData['mobile_phone'] = $coach->mobile_phone ?? $authUser->mobile_phone ?? $authUser->phone ?? null;
                } else {
                    \Log::warning('Profile endpoint - Coach not found', [
                        'email' => $authUser->email,
                        'user_id' => $authUser->id,
                        'role_id' => $authUser->role_id,
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => $profileData
            ], 200);

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileAuthController@updateProfile');
        }
    }

    public function changePassword(Request $request)
    {
        try {
            $authUser = $request->get('auth_user') ?? $request->get('auth_member');
            
            if (!$authUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized',
                ], 401);
            }

            $validator = Validator::make($request->all(), [
                'current_password' => 'required|string',
                'new_password' => 'required|string|min:6|confirmed',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Verify current password based on model type
            if ($authUser instanceof User) {
                if (!Hash::check($request->current_password, $authUser->password)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Current password is incorrect',
                    ], 400);
                }
                // Update password
                $authUser->update([
                    'password' => Hash::make($request->new_password)
                ]);
            } else {
                // Member model
                if (!Hash::check($request->current_password, $authUser->password_hash)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Current password is incorrect',
                    ], 400);
                }
                // Update password
                $authUser->update([
                    'password_hash' => Hash::make($request->new_password)
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Password changed successfully',
            ], 200);

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileAuthController@changePassword');
        }
    }

    public function setupPassword(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'token' => 'required|string|size:60',
                'password' => 'required|string|min:6|confirmed',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Find coach by token where token is not expired
            $coach = Coach::where('password_setup_token', $request->token)
                ->where('password_setup_token_expires_at', '>', now())
                ->first();

            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid or expired setup token. Please request a new password setup link.',
                ], 400);
            }

            // Check if password is already set (token already used)
            if ($coach->password_hash && !$coach->password_setup_required) {
                return response()->json([
                    'success' => false,
                    'message' => 'This setup link has already been used. Please use the login page to access your account.',
                ], 400);
            }

            // Hash and save password to coaches table
            $hashedPassword = Hash::make($request->password);
            $coach->update([
                'password_hash' => $hashedPassword,
                'password_setup_token' => null,
                'password_setup_token_expires_at' => null,
                'password_setup_required' => false,
            ]);

            // Create or update User record for authentication
            $user = User::where('email', $coach->email)
                ->where('role_id', 3)
                ->first();

            if (!$user) {
                // Create new User record
                $username = strtolower(str_replace(' ', '', $coach->first_name . $coach->last_name)) . $coach->id;
                // Ensure username is unique
                $originalUsername = $username;
                $counter = 1;
                while (User::where('username', $username)->exists()) {
                    $username = $originalUsername . $counter;
                    $counter++;
                }

                $user = User::create([
                    'firstname' => $coach->first_name,
                    'lastname' => $coach->last_name,
                    'username' => $username,
                    'email' => $coach->email,
                    'phone' => $coach->mobile_phone ?? $coach->landline_phone,
                    'password' => $hashedPassword,
                    'statut' => 1, // Active
                    'role_id' => 3, // Coach role
                ]);
            } else {
                // Update existing User record
                $user->update([
                    'password' => $hashedPassword,
                    'firstname' => $coach->first_name,
                    'lastname' => $coach->last_name,
                    'phone' => $coach->mobile_phone ?? $coach->landline_phone ?? $user->phone,
                    'statut' => 1, // Ensure active
                ]);
            }

            // Generate token and save to users table
            $token = Str::random(60);
            if (Schema::hasColumn('users', 'token')) {
                $user->token = $token;
                $user->save();
            } else {
                try {
                    $tokenResult = $user->createToken('Mobile App');
                    $token = is_string($tokenResult->accessToken) ? $tokenResult->accessToken : (string)$tokenResult->accessToken;
                } catch (\Exception $e) {
                    \Log::error('Failed to create Passport token: ' . $e->getMessage());
                    $token = Str::random(60);
                }
            }

            // Log the activity
            $this->logActivity($user, $request, 'password_setup_success');

            return response()->json([
                'success' => true,
                'message' => 'Password set successfully. You are now logged in.',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'firstname' => $user->firstname,
                        'lastname' => $user->lastname,
                        'username' => $user->username,
                        'email' => $user->email,
                        'phone' => $user->phone,
                        'avatar' => $user->avatar,
                        'role_id' => $user->role_id,
                        'status' => $user->status,
                    ],
                    'coach' => [
                        'id' => $coach->id,
                        'first_name' => $coach->first_name,
                        'last_name' => $coach->last_name,
                        'coach_type' => $coach->coach_type,
                        'email' => $coach->email,
                    ],
                    'token' => [
                        'access_token' => $token,
                        'token_type' => 'Bearer',
                        'expires_at' => now()->addDays(30)->toISOString(),
                    ]
                ]
            ], 200);

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileAuthController@setupPassword');
        }
    }

    public function logout(Request $request)
    {
        try {
            $authUser = $request->get('auth_user') ?? $request->get('auth_member');
            
            if (!$authUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized',
                ], 401);
            }

            // Clear token based on model type
            if ($authUser instanceof User) {
                if (Schema::hasColumn('users', 'token')) {
                    $authUser->update(['token' => null]);
                } else {
                    // Revoke Passport tokens
                    $authUser->tokens()->update(['revoked' => true]);
                }
            } else {
                // Member model
                $authUser->update(['token' => null]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully',
            ], 200);

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileAuthController@logout');
        }
    }

    public function refresh(Request $request)
    {
        try {
            $authUser = $request->get('auth_user') ?? $request->get('auth_member');
            
            if (!$authUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized',
                ], 401);
            }

            // Validate current token before refreshing
            $currentToken = $request->header('Authorization');
            if ($currentToken) {
                $currentToken = str_replace('Bearer ', '', trim($currentToken));
                
                // Verify current token is valid
                if ($authUser instanceof User) {
                    if (Schema::hasColumn('users', 'token')) {
                        // Check if current token matches
                        if ($authUser->token !== $currentToken) {
                            return response()->json([
                                'success' => false,
                                'message' => 'Invalid token. Please login again.',
                                'code' => 'INVALID_TOKEN',
                            ], 401);
                        }
                        
                        // Check if token is expired
                        if (Schema::hasColumn('users', 'token_expires_at') && 
                            $authUser->token_expires_at && 
                            $authUser->token_expires_at->isPast()) {
                            return response()->json([
                                'success' => false,
                                'message' => 'Token has expired. Please login again.',
                                'code' => 'TOKEN_EXPIRED',
                            ], 401);
                        }
                    }
                }
            }

            // Generate new token based on model type
            $expiresAt = now()->addDays(30);
            if ($authUser instanceof User) {
                $newToken = Str::random(60);
                if (Schema::hasColumn('users', 'token')) {
                    $updateData = ['token' => $newToken];
                    if (Schema::hasColumn('users', 'token_expires_at')) {
                        $updateData['token_expires_at'] = $expiresAt;
                    }
                    $authUser->update($updateData);
                } else {
                    // Use Passport token
                    $tokenResult = $authUser->createToken('Mobile App');
                    $newToken = $tokenResult->accessToken;
                }
            } else {
                // Member model
                $newToken = Str::random(60);
                $authUser->update(['token' => $newToken]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Token refreshed successfully',
                'data' => [
                    'token' => [
                        'access_token' => is_string($newToken) ? $newToken : $newToken->accessToken ?? $newToken,
                        'token_type' => 'Bearer',
                        'expires_at' => $expiresAt->toISOString(),
                    ]
                ]
            ], 200);

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileAuthController@refresh');
        }
    }

    /**
     * Log app launch activity
     */
    public function logAppLaunch(Request $request)
    {
        try {
            $authUser = $request->get('auth_user') ?? $request->get('auth_member');
            
            if (!$authUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized',
                ], 401);
            }

            // Log app launch activity
            $this->logActivity($authUser, $request, 'app_launch');

            return response()->json([
                'success' => true,
                'message' => 'App launch logged successfully',
            ], 200);

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileAuthController@logAppLaunch');
        }
    }

    /**
     * Log successful login activity
     */
    private function logActivity($user, Request $request, $status = 'success')
    {
        try {
            // Handle both User and Member models
            $userId = $user->id;
            $gymId = $user->gym_id ?? 1;
            
            ActivityLog::create([
                'gym_id' => $gymId,
                'member_id' => $userId, // Store user/member ID in member_id field
                'login_time' => now(),
                'ip_address' => $request->ip(),
                'device_info' => $this->getDeviceInfo($request),
                'login_status' => $status,
                'session_id' => Str::random(32),
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to log activity: ' . $e->getMessage());
        }
    }

    /**
     * Log failed login activity
     */
    private function logFailedActivity(Request $request, $status, $user = null)
    {
        try {
            ActivityLog::create([
                'gym_id' => $user->gym_id ?? 1,
                'member_id' => $user->id ?? null,
                'login_time' => now(),
                'ip_address' => $request->ip(),
                'device_info' => $this->getDeviceInfo($request),
                'login_status' => $status,
                'session_id' => Str::random(32),
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to log failed activity: ' . $e->getMessage());
        }
    }

    /**
     * Get device information from request
     */
    private function getDeviceInfo(Request $request)
    {
        $userAgent = $request->header('User-Agent');
        $deviceInfo = [
            'user_agent' => $userAgent,
            'platform' => $this->getPlatform($userAgent),
            'device_type' => $this->getDeviceType($userAgent),
        ];
        
        return json_encode($deviceInfo);
    }

    /**
     * Extract platform from user agent
     */
    private function getPlatform($userAgent)
    {
        if (stripos($userAgent, 'Android') !== false) {
            return 'Android';
        } elseif (stripos($userAgent, 'iPhone') !== false || stripos($userAgent, 'iPad') !== false) {
            return 'iOS';
        } elseif (stripos($userAgent, 'Windows') !== false) {
            return 'Windows';
        } elseif (stripos($userAgent, 'Mac') !== false) {
            return 'macOS';
        } elseif (stripos($userAgent, 'Linux') !== false) {
            return 'Linux';
        }
        
        return 'Unknown';
    }

    /**
     * Extract device type from user agent
     */
    private function getDeviceType($userAgent)
    {
        if (stripos($userAgent, 'Mobile') !== false) {
            return 'Mobile';
        } elseif (stripos($userAgent, 'Tablet') !== false) {
            return 'Tablet';
        } elseif (stripos($userAgent, 'Desktop') !== false) {
            return 'Desktop';
        }
        
        return 'Unknown';
    }
}
