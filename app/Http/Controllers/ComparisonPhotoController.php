<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\ComparisonPhoto;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ComparisonPhotoController extends Controller
{
    /**
     * Store a newly uploaded image.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp,jfif|max:10240', // 10MB max
        ]);

        try {
            $file = $request->file('image');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            $filePath = 'images/comparison-photos/' . $filename;

            // Store the file
            $file->move(public_path('images/comparison-photos'), $filename);

            // Get gym_id from authenticated user, default to 1
            $gymId = $request->user('api')->gym_id ?? 1;

            // Save to database
            $comparisonPhoto = ComparisonPhoto::create([
                'gym_id' => $gymId,
                'image_name' => $filename,
                'image_data' => $filePath,
                'uploaded_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Image uploaded successfully',
                'data' => $comparisonPhoto
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload image: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all comparison photos.
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {
            // Get gym_id from authenticated user, default to 1
            $gymId = $request->user('api')->gym_id ?? 1;
            
            $query = ComparisonPhoto::query()
                ->where('gym_id', $gymId);
            
            if ($request->filled('memberId')) {
                $query->where('member_id', (int) $request->get('memberId'));
            }
            $photos = $query
                ->orderBy('created_at', 'desc')
                ->orderBy('id', 'desc')
                ->get();
            
            return response()->json([
                'success' => true,
                'data' => $photos
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch photos: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a comparison photo.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $photo = ComparisonPhoto::findOrFail($id);
            
            // Delete the file
            $filePath = public_path($photo->image_data);
            if (File::exists($filePath)) {
                File::delete($filePath);
            }
            
            // Delete from database
            $photo->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Photo deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete photo: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Migrate existing images from directory to database.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function migrateExistingImages(Request $request): JsonResponse
    {
        try {
            $directory = public_path('images/comparison-photos');
            $files = File::files($directory);
            $migratedCount = 0;
            $errors = [];

            // Get gym_id from authenticated user, default to 1
            $gymId = $request->user('api')->gym_id ?? 1;

            foreach ($files as $file) {
                try {
                    $filename = $file->getFilename();
                    $filePath = 'images/comparison-photos/' . $filename;
                    
                    // Check if already exists in database
                    $existingPhoto = ComparisonPhoto::where('image_name', $filename)->first();
                    if ($existingPhoto) {
                        continue;
                    }

                    // Create database record
                    ComparisonPhoto::create([
                        'gym_id' => $gymId,
                        'image_name' => $filename,
                        'image_data' => $filePath,
                        'uploaded_at' => now(),
                    ]);

                    $migratedCount++;
                } catch (\Exception $e) {
                    $errors[] = "Failed to migrate {$file->getFilename()}: " . $e->getMessage();
                }
            }

            return response()->json([
                'success' => true,
                'message' => "Successfully migrated {$migratedCount} images",
                'migrated_count' => $migratedCount,
                'errors' => $errors
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to migrate images: ' . $e->getMessage()
            ], 500);
        }
    }
}
