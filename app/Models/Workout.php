<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    protected $table = 'workouts';
    protected $dates = ['deleted_at'];
    
    // Specify the primary key if it's not 'id'
    protected $primaryKey = 'id';
    
    // Enable auto-incrementing for the primary key
    public $incrementing = true;

    protected $fillable = [
        'gym_id',
        'coach_id',
        'member_id',
        'exercise_name',
        'category',
        'duration',
        'level',
        'description',
        'equipment',
        'thumbnail',
        'muscles_targeted',
        'calories_burned',
        'instructions',
        'difficulty',
        'rest_period',
        'tags',
        'goal',
        'video_link',
        'visible_for',
        'primary_muscle_groups',
        'secondary_muscle_groups',
        'primary_joint',
        'type',
        'uses_weights',
        'intensity',
        'sets_configuration',
        'rest_period_seconds',
        'sets',
        'qr_link',
        'manufacturer',
        'days_per_week',
        'repeat',
        'rest_seconds',
        'default_reps',
        'enable_preset_weights',
        'last_edited_by_id',
        'last_edited_by_type',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'gym_id' => 'integer',
        'member_id' => 'integer',
        'difficulty' => 'integer',
        'calories_burned' => 'integer',
        'rest_period' => 'integer',
        'rest_period_seconds' => 'integer',
        'rest_seconds' => 'integer',
        'intensity' => 'integer',
        'uses_weights' => 'boolean',
        'enable_preset_weights' => 'boolean',
        'primary_muscle_groups' => 'array',
        'secondary_muscle_groups' => 'array',
        'sets_configuration' => 'array',
        'sets' => 'array',
        'default_reps' => 'array',
    ];

    /**
     * Get the workout days for this workout.
     */
    public function days()
    {
        return $this->hasMany(WorkoutDay::class, 'workout_id', 'id');
    }


    public function workoutDays()
    {
        return $this->hasMany(WorkoutDay::class, 'workout_id', 'id');
    }

    public function assignments()
    {
        return $this->hasMany(WorkoutAssignment::class);
    }

    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function coach()
    {
        return $this->belongsTo(Coach::class);
    }

    public function getMemberCountAttribute()
    {
        return $this->assignments()->count();
    }
}
