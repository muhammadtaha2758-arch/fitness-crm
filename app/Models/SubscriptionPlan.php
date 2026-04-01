<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubscriptionPlan extends Model
{
    use SoftDeletes;

    protected $table = 'subscription_plans';

    protected $fillable = [
        'name',
        'monthly_price',
        'is_popular',
        'included_features',
        'is_active',
        'gym_id'
    ];

    protected $casts = [
        'monthly_price' => 'decimal:2',
        'is_popular' => 'boolean',
        'included_features' => 'array',
        'is_active' => 'boolean',
        'gym_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    // Scope for active plans
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope for popular plans
    public function scopePopular($query)
    {
        return $query->where('is_popular', true);
    }

    // Scope for gym-specific plans
    public function scopeByGym($query, $gymId)
    {
        return $query->where('gym_id', $gymId);
    }

    /**
     * Get the invoices for this subscription plan
     */
    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'subscription_plan_id');
    }

    /**
     * Get the members subscribed to this plan
     */
    public function members()
    {
        return $this->hasMany(Member::class, 'subscription_id');
    }

    /**
     * Get the subscription invitations for this plan
     */
    public function subscriptionInvitations()
    {
        return $this->hasMany(SubscriptionInvitation::class);
    }
}
