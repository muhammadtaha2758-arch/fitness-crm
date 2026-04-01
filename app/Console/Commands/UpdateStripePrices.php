<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Plan;

class UpdateStripePrices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stripe:update-prices';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Interactively update Stripe Price IDs for plans in the database';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('=== Stripe Price ID Database Updater ===');
        $this->newLine();

        // Get all plans
        $plans = Plan::orderBy('id')->get();

        if ($plans->isEmpty()) {
            $this->warn('No plans found in database');
            return 0;
        }

        // Display current state
        $this->info('Current Plans:');
        $this->line(str_repeat('=', 80));
        
        $headers = ['ID', 'Name', 'Price', 'Interval', 'Stripe Price ID'];
        $rows = [];
        
        foreach ($plans as $plan) {
            $rows[] = [
                $plan->id,
                $plan->name,
                '$' . number_format($plan->price, 2),
                $plan->interval,
                $plan->stripe_price_id ?: '(empty)'
            ];
        }
        
        $this->table($headers, $rows);
        $this->newLine();
        
        $this->info('Please enter your Stripe Price IDs from Stripe Dashboard.');
        $this->info('Enter "skip" to keep the current value.');
        $this->newLine();

        $updates = [];
        
        foreach ($plans as $plan) {
            $this->line(str_repeat('-', 80));
            $this->info("Plan ID {$plan->id}: {$plan->name}");
            $this->line("Current Stripe Price ID: " . ($plan->stripe_price_id ?: '(empty)'));
            
            while (true) {
                $input = $this->ask("Enter Stripe Price ID (e.g., price_1ABC123xyz...) or 'skip'", 'skip');
                
                if ($input === 'skip' || $input === '') {
                    $this->line('Keeping current value.');
                    break;
                }
                
                // Basic validation
                if (strpos($input, 'price_') === 0 && strlen($input) > 20) {
                    $updates[$plan->id] = $input;
                    $this->info("✅ Will update to: {$input}");
                    break;
                } else {
                    $this->error('❌ Invalid Price ID. Should start with "price_" and be longer than 20 characters.');
                    $this->line('   Example: price_1ABC123xyz456789');
                }
            }
        }

        if (empty($updates)) {
            $this->newLine();
            $this->warn('No updates to perform. Exiting.');
            return 0;
        }

        // Show summary
        $this->newLine();
        $this->line(str_repeat('=', 80));
        $this->info('Summary of Changes:');
        $this->line(str_repeat('=', 80));
        
        foreach ($updates as $planId => $newPriceId) {
            $plan = Plan::find($planId);
            $oldPriceId = $plan->stripe_price_id ?: '(empty)';
            $this->newLine();
            $this->line("Plan ID {$planId}: {$plan->name}");
            $this->line("  OLD: {$oldPriceId}");
            $this->line("  NEW: {$newPriceId}");
        }

        $this->newLine();
        if (!$this->confirm('Do you want to apply these changes?', true)) {
            $this->warn('Update cancelled.');
            return 0;
        }

        // Apply updates
        $this->newLine();
        $this->info('Updating database...');
        
        $successCount = 0;
        $errorCount = 0;

        foreach ($updates as $planId => $newPriceId) {
            try {
                $plan = Plan::find($planId);
                if ($plan) {
                    $plan->stripe_price_id = $newPriceId;
                    $plan->save();
                    $this->info("✅ Updated Plan ID {$planId}");
                    $successCount++;
                } else {
                    $this->error("❌ Plan ID {$planId} not found");
                    $errorCount++;
                }
            } catch (\Exception $e) {
                $this->error("❌ Error updating Plan ID {$planId}: " . $e->getMessage());
                $errorCount++;
            }
        }

        $this->newLine();
        $this->line(str_repeat('=', 80));
        $this->info('Update Complete!');
        $this->line(str_repeat('=', 80));
        $this->info("✅ Successfully updated: {$successCount} plans");
        
        if ($errorCount > 0) {
            $this->error("❌ Errors: {$errorCount} plans");
        }

        // Show final state
        $this->newLine();
        $this->info('=== Updated Plans ===');
        $this->line(str_repeat('=', 80));
        
        $updatedPlans = Plan::orderBy('id')->get();
        $finalRows = [];
        
        foreach ($updatedPlans as $plan) {
            $finalRows[] = [
                $plan->id,
                $plan->name,
                '$' . number_format($plan->price, 2),
                $plan->interval,
                $plan->stripe_price_id ?: '(empty)'
            ];
        }
        
        $this->table($headers, $finalRows);
        $this->newLine();
        $this->info('✅ Database updated successfully!');
        
        return 0;
    }
}

