<?php

namespace App\Http\Controllers\Mobile\coach;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\HandlesApiErrors;
use App\Models\Nutrition;
// NutritionPlan model removed - nutrition_plans table dropped, use AssignedMealsMember instead
// use App\Models\NutritionPlan;
use App\Models\AssignedMealsMember;
use App\Models\NutritionDetail;
use App\Models\NutritionCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Throwable;

class MobileNutritionController extends Controller
{
    use HandlesApiErrors;
    /**
     * Get member's nutrition plans
     */
    public function index(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            // Get active nutrition plans for this member
            // nutrition_plans table dropped - using assigned_meals_members instead
            $nutritionPlans = AssignedMealsMember::with(['template.category', 'template.details.food'])
                ->where('member_id', $member->id)
                ->whereNotNull('template_id')
                ->where('template_id', '>', 0)
                ->where(function($query) {
                    $query->whereNull('end_date')
                          ->orWhere('end_date', '>=', now()->format('Y-m-d'));
                })
                ->orderBy('start_date', 'desc')
                ->get();

            // Transform nutrition plans for mobile app
            // AssignedMealsMember uses 'plan' instead of 'nutrition_plan'
            $transformedPlans = $nutritionPlans->map(function ($plan) {
                return [
                    'id' => $plan->id,
                    'name' => $plan->plan ?? $plan->template->name ?? 'Unnamed Plan', // Use 'plan' field from AssignedMealsMember
                    'description' => $plan->description,
                    'start_date' => $plan->start_date ? $plan->start_date->format('Y-m-d') : null,
                    'end_date' => $plan->end_date ? $plan->end_date->format('Y-m-d') : null,
                    'duration' => $plan->duration,
                    'template' => $plan->template ? $this->transformNutritionTemplate($plan->template) : null,
                    'created_at' => $plan->created_at ? $plan->created_at->format('Y-m-d H:i:s') : null,
                    'updated_at' => $plan->updated_at ? $plan->updated_at->format('Y-m-d H:i:s') : null
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedPlans
            ], 200);

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileNutritionController@index');
        }
    }

    /**
     * Get specific nutrition plan details
     */
    public function show(Request $request, $id)
    {
        try {
            $member = $request->get('auth_member');
            
            // Get nutrition plan for this member
            // nutrition_plans table dropped - using assigned_meals_members instead
            $nutritionPlan = AssignedMealsMember::with(['template.category', 'template.details.food'])
                ->where('id', $id)
                ->where('member_id', $member->id)
                ->whereNotNull('template_id')
                ->first();

            if (!$nutritionPlan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Nutrition plan not found or not accessible',
                ], 404);
            }

            $transformedPlan = [
                'id' => $nutritionPlan->id,
                'name' => $nutritionPlan->plan ?? $nutritionPlan->template->name ?? 'Unnamed Plan',
                'description' => $nutritionPlan->description,
                'start_date' => $nutritionPlan->start_date ? $nutritionPlan->start_date->format('Y-m-d') : null,
                'end_date' => $nutritionPlan->end_date ? $nutritionPlan->end_date->format('Y-m-d') : null,
                'duration' => $nutritionPlan->duration,
                'template' => $nutritionPlan->template ? $this->transformNutritionTemplate($nutritionPlan->template) : null,
                'created_at' => $nutritionPlan->created_at ? $nutritionPlan->created_at->format('Y-m-d H:i:s') : null,
                'updated_at' => $nutritionPlan->updated_at ? $nutritionPlan->updated_at->format('Y-m-d H:i:s') : null
            ];

