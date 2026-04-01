<?php

namespace App\Http\Controllers;

use App\Models\ScheduleActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ScheduleActivityController extends Controller
{
    /**
     * List schedule activities for the authenticated user's gym.
     * Works for CRM (Passport) and Coach Mobile App (CoachMobileAuthMiddleware sets api user).
     */
    public function index(Request $request)
    {
        $user = $request->user('api');
        if (!$user || !$user->gym_id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 401);
        }

        $activities = ScheduleActivity::query()
            ->where('gym_id', $user->gym_id)
            ->orderBy('name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $activities,
        ]);
    }

    /**
     * Create a schedule activity for the authenticated user's gym.
     */
    public function store(Request $request)
    {
        $user = $request->user('api');
        if (!$user || !$user->gym_id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'visible_for' => 'nullable|string|max:50',
            'type' => 'nullable|string|max:50',
            'can_be_added_in_schedule' => 'nullable|boolean',
            'color' => 'nullable|string|max:7',
            'met' => 'nullable|numeric',
            'has_distance' => 'nullable|boolean',
            'default_duration_minutes' => 'nullable|integer|min:1|max:1440',
            'difficulty' => 'nullable|string|max:50',
            'instructions' => 'nullable|string',
            'tags' => 'nullable',
            'youtube_url_male' => 'nullable|string|max:255',
            'youtube_url_female' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $tags = $request->input('tags');
        if (is_string($tags)) {
            $tags = array_values(array_filter(array_map('trim', explode(',', $tags))));
        }

        $activity = ScheduleActivity::create([
            'gym_id' => $user->gym_id,
            'name' => $request->name,
            'category' => $request->category,
            'visible_for' => $request->visible_for ?? 'gym',
            'type' => $request->type ?? 'duration',
            'can_be_added_in_schedule' => $request->can_be_added_in_schedule ?? true,
            'color' => $request->color,
            'met' => $request->met,
            'has_distance' => $request->has_distance ?? false,
            'default_duration_minutes' => $request->default_duration_minutes,
            'difficulty' => $request->difficulty,
            'instructions' => $request->instructions,
            'tags' => $tags,
            'youtube_url_male' => $request->youtube_url_male,
            'youtube_url_female' => $request->youtube_url_female,
            'created_by' => $user->id ?? null,
        ]);

        return response()->json([
            'success' => true,
            'data' => $activity,
        ], 201);
    }
}


