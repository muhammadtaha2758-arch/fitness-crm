<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\Member;
use App\Models\Coach;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class NoteController extends Controller
{
    /**
     * Get all notes for the authenticated coach
     */
    public function index(Request $request)
    {
        try {
            $user = $request->user('api');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            // Get gym_id from authenticated user
            $gymId = $user->gym_id ?? null;
            
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gym ID not found for user'
                ], 400);
            }

            // Build query for notes - filter by gym_id first
            $query = Note::query()
                ->where('gym_id', $gymId)
                ->with(['coach:id,first_name,last_name', 'member:id,firstname,lastname,membername', 'createdByUser:id,firstname,lastname,email']);

            // If the authenticated user is a coach (mobile app), show notes for them
            if ($user && isset($user->role_id) && (int)$user->role_id === 3) {
                // Find the coach record by email
                $coach = Coach::where('email', $user->email)
                    ->where('gym_id', $gymId)
                    ->first();

                if (!$coach) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Coach record not found'
                    ], 404);
                }

                // Show notes where:
                // 1. coach_id matches (notes created by this coach)
                // 2. OR target_coach_id matches (notes created by admin for this coach)
                $query->where(function($q) use ($coach) {
                    $q->where('coach_id', $coach->id)
                      ->orWhere('target_coach_id', $coach->id);
                });
            }

            // Apply filters
            if ($request->has('type') && $request->type !== '' && $request->type !== 'all') {
                // Map mobile app 'type' to database 'category'
                $categoryMap = [
                    'general' => 'General',
                    'progress' => 'Progress',
                    'nutrition' => 'Nutrition',
                    'workout' => 'Workout',
                    'training' => 'Training',
                    'coaching' => 'Coaching',
                    'invoices' => 'Invoices',
                    'files' => 'Files',
                ];
                $category = $categoryMap[$request->type] ?? ucfirst($request->type);
                $query->where('category', $category);
            }
            
            // Also support direct category filter (for CRM)
            if ($request->has('category') && $request->category !== '' && $request->category !== 'All') {
                $query->where('category', $request->category);
            }

            if ($request->has('member_id') && $request->member_id) {
                $query->where('member_id', $request->member_id);
            }

            // Order by created_at desc
            $query->orderBy('created_at', 'desc');

            // Paginate results
            $perPage = $request->get('per_page', 15);
            $notes = $query->paginate($perPage);

            // Transform notes to include mobile app expected fields
            $transformedNotes = $notes->getCollection()->map(function($note) {
                return [
                    'id' => $note->id,
                    'member_id' => $note->member_id,
                    'note' => $note->description, // Map description to 'note' for mobile app
                    'content' => $note->description, // Also include as 'content' for compatibility
                    'description' => $note->description, // Keep original field
                    'type' => strtolower($note->category), // Map category to 'type' for mobile app
                    'category' => $note->category, // Keep original field
                    'is_shared' => $note->is_shared ?? false, // Include visibility flag
                    'visibility' => ($note->is_shared ?? false) ? 'shared' : 'private', // Alternative field name
                    'coach_id' => $note->coach_id,
                    'created_at' => $note->created_at,
                    'updated_at' => $note->updated_at,
                    'member' => $note->member ? [
                        'id' => $note->member->id,
                        'name' => $note->member->membername ?? ($note->member->firstname . ' ' . $note->member->lastname),
                        'firstname' => $note->member->firstname,
                        'lastname' => $note->member->lastname,
                        'first_name' => $note->member->firstname, // Alias for compatibility
                        'last_name' => $note->member->lastname, // Alias for compatibility
                        'membername' => $note->member->membername,
                    ] : null,
                    'coach' => $note->coach ? [
                        'id' => $note->coach->id,
                        'first_name' => $note->coach->first_name,
                        'last_name' => $note->coach->last_name,
                    ] : null,
                ];
            });

            // Replace collection in paginator
            $notes->setCollection($transformedNotes);

            return response()->json([
                'success' => true,
                'data' => $notes
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch notes: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all notes for a specific member
     * For members: only return shared notes (is_shared = true)
     * For coaches: return all notes (used in coach app)
     */
    public function getMemberNotes(Request $request, $memberId)
    {
        try {
            \Log::info('getMemberNotes called', [
                'memberId' => $memberId,
                'request_url' => $request->fullUrl(),
                'request_method' => $request->method(),
                'has_api_user' => $request->user('api') ? 'yes' : 'no',
                'has_auth_user' => Auth::user() ? 'yes' : 'no',
            ]);
            
            $user = $request->user('api') ?? Auth::user();
            
            if (!$user) {
                \Log::error('getMemberNotes: No authenticated user found');
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }
            
            \Log::info('getMemberNotes - User authenticated', [
                'user_id' => $user->id,
                'user_email' => $user->email ?? 'N/A',
                'gym_id' => $user->gym_id ?? 'null',
            ]);
            
            // Get gym_id from authenticated user
            $gymId = $user->gym_id ?? null;
            
            if (!$gymId) {
                \Log::error('getMemberNotes: Gym ID not found for user ' . $user->id);
                return response()->json([
                    'success' => false,
                    'message' => 'Gym ID not found for user'
                ], 400);
            }

            // Check if user is admin (not a coach)
            $isAdmin = !isset($user->role_id) || (int)$user->role_id !== 3;
            $isCoach = isset($user->role_id) && (int)$user->role_id === 3;
            
            // Build query - for admin, check both member_id and target_member_id
            $query = Note::where('gym_id', $gymId) // Filter by gym_id
                ->where(function($q) use ($memberId, $isAdmin) {
                    if ($isAdmin) {
                        // Admin: show notes where target_member_id matches OR member_id matches
                        $q->where('target_member_id', $memberId)
                          ->orWhere('member_id', $memberId);
                    } else {
                        // Coach or member: use member_id
                        $q->where('member_id', $memberId);
                    }
                })
                ->with(['coach:id,first_name,last_name', 'createdByUser:id,firstname,lastname,email']);
            
            // If admin, show ALL notes for this member (any admin or coach can see all notes)
            // If coach, show all notes they created for this member OR notes shared with them
            // If member (mobile app), only show shared notes
            if ($isAdmin) {
                // Admin viewing: show ALL notes for this member (no filter by created_by_user_id)
                // Admins should see all notes created by any admin or coach for this member
                // Already filtered by target_member_id or member_id above
            } elseif ($isCoach) {
                // Coach viewing: show notes they created OR notes shared with them
                $query->where(function($q) use ($user) {
                    $q->where('created_by_user_id', $user->id)
                      ->orWhere('is_shared', true);
                });
            } else {
                // Member viewing: only show shared notes
                $query->where('is_shared', true);
            }
            
            $notes = $query->orderBy('created_at', 'desc')->get();

            // Normalize structure so frontend can distinguish coach vs admin
            $normalized = $notes->map(function ($note) {
                $creatorType = null;
                $creatorName = null;

                // Use created_by_name if available (set when note was created)
                if ($note->created_by_name) {
                    $creatorName = $note->created_by_name;
                    // Check if created by coach or admin based on created_by_user_id and coach_id
                    if ($note->created_by_user_id && $note->createdByUser) {
                        $creatorType = (isset($note->createdByUser->role_id) && (int)$note->createdByUser->role_id === 3) ? 'coach' : 'admin';
                    } else {
                        $creatorType = $note->coach_id ? 'coach' : 'admin';
                    }
                } elseif ($note->coach) {
                    $creatorType = 'coach';
                    $creatorName = trim(($note->coach->first_name ?? '') . ' ' . ($note->coach->last_name ?? ''));
                } elseif ($note->createdByUser) {
                    $creatorType = 'admin';
                    $creatorName = trim(($note->createdByUser->firstname ?? '') . ' ' . ($note->createdByUser->lastname ?? '')) ?: $note->createdByUser->email;
                }

                return [
                    'id' => $note->id,
                    'member_id' => $note->member_id,
                    'description' => $note->description,
                    'category' => $note->category,
                    'is_shared' => $note->is_shared ?? false,
                    'visibility' => ($note->is_shared ?? false) ? 'shared' : 'private',
                    'coach_id' => $note->coach_id,
                    'created_at' => $note->created_at,
                    'updated_at' => $note->updated_at,
                    'created_by_name' => $note->created_by_name,
                    'created_by_user_id' => $note->created_by_user_id,
                    'coach' => $note->coach ? [
                        'id' => $note->coach->id,
                        'first_name' => $note->coach->first_name,
                        'last_name' => $note->coach->last_name,
                    ] : null,
                    'created_by_user' => $note->createdByUser ? [
                        'id' => $note->createdByUser->id,
                        'name' => trim(($note->createdByUser->firstname ?? '') . ' ' . ($note->createdByUser->lastname ?? '')) ?: $note->createdByUser->email,
                        'email' => $note->createdByUser->email,
                    ] : null,
                    'creator_type' => $creatorType,
                    'creator_name' => $creatorName,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $normalized
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch notes: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a new note
     */
    public function store(Request $request)
    {
        // Accept both 'note' (mobile app) and 'description' (web) fields
        // Accept both 'type' (mobile app) and 'category' (web) fields
        $validator = Validator::make($request->all(), [
            'member_id' => 'nullable|exists:members,id',
            'target_member_id' => 'nullable|exists:members,id', // For admin to specify which member the note is for
            'coach_id' => 'nullable|exists:coaches,id', // For coach users only
            'target_coach_id' => 'nullable|exists:coaches,id', // For admin to specify which coach the note is for
            'description' => 'nullable|string|max:1000',
            'note' => 'nullable|string|max:1000',
            'category' => 'nullable|string|max:100',
            'type' => 'nullable|string|max:100',
            'is_shared' => 'nullable|boolean',
            'visibility' => 'nullable|string|in:private,shared', // Alternative field name for mobile app
        ]);

        // Check that at least one of note or description is provided
        if (empty($request->description) && empty($request->note)) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => ['note' => ['The note or description field is required.']]
            ], 422);
        }

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Get authenticated user (from middleware)
            // For web routes, Auth::user() should work
            $user = $request->user('api') ?? $request->get('auth_user') ?? Auth::user();
            
            \Log::info('Note store - Authentication check:', [
                'has_api_user' => $request->user('api') ? 'yes' : 'no',
                'has_auth_user' => $request->get('auth_user') ? 'yes' : 'no',
                'has_auth_user' => Auth::user() ? 'yes' : 'no',
                'user_id' => $user ? $user->id : 'null',
                'request_all' => $request->all(),
            ]);

            if (!$user) {
                \Log::error('Note store - No authenticated user found');
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            // Get gym_id from authenticated user
            $gymId = $user->gym_id ?? null;
            
            \Log::info('Note store - User info:', [
                'user_id' => $user->id,
                'user_email' => $user->email ?? 'N/A',
                'user_firstname' => $user->firstname ?? $user->first_name ?? 'N/A',
                'user_lastname' => $user->lastname ?? $user->last_name ?? 'N/A',
                'gym_id' => $gymId,
                'role_id' => $user->role_id ?? 'N/A',
            ]);
            
            if (!$gymId) {
                \Log::error('Note store - Gym ID not found for user ' . $user->id);
                return response()->json([
                    'success' => false,
                    'message' => 'Gym ID not found for user'
                ], 400);
            }

            // Check if user is admin (not a coach)
            $isAdmin = !isset($user->role_id) || (int)$user->role_id !== 3;
            
            // Default: no coach associated (e.g. CRM admin)
            $coach = null;
            $targetCoachId = null;

            // If this is a coach user (mobile role_id = 3), try to resolve their Coach record
            if (!$isAdmin && isset($user->role_id) && (int)$user->role_id === 3) {
                $coach = Coach::where('email', $user->email)
                    ->where('gym_id', $gymId)
                    ->first();

                if (!$coach) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Coach record not found'
                    ], 404);
                }
            }
            
            // If admin provides target_coach_id, validate it exists
            // Admin is not a coach, so coach_id should be null, but target_coach_id tracks which coach the note is for
            // Check for target_coach_id in multiple ways to handle different request formats
            $requestTargetCoachId = $request->input('target_coach_id') ?? $request->get('target_coach_id') ?? $request->target_coach_id ?? null;
            
            \Log::info('Request target_coach_id check:', [
                'requestTargetCoachId' => $requestTargetCoachId,
                'request_all' => $request->all(),
                'isAdmin' => $isAdmin,
                'has_target_coach_id' => $request->has('target_coach_id'),
            ]);
            
            if ($isAdmin && $requestTargetCoachId !== null && $requestTargetCoachId !== '' && $requestTargetCoachId !== '0') {
                $targetCoachId = (int)$requestTargetCoachId;
                
                // Only validate if targetCoachId is a valid integer > 0
                if ($targetCoachId > 0) {
                    $targetCoach = Coach::where('id', $targetCoachId)
                        ->where('gym_id', $gymId)
                        ->first();

                    if (!$targetCoach) {
                        \Log::warning("Target coach {$targetCoachId} not found in gym {$gymId}");
                        // Don't fail, just log - the note can still be created
                    } else {
                        \Log::info("Target coach {$targetCoachId} found and validated");
                    }
                } else {
                    $targetCoachId = null;
                }
            } else {
                // If not admin or no target_coach_id provided, set to null
                $targetCoachId = null;
                \Log::info('target_coach_id set to null - isAdmin: ' . ($isAdmin ? 'yes' : 'no') . ', requestTargetCoachId: ' . ($requestTargetCoachId ?? 'null'));
            }

            // Use note if provided, otherwise use description
            $description = $request->note ?? $request->description;

            // Map type to category - check multiple ways to get category
            $category = $request->input('category') ?? $request->get('category') ?? $request->category ?? null;
            
            // If category is empty/null, try to get from type
            if (empty($category) && $request->has('type') && $request->type) {
                $typeMap = [
                    'general' => 'General',
                    'check_in' => 'Check_in',
                    'coaching' => 'Coaching',
                    'invoices' => 'Invoices',
                    'files' => 'Files',
                    'nutrition' => 'Nutrition',
                    'workout' => 'Workout',
                    'member check-up' => 'member check-up',
                    'other' => 'other',
                ];
                $category = $typeMap[$request->type] ?? ucfirst($request->type);
            }
            // Ensure category is not empty, default to 'General'
            // Validate against ENUM values
            $validCategories = ['General', 'Check_in', 'Coaching', 'Invoices', 'Files', 'Nutrition', 'Workout', 'member check-up', 'other'];
            if (empty($category) || trim($category) === '' || !in_array($category, $validCategories)) {
                $category = 'General';
            }
            
            \Log::info('Category value:', ['category' => $category, 'request_category' => $request->category, 'request_all' => $request->all()]);
            
            // Determine a human-readable creator name - ALWAYS use the user's name (admin or coach)
            // This represents WHO created the note, not who the note is for
            $creatorName = null;
            // Fallbacks for CRM/admin users (Eloquent attributes, not native properties)
            // Try multiple ways to get the user's name
            $userFirstname = $user->firstname ?? $user->first_name ?? null;
            $userLastname = $user->lastname ?? $user->last_name ?? null;
            
            if (!empty($userFirstname) || !empty($userLastname)) {
                $creatorName = trim(($userFirstname ?? '') . ' ' . ($userLastname ?? ''));
            }
            
            // If still empty, try email
            if (empty($creatorName) && !empty($user->email)) {
                $creatorName = $user->email;
            }
            
            // Final fallback: if user info not available but coach is, use coach name
            if (empty($creatorName) && $coach) {
                $creatorName = trim(($coach->first_name ?? '') . ' ' . ($coach->last_name ?? ''));
            }
            
            // Ultimate fallback
            if (empty($creatorName)) {
                $creatorName = 'Unknown User';
            }
            
            \Log::info('Creator name determined:', [
                'creatorName' => $creatorName,
                'user_id' => $user->id,
                'user_firstname' => $userFirstname,
                'user_lastname' => $userLastname,
                'user_email' => $user->email ?? 'N/A'
            ]);

            // Handle visibility/is_shared field (accept both field names)
            // Check multiple ways to get is_shared value
            $isShared = false; // Default to private
            $requestIsShared = $request->input('is_shared') ?? $request->get('is_shared') ?? $request->is_shared ?? null;
            
            if ($requestIsShared !== null) {
                // Handle string "true"/"false", boolean true/false, integer 1/0, string "1"/"0"
                if (is_string($requestIsShared)) {
                    $isShared = in_array(strtolower($requestIsShared), ['true', '1', 'yes', 'on']);
                } else {
                    $isShared = filter_var($requestIsShared, FILTER_VALIDATE_BOOLEAN);
                }
            } elseif ($request->has('visibility')) {
                $isShared = $request->visibility === 'shared';
            }

            // Handle target_member_id for admin-created notes
            // If admin provides member_id, it should be stored in target_member_id
            // member_id should be null for admin-created notes (admin is not a member)
            $requestMemberId = $request->input('member_id') ?? $request->get('member_id') ?? $request->member_id ?? null;
            $requestTargetMemberId = $request->input('target_member_id') ?? $request->get('target_member_id') ?? $request->target_member_id ?? null;
            
            $targetMemberId = null;
            $memberId = null;
            
            if ($isAdmin) {
                // Admin creating note: use target_member_id to track which member the note is for
                if ($requestTargetMemberId !== null && $requestTargetMemberId !== '' && $requestTargetMemberId !== '0') {
                    $targetMemberId = (int)$requestTargetMemberId;
                } elseif ($requestMemberId !== null && $requestMemberId !== '' && $requestMemberId !== '0') {
                    // If target_member_id not provided but member_id is, use member_id as target_member_id
                    $targetMemberId = (int)$requestMemberId;
                }
                // member_id should be null for admin-created notes
                $memberId = null;
            } else {
                // Coach or member creating note: use member_id normally
                if ($requestMemberId !== null && $requestMemberId !== '' && $requestMemberId !== '0') {
                    $memberId = (int)$requestMemberId;
                }
                // target_member_id is null for non-admin created notes
                $targetMemberId = null;
            }
            
            // Build note data array - ensure all fields are explicitly set
            $noteData = [
                'member_id' => $memberId,
                'target_member_id' => $targetMemberId,
                'description' => $description,
                'category' => $category ?? 'General', // Ensure category is always set
                'created_by' => (string)$user->id, // Original created_by column (varchar(50)) - must be string
                'created_by_name' => $creatorName, // Already determined above with fallbacks
                'created_by_user_id' => (int)$user->id, // Track which user (admin or coach) created the note - ensure it's int
                'is_shared' => (bool)$isShared, // Ensure it's boolean
                'gym_id' => (int)$gymId, // Always set gym_id from authenticated user - ensure it's int
            ];
            
            // Only set coach_id if the user is actually a coach (not an admin)
            // Admin is not a coach, so coach_id should be null for admin-created notes
            if (!$isAdmin && $coach) {
                // Coach user: set coach_id to their own ID
                $noteData['coach_id'] = (int)$coach->id;
            } else {
                // Admin: explicitly set coach_id to null
                $noteData['coach_id'] = null;
            }
            
            // If admin provided target_coach_id, store it to track which coach the note is for
            // Ensure it's stored as integer for consistency
            // Always try to get target_coach_id from request, even if previous check failed
            if ($isAdmin) {
                // Try again to get target_coach_id from request
                $finalTargetCoachId = $requestTargetCoachId ?? $targetCoachId ?? null;
                
                if ($finalTargetCoachId !== null && $finalTargetCoachId !== '' && $finalTargetCoachId !== '0') {
                    $finalTargetCoachId = (int)$finalTargetCoachId;
                    if ($finalTargetCoachId > 0) {
                        $noteData['target_coach_id'] = $finalTargetCoachId;
                        \Log::info("Setting target_coach_id to: {$finalTargetCoachId}");
                    } else {
                        $noteData['target_coach_id'] = null;
                    }
                } else {
                    $noteData['target_coach_id'] = null;
                    \Log::warning("target_coach_id is null or invalid - finalTargetCoachId: " . ($finalTargetCoachId ?? 'null'));
                }
            } else {
                // Not admin, so no target_coach_id
                $noteData['target_coach_id'] = null;
            }
            
            // Log the data being saved for debugging
            \Log::info('Note data before save:', [
                'member_id' => $noteData['member_id'],
                'target_member_id' => $noteData['target_member_id'],
                'category' => $noteData['category'],
                'created_by' => $noteData['created_by'],
                'created_by_name' => $noteData['created_by_name'],
                'created_by_user_id' => $noteData['created_by_user_id'],
                'target_coach_id' => $noteData['target_coach_id'],
                'is_shared' => $noteData['is_shared'],
                'coach_id' => $noteData['coach_id'],
                'gym_id' => $noteData['gym_id'],
                'description_length' => strlen($noteData['description']),
                'request_target_coach_id' => $requestTargetCoachId,
                'request_member_id' => $requestMemberId,
                'request_target_member_id' => $requestTargetMemberId,
                'isAdmin' => $isAdmin,
            ]);
            
            \Log::info('Creating note with data:', $noteData);
            
            // Ensure category is set before creating
            if (empty($noteData['category'])) {
                $noteData['category'] = 'General';
                \Log::warning('Category was empty, setting to General');
            }
            
            // Ensure all required fields are set and not null (except where null is expected)
            // Double-check critical fields
            if (empty($noteData['created_by'])) {
                $noteData['created_by'] = (string)$user->id;
            }
            if (empty($noteData['created_by_name'])) {
                $noteData['created_by_name'] = $user->email ?? 'Unknown';
            }
            if (empty($noteData['created_by_user_id'])) {
                $noteData['created_by_user_id'] = (int)$user->id;
            }
            
            // Log final data before create
            \Log::info('Final note data before create:', $noteData);
            
            // Create note - use ONLY explicit assignment (no fill() or create()) to bypass any mass assignment issues
            $note = new Note();
            
            // Explicitly set each field directly on the model instance
            // This bypasses mass assignment and ensures all fields are saved
            $note->member_id = $noteData['member_id'];
            $note->target_member_id = $noteData['target_member_id'];
            $note->description = $noteData['description'];
            $note->category = $noteData['category'];
            $note->created_by = $noteData['created_by'];
            $note->created_by_name = $noteData['created_by_name'];
            $note->created_by_user_id = $noteData['created_by_user_id'];
            $note->coach_id = $noteData['coach_id'];
            $note->target_coach_id = $noteData['target_coach_id'];
            $note->is_shared = $noteData['is_shared'];
            $note->gym_id = $noteData['gym_id'];
            
            // Log what we're about to save (before save)
            \Log::info('About to save note - model attributes:', [
                'member_id' => $note->member_id,
                'target_member_id' => $note->target_member_id,
                'description' => substr($note->description ?? '', 0, 50),
                'category' => $note->category,
                'created_by' => $note->created_by,
                'created_by_name' => $note->created_by_name,
                'created_by_user_id' => $note->created_by_user_id,
                'coach_id' => $note->coach_id,
                'target_coach_id' => $note->target_coach_id,
                'is_shared' => $note->is_shared,
                'gym_id' => $note->gym_id,
            ]);
            
            // Save the note
            $saved = $note->save();
            
            \Log::info('Note save result: ' . ($saved ? 'SUCCESS' : 'FAILED') . ', Note ID: ' . ($note->id ?? 'null'));
            
            // If save failed or note ID is null, try direct DB insert as fallback
            if (!$saved || !$note->id) {
                \Log::error('Eloquent save failed or no ID returned, trying direct DB insert');
                try {
                    $insertData = [
                        'member_id' => $noteData['member_id'],
                        'description' => $noteData['description'],
                        'category' => $noteData['category'],
                        'created_by' => $noteData['created_by'],
                        'created_by_name' => $noteData['created_by_name'],
                        'created_by_user_id' => $noteData['created_by_user_id'],
                        'coach_id' => $noteData['coach_id'],
                        'target_coach_id' => $noteData['target_coach_id'],
                        'is_shared' => $noteData['is_shared'] ? 1 : 0, // Convert boolean to int for DB
                        'gym_id' => $noteData['gym_id'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                    \Log::info('Attempting direct DB insert with data:', $insertData);
                    $insertId = DB::table('notes')->insertGetId($insertData);
                    \Log::info('Direct DB insert succeeded with ID: ' . $insertId);
                    $note = Note::find($insertId);
                    if (!$note) {
                        throw new \Exception('Note not found after direct insert');
                    }
                } catch (\Exception $e) {
                    \Log::error('Direct DB insert also failed: ' . $e->getMessage());
                    throw $e;
                }
            }
            
            // Reload note from database to verify what was actually saved
            $note->refresh();
            
            \Log::info('Note created with ID: ' . $note->id . ', category: ' . ($note->category ?? 'null') . ', created_by: ' . ($note->created_by ?? 'null') . ', created_by_name: ' . ($note->created_by_name ?? 'null') . ', created_by_user_id: ' . ($note->created_by_user_id ?? 'null') . ', coach_id: ' . ($note->coach_id ?? 'null') . ', target_coach_id: ' . ($note->target_coach_id ?? 'null') . ', is_shared: ' . ($note->is_shared ?? 'null') . ', gym_id: ' . ($note->gym_id ?? 'null'));
            
            // If any critical fields are still null, try to update them using direct DB update
            $needsUpdate = false;
            $updateData = [];
            
            if (empty($note->created_by) || $note->created_by === null) {
                $updateData['created_by'] = (string)$user->id;
                $needsUpdate = true;
            }
            if (empty($note->created_by_name) || $note->created_by_name === null) {
                $updateData['created_by_name'] = $creatorName;
                $needsUpdate = true;
            }
            if (empty($note->created_by_user_id) || $note->created_by_user_id === null) {
                $updateData['created_by_user_id'] = (int)$user->id;
                $needsUpdate = true;
            }
            if (($note->target_coach_id === null || $note->target_coach_id === '') && isset($targetCoachId) && $targetCoachId > 0) {
                $updateData['target_coach_id'] = (int)$targetCoachId;
                $needsUpdate = true;
            } elseif ($isAdmin && ($note->target_coach_id === null || $note->target_coach_id === '') && $requestTargetCoachId) {
                // Fallback: try to get from request again
                $finalTargetCoachId = (int)$requestTargetCoachId;
                if ($finalTargetCoachId > 0) {
                    $updateData['target_coach_id'] = $finalTargetCoachId;
                    $needsUpdate = true;
                }
            }
            if ($note->is_shared === null) {
                $updateData['is_shared'] = (bool)$isShared;
                $needsUpdate = true;
            }
            
            if ($needsUpdate) {
                \Log::warning('Some fields were null after create, updating: ' . json_encode($updateData));
                
                // Use direct DB update to bypass any Eloquent issues
                DB::table('notes')
                    ->where('id', $note->id)
                    ->update($updateData);
                
                $note->refresh();
                \Log::info('Note updated via DB, new values: created_by=' . ($note->created_by ?? 'null') . ', created_by_name=' . ($note->created_by_name ?? 'null') . ', created_by_user_id=' . ($note->created_by_user_id ?? 'null') . ', target_coach_id=' . ($note->target_coach_id ?? 'null') . ', is_shared=' . ($note->is_shared ?? 'null'));
            }
            
            // Verify category was saved
            if (empty($note->category)) {
                \Log::error('Category is empty after save! Attempting to update...');
                $note->update(['category' => $noteData['category'] ?? 'General']);
                $note->refresh();
                \Log::info('Category after update: ' . $note->category);
            }

            // Load coach relationship
            $note->load('coach:id,first_name,last_name');

            // Create notifications for note creation
            try {
                $performedByUserId = $user->id;
                NotificationService::noteCreated($note, $gymId, $performedByUserId);
            } catch (\Exception $notificationException) {
                // Log notification error but don't fail the note creation
                \Log::warning('Failed to create notification for note', [
                    'note_id' => $note->id,
                    'error' => $notificationException->getMessage()
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Note created successfully',
                'data' => $note
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create note: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update an existing note
     */
    public function update(Request $request, $id)
    {
        $user = $request->user('api') ?? $request->get('auth_user') ?? Auth::user();
        
        // Accept both 'note' (mobile app) and 'description' (web) fields
        // Accept both 'type' (mobile app) and 'category' (web) fields
        $validator = Validator::make($request->all(), [
            'description' => 'nullable|string|max:1000',
            'note' => 'nullable|string|max:1000',
            'category' => 'nullable|string|max:100',
            'type' => 'nullable|string|max:100',
            'is_shared' => 'nullable|boolean',
            'visibility' => 'nullable|string|in:private,shared', // Alternative field name for mobile app
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Get gym_id from authenticated user
            $gymId = $user->gym_id ?? null;
            
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gym ID not found for user'
                ], 400);
            }

            $note = Note::where('id', $id)
                ->where('gym_id', $gymId)
                ->firstOrFail();
            
            // For mobile coaches, ensure they can only update their own notes
            if ($user && $user->role_id == 3) {
                $coach = Coach::where('email', $user->email)
                    ->where('gym_id', $gymId)
                    ->first();
                
                if (!$coach || $note->coach_id != $coach->id) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Note not found'
                    ], 404);
                }
            }

            // Use note if provided, otherwise use description
            $updateData = [];
            if ($request->has('note') || $request->has('description')) {
                $updateData['description'] = $request->note ?? $request->description;
            }
            
            // Map type to category
            if ($request->has('type') || $request->has('category')) {
                if ($request->has('type') && !empty($request->type)) {
                    $typeMap = [
                        'general' => 'General',
                        'progress' => 'Progress',
                        'nutrition' => 'Nutrition',
                        'workout' => 'Workout',
                        'training' => 'Training',
                        'coaching' => 'Coaching',
                        'invoices' => 'Invoices',
                        'files' => 'Files',
                    ];
                    $updateData['category'] = $typeMap[$request->type] ?? ucfirst($request->type);
                } elseif ($request->has('category') && !empty($request->category)) {
                    $updateData['category'] = $request->category;
                } else {
                    // Default to 'General' if category is empty
                    $updateData['category'] = 'General';
                }
            }
            
            // Handle visibility/is_shared field
            if ($request->has('is_shared')) {
                $updateData['is_shared'] = filter_var($request->is_shared, FILTER_VALIDATE_BOOLEAN);
            } elseif ($request->has('visibility')) {
                $updateData['is_shared'] = $request->visibility === 'shared';
            }

            // Always update gym_id to ensure it matches the current user's gym_id
            $updateData['gym_id'] = $gymId;

            $note->update($updateData);

            $note->load('coach:id,first_name,last_name');

            return response()->json([
                'success' => true,
                'message' => 'Note updated successfully',
                'data' => $note
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update note: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a note
     */
    public function destroy(Request $request, $id)
    {
        try {
            $user = $request->user('api') ?? $request->get('auth_user') ?? Auth::user();
            
            // Get gym_id from authenticated user
            $gymId = $user->gym_id ?? null;
            
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gym ID not found for user'
                ], 400);
            }

            $note = Note::where('id', $id)
                ->where('gym_id', $gymId)
                ->firstOrFail();
            
            // For mobile coaches, ensure they can only delete their own notes
            if ($user && $user->role_id == 3) {
                $coach = Coach::where('email', $user->email)
                    ->where('gym_id', $gymId)
                    ->first();
                
                if (!$coach || $note->coach_id != $coach->id) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Note not found'
                    ], 404);
                }
            }
            
            $note->delete();

            return response()->json([
                'success' => true,
                'message' => 'Note deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete note: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all notes for a specific coach (for CRM admin view)
     */
    public function getCoachNotes(Request $request, $coachId)
    {
        try {
            $user = $request->user('api') ?? Auth::user();
            
            if (!$user) {
                \Log::error('getCoachNotes: No authenticated user found');
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthenticated'
                ], 401);
            }
            
            // Get gym_id from authenticated user
            $gymId = $user->gym_id ?? null;
            
            if (!$gymId) {
                \Log::error("getCoachNotes: Gym ID not found for user {$user->id}");
                return response()->json([
                    'success' => false,
                    'message' => 'Gym ID not found for user'
                ], 400);
            }

            // Build query for notes - filter by gym_id
            // Cast coachId to integer to ensure proper matching
            $coachId = (int)$coachId;
            
            // Log initial request details for debugging
            \Log::info("getCoachNotes - User ID: {$user->id}, Role ID: " . ($user->role_id ?? 'null') . ", Gym ID: {$gymId}, Coach ID: {$coachId}, Request URL: " . $request->fullUrl());
            
            // Check if user is admin (not a coach)
            $isAdmin = !isset($user->role_id) || (int)$user->role_id !== 3;
            
            \Log::info("getCoachNotes - User is admin: " . ($isAdmin ? 'yes' : 'no'));
            
            $query = Note::query()
                ->where('gym_id', $gymId)
                ->with(['coach:id,first_name,last_name', 'member:id,firstname,lastname,membername', 'createdByUser:id,firstname,lastname,email']);
            
            // If admin, show all notes for this coach (using target_coach_id)
            // If coach, show notes where coach_id matches OR target_coach_id matches
            if ($isAdmin) {
                // Admin viewing: show all notes for this coach
                // Admin notes have coach_id = null, so we filter by target_coach_id
                // Handle both int and string types for target_coach_id
                // Show all notes for the coach (created by any admin user)
                // Use a very permissive query to catch any notes for this coach
                $query->where(function($q) use ($coachId) {
                    $q->where('target_coach_id', $coachId)
                      ->orWhere('target_coach_id', (string)$coachId)
                      ->orWhere('target_coach_id', (int)$coachId)
                      ->orWhereRaw('target_coach_id = ?', [$coachId])
                      ->orWhereRaw('target_coach_id = ?', [(string)$coachId])
                      ->orWhereRaw('target_coach_id = ?', [(int)$coachId])
                      ->orWhereRaw('CAST(target_coach_id AS CHAR) = ?', [(string)$coachId])
                      ->orWhereRaw('CAST(target_coach_id AS UNSIGNED) = ?', [(int)$coachId]);
                });
                // Note: We're not filtering by created_by_user_id here because
                // admins should see all notes for a coach, regardless of which admin created them
                
                // Log what we're searching for
                \Log::info("Admin query - searching for target_coach_id: {$coachId} (int), '" . (string)$coachId . "' (string)");
            } else {
                // Coach viewing: show notes where:
                // 1. coach_id matches AND they created it (their own notes)
                // 2. OR target_coach_id matches (notes created by admin for this coach)
                $query->where(function($q) use ($coachId, $user) {
                    $q->where(function($subQ) use ($coachId, $user) {
                        $subQ->where('coach_id', $coachId)
                             ->where('created_by_user_id', $user->id);
                    })->orWhere('target_coach_id', $coachId);
                });
            }
            
            // Debug: Count before applying category filter
            $countBeforeCategory = $query->count();
            \Log::info("Loading notes for coach {$coachId}, isAdmin: " . ($isAdmin ? 'yes' : 'no') . ", user_id: {$user->id}, gym_id: {$gymId}, count before category filter: {$countBeforeCategory}");
            
            // Debug: Show the actual SQL query
            \Log::info("Query SQL: " . $query->toSql());
            \Log::info("Query bindings: " . json_encode($query->getBindings()));
            
            // Debug: Check if note exists with these exact conditions
            $debugNote = Note::where('gym_id', $gymId)
                ->where('created_by_user_id', $user->id)
                ->where('target_coach_id', $coachId)
                ->first();
            \Log::info("Debug note found: " . ($debugNote ? "Yes, ID: {$debugNote->id}, category: {$debugNote->category}, target_coach_id: {$debugNote->target_coach_id}" : "No"));
            
            // Also check all notes for this user to see what exists
            $allUserNotes = Note::where('gym_id', $gymId)
                ->where('created_by_user_id', $user->id)
                ->get(['id', 'target_coach_id', 'coach_id', 'category', 'description', 'created_at']);
            \Log::info("All notes for user {$user->id} in gym {$gymId}: " . $allUserNotes->toJson());
            
            // Check notes with target_coach_id matching (as both int and string)
            $notesByTarget = Note::where('gym_id', $gymId)
                ->where('created_by_user_id', $user->id)
                ->where(function($q) use ($coachId) {
                    $q->where('target_coach_id', $coachId)
                      ->orWhere('target_coach_id', (string)$coachId);
                })
                ->get(['id', 'target_coach_id', 'category']);
            \Log::info("Notes with target_coach_id = {$coachId} (as int or string): " . $notesByTarget->toJson());

            // Apply filters
            if ($request->has('category') && $request->category !== '' && $request->category !== 'All') {
                $query->where('category', $request->category);
            }

            if ($request->has('member_id') && $request->member_id) {
                $query->where('member_id', $request->member_id);
            }

            // Order by created_at desc
            $query->orderBy('created_at', 'desc');

            // Get all notes (no pagination for CRM view)
            $notes = $query->get();
            
            \Log::info("Found {$notes->count()} notes after all filters");
            
            // If no notes found, try progressively simpler queries as fallback
            if ($notes->count() === 0 && $isAdmin) {
                // Try 1: Basic query with just target_coach_id and gym_id
                $basicQuery = Note::where('gym_id', $gymId)
                    ->where('target_coach_id', $coachId)
                    ->with(['coach:id,first_name,last_name', 'member:id,firstname,lastname,membername', 'createdByUser:id,firstname,lastname,email'])
                    ->orderBy('created_at', 'desc')
                    ->get();
                \Log::info("Basic query (gym_id={$gymId}, target_coach_id={$coachId}): " . $basicQuery->count() . " notes");
                
                if ($basicQuery->count() > 0) {
                    \Log::info("Basic query found notes! Using these instead.");
                    $notes = $basicQuery;
                } else {
                    // Try 2: Without gym_id filter (in case gym_id is wrong)
                    $noGymQuery = Note::where('target_coach_id', $coachId)
                        ->with(['coach:id,first_name,last_name', 'member:id,firstname,lastname,membername', 'createdByUser:id,firstname,lastname,email'])
                        ->orderBy('created_at', 'desc')
                        ->get();
                    \Log::info("Query without gym_id filter: " . $noGymQuery->count() . " notes");
                    if ($noGymQuery->count() > 0) {
                        \Log::warning("Found notes without gym_id filter! This suggests a gym_id mismatch. Gym ID used: {$gymId}");
                        $notes = $noGymQuery;
                    }
                }
            }
            
            // Additional debugging: Check what exists in database
            if ($notes->count() === 0 && $isAdmin) {
                // First, check if ANY notes exist for this coach (ignore created_by_user_id)
                $anyNotesForCoach = Note::where('gym_id', $gymId)
                    ->where(function($q) use ($coachId) {
                        $q->where('target_coach_id', $coachId)
                          ->orWhere('target_coach_id', (string)$coachId)
                          ->orWhere('target_coach_id', (int)$coachId)
                          ->orWhereRaw('CAST(target_coach_id AS CHAR) = ?', [(string)$coachId])
                          ->orWhereRaw('CAST(target_coach_id AS UNSIGNED) = ?', [(int)$coachId]);
                    })
                    ->get(['id', 'target_coach_id', 'coach_id', 'created_by_user_id', 'gym_id', 'category', 'description']);
                \Log::info("Any notes for coach {$coachId} in gym {$gymId} (ignoring user_id): " . $anyNotesForCoach->count());
                \Log::info("Any notes for coach: " . $anyNotesForCoach->toJson());
                
                // Check if notes exist with different user_id
                $notesWithDifferentUser = Note::where('gym_id', $gymId)
                    ->where(function($q) use ($coachId) {
                        $q->where('target_coach_id', $coachId)
                          ->orWhere('target_coach_id', (string)$coachId)
                          ->orWhere('target_coach_id', (int)$coachId);
                    })
                    ->get(['id', 'target_coach_id', 'created_by_user_id', 'gym_id']);
                \Log::info("Notes for coach {$coachId} with any user_id: " . $notesWithDifferentUser->toJson());
                
                // Try a completely unfiltered query to see what exists
                $allNotesInGym = Note::where('gym_id', $gymId)->get(['id', 'target_coach_id', 'coach_id', 'created_by_user_id', 'gym_id', 'category']);
                \Log::info("Total notes in gym {$gymId}: " . $allNotesInGym->count());
                \Log::info("All notes in gym: " . $allNotesInGym->toJson());
                
                // Check notes with matching user_id
                $userNotes = Note::where('gym_id', $gymId)
                    ->where('created_by_user_id', $user->id)
                    ->get(['id', 'target_coach_id', 'coach_id', 'gym_id']);
                \Log::info("Notes created by user {$user->id} in gym {$gymId}: " . $userNotes->count());
                \Log::info("User notes: " . $userNotes->toJson());
                
                // Check notes with matching target_coach_id (any type)
                $coachNotes = Note::where('gym_id', $gymId)
                    ->where(function($q) use ($coachId) {
                        $q->where('target_coach_id', $coachId)
                          ->orWhere('target_coach_id', (string)$coachId)
                          ->orWhere('target_coach_id', (int)$coachId);
                    })
                    ->get(['id', 'target_coach_id', 'coach_id', 'created_by_user_id', 'gym_id']);
                \Log::info("Notes with target_coach_id matching {$coachId} in gym {$gymId}: " . $coachNotes->count());
                \Log::info("Coach notes: " . $coachNotes->toJson());
                
                // If notes exist but with different user_id, return them anyway (temporary fix)
                if ($anyNotesForCoach->count() > 0) {
                    \Log::warning("Found {$anyNotesForCoach->count()} notes for coach {$coachId} but with different created_by_user_id. Returning them anyway.");
                    // Load full relationships and return notes even if created_by_user_id doesn't match
                    $notes = Note::whereIn('id', $anyNotesForCoach->pluck('id'))
                        ->with(['coach:id,first_name,last_name', 'member:id,firstname,lastname,membername', 'createdByUser:id,firstname,lastname,email'])
                        ->orderBy('created_at', 'desc')
                        ->get();
                }
            }

            // Transform notes to match CRM expected format
            $transformedNotes = $notes->map(function($note) {
                return [
                    'id' => $note->id,
                    'text' => $note->description,
                    'description' => $note->description,
                    'category' => $note->category,
                    'member_id' => $note->member_id,
                    'coach_id' => $note->coach_id,
                    'target_coach_id' => $note->target_coach_id,
                    'is_shared' => $note->is_shared ?? false,
                    'createdAt' => $note->created_at,
                    'created_at' => $note->created_at,
                    'updated_at' => $note->updated_at,
                    'member' => $note->member ? [
                        'id' => $note->member->id,
                        'name' => $note->member->membername ?? ($note->member->firstname . ' ' . $note->member->lastname),
                        'firstname' => $note->member->firstname,
                        'lastname' => $note->member->lastname,
                    ] : null,
                    'coach' => $note->coach ? [
                        'id' => $note->coach->id,
                        'first_name' => $note->coach->first_name,
                        'last_name' => $note->coach->last_name,
                    ] : null,
                    'created_by_user_id' => $note->created_by_user_id,
                    'created_by_name' => $note->created_by_name,
                    'created_by_user' => $note->createdByUser ? [
                        'id' => $note->createdByUser->id,
                        'name' => trim(($note->createdByUser->firstname ?? '') . ' ' . ($note->createdByUser->lastname ?? '')) ?: $note->createdByUser->email,
                        'email' => $note->createdByUser->email,
                    ] : null,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedNotes
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch notes: ' . $e->getMessage()
            ], 500);
        }
    }
}
