<?php

namespace App\Http\Controllers\Mobile\coach;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\HandlesApiErrors;
use App\Http\Controllers\Traits\ApiResponse;
use App\Models\Appointment;
use App\Models\Member;
use App\Models\Coach;
use App\Models\CoachAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Throwable;

class MobileAppointmentController extends Controller
{
    use HandlesApiErrors, ApiResponse;
    /**
     * Get appointments (for coach: only appointments for assigned members, for member: their appointments)
     */
    public function index(Request $request)
    {
        try {
            $user = $request->user('api');
            $authMember = $request->get('auth_member');
            $authUser = $request->get('auth_user');
            
            // Determine if this is a coach (user) or member
            $isCoach = ($user && $user->role_id == 3) || ($authUser && $authUser->role_id == 3);
            
            if ($isCoach) {
                // For coaches: get appointments only for their assigned members
                $userEmail = $user ? $user->email : ($authUser ? $authUser->email : null);
                
                if (!$userEmail) {
                    return response()->json([
                        'success' => false,
                        'message' => 'User email not found'
                    ], 400);
                }
                
                // Find the coach record by email
                $coach = Coach::where('email', $userEmail)->first();
                
                if (!$coach) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Coach record not found'
                    ], 404);
                }
                
                // Get all active assigned member IDs for this coach
                $assignedMemberIds = CoachAssignment::where('coach_id', $coach->id)
                    ->where('status', 'active')
                    ->pluck('member_id')
                    ->toArray();
                
                // Get pagination parameters
                $perPage = $request->input('per_page', 15);
                $perPage = min(max(1, (int)$perPage), 100); // Limit between 1 and 100
                
