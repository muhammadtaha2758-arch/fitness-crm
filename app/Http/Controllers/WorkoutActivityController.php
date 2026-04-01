<?php

namespace App\Http\Controllers;

use App\Models\WorkoutActivity;
use App\Models\VideoCatalog;
use App\Models\Client;
use App\Models\Setting;
use App\utils\helpers;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use DB;
use Illuminate\Http\Request;

class WorkoutActivityController extends BaseController
{
    /** Allowed thumbnail image extensions (lowercase, with leading dot). */
    private const THUMBNAIL_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

    /** MIME types for thumbnail extensions. */
    private const THUMBNAIL_MIME = [
        '.jpg' => 'image/jpeg',
        '.jpeg' => 'image/jpeg',
        '.png' => 'image/png',
        '.webp' => 'image/webp',
    ];

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
     * Resolve thumbnail path for a basename (no extension). Tries each allowed extension.
     * Case-insensitive and fuzzy matching (handles spaces, underscores, hyphens variations).
     * Returns [fullPath, filename] or [null, null] if not found.
     */
    private function resolveThumbnailPath(string $basename): array
    {
        $thumbnailsPath = public_path('thumbnails');
        $basename = trim($basename);
        if ($basename === '') return [null, null];
        
        $normalized = $this->normalizeForMatching($basename);
        
        // Try exact match first (case-sensitive)
        foreach (self::THUMBNAIL_EXTENSIONS as $ext) {
            $filename = $basename . $ext;
            $path = $thumbnailsPath . DIRECTORY_SEPARATOR . $filename;
            if (is_file($path) && is_readable($path)) {
                return [$path, $filename];
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
                    return [$filePath, basename($filePath)];
                }
            }
        }
        
