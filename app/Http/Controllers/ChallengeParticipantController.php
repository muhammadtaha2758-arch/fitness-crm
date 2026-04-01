<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Challenge;
use App\Models\ChallengeParticipant;
use Illuminate\Support\Facades\Auth;

class ChallengeParticipantController extends Controller
{
    /**
     * Display a listing of the challenge participants.
     */
    public function index(Request $request)
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
        
        $participants = ChallengeParticipant::with(['challenge', 'member'])
            ->where('gym_id', $gymId)
            ->orderBy('last_activity', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $participants
        ]);
    }

    /**
     * Store a newly created challenge participant.
     */
    public function store(Request $request)
    {
        try {
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

            // Validate input data
            $data = $request->validate([
                'challenge_id' => 'required|integer|exists:challenges,id',
                'member_id' => 'required|integer|exists:members,id',
                'progress' => 'nullable|integer|min:0|max:100',
                'status' => 'required|string|in:Active,Inactive,Completed',
                'last_activity' => 'nullable|date',
            ]);
            
            // Check if member is already participating in this challenge
            $existingParticipant = ChallengeParticipant::where('challenge_id', $data['challenge_id'])
                ->where('member_id', $data['member_id'])
                ->where('gym_id', $gymId)
                ->first();
                
            if ($existingParticipant) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member is already participating in this challenge'
                ], 409);
            }
            
            // Add gym_id to data
            $data['gym_id'] = $gymId;
            
            // Create the participant
            $participant = ChallengeParticipant::create($data);
            $participant->load(['challenge', 'member']);
            
            // Create notifications for challenge join
            $notificationStatus = true;
            $notificationError = null;
            $memberNotification = null;
            $coachNotification = null;
            try {
                $challenge = Challenge::find($data['challenge_id']);
                $member = \App\Models\Member::find($data['member_id']);
                $coach = null;
                
                if ($challenge && $challenge->coach_id) {
                    $coach = \App\Models\Coach::find($challenge->coach_id);
                }
                
                // Get performedByUserId if current user is an admin
                $performedByUserId = null;
                if ($user && isset($user->role_id) && $user->role_id == 1) {
                    $performedByUserId = $user->id;
                }
                
                if ($challenge && $member) {
                    $notificationResults = \App\Services\NotificationService::challengeJoined($challenge, $member, $gymId, $coach, $performedByUserId);
                    $memberNotification = $notificationResults['member'] ?? null;
                    $coachNotification = $notificationResults['coach'] ?? null;
                    
                    // Check if member notification failed
                    if ($memberNotification && !$memberNotification['success']) {
                        $notificationStatus = false;
                        $notificationError = 'member: ' . ($memberNotification['error'] ?? 'Notification failed');
                    }
                    
                    // Check if coach notification failed (only if coach exists)
                    if ($coach && $coachNotification && !$coachNotification['success']) {
                        if ($notificationError) {
                            $notificationError .= '; coach: ' . ($coachNotification['error'] ?? 'Notification failed');
                        } else {
                            $notificationError = 'coach: ' . ($coachNotification['error'] ?? 'Notification failed');
                        }
                        $notificationStatus = false;
                    }
                } else {
                    $notificationStatus = false;
                    $notificationError = 'Notification not sent: challenge or member not found.';
                }
            } catch (\Exception $e) {
                \Log::error('Failed to create challenge join notifications: ' . $e->getMessage(), [
                    'participant_id' => $participant->id,
                    'trace' => $e->getTraceAsString()
                ]);
                $notificationStatus = false;
                $notificationError = 'Notification failed: ' . $e->getMessage();
            }
            
            return response()->json([
                'success' => true,
                'message' => 'Member added to challenge successfully',
                'data' => [
                    'participant' => $participant,
                    'member_notification' => $memberNotification,
                    'coach_notification' => $coachNotification,
                    'notification_status' => $notificationStatus,
                    'notification_error' => $notificationError,
                ]
            ], 201);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error creating challenge participant: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create challenge participant. Please try again.'
            ], 500);
        }
    }

    /**
     * Display the specified challenge participant.
     */
    public function show($id)
    {
        $participant = ChallengeParticipant::with(['challenge', 'member'])->find($id);
        if (!$participant) {
            return response()->json(['success' => false, 'message' => 'Participant not found'], 404);
        }
        return response()->json(['success' => true, 'data' => $participant]);
    }

    /**
     * Update the specified challenge participant.
     */
    public function update(Request $request, $id)
    {
        $participant = ChallengeParticipant::find($id);
        if (!$participant) {
            return response()->json(['success' => false, 'message' => 'Participant not found'], 404);
        }
        $data = $request->validate([
            'challenge_id' => 'sometimes|integer|exists:challenges,id',
            'member_id' => 'sometimes|integer|exists:members,id',
            'progress' => 'nullable|integer|min:0|max:100',
            'status' => 'sometimes|string',
            'last_activity' => 'nullable|date',
        ]);
        
        $wasCompleted = $participant->status === 'Completed';
        $participant->update($data);
        $participant->load(['challenge', 'member']);
        
        // Create notification if challenge was just completed
        if (!$wasCompleted && $participant->status === 'Completed') {
            try {
                // Get the current user
                $user = Auth::guard('api')->user() 
                    ?? $request->user('api') 
                    ?? auth()->user() 
                    ?? $request->get('auth_user') 
                    ?? $request->get('auth_member');
                
                $challenge = $participant->challenge;
                $member = $participant->member;
                $coach = null;
                
                if ($challenge && $challenge->coach_id) {
                    $coach = \App\Models\Coach::find($challenge->coach_id);
                }
                
                // Get performedByUserId if current user is an admin
                $performedByUserId = null;
                if ($user && isset($user->role_id) && $user->role_id == 1) {
                    $performedByUserId = $user->id;
                }
                
                if ($challenge && $member) {
                    \App\Services\NotificationService::challengeCompleted($challenge, $member, $participant->gym_id, $coach, $performedByUserId);
                }
            } catch (\Exception $e) {
                \Log::error('Failed to create challenge completion notifications: ' . $e->getMessage(), [
                    'participant_id' => $participant->id,
                    'trace' => $e->getTraceAsString()
                ]);
            }
        }
        
        return response()->json(['success' => true, 'data' => $participant]);
    }

    /**
     * Remove the specified challenge participant.
     */
    public function destroy($id)
    {
        $participant = ChallengeParticipant::find($id);
        
        if (!$participant) {
            return response()->json([
                'success' => false,
                'message' => 'Participant not found'
            ], 404);
        }
    
        // Delete the participant
        $participant->delete();
    
        return response()->json([
            'success' => true,
            'message' => 'Participant removed from challenge successfully'
        ]);
    }

    /**
     * Show participants for a specific challenge.
     */
    public function participantsByChallenge(Request $request, $challengeId)
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
        
        $participants = ChallengeParticipant::where('challenge_id', $challengeId)
            ->where('gym_id', $gymId)
            ->with(['challenge', 'member'])
            ->orderBy('last_activity', 'desc')
            ->get();
            
        return response()->json([
            'success' => true,
            'data' => $participants
        ]);
    }
}
