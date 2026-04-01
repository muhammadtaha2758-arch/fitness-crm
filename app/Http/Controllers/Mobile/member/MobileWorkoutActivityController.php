<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\Workout;
use App\Models\WorkoutActivity;
use App\Models\WorkoutDay;
use App\Models\WorkoutActivityPlan;
use App\Models\WorkoutAssignment;
use App\Models\VideoCatalog;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class MobileWorkoutActivityController extends Controller
{
  

    /**
     * Get workout activities organized by days for mobile app
     * This API is called when member clicks on a workout to see activities by days
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
            ])->find($workoutId);

            if (!$workout) {
                return response()->json([
                    'success' => false,
                    'message' => 'Workout not found',
                ], 404);
            }
            
            // Get all video_catalog IDs and names from activity plans to fetch relative_paths
            $videoCatalogIds = [];
            $videoCatalogNames = [];
            foreach ($workout->workoutDays as $day) {
                foreach ($day->workoutActivityPlans as $activityPlan) {
                    if ($activityPlan->exercise_id) {
                        $videoCatalogIds[] = $activityPlan->exercise_id;
                    }
                    if ($activityPlan->exercise_name) {
                        $videoCatalogNames[] = $activityPlan->exercise_name;
                    }
                }
            }
            
            // Fetch video catalogs with relative_path by ID first, then by name as fallback
            $videoCatalogs = collect();
            if (!empty($videoCatalogIds)) {
                $videoCatalogs = VideoCatalog::whereIn('id', array_unique($videoCatalogIds))
                    ->get()
                    ->keyBy('id');
            }
            
            // If we have names but no IDs, try to find by name
            if ($videoCatalogs->isEmpty() && !empty($videoCatalogNames)) {
                $videoCatalogs = VideoCatalog::whereIn('name', array_unique($videoCatalogNames))
                    ->get()
                    ->keyBy('name');
            }

            // Prepare workout data
            $workoutData = [
                'workout_id' => $workout->id,
                'workout_name' => $workout->exercise_name,
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

            // Define day order for consistent sorting
            $dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            
            // Sort workout days by day order
            $sortedDays = $workout->workoutDays->sortBy(function ($day) use ($dayOrder) {
                return array_search($day->day, $dayOrder);
            });

            // Loop through workout days in order
            foreach ($sortedDays as $day) {
                $dayData = [
                    'day_id' => $day->id,
                    'day' => $day->day,
                    'day_number' => array_search($day->day, $dayOrder) + 1,
                    'total_activities' => $day->workoutActivityPlans->count(),
                    'estimated_duration' => $this->calculateDayDuration($day->workoutActivityPlans),
                    'activities' => []
                ];

                foreach ($day->workoutActivityPlans as $activityPlan) {
                    $exercise = $activityPlan->exercise;
                    
                    // Get video_catalog record to access relative_path
                    // ALWAYS try to fetch video_catalog when exercise_id exists
                    $videoCatalog = null;
                    
                    // Priority 1: Try by exercise_id from collection
                    if ($activityPlan->exercise_id && $videoCatalogs->has($activityPlan->exercise_id)) {
                        $videoCatalog = $videoCatalogs->get($activityPlan->exercise_id);
                    }
                    // Priority 2: Try by exercise_id directly from database (if not in collection)
                    elseif ($activityPlan->exercise_id) {
                        $videoCatalog = VideoCatalog::where('id', $activityPlan->exercise_id)->first();
                    }
                    // Priority 3: Try by name from collection
                    elseif ($activityPlan->exercise_name && $videoCatalogs->has($activityPlan->exercise_name)) {
                        $videoCatalog = $videoCatalogs->get($activityPlan->exercise_name);
                    }
                    // Priority 4: Try by name directly from database
                    elseif ($activityPlan->exercise_name) {
                        $videoCatalog = VideoCatalog::where('name', $activityPlan->exercise_name)->first();
                    }

                    // Build video link from relative_path or video_url
                    $videoLink = null;
                    if ($videoCatalog) {
                        // Use video_url if available, otherwise build from relative_path
                        if ($videoCatalog->video_url) {
                            $videoLink = $videoCatalog->video_url;
                        } elseif ($videoCatalog->relative_path) {
                            $videoLink = asset($videoCatalog->relative_path);
                        }
                    }

                    // If exercise is null but we have video_catalog data, create exercise object from video_catalog
                    // ALWAYS create exercise object when we have video_catalog data, even if exercise is null
                    $exerciseData = null;
                    if ($exercise) {
                        // Use existing exercise data, but prefer video_link from video_catalog if available
                        $exerciseData = [
                            'id' => $exercise->id,
                            'exercise_id' => $exercise->exercise_id,
                            'exercise_name' => $exercise->exercise_name,
                            'category' => $exercise->category,
                            'level' => $exercise->level,
                            'description' => $exercise->description,
                            'equipment' => $exercise->equipment,
                            'thumbnail' => $exercise->thumbnail,
                            'muscles_targeted' => $exercise->muscles_targeted,
                            'calories_burned' => $exercise->calories_burned,
                            'instructions' => $exercise->instructions,
                            'difficulty' => $exercise->difficulty,
                            // Use video_link from video_catalog if available, otherwise use exercise video_link
                            'video_link' => $videoLink ?: $exercise->video_link,
                            'video_url' => $videoLink ?: $exercise->video_link,
                            'video_relative_path' => $videoCatalog ? $videoCatalog->relative_path : null,
                            'primary_muscle_groups' => $exercise->primary_muscle_groups,
                            'secondary_muscle_groups' => $exercise->secondary_muscle_groups,
                            'intensity' => $exercise->intensity,
                            'uses_weights' => $exercise->uses_weights,
                            'rest_period' => $exercise->rest_period,
                            'rest_period_seconds' => $exercise->rest_period_seconds,
                            'sets_configuration' => $exercise->sets_configuration,
                            'type' => $exercise->type,
                            'primary_joint' => $exercise->primary_joint
                        ];
                    } elseif ($videoCatalog) {
                        // Create exercise object from video_catalog data for CRM workouts
                        $exerciseData = [
                            'id' => $videoCatalog->id,
                            'exercise_id' => $videoCatalog->id,
                            'exercise_name' => $videoCatalog->name,
                            'category' => $videoCatalog->category,
                            'subcategory' => $videoCatalog->subcategory ?? null,
                            'level' => $videoCatalog->level,
                            'description' => $videoCatalog->description ?? null,
                            'equipment' => $videoCatalog->equipment,
                            'thumbnail' => $videoCatalog->thumbnail_url,
                            'muscles_targeted' => $videoCatalog->targeted_muscle ?? $videoCatalog->targeted_muscles ?? null,
                            'calories_burned' => null, // Not in video_catalog
                            'instructions' => $videoCatalog->exercise_instructions ?? null,
                            'exercise_tips' => $videoCatalog->exercise_tips ?? null,
                            'difficulty' => null, // Not in video_catalog
                            'video_link' => $videoLink,
                            'video_url' => $videoCatalog->video_url,
                            'video_relative_path' => $videoCatalog->relative_path,
                            'primary_muscle_groups' => $videoCatalog->primary_activating_muscles ?? null,
                            'secondary_muscle_groups' => $videoCatalog->secondary_activating_muscles ?? null,
                            'intensity' => null,
                            'uses_weights' => null,
                            'rest_period' => null,
                            'rest_period_seconds' => null,
                            'sets_configuration' => null,
                            'type' => null,
                            'primary_joint' => null,
                            'duration' => $videoCatalog->duration,
                            'tags' => $videoCatalog->tags,
                            'quality' => $videoCatalog->quality,
                            'file_size_mb' => $videoCatalog->file_size_mb
                        ];
                    }

                    $activityData = [
                        'id' => $activityPlan->id,
                        'plan_id' => $activityPlan->plan_id,
                        'gym_id' => $activityPlan->gym_id,
                        'workout_id' => $activityPlan->workout_id,
                        'day_id' => $activityPlan->day_id,
                        'day' => $activityPlan->day,
                        'exercise_id' => $activityPlan->exercise_id,
                        'exercise_name' => $activityPlan->exercise_name,
                        'thumbnail_url' => $activityPlan->thumbnail_url,
                        'thumbnail_filename' => $activityPlan->thumbnail_filename,
                        'sets' => $activityPlan->sets,
                        'reps' => $activityPlan->reps,
                        'rest_seconds' => $activityPlan->rest_seconds,
                        'sets_configuration' => $activityPlan->sets_configuration,
                        'created_at' => $activityPlan->created_at,
                        'updated_at' => $activityPlan->updated_at,
                        'deleted_at' => $activityPlan->deleted_at,
                        // ALWAYS include video data directly on activity (even if null)
                        'video_link' => $videoLink,
                        'video_url' => $videoLink,
                        'video_relative_path' => $videoCatalog ? $videoCatalog->relative_path : null,
                        // ALWAYS include exercise object (either from exercise relationship or from video_catalog)
                        'exercise' => $exerciseData,
                        // Keep exercise_details for backward compatibility
                        'exercise_details' => $exerciseData
                    ];

                    $dayData['activities'][] = $activityData;
                }

                $workoutData['days'][] = $dayData;
            }

            return response()->json([
                'success' => true,
                'message' => 'Workout activities retrieved successfully',
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
     * Calculate estimated duration for a day's activities
     */
    private function calculateDayDuration($activityPlans)
    {
        $totalMinutes = 0;
        
        foreach ($activityPlans as $plan) {
            // Estimate 2 minutes per set (including rest)
            $totalMinutes += ($plan->sets * 2);
            
            // Add rest time between exercises
            if ($plan->rest_seconds > 0) {
                $totalMinutes += ($plan->rest_seconds / 60);
            }
        }
        
        return round($totalMinutes);
    }


    /**
     * Get all available workout activities (exercise library)
     */
    public function getAllActivities(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            $perPage = $request->get('per_page', 250);
            $page = $request->get('page', 1);
            $category = $request->get('category');
            $level = $request->get('level');
            $muscleGroup = $request->get('muscle_group'); // Can be string or array
            $equipment = $request->get('equipment'); // Can be string or array
            $search = $request->get('search');

            $query = VideoCatalog::active();

            // Apply filters
            if ($category) {
                $query->byCategory($category);
            }

            // Filter by muscle group (using category field)
            // muscle_group can be a single value or array of values
            // Matches activities where category contains ANY of the selected muscle groups
            if ($muscleGroup) {
                $muscleGroups = is_array($muscleGroup) ? $muscleGroup : [$muscleGroup];
                if (count($muscleGroups) > 0) {
                    $query->where(function($q) use ($muscleGroups) {
                        $first = true;
                        foreach ($muscleGroups as $muscle) {
                            $trimmedMuscle = trim($muscle);
                            if (!empty($trimmedMuscle)) {
                                if ($first) {
                                    $q->where('category', 'like', '%' . $trimmedMuscle . '%');
                                    $first = false;
                                } else {
                                    $q->orWhere('category', 'like', '%' . $trimmedMuscle . '%');
                                }
                            }
                        }
                    });
                }
            }

            // Filter by equipment
            if ($equipment) {
                $equipments = is_array($equipment) ? $equipment : [$equipment];
                if (count($equipments) > 0) {
                    $query->where(function($q) use ($equipments) {
                        $first = true;
                        foreach ($equipments as $eq) {
                            $trimmedEq = trim($eq);
                            if (!empty($trimmedEq)) {
                                if ($first) {
                                    $q->where('equipment', 'like', '%' . $trimmedEq . '%');
                                    $first = false;
                                } else {
                                    $q->orWhere('equipment', 'like', '%' . $trimmedEq . '%');
                                }
                            }
                        }
                    });
                }
            }

            // Filter by level
            if ($level) {
                $query->where('level', $level);
            }

            if ($search) {
                $query->search($search);
            }

            $activities = $query->orderBy('name', 'asc')
                ->paginate($perPage, ['*'], 'page', $page);

            // Transform the data to match expected response format
            $transformedActivities = $activities->getCollection()->map(function ($activity) {
                return [
                    'exercise_id' => $activity->id,
                    'exercise_name' => $activity->name,
                    'category' => $activity->category,
                    'subcategory' => $activity->subcategory,
                    'level' => $activity->level,
                    'description' => $activity->description,
                    'duration' => $activity->duration,
                    'equipment' => $activity->equipment,
                    'thumbnail' => $activity->thumbnail_url,
                    'muscles_targeted' => $activity->targeted_muscle ?? $activity->targeted_muscles ?? null,
                    'calories_burned' => null, // Not available in video_catalog
                    'instructions' => $activity->exercise_instructions ?? null,
                    'exercise_tips' => $activity->exercise_tips ?? null,
                    'difficulty' => null, // Not available in video_catalog
                    'rest_period' => null, // Not available in video_catalog
                    'tags' => $activity->tags ?? null,
                    'video_link' => $activity->video_url,
                    'primary_muscle_groups' => $activity->primary_activating_muscles ?? null,
                    'secondary_muscle_groups' => $activity->secondary_activating_muscles ?? null,
                    'intensity' => null, // Not available in video_catalog
                    'uses_weights' => null, // Not available in video_catalog
                    // Additional video_catalog specific fields
                    'filename' => $activity->filename,
                    'quality' => $activity->quality,
                    'file_size_mb' => $activity->file_size_mb,
                    'formatted_file_size' => $activity->formatted_file_size,
                    'formatted_duration' => $activity->formatted_duration,
                    'video_url' => $activity->video_url,
                    'thumbnail_url' => $activity->thumbnail_url,
                    'full_path' => $activity->full_path,
                    'relative_path' => $activity->relative_path
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

    /**
     * Create or update day activity plan
     * Saves activities for a specific day
     */
    public function createDayActivityPlan(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            $validator = Validator::make($request->all(), [
                'day' => 'required|string|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
                'date' => 'nullable|date', // Optional date field (YYYY-MM-DD format)
                'activities' => 'required|array|min:1',
                'activities.*.exercise_id' => 'required|integer',
                'activities.*.exercise_name' => 'required|string',
                'activities.*.sets' => 'nullable|integer|min:1',
                'activities.*.reps' => 'nullable|integer|min:1',
                'activities.*.rest_seconds' => 'nullable|integer|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $day = $request->input('day');
            $date = $request->input('date'); // Get date if provided (e.g., "2025-01-11")
            $activities = $request->input('activities');

            // Get member record
            $memberRecord = DB::table('members')->where('email', $member->email)->first();
            if (!$memberRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Get coach_id from members table
            // Query the member from database to get coach_id from members table
            $memberId = $memberRecord->id;
            $memberModel = Member::find($memberId);
            
            // Get coach_id from members table - ensure it's null if 0 or empty (to satisfy foreign key constraint)
            $coachId = null;
            if ($memberModel && isset($memberModel->coach_id) && $memberModel->coach_id > 0) {
                $coachId = $memberModel->coach_id;
            }

            // If date is provided, use date as the primary identifier
            // Otherwise, fall back to day name (for backward compatibility)
            $query = DB::table('day_activity_plans')
                ->where('member_id', $memberRecord->id)
                ->whereNull('deleted_at');
            
            if ($date) {
                // Use date as primary identifier
                $query->where('date', $date);
            } else {
                // Fall back to day name (backward compatibility)
                $query->where('day', $day);
            }
            
            $existingPlan = $query->first();

            if ($existingPlan) {
                // Update existing plan
                $updateData = [
                    'updated_at' => now(),
                ];
                
                // Only add coach_id if it's not null (to avoid overwriting with null)
                if ($coachId !== null) {
                    $updateData['coach_id'] = $coachId;
                }
                
                DB::table('day_activity_plans')
                    ->where('id', $existingPlan->id)
                    ->update($updateData);

                // Get existing activity IDs to avoid duplicates
                $existingActivityIds = DB::table('day_activity_items')
                    ->where('day_activity_plan_id', $existingPlan->id)
                    ->whereNull('deleted_at')
                    ->pluck('exercise_id')
                    ->toArray();

                // Filter out activities that already exist (by exercise_id)
                $newActivities = array_filter($activities, function($activity) use ($existingActivityIds) {
                    return !in_array($activity['exercise_id'], $existingActivityIds);
                });

                // If there are no new activities (all are duplicates), return success
                if (empty($newActivities)) {
                    return response()->json([
                        'success' => true,
                        'message' => 'All selected activities already exist for this day',
                        'data' => [
                            'id' => $existingPlan->id,
                            'day' => $day,
                            'date' => $date,
                            'activities_count' => count($existingActivityIds),
                        ]
                    ], 200);
                }

                $planId = $existingPlan->id;
            } else {
                // Create new plan
                $planData = [
                    'member_id' => $memberRecord->id,
                    'day' => $day,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
                
                // Add coach_id if available
                if ($coachId !== null) {
                    $planData['coach_id'] = $coachId;
                }
                
                // Add date if provided
                if ($date) {
                    $planData['date'] = $date;
                }
                
                $planId = DB::table('day_activity_plans')->insertGetId($planData);
            }

            // Insert activities (only new ones if plan already exists)
            $activitiesToInsert = isset($newActivities) ? $newActivities : $activities;
            $activityItems = [];
            foreach ($activitiesToInsert as $activity) {
                $activityItems[] = [
                    'day_activity_plan_id' => $planId,
                    'exercise_id' => $activity['exercise_id'],
                    'exercise_name' => $activity['exercise_name'],
                    'sets' => $activity['sets'] ?? 3,
                    'reps' => $activity['reps'] ?? 12,
                    'rest_seconds' => $activity['rest_seconds'] ?? 60,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            
            if (!empty($activityItems)) {
                DB::table('day_activity_items')->insert($activityItems);
            }

            // Get total activities count (existing + new)
            $totalActivitiesCount = DB::table('day_activity_items')
                ->where('day_activity_plan_id', $planId)
                ->whereNull('deleted_at')
                ->count();

            return response()->json([
                'success' => true,
                'message' => isset($newActivities) && count($newActivities) < count($activities)
                    ? 'New activities added successfully'
                    : 'Day activities saved successfully',
                'data' => [
                    'id' => $planId,
                    'day' => $day,
                    'date' => $date,
                    'activities_count' => $totalActivitiesCount,
                    'new_activities_added' => isset($newActivities) ? count($newActivities) : count($activities),
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Create day activity plan error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get day activity plan
     * Retrieves activities for a specific day
     */
    public function getDayActivityPlan(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            $day = $request->get('day');
            $date = $request->get('date'); // Get date if provided (e.g., "2025-01-11")

            if (!$day && !$date) {
                return response()->json([
                    'success' => false,
                    'message' => 'Day or date parameter is required',
                ], 400);
            }

            // Get member record
            $memberRecord = DB::table('members')->where('email', $member->email)->first();
            if (!$memberRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Get day activity plan - prioritize date over day name
            $query = DB::table('day_activity_plans')
                ->where('member_id', $memberRecord->id)
                ->whereNull('deleted_at');
            
            if ($date) {
                // Use date as primary identifier
                $query->where('date', $date);
            } else {
                // Fall back to day name (backward compatibility)
                $query->where('day', $day);
            }
            
            $plan = $query->first();

            if (!$plan) {
                return response()->json([
                    'success' => true,
                    'data' => [
                        'id' => null,
                        'day' => $day ?: null,
                        'date' => $date ?: null,
                        'activities' => [],
                        'session_status' => 'not_started',
                    ]
                ], 200);
            }

            // Get activities with full details from video_catalog
            $activityItems = DB::table('day_activity_items')
                ->where('day_activity_plan_id', $plan->id)
                ->whereNull('deleted_at')
                ->get();
            
            // Get all exercise IDs to fetch from video_catalog
            $exerciseIds = $activityItems->pluck('exercise_id')->filter()->unique()->toArray();
            
            // Fetch full activity details from video_catalog
            $videoCatalogs = collect();
            if (!empty($exerciseIds)) {
                $videoCatalogs = VideoCatalog::whereIn('id', $exerciseIds)
                    ->get()
                    ->keyBy('id');
            }
            
            $activities = $activityItems->map(function ($item) use ($videoCatalogs) {
                $activityData = [
                    'id' => $item->exercise_id,
                    'exercise_id' => $item->exercise_id,
                    'exercise_name' => $item->exercise_name,
                    'sets' => $item->sets,
                    'reps' => $item->reps,
                    'rest_seconds' => $item->rest_seconds,
                ];
                
                // Add thumbnail and other details from video_catalog if available
                $videoCatalog = $videoCatalogs->get($item->exercise_id);
                if ($videoCatalog) {
                    $activityData['thumbnail_url'] = $videoCatalog->thumbnail_url;
                    $activityData['thumbnail'] = $videoCatalog->thumbnail_url;
                    $activityData['category'] = $videoCatalog->category;
                    $activityData['level'] = $videoCatalog->level;
                    $activityData['description'] = $videoCatalog->description;
                    $activityData['equipment'] = $videoCatalog->equipment;
                    $activityData['duration'] = $videoCatalog->duration;
                    $activityData['video_url'] = $videoCatalog->video_url;
                    $activityData['relative_path'] = $videoCatalog->relative_path;
                }
                
                return $activityData;
            });

            // Check session status
            $session = DB::table('day_activity_sessions')
                ->where('day_activity_plan_id', $plan->id)
                ->where('member_id', $memberRecord->id)
                ->whereNull('deleted_at')
                ->orderBy('created_at', 'desc')
                ->first();

            $sessionStatus = 'not_started';
            if ($session) {
                $sessionStatus = $session->status ?? 'not_started';
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $plan->id,
                    'day' => $plan->day,
                    'date' => $plan->date ?? null, // Include date if available
                    'activities' => $activities,
                    'session_status' => $sessionStatus,
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get day activity plan error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Start day activity session
     */
    public function startDayActivitySession(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            $dayActivityPlanId = $request->input('day_activity_plan_id');

            // Get member record
            $memberRecord = DB::table('members')->where('email', $member->email)->first();
            if (!$memberRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Create or update session
            $session = DB::table('day_activity_sessions')
                ->where('day_activity_plan_id', $dayActivityPlanId)
                ->where('member_id', $memberRecord->id)
                ->whereNull('deleted_at')
                ->first();

            if ($session) {
                DB::table('day_activity_sessions')
                    ->where('id', $session->id)
                    ->update([
                        'status' => 'in_progress',
                        'started_at' => now(),
                        'updated_at' => now(),
                    ]);
                $sessionId = $session->id;
            } else {
                $sessionId = DB::table('day_activity_sessions')->insertGetId([
                    'day_activity_plan_id' => $dayActivityPlanId,
                    'member_id' => $memberRecord->id,
                    'status' => 'in_progress',
                    'started_at' => now(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Session started successfully',
                'data' => [
                    'session_id' => $sessionId,
                    'status' => 'in_progress',
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Start day activity session error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Complete day activity session
     */
    public function completeDayActivitySession(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            $dayActivityPlanId = $request->input('day_activity_plan_id');

            // Get member record
            $memberRecord = DB::table('members')->where('email', $member->email)->first();
            if (!$memberRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Update session
            $session = DB::table('day_activity_sessions')
                ->where('day_activity_plan_id', $dayActivityPlanId)
                ->where('member_id', $memberRecord->id)
                ->whereNull('deleted_at')
                ->first();

            if (!$session) {
                return response()->json([
                    'success' => false,
                    'message' => 'Session not found',
                ], 404);
            }

            DB::table('day_activity_sessions')
                ->where('id', $session->id)
                ->update([
                    'status' => 'completed',
                    'completed_at' => now(),
                    'updated_at' => now(),
                ]);

            return response()->json([
                'success' => true,
                'message' => 'Session completed successfully',
                'data' => [
                    'session_id' => $session->id,
                    'status' => 'completed',
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Complete day activity session error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }
}
