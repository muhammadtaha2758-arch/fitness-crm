<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use App\Models\CommunityCoverPhoto;

class CommunityController extends Controller
{
    /**
     * Upload cover photo for community group
     */
    public function uploadCoverPhoto(Request $request)
    {
        try {
            // Check if file is present
            if (!$request->hasFile('cover_photo')) {
                return response()->json([
                    'success' => false,
                    'message' => 'No file was uploaded. Please select a cover photo.',
                    'errors' => ['cover_photo' => ['Please select a cover photo to upload.']]
                ], 422);
            }

            $request->validate([
                'cover_photo' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120' // 5MB max
            ], [
                'cover_photo.required' => 'Please select a cover photo to upload.',
                'cover_photo.image' => 'The file must be an image.',
                'cover_photo.mimes' => 'The image must be a file of type: jpeg, png, jpg, gif, or webp.',
                'cover_photo.max' => 'The image size must not exceed 5MB.'
            ]);

            $file = $request->file('cover_photo');
            
            // Additional validation
            if (!$file->isValid()) {
                return response()->json([
                    'success' => false,
                    'message' => 'The uploaded file is not valid.',
                    'errors' => ['cover_photo' => ['The uploaded file is corrupted or invalid.']]
                ], 422);
            }
            $imageName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            
            // Create directory if it doesn't exist
            $uploadPath = public_path('uploads/community');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }
            
            // Move file directly to public directory
            $file->move($uploadPath, $imageName);
            
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
            
            // Get gym_id from user, default to 1
            $gymId = $user && is_object($user) && isset($user->gym_id) ? (int) $user->gym_id : 1;
            
            // Deactivate all existing cover photos for this gym
            CommunityCoverPhoto::where('gym_id', $gymId)
                ->where('is_active', true)
                ->update(['is_active' => false]);
            
            // Save only the relative public path (not full URL)
            $publicPath = '/uploads/community/' . $imageName;
            
            $coverPhoto = CommunityCoverPhoto::create([
                'image_path' => 'uploads/community/' . $imageName,
                'image_url' => $publicPath, // Store relative path only (e.g., /uploads/community/filename.jpg)
                'position_x' => 50.00,
                'position_y' => 50.00,
                'scale' => 100.00,
                'user_id' => $userId,
                'gym_id' => $gymId,
                'is_active' => true
            ]);

            // Convert to full URL for response
            $fullImageUrl = asset($publicPath);

            return response()->json([
                'success' => true,
                'message' => 'Cover photo uploaded successfully',
                'data' => [
                    'id' => $coverPhoto->id,
                    'image_url' => $fullImageUrl, // Return full URL for immediate use
                    'image_path' => $coverPhoto->image_path,
                    'position_x' => $coverPhoto->position_x,
                    'position_y' => $coverPhoto->position_y,
                    'scale' => $coverPhoto->scale
                ]
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Cover photo upload error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload cover photo: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get community group information
     */
    public function getGroupInfo(Request $request)
    {
        // Get the current user (works with both Passport and Mobile auth)
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        // Get gym_id from user, default to 1
        $gymId = $user && is_object($user) && isset($user->gym_id) ? (int) $user->gym_id : 1;
        
        // Get active cover photo for this gym
        $activeCoverPhoto = CommunityCoverPhoto::where('gym_id', $gymId)
            ->where('is_active', true)
            ->latest()
            ->first();
        
        // Convert stored relative path to absolute URL
        $imageUrl = null;
        if ($activeCoverPhoto && $activeCoverPhoto->image_url) {
            // If it's already a full URL (from old records), use it as is
            // Otherwise, convert relative path to full URL
            if (strpos($activeCoverPhoto->image_url, 'http') === 0 || strpos($activeCoverPhoto->image_url, '//') === 0) {
                $imageUrl = $activeCoverPhoto->image_url;
            } else {
                // Convert relative path to full URL
                $imageUrl = asset($activeCoverPhoto->image_url);
            }
        }
        
        return response()->json([
            'success' => true,
            'data' => [
                'name' => 'Thorstrengthfitness',
                'description' => 'Check this group for daily updates, promotions and deals to stay in the loop with Thorstrength Fitness!',
                'cover_photo' => $activeCoverPhoto ? [
                    'id' => $activeCoverPhoto->id,
                    'image_url' => $imageUrl,
                    'position_x' => $activeCoverPhoto->position_x,
                    'position_y' => $activeCoverPhoto->position_y,
                    'scale' => $activeCoverPhoto->scale
                ] : null,
                'member_count' => 1234,
                'created_at' => '2020-01-01'
            ]
        ]);
    }

    /**
     * Save cover photo position
     */
    public function saveCoverPosition(Request $request)
    {
        $request->validate([
            'x' => 'required|numeric|min:0|max:100',
            'y' => 'required|numeric|min:0|max:100',
            'scale' => 'required|numeric|min:100|max:200'
        ]);

        try {
            // Get the active cover photo
            $activeCoverPhoto = CommunityCoverPhoto::getActiveCoverPhoto();
            
            if (!$activeCoverPhoto) {
                return response()->json([
                    'success' => false,
                    'message' => 'No active cover photo found'
                ], 404);
            }
            
            // Update the position
            $activeCoverPhoto->update([
                'position_x' => $request->x,
                'position_y' => $request->y,
                'scale' => $request->scale
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Cover photo position saved successfully',
                'data' => [
                    'x' => $activeCoverPhoto->position_x,
                    'y' => $activeCoverPhoto->position_y,
                    'scale' => $activeCoverPhoto->scale
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save cover photo position',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update community group information
     */
    public function updateGroupInfo(Request $request)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string|max:1000'
        ]);

        // For now, just return success
        // You can extend this to update database
        return response()->json([
            'success' => true,
            'message' => 'Group information updated successfully'
        ]);
    }
}
