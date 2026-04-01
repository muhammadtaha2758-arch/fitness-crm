<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\AdminNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


class MobileNotificationController extends Controller
{
    /**
     * Get all notifications for the authenticated member
     */
    public function index(Request $request)
    {
        try {
            $user = $request->get('auth_member'); // or auth()->user()
    
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }
    
            // Inbox is always based on user_id (receiver)
            $userId = $user->id;
    
            $query = AdminNotification::query()
                ->where('user_id', $userId);
    
            // Filter by read/unread
            if ($request->filled('is_read')) {
                $isRead = filter_var($request->is_read, FILTER_VALIDATE_BOOLEAN);
                $query->where('is_read', $isRead);
            }
    
            // Filter by start_date
            if ($request->filled('start_date')) {
                $query->whereDate('created_at', '>=', $request->start_date);
            }
    
            // Filter by end_date
            if ($request->filled('end_date')) {
                $query->whereDate('created_at', '<=', $request->end_date);
            }
    
            // Order newest first
            $query->orderBy('created_at', 'desc');
    
            // Pagination
            $perPage = $request->get('per_page', 20);
            $notifications = $query->paginate($perPage);
    
            return response()->json([
                'success' => true,
                'message' => $user,
                'data' => $notifications
            ]);
    
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $user,
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    
    

    /**
     * Get unread notifications count for the authenticated member
     */
    public function unreadCount(Request $request)
    {
        try {
            $user = $request->get('auth_member');
    
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }
    
            // Count unread notifications for this user (consistent with index method)
            $count = DB::table('admin_notifications')
                ->where('user_id', $user->id)
                ->where('is_read', false)
                ->count();
    
            return response()->json([
                'success' => true,
                'message' => 'Unread count retrieved successfully',
                'data' => [
                    'unread_count' => $count
                ]
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
     * Get a specific notification
     */
    public function show(Request $request, $id)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }
            
            $notification = DB::table('admin_notifications')
                ->where('id', $id)
                ->where('user_id', $user->id)
                ->first();

            if (!$notification) {
                return response()->json([
                    'success' => false,
                    'message' => 'Notification not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Notification retrieved successfully',
                'data' => $notification
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Notification not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Mark a notification as read
     */
    public function markAsRead(Request $request, $id)
    {
        try {
            $user = $request->get('auth_member');
    
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }
    
            // Find notification for this user (consistent with index method)
            $notification = AdminNotification::where('id', $id)
                ->where('user_id', $user->id)
                ->first();
    
            if (!$notification) {
                return response()->json([
                    'success' => false,
                    'message' => 'Notification not found'
                ], 404);
            }
    
            // Mark as read if not already read
            if (!$notification->is_read) {
                $notification->update([
                    'is_read' => true,
                    'read_at' => now()
                ]);
            }
    
            return response()->json([
                'success' => true,
                'message' => 'Notification marked as read successfully',
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
     * Mark all notifications as read for the authenticated member
     */
    public function markAllAsRead(Request $request)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }
            
            $updated = DB::table('admin_notifications')
                ->where('user_id', $user->id)
                ->where('is_read', false)
                ->update(['is_read' => true]);

            return response()->json([
                'success' => true,
                'message' => 'All notifications marked as read successfully',
                'data' => [
                    'updated_count' => $updated
                ]
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
     * Mark a notification as unread
     */
    public function markAsUnread(Request $request, $id)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }
            
            $updated = DB::table('admin_notifications')
                ->where('id', $id)
                ->where('user_id', $user->id)
                ->update(['is_read' => false]);

            if (!$updated) {
                return response()->json([
                    'success' => false,
                    'message' => 'Notification not found'
                ], 404);
            }

            $notification = DB::table('admin_notifications')
                ->where('id', $id)
                ->first();

            return response()->json([
                'success' => true,
                'message' => 'Notification marked as unread successfully',
                'data' => $notification
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to mark notification as unread',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a notification
     */
    public function destroy(Request $request, $id)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }
            
            $deleted = DB::table('admin_notifications')
                ->where('id', $id)
                ->where('user_id', $user->id)
                ->delete();

            if (!$deleted) {
                return response()->json([
                    'success' => false,
                    'message' => 'Notification not found'
                ], 404);
            }

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
     * Get recent notifications (last 7 days)
     */
    public function recent(Request $request)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }
            
            $notifications = DB::table('admin_notifications')
                ->where('user_id', $user->id)
                ->where('created_at', '>=', now()->subDays(7))
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Recent notifications retrieved successfully',
                'data' => $notifications
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve recent notifications',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get notification statistics for the authenticated member
     */
    public function statistics(Request $request)
    {
        try {
            $user = $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }
            
            $total = DB::table('admin_notifications')
                ->where('user_id', $user->id)
                ->count();
            
            $unread = DB::table('admin_notifications')
                ->where('user_id', $user->id)
                ->where('is_read', false)
                ->count();
            
            $read = DB::table('admin_notifications')
                ->where('user_id', $user->id)
                ->where('is_read', true)
                ->count();
            
            // Get notifications by date (last 30 days)
            $dailyStats = DB::table('admin_notifications')
                ->where('user_id', $user->id)
                ->where('created_at', '>=', now()->subDays(30))
                ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
                ->groupBy('date')
                ->orderBy('date', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Notification statistics retrieved successfully',
                'data' => [
                    'total' => $total,
                    'unread' => $unread,
                    'read' => $read,
                    'daily_stats' => $dailyStats
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
     * Create a new notification (for admin/coach use)
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'member_id' => 'required|exists:members,id',
                'icon' => 'nullable|string|max:255',
                'title' => 'required|string|max:255',
                'subtitle' => 'nullable|string|max:255',
                'description' => 'required|string',
                'notification_date' => 'nullable|date',
                'is_active' => 'boolean'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $member = $request->get('auth_member');
            
            $notification = MobileNotification::create([
                'gym_id' => $member->gym_id,
                'member_id' => $request->member_id,
                'icon' => $request->icon,
                'title' => $request->title,
                'subtitle' => $request->subtitle,
                'description' => $request->description,
                'notification_date' => $request->notification_date ?? now(),
                'is_read' => false,
                'is_active' => $request->get('is_active', true)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Notification created successfully',
                'data' => $notification
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create notification',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update a notification
     */
    public function update(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'icon' => 'nullable|string|max:255',
                'title' => 'nullable|string|max:255',
                'subtitle' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'notification_date' => 'nullable|date',
                'is_active' => 'boolean'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $member = $request->get('auth_member');
            
            $notification = MobileNotification::forMember($member->id)
                ->findOrFail($id);

            $notification->update($request->only([
                'icon', 'title', 'subtitle', 'description', 
                'notification_date', 'is_active'
            ]));

            return response()->json([
                'success' => true,
                'message' => 'Notification updated successfully',
                'data' => $notification
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update notification',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
