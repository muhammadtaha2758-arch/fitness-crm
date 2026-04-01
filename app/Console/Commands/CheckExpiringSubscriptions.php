<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\MemberMembershipAssignment;
use App\Models\Member;
use App\Services\NotificationService;
use App\Models\MemberMessage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class CheckExpiringSubscriptions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'subscriptions:check-expiring 
                            {--days=7 : Number of days before expiry to check}
                            {--expired : Also check expired subscriptions}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for expiring and expired member subscriptions';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $days = (int) $this->option('days');
        $checkExpired = $this->option('expired');
        
        $this->info("Checking subscriptions expiring within {$days} days...");
        
        // Get active memberships
        $memberships = MemberMembershipAssignment::where('status', 'active')
            ->with(['member', 'plan'])
            ->get();
        
        $expiringCount = 0;
        $expiredCount = 0;
        $notifiedCount = 0;
        
        foreach ($memberships as $membership) {
            // Calculate end date if not set
            if (!$membership->calculated_end_date && $membership->plan) {
                $calculatedEndDate = $membership->plan->calculateEndDate($membership->start_date);
                $membership->update(['calculated_end_date' => $calculatedEndDate]);
            }
            
            $endDate = $membership->calculated_end_date ?? $membership->end_date;
            
            if (!$endDate) {
                continue;
            }
            
            $daysUntilExpiry = Carbon::parse($endDate)->diffInDays(now(), false);
            
            // Check if expiring soon
            if ($daysUntilExpiry >= 0 && $daysUntilExpiry <= $days) {
                $expiringCount++;
                
                // Send notification if not already sent today
                $shouldSendReminder = !$membership->renewal_reminder_sent || 
                    !$membership->last_reminder_sent_at ||
                    Carbon::parse($membership->last_reminder_sent_at)->diffInDays(now()) >= 1;
                
                if ($shouldSendReminder) {
                    $this->sendExpiringNotification($membership, $daysUntilExpiry);
                    $notifiedCount++;
                }
            }
            
            // Check if expired
            if ($checkExpired && $daysUntilExpiry < 0) {
                $expiredCount++;
                
                // Update status to expired
                if ($membership->status !== 'expired') {
                    $membership->update(['status' => 'expired']);
                    
                    // Update member status
                    $membership->member->update([
                        'Statuses' => 'expired',
                        'Expires' => $endDate
                    ]);
                    
                    $this->sendExpiredNotification($membership);
                }
            }
        }
        
        $this->info("Found {$expiringCount} expiring subscriptions");
        $this->info("Found {$expiredCount} expired subscriptions");
        $this->info("Sent {$notifiedCount} notifications");
        
        return 0;
    }
    
    /**
     * Send notification for expiring subscription
     */
    private function sendExpiringNotification($membership, $daysUntilExpiry)
    {
        try {
            $member = $membership->member;
            $plan = $membership->plan;
            
            if (!$member) {
                $this->warn("Member not found for membership ID: {$membership->id}");
                return;
            }
            
            $endDate = $membership->calculated_end_date ?? $membership->end_date;
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
                'sender_member_id' => null, // System message
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
            
            Log::info("Sent expiring subscription notification", [
                'member_id' => $member->id,
                'membership_id' => $membership->id,
                'days_until_expiry' => $daysUntilExpiry
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to send expiring subscription notification: " . $e->getMessage(), [
                'membership_id' => $membership->id,
                'error' => $e->getTraceAsString()
            ]);
            $this->error("Error sending notification for membership {$membership->id}: " . $e->getMessage());
        }
    }
    
    /**
     * Send notification for expired subscription
     */
    private function sendExpiredNotification($membership)
    {
        try {
            $member = $membership->member;
            $plan = $membership->plan;
            
            if (!$member) {
                $this->warn("Member not found for membership ID: {$membership->id}");
                return;
            }
            
            $planName = $plan ? $plan->name : ($membership->package_name ?? 'Subscription');
            
            // Create admin notification
            NotificationService::createForAdmins(
                'subscription_expired',
                'Subscription Expired',
                "Member {$member->membername} subscription has expired",
                'fa-exclamation-triangle',
                'danger',
                'MemberMembershipAssignment',
                $membership->id,
                $member->gym_id ?? 1
            );
            
            // Send renewal message to member
            $messageContent = "Hello " . ($member->firstname ?? $member->membername) . ",\n\n" .
                "Your {$planName} subscription has expired.\n\n" .
                "To continue enjoying our services, please renew your subscription.\n\n" .
                "Thank you!";
            
            MemberMessage::create([
                'gym_id' => $member->gym_id ?? 1,
                'sender_member_id' => null,
                'receiver_member_id' => $member->id,
                'message_text' => $messageContent,
                'sent_date' => now()
            ]);
            
            Log::info("Sent expired subscription notification", [
                'member_id' => $member->id,
                'membership_id' => $membership->id
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to send expired subscription notification: " . $e->getMessage(), [
                'membership_id' => $membership->id,
                'error' => $e->getTraceAsString()
            ]);
            $this->error("Error sending expired notification for membership {$membership->id}: " . $e->getMessage());
        }
    }
}
