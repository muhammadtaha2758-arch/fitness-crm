<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class SubscriptionInvitation extends Model
{
    use SoftDeletes;

    protected $table = 'subscription_invitations';

    protected $fillable = [
        'gym_id',
        'member_id',
        'subscription_plan_id',
        'invitation_type',
        'status',
        'sent_at',
        'delivered_at',
        'opened_at',
        'clicked_at',
        'email_content',
        'confirmation_email',
        'metadata'
    ];

    protected $casts = [
        'gym_id' => 'integer',
        'sent_at' => 'datetime',
        'delivered_at' => 'datetime',
        'opened_at' => 'datetime',
        'clicked_at' => 'datetime',
        'metadata' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    // Relationships
    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function subscriptionPlan()
    {
        return $this->belongsTo(SubscriptionPlan::class, 'subscription_plan_id');
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeSent($query)
    {
        return $query->where('status', 'sent');
    }

    public function scopeDelivered($query)
    {
        return $query->where('status', 'delivered');
    }

    public function scopeByType($query, $type)
    {
        return $query->where('invitation_type', $type);
    }

    public function scopeForMember($query, $memberId)
    {
        return $query->where('member_id', $memberId);
    }

    public function scopeForSubscriptionPlan($query, $planId)
    {
        return $query->where('subscription_plan_id', $planId);
    }

    // Helper methods
    public function markAsSent()
    {
        $this->update([
            'status' => 'sent',
            'sent_at' => now()
        ]);
    }

    public function markAsDelivered()
    {
        $this->update([
            'status' => 'delivered',
            'delivered_at' => now()
        ]);
    }

    public function markAsOpened()
    {
        $this->update([
            'status' => 'opened',
            'opened_at' => now()
        ]);
    }

    public function markAsClicked()
    {
        $this->update([
            'status' => 'clicked',
            'clicked_at' => now()
        ]);
    }

    public function canResend()
    {
        // Can resend if last invitation was sent more than 7 days ago
        return $this->sent_at && $this->sent_at->diffInDays(now()) >= 7;
    }

    public function isRecent()
    {
        // Check if invitation was sent within last 7 days
        return $this->sent_at && $this->sent_at->diffInDays(now()) < 7;
    }
}