<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NutritionPlan;
use App\Models\Member;

class NutritionPlanController extends Controller
{
    /**
     * Test method to check if controller is working
     */
    public function test()
    {
        return response()->json([
            'success' => true,
            'message' => 'NutritionPlanController is working!',
            'timestamp' => now()
        ]);
    }

    /**
     * Display all nutrition plans
     */
    public function index(Request $request)
    {
        try {
            $query = NutritionPlan::with(['member', 'gym']);

            // Apply filters if provided
            if ($request->has('member_id') && $request->member_id) {
                $query->where('member_id', $request->member_id);
            }

            if ($request->has('gym_id') && $request->gym_id) {
                $query->where('gym_id', $request->gym_id);
            }

            if ($request->has('start_date') && $request->start_date) {
                $query->where('start_date', '>=', $request->start_date);
            }

            if ($request->has('end_date') && $request->end_date) {
                $query->where('end_date', '<=', $request->end_date);
            }

            $nutritionPlans = $query->orderBy('created_at', 'desc')->get();

            return response()->json([
                'success' => true,
                'data' => $nutritionPlans,
                'message' => 'Nutrition plans retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching nutrition plans: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a new nutrition plan for a member
     */
    public function store(Request $request)
    {
        $request->validate([
            'member_id' => 'required|exists:members,id',
            'nutrition_plan' => 'required|string|max:255',
            'start_date' => 'required|date',
            'duration' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        try {
            // Get the member to get their gym_id
            $member = Member::findOrFail($request->member_id);
            
            // Check for duplicate active nutrition plans
            $existingPlan = NutritionPlan::where('member_id', $request->member_id)
                ->where('nutrition_plan', $request->nutrition_plan)
                ->where(function($query) {
                    $query->whereNull('end_date')
                          ->orWhere('end_date', '>', now());
                })
                ->first();
            
            if ($existingPlan) {
                return response()->json([
                    'success' => false,
                    'message' => 'This member already has an active nutrition plan "' . $request->nutrition_plan . '". Please choose a different plan or update the existing one.'
                ], 422);
            }
            
            // Set default gym_id to 1 if member doesn't have one
            $gymId = $member->gym_id ?? 1;
            
            // Calculate end_date based on duration if provided
            $endDate = null;
            if ($request->duration && $request->start_date) {
                $startDate = \Carbon\Carbon::parse($request->start_date);
                switch ($request->duration) {
                    case '1_week':
                        $endDate = $startDate->copy()->addWeek();
                        break;
                    case '2_weeks':
                        $endDate = $startDate->copy()->addWeeks(2);
                        break;
                    case '1_month':
                        $endDate = $startDate->copy()->addMonth();
                        break;
                    case '2_months':
                        $endDate = $startDate->copy()->addMonths(2);
                        break;
                    case '3_months':
                        $endDate = $startDate->copy()->addMonths(3);
                        break;
                    case '6_months':
                        $endDate = $startDate->copy()->addMonths(6);
                        break;
                    case '1_year':
                        $endDate = $startDate->copy()->addYear();
                        break;
                    case 'ongoing':
                        $endDate = null; // No end date for ongoing plans
                        break;
                    default:
                        $endDate = null;
                }
            }
            
            $nutritionPlan = NutritionPlan::create([
                'member_id' => $request->member_id,
                'gym_id' => $gymId,
                'nutrition_plan' => $request->nutrition_plan,
                'start_date' => $request->start_date,
                'end_date' => $endDate ? $endDate->toDateString() : null,
                'duration' => $request->duration,
                'description' => $request->description,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Nutrition plan saved successfully',
                'data' => $nutritionPlan
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error saving nutrition plan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display a specific nutrition plan
     */
    public function show($id)
    {
        try {
            $nutritionPlan = NutritionPlan::with(['template.category', 'template.details.food'])
                ->find($id);

            if (!$nutritionPlan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Nutrition plan not found'
                ], 404);
            }

            $transformedPlan = [
                'id' => $nutritionPlan->id,
                'name' => $nutritionPlan->nutrition_plan,
                'description' => $nutritionPlan->description,
                'start_date' => $nutritionPlan->start_date->format('Y-m-d'),
                'end_date' => $nutritionPlan->end_date ? $nutritionPlan->end_date->format('Y-m-d') : null,
                'duration' => $nutritionPlan->duration,
                'template' => $this->transformNutritionTemplate($nutritionPlan->template),
                'created_at' => $nutritionPlan->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $nutritionPlan->updated_at->format('Y-m-d H:i:s')
            ];

            return response()->json([
                'success' => true,
                'data' => $transformedPlan
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching nutrition plan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get nutrition plans for a specific member
     */
    public function getMemberNutritionPlans($memberId)
    {
        try {
            $nutritionPlans = NutritionPlan::where('member_id', $memberId)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $nutritionPlans
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching nutrition plans: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update a nutrition plan
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nutrition_plan' => 'required|string|max:255',
            'start_date' => 'required|date',
            'duration' => 'nullable|string',
            'description' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        try {
            $nutritionPlan = NutritionPlan::findOrFail($id);
            
            // Calculate end_date based on duration if provided
            $endDate = null;
            if ($request->duration && $request->start_date) {
                $startDate = \Carbon\Carbon::parse($request->start_date);
                switch ($request->duration) {
                    case '1_week':
                        $endDate = $startDate->copy()->addWeek();
                        break;
                    case '2_weeks':
                        $endDate = $startDate->copy()->addWeeks(2);
                        break;
                    case '1_month':
                        $endDate = $startDate->copy()->addMonth();
                        break;
                    case '2_months':
                        $endDate = $startDate->copy()->addMonths(2);
                        break;
                    case '3_months':
                        $endDate = $startDate->copy()->addMonths(3);
                        break;
                    case '6_months':
                        $endDate = $startDate->copy()->addMonths(6);
                        break;
                    case '1_year':
                        $endDate = $startDate->copy()->addYear();
                        break;
                    case 'ongoing':
                        $endDate = null; // No end date for ongoing plans
                        break;
                    default:
                        $endDate = null;
                }
            }
            
            $nutritionPlan->update([
                'nutrition_plan' => $request->nutrition_plan,
                'start_date' => $request->start_date,
                'end_date' => $endDate ? $endDate->toDateString() : null,
                'duration' => $request->duration,
                'description' => $request->description,
                'notes' => $request->notes,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Nutrition plan updated successfully',
                'data' => $nutritionPlan
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating nutrition plan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a nutrition plan
     */
    public function destroy($id)
    {
        try {
            $nutritionPlan = NutritionPlan::findOrFail($id);
            $nutritionPlan->delete();

            return response()->json([
                'success' => true,
                'message' => 'Nutrition plan deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting nutrition plan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Transform nutrition template data for API response
     */
    private function transformNutritionTemplate($template)
    {
        if (!$template) {
            return null;
        }

        return [
            'id' => $template->id,
            'name' => $template->name,
            'description' => $template->description,
            'calories' => $template->calories,
            'protein' => $template->protein,
            'carbs' => $template->carbs,
            'fats' => $template->fats,
            'meal_image' => $template->meal_image ? url($template->meal_image) : null,
            'category' => $template->category ? [
                'id' => $template->category->id,
                'name' => $template->category->name,
                'color' => $template->category->color,
                'icon' => $template->category->icon
            ] : null,
            'details' => $template->details ? $template->details->map(function ($detail) {
                return [
                    'id' => $detail->id,
                    'nutrition_type' => $detail->nutrition_type,
                    'quantity' => $detail->quantity,
                    'calories' => $detail->calories,
                    'protein' => $detail->protein,
                    'carbs' => $detail->carbs,
                    'fats' => $detail->fats,
                    'food' => $detail->food ? [
                        'id' => $detail->food->id,
                        'name' => $detail->food->name,
                        'description' => $detail->food->description,
                        'serving_description' => $detail->food->serving_description,
                        'calories' => $detail->food->calories,
                        'protein' => $detail->food->protein,
                        'carbs' => $detail->food->carbohydrate,
                        'fats' => $detail->food->fat,
                        'fiber' => $detail->food->fiber,
                        'sugar' => $detail->food->sugar
                    ] : null
                ];
            }) : []
        ];
    }
}
