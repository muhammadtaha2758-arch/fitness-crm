<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WorkoutDay extends Model
{
    use SoftDeletes;

    protected $table = 'workout_days';

    protected $fillable = [
        'workout_id',
        'day',
        'gym_id',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * Get the workout that owns the workout day.
     */
    public function workout()
    {
        return $this->belongsTo(Workout::class, 'workout_id', 'id');
    }

    public function activities()
    {
        return $this->hasMany(WorkoutActivity::class, 'workout_day_id', 'id');
    }

    /**
     * Get the workout activity plans for this workout day.
     */
    // public function workoutActivityPlans()
    // {
    //     return $this->hasMany(WorkoutActivityPlan::class, 'workout_day_id');
    // }

    public function workoutActivityPlans()
    {
        return $this->hasMany(WorkoutActivityPlan::class, 'day_id');
    }
} 