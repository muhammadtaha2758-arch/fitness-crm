<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\VideoCatalog;
use Illuminate\Support\Facades\DB;

class PrepareVideoCatalogFreshImport extends Command
{
    protected $signature = 'videos:prepare-fresh-import
                            {--dry-run : Show what would be updated without changing data}';

    protected $description = 'Before truncating video_catalog: null out workout_activity_plan.exercise_id for plans that reference video_catalog, so playback still works via stored video_link. Then truncate video_catalog and run videos:import for a duplicate-free catalog.';

    public function handle()
    {
        $dryRun = $this->option('dry-run');
        if ($dryRun) {
            $this->warn('Dry run – no changes will be made.');
        }

        $videoCatalogIds = VideoCatalog::pluck('id')->toArray();
        if (empty($videoCatalogIds)) {
            $this->info('video_catalog is empty. Nothing to prepare.');
            return 0;
        }

        $count = DB::table('workout_activity_plans')
            ->whereIn('exercise_id', $videoCatalogIds)
            ->count();

        if ($count === 0) {
            $this->info('No workout_activity_plans reference video_catalog. Safe to truncate video_catalog and run videos:import.');
            return 0;
        }

        $this->info("Found {$count} plan(s) that reference video_catalog. Their video_link is stored, so playback will still work after truncate.");

        if (!$dryRun) {
            $updated = DB::table('workout_activity_plans')
                ->whereIn('exercise_id', $videoCatalogIds)
                ->update(['exercise_id' => null]);
            $this->info("Set exercise_id = null for {$updated} plan(s).");
        } else {
            $this->info("Would set exercise_id = null for {$count} plan(s).");
        }

        $this->newLine();
        $this->info('Next steps for a clean, duplicate-free catalog:');
        $this->line('  1. Truncate video_catalog (e.g. in DB client or: DB::table("video_catalog")->truncate();)');
        $this->line('  2. Run: php artisan videos:import');
        $this->line('Thumbnails in public/thumbnails/ are unchanged; the picker uses video_catalog IDs so selected thumbnail → correct video.');
        return 0;
    }
}
