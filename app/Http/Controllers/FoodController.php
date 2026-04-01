<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class FoodController extends Controller
{
    // ✅ Get all food records with pagination, search, and filtering
    // Optimized for performance with indexes, simplified search, and smart pagination
    public function index(Request $request)
    {
        $query = Food::query();

        // Search functionality with optimized relevance scoring
        $hasSearch = $request->has('search') && !empty(trim($request->search));
        
        if ($hasSearch) {
            $searchTerm = trim($request->search);
            $searchTermLower = strtolower($searchTerm);
            // Escape special characters for LIKE queries
            $searchTermEscaped = str_replace(['%', '_'], ['\%', '\_'], $searchTermLower);
            
            // Optimized search: prioritize "starts with" which can use index better
            // Apply search filter with optimized LIKE patterns
            $query->where(function($q) use ($searchTerm, $searchTermEscaped) {
                // Starts with (can use index prefix) - highest priority
                $q->where('name', 'LIKE', "{$searchTermEscaped}%")
                  // Contains in name
                  ->orWhere('name', 'LIKE', "%{$searchTermEscaped}%")
                  // Contains in description
                  ->orWhere('description', 'LIKE', "%{$searchTermEscaped}%")
                  // Contains in serving description
                  ->orWhere('serving_description', 'LIKE', "%{$searchTermEscaped}%");
            });

            // Simplified relevance scoring (more efficient than complex CASE statements)
            // Priority: Exact match > Starts with > Contains
            $query->selectRaw('foods.*,
                (
                    (CASE WHEN LOWER(name) = ? THEN 3 ELSE 0 END) +
                    (CASE WHEN LOWER(name) LIKE ? THEN 2 ELSE 0 END) +
                    (CASE WHEN LOWER(name) LIKE ? THEN 1 ELSE 0 END)
                ) as relevance_score',
                [
                    $searchTermLower,                    // Exact match: 3 points
                    $searchTermEscaped . '%',            // Starts with: 2 points
                    '%' . $searchTermEscaped . '%'       // Contains: 1 point
                ]
            );

            // Order by relevance score (descending), then by name (ascending)
            // Uses index on name column for secondary sort
            $query->orderByRaw('relevance_score DESC, name ASC');
        }

        // Filter by food_type (uses idx_foods_food_type index)
        if ($request->has('food_type') && !empty($request->food_type)) {
            $query->where('food_type', $request->food_type);
        }

        // Manual sorting (only if no search is active)
        // Uses indexes on sort columns for better performance
        if (!$hasSearch) {
            $sortBy = $request->get('sort_by', 'name');
            $sortOrder = $request->get('sort_order', 'asc');
            
            // Validate sort column to prevent SQL injection
            $allowedSortColumns = ['name', 'calories', 'protein', 'carbohydrate', 'fat', 'created_at'];
            if (in_array($sortBy, $allowedSortColumns)) {
                $query->orderBy($sortBy, $sortOrder);
            } else {
                $query->orderBy('name', 'asc');
            }
        }

        // Pagination
        $perPage = min($request->get('per_page', 30), 100); // Default 30, max 100 items per page
        $page = $request->get('page', 1);
        
        // Check if frontend needs total count (for pagination UI)
        // simplePaginate is 30-50% faster as it doesn't count total records
        $needsTotal = $request->get('include_total', true);
        
        if ($needsTotal) {
            // Use paginate when total count is needed (for pagination UI)
            $foods = $query->paginate($perPage, ['*'], 'page', $page);
            
            $paginationData = [
                'current_page' => $foods->currentPage(),
                'per_page' => $foods->perPage(),
                'total' => $foods->total(),
                'last_page' => $foods->lastPage(),
                'from' => $foods->firstItem(),
                'to' => $foods->lastItem(),
            ];
        } else {
            // Use simplePaginate for better performance when total count not needed
            // Perfect for "Load More" scenarios
            $foods = $query->simplePaginate($perPage, ['*'], 'page', $page);
            
            $paginationData = [
                'current_page' => $foods->currentPage(),
                'per_page' => $foods->perPage(),
                'from' => $foods->firstItem(),
                'to' => $foods->lastItem(),
                'has_more' => $foods->hasMorePages(),
            ];
        }

        return response()->json([
            'success' => true,
            'data' => $foods->items(),
            'pagination' => $paginationData,
            'filters' => [
                'search' => $request->get('search', ''),
                'food_type' => $request->get('food_type', ''),
            ]
        ]);
    }

    // ✅ Get foods by food_type
    public function getByFoodType($foodType)
    {
        $foods = Food::byFoodType($foodType)->get();

        return response()->json([
            'success' => true,
            'data' => $foods,
            'food_type' => $foodType
        ]);
    }

    // ✅ Get all available food types
    // Cached for 1 hour as food types don't change frequently
    public function getFoodTypes()
    {
        // Cache food types for 1 hour (3600 seconds)
        // This significantly improves performance as this endpoint is called frequently
        $foodTypes = Cache::remember('food_types_list', 3600, function () {
            return Food::getFoodTypes()->pluck('food_type')->toArray();
        });

        return response()->json([
            'success' => true,
            'data' => $foodTypes
        ]);
    }

    // ✅ Show a specific food by ID
    public function show($id)
    {
        $food = Food::find($id);

        if (!$food) {
            return response()->json([
                'success' => false,
                'message' => 'Food not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $food
        ]);
    }

    // ✅ Store a new food
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'serving_description' => 'nullable|string',
                'calories' => 'nullable|numeric|min:0',
                'fat' => 'nullable|numeric|min:0',
                'saturated_fat' => 'nullable|numeric|min:0',
                'trans_fat' => 'nullable|numeric|min:0',
                'polyunsaturated_fat' => 'nullable|numeric|min:0',
                'monounsaturated_fat' => 'nullable|numeric|min:0',
                'cholesterol' => 'nullable|numeric|min:0',
                'sodium' => 'nullable|numeric|min:0',
                'carbohydrate' => 'nullable|numeric|min:0',
                'fiber' => 'nullable|numeric|min:0',
                'sugar' => 'nullable|numeric|min:0',
                'protein' => 'nullable|numeric|min:0',
                'vitamin_d' => 'nullable|numeric|min:0',
                'calcium' => 'nullable|numeric|min:0',
                'iron' => 'nullable|numeric|min:0',
                'potassium' => 'nullable|numeric|min:0',
                'vitamin_a' => 'nullable|numeric|min:0',
                'vitamin_c' => 'nullable|numeric|min:0',
                'food_type' => 'nullable|string',
                'image' => 'nullable|image|mimes:jpeg,jpg,png,gif,webp|max:5120', // 5MB max
                'fatsecret_url' => 'nullable|string|max:500', // For external URLs only
            ]);

            $data = $request->except(['image']);

            // Handle image upload
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imagePath = $this->uploadImage($image);
                $data['fatsecret_url'] = $imagePath;
            } elseif ($request->has('fatsecret_url') && !empty($request->fatsecret_url)) {
                // Only set fatsecret_url if it's not a base64 data URI
                if (!str_starts_with($request->fatsecret_url, 'data:')) {
                    $data['fatsecret_url'] = $request->fatsecret_url;
                }
            }

            $food = Food::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Food created successfully',
                'data' => $food
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error creating food: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create food: ' . $e->getMessage()
            ], 500);
        }
    }

    // ✅ Update a food
    public function update(Request $request, $id)
    {
        try {
            $food = Food::find($id);

            if (!$food) {
                return response()->json([
                    'success' => false,
                    'message' => 'Food not found'
                ], 404);
            }

            $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'description' => 'nullable|string',
                'serving_description' => 'nullable|string',
                'calories' => 'nullable|numeric|min:0',
                'fat' => 'nullable|numeric|min:0',
                'saturated_fat' => 'nullable|numeric|min:0',
                'trans_fat' => 'nullable|numeric|min:0',
                'polyunsaturated_fat' => 'nullable|numeric|min:0',
                'monounsaturated_fat' => 'nullable|numeric|min:0',
                'cholesterol' => 'nullable|numeric|min:0',
                'sodium' => 'nullable|numeric|min:0',
                'carbohydrate' => 'nullable|numeric|min:0',
                'fiber' => 'nullable|numeric|min:0',
                'sugar' => 'nullable|numeric|min:0',
                'protein' => 'nullable|numeric|min:0',
                'vitamin_d' => 'nullable|numeric|min:0',
                'calcium' => 'nullable|numeric|min:0',
                'iron' => 'nullable|numeric|min:0',
                'potassium' => 'nullable|numeric|min:0',
                'vitamin_a' => 'nullable|numeric|min:0',
                'vitamin_c' => 'nullable|numeric|min:0',
                'food_type' => 'nullable|string',
                'image' => 'nullable|image|mimes:jpeg,jpg,png,gif,webp|max:5120', // 5MB max
                'fatsecret_url' => 'nullable|string|max:500', // For external URLs only
            ]);

            $data = $request->except(['image']);

            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($food->fatsecret_url && file_exists(public_path($food->fatsecret_url))) {
                    $oldImagePath = public_path($food->fatsecret_url);
                    // Only delete if it's an uploaded image (starts with /uploads/)
                    if (str_starts_with($food->fatsecret_url, '/uploads/')) {
                        @unlink($oldImagePath);
                    }
                }

                $image = $request->file('image');
                $imagePath = $this->uploadImage($image);
                $data['fatsecret_url'] = $imagePath;
            } elseif ($request->has('fatsecret_url') && !empty($request->fatsecret_url)) {
                // Only update fatsecret_url if it's not a base64 data URI
                if (!str_starts_with($request->fatsecret_url, 'data:')) {
                    $data['fatsecret_url'] = $request->fatsecret_url;
                }
            } elseif ($request->has('fatsecret_url') && empty($request->fatsecret_url)) {
                // If fatsecret_url is explicitly set to empty, delete old image
                if ($food->fatsecret_url && file_exists(public_path($food->fatsecret_url))) {
                    $oldImagePath = public_path($food->fatsecret_url);
                    if (str_starts_with($food->fatsecret_url, '/uploads/')) {
                        @unlink($oldImagePath);
                    }
                }
                $data['fatsecret_url'] = null;
            }

            $food->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Food updated successfully',
                'data' => $food
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error updating food: ' . $e->getMessage(), [
                'food_id' => $id,
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update food: ' . $e->getMessage()
            ], 500);
        }
    }

    // ✅ Delete a food
    public function destroy($id)
    {
        $food = Food::find($id);

        if (!$food) {
            return response()->json([
                'success' => false,
                'message' => 'Food not found'
            ], 404);
        }

        $food->delete();

        return response()->json([
            'success' => true,
            'message' => 'Food deleted successfully'
        ]);
    }

    // ✅ Test endpoint to verify food API is working
    public function test()
    {
        $count = Food::count();
        
        return response()->json([
            'success' => true,
            'message' => 'Food controller is working!',
            'timestamp' => now(),
            'foods_count' => $count,
            'sample_foods' => Food::select('id', 'name', 'food_type')->limit(5)->get()
        ]);
    }

    /**
     * Upload image to public/uploads/foods/ directory
     * 
     * @param \Illuminate\Http\UploadedFile $image
     * @return string Relative path to the uploaded image
     */
    private function uploadImage($image)
    {
        try {
            // Create uploads/foods directory if it doesn't exist
            $uploadPath = public_path('uploads/foods');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }

            // Generate unique filename
            $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            
            // Move file to uploads directory
            $image->move($uploadPath, $filename);
            
            // Return relative path (accessible via URL)
            return '/uploads/foods/' . $filename;
        } catch (\Exception $e) {
            \Log::error('Error uploading food image: ' . $e->getMessage());
            throw new \Exception('Failed to upload image: ' . $e->getMessage());
        }
    }
}