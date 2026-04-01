<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\Group;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Like;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Carbon\Carbon;

class MobileCommunicationController extends Controller
{
    /**
     * Get all community groups for mobile
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCommunityGroups(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            $gymId = $member->gym_id;

            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            $groupsQuery = Group::with(['messages', 'gym']);

            // Only filter by status if the column exists
            if (Schema::hasColumn('community_groups', 'status')) {
                $groupsQuery->where('status', 'active');
            }

            // Only filter by gym if the column exists
            if (Schema::hasColumn('community_groups', 'gym_id')) {
                $groupsQuery->where('gym_id', $gymId);
            }

            $groups = $groupsQuery->get()
                ->map(function($group) use ($member) {
                    // Check if member is in group and get member count using direct query
                    $isMember = false;
                    $memberCount = 0;
                    
                    if (Schema::hasTable('group_members')) {
                        try {
                            $isMember = DB::table('group_members')
                                ->where('group_id', $group->id)
                                ->where('member_id', $member->id)
                                ->exists();
                            $memberCount = DB::table('group_members')
                                ->where('group_id', $group->id)
                                ->count();
                        } catch (\Exception $e) {
                            // If query fails, set defaults
                            $isMember = false;
                            $memberCount = 0;
                        }
                    }

                    return [
                        'id' => $group->id,
                        'name' => $group->name,
                        'description' => $group->description,
                        'image_url' => $group->image_url ? asset('storage/' . $group->image_url) : null,
                        'avatar' => $group->avatar ? asset('storage/' . $group->avatar) : null,
                        'gym_name' => $group->gym ? $group->gym->name : null,
                        'status' => $group->status ?? 'active',
                        'message_count' => $group->messages ? $group->messages->count() : 0,
                        'member_count' => $memberCount,
                        'is_member' => $isMember,
                        'created_at' => $group->created_at ? Carbon::parse($group->created_at)->format('Y-m-d H:i:s') : null,
                        'updated_at' => $group->updated_at ? Carbon::parse($group->updated_at)->format('Y-m-d H:i:s') : null,
                    ];
                });

            return response()->json([
                'success' => true,
                'message' => 'Community groups retrieved successfully',
                'groups' => $groups,
                'total' => $groups->count()
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Error fetching community groups: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching groups: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all posts for mobile
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPosts(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            $gymId = $member->gym_id;

            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            $perPage = $request->get('per_page', 10);
            
            $postsQuery = Post::with(['user', 'likes', 'comments.user'])
                ->orderBy('created_at', 'desc');

            // Only filter by gym if the column exists
            if (Schema::hasColumn('posts', 'gym_id')) {
                $postsQuery->where('gym_id', $gymId);
            }

            $posts = $postsQuery->paginate($perPage);

            // Transform posts for mobile response
            $posts->getCollection()->transform(function ($post) use ($member) {
                // Generate image URL if image_path exists
                $imageUrl = null;
                if ($post->image_path) {
                    $imageUrl = asset('images/community-uploads/posts/' . $post->image_path);
                } elseif ($post->image_url) {
                    $imageUrl = $post->image_url;
                }
                
                return [
                    'id' => $post->id,
                    'content' => $post->content,
                    'image_url' => $imageUrl,
                    'is_pinned' => $post->is_pinned ?? false,
                    'likes_count' => $post->likes_count ?? 0,
                    'comments_count' => $post->comments_count ?? 0,
                    'is_liked' => $post->likes ? $post->likes->contains('user_id', $member->id) : false,
                    'time_ago' => $post->created_at ? Carbon::parse($post->created_at)->diffForHumans() : null,
                    'created_at' => $post->created_at ? Carbon::parse($post->created_at)->format('Y-m-d H:i:s') : null,
                    'updated_at' => $post->updated_at ? Carbon::parse($post->updated_at)->format('Y-m-d H:i:s') : null,
                    'user' => [
                        'id' => $post->user ? $post->user->id : null,
                        'name' => $post->user ? trim($post->user->firstname . ' ' . $post->user->lastname) : null,
                        'firstname' => $post->user ? $post->user->firstname : null,
                        'lastname' => $post->user ? $post->user->lastname : null,
                        'username' => $post->user ? $post->user->username : null,
                        'avatar' => $post->user && $post->user->avatar ? asset('storage/' . $post->user->avatar) : null,
                    ],
                    'comments' => $post->comments ? $post->comments->map(function ($comment) {
                        return [
                            'id' => $comment->id,
                            'content' => $comment->content,
                            'time_ago' => $comment->created_at ? Carbon::parse($comment->created_at)->diffForHumans() : null,
                            'created_at' => $comment->created_at ? Carbon::parse($comment->created_at)->format('Y-m-d H:i:s') : null,
                            'user' => [
                                'id' => $comment->user ? $comment->user->id : null,
                                'name' => $comment->user ? trim($comment->user->firstname . ' ' . $comment->user->lastname) : null,
                                'firstname' => $comment->user ? $comment->user->firstname : null,
                                'lastname' => $comment->user ? $comment->user->lastname : null,
                                'username' => $comment->user ? $comment->user->username : null,
                                'avatar' => $comment->user && $comment->user->avatar ? asset('storage/' . $comment->user->avatar) : null,
                            ]
                        ];
                    }) : []
                ];
            });

            return response()->json([
                'success' => true,
                'message' => 'Posts retrieved successfully',
                'data' => $posts,
                'total' => $posts->total()
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching posts: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create a new post for mobile
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createPost(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            $gymId = $member->gym_id;

            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            // Validate the request
            $validator = Validator::make($request->all(), [
                'content' => 'nullable|string|max:5000',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Ensure at least content or image is provided
            if (!$request->content && !$request->hasFile('image')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Either content or image must be provided'
                ], 422);
            }

            $postData = [
                'user_id' => $member->id,
                'content' => $request->content ?: '', // Allow empty content if image is provided
            ];

            // Add gym_id if the column exists
            if (Schema::hasColumn('posts', 'gym_id')) {
                $postData['gym_id'] = $gymId;
            }

            // Handle image upload
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = Str::uuid() . '.' . $image->getClientOriginalExtension();
                
                // Create directory if it doesn't exist
                $uploadPath = public_path('images/community-uploads/posts');
                if (!file_exists($uploadPath)) {
                    mkdir($uploadPath, 0755, true);
                }
                
                // Move image to public directory
                $image->move($uploadPath, $imageName);
                $postData['image_path'] = $imageName;
            }

            $post = Post::create($postData);
            $post->load(['user', 'likes', 'comments.user']);

            // Generate image URL if image_path exists
            $imageUrl = null;
            if ($post->image_path) {
                $imageUrl = asset('images/community-uploads/' . $post->image_path);
            } elseif ($post->image_url) {
                $imageUrl = $post->image_url;
            }

            // Transform the post for mobile response
            $transformedPost = [
                'id' => $post->id,
                'content' => $post->content,
                'image_url' => $imageUrl,
                'is_pinned' => $post->is_pinned ?? false,
                'likes_count' => $post->likes_count ?? 0,
                'comments_count' => $post->comments_count ?? 0,
                'is_liked' => false, // New post, so not liked yet
                'time_ago' => $post->created_at ? Carbon::parse($post->created_at)->diffForHumans() : null,
                'created_at' => $post->created_at ? Carbon::parse($post->created_at)->format('Y-m-d H:i:s') : null,
                'updated_at' => $post->updated_at ? Carbon::parse($post->updated_at)->format('Y-m-d H:i:s') : null,
                'user' => [
                    'id' => $post->user ? $post->user->id : null,
                    'name' => $post->user ? trim($post->user->firstname . ' ' . $post->user->lastname) : null,
                    'firstname' => $post->user ? $post->user->firstname : null,
                    'lastname' => $post->user ? $post->user->lastname : null,
                    'username' => $post->user ? $post->user->username : null,
                    'avatar' => $post->user && $post->user->avatar ? asset('storage/' . $post->user->avatar) : null,
                ],
                'comments' => [] // New post, so no comments yet
            ];

            return response()->json([
                'success' => true,
                'message' => 'Post created successfully',
                'data' => $transformedPost
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating post: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle like on a post for mobile
     *
     * @param Request $request
     * @param int $postId
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggleLike(Request $request, $postId)
    {
        try {
            $member = $request->get('auth_member');

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Authentication required'
                ], 401);
            }

            // Find the post
            $post = Post::find($postId);

            if (!$post) {
                return response()->json([
                    'success' => false,
                    'message' => 'Post not found'
                ], 404);
            }

            // Check if user has already liked the post
            $existingLike = Like::where('post_id', $postId)
                ->where('user_id', $member->id)
                ->first();

            if ($existingLike) {
                // Unlike: Delete the like
                $existingLike->delete();
                $isLiked = false;
                $message = 'Post unliked successfully';
            } else {
                // Like: Create a new like
                Like::create([
                    'post_id' => $postId,
                    'user_id' => $member->id,
                ]);
                $isLiked = true;
                $message = 'Post liked successfully';
            }

            // Refresh the post to get updated likes count
            $post->refresh();
            $post->loadCount('likes');

            return response()->json([
                'success' => true,
                'message' => $message,
                'data' => [
                    'post_id' => $postId,
                    'is_liked' => $isLiked,
                    'likes_count' => $post->likes_count ?? 0
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error toggling like: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create a comment on a post for mobile
     *
     * @param Request $request
     * @param int $postId
     * @return \Illuminate\Http\JsonResponse
     */
    public function createComment(Request $request, $postId)
    {
        try {
            $member = $request->get('auth_member');

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Authentication required'
                ], 401);
            }

            // Validate the request
            $validator = Validator::make($request->all(), [
                'content' => 'required|string|max:1000'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Find the post
            $post = Post::find($postId);

            if (!$post) {
                return response()->json([
                    'success' => false,
                    'message' => 'Post not found'
                ], 404);
            }

            // Create the comment
            $comment = Comment::create([
                'post_id' => $postId,
                'user_id' => $member->id,
                'content' => $request->content,
            ]);

            // Load the comment with user relationship
            $comment->load('user');

            // Refresh the post to get updated comments count
            $post->refresh();
            $post->loadCount('comments');

            // Transform the comment for mobile response
            $transformedComment = [
                'id' => $comment->id,
                'content' => $comment->content,
                'time_ago' => $comment->created_at ? Carbon::parse($comment->created_at)->diffForHumans() : null,
                'created_at' => $comment->created_at ? Carbon::parse($comment->created_at)->format('Y-m-d H:i:s') : null,
                'user' => [
                    'id' => $comment->user ? $comment->user->id : null,
                    'name' => $comment->user ? trim($comment->user->firstname . ' ' . $comment->user->lastname) : null,
                    'firstname' => $comment->user ? $comment->user->firstname : null,
                    'lastname' => $comment->user ? $comment->user->lastname : null,
                    'username' => $comment->user ? $comment->user->username : null,
                    'avatar' => $comment->user && $comment->user->avatar ? asset('storage/' . $comment->user->avatar) : null,
                ]
            ];

            return response()->json([
                'success' => true,
                'message' => 'Comment created successfully',
                'data' => [
                    'comment' => $transformedComment,
                    'post_id' => $postId,
                    'comments_count' => $post->comments_count ?? 0
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating comment: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a comment for mobile
     *
     * @param Request $request
     * @param int $commentId
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteComment(Request $request, $commentId)
    {
        try {
            $member = $request->get('auth_member');

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Authentication required'
                ], 401);
            }

            // Find the comment
            $comment = Comment::find($commentId);

            if (!$comment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Comment not found'
                ], 404);
            }

            // Check if the comment belongs to the user
            if ($comment->user_id != $member->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'You are not authorized to delete this comment'
                ], 403);
            }

            $postId = $comment->post_id;
            $comment->delete();

            // Refresh the post to get updated comments count
            $post = Post::find($postId);
            if ($post) {
                $post->loadCount('comments');
            }

            return response()->json([
                'success' => true,
                'message' => 'Comment deleted successfully',
                'data' => [
                    'comment_id' => $commentId,
                    'post_id' => $postId,
                    'comments_count' => $post ? ($post->comments_count ?? 0) : 0
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting comment: ' . $e->getMessage()
            ], 500);
        }
    }
}




