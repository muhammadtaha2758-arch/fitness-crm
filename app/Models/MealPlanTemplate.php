<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MealPlanTemplate extends Model
{
    use SoftDeletes;

    protected $table = 'meal_plans_template';

    protected $fillable = [
        'gym_id', 
        'coach_id',
        'category_id', 
        'name', 
        'description', 
        'instructions',
        'meals_time',
        'meal_image', 
        'status',
        'calories', 
        'protein', 
        'carbs', 
        'fats', 
        'target_protein', 
        'target_carbs', 
        'target_fat', 
        'target_calories',
        'created_by', 
        'created_by_type'
    ];

    /**
     * Get the nutrition details (food items) for this template
     */
    public function details()
    {
        return $this->hasMany(MealPlanTemplateDetail::class, 'template_id');
    }

    /**
     * Get the assigned plans using this template
     */
    public function assignedPlans()
    {
        return $this->hasMany(NutritionPlan::class, 'template_id');
    }

    /**
     * Get the assigned meals using this template
     */
    public function assignedMeals()
    {
        return $this->hasMany(AssignedMealsMember::class, 'template_id');
    }

    /**
     * Get the category
     */
    public function category()
    {
        return $this->belongsTo(NutritionCategory::class, 'category_id');
    }

    /**
     * Get the gym
     */
    public function gym()
    {
        return $this->belongsTo(Gym::class, 'gym_id');
    }

    /**
     * Get the member who created this template (if created by member)
     */
    public function createdByMember()
    {
        return $this->belongsTo(Member::class, 'created_by');
    }

    /**
     * Get the admin/user who created this template (if created by admin)
     */
    public function createdByAdmin()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}