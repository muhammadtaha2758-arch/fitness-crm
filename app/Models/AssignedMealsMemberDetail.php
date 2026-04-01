<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AssignedMealsMemberDetail extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'assigned_meals_member_details';

    protected $fillable = [
        'assigned_meal_id',
        'member_id',
        'gym_id',
        'food_id',
        'nutrition_type',
        'label_serving',
        'unit',
        'quantity',
        'calories',
        'protein',
        'carbs',
        'fats',
        'notes',
    ];

    protected $casts = [
        'quantity' => 'decimal:2',
        'calories' => 'decimal:2',
        'protein' => 'decimal:2',
        'carbs' => 'decimal:2',
        'fats' => 'decimal:2',
    ];

    /**
     * Get the assigned meal this detail belongs to
     */
    public function assignedMeal()
    {
        return $this->belongsTo(AssignedMealsMember::class, 'assigned_meal_id');
    }

    /**
     * Get the member this detail belongs to
     */
    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    /**
     * Get the food item
     */
    public function food()
    {
        return $this->belongsTo(Food::class, 'food_id');
    }
}
