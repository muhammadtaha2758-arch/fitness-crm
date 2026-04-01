<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\AssignedMealsMember;
use App\Models\AssignedMealsMemberDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\JsonResponse;

class MemberWeeklyProgressController extends Controller
{
    /**
     * Get all weekly progress entries for the authenticated member
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $member = $request->get('auth_member');
    
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not authenticated'
                ], 401);
            }
    
            // Fetch all progress records for this member, ordered by date descending
            $progressRecords = AssignedMealsMember::where('member_id', $member->member_id)
                ->orderBy('date', 'desc')
                ->orderBy('created_at', 'desc')
                ->get();
    
            // Format response data
            $formattedData = $progressRecords->map(function ($progress) {
                return [
                    'id' => $progress->id,
                    'date' => $progress->date,
                    'weight' => $progress->weight,
                    'bodyFat' => $progress->body_fat,
                    'waterIntake' => $progress->water_intake,
                    'hunger' => $progress->hunger,
                    'strength' => $progress->strength,
                    'energy' => $progress->energy,
                    'cardio' => $progress->cardio_plan,
                    'plan' => $progress->plan,
                    'calories' => $progress->calories,
                    'protein' => $progress->protein,
                    'carb' => $progress->carbs,
                    'fat' => $progress->fat,
                    'mealDeviations' => $progress->meal_deviations,
                    'activities' => $progress->activities,
                    'feel' => $progress->feel,
                    'notes' => $progress->notes,
                    'createdAt' => $progress->created_at ? $progress->created_at->toISOString() : null,
                    'updatedAt' => $progress->updated_at ? $progress->updated_at->toISOString() : null,
                ];
            });
    
            return response()->json([
                'success' => true,
                'data' => $formattedData
            ], 200);
    
        } catch (\Exception $e) {
            Log::error('Error fetching weekly progress: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
    
            return response()->json([
                'success' => false,
                'message' => 'Error fetching weekly progress: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a new weekly progress entry
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $member = $request->get('auth_member');
    
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not authenticated'
                ], 401);
            }
    
            // Validate request
            $validator = Validator::make($request->all(), [
                'date' => 'required|date',
                'weight' => 'nullable|numeric|min:0|max:1000',
                'bodyFat' => 'nullable|numeric|min:0|max:100',
                'waterIntake' => 'nullable|numeric|min:0|max:20',
                'hunger' => 'nullable|string|max:255',
                'strength' => 'nullable|string|max:255',
                'energy' => 'nullable|string|max:255',
                'cardio' => 'nullable|string|max:255',
                'plan' => 'nullable|string|max:255',
                'calories' => 'nullable|numeric|min:0',
                'protein' => 'nullable|numeric|min:0',
                'carb' => 'nullable|numeric|min:0',
                'fat' => 'nullable|numeric|min:0',
                'mealDeviations' => 'nullable|string',
                'activities' => 'nullable|string',
                'feel' => 'nullable|string|max:255',
                'notes' => 'nullable|string|max:2000',
            ]);
    
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }
    
            // Save progress record
            $progress = AssignedMealsMember::create([
                'member_id' => $member->member_id,
                'gym_id' => $member->gym_id ?? 1,
                'date' => $request->date,
                'weight' => $request->weight,
                'body_fat' => $request->bodyFat,
                'water_intake' => $request->waterIntake,
                'hunger' => $request->hunger,
                'strength' => $request->strength,
                'energy' => $request->energy,
                'cardio_plan' => $request->cardio,
                'plan' => $request->plan,
                'calories' => $request->calories,
                'protein' => $request->protein,
                'carbs' => $request->carb,
                'fat' => $request->fat,
                'meal_deviations' => $request->mealDeviations,
                'activities' => $request->activities,
                'feel' => $request->feel,
                'notes' => $request->notes,
            ]);
    
            // Format response to match desired output
            $responseData = [
                'id' => $progress->id,
                'date' => $progress->date,
                'weight' => $progress->weight,
                'bodyFat' => $progress->body_fat,
                'waterIntake' => $progress->water_intake,
                'hunger' => $progress->hunger,
                'strength' => $progress->strength,
                'energy' => $progress->energy,
                'cardio' => $progress->cardio_plan,
                'plan' => $progress->plan,
                'calories' => $progress->calories,
                'protein' => $progress->protein,
                'carb' => $progress->carbs,
                'fat' => $progress->fat,
                'mealDeviations' => $progress->meal_deviations,
                'activities' => $progress->activities,
                'feel' => $progress->feel,
                'notes' => $progress->notes,
            ];
    
            return response()->json([
                'success' => true,
                'message' => 'Weekly progress saved successfully',
                'data' => $responseData
            ], 201);
    
        } catch (\Exception $e) {
            Log::error('Error saving weekly progress: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
    
            return response()->json([
                'success' => false,
                'message' => 'Error saving weekly progress: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get detailed information for a specific weekly progress entry
     * Includes meal details from assigned_meals_member_details table
     * 
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function show(Request $request, $id): JsonResponse
    {
        try {
            $member = $request->get('auth_member');
    
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not authenticated'
                ], 401);
            }
    
            // Fetch the progress record and verify it belongs to the member
            $progress = AssignedMealsMember::where('id', $id)
                ->where('member_id', $member->member_id)
                ->first();
    
            if (!$progress) {
                return response()->json([
                    'success' => false,
                    'message' => 'Progress record not found'
                ], 404);
            }
    
            // Fetch meal details for this progress record
            $mealDetails = AssignedMealsMemberDetail::where('assigned_meal_id', $id)
                ->where('member_id', $member->member_id)
                ->with(['food' => function($query) {
                    $query->select('id', 'name');
                }])
                ->orderBy('nutrition_type')
                ->get();
    
            // Format meal details by nutrition type
            $formattedMealDetails = [];
            foreach ($mealDetails as $detail) {
                $nutritionType = $detail->nutrition_type;
                if (!isset($formattedMealDetails[$nutritionType])) {
                    $formattedMealDetails[$nutritionType] = [];
                }
                
                $formattedMealDetails[$nutritionType][] = [
                    'id' => $detail->id,
                    'foodId' => $detail->food_id,
                    'foodName' => $detail->food ? ($detail->food->name ?? 'Unknown') : 'Unknown',
                    'nutritionType' => $detail->nutrition_type,
                    'labelServing' => $detail->label_serving,
                    'unit' => $detail->unit,
                    'quantity' => $detail->quantity,
                    'calories' => $detail->calories,
                    'protein' => $detail->protein,
                    'carbs' => $detail->carbs,
                    'fats' => $detail->fats,
                    'notes' => $detail->notes,
                ];
            }
    
            // Format response data
            $responseData = [
                'id' => $progress->id,
                'date' => $progress->date,
                'weight' => $progress->weight,
                'bodyFat' => $progress->body_fat,
                'waterIntake' => $progress->water_intake,
                'hunger' => $progress->hunger,
                'strength' => $progress->strength,
                'energy' => $progress->energy,
                'cardio' => $progress->cardio_plan,
                'plan' => $progress->plan,
                'calories' => $progress->calories,
                'protein' => $progress->protein,
                'carb' => $progress->carbs,
                'fat' => $progress->fat,
                'mealDeviations' => $progress->meal_deviations,
                'activities' => $progress->activities,
                'feel' => $progress->feel,
                'notes' => $progress->notes,
                'createdAt' => $progress->created_at ? $progress->created_at->toISOString() : null,
                'updatedAt' => $progress->updated_at ? $progress->updated_at->toISOString() : null,
                'mealDetails' => $formattedMealDetails,
            ];
    
            return response()->json([
                'success' => true,
                'data' => $responseData
            ], 200);
    
        } catch (\Exception $e) {
            Log::error('Error fetching weekly progress details: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
    
            return response()->json([
                'success' => false,
                'message' => 'Error fetching weekly progress details: ' . $e->getMessage()
            ], 500);
        }
    }
}

