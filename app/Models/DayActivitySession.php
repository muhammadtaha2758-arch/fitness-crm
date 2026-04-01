<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DayActivitySession extends Model
{
    use SoftDeletes;

    protected $table = 'day_activity_sessions';

    protected $fillable = [
        'gym_id',
        'day_activity_plan_id',
        'member_id',
        'status',
        'started_at',
        'completed_at',
    ];

    protected $casts = [
        'gym_id' => 'integer',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
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

        // Automatically set gym_id when creating/updating a DayActivitySession
        static::saving(function ($dayActivitySession) {
            // If gym_id is not set, try to get it from the related day activity plan
            if (empty($dayActivitySession->gym_id)) {
                if ($dayActivitySession->relationLoaded('dayActivityPlan') && $dayActivitySession->dayActivityPlan) {
                    $dayActivitySession->gym_id = $dayActivitySession->dayActivityPlan->gym_id ?: 1;
                } elseif (!empty($dayActivitySession->day_activity_plan_id)) {
                    $plan = DayActivityPlan::find($dayActivitySession->day_activity_plan_id);
                    if ($plan && $plan->gym_id) {
                        $dayActivitySession->gym_id = $plan->gym_id;
                    } else {
                        $dayActivitySession->gym_id = 1;
                    }
                } else {
                    $dayActivitySession->gym_id = 1;
                }
            }
        });
    }

    /**
     * Get the day activity plan for this session
     */
    public function dayActivityPlan()
    {
        return $this->belongsTo(DayActivityPlan::class, 'day_activity_plan_id');
    }

    /**
     * Get the member that owns this session
     */
    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    /**
     * Get the gym for this session.
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
