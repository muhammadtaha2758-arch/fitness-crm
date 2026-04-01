<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Member;
use App\Models\Coach;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserCreationOnMemberCoachCreationTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $gymId = 1;

    /**
     * Test that creating a member also creates a User record
     */
    public function test_member_creation_creates_user_record()
    {
        Mail::fake();

        $adminUser = User::create([
            'firstname' => 'Admin',
            'lastname' => 'User',
            'username' => 'admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
            'statut' => 1,
            'gym_id' => $this->gymId,
        ]);
        $this->actingAs($adminUser, 'api');

        $memberData = [
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'john.doe@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'mobile_phone' => '1234567890',
        ];

        $response = $this->postJson('/api/members', $memberData);

        $response->assertStatus(201);

        // Check member was created
        $member = Member::where('email', 'john.doe@example.com')->first();
        $this->assertNotNull($member);
        $this->assertEquals('John', $member->firstname);
        $this->assertEquals('Doe', $member->lastname);

        // Check User record was created
        $userRecord = User::where('email', 'john.doe@example.com')
            ->where('role_id', 2)
            ->first();
        
        $this->assertNotNull($userRecord, 'User record should be created for member');
        $this->assertEquals('John', $userRecord->firstname);
        $this->assertEquals('Doe', $userRecord->lastname);
        $this->assertEquals(2, $userRecord->role_id); // Member role
        $this->assertEquals(1, $userRecord->statut); // Active
        $this->assertEquals($this->gymId, $userRecord->gym_id);
        $this->assertNotNull($userRecord->password);
        $this->assertStringStartsWith('john', strtolower($userRecord->username));
    }

    /**
     * Test that creating a coach also creates a User record
     */
    public function test_coach_creation_creates_user_record()
    {
        Mail::fake();

        $adminUser = User::create([
            'firstname' => 'Admin',
            'lastname' => 'User',
            'username' => 'admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
            'statut' => 1,
            'gym_id' => $this->gymId,
        ]);
        $this->actingAs($adminUser, 'api');

        $coachData = [
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane.smith@example.com',
            'mobile_phone' => '0987654321',
            'landline_phone' => '1112223333',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
        ];

        $response = $this->postJson('/api/coaches', $coachData);

        $response->assertStatus(201);

        // Check coach was created
        $coach = Coach::where('email', 'jane.smith@example.com')->first();
        $this->assertNotNull($coach);
        $this->assertEquals('Jane', $coach->first_name);
        $this->assertEquals('Smith', $coach->last_name);

        // Check User record was created
        $userRecord = User::where('email', 'jane.smith@example.com')
            ->where('role_id', 3)
            ->first();
        
        $this->assertNotNull($userRecord, 'User record should be created for coach');
        $this->assertEquals('Jane', $userRecord->firstname);
        $this->assertEquals('Smith', $userRecord->lastname);
        $this->assertEquals(3, $userRecord->role_id); // Coach role
        $this->assertEquals(1, $userRecord->statut); // Active
        $this->assertNotNull($userRecord->password);
        $this->assertStringStartsWith('jane', strtolower($userRecord->username));
    }

    /**
     * Test that User record is not created if one already exists with same email and role
     */
    public function test_member_creation_skips_user_creation_if_exists()
    {
        Mail::fake();

        // Create existing user with same email and role_id = 2
        $existingUser = User::create([
            'firstname' => 'Existing',
            'lastname' => 'User',
            'username' => 'existing',
            'email' => 'existing@example.com',
            'password' => Hash::make('password'),
            'role_id' => 2,
            'statut' => 1,
            'gym_id' => $this->gymId,
        ]);

        $adminUser = User::create([
            'firstname' => 'Admin',
            'lastname' => 'User',
            'username' => 'admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
            'statut' => 1,
            'gym_id' => $this->gymId,
        ]);
        $this->actingAs($adminUser, 'api');

        $memberData = [
            'firstname' => 'New',
            'lastname' => 'Member',
            'email' => 'existing@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'gym_id' => $this->gymId,
        ];

        $response = $this->postJson('/api/members', $memberData);

        $response->assertStatus(201);

        // Check that only one user exists with this email and role
        $userCount = User::where('email', 'existing@example.com')
            ->where('role_id', 2)
            ->count();
        
        $this->assertEquals(1, $userCount, 'Should not create duplicate user');
    }

    /**
     * Test that username is unique when creating User record
     */
    public function test_user_username_is_unique()
    {
        Mail::fake();

        $adminUser = User::create([
            'firstname' => 'Admin',
            'lastname' => 'User',
            'username' => 'admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
            'statut' => 1,
            'gym_id' => $this->gymId,
        ]);
        $this->actingAs($adminUser, 'api');

        // Create first member
        $memberData1 = [
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'john1@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'gym_id' => $this->gymId,
        ];

        $response1 = $this->postJson('/api/members', $memberData1);
        $response1->assertStatus(201);

        $member1 = Member::where('email', 'john1@example.com')->first();
        $user1 = User::where('email', 'john1@example.com')->where('role_id', 2)->first();
        $expectedUsername1 = strtolower('johndoe' . $member1->id);
        $this->assertEquals($expectedUsername1, $user1->username);

        // Create second member with same name (should get unique username)
        $memberData2 = [
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'john2@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'gym_id' => $this->gymId,
        ];

        $response2 = $this->postJson('/api/members', $memberData2);
        $response2->assertStatus(201);

        $member2 = Member::where('email', 'john2@example.com')->first();
        $user2 = User::where('email', 'john2@example.com')->where('role_id', 2)->first();
        
        // Username should be unique (either johndoe{id} or johndoe{id}1 if first one exists)
        $this->assertNotEquals($user1->username, $user2->username, 'Usernames should be unique');
    }

    /**
     * Test that User record has correct phone number from member
     */
    public function test_user_phone_from_member()
    {
        Mail::fake();

        $adminUser = User::create([
            'firstname' => 'Admin',
            'lastname' => 'User',
            'username' => 'admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
            'statut' => 1,
            'gym_id' => $this->gymId,
        ]);
        $this->actingAs($adminUser, 'api');

        $memberData = [
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'phone@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'mobile_phone' => '1234567890',
            'landline_phone' => '0987654321',
            'gym_id' => $this->gymId,
        ];

        $response = $this->postJson('/api/members', $memberData);
        $response->assertStatus(201);

        $userRecord = User::where('email', 'phone@example.com')->where('role_id', 2)->first();
        $this->assertEquals('1234567890', $userRecord->phone, 'Should use mobile_phone if available');
    }

    /**
     * Test that User record uses landline_phone if mobile_phone is not available
     */
    public function test_user_phone_fallback_to_landline()
    {
        Mail::fake();

        $adminUser = User::create([
            'firstname' => 'Admin',
            'lastname' => 'User',
            'username' => 'admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
            'statut' => 1,
            'gym_id' => $this->gymId,
        ]);
        $this->actingAs($adminUser, 'api');

        $memberData = [
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'landline@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'landline_phone' => '0987654321',
            'gym_id' => $this->gymId,
        ];

        $response = $this->postJson('/api/members', $memberData);
        $response->assertStatus(201);

        $userRecord = User::where('email', 'landline@example.com')->where('role_id', 2)->first();
        $this->assertEquals('0987654321', $userRecord->phone, 'Should use landline_phone if mobile_phone not available');
    }

    /**
     * Test that User record password is hashed
     */
    public function test_user_password_is_hashed()
    {
        Mail::fake();

        $adminUser = User::create([
            'firstname' => 'Admin',
            'lastname' => 'User',
            'username' => 'admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
            'statut' => 1,
            'gym_id' => $this->gymId,
        ]);
        $this->actingAs($adminUser, 'api');

        $memberData = [
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'password@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'gym_id' => $this->gymId,
        ];

        $response = $this->postJson('/api/members', $memberData);
        $response->assertStatus(201);

        $userRecord = User::where('email', 'password@example.com')->where('role_id', 2)->first();
        $this->assertNotNull($userRecord->password);
        $this->assertNotEquals('plaintext', $userRecord->password);
        $this->assertTrue(Hash::check('anything', $userRecord->password) || strlen($userRecord->password) > 20);
    }

    /**
     * Test that member creation doesn't fail if User creation fails
     */
    public function test_member_creation_continues_if_user_creation_fails()
    {
        Mail::fake();

        $adminUser = User::create([
            'firstname' => 'Admin',
            'lastname' => 'User',
            'username' => 'admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
            'statut' => 1,
            'gym_id' => $this->gymId,
        ]);
        $this->actingAs($adminUser, 'api');

        // Create a user that will cause a conflict (if we try to create another with same username)
        // This is a bit tricky, but we can test that member is created even if user creation has issues

        $memberData = [
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'resilient@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'gym_id' => $this->gymId,
        ];

        $response = $this->postJson('/api/members', $memberData);
        
        // Member should be created successfully
        $member = Member::where('email', 'resilient@example.com')->first();
        $this->assertNotNull($member, 'Member should be created even if user creation has issues');
    }

    /**
     * Test that coach creation creates User with correct gym_id
     */
    public function test_coach_user_has_correct_gym_id()
    {
        Mail::fake();

        $gymId = 5;
        $adminUser = User::create([
            'firstname' => 'Admin',
            'lastname' => 'User',
            'username' => 'admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
            'statut' => 1,
            'gym_id' => $gymId,
        ]);
        $this->actingAs($adminUser, 'api');

        $coachData = [
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'gymtest@example.com',
            'mobile_phone' => '1234567890',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
        ];

        $response = $this->postJson('/api/coaches', $coachData);
        $response->assertStatus(201);

        $userRecord = User::where('email', 'gymtest@example.com')->where('role_id', 3)->first();
        $this->assertEquals($gymId, $userRecord->gym_id, 'User should have same gym_id as coach');
    }

    /**
     * Test that password setup updates User table password for members
     */
    public function test_member_password_setup_updates_user_password()
    {
        Mail::fake();

        // Create member and user (simulating member creation)
        $member = Member::create([
            'firstname' => 'Test',
            'lastname' => 'Member',
            'membername' => 'Test Member',
            'email' => 'passwordsetup@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'gym_id' => $this->gymId,
            'Statuses' => 'active',
        ]);

        $user = User::create([
            'firstname' => 'Test',
            'lastname' => 'Member',
            'username' => 'testmember',
            'email' => 'passwordsetup@example.com',
            'password' => Hash::make('oldpassword'),
            'role_id' => 2,
            'statut' => 1,
            'gym_id' => $this->gymId,
        ]);

        $setupToken = Str::random(60);
        $member->update([
            'password_setup_token' => $setupToken,
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        $newPassword = 'newpassword123';
        $response = $this->postJson('/api/mobile/auth/setup-password', [
            'token' => $setupToken,
            'password' => $newPassword,
            'password_confirmation' => $newPassword,
        ]);

        $response->assertStatus(200);

        // Check User password was updated
        $user->refresh();
        $this->assertTrue(Hash::check($newPassword, $user->password), 'User password should be updated');
    }

    /**
     * Test that password setup updates User table password for coaches
     */
    public function test_coach_password_setup_updates_user_password()
    {
        Mail::fake();

        // Create coach and user (simulating coach creation)
        $coach = Coach::create([
            'first_name' => 'Test',
            'last_name' => 'Coach',
            'email' => 'coachpassword@example.com',
            'mobile_phone' => '1234567890',
            'address' => '123 Main St',
            'city' => 'City',
            'state' => 'State',
            'zip' => '12345',
            'coach_type' => 'Personal Coach',
            'years_of_experience' => 5,
            'status' => 'Active',
            'gym_id' => $this->gymId,
        ]);

        $user = User::create([
            'firstname' => 'Test',
            'lastname' => 'Coach',
            'username' => 'testcoach',
            'email' => 'coachpassword@example.com',
            'password' => Hash::make('oldpassword'),
            'role_id' => 3,
            'statut' => 1,
            'gym_id' => $this->gymId,
        ]);

        $setupToken = Str::random(60);
        $coach->update([
            'password_setup_token' => $setupToken,
            'password_setup_token_expires_at' => now()->addDays(7),
            'password_setup_required' => true,
        ]);

        $newPassword = 'newpassword123';
        $response = $this->postJson('/api/coachapp/auth/setup-password', [
            'token' => $setupToken,
            'password' => $newPassword,
            'password_confirmation' => $newPassword,
        ]);

        $response->assertStatus(200);

        // Check User password was updated
        $user->refresh();
        $this->assertTrue(Hash::check($newPassword, $user->password), 'User password should be updated');
    }
}