            return response()->json([
                'success' => true,
                'data' => $transformedPlan
            ], 200);

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileNutritionController@show');
        }
    }

    /**
     * Get member's current nutrition plan
     */
    public function current(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            // Get current active nutrition plan for this member
            // nutrition_plans table dropped - using assigned_meals_members instead
            $currentPlan = AssignedMealsMember::with(['template.category', 'template.details.food'])
                ->where('member_id', $member->id)
                ->whereNotNull('template_id')
                ->where('start_date', '<=', now()->format('Y-m-d'))
                ->where(function($query) {
                    $query->whereNull('end_date')
                          ->orWhere('end_date', '>=', now()->format('Y-m-d'));
                })
                ->orderBy('start_date', 'desc')
                ->first();

            if (!$currentPlan) {
                return response()->json([
                    'success' => false,
                    'message' => 'No active nutrition plan found',
                ], 404);
            }

            $transformedPlan = [
                'id' => $currentPlan->id,
                'name' => $currentPlan->plan ?? $currentPlan->template->name ?? 'Unnamed Plan',
                'description' => $currentPlan->description,
                'start_date' => $currentPlan->start_date ? $currentPlan->start_date->format('Y-m-d') : null,
                'end_date' => $currentPlan->end_date ? $currentPlan->end_date->format('Y-m-d') : null,
                'duration' => $currentPlan->duration,
                'template' => $currentPlan->template ? $this->transformNutritionTemplate($currentPlan->template) : null,
                'created_at' => $currentPlan->created_at ? $currentPlan->created_at->format('Y-m-d H:i:s') : null,
                'updated_at' => $currentPlan->updated_at ? $currentPlan->updated_at->format('Y-m-d H:i:s') : null
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
            
            // Get nutrition statistics for this member
            // nutrition_plans table dropped - using assigned_meals_members instead
            $totalPlans = AssignedMealsMember::where('member_id', $member->id)
                ->whereNotNull('template_id')
                ->count();
            $activePlans = AssignedMealsMember::where('member_id', $member->id)
                ->whereNotNull('template_id')
                ->where(function($query) {
                    $query->whereNull('end_date')
                          ->orWhere('end_date', '>=', now()->format('Y-m-d'));
                })
                ->count();
            $completedPlans = AssignedMealsMember::where('member_id', $member->id)
                ->whereNotNull('template_id')
                ->where('end_date', '<', now()->format('Y-m-d'))
                ->count();

            // Get current plan if exists
            $currentPlan = AssignedMealsMember::with(['template'])
                ->where('member_id', $member->id)
                ->whereNotNull('template_id')
                ->where('start_date', '<=', now()->format('Y-m-d'))
                ->where(function($query) {
                    $query->whereNull('end_date')
                          ->orWhere('end_date', '>=', now()->format('Y-m-d'));
                })
                ->first();

            $statistics = [
                'total_plans' => $totalPlans,
                'active_plans' => $activePlans,
                'completed_plans' => $completedPlans,
                'current_plan' => $currentPlan ? [
                    'id' => $currentPlan->id,
                    'name' => $currentPlan->plan ?? $currentPlan->template->name ?? 'Unnamed Plan',
                    'start_date' => $currentPlan->start_date ? $currentPlan->start_date->format('Y-m-d') : null,
                    'end_date' => $currentPlan->end_date ? $currentPlan->end_date->format('Y-m-d') : null,
                    'template' => $currentPlan->template ? [
                        'id' => $currentPlan->template->id,
                        'name' => $currentPlan->template->name,
                        'calories' => $currentPlan->template->calories,
                        'protein' => $currentPlan->template->protein,
                        'carbs' => $currentPlan->template->carbs,
                        'fats' => $currentPlan->template->fats
                    ] : null
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
            // Get all active categories from database using raw query to avoid any model issues
            $categories = DB::table('nutrition_categories')
                ->where('is_active', true)
                ->orderBy('sort_order', 'asc')
                ->orderBy('name', 'asc')
                ->select('id', 'name', 'description', 'color', 'icon')
                ->get();

            // Transform to array - using object property access for stdClass objects
            $transformedCategories = [];
            foreach ($categories as $category) {
                // Skip if category is null or not an object
                if (!$category || !is_object($category)) {
                    continue;
                }
                
                // Get id safely - use property_exists and isset to check property exists
                if (!property_exists($category, 'id') || !isset($category->id) || $category->id === null) {
                    continue;
                }
                
                $transformedCategories[] = [
                    'id' => (int) $category->id,
                    'name' => (property_exists($category, 'name') && isset($category->name)) ? (string) $category->name : '',
                    'description' => (property_exists($category, 'description') && isset($category->description)) ? $category->description : null,
                    'color' => (property_exists($category, 'color') && isset($category->color)) ? $category->color : null,
                    'icon' => (property_exists($category, 'icon') && isset($category->icon)) ? $category->icon : null,
                ];
            }

            return response()->json([
                'success' => true,
                'data' => $transformedCategories
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get nutrition categories error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        } catch (Throwable $e) {
            \Log::error('Get nutrition categories throwable error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);
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
            
            // Get nutrition plan active on this date for this member
            // nutrition_plans table dropped - using assigned_meals_members instead
            $nutritionPlan = AssignedMealsMember::with(['template.category', 'template.details.food'])
                ->where('member_id', $member->id)
                ->whereNotNull('template_id')
                ->where('start_date', '<=', $date)
                ->where(function($query) use ($date) {
                    $query->whereNull('end_date')
                          ->orWhere('end_date', '>=', $date);
                })
                ->orderBy('start_date', 'desc')
                ->first();

            if (!$nutritionPlan) {
                return response()->json([
                    'success' => false,
                    'message' => 'No nutrition plan found for this date',
                ], 404);
            }

            $transformedPlan = [
                'id' => $nutritionPlan->id,
                'name' => $nutritionPlan->plan ?? $nutritionPlan->template->name ?? 'Unnamed Plan',
                'description' => $nutritionPlan->description,
                'date' => $date,
                'template' => $nutritionPlan->template ? $this->transformNutritionTemplate($nutritionPlan->template) : null,
                'created_at' => $nutritionPlan->created_at ? $nutritionPlan->created_at->format('Y-m-d H:i:s') : null,
                'updated_at' => $nutritionPlan->updated_at ? $nutritionPlan->updated_at->format('Y-m-d H:i:s') : null
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
            
            // Validate request data
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'start_date' => 'required|date_format:Y-m-d',
                'end_date' => 'nullable|date_format:Y-m-d|after:start_date',
                'duration' => 'nullable|string|max:100',
                'template_id' => 'nullable|integer|exists:nutrition,id',
                'meal_image' => 'nullable|image|max:5120', // 5MB max
                'calories' => 'nullable|string',
                'protein' => 'nullable|string',
                'carbs' => 'nullable|string',
                'fats' => 'nullable|string',
                'food_items' => 'nullable|array',
                'food_items.*.food_id' => 'required_with:food_items|integer|exists:foods,id',
                'food_items.*.nutrition_type' => 'required_with:food_items|string|in:breakfast,lunch,dinner,snack',
                'food_items.*.quantity' => 'required_with:food_items|numeric|min:0.1',
                'food_items.*.calories' => 'required_with:food_items|numeric|min:0',
                'food_items.*.protein' => 'required_with:food_items|numeric|min:0',
                'food_items.*.carbs' => 'required_with:food_items|numeric|min:0',
                'food_items.*.fats' => 'required_with:food_items|numeric|min:0'
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

            // Create nutrition template if food items are provided
            $templateId = $request->template_id;
            if ($request->has('food_items') && !empty($request->food_items)) {
                $nutrition = Nutrition::create([
                    'gym_id' => $member->gym_id,
                    'name' => $request->name . ' Template',
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
                ]);

                $templateId = $nutrition->id;

                // Create nutrition details for each food item
                foreach ($request->food_items as $foodItem) {
                    NutritionDetail::create([
                        'nutrition_id' => $nutrition->id,
                        'food_id' => $foodItem['food_id'],
                        'nutrition_type' => $foodItem['nutrition_type'],
                        'quantity' => $foodItem['quantity'],
                        'calories' => $foodItem['calories'],
                        'protein' => $foodItem['protein'],
                        'carbs' => $foodItem['carbs'],
                        'fats' => $foodItem['fats']
                    ]);
                }
            }

            // Create nutrition plan
            // nutrition_plans table dropped - using assigned_meals_members instead
            $nutritionPlan = AssignedMealsMember::create([
                'member_id' => $member->id,
                'gym_id' => $member->gym_id,
                'coach_id' => $member->coach_id ?? null, // Store coach_id from member
                'template_id' => $templateId,
                'plan' => $request->name, // AssignedMealsMember uses 'plan' instead of 'nutrition_plan'
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'duration' => $request->duration,
                'description' => $request->description
            ]);

            // Load the created plan with relationships
            $createdPlan = AssignedMealsMember::with(['template.category', 'template.details.food'])
                ->where('id', $nutritionPlan->id)
                ->first();

            $transformedPlan = [
                'id' => $createdPlan->id,
                'name' => $createdPlan->plan ?? $createdPlan->template->name ?? 'Unnamed Plan', // Use 'plan' field
                'description' => $createdPlan->description,
                'start_date' => $createdPlan->start_date ? $createdPlan->start_date->format('Y-m-d') : null,
                'end_date' => $createdPlan->end_date ? $createdPlan->end_date->format('Y-m-d') : null,
                'duration' => $createdPlan->duration,
                'template' => $createdPlan->template ? $this->transformNutritionTemplate($createdPlan->template) : null,
                'created_at' => $createdPlan->created_at ? $createdPlan->created_at->format('Y-m-d H:i:s') : null,
                'updated_at' => $createdPlan->updated_at ? $createdPlan->updated_at->format('Y-m-d H:i:s') : null
            ];

            return response()->json([
                'success' => true,
                'message' => 'Nutrition plan created successfully',
                'data' => $transformedPlan
            ], 201);

        } catch (\Exception $e) {
            \Log::error('Create nutrition plan error: ' . $e->getMessage());
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
            
            // Check if nutrition plan belongs to this member
            // nutrition_plans table dropped - using assigned_meals_members instead
            $nutritionPlan = AssignedMealsMember::where('id', $id)
                ->where('member_id', $member->id)
                ->whereNotNull('template_id')
                ->first();

            if (!$nutritionPlan) {
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
                'food_items.*.nutrition_type' => 'required_with:food_items|string|in:breakfast,lunch,dinner,snack',
                'food_items.*.quantity' => 'required_with:food_items|numeric|min:0.1',
                'food_items.*.calories' => 'required_with:food_items|numeric|min:0',
                'food_items.*.protein' => 'required_with:food_items|numeric|min:0',
                'food_items.*.carbs' => 'required_with:food_items|numeric|min:0',
                'food_items.*.fats' => 'required_with:food_items|numeric|min:0'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 400);
            }

            // Update nutrition plan
            // AssignedMealsMember uses 'plan' instead of 'nutrition_plan'
            $nutritionPlan->update([
                'plan' => $request->name ?? $nutritionPlan->plan,
                'start_date' => $request->start_date ?? $nutritionPlan->start_date,
                'end_date' => $request->end_date,
                'duration' => $request->duration ?? $nutritionPlan->duration,
                'description' => $request->description ?? $nutritionPlan->description
            ]);

            // Update template if food items are provided
            if ($request->has('food_items') && !empty($request->items) && $nutritionPlan->template_id) {
                $template = Nutrition::find($nutritionPlan->template_id);
                
                if ($template) {
                    // Handle image upload if provided
                    if ($request->hasFile('meal_image')) {
                        $image = $request->file('meal_image');
                        $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                        
                        $uploadPath = public_path('images/nutrition_images');
                        if (!file_exists($uploadPath)) {
                            mkdir($uploadPath, 0755, true);
                        }
                        
                        $image->move($uploadPath, $imageName);
                        $imagePath = 'images/nutrition_images/' . $imageName;
                        
                        $template->update(['meal_image' => $imagePath]);
                    }

                    // Clear existing details and create new ones
                    NutritionDetail::where('nutrition_id', $template->id)->delete();
                    
                    foreach ($request->food_items as $foodItem) {
                        NutritionDetail::create([
                            'nutrition_id' => $template->id,
                            'food_id' => $foodItem['food_id'],
                            'nutrition_type' => $foodItem['nutrition_type'],
                            'quantity' => $foodItem['quantity'],
                            'calories' => $foodItem['calories'],
                            'protein' => $foodItem['protein'],
                            'carbs' => $foodItem['carbs'],
                            'fats' => $foodItem['fats']
                        ]);
                    }
                }
            }

            // Load updated plan
            // nutrition_plans table dropped - using assigned_meals_members instead
            $updatedPlan = AssignedMealsMember::with(['template.category', 'template.details.food'])
                ->where('id', $nutritionPlan->id)
                ->first();

            $transformedPlan = [
                'id' => $updatedPlan->id,
                'name' => $updatedPlan->plan ?? $updatedPlan->template->name ?? 'Unnamed Plan',
                'description' => $updatedPlan->description,
                'start_date' => $updatedPlan->start_date ? $updatedPlan->start_date->format('Y-m-d') : null,
                'end_date' => $updatedPlan->end_date ? $updatedPlan->end_date->format('Y-m-d') : null,
                'duration' => $updatedPlan->duration,
                'template' => $updatedPlan->template ? $this->transformNutritionTemplate($updatedPlan->template) : null,
                'created_at' => $updatedPlan->created_at ? $updatedPlan->created_at->format('Y-m-d H:i:s') : null,
                'updated_at' => $updatedPlan->updated_at ? $updatedPlan->updated_at->format('Y-m-d H:i:s') : null
            ];

            return response()->json([
                'success' => true,
                'message' => 'Nutrition plan updated successfully',
                'data' => $transformedPlan
            ], 200);

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
            
            // Check if nutrition plan belongs to this member
            // nutrition_plans table dropped - using assigned_meals_members instead
            $nutritionPlan = AssignedMealsMember::with(['template.category', 'template.details.food'])
                ->where('id', $id)
                ->where('member_id', $member->id)
                ->whereNotNull('template_id')
                ->first();

            if (!$nutritionPlan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Nutrition plan not found or not accessible',
                ], 404);
            }

            // Delete the plan
            $nutritionPlan->delete();

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
}
