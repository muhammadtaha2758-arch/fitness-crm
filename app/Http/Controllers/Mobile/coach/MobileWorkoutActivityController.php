<?php

namespace App\Http\Controllers\Mobile\coach;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\HandlesApiErrors;
use App\Models\Workout;
use App\Models\WorkoutActivity;
use App\Models\WorkoutDay;
use App\Models\WorkoutActivityPlan;
use App\Models\WorkoutAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Throwable;

class MobileWorkoutActivityController extends Controller
{
    use HandlesApiErrors;
    /**
     * Get all workout activities for a specific workout
     * This is called when user clicks on a workout to see its activities
     */
    public function getWorkoutActivities(Request $request, $workoutId)
    {
        try {
            $member = $request->get('auth_member');
            
            // Check if the workout is assigned to this member
            $assignment = WorkoutAssignment::where('workout_id', $workoutId)
                ->where('member_id', $member->id)
                ->where('deleted_at', null)
                ->first();

            if (!$assignment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Workout not found or not assigned to you',
                ], 404);
            }

            // Get the workout with its days and activities
            $workout = Workout::with([
                'workoutDays.workoutActivityPlans.exercise'
            ])->findOrFail($workoutId);

            // Transform the data to a more mobile-friendly format
            $workoutData = [
                'id' => $workout->id,
                'exercise_name' => $workout->exercise_name,
                'category' => $workout->category,
                'level' => $workout->level,
                'description' => $workout->description,
                'duration' => $workout->duration,
                'equipment' => $workout->equipment,
                'thumbnail' => $workout->thumbnail,
                'muscles_targeted' => $workout->muscles_targeted,
                'calories_burned' => $workout->calories_burned,
                'instructions' => $workout->instructions,
                'difficulty' => $workout->difficulty,
                'rest_period' => $workout->rest_period,
                'tags' => $workout->tags,
                'video_link' => $workout->video_link,
                'assignment_id' => $assignment->id,
                'assigned_at' => $assignment->assigned_at,
                'start_date' => $assignment->start_date,
                'end_date' => $assignment->end_date,
                'status' => $assignment->status,
                'notes' => $assignment->notes,
                'days' => []
            ];

            // Organize activities by days
            foreach ($workout->workoutDays as $day) {
                $dayData = [
                    'day_id' => $day->id,
                    'day' => $day->day,
                    'activities' => []
                ];

                foreach ($day->workoutActivityPlans as $activityPlan) {
                    $exercise = $activityPlan->exercise;
                    
                    $activityData = [
                        'activity_id' => $activityPlan->id,
                        'exercise_id' => $activityPlan->exercise_id,
                        'exercise_name' => $activityPlan->exercise_name,
                        'sets' => $activityPlan->sets,
                        'reps' => $activityPlan->reps,
                        'rest_seconds' => $activityPlan->rest_seconds,
                        'exercise_details' => $exercise ? [
                            'category' => $exercise->category,
                            'level' => $exercise->level,
                            'description' => $exercise->description,
                            'equipment' => $exercise->equipment,
                            'thumbnail' => $exercise->thumbnail,
                            'muscles_targeted' => $exercise->muscles_targeted,
                            'calories_burned' => $exercise->calories_burned,
                            'instructions' => $exercise->instructions,
                            'difficulty' => $exercise->difficulty,
                            'video_link' => $exercise->video_link,
                            'primary_muscle_groups' => $exercise->primary_muscle_groups,
                            'secondary_muscle_groups' => $exercise->secondary_muscle_groups,
                            'intensity' => $exercise->intensity,
                            'uses_weights' => $exercise->uses_weights
                        ] : null
                    ];

                    $dayData['activities'][] = $activityData;
                }

                $workoutData['days'][] = $dayData;
            }

