<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\VideoCatalog;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ImportExerciseDataToVideoCatalog extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'video_catalog:import-exercise-data
                            {--excel= : Path to Excel file (e.g. C:\\Users\\kk\\Downloads\\exercise data.xlsx)}
                            {--dry-run : Show what would be updated without writing}
                            {--clear-metadata : Set exercise metadata columns to null for all rows before import (use before re-import to fix mismatched data)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import exercise metadata from Excel into video_catalog. Columns: Categories, Exercise, Exercise Instructions, Exercise Tips, Primary/Secondary Activating Muscles, Equipment. Matches by Exercise name or filename.';

    /**
     * Excel column name variations (first match wins).
     */
    private $columnMap = [
        'category' => ['Categories', 'Category', 'category'],
        'name' => ['Exercise', 'Name', 'name', 'Exercise Name'],
        'filename' => ['Filename', 'filename', 'Video File', 'File Name'],
        'exercise_instructions' => ['Exercise Instructions (step by step)', 'Exercise Instructions', 'exercise_instructions', 'Instructions'],
        'exercise_tips' => ['Exercise Tips', 'Tips', 'exercise_tips'],
        'primary_activating_muscles' => ['Primary Activating Muscles', 'Primary Muscles', 'primary_activating_muscles'],
        'secondary_activating_muscles' => ['Secondary Activating Muscles', 'Secondary Muscles', 'secondary_activating_muscles'],
        'equipment' => ['Equipment', 'equipment'],
    ];

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $excelPath = $this->option('excel');
        if (!$excelPath || !file_exists($excelPath)) {
            $this->error('Please provide a valid --excel path. Example: --excel="C:\Users\kk\Downloads\exercise data.xlsx"');
            return 1;
        }

        $this->info('📂 Reading: ' . $excelPath);
        $rows = $this->readExcelRows($excelPath);
        if (empty($rows)) {
            $this->error('No data rows found in Excel.');
            return 1;
        }

        $this->info('📊 Loaded ' . count($rows) . ' rows from Excel.');
        $dryRun = $this->option('dry-run');
        $clearMetadata = $this->option('clear-metadata');
        if ($dryRun) {
            $this->warn('Dry run: no changes will be written.');
        }

        if ($clearMetadata && !$dryRun) {
            $this->info('Clearing exercise metadata columns for all video_catalog rows...');
            VideoCatalog::query()->update([
                'exercise_instructions' => null,
                'exercise_tips' => null,
                'primary_activating_muscles' => null,
                'secondary_activating_muscles' => null,
            ]);
            $this->info('Cleared.');
        }

        $updated = 0;
        $skipped = 0;
        $notFound = 0;
        $errors = [];

        DB::beginTransaction();
        try {
            $bar = $this->output->createProgressBar(count($rows));
            $bar->start();

            foreach ($rows as $row) {
                $exerciseName = $this->getCell($row, 'name');
                if (trim((string) $exerciseName) === '') {
                    $skipped++;
                    $bar->advance();
                    continue;
                }

                $excelFilename = $this->getCell($row, 'filename');
                $video = $this->findVideoCatalogEntry($exerciseName, $excelFilename);
                if (!$video) {
                    $notFound++;
                    $bar->advance();
                    continue;
                }

                $data = $this->mapRowToVideoData($row);
                if (empty($data)) {
                    $skipped++;
                    $bar->advance();
                    continue;
                }

                if (!$dryRun) {
                    try {
                        $video->update($data);
                    } catch (\Exception $e) {
                        $errors[] = ['exercise' => $exerciseName, 'error' => $e->getMessage()];
                    }
                }
                $updated++;
                $bar->advance();
            }

            $bar->finish();
            $this->newLine(2);

            if (!$dryRun) {
                DB::commit();
            } else {
                DB::rollBack();
            }

            $this->info('✅ Import complete.');
            $this->table(
                ['Status', 'Count'],
                [
                    ['Updated', $updated],
                    ['Skipped (empty or no changes)', $skipped],
                    ['Not found in video_catalog', $notFound],
                    ['Errors', count($errors)],
                ]
            );

            if (!empty($errors)) {
                $this->warn('Errors:');
                foreach (array_slice($errors, 0, 10) as $e) {
                    $this->error("  - {$e['exercise']}: {$e['error']}");
                }
                if (count($errors) > 10) {
                    $this->warn('  ... and ' . (count($errors) - 10) . ' more.');
                }
            }
        } catch (\Exception $e) {
            DB::rollBack();
            $this->error('Import failed: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }

    /**
     * Read Excel and return array of rows (associative by column key).
     *
     * @param string $path
     * @return array<int, array<string, mixed>>
     */
    private function readExcelRows($path)
    {
        $spreadsheet = IOFactory::load($path);
        $sheet = $spreadsheet->getActiveSheet();
        $rows = $sheet->toArray(null, true, true, true);

        if (count($rows) < 2) {
            return [];
        }

        // PhpSpreadsheet toArray() uses 1-based row keys; first row is headers
        $firstKey = array_key_first($rows);
        $headerRow = array_values($rows[$firstKey] ?? []);
        $headers = array_map(function ($h) {
            return trim((string) $h);
        }, $headerRow);

        $colToKey = [];
        foreach ($this->columnMap as $key => $variations) {
            foreach ($variations as $v) {
                $idx = array_search($v, $headers, true);
                if ($idx !== false) {
                    $colToKey[$idx] = $key;
                    break;
                }
            }
        }

        $rowKeys = array_keys($rows);
        $dataRowKeys = array_slice($rowKeys, 1);
        $result = [];
        $lastExerciseName = null;
        foreach ($dataRowKeys as $rowKey) {
            $values = array_values($rows[$rowKey] ?? []);
            $assoc = [];
            foreach ($colToKey as $idx => $key) {
                $assoc[$key] = isset($values[$idx]) ? $values[$idx] : null;
            }
            // Carry forward: if this row has no exercise name but has other data, use previous row's name (fixes merged cells / grouped rows)
            $exerciseName = isset($assoc['name']) ? trim((string) $assoc['name']) : '';
            if ($exerciseName !== '') {
                $lastExerciseName = $exerciseName;
            } elseif ($lastExerciseName !== null && $this->rowHasDetailData($assoc)) {
                $assoc['name'] = $lastExerciseName;
            }
            $result[] = $assoc;
        }

        return $result;
    }

    /**
     * True if row has at least one non-empty detail field (so we can carry forward exercise name).
     */
    private function rowHasDetailData(array $row)
    {
        $detailKeys = ['category', 'exercise_instructions', 'exercise_tips', 'primary_activating_muscles', 'secondary_activating_muscles', 'equipment'];
        foreach ($detailKeys as $key) {
            $v = $row[$key] ?? null;
            if ($v !== null && trim((string) $v) !== '') {
                return true;
            }
        }
        return false;
    }

    private function getCell(array $row, $key)
    {
        return $row[$key] ?? null;
    }

    /**
     * Find video_catalog row by Exercise name or Filename. Uses only exact/normalized matches
     * so one Excel row is never applied to multiple videos (avoids mismatched data).
     *
     * @param string|null $excelFilename Optional column "Filename" for exact catalog match
     */
    private function findVideoCatalogEntry($exerciseName, $excelFilename = null)
    {
        $name = trim((string) $exerciseName);
        $filename = $excelFilename !== null && $excelFilename !== '' ? trim((string) $excelFilename) : null;

        // If spreadsheet has Filename column, prefer exact filename match first
        if ($filename !== null) {
            $video = VideoCatalog::where('filename', $filename)->first();
            if ($video) {
                return $video;
            }
            $video = VideoCatalog::whereRaw('LOWER(TRIM(filename)) = ?', [mb_strtolower($filename)])->first();
            if ($video) {
                return $video;
            }
        }

        if ($name === '') {
            return null;
        }

        $normalized = preg_replace('/\.(mp4|mov|avi)$/i', '', $name);
        $nameLower = mb_strtolower($name);
        $normalizedLower = mb_strtolower($normalized);

        // 1. Exact name match
        $video = VideoCatalog::where('name', $name)->first();
        if ($video) {
            return $video;
        }
        // 2. Exact filename match
        $video = VideoCatalog::where('filename', $name)->first();
        if ($video) {
            return $video;
        }
        // 3. Name = normalized (no extension)
        $video = VideoCatalog::where('name', $normalized)->first();
        if ($video) {
            return $video;
        }
        // 4. Filename = normalized + .mp4
        $video = VideoCatalog::where('filename', $normalized . '.mp4')->first();
        if ($video) {
            return $video;
        }
        // 5. Case-insensitive exact name
        $video = VideoCatalog::whereRaw('LOWER(TRIM(name)) = ?', [$nameLower])->first();
        if ($video) {
            return $video;
        }
        // 6. Case-insensitive filename (with .mp4)
        $video = VideoCatalog::whereRaw('LOWER(TRIM(filename)) = ?', [$normalizedLower . '.mp4'])->first();
        if ($video) {
            return $video;
        }
        // 7. Filename without extension matches name (case-insensitive)
        $video = VideoCatalog::whereRaw('LOWER(TRIM(REPLACE(filename, \'.mp4\', \'\'))) = ?', [$normalizedLower])->first();
        if ($video) {
            return $video;
        }

        // No fuzzy LIKE - prevents one Excel row from updating multiple catalog entries
        return null;
    }

    /**
     * Build update array for VideoCatalog (only non-empty values).
     */
    private function mapRowToVideoData(array $row)
    {
        $data = [];
        $fields = [
            'category' => 'category',
            'name' => 'name',
            'equipment' => 'equipment',
            'exercise_instructions' => 'exercise_instructions',
            'exercise_tips' => 'exercise_tips',
            'primary_activating_muscles' => 'primary_activating_muscles',
            'secondary_activating_muscles' => 'secondary_activating_muscles',
        ];
        foreach ($fields as $key => $dbCol) {
            $val = $this->getCell($row, $key);
            if ($val !== null && trim((string) $val) !== '') {
                $data[$dbCol] = is_string($val) ? trim($val) : $val;
            }
        }
        return $data;
    }
}
