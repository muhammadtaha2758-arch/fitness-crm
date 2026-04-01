<?php

namespace App\Http\Controllers;

use App\Models\GymInvoice;
use App\Models\GymSubscription;
use App\Models\Gym;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Stripe\Stripe;
use Stripe\StripeClient;
use Stripe\PaymentIntent;
use Stripe\Exception\ApiErrorException;

class GymInvoiceController extends Controller
{
    /**
     * Get gym and verify payment gateway configuration
     */
    private function getGym($gymId)
    {
        $gym = Gym::find($gymId);
        
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
     * Get Stripe publishable key for the authenticated gym
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStripePublishableKey(Request $request)
    {
        try {
            $user = $request->user('api');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }
            
            $gymId = $user->gym_id;
            
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gym ID not found'
                ], 400);
            }

            $gym = $this->getGym($gymId);

            // Check if Stripe is the active payment gateway
            if ($gym->active_payment_gateway !== 'stripe') {
                return response()->json([
                    'success' => false,
                    'message' => 'Stripe is not the active payment gateway for this gym'
                ], 400);
            }

            if (!$gym->stripe_key) {
                return response()->json([
                    'success' => false,
                    'message' => 'Stripe publishable key is not configured for this gym'
                ], 400);
            }

            return response()->json([
                'success' => true,
                'publishable_key' => $gym->stripe_key
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching Stripe key',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get invoices for the authenticated gym
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $user = $request->user('api');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }
            
            // Build query
            $query = GymInvoice::query();
            
            // If user is super admin, show all invoices from their owned gyms
            if ($user->is_super_admin) {
                $ownedGymIds = Gym::where('super_admin_id', $user->id)->pluck('id');
                if ($ownedGymIds->isNotEmpty()) {
                    $query->whereIn('gym_id', $ownedGymIds);
                } else {
                    // If no owned gyms, show all invoices (fallback)
                    // This handles the case where super admin might not have gyms assigned yet
                    Log::info('Super admin has no owned gyms, showing all invoices', ['user_id' => $user->id]);
                }
            } else {
                // Regular user: filter by their gym_id
                $gymId = $user->gym_id;
                
                if (!$gymId) {
                    // If user has no gym_id, show all invoices as fallback
                    // This handles cases where users might not have gym_id set but invoices exist
                    Log::warning('User has no gym_id, showing all invoices as fallback', [
                        'user_id' => $user->id,
                        'user_email' => $user->email
                    ]);
                    // Don't filter by gym_id - show all invoices
                } else {
                    // First, try to get invoices matching user's gym_id
                    $query->where('gym_id', $gymId);
                }
            }

            $invoices = $query->with(['subscription' => function($query) {
                    $query->with('plan');
                }])
                ->orderBy('created_at', 'desc')
                ->get();

            $totalInDb = GymInvoice::count();

            // If no invoices found, show all invoices as fallback (live server may have gym_id mismatch or super_admin_id not set)
            if ($invoices->isEmpty() && $totalInDb > 0) {
                Log::info('Gym invoices: filtered query returned 0 but DB has invoices, showing all as fallback', [
                    'user_id' => $user->id,
                    'is_super_admin' => $user->is_super_admin ?? false,
                    'user_gym_id' => $user->gym_id,
                    'total_in_db' => $totalInDb
                ]);
                $invoices = GymInvoice::with(['subscription' => function($query) {
                        $query->with('plan');
                    }])
                    ->orderBy('created_at', 'desc')
                    ->get();
            }

            // Calculate summary
            $summary = [
                'total_invoices' => $invoices->count(),
                'total_amount' => $invoices->sum('amount'),
                'pending_amount' => $invoices->where('status', 'pending')->sum('amount'),
                'paid_amount' => $invoices->where('status', 'paid')->sum('amount'),
                'cancelled_amount' => $invoices->where('status', 'cancelled')->sum('amount'),
            ];

            // Log for debugging
            Log::info('Gym invoices fetched', [
                'user_id' => $user->id,
                'is_super_admin' => $user->is_super_admin,
                'user_gym_id' => $user->gym_id,
                'invoices_count' => $invoices->count(),
                'gym_ids_in_invoices' => $invoices->pluck('gym_id')->unique()->values()->toArray()
            ]);

            return response()->json([
                'success' => true,
                'data' => $invoices,
                'summary' => $summary
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching gym invoices', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Error fetching invoices',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get a specific invoice
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request, $id)
    {
        try {
            $user = $request->user('api');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }
            
            $gymId = $user->gym_id;
            
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gym ID not found'
                ], 400);
            }
            
            $invoice = GymInvoice::where('gym_id', $gymId)
                ->with(['subscription' => function($query) {
                    $query->with('plan');
                }])
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
     * Create Stripe PaymentIntent for invoice payment
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function createPaymentIntent(Request $request, $id)
    {
        try {
            $user = $request->user('api');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }
            
            $gymId = $user->gym_id;
            
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gym ID not found'
                ], 400);
            }

            $invoice = GymInvoice::where('gym_id', $gymId)
                ->find($id);

            if (!$invoice) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invoice not found'
                ], 404);
            }

            if ($invoice->status !== 'pending') {
                return response()->json([
                    'success' => false,
                    'message' => 'Invoice is not pending payment'
                ], 400);
            }

            // Initialize Stripe with gym's secret key
            try {
                $gym = $this->initializeStripe($gymId);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage()
                ], 400);
            }

            $stripe = new StripeClient($gym->stripe_secret);

            // Convert amount to cents (Stripe uses smallest currency unit)
            $amountInCents = (int)($invoice->amount * 100);

            // Create PaymentIntent
            $paymentIntent = $stripe->paymentIntents->create([
                'amount' => $amountInCents,
                'currency' => 'usd',
                'metadata' => [
                    'invoice_id' => $invoice->id,
                    'invoice_number' => $invoice->invoice_number,
                    'gym_id' => $gymId,
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
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating payment intent',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Confirm payment and update invoice
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function confirmPayment(Request $request, $id)
    {
        try {
            $user = $request->user('api');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }
            
            $gymId = $user->gym_id;
            
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gym ID not found'
                ], 400);
            }
            
            $invoice = GymInvoice::where('gym_id', $gymId)
                ->find($id);

            if (!$invoice) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invoice not found'
                ], 404);
            }

            $request->validate([
                'payment_intent_id' => 'required|string',
            ]);

            // Initialize Stripe with gym's secret key
            try {
                $gym = $this->initializeStripe($gymId);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage()
                ], 400);
            }

            $stripe = new StripeClient($gym->stripe_secret);

            // Retrieve payment intent from Stripe
            try {
                $paymentIntent = $stripe->paymentIntents->retrieve($request->payment_intent_id);

                // Verify the payment intent belongs to this invoice
                if (isset($paymentIntent->metadata->invoice_id) && 
                    $paymentIntent->metadata->invoice_id != $invoice->id) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Payment intent does not match invoice'
                    ], 400);
                }

                if ($paymentIntent->status === 'succeeded') {
                    // Update invoice
                    $invoice->update([
                        'status' => 'paid',
                        'paid_date' => now(),
                        'payment_method' => 'stripe',
                    ]);

                    return response()->json([
                        'success' => true,
                        'message' => 'Payment confirmed successfully',
                        'data' => $invoice->fresh()
                    ]);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Payment not completed. Status: ' . $paymentIntent->status
                    ], 400);
                }
            } catch (ApiErrorException $e) {
                Log::error('Stripe PaymentIntent retrieval error: ' . $e->getMessage());
                return response()->json([
                    'success' => false,
                    'message' => 'Payment verification error: ' . $e->getMessage()
                ], 500);
            }
        } catch (\Exception $e) {
            Log::error('Confirm payment error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error confirming payment',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

