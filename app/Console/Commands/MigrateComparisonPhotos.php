<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\ComparisonPhoto;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MigrateComparisonPhotos extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'photos:migrate-comparison {--force : Force migration even if records exist}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate existing comparison photos from directory to database';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(): int
    {
        $this->info('Starting migration of comparison photos...');

        $directory = public_path('images/comparison-photos');
        
        if (!File::exists($directory)) {
            $this->error('Directory does not exist: ' . $directory);
            return 1;
        }

        $files = File::files($directory);
        $migratedCount = 0;
        $skippedCount = 0;
        $errorCount = 0;

        $this->info('Found ' . count($files) . ' files to process...');

        foreach ($files as $file) {
            try {
                $filename = $file->getFilename();
                $filePath = 'images/comparison-photos/' . $filename;
                
                // Check if already exists in database
                $existingPhoto = ComparisonPhoto::where('image_name', $filename)->first();
                if ($existingPhoto && !$this->option('force')) {
                    $this->line("Skipping {$filename} (already exists)");
                    $skippedCount++;
                    continue;
                }

                // If force option is used and record exists, update it
                if ($existingPhoto && $this->option('force')) {
                    $existingPhoto->update([
                        'gym_id' => $existingPhoto->gym_id ?? 1,
                        'image_data' => $filePath,
                        'uploaded_at' => now(),
                    ]);
                    $this->line("Updated {$filename}");
                    $migratedCount++;
                    continue;
                }

                // Create new database record (default gym_id to 1 for console commands)
                ComparisonPhoto::create([
                    'gym_id' => 1,
                    'image_name' => $filename,
                    'image_data' => $filePath,
                    'uploaded_at' => now(),
                ]);

                $this->line("Migrated {$filename}");
                $migratedCount++;

            } catch (\Exception $e) {
                $this->error("Failed to migrate {$file->getFilename()}: " . $e->getMessage());
                $errorCount++;
            }
        }

        $this->newLine();
        $this->info('Migration completed!');
        $this->info("Migrated: {$migratedCount}");
        $this->info("Skipped: {$skippedCount}");
        $this->info("Errors: {$errorCount}");

        return 0;
    }
}
