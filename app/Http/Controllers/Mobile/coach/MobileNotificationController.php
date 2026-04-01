<?php

namespace App\Http\Controllers\Mobile\coach;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\HandlesApiErrors;
use App\Http\Controllers\Traits\ApiResponse;
use App\Models\MobileNotification;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Throwable;


class MobileNotificationController extends Controller
{
    use HandlesApiErrors, ApiResponse;
    /**
     * Get all notifications for the authenticated member
     */
    public function index(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            $query = MobileNotification::forMember($member->id)
                ->active()
                ->orderBy('notification_date', 'desc');

            // Filter by read status
            if ($request->has('is_read')) {
                $isRead = filter_var($request->is_read, FILTER_VALIDATE_BOOLEAN);
                $query->where('is_read', $isRead);
            }

            // Filter by date range
            if ($request->has('start_date')) {
                $query->where('notification_date', '>=', $request->start_date);
            }

            if ($request->has('end_date')) {
                $query->where('notification_date', '<=', $request->end_date);
            }

            // Pagination
            $perPage = $request->get('per_page', 20);
            $notifications = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'message' => 'Notifications retrieved successfully',
                'data' => $notifications
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve notifications',
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
            $member = $request->get('auth_member');
            
            $count = MobileNotification::forMember($member->id)
                ->active()
                ->unread()
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
            $member = $request->get('auth_member');
            
            $notification = MobileNotification::forMember($member->id)
                ->active()
                ->findOrFail($id);

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
            $member = $request->get('auth_member');
            
            $notification = MobileNotification::forMember($member->id)
                ->active()
                ->findOrFail($id);

            $notification->markAsRead();

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
            $member = $request->get('auth_member');
            
            $updated = MobileNotification::forMember($member->id)
                ->active()
                ->unread()
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
            $member = $request->get('auth_member');
            
            $notification = MobileNotification::forMember($member->id)
                ->active()
                ->findOrFail($id);

            $notification->markAsUnread();

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
            $member = $request->get('auth_member');
            
            $notification = MobileNotification::forMember($member->id)
                ->findOrFail($id);

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
     * Get recent notifications (last 7 days)
     */
    public function recent(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            $user = $request->get('auth_user');
            
            // For coaches, we might not have auth_member, so return empty or handle differently
            if (!$member && !$user) {
                return $this->errorResponse('Unauthorized', 401);
            }
            
            if (!$member || !isset($member->id) || empty($member->id)) {
                return $this->successResponse([], 'Recent notifications retrieved successfully');
            }
            
            try {
                $notifications = MobileNotification::forMember($member->id)
                    ->active()
                    ->recent(7)
                    ->orderBy('notification_date', 'desc')
                    ->limit(10)
                    ->get();
            } catch (\Exception $queryException) {
                // If query fails, log and return empty array instead of error
                \Log::warning('Failed to fetch notifications from database', [
                    'member_id' => $member->id,
                    'error' => $queryException->getMessage(),
                ]);
                return $this->successResponse([], 'Recent notifications retrieved successfully');
            }

            return $this->successResponse($notifications, 'Recent notifications retrieved successfully');

        } catch (Throwable $e) {
            // Log the actual error for debugging
            \Log::error('MobileNotificationController@recent error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'member' => isset($member) && $member ? $member->id : null,
                'user' => isset($user) && $user ? $user->id : null,
            ]);
            return $this->handleApiError($e, 'MobileNotificationController@recent');
        }
    }

    /**
     * Get notification statistics for the authenticated member
     */
    public function statistics(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            $total = MobileNotification::forMember($member->id)->active()->count();
            $unread = MobileNotification::forMember($member->id)->active()->unread()->count();
            $read = MobileNotification::forMember($member->id)->active()->where('is_read', true)->count();
            
            // Get notifications by date (last 30 days)
            $dailyStats = MobileNotification::forMember($member->id)
                ->active()
                ->recent(30)
                ->selectRaw('DATE(notification_date) as date, COUNT(*) as count')
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
