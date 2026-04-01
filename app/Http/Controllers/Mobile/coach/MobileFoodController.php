<?php

namespace App\Http\Controllers\Mobile\coach;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\HandlesApiErrors;
use App\Models\Food;
use App\Models\AssignedMealsMember;
use App\Models\AssignedMealsMemberDetail;
use App\Models\MealPlanTemplate;
use App\Models\MealPlanTemplateDetail;
use App\Models\CoachAssignment;
use App\Models\Coach;
use App\Services\BarcodeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Throwable;

class MobileFoodController extends Controller
{
    use HandlesApiErrors;
    
    protected $barcodeService;
    
    public function __construct(BarcodeService $barcodeService)
    {
        $this->barcodeService = $barcodeService;
    }
    
    /**
     * Get authenticated coach from request
     */
    private function getCoach(Request $request)
    {
        $user = $request->get('auth_user');
        
        if (!$user || !isset($user->role_id) || $user->role_id !== 3) {
            return null;
        }
        
        // Find coach record by email
        if (!isset($user->email)) {
            return null;
        }
        
        $coach = Coach::where('email', $user->email)->first();
        
        return $coach;
    }

    /**
     * Normalize mobile visibility values to DB enum values.
     * DB expects: only_me | all_members
     * Mobile may send: private | public | all_members | only_me
     */
    /**
     * Get all foods (for search/selection)
     */
    public function getFoods(Request $request)
    {
        try {
            $query = Food::query();
            
            // Search functionality
            if ($request->has('search') && !empty(trim($request->search))) {
                $search = trim($request->search);
                $query->where(function($q) use ($search) {
                    $q->where('name', 'LIKE', "%{$search}%")
                      ->orWhere('description', 'LIKE', "%{$search}%")
                      ->orWhere('serving_description', 'LIKE', "%{$search}%");
                });
            }
            
            // Filter by food type
            if ($request->has('food_type') && !empty($request->food_type)) {
                $query->where('food_type', $request->food_type);
            }
            
            // Pagination
            $perPage = min($request->get('per_page', 30), 100);
            $foods = $query->orderBy('name', 'asc')->paginate($perPage);
            
            return response()->json([
                'success' => true,
                'data' => $foods->items(),
                'pagination' => [
                    'current_page' => $foods->currentPage(),
                    'total' => $foods->total(),
                    'per_page' => $foods->perPage(),
                    'last_page' => $foods->lastPage(),
                ]
            ]);
            
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileFoodController@getFoods');
        }
    }
    
    /**
     * Get food from barcode
     */
    public function getFoodFromBarcode(Request $request, $barcode)
    {
        try {
            $result = $this->barcodeService->fetchFromBarcode($barcode);
            
            if (!$result['success']) {
                return response()->json([
                    'success' => false,
                    'message' => $result['message'] ?? 'Product not found'
                ], 404);
            }
            
            return response()->json([
                'success' => true,
                'data' => $result
            ]);
            
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileFoodController@getFoodFromBarcode');
        }
    }
    
