<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class GenerateVideoThumbnails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'videos:generate-thumbnails 
                            {--force : Force regeneration of existing thumbnails}
                            {--path= : Specific video path to process}
                            {--folder= : Process only videos in a specific folder (e.g., Abdominals_compressed)}
                            {--quality=80 : Thumbnail quality (1-100)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate thumbnail images for all videos in public/videos directory using FFmpeg';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('🎬 Starting video thumbnail generation...');
        
        // Check if FFmpeg is available
        if (!$this->checkFFmpeg()) {
            $this->error('❌ FFmpeg is not installed or not available in PATH');
            $this->info('Please install FFmpeg: https://ffmpeg.org/download.html');
            $this->info('For Windows: Download from https://ffmpeg.org/download.html and add to PATH');
            $this->info('For Ubuntu/Debian: sudo apt install ffmpeg');
            $this->info('For macOS: brew install ffmpeg');
            return 1;
        }

        $force = $this->option('force');
        $quality = (int) $this->option('quality');
        $specificPath = $this->option('path');
        $folderFilter = $this->option('folder');
        
        // Ensure thumbnails directory exists
        $thumbnailsDir = public_path('thumbnails');
        if (!File::exists($thumbnailsDir)) {
            File::makeDirectory($thumbnailsDir, 0755, true);
            $this->info('📁 Created thumbnails directory: ' . $thumbnailsDir);
        }

        // Get videos to process
        $videosPath = public_path('videos');
        if ($specificPath) {
            $videos = [$specificPath];
        } else {
            $videos = $this->getVideoFiles($videosPath, $folderFilter);
        }

        if (empty($videos)) {
            $this->warn('⚠️  No video files found in: ' . $videosPath);
            return 0;
        }

        $this->info('📹 Found ' . count($videos) . ' video files to process');
        
        $progressBar = $this->output->createProgressBar(count($videos));
        $progressBar->start();

        $processed = 0;
        $skipped = 0;
        $errors = 0;

        foreach ($videos as $videoPath) {
            try {
                $result = $this->generateThumbnail($videoPath, $thumbnailsDir, $force, $quality);
                
                if ($result === 'generated') {
                    $processed++;
                } elseif ($result === 'skipped') {
                    $skipped++;
                }
                
            } catch (\Exception $e) {
                $errors++;
                $this->error("\n❌ Error processing {$videoPath}: " . $e->getMessage());
            }
            
            $progressBar->advance();
        }

        $progressBar->finish();
        
        $this->newLine();
        $this->info('✅ Thumbnail generation completed!');
        $this->info("📊 Results: {$processed} generated, {$skipped} skipped, {$errors} errors");
        
        return 0;
    }

    /**
     * Check if FFmpeg is available
     */
    private function checkFFmpeg(): bool
    {
        $ffmpeg = $this->resolveBinary('ffmpeg');
        $ffprobe = $this->resolveBinary('ffprobe');
        $out = [];
        $rc = 0;
        exec('"' . $ffmpeg . '" -version 2>&1', $out, $rc);
        if ($rc !== 0) return false;
        $out = [];
        $rc = 0;
        exec('"' . $ffprobe . '" -version 2>&1', $out, $rc);
        return $rc === 0;
    }

    /**
     * Attempt to resolve a binary path from ENV, Composer vendor bin, or system PATH.
     */
    private function resolveBinary(string $name): string
    {
        // 1) ENV overrides
        $envMap = [
            'ffmpeg' => env('FFMPEG_PATH'),
            'ffprobe' => env('FFPROBE_PATH'),
        ];
        $envPath = $envMap[$name] ?? null;
        if ($envPath && file_exists($envPath)) {
            return $envPath;
        }

        // 2) Composer vendor/bin (cross-platform)
        $candidates = [
            base_path('vendor/bin/' . $name),
            base_path('vendor/bin/' . $name . '.exe'),
            // Common package binary locations
            base_path('vendor/ffmpeg/ffmpeg/' . $name),
            base_path('vendor/ffmpeg/ffmpeg/' . $name . '.exe'),
            base_path('vendor/php-ffmpeg/ffmpeg-binaries/bin/' . $name),
            base_path('vendor/php-ffmpeg/ffmpeg-binaries/bin/' . $name . '.exe'),
        ];
        foreach ($candidates as $path) {
            if ($path && file_exists($path)) {
                return $path;
            }
        }

        // 3) Fallback to system PATH
        return $name;
    }

    /**
     * Get all video files recursively
     */
    private function getVideoFiles(string $directory, ?string $folderFilter = null): array
    {
        $videos = [];
        $iterator = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($directory, \RecursiveDirectoryIterator::SKIP_DOTS)
        );

        foreach ($iterator as $file) {
            if ($file->isFile() && $this->isVideoFile($file->getExtension())) {
                $filePath = $file->getPathname();
                
                // Filter by folder if specified
                if ($folderFilter) {
                    $relativePath = str_replace($directory . DIRECTORY_SEPARATOR, '', $filePath);
                    $pathParts = explode(DIRECTORY_SEPARATOR, $relativePath);
                    if (empty($pathParts) || $pathParts[0] !== $folderFilter) {
                        continue;
                    }
                }
                
                $videos[] = $filePath;
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

    /**
     * Generate thumbnail for a single video using FFmpeg
     */
    private function generateThumbnail(string $videoPath, string $thumbnailsDir, bool $force, int $quality): string
    {
        $relativePath = str_replace(public_path('videos') . DIRECTORY_SEPARATOR, '', $videoPath);
        $thumbnailPath = $thumbnailsDir . DIRECTORY_SEPARATOR . pathinfo($relativePath, PATHINFO_FILENAME) . '.jpg';
        
        // Check if thumbnail already exists
        if (!$force && File::exists($thumbnailPath)) {
            return 'skipped';
        }

        try {
            // Get video duration first; use 0 (first frame) when Duration is N/A to avoid "Output file does not contain any stream"
            $thumbnailTime = 0;
            $ffprobe = $this->resolveBinary('ffprobe');
            $durationCmd = '"' . $ffprobe . '" -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ' . '"' . $videoPath . '" 2>&1';
            $duration = trim((string) shell_exec($durationCmd));
            if ($duration !== '' && is_numeric($duration)) {
                $duration = (float) $duration;
                $thumbnailTime = $duration > 0 ? min(1.0, $duration * 0.1) : 0;
            }

            // FFmpeg: -ss before -i for fast seek; use 0 when duration unknown to avoid "Output file does not contain any stream"
            $ffmpeg = $this->resolveBinary('ffmpeg');
            $ssArg = ' -ss ' . $thumbnailTime . ' ';
            $cmd = '"' . $ffmpeg . '"' . $ssArg . '-i ' . '"' . $videoPath . '"' . ' -vframes 1 -q:v ' . $quality . ' -update 1 ' . '"' . $thumbnailPath . '" 2>&1';
            $output = [];
            $returnCode = 0;
            exec($cmd, $output, $returnCode);

            // If failed (e.g. Duration:N/A or "no stream"), retry with -ss after -i to capture first frame
            if ($returnCode !== 0) {
                $cmdFallback = '"' . $ffmpeg . '" -i ' . '"' . $videoPath . '"' . ' -ss 0 -vframes 1 -q:v ' . $quality . ' -update 1 ' . '"' . $thumbnailPath . '" 2>&1';
                exec($cmdFallback, $output, $returnCode);
            }
            
            if ($returnCode !== 0) {
                throw new \Exception("FFmpeg failed: " . implode("\n", $output));
            }
            
            if (!File::exists($thumbnailPath)) {
                throw new \Exception("Thumbnail file was not created");
            }
            
            return 'generated';
            
        } catch (\Exception $e) {
            throw new \Exception("FFmpeg error: " . $e->getMessage());
        }
    }
}