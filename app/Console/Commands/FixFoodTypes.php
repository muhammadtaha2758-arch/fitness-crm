<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class FixFoodTypes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'food:fix-types {--fix : Apply corrections to the database}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Identify and fix incorrect food_type values in the foods table';

    /**
     * Valid food_type values (standardized)
     */
    protected $validFoodTypes = [
        'beans-and-legumes',
        'beverages',
        'breads-and-cereals',
        'cheese-milk-and-dairy',
        'chicken',
        'eggs',
        'fast-food',
        'fish & seafood',
        'fruit',
        'grains-and-cereals',
        'herbs-and-spices',
        'meat',
        'nuts-and-seeds',
        'oils-and-fats',
        'pasta-rice-and-noodles',
        'protein-powders',
        'snacks',
        'soups',
        'vegetables',
    ];

    /**
     * Mapping of common incorrect values to correct ones
     */
    protected $corrections = [
        // Case variations
        'Beans-and-legumes' => 'beans-and-legumes',
        'Beans & Legumes' => 'beans-and-legumes',
        'Beverages' => 'beverages',
        'Beverage' => 'beverages',
        'beverage' => 'beverages',
        'Breads-and-cereals' => 'breads-and-cereals',
        'Breads & Cereals' => 'breads-and-cereals',
        'Cheese-milk-and-dairy' => 'cheese-milk-and-dairy',
        'Cheese, Milk & Dairy' => 'cheese-milk-and-dairy',
        'Chicken' => 'chicken',
        'Poultry' => 'chicken',
        'Eggs' => 'eggs',
        'Fast-food' => 'fast-food',
        'Fast Food' => 'fast-food',
        'Fish & Seafood' => 'fish & seafood',
        'Fruit' => 'fruit',
        'Grains-and-cereals' => 'grains-and-cereals',
        'Grains & Cereals' => 'grains-and-cereals',
        'Herbs-and-spices' => 'herbs-and-spices',
        'Herbs & Spices' => 'herbs-and-spices',
        'Meat' => 'meat',
        'Nuts-and-seeds' => 'nuts-and-seeds',
        'Nuts & Seeds' => 'nuts-and-seeds',
        'Oils-and-fats' => 'oils-and-fats',
        'Oils & Fats' => 'oils-and-fats',
        'Pasta-rice-and-noodles' => 'pasta-rice-and-noodles',
        'Protein-powders' => 'protein-powders',
        'Protein Powders' => 'protein-powders',
        'Protein Powders & Supplements' => 'protein-powders',
        'Snacks' => 'snacks',
        'Soups' => 'soups',
        'Vegetables' => 'vegetables',
    ];

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('🔍 Analyzing food_type values in foods table...');
        $this->newLine();

        // Get all distinct food_type values
        $foodTypes = DB::table('foods')
            ->select('food_type')
            ->distinct()
            ->whereNotNull('food_type')
            ->where('food_type', '!=', '')
            ->orderBy('food_type')
            ->pluck('food_type')
            ->toArray();

        $this->info('Found ' . count($foodTypes) . ' distinct food_type values:');
        foreach ($foodTypes as $type) {
            $this->line("  - '$type'");
        }

        $this->newLine();

        // Identify incorrect values
        $incorrectFoods = [];

        foreach ($foodTypes as $foodType) {
            $normalized = strtolower(trim($foodType));
            $isValid = false;
            $exactMatch = false;

            // First check for exact match (case-sensitive)
            if (in_array($foodType, $this->validFoodTypes)) {
                $isValid = true;
                $exactMatch = true;
            } else {
                // Check if it matches a valid type (case-insensitive)
                foreach ($this->validFoodTypes as $validType) {
                    if ($normalized === strtolower($validType)) {
                        $isValid = true; // Valid but wrong case
                        break;
                    }
                }
            }

            // If not valid at all, or valid but wrong case, mark as incorrect
            if (!$isValid || !$exactMatch) {
                // Find foods with this incorrect type
                $foods = DB::table('foods')
                    ->where('food_type', $foodType)
                    ->get(['id', 'name', 'food_type']);

                $incorrectFoods[$foodType] = $foods;

                if (!$isValid) {
                    $this->error("❌ Invalid food_type found: '$foodType' (" . $foods->count() . " records)");
                } else {
                    $this->warn("⚠️  Incorrect case for food_type: '$foodType' (" . $foods->count() . " records)");
                }
            }
        }

        $this->newLine();

        // Show summary of incorrect values
        if (count($incorrectFoods) > 0) {
            $this->info('📊 Summary of incorrect food_type values:');
            foreach ($incorrectFoods as $incorrectType => $foods) {
                $this->line("  '$incorrectType': " . $foods->count() . " records");
                // Show first 5 examples
                foreach ($foods->take(5) as $food) {
                    $this->line("    - ID {$food->id}: {$food->name}");
                }
                if ($foods->count() > 5) {
                    $this->line("    ... and " . ($foods->count() - 5) . " more");
                }
            }

            $this->newLine();
            $this->info('💡 Suggested corrections:');

            // Try to suggest corrections
            foreach ($incorrectFoods as $incorrectType => $foods) {
                $suggested = $this->getSuggestedCorrection($incorrectType);

                if ($suggested) {
                    $this->line("  '$incorrectType' → '$suggested'");
                } else {
                    $this->warn("  '$incorrectType' → [NEEDS MANUAL REVIEW]");
                }
            }

            $this->newLine();

            // If --fix flag is provided, apply corrections
            if ($this->option('fix')) {
                if (!$this->confirm('⚠️  Do you want to apply these corrections to the database?')) {
                    $this->info('Operation cancelled.');
                    return 0;
                }

                $this->newLine();
                $this->info('🔧 Applying corrections...');
                $this->newLine();

                $correctedCount = 0;

                foreach ($incorrectFoods as $incorrectType => $foods) {
                    $correctedType = $this->getSuggestedCorrection($incorrectType);

                    if ($correctedType) {
                        $updated = DB::table('foods')
                            ->where('food_type', $incorrectType)
                            ->update(['food_type' => $correctedType]);

                        $this->info("✅ Updated '$incorrectType' → '$correctedType' ($updated records)");
                        $correctedCount += $updated;
                    } else {
                        $this->warn("⚠️  Skipping '$incorrectType' (no correction mapping found)");
                    }
                }

                $this->newLine();
                $this->info("✨ Correction complete! Updated $correctedCount records.");
            } else {
                $this->warn('⚠️  Run with --fix flag to apply corrections');
                $this->line('   Example: php artisan food:fix-types --fix');
            }
        } else {
            $this->info('✅ All food_type values are correct!');
        }

        $this->newLine();

        return 0;
    }

    /**
     * Get suggested correction for an incorrect food_type
     *
     * @param string $incorrectType
     * @return string|null
     */
    protected function getSuggestedCorrection($incorrectType)
    {
        $normalized = strtolower(trim($incorrectType));

        // Check direct mapping
        if (isset($this->corrections[$incorrectType])) {
            return $this->corrections[$incorrectType];
        }

        // Try to find closest match (case-insensitive)
        foreach ($this->validFoodTypes as $validType) {
            if ($normalized === strtolower($validType)) {
                return $validType;
            }
        }

        return null;
    }
}
