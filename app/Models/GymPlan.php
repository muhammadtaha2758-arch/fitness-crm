<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GymPlan extends Model
{
    protected $fillable = [
        'stripe_price_id',
        'name',
        'price',
        'interval',
        'features',
        'is_active',
        'sort_order',
        'membership_data',
    ];

    protected $casts = [
        'features' => 'array',
        'is_active' => 'boolean',
        'price' => 'decimal:2',
        'membership_data' => 'array',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}
