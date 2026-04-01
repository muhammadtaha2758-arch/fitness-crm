<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MemberCreditTransaction extends Model
{
    protected $table = 'member_credit_transactions';

    protected $fillable = [
        'member_id',
        'member_credit_id',
        'transaction_type',
        'amount',
        'balance_before',
        'balance_after',
        'description',
        'related_type',
        'related_id',
        'performed_by_type',
        'performed_by_id',
        'admin_override',
        'gym_id',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'balance_before' => 'decimal:2',
        'balance_after' => 'decimal:2',
        'admin_override' => 'boolean',
        'gym_id' => 'integer',
        'member_id' => 'integer',
        'member_credit_id' => 'integer',
        'related_id' => 'integer',
        'performed_by_id' => 'integer',
    ];

    protected $dates = ['created_at', 'updated_at'];

    /**
     * Get the member
     */
    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    /**
     * Get the member credit
     */
    public function memberCredit()
    {
        return $this->belongsTo(MemberCredit::class, 'member_credit_id');
    }

    /**
     * Get the related activity (polymorphic)
     */
    public function related()
    {
        return $this->morphTo('related', 'related_type', 'related_id');
    }

    /**
     * Scope to filter by transaction type
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('transaction_type', $type);
    }

    /**
     * Scope to get deductions
     */
    public function scopeDeductions($query)
    {
        return $query->where('transaction_type', 'deduction');
    }

    /**
     * Scope to get additions
     */
    public function scopeAdditions($query)
    {
        return $query->where('transaction_type', 'addition');
    }

    /**
     * Scope to get refunds
     */
    public function scopeRefunds($query)
    {
        return $query->where('transaction_type', 'refund');
    }
}

