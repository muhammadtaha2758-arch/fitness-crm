<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\ScheduleEvent;
use App\Models\ScheduleEventBooking;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class MobileScheduleController extends Controller
{
    /**
     * Get available schedule events for booking (bookable events)
     */
    public function getAvailableEvents(Request $request)
    {
        try {
            $member = $request->get('auth_member');
    
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
    
            $memberUserId = $member->member_id; // ✅ use users.member_id
            $gymId = $member->gym_id ?? null;
    
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not associated with any gym'
                ], 400);
            }
    
            // Build base query
            $query = ScheduleEvent::where('gym_id', $gymId)
                ->where('enable_online_booking', true)
                ->with(['coach', 'activity']);
    
            // Filter by date
            if ($request->filled('start_date') && $request->filled('end_date')) {
                $query->whereBetween('date', [$request->start_date, $request->end_date]);
            } elseif ($request->filled('date')) {
                $query->whereDate('date', $request->date);
            } else {
                $query->whereDate('date', '>=', Carbon::today());
            }
    
            // Filter by tab
            if ($request->filled('tab') && $request->tab !== 'All') {
                $query->where('tab', $request->tab);
            }
    
            $events = $query->orderBy('date', 'asc')
                            ->orderBy('start_time', 'asc')
                            ->get();
    
            // Load all bookings for these events in one query
            $eventIds = $events->pluck('id')->toArray();
            $allBookings = ScheduleEventBooking::whereIn('schedule_event_id', $eventIds)
                ->where('status', 'booked')
                ->with('member') // make sure relation returns User model
                ->get()
                ->groupBy('schedule_event_id');
    
            // Transform events with booking info
            $transformedEvents = $events->map(function ($event) use ($memberUserId, $allBookings) {
                $eventBookings = $allBookings->get($event->id, collect());
                $currentBookings = $eventBookings->count();
                $isFull = $event->max_participants ? $currentBookings >= $event->max_participants : false;
    
                $isBooked = $eventBookings->where('member_id', $memberUserId)->isNotEmpty();
                $isAssigned = $event->member_id == $memberUserId;
    
                $participants = $eventBookings->map(function($booking) {
                    if (!$booking->member) return null;
                    return [
                        'member_id' => $booking->member->member_id ?? $booking->member->id,
                        'member_name' => $booking->member->name ?? $booking->member->membername ?? 
                            trim(($booking->member->firstname ?? '') . ' ' . ($booking->member->lastname ?? '')),
                    ];
                })->filter()->values()->toArray();
    
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'date' => $event->date ? $event->date->format('Y-m-d') : null,
                    'start_time' => $event->start_time,
                    'end_time' => $event->end_time,
                    'tab' => $event->tab,
                    'coach_id' => $event->coach_id,
                    'coach_name' => $event->coach ? ($event->coach->first_name . ' ' . $event->coach->last_name) : null,
                    'activity_id' => $event->activity_id,
                    'activity_name' => $event->activity ? ($event->activity->exercise_name ?? $event->activity->name) : null,
                    'description' => $event->description,
                    'location' => $this->getLocationName($event->location_id) ?: 'Studio',
                    'max_participants' => $event->max_participants,
                    'current_bookings' => $currentBookings,
                    'capacity' => $event->max_participants ? 
                        $currentBookings . '/' . $event->max_participants : 
                        $currentBookings . '/10',
                    'is_full' => $isFull,
                    'is_booked' => $isBooked,
                    'is_assigned' => $isAssigned,
                    'can_book' => $event->enable_online_booking && !$isFull && !$isBooked && !$isAssigned,
                    'participants' => $participants,
                ];
            });
    
            return response()->json([
                'success' => true,
                'data' => $transformedEvents
            ]);
    
        } catch (\Exception $e) {
            Log::error('Error fetching available schedule events: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching available schedule events: ' . $e->getMessage()
            ], 500);
        }
    }
    

    /**
     * Book a schedule event
     */
    public function bookEvent(Request $request, $eventId)
    {
        try {
            $member = $request->get('auth_member');
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
    
            $gymId = $member->gym_id ?? null;
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not associated with any gym'
                ], 400);
            }
    
            $event = ScheduleEvent::where('id', $eventId)
                ->where('gym_id', $gymId)
                ->where('enable_online_booking', true)
                ->with('activeBookings')
                ->first();
    
            if (!$event) {
                return response()->json([
                    'success' => false,
                    'message' => 'Schedule event not found or not available for booking'
                ], 404);
            }
    
            // Check if event is full
            $currentBookings = $event->activeBookings ? $event->activeBookings->count() : 0;
            if ($event->max_participants && $currentBookings >= $event->max_participants) {
                return response()->json([
                    'success' => false,
                    'message' => 'This event is full'
                ], 400);
            }
    
            $memberUserId = $member->member_id; // ✔ Use users.member_id
    
            // Check if member already booked
            $existingBooking = ScheduleEventBooking::where('schedule_event_id', $eventId)
                ->where('member_id', $memberUserId) // ✔ fixed
                ->where('status', 'booked')
                ->first();
    
            if ($existingBooking) {
                return response()->json([
                    'success' => false,
                    'message' => 'You have already booked this event'
                ], 400);
            }
    
            // Check credits before allowing booking
            $creditService = new \App\Services\MemberCreditService();
            $creditCost = $request->input('credit_cost') ?? ($event->credit_cost ?? null);
            $adminOverride = $request->input('admin_override', false);
            
            $creditCheck = $creditService->checkCreditsBeforeActivityCreation(
                $memberUserId,
                'schedule_event_booking',
                $creditCost,
                $adminOverride
            );
            
            if (!$creditCheck['can_proceed']) {
                Log::warning('Member attempted to book event with insufficient credits', [
                    'member_id' => $memberUserId,
                    'event_id' => $eventId,
                    'required' => $creditCheck['required'] ?? null,
                    'available' => $creditCheck['available'] ?? null
                ]);
                
                return response()->json([
                    'success' => false,
                    'message' => $creditCheck['message'] . ' Please renew your membership plan to continue.',
                    'error_code' => 'INSUFFICIENT_CREDITS',
                    'insufficient' => true,
                    'required' => $creditCheck['required'] ?? null,
                    'available' => $creditCheck['available'] ?? null
                ], 422);
            }
    
            // Create booking
            $booking = ScheduleEventBooking::create([
                'schedule_event_id' => $eventId,
                'member_id' => $memberUserId,     // ✔ fixed
                'gym_id' => $gymId,
                'status' => 'booked',
                'booked_at' => Carbon::now(),
            ]);
            
            // Refresh booking to ensure it's fully saved
            $booking->refresh();
            
            // Deduct credits when member books event (same as CRM)
            try {
                Log::info('Attempting to deduct credits when schedule event booking created (Mobile Member)', [
                    'booking_id' => $booking->id,
                    'event_id' => $eventId,
                    'member_id' => $memberUserId,
                    'credit_cost' => $creditCost,
                    'admin_override' => $adminOverride
                ]);
                
                $result = $creditService->deductCreditsForActivity(
                    $memberUserId,
                    'schedule_event_booking',
                    $booking->id,
                    $creditCost,
                    $adminOverride
                );
                
                if ($result['success']) {
                    Log::info('Credits deducted successfully when schedule event booking created (Mobile Member)', [
                        'booking_id' => $booking->id,
                        'event_id' => $eventId,
                        'member_id' => $memberUserId,
                        'transaction_id' => $result['transaction_id'] ?? null,
                        'remaining_credits' => $result['remaining_credits'] ?? null
                    ]);
                    
                    // Refresh booking to get updated credit_deducted flag
                    $booking->refresh();
                } else {
                    Log::warning('Failed to deduct credits when schedule event booking created (Mobile Member)', [
                        'booking_id' => $booking->id,
                        'event_id' => $eventId,
                        'member_id' => $memberUserId,
                        'error' => $result['message'],
                        'credit_cost' => $creditCost,
                        'note' => 'Booking was created but credits were not deducted. Credits may need to be deducted manually or member may need credits.'
                    ]);
                    
                    // Return error but booking was already created
                    return response()->json([
                        'success' => false,
                        'message' => 'Booking created but failed to deduct credits: ' . $result['message'],
                        'error_code' => 'CREDIT_DEDUCTION_FAILED',
                        'booking_id' => $booking->id,
                        'data' => $booking
                    ], 422);
                }
            } catch (\Exception $e) {
                // Log error but don't fail booking creation if credit deduction fails
                Log::error('Error deducting credits when schedule event booking created (Mobile Member): ' . $e->getMessage(), [
                    'booking_id' => $booking->id,
                    'event_id' => $eventId,
                    'member_id' => $memberUserId,
                    'exception' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                
                // Return error but booking was already created
                return response()->json([
                    'success' => false,
                    'message' => 'Booking created but error deducting credits: ' . $e->getMessage(),
                    'error_code' => 'CREDIT_DEDUCTION_ERROR',
                    'booking_id' => $booking->id,
                    'data' => $booking
                ], 422);
            }
    
            return response()->json([
                'success' => true,
                'message' => 'Event booked successfully and credits deducted',
                'data' => $booking
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error booking schedule event: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error booking schedule event: ' . $e->getMessage()
            ], 500);
        }
    }
    

    /**
     * Cancel a booking
     */
    public function cancelBooking(Request $request, $eventId)
    {
        try {
            $member = $request->get('auth_member');
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
    
            $memberUserId = $member->member_id; // ✔ Use users.member_id
    
            $booking = ScheduleEventBooking::where('schedule_event_id', $eventId)
                ->where('member_id', $memberUserId)  // ✔ fixed
                ->where('status', 'booked')
                ->first();
    
            if (!$booking) {
                return response()->json([
                    'success' => false,
                    'message' => 'Booking not found'
                ], 404);
            }
    
            $booking->update([
                'status' => 'cancelled',
                'cancelled_at' => Carbon::now(),
                'cancellation_reason' => $request->input('reason', 'Cancelled by member'),
            ]);
    
            return response()->json([
                'success' => true,
                'message' => 'Booking cancelled successfully',
                'data' => $booking
            ]);
        } catch (\Exception $e) {
            Log::error('Error cancelling booking: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error cancelling booking: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mark a booking as attended (for coaches/admins to mark member attendance)
     */
    public function markBookingAttended(Request $request, $bookingId)
    {
        try {
            $user = $request->get('auth_member') ?? $request->user('api');
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

            $booking = ScheduleEventBooking::where('id', $bookingId)
                ->where('gym_id', $gymId)
                ->with('scheduleEvent')
                ->first();

            if (!$booking) {
                return response()->json([
                    'success' => false,
                    'message' => 'Booking not found'
                ], 404);
            }

            if ($booking->attended_at) {
                return response()->json([
                    'success' => false,
                    'message' => 'Booking already marked as attended'
                ], 400);
            }

            $booking->update([
                'attended_at' => Carbon::now()
            ]);

            if (!$booking->credit_deducted) {
                try {
                    $creditService = new \App\Services\MemberCreditService();
                    $creditCost = $request->input('credit_cost');
                    $adminOverride = $request->input('admin_override', false);
                    
                    $result = $creditService->deductCreditsForActivity(
                        $booking->member_id,
                        'schedule_event_booking',
                        $booking->id,
                        $creditCost,
                        $adminOverride
                    );

                    if (!$result['success']) {
                        Log::warning('Failed to deduct credits for booking', [
                            'booking_id' => $booking->id,
                            'member_id' => $booking->member_id,
                            'error' => $result['message']
                        ]);
                        
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
                    Log::error('Error deducting credits for booking: ' . $e->getMessage());
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
    

    /**
     * Get member's booked schedule events
     */
    public function getMyBookings(Request $request)
    {
        try {
            $member = $request->get('auth_member');
    
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
    
            $memberUserId = $member->member_id; // ✅ use users.member_id
    
            $query = ScheduleEventBooking::where('member_id', $memberUserId)
                ->where('status', 'booked')
                ->with(['scheduleEvent.coach', 'scheduleEvent.activity']);
    
            // Filter by date
            if ($request->filled('date')) {
                $query->whereHas('scheduleEvent', function($q) use ($request) {
                    $q->whereDate('date', $request->date);
                });
            } else {
                // Default: show upcoming bookings
                $query->whereHas('scheduleEvent', function($q) {
                    $q->whereDate('date', '>=', Carbon::today());
                });
            }
    
            $bookings = $query->orderBy('created_at', 'desc')->get();
    
            $transformedBookings = $bookings->map(function ($booking) {
                $event = $booking->scheduleEvent;
                if (!$event) {
                    return null;
                }
    
                return [
                    'id' => $booking->id,
                    'event_id' => $event->id,
                    'title' => $event->title,
                    'date' => $event->date ? $event->date->format('Y-m-d') : null,
                    'start_time' => $event->start_time,
                    'end_time' => $event->end_time,
                    'tab' => $event->tab,
                    'coach_name' => $event->coach ? ($event->coach->first_name . ' ' . $event->coach->last_name) : null,
                    'activity_name' => $event->activity ? ($event->activity->exercise_name ?? $event->activity->name) : null,
                    'location' => $this->getLocationName($event->location_id) ?: 'Studio',
                    'booked_at' => $booking->booked_at ? $booking->booked_at->format('Y-m-d H:i:s') : null,
                ];
            })->filter()->values(); // added ->values() to reset keys
    
            return response()->json([
                'success' => true,
                'data' => $transformedBookings
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching member bookings: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching member bookings: ' . $e->getMessage()
            ], 500);
        }
    }
    

    /**
     * Get a single schedule event details
     */
    public function getEventDetails(Request $request, $eventId)
    {
        try {
            $member = $request->get('auth_member');
    
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
    
            $memberUserId = $member->member_id; // ✅ users.member_id
            $gymId = $member->gym_id ?? null;
    
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not associated with any gym'
                ], 400);
            }
    
            // Fetch the event with related coach and activity
            $event = ScheduleEvent::where('id', $eventId)
                ->where('gym_id', $gymId)
                ->with(['coach', 'activity'])
                ->first();
    
            if (!$event) {
                return response()->json([
                    'success' => false,
                    'message' => 'Schedule event not found'
                ], 404);
            }
    
            // Load active bookings for this event
            $activeBookings = ScheduleEventBooking::where('schedule_event_id', $event->id)
                ->where('status', 'booked')
                ->with('member') // make sure this returns User model linked to member_id
                ->get();
    
            $currentBookings = $activeBookings->count();
            $isFull = $event->max_participants ? $currentBookings >= $event->max_participants : false;
    
            // Check if current member has booked
            $isBooked = $activeBookings->where('member_id', $memberUserId)->isNotEmpty();
    
            // Check if current member is assigned to this event
            $isAssigned = $event->member_id == $memberUserId;
    
            $eventData = [
                'id' => $event->id,
                'title' => $event->title,
                'date' => $event->date ? $event->date->format('Y-m-d') : null,
                'start_time' => $event->start_time,
                'end_time' => $event->end_time,
                'tab' => $event->tab,
                'coach_id' => $event->coach_id,
                'coach_name' => $event->coach ? ($event->coach->first_name . ' ' . $event->coach->last_name) : null,
                'activity_id' => $event->activity_id,
                'activity_name' => $event->activity ? ($event->activity->exercise_name ?? $event->activity->name) : null,
                'description' => $event->description,
                'location' => $this->getLocationName($event->location_id) ?: 'Studio',
                'location_id' => $event->location_id,
                'max_participants' => $event->max_participants,
                'current_bookings' => $currentBookings,
                'capacity' => $event->max_participants ? 
                    $currentBookings . '/' . $event->max_participants : 
                    $currentBookings . '/10',
                'is_full' => $isFull,
                'is_booked' => $isBooked,
                'is_assigned' => $isAssigned,
                'can_book' => $event->enable_online_booking && !$isFull && !$isBooked && !$isAssigned,
                'enable_online_booking' => $event->enable_online_booking,
                'link' => $event->link,
                'link_text' => $event->link_text,
                'show_link_before_booking' => $event->show_link_before_booking,
                'schedule_id' => $event->schedule_id,
                'schedule_name' => $this->getScheduleName($event->schedule_id),
                'recurrency' => $event->recurrency,
                'participants' => $activeBookings->map(function($booking) {
                    if (!$booking->member) return null;
                    return [
                        'member_id' => $booking->member->member_id ?? $booking->member->id,
                        'member_name' => $booking->member->name ?? $booking->member->membername ?? 
                            trim(($booking->member->firstname ?? '') . ' ' . ($booking->member->lastname ?? '')),
                    ];
                })->filter()->values()->toArray(),
            ];
    
            return response()->json([
                'success' => true,
                'data' => $eventData
            ]);
    
        } catch (\Exception $e) {
            Log::error('Error fetching event details: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching event details: ' . $e->getMessage()
            ], 500);
        }
    }
    


    /**
     * Get schedule calendar view (events grouped by date)
     */
    public function getCalendarView(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $gymId = $member->gym_id ?? null;
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not associated with any gym'
                ], 400);
            }

            $startDate = $request->input('start_date', Carbon::today()->format('Y-m-d'));
            $endDate = $request->input('end_date', Carbon::today()->addDays(30)->format('Y-m-d'));

            // Get all events (available + member's schedule)
            $availableEvents = ScheduleEvent::where('gym_id', $gymId)
                ->where('enable_online_booking', true)
                ->whereNull('member_id')
                ->whereBetween('date', [$startDate, $endDate])
                ->with(['coach', 'activity'])
                ->get();

            $myEvents = ScheduleEvent::where('gym_id', $gymId)
                ->where(function($q) use ($member) {
                    $q->where('member_id', $member->id)
                      ->orWhereHas('bookings', function($bookingQuery) use ($member) {
                          $bookingQuery->where('member_id', $member->id)
                                      ->where('status', 'booked');
                      });
                })
                ->whereBetween('date', [$startDate, $endDate])
                ->with(['coach', 'activity'])
                ->get();

            // Combine and group by date
            $allEvents = $availableEvents->merge($myEvents)->unique('id');
            
            // Load all bookings for these events in one query
            $eventIds = $allEvents->pluck('id')->toArray();
            $allBookings = ScheduleEventBooking::whereIn('schedule_event_id', $eventIds)
                ->where('status', 'booked')
                ->get()
                ->groupBy('schedule_event_id');
            
            $calendar = [];
            foreach ($allEvents as $event) {
                $date = $event->date ? $event->date->format('Y-m-d') : null;
                if (!$date) continue;

                if (!isset($calendar[$date])) {
                    $calendar[$date] = [];
                }

                $eventBookings = $allBookings->get($event->id, collect());
                $isAssigned = $event->member_id == $member->id;
                $isBooked = $eventBookings->where('member_id', $member->id)->isNotEmpty();
                $currentBookings = $eventBookings->count();
                $isFull = $event->max_participants ? $currentBookings >= $event->max_participants : false;

                $calendar[$date][] = [
                    'id' => $event->id,
                    'title' => $event->title,
                    'start_time' => $event->start_time,
                    'end_time' => $event->end_time,
                    'coach_name' => $event->coach ? ($event->coach->first_name . ' ' . $event->coach->last_name) : null,
                    'activity_name' => $event->activity ? ($event->activity->exercise_name ?? $event->activity->name) : null,
                    'location' => $this->getLocationName($event->location_id) ?: 'Studio',
                    'is_assigned' => $isAssigned,
                    'is_booked' => $isBooked,
                    'is_full' => $isFull,
                    'can_book' => $event->enable_online_booking && !$isFull && !$isBooked && !$isAssigned,
                ];
            }

            // Sort events within each date by start_time
            foreach ($calendar as $date => $events) {
                usort($calendar[$date], function($a, $b) {
                    return strcmp($a['start_time'], $b['start_time']);
                });
            }

            return response()->json([
                'success' => true,
                'data' => $calendar
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching calendar view: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching calendar view: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get schedule statistics for member
     */
    public function getStatistics(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $gymId = $member->gym_id ?? null;
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not associated with any gym'
                ], 400);
            }

            $today = Carbon::today();
            $endOfWeek = Carbon::today()->endOfWeek();
            $endOfMonth = Carbon::today()->endOfMonth();

            // Upcoming bookings
            $upcomingBookings = ScheduleEventBooking::where('member_id', $member->id)
                ->where('status', 'booked')
                ->whereHas('scheduleEvent', function($q) use ($today) {
                    $q->whereDate('date', '>=', $today);
                })
                ->count();

            // This week's events
            $thisWeekEvents = ScheduleEvent::where('gym_id', $gymId)
                ->where(function($q) use ($member) {
                    $q->where('member_id', $member->id)
                      ->orWhereHas('activeBookings', function($bookingQuery) use ($member) {
                          $bookingQuery->where('member_id', $member->id);
                      });
                })
                ->whereBetween('date', [$today, $endOfWeek])
                ->count();

            // This month's events
            $thisMonthEvents = ScheduleEvent::where('gym_id', $gymId)
                ->where(function($q) use ($member) {
                    $q->where('member_id', $member->id)
                      ->orWhereHas('activeBookings', function($bookingQuery) use ($member) {
                          $bookingQuery->where('member_id', $member->id);
                      });
                })
                ->whereBetween('date', [$today, $endOfMonth])
                ->count();

            // Total bookings
            $totalBookings = ScheduleEventBooking::where('member_id', $member->id)
                ->where('status', 'booked')
                ->count();

            return response()->json([
                'success' => true,
                'data' => [
                    'upcoming_bookings' => $upcomingBookings,
                    'this_week_events' => $thisWeekEvents,
                    'this_month_events' => $thisMonthEvents,
                    'total_bookings' => $totalBookings,
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching schedule statistics: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching schedule statistics: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all schedules for the authenticated member
     * Returns both assigned schedules and booked schedules
     */
    public function getAllSchedules(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $gymId = $member->gym_id ?? null;
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not associated with any gym'
                ], 400);
            }

            // First, get all event IDs where member has bookings (for is_booked flag)
            $bookedEventIds = ScheduleEventBooking::where('member_id', $member->id)
                ->where('status', 'booked')
                ->pluck('schedule_event_id')
                ->toArray();

            // Build query for events - show all schedules with enable_online_booking
            $query = ScheduleEvent::where('gym_id', $gymId)
                ->where('enable_online_booking', true)
                ->with(['coach', 'activity']);

            // Always exclude past schedules - only show future dates
            $query->whereDate('date', '>=', Carbon::today());

            // Filter by date range
            if ($request->filled('start_date') && $request->filled('end_date')) {
                $query->whereBetween('date', [$request->start_date, $request->end_date]);
            } elseif ($request->filled('date')) {
                $query->whereDate('date', $request->date);
            }

            // Filter by tab
            if ($request->filled('tab') && $request->tab !== 'All') {
                $query->where('tab', $request->tab);
            }

            $events = $query->orderBy('date', 'asc')
                ->orderBy('start_time', 'asc')
                ->get();

            // Load all bookings for these events in one query
            $eventIds = $events->pluck('id')->toArray();
            $allBookings = ScheduleEventBooking::whereIn('schedule_event_id', $eventIds)
                ->where('status', 'booked')
                ->get()
                ->groupBy('schedule_event_id');

            $transformedEvents = $events->map(function ($event) use ($member, $allBookings) {
                $eventBookings = $allBookings->get($event->id, collect());
                $isAssigned = $event->member_id == $member->member_id;
                // Check if member has a booking - ensure type matching
                $isBooked = $eventBookings->contains(function($booking) use ($member) {
                    return (int)$booking->member_id === (int)$member->id;
                });
                
                // If schedule is assigned from CRM, it should show as booked
                if ($isAssigned && !$isBooked) {
                    $isBooked = true;
                }
                
                $currentBookings = $eventBookings->count();
                $isFull = $event->max_participants ? $currentBookings >= $event->max_participants : false;

                // Get booking info if member has booked this event
                $booking = null;
                if ($isBooked) {
                    $booking = $eventBookings->first(function($b) use ($member) {
                        return (int)$b->member_id === (int)$member->id;
                    });
                }

                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'date' => $event->date ? $event->date->format('Y-m-d') : null,
                    'start_time' => $event->start_time,
                    'end_time' => $event->end_time,
                    'tab' => $event->tab,
                    'coach_id' => $event->coach_id,
                    'coach_name' => $event->coach ? ($event->coach->first_name . ' ' . $event->coach->last_name) : null,
                    'activity_id' => $event->activity_id,
                    'activity_name' => $event->activity ? ($event->activity->exercise_name ?? $event->activity->name) : null,
                    'description' => $event->description,
                    'location' => $this->getLocationName($event->location_id) ?: 'Studio',
                    'location_id' => $event->location_id,
                    'max_participants' => $event->max_participants,
                    'current_bookings' => $currentBookings,
                    'capacity' => $event->max_participants ? 
                        $currentBookings . '/' . $event->max_participants : 
                        $currentBookings . '/10',
                    'is_full' => $isFull,
                    'is_assigned' => $isAssigned,
                    'is_booked' => $isBooked,
                    'schedule_type' => $isBooked ? 'booked' : ($isAssigned ? 'assigned' : 'other'),
                    'enable_online_booking' => $event->enable_online_booking,
                    'link' => $event->link,
                    'link_text' => $event->link_text,
                    'show_link_before_booking' => $event->show_link_before_booking,
                    'schedule_id' => $event->schedule_id,
                    'schedule_name' => $this->getScheduleName($event->schedule_id),
                    'recurrency' => $event->recurrency,
                    'booking_id' => $booking ? $booking->id : null,
                    'booked_at' => $booking && $booking->booked_at ? $booking->booked_at->format('Y-m-d H:i:s') : null,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedEvents
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching all schedules: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching all schedules: ' . $e->getMessage()
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
}
