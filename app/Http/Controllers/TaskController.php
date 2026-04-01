<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Member;
use App\Models\Coach;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Services\NotificationService;

class TaskController extends BaseController
{
    /**
     * Get all tasks (both member and coach tasks)
     */
    public function index(Request $request)
    {
        // Check if user has permission to view members or staff (coaches)
        // Tasks are accessible if user can view either members or coaches
        $user = $request->user('api');
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        // Check user role - admins and coaches can view tasks
        $isAdmin = isset($user->role_id) && $user->role_id == 1;
        $isMobileCoach = isset($user->role_id) && $user->role_id == 3;
        
        // Admins can view all tasks in their gym
        // Mobile coaches can view their own tasks
        // Other users (CRM staff) can view tasks in their gym
        // No need for strict permission checks since roles/permissions tables were dropped
        
        try {
            // Get gym_id from authenticated user (from users table)
            $user = $request->user('api');
            $gym_id = $user->gym_id ?? 1;
            
            // Check if this is a mobile coach
            $isMobileCoach = $user->role_id == 3;
            
            $dateFilter = $request->get('date_filter', 'history');
            $taskFilter = $request->get('task_filter', 'all');
            $coachFilter = $request->get('coach_filter', 'all');
            $search = $request->get('search', '');

            // Get all tasks from unified tasks table
            $tasksQuery = Task::with(['member', 'coach', 'assignedTo', 'user'])
                ->where('gym_id', $gym_id);

            // For mobile coaches, filter by their coach_id
            if ($isMobileCoach) {
                // Find coach by user email
                $coach = Coach::where('email', $user->email)->first();
                if ($coach) {
                    $tasksQuery->where('coach_id', $coach->id);
                } else {
                    // If coach not found, return empty result
                    return response()->json([
                        'success' => true,
                        'data' => [],
                        'message' => 'Tasks retrieved successfully'
                    ]);
                }
            }

            // Apply date filter based on due_date
            if ($dateFilter !== 'history') {
                $now = now();
                $startOfToday = $now->copy()->startOfDay();
                $endOfToday = $now->copy()->endOfDay();
                $startOfWeek = $now->copy()->startOfWeek();
                $endOfWeek = $now->copy()->endOfWeek();
                $startOfMonth = $now->copy()->startOfMonth();
                $endOfMonth = $now->copy()->endOfMonth();

                switch ($dateFilter) {
                    case 'today':
                        // Show tasks due today (must have due_date)
                        $tasksQuery->whereNotNull('due_date')
                            ->whereBetween('due_date', [$startOfToday->toDateString(), $endOfToday->toDateString()]);
                        break;
                    case 'week':
                        // Show tasks due this week (must have due_date)
                        $tasksQuery->whereNotNull('due_date')
                            ->whereBetween('due_date', [$startOfWeek->toDateString(), $endOfWeek->toDateString()]);
                        break;
                    case 'month':
                        // Show tasks due this month (must have due_date)
                        $tasksQuery->whereNotNull('due_date')
                            ->whereBetween('due_date', [$startOfMonth->toDateString(), $endOfMonth->toDateString()]);
                        break;
                }
            }
            // 'history' means all tasks (including those without due dates), no date filtering

            // Apply status filter
            if ($taskFilter !== 'all') {
                $tasksQuery->where('status', $taskFilter);
            }

            if ($coachFilter !== 'all') {
                $tasksQuery->where('coach_id', $coachFilter);
            }

            if ($search) {
                $tasksQuery->where(function($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%")
                      ->orWhereHas('member', function($query) use ($search) {
                          $query->where('membername', 'like', "%{$search}%")
                                ->orWhere('firstname', 'like', "%{$search}%")
                                ->orWhere('lastname', 'like', "%{$search}%");
                      })
                      ->orWhereHas('coach', function($query) use ($search) {
                          $query->where('first_name', 'like', "%{$search}%")
                                ->orWhere('last_name', 'like', "%{$search}%");
                      });
                });
            }

            $allTasks = $tasksQuery->get()->map(function($task) {
                return [
                    'id' => $task->id,
                    'title' => $task->title,
                    'description' => $task->description,
                    'category' => $task->category,
                    'priority' => $task->priority,
                    'due_date' => $task->due_date,
                    'status' => $task->status,
                    'assigned_to' => $task->assigned_to,
                    'member_id' => $task->member_id,
                    'coach_id' => $task->coach_id,
                    'member_name' => $task->member ? ($task->member->membername ?? ($task->member->firstname . ' ' . $task->member->lastname)) : null,
                    'coach_name' => $task->coach ? ($task->coach->first_name . ' ' . $task->coach->last_name) : null,
                    'assigned_to_name' => $task->assignedTo ? $task->assignedTo->name : null,
                    'created_at' => $task->created_at,
                    'updated_at' => $task->updated_at,
                    'task_type' => $task->task_type
                ];
            })->sortByDesc('created_at')->values();

            return response()->json([
                'success' => true,
                'data' => $allTasks,
                'message' => 'Tasks retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving tasks: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create a new task
     */
    public function store(Request $request)
    {
        $user = $request->user('api');
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        // Check user role - admins and coaches can create tasks
        $isAdmin = isset($user->role_id) && $user->role_id == 1;
        $isMobileCoach = isset($user->role_id) && $user->role_id == 3;
        
        // Admins can create tasks for anyone in their gym
        // Mobile coaches can create tasks for themselves and their members
        // Other users (CRM staff) can create tasks in their gym
        // No need for strict permission checks since roles/permissions tables were dropped
        
        try {
            // Get gym_id from authenticated user (from users table)
            $gym_id = $user->gym_id ?? 1;
            $user_id = $user->id ?? Auth::id() ?? 1;

            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'category' => 'required|string',
                'description' => 'nullable|string',
                'member_id' => 'nullable|integer|exists:members,id',
                'coach_id' => 'nullable|integer|exists:coaches,id',
                'assigned_to' => 'nullable|integer|exists:users,id',
                'status' => 'nullable|string|in:pending,in-progress,completed,cancelled',
                'due_date' => 'nullable|date',
                'priority' => 'nullable|string|in:Low,Medium,High,Urgent',
                'task_type' => 'nullable|string|in:member,coach'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Prepare unified task data
            // gym_id comes from users table via authenticated user
            // user_id is the user who created the task (from users table)
            $unifiedTaskData = [
                'gym_id' => $gym_id, // From users table
                'user_id' => $user_id, // From users table (creator)
                'assigned_to' => $request->assigned_to,
                'title' => $request->title,
                'category' => $request->category,
                'description' => $request->description,
                'concerns' => $request->concerns ?? null,
                'status' => $request->status ?? 'pending',
                'due_date' => $request->due_date,
                'priority' => $request->priority ?? 'Medium',
                'task_type' => $request->task_type,
                'due_time' => $request->due_time ?? null,
                'duration' => $request->duration ?? null,
            ];

            // Handle task_type - it's optional now, tasks can be unassigned
            if ($request->task_type === 'member') {
                // Member ID is optional - allow unassigned member tasks
                if ($request->member_id) {
                    // Verify member belongs to gym if member_id is provided
                    $member = Member::where('id', $request->member_id)
                        ->where('gym_id', $gym_id)
                        ->first();

                    if (!$member) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Member not found'
                        ], 404);
                    }

                    // If user is a mobile coach, verify they can create tasks for their assigned members
                    if ($isMobileCoach) {
                        // Find the coach record for this user
                        $userCoach = Coach::where('email', $user->email)
                            ->where('gym_id', $gym_id)
                            ->first();
                        
                        if ($userCoach) {
                            // Check if member is assigned to this coach
                            $isAssigned = \DB::table('coach_assignments')
                                ->where('coach_id', $userCoach->id)
                                ->where('member_id', $request->member_id)
                                ->where('status', 'active')
                                ->exists();
                            
                            if (!$isAssigned) {
                                // Also check if member has coach_id set to this coach
                                if ($member->coach_id != $userCoach->id) {
                                    return response()->json([
                                        'success' => false,
                                        'message' => 'You can only create tasks for your assigned members'
                                    ], 403);
                                }
                            }
                        }
                    }

                    $unifiedTaskData['member_id'] = $request->member_id;
                } else {
                    $unifiedTaskData['member_id'] = null;
                }
                $unifiedTaskData['coach_id'] = null;
            } else if ($request->task_type === 'coach') {
                // Coach ID is optional - allow unassigned coach tasks
                if ($request->coach_id) {
                    // Verify coach belongs to gym if coach_id is provided
                    $coach = Coach::where('id', $request->coach_id)
                        ->where('gym_id', $gym_id)
                        ->first();

                    if (!$coach) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Coach not found'
                        ], 404);
                    }

                    // If user is a mobile coach, verify they can only create tasks for themselves
                    if ($isMobileCoach) {
                        // Find the coach record for this user
                        $userCoach = Coach::where('email', $user->email)
                            ->where('gym_id', $gym_id)
                            ->first();
                        
                        if (!$userCoach || $userCoach->id != $request->coach_id) {
                            return response()->json([
                                'success' => false,
                                'message' => 'You can only create tasks for yourself'
                            ], 403);
                        }
                    }

                    $unifiedTaskData['coach_id'] = $request->coach_id;
                } else {
                    // If mobile coach is creating a coach task without coach_id, assign it to themselves
                    if ($isMobileCoach) {
                        $userCoach = Coach::where('email', $user->email)
                            ->where('gym_id', $gym_id)
                            ->first();
                        
                        if ($userCoach) {
                            $unifiedTaskData['coach_id'] = $userCoach->id;
                        } else {
                            $unifiedTaskData['coach_id'] = null;
                        }
                    } else {
                        $unifiedTaskData['coach_id'] = null;
                    }
                }
                $unifiedTaskData['member_id'] = null;
            } else {
                // No task_type specified - create unassigned task
                $unifiedTaskData['member_id'] = null;
                $unifiedTaskData['coach_id'] = null;
                $unifiedTaskData['task_type'] = null;
            }

