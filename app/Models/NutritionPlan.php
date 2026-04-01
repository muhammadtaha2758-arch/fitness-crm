<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Member;

class NutritionPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'member_id',
        'gym_id',
        'template_id',
        'nutrition_plan',
        'start_date',
        'end_date',
        'duration',
        'description',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    public function gym()
    {
        return $this->belongsTo(User::class, 'gym_id');
    }

    public function template()
    {
        return $this->belongsTo(MealPlanTemplate::class, 'template_id');
    }
}
