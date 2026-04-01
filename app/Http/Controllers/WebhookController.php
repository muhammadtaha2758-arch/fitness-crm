<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Laravel\Cashier\Http\Controllers\WebhookController as CashierController;

class WebhookController extends CashierController
{
    /**
     * Handle successful payment
     */
    protected function handleCheckoutSessionCompleted($payload)
    {
        $session = $payload['data']['object'];
        $user_id = $session['metadata']['user_id'] ?? null;
        $plan_id = $session['metadata']['plan_id'] ?? null;
        
        if ($user_id) {
            $user = User::find($user_id);
            if ($user) {
                Log::info('Checkout session completed for user: ' . $user->email);
                
                // Subscriptions table dropped - subscription tracking removed
                // if ($plan_id) {
                //     DB::table('subscriptions')->insert([...]);
                // }
            }
        }
        
        return $this->successMethod();
    }

    /**
     * Handle subscription created - AUTO-SYNC PRICE IDS
     */
    protected function handleCustomerSubscriptionCreated($payload)
    {
        $subscription = $payload['data']['object'];
        $customer_id = $subscription['customer'];
        
        // Extract price_id from subscription
        if (isset($subscription['items']['data'][0]['price']['id'])) {
            $stripe_price_id = $subscription['items']['data'][0]['price']['id'];
            
            // Try to find existing plan with this Stripe price ID
            $plan = Plan::where('stripe_price_id', $stripe_price_id)->first();
            
            if (!$plan) {
                // Try to match by price amount and interval
                $stripe_price = $subscription['items']['data'][0]['price'];
                $amount = $stripe_price['unit_amount'] / 100; // Convert cents to dollars
                $interval = $stripe_price['recurring']['interval'] ?? 'month';
                
                $plan = Plan::where('price', $amount)
                    ->where('interval', $interval)
                    ->first();
                
                if ($plan) {
                    // Update the plan with the Stripe price ID
                    $plan->update(['stripe_price_id' => $stripe_price_id]);
                    Log::info("Updated plan {$plan->name} with Stripe price ID: {$stripe_price_id}");
                } else {
                    Log::warning("Could not find matching plan for Stripe price ID: {$stripe_price_id}");
                }
            }
        }
        
        $user = User::where('stripe_id', $customer_id)->first();
        if ($user) {
            Log::info('Subscription created for user: ' . $user->email);
        }
        
        return $this->successMethod();
    }

    /**
     * Handle subscription updated - AUTO-SYNC PRICE IDS
     */
    protected function handleCustomerSubscriptionUpdated($payload)
    {
        $subscription = $payload['data']['object'];
        $customer_id = $subscription['customer'];
        
        // Extract and sync price_id
        if (isset($subscription['items']['data'][0]['price']['id'])) {
            $stripe_price_id = $subscription['items']['data'][0]['price']['id'];
            
            $plan = Plan::where('stripe_price_id', $stripe_price_id)->first();
            
            if (!$plan) {
                $stripe_price = $subscription['items']['data'][0]['price'];
                $amount = $stripe_price['unit_amount'] / 100;
                $interval = $stripe_price['recurring']['interval'] ?? 'month';
                
                $plan = Plan::where('price', $amount)
                    ->where('interval', $interval)
                    ->first();
                
                if ($plan) {
                    $plan->update(['stripe_price_id' => $stripe_price_id]);
                    Log::info("Synced plan {$plan->name} with Stripe price ID: {$stripe_price_id}");
                }
            }
        }
        
        $user = User::where('stripe_id', $customer_id)->first();
        if ($user) {
            Log::info('Subscription updated for user: ' . $user->email);
        }
        
        return $this->successMethod();
    }

    /**
     * Handle subscription deleted
     */
    protected function handleCustomerSubscriptionDeleted($payload)
    {
        $subscription = $payload['data']['object'];
        $customer_id = $subscription['customer'];
        
        $user = User::where('stripe_id', $customer_id)->first();
        if ($user) {
            Log::info('Subscription cancelled for user: ' . $user->email);
        }
        
        return $this->successMethod();
    }

    /**
     * Handle failed payment
     */
    protected function handleInvoicePaymentFailed($payload)
    {
        $invoice = $payload['data']['object'];
        $customer_id = $invoice['customer'];
        
        $user = User::where('stripe_id', $customer_id)->first();
        if ($user) {
            Log::warning('Payment failed for user: ' . $user->email);
            // You can add logic to notify the user or suspend their account
        }
        
        return $this->successMethod();
    }
}