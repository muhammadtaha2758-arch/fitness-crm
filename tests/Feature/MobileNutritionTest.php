<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Member;
use App\Models\Nutrition;
use App\Models\NutritionPlan;
use App\Models\NutritionCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MobileNutritionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create test data
        $this->member = Member::factory()->create([
            'token' => 'test-token-123',
            'Statuses' => 'active'
        ]);
        
        $this->category = NutritionCategory::create([
            'name' => 'Test Category',
            'description' => 'Test Description',
            'color' => '#FF0000',
            'icon' => 'fa-test',
            'is_active' => true,
            'sort_order' => 1
        ]);
        
        $this->nutrition = Nutrition::create([
            'gym_id' => 1,
            'category_id' => $this->category->id,
            'name' => 'Test Nutrition Plan',
            'description' => 'Test Description',
            'visibility' => 'all_members',
            'status' => 1,
            'calories' => '500',
            'protein' => '25',
            'carbs' => '50',
            'fats' => '15'
        ]);
        
        $this->nutritionPlan = NutritionPlan::create([
            'member_id' => $this->member->id,
            'gym_id' => 1,
            'template_id' => $this->nutrition->id,
            'nutrition_plan' => 'Test Plan',
            'start_date' => now()->subDays(5),
            'end_date' => now()->addDays(30),
            'duration' => '30 days',
            'description' => 'Test nutrition plan for member'
        ]);
    }

    /** @test */
    public function it_can_get_member_nutrition_plans()
    {
        $response = $this->withHeaders([
            'Authorization' => 'test-token-123'
        ])->get('/api/mobile/nutrition');

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true
                ])
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        '*' => [
                            'id',
                            'name',
                            'description',
                            'start_date',
                            'end_date',
                            'duration',
                            'template',
                            'created_at',
                            'updated_at'
                        ]
                    ]
                ]);
    }

    /** @test */
    public function it_can_get_current_nutrition_plan()
    {
        $response = $this->withHeaders([
            'Authorization' => 'test-token-123'
        ])->get('/api/mobile/nutrition/current');

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true
                ])
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'id',
                        'name',
                        'description',
                        'start_date',
                        'end_date',
                        'duration',
                        'template',
                        'created_at',
                        'updated_at'
                    ]
                ]);
    }

    /** @test */
    public function it_can_get_nutrition_statistics()
    {
        $response = $this->withHeaders([
            'Authorization' => 'test-token-123'
        ])->get('/api/mobile/nutrition/statistics');

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true
                ])
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'total_plans',
                        'active_plans',
                        'completed_plans',
                        'current_plan'
                    ]
                ]);
    }

    /** @test */
    public function it_can_get_nutrition_categories()
    {
        $response = $this->withHeaders([
            'Authorization' => 'test-token-123'
        ])->get('/api/mobile/nutrition/categories');

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true
                ])
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        '*' => [
                            'id',
                            'name',
                            'description',
                            'color',
                            'icon'
                        ]
                    ]
                ]);
    }

    /** @test */
    public function it_requires_authentication()
    {
        $response = $this->get('/api/mobile/nutrition');
        
        $response->assertStatus(401);
    }

    /** @test */
    public function it_rejects_invalid_token()
    {
        $response = $this->withHeaders([
            'Authorization' => 'invalid-token'
        ])->get('/api/mobile/nutrition');
        
        $response->assertStatus(401);
    }

    /** @test */
    public function it_can_create_nutrition_plan()
    {
        $response = $this->withHeaders([
            'Authorization' => 'test-token-123'
        ])->post('/api/mobile/nutrition', [
            'name' => 'My Personal Plan',
            'description' => 'A custom nutrition plan',
            'start_date' => now()->format('Y-m-d'),
            'end_date' => now()->addDays(30)->format('Y-m-d'),
            'duration' => '30 days',
            'calories' => '1500',
            'protein' => '120',
            'carbs' => '150',
            'fats' => '50',
            'food_items' => [
                [
                    'food_id' => 1,
                    'nutrition_type' => 'breakfast',
                    'quantity' => 1,
                    'calories' => 400,
                    'protein' => 30,
                    'carbs' => 40,
                    'fats' => 15
                ]
            ]
        ]);

        $response->assertStatus(201)
                ->assertJson([
                    'success' => true,
                    'message' => 'Nutrition plan created successfully'
                ])
                ->assertJsonStructure([
                    'success',
                    'message',
                    'data' => [
                        'id',
                        'name',
                        'description',
                        'start_date',
                        'end_date',
                        'duration',
                        'template',
                        'created_at',
                        'updated_at'
                    ]
                ]);
    }

    /** @test */
    public function it_can_update_nutrition_plan()
    {
        $response = $this->withHeaders([
            'Authorization' => 'test-token-123'
        ])->put('/api/mobile/nutrition/' . $this->nutritionPlan->id, [
            'name' => 'Updated Plan Name',
            'description' => 'Updated description'
        ]);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Nutrition plan updated successfully'
                ])
                ->assertJsonStructure([
                    'success',
                    'message',
                    'data' => [
                        'id',
                        'name',
                        'description',
                        'start_date',
                        'end_date',
                        'duration',
                        'template',
                        'created_at',
                        'updated_at'
                    ]
                ]);
    }

    /** @test */
    public function it_can_delete_nutrition_plan()
    {
        $response = $this->withHeaders([
            'Authorization' => 'test-token-123'
        ])->delete('/api/mobile/nutrition/' . $this->nutritionPlan->id);

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Nutrition plan deleted successfully'
                ]);
    }

    /** @test */
    public function it_cannot_update_other_members_plan()
    {
        // Create another member and nutrition plan
        $otherMember = Member::factory()->create([
            'token' => 'other-token-456',
            'Statuses' => 'active'
        ]);
        
        $otherPlan = NutritionPlan::create([
            'member_id' => $otherMember->id,
            'gym_id' => 1,
            'template_id' => $this->nutrition->id,
            'nutrition_plan' => 'Other Plan',
            'start_date' => now(),
            'end_date' => now()->addDays(30),
            'duration' => '30 days'
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'test-token-123'
        ])->put('/api/mobile/nutrition/' . $otherPlan->id, [
            'name' => 'Hacked Plan'
        ]);

        $response->assertStatus(404);
    }

    /** @test */
    public function it_cannot_delete_other_members_plan()
    {
        // Create another member and nutrition plan
        $otherMember = Member::factory()->create([
            'token' => 'other-token-456',
            'Statuses' => 'active'
        ]);
        
        $otherPlan = NutritionPlan::create([
            'member_id' => $otherMember->id,
            'gym_id' => 1,
            'template_id' => $this->nutrition->id,
            'nutrition_plan' => 'Other Plan',
            'start_date' => now(),
            'end_date' => now()->addDays(30),
            'duration' => '30 days'
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'test-token-123'
        ])->delete('/api/mobile/nutrition/' . $otherPlan->id);

        $response->assertStatus(404);
    }
}
