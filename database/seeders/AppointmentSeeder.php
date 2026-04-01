<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Appointment;
use App\Models\Member;
use App\Models\Coach;
use Carbon\Carbon;

class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Get some sample members and coaches
        $members = Member::where('Statuses', 'active')->orWhere('Statuses', 'Active')->take(10)->get();
        $coaches = Coach::take(5)->get();

        if ($members->isEmpty() || $coaches->isEmpty()) {
            $this->command->info('No members or coaches found. Skipping appointment seeding.');
            return;
        }

        // Create sample appointments for the next 30 days
        for ($i = 0; $i < 20; $i++) {
            $date = Carbon::now()->addDays(rand(1, 30));
            $startHour = rand(8, 18);
            $startTime = Carbon::createFromTime($startHour, rand(0, 59), 0);
            $endTime = Carbon::createFromTime($startHour + 1, rand(0, 59), 0);

            $workoutTypes = [1, 2, 3, 4, 5]; // Cardio, Strength, Yoga, Pilates, HIIT

            Appointment::create([
                'client_id' => $members->random()->id,
                'trainer_id' => $coaches->random()->id,
                'workout_id' => $workoutTypes[array_rand($workoutTypes)],
                'date' => $date->format('Y-m-d'),
                'start_time' => $startTime->format('H:i:s'),
                'end_time' => $endTime->format('H:i:s'),
                'status' => 'scheduled',
                'notes' => 'Sample appointment for fitness training.'
            ]);
        }

        $this->command->info('Appointments seeded successfully!');
    }
} 