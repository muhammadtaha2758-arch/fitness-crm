<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerateVideoThumbnailsSimple extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'videos:generate-thumbnails-simple 
                            {--force : Force regeneration of existing thumbnails}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate placeholder thumbnails for videos (no FFmpeg required)';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('🎬 Starting simple thumbnail generation...');
        
        $force = $this->option('force');
        
        // Ensure thumbnails directory exists
        $thumbnailsDir = public_path('thumbnails');
        if (!File::exists($thumbnailsDir)) {
            File::makeDirectory($thumbnailsDir, 0755, true);
            $this->info('📁 Created thumbnails directory: ' . $thumbnailsDir);
        }

        // Get videos to process
        $videosPath = public_path('videos');
        $videos = $this->getVideoFiles($videosPath);

        if (empty($videos)) {
            $this->warn('⚠️  No video files found in: ' . $videosPath);
            return 0;
        }

        $this->info('📹 Found ' . count($videos) . ' video files to process');
        
        $progressBar = $this->output->createProgressBar(count($videos));
        $progressBar->start();

        $processed = 0;
        $skipped = 0;

        foreach ($videos as $videoPath) {
            try {
                $result = $this->generatePlaceholderThumbnail($videoPath, $thumbnailsDir, $force);
                
                if ($result === 'generated') {
                    $processed++;
                } elseif ($result === 'skipped') {
                    $skipped++;
                }
                
            } catch (\Exception $e) {
                $this->error("\n❌ Error processing {$videoPath}: " . $e->getMessage());
            }
            
            $progressBar->advance();
        }

        $progressBar->finish();
        
        $this->newLine();
        $this->info('✅ Placeholder thumbnail generation completed!');
        $this->info("📊 Results: {$processed} generated, {$skipped} skipped");
        $this->info('💡 To generate real thumbnails, install FFmpeg and run: php artisan videos:generate-thumbnails');
        
        return 0;
    }

    /**
     * Get all video files recursively
     */
    private function getVideoFiles(string $directory): array
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

    /**
     * Generate a placeholder thumbnail using PHP GD
     */
    private function generatePlaceholderThumbnail(string $videoPath, string $thumbnailsDir, bool $force): string
    {
        $relativePath = str_replace(public_path('videos') . DIRECTORY_SEPARATOR, '', $videoPath);
        $thumbnailPath = $thumbnailsDir . DIRECTORY_SEPARATOR . pathinfo($relativePath, PATHINFO_FILENAME) . '.jpg';
        
        // Check if thumbnail already exists
        if (!$force && File::exists($thumbnailPath)) {
            return 'skipped';
        }

        try {
            // Create a placeholder thumbnail using GD
            $width = 320;
            $height = 180;
            
            // Create image
            $image = imagecreatetruecolor($width, $height);
            
            // Define colors
            $bgColor = imagecolorallocate($image, 45, 45, 45); // Dark gray background
            $textColor = imagecolorallocate($image, 255, 255, 255); // White text
            $iconColor = imagecolorallocate($image, 255, 64, 64); // Red icon color
            
            // Fill background
            imagefill($image, 0, 0, $bgColor);
            
            // Draw play icon (simple triangle)
            $centerX = $width / 2;
            $centerY = $height / 2;
            $triangleSize = 30;
            
            $points = [
                $centerX - $triangleSize, $centerY - $triangleSize,
                $centerX + $triangleSize, $centerY,
                $centerX - $triangleSize, $centerY + $triangleSize
            ];
            
            imagefilledpolygon($image, $points, 3, $iconColor);
            
            // Add text
            $fontSize = 3;
            $text = 'VIDEO';
            $textWidth = imagefontwidth($fontSize) * strlen($text);
            $textX = ($width - $textWidth) / 2;
            $textY = $centerY + $triangleSize + 20;
            
            imagestring($image, $fontSize, $textX, $textY, $text, $textColor);
            
            // Save image
            imagejpeg($image, $thumbnailPath, 85);
            imagedestroy($image);
            
            return 'generated';
            
        } catch (\Exception $e) {
            throw new \Exception("GD error: " . $e->getMessage());
        }
    }
}
