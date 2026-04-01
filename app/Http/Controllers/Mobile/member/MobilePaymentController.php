<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Gyms;
use App\Services\PaysafeCardService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Stripe\PaymentMethod;
use Stripe\Exception\ApiErrorException;

class MobilePaymentController extends Controller
{
    /**
     * Get gym and verify payment gateway configuration
     */
    private function getGym($gymId)
    {
        $gym = Gyms::find($gymId);
        
        if (!$gym) {
            throw new \Exception('Gym not found');
        }
        
        return $gym;
    }

    /**
     * Initialize Stripe with secret key from gym settings
     */
    private function initializeStripe($gymId)
    {
        $gym = $this->getGym($gymId);
        
        // Check if Stripe is the active payment gateway
        if ($gym->active_payment_gateway !== 'stripe') {
            throw new \Exception('Stripe is not the active payment gateway for this gym');
        }
        
        if (!$gym->stripe_secret) {
            throw new \Exception('Stripe secret key is not configured for this gym');
        }
        
        // Set Stripe API key from gym settings
        Stripe::setApiKey($gym->stripe_secret);
        
        return $gym;
    }

    /**
     * Initialize PaysafeCard service with gym settings
     */
    private function initializePaysafeCard($gymId)
    {
        $gym = $this->getGym($gymId);
        
        // Check if PaysafeCard is the active payment gateway
        if ($gym->active_payment_gateway !== 'paysafecard') {
            throw new \Exception('PaysafeCard is not the active payment gateway for this gym');
        }
        
        // Initialize PaysafeCard service with gym configuration
        $paysafeCardService = new PaysafeCardService($gymId);
        
        if (!$paysafeCardService->isConfigured()) {
            throw new \Exception('PaysafeCard is not properly configured for this gym');
        }
        
        return ['gym' => $gym, 'service' => $paysafeCardService];
    }

    /**
     * Process payment with PaymentMethod ID (created on client side)
     * POST /mobile/payments/process-payment
     */
    public function processPayment(Request $request)
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

