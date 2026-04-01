<?php

namespace App\Console\Commands;

use App\Models\GymSubscription;
use App\Models\GymPlan;
use App\Models\Gym;
use App\Models\GymInvoice;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

class TestInvoiceGeneration extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invoices:test-setup {--clean : Remove existing test data first}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create test subscription data for invoice generation testing';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        if ($this->option('clean')) {
            $this->info('Cleaning up test data...');
            GymSubscription::where('gym_id', '>', 0)->delete();
            $this->info('Test subscriptions removed.');
        }

        // Get or create a test gym
        $gym = Gym::first();
        if (!$gym) {
            $this->error('No gym found in database. Please create a gym first.');
            return Command::FAILURE;
        }

        // Get or create a test plan
        $plan = GymPlan::first();
        if (!$plan) {
            $this->info('Creating a test gym plan...');
            $plan = GymPlan::create([
                'name' => 'Test Plan',
                'price' => 99.99,
                'interval' => 'month',
                'is_active' => true,
                'sort_order' => 1,
            ]);
            $this->info("Created test plan: {$plan->name} (ID: {$plan->id})");
        }

        // Create test subscriptions with different scenarios
        $this->info('Creating test subscriptions...');
        
        // 1. Subscription due for billing today
        $subscription1 = GymSubscription::create([
            'gym_id' => $gym->id,
            'gym_plan_id' => $plan->id,
            'amount' => 99.99,
            'next_billing_date' => Carbon::today(),
            'status' => 'active',
        ]);
        $this->info("✓ Created subscription #{$subscription1->id} - Due TODAY (should generate invoice)");

        // 2. Subscription due yesterday (should also generate invoice)
        $subscription2 = GymSubscription::create([
            'gym_id' => $gym->id,
            'gym_plan_id' => $plan->id,
            'amount' => 149.99,
            'next_billing_date' => Carbon::yesterday(),
            'status' => 'active',
        ]);
        $this->info("✓ Created subscription #{$subscription2->id} - Due YESTERDAY (should generate invoice)");

        // 3. Subscription due in the future (should NOT generate invoice)
        $subscription3 = GymSubscription::create([
            'gym_id' => $gym->id,
            'gym_plan_id' => $plan->id,
            'amount' => 199.99,
            'next_billing_date' => Carbon::today()->addDays(15),
            'status' => 'active',
        ]);
        $this->info("✓ Created subscription #{$subscription3->id} - Due in 15 days (should NOT generate invoice)");

        // 4. Cancelled subscription (should NOT generate invoice)
        $subscription4 = GymSubscription::create([
            'gym_id' => $gym->id,
            'gym_plan_id' => $plan->id,
            'amount' => 79.99,
            'next_billing_date' => Carbon::today(),
            'status' => 'cancelled',
        ]);
        $this->info("✓ Created subscription #{$subscription4->id} - Cancelled (should NOT generate invoice)");

        $this->line('');
        $this->info('=== Test Data Summary ===');
        $this->line("Gym ID: {$gym->id}");
        $this->line("Plan ID: {$plan->id}");
        $this->line("Total subscriptions created: 4");
        $this->line("Expected invoices to be generated: 2 (subscriptions #{$subscription1->id} and #{$subscription2->id})");
        $this->line('');
        $this->info('Now run: php artisan invoices:generate-monthly --debug');
        $this->line('');

        return Command::SUCCESS;
    }
}

