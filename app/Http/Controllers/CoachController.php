<?php

namespace App\Http\Controllers;

use App\Models\Coach;
use App\Models\Task;
use App\Models\Appointment;
use App\Models\CoachAssignment;
use App\Models\ActivityLog;
use App\Models\MemberMessage;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Mail\CoachPasswordSetupEmail;
use App\Mail\CoachCreationConfirmationEmail;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;
use App\Services\NotificationService;

class CoachController extends Controller
{
    /**
     * Store a new coach.
     */
    public function store(Request $request)
    {
        // Get gym_id from authenticated user, default to null if not available
        $user = $request->user('api');
        $gym_id = $user ? $user->gym_id : null;

        $validator = Validator::make($request->all(), Coach::$rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Handle file upload
        $profilePicturePath = null;
        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $directory = public_path('storage/coaches');
            
            // Create directory if it doesn't exist
            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
            }
            
            // Generate unique filename
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            $file->move($directory, $filename);
            
            // Store relative path from public directory
            $profilePicturePath = 'storage/coaches/' . $filename;
            $updateData['profile_image'] = $profilePicturePath; // save path to DB column
        }
        

        // Handle specializations field
        $specializations = [];
        if ($request->has('specializations')) {
            if (is_string($request->specializations)) {
                $specializations = json_decode($request->specializations, true) ?? [];
            } elseif (is_array($request->specializations)) {
                $specializations = $request->specializations;
            } else {
                $specializations = [];
            }
        }

        // Handle privileges field
        $privileges = [];
        if ($request->has('privileges')) {
            if (is_string($request->privileges)) {
                $privileges = json_decode($request->privileges, true) ?? [];
            } elseif (is_array($request->privileges)) {
                $privileges = $request->privileges;
            } else {
                $privileges = [];
            }
        }

        $coachData = [
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'mobile_phone' => $request->mobile_phone,
            'landline_phone' => $request->landline_phone,
            'email' => $request->email,
            'dob' => $request->dob,
            'gender' => $request->gender,
           
            // Removed fields - columns no longer exist in database:
            // 'coach_type' => $request->coach_type,
            // 'coach_experience' => $request->coach_experience,
            // 'coach_certifications' => $request->coach_certifications,
            // 'specializations' => $specializations,
            // 'years_of_experience' => $request->years_of_experience,
            // 'status' => $request->status,
            // 'height_cm' => $request->height_cm,
            // 'weight_kg' => $request->weight_kg,
            // 'chest_inch' => $request->chest_inch,
            // 'blood_group' => $request->blood_group,
            // 'medical_conditions' => $request->medical_conditions,
            'address' => $request->address,
            'city' => $request->city,
            'state' => $request->state,
            'zip' => $request->zip,
            'country' => $request->country ?? 'United States',
            // Removed fields - columns no longer exist in database:
            // 'emergency_name' => $request->emergency_name,
            // 'emergency_phone' => $request->emergency_phone,
            // 'emergency_relation' => $request->emergency_relation,
            // 'referred_by' => $request->referred_by,
            // 'locker_number' => $request->locker_number,
            // 'bio' => $request->bio,
            // 'social_media' => $request->social_media,
            // 'notes' => $request->notes,
            // 'weekly_availability' => $request->weekly_availability,
            // 'session_duration' => $request->session_duration,
            // 'max_clients_per_day' => $request->max_clients_per_day,
            // 'is_trial' => $request->is_trial,
            // 'trial_start' => $request->trial_start,
            // 'trial_end' => $request->trial_end,
            // 'payment_plan' => $request->payment_plan,
            // 'payment_method' => $request->payment_method,
            // 'rate_salary' => $request->rate_salary,
            // 'commission_percent' => $request->commission_percent,
            // 'payment_start_date' => $request->payment_start_date,
            // Bank fields - conditionally add only if they have values
            // 'payment_notes' => $request->payment_notes, // Removed - column no longer exists
            'own_employee_id' => $request->own_employee_id,
            'custom_export_field' => $request->custom_export_field,
            'coach_since' => $request->coach_since,
            'subscription_reason' => $request->subscription_reason ?? 'Unknown',
            'language' => $request->language ?? 'English',
            'privileges' => !empty($privileges) ? $privileges : null,
            'send_invitation' => $request->has('send_invitation') ? (bool)$request->send_invitation : true,
            'profile_image' => $profilePicturePath ? '/' . $profilePicturePath : null,
            'gym_id' => $gym_id,
        ];
        
        // Add bank fields only if they have values (to avoid NOT NULL constraint violations)
        if ($request->filled('bank_account_name')) {
            $coachData['bank_account_name'] = $request->bank_account_name;
        }
        if ($request->filled('bank_account_number')) {
            $coachData['bank_account_number'] = $request->bank_account_number;
        }
        if ($request->filled('routing_number')) {
            $coachData['routing_number'] = $request->routing_number;
        }
        if ($request->filled('bank_account_type')) {
            $coachData['bank_account_type'] = $request->bank_account_type;
        }
        if ($request->filled('bank_name')) {
            $coachData['bank_name'] = $request->bank_name;
        }
        
        // Filter out null and empty string values to avoid database constraint violations
        $coachData = array_filter($coachData, function($value) {
            return $value !== null && $value !== '';
        });
                
