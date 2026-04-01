<?php

namespace App\Http\Controllers;

use App\Models\MealPlanTemplateDetail;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

/**
 * MealsMessageController
 * 
 * NOTE: This controller has been updated to use MealPlanTemplateDetail instead of MealsMessage.
 * The meals_messages table has been migrated and its columns added to meal_plan_template_details.
 * Messages are now associated with template details (food items) rather than meals directly.
 */
class MealsMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            // Query meal_plan_template_details that have message data (migrated from meals_messages)
            $query = MealPlanTemplateDetail::with(['member', 'sentBy', 'template', 'food'])
                ->whereNotNull('member_id')
                ->whereNotNull('last_message');

            // Apply filters
            if ($request->has('member_id') && $request->member_id) {
                $query->where('member_id', $request->member_id);
            }

            if ($request->has('gym_id') && $request->gym_id) {
                $query->where('gym_id', $request->gym_id);
            }

            if ($request->has('date_from') && $request->date_from) {
                $query->where('message_date', '>=', $request->date_from);
            }

            if ($request->has('date_to') && $request->date_to) {
                $query->where('message_date', '<=', $request->date_to);
            }

            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->whereHas('member', function ($q) use ($search) {
                    $q->where('firstname', 'like', "%{$search}%")
                      ->orWhere('lastname', 'like', "%{$search}%")
                      ->orWhere('membername', 'like', "%{$search}%");
                });
            }

            // Pagination
            $perPage = $request->get('per_page', 15);
            $messages = $query->orderBy('message_date', 'desc')->paginate($perPage);

            // Transform data to match frontend format
            $transformedMessages = $messages->getCollection()->map(function ($message) {
                return [
                    'id' => $message->id,
                    'user' => $message->member ? $message->member->firstname . ' ' . $message->member->lastname : 'Unknown',
                    'member_id' => $message->member_id,
                    'lastMessage' => $message->last_message,
                    'date' => $message->message_date ? $message->message_date->format('m/d/Y') : null,
                    'sent_by' => $message->sentBy ? $message->sentBy->name : 'Unknown',
                    'notes' => $message->notes,
                    'template_id' => $message->template_id,
                    'food_id' => $message->food_id,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedMessages,
                'pagination' => [
                    'current_page' => $messages->currentPage(),
                    'last_page' => $messages->lastPage(),
                    'per_page' => $messages->perPage(),
                    'total' => $messages->total(),
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching meals messages: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'member_id' => 'required|exists:members,id',
                'template_id' => 'required|exists:meal_plans_template,id',
                'food_id' => 'nullable|exists:foods,id',
                'last_message' => 'required|string|max:1000',
                'sent_by' => 'required|exists:users,id',
                'message_date' => 'required|date',
                'notes' => 'nullable|string|max:1000',
                'gym_id' => 'nullable|exists:gyms,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Find or create a meal_plan_template_detail record
            $detail = MealPlanTemplateDetail::where('template_id', $request->template_id)
                ->where('food_id', $request->food_id ?? 0)
                ->first();

            if (!$detail) {
                // Create a new detail record if it doesn't exist
                $detail = MealPlanTemplateDetail::create([
                    'template_id' => $request->template_id,
                    'gym_id' => $request->gym_id,
                    'food_id' => $request->food_id ?? 0,
                    'nutrition_type' => 'general',
                    'quantity' => 1,
                ]);
            }

            // Update with message data
            $detail->update([
                'member_id' => $request->member_id,
                'last_message' => $request->last_message,
                'sent_by' => $request->sent_by,
                'message_date' => $request->message_date,
                'notes' => $request->notes ?? $detail->notes,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Meals message created successfully',
                'data' => $detail->load(['member', 'sentBy', 'template', 'food'])
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating meals message: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        try {
            $message = MealPlanTemplateDetail::with(['member', 'sentBy', 'template', 'food'])
                ->whereNotNull('member_id')
                ->whereNotNull('last_message')
                ->findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => $message
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching meals message: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'member_id' => 'sometimes|required|exists:members,id',
                'last_message' => 'sometimes|required|string|max:1000',
                'sent_by' => 'sometimes|required|exists:users,id',
                'message_date' => 'sometimes|required|date',
                'notes' => 'nullable|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $message = MealPlanTemplateDetail::whereNotNull('member_id')
                ->whereNotNull('last_message')
                ->findOrFail($id);

            $message->update($request->only(['member_id', 'last_message', 'sent_by', 'message_date', 'notes']));

            return response()->json([
                'success' => true,
                'message' => 'Meals message updated successfully',
                'data' => $message->load(['member', 'sentBy', 'template', 'food'])
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating meals message: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        try {
            $message = MealPlanTemplateDetail::whereNotNull('member_id')
                ->whereNotNull('last_message')
                ->findOrFail($id);

            // Clear message data but keep the detail record
            $message->update([
                'member_id' => null,
                'last_message' => null,
                'sent_by' => null,
                'message_date' => null,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Meals message deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting meals message: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get recent messages for the recent messages tab
     */
    public function getRecentMessages(): JsonResponse
    {
        try {
            // Get recent meals messages with member info
            $recentMessages = MealPlanTemplateDetail::with(['member', 'sentBy', 'template', 'food'])
                ->whereNotNull('member_id')
                ->whereNotNull('last_message')
                ->whereHas('member')
                ->orderBy('message_date', 'desc')
                ->limit(10)
                ->get();

            $transformedMessages = $recentMessages->map(function ($message) {
                return [
                    'id' => $message->id,
                    'user' => $message->member ? $message->member->firstname . ' ' . $message->member->lastname : 'Unknown',
                    'lastMessage' => $message->last_message ? substr($message->last_message, 0, 50) . '...' : 'No message',
                    'date' => $message->message_date ? $message->message_date->format('m/d/Y') : null,
                    'sent_by' => $message->sentBy ? $message->sentBy->name : 'Unknown',
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedMessages
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching recent messages: ' . $e->getMessage()
            ], 500);
        }
    }
}
