<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Coach;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CoachEmailStatusTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $gymId = 1;
    protected $adminUser;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create an admin user for testing
        $this->adminUser = User::factory()->create([
            'role_id' => 1,
            'statut' => 1,
        ]);
    }

    /** @test */
    public function test_coach_creation_returns_email_status_in_response()
    {
        Mail::fake();

        $coachData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'mobile_phone' => '1234567890',
            'gym_id' => $this->gymId,
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
        ];

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson('/api/coaches', $coachData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'status',
                'message',
                'coach',
                'email_status' => [
                    'password_setup_email_sent',
                    'password_setup_email_error',
                    'confirmation_email_sent',
                    'confirmation_email_error',
                ]
            ]);
    }

    /** @test */
    public function test_email_status_when_both_emails_succeed()
    {
        Mail::fake();

        $coachData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'mobile_phone' => '1234567890',
            'gym_id' => $this->gymId,
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
        ];

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson('/api/coaches', $coachData);

        $response->assertStatus(201)
            ->assertJson([
                'status' => 'success',
                'email_status' => [
                    'password_setup_email_sent' => true,
                    'password_setup_email_error' => null,
                    'confirmation_email_sent' => true,
                    'confirmation_email_error' => null,
                ]
            ]);
    }

    /** @test */
    public function test_email_status_when_password_setup_email_fails()
    {
        Mail::fake();

        $coachData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'invalid-email',
            'mobile_phone' => '1234567890',
            'gym_id' => $this->gymId,
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
        ];

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson('/api/coaches', $coachData);

        // Coach creation should still succeed
        $response->assertStatus(201)
            ->assertJson([
                'status' => 'success',
            ])
            ->assertJsonStructure([
                'email_status' => [
                    'password_setup_email_sent',
                    'password_setup_email_error',
                    'confirmation_email_sent',
                    'confirmation_email_error',
                ]
            ]);
    }

    /** @test */
    public function test_email_status_when_confirmation_email_fails()
    {
        Mail::fake();

        $coachData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'mobile_phone' => '1234567890',
            'gym_id' => $this->gymId,
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
        ];

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson('/api/coaches', $coachData);

        // Coach creation should still succeed even if one email fails
        $response->assertStatus(201)
            ->assertJson([
                'status' => 'success',
            ])
            ->assertJsonStructure([
                'email_status'
            ]);
    }

    /** @test */
    public function test_email_status_when_both_emails_fail()
    {
        Mail::fake();

        $coachData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'mobile_phone' => '1234567890',
            'gym_id' => $this->gymId,
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
        ];

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson('/api/coaches', $coachData);

        // Coach creation should still succeed even if both emails fail
        $response->assertStatus(201)
            ->assertJson([
                'status' => 'success',
            ])
            ->assertJsonStructure([
                'email_status' => [
                    'password_setup_email_sent',
                    'password_setup_email_error',
                    'confirmation_email_sent',
                    'confirmation_email_error',
                ]
            ]);
    }

    /** @test */
    public function test_coach_creation_succeeds_even_if_emails_fail()
    {
        Mail::fake();

        $coachData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'mobile_phone' => '1234567890',
            'gym_id' => $this->gymId,
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
        ];

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson('/api/coaches', $coachData);

        // Coach should be created regardless of email status
        $response->assertStatus(201)
            ->assertJson([
                'status' => 'success',
            ]);

        // Verify coach was actually created
        $this->assertDatabaseHas('coaches', [
            'email' => 'john@example.com',
        ]);
    }
}

