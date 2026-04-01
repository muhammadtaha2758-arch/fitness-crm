<?php

namespace App\Http\Controllers;

use App\Models\AssignedMealsMember;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class AssignedMealsMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     * Only shows logs from members who have assigned nutrition plans.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = AssignedMealsMember::with('member');

            // Only show logs from members who have assigned meal plans
            // Check for active assignments in assigned_meals_members table
            $query->where(function($q) {
                $q->whereNotNull('template_id')
                  ->where(function($dateQ) {
                      $dateQ->whereNull('end_date')
                            ->orWhere('end_date', '>=', now()->format('Y-m-d'));
                  });
            });

            // Apply filters
            if ($request->has('member_id') && $request->member_id) {
                // Validate member_id exists in members table
                $memberExists = \App\Models\Member::where('id', $request->member_id)->exists();
                if (!$memberExists) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid member_id. Member does not exist in members table.'
                    ], 422);
                }
                $query->where('member_id', $request->member_id);
            }

            if ($request->has('date_from') && $request->date_from) {
                $query->where('date', '>=', $request->date_from);
            }

            if ($request->has('date_to') && $request->date_to) {
                $query->where('date', '<=', $request->date_to);
            }

            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->whereHas('member', function ($q) use ($search) {
                    $q->where('firstname', 'like', "%{$search}%")
                      ->orWhere('lastname', 'like', "%{$search}%")
                      ->orWhere('membername', 'like', "%{$search}%");
                });
            }

            // Pagination
            $perPage = $request->get('per_page', 15);
            $logs = $query->orderBy('date', 'desc')->paginate($perPage);

            // Transform data to match frontend format
            // member_id is guaranteed to exist in members table via foreign key constraint
            $transformedLogs = $logs->getCollection()->map(function ($log) {
                return [
                    'id' => $log->id,
                    'member' => $log->member ? $log->member->firstname . ' ' . $log->member->lastname : 'Unknown',
                    'member_id' => $log->member_id, // This ID matches members.id from members table
                    'date' => $log->date ? $log->date->format('Y-m-d') : null,
                    'weight' => $log->weight,
                    'bodyFat' => $log->body,
                    'waterIntake' => $log->water,
                    'hunger' => $log->hunger,
                    'strength' => $log->strength,
                    'energy' => $log->energy,
                    'mealDeviations' => $log->meal_deviations,
                    'activities' => $log->activities,
                    'feel' => $log->feel,
                    'cardio' => $log->cardio,
                    'plan' => $log->plan,
                    'calories' => $log->calories,
                    'protein' => $log->protein,
                    'carbs' => $log->carbs,
                    'fat' => $log->fat_macros,
                    'notes' => $log->notes,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedLogs,
                'pagination' => [
                    'current_page' => $logs->currentPage(),
                    'last_page' => $logs->lastPage(),
                    'per_page' => $logs->perPage(),
                    'total' => $logs->total(),
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching nutrition logs: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'member_id' => 'required|exists:members,id',
                'date' => 'required|date',
                'weight' => 'nullable|numeric|min:0|max:1000',
                'body' => 'nullable|numeric|min:0|max:100',
                'water' => 'nullable|numeric|min:0',
                'hunger' => 'nullable|integer|min:0|max:10',
                'strength' => 'nullable|integer|min:0|max:10',
                'energy' => 'nullable|integer|min:0|max:10',
                'meal_deviations' => 'nullable|string|max:1000',
                'activities' => 'nullable|string|max:1000',
                'feel' => 'nullable|string|max:1000',
                'cardio' => 'nullable|string|max:1000',
                'plan' => 'nullable|string|max:255',
                'calories' => 'nullable|integer|min:0',
                'protein' => 'nullable|numeric|min:0',
                'carbs' => 'nullable|numeric|min:0',
                'fat_macros' => 'nullable|numeric|min:0',
                'notes' => 'nullable|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $log = AssignedMealsMember::create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Nutrition log created successfully',
                'data' => $log->load('member')
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating nutrition log: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(AssignedMealsMember $assignedMealsMember): JsonResponse
    {
        try {
            $log = $assignedMealsMember->load('member');
            
            return response()->json([
                'success' => true,
                'data' => $log
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching nutrition log: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            // Find the model manually to ensure it exists
            $assignedMealsMember = AssignedMealsMember::find($id);
            
            if (!$assignedMealsMember) {
                return response()->json([
                    'success' => false,
                    'message' => 'Nutrition log not found'
                ], 404);
            }
            
            $validator = Validator::make($request->all(), [
                'member_id' => 'sometimes|required|exists:members,id',
                'date' => 'sometimes|required|date',
                'weight' => 'nullable|numeric|min:0|max:1000',
                'body' => 'nullable|numeric|min:0|max:100',
                'bodyFat' => 'nullable|numeric|min:0|max:100',
                'water' => 'nullable|numeric|min:0',
                'waterIntake' => 'nullable|numeric|min:0',
                'hunger' => 'nullable|integer|min:0|max:10',
                'strength' => 'nullable|integer|min:0|max:10',
                'energy' => 'nullable|integer|min:0|max:10',
                'meal_deviations' => 'nullable|string|max:1000',
                'mealDeviations' => 'nullable|string|max:1000',
                'activities' => 'nullable|string|max:1000',
                'feel' => 'nullable|string|max:1000',
                'cardio' => 'nullable|string|max:1000',
                'plan' => 'nullable|string|max:255',
                'calories' => 'nullable|integer|min:0',
                'protein' => 'nullable|numeric|min:0',
                'carbs' => 'nullable|numeric|min:0',
                'carb' => 'nullable|numeric|min:0',
                'fat_macros' => 'nullable|numeric|min:0',
                'fat' => 'nullable|numeric|min:0',
                'notes' => 'nullable|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Map frontend field names to database column names
            // Check all possible field names from the request
            $updateData = [];
            
            // Get all input data
            $input = $request->all();
            
            // Map frontend field names to backend column names
            if (array_key_exists('member_id', $input)) {
                $updateData['member_id'] = $input['member_id'];
            }
            if (array_key_exists('date', $input)) {
                $updateData['date'] = $input['date'];
            }
            if (array_key_exists('weight', $input)) {
                $updateData['weight'] = $input['weight'] !== '' ? $input['weight'] : null;
            }
            if (array_key_exists('bodyFat', $input)) {
                $updateData['body'] = $input['bodyFat'] !== '' ? $input['bodyFat'] : null;
            } elseif (array_key_exists('body', $input)) {
                $updateData['body'] = $input['body'] !== '' ? $input['body'] : null;
            }
            if (array_key_exists('waterIntake', $input)) {
                $updateData['water'] = $input['waterIntake'] !== '' ? $input['waterIntake'] : null;
            } elseif (array_key_exists('water', $input)) {
                $updateData['water'] = $input['water'] !== '' ? $input['water'] : null;
            }
            if (array_key_exists('hunger', $input)) {
                $updateData['hunger'] = $input['hunger'] !== '' ? $input['hunger'] : null;
            }
            if (array_key_exists('strength', $input)) {
                $updateData['strength'] = $input['strength'] !== '' ? $input['strength'] : null;
            }
            if (array_key_exists('energy', $input)) {
                $updateData['energy'] = $input['energy'] !== '' ? $input['energy'] : null;
            }
            if (array_key_exists('mealDeviations', $input)) {
                $updateData['meal_deviations'] = $input['mealDeviations'] !== '' ? $input['mealDeviations'] : null;
            } elseif (array_key_exists('meal_deviations', $input)) {
                $updateData['meal_deviations'] = $input['meal_deviations'] !== '' ? $input['meal_deviations'] : null;
            }
            if (array_key_exists('activities', $input)) {
                $updateData['activities'] = $input['activities'] !== '' ? $input['activities'] : null;
            }
            if (array_key_exists('feel', $input)) {
                $updateData['feel'] = $input['feel'] !== '' ? $input['feel'] : null;
            }
            if (array_key_exists('cardio', $input)) {
                $updateData['cardio'] = $input['cardio'] !== '' ? $input['cardio'] : null;
            }
            if (array_key_exists('plan', $input)) {
                $updateData['plan'] = $input['plan'] !== '' ? $input['plan'] : null;
            }
            if (array_key_exists('calories', $input)) {
                $updateData['calories'] = $input['calories'] !== '' ? $input['calories'] : null;
            }
            if (array_key_exists('protein', $input)) {
                $updateData['protein'] = $input['protein'] !== '' ? $input['protein'] : null;
            }
            if (array_key_exists('carb', $input)) {
                $updateData['carbs'] = $input['carb'] !== '' ? $input['carb'] : null;
            } elseif (array_key_exists('carbs', $input)) {
                $updateData['carbs'] = $input['carbs'] !== '' ? $input['carbs'] : null;
            }
            if (array_key_exists('fat', $input)) {
                $updateData['fat_macros'] = $input['fat'] !== '' ? $input['fat'] : null;
            }
            if (array_key_exists('notes', $input)) {
                $updateData['notes'] = $input['notes'] !== '' ? $input['notes'] : null;
            }

            // Check if plan is being updated (nutrition plan update)
            $planUpdated = isset($updateData['plan']) && $assignedMealsMember->plan !== $updateData['plan'];
            
            // Only update if there's data to update
            if (!empty($updateData)) {
                $assignedMealsMember->update($updateData);
            }
            
            // Reload the model to get fresh data from database
            $assignedMealsMember = $assignedMealsMember->fresh();
            
            // Create notification if nutrition plan was updated
            if ($planUpdated) {
                try {
                    // Get performedByUserId if current user is an admin
                    $user = $request->user('api');
                    $performedByUserId = null;
                    if ($user && isset($user->role_id) && $user->role_id == 1) {
                        $performedByUserId = $user->id;
                    }
                    
                    $assignedMealsMember->load('member');
                    if ($assignedMealsMember->member) {
                        \App\Services\NotificationService::nutritionUpdated($assignedMealsMember, $assignedMealsMember->member, $assignedMealsMember->gym_id, $performedByUserId);
                    }
                } catch (\Exception $e) {
                    \Log::error('Failed to create nutrition update notifications: ' . $e->getMessage(), [
                        'assignment_id' => $assignedMealsMember->id,
                        'trace' => $e->getTraceAsString()
                    ]);
                }
            }

            // Transform response to match frontend format
            $responseData = [
                'id' => $assignedMealsMember->id,
                'date' => $assignedMealsMember->date ? $assignedMealsMember->date->format('Y-m-d') : null,
                'weight' => $assignedMealsMember->weight,
                'body' => $assignedMealsMember->body,
                'water' => $assignedMealsMember->water,
                'hunger' => $assignedMealsMember->hunger,
                'strength' => $assignedMealsMember->strength,
                'energy' => $assignedMealsMember->energy,
                'cardio' => $assignedMealsMember->cardio,
                'plan' => $assignedMealsMember->plan,
                'calories' => $assignedMealsMember->calories,
                'protein' => $assignedMealsMember->protein,
                'carbs' => $assignedMealsMember->carbs,
                'fat_macros' => $assignedMealsMember->fat_macros,
                'meal_deviations' => $assignedMealsMember->meal_deviations,
                'activities' => $assignedMealsMember->activities,
                'feel' => $assignedMealsMember->feel,
                'notes' => $assignedMealsMember->notes,
            ];

            return response()->json([
                'success' => true,
                'message' => 'Nutrition log updated successfully',
                'data' => $responseData
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating nutrition log: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AssignedMealsMember $assignedMealsMember): JsonResponse
    {
        try {
            $assignedMealsMember->delete();

            return response()->json([
                'success' => true,
                'message' => 'Nutrition log deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting nutrition log: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all nutrition assessments for a specific member
     */
    public function getMemberAssessments(Request $request, $memberId): JsonResponse
    {
        try {
            // Validate member exists
            $member = \App\Models\Member::find($memberId);
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found'
                ], 404);
            }

            // Get gym_id from authenticated user
            $gymId = $request->user('api')->gym_id ?? null;

            // Fetch all nutrition logs for this member
            $query = AssignedMealsMember::where('member_id', $memberId)
                ->orderBy('date', 'desc');

            // Optionally filter by gym_id if provided
            if ($gymId) {
                $query->where('gym_id', $gymId);
            }

            $assessments = $query->get();

            // Transform data to match frontend format
            $transformedAssessments = $assessments->map(function ($log) {
                return [
                    'id' => $log->id,
                    'date' => $log->date ? $log->date->format('Y-m-d') : null,
                    'weight' => $log->weight,
                    'bodyFat' => $log->body,
                    'waterIntake' => $log->water,
                    'hunger' => $log->hunger,
                    'strength' => $log->strength,
                    'energy' => $log->energy,
                    'cardio' => $log->cardio,
                    'plan' => $log->plan,
                    'calories' => $log->calories,
                    'protein' => $log->protein,
                    'carb' => $log->carbs,
                    'fat' => $log->fat_macros,
                    'mealDeviations' => $log->meal_deviations,
                    'activities' => $log->activities,
                    'feel' => $log->feel,
                    'notes' => $log->notes,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedAssessments,
                'member' => [
                    'id' => $member->id,
                    'name' => ($member->firstname ?? '') . ' ' . ($member->lastname ?? ''),
                    'membername' => $member->membername ?? null,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching member assessments: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get member notes
     */
    public function getMemberNotes(Request $request, $memberId): JsonResponse
    {
        try {
            // Verify member exists
            $member = Member::find($memberId);
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found'
                ], 404);
            }

            // Get the most recent assessment entry for this member to retrieve notes
            // Notes are stored in the most recent assessment entry
            $mostRecentAssessment = AssignedMealsMember::where('member_id', $memberId)
                ->orderBy('date', 'desc')
                ->orderBy('updated_at', 'desc')
                ->first();

            $notes = $mostRecentAssessment ? ($mostRecentAssessment->notes ?? '') : '';

            return response()->json([
                'success' => true,
                'data' => [
                    'notes' => $notes
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching member notes: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update member notes
     */
    public function updateMemberNotes(Request $request, $memberId): JsonResponse
    {
        try {
            // Verify member exists
            $member = Member::find($memberId);
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found'
                ], 404);
            }

            // Validate request
            $validator = Validator::make($request->all(), [
                'notes' => 'nullable|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $notes = $request->input('notes', '');

            // Get the most recent assessment entry for this member
            // If none exists, create a new one with today's date
            $mostRecentAssessment = AssignedMealsMember::where('member_id', $memberId)
                ->orderBy('date', 'desc')
                ->orderBy('updated_at', 'desc')
                ->first();

            if ($mostRecentAssessment) {
                // Update notes in the most recent assessment
                $mostRecentAssessment->notes = $notes;
                $mostRecentAssessment->save();
            } else {
                // Create a new assessment entry with today's date to store notes
                AssignedMealsMember::create([
                    'member_id' => $memberId,
                    'date' => now()->format('Y-m-d'),
                    'notes' => $notes
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Notes updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating member notes: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get recent messages for the recent messages tab
     */
    public function getRecentMessages(): JsonResponse
    {
        try {
            // Get recent nutrition logs with member info
            $recentLogs = AssignedMealsMember::with('member')
                ->whereHas('member')
                ->orderBy('updated_at', 'desc')
                ->limit(10)
                ->get();

            $recentMessages = $recentLogs->map(function ($log) {
                return [
                    'user' => $log->member ? $log->member->firstname . ' ' . $log->member->lastname : 'Unknown',
                    'lastMessage' => $log->notes ? substr($log->notes, 0, 50) . '...' : 'No message',
                    'date' => $log->updated_at->format('m/d/Y'),
                    'log_id' => $log->id
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $recentMessages
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching recent messages: ' . $e->getMessage()
            ], 500);
        }
    }
}