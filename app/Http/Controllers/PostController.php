<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Like;
use App\Models\Comment;
use App\Models\CommentLike;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Intervention\Image\ImageManagerStatic as Image;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        $userId = $user ? (is_object($user) ? $user->id : $user) : null;
        $userId = $userId ? (int) $userId : null;
        
        // Get gym_id from user, default to 1
        $gymId = $user && is_object($user) && isset($user->gym_id) ? (int) $user->gym_id : 1;

        $posts = Post::with([
                'user.member', 
                'likes', 
                'comments' => function($query) use ($gymId) {
                    $query->where('gym_id', $gymId)->with(['user.member', 'likes']);
                }
            ])
            ->where('gym_id', $gymId)
            ->orderBy('is_pinned', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Add additional data for each post
        $posts->getCollection()->transform(function ($post) use ($userId) {
            $post->likes_count = $post->likes_count;
            $post->comments_count = $post->comments_count;
            $post->image_url = $post->image_url;
            $post->video_url = $post->video_url;
            $post->is_liked = $userId ? $post->isLikedBy($userId) : false;
            $post->time_ago = $post->created_at->diffForHumans();
            
            // Add profile_image from member if available, otherwise use avatar
            if ($post->user) {
                // Check if user has a member and member has profile_image
                if ($post->user->member && $post->user->member->profile_image) {
                    // If profile_image doesn't start with http, prepend storage path
                    $profileImage = $post->user->member->profile_image;
                    if (strpos($profileImage, 'http') !== 0) {
                        $post->user->profile_image = asset('storage/' . $profileImage);
                    } else {
                        $post->user->profile_image = $profileImage;
                    }
                } else if ($post->user->avatar) {
                    // If avatar doesn't start with http, prepend storage path
                    $avatar = $post->user->avatar;
                    if (strpos($avatar, 'http') !== 0) {
                        $post->user->profile_image = asset('storage/' . $avatar);
                    } else {
                        $post->user->profile_image = $avatar;
                    }
                } else {
                    $post->user->profile_image = null;
                }
            }
            
            // Transform comments to include user info, time ago, likes, and image
            $post->comments->transform(function ($comment) use ($userId) {
                $comment->time_ago = $comment->created_at->diffForHumans();
                $comment->likes_count = $comment->likes_count;
                $comment->image_url = $comment->image_url;
                $comment->is_liked = $userId ? $comment->isLikedBy($userId) : false;
                
                // Add profile_image from member if available, otherwise use avatar
                if ($comment->user) {
                    // Check if user has a member and member has profile_image
                    if ($comment->user->member && $comment->user->member->profile_image) {
                        // If profile_image doesn't start with http, prepend storage path
                        $profileImage = $comment->user->member->profile_image;
                        if (strpos($profileImage, 'http') !== 0) {
                            $comment->user->profile_image = asset('storage/' . $profileImage);
                        } else {
                            $comment->user->profile_image = $profileImage;
                        }
                    } else if ($comment->user->avatar) {
                        // If avatar doesn't start with http, prepend storage path
                        $avatar = $comment->user->avatar;
                        if (strpos($avatar, 'http') !== 0) {
                            $comment->user->profile_image = asset('storage/' . $avatar);
                        } else {
                            $comment->user->profile_image = $avatar;
                        }
                    } else {
                        $comment->user->profile_image = null;
                    }
                }
                
                return $comment;
            });
            
            return $post;
        });

        return response()->json([
            'success' => true,
            'data' => $posts
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $request->validate([
            'content' => 'nullable|string|max:5000',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'video' => 'nullable|file|mimes:mp4,mov,avi,webm|max:15360'
        ]);

        // Ensure at least content, image, or video is provided
        if (!$request->content && !$request->hasFile('image') && !$request->hasFile('video')) {
            return response()->json([
                'success' => false,
                'message' => 'Either content, image, or video must be provided'
            ], 422);
        }

        $userId = is_object($user) ? $user->id : $user;
        // Get gym_id from user, default to 1
        $gymId = $user && is_object($user) && isset($user->gym_id) ? (int) $user->gym_id : 1;
        
        $postData = [
            'user_id' => (int) $userId,
            'gym_id' => $gymId,
            'content' => $request->content ?: '', // Allow empty content if image is provided
        ];

        // Handle image upload
        if ($request->hasFile('image')) {
            try {
                $image = $request->file('image');
                
                // Get file extension safely
                $extension = $image->getClientOriginalExtension();
                if (empty($extension)) {
                    $extension = $image->guessExtension();
                }
                
                $imageName = Str::uuid() . '.' . $extension;
                
                // Create directory if it doesn't exist
                $uploadPath = public_path('images/community-uploads/posts');
                if (!file_exists($uploadPath)) {
                    mkdir($uploadPath, 0755, true);
                }
                
                // Move image to public directory
                $image->move($uploadPath, $imageName);
                $postData['image_path'] = $imageName;
                
            } catch (\Exception $e) {
                Log::error('Image upload failed', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                    'user_id' => $userId
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to upload image. Please try again or choose a different image.',
                    'error' => config('app.debug') ? $e->getMessage() : null
                ], 500);
            }
        }

        // Handle video upload
        if ($request->hasFile('video')) {
            try {
                $video = $request->file('video');
                
                // Get file extension safely
                $extension = $video->getClientOriginalExtension();
                if (empty($extension)) {
                    $extension = $video->guessExtension();
                }
                
                $videoName = Str::uuid() . '.' . $extension;
                
                // Create directory if it doesn't exist
                $uploadPath = public_path('images/community-uploads/posts');
                if (!file_exists($uploadPath)) {
                    mkdir($uploadPath, 0755, true);
                }
                
                // Move video to public directory
                $video->move($uploadPath, $videoName);
                $postData['video_path'] = $videoName;
                
            } catch (\Exception $e) {
                Log::error('Video upload failed', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                    'user_id' => $userId
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to upload video. Please try again or choose a different video file.',
                    'error' => config('app.debug') ? $e->getMessage() : null
                ], 500);
            }
        }

        try {
            $post = Post::create($postData);
            $post->load([
                'user.member', 
                'likes', 
                'comments' => function($query) use ($gymId) {
                    $query->where('gym_id', $gymId)->with('user.member');
                }
            ]);

            // Ensure image_url and video_url are included in response
            $post->image_url = $post->image_url;
            $post->video_url = $post->video_url;
            $post->likes_count = $post->likes_count;
            $post->comments_count = $post->comments_count;
            $post->is_liked = false; // New post, not liked yet
            $post->time_ago = $post->created_at->diffForHumans();
            
            // Add profile_image from member if available, otherwise use avatar
            if ($post->user) {
                if ($post->user->member && $post->user->member->profile_image) {
                    $profileImage = $post->user->member->profile_image;
                    if (strpos($profileImage, 'http') !== 0) {
                        $post->user->profile_image = asset('storage/' . $profileImage);
                    } else {
                        $post->user->profile_image = $profileImage;
                    }
                } else if ($post->user->avatar) {
                    $avatar = $post->user->avatar;
                    if (strpos($avatar, 'http') !== 0) {
                        $post->user->profile_image = asset('storage/' . $avatar);
                    } else {
                        $post->user->profile_image = $avatar;
                    }
                } else {
                    $post->user->profile_image = null;
                }
            }

            // Create notifications for post creation
            try {
                $gymId = $user->gym_id ?? 1;
                
                // Get performedByUserId if current user is an admin
                $performedByUserId = null;
                if ($user && isset($user->role_id) && $user->role_id == 1) {
                    $performedByUserId = $user->id;
                }
                
                \App\Services\NotificationService::postCreated($post, $user, $gymId, $performedByUserId);
            } catch (\Exception $e) {
                Log::error('Failed to create post creation notifications', [
                    'post_id' => $post->id,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                // Don't fail the request if notification fails
            }

            return response()->json([
                'success' => true,
                'message' => 'Post created successfully',
                'data' => $post
            ], 201);
        } catch (\Exception $e) {
            Log::error('Failed to create post', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'user_id' => $userId,
                'post_data' => $postData
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create post. Please try again.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        $userId = $user ? (is_object($user) ? $user->id : $user) : null;
        $userId = $userId ? (int) $userId : null;

        // Get gym_id from user, default to 1
        $gymId = $user && is_object($user) && isset($user->gym_id) ? (int) $user->gym_id : 1;
        
        $post = Post::with([
                'user.member', 
                'likes', 
                'comments' => function($query) use ($gymId) {
                    $query->where('gym_id', $gymId)->with('user.member');
                }
            ])
            ->where('gym_id', $gymId)
            ->findOrFail($id);
        
        $post->likes_count = $post->likes_count;
        $post->comments_count = $post->comments_count;
        $post->image_url = $post->image_url;
        $post->video_url = $post->video_url;
        $post->is_liked = $userId ? $post->isLikedBy($userId) : false;
        $post->time_ago = $post->created_at->diffForHumans();
        
        // Add profile_image from member if available, otherwise use avatar
        if ($post->user) {
            if ($post->user->member && $post->user->member->profile_image) {
                $profileImage = $post->user->member->profile_image;
                if (strpos($profileImage, 'http') !== 0) {
                    $post->user->profile_image = asset('storage/' . $profileImage);
                } else {
                    $post->user->profile_image = $profileImage;
                }
            } else if ($post->user->avatar) {
                $avatar = $post->user->avatar;
                if (strpos($avatar, 'http') !== 0) {
                    $post->user->profile_image = asset('storage/' . $avatar);
                } else {
                    $post->user->profile_image = $avatar;
                }
            } else {
                $post->user->profile_image = null;
            }
        }
        
        // Transform comments
        $post->comments->transform(function ($comment) {
            $comment->time_ago = $comment->created_at->diffForHumans();
            
            // Add profile_image from member if available, otherwise use avatar
            if ($comment->user) {
                if ($comment->user->member && $comment->user->member->profile_image) {
                    $profileImage = $comment->user->member->profile_image;
                    if (strpos($profileImage, 'http') !== 0) {
                        $comment->user->profile_image = asset('storage/' . $profileImage);
                    } else {
                        $comment->user->profile_image = $profileImage;
                    }
                } else if ($comment->user->avatar) {
                    $avatar = $comment->user->avatar;
                    if (strpos($avatar, 'http') !== 0) {
                        $comment->user->profile_image = asset('storage/' . $avatar);
                    } else {
                        $comment->user->profile_image = $avatar;
                    }
                } else {
                    $comment->user->profile_image = null;
                }
            }
            
            return $comment;
        });

        return response()->json([
            'success' => true,
            'data' => $post
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, $id)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Please log in to update a post.'
            ], 401);
        }

        // Get gym_id from user, default to 1
        $gymId = $user && is_object($user) && isset($user->gym_id) ? (int) $user->gym_id : 1;

        try {
            $post = Post::where('gym_id', $gymId)->findOrFail($id);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Post not found.'
            ], 404);
        }

        // Check if user owns the post (handle both string and integer IDs)
        $userId = is_object($user) ? $user->id : $user;
        $postUserId = $post->user_id;
        
        // Convert both to integers for comparison
        $userId = (int) $userId;
        $postUserId = (int) $postUserId;
        
        if ($postUserId !== $userId) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to update this post.'
            ], 403);
        }

        $postData = [
            'content' => $request->content,
        ];

        // Handle image upload
        if ($request->hasFile('image')) {
            try {
                // Delete old image if exists
                if ($post->image_path) {
                    $oldImagePath = public_path('images/community-uploads/posts/' . $post->image_path);
                    if (file_exists($oldImagePath)) {
                        @unlink($oldImagePath);
                    }
                }

                $image = $request->file('image');
                
                // Get file extension safely
                $extension = $image->getClientOriginalExtension();
                if (empty($extension)) {
                    $extension = $image->guessExtension();
                }
                
                $imageName = Str::uuid() . '.' . $extension;
                
                // Create directory if it doesn't exist
                $uploadPath = public_path('images/community-uploads/posts');
                if (!file_exists($uploadPath)) {
                    mkdir($uploadPath, 0755, true);
                }
                
                // Move image to public directory
                $image->move($uploadPath, $imageName);
                $postData['image_path'] = $imageName;
                
            } catch (\Exception $e) {
                Log::error('Image upload failed during post update', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                    'post_id' => $id,
                    'user_id' => $userId
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to upload image. Please try again or choose a different image.',
                    'error' => config('app.debug') ? $e->getMessage() : null
                ], 500);
            }
        }

        // Handle video upload
        if ($request->hasFile('video')) {
            try {
                // Delete old video if exists
                if ($post->video_path) {
                    $oldVideoPath = public_path('images/community-uploads/posts/' . $post->video_path);
                    if (file_exists($oldVideoPath)) {
                        @unlink($oldVideoPath);
                    }
                }

                $video = $request->file('video');
                
                // Get file extension safely
                $extension = $video->getClientOriginalExtension();
                if (empty($extension)) {
                    $extension = $video->guessExtension();
                }
                
                $videoName = Str::uuid() . '.' . $extension;
                
                // Create directory if it doesn't exist
                $uploadPath = public_path('images/community-uploads/posts');
                if (!file_exists($uploadPath)) {
                    mkdir($uploadPath, 0755, true);
                }
                
                // Move video to public directory
                $video->move($uploadPath, $videoName);
                $postData['video_path'] = $videoName;
                
            } catch (\Exception $e) {
                Log::error('Video upload failed during post update', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                    'post_id' => $id,
                    'user_id' => $userId
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to upload video. Please try again or choose a different video file.',
                    'error' => config('app.debug') ? $e->getMessage() : null
                ], 500);
            }
        }

        try {
            $post->update($postData);
            $post->load([
                'user.member', 
                'likes', 
                'comments' => function($query) use ($gymId) {
                    $query->where('gym_id', $gymId)->with('user.member');
                }
            ]);
            
            // Add profile_image from member if available, otherwise use avatar
            if ($post->user) {
                if ($post->user->member && $post->user->member->profile_image) {
                    $profileImage = $post->user->member->profile_image;
                    if (strpos($profileImage, 'http') !== 0) {
                        $post->user->profile_image = asset('storage/' . $profileImage);
                    } else {
                        $post->user->profile_image = $profileImage;
                    }
                } else if ($post->user->avatar) {
                    $avatar = $post->user->avatar;
                    if (strpos($avatar, 'http') !== 0) {
                        $post->user->profile_image = asset('storage/' . $avatar);
                    } else {
                        $post->user->profile_image = $avatar;
                    }
                } else {
                    $post->user->profile_image = null;
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Post updated successfully',
                'data' => $post
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to update post', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'post_id' => $id,
                'user_id' => $userId
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update post. Please try again.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        // Get gym_id from user, default to 1
        $gymId = $user && is_object($user) && isset($user->gym_id) ? (int) $user->gym_id : 1;
        
        $post = Post::where('gym_id', $gymId)->findOrFail($id);

        // Check if user owns the post (handle both string and integer IDs)
        $userId = is_object($user) ? $user->id : $user;
        $postUserId = $post->user_id;
        
        // Convert both to integers for comparison
        $userId = (int) $userId;
        $postUserId = (int) $postUserId;
        
        if ($postUserId !== $userId) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to delete this post'
            ], 403);
        }

        // Delete associated image
        if ($post->image_path) {
            $imagePath = public_path('images/community-uploads/posts/' . $post->image_path);
            if (file_exists($imagePath)) {
                @unlink($imagePath);
            }
        }

        // Delete associated video
        if ($post->video_path) {
            $videoPath = public_path('images/community-uploads/posts/' . $post->video_path);
            if (file_exists($videoPath)) {
                @unlink($videoPath);
            }
        }

        $post->delete();

        return response()->json([
            'success' => true,
            'message' => 'Post deleted successfully'
        ]);
    }

    /**
     * Toggle like/unlike for a post
     */
    public function toggleLike(Request $request, $id)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        // Get gym_id from user, default to 1
        $gymId = $user && is_object($user) && isset($user->gym_id) ? (int) $user->gym_id : 1;
        
        $post = Post::where('gym_id', $gymId)->findOrFail($id);
        $userId = is_object($user) ? $user->id : $user;
        $userId = (int) $userId;

        $existingLike = Like::where('user_id', $userId)
            ->where('post_id', $id)
            ->first();

        if ($existingLike) {
            $existingLike->delete();
            $liked = false;
        } else {
            Like::create([
                'user_id' => $userId,
                'post_id' => $id
            ]);
            $liked = true;
            
            // Create notification for post like (only when liking, not unliking)
            try {
                $post->load('user');
                $postAuthor = $post->user;
                $gymId = $user->gym_id ?? 1;
                \App\Services\NotificationService::postLiked($post, $user, $postAuthor, $gymId);
            } catch (\Exception $e) {
                \Log::error('Failed to create post like notifications: ' . $e->getMessage(), [
                    'post_id' => $post->id,
                    'trace' => $e->getTraceAsString()
                ]);
            }
        }

        $likesCount = $post->likes()->count();

        return response()->json([
            'success' => true,
            'liked' => $liked,
            'likes_count' => $likesCount
        ]);
    }

    /**
     * Add a comment to a post
     */
    public function addComment(Request $request, $id)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $request->validate([
            'content' => 'nullable|string|max:1000',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:5120' // 5MB max, smaller than posts
        ]);

        // Ensure at least content or image is provided
        if (!$request->content && !$request->hasFile('image')) {
            return response()->json([
                'success' => false,
                'message' => 'Either content or image must be provided'
            ], 422);
        }

        // Get gym_id from user, default to 1
        $gymId = $user && is_object($user) && isset($user->gym_id) ? (int) $user->gym_id : 1;
        
        $post = Post::where('gym_id', $gymId)->findOrFail($id);

        $userId = is_object($user) ? $user->id : $user;
        $userId = (int) $userId;

        // Check if user has already commented 3 times on this post
        $userCommentCount = Comment::where('post_id', $id)
            ->where('user_id', $userId)
            ->where('gym_id', $gymId)
            ->count();

        if ($userCommentCount >= 3) {
            return response()->json([
                'success' => false,
                'message' => 'You have reached the maximum limit of 3 comments per post'
            ], 422);
        }

        $commentData = [
            'user_id' => $userId,
            'post_id' => $id,
            'gym_id' => $gymId,
            'content' => $request->content ?: ''
        ];

        // Handle image upload
        if ($request->hasFile('image')) {
            try {
                $image = $request->file('image');
                
                // Get file extension safely
                $extension = $image->getClientOriginalExtension();
                if (empty($extension)) {
                    $extension = $image->guessExtension();
                }
                
                $imageName = Str::uuid() . '.' . $extension;
                
                // Create directory if it doesn't exist
                $uploadPath = public_path('images/community-uploads/comments');
                if (!file_exists($uploadPath)) {
                    mkdir($uploadPath, 0755, true);
                }
                
                // Resize image to smaller size (max 800px width/height)
                $img = Image::make($image);
                $img->resize(800, 800, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
                
                // Save resized image
                $img->save($uploadPath . '/' . $imageName, 80); // 80% quality
                
                $commentData['image_path'] = $imageName;
                
            } catch (\Exception $e) {
                // Fallback to regular move if Image intervention is not available
                try {
                    $imageName = Str::uuid() . '.' . $extension;
                    $uploadPath = public_path('images/community-uploads/comments');
                    if (!file_exists($uploadPath)) {
                        mkdir($uploadPath, 0755, true);
                    }
                    $image->move($uploadPath, $imageName);
                    $commentData['image_path'] = $imageName;
                } catch (\Exception $e2) {
                    Log::error('Comment image upload failed', [
                        'error' => $e2->getMessage(),
                        'trace' => $e2->getTraceAsString(),
                        'user_id' => $userId
                    ]);
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to upload image. Please try again or choose a different image.',
                        'error' => config('app.debug') ? $e2->getMessage() : null
                    ], 500);
                }
            }
        }

        $comment = Comment::create($commentData);
        $comment->load(['user.member', 'likes']);
        $comment->time_ago = $comment->created_at->diffForHumans();
        $comment->likes_count = $comment->likes_count;
        $comment->image_url = $comment->image_url;
        $comment->is_liked = false;
        
        // Add profile_image from member if available, otherwise use avatar
        if ($comment->user) {
            if ($comment->user->member && $comment->user->member->profile_image) {
                $profileImage = $comment->user->member->profile_image;
                if (strpos($profileImage, 'http') !== 0) {
                    $comment->user->profile_image = asset('storage/' . $profileImage);
                } else {
                    $comment->user->profile_image = $profileImage;
                }
            } else if ($comment->user->avatar) {
                $avatar = $comment->user->avatar;
                if (strpos($avatar, 'http') !== 0) {
                    $comment->user->profile_image = asset('storage/' . $avatar);
                } else {
                    $comment->user->profile_image = $avatar;
                }
            } else {
                $comment->user->profile_image = null;
            }
        }

        // Create notifications for comment addition
        try {
            $post->load('user');
            $postAuthor = $post->user;
            $gymId = $user->gym_id ?? 1;
            \App\Services\NotificationService::commentAdded($comment, $post, $user, $postAuthor, $gymId);
        } catch (\Exception $e) {
            \Log::error('Failed to create comment notifications: ' . $e->getMessage(), [
                'comment_id' => $comment->id,
                'trace' => $e->getTraceAsString()
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Comment added successfully',
            'data' => $comment
        ], 201);
    }

    /**
     * Pin/unpin a post
     */
    public function togglePin(Request $request, $id)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        // Get gym_id from user, default to 1
        $gymId = $user && is_object($user) && isset($user->gym_id) ? (int) $user->gym_id : 1;
        
        $post = Post::where('gym_id', $gymId)->findOrFail($id);

        // Check if user owns the post or is admin (handle both string and integer IDs)
        $userId = is_object($user) ? $user->id : $user;
        $postUserId = $post->user_id;
        
        // Convert both to integers for comparison
        $userId = (int) $userId;
        $postUserId = (int) $postUserId;
        
        if ($postUserId !== $userId) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to pin this post'
            ], 403);
        }

        $post->update(['is_pinned' => !$post->is_pinned]);

        return response()->json([
            'success' => true,
            'message' => $post->is_pinned ? 'Post pinned successfully' : 'Post unpinned successfully',
            'is_pinned' => $post->is_pinned
        ]);
    }

    /**
     * Toggle like on a comment
     */
    public function toggleCommentLike(Request $request, $id)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        // Get gym_id from user, default to 1
        $gymId = $user && is_object($user) && isset($user->gym_id) ? (int) $user->gym_id : 1;
        
        $comment = Comment::where('gym_id', $gymId)->findOrFail($id);
        $userId = is_object($user) ? $user->id : $user;
        $userId = (int) $userId;

        $existingLike = CommentLike::where('user_id', $userId)
            ->where('comment_id', $id)
            ->first();

        if ($existingLike) {
            $existingLike->delete();
            $liked = false;
        } else {
            CommentLike::create([
                'user_id' => $userId,
                'comment_id' => $id,
                'gym_id' => $gymId
            ]);
            $liked = true;
        }

        $likesCount = $comment->likes()->count();

        return response()->json([
            'success' => true,
            'liked' => $liked,
            'likes_count' => $likesCount
        ]);
    }

    /**
     * Delete a comment
     */
    public function deleteComment(Request $request, $id)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        // Get gym_id from user, default to 1
        $gymId = $user && is_object($user) && isset($user->gym_id) ? (int) $user->gym_id : 1;
        
        $comment = Comment::where('gym_id', $gymId)->findOrFail($id);
        $userId = is_object($user) ? $user->id : $user;
        $userId = (int) $userId;

        // Check if user owns the comment or is admin
        $commentUserId = (int) $comment->user_id;
        $isAdmin = $user && is_object($user) && isset($user->role_id) && $user->role_id === 1;
        
        if ($commentUserId !== $userId && !$isAdmin) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to delete this comment'
            ], 403);
        }

        // Delete associated image if exists
        if ($comment->image_path) {
            $imagePath = public_path('images/community-uploads/comments/' . $comment->image_path);
            if (file_exists($imagePath)) {
                @unlink($imagePath);
            }
        }

        // Delete comment likes
        $comment->likes()->delete();

        // Delete the comment
        $comment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Comment deleted successfully'
        ]);
    }
}
