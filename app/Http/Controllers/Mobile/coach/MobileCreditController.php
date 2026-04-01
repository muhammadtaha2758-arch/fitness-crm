<?php

namespace App\Http\Controllers\Mobile\coach;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\HandlesApiErrors;
use App\Http\Controllers\Traits\ApiResponse;
use App\Services\MemberCreditService;
use App\Models\Member;
use App\Models\Coach;
use App\Models\CoachAssignment;
use App\Models\Appointment;
use App\Models\ScheduleEvent;
use App\Models\ScheduleEventBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Throwable;

class MobileCreditController extends Controller
{
    use HandlesApiErrors, ApiResponse;

    protected $creditService;

    public function __construct(MemberCreditService $creditService)
    {
        $this->creditService = $creditService;
    }

    /**
     * Get member credit balances (for coach viewing assigned member)
     * GET /api/coachapp/members/{memberId}/credits
     */
    public function getMemberCredits(Request $request, $memberId)
    {
        try {
            $user = $request->user('api');
            $authUser = $request->get('auth_user');
            
            if (!$user && !$authUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $userEmail = $user ? $user->email : ($authUser ? $authUser->email : null);
            if (!$userEmail) {
                return response()->json([
                    'success' => false,
                    'message' => 'User email not found'
                ], 400);
            }

            // Find the coach record
            $coach = Coach::where('email', $userEmail)->first();
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach record not found'
                ], 404);
            }

            // Check if member is assigned to this coach
            $isAssigned = CoachAssignment::where('coach_id', $coach->id)
                ->where('member_id', $memberId)
                ->where('status', 'active')
                ->exists();

