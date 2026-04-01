<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\MemberMembershipAssignment;
use App\Models\Plan;
use App\Models\MemberCredit;

class CheckCreditInitialization extends Command
{
    protected $signature = 'credits:check {--assignment-id= : Specific assignment ID to check}';
    protected $description = 'Check why credits are not being initialized for membership assignments';

    public function handle()
    {
        $assignmentId = $this->option('assignment-id');
        
        if ($assignmentId) {
            $assignments = MemberMembershipAssignment::where('id', $assignmentId)->get();
        } else {
            $assignments = MemberMembershipAssignment::where('status', 'active')
                ->where('credits_initialized', false)
                ->latest()
                ->take(10)
                ->get();
        }

        if ($assignments->isEmpty()) {
            $this->info('No assignments found to check.');
            return;
        }

        $this->info('Checking ' . $assignments->count() . ' assignment(s)...');
        $this->newLine();

        foreach ($assignments as $assignment) {
            $this->line("Assignment ID: {$assignment->id}");
            $this->line("Member ID: {$assignment->member_id}");
            $this->line("Plan ID: {$assignment->plan_id}");
            $this->line("Credits Initialized: " . ($assignment->credits_initialized ? 'Yes' : 'No'));
            
            $plan = $assignment->plan;
            if (!$plan) {
                $this->error("  ❌ Plan not found!");
                $this->newLine();
                continue;
            }

            $this->line("Plan Name: {$plan->name}");
            
            $membershipData = $plan->membership_data;
            if (!$membershipData) {
                $this->error("  ❌ Plan has no membership_data!");
                $this->line("  → Solution: Edit the plan and configure services with credits.");
            } elseif (!isset($membershipData['services']) || !is_array($membershipData['services'])) {
                $this->error("  ❌ Plan membership_data has no services array!");
                $this->line("  → Solution: Edit the plan and add services to membership_data.");
            } else {
                $services = $membershipData['services'];
                $enabledServices = array_filter($services, function($s) {
                    return isset($s['enabled']) && $s['enabled'];
                });
                
                $servicesWithCredits = array_filter($enabledServices, function($s) {
                    return isset($s['amount']) && $s['amount'] > 0;
                });

                $this->line("  Total services in plan: " . count($services));
                $this->line("  Enabled services: " . count($enabledServices));
                $this->line("  Services with credits > 0: " . count($servicesWithCredits));

                if (count($servicesWithCredits) === 0) {
                    $this->error("  ❌ No enabled services with credits > 0 found!");
                    $this->line("  → Solution: Enable services and set credit amounts > 0 in the plan.");
                } else {
                    $this->info("  ✓ Plan has " . count($servicesWithCredits) . " service(s) with credits:");
                    foreach ($servicesWithCredits as $service) {
                        $this->line("    - {$service['name']}: {$service['amount']} credits");
                    }
                    
                    // Check if credits exist
                    $credits = MemberCredit::where('membership_assignment_id', $assignment->id)->get();
                    if ($credits->isEmpty()) {
                        $this->error("  ❌ No credits found in member_credits table!");
                        $this->line("  → This means initialization failed. Check Laravel logs for errors.");
                    } else {
                        $this->info("  ✓ Credits found: " . $credits->count() . " record(s)");
                    }
                }
            }
            
            $this->newLine();
        }
    }
}

