<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use SoftDeletes;

    protected $table = 'tasks';

    protected $fillable = [
        'gym_id',
        'member_id',
        'coach_id',
        'user_id',
        'assigned_to',
        'title',
        'description',
        'concerns',
        'category',
        'priority',
        'status',
        'due_date',
        'due_time',
        'duration',
        'completed_date',
        'notes',
        'task_type',
    ];

    protected $casts = [
        'gym_id' => 'integer',
        'member_id' => 'integer',
        'coach_id' => 'integer',
        'user_id' => 'integer',
        'assigned_to' => 'integer',
        'due_date' => 'date',
        'due_time' => 'datetime',
        'duration' => 'integer',
        'completed_date' => 'date',
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

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function gym()
    {
        return $this->belongsTo(Gym::class);
    }

    // Scopes
    public function scopeByMember($query, $memberId)
    {
        return $query->where('member_id', $memberId);
    }

    public function scopeByCoach($query, $coachId)
    {
        return $query->where('coach_id', $coachId);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByPriority($query, $priority)
    {
        return $query->where('priority', $priority);
    }

    public function scopeByTaskType($query, $type)
    {
        return $query->where('task_type', $type);
    }

    public function scopeOverdue($query)
    {
        return $query->where('due_date', '<', now()->toDateString())
                    ->whereNotIn('status', ['completed', 'cancelled']);
    }

    public function scopeDueSoon($query, $days = 7)
    {
        $dueDate = now()->addDays($days)->toDateString();
        return $query->where('due_date', '<=', $dueDate)
                    ->whereNotIn('status', ['completed', 'cancelled']);
    }
}
