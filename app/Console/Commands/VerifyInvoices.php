<?php

namespace App\Console\Commands;

use App\Models\GymInvoice;
use App\Models\GymSubscription;
use Illuminate\Console\Command;

class VerifyInvoices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invoices:verify';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Verify created invoices and subscription billing dates';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('=== Invoice Verification ===');
        $this->line('');

        // Show all invoices
        $invoices = GymInvoice::with('subscription')->orderBy('created_at', 'desc')->get();
        
        $this->info("Total Invoices: {$invoices->count()}");
        $this->line('');

        if ($invoices->count() > 0) {
            $this->info('Recent Invoices:');
            $this->table(
                ['ID', 'Invoice #', 'Subscription ID', 'Amount', 'Status', 'Billing Month', 'Due Date', 'Created'],
                $invoices->take(10)->map(function ($invoice) {
                    return [
                        $invoice->id,
                        $invoice->invoice_number,
                        $invoice->gym_subscription_id,
                        '$' . number_format($invoice->amount, 2),
                        $invoice->status,
                        $invoice->billing_month ? $invoice->billing_month->format('Y-m') : 'N/A',
                        $invoice->due_date ? $invoice->due_date->format('Y-m-d') : 'N/A',
                        $invoice->created_at->format('Y-m-d H:i'),
                    ];
                })
            );
        }

        $this->line('');
        $this->info('=== Subscription Billing Dates ===');
        $this->line('');

        $subscriptions = GymSubscription::orderBy('id')->get();
        $this->info("Total Subscriptions: {$subscriptions->count()}");
        $this->line('');

        if ($subscriptions->count() > 0) {
            $this->info('All Subscriptions:');
            $this->table(
                ['ID', 'Status', 'Amount', 'Next Billing Date', 'Invoices Count'],
                $subscriptions->map(function ($sub) {
                    return [
                        $sub->id,
                        $sub->status,
                        '$' . number_format($sub->amount, 2),
                        $sub->next_billing_date->format('Y-m-d'),
                        $sub->invoices()->count(),
                    ];
                })
            );
        }

        $this->line('');
        $this->info('✓ Verification complete!');

        return Command::SUCCESS;
    }
}