        try {
            // Create coach
            $coach = Coach::create($coachData);
            
            // Create corresponding User record for login
            try {
                // Check if user already exists with this email and role
                $existingUser = User::where('email', $coach->email)
                    ->where('role_id', 3)
                    ->first();
                
                if (!$existingUser) {
                    // Generate a temporary password (will be changed when coach sets up password)
                    $tempPassword = Str::random(16);
                    
                    // Generate username from coach name
                    $username = strtolower(str_replace(' ', '', $coach->first_name . $coach->last_name)) . $coach->id;
                    // Ensure username is unique
                    $originalUsername = $username;
                    $counter = 1;
                    while (User::where('username', $username)->exists()) {
                        $username = $originalUsername . $counter;
                        $counter++;
                    }
                    
                    User::create([
                        'firstname' => $coach->first_name,
                        'lastname' => $coach->last_name,
                        'username' => $username,
                        'email' => $coach->email,
                        'phone' => $coach->mobile_phone ?? $coach->landline_phone ?? '',
                        'password' => Hash::make($tempPassword),
                        'statut' => 1, // Active
                        'role_id' => 3, // Coach role
                        'gym_id' => $gym_id,
                        'coach_id' => $coach->id,
                    ]);
                    
                    Log::info('User record created for coach: ' . $coach->email . ' (ID: ' . $coach->id . ')');
                } else {
                    // Update existing user with coach_id if not already set
                    if (!$existingUser->coach_id) {
                        $existingUser->coach_id = $coach->id;
                        $existingUser->save();
                        Log::info('Updated existing user with coach_id: ' . $coach->email . ' (Coach ID: ' . $coach->id . ')');
                    } else {
                        Log::info('User record already exists for coach: ' . $coach->email);
                    }
                }
            } catch (\Exception $e) {
                // Log error but don't fail coach creation
                Log::error('Failed to create User record for coach ' . $coach->id . ': ' . $e->getMessage());
            }
            
            // Generate password setup token and send email
            // Initialize email status tracking
            $emailSent = false;
            $emailError = null;
            $confirmationEmailSent = false;
            $confirmationEmailError = null;
            
            try {
                $setupToken = Str::random(60);
                $coach->update([
                    'password_setup_token' => $setupToken,
                    'password_setup_token_expires_at' => now()->addDays(7),
                    'password_setup_required' => true,
                ]);

                // Configure mail and validate configuration
                $mailConfigSet = \App\Http\Controllers\BaseController::Set_config_mail();
                
                if (!$mailConfigSet) {
                    $emailError = 'Email configuration not found. Please configure mail settings in Settings → Mail Settings.';
                    $confirmationEmailError = 'Email configuration not found. Please configure mail settings in Settings → Mail Settings.';
                    Log::error('Email configuration missing for coach ' . $coach->id . '. Please configure mail settings.');
                } else {
                    // Send password setup email to coach
                    // Jobs table dropped - sending synchronously
                    try {
                        Mail::to($coach->email)
                            ->send(new CoachPasswordSetupEmail($coach, $setupToken));
                        $emailSent = true;
                        Log::info('Password setup email sent to coach: ' . $coach->email . ' (ID: ' . $coach->id . ')');
                    } catch (\Exception $e) {
                        $emailError = $e->getMessage();
                        Log::error('Failed to send password setup email to coach ' . $coach->id, [
                            'email' => $coach->email,
                            'error' => $e->getMessage(),
                            'trace' => $e->getTraceAsString()
                        ]);
                    }
                    
                    // Send confirmation email to admin
                    // Jobs table dropped - sending synchronously
                    $adminEmail = 'huzaifa@xtremecleaner.co.uk';
                    try {
                        Mail::to($adminEmail)
                            ->send(new CoachCreationConfirmationEmail($coach, $adminEmail));
                        $confirmationEmailSent = true;
                        Log::info('Coach creation confirmation email sent to admin: ' . $adminEmail . ' for coach ID: ' . $coach->id);
                    } catch (\Exception $e) {
                        $confirmationEmailError = $e->getMessage();
                        Log::error('Failed to send confirmation email to admin for coach ' . $coach->id, [
                            'admin_email' => $adminEmail,
                            'error' => $e->getMessage(),
                            'trace' => $e->getTraceAsString()
                        ]);
                    }
                }
                
            } catch (\Exception $emailException) {
                // Log email failure but don't fail coach creation
                Log::error('Failed to send email for coach ' . $coach->id . ': ' . $emailException->getMessage());
                Log::error('Email exception trace: ' . $emailException->getTraceAsString());
            }

            // Create admin notifications for coach creation
            try {
                $adminUsers = \App\Models\User::where('role_id', 1)->get(); // Assuming role_id 1 is admin
                $coachName = trim(($coach->first_name ?? '') . ' ' . ($coach->last_name ?? ''));
                
                foreach ($adminUsers as $adminUser) {
                    \App\Models\AdminNotification::create([
                        'user_id' => $adminUser->id,
                        'gym_id' => $adminUser->gym_id ?? $coach->gym_id ?? 1,
                        'type' => 'coach_created',
                        'title' => 'New Coach Created',
                        'message' => "A new coach {$coachName} has been created. Password setup email sent to {$coach->email}.",
                        'icon' => 'fa-user-tie',
                        'color' => 'info',
                        'related_type' => 'coach',
                        'related_id' => $coach->id,
                        'is_read' => false,
                    ]);
                }
            } catch (\Exception $e) {
                Log::error('Failed to create notification for coach ' . $coach->id . ': ' . $e->getMessage());
                // Don't fail coach creation if notification creation fails
            }
            
            return response()->json([
                'status' => 'success',
                'message' => 'Coach created successfully',
                'coach' => $coach,
                'email_status' => [
                    'password_setup_email_sent' => $emailSent,
                    'password_setup_email_error' => $emailError,
                    'confirmation_email_sent' => $confirmationEmailSent,
                    'confirmation_email_error' => $confirmationEmailError,
                ]
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating coach:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'coachData' => $coachData
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Error creating coach: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Fix coaches table auto_increment issue
     */
    public function fixAutoIncrement()
    {
        try {
            // Get the highest ID from the coaches table
            $maxId = Coach::max('id');
            
            // Set auto_increment to max_id + 1
            $newAutoIncrement = ($maxId ?: 0) + 1;
            
            // Fix the auto_increment
            \DB::statement("ALTER TABLE coaches AUTO_INCREMENT = " . $newAutoIncrement);
            
            Log::info('Fixed coaches table auto_increment:', [
                'max_id' => $maxId,
                'new_auto_increment' => $newAutoIncrement
            ]);
            
            return response()->json([
                'status' => 'success',
                'message' => 'Auto increment fixed successfully',
                'max_id' => $maxId,
                'new_auto_increment' => $newAutoIncrement
            ]);
        } catch (\Exception $e) {
            Log::error('Error fixing auto_increment:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Error fixing auto_increment: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Fetch all coaches.
     */
    public function index(Request $request)
    {
        try {
            $gym_id = $request->user('api')->gym_id;
            $query = Coach::query()->where('gym_id', $gym_id);
            
            // Apply filters
            if ($request->filled('name')) {
                $query->where(function($q) use ($request) {
                    $q->where('first_name', 'like', '%' . $request->name . '%')
                      ->orWhere('last_name', 'like', '%' . $request->name . '%');
                });
            }
            
            if ($request->filled('code')) {
                $query->where('coach_id', 'like', '%' . $request->code . '%');
            }
            
            if ($request->filled('phone')) {
                $query->where('mobile_phone', 'like', '%' . $request->phone . '%');
            }
            
            if ($request->filled('email')) {
                $query->where('email', 'like', '%' . $request->email . '%');
            }
            
            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('first_name', 'like', '%' . $search . '%')
                      ->orWhere('last_name', 'like', '%' . $search . '%')
                      ->orWhere('coach_id', 'like', '%' . $search . '%')
                      ->orWhere('email', 'like', '%' . $search . '%')
                      ->orWhere('mobile_phone', 'like', '%' . $search . '%');
                });
            }
            
            // Apply sorting
            if ($request->filled('SortField') && $request->filled('SortType')) {
                $query->orderBy($request->SortField, $request->SortType);
            } else {
                $query->orderBy('id', 'desc');
            }
            
            // Get total count for pagination
            $totalRows = $query->count();
            
            // Apply pagination
            $limit = (int) $request->get('limit', 10);
            $page = (int) $request->get('page', 1);
            $coaches = $query->skip(($page - 1) * $limit)->take($limit)->get();
            
            // Transform coaches to match expected format
            $clients = $coaches->map(function($coach) {
                return [
                    'id' => $coach->id,
                    'coach_id' => "C-0000" . $coach->id ,
                    'name' => $coach->first_name . ' ' . $coach->last_name,
                    'code' => $coach->coach_id,
                    'email' => $coach->email,
                    'phone' => $coach->mobile_phone,
                    'specialization' => null,
                    'status' => strtolower($coach->status),
                    'profile_image' => $coach->profile_image  ?? null,
                    'country' => $coach->state ?? '',
                    'city' => $coach->city ?? '',
                    'adresse' => $coach->address ?? '',
                    'tax_number' => $coach->coach_id ?? '',
                    'due' => 0, // Default value for coaches
                    'return_Due' => 0, // Default value for coaches
                    'activated_on' => $coach->activated_on ? $coach->activated_on->toISOString() : null,
                    'last_online' => $coach->last_online ? $coach->last_online->toISOString() : null,
                    'last_login' => $coach->last_online ? $coach->last_online->toISOString() : null, // Alias for frontend compatibility
                    'created_at' => $coach->created_at ? $coach->created_at->toISOString() : null,
                ];
            });
            
            // Mock company info (you can replace this with actual company data)
            $company_info = [
                'CompanyName' => 'Fitness Center',
                'CompanyAdress' => '123 Fitness Street',
                'CompanyPhone' => '+1234567890'
            ];
            
            return response()->json([
                'clients' => $clients,
                'company_info' => $company_info,
                'totalRows' => $totalRows
            ]);
        } catch (\Exception $e) {
            Log::error('Coach index error: ' . $e->getMessage());
            return response()->json([
                'clients' => [],
                'company_info' => [],
                'totalRows' => 0,
                'error' => 'Database connection error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Fetch a single coach by ID.
     */
    public function show(Request $request, $id)
    {
        $gym_id = $request->user('api')->gym_id;
        
        $coach = Coach::where('id', $id)->where('gym_id', $gym_id)->first();

        if (!$coach) {
            return response()->json([
                'status' => 'error',
                'message' => 'Coach not found'
            ], 404);
        }
        
        return response()->json($coach);
    }

    /**
     * Import coaches from CSV file.
     */
    public function importCsv(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:2048'
        ]);

        try {
            $gym_id = $request->user('api')->gym_id;
            $file = $request->file('file');
            $path = $file->getRealPath();
            $data = array_map('str_getcsv', file($path));
            
            // Remove header row
            $headers = array_shift($data);
            
            $imported = 0;
            $errors = [];
            
            foreach ($data as $index => $row) {
                try {
                    $coachData = array_combine($headers, $row);
                    
                    // Validate required fields
                    if (empty($coachData['first_name']) || empty($coachData['last_name']) || 
                        empty($coachData['email']) || empty($coachData['phone']) ||
                        empty($coachData['address']) || empty($coachData['city']) ||
                        empty($coachData['state']) || empty($coachData['zip'])) {
                        $errors[] = "Row " . ($index + 2) . ": Missing required fields (First Name, Last Name, Email, Phone, Address, City, State, ZIP)";
                        continue;
                    }
                    
                    // Check if coach already exists (only check email since coach_id is now optional)
                    if (Coach::where('email', $coachData['email'])->exists()) {
                        $errors[] = "Row " . ($index + 2) . ": Email already exists";
                        continue;
                    }
                    
                    // Create coach with required fields and optional fields if provided
                    Coach::create([
                        'first_name' => $coachData['first_name'],
                        'last_name' => $coachData['last_name'],
                        'email' => $coachData['email'],
                        'mobile_phone' => $coachData['phone'], // Fixed: map 'phone' from CSV to 'mobile_phone' in database
                        'address' => $coachData['address'],
                        'city' => $coachData['city'],
                        'state' => $coachData['state'],
                        'zip' => $coachData['zip'],
                        'coach_id' => $coachData['coach_id'] ?? null,
                        'years_of_experience' => $coachData['years_of_experience'] ?? null,
                        'status' => $coachData['status'] ?? 'Active',
                        'dob' => $coachData['dob'] ?? null,
                        'gender' => $coachData['gender'] ?? null,
                        'gym_id' => $gym_id,
                    ]);
                    
                    $imported++;
                    
                } catch (\Exception $e) {
                    $errors[] = "Row " . ($index + 2) . ": " . $e->getMessage();
                }
            }
            
            return response()->json([
                'status' => true,
                'success' => $imported,
                'errors' => $errors,
                'message' => "Successfully imported {$imported} coaches" . 
                    (count($errors) > 0 ? " with " . count($errors) . " errors" : "")
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Import failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update an existing coach by ID.
     */
    public function update(Request $request, $id)
{
    $coach = Coach::findOrFail($id);

    // Validation - temporarily more lenient for debugging
    $validatedData = $request->validate([
        'first_name' => 'sometimes|required|string|max:255',
        'last_name'  => 'sometimes|required|string|max:255',
        'email'      => 'sometimes|required|email|unique:coaches,email,' . $coach->id,
        'mobile_phone' => 'nullable|string|max:20',
        'landline_phone' => 'nullable|string|max:20',
        'address'    => 'nullable|string|max:255',
        'city'       => 'nullable|string|max:255',
        'state'      => 'nullable|string|max:255',
        'zip'        => 'nullable|string|max:20',
        'status'     => 'nullable|string|max:50',
        'years_of_experience' => 'nullable|integer',
        'dob' => 'nullable|date',
        'gender' => 'nullable|string|max:20',
        'profile_image' => 'nullable|string', // Changed to string to accept base64 (matching MemberController)
        // Additional fields
        'bio' => 'nullable|string',
        'social_media' => 'nullable|string',
        'notes' => 'nullable|string',
        'weekly_availability' => 'nullable|string|max:100',
        'session_duration' => 'nullable|string|max:50',
        'max_clients_per_day' => 'nullable|integer',
        'height_cm' => 'nullable|numeric',
        'weight_kg' => 'nullable|numeric',
        'chest_inch' => 'nullable|numeric',
        'blood_group' => 'nullable|string|max:10',
        'medical_conditions' => 'nullable|string',
        'referred_by' => 'nullable|string|max:100',
        'locker_number' => 'nullable|string|max:10',
        'is_trial' => 'nullable|boolean',
        'trial_start' => 'nullable|date',
        'trial_end' => 'nullable|date',
        'payment_plan' => 'nullable|string|max:50',
        'payment_method' => 'nullable|string|max:50',
        'rate_salary' => 'nullable|numeric',
        'commission_percent' => 'nullable|numeric',
        'payment_start_date' => 'nullable|date',
        'bank_account_name' => 'nullable|string|max:150',
        'bank_account_number' => 'nullable|string|max:50',
        'payment_notes' => 'nullable|string',
        'coach_experience' => 'nullable|string',
        'coach_certifications' => 'nullable|string',
        // 'specializations' => 'nullable|string',
        'own_employee_id' => 'nullable|string|max:50',
        'custom_export_field' => 'nullable|string|max:255',
        'coach_since' => 'nullable|date',
        'subscription_reason' => 'nullable|string|max:100',
        'language' => 'nullable|string|max:50',
        'privileges' => 'nullable|array',
        'country' => 'nullable|string|max:100',
        'routing_number' => 'nullable|string|max:50',
        'bank_account_type' => 'nullable|string|max:50',
        'bank_name' => 'nullable|string|max:150',
        'send_invitation' => 'nullable|boolean',
    ]);

    // Handle profile image - convert base64 to file if needed (matching MemberController approach)
    $profileImage = $request['profile_image'];
    if ($request['profile_image']) {
        try {
            // Check if it's a base64 data URI
            if (preg_match('/^data:image\/(\w+);base64,/', $request['profile_image'], $matches)) {
                // Delete old image if exists (only if it's a file, not base64)
                if ($coach->profile_image && !Str::startsWith($coach->profile_image, 'data:image/')) {
                    $oldPath = ltrim($coach->profile_image, '/');
                    $oldImagePath = public_path($oldPath);
                    if (file_exists($oldImagePath)) {
                        @unlink($oldImagePath);
                    }
                }
                
                // Convert base64 to file
                $imageData = $request['profile_image'];
                $imageData = str_replace('data:image/' . $matches[1] . ';base64,', '', $imageData);
                $imageData = base64_decode($imageData);
                
                // Validate decoded data
                if ($imageData === false) {
                    throw new \Exception('Failed to decode base64 image data');
                }
                
                // Check file size (limit to ~2MB after decoding)
                if (strlen($imageData) > 2097152) { // 2MB
                    Log::warning('Profile image too large, skipping: ' . strlen($imageData) . ' bytes');
                    $profileImage = $coach->profile_image; // Keep old image
                } else {
                    // Generate unique filename
                    $extension = $matches[1] === 'jpeg' ? 'jpg' : $matches[1];
                    $filename = 'coach_' . time() . '_' . uniqid() . '.' . $extension;
                    
                    // Create directory if it doesn't exist
                    $uploadPath = public_path('storage/coaches');
                    if (!file_exists($uploadPath)) {
                        mkdir($uploadPath, 0755, true);
                    }
                    
                    // Save the file
                    file_put_contents($uploadPath . '/' . $filename, $imageData);
                    $profileImage = 'storage/coaches/' . $filename;
                }
            }
            // If it's already a file path (not base64), use it as is
        } catch (\Exception $e) {
            Log::error('Profile image update failed: ' . $e->getMessage());
            // Keep existing image on error
            if ($coach->profile_image) {
                $profileImage = $coach->profile_image;
            }
        }
    }

    // Prepare update data
    $updateData = $validatedData;
    $updateData['profile_image'] = $profileImage;
    
    // Add optional fields that might not be in validatedData
    $optionalFields = [
        'landline_phone', 'dob', 'gender', 'bio', 'weekly_availability', 'session_duration',
        'payment_plan', 'rate_salary', 'commission_percent', 'max_clients_per_day',
        'height_cm', 'weight_kg', 'chest_inch', 'blood_group', 'medical_conditions',
        'referred_by', 'locker_number', 'social_media', 'notes', 'is_trial',
        'trial_start', 'trial_end', 'payment_method', 'payment_start_date',
        'bank_account_name', 'bank_account_number', 'routing_number', 'bank_account_type', 'bank_name', 'payment_notes',
        'coach_experience', 'coach_certifications', 'specializations'
    ];
    
    foreach ($optionalFields as $field) {
        if ($request->has($field)) {
            $updateData[$field] = $request->input($field);
        }
    }
    
    // Update the coach (matching MemberController approach)
    $coach->update($updateData);
    
    // Remove the old complex file handling code - replaced with simple update above
    if (false) { // This block is now disabled - keeping for reference
        // Delete old image if exists
        $oldImagePath = null;
        if ($coach->profile_image) {
            $oldPath = ltrim($coach->profile_image, '/');
            $oldImagePath = public_path($oldPath);
        }
        
        // Move the new file FIRST
        $directory = public_path('storage/coaches');
        $filename = basename($newImagePath);
        
        Log::info('Attempting to move profile image file', [
            'coach_id' => $coach->id,
            'source' => $uploadedFile->getRealPath(),
            'destination' => $directory . '/' . $filename,
            'directory_exists' => is_dir($directory),
            'directory_writable' => is_writable($directory)
        ]);
        
        if ($uploadedFile->move($directory, $filename)) {
            Log::info('File moved successfully, now updating database', [
                'coach_id' => $coach->id,
                'new_path' => $newImagePath,
                'file_exists' => file_exists($directory . '/' . $filename)
            ]);
            
            // Delete old image AFTER successful move
            if ($oldImagePath && file_exists($oldImagePath)) {
                @unlink($oldImagePath);
            }
            
            // Use ONLY direct DB update - simplest and most reliable
            // First, check what's currently in the database
            $beforeUpdate = \DB::table('coaches')->where('id', $coach->id)->value('profile_image');
            
            Log::info('BEFORE update - current database value', [
                'coach_id' => $coach->id,
                'current_db_value' => $beforeUpdate,
                'new_path_to_save' => $newImagePath
            ]);
            
            // Perform the update
            $dbUpdated = \DB::table('coaches')
                ->where('id', $coach->id)
                ->update(['profile_image' => $newImagePath]);
            
            // Immediately verify what's in the database
            $dbValue = \DB::table('coaches')
                ->where('id', $coach->id)
                ->value('profile_image');
            
            Log::info('AFTER update - database value', [
                'coach_id' => $coach->id,
                'new_path' => $newImagePath,
                'db_update_rows_affected' => $dbUpdated,
                'db_value_immediately_after' => $dbValue,
                'update_successful' => ($dbValue === $newImagePath),
                'before_value' => $beforeUpdate
            ]);
            
            // If update failed or value doesn't match, try raw SQL with explicit connection
            if ($dbValue !== $newImagePath || $dbUpdated === 0) {
                Log::warning('Direct DB update failed or didn\'t match, trying raw SQL', [
                    'coach_id' => $coach->id,
                    'expected' => $newImagePath,
                    'actual' => $dbValue,
                    'rows_affected' => $dbUpdated
                ]);
                
                // Try with explicit connection and transaction
                try {
                    // Try multiple SQL approaches
                    // Approach 1: Parameterized statement
                    $stmt1 = \DB::connection()->getPdo()->prepare("UPDATE coaches SET profile_image = ? WHERE id = ?");
                    $stmt1->execute([$newImagePath, $coach->id]);
                    $rowsAffected1 = $stmt1->rowCount();
                    
                    // Approach 2: Direct update with escaped values
                    $escapedPath = addslashes($newImagePath);
                    $rowsAffected2 = \DB::statement("UPDATE coaches SET profile_image = '{$escapedPath}' WHERE id = {$coach->id}");
                    
                    // Verify again
                    $dbValue2 = \DB::table('coaches')->where('id', $coach->id)->value('profile_image');
                    
                    Log::info('After raw SQL update attempts', [
                        'coach_id' => $coach->id,
                        'db_value' => $dbValue2,
                        'expected' => $newImagePath,
                        'success' => ($dbValue2 === $newImagePath),
                        'rows_affected_stmt1' => $rowsAffected1,
                        'rows_affected_stmt2' => $rowsAffected2,
                        'values_match' => ($dbValue2 === $newImagePath),
                        'values_length_match' => (strlen($dbValue2) === strlen($newImagePath))
                    ]);
                    
                    if ($dbValue2 !== $newImagePath) {
                        // Check for database triggers
                        $triggers = \DB::select("SHOW TRIGGERS LIKE 'coaches'");
                        $tableInfo = \DB::select("SHOW CREATE TABLE coaches");
                        
                        Log::error('CRITICAL: All update methods failed', [
                            'coach_id' => $coach->id,
                            'expected' => $newImagePath,
                            'actual' => $dbValue2,
                            'coach_exists' => \DB::table('coaches')->where('id', $coach->id)->exists(),
                            'has_triggers' => !empty($triggers),
                            'triggers' => $triggers,
                            'table_structure' => isset($tableInfo[0]) ? substr($tableInfo[0]->{'Create Table'}, 0, 500) : 'N/A'
                        ]);
                        
                        // Final attempt - use model's update method with force
                        $coach->profile_image = $newImagePath;
                        $coach->timestamps = false; // Disable timestamps
                        $finalSave = $coach->save(['timestamps' => false]);
                        
                        $finalCheck = \DB::table('coaches')->where('id', $coach->id)->value('profile_image');
                        Log::info('Final model save attempt', [
                            'coach_id' => $coach->id,
                            'save_result' => $finalSave,
                            'final_db_value' => $finalCheck,
                            'success' => ($finalCheck === $newImagePath)
                        ]);
                    }
                } catch (\Exception $e) {
                    Log::error('Exception during raw SQL update', [
                        'coach_id' => $coach->id,
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString()
                    ]);
                }
            }
            
            // Update model attribute so refresh will show correct value
            $coach->setAttribute('profile_image', $newImagePath);
            $coach->syncOriginal();
        } else {
            Log::error('Failed to move profile image file', [
                'coach_id' => $coach->id,
                'filename' => $filename,
                'directory' => $directory,
                'error' => error_get_last()
            ]);
        }
    }
    
    // Update corresponding User record with coach_id
    try {
        $user = User::where('email', $coach->email)
            ->where('role_id', 3)
            ->first();
        
        if ($user) {
            // Update coach_id if not already set or if coach was updated
            if (!$user->coach_id || $user->coach_id != $coach->id) {
                $user->coach_id = $coach->id;
                $user->save();
                Log::info('Updated User record with coach_id: ' . $coach->email . ' (Coach ID: ' . $coach->id . ')');
            }
        }
    } catch (\Exception $e) {
        // Log error but don't fail coach update
        Log::error('Failed to update User record with coach_id for coach ' . $coach->id . ': ' . $e->getMessage());
    }

    // Refresh the model to get latest data
    $coach->refresh();
    
    // Prepare response data (matching MemberController approach)
    $coachData = $coach->toArray();
    
    // Ensure profile_image path is properly formatted
    if ($coachData['profile_image']) {
        $coachData['profile_image'] = '/' . ltrim($coachData['profile_image'], '/');
    }
    
    Log::info('Coach response data', [
        'coach_id' => $coach->id,
        'profile_image_in_response' => $coachData['profile_image']
    ]);

    return response()->json([
        'status' => 'success',
        'coach'  => $coachData,
        'message' => 'Coach updated successfully',
    ]);
}

    // public function update(Request $request, $id)
    // {
    //     try {
    //         $gym_id = $request->user('api')->gym_id;
    //         $coach = Coach::where('id', $id)->where('gym_id', $gym_id)->first();

    //         if (!$coach) {
    //             return response()->json([
    //                 'status' => 'error',
    //                 'message' => 'Coach not found'
    //             ], 404);
    //         }

    //         // Debug: Log request data safely
    //         Log::info('Coach update request received:', [
    //             'coach_id' => $id,
    //             'request_keys' => array_keys($request->all()),
    //             'has_file' => $request->hasFile('profile_image'),
    //             'required_fields' => [
    //                 'first_name' => $request->first_name,
    //                 'last_name' => $request->last_name,
    //                 'email' => $request->email,
    //                 'mobile_phone' => $request->mobile_phone,
    //                 'address' => $request->address,
    //                 'city' => $request->city,
    //                 'state' => $request->state,
    //                 'zip' => $request->zip,
    //                 'coach_type' => $request->coach_type,
    //                 'years_of_experience' => $request->years_of_experience,
    //                 'status' => $request->status,
    //             ]
    //         ]);

    //     // Validation rules - more flexible for updates
    //     $rules = [
    //         'first_name' => 'sometimes|required|string|max:100',
    //         'last_name' => 'sometimes|required|string|max:100',
    //         'mobile_phone' => 'sometimes|required|string|max:20',
    //         'landline_phone' => 'nullable|string|max:20',
    //         'email' => 'sometimes|required|email|unique:coaches,email,' . $id,
    //         'address' => 'sometimes|required|string|max:255',
    //         'city' => 'sometimes|required|string|max:100',
    //         'state' => 'sometimes|required|string|max:100',
    //         'zip' => 'sometimes|required|string|max:20',
    //         'dob' => 'nullable|date',
    //         'gender' => 'nullable|in:Male,Female,Other',
    //         'coach_type' => 'sometimes|required|in:Personal Coach,Group Coach,Yoga Coach,Pilates Coach,Nutritionist,Other',
    //         'years_of_experience' => 'sometimes|required|integer|min:0|max:50',
    //         'status' => 'sometimes|required|in:Active,Inactive,On Leave,Suspended,Terminated',
    //         'height_cm' => 'nullable|numeric|min:0',
    //         'weight_kg' => 'nullable|numeric|min:0',
    //         'chest_inch' => 'nullable|numeric|min:0',
    //         'blood_group' => 'nullable|in:A+,A-,B+,B-,O+,O-,AB+,AB-',
    //         'medical_conditions' => 'nullable|string',
    //         'emergency_name' => 'nullable|string|max:100',
    //         'emergency_phone' => 'nullable|string|max:20',
    //         'emergency_relation' => 'nullable|string|max:50',
    //         'referred_by' => 'nullable|string|max:100',
    //         'locker_number' => 'nullable|string|max:10',
    //         'bio' => 'nullable|string',
    //         'social_media' => 'nullable|string',
    //         'notes' => 'nullable|string',
    //         'weekly_availability' => 'nullable|string|max:100',
    //         'session_duration' => 'nullable|string|max:50',
    //         'max_clients_per_day' => 'nullable|integer|min:1|max:20',
    //         'is_trial' => 'nullable|boolean',
    //         'trial_start' => 'nullable|date',
    //         'trial_end' => 'nullable|date',
    //         'payment_plan' => 'nullable|in:Per Session,Monthly,Commission Based',
    //         'payment_method' => 'nullable|in:Bank,Flutterwave,Stripe,Zelle,Paypal,Mollie,Razorpay',
    //         'rate_salary' => 'nullable|numeric|min:0',
    //         'commission_percent' => 'nullable|numeric|min:0|max:100',
    //         'payment_start_date' => 'nullable|date',
    //         'bank_account_name' => 'nullable|string|max:150',
    //         'bank_account_number' => 'nullable|string|max:50',
    //         'payment_notes' => 'nullable|string',
    //     ];
        
    //     // If no new image is being uploaded, make profile_image validation nullable
    //     if (!$request->hasFile('profile_image')) {
    //         $rules['profile_image'] = 'nullable|string|max:255';
    //     } else {
    //         $rules['profile_image'] = 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048';
    //     }
        

    //     $validator = Validator::make($request->all(), $rules);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'status' => 'error',
    //             'errors' => $validator->errors()
    //         ], 422);
    //     }

    //     // Handle file upload for profile picture
    //     $profilePicturePath = null;
    //     if ($request->hasFile('profile_image')) {
    //         // Delete old profile picture from storage if it exists
    //         if ($coach->profile_image) {
    //             $oldPath = str_replace('/storage/', '', $coach->profile_image);
    //             Storage::delete('public/' . $oldPath);
    //         }
    //         $profilePicturePath = $request->file('profile_image')->store('coaches', 'public');
    //     }

    //     // Prepare update data - only include fields that were actually sent
    //     $updateData = [];
        
    //     // Include all fields that are present in the request
    //     $fieldsToCheck = [
    //         'first_name', 'last_name', 'mobile_phone', 'landline_phone', 'email',
    //         'dob', 'gender', 'coach_type', 'coach_experience', 'coach_certifications',
    //         'specializations', 'years_of_experience', 'status', 'height_cm', 'weight_kg',
    //         'chest_inch', 'blood_group', 'medical_conditions', 'address', 'city',
    //         'state', 'zip', 'emergency_name', 'emergency_phone', 'emergency_relation',
    //         'referred_by', 'locker_number', 'bio', 'social_media', 'notes',
    //         'weekly_availability', 'session_duration', 'max_clients_per_day',
    //         'is_trial', 'trial_start', 'trial_end', 'payment_plan', 'payment_method',
    //         'rate_salary', 'commission_percent', 'payment_start_date',
    //         'bank_account_name', 'bank_account_number', 'payment_notes'
    //     ];
        
    //     foreach ($fieldsToCheck as $field) {
    //         if ($request->has($field)) {
    //             $updateData[$field] = $request->$field;
    //         }
    //     }
        
    //     // Handle profile image path - only update if new image was uploaded
    //     if ($profilePicturePath) {
    //         $updateData['profile_image'] = $profilePicturePath;}
    //     // If no new image uploaded, don't include profile_image in update data
    //     // This preserves the existing image

    //     // Update coach fields
    //     $coach->update($updateData);

    //     // Refresh the coach data from database to ensure we return the latest data
    //     $coach->refresh();

    //     // Get the updated coach data
    //     $updatedCoach = $coach->fresh();
        
    //     return response()->json([
    //         'status' => 'success',
    //         'message' => 'Coach updated successfully',
    //         'coach' => $updatedCoach
    //     ], 200);
        
    //     } catch (\Exception $e) {
    //         Log::error('Coach update error:', [
    //             'coach_id' => $id,
    //             'error_message' => $e->getMessage(),
    //             'error_trace' => $e->getTraceAsString()
    //         ]);
            
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => 'An error occurred while updating the coach: ' . $e->getMessage()
    //         ], 500);
    //     }
    // }

    /**
     * Delete a coach by ID.
     */
    public function destroy(Request $request, $id)
    {
        $gym_id = $request->user('api')->gym_id;
        $coach = Coach::where('id', $id)->where('gym_id', $gym_id)->first();

        if (!$coach) {
            return response()->json([
                'status' => 'error',
                'message' => 'Coach not found'
            ], 404);
        }

        // Delete the profile picture from storage if it exists
        if ($coach->profile_picture) {
            Storage::delete('public/' . $coach->profile_picture);
        }

        // Delete the coach record
        $coach->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Coach deleted successfully'
        ], 200);
    }

    public function createTask(Request $request, $id)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'priority' => 'required|string|max:50',
            'dueDate' => 'required|date',
            'description' => 'nullable|string',
            'status' => 'required|string|max:50'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Find the coach
            $gym_id = $request->user('api')->gym_id;
            $coach = Coach::where('id', $id)->where('gym_id', $gym_id)->first();
            
            if (!$coach) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Coach not found'
                ], 404);
            }

            // Create the task using unified tasks table
            $task = Task::create([
                'coach_id' => $id,
                'user_id' => auth()->id() ?? 1, // Current user or default
                'gym_id' => $request->user('api')->gym_id ?? 1,
                'title' => $request->title,
                'category' => $request->category,
                'priority' => $request->priority,
                'due_date' => $request->dueDate,
                'description' => $request->description,
                'status' => $request->status ?? 'pending',
                'task_type' => 'coach', // Mark as coach task
            ]);

            // Create notifications for task creation
            try {
                $performedByUserId = $request->user('api')->id ?? auth()->id() ?? 1;
                NotificationService::taskCreated($task, $gym_id, $performedByUserId);
            } catch (\Exception $notificationException) {
                // Log notification error but don't fail the task creation
                Log::warning('Failed to create notification for task', [
                    'task_id' => $task->id,
                    'coach_id' => $id,
                    'error' => $notificationException->getMessage()
                ]);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Task created successfully',
                'task' => $task
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error creating task. Please try again.'
            ], 500);
        }
    }

    public function getCoachTasks(Request $request, $id)
    {
        try {
            $gym_id = $request->user('api')->gym_id;
            
            // First verify the coach belongs to the user's gym
            $coach = Coach::where('id', $id)->where('gym_id', $gym_id)->first();
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found'
                ], 404);
            }
            
