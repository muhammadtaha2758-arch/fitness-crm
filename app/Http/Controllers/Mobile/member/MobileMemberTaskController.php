<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\Member;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class MobileMemberTaskController extends Controller
{
    /**
     * Get all tasks for the authenticated member
     */
    public function index(Request $request)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Get member record from members table
            $member = DB::table('members')->where('email', $user->email)->first();
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Get filter parameters
            $status = $request->get('status'); // pending, in_progress, completed, cancelled
            $priority = $request->get('priority'); // low, medium, high, urgent
            $category = $request->get('category');

            // Build query
            $query = Task::with(['assignedTo'])
                ->where('member_id', $member->id);

            // Apply filters
            if ($status) {
                $query->where('status', $status);
            }

            if ($priority) {
                $query->where('priority', $priority);
            }

            if ($category) {
                $query->where('category', $category);
            }

            // Order by due date (overdue first, then upcoming)
            $tasks = $query->orderByRaw('
                CASE 
                    WHEN due_date < CURDATE() AND status NOT IN ("completed", "cancelled") THEN 0
                    WHEN due_date = CURDATE() AND status NOT IN ("completed", "cancelled") THEN 1
                    WHEN due_date > CURDATE() AND status NOT IN ("completed", "cancelled") THEN 2
                    ELSE 3
                END
            ')
            ->orderBy('due_date', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

            // Transform tasks for mobile app
            $transformedTasks = $tasks->map(function ($task) {
                return [
                    'id' => $task->id,
                    'title' => $task->title,
                    'description' => $task->description,
                    'category' => $task->category,
                    'priority' => $task->priority,
                    'status' => $task->status,
                    'due_date' => $task->due_date ? Carbon::parse($task->due_date)->format('Y-m-d') : null,
                    'due_date_formatted' => $task->due_date ? Carbon::parse($task->due_date)->format('M d, Y') : null,
                    'due_date_ago' => $task->due_date ? Carbon::parse($task->due_date)->diffForHumans() : null,
                    'is_overdue' => $task->due_date && Carbon::parse($task->due_date)->isPast() && !in_array($task->status, ['completed', 'cancelled']),
                    'is_due_today' => $task->due_date && Carbon::parse($task->due_date)->isToday() && !in_array($task->status, ['completed', 'cancelled']),
                    'assigned_to' => [
                        'id' => $task->assignedTo->id ?? null,
                        'name' => $task->assignedTo ? trim(($task->assignedTo->firstname ?? '') . ' ' . ($task->assignedTo->lastname ?? '')) : null,
                        'avatar' => $task->assignedTo && $task->assignedTo->avatar ? asset('storage/' . $task->assignedTo->avatar) : null,
                    ],
                    'created_at' => $task->created_at ? Carbon::parse($task->created_at)->format('Y-m-d H:i:s') : null,
                    'created_at_formatted' => $task->created_at ? Carbon::parse($task->created_at)->format('M d, Y') : null,
                    'updated_at' => $task->updated_at ? Carbon::parse($task->updated_at)->format('Y-m-d H:i:s') : null,
                ];
            });

            // Calculate statistics
            $stats = [
                'total' => $tasks->count(),
                'pending' => $tasks->where('status', 'pending')->count(),
                'in_progress' => $tasks->where('status', 'in_progress')->count(),
                'completed' => $tasks->where('status', 'completed')->count(),
                'overdue' => $tasks->filter(function($task) {
                    return $task->due_date && Carbon::parse($task->due_date)->isPast() && !in_array($task->status, ['completed', 'cancelled']);
                })->count(),
            ];

            return response()->json([
                'success' => true,
                'message' => 'Tasks retrieved successfully',
                'data' => $transformedTasks,
                'statistics' => $stats
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get tasks error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching tasks: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get specific task details
     */
    public function show(Request $request, $id)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Get member record
            $member = DB::table('members')->where('email', $user->email)->first();
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Get task
            $task = Task::with(['assignedTo', 'member'])
                ->where('id', $id)
                ->where('member_id', $member->id)
                ->first();

            if (!$task) {
                return response()->json([
                    'success' => false,
                    'message' => 'Task not found',
                ], 404);
            }

            // Transform task for mobile app
            $transformedTask = [
                'id' => $task->id,
                'title' => $task->title,
                'description' => $task->description,
                'category' => $task->category,
                'priority' => $task->priority,
                'status' => $task->status,
                'due_date' => $task->due_date ? Carbon::parse($task->due_date)->format('Y-m-d') : null,
                'due_date_formatted' => $task->due_date ? Carbon::parse($task->due_date)->format('M d, Y') : null,
                'due_date_ago' => $task->due_date ? Carbon::parse($task->due_date)->diffForHumans() : null,
                'is_overdue' => $task->due_date && Carbon::parse($task->due_date)->isPast() && !in_array($task->status, ['completed', 'cancelled']),
                'is_due_today' => $task->due_date && Carbon::parse($task->due_date)->isToday() && !in_array($task->status, ['completed', 'cancelled']),
                'assigned_to' => [
                    'id' => $task->assignedTo->id ?? null,
                    'name' => $task->assignedTo ? trim(($task->assignedTo->firstname ?? '') . ' ' . ($task->assignedTo->lastname ?? '')) : null,
                    'avatar' => $task->assignedTo && $task->assignedTo->avatar ? asset('storage/' . $task->assignedTo->avatar) : null,
                    'email' => $task->assignedTo->email ?? null,
                ],
                'member' => [
                    'id' => $task->member->id ?? null,
                    'name' => $task->member ? trim(($task->member->firstname ?? '') . ' ' . ($task->member->lastname ?? '')) : null,
                ],
                'created_at' => $task->created_at ? Carbon::parse($task->created_at)->format('Y-m-d H:i:s') : null,
                'created_at_formatted' => $task->created_at ? Carbon::parse($task->created_at)->format('M d, Y h:i A') : null,
                'updated_at' => $task->updated_at ? Carbon::parse($task->updated_at)->format('Y-m-d H:i:s') : null,
                'updated_at_formatted' => $task->updated_at ? Carbon::parse($task->updated_at)->format('M d, Y h:i A') : null,
            ];

            return response()->json([
                'success' => true,
                'message' => 'Task retrieved successfully',
                'data' => $transformedTask
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get task error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching task: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update task status
     */
    public function updateStatus(Request $request, $id)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Validate request
            $validator = Validator::make($request->all(), [
                'status' => 'required|string|in:pending,in_progress,completed,cancelled',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Get member record
            $member = DB::table('members')->where('email', $user->email)->first();
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Get task
            $task = Task::where('id', $id)
                ->where('member_id', $member->id)
                ->first();

            if (!$task) {
                return response()->json([
                    'success' => false,
                    'message' => 'Task not found',
                ], 404);
            }

            // Store old status to check if it changed to completed
            $oldStatus = $task->status;
            
            // Update status
            $task->status = $request->status;
            $task->save();

            // If status changed to completed, send notifications
            if ($oldStatus !== 'completed' && $request->status === 'completed') {
                try {
                    $gymId = $member->gym_id ?? 1;
                    NotificationService::taskCompleted($task, $gymId, $member->id);
                } catch (\Exception $notificationException) {
                    // Log notification error but don't fail the task update
                    Log::warning('Failed to create notification for task completion', [
                        'task_id' => $task->id,
                        'member_id' => $member->id,
                        'error' => $notificationException->getMessage()
                    ]);
                }
            }

            // Transform task for response
            $transformedTask = [
                'id' => $task->id,
                'title' => $task->title,
                'status' => $task->status,
                'due_date' => $task->due_date ? Carbon::parse($task->due_date)->format('Y-m-d') : null,
                'updated_at' => $task->updated_at ? Carbon::parse($task->updated_at)->format('Y-m-d H:i:s') : null,
            ];

            return response()->json([
                'success' => true,
                'message' => 'Task status updated successfully',
                'data' => $transformedTask
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Update task status error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error updating task status: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get task statistics
     */
    public function statistics(Request $request)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Get member record
            $member = DB::table('members')->where('email', $user->email)->first();
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Get all tasks for member
            $tasks = Task::where('member_id', $member->id)->get();

            // Calculate statistics
            $stats = [
                'total' => $tasks->count(),
                'pending' => $tasks->where('status', 'pending')->count(),
                'in_progress' => $tasks->where('status', 'in_progress')->count(),
                'completed' => $tasks->where('status', 'completed')->count(),
                'cancelled' => $tasks->where('status', 'cancelled')->count(),
                'overdue' => $tasks->filter(function($task) {
                    return $task->due_date && Carbon::parse($task->due_date)->isPast() && !in_array($task->status, ['completed', 'cancelled']);
                })->count(),
                'due_today' => $tasks->filter(function($task) {
                    return $task->due_date && Carbon::parse($task->due_date)->isToday() && !in_array($task->status, ['completed', 'cancelled']);
                })->count(),
                'by_priority' => [
                    'low' => $tasks->where('priority', 'low')->whereNotIn('status', ['completed', 'cancelled'])->count(),
                    'medium' => $tasks->where('priority', 'medium')->whereNotIn('status', ['completed', 'cancelled'])->count(),
                    'high' => $tasks->where('priority', 'high')->whereNotIn('status', ['completed', 'cancelled'])->count(),
                    'urgent' => $tasks->where('priority', 'urgent')->whereNotIn('status', ['completed', 'cancelled'])->count(),
                ],
            ];

            return response()->json([
                'success' => true,
                'message' => 'Task statistics retrieved successfully',
                'data' => $stats
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get task statistics error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching task statistics: ' . $e->getMessage(),
            ], 500);
        }
    }
}

