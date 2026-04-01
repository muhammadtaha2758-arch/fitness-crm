<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TrainerTask extends Model
{
    use SoftDeletes;

    protected $table = 'trainer_tasks';

    protected $fillable = [
        'trainer_id',
        'user_id',
        'title',
        'category',
        'priority',
        'due_date',
        'description',
        'status',
    ];

    protected $casts = [
        'trainer_id' => 'integer',
        'user_id' => 'integer',
        'due_date' => 'date',
    ];

    // Relationships
    public function trainer()
    {
        return $this->belongsTo(Coach::class, 'trainer_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scopes
    public function scopeByTrainer($query, $trainerId)
    {
        return $query->where('trainer_id', $trainerId);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByPriority($query, $priority)
    {
        return $query->where('priority', $priority);
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

    // Accessors
    public function getIsOverdueAttribute()
    {
        return $this->due_date < now()->toDateString() && 
               !in_array($this->status, ['completed', 'cancelled']);
    }

    public function getDaysUntilDueAttribute()
    {
        $dueDate = \Carbon\Carbon::parse($this->due_date);
        $now = \Carbon\Carbon::now();
        return $now->diffInDays($dueDate, false);
    }

    public function getStatusBadgeClassAttribute()
    {
        $classes = [
            'pending' => 'badge-secondary',
            'in-progress' => 'badge-warning',
            'completed' => 'badge-success',
            'cancelled' => 'badge-danger'
        ];
        return $classes[$this->status] ?? 'badge-secondary';
    }

    public function getPriorityBadgeClassAttribute()
    {
        $classes = [
            'Low' => 'badge-success',
            'Medium' => 'badge-info',
            'High' => 'badge-warning',
            'Urgent' => 'badge-danger'
        ];
        return $classes[$this->priority] ?? 'badge-secondary';
    }

    public function getCategoryBadgeClassAttribute()
    {
        $classes = [
            'Training' => 'badge-primary',
            'Client Management' => 'badge-success',
            'Administrative' => 'badge-info',
            'Maintenance' => 'badge-warning',
            'Professional Development' => 'badge-secondary',
            'Other' => 'badge-dark'
        ];
        return $classes[$this->category] ?? 'badge-secondary';
    }
}
