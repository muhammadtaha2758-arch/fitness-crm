<?php

namespace App\Http\Controllers\Mobile\coach;

use App\Http\Controllers\Controller;
use App\Models\WorkoutActivityPlan;
use App\Models\VideoCatalog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MobileActivityPlanController extends Controller
{
    /**
     * Get activity plan by planId or exerciseId
     */
    public function get(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'plan_id' => 'nullable|integer',
                'exercise_id' => 'nullable|integer',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $gymId = $request->user('api')->gym_id;
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 403);
            }

            $planId = $request->input('plan_id');
            $exerciseId = $request->input('exercise_id');

            $query = WorkoutActivityPlan::where('gym_id', $gymId);

            if ($planId) {
                $query->where('plan_id', $planId);
            } elseif ($exerciseId) {
                $query->where('exercise_id', $exerciseId);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Either plan_id or exercise_id must be provided'
                ], 422);
            }

            $plan = $query->first();

            if (!$plan) {
                return response()->json([
                    'success' => true,
                    'data' => null,
                    'message' => 'No activity plan found'
                ], 200);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $plan->id,
                    'plan_id' => $plan->plan_id,
                    'exercise_id' => $plan->exercise_id,
                    'exercise_name' => $plan->exercise_name,
                    'sets_configuration' => $plan->sets_configuration,
                    'personal_note' => $plan->personal_note,
                    'activity_intensity' => $plan->activity_intensity,
                    'input_mode' => $plan->input_mode,
                    'sets' => $plan->sets,
                    'reps' => $plan->reps,
                    'rest_seconds' => $plan->rest_seconds,
                ]
            ], 200);

        } catch (\Exception $e) {
            Log::error('Get activity plan error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Save activity plan (create or update)
     */
    public function save(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'exercise_id' => 'nullable|integer',
                'exercise_name' => 'required|string|max:255',
                'thumbnail_url' => 'nullable|string',
                'thumbnail_filename' => 'nullable|string',
                'sets' => 'required|integer|min:1',
                'reps' => 'nullable|integer|min:0',
                'rest_seconds' => 'required|integer|min:0',
                'sets_configuration' => 'required|array',
                'sets_configuration.*.reps' => 'nullable|integer|min:0',
                'sets_configuration.*.rest' => 'required|integer|min:0',
                'sets_configuration.*.weight' => 'nullable|integer|min:0',
                'sets_configuration.*.time' => 'nullable|integer|min:0',
                'personal_note' => 'nullable|string|max:200',
                'activity_intensity' => 'nullable|integer|min:1|max:5',
                'input_mode' => 'nullable|string|in:reps,time',
                'plan_id' => 'nullable|integer',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $gymId = $request->user('api')->gym_id;
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 403);
            }

            DB::beginTransaction();

            $planId = $request->input('plan_id');
            $exerciseId = $request->input('exercise_id');

            // Check if plan already exists
            $existingPlan = null;
            if ($planId) {
                $existingPlan = WorkoutActivityPlan::where('gym_id', $gymId)
                    ->where('plan_id', $planId)
                    ->first();
            } elseif ($exerciseId) {
                $existingPlan = WorkoutActivityPlan::where('gym_id', $gymId)
                    ->where('exercise_id', $exerciseId)
                    ->first();
            }

            $planData = [
                'gym_id' => $gymId,
                'exercise_id' => $exerciseId,
                'exercise_name' => $request->input('exercise_name'),
                'thumbnail_url' => $request->input('thumbnail_url'),
                'thumbnail_filename' => $request->input('thumbnail_filename'),
                'sets' => $request->input('sets'),
                'reps' => $request->input('reps', 0),
                'rest_seconds' => $request->input('rest_seconds'),
                'sets_configuration' => $request->input('sets_configuration'),
                'personal_note' => $request->input('personal_note'),
                'activity_intensity' => $request->input('activity_intensity'),
                'input_mode' => $request->input('input_mode', 'reps'),
            ];

            if ($planId) {
                $planData['plan_id'] = $planId;
            }

            if ($existingPlan) {
                // Update existing plan
                $existingPlan->update($planData);
                $plan = $existingPlan;
            } else {
                // Create new plan
                $plan = WorkoutActivityPlan::create($planData);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => $existingPlan ? 'Activity plan updated successfully' : 'Activity plan created successfully',
                'data' => [
                    'id' => $plan->id,
                    'plan_id' => $plan->plan_id,
                    'exercise_id' => $plan->exercise_id,
                    'sets_configuration' => $plan->sets_configuration,
                    'personal_note' => $plan->personal_note,
                    'activity_intensity' => $plan->activity_intensity,
                    'input_mode' => $plan->input_mode,
                ]
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Save activity plan error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage()
            ], 500);
        }
    }
}
