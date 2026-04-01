<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Food;
use League\Csv\Reader;

class ImportFoods extends Command
{
    protected $signature = 'import:foods';
    protected $description = 'Import new foods without overwriting existing ones';

    public function handle()
    {
        $path = storage_path('app/foods_updated_types.csv');
    
        if (!file_exists($path)) {
            $this->error("CSV file not found at: " . $path);
            return;
        }
    
        $csv = Reader::createFromPath($path, 'r');
        $csv->setHeaderOffset(0);
    
        // Load all existing IDs once (fast)
        $existingIDs = Food::pluck('id')->toArray();
    
        $batch = [];
        $batchSize = 500; // insert 500 at once
        $newCount = 0;
        $skipCount = 0;
    
        foreach ($csv as $record) {
    
            if (in_array($record['id'], $existingIDs)) {
                $skipCount++;
                continue;
            }
    
            $batch[] = $record;
            $newCount++;
    
            // Insert in batches
            if (count($batch) === $batchSize) {
                Food::insert($batch);
                $batch = [];
            }
        }
    
        // Insert remaining rows
        if (!empty($batch)) {
            Food::insert($batch);
        }
    
        $this->info("Import complete!");
        $this->info("New foods inserted: $newCount");
        $this->info("Existing foods skipped: $skipCount");
    }
}