            // Get gym to check active payment gateway
            try {
                $gym = $this->getGym($member->gym_id);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage()
                ], 400);
            }

            // Route to appropriate payment gateway
            if ($gym->active_payment_gateway === 'paysafecard') {
                return $this->processPaysafeCardPayment($request, $member, $gym);
            } elseif ($gym->active_payment_gateway === 'stripe') {
                return $this->processStripePayment($request, $member, $gym);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'No payment gateway is configured for this gym'
                ], 400);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Process payment error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Process Stripe payment
     */
    private function processStripePayment(Request $request, $member, $gym)
    {
        // Initialize Stripe with gym's secret key
        try {
            $this->initializeStripe($member->gym_id);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }

        // Validate request - accept either payment_method_id or card details
        $request->validate([
            'invoice_id' => 'required|integer|exists:invoices,id',
            'payment_method_id' => 'required_without_all:card_number,exp_month,exp_year,cvc|string',
            'card_number' => 'required_without:payment_method_id|string|regex:/^\d{13,19}$/',
            'exp_month' => 'required_without:payment_method_id|integer|between:1,12',
            'exp_year' => 'required_without:payment_method_id|integer|min:2024',
            'cvc' => 'required_without:payment_method_id|string|regex:/^\d{3,4}$/',
            'card_holder_name' => 'nullable|string|max:255',
        ]);

            $invoiceId = $request->input('invoice_id');
            $paymentMethodId = $request->input('payment_method_id');

            // Get invoice and verify ownership
            $invoice = Invoice::where('id', $invoiceId)
                ->where('member_id', $member->id)
                ->first();

            if (!$invoice) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invoice not found or not accessible'
                ], 404);
            }

            // Check if invoice is already paid
            if ($invoice->status === 'paid') {
                return response()->json([
                    'success' => false,
                    'message' => 'This invoice has already been paid'
                ], 400);
            }

            // Convert amount to cents (Stripe uses smallest currency unit)
            $amountInCents = (int)($invoice->amount * 100);

            try {
                // If payment_method_id is provided, use it directly
                // Otherwise, create PaymentMethod from card details (requires special Stripe permissions)
                if ($paymentMethodId) {
                    // Use existing PaymentMethod created on client side
                    $paymentMethod = PaymentMethod::retrieve($paymentMethodId);
                } else {
                    // Create PaymentMethod from card details (only works if raw card data APIs are enabled)
                    $cardNumber = $request->input('card_number');
                    $expMonth = $request->input('exp_month');
                    $expYear = $request->input('exp_year');
                    $cvc = $request->input('cvc');
                    $cardHolderName = $request->input('card_holder_name', '');

                    $paymentMethod = PaymentMethod::create([
                        'type' => 'card',
                        'card' => [
                            'number' => $cardNumber,
                            'exp_month' => $expMonth,
                            'exp_year' => $expYear,
                            'cvc' => $cvc,
                        ],
                        'billing_details' => [
                            'name' => $cardHolderName,
                        ],
                    ]);
                }

                // Create and confirm PaymentIntent
                $paymentIntent = PaymentIntent::create([
                    'amount' => $amountInCents,
                    'currency' => 'usd',
                    'payment_method' => $paymentMethod->id,
                    'confirmation_method' => 'manual',
                    'confirm' => true,
                    'return_url' => config('app.url') . '/payment/return',
                    'metadata' => [
                        'invoice_id' => $invoice->id,
                        'invoice_number' => $invoice->invoice_number,
                        'member_id' => $member->id,
                        'member_email' => $member->email,
                    ],
                    'description' => "Payment for Invoice #{$invoice->invoice_number}",
                ]);

                // Handle payment intent status
                if ($paymentIntent->status === 'succeeded') {
                    // Payment succeeded - update invoice
                    $invoice->status = 'paid';
                    $invoice->paid_date = now();
                    $invoice->save();

                    // Save payment record to payments table
                    // Check if payment record already exists to avoid duplicates
                    $payment = Payment::where('stripe_payment_id', $paymentIntent->id)->first();
                    
                    if (!$payment) {
                        $payment = Payment::create([
                            'invoice_id' => $invoice->id,
                            'member_id' => $member->id,
                            'stripe_payment_id' => $paymentIntent->id,
                            'amount' => $invoice->amount,
                            'status' => 'succeeded',
                            'payment_method' => $paymentMethod->type ?? 'card',
                            'metadata' => [
                                'invoice_number' => $invoice->invoice_number,
                                'payment_method_id' => $paymentMethod->id ?? null,
                                'currency' => $paymentIntent->currency ?? 'usd',
                                'amount_in_cents' => $amountInCents,
                            ],
                        ]);
                    }

                    return response()->json([
                        'success' => true,
                        'message' => 'Payment processed successfully',
                        'data' => [
                            'invoice_id' => $invoice->id,
                            'invoice_number' => $invoice->invoice_number,
                            'status' => $invoice->status,
                            'paid_date' => $invoice->paid_date->format('Y-m-d H:i:s'),
                            'payment_intent_id' => $paymentIntent->id,
                            'payment_id' => $payment->id,
                            'payment_status' => 'succeeded',
                        ]
                    ], 200);

                } elseif ($paymentIntent->status === 'requires_action') {
                    // Payment requires additional authentication (3D Secure)
                    return response()->json([
                        'success' => true,
                        'requires_action' => true,
                        'client_secret' => $paymentIntent->client_secret,
                        'payment_intent_id' => $paymentIntent->id,
                        'message' => 'Payment requires additional authentication',
                        'payment_status' => 'requires_action',
                    ], 200);

                } elseif ($paymentIntent->status === 'processing') {
                    // Payment is processing
                    return response()->json([
                        'success' => true,
                        'message' => 'Payment is being processed',
                        'payment_intent_id' => $paymentIntent->id,
                        'payment_status' => 'processing',
                    ], 200);

                } else {
                    // Payment failed or requires payment method
                    $errorMessage = $paymentIntent->last_payment_error->message ?? 'Payment could not be processed';
                    
                    return response()->json([
                        'success' => false,
                        'message' => $errorMessage,
                        'payment_status' => $paymentIntent->status,
                    ], 400);
                }

        } catch (ApiErrorException $e) {
            Log::error('Stripe payment processing error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Payment processing error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Process PaysafeCard payment
     */
    private function processPaysafeCardPayment(Request $request, $member, $gym)
    {
        // Initialize PaysafeCard service
        try {
            $paysafeConfig = $this->initializePaysafeCard($member->gym_id);
            $paysafeCardService = $paysafeConfig['service'];
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }

        // Validate request
        $request->validate([
            'invoice_id' => 'required|integer|exists:invoices,id',
            'currency' => 'nullable|string|size:3',
        ]);

        $invoiceId = $request->input('invoice_id');
        $currency = $request->input('currency', 'EUR'); // Default to EUR for PaysafeCard

        // Get invoice and verify ownership
        $invoice = Invoice::where('id', $invoiceId)
            ->where('member_id', $member->id)
            ->first();

        if (!$invoice) {
            return response()->json([
                'success' => false,
                'message' => 'Invoice not found or not accessible'
            ], 404);
        }

        // Check if invoice is already paid
        if ($invoice->status === 'paid') {
            return response()->json([
                'success' => false,
                'message' => 'This invoice has already been paid'
            ], 400);
        }

        try {
            // Create payment in PaysafeCard
            $paymentData = $paysafeCardService->createPayment(
                $invoice->amount,
                $currency,
                [
                    'id' => $member->id,
                    'firstname' => $member->firstname ?? '',
                    'lastname' => $member->lastname ?? '',
                    'email' => $member->email ?? '',
                    'phone' => $member->phone ?? $member->mobile_phone ?? '',
                ],
                'invoice_' . $invoice->id . '_' . time()
            );

            // Save payment record to payments table
            $payment = Payment::create([
                'invoice_id' => $invoice->id,
                'member_id' => $member->id,
                'stripe_payment_id' => $paymentData['id'], // Using stripe_payment_id field to store PaysafeCard payment ID
                'amount' => $invoice->amount,
                'status' => 'pending', // PaysafeCard payments start as pending
                'payment_method' => 'paysafecard',
                'metadata' => [
                    'invoice_number' => $invoice->invoice_number,
                    'currency' => $currency,
                    'paysafecard_payment_id' => $paymentData['id'],
                    'redirect_url' => $paymentData['redirect']['auth_url'] ?? null,
                ],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Payment created successfully. Please complete payment on PaysafeCard.',
                'data' => [
                    'invoice_id' => $invoice->id,
                    'invoice_number' => $invoice->invoice_number,
                    'payment_id' => $payment->id,
                    'paysafecard_payment_id' => $paymentData['id'],
                    'redirect_url' => $paymentData['redirect']['auth_url'] ?? null,
                    'status' => $paymentData['status'] ?? 'pending',
                    'payment_status' => 'pending',
                ]
            ], 200);

        } catch (\Exception $e) {
            Log::error('PaysafeCard payment processing error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Payment processing error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Create a PaymentIntent for an invoice (for client-side confirmation)
     * Supports both Stripe and PaysafeCard
     * POST /mobile/payments/create-payment-intent
     */
    public function createPaymentIntent(Request $request)
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

            // Get gym to check active payment gateway
            try {
                $gym = $this->getGym($member->gym_id);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage()
                ], 400);
            }

            // Route to appropriate payment gateway
            if ($gym->active_payment_gateway === 'paysafecard') {
                return $this->createPaysafeCardPayment($request, $member, $gym);
            } elseif ($gym->active_payment_gateway === 'stripe') {
                return $this->createStripePaymentIntent($request, $member, $gym);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'No payment gateway is configured for this gym'
                ], 400);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Create payment intent error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Create Stripe PaymentIntent
     */
    private function createStripePaymentIntent(Request $request, $member, $gym)
    {
        // Initialize Stripe with gym's secret key
        try {
            $this->initializeStripe($member->gym_id);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }

        // Validate request
        $request->validate([
            'invoice_id' => 'required|integer|exists:invoices,id',
        ]);

        $invoiceId = $request->input('invoice_id');

        // Get invoice and verify ownership
        $invoice = Invoice::where('id', $invoiceId)
            ->where('member_id', $member->id)
            ->first();

        if (!$invoice) {
            return response()->json([
                'success' => false,
                'message' => 'Invoice not found or not accessible'
            ], 404);
        }

        // Check if invoice is already paid
        if ($invoice->status === 'paid') {
            return response()->json([
                'success' => false,
                'message' => 'This invoice has already been paid'
            ], 400);
        }

        // Convert amount to cents (Stripe uses smallest currency unit)
        $amountInCents = (int)($invoice->amount * 100);

        // Create PaymentIntent
        try {
            $paymentIntent = PaymentIntent::create([
                'amount' => $amountInCents,
                'currency' => 'usd', // Change to your currency if different
                'metadata' => [
                    'invoice_id' => $invoice->id,
                    'invoice_number' => $invoice->invoice_number,
                    'member_id' => $member->id,
                    'member_email' => $member->email,
                ],
                'description' => "Payment for Invoice #{$invoice->invoice_number}",
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
            ]);

            return response()->json([
                'success' => true,
                'clientSecret' => $paymentIntent->client_secret,
                'payment_intent_id' => $paymentIntent->id,
            ], 200);

        } catch (ApiErrorException $e) {
            Log::error('Stripe PaymentIntent creation error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Payment processing error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Create PaysafeCard payment
     */
    private function createPaysafeCardPayment(Request $request, $member, $gym)
    {
        // Initialize PaysafeCard service
        try {
            $paysafeConfig = $this->initializePaysafeCard($member->gym_id);
            $paysafeCardService = $paysafeConfig['service'];
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }

        // Validate request
        $request->validate([
            'invoice_id' => 'required|integer|exists:invoices,id',
            'currency' => 'nullable|string|size:3',
        ]);

        $invoiceId = $request->input('invoice_id');
        $currency = $request->input('currency', 'EUR'); // Default to EUR for PaysafeCard

        // Get invoice and verify ownership
        $invoice = Invoice::where('id', $invoiceId)
            ->where('member_id', $member->id)
            ->first();

        if (!$invoice) {
            return response()->json([
                'success' => false,
                'message' => 'Invoice not found or not accessible'
            ], 404);
        }

        // Check if invoice is already paid
        if ($invoice->status === 'paid') {
            return response()->json([
                'success' => false,
                'message' => 'This invoice has already been paid'
            ], 400);
        }

        try {
            // Create payment in PaysafeCard
            $paymentData = $paysafeCardService->createPayment(
                $invoice->amount,
                $currency,
                [
                    'id' => $member->id,
                    'firstname' => $member->firstname ?? '',
                    'lastname' => $member->lastname ?? '',
                    'email' => $member->email ?? '',
                    'phone' => $member->phone ?? $member->mobile_phone ?? '',
                ],
                'invoice_' . $invoice->id . '_' . time()
            );

            // Save payment record to payments table
            $payment = Payment::create([
                'invoice_id' => $invoice->id,
                'member_id' => $member->id,
                'stripe_payment_id' => $paymentData['id'], // Using stripe_payment_id field to store PaysafeCard payment ID
                'amount' => $invoice->amount,
                'status' => 'pending', // PaysafeCard payments start as pending
                'payment_method' => 'paysafecard',
                'metadata' => [
                    'invoice_number' => $invoice->invoice_number,
                    'currency' => $currency,
                    'paysafecard_payment_id' => $paymentData['id'],
                    'redirect_url' => $paymentData['redirect']['auth_url'] ?? null,
                ],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Payment created successfully. Please complete payment on PaysafeCard.',
                'data' => [
                    'invoice_id' => $invoice->id,
                    'invoice_number' => $invoice->invoice_number,
                    'payment_id' => $payment->id,
                    'paysafecard_payment_id' => $paymentData['id'],
                    'redirect_url' => $paymentData['redirect']['auth_url'] ?? null,
                    'status' => $paymentData['status'] ?? 'pending',
                ]
            ], 200);

        } catch (\Exception $e) {
            Log::error('PaysafeCard payment creation error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Payment processing error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Confirm payment completion and update invoice
     * Supports both Stripe and PaysafeCard
     * POST /mobile/payments/confirm-payment
     */
    public function confirmPayment(Request $request)
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

            // Get gym to check active payment gateway
            try {
                $gym = $this->getGym($member->gym_id);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage()
                ], 400);
            }

            // Route to appropriate payment gateway
            if ($gym->active_payment_gateway === 'paysafecard') {
                return $this->confirmPaysafeCardPayment($request, $member, $gym);
            } elseif ($gym->active_payment_gateway === 'stripe') {
                return $this->confirmStripePayment($request, $member, $gym);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'No payment gateway is configured for this gym'
                ], 400);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Confirm payment error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Confirm Stripe payment
     */
    private function confirmStripePayment(Request $request, $member, $gym)
    {
        // Initialize Stripe with gym's secret key
        try {
            $this->initializeStripe($member->gym_id);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }

        // Validate request
        $request->validate([
            'payment_intent_id' => 'required|string',
            'invoice_id' => 'required|integer|exists:invoices,id',
        ]);

        $paymentIntentId = $request->input('payment_intent_id');
        $invoiceId = $request->input('invoice_id');

        // Get invoice and verify ownership
        $invoice = Invoice::where('id', $invoiceId)
            ->where('member_id', $member->id)
            ->first();

        if (!$invoice) {
            return response()->json([
                'success' => false,
                'message' => 'Invoice not found or not accessible'
            ], 404);
        }

        // Retrieve PaymentIntent from Stripe
        try {
            $paymentIntent = PaymentIntent::retrieve($paymentIntentId);

            // Verify the payment intent belongs to this invoice
            if ($paymentIntent->metadata->invoice_id != $invoiceId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Payment intent does not match invoice'
                ], 400);
            }

            // Check payment status
            if ($paymentIntent->status === 'succeeded') {
                // Update invoice status
                $invoice->status = 'paid';
                $invoice->paid_date = now();
                $invoice->save();

                // Save payment record to payments table
                // Check if payment record already exists to avoid duplicates
                $payment = Payment::where('stripe_payment_id', $paymentIntent->id)->first();
                
                if (!$payment) {
                    $payment = Payment::create([
                        'invoice_id' => $invoice->id,
                        'member_id' => $member->id,
                        'stripe_payment_id' => $paymentIntent->id,
                        'amount' => $invoice->amount,
                        'status' => 'succeeded',
                        'payment_method' => $paymentIntent->payment_method_types[0] ?? 'card',
                        'metadata' => [
                            'invoice_number' => $invoice->invoice_number,
                            'currency' => $paymentIntent->currency ?? 'usd',
                            'amount_in_cents' => $paymentIntent->amount ?? null,
                        ],
                    ]);
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Payment confirmed successfully',
                    'data' => [
                        'invoice_id' => $invoice->id,
                        'invoice_number' => $invoice->invoice_number,
                        'status' => $invoice->status,
                        'paid_date' => $invoice->paid_date->format('Y-m-d H:i:s'),
                        'payment_intent_id' => $paymentIntent->id,
                        'payment_id' => $payment->id,
                    ]
                ], 200);

            } elseif ($paymentIntent->status === 'processing') {
                return response()->json([
                    'success' => true,
                    'message' => 'Payment is being processed',
                    'status' => 'processing',
                ], 200);

            } elseif ($paymentIntent->status === 'requires_payment_method') {
                return response()->json([
                    'success' => false,
                    'message' => 'Payment requires a valid payment method',
                ], 400);

            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Payment status: ' . $paymentIntent->status,
                ], 400);
            }

        } catch (ApiErrorException $e) {
            Log::error('Stripe PaymentIntent retrieval error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Payment verification error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Confirm PaysafeCard payment
     */
    private function confirmPaysafeCardPayment(Request $request, $member, $gym)
    {
        // Initialize PaysafeCard service
        try {
            $paysafeConfig = $this->initializePaysafeCard($member->gym_id);
            $paysafeCardService = $paysafeConfig['service'];
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }

        // Validate request
        $request->validate([
            'paysafecard_payment_id' => 'required|string',
            'invoice_id' => 'required|integer|exists:invoices,id',
        ]);

        $paysafecardPaymentId = $request->input('paysafecard_payment_id');
        $invoiceId = $request->input('invoice_id');

        // Get invoice and verify ownership
        $invoice = Invoice::where('id', $invoiceId)
            ->where('member_id', $member->id)
            ->first();

        if (!$invoice) {
            return response()->json([
                'success' => false,
                'message' => 'Invoice not found or not accessible'
            ], 404);
        }

        try {
            // Get payment status from PaysafeCard
            $paymentStatus = $paysafeCardService->getPaymentStatus($paysafecardPaymentId);

            // Check payment status
            if ($paymentStatus['status'] === 'SUCCESS' || $paymentStatus['status'] === 'AUTHORIZED') {
                // Update invoice status
                $invoice->status = 'paid';
                $invoice->paid_date = now();
                $invoice->save();

                // Update payment record
                $payment = Payment::where('stripe_payment_id', $paysafecardPaymentId)->first();
                
                if ($payment) {
                    $payment->status = 'succeeded';
                    $payment->save();
                } else {
                    $payment = Payment::create([
                        'invoice_id' => $invoice->id,
                        'member_id' => $member->id,
                        'stripe_payment_id' => $paysafecardPaymentId,
                        'amount' => $invoice->amount,
                        'status' => 'succeeded',
                        'payment_method' => 'paysafecard',
                        'metadata' => [
                            'invoice_number' => $invoice->invoice_number,
                            'currency' => $paymentStatus['currency'] ?? 'EUR',
                            'paysafecard_payment_id' => $paysafecardPaymentId,
                        ],
                    ]);
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Payment confirmed successfully',
                    'data' => [
                        'invoice_id' => $invoice->id,
                        'invoice_number' => $invoice->invoice_number,
                        'status' => $invoice->status,
                        'paid_date' => $invoice->paid_date->format('Y-m-d H:i:s'),
                        'paysafecard_payment_id' => $paysafecardPaymentId,
                        'payment_id' => $payment->id,
                    ]
                ], 200);

            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Payment status: ' . ($paymentStatus['status'] ?? 'unknown'),
                    'status' => $paymentStatus['status'] ?? 'unknown',
                ], 400);
            }

        } catch (\Exception $e) {
            Log::error('PaysafeCard payment confirmation error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Payment verification error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Handle Stripe webhook for payment events
     * POST /mobile/payments/webhook
     * 
     * Note: This endpoint should be publicly accessible (without auth middleware)
     * and should verify the webhook signature from Stripe
     */
    public function handleWebhook(Request $request)
    {
        try {
            $payload = $request->getContent();
            $sigHeader = $request->header('Stripe-Signature');
            $endpointSecret = config('services.stripe.webhook_secret');

            // Verify webhook signature
            $event = null;
            try {
                $event = \Stripe\Webhook::constructEvent(
                    $payload,
                    $sigHeader,
                    $endpointSecret
                );
            } catch (\Exception $e) {
                Log::error('Stripe webhook signature verification failed: ' . $e->getMessage());
                return response()->json([
                    'error' => 'Webhook signature verification failed'
                ], 400);
            }

            // Handle the event
            switch ($event->type) {
                case 'payment_intent.succeeded':
                    $paymentIntent = $event->data->object;
                    $this->handlePaymentSuccess($paymentIntent);
                    break;

                case 'payment_intent.payment_failed':
                    $paymentIntent = $event->data->object;
                    $this->handlePaymentFailure($paymentIntent);
                    break;

                default:
                    Log::info('Unhandled Stripe webhook event type: ' . $event->type);
            }

            return response()->json(['received' => true], 200);

        } catch (\Exception $e) {
            Log::error('Webhook handling error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Webhook processing failed'
            ], 500);
        }
    }

    /**
     * Handle successful payment from webhook
     */
    private function handlePaymentSuccess($paymentIntent)
    {
        try {
            $invoiceId = $paymentIntent->metadata->invoice_id ?? null;

            if (!$invoiceId) {
                Log::warning('PaymentIntent missing invoice_id in metadata', [
                    'payment_intent_id' => $paymentIntent->id
                ]);
                return;
            }

            $invoice = Invoice::find($invoiceId);

            if (!$invoice) {
                Log::warning('Invoice not found for payment', [
                    'invoice_id' => $invoiceId,
                    'payment_intent_id' => $paymentIntent->id
                ]);
                return;
            }

            // Update invoice if not already paid
            if ($invoice->status !== 'paid') {
                $invoice->status = 'paid';
                $invoice->paid_date = now();
                $invoice->save();

                // Save payment record to payments table
                // Check if payment record already exists to avoid duplicates
                $existingPayment = Payment::where('stripe_payment_id', $paymentIntent->id)->first();
                
                if (!$existingPayment) {
                    Payment::create([
                        'invoice_id' => $invoice->id,
                        'member_id' => $invoice->member_id,
                        'stripe_payment_id' => $paymentIntent->id,
                        'amount' => $invoice->amount,
                        'status' => 'succeeded',
                        'payment_method' => $paymentIntent->payment_method_types[0] ?? 'card',
                        'metadata' => [
                            'invoice_number' => $invoice->invoice_number ?? null,
                            'currency' => $paymentIntent->currency ?? 'usd',
                            'amount_in_cents' => $paymentIntent->amount ?? null,
                            'source' => 'webhook',
                        ],
                    ]);
                }

                Log::info('Invoice marked as paid via webhook', [
                    'invoice_id' => $invoice->id,
                    'payment_intent_id' => $paymentIntent->id
                ]);
            }

        } catch (\Exception $e) {
            Log::error('Error handling payment success: ' . $e->getMessage());
        }
    }

    /**
     * Handle failed payment from webhook
     */
    private function handlePaymentFailure($paymentIntent)
    {
        try {
            $invoiceId = $paymentIntent->metadata->invoice_id ?? null;

            if ($invoiceId) {
                Log::info('Payment failed for invoice', [
                    'invoice_id' => $invoiceId,
                    'payment_intent_id' => $paymentIntent->id,
                    'error' => $paymentIntent->last_payment_error->message ?? 'Unknown error'
                ]);
            }

        } catch (\Exception $e) {
            Log::error('Error handling payment failure: ' . $e->getMessage());
        }
    }
}

