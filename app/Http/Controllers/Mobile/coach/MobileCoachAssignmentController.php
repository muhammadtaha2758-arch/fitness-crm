<?php

namespace App\Http\Controllers\Mobile\coach;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\HandlesApiErrors;
use App\Models\Coach;
use Illuminate\Http\Request;
use Throwable;

class MobileCoachAssignmentController extends Controller
{
    use HandlesApiErrors;

    /**
     * Get assigned members for a specific coach
     * This endpoint is used by the mobile coach app
     */
    public function getAssignedMembers(Request $request, $coachId)
    {
        try {
            // Get authenticated user (works with both Passport and Mobile auth)
            // Try multiple methods to get the authenticated user
            $user = $request->user('api') 
                ?? $request->get('auth_user') 
                ?? $request->get('auth_member')
                ?? auth()->user()
                ?? auth('api')->user();
            
            if (!$user) {
                // Log for debugging
                if (config('app.debug')) {
                    \Log::warning('MobileCoachAssignmentController@getAssignedMembers: No user found', [
                        'has_auth_user' => $request->has('auth_user'),
                        'has_auth_member' => $request->has('auth_member'),
                        'request_user_api' => $request->user('api') ? 'exists' : 'null',
                        'auth_user' => auth()->user() ? 'exists' : 'null',
                        'auth_api_user' => auth('api')->user() ? 'exists' : 'null',
                        'has_auth_header' => $request->hasHeader('Authorization'),
                    ]);
                }
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized'
                ], 401);
            }
            
            // Get gym_id from user (works for both User and Member models)
            $gym_id = $user->gym_id ?? 1;
            $coach = Coach::where('id', $coachId)->where('gym_id', $gym_id)->first();
            
            if (!$coach) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Coach not found'
                ], 404);
            }

            // Get all active assignments for this coach
            $assignments = \App\Models\CoachAssignment::where('coach_id', $coachId)
                ->where('gym_id', $gym_id)
                ->where('status', 'active')
                ->with(['member:id,firstname,lastname,email,plan,Statuses,profile_image,membername,mobile_phone,landline_phone,gender,created_at,last_login'])
                ->get();

            // Transform the data to match the frontend expectations
            $members = $assignments->map(function($assignment) {
                $member = $assignment->member;
                if (!$member) return null;
                
                return [
                    'id' => $member->id,
                    'name' => $member->firstname . ' ' . $member->lastname,
                    'first_name' => $member->firstname,
                    'last_name' => $member->lastname,
                    'email' => $member->email,
                    'phone' => $member->mobile_phone ?: $member->landline_phone,
                    'mobile_phone' => $member->mobile_phone,
                    'landline_phone' => $member->landline_phone,
                    'gender' => $member->gender,
                    'plan' => $member->plan,
                    'status' => $member->Statuses,
                    'profile_image' => $member->profile_image,
                    'membername' => $member->membername,
                    'assignment_id' => $assignment->id,
                    // Return created_at as ISO 8601 UTC format for accurate timezone handling in frontend
                    'created_at' => $member->created_at ? $member->created_at->utc()->format('c') : null,
                    'assigned_date' => $assignment->assigned_date ? $assignment->assigned_date->format('Y-m-d') : null,
                    'start_date' => $assignment->start_date ? $assignment->start_date->format('Y-m-d') : null,
                    'end_date' => $assignment->end_date ? $assignment->end_date->format('Y-m-d') : null,
                    // Return last_online as ISO 8601 UTC format for accurate timezone handling in frontend
                    'last_online' => $member->last_login ? $member->last_login->utc()->format('c') : null,
                    'session_frequency' => $assignment->session_frequency,
                    'session_duration' => $assignment->session_duration,
                    'goals' => $assignment->goals,
                    'special_requirements' => $assignment->special_requirements,
                ];
            })->filter()->values();

            return response()->json([
                'status' => 'success',
                'members' => $members
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error fetching assigned members: ' . $e->getMessage()
            ], 500);
        }
    }
}

