<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Food;

class UpdateFoodTypes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'food:update-types';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update existing foods to use correct food_type values for new categories';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('🔄 Updating food types for existing foods...');
        $this->newLine();

        // Map exact food names to their correct food_type
        $exactMappings = [
            // Oils & Fats - exact matches
            'oils-and-fats' => [
                'Olive Oil',
                'Coconut Oil',
                'Avocado Oil',
            ],
            // Herbs & Spices - exact matches
            'herbs-and-spices' => [
                'Basil',
                'Turmeric',
                'Cumin',
            ],
            // Protein Powders - exact matches
            'protein-powders' => [
                'Whey Protein Powder',
                'Plant Protein Powder',
                'Casein Protein Powder',
            ],
        ];

        // Map food names to their correct food_type (partial matches)
        $foodMappings = [
            // Chicken
            'chicken' => [
                'Chicken Thigh',
                'Roasted Chicken',
                'Chicken Breast',
                'Grilled Chicken',
            ],
            // Breads & Cereals
            'breads-and-cereals' => [
                'Whole Wheat Bread',
                'White Bread',
                'Oatmeal',
            ],
            // Grains & Cereals
            'grains-and-cereals' => [
                'Quinoa',
                'Brown Rice',
                'Barley',
            ],
            // Nuts & Seeds
            'nuts-and-seeds' => [
                'Almonds',
                'Walnuts',
                'Chia Seeds',
            ],
        ];

        $updated = 0;

        // First, update exact matches
        foreach ($exactMappings as $foodType => $foodNames) {
            foreach ($foodNames as $foodName) {
                $foods = Food::where('name', $foodName)
                    ->where(function($query) use ($foodType) {
                        $query->where('food_type', '!=', $foodType)
                              ->orWhereNull('food_type');
                    })
                    ->get();

                foreach ($foods as $food) {
                    $oldType = $food->food_type ?: 'NULL';
                    $food->food_type = $foodType;
                    $food->save();
                    $this->line("✅ Updated: {$food->name} ({$oldType} → {$foodType})");
                    $updated++;
                }
            }
        }

        // Then, update partial matches
        foreach ($foodMappings as $foodType => $foodNames) {
            foreach ($foodNames as $foodName) {
                $foods = Food::where('name', 'LIKE', "%{$foodName}%")
                    ->where(function($query) use ($foodType) {
                        $query->where('food_type', '!=', $foodType)
                              ->orWhereNull('food_type');
                    })
                    ->get();

                foreach ($foods as $food) {
                    $oldType = $food->food_type ?: 'NULL';
                    $food->food_type = $foodType;
                    $food->save();
                    $this->line("✅ Updated: {$food->name} ({$oldType} → {$foodType})");
                    $updated++;
                }
            }
        }

        $this->newLine();
        $this->info("✨ Update complete! Updated {$updated} foods.");

        return 0;
    }
}
