<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CoachAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'member_id',
        'coach_id',
        'gym_id',
        'assigned_date',
        'start_date',
        'end_date',
        'session_frequency',
        'session_duration',
        'goals',
        'special_requirements',
        'status',
        'notes',
    ];

    protected $casts = [
        'assigned_date' => 'date',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    // Validation rules
    public static $rules = [
        'member_id' => 'required|exists:members,id',
        'coach_id' => 'required|exists:coaches,id',
        'gym_id' => 'required|exists:gyms,id',
        'assigned_date' => 'required|date',
        'start_date' => 'required|date|after_or_equal:assigned_date',
        'end_date' => 'nullable|date|after:start_date',
        'session_frequency' => 'required|string|max:100',
        'session_duration' => 'required|string|max:100',
        'goals' => 'required|string|max:1000',
        'special_requirements' => 'nullable|string|max:1000',
        'status' => 'required|in:active,inactive,completed,cancelled',
        'notes' => 'nullable|string|max:1000',
    ];

    // Relationships
    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function coach()
    {
        return $this->belongsTo(Coach::class);
    }

    public function gym()
    {
        return $this->belongsTo(Gym::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeByGym($query, $gymId)
    {
        return $query->where('gym_id', $gymId);
    }

    public function scopeByMember($query, $memberId)
    {
        return $query->where('member_id', $memberId);
    }

    public function scopeByCoach($query, $coachId)
    {
        return $query->where('coach_id', $coachId);
    }

    // Helper methods
    public function isActive()
    {
        return $this->status === 'active';
    }

    public function isCompleted()
    {
        return $this->status === 'completed';
    }

    public function isCancelled()
    {
        return $this->status === 'cancelled';
    }

    public function getDurationInDays()
    {
        if (!$this->end_date) {
            return null;
        }
        
        return $this->start_date->diffInDays($this->end_date);
    }

    public function getFormattedAssignedDate()
    {
        return $this->assigned_date->format('M d, Y');
    }

    public function getFormattedStartDate()
    {
        return $this->start_date->format('M d, Y');
    }

    public function getFormattedEndDate()
    {
        return $this->end_date ? $this->end_date->format('M d, Y') : 'Ongoing';
    }
}
