<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MemberCreditService;
use App\Models\Member;
use App\Models\MemberCredit;
use App\Models\MemberCreditTransaction;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class MemberCreditController extends Controller
{
    protected $creditService;

    public function __construct(MemberCreditService $creditService)
    {
        $this->creditService = $creditService;
    }

    /**
     * Get member credit balances
     * GET /api/members/{id}/credits
     */
    public function getMemberCredits($id)
    {
        try {
            $member = Member::findOrFail($id);
            
            $balances = $this->creditService->getMemberCreditBalance($id);
            
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
     * GET /api/members/{id}/credit-transactions
     */
    public function getCreditTransactions(Request $request, $id)
    {
        try {
            $member = Member::findOrFail($id);
            
            $filters = [
                'transaction_type' => $request->input('transaction_type'),
                'service_id' => $request->input('service_id'),
                'date_from' => $request->input('date_from'),
                'date_to' => $request->input('date_to'),
                'limit' => $request->input('limit', 50)
            ];
            
            $transactions = $this->creditService->getCreditTransactions($id, $filters);
            
            return response()->json([
                'success' => true,
                'data' => $transactions
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching credit transactions: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Admin manual credit adjustment
     * POST /api/members/{id}/adjust-credits
     */
    public function adjustCredits(Request $request, $id)
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
            $member = Member::findOrFail($id);
            $adminId = Auth::id();
            
            $result = $this->creditService->adjustCredits(
                $id,
                $request->service_id,
                $request->amount,
                $request->reason,
                $adminId
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
     * Refund credits for a transaction
     * POST /api/members/{id}/refund-credits/{transactionId}
     */
    public function refundCredits(Request $request, $id, $transactionId)
    {
        $validator = Validator::make($request->all(), [
            'reason' => 'nullable|string|max:500'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $member = Member::findOrFail($id);
            
            // Verify transaction belongs to member
            $transaction = MemberCreditTransaction::where('id', $transactionId)
                ->where('member_id', $id)
                ->first();

            if (!$transaction) {
                return response()->json([
                    'success' => false,
                    'message' => 'Transaction not found or does not belong to this member'
                ], 404);
            }
            
            $result = $this->creditService->refundCredits(
                $transactionId,
                $request->input('reason')
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
                'message' => 'Error refunding credits: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Check if member has sufficient credits
     * GET /api/members/{id}/check-credits
     */
    public function checkSufficientCredits(Request $request, $id)
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
            $member = Member::findOrFail($id);
            
            $result = $this->creditService->checkSufficientCredits(
                $id,
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