        return [null, null];
    }

    /**
     * Get Content-Type for a thumbnail filename by extension.
     */
    private function getThumbnailContentType(string $filename): string
    {
        $ext = strtolower('.' . pathinfo($filename, PATHINFO_EXTENSION));
        return self::THUMBNAIL_MIME[$ext] ?? 'image/jpeg';
    }

    /**
     * Serve placeholder image when thumbnail doesn't exist (prevents "unknown image format" errors).
     * Always returns an image response, never 404 HTML.
     */
    private function servePlaceholderImage()
    {
        $placeholderPaths = [
            public_path('images' . DIRECTORY_SEPARATOR . 'Kettlebell-swing.jpg'),
            public_path('images' . DIRECTORY_SEPARATOR . 'workout_default' . DIRECTORY_SEPARATOR . 'workout-1.jpg'),
            public_path('images' . DIRECTORY_SEPARATOR . 'gym logo.png'),
            public_path('images' . DIRECTORY_SEPARATOR . 'logo.jpg'),
            public_path('images' . DIRECTORY_SEPARATOR . 'logo.png'),
        ];
        
        foreach ($placeholderPaths as $placeholderPath) {
            if (is_file($placeholderPath) && is_readable($placeholderPath)) {
                $ext = strtolower(pathinfo($placeholderPath, PATHINFO_EXTENSION));
                $mime = self::THUMBNAIL_MIME['.' . $ext] ?? 'image/jpeg';
                return response()->file($placeholderPath, ['Content-Type' => $mime]);
            }
        }
        
        // Last resort: return a 1x1 transparent PNG (base64 encoded)
        // This ensures we NEVER return 404 HTML which causes "unknown image format" errors
        $transparentPng = base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
        return response($transparentPng, 200)
            ->header('Content-Type', 'image/png')
            ->header('Cache-Control', 'public, max-age=3600');
    }

    //------------- Get ALL Workout Exercises -------------\\

    public function index(request $request)
    {
        // $this->authorizeForUser($request->user('api'), 'create', Client::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;
        $helpers = new helpers();
        // Filter fields With Params to retrieve
        $columns = array(0 => 'exercise_name', 1 => 'category', 2 => 'level', 3 => 'muscles_targeted');
        $param = array(0 => 'like', 1 => 'like', 2 => 'like', 3 => 'like');
        $data = array();
        $exercises = WorkoutActivity::where('deleted_at', '=', null)->get();

        $totalRows = $exercises->count();
        foreach ($exercises as $exercise) {
                $item['id'] = $exercise->exercise_id; // Use exercise_id as the primary ID
                $item['exercise_id'] = $exercise->exercise_id;
                $item['exercise_name'] = $exercise->exercise_name;
                $item['category'] = $exercise->category;
                $item['duration'] = $exercise->duration;
                $item['level'] = $exercise->level;
                $item['description'] = $exercise->description;
                $item['equipment'] = $exercise->equipment;
                $item['thumbnail'] = $exercise->thumbnail;
                $item['muscles_targeted'] = $exercise->muscles_targeted;
                $item['calories_burned'] = $exercise->calories_burned;
                $item['instructions'] = $exercise->instructions;
                $item['difficulty'] = $exercise->difficulty;
                $item['rest_period'] = $exercise->rest_period;
                $item['tags'] = $exercise->tags;
                $item['video_link'] = $exercise->video_link;
                // New fields
                $item['visible_for'] = $exercise->visible_for;
                $item['primary_muscle_groups'] = $exercise->primary_muscle_groups;
                $item['secondary_muscle_groups'] = $exercise->secondary_muscle_groups;
                $item['primary_joint'] = $exercise->primary_joint;
                $item['type'] = $exercise->type;
                $item['uses_weights'] = $exercise->uses_weights;
                $item['intensity'] = $exercise->intensity;
                $item['sets_configuration'] = $exercise->sets_configuration;
                $item['rest_period_seconds'] = $exercise->rest_period_seconds;
                $item['qr_link'] = $exercise->qr_link;
                $item['manufacturer'] = $exercise->manufacturer;
                $item['equipment_image'] = $exercise->equipment_image;
                $item['primary_body_part_image'] = $exercise->primary_body_part_image;
                $item['secondary_body_part_image'] = $exercise->secondary_body_part_image;
                $item['created_at'] = $exercise->created_at;
                $data[] = $item;
        }

        $company_info = Setting::where('deleted_at', '=', null)->first();

        return response()->json([
            'exercises' => $data,
            'company_info' => $company_info,
            'totalRows' => $totalRows,
        ]);
    }

    //------------- Store new Workout Exercise -------------\\

    public function store(Request $request)
    {
        // $this->authorizeForUser($request->user('api'), 'create', Client::class);

        $this->validate($request, [
            'exercise_name' => 'required|string',
            'category' => 'required|string',
            'duration' => 'required',
            'level' => 'required|string',
            'description' => 'required|string',
            'equipment' => 'nullable',
            'equipment_image' => 'nullable|string|max:255',
            'thumbnail' => 'nullable',
            'thumbnail_path' => 'nullable',
            'calories_burned' => 'nullable|integer',
            'sets' => 'nullable',
            'instructions' => 'nullable',
            'difficulty' => 'nullable',
            'rest_period' => 'nullable',
            'tags' => 'nullable',
            'video_link' => 'nullable',
            'muscles_targeted' => 'nullable',
            'visible_for' => 'nullable',
            'primary_muscle_groups' => 'nullable',
            'secondary_muscle_groups' => 'nullable',
            'primary_body_part_image' => 'nullable|string|max:100',
            'secondary_body_part_image' => 'nullable|string|max:100',
            'primary_joint' => 'nullable',
            'type' => 'nullable',
            'uses_weights' => 'nullable',
            'intensity' => 'nullable',
            'sets' => 'nullable',
            'rest_period_seconds' => 'nullable',
            'qr_link' => 'nullable',
            'manufacturer' => 'nullable',
        ]);

        // Handle thumbnail upload if provided
        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail');
            $thumbnailName = time() . '_' . $thumbnail->getClientOriginalName();
            
            // Create directory if it doesn't exist
            $uploadPath = public_path('images/workout_thumbnails');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }
            
            // Move file to public/images/workout_thumbnails
            $thumbnail->move($uploadPath, $thumbnailName);
            $thumbnailPath = 'images/workout_thumbnails/' . $thumbnailName;
        } elseif ($request->thumbnail_path) {
            // If thumbnail_path is provided (from video selection), use it directly
            $thumbnailPath = $request->thumbnail_path;
        } elseif ($request->thumbnail) {
            // If thumbnail is a base64 string or URL, store it as is
            $thumbnailPath = $request->thumbnail;
        }

        // Prepare sets configuration
        $setsConfiguration = null;
        if ($request->sets) {
            // If sets is already a JSON string, use it as is
            if (is_string($request->sets)) {
                $setsConfiguration = $request->sets;
            } 
            // If sets is an array, convert to JSON
            elseif (is_array($request->sets)) {
                $setsConfiguration = json_encode($request->sets);
            }
        }

        $exercise = WorkoutActivity::create([
            'exercise_id' => $this->getNumberOrder(),
            'exercise_name' => $request['exercise_name'],
            'category' => $request['category'],
            'duration' => (string) $request['duration'],
            'level' => $request['level'],
            'description' => $request['description'],
            'equipment' => (string) ($request['equipment'] ?? ''),
            'equipment_image' => $request['equipment_image'] ?? null,
            'thumbnail' => $thumbnailPath,
            'muscles_targeted' => (string) ($request['muscles_targeted'] ?? ''),
            'calories_burned' => (int) ($request['calories_burned'] ?? 0),
            'instructions' => (string) ($request['instructions'] ?? ''),
            'difficulty' => (int) ($request['difficulty'] ?? 1),
            'rest_period' => (int) ($request['rest_period'] ?? 30),
            'tags' => (string) ($request['tags'] ?? ''),
            'video_link' => (string) ($request['video_link'] ?? ''),
            'type' => (string) ($request['type'] ?? ''),
            'sets_configuration' => $setsConfiguration,
            // Set default values for new fields to prevent null issues
            'visible_for' => 'all',
            'primary_muscle_groups' => $request['primary_muscle_groups'] ?? [],
            'sets' => $request['sets'] ?? [],
            'secondary_muscle_groups' => $request['secondary_muscle_groups'] ?? [],
            'primary_body_part_image' => $request['primary_body_part_image'] ?? null,
            'secondary_body_part_image' => $request['secondary_body_part_image'] ?? null,
            'primary_joint' => $request['primary_joint'] ?? '',
            'uses_weights' => false,
            'intensity' => (int) ($request['difficulty'] ?? 5),
            'rest_period_seconds' => (int) ($request['rest_period'] ?? 30),
            'qr_link' => (string) ($request['qr_link'] ?? ''),
            'manufacturer' => '',
        ]);
        
        return response()->json(['success' => true, 'exercise_id' => $exercise->exercise_id]);
    }

    //------------ function show -----------\\

    public function show($id){
        // $this->authorizeForUser(request()->user('api'), 'view', WorkoutActivity::class);
        
        $exercise = WorkoutActivity::where('exercise_id', $id)->where('deleted_at', '=', null)->firstOrFail();
        
        // Format the exercise data for the frontend
        $data = [
            'id' => $exercise->exercise_id, // Use exercise_id as the primary ID
            'exercise_id' => $exercise->exercise_id,
            'exercise_name' => $exercise->exercise_name,
            'category' => $exercise->category,
            'duration' => $exercise->duration,
            'level' => $exercise->level,
            'description' => $exercise->description,
            'equipment' => $exercise->equipment,
            'thumbnail' => $exercise->thumbnail,    
            'muscles_targeted' => $exercise->muscles_targeted,
            'calories_burned' => $exercise->calories_burned,
            'instructions' => $exercise->instructions,
            'difficulty' => $exercise->difficulty,
            'rest_period' => $exercise->rest_period,
            'tags' => $exercise->tags,
            'video_link' => $exercise->video_link,
            // New fields
            'visible_for' => $exercise->visible_for,    
            'sets' => $exercise->sets,
            'primary_muscle_groups' => ($exercise->primary_muscle_groups),
            'secondary_muscle_groups' => ($exercise->secondary_muscle_groups),
            'primary_joint' => $exercise->primary_joint,
            'type' => $exercise->type,
            'uses_weights' => $exercise->uses_weights,
            'intensity' => $exercise->intensity,
            'sets_configuration' => $exercise->sets_configuration,
            'rest_period_seconds' => $exercise->rest_period_seconds,
            'qr_link' => $exercise->qr_link,
            'manufacturer' => $exercise->manufacturer,
            'equipment_image' => $exercise->equipment_image,
            'primary_body_part_image' => $exercise->primary_body_part_image,
            'secondary_body_part_image' => $exercise->secondary_body_part_image,
            'created_at' => $exercise->created_at,
            'updated_at' => $exercise->updated_at,
        ];
        
        return response()->json([
            'success' => true,
            'exercise' => $data
        ]);
    }

    //------------- Update Workout Exercise -------------\\

    public function update(Request $request, $id)
    {
        // $this->authorizeForUser($request->user('api'), 'update', WorkoutActivity::class);
        
        $this->validate($request, [
            'exercise_name' => 'required|string',
            'category' => 'required|string',
            'duration' => 'required|string',
            'level' => 'required|string',
            'description' => 'required|string',
            'equipment' => 'nullable',
            'equipment_image' => 'nullable|string|max:255',
            'thumbnail' => 'nullable',
            'thumbnail_path' => 'nullable',
            'muscles_targeted' => 'nullable',
            'calories_burned' => 'nullable|integer',
            'instructions' => 'nullable',
            'difficulty' => 'nullable',
            'rest_period' => 'nullable',
            'tags' => 'nullable',
            'video_link' => 'nullable',
            'sets' => 'nullable',
            // New validation rules for additional fields
            'visible_for' => 'nullable',
            'primary_muscle_groups' => 'nullable',
            'secondary_muscle_groups' => 'nullable',
            'primary_body_part_image' => 'nullable|string|max:100',
            'secondary_body_part_image' => 'nullable|string|max:100',
            'primary_joint' => 'nullable',
            'type' => 'nullable',
            'uses_weights' => 'nullable',
            'intensity' => 'nullable',
            'sets' => 'nullable',
            'rest_period_seconds' => 'nullable',
            'qr_link' => 'nullable',
            'manufacturer' => 'nullable',
        ]);

        // Handle thumbnail upload if provided
        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail');
            $thumbnailName = time() . '_' . $thumbnail->getClientOriginalName();
            
            // Create directory if it doesn't exist
            $uploadPath = public_path('images/workout_thumbnails');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }
            
            // Move file to public/images/workout_thumbnails
            $thumbnail->move($uploadPath, $thumbnailName);
            $thumbnailPath = 'images/workout_thumbnails/' . $thumbnailName;
        } elseif ($request->thumbnail_path) {
            // If thumbnail_path is provided (from video selection), use it directly
            $thumbnailPath = $request->thumbnail_path;
        } elseif ($request->thumbnail) {
            // If thumbnail is a base64 string or URL, store it as is
            $thumbnailPath = $request->thumbnail;
        }

        // Prepare sets configuration
        $setsConfiguration = null;
        if ($request->sets) {
            // If sets is already a JSON string, use it as is
            if (is_string($request->sets)) {
                $setsConfiguration = $request->sets;
            } 
            // If sets is an array, convert to JSON
            elseif (is_array($request->sets)) {
                $setsConfiguration = json_encode($request->sets);
            }
        }

        WorkoutActivity::where('exercise_id', $id)->update([
            'exercise_name' => $request['exercise_name'],
            'category' => $request['category'],
            'duration' => (string) $request['duration'],
            'level' => $request['level'],
            'description' => $request['description'],
            'equipment' => (string) ($request['equipment'] ?? ''),
            'equipment_image' => $request['equipment_image'] ?? null,
            'thumbnail' => $thumbnailPath,
            'muscles_targeted' => (string) ($request['muscles_targeted'] ?? ''),
            'calories_burned' => (int) ($request['calories_burned'] ?? 0),
            'instructions' => (string) ($request['instructions'] ?? ''),
            'difficulty' => (int) ($request['difficulty'] ?? 1),
            'rest_period' => (int) ($request['rest_period'] ?? 30),
            'tags' => (string) ($request['tags'] ?? ''),
            'video_link' => (string) ($request['video_link'] ?? ''),
            'type' => (string) ($request['type'] ?? ''),
            'sets_configuration' => $setsConfiguration,
            // New fields with proper type casting and defaults
            'visible_for' => (string) ($request['visible_for'] ?? 'all'),
            'primary_muscle_groups' => $request['primary_muscle_groups'] ?? [],
            'sets' => $request['sets'] ?? [],
            'secondary_muscle_groups' => $request['secondary_muscle_groups'] ?? [],
            'primary_body_part_image' => $request['primary_body_part_image'] ?? null,
            'secondary_body_part_image' => $request['secondary_body_part_image'] ?? null,
            'primary_joint' => (string) ($request['primary_joint'] ?? ''),
            'uses_weights' => (bool) ($request['uses_weights'] ?? false),
            'intensity' => (int) ($request['intensity'] ?? 5),
            'rest_period_seconds' => (int) ($request['rest_period_seconds'] ?? 30),
            'qr_link' => (string) ($request['qr_link'] ?? ''),
            'manufacturer' => (string) ($request['manufacturer'] ?? ''),
        ]);
        return response()->json(['success' => true]);
    }

    //------------- delete workout exercise -------------\\

    public function destroy(Request $request, $id)
    {
        // $this->authorizeForUser($request->user('api'), 'delete', WorkoutActivity::class);

        WorkoutActivity::where('exercise_id', $id)->update([
            'deleted_at' => Carbon::now(),
        ]);
        return response()->json(['success' => true]);
    }

    //-------------- Delete by selection  ---------------\\

    public function delete_by_selection(Request $request)
    {
        // $this->authorizeForUser($request->user('api'), 'delete', WorkoutActivity::class);
        $selectedIds = $request->selectedIds;

        foreach ($selectedIds as $exercise_id) {
            WorkoutActivity::where('exercise_id', $exercise_id)->update([
                'deleted_at' => Carbon::now(),
            ]);
        }
        return response()->json(['success' => true]);
    }

    //------------- get Number Order Exercise -------------\\

    public function getNumberOrder()
    {
        try {
            // Try to get the last exercise by exercise_id first
            $last = WorkoutActivity::orderBy('exercise_id', 'desc')->first();
            
            if ($last) {
                $code = $last->exercise_id + 1;
            } else {
                // If no exercises exist, start with 1
                $code = 1;
            }
            
            return $code;
        } catch (\Exception $e) {
            // If there's an error with exercise_id, try using the primary key
            try {
                $last = WorkoutActivity::orderBy('exercise_id', 'desc')->first();
                
                if ($last) {
                    $code = $last->exercise_id + 1;
                } else {
                    $code = 1;
                }
                
                return $code;
            } catch (\Exception $e2) {
                // If all else fails, return a timestamp-based ID
                return time();
            }
        }
    }

    //------------- Get Exercises Without Paginate -------------\\

    public function Get_Exercises_Without_Paginate()
    {
        $exercises = WorkoutActivity::where('deleted_at', '=', null)->get();
        return response()->json($exercises);
    }

    // import exercises
    public function import_exercises(Request $request)
    {
        $file_upload = $request->file('exercises');
        $ext = pathinfo($file_upload->getClientOriginalName(), PATHINFO_EXTENSION);
        if ($ext != 'csv') {
            return response()->json([
                'msg' => 'must be in csv format',
                'status' => false,
            ]);
        } else {
            $data = array();
            $rowcount = 0;
            if (($handle = fopen($file_upload, "r")) !== false) {
                $max_line_length = defined('MAX_LINE_LENGTH') ? MAX_LINE_LENGTH : 10000;
                $header = fgetcsv($handle, $max_line_length);
                $header_colcount = count($header);
                while (($row = fgetcsv($handle, $max_line_length)) !== false) {
                    $row_colcount = count($row);
                    if ($row_colcount == $header_colcount) {
                        $entry = array_combine($header, $row);
                        $data[] = $entry;
                    } else {
                        return null;
                    }
                    $rowcount++;
                }
                fclose($handle);
            } else {
                return null;
            }
           
            $rules = array('exercise_name' => 'required');

            //-- Create New Exercise
            foreach ($data as $key => $value) {
                $input['exercise_name'] = $value['exercise_name'];

                $validator = Validator::make($input, $rules);
                if (!$validator->fails()) {
                    
                    WorkoutActivity::create([
                        'exercise_name' => $value['exercise_name'],
                        'exercise_id' => $this->getNumberOrder(),
                        'category' => $value['category'] == '' ? null : $value['category'],
                        'duration' => $value['duration'] == '' ? null : $value['duration'],
                        'level' => $value['level'] == '' ? null : $value['level'],
                        'description' => $value['description'] == '' ? null : $value['description'],
                        'equipment' => $value['equipment'] == '' ? null : $value['equipment'],
                        'thumbnail' => $value['thumbnail'] == '' ? null : $value['thumbnail'],
                        'muscles_targeted' => $value['muscles_targeted'] == '' ? null : $value['muscles_targeted'],
                    ]);

                }
            }

            return response()->json([
                'status' => true,
            ], 200);
        }
    }

    //------------- Get Available Videos -------------\\

    public function getAvailableVideos(Request $request)
    {
        try {
            $videosPath = public_path('videos');
            $thumbnailsPath = public_path('thumbnails');
            $videos = [];
            $catalogByFilename = [];
            $filterValuesByHeader = [];
            $headers = [];
            
            // Attempt to read video catalog from Excel if present
            $catalogPath = base_path('uploads/excel/video_catalog.xlsx');
            if (file_exists($catalogPath)) {
                try {
                    // Lazy-load PhpSpreadsheet without adding new deps
                    $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReaderForFile($catalogPath);
                    $reader->setReadDataOnly(true);
                    $spreadsheet = $reader->load($catalogPath);
                    $sheet = $spreadsheet->getActiveSheet();
                    $rows = $sheet->toArray(null, true, true, true);
                    if (!empty($rows)) {
                        // First row is headers
                        $headerRow = array_shift($rows);
                        $headers = array_values(array_map(function($h){ return trim((string)$h); }, $headerRow));
                        // Find filename column by fuzzy match
                        $filenameIndex = null;
                        foreach ($headers as $idx => $h) {
                            $lh = strtolower($h);
                            if (strpos($lh, 'file') !== false || strpos($lh, 'video') !== false || $lh === 'filename' || $lh === 'name') {
                                $filenameIndex = $idx;
                                break;
                            }
                        }
                        if ($filenameIndex !== null) {
                            foreach ($rows as $row) {
                                // Reindex and trim
                                $values = array_values($row);
                                // Build associative meta using headers
                                $meta = [];
                                foreach ($headers as $idx => $key) {
                                    $key = $key ?: 'col_'.$idx;
                                    $meta[$key] = isset($values[$idx]) ? trim((string)$values[$idx]) : '';
                                    if ($meta[$key] !== '') {
                                        $filterValuesByHeader[$key] = $filterValuesByHeader[$key] ?? [];
                                        $filterValuesByHeader[$key][$meta[$key]] = true;
                                    }
                                }
                                $filename = isset($values[$filenameIndex]) ? trim((string)$values[$filenameIndex]) : '';
                                if ($filename !== '') {
                                    $catalogByFilename[strtolower($filename)] = $meta;
                                }
                            }
                        }
                    }
                } catch (\Throwable $e) {
                    // Ignore catalog parsing errors and proceed without metadata
                }
            }

            if (is_dir($videosPath)) {
                $files = $this->getVideoFilesRecursively($videosPath);
                
                foreach ($files as $filePath) {
                    $relativePath = str_replace($videosPath . DIRECTORY_SEPARATOR, '', $filePath);
                    $filename = basename($filePath);
                    $fileInfo = pathinfo($filePath);
                    
                    if ($this->isVideoFile($fileInfo['extension'])) {
                        $lower = strtolower($filename);
                        $meta = $catalogByFilename[$lower] ?? $catalogByFilename[strtolower($fileInfo['filename'])] ?? [];
                        
                        // Check for thumbnail (any allowed extension)
                        [, $thumbFilename] = $this->resolveThumbnailPath($fileInfo['filename']);
                        $thumbnailUrl = $thumbFilename !== null ? '/thumbnails/' . $thumbFilename : null;
                        
                        // Convert backslashes to forward slashes for web URLs
                        $webPath = str_replace(DIRECTORY_SEPARATOR, '/', $relativePath);
                        // Encode URL path segments to safely handle spaces and special characters
                        $encodedRelativeUrl = implode('/', array_map('rawurlencode', explode('/', $webPath)));

                        $videos[] = [
                            'filename' => $filename,
                            'name' => $fileInfo['filename'],
                            'url' => url('/videos/' . $encodedRelativeUrl),
                            'thumbnail_url' => $thumbnailUrl,
                            'size' => filesize($filePath),
                            'modified' => filemtime($filePath),
                            'meta' => $meta,
                            'path' => $relativePath,
                        ];
                    }
                }
                
                // Sort by modification date (newest first)
                usort($videos, function($a, $b) {
                    return $b['modified'] - $a['modified'];
                });
            }
            
            // Build filters list from catalog headers (only include specific allowed filters)
            $allowedFilters = ['Category', 'Body part', 'Level'];
            $filters = [];
            foreach ($filterValuesByHeader as $header => $valuesSet) {
                $lh = strtolower($header);
                // Skip filename-like headers
                if (strpos($lh, 'file') !== false || strpos($lh, 'video') !== false || $lh === 'filename' || $lh === 'name') {
                    continue;
                }
                // Only include allowed filters
                if (in_array($header, $allowedFilters)) {
                    $filters[$header] = array_values(array_keys($valuesSet));
                    sort($filters[$header], SORT_NATURAL | SORT_FLAG_CASE);
                }
            }

            return response()->json([
                'success' => true,
                'videos' => $videos,
                'total' => count($videos),
                'filters' => $filters,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching videos: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all video files recursively from a directory
     */
    private function getVideoFilesRecursively(string $directory): array
    {
        $videos = [];
        $iterator = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($directory, \RecursiveDirectoryIterator::SKIP_DOTS)
        );

        foreach ($iterator as $file) {
            if ($file->isFile() && $this->isVideoFile($file->getExtension())) {
                $videos[] = $file->getPathname();
            }
        }

        return $videos;
    }

    /**
     * Check if file extension is a video format
     */
    private function isVideoFile(string $extension): bool
    {
        $videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'webm', 'flv', 'wmv', 'm4v'];
        return in_array(strtolower($extension), $videoExtensions);
    }

    //------------- Get All Thumbnails -------------\\

    public function getAllThumbnails(Request $request)
    {
        try {
            $thumbnailsPath = public_path('thumbnails');
            $thumbnails = [];
            $seen = [];

            if (is_dir($thumbnailsPath)) {
                foreach (self::THUMBNAIL_EXTENSIONS as $ext) {
                    $files = glob($thumbnailsPath . DIRECTORY_SEPARATOR . '*' . $ext);
                    foreach ($files as $filePath) {
                        $filename = basename($filePath);
                        $name = pathinfo($filename, PATHINFO_FILENAME);
                        if (isset($seen[$name])) {
                            continue;
                        }
                        $seen[$name] = true;
                        $thumbnails[] = [
                            'filename' => $filename,
                            'name' => $name,
                            'thumbnail_url' => '/api/workout_exercises/thumbnail/' . rawurlencode($filename),
                            'modified' => filemtime($filePath),
                        ];
                    }
                }

                // Sort by name
                usort($thumbnails, function ($a, $b) {
                    return strcmp($a['name'], $b['name']);
                });
            }

            return response()->json([
                'success' => true,
                'thumbnails' => $thumbnails,
                'count' => count($thumbnails),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load thumbnails: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get video_catalog entries that have thumbnails (for Plan Builder picker).
     * Paginated so the browser doesn't load 2000+ thumbnails at once (fixes slow/hanging UI).
     * Query: ?page=1&per_page=48&search=&category=&equipment=&level=&targeted_muscle[]=
     * Filters match video_catalog columns: name (search), category, equipment, level, targeted_muscle.
     */
    public function getVideoCatalogThumbnails(Request $request)
    {
        try {
            $perPage = min(100, max(12, (int) $request->get('per_page', 48)));
            $page = max(1, (int) $request->get('page', 1));

            $query = VideoCatalog::where('is_active', true);

            // Search: name, category, equipment, level, targeted_muscle, and exercise metadata
            $search = $request->get('search');
            if (!empty($search) && is_string($search)) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%')
                        ->orWhere('category', 'like', '%' . $search . '%')
                        ->orWhere('equipment', 'like', '%' . $search . '%')
                        ->orWhere('level', 'like', '%' . $search . '%')
                        ->orWhere('targeted_muscle', 'like', '%' . $search . '%')
                        ->orWhere('exercise_instructions', 'like', '%' . $search . '%')
                        ->orWhere('exercise_tips', 'like', '%' . $search . '%')
                        ->orWhere('primary_activating_muscles', 'like', '%' . $search . '%')
                        ->orWhere('secondary_activating_muscles', 'like', '%' . $search . '%');
                });
            }

            // category (video_catalog column) = exercise type filter. Case-insensitive match.
            $category = $request->get('category');
            if (!empty($category) && is_string($category)) {
                $pattern = '%' . mb_strtolower(trim($category)) . '%';
                $query->whereRaw('LOWER(COALESCE(category, "")) LIKE ?', [$pattern]);
            }

            // equipment (video_catalog column)
            $equipment = $request->get('equipment');
            if (!empty($equipment) && is_string($equipment)) {
                $query->where('equipment', 'like', '%' . $equipment . '%');
            }

            // level (video_catalog column)
            $level = $request->get('level');
            if (!empty($level) && is_string($level)) {
                $query->where('level', 'like', '%' . $level . '%');
            }

            // targeted_muscle: only these four (as in DB): Chest, Triceps, Shoulders, Full Body. Match on targeted_muscle or name (case-insensitive).
            $allowedTargetedMuscles = ['Chest', 'Triceps', 'Shoulders', 'Full Body'];
            $targetedMuscle = $request->get('targeted_muscle');
            if (!empty($targetedMuscle)) {
                $requested = is_array($targetedMuscle)
                    ? $targetedMuscle
                    : (array) preg_split('/\s*,\s*/', trim($targetedMuscle), -1, PREG_SPLIT_NO_EMPTY);
                $values = [];
                foreach ($requested as $v) {
                    $v = trim($v);
                    if ($v === '') continue;
                    $lower = mb_strtolower($v);
                    foreach ($allowedTargetedMuscles as $allowed) {
                        if (mb_strtolower($allowed) === $lower) {
                            $values[] = $allowed;
                            break;
                        }
                    }
                }
                $values = array_unique($values);
                if (!empty($values)) {
                    $query->where(function ($q) use ($values) {
                        foreach ($values as $v) {
                            $pattern = '%' . mb_strtolower($v) . '%';
                            $q->orWhere(function ($sub) use ($pattern) {
                                $sub->whereRaw('LOWER(COALESCE(targeted_muscle, "")) LIKE ?', [$pattern])
                                    ->orWhereRaw('LOWER(COALESCE(name, "")) LIKE ?', [$pattern]);
                            });
                        }
                    });
                }
            }

            $query->orderBy('name');
            $total = $query->count();
            $rows = $query->skip(($page - 1) * $perPage)
                ->take($perPage)
                ->get(['id', 'name', 'thumbnail_url', 'video_url', 'filename', 'relative_path', 'category', 'equipment', 'level', 'targeted_muscle']);

            $baseUrl = $this->getAssetBaseUrl($request);
            $thumbnails = $rows->map(function ($row) use ($baseUrl) {
                $basename = $row->filename ? pathinfo($row->filename, PATHINFO_FILENAME) : pathinfo($row->name . '.mp4', PATHINFO_FILENAME);
                [, $thumbFile] = $this->resolveThumbnailPath($basename);
                // Only return URL if thumbnail file exists; null allows app to show placeholder
                $thumbnailUrl = null;
                if ($thumbFile !== null) {
                    $thumbnailUrl = $baseUrl . '/api/workout_exercises/thumbnail/' . rawurlencode($thumbFile);
                }
                $videoUrl = $row->video_url;
                if ((empty($videoUrl) || !$this->isValidVideoUrl($videoUrl)) && !empty($row->relative_path)) {
                    $webPath = $this->normalizePathToForwardSlashes($row->relative_path);
                    $encoded = implode('/', array_map('rawurlencode', explode('/', $webPath)));
                    $videoUrl = $baseUrl . '/api/workout_exercises/video/' . $encoded;
                } elseif (!empty($videoUrl) && $this->isValidVideoUrl($videoUrl)) {
                    $videoUrl = $this->toAbsoluteUrl($videoUrl, $baseUrl);
                } else {
                    $videoUrl = null;
                }
                return [
                    'id' => $row->id,
                    'name' => $row->name,
                    'filename' => $row->filename ?: $row->name . '.mp4',
                    'thumbnail_url' => $thumbnailUrl,
                    'video_url' => $videoUrl,
                    'modified' => $row->updated_at ? $row->updated_at->timestamp : null,
                    'category' => $row->category,
                    'equipment' => $row->equipment,
                    'level' => $row->level,
                    'targeted_muscle' => $row->targeted_muscle,
                ];
            })->values()->all();

            $lastPage = (int) ceil($total / $perPage);

            return response()->json([
                'success' => true,
                'thumbnails' => $thumbnails,
                'count' => count($thumbnails),
                'total' => $total,
                'per_page' => $perPage,
                'current_page' => $page,
                'last_page' => $lastPage,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load video catalog thumbnails: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Base URL for building thumbnail/video links in API responses.
     * Uses APP_URL so links work on live server (behind proxy/load balancer); falls back to request host for local dev.
     */
    private function getAssetBaseUrl(Request $request): string
    {
        $appUrl = config('app.url');
        if (!empty($appUrl) && preg_match('#^https?://#', $appUrl)) {
            return rtrim($appUrl, '/');
        }
        return rtrim($request->getSchemeAndHttpHost(), '/');
    }

    /**
     * Normalize URL to absolute so thumbnails/videos load from the same host as the API (fixes "No image" when frontend is on different port).
     */
    private function toAbsoluteUrl(?string $url, string $baseUrl): ?string
    {
        if (empty($url)) {
            return null;
        }
        if (preg_match('#^https?://#', $url)) {
            return $url;
        }
        $path = (strpos($url, '/') === 0) ? $url : '/' . $url;
        return $baseUrl . $path;
    }

    /**
     * Normalize path to forward slashes for URLs (fixes Windows backslash in relative_path on Linux server).
     */
    private function normalizePathToForwardSlashes(string $path): string
    {
        return trim(preg_replace('#[\\\\/]+#', '/', $path), '/');
    }

    /**
     * Return false if stored video_url is malformed (e.g. contains literal "APP_URL=" or invalid format).
     * Callers should then build URL from relative_path instead.
     */
    private function isValidVideoUrl(?string $url): bool
    {
        if ($url === null || trim($url) === '') {
            return false;
        }
        $url = trim($url);
        if (stripos($url, 'APP_URL=') !== false) {
            return false;
        }
        if (preg_match('#^https?://#', $url)) {
            return (bool) filter_var($url, FILTER_VALIDATE_URL);
        }
        $path = (strpos($url, '/') === 0) ? $url : '/' . $url;
        return strpos($path, 'APP_URL=') === false;
    }

    /**
     * Return false if stored thumbnail_url is malformed (e.g. contains "APP_URL=").
     */
    private function isValidThumbnailUrl(?string $url): bool
    {
        if ($url === null || trim($url) === '') {
            return false;
        }
        return stripos(trim($url), 'APP_URL=') === false;
    }

    /**
     * Serve thumbnail image from public/thumbnails (so img src works regardless of web server config).
     * Supports .jpg, .jpeg, .png, .webp. If requested file does not exist (e.g. .jpg), tries same basename with other extensions.
     * Returns placeholder image instead of 404 HTML to prevent "unknown image format" errors in mobile apps.
     * Always returns an image response, never 404 HTML.
     */
    public function serveThumbnail($filename)
    {
        try {
            $decoded = rawurldecode($filename);
            if (strpos($decoded, '..') !== false || strpos($decoded, '/') !== false || strpos($decoded, '\\') !== false) {
                // Return placeholder instead of 404 HTML
                return $this->servePlaceholderImage();
            }
            $path = public_path('thumbnails' . DIRECTORY_SEPARATOR . $decoded);
            if (!is_file($path) || !is_readable($path)) {
                $basename = pathinfo($decoded, PATHINFO_FILENAME);
                [$resolvedPath, $resolvedFilename] = $this->resolveThumbnailPath($basename);
                if ($resolvedPath === null) {
                    // Return placeholder instead of 404 HTML to prevent "unknown image format" errors
                    return $this->servePlaceholderImage();
                }
                $path = $resolvedPath;
                $decoded = $resolvedFilename;
            }
            
            // Double-check file exists and is readable before serving
            if (!is_file($path) || !is_readable($path)) {
                return $this->servePlaceholderImage();
            }
            
            $mime = $this->getThumbnailContentType($decoded);
            return response()->file($path, ['Content-Type' => $mime]);
        } catch (\Exception $e) {
            // On any error, return placeholder image instead of 404 HTML
            \Log::warning('serveThumbnail error for ' . $filename . ': ' . $e->getMessage());
            return $this->servePlaceholderImage();
        }
    }

    /**
     * Serve video file from public/videos (so <video src="..."> works regardless of web server config).
     */
    public function serveVideo($path)
    {
        $decoded = rawurldecode($path);
        if (strpos($decoded, '..') !== false || preg_match('#^\.#', $decoded)) {
            abort(404);
        }
        $normalized = $this->normalizePathToForwardSlashes($decoded);
        $fullPath = public_path('videos' . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $normalized));
        if (!is_file($fullPath) || !is_readable($fullPath)) {
            abort(404);
        }
        return response()->file($fullPath, ['Content-Type' => 'video/mp4']);
    }

    /**
     * Resolve video URL by exercise name (for playback when exercise has no stored video_url).
     * Tries exact match (case-insensitive), filename, then LIKE so "45 degree hyperextension arms to chest" finds the catalog row.
     */
    public function getVideoUrlByName(Request $request)
    {
        $name = trim(preg_replace('/\s+/', ' ', (string) $request->get('name')));
        if ($name === '') {
            return response()->json(['success' => false, 'message' => 'name required'], 400);
        }
        $baseUrl = $this->getAssetBaseUrl($request);
        $nameLower = mb_strtolower($name);
        $nameWithSpaces = str_replace('_', ' ', $name);

        // Try exact match (case-insensitive) first, then filename, then LIKE
        $video = VideoCatalog::where('is_active', true)
            ->where(function ($q) use ($name, $nameLower, $nameWithSpaces) {
                $q->whereRaw('LOWER(TRIM(name)) = ?', [$nameLower])
                    ->orWhereRaw('LOWER(TRIM(REPLACE(name, "_", " "))) = ?', [$nameLower])
                    ->orWhere('filename', $name . '.mp4')
                    ->orWhere('filename', $nameWithSpaces . '.mp4')
                    ->orWhereRaw('LOWER(name) LIKE ?', ['%' . str_replace(['%', '_'], ['\\%', '\\_'], $nameLower) . '%']);
            })
            ->first(['id', 'name', 'filename', 'video_url', 'relative_path', 'thumbnail_url']);

        if (!$video) {
            return response()->json(['success' => false, 'video_url' => null], 200);
        }
        $videoUrl = $video->video_url;
        if ((empty($videoUrl) || !$this->isValidVideoUrl($videoUrl)) && !empty($video->relative_path)) {
            $webPath = $this->normalizePathToForwardSlashes($video->relative_path);
            $encoded = implode('/', array_map('rawurlencode', explode('/', $webPath)));
            $videoUrl = $baseUrl . '/api/workout_exercises/video/' . $encoded;
        } elseif (!empty($videoUrl) && $this->isValidVideoUrl($videoUrl)) {
            $videoUrl = $this->toAbsoluteUrl($videoUrl, $baseUrl);
        } else {
            $videoUrl = null;
        }
        $thumbnailUrl = null;
        if (!empty($video->thumbnail_url) && $this->isValidThumbnailUrl($video->thumbnail_url)) {
            $thumbnailUrl = $this->toAbsoluteUrl($video->thumbnail_url, $baseUrl);
        } else {
            $basename = $video->filename ? pathinfo($video->filename, PATHINFO_FILENAME) : pathinfo($video->name . '.mp4', PATHINFO_FILENAME);
            [, $thumbFile] = $this->resolveThumbnailPath($basename);
            if ($thumbFile !== null) {
                $thumbnailUrl = $baseUrl . '/api/workout_exercises/thumbnail/' . rawurlencode($thumbFile);
            }
        }
        return response()->json([
            'success' => true,
            'video_url' => $videoUrl,
            'thumbnail_url' => $thumbnailUrl,
        ]);
    }
}
