<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerateThumbnailsQuick extends Command
{
    protected $signature = 'videos:quick-thumbnails';
    protected $description = 'Generate thumbnails quickly using direct FFmpeg calls';

    public function handle()
    {
        $this->info('🎬 Starting quick thumbnail generation...');
        
        $videosPath = public_path('videos');
        $thumbnailsPath = public_path('thumbnails');
        
        // Ensure thumbnails directory exists
        if (!File::exists($thumbnailsPath)) {
            File::makeDirectory($thumbnailsPath, 0755, true);
        }
        
        $ffmpeg = 'C:\ffmpeg\bin\ffmpeg.exe';
        $ffprobe = 'C:\ffmpeg\bin\ffprobe.exe';
        
        // Get all video files
        $videoFiles = $this->getVideoFiles($videosPath);
        $total = count($videoFiles);
        
        $this->info("📹 Found {$total} video files to process");
        
        $bar = $this->output->createProgressBar($total);
        $bar->start();
        
        $success = 0;
        $errors = 0;
        
        foreach ($videoFiles as $videoFile) {
            try {
                $relativePath = str_replace($videosPath . DIRECTORY_SEPARATOR, '', $videoFile);
                $filename = pathinfo($videoFile, PATHINFO_FILENAME);
                $thumbnailPath = $thumbnailsPath . DIRECTORY_SEPARATOR . $filename . '.jpg';
                
                // Skip if thumbnail already exists and is large enough
                if (File::exists($thumbnailPath) && File::size($thumbnailPath) > 10000) {
                    $bar->advance();
                    continue;
                }
                
                // Simple FFmpeg command - just take frame at 1 second
                $cmd = "\"{$ffmpeg}\" -i \"{$videoFile}\" -ss 1 -vframes 1 -q:v 80 -update 1 \"{$thumbnailPath}\" 2>nul";
                
                exec($cmd, $output, $returnCode);
                
                if ($returnCode === 0 && File::exists($thumbnailPath)) {
                    $success++;
                } else {
                    $errors++;
                }
                
            } catch (\Exception $e) {
                $errors++;
            }
            
            $bar->advance();
        }
        
        $bar->finish();
        $this->newLine();
        
        $this->info("✅ Generated {$success} thumbnails");
        if ($errors > 0) {
            $this->warn("⚠️  {$errors} errors occurred");
        }
        
        return 0;
    }
    
    private function getVideoFiles($path)
    {
        $files = [];
        $iterator = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($path));
        
        foreach ($iterator as $file) {
            if ($file->isFile() && in_array(strtolower($file->getExtension()), ['mp4', 'avi', 'mov', 'mkv'])) {
                $files[] = $file->getPathname();
            }
        }
        
        return $files;
    }
}
