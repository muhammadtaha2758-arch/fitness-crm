<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Member;
use App\Models\WorkoutActivity;
use App\Models\Gym;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class MobileWorkoutCreationTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $member;
    protected $gym;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create a gym
        $this->gym = Gym::factory()->create();
        
        // Create a member
        $this->member = Member::factory()->create([
            'gym_id' => $this->gym->id
        ]);

        // Create some workout activities for testing
        WorkoutActivity::factory()->count(5)->create([
            'gym_id' => $this->gym->id
        ]);
    }

    /** @test */
    public function it_can_get_workout_metadata()
    {
        $response = $this->actingAs($this->member, 'mobile')
            ->getJson('/api/mobile/workouts/metadata');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'categories',
                    'levels',
                    'muscle_groups',
                    'equipment_types',
                    'difficulty_levels',
                    'duration_options'
                ]
            ]);
    }

    /** @test */
    public function it_can_get_available_exercises()
    {
        $response = $this->actingAs($this->member, 'mobile')
            ->getJson('/api/mobile/workouts/available-exercises');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'exercise_id',
                        'exercise_name',
                        'category',
                        'level',
                        'description'
                    ]
                ],
                'pagination'
            ]);
    }

    /** @test */
    public function it_can_create_a_basic_workout()
    {
        $workoutData = [
            'exercise_name' => 'Test Workout',
            'category' => 'Strength',
            'duration' => '30 min',
            'level' => 'Beginner',
            'description' => 'A test workout for testing purposes'
        ];

        $response = $this->actingAs($this->member, 'mobile')
            ->postJson('/api/mobile/workouts', $workoutData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'workout_id',
                    'exercise_name',
                    'category',
                    'level',
                    'description'
                ]
            ]);

        $this->assertDatabaseHas('workouts', [
            'exercise_name' => 'Test Workout',
            'category' => 'Strength',
            'level' => 'Beginner'
        ]);
    }

    /** @test */
    public function it_can_create_workout_with_days_and_activities()
    {
        $exercise = WorkoutActivity::first();
        
        $workoutData = [
            'exercise_name' => 'Advanced Workout',
            'category' => 'Strength',
            'duration' => '60 min',
            'level' => 'Advanced',
            'description' => 'Advanced workout with multiple days',
            'workout_days' => [
                [
                    'day' => 'Monday',
                    'activities' => [
                        [
                            'exercise_id' => $exercise->exercise_id,
                            'sets' => 3,
                            'reps' => 12,
                            'rest_seconds' => 60
                        ]
                    ]
                ],
                [
                    'day' => 'Wednesday',
                    'activities' => [
                        [
                            'exercise_id' => $exercise->exercise_id,
                            'sets' => 4,
                            'reps' => 10,
                            'rest_seconds' => 90
                        ]
                    ]
                ]
            ]
        ];

        $response = $this->actingAs($this->member, 'mobile')
            ->postJson('/api/mobile/workouts', $workoutData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'workout_id',
                    'exercise_name',
                    'workout_days'
                ]
            ]);

        // Check that workout days were created
        $this->assertDatabaseHas('workout_days', [
            'day' => 'Monday'
        ]);

        $this->assertDatabaseHas('workout_days', [
            'day' => 'Wednesday'
        ]);
    }

    /** @test */
    public function it_validates_required_fields()
    {
        $response = $this->actingAs($this->member, 'mobile')
            ->postJson('/api/mobile/workouts', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'exercise_name',
                'category',
                'duration',
                'level',
                'description'
            ]);
    }

    /** @test */
    public function it_validates_workout_day_structure()
    {
        $workoutData = [
            'exercise_name' => 'Test Workout',
            'category' => 'Strength',
            'duration' => '30 min',
            'level' => 'Beginner',
            'description' => 'Test description',
            'workout_days' => [
                [
                    'day' => 'InvalidDay',
                    'activities' => []
                ]
            ]
        ];

        $response = $this->actingAs($this->member, 'mobile')
            ->postJson('/api/mobile/workouts', $workoutData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'workout_days.0.day'
            ]);
    }

    /** @test */
    public function it_validates_activity_structure()
    {
        $exercise = WorkoutActivity::first();
        
        $workoutData = [
            'exercise_name' => 'Test Workout',
            'category' => 'Strength',
            'duration' => '30 min',
            'level' => 'Beginner',
            'description' => 'Test description',
            'workout_days' => [
                [
                    'day' => 'Monday',
                    'activities' => [
                        [
                            'exercise_id' => $exercise->exercise_id,
                            'sets' => 0, // Invalid: sets must be >= 1
                            'reps' => 12,
                            'rest_seconds' => 60
                        ]
                    ]
                ]
            ]
        ];

        $response = $this->actingAs($this->member, 'mobile')
            ->postJson('/api/mobile/workouts', $workoutData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'workout_days.0.activities.0.sets'
            ]);
    }

    /** @test */
    public function it_requires_authentication()
    {
        $response = $this->postJson('/api/mobile/workouts', [
            'exercise_name' => 'Test Workout',
            'category' => 'Strength',
            'duration' => '30 min',
            'level' => 'Beginner',
            'description' => 'Test description'
        ]);

        $response->assertStatus(401);
    }
}
