<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\SubscriptionPlan;
use App\Models\SubscriptionInvitation;
use App\Mail\CustomEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use DB;

class SubscriptionInvitationController extends BaseController
{
    /**
     * Get invitation data for the modal
     */
    public function getInvitationData(Request $request)
    {
        try {
            // Get members with expired subscriptions who haven't been invited recently
            $nonInvitedMembers = Member::withExpiredSubscriptions()
                ->with(['subscriptionPlan', 'latestSubscriptionInvitation'])
                ->whereDoesntHave('subscriptionInvitations', function($query) {
                    $query->where('invitation_type', 'subscription_expired')
                          ->where('sent_at', '>=', now()->subDays(7));
                })
                ->get()
                ->map(function($member) {
                    return [
                        'id' => $member->id,
                        'name' => trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? '')) ?: $member->membername,
                        'email' => $member->email,
                        'phone' => $member->phone ?? $member->mobile_phone ?? '',
                        'subscription_end_date' => $member->Expires ? Carbon::parse($member->Expires)->format('Y-m-d') : null,
                        'subscription_end_date_formatted' => $member->Expires ? Carbon::parse($member->Expires)->format('M j, Y') : 'N/A',
                        'plan_name' => $member->subscriptionPlan ? $member->subscriptionPlan->name : ($member->plan ?? 'N/A'),
                        'last_invitation_date' => null,
                        'last_invitation_date_formatted' => 'Never'
                    ];
                });