            $tasks = Task::where('coach_id', $id)
                ->where('task_type', 'coach')
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($task) {
                    return [
                        'id' => $task->id,
                        'title' => $task->title,
                        'description' => $task->description,
                        'category' => $task->category,
                        'priority' => $task->priority,
                        'due_date' => $task->due_date,
                        'status' => $task->status,
                        'created_at' => $task->created_at,
                        'updated_at' => $task->updated_at
                    ];
                });

            return response()->json([
                'success' => true,
                'tasks' => $tasks
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching tasks: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateTask(Request $request, $id, $taskId)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'priority' => 'required|string|max:50',
            'dueDate' => 'required|date',
            'description' => 'nullable|string',
            'status' => 'required|string|max:50'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // First verify the coach belongs to the user's gym
            $gym_id = $request->user('api')->gym_id;
            $coach = Coach::where('id', $id)->where('gym_id', $gym_id)->first();
            
            if (!$coach) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Coach not found'
                ], 404);
            }
            
            $task = Task::where('id', $taskId)
                ->where('coach_id', $id)
                ->where('task_type', 'coach')
                ->first();

            if (!$task) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Task not found'
                ], 404);
            }

            $task->update([
                'title' => $request->title,
                'category' => $request->category,
                'priority' => $request->priority,
                'due_date' => $request->dueDate,
                'description' => $request->description,
                'status' => $request->status,
                'updated_at' => now()
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Task updated successfully',
                'task' => $task
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error updating task: ' . $e->getMessage()
            ], 500);
        }
    }

    public function deleteTask(Request $request, $id, $taskId)
    {
        try {
            // First verify the coach belongs to the user's gym
            $gym_id = $request->user('api')->gym_id;
            $coach = Coach::where('id', $id)->where('gym_id', $gym_id)->first();
            
            if (!$coach) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Coach not found'
                ], 404);
            }
            
            $task = Task::where('id', $taskId)
                ->where('coach_id', $id)
                ->where('task_type', 'coach')
                ->first();

            if (!$task) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Task not found'
                ], 404);
            }

            $task->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Task deleted successfully'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error deleting task: ' . $e->getMessage()
            ], 500);
        }
    }

    public function sendMessage(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'subject' => 'required|string|max:255',
            'body' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Find the coach (recipient)
            $gym_id = $request->user('api')->gym_id;
            $coach = Coach::where('id', $id)->where('gym_id', $gym_id)->first();
            
            if (!$coach) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Coach not found'
                ], 404);
            }

            // Get the authenticated user (sender) - admin sending to coach
            $sender = $request->user('api');
            
            // Find or get the member record for the admin user
            // Admin users might have a member_id, or we need to find member by email
            $senderMemberId = null;
            if ($sender->member_id) {
                $senderMemberId = $sender->member_id;
            } else {
                // Try to find member by email
                $senderMember = Member::where('email', $sender->email)
                    ->where('gym_id', $gym_id)
                    ->first();
                
                if ($senderMember) {
                    $senderMemberId = $senderMember->id;
                } else {
                    // If no member found, create a member record for the admin user
                    $senderMember = Member::create([
                        'gym_id' => $gym_id,
                        'firstname' => $sender->firstname ?? 'Admin',
                        'lastname' => $sender->lastname ?? 'User',
                        'email' => $sender->email,
                        'membername' => $sender->username ?? ($sender->firstname . ' ' . $sender->lastname),
                        'Statuses' => 'active'
                    ]);
                    $senderMemberId = $senderMember->id;
                    
                    // Update user with member_id
                    $sender->update(['member_id' => $senderMemberId]);
                }
            }
            
            // Save message to membermessages table
            // Admin (member) sends to coach, so we use receiver_coach_id
            // message_id is auto_increment, so we don't set it manually
            $messageData = [
                'gym_id' => $gym_id,
                'sender_member_id' => $senderMemberId, // Admin (member) is the sender
                'receiver_coach_id' => $id, // Coach is the receiver
                'message_text' => $request->body . "\n\nSubject: " . $request->subject, // Include subject in message text
                'sent_date' => now()
            ];
            
            $savedMessage = MemberMessage::create($messageData);
            
            // Create notifications for message sent
            try {
                $user = $request->user('api');
                $performedByUserId = $user ? $user->id : null;
                \App\Services\NotificationService::messageSent($savedMessage, $gym_id, $performedByUserId);
            } catch (\Exception $notificationException) {
                // Log notification error but don't fail the message sending
                Log::warning('Failed to create notification for message', [
                    'coach_id' => $id,
                    'message_id' => $savedMessage->id ?? $savedMessage->message_id ?? null,
                    'error' => $notificationException->getMessage()
                ]);
            }
            
            // Log the communication
            Log::info('Message sent to coach', [
                'coach_id' => $id,
                'receiver_coach_id' => $id,
                'message_id' => $savedMessage->message_id, // Use message_id as primary key
                'sender_member_id' => $senderMemberId,
                'subject' => $request->subject
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Message sent successfully to coach',
                'message_id' => $savedMessage->message_id // Use message_id as primary key
            ]);
            
        } catch (\Exception $e) {
            Log::error('Failed to send message to coach', [
                'coach_id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error sending message: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get messages for a coach
     * Fetches messages from membermessages table where coach is sender or receiver
     */
    public function getMessages(Request $request, $id)
    {
        try {
            $gym_id = $request->user('api')->gym_id;
            $coach = Coach::where('id', $id)->where('gym_id', $gym_id)->first();
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found'
                ], 404);
            }

            // Get the authenticated user's ID (sender/receiver)
            $userId = $request->user('api')->id;
            
            // Fetch messages where:
            // 1. Coach is the receiver (receiver_coach_id = coach id)
            // 2. Coach is the sender (sender_coach_id = coach id)
            // 3. Or user is sender/receiver (for backward compatibility)
            $messages = MemberMessage::where(function($query) use ($id, $userId) {
                    $query->where('receiver_coach_id', $id)
                          ->orWhere('sender_coach_id', $id)
                          ->orWhere(function($q) use ($userId) {
                              $q->where('sender_member_id', $userId)
                                ->orWhere('receiver_member_id', $userId);
                          });
                })
                ->where('gym_id', $gym_id)
                ->with(['senderMember:id,membername,firstname,lastname,email,profile_image'])
                ->with(['receiverMember:id,membername,firstname,lastname,email,profile_image'])
                ->with(['senderCoach:id,first_name,last_name,email,profile_image'])
                ->with(['receiverCoach:id,first_name,last_name,email,profile_image'])
                ->orderBy('sent_date', 'desc')
                ->get()
                ->map(function($message) use ($userId, $id) {
                    // Determine sender name
                    $senderName = 'Unknown';
                    if ($message->sender_coach_id) {
                        // Message sent by a coach
                        $senderCoach = $message->senderCoach;
                        if ($senderCoach) {
                            $senderName = trim($senderCoach->first_name . ' ' . $senderCoach->last_name);
                        }
                    } elseif ($message->sender_member_id && $message->senderMember) {
                        // Message sent by a member/admin
                        $sender = $message->senderMember;
                        if ($sender) {
                            $senderName = $sender->membername ?: trim(($sender->firstname ?? '') . ' ' . ($sender->lastname ?? ''));
                            // If still empty, use email
                            if (empty(trim($senderName))) {
                                $senderName = $sender->email ?? 'Unknown';
                            }
                        }
                    }
                    
                    // Extract subject from message_text if it contains "Subject:"
                    $subject = 'Message';
                    $body = $message->message_text;
                    if (strpos($body, "\n\nSubject: ") !== false) {
                        $parts = explode("\n\nSubject: ", $body);
                        if (count($parts) > 1) {
                            $subject = trim($parts[1]);
                            $body = trim($parts[0]);
                        }
                    }
                    
                    return [
                        'id' => $message->message_id, // Use message_id as the primary key
                        'sender' => $senderName,
                        'sender_id' => $message->sender_member_id,
                        'sender_coach_id' => $message->sender_coach_id,
                        'receiver_id' => $message->receiver_member_id,
                        'receiver_coach_id' => $message->receiver_coach_id,
                        'subject' => $subject,
                        'body' => $body,
                        'created_at' => $message->sent_date ? $message->sent_date->format('Y-m-d H:i:s') : $message->created_at->format('Y-m-d H:i:s'),
                        'sent_date' => $message->sent_date ? $message->sent_date->format('Y-m-d') : $message->created_at->format('Y-m-d'),
                        'read' => false // You can add a read status field to membermessages table if needed
                    ];
                });

            return response()->json([
                'success' => true,
                'messages' => $messages,
                'total_count' => $messages->count()
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to retrieve messages for coach', [
                'coach_id' => $id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve messages',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a message for a coach
     */
    public function deleteMessage(Request $request, $id, $messageId)
    {
        try {
            $gym_id = $request->user('api')->gym_id;
            $coach = Coach::where('id', $id)->where('gym_id', $gym_id)->first();
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found'
                ], 404);
            }

            $user = $request->user('api');
            $userId = $user->id;
            
            // Get the user's member_id if they have one
            $userMemberId = $user->member_id ?? null;
            if (!$userMemberId) {
                // Try to find member by email
                $userMember = Member::where('email', $user->email)
                    ->where('gym_id', $gym_id)
                    ->first();
                if ($userMember) {
                    $userMemberId = $userMember->id;
                }
            }
            
            // Find the message and verify it belongs to the user or coach
            // Use message_id as the primary key
            $message = MemberMessage::where('message_id', $messageId)
                ->where('gym_id', $gym_id)
                ->where(function($query) use ($userMemberId, $id) {
                    if ($userMemberId) {
                        $query->where('sender_member_id', $userMemberId)
                              ->orWhere('receiver_member_id', $userMemberId);
                    }
                    $query->orWhere('receiver_coach_id', $id)
                          ->orWhere('sender_coach_id', $id);
                })
                ->first();

            if (!$message) {
                return response()->json([
                    'success' => false,
                    'message' => 'Message not found or you do not have permission to delete it'
                ], 404);
            }

            // Delete the message (soft delete if using SoftDeletes)
            $message->delete();

            return response()->json([
                'success' => true,
                'message' => 'Message deleted successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to delete message for coach', [
                'coach_id' => $id,
                'message_id' => $messageId,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete message',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all members assigned to a specific coach
     */
    public function getAssignedMembers(Request $request, $id)
    {
        try {
            // Get authenticated user (works with both Passport and Mobile auth)
            // Try multiple methods to get the authenticated user
            $user = $request->user('api') 
                ?? $request->get('auth_user') 
                ?? $request->get('auth_member')
                ?? auth()->user()
                ?? auth('api')->user();
            
            if (!$user) {
                // Log for debugging
                if (config('app.debug')) {
                    \Log::warning('CoachController@getAssignedMembers: No user found', [
                        'has_auth_user' => $request->has('auth_user'),
                        'has_auth_member' => $request->has('auth_member'),
                        'request_user_api' => $request->user('api') ? 'exists' : 'null',
                        'auth_user' => auth()->user() ? 'exists' : 'null',
                        'auth_api_user' => auth('api')->user() ? 'exists' : 'null',
                        'has_auth_header' => $request->hasHeader('Authorization'),
                    ]);
                }
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized'
                ], 401);
            }
            
            // Get gym_id from user (works for both User and Member models)
            $gym_id = $user->gym_id ?? 1;
            $coach = Coach::where('id', $id)->where('gym_id', $gym_id)->first();
            
            if (!$coach) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Coach not found'
                ], 404);
            }

            // Get all active assignments for this coach
            $assignments = \App\Models\CoachAssignment::where('coach_id', $id)
                ->where('gym_id', $gym_id)
                ->where('status', 'active')
                ->with(['member:id,firstname,lastname,email,plan,Statuses,profile_image,membername,subscription_plan_id', 'member.membershipAssignments'])
                ->get();

            // Transform the data to match the frontend expectations
            $members = $assignments->map(function($assignment) {
                $member = $assignment->member;
                if (!$member) return null;
                
                return [
                    'id' => $member->id,
                    'name' => $member->firstname . ' ' . $member->lastname,
                    'email' => $member->email,
                    'phone' => $member->mobile_phone ?: $member->landline_phone,
                    'plan' => $member->plan,
                    'status' => $member->Statuses,
                    'profile_image' => $member->profile_image,
                    'membername' => $member->membername,
                    'subscription_plan_id' => $member->subscription_plan_id,
                    'assignment_id' => $assignment->id,
                    'assigned_date' => $assignment->assigned_date,
                    'start_date' => $assignment->start_date,
                    'end_date' => $assignment->end_date,
                    'session_frequency' => $assignment->session_frequency,
                    'session_duration' => $assignment->session_duration,
                    'goals' => $assignment->goals,
                    'special_requirements' => $assignment->special_requirements,
                ];
            })->filter()->values();

            // Filter for members without memberships/subscriptions if requested
            if ($request->filled('no_membership') && $request->no_membership === '1') {
                $members = $members->filter(function($member) {
                    // Check if member has no plan or plan is N/A/empty/0
                    $hasNoPlan = empty($member['plan']) || 
                                 $member['plan'] === 'N/A' || 
                                 $member['plan'] === '0' || 
                                 $member['plan'] === '';
                    
                    // Check if member has no subscription_plan_id
                    $hasNoSubscription = empty($member['subscription_plan_id']) || $member['subscription_plan_id'] == 0;
                    
                    // Check if member has no active membership assignments
                    // We need to reload the member to check membership assignments
                    $memberModel = \App\Models\Member::find($member['id']);
                    $hasNoMembershipAssignment = true;
                    
                    if ($memberModel) {
                        $activeAssignments = $memberModel->membershipAssignments()
                            ->where('status', 'active')
                            ->where(function($query) {
                                $query->whereNull('end_date')
                                     ->orWhere('end_date', '>=', now()->format('Y-m-d'))
                                     ->orWhereNull('calculated_end_date')
                                     ->orWhere('calculated_end_date', '>=', now()->format('Y-m-d'));
                            })
                            ->exists();
                        
                        $hasNoMembershipAssignment = !$activeAssignments;
                    }
                    
                    // Member should have no plan, no subscription, and no active membership assignment
                    return $hasNoPlan && $hasNoSubscription && $hasNoMembershipAssignment;
                })->values();
            }

            return response()->json([
                'status' => 'success',
                'members' => $members
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching assigned members: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Unassign a member from a coach using assignment_id
     * This uses the unique assignment_id to ensure only the specific assignment is unassigned
     * Falls back to member_id if assignment_id is not found
     */
    public function unassignMember(Request $request, $coachId, $assignmentId)
    {
        try {
            // First verify the coach belongs to the user's gym
            $gym_id = $request->user('api')->gym_id;
            $coach = Coach::where('id', $coachId)->where('gym_id', $gym_id)->first();
            
            if (!$coach) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Coach not found'
                ], 404);
            }

            // Try to find assignment by assignment_id first (preferred method)
            // Cast to integer to ensure proper type matching
            $assignmentIdInt = (int) $assignmentId;
            $assignment = \App\Models\CoachAssignment::where('id', $assignmentIdInt)
                ->where('coach_id', $coachId)
                ->where('gym_id', $gym_id)
                ->where('status', 'active')
                ->first();

            // If not found by assignment_id, try to find by member_id (fallback)
            // This handles cases where assignment_id might not be passed correctly from frontend
            if (!$assignment) {
                // Try member_id from request first
                $memberId = $request->input('member_id');
                
                // If member_id is provided in request, use it
                if ($memberId) {
                    $assignment = \App\Models\CoachAssignment::where('coach_id', $coachId)
                        ->where('member_id', (int) $memberId)
                        ->where('gym_id', $gym_id)
                        ->where('status', 'active')
                        ->first();
                    
                    if ($assignment) {
                        \Log::info('Found assignment by member_id fallback (from request)', [
                            'assignment_id' => $assignment->id,
                            'member_id' => $memberId,
                            'coach_id' => $coachId,
                            'original_param' => $assignmentId
                        ]);
                    }
                }
                
                // If still not found and no member_id in request, try using assignmentId as member_id
                // This handles cases where frontend passes member_id instead of assignment_id
                if (!$assignment && !$memberId) {
                    $assignment = \App\Models\CoachAssignment::where('coach_id', $coachId)
                        ->where('member_id', $assignmentIdInt)
                        ->where('gym_id', $gym_id)
                        ->where('status', 'active')
                        ->first();
                    
                    if ($assignment) {
                        \Log::info('Found assignment by treating param as member_id', [
                            'assignment_id' => $assignment->id,
                            'member_id' => $assignmentIdInt,
                            'coach_id' => $coachId,
                            'original_param' => $assignmentId
                        ]);
                    }
                }
            }

            // If assignment still not found, log for debugging
            if (!$assignment) {
                \Log::warning('Assignment not found for unassignment', [
                    'assignment_id_param' => $assignmentId,
                    'coach_id' => $coachId,
                    'gym_id' => $gym_id,
                    'member_id_from_request' => $request->input('member_id'),
                    'user_id' => $request->user('api')->id ?? null
                ]);
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'Assignment not found or already inactive. Please refresh the page and try again.'
                ], 404);
            }

            // Update ONLY this specific assignment by its unique ID - most precise method
            // Using where('id') ensures we only update this exact record
            \App\Models\CoachAssignment::where('id', $assignment->id)
                ->update(['status' => 'inactive']);
            
            // Get member info for notification
            $memberId = $assignment->member_id;

            // Clear member's coach_id if no other active assignments exist (hybrid approach)
            $hasOtherActiveAssignment = \App\Models\CoachAssignment::where('member_id', $memberId)
                ->where('status', 'active')
                ->where('id', '!=', $assignment->id)
                ->exists();
            
            if (!$hasOtherActiveAssignment) {
                \App\Models\Member::where('id', $memberId)->update(['coach_id' => null]);
            }

            // Create notification for the coach about member unassignment
            try {
                $member = \App\Models\Member::find($memberId);
                $memberName = $member ? trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? '')) : 'Member';
                
                // Use NotificationService for consistent notification creation
                \App\Services\NotificationService::createForCoach(
                    $coachId,
                    'member_unassigned',
                    'Member Unassigned',
                    "{$memberName} has been unassigned from you.",
                    'fa-user-minus',
                    'warning',
                    'member',
                    $memberId
                );
                
                \Log::info('Created member unassignment notification', [
                    'coach_id' => $coachId,
                    'member_id' => $memberId,
                    'member_name' => $memberName,
                ]);
            } catch (\Exception $notificationException) {
                \Log::error('Failed to create unassignment notification', [
                    'error' => $notificationException->getMessage(),
                    'trace' => $notificationException->getTraceAsString(),
                    'coach_id' => $coachId,
                    'member_id' => $memberId,
                ]);
                // Don't fail the unassignment if notification creation fails
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Member unassigned successfully'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error unassigning member: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Assign a member to a coach
     */
    public function assignMemberToCoach(Request $request, $coachId)
    {
        try {
            // First verify the coach belongs to the user's gym
            $gym_id = $request->user('api')->gym_id;
            $coach = Coach::where('id', $coachId)->where('gym_id', $gym_id)->first();
            
            if (!$coach) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Coach not found'
                ], 404);
            }

            // Validate request data
            $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                'member_id' => 'required|exists:members,id',
                'assigned_date' => 'required|date',
                'start_date' => 'required|date|after_or_equal:assigned_date',
                'end_date' => 'nullable|date|after:start_date',
                'session_frequency' => 'required|string|max:100',
                'session_duration' => 'required|string|max:100',
                'goals' => 'required|string|max:1000',
                'special_requirements' => 'nullable|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Verify member belongs to user's gym
            $member = \App\Models\Member::where('id', $request->member_id)
                ->where('gym_id', $gym_id)
                ->first();
            
            if (!$member) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Member not found'
                ], 404);
            }

            // Check if there's already an active assignment for this member
            $existingAssignment = \App\Models\CoachAssignment::where('member_id', $request->member_id)
                ->where('gym_id', $gym_id)
                ->where('status', 'active')
                ->first();

            if ($existingAssignment) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Member is already assigned to another coach'
                ], 422);
            }

            // Create new assignment
            $assignment = \App\Models\CoachAssignment::create([
                'coach_id' => $coachId,
                'member_id' => $request->member_id,
                'gym_id' => $gym_id,
                'assigned_date' => $request->assigned_date,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'session_frequency' => $request->session_frequency,
                'session_duration' => $request->session_duration,
                'goals' => $request->goals,
                'special_requirements' => $request->special_requirements,
                'status' => 'active',
                'notes' => 'Member assigned via coach management system'
            ]);

            // Update member's coach_id for quick access (hybrid approach)
            $member->update(['coach_id' => $coachId]);

            // Create notifications for coach assignment
            try {
                $coach = \App\Models\Coach::find($coachId);
                $user = $request->user('api');
                $performedByUserId = null;
                if ($user && isset($user->role_id) && $user->role_id == 1) {
                    $performedByUserId = $user->id;
                }
                
                if ($coach) {
                    \App\Services\NotificationService::coachAssigned(
                        $assignment,
                        $member,
                        $coach,
                        $gym_id,
                        $performedByUserId
                    );
                }
            } catch (\Exception $notificationException) {
                \Log::error('Failed to create assignment notification', [
                    'error' => $notificationException->getMessage(),
                    'trace' => $notificationException->getTraceAsString(),
                    'coach_id' => $coachId,
                    'member_id' => $request->member_id,
                ]);
                // Don't fail the assignment if notification creation fails
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Member assigned successfully',
                'assignment' => $assignment
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error assigning member: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Convert a coach to a member
     */
    public function convertToMember(Request $request, $id)
    {
        try {
            $coach = Coach::findOrFail($id);
            
            // Get gym_id from authenticated user
            $user = $request->user('api');
            $gym_id = $user ? $user->gym_id : null;
            
            if (!$gym_id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Gym ID not found'
                ], 400);
            }

            // Check if coach belongs to the user's gym
            if ($coach->gym_id !== $gym_id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Coach not found'
                ], 404);
            }

            // Check if a member with the same email already exists
            $existingMember = \App\Models\Member::where('email', $coach->email)
                ->where('gym_id', $gym_id)
                ->first();
                
            if ($existingMember) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'A member with this email already exists'
                ], 422);
            }

            // Create member data from coach data - use only essential fields that definitely exist
            $memberData = [
                'gym_id' => $gym_id,
                'membername' => $coach->first_name . ' ' . $coach->last_name,
                'firstname' => $coach->first_name,
                'lastname' => $coach->last_name,
                'email' => $coach->email,
                'date_of_birth' => $coach->dob,
                'gender' => $coach->gender,
                'city' => $coach->city,
                'state' => $coach->state,
                'zipcode' => $coach->zip,
                'start_date' => now()->toDateString(),
                'height' => $coach->height_cm,
                'weight' => $coach->weight_kg,
                'medical_condition' => $coach->medical_conditions,
                'contact_name' => null,
                'contact_phone' => null,
                'plan' => $coach->payment_plan ?? 'Basic',
                'Statuses' => 'Active',
                'address' => $coach->address,
            ];

            // Add optional fields only if they have values and are safe to include
            if ($coach->profile_image) {
                $memberData['profile_image'] = $coach->profile_image;
            }

            // Remove any null values that might cause issues
            $memberData = array_filter($memberData, function($value) {
                return $value !== null && $value !== '';
            });

            // Create the member
            $member = \App\Models\Member::create($memberData);

            // Update user role_id from 3 (coach) to 2 (member) and set member_id
            $user = User::where('email', $coach->email)->first();
            if ($user) {
                // Only update if current role_id is 3 (coach)
                if ($user->role_id == 3) {
                    $user->update([
                        'role_id' => 2,
                        'member_id' => $member->id,
                        'coach_id' => null // Clear coach_id since coach is being converted
                    ]);
                    \Log::info('User role updated to member:', [
                        'user_id' => $user->id,
                        'email' => $user->email,
                        'old_role_id' => 3,
                        'new_role_id' => 2,
                        'member_id' => $member->id
                    ]);
                } else {
                    // Even if role is not 3, update member_id and clear coach_id
                    $user->member_id = $member->id;
                    $user->coach_id = null;
                    $user->save();
                    \Log::info('Updated User record with member_id for converted coach:', [
                        'user_id' => $user->id,
                        'email' => $user->email,
                        'member_id' => $member->id,
                        'current_role_id' => $user->role_id
                    ]);
                }
            } else {
                \Log::warning('User not found for coach conversion:', [
                    'coach_id' => $coach->id,
                    'coach_email' => $coach->email
                ]);
            }

            // Delete the coach record
            $coach->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Coach successfully converted to member',
                'member' => $member,
                'member_id' => $member->id
            ]);

        } catch (\Exception $e) {
            \Log::error('Error converting coach to member:', [
                'coach_id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to convert coach to member: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get latest activities for a coach from mobile app
     * Aggregates activities from appointments, assignments, workouts, and activity logs
     */
    public function getCoachActivities($id)
    {
        try {
            $coach = Coach::find($id);
            
            if (!$coach) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Coach not found'
                ], 404);
            }

            $activities = [];
            $limit = 50; // Limit to latest 50 activities

            // 1. Get recent appointments (completed sessions)
            $appointments = Appointment::where('coach_id', $coach->id)
                ->where('status', 'completed')
                ->with('member')
                ->orderBy('date', 'desc')
                ->orderBy('start_time', 'desc')
                ->limit($limit)
                ->get();

            foreach ($appointments as $appointment) {
                try {
                    $memberName = $appointment->member ? $appointment->member->membername : 'Unknown Member';
                    
                    // Safely parse date and time
                    $dateTime = null;
                    if ($appointment->date && $appointment->start_time) {
                        try {
                            $dateTime = Carbon::parse($appointment->date . ' ' . $appointment->start_time);
                        } catch (\Exception $e) {
                            // Fallback to created_at if date parsing fails
                            $dateTime = $appointment->created_at ? Carbon::parse($appointment->created_at) : Carbon::now();
                        }
                    } else {
                        // Use created_at if date or time is missing
                        $dateTime = $appointment->created_at ? Carbon::parse($appointment->created_at) : Carbon::now();
                    }
                    
                    $activities[] = [
                        'type' => 'session_completed',
                        'title' => 'Session completed',
                        'description' => "Personal training session with {$memberName}",
                        'icon' => 'calendar-check',
                        'icon_color' => 'info',
                        'timestamp' => $dateTime,
                        'created_at' => $appointment->created_at,
                    ];
                } catch (\Exception $e) {
                    Log::debug('Skipping appointment activity due to error: ' . $e->getMessage());
                    continue;
                }
            }

            // 2. Get recent member assignments
            $assignments = CoachAssignment::where('coach_id', $coach->id)
                ->where('status', 'active')
                ->with('member')
                ->orderBy('assigned_date', 'desc')
                ->limit($limit)
                ->get();

            foreach ($assignments as $assignment) {
                try {
                    $memberName = $assignment->member ? $assignment->member->membername : 'Unknown Member';
                    
                    // Safely parse assigned_date
                    $dateTime = null;
                    if ($assignment->assigned_date) {
                        try {
                            $dateTime = Carbon::parse($assignment->assigned_date);
                        } catch (\Exception $e) {
                            // Fallback to created_at if date parsing fails
                            $dateTime = $assignment->created_at ? Carbon::parse($assignment->created_at) : Carbon::now();
                        }
                    } else {
                        // Use created_at if assigned_date is missing
                        $dateTime = $assignment->created_at ? Carbon::parse($assignment->created_at) : Carbon::now();
                    }
                    
                    $activities[] = [
                        'type' => 'member_assigned',
                        'title' => 'New member assigned',
                        'description' => "{$memberName} was assigned to this coach",
                        'icon' => 'user-plus',
                        'icon_color' => 'success',
                        'timestamp' => $dateTime,
                        'created_at' => $assignment->created_at,
                    ];
                } catch (\Exception $e) {
                    Log::debug('Skipping assignment activity due to error: ' . $e->getMessage());
                    continue;
                }
            }

            // 3. Get recent activity logs (app launches, logins)
            // Wrap in try-catch in case activity_logs table doesn't exist
            try {
                $user = User::where('email', $coach->email)->first();
                if ($user) {
                    // Check if table exists before querying
                    $tableExists = \Illuminate\Support\Facades\Schema::hasTable('activity_logs');
                    if ($tableExists) {
                        $activityLogs = ActivityLog::where('member_id', $user->id)
                            ->whereIn('login_status', ['success', 'app_launch'])
                            ->orderBy('login_time', 'desc')
                            ->limit(20)
                            ->get();

                        foreach ($activityLogs as $log) {
                            try {
                                $activityType = $log->login_status === 'app_launch' ? 'app_launch' : 'login';
                                
                                // Safely parse login_time
                                $dateTime = null;
                                if ($log->login_time) {
                                    try {
                                        $dateTime = Carbon::parse($log->login_time);
                                    } catch (\Exception $e) {
                                        // Fallback to current time if parsing fails
                                        $dateTime = Carbon::now();
                                    }
                                } else {
                                    $dateTime = Carbon::now();
                                }
                                
                                $activities[] = [
                                    'type' => $activityType,
                                    'title' => $log->login_status === 'app_launch' ? 'App launched' : 'Logged in',
                                    'description' => $log->login_status === 'app_launch' 
                                        ? 'Coach app was launched from mobile device'
                                        : 'Coach logged into mobile app',
                                    'icon' => $log->login_status === 'app_launch' ? 'mobile-alt' : 'sign-in-alt',
                                    'icon_color' => 'primary',
                                    'timestamp' => $dateTime,
                                    'created_at' => $log->login_time,
                                ];
                            } catch (\Exception $e) {
                                Log::debug('Skipping activity log due to error: ' . $e->getMessage());
                                continue;
                            }
                        }
                    }
                }
            } catch (\Exception $e) {
                // Silently skip activity logs if table doesn't exist or query fails
                Log::debug('Activity logs not available: ' . $e->getMessage());
            }

            // Note: Workout assignments can be added here if needed in the future
            // The WorkoutAssignment model uses assigned_by (user_id) rather than coach_id

            // Sort all activities by timestamp (most recent first)
            // Filter out any activities with invalid timestamps before sorting
            $validActivities = [];
            foreach ($activities as $activity) {
                if (isset($activity['timestamp']) && $activity['timestamp'] instanceof Carbon) {
                    $validActivities[] = $activity;
                }
            }
            $activities = $validActivities;
            
            usort($activities, function($a, $b) {
                try {
                    return $b['timestamp']->timestamp <=> $a['timestamp']->timestamp;
                } catch (\Exception $e) {
                    return 0;
                }
            });

            // Limit to latest 50 activities
            $activities = array_slice($activities, 0, $limit);

            // Format timestamps for frontend
            foreach ($activities as &$activity) {
                try {
                    if (isset($activity['timestamp']) && $activity['timestamp'] instanceof Carbon) {
                        $activity['time_ago'] = $activity['timestamp']->diffForHumans();
                        $activity['timestamp'] = $activity['timestamp']->toIso8601String();
                    }
                } catch (\Exception $e) {
                    Log::debug('Error formatting activity timestamp: ' . $e->getMessage());
                    // Set default values if formatting fails
                    $activity['time_ago'] = 'Unknown';
                    $activity['timestamp'] = Carbon::now()->toIso8601String();
                }
            }

            return response()->json([
                'status' => 'success',
                'data' => $activities,
                'count' => count($activities)
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching coach activities:', [
                'coach_id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch coach activities: ' . $e->getMessage()
            ], 500);
        }
    }
}