    /**
     * Create food from barcode
     */
    public function createFoodFromBarcode(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'barcode' => 'required|string|min:8|max:20'
            ]);
            
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }
            
            $result = $this->barcodeService->createFoodFromBarcode($request->barcode);
            
            if (!$result['success']) {
                return response()->json([
                    'success' => false,
                    'message' => $result['message'] ?? 'Failed to create food from barcode'
                ], 400);
            }
            
            return response()->json([
                'success' => true,
                'message' => $result['message'] ?? 'Food processed successfully',
                'data' => $result['food'],
                'from_cache' => $result['from_cache'] ?? false
            ]);
            
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileFoodController@createFoodFromBarcode');
        }
    }
    
    /**
     * Create a new food item
     */
    public function createFood(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'serving_description' => 'nullable|string',
                'brand' => 'nullable|string|max:255',
                'brand_name' => 'nullable|string|max:255',
                'barcode' => 'nullable|string|max:50',
                'calories' => 'nullable|numeric|min:0',
                'protein' => 'nullable|numeric|min:0',
                'carbohydrate' => 'nullable|numeric|min:0',
                'carbs' => 'nullable|numeric|min:0',
                'fat' => 'nullable|numeric|min:0',
                'fats' => 'nullable|numeric|min:0',
                'fiber' => 'nullable|numeric|min:0',
                'sodium' => 'nullable|numeric|min:0',
                'potassium' => 'nullable|numeric|min:0',
                'image_url' => 'nullable|string|max:500',
                'image' => 'nullable|string|max:500',
            ]);
            
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }
            
            // Prepare data for food creation
            $data = [
                'name' => $request->name,
                'description' => $request->description,
                'serving_description' => $request->serving_description,
                'brand' => $request->brand ?? $request->brand_name,
                'barcode' => $request->barcode,
                'calories' => $request->calories ?? 0,
                'protein' => $request->protein ?? 0,
                'carbohydrate' => $request->carbohydrate ?? $request->carbs ?? 0,
                'fat' => $request->fat ?? $request->fats ?? 0,
                'fiber' => $request->fiber ?? 0,
                'sodium' => $request->sodium ?? 0,
                'potassium' => $request->potassium ?? 0,
            ];
            
            // Handle image URL (can be from image_url or image field)
            if ($request->has('image_url') && !empty($request->image_url)) {
                $data['fatsecret_url'] = $request->image_url;
            } elseif ($request->has('image') && !empty($request->image)) {
                $data['fatsecret_url'] = $request->image;
            }
            
            // Create the food
            $food = Food::create($data);
            
            return response()->json([
                'success' => true,
                'message' => 'Food created successfully',
                'data' => $food
            ], 201);
            
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileFoodController@createFood');
        }
    }
    
    /**
     * Update a food item
     */
    public function updateFood(Request $request, $foodId)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'serving_description' => 'nullable|string',
                'brand' => 'nullable|string|max:255',
                'barcode' => 'nullable|string|max:50',
                'calories' => 'nullable|numeric|min:0',
                'protein' => 'nullable|numeric|min:0',
                'carbohydrate' => 'nullable|numeric|min:0',
                'carbs' => 'nullable|numeric|min:0',
                'fat' => 'nullable|numeric|min:0',
                'fats' => 'nullable|numeric|min:0',
                'fiber' => 'nullable|numeric|min:0',
                'sodium' => 'nullable|numeric|min:0',
                'potassium' => 'nullable|numeric|min:0',
                'image_url' => 'nullable|string|max:500',
            ]);
            
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }
            
            $food = Food::findOrFail($foodId);
            
            $updateData = [
                'name' => $request->name,
                'description' => $request->description,
                'serving_description' => $request->serving_description,
                'brand' => $request->brand,
                'barcode' => $request->barcode,
                'calories' => $request->calories ?? $food->calories ?? 0,
                'protein' => $request->protein ?? $food->protein ?? 0,
                'carbohydrate' => $request->carbohydrate ?? $request->carbs ?? $food->carbohydrate ?? 0,
                'fat' => $request->fat ?? $request->fats ?? $food->fat ?? 0,
                'fiber' => $request->fiber ?? $food->fiber ?? 0,
                'sodium' => $request->sodium ?? $food->sodium ?? 0,
                'potassium' => $request->potassium ?? $food->potassium ?? 0,
            ];
            
            if ($request->has('image_url') && !empty($request->image_url)) {
                $updateData['fatsecret_url'] = $request->image_url;
            }
            
            $food->update($updateData);
            
            return response()->json([
                'success' => true,
                'message' => 'Food updated successfully',
                'data' => $food
            ]);
            
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileFoodController@updateFood');
        }
    }
    
    /**
     * Delete a food item
     */
    public function deleteFood(Request $request, $foodId)
    {
        try {
            $food = Food::findOrFail($foodId);
            
            $food->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Food deleted successfully'
            ]);
            
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileFoodController@deleteFood');
        }
    }
    
    /**
     * Get assigned meals for coach's members
     */
    public function getAssignedMeals(Request $request)
    {
        try {
            $coach = $this->getCoach($request);
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found or unauthorized'
                ], 403);
            }
            
            // Get coach's assigned member IDs
            $memberIds = CoachAssignment::where('coach_id', $coach->id)
                ->where('status', 'active')
                ->pluck('member_id')
                ->toArray();
            
            if (empty($memberIds)) {
                return response()->json([
                    'success' => true,
                    'data' => [],
                    'pagination' => [
                        'current_page' => 1,
                        'total' => 0,
                        'per_page' => 15,
                        'last_page' => 1,
                    ],
                    'message' => 'No assigned members found'
                ]);
            }
            
            // Get meal logs for these members (exclude soft-deleted records)
            $query = AssignedMealsMember::with([
                'member:id,firstname,lastname,email,profile_image', 
                'memberDetails.food',
                'template:id,name,description,calories,protein,carbs,fats'
            ])
                ->whereIn('member_id', $memberIds)
                ->whereNull('deleted_at'); // Explicitly exclude soft-deleted records
            
            // Filter by member_id if provided
            if ($request->has('member_id') && $request->member_id) {
                // Convert to integer for comparison
                $requestMemberId = (int)$request->member_id;
                if (in_array($requestMemberId, $memberIds)) {
                    $query->where('member_id', $requestMemberId);
                } else {
                    \Log::warning('MobileFoodController: Coach tried to access member they don\'t have access to', [
                        'coach_id' => $coach->id,
                        'requested_member_id' => $requestMemberId,
                        'assigned_member_ids' => $memberIds,
                    ]);
                    return response()->json([
                        'success' => false,
                        'message' => 'You do not have access to this member'
                    ], 403);
                }
            }
            
            // Filter by date range
            if ($request->has('date_from') && $request->date_from) {
                $dateFrom = $request->date_from;
                $dateTo = $request->date_to ?: $request->date_from;
                
                // Include:
                // 1) Daily logs with date within range
                // 2) Assigned meal plans that overlap the range using start_date/end_date
                //    (CRM often uses start_date/end_date and leaves date NULL)
                $query->where(function ($q) use ($dateFrom, $dateTo) {
                    $q->whereBetween('date', [$dateFrom, $dateTo])
                      ->orWhere(function ($qq) use ($dateFrom, $dateTo) {
                          $qq->whereNull('date')
                             ->whereNotNull('start_date')
                             ->where('start_date', '<=', $dateTo)
                             ->where(function ($qqq) use ($dateFrom) {
                                 $qqq->whereNull('end_date')
                                     ->orWhere('end_date', '>=', $dateFrom);
                             });
                      });
                });
            }
            
            if ($request->has('date_to') && $request->date_to) {
                // date_to is handled together with date_from above to support start_date/end_date overlaps
            }
            
            // Filter by date (single date)
            if ($request->has('date') && $request->date) {
                $date = $request->date;
                $query->where(function ($q) use ($date) {
                    $q->where('date', $date)
                      ->orWhere(function ($qq) use ($date) {
                          $qq->whereNull('date')
                             ->whereNotNull('start_date')
                             ->where('start_date', '<=', $date)
                             ->where(function ($qqq) use ($date) {
                                 $qqq->whereNull('end_date')
                                     ->orWhere('end_date', '>=', $date);
                             });
                      });
                });
            }
            
            // Pagination
            $perPage = min($request->get('per_page', 15), 100);
            $meals = $query->orderByRaw('COALESCE(`date`, `start_date`) DESC')
                          ->orderBy('created_at', 'desc')
                          ->paginate($perPage);
            
            // Transform data for mobile app
            $transformedMeals = $meals->getCollection()->map(function ($meal) {
                return [
                    'id' => $meal->id,
                    'member' => $meal->member ? [
                        'id' => $meal->member->id,
                        'name' => $meal->member->firstname . ' ' . $meal->member->lastname,
                        'email' => $meal->member->email,
                        'profile_image' => $meal->member->profile_image,
                    ] : null,
                    'member_id' => $meal->member_id,
                    // Some assigned plans have date NULL and use start_date/end_date (CRM behavior)
                    'date' => $meal->date
                        ? $meal->date->format('Y-m-d')
                        : ($meal->start_date ? $meal->start_date->format('Y-m-d') : null),
                    'weight' => $meal->weight,
                    'body_fat' => $meal->body,
                    'water_intake' => $meal->water,
                    'hunger' => $meal->hunger,
                    'strength' => $meal->strength,
                    'energy' => $meal->energy,
                    'meal_deviations' => $meal->meal_deviations,
                    'activities' => $meal->activities,
                    'feel' => $meal->feel,
                    'cardio' => $meal->cardio,
                    'plan' => $meal->plan,
                    'calories' => $meal->calories,
                    'protein' => $meal->protein,
                    'carbs' => $meal->carbs,
                    // Fat total field varies across schema versions (fat vs fat_macros)
                    'fat' => $meal->fat_macros ?? $meal->fat,
                    'notes' => $meal->notes,
                    'food_items' => $meal->memberDetails->map(function ($detail) {
                        return [
                            'id' => $detail->id,
                            'food' => $detail->food ? [
                                'id' => $detail->food->id,
                                'name' => $detail->food->name,
                                'description' => $detail->food->description,
                                'serving_description' => $detail->food->serving_description,
                            ] : null,
                            'food_id' => $detail->food_id,
                            'nutrition_type' => $detail->nutrition_type,
                            'quantity' => $detail->quantity,
                            'calories' => $detail->calories,
                            'protein' => $detail->protein,
                            'carbs' => $detail->carbs,
                            'fats' => $detail->fats,
                            'notes' => $detail->notes ?? null,
                        ];
                    }),
                    'template' => $meal->template ? [
                        'id' => $meal->template->id,
                        'name' => $meal->template->name,
                        'description' => $meal->template->description,
                        'calories' => $meal->template->calories,
                        'protein' => $meal->template->protein,
                        'carbs' => $meal->template->carbs,
                        'fats' => $meal->template->fats,
                    ] : null,
                    'template_id' => $meal->template_id,
                    'created_at' => $meal->created_at ? $meal->created_at->format('Y-m-d H:i:s') : null,
                    'updated_at' => $meal->updated_at ? $meal->updated_at->format('Y-m-d H:i:s') : null,
                ];
            });
            
            return response()->json([
                'success' => true,
                'data' => $transformedMeals,
                'pagination' => [
                    'current_page' => $meals->currentPage(),
                    'total' => $meals->total(),
                    'per_page' => $meals->perPage(),
                    'last_page' => $meals->lastPage(),
                ]
            ]);
            
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileFoodController@getAssignedMeals');
        }
    }
    
    /**
     * Add food to member's meal log
     */
    public function addFoodToMember(Request $request)
    {
        try {
            $coach = $this->getCoach($request);
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found or unauthorized'
                ], 403);
            }
            
            $validator = Validator::make($request->all(), [
                'member_id' => 'nullable|exists:members,id',
                'food_id' => 'required|exists:foods,id',
                'food_name' => 'nullable|string|max:255', // Added for saving food name
                'date' => 'required|date',
                'nutrition_type' => 'required|in:breakfast,lunch,dinner,snack,snacks1,snacks2,snacks3',
                'quantity' => 'required|numeric|min:0.1|max:1000',
                'template_id' => 'nullable|exists:meal_plans_template,id',
                'notes' => 'nullable|string|max:1000',
            ]);
            
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }
            
            // Verify coach has access to this member (only if member_id is provided)
            if ($request->has('member_id') && $request->member_id) {
                $hasAccess = CoachAssignment::where('coach_id', $coach->id)
                    ->where('member_id', $request->member_id)
                    ->where('status', 'active')
                    ->exists();
                
                if (!$hasAccess) {
                    return response()->json([
                        'success' => false,
                        'message' => 'You do not have access to this member'
                    ], 403);
                }
            }
            
            DB::beginTransaction();
            
            try {
                // Get gym_id from authenticated user (users table)
                $user = $request->get('auth_user');
                $gym_id = $user && isset($user->gym_id) ? $user->gym_id : 1;
                
                // Get food details
                $food = Food::findOrFail($request->food_id);
                
                // Calculate nutrition values based on quantity
                $quantity = $request->quantity;
                $calories = ($food->calories ?? 0) * $quantity;
                $protein = ($food->protein ?? 0) * $quantity;
                $carbs = ($food->carbohydrate ?? 0) * $quantity;
                $fats = ($food->fat ?? 0) * $quantity;
                
                // If no member_id but template_id is provided, add food directly to template
                if (!$request->has('member_id') || !$request->member_id) {
                    if (!$request->has('template_id') || !$request->template_id) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Either member_id or template_id is required'
                        ], 422);
                    }
                    
                    // Verify template exists and belongs to coach's gym
                    $template = MealPlanTemplate::where('id', $request->template_id)
                        ->where('gym_id', $gym_id)
                        ->whereNull('deleted_at')
                        ->first();
                    
                    if (!$template) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Template not found or you do not have access to it'
                        ], 404);
                    }
                    
                    // Get food name from request or fetch from food record
                    $foodName = $request->food_name;
                    if (!$foodName && $food) {
                        $foodName = $food->name;
                    }
                    
                    // Add food directly to template (MealPlanTemplateDetail)
                    $templateDetail = MealPlanTemplateDetail::create([
                        'template_id' => $request->template_id,
                        'gym_id' => $gym_id,
                        'food_id' => $request->food_id,
                        'food_name' => $foodName,
                        'nutrition_type' => $request->nutrition_type,
                        'quantity' => $quantity,
                        'calories' => $calories,
                        'protein' => $protein,
                        'carbs' => $carbs,
                        'fats' => $fats,
                    ]);
                    
                    DB::commit();
                    
                    return response()->json([
                        'success' => true,
                        'message' => 'Food added to template successfully',
                        'data' => $templateDetail->load('food')
                    ], 201);
                }
                
                // If member_id is provided, proceed with existing logic
                // Find existing assigned meal plan for this member and date
                // Priority 1: If template_id is provided, find by template_id and date/start_date
                // Priority 2: Find by member_id and date (for existing meal logs)
                // Priority 3: Create new meal log if none exists
                $mealLog = null;
                
                if ($request->has('template_id') && $request->template_id) {
                    // First, try to find existing assigned meal plan with this template_id
                    $mealLog = AssignedMealsMember::where('member_id', $request->member_id)
                        ->where('template_id', $request->template_id)
                        ->where(function($query) use ($request) {
                            $query->where('date', $request->date)
                                  ->orWhere('start_date', $request->date)
                                  ->orWhereNull('date'); // Also check if date is null
                        })
                        ->whereNull('deleted_at') // Only find non-deleted assignments
                        ->where(function($subQ) {
                            $subQ->where('is_active', 1)
                                 ->orWhereNull('is_active'); // Include active or null is_active
                        })
                        ->first();
                }
                
                // If not found and template_id provided, or if no template_id, try to find by member_id and date
                if (!$mealLog) {
                    $mealLog = AssignedMealsMember::where('member_id', $request->member_id)
                        ->where(function($query) use ($request) {
                            $query->where('date', $request->date)
                                  ->orWhere('start_date', $request->date);
                        })
                        ->whereNull('deleted_at') // Only find non-deleted assignments
                        ->where(function($subQ) {
                            $subQ->where('is_active', 1)
                                 ->orWhereNull('is_active'); // Include active or null is_active
                        })
                        ->orderBy('created_at', 'desc') // Get the most recent one
                        ->first();
                }
                
                // If still not found, create a new meal log entry
                if (!$mealLog) {
                    // Ensure date is properly formatted (YYYY-MM-DD)
                    $dateToSave = $request->date;
                    if (is_string($dateToSave)) {
                        // Validate and format the date
                        try {
                            $dateObj = new \DateTime($dateToSave);
                            $dateToSave = $dateObj->format('Y-m-d');
                        } catch (\Exception $e) {
                            // If date parsing fails, use today's date
                            $dateToSave = now()->format('Y-m-d');
                        }
                    }
                    
                    // Get member to access coach_id
                    $member = \App\Models\Member::find($request->member_id);
                    $mealLog = AssignedMealsMember::create([
                        'member_id' => $request->member_id,
                        'date' => $dateToSave,
                        'gym_id' => $gym_id,
                        'coach_id' => $member->coach_id ?? null, // Store coach_id from member
                        'template_id' => $request->template_id ?? null,
                    ]);
                } else {
                    // If found, ensure date is set correctly (handle null or invalid dates like 0000-00-00)
                    $needsUpdate = false;
                    $dateToSave = $request->date;
                    
                    // Format the date properly
                    if (is_string($dateToSave)) {
                        try {
                            $dateObj = new \DateTime($dateToSave);
                            $dateToSave = $dateObj->format('Y-m-d');
                        } catch (\Exception $e) {
                            $dateToSave = now()->format('Y-m-d');
                        }
                    }
                    
                    // Check if date is null, empty, or invalid (like 0000-00-00)
                    if (!$mealLog->date || 
                        $mealLog->date === '0000-00-00' || 
                        $mealLog->date === '0000-00-00 00:00:00' ||
                        $mealLog->date !== $dateToSave) {
                        $mealLog->date = $dateToSave;
                        $needsUpdate = true;
                    }
                    
                    if ($needsUpdate) {
                        $mealLog->save();
                    }
                }
                
                // Create meal detail - this should always go into assigned_meals_member_details
                // NOTE: notes column may not exist on some environments if migrations haven't been run yet
                $mealDetailData = [
                    'assigned_meal_id' => $mealLog->id,
                    'member_id' => $request->member_id,
                    'gym_id' => $gym_id,
                    'food_id' => $request->food_id,
                    'nutrition_type' => $request->nutrition_type,
                    'quantity' => $quantity,
                    'calories' => $calories,
                    'protein' => $protein,
                    'carbs' => $carbs,
                    'fats' => $fats,
                ];
                
                if (Schema::hasColumn('assigned_meals_member_details', 'notes')) {
                    $mealDetailData['notes'] = $request->notes ?? null;
                }
                
                $mealDetail = AssignedMealsMemberDetail::create($mealDetailData);
                
                // Update meal log totals
                $this->updateMealLogTotals($mealLog);
                
                DB::commit();
                
                return response()->json([
                    'success' => true,
                    'message' => 'Food added successfully',
                    'data' => $mealDetail->load('food')
                ], 201);
                
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
            
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileFoodController@addFoodToMember');
        }
    }
    
    /**
     * Get meal plan templates
     */
    public function getMealPlanTemplates(Request $request)
    {
        try {
            $coach = $this->getCoach($request);
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found or unauthorized'
                ], 403);
            }

            // Prefer gym_id from authenticated user (users table), fallback to coach record, then 1
            $authUser = $request->get('auth_user');
            $gym_id = ($authUser && isset($authUser->gym_id)) ? (int) $authUser->gym_id : (int) ($coach->gym_id ?? 1);
            
            $query = MealPlanTemplate::with(['details.food', 'category', 'createdByMember', 'createdByAdmin'])
                ->where('gym_id', $gym_id)
                ->where('status', 1);
            
            // Filter by coach_id - coaches can see templates created by their members
            $query->where(function($q) use ($coach) {
                $q->where('coach_id', $coach->id)
                  ->orWhereHas('assignedMeals', function ($subQ) use ($coach) {
                      $subQ->where('coach_id', $coach->id);
                  });
            });

            // If member_id is provided, return only templates assigned to that member
            if ($request->has('member_id') && $request->member_id) {
                $memberId = (int) $request->member_id;
                $query->whereHas('assignedMeals', function ($q) use ($memberId) {
                    $q->where('member_id', $memberId)
                      ->whereNull('deleted_at') // Only include non-deleted assignments
                      ->where(function($subQ) {
                          $subQ->where('is_active', 1)
                               ->orWhereNull('is_active'); // Include active or null is_active
                      });
                });
            }
            
            // Search
            if ($request->has('search') && !empty(trim($request->search))) {
                $search = trim($request->search);
                $query->where(function($q) use ($search) {
                    $q->where('name', 'LIKE', "%{$search}%")
                      ->orWhere('description', 'LIKE', "%{$search}%");
                });
            }
            
            $templates = $query->orderBy('name', 'asc')->get();
            
            // Transform for mobile app
            $transformedTemplates = $templates->map(function ($template) use ($coach) {
                // Get creator name - only set if we can find a valid name
                $createdByName = null;
                if ($template->created_by_type === 'coach' && $template->created_by) {
                    // Try to find coach by created_by ID
                    $creatorCoach = Coach::find($template->created_by);
                    if ($creatorCoach) {
                        $name = trim(($creatorCoach->first_name ?? '') . ' ' . ($creatorCoach->last_name ?? ''));
                        $createdByName = $name ?: ($creatorCoach->email ?? null);
                    }
                } elseif ($template->created_by_type === 'member' && $template->createdByMember) {
                    $createdByName = $template->createdByMember->name ?? $template->createdByMember->membername ?? null;
                } elseif ($template->created_by_type === 'admin' && $template->createdByAdmin) {
                    $name = trim(($template->createdByAdmin->firstname ?? '') . ' ' . ($template->createdByAdmin->lastname ?? ''));
                    $createdByName = $name ?: ($template->createdByAdmin->username ?? null);
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
                    'created_by' => $createdByName,
                    'created_at' => $template->created_at ? $template->created_at->format('Y-m-d H:i:s') : null,
                    'updated_at' => $template->updated_at ? $template->updated_at->format('Y-m-d H:i:s') : null,
                    'category' => $template->category ? [
                        'id' => $template->category->id,
                        'name' => $template->category->name,
                    ] : null,
                    'food_items' => $template->details->map(function ($detail) {
                        return [
                            'id' => $detail->id,
                            'food' => $detail->food ? [
                                'id' => $detail->food->id,
                                'name' => $detail->food->name,
                                'description' => $detail->food->description,
                            ] : null,
                            'food_id' => $detail->food_id,
                            'nutrition_type' => $detail->nutrition_type,
                            'quantity' => $detail->quantity,
                            'label_serving' => $detail->label_serving,
                            'serving_grams' => $detail->serving_grams,
                            'normalized_serving' => $detail->normalized_serving,
                            'calories' => $detail->calories,
                            'protein' => $detail->protein,
                            'carbs' => $detail->carbs,
                            'fats' => $detail->fats,
                        ];
                    }),
                ];
            });
            
            return response()->json([
                'success' => true,
                'data' => $transformedTemplates
            ]);
            
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileFoodController@getMealPlanTemplates');
        }
    }
    
    /**
     * Create meal plan template
     */
    public function createMealPlanTemplate(Request $request)
    {
        try {
            $coach = $this->getCoach($request);
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found or unauthorized'
                ], 403);
            }

            // Prefer gym_id from authenticated user (users table), fallback to coach record, then 1
            $authUser = $request->get('auth_user');
            $gym_id = ($authUser && isset($authUser->gym_id)) ? (int) $authUser->gym_id : (int) ($coach->gym_id ?? 1);
            
            // Support both methods: with food_items OR with direct macro values
            $hasFoodItems = $request->has('food_items') && is_array($request->food_items) && count($request->food_items) > 0;
            
            if ($hasFoodItems) {
                // Validate for food_items method
                $validator = Validator::make($request->all(), [
                    'name' => 'required|string|max:255',
                    'description' => 'nullable|string',
                    'food_items' => 'required|array|min:1',
                    'food_items.*.food_id' => 'required|exists:foods,id',
                    'food_items.*.nutrition_type' => 'required|in:breakfast,lunch,dinner,snack',
                    'food_items.*.quantity' => 'required|numeric|min:0.1',
                ]);
            } else {
                // Validate for direct macro values method (or template without food items)
                $validator = Validator::make($request->all(), [
                    'name' => 'required|string|max:255',
                    'description' => 'nullable|string',
                    'calories' => 'nullable|numeric|min:0',
                    'protein' => 'nullable|numeric|min:0',
                    'carbs' => 'nullable|numeric|min:0',
                    'fats' => 'nullable|numeric|min:0',
                    'macro_unit' => 'nullable|in:grams,percentage',
                    'category_id' => 'nullable|integer|exists:nutrition_categories,id',
                    'meal_types' => 'nullable|array',
                ]);
            }
            
            if ($validator->fails()) {
                $errors = $validator->errors();
                $firstError = $errors->first();
                return response()->json([
                    'success' => false,
                    'message' => $firstError ?: 'Please fill in all required fields.',
                    'errors' => $errors
                ], 422);
            }
            
            DB::beginTransaction();
            
            try {
                $totals = ['calories' => 0, 'protein' => 0, 'carbs' => 0, 'fats' => 0];
                
                if ($hasFoodItems) {
                    // Calculate totals from food items
                    foreach ($request->food_items as $item) {
                        $food = Food::findOrFail($item['food_id']);
                        $quantity = $item['quantity'];
                        $totals['calories'] += ($food->calories ?? 0) * $quantity;
                        $totals['protein'] += ($food->protein ?? 0) * $quantity;
                        $totals['carbs'] += ($food->carbohydrate ?? 0) * $quantity;
                        $totals['fats'] += ($food->fat ?? 0) * $quantity;
                    }
                } else {
                    // Use direct macro values
                    $totals['calories'] = $request->calories ?? 0;
                    $totals['protein'] = $request->protein ?? 0;
                    $totals['carbs'] = $request->carbs ?? 0;
                    $totals['fats'] = $request->fats ?? 0;
                }
                
                // Create template
                $templateData = [
                    'gym_id' => $gym_id,
                    'coach_id' => $coach->id, // Add coach_id
                    'name' => $request->name,
                    'description' => $request->description,
                    'calories' => $totals['calories'],
                    'protein' => $totals['protein'],
                    'carbs' => $totals['carbs'],
                    'fats' => $totals['fats'],
                    'status' => 1,
                    'created_by' => $coach->id,
                    'created_by_type' => 'coach',
                ];
                
                // Add meal_image if provided
                if ($request->has('meal_image') && !empty($request->meal_image)) {
                    $templateData['meal_image'] = $request->meal_image;
                }
                
                // Add meals_time if provided
                if ($request->has('meals_time') && !empty($request->meals_time)) {
                    $templateData['meals_time'] = $request->meals_time;
                }
                
                // Add category_id if provided - use category_id from database
                if ($request->has('category_id') && !empty($request->category_id)) {
                    // Verify category exists and belongs to the gym
                    $category = \App\Models\NutritionCategory::where('id', $request->category_id)
                        ->where('is_active', true)
                        ->first();
                    
                    if ($category) {
                        $templateData['category_id'] = $category->id;
                    }
                }
                
                $template = MealPlanTemplate::create($templateData);
                
                // Create template details only if food_items are provided
                if ($hasFoodItems) {
                    foreach ($request->food_items as $item) {
                        $food = Food::findOrFail($item['food_id']);
                        $quantity = $item['quantity'];
                        
                        MealPlanTemplateDetail::create([
                            'template_id' => $template->id,
                            'gym_id' => $gym_id,
                            'food_id' => $item['food_id'],
                            'food_name' => $item['food_name'] ?? $food->name ?? null,
                            'nutrition_type' => $item['nutrition_type'],
                            'quantity' => $quantity,
                            'calories' => ($food->calories ?? 0) * $quantity,
                            'protein' => ($food->protein ?? 0) * $quantity,
                            'carbs' => ($food->carbohydrate ?? 0) * $quantity,
                            'fats' => ($food->fat ?? 0) * $quantity,
                        ]);
                    }
                }
                
                DB::commit();
                
                return response()->json([
                    'success' => true,
                    'message' => 'Meal plan template created successfully',
                    'data' => $template->load('details.food', 'category')
                ], 201);
                
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
            
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileFoodController@createMealPlanTemplate');
        }
    }
    
    /**
     * Assign meal plan template to member
     */
    public function assignMealPlanToMember(Request $request)
    {
        try {
            $coach = $this->getCoach($request);
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found or unauthorized'
                ], 403);
            }
            
            $validator = Validator::make($request->all(), [
                'member_id' => 'required|exists:members,id',
                'template_id' => 'required|exists:meal_plans_template,id',
                'category_id' => 'nullable|exists:nutrition_categories,id',
                'start_date' => 'nullable|date',
                'end_date' => 'nullable|date|after:start_date',
                'description' => 'nullable|string',
            ]);
            
            if ($validator->fails()) {
                $errors = $validator->errors();
                $firstError = $errors->first();
                return response()->json([
                    'success' => false,
                    'message' => $firstError ?: 'Please fill in all required fields.',
                    'errors' => $errors
                ], 422);
            }
            
            // Verify coach has access
            $hasAccess = CoachAssignment::where('coach_id', $coach->id)
                ->where('member_id', $request->member_id)
                ->where('status', 'active')
                ->exists();
            
            if (!$hasAccess) {
                return response()->json([
                    'success' => false,
                    'message' => 'You do not have access to this member'
                ], 403);
            }
            
            DB::beginTransaction();
            
            try {
                // Get gym_id from authenticated user (users table)
                $user = $request->get('auth_user');
                $gym_id = $user && isset($user->gym_id) ? $user->gym_id : 1;
                
                // Default start_date to today if not provided
                $startDate = $request->start_date ?: now()->format('Y-m-d');
                
                // Get category_id and category_name from template if not provided
                $template = null;
                if ($request->template_id) {
                    $template = \App\Models\MealPlanTemplate::find($request->template_id);
                }
                
                $categoryId = $request->category_id ?? ($template && isset($template->category_id) ? $template->category_id : null);
                $categoryName = null;
                
                // If category_id is provided, fetch the category name
                if ($categoryId) {
                    $category = \App\Models\NutritionCategory::find($categoryId);
                    if ($category && isset($category->name)) {
                        $categoryName = $category->name;
                    }
                } elseif ($template && isset($template->category) && $template->category && isset($template->category->name)) {
                    // If template has a category relationship, use it
                    $categoryName = $template->category->name;
                }
                
                // Get member to access coach_id
                $member = \App\Models\Member::find($request->member_id);
                // Create assignment with both category_id and category_name
                // Set date to start_date if not provided (for backward compatibility)
                $assignment = AssignedMealsMember::create([
                    'member_id' => $request->member_id,
                    'template_id' => $request->template_id,
                    'coach_id' => $member->coach_id ?? null, // Store coach_id from member
                    'category_id' => $categoryId,
                    'category_name' => $categoryName,
                    'gym_id' => $gym_id,
                    'date' => $startDate, // Set date field (required column)
                    'start_date' => $startDate,
                    'end_date' => $request->end_date,
                    'assigned_by' => $coach->id,
                    'description' => $request->description,
                    'is_active' => 1, // Set as active by default
                ]);
                
                DB::commit();
                
                return response()->json([
                    'success' => true,
                    'message' => 'Meal plan assigned successfully',
                    'data' => $assignment->load('member', 'template')
                ], 201);
                
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
            
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileFoodController@assignMealPlanToMember');
        }
    }
    
    /**
     * Delete food item from member's meal log
     */
    public function deleteFoodItem(Request $request, $foodItemId)
    {
        try {
            $coach = $this->getCoach($request);
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found or unauthorized'
                ], 403);
            }
            
            // Find the food item detail
            $foodItem = AssignedMealsMemberDetail::findOrFail($foodItemId);
            
            // Get the meal log
            $mealLog = AssignedMealsMember::findOrFail($foodItem->assigned_meal_id);
            
            // Verify coach has access to this member
            $hasAccess = CoachAssignment::where('coach_id', $coach->id)
                ->where('member_id', $mealLog->member_id)
                ->where('status', 'active')
                ->exists();
            
            if (!$hasAccess) {
                return response()->json([
                    'success' => false,
                    'message' => 'You do not have access to this member'
                ], 403);
            }
            
            DB::beginTransaction();
            
            try {
                // Delete the food item
                $foodItem->delete();
                
                // Update meal log totals
                $this->updateMealLogTotals($mealLog);
                
                DB::commit();
                
                return response()->json([
                    'success' => true,
                    'message' => 'Food item deleted successfully'
                ]);
                
            } catch (Throwable $e) {
                DB::rollBack();
                throw $e;
            }
            
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileFoodController@deleteFoodItem');
        }
    }
    
    /**
     * Update food item in member's meal log
     */
    public function updateFoodItem(Request $request, $foodItemId)
    {
        try {
            $coach = $this->getCoach($request);
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found or unauthorized'
                ], 403);
            }
            
            // Validate request
            $validator = Validator::make($request->all(), [
                'quantity' => 'nullable|numeric|min:0.01',
                'nutrition_type' => 'nullable|string|in:breakfast,lunch,dinner,snack,snacks1,snacks2,snacks3,other',
            ]);
            
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }
            
            // Find the food item detail
            $foodItem = AssignedMealsMemberDetail::with('food')->findOrFail($foodItemId);
            
            // Get the meal log
            $mealLog = AssignedMealsMember::findOrFail($foodItem->assigned_meal_id);
            
            // Verify coach has access to this member
            $hasAccess = CoachAssignment::where('coach_id', $coach->id)
                ->where('member_id', $mealLog->member_id)
                ->where('status', 'active')
                ->exists();
            
            if (!$hasAccess) {
                return response()->json([
                    'success' => false,
                    'message' => 'You do not have access to this member'
                ], 403);
            }
            
            DB::beginTransaction();
            
            try {
                $food = $foodItem->food;
                
                // Update quantity if provided
                $quantity = $request->has('quantity') ? $request->quantity : $foodItem->quantity;
                
                // Recalculate nutrition values based on new quantity
                $calories = ($food->calories ?? 0) * $quantity;
                $protein = ($food->protein ?? 0) * $quantity;
                $carbs = ($food->carbohydrate ?? 0) * $quantity;
                $fats = ($food->fat ?? 0) * $quantity;
                
                // Update food item
                $foodItem->update([
                    'quantity' => $quantity,
                    'nutrition_type' => $request->nutrition_type ?? $foodItem->nutrition_type,
                    'calories' => $calories,
                    'protein' => $protein,
                    'carbs' => $carbs,
                    'fats' => $fats,
                ]);
                
                // Update meal log totals
                $this->updateMealLogTotals($mealLog);
                
                DB::commit();
                
                // Reload food item with relationships
                $foodItem->load('food');
                
                return response()->json([
                    'success' => true,
                    'message' => 'Food item updated successfully',
                    'data' => $foodItem
                ]);
                
            } catch (Throwable $e) {
                DB::rollBack();
                throw $e;
            }
            
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileFoodController@updateFoodItem');
        }
    }
    
    /**
     * Update meal plan template
     */
    public function updateMealPlanTemplate(Request $request, $templateId)
    {
        try {
            $coach = $this->getCoach($request);
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found or unauthorized'
                ], 403);
            }
            
            // Validate request
            $validator = Validator::make($request->all(), [
                'name' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'calories' => 'nullable|numeric|min:0',
                'protein' => 'nullable|numeric|min:0',
                'carbs' => 'nullable|numeric|min:0',
                'fats' => 'nullable|numeric|min:0',
            ]);
            
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }
            
            // Find the template
            $template = MealPlanTemplate::findOrFail($templateId);
            
            DB::beginTransaction();
            
            try {
                $updateData = [];
                
                if ($request->has('name')) {
                    $updateData['name'] = $request->name;
                }
                
                if ($request->has('description')) {
                    $updateData['description'] = $request->description;
                }
                
                if ($request->has('calories')) {
                    $updateData['calories'] = $request->calories;
                }
                
                if ($request->has('protein')) {
                    $updateData['protein'] = $request->protein;
                }
                
                if ($request->has('carbs')) {
                    $updateData['carbs'] = $request->carbs;
                }
                
                if ($request->has('fats')) {
                    $updateData['fats'] = $request->fats;
                }
                
                $template->update($updateData);
                
                DB::commit();
                
                return response()->json([
                    'success' => true,
                    'message' => 'Meal plan template updated successfully',
                    'data' => $template
                ]);
                
            } catch (Throwable $e) {
                DB::rollBack();
                throw $e;
            }
            
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileFoodController@updateMealPlanTemplate');
        }
    }
    
    /**
     * Delete meal plan template
     */
    public function deleteMealPlanTemplate(Request $request, $templateId)
    {
        try {
            $coach = $this->getCoach($request);
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found or unauthorized'
                ], 403);
            }
            
            // Find the template
            $template = MealPlanTemplate::findOrFail($templateId);
            
            // Verify the template belongs to the coach's gym
            if ($template->gym_id !== ($coach->gym_id ?? 1)) {
                return response()->json([
                    'success' => false,
                    'message' => 'You do not have permission to delete this template'
                ], 403);
            }
            
            DB::beginTransaction();
            
            try {
                // Delete template details first (if cascade delete is not configured)
                MealPlanTemplateDetail::where('template_id', $template->id)->delete();
                
                // Delete the template
                $template->delete();
                
                DB::commit();
                
                return response()->json([
                    'success' => true,
                    'message' => 'Meal plan template deleted successfully'
                ]);
                
            } catch (Throwable $e) {
                DB::rollBack();
                throw $e;
            }
            
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileFoodController@deleteMealPlanTemplate');
        }
    }
    
    /**
     * Delete a food item from meal plan template
     */
    /**
     * Update template detail quantity
     */
    public function updateTemplateDetail(Request $request, $detailId)
    {
        try {
            $coach = $this->getCoach($request);
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found or unauthorized'
                ], 403);
            }
            
            // Validate request
            $request->validate([
                'quantity' => 'required|numeric|min:0.01|max:999.99',
            ]);
            
            // Find the template detail
            $templateDetail = MealPlanTemplateDetail::findOrFail($detailId);
            
            // Find the template
            $template = MealPlanTemplate::findOrFail($templateDetail->template_id);
            
            // Verify the template belongs to the coach's gym
            if ($template->gym_id !== ($coach->gym_id ?? 1)) {
                return response()->json([
                    'success' => false,
                    'message' => 'You do not have permission to update this item'
                ], 403);
            }
            
            DB::beginTransaction();
            
            try {
                // Get the food item to recalculate nutrition values
                $food = $templateDetail->food;
                
                if (!$food) {
                    DB::rollBack();
                    return response()->json([
                        'success' => false,
                        'message' => 'Food item not found'
                    ], 404);
                }
                
                $quantity = (float) $request->quantity;
                
                // Recalculate nutrition values based on new quantity
                // Get base values from food table (per serving)
                $baseCalories = (float) ($food->calories ?? 0);
                $baseProtein = (float) ($food->protein ?? 0);
                $baseCarbs = (float) ($food->carbohydrate ?? 0);
                $baseFats = (float) ($food->fat ?? 0);
                
                // Calculate new values: base * quantity
                $calories = $baseCalories * $quantity;
                $protein = $baseProtein * $quantity;
                $carbs = $baseCarbs * $quantity;
                $fats = $baseFats * $quantity;
                
                // Update the template detail
                $templateDetail->update([
                    'quantity' => $quantity,
                    'calories' => round($calories, 2),
                    'protein' => round($protein, 2),
                    'carbs' => round($carbs, 2),
                    'fats' => round($fats, 2),
                ]);
                
                DB::commit();
                
                // Reload with relationships
                $templateDetail->load('food');
                
                return response()->json([
                    'success' => true,
                    'message' => 'Quantity updated successfully',
                    'data' => $templateDetail
                ]);
                
            } catch (Throwable $e) {
                DB::rollBack();
                throw $e;
            }
            
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileFoodController@updateTemplateDetail');
        }
    }
    
    public function deleteTemplateDetail(Request $request, $detailId)
    {
        try {
            $coach = $this->getCoach($request);
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found or unauthorized'
                ], 403);
            }
            
            // Find the template detail
            $templateDetail = MealPlanTemplateDetail::findOrFail($detailId);
            
            // Find the template
            $template = MealPlanTemplate::findOrFail($templateDetail->template_id);
            
            // Verify the template belongs to the coach's gym
            if ($template->gym_id !== ($coach->gym_id ?? 1)) {
                return response()->json([
                    'success' => false,
                    'message' => 'You do not have permission to delete this item'
                ], 403);
            }
            
            DB::beginTransaction();
            
            try {
                // Delete the template detail
                $templateDetail->delete();
                
                DB::commit();
                
                return response()->json([
                    'success' => true,
                    'message' => 'Food item deleted successfully'
                ]);
                
            } catch (Throwable $e) {
                DB::rollBack();
                throw $e;
            }
            
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileFoodController@deleteTemplateDetail');
        }
    }
    
    /**
     * Update meal log totals
     */
    private function updateMealLogTotals($mealLog)
    {
        $details = AssignedMealsMemberDetail::where('assigned_meal_id', $mealLog->id)->get();
        
        $totals = [
            'calories' => (int)round($details->sum('calories')),
            'protein' => round($details->sum('protein'), 2),
            'carbs' => round($details->sum('carbs'), 2),
            'fat_macros' => round($details->sum('fats'), 2),
        ];
        
        $mealLog->update($totals);
    }
    
    /**
     * Unassign meal plan template from member
     */
    public function unassignMealPlanFromMember(Request $request, $memberId, $assignmentId)
    {
        try {
            $coach = $this->getCoach($request);
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found or unauthorized'
                ], 403);
            }
            
            // Verify coach has access to this member
            $hasAccess = CoachAssignment::where('coach_id', $coach->id)
                ->where('member_id', $memberId)
                ->where('status', 'active')
                ->exists();
            
            if (!$hasAccess) {
                return response()->json([
                    'success' => false,
                    'message' => 'You do not have access to this member'
                ], 403);
            }
            
            // Find the assigned meal plan (only non-deleted ones)
            $assignment = AssignedMealsMember::where('id', $assignmentId)
                ->where('member_id', $memberId)
                ->whereNull('deleted_at') // Only find non-deleted assignments
                ->first();
            
            if (!$assignment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Assigned meal plan not found'
                ], 404);
            }
            
            DB::beginTransaction();
            
            try {
                // Delete associated member details first
                AssignedMealsMemberDetail::where('assigned_meal_id', $assignment->id)
                    ->where('member_id', $memberId)
                    ->delete();
                
                // Delete the assignment
                $assignment->delete();
                
                DB::commit();
                
                return response()->json([
                    'success' => true,
                    'message' => 'Meal plan unassigned successfully'
                ]);
                
            } catch (Throwable $e) {
                DB::rollBack();
                throw $e;
            }
            
        } catch (Throwable $e) {
            return $this->handleApiError($e, 'MobileFoodController@unassignMealPlanFromMember');
        }
    }
}

