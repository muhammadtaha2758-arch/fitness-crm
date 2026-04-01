<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AssignedMealsMember;
use App\Models\Member;

class AssignedMealsMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first few members to create sample data
        $members = Member::take(5)->get();
        
        if ($members->isEmpty()) {
            $this->command->info('No members found. Please create members first.');
            return;
        }

        $sampleData = [
            [
                'date' => now()->subDays(1)->format('Y-m-d'),
                'body_fat' => 15.5,
                'water_intake' => 128,
                'hunger' => 5,
                'strength' => 8,
                'energy' => 7,
                'meal_deviations' => 'Had an extra snack today',
                'activities' => 'Weight training for 45 minutes',
                'feel' => 'Feeling good and energetic',
                'cardio' => '30 minutes on treadmill',
                'plan' => 'Cutting Phase',
                'calories' => 2200,
                'protein' => 180,
                'carbs' => 200,
                'fat' => 80,
                'notes' => 'Great workout session today!'
            ],
            [
                'date' => now()->subDays(2)->format('Y-m-d'),
                'body_fat' => 18.2,
                'water_intake' => 150,
                'hunger' => 3,
                'strength' => 9,
                'energy' => 8,
                'meal_deviations' => 'Stayed on track with meal plan',
                'activities' => 'Cardio and stretching',
                'feel' => 'Feeling strong and motivated',
                'cardio' => '45 minutes cycling',
                'plan' => 'Bulking Phase',
                'calories' => 2800,
                'protein' => 220,
                'carbs' => 300,
                'fat' => 100,
                'notes' => 'Excellent progress this week'
            ],
            [
                'date' => now()->subDays(3)->format('Y-m-d'),
                'body_fat' => 12.8,
                'water_intake' => 120,
                'hunger' => 6,
                'strength' => 7,
                'energy' => 6,
                'meal_deviations' => 'Skipped afternoon snack',
                'activities' => 'Rest day - light walking',
                'feel' => 'Feeling tired but recovered',
                'cardio' => '20 minutes light walk',
                'plan' => 'Maintenance',
                'calories' => 2000,
                'protein' => 160,
                'carbs' => 180,
                'fat' => 70,
                'notes' => 'Rest day was needed'
            ]
        ];

        foreach ($members as $index => $member) {
            $dataIndex = $index % count($sampleData);
            $data = $sampleData[$dataIndex];
            $data['member_id'] = $member->id;

            AssignedMealsMember::create($data);
        }

        $this->command->info('Sample nutrition logs created successfully!');
    }
}