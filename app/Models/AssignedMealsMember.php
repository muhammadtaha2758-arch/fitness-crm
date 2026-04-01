<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\MealPlanTemplate;
use App\Models\User;

class AssignedMealsMember extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'assigned_meals_members';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'gym_id',
        'template_id',
        'coach_id',
        'meal_id',
        'member_id',
        'description',
        'assigned_by',
        'date',
        'start_date',
        'end_date',
        'duration',
        'weight',
        'body',
        'fat',
        'water',
        'intake',
        'hunger',
        'strength',
        'energy',
        'meal_deviations',
        'activities',
        'feel',
        'cardio',
        'plan',
        'calories',
        'protein',
        'carbs',
        'fat_macros',
        'notes',
        'is_active',
        'category_id',
        'category_name',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'date' => 'date',
        'start_date' => 'date',
        'end_date' => 'date',
        'weight' => 'decimal:2',
        'body' => 'decimal:2',
        'fat' => 'decimal:2',
        'water' => 'decimal:2',
        'intake' => 'decimal:2',
        'hunger' => 'integer',
        'strength' => 'integer',
        'energy' => 'integer',
        'calories' => 'integer',
        'protein' => 'decimal:2',
        'carbs' => 'decimal:2',
        'fat_macros' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * Get the member that belongs to this nutrition log.
     */
    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    /**
     * Get the meal plan template that was assigned.
     */
    public function template()
    {
        return $this->belongsTo(MealPlanTemplate::class, 'template_id');
    }

    /**
     * Get the user who assigned this meal plan.
     */
    public function assignedBy()
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }

    /**
     * Scope to get logs by member
     */
    public function scopeByMember($query, $memberId)
    {
        return $query->where('member_id', $memberId);
    }

    /**
     * Scope to get logs by date range
     */
    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('date', [$startDate, $endDate]);
    }

    /**
     * Scope to get recent logs
     */
    public function scopeRecent($query, $days = 30)
    {
        return $query->where('date', '>=', now()->subDays($days));
    }

    /**
     * Get the member-specific meal details (customized meals)
     */
    public function memberDetails()
    {
        return $this->hasMany(AssignedMealsMemberDetail::class, 'assigned_meal_id');
    }
}