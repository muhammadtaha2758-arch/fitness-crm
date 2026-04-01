<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class GoalActivity extends Model
{
    protected $table = 'goal_activities';

    protected $fillable = [
        'gym_id',
        'member_id',
        'goal_type',
        'activity_date',
        'activity_value',
        'activity_unit',
        'is_completed',
        'notes',
        'source',
    ];

    protected $casts = [
        'activity_value' => 'decimal:2',
        'activity_date' => 'date',
        'is_completed' => 'boolean',
    ];

    /**
     * Get the member that owns this activity
     */
    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    /**
     * Get the goal associated with this activity
     */
    public function goal()
    {
        return $this->belongsTo(MemberGoal::class, 'member_id', 'member_id')
                    ->where('goal_type', $this->goal_type);
    }

    /**
     * Scope to filter by member
     */
    public function scopeForMember($query, $memberId)
    {
        return $query->where('member_id', $memberId);
    }

    /**
     * Scope to filter by goal type
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('goal_type', $type);
    }

    /**
     * Scope to filter by date range
     */
    public function scopeDateRange($query, $startDate, $endDate = null)
    {
        $query->where('activity_date', '>=', $startDate);
        
        if ($endDate) {
            $query->where('activity_date', '<=', $endDate);
        }
        
        return $query;
    }

    /**
     * Scope to get only completed activities
     */
    public function scopeCompleted($query)
    {
        return $query->where('is_completed', 1);
    }

    /**
     * Scope to get activities for current week
     */
    public function scopeCurrentWeek($query)
    {
        $weekStart = Carbon::now()->startOfWeek();
        return $query->where('activity_date', '>=', $weekStart);
    }

    /**
     * Scope to get activities for current month
     */
    public function scopeCurrentMonth($query)
    {
        $monthStart = Carbon::now()->startOfMonth();
        return $query->where('activity_date', '>=', $monthStart);
    }
}

