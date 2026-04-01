<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    /**
     * Display a listing of invoices for gym_id = 1
     * Can filter by member_id if provided in query parameters
     */
    public function index(Request $request)
    {
        try {
            \Log::info('Invoice index called', [
                'request_params' => $request->all(),
                'member_id' => $request->member_id,
                'user_id' => auth()->id()
            ]);
            
            $query = Invoice::byGym(1)
                ->with(['member', 'subscriptionPlan']);
            
            // Filter by member_id if provided
            if ($request->has('member_id') && $request->member_id) {
                $query->where('member_id', $request->member_id);
                \Log::info('Filtering invoices by member_id: ' . $request->member_id);
            }
            
            $invoices = $query->orderBy('created_at', 'desc')->get();
            
            \Log::info('Invoices fetched', [
                'count' => $invoices->count(),
                'member_id_filter' => $request->member_id
            ]);
            
            return response()->json([
                'success' => true,
                'data' => $invoices
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching invoices', [
                'error' => $e->getMessage(),
                'member_id' => $request->member_id
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error fetching invoices',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created invoice
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'member_id' => 'nullable|exists:members,id',
            'subscription_plan_id' => 'nullable|exists:member_plans,id',
            'amount' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'gym_id' => 'nullable|integer',
            'payment_method' => 'nullable|string|max:50',
            'invoice_text' => 'nullable|string|max:255',
            'supplementary_text' => 'nullable|string',
            'sold_by' => 'nullable|string|max:255',
            'is_guest' => 'nullable|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Custom validation: if not guest, member_id is required
        $isGuest = $request->is_guest ?? false;
        if (!$isGuest && !$request->member_id) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => ['member_id' => ['Member is required when not creating a guest invoice.']]
            ], 422);
        }

        try {
            DB::beginTransaction();

            $invoice = Invoice::create([
                'invoice_number' => Invoice::generateInvoiceNumber(),
                'member_id' => $request->member_id,
                'subscription_plan_id' => $request->subscription_plan_id,
                'amount' => $request->amount ?? 0,
                'description' => $request->description,
                'status' => 'pending',
                'due_date' => $request->due_date,
                'gym_id' => $request->gym_id ?? 1,
                'payment_method' => $request->payment_method,
                'invoice_text' => $request->invoice_text,
                'supplementary_text' => $request->supplementary_text,
                'sold_by' => $request->sold_by,
                'is_guest' => $request->is_guest ?? false
            ]);

            DB::commit();

            // Create notifications for invoice creation
            try {
                $invoice->load(['member', 'subscriptionPlan']);
                
                // Get performedByUserId if current user is an admin
                $user = $request->user('api');
                $performedByUserId = null;
                if ($user && isset($user->role_id) && $user->role_id == 1) {
                    $performedByUserId = $user->id;
                }
                
                if ($invoice->member) {
                    \App\Services\NotificationService::invoiceCreated($invoice, $invoice->member, $invoice->gym_id, $performedByUserId);
                }
            } catch (\Exception $e) {
                \Log::error('Failed to create invoice creation notifications: ' . $e->getMessage(), [
                    'invoice_id' => $invoice->id,
                    'trace' => $e->getTraceAsString()
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Invoice created successfully',
                'data' => $invoice
            ], 201);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Error creating invoice',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified invoice
     */
    public function show($id)
    {
        try {
            $invoice = Invoice::byGym(1)
                ->with(['member', 'subscriptionPlan'])
                ->find($id);
            
            if (!$invoice) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invoice not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $invoice
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching invoice',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified invoice
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'sometimes|in:pending,paid,cancelled',
            'paid_date' => 'nullable|date',
            'amount' => 'sometimes|numeric|min:0',
            'description' => 'sometimes|string|max:255',
            'due_date' => 'sometimes|date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            $invoice = Invoice::byGym(1)->find($id);
            
            if (!$invoice) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invoice not found'
                ], 404);
            }

            $updateData = $request->only([
                'status', 'paid_date', 'amount', 'description', 'due_date'
            ]);

            $wasPaid = $invoice->status === 'paid';
            
            // If status is being updated to 'paid' and no paid_date is provided, set it to today
            if (isset($updateData['status']) && $updateData['status'] === 'paid' && !isset($updateData['paid_date'])) {
                $updateData['paid_date'] = now()->toDateString();
            }

            $invoice->update($updateData);
            $invoice->load(['member', 'subscriptionPlan']);

            DB::commit();

            // Create notification if invoice was just paid
            if (!$wasPaid && $invoice->status === 'paid') {
                try {
                    // Get performedByUserId if current user is an admin
                    $user = $request->user('api');
                    $performedByUserId = null;
                    if ($user && isset($user->role_id) && $user->role_id == 1) {
                        $performedByUserId = $user->id;
                    }
                    
                    if ($invoice->member) {
                        \App\Services\NotificationService::invoicePaid($invoice, $invoice->member, $invoice->gym_id, $performedByUserId);
                    }
                } catch (\Exception $e) {
                    \Log::error('Failed to create invoice paid notifications: ' . $e->getMessage(), [
                        'invoice_id' => $invoice->id,
                        'trace' => $e->getTraceAsString()
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Invoice updated successfully',
                'data' => $invoice
            ]);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Error updating invoice',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified invoice
     */
    public function destroy($id)
    {
        try {
            $invoice = Invoice::byGym(1)->find($id);
            
            if (!$invoice) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invoice not found'
                ], 404);
            }

            $invoice->delete();

            return response()->json([
                'success' => true,
                'message' => 'Invoice deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting invoice',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get invoice statistics
     */
    public function statistics()
    {
        try {
            $stats = [
                'total_invoices' => Invoice::byGym(1)->count(),
                'pending_invoices' => Invoice::byGym(1)->pending()->count(),
                'paid_invoices' => Invoice::byGym(1)->paid()->count(),
                'cancelled_invoices' => Invoice::byGym(1)->where('status', 'cancelled')->count(),
                'total_amount' => Invoice::byGym(1)->sum('amount'),
                'paid_amount' => Invoice::byGym(1)->paid()->sum('amount'),
                'pending_amount' => Invoice::byGym(1)->pending()->sum('amount'),
                'overdue_invoices' => Invoice::byGym(1)
                    ->where('due_date', '<', now()->toDateString())
                    ->where('status', 'pending')
                    ->count()
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mark invoice as paid
     */
    public function markAsPaid($id)
    {
        try {
            $invoice = Invoice::byGym(1)->find($id);
            
            if (!$invoice) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invoice not found'
                ], 404);
            }

            $wasPaid = $invoice->status === 'paid';
            
            $invoice->update([
                'status' => 'paid',
                'paid_date' => now()->toDateString()
            ]);
            
            $invoice->load(['member', 'subscriptionPlan']);

            // Create notification if invoice was just paid
            if (!$wasPaid) {
                try {
                    // Get performedByUserId if current user is an admin
                    $user = request()->user('api');
                    $performedByUserId = null;
                    if ($user && isset($user->role_id) && $user->role_id == 1) {
                        $performedByUserId = $user->id;
                    }
                    
                    if ($invoice->member) {
                        \App\Services\NotificationService::invoicePaid($invoice, $invoice->member, $invoice->gym_id, $performedByUserId);
                    }
                } catch (\Exception $e) {
                    \Log::error('Failed to create invoice paid notifications: ' . $e->getMessage(), [
                        'invoice_id' => $invoice->id,
                        'trace' => $e->getTraceAsString()
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Invoice marked as paid successfully',
                'data' => $invoice
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating invoice',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Cancel invoice
     */
    public function cancel($id)
    {
        try {
            $invoice = Invoice::byGym(1)->find($id);
            
            if (!$invoice) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invoice not found'
                ], 404);
            }

            $invoice->update([
                'status' => 'cancelled'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Invoice cancelled successfully',
                'data' => $invoice->load(['member', 'subscriptionPlan'])
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error cancelling invoice',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get invoices for a specific member
     */
    public function getMemberInvoices($memberId)
    {
        try {
            \Log::info('Getting invoices for member', ['member_id' => $memberId]);
            
            $invoices = Invoice::byGym(1)
                ->where('member_id', $memberId)
                ->with(['member', 'subscriptionPlan'])
                ->orderBy('created_at', 'desc')
                ->get();
            
            \Log::info('Member invoices fetched', [
                'member_id' => $memberId,
                'count' => $invoices->count()
            ]);
            
            return response()->json([
                'success' => true,
                'data' => $invoices
            ]);
            
        } catch (\Exception $e) {
            \Log::error('Error fetching member invoices', [
                'member_id' => $memberId,
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error fetching member invoices',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
