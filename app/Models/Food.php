<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    protected $table = 'foods';
    
    // Use 'id' as the primary key since that's what the table has
    protected $primaryKey = 'id';

    // Enable timestamps to handle created_at column
    public $timestamps = true;

    protected $fillable = [
        'food_id',
        'name',
        'description',
        'serving_description',
        'calories',
        'fat',
        'saturated_fat',
        'trans_fat',
        'polyunsaturated_fat',
        'monounsaturated_fat',
        'cholesterol',
        'sodium',
        'carbohydrate',
        'fiber',
        'sugar',
        'protein',
        'vitamin_d',
        'calcium',
        'iron',
        'potassium',
        'vitamin_a',
        'vitamin_c',
        'food_type',
        'fatsecret_url',
    ];

    protected $casts = [
        'calories' => 'float',
        'fat' => 'float',
        'saturated_fat' => 'float',
        'trans_fat' => 'float',
        'polyunsaturated_fat' => 'float',
        'monounsaturated_fat' => 'float',
        'cholesterol' => 'float',
        'sodium' => 'float',
        'carbohydrate' => 'float',
        'fiber' => 'float',
        'sugar' => 'float',
        'protein' => 'float',
        'vitamin_d' => 'float',
        'calcium' => 'float',
        'iron' => 'float',
        'potassium' => 'float',
        'vitamin_a' => 'float',
        'vitamin_c' => 'float',
    ];

    // Scope to get foods by food_type (case-insensitive)
    public function scopeByFoodType($query, $foodType)
    {
        return $query->whereNotNull('food_type')
            ->where('food_type', '!=', '')
            ->whereRaw('LOWER(TRIM(food_type)) = ?', [strtolower(trim($foodType))]);
    }

    // Scope to get all available food types
    public function scopeGetFoodTypes($query)
    {
        return $query->select('food_type')
            ->distinct()
            ->whereNotNull('food_type')
            ->where('food_type', '!=', '');
    }
}
