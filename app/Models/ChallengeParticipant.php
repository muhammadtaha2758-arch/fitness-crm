<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChallengeParticipant extends Model
{
    use HasFactory;

    protected $table = 'challenge_participants';

    protected $fillable = [
        'challenge_id',
        'member_id',
        'gym_id',
        'progress',
        'status',
        'last_activity',
    ];

    protected $casts = [
        'last_activity' => 'datetime',
    ];

    // Relationship with Challenge (optional)
    public function challenge()
    {
        return $this->belongsTo(Challenge::class);
    }

    // Relationship with Member
    public function member()
    {
        return $this->belongsTo(Member::class);
    }
    
}