            if (!$isAssigned) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not assigned to you'
                ], 403);
            }

            $member = Member::findOrFail($memberId);
            $balances = $this->creditService->getMemberCreditBalance($memberId);

            return response()->json([
                'success' => true,
                'data' => [
                    'member_id' => $member->id,
                    'member_name' => $member->membername,
                    'credits' => $balances
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching member credits: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get member credit transactions
     * GET /api/coachapp/members/{memberId}/credit-transactions
     */
    public function getCreditTransactions(Request $request, $memberId)
    {
        try {
            $user = $request->user('api');
            $authUser = $request->get('auth_user');
            
            if (!$user && !$authUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $userEmail = $user ? $user->email : ($authUser ? $authUser->email : null);
            if (!$userEmail) {
                return response()->json([
                    'success' => false,
                    'message' => 'User email not found'
                ], 400);
            }

            $coach = Coach::where('email', $userEmail)->first();
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach record not found'
                ], 404);
            }

            // Check if member is assigned to this coach
            $isAssigned = CoachAssignment::where('coach_id', $coach->id)
                ->where('member_id', $memberId)
                ->where('status', 'active')
                ->exists();

            if (!$isAssigned) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not assigned to you'
                ], 403);
            }

            $filters = [
                'transaction_type' => $request->input('transaction_type'),
                'service_id' => $request->input('service_id'),
                'date_from' => $request->input('date_from'),
                'date_to' => $request->input('date_to'),
                'limit' => $request->input('limit', 50)
            ];

            $transactions = $this->creditService->getCreditTransactions($memberId, $filters);

            // Format transactions for mobile
            $formattedTransactions = $transactions->map(function ($transaction) {
                $memberCredit = $transaction->memberCredit;

                // Get related appointment details
                $appointmentDetails = null;
                if ($transaction->related_type === 'Appointment' && $transaction->related_id) {
                    try {
                        $appointment = Appointment::with(['coach'])->find($transaction->related_id);
                        if ($appointment) {
                            $appointmentDetails = [
                                'id' => $appointment->id,
                                'date' => $appointment->date ? $appointment->date->format('Y-m-d') : null,
                                'start_time' => $appointment->start_time,
                                'end_time' => $appointment->end_time,
                                'status' => $appointment->status,
                                'coach_name' => $appointment->coach ? 
                                    ($appointment->coach->first_name . ' ' . $appointment->coach->last_name) : null,
                                'workout_id' => $appointment->workout_id,
                            ];
                        }
                    } catch (\Exception $e) {
                        // Continue without details
                    }
                }

                // Get related schedule event booking details
                $scheduleDetails = null;
                if ($transaction->related_type === 'ScheduleEventBooking' && $transaction->related_id) {
                    try {
                        $booking = ScheduleEventBooking::with(['scheduleEvent', 'member'])->find($transaction->related_id);
                        if ($booking && $booking->scheduleEvent) {
                            $scheduleDetails = [
                                'id' => $booking->id,
                                'event_id' => $booking->schedule_event_id,
                                'date' => $booking->scheduleEvent->date ? $booking->scheduleEvent->date->format('Y-m-d') : null,
                                'start_time' => $booking->scheduleEvent->start_time,
                                'end_time' => $booking->scheduleEvent->end_time,
                                'title' => $booking->scheduleEvent->title,
                                'status' => $booking->status,
                            ];
                        }
                    } catch (\Exception $e) {
                        // Continue without details
                    }
                }

                $typeLabels = [
                    'deduction' => 'Deduction',
                    'addition' => 'Addition',
                    'refund' => 'Refund',
                    'adjustment' => 'Adjustment',
                    'initial_allocation' => 'Initial Allocation'
                ];
                $typeLabel = $typeLabels[$transaction->transaction_type] ?? $transaction->transaction_type;

                return [
                    'id' => $transaction->id,
                    'type' => $transaction->transaction_type,
                    'type_label' => $typeLabel,
                    'amount' => (float) $transaction->amount,
                    'amount_display' => abs((float) $transaction->amount),
                    'balance_before' => (float) $transaction->balance_before,
                    'balance_after' => (float) $transaction->balance_after,
                    'description' => $transaction->description,
                    'service_id' => $memberCredit ? $memberCredit->service_id : null,
                    'service_name' => $memberCredit ? $memberCredit->service_name : 'Unknown',
                    'created_at' => $transaction->created_at->toDateTimeString(),
                    'created_at_formatted' => $transaction->created_at->format('Y-m-d H:i:s'),
                    'created_at_date' => $transaction->created_at->format('Y-m-d'),
                    'created_at_time' => $transaction->created_at->format('H:i:s'),
                    'related_type' => $transaction->related_type,
                    'related_id' => $transaction->related_id,
                    'appointment' => $appointmentDetails,
                    'schedule_event' => $scheduleDetails,
                    'performed_by_type' => $transaction->performed_by_type,
                    'performed_by_id' => $transaction->performed_by_id,
                ];
            });

            $summary = [
                'total_transactions' => $transactions->count(),
                'total_deductions' => abs($transactions->where('transaction_type', 'deduction')->sum('amount')),
                'total_additions' => $transactions->where('transaction_type', 'addition')->sum('amount'),
                'total_refunds' => $transactions->where('transaction_type', 'refund')->sum('amount'),
                'total_adjustments' => abs($transactions->where('transaction_type', 'adjustment')->sum('amount')),
            ];

            return response()->json([
                'success' => true,
                'data' => [
                    'transactions' => $formattedTransactions,
                    'summary' => $summary
                ],
                'message' => 'Credit transaction history fetched successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching credit transactions: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Adjust member credits (increment/decrement)
     * POST /api/coachapp/members/{memberId}/adjust-credits
     */
    public function adjustCredits(Request $request, $memberId)
    {
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|integer',
            'amount' => 'required|numeric',
            'reason' => 'required|string|max:500'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = $request->user('api');
            $authUser = $request->get('auth_user');
            
            if (!$user && !$authUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $userEmail = $user ? $user->email : ($authUser ? $authUser->email : null);
            if (!$userEmail) {
                return response()->json([
                    'success' => false,
                    'message' => 'User email not found'
                ], 400);
            }

            $coach = Coach::where('email', $userEmail)->first();
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach record not found'
                ], 404);
            }

            // Check if member is assigned to this coach
            $isAssigned = CoachAssignment::where('coach_id', $coach->id)
                ->where('member_id', $memberId)
                ->where('status', 'active')
                ->exists();

            if (!$isAssigned) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not assigned to you'
                ], 403);
            }

            $member = Member::findOrFail($memberId);
            
            // Use coach ID as adminId for tracking
            $result = $this->creditService->adjustCredits(
                $memberId,
                $request->service_id,
                $request->amount,
                $request->reason,
                $coach->id // Pass coach ID
            );

            if ($result['success']) {
                return response()->json([
                    'success' => true,
                    'message' => $result['message'],
                    'data' => [
                        'transaction_id' => $result['transaction_id'],
                        'remaining_credits' => $result['remaining_credits']
                    ]
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => $result['message']
                ], 400);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error adjusting credits: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get scheduled appointments and classes for a member
     * GET /api/coachapp/members/{memberId}/scheduled-items
     */
    public function getScheduledItems(Request $request, $memberId)
    {
        try {
            $user = $request->user('api');
            $authUser = $request->get('auth_user');
            
            if (!$user && !$authUser) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $userEmail = $user ? $user->email : ($authUser ? $authUser->email : null);
            if (!$userEmail) {
                return response()->json([
                    'success' => false,
                    'message' => 'User email not found'
                ], 400);
            }

            $coach = Coach::where('email', $userEmail)->first();
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach record not found'
                ], 404);
            }

            // Check if member is assigned to this coach
            $isAssigned = CoachAssignment::where('coach_id', $coach->id)
                ->where('member_id', $memberId)
                ->where('status', 'active')
                ->exists();

            if (!$isAssigned) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not assigned to you'
                ], 403);
            }

            // Get future appointments
            $appointments = Appointment::where('member_id', $memberId)
                ->where('date', '>=', now()->toDateString())
                ->where('status', '!=', 'cancelled')
                ->with(['coach', 'member'])
                ->orderBy('date', 'asc')
                ->orderBy('start_time', 'asc')
                ->get()
                ->map(function ($appointment) {
                    return [
                        'id' => $appointment->id,
                        'type' => 'appointment',
                        'date' => $appointment->date->format('Y-m-d'),
                        'start_time' => $appointment->start_time,
                        'end_time' => $appointment->end_time,
                        'status' => $appointment->status,
                        'coach_name' => $appointment->coach ? 
                            ($appointment->coach->first_name . ' ' . $appointment->coach->last_name) : null,
                        'workout_id' => $appointment->workout_id,
                    ];
                });

            // Get future schedule event bookings
            $scheduleBookings = ScheduleEventBooking::where('member_id', $memberId)
                ->where('status', 'booked')
                ->whereHas('scheduleEvent', function ($query) {
                    $query->where('date', '>=', now()->toDateString());
                })
                ->with(['scheduleEvent.coach', 'scheduleEvent.activity'])
                ->get()
                ->map(function ($booking) {
                    $event = $booking->scheduleEvent;
                    return [
                        'id' => $booking->id,
                        'type' => 'schedule_event',
                        'event_id' => $event->id,
                        'date' => $event->date ? $event->date->format('Y-m-d') : null,
                        'start_time' => $event->start_time,
                        'end_time' => $event->end_time,
                        'title' => $event->title,
                        'status' => $booking->status,
                        'coach_name' => $event->coach ? 
                            ($event->coach->first_name . ' ' . $event->coach->last_name) : null,
                        'activity_name' => $event->activity ? $event->activity->name : null,
                    ];
                });

            // Combine and sort by date
            $allItems = $appointments->concat($scheduleBookings)->sortBy(function ($item) {
                return $item['date'] . ' ' . $item['start_time'];
            })->values();

            return response()->json([
                'success' => true,
                'data' => [
                    'items' => $allItems,
                    'appointments_count' => $appointments->count(),
                    'schedule_events_count' => $scheduleBookings->count(),
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching scheduled items: ' . $e->getMessage()
            ], 500);
        }
    }
}
