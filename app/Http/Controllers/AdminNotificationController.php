<?php

namespace App\Http\Controllers;

use App\Models\AdminNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminNotificationController extends Controller
{
    /**
     * Get the authenticated user type and ID
     * Returns array with 'type' => 'admin'|'member'|'coach' and 'id' => user/member/coach ID
     */
    private function getAuthenticatedUserType(Request $request)
    {
        // Priority 1: Check for member (mobile app) - check auth_member first
        $member = $request->get('auth_member');
        // Verify it's actually a Member model, not a User
        if ($member && $member instanceof \App\Models\Member) {
            return ['type' => 'member', 'id' => $member->id];
        }
        
        // Priority 2: Check for coach (mobile app - coaches use users table with role_id = 3)
        // Check auth_user first (set by mobile.auth middleware)
        $authUser = $request->get('auth_user');
        if ($authUser) {
            // Check if it's a coach by role_id
            if (isset($authUser->role_id) && $authUser->role_id == 3) {
                // For coaches, use user_id directly (coaches are in users table)
                return ['type' => 'coach', 'id' => $authUser->id];
            }
        }
        
        // Priority 3: Check user from request (try multiple methods)
        $user = $request->user('api') ?? Auth::guard('api')->user() ?? Auth::user();
        
        if ($user) {
            // Check if user is a coach (role_id = 3)
            if (isset($user->role_id) && $user->role_id == 3) {
                // For coaches, use user_id directly
                return ['type' => 'coach', 'id' => $user->id];
            }
            
            // Check for admin user (CRM) - role_id = 1 or no role_id
            if (!isset($user->role_id) || $user->role_id == 1) {
                // Admin user (role_id = 1 or not set)
                return ['type' => 'admin', 'id' => $user->id];
            }
        }
        
        return null;
    }

    /**
     * Get all notifications for the authenticated user (admin, member, or coach)
     */
    public function index(Request $request)
    {
        try {
            // Log request for debugging
            if (config('app.debug')) {
                \Log::debug('AdminNotificationController@index: Request received', [
                    'endpoint' => $request->path(),
                    'method' => $request->method(),
                    'has_auth_user' => $request->has('auth_user'),
                    'has_auth_member' => $request->has('auth_member'),
                ]);
            }
            
            $authInfo = $this->getAuthenticatedUserType($request);
            
            if (!$authInfo) {
                // Debug logging to help diagnose authentication issues
                if (config('app.debug')) {
                    \Log::warning('AdminNotificationController@index: Could not identify user type', [
                        'has_auth_user' => $request->has('auth_user'),
                        'has_auth_member' => $request->has('auth_member'),
                        'auth_user_type' => $request->get('auth_user') ? get_class($request->get('auth_user')) : null,
                        'auth_member_type' => $request->get('auth_member') ? get_class($request->get('auth_member')) : null,
                        'request_user_api' => $request->user('api') ? get_class($request->user('api')) : null,
                        'auth_guard_user' => Auth::guard('api')->user() ? get_class(Auth::guard('api')->user()) : null,
                        'auth_user_email' => $request->get('auth_user')?->email ?? null,
                        'auth_user_role_id' => $request->get('auth_user')?->role_id ?? null,
                    ]);
                }
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
            
            // Log authInfo for debugging
            if (config('app.debug')) {
                \Log::debug('AdminNotificationController@index: AuthInfo determined', [
                    'type' => $authInfo['type'] ?? null,
                    'id' => $authInfo['id'] ?? null,
                ]);
            }
            
            // Validate authInfo has required fields
            if (!isset($authInfo['type']) || !isset($authInfo['id']) || $authInfo['id'] === null) {
                \Log::error('AdminNotificationController@index: Invalid authInfo', [
                    'authInfo' => $authInfo,
                    'endpoint' => $request->path(),
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid authentication information',
                    'data' => [
                        'current_page' => 1,
                        'data' => [],
                        'total' => 0,
                        'per_page' => $request->get('per_page', 20),
                        'last_page' => 1,
                    ]
                ], 200); // Return empty list instead of error
            }
            
            // Build query based on user type
            $query = AdminNotification::query();
            
            try {
                if ($authInfo['type'] === 'admin') {
                    $query->forUser($authInfo['id']);
                } elseif ($authInfo['type'] === 'member') {
                    $query->forMember($authInfo['id']);
                } elseif ($authInfo['type'] === 'coach') {
                    $query->forCoach($authInfo['id']);
                } else {
                    \Log::warning('AdminNotificationController@index: Unknown user type', [
                        'type' => $authInfo['type'],
                        'id' => $authInfo['id'],
                    ]);
                    // Return empty list for unknown types
                    return response()->json([
                        'success' => true,
                        'data' => [
                            'current_page' => 1,
                            'data' => [],
                            'total' => 0,
                            'per_page' => $request->get('per_page', 20),
                            'last_page' => 1,
                        ]
                    ]);
                }
            } catch (\Exception $queryException) {
                \Log::error('AdminNotificationController@index: Query error', [
                    'error' => $queryException->getMessage(),
                    'trace' => $queryException->getTraceAsString(),
                    'authInfo' => $authInfo,
                ]);
                // Return empty list instead of error
                return response()->json([
                    'success' => true,
                    'data' => [
                        'current_page' => 1,
                        'data' => [],
                        'total' => 0,
                        'per_page' => $request->get('per_page', 20),
                        'last_page' => 1,
                    ]
                ]);
            }
            
            try {
                $query->orderBy('created_at', 'desc');
                
                // Filter by read status
                if ($request->has('is_read')) {
                    $isRead = filter_var($request->is_read, FILTER_VALIDATE_BOOLEAN);
                    $query->where('is_read', $isRead);
                }
                
                // Filter by type
                if ($request->has('type')) {
                    $query->where('type', $request->type);
                }
                
                // Filter by related_type (e.g., 'message', 'task', 'support', 'note', 'schedule_event')
                if ($request->has('related_type')) {
                    $query->where('related_type', $request->related_type);
                }
                
                // Filter by category/group (messages, tasks, support, notes, schedule, appointments, etc.)
                if ($request->has('category')) {
                    $category = $request->category;
                    $categoryMap = [
                        'messages' => ['message'],
                        'tasks' => ['task'],
                        'support' => ['support'],
                        'notes' => ['note'],
                        'schedule' => ['schedule_event'],
                        'appointments' => ['appointment'],
                        'workouts' => ['workout_assignment'],
                        'nutrition' => ['nutrition_assignment'],
                        'challenges' => ['challenge'],
                        'invoices' => ['invoice'],
                        'coach_assignments' => ['coach_assignment'],
                    ];
                    
                    if (isset($categoryMap[$category])) {
                        $query->whereIn('related_type', $categoryMap[$category]);
                    }
                }
                
                // Pagination - ensure per_page is a valid integer
                $perPage = $request->get('per_page', 20);
                $perPage = is_numeric($perPage) ? (int)$perPage : 20;
                $perPage = max(1, min(100, $perPage)); // Limit between 1 and 100
                
                // Try to paginate, but catch any database errors
                try {
                    // Enable query logging temporarily for debugging
                    if (config('app.debug')) {
                        \DB::enableQueryLog();
                    }
                    
                    $notifications = $query->paginate($perPage);
                    
                    if (config('app.debug')) {
                        $queries = \DB::getQueryLog();
                        \Log::debug('AdminNotificationController@index: Query executed successfully', [
                            'queries' => $queries,
                            'per_page' => $perPage,
                            'total' => $notifications->total(),
                        ]);
                    }
                } catch (\Illuminate\Database\QueryException $dbException) {
                    \Log::error('AdminNotificationController@index: Database query error', [
                        'error' => $dbException->getMessage(),
                        'sql' => $dbException->getSql(),
                        'bindings' => $dbException->getBindings(),
                        'authInfo' => $authInfo,
                        'trace' => $dbException->getTraceAsString(),
                    ]);
                    
                    // Try to get count first to see if it's a column issue
                    try {
                        // Remove orderBy to see if that's the issue
                        $countQuery = AdminNotification::query();
                        if ($authInfo['type'] === 'admin') {
                            $countQuery->forUser($authInfo['id']);
                        } elseif ($authInfo['type'] === 'member') {
                            $countQuery->forMember($authInfo['id']);
                        } elseif ($authInfo['type'] === 'coach') {
                            $countQuery->forCoach($authInfo['id']);
                        }
                        $count = $countQuery->count();
                        \Log::info('AdminNotificationController@index: Query count successful', ['count' => $count]);
                        
                        // If count works, try getting all and manually paginating
                        $allNotifications = $countQuery->orderBy('created_at', 'desc')->get();
                        $page = $request->get('page', 1);
                        $offset = ($page - 1) * $perPage;
                        $paginated = $allNotifications->slice($offset, $perPage)->values();
                        
                        return response()->json([
                            'success' => true,
                            'data' => [
                                'current_page' => (int)$page,
                                'data' => $paginated,
                                'total' => $allNotifications->count(),
                                'per_page' => $perPage,
                                'last_page' => (int)ceil($allNotifications->count() / $perPage),
                                'from' => $offset + 1,
                                'to' => min($offset + $perPage, $allNotifications->count()),
                            ]
                        ]);
                    } catch (\Exception $countException) {
                        \Log::error('AdminNotificationController@index: Count also failed', [
                            'error' => $countException->getMessage(),
                            'trace' => $countException->getTraceAsString(),
                        ]);
                        // Return empty list
                        return response()->json([
                            'success' => true,
                            'data' => [
                                'current_page' => 1,
                                'data' => [],
                                'total' => 0,
                                'per_page' => $perPage,
                                'last_page' => 1,
                            ]
                        ]);
                    }
                } catch (\Exception $paginationException) {
                    \Log::error('AdminNotificationController@index: Pagination exception', [
                        'error' => $paginationException->getMessage(),
                        'trace' => $paginationException->getTraceAsString(),
                        'authInfo' => $authInfo,
                    ]);
                    // Return empty list
                    return response()->json([
                        'success' => true,
                        'data' => [
                            'current_page' => 1,
                            'data' => [],
                            'total' => 0,
                            'per_page' => $perPage,
                            'last_page' => 1,
                        ]
                    ]);
                }
                
                return response()->json([
                    'success' => true,
                    'data' => $notifications
                ]);
            } catch (\Exception $paginationException) {
                \Log::error('AdminNotificationController@index: Pagination error', [
                    'error' => $paginationException->getMessage(),
                    'trace' => $paginationException->getTraceAsString(),
                    'authInfo' => $authInfo,
                ]);
                // Return empty list instead of error
                return response()->json([
                    'success' => true,
                    'data' => [
                        'current_page' => 1,
                        'data' => [],
                        'total' => 0,
                        'per_page' => $request->get('per_page', 20),
                        'last_page' => 1,
                    ]
                ]);
            }
        } catch (\Exception $e) {
            \Log::error('AdminNotificationController@index: Unexpected error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'endpoint' => $request->path(),
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve notifications',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred while retrieving notifications'
            ], 500);
        }
    }
    
    /**
     * Get unread notifications count for the authenticated user (admin, member, or coach)
     */
    public function unreadCount(Request $request)
    {
        try {
            $authInfo = $this->getAuthenticatedUserType($request);
            
            if (!$authInfo) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
            
            $query = AdminNotification::query();
            
            if ($authInfo['type'] === 'admin') {
                $query->forUser($authInfo['id']);
            } elseif ($authInfo['type'] === 'member') {
                $query->forMember($authInfo['id']);
            } elseif ($authInfo['type'] === 'coach') {
                $query->forCoach($authInfo['id']);
            }
            
            $count = $query->unread()->count();
            
            return response()->json([
                'success' => true,
                'count' => $count
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve unread count',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Get recent notifications (10 most recent) for the authenticated user (admin, member, or coach)
     */
    public function recent(Request $request)
    {
        try {
            // FIRST: Check if it's a coach - handle early to prevent any errors
            $authUser = $request->get('auth_user');
            if ($authUser && isset($authUser->role_id) && $authUser->role_id == 3) {
                // It's a coach - use user_id directly (coaches are in users table)
                try {
                    $notifications = AdminNotification::forCoach($authUser->id)
                        ->orderBy('created_at', 'desc')
                        ->limit(10)
                        ->get();
                    
                    return response()->json([
                        'success' => true,
                        'data' => $notifications
                    ], 200);
                } catch (\Exception $e) {
                    // If anything fails for coach, just return empty array
                    \Log::warning('AdminNotificationController@recent: Error fetching coach notifications', [
                        'user_id' => $authUser->id ?? 'unknown',
                        'error' => $e->getMessage()
                    ]);
                    
                    return response()->json([
                        'success' => true,
                        'data' => []
                    ], 200);
                }
            }
            
            // For non-coaches, use normal flow
            $authInfo = $this->getAuthenticatedUserType($request);
            
            if (!$authInfo) {
                // Debug logging to help diagnose authentication issues
                if (config('app.debug')) {
                    \Log::warning('AdminNotificationController@recent: Could not identify user type', [
                        'has_auth_user' => $request->has('auth_user'),
                        'has_auth_member' => $request->has('auth_member'),
                        'auth_user_type' => $request->get('auth_user') ? get_class($request->get('auth_user')) : null,
                        'auth_member_type' => $request->get('auth_member') ? get_class($request->get('auth_member')) : null,
                        'request_user_api' => $request->user('api') ? get_class($request->user('api')) : null,
                        'auth_guard_user' => Auth::guard('api')->user() ? get_class(Auth::guard('api')->user()) : null,
                        'auth_user_email' => $request->get('auth_user')?->email ?? null,
                        'auth_user_role_id' => $request->get('auth_user')?->role_id ?? null,
                    ]);
                }
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
            
            $query = AdminNotification::query();
            
            if ($authInfo['type'] === 'admin') {
                $query->forUser($authInfo['id']);
            } elseif ($authInfo['type'] === 'member') {
                $query->forMember($authInfo['id']);
            } elseif ($authInfo['type'] === 'coach') {
                // For coaches, authInfo['id'] is the user_id from users table
                // If user ID is null, return empty array
                if ($authInfo['id'] === null) {
                    return response()->json([
                        'success' => true,
                        'data' => []
                    ], 200);
                }
                $query->forCoach($authInfo['id']); // This uses user_id now
            }
            
            $notifications = $query->orderBy('created_at', 'desc')
                ->limit(10)
                ->get();
            
            return response()->json([
                'success' => true,
                'data' => $notifications
            ]);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('AdminNotificationController@recent error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'auth_user' => $request->get('auth_user')?->id ?? null,
                'auth_member' => $request->get('auth_member')?->id ?? null,
            ]);
            
            // For coaches, return empty array instead of error to prevent dashboard crashes
            $authUser = $request->get('auth_user');
            if ($authUser && isset($authUser->role_id) && $authUser->role_id == 3) {
                return response()->json([
                    'success' => true,
                    'data' => []
                ], 200);
            }
            
            return response()->json([
                'success' => false,
                'message' => config('app.debug') ? $e->getMessage() : 'Failed to retrieve recent notifications'
            ], 500);
        }
    }
    
    /**
     * Get a single notification and auto-mark as read (for admin, member, or coach)
     */
    public function show(Request $request, $id)
    {
        try {
            $authInfo = $this->getAuthenticatedUserType($request);
            
            if (!$authInfo) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
            
            $query = AdminNotification::query();
            
            if ($authInfo['type'] === 'admin') {
                $query->forUser($authInfo['id']);
            } elseif ($authInfo['type'] === 'member') {
                $query->forMember($authInfo['id']);
            } elseif ($authInfo['type'] === 'coach') {
                $query->forCoach($authInfo['id']);
            }
            
            $notification = $query->with(['user', 'member', 'coach'])->findOrFail($id);
            
            // Auto-mark as read when viewing
            if (!$notification->is_read) {
                $notification->markAsRead();
            }
            
            return response()->json([
                'success' => true,
                'data' => $notification
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve notification',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Mark a notification as read (for admin, member, or coach)
     */
    public function markAsRead(Request $request, $id)
    {
        try {
            $authInfo = $this->getAuthenticatedUserType($request);
            
            if (!$authInfo) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
            
            $query = AdminNotification::query();
            
            if ($authInfo['type'] === 'admin') {
                $query->forUser($authInfo['id']);
            } elseif ($authInfo['type'] === 'member') {
                $query->forMember($authInfo['id']);
            } elseif ($authInfo['type'] === 'coach') {
                $query->forCoach($authInfo['id']);
            }
            
            $notification = $query->findOrFail($id);
            $notification->markAsRead();
            
            // Refresh the notification to get updated values
            $notification->refresh();
            
            return response()->json([
                'success' => true,
                'message' => 'Notification marked as read',
                'data' => $notification
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to mark notification as read',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Mark all notifications as read for the authenticated user (admin, member, or coach)
     */
    public function markAllAsRead(Request $request)
    {
        try {
            $authInfo = $this->getAuthenticatedUserType($request);
            
            if (!$authInfo) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
            
            $query = AdminNotification::query();
            
            if ($authInfo['type'] === 'admin') {
                $query->forUser($authInfo['id']);
            } elseif ($authInfo['type'] === 'member') {
                $query->forMember($authInfo['id']);
            } elseif ($authInfo['type'] === 'coach') {
                $query->forCoach($authInfo['id']);
            }
            
            $query->unread()->update([
                'is_read' => true,
                'read_at' => now(),
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'All notifications marked as read'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to mark all notifications as read',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Delete a notification (for admin, member, or coach)
     */
    public function destroy(Request $request, $id)
    {
        try {
            $authInfo = $this->getAuthenticatedUserType($request);
            
            if (!$authInfo) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
            
            $query = AdminNotification::query();
            
            if ($authInfo['type'] === 'admin') {
                $query->forUser($authInfo['id']);
            } elseif ($authInfo['type'] === 'member') {
                $query->forMember($authInfo['id']);
            } elseif ($authInfo['type'] === 'coach') {
                $query->forCoach($authInfo['id']);
            }
            
            $notification = $query->findOrFail($id);
            $notification->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Notification deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete notification',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Get notification statistics grouped by type for the authenticated user
     * Returns counts for each notification type and category
     */
    public function statistics(Request $request)
    {
        try {
            $authInfo = $this->getAuthenticatedUserType($request);
            
            if (!$authInfo) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
            
            $query = AdminNotification::query();
            
            if ($authInfo['type'] === 'admin') {
                $query->forUser($authInfo['id']);
            } elseif ($authInfo['type'] === 'member') {
                $query->forMember($authInfo['id']);
            } elseif ($authInfo['type'] === 'coach') {
                $query->forCoach($authInfo['id']);
            }
            
            // Get total counts
            $total = $query->count();
            $unread = (clone $query)->unread()->count();
            $read = $total - $unread;
            
            // Get counts by type
            $byType = (clone $query)
                ->selectRaw('type, COUNT(*) as count')
                ->groupBy('type')
                ->pluck('count', 'type')
                ->toArray();
            
            // Get counts by related_type (category)
            $byCategory = (clone $query)
                ->selectRaw('related_type, COUNT(*) as count')
                ->whereNotNull('related_type')
                ->groupBy('related_type')
                ->pluck('count', 'related_type')
                ->toArray();
            
            // Get unread counts by category
            $unreadByCategory = (clone $query)
                ->unread()
                ->selectRaw('related_type, COUNT(*) as count')
                ->whereNotNull('related_type')
                ->groupBy('related_type')
                ->pluck('count', 'related_type')
                ->toArray();
            
            // Group by feature categories
            $categoryGroups = [
                'messages' => ['message'],
                'tasks' => ['task'],
                'support' => ['support'],
                'notes' => ['note'],
                'schedule' => ['schedule_event'],
                'appointments' => ['appointment'],
                'workouts' => ['workout_assignment'],
                'nutrition' => ['nutrition_assignment'],
                'challenges' => ['challenge'],
                'invoices' => ['invoice'],
                'coach_assignments' => ['coach_assignment'],
            ];
            
            $byFeatureCategory = [];
            foreach ($categoryGroups as $categoryName => $relatedTypes) {
                $count = (clone $query)
                    ->whereIn('related_type', $relatedTypes)
                    ->count();
                if ($count > 0) {
                    $byFeatureCategory[$categoryName] = $count;
                }
            }
            
            // Get unread counts by feature category
            $unreadByFeatureCategory = [];
            foreach ($categoryGroups as $categoryName => $relatedTypes) {
                $count = (clone $query)
                    ->unread()
                    ->whereIn('related_type', $relatedTypes)
                    ->count();
                if ($count > 0) {
                    $unreadByFeatureCategory[$categoryName] = $count;
                }
            }
            
            return response()->json([
                'success' => true,
                'data' => [
                    'total' => $total,
                    'unread' => $unread,
                    'read' => $read,
                    'by_type' => $byType,
                    'by_category' => $byCategory,
                    'unread_by_category' => $unreadByCategory,
                    'by_feature_category' => $byFeatureCategory,
                    'unread_by_feature_category' => $unreadByFeatureCategory,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve notification statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Get notifications grouped by category/feature
     * Returns notifications organized by feature area (messages, tasks, support, etc.)
     */
    public function byCategory(Request $request)
    {
        try {
            $authInfo = $this->getAuthenticatedUserType($request);
            
            if (!$authInfo) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
            
            $category = $request->get('category', 'all'); // 'all', 'messages', 'tasks', 'support', etc.
            
            $query = AdminNotification::query();
            
            if ($authInfo['type'] === 'admin') {
                $query->forUser($authInfo['id']);
            } elseif ($authInfo['type'] === 'member') {
                $query->forMember($authInfo['id']);
            } elseif ($authInfo['type'] === 'coach') {
                $query->forCoach($authInfo['id']);
            }
            
            // Apply category filter
            if ($category !== 'all') {
                $categoryMap = [
                    'messages' => ['message'],
                    'tasks' => ['task'],
                    'support' => ['support'],
                    'notes' => ['note'],
                    'schedule' => ['schedule_event'],
                    'appointments' => ['appointment'],
                    'workouts' => ['workout_assignment'],
                    'nutrition' => ['nutrition_assignment'],
                    'challenges' => ['challenge'],
                    'invoices' => ['invoice'],
                    'coach_assignments' => ['coach_assignment'],
                ];
                
                if (isset($categoryMap[$category])) {
                    $query->whereIn('related_type', $categoryMap[$category]);
                }
            }
            
            // Filter by read status if provided
            if ($request->has('is_read')) {
                $isRead = filter_var($request->is_read, FILTER_VALIDATE_BOOLEAN);
                $query->where('is_read', $isRead);
            }
            
            $query->orderBy('created_at', 'desc');
            
            $perPage = $request->get('per_page', 20);
            $perPage = is_numeric($perPage) ? (int)$perPage : 20;
            $perPage = max(1, min(100, $perPage));
            
            $notifications = $query->paginate($perPage);
            
            return response()->json([
                'success' => true,
                'data' => $notifications,
                'category' => $category
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve notifications by category',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}