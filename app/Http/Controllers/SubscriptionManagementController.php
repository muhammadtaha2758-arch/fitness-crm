<?php

namespace App\Http\Controllers;

use App\Models\MemberMembershipAssignment;
use App\Models\Member;
use App\Models\Plan;
use App\Services\NotificationService;
use App\Models\MemberMessage;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class SubscriptionManagementController extends Controller
{
    /**
     * Get expiring subscriptions
     */
    public function getExpiringSubscriptions(Request $request)
    {
        try {
            $days = (int) $request->get('days', 7);
            $gymId = $request->user('api')->gym_id ?? 1;
            
            $memberships = MemberMembershipAssignment::where('status', 'active')
                ->whereHas('member', function($query) use ($gymId) {
                    $query->where('gym_id', $gymId);
                })
                ->with(['member', 'plan', 'coach'])
                ->get()
                ->filter(function($membership) use ($days) {
                    // Calculate end date if not set
                    if (!$membership->calculated_end_date && $membership->plan) {
                        $calculatedEndDate = $membership->plan->calculateEndDate($membership->start_date);
                        $membership->update(['calculated_end_date' => $calculatedEndDate]);
                    }
                    
                    $endDate = $membership->calculated_end_date ?? $membership->end_date;
                    
                    if (!$endDate) {
                        return false;
                    }
                    
                    $daysUntilExpiry = Carbon::parse($endDate)->diffInDays(now(), false);
                    return $daysUntilExpiry >= 0 && $daysUntilExpiry <= $days;
                })
                ->map(function($membership) {
                    $endDate = $membership->calculated_end_date ?? $membership->end_date;
                    return [
                        'id' => $membership->id,
                        'member' => [
                            'id' => $membership->member->id,
                            'name' => $membership->member->membername,
                            'email' => $membership->member->email,
                            'phone' => $membership->member->mobile_phone,
                        ],
                        'plan' => [
                            'id' => $membership->plan->id ?? null,
                            'name' => $membership->plan->name ?? $membership->package_name,
                        ],
                        'start_date' => $membership->start_date,
                        'end_date' => $endDate,
                        'days_until_expiry' => Carbon::parse($endDate)->diffInDays(now(), false),
                        'status' => $membership->getStatus(),
                        'reminder_sent' => $membership->renewal_reminder_sent,
                        'reminder_count' => $membership->reminder_count,
                    ];
                })
                ->values();
            
            return response()->json([
                'success' => true,
                'data' => $memberships,
                'count' => $memberships->count()
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching expiring subscriptions: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching expiring subscriptions: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Get expired subscriptions
     */
    public function getExpiredSubscriptions(Request $request)
    {
        try {
            $gymId = $request->user('api')->gym_id ?? 1;
            
            // Check if calculated_end_date column exists
            $hasCalculatedEndDate = Schema::hasColumn('member_membership_assignments', 'calculated_end_date');
            
            $memberships = MemberMembershipAssignment::where(function($query) use ($hasCalculatedEndDate) {
                    $query->where('status', 'expired')
                        ->orWhere(function($q) use ($hasCalculatedEndDate) {
                            $q->where('status', 'active')
                                ->where(function($subQ) use ($hasCalculatedEndDate) {
                                    if ($hasCalculatedEndDate) {
                                        $subQ->where(function($dateQ) {
                                            $dateQ->whereRaw('calculated_end_date < CURDATE()')
                                                  ->orWhereRaw('(calculated_end_date IS NULL AND end_date < CURDATE())');
                                        });
                                    } else {
                                        $subQ->whereRaw('end_date < CURDATE()');
                                    }
                                });
                        });
                })
                ->whereHas('member', function($query) use ($gymId) {
                    $query->where('gym_id', $gymId);
                })
                ->with(['member', 'plan', 'coach'])
                ->get()
                ->map(function($membership) {
                    $endDate = $membership->calculated_end_date ?? $membership->end_date;
                    $daysExpired = $endDate ? Carbon::parse($endDate)->diffInDays(now(), false) * -1 : 0;
                    
                    return [
                        'id' => $membership->id,
                        'member' => [
                            'id' => $membership->member->id,
                            'name' => $membership->member->membername,
                            'email' => $membership->member->email,
                            'phone' => $membership->member->mobile_phone,
                        ],
                        'plan' => [
                            'id' => $membership->plan->id ?? null,
                            'name' => $membership->plan->name ?? $membership->package_name,
                        ],
                        'end_date' => $endDate,
                        'days_expired' => $daysExpired,
                        'status' => $membership->getStatus(),
                    ];
                });
            
            return response()->json([
                'success' => true,
                'data' => $memberships,
                'count' => $memberships->count()
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching expired subscriptions: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching expired subscriptions: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Send reminder for a subscription
     */
    public function sendReminder(Request $request, $id)
    {
        try {
            $membership = MemberMembershipAssignment::with(['member', 'plan'])->findOrFail($id);
            $member = $membership->member;
            $plan = $membership->plan;
            
            $endDate = $membership->calculated_end_date ?? $membership->end_date;
            if (!$endDate) {
                return response()->json([
                    'success' => false,
                    'message' => 'Subscription end date not found'
                ], 400);
            }
            
            $daysUntilExpiry = Carbon::parse($endDate)->diffInDays(now(), false);
            $formattedEndDate = Carbon::parse($endDate)->format('F d, Y');
            $planName = $plan ? $plan->name : ($membership->package_name ?? 'Subscription');
            
            // Create admin notification
            NotificationService::createForAdmins(
                'subscription_expiring',
                'Subscription Expiring Soon',
                "Member {$member->membername} subscription expires in {$daysUntilExpiry} days",
                'fa-calendar-times',
                'warning',
                'MemberMembershipAssignment',
                $membership->id,
                $member->gym_id ?? 1
            );
            
            // Create member notification
            NotificationService::createForMember(
                $member->id,
                'subscription_expiring',
                'Your Subscription Expires Soon',
                "Your {$planName} subscription expires in {$daysUntilExpiry} days. Please renew to continue enjoying our services.",
                'fa-calendar-times',
                'warning',
                'MemberMembershipAssignment',
                $membership->id
            );
            
            // Send message to member
            $messageContent = "Hello " . ($member->firstname ?? $member->membername) . ",\n\n" .
                "Your {$planName} subscription will expire in {$daysUntilExpiry} days (on {$formattedEndDate}).\n\n" .
                "Please renew your subscription to continue enjoying our services.\n\n" .
                "Thank you!";
            
            MemberMessage::create([
                'gym_id' => $member->gym_id ?? 1,
                'sender_member_id' => null,
                'receiver_member_id' => $member->id,
                'message_text' => $messageContent,
                'sent_date' => now()
            ]);
            
            // Update membership record
            $membership->update([
                'renewal_reminder_sent' => true,
                'last_reminder_sent_at' => now(),
                'reminder_count' => $membership->reminder_count + 1
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Reminder sent successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error sending reminder: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error sending reminder: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Renew subscription
     */
    public function renewSubscription(Request $request, $id)
    {
        try {
            $membership = MemberMembershipAssignment::with(['member', 'plan'])->findOrFail($id);
            $plan = $membership->plan;
            
            if (!$plan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Plan not found for this membership'
                ], 400);
            }
            
            // Calculate new end date
            $newStartDate = now();
            $newEndDate = $plan->calculateEndDate($newStartDate);
            
            // Create new membership assignment
            $newMembership = MemberMembershipAssignment::create([
                'member_id' => $membership->member_id,
                'plan_id' => $membership->plan_id,
                'coach_id' => $membership->coach_id,
                'gym_id' => $membership->gym_id,
                'start_date' => $newStartDate,
                'calculated_end_date' => $newEndDate,
                'package_name' => $membership->package_name,
                'package_details' => $membership->package_details,
                'payment_method' => $request->payment_method ?? $membership->payment_method,
                'subtotal' => $request->subtotal ?? $plan->price,
                'discount' => $request->discount ?? 0,
                'tax' => $request->tax ?? 0,
                'total' => $request->total ?? $plan->price,
                'notes' => $request->notes ?? 'Renewed subscription',
                'status' => 'active',
            ]);
            
            // Update old membership
            $membership->update(['status' => 'renewed']);
            
            // Update member
            $membership->member->update([
                'Statuses' => 'active',
                'Expires' => $newEndDate,
                'end_date' => $newEndDate,
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Subscription renewed successfully',
                'data' => $newMembership
            ]);
        } catch (\Exception $e) {
            Log::error('Error renewing subscription: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error renewing subscription: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Get subscription statistics
     */
    public function getStatistics(Request $request)
    {
        try {
            $gymId = $request->user('api')->gym_id ?? 1;
            
            $totalActive = MemberMembershipAssignment::where('status', 'active')
                ->whereHas('member', function($query) use ($gymId) {
                    $query->where('gym_id', $gymId);
                })
                ->count();
            
            $expiring7Days = MemberMembershipAssignment::where('status', 'active')
                ->whereHas('member', function($query) use ($gymId) {
                    $query->where('gym_id', $gymId);
                })
                ->get()
                ->filter(function($membership) {
                    $endDate = $membership->calculated_end_date ?? $membership->end_date;
                    if (!$endDate) return false;
                    $daysUntilExpiry = Carbon::parse($endDate)->diffInDays(now(), false);
                    return $daysUntilExpiry >= 0 && $daysUntilExpiry <= 7;
                })
                ->count();
            
            $expired = MemberMembershipAssignment::where('status', 'expired')
                ->whereHas('member', function($query) use ($gymId) {
                    $query->where('gym_id', $gymId);
                })
                ->count();
            
            return response()->json([
                'success' => true,
                'data' => [
                    'total_active' => $totalActive,
                    'expiring_7_days' => $expiring7Days,
                    'expired' => $expired,
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching statistics: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching statistics: ' . $e->getMessage()
            ], 500);
        }
    }
}
