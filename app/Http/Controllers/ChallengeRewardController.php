<?php

namespace App\Http\Controllers;

use App\Models\ChallengeReward;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChallengeRewardController extends Controller
{
    // Get all rewards
    public function index(Request $request)
    {
        // Get the current user (works with both Passport and Mobile auth)
        // Try multiple methods to get the authenticated user
        $user = $request->get('auth_user') 
            ?? $request->user('api') 
            ?? Auth::guard('api')->user() 
            ?? auth()->user() 
            ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        $gymId = $user->gym_id ?? null;
        
        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }

        $rewards = ChallengeReward::where('gym_id', $gymId)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $rewards
        ]);
    }

    // Store a new reward
    public function store(Request $request)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = Auth::guard('api')->user() 
            ?? $request->user('api') 
            ?? auth()->user() 
            ?? $request->get('auth_user') 
            ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        $gymId = $user->gym_id ?? null;
        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'points' => 'required|integer|min:1',
            'category' => 'required|string',
            'status' => 'required|in:Active,Inactive',
        ]);

        // Add gym_id to the data
        $data['gym_id'] = $gymId;

        $reward = ChallengeReward::create($data);

        return response()->json($reward, 201);
    }

    // Update an existing reward
    public function update(Request $request, ChallengeReward $reward)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = Auth::guard('api')->user() 
            ?? $request->user('api') 
            ?? auth()->user() 
            ?? $request->get('auth_user') 
            ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        $gymId = $user->gym_id ?? null;
        
        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }

        // Check if the reward belongs to the user's gym
        if ($reward->gym_id !== $gymId) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to modify this reward'
            ], 403);
        }

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'points' => 'required|integer|min:1',
            'category' => 'required|string',
            'status' => 'required|in:Active,Inactive',
        ]);

        $reward->update($data);

        return response()->json([
            'success' => true,
            'data' => $reward
        ]);
    }

    // Delete a reward
    public function destroy(Request $request, ChallengeReward $reward)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = Auth::guard('api')->user() 
            ?? $request->user('api') 
            ?? auth()->user() 
            ?? $request->get('auth_user') 
            ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        $gymId = $user->gym_id ?? null;
        
        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }

        // Check if the reward belongs to the user's gym
        if ($reward->gym_id !== $gymId) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to delete this reward'
            ], 403);
        }

        $reward->delete();

        return response()->json([
            'success' => true,
            'message' => 'Reward deleted successfully'
        ]);
    }

    // Show a specific reward
    public function show(Request $request, ChallengeReward $reward)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = Auth::guard('api')->user() 
            ?? $request->user('api') 
            ?? auth()->user() 
            ?? $request->get('auth_user') 
            ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        $gymId = $user->gym_id ?? null;
        
        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }

        // Check if the reward belongs to the user's gym
        if ($reward->gym_id !== $gymId) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to view this reward'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $reward
        ]);
    }
}
