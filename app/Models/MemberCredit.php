<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MemberCredit extends Model
{
    use SoftDeletes;

    protected $table = 'member_credits';

    protected $fillable = [
        'member_id',
        'membership_assignment_id',
        'service_id',
        'service_name',
        'total_credits',
        'used_credits',
        'remaining_credits',
        'valid_from',
        'valid_until',
        'status',
        'gym_id',
    ];

    protected $casts = [
        'total_credits' => 'decimal:2',
        'used_credits' => 'decimal:2',
        'remaining_credits' => 'decimal:2',
        'valid_from' => 'date',
        'valid_until' => 'date',
        'gym_id' => 'integer',
        'member_id' => 'integer',
        'membership_assignment_id' => 'integer',
        'service_id' => 'integer',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at', 'valid_from', 'valid_until'];

    /**
     * Get the member that owns the credit
     */
    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    /**
     * Get the membership assignment
     */
    public function membershipAssignment()
    {
        return $this->belongsTo(MemberMembershipAssignment::class, 'membership_assignment_id');
    }

    /**
     * Get all credit transactions for this credit
     */
    public function transactions()
    {
        return $this->hasMany(MemberCreditTransaction::class, 'member_credit_id');
    }

    /**
     * Scope to get active credits
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active')
            ->where('remaining_credits', '>', 0)
            ->where('valid_until', '>=', now()->toDateString());
    }

    /**
     * Scope to get expired credits
     */
    public function scopeExpired($query)
    {
        return $query->where(function ($q) {
            $q->where('status', 'expired')
                ->orWhere('valid_until', '<', now()->toDateString());
        });
    }

    /**
     * Scope to get exhausted credits
     */
    public function scopeExhausted($query)
    {
        return $query->where('status', 'exhausted')
            ->orWhere('remaining_credits', '<=', 0);
    }

    /**
     * Check if credit is valid (active, not expired, not exhausted)
     */
    public function isValid()
    {
        return $this->status === 'active' 
            && $this->remaining_credits > 0 
            && $this->valid_until >= now()->toDateString();
    }

    /**
     * Update remaining credits (recalculate)
     */
    public function updateRemainingCredits()
    {
        $this->remaining_credits = max(0, $this->total_credits - $this->used_credits);
        
        // Auto-update status if exhausted
        if ($this->remaining_credits <= 0 && $this->status === 'active') {
            $this->status = 'exhausted';
        }
        
        $this->save();
    }
}

