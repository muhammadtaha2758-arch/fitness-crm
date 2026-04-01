<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminNotification extends Model
{
    use HasFactory;

    protected $table = 'admin_notifications';

    protected $fillable = [
        'user_id',
        'member_id',
        'coach_id',
        'gym_id',
        'type',
        'title',
        'message',
        'icon',
        'color',
        'related_type',
        'related_id',
        'is_read',
        'read_at',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'member_id' => 'integer',
        'coach_id' => 'integer',
        'gym_id' => 'integer',
        'is_read' => 'boolean',
        'read_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Boot the model and register event listeners
     */
    protected static function boot()
    {
        parent::boot();

        /**
         * Automatically set gym_id from users table when user_id is present
         * This ensures gym_id is always set from the users table instead of hardcoded values
         */
        static::creating(function ($notification) {
            // If user_id is set and gym_id is not explicitly set or is 1 (default), get it from users table
            if ($notification->user_id && (!$notification->gym_id || $notification->gym_id == 1)) {
                $user = User::find($notification->user_id);
                if ($user && $user->gym_id) {
                    $notification->gym_id = $user->gym_id;
                }
            }
        });
    }

    /**
     * Get the user that owns the notification (for admin users)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the member that owns the notification
     */
    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    /**
     * Get the coach that owns the notification
     */
    public function coach()
    {
        return $this->belongsTo(Coach::class, 'coach_id');
    }

    /**
     * Get the related model (polymorphic)
     */
    public function related()
    {
        return $this->morphTo();
    }

    /**
     * Get the related member (from related_id when related_type is 'member')
     */
    public function relatedMember()
    {
        return $this->belongsTo(Member::class, 'related_id')
            ->where('related_type', 'member');
    }

    /**
     * Get the related coach (from related_id when related_type is 'coach')
     */
    public function relatedCoach()
    {
        return $this->belongsTo(Coach::class, 'related_id')
            ->where('related_type', 'coach');
    }

    /**
     * Scope to get only unread notifications
     */
    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }

    /**
     * Scope to get only read notifications
     */
    public function scopeRead($query)
    {
        return $query->where('is_read', true);
    }

    /**
     * Scope to get notifications for a specific admin user
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope to get notifications for a specific admin user (alias)
     */
    public function scopeForAdmin($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope to get notifications for a specific member
     */
    public function scopeForMember($query, $memberId)
    {
        return $query->where('member_id', $memberId);
    }

    /**
     * Scope to get notifications for a specific coach
     * Uses user_id since coaches are linked to users table
     * 
     * @param int $userId User ID from users table (coach's user_id)
     */
    public function scopeForCoach($query, $userId)
    {
        // Use user_id instead of coach_id since coaches use users table
        return $query->where('user_id', $userId);
    }

    /**
     * Scope to get recent notifications
     */
    public function scopeRecent($query, $days = 30)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    /**
     * Scope to filter by related_type
     */
    public function scopeByRelatedType($query, $relatedType)
    {
        return $query->where('related_type', $relatedType);
    }

    /**
     * Scope to filter by notification type
     */
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope to filter by category/feature group
     * 
     * @param string $category Category name: 'messages', 'tasks', 'support', 'notes', 'schedule', 'appointments', 'workouts', 'nutrition', 'challenges', 'invoices', 'coach_assignments'
     */
    public function scopeByCategory($query, $category)
    {
        $categoryMap = [
            'messages' => ['message'],
            'tasks' => ['task'],
            'support' => ['support'],
            'notes' => ['note'],
            'schedule' => ['schedule_event'],
            'appointments' => ['appointment'],
            'workouts' => ['workout_assignment'],
            'nutrition' => ['nutrition_assignment'],
            'challenges' => ['challenge'],
            'invoices' => ['invoice'],
            'coach_assignments' => ['coach_assignment'],
        ];
        
        if (isset($categoryMap[$category])) {
            return $query->whereIn('related_type', $categoryMap[$category]);
        }
        
        return $query;
    }

    /**
     * Scope to filter by multiple related types
     */
    public function scopeByRelatedTypes($query, array $relatedTypes)
    {
        return $query->whereIn('related_type', $relatedTypes);
    }

    /**
     * Get the recipient type of this notification
     * Returns 'admin', 'member', or 'coach'
     */
    public function getRecipientType()
    {
        if ($this->user_id) {
            return 'admin';
        }
        if ($this->member_id) {
            return 'member';
        }
        if ($this->coach_id) {
            return 'coach';
        }
        return null;
    }

    /**
     * Mark notification as read
     */
    public function markAsRead()
    {
        $this->update([
            'is_read' => true,
            'read_at' => now(),
        ]);
    }

    /**
     * Mark notification as unread
     */
    public function markAsUnread()
    {
        $this->update([
            'is_read' => false,
            'read_at' => null,
        ]);
    }

    /**
     * Get the related model based on related_type
     * Returns the actual model instance (Message, Task, Support, Note, ScheduleEvent, etc.)
     */
    public function getRelatedModel()
    {
        if (!$this->related_type || !$this->related_id) {
            return null;
        }

        $modelMap = [
            'message' => MemberMessage::class,
            'task' => Task::class,
            'support' => Support::class,
            'note' => Note::class,
            'schedule_event' => ScheduleEvent::class,
            'appointment' => \App\Models\Appointment::class,
            'workout_assignment' => \App\Models\WorkoutAssignment::class,
            'nutrition_assignment' => \App\Models\NutritionAssignment::class,
            'challenge' => \App\Models\Challenge::class,
            'invoice' => \App\Models\Invoice::class,
            'coach_assignment' => \App\Models\CoachAssignment::class,
            'member' => Member::class,
            'coach' => Coach::class,
        ];

        $modelClass = $modelMap[$this->related_type] ?? null;
        
        if (!$modelClass || !class_exists($modelClass)) {
            return null;
        }

        try {
            return $modelClass::find($this->related_id);
        } catch (\Exception $e) {
            \Log::warning("Failed to load related model for notification {$this->id}", [
                'related_type' => $this->related_type,
                'related_id' => $this->related_id,
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }

    /**
     * Get the category/feature group for this notification
     * Returns: 'messages', 'tasks', 'support', 'notes', 'schedule', 'appointments', 'workouts', 'nutrition', 'challenges', 'invoices', 'coach_assignments', or null
     */
    public function getCategory()
    {
        if (!$this->related_type) {
            return null;
        }

        $categoryMap = [
            'message' => 'messages',
            'task' => 'tasks',
            'support' => 'support',
            'note' => 'notes',
            'schedule_event' => 'schedule',
            'appointment' => 'appointments',
            'workout_assignment' => 'workouts',
            'nutrition_assignment' => 'nutrition',
            'challenge' => 'challenges',
            'invoice' => 'invoices',
            'coach_assignment' => 'coach_assignments',
        ];

        return $categoryMap[$this->related_type] ?? null;
    }

    /**
     * Check if notification is of a specific category
     */
    public function isCategory($category)
    {
        return $this->getCategory() === $category;
    }

    /**
     * Get the feature name for display purposes
     */
    public function getFeatureName()
    {
        $featureMap = [
            'message' => 'Message',
            'task' => 'Task',
            'support' => 'Support Ticket',
            'note' => 'Note',
            'schedule_event' => 'Schedule Event',
            'appointment' => 'Appointment',
            'workout_assignment' => 'Workout',
            'nutrition_assignment' => 'Nutrition Plan',
            'challenge' => 'Challenge',
            'invoice' => 'Invoice',
            'coach_assignment' => 'Coach Assignment',
        ];

        return $featureMap[$this->related_type] ?? ucfirst($this->related_type ?? 'Notification');
    }

    /**
     * Relationships for related models
     * Note: These relationships only work when related_type matches
     * Use getRelatedModel() for a more reliable way to get the related model
     */
    
    /**
     * Get the related message (when related_type is 'message')
     */
    public function relatedMessage()
    {
        return $this->belongsTo(MemberMessage::class, 'related_id');
    }

    /**
     * Get the related task (when related_type is 'task')
     */
    public function relatedTask()
    {
        return $this->belongsTo(Task::class, 'related_id');
    }

    /**
     * Get the related support ticket (when related_type is 'support')
     */
    public function relatedSupport()
    {
        return $this->belongsTo(Support::class, 'related_id');
    }

    /**
     * Get the related note (when related_type is 'note')
     */
    public function relatedNote()
    {
        return $this->belongsTo(Note::class, 'related_id');
    }

    /**
     * Get the related schedule event (when related_type is 'schedule_event')
     */
    public function relatedScheduleEvent()
    {
        return $this->belongsTo(ScheduleEvent::class, 'related_id');
    }
}
