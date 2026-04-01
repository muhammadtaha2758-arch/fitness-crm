<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class MemberGoal extends Model
{
    protected $table = 'member_goals';

    protected $fillable = [
        'gym_id',
        'member_id',
        'goal_type',
        'goal_frequency',
        'target_value',
        'target_unit',
        'target_description',
        'is_active',
        'start_date',
        'end_date',
        'current_streak',
        'longest_streak',
        'last_activity_date',
    ];

    protected $casts = [
        'target_value' => 'decimal:2',
        'activity_value' => 'decimal:2',
        'is_active' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
        'last_activity_date' => 'date',
        'current_streak' => 'integer',
        'longest_streak' => 'integer',
    ];

    /**
     * Get the member that owns this goal
     */
    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    /**
     * Get all activities for this goal
     */
    public function activities()
    {
        return $this->hasMany(GoalActivity::class, 'member_id', 'member_id')
                    ->where('goal_type', $this->goal_type);
    }

    /**
     * Scope to get only active goals
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', 1);
    }

    /**
     * Scope to filter by goal type
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('goal_type', $type);
    }

    /**
     * Scope to filter by member
     */
    public function scopeForMember($query, $memberId)
    {
        return $query->where('member_id', $memberId);
    }

    /**
     * Calculate progress percentage for goals
     */
    public function getProgressPercentage()
    {
        if ($this->goal_frequency === 'WEEKLY' && $this->target_value) {
            $weekStart = Carbon::now()->startOfWeek();
            $completedCount = GoalActivity::where('member_id', $this->member_id)
                ->where('goal_type', $this->goal_type)
                ->where('activity_date', '>=', $weekStart)
                ->where('is_completed', 1)
                ->count();
            
            return min(100, round(($completedCount / $this->target_value) * 100, 0));
        }
        
        // For daily goals, calculate based on today's activity
        if ($this->goal_frequency === 'DAILY' && $this->target_value) {
            $todayActivity = GoalActivity::where('member_id', $this->member_id)
                ->where('goal_type', $this->goal_type)
                ->where('activity_date', Carbon::today())
                ->where('is_completed', 1)
                ->first();
            
            if ($todayActivity && $todayActivity->activity_value) {
                return min(100, round(($todayActivity->activity_value / $this->target_value) * 100, 0));
            }
        }
        
        return 0;
    }
}

