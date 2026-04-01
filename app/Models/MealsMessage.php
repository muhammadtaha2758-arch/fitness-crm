<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MealsMessage extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'meals_messages';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'gym_id',
        'meal_id',
        'member_id',
        'last_message',
        'sent_by',
        'date',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * Get the member that this message belongs to.
     */
    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    /**
     * Get the user who sent the message.
     */
    public function sentBy()
    {
        return $this->belongsTo(User::class, 'sent_by');
    }

    /**
     * Get the gym that this message belongs to.
     */
    public function gym()
    {
        return $this->belongsTo(Gym::class);
    }

    /**
     * Scope to get recent messages
     */
    public function scopeRecent($query, $days = 30)
    {
        return $query->where('date', '>=', now()->subDays($days));
    }

    /**
     * Scope to get messages by member
     */
    public function scopeByMember($query, $memberId)
    {
        return $query->where('member_id', $memberId);
    }

    /**
     * Scope to get messages by gym
     */
    public function scopeByGym($query, $gymId)
    {
        return $query->where('gym_id', $gymId);
    }
}