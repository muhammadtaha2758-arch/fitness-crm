<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class GymSubscription extends Model
{
    use HasFactory;

    protected $table = 'gym_subscriptions';

    protected $fillable = [
        'gym_id',
        'gym_plan_id',
        'amount',
        'next_billing_date',
        'status',
    ];

    protected $casts = [
        'next_billing_date' => 'date',
        'amount' => 'decimal:2',
    ];

    /* ================================
       Relationships
    ================================= */

    // Subscription belongs to a gym
    public function gym()
    {
        return $this->belongsTo(Gym::class, 'gym_id');
    }

    // Subscription belongs to a plan
    public function plan()
    {
        return $this->belongsTo(GymPlan::class, 'gym_plan_id');
    }

    // Subscription has many invoices
    public function invoices()
    {
        return $this->hasMany(GymInvoice::class, 'gym_subscription_id');
    }

    /* ================================
       Query Scopes
    ================================= */

    // Only active subscriptions
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    // Subscriptions that should be billed today
    public function scopeDueForBilling($query)
    {
        return $query->whereDate('next_billing_date', '<=', now());
    }

    /* ================================
       Helper Methods
    ================================= */

    // Move billing date to next month
    public function advanceBillingDate()
    {
        $this->update([
            'next_billing_date' => Carbon::parse($this->next_billing_date)->addMonth(),
        ]);
    }

    // Cancel subscription
    public function cancel()
    {
        $this->update(['status' => 'cancelled']);
    }

    // Suspend subscription (e.g. unpaid invoices)
    public function suspend()
    {
        $this->update(['status' => 'suspended']);
    }

    // Check if subscription is billable
    public function isBillable()
    {
        return $this->status === 'active'
            && $this->next_billing_date->lte(now());
    }
}
