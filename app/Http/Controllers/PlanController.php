<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\MembershipGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PlanController extends Controller
{
    /**
     * Display a listing of all plans
     */
    public function index(Request $request)
    {
        try {
            // Get filter parameter
            $statusFilter = $request->input('status', 'all'); // 'all', 'active', 'inactive'
            
            $query = Plan::query();
            
            if ($statusFilter === 'active') {
                $query->where('is_active', true);
            } elseif ($statusFilter === 'inactive') {
                $query->where('is_active', false);
            }
            
            $plans = $query->orderBy('sort_order')
                ->orderBy('created_at', 'desc')
                ->get();
            
            return response()->json([
                'success' => true,
                'data' => $plans
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching plans',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created plan
     */
    public function store(Request $request)
    {
        // Convert empty string to null for stripe_price_id before validation
        $requestData = $request->all();
        if (isset($requestData['stripe_price_id']) && $requestData['stripe_price_id'] === '') {
            $requestData['stripe_price_id'] = null;
        }

        $validator = Validator::make($requestData, [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'interval' => 'required|string|in:monthly,yearly,weekly,daily',
            'stripe_price_id' => 'nullable|string|max:255|unique:member_plans,stripe_price_id',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
            'membership_data' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $plan = Plan::create([
                'name' => $requestData['name'],
                'price' => $requestData['price'],
                'interval' => $requestData['interval'],
                'stripe_price_id' => $requestData['stripe_price_id'] ?? null,
                'features' => $requestData['features'] ?? [],
                'is_active' => $requestData['is_active'] ?? true,
                'sort_order' => $requestData['sort_order'] ?? 0,
                'membership_data' => $requestData['membership_data'] ?? null,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Plan created successfully',
                'data' => $plan
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating plan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified plan
     */
    public function show($id)
    {
        try {
            $plan = Plan::find($id);
            
            if (!$plan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Plan not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $plan
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching plan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified plan
     */
    public function update(Request $request, $id)
    {
        // Convert empty string to null for stripe_price_id before validation
        $requestData = $request->all();
        if (isset($requestData['stripe_price_id']) && $requestData['stripe_price_id'] === '') {
            $requestData['stripe_price_id'] = null;
        }

        $validator = Validator::make($requestData, [
            'name' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'interval' => 'sometimes|required|string|in:monthly,yearly,weekly,daily',
            'stripe_price_id' => 'nullable|string|max:255|unique:member_plans,stripe_price_id,' . $id,
            'features' => 'nullable|array',
            'features.*' => 'string',
            'is_active' => 'sometimes|boolean',
            'sort_order' => 'nullable|integer|min:0',
            'membership_data' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $plan = Plan::find($id);
            
            if (!$plan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Plan not found'
                ], 404);
            }

            $plan->update($requestData);

            return response()->json([
                'success' => true,
                'message' => 'Plan updated successfully',
                'data' => $plan
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating plan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified plan
     */
    public function destroy($id)
    {
        try {
            $plan = Plan::find($id);
            
            if (!$plan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Plan not found'
                ], 404);
            }

            $plan->delete();

            return response()->json([
                'success' => true,
                'message' => 'Plan deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting plan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get available features list
     */
    public function getFeatures()
    {
        $features = [
            "Gym Access",
            "Locker Room",
            "Group Classes",
            "Personal Trainer",
            "24/7 Access",
            "Sauna Access",
            "Nutrition Plan",
            "Guest Pass"
        ];

        return response()->json([
            'success' => true,
            'data' => $features
        ]);
    }

    /**
     * Get membership groups list
     */
    public function getMembershipGroups(Request $request)
    {
        try {
            // Get gym_id from authenticated user, default to 1
            $gymId = $request->user('api')->gym_id ?? 1;
            
            $groups = MembershipGroup::active()
                ->forGym($gymId)
                ->ordered()
                ->get(['id', 'name', 'description']);

            return response()->json([
                'success' => true,
                'data' => $groups
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching membership groups',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

