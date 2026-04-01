<?php

namespace App\Http\Controllers;

use App\Services\PaysafeCardService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class PaysafeCardController extends Controller
{
    protected $paysafeCardService;

    public function __construct()
    {
        // We'll initialize the service with gym_id in each method
    }

    public function createPayment(Request $request)
    {
        try {
            $request->validate([
                'customer_id' => 'required|integer',
                'amount' => 'required|numeric|min:0.01',
                'currency' => 'required|string|size:3',
                'description' => 'nullable|string|max:255'
            ]);

            // Get the current user's gym_id
            $gymId = $request->user('api')->gym_id ?? 1;
            
            // Initialize service with gym configuration
            $this->paysafeCardService = new PaysafeCardService($gymId);

            // Get customer data
            $customer = DB::table('clients')->where('id', $request->customer_id)->first();
            if (!$customer) {
                return response()->json(['error' => 'Customer not found'], 404);
            }

            // Create payment in PaysafeCard
            $paymentData = $this->paysafeCardService->createPayment(
                $request->amount,
                $request->currency,
                [
                    'id' => $customer->id,
                    'firstname' => $customer->firstname,
                    'lastname' => $customer->lastname,
                    'email' => $customer->email,
                    'phone' => $customer->phone ?? ''
                ],
                'payment_' . time()
            );

            // Store payment in database
            $payment = DB::table('payments')->insert([
                'payment_method' => 'paysafecard',
                'amount' => $request->amount,
                'currency' => $request->currency,
                'customer_id' => $request->customer_id,
                'description' => $request->description,
                'paysafecard_payment_id' => $paymentData['id'],
                'status' => 'pending',
                'payment_data' => json_encode($paymentData),
                'created_at' => now(),
                'updated_at' => now()
            ]);

            Log::info('PaysafeCard payment created', [
                'payment_id' => $paymentData['id'],
                'customer_id' => $request->customer_id,
                'amount' => $request->amount,
                'currency' => $request->currency
            ]);

            return response()->json([
                'success' => true,
                'payment_id' => $paymentData['id'],
                'redirect_url' => $paymentData['redirect']['auth_url'],
                'status' => $paymentData['status']
            ]);

        } catch (\Exception $e) {
            Log::error('PaysafeCard payment creation error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function success(Request $request)
    {
        try {
            $paymentId = $request->query('payment_id');
            
            if (!$paymentId) {
                return response()->json(['error' => 'Payment ID not provided'], 400);
            }

            // Get the current user's gym_id
            $gymId = $request->user('api')->gym_id ?? 1;
            
            // Initialize service with gym configuration
            $this->paysafeCardService = new PaysafeCardService($gymId);

            // Get payment status from PaysafeCard
            $paymentStatus = $this->paysafeCardService->getPaymentStatus($paymentId);

            // Update payment in database
            DB::table('payments')
                ->where('paysafecard_payment_id', $paymentId)
                ->update([
                    'status' => $paymentStatus['status'],
                    'payment_data' => json_encode($paymentStatus),
                    'updated_at' => now()
                ]);

            Log::info('PaysafeCard payment success', [
                'payment_id' => $paymentId,
                'status' => $paymentStatus['status']
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Payment processed successfully',
                'status' => $paymentStatus['status']
            ]);

        } catch (\Exception $e) {
            Log::error('PaysafeCard payment success error', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function failure(Request $request)
    {
        try {
            $paymentId = $request->query('payment_id');
            
            if (!$paymentId) {
                return response()->json(['error' => 'Payment ID not provided'], 400);
            }

            // Update payment status to failed
            DB::table('payments')
                ->where('paysafecard_payment_id', $paymentId)
                ->update([
                    'status' => 'failed',
                    'updated_at' => now()
                ]);

            Log::info('PaysafeCard payment failed', [
                'payment_id' => $paymentId
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Payment failed'
            ]);

        } catch (\Exception $e) {
            Log::error('PaysafeCard payment failure error', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function webhook(Request $request)
    {
        try {
            $payload = $request->all();
            $signature = $request->header('X-PaysafeCard-Signature');

            // Get the payment ID from the webhook payload
            $paymentId = $payload['payment_id'] ?? null;
            
            if (!$paymentId) {
                Log::error('PaysafeCard webhook: No payment ID in payload', $payload);
                return response()->json(['error' => 'Invalid webhook payload'], 400);
            }

            // Get payment from database to find gym_id
            $payment = DB::table('payments')
                ->where('paysafecard_payment_id', $paymentId)
                ->first();

            if (!$payment) {
                Log::error('PaysafeCard webhook: Payment not found', ['payment_id' => $paymentId]);
                return response()->json(['error' => 'Payment not found'], 404);
            }

            // Get customer to find gym_id
            $customer = DB::table('clients')->where('id', $payment->customer_id)->first();
            $gymId = $customer->gym_id ?? 1;

            // Initialize service with gym configuration
            $this->paysafeCardService = new PaysafeCardService($gymId);

            // Validate webhook signature
            if (!$this->paysafeCardService->validateWebhook($payload, $signature)) {
                Log::error('PaysafeCard webhook: Invalid signature', [
                    'payment_id' => $paymentId,
                    'signature' => $signature
                ]);
                return response()->json(['error' => 'Invalid signature'], 400);
            }

            // Update payment status
            DB::table('payments')
                ->where('paysafecard_payment_id', $paymentId)
                ->update([
                    'status' => $payload['status'],
                    'payment_data' => json_encode($payload),
                    'updated_at' => now()
                ]);

            Log::info('PaysafeCard webhook processed', [
                'payment_id' => $paymentId,
                'status' => $payload['status']
            ]);

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            Log::error('PaysafeCard webhook error', [
                'error' => $e->getMessage(),
                'payload' => $request->all()
            ]);

            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getPaymentStatus(Request $request, $paymentId)
    {
        try {
            // Get payment from database to find gym_id
            $payment = DB::table('payments')
                ->where('paysafecard_payment_id', $paymentId)
                ->first();

            if (!$payment) {
                return response()->json(['error' => 'Payment not found'], 404);
            }

            // Get customer to find gym_id
            $customer = DB::table('clients')->where('id', $payment->customer_id)->first();
            $gymId = $customer->gym_id ?? 1;

            // Initialize service with gym configuration
            $this->paysafeCardService = new PaysafeCardService($gymId);

            // Get payment status from PaysafeCard
            $paymentStatus = $this->paysafeCardService->getPaymentStatus($paymentId);

            return response()->json([
                'success' => true,
                'payment' => $payment,
                'paysafecard_status' => $paymentStatus
            ]);

        } catch (\Exception $e) {
            Log::error('PaysafeCard get payment status error', [
                'payment_id' => $paymentId,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getCurrencies()
    {
        try {
            // Get the current user's gym_id
            $gymId = request()->user('api')->gym_id ?? 1;
            
            // Initialize service with gym configuration
            $this->paysafeCardService = new PaysafeCardService($gymId);

            $currencies = $this->paysafeCardService->getAvailableCurrencies();

            return response()->json([
                'success' => true,
                'currencies' => $currencies
            ]);

        } catch (\Exception $e) {
            Log::error('PaysafeCard get currencies error', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 