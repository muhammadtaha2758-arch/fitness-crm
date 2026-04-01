<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutAssignment extends Model
{
    protected $fillable = [
        'workout_id',
        'member_id',
        'gym_id',
        'start_date',
        'description',
        'assigned_by',
        'thumbnail',
        'amount_of_weeks',
        'selected_days',
        'goal',
        'tag'
    ];

    protected $casts = [
        'start_date' => 'date',
    ];

    public function workout()
    {
        return $this->belongsTo(Workout::class);
    }

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id'); // Use Client model instead of User
    }

    public function gym()
    {
        return $this->belongsTo(Gym::class);
    }

    public function assignedBy()
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }
}