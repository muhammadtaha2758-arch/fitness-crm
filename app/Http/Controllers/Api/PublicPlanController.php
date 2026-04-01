<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\Request;

class PublicPlanController extends Controller
{
    /**
     * Get all active plans for public display
     */
    public function index()
    {
        $plans = Plan::active()
            ->ordered()
            ->get()
            ->map(function ($plan) {
                return [
                    'id' => $plan->id,
                    'name' => $plan->name,
                    'price' => $plan->price,
                    'interval' => $plan->interval,
                    'features' => $plan->features ?? [],
                    'stripe_price_id' => $plan->stripe_price_id,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $plans
        ]);
    }
}