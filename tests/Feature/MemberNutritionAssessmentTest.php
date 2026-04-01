<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Member;
use App\Models\AssignedMealsMember;
use App\Models\Gym;

class MemberNutritionAssessmentTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $member;
    protected $gym;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a gym
        $this->gym = Gym::factory()->create();

        // Create an authenticated user
        $this->user = User::factory()->create([
            'gym_id' => $this->gym->id,
        ]);

        // Create a member
        $this->member = Member::factory()->create([
            'gym_id' => $this->gym->id,
        ]);
    }

    /** @test */
    public function it_can_fetch_member_nutrition_assessments()
    {
        // Create some nutrition assessments for the member
        $assessment1 = AssignedMealsMember::factory()->create([
            'member_id' => $this->member->id,
            'gym_id' => $this->gym->id,
            'date' => now()->subDays(5),
            'weight' => 175.5,
            'body' => 15.2,
            'water' => 8,
            'hunger' => 5,
            'strength' => 8,
            'energy' => 7,
            'calories' => 2000,
            'protein' => 150,
            'carbs' => 200,
            'fat_macros' => 65,
        ]);

        $assessment2 = AssignedMealsMember::factory()->create([
            'member_id' => $this->member->id,
            'gym_id' => $this->gym->id,
            'date' => now()->subDays(2),
            'weight' => 174.8,
            'body' => 14.8,
            'water' => 9,
            'hunger' => 6,
            'strength' => 9,
            'energy' => 8,
            'calories' => 2100,
            'protein' => 160,
            'carbs' => 220,
            'fat_macros' => 70,
        ]);

        // Make API request
        $response = $this->actingAs($this->user, 'api')
            ->getJson("/api/assigned-meals-members/member/{$this->member->id}/assessments");

        // Assert response
        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'date',
                        'weight',
                        'bodyFat',
                        'waterIntake',
                        'hunger',
                        'strength',
                        'energy',
                        'cardio',
                        'plan',
                        'calories',
                        'protein',
                        'carb',
                        'fat',
                    ]
                ],
                'member' => [
                    'id',
                    'name',
                ]
            ]);

        // Assert data is correct
        $data = $response->json('data');
        $this->assertCount(2, $data);
        $this->assertEquals($assessment2->id, $data[0]['id']); // Should be sorted by date desc
        $this->assertEquals(174.8, $data[0]['weight']);
        $this->assertEquals(14.8, $data[0]['bodyFat']);
    }

    /** @test */
    public function it_returns_404_for_nonexistent_member()
    {
        $response = $this->actingAs($this->user, 'api')
            ->getJson("/api/assigned-meals-members/member/99999/assessments");

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Member not found'
            ]);
    }

    /** @test */
    public function it_can_update_member_nutrition_assessment()
    {
        // Create an assessment
        $assessment = AssignedMealsMember::factory()->create([
            'member_id' => $this->member->id,
            'gym_id' => $this->gym->id,
            'date' => now(),
            'weight' => 175.0,
            'body' => 15.0,
            'water' => 8,
            'hunger' => 5,
            'strength' => 8,
            'energy' => 7,
            'calories' => 2000,
            'protein' => 150,
            'carbs' => 200,
            'fat_macros' => 65,
        ]);

        // Update data
        $updateData = [
            'weight' => 174.5,
            'bodyFat' => 14.5,
            'waterIntake' => 9,
            'hunger' => 6,
            'strength' => 9,
            'energy' => 8,
            'calories' => 2100,
            'protein' => 160,
            'carb' => 220,
            'fat' => 70,
        ];

        $response = $this->actingAs($this->user, 'api')
            ->putJson("/api/assigned-meals-members/{$assessment->id}", $updateData);

        // Assert response
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Nutrition log updated successfully'
            ]);

        // Assert data was updated
        $assessment->refresh();
        $this->assertEquals(174.5, $assessment->weight);
        $this->assertEquals(14.5, $assessment->body);
        $this->assertEquals(9, $assessment->water);
        $this->assertEquals(6, $assessment->hunger);
        $this->assertEquals(9, $assessment->strength);
        $this->assertEquals(8, $assessment->energy);
        $this->assertEquals(2100, $assessment->calories);
        $this->assertEquals(160, $assessment->protein);
        $this->assertEquals(220, $assessment->carbs);
        $this->assertEquals(70, $assessment->fat_macros);
    }

    /** @test */
    public function it_validates_update_data()
    {
        $assessment = AssignedMealsMember::factory()->create([
            'member_id' => $this->member->id,
            'gym_id' => $this->gym->id,
        ]);

        // Try to update with invalid data
        $invalidData = [
            'hunger' => 15, // Should be max 10
            'strength' => -1, // Should be min 0
            'weight' => -10, // Should be min 0
        ];

        $response = $this->actingAs($this->user, 'api')
            ->putJson("/api/assigned-meals-members/{$assessment->id}", $invalidData);

        $response->assertStatus(422)
            ->assertJsonStructure([
                'success',
                'message',
                'errors'
            ]);
    }

    /** @test */
    public function it_can_update_member_notes()
    {
        $notes = "Test notes for member nutrition assessment";

        $response = $this->actingAs($this->user, 'api')
            ->putJson("/api/assigned-meals-members/member/{$this->member->id}/notes", [
                'notes' => $notes
            ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Notes updated successfully'
            ]);
    }

    /** @test */
    public function it_requires_authentication()
    {
        $response = $this->getJson("/api/assigned-meals-members/member/{$this->member->id}/assessments");

        $response->assertStatus(401);
    }
}

