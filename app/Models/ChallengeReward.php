<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ChallengeReward extends Model
{
    use HasFactory;

    protected $table = 'challenges_rewards';

    protected $fillable = [
        'gym_id',
        'name',
        'description',
        'points',
        'category',
        'status',
    ];

    /**
     * Get the gym that owns the reward.
     */
    public function gym()
    {
        return $this->belongsTo(Gym::class);
    }

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'points' => 'integer',
        'gym_id' => 'integer',
    ];
}
