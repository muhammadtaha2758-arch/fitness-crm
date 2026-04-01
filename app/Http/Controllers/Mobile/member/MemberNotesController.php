<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\Note;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MemberNotesController extends Controller
{
    /**
     * Get all notes for the authenticated member
     */
    public function index(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not authenticated'
                ], 401);
            }

            // Get the actual member_id (handles both User and Member instances)
            $memberId = $member->member_id ?? $member->id;
            
            // Get gym_id for additional filtering (data isolation)
            $gymId = $member->gym_id ?? null;
            
            // Build query for notes
            $query = Note::where('member_id', $memberId)
                ->with(['coach:id,first_name,last_name']);
            
            // Filter by gym_id if available (for data isolation)
            if ($gymId) {
                $query->where('gym_id', $gymId);
            }

            // Apply filters
            if ($request->has('type') && $request->type !== '' && $request->type !== 'all') {
                // Map mobile app 'type' to database 'category'
                $categoryMap = [
                    'general' => 'General',
                    'check-in' => 'Check-in',
                    'coaching' => 'Coaching',
                    'invoices' => 'Invoices',
                    'files' => 'Files',
                    'member-check-up' => 'member Check-up',
                    'others' => 'others',
                ];
                $category = $categoryMap[$request->type] ?? $request->type;
                $query->where('category', $category);
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
                    'coach_id' => $note->coach_id,
                    'created_at' => $note->created_at,
                    'updated_at' => $note->updated_at,
                    'coach' => $note->coach ? [
                        'id' => $note->coach->id,
                        'first_name' => $note->coach->first_name,
                        'last_name' => $note->coach->last_name,
                        'name' => $note->coach->first_name . ' ' . $note->coach->last_name,
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
     * Store a new note (created by member)
     */
    public function store(Request $request)
    {
        // Accept both 'note' (mobile app) and 'description' (web) fields
        // Accept both 'type' (mobile app) and 'category' (web) fields
        $validator = Validator::make($request->all(), [
            'description' => 'nullable|string|max:1000',
            'note' => 'nullable|string|max:1000',
            'category' => 'nullable|string|max:100',
            'type' => 'nullable|string|max:100',
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
            $member = $request->get('auth_member');
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not authenticated'
                ], 401);
            }
            
            // Get the actual member_id (handles both User and Member instances)
            $memberId = $member->member_id ?? $member->id;
            
            // Get gym_id from member
            $gymId = $member->gym_id ?? null;
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member is not associated with any gym'
                ], 400);
            }
            
            // Get coach_id from members table
            // If auth_member is User instance, we need to get the actual Member record
            $coachId = null;
            if ($memberId != $member->id) {
                // auth_member is User instance, get Member record to access coach_id
                $memberRecord = Member::find($memberId);
                if ($memberRecord) {
                    $coachId = $memberRecord->coach_id ?? null;
                }
            } else {
                // auth_member is Member instance, use coach_id directly
                $coachId = $member->coach_id ?? null;
            }
            
            // Use note if provided, otherwise use description
            $description = $request->note ?? $request->description;
            
            // Map type to category
            $category = $request->category;
            if (!$category && $request->type) {
                $typeMap = [
                    'general' => 'General',
                    'check-in' => 'Check-in',
                    'coaching' => 'Coaching',
                    'invoices' => 'Invoices',
                    'files' => 'Files',
                    'member-check-up' => 'member Check-up',
                    'others' => 'others',
                ];
                $category = $typeMap[$request->type] ?? $request->type;
            }
            
            $noteData = [
                'member_id' => $memberId, // Use actual member_id from members table
                'description' => $description,
                'category' => $category ?? 'General',
                'coach_id' => $coachId, // Member's assigned coach (can be null if no coach assigned)
                'gym_id' => $gymId, // Member's gym
                'deleted_at' => null, // Explicitly set to null to prevent MySQL storing 0000-00-00 00:00:00
            ];
            
            // Create note
            $note = Note::create($noteData);

            // Load relationships
            $note->load('coach:id,first_name,last_name');

            // Transform response
            $transformedNote = [
                'id' => $note->id,
                'member_id' => $note->member_id,
                'note' => $note->description,
                'content' => $note->description,
                'description' => $note->description,
                'type' => strtolower($note->category),
                'category' => $note->category,
                'coach_id' => $note->coach_id,
                'created_at' => $note->created_at,
                'updated_at' => $note->updated_at,
                'coach' => $note->coach ? [
                    'id' => $note->coach->id,
                    'first_name' => $note->coach->first_name,
                    'last_name' => $note->coach->last_name,
                    'name' => $note->coach->first_name . ' ' . $note->coach->last_name,
                ] : null,
            ];

            return response()->json([
                'success' => true,
                'message' => 'Note created successfully',
                'data' => $transformedNote
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create note: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update an existing note (only if created by member)
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'nullable|string|max:1000',
            'note' => 'nullable|string|max:1000',
            'category' => 'nullable|string|max:100',
            'type' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $member = $request->get('auth_member');
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not authenticated'
                ], 401);
            }

            // Get the actual member_id (handles both User and Member instances)
            $memberId = $member->member_id ?? $member->id;

            $note = Note::where('id', $id)
                ->where('member_id', $memberId)
                ->first();
            
            if (!$note) {
                return response()->json([
                    'success' => false,
                    'message' => 'Note not found or you do not have permission to update it'
                ], 404);
            }

            // Use note if provided, otherwise use description
            $updateData = [];
            if ($request->has('note') || $request->has('description')) {
                $updateData['description'] = $request->note ?? $request->description;
            }
            
            // Map type to category
            if ($request->has('type') || $request->has('category')) {
                if ($request->has('type')) {
                    $typeMap = [
                        'general' => 'General',
                        'check-in' => 'Check-in',
                        'coaching' => 'Coaching',
                        'invoices' => 'Invoices',
                        'files' => 'Files',
                        'member-check-up' => 'member Check-up',
                        'others' => 'others',
                    ];
                    $updateData['category'] = $typeMap[$request->type] ?? $request->type;
                } else {
                    $updateData['category'] = $request->category ?? 'General';
                }
            }

            $note->update($updateData);

            $note->load('coach:id,first_name,last_name');

            // Transform response
            $transformedNote = [
                'id' => $note->id,
                'member_id' => $note->member_id,
                'note' => $note->description,
                'content' => $note->description,
                'description' => $note->description,
                'type' => strtolower($note->category),
                'category' => $note->category,
                'coach_id' => $note->coach_id,
                'created_at' => $note->created_at,
                'updated_at' => $note->updated_at,
                'coach' => $note->coach ? [
                    'id' => $note->coach->id,
                    'first_name' => $note->coach->first_name,
                    'last_name' => $note->coach->last_name,
                    'name' => $note->coach->first_name . ' ' . $note->coach->last_name,
                ] : null,
            ];

            return response()->json([
                'success' => true,
                'message' => 'Note updated successfully',
                'data' => $transformedNote
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update note: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a note (only if created by member)
     */
    public function destroy(Request $request, $id)
    {
        try {
            $member = $request->get('auth_member');
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not authenticated'
                ], 401);
            }

            // Get the actual member_id (handles both User and Member instances)
            $memberId = $member->member_id ?? $member->id;

            $note = Note::where('id', $id)
                ->where('member_id', $memberId)
                ->first();
            
            if (!$note) {
                return response()->json([
                    'success' => false,
                    'message' => 'Note not found or you do not have permission to delete it'
                ], 404);
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
}
