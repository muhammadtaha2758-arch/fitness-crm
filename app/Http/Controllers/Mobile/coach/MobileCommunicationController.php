<?php

namespace App\Http\Controllers\Mobile\coach;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\HandlesApiErrors;
use App\Models\Member;
use App\Models\Group;
use App\Models\Message;
use App\Models\MemberMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Throwable;

class MobileCommunicationController extends Controller
{
    use HandlesApiErrors;
    /**
     * Get all groups for the authenticated coach
     */
    public function getGroups(Request $request)
    {
        try {
            // Get the authenticated user (coach) from the request
            $user = $request->user('api') ?? $request->get('auth_user') ?? auth()->user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access',
                    'status' => false,
                ], 401);
            }

            // Get gym_id from user
            $gymId = $user->gym_id ?? 1;

            // Build select array with only columns that exist
            $selectColumns = ['id', 'name', 'description'];
            
            // Add optional columns if they exist
            if (Schema::hasColumn('community_groups', 'created_at')) {
                $selectColumns[] = 'created_at';
            }
            if (Schema::hasColumn('community_groups', 'updated_at')) {
                $selectColumns[] = 'updated_at';
            }
            if (Schema::hasColumn('community_groups', 'status')) {
                $selectColumns[] = 'status';
            }

            // Get all groups for this gym
            // Coaches can see all groups in their gym (not just groups they're members of)
            $groupsQuery = Group::where('gym_id', $gymId);
            
            // Only filter by status if the column exists
            if (Schema::hasColumn('community_groups', 'status')) {
                $groupsQuery->where('status', 'active');
            }
            
            // Order by updated_at if it exists, otherwise by created_at, otherwise by id
            if (Schema::hasColumn('community_groups', 'updated_at')) {
                $groupsQuery->orderBy('updated_at', 'desc');
            } elseif (Schema::hasColumn('community_groups', 'created_at')) {
                $groupsQuery->orderBy('created_at', 'desc');
            } else {
                $groupsQuery->orderBy('id', 'desc');
            }
            
            // Add message count using membermessages if group_id column exists
            $groupsQuery->select($selectColumns);
            if (\Illuminate\Support\Facades\Schema::hasColumn('membermessages', 'group_id')) {
                $groupsQuery->withCount([
                    'messages' => function($query) {
                        $query->where('group_id', '!=', null);
                    }
                ]);
            } else {
                $groupsQuery->withCount(['messages']);
            }
            
            $groups = $groupsQuery->get()
                ->map(function($group) {
                    // Get message count from membermessages if group_id column exists
                    $messageCount = 0;
                    if (\Illuminate\Support\Facades\Schema::hasColumn('membermessages', 'group_id')) {
                        $messageCount = \App\Models\MemberMessage::where('group_id', $group->id)->count();
                    } elseif (isset($group->messages_count)) {
                        $messageCount = $group->messages_count;
                    }
                    
                    $groupData = [
                        'id' => $group->id,
                        'name' => $group->name,
                        'description' => $group->description,
                        'avatar' => null, // Avatar column doesn't exist in database
                        'message_count' => $messageCount,
                    ];
                    
                    // Add optional fields if they exist
                    if (Schema::hasColumn('community_groups', 'created_at') && isset($group->created_at)) {
                        $groupData['created_at'] = $group->created_at;
                    }
                    if (Schema::hasColumn('community_groups', 'updated_at') && isset($group->updated_at)) {
                        $groupData['updated_at'] = $group->updated_at;
                    }
                    if (Schema::hasColumn('community_groups', 'status') && isset($group->status)) {
                        $groupData['status'] = $group->status;
                    }
                    
                    return $groupData;
                });

            return response()->json([
                'success' => true,
                'message' => 'Groups retrieved successfully',
                'data' => [
                    'groups' => $groups,
                    'total_count' => $groups->count()
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving groups: ' . $e->getMessage(),
                'status' => false,
            ], 500);
        }
    }

    /**
     * Get group details including members and recent messages
     */
    public function getGroupDetails(Request $request, $groupId)
    {
        try {
            // Get the authenticated member from the request
            $member = $this->getAuthenticatedMember($request);
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access',
                    'status' => false,
                ], 401);
            }

            // Get group details
            $group = Group::find($groupId);

            if (!$group) {
                return response()->json([
                    'success' => false,
                    'message' => 'Group not found',
                    'status' => false,
                ], 404);
            }

            // Load messages from membermessages if group_id column exists
            if (\Illuminate\Support\Facades\Schema::hasColumn('membermessages', 'group_id')) {
                $group->load(['messages' => function($query) {
                    $query->orderBy('sent_date', 'desc')->orderBy('created_at', 'desc')->limit(50);
                }]);
            } else {
                $group->load(['messages' => function($query) {
                    $query->orderBy('created_at', 'desc')->limit(50);
                }]);
            }

            // group_members table removed - no member list per group
            $members = collect([]);

            // Get recent messages - handle both membermessages and Message structures
            $messages = collect($group->messages ?? [])->map(function($message) {
                return [
                    'id' => $message->id,
                    'content' => $message->message_text ?? $message->message ?? '',
                    'sender_id' => $message->sender_member_id ?? $message->sender_id ?? null,
                    'sender_type' => $message->sender_type ?? 'Member',
                    'created_at' => $message->created_at ?? $message->sent_date ?? now(),
                    'updated_at' => $message->updated_at ?? $message->sent_date ?? now()
                ];
            });

            return response()->json([
                'success' => true,
                'message' => 'Group details retrieved successfully',
                'data' => [
                    'group' => [
                        'id' => $group->id,
                        'name' => $group->name,
                        'description' => $group->description,
                        'avatar' => null, // Avatar column doesn't exist in database
                        'status' => Schema::hasColumn('community_groups', 'status') ? ($group->status ?? null) : null,
                        'created_at' => Schema::hasColumn('community_groups', 'created_at') ? ($group->created_at ?? null) : null,
                        'updated_at' => Schema::hasColumn('community_groups', 'updated_at') ? ($group->updated_at ?? null) : null,
                    ],
                    'members' => $members,
                    'messages' => $messages,
                    'member_count' => $members->count(),
                    'message_count' => $messages->count()
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving group details: ' . $e->getMessage(),
                'status' => false,
            ], 500);
        }
    }

    /**
     * Get chat history for a specific group
     */
    public function getGroupChatHistory(Request $request, $groupId)
    {
        try {
            // Get the authenticated member from the request
            $member = $this->getAuthenticatedMember($request);
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access',
                    'status' => false,
                ], 401);
            }

            $group = Group::find($groupId);
            if (!$group) {
                return response()->json([
                    'success' => false,
                    'message' => 'Group not found',
                    'status' => false,
                ], 404);
            }

            $limit = $request->get('limit', 50);
            $offset = $request->get('offset', 0);

            // Get messages for the group - use membermessages if group_id column exists
            if (\Illuminate\Support\Facades\Schema::hasColumn('membermessages', 'group_id')) {
                $messages = \App\Models\MemberMessage::where('group_id', $groupId)
                    ->orderBy('sent_date', 'desc')
                    ->orderBy('created_at', 'desc')
                    ->offset($offset)
                    ->limit($limit)
                    ->get()
                    ->map(function($message) {
                        return [
                            'id' => $message->id,
                            'content' => $message->message_text ?? '',
                            'sender_id' => $message->sender_member_id ?? null,
                            'sender_type' => 'Member',
                            'created_at' => $message->created_at ?? $message->sent_date ?? now(),
                            'updated_at' => $message->updated_at ?? $message->sent_date ?? now()
                        ];
                    });
            } else {
                $messages = Message::where('group_id', $groupId)
                    ->orderBy('created_at', 'desc')
                    ->offset($offset)
                    ->limit($limit)
                    ->get()
                    ->map(function($message) {
                        return [
                            'id' => $message->id,
                            'content' => $message->message,
                            'sender_id' => $message->sender_id,
                            'sender_type' => $message->sender_type,
                            'created_at' => $message->created_at,
                            'updated_at' => $message->updated_at
                        ];
                    });
            }

            return response()->json([
                'success' => true,
                'message' => 'Chat history retrieved successfully',
                'data' => [
                    'messages' => $messages,
                    'total_count' => $messages->count(),
                    'has_more' => $messages->count() >= $limit
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving chat history: ' . $e->getMessage(),
                'status' => false,
            ], 500);
        }
    }

    /**
     * Send a message to a group
     */
    public function sendGroupMessage(Request $request, $groupId)
    {
        try {
            // Get the authenticated member from the request
            $member = $this->getAuthenticatedMember($request);
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access',
                    'status' => false,
                ], 401);
            }

            $group = Group::find($groupId);
            if (!$group) {
                return response()->json([
                    'success' => false,
                    'message' => 'Group not found',
                    'status' => false,
                ], 404);
            }

            // Validate request
            $request->validate([
                'content' => 'required|string|max:1000',
            ]);

            // Create the message - use membermessages if group_id column exists
            if (\Illuminate\Support\Facades\Schema::hasColumn('membermessages', 'group_id')) {
                $message = \App\Models\MemberMessage::create([
                    'group_id' => $groupId,
                    'sender_member_id' => $member->id,
                    'message_text' => $request->content,
                    'gym_id' => $member->gym_id ?? null,
                    'sent_date' => now()
                ]);
            } else {
                $message = Message::create([
                    'group_id' => $groupId,
                    'sender_id' => $member->id,
                    'sender_type' => 'Member',
                    'message' => $request->content
                ]);
            }

            // Update group's updated_at timestamp
            Group::where('id', $groupId)->update(['updated_at' => now()]);

            return response()->json([
                'success' => true,
                'message' => 'Message sent successfully',
                'data' => [
                    'message' => [
                        'id' => $message->id,
                        'content' => $message->message_text ?? $message->message ?? '',
                        'sender_id' => $message->sender_member_id ?? $message->sender_id ?? null,
                        'sender_type' => $message->sender_type ?? 'Member',
                        'created_at' => $message->created_at ?? $message->sent_date ?? now(),
                        'updated_at' => $message->updated_at ?? $message->sent_date ?? now()
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error sending message: ' . $e->getMessage(),
                'status' => false,
            ], 500);
        }
    }

    /**
     * Get unread message count for groups
     */
    public function getUnreadCount(Request $request)
    {
        try {
            // Get the authenticated member from the request
            $member = $this->getAuthenticatedMember($request);
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access',
                    'status' => false,
                ], 401);
            }

            // group_members table removed - no per-member group list; return empty unread counts
            $unreadCounts = [];
            $totalUnread = 0;

            return response()->json([
                'success' => true,
                'message' => 'Unread count retrieved successfully',
                'data' => [
                    'unread_counts' => $unreadCounts,
                    'total_unread' => $totalUnread
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving unread count: ' . $e->getMessage(),
                'status' => false,
            ], 500);
        }
    }

    /**
     * Helper method to get authenticated member from request
     */
    private function getAuthenticatedMember(Request $request)
    {
        return $request->get('auth_member');
    }
}
