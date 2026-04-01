<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkoutDaySession extends Model
{
    use HasFactory;

    protected $fillable = [
        'workout_session_id',
        'day_number',
        'status',
        'started_at',
        'completed_at',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    // 🔗 Relationships
    public function workoutSession()
    {
        return $this->belongsTo(WorkoutSession::class);
    }

    // (optional) Add relation to activities later:
    // public function activities()
    // {
    //     return $this->hasMany(ActivityProgress::class);
    // }
}
