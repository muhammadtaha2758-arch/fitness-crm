<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\MemberMembershipAssignment;
use App\Services\MemberCreditService;

class InitializeCreditsForExistingAssignments extends Command
{
    protected $signature = 'credits:initialize-existing {--assignment-id= : Specific assignment ID to initialize}';
    protected $description = 'Initialize credits for existing membership assignments that haven\'t been initialized yet';

    protected $creditService;

    public function __construct(MemberCreditService $creditService)
    {
        parent::__construct();
        $this->creditService = $creditService;
    }

    public function handle()
    {
        $assignmentId = $this->option('assignment-id');
        
        if ($assignmentId) {
            $assignments = MemberMembershipAssignment::where('id', $assignmentId)
                ->where('status', 'active')
                ->where('credits_initialized', false)
                ->get();
        } else {
            $assignments = MemberMembershipAssignment::where('status', 'active')
                ->where('credits_initialized', false)
                ->get();
        }

        if ($assignments->isEmpty()) {
            $this->info('No assignments found that need credit initialization.');
            return Command::SUCCESS;
        }

        $this->info('Found ' . $assignments->count() . ' assignment(s) that need credit initialization.');
        $this->newLine();

        $successCount = 0;
        $failCount = 0;

        foreach ($assignments as $assignment) {
            $this->line("Processing Assignment ID: {$assignment->id}");
            $this->line("  Member ID: {$assignment->member_id}");
            $this->line("  Plan ID: {$assignment->plan_id}");
            
            $plan = $assignment->plan;
            if (!$plan) {
                $this->error("  ❌ Plan not found!");
                $failCount++;
                continue;
            }

            $this->line("  Plan Name: {$plan->name}");

            $result = $this->creditService->initializeCreditsForMembership($assignment);

            if ($result['success']) {
                $this->info("  ✓ Credits initialized successfully!");
                if (isset($result['credits']) && is_array($result['credits'])) {
                    $this->line("  Created " . count($result['credits']) . " credit record(s)");
                }
                $successCount++;
            } else {
                $this->error("  ❌ Failed: " . $result['message']);
                $failCount++;
            }
            
            $this->newLine();
        }

        $this->info("Summary:");
        $this->info("  Successfully initialized: {$successCount}");
        if ($failCount > 0) {
            $this->error("  Failed: {$failCount}");
        }

        return Command::SUCCESS;
    }
}

