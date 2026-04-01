<?php

namespace App\Http\Controllers;

use App\Models\Support;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class SupportController extends Controller
{
    /**
     * Display a listing of support tickets
     */
    public function index(Request $request)
    {
        try {
            $user = $request->user('api');
            $query = Support::query();

            // For mobile coaches, filter tickets by their user_id
            if ($user && $user->role_id == 3) {
                $query->where('user_id', $user->id);
            }

            // Apply filters
            if ($request->has('status') && $request->status !== '') {
                $query->where('status', $request->status);
            }

            if ($request->has('priority') && $request->priority !== '') {
                $query->where('priority', $request->priority);
            }

            if ($request->has('search') && $request->search !== '') {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('subject', 'like', "%{$search}%")
                      ->orWhere('ticket_number', 'like', "%{$search}%");
                });
            }

            // Order by created_at desc
            $query->orderBy('created_at', 'desc');

            // Paginate results
            $perPage = $request->get('per_page', 15);
            $tickets = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $tickets,
                'message' => 'Support tickets retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving support tickets: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created support ticket
     */
    public function store(Request $request)
    {
        $user = $request->user('api');
        
        // For mobile coaches, use their info if not provided
        // Accept both 'message' and 'description' for compatibility (mobile app sends 'description')
        $validator = Validator::make($request->all(), [
            'name' => $user && $user->role_id == 3 ? 'nullable|string|max:100' : 'required|string|max:100',
            'email' => $user && $user->role_id == 3 ? 'nullable|email|max:150' : 'required|email|max:150',
            'subject' => 'required|string|max:255',
            'message' => 'nullable|string',
            'description' => 'nullable|string',
            'priority' => 'nullable|in:low,medium,high'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check that at least one of message or description is provided
        if (empty($request->message) && empty($request->description)) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => ['description' => ['The description or message field is required.']]
            ], 422);
        }

        try {
            // For mobile coaches, auto-fill name and email from user
            $name = $request->name;
            $email = $request->email;
            
            if ($user && $user->role_id == 3) {
                if (!$name) {
                    $name = $user->name ?? 'Coach';
                }
                if (!$email) {
                    $email = $user->email;
                }
            }

            // Use description if provided, otherwise use message
            $message = $request->description ?? $request->message;

            $ticket = Support::create([
                'name' => $name,
                'email' => $email,
                'subject' => $request->subject,
                'message' => $message,
                'priority' => $request->priority ?? 'medium',
                'status' => 'pending',
                'user_id' => $user ? $user->id : (Auth::id() ?? null)
            ]);

            return response()->json([
                'success' => true,
                'data' => $ticket,
                'message' => 'Support ticket created successfully'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating support ticket: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified support ticket
     */
    public function show(Request $request, $id)
    {
        try {
            $user = $request->user('api');
            $ticket = Support::findOrFail($id);
            
            // For mobile coaches, ensure they can only view their own tickets
            if ($user && $user->role_id == 3 && $ticket->user_id != $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Support ticket not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $ticket,
                'message' => 'Support ticket retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Support ticket not found'
            ], 404);
        }
    }

    /**
     * Update the specified support ticket
     */
    public function update(Request $request, $id)
    {
        $user = $request->user('api');
        
        $validator = Validator::make($request->all(), [
            'status' => 'nullable|in:pending,in_progress,resolved,closed',
            'priority' => 'nullable|in:low,medium,high',
            'name' => 'nullable|string|max:100',
            'email' => 'nullable|email|max:150',
            'subject' => 'nullable|string|max:255',
            'message' => 'nullable|string',
            'description' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $ticket = Support::findOrFail($id);
            
            // For mobile coaches, ensure they can only update their own tickets
            if ($user && $user->role_id == 3 && $ticket->user_id != $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Support ticket not found'
                ], 404);
            }
            
            // Mobile coaches can only update certain fields (not status)
            $updateFields = ['priority', 'name', 'email', 'subject', 'message'];
            if (!($user && $user->role_id == 3)) {
                $updateFields[] = 'status';
            }
            
            $updateData = $request->only($updateFields);
            
            // Handle description field - map to message if provided
            if ($request->has('description')) {
                $updateData['message'] = $request->description;
            }
            
            $ticket->update($updateData);

            return response()->json([
                'success' => true,
                'data' => $ticket,
                'message' => 'Support ticket updated successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating support ticket: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified support ticket
     */
    public function destroy(Request $request, $id)
    {
        try {
            $user = $request->user('api');
            $ticket = Support::findOrFail($id);
            
            // For mobile coaches, ensure they can only delete their own tickets
            if ($user && $user->role_id == 3 && $ticket->user_id != $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Support ticket not found'
                ], 404);
            }
            
            $ticket->delete();

            return response()->json([
                'success' => true,
                'message' => 'Support ticket deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting support ticket: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get support statistics
     */
    public function statistics(Request $request)
    {
        try {
            $user = $request->user('api');
            
            // For mobile coaches, filter statistics by their user_id
            $query = Support::query();
            if ($user && $user->role_id == 3) {
                $query->where('user_id', $user->id);
            }
            
            $stats = [
                'total' => (clone $query)->count(),
                'pending' => (clone $query)->where('status', 'pending')->count(),
                'in_progress' => (clone $query)->where('status', 'in_progress')->count(),
                'resolved' => (clone $query)->where('status', 'resolved')->count(),
                'closed' => (clone $query)->where('status', 'closed')->count(),
                'high_priority' => (clone $query)->where('priority', 'high')->count(),
                'medium_priority' => (clone $query)->where('priority', 'medium')->count(),
                'low_priority' => (clone $query)->where('priority', 'low')->count(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats,
                'message' => 'Support statistics retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving support statistics: ' . $e->getMessage()
            ], 500);
        }
    }
}
