<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Member;
use App\Models\Nutrition;
use App\Models\AssignedMealsMember;
use Carbon\Carbon;

class NutritionAssignmentTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $member;
    protected $template;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create a test user
        $this->user = User::factory()->create([
            'gym_id' => 1,
        ]);

        // Create a test member
        $this->member = Member::factory()->create([
            'gym_id' => 1,
            'firstname' => 'John',
            'lastname' => 'Doe',
        ]);

        // Create a test nutrition template
        $this->template = Nutrition::factory()->create([
            'gym_id' => 1,
            'name' => 'Test Meal Plan',
            'calories' => 2000,
        ]);
    }

    /** @test */
    public function it_can_assign_meal_plan_to_member()
    {
        $response = $this->actingAs($this->user, 'api')->postJson('/api/nutrition/assign', [
            'template_id' => $this->template->id,
            'member_id' => $this->member->id,
            'start_date' => now()->toDateString(),
            'duration' => '1_month',
            'description' => 'Test assignment',
        ]);

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                 ]);

        // Verify assignment was saved to assigned_meals_members table
        $this->assertDatabaseHas('assigned_meals_members', [
            'member_id' => $this->member->id,
            'template_id' => $this->template->id,
            'plan' => 'Test Meal Plan',
        ]);
    }

    /** @test */
    public function it_validates_member_id_exists()
    {
        $response = $this->actingAs($this->user, 'api')->postJson('/api/nutrition/assign', [
            'template_id' => $this->template->id,
            'member_id' => 99999, // Non-existent member
            'start_date' => now()->toDateString(),
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['member_id']);
    }

    /** @test */
    public function it_validates_template_id_exists()
    {
        $response = $this->actingAs($this->user, 'api')->postJson('/api/nutrition/assign', [
            'template_id' => 99999, // Non-existent template
            'member_id' => $this->member->id,
            'start_date' => now()->toDateString(),
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['template_id']);
    }

    /** @test */
    public function it_calculates_end_date_based_on_duration()
    {
        $startDate = now();
        
        $response = $this->actingAs($this->user, 'api')->postJson('/api/nutrition/assign', [
            'template_id' => $this->template->id,
            'member_id' => $this->member->id,
            'start_date' => $startDate->toDateString(),
            'duration' => '1_month',
        ]);

        $response->assertStatus(200);

        $assignment = AssignedMealsMember::where('member_id', $this->member->id)
                                         ->where('template_id', $this->template->id)
                                         ->first();

        $expectedEndDate = $startDate->copy()->addMonth();
        $this->assertEquals($expectedEndDate->toDateString(), $assignment->end_date->toDateString());
    }

    /** @test */
    public function it_prevents_duplicate_active_assignments()
    {
        // Create first assignment
        AssignedMealsMember::create([
            'member_id' => $this->member->id,
            'template_id' => $this->template->id,
            'gym_id' => 1,
            'date' => now()->toDateString(),
            'start_date' => now()->toDateString(),
            'end_date' => now()->addMonth()->toDateString(),
            'plan' => 'Test Meal Plan',
        ]);

        // Try to assign same plan again
        $response = $this->actingAs($this->user, 'api')->postJson('/api/nutrition/assign', [
            'template_id' => $this->template->id,
            'member_id' => $this->member->id,
            'start_date' => now()->toDateString(),
            'duration' => '1_month',
        ]);

        $response->assertStatus(422)
                 ->assertJson([
                     'success' => false,
                 ]);
    }

    /** @test */
    public function it_saves_member_id_matching_members_table()
    {
        $response = $this->actingAs($this->user, 'api')->postJson('/api/nutrition/assign', [
            'template_id' => $this->template->id,
            'member_id' => $this->member->id,
            'start_date' => now()->toDateString(),
        ]);

        $response->assertStatus(200);

        $assignment = AssignedMealsMember::where('template_id', $this->template->id)->first();
        
        // Verify member_id matches the members table
        $this->assertEquals($this->member->id, $assignment->member_id);
        $this->assertDatabaseHas('members', ['id' => $assignment->member_id]);
    }

    /** @test */
    public function it_can_assign_to_all_members()
    {
        // Create additional members
        $member2 = Member::factory()->create(['gym_id' => 1]);
        $member3 = Member::factory()->create(['gym_id' => 1]);

        $response = $this->actingAs($this->user, 'api')->postJson('/api/nutrition/assign', [
            'template_id' => $this->template->id,
            'member_id' => $this->member->id, // Required but ignored when assign_to_all_members is true
            'assign_to_all_members' => true,
            'start_date' => now()->toDateString(),
            'duration' => '1_month',
        ]);

        $response->assertStatus(200);

        // Verify all members got the assignment
        $assignments = AssignedMealsMember::where('template_id', $this->template->id)->get();
        $this->assertGreaterThanOrEqual(3, $assignments->count());
    }

    /** @test */
    public function it_saves_assigned_by_user_id()
    {
        $response = $this->actingAs($this->user, 'api')->postJson('/api/nutrition/assign', [
            'template_id' => $this->template->id,
            'member_id' => $this->member->id,
            'start_date' => now()->toDateString(),
        ]);

        $response->assertStatus(200);

        $assignment = AssignedMealsMember::where('member_id', $this->member->id)
                                         ->where('template_id', $this->template->id)
                                         ->first();

        $this->assertEquals($this->user->id, $assignment->assigned_by);
    }

    /** @test */
    public function it_only_shows_logs_from_members_with_assigned_plans()
    {
        // Create assignment
        AssignedMealsMember::create([
            'member_id' => $this->member->id,
            'template_id' => $this->template->id,
            'gym_id' => 1,
            'date' => now()->toDateString(),
            'start_date' => now()->toDateString(),
            'end_date' => now()->addMonth()->toDateString(),
            'plan' => 'Test Meal Plan',
        ]);

        // Create a member without assignment
        $memberWithoutPlan = Member::factory()->create(['gym_id' => 1]);

        $response = $this->actingAs($this->user, 'api')->getJson('/api/assigned-meals-members');

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                 ]);

        $data = $response->json('data');
        
        // Should only return logs from members with assignments
        $memberIds = collect($data)->pluck('member_id')->unique();
        $this->assertContains($this->member->id, $memberIds);
        $this->assertNotContains($memberWithoutPlan->id, $memberIds);
    }
}

