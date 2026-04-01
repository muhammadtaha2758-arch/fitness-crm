<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MobileInvoiceController extends Controller
{
    /**
     * Get member's invoices
     */
    public function index(Request $request)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            // Get member record from members table using email
            $member = DB::table('members')
                ->where('email', $user->email)
                ->first();

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member record not found'
                ], 404);
            }
            
            // Get invoices for this member using member_id
            $invoices = Invoice::with(['subscriptionPlan'])
                ->where('member_id', $member->id)
                ->orderBy('created_at', 'desc')
                ->get();

            // Transform invoices for mobile app
            $transformedInvoices = $invoices->map(function ($invoice) {
                return [
                    'id' => $invoice->id,
                    'invoice_number' => $invoice->invoice_number,
                    'amount' => $invoice->amount,
                    'description' => $invoice->description,
                    'status' => $invoice->status,
                    'due_date' => $invoice->due_date ? $invoice->due_date->format('Y-m-d') : null,
                    'paid_date' => $invoice->paid_date ? $invoice->paid_date->format('Y-m-d') : null,
                    'subscription_plan' => $invoice->subscriptionPlan ? [
                        'id' => $invoice->subscriptionPlan->id,
                        'name' => $invoice->subscriptionPlan->name,
                        'monthly_price' => $invoice->subscriptionPlan->monthly_price,
                    ] : null,
                    'created_at' => $invoice->created_at->format('Y-m-d H:i:s'),
                    'updated_at' => $invoice->updated_at->format('Y-m-d H:i:s')
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedInvoices
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get invoices error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get specific invoice details
     */
    public function show(Request $request, $id)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            // Get member record from members table using email
            $member = DB::table('members')
                ->where('email', $user->email)
                ->first();

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member record not found'
                ], 404);
            }
            
            // Get invoice for this member using member_id
            $invoice = Invoice::with(['subscriptionPlan'])
                ->where('id', $id)
                ->where('member_id', $member->id)
                ->first();

            if (!$invoice) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invoice not found or not accessible',
                ], 404);
            }

            $transformedInvoice = [
                'id' => $invoice->id,
                'invoice_number' => $invoice->invoice_number,
                'amount' => $invoice->amount,
                'description' => $invoice->description,
                'status' => $invoice->status,
                'due_date' => $invoice->due_date ? $invoice->due_date->format('Y-m-d') : null,
                'paid_date' => $invoice->paid_date ? $invoice->paid_date->format('Y-m-d') : null,
                'subscription_plan' => $invoice->subscriptionPlan ? [
                    'id' => $invoice->subscriptionPlan->id,
                    'name' => $invoice->subscriptionPlan->name,
                    'monthly_price' => $invoice->subscriptionPlan->monthly_price,
                    'included_features' => $invoice->subscriptionPlan->included_features,
                ] : null,
                'created_at' => $invoice->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $invoice->updated_at->format('Y-m-d H:i:s')
            ];

            return response()->json([
                'success' => true,
                'data' => $transformedInvoice
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get invoice error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get invoice statistics for member
     */
    public function statistics(Request $request)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            // Get member record from members table using email
            $member = DB::table('members')
                ->where('email', $user->email)
                ->first();

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member record not found'
                ], 404);
            }
            
            // Get invoice statistics for this member using member_id
            $totalInvoices = Invoice::where('member_id', $member->id)
                ->count();
                
            $pendingInvoices = Invoice::where('member_id', $member->id)
                ->where('status', 'pending')
                ->count();
                
            $paidInvoices = Invoice::where('member_id', $member->id)
                ->where('status', 'paid')
                ->count();
                
            $overdueInvoices = Invoice::where('member_id', $member->id)
                ->where('status', 'pending')
                ->where('due_date', '<', now()->toDateString())
                ->count();
                
            $totalAmount = Invoice::where('member_id', $member->id)
                ->sum('amount');
                
            $paidAmount = Invoice::where('member_id', $member->id)
                ->where('status', 'paid')
                ->sum('amount');
                
            $pendingAmount = Invoice::where('member_id', $member->id)
                ->where('status', 'pending')
                ->sum('amount');

            $statistics = [
                'total_invoices' => $totalInvoices,
                'pending_invoices' => $pendingInvoices,
                'paid_invoices' => $paidInvoices,
                'overdue_invoices' => $overdueInvoices,
                'total_amount' => $totalAmount,
                'paid_amount' => $paidAmount,
                'pending_amount' => $pendingAmount,
                'due_amount' => $pendingAmount
            ];

            return response()->json([
                'success' => true,
                'data' => $statistics
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get invoice statistics error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get invoices by status
     */
    public function getByStatus(Request $request, $status)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            // Get member record from members table using email
            $member = DB::table('members')
                ->where('email', $user->email)
                ->first();

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member record not found'
                ], 404);
            }
            
            // Validate status
            $validStatuses = ['pending', 'paid', 'overdue', 'cancelled'];
            if (!in_array($status, $validStatuses)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid status. Must be one of: ' . implode(', ', $validStatuses),
                ], 400);
            }
            
            $query = Invoice::with(['subscriptionPlan'])
                ->where('member_id', $member->id);
                
            if ($status === 'overdue') {
                $query->where('status', 'pending')
                      ->where('due_date', '<', now()->toDateString());
            } else {
                $query->where('status', $status);
            }
            
            $invoices = $query->orderBy('created_at', 'desc')->get();

            // Transform invoices for mobile app
            $transformedInvoices = $invoices->map(function ($invoice) {
                return [
                    'id' => $invoice->id,
                    'invoice_number' => $invoice->invoice_number,
                    'amount' => $invoice->amount,
                    'description' => $invoice->description,
                    'status' => $invoice->status,
                    'due_date' => $invoice->due_date ? $invoice->due_date->format('Y-m-d') : null,
                    'paid_date' => $invoice->paid_date ? $invoice->paid_date->format('Y-m-d') : null,
                    'subscription_plan' => $invoice->subscriptionPlan ? [
                        'id' => $invoice->subscriptionPlan->id,
                        'name' => $invoice->subscriptionPlan->name,
                        'monthly_price' => $invoice->subscriptionPlan->monthly_price,
                    ] : null,
                    'created_at' => $invoice->created_at->format('Y-m-d H:i:s'),
                    'updated_at' => $invoice->updated_at->format('Y-m-d H:i:s')
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedInvoices
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get invoices by status error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }
}