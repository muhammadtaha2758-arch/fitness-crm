<?php

namespace App\Http\Controllers;

use App\Models\WorkoutActivityPlan;
use App\Models\WorkoutDay;
use App\Models\WorkoutActivity;
use App\Models\VideoCatalog;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class WorkoutActivityPlanController extends BaseController
{
    /**
     * Coaches need to manage workout plans from the Coach mobile app.
     * CRM permissions are enforced via policies for admins; for coaches we allow access
     * but still rely on gym_id scoping inside queries for safety.
     */
    private function shouldBypassClientPolicy(?object $user): bool
    {
        try {
            return (bool) ($user && isset($user->role_id) && (int) $user->role_id === 3);
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Store a new workout activity plan
     */
    public function store(Request $request)
    {
        if (!$this->shouldBypassClientPolicy($request->user('api'))) {
            $this->authorizeForUser($request->user('api'), 'create', Client::class);
        }

        // Debug: Log the incoming request data
        Log::info('WorkoutActivityPlan store request:', [
            'all_data' => $request->all(),
            'exercises' => $request->exercises ?? 'No exercises data'
        ]);

        $validator = Validator::make($request->all(), [
            'day' => 'required|string|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
            'workout_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'exercises' => 'required|array|min:1',
            'exercises.*.exercise_id' => 'nullable|integer',
            'exercises.*.exercise_name' => 'required|string|max:255',
            'exercises.*.thumbnail_url' => 'nullable|string',
            'exercises.*.thumbnail_filename' => 'nullable|string',
            'exercises.*.video_url' => 'nullable|string',
            'exercises.*.sets' => 'required|integer|min:1',
            'exercises.*.reps' => 'required|integer|min:1',
            'exercises.*.rest_period' => 'required|integer|min:0',
            'exercises.*.sets_configuration' => 'nullable|array',
            'exercises.*.sets_configuration.*.reps' => 'required_with:exercises.*.sets_configuration|integer|min:0',
            'exercises.*.sets_configuration.*.rest' => 'required_with:exercises.*.sets_configuration|integer|min:0',
            'exercises.*.plan_id' => 'nullable|string|max:255', // Add plan_id validation
        ]);
        
        // Custom validation: either exercise_id or thumbnail_url must be provided
        // Also validate exercise_id exists in workout_activities or video_catalog if provided
        $validator->after(function ($validator) use ($request) {
            foreach ($request->exercises as $index => $exercise) {
                // Check if either exercise_id or thumbnail_url is provided
                if (empty($exercise['exercise_id']) && empty($exercise['thumbnail_url'])) {
                    $validator->errors()->add("exercises.{$index}.exercise_id", "Either exercise_id or thumbnail_url must be provided.");
                }
                
                // If exercise_id is provided, validate it exists in workout_activities OR video_catalog
                if (!empty($exercise['exercise_id'])) {
                    $existsInWorkoutActivities = WorkoutActivity::where('exercise_id', $exercise['exercise_id'])->exists();
                    $existsInVideoCatalog = VideoCatalog::where('id', $exercise['exercise_id'])->exists();
                    
                    if (!$existsInWorkoutActivities && !$existsInVideoCatalog) {
                        $validator->errors()->add("exercises.{$index}.exercise_id", "Exercise with ID '{$exercise['exercise_id']}' does not exist in workout_activities or video_catalog table.");
                    }
                }
            }
        });

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            // Get gym_id from authenticated user
            $gymId = $request->user('api')->gym_id;
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            // First, create or find a workout
            // If workout_id is provided (when editing), use it; otherwise create/find by name
            $workoutId = $request->workout_id ?? null;
            
            Log::info('WorkoutActivityPlan store - workout lookup:', [
                'request_workout_id' => $workoutId,
                'workout_name' => $request->workout_name,
                'has_plan_id' => !empty($request->exercises[0]['plan_id'] ?? null)
            ]);
            
            if ($workoutId) {
                $workout = \App\Models\Workout::find($workoutId);
                if (!$workout) {
                    Log::warning("Workout with ID '{$workoutId}' not found, creating new one");
                    $workout = $this->createOrFindWorkout($request->workout_name, $request->description, $gymId);
                } else {
                    Log::info("Found existing workout with ID: {$workout->id}");
                }
            } else {
                $workout = $this->createOrFindWorkout($request->workout_name, $request->description, $gymId);
                Log::info("Created/found workout with ID: {$workout->id}");
            }

            // Create or find workout day (use $workout->id, not $request->workout_id)
            $workoutDay = $this->createOrFindWorkoutDay($workout->id, $request->day);

            // Delete existing activity plans for this workout day
            

            // Create new activity plans
            $activityPlans = [];



            foreach ($request->exercises as $index => $exerciseData) {
                $exerciseId = null;
                $exerciseName = $exerciseData['exercise_name'] ?? 'Unnamed Exercise';
                $planId = $exerciseData['plan_id'] ?? null; // Get plan_id from request
                
                // Handle thumbnail-based exercises (no exercise_id)
                if (empty($exerciseData['exercise_id']) && !empty($exerciseData['thumbnail_url'])) {
                    // This is a thumbnail-based exercise
                    $baseUrl = rtrim($request->getSchemeAndHttpHost(), '/');
                    $thumbnailUrl = $exerciseData['thumbnail_url'];
                    $thumbnailFilename = $exerciseData['thumbnail_filename'] ?? basename($thumbnailUrl);
                    
                    // Normalize thumbnail filename to image extension (never store .mp4)
                    $thumbnailFilename = $this->normalizeThumbnailFilename($thumbnailFilename);
                    
                    // Normalize thumbnail URL to ensure it's an image URL, not video URL
                    $thumbnailUrl = $this->normalizeThumbnailUrl($thumbnailUrl, $thumbnailFilename, $baseUrl);
                    
                    // Prefer video_url from request (from video_catalog picker) so playback always matches selected thumbnail
                    $videoLink = !empty($exerciseData['video_url']) ? $exerciseData['video_url'] : null;
                    if (empty($videoLink)) {
                        $videoCatalog = VideoCatalog::where('name', $exerciseName)->first();
                        if (!$videoCatalog && $thumbnailFilename) {
                            $basename = pathinfo($thumbnailFilename, PATHINFO_FILENAME);
                            $videoCatalog = VideoCatalog::where('filename', $basename . '.mp4')
                                ->orWhere('name', $basename)->first();
                        }
                        if ($videoCatalog) {
                            $videoLink = !empty($videoCatalog->video_url)
                                ? $videoCatalog->video_url
                                : (!empty($videoCatalog->relative_path) ? asset('/videos/' . implode('/', array_map('rawurlencode', explode('/', str_replace(\DIRECTORY_SEPARATOR, '/', $videoCatalog->relative_path))))) : null);
                        }
                    }
                    
                    // Check if plan_id exists - if so, update instead of delete/create
                    if ($planId) {
                        // Look up by plan_id first (plan_id is unique, so this should be sufficient)
                        $existingPlan = WorkoutActivityPlan::where('plan_id', $planId)->first();
                        
                        Log::info('Plan lookup by plan_id:', [
                            'plan_id' => $planId,
                            'found' => $existingPlan ? true : false,
                            'existing_workout_id' => $existingPlan ? $existingPlan->workout_id : null,
                            'new_workout_id' => $workout->id
                        ]);
                        
                        if ($existingPlan) {
                            // Update existing plan (including workout_id and day_id in case they changed)
                            $existingPlan->update([
                                'workout_id' => $workout->id, // Update workout_id in case it changed
                                'day' => $request->day,
                                'day_id' => $workoutDay->id, // Update day_id in case it changed
                                'exercise_name' => $exerciseName,
                                'thumbnail_url' => $thumbnailUrl,
                                'thumbnail_filename' => $thumbnailFilename,
                                'video_link' => $videoLink, // Store video_link using same logic as mobile app
                                'sets' => $exerciseData['sets'],
                                'reps' => $exerciseData['reps'],
                                'rest_seconds' => $exerciseData['rest_period'],
                                'sets_configuration' => $exerciseData['sets_configuration'] ?? null,
                            ]);
                            $activityPlan = $existingPlan;
                            Log::info("Updated existing plan with plan_id: {$planId}, workout_id: {$workout->id}");
                        } else {
                            // Plan_id provided but not found - create new with same plan_id
                            $activityPlan = WorkoutActivityPlan::create([
                                'plan_id' => $planId,
                                'workout_id' => $workout->id,
                                'day' => $request->day,
                                'exercise_id' => null,
                                'exercise_name' => $exerciseName,
                                'thumbnail_url' => $thumbnailUrl,
                                'thumbnail_filename' => $thumbnailFilename,
                                'video_link' => $videoLink, // Store video_link using same logic as mobile app
                                'sets' => $exerciseData['sets'],
                                'reps' => $exerciseData['reps'],
                                'rest_seconds' => $exerciseData['rest_period'],
                                'sets_configuration' => $exerciseData['sets_configuration'] ?? null,
                                'day_id' => $workoutDay->id,
                                'gym_id' => $gymId,
                            ]);
                        }
                    } else {
                        // No plan_id - delete old and create new (existing behavior)
                        // Delete activities matching the exact exercise_name to prevent duplicates
                        // This ensures that when a user selects an activity, any existing activities
                        // with the same name for this day/workout are removed first
                        WorkoutActivityPlan::where('day_id', $workoutDay->id)
                            ->where('workout_id', $workout->id)
                            ->whereNull('exercise_id')
                            ->where('exercise_name', $exerciseName)
                            ->delete();
                        
                        // Generate new plan_id (stable format without time for consistency)
                        $newPlanId = 'plan_' . $workout->id . '_' . $request->day . '_thumbnail_' . md5($thumbnailFilename) . '_' . uniqid();
                        
                        $activityPlan = WorkoutActivityPlan::create([
                            'plan_id' => $newPlanId,
                            'workout_id' => $workout->id,
                            'day' => $request->day,
                            'exercise_id' => null,
                            'exercise_name' => $exerciseName,
                            'thumbnail_url' => $thumbnailUrl,
                            'thumbnail_filename' => $thumbnailFilename,
                            'video_link' => $videoLink, // Store video_link using same logic as mobile app
                            'sets' => $exerciseData['sets'],
                            'reps' => $exerciseData['reps'],
                            'rest_seconds' => $exerciseData['rest_period'],
                            'sets_configuration' => $exerciseData['sets_configuration'] ?? null,
                            'day_id' => $workoutDay->id,
                            'gym_id' => $gymId,
                        ]);
                    }
                } else {
                    // Handle regular exercises from workout_activities table
                    $exerciseId = $exerciseData['exercise_id'];
                    
                    // Fetch exercise data from workout_activities table
                    $exercise = WorkoutActivity::where('exercise_id', $exerciseId)->first();
                    
                    // If exercise doesn't exist in workout_activities, check if it's in video_catalog
                    // If so, treat it as a thumbnail-based exercise
                    if (!$exercise) {
                        $videoCatalog = VideoCatalog::find($exerciseId);
                        if ($videoCatalog) {
                            // This is a video_catalog exercise - treat as thumbnail-based
                            $baseUrl = rtrim($request->getSchemeAndHttpHost(), '/');
                            $thumbnailUrl = $exerciseData['thumbnail_url'] ?? $videoCatalog->thumbnail ?? null;
                            $thumbnailFilename = $exerciseData['thumbnail_filename'] ?? $videoCatalog->filename ?? basename($thumbnailUrl ?? '');
                            
                            // Normalize thumbnail filename to image extension (video_catalog->filename is .mp4)
                            $thumbnailFilename = $this->normalizeThumbnailFilename($thumbnailFilename);
                            
                            // Normalize thumbnail URL to ensure it's an image URL
                            $thumbnailUrl = $this->normalizeThumbnailUrl($thumbnailUrl, $thumbnailFilename, $baseUrl);
                            
                            $videoLink = !empty($videoCatalog->video_url) 
                                        ? $videoCatalog->video_url 
                                        : (!empty($videoCatalog->relative_path) ? asset($videoCatalog->relative_path) : null);
                            
                            $planId = $exerciseData['plan_id'] ?? null;
                            
                            if ($planId) {
                                $existingPlan = WorkoutActivityPlan::where('plan_id', $planId)->first();
                                if ($existingPlan) {
                                    $existingPlan->update([
                                        'workout_id' => $workout->id,
                                        'day' => $request->day,
                                        'day_id' => $workoutDay->id,
                                        'exercise_id' => null, // video_catalog exercises have null exercise_id
                                        'exercise_name' => $exerciseData['exercise_name'] ?? $videoCatalog->name,
                                        'thumbnail_url' => $thumbnailUrl,
                                        'thumbnail_filename' => $thumbnailFilename,
                                        'video_link' => $videoLink,
                                        'sets' => $exerciseData['sets'],
                                        'reps' => $exerciseData['reps'],
                                        'rest_seconds' => $exerciseData['rest_period'],
                                        'sets_configuration' => $exerciseData['sets_configuration'] ?? null,
                                    ]);
                                    $activityPlan = $existingPlan;
                                } else {
                                    $activityPlan = WorkoutActivityPlan::create([
                                        'plan_id' => $planId,
                                        'workout_id' => $workout->id,
                                        'day' => $request->day,
                                        'exercise_id' => null,
                                        'exercise_name' => $exerciseData['exercise_name'] ?? $videoCatalog->name,
                                        'thumbnail_url' => $thumbnailUrl,
                                        'thumbnail_filename' => $thumbnailFilename,
                                        'video_link' => $videoLink,
                                        'sets' => $exerciseData['sets'],
                                        'reps' => $exerciseData['reps'],
                                        'rest_seconds' => $exerciseData['rest_period'],
                                        'sets_configuration' => $exerciseData['sets_configuration'] ?? null,
                                        'day_id' => $workoutDay->id,
                                        'gym_id' => $gymId,
                                    ]);
                                }
                            } else {
                                // Generate new plan_id
                                $newPlanId = 'plan_' . $workout->id . '_' . $request->day . '_video_' . $exerciseId . '_' . uniqid();
                                
                                $activityPlan = WorkoutActivityPlan::create([
                                    'plan_id' => $newPlanId,
                                    'workout_id' => $workout->id,
                                    'day' => $request->day,
                                    'exercise_id' => null,
                                    'exercise_name' => $exerciseData['exercise_name'] ?? $videoCatalog->name,
                                    'thumbnail_url' => $thumbnailUrl,
                                    'thumbnail_filename' => $thumbnailFilename,
                                    'video_link' => $videoLink,
                                    'sets' => $exerciseData['sets'],
                                    'reps' => $exerciseData['reps'],
                                    'rest_seconds' => $exerciseData['rest_period'],
                                    'sets_configuration' => $exerciseData['sets_configuration'] ?? null,
                                    'day_id' => $workoutDay->id,
                                    'gym_id' => $gymId,
                                ]);
                            }
                            
                            // Skip the rest of the regular exercise handling
                            $activityPlans[] = $activityPlan;
                            continue;
                        } else {
                            // Exercise doesn't exist in either table
                            throw new \Exception("Exercise with ID '{$exerciseId}' not found in workout_activities or video_catalog table. Please ensure the exercise exists.");
                        }
                    }

                    // Fetch VideoCatalog to get video_link (same logic as mobile app)
                    $videoCatalog = VideoCatalog::find($exerciseId);
                    $videoLink = null;
                    if ($videoCatalog) {
                        // Use video_url if available, otherwise build from relative_path
                        $videoLink = !empty($videoCatalog->video_url) 
                                    ? $videoCatalog->video_url 
                                    : (!empty($videoCatalog->relative_path) ? asset($videoCatalog->relative_path) : null);
                    }

                    // Check if plan_id exists - if so, update instead of delete/create
                    if ($planId) {
                        // Look up by plan_id first (plan_id is unique, so this should be sufficient)
                        $existingPlan = WorkoutActivityPlan::where('plan_id', $planId)->first();
                        
                        Log::info('Plan lookup by plan_id (exercise):', [
                            'plan_id' => $planId,
                            'found' => $existingPlan ? true : false,
                            'existing_workout_id' => $existingPlan ? $existingPlan->workout_id : null,
                            'new_workout_id' => $workout->id
                        ]);
                        
                        if ($existingPlan) {
                            // Update existing plan (including workout_id and day_id in case they changed)
                            $existingPlan->update([
                                'workout_id' => $workout->id, // Update workout_id in case it changed
                                'day' => $request->day,
                                'day_id' => $workoutDay->id, // Update day_id in case it changed
                                'exercise_id' => $exercise->exercise_id,
                                'exercise_name' => $exercise->exercise_name,
                                'video_link' => $videoLink, // Store video_link using same logic as mobile app
                                'sets' => $exerciseData['sets'],
                                'reps' => $exerciseData['reps'],
                                'rest_seconds' => $exerciseData['rest_period'],
                                'sets_configuration' => $exerciseData['sets_configuration'] ?? null,
                            ]);
                            $activityPlan = $existingPlan;
                            Log::info("Updated existing plan with plan_id: {$planId}, workout_id: {$workout->id}");
                        } else {
                            // Plan_id provided but not found - create new with same plan_id
                            $activityPlan = WorkoutActivityPlan::create([
                                'plan_id' => $planId,
                                'workout_id' => $workout->id,
                                'day' => $request->day,
                                'exercise_id' => $exercise->exercise_id,
                                'exercise_name' => $exercise->exercise_name,
                                'video_link' => $videoLink, // Store video_link using same logic as mobile app
                                'thumbnail_url' => null,
                                'thumbnail_filename' => null,
                                'sets' => $exerciseData['sets'],
                                'reps' => $exerciseData['reps'],
                                'rest_seconds' => $exerciseData['rest_period'],
                                'sets_configuration' => $exerciseData['sets_configuration'] ?? null,
                                'day_id' => $workoutDay->id,
                                'gym_id' => $gymId,
                            ]);
                        }
                    } else {
                        // No plan_id - delete old and create new (existing behavior)
                        WorkoutActivityPlan::where('day_id', $workoutDay->id)
                            ->where('workout_id', $workout->id)
                            ->where('exercise_id', $exercise->exercise_id)
                            ->delete();
                        
                        // Generate new plan_id (stable format without time for consistency)
                        $newPlanId = 'plan_' . $workout->id . '_' . $request->day . '_exercise_' . $exerciseId . '_' . uniqid();
                        
                        $activityPlan = WorkoutActivityPlan::create([
                            'plan_id' => $newPlanId,
                            'workout_id' => $workout->id,
                            'day' => $request->day,
                            'exercise_id' => $exercise->exercise_id,
                            'exercise_name' => $exercise->exercise_name,
                            'video_link' => $videoLink, // Store video_link using same logic as mobile app
                            'thumbnail_url' => null,
                            'thumbnail_filename' => null,
                            'sets' => $exerciseData['sets'],
                            'reps' => $exerciseData['reps'],
                            'rest_seconds' => $exerciseData['rest_period'],
                            'sets_configuration' => $exerciseData['sets_configuration'] ?? null,
                            'day_id' => $workoutDay->id,
                            'gym_id' => $gymId,
                        ]);
                    }

                    // Try to load the exercise relationship for response (optional - don't fail if it doesn't exist)
                    try {
                        $activityPlan->load('exercise');
                    } catch (\Exception $loadError) {
                        // Log but don't fail - exercise relationship is optional for response
                        Log::warning('Failed to load exercise relationship for activity plan', [
                            'plan_id' => $activityPlan->plan_id,
                            'exercise_id' => $activityPlan->exercise_id,
                            'error' => $loadError->getMessage()
                        ]);
                    }
                }
                
                $activityPlans[] = $activityPlan;
            }

            DB::commit();

            // Format activity plans to include video_url (matching mobile app format)
            $formattedActivityPlans = collect($activityPlans)->map(function ($activityPlan) {
                $planArray = $activityPlan->toArray();
                // Add video_url field (use video_link value or null) to match mobile app format
                $planArray['video_url'] = $activityPlan->video_link ?? null;
                return $planArray;
            })->toArray();

            return response()->json([
                'success' => true,
                'message' => 'Workout activity plan saved successfully',
                'data' => [
                    'workout' => $workout,
                    'workout_day' => $workoutDay,
                    'activity_plans' => $formattedActivityPlans
                ]
            ], 201);

        } catch (\Exception $e) {
            DB::rollback();
            
            // Log full exception details for debugging
            Log::error('WorkoutActivityPlan store error:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to save workout activity plan',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred while saving the workout plan. Please try again.',
                'debug' => config('app.debug') ? [
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                ] : null
            ], 500);
        }
    }

    /**
     * Get workout activity plans for a specific day
     */
    public function show($id, Request $request)
    {
        if (!$this->shouldBypassClientPolicy($request->user('api'))) {
            $this->authorizeForUser($request->user('api'), 'view', Client::class);
        }

        try {
            // Get gym_id from authenticated user
            $gymId = $request->user('api')->gym_id;
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            $activityPlans = WorkoutActivityPlan::select('workout_activity_plans.*')
                ->leftJoin('workout_days', 'workout_activity_plans.day_id', '=', 'workout_days.id')
                ->leftJoin('workouts', 'workout_days.workout_id', '=', 'workouts.id')
                ->leftJoin('workout_activities', function($join) {
                    $join->on('workout_activity_plans.exercise_id', '=', 'workout_activities.exercise_id')
                         ->whereNull('workout_activities.deleted_at');
                })
                ->where('workout_activity_plans.workout_id', $id)
                ->where('workouts.gym_id', $gymId)
                ->whereNull('workout_activity_plans.deleted_at')
                ->whereNull('workout_days.deleted_at')
                ->get();

// Enhance the response with exercise data (use request base URL so video loads from backend)
            $baseUrl = rtrim($request->getSchemeAndHttpHost(), '/');
            $enhancedPlans = $activityPlans->map(function($plan) use ($baseUrl) {
                $exerciseData = $plan->getExerciseData();
                $videoLink = $plan->video_link;
                // Resolve video_link when null (e.g. after fresh import or name mismatch) so playback works
                if (empty($videoLink) && (trim((string) $plan->exercise_name) !== '' || trim((string) $plan->thumbnail_filename) !== '')) {
                    $videoCatalog = $this->resolveVideoCatalogForPlan($plan);
                    if ($videoCatalog) {
                        $relativePath = !empty($videoCatalog->video_url)
                            ? $this->toRelativeVideoUrl($videoCatalog->video_url)
                            : (!empty($videoCatalog->relative_path)
                                ? '/videos/' . implode('/', array_map('rawurlencode', explode('/', str_replace(\DIRECTORY_SEPARATOR, '/', $videoCatalog->relative_path))))
                                : null);
                        $videoLink = $relativePath ? ($baseUrl . $relativePath) : null;
                    }
                } elseif (!empty($videoLink) && strpos($videoLink, '/') === 0) {
                    $videoLink = $baseUrl . $videoLink;
                }
                
                // Normalize thumbnail_url for thumbnail-based exercises (fix old records with .mp4 filenames)
                $thumbnailUrl = $plan->thumbnail_url;
                $thumbnailFilename = $plan->thumbnail_filename;
                if (empty($plan->exercise_id) && !empty($thumbnailFilename)) {
                    // This is a thumbnail-based exercise - ensure thumbnail_url is correct image URL
                    $thumbnailUrl = $this->normalizeThumbnailUrl($thumbnailUrl, $thumbnailFilename, $baseUrl);
                    // Also update thumbnail_filename in response to normalized version
                    $thumbnailFilename = $this->normalizeThumbnailFilename($thumbnailFilename);
                }
                
                $planData = array_merge($plan->toArray(), [
                    'exercise_data' => $exerciseData,
                    'video_url' => $videoLink ?? null,
                    'thumbnail_url' => $thumbnailUrl,
                    'thumbnail_filename' => $thumbnailFilename
                ]);
                
                // Also update exercise_data.thumbnail if it exists
                if (isset($planData['exercise_data']['thumbnail'])) {
                    $planData['exercise_data']['thumbnail'] = $thumbnailUrl ?? $planData['exercise_data']['thumbnail'];
                }
                
                // Filter out sets with reps=0 from sets_configuration
                if (isset($planData['sets_configuration'])) {
                    // Handle JSON string (if not already decoded by model casting)
                    if (is_string($planData['sets_configuration'])) {
                        $planData['sets_configuration'] = json_decode($planData['sets_configuration'], true);
                    }
                    
                    // Only filter if it's a non-empty array
                    if (is_array($planData['sets_configuration']) && !empty($planData['sets_configuration'])) {
                        $planData['sets_configuration'] = array_filter($planData['sets_configuration'], function($set) {
                            // Ensure set is an array and has valid reps value
                            if (!is_array($set)) {
                                return false;
                            }
                            return isset($set['reps']) && is_numeric($set['reps']) && $set['reps'] > 0;
                        });
                        // Re-index array after filtering
                        $planData['sets_configuration'] = array_values($planData['sets_configuration']);
                    } else {
                        // If empty or invalid, set to null
                        $planData['sets_configuration'] = null;
                    }
                }
                
                return $planData;
            });

            return response()->json([
                'success' => true,
                'data' => $enhancedPlans
            ]);

        } catch (\Exception $e) {
            // Log full exception details for debugging
            Log::error('WorkoutActivityPlan show error:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'workout_id' => $id
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve workout activity plans',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred while retrieving workout plans. Please try again.'
            ], 500);
        }
    }

    /**
     * Get all workout activity plans
     */
    public function index(Request $request)
    {
        if (!$this->shouldBypassClientPolicy($request->user('api'))) {
            $this->authorizeForUser($request->user('api'), 'view', Client::class);
        }

        try {
            // Get gym_id from authenticated user
            $gymId = $request->user('api')->gym_id;
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            $activityPlans = WorkoutActivityPlan::with(['workoutDay', 'exercise'])
                ->whereHas('workoutDay', function($query) use ($gymId) {
                    $query->whereNull('deleted_at')
                          ->whereHas('workout', function($q) use ($gymId) {
                              $q->where('gym_id', $gymId);
                          });
                })
                // ->whereHas('exercise', function($query) {
                //     $query->whereNull('deleted_at');
                //                 })
                ->get();

            // Enhance the response with exercise data
            $baseUrl = rtrim($request->getSchemeAndHttpHost(), '/');
            $enhancedPlans = $activityPlans->map(function($plan) use ($baseUrl) {
                $exerciseData = $plan->getExerciseData();
                
                // Normalize thumbnail_url for thumbnail-based exercises (fix old records with .mp4 filenames)
                $thumbnailUrl = $plan->thumbnail_url;
                $thumbnailFilename = $plan->thumbnail_filename;
                if (empty($plan->exercise_id) && !empty($thumbnailFilename)) {
                    // This is a thumbnail-based exercise - ensure thumbnail_url is correct image URL
                    $thumbnailUrl = $this->normalizeThumbnailUrl($thumbnailUrl, $thumbnailFilename, $baseUrl);
                    // Also update thumbnail_filename in response to normalized version
                    $thumbnailFilename = $this->normalizeThumbnailFilename($thumbnailFilename);
                }
                
                $planData = array_merge($plan->toArray(), [
                    'exercise_data' => $exerciseData,
                    'thumbnail_url' => $thumbnailUrl,
                    'thumbnail_filename' => $thumbnailFilename
                ]);
                
                // Also update exercise_data.thumbnail if it exists
                if (isset($planData['exercise_data']['thumbnail'])) {
                    $planData['exercise_data']['thumbnail'] = $thumbnailUrl ?? $planData['exercise_data']['thumbnail'];
                }
                
                // Filter out sets with reps=0 from sets_configuration
                if (isset($planData['sets_configuration'])) {
                    // Handle JSON string (if not already decoded by model casting)
                    if (is_string($planData['sets_configuration'])) {
                        $planData['sets_configuration'] = json_decode($planData['sets_configuration'], true);
                    }
                    
                    // Only filter if it's a non-empty array
                    if (is_array($planData['sets_configuration']) && !empty($planData['sets_configuration'])) {
                        $planData['sets_configuration'] = array_filter($planData['sets_configuration'], function($set) {
                            // Ensure set is an array and has valid reps value
                            if (!is_array($set)) {
                                return false;
                            }
                            return isset($set['reps']) && is_numeric($set['reps']) && $set['reps'] > 0;
                        });
                        // Re-index array after filtering
                        $planData['sets_configuration'] = array_values($planData['sets_configuration']);
                    } else {
                        // If empty or invalid, set to null
                        $planData['sets_configuration'] = null;
                    }
                }
                
                return $planData;
            });

            return response()->json([
                'success' => true,
                'data' => $enhancedPlans
            ]);

        } catch (\Exception $e) {
            // Log full exception details for debugging
            Log::error('WorkoutActivityPlan index error:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve workout activity plans',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred while retrieving workout plans. Please try again.'
            ], 500);
        }
    }

    /**
     * Get exercise data from workout_activities table
     */
    public function getExerciseData($exerciseId)
    {
        if (!$this->shouldBypassClientPolicy(request()->user('api'))) {
            $this->authorizeForUser(request()->user('api'), 'view', Client::class);
        }

        try {
            $exercise = WorkoutActivity::where('exercise_id', $exerciseId)
                ->whereNull('deleted_at')
                ->first();

            if (!$exercise) {
                return response()->json([
                    'success' => false,
                    'message' => 'Exercise not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => [
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
                    'rest_period' => $exercise->rest_period,
                    'tags' => $exercise->tags,
                    'video_link' => $exercise->video_link,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve exercise data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update a workout activity plan
     */
    public function update(Request $request, $id)
    {
        if (!$this->shouldBypassClientPolicy($request->user('api'))) {
            $this->authorizeForUser($request->user('api'), 'update', Client::class);
        }

        $validator = Validator::make($request->all(), [
            'sets' => 'sometimes|integer|min:1',
            'reps' => 'sometimes|integer|min:1',
            'rest_seconds' => 'sometimes|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Get gym_id from authenticated user
            $gymId = $request->user('api')->gym_id;
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            $activityPlan = WorkoutActivityPlan::with(['workoutDay.workout'])
                ->whereHas('workoutDay.workout', function($query) use ($gymId) {
                    $query->where('gym_id', $gymId);
                })
                ->findOrFail($id);
            
            $activityPlan->update($request->only(['sets', 'reps', 'rest_seconds']));
            
            $activityPlan->load('exercise');

            return response()->json([
                'success' => true,
                'message' => 'Workout activity plan updated successfully',
                'data' => $activityPlan
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update workout activity plan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a workout activity plan
     */
    public function destroy(Request $request, $id)
    {
        if (!$this->shouldBypassClientPolicy($request->user('api'))) {
            $this->authorizeForUser($request->user('api'), 'delete', Client::class);
        }

        try {
            // Get gym_id from authenticated user
            $gymId = $request->user('api')->gym_id;
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            $activityPlan = WorkoutActivityPlan::with(['workoutDay.workout'])
                ->whereHas('workoutDay.workout', function($query) use ($gymId) {
                    $query->where('gym_id', $gymId);
                })
                ->find($id);
            
            if (!$activityPlan) {
                // Plan doesn't exist or doesn't belong to this gym - return success anyway
                // (might have already been deleted)
                return response()->json([
                    'success' => true,
                    'message' => 'Workout activity plan not found (may have already been deleted)'
                ]);
            }
            
            $activityPlan->delete();

            return response()->json([
                'success' => true,
                'message' => 'Workout activity plan deleted successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('WorkoutActivityPlan destroy error:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'plan_id' => $id
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete workout activity plan',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred while deleting the workout plan. Please try again.'
            ], 500);
        }
    }

    /**
     * Create or find a workout
     */
    private function createOrFindWorkout($name, $description = null, $gymId = null)
    {
        // Always use gym_id = 1 for new workouts
        $gymId = 1;

        // Check if workout with this name already exists for this gym
        $workout = \App\Models\Workout::where('exercise_name', $name)
            ->where('gym_id', $gymId)
            ->whereNull('deleted_at')
            ->first();

        if (!$workout) {
            // Create new workout with gym_id
            $workout = \App\Models\Workout::create([
                'gym_id' => $gymId,
                'exercise_name' => $name,
                'description' => $description,
                'category' => 'Custom',
                'duration' => '30 min',
                'level' => 'Intermediate',
            ]);
        }

        return $workout;
    }

    /**
     * Create or find a workout day
     */
    private function createOrFindWorkoutDay($workoutId, $day)
    {
        // Check if workout day already exists
        $workoutDay = WorkoutDay::where('workout_id', $workoutId)
            ->where('day', $day)
            ->whereNull('deleted_at')
            ->first();

        if (!$workoutDay) {
            // Create new workout day
            $workoutDay = WorkoutDay::create([
                'workout_id' => $workoutId,
                'day' => $day,
            ]);
        }

        return $workoutDay;
    }

    /**
     * Get next workout ID (used for ordering/code generation; based on max id)
     */
    private function getNextWorkoutId()
    {
        $maxId = \App\Models\Workout::max('id');
        return $maxId ? (int) $maxId + 1 : 1;
    }

    /**
     * Resolve VideoCatalog for a plan (by name, filename, or name variants like "180 Jump Turns_Male").
     */
    private function resolveVideoCatalogForPlan(WorkoutActivityPlan $plan)
    {
        $name = trim((string) $plan->exercise_name);
        $thumbnailFilename = trim((string) $plan->thumbnail_filename);

        $videoCatalog = VideoCatalog::where('name', $name)->first();
        if ($videoCatalog) {
            return $videoCatalog;
        }
        if ($thumbnailFilename) {
            $basename = pathinfo($thumbnailFilename, PATHINFO_FILENAME);
            $videoCatalog = VideoCatalog::where('filename', $basename . '.mp4')
                ->orWhere('name', $basename)
                ->first();
            if ($videoCatalog) {
                return $videoCatalog;
            }
        }
        // Name variants: e.g. "180 Jump Turns_Male" -> try "180 Jump Turns Male", or like match
        $nameNormalized = str_replace('_', ' ', $name);
        $videoCatalog = VideoCatalog::where('name', $nameNormalized)->first();
        if ($videoCatalog) {
            return $videoCatalog;
        }
        $videoCatalog = VideoCatalog::where('name', 'like', '%' . str_replace(' ', '%', $name) . '%')->first();
        if ($videoCatalog) {
            return $videoCatalog;
        }
        return VideoCatalog::where('name', 'like', '%' . $name . '%')->first();
    }

    /**
     * Normalize video URL to relative path so playback works from any origin.
     */
    private function toRelativeVideoUrl(?string $url): ?string
    {
        if (empty($url)) {
            return null;
        }
        if (preg_match('#^https?://[^/]+(/.+)$#', $url, $m)) {
            return $m[1];
        }
        return strpos($url, '/') === 0 ? $url : '/' . $url;
    }

    /**
     * Ensure thumbnail filename is an image filename (e.g. .jpg), not video (.mp4).
     * Thumbnails are served from public/thumbnails as images; video filename is only for lookup.
     */
    private function normalizeThumbnailFilename(?string $thumbnailFilename): ?string
    {
        if ($thumbnailFilename === null || trim($thumbnailFilename) === '') {
            return null;
        }
        $ext = strtolower(pathinfo($thumbnailFilename, PATHINFO_EXTENSION));
        // If it's a video extension, convert to image extension (.jpg)
        if (in_array($ext, ['mp4', 'webm', 'mov', 'avi', 'mkv'])) {
            $basename = pathinfo($thumbnailFilename, PATHINFO_FILENAME);
            return $basename . '.jpg';
        }
        return $thumbnailFilename;
    }

    /**
     * Normalize thumbnail URL to ensure it's an image URL, not a video URL.
     * If the URL points to a video file (.mp4), build the correct thumbnail image URL.
     */
    private function normalizeThumbnailUrl(?string $thumbnailUrl, ?string $thumbnailFilename, string $baseUrl): ?string
    {
        if (empty($thumbnailUrl)) {
            // If no URL but we have filename, build thumbnail URL from filename
            if (!empty($thumbnailFilename)) {
                $basename = pathinfo($this->normalizeThumbnailFilename($thumbnailFilename), PATHINFO_FILENAME);
                return $baseUrl . '/api/workout_exercises/thumbnail/' . rawurlencode($basename . '.jpg');
            }
            return null;
        }

        // Check if URL ends with video extension
        $urlLower = strtolower($thumbnailUrl);
        if (preg_match('/\.(mp4|webm|mov|avi|mkv)(\?|$|#)/i', $thumbnailUrl)) {
            // It's a video URL - build thumbnail image URL from basename
            if (!empty($thumbnailFilename)) {
                $basename = pathinfo($this->normalizeThumbnailFilename($thumbnailFilename), PATHINFO_FILENAME);
            } else {
                // Extract basename from URL
                $basename = pathinfo(parse_url($thumbnailUrl, PHP_URL_PATH), PATHINFO_FILENAME);
            }
            return $baseUrl . '/api/workout_exercises/thumbnail/' . rawurlencode($basename . '.jpg');
        }

        // If URL already points to thumbnail API endpoint, return as-is
        if (strpos($thumbnailUrl, '/api/workout_exercises/thumbnail/') !== false) {
            return $thumbnailUrl;
        }

        // If it's a relative path or doesn't look like a full URL, ensure it's absolute
        if (strpos($thumbnailUrl, 'http://') !== 0 && strpos($thumbnailUrl, 'https://') !== 0) {
            // If it's already a thumbnail path, make it absolute
            if (strpos($thumbnailUrl, '/thumbnails/') !== false || strpos($thumbnailUrl, '/api/workout_exercises/thumbnail/') !== false) {
                $path = strpos($thumbnailUrl, '/') === 0 ? $thumbnailUrl : '/' . $thumbnailUrl;
                return $baseUrl . $path;
            }
        }

        return $thumbnailUrl;
    }

    /**
     * Build thumbnail image URL from thumbnail filename (for display).
     * Ensures we always return an image URL, not a video filename.
     */
    private function buildThumbnailImageUrl(?string $thumbnailFilename, string $baseUrl): ?string
    {
        if (empty($thumbnailFilename)) {
            return null;
        }
        // Normalize filename to image extension
        $normalizedFilename = $this->normalizeThumbnailFilename($thumbnailFilename);
        $basename = pathinfo($normalizedFilename, PATHINFO_FILENAME);
        return $baseUrl . '/api/workout_exercises/thumbnail/' . rawurlencode($basename . '.jpg');
    }
} 