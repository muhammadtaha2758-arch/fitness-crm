<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Models\User;
use App\Models\Gym;
use App\Models\GymSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Stripe\StripeClient;

class SubscriptionController extends Controller
{
    private $stripe;

    public function __construct()
    {
        $stripeSecret = config('cashier.secret') ?: config('services.stripe.secret');
        if ($stripeSecret) {
            $this->stripe = new StripeClient($stripeSecret);
        }
    }

    public function subscribe(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'plan_id' => 'required|exists:member_plans,id',
            'email' => 'required|email',
            'name' => 'required|string|max:255',
            'password' => 'nullable|string|min:8',
            'phone' => 'nullable|string|max:255',
            'gym_name' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $plan = Plan::findOrFail($request->plan_id);

        // Check if user exists or create new one
        $user = User::where('email', $request->email)->first();
        
        // Handle gym creation/lookup
        $gymId = null;
        $superAdminId = null;
        
        // Get super admin - check if authenticated user is super admin, or use user id:1 as default
        $authUser = Auth::user();
        if ($authUser && $authUser->isSuperAdmin()) {
            $superAdminId = $authUser->id;
        } else {
            // Default to super admin (user id:1) for new subscriptions
            $superAdminId = 1;
        }
        
        if ($request->has('gym_name') && !empty($request->gym_name)) {
            // Check if gym already exists with this name
            $gym = Gym::where('gym_name', $request->gym_name)->first();
            
            if (!$gym) {
                // Create new gym with super admin assignment
                $gym = Gym::create([
                    'gym_name' => $request->gym_name,
                    'name' => $request->gym_name, // Also set name field
                    'contact_email' => $request->email,
                    'email' => $request->email,
                    'subscription_status' => 'active',
                    'super_admin_id' => $superAdminId, // Assign to super admin
                ]);
            } else {
                // Update super admin if gym already exists but doesn't have one
                if (!$gym->super_admin_id) {
                    $gym->super_admin_id = $superAdminId;
                    $gym->save();
                }
            }
            
            $gymId = $gym->id;
        }
        
        // If user exists, update phone and gym_id if provided
        if ($user) {
            $updated = false;
            
            if ($request->has('phone') && !empty($request->phone)) {
                $user->phone = $request->phone;
                $updated = true;
            }
            
            // Always update gym_id if it was set (even if user exists)
            if ($gymId) {
                $user->gym_id = $gymId;
                $updated = true;
            }
            
            if ($updated) {
                $user->save();
            }
        }
        
        if (!$user) {
            if (!$request->password) {
                return response()->json([
                    'success' => false,
                    'message' => 'Password is required for new users'
                ], 422);
            }

            // Split name into firstname and lastname
            $nameParts = explode(' ', $request->name, 2);
            
            // Prepare user data
            $userData = [
                'firstname' => $nameParts[0] ?? $request->name,
                'lastname' => $nameParts[1] ?? '',
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'username' => $request->email,
                'statut' => 1,
                'role_id' => 1, // Hardcode role_id to 1 for new users
            ];
            
            // Add phone if provided
            if ($request->has('phone') && !empty($request->phone)) {
                $userData['phone'] = $request->phone;
            }
            
            // Add gym_id if gym was created/found
            if ($gymId) {
                $userData['gym_id'] = $gymId;
            }
            
            $user = User::create($userData);
        }

        try {
            // Check if Stripe is configured
            if (!$this->stripe) {
                // Stripe not configured, return demo mode response
                return response()->json([
                    'success' => true,
                    'demo_mode' => true,
                    'message' => 'Demo Mode: Stripe is not configured. This is a sample plan.',
                    'plan_details' => [
                        'name' => $plan->name,
                        'price' => $plan->price,
                        'interval' => $plan->interval,
                        'features' => $plan->features,
                    ],
                    'checkout_url' => null,
                    'session_id' => 'demo_session_' . time(),
                ]);
            }

            // Check if this is a demo/placeholder price ID
            if (str_contains($plan->stripe_price_id, '_monthly') || str_contains($plan->stripe_price_id, '_yearly')) {
                // This is a placeholder price ID, return demo mode response
                return response()->json([
                    'success' => true,
                    'demo_mode' => true,
                    'message' => 'Demo Mode: This is a sample plan. In production, you would be redirected to Stripe checkout.',
                    'plan_details' => [
                        'name' => $plan->name,
                        'price' => $plan->price,
                        'interval' => $plan->interval,
                        'features' => $plan->features,
                    ],
                    'checkout_url' => null,
                    'session_id' => 'demo_session_' . time(),
                ]);
            }

            // This is a real Stripe price ID, proceed with actual checkout
            $checkoutSession = $this->stripe->checkout->sessions->create([
                'customer_email' => $user->email,
                'line_items' => [[
                    'price' => $plan->stripe_price_id,
                    'quantity' => 1,
                ]],
                'mode' => 'subscription',
                'success_url' => config('app.frontend_url', 'http://localhost:3000') . '/success?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => config('app.frontend_url', 'http://localhost:3000') . '/cancel',
                'metadata' => [
                    'user_id' => $user->id,
                    'plan_id' => $plan->id,
                ],
            ]);

            return response()->json([
                'success' => true,
                'checkout_url' => $checkoutSession->url,
                'session_id' => $checkoutSession->id,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create checkout session: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Check subscription status for the current user's gym.
     * Returns real gym subscription data for the frontend to show status or resubscribe message.
     */
    public function status(Request $request)
    {
        $user = $request->user('api') ?? Auth::user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not authenticated'
            ], 401);
        }

        $subscribed = $user->subscribed();
        $subscription = null;
        $gym = null;
        $message = null;

        if ($user->isSuperAdmin()) {
            $message = 'Super admin access.';
        } elseif ($user->gym_id) {
            $gym = Gym::find($user->gym_id);
            if ($gym) {
                $activeSub = GymSubscription::where('gym_id', $gym->id)
                    ->where('status', 'active')
                    ->with('plan')
                    ->latest()
                    ->first();
                if ($activeSub && $activeSub->plan) {
                    $subscription = [
                        'id' => $activeSub->id,
                        'status' => $activeSub->status,
                        'plan_name' => $activeSub->plan->name,
                        'plan_price' => (float) $activeSub->plan->price,
                        'interval' => $activeSub->plan->interval ?? null,
                        'next_billing_date' => $activeSub->next_billing_date
                            ? $activeSub->next_billing_date->format('Y-m-d')
                            : null,
                    ];
                } else {
                    $subscription = [
                        'status' => $gym->subscription_status ?? 'none',
                        'plan_name' => null,
                        'plan_price' => null,
                        'interval' => null,
                        'next_billing_date' => null,
                    ];
                }
                if (!$subscribed) {
                    $message = 'Your gym subscription has ended or is inactive. Please resubscribe to continue using the system.';
                }
            } else {
                $message = 'No gym assigned. Please contact support.';
            }
        } else {
            $message = 'No gym assigned. Please contact support.';
        }

        return response()->json([
            'success' => true,
            'subscribed' => $subscribed,
            'subscription' => $subscription,
            'gym_name' => $gym ? $gym->gym_name : null,
            'message' => $message,
        ]);
    }
}