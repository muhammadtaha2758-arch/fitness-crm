<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\MemberCoachingProfile;
use Illuminate\Http\Request;

class MemberCoachingProfileController extends Controller
{
    public function show($memberId)
    {
        $member = Member::findOrFail($memberId);
        $profile = $member->coachingProfile;

        return response()->json([
            'success' => true,
            'data' => $profile,
        ]);
    }

    public function upsert(Request $request, $memberId)
    {
        $member = Member::findOrFail($memberId);

        $validated = $request->validate([
            'intake_questionnaire_completed' => 'sometimes|boolean',
            'main_goal' => 'sometimes|nullable|string',
            'level' => 'sometimes|nullable|string',
            'intake_more_info' => 'sometimes|nullable|string',
            'injuries' => 'sometimes|nullable|string',
            'medical_more_info' => 'sometimes|nullable|string',
            'chronic_diseases' => 'sometimes|nullable|string',
            'medical_more_info_2' => 'sometimes|nullable|string',
            'emergency_contact' => 'sometimes|nullable|string',
            'emergency_phone' => 'sometimes|nullable|string',
            'training_plan_id' => 'sometimes|nullable|integer',
            'training_start_date' => 'sometimes|nullable|date',
            'training_end_date' => 'sometimes|nullable|date',
            'nutrition_plan_id' => 'sometimes|nullable|integer',
            'nutrition_start_date' => 'sometimes|nullable|date',
            'program_goal' => 'sometimes|nullable|string',
            'program_goal_date' => 'sometimes|nullable|date',
            'program_challenges' => 'sometimes|nullable|string',
            'account_manager_id' => 'sometimes|nullable|integer',
            'coach_ids' => 'sometimes|nullable|array',
            'coach_ids.*' => 'integer',
            'assigned_questionnaires' => 'sometimes|nullable|array',
        ]);

        $profile = MemberCoachingProfile::updateOrCreate(
            ['member_id' => $member->id],
            array_merge($validated, ['member_id' => $member->id])
        );

        return response()->json([
            'success' => true,
            'data' => $profile->fresh(),
        ]);
    }
}


