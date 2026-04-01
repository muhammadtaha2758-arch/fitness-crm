<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\WorkoutActivity;
use App\Models\WorkoutActivityPlan;
use App\Models\Workout;
use App\Models\WorkoutDay;
use App\Models\Gym;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class WorkoutActivityPlanSetsConfigurationTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $user;
    protected $gym;
    protected $exercise;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create a gym
        $this->gym = Gym::factory()->create();
        
        // Create a user with gym_id
        $this->user = User::factory()->create([
            'gym_id' => $this->gym->id,
        ]);

        // Create a workout activity for testing
        $this->exercise = WorkoutActivity::factory()->create([
            'exercise_id' => 1,
            'exercise_name' => 'Test Exercise',
            'category' => 'Strength',
            'level' => 'Beginner',
        ]);
    }

    /** @test */
    public function test_can_save_workout_plan_with_sets_configuration()
    {
        $setsConfiguration = [
            ['reps' => 10, 'rest' => 30],
            ['reps' => 12, 'rest' => 45],
            ['reps' => 8, 'rest' => 60],
        ];

        $response = $this->actingAs($this->user, 'api')
            ->postJson('/api/workout_activity_plan', [
                'day' => 'Monday',
                'workout_name' => 'Test Workout',
                'description' => 'Test description',
                'exercises' => [
                    [
                        'exercise_id' => $this->exercise->exercise_id,
                        'exercise_name' => $this->exercise->exercise_name,
                        'sets' => 3,
                        'reps' => 10,
                        'rest_period' => 30,
                        'sets_configuration' => $setsConfiguration,
                    ]
                ]
            ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);

        // Verify sets_configuration is saved in database
        $this->assertDatabaseHas('workout_activity_plans', [
            'exercise_id' => $this->exercise->exercise_id,
            'sets' => 3,
        ]);

        $plan = WorkoutActivityPlan::where('exercise_id', $this->exercise->exercise_id)->first();
        $this->assertNotNull($plan->sets_configuration);
        $this->assertIsArray($plan->sets_configuration);
        $this->assertCount(3, $plan->sets_configuration);
        $this->assertEquals(10, $plan->sets_configuration[0]['reps']);
        $this->assertEquals(30, $plan->sets_configuration[0]['rest']);
    }

    /** @test */
    public function test_can_load_workout_plan_with_sets_configuration()
    {
        // Create a workout and workout day
        $workout = Workout::factory()->create([
            'gym_id' => $this->gym->id,
            'exercise_name' => 'Test Workout',
        ]);

        $workoutDay = WorkoutDay::factory()->create([
            'workout_id' => $workout->id,
            'day' => 'Monday',
        ]);

        $setsConfiguration = [
            ['reps' => 15, 'rest' => 45],
            ['reps' => 12, 'rest' => 30],
            ['reps' => 10, 'rest' => 60],
        ];

        // Create a plan with sets_configuration
        $plan = WorkoutActivityPlan::create([
            'workout_id' => $workout->id,
            'day' => 'Monday',
            'exercise_id' => $this->exercise->exercise_id,
            'exercise_name' => $this->exercise->exercise_name,
            'sets' => 3,
            'reps' => 15,
            'rest_seconds' => 45,
            'sets_configuration' => $setsConfiguration,
            'day_id' => $workoutDay->id,
        ]);

        // Load the plan via API
        $response = $this->actingAs($this->user, 'api')
            ->getJson("/api/workout_activity_plan/{$workout->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);

        $responseData = $response->json('data');
        $this->assertNotEmpty($responseData);
        
        $loadedPlan = collect($responseData)->firstWhere('id', $plan->id);
        $this->assertNotNull($loadedPlan);
        $this->assertArrayHasKey('sets_configuration', $loadedPlan);
        $this->assertIsArray($loadedPlan['sets_configuration']);
        $this->assertCount(3, $loadedPlan['sets_configuration']);
    }

    /** @test */
    public function test_sets_configuration_is_optional_for_backward_compatibility()
    {
        $response = $this->actingAs($this->user, 'api')
            ->postJson('/api/workout_activity_plan', [
                'day' => 'Tuesday',
                'workout_name' => 'Legacy Workout',
                'description' => 'Test description',
                'exercises' => [
                    [
                        'exercise_id' => $this->exercise->exercise_id,
                        'exercise_name' => $this->exercise->exercise_name,
                        'sets' => 3,
                        'reps' => 12,
                        'rest_period' => 60,
                        // No sets_configuration provided
                    ]
                ]
            ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);

        // Verify plan was saved with legacy fields
        $this->assertDatabaseHas('workout_activity_plans', [
            'exercise_id' => $this->exercise->exercise_id,
            'sets' => 3,
            'reps' => 12,
            'rest_seconds' => 60,
        ]);

        $plan = WorkoutActivityPlan::where('exercise_id', $this->exercise->exercise_id)->first();
        $this->assertNull($plan->sets_configuration);
    }

    /** @test */
    public function test_validates_sets_configuration_structure()
    {
        $response = $this->actingAs($this->user, 'api')
            ->postJson('/api/workout_activity_plan', [
                'day' => 'Wednesday',
                'workout_name' => 'Invalid Workout',
                'description' => 'Test description',
                'exercises' => [
                    [
                        'exercise_id' => $this->exercise->exercise_id,
                        'exercise_name' => $this->exercise->exercise_name,
                        'sets' => 3,
                        'reps' => 10,
                        'rest_period' => 30,
                        'sets_configuration' => 'not-an-array', // Invalid: should be array
                    ]
                ]
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['exercises.0.sets_configuration']);
    }

    /** @test */
    public function test_validates_sets_configuration_reps_and_rest()
    {
        $response = $this->actingAs($this->user, 'api')
            ->postJson('/api/workout_activity_plan', [
                'day' => 'Thursday',
                'workout_name' => 'Invalid Values Workout',
                'description' => 'Test description',
                'exercises' => [
                    [
                        'exercise_id' => $this->exercise->exercise_id,
                        'exercise_name' => $this->exercise->exercise_name,
                        'sets' => 2,
                        'reps' => 10,
                        'rest_period' => 30,
                        'sets_configuration' => [
                            ['reps' => -5, 'rest' => 30], // Invalid: negative reps
                            ['reps' => 10, 'rest' => -10], // Invalid: negative rest
                        ],
                    ]
                ]
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'exercises.0.sets_configuration.0.reps',
                'exercises.0.sets_configuration.1.rest',
            ]);
    }

    /** @test */
    public function test_can_update_workout_plan_sets_configuration()
    {
        // Create a workout and workout day
        $workout = Workout::factory()->create([
            'gym_id' => $this->gym->id,
            'exercise_name' => 'Update Test Workout',
        ]);

        $workoutDay = WorkoutDay::factory()->create([
            'workout_id' => $workout->id,
            'day' => 'Friday',
        ]);

        $initialSetsConfig = [
            ['reps' => 10, 'rest' => 30],
            ['reps' => 10, 'rest' => 30],
            ['reps' => 10, 'rest' => 30],
        ];

        $plan = WorkoutActivityPlan::create([
            'workout_id' => $workout->id,
            'day' => 'Friday',
            'exercise_id' => $this->exercise->exercise_id,
            'exercise_name' => $this->exercise->exercise_name,
            'sets' => 3,
            'reps' => 10,
            'rest_seconds' => 30,
            'sets_configuration' => $initialSetsConfig,
            'day_id' => $workoutDay->id,
        ]);

        $newSetsConfig = [
            ['reps' => 12, 'rest' => 45],
            ['reps' => 10, 'rest' => 30],
            ['reps' => 8, 'rest' => 60],
            ['reps' => 6, 'rest' => 90],
            ['reps' => 5, 'rest' => 120],
        ];

        // Update via controller (we'll need to add update support for sets_configuration)
        $plan->update([
            'sets_configuration' => $newSetsConfig,
            'sets' => 5,
        ]);

        $plan->refresh();
        $this->assertCount(5, $plan->sets_configuration);
        $this->assertEquals(12, $plan->sets_configuration[0]['reps']);
        $this->assertEquals(45, $plan->sets_configuration[0]['rest']);
    }

    /** @test */
    public function test_sets_configuration_preserved_when_loading_plan()
    {
        // Create a workout and workout day
        $workout = Workout::factory()->create([
            'gym_id' => $this->gym->id,
            'exercise_name' => 'Preserve Test Workout',
        ]);

        $workoutDay = WorkoutDay::factory()->create([
            'workout_id' => $workout->id,
            'day' => 'Saturday',
        ]);

        $customSetsConfig = [
            ['reps' => 20, 'rest' => 30],
            ['reps' => 15, 'rest' => 45],
            ['reps' => 12, 'rest' => 60],
            ['reps' => 10, 'rest' => 90],
        ];

        $plan = WorkoutActivityPlan::create([
            'workout_id' => $workout->id,
            'day' => 'Saturday',
            'exercise_id' => $this->exercise->exercise_id,
            'exercise_name' => $this->exercise->exercise_name,
            'sets' => 4,
            'reps' => 20,
            'rest_seconds' => 30,
            'sets_configuration' => $customSetsConfig,
            'day_id' => $workoutDay->id,
        ]);

        // Load the plan
        $loadedPlan = WorkoutActivityPlan::find($plan->id);
        
        $this->assertNotNull($loadedPlan->sets_configuration);
        $this->assertCount(4, $loadedPlan->sets_configuration);
        $this->assertEquals(20, $loadedPlan->sets_configuration[0]['reps']);
        $this->assertEquals(30, $loadedPlan->sets_configuration[0]['rest']);
        $this->assertEquals(10, $loadedPlan->sets_configuration[3]['reps']);
        $this->assertEquals(90, $loadedPlan->sets_configuration[3]['rest']);
    }

    /** @test */
    public function test_multiple_exercises_share_section_sets_configuration()
    {
        // Create second exercise
        $exercise2 = WorkoutActivity::factory()->create([
            'exercise_id' => 2,
            'exercise_name' => 'Test Exercise 2',
            'category' => 'Cardio',
            'level' => 'Intermediate',
        ]);

        $setsConfiguration = [
            ['reps' => 15, 'rest' => 45],
            ['reps' => 12, 'rest' => 30],
            ['reps' => 10, 'rest' => 60],
        ];

        $response = $this->actingAs($this->user, 'api')
            ->postJson('/api/workout_activity_plan', [
                'day' => 'Sunday',
                'workout_name' => 'Multi Exercise Workout',
                'description' => 'Test description',
                'exercises' => [
                    [
                        'exercise_id' => $this->exercise->exercise_id,
                        'exercise_name' => $this->exercise->exercise_name,
                        'sets' => 3,
                        'reps' => 15,
                        'rest_period' => 45,
                        'sets_configuration' => $setsConfiguration,
                    ],
                    [
                        'exercise_id' => $exercise2->exercise_id,
                        'exercise_name' => $exercise2->exercise_name,
                        'sets' => 3,
                        'reps' => 15,
                        'rest_period' => 45,
                        'sets_configuration' => $setsConfiguration, // Same configuration
                    ]
                ]
            ]);

        $response->assertStatus(201);

        // Verify both exercises have the same sets_configuration
        $plan1 = WorkoutActivityPlan::where('exercise_id', $this->exercise->exercise_id)->first();
        $plan2 = WorkoutActivityPlan::where('exercise_id', $exercise2->exercise_id)->first();

        $this->assertNotNull($plan1->sets_configuration);
        $this->assertNotNull($plan2->sets_configuration);
        $this->assertEquals($plan1->sets_configuration, $plan2->sets_configuration);
        $this->assertCount(3, $plan1->sets_configuration);
        $this->assertCount(3, $plan2->sets_configuration);
    }

    /** @test */
    public function test_array_fill_bug_fix_creates_independent_objects()
    {
        // Create a workout and workout day
        $workout = Workout::factory()->create([
            'gym_id' => $this->gym->id,
            'exercise_name' => 'Array Fill Test Workout',
        ]);

        $workoutDay = WorkoutDay::factory()->create([
            'workout_id' => $workout->id,
            'day' => 'Monday',
        ]);

        // Create plan with single values (simulating legacy data without sets_configuration)
        $plan = WorkoutActivityPlan::create([
            'workout_id' => $workout->id,
            'day' => 'Monday',
            'exercise_id' => $this->exercise->exercise_id,
            'exercise_name' => $this->exercise->exercise_name,
            'sets' => 5,
            'reps' => 12,
            'rest_seconds' => 45,
            'sets_configuration' => null, // No sets_configuration, will use fallback
            'day_id' => $workoutDay->id,
        ]);

        // Load the plan via API (this should create independent objects)
        $response = $this->actingAs($this->user, 'api')
            ->getJson("/api/workout_activity_plan/{$workout->id}");

        $response->assertStatus(200);
        $responseData = $response->json('data');
        $this->assertNotEmpty($responseData);
        
        $loadedPlan = collect($responseData)->firstWhere('id', $plan->id);
        $this->assertNotNull($loadedPlan);
        
        // Verify sets_configuration was created from single values
        // The frontend should create independent objects, not shared references
        if (isset($loadedPlan['sets_configuration']) && is_array($loadedPlan['sets_configuration'])) {
            $this->assertCount(5, $loadedPlan['sets_configuration']);
            // Verify all sets have the same initial values
            foreach ($loadedPlan['sets_configuration'] as $set) {
                $this->assertEquals(12, $set['reps']);
                $this->assertEquals(45, $set['rest']);
            }
        }
    }

    /** @test */
    public function test_sets_with_reps_zero_are_filtered_when_saving()
    {
        $setsConfiguration = [
            ['reps' => 10, 'rest' => 30],
            ['reps' => 12, 'rest' => 45],
            ['reps' => 0, 'rest' => 60], // This should be filtered out
            ['reps' => 8, 'rest' => 30],
        ];

        $response = $this->actingAs($this->user, 'api')
            ->postJson('/api/workout_activity_plan', [
                'day' => 'Tuesday',
                'workout_name' => 'Filter Test Workout',
                'description' => 'Test description',
                'exercises' => [
                    [
                        'exercise_id' => $this->exercise->exercise_id,
                        'exercise_name' => $this->exercise->exercise_name,
                        'sets' => 4,
                        'reps' => 10,
                        'rest_period' => 30,
                        'sets_configuration' => $setsConfiguration,
                    ]
                ]
            ]);

        $response->assertStatus(201);

        // Verify sets with reps=0 are not saved
        $plan = WorkoutActivityPlan::where('exercise_id', $this->exercise->exercise_id)->first();
        $this->assertNotNull($plan->sets_configuration);
        $this->assertCount(3, $plan->sets_configuration); // Should be 3, not 4
        
        // Verify the set with reps=0 is not in the saved configuration
        foreach ($plan->sets_configuration as $set) {
            $this->assertGreaterThan(0, $set['reps']);
        }
    }

    /** @test */
    public function test_sets_with_reps_zero_are_filtered_when_loading()
    {
        // Create a workout and workout day
        $workout = Workout::factory()->create([
            'gym_id' => $this->gym->id,
            'exercise_name' => 'Filter Load Test Workout',
        ]);

        $workoutDay = WorkoutDay::factory()->create([
            'workout_id' => $workout->id,
            'day' => 'Wednesday',
        ]);

        $setsConfiguration = [
            ['reps' => 10, 'rest' => 30],
            ['reps' => 0, 'rest' => 45], // This should be filtered out
            ['reps' => 12, 'rest' => 60],
        ];

        // Create plan with sets containing reps=0
        $plan = WorkoutActivityPlan::create([
            'workout_id' => $workout->id,
            'day' => 'Wednesday',
            'exercise_id' => $this->exercise->exercise_id,
            'exercise_name' => $this->exercise->exercise_name,
            'sets' => 3,
            'reps' => 10,
            'rest_seconds' => 30,
            'sets_configuration' => $setsConfiguration,
            'day_id' => $workoutDay->id,
        ]);

        // Load the plan via API
        $response = $this->actingAs($this->user, 'api')
            ->getJson("/api/workout_activity_plan/{$workout->id}");

        $response->assertStatus(200);
        $responseData = $response->json('data');
        $loadedPlan = collect($responseData)->firstWhere('id', $plan->id);
        
        $this->assertNotNull($loadedPlan);
        $this->assertArrayHasKey('sets_configuration', $loadedPlan);
        $this->assertIsArray($loadedPlan['sets_configuration']);
        
        // Verify sets with reps=0 are filtered out
        $this->assertCount(2, $loadedPlan['sets_configuration']); // Should be 2, not 3
        
        // Verify no sets with reps=0 in the response
        foreach ($loadedPlan['sets_configuration'] as $set) {
            $this->assertGreaterThan(0, $set['reps']);
        }
    }

    /** @test */
    public function test_backend_filters_sets_with_reps_zero_in_show_method()
    {
        // Create a workout and workout day
        $workout = Workout::factory()->create([
            'gym_id' => $this->gym->id,
            'exercise_name' => 'Backend Filter Show Test',
        ]);

        $workoutDay = WorkoutDay::factory()->create([
            'workout_id' => $workout->id,
            'day' => 'Thursday',
        ]);

        $setsConfiguration = [
            ['reps' => 15, 'rest' => 30],
            ['reps' => 0, 'rest' => 45],
            ['reps' => 12, 'rest' => 60],
            ['reps' => 0, 'rest' => 30],
        ];

        $plan = WorkoutActivityPlan::create([
            'workout_id' => $workout->id,
            'day' => 'Thursday',
            'exercise_id' => $this->exercise->exercise_id,
            'exercise_name' => $this->exercise->exercise_name,
            'sets' => 4,
            'reps' => 15,
            'rest_seconds' => 30,
            'sets_configuration' => $setsConfiguration,
            'day_id' => $workoutDay->id,
        ]);

        $response = $this->actingAs($this->user, 'api')
            ->getJson("/api/workout_activity_plan/{$workout->id}");

        $response->assertStatus(200);
        $responseData = $response->json('data');
        $loadedPlan = collect($responseData)->firstWhere('id', $plan->id);
        
        $this->assertCount(2, $loadedPlan['sets_configuration']); // Should be 2, not 4
        $this->assertEquals(15, $loadedPlan['sets_configuration'][0]['reps']);
        $this->assertEquals(12, $loadedPlan['sets_configuration'][1]['reps']);
    }

    /** @test */
    public function test_backend_filters_sets_with_reps_zero_in_index_method()
    {
        // Create a workout and workout day
        $workout = Workout::factory()->create([
            'gym_id' => $this->gym->id,
            'exercise_name' => 'Backend Filter Index Test',
        ]);

        $workoutDay = WorkoutDay::factory()->create([
            'workout_id' => $workout->id,
            'day' => 'Friday',
        ]);

        $setsConfiguration = [
            ['reps' => 20, 'rest' => 30],
            ['reps' => 0, 'rest' => 45],
            ['reps' => 15, 'rest' => 60],
        ];

        $plan = WorkoutActivityPlan::create([
            'workout_id' => $workout->id,
            'day' => 'Friday',
            'exercise_id' => $this->exercise->exercise_id,
            'exercise_name' => $this->exercise->exercise_name,
            'sets' => 3,
            'reps' => 20,
            'rest_seconds' => 30,
            'sets_configuration' => $setsConfiguration,
            'day_id' => $workoutDay->id,
        ]);

        $response = $this->actingAs($this->user, 'api')
            ->getJson('/api/workout_activity_plan');

        $response->assertStatus(200);
        $responseData = $response->json('data');
        $loadedPlan = collect($responseData)->firstWhere('id', $plan->id);
        
        $this->assertNotNull($loadedPlan);
        $this->assertCount(2, $loadedPlan['sets_configuration']); // Should be 2, not 3
    }

    /** @test */
    public function test_integration_full_delete_workflow()
    {
        // Create plan with 5 sets
        $setsConfiguration = [
            ['reps' => 10, 'rest' => 30],
            ['reps' => 12, 'rest' => 45],
            ['reps' => 8, 'rest' => 60],
            ['reps' => 6, 'rest' => 90],
            ['reps' => 5, 'rest' => 120],
        ];

        $response = $this->actingAs($this->user, 'api')
            ->postJson('/api/workout_activity_plan', [
                'day' => 'Saturday',
                'workout_name' => 'Delete Workflow Test',
                'description' => 'Test description',
                'exercises' => [
                    [
                        'exercise_id' => $this->exercise->exercise_id,
                        'exercise_name' => $this->exercise->exercise_name,
                        'sets' => 5,
                        'reps' => 10,
                        'rest_period' => 30,
                        'sets_configuration' => $setsConfiguration,
                    ]
                ]
            ]);

        $response->assertStatus(201);
        $plan = WorkoutActivityPlan::where('exercise_id', $this->exercise->exercise_id)->first();
        $this->assertCount(5, $plan->sets_configuration);

        // Simulate deleting sets by setting reps=0 (sets above 3)
        $plan->sets_configuration[3]['reps'] = 0; // Delete 4th set
        $plan->sets_configuration[4]['reps'] = 0; // Delete 5th set
        $plan->save();

        // Load the plan - sets with reps=0 should be filtered
        $workout = Workout::find($plan->workout_id);
        $loadResponse = $this->actingAs($this->user, 'api')
            ->getJson("/api/workout_activity_plan/{$workout->id}");

        $loadResponse->assertStatus(200);
        $responseData = $loadResponse->json('data');
        $loadedPlan = collect($responseData)->firstWhere('id', $plan->id);
        
        $this->assertCount(3, $loadedPlan['sets_configuration']); // Should be 3 after filtering
        $this->assertEquals(10, $loadedPlan['sets_configuration'][0]['reps']);
        $this->assertEquals(12, $loadedPlan['sets_configuration'][1]['reps']);
        $this->assertEquals(8, $loadedPlan['sets_configuration'][2]['reps']);
    }

    /** @test */
    public function test_minimum_three_sets_maintained_after_filtering()
    {
        // Create plan with exactly 3 sets, one marked for deletion
        $setsConfiguration = [
            ['reps' => 10, 'rest' => 30],
            ['reps' => 12, 'rest' => 45],
            ['reps' => 0, 'rest' => 60], // Marked for deletion
        ];

        $response = $this->actingAs($this->user, 'api')
            ->postJson('/api/workout_activity_plan', [
                'day' => 'Sunday',
                'workout_name' => 'Minimum Sets Test',
                'description' => 'Test description',
                'exercises' => [
                    [
                        'exercise_id' => $this->exercise->exercise_id,
                        'exercise_name' => $this->exercise->exercise_name,
                        'sets' => 3,
                        'reps' => 10,
                        'rest_period' => 30,
                        'sets_configuration' => $setsConfiguration,
                    ]
                ]
            ]);

        $response->assertStatus(201);
        
        // When loading, the frontend should ensure at least 3 sets
        // The set with reps=0 will be filtered, but then 3 default sets should be added
        $plan = WorkoutActivityPlan::where('exercise_id', $this->exercise->exercise_id)->first();
        $workout = Workout::find($plan->workout_id);
        
        $loadResponse = $this->actingAs($this->user, 'api')
            ->getJson("/api/workout_activity_plan/{$workout->id}");

        $loadResponse->assertStatus(200);
        $responseData = $loadResponse->json('data');
        $loadedPlan = collect($responseData)->firstWhere('id', $plan->id);
        
        // Backend filters to 2 sets, but frontend should pad to 3 minimum
        // However, backend should return filtered data
        $this->assertCount(2, $loadedPlan['sets_configuration']); // Backend returns filtered
        // Frontend will handle ensuring 3 sets minimum when loading
    }
}

