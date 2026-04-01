<?php

namespace App\Http\Controllers\Mobile\coach;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\HandlesApiErrors;
use App\Http\Controllers\Traits\ApiResponse;
use App\Models\ScheduleEvent;
use App\Models\ScheduleEventBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Throwable;

class MobileScheduleController extends Controller
{
    use HandlesApiErrors, ApiResponse;

    /**
     * Get schedule events for coach
     * Coach can see all events in their gym, optionally filtered by date, tab, member
     */
    public function getEvents(Request $request)
    {
        try {
            $user = $request->user('api');
            if (!$user) {
                return $this->errorResponse('Unauthorized', 401);
            }

            // Check if user is a coach
            if (($user->role_id ?? null) != 3) {
                return $this->errorResponse('Access denied. Coach access only.', 403);
            }

            $gymId = $user->gym_id ?? null;
            if (!$gymId) {
                return $this->errorResponse('User not associated with any gym', 400);
            }

            $query = ScheduleEvent::where('gym_id', $gymId)
                ->with(['coach', 'member', 'activity', 'workoutActivity', 'activeBookings', 'activeBookings.member']);

            // Filter by date range (for weekly view) or single date
            if ($request->filled('start_date') && $request->filled('end_date')) {
                $query->whereBetween('date', [$request->start_date, $request->end_date]);
                Log::info('[MobileScheduleController] Filtering events by date range', [
                    'start_date' => $request->start_date,
                    'end_date' => $request->end_date,
                    'gym_id' => $gymId
                ]);
            } elseif ($request->filled('date')) {
                // Use whereDate for date-only comparison (ignores time)
                $date = $request->date;
                $query->whereDate('date', $date);
                Log::info('[MobileScheduleController] Filtering events by date', [
                    'date' => $date,
                    'gym_id' => $gymId
                ]);
            } else {
                Log::info('[MobileScheduleController] No date filter applied', [
                    'gym_id' => $gymId
                ]);
            }

            // Filter by tab
            if ($request->filled('tab') && $request->tab !== 'All') {
                $query->where('tab', $request->tab);
            }

            // Filter by member_id if provided - check both direct assignment and bookings
            if ($request->filled('member_id')) {
                $memberId = $request->member_id;
                $query->where(function($q) use ($memberId) {
                    $q->where('member_id', $memberId)
                      ->orWhereHas('activeBookings', function($bookingQuery) use ($memberId) {
                          $bookingQuery->where('member_id', $memberId);
                      });
                });
            }

            // Filter by coach_id if provided
            // IMPORTANT: By default, show ALL events in the gym so coaches/admins can see each other's schedules.
            if ($request->filled('coach_id')) {
                $query->where('coach_id', $request->coach_id);
            }

            $events = $query->orderBy('date', 'asc')
                ->orderBy('start_time', 'asc')
                ->get();

            Log::info('[MobileScheduleController] Events query result', [
                'total_events' => $events->count(),
                'date_filter' => $request->date ?? ($request->start_date && $request->end_date ? $request->start_date . ' to ' . $request->end_date : 'none'),
                'gym_id' => $gymId,
                'sample_dates' => $events->take(5)->pluck('date')->toArray()
            ]);

            $transformedEvents = $events->map(function ($event) {
                // Handle date formatting
                $date = $event->date;
                if ($date instanceof Carbon || $date instanceof \DateTime) {
                    $date = $date->format('Y-m-d');
                } elseif (is_string($date)) {
                    try {
                        $date = Carbon::parse($date)->format('Y-m-d');
                    } catch (\Exception $e) {
                        $date = $date;
                    }
                } else {
                    $date = null;
                }

                // Handle time formatting
                $startTime = $event->start_time;
                if (is_string($startTime) && strlen($startTime) >= 5) {
                    $startTime = substr($startTime, 0, 5);
                } elseif ($startTime instanceof Carbon || $startTime instanceof \DateTime) {
                    $startTime = $startTime->format('H:i');
                } else {
                    $startTime = null;
                }

                $endTime = $event->end_time;
                if (is_string($endTime) && strlen($endTime) >= 5) {
                    $endTime = substr($endTime, 0, 5);
                } elseif ($endTime instanceof Carbon || $endTime instanceof \DateTime) {
                    $endTime = $endTime->format('H:i');
                } else {
                    $endTime = null;
                }

                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'date' => $date,
                    'start_time' => $startTime,
                    'end_time' => $endTime,
                    'tab' => $event->tab,
                    'coach_id' => $event->coach_id,
                    'coach_name' => $event->coach ? ($event->coach->name ?? ($event->coach->first_name . ' ' . $event->coach->last_name)) : null,
                    'member_id' => $event->member_id,
                    'member_name' => $event->member ? ($event->member->name ?? ($event->member->firstname . ' ' . $event->member->lastname)) : null,
                    'member_ids' => $event->activeBookings ? $event->activeBookings->pluck('member_id')->toArray() : ($event->member_id ? [$event->member_id] : []),
                    'member_names' => $event->activeBookings && $event->activeBookings->count() > 0 ? $event->activeBookings->map(function($booking) {
                        if (!$booking->member) return null;
                        $name = $booking->member->name ?? $booking->member->membername ?? null;
                        if (!$name) {
                            $name = trim(($booking->member->firstname ?? '') . ' ' . ($booking->member->lastname ?? ''));
                        }
                        return $name ?: null;
                    })->filter()->values()->toArray() : ($event->member ? [($event->member->name ?? $event->member->membername ?? ($event->member->firstname . ' ' . $event->member->lastname))] : []),
                    'activity_id' => $event->activity_id,
                    'activity_name' => $event->activity ? $event->activity->name : ($event->workoutActivity ? $event->workoutActivity->exercise_name : null),
                    'description' => $event->description,
                    'schedule_id' => $event->schedule_id,
                    'schedule_name' => $this->getScheduleName($event->schedule_id),
                    'max_participants' => $event->max_participants,
                    'recurrency' => $event->recurrency,
                    'location_id' => $event->location_id,
                    'location_name' => $this->getLocationName($event->location_id),
                    'location' => $this->getLocationName($event->location_id) ?: 'Studio',
                    'current_bookings' => $event->activeBookings ? $event->activeBookings->count() : 0,
                    'capacity' => $event->max_participants ? 
                        ($event->activeBookings ? $event->activeBookings->count() : 0) . '/' . $event->max_participants : 
                        ($event->activeBookings ? $event->activeBookings->count() : 0) . '/10',
                    'is_full' => $event->max_participants ? 
                        ($event->activeBookings ? $event->activeBookings->count() >= $event->max_participants : false) : false,
                    'can_book' => $event->enable_online_booking && 
                        (!$event->max_participants || !$event->activeBookings || $event->activeBookings->count() < $event->max_participants),
                ];
            });

            return $this->successResponse($transformedEvents, 'Schedule events retrieved successfully');
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileScheduleController@getEvents');
        }
    }

    /**
     * Get a single schedule event by ID
     */
    public function getEvent($id)
    {
        try {
            $user = request()->user('api');
            if (!$user) {
                return $this->errorResponse('Unauthorized', 401);
            }

            if (($user->role_id ?? null) != 3) {
                return $this->errorResponse('Access denied. Coach access only.', 403);
            }

            $gymId = $user->gym_id ?? null;
            $event = ScheduleEvent::where('id', $id)
                ->where('gym_id', $gymId)
                ->with(['coach', 'member', 'activity', 'workoutActivity', 'activeBookings', 'activeBookings.member'])
                ->first();

            if (!$event) {
                return $this->errorResponse('Schedule event not found', 404);
            }

            // Transform event data (same as getEvents)
            $date = $event->date;
            if ($date instanceof Carbon || $date instanceof \DateTime) {
                $date = $date->format('Y-m-d');
            } elseif (is_string($date)) {
                try {
                    $date = Carbon::parse($date)->format('Y-m-d');
                } catch (\Exception $e) {
                    $date = $date;
                }
            }

            $startTime = $event->start_time;
            if (is_string($startTime) && strlen($startTime) >= 5) {
                $startTime = substr($startTime, 0, 5);
            }

            $endTime = $event->end_time;
            if (is_string($endTime) && strlen($endTime) >= 5) {
                $endTime = substr($endTime, 0, 5);
            }

            $eventData = [
                'id' => $event->id,
                'title' => $event->title,
                'date' => $date,
                'start_time' => $startTime,
                'end_time' => $endTime,
                'tab' => $event->tab,
                'coach_id' => $event->coach_id,
                'coach_name' => $event->coach ? ($event->coach->name ?? ($event->coach->first_name . ' ' . $event->coach->last_name)) : null,
                'member_id' => $event->member_id,
                'member_name' => $event->member ? ($event->member->name ?? ($event->member->firstname . ' ' . $event->member->lastname)) : null,
                'member_ids' => $event->activeBookings ? $event->activeBookings->pluck('member_id')->toArray() : ($event->member_id ? [$event->member_id] : []),
                'member_names' => $event->activeBookings && $event->activeBookings->count() > 0 ? $event->activeBookings->map(function($booking) {
                    if (!$booking->member) return null;
                    $name = $booking->member->name ?? $booking->member->membername ?? null;
                    if (!$name) {
                        $name = trim(($booking->member->firstname ?? '') . ' ' . ($booking->member->lastname ?? ''));
                    }
                    return $name ?: null;
                })->filter()->values()->toArray() : ($event->member ? [($event->member->name ?? $event->member->membername ?? ($event->member->firstname . ' ' . $event->member->lastname))] : []),
                'activity_id' => $event->activity_id,
                'activity_name' => $event->activity ? $event->activity->name : ($event->workoutActivity ? $event->workoutActivity->exercise_name : null),
                'description' => $event->description,
                'schedule_id' => $event->schedule_id,
                'schedule_name' => $this->getScheduleName($event->schedule_id),
                'max_participants' => $event->max_participants,
                'recurrency' => $event->recurrency,
                'location_id' => $event->location_id,
                'location_name' => $this->getLocationName($event->location_id),
                'location' => $this->getLocationName($event->location_id) ?: 'Studio',
                'current_bookings' => $event->activeBookings ? $event->activeBookings->count() : 0,
                'capacity' => $event->max_participants ? 
                    ($event->activeBookings ? $event->activeBookings->count() : 0) . '/' . $event->max_participants : 
                    ($event->activeBookings ? $event->activeBookings->count() : 0) . '/10',
                'is_full' => $event->max_participants ? 
                    ($event->activeBookings ? $event->activeBookings->count() >= $event->max_participants : false) : false,
                'can_book' => $event->enable_online_booking && 
                    (!$event->max_participants || !$event->activeBookings || $event->activeBookings->count() < $event->max_participants),
            ];

            return $this->successResponse($eventData, 'Schedule event retrieved successfully');
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileScheduleController@getEvent');
        }
    }

    /**
     * Create a new schedule event
     */
    public function createEvent(Request $request)
    {
        try {
            $user = $request->user('api');
            if (!$user) {
                return $this->errorResponse('Unauthorized', 401);
            }

            if (($user->role_id ?? null) != 3) {
                return $this->errorResponse('Access denied. Coach access only.', 403);
            }

            $gymId = $user->gym_id ?? null;
            if (!$gymId) {
                return $this->errorResponse('User not associated with any gym', 400);
            }

            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'date' => 'required|date',
                'start_time' => 'required|string',
                'end_time' => 'required|string',
                'tab' => 'nullable|string',
                'coach_id' => 'nullable|exists:coaches,id',
                'member_id' => 'nullable|exists:members,id',
                'member_ids' => 'nullable|array',
                'member_ids.*' => 'exists:members,id',
                // Backward compatible: older installs used workout_exercises.exercise_id in activity_id.
                'activity_id' => 'nullable|integer',
                'schedule_id' => 'nullable|integer',
                'max_participants' => 'nullable|integer|min:1',
                'recurrency' => 'nullable|string', // Can be JSON string or legacy format
                'location_id' => 'nullable|integer',
                'description' => 'nullable|string',
                'note_to_employees' => 'nullable|string',
                'bookable_in_advance' => 'nullable|integer|min:1',
                'bookable_unit' => 'nullable|string|in:weeks,days,months',
                'credit_type' => 'nullable|string',
                'cancel_if_no_participants' => 'nullable|string|in:always,never,1hour,2hours',
                'free_cancellation_period' => 'nullable|string|in:always,1hour,2hours,1day',
                'link' => 'nullable|url',
                'link_text' => 'nullable|string',
                'show_link_before_booking' => 'nullable|boolean',
                'enable_online_booking' => 'nullable|boolean',
            ]);

            if ($validator->fails()) {
                return $this->errorResponse('Validation failed', 422, $validator->errors()->toArray());
            }

            // Handle member_id (single) or member_ids (multiple)
            $memberIds = $request->member_ids ?? ($request->member_id ? [$request->member_id] : []);
            $singleMemberId = !empty($memberIds) && count($memberIds) === 1 ? $memberIds[0] : null;

            // Check credits for all members before creating schedule event
            if (!empty($memberIds)) {
                $creditService = new \App\Services\MemberCreditService();
                $creditCost = $request->input('credit_cost'); // Optional override
                $adminOverride = $request->input('admin_override', false);
                
                $insufficientMembers = [];
                foreach ($memberIds as $memberId) {
                    $creditCheck = $creditService->checkCreditsBeforeActivityCreation(
                        $memberId,
                        'schedule_event_booking',
                        $creditCost,
                        $adminOverride
                    );
                    
                    if (!$creditCheck['can_proceed']) {
                        $member = \App\Models\Member::find($memberId);
                        $memberName = $member ? ($member->membername ?? trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''))) : "Member #{$memberId}";
                        $insufficientMembers[] = [
                            'member_id' => $memberId,
                            'member_name' => $memberName,
                            'message' => $creditCheck['message'],
                            'required' => $creditCheck['required'] ?? null,
                            'available' => $creditCheck['available'] ?? null
                        ];
                    }
                }
                
                if (!empty($insufficientMembers)) {
                    return $this->errorResponse(
                        'One or more members have insufficient credits. Please renew their membership plans to continue.',
                        422,
                        [
                            'error_code' => 'INSUFFICIENT_CREDITS',
                            'insufficient_members' => $insufficientMembers
                        ]
                    );
                }
            }

            // Use coach_id from request or default to logged-in coach
            $coachId = $request->coach_id ?? $user->coach_id ?? null;

            $event = ScheduleEvent::create([
                'gym_id' => $gymId,
                'title' => $request->title,
                'date' => $request->date,
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
                'tab' => $request->tab ?? 'GROUP TRAINING',
                'coach_id' => $coachId,
                'member_id' => $singleMemberId,
                'activity_id' => $request->activity_id,
                'description' => $request->description,
                'schedule_id' => $request->schedule_id,
                'max_participants' => $request->max_participants,
                'recurrency' => $request->recurrency,
                'location_id' => $request->location_id,
                'note_to_employees' => $request->note_to_employees,
                'bookable_in_advance' => $request->bookable_in_advance ?? 1,
                'bookable_unit' => $request->bookable_unit ?? 'weeks',
                'credit_type' => $request->credit_type ?? 'No credits',
                'cancel_if_no_participants' => $request->cancel_if_no_participants ?? 'always',
                'free_cancellation_period' => $request->free_cancellation_period ?? 'always',
                'link' => $request->link,
                'link_text' => $request->link_text,
                'show_link_before_booking' => $request->show_link_before_booking ?? false,
                'enable_online_booking' => $request->enable_online_booking ?? false,
            ]);

            // Track credit deduction stats
            $creditDeductionStats = [
                'total' => 0,
                'success' => 0,
                'failed' => 0,
                'errors' => []
            ];
            
            // Create bookings for all selected members
            if (!empty($memberIds)) {
                foreach ($memberIds as $memberId) {
                    $booking = ScheduleEventBooking::create([
                        'schedule_event_id' => $event->id,
                        'member_id' => $memberId,
                        'gym_id' => $gymId,
                        'status' => 'booked',
                        'booked_at' => Carbon::now(),
                    ]);
                    
                    // Refresh booking to ensure it's fully saved
                    $booking->refresh();
                    
                    // Deduct credits when member is assigned to schedule event
                    $creditDeductionStatus = null;
                    $creditDeductionError = null;
                    try {
                        $creditService = new \App\Services\MemberCreditService();
                        $creditCost = $request->input('credit_cost'); // Optional override
                        $adminOverride = $request->input('admin_override', false);
                        
                        // Log attempt to deduct credits
                        Log::info('Attempting to deduct credits when schedule event booking created (Mobile Coach)', [
                            'booking_id' => $booking->id,
                            'event_id' => $event->id,
                            'member_id' => $memberId,
                            'credit_cost' => $creditCost,
                            'admin_override' => $adminOverride
                        ]);
                        
                        $result = $creditService->deductCreditsForActivity(
                            $memberId,
                            'schedule_event_booking',
                            $booking->id,
                            $creditCost,
                            $adminOverride
                        );

                        $creditDeductionStats['total']++;
                        
                        if ($result['success']) {
                            $creditDeductionStatus = 'success';
                            $creditDeductionStats['success']++;
                            Log::info('Credits deducted successfully when schedule event booking created (Mobile Coach)', [
                                'booking_id' => $booking->id,
                                'event_id' => $event->id,
                                'member_id' => $memberId,
                                'transaction_id' => $result['transaction_id'] ?? null,
                                'remaining_credits' => $result['remaining_credits'] ?? null
                            ]);
                            
                            // Refresh booking to get updated credit_deducted flag
                            $booking->refresh();
                        } else {
                            $creditDeductionStatus = 'failed';
                            $creditDeductionError = $result['message'];
                            $creditDeductionStats['failed']++;
                            $creditDeductionStats['errors'][] = [
                                'member_id' => $memberId,
                                'booking_id' => $booking->id,
                                'error' => $result['message']
                            ];
                            Log::warning('Failed to deduct credits when schedule event booking created (Mobile Coach)', [
                                'booking_id' => $booking->id,
                                'event_id' => $event->id,
                                'member_id' => $memberId,
                                'error' => $result['message'],
                                'credit_cost' => $creditCost,
                                'note' => 'Booking was created but credits were not deducted. Credits may need to be deducted manually or member may need credits.'
                            ]);
                        }
                    } catch (\Exception $e) {
                        // Log error but don't fail booking creation if credit deduction fails
                        $creditDeductionStatus = 'error';
                        $creditDeductionError = $e->getMessage();
                        $creditDeductionStats['total']++;
                        $creditDeductionStats['failed']++;
                        $creditDeductionStats['errors'][] = [
                            'member_id' => $memberId,
                            'booking_id' => $booking->id,
                            'error' => $e->getMessage()
                        ];
                        Log::error('Error deducting credits when schedule event booking created (Mobile Coach): ' . $e->getMessage(), [
                            'booking_id' => $booking->id,
                            'event_id' => $event->id,
                            'member_id' => $memberId,
                            'trace' => $e->getTraceAsString()
                        ]);
                    }
                }
            }

            $eventData = $event->load(['coach', 'member', 'activity', 'activeBookings']);
            $eventData->credit_deduction_stats = $creditDeductionStats;
            
            return $this->successResponse($eventData, 'Schedule event created successfully', 201);
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileScheduleController@createEvent');
        }
    }

    /**
     * Update a schedule event
     */
    public function updateEvent(Request $request, $id)
    {
        try {
            $user = $request->user('api');
            if (!$user) {
                return $this->errorResponse('Unauthorized', 401);
            }

            if (($user->role_id ?? null) != 3) {
                return $this->errorResponse('Access denied. Coach access only.', 403);
            }

            $gymId = $user->gym_id ?? null;
            $event = ScheduleEvent::where('id', $id)
                ->where('gym_id', $gymId)
                ->first();

            if (!$event) {
                return $this->errorResponse('Schedule event not found', 404);
            }

            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|required|string|max:255',
                'date' => 'sometimes|required|date',
                'start_time' => 'sometimes|required|string',
                'end_time' => 'sometimes|required|string',
                'coach_id' => 'nullable|exists:coaches,id',
                'member_id' => 'nullable|exists:members,id',
                'member_ids' => 'nullable|array',
                'member_ids.*' => 'exists:members,id',
                // Backward compatible: older installs used workout_exercises.exercise_id in activity_id.
                'activity_id' => 'nullable|integer',
                'schedule_id' => 'nullable|integer',
                'max_participants' => 'nullable|integer|min:1',
                'recurrency' => 'nullable|string', // Can be JSON string or legacy format
                'location_id' => 'nullable|integer',
                'description' => 'nullable|string',
                'note_to_employees' => 'nullable|string',
                'bookable_in_advance' => 'nullable|integer|min:1',
                'bookable_unit' => 'nullable|string|in:weeks,days,months',
                'credit_type' => 'nullable|string',
                'cancel_if_no_participants' => 'nullable|string|in:always,never,1hour,2hours',
                'free_cancellation_period' => 'nullable|string|in:always,1hour,2hours,1day',
                'link' => 'nullable|url',
                'link_text' => 'nullable|string',
                'show_link_before_booking' => 'nullable|boolean',
                'enable_online_booking' => 'nullable|boolean',
            ]);

            if ($validator->fails()) {
                return $this->errorResponse('Validation failed', 422, $validator->errors()->toArray());
            }

            // Handle member_id (single) or member_ids (multiple)
            $memberIds = $request->member_ids ?? ($request->member_id ? [$request->member_id] : []);
            $singleMemberId = !empty($memberIds) && count($memberIds) === 1 ? $memberIds[0] : null;

            $updateData = $request->only([
                'title', 'date', 'start_time', 'end_time', 'tab',
                'coach_id', 'activity_id', 'description',
                'schedule_id', 'max_participants', 'recurrency', 'location_id',
                'note_to_employees', 'bookable_in_advance', 'bookable_unit',
                'credit_type', 'cancel_if_no_participants', 'free_cancellation_period',
                'link', 'link_text', 'show_link_before_booking', 'enable_online_booking'
            ]);
            $updateData['member_id'] = $singleMemberId;

            $event->update($updateData);

            // Track credit deduction stats
            $creditDeductionStats = [
                'total' => 0,
                'success' => 0,
                'failed' => 0,
                'errors' => []
            ];

            // Update bookings: remove old bookings and create new ones
            if ($request->has('member_ids')) {
                // Get existing bookings before deleting to identify newly assigned members
                $existingBookings = ScheduleEventBooking::where('schedule_event_id', $event->id)
                    ->where('status', 'booked')
                    ->pluck('member_id')
                    ->toArray();
                
                // Check credits for newly assigned members before updating
                if (!empty($memberIds)) {
                    $creditService = new \App\Services\MemberCreditService();
                    $creditCost = $request->input('credit_cost'); // Optional override
                    $adminOverride = $request->input('admin_override', false);
                    
                    $insufficientMembers = [];
                    foreach ($memberIds as $memberId) {
                        // Only check credits for newly assigned members
                        $isNewlyAssigned = !in_array($memberId, $existingBookings);
                        if ($isNewlyAssigned) {
                            $creditCheck = $creditService->checkCreditsBeforeActivityCreation(
                                $memberId,
                                'schedule_event_booking',
                                $creditCost,
                                $adminOverride
                            );
                            
                            if (!$creditCheck['can_proceed']) {
                                $member = \App\Models\Member::find($memberId);
                                $memberName = $member ? ($member->membername ?? trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''))) : "Member #{$memberId}";
                                $insufficientMembers[] = [
                                    'member_id' => $memberId,
                                    'member_name' => $memberName,
                                    'message' => $creditCheck['message'],
                                    'required' => $creditCheck['required'] ?? null,
                                    'available' => $creditCheck['available'] ?? null
                                ];
                            }
                        }
                    }
                    
                    if (!empty($insufficientMembers)) {
                        return $this->errorResponse(
                            'One or more newly assigned members have insufficient credits. Please renew their membership plans to continue.',
                            422,
                            [
                                'error_code' => 'INSUFFICIENT_CREDITS',
                                'insufficient_members' => $insufficientMembers
                            ]
                        );
                    }
                }
                
                // Delete existing bookings for this event
                ScheduleEventBooking::where('schedule_event_id', $event->id)
                    ->where('status', 'booked')
                    ->delete();

                // Create new bookings for selected members and deduct credits for newly assigned ones
                if (!empty($memberIds)) {
                    foreach ($memberIds as $memberId) {
                        $booking = ScheduleEventBooking::create([
                            'schedule_event_id' => $event->id,
                            'member_id' => $memberId,
                            'gym_id' => $gymId,
                            'status' => 'booked',
                            'booked_at' => Carbon::now(),
                        ]);
                        
                        // Refresh booking to ensure it's fully saved
                        $booking->refresh();
                        
                        // Deduct credits only for newly assigned members (not in existing bookings)
                        $isNewlyAssigned = !in_array($memberId, $existingBookings);
                        if ($isNewlyAssigned) {
                            $creditDeductionStatus = null;
                            $creditDeductionError = null;
                            try {
                                $creditService = new \App\Services\MemberCreditService();
                                $creditCost = $request->input('credit_cost'); // Optional override
                                $adminOverride = $request->input('admin_override', false);
                                
                                // Log attempt to deduct credits
                                Log::info('Attempting to deduct credits when schedule event booking created (Mobile Coach Update)', [
                                    'booking_id' => $booking->id,
                                    'event_id' => $event->id,
                                    'member_id' => $memberId,
                                    'credit_cost' => $creditCost,
                                    'admin_override' => $adminOverride
                                ]);
                                
                                $result = $creditService->deductCreditsForActivity(
                                    $memberId,
                                    'schedule_event_booking',
                                    $booking->id,
                                    $creditCost,
                                    $adminOverride
                                );

                                $creditDeductionStats['total']++;
                                
                                if ($result['success']) {
                                    $creditDeductionStatus = 'success';
                                    $creditDeductionStats['success']++;
                                    Log::info('Credits deducted successfully when schedule event booking created (Mobile Coach Update)', [
                                        'booking_id' => $booking->id,
                                        'event_id' => $event->id,
                                        'member_id' => $memberId,
                                        'transaction_id' => $result['transaction_id'] ?? null,
                                        'remaining_credits' => $result['remaining_credits'] ?? null
                                    ]);
                                    
                                    // Refresh booking to get updated credit_deducted flag
                                    $booking->refresh();
                                } else {
                                    $creditDeductionStatus = 'failed';
                                    $creditDeductionError = $result['message'];
                                    $creditDeductionStats['failed']++;
                                    $creditDeductionStats['errors'][] = [
                                        'member_id' => $memberId,
                                        'booking_id' => $booking->id,
                                        'error' => $result['message']
                                    ];
                                    Log::warning('Failed to deduct credits when schedule event booking created (Mobile Coach Update)', [
                                        'booking_id' => $booking->id,
                                        'event_id' => $event->id,
                                        'member_id' => $memberId,
                                        'error' => $result['message'],
                                        'credit_cost' => $creditCost,
                                        'note' => 'Booking was created but credits were not deducted. Credits may need to be deducted manually or member may need credits.'
                                    ]);
                                }
                            } catch (\Exception $e) {
                                // Log error but don't fail booking creation if credit deduction fails
                                $creditDeductionStatus = 'error';
                                $creditDeductionError = $e->getMessage();
                                $creditDeductionStats['total']++;
                                $creditDeductionStats['failed']++;
                                $creditDeductionStats['errors'][] = [
                                    'member_id' => $memberId,
                                    'booking_id' => $booking->id,
                                    'error' => $e->getMessage()
                                ];
                                Log::error('Error deducting credits when schedule event booking created (Mobile Coach Update): ' . $e->getMessage(), [
                                    'booking_id' => $booking->id,
                                    'event_id' => $event->id,
                                    'member_id' => $memberId,
                                    'trace' => $e->getTraceAsString()
                                ]);
                            }
                        }
                    }
                }
            }

            $eventData = $event->load(['coach', 'member', 'activity', 'activeBookings']);
            $eventData->credit_deduction_stats = $creditDeductionStats;
            
            return $this->successResponse($eventData, 'Schedule event updated successfully');
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileScheduleController@updateEvent');
        }
    }

    /**
     * Delete a schedule event
     */
    public function deleteEvent($id)
    {
        try {
            $user = request()->user('api');
            if (!$user) {
                return $this->errorResponse('Unauthorized', 401);
            }

            if (($user->role_id ?? null) != 3) {
                return $this->errorResponse('Access denied. Coach access only.', 403);
            }

            $gymId = $user->gym_id ?? null;
            $event = ScheduleEvent::where('id', $id)
                ->where('gym_id', $gymId)
                ->first();

            if (!$event) {
                return $this->errorResponse('Schedule event not found', 404);
            }

            $event->delete();

            return $this->successResponse(null, 'Schedule event deleted successfully');
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileScheduleController@deleteEvent');
        }
    }

    /**
     * Get schedules list (for dropdown)
     */
    public function getSchedules()
    {
        try {
            // Static schedule options matching CRM
            $schedules = [
                ['id' => 1, 'name' => 'Group Training'],
                ['id' => 2, 'name' => 'Private Gym'],
                ['id' => 3, 'name' => 'Recovery Center Services'],
            ];
            return $this->successResponse($schedules, 'Schedules retrieved successfully');
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileScheduleController@getSchedules');
        }
    }

    /**
     * Get locations list (for dropdown)
     */
    public function getLocations()
    {
        try {
            // Static location options matching CRM
            $locations = [
                ['id' => 1, 'name' => 'Gym'],
                ['id' => 2, 'name' => 'Virtual'],
            ];
            return $this->successResponse($locations, 'Locations retrieved successfully');
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileScheduleController@getLocations');
        }
    }

    /**
     * Get schedule name by ID (static mapping)
     */
    private function getScheduleName($scheduleId)
    {
        if (!$scheduleId) {
            return null;
        }
        $schedules = [
            1 => 'Group Training',
            2 => 'Private Gym',
            3 => 'Recovery Center Services',
        ];
        return $schedules[$scheduleId] ?? null;
    }

    /**
     * Get location name by ID (static mapping)
     */
    private function getLocationName($locationId)
    {
        if (!$locationId) {
            return null;
        }
        $locations = [
            1 => 'Gym',
            2 => 'Virtual',
        ];
        return $locations[$locationId] ?? null;
    }
}

