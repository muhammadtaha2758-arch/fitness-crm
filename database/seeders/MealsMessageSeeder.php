<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MealsMessage;
use App\Models\Member;
use App\Models\User;

class MealsMessageSeeder extends Seeder
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

        // Get the first user to use as sent_by
        $user = User::first();
        if (!$user) {
            $this->command->info('No users found. Please create users first.');
            return;
        }

        $sampleMessages = [
            [
                'last_message' => 'Hey! How are you feeling with your new meal plan?',
                'date' => now()->subDays(1),
                'notes' => 'Checking in on meal plan progress'
            ],
            [
                'last_message' => 'Great job sticking to your macros today!',
                'date' => now()->subDays(2),
                'notes' => 'Positive reinforcement for macro adherence'
            ],
            [
                'last_message' => 'Remember to drink more water throughout the day',
                'date' => now()->subDays(3),
                'notes' => 'Hydration reminder'
            ],
            [
                'last_message' => 'Your meal prep looks amazing! Keep it up!',
                'date' => now()->subDays(4),
                'notes' => 'Encouragement for meal prep'
            ],
            [
                'last_message' => 'How did you feel after your workout today?',
                'date' => now()->subDays(5),
                'notes' => 'Post-workout check-in'
            ],
            [
                'last_message' => 'Don\'t forget to log your meals in the app',
                'date' => now()->subDays(6),
                'notes' => 'Meal logging reminder'
            ],
            [
                'last_message' => 'Your progress photos look incredible!',
                'date' => now()->subDays(7),
                'notes' => 'Progress celebration'
            ],
            [
                'last_message' => 'Ready for your meal plan adjustment this week?',
                'date' => now()->subDays(8),
                'notes' => 'Weekly meal plan update'
            ],
            [
                'last_message' => 'How are you handling the meal timing?',
                'date' => now()->subDays(9),
                'notes' => 'Meal timing check'
            ],
            [
                'last_message' => 'Your dedication to the program is inspiring!',
                'date' => now()->subDays(10),
                'notes' => 'Motivational message'
            ]
        ];

        foreach ($members as $index => $member) {
            $messageIndex = $index % count($sampleMessages);
            $messageData = $sampleMessages[$messageIndex];
            
            $messageData['member_id'] = $member->id;
            $messageData['sent_by'] = $user->id;
            $messageData['gym_id'] = 1; // Assuming gym_id 1 exists

            MealsMessage::create($messageData);
        }

        $this->command->info('Sample meals messages created successfully!');
    }
}
