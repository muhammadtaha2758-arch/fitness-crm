<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\Nutrition;
use App\Models\NutritionDetail;
use App\Models\NutritionCategory;
use App\Models\Food;
use App\Models\AssignedMealsMember;
use App\Models\MealPlanTemplate;
use App\Models\MealPlanTemplateDetail;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class MobileNutritionController extends Controller
{
    /**
     * Get member's nutrition plans
     */
   
     public function index(Request $request)
     {
         try {
             $member = $request->get('auth_member');
     
             if (!$member || !$member->gym_id) {
                 return response()->json([
                     'success' => false,
                     'message' => 'Member not associated with any gym'
                 ], 400);
             }
     
             $gymId = $member->gym_id;
     
             // Get filter parameters from request
             $categories = $request->get('categories', []); // Array of category IDs or names
             $caloriesRange = $request->get('calories_range'); // 'low', 'medium', 'high'
             $macronutrientFocus = $request->get('macronutrient_focus', []); // Array: ['high_protein', 'low_carb', 'high_carb', 'balanced']
             $search = $request->get('search', ''); // Search by name
             
             // Handle categories if it comes as a string (comma-separated)
             if (is_string($categories)) {
                 $categories = !empty($categories) ? explode(',', $categories) : [];
             }
             
             // Handle macronutrient_focus if it comes as a string (comma-separated)
             if (is_string($macronutrientFocus)) {
                 $macronutrientFocus = !empty($macronutrientFocus) ? explode(',', $macronutrientFocus) : [];
             }
     
             // Start building query
             $query = MealPlanTemplate::with(['category', 'details.food'])
                 ->where('gym_id', $gymId)
                 ->whereNull('deleted_at');
     
             // Filter by categories
             if (!empty($categories) && is_array($categories)) {
                 // Handle both category IDs and category names
                 $categoryIds = [];
                 $categoryNames = [];
                 
                 foreach ($categories as $category) {
                     $category = trim($category);
                     if (empty($category)) continue;
                     
                     if (is_numeric($category)) {
                         $categoryIds[] = (int)$category;
                     } else {
                         $categoryNames[] = $category;
                     }
                 }
                 
                 // Only apply filter if we have at least one category to filter by
                 if (!empty($categoryIds) || !empty($categoryNames)) {
                     $query->where(function($q) use ($categoryIds, $categoryNames) {
                         if (!empty($categoryIds) && !empty($categoryNames)) {
                             // If both IDs and names are provided, match either
                             $q->whereHas('category', function($catQuery) use ($categoryIds, $categoryNames) {
                                 $catQuery->whereIn('id', $categoryIds)
                                          ->orWhereIn('name', $categoryNames);
                             });
                         } elseif (!empty($categoryIds)) {
                             // Only IDs provided
                             $q->whereHas('category', function($catQuery) use ($categoryIds) {
                                 $catQuery->whereIn('id', $categoryIds);
                             });
                         } elseif (!empty($categoryNames)) {
                             // Only names provided
                             $q->whereHas('category', function($catQuery) use ($categoryNames) {
                                 $catQuery->whereIn('name', $categoryNames);
                             });
                         }
                     });
                 }
             }
     
             // Filter by calories range
             if (!empty($caloriesRange)) {
                 $calories = $this->getCaloriesRange($caloriesRange);
                 if ($calories) {
                     // Handle both string and numeric calories values
                     $query->whereRaw('CAST(calories AS UNSIGNED) BETWEEN ? AND ?', [$calories['min'], $calories['max']]);
                 }
             }
     
             // Filter by macronutrient focus
             if (!empty($macronutrientFocus) && is_array($macronutrientFocus)) {
                 $query->where(function($q) use ($macronutrientFocus) {
                     $firstCondition = true;
                     foreach ($macronutrientFocus as $focus) {
                         $focus = trim($focus);
                         if (empty($focus)) continue;
                         
                         switch ($focus) {
                             case 'high_protein':
                                 // High protein: protein >= 150g or protein/carbs ratio > 0.8
                                 if ($firstCondition) {
                                     $q->where(function($proteinQuery) {
                                         $proteinQuery->whereRaw('CAST(protein AS DECIMAL(10,2)) >= 150')
                                                       ->orWhereRaw('(CAST(protein AS DECIMAL(10,2)) / NULLIF(CAST(carbs AS DECIMAL(10,2)), 0)) > 0.8');
                                     });
                                     $firstCondition = false;
                                 } else {
                                     $q->orWhere(function($proteinQuery) {
                                         $proteinQuery->whereRaw('CAST(protein AS DECIMAL(10,2)) >= 150')
                                                       ->orWhereRaw('(CAST(protein AS DECIMAL(10,2)) / NULLIF(CAST(carbs AS DECIMAL(10,2)), 0)) > 0.8');
                                     });
                                 }
                                 break;
                             case 'low_carb':
                                 // Low carb: carbs < 100g
                                 if ($firstCondition) {
                                     $q->whereRaw('CAST(carbs AS DECIMAL(10,2)) < 100');
                                     $firstCondition = false;
                                 } else {
                                     $q->orWhereRaw('CAST(carbs AS DECIMAL(10,2)) < 100');
                                 }
                                 break;
                             case 'high_carb':
                                 // High carb: carbs >= 200g
                                 if ($firstCondition) {
                                     $q->whereRaw('CAST(carbs AS DECIMAL(10,2)) >= 200');
                                     $firstCondition = false;
                                 } else {
                                     $q->orWhereRaw('CAST(carbs AS DECIMAL(10,2)) >= 200');
                                 }
                                 break;
                             case 'balanced':
                                 // Balanced: protein between 100-150g, carbs between 150-250g, fats between 50-80g
                                 if ($firstCondition) {
                                     $q->where(function($balancedQuery) {
                                         $balancedQuery->whereRaw('CAST(protein AS DECIMAL(10,2)) BETWEEN 100 AND 150')
                                                        ->whereRaw('CAST(carbs AS DECIMAL(10,2)) BETWEEN 150 AND 250')
                                                        ->whereRaw('CAST(fats AS DECIMAL(10,2)) BETWEEN 50 AND 80');
                                     });
                                     $firstCondition = false;
                                 } else {
                                     $q->orWhere(function($balancedQuery) {
                                         $balancedQuery->whereRaw('CAST(protein AS DECIMAL(10,2)) BETWEEN 100 AND 150')
                                                        ->whereRaw('CAST(carbs AS DECIMAL(10,2)) BETWEEN 150 AND 250')
                                                        ->whereRaw('CAST(fats AS DECIMAL(10,2)) BETWEEN 50 AND 80');
                                     });
                                 }
                                 break;
                         }
                     }
                 });
             }
     
             // Search by name
             if (!empty($search)) {
                 $query->where('name', 'LIKE', '%' . $search . '%');
             }
     
             // Execute query and order results
             $nutritionPlans = $query->orderBy('created_at', 'desc')->get();
     
             return response()->json([
                 'success' => true,
                 'data' => $nutritionPlans
             ]);
     
         } catch (\Exception $e) {
             \Log::error('Nutrition Index Error: ' . $e->getMessage());
             return response()->json([
                 'success' => false,
                 'message' => 'Server error: ' . $e->getMessage(),
             ], 500);
         }
     }
     
     /**
      * Get calories range based on filter option
      */
     private function getCaloriesRange($range)
     {
         switch (strtolower($range)) {
             case 'low':
                 return ['min' => 0, 'max' => 1500];
             case 'medium':
                 return ['min' => 1500, 'max' => 2500];
             case 'high':
                 return ['min' => 2500, 'max' => 10000];
             default:
                 return null;
         }
     }
     
    
    
    



    /**
     * Get specific nutrition plan details
     * Handles MealPlanTemplate (template from all plans)
     */
    public function show(Request $request, $id)
    {
        try {
            $member = $request->get('auth_member');
            
            // Get MealPlanTemplate (from all nutrition plans)
            $mealPlanTemplate = MealPlanTemplate::with(['category', 'details.food'])
                ->where('id', $id)
                ->where('gym_id', $member->gym_id)
                ->whereNull('deleted_at')
                ->first();

            if ($mealPlanTemplate) {
                // Return MealPlanTemplate details (transformed to match expected structure)
                $transformedTemplate = [
                    'id' => $mealPlanTemplate->id,
                    'name' => $mealPlanTemplate->name,
                    'description' => $mealPlanTemplate->description,
                    'calories' => $mealPlanTemplate->calories,
                    'protein' => $mealPlanTemplate->protein,
                    'carbs' => $mealPlanTemplate->carbs,
                    'fats' => $mealPlanTemplate->fats,
                    'target_calories' => $mealPlanTemplate->target_calories,
                    'target_protein' => $mealPlanTemplate->target_protein,
                    'target_carbs' => $mealPlanTemplate->target_carbs,
                    'target_fat' => $mealPlanTemplate->target_fat,
                    'meal_image' => $mealPlanTemplate->meal_image ? url($mealPlanTemplate->meal_image) : null,
                    'instructions' => $mealPlanTemplate->instructions,
                    'meals_time' => $mealPlanTemplate->meals_time,
                    'category' => $mealPlanTemplate->category ? [
                        'id' => $mealPlanTemplate->category->id,
                        'name' => $mealPlanTemplate->category->name,
                        'color' => $mealPlanTemplate->category->color,
                        'icon' => $mealPlanTemplate->category->icon,
                    ] : null,
                    'details' => $mealPlanTemplate->details ? $mealPlanTemplate->details->map(function ($detail) {
                        return [
                            'id' => $detail->id,
                            'nutrition_type' => $detail->nutrition_type,
                            'quantity' => $detail->quantity,
                            'serving_grams' => $detail->serving_grams ?? null,
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
                                'carbohydrate' => $detail->food->carbohydrate,
                                'fat' => $detail->food->fat,
                                'fiber' => $detail->food->fiber,
                                'sugar' => $detail->food->sugar,
                            ] : null,
                        ];
                    }) : [],
                    'created_at' => $mealPlanTemplate->created_at ? $mealPlanTemplate->created_at->format('Y-m-d H:i:s') : null,
                    'updated_at' => $mealPlanTemplate->updated_at ? $mealPlanTemplate->updated_at->format('Y-m-d H:i:s') : null
                ];

                return response()->json([
                    'success' => true,
                    'data' => $transformedTemplate
                ], 200);
            }

            // If not found, return 404
            return response()->json([
                'success' => false,
                'message' => 'Nutrition plan not found or not accessible',
            ], 404);

        } catch (\Exception $e) {
            \Log::error('Get nutrition plan error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get member's current nutrition plan
     */
    public function current(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            // Get current active assigned meal for this member
            $currentAssignedMeal = AssignedMealsMember::with(['template.category', 'template.details.food'])
                ->where('member_id', $member->member_id)
                ->where(function($query) {
                    $query->whereNull('end_date')
                          ->orWhere('end_date', '>=', now()->format('Y-m-d'));
                })
                ->orderBy('start_date', 'desc')
                ->first();

            if (!$currentAssignedMeal || !$currentAssignedMeal->template) {
                return response()->json([
                    'success' => false,
                    'message' => 'No active nutrition plan found',
                ], 404);
            }

            $transformedPlan = [
                'id' => $currentAssignedMeal->id,
                'name' => $currentAssignedMeal->template->name,
                'description' => $currentAssignedMeal->description,
                'start_date' => $currentAssignedMeal->start_date ? $currentAssignedMeal->start_date->format('Y-m-d') : null,
                'end_date' => $currentAssignedMeal->end_date ? $currentAssignedMeal->end_date->format('Y-m-d') : null,
                'duration' => $currentAssignedMeal->duration,
                'template' => $this->transformNutritionTemplate($currentAssignedMeal->template),
                'created_at' => $currentAssignedMeal->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $currentAssignedMeal->updated_at->format('Y-m-d H:i:s')
            ];

            return response()->json([
                'success' => true,
                'data' => $transformedPlan
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get current nutrition plan error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get nutrition statistics for member
     */
    public function statistics(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            // Get nutrition statistics for this member using AssignedMealsMember
            $totalPlans = AssignedMealsMember::where('member_id', $member->member_id)->count();
            $activePlans = AssignedMealsMember::where('member_id', $member->member_id)
                ->where(function($query) {
                    $query->whereNull('end_date')
                          ->orWhere('end_date', '>=', now()->format('Y-m-d'));
                })
                ->count();
            $completedPlans = AssignedMealsMember::where('member_id', $member->member_id)
                ->where('end_date', '<', now()->format('Y-m-d'))
                ->count();

            // Get current plan if exists
            $currentAssignedMeal = AssignedMealsMember::with(['template'])
                ->where('member_id', $member->member_id)
                ->where(function($query) {
                    $query->whereNull('end_date')
                          ->orWhere('end_date', '>=', now()->format('Y-m-d'));
                })
                ->first();

            $statistics = [
                'total_plans' => $totalPlans,
                'active_plans' => $activePlans,
                'completed_plans' => $completedPlans,
                'current_plan' => $currentAssignedMeal && $currentAssignedMeal->template ? [
                    'id' => $currentAssignedMeal->id,
                    'name' => $currentAssignedMeal->template->name,
                    'start_date' => $currentAssignedMeal->start_date ? $currentAssignedMeal->start_date->format('Y-m-d') : null,
                    'end_date' => $currentAssignedMeal->end_date ? $currentAssignedMeal->end_date->format('Y-m-d') : null,
                    'template' => [
                        'id' => $currentAssignedMeal->template->id,
                        'name' => $currentAssignedMeal->template->name,
                        'calories' => $currentAssignedMeal->template->calories,
                        'protein' => $currentAssignedMeal->template->protein,
                        'carbs' => $currentAssignedMeal->template->carbs,
                        'fats' => $currentAssignedMeal->template->fats
                    ]
                ] : null
            ];

            return response()->json([
                'success' => true,
                'data' => $statistics
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get nutrition statistics error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get available nutrition categories
     */
    public function getCategories(Request $request)
    {
        try {
            $categories = NutritionCategory::where('is_active', true)
                ->orderBy('sort_order', 'asc')
                ->get(['id', 'name', 'description', 'color', 'icon']);

            return response()->json([
                'success' => true,
                'data' => $categories
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get nutrition categories error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get available nutrition templates for the member
     * This includes both public templates and personal templates created by the member
     */
    public function getAvailableTemplates(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            // Get nutrition templates that are available to this member:
            // 1. Public templates (visibility = 'all_members')
            // 2. Personal templates created by this member (visibility = 'only_me' AND created_by = member_id)
            $templates = Nutrition::with(['category', 'details.food'])
                ->where('gym_id', $member->gym_id)
                ->where('status', 1) // Only active templates
                ->where(function($query) use ($member) {
                    $query->where('visibility', 'all_members')
                          ->orWhere(function($q) use ($member) {
                              $q->where('visibility', 'only_me')
                                ->where('created_by', $member->id)
                                ->where('created_by_type', 'member');
                          });
                })
                ->orderBy('name', 'asc')
                ->get();

            $transformedTemplates = $templates->map(function ($template) {
                return [
                    'id' => $template->id,
                    'name' => $template->name,
                    'description' => $template->description,
                    'calories' => $template->calories,
                    'protein' => $template->protein,
                    'carbs' => $template->carbs,
                    'fats' => $template->fats,
                    'meal_image' => $template->meal_image ? url($template->meal_image) : null,
                    'visibility' => $template->visibility,
                    'category' => $template->category ? [
                        'id' => $template->category->id,
                        'name' => $template->category->name,
                        'color' => $template->category->color,
                        'icon' => $template->category->icon
                    ] : null,
                    'details' => $template->details->map(function ($detail) {
                        return [
                            'id' => $detail->id,
                            'nutrition_type' => $detail->nutrition_type,
                            'quantity' => $detail->quantity,
                            'serving_grams' => $detail->serving_grams ?? null,
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
                    })
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedTemplates
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get available nutrition templates error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get nutrition plan by date
     */
    public function getByDate(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            $validator = Validator::make($request->all(), [
                'date' => 'required|date_format:Y-m-d'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 400);
            }

            $date = $request->date;
            
            // Get assigned meal active on this date for this member
            $assignedMeal = AssignedMealsMember::with(['template.category', 'template.details.food'])
                ->where('member_id', $member->member_id)
                ->where(function($query) use ($date) {
                    $query->where('date', $date)
                          ->orWhere(function($q) use ($date) {
                              $q->where('start_date', '<=', $date)
                                ->where(function($subQ) use ($date) {
                                    $subQ->whereNull('end_date')
                                          ->orWhere('end_date', '>=', $date);
                                });
                          });
                })
                ->orderBy('start_date', 'desc')
                ->first();

            if (!$assignedMeal || !$assignedMeal->template) {
                return response()->json([
                    'success' => false,
                    'message' => 'No nutrition plan found for this date',
                ], 404);
            }

            $transformedPlan = [
                'id' => $assignedMeal->id,
                'name' => $assignedMeal->template->name,
                'description' => $assignedMeal->description,
                'date' => $date,
                'template' => $this->transformNutritionTemplate($assignedMeal->template),
                'created_at' => $assignedMeal->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $assignedMeal->updated_at->format('Y-m-d H:i:s')
            ];

            return response()->json([
                'success' => true,
                'data' => $transformedPlan
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get nutrition plan by date error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Transform nutrition template data for mobile app
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
            'details' => $template->details->map(function ($detail) {
                return [
                    'id' => $detail->id,
                    'nutrition_type' => $detail->nutrition_type,
                    'quantity' => $detail->quantity,
                    'serving_grams' => $detail->serving_grams ?? null,
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
            })
        ];
    }

    /**
     * Create a new nutrition plan for the member
     */
    public function store(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            // Get coach_id from members table
            // Query the member from database to get coach_id from members table
            $memberId = $member->member_id ?? $member->id;
            $memberRecord = Member::find($memberId);
            
            // Get coach_id from members table - ensure it's null if 0 or empty (to satisfy foreign key constraint)
            $coachId = null;
            if ($memberRecord && isset($memberRecord->coach_id) && $memberRecord->coach_id > 0) {
                $coachId = $memberRecord->coach_id;
            }
            
            // Validate request data
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'template_id' => 'nullable|integer|exists:meal_plans_template,id',
                'meal_image' => 'nullable|image|max:5120', // 5MB max
                'calories' => 'nullable|string',
                'protein' => 'nullable|string',
                'carbs' => 'nullable|string',
                'fats' => 'nullable|string',
                'food_items' => 'nullable|array',
                'food_items.*.food_id' => 'required_with:food_items|integer|exists:foods,id',
                'food_items.*.nutrition_type' => 'required_with:food_items|string|in:breakfast,lunch,dinner,snack,snack_morning,snack_afternoon,snack_evening',
                'food_items.*.quantity' => 'required_with:food_items|numeric|min:0.1',
                'food_items.*.calories' => 'required_with:food_items|numeric|min:0',
                'food_items.*.protein' => 'required_with:food_items|numeric|min:0',
                'food_items.*.carbs' => 'required_with:food_items|numeric|min:0',
                'food_items.*.fats' => 'required_with:food_items|numeric|min:0',
                'food_items.*.serving_grams' => 'nullable|numeric|min:0'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 400);
            }

            // Handle image upload if provided
            $imagePath = null;
            if ($request->hasFile('meal_image')) {
                $image = $request->file('meal_image');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                
                // Create directory if it doesn't exist
                $uploadPath = public_path('images/nutrition_images');
                if (!file_exists($uploadPath)) {
                    mkdir($uploadPath, 0755, true);
                }
                
                // Move file to public/images/nutrition_images
                $image->move($uploadPath, $imageName);
                $imagePath = 'images/nutrition_images/' . $imageName;
            }

            // Create meal plan template if food items are provided
            $templateId = $request->template_id;
            if ($request->has('food_items') && !empty($request->food_items)) {
                // Extract all food IDs from the request
                $foodIds = array_column($request->food_items, 'food_id');
                
                // Select and validate foods from foods table
                $foods = Food::whereIn('id', $foodIds)->get();
                
                // Check if all food IDs exist
                $foundFoodIds = $foods->pluck('id')->toArray();
                $missingFoodIds = array_diff($foodIds, $foundFoodIds);
                
                if (!empty($missingFoodIds)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Some foods not found',
                        'errors' => [
                            'food_items' => 'The following food IDs do not exist: ' . implode(', ', $missingFoodIds)
                        ]
                    ], 400);
                }
                
                // Create a map of food_id => food for quick lookup
                $foodsMap = $foods->keyBy('id');
                
                $templateData = [
                    'gym_id' => $member->gym_id,
                    'name' => $request->name,
                    'description' => $request->description,
                    'visibility' => 'only_me', // Member's personal template
                    'status' => 1,
                    'calories' => $request->calories ?? '0',
                    'protein' => $request->protein ?? '0',
                    'carbs' => $request->carbs ?? '0',
                    'fats' => $request->fats ?? '0',
                    'meal_image' => $imagePath,
                    'created_by' => $member->id,
                    'created_by_type' => 'member'
                ];
                
                // Only add coach_id if it's not null
                if ($coachId !== null) {
                    $templateData['coach_id'] = $coachId;
                }
                
                $mealPlanTemplate = MealPlanTemplate::create($templateData);

                if (!$mealPlanTemplate || !$mealPlanTemplate->id) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to create meal plan template'
                    ], 500);
                }

                $templateId = $mealPlanTemplate->id;

                // Create meal plan template details for each food item using foods from foods table
                foreach ($request->food_items as $foodItem) {
                    $food = $foodsMap->get($foodItem['food_id']);
                    
                    if (!$food) {
                        continue; // Skip if food not found (shouldn't happen due to validation above)
                    }
                    
                    // Prepare insert data
                    $detailData = [
                        'template_id' => $templateId,
                        'food_id' => $food->id,
                        'nutrition_type' => $foodItem['nutrition_type'],
                        'quantity' => $foodItem['quantity'],
                        'calories' => $foodItem['calories'],
                        'protein' => $foodItem['protein'],
                        'carbs' => $foodItem['carbs'],
                        'fats' => $foodItem['fats'],
                        'created_at' => now(),
                        'updated_at' => now()
                    ];
                    
                    // Add serving_grams if provided
                    if (isset($foodItem['serving_grams']) && $foodItem['serving_grams'] !== null) {
                        $detailData['serving_grams'] = $foodItem['serving_grams'];
                    }
                    
                    // Use DB::table() to ensure template_id is included
                    DB::table('meal_plan_template_details')->insert($detailData);
                }
            }

            // Create assigned meal for member
            if (!$templateId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Template ID is required. Please provide food items or an existing template ID.'
                ], 400);
            }

            $assignedMealData = [
                'member_id' => $member->member_id,
                'gym_id' => $member->gym_id,
                'template_id' => $templateId,
                'start_date' => now()->format('Y-m-d'),
                'end_date' => null,
                'description' => $request->description
            ];
            
            // Only add coach_id if it's not null
            if ($coachId !== null) {
                $assignedMealData['coach_id'] = $coachId;
            }
            
            $assignedMeal = AssignedMealsMember::create($assignedMealData);

            // Load the created assigned meal with relationships
            $createdMeal = AssignedMealsMember::with(['template.category', 'template.details.food'])
                ->where('id', $assignedMeal->id)
                ->first();

            $transformedPlan = [
                'id' => $createdMeal->id,
                'member_id' => $createdMeal->member_id,
                'gym_id' => $createdMeal->gym_id,
                'coach_id' => $createdMeal->coach_id,
                'date' => $createdMeal->date ? $createdMeal->date->format('Y-m-d') : null,
                'start_date' => $createdMeal->start_date ? $createdMeal->start_date->format('Y-m-d') : null,
                'end_date' => $createdMeal->end_date ? $createdMeal->end_date->format('Y-m-d') : null,
                'duration' => $createdMeal->duration,
                'description' => $createdMeal->description,
                'template' => $this->transformNutritionTemplate($createdMeal->template),
                'created_at' => $createdMeal->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $createdMeal->updated_at->format('Y-m-d H:i:s')
            ];

            return response()->json([
                'success' => true,
                'message' => 'Meal plan assigned successfully',
                'data' => $transformedPlan
            ], 201);

        } catch (\Exception $e) {
            \Log::error('Create assigned meal error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update an existing nutrition plan
     */
    public function update(Request $request, $id)
    {
        try {
            $member = $request->get('auth_member');
            
            // Check if assigned meal belongs to this member
            $assignedMeal = AssignedMealsMember::with(['template'])
                ->where('id', $id)
                ->where('member_id', $member->member_id)
                ->first();

            if (!$assignedMeal || !$assignedMeal->template) {
                return response()->json([
                    'success' => false,
                    'message' => 'Nutrition plan not found or not accessible',
                ], 404);
            }

            // Validate request data
            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|required|string|max:255',
                'description' => 'nullable|string',
                'start_date' => 'sometimes|required|date_format:Y-m-d',
                'end_date' => 'nullable|date_format:Y-m-d|after:start_date',
                'duration' => 'nullable|string|max:100',
                'meal_image' => 'nullable|image|max:5120',
                'food_items' => 'nullable|array',
                'food_items.*.food_id' => 'required_with:food_items|integer|exists:foods,id',
                'food_items.*.nutrition_type' => 'required_with:food_items|string|in:breakfast,lunch,dinner,snack,snack_morning,snack_afternoon,snack_evening',
                'food_items.*.quantity' => 'required_with:food_items|numeric|min:0.1',
                'food_items.*.calories' => 'required_with:food_items|numeric|min:0',
                'food_items.*.protein' => 'required_with:food_items|numeric|min:0',
                'food_items.*.carbs' => 'required_with:food_items|numeric|min:0',
                'food_items.*.fats' => 'required_with:food_items|numeric|min:0',
                'food_items.*.serving_grams' => 'nullable|numeric|min:0'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 400);
            }

            DB::beginTransaction();

            try {
                $template = $assignedMeal->template;

                // Update assigned meal
                $assignedMeal->update([
                    'start_date' => $request->start_date ?? $assignedMeal->start_date,
                    'end_date' => $request->end_date,
                    'duration' => $request->duration ?? $assignedMeal->duration,
                    'description' => $request->description ?? $assignedMeal->description
                ]);

                // Handle image upload if provided
                $imagePath = null;
                if ($request->hasFile('meal_image')) {
                    $image = $request->file('meal_image');
                    $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                    
                    $uploadPath = public_path('images/nutrition_images');
                    if (!file_exists($uploadPath)) {
                        mkdir($uploadPath, 0755, true);
                    }
                    
                    $image->move($uploadPath, $imageName);
                    $imagePath = 'images/nutrition_images/' . $imageName;
                }

                // Update template
                $templateUpdateData = [];
                if ($request->has('name')) {
                    $templateUpdateData['name'] = $request->name;
                }
                if ($imagePath) {
                    $templateUpdateData['meal_image'] = $imagePath;
                }

                if (!empty($templateUpdateData)) {
                    $template->update($templateUpdateData);
                }

                // Update template details if food items are provided
                if ($request->has('food_items') && !empty($request->food_items)) {
                    // Extract all food IDs from the request
                    $foodIds = array_column($request->food_items, 'food_id');
                    
                    // Select and validate foods from foods table
                    $foods = Food::whereIn('id', $foodIds)->get();
                    
                    // Check if all food IDs exist
                    $foundFoodIds = $foods->pluck('id')->toArray();
                    $missingFoodIds = array_diff($foodIds, $foundFoodIds);
                    
                    if (!empty($missingFoodIds)) {
                        DB::rollBack();
                        return response()->json([
                            'success' => false,
                            'message' => 'Some foods not found',
                            'errors' => [
                                'food_items' => 'The following food IDs do not exist: ' . implode(', ', $missingFoodIds)
                            ]
                        ], 400);
                    }
                    
                    // Create a map of food_id => food for quick lookup
                    $foodsMap = $foods->keyBy('id');
                    
                    // Clear existing template details
                    MealPlanTemplateDetail::where('template_id', $template->id)->delete();
                    
                    // Create new template details
                    foreach ($request->food_items as $foodItem) {
                        $food = $foodsMap->get($foodItem['food_id']);
                        
                        if (!$food) {
                            continue;
                        }
                        
                        $detailData = [
                            'template_id' => $template->id,
                            'food_id' => $food->id,
                            'nutrition_type' => $foodItem['nutrition_type'],
                            'quantity' => $foodItem['quantity'],
                            'calories' => $foodItem['calories'],
                            'protein' => $foodItem['protein'],
                            'carbs' => $foodItem['carbs'],
                            'fats' => $foodItem['fats'],
                            'created_at' => now(),
                            'updated_at' => now()
                        ];
                        
                        if (isset($foodItem['serving_grams']) && $foodItem['serving_grams'] !== null) {
                            $detailData['serving_grams'] = $foodItem['serving_grams'];
                        }
                        
                        DB::table('meal_plan_template_details')->insert($detailData);
                    }
                }

                DB::commit();

                // Load updated plan
                $updatedMeal = AssignedMealsMember::with(['template.category', 'template.details.food'])
                    ->where('id', $assignedMeal->id)
                    ->first();

                $transformedPlan = [
                    'id' => $updatedMeal->id,
                    'name' => $updatedMeal->template->name,
                    'description' => $updatedMeal->description,
                    'start_date' => $updatedMeal->start_date ? $updatedMeal->start_date->format('Y-m-d') : null,
                    'end_date' => $updatedMeal->end_date ? $updatedMeal->end_date->format('Y-m-d') : null,
                    'duration' => $updatedMeal->duration,
                    'template' => $this->transformNutritionTemplate($updatedMeal->template),
                    'created_at' => $updatedMeal->created_at->format('Y-m-d H:i:s'),
                    'updated_at' => $updatedMeal->updated_at->format('Y-m-d H:i:s')
                ];

                return response()->json([
                    'success' => true,
                    'message' => 'Nutrition plan updated successfully',
                    'data' => $transformedPlan
                ], 200);

            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }

        } catch (\Exception $e) {
            \Log::error('Update nutrition plan error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a nutrition plan
     */
    public function destroy(Request $request, $id)
    {
        try {
            $member = $request->get('auth_member');
            
            // Check if assigned meal belongs to this member
            $assignedMeal = AssignedMealsMember::with(['template.category', 'template.details.food'])
                ->where('id', $id)
                ->where('member_id', $member->member_id)
                ->first();

            if (!$assignedMeal) {
                return response()->json([
                    'success' => false,
                    'message' => 'Nutrition plan not found or not accessible',
                ], 404);
            }

            // Delete the assigned meal
            $assignedMeal->delete();

            return response()->json([
                'success' => true,
                'message' => 'Nutrition plan deleted successfully'
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Delete nutrition plan error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all foods for mobile app
     */
    public function getAllFoods(Request $request)
    {
        try {
            $foods = Food::all();

            return response()->json([
                'success' => true,
                'data' => $foods
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get all foods error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }


    public function getInitialFoods()
{
    $foods = Food::orderBy('id', 'desc')->limit(50)->get();

    return response()->json([
        'success' => true,
        'data' => $foods
    ]);
}



public function searchFoods(Request $request)
{
    $query = $request->get('query', '');
    $categories = $request->get('categories', []); // Array of category names
    $macronutrientFocus = $request->get('macronutrient_focus', []); // Array: ['high_protein', 'low_carb', 'high_fiber', 'low_fat']
    
    // Handle categories if it comes as a string (comma-separated)
    if (is_string($categories)) {
        $categories = !empty($categories) ? explode(',', $categories) : [];
    }
    
    // Handle macronutrient_focus if it comes as a string (comma-separated)
    if (is_string($macronutrientFocus)) {
        $macronutrientFocus = !empty($macronutrientFocus) ? explode(',', $macronutrientFocus) : [];
    }
    
    // Start building query
    $foodsQuery = Food::query();
    
    // Search by name
    if (!empty($query)) {
        $foodsQuery->where('name', 'LIKE', "%$query%");
    }
    
    // Filter by categories (if category field exists)
    if (!empty($categories) && is_array($categories)) {
        $categories = array_map('trim', $categories);
        $categories = array_filter($categories);
        
        if (!empty($categories)) {
            // Check if foods table has category field
            // If not, this will be ignored
            try {
                $foodsQuery->whereIn('category', $categories);
            } catch (\Exception $e) {
                // Category field might not exist, skip this filter
            }
        }
    }
    
    // Filter by macronutrient focus
    if (!empty($macronutrientFocus) && is_array($macronutrientFocus)) {
        $foodsQuery->where(function($q) use ($macronutrientFocus) {
            $firstCondition = true;
            foreach ($macronutrientFocus as $focus) {
                $focus = trim($focus);
                if (empty($focus)) continue;
                
                switch ($focus) {
                    case 'high_protein':
                        // High protein: protein >= 20g per 100g
                        if ($firstCondition) {
                            $q->whereRaw('CAST(protein AS DECIMAL(10,2)) >= 20');
                            $firstCondition = false;
                        } else {
                            $q->orWhereRaw('CAST(protein AS DECIMAL(10,2)) >= 20');
                        }
                        break;
                    case 'low_carb':
                        // Low carb: carbs < 10g per 100g
                        if ($firstCondition) {
                            $q->whereRaw('CAST(carbohydrate AS DECIMAL(10,2)) < 10');
                            $firstCondition = false;
                        } else {
                            $q->orWhereRaw('CAST(carbohydrate AS DECIMAL(10,2)) < 10');
                        }
                        break;
                    case 'high_fiber':
                        // High fiber: fiber >= 5g per 100g
                        if ($firstCondition) {
                            $q->whereRaw('CAST(fiber AS DECIMAL(10,2)) >= 5');
                            $firstCondition = false;
                        } else {
                            $q->orWhereRaw('CAST(fiber AS DECIMAL(10,2)) >= 5');
                        }
                        break;
                    case 'low_fat':
                        // Low fat: fat < 5g per 100g
                        if ($firstCondition) {
                            $q->whereRaw('CAST(fat AS DECIMAL(10,2)) < 5');
                            $firstCondition = false;
                        } else {
                            $q->orWhereRaw('CAST(fat AS DECIMAL(10,2)) < 5');
                        }
                        break;
                }
            }
        });
    }
    
    $foods = $foodsQuery->limit(50)->get();

    return response()->json([
        'success' => true,
        'data' => $foods
    ]);
}

/**
 * Get food filter options (categories and macronutrient focus types)
 */
public function getFoodFilterOptions(Request $request)
{
    try {
        // Get unique categories from foods (if category field exists)
        $categories = [];
        try {
            $categories = Food::select('category')
                ->whereNotNull('category')
                ->where('category', '!=', '')
                ->distinct()
                ->pluck('category')
                ->filter()
                ->sort()
                ->values()
                ->toArray();
        } catch (\Exception $e) {
            // Category field might not exist, return empty array
            $categories = [];
        }
        
        // Macronutrient focus options (these are predefined)
        $macronutrientFocus = [
            'high_protein' => 'High Protein',
            'low_carb' => 'Low Carb',
            'high_fiber' => 'High Fiber',
            'low_fat' => 'Low Fat',
        ];
        
        return response()->json([
            'success' => true,
            'data' => [
                'categories' => $categories,
                'macronutrient_focus' => $macronutrientFocus
            ]
        ], 200);
        
    } catch (\Exception $e) {
        \Log::error('Get food filter options error: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Server error: ' . $e->getMessage(),
        ], 500);
    }
}

/**
 * Get assigned meals for the authenticated member
 * These are meals assigned by CRM admin/trainer to the member
 */
public function getAssignedMeals(Request $request)
{
    try {
        $member = $request->get('auth_member');
        
        if (!$member) {
            return response()->json([
                'success' => false,
                'message' => 'Member not authenticated'
            ], 401);
        }

        // Optional query parameters
        $date = $request->get('date'); // Filter by specific date
        $startDate = $request->get('start_date'); // Filter by date range start
        $endDate = $request->get('end_date'); // Filter by date range end
        $includeInactive = $request->get('include_inactive', false); // Include expired assignments

        // Build query
        $query = AssignedMealsMember::with([
            'template.category',
            'template.details.food',
            'assignedBy' => function($q) {
                $q->select('id', 'firstname', 'lastname', 'email');
            }
        ])
        ->where('member_id', $member->member_id)
        ->orderBy('date', 'desc')
        ->orderBy('created_at', 'desc');

        // Filter by specific date
        if ($date) {
            $query->where('date', $date);
        }

        // Filter by date range
        if ($startDate && $endDate) {
            $query->where(function($q) use ($startDate, $endDate) {
                $q->whereBetween('date', [$startDate, $endDate])
                  ->orWhere(function($subQ) use ($startDate, $endDate) {
                      $subQ->whereNotNull('start_date')
                           ->whereNotNull('end_date')
                           ->where(function($rangeQ) use ($startDate, $endDate) {
                               $rangeQ->whereBetween('start_date', [$startDate, $endDate])
                                      ->orWhereBetween('end_date', [$startDate, $endDate])
                                      ->orWhere(function($overlapQ) use ($startDate, $endDate) {
                                          $overlapQ->where('start_date', '<=', $startDate)
                                                   ->where('end_date', '>=', $endDate);
                                      });
                           });
                  });
            });
        }

        // Filter active assignments (if not including inactive)
        if (!$includeInactive) {
            $query->where(function($q) {
                $q->whereNull('end_date')
                  ->orWhere('end_date', '>=', now()->format('Y-m-d'))
                  ->orWhere(function($dateQ) {
                      $dateQ->whereNotNull('date')
                            ->where('date', '>=', now()->format('Y-m-d'));
                  });
            });
        }

        $assignedMeals = $query->get();

        // Transform data for mobile app
        $transformedMeals = $assignedMeals->map(function ($assignedMeal) {
            $template = $assignedMeal->template;
            
            return [
                'id' => $assignedMeal->id,
                'member_id' => $assignedMeal->member_id,
                'gym_id' => $assignedMeal->gym_id,
                'date' => $assignedMeal->date ? $assignedMeal->date->format('Y-m-d') : null,
                'start_date' => $assignedMeal->start_date ? $assignedMeal->start_date->format('Y-m-d') : null,
                'end_date' => $assignedMeal->end_date ? $assignedMeal->end_date->format('Y-m-d') : null,
                'duration' => $assignedMeal->duration,
                'description' => $assignedMeal->description,
                'is_active' => $this->isAssignmentActive($assignedMeal),
                'nutrition_data' => [
                    'calories' => $assignedMeal->calories,
                    'protein' => $assignedMeal->protein,
                    'carbs' => $assignedMeal->carbs,
                    'fat_macros' => $assignedMeal->fat_macros,
                    'weight' => $assignedMeal->weight,
                    'body' => $assignedMeal->body,
                    'fat' => $assignedMeal->fat,
                    'water' => $assignedMeal->water,
                    'intake' => $assignedMeal->intake,
                ],
                'tracking_data' => [
                    'hunger' => $assignedMeal->hunger,
                    'strength' => $assignedMeal->strength,
                    'energy' => $assignedMeal->energy,
                    'meal_deviations' => $assignedMeal->meal_deviations,
                    'activities' => $assignedMeal->activities,
                    'feel' => $assignedMeal->feel,
                    'cardio' => $assignedMeal->cardio,
                    'plan' => $assignedMeal->plan,
                    'notes' => $assignedMeal->notes,
                ],
                'template' => $template ? [
                    'id' => $template->id,
                    'name' => $template->name,
                    'description' => $template->description,
                    'instructions' => $template->instructions,
                    'meals_time' => $template->meals_time,
                    'calories' => $template->calories,
                    'protein' => $template->protein,
                    'carbs' => $template->carbs,
                    'fats' => $template->fats,
                    'target_calories' => $template->target_calories,
                    'target_protein' => $template->target_protein,
                    'target_carbs' => $template->target_carbs,
                    'target_fat' => $template->target_fat,
                    'meal_image' => $template->meal_image ? url($template->meal_image) : null,
                    'category' => $template->category ? [
                        'id' => $template->category->id,
                        'name' => $template->category->name,
                        'color' => $template->category->color,
                        'icon' => $template->category->icon,
                    ] : null,
                    'details' => $template->details ? $template->details->map(function ($detail) {
                        return [
                            'id' => $detail->id,
                            'nutrition_type' => $detail->nutrition_type,
                            'quantity' => $detail->quantity,
                            'serving_grams' => $detail->serving_grams ?? null,
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
                                'carbohydrate' => $detail->food->carbohydrate,
                                'fat' => $detail->food->fat,
                                'fiber' => $detail->food->fiber,
                                'sugar' => $detail->food->sugar,
                            ] : null,
                        ];
                    }) : [],
                ] : null,
                'assigned_by' => $assignedMeal->assignedBy ? [
                    'id' => $assignedMeal->assignedBy->id,
                    'name' => trim(($assignedMeal->assignedBy->firstname ?? '') . ' ' . ($assignedMeal->assignedBy->lastname ?? '')),
                    'firstname' => $assignedMeal->assignedBy->firstname,
                    'lastname' => $assignedMeal->assignedBy->lastname,
                    'email' => $assignedMeal->assignedBy->email,
                ] : null,
                'created_at' => $assignedMeal->created_at ? $assignedMeal->created_at->format('Y-m-d H:i:s') : null,
                'updated_at' => $assignedMeal->updated_at ? $assignedMeal->updated_at->format('Y-m-d H:i:s') : null,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $transformedMeals,
            'message' => 'Assigned meals fetched successfully'
        ], 200);

    } catch (\Exception $e) {
        \Log::error('Get assigned meals error: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Server error: ' . $e->getMessage(),
        ], 500);
    }
}

/**
 * Check if an assignment is currently active
 */
private function isAssignmentActive($assignedMeal)
{
    $today = now()->format('Y-m-d');
    
    // Check if there's an end_date and if it's in the past
    if ($assignedMeal->end_date && $assignedMeal->end_date->format('Y-m-d') < $today) {
        return false;
    }
    
    // Check if there's a date and if it's in the past
    if ($assignedMeal->date && $assignedMeal->date->format('Y-m-d') < $today) {
        return false;
    }
    
    // Check if start_date is in the future
    if ($assignedMeal->start_date && $assignedMeal->start_date->format('Y-m-d') > $today) {
        return false;
    }
    
    return true;
}

/**
 * Assign meal plan to member (self-assignment)
 * Allows members to assign meal plan templates to themselves
 */
public function assignMealPlan(Request $request)
{
    try {
        $member = $request->get('auth_member');
        
        if (!$member || !$member->gym_id) {
            return response()->json([
                'success' => false,
                'message' => 'Member not associated with any gym'
            ], 400);
        }
        
        $validator = Validator::make($request->all(), [
            'template_id' => 'required|exists:meal_plans_template,id',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after:start_date',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Verify the meal plan template exists and belongs to the member's gym
        $template = MealPlanTemplate::where('id', $request->template_id)
            ->where('gym_id', $member->gym_id)
            ->whereNull('deleted_at')
            ->first();

        if (!$template) {
            return response()->json([
                'success' => false,
                'message' => 'Meal plan template not found or not accessible'
            ], 404);
        }

        // Check if already assigned (active assignment)
        // Use member->member_id for AssignedMealsMember (as seen in getAssignedMeals method)
        $existingAssignment = AssignedMealsMember::where('member_id', $member->member_id)
            ->where('template_id', $request->template_id)
            ->where(function($query) {
                $query->whereNull('end_date')
                      ->orWhere('end_date', '>=', now()->format('Y-m-d'));
            })
            ->first();

        if ($existingAssignment) {
            return response()->json([
                'success' => false,
                'message' => 'This meal plan is already assigned to you'
            ], 400);
        }

        DB::beginTransaction();
        
        try {
            // Create assignment
            $assignment = AssignedMealsMember::create([
                'member_id' => $member->member_id,
                'template_id' => $request->template_id,
                'gym_id' => $member->gym_id,
                'start_date' => $request->start_date ? $request->start_date : now()->format('Y-m-d'),
                'end_date' => $request->end_date,
                'assigned_by' => null, // Self-assigned, no assigned_by
                'description' => $request->description,
            ]);
            
            DB::commit();
            
            // Load relationships for response
            $assignment->load(['template.category', 'template.details.food']);
            
            return response()->json([
                'success' => true,
                'message' => 'Meal plan assigned successfully',
                'data' => $assignment
            ], 201);
            
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
        
    } catch (\Exception $e) {
        \Log::error('Assign meal plan error: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Server error: ' . $e->getMessage(),
        ], 500);
    }
}

/**
 * Check if a meal plan template is already assigned to the member
 */
public function checkAssignment(Request $request, $templateId)
{
    try {
        $member = $request->get('auth_member');
        
        if (!$member) {
            return response()->json([
                'success' => false,
                'message' => 'Member not authenticated'
            ], 401);
        }

        // Check if already assigned (active assignment)
        // Use member->member_id for AssignedMealsMember (as seen in getAssignedMeals method)
        $existingAssignment = AssignedMealsMember::where('member_id', $member->member_id)
            ->where('template_id', $templateId)
            ->where(function($query) {
                $query->whereNull('end_date')
                      ->orWhere('end_date', '>=', now()->format('Y-m-d'));
            })
            ->first();

        return response()->json([
            'success' => true,
            'is_assigned' => !!$existingAssignment,
            'assignment' => $existingAssignment ? [
                'id' => $existingAssignment->id,
                'start_date' => $existingAssignment->start_date ? $existingAssignment->start_date->format('Y-m-d') : null,
                'end_date' => $existingAssignment->end_date ? $existingAssignment->end_date->format('Y-m-d') : null,
            ] : null
        ], 200);
        
    } catch (\Exception $e) {
        \Log::error('Check meal plan assignment error: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Server error: ' . $e->getMessage(),
        ], 500);
    }
}

/**
 * Update an assigned meal plan
 * Allows members to update their assigned meal plan template and details
 */
public function updateAssignedMeal(Request $request, $id)
{
    try {
        $member = $request->get('auth_member');
        
        if (!$member || !$member->gym_id) {
            return response()->json([
                'success' => false,
                'message' => 'Member not associated with any gym'
            ], 400);
        }

        // Get the assigned meal
        $assignedMeal = AssignedMealsMember::with(['template'])
            ->where('id', $id)
            ->where('member_id', $member->member_id)
            ->first();

        if (!$assignedMeal) {
            return response()->json([
                'success' => false,
                'message' => 'Assigned meal not found or not accessible'
            ], 404);
        }

        // Validate request data
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'meal_image' => 'nullable|image|max:5120',
            'calories' => 'nullable|string',
            'protein' => 'nullable|string',
            'carbs' => 'nullable|string',
            'fats' => 'nullable|string',
            'food_items' => 'nullable|array',
            'food_items.*.food_id' => 'required_with:food_items|integer|exists:foods,id',
            'food_items.*.nutrition_type' => 'required_with:food_items|string|in:breakfast,lunch,dinner,snack,snack_morning,snack_afternoon,snack_evening',
            'food_items.*.quantity' => 'required_with:food_items|numeric|min:0.1',
            'food_items.*.calories' => 'required_with:food_items|numeric|min:0',
            'food_items.*.protein' => 'required_with:food_items|numeric|min:0',
            'food_items.*.carbs' => 'required_with:food_items|numeric|min:0',
            'food_items.*.fats' => 'required_with:food_items|numeric|min:0',
            'food_items.*.serving_grams' => 'nullable|numeric|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 400);
        }

        DB::beginTransaction();

        try {
            $template = $assignedMeal->template;
            
            if (!$template) {
                return response()->json([
                    'success' => false,
                    'message' => 'Template not found for this assigned meal'
                ], 404);
            }

            // Handle image upload if provided
            $imagePath = null;
            if ($request->hasFile('meal_image')) {
                $image = $request->file('meal_image');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                
                $uploadPath = public_path('images/nutrition_images');
                if (!file_exists($uploadPath)) {
                    mkdir($uploadPath, 0755, true);
                }
                
                $image->move($uploadPath, $imageName);
                $imagePath = 'images/nutrition_images/' . $imageName;
            }

            // Update template
            $templateUpdateData = [];
            if ($request->has('name')) {
                $templateUpdateData['name'] = $request->name;
            }
            if ($request->has('description')) {
                $templateUpdateData['description'] = $request->description;
            }
            if ($imagePath) {
                $templateUpdateData['meal_image'] = $imagePath;
            }
            if ($request->has('calories')) {
                $templateUpdateData['calories'] = $request->calories;
            }
            if ($request->has('protein')) {
                $templateUpdateData['protein'] = $request->protein;
            }
            if ($request->has('carbs')) {
                $templateUpdateData['carbs'] = $request->carbs;
            }
            if ($request->has('fats')) {
                $templateUpdateData['fats'] = $request->fats;
            }

            if (!empty($templateUpdateData)) {
                $template->update($templateUpdateData);
            }

            // Update template details if food items are provided
            if ($request->has('food_items') && !empty($request->food_items)) {
                // Extract all food IDs from the request
                $foodIds = array_column($request->food_items, 'food_id');
                
                // Select and validate foods from foods table
                $foods = Food::whereIn('id', $foodIds)->get();
                
                // Check if all food IDs exist
                $foundFoodIds = $foods->pluck('id')->toArray();
                $missingFoodIds = array_diff($foodIds, $foundFoodIds);
                
                if (!empty($missingFoodIds)) {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => 'Some foods not found',
                        'errors' => [
                            'food_items' => 'The following food IDs do not exist: ' . implode(', ', $missingFoodIds)
                        ]
                    ], 400);
                }
                
                // Create a map of food_id => food for quick lookup
                $foodsMap = $foods->keyBy('id');
                
                // Clear existing template details
                MealPlanTemplateDetail::where('template_id', $template->id)->delete();
                
                // Create new template details
                foreach ($request->food_items as $foodItem) {
                    $food = $foodsMap->get($foodItem['food_id']);
                    
                    if (!$food) {
                        continue;
                    }
                    
                    $detailData = [
                        'template_id' => $template->id,
                        'food_id' => $food->id,
                        'nutrition_type' => $foodItem['nutrition_type'],
                        'quantity' => $foodItem['quantity'],
                        'calories' => $foodItem['calories'],
                        'protein' => $foodItem['protein'],
                        'carbs' => $foodItem['carbs'],
                        'fats' => $foodItem['fats'],
                        'created_at' => now(),
                        'updated_at' => now()
                    ];
                    
                    if (isset($foodItem['serving_grams']) && $foodItem['serving_grams'] !== null) {
                        $detailData['serving_grams'] = $foodItem['serving_grams'];
                    }
                    
                    DB::table('meal_plan_template_details')->insert($detailData);
                }
            }

            // Update assigned meal description if provided
            if ($request->has('description')) {
                $assignedMeal->update(['description' => $request->description]);
            }

            DB::commit();

            // Load updated assigned meal with relationships
            $updatedMeal = AssignedMealsMember::with(['template.category', 'template.details.food'])
                ->where('id', $assignedMeal->id)
                ->first();

            // Transform response
            $transformedMeal = [
                'id' => $updatedMeal->id,
                'member_id' => $updatedMeal->member_id,
                'gym_id' => $updatedMeal->gym_id,
                'date' => $updatedMeal->date ? $updatedMeal->date->format('Y-m-d') : null,
                'start_date' => $updatedMeal->start_date ? $updatedMeal->start_date->format('Y-m-d') : null,
                'end_date' => $updatedMeal->end_date ? $updatedMeal->end_date->format('Y-m-d') : null,
                'duration' => $updatedMeal->duration,
                'description' => $updatedMeal->description,
                'template' => $this->transformNutritionTemplate($updatedMeal->template),
                'created_at' => $updatedMeal->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $updatedMeal->updated_at->format('Y-m-d H:i:s')
            ];

            return response()->json([
                'success' => true,
                'message' => 'Assigned meal plan updated successfully',
                'data' => $transformedMeal
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }

    } catch (\Exception $e) {
        \Log::error('Update assigned meal error: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Server error: ' . $e->getMessage(),
        ], 500);
    }
}

}

