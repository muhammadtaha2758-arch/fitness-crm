<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NutritionDetail extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'nutrition_id', 'food_id', 'nutrition_type', 'quantity',
        'calories', 'protein', 'carbs', 'fats'
    ];

    public function nutrition()
    {
        return $this->belongsTo(Nutrition::class);
    }

    public function food()
    {
        return $this->belongsTo(Food::class);
    }
}
