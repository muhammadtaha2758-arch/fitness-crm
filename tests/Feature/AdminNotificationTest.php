<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\AdminNotification;
use App\Models\Member;
use App\Models\Coach;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Mail;

class AdminNotificationTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $gymId = 1;
    protected $adminUser;
    protected $adminUser2;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create admin users for testing
        $this->adminUser = User::factory()->create([
            'role_id' => 1,
            'statut' => 1,
        ]);
        
        $this->adminUser2 = User::factory()->create([
            'role_id' => 1,
            'statut' => 1,
        ]);
    }

    /** @test */
    public function test_notification_creation_on_member_creation()
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

        $response->assertStatus(200);

        // Verify notifications were created for all admin users
        $this->assertDatabaseHas('admin_notifications', [
            'user_id' => $this->adminUser->id,
            'type' => 'member_created',
            'related_type' => 'member',
        ]);

        $this->assertDatabaseHas('admin_notifications', [
            'user_id' => $this->adminUser2->id,
            'type' => 'member_created',
            'related_type' => 'member',
        ]);
    }

    /** @test */
    public function test_notification_creation_on_coach_creation()
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

        $response->assertStatus(201);

        // Verify notifications were created for all admin users
        $this->assertDatabaseHas('admin_notifications', [
            'user_id' => $this->adminUser->id,
            'type' => 'coach_created',
            'related_type' => 'coach',
        ]);

        $this->assertDatabaseHas('admin_notifications', [
            'user_id' => $this->adminUser2->id,
            'type' => 'coach_created',
            'related_type' => 'coach',
        ]);
    }

    /** @test */
    public function test_notification_is_created_for_all_admin_users()
    {
        Mail::fake();

        // Create a third admin user
        $adminUser3 = User::factory()->create([
            'role_id' => 1,
            'statut' => 1,
        ]);

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

        $response->assertStatus(200);

        // Verify notifications were created for all three admin users
        $this->assertEquals(3, AdminNotification::where('type', 'member_created')->count());
    }

    /** @test */
    public function test_unread_count_endpoint()
    {
        // Create some notifications
        AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'member_created',
            'title' => 'Test',
            'message' => 'Test message',
            'is_read' => false,
        ]);

        AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'member_created',
            'title' => 'Test',
            'message' => 'Test message',
            'is_read' => true,
        ]);

        $response = $this->actingAs($this->adminUser, 'api')
            ->getJson('/api/admin/notifications/unread-count');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'count' => 1,
            ]);
    }

    /** @test */
    public function test_recent_endpoint()
    {
        // Create some notifications
        AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'member_created',
            'title' => 'Test 1',
            'message' => 'Test message 1',
        ]);

        AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'member_created',
            'title' => 'Test 2',
            'message' => 'Test message 2',
        ]);

        $response = $this->actingAs($this->adminUser, 'api')
            ->getJson('/api/admin/notifications/recent');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonCount(2, 'data');
    }

    /** @test */
    public function test_mark_as_read_endpoint()
    {
        $notification = AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'member_created',
            'title' => 'Test',
            'message' => 'Test message',
            'is_read' => false,
        ]);

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson("/api/admin/notifications/{$notification->id}/mark-read");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);

        $notification->refresh();
        $this->assertTrue($notification->is_read);
        $this->assertNotNull($notification->read_at);
    }

    /** @test */
    public function test_mark_all_as_read_endpoint()
    {
        // Create some unread notifications
        AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'member_created',
            'title' => 'Test 1',
            'message' => 'Test message 1',
            'is_read' => false,
        ]);

        AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'member_created',
            'title' => 'Test 2',
            'message' => 'Test message 2',
            'is_read' => false,
        ]);

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson('/api/admin/notifications/mark-all-read');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);

        $this->assertEquals(0, AdminNotification::forUser($this->adminUser->id)->unread()->count());
    }

    /** @test */
    public function test_show_endpoint_auto_marks_as_read()
    {
        $notification = AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'member_created',
            'title' => 'Test',
            'message' => 'Test message',
            'is_read' => false,
        ]);

        $response = $this->actingAs($this->adminUser, 'api')
            ->getJson("/api/admin/notifications/{$notification->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);

        $notification->refresh();
        $this->assertTrue($notification->is_read);
    }

    /** @test */
    public function test_filtering_by_is_read_status()
    {
        AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'member_created',
            'title' => 'Test 1',
            'message' => 'Test message 1',
            'is_read' => false,
        ]);

        AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'member_created',
            'title' => 'Test 2',
            'message' => 'Test message 2',
            'is_read' => true,
        ]);

        $response = $this->actingAs($this->adminUser, 'api')
            ->getJson('/api/admin/notifications?is_read=false');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);

        $data = $response->json('data.data');
        $this->assertCount(1, $data);
        $this->assertFalse($data[0]['is_read']);
    }

    /** @test */
    public function test_filtering_by_type()
    {
        AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'member_created',
            'title' => 'Test 1',
            'message' => 'Test message 1',
        ]);

        AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'coach_created',
            'title' => 'Test 2',
            'message' => 'Test message 2',
        ]);

        $response = $this->actingAs($this->adminUser, 'api')
            ->getJson('/api/admin/notifications?type=member_created');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);

        $data = $response->json('data.data');
        $this->assertCount(1, $data);
        $this->assertEquals('member_created', $data[0]['type']);
    }

    /** @test */
    public function test_pagination()
    {
        // Create 25 notifications
        for ($i = 0; $i < 25; $i++) {
            AdminNotification::create([
                'user_id' => $this->adminUser->id,
                'type' => 'member_created',
                'title' => "Test {$i}",
                'message' => "Test message {$i}",
            ]);
        }

        $response = $this->actingAs($this->adminUser, 'api')
            ->getJson('/api/admin/notifications?per_page=10');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);

        $data = $response->json('data');
        $this->assertCount(10, $data['data']);
        $this->assertEquals(25, $data['total']);
    }

    /** @test */
    public function test_notification_relationships()
    {
        $member = Member::create([
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'john@example.com',
            'gym_id' => $this->gymId,
        ]);

        $notification = AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'member_created',
            'title' => 'Test',
            'message' => 'Test message',
            'related_type' => 'member',
            'related_id' => $member->id,
        ]);

        $this->assertInstanceOf(User::class, $notification->user);
        $this->assertEquals($this->adminUser->id, $notification->user->id);
    }
}

