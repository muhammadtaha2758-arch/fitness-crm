<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\MemberMessage;
use App\Models\Member;
use App\Models\User;
use App\Models\Coach;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class MobileChatController extends Controller
{
    /**
     * Get all conversations for the authenticated member
     * Returns list of people (admins/coaches) the member has chatted with
     */
    public function getConversations(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Get member record
            $memberRecord = Member::where('email', $member->email)->first();
            
            if (!$memberRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Get all unique conversations where member is involved
            // Using MemberMessage model where:
            // - sender_member_id = member/admin who sent (0 if coach sent)
            // - sender_coach_id = coach who sent (null if admin/member sent)
            // - receiver_member_id = member who received
            // We'll identify conversations by unique sender IDs (admin or coach) where member has sent or received messages
            
            // Get conversations where member sent messages
            // Check both receiver_member_id (for admins) and receiver_coach_id (for coaches)
            $sentToAdmins = MemberMessage::where('sender_member_id', $memberRecord->id)
                ->whereNotNull('receiver_member_id')
                ->where('receiver_member_id', '!=', 0)
                ->select('receiver_member_id', DB::raw('MAX(sent_date) as last_message_at'))
                ->groupBy('receiver_member_id')
                ->get();
            
            $sentToCoaches = MemberMessage::where('sender_member_id', $memberRecord->id)
                ->whereNotNull('receiver_coach_id')
                ->where('receiver_coach_id', '!=', 0)
                ->select('receiver_coach_id as receiver_member_id', DB::raw('MAX(sent_date) as last_message_at'))
                ->groupBy('receiver_coach_id')
                ->get();
            
            // Get conversations where member received messages
            // Check both sender_member_id (for admins) and sender_coach_id (for coaches)
            $receivedFromAdmins = MemberMessage::where('receiver_member_id', $memberRecord->id)
                ->whereNotNull('sender_member_id')
                ->where('sender_member_id', '!=', 0)
                ->select('sender_member_id as receiver_id', 'sender_member_id as receiver_member_id', DB::raw('MAX(sent_date) as last_message_at'), DB::raw("'admin' as sender_type"))
                ->groupBy('sender_member_id')
                ->get();
            
            $receivedFromCoaches = MemberMessage::where('receiver_member_id', $memberRecord->id)
                ->whereNotNull('sender_coach_id')
                ->where('sender_coach_id', '!=', 0)
                ->select('sender_coach_id as receiver_id', 'sender_coach_id as receiver_member_id', DB::raw('MAX(sent_date) as last_message_at'), DB::raw("'coach' as sender_type"))
                ->groupBy('sender_coach_id')
                ->get();
            
            // Combine all receiver IDs from sent conversations, admin conversations, and coach conversations
            $allReceiverIds = $sentToAdmins->pluck('receiver_member_id')
                ->merge($sentToCoaches->pluck('receiver_member_id'))
                ->merge($receivedFromAdmins->pluck('receiver_member_id'))
                ->merge($receivedFromCoaches->pluck('receiver_member_id'))
                ->filter(function($id) {
                    return $id !== null && $id !== '';
                })
                ->unique()
                ->values();
            
            // Create a map to track sender/receiver types
            $senderTypeMap = [];
            foreach ($sentToAdmins as $conv) {
                $senderTypeMap[$conv->receiver_member_id] = 'admin';
            }
            foreach ($sentToCoaches as $conv) {
                $senderTypeMap[$conv->receiver_member_id] = 'coach';
            }
            foreach ($receivedFromAdmins as $conv) {
                $senderTypeMap[$conv->receiver_member_id] = 'admin';
            }
            foreach ($receivedFromCoaches as $conv) {
                $senderTypeMap[$conv->receiver_member_id] = 'coach';
            }

            $conversationList = [];
            
            foreach ($allReceiverIds as $receiverId) {
                // Skip only if null or empty string (0 is a valid ID)
                if ($receiverId === null || $receiverId === '') {
                    continue;
                }
                
                $admin = null;
                $trainer = null;
                $otherParty = null;
                $otherPartyName = 'Unknown';
                $otherPartyAvatar = null;
                $recipientType = null;

                // Check if we know the sender type from our map (for received messages)
                $knownSenderType = $senderTypeMap[$receiverId] ?? null;
                
                // Try to find based on known sender type first
                if ($knownSenderType === 'coach') {
                    $trainer = Coach::where('id', $receiverId)->first();
                } elseif ($knownSenderType === 'admin') {
                    $admin = User::where('id', $receiverId)->first();
                } else {
                    // If unknown, try both (for sent messages where receiver_member_id could be either)
                    $trainer = Coach::where('id', $receiverId)->first();
                    $admin = User::where('id', $receiverId)->first();
                }
                
                // Prioritize Coach if both exist (shouldn't happen, but just in case)
                if ($trainer) {
                    $otherParty = $trainer;
                    $otherPartyName = trim(($trainer->first_name ?? '') . ' ' . ($trainer->last_name ?? ''));
                    $otherPartyAvatar = $trainer->profile_image ? asset('storage/' . $trainer->profile_image) : null;
                    $recipientType = 'Trainer';
                } elseif ($admin) {
                    $otherParty = $admin;
                    $otherPartyName = trim(($admin->firstname ?? '') . ' ' . ($admin->lastname ?? ''));
                    $otherPartyAvatar = $admin->avatar ? asset('storage/' . $admin->avatar) : null;
                    $recipientType = 'Admin';
                }

                // Skip if not an admin or trainer (might be another member)
                if (!$otherParty || !$recipientType) {
                    continue;
                }

                // Get last message in this conversation
                // Check both sender_member_id (for admins) and sender_coach_id (for coaches)
                // Also check receiver_member_id (for admins) and receiver_coach_id (for coaches)
                $lastMessage = MemberMessage::where(function($query) use ($memberRecord, $receiverId, $recipientType) {
                    $query->where(function($q) use ($memberRecord, $receiverId, $recipientType) {
                        // Member sent to this receiver
                        if ($recipientType === 'Trainer') {
                            // Member sent to coach - check receiver_coach_id
                            $q->where('sender_member_id', $memberRecord->id)
                              ->where('receiver_coach_id', $receiverId);
                        } else {
                            // Member sent to admin - check receiver_member_id
                            $q->where('sender_member_id', $memberRecord->id)
                              ->where('receiver_member_id', $receiverId);
                        }
                    })->orWhere(function($q) use ($memberRecord, $receiverId, $recipientType) {
                        // Receiver sent to member
                        if ($recipientType === 'Trainer') {
                            // Coach sent to member - check sender_coach_id
                            $q->where('sender_coach_id', $receiverId)
                              ->where('receiver_member_id', $memberRecord->id);
                        } else {
                            // Admin sent to member - check sender_member_id
                            $q->where('sender_member_id', $receiverId)
                              ->where('receiver_member_id', $memberRecord->id);
                        }
                    });
                })
                ->orderBy('sent_date', 'desc')
                ->first();

                // Count unread messages (messages from receiver to member)
                // Note: MemberMessage doesn't have a 'seen' field, so we'll need to add it or use a different approach
                // For now, we'll set unread_count to 0 or implement seen tracking separately
                $unreadCount = 0; // TODO: Implement seen tracking for MemberMessage

                $conversationList[] = [
                    'id' => $receiverId . '_' . $recipientType, // Unique conversation ID
                    'recipient_id' => $receiverId,
                    'recipient_type' => $recipientType,
                    'name' => $otherPartyName ?: 'Unknown',
                    'avatar' => $otherPartyAvatar,
                    'last_message' => $lastMessage ? $lastMessage->message_text : null,
                    'last_message_time' => $lastMessage ? Carbon::parse($lastMessage->sent_date)->format('Y-m-d H:i:s') : null,
                    'last_message_time_ago' => $lastMessage ? Carbon::parse($lastMessage->sent_date)->diffForHumans() : null,
                    'unread_count' => $unreadCount,
                ];
            }
            
            // Sort by last message time
            usort($conversationList, function($a, $b) {
                $timeA = $a['last_message_time'] ? strtotime($a['last_message_time']) : 0;
                $timeB = $b['last_message_time'] ? strtotime($b['last_message_time']) : 0;
                return $timeB - $timeA; // Descending order
            });

            return response()->json([
                'success' => true,
                'message' => 'Conversations retrieved successfully',
                'data' => $conversationList,
                'total' => count($conversationList)
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching conversations: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get messages for a specific conversation
     * Conversation is identified by recipient_id and recipient_type (admin or trainer)
     */
    public function getMessages(Request $request, $recipientId, $recipientType)
    {
        try {
            $member = $request->get('auth_member');
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Validate recipient type
            if (!in_array($recipientType, ['Admin', 'Trainer'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid recipient type. Must be Admin or Trainer',
                ], 400);
            }

            // Get member record
            $memberRecord = Member::where('email', $member->email)->first();
            
            if (!$memberRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Verify recipient exists
            $recipient = null;
            if ($recipientType == 'Admin') {
                $recipient = User::find($recipientId);
            } elseif ($recipientType == 'Trainer') {
                $recipient = Coach::find($recipientId);
            }

            if (!$recipient) {
                return response()->json([
                    'success' => false,
                    'message' => 'Recipient not found',
                ], 404);
            }

            $limit = $request->get('limit', 50);
            $offset = $request->get('offset', 0);

            // Get messages between member and recipient using MemberMessage model
            // Messages can be:
            // 1. Sent by member to recipient:
            //    - If Admin: sender_member_id = member, receiver_member_id = recipient
            //    - If Coach: sender_member_id = member, receiver_coach_id = recipient
            // 2. Sent by recipient to member:
            //    - If Admin: sender_member_id = recipient, receiver_member_id = member
            //    - If Coach: sender_coach_id = recipient, receiver_member_id = member
            $messages = MemberMessage::where(function($query) use ($memberRecord, $recipientId, $recipientType) {
                // Member sent to recipient
                $query->where(function($q) use ($memberRecord, $recipientId, $recipientType) {
                    if ($recipientType == 'Trainer') {
                        // Member sent to coach - check receiver_coach_id
                        $q->where('sender_member_id', $memberRecord->id)
                          ->where('receiver_coach_id', $recipientId);
                    } else {
                        // Member sent to admin - check receiver_member_id
                        $q->where('sender_member_id', $memberRecord->id)
                          ->where('receiver_member_id', $recipientId);
                    }
                })
                // OR recipient sent to member
                ->orWhere(function($q) use ($memberRecord, $recipientId, $recipientType) {
                    if ($recipientType == 'Trainer') {
                        // Coach sent to member - check sender_coach_id
                        $q->where('sender_coach_id', $recipientId)
                          ->where('receiver_member_id', $memberRecord->id);
                    } else {
                        // Admin sent to member - check sender_member_id
                        $q->where('sender_member_id', $recipientId)
                          ->where('receiver_member_id', $memberRecord->id);
                    }
                });
            })
            ->orderBy('sent_date', 'asc') // Oldest first for chat display
            ->offset($offset)
            ->limit($limit)
            ->get()
            ->map(function($message) use ($memberRecord, $recipientId, $recipientType) {
                // Determine sender details
                // Message is from member if sender_member_id matches and sender_coach_id is null/0
                $isOwn = ($message->sender_member_id == $memberRecord->id) && 
                         (!$message->sender_coach_id || $message->sender_coach_id == 0);
                $senderName = 'Unknown';
                $senderAvatar = null;
                $senderType = 'Member';

                if ($isOwn) {
                    // Member sent the message
                    $sender = Member::find($message->sender_member_id);
                    if ($sender) {
                        $senderName = trim(($sender->firstname ?? '') . ' ' . ($sender->lastname ?? ''));
                        $senderAvatar = $sender->profile_image ? asset('storage/' . $sender->profile_image) : null;
                    }
                    $senderType = 'Member';
                } else {
                    // Recipient sent the message
                    $senderType = $recipientType;
                    if ($recipientType == 'Admin') {
                        $sender = User::find($message->sender_member_id);
                        if ($sender) {
                            $senderName = trim(($sender->firstname ?? '') . ' ' . ($sender->lastname ?? ''));
                            $senderAvatar = $sender->avatar ? asset('storage/' . $sender->avatar) : null;
                        }
                    } elseif ($recipientType == 'Trainer') {
                        // For coaches, check sender_coach_id instead of sender_member_id
                        $coachId = $message->sender_coach_id ?? null;
                        if ($coachId) {
                            $sender = Coach::find($coachId);
                            if ($sender) {
                                $senderName = trim(($sender->first_name ?? '') . ' ' . ($sender->last_name ?? ''));
                                $senderAvatar = $sender->profile_image ? asset('storage/' . $sender->profile_image) : null;
                            }
                        }
                    }
                }

                return [
                    'id' => $message->id,
                    'message' => $message->message_text,
                    'sender_id' => $isOwn ? $message->sender_member_id : ($recipientType == 'Trainer' ? ($message->sender_coach_id ?? null) : $message->sender_member_id),
                    'sender_type' => $senderType,
                    'sender_name' => $senderName,
                    'sender_avatar' => $senderAvatar,
                    'seen' => true, // MemberMessage doesn't have seen field, default to true
                    'is_own' => $isOwn,
                    'created_at' => $message->sent_date ? Carbon::parse($message->sent_date)->format('Y-m-d H:i:s') : null,
                    'created_at_timestamp' => $message->sent_date ? Carbon::parse($message->sent_date)->timestamp : null,
                    'time_ago' => $message->sent_date ? Carbon::parse($message->sent_date)->diffForHumans() : null,
                ];
            });

            // Note: MemberMessage doesn't have a 'seen' field, so we skip marking as seen
            // If you need seen tracking, you'll need to add a 'seen' field to the membermessages table

            return response()->json([
                'success' => true,
                'message' => 'Messages retrieved successfully',
                'data' => [
                    'messages' => $messages,
                    'recipient' => [
                        'id' => $recipientId,
                        'type' => $recipientType,
                        'name' => $recipientType == 'Admin' 
                            ? trim(($recipient->firstname ?? '') . ' ' . ($recipient->lastname ?? ''))
                            : trim(($recipient->first_name ?? '') . ' ' . ($recipient->last_name ?? '')),
                        'avatar' => $recipientType == 'Admin'
                            ? ($recipient->avatar ? asset('storage/' . $recipient->avatar) : null)
                            : ($recipient->profile_image ? asset('storage/' . $recipient->profile_image) : null),
                    ],
                    'total' => $messages->count(),
                    'has_more' => $messages->count() >= $limit
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching messages: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Send a message to admin or coach
     */
    public function sendMessage(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Validate request
            $validator = Validator::make($request->all(), [
                'recipient_id' => 'required|integer',
                'recipient_type' => 'required|string|in:Admin,Trainer',
                'message' => 'required|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Get member record
            $memberRecord = Member::where('email', $member->email)->first();
            
            if (!$memberRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Verify recipient exists
            $recipient = null;
            if ($request->recipient_type == 'Admin') {
                $recipient = User::find($request->recipient_id);
            } elseif ($request->recipient_type == 'Trainer') {
                $recipient = Coach::find($request->recipient_id);
            }

            if (!$recipient) {
                return response()->json([
                    'success' => false,
                    'message' => 'Recipient not found',
                ], 404);
            }

            // Get gym_id from member
            $gymId = $memberRecord->gym_id ?? null;

            // Create the message using MemberMessage model
            // Store coach ID in receiver_coach_id if sending to trainer, otherwise in receiver_member_id for admin
            $messageData = [
                'gym_id' => $gymId,
                'sender_member_id' => $memberRecord->id,
                'message_text' => $request->message,
                // sent_date will be set using database server time after creation
            ];
            
            if ($request->recipient_type == 'Trainer') {
                $messageData['receiver_coach_id'] = $request->recipient_id;
                $messageData['receiver_member_id'] = 0; // Set to 0 when sending to coach
            } else {
                $messageData['receiver_member_id'] = $request->recipient_id;
            }
            
            $message = MemberMessage::create($messageData);
            
            // Update sent_date using database server time to ensure it's not device time
            DB::table('membermessages')
                ->where('id', $message->id)
                ->update(['sent_date' => DB::raw('NOW()')]);
            
            // Refresh the model to get the updated sent_date
            $message->refresh();

            // Create notification for the recipient
            try {
                $gymId = $memberRecord->gym_id ?? 1;
                NotificationService::messageSent($message, $gymId, $memberRecord->id);
            } catch (\Exception $notificationException) {
                // Log notification error but don't fail the message sending
                Log::warning('Failed to create notification for message', [
                    'message_id' => $message->id,
                    'recipient_type' => $request->recipient_type,
                    'recipient_id' => $request->recipient_id,
                    'error' => $notificationException->getMessage()
                ]);
            }

            // Get sender details for response
            $senderName = trim(($memberRecord->firstname ?? '') . ' ' . ($memberRecord->lastname ?? ''));
            $senderAvatar = $memberRecord->profile_image ? asset('storage/' . $memberRecord->profile_image) : null;

            return response()->json([
                'success' => true,
                'message' => 'Message sent successfully',
                'data' => [
                    'id' => $message->id,
                    'message' => $message->message_text,
                    'sender_id' => $message->sender_member_id,
                    'sender_type' => 'Member',
                    'sender_name' => $senderName,
                    'sender_avatar' => $senderAvatar,
                    'seen' => true, // MemberMessage doesn't have seen field
                    'created_at' => $message->sent_date ? Carbon::parse($message->sent_date)->format('Y-m-d H:i:s') : null,
                    'created_at_timestamp' => $message->sent_date ? Carbon::parse($message->sent_date)->timestamp : null,
                    'time_ago' => $message->sent_date ? Carbon::parse($message->sent_date)->diffForHumans() : null,
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error sending message: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mark messages as seen
     */
    public function markAsSeen(Request $request, $recipientId, $recipientType)
    {
        try {
            $member = $request->get('auth_member');
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Validate recipient type
            if (!in_array($recipientType, ['Admin', 'Trainer'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid recipient type. Must be Admin or Trainer',
                ], 400);
            }

            // Get member record
            $memberRecord = Member::where('email', $member->email)->first();
            
            if (!$memberRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Note: MemberMessage model doesn't have a 'seen' field
            // If you need seen tracking, you'll need to add it to the membermessages table
            // For now, we'll return success but no actual update
            
            return response()->json([
                'success' => true,
                'message' => 'Messages marked as seen',
                'data' => [
                    'updated_count' => 0, // MemberMessage doesn't support seen tracking yet
                    'note' => 'Seen tracking not implemented in MemberMessage model'
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error marking messages as seen: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get unread message count
     */
    public function getUnreadCount(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Get member record
            $memberRecord = Member::where('email', $member->email)->first();
            
            if (!$memberRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            // Note: MemberMessage model doesn't have a 'seen' field
            // We'll count all messages received by member from admins/trainers
            // To properly implement unread count, you'll need to add a 'seen' field to membermessages table
            
            // Get all admin and trainer IDs
            $adminIds = User::where('Is_Active', 1)->pluck('id')->toArray();
            $trainerIds = Coach::active()->pluck('id')->toArray();
            $allRecipientIds = array_merge($adminIds, $trainerIds);
            
            // Count messages where member is receiver and sender is admin/trainer
            $unreadCount = MemberMessage::where('receiver_member_id', $memberRecord->id)
                ->whereIn('sender_member_id', $allRecipientIds)
                ->count();

            return response()->json([
                'success' => true,
                'message' => 'Unread count retrieved successfully',
                'data' => [
                    'unread_count' => $unreadCount,
                    'note' => 'This includes all messages. Add seen field to membermessages table for accurate unread count.'
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching unread count: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get available admins and coaches for starting a conversation
     */
    public function getAvailableContacts(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], 401);
            }

            // Get member record
            $memberRecord = Member::where('email', $member->email)->first();
            
            if (!$memberRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found',
                ], 404);
            }

            $contacts = [];

            // Get all admins (Users)
            $admins = User::where('Is_Active', 1)->get();
            foreach ($admins as $admin) {
                $contacts[] = [
                    'id' => $admin->id,
                    'type' => 'Admin',
                    'name' => trim(($admin->firstname ?? '') . ' ' . ($admin->lastname ?? '')),
                    'avatar' => $admin->avatar ? asset('storage/' . $admin->avatar) : null,
                    'email' => $admin->email,
                ];
            }

            // Get all trainers/coaches
            $trainers = Coach::active()->get();
            foreach ($trainers as $trainer) {
                $contacts[] = [
                    'id' => $trainer->id,
                    'type' => 'Trainer',
                    'name' => trim(($trainer->first_name ?? '') . ' ' . ($trainer->last_name ?? '')),
                    'avatar' => $trainer->profile_image ? asset('storage/' . $trainer->profile_image) : null,
                    'email' => $trainer->email ?? null,
                ];
            }

            return response()->json([
                'success' => true,
                'message' => 'Available contacts retrieved successfully',
                'data' => $contacts,
                'total' => count($contacts)
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching contacts: ' . $e->getMessage()
            ], 500);
        }
    }
}

