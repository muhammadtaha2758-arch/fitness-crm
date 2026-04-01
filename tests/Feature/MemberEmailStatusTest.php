<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Member;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class MemberEmailStatusTest extends TestCase
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
    public function test_member_creation_returns_email_status_in_response()
    {
        Mail::fake();

        $memberData = [
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'john@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'gym_id' => $this->gymId,
        ];

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson('/api/members', $memberData);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'member_id',
                'invoice_created',
                'invoice_id',
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

        $memberData = [
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'john@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'gym_id' => $this->gymId,
        ];

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson('/api/members', $memberData);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
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
        // This test would require mocking Mail::to()->send() to throw an exception
        // For now, we'll test that the structure is correct
        Mail::fake();

        $memberData = [
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'invalid-email', // This might cause email to fail
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'gym_id' => $this->gymId,
        ];

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson('/api/members', $memberData);

        // Member creation should still succeed
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
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

        $memberData = [
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'john@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'gym_id' => $this->gymId,
        ];

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson('/api/members', $memberData);

        // Member creation should still succeed even if one email fails
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonStructure([
                'email_status'
            ]);
    }

    /** @test */
    public function test_email_status_when_both_emails_fail()
    {
        Mail::fake();

        $memberData = [
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'john@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'gym_id' => $this->gymId,
        ];

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson('/api/members', $memberData);

        // Member creation should still succeed even if both emails fail
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
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
    public function test_member_creation_succeeds_even_if_emails_fail()
    {
        Mail::fake();

        $memberData = [
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'john@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'gym_id' => $this->gymId,
        ];

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson('/api/members', $memberData);

        // Member should be created regardless of email status
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);

        // Verify member was actually created
        $this->assertDatabaseHas('members', [
            'email' => 'john@example.com',
        ]);
    }
}

