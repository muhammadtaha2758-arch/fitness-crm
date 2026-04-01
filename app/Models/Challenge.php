<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\ChallengeReward;

class Challenge extends Model
{
    use HasFactory;

    protected $fillable = [
        'gym_id',
        'coach_id',
        'name',
        'duration',
        'goal',
        'reward_id',
        'description',
        'start_date',
        'end_date',
        'participation_fee',
        'rules',
        'allow_enrollment',
        'max_participants',
        'status',
        'challenge_type',
        'required_workouts'
    ];

    public function reward()
    {
        return $this->belongsTo(ChallengeReward::class, 'reward_id');
    }

    public function participants()
    {
        return $this->hasMany(ChallengeParticipant::class);
    }
}
