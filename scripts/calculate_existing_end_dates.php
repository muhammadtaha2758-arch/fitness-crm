<?php

/**
 * Script to calculate and update end dates for existing memberships
 * Run this once after migration to populate calculated_end_date for existing memberships
 * 
 * Usage: php artisan tinker < scripts/calculate_existing_end_dates.php
 * Or: php scripts/calculate_existing_end_dates.php (if run standalone)
 */

require __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\MemberMembershipAssignment;
use App\Models\Plan;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

echo "==========================================\n";
echo "Calculate End Dates for Existing Memberships\n";
echo "==========================================\n\n";

// Get all active memberships without calculated_end_date
$memberships = MemberMembershipAssignment::where('status', 'active')
    ->whereNull('calculated_end_date')
    ->with('plan')
    ->get();

echo "Found {$memberships->count()} active memberships without calculated_end_date\n\n";

if ($memberships->count() === 0) {
    echo "No memberships to update. Exiting.\n";
    exit(0);
}

$updated = 0;
$skipped = 0;
$errors = 0;

foreach ($memberships as $membership) {
    try {
        // Skip if no plan
        if (!$membership->plan) {
            echo "⚠️  Membership #{$membership->id}: No plan assigned, skipping...\n";
            $skipped++;
            continue;
        }

        // Skip if no start_date
        if (!$membership->start_date) {
            echo "⚠️  Membership #{$membership->id}: No start_date, skipping...\n";
            $skipped++;
            continue;
        }

        // Calculate end date
        $calculatedEndDate = $membership->plan->calculateEndDate($membership->start_date);
        
        // Update membership
        $membership->update(['calculated_end_date' => $calculatedEndDate]);
        
        echo "✅ Membership #{$membership->id}: Calculated end date = {$calculatedEndDate}\n";
        $updated++;
        
    } catch (\Exception $e) {
        echo "❌ Membership #{$membership->id}: Error - {$e->getMessage()}\n";
        $errors++;
    }
}

echo "\n==========================================\n";
echo "Summary:\n";
echo "  Updated: {$updated}\n";
echo "  Skipped: {$skipped}\n";
echo "  Errors: {$errors}\n";
echo "==========================================\n";


