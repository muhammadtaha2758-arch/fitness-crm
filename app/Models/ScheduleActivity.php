<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ScheduleActivity extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'schedule_activities';

    protected $fillable = [
        'gym_id',
        'name',
        'category',
        'visible_for',
        'type',
        'can_be_added_in_schedule',
        'color',
        'met',
        'has_distance',
        'default_duration_minutes',
        'difficulty',
        'instructions',
        'tags',
        'youtube_url_male',
        'youtube_url_female',
        'qr_link',
        'manufacturer',
        'created_by',
    ];

    protected $casts = [
        'can_be_added_in_schedule' => 'boolean',
        'has_distance' => 'boolean',
        'met' => 'decimal:1',
        'tags' => 'array',
    ];
}