            // Get members with expired subscriptions who have been invited but can be re-invited
            $alreadyInvitedMembers = Member::withExpiredSubscriptions()
                ->with(['subscriptionPlan', 'latestSubscriptionInvitation'])
                ->whereHas('subscriptionInvitations', function($query) {
                    $query->where('invitation_type', 'subscription_expired')
                          ->where('sent_at', '<', now()->subDays(7));
                })
                ->get()
                ->map(function($member) {
                    $lastInvitation = $member->latestSubscriptionInvitation;
                    return [
                        'id' => $member->id,
                        'name' => trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? '')) ?: $member->membername,
                        'email' => $member->email,
                        'phone' => $member->phone ?? $member->mobile_phone ?? '',
                        'subscription_end_date' => $member->Expires ? Carbon::parse($member->Expires)->format('Y-m-d') : null,
                        'subscription_end_date_formatted' => $member->Expires ? Carbon::parse($member->Expires)->format('M j, Y') : 'N/A',
                        'plan_name' => $member->subscriptionPlan ? $member->subscriptionPlan->name : ($member->plan ?? 'N/A'),
                        'last_invitation_date' => $lastInvitation && $lastInvitation->sent_at ? $lastInvitation->sent_at->format('Y-m-d') : null,
                        'last_invitation_date_formatted' => $lastInvitation && $lastInvitation->sent_at ? $lastInvitation->sent_at->format('M j, Y') : 'N/A'
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => [
                    'nonInvitedClients' => $nonInvitedMembers->count(),
                    'alreadyInvitedClients' => $alreadyInvitedMembers->count(),
                    'totalExpiredMembers' => $nonInvitedMembers->count() + $alreadyInvitedMembers->count(),
                    'nonInvitedMembersList' => $nonInvitedMembers->values(),
                    'alreadyInvitedMembersList' => $alreadyInvitedMembers->values()
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load invitation data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Send subscription invitations
     */
    public function sendInvitations(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nonInvitedClients' => 'boolean',
            'alreadyInvitedClients' => 'boolean',
            'confirmationEmail' => 'required|email',
            'selectedMemberIds' => 'array',
            'selectedMemberIds.*' => 'integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            $invitationsSent = 0;
            $invitationsFailed = 0;
            $confirmationEmail = $request->confirmationEmail;
            $selectedMemberIds = $request->selectedMemberIds ?? [];

            // If specific members are selected, send only to those
            if (!empty($selectedMemberIds)) {
                $members = Member::withExpiredSubscriptions()
                    ->with(['subscriptionPlan'])
                    ->whereIn('id', $selectedMemberIds)
                    ->get();

                foreach ($members as $member) {
                    // Check if member can be invited (not recently invited)
                    $canInvite = true;
                    
                    // For non-invited members: check if they haven't been invited recently
                    $recentInvitation = $member->subscriptionInvitations()
                        ->where('invitation_type', 'subscription_expired')
                        ->where('sent_at', '>=', now()->subDays(7))
                        ->exists();
                    
                    if ($recentInvitation) {
                        $canInvite = false;
                    }
                    
                    // For already-invited members: check if last invitation was more than 7 days ago
                    $oldInvitation = $member->subscriptionInvitations()
                        ->where('invitation_type', 'subscription_expired')
                        ->where('sent_at', '<', now()->subDays(7))
                        ->exists();
                    
                    // Allow if member is in selected list and either:
                    // - Has no recent invitation (non-invited)
                    // - Has old invitation (can re-invite)
                    if ($canInvite || $oldInvitation) {
                        $result = $this->createAndSendInvitation($member, 'subscription_expired', $confirmationEmail);
                        if ($result['success']) {
                            $invitationsSent++;
                        } else {
                            $invitationsFailed++;
                        }
                    }
                }
            } else {
                // Send invitations to non-invited members (group selection)
                if ($request->nonInvitedClients) {
                    $members = Member::withExpiredSubscriptions()
                        ->with(['subscriptionPlan'])
                        ->whereDoesntHave('subscriptionInvitations', function($query) {
                            $query->where('invitation_type', 'subscription_expired')
                                  ->where('sent_at', '>=', now()->subDays(7));
                        })
                        ->get();

                    foreach ($members as $member) {
                        $result = $this->createAndSendInvitation($member, 'subscription_expired', $confirmationEmail);
                        if ($result['success']) {
                            $invitationsSent++;
                        } else {
                            $invitationsFailed++;
                        }
                    }
                }

                // Send invitations to already invited members (re-send) - group selection
                if ($request->alreadyInvitedClients) {
                    $members = Member::withExpiredSubscriptions()
                        ->with(['subscriptionPlan'])
                        ->whereHas('subscriptionInvitations', function($query) {
                            $query->where('invitation_type', 'subscription_expired')
                                  ->where('sent_at', '<', now()->subDays(7));
                        })
                        ->get();

                    foreach ($members as $member) {
                        $result = $this->createAndSendInvitation($member, 'subscription_expired', $confirmationEmail);
                        if ($result['success']) {
                            $invitationsSent++;
                        } else {
                            $invitationsFailed++;
                        }
                    }
                }
            }

            DB::commit();

            // Send confirmation email (only if at least one invitation was successfully sent)
            if ($invitationsSent > 0) {
                try {
                    $this->sendConfirmationEmail($confirmationEmail, $invitationsSent);
                } catch (\Exception $e) {
                    // Log but don't fail - confirmation email is not critical
                    \Log::error('Failed to send confirmation email: ' . $e->getMessage());
                }
            }

            // Build response message
            $message = "Successfully created {$invitationsSent} invitation" . ($invitationsSent !== 1 ? 's' : '');
            if ($invitationsSent > 0 && $invitationsFailed > 0) {
                $message .= ", but {$invitationsFailed} failed to send email";
            } elseif ($invitationsFailed > 0) {
                $message = "Created {$invitationsFailed} invitation" . ($invitationsFailed !== 1 ? 's' : '') . " but email sending failed. Please check your mail configuration.";
            }

            return response()->json([
                'success' => true,
                'message' => $message,
                'invitationsSent' => $invitationsSent,
                'invitationsFailed' => $invitationsFailed
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to send invitations: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create and send invitation for a member
     */
    private function createAndSendInvitation($member, $type, $confirmationEmail)
    {
        // Get subscription plan ID from various possible sources
        $subscriptionPlanId = null;
        if ($member->subscription_plan_id) {
            $subscriptionPlanId = $member->subscription_plan_id;
        } elseif ($member->subscription_id) {
            $subscriptionPlanId = $member->subscription_id;
        } elseif ($member->subscriptionPlan) {
            $subscriptionPlanId = $member->subscriptionPlan->id;
        }
        
        // Create invitation record
        $invitationData = [
            'gym_id' => $member->gym_id ?? 1,
            'member_id' => $member->id,
            'invitation_type' => $type,
            'status' => 'pending',
            'confirmation_email' => $confirmationEmail,
            'metadata' => [
                'subscription_end_date' => $member->Expires,
                'member_name' => $member->firstname . ' ' . $member->lastname,
                'member_email' => $member->email,
                'plan_name' => $member->subscriptionPlan ? $member->subscriptionPlan->name : 'Unknown Plan'
            ]
        ];
        
        // Only add subscription_plan_id if it's not null
        if ($subscriptionPlanId !== null) {
            $invitationData['subscription_plan_id'] = $subscriptionPlanId;
        }
        
        $invitation = SubscriptionInvitation::create($invitationData);

        // Try to send email, but don't fail the entire process if email fails
        try {
            $this->sendInvitationEmail($member, $invitation);
            // Mark as sent only if email was successfully sent
            $invitation->markAsSent();
            return ['success' => true, 'invitation' => $invitation];
        } catch (\Exception $e) {
            // Log the error but continue
            \Log::error('Failed to send invitation email to member ' . $member->id . ': ' . $e->getMessage());
            // Mark invitation as failed
            $invitation->update([
                'status' => 'failed',
                'email_content' => 'Email sending failed: ' . $e->getMessage()
            ]);
            // Return failure but don't throw - allow the invitation record to be created even if email fails
            return ['success' => false, 'invitation' => $invitation, 'error' => $e->getMessage()];
        }
    }

    /**
     * Send invitation email to member
     */
    private function sendInvitationEmail($member, $invitation)
    {
        // Configure mail settings from database
        $this->Set_config_mail();
        
        $subject = 'Your Subscription Has Expired - Renew Now!';
        
        $emailContent = $this->generateInvitationEmailContent($member, $invitation);
        
        $data = [
            'subject' => $subject,
            'body' => $emailContent,
            'member_name' => $member->firstname . ' ' . $member->lastname,
            'member_email' => $member->email,
            'company_name' => config('app.name', 'Fitness CRM')
        ];

        try {
            Mail::to($member->email)->send(new CustomEmail($data));
            
            // Update invitation with email content
            $invitation->update([
                'email_content' => $emailContent
            ]);
            
        } catch (\Exception $e) {
            $invitation->update(['status' => 'failed']);
            throw $e;
        }
    }

    /**
     * Generate invitation email content
     */
    private function generateInvitationEmailContent($member, $invitation)
    {
        $memberName = $member->firstname . ' ' . $member->lastname;
        $planName = $member->subscriptionPlan ? $member->subscriptionPlan->name : 'Your Plan';
        $expiryDate = $member->Expires ? Carbon::parse($member->Expires)->format('F j, Y') : 'Recently';
        
        return "
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
            <h2 style='color: #333;'>Subscription Renewal Reminder</h2>
            
            <p>Dear {$memberName},</p>
            
            <p>We hope this message finds you well. We wanted to reach out because your subscription to <strong>{$planName}</strong> has expired on {$expiryDate}.</p>
            
            <p>We miss having you as part of our fitness community! Your health and fitness journey is important to us, and we'd love to help you get back on track.</p>
            
            <div style='background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;'>
                <h3 style='color: #007bff; margin-top: 0;'>Why Renew Your Subscription?</h3>
                <ul>
                    <li>Access to all gym facilities and equipment</li>
                    <li>Personal training sessions</li>
                    <li>Nutrition guidance and meal plans</li>
                    <li>Group fitness classes</li>
                    <li>Progress tracking and analytics</li>
                </ul>
            </div>
            
            <p>To renew your subscription and continue your fitness journey with us, please contact us at your earliest convenience.</p>
            
            <div style='text-align: center; margin: 30px 0;'>
                <a href='mailto:info@yourgym.com' style='background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;'>
                    Contact Us to Renew
                </a>
            </div>
            
            <p>If you have any questions or need assistance, please don't hesitate to reach out to our team.</p>
            
            <p>Thank you for being part of our fitness family!</p>
            
            <p>Best regards,<br>
            The Fitness Team</p>
        </div>
        ";
    }

    /**
     * Send confirmation email to admin
     */
    private function sendConfirmationEmail($email, $count)
    {
        // Configure mail settings from database
        $this->Set_config_mail();
        
        $subject = "Subscription Invitations Sent - {$count} invitations";
        
        $content = "
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
            <h2 style='color: #333;'>Invitation Confirmation</h2>
            
            <p>This is to confirm that subscription renewal invitations have been successfully sent.</p>
            
            <div style='background-color: #d4edda; padding: 15px; border-radius: 5px; margin: 20px 0;'>
                <strong>Summary:</strong><br>
                • Total invitations sent: {$count}<br>
                • Sent at: " . now()->format('F j, Y \a\t g:i A') . "<br>
                • Invitation type: Subscription Expired
            </div>
            
            <p>The system has automatically sent renewal reminders to members whose subscriptions have expired.</p>
            
            <p>Best regards,<br>
            Fitness CRM System</p>
        </div>
        ";

        $data = [
            'subject' => $subject,
            'body' => $content,
            'company_name' => config('app.name', 'Fitness CRM')
        ];

        try {
            Mail::to($email)->send(new CustomEmail($data));
        } catch (\Exception $e) {
            // Log error but don't fail the entire process if confirmation email fails
            \Log::error('Failed to send confirmation email: ' . $e->getMessage());
        }
    }

    /**
     * Get invitation statistics
     */
    public function getInvitationStats(Request $request)
    {
        try {
            $stats = [
                'total_invitations' => SubscriptionInvitation::count(),
                'pending_invitations' => SubscriptionInvitation::pending()->count(),
                'sent_invitations' => SubscriptionInvitation::sent()->count(),
                'delivered_invitations' => SubscriptionInvitation::delivered()->count(),
                'opened_invitations' => SubscriptionInvitation::where('status', 'opened')->count(),
                'clicked_invitations' => SubscriptionInvitation::where('status', 'clicked')->count(),
                'failed_invitations' => SubscriptionInvitation::where('status', 'failed')->count(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load invitation statistics: ' . $e->getMessage()
            ], 500);
        }
    }
}