            // Create task in unified tasks table
            $task = Task::create($unifiedTaskData);
            $task->load(['member', 'coach', 'assignedTo', 'user']);

            // Create notifications for task creation
            try {
                NotificationService::taskCreated($task, $gym_id, $user_id);
            } catch (\Exception $notificationException) {
                // Log notification error but don't fail the task creation
                \Log::warning('Failed to create notification for task', [
                    'task_id' => $task->id,
                    'member_id' => $task->member_id,
                    'coach_id' => $task->coach_id,
                    'error' => $notificationException->getMessage()
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $task,
                'message' => 'Task created successfully'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating task: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update a task
     */
    public function update(Request $request, $id)
    {
        $user = $request->user('api');
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        // Check user role - admin (role_id = 1) and mobile coaches (role_id = 3) have different rules
        $isAdmin = isset($user->role_id) && $user->role_id == 1;
        $isMobileCoach = isset($user->role_id) && $user->role_id == 3;
        
        // Admins can update any task in their gym
        // Mobile coaches can only update their own tasks (checked later)
        // Other users (CRM staff) can update tasks in their gym
        // No need for strict permission checks since roles/permissions tables were dropped
        
        try {
            // Get gym_id from authenticated user (from users table)
            $gym_id = $user->gym_id ?? 1;
            $taskType = $request->get('task_type');

            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|required|string|max:255',
                'category' => 'sometimes|required|string',
                'description' => 'nullable|string',
                'assigned_to' => 'nullable|integer|exists:users,id',
                'status' => 'sometimes|required|string|in:pending,in-progress,completed,cancelled',
                'due_date' => 'nullable|date',
                'priority' => 'nullable|string|in:Low,Medium,High,Urgent',
                'task_type' => 'nullable|string|in:member,coach',
                'member_id' => 'nullable|integer|exists:members,id',
                'coach_id' => 'nullable|integer|exists:coaches,id'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // First, find the task without filtering by task_type
            // This allows us to find tasks that are being converted from unassigned to assigned
            $task = Task::where('id', $id)
                ->where('gym_id', $gym_id)
                ->first();

            if (!$task) {
                return response()->json([
                    'success' => false,
                    'message' => 'Task not found'
                ], 404);
            }
            
            // Prepare update data - include task_type, member_id, and coach_id if provided
            $updateData = $request->only([
                'title', 'category', 'description', 'assigned_to', 
                'status', 'due_date', 'priority', 'concerns', 'due_time', 'duration'
            ]);
            
            // Handle task_type and assignment changes
            // If task_type is provided, update it (allows converting unassigned to assigned)
            if ($request->has('task_type')) {
                $updateData['task_type'] = $request->task_type;
                
                // If assigning to member, set member_id and clear coach_id
                if ($request->task_type === 'member' && $request->has('member_id')) {
                    if ($request->member_id) {
                        // Verify member belongs to gym
                        $member = Member::where('id', $request->member_id)
                            ->where('gym_id', $gym_id)
                            ->first();
                        
                        if (!$member) {
                            return response()->json([
                                'success' => false,
                                'message' => 'Member not found'
                            ], 404);
                        }
                        
                        $updateData['member_id'] = $request->member_id;
                        $updateData['coach_id'] = null;
                    } else {
                        $updateData['member_id'] = null;
                        $updateData['coach_id'] = null;
                    }
                }
                // If assigning to coach, set coach_id and clear member_id
                else if ($request->task_type === 'coach' && $request->has('coach_id')) {
                    if ($request->coach_id) {
                        // Verify coach belongs to gym
                        $coach = Coach::where('id', $request->coach_id)
                            ->where('gym_id', $gym_id)
                            ->first();
                        
                        if (!$coach) {
                            return response()->json([
                                'success' => false,
                                'message' => 'Coach not found'
                            ], 404);
                        }
                        
                        $updateData['coach_id'] = $request->coach_id;
                        $updateData['member_id'] = null;
                    } else {
                        $updateData['coach_id'] = null;
                        $updateData['member_id'] = null;
                    }
                }
                // If task_type is null, clear both member_id and coach_id
                else if ($request->task_type === null) {
                    $updateData['member_id'] = null;
                    $updateData['coach_id'] = null;
                }
            }
            // If task_type is not provided but member_id or coach_id is, update accordingly
            else {
                if ($request->has('member_id')) {
                    if ($request->member_id) {
                        $member = Member::where('id', $request->member_id)
                            ->where('gym_id', $gym_id)
                            ->first();
                        
                        if (!$member) {
                            return response()->json([
                                'success' => false,
                                'message' => 'Member not found'
                            ], 404);
                        }
                        
                        $updateData['member_id'] = $request->member_id;
                        $updateData['task_type'] = 'member';
                        $updateData['coach_id'] = null;
                    }
                }
                
                if ($request->has('coach_id')) {
                    if ($request->coach_id) {
                        $coach = Coach::where('id', $request->coach_id)
                            ->where('gym_id', $gym_id)
                            ->first();
                        
                        if (!$coach) {
                            return response()->json([
                                'success' => false,
                                'message' => 'Coach not found'
                            ], 404);
                        }
                        
                        $updateData['coach_id'] = $request->coach_id;
                        $updateData['task_type'] = 'coach';
                        $updateData['member_id'] = null;
                    }
                }
            }
            
            // For mobile coaches, verify they can only update their own tasks
            if ($isMobileCoach) {
                if ($task->coach_id) {
                    // Task is assigned to a coach - verify it's the same coach
                    $coach = Coach::where('email', $user->email)->first();
                    if (!$coach || $task->coach_id != $coach->id) {
                        return response()->json([
                            'success' => false,
                            'message' => 'You are not authorized to update this task'
                        ], 403);
                    }
                } else {
                    // Unassigned task - mobile coaches can't update unassigned tasks
                    return response()->json([
                        'success' => false,
                        'message' => 'You are not authorized to update this task'
                    ], 403);
                }
            }
            
            // For other users (admins, CRM staff), verify task belongs to their gym (already checked in query)
            // If task was found, user has permission to update it

            // Store old status to check if it changed to completed
            $oldStatus = $task->status;
            
            // Update task
            $task->update($updateData);
            
            // Refresh task to get updated task_type and relationships
            $task->refresh();
            
            // If status changed to completed, send notifications
            if ($oldStatus !== 'completed' && isset($updateData['status']) && $updateData['status'] === 'completed') {
                try {
                    $performedByUserId = $user->id ?? null;
                    NotificationService::taskCompleted($task, $gym_id, $performedByUserId);
                } catch (\Exception $notificationException) {
                    // Log notification error but don't fail the task update
                    Log::warning('Failed to create notification for task completion', [
                        'task_id' => $task->id,
                        'error' => $notificationException->getMessage()
                    ]);
                }
            }
            
            // Load relationships based on task type
            if ($task->task_type === 'member') {
                $task->load(['member', 'assignedTo', 'user']);
            } else if ($task->task_type === 'coach') {
                $task->load(['coach', 'assignedTo', 'user']);
            } else {
                // Unassigned task - load basic relationships
                $task->load(['assignedTo', 'user']);
            }

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
    public function destroy(Request $request, $id)
    {
        $user = $request->user('api');
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        // Check user role - admins and coaches can delete tasks
        $isAdmin = isset($user->role_id) && $user->role_id == 1;
        $isMobileCoach = isset($user->role_id) && $user->role_id == 3;
        
        // Admins can delete any task in their gym
        // Mobile coaches can delete their own tasks
        // Other users (CRM staff) can delete tasks in their gym
        // No need for strict permission checks since roles/permissions tables were dropped
        
        try {
            $gym_id = $user->gym_id ?? 1;

            // Find task in unified tasks table - task_type is optional now
            $task = Task::where('id', $id)
                ->where('gym_id', $gym_id)
                ->first();

            if (!$task) {
                return response()->json([
                    'success' => false,
                    'message' => 'Task not found'
                ], 404);
            }
            
            // For mobile coaches, verify they can only delete their own tasks
            if ($isMobileCoach) {
                if ($task->coach_id) {
                    // Task is assigned to a coach - verify it's the same coach
                    $coach = Coach::where('email', $user->email)->first();
                    if (!$coach || $task->coach_id != $coach->id) {
                        return response()->json([
                            'success' => false,
                            'message' => 'You are not authorized to delete this task'
                        ], 403);
                    }
                } else {
                    // Unassigned task - mobile coaches can't delete unassigned tasks
                    return response()->json([
                        'success' => false,
                        'message' => 'You are not authorized to delete this task'
                    ], 403);
                }
            }

            // Delete task
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
     * Get tasks for a specific coach (mobile app format)
     */
    public function getCoachTasks(Request $request, $coachId)
    {
        try {
            $user = $request->user('api');
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $gym_id = $user->gym_id ?? 1;
            $status = $request->get('status', 'all');

            // Verify coach belongs to gym
            $coach = Coach::where('id', $coachId)->where('gym_id', $gym_id)->first();
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found'
                ], 404);
            }

            $tasksQuery = Task::where('coach_id', $coachId)
                ->where('gym_id', $gym_id)
                ->where('task_type', 'coach');

            if ($status !== 'all') {
                $tasksQuery->where('status', $status);
            }

            $tasks = $tasksQuery->orderBy('created_at', 'desc')->get();

            return response()->json([
                'success' => true,
                'data' => $tasks
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving tasks: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create a task for a coach (mobile app format - simpler validation)
     */
    public function createCoachTask(Request $request, $coachId)
    {
        try {
            $user = $request->user('api');
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $gym_id = $user->gym_id ?? 1;
            $user_id = $user->id ?? Auth::id() ?? 1;

            // Verify coach belongs to gym
            $coach = Coach::where('id', $coachId)->where('gym_id', $gym_id)->first();
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found'
                ], 404);
            }

            // Mobile app sends simpler format - transform it
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'member_id' => 'nullable|integer|exists:members,id',
                'due_date' => 'nullable|date',
                'priority' => 'nullable|string|in:low,medium,high,urgent,Low,Medium,High,Urgent',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Transform priority to proper case
            $priority = $request->priority ?? 'medium';
            $priority = ucfirst(strtolower($priority));
            if (!in_array($priority, ['Low', 'Medium', 'High', 'Urgent'])) {
                $priority = 'Medium';
            }

            // Create task
            $task = Task::create([
                'gym_id' => $gym_id,
                'user_id' => $user_id,
                'coach_id' => $coachId,
                'member_id' => $request->member_id ?? null,
                'title' => $request->title,
                'description' => $request->description ?? null,
                'category' => 'General', // Default category for mobile tasks
                'priority' => $priority,
                'due_date' => $request->due_date ?? null,
                'status' => 'pending',
                'task_type' => 'coach',
            ]);

            $task->load(['coach', 'member']);

            // Create notifications for task creation
            try {
                NotificationService::taskCreated($task, $gym_id, $user_id);
            } catch (\Exception $notificationException) {
                // Log notification error but don't fail the task creation
                \Log::warning('Failed to create notification for task', [
                    'task_id' => $task->id,
                    'coach_id' => $coachId,
                    'error' => $notificationException->getMessage()
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $task,
                'message' => 'Task created successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating task: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update a coach task (mobile app format)
     */
    public function updateCoachTask(Request $request, $coachId, $taskId)
    {
        try {
            $user = $request->user('api');
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $gym_id = $user->gym_id ?? 1;

            // Verify coach belongs to gym
            $coach = Coach::where('id', $coachId)->where('gym_id', $gym_id)->first();
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found'
                ], 404);
            }

            // Find task
            $task = Task::where('id', $taskId)
                ->where('coach_id', $coachId)
                ->where('gym_id', $gym_id)
                ->where('task_type', 'coach')
                ->first();

            if (!$task) {
                return response()->json([
                    'success' => false,
                    'message' => 'Task not found'
                ], 404);
            }

            // Update task
            $updateData = [];
            if ($request->has('title')) $updateData['title'] = $request->title;
            if ($request->has('description')) $updateData['description'] = $request->description;
            if ($request->has('due_date')) $updateData['due_date'] = $request->due_date;
            if ($request->has('priority')) {
                $priority = ucfirst(strtolower($request->priority));
                if (in_array($priority, ['Low', 'Medium', 'High', 'Urgent'])) {
                    $updateData['priority'] = $priority;
                }
            }
            if ($request->has('status')) {
                $status = strtolower($request->status);
                if (in_array($status, ['pending', 'completed', 'in-progress', 'cancelled'])) {
                    $updateData['status'] = $status;
                }
            }

            $task->update($updateData);
            $task->load(['coach', 'member']);

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
     * Delete a coach task
     */
    public function deleteCoachTask(Request $request, $coachId, $taskId)
    {
        try {
            $user = $request->user('api');
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $gym_id = $user->gym_id ?? 1;

            // Verify coach belongs to gym
            $coach = Coach::where('id', $coachId)->where('gym_id', $gym_id)->first();
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found'
                ], 404);
            }

            // Find and delete task
            $task = Task::where('id', $taskId)
                ->where('coach_id', $coachId)
                ->where('gym_id', $gym_id)
                ->where('task_type', 'coach')
                ->first();

            if (!$task) {
                return response()->json([
                    'success' => false,
                    'message' => 'Task not found'
                ], 404);
            }

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
}

