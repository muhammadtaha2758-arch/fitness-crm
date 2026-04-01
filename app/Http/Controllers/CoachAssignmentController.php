<?php

namespace App\Http\Controllers;

use App\Models\CoachAssignment;
use App\Models\Coach;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class CoachAssignmentController extends Controller
{
    /**
     * Get coach assignment for a specific member
     */
    public function getCoachAssignment(Request $request, $memberId)
    {
        try {
            $gym_id = $request->user('api')->gym_id;
            
            // Verify member belongs to user's gym
            $member = Member::where('id', $memberId)
                ->where('gym_id', $gym_id)
                ->first();
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found'
                ], 404);
            }

            $assignment = CoachAssignment::where('member_id', $memberId)
                ->where('gym_id', $gym_id)
                ->where('status', 'active')
                ->with(['coach:id,first_name,last_name,coach_type'])
                ->first();

            return response()->json([
                'success' => true,
                'assignment' => $assignment
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching coach assignment: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Assign or update coach for a member
     */
    public function assignCoach(Request $request, $memberId)
    {
        try {
            $gym_id = $request->user('api')->gym_id;
            
            // Verify member belongs to user's gym
            $member = Member::where('id', $memberId)
                ->where('gym_id', $gym_id)
                ->first();
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found'
                ], 404);
            }

            // Verify coach belongs to user's gym
            $coach = Coach::where('id', $request->coach_id)
                ->where('gym_id', $gym_id)
                ->first();
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found'
                ], 404);
            }

            // Validate request data
            $validator = Validator::make($request->all(), [
                'coach_id' => 'required|exists:coaches,id',
                'assigned_date' => 'required|date',
                'start_date' => 'required|date|after_or_equal:assigned_date',
                'end_date' => 'nullable|date|after:start_date',
                'session_frequency' => 'required|string|max:100',
                'session_duration' => 'required|string|max:100',
                'goals' => 'required|string|max:1000',
                'special_requirements' => 'nullable|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Check if there's an existing active assignment
            $existingAssignment = CoachAssignment::where('member_id', $memberId)
                ->where('gym_id', $gym_id)
                ->where('status', 'active')
                ->first();

            if ($existingAssignment) {
                // Update existing assignment
                $existingAssignment->update([
                    'coach_id' => $request->coach_id,
                    'assigned_date' => $request->assigned_date,
                    'start_date' => $request->start_date,
                    'end_date' => $request->end_date,
                    'session_frequency' => $request->session_frequency,
                    'session_duration' => $request->session_duration,
                    'goals' => $request->goals,
                    'special_requirements' => $request->special_requirements,
                ]);

                // Update member's coach_id for quick access (hybrid approach)
                $member->update(['coach_id' => $request->coach_id]);

                $message = 'Coach assignment updated successfully!';
            } else {
                // Create new assignment
                $assignment = CoachAssignment::create([
                    'member_id' => $memberId,
                    'coach_id' => $request->coach_id,
                    'gym_id' => $gym_id,
                    'assigned_date' => $request->assigned_date,
                    'start_date' => $request->start_date,
                    'end_date' => $request->end_date,
                    'session_frequency' => $request->session_frequency,
                    'session_duration' => $request->session_duration,
                    'goals' => $request->goals,
                    'special_requirements' => $request->special_requirements,
                    'status' => 'active',
                ]);

                // Update member's coach_id for quick access (hybrid approach)
                $member->update(['coach_id' => $request->coach_id]);

                // Create notifications for coach assignment
                $notificationStatus = true;
                $notificationError = null;
                $memberNotification = null;
                $coachNotification = null;
                try {
                    $coach = \App\Models\Coach::find($request->coach_id);
                    $user = $request->user('api');
                    $performedByUserId = null;
                    if ($user && isset($user->role_id) && $user->role_id == 1) {
                        $performedByUserId = $user->id;
                    }
                    
                    if ($coach) {
                        $notificationResults = \App\Services\NotificationService::coachAssigned(
                            $assignment,
                            $member,
                            $coach,
                            $gym_id,
                            $performedByUserId
                        );
                        $memberNotification = $notificationResults['member'] ?? null;
                        $coachNotification = $notificationResults['coach'] ?? null;
                        
                        // Check if member notification failed
                        if ($memberNotification && !$memberNotification['success']) {
                            $notificationStatus = false;
                            $notificationError = 'member: ' . ($memberNotification['error'] ?? 'Notification failed');
                        }
                        
                        // Check if coach notification failed
                        if ($coachNotification && !$coachNotification['success']) {
                            if ($notificationError) {
                                $notificationError .= '; coach: ' . ($coachNotification['error'] ?? 'Notification failed');
                            } else {
                                $notificationError = 'coach: ' . ($coachNotification['error'] ?? 'Notification failed');
                            }
                            $notificationStatus = false;
                        }
                    } else {
                        $notificationStatus = false;
                        $notificationError = 'Notification not sent: coach not found.';
                    }
                } catch (\Exception $notificationException) {
                    \Log::error('Failed to create assignment notification from CoachAssignmentController', [
                        'error' => $notificationException->getMessage(),
                        'trace' => $notificationException->getTraceAsString(),
                        'coach_id' => $request->coach_id,
                        'member_id' => $memberId,
                    ]);
                    $notificationStatus = false;
                    $notificationError = 'Notification failed: ' . $notificationException->getMessage();
                }

                $message = 'Coach assigned successfully!';
            }

            return response()->json([
                'success' => true,
                'message' => $message,
                'data' => [
                    'member_notification' => $memberNotification ?? null,
                    'coach_notification' => $coachNotification ?? null,
                    'notification_status' => $notificationStatus ?? true,
                    'notification_error' => $notificationError ?? null,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error assigning coach: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove coach assignment for a member
     */
    public function removeCoachAssignment(Request $request, $memberId)
    {
        try {
            $gym_id = $request->user('api')->gym_id;
            
            // Verify member belongs to user's gym
            $member = Member::where('id', $memberId)
                ->where('gym_id', $gym_id)
                ->first();
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found'
                ], 404);
            }

            $assignment = CoachAssignment::where('member_id', $memberId)
                ->where('gym_id', $gym_id)
                ->where('status', 'active')
                ->first();

            if (!$assignment) {
                return response()->json([
                    'success' => false,
                    'message' => 'No active coach assignment found'
                ], 404);
            }

            // Mark assignment as cancelled
            $assignment->update(['status' => 'cancelled']);

            // Clear member's coach_id if no other active assignments exist (hybrid approach)
            $hasOtherActiveAssignment = CoachAssignment::where('member_id', $memberId)
                ->where('status', 'active')
                ->where('id', '!=', $assignment->id)
                ->exists();
            
            if (!$hasOtherActiveAssignment) {
                $member->update(['coach_id' => null]);
            }

            // Create notification for the coach about member unassignment
            try {
                $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
                
                \App\Services\NotificationService::createForCoach(
                    $assignment->coach_id,
                    'member_unassigned',
                    'Member Unassigned',
                    "{$memberName} has been unassigned from you.",
                    'fa-user-minus',
                    'warning',
                    'member',
                    $memberId
                );
                
                \Log::info('Created member unassignment notification from CoachAssignmentController', [
                    'coach_id' => $assignment->coach_id,
                    'member_id' => $memberId,
                    'member_name' => $memberName,
                ]);
            } catch (\Exception $notificationException) {
                \Log::error('Failed to create unassignment notification from CoachAssignmentController', [
                    'error' => $notificationException->getMessage(),
                    'trace' => $notificationException->getTraceAsString(),
                    'coach_id' => $assignment->coach_id ?? null,
                    'member_id' => $memberId,
                ]);
                // Don't fail the unassignment if notification creation fails
            }

            return response()->json([
                'success' => true,
                'message' => 'Coach assignment removed successfully!'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error removing coach assignment: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all coach assignments for a gym
     */
    public function getGymAssignments(Request $request)
    {
        try {
            $gym_id = $request->user('api')->gym_id;
            
            $assignments = CoachAssignment::where('gym_id', $gym_id)
                ->with(['member:id,first_name,last_name,member_id', 'coach:id,first_name,last_name,coach_type'])
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'assignments' => $assignments
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching assignments: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get coach assignments for a specific coach
     */
    public function getCoachAssignments(Request $request, $coachId)
    {
        try {
            $gym_id = $request->user('api')->gym_id;
            
            // Verify coach belongs to user's gym
            $coach = Coach::where('id', $coachId)
                ->where('gym_id', $gym_id)
                ->first();
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found'
                ], 404);
            }

            $assignments = CoachAssignment::where('coach_id', $coachId)
                ->where('gym_id', $gym_id)
                ->where('status', 'active')
                ->with(['member:id,first_name,last_name,member_id'])
                ->orderBy('start_date', 'asc')
                ->get();

            return response()->json([
                'success' => true,
                'assignments' => $assignments
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching coach assignments: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update assignment status
     */
    public function updateStatus(Request $request, $assignmentId)
    {
        try {
            $gym_id = $request->user('api')->gym_id;
            
            $assignment = CoachAssignment::where('id', $assignmentId)
                ->where('gym_id', $gym_id)
                ->first();
            
            if (!$assignment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Assignment not found'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'status' => 'required|in:active,inactive,completed,cancelled',
                'notes' => 'nullable|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $assignment->update([
                'status' => $request->status,
                'notes' => $request->notes,
            ]);

            // Sync member's coach_id based on status (hybrid approach)
            $member = Member::find($assignment->member_id);
            if ($member) {
                if ($request->status === 'active') {
                    // Set coach_id when status becomes active
                    $member->update(['coach_id' => $assignment->coach_id]);
                } else {
                    // Clear coach_id if status is inactive, completed, or cancelled
                    // But only if no other active assignments exist
                    $hasOtherActiveAssignment = CoachAssignment::where('member_id', $assignment->member_id)
                        ->where('status', 'active')
                        ->where('id', '!=', $assignment->id)
                        ->exists();
                    
                    if (!$hasOtherActiveAssignment) {
                        $member->update(['coach_id' => null]);
                    }
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Assignment status updated successfully!'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating assignment status: ' . $e->getMessage()
            ], 500);
        }
    }
}
