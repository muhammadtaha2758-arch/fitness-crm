<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Coach;
use App\Models\User;
use App\Models\Group;
use App\Models\Message;
use App\Models\MemberMessage;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CommunicationController extends Controller
{
    /**
     * Get all communication data (members and trainers) in one request
     */
    public function index(Request $request)
    {
        try {
            $search = $request->get('search', '');
            $type = $request->get('type', 'all'); // 'all', 'members', 'trainers'
            
            $data = [
                'members' => [],
                'trainers' => [],
                'current_user' => null
            ];

            // Get current user
            $user = Auth::user();
            if ($user) {
                $data['current_user'] = [
                    'id' => $user->id,
                    'name' => $user->firstname . ' ' . $user->lastname,
                    'email' => $user->email,
                    'avatar' => $user->avatar ? "/images/avatar/{$user->avatar}" : null,
                    'role' => $user->role_id
                ];
            }

            // Get members if requested
            if ($type === 'all' || $type === 'members') {
                // Get current user's gym_id (don't default to 1)
                $gymId = auth()->user()->gym_id ?? null;
                
                $members = Member::where('deleted_at', null)
                    ->when($gymId, function($query) use ($gymId) {
                        $query->where('gym_id', $gymId); // Filter by gym_id only if it exists
                    })
                    ->when($search, function($query) use ($search) {
                        $query->where(function($q) use ($search) {
                            $q->where('membername', 'like', "%{$search}%")
                              ->orWhere('email', 'like', "%{$search}%")
                              ->orWhere('id', 'like', "%{$search}%");
                        });
                    })
                    ->limit(50) // Limit results for performance
                    ->select([
                        'id',
                        'membername as name',
                        'email',
                        'profile_image as avatar',
                        'Statuses as status',
                        'created_at'
                    ])
                    ->get()
                    ->map(function($member) {
                        return [
                            'id' => $member->id,
                            'name' => $member->name ?: 'Unknown Member',
                            'email' => $member->email,
                            'phone' => null, // Phone field removed from select, set to null
                            'avatar' => $member->avatar ? "/images/avatar/{$member->avatar}" : null,
                            'status' => $this->getMemberStatus($member->status),
                            'created_at' => $member->created_at
                        ];
                    });

                $data['members'] = $members;
            }

            // Get trainers if requested
            if ($type === 'all' || $type === 'trainers') {
                $trainers = Coach::where('deleted_at', null)
                    ->when($search, function($query) use ($search) {
                        $query->where(function($q) use ($search) {
                            $q
                              ->where('first_name', 'like', "%{$search}%")
                              ->orWhere('last_name', 'like', "%{$search}%")
                              ->orWhere('email', 'like', "%{$search}%")
                              ->orWhere('id', 'like', "%{$search}%");
                        });
                    })
                    ->select([
                        'id',
                        'first_name',
                        'last_name',
                        'email',
                        'bio',
                        'gender',
                        'created_at'
                    ])
                    ->get()
                    ->map(function($trainer) {
                        return [
                            'id' => $trainer->id,
                            'name' => $trainer->name ?: ($trainer->first_name . ' ' . $trainer->last_name),
                            'email' => $trainer->email,
                            'phone' => $trainer->phone,
                            'avatar' => null, // Trainers don't have avatar field in the model
                            'status' => 'online', // Default status
                            'specialization' => $this->getTrainerSpecialization($trainer->bio),
                            'bio' => $trainer->bio,
                            'gender' => $trainer->gender,
                            'created_at' => $trainer->created_at
                        ];
                    });

                $data['trainers'] = $trainers;
            }

            return response()->json([
                'success' => true,
                'data' => $data,
                'totals' => [
                    'members' => count($data['members']),
                    'trainers' => count($data['trainers'])
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching communication data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all members for communication (kept for backward compatibility)
     */
    public function getMembers(Request $request)
    {
        try {
            $search = $request->get('search', '');
            
            // Debug: Log the search query
            \Log::info('CommunicationController getMembers - Search query: ' . $search);
            
            // Get current user's gym_id (don't default to 1)
            $gymId = auth()->user()->gym_id ?? null;
            
            $members = Member::where('deleted_at', null)
                ->when($gymId, function($query) use ($gymId) {
                    $query->where('gym_id', $gymId); // Filter by gym_id only if it exists
                })
                ->when($search, function($query) use ($search) {
                    $query->where(function($q) use ($search) {
                        $q->where('membername', 'like', "%{$search}%")
                          ->orWhere('email', 'like', "%{$search}%")
                          ->orWhere('id', 'like', "%{$search}%");
                    });
                })
                ->limit(50) // Limit results for performance
                ->select([
                    'id',
                    'membername as name',
                    'email',
                    'profile_image as avatar',
                    'Statuses as status',
                    'created_at'
                ])
                ->get();
                
            // Debug: Log the count
            \Log::info('CommunicationController getMembers - Found members: ' . $members->count());
            
            $members = $members->map(function($member) {
                    return [
                        'id' => $member->id,
                        'name' => $member->name ?: 'Unknown Member',
                        'email' => $member->email,
                        'phone' => null, // Phone field removed from select, set to null
                        'avatar' => $member->avatar ? "/images/avatar/{$member->avatar}" : null,
                        'status' => $this->getMemberStatus($member->status),
                        'created_at' => $member->created_at
                    ];
                });

            return response()->json([
                'success' => true,
                'members' => $members,
                'total' => $members->count()
            ]);

        } catch (\Exception $e) {
            \Log::error('CommunicationController getMembers error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching members: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all trainers for communication (kept for backward compatibility)
     */
    public function getTrainers(Request $request)
    {
        try {
            $search = $request->get('search', '');
            
            $trainers = Coach::where('deleted_at', null)
                ->when($search, function($query) use ($search) {
                    $query->where(function($q) use ($search) {
                        $q->where('first_name', 'like', "%{$search}%")
                          ->orWhere('last_name', 'like', "%{$search}%")
                          ->orWhere('email', 'like', "%{$search}%")
                          ->orWhere('id', 'like', "%{$search}%");
                    });
                })
                // Only select columns that are guaranteed to exist on all installs
                ->select([
                    'id',
                    'first_name',
                    'last_name',
                    'email',
                    'created_at'
                ])
                ->get()
                ->map(function($trainer) {
                    return [
                        'id' => $trainer->id,
                        'name' => $trainer->name ?: trim($trainer->first_name . ' ' . $trainer->last_name),
                        'email' => $trainer->email,
                        'phone' => $trainer->phone ?? null,
                        'avatar' => null, // Trainers don't have avatar field in the model
                        'status' => 'online', // Default status
                        'specialization' => $this->getTrainerSpecialization($trainer->bio ?? null),
                        'bio' => $trainer->bio ?? null,
                        'gender' => $trainer->gender ?? null,
                        'created_at' => $trainer->created_at
                    ];
                });

            return response()->json([
                'success' => true,
                'trainers' => $trainers,
                'total' => $trainers->count()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching trainers: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all coaches and admins for communication
     *
     * This method is referenced by the /communication/coaches and
     * /coachapp/communication/coaches routes in api.php.
     * Returns both admins (role_id = 1) and coaches (from Coach table) separately.
     */
    public function getCoaches(Request $request)
    {
        try {
            $search = $request->get('search', '');
            $gymId = auth()->user()->gym_id ?? null;
            
            // Get admins (role_id = 1) from User table
            $admins = User::where('role_id', 1)
                ->when($gymId, function($query) use ($gymId) {
                    $query->where('gym_id', $gymId);
                })
                ->when($search, function($query) use ($search) {
                    $query->where(function($q) use ($search) {
                        $q->where('firstname', 'like', "%{$search}%")
                          ->orWhere('lastname', 'like', "%{$search}%")
                          ->orWhere('email', 'like', "%{$search}%")
                          ->orWhere('id', 'like', "%{$search}%");
                    });
                })
                ->select([
                    'id',
                    'firstname',
                    'lastname',
                    'email',
                    'created_at'
                ])
                ->get()
                ->map(function($admin) {
                    return [
                        'id' => $admin->id,
                        'name' => trim(($admin->firstname ?? '') . ' ' . ($admin->lastname ?? '')) ?: 'Admin',
                        'email' => $admin->email,
                        'phone' => $admin->phone ?? null,
                        'avatar' => $admin->avatar ? "/images/avatar/{$admin->avatar}" : null,
                        'status' => 'online',
                        'type' => 'admin',
                        'created_at' => $admin->created_at
                    ];
                });
            
            // Get coaches from Coach table
            $coaches = Coach::where('deleted_at', null)
                ->when($search, function($query) use ($search) {
                    $query->where(function($q) use ($search) {
                        $q->where('first_name', 'like', "%{$search}%")
                          ->orWhere('last_name', 'like', "%{$search}%")
                          ->orWhere('email', 'like', "%{$search}%")
                          ->orWhere('id', 'like', "%{$search}%");
                    });
                })
                ->select([
                    'id',
                    'first_name',
                    'last_name',
                    'email',
                    'created_at'
                ])
                ->get()
                ->map(function($coach) {
                    return [
                        'id' => $coach->id,
                        'name' => trim($coach->first_name . ' ' . $coach->last_name) ?: 'Coach',
                        'email' => $coach->email,
                        'phone' => $coach->phone ?? null,
                        'avatar' => null,
                        'status' => 'online',
                        'type' => 'coach',
                        'created_at' => $coach->created_at
                    ];
                });

            return response()->json([
                'success' => true,
                'admins' => $admins,
                'coaches' => $coaches,
                'total' => $admins->count() + $coaches->count()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching coaches and admins: ' . $e->getMessage()
            ], 500);
        }
    }



    /**
     * Get member status for display
     */
    private function getMemberStatus($status)
    {
        if (!$status) return 'active';
        
        $statusMap = [
            'active' => 'online',
            'inactive' => 'offline',
            'suspended' => 'offline',
            'expired' => 'offline',
            'unsubscribed' => 'offline'
        ];

        return $statusMap[$status] ?? 'online';
    }

    /**
     * Extract specialization from trainer bio or generate default
     */
    private function getTrainerSpecialization($bio)
    {
        if (!$bio) return 'Personal Training';

        // Simple keyword-based specialization detection
        $bio = strtolower($bio);
        
        if (strpos($bio, 'strength') !== false || strpos($bio, 'weight') !== false) {
            return 'Strength Training';
        } elseif (strpos($bio, 'cardio') !== false || strpos($bio, 'hiit') !== false) {
            return 'Cardio & HIIT';
        } elseif (strpos($bio, 'yoga') !== false || strpos($bio, 'flexibility') !== false) {
            return 'Yoga & Flexibility';
        } elseif (strpos($bio, 'weight loss') !== false || strpos($bio, 'fat loss') !== false) {
            return 'Weight Loss';
        } elseif (strpos($bio, 'sports') !== false || strpos($bio, 'performance') !== false) {
            return 'Sports Performance';
        } elseif (strpos($bio, 'nutrition') !== false) {
            return 'Nutrition & Wellness';
        } elseif (strpos($bio, 'senior') !== false || strpos($bio, 'elderly') !== false) {
            return 'Senior Fitness';
        } elseif (strpos($bio, 'crossfit') !== false) {
            return 'CrossFit';
        } else {
            return 'Personal Training';
        }
    }

    /**
     * Get chat history between users
     */
    public function getChatHistory(Request $request, $recipientId, $recipientType = 'member')
    {
        try {
            // Try multiple ways to get the authenticated user
            // The mobile.or.api middleware sets the user in various ways
            $sender = Auth::guard('api')->user() 
                   ?? $request->user('api') 
                   ?? $request->user()
                   ?? Auth::user()
                   ?? $request->get('auth_user')
                   ?? $request->get('auth_member');
            
            if (!$sender) {
                \Log::warning('CommunicationController::getChatHistory: No authenticated user found', [
                    'endpoint' => $request->path(),
                    'method' => $request->method(),
                    'has_auth_header' => $request->hasHeader('Authorization'),
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $senderId = $sender->id;
            $roleId = (int)($sender->role_id ?? 0);
            $isAdmin = ($roleId == 1);
            
            // For coaches (role_id == 3), try to find coach_id even if not set on User model
            $isCoach = false;
            $senderCoachId = null;
            if ($roleId == 3) {
                // First try to get coach_id from user model (handle 0 as null)
                $coachIdFromUser = $sender->coach_id ?? null;
                $senderCoachId = ($coachIdFromUser && $coachIdFromUser > 0) ? (int)$coachIdFromUser : null;
                
                // If not found, try to find coach by email or user_id
                if (!$senderCoachId) {
                    $coach = \App\Models\Coach::where('email', $sender->email ?? '')
                        ->orWhere('user_id', $sender->id)
                        ->first();
                    if ($coach) {
                        $senderCoachId = (int)$coach->id;
                    }
                }
                
                // Set isCoach to true only if we found a coach_id
                $isCoach = !empty($senderCoachId);
            }
            
            $senderAdminId = $isAdmin ? $sender->id : null;
            
            // Log sender info for debugging
            \Log::info('CommunicationController::getChatHistory: Sender info', [
                'sender_id' => $senderId,
                'role_id' => $roleId,
                'isCoach' => $isCoach,
                'coach_id_from_user' => $sender->coach_id ?? null,
                'coach_id_resolved' => $senderCoachId,
                'senderAdminId' => $senderAdminId,
            ]);
            
            // Normalize recipient type: 'admin' should be treated as 'trainer' for backend compatibility
            $normalizedRecipientType = ($recipientType === 'admin') ? 'trainer' : $recipientType;
            
            // Use membermessages for all conversations (members, coaches, and admins)
            if ($normalizedRecipientType === 'member') {
                // Build query for member-to-member, coach-to-member, or admin-to-member conversations
                $messages = MemberMessage::where(function($q) use ($senderId, $senderCoachId, $senderAdminId, $recipientId, $isCoach, $isAdmin) {
                    if ($isCoach) {
                        // Coach sending to member
                        $q->where('sender_coach_id', $senderCoachId)
                          ->where('receiver_member_id', $recipientId);
                    } elseif ($isAdmin) {
                        // Admin sending to member
                        $q->where('sender_admin_id', $senderAdminId)
                          ->where('receiver_member_id', $recipientId);
                    } else {
                        // Member sending to member
                        $q->where('sender_member_id', $senderId)
                          ->where('receiver_member_id', $recipientId);
                    }
                })
                ->orWhere(function($q) use ($senderId, $senderCoachId, $senderAdminId, $recipientId, $isCoach, $isAdmin) {
                    if ($isCoach) {
                        // Member/Admin sending to coach (current user is coach)
                        $q->where('receiver_coach_id', $senderCoachId)
                          ->where(function($subQ) use ($recipientId) {
                              $subQ->where('sender_member_id', $recipientId)
                                   ->orWhere('sender_admin_id', $recipientId);
                          });
                    } elseif ($isAdmin) {
                        // Member sending to admin (current user is admin)
                        $q->where('sender_member_id', $recipientId)
                          ->where('receiver_admin_id', $senderAdminId);
                    } else {
                        // Member sending to current user (member)
                        $q->where('sender_member_id', $recipientId)
                          ->where('receiver_member_id', $senderId);
                    }
                })
                ->orderBy('sent_date', 'asc')
                ->orderBy('created_at', 'asc')
                ->get();
                
                $formattedMessages = $messages->map(function($message) use ($senderId, $senderCoachId, $senderAdminId, $isCoach, $isAdmin) {
                    $messageSenderId = $message->sender_coach_id ?? $message->sender_admin_id ?? $message->sender_member_id;
                    $isSent = $isCoach 
                        ? ($message->sender_coach_id == $senderCoachId)
                        : ($isAdmin 
                            ? ($message->sender_admin_id == $senderAdminId)
                            : ($message->sender_member_id == $senderId));
                    $senderType = $message->sender_coach_id ? 'Trainer' : ($message->sender_admin_id ? 'Admin' : 'Member');
                    
                    return [
                        'id' => $message->id, // Use id as primary key
                        'sender_id' => $messageSenderId,
                        'recipient_id' => $message->receiver_member_id ?? $message->receiver_coach_id ?? $message->receiver_admin_id,
                        'message' => $message->message_text ?? $message->message ?? '', // Fallback to message column if message_text is null
                        'sender_type' => $senderType,
                        'is_sent' => $isSent,
                        'created_at' => ($message->created_at ?? $message->sent_date ?? now())->toISOString(),
                        'seen' => 0 // membermessages doesn't have seen field
                    ];
                });
            } else {
                // Handle trainer/admin conversations using membermessages table
                // When recipientType is 'trainer' or 'admin', recipientId could be:
                // - A User ID (for admin) or Coach ID (for trainer)
                // We need to find the appropriate IDs for the membermessages table
                
                $recipientCoachId = null;
                $recipientAdminId = null;
                $recipientMemberId = null;
                $recipientUser = null; // Initialize to avoid undefined variable error
                
                // For 'trainer' type, recipientId is typically a Coach ID from coaches table
                // Try to find Coach first (most common case for coach-to-coach messaging)
                $coach = \App\Models\Coach::find($recipientId);
                
                if ($coach) {
                    // Found coach - use coach_id directly
                    $recipientCoachId = (int)$coach->id;
                    \Log::info('CommunicationController::getChatHistory: Found recipient as Coach', [
                        'recipientId' => $recipientId,
                        'coach_id' => $coach->id,
                        'coach_email' => $coach->email ?? 'N/A'
                    ]);
                } else {
                    // Coach not found, try User table (might be admin or coach user)
                    $recipientUser = User::find($recipientId);
                    
                    if ($recipientUser) {
                        if ($recipientUser->role_id == 1) {
                            // Admin - use separate admin column
                            $recipientAdminId = $recipientUser->id;
                            \Log::info('CommunicationController::getChatHistory: Found recipient as Admin', [
                                'recipientId' => $recipientId,
                                'admin_id' => $recipientUser->id
                            ]);
                        } elseif ($recipientUser->role_id == 3 && $recipientUser->coach_id) {
                            // Coach user - use their coach_id
                            $recipientCoachId = $recipientUser->coach_id;
                            \Log::info('CommunicationController::getChatHistory: Found recipient as Coach User', [
                                'recipientId' => $recipientId,
                                'user_id' => $recipientUser->id,
                                'coach_id' => $recipientUser->coach_id
                            ]);
                        } else {
                            // Try to find coach by email as fallback
                            $coachByEmail = \App\Models\Coach::where('email', $recipientUser->email ?? '')->first();
                            if ($coachByEmail) {
                                $recipientCoachId = (int)$coachByEmail->id;
                                \Log::info('CommunicationController::getChatHistory: Found recipient Coach by email', [
                                    'recipientId' => $recipientId,
                                    'email' => $recipientUser->email,
                                    'coach_id' => $coachByEmail->id
                                ]);
                            }
                        }
                    } else {
                        // Neither Coach nor User found - log warning but continue (might be old data)
                        \Log::warning('CommunicationController::getChatHistory: Recipient not found', [
                            'recipientId' => $recipientId,
                            'recipientType' => $recipientType,
                            'tried_coach' => true,
                            'tried_user' => true
                        ]);
                        // Set as fallback - query might still work if IDs match
                        $recipientCoachId = (int)$recipientId;
                    }
                }
                
                // Log recipient lookup for debugging
                \Log::info('CommunicationController::getChatHistory: Recipient lookup', [
                    'recipientId' => $recipientId,
                    'recipientType' => $recipientType,
                    'recipientUser_found' => $recipientUser ? true : false,
                    'recipientCoachId' => $recipientCoachId,
                    'recipientAdminId' => $recipientAdminId,
                    'senderCoachId' => $senderCoachId,
                    'isCoach' => $isCoach,
                    'roleId' => $roleId,
                ]);
                
                // If user has coach role but we couldn't resolve coach_id, log warning
                if ($roleId == 3 && !$isCoach) {
                    \Log::warning('CommunicationController::getChatHistory: Coach role but no coach_id found', [
                        'user_id' => $senderId,
                        'email' => $sender->email,
                        'role_id' => $roleId,
                        'coach_id_from_user' => $sender->coach_id ?? null
                    ]);
                    // Continue anyway - query will return empty results
                }
                
                // Build query for coach-to-admin/coach or admin/coach-to-coach conversations
                // This handles bidirectional messaging: coach ↔ admin, coach ↔ coach, admin ↔ admin
                // IMPORTANT: We need to handle both directions - messages FROM sender TO recipient AND FROM recipient TO sender
                $messages = MemberMessage::where(function($q) use ($senderId, $senderCoachId, $senderAdminId, $recipientCoachId, $recipientAdminId, $recipientMemberId, $isCoach, $isAdmin) {
                    if ($isCoach && $senderCoachId) {
                        // Current user is a coach - messages FROM coach TO recipient
                        if ($recipientAdminId) {
                            // Coach sending to admin
                            $q->where('sender_coach_id', $senderCoachId)
                              ->where('receiver_admin_id', $recipientAdminId);
                        } elseif ($recipientCoachId) {
                            // Coach sending to coach (coach-to-coach messaging)
                            $q->where('sender_coach_id', $senderCoachId)
                              ->where('receiver_coach_id', $recipientCoachId);
                        }
                    } elseif ($isAdmin) {
                        // Current user is admin - messages FROM admin TO recipient
                        if ($recipientAdminId) {
                            // Admin sending to admin
                            $q->where('sender_admin_id', $senderAdminId)
                              ->where('receiver_admin_id', $recipientAdminId);
                        } elseif ($recipientCoachId) {
                            // Admin sending to coach
                            $q->where('sender_admin_id', $senderAdminId)
                              ->where('receiver_coach_id', $recipientCoachId);
                        } elseif ($recipientMemberId) {
                            // Admin sending to member
                            $q->where('sender_admin_id', $senderAdminId)
                              ->where('receiver_member_id', $recipientMemberId);
                        }
                    } else {
                        // Current user is member - messages FROM member TO recipient
                        if ($recipientAdminId) {
                            // Member sending to admin
                            $q->where('sender_member_id', $senderId)
                              ->where('receiver_admin_id', $recipientAdminId);
                        } elseif ($recipientCoachId) {
                            // Member sending to coach
                            $q->where('sender_member_id', $senderId)
                              ->where('receiver_coach_id', $recipientCoachId);
                        }
                    }
                })
                ->orWhere(function($q) use ($senderId, $senderCoachId, $senderAdminId, $recipientCoachId, $recipientAdminId, $recipientMemberId, $isCoach, $isAdmin) {
                    if ($isCoach && $senderCoachId) {
                        // Current user is a coach - messages FROM recipient TO coach (reverse direction)
                        if ($recipientAdminId) {
                            // Admin sending to coach (this is the key case for admin-to-coach messages)
                            $q->where('sender_admin_id', $recipientAdminId)
                              ->where('receiver_coach_id', $senderCoachId);
                        } elseif ($recipientCoachId) {
                            // Coach sending to coach (reverse direction - recipient coach sending to current coach)
                            $q->where('sender_coach_id', $recipientCoachId)
                              ->where('receiver_coach_id', $senderCoachId);
                        }
                    } elseif ($isAdmin) {
                        // Current user is admin - messages FROM recipient TO admin
                        if ($recipientAdminId) {
                            // Admin sending to admin
                            $q->where('sender_admin_id', $recipientAdminId)
                              ->where('receiver_admin_id', $senderAdminId);
                        } elseif ($recipientCoachId) {
                            // Coach sending to admin
                            $q->where('sender_coach_id', $recipientCoachId)
                              ->where('receiver_admin_id', $senderAdminId);
                        } elseif ($recipientMemberId) {
                            // Member sending to admin
                            $q->where('sender_member_id', $recipientMemberId)
                              ->where('receiver_admin_id', $senderAdminId);
                        }
                    } else {
                        // Current user is member - messages FROM recipient TO member
                        if ($recipientAdminId) {
                            // Admin sending to member
                            $q->where('sender_admin_id', $recipientAdminId)
                              ->where('receiver_member_id', $senderId);
                        } elseif ($recipientCoachId) {
                            // Coach sending to member
                            $q->where('sender_coach_id', $recipientCoachId)
                              ->where('receiver_member_id', $senderId);
                        }
                    }
                })
                ->orderBy('sent_date', 'asc')
                ->orderBy('created_at', 'asc')
                ->get();
                
                // Log query results for debugging coach-to-coach messages
                \Log::info('CommunicationController::getChatHistory: Query results for trainer/admin conversation', [
                    'total_messages' => $messages->count(),
                    'senderId' => $senderId,
                    'senderCoachId' => $senderCoachId,
                    'recipientId' => $recipientId,
                    'recipientCoachId' => $recipientCoachId,
                    'recipientAdminId' => $recipientAdminId,
                    'recipientType' => $recipientType,
                    'isCoach' => $isCoach,
                    'isAdmin' => $isAdmin,
                    'roleId' => $roleId,
                    'query_conditions' => [
                        'direction_1_coach_to_recipient' => $isCoach && $senderCoachId && $recipientCoachId ? "sender_coach_id={$senderCoachId} AND receiver_coach_id={$recipientCoachId}" : 'N/A',
                        'direction_2_recipient_to_coach' => $isCoach && $senderCoachId && $recipientCoachId ? "sender_coach_id={$recipientCoachId} AND receiver_coach_id={$senderCoachId}" : 'N/A',
                    ],
                    'sample_messages' => $messages->take(5)->map(function($msg) {
                        return [
                            'id' => $msg->id,
                            'sender_coach_id' => $msg->sender_coach_id,
                            'receiver_coach_id' => $msg->receiver_coach_id,
                            'sender_admin_id' => $msg->sender_admin_id,
                            'receiver_admin_id' => $msg->receiver_admin_id,
                            'sender_member_id' => $msg->sender_member_id,
                            'receiver_member_id' => $msg->receiver_member_id,
                            'message_text_preview' => substr($msg->message_text ?? $msg->message ?? '', 0, 50),
                            'sent_date' => $msg->sent_date,
                        ];
                    })
                ]);
                
                $formattedMessages = $messages->map(function($message) use ($senderId, $senderCoachId, $senderAdminId, $isCoach, $isAdmin) {
                    $messageSenderId = $message->sender_coach_id ?? $message->sender_admin_id ?? $message->sender_member_id;
                    $isSent = $isCoach 
                        ? ($message->sender_coach_id == $senderCoachId)
                        : ($isAdmin 
                            ? ($message->sender_admin_id == $senderAdminId)
                            : ($message->sender_member_id == $senderId));
                    $senderType = $message->sender_coach_id ? 'Trainer' : ($message->sender_admin_id ? 'Admin' : 'Member');
                    
                    return [
                        'id' => $message->id,
                        'sender_id' => $messageSenderId,
                        'recipient_id' => $message->receiver_member_id ?? $message->receiver_coach_id ?? $message->receiver_admin_id,
                        'message' => $message->message_text ?? $message->message ?? '', // Fallback to message column if message_text is null
                        'sender_type' => $senderType,
                        'is_sent' => $isSent,
                        'created_at' => ($message->created_at ?? $message->sent_date ?? now())->toISOString(),
                        'seen' => 0 // membermessages doesn't have seen field
                    ];
                });
            }

            return response()->json([
                'success' => true,
                'messages' => $formattedMessages->values()->all(),
                'recipient_id' => $recipientId,
                'recipient_type' => $recipientType
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching chat history: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Send a message
     */
    public function sendMessage(Request $request)
    {
        try {
            // Log raw request data for debugging
            $jsonData = [];
            try {
                $jsonData = $request->json()->all();
            } catch (\Exception $e) {
                // Not JSON request, that's okay
            }
            
            \Log::info('CommunicationController::sendMessage: Raw request received', [
                'all_data' => $request->all(),
                'json_data' => $jsonData,
                'input_data' => $request->input(),
                'has_recipient_id' => $request->has('recipient_id'),
                'has_recipient_type' => $request->has('recipient_type'),
                'has_message' => $request->has('message'),
                'content_type' => $request->header('Content-Type'),
                'method' => $request->method(),
                'raw_content' => $request->getContent() ? substr($request->getContent(), 0, 200) : 'empty',
            ]);
            
            // Get data from request - Laravel automatically parses JSON if Content-Type is application/json
            // Use input() which works for both JSON and form data
            $recipientId = $request->input('recipient_id');
            $recipientType = $request->input('recipient_type');
            $message = $request->input('message');
            
            // Check if required fields are missing
            if ($recipientId === null && $recipientType === null && $message === null) {
                \Log::error('CommunicationController::sendMessage: All fields are null - request body may not be parsed correctly', [
                    'content_type' => $request->header('Content-Type'),
                    'method' => $request->method(),
                    'raw_content_length' => strlen($request->getContent()),
                    'raw_content_preview' => substr($request->getContent(), 0, 500),
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid request: No data received. Please check your connection and try again.',
                    'debug_info' => [
                        'content_type' => $request->header('Content-Type'),
                        'method' => $request->method(),
                    ]
                ], 400);
            }
            
            // Normalize recipient_id to integer (handles string numbers, null, etc.)
            if ($recipientId !== null) {
                if (is_numeric($recipientId)) {
                    $recipientId = (int)$recipientId;
                } else {
                    \Log::warning('CommunicationController::sendMessage: recipient_id is not numeric', [
                        'recipient_id' => $recipientId,
                        'type' => gettype($recipientId)
                    ]);
                }
            }
            
            // Normalize recipient_type (trim whitespace, lowercase)
            if ($recipientType !== null) {
                $recipientType = strtolower(trim($recipientType));
            }
            
            // Normalize message (trim whitespace)
            if ($message !== null) {
                $message = trim($message);
            }
            
            // Merge normalized values back into request
            $request->merge([
                'recipient_id' => $recipientId,
                'recipient_type' => $recipientType,
                'message' => $message
            ]);
            
            $validator = \Validator::make($request->all(), [
                'recipient_id' => 'required|integer|min:1',
                'recipient_type' => 'required|in:member,trainer,admin',
                'message' => 'required|string|max:1000'
            ]);

            if ($validator->fails()) {
                $errorMessages = $validator->errors()->all();
                $firstError = $validator->errors()->first();
                
                \Log::warning('CommunicationController::sendMessage: Validation failed', [
                    'errors' => $validator->errors()->toArray(),
                    'all_errors' => $errorMessages,
                    'request_data' => $request->all(),
                    'recipient_type_received' => $request->recipient_type ?? 'NOT_PROVIDED',
                    'recipient_type_type' => gettype($request->recipient_type ?? null),
                    'recipient_id_received' => $request->recipient_id ?? 'NOT_PROVIDED',
                    'recipient_id_type' => gettype($request->recipient_id ?? null),
                    'recipient_id_is_numeric' => is_numeric($request->recipient_id ?? null),
                    'message_received' => $request->message ? 'PROVIDED (' . strlen($request->message) . ' chars)' : 'NOT_PROVIDED',
                    'message_type' => gettype($request->message ?? null)
                ]);
                
                // Create a more user-friendly error message
                $userFriendlyMessage = 'Please check your input and try again.';
                if (strpos($firstError, 'recipient_id') !== false) {
                    $userFriendlyMessage = 'Invalid recipient selected. Please select a valid recipient.';
                } elseif (strpos($firstError, 'recipient_type') !== false) {
                    $userFriendlyMessage = 'Invalid recipient type. Please select who you want to message.';
                } elseif (strpos($firstError, 'message') !== false) {
                    if (strpos($firstError, 'required') !== false) {
                        $userFriendlyMessage = 'Please enter a message.';
                    } elseif (strpos($firstError, 'max') !== false) {
                        $userFriendlyMessage = 'Message is too long. Please keep it under 1000 characters.';
                    } else {
                        $userFriendlyMessage = 'Invalid message content. Please check your message.';
                    }
                }
                
                // Return detailed error response
                // Use the user-friendly message as the main message, but also include validation_error for more details
                $response = [
                    'success' => false,
                    'message' => $userFriendlyMessage, // User-friendly message
                    'validation_error' => $firstError, // Include original error for debugging and frontend parsing
                    'error' => $userFriendlyMessage, // Also include as 'error' for compatibility
                    'errors' => $validator->errors()->toArray(),
                    'received_data' => [
                        'recipient_id' => $request->recipient_id,
                        'recipient_id_type' => gettype($request->recipient_id),
                        'recipient_id_is_numeric' => is_numeric($request->recipient_id),
                        'recipient_type' => $request->recipient_type,
                        'recipient_type_type' => gettype($request->recipient_type),
                        'message' => $request->message ? substr($request->message, 0, 50) . '...' : null,
                        'message_length' => $request->message ? strlen($request->message) : 0,
                        'message_type' => gettype($request->message)
                    ]
                ];
                
                \Log::error('CommunicationController::sendMessage: Validation failed - returning error', [
                    'response' => $response,
                    'user_friendly_message' => $userFriendlyMessage,
                    'first_error' => $firstError,
                    'all_errors' => $errorMessages
                ]);
                
                return response()->json($response, 422);
            }

            // Try multiple ways to get the authenticated user
            // The mobile.or.api middleware sets the user in various ways
            $sender = Auth::guard('api')->user() 
                   ?? $request->user('api') 
                   ?? $request->user()
                   ?? Auth::user()
                   ?? $request->get('auth_user')
                   ?? $request->get('auth_member');
            
            if (!$sender) {
                \Log::warning('CommunicationController::sendMessage: No authenticated user found', [
                    'endpoint' => $request->path(),
                    'method' => $request->method(),
                    'has_auth_header' => $request->hasHeader('Authorization'),
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            // Determine sender type
            $senderType = 'Admin'; // Default for User model
            if ($sender->role_id == 3) {
                $senderType = 'Trainer';
            }

            // Get gym_id from authenticated user (don't default to 1)
            $gymId = $sender->gym_id ?? null;

            // Use membermessages table for all messages
            // Determine sender type: coach (role_id == 3), admin (role_id == 1), or member (role_id == 2)
            // Check role_id as integer to avoid type issues
            $roleId = (int)($sender->role_id ?? 0);
            $isAdmin = ($roleId == 1);
            
            // For coaches (role_id == 3), try to find coach_id even if not set on User model
            $isCoach = false;
            $senderCoachId = null;
            if ($roleId == 3) {
                // First try to get coach_id from user model (handle 0 as null)
                $coachIdFromUser = $sender->coach_id ?? null;
                $senderCoachId = ($coachIdFromUser && $coachIdFromUser > 0) ? (int)$coachIdFromUser : null;
                
                // If not found, try to find coach by email or user_id
                if (!$senderCoachId) {
                    $coach = \App\Models\Coach::where('email', $sender->email ?? '')
                        ->orWhere('user_id', $sender->id)
                        ->first();
                    if ($coach) {
                        $senderCoachId = (int)$coach->id;
                    }
                }
                
                // Set isCoach to true only if we found a coach_id
                $isCoach = !empty($senderCoachId);
            }
            
            // Log sender information for debugging
            \Log::info('CommunicationController::sendMessage: Sender info', [
                'sender_id' => $sender->id,
                'sender_email' => $sender->email ?? 'N/A',
                'role_id' => $roleId,
                'role_id_raw' => $sender->role_id,
                'isCoach' => $isCoach,
                'isAdmin' => $isAdmin,
                'coach_id_from_user' => $sender->coach_id ?? null,
                'coach_id_resolved' => $senderCoachId,
                'member_id' => $sender->member_id ?? null,
            ]);
            
            // Validate that sender has a valid ID
            if (empty($sender->id) || $sender->id == 0) {
                \Log::error('CommunicationController::sendMessage: Invalid sender ID', [
                    'sender_id' => $sender->id,
                    'sender' => $sender->toArray() ?? 'N/A'
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid sender: User ID is missing or invalid'
                ], 400);
            }
            
            // Prepare message data for membermessages table
            $messageData = [
                'gym_id' => $gymId,
                // id is auto_increment primary key, don't set it manually
                'message_text' => $request->message, // Primary column (text type)
                'message' => substr($request->message, 0, 1000), // Also save to message column (varchar 1000) for backward compatibility
                'sent_date' => now(),
                'recipient_id' => (int)$request->recipient_id, // Ensure integer
                'recipient_type' => $request->recipient_type // Save recipient_type to database
            ];

            // Set sender fields based on sender type
            if ($isCoach) {
                // Coach sending message - we already resolved senderCoachId above
                $messageData['sender_coach_id'] = (int)$senderCoachId;
                \Log::info('CommunicationController::sendMessage: Using sender_coach_id', [
                    'coach_id' => $senderCoachId,
                    'found_from_user_model' => !empty($sender->coach_id),
                    'found_from_coach_table' => empty($sender->coach_id) && !empty($senderCoachId)
                ]);
            } elseif ($roleId == 3 && !$isCoach) {
                // User has coach role but we couldn't find their coach_id
                \Log::error('CommunicationController::sendMessage: Coach role but no coach_id found', [
                    'user_id' => $sender->id,
                    'email' => $sender->email,
                    'role_id' => $roleId,
                    'coach_id_from_user' => $sender->coach_id ?? null
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'Unable to determine coach ID. Please contact support.'
                ], 400);
            } elseif ($isAdmin) {
                // Admin sending message - use separate admin column
                $messageData['sender_admin_id'] = (int)$sender->id; // Ensure it's an integer
                \Log::info('CommunicationController::sendMessage: Using sender_admin_id', [
                    'admin_id' => $messageData['sender_admin_id'],
                    'sender_id_raw' => $sender->id
                ]);
            } else {
                // Member sending message
                $messageData['sender_member_id'] = $sender->member_id ?? $sender->id;
                \Log::info('CommunicationController::sendMessage: Using sender_member_id', [
                    'member_id' => $messageData['sender_member_id'],
                    'fallback_to_user_id' => !isset($sender->member_id)
                ]);
            }
            
            // Ensure at least one sender field is set
            if (empty($messageData['sender_coach_id']) && 
                empty($messageData['sender_admin_id']) && 
                empty($messageData['sender_member_id'])) {
                \Log::error('CommunicationController::sendMessage: No sender field set', [
                    'isCoach' => $isCoach,
                    'isAdmin' => $isAdmin,
                    'sender_id' => $sender->id,
                    'role_id' => $roleId
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'Unable to determine sender type. Please contact support.'
                ], 400);
            }

            // Normalize recipient_type: 'admin' should be treated as 'trainer' for processing
            $normalizedRecipientType = ($request->recipient_type === 'admin') ? 'trainer' : $request->recipient_type;
            
            // Set receiver fields based on recipient type
            if ($normalizedRecipientType === 'member') {
                // Recipient is a member
                $messageData['receiver_member_id'] = (int)$request->recipient_id;
            } else {
                // recipient_type is 'trainer' or 'admin' - could be admin or coach
                $recipientId = (int)$request->recipient_id; // Ensure integer
                
                // For 'trainer' type, recipient_id is typically a Coach ID from coaches table
                // Try to find Coach first (most common case for coach-to-coach messaging)
                $coach = Coach::find($recipientId);
                
                if ($coach) {
                    // Found coach - use coach_id directly
                    $messageData['receiver_coach_id'] = (int)$coach->id;
                    \Log::info('CommunicationController::sendMessage: Found recipient as Coach', [
                        'recipientId' => $recipientId,
                        'coach_id' => $coach->id,
                        'coach_email' => $coach->email ?? 'N/A',
                        'recipient_type' => $normalizedRecipientType
                    ]);
                } else {
                    // Coach not found, try User table (might be admin or coach user)
                    $recipientUser = User::find($recipientId);
                    
                    if ($recipientUser) {
                        // Check if recipient is an admin (role_id = 1)
                        if ($recipientUser->role_id == 1) {
                            // Admin - use separate admin column
                            $messageData['receiver_admin_id'] = (int)$recipientUser->id;
                            \Log::info('CommunicationController::sendMessage: Found recipient as Admin', [
                                'recipientId' => $recipientId,
                                'admin_id' => $recipientUser->id
                            ]);
                        } elseif ($recipientUser->role_id == 3 && $recipientUser->coach_id) {
                            // Coach user - use their coach_id
                            $messageData['receiver_coach_id'] = (int)$recipientUser->coach_id;
                            \Log::info('CommunicationController::sendMessage: Found recipient as Coach User', [
                                'recipientId' => $recipientId,
                                'user_id' => $recipientUser->id,
                                'coach_id' => $recipientUser->coach_id
                            ]);
                        } else {
                            // Try to find coach by email as fallback
                            $coachByEmail = Coach::where('email', $recipientUser->email ?? '')->first();
                            if ($coachByEmail) {
                                $messageData['receiver_coach_id'] = (int)$coachByEmail->id;
                                \Log::info('CommunicationController::sendMessage: Found recipient Coach by email', [
                                    'recipientId' => $recipientId,
                                    'email' => $recipientUser->email,
                                    'coach_id' => $coachByEmail->id
                                ]);
                            } else {
                                \Log::warning('CommunicationController::sendMessage: Recipient User found but cannot determine type', [
                                    'recipientId' => $recipientId,
                                    'role_id' => $recipientUser->role_id,
                                    'email' => $recipientUser->email ?? 'N/A'
                                ]);
                                return response()->json([
                                    'success' => false,
                                    'message' => 'Invalid recipient: Cannot determine recipient type'
                                ], 400);
                            }
                        }
                    } else {
                        // Neither Coach nor User found
                        \Log::warning('CommunicationController::sendMessage: Recipient not found', [
                            'recipientId' => $recipientId,
                            'recipient_type' => $normalizedRecipientType,
                            'tried_coach' => true,
                            'tried_user' => true
                        ]);
                        return response()->json([
                            'success' => false,
                            'message' => 'Invalid recipient: Coach or User not found with ID ' . $recipientId
                        ], 400);
                    }
                }
            }
            
            // Log the message data before saving
            \Log::info('CommunicationController::sendMessage: Message data to save', [
                'messageData' => $messageData,
                'recipient_id' => $request->recipient_id,
                'recipient_type' => $request->recipient_type,
                'sender_coach_id' => $messageData['sender_coach_id'] ?? null,
                'receiver_coach_id' => $messageData['receiver_coach_id'] ?? null,
                'receiver_admin_id' => $messageData['receiver_admin_id'] ?? null,
                'receiver_member_id' => $messageData['receiver_member_id'] ?? null,
            ]);
            
            $message = MemberMessage::create($messageData);
            
            // Log the saved message to verify
            \Log::info('CommunicationController::sendMessage: Message saved', [
                'message_id' => $message->id,
                'sender_coach_id' => $message->sender_coach_id,
                'sender_admin_id' => $message->sender_admin_id,
                'sender_member_id' => $message->sender_member_id,
                'receiver_coach_id' => $message->receiver_coach_id,
                'receiver_admin_id' => $message->receiver_admin_id,
                'receiver_member_id' => $message->receiver_member_id,
            ]);
            
            // Create notifications for message sent
            try {
                $performedByUserId = $isAdmin ? $sender->id : ($isCoach ? $sender->id : ($sender->member_id ?? $sender->id));
                // Ensure gymId has a default value (method expects int, default is 1)
                $gymIdForNotification = $gymId ?? 1;
                
                // Check if method exists before calling (handles cases where method may not be deployed yet)
                if (method_exists(\App\Services\NotificationService::class, 'messageSent')) {
                    \App\Services\NotificationService::messageSent($message, $gymIdForNotification, $performedByUserId);
                } else {
                    // Method doesn't exist - log but don't fail
                    \Log::warning('NotificationService::messageSent method not available', [
                        'message_id' => $message->id,
                        'note' => 'Method may need to be deployed to production server'
                    ]);
                }
            } catch (\Exception $notificationException) {
                // Log notification error but don't fail the message sending
                \Log::warning('Failed to create notification for message', [
                    'message_id' => $message->id,
                    'error' => $notificationException->getMessage(),
                    'trace' => $notificationException->getTraceAsString()
                ]);
            }
            
            // Determine sender type for response
            $responseSenderType = $isCoach ? 'Trainer' : ($isAdmin ? 'Admin' : 'Member');
            $senderId = $isCoach ? $message->sender_coach_id : ($isAdmin ? $message->sender_admin_id : $message->sender_member_id);
            
            return response()->json([
                'success' => true,
                'message' => 'Message sent successfully',
                'data' => [
                    'id' => $message->id, // Use id as primary key
                    'sender_id' => $senderId,
                    'recipient_id' => $request->recipient_id,
                    'recipient_type' => $request->recipient_type,
                    'message' => $message->message_text,
                    'sender_type' => $responseSenderType,
                    'created_at' => $message->created_at->toISOString()
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error sending message: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create a new group chat
     */
    public function createGroup(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string|max:1000',
                'member_ids' => 'required|string', // JSON string from FormData
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            // Parse member_ids from JSON string
            $memberIds = json_decode($request->member_ids, true);
            if (!is_array($memberIds)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid member_ids format'
                ], 400);
            }

            // Validate member IDs (only if provided)
            if (!empty($memberIds)) {
                foreach ($memberIds as $memberId) {
                    if (!is_numeric($memberId) || !Member::find($memberId)) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Invalid member ID: ' . $memberId
                        ], 400);
                    }
                }
            }

            $user = $request->user('api');
            $gymId = $user->gym_id; // Get gym_id from authenticated user
            $userId = $user->id; // Get user_id from authenticated user

            // Handle avatar upload
            $avatarPath = null;
            if ($request->hasFile('avatar')) {
                $avatar = $request->file('avatar');
                $avatarName = time() . '_' . $avatar->getClientOriginalName();
                $avatar->move(public_path('images/groups'), $avatarName);
                $avatarPath = 'images/groups/' . $avatarName;
            }

            DB::beginTransaction();

            // Create the group with gym_id and user_id
            $groupData = [
                'name' => $request->name,
                'description' => $request->description
            ];

            // Only add avatar if the column exists in the database
            if (Schema::hasColumn('community_groups', 'avatar') && $avatarPath) {
                $groupData['avatar'] = $avatarPath;
            }

            // Only add status if the column exists
            if (Schema::hasColumn('community_groups', 'status')) {
                $groupData['status'] = 'active';
            }

            // Add gym_id if available and column exists
            if ($gymId && Schema::hasColumn('community_groups', 'gym_id')) {
                $groupData['gym_id'] = $gymId;
            }

            // Add user_id if available and column exists
            if ($userId && Schema::hasColumn('community_groups', 'user_id')) {
                $groupData['user_id'] = $userId;
            }

            $group = Group::create($groupData);

            // Get the group for response
            // Use membermessages if group_id column exists
            $groupWithMembers = Group::where('id', $group->id)->first();
            if (\Illuminate\Support\Facades\Schema::hasColumn('membermessages', 'group_id')) {
                $groupWithMembers->load(['messages']);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Group created successfully',
                'group' => $groupWithMembers
            ]);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Error creating group: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update an existing group
     */
    public function updateGroup(Request $request, $groupId)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string|max:1000',
                'member_ids' => 'required|string', // JSON string from FormData
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            $group = Group::find($groupId);
            if (!$group) {
                return response()->json([
                    'success' => false,
                    'message' => 'Group not found'
                ], 404);
            }

            // Parse member_ids from JSON string
            $memberIds = json_decode($request->member_ids, true);
            if (!is_array($memberIds)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid member_ids format'
                ], 400);
            }

            // Validate member IDs (only if provided)
            if (!empty($memberIds)) {
                foreach ($memberIds as $memberId) {
                    if (!is_numeric($memberId) || !Member::find($memberId)) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Invalid member ID: ' . $memberId
                        ], 400);
                    }
                }
            }

            // Handle avatar upload
            $avatarPath = null;
            if ($request->hasFile('avatar')) {
                $avatar = $request->file('avatar');
                $avatarName = time() . '_' . $avatar->getClientOriginalName();
                $avatar->move(public_path('images/groups'), $avatarName);
                $avatarPath = 'images/groups/' . $avatarName;
            }

            DB::beginTransaction();

            // Update the group data
            $groupData = [
                'name' => $request->name,
                'description' => $request->description
            ];

            // Only update avatar if the column exists and a new avatar was uploaded
            if (Schema::hasColumn('community_groups', 'avatar')) {
                if ($avatarPath) {
                    $groupData['avatar'] = $avatarPath;
                }
            }

            // Only update status if the column exists
            if (Schema::hasColumn('community_groups', 'status')) {
                $groupData['status'] = $request->status ?? $group->status ?? 'active';
            }

            $group->update($groupData);

            // Get the updated group for response
            // Use membermessages if group_id column exists
            $groupWithMembers = Group::where('id', $group->id)->first();
            if (\Illuminate\Support\Facades\Schema::hasColumn('membermessages', 'group_id')) {
                $groupWithMembers->load(['messages']);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Group updated successfully',
                'group' => $groupWithMembers
            ]);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Error updating group: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all groups for the current user
     */
    public function getGroups(Request $request)
    {
        try {
            $user = $request->user('api');
            $gymId = $user ? $user->gym_id : null;

            // Start query from community_groups table
            $groupsQuery = Group::query();

            // Add message count using membermessages table if group_id column exists
            if (\Illuminate\Support\Facades\Schema::hasColumn('membermessages', 'group_id')) {
                $groupsQuery->withCount([
                    'messages' => function($query) {
                        $query->where('group_id', '!=', null);
                    }
                ]);
            }

            // Log for debugging
            \Log::info('Getting groups', [
                'user_id' => $user ? $user->id : null,
                'gym_id' => $gymId,
                'has_status_column' => Schema::hasColumn('community_groups', 'status'),
                'has_gym_id_column' => Schema::hasColumn('community_groups', 'gym_id'),
            ]);

            // TEMPORARY: Get all groups first to debug
            // Check total groups in table
            $allGroupsCount = Group::count();
            \Log::info('Total groups in community_groups table', ['count' => $allGroupsCount]);

            // Only filter by status if the column exists and we want active groups
            // If status column doesn't exist, show all groups
            if (Schema::hasColumn('community_groups', 'status')) {
                $activeGroupsCount = Group::where('status', 'active')->count();
                \Log::info('Active groups count', ['count' => $activeGroupsCount]);
                $groupsQuery->where('status', 'active');
            }

            // Only filter by gym if the column exists and user has a gym_id
            // If gym_id column doesn't exist or user has no gym_id, show all groups
            if ($gymId && Schema::hasColumn('community_groups', 'gym_id')) {
                $gymGroupsCount = Group::where('gym_id', $gymId)->count();
                \Log::info('Groups for gym_id', ['gym_id' => $gymId, 'count' => $gymGroupsCount]);
                $groupsQuery->where('gym_id', $gymId);
            }

            // Get total count before mapping for debugging
            $totalCount = $groupsQuery->count();
            \Log::info('Groups query count', ['total' => $totalCount]);

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
                        'message_count' => $messageCount,
                        'member_count' => 0
                    ];
                    
                    // Only add avatar if the column exists
                    if (Schema::hasColumn('community_groups', 'avatar')) {
                        $groupData['avatar'] = $group->avatar;
                    }
                    
                    // Only add status if the column exists
                    if (Schema::hasColumn('community_groups', 'status')) {
                        $groupData['status'] = $group->status;
                    }
                    
                    // Only add created_at if the column exists
                    if (Schema::hasColumn('community_groups', 'created_at')) {
                        $groupData['created_at'] = $group->created_at;
                    }
                    
                    return $groupData;
                });

            \Log::info('Groups returned', [
                'count' => $groups->count(),
                'groups' => $groups->toArray()
            ]);

            return response()->json([
                'success' => true,
                'groups' => $groups,
                'total' => $groups->count()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching groups: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get group details with messages
     */
    public function getGroupDetails(Request $request, $groupId)
    {
        try {
            $group = Group::where('id', $groupId)->first();
            
            // Load messages from membermessages if group_id column exists
            if (\Illuminate\Support\Facades\Schema::hasColumn('membermessages', 'group_id')) {
                $group->load(['messages']);
            }

            if (!$group) {
                return response()->json([
                    'success' => false,
                    'message' => 'Group not found'
                ], 404);
            }

            $groupData = [
                'id' => $group->id,
                'name' => $group->name,
                'description' => $group->description,
                'created_at' => $group->created_at,
            ];

            // Only add avatar if the column exists
            if (Schema::hasColumn('community_groups', 'avatar')) {
                $groupData['avatar'] = $group->avatar;
            }

            // Only add status if the column exists
            if (Schema::hasColumn('community_groups', 'status')) {
                $groupData['status'] = $group->status;
            }

            // Get messages from membermessages if group_id column exists
            $messages = [];
            if (\Illuminate\Support\Facades\Schema::hasColumn('membermessages', 'group_id') && $group->messages) {
                $messages = $group->messages;
            } elseif ($group->messages) {
                $messages = $group->messages;
            }
            
            $groupData['messages'] = collect($messages)->map(function($message) {
                    $senderName = 'Unknown';
                    $senderAvatar = null;
                    
                    // Handle membermessages structure (sender_member_id, message_text) vs Message structure (sender_id, message)
                    $senderId = $message->sender_member_id ?? $message->sender_id ?? null;
                    $messageText = $message->message_text ?? $message->message ?? '';
                    $senderType = $message->sender_type ?? 'Member';
                    
                    // Get sender info - for membermessages, always use Member
                    if (isset($message->sender_member_id)) {
                        $sender = Member::find($message->sender_member_id);
                        if ($sender) {
                            $senderName = $sender->membername ?? ($sender->firstname . ' ' . $sender->lastname);
                            $senderAvatar = $sender->profile_image ? "/images/avatar/{$sender->profile_image}" : null;
                            $senderType = 'Member';
                        }
                    } else {
                        // Original Message structure
                        switch ($senderType) {
                            case 'Admin':
                                $sender = User::find($senderId);
                                if ($sender) {
                                    $senderName = $sender->firstname . ' ' . $sender->lastname;
                                    $senderAvatar = $sender->avatar ? "/images/avatar/{$sender->avatar}" : null;
                                }
                                break;
                                
                            case 'Member':
                                $sender = Member::find($senderId);
                                if ($sender) {
                                    $senderName = $sender->membername;
                                    $senderAvatar = $sender->profile_image ? "/images/avatar/{$sender->profile_image}" : null;
                                }
                                break;
                                
                            case 'Trainer':
                                $sender = Coach::find($senderId);
                                if ($sender) {
                                    $senderName = $sender->firstname . ' ' . $sender->lastname;
                                    $senderAvatar = $sender->avatar ? "/images/avatar/{$sender->avatar}" : null;
                                }
                                break;
                        }
                    }
                    
                    return [
                        'id' => $message->id,
                        'sender_id' => $senderId,
                        'sender_name' => $senderName ?? 'Unknown',
                        'sender_type' => $senderType,
                        'sender_avatar' => $senderAvatar ?? null,
                        'message' => $messageText,
                        'seen' => $message->seen ?? 0,
                        'created_at' => $message->created_at ?? $message->sent_date ?? now()
                    ];
                });

            return response()->json([
                'success' => true,
                'group' => $groupData
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching group details: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Send message to group
     */
    public function sendGroupMessage(Request $request, $groupId)
    {
        try {
            $request->validate([
                'message' => 'required|string|max:1000'
            ]);

            $user = Auth::user();
            
            // For now, allow any authenticated user to send messages to groups
            // You can add group membership validation later if needed

            // Use membermessages if group_id column exists, otherwise use Message model
            if (\Illuminate\Support\Facades\Schema::hasColumn('membermessages', 'group_id')) {
                $message = \App\Models\MemberMessage::create([
                    'group_id' => $groupId,
                    'sender_member_id' => $user->id, // Assuming user is a member
                    'message_text' => $request->message,
                    'gym_id' => $user->gym_id ?? null,
                    'sent_date' => now()
                ]);
            } else {
                $message = Message::create([
                    'sender_id' => $user->id,
                    'group_id' => $groupId,
                    'message' => $request->message,
                    'seen' => false
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Message sent successfully',
                'data' => [
                    'id' => $message->id,
                    'sender_id' => $message->sender_id,
                    'sender_name' => $user->firstname . ' ' . $user->lastname,
                    'message' => $message->message,
                    'created_at' => $message->created_at
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error sending group message: ' . $e->getMessage()
            ], 500);
        }
    }
} 