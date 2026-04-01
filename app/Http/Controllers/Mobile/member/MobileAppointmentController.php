<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Member;
use App\Models\Coach;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class MobileAppointmentController extends Controller
{
    /**
     * Get member's appointments
     */
    public function index(Request $request)
    {
        try {
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
            
            // Get appointments for this member
            $appointments = Appointment::with(['coach', 'member'])
                ->where('member_id', $member->id)
                ->orderBy('date', 'asc')
                ->orderBy('start_time', 'asc')
                ->get();

            // Transform appointments for mobile app
            $transformedAppointments = $appointments->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'date' => $appointment->date->format('Y-m-d'),
                    'start_time' => $appointment->start_time,
                    'end_time' => $appointment->end_time,
                    'status' => $appointment->status,
                    'notes' => $appointment->notes,
                    'rating' => $appointment->rating ? (float)$appointment->rating : null,
                    'coach' => [
                        'id' => $appointment->coach->id ?? null,
                        'name' => $appointment->coach ? 
                            $appointment->coach->first_name . ' ' . $appointment->coach->last_name : 
                            'Unknown Coach'
                    ],
                    'workout' => $this->getWorkoutTypeInfo($appointment->workout_id),
                    'created_at' => $appointment->created_at->format('Y-m-d H:i:s'),
                    'updated_at' => $appointment->updated_at->format('Y-m-d H:i:s')
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedAppointments
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get appointments error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get specific appointment details
     */
    public function show(Request $request, $id)
    {
        try {
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
            
            // Get appointment for this member
            $appointment = Appointment::with(['coach', 'member'])
                ->where('id', $id)
                ->where('member_id', $member->id)
                ->first();

            if (!$appointment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Appointment not found or not accessible',
                ], 404);
            }

            $transformedAppointment = [
                'id' => $appointment->id,
                'date' => $appointment->date->format('Y-m-d'),
                'start_time' => $appointment->start_time,
                'end_time' => $appointment->end_time,
                'status' => $appointment->status,
                'notes' => $appointment->notes,
                'rating' => $appointment->rating ? (float)$appointment->rating : null,
                'coach' => [
                    'id' => $appointment->coach->id ?? null,
                    'name' => $appointment->coach ? 
                        $appointment->coach->first_name . ' ' . $appointment->coach->last_name : 
                        'Unknown Coach',
                    'phone' => $appointment->coach->phone ?? null,
                    'email' => $appointment->coach->email ?? null
                ],
                'workout' => $this->getWorkoutTypeInfo($appointment->workout_id),
                'created_at' => $appointment->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $appointment->updated_at->format('Y-m-d H:i:s')
            ];

            return response()->json([
                'success' => true,
                'data' => $transformedAppointment
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get appointment error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get upcoming appointments (next 7 days)
     */
    public function upcoming(Request $request)
    {
        try {
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
            
            // Get upcoming appointments for this member (next 7 days)
            $upcomingAppointments = Appointment::with(['coach'])
                ->where('member_id', $member->id)
                ->where('date', '>=', now()->format('Y-m-d'))
                ->where('date', '<=', now()->addDays(7)->format('Y-m-d'))
                ->orderBy('date', 'asc')
                ->orderBy('start_time', 'asc')
                ->get();

            $transformedAppointments = $upcomingAppointments->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'date' => $appointment->date->format('Y-m-d'),
                    'start_time' => $appointment->start_time,
                    'end_time' => $appointment->end_time,
                    'status' => $appointment->status,
                    'coach_name' => $appointment->coach ? 
                        $appointment->coach->first_name . ' ' . $appointment->coach->last_name : 
                        'Unknown Coach',
                    'workout' => $this->getWorkoutTypeInfo($appointment->workout_id)
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedAppointments
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get upcoming appointments error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get appointment statistics
     */
    public function statistics(Request $request)
    {
        try {
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
            
            // Get appointment statistics for this member
            $totalAppointments = Appointment::where('member_id', $member->id)->count();
            $completedAppointments = Appointment::where('member_id', $member->id)
                ->where('status', 'completed')
                ->count();
            $upcomingAppointments = Appointment::where('member_id', $member->id)
                ->where('date', '>=', now()->format('Y-m-d'))
                ->count();
            $cancelledAppointments = Appointment::where('member_id', $member->id)
                ->where('status', 'cancelled')
                ->count();

            $statistics = [
                'total' => $totalAppointments,
                'completed' => $completedAppointments,
                'upcoming' => $upcomingAppointments,
                'cancelled' => $cancelledAppointments,
                'completion_rate' => $totalAppointments > 0 ? 
                    round(($completedAppointments / $totalAppointments) * 100, 2) : 0
            ];

            return response()->json([
                'success' => true,
                'data' => $statistics
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get appointment statistics error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get workout type information based on workout_id
     */
    private function getWorkoutTypeInfo($workoutId)
    {
        // Simple workout type mapping based on the frontend hardcoded values
        $workoutTypes = [
            1 => ['id' => 1, 'name' => 'Cardio', 'category' => 'Cardio'],
            2 => ['id' => 2, 'name' => 'Strength', 'category' => 'Strength'],
            3 => ['id' => 3, 'name' => 'Yoga', 'category' => 'Yoga'],
            4 => ['id' => 4, 'name' => 'HIIT', 'category' => 'HIIT'],
            5 => ['id' => 5, 'name' => 'Pilates', 'category' => 'Pilates'],
            6 => ['id' => 6, 'name' => 'Crossfit', 'category' => 'Crossfit']
        ];

        return $workoutTypes[$workoutId] ?? [
            'id' => $workoutId,
            'name' => 'Unknown Workout',
            'category' => 'General'
        ];
    }

    /**
     * Get available workout types
     */
    public function getWorkoutTypes()
    {
        try {
            $workoutTypes = [
                ['id' => 1, 'name' => 'Cardio', 'category' => 'Cardio', 'description' => 'Cardiovascular exercises'],
                ['id' => 2, 'name' => 'Strength', 'category' => 'Strength', 'description' => 'Strength training exercises'],
                ['id' => 3, 'name' => 'Yoga', 'category' => 'Yoga', 'description' => 'Yoga and flexibility training'],
                ['id' => 4, 'name' => 'HIIT', 'category' => 'HIIT', 'description' => 'High-Intensity Interval Training'],
                ['id' => 5, 'name' => 'Pilates', 'category' => 'Pilates', 'description' => 'Core strength and stability'],
                ['id' => 6, 'name' => 'Crossfit', 'category' => 'Crossfit', 'description' => 'Functional fitness training']
            ];

            return response()->json([
                'success' => true,
                'data' => $workoutTypes
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get workout types error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Rate an appointment
     */
    public function rateAppointment(Request $request, $id)
    {
        try {
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

            // Validate request
            $validator = Validator::make($request->all(), [
                'rating' => 'required|numeric|min:1|max:5',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                ], 422);
            }

            // Get appointment for this member
            $appointment = Appointment::where('id', $id)
                ->where('member_id', $member->id)
                ->first();

            if (!$appointment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Appointment not found or not accessible',
                ], 404);
            }

            // Check if appointment is completed
            if ($appointment->status !== 'completed') {
                return response()->json([
                    'success' => false,
                    'message' => 'You can only rate completed appointments',
                ], 400);
            }

            // Update rating
            $appointment->rating = $request->rating;
            $appointment->save();

            return response()->json([
                'success' => true,
                'message' => 'Appointment rated successfully',
                'data' => [
                    'id' => $appointment->id,
                    'rating' => (float)$appointment->rating,
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Rate appointment error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }
}
