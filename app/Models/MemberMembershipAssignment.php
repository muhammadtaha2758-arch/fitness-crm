<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class MemberMembershipAssignment extends Model
{
    use SoftDeletes;

    protected $table = 'member_membership_assignments';

    protected $fillable = [
        'member_id',
        'plan_id',
        'coach_id',
        'gym_id',
        'start_date',
        'end_date',
        'calculated_end_date',
        'package_name',
        'package_details',
        'payment_method',
        'subtotal',
        'discount',
        'tax',
        'total',
        'notes',
        'status',
        'renewal_reminder_sent',
        'last_reminder_sent_at',
        'reminder_count',
        'reminder_settings'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'calculated_end_date' => 'date',
        'last_reminder_sent_at' => 'date',
        'subtotal' => 'decimal:2',
        'discount' => 'decimal:2',
        'tax' => 'decimal:2',
        'total' => 'decimal:2',
        'gym_id' => 'integer',
        'member_id' => 'integer',
        'plan_id' => 'integer',
        'coach_id' => 'integer',
        'renewal_reminder_sent' => 'boolean',
        'reminder_count' => 'integer',
        'reminder_settings' => 'array'
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public function coach()
    {
        return $this->belongsTo(Coach::class);
    }

    /**
     * Check if subscription is expired
     */
    public function isExpired()
    {
        if (!$this->calculated_end_date && !$this->end_date) {
            return false;
        }
        
        $endDate = $this->calculated_end_date ?? $this->end_date;
        return Carbon::parse($endDate)->isPast();
    }

    /**
     * Check if subscription is expiring soon
     */
    public function isExpiringSoon($days = 7)
    {
        if (!$this->calculated_end_date && !$this->end_date) {
            return false;
        }
        
        $endDate = $this->calculated_end_date ?? $this->end_date;
        $daysUntilExpiry = Carbon::parse($endDate)->diffInDays(now(), false);
        
        return $daysUntilExpiry >= 0 && $daysUntilExpiry <= $days;
    }

    /**
     * Get days until expiry (negative if expired)
     */
    public function getDaysUntilExpiry()
    {
        if (!$this->calculated_end_date && !$this->end_date) {
            return null;
        }
        
        $endDate = $this->calculated_end_date ?? $this->end_date;
        return Carbon::parse($endDate)->diffInDays(now(), false);
    }

    /**
     * Get subscription status
     */
    public function getStatus()
    {
        if ($this->status === 'cancelled') {
            return 'cancelled';
        }
        
        if ($this->isExpired()) {
            return 'expired';
        }
        
        if ($this->isExpiringSoon(7)) {
            return 'expiring_soon';
        }
        
        return 'active';
    }
}

