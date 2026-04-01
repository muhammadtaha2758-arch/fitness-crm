<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Food;

class CheckFoodCounts extends Command
{
    protected $signature = 'food:check-counts';
    protected $description = 'Check food counts by category';

    public function handle()
    {
        $categories = [
            'chicken',
            'breads-and-cereals',
            'grains-and-cereals',
            'nuts-and-seeds',
            'oils-and-fats',
            'herbs-and-spices',
            'protein-powders',
        ];

        $this->info('📊 Food counts by category:');
        $this->newLine();

        foreach ($categories as $category) {
            $count = Food::where('food_type', $category)->count();
            $this->line("  {$category}: {$count} foods");
        }

        return 0;
    }
}
