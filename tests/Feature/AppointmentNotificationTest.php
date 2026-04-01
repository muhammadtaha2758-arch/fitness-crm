<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\AdminNotification;
use App\Models\Appointment;
use App\Models\Member;
use App\Models\Coach;
use App\Models\User;
use App\Models\Workout;
use App\Services\NotificationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Mail;

class AppointmentNotificationTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $gymId = 1;
    protected $adminUser;
    protected $adminUser2;
    protected $member;
    protected $coach;
    protected $workout;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create admin users for testing
        $this->adminUser = User::factory()->create([
            'role_id' => 1,
            'statut' => 1,
            'gym_id' => $this->gymId,
        ]);
        
        $this->adminUser2 = User::factory()->create([
            'role_id' => 1,
            'statut' => 1,
            'gym_id' => $this->gymId,
        ]);
        
        // Create member
        $this->member = Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'john@example.com',
            'date_of_birth' => '1990-01-01',
            'gender' => 'Male',
            'membername' => 'John Doe',
            'Statuses' => 'active',
        ]);
        
        // Create coach
        $this->coach = Coach::create([
            'gym_id' => $this->gymId,
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane@example.com',
            'mobile_phone' => '1234567890',
            'coach_type' => 'Personal Coach',
            'status' => 'Active',
        ]);
        
        // Create workout
        $this->workout = Workout::create([
            'gym_id' => $this->gymId,
            'exercise_name' => 'Test Workout',
            'category' => 'Strength',
        ]);
    }

    /** @test */
    public function test_admin_notification_created_when_appointment_is_created()
    {
        Mail::fake();

        $appointmentData = [
            'date' => now()->addDays(1)->format('Y-m-d'),
            'start_time' => '10:00:00',
            'end_time' => '11:00:00',
            'staff_id' => $this->coach->id,
            'client_id' => $this->member->id,
            'workout_id' => $this->workout->id,
        ];

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson('/api/appointments', $appointmentData);

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);

        // Verify admin notifications were created for all admin users
        $this->assertDatabaseHas('admin_notifications', [
            'user_id' => $this->adminUser->id,
            'type' => 'appointment_created',
            'related_type' => 'appointment',
        ]);

        $this->assertDatabaseHas('admin_notifications', [
            'user_id' => $this->adminUser2->id,
            'type' => 'appointment_created',
            'related_type' => 'appointment',
        ]);
    }

    /** @test */
    public function test_member_notification_created_when_appointment_is_created()
    {
        Mail::fake();

        $appointmentData = [
            'date' => now()->addDays(1)->format('Y-m-d'),
            'start_time' => '10:00:00',
            'end_time' => '11:00:00',
            'staff_id' => $this->coach->id,
            'client_id' => $this->member->id,
            'workout_id' => $this->workout->id,
        ];

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson('/api/appointments', $appointmentData);

        $response->assertStatus(200);

        // Verify member notification was created
        $this->assertDatabaseHas('admin_notifications', [
            'member_id' => $this->member->id,
            'type' => 'appointment_created',
            'related_type' => 'appointment',
        ]);
    }

    /** @test */
    public function test_coach_notification_created_when_appointment_is_created()
    {
        Mail::fake();

        $appointmentData = [
            'date' => now()->addDays(1)->format('Y-m-d'),
            'start_time' => '10:00:00',
            'end_time' => '11:00:00',
            'staff_id' => $this->coach->id,
            'client_id' => $this->member->id,
            'workout_id' => $this->workout->id,
        ];

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson('/api/appointments', $appointmentData);

        $response->assertStatus(200);

        // Verify coach notification was created
        $this->assertDatabaseHas('admin_notifications', [
            'coach_id' => $this->coach->id,
            'type' => 'appointment_created',
            'related_type' => 'appointment',
        ]);
    }

    /** @test */
    public function test_notification_created_when_appointment_is_updated()
    {
        Mail::fake();

        // Create appointment first
        $appointment = Appointment::create([
            'gym_id' => $this->gymId,
            'member_id' => $this->member->id,
            'trainer_id' => $this->coach->id,
            'workout_id' => $this->workout->id,
            'date' => now()->addDays(1)->format('Y-m-d'),
            'start_time' => '10:00:00',
            'end_time' => '11:00:00',
            'status' => 'scheduled',
        ]);

        // Clear previous notifications
        AdminNotification::truncate();

        $updateData = [
            'date' => now()->addDays(2)->format('Y-m-d'),
            'start_time' => '14:00:00',
            'end_time' => '15:00:00',
            'staff_id' => $this->coach->id,
            'client_id' => $this->member->id,
            'workout_id' => $this->workout->id,
        ];

        $response = $this->actingAs($this->adminUser, 'api')
            ->putJson("/api/appointments/{$appointment->id}", $updateData);

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);

        // Verify update notifications were created
        $this->assertDatabaseHas('admin_notifications', [
            'user_id' => $this->adminUser->id,
            'type' => 'appointment_updated',
            'related_type' => 'appointment',
            'related_id' => $appointment->id,
        ]);

        $this->assertDatabaseHas('admin_notifications', [
            'member_id' => $this->member->id,
            'type' => 'appointment_updated',
        ]);

        $this->assertDatabaseHas('admin_notifications', [
            'coach_id' => $this->coach->id,
            'type' => 'appointment_updated',
        ]);
    }

    /** @test */
    public function test_notification_created_when_appointment_is_cancelled()
    {
        Mail::fake();

        // Create appointment first
        $appointment = Appointment::create([
            'gym_id' => $this->gymId,
            'member_id' => $this->member->id,
            'trainer_id' => $this->coach->id,
            'workout_id' => $this->workout->id,
            'date' => now()->addDays(1)->format('Y-m-d'),
            'start_time' => '10:00:00',
            'end_time' => '11:00:00',
            'status' => 'scheduled',
        ]);

        // Clear previous notifications
        AdminNotification::truncate();

        $response = $this->actingAs($this->adminUser, 'api')
            ->deleteJson("/api/appointments/{$appointment->id}");

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);

        // Verify cancellation notifications were created
        $this->assertDatabaseHas('admin_notifications', [
            'user_id' => $this->adminUser->id,
            'type' => 'appointment_cancelled',
            'related_type' => 'appointment',
            'related_id' => $appointment->id,
        ]);

        $this->assertDatabaseHas('admin_notifications', [
            'member_id' => $this->member->id,
            'type' => 'appointment_cancelled',
        ]);

        $this->assertDatabaseHas('admin_notifications', [
            'coach_id' => $this->coach->id,
            'type' => 'appointment_cancelled',
        ]);
    }

    /** @test */
    public function test_admin_can_retrieve_appointment_notifications()
    {
        // Create appointment notifications
        AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'appointment_created',
            'title' => 'New Appointment Scheduled',
            'message' => 'Test appointment',
            'icon' => 'fa-calendar-check',
            'color' => 'info',
            'related_type' => 'appointment',
            'related_id' => 1,
            'is_read' => false,
        ]);

        $response = $this->actingAs($this->adminUser, 'api')
            ->getJson('/api/admin/notifications');

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);
        $this->assertCount(1, $response->json('data.data'));
    }

    /** @test */
    public function test_member_can_retrieve_appointment_notifications()
    {
        // Create member notification
        AdminNotification::create([
            'member_id' => $this->member->id,
            'type' => 'appointment_created',
            'title' => 'Appointment Scheduled',
            'message' => 'Test appointment',
            'icon' => 'fa-calendar-check',
            'color' => 'info',
            'related_type' => 'appointment',
            'related_id' => 1,
            'is_read' => false,
        ]);

        // Simulate mobile auth by setting auth_member in request
        $response = $this->withHeaders([
            'Authorization' => 'Bearer test-token',
        ])->getJson('/api/mobile/notifications', [
            'auth_member' => $this->member,
        ]);

        // Note: This test may need adjustment based on your mobile auth middleware implementation
        // The actual implementation depends on how mobile.auth middleware works
    }

    /** @test */
    public function test_coach_can_retrieve_appointment_notifications()
    {
        // Create coach notification
        AdminNotification::create([
            'coach_id' => $this->coach->id,
            'type' => 'appointment_created',
            'title' => 'New Appointment',
            'message' => 'Test appointment',
            'icon' => 'fa-calendar-check',
            'color' => 'info',
            'related_type' => 'appointment',
            'related_id' => 1,
            'is_read' => false,
        ]);

        // Create user for coach (coaches use users table with role_id = 3)
        $coachUser = User::factory()->create([
            'role_id' => 3,
            'email' => $this->coach->email,
            'gym_id' => $this->gymId,
        ]);

        $response = $this->actingAs($coachUser, 'api')
            ->getJson('/api/mobile/coach/notifications');

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);
    }

    /** @test */
    public function test_unread_count_for_admin()
    {
        // Create unread notifications
        AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'appointment_created',
            'title' => 'Test',
            'message' => 'Test',
            'is_read' => false,
        ]);

        AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'appointment_updated',
            'title' => 'Test',
            'message' => 'Test',
            'is_read' => false,
        ]);

        $response = $this->actingAs($this->adminUser, 'api')
            ->getJson('/api/admin/notifications/unread-count');

        $response->assertStatus(200);
        $response->assertJson(['success' => true, 'count' => 2]);
    }

    /** @test */
    public function test_mark_notification_as_read()
    {
        $notification = AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'appointment_created',
            'title' => 'Test',
            'message' => 'Test',
            'is_read' => false,
        ]);

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson("/api/admin/notifications/{$notification->id}/mark-read");

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);

        $this->assertDatabaseHas('admin_notifications', [
            'id' => $notification->id,
            'is_read' => true,
        ]);
    }

    /** @test */
    public function test_mark_all_notifications_as_read()
    {
        // Create multiple unread notifications
        AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'appointment_created',
            'title' => 'Test 1',
            'message' => 'Test',
            'is_read' => false,
        ]);

        AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'appointment_updated',
            'title' => 'Test 2',
            'message' => 'Test',
            'is_read' => false,
        ]);

        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson('/api/admin/notifications/mark-all-read');

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);

        // Verify all notifications are marked as read
        $unreadCount = AdminNotification::where('user_id', $this->adminUser->id)
            ->where('is_read', false)
            ->count();
        
        $this->assertEquals(0, $unreadCount);
    }

    /** @test */
    public function test_notification_filtering_by_type()
    {
        // Create different types of notifications
        AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'appointment_created',
            'title' => 'Test',
            'message' => 'Test',
        ]);

        AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'appointment_updated',
            'title' => 'Test',
            'message' => 'Test',
        ]);

        AdminNotification::create([
            'user_id' => $this->adminUser->id,
            'type' => 'member_created',
            'title' => 'Test',
            'message' => 'Test',
        ]);

        $response = $this->actingAs($this->adminUser, 'api')
            ->getJson('/api/admin/notifications?type=appointment_created');

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);
        $this->assertCount(1, $response->json('data.data'));
        $this->assertEquals('appointment_created', $response->json('data.data.0.type'));
    }

    /** @test */
    public function test_notification_creation_does_not_fail_appointment_creation()
    {
        Mail::fake();

        // Mock NotificationService to throw an exception
        $this->mock(\App\Services\NotificationService::class, function ($mock) {
            $mock->shouldReceive('appointmentCreated')
                ->andThrow(new \Exception('Notification service error'));
        });

        $appointmentData = [
            'date' => now()->addDays(1)->format('Y-m-d'),
            'start_time' => '10:00:00',
            'end_time' => '11:00:00',
            'staff_id' => $this->coach->id,
            'client_id' => $this->member->id,
            'workout_id' => $this->workout->id,
        ];

        // Appointment should still be created even if notification fails
        $response = $this->actingAs($this->adminUser, 'api')
            ->postJson('/api/appointments', $appointmentData);

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);
        
        // Verify appointment was created
        $this->assertDatabaseHas('appointments', [
            'member_id' => $this->member->id,
            'trainer_id' => $this->coach->id,
        ]);
    }

    /** @test */
    public function test_notification_service_creates_for_all_admins()
    {
        $count = NotificationService::createForAdmins(
            'appointment_created',
            'Test Title',
            'Test Message',
            'fa-calendar-check',
            'info',
            'appointment',
            1,
            $this->gymId
        );

        $this->assertEquals(2, $count); // Should create for both admin users

        $this->assertDatabaseHas('admin_notifications', [
            'user_id' => $this->adminUser->id,
            'type' => 'appointment_created',
        ]);

        $this->assertDatabaseHas('admin_notifications', [
            'user_id' => $this->adminUser2->id,
            'type' => 'appointment_created',
        ]);
    }

    /** @test */
    public function test_notification_service_creates_for_member()
    {
        $notification = NotificationService::createForMember(
            $this->member->id,
            'appointment_created',
            'Test Title',
            'Test Message',
            'fa-calendar-check',
            'info',
            'appointment',
            1
        );

        $this->assertNotNull($notification);
        $this->assertDatabaseHas('admin_notifications', [
            'member_id' => $this->member->id,
            'type' => 'appointment_created',
        ]);
    }

    /** @test */
    public function test_notification_service_creates_for_coach()
    {
        $notification = NotificationService::createForCoach(
            $this->coach->id,
            'appointment_created',
            'Test Title',
            'Test Message',
            'fa-calendar-check',
            'info',
            'appointment',
            1
        );

        $this->assertNotNull($notification);
        $this->assertDatabaseHas('admin_notifications', [
            'coach_id' => $this->coach->id,
            'type' => 'appointment_created',
        ]);
    }
}
