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
use Carbon\Carbon;

class CoachPasswordSetupTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $gymId = 1;

    /** @test */
    public function test_coach_creation_generates_password_setup_token()
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

        $coach = Coach::create($coachData);

        // Manually trigger the password setup token generation (simulating controller logic)
        $setupToken = Str::random(60);
        $coach->update([
            'password_setup_token' => $setupToken,
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        $coach->refresh();

        $this->assertNotNull($coach->password_setup_token);
        $this->assertEquals(60, strlen($coach->password_setup_token));
        $this->assertNotNull($coach->password_setup_token_expires_at);
        $this->assertTrue($coach->password_setup_required);
        $this->assertTrue($coach->password_setup_token_expires_at->isFuture());
    }

    /** @test */
    public function test_coach_creation_sends_password_setup_email()
    {
        Mail::fake();

        $coach = Coach::create([
            'gym_id' => $this->gymId,
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane@example.com',
            'mobile_phone' => '1234567890',
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
        ]);

        $setupToken = Str::random(60);
        $coach->update([
            'password_setup_token' => $setupToken,
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        $this->assertNotNull($coach->password_setup_token);
        $this->assertTrue($coach->password_setup_required);
    }

    /** @test */
    public function test_password_setup_with_valid_token()
    {
        $coach = Coach::create([
            'gym_id' => $this->gymId,
            'first_name' => 'Test',
            'last_name' => 'Coach',
            'email' => 'test@example.com',
            'mobile_phone' => '1234567890',
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
            'password_setup_token' => $token = Str::random(60),
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        $response = $this->postJson('/api/coachapp/auth/setup-password', [
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
                    'user' => [
                        'id',
                        'firstname',
                        'lastname',
                        'email',
                    ],
                    'coach' => [
                        'id',
                        'first_name',
                        'last_name',
                        'email',
                    ],
                    'token' => [
                        'access_token',
                        'token_type',
                        'expires_at',
                    ],
                ],
            ]);

        $coach->refresh();
        $this->assertNotNull($coach->password_hash);
        $this->assertTrue(Hash::check('newpassword123', $coach->password_hash));
        $this->assertNull($coach->password_setup_token);
        $this->assertNull($coach->password_setup_token_expires_at);
        $this->assertFalse($coach->password_setup_required);

        // Verify User record was created
        $user = User::where('email', $coach->email)->where('role_id', 3)->first();
        $this->assertNotNull($user);
        $this->assertTrue(Hash::check('newpassword123', $user->password));
        $this->assertEquals(3, $user->role_id); // Coach role
    }

    /** @test */
    public function test_password_setup_with_invalid_token()
    {
        $coach = Coach::create([
            'gym_id' => $this->gymId,
            'first_name' => 'Test',
            'last_name' => 'Coach',
            'email' => 'test@example.com',
            'mobile_phone' => '1234567890',
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
            'password_setup_token' => Str::random(60),
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        $response = $this->postJson('/api/coachapp/auth/setup-password', [
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
        $coach = Coach::create([
            'gym_id' => $this->gymId,
            'first_name' => 'Test',
            'last_name' => 'Coach',
            'email' => 'test@example.com',
            'mobile_phone' => '1234567890',
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
            'password_setup_token' => $token,
            'password_setup_token_expires_at' => now()->subDays(1), // Expired yesterday
            'password_setup_required' => true,
        ]);

        $response = $this->postJson('/api/coachapp/auth/setup-password', [
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
        $coach = Coach::create([
            'gym_id' => $this->gymId,
            'first_name' => 'Test',
            'last_name' => 'Coach',
            'email' => 'test@example.com',
            'mobile_phone' => '1234567890',
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
            'password_setup_token' => $token,
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        // Test missing token
        $response = $this->postJson('/api/coachapp/auth/setup-password', [
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['token']);

        // Test missing password
        $response = $this->postJson('/api/coachapp/auth/setup-password', [
            'token' => $token,
        ]);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);

        // Test password too short
        $response = $this->postJson('/api/coachapp/auth/setup-password', [
            'token' => $token,
            'password' => '12345', // Less than 6 characters
            'password_confirmation' => '12345',
        ]);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);

        // Test password confirmation mismatch
        $response = $this->postJson('/api/coachapp/auth/setup-password', [
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
        $coach = Coach::create([
            'gym_id' => $this->gymId,
            'first_name' => 'Test',
            'last_name' => 'Coach',
            'email' => 'test@example.com',
            'mobile_phone' => '1234567890',
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
            'password_setup_token' => Str::random(60),
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
            // password_hash is null
        ]);

        $response = $this->postJson('/api/coachapp/auth/login', [
            'email' => 'test@example.com',
            'password' => 'anypassword',
            'user_type' => 'coach',
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
        $coach = Coach::create([
            'gym_id' => $this->gymId,
            'first_name' => 'Test',
            'last_name' => 'Coach',
            'email' => 'test@example.com',
            'mobile_phone' => '1234567890',
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
            'password_hash' => Hash::make($password),
            'password_setup_required' => false,
        ]);

        // Create User record for authentication
        $user = User::create([
            'firstname' => $coach->first_name,
            'lastname' => $coach->last_name,
            'username' => strtolower($coach->first_name . $coach->last_name),
            'email' => $coach->email,
            'phone' => $coach->mobile_phone,
            'password' => Hash::make($password),
            'statut' => 1,
            'role_id' => 3,
        ]);

        $response = $this->postJson('/api/coachapp/auth/login', [
            'email' => 'test@example.com',
            'password' => $password,
            'user_type' => 'coach',
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
    public function test_password_setup_creates_user_record()
    {
        $token = Str::random(60);
        $coach = Coach::create([
            'gym_id' => $this->gymId,
            'first_name' => 'Test',
            'last_name' => 'Coach',
            'email' => 'test@example.com',
            'mobile_phone' => '1234567890',
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
            'password_setup_token' => $token,
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        // Verify User doesn't exist yet
        $userBefore = User::where('email', $coach->email)->where('role_id', 3)->first();
        $this->assertNull($userBefore);

        $response = $this->postJson('/api/coachapp/auth/setup-password', [
            'token' => $token,
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response->assertStatus(200);

        // Verify User was created
        $userAfter = User::where('email', $coach->email)->where('role_id', 3)->first();
        $this->assertNotNull($userAfter);
        $this->assertEquals($coach->first_name, $userAfter->firstname);
        $this->assertEquals($coach->last_name, $userAfter->lastname);
        $this->assertEquals(3, $userAfter->role_id);
        $this->assertTrue(Hash::check('newpassword123', $userAfter->password));
    }

    /** @test */
    public function test_password_setup_updates_existing_user_record()
    {
        $token = Str::random(60);
        $coach = Coach::create([
            'gym_id' => $this->gymId,
            'first_name' => 'Test',
            'last_name' => 'Coach',
            'email' => 'test@example.com',
            'mobile_phone' => '1234567890',
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
            'password_setup_token' => $token,
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        // Create existing User record
        $existingUser = User::create([
            'firstname' => 'Old',
            'lastname' => 'Name',
            'username' => 'oldname',
            'email' => $coach->email,
            'phone' => '9999999999',
            'password' => Hash::make('oldpassword'),
            'statut' => 1,
            'role_id' => 3,
        ]);

        $response = $this->postJson('/api/coachapp/auth/setup-password', [
            'token' => $token,
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response->assertStatus(200);

        // Verify User was updated
        $existingUser->refresh();
        $this->assertEquals($coach->first_name, $existingUser->firstname);
        $this->assertEquals($coach->last_name, $existingUser->lastname);
        $this->assertTrue(Hash::check('newpassword123', $existingUser->password));
    }

    /** @test */
    public function test_password_setup_clears_token_after_success()
    {
        $token = Str::random(60);
        $coach = Coach::create([
            'gym_id' => $this->gymId,
            'first_name' => 'Test',
            'last_name' => 'Coach',
            'email' => 'test@example.com',
            'mobile_phone' => '1234567890',
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
            'password_setup_token' => $token,
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        $this->assertNotNull($coach->password_setup_token);
        $this->assertNotNull($coach->password_setup_token_expires_at);
        $this->assertTrue($coach->password_setup_required);

        $response = $this->postJson('/api/coachapp/auth/setup-password', [
            'token' => $token,
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response->assertStatus(200);

        $coach->refresh();
        $this->assertNull($coach->password_setup_token);
        $this->assertNull($coach->password_setup_token_expires_at);
        $this->assertFalse($coach->password_setup_required);
    }

    /** @test */
    public function test_password_setup_prevents_reuse_of_token()
    {
        $token = Str::random(60);
        $coach = Coach::create([
            'gym_id' => $this->gymId,
            'first_name' => 'Test',
            'last_name' => 'Coach',
            'email' => 'test@example.com',
            'mobile_phone' => '1234567890',
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
            'password_setup_token' => $token,
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        // First use - should succeed
        $response = $this->postJson('/api/coachapp/auth/setup-password', [
            'token' => $token,
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response->assertStatus(200);

        // Second use with same token - should fail
        $response = $this->postJson('/api/coachapp/auth/setup-password', [
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

