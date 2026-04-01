<?php

namespace App\Services;

use App\Models\GymSubscription;
use App\Models\GymInvoice;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class InvoiceGenerationService
{
    /**
     * Generate invoices for all subscriptions that are due for billing
     *
     * @return array Statistics about the generation process
     */
    public function generateInvoicesForDueSubscriptions(): array
    {
        $stats = [
            'processed' => 0,
            'created' => 0,
            'skipped' => 0,
            'errors' => 0,
        ];

        // Get all active subscriptions that are due for billing
        $subscriptions = GymSubscription::active()
            ->dueForBilling()
            ->with(['plan', 'gym'])
            ->get();

        foreach ($subscriptions as $subscription) {
            try {
                $stats['processed']++;

                // Check if invoice already exists for this subscription and billing month
                $billingMonth = Carbon::parse($subscription->next_billing_date)->startOfMonth();
                
                $existingInvoice = GymInvoice::forSubscriptionAndMonth(
                    $subscription->id,
                    $billingMonth
                )->first();

                if ($existingInvoice) {
                    $stats['skipped']++;
                    Log::info("Invoice already exists for subscription {$subscription->id} and billing month {$billingMonth->format('Y-m')}");
                    continue;
                }

                // Create the invoice and advance billing date in a single transaction
                $result = $this->createInvoiceAndAdvanceBillingDate($subscription, $billingMonth);

                if ($result['success']) {
                    $stats['created']++;
                    Log::info("Created invoice {$result['invoice']->invoice_number} for subscription {$subscription->id}");
                } else {
                    $stats['errors']++;
                    Log::error("Failed to create invoice for subscription {$subscription->id}: {$result['error']}");
                }
            } catch (\Exception $e) {
                $stats['errors']++;
                Log::error("Error processing subscription {$subscription->id}: " . $e->getMessage(), [
                    'subscription_id' => $subscription->id,
                    'exception' => $e,
                ]);
            }
        }

        return $stats;
    }

    /**
     * Create an invoice for a subscription and advance billing date in a single transaction
     *
     * @param GymSubscription $subscription
     * @param Carbon $billingMonth
     * @return array ['success' => bool, 'invoice' => GymInvoice|null, 'error' => string|null]
     */
    protected function createInvoiceAndAdvanceBillingDate(GymSubscription $subscription, Carbon $billingMonth): array
    {
        try {
            return DB::transaction(function () use ($subscription, $billingMonth) {
                // Double-check for duplicate invoice within transaction (prevents race conditions)
                $existingInvoice = GymInvoice::forSubscriptionAndMonth(
                    $subscription->id,
                    $billingMonth
                )->lockForUpdate()->first();

                if ($existingInvoice) {
                    return [
                        'success' => false,
                        'invoice' => null,
                        'error' => 'Invoice already exists (duplicate check in transaction)'
                    ];
                }

                // Calculate due date (typically 30 days from billing date)
                $dueDate = Carbon::parse($subscription->next_billing_date)->addDays(30);

                // Create the invoice
                $invoice = GymInvoice::create([
                    'invoice_number' => GymInvoice::generateInvoiceNumber(),
                    'gym_id' => $subscription->gym_id,
                    'gym_subscription_id' => $subscription->id,
                    'amount' => $subscription->amount,
                    'billing_month' => $billingMonth,
                    'status' => 'pending',
                    'due_date' => $dueDate,
                    'description' => $this->generateInvoiceDescription($subscription, $billingMonth),
                ]);

                // Advance the billing date to next month
                $subscription->advanceBillingDate();

                return [
                    'success' => true,
                    'invoice' => $invoice,
                    'error' => null
                ];
            });
        } catch (\Exception $e) {
            Log::error("Failed to create invoice and advance billing date in transaction: " . $e->getMessage(), [
                'subscription_id' => $subscription->id,
                'billing_month' => $billingMonth->format('Y-m'),
                'exception' => $e,
            ]);
            return [
                'success' => false,
                'invoice' => null,
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Generate invoice description
     *
     * @param GymSubscription $subscription
     * @param Carbon $billingMonth
     * @return string
     */
    protected function generateInvoiceDescription(GymSubscription $subscription, Carbon $billingMonth): string
    {
        $planName = $subscription->plan ? $subscription->plan->name : 'Subscription Plan';
        $monthName = $billingMonth->format('F Y');
        
        return "Monthly subscription for {$planName} - {$monthName}";
    }
}

