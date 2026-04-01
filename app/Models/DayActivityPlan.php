<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DayActivityPlan extends Model
{
    use SoftDeletes;

    protected $table = 'day_activity_plans';

    protected $fillable = [
        'member_id',
        'coach_id',
        'gym_id',
        'day',
    ];

    /**
     * The attributes that should have default values.
     */
    protected $attributes = [
        'gym_id' => 1,
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Automatically set gym_id and coach_id when creating a new DayActivityPlan
        static::creating(function ($dayActivityPlan) {
            // Always set gym_id to 1 if not provided
            if (empty($dayActivityPlan->gym_id)) {
                $dayActivityPlan->gym_id = 1;
            }

            // Set coach_id from member if member_id is provided and coach_id is not set
            if (!empty($dayActivityPlan->member_id) && empty($dayActivityPlan->coach_id)) {
                $member = Member::find($dayActivityPlan->member_id);
                if ($member && $member->coach_id) {
                    $dayActivityPlan->coach_id = $member->coach_id;
                }
            }
        });

        // Also handle updates to ensure gym_id is set
        static::updating(function ($dayActivityPlan) {
            // Ensure gym_id is always 1 if not set
            if (empty($dayActivityPlan->gym_id)) {
                $dayActivityPlan->gym_id = 1;
            }

            // Update coach_id from member if member_id is provided and coach_id is not set
            if (!empty($dayActivityPlan->member_id) && empty($dayActivityPlan->coach_id)) {
                $member = Member::find($dayActivityPlan->member_id);
                if ($member && $member->coach_id) {
                    $dayActivityPlan->coach_id = $member->coach_id;
                }
            }
        });
    }

    /**
     * Get the member that owns this day activity plan
     */
    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    /**
     * Get the coach that owns this day activity plan
     */
    public function coach()
    {
        return $this->belongsTo(Coach::class, 'coach_id');
    }

    /**
     * Get all activities for this day plan
     */
    public function activities()
    {
        return $this->hasMany(DayActivityItem::class, 'day_activity_plan_id');
    }

    /**
     * Get all sessions for this day plan
     */
    public function sessions()
    {
        return $this->hasMany(DayActivitySession::class, 'day_activity_plan_id');
    }

    /**
     * Get the latest session for this day plan
     */
    public function latestSession()
    {
        return $this->hasOne(DayActivitySession::class, 'day_activity_plan_id')->latestOfMany();
    }
}

