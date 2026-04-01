<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DayActivityItem extends Model
{
    use SoftDeletes;

    protected $table = 'day_activity_items';

    protected $fillable = [
        'gym_id',
        'day_activity_plan_id',
        'exercise_id',
        'exercise_name',
        'sets',
        'reps',
        'rest_seconds',
    ];

    protected $casts = [
        'gym_id' => 'integer',
        'sets' => 'integer',
        'reps' => 'integer',
        'rest_seconds' => 'integer',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    /**
     * The attributes that should have default values.
     */
    protected $attributes = [
        'gym_id' => 1,
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Automatically set gym_id when creating/updating a DayActivityItem
        static::saving(function ($dayActivityItem) {
            // If gym_id is not set, try to get it from the related day activity plan
            if (empty($dayActivityItem->gym_id)) {
                if ($dayActivityItem->relationLoaded('dayActivityPlan') && $dayActivityItem->dayActivityPlan) {
                    $dayActivityItem->gym_id = $dayActivityItem->dayActivityPlan->gym_id ?: 1;
                } elseif (!empty($dayActivityItem->day_activity_plan_id)) {
                    $plan = DayActivityPlan::find($dayActivityItem->day_activity_plan_id);
                    if ($plan && $plan->gym_id) {
                        $dayActivityItem->gym_id = $plan->gym_id;
                    } else {
                        $dayActivityItem->gym_id = 1;
                    }
                } else {
                    $dayActivityItem->gym_id = 1;
                }
            }
        });
    }

    /**
     * Get the day activity plan that owns this item
     */
    public function dayActivityPlan()
    {
        return $this->belongsTo(DayActivityPlan::class, 'day_activity_plan_id');
    }

    /**
     * Get the gym for this item.
     */
    public function gym()
    {
        return $this->belongsTo(Gym::class, 'gym_id');
    }

    /**
     * Scope to filter by gym_id.
     */
    public function scopeForGym($query, $gymId)
    {
        return $query->where('gym_id', $gymId);
    }
}
