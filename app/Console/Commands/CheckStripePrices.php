<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Plan;
use Stripe\StripeClient;

class CheckStripePrices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stripe:check-prices';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check and validate Stripe Price IDs for all plans in the database';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('=== Checking Stripe Price IDs ===');
        $this->newLine();

        $stripeSecret = config('cashier.secret') ?: config('services.stripe.secret');

        if (!$stripeSecret) {
            $this->error('❌ Stripe secret key not found in .env');
            $this->info('Please set CASHIER_SECRET or STRIPE_SECRET in your .env file');
            return 1;
        }

        try {
            $stripe = new StripeClient($stripeSecret);
            
            // Get all plans from database
            $plans = Plan::orderBy('id')->get();
            
            if ($plans->isEmpty()) {
                $this->warn('No plans found in database');
                return 0;
            }

            $this->info('Checking Stripe Price IDs:');
            $this->line(str_repeat('=', 80));
            
            $headers = ['ID', 'Name', 'Price', 'Stripe Price ID', 'Status'];
            $rows = [];
            
            foreach ($plans as $plan) {
                if (!$plan->stripe_price_id) {
                    $rows[] = [
                        $plan->id,
                        $plan->name,
                        '$' . number_format($plan->price, 2),
                        '(empty)',
                        '❌ MISSING'
                    ];
                    continue;
                }
                
                try {
                    $price = $stripe->prices->retrieve($plan->stripe_price_id);
                    
                    if ($price->active) {
                        $rows[] = [
                            $plan->id,
                            $plan->name,
                            '$' . number_format($plan->price, 2),
                            $plan->stripe_price_id,
                            '✅ EXISTS'
                        ];
                        
                        $amount = $price->unit_amount / 100;
                        $this->line("   Plan ID {$plan->id}: Stripe Product: {$price->product}");
                        $this->line("   Amount: \${$amount} {$price->currency}");
                        $this->line("   Interval: " . ($price->recurring->interval ?? 'one-time'));
                        $this->newLine();
                    } else {
                        $rows[] = [
                            $plan->id,
                            $plan->name,
                            '$' . number_format($plan->price, 2),
                            $plan->stripe_price_id,
                            '❌ INACTIVE'
                        ];
                    }
                } catch (\Stripe\Exception\InvalidRequestException $e) {
                    $rows[] = [
                        $plan->id,
                        $plan->name,
                        '$' . number_format($plan->price, 2),
                        $plan->stripe_price_id,
                        '❌ NOT FOUND'
                    ];
                    $this->error("   Error: " . $e->getMessage());
                    $this->newLine();
                }
            }
            
            $this->table($headers, $rows);
            $this->newLine();
            $this->info('✅ Check complete!');
            
            return 0;
            
        } catch (\Exception $e) {
            $this->error('❌ Error: ' . $e->getMessage());
            return 1;
        }
    }
}

