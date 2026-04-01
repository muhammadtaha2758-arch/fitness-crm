<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\VideoCatalog;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ImportVideosToCatalog extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'videos:import 
                            {--force : Force update existing records}
                            {--excel= : Path to Excel file (default: uploads/excel/video_catalog.xlsx)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import videos from public/videos directory to video_catalog table. For a clean slate with no duplicates: 1) php artisan videos:prepare-fresh-import, 2) Truncate video_catalog, 3) Run this command (videos:import). Each file is imported once (matched by filename + relative_path). Thumbnail picker uses video_catalog id + video_url so the selected thumbnail always plays the correct video.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('🎬 Starting video import...');
        
        $videosPath = public_path('videos');
        $excelPath = $this->option('excel') ?: base_path('uploads/excel/video_catalog.xlsx');
        
        // Check if videos directory exists
        if (!is_dir($videosPath)) {
            $this->error("❌ Videos directory not found: {$videosPath}");
            return 1;
        }
        
        // Read Excel catalog
        $catalogData = $this->readExcelCatalog($excelPath);
        $this->info('📊 Loaded ' . count($catalogData) . ' entries from Excel catalog');
        
        // Scan video files
        $videoFiles = $this->getVideoFilesRecursively($videosPath);
        $this->info('📁 Found ' . count($videoFiles) . ' video files');
        
        if (empty($videoFiles)) {
            $this->warn('⚠️  No video files found in: ' . $videosPath);
            return 1;
        }
        
        $imported = 0;
        $updated = 0;
        $skipped = 0;
        $errors = [];
        
        $this->info('🔄 Processing videos...');
        $bar = $this->output->createProgressBar(count($videoFiles));
        $bar->start();
        
        DB::beginTransaction();
        
        try {
            foreach ($videoFiles as $filePath) {
                try {
                    $result = $this->processVideoFile($filePath, $videosPath, $catalogData);
                    
                    if ($result['action'] === 'created') {
                        $imported++;
                    } elseif ($result['action'] === 'updated') {
                        $updated++;
                    } else {
                        $skipped++;
                    }
                    
                    $bar->advance();
                } catch (\Exception $e) {
                    $errors[] = [
                        'file' => basename($filePath),
                        'error' => $e->getMessage()
                    ];
                    $this->newLine();
                    $this->error("❌ Error processing " . basename($filePath) . ": " . $e->getMessage());
                    $bar->advance();
                }
            }
            
            $bar->finish();
            $this->newLine(2);
            
            DB::commit();
            
            $this->info('✅ Import Complete!');
            $this->table(
                ['Status', 'Count'],
                [
                    ['Imported', $imported],
                    ['Updated', $updated],
                    ['Skipped', $skipped],
                    ['Errors', count($errors)],
                ]
            );
            
            if (!empty($errors)) {
                $this->warn("\n⚠️  Errors encountered (" . count($errors) . "):");
                foreach (array_slice($errors, 0, 10) as $error) {
                    $this->error("  - {$error['file']}: {$error['error']}");
                }
                if (count($errors) > 10) {
                    $this->warn("  ... and " . (count($errors) - 10) . " more errors");
                }
            }
            
        } catch (\Exception $e) {
            DB::rollBack();
            $this->newLine();
            $this->error("❌ Import failed: " . $e->getMessage());
            $this->error("Stack trace: " . $e->getTraceAsString());
            return 1;
        }
        
        return 0;
    }
    
    /**
     * Read Excel catalog file
     */
    private function readExcelCatalog($excelPath)
    {
        $catalogData = [];
        
        if (!file_exists($excelPath)) {
            $this->warn("⚠️  Excel catalog not found at: {$excelPath}");
            $this->info("Continuing without Excel metadata...");
            return $catalogData;
        }
        
        try {
            $reader = IOFactory::createReaderForFile($excelPath);
            $reader->setReadDataOnly(true);
            $spreadsheet = $reader->load($excelPath);
            $sheet = $spreadsheet->getActiveSheet();
            $rows = $sheet->toArray(null, true, true, true);
            
            if (empty($rows)) {
                return $catalogData;
            }
            
            // First row is headers
            $headerRow = array_shift($rows);
            $headers = array_values(array_map(function($h) { 
                return trim((string)$h); 
            }, $headerRow));
            
            // Find filename column index
            $filenameIndex = null;
            foreach ($headers as $idx => $h) {
                $lh = strtolower($h);
                if (strpos($lh, 'file') !== false || strpos($lh, 'video') !== false || 
                    $lh === 'filename' || $lh === 'name') {
                    $filenameIndex = $idx;
                    break;
                }
            }
            
            if ($filenameIndex === null) {
                $this->warn("⚠️  Could not find filename column in Excel");
                return $catalogData;
            }
            
            // Build catalog data indexed by filename
            foreach ($rows as $row) {
                $values = array_values($row);
                $filename = isset($values[$filenameIndex]) ? trim((string)$values[$filenameIndex]) : '';
                
                if ($filename === '') {
                    continue;
                }
                
                $meta = [];
                foreach ($headers as $idx => $key) {
                    $key = $key ?: 'col_' . $idx;
                    $meta[$key] = isset($values[$idx]) ? trim((string)$values[$idx]) : '';
                }
                
                $catalogData[strtolower($filename)] = $meta;
            }
            
        } catch (\Exception $e) {
            $this->warn("⚠️  Error reading Excel file: " . $e->getMessage());
            $this->info("Continuing without Excel metadata...");
        }
        
        return $catalogData;
    }
    
    /**
     * Get all video files recursively from directory
     */
    private function getVideoFilesRecursively($directory)
    {
        $videos = [];
        $iterator = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($directory, \RecursiveDirectoryIterator::SKIP_DOTS)
        );
        
        foreach ($iterator as $file) {
            if ($file->isFile() && strtolower($file->getExtension()) === 'mp4') {
                $videos[] = $file->getPathname();
            }
        }
        
        return $videos;
    }
    
    /**
     * Process a single video file
     */
    private function processVideoFile($filePath, $videosBasePath, $catalogData)
    {
        $relativePath = str_replace($videosBasePath . DIRECTORY_SEPARATOR, '', $filePath);
        $filename = basename($filePath);
        $fileInfo = pathinfo($filePath);
        $fileSize = filesize($filePath);
        $fileSizeMB = round($fileSize / (1024 * 1024), 2);
        $modifiedDate = date('Y-m-d H:i:s', filemtime($filePath));
        
        // Match with Excel catalog data
        $lowerFilename = strtolower($filename);
        $meta = $catalogData[$lowerFilename] ?? $catalogData[strtolower($fileInfo['filename'])] ?? [];
        
        // Map Excel columns to database fields
        // Try multiple possible column name variations
        $name = $meta['name'] ?? $meta['Name'] ?? $fileInfo['filename'];
        $quality = $meta['quality'] ?? $meta['Quality'] ?? $this->extractQualityFromPath($relativePath);
        $category = $meta['category'] ?? $meta['Category'] ?? $this->extractCategoryFromPath($relativePath);
        $subcategory = $meta['subcategory'] ?? $meta['Subcategory'] ?? $this->extractSubcategoryFromPath($relativePath);
        $description = $meta['description'] ?? $meta['Description'] ?? null;
        $tags = $this->parseTags($meta['tags'] ?? $meta['Tags'] ?? null);
        $duration = $this->getVideoDuration($filePath);
        // Body part / targeted muscle (for filter: "Body part" -> chest)
        $targetedMuscle = $meta['targeted_muscle'] ?? $meta['Targeted muscle'] ?? $meta['Body part'] ?? $meta['Body Part'] ?? null;
        $level = $meta['level'] ?? $meta['Level'] ?? null;
        $equipment = $meta['equipment'] ?? $meta['Equipment'] ?? null;
        
        // Build URLs
        $webPath = str_replace(DIRECTORY_SEPARATOR, '/', $relativePath);
        $encodedRelativeUrl = implode('/', array_map('rawurlencode', explode('/', $webPath)));
        $videoUrl = url('/videos/' . $encodedRelativeUrl);
        
        // Check for thumbnail
        $thumbnailsPath = public_path('thumbnails');
        $thumbnailPath = $thumbnailsPath . DIRECTORY_SEPARATOR . $fileInfo['filename'] . '.jpg';
        $thumbnailUrl = file_exists($thumbnailPath) ? url('/thumbnails/' . $fileInfo['filename'] . '.jpg') : null;
        
        // Prepare data (only set keys that exist on VideoCatalog model)
        $videoData = [
            'filename' => $filename,
            'name' => $name,
            'category' => $category,
            'file_size_mb' => $fileSizeMB,
            'modified_date' => $modifiedDate,
            'relative_path' => $relativePath,
            'full_path' => $filePath,
            'video_url' => $videoUrl,
            'thumbnail_url' => $thumbnailUrl,
            'is_active' => true,
        ];
        if ($targetedMuscle !== null && $targetedMuscle !== '') {
            $videoData['targeted_muscle'] = $targetedMuscle;
        }
        if ($level !== null && $level !== '') {
            $videoData['level'] = $level;
        }
        if ($equipment !== null && $equipment !== '') {
            $videoData['equipment'] = $equipment;
        }
        
        // Check if video already exists
        $existing = VideoCatalog::where('filename', $filename)
            ->where('relative_path', $relativePath)
            ->first();
        
        if ($existing) {
            if ($this->option('force')) {
                $existing->update($videoData);
                return ['action' => 'updated', 'video' => $existing];
            } else {
                return ['action' => 'skipped', 'video' => $existing];
            }
        } else {
            $video = VideoCatalog::create($videoData);
            return ['action' => 'created', 'video' => $video];
        }
    }
    
    /**
     * Extract quality from path
     */
    private function extractQualityFromPath($relativePath)
    {
        // Extract quality from path like "4K UHD 2160P" or "FULL HD 1080P"
        if (stripos($relativePath, '4K') !== false || stripos($relativePath, '2160P') !== false) {
            return '4K UHD 2160P';
        } elseif (stripos($relativePath, '1080P') !== false || stripos($relativePath, 'FULL HD') !== false) {
            return 'FULL HD 1080P';
        } elseif (stripos($relativePath, '720P') !== false || stripos($relativePath, 'HD') !== false) {
            return 'HD 720P';
        } elseif (stripos($relativePath, 'VERTICAL') !== false) {
            return 'Vertical';
        } elseif (stripos($relativePath, 'Illustrations') !== false) {
            return 'High Resolution Images';
        }
        return null;
    }
    
    /**
     * Extract category from path
     */
    private function extractCategoryFromPath($relativePath)
    {
        // Extract category from path structure
        // Path format: Quality/Category/Subcategory/filename.mp4
        $parts = explode(DIRECTORY_SEPARATOR, $relativePath);
        
        // Skip quality folder (first part), get category (second part)
        if (count($parts) >= 2) {
            return $parts[1] ?? null;
        }
        return null;
    }
    
    /**
     * Extract subcategory from path
     */
    private function extractSubcategoryFromPath($relativePath)
    {
        // Extract subcategory if exists
        $parts = explode(DIRECTORY_SEPARATOR, $relativePath);
        
        // Path format: Quality/Category/Subcategory/filename.mp4
        if (count($parts) >= 3) {
            return $parts[2] ?? null;
        }
        return null;
    }
    
    /**
     * Parse tags from string or array
     */
    private function parseTags($tagsString)
    {
        if (empty($tagsString)) {
            return null;
        }
        
        // Handle comma-separated or array format
        if (is_string($tagsString)) {
            $tags = array_map('trim', explode(',', $tagsString));
            $tags = array_filter($tags);
            return !empty($tags) ? $tags : null;
        }
        
        return is_array($tagsString) ? $tagsString : null;
    }
    
    /**
     * Get video duration using ffprobe if available
     */
    private function getVideoDuration($filePath)
    {
        // Try to get duration using ffprobe if available
        try {
            if (function_exists('shell_exec')) {
                $command = sprintf(
                    'ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "%s" 2>&1',
                    escapeshellarg($filePath)
                );
                $output = shell_exec($command);
                if ($output && is_numeric(trim($output))) {
                    return (int)round(trim($output)); // Return duration in seconds
                }
            }
        } catch (\Exception $e) {
            // Silently fail if ffprobe not available
        }
        
        return null;
    }
}

