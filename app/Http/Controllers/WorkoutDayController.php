<?php

namespace App\Http\Controllers;

use App\Models\WorkoutDay;
use App\Models\Workout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WorkoutDayController extends Controller
{
    /**
     * Store workout days for a specific workout
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'workout_id' => 'required|integer|exists:workouts,id',
            'days' => 'required|array',
            'days.*' => 'required|string|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = $request->user('api');
        $gymId = $user ? $user->gym_id : null;
        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym',
            ], 400);
        }

        try {
            // Delete existing workout days for this workout
            WorkoutDay::where('workout_id', $request->workout_id)->delete();

            // Create new workout days with gym_id from the currently logged-in user
            $workoutDays = [];
            foreach ($request->days as $day) {
                $workoutDays[] = WorkoutDay::create([
                    'workout_id' => $request->workout_id,
                    'day' => $day,
                    'gym_id' => $gymId,
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Workout days saved successfully',
                'data' => $workoutDays
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save workout days',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get workout days for a specific workout
     */
    public function show($workoutId)
    {
        try {
            $workoutDays = WorkoutDay::where('workout_id', $workoutId)->get();
            
            return response()->json([
                'success' => true,
                'data' => $workoutDays
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve workout days',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete workout days for a specific workout
     */
    public function destroy($workoutId)
    {
        try {
            WorkoutDay::where('workout_id', $workoutId)->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Workout days deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete workout days',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 