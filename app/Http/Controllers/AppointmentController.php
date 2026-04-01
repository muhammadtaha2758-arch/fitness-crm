<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Member;
use App\Models\Coach;
use App\Services\NotificationService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use DateTime;
use DateInterval;
use Exception;

class AppointmentController extends Controller
{
    // Display a listing of appointments
    public function index(Request $request)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        // Get the current user's gym ID
        $gymId = $user->gym_id ?? null;
        
        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }
        
        // Get appointments for the current gym only
        $appointments = Appointment::with(['member', 'coach'])
            ->whereHas('member', function($query) use ($gymId) {
                $query->where('gym_id', $gymId);
            })
            ->orWhereHas('coach', function($query) use ($gymId) {
                $query->where('gym_id', $gymId);
            })
            ->get();
        
        // Transform appointments to vue-cal format
        $events = $appointments->map(function ($appointment) {
            // Debug logging
            \Log::info('Processing appointment', [
                'id' => $appointment->id,
                'date' => $appointment->date,
                'start_time' => $appointment->start_time,
                'end_time' => $appointment->end_time,
                'start_time_type' => gettype($appointment->start_time),
                'end_time_type' => gettype($appointment->end_time)
            ]);
            
            // Get workout type name
            $workoutTypes = [
                1 => 'Cardio',
                2 => 'Strength', 
                3 => 'Yoga',
                4 => 'HIIT',
                5 => 'Pilates',
                6 => 'Crossfit'
            ];
            $workoutName = $workoutTypes[$appointment->workout_id] ?? 'Unknown';
            

            
            // Format dates properly for vue-cal
            // Create proper ISO datetime strings that JavaScript can parse
            try {
                // Ensure we have valid date and time data
                if (!$appointment->date || !$appointment->start_time || !$appointment->end_time) {
                    throw new Exception('Missing date or time data');
                }
                
                // Since start_time and end_time are time fields, they should already be in "HH:MM:SS" format
                $startTime = $appointment->start_time;
                $endTime = $appointment->end_time;
                
                // Validate that times are in correct format
                if (!preg_match('/^\d{2}:\d{2}:\d{2}$/', $startTime) || !preg_match('/^\d{2}:\d{2}:\d{2}$/', $endTime)) {
                    throw new Exception('Invalid time format');
                }
                
                // Get just the date portion (YYYY-MM-DD) and combine with time
                $dateOnly = date('Y-m-d', strtotime($appointment->date));
                $startDateTime = $dateOnly . 'T' . $startTime;
                $endDateTime = $dateOnly . 'T' . $endTime;
                
                // Validate final datetime strings
                if (!$startDateTime || !$endDateTime) {
                    throw new Exception('Invalid datetime string creation');
                }
                
                // Debug logging for successful conversion
                \Log::info('Successfully created datetime strings', [
                    'appointment_id' => $appointment->id,
                    'startDateTime' => $startDateTime,
                    'endDateTime' => $endDateTime
                ]);
                
            } catch (Exception $e) {
                // If conversion fails, create fallback datetime strings
                $startDateTime = $appointment->date . 'T00:00:00';
                $endDateTime = $appointment->date . 'T01:00:00';
                
                \Log::warning('Using fallback datetime strings', [
                    'appointment_id' => $appointment->id,
                    'error' => $e->getMessage(),
                    'fallback_start' => $startDateTime,
                    'fallback_end' => $endDateTime
                ]);
            }
            
            // Build title with rating if available
            $title = $appointment->client_name . ' (' . $appointment->staff_name . ') - ' . $workoutName;
            if ($appointment->status === 'completed' && $appointment->rating) {
                $title .= ' ⭐ ' . number_format($appointment->rating, 1);
            }
            
            return [
                'id' => $appointment->id,
                'start' => $startDateTime,
                'end' => $endDateTime,
                'title' => $title,
                'date' => $appointment->date,
                'start_time' => $appointment->start_time,
                'end_time' => $appointment->end_time,
                'staff_id' => $appointment->coach_id,
                // keep API stable: expose client_id using member_id value
                'client_id' => $appointment->member_id,
                'workout_id' => $appointment->workout_id,
                'status' => $appointment->status,
                'rating' => $appointment->rating,
                'appointment_data' => [
                    'coach' => $appointment->coach ? [
                        'id' => $appointment->coach->id,
                        'first_name' => $appointment->coach->first_name,
                        'last_name' => $appointment->coach->last_name,
                    ] : null,
                    'member' => $appointment->member ? [
                        'id' => $appointment->member->id,
                        'membername' => $appointment->member->membername,
                    ] : null,
                ]
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $events
        ]);
    }

    // Get all clients (members)
    public function getClients(Request $request)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        // Get the current user's gym ID
        $gymId = $user->gym_id ?? null;
        
        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }
        
        $clients = Member::select('id', 'membername as name')
            ->where('gym_id', $gymId)
            ->where(function($query) {
                $query->where('Statuses', 'active')
                      ->orWhere('Statuses', 'Active');
            })
            ->get();

        return response()->json([
            'success' => true,
            'data' => $clients
        ]);
    }   

    // Get all staff (coaches)
    public function getStaff(Request $request)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        // Get the current user's gym ID
        $gymId = $user->gym_id ?? null;
        
        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }
        
        try {
            // Debug: Log initial query attempt
            \Log::info('Fetching staff/coaches', [
                'gym_id' => $gymId,
                'user_id' => $user->id ?? null
            ]);
            
            // First, check how many coaches exist for this gym (without status filter)
            $totalCoaches = Coach::where('gym_id', $gymId)->count();
            \Log::info('Total coaches for gym', ['gym_id' => $gymId, 'count' => $totalCoaches]);
            
            // Check status values in database
            $statusValues = Coach::where('gym_id', $gymId)
                ->distinct()
                ->pluck('status')
                ->filter()
                ->values()
                ->toArray();
            \Log::info('Status values found in database', ['statuses' => $statusValues]);
            
            // Try to get column information from the database schema
            $columns = DB::getSchemaBuilder()->getColumnListing('coaches');
            
            // Build name field based on available columns
            // Try multiple column name combinations with COALESCE to handle NULLs
            $nameExpression = null;
            
            if (in_array('first_name', $columns) && in_array('last_name', $columns)) {
                // Standard: first_name + last_name (handle NULLs with COALESCE)
                $nameExpression = DB::raw("TRIM(CONCAT(COALESCE(first_name, ''), ' ', COALESCE(last_name, ''))) as name");
            } elseif (in_array('name', $columns)) {
                // Alternative: single name column
                $nameExpression = DB::raw("COALESCE(name, CONCAT('Coach #', id)) as name");
            } elseif (in_array('fname', $columns) && in_array('lname', $columns)) {
                // Alternative: fname + lname
                $nameExpression = DB::raw("TRIM(CONCAT(COALESCE(fname, ''), ' ', COALESCE(lname, ''))) as name");
            } elseif (in_array('firstname', $columns) && in_array('lastname', $columns)) {
                // Alternative: firstname + lastname (no underscore)
                $nameExpression = DB::raw("TRIM(CONCAT(COALESCE(firstname, ''), ' ', COALESCE(lastname, ''))) as name");
            } else {
                // Fallback: use email or ID
                if (in_array('email', $columns)) {
                    $nameExpression = DB::raw("COALESCE(email, CONCAT('Coach #', id)) as name");
                } else {
                    $nameExpression = DB::raw("CONCAT('Coach #', id) as name");
                }
            }
            
            // Build query - try multiple approaches
            // First try with gym_id and status filter
            $query = Coach::select('id', $nameExpression)
                ->where('gym_id', $gymId);
            
            // Try case-insensitive status check first
            if (in_array('status', $columns)) {
                $query->where(function($q) {
                    $q->whereRaw("LOWER(status) = LOWER(?)", ['Active'])
                      ->orWhereNull('status'); // Include NULL status as well
                });
            }
            
            $staff = $query->get();
            
            \Log::info('Coaches found with status filter', ['count' => $staff->count()]);
            
            // If no results with status filter, try without status filter
            if ($staff->isEmpty() && in_array('status', $columns)) {
                \Log::info('No coaches found with status filter, trying without status filter');
                $staff = Coach::select('id', $nameExpression)
                    ->where('gym_id', $gymId)
                    ->get();
                \Log::info('Coaches found without status filter', ['count' => $staff->count()]);
            }
            
            // If still no results, try with NULL gym_id (in case coaches don't have gym_id set)
            if ($staff->isEmpty()) {
                \Log::info('No coaches found with gym_id filter, trying with NULL gym_id');
                $query = Coach::select('id', $nameExpression);
                
                if (in_array('status', $columns)) {
                    $query->where(function($q) {
                        $q->whereRaw("LOWER(status) = LOWER(?)", ['Active'])
                          ->orWhereNull('status');
                    });
                }
                
                $staff = $query->get();
                \Log::info('Coaches found with NULL gym_id', ['count' => $staff->count()]);
            }
            
            // Post-process to ensure no empty names
            $staff = $staff->map(function($coach) {
                if (empty($coach->name) || trim($coach->name) === '') {
                    $coach->name = 'Coach #' . $coach->id;
                }
                return [
                    'id' => $coach->id,
                    'name' => trim($coach->name)
                ];
            });
            
            \Log::info('Final staff count', ['count' => $staff->count()]);
            
            return response()->json([
                'success' => true,
                'data' => $staff,
                'debug' => [
                    'gym_id' => $gymId,
                    'total_coaches' => $totalCoaches,
                    'status_values' => $statusValues,
                    'returned_count' => $staff->count()
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to fetch staff/coaches', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'gym_id' => $gymId
            ]);
            
            // Fallback: try to get coaches without name formatting
            try {
                $coaches = Coach::where('gym_id', $gymId)->get(['id']);
                
                $staff = $coaches->map(function($coach) {
                    return [
                        'id' => $coach->id,
                        'name' => 'Coach #' . $coach->id
                    ];
                });
                
                return response()->json([
                    'success' => true,
                    'data' => $staff,
                    'warning' => 'Using fallback name format. Please check database column structure.'
                ]);
            } catch (\Exception $fallbackError) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to fetch staff. Please check database column structure.',
                    'error' => $e->getMessage()
                ], 500);
            }
        }
    }

    // Store a newly created appointment
    public function store(Request $request)
    {
        // Accept both client_id and member_id for flexibility
        $clientId = $request->input('client_id') ?? $request->input('member_id');
        
        $validator = Validator::make(array_merge($request->all(), ['client_id' => $clientId]), [
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'staff_id' => 'required|integer',
            'client_id' => 'required|integer',
            'workout_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        // Get the current user's gym ID
        $gymId = $user->gym_id ?? null;
        
        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }

        // Verify that both client and staff belong to the same gym
        $client = Member::where('id', $clientId)
            ->where('gym_id', $gymId)
            ->first();
            
        $staff = Coach::where('id', $request->staff_id)
            ->where('gym_id', $gymId)
            ->first();

        if (!$client) {
            return response()->json([
                'success' => false,
                'message' => 'Client not found or does not belong to your gym'
            ], 404);
        }

        if (!$staff) {
            return response()->json([
                'success' => false,
                'message' => 'Staff member not found or does not belong to your gym'
            ], 404);
        }

        try {
            // Check credits before creating appointment
            $creditService = new \App\Services\MemberCreditService();
            $creditCost = $request->input('credit_cost'); // Optional override
            $adminOverride = $request->input('admin_override', false);
            
            $creditCheck = $creditService->checkCreditsBeforeActivityCreation(
                $clientId,
                'appointment',
                $creditCost,
                $adminOverride
            );
            
            if (!$creditCheck['can_proceed']) {
                return response()->json([
                    'success' => false,
                    'message' => $creditCheck['message'],
                    'error_code' => 'INSUFFICIENT_CREDITS',
                    'insufficient' => true,
                    'required' => $creditCheck['required'] ?? null,
                    'available' => $creditCheck['available'] ?? null
                ], 422);
            }
            
            // Check if this is a mobile booking (from mobile app route)
            $source = $request->header('X-Requested-With') === 'mobile' || 
                     $request->has('booked_from_mobile') || 
                     str_contains($request->header('User-Agent', ''), 'Mobile') ? 'mobile' : 'crm';
            
            $appointment = Appointment::create([
                'gym_id' => $gymId,
                // persist to member_id column in DB
                'member_id' => $clientId,
                'coach_id' => $request->staff_id,
                'workout_id' => $request->workout_id,
                'date' => $request->date,
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
                'status' => 'scheduled',
                'source' => $source
            ]);

            // Refresh appointment to ensure it's fully saved in database
            $appointment->refresh();

            // Deduct credits when appointment is created
            $creditDeductionStatus = null;
            $creditDeductionError = null;
            $creditDeductionDetails = null;
            try {
                $creditService = new \App\Services\MemberCreditService();
                $creditCost = $request->input('credit_cost'); // Optional override
                $adminOverride = $request->input('admin_override', false);
                
                // Log attempt to deduct credits
                \Log::info('Attempting to deduct credits when appointment created', [
                    'appointment_id' => $appointment->id,
                    'member_id' => $appointment->member_id,
                    'credit_cost' => $creditCost,
                    'admin_override' => $adminOverride
                ]);
                
                $result = $creditService->deductCreditsForActivity(
                    $appointment->member_id,
                    'appointment',
                    $appointment->id,
                    $creditCost,
                    $adminOverride
                );

                if ($result['success']) {
                    $creditDeductionStatus = 'success';
                    $creditDeductionDetails = [
                        'transaction_id' => $result['transaction_id'] ?? null,
                        'remaining_credits' => $result['remaining_credits'] ?? null
                    ];
                    \Log::info('Credits deducted successfully when appointment created', [
                        'appointment_id' => $appointment->id,
                        'member_id' => $appointment->member_id,
                        'transaction_id' => $result['transaction_id'] ?? null,
                        'remaining_credits' => $result['remaining_credits'] ?? null
                    ]);
                    
                    // Refresh appointment to get updated credit_deducted flag
                    $appointment->refresh();
                } else {
                    $creditDeductionStatus = 'failed';
                    $creditDeductionError = $result['message'];
                    $creditDeductionDetails = [
                        'error_code' => $result['error_code'] ?? null,
                        'insufficient' => $result['insufficient'] ?? false
                    ];
                    \Log::warning('Failed to deduct credits when appointment created', [
                        'appointment_id' => $appointment->id,
                        'member_id' => $appointment->member_id,
                        'error' => $result['message'],
                        'credit_cost' => $creditCost,
                        'error_code' => $result['error_code'] ?? null,
                        'insufficient' => $result['insufficient'] ?? false,
                        'note' => 'Appointment was created but credits were not deducted. Credits may need to be deducted manually or member may need credits.'
                    ]);
                }
            } catch (\Exception $e) {
                // Log error but don't fail appointment creation if credit deduction fails
                $creditDeductionStatus = 'error';
                $creditDeductionError = $e->getMessage();
                $creditDeductionDetails = [
                    'exception' => get_class($e),
                    'file' => $e->getFile(),
                    'line' => $e->getLine()
                ];
                \Log::error('Error deducting credits when appointment created: ' . $e->getMessage(), [
                    'appointment_id' => $appointment->id,
                    'member_id' => $appointment->member_id,
                    'exception' => get_class($e),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString()
                ]);
            }

            // Create notifications for appointment creation
            $notificationStatus = true;
            $notificationError = null;
            $memberNotification = null;
            $coachNotification = null;
            try {
                $member = Member::find($clientId);
                $trainer = Coach::find($request->staff_id);
                
                // Get performedByUserId if current user is an admin
                $performedByUserId = null;
                if ($user && isset($user->role_id) && $user->role_id == 1) {
                    $performedByUserId = $user->id;
                }
                
                if ($member && $trainer) {
                    $results = NotificationService::appointmentCreated($appointment, $member, $trainer, $gymId, $performedByUserId);
                    $memberNotification = $results['member'] ?? null;
                    $coachNotification = $results['coach'] ?? null;

                    // Overall status: both notifications must succeed
                    $notificationStatus = 
                        ($memberNotification['success'] ?? false) && 
                        ($coachNotification['success'] ?? false);

                    if (!$notificationStatus) {
                        $parts = [];
                        if ($memberNotification && !$memberNotification['success']) {
                            $parts[] = 'member: ' . ($memberNotification['error'] ?? 'unknown error');
                        }
                        if ($coachNotification && !$coachNotification['success']) {
                            $parts[] = 'coach: ' . ($coachNotification['error'] ?? 'unknown error');
                        }
                        $notificationError = implode(' | ', $parts) ?: 'Notification creation failed for member/coach.';
                    }
                } else {
                    $notificationStatus = false;
                    $notificationError = 'Notification not sent: member or trainer not found.';
                }
            } catch (\Exception $e) {
                // Log but don't fail appointment creation if notification fails
                \Log::error('Failed to create appointment notifications: ' . $e->getMessage(), [
                    'appointment_id' => $appointment->id,
                    'trace' => $e->getTraceAsString()
                ]);
                $notificationStatus = false;
                $notificationError = 'Notification failed: ' . $e->getMessage();
            }

            return response()->json([
                'success' => true,
                'message' => 'Appointment created successfully',
                'data' => [
                    'appointment' => $appointment,
                    'member_notification' => $memberNotification,
                    'coach_notification' => $coachNotification,
                    'notification_status' => $notificationStatus,
                    'notification_error' => $notificationError,
                    'credit_deduction_status' => $creditDeductionStatus,
                    'credit_deduction_error' => $creditDeductionError,
                    'credit_deduction_details' => $creditDeductionDetails,
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to create appointment', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create appointment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Update the specified appointment
    public function update(Request $request, $id)
    {
        // Accept both client_id and member_id for flexibility
        $clientId = $request->input('client_id') ?? $request->input('member_id');
        
        $validator = Validator::make(array_merge($request->all(), ['client_id' => $clientId]), [
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'staff_id' => 'required|integer',
            'client_id' => 'required|integer',
            'workout_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        // Get the current user's gym ID
        $gymId = $user->gym_id ?? null;
        
        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }

        try {
            $appointment = Appointment::findOrFail($id);
            
            // Verify that both client and staff belong to the same gym
            $client = Member::where('id', $clientId)
                ->where('gym_id', $gymId)
                ->first();
                
            $staff = Coach::where('id', $request->staff_id)
                ->where('gym_id', $gymId)
                ->first();

            if (!$client) {
                return response()->json([
                    'success' => false,
                    'message' => 'Client not found or does not belong to your gym'
                ], 404);
            }

            if (!$staff) {
                return response()->json([
                    'success' => false,
                    'message' => 'Staff member not found or does not belong to your gym'
                ], 404);
            }
            
            // Store old status to detect changes
            $oldStatus = $appointment->status;
            $newStatus = $request->input('status', $oldStatus);
            
            $appointment->update([
                // persist to member_id column in DB
                'member_id' => $clientId,
                'coach_id' => $request->staff_id,
                'workout_id' => $request->workout_id,
                'date' => $request->date,
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
                'status' => $newStatus,
            ]);

            // Refresh appointment to get updated data
            $appointment->refresh();

            // Deduct credits if status changed to 'completed'
            if ($oldStatus !== 'completed' && $newStatus === 'completed' && !$appointment->credit_deducted) {
                try {
                    $creditService = new \App\Services\MemberCreditService();
                    $creditCost = $request->input('credit_cost'); // Optional override
                    $adminOverride = $request->input('admin_override', false);
                    
                    $result = $creditService->deductCreditsForActivity(
                        $appointment->member_id,
                        'appointment',
                        $appointment->id,
                        $creditCost,
                        $adminOverride
                    );

                    if (!$result['success']) {
                        // Log error with full details
                        \Log::error('Failed to deduct credits for appointment', [
                            'appointment_id' => $appointment->id,
                            'member_id' => $appointment->member_id,
                            'error' => $result['message'],
                            'appointment_status' => $newStatus,
                            'credit_cost' => $creditCost,
                            'trace' => isset($result['trace']) ? $result['trace'] : null
                        ]);
                        
                        // If insufficient credits and no admin override, revert status
                        if (isset($result['insufficient']) && $result['insufficient'] && !$adminOverride) {
                            $appointment->update(['status' => $oldStatus]);
                            return response()->json([
                                'success' => false,
                                'message' => $result['message'],
                                'error_code' => 'INSUFFICIENT_CREDITS'
                            ], 422);
                        }
                        
                        // Return error response so user knows credits weren't deducted
                        return response()->json([
                            'success' => true,
                            'message' => 'Appointment updated, but credit deduction failed: ' . $result['message'],
                            'warning' => 'Credits were not deducted. Please check member credits and activity credit cost configuration.',
                            'data' => $appointment
                        ], 200);
                    } else {
                        // Log success
                        \Log::info('Credits deducted successfully for appointment', [
                            'appointment_id' => $appointment->id,
                            'member_id' => $appointment->member_id,
                            'transaction_id' => $result['transaction_id'] ?? null,
                            'amount_deducted' => $result['amount_deducted'] ?? null
                        ]);
                    }
                } catch (\Exception $e) {
                    // Log error but don't fail appointment update
                    \Log::error('Error deducting credits for appointment: ' . $e->getMessage(), [
                        'appointment_id' => $appointment->id,
                        'member_id' => $appointment->member_id
                    ]);
                }
            }

            // Create notifications for appointment update
            try {
                // Get performedByUserId if current user is an admin
                $performedByUserId = null;
                if ($user && isset($user->role_id) && $user->role_id == 1) {
                    $performedByUserId = $user->id;
                }
                
                if ($client && $staff) {
                    NotificationService::appointmentUpdated($appointment, $client, $staff, $gymId, $performedByUserId);
                }
            } catch (\Exception $e) {
                // Log but don't fail appointment update if notification fails
                \Log::error('Failed to create appointment update notifications: ' . $e->getMessage(), [
                    'appointment_id' => $appointment->id,
                    'trace' => $e->getTraceAsString()
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Appointment updated successfully',
                'data' => $appointment
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to update appointment', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'appointment_id' => $id,
                'request_data' => $request->all()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update appointment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Display the specified appointment
    public function show(Request $request, $id)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        // Get the current user's gym ID
        $gymId = $user->gym_id ?? null;
        
        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }

        try {
            $appointment = Appointment::with(['member', 'coach'])
                ->whereHas('member', function($query) use ($gymId) {
                    $query->where('gym_id', $gymId);
                })
                ->orWhereHas('coach', function($query) use ($gymId) {
                    $query->where('gym_id', $gymId);
                })
                ->findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => $appointment
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found or access denied',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    // Show the form for editing the specified appointment
    public function edit(Request $request, $id)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        // Get the current user's gym ID
        $gymId = $user->gym_id ?? null;
        
        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }

        try {
            $appointment = Appointment::with(['member', 'coach'])
                ->whereHas('member', function($query) use ($gymId) {
                    $query->where('gym_id', $gymId);
                })
                ->orWhereHas('coach', function($query) use ($gymId) {
                    $query->where('gym_id', $gymId);
                })
                ->findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => $appointment
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found or access denied',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    // Remove the specified appointment
    public function destroy(Request $request, $id)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        // Get the current user's gym ID
        $gymId = $user->gym_id ?? null;
        
        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }

        try {
            $appointment = Appointment::with(['member', 'coach'])->findOrFail($id);
            
            // Verify appointment belongs to the gym
            $member = $appointment->member;
            $trainer = $appointment->coach;
            
            if (!$member || $member->gym_id != $gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Appointment not found or access denied'
                ], 404);
            }
            
            // Store appointment data before deletion for notifications
            $appointmentData = [
                'id' => $appointment->id,
                'date' => $appointment->date,
                'start_time' => $appointment->start_time,
            ];
            
            // Create a temporary appointment object for notification service
            $tempAppointment = (object) $appointmentData;
            
            // Create notifications for appointment cancellation before deletion
            try {
                // Get performedByUserId if current user is an admin
                $performedByUserId = null;
                if ($user && isset($user->role_id) && $user->role_id == 1) {
                    $performedByUserId = $user->id;
                }
                
                if ($member && $trainer) {
                    NotificationService::appointmentCancelled($tempAppointment, $member, $trainer, $gymId, $performedByUserId);
                }
            } catch (\Exception $e) {
                // Log but don't fail appointment deletion if notification fails
                \Log::error('Failed to create appointment cancellation notifications: ' . $e->getMessage(), [
                    'appointment_id' => $appointment->id,
                    'trace' => $e->getTraceAsString()
                ]);
            }
                
            $appointment->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Appointment deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete appointment or access denied',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Get appointments for a specific member
    public function getMemberAppointments(Request $request, $memberId)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        // Get the current user's gym ID
        $gymId = $user->gym_id ?? null;
        
        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }

        try {
            // Get appointments for the specific member that belong to the user's gym
            $appointments = Appointment::with(['member', 'coach'])
                ->where('member_id', $memberId)
                ->whereHas('member', function($query) use ($gymId) {
                    $query->where('gym_id', $gymId);
                })
                ->orderBy('date', 'desc')
                ->orderBy('start_time', 'desc')
                ->get();
            
            return response()->json([
                'success' => true,
                'data' => $appointments
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch member appointments',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 