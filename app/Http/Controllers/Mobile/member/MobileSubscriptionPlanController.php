<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Models\MemberMembershipAssignment;
use App\Models\Invoice;
use App\Services\MemberCreditService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MobileSubscriptionPlanController extends Controller
{
    /**
     * Get active membership assignment for a member
     *
     * @param int $memberId
     * @return MemberMembershipAssignment|null
     */
    private function getActiveMembershipAssignment($memberId)
    {
        return MemberMembershipAssignment::where('member_id', $memberId)
            ->where('status', 'active')
            ->where(function ($query) {
                $query->whereNull('end_date')
                    ->orWhere('end_date', '>=', now()->toDateString());
            })
            ->latest('start_date')
            ->first();
    }

    /**
     * Get plan from most recent invoice as fallback
     *
     * @param int $memberId
     * @return Plan|null
     */
    private function getPlanFromRecentInvoice($memberId)
    {
        $invoice = Invoice::where('member_id', $memberId)
            ->whereNotNull('subscription_plan_id')
            ->latest('created_at')
            ->first();

        if ($invoice && $invoice->subscription_plan_id) {
            return Plan::find($invoice->subscription_plan_id);
        }

        return null;
    }

    /**
     * Extract credits information from plan's membership_data
     *
     * @param Plan $plan
     * @return array
     */
    private function getCreditsFromPlan(Plan $plan)
    {
        $membershipData = $plan->membership_data;
        
        // Check if membership_data exists and has services array
        if (empty($membershipData) || !is_array($membershipData)) {
            return [
                'has_credits' => false,
                'credit_distribution' => null,
                'services' => []
            ];
        }
        
        // Check if services key exists and is an array
        if (!isset($membershipData['services']) || !is_array($membershipData['services'])) {
            return [
                'has_credits' => false,
                'credit_distribution' => $membershipData['credit_distribution'] ?? null,
                'services' => []
            ];
        }

        $services = [];
        foreach ($membershipData['services'] as $service) {
            // Check if service is enabled
            // Note: Services saved from frontend are already filtered to enabled ones,
            // so if 'enabled' field doesn't exist, we assume it's enabled
            $isEnabled = !isset($service['enabled']) || $service['enabled'] === true;
            
            // Get amount and ensure it's numeric and > 0
            $amount = isset($service['amount']) ? (float) $service['amount'] : 0;
            
            // Only include enabled services with credits > 0
            if ($isEnabled && $amount > 0) {
                $services[] = [
                    'id' => $service['id'] ?? null,
                    'name' => $service['name'] ?? 'Unknown Service',
                    'amount' => $amount,
                    'frequency_value' => $service['frequency_value'] ?? null,
                    'frequency_unit' => $service['frequency_unit'] ?? null,
                    'validity_value' => $service['validity_value'] ?? null,
                    'validity_unit' => $service['validity_unit'] ?? null,
                    'extra_of_start' => $service['extra_of_start'] ?? false,
                ];
            }
        }

        return [
            'has_credits' => count($services) > 0,
            'credit_distribution' => $membershipData['credit_distribution'] ?? null,
            'services' => $services
        ];
    }

    /**
     * Get member's current subscription plan and features
     */
    public function myPlan(Request $request)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            // Get member record from members table using email
            $member = DB::table('members')
                ->where('email', $user->email)
                ->first();

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member record not found',
                    'data' => null
                ], 404);
            }

            // Get active membership assignment (source of truth)
            $assignment = $this->getActiveMembershipAssignment($member->id);

            // Debug information (temporary)
            $invoicePlan = $this->getPlanFromRecentInvoice($member->id);
            $debugInfo = [
                'member_id' => $member->id,
                'member_subscription_id' => $member->subscription_id,
                'has_active_assignment' => !empty($assignment),
                'assignment_plan_id' => $assignment && $assignment->plan ? $assignment->plan->id : null,
                'assignment_plan_name' => $assignment && $assignment->plan ? $assignment->plan->name : null,
                'assignment_status' => $assignment ? $assignment->status : null,
                'assignment_start_date' => $assignment ? $assignment->start_date->format('Y-m-d') : null,
                'assignment_end_date' => $assignment && $assignment->end_date ? $assignment->end_date->format('Y-m-d') : null,
                'invoice_plan_id' => $invoicePlan ? $invoicePlan->id : null,
                'invoice_plan_name' => $invoicePlan ? $invoicePlan->name : null,
                'plan_source' => $assignment ? 'assignment' : ($invoicePlan ? 'invoice' : 'subscription_id'),
            ];

            // Fallback logic: Try assignment -> invoice -> subscription_id
            if (!$assignment) {
                // Try to get plan from most recent invoice
                $plan = $this->getPlanFromRecentInvoice($member->id);
                
                // If no plan from invoice, try subscription_id
                if (!$plan && $member->subscription_id) {
                    $plan = Plan::find($member->subscription_id);
                }

                if (!$plan) {
                    return response()->json([
                        'success' => false,
                        'message' => 'No subscription plan found',
                        'data' => null
                    ], 404);
                }

                // Use member's Expires field for expiry check
                $isExpired = false;
                $daysUntilExpiry = null;
                $isExpiringSoon = false;

                if ($member->Expires) {
                    $expiryDate = Carbon::parse($member->Expires);
                    $isExpired = $expiryDate->isPast();
                    $daysUntilExpiry = $isExpired ? null : $expiryDate->diffInDays(Carbon::now());
                    $isExpiringSoon = !$isExpired && $daysUntilExpiry !== null && $daysUntilExpiry <= 7;
                }

                $expiresAt = $member->Expires;
            } else {
                // Use assignment's plan and dates
                $plan = $assignment->plan;
                if (!$plan) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Plan not found for active assignment',
                        'data' => null
                    ], 404);
                }

                // Check if assignment has expired
                $isExpired = false;
                $daysUntilExpiry = null;
                $isExpiringSoon = false;

                if ($assignment->end_date) {
                    $expiryDate = Carbon::parse($assignment->end_date);
                    $isExpired = $expiryDate->isPast();
                    $daysUntilExpiry = $isExpired ? null : $expiryDate->diffInDays(Carbon::now());
                    $isExpiringSoon = !$isExpired && $daysUntilExpiry !== null && $daysUntilExpiry <= 7;
                } else {
                    // No end date means ongoing
                    $isExpired = false;
                }

                $expiresAt = $assignment->end_date ? $assignment->end_date->format('Y-m-d') : null;
            }

            // Extract credits information
            $creditsInfo = $this->getCreditsFromPlan($plan);

            $transformedPlan = [
                'id' => $plan->id,
                'name' => $plan->name,
                'price' => $plan->price,
                'monthly_price' => $plan->price, // For backward compatibility
                'interval' => $plan->interval,
                'features' => $plan->features ?? [],
                'is_active' => $plan->is_active,
                'subscription_status' => $isExpired ? 'expired' : 'active',
                'expires_at' => $expiresAt,
                'days_until_expiry' => $daysUntilExpiry,
                'is_expiring_soon' => $isExpiringSoon,
                'plan_type' => $member->plan ?? null,
                'created_at' => $assignment ? $assignment->start_date->format('Y-m-d') : ($member->member_since ?? $member->created_at),
                'credits' => $creditsInfo,
            ];

            // Add debug info temporarily
            $transformedPlan['_debug'] = $debugInfo;

            return response()->json([
                'success' => true,
                'data' => $transformedPlan,
                'message' => 'Subscription plan fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch subscription plan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all available subscription plans for the member's gym
     */
    public function index(Request $request)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            // Get member record from members table using email
            $member = DB::table('members')
                ->where('email', $user->email)
                ->first();

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member record not found'
                ], 404);
            }

            // Get active membership assignment to determine current plan
            $assignment = $this->getActiveMembershipAssignment($member->id);
            $currentPlanId = $assignment && $assignment->plan ? $assignment->plan->id : ($member->subscription_id ?? null);

            // Get all active plans from plans table
            $plans = Plan::where('is_active', true)
                ->orderBy('sort_order', 'asc')
                ->orderBy('price', 'asc')
                ->get();

            // Transform plans for mobile app
            $transformedPlans = $plans->map(function ($plan) use ($currentPlanId) {
                // Check if this is the member's current plan
                $isMyPlan = $currentPlanId == $plan->id;

                // Extract credits information
                $creditsInfo = $this->getCreditsFromPlan($plan);

                return [
                    'id' => $plan->id,
                    'name' => $plan->name,
                    'price' => $plan->price,
                    'monthly_price' => $plan->price, // For backward compatibility
                    'interval' => $plan->interval,
                    'features' => $plan->features ?? [],
                    'is_my_current_plan' => $isMyPlan,
                    'created_at' => $plan->created_at->format('Y-m-d H:i:s'),
                    'updated_at' => $plan->updated_at->format('Y-m-d H:i:s'),
                    'credits' => $creditsInfo,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedPlans,
                'message' => 'Subscription plans fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch subscription plans',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get details of a specific subscription plan
     */
    public function show(Request $request, $id)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            // Get member record from members table using email
            $member = DB::table('members')
                ->where('email', $user->email)
                ->first();

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member record not found'
                ], 404);
            }

            // Get the plan from plans table
            $plan = Plan::where('id', $id)
                ->where('is_active', true)
                ->first();

            if (!$plan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Plan not found'
                ], 404);
            }

            // Get active membership assignment to determine current plan
            $assignment = $this->getActiveMembershipAssignment($member->id);
            $currentPlanId = $assignment && $assignment->plan ? $assignment->plan->id : ($member->subscription_id ?? null);

            // Check if this is the member's current plan
            $isMyPlan = $currentPlanId == $plan->id;

            // Extract credits information
            $creditsInfo = $this->getCreditsFromPlan($plan);

            $transformedPlan = [
                'id' => $plan->id,
                'name' => $plan->name,
                'price' => $plan->price,
                'monthly_price' => $plan->price, // For backward compatibility
                'interval' => $plan->interval,
                'features' => $plan->features ?? [],
                'is_my_current_plan' => $isMyPlan,
                'feature_count' => count($plan->features ?? []),
                'created_at' => $plan->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $plan->updated_at->format('Y-m-d H:i:s'),
                'credits' => $creditsInfo,
            ];

            return response()->json([
                'success' => true,
                'data' => $transformedPlan,
                'message' => 'Subscription plan details fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch subscription plan details',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get subscription plan statistics for the member
     */
    public function statistics(Request $request)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            // Get member record from members table using email
            $member = DB::table('members')
                ->where('email', $user->email)
                ->first();

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member record not found'
                ], 404);
            }

            // Get active membership assignment (source of truth)
            $assignment = $this->getActiveMembershipAssignment($member->id);
            $currentPlan = null;
            $hasActivePlan = false;
            $isExpired = false;
            $daysUntilExpiry = null;
            $expiresAt = null;

            if ($assignment && $assignment->plan) {
                $currentPlan = $assignment->plan;
                $hasActivePlan = true;
                
                if ($assignment->end_date) {
                    $expiryDate = Carbon::parse($assignment->end_date);
                    $isExpired = $expiryDate->isPast();
                    $daysUntilExpiry = $isExpired ? null : $expiryDate->diffInDays(Carbon::now());
                    $expiresAt = $assignment->end_date->format('Y-m-d');
                } else {
                    // No end date means ongoing
                    $isExpired = false;
                }
            } elseif ($member->subscription_id) {
                // Fallback to subscription_id
                $currentPlan = Plan::find($member->subscription_id);
                
                if ($currentPlan && $member->Expires) {
                    $expiryDate = Carbon::parse($member->Expires);
                    $hasActivePlan = true;
                    $isExpired = $expiryDate->isPast();
                    $daysUntilExpiry = $isExpired ? null : $expiryDate->diffInDays(Carbon::now());
                    $expiresAt = $member->Expires;
                }
            }

            // Get total active plans available
            $totalPlans = Plan::where('is_active', true)
                ->count();

            return response()->json([
                'success' => true,
                'data' => [
                    'has_active_subscription' => $hasActivePlan && !$isExpired,
                    'is_expired' => $isExpired,
                    'current_plan_id' => $currentPlan ? $currentPlan->id : null,
                    'current_plan_name' => $currentPlan ? $currentPlan->name : null,
                    'subscription_expires_at' => $expiresAt,
                    'days_until_expiry' => $daysUntilExpiry,
                    'is_expiring_soon' => !$isExpired && $daysUntilExpiry !== null && $daysUntilExpiry <= 7,
                    'total_available_plans' => $totalPlans,
                ],
                'message' => 'Subscription statistics fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch subscription statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get available features list
     */
    public function getFeatures()
    {
        try {
            $features = [
                "Gym Access",
                "Locker Room",
                "Group Classes",
                "Personal Trainer",
                "24/7 Access",
                "Sauna Access",
                "Nutrition Plan",
                "Guest Pass"
            ];

            return response()->json([
                'success' => true,
                'data' => $features,
                'message' => 'Available features fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch available features',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all available services list
     *
     * @return array
     */
    private function getAllAvailableServices()
    {
        return [
            ['id' => 1, 'name' => 'Compensation sleeves'],
            ['id' => 2, 'name' => 'Cryo-therapy'],
            ['id' => 3, 'name' => 'Group Classes'],
            ['id' => 4, 'name' => 'Infrared Sauna'],
            ['id' => 5, 'name' => 'Personal training 1 hour'],
            ['id' => 6, 'name' => 'Personal training 30 mins'],
        ];
    }

    /**
     * Get credits from member's current subscription plan
     * Returns ALL services with their credit amounts (0 if not configured)
     */
    public function extractCreditsFromPlan(Request $request)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            // Get member record from members table using email
            $member = DB::table('members')
                ->where('email', $user->email)
                ->first();

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member record not found',
                    'credits' => [
                        'has_credits' => false,
                        'credit_distribution' => null,
                        'services' => []
                    ]
                ], 404);
            }

            // Get active membership assignment (source of truth)
            $assignment = $this->getActiveMembershipAssignment($member->id);

            // Use same priority logic as myPlan(): assignment -> invoice -> subscription_id
            $plan = null;
            if ($assignment && $assignment->plan) {
                $plan = $assignment->plan;
            } else {
                // Try to get plan from most recent invoice
                $plan = $this->getPlanFromRecentInvoice($member->id);
                
                // If no plan from invoice, try subscription_id
                if (!$plan && $member->subscription_id) {
                    $plan = Plan::find($member->subscription_id);
                }
            }

            // Get actual credit balances from MemberCreditService
            $creditService = new MemberCreditService();
            $actualCredits = $creditService->getMemberCreditBalance($member->id);
            
            // Index actual credits by service_id for quick lookup
            $actualCreditsByServiceId = [];
            foreach ($actualCredits as $credit) {
                $actualCreditsByServiceId[$credit['service_id']] = $credit;
            }

            // Get all available services
            $allServices = $this->getAllAvailableServices();
            
            // Get plan's membership_data if plan exists
            $planServices = [];
            $creditDistribution = null;
            
            if ($plan) {
                $membershipData = $plan->membership_data;
                if ($membershipData && isset($membershipData['services']) && is_array($membershipData['services'])) {
                    $planServices = $membershipData['services'];
                    $creditDistribution = $membershipData['credit_distribution'] ?? null;
                }
            }

            // Build services array with actual credit balances
            $services = [];
            foreach ($allServices as $service) {
                $serviceId = $service['id'];
                $serviceName = $service['name'];
                
                // Find matching service in plan's services
                $planService = null;
                foreach ($planServices as $ps) {
                    if (isset($ps['id']) && $ps['id'] == $serviceId) {
                        $planService = $ps;
                        break;
                    }
                }

                // Get plan configuration
                $frequency_value = null;
                $frequency_unit = null;
                $validity_value = null;
                $validity_unit = null;
                $extra_of_start = false;

                if ($planService) {
                        $frequency_value = $planService['frequency_value'] ?? null;
                        $frequency_unit = $planService['frequency_unit'] ?? null;
                        $validity_value = $planService['validity_value'] ?? null;
                        $validity_unit = $planService['validity_unit'] ?? null;
                        $extra_of_start = $planService['extra_of_start'] ?? false;
                }

                // Get actual credit balance if available
                $actualCredit = $actualCreditsByServiceId[$serviceId] ?? null;
                
                if ($actualCredit) {
                    // Use actual credit balance from member_credits table
                    $services[] = [
                        'id' => $serviceId,
                        'name' => $serviceName,
                        'amount' => (float) $actualCredit['remaining_credits'], // Show remaining credits
                        'total_credits' => (float) $actualCredit['total_credits'],
                        'used_credits' => (float) $actualCredit['used_credits'],
                        'remaining_credits' => (float) $actualCredit['remaining_credits'],
                        'valid_from' => $actualCredit['valid_from'],
                        'valid_until' => $actualCredit['valid_until'],
                        'is_valid' => $actualCredit['is_valid'],
                        'frequency_value' => $frequency_value,
                        'frequency_unit' => $frequency_unit,
                        'validity_value' => $validity_value,
                        'validity_unit' => $validity_unit,
                        'extra_of_start' => $extra_of_start,
                    ];
                } else {
                    // No actual credits record - credits not initialized or service not in plan
                    $planAmount = 0;
                    if ($planService) {
                        $isEnabled = !isset($planService['enabled']) || $planService['enabled'] === true;
                        if ($isEnabled && isset($planService['amount']) && $planService['amount'] > 0) {
                            $planAmount = (float) $planService['amount'];
                    }
                }

                $services[] = [
                    'id' => $serviceId,
                    'name' => $serviceName,
                        'amount' => 0, // Show 0 remaining if no credit record exists
                        'total_credits' => $planAmount, // Show plan amount as total
                        'used_credits' => 0,
                        'remaining_credits' => 0, // No credits available if no record
                        'valid_from' => null,
                        'valid_until' => null,
                        'is_valid' => false,
                    'frequency_value' => $frequency_value,
                    'frequency_unit' => $frequency_unit,
                    'validity_value' => $validity_value,
                    'validity_unit' => $validity_unit,
                    'extra_of_start' => $extra_of_start,
                ];
                }
            }

            // Check if any service has remaining credits > 0
            $hasCredits = false;
            foreach ($services as $service) {
                if (isset($service['remaining_credits']) && $service['remaining_credits'] > 0) {
                    $hasCredits = true;
                    break;
                } elseif (isset($service['amount']) && $service['amount'] > 0) {
                    $hasCredits = true;
                    break;
                }
            }

            return response()->json([
                'success' => true,
                'credits' => [
                    'has_credits' => $hasCredits,
                    'credit_distribution' => $creditDistribution,
                    'services' => $services
                ],
                'message' => 'Credits fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch credits',
                'error' => $e->getMessage(),
                'credits' => [
                    'has_credits' => false,
                    'credit_distribution' => null,
                    'services' => []
                ]
            ], 500);
        }
    }
}

