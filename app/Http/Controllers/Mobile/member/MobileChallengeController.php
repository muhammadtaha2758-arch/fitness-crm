<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Models\ChallengeParticipant;
use App\Models\Member;
use App\Services\ChallengeProgressService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MobileChallengeController extends Controller
{
    /**
     * Get all available challenges for the member's gym
     */
    public function index(Request $request)
    {
        try {
            $authMember = $request->get('auth_member');
            
            $memberData = $this->resolveMember($authMember);
            if (!$memberData) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not authenticated or member record not found'
                ], 401);
            }

            // Get member's gym_id
            $gymId = $memberData['gym_id'];
            $memberId = $memberData['member_id'];

            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not associated with any gym'
                ], 400);
            }

            // Get all active challenges for the member's gym
            $challenges = Challenge::with('reward')
                ->withCount('participants')
                ->where('gym_id', $gymId)
                ->where('status', 'Active')
                ->orderBy('start_date', 'desc')
                ->get();

            // Transform challenges for mobile app
            $challengeService = new ChallengeProgressService();
            $transformedChallenges = $challenges->map(function ($challenge) use ($memberId, $challengeService) {
                // Check if member is already enrolled
                $participant = ChallengeParticipant::where('challenge_id', $challenge->id)
                    ->where('member_id', $memberId)
                    ->first();

                $currentDate = Carbon::now();
                $startDate = Carbon::parse($challenge->start_date);
                $endDate = Carbon::parse($challenge->end_date);

                $status = 'available';
                if ($currentDate < $startDate) {
                    $status = 'upcoming';
                } elseif ($currentDate > $endDate) {
                    $status = 'ended';
                }

                // Get workout progress details if it's a workout-based challenge
                $progressDetails = null;
                $completedWorkouts = null;
                $requiredWorkouts = null;
                if ($participant && $challenge->challenge_type === 'workout_based' && $challenge->required_workouts) {
                    $progressDetails = $challengeService->getProgressDetails($participant);
                    $completedWorkouts = $progressDetails['completed_workouts'];
                    $requiredWorkouts = $progressDetails['required_workouts'];
                }

                return [
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
                    'status' => $status,
                    'challenge_type' => $challenge->challenge_type ?? 'workout_based',
                    'required_workouts' => $challenge->required_workouts,
                    'participants_count' => $challenge->participants_count,
                    'is_enrolled' => $participant ? true : false,
                    'enrollment_status' => $participant ? $participant->status : null,
                    'progress' => $participant ? $participant->progress : null,
                    'completed_workouts' => $completedWorkouts,
                    'required_workouts' => $requiredWorkouts,
                    'progress_display' => $progressDetails ? $progressDetails['display_text'] : ($participant ? $participant->progress . '%' : null),
                    'reward' => $challenge->reward ? [
                        'id' => $challenge->reward->id,
                        'name' => $challenge->reward->name,
                        'description' => $challenge->reward->description,
                        'points' => $challenge->reward->points,
                        'category' => $challenge->reward->category ?? null,
                    ] : null,
                    'can_enroll' => !$participant && 
                                    $challenge->allow_enrollment && 
                                    $status !== 'ended' &&
                                    (!$challenge->max_participants || $challenge->participants_count < $challenge->max_participants),
                    'created_at' => $challenge->created_at->format('Y-m-d H:i:s'),
                    'updated_at' => $challenge->updated_at->format('Y-m-d H:i:s')
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedChallenges,
                'message' => 'Challenges fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch challenges',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get a specific challenge with details
     */
    public function show(Request $request, $id)
    {
        try {
            $authMember = $request->get('auth_member');
            
            $memberData = $this->resolveMember($authMember);
            if (!$memberData) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not authenticated or member record not found'
                ], 401);
            }

            $gymId = $memberData['gym_id'];
            $memberId = $memberData['member_id'];

            // Get the challenge with related data
            $challenge = Challenge::with(['reward', 'participants.member'])
                ->where('id', $id)
                ->where('gym_id', $gymId)
                ->first();

            if (!$challenge) {
                return response()->json([
                    'success' => false,
                    'message' => 'Challenge not found'
                ], 404);
            }

            // Check if member is enrolled
            $participant = ChallengeParticipant::where('challenge_id', $challenge->id)
                ->where('member_id', $memberId)
                ->first();

            $currentDate = Carbon::now();
            $startDate = Carbon::parse($challenge->start_date);
            $endDate = Carbon::parse($challenge->end_date);

            $status = 'available';
            if ($currentDate < $startDate) {
                $status = 'upcoming';
            } elseif ($currentDate > $endDate) {
                $status = 'ended';
            }

            // Get workout progress details if it's a workout-based challenge
            $challengeService = new ChallengeProgressService();
            $progressDetails = null;
            $completedWorkouts = null;
            $requiredWorkouts = null;
            if ($participant && $challenge->challenge_type === 'workout_based' && $challenge->required_workouts) {
                $progressDetails = $challengeService->getProgressDetails($participant);
                $completedWorkouts = $progressDetails['completed_workouts'];
                $requiredWorkouts = $progressDetails['required_workouts'];
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
                'status' => $status,
                'challenge_type' => $challenge->challenge_type ?? 'workout_based',
                'required_workouts' => $challenge->required_workouts,
                'participants_count' => $challenge->participants->count(),
                'is_enrolled' => $participant ? true : false,
                'enrollment_status' => $participant ? $participant->status : null,
                'progress' => $participant ? $participant->progress : null,
                'completed_workouts' => $completedWorkouts,
                'required_workouts' => $requiredWorkouts,
                'progress_display' => $progressDetails ? $progressDetails['display_text'] : ($participant ? $participant->progress . '%' : null),
                'last_activity' => $participant ? $participant->last_activity : null,
                'reward' => $challenge->reward ? [
                    'id' => $challenge->reward->id,
                    'name' => $challenge->reward->name,
                    'description' => $challenge->reward->description,
                    'points' => $challenge->reward->points,
                    'category' => $challenge->reward->category ?? null,
                ] : null,
                'participants' => $challenge->participants->map(function ($p) use ($challengeService) {
                    $pProgressDetails = null;
                    $pCompletedWorkouts = null;
                    $pRequiredWorkouts = null;
                    if ($p->challenge && $p->challenge->challenge_type === 'workout_based' && $p->challenge->required_workouts) {
                        $pProgressDetails = $challengeService->getProgressDetails($p);
                        $pCompletedWorkouts = $pProgressDetails['completed_workouts'];
                        $pRequiredWorkouts = $pProgressDetails['required_workouts'];
                    }
                    return [
                        'member_id' => $p->member_id,
                        'member_name' => $p->member ? 
                            $p->member->first_name . ' ' . $p->member->last_name : 
                            'Unknown Member',
                        'progress' => $p->progress,
                        'completed_workouts' => $pCompletedWorkouts,
                        'required_workouts' => $pRequiredWorkouts,
                        'progress_display' => $pProgressDetails ? $pProgressDetails['display_text'] : ($p->progress . '%'),
                        'status' => $p->status,
                        'last_activity' => $p->last_activity,
                    ];
                }),
                'can_enroll' => !$participant && 
                                $challenge->allow_enrollment && 
                                $status !== 'ended' &&
                                (!$challenge->max_participants || $challenge->participants->count() < $challenge->max_participants),
                'created_at' => $challenge->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $challenge->updated_at->format('Y-m-d H:i:s')
            ];

            return response()->json([
                'success' => true,
                'data' => $transformedChallenge,
                'message' => 'Challenge details fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch challenge details',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get challenges the member is enrolled in
     */
    public function getMemberChallenges(Request $request)
    {
        try {
            $authMember = $request->get('auth_member');
    
            $memberData = $this->resolveMember($authMember);
            if (!$memberData) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not authenticated or member record not found'
                ], 401);
            }
    
            // ✅ Fetch only the member's participations (with related challenge & reward)
            $participations = ChallengeParticipant::with(['challenge.reward'])
                ->where('member_id', $memberData['member_id'])
                ->orderBy('created_at', 'desc')
                ->get();
            
            // Transform participations to include workout progress details
            $challengeService = new ChallengeProgressService();
            $transformedParticipations = $participations->map(function ($participation) use ($challengeService) {
                $challenge = $participation->challenge;
                $progressDetails = null;
                $completedWorkouts = null;
                $requiredWorkouts = null;
                
                if ($challenge && $challenge->challenge_type === 'workout_based' && $challenge->required_workouts) {
                    try {
                        $progressDetails = $challengeService->getProgressDetails($participation);
                        $completedWorkouts = $progressDetails['completed_workouts'] ?? null;
                        $requiredWorkouts = $progressDetails['required_workouts'] ?? null;
                    } catch (\Exception $e) {
                        // Log error but don't break the response
                        \Log::warning('Error getting progress details', [
                            'participation_id' => $participation->id,
                            'error' => $e->getMessage()
                        ]);
                        $progressDetails = null;
                    }
                }
                
                return [
                    'id' => $participation->id,
                    'challenge_id' => $participation->challenge_id,
                    'member_id' => $participation->member_id,
                    'gym_id' => $participation->gym_id,
                    'progress' => $participation->progress,
                    'completed_workouts' => $completedWorkouts,
                    'required_workouts' => $requiredWorkouts,
                    'progress_display' => $progressDetails && isset($progressDetails['display_text']) 
                        ? $progressDetails['display_text'] 
                        : ($participation->progress . '%'),
                    'status' => $participation->status,
                    'last_activity' => $participation->last_activity,
                    'challenge' => $challenge ? [
                        'id' => $challenge->id,
                        'name' => $challenge->name,
                        'description' => $challenge->description,
                        'goal' => $challenge->goal,
                        'duration' => $challenge->duration,
                        'start_date' => $challenge->start_date,
                        'end_date' => $challenge->end_date,
                        'challenge_type' => $challenge->challenge_type ?? 'workout_based',
                        'required_workouts' => $challenge->required_workouts,
                        'reward' => $challenge->reward,
                    ] : null,
                    'created_at' => $participation->created_at,
                    'updated_at' => $participation->updated_at,
                ];
            });
    
            return response()->json([
                'success' => true,
                'data' => $transformedParticipations,
                'message' => 'Member participations fetched successfully'
            ]);
    
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch member participations',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    

    /**
     * Enroll member in a challenge
     */
    public function enroll(Request $request, $id)
    {
        try {
            $authMember = $request->get('auth_member');
            
            $memberData = $this->resolveMember($authMember);
            if (!$memberData) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not authenticated or member record not found'
                ], 401);
            }

            $gymId = $memberData['gym_id'];
            $memberId = $memberData['member_id'];

            // Get the challenge
            $challenge = Challenge::where('id', $id)
                ->where('gym_id', $gymId)
                ->first();

            if (!$challenge) {
                return response()->json([
                    'success' => false,
                    'message' => 'Challenge not found'
                ], 404);
            }

            // Check if member is already enrolled
            $existingParticipation = ChallengeParticipant::where('challenge_id', $challenge->id)
                ->where('member_id', $memberId)
                ->first();

            if ($existingParticipation) {
                return response()->json([
                    'success' => false,
                    'message' => 'Already enrolled in this challenge'
                ], 400);
            }

            // Check if enrollment is allowed
            if (!$challenge->allow_enrollment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Enrollment is not allowed for this challenge'
                ], 400);
            }

            // Check if challenge hasn't ended
            $currentDate = Carbon::now();
            $endDate = Carbon::parse($challenge->end_date);
            if ($currentDate > $endDate) {
                return response()->json([
                    'success' => false,
                    'message' => 'This challenge has ended'
                ], 400);
            }

            // Check if max participants limit is reached
            if ($challenge->max_participants) {
                $participantsCount = ChallengeParticipant::where('challenge_id', $challenge->id)->count();
                if ($participantsCount >= $challenge->max_participants) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Challenge is full. Maximum participants reached.'
                    ], 400);
                }
            }

            // Create participation
            $participation = ChallengeParticipant::create([
                'challenge_id' => $challenge->id,
                'member_id' => $memberId,
                'gym_id' => $gymId,
                'progress' => 0,
                'status' => 'Enrolled',
                'last_activity' => Carbon::now()
            ]);

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $participation->id,
                    'challenge_id' => $participation->challenge_id,
                    'member_id' => $participation->member_id,
                    'progress' => $participation->progress,
                    'status' => $participation->status,
                    'last_activity' => $participation->last_activity,
                ],
                'message' => 'Successfully enrolled in challenge'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to enroll in challenge',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update challenge progress
     */
    public function updateProgress(Request $request, $participationId)
    {
        try {
            $authMember = $request->get('auth_member');
            
            $memberData = $this->resolveMember($authMember);
            if (!$memberData) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not authenticated or member record not found'
                ], 401);
            }

            $validator = Validator::make($request->all(), [
                'progress' => 'required|numeric|min:0|max:100',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Get the participation record
            $participation = ChallengeParticipant::where('id', $participationId)
                ->where('member_id', $memberData['member_id'])
                ->first();

            if (!$participation) {
                return response()->json([
                    'success' => false,
                    'message' => 'Participation record not found'
                ], 404);
            }

            // Update progress
            $participation->progress = $request->progress;
            $participation->last_activity = Carbon::now();
            $participation->save();

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $participation->id,
                    'progress' => $participation->progress,
                    'status' => $participation->status,
                    'last_activity' => $participation->last_activity,
                ],
                'message' => 'Progress updated successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update progress',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get challenge statistics for mobile
     */
    public function statistics(Request $request)
    {
        try {
            $authMember = $request->get('auth_member');
            
            $memberData = $this->resolveMember($authMember);
            if (!$memberData) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not authenticated or member record not found'
                ], 401);
            }

            $gymId = $memberData['gym_id'];
            $memberId = $memberData['member_id'];

            // Get total challenges in gym
            $totalChallenges = Challenge::where('gym_id', $gymId)
                ->where('status', 'Active')
                ->count();

            // Get challenges member is enrolled in
            $memberChallenges = ChallengeParticipant::where('member_id', $memberId)
                ->count();

            // Get active challenges (currently running)
            $currentDate = Carbon::now();
            $activeChallenges = Challenge::where('gym_id', $gymId)
                ->where('status', 'Active')
                ->where('start_date', '<=', $currentDate)
                ->where('end_date', '>=', $currentDate)
                ->count();

            // Get completed challenges
            $completedChallenges = ChallengeParticipant::where('member_id', $memberId)
                ->where('status', 'Completed')
                ->count();

            // Get average progress across all enrolled challenges
            $averageProgress = ChallengeParticipant::where('member_id', $memberId)
                ->avg('progress');

            return response()->json([
                'success' => true,
                'data' => [
                    'total_challenges' => $totalChallenges,
                    'member_challenges' => $memberChallenges,
                    'active_challenges' => $activeChallenges,
                    'completed_challenges' => $completedChallenges,
                    'average_progress' => round($averageProgress ?? 0, 2)
                ],
                'message' => 'Statistics fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Resolve the actual Member record and ID from auth_member
     * auth_member might be a User instance (from users table) or Member instance (from members table)
     * 
     * @param mixed $authMember
     * @return array ['member' => Member instance, 'member_id' => int, 'gym_id' => int] or null
     */
    private function resolveMember($authMember)
    {
        if (!$authMember) {
            return null;
        }

        if ($authMember instanceof Member) {
            // It's already a Member instance
            return [
                'member' => $authMember,
                'member_id' => $authMember->id,
                'gym_id' => $authMember->gym_id
            ];
        } else {
            // It's a User instance, find the corresponding Member by email
            $member = Member::where('email', $authMember->email)->first();
            if ($member) {
                return [
                    'member' => $member,
                    'member_id' => $member->id,
                    'gym_id' => $member->gym_id ?? $authMember->gym_id
                ];
            }
        }

        return null;
    }
}

