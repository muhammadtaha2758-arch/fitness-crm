<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CommunityGroupsSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        $base = [
            [
                'name' => 'Thorstrengthfitness',
                'description' => 'Daily updates, promotions and deals from Thorstrength Fitness.',
                'avatar' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Healthy Eats!',
                'description' => 'Nutrition tips, recipes and healthy eating discussions.',
                'avatar' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Team Thorstrength Competitors',
                'description' => 'Competition prep, training and support for team members.',
                'avatar' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        // Add optional columns if present
        foreach ($base as &$row) {
            if (Schema::hasColumn('community_groups', 'status')) {
                $row['status'] = 'active';
            }
            if (Schema::hasColumn('community_groups', 'gym_id')) {
                // Default to 1 for seed data; adjust if you have a specific gym mapping
                $row['gym_id'] = 1;
            }
        }
        unset($row);

        DB::table('community_groups')->insert($base);
    }
}


