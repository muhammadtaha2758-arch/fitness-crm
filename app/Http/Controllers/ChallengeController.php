<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use App\Models\ChallengeParticipant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChallengeController extends Controller
{
    public function index(Request $request)
    {
        // Get the current user (works with both Passport and Mobile auth)
        // Try multiple methods to get the authenticated user
        $user = Auth::guard('api')->user() 
            ?? $request->user('api') 
            ?? auth()->user() 
            ?? $request->get('auth_user') 
            ?? $request->get('auth_member');
        
        if (!$user) {
            // If middleware should have authenticated but user is still null,
            // this might indicate middleware didn't run or failed silently
            if (config('app.debug')) {
                \Log::warning('ChallengeController@index: No user found after middleware', [
                    'auth_guard_user' => Auth::guard('api')->user() ? 'exists' : 'null',
                    'request_user' => $request->user('api') ? 'exists' : 'null',
                    'auth_user' => auth()->user() ? 'exists' : 'null',
                    'auth_user_param' => $request->get('auth_user') ? 'exists' : 'null',
                    'auth_member_param' => $request->get('auth_member') ? 'exists' : 'null',
                    'has_auth_header' => $request->hasHeader('Authorization'),
                    'middleware_applied' => $request->has('auth_user') || $request->has('auth_member'),
                ]);
            }
            
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

        // Determine if user is a coach or admin/staff
        $isCoach = false;
        $isAdmin = false;
        $coachId = null;
        
        // Check if user is an admin/staff (role_id == 1 typically means Owner/Admin)
        if (isset($user->role_id) && $user->role_id == 1) {
            $isAdmin = true;
        }
        
        if ($user->role_id == 3) {
            // User is a coach - find coach record
            $coach = \App\Models\Coach::where('email', $user->email)->where('gym_id', $gymId)->first();
            if ($coach) {
                $isCoach = true;
                $coachId = $coach->id;
            }
        }

        // Get all challenges for the gym
        $query = Challenge::with('reward')
            ->withCount('participants')
            ->where('gym_id', $gymId);
        
        // Check if coach_id column exists in the challenges table
        $hasCoachIdColumn = \Illuminate\Support\Facades\Schema::hasColumn('challenges', 'coach_id');
        
        // Apply filtering based on user role
        if ($hasCoachIdColumn) {
            if ($isAdmin) {
                // Admins/staff see ALL challenges for the gym (no filtering by coach_id)
                // No additional where clause needed - show all challenges
            } elseif ($isCoach && $coachId) {
                // Coaches see:
                // 1. Public challenges (coach_id is null) - visible to everyone
                // 2. Challenges created by this coach (coach_id = current coach)
                $query->where(function($q) use ($coachId) {
                    $q->whereNull('coach_id')
                      ->orWhere('coach_id', $coachId);
                });
            } else {
                // Other users (non-coach, non-admin) see only public challenges
                $query->whereNull('coach_id');
            }
        }
        // If coach_id column doesn't exist, show all challenges (backward compatibility)
        
        $challenges = $query->orderBy('created_at', 'desc')->get();
        
        return $challenges;
    }

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
            'goal' => 'required|string',
            'reward_id' => 'required|exists:challenges_rewards,id',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'participation_fee' => 'required|numeric|min:0',
            'rules' => 'required|string',
            'allow_enrollment' => 'boolean',
            'max_participants' => 'nullable|integer|min:1',
            'status' => 'required|in:Active,Inactive'
        ]);

        // Determine if user is a coach and get coach_id
        $coachId = null;
        if ($user->role_id == 3) {
            // User is a coach - find coach record
            $coach = \App\Models\Coach::where('email', $user->email)->where('gym_id', $gymId)->first();
            if ($coach) {
                $coachId = $coach->id;
            }
        }
        
        // If coach_id is provided in request (for coach-created challenges), use it
        // Otherwise, if user is a coach, set coach_id
        if ($request->has('coach_id') && $request->coach_id) {
            $data['coach_id'] = $request->coach_id;
        } else if ($coachId) {
            $data['coach_id'] = $coachId;
        }
        // If coach_id is not set, challenge will be public (coach_id = null)

        // Calculate duration in days based on start_date and end_date
        $startDate = \Carbon\Carbon::parse($data['start_date']);
        $endDate = \Carbon\Carbon::parse($data['end_date']);
        $data['duration'] = $startDate->diffInDays($endDate) + 1; // +1 to include both start and end dates
        $data['gym_id'] = $gymId;

        $challenge = Challenge::create($data);
        $challenge->load('reward');

        // Create notifications for challenge creation
        try {
            $coach = null;
            if ($coachId) {
                $coach = \App\Models\Coach::find($coachId);
            }
            
            // Get performedByUserId if current user is an admin
            $performedByUserId = null;
            if ($user && isset($user->role_id) && $user->role_id == 1) {
                $performedByUserId = $user->id;
            }
            
            \App\Services\NotificationService::challengeCreated($challenge, $gymId, $coach, $performedByUserId);
        } catch (\Exception $e) {
            \Log::error('Failed to create challenge creation notifications: ' . $e->getMessage(), [
                'challenge_id' => $challenge->id,
                'trace' => $e->getTraceAsString()
            ]);
        }

        return response()->json($challenge, 201);
    }

    public function show(Challenge $challenge)
    {
        $challenge->load('reward');
        return $challenge;
    }

    public function update(Request $request, Challenge $challenge)
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
        
        // Ensure the challenge belongs to the user's gym
        if ($challenge->gym_id !== $gymId) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to modify this challenge'
            ], 403);
        }
        
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'goal' => 'required|string',
            'reward_id' => 'required|exists:challenges_rewards,id',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'participation_fee' => 'required|numeric|min:0',
            'rules' => 'required|string',
            'allow_enrollment' => 'boolean',
            'max_participants' => 'nullable|integer|min:1',
            'status' => 'required|in:Active,Inactive'
        ]);

        // Calculate duration in days based on start_date and end_date
        $startDate = \Carbon\Carbon::parse($data['start_date']);
        $endDate = \Carbon\Carbon::parse($data['end_date']);
        $data['duration'] = $startDate->diffInDays($endDate) + 1; // +1 to include both start and end dates

        $challenge->update($data);
        $challenge->load('reward');

        return response()->json($challenge);
    }

    public function destroy(Request $request, Challenge $challenge)
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

        // Ensure the challenge belongs to the user's gym
        if ($challenge->gym_id !== $gymId) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to delete this challenge'
            ], 403);
        }

        $challenge->delete();
        return response()->json([
            'success' => true,
            'message' => 'Challenge deleted successfully.'
        ]);
    }

    /**
     * Get challenges for a specific member
     */
    public function getMemberChallenges($memberId)
    {
        try {
            \Log::info("Fetching challenges for member ID: " . $memberId);
            
            $challenges = ChallengeParticipant::with(['challenge.reward', 'member'])
                ->where('member_id', $memberId)
                ->orderBy('last_activity', 'desc')
                ->get();

            \Log::info("Found " . $challenges->count() . " challenge participations");

            $formattedChallenges = $challenges->map(function ($participation) {
                $challenge = $participation->challenge;
                return [
                    'id' => $participation->id,
                    'challenge_id' => $challenge->id,
                    'challenge_name' => $challenge->name,
                    'challenge_description' => $challenge->description,
                    'challenge_goal' => $challenge->goal,
                    'challenge_duration' => $challenge->duration,
                    'start_date' => $challenge->start_date,
                    'end_date' => $challenge->end_date,
                    'participation_fee' => $challenge->participation_fee,
                    'rules' => $challenge->rules,
                    'max_participants' => $challenge->max_participants,
                    'challenge_status' => $challenge->status,
                    'progress' => $participation->progress,
                    'status' => $participation->status,
                    'last_activity' => $participation->last_activity,
                    'reward_name' => $challenge->reward ? $challenge->reward->name : 'No Reward',
                    'reward_description' => $challenge->reward ? $challenge->reward->description : '',
                    'created_at' => $participation->created_at,
                    'updated_at' => $participation->updated_at,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $formattedChallenges,
                'message' => 'Challenges fetched successfully'
            ]);

        } catch (\Exception $e) {
            \Log::error("Error fetching challenges: " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch challenges',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}