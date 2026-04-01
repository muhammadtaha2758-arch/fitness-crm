<?php

namespace App\Http\Controllers\Mobile\coach;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\HandlesApiErrors;
use App\Models\Challenge;
use App\Models\ChallengeParticipant;
use App\Models\Coach;
use App\Models\CoachAssignment;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Throwable;

class MobileChallengeController extends Controller
{
    use HandlesApiErrors;
    /**
     * Get all challenges for the coach's gym
     * Shows public challenges and challenges created by the coach
     */
    public function index(Request $request)
    {
        $user = null;
        $gymId = null;
        
        try {
            $user = $request->get('auth_user');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            $gymId = $user->gym_id ?? null;

            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            // Find the coach record
            $coach = Coach::where('email', $user->email)->where('gym_id', $gymId)->first();
            $coachId = $coach ? $coach->id : null;

            // Get challenges for the gym
            // Check if coach_id column exists in the challenges table
            $hasCoachIdColumn = \Illuminate\Support\Facades\Schema::hasColumn('challenges', 'coach_id');
            
            $query = Challenge::with('reward')
                ->withCount('participants')
                ->where('gym_id', $gymId);
            
            // Only filter by coach_id if the column exists
            if ($hasCoachIdColumn) {
                // 1. Public challenges (coach_id is null) - visible to everyone
                // 2. Challenges created by this coach (coach_id = current coach)
                $query->where(function($q) use ($coachId) {
                    // Public challenges (no coach_id)
                    $q->whereNull('coach_id');
                    
                    // If coach exists, also show challenges they created
                    if ($coachId) {
                        $q->orWhere('coach_id', $coachId);
                    }
                });
            }

            $challenges = $query->orderBy('created_at', 'desc')->get();

            // Transform challenges for mobile app
            $transformedChallenges = $challenges->map(function ($challenge) {
                $currentDate = Carbon::now();
                $status = 'available';
                
                // Safely parse dates
                if ($challenge->start_date && $challenge->end_date) {
                    try {
                        $startDate = Carbon::parse($challenge->start_date);
                        $endDate = Carbon::parse($challenge->end_date);
                        
                        if ($currentDate < $startDate) {
                            $status = 'upcoming';
                        } elseif ($currentDate > $endDate) {
                            $status = 'ended';
                        }
                    } catch (\Exception $e) {
                        // If date parsing fails, keep default status
                        Log::warning('Failed to parse challenge dates', [
                            'challenge_id' => $challenge->id,
                            'start_date' => $challenge->start_date,
                            'end_date' => $challenge->end_date,
                            'error' => $e->getMessage()
                        ]);
                    }
                }

                return [
                    'id' => $challenge->id ?? null,
                    'name' => $challenge->name ?? '',
                    'description' => $challenge->description ?? '',
                    'goal' => $challenge->goal ?? '',
                    'duration' => $challenge->duration ?? 0,
                    'start_date' => $challenge->start_date ?? null,
                    'end_date' => $challenge->end_date ?? null,
                    'participation_fee' => $challenge->participation_fee ?? 0,
                    'rules' => $challenge->rules ?? '',
                    'max_participants' => $challenge->max_participants ?? null,
                    'allow_enrollment' => $challenge->allow_enrollment ?? false,
                    'status' => $challenge->status ?? 'Inactive',
                    'challenge_status' => $status, // computed status (upcoming/available/ended)
                    'participants_count' => $challenge->participants_count ?? 0,
                    'coach_id' => $challenge->coach_id ?? null,
                    'is_public' => ($challenge->coach_id ?? null) === null,
                    'reward' => $challenge->reward ? [
                        'id' => $challenge->reward->id ?? null,
                        'name' => $challenge->reward->name ?? '',
                        'description' => $challenge->reward->description ?? '',
                        'points' => $challenge->reward->points ?? 0,
                        'category' => $challenge->reward->category ?? null,
                    ] : null,
                    'created_at' => $challenge->created_at ? $challenge->created_at->format('Y-m-d H:i:s') : null,
                    'updated_at' => $challenge->updated_at ? $challenge->updated_at->format('Y-m-d H:i:s') : null
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedChallenges,
                'message' => 'Challenges fetched successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('MobileChallengeController@index error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'user_id' => $user->id ?? null,
                'gym_id' => $gymId ?? null
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch challenges',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get challenge by ID
     */
    public function show(Request $request, $id)
    {
        try {
            $user = $request->get('auth_user');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            $gymId = $user->gym_id ?? null;

            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            $challenge = Challenge::with('reward')
                ->withCount('participants')
                ->where('gym_id', $gymId)
                ->find($id);

            if (!$challenge) {
                return response()->json([
                    'success' => false,
                    'message' => 'Challenge not found'
                ], 404);
            }

            // Get participants for this challenge
            $participants = ChallengeParticipant::with('member')
                ->where('challenge_id', $id)
                ->orderBy('progress', 'desc')
                ->get();

            $currentDate = Carbon::now();
            $startDate = Carbon::parse($challenge->start_date);
            $endDate = Carbon::parse($challenge->end_date);

            $status = 'available';
            if ($currentDate < $startDate) {
                $status = 'upcoming';
            } elseif ($currentDate > $endDate) {
                $status = 'ended';
            }

            $transformedChallenge = [
                'id' => $challenge->id,
                'name' => $challenge->name,
                'description' => $challenge->description,
                'goal' => $challenge->goal,
                'duration' => $challenge->duration,
                'start_date' => $challenge->start_date,
                'end_date' => $challenge->end_date,
                'participation_fee' => $challenge->participation_fee,
                'rules' => $challenge->rules,
                'max_participants' => $challenge->max_participants,
                'allow_enrollment' => $challenge->allow_enrollment,
                'status' => $challenge->status,
                'challenge_status' => $status,
                'participants_count' => $challenge->participants_count ?? 0,
                'coach_id' => $challenge->coach_id ?? null,
                'is_public' => ($challenge->coach_id ?? null) === null,
                'challenge_type' => $challenge->challenge_type ?? 'workout_based',
                'required_workouts' => $challenge->required_workouts ?? null,
                'reward' => $challenge->reward ? [
                    'id' => $challenge->reward->id,
                    'name' => $challenge->reward->name,
                    'description' => $challenge->reward->description,
                    'points' => $challenge->reward->points,
                    'category' => $challenge->reward->category ?? null,
                ] : null,
                'participants' => $participants->map(function ($participant) use ($challenge) {
                    // Get progress details for workout-based challenges
                    $progressDetails = null;
                    if ($challenge->challenge_type === 'workout_based' && $challenge->required_workouts) {
                        $progressService = app(\App\Services\ChallengeProgressService::class);
                        $progressDetails = $progressService->getProgressDetails($participant);
                    }
                    
                    return [
                        'id' => $participant->id,
                        'member_id' => $participant->member_id,
                        'member_name' => $participant->member ? 
                            ($participant->member->name ?? ($participant->member->first_name . ' ' . $participant->member->last_name)) : 
                            'Unknown',
                        'progress' => $participant->progress,
                        'status' => $participant->status,
                        'last_activity' => $participant->last_activity,
                        'created_at' => $participant->created_at->format('Y-m-d H:i:s'),
                        'progress_details' => $progressDetails, // Add workout progress details
                    ];
                }),
                'created_at' => $challenge->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $challenge->updated_at->format('Y-m-d H:i:s')
            ];

            return response()->json([
                'success' => true,
                'data' => $transformedChallenge,
                'message' => 'Challenge fetched successfully'
            ]);

        } catch (\Exception $e) {
            \Log::error('MobileChallengeController@show error: ' . $e->getMessage(), [
                'challenge_id' => $id,
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch challenge',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Create a new challenge
     */
    public function store(Request $request)
    {
        try {
            $user = $request->get('auth_user');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            $gymId = $user->gym_id ?? null;

            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            // Find the coach record
            $coach = Coach::where('email', $user->email)->where('gym_id', $gymId)->first();
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach record not found'
                ], 404);
            }

            // Set default challenge_type if not provided
            $challengeType = $request->input('challenge_type', 'workout_based');
            
            // Custom validation for required_workouts based on challenge_type
            $rules = [
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
                'status' => 'required|in:Active,Inactive',
                'challenge_type' => 'nullable|string|in:workout_based,manual_entry',
            ];
            
            // Add required_workouts validation only if challenge_type is workout_based
            if ($challengeType === 'workout_based') {
                $rules['required_workouts'] = 'required|integer|min:1';
            } else {
                $rules['required_workouts'] = 'nullable|integer|min:1';
            }
            
            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();
            
            // Calculate duration in days
            $startDate = Carbon::parse($data['start_date']);
            $endDate = Carbon::parse($data['end_date']);
            $data['duration'] = $startDate->diffInDays($endDate) + 1;
            
            // Set gym_id and coach_id
            $data['gym_id'] = $gymId;
            $data['coach_id'] = $coach->id; // Coach-created challenges
            
            // Set default challenge_type if not provided
            if (!isset($data['challenge_type']) || empty($data['challenge_type'])) {
                $data['challenge_type'] = 'workout_based';
            }
            
            // Only set required_workouts if challenge_type is workout_based
            if ($data['challenge_type'] !== 'workout_based') {
                $data['required_workouts'] = null;
            } elseif (!isset($data['required_workouts']) || empty($data['required_workouts'])) {
                // If workout_based but no required_workouts provided, set a default
                $data['required_workouts'] = 10; // Default to 10 workouts
            }

            $challenge = Challenge::create($data);
            $challenge->load('reward');

            return response()->json([
                'success' => true,
                'data' => $challenge,
                'message' => 'Challenge created successfully'
            ], 201);

        } catch (\Exception $e) {
            \Log::error('MobileChallengeController@store error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all(),
                'user_id' => $user->id ?? null,
                'gym_id' => $gymId ?? null,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create challenge: ' . $e->getMessage(),
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error',
                'debug' => config('app.debug') ? [
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString()
                ] : null
            ], 500);
        }
    }

    /**
     * Update a challenge
     */
    public function update(Request $request, $id)
    {
        try {
            $user = $request->get('auth_user');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            $gymId = $user->gym_id ?? null;

            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            // Find the coach record
            $coach = Coach::where('email', $user->email)->where('gym_id', $gymId)->first();
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach record not found'
                ], 404);
            }

            $challenge = Challenge::where('gym_id', $gymId)->find($id);

            if (!$challenge) {
                return response()->json([
                    'success' => false,
                    'message' => 'Challenge not found'
                ], 404);
            }

            // Only allow coach to update challenges they created
            // Check if coach_id column exists and if challenge belongs to this coach
            $hasCoachIdColumn = \Illuminate\Support\Facades\Schema::hasColumn('challenges', 'coach_id');
            if ($hasCoachIdColumn && $challenge->coach_id !== null && $challenge->coach_id !== $coach->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized to update this challenge'
                ], 403);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|required|string|max:255',
                'goal' => 'sometimes|required|string',
                'reward_id' => 'sometimes|required|exists:challenges_rewards,id',
                'description' => 'sometimes|required|string',
                'start_date' => 'sometimes|required|date',
                'end_date' => 'sometimes|required|date|after_or_equal:start_date',
                'participation_fee' => 'sometimes|required|numeric|min:0',
                'rules' => 'sometimes|required|string',
                'allow_enrollment' => 'sometimes|boolean',
                'max_participants' => 'nullable|integer|min:1',
                'status' => 'sometimes|required|in:Active,Inactive',
                'challenge_type' => 'sometimes|string|in:workout_based,manual_entry',
                'required_workouts' => 'nullable|integer|min:1|required_if:challenge_type,workout_based'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();

            // Recalculate duration if dates are updated
            if (isset($data['start_date']) || isset($data['end_date'])) {
                $startDate = Carbon::parse($data['start_date'] ?? $challenge->start_date);
                $endDate = Carbon::parse($data['end_date'] ?? $challenge->end_date);
                $data['duration'] = $startDate->diffInDays($endDate) + 1;
            }

            $challenge->update($data);
            $challenge->load('reward');

            return response()->json([
                'success' => true,
                'data' => $challenge,
                'message' => 'Challenge updated successfully'
            ]);

        } catch (\Exception $e) {
            \Log::error('MobileChallengeController@update error: ' . $e->getMessage(), [
                'challenge_id' => $id,
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update challenge',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Delete a challenge
     */
    public function destroy(Request $request, $id)
    {
        try {
            $user = $request->get('auth_user');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            $gymId = $user->gym_id ?? null;

            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            // Find the coach record
            $coach = Coach::where('email', $user->email)->where('gym_id', $gymId)->first();
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach record not found'
                ], 404);
            }

            $challenge = Challenge::where('gym_id', $gymId)->find($id);

            if (!$challenge) {
                return response()->json([
                    'success' => false,
                    'message' => 'Challenge not found'
                ], 404);
            }

            // Only allow coach to delete challenges they created
            // Check if coach_id column exists and if challenge belongs to this coach
            $hasCoachIdColumn = \Illuminate\Support\Facades\Schema::hasColumn('challenges', 'coach_id');
            if ($hasCoachIdColumn && $challenge->coach_id !== null && $challenge->coach_id !== $coach->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized to delete this challenge'
                ], 403);
            }

            $challenge->delete();

            return response()->json([
                'success' => true,
                'message' => 'Challenge deleted successfully'
            ]);

        } catch (\Exception $e) {
            \Log::error('MobileChallengeController@destroy error: ' . $e->getMessage(), [
                'challenge_id' => $id,
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete challenge',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get statistics for challenges
     */
    public function statistics(Request $request)
    {
        try {
            $user = $request->get('auth_user');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            $gymId = $user->gym_id ?? null;

            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            // Find the coach record
            $coach = Coach::where('email', $user->email)->where('gym_id', $gymId)->first();
            $coachId = $coach ? $coach->id : null;

            // Get challenges for the coach's gym
            $query = Challenge::where('gym_id', $gymId);
            
            // Only filter by coach_id if the column exists
            $hasCoachIdColumn = \Illuminate\Support\Facades\Schema::hasColumn('challenges', 'coach_id');
            if ($hasCoachIdColumn) {
                if ($coachId) {
                    $query->where(function($q) use ($coachId) {
                        $q->whereNull('coach_id')
                          ->orWhere('coach_id', $coachId);
                    });
                } else {
                    $query->whereNull('coach_id');
                }
            }

            $totalChallenges = $query->count();
            $activeChallenges = (clone $query)->where('status', 'Active')->count();
            $totalParticipants = ChallengeParticipant::whereIn('challenge_id', 
                $query->pluck('id')
            )->count();

            return response()->json([
                'success' => true,
                'data' => [
                    'total_challenges' => $totalChallenges,
                    'active_challenges' => $activeChallenges,
                    'inactive_challenges' => $totalChallenges - $activeChallenges,
                    'total_participants' => $totalParticipants,
                ],
                'message' => 'Statistics fetched successfully'
            ]);

        } catch (\Exception $e) {
            \Log::error('MobileChallengeController@statistics error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch statistics',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Join a member to a challenge (coach can join their assigned members)
     */
    public function joinMember(Request $request)
    {
        try {
            $user = $request->get('auth_user');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            $gymId = $user->gym_id ?? null;

            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            // Find the coach record
            $coach = Coach::where('email', $user->email)->where('gym_id', $gymId)->first();
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach record not found'
                ], 404);
            }

            // Validate input
            $validator = Validator::make($request->all(), [
                'challenge_id' => 'required|integer|exists:challenges,id',
                'member_id' => 'required|integer|exists:members,id',
                'progress' => 'nullable|integer|min:0|max:100',
                'status' => 'nullable|string|in:Active,Inactive,Completed',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();
            $challengeId = $data['challenge_id'];
            $memberId = $data['member_id'];

            // Verify the member is assigned to this coach
            $assignment = CoachAssignment::where('coach_id', $coach->id)
                ->where('member_id', $memberId)
                ->where('status', 'active')
                ->where('gym_id', $gymId)
                ->first();

            if (!$assignment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member is not assigned to you. You can only join your assigned members to challenges.'
                ], 403);
            }

            // Verify the challenge exists and is accessible
            $challenge = Challenge::where('id', $challengeId)
                ->where('gym_id', $gymId)
                ->first();

            if (!$challenge) {
                return response()->json([
                    'success' => false,
                    'message' => 'Challenge not found'
                ], 404);
            }

            // Check if member is already participating
            $existingParticipant = ChallengeParticipant::where('challenge_id', $challengeId)
                ->where('member_id', $memberId)
                ->where('gym_id', $gymId)
                ->first();

            if ($existingParticipant) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member is already participating in this challenge'
                ], 409);
            }

            // Create the participant
            $participant = ChallengeParticipant::create([
                'challenge_id' => $challengeId,
                'member_id' => $memberId,
                'gym_id' => $gymId,
                'progress' => $data['progress'] ?? 0,
                'status' => $data['status'] ?? 'Active',
                'last_activity' => Carbon::now(),
            ]);

            $participant->load(['challenge', 'member']);

            return response()->json([
                'success' => true,
                'message' => 'Member joined challenge successfully',
                'data' => $participant
            ], 201);

        } catch (\Exception $e) {
            Log::error('MobileChallengeController@joinMember error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to join member to challenge',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Get participants for a specific challenge
     */
    public function getParticipants(Request $request, $challengeId)
    {
        try {
            $user = $request->get('auth_user');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            $gymId = $user->gym_id ?? null;

            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            // Verify the challenge exists
            $challenge = Challenge::where('id', $challengeId)
                ->where('gym_id', $gymId)
                ->first();

            if (!$challenge) {
                return response()->json([
                    'success' => false,
                    'message' => 'Challenge not found'
                ], 404);
            }

            // Get all participants for this challenge
            $participants = ChallengeParticipant::where('challenge_id', $challengeId)
                ->where('gym_id', $gymId)
                ->with(['challenge', 'member'])
                ->orderBy('last_activity', 'desc')
                ->get();

            // Add progress details for workout-based challenges
            try {
                $progressService = app(\App\Services\ChallengeProgressService::class);
                $participantsWithProgress = $participants->map(function ($participant) use ($challenge, $progressService) {
                    $participantData = $participant->toArray();
                    
                    if ($challenge->challenge_type === 'workout_based' && $challenge->required_workouts) {
                        try {
                            $participantData['progress_details'] = $progressService->getProgressDetails($participant);
                        } catch (\Exception $e) {
                            Log::warning('Error getting progress details for participant: ' . $e->getMessage());
                            $participantData['progress_details'] = null;
                        }
                    }
                    
                    return $participantData;
                });
            } catch (\Exception $e) {
                Log::error('Error processing participants progress: ' . $e->getMessage());
                // Fallback to basic participant data if progress service fails
                $participantsWithProgress = $participants->map(function ($participant) {
                    return $participant->toArray();
                });
            }

            return response()->json([
                'success' => true,
                'data' => $participantsWithProgress
            ], 200);

        } catch (\Exception $e) {
            Log::error('MobileChallengeController@getParticipants error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch participants',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    /**
     * Remove a member from a challenge
     */
    public function removeMember(Request $request, $participantId)
    {
        try {
            $user = $request->get('auth_user');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            $gymId = $user->gym_id ?? null;

            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            // Find the coach record
            $coach = Coach::where('email', $user->email)->where('gym_id', $gymId)->first();
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach record not found'
                ], 404);
            }

            // Find the participant
            $participant = ChallengeParticipant::where('id', $participantId)
                ->where('gym_id', $gymId)
                ->first();

            if (!$participant) {
                return response()->json([
                    'success' => false,
                    'message' => 'Participant not found'
                ], 404);
            }

            // Verify the member is assigned to this coach
            $assignment = CoachAssignment::where('coach_id', $coach->id)
                ->where('member_id', $participant->member_id)
                ->where('status', 'active')
                ->where('gym_id', $gymId)
                ->first();

            if (!$assignment) {
                return response()->json([
                    'success' => false,
                    'message' => 'You can only remove your assigned members from challenges'
                ], 403);
            }

            // Delete the participant
            $participant->delete();

            return response()->json([
                'success' => true,
                'message' => 'Member removed from challenge successfully'
            ], 200);

        } catch (\Exception $e) {
            Log::error('MobileChallengeController@removeMember error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to remove member from challenge',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
}

