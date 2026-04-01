<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkoutSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'workout_id',
        'member_id',
        'gym_id',
        'status',
        'started_at',
        'completed_at',
        'total_duration',
        'calories_burned',
        'notes'
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    // 🔗 Relationships
    public function workout()
    {
        return $this->belongsTo(Workout::class);
    }

    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function daySessions()
    {
        return $this->hasMany(WorkoutDaySession::class);
    }
}
