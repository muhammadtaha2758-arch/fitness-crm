<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Gym extends Model
{
    use SoftDeletes;

    protected $table = 'gyms';

    protected $guarded = [];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    protected $fillable = [
        'gym_name',
        'contact_email',
        'subscription_status',
        'active_payment_gateway',
        'stripe_key',
        'stripe_secret',
        'paysafecard_account_number',
        'paysafecard_api_key',
        'paysafecard_environment',
        'super_admin_id',
        'name',
        'address',
        'phone',
        'email',
        'city',
        'zip_code',
        'country',
        'business_type',
        'description',
    ];

    protected $casts = [
        'active_payment_gateway' => 'string',
        'stripe_key' => 'string',
        'stripe_secret' => 'string',
        'paysafecard_account_number' => 'string',
        'paysafecard_api_key' => 'string',
        'paysafecard_environment' => 'string',
        'super_admin_id' => 'integer',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    /**
     * Get the super admin who owns this gym
     */
    public function superAdmin()
    {
        return $this->belongsTo(User::class, 'super_admin_id');
    }

    /**
     * Gym subscriptions (gym plan billing)
     */
    public function subscriptions()
    {
        return $this->hasMany(GymSubscription::class);
    }

    /**
     * Whether this gym has an active subscription (can use the system).
     * Checks GymSubscription first; falls back to gym.subscription_status for backwards compatibility.
     */
    public function hasActiveSubscription()
    {
        $hasActiveRecord = $this->subscriptions()
            ->where('status', 'active')
            ->exists();

        if ($hasActiveRecord) {
            return true;
        }

        $status = $this->subscription_status ?? '';
        return in_array(strtolower($status), ['active'], true);
    }

    /**
     * Get the active payment gateway for this gym
     */
    public function getActivePaymentGateway()
    {
        return $this->active_payment_gateway;
    }

    /**
     * Check if a specific payment gateway is active
     */
    public function isPaymentGatewayActive($gateway)
    {
        return $this->active_payment_gateway === $gateway;
    }

    /**
     * Get Stripe configuration
     */
    public function getStripeConfig()
    {
        if ($this->active_payment_gateway !== 'stripe') {
            return null;
        }

        return [
            'key' => $this->stripe_key,
            'secret' => $this->stripe_secret
        ];
    }

    /**
     * Get PaysafeCard configuration
     */
    public function getPaysafeCardConfig()
    {
        if ($this->active_payment_gateway !== 'paysafecard') {
            return null;
        }

        return [
            'account_number' => $this->paysafecard_account_number,
            'api_key' => $this->paysafecard_api_key,
            'environment' => $this->paysafecard_environment
        ];
    }

    /**
     * Set active payment gateway and clear others
     */
    public function setActivePaymentGateway($gateway)
    {
        $this->active_payment_gateway = $gateway;
        $this->save();
    }
}
