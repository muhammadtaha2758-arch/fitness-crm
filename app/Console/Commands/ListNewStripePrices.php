<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Stripe\StripeClient;

class ListNewStripePrices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stripe:list-new-prices 
                            {--limit=10 : Number of recent prices to show}
                            {--active : Only show active prices}
                            {--all : List all prices instead of just recent ones}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'List Stripe prices and products (recent or all)';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $showAll = $this->option('all');
        
        if ($showAll) {
            $this->info('=== Listing ALL Stripe Prices in Your Account ===');
        } else {
            $this->info('=== Getting NEW Stripe Products and Prices ===');
        }
        $this->newLine();

        $stripeSecret = config('cashier.secret') ?: config('services.stripe.secret');

        if (!$stripeSecret) {
            $this->error('❌ Stripe secret key not found');
            $this->info('Please set CASHIER_SECRET or STRIPE_SECRET in your .env file');
            return 1;
        }

        try {
            $stripe = new StripeClient($stripeSecret);
            
            $limit = (int) $this->option('limit');
            $activeOnly = $this->option('active');
            
            // Get all prices from Stripe
            $params = [
                'limit' => 100,
            ];
            
            if ($activeOnly) {
                $params['active'] = true;
            }
            
            $prices = $stripe->prices->all($params);
            
            if (empty($prices->data)) {
                $this->warn('No prices found in your Stripe account');
                $this->info('You need to create products and prices in Stripe Dashboard first.');
                $this->info('Go to: https://dashboard.stripe.com/test/products');
                return 0;
            }
            
            if ($showAll) {
                $this->info('Found ' . count($prices->data) . ' prices in your Stripe account:');
            } else {
                $this->info('Newly Created Products in Stripe:');
            }
            $this->line(str_repeat('=', 100));
            
            // Get all unique products
            $products = $stripe->products->all(['limit' => 100, 'active' => true]);
            $productMap = [];
            foreach ($products->data as $product) {
                $productMap[$product->id] = $product;
            }
            
            // Process prices
            $pricesToShow = $prices->data;
            
            if (!$showAll) {
                // Sort prices by creation date, newest first
                usort($pricesToShow, function($a, $b) {
                    return $b->created <=> $a->created;
                });
                
                // Show the most recent prices
                $pricesToShow = array_slice($pricesToShow, 0, $limit);
            }
            
            $headers = ['Price ID', 'Product Name', 'Amount', 'Currency', 'Interval'];
            $rows = [];
            
            foreach ($pricesToShow as $price) {
                $product = null;
                $productName = 'N/A';
                
                if ($price->product) {
                    try {
                        if (is_string($price->product)) {
                            $product = $productMap[$price->product] ?? null;
                            if (!$product) {
                                $product = $stripe->products->retrieve($price->product);
                            }
                        } else {
                            $product = $price->product;
                        }
                        $productName = $product->name ?? 'N/A';
                    } catch (\Exception $e) {
                        $productName = 'Product not found';
                    }
                }
                
                $amount = $price->unit_amount ? $price->unit_amount / 100 : 0;
                $interval = isset($price->recurring) ? $price->recurring->interval : 'one-time';
                
                $rows[] = [
                    $price->id,
                    substr($productName, 0, 30),
                    '$' . number_format($amount, 2),
                    strtoupper($price->currency ?? 'usd'),
                    $interval
                ];
            }
            
            $this->table($headers, $rows);
            $this->newLine();
            
            if ($showAll) {
                $this->info('✅ Use these Price IDs to update your database!');
                $this->info('Copy the Price IDs above and match them to your plans.');
            } else {
                $this->info('✅ Copy these Price IDs and share them with me!');
            }
            
            return 0;
            
        } catch (\Exception $e) {
            $this->error('❌ Error: ' . $e->getMessage());
            if ($this->option('verbose')) {
                $this->error("\nStack trace:\n" . $e->getTraceAsString());
            }
            return 1;
        }
    }
}

