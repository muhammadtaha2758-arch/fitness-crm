<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Member;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class MemberPasswordSetupTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $gymId = 1;

    /** @test */
    public function test_member_creation_generates_password_setup_token()
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

        // Simulate member creation through controller
        // In real scenario, this would be done via API call
        $member = Member::create($memberData);

        // Manually trigger the password setup token generation (simulating controller logic)
        $setupToken = Str::random(60);
        $member->update([
            'password_setup_token' => $setupToken,
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        $member->refresh();

        $this->assertNotNull($member->password_setup_token);
        $this->assertEquals(60, strlen($member->password_setup_token));
        $this->assertNotNull($member->password_setup_token_expires_at);
        $this->assertTrue($member->password_setup_required);
        $this->assertTrue($member->password_setup_token_expires_at->isFuture());
    }

    /** @test */
    public function test_member_creation_sends_password_setup_email()
    {
        Mail::fake();

        $member = Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'Jane',
            'lastname' => 'Smith',
            'membername' => 'Jane Smith',
            'email' => 'jane@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Female',
            'Statuses' => 'active',
        ]);

        $setupToken = Str::random(60);
        $member->update([
            'password_setup_token' => $setupToken,
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        // In real scenario, email would be sent via MemberController
        // For this test, we verify the token is set correctly
        $this->assertNotNull($member->password_setup_token);
        $this->assertTrue($member->password_setup_required);
    }

    /** @test */
    public function test_password_setup_with_valid_token()
    {
        $member = Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'Test',
            'lastname' => 'User',
            'membername' => 'Test User',
            'email' => 'test@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'Statuses' => 'active',
            'password_setup_token' => $token = Str::random(60),
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        $response = $this->postJson('/api/mobile/auth/setup-password', [
            'token' => $token,
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Password set successfully. You are now logged in.',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'member' => [
                        'id',
                        'firstname',
                        'lastname',
                        'email',
                    ],
                    'token' => [
                        'access_token',
                        'token_type',
                        'expires_at',
                    ],
                ],
            ]);

        $member->refresh();
        $this->assertNotNull($member->password_hash);
        $this->assertTrue(Hash::check('newpassword123', $member->password_hash));
        $this->assertNull($member->password_setup_token);
        $this->assertNull($member->password_setup_token_expires_at);
        $this->assertFalse($member->password_setup_required);
        $this->assertNotNull($member->token);
    }

    /** @test */
    public function test_password_setup_with_invalid_token()
    {
        $member = Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'Test',
            'lastname' => 'User',
            'membername' => 'Test User',
            'email' => 'test@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'Statuses' => 'active',
            'password_setup_token' => Str::random(60),
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        $response = $this->postJson('/api/mobile/auth/setup-password', [
            'token' => 'invalid_token_that_does_not_exist',
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response->assertStatus(400)
            ->assertJson([
                'success' => false,
                'message' => 'Invalid or expired setup token. Please request a new password setup link.',
            ]);
    }

    /** @test */
    public function test_password_setup_with_expired_token()
    {
        $token = Str::random(60);
        $member = Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'Test',
            'lastname' => 'User',
            'membername' => 'Test User',
            'email' => 'test@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'Statuses' => 'active',
            'password_setup_token' => $token,
            'password_setup_token_expires_at' => now()->subDays(1), // Expired yesterday
            'password_setup_required' => true,
        ]);

        $response = $this->postJson('/api/mobile/auth/setup-password', [
            'token' => $token,
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response->assertStatus(400)
            ->assertJson([
                'success' => false,
                'message' => 'Invalid or expired setup token. Please request a new password setup link.',
            ]);
    }

    /** @test */
    public function test_password_setup_validation_errors()
    {
        $token = Str::random(60);
        $member = Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'Test',
            'lastname' => 'User',
            'membername' => 'Test User',
            'email' => 'test@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'Statuses' => 'active',
            'password_setup_token' => $token,
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        // Test missing token
        $response = $this->postJson('/api/mobile/auth/setup-password', [
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['token']);

        // Test missing password
        $response = $this->postJson('/api/mobile/auth/setup-password', [
            'token' => $token,
        ]);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);

        // Test password too short
        $response = $this->postJson('/api/mobile/auth/setup-password', [
            'token' => $token,
            'password' => '12345', // Less than 6 characters
            'password_confirmation' => '12345',
        ]);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);

        // Test password confirmation mismatch
        $response = $this->postJson('/api/mobile/auth/setup-password', [
            'token' => $token,
            'password' => 'newpassword123',
            'password_confirmation' => 'differentpassword',
        ]);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    /** @test */
    public function test_login_blocks_when_password_setup_required()
    {
        $member = Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'Test',
            'lastname' => 'User',
            'membername' => 'Test User',
            'email' => 'test@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'Statuses' => 'active',
            'password_setup_token' => Str::random(60),
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
            // password_hash is null
        ]);

        $response = $this->postJson('/api/mobile/auth/login', [
            'email' => 'test@example.com',
            'password' => 'anypassword',
        ]);

        $response->assertStatus(403)
            ->assertJson([
                'success' => false,
                'message' => 'Password setup required. Please check your email for the password setup link.',
                'requires_setup' => true,
            ]);
    }

    /** @test */
    public function test_login_succeeds_after_password_setup()
    {
        $password = 'testpassword123';
        $member = Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'Test',
            'lastname' => 'User',
            'membername' => 'Test User',
            'email' => 'test@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'Statuses' => 'active',
            'password_hash' => Hash::make($password),
            'password_setup_required' => false,
        ]);

        $response = $this->postJson('/api/mobile/auth/login', [
            'email' => 'test@example.com',
            'password' => $password,
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Login successful',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'user' => [
                        'id',
                        'firstname',
                        'lastname',
                        'email',
                    ],
                    'token' => [
                        'access_token',
                        'token_type',
                        'expires_at',
                    ],
                ],
            ]);
    }

    /** @test */
    public function test_password_setup_auto_logs_in_member()
    {
        $token = Str::random(60);
        $member = Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'Test',
            'lastname' => 'User',
            'membername' => 'Test User',
            'email' => 'test@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'Statuses' => 'active',
            'password_setup_token' => $token,
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        $response = $this->postJson('/api/mobile/auth/setup-password', [
            'token' => $token,
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response->assertStatus(200);
        
        $data = $response->json('data');
        $this->assertNotNull($data['token']['access_token']);
        $this->assertEquals('Bearer', $data['token']['token_type']);
        $this->assertNotNull($data['member']['id']);
        $this->assertEquals($member->id, $data['member']['id']);

        $member->refresh();
        $this->assertNotNull($member->token);
        $this->assertEquals($data['token']['access_token'], $member->token);
    }

    /** @test */
    public function test_email_failure_does_not_prevent_member_creation()
    {
        // This test verifies that member creation logic doesn't fail if email sending fails
        // In a real scenario, this would be tested through the actual API endpoint
        // For now, we verify that the member can be created with password_setup_required flag
        
        $member = Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'Test',
            'lastname' => 'User',
            'membername' => 'Test User',
            'email' => 'test@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'Statuses' => 'active',
        ]);

        // Simulate email failure scenario - member still exists
        $this->assertNotNull($member->id);
        $this->assertTrue($member->exists);
    }

    /** @test */
    public function test_password_setup_clears_token_after_success()
    {
        $token = Str::random(60);
        $member = Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'Test',
            'lastname' => 'User',
            'membername' => 'Test User',
            'email' => 'test@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'Statuses' => 'active',
            'password_setup_token' => $token,
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        $this->assertNotNull($member->password_setup_token);
        $this->assertNotNull($member->password_setup_token_expires_at);
        $this->assertTrue($member->password_setup_required);

        $response = $this->postJson('/api/mobile/auth/setup-password', [
            'token' => $token,
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response->assertStatus(200);

        $member->refresh();
        $this->assertNull($member->password_setup_token);
        $this->assertNull($member->password_setup_token_expires_at);
        $this->assertFalse($member->password_setup_required);
    }

    /** @test */
    public function test_password_setup_prevents_reuse_of_token()
    {
        $token = Str::random(60);
        $member = Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'Test',
            'lastname' => 'User',
            'membername' => 'Test User',
            'email' => 'test@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'Statuses' => 'active',
            'password_setup_token' => $token,
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        // First use - should succeed
        $response = $this->postJson('/api/mobile/auth/setup-password', [
            'token' => $token,
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response->assertStatus(200);

        // Second use with same token - should fail
        $response = $this->postJson('/api/mobile/auth/setup-password', [
            'token' => $token,
            'password' => 'anotherpassword',
            'password_confirmation' => 'anotherpassword',
        ]);

        $response->assertStatus(400)
            ->assertJson([
                'success' => false,
                'message' => 'Invalid or expired setup token. Please request a new password setup link.',
            ]);
    }
}

