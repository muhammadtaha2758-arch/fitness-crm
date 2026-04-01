<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Plan extends Model
{
    protected $table = 'member_plans';

    protected $fillable = [
        'stripe_price_id',
        'name',
        'price',
        'interval',
        'features',
        'is_active',
        'sort_order',
        'membership_data',
        'duration_value',
        'duration_unit',
    ];

    protected $casts = [
        'features' => 'array',
        'is_active' => 'boolean',
        'price' => 'decimal:2',
        'membership_data' => 'array',
        'duration_value' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }

    /**
     * Get duration in days based on duration_value and duration_unit
     */
    public function getDurationInDays()
    {
        if (!$this->duration_value || !$this->duration_unit) {
            // Fallback to interval if duration not set
            return $this->interval === 'yearly' ? 365 : 30;
        }
        
        switch ($this->duration_unit) {
            case 'days':
                return $this->duration_value;
            case 'months':
                return $this->duration_value * 30; // Approximate
            case 'years':
                return $this->duration_value * 365;
            default:
                return 30;
        }
    }

    /**
     * Calculate end date based on start date and plan duration
     */
    public function calculateEndDate($startDate)
    {
        $start = Carbon::parse($startDate);
        $days = $this->getDurationInDays();
        return $start->addDays($days)->format('Y-m-d');
    }
}
