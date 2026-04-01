<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\Workout;
use App\Models\WorkoutActivity;
use App\Models\WorkoutDay;
use App\Models\WorkoutActivityPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\WorkoutAssignment; 
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MobileWorkoutController extends Controller
{
    /**
     * Get user's workouts
     */
    public function index(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            // Get workouts assigned to this member through WorkoutAssignment
            $workoutAssignments = WorkoutAssignment::where('member_id', $member->id)
                ->where('deleted_at', null)
                // ->where('status', 'active') // Only active assignments
                ->with(['workout.workoutDays.workoutActivityPlans.exercise'])
                // ->orderBy('assigned_at', 'desc')
                ->get();

            // Transform the data to include assignment details
            $workouts = $workoutAssignments->map(function ($assignment) {
                $workout = $assignment->workout;
                $workout->assignment_id = $assignment->id;
                $workout->assigned_at = $assignment->assigned_at;
                $workout->start_date = $assignment->start_date;
                $workout->end_date = $assignment->end_date;
                $workout->notes = $assignment->notes;
                $workout->status = $assignment->status;
                return $workout;
            });

            return response()->json([
                'success' => true,
                'data' => $workouts
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get workouts error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Create a new workout from mobile
     */
    public function store(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            // Validate the request
            $validator = Validator::make($request->all(), [
                'exercise_name' => 'required|string|max:255',
                'category' => 'required|string|max:100',
                'duration' => 'required|string|max:100',
               
                'level' => 'required|string|max:100',
                'description' => 'required|string',
                'equipment' => 'nullable|string',
                // 'thumbnail' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,gif|max:10240',
                'calories_burned' => 'nullable|integer|min:0',
                'instructions' => 'nullable|string',
                'difficulty' => 'nullable|integer|min:1|max:10',
                'rest_period' => 'nullable|integer|min:0',
                'tags' => 'nullable|string',
                'video_link' => 'nullable|string|url',
                'muscles_targeted' => 'nullable|string',
                'type' => 'nullable|string',
                'sets' => 'nullable|array',
                'workout_days' => 'nullable|array',
                'workout_days.*.day' => 'required_with:workout_days|string|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
                'workout_days.*.activities' => 'required_with:workout_days|array|min:1',
                'workout_days.*.activities.*.exercise_id' => 'required|integer|exists:workout_activities,exercise_id',
                'workout_days.*.activities.*.sets' => 'required|integer|min:1',
                'workout_days.*.activities.*.reps' => 'required|integer|min:1',
                'workout_days.*.activities.*.rest_seconds' => 'required|integer|min:0',
            ]);

            $thumbnailPath = null;
            if ($request->hasFile('thumbnail')) {
                $thumbnail = $request->file('thumbnail');
                $thumbnailName = time() . '_' . $thumbnail->getClientOriginalName();
                
                // Create directory if it doesn't exist
                $uploadPath = public_path('images/workout_thumbnails');
                if (!file_exists($uploadPath)) {
                    mkdir($uploadPath, 0755, true);
                }
                
                // Move file to public/images/workout_thumbnails
                $thumbnail->move($uploadPath, $thumbnailName);
                $thumbnailPath = 'images/workout_thumbnails/' . $thumbnailName;
            } elseif ($request->thumbnail) {
                // If thumbnail is a base64 string or URL, store it as is
                $thumbnailPath = $request->thumbnail;
            }

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            DB::beginTransaction();

            try {
                // Create the workout
                $workout = new Workout();
                $workout->gym_id = $member->gym_id ?? 1; // Default gym ID if not set
                $workout->member_id = $member->id;
                $workout->coach_id = $member->coach_id ?? null; // Store coach_id from member
                $workout->exercise_name = $request->exercise_name;
                $workout->thumbnail = $thumbnailPath;
                $workout->category = $request->category;
                $workout->duration = $request->duration;
                $workout->level = $request->level;
                $workout->description = $request->description;
                $workout->equipment = $request->equipment ?? '';
                $workout->muscles_targeted = $request->muscles_targeted ?? '';
                $workout->calories_burned = $request->calories_burned ?? 0;
                $workout->instructions = $request->instructions ?? '';
                $workout->difficulty = $request->difficulty ?? 1;
                $workout->rest_period = $request->rest_period ?? 30;
                $workout->tags = $request->tags ?? '';
                $workout->save();

                // Create workout days and activities if provided
                if ($request->workout_days && is_array($request->workout_days)) {
                    foreach ($request->workout_days as $dayData) {
                        // Create workout day
                        $workoutDay = WorkoutDay::create([
                            'workout_id' => $workout->id,
                            'day' => $dayData['day']
                        ]);

                        // Create workout activity plans for this day
                        if (isset($dayData['activities']) && is_array($dayData['activities'])) {
                            foreach ($dayData['activities'] as $activityData) {
                                // Get exercise details from workout_activities table
                                $exercise = WorkoutActivity::where('exercise_id', $activityData['exercise_id'])->first();
                                
                                if ($exercise) {
                                    WorkoutActivityPlan::create([
                                        'workout_id' => $workout->id,
                                        'day' => $dayData['day'],
                                        'exercise_id' => $activityData['exercise_id'],
                                        'exercise_name' => $exercise->exercise_name,
                                        'sets' => $activityData['sets'],
                                        'reps' => $activityData['reps'],
                                        'rest_seconds' => $activityData['rest_seconds'],
                                        'day_id' => $workoutDay->id
                                    ]);
                                }
                            }
                        }
                    }
                }

                DB::commit();

                // Return the created workout with its details
                $workout->load(['workoutDays.workoutActivityPlans.exercise']);

                return response()->json([
                    'success' => true,
                    'message' => 'Workout created successfully',
                    'data' => [
                        'workout_id' => $workout->id,
                        'exercise_name' => $workout->exercise_name,
                        'category' => $workout->category,
                        'level' => $workout->level,
                        'description' => $workout->description,
                        'workout_days' => $workout->workoutDays
                    ]
                ], 201);

            } catch (\Exception $e) {
                DB::rollback();
                throw $e;
            }

        } catch (\Exception $e) {
            \Log::error('Create workout error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create workout: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function getMemberWorkouts(Request $request)
    {
        try {
            $member = $request->get('auth_member');
    
            // Get all workouts that belong to this member
            $workouts = Workout::where('member_id', $member->id)
                ->whereNull('deleted_at')
                ->with(['workoutDays.workoutActivityPlans.exercise'])
                ->get();
    
            return response()->json([
                'success' => true,
                'data' => $workouts
            ], 200);
    
        } catch (\Exception $e) {
            \Log::error('Get member workouts error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get specific workout details
     */
    public function show(Request $request, $id)
    {
        try {
            $member = $request->get('auth_member');
            
            // Get workout assignment for this member
            $assignment = WorkoutAssignment::where('id', $id)
                ->where('member_id', $member->id)
                ->where('deleted_at', null)
                ->with(['workout.workoutDays.workoutActivityPlans.exercise'])
                ->first();

            if (!$assignment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Workout not found or not assigned to you',
                ], 404);
            }

            $workout = $assignment->workout;
            $workout->assignment_id = $assignment->id;
            $workout->assigned_at = $assignment->assigned_at;
            $workout->start_date = $assignment->start_date;
            $workout->end_date = $assignment->end_date;
            $workout->notes = $assignment->notes;
            $workout->status = $assignment->status;

            return response()->json([
                'success' => true,
                'data' => $workout
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get workout error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Start a workout session
     */
    public function startWorkout(Request $request, $id)
    {
        try {
            $member = $request->get('auth_member');
            
            $assignment = WorkoutAssignment::where('id', $id)
                ->where('member_id', $member->id)
                ->where('deleted_at', null)
                ->first();

            if (!$assignment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Workout not found or not assigned to you',
                ], 404);
            }

            // Update assignment status to started
            $assignment->update([
                'status' => 'started',
                'started_at' => now()
            ]);

            // Log the workout start
            $this->logWorkoutActivity($member->id, $assignment->workout_id, 'started');

            return response()->json([
                'success' => true,
                'message' => 'Workout started successfully',
                'data' => $assignment->workout
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Start workout error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Complete a workout session
     */
    public function completeWorkout(Request $request, $id)
    {
        try {
            $member = $request->get('auth_member');
            
            $assignment = WorkoutAssignment::where('id', $id)
                ->where('member_id', $member->id)
                ->where('deleted_at', null)
                ->first();

            if (!$assignment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Workout not found or not assigned to you',
                ], 404);
            }

            // Update assignment status to completed
            $assignment->update([
                'status' => 'completed',
                'completed_at' => now()
            ]);

            // Log the workout completion
            $this->logWorkoutActivity($member->id, $assignment->workout_id, 'completed');

            return response()->json([
                'success' => true,
                'message' => 'Workout completed successfully',
                'data' => $assignment->workout
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Complete workout error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get workout statistics
     */
    public function statistics(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            $totalAssignments = WorkoutAssignment::where('member_id', $member->id)
                ->where('deleted_at', null)
                ->count();

            $completedWorkouts = WorkoutAssignment::where('member_id', $member->id)
                ->where('status', 'completed')
                ->where('deleted_at', null)
                ->count();

            $thisWeekWorkouts = WorkoutAssignment::where('member_id', $member->id)
                ->where('deleted_at', null)
                ->whereBetween('assigned_at', [now()->startOfWeek(), now()->endOfWeek()])
                ->count();

            $activeWorkouts = WorkoutAssignment::where('member_id', $member->id)
                ->whereIn('status', ['active', 'started'])
                ->where('deleted_at', null)
                ->count();

            return response()->json([
                'success' => true,
                'data' => [
                    'total_workouts' => $totalAssignments,
                    'completed_workouts' => $completedWorkouts,
                    'this_week_workouts' => $thisWeekWorkouts,
                    'active_workouts' => $activeWorkouts,
                    'completion_rate' => $totalAssignments > 0 ? round(($completedWorkouts / $totalAssignments) * 100, 2) : 0
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get workout statistics error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get available exercises for creating workouts
     */
    public function getAvailableExercises(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            $perPage = $request->get('per_page', 50);
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

            $exercises = $query->paginate($perPage, ['*'], 'page', $page);

            // Transform the data for mobile
            $transformedExercises = $exercises->getCollection()->map(function ($exercise) {
                return [
                    'exercise_id' => $exercise->exercise_id,
                    'exercise_name' => $exercise->exercise_name,
                    'category' => $exercise->category,
                    'level' => $exercise->level,
                    'description' => $exercise->description,
                    'equipment' => $exercise->equipment,
                    'thumbnail' => $exercise->thumbnail,
                    'muscles_targeted' => $exercise->muscles_targeted,
                    'difficulty' => $exercise->difficulty,
                    'intensity' => $exercise->intensity,
                    'uses_weights' => $exercise->uses_weights
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedExercises,
                'pagination' => [
                    'current_page' => $exercises->currentPage(),
                    'last_page' => $exercises->lastPage(),
                    'per_page' => $exercises->perPage(),
                    'total' => $exercises->total(),
                    'from' => $exercises->firstItem(),
                    'to' => $exercises->lastItem()
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get available exercises error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get workout creation metadata (categories, levels, etc.)
     */
    public function getWorkoutMetadata(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            // Get categories
            $categories = WorkoutActivity::where('deleted_at', null)
                ->distinct()
                ->pluck('category')
                ->filter()
                ->values();

            // Get levels
            $levels = WorkoutActivity::where('deleted_at', null)
                ->distinct()
                ->pluck('level')
                ->filter()
                ->values();

            // Get muscle groups
            $muscleGroups = WorkoutActivity::where('deleted_at', null)
                ->whereNotNull('muscles_targeted')
                ->distinct()
                ->pluck('muscles_targeted')
                ->filter()
                ->values();

            // Get equipment types
            $equipmentTypes = WorkoutActivity::where('deleted_at', null)
                ->whereNotNull('equipment')
                ->distinct()
                ->pluck('equipment')
                ->filter()
                ->values();

            return response()->json([
                'success' => true,
                'data' => [
                    'categories' => $categories,
                    'levels' => $levels,
                    'muscle_groups' => $muscleGroups,
                    'equipment_types' => $equipmentTypes,
                    'difficulty_levels' => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    'duration_options' => [
                        '15 min', '30 min', '45 min', '60 min', '90 min', '120 min'
                    ]
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get workout metadata error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function getAllWorkouts(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            $perPage = $request->get('per_page', 20);
            $page = $request->get('page', 1);
            $category = $request->get('category');
            $level = $request->get('level');
            $search = $request->get('search');
            $difficulty = $request->get('difficulty');
            
            // Build query for workouts in the member's gym
            $query = Workout::where('gym_id', $member->gym_id ?? 1)
                ->whereNull('deleted_at')
                ->with(['workoutDays.workoutActivityPlans.exercise']);
            
            // Apply filters
            if ($category) {
                $query->where('category', $category);
            }
            
            if ($level) {
                $query->where('level', $level);
            }
            
            if ($difficulty) {
                $query->where('difficulty', $difficulty);
            }
            
            if ($search) {
                $query->where(function($q) use ($search) {
                    $q->where('exercise_name', 'like', '%' . $search . '%')
                      ->orWhere('description', 'like', '%' . $search . '%')
                      ->orWhere('category', 'like', '%' . $search . '%')
                      ->orWhere('tags', 'like', '%' . $search . '%');
                });
            }
            
            // Order by created date (newest first)
            $query->orderBy('created_at', 'desc');
            
            // Paginate results
            $workouts = $query->paginate($perPage, ['*'], 'page', $page);
            
            // Transform the data for mobile
            $transformedWorkouts = $workouts->getCollection()->map(function ($workout) use ($member) {
                // Check if this workout is assigned to the member
                $assignment = WorkoutAssignment::where('workout_id', $workout->id)
                    ->where('member_id', $member->id)
                    ->whereNull('deleted_at')
                    ->first();
                
                return [
                    'id' => $workout->id,
                    'exercise_name' => $workout->exercise_name,
                    'category' => $workout->category,
                    'level' => $workout->level,
                    'duration' => $workout->duration,
                    'description' => $workout->description,
                    'equipment' => $workout->equipment,
                    'thumbnail' => $workout->thumbnail,
                    'muscles_targeted' => $workout->muscles_targeted,
                    'calories_burned' => $workout->calories_burned,
                    'instructions' => $workout->instructions,
                    'difficulty' => $workout->difficulty,
                    'rest_period' => $workout->rest_period,
                    'tags' => $workout->tags,
                    'video_link' => $workout->video_link,
                    'type' => $workout->type,
                    'uses_weights' => $workout->uses_weights,
                    'intensity' => $workout->intensity,
                    'primary_muscle_groups' => $workout->primary_muscle_groups,
                    'secondary_muscle_groups' => $workout->secondary_muscle_groups,
                    'workout_days' => $workout->workoutDays,
                    'is_assigned' => $assignment ? true : false,
                    'assignment_id' => $assignment ? $assignment->id : null,
                    'created_at' => $workout->created_at,
                    'updated_at' => $workout->updated_at,
                ];
            });
            
            return response()->json([
                'success' => true,
                'data' => $transformedWorkouts,
                'pagination' => [
                    'current_page' => $workouts->currentPage(),
                    'last_page' => $workouts->lastPage(),
                    'per_page' => $workouts->perPage(),
                    'total' => $workouts->total(),
                    'from' => $workouts->firstItem(),
                    'to' => $workouts->lastItem()
                ]
            ], 200);
            
        } catch (\Exception $e) {
            \Log::error('Get all workouts error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Log workout activity for tracking
     */
    private function logWorkoutActivity($memberId, $workoutId, $action)
    {
        try {
            // You can create a workout log entry here
            // This helps track member workout history
            \Log::info("Member {$memberId} {$action} workout {$workoutId}");
        } catch (\Exception $e) {
            \Log::error("Failed to log workout activity: " . $e->getMessage());
        }
    }
}
