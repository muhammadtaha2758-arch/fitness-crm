<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\MemberPasswordResetEmail;

class MobileAuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string|min:6',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Check if user exists and validate credentials
            $user = User::where('email', $request->email)->first();
            
            if (!$user) {
                // Log failed login attempt (no user found)
                $this->logFailedActivity($request, 'user_not_found');
                
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials',
                    'status' => false,
                ], 401);
            }

            // Check password using password column
            if (!Hash::check($request->password, $user->password)) {
                // Log failed login attempt (wrong password)
                $this->logFailedActivity($request, 'wrong_password', $user);
                
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials',
                    'status' => false,
                ], 401);
            }
            
            // Check if user is active
            if ($user->status === 0) {
                // Log failed login attempt (inactive account)
                $this->logFailedActivity($request, 'inactive_account', $user);
                
                return response()->json([
                    'success' => false,
                    'message' => 'This account is not active. Please contact support.',
                    'status' => 'NotActive',
                ], 401);
            }

            // Member app: only allow members (role_id = 2). Reject admin and coach.
            if ($user->role_id != 2) {
                $this->logFailedActivity($request, 'invalid_role_member_app', $user);
                return response()->json([
                    'success' => false,
                    'message' => 'This app is for members only. Please use the appropriate app for your account.',
                    'status' => false,
                ], 403);
            }

            // Generate simple token
            $token = Str::random(60);
            
            // Store token in users table
            $user->token = $token;
            $user->save();

            // Determine role name based on role_id
            $roleName = 'member'; // default
            if ($user->role_id == 1) {
                $roleName = 'admin';
            } elseif ($user->role_id == 2) {
                $roleName = 'member';
            } elseif ($user->role_id == 3) {
                $roleName = 'coach';
            }

            // Log the login activity
            $this->logActivity($user, $request, 'success');

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
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
                        'role_name' => $roleName,
                        'status' => $user->status,
                        'gym_id' => $user->gym_id,
                    ],
                    'token' => [
                        'access_token' => $token,
                        'token_type' => 'Bearer',
                        'expires_at' => now()->addDays(30)->toISOString(),
                    ]
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Login error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'firstname' => 'required|string|max:255',
                'lastname' => 'required|string|max:255',
                // Accept username from client, store in members.membername
                'username' => 'required|string|max:255|unique:members,membername',
                'email' => 'required|email|unique:members',
                'phone' => 'nullable|string|max:20', // accepted from app, mapped to mobile_phone
                'mobile_phone' => 'nullable|string|max:20',
                'landline_phone' => 'nullable|string|max:20',
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
            $mobile = $request->mobile_phone ?? $request->phone ?? '';
            $landline = $request->landline_phone ?? '';
            $member = Member::create([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'membername' => $request->username,
                'email' => $request->email,
                'mobile_phone' => $mobile,
                'landline_phone' => $landline,
                'password_hash' => Hash::make($request->password),
                'status' => 1, // Active by default
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
                        'username' => $member->membername,
                        'email' => $member->email,
                        'phone' => $member->mobile_phone ?? $member->landline_phone,
                        'mobile_phone' => $member->mobile_phone,
                        'landline_phone' => $member->landline_phone,
                        'avatar' => $member->avatar,
                        'role_id' => $member->role_id,
                        'status' => $member->status,
                    ],
                    'token' => [
                        'access_token' => $token,
                        'token_type' => 'Bearer',
                        'expires_at' => now()->addDays(30)->toISOString(),
                    ]
                ]
            ], 201);

        } catch (\Exception $e) {
            \Log::error('Registration error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function profile(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $member->id,
                    'firstname' => $member->firstname,
                    'lastname' => $member->lastname,
                    'username' => $member->membername,
                    'email' => $member->email,
                    'phone' => $member->phone,
                    'avatar' => $member->avatar,
                    'role_id' => $member->role_id,
                    'status' => $member->status,
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Profile error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function updateProfile(Request $request)
    {
        try {
            $member = $request->get('auth_member');

            $validator = Validator::make($request->all(), [
                'firstname' => 'sometimes|string|max:255',
                'lastname' => 'sometimes|string|max:255',
                'phone' => 'sometimes|nullable|string|max:20',
                'mobile_phone' => 'sometimes|nullable|string|max:20',
                'landline_phone' => 'sometimes|nullable|string|max:20',
                'gender' => 'sometimes|nullable|in:Male,Female,Other',
                'date_of_birth' => 'sometimes|nullable|date',
                'email' => 'sometimes|email|unique:members,email,' . ($member->id ?? 'NULL') . ',id',
                'username' => 'sometimes|string|max:255|unique:members,membername,' . ($member->id ?? 'NULL') . ',id',
                'avatar' => 'sometimes|nullable', // can be string or uploaded file
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            // If an avatar file is uploaded, store it and update profile_image
            if ($request->hasFile('avatar')) {
                $file = $request->file('avatar');
                if ($file->isValid()) {
                    $filename = $member->id . '_' . time() . '.' . $file->getClientOriginalExtension();
                    $relativePath = 'uploads/avatars/' . $filename;
                    $destination = public_path('uploads/avatars');
                    if (!is_dir($destination)) {
                        @mkdir($destination, 0775, true);
                    }
                    $file->move($destination, $filename);
                    $member->profile_image = $relativePath; // store relative path for mobile client
                }
            }

            // Update scalar fields (DB has mobile_phone/landline_phone, not phone)
            $member->fill($request->only([
                'firstname', 'lastname', 'mobile_phone', 'landline_phone',
                'gender', 'date_of_birth', 'email'
            ]));
            if ($request->filled('username')) {
                $member->membername = $request->input('username');
            }
            // Back-compat: map generic phone -> mobile_phone if provided
            if ($request->filled('phone') && empty($request->mobile_phone)) {
                $member->mobile_phone = $request->phone;
            }
            // Optional: if avatar is passed as URL/string, store in avatar column
            if (!$request->hasFile('avatar') && $request->filled('avatar')) {
                $member->avatar = $request->input('avatar');
            }
            $member->save();

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => [
                    'id' => $member->id,
                    'firstname' => $member->firstname,
                    'lastname' => $member->lastname,
                    'username' => $member->membername,
                    'email' => $member->email,
                    'phone' => $member->mobile_phone ?? $member->landline_phone,
                    'gender' => $member->gender,
                    'date_of_birth' => $member->date_of_birth,
                    'mobile_phone' => $member->mobile_phone,
                    'landline_phone' => $member->landline_phone,
                    'profile_image' => $member->profile_image,
                    'avatar' => $member->avatar,
                    'role_id' => $member->role_id,
                    'status' => $member->status,
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Update profile error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function forgotPassword(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Find member by email
            $member = Member::where('email', $request->email)->first();

            // Always return success message for security (don't reveal if email exists)
            if (!$member) {
                return response()->json([
                    'success' => true,
                    'message' => 'If an account exists with this email, you will receive password reset instructions shortly.',
                ], 200);
            }

            // Check if user exists in users table
            $user = User::where('email', $request->email)
                ->where('role_id', 2)
                ->first();

            if (!$user) {
                return response()->json([
                    'success' => true,
                    'message' => 'If an account exists with this email, you will receive password reset instructions shortly.',
                ], 200);
            }

            // Generate reset token
            $token = Str::random(60);
            $expiresAt = now()->addHours(24); // Token expires in 24 hours

            // Store token in members table
            $member->update([
                'password_setup_token' => $token,
                'password_setup_token_expires_at' => $expiresAt,
            ]);

            // Generate password reset email
            // Initialize email status tracking
            $emailSent = false;
            $emailError = null;
            
            try {
                // Configure mail and validate configuration
                \Log::info('Configuring mail for password reset', [
                    'member_id' => $member->id,
                    'gym_id' => $member->gym_id ?? 1,
                    'email' => $member->email
                ]);
                
                $mailConfigSet = \App\Http\Controllers\BaseController::Set_config_mail($member->gym_id ?? 1);
                
                \Log::info('Mail configuration result', [
                    'mailConfigSet' => $mailConfigSet,
                    'mail_default' => config('mail.default'),
                    'mail_from_address' => config('mail.from.address'),
                ]);
                
                if (!$mailConfigSet) {
                    $emailError = 'Email configuration not found. Please configure mail settings in Settings → Mail Settings.';
                    \Log::error('Email configuration missing for password reset', [
                        'member_id' => $member->id,
                        'gym_id' => $member->gym_id ?? 1,
                        'email' => $member->email
                    ]);
                } else {
                    // Send password reset email to member
                    try {
                        // Use queue if QUEUE_CONNECTION is set, otherwise send synchronously
                        $useQueue = config('queue.default') !== 'sync' && env('QUEUE_CONNECTION') !== 'sync';
                        
                        \Log::info('Preparing to send password reset email', [
                            'useQueue' => $useQueue,
                            'queue_default' => config('queue.default'),
                            'queue_connection_env' => env('QUEUE_CONNECTION'),
                        ]);
                        
                        if ($useQueue) {
                            Mail::to($member->email)->queue(new MemberPasswordResetEmail($member, $token));
                            $emailSent = true;
                            \Log::info('Password reset email queued for member: ' . $member->email . ' (ID: ' . $member->id . ')');
                        } else {
                            Mail::to($member->email)
                                ->send(new MemberPasswordResetEmail($member, $token));
                            $emailSent = true;
                            \Log::info('Password reset email sent to member: ' . $member->email . ' (ID: ' . $member->id . ')');
                        }
                    } catch (\Exception $e) {
                        $emailError = $e->getMessage();
                        \Log::error('Failed to send password reset email to member ' . $member->id, [
                            'email' => $member->email,
                            'error' => $e->getMessage(),
                            'error_code' => $e->getCode(),
                            'error_file' => $e->getFile(),
                            'error_line' => $e->getLine(),
                            'trace' => $e->getTraceAsString()
                        ]);
                    }
                }
                
            } catch (\Exception $emailException) {
                // Log email failure but don't fail the request
                \Log::error('Failed to send password reset email for member ' . $member->id . ': ' . $emailException->getMessage());
                \Log::error('Email exception details', [
                    'error_code' => $emailException->getCode(),
                    'error_file' => $emailException->getFile(),
                    'error_line' => $emailException->getLine(),
                    'trace' => $emailException->getTraceAsString()
                ]);
                // Still return success for security
            }

            // Log the activity
            $this->logActivity($member, $request, 'password_reset_requested');

            return response()->json([
                'success' => true,
                'message' => 'If an account exists with this email, you will receive password reset instructions shortly.',
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Forgot password error: ' . $e->getMessage());
            return response()->json([
                'success' => true,
                'message' => 'If an account exists with this email, you will receive password reset instructions shortly.',
            ], 200);
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

            // Find member by token where token is not expired
            $member = Member::where('password_setup_token', $request->token)
                ->where('password_setup_token_expires_at', '>', now())
                ->first();

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid or expired reset token. Please request a new password reset link.',
                ], 400);
            }

            // For password reset (not initial setup), allow resetting even if password is already set
            // Check if this is initial setup or password reset
            $isInitialSetup = $member->password_setup_required && !$member->password_hash;
            
            // If it's not initial setup and password is already set, check if token was already used
            if (!$isInitialSetup && $member->password_hash && !$member->password_setup_required) {
                // Check if token was recently used (within last minute) - allow reuse for mobile apps
                // Otherwise, token might be expired or already used
            }

            // Hash and save password to members table
            $hashedPassword = Hash::make($request->password);
            $member->update([
                'password_hash' => $hashedPassword,
                'password_setup_token' => null,
                'password_setup_token_expires_at' => null,
                'password_setup_required' => false,
            ]);

            // Create or update User record for authentication
            $user = \App\Models\User::where('email', $member->email)
                ->where('role_id', 2)
                ->first();

            if (!$user) {
                // Create new User record
                $username = strtolower(str_replace(' ', '', $member->firstname . $member->lastname)) . $member->id;
                // Ensure username is unique
                $originalUsername = $username;
                $counter = 1;
                while (\App\Models\User::where('username', $username)->exists()) {
                    $username = $originalUsername . $counter;
                    $counter++;
                }

                $user = \App\Models\User::create([
                    'firstname' => $member->firstname,
                    'lastname' => $member->lastname,
                    'username' => $username,
                    'email' => $member->email,
                    'phone' => $member->mobile_phone ?? $member->landline_phone ?? '',
                    'password' => $hashedPassword,
                    'status' => 1, // Active
                    'role_id' => 2, // Member role
                    'gym_id' => $member->gym_id ?? null,
                    'member_id' => $member->id,
                ]);
            } else {
                // Update existing User record with new password
                $user->update([
                    'password' => $hashedPassword,
                    'firstname' => $member->firstname,
                    'lastname' => $member->lastname,
                    'phone' => $member->mobile_phone ?? $member->landline_phone ?? $user->phone,
                    'status' => 1, // Ensure active
                    'member_id' => $member->id,
                ]);
            }

            // Auto-login member (generate token, return member data)
            $token = Str::random(60);
            $member->token = $token;
            $member->save();

            // Log the activity
            $activityType = $isInitialSetup ? 'password_setup_success' : 'password_reset_success';
            $this->logActivity($member, $request, $activityType);

            // For new members created via invitation, they typically don't have height/weight set
            // Check for null, empty string, or zero values
            $height = $member->height;
            $weight = $member->weight;
            $needsRegistration = (
                $height === null || 
                $height === '' || 
                $height === '0' || 
                (is_numeric($height) && (float)$height == 0) ||
                empty(trim((string)$height))
            ) || (
                $weight === null || 
                $weight === '' || 
                $weight === '0' || 
                (is_numeric($weight) && (float)$weight == 0) ||
                empty(trim((string)$weight))
            );
            
            \Log::info('Password setup - registration check', [
                'member_id' => $member->id,
                'height' => $member->height,
                'height_type' => gettype($member->height),
                'weight' => $member->weight,
                'weight_type' => gettype($member->weight),
                'needs_registration' => $needsRegistration,
                'has_token' => !empty($token)
            ]);

            $message = $isInitialSetup 
                ? 'Password set successfully. You are now logged in.'
                : 'Password reset successfully. You are now logged in.';

            return response()->json([
                'success' => true,
              'message' => $needsRegistration ? 'Password set successfully. Please complete your registration.' : 'Password set successfully. You are now logged in.',
                'needs_registration' => $needsRegistration,
                'registration_token' => $needsRegistration ? $token : null,
                'data' => [
                    'member' => [
                        'id' => $member->id,
                        'firstname' => $member->firstname,
                        'lastname' => $member->lastname,
                        'username' => $member->membername,
                        'email' => $member->email,
                        'phone' => $member->mobile_phone ?? $member->landline_phone,
                        'mobile_phone' => $member->mobile_phone,
                        'landline_phone' => $member->landline_phone,
                        'profile_image' => $member->profile_image,
                        'avatar' => $member->avatar,
                        'role_id' => $member->role_id,
                        'status' => $member->status,
                    ],
                    'token' => [
                        'access_token' => $token,
                        'token_type' => 'Bearer',
                        'expires_at' => now()->addDays(30)->toISOString(),
                    ]
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Setup password error: ' . $e->getMessage());
            \Log::error('Setup password trace: ' . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'message' => 'Server error: Unable to set password. Please try again later.',
            ], 500);
        }
    }

    public function changePassword(Request $request)
    {
        try {
            $user = $request->get('auth_member');

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
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

            // Get fresh user data from database to ensure we have the latest password
            $userRecord = User::find($user->id);
            
            if (!$userRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found',
                ], 404);
            }

            // Verify current password (users table uses 'password' field)
            if (!Hash::check($request->current_password, $userRecord->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Current password is incorrect',
                ], 400);
            }

            // Update password in users table
            $userRecord->update([
                'password' => Hash::make($request->new_password)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Password changed successfully',
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Change password error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $member = $request->get('auth_member');

            // Clear token
            $member->update(['token' => null]);

            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully',
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Logout error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function refresh(Request $request)
    {
        try {
            $member = $request->get('auth_member');

            // Generate new token
            $newToken = Str::random(60);
            $member->update(['token' => $newToken]);

            return response()->json([
                'success' => true,
                'message' => 'Token refreshed successfully',
                'data' => [
                    'token' => [
                        'access_token' => $newToken,
                        'token_type' => 'Bearer',
                        'expires_at' => now()->addDays(30)->toISOString(),
                    ]
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Token refresh error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }


    public function me(Request $request)
    {
        try {
            $member = $request->get('auth_member');

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized',
                ], 401);
            }

            return response()->json([
                'success' => true,
                'member' => [
                    'id' => $member->id,
                    'firstname' => $member->firstname,
                    'lastname' => $member->lastname,
                    'email' => $member->email,
                    'gender' => $member->gender,
                    'date_of_birth' => $member->date_of_birth,
                    'height' => $member->height,
                    'weight' => $member->weight,
                    'mobile_phone' => $member->mobile_phone,
                    'landline_phone' => $member->landline_phone,
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get member info error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Complete member registration with additional profile information
     */
    public function completeRegistration(Request $request)
    {
        try {
            $member = $request->get('auth_member');

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized',
                ], 401);
            }

            $validator = Validator::make($request->all(), [
                // 'height' => 'required|numeric|min:50|max:250',
                // 'weight' => 'required|numeric|min:20|max:300',
                'hide_real_name' => 'nullable|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Update member profile
            $member->update([
                'height' => $request->height,
                'weight' => $request->weight,
                // Store hide_real_name preference if needed (you may need to add this field to members table)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Registration completed successfully!',
                'member' => [
                    'id' => $member->id,
                    'firstname' => $member->firstname,
                    'lastname' => $member->lastname,
                    'height' => $member->height,
                    'weight' => $member->weight,
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Complete registration error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Log app launch activity
     */
    public function logAppLaunch(Request $request)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized',
                ], 401);
            }

            // Log app launch activity
            $this->logActivity($user, $request, 'app_launch');

            return response()->json([
                'success' => true,
                'message' => 'App launch logged successfully',
            ], 200);

        } catch (\Exception $e) {
            \Log::error('App launch logging error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Log successful login activity
     */
    private function logActivity($member, Request $request, $status = 'success')
    {
        try {
            ActivityLog::create([
                'gym_id' => $member->gym_id ?? 1,
                'member_id' => $member->id,
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
    private function logFailedActivity(Request $request, $status, $member = null)
    {
        try {
            ActivityLog::create([
                'gym_id' => $member->gym_id ?? 1,
                'member_id' => $member->id ?? null,
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
