<?php

namespace App\Console\Commands;

use App\Services\InvoiceGenerationService;
use App\Models\GymSubscription;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class GenerateMonthlyInvoices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invoices:generate-monthly {--debug : Show detailed diagnostic information}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate monthly invoices for gym subscriptions that are due for billing';

    /**
     * The invoice generation service
     *
     * @var InvoiceGenerationService
     */
    protected $invoiceService;

    /**
     * Create a new command instance.
     *
     * @param InvoiceGenerationService $invoiceService
     * @return void
     */
    public function __construct(InvoiceGenerationService $invoiceService)
    {
        parent::__construct();
        $this->invoiceService = $invoiceService;
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Starting monthly invoice generation...');
        $this->info('Date: ' . now()->toDateTimeString());

        $debug = $this->option('debug');

        if ($debug) {
            $this->line('');
            $this->info('=== Diagnostic Information ===');
            
            // Count total subscriptions
            $totalSubscriptions = GymSubscription::count();
            $this->line("Total subscriptions in database: {$totalSubscriptions}");
            
            // Count active subscriptions
            $activeSubscriptions = GymSubscription::active()->count();
            $this->line("Active subscriptions: {$activeSubscriptions}");
            
            // Count subscriptions due for billing
            $dueSubscriptions = GymSubscription::active()->dueForBilling()->count();
            $this->line("Active subscriptions due for billing: {$dueSubscriptions}");
            
            // Show sample subscriptions
            if ($totalSubscriptions > 0) {
                $this->line('');
                $this->info('Sample subscriptions (first 5):');
                $samples = GymSubscription::with('plan')->limit(5)->get();
                foreach ($samples as $sub) {
                    $this->line("  ID: {$sub->id} | Status: {$sub->status} | Next Billing: {$sub->next_billing_date} | Amount: {$sub->amount}");
                }
            }
            
            $this->line('');
            $this->info('=== End Diagnostics ===');
            $this->line('');
        }

        try {
            $stats = $this->invoiceService->generateInvoicesForDueSubscriptions();

            $this->info("Invoice generation completed!");
            $this->info("Processed: {$stats['processed']} subscriptions");
            $this->info("Created: {$stats['created']} invoices");
            $this->info("Skipped: {$stats['skipped']} (duplicates)");
            
            if ($stats['errors'] > 0) {
                $this->warn("Errors: {$stats['errors']}");
            }

            // Log summary
            Log::info('Monthly invoice generation completed', $stats);

            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error('An error occurred during invoice generation: ' . $e->getMessage());
            Log::error('Invoice generation command failed', [
                'exception' => $e,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return Command::FAILURE;
        }
    }
}

