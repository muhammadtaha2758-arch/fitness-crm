<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutActivity extends Model
{
    protected $dates = ['deleted_at'];
    
    // Specify the primary key if it's not 'id'
    protected $primaryKey = 'exercise_id';
    
    // Disable auto-incrementing if the primary key is not auto-increment
    public $incrementing = false;

    protected $fillable = [
        'exercise_id',
        'exercise_name',
        'category',
        'duration',
        'level',
        'description',
        'equipment',
        'thumbnail',
        'muscles_targeted',
        'calories_burned',
        'instructions',
        'difficulty',
        'rest_period',
        'sets',
        'tags',
        'video_link',
        // New fields from the form
        'visible_for',
        'primary_muscle_groups',
        'secondary_muscle_groups',
        'primary_body_part_image',
        'secondary_body_part_image',
        'equipment_image',
        'primary_joint',
        'type',
        'uses_weights',
        'intensity',
        'sets_configuration',
        'rest_period_seconds',
        'qr_link',
        'manufacturer',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'exercise_id' => 'integer',
        'difficulty' => 'integer',
        'calories_burned' => 'integer',
        'rest_period' => 'integer',
        'rest_period_seconds' => 'integer',
        'intensity' => 'integer',
        'uses_weights' => 'boolean',
        'sets' => 'array',
        'primary_muscle_groups' => 'array',
        'secondary_muscle_groups' => 'array',
        'sets_configuration' => 'array',
    ];
}
