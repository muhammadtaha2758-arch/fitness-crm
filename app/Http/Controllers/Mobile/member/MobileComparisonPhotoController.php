<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\ComparisonPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class MobileComparisonPhotoController extends Controller
{
    /**
     * Upload Progress Photo
     * POST /api/comparison-photos/upload
     */
    public function upload(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            // Validate the request
            $validator = Validator::make($request->all(), [
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240', // Max 10MB
                'photo_date' => 'nullable|date|date_format:Y-m-d|before_or_equal:today', // Optional date, format YYYY-MM-DD, cannot be future date
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Handle file upload
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $originalName = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                
                // Generate unique filename
                $filename = 'comparison_' . $member->id . '_' . time() . '_' . Str::random(10) . '.' . $extension;
                
                // Store the file directly in public/images directory
                $publicPath = public_path('images');
                if (!file_exists($publicPath)) {
                    mkdir($publicPath, 0755, true);
                }
                
                $file->move($publicPath, $filename);
                $imagePath = 'images/' . $filename;
                
                // Get photo_date from request or use current date
                $photoDate = $request->input('photo_date') ? date('Y-m-d', strtotime($request->input('photo_date'))) : date('Y-m-d');
                
                // Get gym_id from member (default to 1 if not set)
                $gymId = $member->gym_id ?? 1;
                
                // Create database record
                $comparisonPhoto = ComparisonPhoto::create([
                    'member_id' => $member->member_id,
                    'gym_id' => $gymId,
                    'image_name' => $originalName,
                    'image_path' => $imagePath,
                    'photo_date' => $photoDate,
                    'is_before' => false,
                    'is_after' => false,
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Photo uploaded successfully',
                    'data' => [
                        'id' => $comparisonPhoto->id,
                        'image_name' => $comparisonPhoto->image_name,
                        'image_path' => $comparisonPhoto->image_path,
                        'image_url' => $comparisonPhoto->image_url,
                        'photo_date' => $comparisonPhoto->photo_date ?? $comparisonPhoto->created_at->format('Y-m-d'),
                        'is_before' => $comparisonPhoto->is_before,
                        'is_after' => $comparisonPhoto->is_after,
                        'created_at' => $comparisonPhoto->created_at->format('Y-m-d H:i:s'),
                    ]
                ], 201);

            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'No image file provided'
                ], 400);
            }

        } catch (\Exception $e) {
            Log::error('Comparison photo upload error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get User's Photos
     * GET /api/comparison-photos/{member_id}
     */
    public function getUserPhotos(Request $request, $memberId)
    {
        try {
            $member = $request->get('auth_member');
            
            // Verify the member is accessing their own photos
            if ($member->id != $memberId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access to photos'
                ], 403);
            }

            $photos = ComparisonPhoto::forMember($memberId)
                ->active()
                ->orderBy('created_at', 'desc')
                ->get();

            $transformedPhotos = $photos->map(function ($photo) {
                return [
                    'id' => $photo->id,
                    'image_name' => $photo->image_name,
                    'image_path' => $photo->image_path,
                    'image_url' => $photo->image_url,
                    'photo_date' => $photo->photo_date ?? $photo->created_at->format('Y-m-d'),
                    'is_before' => $photo->is_before,
                    'is_after' => $photo->is_after,
                    'created_at' => $photo->created_at->format('Y-m-d H:i:s'),
                    'updated_at' => $photo->updated_at->format('Y-m-d H:i:s'),
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformedPhotos,
                'count' => $photos->count()
            ], 200);

        } catch (\Exception $e) {
            Log::error('Get user photos error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Set Before Photo
     * PUT /api/comparison-photos/{photo_id}/set-before
     */
    public function setBeforePhoto(Request $request, $photoId)
    {
        try {
            $member = $request->get('auth_member');
            
            $photo = ComparisonPhoto::where('id', $photoId)
                ->where('member_id', $member->id)
                ->active()
                ->first();

            if (!$photo) {
                return response()->json([
                    'success' => false,
                    'message' => 'Photo not found or not accessible'
                ], 404);
            }

            // Remove before flag from all other photos of this member
            ComparisonPhoto::forMember($member->id)
                ->active()
                ->update(['is_before' => false]);

            // Set this photo as before photo
            $photo->update(['is_before' => true]);

            return response()->json([
                'success' => true,
                'message' => 'Photo set as before photo successfully',
                'data' => [
                    'id' => $photo->id,
                    'image_name' => $photo->image_name,
                    'image_url' => $photo->image_url,
                    'is_before' => $photo->is_before,
                    'is_after' => $photo->is_after,
                ]
            ], 200);

        } catch (\Exception $e) {
            Log::error('Set before photo error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Set After Photo
     * PUT /api/comparison-photos/{photo_id}/set-after
     */
    public function setAfterPhoto(Request $request, $photoId)
    {
        try {
            $member = $request->get('auth_member');
            
            $photo = ComparisonPhoto::where('id', $photoId)
                ->where('member_id', $member->id)
                ->active()
                ->first();

            if (!$photo) {
                return response()->json([
                    'success' => false,
                    'message' => 'Photo not found or not accessible'
                ], 404);
            }

            // Remove after flag from all other photos of this member
            ComparisonPhoto::forMember($member->id)
                ->active()
                ->update(['is_after' => false]);

            // Set this photo as after photo
            $photo->update(['is_after' => true]);

            return response()->json([
                'success' => true,
                'message' => 'Photo set as after photo successfully',
                'data' => [
                    'id' => $photo->id,
                    'image_name' => $photo->image_name,
                    'image_url' => $photo->image_url,
                    'is_before' => $photo->is_before,
                    'is_after' => $photo->is_after,
                ]
            ], 200);

        } catch (\Exception $e) {
            Log::error('Set after photo error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get Before/After Comparison
     * GET /api/comparison-photos/{member_id}/comparison
     */
    public function getComparison(Request $request, $memberId)
    {
        try {
            $member = $request->get('auth_member');
            
            // Verify the member is accessing their own photos
            if ($member->id != $memberId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access to photos'
                ], 403);
            }

            $beforePhoto = ComparisonPhoto::forMember($memberId)
                ->beforePhotos()
                ->active()
                ->first();

            $afterPhoto = ComparisonPhoto::forMember($memberId)
                ->afterPhotos()
                ->active()
                ->first();

            $comparison = [
                'before_photo' => null,
                'after_photo' => null,
                'has_comparison' => false
            ];

            if ($beforePhoto) {
                $comparison['before_photo'] = [
                    'id' => $beforePhoto->id,
                    'image_name' => $beforePhoto->image_name,
                    'image_url' => $beforePhoto->image_url,
                    'created_at' => $beforePhoto->created_at->format('Y-m-d H:i:s'),
                ];
            }

            if ($afterPhoto) {
                $comparison['after_photo'] = [
                    'id' => $afterPhoto->id,
                    'image_name' => $afterPhoto->image_name,
                    'image_url' => $afterPhoto->image_url,
                    'created_at' => $afterPhoto->created_at->format('Y-m-d H:i:s'),
                ];
            }

            $comparison['has_comparison'] = $beforePhoto && $afterPhoto;

            return response()->json([
                'success' => true,
                'data' => $comparison
            ], 200);

        } catch (\Exception $e) {
            Log::error('Get comparison error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a photo
     * DELETE /api/comparison-photos/{photo_id}
     */
    public function deletePhoto(Request $request, $photoId)
    {
        try {
            $member = $request->get('auth_member');
            
            $photo = ComparisonPhoto::where('id', $photoId)
                ->where('member_id', $member->id)
                ->active()
                ->first();

            if (!$photo) {
                return response()->json([
                    'success' => false,
                    'message' => 'Photo not found or not accessible'
                ], 404);
            }

            // Soft delete the photo
            $photo->delete();

            // Optionally delete the physical file
            if ($photo->image_path && file_exists(public_path($photo->image_path))) {
                unlink(public_path($photo->image_path));
            }

            return response()->json([
                'success' => true,
                'message' => 'Photo deleted successfully'
            ], 200);

        } catch (\Exception $e) {
            Log::error('Delete photo error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }
}
