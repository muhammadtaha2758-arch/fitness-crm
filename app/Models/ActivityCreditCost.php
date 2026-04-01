<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityCreditCost extends Model
{
    protected $table = 'activity_credit_costs';

    protected $fillable = [
        'activity_type',
        'activity_subtype',
        'default_credit_cost',
        'gym_id',
        'is_active',
    ];

    protected $casts = [
        'default_credit_cost' => 'decimal:2',
        'is_active' => 'boolean',
        'gym_id' => 'integer',
    ];

    /**
     * Scope to get active costs
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to filter by activity type
     */
    public function scopeByActivityType($query, $type)
    {
        return $query->where('activity_type', $type);
    }

    /**
     * Scope to filter by activity subtype
     */
    public function scopeByActivitySubtype($query, $subtype)
    {
        return $query->where('activity_subtype', $subtype);
    }
}

