<?php

namespace App\Http\Controllers\Mobile\coach;

use App\Http\Controllers\Controller;
use App\Models\VideoCatalog;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class MobileVideoCatalogController extends Controller
{
    private function stripToKnownPublicAssetPath(string $path): string
    {
        // Some environments end up generating URLs like:
        // https://host/APP_URL=http://localhost:8080/videos/...
        // In that case, we want to keep only the real public asset path (/videos/... or /thumbnails/...).
        $path = str_replace(DIRECTORY_SEPARATOR, '/', $path);

        $candidates = ['/videos/', '/thumbnails/'];
        $bestPos = null;
        foreach ($candidates as $needle) {
            $pos = strpos($path, $needle);
            if ($pos === false) continue;
            if ($bestPos === null || $pos < $bestPos) {
                $bestPos = $pos;
            }
        }

        if ($bestPos !== null && $bestPos > 0) {
            return substr($path, $bestPos);
        }

        return $path;
    }

    private function encodeUrlPath(string $path): string
    {
        $path = str_replace(DIRECTORY_SEPARATOR, '/', $path);
        $segments = array_filter(explode('/', trim($path, '/')), fn ($s) => $s !== '');
        return implode('/', array_map(function ($seg) {
            return rawurlencode(rawurldecode($seg));
        }, $segments));
    }

    private function normalizeAbsoluteUrl(?string $rawUrl, Request $request): ?string
    {
        $rawUrl = is_string($rawUrl) ? trim($rawUrl) : null;
        if (!$rawUrl) {
            return null;
        }

        // Some records may contain unencoded spaces; normalize them
        $rawUrl = str_replace(' ', '%20', $rawUrl);

        // If it's already absolute, rebuild it using the current request host/scheme
        // to avoid issues when APP_URL is http or points to a different host.
        if (preg_match('/^https?:\/\//i', $rawUrl)) {
            $path = parse_url($rawUrl, PHP_URL_PATH) ?: '';
            $query = parse_url($rawUrl, PHP_URL_QUERY);
            $base = $request->getSchemeAndHttpHost();
            $path = $this->stripToKnownPublicAssetPath($path);
            $encodedPath = $this->encodeUrlPath($path);
            $url = rtrim($base, '/') . '/' . $encodedPath;
            if ($query) {
                $url .= '?' . $query;
            }
            return $url;
        }

        // Relative path -> make absolute using current host
        $base = $request->getSchemeAndHttpHost();
        $rawUrl = $this->stripToKnownPublicAssetPath($rawUrl);
        $encodedPath = $this->encodeUrlPath($rawUrl);
        return rtrim($base, '/') . '/' . $encodedPath;
    }

    /** Allowed thumbnail extensions (lowercase, with leading dot). */
    private const THUMBNAIL_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

    /**
     * Normalize string for fuzzy matching (lowercase, normalize spaces/underscores/hyphens).
     */
    private function normalizeForMatching(string $str): string
    {
        $str = mb_strtolower(trim($str));
        // Normalize spaces, underscores, hyphens to single space
        $str = preg_replace('/[\s_\-]+/u', ' ', $str);
        return trim($str);
    }

    /**
     * Resolve actual thumbnail filename for a basename (no extension). Tries each allowed extension.
     * Case-insensitive and fuzzy matching (handles spaces, underscores, hyphens variations).
     * Returns the filename (e.g. "45 degree hyperextension arms to chest.jpg") or null if not found.
     */
    private function resolveThumbnailFilename(string $basename): ?string
    {
        $basename = trim($basename);
        if ($basename === '') return null;
        $thumbnailsPath = public_path('thumbnails');
        $normalized = $this->normalizeForMatching($basename);
        
        // Try exact match first (case-sensitive)
        foreach (self::THUMBNAIL_EXTENSIONS as $ext) {
            $filename = $basename . $ext;
            $path = $thumbnailsPath . DIRECTORY_SEPARATOR . $filename;
            if (is_file($path) && is_readable($path)) {
                return $filename;
            }
        }
        
        // Try case-insensitive and fuzzy match
        if (is_dir($thumbnailsPath)) {
            $files = glob($thumbnailsPath . DIRECTORY_SEPARATOR . '*');
            foreach ($files as $filePath) {
                if (!is_file($filePath)) continue;
                $fileBasename = $this->normalizeForMatching(pathinfo($filePath, PATHINFO_FILENAME));
                $fileExt = strtolower('.' . pathinfo($filePath, PATHINFO_EXTENSION));
                
                // Exact normalized match
                if ($fileBasename === $normalized && in_array($fileExt, self::THUMBNAIL_EXTENSIONS)) {
                    return basename($filePath);
                }
            }
        }
        
        return null;
    }

    /**
     * Check if thumbnail URL is valid (not malformed).
     */
    private function isValidThumbnailUrl(?string $url): bool
    {
        if ($url === null || trim($url) === '') {
            return false;
        }
        return stripos(trim($url), 'APP_URL=') === false;
    }

    /**
     * Normalize thumbnail URL from database to use API route.
     * Converts /thumbnails/... or full URLs to /api/workout_exercises/thumbnail/...
     */
    private function normalizeThumbnailUrl(?string $thumbnailUrl, Request $request): ?string
    {
        if (!$this->isValidThumbnailUrl($thumbnailUrl)) {
            return null;
        }
        
        $url = trim($thumbnailUrl);
        $baseUrl = rtrim($request->getSchemeAndHttpHost(), '/');
        
        // Extract filename from various URL formats
        $filename = null;
        
        // If it's a full URL, extract path
        if (preg_match('/^https?:\/\//i', $url)) {
            $path = parse_url($url, PHP_URL_PATH);
            // Extract filename from /thumbnails/filename.jpg or /api/workout_exercises/thumbnail/filename.jpg
            if (preg_match('/\/(?:thumbnails|api\/workout_exercises\/thumbnail)\/([^\/?#]+)/i', $path, $matches)) {
                $filename = rawurldecode($matches[1]);
            }
        } else {
            // Relative path like /thumbnails/filename.jpg or thumbnails/filename.jpg
            $path = ltrim($url, '/');
            if (preg_match('/^thumbnails\/(.+)$/i', $path, $matches)) {
                $filename = rawurldecode($matches[1]);
            } elseif (preg_match('/^api\/workout_exercises\/thumbnail\/(.+)$/i', $path, $matches)) {
                // Already using API route, just make absolute
                return $baseUrl . '/' . $path;
            } elseif (preg_match('/^([^\/]+\.(jpg|jpeg|png|webp))$/i', $path, $matches)) {
                // Just filename
                $filename = $matches[1];
            }
        }
        
        if ($filename) {
            // Use API route
            return $baseUrl . '/api/workout_exercises/thumbnail/' . rawurlencode($filename);
        }
        
        // If we can't parse it, return normalized absolute URL
        return $this->normalizeAbsoluteUrl($thumbnailUrl, $request);
    }

    /**
     * Build thumbnail URL via API route so serveThumbnail sets correct Content-Type and resolves extension.
     * Returns null if no thumbnail file exists (so app can show placeholder).
     */
    private function fallbackThumbnailUrl(?string $filename, Request $request): ?string
    {
        $filename = is_string($filename) ? trim($filename) : null;
        if (!$filename) return null;
        $nameOnly = pathinfo($filename, PATHINFO_FILENAME);
        if ($nameOnly === '') return null;

        $resolved = $this->resolveThumbnailFilename($nameOnly);
        if ($resolved === null) {
            // No thumbnail file exists - return null so app shows placeholder
            return null;
        }

        $baseUrl = rtrim($request->getSchemeAndHttpHost(), '/');
        return $baseUrl . '/api/workout_exercises/thumbnail/' . rawurlencode($resolved);
    }

    private function fallbackVideoUrl(?string $relativePath, ?string $filename, Request $request): ?string
    {
        // Prefer relative_path if present (keeps subfolders)
        $relativePath = is_string($relativePath) ? trim($relativePath) : null;
        if ($relativePath) {
            $webPath = str_replace(DIRECTORY_SEPARATOR, '/', $relativePath);
            $encoded = $this->encodeUrlPath($webPath);
            return rtrim($request->getSchemeAndHttpHost(), '/') . '/videos/' . $encoded;
        }

        // Fallback to /videos/{filename}
        $filename = is_string($filename) ? trim($filename) : null;
        if (!$filename) return null;
        return rtrim($request->getSchemeAndHttpHost(), '/') . '/videos/' . $this->encodeUrlPath($filename);
    }

    /**
     * Thumbnails-only list (Coach Mobile - Activity Library)
     * Lightweight payload (no video_url) to avoid loading all videos at once.
     */
    public function thumbnails(Request $request)
    {
        try {
            $perPage = (int) $request->get('per_page', 30);
            $page = (int) $request->get('page', 1);
            $category = $request->get('category');
            $search = $request->get('search');
            $equipment = $request->get('equipment');
            $level = $request->get('level');
            $targeted_muscle = $request->get('targeted_muscle');

            $query = VideoCatalog::active();

            if ($category) {
                $query->byCategory($category);
            }

            if ($search) {
                $query->search($search);
            }

            // Add equipment filter
            if ($equipment) {
                $query->where('equipment', 'like', '%' . $equipment . '%');
            }

            // Add level filter
            if ($level) {
                $query->where('level', $level);
            }

            // Add targeted_muscle filter
            if ($targeted_muscle) {
                $query->where('targeted_muscle', 'like', '%' . $targeted_muscle . '%');
            }

            // Only select columns that exist: category, equipment, level, targeted_muscle (no quality, subcategory, description, duration, tags)
            $videos = $query->orderBy('name', 'asc')
                ->paginate($perPage, [
                    'id',
                    'filename',
                    'name',
                    'category',
                    'thumbnail_url',
                    'equipment',
                    'level',
                    'targeted_muscle'
                ], 'page', $page);

            $transformed = $videos->getCollection()->map(function ($video) use ($request) {
                // Use thumbnail_url from database first, fallback only if null/empty
                $thumb = null;
                if (!empty($video->thumbnail_url) && $this->isValidThumbnailUrl($video->thumbnail_url)) {
                    $thumb = $this->normalizeThumbnailUrl($video->thumbnail_url, $request);
                } else {
                    $thumb = $this->fallbackThumbnailUrl($video->filename ?? $video->name . '.mp4', $request);
                }

                return [
                    'id' => $video->id,
                    'filename' => $video->filename,
                    'name' => $video->name,
                    'category' => $video->category,
                    'thumbnail_url' => $thumb,
                    'equipment' => $video->equipment,
                    'level' => $video->level,
                    'targeted_muscle' => $video->targeted_muscle,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $transformed,
                'pagination' => [
                    'current_page' => $videos->currentPage(),
                    'last_page' => $videos->lastPage(),
                    'per_page' => $videos->perPage(),
                    'total' => $videos->total(),
                    'from' => $videos->firstItem(),
                    'to' => $videos->lastItem(),
                ],
            ], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            // Database connection errors
            $errorCode = $e->getCode();
            $errorMessage = $e->getMessage();
            
            \Log::error('Coach: Get video catalog thumbnails database error: ' . $errorMessage);
            
            // Check if it's a connection error
            $isConnectionError = strpos($errorMessage, 'Connection refused') !== false ||
                                strpos($errorMessage, 'SQLSTATE[HY000]') !== false ||
                                strpos($errorMessage, 'SQLSTATE') !== false;
            
            return response()->json([
                'success' => false,
                'message' => $isConnectionError 
                    ? 'Database connection error. Please try again later.'
                    : 'Database error occurred. Please try again.',
                'error_type' => $isConnectionError ? 'database_connection' : 'database',
                'error_code' => $errorCode,
            ], 503); // Use 503 Service Unavailable for database errors
        } catch (\Exception $e) {
            \Log::error('Coach: Get video catalog thumbnails error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Categories for filtering.
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
                'data' => $categories,
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Coach: Get video categories error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Lazy-load a single video (includes video_url).
     */
    public function show(Request $request, $id)
    {
        try {
            $video = VideoCatalog::active()->find($id);

            if (!$video) {
                return response()->json([
                    'success' => false,
                    'message' => 'Video not found',
                ], 404);
            }

            // Use thumbnail_url from database first, fallback only if null/empty
            $thumb = null;
            if (!empty($video->thumbnail_url) && $this->isValidThumbnailUrl($video->thumbnail_url)) {
                $thumb = $this->normalizeThumbnailUrl($video->thumbnail_url, $request);
            } else {
                $thumb = $this->fallbackThumbnailUrl($video->filename ?? $video->name . '.mp4', $request);
            }
            $videoUrl = $this->normalizeAbsoluteUrl($video->video_url, $request) ?: $this->fallbackVideoUrl($video->relative_path, $video->filename, $request);

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $video->id,
                    'filename' => $video->filename,
                    'name' => $video->name,
                    'category' => $video->category,
                    'equipment' => $video->equipment,
                    'level' => $video->level,
                    'targeted_muscle' => $video->targeted_muscle,
                    'file_size_mb' => $video->file_size_mb,
                    'formatted_file_size' => $video->formatted_file_size,
                    'modified_date' => $video->modified_date,
                    'relative_path' => $video->relative_path,
                    'full_path' => $video->full_path,
                    'video_url' => $videoUrl,
                    'thumbnail_url' => $thumb,
                    'is_active' => $video->is_active,
                    'created_at' => $video->created_at,
                    'updated_at' => $video->updated_at,
                ],
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Coach: Get video details error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Server error: ' . $e->getMessage(),
            ], 500);
        }
    }
}


