<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Keep this minimal and focused; this project also has legacy seeders in database/seeds (classmap).
        $this->call([
            ScheduleActivitiesSeeder::class,
        ]);
    }
}


