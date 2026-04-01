<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MobileNotification extends Model
{
    protected $table = 'notification_mobile';

    protected $fillable = [
        'gym_id',
        'member_id',
        'icon',
        'title',
        'subtitle',
        'description',
        'notification_date',
        'is_read',
        'is_active'
    ];

    protected $casts = [
        'gym_id' => 'integer',
        'member_id' => 'integer',
        'notification_date' => 'datetime',
        'is_read' => 'boolean',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    protected $dates = [
        'notification_date'
    ];

    /**
     * Get the gym that owns the notification
     */
    public function gym()
    {
        return $this->belongsTo(Gym::class, 'gym_id');
    }

    /**
     * Get the member that owns the notification
     */
    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    /**
     * Scope to get only active notifications
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to get only unread notifications
     */
    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }

    /**
     * Scope to get notifications for a specific member
     */
    public function scopeForMember($query, $memberId)
    {
        return $query->where('member_id', $memberId);
    }

    /**
     * Scope to get notifications for a specific gym
     */
    public function scopeForGym($query, $gymId)
    {
        return $query->where('gym_id', $gymId);
    }

    /**
     * Scope to get recent notifications
     */
    public function scopeRecent($query, $days = 30)
    {
        return $query->where('notification_date', '>=', now()->subDays($days));
    }

    /**
     * Mark notification as read
     */
    public function markAsRead()
    {
        $this->update(['is_read' => true]);
    }

    /**
     * Mark notification as unread
     */
    public function markAsUnread()
    {
        $this->update(['is_read' => false]);
    }

    /**
     * Activate notification
     */
    public function activate()
    {
        $this->update(['is_active' => true]);
    }

    /**
     * Deactivate notification
     */
    public function deactivate()
    {
        $this->update(['is_active' => false]);
    }
}
