<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScheduleActivitiesSeeder extends Seeder
{
    public function run(): void
    {
        // If gyms table is missing, fallback to distinct gym_id from users.
        try {
            if (!DB::getSchemaBuilder()->hasTable('gyms')) {
                $gymIds = DB::table('users')->whereNotNull('gym_id')->distinct()->pluck('gym_id')->toArray();
                $this->seedForGyms($gymIds);
                return;
            }
        } catch (\Throwable $e) {
            // ignore and continue
        }

        // Get all gym IDs (handle both `id` and `gym_id` schemas defensively).
        $gymIdColumn = 'id';
        try {
            $columns = DB::getSchemaBuilder()->getColumnListing('gyms');
            if (in_array('id', $columns)) {
                $gymIdColumn = 'id';
            } elseif (in_array('gym_id', $columns)) {
                $gymIdColumn = 'gym_id';
            }
        } catch (\Throwable $e) {
            $gymIdColumn = 'id';
        }

        $gymIds = DB::table('gyms')->pluck($gymIdColumn)->toArray();

        if (empty($gymIds)) {
            $gymIds = DB::table('users')->whereNotNull('gym_id')->distinct()->pluck('gym_id')->toArray();
        }

        $this->seedForGyms($gymIds);
    }

    private function seedForGyms(array $gymIds): void
    {
        if (empty($gymIds)) {
            return;
        }

        $defaults = [
            ['name' => 'Jogging', 'category' => 'Cardio', 'color' => '#161413', 'met' => 7.0, 'default_duration_minutes' => 30, 'difficulty' => 'novice', 'tags' => ['running', 'cardio']],
            ['name' => 'Cycling', 'category' => 'Cardio', 'color' => '#1f2937', 'met' => 6.8, 'default_duration_minutes' => 30, 'difficulty' => 'novice', 'tags' => ['bike', 'cardio']],
            ['name' => 'Yoga', 'category' => 'Mobility', 'color' => '#0f766e', 'met' => 3.0, 'default_duration_minutes' => 45, 'difficulty' => 'novice', 'tags' => ['flexibility', 'recovery']],
            ['name' => 'HIIT', 'category' => 'Agility & Speed', 'color' => '#dc2626', 'met' => 8.5, 'default_duration_minutes' => 20, 'difficulty' => 'intermediate', 'tags' => ['interval', 'conditioning']],
            ['name' => 'Strength Training', 'category' => 'Strength', 'color' => '#2563eb', 'met' => 6.0, 'default_duration_minutes' => 45, 'difficulty' => 'intermediate', 'tags' => ['weights', 'strength']],
            ['name' => 'Rowing', 'category' => 'Cardio', 'color' => '#7c3aed', 'met' => 7.0, 'default_duration_minutes' => 20, 'difficulty' => 'intermediate', 'tags' => ['erg', 'cardio']],
        ];

        $now = now();

        foreach ($gymIds as $gymId) {
            foreach ($defaults as $row) {
                $exists = DB::table('schedule_activities')
                    ->where('gym_id', $gymId)
                    ->where('name', $row['name'])
                    ->exists();

                if ($exists) {
                    continue;
                }

                DB::table('schedule_activities')->insert([
                    'gym_id' => $gymId,
                    'name' => $row['name'],
                    'category' => $row['category'],
                    'visible_for' => 'gym',
                    'type' => 'duration',
                    'can_be_added_in_schedule' => 1,
                    'color' => $row['color'],
                    'met' => $row['met'],
                    'has_distance' => 0,
                    'default_duration_minutes' => $row['default_duration_minutes'],
                    'difficulty' => $row['difficulty'],
                    'instructions' => null,
                    'tags' => json_encode($row['tags']),
                    'youtube_url_male' => null,
                    'youtube_url_female' => null,
                    'qr_link' => null,
                    'manufacturer' => null,
                    'created_by' => null,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }
}


