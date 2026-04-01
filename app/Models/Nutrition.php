<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Nutrition extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'gym_id', 'category_id', 'name', 'description', 'visibility', 'meal_image', 'status',
        'calories', 'protein', 'carbs', 'fats', 'target_protein', 'target_carbs', 'target_fat', 'target_calories',
        'created_by', 'created_by_type'
    ];

    public function details()
    {
        return $this->hasMany(NutritionDetail::class);
    }

    public function assignedPlans()
    {
        return $this->hasMany(NutritionPlan::class, 'template_id');
    }

    public function category()
    {
        return $this->belongsTo(NutritionCategory::class, 'category_id');
    }

    public function createdByMember()
    {
        return $this->belongsTo(Member::class, 'created_by');
    }

    public function createdByAdmin()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
