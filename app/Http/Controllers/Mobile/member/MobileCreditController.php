<?php

namespace App\Http\Controllers\Mobile\member;

use Illuminate\Http\Request;
use App\Services\MemberCreditService;
use App\Models\Member;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class MobileCreditController extends Controller
{
    protected $creditService;

    public function __construct(MemberCreditService $creditService)
    {
        $this->creditService = $creditService;
    }

    /**
     * Get current credit balances for logged-in member
     * GET /api/mobile/member/credits
     */
    public function getCredits(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            // Get member record from members table
            $memberRecord = \DB::table('members')
                ->where('email', $member->email)
                ->first();

            if (!$memberRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member record not found'
                ], 404);
            }

            $balances = $this->creditService->getMemberCreditBalance($memberRecord->id);
            
            // Calculate totals
            $totalCredits = 0;
            $totalUsed = 0;
            $totalRemaining = 0;
            
            foreach ($balances as $balance) {
                $totalCredits += $balance['total_credits'];
                $totalUsed += $balance['used_credits'];
                $totalRemaining += $balance['remaining_credits'];
            }
            
            return response()->json([
                'success' => true,
                'data' => [
                    'credits' => $balances,
                    'summary' => [
                        'total_credits' => $totalCredits,
                        'total_used' => $totalUsed,
                        'total_remaining' => $totalRemaining
                    ]
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching credits: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get credit transaction history for logged-in member
     * GET /api/mobile/credits/history or /api/mobile/credits/transactions
     * 
     * Query Parameters:
     * - transaction_type: Filter by type (deduction, addition, refund, adjustment, initial_allocation)
     * - service_id: Filter by service ID
     * - date_from: Filter transactions from date (Y-m-d)
     * - date_to: Filter transactions to date (Y-m-d)
     * - limit: Limit number of results (default: 50)
     */
    public function getCreditTransactions(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            // Get member record from members table
            $memberRecord = \DB::table('members')
                ->where('email', $member->email)
                ->first();

            if (!$memberRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member record not found'
                ], 404);
            }

            $filters = [
                'transaction_type' => $request->input('transaction_type'),
                'service_id' => $request->input('service_id'),
                'date_from' => $request->input('date_from'),
                'date_to' => $request->input('date_to'),
                'limit' => $request->input('limit', 50)
            ];
            
            $transactions = $this->creditService->getCreditTransactions($memberRecord->id, $filters);
            
            // Format transactions for mobile
            $formattedTransactions = $transactions->map(function ($transaction) {
                $memberCredit = $transaction->memberCredit;
                
                // Get related appointment details if transaction is for an appointment
                $appointmentDetails = null;
                if ($transaction->related_type === 'Appointment' && $transaction->related_id) {
                    try {
                        $appointment = \App\Models\Appointment::with(['coach'])
                            ->find($transaction->related_id);
                        if ($appointment) {
                            $appointmentDetails = [
                                'id' => $appointment->id,
                                'date' => $appointment->date ? $appointment->date->format('Y-m-d') : null,
                                'start_time' => $appointment->start_time,
                                'end_time' => $appointment->end_time,
                                'status' => $appointment->status,
                                'coach_name' => $appointment->coach ? 
                                    ($appointment->coach->first_name . ' ' . $appointment->coach->last_name) : 
                                    null,
                                'workout_id' => $appointment->workout_id,
                            ];
                        }
                    } catch (\Exception $e) {
                        // If appointment not found or error, continue without details
                    }
                }
                
                // Format transaction type for display
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
                    'amount_display' => abs((float) $transaction->amount), // Positive amount for display
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
                    'appointment' => $appointmentDetails, // Include appointment details if available
                    'performed_by_type' => $transaction->performed_by_type,
                    'performed_by_id' => $transaction->performed_by_id,
                ];
            });
            
            // Calculate summary statistics
            // Note: Deductions are stored as negative amounts, so we use abs() for display
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
     * Check if member has sufficient credits for an activity
     * GET /api/mobile/member/check-credits
     */
    public function checkSufficientCredits(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'credit_cost' => 'required|numeric|min:0',
            'service_id' => 'nullable|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $member = $request->get('auth_member');
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            // Get member record from members table
            $memberRecord = \DB::table('members')
                ->where('email', $member->email)
                ->first();

            if (!$memberRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member record not found'
                ], 404);
            }
            
            $result = $this->creditService->checkSufficientCredits(
                $memberRecord->id,
                $request->credit_cost,
                $request->input('service_id')
            );

            return response()->json([
                'success' => true,
                'data' => $result
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error checking credits: ' . $e->getMessage()
            ], 500);
        }
    }
}

