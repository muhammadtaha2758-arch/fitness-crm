<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Poll;
use App\Models\PollOption;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PollController extends Controller
{
    /**
     * Store a newly created poll
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'options' => 'required|array|min:2|max:5',
            'options.*' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Get the current user (works with both Passport and Mobile auth)
            $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
            
            $userId = is_object($user) ? $user->id : $user;
            $userId = (int) $userId;
            
            // Create the poll
            $poll = Poll::create([
                'title' => $request->title,
                'user_id' => $userId,
                'status' => 'active'
            ]);

            // Create poll options
            foreach ($request->options as $optionText) {
                PollOption::create([
                    'poll_id' => $poll->id,
                    'text' => $optionText,
                    'votes_count' => 0
                ]);
            }

            // Load relationships for response
            $poll->load(['user', 'options']);

            return response()->json([
                'success' => true,
                'message' => 'Poll created successfully',
                'data' => $poll
            ], 201);

        } catch (\Exception $e) {
            \Log::error('Error creating poll: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create poll'
            ], 500);
        }
    }

    /**
     * Get all polls
     */
    public function index(Request $request): JsonResponse
    {
        try {
            // Get the current user (works with both Passport and Mobile auth)
            $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
            $userId = $user ? (is_object($user) ? $user->id : $user) : null;
            $userId = $userId ? (int) $userId : null;
            
            $polls = Poll::with(['user', 'options', 'votes'])
                ->where('status', 'active')
                ->orderBy('created_at', 'desc')
                ->paginate(10);

            // Add additional data for frontend
            $polls->getCollection()->transform(function ($poll) use ($userId) {
                $poll->has_voted = $userId ? $poll->hasUserVoted($userId) : false;
                $poll->time_ago = $poll->created_at->diffForHumans();
                $poll->total_votes = $poll->total_votes;
                
                // Get the user's vote option ID if they voted
                if ($userId && $poll->has_voted) {
                    $userVote = $poll->votes()->where('user_id', $userId)->first();
                    $poll->voted_option_id = $userVote ? $userVote->poll_option_id : null;
                } else {
                    $poll->voted_option_id = null;
                }
                
                // Add vote percentages to options
                $poll->options->transform(function ($option) use ($poll) {
                    $option->vote_percentage = $poll->total_votes > 0 
                        ? round(($option->votes_count / $poll->total_votes) * 100, 1) 
                        : 0;
                    return $option;
                });
                
                return $poll;
            });

            return response()->json([
                'success' => true,
                'data' => $polls
            ]);

        } catch (\Exception $e) {
            \Log::error('Error fetching polls: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch polls'
            ], 500);
        }
    }

    /**
     * Vote on a poll option
     */
    public function vote(Request $request, int $pollId): JsonResponse
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
        
        $userId = is_object($user) ? $user->id : $user;
        $userId = (int) $userId;
        
        $validator = Validator::make($request->all(), [
            'option_id' => 'required|integer|exists:poll_options,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $poll = Poll::findOrFail($pollId);
            $option = PollOption::findOrFail($request->option_id);

            // Check if user already voted
            $existingVote = $poll->votes()->where('user_id', $userId)->first();
            
            if ($existingVote) {
                return response()->json([
                    'success' => false,
                    'message' => 'You have already voted on this poll'
                ], 400);
            }

            // Create vote
            $poll->votes()->create([
                'user_id' => $userId,
                'poll_option_id' => $request->option_id
            ]);

            // Update vote count
            $option->increment('votes_count');

            // Reload poll with relationships for response
            $poll->load(['user', 'options', 'votes']);
            
            // Add additional data for frontend
            $poll->has_voted = true;
            $poll->voted_option_id = $request->option_id;
            $poll->time_ago = $poll->created_at->diffForHumans();
            $poll->total_votes = $poll->total_votes;
            
            // Add vote percentages to options
            $poll->options->transform(function ($opt) use ($poll) {
                $opt->vote_percentage = $poll->total_votes > 0 
                    ? round(($opt->votes_count / $poll->total_votes) * 100, 1) 
                    : 0;
                return $opt;
            });

            return response()->json([
                'success' => true,
                'message' => 'Vote recorded successfully',
                'data' => $poll
            ]);

        } catch (\Exception $e) {
            \Log::error('Error voting on poll: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to record vote'
            ], 500);
        }
    }

    /**
     * Update an existing poll
     */
    public function update(Request $request, int $pollId): JsonResponse
    {
        try {
            // Get the current user (works with both Passport and Mobile auth)
            $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
            
            $userId = is_object($user) ? $user->id : $user;
            $userId = (int) $userId;
            
            $poll = Poll::findOrFail($pollId);

            // Check if user owns the poll
            $pollUserId = (int) $poll->user_id;
            if ($pollUserId !== $userId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized to update this poll'
                ], 403);
            }

            // Check if poll has votes - if yes, don't allow editing
            if ($poll->total_votes > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot edit poll that has votes'
                ], 400);
            }

            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'options' => 'required|array|min:2|max:5',
                'options.*' => 'required|string|max:255'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Update poll title
            $poll->update([
                'title' => $request->title
            ]);

            // Delete existing options
            $poll->options()->delete();

            // Create new poll options
            foreach ($request->options as $optionText) {
                PollOption::create([
                    'poll_id' => $poll->id,
                    'text' => $optionText,
                    'votes_count' => 0
                ]);
            }

            // Load relationships for response
            $poll->load(['user', 'options', 'votes']);

            // Add additional data for frontend
            $poll->has_voted = $poll->hasUserVoted($userId);
            $poll->time_ago = $poll->created_at->diffForHumans();
            $poll->total_votes = $poll->total_votes;
            
            // Get the user's vote option ID if they voted
            if ($userId && $poll->has_voted) {
                $userVote = $poll->votes()->where('user_id', $userId)->first();
                $poll->voted_option_id = $userVote ? $userVote->poll_option_id : null;
            } else {
                $poll->voted_option_id = null;
            }
            
            // Add vote percentages to options
            $poll->options->transform(function ($option) use ($poll) {
                $option->vote_percentage = $poll->total_votes > 0 
                    ? round(($option->votes_count / $poll->total_votes) * 100, 1) 
                    : 0;
                return $option;
            });

            return response()->json([
                'success' => true,
                'message' => 'Poll updated successfully',
                'data' => $poll
            ]);

        } catch (\Exception $e) {
            \Log::error('Error updating poll: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update poll'
            ], 500);
        }
    }

    /**
     * Delete a poll
     */
    public function destroy(Request $request, int $pollId): JsonResponse
    {
        try {
            // Get the current user (works with both Passport and Mobile auth)
            $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
            
            $userId = is_object($user) ? $user->id : $user;
            $userId = (int) $userId;
            
            $poll = Poll::findOrFail($pollId);

            // Check if user owns the poll
            $pollUserId = (int) $poll->user_id;
            if ($pollUserId !== $userId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized to delete this poll'
                ], 403);
            }

            // Delete poll (cascade will delete options and votes)
            $poll->delete();

            return response()->json([
                'success' => true,
                'message' => 'Poll deleted successfully'
            ]);

        } catch (\Exception $e) {
            \Log::error('Error deleting poll: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete poll'
            ], 500);
        }
    }
}
