<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MealPlanTemplate;
use App\Models\MealPlanTemplateDetail;
use App\Models\Food;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class NutritionController extends Controller
{
    public function test()
    {
        // Get count of meal plan templates
        $count = MealPlanTemplate::count();
        
        return response()->json([
            'success' => true,
            'message' => 'Nutrition controller is working!',
            'timestamp' => now(),
            'meal_plan_templates_count' => $count,
            'sample_plans' => MealPlanTemplate::select('id', 'name', 'gym_id')->limit(5)->get()
        ]);
    }

    public function store(Request $request)
    {
        $gymId = $request->user('api')->gym_id ;

        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }   
        $request->validate([
           'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'instructions' => 'nullable|string',
            'meals_time' => 'nullable|string',
            'category_id' => 'nullable|integer|exists:nutrition_categories,id',
            'status' => 'required|in:0,1', // Allow string or integer
            'calories' => 'required|string',
            'protein' => 'required|string',
            'carbs' => 'required|string',
            'fats' => 'required|string',
            'target_protein' => 'nullable|string',
            'target_carbs' => 'nullable|string',
            'target_fat' => 'nullable|string',
            'target_calories' => 'nullable|string',
            'nutrition_details' => 'required|string', // JSON string
            'meal_image' => 'nullable', // Can be either file upload or string path
        ]);

        // Handle image - can be either file upload or string path (for default images)
        $imagePath = null;
        if ($request->hasFile('meal_image')) {
            // Handle file upload
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
        } elseif ($request->has('meal_image') && !empty($request->meal_image) && is_string($request->meal_image)) {
            // Handle string path (for default images)
            $imagePath = $request->meal_image;
        }

        // Use database transaction to ensure data integrity
        DB::beginTransaction();
        try {
            $user = $request->user('api');
            
            // Create Meal Plan Template
            $template = MealPlanTemplate::create([
                'gym_id' => $gymId,
                'name' => $request->name,
                'description' => $request->description,
                'instructions' => $request->instructions,
                'meals_time' => $request->meals_time,
                'category_id' => $request->category_id,
                'status' => (int) $request->status, // Convert to integer
                'calories' => $request->calories,
                'protein' => $request->protein,
                'carbs' => $request->carbs,
                'fats' => $request->fats,
                'target_protein' => $request->target_protein,
                'target_carbs' => $request->target_carbs,
                'target_fat' => $request->target_fat,
                'target_calories' => $request->target_calories,
                'meal_image' => $imagePath,
                'created_by' => $user->id,
                'created_by_type' => 'admin',
            ]);

            // Parse and create Meal Plan Template Details
            $nutritionDetails = json_decode($request->nutrition_details, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new \Exception('Invalid JSON in nutrition_details: ' . json_last_error_msg());
            }
            
            // Verify table structure exists
            if (!Schema::hasTable('meal_plan_template_details')) {
                throw new \Exception('meal_plan_template_details table does not exist. Please run migrations.');
            }
            
            if (is_array($nutritionDetails) && count($nutritionDetails) > 0) {
                $createdCount = 0;
                foreach ($nutritionDetails as $index => $detail) {
                    try {
                        // Validate required fields
                        if (!isset($detail['food_id']) || !isset($detail['nutrition_type'])) {
                            \Log::warning('Missing required fields in detail (store)', [
                                'index' => $index,
                                'detail' => $detail
                            ]);
                            continue;
                        }
                        
                        // Validate food_id exists (if foods table exists)
                        // Note: We log a warning but don't fail here - let the foreign key constraint handle it
                        if (Schema::hasTable('foods')) {
                            $foodExists = DB::table('foods')->where('id', $detail['food_id'])->exists();
                            if (!$foodExists) {
                                \Log::warning('Food ID does not exist (store) - will attempt insert anyway', [
                                    'index' => $index,
                                    'food_id' => $detail['food_id'],
                                    'detail' => $detail
                                ]);
                                // Don't fail here - let the database foreign key constraint handle it
                            }
                        }
                        
                    // Convert string values to numeric for decimal columns
                    $calories = isset($detail['calories']) && $detail['calories'] !== '' 
                        ? (float) $detail['calories'] : 0;
                    $protein = isset($detail['protein']) && $detail['protein'] !== '' 
                        ? (float) $detail['protein'] : 0;
                    $carbs = isset($detail['carbs']) && $detail['carbs'] !== '' 
                        ? (float) $detail['carbs'] : 0;
                    $fats = isset($detail['fats']) && $detail['fats'] !== '' 
                        ? (float) $detail['fats'] : 0;
                    $fiber = isset($detail['fiber']) && $detail['fiber'] !== '' && $detail['fiber'] !== null
                        ? (float) $detail['fiber'] : null;
                    $sodium = isset($detail['sodium']) && $detail['sodium'] !== '' && $detail['sodium'] !== null
                        ? (float) $detail['sodium'] : null;
                    $potassium = isset($detail['potassium']) && $detail['potassium'] !== '' && $detail['potassium'] !== null
                        ? (float) $detail['potassium'] : null;
                    
                    // Get food serving_description as fallback for label_serving and normalized_serving
                    $food = null;
                    $foodServingDescription = null;
                    $foodName = null;
                    if (Schema::hasTable('foods')) {
                        try {
                            $food = Food::find($detail['food_id']);
                            if ($food) {
                                if (!empty(trim($food->serving_description ?? ''))) {
                                    $foodServingDescription = trim($food->serving_description);
                                }
                                // Get food name for food_name column
                                $foodName = $food->name ?? null;
                            }
                        } catch (\Exception $e) {
                            \Log::warning('Could not fetch food for serving_description fallback', [
                                'food_id' => $detail['food_id'],
                                'error' => $e->getMessage()
                            ]);
                        }
                    }
                    
                    // Determine normalized_serving and label_serving with fallbacks
                    $normalizedServing = null;
                    if (isset($detail['normalized_serving']) && !empty(trim($detail['normalized_serving']))) {
                        $normalizedServing = trim($detail['normalized_serving']);
                    } elseif ($foodServingDescription) {
                        $normalizedServing = $foodServingDescription;
                    }
                    
                    $labelServing = null;
                    if (isset($detail['label_serving']) && !empty(trim($detail['label_serving']))) {
                        $labelServing = trim($detail['label_serving']);
                    } elseif ($foodServingDescription) {
                        $labelServing = $foodServingDescription;
                    }
                    
                    MealPlanTemplateDetail::create([
                        'template_id' => $template->id,
                        'gym_id' => $gymId, // Get from authenticated user
                        'food_id' => (int) $detail['food_id'],
                        'food_name' => $foodName, // Store food name from foods table
                        'nutrition_type' => $detail['nutrition_type'],
                        'quantity' => isset($detail['quantity']) ? (float) $detail['quantity'] : 1,
                        'normalized_serving' => $normalizedServing,
                        'label_serving' => $labelServing,
                        'calories' => $calories,
                        'protein' => $protein,
                        'carbs' => $carbs,
                        'fats' => $fats,
                        'fiber' => $fiber,
                        'sodium' => $sodium,
                        'potassium' => $potassium,
                        'notes' => isset($detail['notes']) && !empty($detail['notes']) ? $detail['notes'] : null,
                    ]);
                        $createdCount++;
                    } catch (\Illuminate\Database\QueryException $e) {
                        \Log::error('Database error creating meal plan template detail (store)', [
                            'index' => $index,
                            'error' => $e->getMessage(),
                            'sql_state' => $e->errorInfo[0] ?? null,
                            'driver_code' => $e->errorInfo[1] ?? null,
                            'error_message' => $e->errorInfo[2] ?? null,
                            'sql' => $e->getSql() ?? null,
                            'bindings' => $e->getBindings() ?? null,
                            'detail' => $detail
                        ]);
                        throw $e; // Re-throw to rollback transaction
                    } catch (\Exception $e) {
                        \Log::error('Error creating meal plan template detail (store)', [
                            'index' => $index,
                            'error' => $e->getMessage(),
                            'trace' => $e->getTraceAsString(),
                            'detail' => $detail
                        ]);
                        throw $e; // Re-throw to rollback transaction
                    }
                }
                \Log::info('Nutrition details created in store', [
                    'created' => $createdCount,
                    'total' => count($nutritionDetails)
                ]);
            } else {
                \Log::info('nutrition_details is empty array - no details to save');
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Meal plan template created successfully.',
                'id' => $template->id,
                'details_count' => isset($createdCount) ? $createdCount : 0
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Error creating meal plan template: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create meal plan template: ' . $e->getMessage()
            ], 500);
        }
    }

    public function index(Request $request)
    {
        $currentUser = $request->user('api');
        $gymId = $currentUser->gym_id;

        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }   

        // Get current user's name for fallback
        $currentUserName = null;
        if ($currentUser) {
            // Check if current user is a coach
            if (!empty($currentUser->coach_id)) {
                $coach = \App\Models\Coach::find($currentUser->coach_id);
                if ($coach) {
                    $firstName = $coach->first_name ?? '';
                    $lastName = $coach->last_name ?? '';
                    $fullName = trim($firstName . ' ' . $lastName);
                    $currentUserName = $fullName ?: $coach->email ?? null;
                }
            }
            
            // If not a coach or coach name not found, use user name
            if (empty($currentUserName)) {
                $firstName = $currentUser->firstname ?? $currentUser->first_name ?? '';
                $lastName = $currentUser->lastname ?? $currentUser->last_name ?? '';
                $fullName = trim($firstName . ' ' . $lastName);
                $currentUserName = $fullName ?: $currentUser->username ?? $currentUser->email ?? 'Current User';
            }
        }

        // Get all meal plan templates for the CRM admin panel
        // Return all templates regardless of visibility or creator type
        $query = MealPlanTemplate::with(['details.food', 'category', 'assignedMeals.member', 'createdByAdmin', 'createdByMember'])
            ->where('gym_id', $gymId);
        
        $nutritionPlans = $query->get();
        
        // Calculate distinct member count and add creator name for each template
        $nutritionPlans->each(function($template) use ($currentUserName) {
            // Count distinct members with active assignments directly in the database
            $count = \DB::table('assigned_meals_members')
                ->where('template_id', $template->id)
                ->where(function($q) {
                    $q->whereNull('end_date')
                      ->orWhere('end_date', '>', now());
                })
                ->selectRaw('COUNT(DISTINCT member_id) as count')
                ->value('count') ?? 0;
            
            $template->members_count = $count;
            
            // Get creator name based on created_by_type and created_by ID
            // Always query directly from database to ensure we get the name
            $creatorName = null;
            
            // Only proceed if created_by is a valid ID (not null, not 0)
            if ($template->created_by && $template->created_by > 0) {
                // Handle 'coach' type first (created_by points directly to coaches table)
                if ($template->created_by_type === 'coach') {
                    $coach = \App\Models\Coach::find($template->created_by);
                    if ($coach) {
                        $firstName = $coach->first_name ?? '';
                        $lastName = $coach->last_name ?? '';
                        $fullName = trim($firstName . ' ' . $lastName);
                        if (!empty($fullName)) {
                            $creatorName = $fullName;
                        } elseif (!empty($coach->email)) {
                            $creatorName = $coach->email;
                        }
                    }
                }
                // Handle 'admin' type (created_by points to users table)
                elseif ($template->created_by_type === 'admin') {
                    $user = \App\Models\User::find($template->created_by);
                    if ($user) {
                        // Check if this user is linked to a coach (has coach_id)
                        if (!empty($user->coach_id)) {
                            // This is a coach - get name from coaches table
                            $coach = \App\Models\Coach::find($user->coach_id);
                            if ($coach) {
                                $firstName = $coach->first_name ?? '';
                                $lastName = $coach->last_name ?? '';
                                $fullName = trim($firstName . ' ' . $lastName);
                                if (!empty($fullName)) {
                                    $creatorName = $fullName;
                                } elseif (!empty($coach->email)) {
                                    $creatorName = $coach->email;
                                }
                            }
                        }
                        
                        // If coach name not found or user is not a coach, use user name (admin)
                        if (empty($creatorName)) {
                            $firstName = $user->firstname ?? $user->first_name ?? '';
                            $lastName = $user->lastname ?? $user->last_name ?? '';
                            $fullName = trim($firstName . ' ' . $lastName);
                            if (!empty($fullName)) {
                                $creatorName = $fullName;
                            } elseif (!empty($user->username)) {
                                $creatorName = $user->username;
                            } elseif (!empty($user->email)) {
                                $creatorName = $user->email;
                            }
                        }
                    } else {
                        // User not found in users table, check if created_by directly points to coaches table as fallback
                        $coach = \App\Models\Coach::find($template->created_by);
                        if ($coach) {
                            $firstName = $coach->first_name ?? '';
                            $lastName = $coach->last_name ?? '';
                            $fullName = trim($firstName . ' ' . $lastName);
                            if (!empty($fullName)) {
                                $creatorName = $fullName;
                            } elseif (!empty($coach->email)) {
                                $creatorName = $coach->email;
                            }
                        }
                    }
                }
                // Handle 'member' type
                elseif ($template->created_by_type === 'member') {
                    $member = \App\Models\Member::find($template->created_by);
                    if ($member) {
                        $firstName = $member->firstname ?? $member->first_name ?? '';
                        $lastName = $member->lastname ?? $member->last_name ?? '';
                        $fullName = trim($firstName . ' ' . $lastName);
                        if (!empty($fullName)) {
                            $creatorName = $fullName;
                        } elseif (!empty($member->membername)) {
                            $creatorName = $member->membername;
                        } elseif (!empty($member->username)) {
                            $creatorName = $member->username;
                        } elseif (!empty($member->email)) {
                            $creatorName = $member->email;
                        }
                    }
                }
                // Handle null or unknown created_by_type - try both users and coaches tables
                else {
                    // Try users table first
                    $user = \App\Models\User::find($template->created_by);
                    if ($user) {
                        // Check if user has coach_id
                        if (!empty($user->coach_id)) {
                            $coach = \App\Models\Coach::find($user->coach_id);
                            if ($coach) {
                                $firstName = $coach->first_name ?? '';
                                $lastName = $coach->last_name ?? '';
                                $fullName = trim($firstName . ' ' . $lastName);
                                if (!empty($fullName)) {
                                    $creatorName = $fullName;
                                } elseif (!empty($coach->email)) {
                                    $creatorName = $coach->email;
                                }
                            }
                        }
                        
                        if (empty($creatorName)) {
                            $firstName = $user->firstname ?? $user->first_name ?? '';
                            $lastName = $user->lastname ?? $user->last_name ?? '';
                            $fullName = trim($firstName . ' ' . $lastName);
                            if (!empty($fullName)) {
                                $creatorName = $fullName;
                            } elseif (!empty($user->username)) {
                                $creatorName = $user->username;
                            } elseif (!empty($user->email)) {
                                $creatorName = $user->email;
                            }
                        }
                    } else {
                        // Try coaches table
                        $coach = \App\Models\Coach::find($template->created_by);
                        if ($coach) {
                            $firstName = $coach->first_name ?? '';
                            $lastName = $coach->last_name ?? '';
                            $fullName = trim($firstName . ' ' . $lastName);
                            if (!empty($fullName)) {
                                $creatorName = $fullName;
                            } elseif (!empty($coach->email)) {
                                $creatorName = $coach->email;
                            }
                        } else {
                            // Try members table as last resort
                            $member = \App\Models\Member::find($template->created_by);
                            if ($member) {
                                $firstName = $member->firstname ?? $member->first_name ?? '';
                                $lastName = $member->lastname ?? $member->last_name ?? '';
                                $fullName = trim($firstName . ' ' . $lastName);
                                if (!empty($fullName)) {
                                    $creatorName = $fullName;
                                } elseif (!empty($member->membername)) {
                                    $creatorName = $member->membername;
                                } elseif (!empty($member->email)) {
                                    $creatorName = $member->email;
                                }
                            }
                        }
                    }
                }
            }
            
            // Always set a creator name, never leave it null or empty
            // Use current user's name as fallback instead of "Unknown Creator"
            if (empty($creatorName)) {
                $creatorName = $currentUserName;
            }
            // If still empty, try to get from template relationships as last resort
            if (empty($creatorName)) {
                if ($template->createdByAdmin) {
                    $user = $template->createdByAdmin;
                    if (!empty($user->coach_id)) {
                        $coach = \App\Models\Coach::find($user->coach_id);
                        if ($coach) {
                            $firstName = $coach->first_name ?? '';
                            $lastName = $coach->last_name ?? '';
                            $fullName = trim($firstName . ' ' . $lastName);
                            $creatorName = $fullName ?: $coach->email ?? null;
                        }
                    }
                    if (empty($creatorName)) {
                        $firstName = $user->firstname ?? $user->first_name ?? '';
                        $lastName = $user->lastname ?? $user->last_name ?? '';
                        $fullName = trim($firstName . ' ' . $lastName);
                        $creatorName = $fullName ?: $user->username ?? $user->email ?? null;
                    }
                } elseif ($template->createdByMember) {
                    $member = $template->createdByMember;
                    $firstName = $member->firstname ?? $member->first_name ?? '';
                    $lastName = $member->lastname ?? $member->last_name ?? '';
                    $fullName = trim($firstName . ' ' . $lastName);
                    $creatorName = $fullName ?: $member->membername ?? $member->username ?? $member->email ?? null;
                }
            }
            // Final fallback - use a generic name instead of null/empty
            $template->creator_name = !empty($creatorName) ? $creatorName : ($currentUserName ?: 'Admin');
        });
        
        return response()->json([
            'success' => true,
            'data' => $nutritionPlans
        ]);
    }

    /**
     * Get nutrition records created by members (personal records)
     * This is useful for admin to review member-created nutrition plans
     */
    public function getMemberCreatedRecords(Request $request)
    {
        $currentUser = $request->user('api');
        $gymId = $currentUser->gym_id;

        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }   

        // Get current user's name for fallback
        $currentUserName = null;
        if ($currentUser) {
            // Check if current user is a coach
            if (!empty($currentUser->coach_id)) {
                $coach = \App\Models\Coach::find($currentUser->coach_id);
                if ($coach) {
                    $firstName = $coach->first_name ?? '';
                    $lastName = $coach->last_name ?? '';
                    $fullName = trim($firstName . ' ' . $lastName);
                    $currentUserName = $fullName ?: $coach->email ?? null;
                }
            }
            
            // If not a coach or coach name not found, use user name
            if (empty($currentUserName)) {
                $firstName = $currentUser->firstname ?? $currentUser->first_name ?? '';
                $lastName = $currentUser->lastname ?? $currentUser->last_name ?? '';
                $fullName = trim($firstName . ' ' . $lastName);
                $currentUserName = $fullName ?: $currentUser->username ?? $currentUser->email ?? 'Current User';
            }
        }

        // Get meal plan templates created by members that haven't been assigned yet
        $query = MealPlanTemplate::with(['details.food', 'category', 'createdByMember'])
            ->where('gym_id', $gymId)
            ->where('created_by_type', 'member')
            ->whereDoesntHave('assignedMeals') // Only show unassigned personal records
            ->get();
        
        // Ensure all detail fields are included in the response by making them visible
        $query->each(function($template) {
            $template->details->each(function($detail) {
                // Force the attributes to be included in JSON serialization
                $detail->makeVisible(['normalized_serving', 'label_serving', 'notes', 'food_name']);
                // Ensure the attributes are set (in case they're null)
                if (!isset($detail->normalized_serving)) {
                    $detail->normalized_serving = null;
                }
                if (!isset($detail->label_serving)) {
                    $detail->label_serving = null;
                }
                if (!isset($detail->notes)) {
                    $detail->notes = null;
                }
                // If food_name is not set, try to get it from the food relationship
                if (!isset($detail->food_name) && $detail->food) {
                    $detail->food_name = $detail->food->name ?? null;
                }
            });
        });

        // Calculate distinct member count and add creator name for each template
        $memberRecords = $query->map(function($template) use ($currentUserName) {
            // Count distinct members with active assignments directly in the database
            $count = \DB::table('assigned_meals_members')
                ->where('template_id', $template->id)
                ->where(function($q) {
                    $q->whereNull('end_date')
                      ->orWhere('end_date', '>', now());
                })
                ->selectRaw('COUNT(DISTINCT member_id) as count')
                ->value('count') ?? 0;
            
            $template->members_count = $count;
            
            // Get creator name - query directly from database
            $creatorName = null;
            // Only proceed if created_by is a valid ID (not null, not 0)
            if ($template->created_by && $template->created_by > 0 && $template->created_by_type) {
                if ($template->created_by_type === 'member') {
                    // Check members table
                    $member = \App\Models\Member::find($template->created_by);
                    if ($member) {
                        $firstName = $member->firstname ?? $member->first_name ?? '';
                        $lastName = $member->lastname ?? $member->last_name ?? '';
                        $fullName = trim($firstName . ' ' . $lastName);
                        $creatorName = $fullName ?: $member->membername ?? $member->username ?? $member->email ?? null;
                    }
                } elseif ($template->created_by_type === 'admin') {
                    // Check users table first
                    $user = \App\Models\User::find($template->created_by);
                    if ($user) {
                        // Check if this user is linked to a coach (has coach_id)
                        if ($user->coach_id) {
                            // This is a coach - get name from coaches table
                            $coach = \App\Models\Coach::find($user->coach_id);
                            if ($coach) {
                                $firstName = $coach->first_name ?? '';
                                $lastName = $coach->last_name ?? '';
                                $fullName = trim($firstName . ' ' . $lastName);
                                $creatorName = $fullName ?: $coach->email ?? null;
                            }
                        }
                        
                        // If coach name not found or user is not a coach, use user name (admin)
                        if (!$creatorName) {
                            $firstName = $user->firstname ?? $user->first_name ?? '';
                            $lastName = $user->lastname ?? $user->last_name ?? '';
                            $fullName = trim($firstName . ' ' . $lastName);
                            $creatorName = $fullName ?: $user->username ?? $user->email ?? null;
                        }
                    }
                } elseif ($template->created_by_type === 'coach') {
                    // Direct coach type - check coaches table
                    $coach = \App\Models\Coach::find($template->created_by);
                    if ($coach) {
                        $firstName = $coach->first_name ?? '';
                        $lastName = $coach->last_name ?? '';
                        $fullName = trim($firstName . ' ' . $lastName);
                        $creatorName = $fullName ?: $coach->email ?? null;
                    }
                }
            }
            
            // Always set a creator name, never leave it null or empty
            // Use current user's name as fallback instead of "Unknown Creator"
            if (empty($creatorName)) {
                $creatorName = $currentUserName;
            }
            // If still empty, try to get from template relationships as last resort
            if (empty($creatorName)) {
                if ($template->createdByMember) {
                    $member = $template->createdByMember;
                    $firstName = $member->firstname ?? $member->first_name ?? '';
                    $lastName = $member->lastname ?? $member->last_name ?? '';
                    $fullName = trim($firstName . ' ' . $lastName);
                    $creatorName = $fullName ?: $member->membername ?? $member->username ?? $member->email ?? null;
                }
            }
            // Final fallback - use a generic name instead of null/empty
            $template->creator_name = !empty($creatorName) ? $creatorName : ($currentUserName ?: 'Admin');
            
            return $template;
        });
        
        return response()->json([
            'success' => true,
            'data' => $memberRecords
        ]);
    }

    /**
     * Get activity logs for admin review
     */
    public function getActivityLogs(Request $request)
    {
        $gymId = $request->user('api')->gym_id;

        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }   

        $query = \App\Models\ActivityLog::with(['member'])
            ->where('gym_id', $gymId)
            ->orderBy('login_time', 'desc');

        // Apply filters if provided
        if ($request->has('member_id') && $request->member_id) {
            $query->where('member_id', $request->member_id);
        }

        if ($request->has('login_status') && $request->login_status) {
            $query->where('login_status', $request->login_status);
        }

        if ($request->has('date_from') && $request->date_from) {
            $query->whereDate('login_time', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->whereDate('login_time', '<=', $request->date_to);
        }

        $activityLogs = $query->paginate($request->get('per_page', 20));
        
        return response()->json([
            'success' => true,
            'data' => $activityLogs
        ]);
    }



    public function show($id)
    {
        $template = MealPlanTemplate::with(['details.food', 'category'])->find($id);
        
        if (!$template) {
            return response()->json([
                'success' => false,
                'message' => 'Meal plan template not found'
            ], 404);
        }

        // Reload details to ensure we have the latest data with all fields
        // Don't use select() as it can cause issues with relationships and JSON serialization
        $template->load(['details.food', 'category']);
        
        // Ensure all detail fields are included in the response by making them visible
        $template->details->each(function($detail) {
            // Force the attributes to be included in JSON serialization
            $detail->makeVisible(['normalized_serving', 'label_serving', 'notes']);
            // Ensure the attributes are set (in case they're null)
            if (!isset($detail->normalized_serving)) {
                $detail->normalized_serving = null;
            }
            if (!isset($detail->label_serving)) {
                $detail->label_serving = null;
            }
            if (!isset($detail->notes)) {
                $detail->notes = null;
            }
        });

        return response()->json([
            'success' => true,
            'data' => $template
        ]);
    }

    public function update(Request $request, $id)
    {
        // Debug: Log the incoming request data
        \Log::info('Meal plan template update request:', $request->all());
        \Log::info('Nutrition details raw: ' . $request->nutrition_details);
        
        $template = MealPlanTemplate::find($id);
        
        if (!$template) {
            return response()->json([
                'success' => false,
                'message' => 'Meal plan template not found'
            ], 404);
        }

        $gymId = $request->user('api')->gym_id ;

        $request->validate([
            
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'instructions' => 'nullable|string',
            'meals_time' => 'nullable|string',
            'category_id' => 'nullable|integer|exists:nutrition_categories,id',
            'status' => 'required|in:0,1',
            'calories' => 'required|string',
            'protein' => 'required|string',
            'carbs' => 'required|string',
            'fats' => 'required|string',
            'target_protein' => 'nullable|string',
            'target_carbs' => 'nullable|string',
            'target_fat' => 'nullable|string',
            'target_calories' => 'nullable|string',
            'nutrition_details' => 'required|string',
            'meal_image' => 'nullable', // Can be either file upload or string path
        ]);

        // Handle image - can be either file upload or string path (for default images)
        $imagePath = $template->meal_image; // Keep existing image by default
        if ($request->hasFile('meal_image')) {
            // Handle file upload - delete old image if it exists and is not a default image
            if ($template->meal_image && 
                !str_starts_with($template->meal_image, 'images/nutrition_default/') &&
                file_exists(public_path($template->meal_image))) {
                unlink(public_path($template->meal_image));
            }
            
            // Store new image
            $image = $request->file('meal_image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            
            $uploadPath = public_path('images/nutrition_images');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }
            
            $image->move($uploadPath, $imageName);
            $imagePath = 'images/nutrition_images/' . $imageName;
        } elseif ($request->has('meal_image') && !empty($request->meal_image) && is_string($request->meal_image)) {
            // Handle string path (for default images)
            // Delete old uploaded image if it exists and is not a default image
            if ($template->meal_image && 
                !str_starts_with($template->meal_image, 'images/nutrition_default/') &&
                file_exists(public_path($template->meal_image))) {
                unlink(public_path($template->meal_image));
            }
            $imagePath = $request->meal_image;
        }

        // Update Meal Plan Template - Same approach as store function
        $template->update([
            'gym_id' => $gymId,
            'name' => $request->name,
            'description' => $request->description,
            'instructions' => $request->instructions,
            'meals_time' => $request->meals_time,
            'category_id' => $request->category_id,
            'status' => (int) $request->status,
            'calories' => $request->calories,
            'protein' => $request->protein,
            'carbs' => $request->carbs,
            'fats' => $request->fats,
            'target_protein' => $request->target_protein,
            'target_carbs' => $request->target_carbs,
            'target_fat' => $request->target_fat,
            'target_calories' => $request->target_calories,
            'meal_image' => $imagePath,
        ]);

        // Handle meal plan template details - always process even if empty array
        \DB::beginTransaction();
        try {
            \Log::info('Processing nutrition_details for update', [
                'template_id' => $template->id,
                'has_nutrition_details' => $request->has('nutrition_details'),
                'nutrition_details_length' => $request->has('nutrition_details') ? strlen($request->nutrition_details) : 0
            ]);
            
            // Delete existing details (force delete to remove soft deleted records too)
            $existingDetails = MealPlanTemplateDetail::withTrashed()
                ->where('template_id', $template->id)
                ->get();
            
            // Force delete all (including soft deleted)
            $deletedCount = MealPlanTemplateDetail::withTrashed()
                ->where('template_id', $template->id)
                ->forceDelete();
                
            \Log::info('Deleted existing details', [
                'count' => $deletedCount,
                'found_records' => $existingDetails->count()
            ]);
            
            // Parse and create Meal Plan Template Details
            if ($request->has('nutrition_details') && !empty($request->nutrition_details)) {
                $nutritionDetails = json_decode($request->nutrition_details, true);
                
                if (json_last_error() !== JSON_ERROR_NONE) {
                    \Log::error('JSON decode error: ' . json_last_error_msg());
                    \Log::error('Raw nutrition_details: ' . substr($request->nutrition_details, 0, 500));
                    throw new \Exception('Invalid JSON in nutrition_details: ' . json_last_error_msg());
                }
                
                // Verify table structure exists
                if (!Schema::hasTable('meal_plan_template_details')) {
                    throw new \Exception('meal_plan_template_details table does not exist. Please run migrations.');
                }
                
                if (is_array($nutritionDetails)) {
                    \Log::info('Starting to process nutrition details', [
                        'count' => count($nutritionDetails),
                        'template_id' => $template->id,
                        'sample_detail' => count($nutritionDetails) > 0 ? $nutritionDetails[0] : null
                    ]);
                    
                    $createdCount = 0;
                    $errorCount = 0;
                    $lastError = null;
                    $lastErrorDetail = null;
                    
                    foreach ($nutritionDetails as $index => $detail) {
                        try {
                            // Validate required fields
                            if (!isset($detail['food_id']) || !isset($detail['nutrition_type'])) {
                                \Log::warning('Missing required fields in detail', [
                                    'index' => $index,
                                    'detail' => $detail
                                ]);
                                $errorCount++;
                                continue;
                            }
                            
                            // Validate food_id exists (if foods table exists)
                            // Note: We log a warning but don't fail here - let the foreign key constraint handle it
                            // This allows for cases where foods table might not exist or have different structure
                            if (Schema::hasTable('foods')) {
                                $foodExists = DB::table('foods')->where('id', $detail['food_id'])->exists();
                                if (!$foodExists) {
                                    \Log::warning('Food ID does not exist - will attempt insert anyway (foreign key will catch if invalid)', [
                                        'index' => $index,
                                        'food_id' => $detail['food_id'],
                                        'detail' => $detail
                                    ]);
                                    // Don't fail here - let the database foreign key constraint handle it
                                    // This way we get the actual database error message
                                }
                            }
                            
                            // Convert string values to numeric for decimal columns
                            $calories = isset($detail['calories']) && $detail['calories'] !== '' 
                                ? (float) $detail['calories'] : 0;
                            $protein = isset($detail['protein']) && $detail['protein'] !== '' 
                                ? (float) $detail['protein'] : 0;
                            $carbs = isset($detail['carbs']) && $detail['carbs'] !== '' 
                                ? (float) $detail['carbs'] : 0;
                            $fats = isset($detail['fats']) && $detail['fats'] !== '' 
                                ? (float) $detail['fats'] : 0;
                            $fiber = isset($detail['fiber']) && $detail['fiber'] !== '' && $detail['fiber'] !== null
                                ? (float) $detail['fiber'] : null;
                            $sodium = isset($detail['sodium']) && $detail['sodium'] !== '' && $detail['sodium'] !== null
                                ? (float) $detail['sodium'] : null;
                            $potassium = isset($detail['potassium']) && $detail['potassium'] !== '' && $detail['potassium'] !== null
                                ? (float) $detail['potassium'] : null;
                            
                            // Get food serving_description as fallback for label_serving and normalized_serving
                            $food = null;
                            $foodServingDescription = null;
                            $foodName = null;
                            if (Schema::hasTable('foods')) {
                                try {
                                    $food = Food::find($detail['food_id']);
                                    if ($food) {
                                        if (!empty(trim($food->serving_description ?? ''))) {
                                            $foodServingDescription = trim($food->serving_description);
                                        }
                                        // Get food name for food_name column
                                        $foodName = $food->name ?? null;
                                    }
                                } catch (\Exception $e) {
                                    \Log::warning('Could not fetch food for serving_description fallback (update)', [
                                        'food_id' => $detail['food_id'],
                                        'error' => $e->getMessage()
                                    ]);
                                }
                            }
                            
                            // Determine normalized_serving and label_serving with fallbacks
                            $normalizedServing = null;
                            if (isset($detail['normalized_serving']) && !empty(trim($detail['normalized_serving']))) {
                                $normalizedServing = trim($detail['normalized_serving']);
                            } elseif ($foodServingDescription) {
                                $normalizedServing = $foodServingDescription;
                            }
                            
                            $labelServing = null;
                            if (isset($detail['label_serving']) && !empty(trim($detail['label_serving']))) {
                                $labelServing = trim($detail['label_serving']);
                            } elseif ($foodServingDescription) {
                                $labelServing = $foodServingDescription;
                            }
                            
                            $dataToInsert = [
                                'template_id' => $template->id,
                                'gym_id' => $gymId, // Get from authenticated user
                                'food_id' => (int) $detail['food_id'],
                                'food_name' => $foodName, // Store food name from foods table
                                'nutrition_type' => $detail['nutrition_type'],
                                'quantity' => isset($detail['quantity']) ? (float) $detail['quantity'] : 1,
                                'normalized_serving' => $normalizedServing,
                                'label_serving' => $labelServing,
                                'calories' => $calories,
                                'protein' => $protein,
                                'carbs' => $carbs,
                                'fats' => $fats,
                                'fiber' => $fiber,
                                'sodium' => $sodium,
                                'potassium' => $potassium,
                                'notes' => isset($detail['notes']) && !empty($detail['notes']) ? $detail['notes'] : null,
                            ];
                            
                            \Log::info('Attempting to create meal plan detail', [
                                'index' => $index,
                                'data' => $dataToInsert
                            ]);
                            
                            $created = MealPlanTemplateDetail::create($dataToInsert);
                            
                            if ($created) {
                                $createdCount++;
                                \Log::info('Successfully created meal plan detail', [
                                    'index' => $index,
                                    'id' => $created->id
                                ]);
                            }
                        } catch (\Illuminate\Database\QueryException $e) {
                            $errorCount++;
                            $lastError = $e->errorInfo[2] ?? $e->getMessage();
                            $lastErrorDetail = $detail;
                            \Log::error('Database error creating meal plan template detail', [
                                'index' => $index,
                                'error' => $e->getMessage(),
                                'error_code' => $e->getCode(),
                                'sql_state' => $e->errorInfo[0] ?? null,
                                'driver_code' => $e->errorInfo[1] ?? null,
                                'error_message' => $e->errorInfo[2] ?? null,
                                'sql' => $e->getSql() ?? null,
                                'bindings' => $e->getBindings() ?? null,
                                'detail' => $detail,
                                'template_id' => $template->id
                            ]);
                            // Don't throw - continue with other details
                        } catch (\Exception $e) {
                            $errorCount++;
                            $lastError = $e->getMessage();
                            $lastErrorDetail = $detail;
                            \Log::error('Error creating meal plan template detail', [
                                'index' => $index,
                                'error' => $e->getMessage(),
                                'error_code' => $e->getCode(),
                                'file' => $e->getFile(),
                                'line' => $e->getLine(),
                                'trace' => $e->getTraceAsString(),
                                'detail' => $detail,
                                'template_id' => $template->id
                            ]);
                            // Don't throw - continue with other details
                        }
                    }
                    
                    \Log::info('Nutrition details processing complete', [
                        'created' => $createdCount,
                        'errors' => $errorCount,
                        'total' => count($nutritionDetails),
                        'template_id' => $template->id
                    ]);
                    
                    if ($errorCount > 0 && $createdCount === 0) {
                        $errorMessage = "Failed to create any meal plan details. ";
                        $errorMessage .= "Errors: {$errorCount}, Total: " . count($nutritionDetails) . ". ";
                        if ($lastError) {
                            $errorMessage .= "Last error: " . $lastError . ". ";
                            if ($lastErrorDetail) {
                                $errorMessage .= "Failed detail (food_id: " . ($lastErrorDetail['food_id'] ?? 'N/A') . ", nutrition_type: " . ($lastErrorDetail['nutrition_type'] ?? 'N/A') . "). ";
                            }
                        }
                        $errorMessage .= "Check Laravel logs (storage/logs/laravel.log) for detailed error information.";
                        throw new \Exception($errorMessage);
                    }
                    
                    if ($errorCount > 0 && $createdCount > 0) {
                        \Log::warning("Some meal plan details failed to create", [
                            'created' => $createdCount,
                            'errors' => $errorCount,
                            'total' => count($nutritionDetails)
                        ]);
                    }
                } else {
                    \Log::warning('nutrition_details is not an array', [
                        'type' => gettype($nutritionDetails)
                    ]);
                }
            } else {
                \Log::info('nutrition_details not provided or empty - clearing all details for template');
            }
            
            \DB::commit();
        } catch (\Exception $e) {
            \DB::rollBack();
            $errorMessage = $e->getMessage();
            
            // If it's a database exception, include more details
            if ($e instanceof \Illuminate\Database\QueryException) {
                $errorMessage .= ' | SQL Error: ' . ($e->errorInfo[2] ?? $e->getMessage());
                $errorMessage .= ' | SQL State: ' . ($e->errorInfo[0] ?? 'N/A');
            }
            
            \Log::error('Error updating meal plan template details: ' . $errorMessage, [
                'exception' => get_class($e),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update meal plan details: ' . $errorMessage
            ], 500);
        }

        // Verify details were saved
        $savedDetailsCount = MealPlanTemplateDetail::where('template_id', $template->id)->count();
        \Log::info('Meal plan template updated', [
            'template_id' => $template->id,
            'saved_details_count' => $savedDetailsCount
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Meal plan template updated successfully',
            'id' => $template->id,
            'details_count' => $savedDetailsCount
        ]);
    }



    public function destroy($id)
    {
        $template = MealPlanTemplate::find($id);
        
        if (!$template) {
            return response()->json([
                'success' => false,
                'message' => 'Meal plan template not found'
            ], 404);
        }

        $template->delete();

        return response()->json([
            'success' => true,
            'message' => 'Meal plan template deleted successfully'
        ]);
    }

    /**
     * Update product serving (normalized_serving or label_serving) or notes in a meal plan template
     */
    public function updateProductServing(Request $request, $templateId)
    {
        try {
            $request->validate([
                'food_id' => 'required|integer|exists:foods,id',
                'nutrition_type' => 'required|string|in:breakfast,snacks1,lunch,snacks2,dinner,snacks3',
                'normalized_serving' => 'nullable|string|max:255',
                'label_serving' => 'nullable|string|max:255',
                'notes' => 'nullable|string',
            ]);

            $template = MealPlanTemplate::find($templateId);
            
            if (!$template) {
                return response()->json([
                    'success' => false,
                    'message' => 'Meal plan template not found'
                ], 404);
            }

            // Find ALL meal plan template detail records matching food_id and nutrition_type
            // There might be multiple records if the same food was added multiple times
            // Use withTrashed() in case it's soft deleted, but we want to update it
            $details = MealPlanTemplateDetail::withTrashed()
                ->where('template_id', $templateId)
                ->where('food_id', $request->food_id)
                ->where('nutrition_type', $request->nutrition_type)
                ->get();

            // If product doesn't exist, create it automatically (similar to MemberController behavior)
            if ($details->isEmpty()) {
                $food = Food::find($request->food_id);
                if (!$food) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Food not found'
                    ], 404);
                }

                // Get gym_id from template
                $gymId = $template->gym_id;

                // Create the meal plan template detail
                $detail = MealPlanTemplateDetail::create([
                    'template_id' => $templateId,
                    'gym_id' => $gymId,
                    'food_id' => $food->id,
                    'nutrition_type' => $request->nutrition_type,
                    'quantity' => 1,
                    'calories' => $food->calories ?? 0,
                    'protein' => $food->protein ?? 0,
                    'carbs' => $food->carbohydrate ?? 0,
                    'fats' => $food->fat ?? 0,
                    'normalized_serving' => null,
                    'label_serving' => null,
                    'notes' => null,
                ]);

                \Log::info('Auto-created product in meal plan template', [
                    'template_id' => $templateId,
                    'food_id' => $request->food_id,
                    'nutrition_type' => $request->nutrition_type,
                    'detail_id' => $detail->id
                ]);

                // Set details to the newly created detail
                $details = collect([$detail]);
            }

            // Update the serving fields and notes
            $updateData = [];
            
            // Always update if the field is present in the request (even if empty string)
            // Check if the field exists in the request (even if empty or null)
            // Use array_key_exists to check for empty strings too
            if ($request->has('normalized_serving') || array_key_exists('normalized_serving', $request->all())) {
                $rawValue = $request->input('normalized_serving');
                // Handle null, empty string, or actual value
                if ($rawValue === null || $rawValue === '') {
                    $updateData['normalized_serving'] = null;
                } else {
                    $trimmedValue = trim((string) $rawValue);
                    $updateData['normalized_serving'] = $trimmedValue !== '' ? $trimmedValue : null;
                }
                \Log::info('Updating normalized_serving', [
                    'raw' => $rawValue,
                    'type' => gettype($rawValue),
                    'final' => $updateData['normalized_serving'],
                    'details_count' => $details->count(),
                    'request_all' => $request->all()
                ]);
            }
            if ($request->has('label_serving') || array_key_exists('label_serving', $request->all())) {
                $rawValue = $request->input('label_serving');
                $trimmedValue = null;
                if ($rawValue === null || $rawValue === '') {
                    $updateData['label_serving'] = null;
                } else {
                    $trimmedValue = trim((string) $rawValue);
                    $updateData['label_serving'] = $trimmedValue !== '' ? $trimmedValue : null;
                }
                \Log::info('Updating label_serving', [
                    'raw' => $rawValue,
                    'type' => gettype($rawValue),
                    'trimmed' => $trimmedValue,
                    'final' => $updateData['label_serving'],
                    'details_count' => $details->count()
                ]);
            }
            if ($request->has('notes') || array_key_exists('notes', $request->all())) {
                $rawValue = $request->input('notes');
                $trimmedValue = null;
                if ($rawValue === null || $rawValue === '') {
                    $updateData['notes'] = null;
                } else {
                    $trimmedValue = trim((string) $rawValue);
                    $updateData['notes'] = $trimmedValue !== '' ? $trimmedValue : null;
                }
                \Log::info('Updating notes', [
                    'raw' => $rawValue,
                    'type' => gettype($rawValue),
                    'trimmed' => $trimmedValue,
                    'final' => $updateData['notes'],
                    'details_count' => $details->count()
                ]);
            }

            if (!empty($updateData)) {
                // Log before update
                \Log::info('Before update - current values', [
                    'details_count' => $details->count(),
                    'detail_ids' => $details->pluck('id')->toArray(),
                    'current_values_sample' => $details->first() ? [
                        'normalized_serving' => $details->first()->normalized_serving,
                        'label_serving' => $details->first()->label_serving,
                        'notes' => $details->first()->notes,
                    ] : null,
                    'update_data' => $updateData
                ]);
                
                // Use DB transaction to ensure the update is saved
                DB::beginTransaction();
                try {
                    // Update ALL matching detail records
                    $detailIds = $details->pluck('id')->toArray();
                    $updated = DB::table('meal_plan_template_details')
                        ->whereIn('id', $detailIds)
                        ->update($updateData);
                    
                    if ($updated === 0) {
                        throw new \Exception('No rows were updated');
                    }
                    
                    // Verify the update by querying the database directly
                    $verifyDetails = DB::table('meal_plan_template_details')
                        ->whereIn('id', $detailIds)
                        ->get();
                    
                    \Log::info('After update - verified values from DB', [
                        'detail_ids' => $detailIds,
                        'rows_updated' => $updated,
                        'verified_count' => $verifyDetails->count(),
                        'sample_values' => $verifyDetails->first() ? [
                            'normalized_serving' => $verifyDetails->first()->normalized_serving ?? 'NOT FOUND',
                            'label_serving' => $verifyDetails->first()->label_serving ?? 'NOT FOUND',
                            'notes' => $verifyDetails->first()->notes ?? 'NOT FOUND',
                            'updated_at' => $verifyDetails->first()->updated_at ?? 'NOT FOUND'
                        ] : null
                    ]);
                    
                    // Refresh all model instances
                    $details->each(function($detail) {
                        $detail->refresh();
                    });
                    
                    DB::commit();
                    
                    \Log::info('Successfully updated product serving', [
                        'template_id' => $templateId,
                        'food_id' => $request->food_id,
                        'nutrition_type' => $request->nutrition_type,
                        'detail_ids' => $detailIds,
                        'rows_updated' => $updated,
                        'update_data' => $updateData,
                        'updated_values_sample' => $details->first() ? [
                            'normalized_serving' => $details->first()->normalized_serving,
                            'label_serving' => $details->first()->label_serving,
                            'notes' => $details->first()->notes
                        ] : null
                    ]);
                } catch (\Exception $e) {
                    DB::rollBack();
                    \Log::error('Failed to update product serving', [
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString(),
                        'template_id' => $templateId,
                        'food_id' => $request->food_id,
                        'nutrition_type' => $request->nutrition_type,
                        'update_data' => $updateData
                    ]);
                    throw $e;
                }
            } else {
                \Log::warning('No update data provided', [
                    'request_data' => $request->all(),
                    'request_has_normalized' => $request->has('normalized_serving'),
                    'request_has_label' => $request->has('label_serving'),
                    'request_has_notes' => $request->has('notes'),
                    'request_keys' => array_keys($request->all())
                ]);
            }

            // Always get fresh data from database to return current values
            // Query directly from database using DB facade to ensure we get the latest values
            // Get the first detail (they should all have the same values after update)
            $freshDetail = DB::table('meal_plan_template_details')
                ->where('template_id', $templateId)
                ->where('food_id', $request->food_id)
                ->where('nutrition_type', $request->nutrition_type)
                ->first();
            
            if (!$freshDetail) {
                \Log::error('Detail not found after update', [
                    'template_id' => $templateId,
                    'food_id' => $request->food_id,
                    'nutrition_type' => $request->nutrition_type
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'Detail not found after update'
                ], 404);
            }
            
            // Return the actual values from database - ensure all values are properly formatted
            $responseData = [
                'id' => (int) $freshDetail->id,
                'food_id' => (int) $freshDetail->food_id,
                'nutrition_type' => (string) $freshDetail->nutrition_type,
                'normalized_serving' => $freshDetail->normalized_serving !== null && $freshDetail->normalized_serving !== '' 
                    ? (string) $freshDetail->normalized_serving 
                    : null,
                'label_serving' => $freshDetail->label_serving !== null && $freshDetail->label_serving !== '' 
                    ? (string) $freshDetail->label_serving 
                    : null,
                'notes' => $freshDetail->notes !== null && $freshDetail->notes !== '' 
                    ? (string) $freshDetail->notes 
                    : null,
                'updated_at' => $freshDetail->updated_at ? $freshDetail->updated_at : null
            ];
            
            \Log::info('Returning response data', [
                'response_data' => $responseData,
                'fresh_detail_raw' => [
                    'normalized_serving' => $freshDetail->normalized_serving,
                    'label_serving' => $freshDetail->label_serving,
                    'notes' => $freshDetail->notes,
                    'normalized_type' => gettype($freshDetail->normalized_serving),
                    'label_type' => gettype($freshDetail->label_serving),
                    'notes_type' => gettype($freshDetail->notes)
                ]
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Product information updated successfully',
                'data' => $responseData
            ], 200, [], JSON_UNESCAPED_UNICODE);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error updating product serving: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update product information: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Assign a nutrition plan template to a member
     * Saves assignment to assigned_meals_members table
     */
    public function assign(Request $request)
    {
        $request->validate([
            'template_id' => 'required|exists:meal_plans_template,id',
            'member_id' => 'required|exists:members,id',
            'start_date' => 'nullable|date',
            'duration' => 'nullable|string',
            'description' => 'nullable|string',
            'assign_to_all_members' => 'nullable|boolean',
        ]);

        try {
            // Get the template and member
            $template = MealPlanTemplate::findOrFail($request->template_id);
            $member = \App\Models\Member::findOrFail($request->member_id);
            
            // Get authenticated user for assigned_by
            $assignedBy = $request->user('api') ? $request->user('api')->id : null;
            
            // Set default gym_id from member or template
            $gymId = $member->gym_id ?? $template->gym_id ?? 1;
            
            // Calculate end_date based on duration if provided
            $endDate = null;
            $startDate = $request->start_date ? \Carbon\Carbon::parse($request->start_date) : now();
            
            if ($request->duration && $request->start_date) {
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

            // Check for duplicate active assignments for this member and template
            $existingAssignment = \App\Models\AssignedMealsMember::where('member_id', $request->member_id)
                ->where('template_id', $request->template_id)
                ->where(function($query) use ($startDate, $endDate) {
                    $query->where(function($q) use ($startDate, $endDate) {
                        // Check if dates overlap
                        if ($endDate) {
                            $q->where(function($subQ) use ($startDate, $endDate) {
                                $subQ->whereNull('end_date')
                                     ->orWhere('end_date', '>=', $startDate->toDateString());
                            })
                            ->where(function($subQ) use ($startDate, $endDate) {
                                $subQ->whereNull('start_date')
                                     ->orWhere('start_date', '<=', $endDate->toDateString());
                            });
                        } else {
                            // Ongoing plan - check if any active assignment exists
                            $q->whereNull('end_date')
                              ->orWhere('end_date', '>=', $startDate->toDateString());
                        }
                    });
                })
                ->first();
            
            if ($existingAssignment) {
                return response()->json([
                    'success' => false,
                    'message' => 'This member already has an active meal plan assignment for "' . $template->name . '". Please choose a different plan or update the existing one.'
                ], 422);
            }

            // Handle "assign to all members" if requested
            if ($request->assign_to_all_members) {
                // Get all members for the gym
                $members = \App\Models\Member::where('gym_id', $gymId)->get();
                $assignments = [];
                $notificationStats = [
                    'total' => 0,
                    'success' => 0,
                    'failed' => 0,
                    'errors' => []
                ];
                
                // Get performedByUserId if current user is an admin
                $user = $request->user('api');
                $performedByUserId = null;
                if ($user && isset($user->role_id) && $user->role_id == 1) {
                    $performedByUserId = $user->id;
                }
                
                foreach ($members as $memberToAssign) {
                    $assignment = \App\Models\AssignedMealsMember::create([
                        'member_id' => $memberToAssign->id,
                        'gym_id' => $gymId,
                        'coach_id' => $memberToAssign->coach_id ?? null, // Store coach_id from member
                        'template_id' => $request->template_id,
                        'assigned_by' => $assignedBy,
                        'date' => $startDate->toDateString(),
                        'start_date' => $startDate->toDateString(),
                        'end_date' => $endDate ? $endDate->toDateString() : null,
                        'duration' => $request->duration,
                        'description' => $request->description,
                        'plan' => $template->name,
                    ]);
                    $assignment->load(['member', 'template']);
                    $assignments[] = $assignment;
                    
                    // Create notifications for nutrition assignment
                    try {
                        if ($assignment->member) {
                            $notificationResults = \App\Services\NotificationService::nutritionAssigned($assignment, $assignment->member, $gymId, $performedByUserId);
                            $notificationStats['total']++;
                            
                            $memberNotification = $notificationResults['member'] ?? null;
                            if ($memberNotification && $memberNotification['success']) {
                                $notificationStats['success']++;
                            } else {
                                $notificationStats['failed']++;
                                $notificationStats['errors'][] = [
                                    'member_id' => $assignment->member->id,
                                    'member_name' => trim(($assignment->member->firstname ?? '') . ' ' . ($assignment->member->lastname ?? '')),
                                    'error' => $memberNotification['error'] ?? 'Notification failed'
                                ];
                            }
                        }
                    } catch (\Exception $e) {
                        $notificationStats['total']++;
                        $notificationStats['failed']++;
                        $notificationStats['errors'][] = [
                            'member_id' => $assignment->member->id ?? null,
                            'error' => $e->getMessage()
                        ];
                        \Log::error('Failed to create nutrition assignment notifications: ' . $e->getMessage(), [
                            'assignment_id' => $assignment->id,
                            'trace' => $e->getTraceAsString()
                        ]);
                    }
                }
                
                return response()->json([
                    'success' => true,
                    'message' => 'Meal plan assigned to ' . count($assignments) . ' members successfully!',
                    'data' => [
                        'assignments' => $assignments,
                        'notification_stats' => $notificationStats,
                        'notification_status' => $notificationStats['failed'] === 0,
                        'notification_error' => $notificationStats['failed'] > 0 
                            ? "Failed to send notifications to {$notificationStats['failed']} member(s)." 
                            : null,
                    ]
                ]);
            } else {
                // Assign to single member
                $assignment = \App\Models\AssignedMealsMember::create([
                    'member_id' => $request->member_id,
                    'gym_id' => $gymId,
                    'coach_id' => $member->coach_id ?? null, // Store coach_id from member
                    'template_id' => $request->template_id,
                    'assigned_by' => $assignedBy,
                    'date' => $startDate->toDateString(),
                    'start_date' => $startDate->toDateString(),
                    'end_date' => $endDate ? $endDate->toDateString() : null,
                    'duration' => $request->duration,
                    'description' => $request->description,
                    'plan' => $template->name,
                ]);

                // Load relationships for response
                $assignment->load(['member', 'template']);

                // Create notifications for nutrition assignment
                $notificationStatus = true;
                $notificationError = null;
                $memberNotification = null;
                try {
                    // Get performedByUserId if current user is an admin
                    $user = $request->user('api');
                    $performedByUserId = null;
                    if ($user && isset($user->role_id) && $user->role_id == 1) {
                        $performedByUserId = $user->id;
                    }
                    
                    if ($assignment->member) {
                        $notificationResults = \App\Services\NotificationService::nutritionAssigned($assignment, $assignment->member, $gymId, $performedByUserId);
                        $memberNotification = $notificationResults['member'] ?? null;
                        
                        if ($memberNotification && !$memberNotification['success']) {
                            $notificationStatus = false;
                            $notificationError = 'member: ' . ($memberNotification['error'] ?? 'Notification failed');
                        }
                    } else {
                        $notificationStatus = false;
                        $notificationError = 'Notification not sent: member not found.';
                    }
                } catch (\Exception $e) {
                    \Log::error('Failed to create nutrition assignment notifications: ' . $e->getMessage(), [
                        'assignment_id' => $assignment->id,
                        'trace' => $e->getTraceAsString()
                    ]);
                    $notificationStatus = false;
                    $notificationError = 'Notification failed: ' . $e->getMessage();
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Meal plan assigned successfully!',
                    'data' => [
                        'assignment' => $assignment,
                        'member_notification' => $memberNotification,
                        'notification_status' => $notificationStatus,
                        'notification_error' => $notificationError,
                    ]
                ]);
            }
        } catch (\Exception $e) {
            \Log::error('Error assigning meal plan: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error assigning meal plan: ' . $e->getMessage()
            ], 500);
        }
    }
}
