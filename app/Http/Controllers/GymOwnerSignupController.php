<?php

namespace App\Http\Controllers;

use App\Models\Gym;
use App\Models\User;
use App\Models\GymPlan;
use App\Models\GymSubscription;
use App\Models\GymInvoice;
use Illuminate\Http\Request;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Stripe\Stripe;
use Stripe\StripeClient;
use Stripe\Checkout\Session as CheckoutSession;

class GymOwnerSignupController extends Controller
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
     * Falls back to global config if gym doesn't have stripe_secret configured
     */
    private function initializeStripe($gymId)
    {
        $gym = $this->getGym($gymId);
        
        // Check if Stripe is the active payment gateway
        if ($gym->active_payment_gateway !== 'stripe' && $gym->active_payment_gateway !== null) {
            throw new \Exception('Stripe is not the active payment gateway for this gym');
        }
        
        // Try to use gym-specific Stripe secret first
        if ($gym->stripe_secret) {
            Stripe::setApiKey($gym->stripe_secret);
            return $gym;
        }
        
        // Fallback to global Stripe secret
        $stripeSecret = config('app.STRIPE_SECRET');
        
        if (empty($stripeSecret)) {
            throw new \Exception('Stripe secret key is not configured. Please set STRIPE_SECRET in your .env file or configure it for this gym.');
        }
        
        Stripe::setApiKey($stripeSecret);
        
        return $gym;
    }

    public function register(Request $request)
    {
        $request->validate([
            'plan_id' => 'required|integer|exists:gym_plans,id', // ensure gym plan exists
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'gym_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20'
        ]);

        // Validate gym plan has Stripe price ID before creating any records
        $gymPlan = GymPlan::findOrFail($request->plan_id);
        $priceId = $gymPlan->stripe_price_id;

        if (empty($priceId)) {
            return response()->json([
                'success' => false,
                'message' => "Stripe price ID not found for the selected plan '{$gymPlan->name}' (ID: {$gymPlan->id}). Please contact support or select a different plan."
            ], 400);
        }

        DB::beginTransaction();

        try {
            // Create gym
            $gym = Gym::create([
                'gym_name' => $request->gym_name,
                'contact_email' => $request->email,
                'subscription_status' => 'pending',
            ]);

            // Create user (gym owner)
            $user = User::create([
                'firstname' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'role_id' => 1, // owner role
                'gym_id' => $gym->id,
                'statut' => 1,
            ]);

            $role = Role::where('name', 'owner')->first();
            $user->roles()->attach($role->id);

            // Validate Stripe price ID format (should start with 'price_' followed by alphanumeric characters)
            if (!preg_match('/^price_[a-zA-Z0-9]{20,}$/', $priceId)) {
                throw new \Exception("Invalid Stripe price ID format for plan '{$gymPlan->name}'. The price ID '{$priceId}' does not match Stripe's format. Valid Stripe price IDs start with 'price_' followed by alphanumeric characters (e.g., 'price_1ABC123xyz...').");
            }

            // Initialize Stripe with gym's secret key (falls back to global config if not set)
            try {
                $this->initializeStripe($gym->id);
            } catch (\Exception $e) {
                throw new \Exception('Failed to initialize Stripe: ' . $e->getMessage());
            }

            // Get the current Stripe API key that was set
            $stripeSecret = $gym->stripe_secret ?: config('app.STRIPE_SECRET');

            // Validate that the price ID exists in Stripe
            try {
                $stripe = new StripeClient($stripeSecret);
                $stripePrice = $stripe->prices->retrieve($priceId);
                
                // Check if price is active
                if (!$stripePrice->active) {
                    throw new \Exception("The Stripe price ID '{$priceId}' exists but is not active. Please activate it in your Stripe dashboard.");
                }
            } catch (\Stripe\Exception\InvalidRequestException $e) {
                // Price doesn't exist in Stripe
                throw new \Exception("The Stripe price ID '{$priceId}' for plan '{$gymPlan->name}' does not exist in your Stripe account. Please update the plan with a valid Stripe price ID from your Stripe dashboard.");
            } catch (\Exception $e) {
                // Re-throw if it's our custom exception, otherwise wrap it
                if (strpos($e->getMessage(), 'Stripe price ID') !== false || strpos($e->getMessage(), 'not active') !== false || strpos($e->getMessage(), 'Invalid Stripe price ID format') !== false) {
                    throw $e;
                }
                throw new \Exception("Error validating Stripe price ID: " . $e->getMessage());
            }

            // Calculate next billing date (1 month from today)
            $nextBillingDate = Carbon::now()->addMonth();

            // Create gym subscription
            $subscription = GymSubscription::create([
                'gym_id' => $gym->id,
                'gym_plan_id' => $gymPlan->id,
                'amount' => $gymPlan->price,
                'next_billing_date' => $nextBillingDate,
                'status' => 'active', // Set as active since they're signing up
            ]);

            // Create initial invoice for the current month
            $billingMonth = Carbon::now()->startOfMonth();
            $dueDate = Carbon::now()->addDays(30);

            $invoice = GymInvoice::create([
                'invoice_number' => GymInvoice::generateInvoiceNumber(),
                'gym_id' => $gym->id,
                'gym_subscription_id' => $subscription->id,
                'amount' => $gymPlan->price,
                'billing_month' => $billingMonth,
                'status' => 'pending',
                'due_date' => $dueDate,
                'description' => "Initial subscription for {$gymPlan->name} - {$billingMonth->format('F Y')}",
            ]);

            // Create Stripe checkout session
            $checkout = CheckoutSession::create([
                'payment_method_types' => ['card'],
                'mode' => 'subscription',
                'line_items' => [[
                    'price' => $priceId,
                    'quantity' => 1,
                ]],
                'customer_email' => $request->email,
                'success_url' => env('FRONTEND_URL') . '/success?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => env('FRONTEND_URL') . '/cancel',
            ]);

            // Update gym subscription status
            $gym->update([
                'subscription_status' => 'initiated',
                'active_payment_gateway' => 'stripe',
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Gym and user created successfully',
                'checkout_url' => $checkout->url
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getSubscriptionPlans()
    {
        $plans = GymPlan::where('is_active', 1) // only active plans
                     ->whereNotNull('stripe_price_id') // only plans with Stripe price ID
                     ->where('stripe_price_id', '!=', '') // exclude empty strings
                     ->orderBy('sort_order', 'asc')
                     ->get();

        return response()->json([
            'success' => true,
            'plans' => $plans
        ]);
    }
}
