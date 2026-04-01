<?php

namespace App\Services;

use App\Models\MemberCredit;
use App\Models\MemberCreditTransaction;
use App\Models\MemberMembershipAssignment;
use App\Models\ActivityCreditCost;
use App\Models\Member;
use App\Models\Plan;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;

class MemberCreditService
{
    /**
     * Initialize credits for a membership assignment
     *
     * @param MemberMembershipAssignment $assignment
     * @return array
     * @throws Exception
     */
    public function initializeCreditsForMembership(MemberMembershipAssignment $assignment)
    {
        DB::beginTransaction();
        
        try {
            // Check if already initialized
            if ($assignment->credits_initialized) {
                DB::rollBack();
                return [
                    'success' => false,
                    'message' => 'Credits already initialized for this membership assignment'
                ];
            }

            // Get the plan
            $plan = $assignment->plan;
            if (!$plan) {
                DB::rollBack();
                return [
                    'success' => false,
                    'message' => 'Plan not found'
                ];
            }

            // Get membership_data
            $membershipData = $plan->membership_data;
            if (!$membershipData || !isset($membershipData['services']) || !is_array($membershipData['services'])) {
                DB::rollBack();
                return [
                    'success' => false,
                    'message' => 'No services found in membership plan'
                ];
            }

            $initializedCredits = [];
            $creditDistribution = $membershipData['credit_distribution'] ?? 'from_assign_date';

            // Calculate valid_from based on credit_distribution
            $validFrom = $assignment->start_date;
            if ($creditDistribution === 'from_assign_date') {
                $validFrom = Carbon::parse($assignment->start_date)->toDateString();
            } else {
                // Could be 'from_start_date' or other logic
                $validFrom = Carbon::parse($assignment->start_date)->toDateString();
            }

            // Process each service
            foreach ($membershipData['services'] as $service) {
                if (!isset($service['enabled']) || !$service['enabled']) {
                    continue;
                }

                $serviceId = $service['id'] ?? null;
                $serviceName = $service['name'] ?? 'Unknown Service';
                $amount = $service['amount'] ?? 0;

                if ($amount <= 0) {
                    continue; // Skip services with no credits
                }

                // Calculate valid_until based on validity settings
                $validityValue = $service['validity_value'] ?? 1;
                $validityUnit = $service['validity_unit'] ?? 'months';
                $validUntil = $this->calculateValidityDate($validFrom, $validityValue, $validityUnit);

                // Create member_credits record
                $memberCredit = MemberCredit::create([
                    'member_id' => $assignment->member_id,
                    'membership_assignment_id' => $assignment->id,
                    'service_id' => $serviceId,
                    'service_name' => $serviceName,
                    'total_credits' => $amount,
                    'used_credits' => 0,
                    'remaining_credits' => $amount,
                    'valid_from' => $validFrom,
                    'valid_until' => $validUntil,
                    'status' => 'active',
                    'gym_id' => $assignment->gym_id,
                ]);

                // Create initial allocation transaction
                MemberCreditTransaction::create([
                    'member_id' => $assignment->member_id,
                    'member_credit_id' => $memberCredit->id,
                    'transaction_type' => 'initial_allocation',
                    'amount' => $amount,
                    'balance_before' => 0,
                    'balance_after' => $amount,
                    'description' => "Initial credit allocation for {$serviceName}",
                    'related_type' => 'MemberMembershipAssignment',
                    'related_id' => $assignment->id,
                    'performed_by_type' => 'System',
                    'performed_by_id' => null,
                    'admin_override' => false,
                    'gym_id' => $assignment->gym_id,
                ]);

                $initializedCredits[] = $memberCredit;
            }

            // Mark assignment as initialized
            $assignment->update(['credits_initialized' => true]);

            DB::commit();

            return [
                'success' => true,
                'message' => 'Credits initialized successfully',
                'credits' => $initializedCredits
            ];

        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error initializing credits: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Error initializing credits: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Deduct credits for an activity completion
     *
     * @param int $memberId
     * @param string $activityType (appointment, schedule_event_booking)
     * @param int $activityId
     * @param float|null $creditCost Override default cost
     * @param bool $adminOverride
     * @return array
     */
    public function deductCreditsForActivity($memberId, $activityType, $activityId, $creditCost = null, $adminOverride = false)
    {
        DB::beginTransaction();

        try {
            // Get member's active membership assignment
            $assignment = MemberMembershipAssignment::where('member_id', $memberId)
                ->where('status', 'active')
                ->where(function ($query) {
                    $query->whereNull('end_date')
                        ->orWhere('end_date', '>=', now()->toDateString());
                })
                ->latest('start_date')
                ->first();

            if (!$assignment) {
                DB::rollBack();
                return [
                    'success' => false,
                    'message' => 'No active membership found for this member'
                ];
            }

            // Check if membership is expired
            if ($assignment->end_date && Carbon::parse($assignment->end_date)->isPast()) {
                DB::rollBack();
                return [
                    'success' => false,
                    'message' => 'Membership has expired'
                ];
            }

            // Get the activity to determine service type and cost
            $activity = $this->getActivity($activityType, $activityId);
            if (!$activity) {
                DB::rollBack();
                return [
                    'success' => false,
                    'message' => 'Activity not found'
                ];
            }

            // Check if credits already deducted (idempotent)
            if ($this->isCreditAlreadyDeducted($activityType, $activityId)) {
                DB::rollBack();
                return [
                    'success' => true,
                    'message' => 'Credits already deducted for this activity'
                ];
            }

            // Determine service type and credit cost
            $serviceInfo = $this->determineServiceAndCost($activityType, $activity, $creditCost, $memberId);
            if (!$serviceInfo) {
                DB::rollBack();
                return [
                    'success' => false,
                    'message' => 'Could not determine service type or credit cost'
                ];
            }

            $serviceName = $serviceInfo['service_name'];
            $serviceId = $serviceInfo['service_id'];
            $cost = $serviceInfo['cost'];

            // Get member credit for this service
            // Priority order:
            // 1. Exact service_id match in current assignment
            // 2. Any credit in current assignment
            // 3. Exact service_id match in any assignment (previous plans)
            // 4. Any valid credit from any assignment (previous plans)
            
            // Step 1: Try exact service_id match in current assignment
            $memberCredit = MemberCredit::where('member_id', $memberId)
                ->where('membership_assignment_id', $assignment->id)
                ->where('service_id', $serviceId)
                ->where('status', 'active')
                ->where('remaining_credits', '>', 0)
                ->where(function($query) {
                    $query->whereNull('valid_until')
                        ->orWhere('valid_until', '>=', now()->toDateString());
                })
                ->first();

            // Step 2: If not found by service_id, try matching by service name in current assignment
            if (!$memberCredit && $serviceName) {
                $memberCredit = MemberCredit::where('member_id', $memberId)
                    ->where('membership_assignment_id', $assignment->id)
                    ->where('service_name', $serviceName)
                    ->where('status', 'active')
                    ->where('remaining_credits', '>', 0)
                    ->where(function($query) {
                        $query->whereNull('valid_until')
                            ->orWhere('valid_until', '>=', now()->toDateString());
                    })
                    ->first();
                
                if ($memberCredit) {
                    // Update service info to match the found credit
                    $serviceName = $memberCredit->service_name;
                    $serviceId = $memberCredit->service_id;
                    Log::info('Matched service by name in current assignment', [
                        'requested_service' => $serviceInfo['service_name'],
                        'found_service' => $serviceName,
                        'service_id' => $serviceId,
                        'assignment_id' => $assignment->id
                    ]);
                }
            }

            // Step 2b: If still not found, try any active credit in current assignment (last resort for current assignment)
            if (!$memberCredit) {
                $memberCredit = MemberCredit::where('member_id', $memberId)
                    ->where('membership_assignment_id', $assignment->id)
                    ->where('status', 'active')
                    ->where('remaining_credits', '>', 0)
                    ->where(function($query) {
                        $query->whereNull('valid_until')
                            ->orWhere('valid_until', '>=', now()->toDateString());
                    })
                    ->first();
                
                if ($memberCredit) {
                    // Update service info to match the found credit
                    $serviceName = $memberCredit->service_name;
                    $serviceId = $memberCredit->service_id;
                    Log::info('Using credit from current assignment (different service - fallback)', [
                        'requested_service' => $serviceInfo['service_name'],
                        'found_service' => $serviceName,
                        'service_id' => $serviceId,
                        'assignment_id' => $assignment->id
                    ]);
                }
            }

            // Step 3: If still not found, try exact service_id match from any assignment (previous plans)
            if (!$memberCredit) {
                $memberCredit = MemberCredit::where('member_id', $memberId)
                    ->where('service_id', $serviceId)
                    ->where('status', 'active')
                    ->where('remaining_credits', '>', 0)
                    ->where(function($query) {
                        $query->whereNull('valid_until')
                            ->orWhere('valid_until', '>=', now()->toDateString());
                    })
                    ->orderBy('valid_until', 'desc') // Prefer credits that expire later
                    ->orderBy('created_at', 'desc') // Then prefer newer credits
                    ->first();
                
                if ($memberCredit) {
                    // Update service info to match the found credit
                    $serviceName = $memberCredit->service_name;
                    $serviceId = $memberCredit->service_id;
                    Log::info('Using credit from previous assignment (exact service match)', [
                        'requested_service' => $serviceInfo['service_name'],
                        'found_service' => $serviceName,
                        'service_id' => $serviceId,
                        'assignment_id' => $memberCredit->membership_assignment_id,
                        'note' => 'Member has credits from previous plan/assignment'
                    ]);
                }
            }

            // Step 4: Last resort - try any valid credit from any assignment (previous plans)
            if (!$memberCredit) {
                $memberCredit = MemberCredit::where('member_id', $memberId)
                    ->where('status', 'active')
                    ->where('remaining_credits', '>', 0)
                    ->where(function($query) {
                        $query->whereNull('valid_until')
                            ->orWhere('valid_until', '>=', now()->toDateString());
                    })
                    ->orderBy('valid_until', 'desc') // Prefer credits that expire later
                    ->orderBy('created_at', 'desc') // Then prefer newer credits
                    ->first();
                
                if ($memberCredit) {
                    // Update service info to match the found credit
                    $serviceName = $memberCredit->service_name;
                    $serviceId = $memberCredit->service_id;
                    Log::info('Using credit from previous assignment (any service)', [
                        'requested_service' => $serviceInfo['service_name'],
                        'found_service' => $serviceName,
                        'service_id' => $serviceId,
                        'assignment_id' => $memberCredit->membership_assignment_id,
                        'note' => 'Member has credits from previous plan/assignment - using available credits'
                    ]);
                }
            }

            if (!$memberCredit) {
                DB::rollBack();
                return [
                    'success' => false,
                    'message' => "No active credits found for service: {$serviceName}. Member may need to have credits for this service type in their membership, or credits may need to be initialized for the current assignment."
                ];
            }

            // Validate credit validity
            if (!$memberCredit->isValid()) {
                DB::rollBack();
                return [
                    'success' => false,
                    'message' => "Credits for {$serviceName} are expired or exhausted"
                ];
            }

            // Check sufficient credits
            if ($memberCredit->remaining_credits < $cost) {
                if (!$adminOverride) {
                    DB::rollBack();
                    return [
                        'success' => false,
                        'message' => "Insufficient credits. Required: {$cost}, Available: {$memberCredit->remaining_credits}",
                        'insufficient' => true
                    ];
                }
            }

            // Lock the row for update to prevent concurrent deductions
            $memberCredit = MemberCredit::where('id', $memberCredit->id)
                ->lockForUpdate()
                ->first();

            $balanceBefore = $memberCredit->remaining_credits;

            // Deduct credits
            $memberCredit->used_credits += $cost;
            $memberCredit->updateRemainingCredits();
            $balanceAfter = $memberCredit->remaining_credits;

            // Create transaction record
            $transaction = MemberCreditTransaction::create([
                'member_id' => $memberId,
                'member_credit_id' => $memberCredit->id,
                'transaction_type' => 'deduction',
                'amount' => -$cost, // Negative for deduction
                'balance_before' => $balanceBefore,
                'balance_after' => $balanceAfter,
                'description' => $this->getActivityDescription($activityType, $activity),
                'related_type' => $this->getActivityModelClass($activityType),
                'related_id' => $activityId,
                'performed_by_type' => $adminOverride ? 'Admin' : 'System',
                'performed_by_id' => $adminOverride ? auth()->id() : null,
                'admin_override' => $adminOverride,
                'gym_id' => $assignment->gym_id,
            ]);

            // Update activity record
            $this->markCreditDeducted($activityType, $activityId, $cost, $transaction->id);

            DB::commit();

            // Send notification (async)
            $this->sendCreditDeductionNotification($memberId, $serviceName, $cost, $balanceAfter);

            return [
                'success' => true,
                'message' => 'Credits deducted successfully',
                'transaction_id' => $transaction->id,
                'remaining_credits' => $balanceAfter
            ];

        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error deducting credits: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Error deducting credits: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Refund credits for a transaction
     *
     * @param int $transactionId
     * @param string|null $reason
     * @return array
     */
    public function refundCredits($transactionId, $reason = null)
    {
        DB::beginTransaction();

        try {
            $originalTransaction = MemberCreditTransaction::find($transactionId);
            if (!$originalTransaction || $originalTransaction->transaction_type !== 'deduction') {
                DB::rollBack();
                return [
                    'success' => false,
                    'message' => 'Invalid transaction for refund'
                ];
            }

            // Check if already refunded
            $existingRefund = MemberCreditTransaction::where('related_type', 'MemberCreditTransaction')
                ->where('related_id', $transactionId)
                ->where('transaction_type', 'refund')
                ->first();

            if ($existingRefund) {
                DB::rollBack();
                return [
                    'success' => false,
                    'message' => 'Transaction already refunded'
                ];
            }

            $memberCredit = $originalTransaction->memberCredit;
            if (!$memberCredit) {
                DB::rollBack();
                return [
                    'success' => false,
                    'message' => 'Member credit not found'
                ];
            }

            $refundAmount = abs($originalTransaction->amount);
            $balanceBefore = $memberCredit->remaining_credits;

            // Lock for update
            $memberCredit = MemberCredit::where('id', $memberCredit->id)
                ->lockForUpdate()
                ->first();

            // Refund credits
            $memberCredit->used_credits = max(0, $memberCredit->used_credits - $refundAmount);
            $memberCredit->updateRemainingCredits();
            $balanceAfter = $memberCredit->remaining_credits;

            // Create refund transaction
            $refundTransaction = MemberCreditTransaction::create([
                'member_id' => $originalTransaction->member_id,
                'member_credit_id' => $memberCredit->id,
                'transaction_type' => 'refund',
                'amount' => $refundAmount,
                'balance_before' => $balanceBefore,
                'balance_after' => $balanceAfter,
                'description' => $reason ?: "Refund for: {$originalTransaction->description}",
                'related_type' => 'MemberCreditTransaction',
                'related_id' => $transactionId,
                'performed_by_type' => 'Admin',
                'performed_by_id' => auth()->id(),
                'admin_override' => false,
                'gym_id' => $originalTransaction->gym_id,
            ]);

            DB::commit();

            return [
                'success' => true,
                'message' => 'Credits refunded successfully',
                'transaction_id' => $refundTransaction->id,
                'remaining_credits' => $balanceAfter
            ];

        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error refunding credits: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Error refunding credits: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Admin manual credit adjustment
     *
     * @param int $memberId
     * @param int $serviceId
     * @param float $amount (positive for addition, negative for deduction)
     * @param string $reason
     * @param int $adminId
     * @return array
     */
    public function adjustCredits($memberId, $serviceId, $amount, $reason, $adminId)
    {
        DB::beginTransaction();

        try {
            // Get active membership assignment
            $assignment = MemberMembershipAssignment::where('member_id', $memberId)
                ->where('status', 'active')
                ->latest('start_date')
                ->first();

            if (!$assignment) {
                DB::rollBack();
                return [
                    'success' => false,
                    'message' => 'No active membership found'
                ];
            }

            // Get member credit
            $memberCredit = MemberCredit::where('member_id', $memberId)
                ->where('membership_assignment_id', $assignment->id)
                ->where('service_id', $serviceId)
                ->where('status', 'active')
                ->first();

            // If credit doesn't exist, create it (for services in plan but not initialized)
            if (!$memberCredit) {
                $plan = $assignment->plan;
                $membershipData = $plan->membership_data ?? [];
                $services = $membershipData['services'] ?? [];
                
                // Find the service in plan
                $serviceData = null;
                foreach ($services as $service) {
                    if (isset($service['id']) && $service['id'] == $serviceId) {
                        $serviceData = $service;
                        break;
                    }
                }
                
                if (!$serviceData) {
                    DB::rollBack();
                    return [
                        'success' => false,
                        'message' => 'Service not found in membership plan'
                    ];
                }
                
                // Create credit record with 0 credits
                $validFrom = $assignment->start_date ? Carbon::parse($assignment->start_date)->toDateString() : now()->toDateString();
                $validityValue = $serviceData['validity_value'] ?? 1;
                $validityUnit = $serviceData['validity_unit'] ?? 'months';
                $validUntil = $this->calculateValidityDate($validFrom, $validityValue, $validityUnit);
                
                $memberCredit = MemberCredit::create([
                    'member_id' => $memberId,
                    'membership_assignment_id' => $assignment->id,
                    'service_id' => $serviceId,
                    'service_name' => $serviceData['name'] ?? 'Unknown Service',
                    'total_credits' => 0,
                    'used_credits' => 0,
                    'remaining_credits' => 0,
                    'valid_from' => $validFrom,
                    'valid_until' => $validUntil,
                    'status' => 'active',
                    'gym_id' => $assignment->gym_id,
                ]);
            }

            // Lock for update
            $memberCredit = MemberCredit::where('id', $memberCredit->id)
                ->lockForUpdate()
                ->first();

            $balanceBefore = $memberCredit->remaining_credits;

            // Adjust credits
            if ($amount > 0) {
                // Addition
                $memberCredit->total_credits += $amount;
            } else {
                // Deduction
                $memberCredit->used_credits += abs($amount);
            }

            $memberCredit->updateRemainingCredits();
            $balanceAfter = $memberCredit->remaining_credits;

            // Create adjustment transaction
            $transaction = MemberCreditTransaction::create([
                'member_id' => $memberId,
                'member_credit_id' => $memberCredit->id,
                'transaction_type' => 'adjustment',
                'amount' => $amount,
                'balance_before' => $balanceBefore,
                'balance_after' => $balanceAfter,
                'description' => $reason,
                'related_type' => 'Manual',
                'related_id' => null,
                'performed_by_type' => 'Admin',
                'performed_by_id' => $adminId,
                'admin_override' => false,
                'gym_id' => $assignment->gym_id,
            ]);

            DB::commit();

            return [
                'success' => true,
                'message' => 'Credits adjusted successfully',
                'transaction_id' => $transaction->id,
                'remaining_credits' => $balanceAfter
            ];

        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error adjusting credits: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Error adjusting credits: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Get member credit balance
     * Returns all services from the plan, even if they don't have credit records
     *
     * @param int $memberId
     * @param int|null $serviceId
     * @return array
     */
    public function getMemberCreditBalance($memberId, $serviceId = null)
    {
        // Get active membership assignment
        $assignment = MemberMembershipAssignment::where('member_id', $memberId)
            ->where('status', 'active')
            ->where(function ($query) {
                $query->whereNull('end_date')
                    ->orWhere('end_date', '>=', now()->toDateString());
            })
            ->latest('start_date')
            ->first();

        // Get existing credits
        $query = MemberCredit::where('member_id', $memberId)
            ->where('status', 'active');

        if ($serviceId) {
            $query->where('service_id', $serviceId);
        }

        $existingCredits = $query->get()->keyBy('service_id');

        $result = [];

        // If member has active assignment, include all services from plan
        if ($assignment && $assignment->plan) {
            $plan = $assignment->plan;
            $membershipData = $plan->membership_data;

            if ($membershipData && isset($membershipData['services']) && is_array($membershipData['services'])) {
                foreach ($membershipData['services'] as $service) {
                    // Only include enabled services
                    if (!isset($service['enabled']) || !$service['enabled']) {
                        continue;
                    }

                    $serviceIdValue = $service['id'] ?? null;
                    $serviceName = $service['name'] ?? 'Unknown Service';

                    // Skip if filtering by specific service_id
                    if ($serviceId && $serviceIdValue != $serviceId) {
                        continue;
                    }

                    // Check if credit record exists
                    if ($existingCredits->has($serviceIdValue)) {
                        // Use existing credit data
                        $credit = $existingCredits->get($serviceIdValue);
                        $result[] = [
                            'service_id' => $credit->service_id,
                            'service_name' => $credit->service_name,
                            'total_credits' => (float) $credit->total_credits,
                            'used_credits' => (float) $credit->used_credits,
                            'remaining_credits' => (float) $credit->remaining_credits,
                            'valid_from' => $credit->valid_from ? $credit->valid_from->toDateString() : null,
                            'valid_until' => $credit->valid_until ? $credit->valid_until->toDateString() : null,
                            'is_valid' => $credit->isValid(),
                            'has_credits' => true,
                        ];
                    } else {
                        // Service exists in plan but no credit record yet
                        $result[] = [
                            'service_id' => $serviceIdValue,
                            'service_name' => $serviceName,
                            'total_credits' => 0,
                            'used_credits' => 0,
                            'remaining_credits' => 0,
                            'valid_from' => $assignment->start_date ? Carbon::parse($assignment->start_date)->toDateString() : null,
                            'valid_until' => $assignment->end_date ? Carbon::parse($assignment->end_date)->toDateString() : null,
                            'is_valid' => false,
                            'has_credits' => false,
                        ];
                    }
                }
            }
        }

        // If no active assignment or no plan services, return existing credits only
        if (empty($result) && $existingCredits->count() > 0) {
            foreach ($existingCredits as $credit) {
                $result[] = [
                    'service_id' => $credit->service_id,
                    'service_name' => $credit->service_name,
                    'total_credits' => (float) $credit->total_credits,
                    'used_credits' => (float) $credit->used_credits,
                    'remaining_credits' => (float) $credit->remaining_credits,
                    'valid_from' => $credit->valid_from ? $credit->valid_from->toDateString() : null,
                    'valid_until' => $credit->valid_until ? $credit->valid_until->toDateString() : null,
                    'is_valid' => $credit->isValid(),
                    'has_credits' => true,
                ];
            }
        }

        return $result;
    }

    /**
     * Check if member has sufficient credits
     *
     * @param int $memberId
     * @param float $creditCost
     * @param int|null $serviceId
     * @return array
     */
    public function checkSufficientCredits($memberId, $creditCost, $serviceId = null)
    {
        $assignment = MemberMembershipAssignment::where('member_id', $memberId)
            ->where('status', 'active')
            ->where(function ($query) {
                $query->whereNull('end_date')
                    ->orWhere('end_date', '>=', now()->toDateString());
            })
            ->latest('start_date')
            ->first();

        if (!$assignment) {
            return [
                'sufficient' => false,
                'message' => 'No active membership found'
            ];
        }

        if ($serviceId) {
            $credit = MemberCredit::where('member_id', $memberId)
                ->where('membership_assignment_id', $assignment->id)
                ->where('service_id', $serviceId)
                ->where('status', 'active')
                ->first();

            if (!$credit || !$credit->isValid()) {
                return [
                    'sufficient' => false,
                    'message' => 'No valid credits found for this service'
                ];
            }

            return [
                'sufficient' => $credit->remaining_credits >= $creditCost,
                'available' => (float) $credit->remaining_credits,
                'required' => $creditCost,
                'message' => $credit->remaining_credits >= $creditCost 
                    ? 'Sufficient credits available' 
                    : "Insufficient credits. Required: {$creditCost}, Available: {$credit->remaining_credits}"
            ];
        }

        // Check all services
        $totalAvailable = MemberCredit::where('member_id', $memberId)
            ->where('membership_assignment_id', $assignment->id)
            ->where('status', 'active')
            ->sum('remaining_credits');

        return [
            'sufficient' => $totalAvailable >= $creditCost,
            'available' => (float) $totalAvailable,
            'required' => $creditCost,
            'message' => $totalAvailable >= $creditCost 
                ? 'Sufficient credits available' 
                : "Insufficient credits. Required: {$creditCost}, Available: {$totalAvailable}"
        ];
    }

    /**
     * Check if member has sufficient credits before creating an activity
     * This is used to prevent creation if credits are insufficient
     *
     * @param int $memberId
     * @param string $activityType (appointment, schedule_event_booking)
     * @param float|null $overrideCost Optional override cost from request
     * @param bool $adminOverride Whether admin override is enabled
     * @return array
     */
    public function checkCreditsBeforeActivityCreation($memberId, $activityType, $overrideCost = null, $adminOverride = false)
    {
        // If admin override, skip credit check
        if ($adminOverride) {
            return [
                'can_proceed' => true,
                'message' => 'Admin override enabled - credit check skipped'
            ];
        }

        // Determine credit cost
        $creditCost = $overrideCost;
        
        // If no override, get default cost from activity_credit_costs table
        if ($creditCost === null) {
            $defaultCost = ActivityCreditCost::where('activity_type', $activityType)
                ->where('is_active', true)
                ->value('default_credit_cost');
            
            if ($defaultCost !== null && $defaultCost > 0) {
                $creditCost = $defaultCost;
            } else {
                // Fallback to default cost based on activity type
                $creditCost = 1; // Default 1 credit if not configured
            }
        }

        // Check if member has sufficient credits
        $checkResult = $this->checkSufficientCredits($memberId, $creditCost);
        
        if (!$checkResult['sufficient']) {
            return [
                'can_proceed' => false,
                'message' => $checkResult['message'] . '. Please renew your membership plan to continue.',
                'insufficient' => true,
                'required' => $creditCost,
                'available' => $checkResult['available'] ?? 0
            ];
        }

        return [
            'can_proceed' => true,
            'message' => 'Sufficient credits available',
            'required' => $creditCost,
            'available' => $checkResult['available'] ?? 0
        ];
    }

    /**
     * Get credit transactions
     *
     * @param int $memberId
     * @param array $filters
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getCreditTransactions($memberId, $filters = [])
    {
        $query = MemberCreditTransaction::where('member_id', $memberId)
            ->with('memberCredit')
            ->orderBy('created_at', 'desc');

        if (isset($filters['transaction_type'])) {
            $query->where('transaction_type', $filters['transaction_type']);
        }

        if (isset($filters['service_id'])) {
            $query->whereHas('memberCredit', function ($q) use ($filters) {
                $q->where('service_id', $filters['service_id']);
            });
        }

        if (isset($filters['date_from'])) {
            $query->whereDate('created_at', '>=', $filters['date_from']);
        }

        if (isset($filters['date_to'])) {
            $query->whereDate('created_at', '<=', $filters['date_to']);
        }

        if (isset($filters['limit'])) {
            $query->limit($filters['limit']);
        }

        return $query->get();
    }

    /**
     * Calculate validity date
     *
     * @param string $startDate
     * @param int $value
     * @param string $unit (days, weeks, months, years)
     * @return string
     */
    private function calculateValidityDate($startDate, $value, $unit)
    {
        $date = Carbon::parse($startDate);

        switch ($unit) {
            case 'days':
                return $date->addDays($value)->toDateString();
            case 'weeks':
                return $date->addWeeks($value)->toDateString();
            case 'months':
                return $date->addMonths($value)->toDateString();
            case 'years':
                return $date->addYears($value)->toDateString();
            default:
                return $date->addMonths($value)->toDateString();
        }
    }

    /**
     * Get activity model instance
     *
     * @param string $activityType
     * @param int $activityId
     * @return mixed
     */
    private function getActivity($activityType, $activityId)
    {
        switch ($activityType) {
            case 'appointment':
                return \App\Models\Appointment::find($activityId);
            case 'schedule_event_booking':
                return \App\Models\ScheduleEventBooking::find($activityId);
            default:
                return null;
        }
    }

    /**
     * Check if credit already deducted
     *
     * @param string $activityType
     * @param int $activityId
     * @return bool
     */
    private function isCreditAlreadyDeducted($activityType, $activityId)
    {
        switch ($activityType) {
            case 'appointment':
                $appointment = \App\Models\Appointment::find($activityId);
                return $appointment && $appointment->credit_deducted;
            case 'schedule_event_booking':
                $booking = \App\Models\ScheduleEventBooking::find($activityId);
                return $booking && $booking->credit_deducted;
            default:
                return false;
        }
    }

    /**
     * Determine service and cost
     *
     * @param string $activityType
     * @param mixed $activity
     * @param float|null $overrideCost
     * @param int|null $memberId Optional member ID for service matching
     * @return array|null
     */
    private function determineServiceAndCost($activityType, $activity, $overrideCost = null, $memberId = null)
    {
        // Get service name and ID first (needed for all paths)
        $serviceName = $this->getServiceNameFromActivity($activityType, $activity, $memberId);
        $serviceId = $this->getServiceIdFromActivity($activityType, $activity, $memberId);

        // If override cost provided, use it
        if ($overrideCost !== null) {
            return [
                'service_name' => $serviceName,
                'service_id' => $serviceId,
                'cost' => $overrideCost
            ];
        }

        // Get cost from activity-specific field
        $activityCost = null;
        if ($activityType === 'appointment' && isset($activity->credit_cost)) {
            $activityCost = $activity->credit_cost;
        } elseif ($activityType === 'schedule_event_booking') {
            if (isset($activity->credit_cost)) {
                $activityCost = $activity->credit_cost;
            } elseif ($activity->scheduleEvent && isset($activity->scheduleEvent->credit_cost)) {
                $activityCost = $activity->scheduleEvent->credit_cost;
            }
        }

        if ($activityCost !== null && $activityCost > 0) {
            return [
                'service_name' => $serviceName,
                'service_id' => $serviceId,
                'cost' => $activityCost
            ];
        }

        // Get default cost from activity_credit_costs table
        $activitySubtype = $this->getActivitySubtype($activityType, $activity);

        $defaultCost = ActivityCreditCost::where('activity_type', $activityType)
            ->where('activity_subtype', $activitySubtype)
            ->where('is_active', true)
            ->value('default_credit_cost');

        if ($defaultCost !== null && $defaultCost > 0) {
            return [
                'service_name' => $serviceName,
                'service_id' => $serviceId,
                'cost' => $defaultCost
            ];
        }

        // If member has credits, try to get cost from member's service
        if ($memberId && $serviceId) {
            $memberCredit = MemberCredit::where('member_id', $memberId)
                ->where('service_id', $serviceId)
                ->where('status', 'active')
                ->first();
            
            // If we found the service, we can use a default cost
            // The actual cost should be set on the activity or in activity_credit_costs
        }

        // If no cost found, use default cost based on activity type
        $fallbackCost = 1; // Default 1 credit if not configured
        
        if ($activityType === 'appointment') {
            $fallbackCost = 1; // Default cost for appointments
        } elseif ($activityType === 'schedule_event_booking') {
            $fallbackCost = 1; // Default cost for classes
        }

        Log::warning('No credit cost configured for activity, using default', [
            'activity_type' => $activityType,
            'activity_id' => $activity->id ?? null,
            'service_id' => $serviceId,
            'default_cost' => $fallbackCost
        ]);

        return [
            'service_name' => $serviceName,
            'service_id' => $serviceId,
            'cost' => $fallbackCost
        ];
    }

    /**
     * Get service name from activity
     * 
     * Tries to determine the service name based on:
     * 1. Activity's service_id (if linked to a service)
     * 2. Activity type and common service names
     * 3. Default service names
     *
     * @param string $activityType
     * @param mixed $activity
     * @param int|null $memberId Optional member ID to check available services
     * @return string
     */
    private function getServiceNameFromActivity($activityType, $activity, $memberId = null)
    {
        // If activity has service_id, try to get service name from member's credits
        if ($memberId && $activityType === 'appointment' && isset($activity->service_id) && $activity->service_id) {
            $memberCredit = MemberCredit::where('member_id', $memberId)
                ->where('service_id', $activity->service_id)
                ->where('status', 'active')
                ->first();
            if ($memberCredit) {
                return $memberCredit->service_name;
            }
        } elseif ($memberId && $activityType === 'schedule_event_booking' && $activity->scheduleEvent) {
            if (isset($activity->scheduleEvent->service_id) && $activity->scheduleEvent->service_id) {
                $memberCredit = MemberCredit::where('member_id', $memberId)
                    ->where('service_id', $activity->scheduleEvent->service_id)
                    ->where('status', 'active')
                    ->first();
                if ($memberCredit) {
                    return $memberCredit->service_name;
                }
            }
        }

        // Default service names based on activity type
        if ($activityType === 'appointment') {
            return 'Personal training 1 hour'; // Default for appointments
        } elseif ($activityType === 'schedule_event_booking') {
            if ($activity->scheduleEvent && $activity->scheduleEvent->title) {
                // Try to match schedule event title to service name
                $eventTitle = $activity->scheduleEvent->title;
                
                // Common mappings
                if (stripos($eventTitle, 'group') !== false || stripos($eventTitle, 'class') !== false) {
                    return 'Group Classes';
                }
                
                return $eventTitle; // Use event title as service name
            }
            return 'Group Classes'; // Default for schedule events
        }
        return 'Unknown Service';
    }

    /**
     * Get service ID from activity
     * 
     * Priority:
     * 1. Check if activity has service_id explicitly set
     * 2. Try to match by service name from member's available credits
     * 3. Use intelligent matching based on activity type
     * 4. Fall back to default
     *
     * @param string $activityType
     * @param mixed $activity
     * @param int|null $memberId Optional member ID to check available services
     * @return int|null
     */
    private function getServiceIdFromActivity($activityType, $activity, $memberId = null)
    {
        // Priority 1: Check if activity has service_id explicitly set
        if ($activityType === 'appointment' && isset($activity->service_id) && $activity->service_id) {
            return $activity->service_id;
        } elseif ($activityType === 'schedule_event_booking' && $activity->scheduleEvent) {
            if (isset($activity->scheduleEvent->service_id) && $activity->scheduleEvent->service_id) {
                return $activity->scheduleEvent->service_id;
            }
        }

        // Priority 2: Try to match by service name from member's available credits
        if ($memberId) {
            $serviceName = $this->getServiceNameFromActivity($activityType, $activity);
            $memberCredit = MemberCredit::where('member_id', $memberId)
                ->where('service_name', $serviceName)
                ->where('status', 'active')
                ->where('remaining_credits', '>', 0)
                ->where(function($query) {
                    $query->whereNull('valid_until')
                        ->orWhere('valid_until', '>=', now()->toDateString());
                })
                ->first();
            
            if ($memberCredit) {
                Log::info('Matched service by name from member credits', [
                    'service_name' => $serviceName,
                    'service_id' => $memberCredit->service_id,
                    'activity_type' => $activityType
                ]);
                return $memberCredit->service_id;
            }
        }

        // Priority 3: Intelligent matching based on activity type and common service names
        $serviceName = $this->getServiceNameFromActivity($activityType, $activity);
        
        // Map common service names to service IDs (from create_membership.vue)
        $serviceNameToIdMap = [
            'Personal training 1 hour' => 5,
            'Personal training 30 mins' => 6,
            'Group Classes' => 3,
            'Cryo-therapy' => 2,
            'Infrared Sauna' => 4,
            'Compensation sleeves' => 1,
        ];

        if (isset($serviceNameToIdMap[$serviceName])) {
            return $serviceNameToIdMap[$serviceName];
        }

        // Priority 4: Default mapping based on activity type
        if ($activityType === 'appointment') {
            return 5; // Default: Personal training 1 hour
        } elseif ($activityType === 'schedule_event_booking') {
            return 3; // Default: Group Classes
        }

        return null; // Return null if no match found
    }

    /**
     * Get activity subtype
     *
     * @param string $activityType
     * @param mixed $activity
     * @return string
     */
    private function getActivitySubtype($activityType, $activity)
    {
        if ($activityType === 'appointment') {
            return 'Personal training 1 hour';
        } elseif ($activityType === 'schedule_event_booking') {
            return $activity->scheduleEvent ? $activity->scheduleEvent->title : 'Group Classes';
        }
        return 'Unknown';
    }

    /**
     * Get activity description
     *
     * @param string $activityType
     * @param mixed $activity
     * @return string
     */
    private function getActivityDescription($activityType, $activity)
    {
        if ($activityType === 'appointment') {
            return "PT session completed on " . ($activity->date ? $activity->date->format('Y-m-d') : 'N/A');
        } elseif ($activityType === 'schedule_event_booking') {
            $eventTitle = $activity->scheduleEvent ? $activity->scheduleEvent->title : 'Class';
            $eventDate = $activity->scheduleEvent && $activity->scheduleEvent->date 
                ? $activity->scheduleEvent->date->format('Y-m-d') 
                : 'N/A';
            return "{$eventTitle} completed on {$eventDate}";
        }
        return 'Activity completed';
    }

    /**
     * Get activity model class name
     *
     * @param string $activityType
     * @return string
     */
    private function getActivityModelClass($activityType)
    {
        switch ($activityType) {
            case 'appointment':
                return 'Appointment';
            case 'schedule_event_booking':
                return 'ScheduleEventBooking';
            default:
                return 'Unknown';
        }
    }

    /**
     * Mark credit as deducted on activity
     *
     * @param string $activityType
     * @param int $activityId
     * @param float $cost
     * @param int $transactionId
     * @return void
     */
    private function markCreditDeducted($activityType, $activityId, $cost, $transactionId)
    {
        switch ($activityType) {
            case 'appointment':
                \App\Models\Appointment::where('id', $activityId)->update([
                    'credit_deducted' => true,
                    'credit_cost' => $cost,
                    'credit_transaction_id' => $transactionId
                ]);
                break;
            case 'schedule_event_booking':
                \App\Models\ScheduleEventBooking::where('id', $activityId)->update([
                    'credit_deducted' => true,
                    'credit_cost' => $cost,
                    'credit_transaction_id' => $transactionId
                ]);
                break;
        }
    }

    /**
     * Send credit deduction notification
     *
     * @param int $memberId
     * @param string $serviceName
     * @param float $cost
     * @param float $remaining
     * @return void
     */
    private function sendCreditDeductionNotification($memberId, $serviceName, $cost, $remaining)
    {
        try {
            $member = Member::find($memberId);
            if (!$member) {
                return;
            }

            // Log the notification
            Log::info("Credit deduction notification", [
                'member_id' => $memberId,
                'member_name' => $member->membername,
                'service' => $serviceName,
                'cost' => $cost,
                'remaining' => $remaining
            ]);

            // Check for low balance warning (20% threshold)
            $memberCredits = MemberCredit::where('member_id', $memberId)
                ->where('status', 'active')
                ->get();

            foreach ($memberCredits as $credit) {
                if ($credit->total_credits > 0) {
                    $percentageRemaining = ($credit->remaining_credits / $credit->total_credits) * 100;
                    if ($percentageRemaining <= 20 && $percentageRemaining > 0) {
                        Log::info("Low credit balance warning", [
                            'member_id' => $memberId,
                            'service' => $credit->service_name,
                            'remaining' => $credit->remaining_credits,
                            'percentage' => $percentageRemaining
                        ]);
                        // TODO: Send low balance notification via NotificationService
                    }
                }
            }

            // TODO: Integrate with NotificationService for email/push notifications
            // Example:
            // if (class_exists('\App\Services\NotificationService')) {
            //     $notificationService = new \App\Services\NotificationService();
            //     $notificationService->sendCreditDeductionNotification($member, $serviceName, $cost, $remaining);
            // }
        } catch (\Exception $e) {
            Log::error('Error sending credit notification: ' . $e->getMessage());
        }
    }
}

