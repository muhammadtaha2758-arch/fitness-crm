<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MealPlanTemplateDetail extends Model
{
    use SoftDeletes;

    protected $table = 'meal_plan_template_details';

    protected $fillable = [
        'template_id',
        'gym_id',
        'food_id',
        'food_name',
        'nutrition_type', 
        'quantity',
        'normalized_serving',
        'label_serving',
        'calories', 
        'protein', 
        'carbs', 
        'fats',
        'fiber',
        'sodium',
        'potassium',
        'notes',
        // Meals messages columns (migrated from meals_messages table)
        'member_id',
        'last_message',
        'sent_by',
        'message_date'
    ];

    /**
     * The attributes that should be visible in arrays/JSON.
     * Ensure normalized_serving, label_serving, and notes are always included
     */
    protected $visible = [
        'id',
        'template_id',
        'gym_id',
        'food_id',
        'food_name',
        'nutrition_type',
        'quantity',
        'normalized_serving',
        'label_serving',
        'calories',
        'protein',
        'carbs',
        'fats',
        'fiber',
        'sodium',
        'potassium',
        'notes',
        'member_id',
        'last_message',
        'sent_by',
        'message_date',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    /**
     * Get the template this detail belongs to
     */
    public function template()
    {
        return $this->belongsTo(MealPlanTemplate::class, 'template_id');
    }

    /**
     * Get the food item
     */
    public function food()
    {
        return $this->belongsTo(Food::class, 'food_id');
    }

    /**
     * Get the gym this detail belongs to
     */
    public function gym()
    {
        return $this->belongsTo(\App\Models\Gym::class, 'gym_id');
    }

    /**
     * Get the member this message belongs to (from meals_messages migration)
     */
    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    /**
     * Get the user who sent the message (from meals_messages migration)
     */
    public function sentBy()
    {
        return $this->belongsTo(User::class, 'sent_by');
    }

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'message_date' => 'datetime',
        'quantity' => 'decimal:2',
        'calories' => 'decimal:2',
        'protein' => 'decimal:2',
        'carbs' => 'decimal:2',
        'fats' => 'decimal:2',
        'fiber' => 'decimal:2',
        'sodium' => 'decimal:2',
        'potassium' => 'decimal:2',
    ];
}