                if (empty($assignedMemberIds)) {
                    // No assigned members, create empty paginator
                    $appointments = new \Illuminate\Pagination\LengthAwarePaginator(
                        collect([]),
                        0,
                        $perPage,
                        $request->input('page', 1),
                        ['path' => $request->url(), 'query' => $request->query()]
                    );
                } else {
                    // Get appointments for assigned members where this coach is the trainer
                    // Show both: mobile-booked appointments AND CRM-assigned appointments
                    $appointments = Appointment::with(['coach', 'member'])
                        ->whereIn('member_id', $assignedMemberIds)
                        ->where('coach_id', $coach->id) // Only appointments where this coach is the trainer
                        ->where(function($query) {
                            // Show mobile-booked appointments (coach booked from mobile)
                            $query->where('source', 'mobile')
                                  // OR CRM-assigned appointments (admin assigned to coach)
                                  ->orWhere('source', 'crm')
                                  // OR old appointments without source (backward compatibility)
                                  ->orWhereNull('source');
                        })
                        ->orderBy('date', 'asc')
                        ->orderBy('start_time', 'asc')
                        ->paginate($perPage);
                }
            } else {
                // For members: get their own appointments
                $memberId = $authMember ? $authMember->id : ($user ? $user->id : null);
                
                if (!$memberId) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Member ID not found'
                    ], 400);
                }
                
                // Get pagination parameters
                $perPage = $request->input('per_page', 15);
                $perPage = min(max(1, (int)$perPage), 100); // Limit between 1 and 100
                
                // Get appointments for this member
                $appointments = Appointment::with(['coach', 'member'])
                    ->where('member_id', $memberId)
                    ->orderBy('date', 'asc')
                    ->orderBy('start_time', 'asc')
                    ->paginate($perPage);
            }

            // Transform appointments for mobile app
            $transformedAppointments = $appointments->map(function ($appointment) use ($isCoach) {
                $transformed = [
                    'id' => $appointment->id,
                    'date' => $appointment->date->format('Y-m-d'),
                    'start_time' => $appointment->start_time,
                    'end_time' => $appointment->end_time,
                    'status' => $appointment->status,
                    'notes' => $appointment->notes,
                    'rating' => $appointment->rating,
                    'member_id' => $appointment->member_id,
                    'coach_id' => $appointment->coach_id,
                    'workout_id' => $appointment->workout_id,
                    'coach' => [
                        'id' => $appointment->coach->id ?? null,
                        'name' => $appointment->coach ? 
                            $appointment->coach->first_name . ' ' . $appointment->coach->last_name : 
                            'Unknown Coach'
                    ],
                    'workout' => $this->getWorkoutTypeInfo($appointment->workout_id),
                    'created_at' => $appointment->created_at->format('Y-m-d H:i:s'),
                    'updated_at' => $appointment->updated_at->format('Y-m-d H:i:s')
                ];
                
                // For coaches, include member information
                if ($isCoach && $appointment->member) {
                    $transformed['member'] = [
                        'id' => $appointment->member->id,
                        'name' => $appointment->member->membername ?? 
                            ($appointment->member->first_name ?? '' . ' ' . $appointment->member->last_name ?? '') ?? 
                            'Unknown Member',
                        'avatar' => $appointment->member->avatar ?? null,
                    ];
                }
                
                return $transformed;
            });

            // Return paginated response if paginator, otherwise regular response
            if (method_exists($appointments, 'currentPage')) {
                // Update the paginator's collection with transformed data
                $appointments->setCollection($transformedAppointments);
                return $this->paginatedResponse($appointments, 'Appointments retrieved successfully');
            }
            
            return $this->successResponse($transformedAppointments, 'Appointments retrieved successfully');

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileAppointmentController@index');
        }
    }

    /**
     * Get specific appointment details
     */
    public function show(Request $request, $id)
    {
        try {
            $user = $request->user('api');
            $authMember = $request->get('auth_member');
            $authUser = $request->get('auth_user');
            
            // Determine if this is a coach (user) or member
            $isCoach = ($user && $user->role_id == 3) || ($authUser && $authUser->role_id == 3);
            
            // Get appointment
            $appointment = Appointment::with(['coach', 'member'])
                ->where('id', $id)
                ->first();
            
            if (!$appointment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Appointment not found',
                ], 404);
            }
            
            // Check access: coaches can see appointments for their assigned members only
            if ($isCoach) {
                $userEmail = $user ? $user->email : ($authUser ? $authUser->email : null);
                
                if (!$userEmail) {
                    return response()->json([
                        'success' => false,
                        'message' => 'User email not found'
                    ], 400);
                }
                
                // Find the coach record by email
                $coach = Coach::where('email', $userEmail)->first();
                
                if (!$coach) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Coach record not found'
                    ], 404);
                }
                
                // Check if this member is assigned to this coach
                $isAssigned = CoachAssignment::where('coach_id', $coach->id)
                    ->where('member_id', $appointment->member_id)
                    ->where('status', 'active')
                    ->exists();
                
                if (!$isAssigned) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Appointment not accessible - member not assigned to you',
                    ], 403);
                }
                
                // Check if this appointment is assigned to this coach
                if ($appointment->coach_id != $coach->id) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Appointment not accessible - not assigned to you',
                    ], 403);
                }
                
                // Show both mobile-booked and CRM-assigned appointments
                // Only exclude if source is explicitly set to something other than 'mobile' or 'crm'
                if ($appointment->source && !in_array($appointment->source, ['mobile', 'crm'])) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Appointment not accessible',
                    ], 403);
                }
            } else {
                $memberId = $authMember ? $authMember->id : ($user ? $user->id : null);
                if ($appointment->member_id != $memberId) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Appointment not accessible',
                    ], 403);
                }
            }

            $transformedAppointment = [
                'id' => $appointment->id,
                'date' => $appointment->date->format('Y-m-d'),
                'start_time' => $appointment->start_time,
                'end_time' => $appointment->end_time,
                'status' => $appointment->status,
                'notes' => $appointment->notes,
                'member_id' => $appointment->member_id,
                'coach_id' => $appointment->coach_id,
                'workout_id' => $appointment->workout_id,
                'coach' => [
                    'id' => $appointment->coach->id ?? null,
                    'name' => $appointment->coach ? 
                        $appointment->coach->first_name . ' ' . $appointment->coach->last_name : 
                        'Unknown Coach',
                    'phone' => $appointment->coach->phone ?? null,
                    'email' => $appointment->coach->email ?? null
                ],
                'workout' => $this->getWorkoutTypeInfo($appointment->workout_id),
                'created_at' => $appointment->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $appointment->updated_at->format('Y-m-d H:i:s')
            ];
            
            // For coaches, include member information
            if ($isCoach && $appointment->member) {
                $transformedAppointment['member'] = [
                    'id' => $appointment->member->id,
                    'name' => $appointment->member->membername ?? 
                        ($appointment->member->first_name ?? '' . ' ' . $appointment->member->last_name ?? '') ?? 
                        'Unknown Member',
                    'avatar' => $appointment->member->avatar ?? null,
                    'phone' => $appointment->member->mobile_phone ?? $appointment->member->phone ?? null,
                    'email' => $appointment->member->email ?? null,
                ];
            }

            return response()->json([
                'success' => true,
                'data' => $transformedAppointment
            ], 200);

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileAppointmentController@show');
        }
    }

    /**
     * Get upcoming appointments (next 7 days)
     */
    public function upcoming(Request $request)
    {
        try {
            $user = $request->user('api');
            $authMember = $request->get('auth_member');
            $authUser = $request->get('auth_user');
            
            // Determine if this is a coach (user) or member
            $isCoach = ($user && $user->role_id == 3) || ($authUser && $authUser->role_id == 3);
            
            if ($isCoach) {
                // For coaches: get upcoming appointments for their assigned members only
                $userEmail = $user ? $user->email : ($authUser ? $authUser->email : null);
                
                if (!$userEmail) {
                    return response()->json([
                        'success' => false,
                        'message' => 'User email not found'
                    ], 400);
                }
                
                // Find the coach record by email
                $coach = Coach::where('email', $userEmail)->first();
                
                if (!$coach) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Coach record not found'
                    ], 404);
                }
                
                // Get all active assigned member IDs for this coach
                $assignedMemberIds = CoachAssignment::where('coach_id', $coach->id)
                    ->where('status', 'active')
                    ->pluck('member_id')
                    ->toArray();
                
                if (empty($assignedMemberIds)) {
                    // No assigned members, return empty array
                    $upcomingAppointments = collect([]);
                } else {
                    // Get upcoming appointments for assigned members where this coach is the trainer
                    // Show both: mobile-booked appointments AND CRM-assigned appointments
                    $upcomingAppointments = Appointment::with(['coach', 'member'])
                        ->whereIn('member_id', $assignedMemberIds)
                        ->where('coach_id', $coach->id) // Only appointments where this coach is the trainer
                        ->where(function($query) {
                            // Show mobile-booked appointments (coach booked from mobile)
                            $query->where('source', 'mobile')
                                  // OR CRM-assigned appointments (admin assigned to coach)
                                  ->orWhere('source', 'crm')
                                  // OR old appointments without source (backward compatibility)
                                  ->orWhereNull('source');
                        })
                        ->whereDate('date', '>=', now()->toDateString())
                        ->whereDate('date', '<=', now()->addDays(7)->toDateString())
                        ->orderBy('date', 'asc')
                        ->orderBy('start_time', 'asc')
                        ->get();
                }
            } else {
                // For members: get their upcoming appointments
                $memberId = $authMember ? $authMember->id : ($user ? $user->id : null);
                
                if (!$memberId) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Member ID not found'
                    ], 400);
                }
                
                $upcomingAppointments = Appointment::with(['coach', 'member'])
                    ->where('member_id', $memberId)
                    ->whereDate('date', '>=', now()->toDateString())
                    ->whereDate('date', '<=', now()->addDays(7)->toDateString())
                    ->orderBy('date', 'asc')
                    ->orderBy('start_time', 'asc')
                    ->get();
            }

            $transformedAppointments = $upcomingAppointments->map(function ($appointment) use ($isCoach) {
                $transformed = [
                    'id' => $appointment->id,
                    'date' => $appointment->date->format('Y-m-d'),
                    'start_time' => $appointment->start_time,
                    'end_time' => $appointment->end_time,
                    'status' => $appointment->status,
                    'member_id' => $appointment->member_id,
                    'coach_id' => $appointment->coach_id,
                    'workout_id' => $appointment->workout_id,
                    'coach_name' => $appointment->coach ? 
                        $appointment->coach->first_name . ' ' . $appointment->coach->last_name : 
                        'Unknown Coach',
                    'workout' => $this->getWorkoutTypeInfo($appointment->workout_id)
                ];
                
                // For coaches, include member information
                if ($isCoach && $appointment->member) {
                    $transformed['member_name'] = $appointment->member->membername ?? 
                        ($appointment->member->first_name ?? '' . ' ' . $appointment->member->last_name ?? '') ?? 
                        'Unknown Member';
                }
                
                return $transformed;
            });

            return response()->json([
                'success' => true,
                'data' => $transformedAppointments
            ], 200);

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileAppointmentController@upcoming');
        }
    }

    /**
     * Get appointment statistics
     */
    public function statistics(Request $request)
    {
        try {
            $user = $request->user('api');
            $authMember = $request->get('auth_member');
            $authUser = $request->get('auth_user');
            
            // Determine if this is a coach (user) or member
            $isCoach = ($user && $user->role_id == 3) || ($authUser && $authUser->role_id == 3);
            
            if ($isCoach) {
                // For coaches: get statistics for appointments of their assigned members only
                $userEmail = $user ? $user->email : ($authUser ? $authUser->email : null);
                
                if (!$userEmail) {
                    return response()->json([
                        'success' => false,
                        'message' => 'User email not found'
                    ], 400);
                }
                
                // Find the coach record by email
                $coach = Coach::where('email', $userEmail)->first();
                
                if (!$coach) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Coach record not found'
                    ], 404);
                }
                
                // Get all active assigned member IDs for this coach
                $assignedMemberIds = CoachAssignment::where('coach_id', $coach->id)
                    ->where('status', 'active')
                    ->pluck('member_id')
                    ->toArray();
                
                if (empty($assignedMemberIds)) {
                    // No assigned members, return zero statistics
                    $totalAppointments = 0;
                    $completedAppointments = 0;
                    $upcomingAppointments = 0;
                    $cancelledAppointments = 0;
                    $sessionsToday = 0;
                } else {
                    // Get statistics for assigned members where this coach is the trainer
                    // Show both mobile-booked and CRM-assigned appointments
                    $baseQuery = Appointment::whereIn('member_id', $assignedMemberIds)
                        ->where('coach_id', $coach->id) // Only appointments where this coach is the trainer
                        ->where(function($query) {
                            // Show mobile-booked appointments (coach booked from mobile)
                            $query->where('source', 'mobile')
                                  // OR CRM-assigned appointments (admin assigned to coach)
                                  ->orWhere('source', 'crm')
                                  // OR old appointments without source (backward compatibility)
                                  ->orWhereNull('source');
                        });
                    
                    $totalAppointments = (clone $baseQuery)->count();
                    $completedAppointments = (clone $baseQuery)->where('status', 'completed')->count();
                    $upcomingAppointments = (clone $baseQuery)->whereDate('date', '>=', now()->toDateString())->count();
                    $cancelledAppointments = (clone $baseQuery)->where('status', 'cancelled')->count();
                    // Sessions Today: appointments scheduled for today
                    $sessionsToday = (clone $baseQuery)
                        ->whereDate('date', now()->toDateString())
                        ->whereIn('status', ['scheduled', 'confirmed'])
                        ->count();
                }
            } else {
                // For members: get their own statistics
                $memberId = $authMember ? $authMember->id : ($user ? $user->id : null);
                
                if (!$memberId) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Member ID not found'
                    ], 400);
                }
                
                $baseQuery = Appointment::where('member_id', $memberId);
                
                $totalAppointments = (clone $baseQuery)->count();
                $completedAppointments = (clone $baseQuery)->where('status', 'completed')->count();
                $upcomingAppointments = (clone $baseQuery)->whereDate('date', '>=', now()->toDateString())->count();
                $cancelledAppointments = (clone $baseQuery)->where('status', 'cancelled')->count();
                // Sessions Today: appointments scheduled for today
                $sessionsToday = (clone $baseQuery)
                    ->whereDate('date', now()->toDateString())
                    ->whereIn('status', ['scheduled', 'confirmed'])
                    ->count();
            }

            $statistics = [
                'total' => $totalAppointments,
                'completed' => $completedAppointments,
                'upcoming' => $upcomingAppointments,
                'cancelled' => $cancelledAppointments,
                'sessions_today' => $sessionsToday ?? 0,
                'sessionsToday' => $sessionsToday ?? 0, // Alias for frontend compatibility
                'today_appointments' => $sessionsToday ?? 0, // Another alias
                'completion_rate' => $totalAppointments > 0 ? 
                    round(($completedAppointments / $totalAppointments) * 100, 2) : 0
            ];

            return response()->json([
                'success' => true,
                'data' => $statistics
            ], 200);

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileAppointmentController@statistics');
        }
    }

    /**
     * Get workout type information based on workout_id
     */
    private function getWorkoutTypeInfo($workoutId)
    {
        // Simple workout type mapping based on the frontend hardcoded values
        $workoutTypes = [
            1 => ['id' => 1, 'name' => 'Cardio', 'category' => 'Cardio'],
            2 => ['id' => 2, 'name' => 'Strength', 'category' => 'Strength'],
            3 => ['id' => 3, 'name' => 'Yoga', 'category' => 'Yoga'],
            4 => ['id' => 4, 'name' => 'HIIT', 'category' => 'HIIT'],
            5 => ['id' => 5, 'name' => 'Pilates', 'category' => 'Pilates'],
            6 => ['id' => 6, 'name' => 'Crossfit', 'category' => 'Crossfit']
        ];

        return $workoutTypes[$workoutId] ?? [
            'id' => $workoutId,
            'name' => 'Unknown Workout',
            'category' => 'General'
        ];
    }

    /**
     * Get available workout types
     */
    public function getWorkoutTypes()
    {
        try {
            $workoutTypes = [
                ['id' => 1, 'name' => 'Cardio', 'category' => 'Cardio', 'description' => 'Cardiovascular exercises'],
                ['id' => 2, 'name' => 'Strength', 'category' => 'Strength', 'description' => 'Strength training exercises'],
                ['id' => 3, 'name' => 'Yoga', 'category' => 'Yoga', 'description' => 'Yoga and flexibility training'],
                ['id' => 4, 'name' => 'HIIT', 'category' => 'HIIT', 'description' => 'High-Intensity Interval Training'],
                ['id' => 5, 'name' => 'Pilates', 'category' => 'Pilates', 'description' => 'Core strength and stability'],
                ['id' => 6, 'name' => 'Crossfit', 'category' => 'Crossfit', 'description' => 'Functional fitness training']
            ];

            return response()->json([
                'success' => true,
                'data' => $workoutTypes
            ], 200);

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileAppointmentController@getWorkoutTypes');
        }
    }

    /**
     * Update appointment (allows partial updates, especially for status)
     */
    public function update(Request $request, $id)
    {
        try {
            $user = $request->user('api');
            $authUser = $request->get('auth_user');
            
            // Determine if this is a coach
            $isCoach = ($user && $user->role_id == 3) || ($authUser && $authUser->role_id == 3);
            
            if (!$isCoach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Access denied. Coach access only.',
                ], 403);
            }

            // Get appointment
            $appointment = Appointment::with(['coach', 'member'])->find($id);
            
            if (!$appointment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Appointment not found',
                ], 404);
            }

            // Verify coach has access to this appointment
            $userEmail = $user ? $user->email : ($authUser ? $authUser->email : null);
            $coach = Coach::where('email', $userEmail)->first();
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach record not found'
                ], 404);
            }

            // Check if appointment is assigned to this coach
            if ($appointment->coach_id != $coach->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Appointment not assigned to you',
                ], 403);
            }

            // Allow partial updates - only update fields that are provided
            $updateData = [];
            
            if ($request->has('status')) {
                $updateData['status'] = $request->status;
            }
            
            if ($request->has('date')) {
                $updateData['date'] = $request->date;
            }
            
            if ($request->has('start_time')) {
                $updateData['start_time'] = $request->start_time;
            }
            
            if ($request->has('end_time')) {
                $updateData['end_time'] = $request->end_time;
            }
            
            if ($request->has('notes')) {
                $updateData['notes'] = $request->notes;
            }
            
            if ($request->has('workout_id')) {
                $updateData['workout_id'] = $request->workout_id;
            }
            
            if ($request->has('rating')) {
                // Validate rating if provided
                $rating = $request->rating;
                if (is_numeric($rating) && $rating >= 1 && $rating <= 5) {
                    $updateData['rating'] = $rating;
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Rating must be between 1 and 5',
                    ], 400);
                }
            }

            if (empty($updateData)) {
                return response()->json([
                    'success' => false,
                    'message' => 'No valid fields to update',
                ], 400);
            }

            // Store old status to detect changes
            $oldStatus = $appointment->status;
            $newStatus = $request->has('status') ? $request->status : $oldStatus;

            $appointment->update($updateData);
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
                        \Log::error('Failed to deduct credits for appointment (Mobile)', [
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
                        
                        // Log warning but don't fail the update
                        \Log::warning('Appointment marked as completed but credits were not deducted (Mobile)', [
                            'appointment_id' => $appointment->id,
                            'member_id' => $appointment->member_id,
                            'error' => $result['message']
                        ]);
                    } else {
                        // Log success
                        \Log::info('Credits deducted successfully for appointment (Mobile)', [
                            'appointment_id' => $appointment->id,
                            'member_id' => $appointment->member_id,
                            'transaction_id' => $result['transaction_id'] ?? null,
                            'remaining_credits' => $result['remaining_credits'] ?? null
                        ]);
                    }
                } catch (\Exception $e) {
                    // Log error but don't fail appointment update
                    \Log::error('Error deducting credits for appointment (Mobile): ' . $e->getMessage(), [
                        'appointment_id' => $appointment->id,
                        'member_id' => $appointment->member_id,
                        'trace' => $e->getTraceAsString()
                    ]);
                }
            }

            // Log the update for debugging
            \Log::info('Appointment status updated', [
                'appointment_id' => $appointment->id,
                'old_status' => $oldStatus,
                'new_status' => $appointment->status,
                'date' => $appointment->date->format('Y-m-d'),
                'coach_id' => $appointment->coach_id,
                'member_id' => $appointment->member_id,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Appointment updated successfully',
                'data' => [
                    'id' => $appointment->id,
                    'date' => $appointment->date->format('Y-m-d'),
                    'start_time' => $appointment->start_time,
                    'end_time' => $appointment->end_time,
                    'status' => $appointment->status,
                    'notes' => $appointment->notes,
                    'rating' => $appointment->rating,
                    'member_id' => $appointment->member_id,
                    'coach_id' => $appointment->coach_id,
                    'workout_id' => $appointment->workout_id,
                ]
            ], 200);

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileAppointmentController@update');
        }
    }




    /**
     * Delete/Cancel appointment
     */
    public function destroy(Request $request, $id)
    {
        try {
            $user = $request->user('api');
            $authUser = $request->get('auth_user');
            
            // Determine if this is a coach
            $isCoach = ($user && $user->role_id == 3) || ($authUser && $authUser->role_id == 3);
            
            if (!$isCoach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Access denied. Coach access only.',
                ], 403);
            }

            // Get appointment
            $appointment = Appointment::with(['coach', 'member'])->findOrFail($id);

            // Verify coach has access to this appointment
            $userEmail = $user ? $user->email : ($authUser ? $authUser->email : null);
            $coach = Coach::where('email', $userEmail)->first();
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach record not found'
                ], 404);
            }

            // Check if appointment is assigned to this coach
            if ($appointment->coach_id != $coach->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Appointment not assigned to you',
                ], 403);
            }

            $appointment->delete();

            return response()->json([
                'success' => true,
                'message' => 'Appointment cancelled successfully',
            ], 200);

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileAppointmentController@destroy');
        }
    }
}
