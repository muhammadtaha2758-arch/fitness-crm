<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TrainerTask;
use App\Models\Coach;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class TrainerTaskController extends Controller
{
    /**
     * Display a listing of all trainer tasks
     */
    public function index(Request $request)
    {
        try {
            $query = TrainerTask::with(['trainer', 'user']);

            // Apply filters
            if ($request->has('status') && $request->status !== '') {
                $query->where('status', $request->status);
            }

            if ($request->has('priority') && $request->priority !== '') {
                $query->where('priority', $request->priority);
            }

            if ($request->has('category') && $request->category !== '') {
                $query->where('category', $request->category);
            }

            if ($request->has('trainer_id') && $request->trainer_id !== '') {
                $query->where('trainer_id', $request->trainer_id);
            }

            if ($request->has('due_date_from') && $request->due_date_from !== '') {
                $query->where('due_date', '>=', $request->due_date_from);
            }

            if ($request->has('due_date_to') && $request->due_date_to !== '') {
                $query->where('due_date', '<=', $request->due_date_to);
            }

            // Apply search
            if ($request->has('search') && $request->search !== '') {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%")
                      ->orWhere('category', 'like', "%{$search}%");
                });
            }

            // Apply sorting
            $sortBy = $request->get('sort_by', 'due_date');
            $sortOrder = $request->get('sort_order', 'asc');
            $query->orderBy($sortBy, $sortOrder);

            // Pagination
            $perPage = $request->get('per_page', 15);
            $tasks = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $tasks,
                'message' => 'Trainer tasks retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving trainer tasks: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get tasks for a specific trainer
     */
    public function getTrainerTasks($trainerId, Request $request)
    {
        try {
            // Verify trainer exists
            $trainer = Coach::findOrFail($trainerId);

            $query = TrainerTask::with(['trainer', 'user'])
                               ->where('trainer_id', $trainerId);

            // Apply filters
            if ($request->has('status') && $request->status !== '') {
                $query->where('status', $request->status);
            }

            if ($request->has('priority') && $request->priority !== '') {
                $query->where('priority', $request->priority);
            }

            if ($request->has('category') && $request->category !== '') {
                $query->where('category', $request->category);
            }

            // Apply search
            if ($request->has('search') && $request->search !== '') {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            }

            // Apply sorting
            $sortBy = $request->get('sort_by', 'due_date');
            $sortOrder = $request->get('sort_order', 'asc');
            $query->orderBy($sortBy, $sortOrder);

            // Pagination
            $perPage = $request->get('per_page', 15);
            $tasks = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $tasks,
                'trainer' => [
                    'id' => $trainer->id,
                    'name' => $trainer->getDisplayNameAttribute(),
                    'email' => $trainer->email,
                    'coach_type' => $trainer->coach_type
                ],
                'message' => 'Trainer tasks retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving trainer tasks: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create a new task for a trainer
     */
    public function createTask(Request $request, $trainerId)
    {
        try {
            // Verify trainer exists
            $trainer = Coach::findOrFail($trainerId);

            // Validate request
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:200',
                'description' => 'nullable|string|max:200',
                'category' => 'required|string|in:Training,Client Management,Administrative,Maintenance,Professional Development,Coaching,Follow-up,Assessment,Nutrition,Wellness,Billing,Communication,Other',
                'priority' => 'required|string|in:Low,Medium,High,Urgent',
                'due_date' => 'required|date|after:today',
                'status' => 'nullable|string|in:pending,in-progress,completed,cancelled'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Create task
            $task = TrainerTask::create([
                'trainer_id' => $trainerId,
                'user_id' => Auth::id() ?? 1, // Default to user ID 1 if not authenticated
                'title' => $request->title,
                'description' => $request->description,
                'category' => $request->category,
                'priority' => $request->priority,
                'due_date' => $request->due_date,
                'status' => $request->status ?? 'pending'
            ]);

            // Load relationships
            $task->load(['trainer', 'user']);

            return response()->json([
                'success' => true,
                'data' => $task,
                'message' => 'Task created successfully for trainer'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating task: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update an existing task
     */
    public function updateTask(Request $request, $trainerId, $taskId)
    {
        try {
            // Verify trainer exists
            $trainer = Coach::findOrFail($trainerId);

            // Find the task
            $task = TrainerTask::where('trainer_id', $trainerId)
                              ->where('id', $taskId)
                              ->firstOrFail();

            // Validate request
            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|required|string|max:200',
                'description' => 'nullable|string|max:200',
                'category' => 'sometimes|required|string|in:Training,Client Management,Administrative,Maintenance,Professional Development,Other',
                'priority' => 'sometimes|required|string|in:Low,Medium,High,Urgent',
                'due_date' => 'sometimes|required|date',
                'status' => 'sometimes|required|string|in:pending,in-progress,completed,cancelled'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Update task
            $task->update($request->only([
                'title', 'description', 'category', 'priority', 'due_date', 'status'
            ]));

            // If status is completed, set completed_date
            if ($request->has('status') && $request->status === 'completed') {
                $task->update(['completed_date' => now()]);
            }

            // Load relationships
            $task->load(['trainer', 'user']);

            return response()->json([
                'success' => true,
                'data' => $task,
                'message' => 'Task updated successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating task: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a task
     */
    public function deleteTask($trainerId, $taskId)
    {
        try {
            // Verify trainer exists
            $trainer = Coach::findOrFail($trainerId);

            // Find and delete the task
            $task = TrainerTask::where('trainer_id', $trainerId)
                              ->where('id', $taskId)
                              ->firstOrFail();

            $task->delete();

            return response()->json([
                'success' => true,
                'message' => 'Task deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting task: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get overdue tasks
     */
    public function getOverdueTasks(Request $request)
    {
        try {
            $query = TrainerTask::with(['trainer', 'user'])->overdue();

            // Apply filters
            if ($request->has('trainer_id') && $request->trainer_id !== '') {
                $query->where('trainer_id', $request->trainer_id);
            }

            if ($request->has('priority') && $request->priority !== '') {
                $query->where('priority', $request->priority);
            }

            // Apply sorting
            $sortBy = $request->get('sort_by', 'due_date');
            $sortOrder = $request->get('sort_order', 'asc');
            $query->orderBy($sortBy, $sortOrder);

            // Pagination
            $perPage = $request->get('per_page', 15);
            $tasks = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $tasks,
                'message' => 'Overdue tasks retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving overdue tasks: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get tasks due soon
     */
    public function getDueSoonTasks(Request $request)
    {
        try {
            $days = $request->get('days', 7);
            $query = TrainerTask::with(['trainer', 'user'])->dueSoon($days);

            // Apply filters
            if ($request->has('trainer_id') && $request->trainer_id !== '') {
                $query->where('trainer_id', $request->trainer_id);
            }

            if ($request->has('priority') && $request->priority !== '') {
                $query->where('priority', $request->priority);
            }

            // Apply sorting
            $sortBy = $request->get('sort_by', 'due_date');
            $sortOrder = $request->get('sort_order', 'asc');
            $query->orderBy($sortBy, $sortOrder);

            // Pagination
            $perPage = $request->get('per_page', 15);
            $tasks = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $tasks,
                'days' => $days,
                'message' => 'Tasks due soon retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving tasks due soon: ' . $e->getMessage()
            ], 500);
        }
    }
}
