<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Workout;
use App\Models\WorkoutSession;
use App\Models\WorkoutDaySession;
use App\Models\WorkoutDay;
use App\Models\WorkoutActivityPlan;
use App\Models\VideoCatalog;
use App\Models\WorkoutActivity;
use App\Models\WorkoutAssignment;
use App\Models\Member;
use App\Services\ChallengeProgressService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MemberWorkoutController extends Controller
{
    /**
     * 📋 Get all workouts assigned to the logged-in member
     * Supports advanced filtering: goals, duration, equipment, levels, workout types
     */
    public function getAssignedWorkouts(Request $request)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Get member record from members table
            $member = DB::table('members')->where('email', $user->email)->first();
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Advanced filter parameters (from frontend filter modal)
            $goals = $request->get('goals', []);
            $durations = $request->get('durations', []);
            $equipments = $request->get('equipments', []);
            $levels = $request->get('levels', []);
            $workoutTypes = $request->get('workout_types', []);
            $search = $request->get('search');
            
            // Convert string inputs to arrays if needed
            if (is_string($goals)) $goals = json_decode($goals, true) ?? [];
            if (is_string($durations)) $durations = json_decode($durations, true) ?? [];
            if (is_string($equipments)) $equipments = json_decode($equipments, true) ?? [];
            if (is_string($levels)) $levels = json_decode($levels, true) ?? [];
            if (is_string($workoutTypes)) $workoutTypes = json_decode($workoutTypes, true) ?? [];

            // Get workouts assigned to this member
            $query = Workout::whereHas('assignments', function ($q) use ($member) {
                $q->where('member_id', $member->id);
            })
            ->whereNull('deleted_at')
            ->with('days.activities');
            
            // Filter by Goals
            if (!empty($goals)) {
                $query->where(function($q) use ($goals) {
                    foreach ($goals as $goal) {
                        $goalLower = strtolower($goal);
                        $q->orWhere(function($subQ) use ($goalLower, $goal) {
                            $subQ->where('tags', 'like', '%' . $goal . '%')
                                ->orWhere('description', 'like', '%' . $goal . '%')
                                ->orWhere('exercise_name', 'like', '%' . $goal . '%');
                            
                            if (strpos($goalLower, 'lose weight') !== false || strpos($goalLower, 'weight loss') !== false) {
                                $subQ->orWhere('tags', 'like', '%weight%')
                                    ->orWhere('tags', 'like', '%lose%');
                            }
                            if (strpos($goalLower, 'build muscle') !== false || strpos($goalLower, 'muscle') !== false) {
                                $subQ->orWhere('tags', 'like', '%muscle%')
                                    ->orWhere('tags', 'like', '%build%')
                                    ->orWhere('muscles_targeted', 'like', '%muscle%');
                            }
                            if (strpos($goalLower, 'well-being') !== false || strpos($goalLower, 'wellbeing') !== false) {
                                $subQ->orWhere('tags', 'like', '%well%')
                                    ->orWhere('tags', 'like', '%being%');
                            }
                            if (strpos($goalLower, 'performance') !== false) {
                                $subQ->orWhere('tags', 'like', '%performance%');
                            }
                            if (strpos($goalLower, 'fit') !== false) {
                                $subQ->orWhere('tags', 'like', '%fit%');
                            }
                            if (strpos($goalLower, 'tone') !== false || strpos($goalLower, 'shape') !== false) {
                                $subQ->orWhere('tags', 'like', '%tone%')
                                    ->orWhere('tags', 'like', '%shape%');
                            }
                        });
                    }
                });
            }
            
            // Filter by Duration (Any duration, < 20 minutes, 20 - 40 minutes, > 40 minutes, Multi-day workout plan)
            if (!empty($durations)) {
                $query->where(function($q) use ($durations) {
                    foreach ($durations as $duration) {
                        $durationLower = strtolower(trim($duration));
                        $q->orWhere(function($subQ) use ($durationLower, $duration) {
                            // "Any duration" - show all (no filter applied)
                            if ($durationLower === 'any duration') {
                                $subQ->whereRaw('1 = 1'); // Always true - no filter
                            }
                            // "< 20 minutes" - duration less than 20
                            elseif ($durationLower === '< 20 minutes' || $durationLower === '<20 minutes') {
                                $subQ->where(function($durQ) {
                                    for ($i = 0; $i < 20; $i++) {
                                        $durQ->orWhere('duration', 'like', '%' . $i . '%');
                                    }
                                });
                            }
                            // "20 - 40 minutes" - duration between 20 and 40
                            elseif (preg_match('/20\s*-\s*40\s*min/i', $duration)) {
                                $subQ->where(function($durQ) {
                                    for ($i = 20; $i <= 40; $i++) {
                                        $durQ->orWhere('duration', 'like', '%' . $i . '%');
                                    }
                                });
                            }
                            // "> 40 minutes" - duration greater than 40
                            elseif ($durationLower === '> 40 minutes' || $durationLower === '>40 minutes') {
                                $subQ->where(function($durQ) {
                                    for ($i = 41; $i <= 180; $i += 1) {
                                        $durQ->orWhere('duration', 'like', '%' . $i . '%');
                                    }
                                });
                            }
                            // "Multi-day workout plan" - workouts with multiple days
                            elseif ($durationLower === 'multi-day workout plan' || $durationLower === 'multi-day') {
                                $subQ->whereRaw('(SELECT COUNT(*) FROM workout_days WHERE workout_days.workout_id = workouts.id AND workout_days.deleted_at IS NULL) >= 2');
                            }
                        });
                    }
                });
            }
            
            // Filter by Equipment
            if (!empty($equipments)) {
                $query->where(function($q) use ($equipments) {
                    foreach ($equipments as $equipment) {
                        $equipmentLower = strtolower($equipment);
                        $q->orWhere(function($subQ) use ($equipmentLower, $equipment) {
                            if ($equipmentLower === 'no equipment' || $equipmentLower === 'bodyweight') {
                                $subQ->where(function($eqQ) {
                                    $eqQ->whereNull('equipment')
                                        ->orWhere('equipment', '')
                                        ->orWhere('equipment', 'like', '%no equipment%')
                                        ->orWhere('equipment', 'like', '%bodyweight%')
                                        ->orWhere('equipment', 'like', '%none%');
                                });
                            } else {
                                $subQ->where('equipment', 'like', '%' . $equipment . '%');
                            }
                        });
                    }
                });
            }
            
            // Filter by Levels
            if (!empty($levels)) {
                $query->where(function($q) use ($levels) {
                    foreach ($levels as $level) {
                        $q->orWhere(function($subQ) use ($level) {
                            $levelLower = strtolower($level);
                            $subQ->where('level', 'like', '%' . $level . '%');
                            
                            // Map level names to difficulty ranges
                            if ($levelLower === 'beginner') {
                                $subQ->orWhereBetween('difficulty', [1, 3]);
                            } elseif ($levelLower === 'intermediate') {
                                $subQ->orWhereBetween('difficulty', [4, 6]);
                            } elseif ($levelLower === 'advanced') {
                                $subQ->orWhereBetween('difficulty', [7, 8]);
                            } elseif ($levelLower === 'expert') {
                                $subQ->orWhereBetween('difficulty', [9, 10]);
                            }
                        });
                    }
                });
            }
            
            // Filter by Workout Types
            if (!empty($workoutTypes)) {
                $query->where(function($q) use ($workoutTypes) {
                    foreach ($workoutTypes as $workoutType) {
                        $typeLower = strtolower($workoutType);
                        $q->orWhere(function($subQ) use ($typeLower, $workoutType) {
                            $subQ->where('category', 'like', '%' . $workoutType . '%')
                                ->orWhere('type', 'like', '%' . $workoutType . '%')
                                ->orWhere('tags', 'like', '%' . $workoutType . '%');
                            
                            if ($typeLower === 'strength') {
                                $subQ->orWhere('category', 'like', '%weight%')
                                    ->orWhere('category', 'like', '%muscle%');
                            }
                            if ($typeLower === 'cardio') {
                                $subQ->orWhere('category', 'like', '%aerobic%')
                                    ->orWhere('category', 'like', '%endurance%');
                            }
                            if ($typeLower === 'hiit') {
                                $subQ->orWhere('category', 'like', '%high intensity%')
                                    ->orWhere('category', 'like', '%interval%');
                            }
                            if ($typeLower === 'stretching') {
                                $subQ->orWhere('category', 'like', '%flexibility%')
                                    ->orWhere('category', 'like', '%stretch%');
                            }
                        });
                    }
                });
            }
            
            // Search filter
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

            // Get filtered workouts
            $workouts = $query->get();

            // Transform workouts to include full thumbnail URLs and assignment data
            $transformedWorkouts = $workouts->map(function ($workout) use ($member) {
                $workoutArray = $workout->toArray();
                // Convert thumbnail path to full URL
                if (!empty($workoutArray['thumbnail'])) {
                    $workoutArray['thumbnail'] = asset($workoutArray['thumbnail']);
                }
                
                // Get the assignment for this member
                $assignment = \App\Models\WorkoutAssignment::where('workout_id', $workout->id)
                    ->where('member_id', $member->id)
                    ->whereNull('deleted_at')
                    ->first();
                
                // Include assignment dates in the workout data
                if ($assignment) {
                    $workoutArray['start_date'] = $assignment->start_date;
                    $workoutArray['end_date'] = $assignment->end_date;
                    $workoutArray['assignment'] = [
                        'id' => $assignment->id,
                        'start_date' => $assignment->start_date,
                        'end_date' => $assignment->end_date,
                        'notes' => $assignment->notes,
                        'status' => $assignment->status,
                    ];
                }
                
                return $workoutArray;
            });

            return response()->json([
                'success' => true,
                'workouts' => $transformedWorkouts
            ]);
        } catch (\Exception $e) {
            \Log::error('Get assigned workouts error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * 📘 Get full workout details (days + activities)
     */
    public function getWorkoutDetails(Request $request, $workoutId)
    {
        try {
            // Fetch workout with days and exercises
            $workout = Workout::with('workoutDays.workoutActivityPlans.exercise')->findOrFail($workoutId);

            // Collect all activity plans to resolve video catalog data in batches
            $allActivityPlans = $workout->workoutDays->flatMap(function ($day) {
                return $day->workoutActivityPlans;
            });

            $exerciseIds = $allActivityPlans->pluck('exercise_id')->filter()->unique();
            $exerciseNames = $allActivityPlans->pluck('exercise_name')->filter()->unique();

            $videoCatalogsById = $exerciseIds->isNotEmpty()
                ? VideoCatalog::whereIn('id', $exerciseIds)->get()->keyBy('id')
                : collect();

            $videoCatalogsByName = $exerciseNames->isNotEmpty()
                ? VideoCatalog::whereIn('name', $exerciseNames)->get()->keyBy('name')
                : collect();
    
            // Transform days and activities
            $days = $workout->workoutDays->map(function ($day) use ($videoCatalogsById, $videoCatalogsByName) {
                $activities = $day->workoutActivityPlans->map(function ($activityPlan) use ($videoCatalogsById, $videoCatalogsByName) {
                    $videoCatalog = null;

                    if ($activityPlan->exercise_id && $videoCatalogsById->has($activityPlan->exercise_id)) {
                        $videoCatalog = $videoCatalogsById->get($activityPlan->exercise_id);
                    } elseif ($activityPlan->exercise_name && $videoCatalogsByName->has($activityPlan->exercise_name)) {
                        $videoCatalog = $videoCatalogsByName->get($activityPlan->exercise_name);
                    }

                    $videoRelativePath = $videoCatalog ? $videoCatalog->relative_path : null;
                    $videoLink = null;

                    if ($videoCatalog) {
                        if (!empty($videoCatalog->video_url)) {
                            $videoLink = $videoCatalog->video_url;
                        } elseif (!empty($videoRelativePath)) {
                            $videoLink = asset($videoRelativePath);
                        }
                    }

                    return [
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
                        'video_link' => $videoLink,
                        'video_relative_path' => $videoRelativePath,
                        'sets' => $activityPlan->sets,
                        'reps' => $activityPlan->reps,
                        'rest_seconds' => $activityPlan->rest_seconds,
                        'sets_configuration' => $activityPlan->sets_configuration,
                        'exercise' => $activityPlan->exercise // include exercise object
                    ];
                });
    
                return [
                    'id' => $day->id,
                    'workout_id' => $day->workout_id,
                    'day' => $day->day,
                    'workout_activity_plans' => $activities
                ];
            });
    
            return response()->json([
                'workout_id' => $workout->id,
                'days' => $days
            ]);
    
        } catch (\Exception $e) {
            \Log::error('Get workout details error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }
    

    /**
     * ▶️ Start a workout (create session if not exists)
     */
    public function startWorkout(Request $request, $workoutId)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Get member record from members table
            $member = DB::table('members')->where('email', $user->email)->first();
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            $gymId = $member->gym_id ?? 1;
            $session = WorkoutSession::firstOrCreate(
                [
                    'workout_id' => $workoutId,
                    'member_id' => $member->id
                ],
                [
                    'gym_id' => $gymId,
                    'status' => 'in_progress',
                    'started_at' => now()
                ]
            );
            if (!$session->gym_id || $session->gym_id == 0) {
                $session->update(['gym_id' => $gymId]);
            }

            if ($session->status === 'completed') {
                return response()->json([
                    'success' => false,
                    'message' => 'Workout already completed.'
                ], 400);
            }

            $session->update(['status' => 'in_progress', 'started_at' => now()]);

            return response()->json([
                'success' => true,
                'message' => 'Workout started successfully!',
                'session' => $session
            ]);
        } catch (\Exception $e) {
            \Log::error('Start workout error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * 🏁 Start a specific day in the workout
     */
    public function startDay(Request $request, $workoutId, $dayNumber)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Get member record from members table
            $member = DB::table('members')->where('email', $user->email)->first();
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            $gymId = $member->gym_id ?? 1;
            $session = WorkoutSession::firstOrCreate([
                'workout_id' => $workoutId,
                'member_id' => $member->id,
            ], [
                'gym_id' => $gymId,
                'status' => 'in_progress',
                'started_at' => now(),
            ]);
            if (!$session->gym_id || $session->gym_id == 0) {
                $session->update(['gym_id' => $gymId]);
            }

            $daySession = WorkoutDaySession::firstOrCreate([
                'workout_session_id' => $session->id,
                'day_number' => $dayNumber,
            ], [
                'status' => 'in_progress',
                'started_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => "Workout Day {$dayNumber} started successfully!",
                'day_session' => $daySession,
            ]);
        } catch (\Exception $e) {
            \Log::error('Start day error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * ✅ Complete a workout day
     * CRITICAL: This method marks ONLY the specified day_number as completed
     */
    public function completeDay(Request $request, $workoutId, $dayNumber)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Get member record from members table
            $member = DB::table('members')->where('email', $user->email)->first();
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Validate day_number
            if ($dayNumber < 1 || $dayNumber > 7) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid day number. Must be between 1 and 7.'
                ], 400);
            }

            // Get the workout session for this member
            $session = WorkoutSession::where('workout_id', $workoutId)
                ->where('member_id', $member->id)
                ->firstOrFail();

            // CRITICAL: Get the day session for ONLY the specified day_number
            // This ensures we're only marking the requested day as completed
            $daySession = WorkoutDaySession::where('workout_session_id', $session->id)
                ->where('day_number', $dayNumber) // CRITICAL: Filter by day_number to ensure day-specific completion
                ->firstOrFail();

            // Additional validation: Ensure the day_session matches the requested day
            if ($daySession->day_number != $dayNumber) {
                \Log::error("Day session mismatch in completeDay: Expected day_number {$dayNumber}, got {$daySession->day_number}");
                return response()->json([
                    'success' => false,
                    'message' => 'Day session mismatch error.'
                ], 500);
            }

            if ($daySession->status === 'completed') {
                return response()->json([
                    'success' => true,
                    'message' => "Day {$dayNumber} is already completed.",
                    'day_number' => $dayNumber,
                    'day_status' => 'completed'
                ]);
            }

            // CRITICAL: Update ONLY this specific day session
            $daySession->update([
                'status' => 'completed',
                'completed_at' => now(),
            ]);

            // Log the completion for debugging
            \Log::info("Day completed", [
                'workout_id' => $workoutId,
                'day_number' => $dayNumber,
                'member_id' => $member->id,
                'day_session_id' => $daySession->id
            ]);

            // Update challenge progress for workout-based challenges
            try {
                $challengeService = new ChallengeProgressService();
                $challengeService->updateProgressAfterWorkout($member->id, $workoutId, now());
            } catch (\Exception $e) {
                // Log error but don't fail the workout completion
                \Log::error('Failed to update challenge progress after workout completion', [
                    'member_id' => $member->id,
                    'workout_id' => $workoutId,
                    'error' => $e->getMessage()
                ]);
            }

            // Check if all days are completed (this is for workout-level completion, not day-level)
            $remaining = WorkoutDaySession::where('workout_session_id', $session->id)
                ->where('status', '!=', 'completed')
                ->count();

            if ($remaining === 0) {
                $session->update([
                    'status' => 'completed',
                    'completed_at' => now(),
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => "Day {$dayNumber} completed successfully!",
                'day_number' => $dayNumber,
                'day_status' => 'completed'
            ]);
        } catch (\Exception $e) {
            \Log::error('Complete day error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * 🏆 Complete the entire workout manually (optional endpoint)
     */
    public function completeWorkout(Request $request, $workoutId)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Get member record from members table
            $member = DB::table('members')->where('email', $user->email)->first();
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            $session = WorkoutSession::where('workout_id', $workoutId)
                ->where('member_id', $member->id)
                ->firstOrFail();

            $session->update([
                'status' => 'completed',
                'completed_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Workout completed successfully!'
            ]);
        } catch (\Exception $e) {
            \Log::error('Complete workout error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function getWorkoutStatus(Request $request, $workoutId)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Get member record from members table
            $member = DB::table('members')->where('email', $user->email)->first();
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Check if there's any session for this workout and member
            $session = WorkoutSession::where('workout_id', $workoutId)
                ->where('member_id', $member->id)
                ->latest()
                ->first();

            if (!$session) {
                return response()->json([
                    'success' => true,
                    'status' => 'not_started',
                    'message' => 'Workout not started yet.'
                ]);
            }

            // If session exists
            return response()->json([
                'success' => true,
                'status' => $session->status, // could be 'in_progress' or 'completed'
                'started_at' => $session->started_at,
                'completed_at' => $session->completed_at,
                'message' => 'Workout status retrieved successfully.',
            ]);
        } catch (\Exception $e) {
            \Log::error('Get workout status error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * 📊 Get day-specific activity status
     * Returns the status of activities for a specific day in a workout
     * CRITICAL: This method returns status ONLY for the requested day_number
     */
    public function getDayActivityStatus(Request $request, $workoutId, $dayNumber)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Get member record from members table
            $member = DB::table('members')->where('email', $user->email)->first();
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Define day order mapping (day_number to day name)
            $dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            
            // Validate day_number
            if ($dayNumber < 1 || $dayNumber > 7) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid day number. Must be between 1 and 7.'
                ], 400);
            }

            // Get the day name from day_number
            $dayName = $dayOrder[$dayNumber - 1];

            // Get the workout
            $workout = Workout::findOrFail($workoutId);

            // Get the specific workout day - CRITICAL: Only get the day that matches the requested day_name
            $workoutDay = WorkoutDay::where('workout_id', $workoutId)
                ->where('day', $dayName)
                ->first();

            if (!$workoutDay) {
                return response()->json([
                    'success' => false,
                    'message' => "Day '{$dayName}' not found for this workout."
                ], 404);
            }

            // Get workout session for this member
            // CRITICAL: Use latest() to get the most recent session, but we'll filter by day_number below
            $session = WorkoutSession::where('workout_id', $workoutId)
                ->where('member_id', $member->id)
                ->latest()
                ->first();

            // Get day session status - CRITICAL: Filter by BOTH session ID AND day_number
            // This ensures we only get the status for the specific day requested
            $daySession = null;
            $dayStatus = 'not_started';
            
            if ($session) {
                // CRITICAL: Query with explicit day_number filter to ensure day-specific status
                $daySession = WorkoutDaySession::where('workout_session_id', $session->id)
                    ->where('day_number', $dayNumber) // CRITICAL: This ensures we only get status for the requested day
                    ->first();
                
                if ($daySession) {
                    $dayStatus = $daySession->status;
                    
                    // Additional validation: Ensure the day_session actually belongs to the requested day
                    if ($daySession->day_number != $dayNumber) {
                        // This should never happen, but log it if it does
                        \Log::warning("Day session mismatch: Expected day_number {$dayNumber}, got {$daySession->day_number}");
                        $dayStatus = 'not_started'; // Reset to safe default
                        $daySession = null;
                    }
                }
            }

            // Get all activities for this specific day
            // CRITICAL: Filter by day_id to ensure we only get activities for the requested day
            $activities = WorkoutActivityPlan::where('workout_id', $workoutId)
                ->where('day_id', $workoutDay->id) // CRITICAL: This ensures activities are for the specific day
                ->with('exercise')
                ->get();

            // Format activities with status
            $activitiesData = $activities->map(function ($activity) {
                return [
                    'activity_id' => $activity->id,
                    'exercise_id' => $activity->exercise_id,
                    'exercise_name' => $activity->exercise_name,
                    'sets' => $activity->sets,
                    'reps' => $activity->reps,
                    'rest_seconds' => $activity->rest_seconds,
                    'day_id' => $activity->day_id,
                    'exercise_details' => $activity->exercise ? [
                        'category' => $activity->exercise->category,
                        'thumbnail' => $activity->exercise->thumbnail,
                        'video_link' => $activity->exercise->video_link,
                        'instructions' => $activity->exercise->instructions,
                        'muscles_targeted' => $activity->exercise->muscles_targeted,
                    ] : null,
                ];
            });

            // CRITICAL: Final validation - ensure we're returning data for the correct day
            // This is a safety check to prevent returning wrong day's data
            $response = [
                'success' => true,
                'workout_id' => $workoutId,
                'workout_name' => $workout->exercise_name,
                'day_number' => $dayNumber, // CRITICAL: Explicitly include day_number in response
                'day_name' => $dayName, // CRITICAL: Explicitly include day_name in response
                'day_id' => $workoutDay->id,
                'day_status' => $dayStatus, // CRITICAL: This status is ONLY for the requested day_number
                'day_session' => $daySession ? [
                    'id' => $daySession->id,
                    'day_number' => $daySession->day_number, // Include day_number for verification
                    'status' => $daySession->status,
                    'started_at' => $daySession->started_at,
                    'completed_at' => $daySession->completed_at,
                ] : null,
                'total_activities' => $activities->count(),
                'activities' => $activitiesData,
                'message' => "Day activity status retrieved successfully for {$dayName} (day_number: {$dayNumber})."
            ];
            
            // Log for debugging (can be removed in production)
            \Log::info("Day status API called", [
                'workout_id' => $workoutId,
                'day_number' => $dayNumber,
                'day_name' => $dayName,
                'day_status' => $dayStatus,
                'member_id' => $member->id
            ]);
            
            return response()->json($response);
        } catch (\Exception $e) {
            \Log::error('Get day activity status error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * 📈 Get workout summary for a specific day
     * Returns dynamic summary data based on workout activities for the day
     */
    public function getWorkoutSummary(Request $request, $workoutId, $dayNumber)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Get member record from members table
            $member = DB::table('members')->where('email', $user->email)->first();
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Define day order mapping
            $dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            
            // Validate day_number
            if ($dayNumber < 1 || $dayNumber > 7) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid day number. Must be between 1 and 7.'
                ], 400);
            }

            // Get the day name from day_number
            $dayName = $dayOrder[$dayNumber - 1];

            // Get the workout
            $workout = Workout::findOrFail($workoutId);

            // Get the specific workout day
            $workoutDay = WorkoutDay::where('workout_id', $workoutId)
                ->where('day', $dayName)
                ->first();

            if (!$workoutDay) {
                return response()->json([
                    'success' => false,
                    'message' => "Day '{$dayName}' not found for this workout."
                ], 404);
            }

            // Get workout session for this member
            $session = WorkoutSession::where('workout_id', $workoutId)
                ->where('member_id', $member->id)
                ->latest()
                ->first();

            // Get day session
            $daySession = null;
            if ($session) {
                $daySession = WorkoutDaySession::where('workout_session_id', $session->id)
                    ->where('day_number', $dayNumber)
                    ->first();
            }

            // Get all activities for this specific day
            $activities = WorkoutActivityPlan::where('workout_id', $workoutId)
                ->where('day_id', $workoutDay->id)
                ->with('exercise')
                ->get();

            // Calculate summary metrics
            $totalActivities = $activities->count();
            $totalSets = $activities->sum('sets');
            $totalReps = $activities->sum(function ($activity) {
                return ($activity->sets ?? 0) * ($activity->reps ?? 0);
            });

            // Calculate duration
            $duration = 0; // in minutes
            if ($daySession && $daySession->started_at && $daySession->completed_at) {
                // Calculate from actual session time
                $startTime = \Carbon\Carbon::parse($daySession->started_at);
                $endTime = \Carbon\Carbon::parse($daySession->completed_at);
                $duration = max(0, $endTime->diffInMinutes($startTime));
            } elseif ($workout->duration) {
                // Fallback to workout duration
                $duration = (int) $workout->duration;
            } else {
                // Calculate estimated duration based on activities
                // Assume 30 seconds per set + rest time
                $estimatedMinutes = 0;
                foreach ($activities as $activity) {
                    $sets = $activity->sets ?? 0;
                    $restSeconds = $activity->rest_seconds ?? 30;
                    $estimatedMinutes += ($sets * 0.5) + (($sets - 1) * ($restSeconds / 60));
                }
                $duration = max(1, (int) ceil($estimatedMinutes));
            }

            // Calculate calories
            // Base calculation: duration * calories per minute (default 6.7)
            // Can be enhanced with activity-specific calories if available
            $caloriesPerMinute = 6.7;
            $calories = (int) round($duration * $caloriesPerMinute);
            
            // If workout has calories_burned, use it as a base and adjust by duration
            if ($workout->calories_burned && $workout->calories_burned > 0) {
                $workoutCaloriesPerMinute = $workout->calories_burned / max(1, $workout->duration ?? $duration);
                $calories = (int) round($duration * $workoutCaloriesPerMinute);
            }

            // Format activities summary
            $activitiesSummary = $activities->map(function ($activity) {
                return [
                    'activity_id' => $activity->id,
                    'exercise_name' => $activity->exercise_name,
                    'sets' => $activity->sets ?? 0,
                    'reps' => $activity->reps ?? 0,
                    'total_reps' => ($activity->sets ?? 0) * ($activity->reps ?? 0),
                    'rest_seconds' => $activity->rest_seconds ?? 30,
                ];
            });

            // Build response
            $response = [
                'success' => true,
                'workout_id' => $workoutId,
                'workout_name' => $workout->exercise_name,
                'workout_category' => $workout->category ?? null,
                'workout_level' => $workout->level ?? null,
                'day_number' => $dayNumber,
                'day_name' => $dayName,
                'day_id' => $workoutDay->id,
                'summary' => [
                    'duration' => $duration, // in minutes
                    'duration_formatted' => sprintf('%02d:00', $duration), // formatted as MM:00
                    'calories' => $calories,
                    'activities' => $totalActivities,
                    'sets' => $totalSets,
                    'reps' => $totalReps,
                ],
                'day_session' => $daySession ? [
                    'id' => $daySession->id,
                    'status' => $daySession->status,
                    'started_at' => $daySession->started_at,
                    'completed_at' => $daySession->completed_at,
                ] : null,
                'activities_summary' => $activitiesSummary,
                'completed_at' => $daySession && $daySession->completed_at 
                    ? $daySession->completed_at 
                    : now()->toDateTimeString(),
                'message' => "Workout summary retrieved successfully for {$dayName}."
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            \Log::error('Get workout summary error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get user's workouts (from MobileWorkoutController)
     */
    public function index(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            // Get workouts assigned to this member through WorkoutAssignment
            $workoutAssignments = WorkoutAssignment::where('member_id', $member->id)
                ->where('deleted_at', null)
                ->with(['workout.workoutDays.workoutActivityPlans.exercise'])
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

  

    public function store(Request $request)
{
try {
$member = $request->get('auth_member');

    // Get coach_id from members table
    // Query the member from database to get coach_id from members table
    $memberId = $member->member_id ?? $member->id;
    $memberRecord = Member::find($memberId);
    
    // Get coach_id from members table - ensure it's null if 0 or empty (to satisfy foreign key constraint)
    $coachId = null;
    if ($memberRecord && isset($memberRecord->coach_id) && $memberRecord->coach_id > 0) {
        $coachId = $memberRecord->coach_id;
    }

    // Validate the request
    $validator = Validator::make($request->all(), [
        'exercise_name' => 'required|string|max:255',
        'category' => 'required|string|max:100',
        'duration' => 'required|string|max:100',
        'level' => 'required|string|max:100',
        'description' => 'required|string',
        'equipment' => 'nullable|string',
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
        'workout_days.*.activities.*.exercise_id' => 'required|integer|exists:video_catalog,id',
        'workout_days.*.activities.*.sets' => 'required|integer|min:1',
        'workout_days.*.activities.*.reps' => 'required|integer|min:1',
        'workout_days.*.activities.*.rest_seconds' => 'required|integer|min:0',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $validator->errors()
        ], 422);
    }

    // Handle thumbnail
    $thumbnailPath = null;
    if ($request->hasFile('thumbnail')) {
        $thumbnail = $request->file('thumbnail');
        $thumbnailName = time() . '_' . $thumbnail->getClientOriginalName();
        $uploadPath = public_path('images/workout_thumbnails');
        if (!file_exists($uploadPath)) {
            mkdir($uploadPath, 0755, true);
        }
        $thumbnail->move($uploadPath, $thumbnailName);
        $thumbnailPath = 'images/workout_thumbnails/' . $thumbnailName;
    } elseif ($request->thumbnail) {
        $thumbnailPath = $request->thumbnail;
    }

    DB::beginTransaction();

    try {
        // Create workout
        $workout = new Workout();
        $workout->gym_id = $member->gym_id ?? 1;
        $workout->member_id = $member->id;
        $workout->coach_id = $coachId; // Add coach_id from members table
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

        // Create workout days and activities
        // CRITICAL: Ensure each day has its own separate activities array
        if (!empty($request->workout_days) && is_array($request->workout_days)) {
            // Track processed days to prevent duplicates
            $processedDays = [];
            
            foreach ($request->workout_days as $dayIndex => $dayData) {
                // Validate day data structure
                if (empty($dayData['day']) || !is_string($dayData['day'])) {
                    \Log::warning("Invalid day data at index {$dayIndex}", ['dayData' => $dayData]);
                    continue;
                }
                
                $dayName = trim($dayData['day']);
                
                // Validate day name
                $validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                if (!in_array($dayName, $validDays)) {
                    \Log::warning("Invalid day name: {$dayName} at index {$dayIndex}");
                    continue;
                }
                
                // CRITICAL: Skip if this day was already processed (prevent duplicates)
                if (isset($processedDays[$dayName])) {
                    \Log::warning("Duplicate day detected: {$dayName}. Skipping duplicate entry.");
                    continue;
                }
                
                // Validate activities array exists and is not empty
                if (empty($dayData['activities']) || !is_array($dayData['activities'])) {
                    \Log::warning("No activities found for day: {$dayName}");
                    continue;
                }
                
                // Create workout day record
                $workoutDay = WorkoutDay::create([
                    'workout_id' => $workout->id,
                    'day' => $dayName
                ]);
                
                // Mark this day as processed
                $processedDays[$dayName] = $workoutDay->id;
                
                // CRITICAL: Process activities ONLY for this specific day
                foreach ($dayData['activities'] as $activityIndex => $activityData) {
                    // Validate activity data
                    if (empty($activityData['exercise_id'])) {
                        \Log::warning("Missing exercise_id for day {$dayName}, activity index {$activityIndex}");
                        continue;
                    }
                    
                    $exercise = VideoCatalog::find($activityData['exercise_id']);
                    if (!$exercise) {
                        \Log::warning("Exercise not found: {$activityData['exercise_id']} for day {$dayName}");
                        continue;
                    }
                    
                    // CRITICAL: Ensure activity is created with the correct day_id and day name
                    // This ensures activities are strictly tied to their specific day
                    WorkoutActivityPlan::create([
                        'workout_id' => $workout->id,
                        'day' => $dayName, // Explicitly set day name
                        'day_id' => $workoutDay->id, // CRITICAL: Link to specific day record
                        'exercise_id' => $exercise->id,
                        'exercise_name' => $exercise->name,
                        'sets' => $activityData['sets'] ?? 3,
                        'reps' => $activityData['reps'] ?? 12,
                        'rest_seconds' => $activityData['rest_seconds'] ?? 60,
                        'thumbnail' => $exercise->thumbnail_url,
                        'video_link' => !empty($exercise->video_url) 
                                        ? $exercise->video_url 
                                        : (!empty($exercise->relative_path) ? asset($exercise->relative_path) : null),
                        'description' => $exercise->description,
                        'duration' => $exercise->duration,
                        'tags' => $exercise->tags,
                    ]);
                }
                
                // Log for debugging
                \Log::info("Created workout day: {$dayName} with " . count($dayData['activities']) . " activities", [
                    'workout_id' => $workout->id,
                    'day_id' => $workoutDay->id,
                    'day_name' => $dayName
                ]);
            }
        }

        // Create workout assignment for the member who created the workout
        // Use the member record we already fetched earlier
        if ($memberRecord) {
            // Check if assignment already exists (shouldn't happen, but safety check)
            $existingAssignment = WorkoutAssignment::where('member_id', $memberRecord->id)
                ->where('workout_id', $workout->id)
                ->whereNull('deleted_at')
                ->first();

            if (!$existingAssignment) {
                // Create new workout assignment using only the original fields
                WorkoutAssignment::create([
                    'member_id' => $memberRecord->id,
                    'workout_id' => $workout->id,
                    'gym_id' => $member->gym_id ?? 1,
                    'start_date' => now()->format('Y-m-d'), // Start from today
                    'description' => $workout->description ?? '',
                    'assigned_by' => null, // Self-assigned, no assigned_by
                ]);
                
                \Log::info("Created workout assignment for member {$memberRecord->id} and workout {$workout->id}");
            }
        }

        DB::commit();

        // Return workout with details
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
                'thumbnail' => $workout->thumbnail ? asset($workout->thumbnail) : null,
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

    /**
     * Get a single member-created workout by id (for edit).
     * Only returns workout if member_id matches authenticated member.
     */
    public function showMemberWorkout(Request $request, $id)
    {
        try {
            $member = $request->get('auth_member');
            $workout = Workout::where('id', $id)
                ->where('member_id', $member->id)
                ->whereNull('deleted_at')
                ->with(['workoutDays.workoutActivityPlans.exercise'])
                ->first();

            if (!$workout) {
                return response()->json([
                    'success' => false,
                    'message' => 'Workout not found or you do not have permission to view it',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $workout,
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Show member workout error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update a member-created workout.
     */
    public function updateMemberWorkout(Request $request, $id)
    {
        try {
            $member = $request->get('auth_member');
            $workout = Workout::where('id', $id)
                ->where('member_id', $member->id)
                ->whereNull('deleted_at')
                ->first();

            if (!$workout) {
                return response()->json([
                    'success' => false,
                    'message' => 'Workout not found or you do not have permission to edit it',
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'exercise_name' => 'required|string|max:255',
                'category' => 'required|string|max:100',
                'duration' => 'required|string|max:100',
                'level' => 'required|string|max:100',
                'description' => 'required|string',
                'equipment' => 'nullable|string',
                'thumbnail' => 'nullable|string',
                'workout_days' => 'nullable|array',
                'workout_days.*.day' => 'required_with:workout_days|string|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
                'workout_days.*.activities' => 'required_with:workout_days|array|min:1',
                'workout_days.*.activities.*.exercise_id' => 'required|integer|exists:video_catalog,id',
                'workout_days.*.activities.*.sets' => 'required|integer|min:1',
                'workout_days.*.activities.*.reps' => 'required|integer|min:1',
                'workout_days.*.activities.*.rest_seconds' => 'required|integer|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            DB::beginTransaction();

            $workout->exercise_name = $request->exercise_name;
            $workout->category = $request->category;
            $workout->duration = $request->duration;
            $workout->level = $request->level;
            $workout->description = $request->description;
            $workout->equipment = $request->equipment ?? $workout->equipment;
            if ($request->has('thumbnail') && $request->thumbnail) {
                $workout->thumbnail = $request->thumbnail;
            }
            $workout->save();

            // Replace workout days and activities
            WorkoutDay::where('workout_id', $workout->id)->delete();
            WorkoutActivityPlan::where('workout_id', $workout->id)->delete();

            if (!empty($request->workout_days) && is_array($request->workout_days)) {
                $processedDays = [];
                foreach ($request->workout_days as $dayIndex => $dayData) {
                    if (empty($dayData['day']) || !is_string($dayData['day'])) continue;
                    $dayName = trim($dayData['day']);
                    $validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                    if (!in_array($dayName, $validDays)) continue;
                    if (isset($processedDays[$dayName])) continue;
                    if (empty($dayData['activities']) || !is_array($dayData['activities'])) continue;

                    $workoutDay = WorkoutDay::create([
                        'workout_id' => $workout->id,
                        'day' => $dayName
                    ]);
                    $processedDays[$dayName] = $workoutDay->id;

                    foreach ($dayData['activities'] as $activityIndex => $activityData) {
                        if (empty($activityData['exercise_id'])) continue;
                        $exercise = VideoCatalog::find($activityData['exercise_id']);
                        if (!$exercise) continue;
                        WorkoutActivityPlan::create([
                            'workout_id' => $workout->id,
                            'day' => $dayName,
                            'day_id' => $workoutDay->id,
                            'exercise_id' => $exercise->id,
                            'exercise_name' => $exercise->name,
                            'sets' => $activityData['sets'] ?? 3,
                            'reps' => $activityData['reps'] ?? 12,
                            'rest_seconds' => $activityData['rest_seconds'] ?? 60,
                            'thumbnail' => $exercise->thumbnail_url,
                            'video_link' => !empty($exercise->video_url) ? $exercise->video_url : (!empty($exercise->relative_path) ? asset($exercise->relative_path) : null),
                            'description' => $exercise->description,
                            'duration' => $exercise->duration,
                            'tags' => $exercise->tags,
                        ]);
                    }
                }
            }

            DB::commit();
            $workout->load(['workoutDays.workoutActivityPlans.exercise']);

            return response()->json([
                'success' => true,
                'message' => 'Workout updated successfully',
                'data' => $workout,
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Update member workout error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update workout: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a member-created workout (soft delete).
     */
    public function destroyMemberWorkout(Request $request, $id)
    {
        try {
            $member = $request->get('auth_member');
            $workout = Workout::where('id', $id)
                ->where('member_id', $member->id)
                ->whereNull('deleted_at')
                ->first();

            if (!$workout) {
                return response()->json([
                    'success' => false,
                    'message' => 'Workout not found or you do not have permission to delete it',
                ], 404);
            }

            $workout->deleted_at = now();
            $workout->save();

            return response()->json([
                'success' => true,
                'message' => 'Workout deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Delete member workout error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete workout: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all workouts that belong to this member (from MobileWorkoutController)
     * Supports advanced filtering: goals, duration, equipment, levels, workout types
     */
    public function getMemberWorkouts(Request $request)
    {
        try {
            $member = $request->get('auth_member');
    
            // Advanced filter parameters (from frontend filter modal)
            $goals = $request->get('goals', []);
            $durations = $request->get('durations', []);
            $equipments = $request->get('equipments', []);
            $levels = $request->get('levels', []);
            $workoutTypes = $request->get('workout_types', []);
            $search = $request->get('search');
            
            // Convert string inputs to arrays if needed
            if (is_string($goals)) $goals = json_decode($goals, true) ?? [];
            if (is_string($durations)) $durations = json_decode($durations, true) ?? [];
            if (is_string($equipments)) $equipments = json_decode($equipments, true) ?? [];
            if (is_string($levels)) $levels = json_decode($levels, true) ?? [];
            if (is_string($workoutTypes)) $workoutTypes = json_decode($workoutTypes, true) ?? [];
    
            // Build query for workouts that belong to this member
            $query = Workout::where('member_id', $member->id)
                ->whereNull('deleted_at')
                ->with(['workoutDays.workoutActivityPlans.exercise']);
            
            // Filter by Goals
            if (!empty($goals)) {
                $query->where(function($q) use ($goals) {
                    foreach ($goals as $goal) {
                        $goalLower = strtolower($goal);
                        $q->orWhere(function($subQ) use ($goalLower, $goal) {
                            $subQ->where('tags', 'like', '%' . $goal . '%')
                                ->orWhere('description', 'like', '%' . $goal . '%')
                                ->orWhere('exercise_name', 'like', '%' . $goal . '%');
                            
                            if (strpos($goalLower, 'lose weight') !== false || strpos($goalLower, 'weight loss') !== false) {
                                $subQ->orWhere('tags', 'like', '%weight%')
                                    ->orWhere('tags', 'like', '%lose%');
                            }
                            if (strpos($goalLower, 'build muscle') !== false || strpos($goalLower, 'muscle') !== false) {
                                $subQ->orWhere('tags', 'like', '%muscle%')
                                    ->orWhere('tags', 'like', '%build%')
                                    ->orWhere('muscles_targeted', 'like', '%muscle%');
                            }
                            if (strpos($goalLower, 'well-being') !== false || strpos($goalLower, 'wellbeing') !== false) {
                                $subQ->orWhere('tags', 'like', '%well%')
                                    ->orWhere('tags', 'like', '%being%');
                            }
                            if (strpos($goalLower, 'performance') !== false) {
                                $subQ->orWhere('tags', 'like', '%performance%');
                            }
                            if (strpos($goalLower, 'fit') !== false) {
                                $subQ->orWhere('tags', 'like', '%fit%');
                            }
                            if (strpos($goalLower, 'tone') !== false || strpos($goalLower, 'shape') !== false) {
                                $subQ->orWhere('tags', 'like', '%tone%')
                                    ->orWhere('tags', 'like', '%shape%');
                            }
                        });
                    }
                });
            }
            
            // Filter by Duration (Any duration, < 20 minutes, 20 - 40 minutes, > 40 minutes, Multi-day workout plan)
            if (!empty($durations)) {
                $query->where(function($q) use ($durations) {
                    foreach ($durations as $duration) {
                        $durationLower = strtolower(trim($duration));
                        $q->orWhere(function($subQ) use ($durationLower, $duration) {
                            // "Any duration" - show all (no filter applied)
                            if ($durationLower === 'any duration') {
                                $subQ->whereRaw('1 = 1'); // Always true - no filter
                            }
                            // "< 20 minutes" - duration less than 20
                            elseif ($durationLower === '< 20 minutes' || $durationLower === '<20 minutes') {
                                $subQ->where(function($durQ) {
                                    for ($i = 0; $i < 20; $i++) {
                                        $durQ->orWhere('duration', 'like', '%' . $i . '%');
                                    }
                                });
                            }
                            // "20 - 40 minutes" - duration between 20 and 40
                            elseif (preg_match('/20\s*-\s*40\s*min/i', $duration)) {
                                $subQ->where(function($durQ) {
                                    for ($i = 20; $i <= 40; $i++) {
                                        $durQ->orWhere('duration', 'like', '%' . $i . '%');
                                    }
                                });
                            }
                            // "> 40 minutes" - duration greater than 40
                            elseif ($durationLower === '> 40 minutes' || $durationLower === '>40 minutes') {
                                $subQ->where(function($durQ) {
                                    for ($i = 41; $i <= 180; $i += 1) {
                                        $durQ->orWhere('duration', 'like', '%' . $i . '%');
                                    }
                                });
                            }
                            // "Multi-day workout plan" - workouts with multiple days
                            elseif ($durationLower === 'multi-day workout plan' || $durationLower === 'multi-day') {
                                $subQ->whereRaw('(SELECT COUNT(*) FROM workout_days WHERE workout_days.workout_id = workouts.id AND workout_days.deleted_at IS NULL) >= 2');
                            }
                        });
                    }
                });
            }
            
            // Filter by Equipment
            if (!empty($equipments)) {
                $query->where(function($q) use ($equipments) {
                    foreach ($equipments as $equipment) {
                        $equipmentLower = strtolower($equipment);
                        $q->orWhere(function($subQ) use ($equipmentLower, $equipment) {
                            if ($equipmentLower === 'no equipment' || $equipmentLower === 'bodyweight') {
                                $subQ->where(function($eqQ) {
                                    $eqQ->whereNull('equipment')
                                        ->orWhere('equipment', '')
                                        ->orWhere('equipment', 'like', '%no equipment%')
                                        ->orWhere('equipment', 'like', '%bodyweight%')
                                        ->orWhere('equipment', 'like', '%none%');
                                });
                            } else {
                                $subQ->where('equipment', 'like', '%' . $equipment . '%');
                            }
                        });
                    }
                });
            }
            
            // Filter by Levels
            if (!empty($levels)) {
                $query->where(function($q) use ($levels) {
                    foreach ($levels as $level) {
                        $q->orWhere(function($subQ) use ($level) {
                            $levelLower = strtolower($level);
                            $subQ->where('level', 'like', '%' . $level . '%');
                            
                            // Map level names to difficulty ranges
                            if ($levelLower === 'beginner') {
                                $subQ->orWhereBetween('difficulty', [1, 3]);
                            } elseif ($levelLower === 'intermediate') {
                                $subQ->orWhereBetween('difficulty', [4, 6]);
                            } elseif ($levelLower === 'advanced') {
                                $subQ->orWhereBetween('difficulty', [7, 8]);
                            } elseif ($levelLower === 'expert') {
                                $subQ->orWhereBetween('difficulty', [9, 10]);
                            }
                        });
                    }
                });
            }
            
            // Filter by Workout Types
            if (!empty($workoutTypes)) {
                $query->where(function($q) use ($workoutTypes) {
                    foreach ($workoutTypes as $workoutType) {
                        $typeLower = strtolower($workoutType);
                        $q->orWhere(function($subQ) use ($typeLower, $workoutType) {
                            $subQ->where('category', 'like', '%' . $workoutType . '%')
                                ->orWhere('type', 'like', '%' . $workoutType . '%')
                                ->orWhere('tags', 'like', '%' . $workoutType . '%');
                            
                            if ($typeLower === 'strength') {
                                $subQ->orWhere('category', 'like', '%weight%')
                                    ->orWhere('category', 'like', '%muscle%');
                            }
                            if ($typeLower === 'cardio') {
                                $subQ->orWhere('category', 'like', '%aerobic%')
                                    ->orWhere('category', 'like', '%endurance%');
                            }
                            if ($typeLower === 'hiit') {
                                $subQ->orWhere('category', 'like', '%high intensity%')
                                    ->orWhere('category', 'like', '%interval%');
                            }
                            if ($typeLower === 'stretching') {
                                $subQ->orWhere('category', 'like', '%flexibility%')
                                    ->orWhere('category', 'like', '%stretch%');
                            }
                        });
                    }
                });
            }
            
            // Search filter
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
    
            // Get filtered workouts
            $workouts = $query->get();
    
            // Transform workouts to include full thumbnail URLs
            $transformedWorkouts = $workouts->map(function ($workout) {
                $workoutArray = $workout->toArray();
                // Convert thumbnail path to full URL
                if (!empty($workoutArray['thumbnail'])) {
                    $workoutArray['thumbnail'] = asset($workoutArray['thumbnail']);
                }
                return $workoutArray;
            });
    
            return response()->json([
                'success' => true,
                'data' => $transformedWorkouts
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
     * Get specific workout assignment details (from MobileWorkoutController)
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
     * Start a workout assignment session (from MobileWorkoutController)
     * Renamed from startWorkout to avoid conflict with existing startWorkout method
     */
    public function startAssignmentWorkout(Request $request, $id)
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
     * Complete a workout assignment session (from MobileWorkoutController)
     * Renamed from completeWorkout to avoid conflict with existing completeWorkout method
     */
    public function completeAssignmentWorkout(Request $request, $id)
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
     * Get workout statistics (from MobileWorkoutController)
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
     * Get available exercises for creating workouts (from MobileWorkoutController)
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
     * Get workout creation metadata (categories, levels, etc.) (from MobileWorkoutController)
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

    /**
     * Get all workouts available in the gym (from MobileWorkoutController)
     * Supports advanced filtering: goals, duration, equipment, levels, workout types, and creator
     */
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
            
            // Advanced filter parameters (from frontend filter modal)
            $goals = $request->get('goals', []); // Array of goal strings
            $durations = $request->get('durations', []); // Array of duration strings
            $equipments = $request->get('equipments', []); // Array of equipment strings
            $levels = $request->get('levels', []); // Array of level strings
            $workoutTypes = $request->get('workout_types', []); // Array of workout type strings
            $creators = $request->get('creators', []); // Array: ['My Workouts', 'Assigned Workouts', 'All Workouts']
            
            // Convert string inputs to arrays if needed (for backward compatibility)
            if (is_string($goals)) $goals = json_decode($goals, true) ?? [];
            if (is_string($durations)) $durations = json_decode($durations, true) ?? [];
            if (is_string($equipments)) $equipments = json_decode($equipments, true) ?? [];
            if (is_string($levels)) $levels = json_decode($levels, true) ?? [];
            if (is_string($workoutTypes)) $workoutTypes = json_decode($workoutTypes, true) ?? [];
            if (is_string($creators)) $creators = json_decode($creators, true) ?? [];
            
            // Build query for workouts in the member's gym
            $query = Workout::where('gym_id', $member->gym_id ?? 1)
                ->whereNull('deleted_at')
                ->with(['workoutDays.workoutActivityPlans.exercise']);
            
            // Filter by Creator (My Workouts, Assigned Workouts, All Workouts)
            // Note: "All" means show all workouts (no filter), "Created by me" means only member's workouts
            if (!empty($creators)) {
                // If "All Workouts" is selected, don't apply creator filter (show all)
                // Otherwise, filter by selected creator options
                if (!in_array('All Workouts', $creators)) {
                    $query->where(function($q) use ($creators, $member) {
                        $hasMyWorkouts = in_array('My Workouts', $creators);
                        $hasAssignedWorkouts = in_array('Assigned Workouts', $creators);
                        
                        $q->where(function($orQ) use ($hasMyWorkouts, $hasAssignedWorkouts, $member) {
                            if ($hasMyWorkouts) {
                                $orQ->orWhere('member_id', $member->id);
                            }
                            
                            if ($hasAssignedWorkouts) {
                                $orQ->orWhereHas('assignments', function($assignmentQ) use ($member) {
                                    $assignmentQ->where('member_id', $member->id)
                                        ->whereNull('deleted_at');
                                });
                            }
                        });
                    });
                }
                // If "All Workouts" is in the array, no filter is applied (shows all workouts)
            }
            
            // Filter by Goals (Lose Weight, Build Muscle, etc.)
            if (!empty($goals)) {
                $query->where(function($q) use ($goals) {
                    foreach ($goals as $goal) {
                        $goalLower = strtolower($goal);
                        $q->orWhere(function($subQ) use ($goalLower, $goal) {
                            // Check in tags, description, or exercise_name
                            $subQ->where('tags', 'like', '%' . $goal . '%')
                                ->orWhere('description', 'like', '%' . $goal . '%')
                                ->orWhere('exercise_name', 'like', '%' . $goal . '%');
                            
                            // Special handling for common goal variations
                            if (strpos($goalLower, 'lose weight') !== false || strpos($goalLower, 'weight loss') !== false) {
                                $subQ->orWhere('tags', 'like', '%weight%')
                                    ->orWhere('tags', 'like', '%lose%');
                            }
                            if (strpos($goalLower, 'build muscle') !== false || strpos($goalLower, 'muscle') !== false) {
                                $subQ->orWhere('tags', 'like', '%muscle%')
                                    ->orWhere('tags', 'like', '%build%')
                                    ->orWhere('muscles_targeted', 'like', '%muscle%');
                            }
                            if (strpos($goalLower, 'well-being') !== false || strpos($goalLower, 'wellbeing') !== false) {
                                $subQ->orWhere('tags', 'like', '%well%')
                                    ->orWhere('tags', 'like', '%being%');
                            }
                            if (strpos($goalLower, 'performance') !== false) {
                                $subQ->orWhere('tags', 'like', '%performance%');
                            }
                            if (strpos($goalLower, 'fit') !== false) {
                                $subQ->orWhere('tags', 'like', '%fit%');
                            }
                            if (strpos($goalLower, 'tone') !== false || strpos($goalLower, 'shape') !== false) {
                                $subQ->orWhere('tags', 'like', '%tone%')
                                    ->orWhere('tags', 'like', '%shape%');
                            }
                        });
                    }
                });
            }
            
            // Filter by Duration (Any duration, < 20 minutes, 20 - 40 minutes, > 40 minutes, Multi-day workout plan)
            if (!empty($durations)) {
                $query->where(function($q) use ($durations) {
                    foreach ($durations as $duration) {
                        $durationLower = strtolower(trim($duration));
                        $q->orWhere(function($subQ) use ($durationLower, $duration) {
                            // "Any duration" - show all (no filter applied)
                            if ($durationLower === 'any duration') {
                                $subQ->whereRaw('1 = 1'); // Always true - no filter
                            }
                            // "< 20 minutes" - duration less than 20
                            elseif ($durationLower === '< 20 minutes' || $durationLower === '<20 minutes') {
                                $subQ->where(function($durQ) {
                                    for ($i = 0; $i < 20; $i++) {
                                        $durQ->orWhere('duration', 'like', '%' . $i . '%');
                                    }
                                });
                            }
                            // "20 - 40 minutes" - duration between 20 and 40
                            elseif (preg_match('/20\s*-\s*40\s*min/i', $duration)) {
                                $subQ->where(function($durQ) {
                                    for ($i = 20; $i <= 40; $i++) {
                                        $durQ->orWhere('duration', 'like', '%' . $i . '%');
                                    }
                                });
                            }
                            // "> 40 minutes" - duration greater than 40
                            elseif ($durationLower === '> 40 minutes' || $durationLower === '>40 minutes') {
                                $subQ->where(function($durQ) {
                                    for ($i = 41; $i <= 180; $i += 1) {
                                        $durQ->orWhere('duration', 'like', '%' . $i . '%');
                                    }
                                });
                            }
                            // "Multi-day workout plan" - workouts with multiple days
                            elseif ($durationLower === 'multi-day workout plan' || $durationLower === 'multi-day') {
                                $subQ->whereRaw('(SELECT COUNT(*) FROM workout_days WHERE workout_days.workout_id = workouts.id AND workout_days.deleted_at IS NULL) >= 2');
                            }
                        });
                    }
                });
            }
            
            // Filter by Equipment
            if (!empty($equipments)) {
                $query->where(function($q) use ($equipments) {
                    foreach ($equipments as $equipment) {
                        $equipmentLower = strtolower($equipment);
                        $q->orWhere(function($subQ) use ($equipmentLower, $equipment) {
                            if ($equipmentLower === 'no equipment' || $equipmentLower === 'bodyweight') {
                                $subQ->where(function($eqQ) {
                                    $eqQ->whereNull('equipment')
                                        ->orWhere('equipment', '')
                                        ->orWhere('equipment', 'like', '%no equipment%')
                                        ->orWhere('equipment', 'like', '%bodyweight%')
                                        ->orWhere('equipment', 'like', '%none%');
                                });
                            } else {
                                $subQ->where('equipment', 'like', '%' . $equipment . '%');
                            }
                        });
                    }
                });
            }
            
            // Filter by Levels (Beginner, Intermediate, Advanced)
            if (!empty($levels)) {
                $query->where(function($q) use ($levels) {
                    foreach ($levels as $level) {
                        $q->orWhere(function($subQ) use ($level) {
                            $levelLower = strtolower($level);
                            $subQ->where('level', 'like', '%' . $level . '%');
                            
                            // Map level names to difficulty ranges
                            if ($levelLower === 'beginner') {
                                $subQ->orWhereBetween('difficulty', [1, 3]);
                            } elseif ($levelLower === 'intermediate') {
                                $subQ->orWhereBetween('difficulty', [4, 6]);
                            } elseif ($levelLower === 'advanced') {
                                $subQ->orWhereBetween('difficulty', [7, 8]);
                            } elseif ($levelLower === 'expert') {
                                $subQ->orWhereBetween('difficulty', [9, 10]);
                            }
                        });
                    }
                });
            }
            
            // Filter by Workout Types (Strength, Cardio, HIIT, Yoga, etc.)
            if (!empty($workoutTypes)) {
                $query->where(function($q) use ($workoutTypes) {
                    foreach ($workoutTypes as $workoutType) {
                        $typeLower = strtolower($workoutType);
                        $q->orWhere(function($subQ) use ($typeLower, $workoutType) {
                            $subQ->where('category', 'like', '%' . $workoutType . '%')
                                ->orWhere('type', 'like', '%' . $workoutType . '%')
                                ->orWhere('tags', 'like', '%' . $workoutType . '%');
                            
                            // Special handling for workout type variations
                            if ($typeLower === 'strength') {
                                $subQ->orWhere('category', 'like', '%weight%')
                                    ->orWhere('category', 'like', '%muscle%');
                            }
                            if ($typeLower === 'cardio') {
                                $subQ->orWhere('category', 'like', '%aerobic%')
                                    ->orWhere('category', 'like', '%endurance%');
                            }
                            if ($typeLower === 'hiit') {
                                $subQ->orWhere('category', 'like', '%high intensity%')
                                    ->orWhere('category', 'like', '%interval%');
                            }
                            if ($typeLower === 'stretching') {
                                $subQ->orWhere('category', 'like', '%flexibility%')
                                    ->orWhere('category', 'like', '%stretch%');
                            }
                        });
                    }
                });
            }
            
            // Legacy filters (for backward compatibility)
            if ($category) {
                $query->where('category', $category);
            }
            
            if ($level && empty($levels)) {
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
                    'thumbnail' => $workout->thumbnail ? asset($workout->thumbnail) : null,
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
     * 📅 Assign/Plan a workout to the logged-in member
     * Creates a WorkoutAssignment record that will appear in assigned workouts
     */
    public function assignWorkout(Request $request)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Get member record from members table
            $member = DB::table('members')->where('email', $user->email)->first();
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Validate the request
            $validator = Validator::make($request->all(), [
                'workout_id' => 'required|integer|exists:workouts,id',
                'start_date' => 'required|date|after_or_equal:today',
                'end_date' => 'required|date|after:start_date',
                'notes' => 'nullable|string|max:500',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $workoutId = $request->input('workout_id');
            $startDate = $request->input('start_date');
            $endDate = $request->input('end_date');
            $notes = $request->input('notes', '');

            // Check if workout exists and is not deleted
            $workout = Workout::where('id', $workoutId)
                ->whereNull('deleted_at')
                ->first();

            if (!$workout) {
                return response()->json([
                    'success' => false,
                    'message' => 'Workout not found or has been deleted',
                ], 404);
            }

            // Check if assignment already exists for this member and workout
            $existingAssignment = WorkoutAssignment::where('member_id', $member->id)
                ->where('workout_id', $workoutId)
                ->whereNull('deleted_at')
                ->first();

            if ($existingAssignment) {
                // Update existing assignment instead of creating duplicate
                $existingAssignment->update([
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                    'notes' => $notes,
                    'status' => 'active',
                    'assigned_at' => now(),
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Workout assignment updated successfully!',
                    'assignment' => $existingAssignment,
                ], 200);
            }

            // Create new workout assignment
            $assignment = WorkoutAssignment::create([
                'member_id' => $member->id,
                'workout_id' => $workoutId,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'notes' => $notes,
                'status' => 'active',
                'assigned_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Workout planned successfully! It will now appear in your assigned workouts.',
                'assignment' => $assignment,
            ], 201);

        } catch (\Exception $e) {
            \Log::error('Assign workout error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Log workout activity for tracking (from MobileWorkoutController)
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
