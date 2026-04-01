<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\CheckIn;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MobileCheckInController extends Controller
{
    /**
     * Check in a member
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkIn(Request $request)
    {
        try {
            // Get authenticated user from mobile.auth middleware
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

            $memberId = $member->id;

            // Check if user is already checked in (has an active check-in without check-out)
            $activeCheckIn = CheckIn::where('member_id', $memberId)
                ->whereNull('check_out_time')
                ->whereDate('check_in_time', Carbon::today())
                ->first();

            if ($activeCheckIn) {
                return response()->json([
                    'success' => false,
                    'message' => 'You are already checked in. Please check out first.',
                    'data' => [
                        'check_in_id' => $activeCheckIn->id,
                        'check_in_time' => $activeCheckIn->check_in_time->format('Y-m-d H:i:s'),
                    ]
                ], 400);
            }

            // Create new check-in record
            $checkIn = CheckIn::create([
                'member_id' => $memberId,
                'check_in_time' => Carbon::now(),
                'check_in_type' => 'mobile',
                'message' => 'Mobile app check-in',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Successfully checked in!',
                'data' => [
                    'id' => $checkIn->id,
                    'member_id' => $checkIn->member_id,
                    'check_in_time' => $checkIn->check_in_time->format('H:i:s'),
                    'check_in_date' => $checkIn->check_in_time->format('Y-m-d'),
                    'check_in_datetime' => $checkIn->check_in_time->toDateTimeString(),
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to check in: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Check out a member
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkOut(Request $request)
    {
        try {
            // Get authenticated user from mobile.auth middleware
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

            $memberId = $member->id;

            // Find active check-in
            $checkIn = CheckIn::where('member_id', $memberId)
                ->whereNull('check_out_time')
                ->whereDate('check_in_time', Carbon::today())
                ->orderBy('check_in_time', 'desc')
                ->first();

            if (!$checkIn) {
                return response()->json([
                    'success' => false,
                    'message' => 'No active check-in found. You must check in first.',
                ], 404);
            }

            // Calculate duration
            $checkInTime = Carbon::parse($checkIn->check_in_time);
            $checkOutTime = Carbon::now();
            $duration = $checkInTime->diffInMinutes($checkOutTime);

            // Log before update
            \Log::info('Check-out before update', [
                'check_in_id' => $checkIn->id,
                'check_in_time' => $checkIn->check_in_time->toDateTimeString(),
                'check_out_time_before' => $checkIn->check_out_time ? $checkIn->check_out_time->toDateTimeString() : null,
                'new_check_out_time' => $checkOutTime->toDateTimeString(),
                'check_in_time_formatted' => $checkIn->check_in_time->format('Y-m-d H:i:s'),
                'check_out_time_formatted' => $checkOutTime->format('Y-m-d H:i:s'),
            ]);

            // Preserve the original check_in_time to prevent it from being updated
            // (in case the database column has ON UPDATE CURRENT_TIMESTAMP)
            $originalCheckInTime = $checkIn->check_in_time->format('Y-m-d H:i:s');
            $checkOutTimeString = $checkOutTime->format('Y-m-d H:i:s');
            
            // Use direct DB update and explicitly preserve check_in_time
            $updated = DB::table('check_ins')
                ->where('id', $checkIn->id)
                ->update([
                    'check_in_time' => $originalCheckInTime, // Explicitly preserve original check-in time
                    'check_out_time' => $checkOutTimeString,
                    'updated_at' => Carbon::now(),
                ]);

            // Refresh the model to get updated values from database
            $checkIn->refresh();

            // Log after update
            \Log::info('Check-out after update', [
                'check_in_id' => $checkIn->id,
                'update_result' => $updated,
                'check_in_time' => $checkIn->check_in_time->toDateTimeString(),
                'check_out_time_after' => $checkIn->check_out_time ? $checkIn->check_out_time->toDateTimeString() : null,
                'check_in_time_raw' => $checkIn->getRawOriginal('check_in_time'),
                'check_out_time_raw' => $checkIn->getRawOriginal('check_out_time'),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Successfully checked out!',
                'data' => [
                    'id' => $checkIn->id,
                    'member_id' => $checkIn->member_id,
                    'check_in_date' => $checkIn->check_in_time->format('Y-m-d'),
                    'check_in_time' => $checkIn->check_in_time->format('H:i:s'),
                    'check_in_datetime' => $checkIn->check_in_time->toDateTimeString(),
                    'check_out_time' => $checkIn->check_out_time ? $checkIn->check_out_time->format('H:i:s') : null,
                    'check_out_datetime' => $checkIn->check_out_time ? $checkIn->check_out_time->toDateTimeString() : null,
                    'duration_minutes' => $duration,
                    'duration_formatted' => $this->formatDuration($duration),
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to check out: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get current check-in status for authenticated member
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStatus(Request $request)
    {
        try {
            // Get authenticated user from mobile.auth middleware
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

            // Find active check-in
            $checkIn = CheckIn::where('member_id', $member->id)
                ->whereNull('check_out_time')
                ->whereDate('check_in_time', Carbon::today())
                ->orderBy('check_in_time', 'desc')
                ->first();

            if (!$checkIn) {
                return response()->json([
                    'success' => true,
                    'message' => 'No active check-in found',
                    'data' => null
                ], 200);
            }

            return response()->json([
                'success' => true,
                'message' => 'Active check-in found',
                'data' => [
                    'id' => $checkIn->id,
                    'member_id' => $checkIn->member_id,
                    'checked_in' => true,
                    'checkedIn' => true, // camelCase for mobile compatibility
                    'check_in_date' => $checkIn->check_in_time->format('Y-m-d'),
                    'check_in_time' => $checkIn->check_in_time->format('H:i:s'),
                    'check_in_datetime' => $checkIn->check_in_time->toDateTimeString(),
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch status: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get check-in history for authenticated member
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getHistory(Request $request)
    {
        try {
            // Get authenticated user from mobile.auth middleware
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

            // Get pagination parameters
            $limit = $request->input('limit', 50);
            $page = $request->input('page', 1);
            $offset = ($page - 1) * $limit;

            // Get check-in history
            $checkIns = CheckIn::where('member_id', $member->id)
                ->orderBy('check_in_time', 'desc')
                ->limit($limit)
                ->offset($offset)
                ->get();

            // Format the data
            $history = $checkIns->map(function ($checkIn) {
                $checkInTime = Carbon::parse($checkIn->check_in_time);
                $checkOutTime = $checkIn->check_out_time ? Carbon::parse($checkIn->check_out_time) : null;
                $duration = $checkOutTime ? $checkInTime->diffInMinutes($checkOutTime) : null;

                return [
                    'id' => $checkIn->id,
                    'member_id' => $checkIn->member_id,
                    'check_in_date' => $checkIn->check_in_time->format('Y-m-d'),
                    'check_in_time' => $checkIn->check_in_time->format('H:i:s'),
                    'check_in_datetime' => $checkIn->check_in_time->toDateTimeString(),
                    'check_out_time' => $checkOutTime ? $checkOutTime->format('H:i:s') : null,
                    'check_out_datetime' => $checkOutTime ? $checkOutTime->toDateTimeString() : null,
                    'duration_minutes' => $duration,
                    'duration_formatted' => $duration ? $this->formatDuration($duration) : null,
                ];
            });

            return response()->json([
                'success' => true,
                'message' => 'Check-in history retrieved successfully',
                'data' => $history,
                'pagination' => [
                    'current_page' => (int)$page,
                    'per_page' => (int)$limit,
                    'total' => CheckIn::where('member_id', $member->id)->count(),
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch history: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Format duration in minutes to human-readable format
     * 
     * @param int $minutes
     * @return string
     */
    private function formatDuration($minutes)
    {
        if ($minutes < 60) {
            return $minutes . 'm';
        }
        
        $hours = floor($minutes / 60);
        $mins = $minutes % 60;
        
        if ($mins > 0) {
            return $hours . 'h ' . $mins . 'm';
        }
        
        return $hours . 'h';
    }
}
