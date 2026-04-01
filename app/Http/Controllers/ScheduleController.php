<?php

namespace App\Http\Controllers;

use App\Models\ScheduleEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class ScheduleController extends Controller
{
    /**
     * Get schedule events
     */
    public function getEvents(Request $request)
    {
        try {
            $user = $request->user('api');
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $gymId = $user->gym_id ?? null;
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            $query = ScheduleEvent::where('gym_id', $gymId)
                ->with(['coach', 'member', 'activity', 'activeBookings', 'activeBookings.member']);

            // Filter by date range (for weekly view) or single date
            if ($request->filled('start_date') && $request->filled('end_date')) {
                $query->whereBetween('date', [$request->start_date, $request->end_date]);
            } elseif ($request->filled('date')) {
                $query->whereDate('date', $request->date);
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

            $events = $query->orderBy('start_time', 'asc')->get();

            $transformedEvents = $events->map(function ($event) {
                // Handle date formatting - date is cast as 'date' so should be Carbon, but handle both cases
                $date = $event->date;
                if ($date instanceof Carbon || $date instanceof \DateTime) {
                    $date = $date->format('Y-m-d');
                } elseif (is_string($date)) {
                    // If it's a string, try to parse it
                    try {
                        $date = Carbon::parse($date)->format('Y-m-d');
                    } catch (\Exception $e) {
                        $date = $date; // Use as is if parsing fails
                    }
                } else {
                    $date = null;
                }

                // Handle time formatting - times are cast as 'string' in the model
                $startTime = $event->start_time;
                if (is_string($startTime)) {
                    // If it's in "H:i:s" format, extract just "H:i"
                    if (strlen($startTime) >= 5) {
                        $startTime = substr($startTime, 0, 5);
                    }
                } elseif ($startTime instanceof Carbon || $startTime instanceof \DateTime) {
                    $startTime = $startTime->format('H:i');
                } else {
                    $startTime = null;
                }

                $endTime = $event->end_time;
                if (is_string($endTime)) {
                    // If it's in "H:i:s" format, extract just "H:i"
                    if (strlen($endTime) >= 5) {
                        $endTime = substr($endTime, 0, 5);
                    }
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
                    'activity_name' => $event->activity ? ($event->activity->exercise_name ?? $event->activity->name) : null,
                    'description' => $event->description,
                    'schedule_id' => $event->schedule_id,
                    'schedule_name' => $this->getScheduleName($event->schedule_id),
                    'max_participants' => $event->max_participants,
                    'recurrency' => $event->recurrency,
                    'location_id' => $event->location_id,
                    'location_name' => $this->getLocationName($event->location_id),
                    'location' => $this->getLocationName($event->location_id) ?: 'Studio',
                    'max_participants' => $event->max_participants,
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

            return response()->json([
                'success' => true,
                'data' => $transformedEvents
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching schedule events: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching schedule events: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create a new schedule event
     */
    public function store(Request $request)
    {
        try {
            $user = $request->user('api');
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $gymId = $user->gym_id ?? null;
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
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
                'activity_id' => 'nullable|integer',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
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
                    return response()->json([
                        'success' => false,
                        'message' => 'One or more members have insufficient credits. Please renew their membership plans to continue.',
                        'error_code' => 'INSUFFICIENT_CREDITS',
                        'insufficient_members' => $insufficientMembers
                    ], 422);
                }
            }

            $event = ScheduleEvent::create([
                'gym_id' => $gymId,
                'title' => $request->title,
                'date' => $request->date,
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
                'tab' => $request->tab ?? 'My schedule',
                'coach_id' => $request->coach_id,
                'member_id' => $singleMemberId, // Store first member if only one, otherwise null
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

            // Create bookings for all selected members and send notifications
            $notificationStats = [
                'total' => 0,
                'success' => 0,
                'failed' => 0,
                'errors' => []
            ];
            
            // Get performedByUserId if current user is an admin
            $performedByUserId = null;
            if ($user && isset($user->role_id) && $user->role_id == 1) {
                $performedByUserId = $user->id;
            }
            
            // Track credit deduction results
            $creditDeductionStats = [
                'total' => 0,
                'success' => 0,
                'failed' => 0,
                'errors' => []
            ];
            
            if (!empty($memberIds)) {
                foreach ($memberIds as $memberId) {
                    $booking = \App\Models\ScheduleEventBooking::create([
                        'schedule_event_id' => $event->id,
                        'member_id' => $memberId,
                        'gym_id' => $gymId,
                        'status' => 'booked',
                        'booked_at' => \Carbon\Carbon::now(),
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
                        Log::info('Attempting to deduct credits when schedule event booking created', [
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
                            Log::info('Credits deducted successfully when schedule event booking created', [
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
                            Log::warning('Failed to deduct credits when schedule event booking created', [
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
                        Log::error('Error deducting credits when schedule event booking created: ' . $e->getMessage(), [
                            'booking_id' => $booking->id,
                            'event_id' => $event->id,
                            'member_id' => $memberId,
                            'trace' => $e->getTraceAsString()
                        ]);
                    }
                    
                    // Create notifications for schedule assignment
                    try {
                        $member = \App\Models\Member::find($memberId);
                        if ($member) {
                            $notificationResults = \App\Services\NotificationService::scheduleAssigned($event, $member, $gymId, $performedByUserId);
                            $notificationStats['total']++;
                            
                            $memberNotification = $notificationResults['member'] ?? null;
                            if ($memberNotification && $memberNotification['success']) {
                                $notificationStats['success']++;
                            } else {
                                $notificationStats['failed']++;
                                $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
                                $notificationStats['errors'][] = [
                                    'member_id' => $member->id,
                                    'member_name' => $memberName,
                                    'error' => $memberNotification['error'] ?? 'Notification failed'
                                ];
                            }
                        }
                    } catch (\Exception $e) {
                        $notificationStats['total']++;
                        $notificationStats['failed']++;
                        $notificationStats['errors'][] = [
                            'member_id' => $memberId,
                            'error' => $e->getMessage()
                        ];
                        Log::error('Failed to create schedule assignment notifications: ' . $e->getMessage(), [
                            'event_id' => $event->id,
                            'member_id' => $memberId,
                            'trace' => $e->getTraceAsString()
                        ]);
                    }
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Schedule event created successfully',
                'data' => [
                    'event' => $event,
                    'notification_stats' => $notificationStats,
                    'notification_status' => $notificationStats['failed'] === 0,
                    'credit_deduction_stats' => $creditDeductionStats,
                    'credit_deduction_status' => $creditDeductionStats['failed'] === 0,
                    'notification_error' => $notificationStats['failed'] > 0 
                        ? "Failed to send notifications to {$notificationStats['failed']} member(s)." 
                        : null,
                ]
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating schedule event: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error creating schedule event: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update a schedule event
     */
    public function update(Request $request, $id)
    {
        try {
            $user = $request->user('api');
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $gymId = $user->gym_id ?? null;
            $event = ScheduleEvent::where('id', $id)
                ->where('gym_id', $gymId)
                ->first();

            if (!$event) {
                return response()->json([
                    'success' => false,
                    'message' => 'Schedule event not found'
                ], 404);
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
                'activity_id' => 'nullable|integer',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
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

            // Track notification stats
            $notificationStats = [
                'total' => 0,
                'success' => 0,
                'failed' => 0,
                'errors' => []
            ];
            
            // Track credit deduction stats
            $creditDeductionStats = [
                'total' => 0,
                'success' => 0,
                'failed' => 0,
                'errors' => []
            ];
            
            // Get performedByUserId if current user is an admin
            $performedByUserId = null;
            if ($user && isset($user->role_id) && $user->role_id == 1) {
                $performedByUserId = $user->id;
            }

            // Update bookings: remove old bookings and create new ones
            if ($request->has('member_ids')) {
                // Get existing bookings before deleting to identify newly assigned members
                $existingBookings = \App\Models\ScheduleEventBooking::where('schedule_event_id', $event->id)
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
                        return response()->json([
                            'success' => false,
                            'message' => 'One or more newly assigned members have insufficient credits. Please renew their membership plans to continue.',
                            'error_code' => 'INSUFFICIENT_CREDITS',
                            'insufficient_members' => $insufficientMembers
                        ], 422);
                    }
                }
                
                // Delete existing bookings for this event
                \App\Models\ScheduleEventBooking::where('schedule_event_id', $event->id)
                    ->where('status', 'booked')
                    ->delete();

                // Create new bookings for selected members and send notifications to newly assigned ones
                if (!empty($memberIds)) {
                    foreach ($memberIds as $memberId) {
                        $booking = \App\Models\ScheduleEventBooking::create([
                            'schedule_event_id' => $event->id,
                            'member_id' => $memberId,
                            'gym_id' => $gymId,
                            'status' => 'booked',
                            'booked_at' => \Carbon\Carbon::now(),
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
                                Log::info('Attempting to deduct credits when schedule event booking created (update)', [
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
                                    Log::info('Credits deducted successfully when schedule event booking created (update)', [
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
                                    Log::warning('Failed to deduct credits when schedule event booking created (update)', [
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
                                Log::error('Error deducting credits when schedule event booking created (update): ' . $e->getMessage(), [
                                    'booking_id' => $booking->id,
                                    'event_id' => $event->id,
                                    'member_id' => $memberId,
                                    'trace' => $e->getTraceAsString()
                                ]);
                            }
                        }
                        
                        // Send notification only if this is a newly assigned member (not in existing bookings)
                        if ($isNewlyAssigned) {
                            try {
                                $member = \App\Models\Member::find($memberId);
                                if ($member) {
                                    // Refresh event to get updated data
                                    $event->refresh();
                                    
                                    $notificationResults = \App\Services\NotificationService::scheduleAssigned($event, $member, $gymId, $performedByUserId);
                                    $notificationStats['total']++;
                                    
                                    $memberNotification = $notificationResults['member'] ?? null;
                                    if ($memberNotification && $memberNotification['success']) {
                                        $notificationStats['success']++;
                                    } else {
                                        $notificationStats['failed']++;
                                        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
                                        $notificationStats['errors'][] = [
                                            'member_id' => $member->id,
                                            'member_name' => $memberName,
                                            'error' => $memberNotification['error'] ?? 'Notification failed'
                                        ];
                                    }
                                }
                            } catch (\Exception $e) {
                                $notificationStats['total']++;
                                $notificationStats['failed']++;
                                $notificationStats['errors'][] = [
                                    'member_id' => $memberId,
                                    'error' => $e->getMessage()
                                ];
                                Log::error('Failed to create schedule assignment notifications: ' . $e->getMessage(), [
                                    'event_id' => $event->id,
                                    'member_id' => $memberId,
                                    'trace' => $e->getTraceAsString()
                                ]);
                            }
                        }
                    }
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Schedule event updated successfully',
                'data' => [
                    'event' => $event,
                    'notification_stats' => $notificationStats,
                    'notification_status' => $notificationStats['failed'] === 0,
                    'notification_error' => $notificationStats['failed'] > 0 
                        ? "Failed to send notifications to {$notificationStats['failed']} member(s)." 
                        : null,
                    'credit_deduction_stats' => $creditDeductionStats,
                    'credit_deduction_status' => $creditDeductionStats['failed'] === 0,
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating schedule event: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error updating schedule event: ' . $e->getMessage()
            ], 500);
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

    /**
     * Delete a schedule event
     */
    public function destroy($id)
    {
        try {
            $user = request()->user('api');
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $gymId = $user->gym_id ?? null;
            $event = ScheduleEvent::where('id', $id)
                ->where('gym_id', $gymId)
                ->first();

            if (!$event) {
                return response()->json([
                    'success' => false,
                    'message' => 'Schedule event not found'
                ], 404);
            }

            $event->delete();

            return response()->json([
                'success' => true,
                'message' => 'Schedule event deleted successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting schedule event: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error deleting schedule event: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get schedules list (for dropdown)
     */
    public function getSchedules(Request $request)
    {
        try {
            // For now, return empty array or create a schedules table later
            return response()->json([
                'success' => true,
                'data' => []
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching schedules: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get locations list (for dropdown)
     */
    public function getLocations(Request $request)
    {
        try {
            // For now, return empty array or create a locations table later
            return response()->json([
                'success' => true,
                'data' => []
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching locations: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mark a booking as attended and deduct credits
     */
    public function markBookingAttended(Request $request, $bookingId)
    {
        try {
            $user = $request->user('api');
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $gymId = $user->gym_id ?? null;
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            $booking = \App\Models\ScheduleEventBooking::where('id', $bookingId)
                ->where('gym_id', $gymId)
                ->with('scheduleEvent')
                ->first();

            if (!$booking) {
                return response()->json([
                    'success' => false,
                    'message' => 'Booking not found'
                ], 404);
            }

            // Check if already marked as attended
            if ($booking->attended_at) {
                return response()->json([
                    'success' => false,
                    'message' => 'Booking already marked as attended'
                ], 400);
            }

            // Mark as attended
            $booking->update([
                'attended_at' => now()
            ]);

            // Deduct credits if not already deducted
            if (!$booking->credit_deducted) {
                try {
                    $creditService = new \App\Services\MemberCreditService();
                    $creditCost = $request->input('credit_cost'); // Optional override
                    $adminOverride = $request->input('admin_override', false);
                    
                    $result = $creditService->deductCreditsForActivity(
                        $booking->member_id,
                        'schedule_event_booking',
                        $booking->id,
                        $creditCost,
                        $adminOverride
                    );

                    if (!$result['success']) {
                        // Log warning
                        Log::warning('Failed to deduct credits for booking', [
                            'booking_id' => $booking->id,
                            'member_id' => $booking->member_id,
                            'error' => $result['message']
                        ]);
                        
                        // If insufficient credits and no admin override, revert attendance
                        if (isset($result['insufficient']) && $result['insufficient'] && !$adminOverride) {
                            $booking->update(['attended_at' => null]);
                            return response()->json([
                                'success' => false,
                                'message' => $result['message'],
                                'error_code' => 'INSUFFICIENT_CREDITS'
                            ], 422);
                        }
                    }
                } catch (\Exception $e) {
                    // Log error but don't fail attendance marking
                    Log::error('Error deducting credits for booking: ' . $e->getMessage(), [
                        'booking_id' => $booking->id,
                        'member_id' => $booking->member_id
                    ]);
                }
            }

            $booking->refresh();

            return response()->json([
                'success' => true,
                'message' => 'Booking marked as attended successfully',
                'data' => $booking
            ]);

        } catch (\Exception $e) {
            Log::error('Error marking booking as attended: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error marking booking as attended: ' . $e->getMessage()
            ], 500);
        }
    }
}