            return response()->json([
                'success' => true,
                'data' => $workoutData
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get workout activities error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all available workout activities (exercise library)
     */
    public function getAllActivities(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            $perPage = $request->get('per_page', 20);
            $page = $request->get('page', 1);
            $category = $request->get('category');
            $level = $request->get('level');
            $muscleGroup = $request->get('muscle_group');
            $search = $request->get('search');

            $query = WorkoutActivity::where('deleted_at', null);

            // Apply filters
            if ($category) {
                $query->where('category', $category);
            }

            if ($level) {
                $query->where('level', $level);
            }

            if ($muscleGroup) {
                $query->where(function($q) use ($muscleGroup) {
                    $q->where('muscles_targeted', 'like', '%' . $muscleGroup . '%')
                      ->orWhere('primary_muscle_groups', 'like', '%' . $muscleGroup . '%')
                      ->orWhere('secondary_muscle_groups', 'like', '%' . $muscleGroup . '%');
                });
            }

            if ($search) {
                $query->where(function($q) use ($search) {
                    $q->where('exercise_name', 'like', '%' . $search . '%')
                      ->orWhere('description', 'like', '%' . $search . '%')
                      ->orWhere('category', 'like', '%' . $search . '%');
                });
            }

            $activities = $query->paginate($perPage, ['*'], 'page', $page);

            // Transform the data
            $transformedActivities = $activities->getCollection()->map(function ($activity) {
                return [
                    'exercise_id' => $activity->exercise_id,
                    'exercise_name' => $activity->exercise_name,
                    'category' => $activity->category,
                    'level' => $activity->level,
                    'description' => $activity->description,
                    'duration' => $activity->duration,
                    'equipment' => $activity->equipment,
                    'thumbnail' => $activity->thumbnail,
                    'muscles_targeted' => $activity->muscles_targeted,
                    'calories_burned' => $activity->calories_burned,
                    'instructions' => $activity->instructions,
                    'difficulty' => $activity->difficulty,
                    'rest_period' => $activity->rest_period,
                    'tags' => $activity->tags,
                    'video_link' => $activity->video_link,
                    'primary_muscle_groups' => $activity->primary_muscle_groups,
                    'secondary_muscle_groups' => $activity->secondary_muscle_groups,
                    'intensity' => $activity->intensity,
                    'uses_weights' => $activity->uses_weights
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedActivities,
                'pagination' => [
                    'current_page' => $activities->currentPage(),
                    'last_page' => $activities->lastPage(),
                    'per_page' => $activities->perPage(),
                    'total' => $activities->total(),
                    'from' => $activities->firstItem(),
                    'to' => $activities->lastItem()
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get all activities error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get activity categories for filtering
     */
    public function getActivityCategories(Request $request)
    {
        try {
            $categories = WorkoutActivity::where('deleted_at', null)
                ->distinct()
                ->pluck('category')
                ->filter()
                ->values();

            return response()->json([
                'success' => true,
                'data' => $categories
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get activity categories error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get activity levels for filtering
     */
    public function getActivityLevels(Request $request)
    {
        try {
            $levels = WorkoutActivity::where('deleted_at', null)
                ->distinct()
                ->pluck('level')
                ->filter()
                ->values();

            return response()->json([
                'success' => true,
                'data' => $levels
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get activity levels error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get muscle groups for filtering
     */
    public function getMuscleGroups(Request $request)
    {
        try {
            $muscleGroups = WorkoutActivity::where('deleted_at', null)
                ->whereNotNull('muscles_targeted')
                ->distinct()
                ->pluck('muscles_targeted')
                ->filter()
                ->values();

            return response()->json([
                'success' => true,
                'data' => $muscleGroups
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get muscle groups error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get specific activity details
     */
    public function getActivityDetails(Request $request, $activityId)
    {
        try {
            $member = $request->get('auth_member');
            
            $activity = WorkoutActivity::where('exercise_id', $activityId)
                ->where('deleted_at', null)
                ->first();

            if (!$activity) {
                return response()->json([
                    'success' => false,
                    'message' => 'Activity not found',
                ], 404);
            }

            $activityData = [
                'exercise_id' => $activity->exercise_id,
                'exercise_name' => $activity->exercise_name,
                'category' => $activity->category,
                'level' => $activity->level,
                'description' => $activity->description,
                'duration' => $activity->duration,
                'equipment' => $activity->equipment,
                'thumbnail' => $activity->thumbnail,
                'muscles_targeted' => $activity->muscles_targeted,
                'calories_burned' => $activity->calories_burned,
                'instructions' => $activity->instructions,
                'difficulty' => $activity->difficulty,
                'rest_period' => $activity->rest_period,
                'tags' => $activity->tags,
                'video_link' => $activity->video_link,
                'primary_muscle_groups' => $activity->primary_muscle_groups,
                'secondary_muscle_groups' => $activity->secondary_muscle_groups,
                'primary_joint' => $activity->primary_joint,
                'type' => $activity->type,
                'uses_weights' => $activity->uses_weights,
                'intensity' => $activity->intensity,
                'sets_configuration' => $activity->sets_configuration,
                'rest_period_seconds' => $activity->rest_period_seconds,
                'qr_link' => $activity->qr_link,
                'manufacturer' => $activity->manufacturer
            ];

            return response()->json([
                'success' => true,
                'data' => $activityData
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get activity details error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }
}
