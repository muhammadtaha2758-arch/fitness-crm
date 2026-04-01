<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class CheckIn extends Model
{
    use HasFactory;

    protected $fillable = [
        'member_id',
        'member_name',
        'visitor_name',
        'gym_id',
        'check_in_time',
        'check_out_time',
        'check_in_type',
        'message',
        'checked_in_by',
    ];

    protected $casts = [
        'check_in_time' => 'datetime',
        'check_out_time' => 'datetime',
    ];

    /**
     * Get the member that owns the check-in (if member_id is set).
     */
    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }
    
    /**
     * Get the gym that owns the check-in.
     */
    public function gym()
    {
        return $this->belongsTo(\App\Models\Gym::class, 'gym_id');
    }

    /**
     * Get the user who checked in the member.
     */
    public function checkedInBy()
    {
        return $this->belongsTo(User::class, 'checked_in_by');
    }

    /**
     * Scope to get check-ins for today.
     */
    public function scopeToday($query)
    {
        return $query->whereDate('check_in_time', Carbon::today());
    }

    /**
     * Scope to get active check-ins (checked in but not checked out).
     */
    public function scopeActive($query)
    {
        return $query->whereNull('check_out_time');
    }
    
    /**
     * Scope to filter by gym_id.
     */
    public function scopeForGym($query, $gymId)
    {
        return $query->where('gym_id', $gymId);
    }
    
    /**
     * Scope to get only visitors (where visitor_name is not null).
     */
    public function scopeVisitors($query)
    {
        return $query->whereNotNull('visitor_name');
    }

    /**
     * Scope to get check-ins by date range.
     */
    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('check_in_time', [$startDate, $endDate]);
    }

    /**
     * Get the duration of the check-in in minutes.
     */
    public function getDurationAttribute()
    {
        if ($this->check_out_time) {
            return $this->check_in_time->diffInMinutes($this->check_out_time);
        }
        return null;
    }

    /**
     * Check if the member is currently checked in.
     */
    public function isActive()
    {
        return is_null($this->check_out_time);
    }

    /**
     * Format check-in time for display.
     */
    public function getFormattedCheckInTimeAttribute()
    {
        return $this->check_in_time->format('h:i:s A m/d/Y');
    }

    /**
     * Format check-out time for display.
     */
    public function getFormattedCheckOutTimeAttribute()
    {
        return $this->check_out_time ? $this->check_out_time->format('h:i:s A m/d/Y') : null;
    }
}
