<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MemberCoachingProfile extends Model
{
    protected $table = 'member_coaching_profiles';

    protected $fillable = [
        'member_id',
        'intake_questionnaire_completed',
        'main_goal',
        'level',
        'intake_more_info',
        'injuries',
        'medical_more_info',
        'chronic_diseases',
        'medical_more_info_2',
        'emergency_contact',
        'emergency_phone',
        'training_plan_id',
        'training_start_date',
        'training_end_date',
        'nutrition_plan_id',
        'nutrition_start_date',
        'program_goal',
        'program_goal_date',
        'program_challenges',
        'account_manager_id',
        'coach_ids',
        'assigned_questionnaires',
    ];

    protected $casts = [
        'intake_questionnaire_completed' => 'boolean',
        'training_start_date' => 'date',
        'training_end_date' => 'date',
        'nutrition_start_date' => 'date',
        'program_goal_date' => 'date',
        'coach_ids' => 'array',
        'assigned_questionnaires' => 'array',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class);
    }
}


