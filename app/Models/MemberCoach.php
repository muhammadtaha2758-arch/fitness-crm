<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MemberCoach extends Model
{
    use HasFactory;

    protected $table = 'member_coach';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'member_id',
        'coach_id',
        'assigned_date',
        'start_date',
        'end_date',
        'status',
        'notes',
        'session_frequency',
        'session_duration',
        'special_requirements',
        'goals',
        'progress_notes',
        'created_at',
        'updated_at'
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'assigned_date' => 'date',
        'end_date' => 'date',
        'session_duration' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the member that belongs to this relationship.
     */
    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    /**
     * Get the coach that belongs to this relationship.
     */
    public function coach()
    {
        return $this->belongsTo(Coach::class);
    }

    /**
     * Scope to get active assignments
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope to get assignments by member
     */
    public function scopeByMember($query, $memberId)
    {
        return $query->where('member_id', $memberId);
    }

    /**
     * Scope to get assignments by coach
     */
    public function scopeByCoach($query, $coachId)
    {
        return $query->where('coach_id', $coachId);
    }
}
