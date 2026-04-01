<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class SubscriptionPlansController extends Controller
{
    /**
     * Display a listing of subscription plans for gym_id = 1
     */
    public function index()
    {
        try {
            $plans = SubscriptionPlan::byGym(1)
                ->active()
                ->orderBy('created_at', 'desc')
                ->get();
            
            return response()->json([
                'success' => true,
                'data' => $plans
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching subscription plans',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created subscription plan for gym_id = 1
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'monthly_price' => 'required|numeric|min:0',
            'is_popular' => 'boolean',
            'included_features' => 'required|array',
            'included_features.*' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            // If this plan is marked as popular, unmark other popular plans for this gym
            if ($request->is_popular) {
                SubscriptionPlan::byGym(1)
                    ->where('is_popular', true)
                    ->update(['is_popular' => false]);
            }

            $plan = SubscriptionPlan::create([
                'name' => $request->name,
                'monthly_price' => $request->monthly_price,
                'is_popular' => $request->is_popular ?? false,
                'included_features' => $request->included_features,
                'is_active' => true,
                'gym_id' => 1
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Subscription plan created successfully',
                'data' => $plan
            ], 201);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Error creating subscription plan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified subscription plan
     */
    public function show($id)
    {
        try {
            $plan = SubscriptionPlan::byGym(1)->find($id);
            
            if (!$plan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Subscription plan not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $plan
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching subscription plan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified subscription plan
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'monthly_price' => 'sometimes|required|numeric|min:0',
            'is_popular' => 'sometimes|boolean',
            'included_features' => 'sometimes|required|array',
            'included_features.*' => 'string',
            'is_active' => 'sometimes|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            $plan = SubscriptionPlan::byGym(1)->find($id);
            
            if (!$plan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Subscription plan not found'
                ], 404);
            }

            // If this plan is marked as popular, unmark other popular plans for this gym
            if ($request->has('is_popular') && $request->is_popular) {
                SubscriptionPlan::byGym(1)
                    ->where('id', '!=', $id)
                    ->where('is_popular', true)
                    ->update(['is_popular' => false]);
            }

            $plan->update($request->only([
                'name', 'monthly_price', 'is_popular', 
                'included_features', 'is_active'
            ]));

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Subscription plan updated successfully',
                'data' => $plan
            ]);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Error updating subscription plan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified subscription plan
     */
    public function destroy($id)
    {
        try {
            $plan = SubscriptionPlan::byGym(1)->find($id);
            
            if (!$plan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Subscription plan not found'
                ], 404);
            }

            $plan->delete();

            return response()->json([
                'success' => true,
                'message' => 'Subscription plan deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting subscription plan',
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
} 