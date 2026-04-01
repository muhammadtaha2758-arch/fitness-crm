<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\VideoCatalog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MobileVideoCatalogController extends Controller
{
    /**
     * Get all videos with pagination and filtering
     */
    public function index(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            $perPage = $request->get('per_page', 20);
            $page = $request->get('page', 1);
            $category = $request->get('category');
            $quality = $request->get('quality');
            $search = $request->get('search');

            $query = VideoCatalog::active();

            // Apply filters
            if ($category) {
                $query->byCategory($category);
            }

            if ($quality) {
                $query->byQuality($quality);
            }

            if ($search) {
                $query->search($search);
            }

            $videos = $query->orderBy('name', 'asc')
                           ->paginate($perPage, ['*'], 'page', $page);

            // Transform the data
            $transformedVideos = $videos->getCollection()->map(function ($video) {
                return [
                    'id' => $video->id,
                    'filename' => $video->filename,
                    'name' => $video->name,
                    'quality' => $video->quality,
                    'category' => $video->category,
                    'subcategory' => $video->subcategory,
                    'file_size_mb' => $video->file_size_mb,
                    'formatted_file_size' => $video->formatted_file_size,
                    'modified_date' => $video->modified_date,
                    'relative_path' => $video->relative_path,
                    'full_path' => $video->full_path,
                    'video_url' => $video->video_url,
                    'thumbnail_url' => $video->thumbnail_url,
                    'description' => $video->description,
                    'duration' => $video->duration,
                    'formatted_duration' => $video->formatted_duration,
                    'tags' => $video->tags,
                    'is_active' => $video->is_active,
                    'created_at' => $video->created_at,
                    'updated_at' => $video->updated_at
                ];
            });

            return response()->json([
                'success' => true,
                'message' => 'Video catalog retrieved successfully',
                'data' => $transformedVideos,
                'pagination' => [
                    'current_page' => $videos->currentPage(),
                    'last_page' => $videos->lastPage(),
                    'per_page' => $videos->perPage(),
                    'total' => $videos->total(),
                    'from' => $videos->firstItem(),
                    'to' => $videos->lastItem()
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get video catalog error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get video categories for filtering
     */
    public function getCategories(Request $request)
    {
        try {
            $categories = VideoCatalog::active()
                ->distinct()
                ->pluck('category')
                ->filter()
                ->values();

            return response()->json([
                'success' => true,
                'data' => $categories
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get video categories error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get video qualities for filtering
     */
    public function getQualities(Request $request)
    {
        try {
            $qualities = VideoCatalog::active()
                ->distinct()
                ->pluck('quality')
                ->filter()
                ->values();

            return response()->json([
                'success' => true,
                'data' => $qualities
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get video qualities error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get video subcategories for filtering
     */
    public function getSubcategories(Request $request)
    {
        try {
            $subcategories = VideoCatalog::active()
                ->distinct()
                ->pluck('subcategory')
                ->filter()
                ->values();

            return response()->json([
                'success' => true,
                'data' => $subcategories
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get video subcategories error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get specific video details
     */
    public function show(Request $request, $id)
    {
        try {
            $member = $request->get('auth_member');
            
            $video = VideoCatalog::active()->find($id);

            if (!$video) {
                return response()->json([
                    'success' => false,
                    'message' => 'Video not found',
                ], 404);
            }

            $videoData = [
                'id' => $video->id,
                'filename' => $video->filename,
                'name' => $video->name,
                'quality' => $video->quality,
                'category' => $video->category,
                'subcategory' => $video->subcategory,
                'file_size_mb' => $video->file_size_mb,
                'formatted_file_size' => $video->formatted_file_size,
                'modified_date' => $video->modified_date,
                'relative_path' => $video->relative_path,
                'full_path' => $video->full_path,
                'video_url' => $video->video_url,
                'thumbnail_url' => $video->thumbnail_url,
                'description' => $video->description,
                'duration' => $video->duration,
                'formatted_duration' => $video->formatted_duration,
                'tags' => $video->tags,
                'is_active' => $video->is_active,
                'created_at' => $video->created_at,
                'updated_at' => $video->updated_at
            ];

            return response()->json([
                'success' => true,
                'data' => $videoData
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get video details error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Search videos by name, category, or description
     */
    public function search(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            $validator = Validator::make($request->all(), [
                'query' => 'required|string|min:2|max:100',
                'per_page' => 'integer|min:1|max:100',
                'page' => 'integer|min:1'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $query = $request->get('query');
            $perPage = $request->get('per_page', 20);
            $page = $request->get('page', 1);

            $videos = VideoCatalog::active()
                ->search($query)
                ->orderBy('name', 'asc')
                ->paginate($perPage, ['*'], 'page', $page);

            // Transform the data
            $transformedVideos = $videos->getCollection()->map(function ($video) {
                return [
                    'id' => $video->id,
                    'filename' => $video->filename,
                    'name' => $video->name,
                    'quality' => $video->quality,
                    'category' => $video->category,
                    'subcategory' => $video->subcategory,
                    'file_size_mb' => $video->file_size_mb,
                    'formatted_file_size' => $video->formatted_file_size,
                    'modified_date' => $video->modified_date,
                    'relative_path' => $video->relative_path,
                    'full_path' => $video->full_path,
                    'video_url' => $video->video_url,
                    'thumbnail_url' => $video->thumbnail_url,
                    'description' => $video->description,
                    'duration' => $video->duration,
                    'formatted_duration' => $video->formatted_duration,
                    'tags' => $video->tags,
                    'is_active' => $video->is_active,
                    'created_at' => $video->created_at,
                    'updated_at' => $video->updated_at
                ];
            });

            return response()->json([
                'success' => true,
                'message' => 'Search results retrieved successfully',
                'data' => $transformedVideos,
                'pagination' => [
                    'current_page' => $videos->currentPage(),
                    'last_page' => $videos->lastPage(),
                    'per_page' => $videos->perPage(),
                    'total' => $videos->total(),
                    'from' => $videos->firstItem(),
                    'to' => $videos->lastItem()
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Search videos error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get video statistics
     */
    public function statistics(Request $request)
    {
        try {
            $member = $request->get('auth_member');
            
            $totalVideos = VideoCatalog::active()->count();
            $totalSize = VideoCatalog::active()->sum('file_size_mb');
            $categories = VideoCatalog::active()->distinct()->count('category');
            $qualities = VideoCatalog::active()->distinct()->count('quality');

            $categoryBreakdown = VideoCatalog::active()
                ->selectRaw('category, COUNT(*) as count')
                ->groupBy('category')
                ->orderBy('count', 'desc')
                ->get();

            $qualityBreakdown = VideoCatalog::active()
                ->selectRaw('quality, COUNT(*) as count')
                ->groupBy('quality')
                ->orderBy('count', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'total_videos' => $totalVideos,
                    'total_size_mb' => round($totalSize, 2),
                    'total_size_gb' => round($totalSize / 1024, 2),
                    'total_categories' => $categories,
                    'total_qualities' => $qualities,
                    'category_breakdown' => $categoryBreakdown,
                    'quality_breakdown' => $qualityBreakdown
                ]
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Get video statistics error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }
}
