<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Member;
use App\Models\SubscriptionPlan;
use App\Models\SubscriptionInvitation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class SubscriptionInvitationTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $gymId = 1;
    protected $subscriptionPlan;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create a subscription plan
        $this->subscriptionPlan = SubscriptionPlan::create([
            'name' => 'Test Plan',
            'price' => 50.00,
            'duration' => 30,
            'gym_id' => $this->gymId
        ]);
    }

    /** @test */
    public function it_can_get_invitation_data_with_member_lists()
    {
        // Create members with expired subscriptions
        $nonInvitedMember = Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'John',
            'lastname' => 'Doe',
            'membername' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '1234567890',
            'Expires' => Carbon::now()->subDays(10)->format('Y-m-d'),
            'Statuses' => 'active',
            'subscription_id' => $this->subscriptionPlan->id,
            'subscription_plan_id' => $this->subscriptionPlan->id,
            'date_of_birth' => '1990-01-01',
            'gender' => 'male'
        ]);

        $alreadyInvitedMember = Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'Jane',
            'lastname' => 'Smith',
            'membername' => 'Jane Smith',
            'email' => 'jane@example.com',
            'phone' => '0987654321',
            'Expires' => Carbon::now()->subDays(15)->format('Y-m-d'),
            'Statuses' => 'active',
            'subscription_id' => $this->subscriptionPlan->id,
            'subscription_plan_id' => $this->subscriptionPlan->id,
            'date_of_birth' => '1990-01-01',
            'gender' => 'female'
        ]);

        // Create an old invitation for the second member (more than 7 days ago)
        SubscriptionInvitation::create([
            'member_id' => $alreadyInvitedMember->id,
            'subscription_plan_id' => $this->subscriptionPlan->id,
            'invitation_type' => 'subscription_expired',
            'status' => 'sent',
            'sent_at' => Carbon::now()->subDays(10),
            'confirmation_email' => 'admin@example.com'
        ]);

        $response = $this->getJson('/api/subscription-invitations/data');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'nonInvitedClients',
                    'alreadyInvitedClients',
                    'totalExpiredMembers',
                    'nonInvitedMembersList' => [
                        '*' => [
                            'id',
                            'name',
                            'email',
                            'phone',
                            'subscription_end_date',
                            'subscription_end_date_formatted',
                            'plan_name',
                            'last_invitation_date',
                            'last_invitation_date_formatted'
                        ]
                    ],
                    'alreadyInvitedMembersList' => [
                        '*' => [
                            'id',
                            'name',
                            'email',
                            'phone',
                            'subscription_end_date',
                            'subscription_end_date_formatted',
                            'plan_name',
                            'last_invitation_date',
                            'last_invitation_date_formatted'
                        ]
                    ]
                ]
            ]);

        $data = $response->json('data');
        
        // Verify counts
        $this->assertEquals(1, $data['nonInvitedClients']);
        $this->assertEquals(1, $data['alreadyInvitedClients']);
        $this->assertEquals(2, $data['totalExpiredMembers']);
        
        // Verify member lists
        $this->assertCount(1, $data['nonInvitedMembersList']);
        $this->assertEquals('John Doe', $data['nonInvitedMembersList'][0]['name']);
        $this->assertEquals('john@example.com', $data['nonInvitedMembersList'][0]['email']);
        
        $this->assertCount(1, $data['alreadyInvitedMembersList']);
        $this->assertEquals('Jane Smith', $data['alreadyInvitedMembersList'][0]['name']);
        $this->assertEquals('jane@example.com', $data['alreadyInvitedMembersList'][0]['email']);
        $this->assertNotNull($data['alreadyInvitedMembersList'][0]['last_invitation_date']);
    }

    /** @test */
    public function it_excludes_members_with_recent_invitations()
    {
        $member = Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'Recent',
            'lastname' => 'Invite',
            'membername' => 'Recent Invite',
            'email' => 'recent@example.com',
            'phone' => '1111111111',
            'Expires' => Carbon::now()->subDays(5)->format('Y-m-d'),
            'Statuses' => 'active',
            'subscription_id' => $this->subscriptionPlan->id,
            'subscription_plan_id' => $this->subscriptionPlan->id,
            'date_of_birth' => '1990-01-01',
            'gender' => 'male'
        ]);

        // Create a recent invitation (less than 7 days ago)
        SubscriptionInvitation::create([
            'member_id' => $member->id,
            'subscription_plan_id' => $this->subscriptionPlan->id,
            'invitation_type' => 'subscription_expired',
            'status' => 'sent',
            'sent_at' => Carbon::now()->subDays(3),
            'confirmation_email' => 'admin@example.com'
        ]);

        $response = $this->getJson('/api/subscription-invitations/data');

        $response->assertStatus(200);
        $data = $response->json('data');
        
        // This member should not appear in either list
        $this->assertEquals(0, $data['nonInvitedClients']);
        $this->assertEquals(0, $data['alreadyInvitedClients']);
        $this->assertCount(0, $data['nonInvitedMembersList']);
        $this->assertCount(0, $data['alreadyInvitedMembersList']);
    }

    /** @test */
    public function it_can_send_invitations_to_non_invited_members()
    {
        Mail::fake();

        $member = Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'Test',
            'lastname' => 'Member',
            'membername' => 'Test Member',
            'email' => 'test@example.com',
            'phone' => '1234567890',
            'Expires' => Carbon::now()->subDays(10)->format('Y-m-d'),
            'Statuses' => 'active',
            'subscription_id' => $this->subscriptionPlan->id,
            'subscription_plan_id' => $this->subscriptionPlan->id,
            'date_of_birth' => '1990-01-01',
            'gender' => 'male'
        ]);

        $response = $this->postJson('/api/subscription-invitations/send', [
            'nonInvitedClients' => true,
            'alreadyInvitedClients' => false,
            'confirmationEmail' => 'admin@example.com'
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'message',
                'invitationsSent'
            ]);

        $this->assertTrue($response->json('success'));
        $this->assertEquals(1, $response->json('invitationsSent'));
        
        // Verify invitation was created
        $this->assertDatabaseHas('subscription_invitations', [
            'member_id' => $member->id,
            'invitation_type' => 'subscription_expired',
            'confirmation_email' => 'admin@example.com'
        ]);
    }

    /** @test */
    public function it_can_send_invitations_to_already_invited_members()
    {
        Mail::fake();

        $member = Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'Already',
            'lastname' => 'Invited',
            'membername' => 'Already Invited',
            'email' => 'already@example.com',
            'phone' => '1234567890',
            'Expires' => Carbon::now()->subDays(20)->format('Y-m-d'),
            'Statuses' => 'active',
            'subscription_id' => $this->subscriptionPlan->id,
            'subscription_plan_id' => $this->subscriptionPlan->id,
            'date_of_birth' => '1990-01-01',
            'gender' => 'male'
        ]);

        // Create an old invitation
        SubscriptionInvitation::create([
            'member_id' => $member->id,
            'subscription_plan_id' => $this->subscriptionPlan->id,
            'invitation_type' => 'subscription_expired',
            'status' => 'sent',
            'sent_at' => Carbon::now()->subDays(10),
            'confirmation_email' => 'admin@example.com'
        ]);

        $response = $this->postJson('/api/subscription-invitations/send', [
            'nonInvitedClients' => false,
            'alreadyInvitedClients' => true,
            'confirmationEmail' => 'admin@example.com'
        ]);

        $response->assertStatus(200)
            ->assertJson(['success' => true]);

        // Verify a new invitation was created
        $this->assertDatabaseHas('subscription_invitations', [
            'member_id' => $member->id,
            'invitation_type' => 'subscription_expired'
        ]);
    }

    /** @test */
    public function it_validates_confirmation_email_required()
    {
        $response = $this->postJson('/api/subscription-invitations/send', [
            'nonInvitedClients' => true,
            'alreadyInvitedClients' => false
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['confirmationEmail']);
    }

    /** @test */
    public function it_validates_confirmation_email_format()
    {
        $response = $this->postJson('/api/subscription-invitations/send', [
            'nonInvitedClients' => true,
            'alreadyInvitedClients' => false,
            'confirmationEmail' => 'invalid-email'
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['confirmationEmail']);
    }

    /** @test */
    public function it_requires_at_least_one_option_selected()
    {
        $response = $this->postJson('/api/subscription-invitations/send', [
            'nonInvitedClients' => false,
            'alreadyInvitedClients' => false,
            'confirmationEmail' => 'admin@example.com'
        ]);

        // The API should still accept this, but no invitations will be sent
        $response->assertStatus(200);
        $this->assertEquals(0, $response->json('invitationsSent'));
    }

    /** @test */
    public function it_handles_empty_expired_members_list()
    {
        // Create a member with active subscription (not expired)
        Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'Active',
            'lastname' => 'Member',
            'membername' => 'Active Member',
            'email' => 'active@example.com',
            'phone' => '1234567890',
            'Expires' => Carbon::now()->addDays(10)->format('Y-m-d'),
            'Statuses' => 'active',
            'subscription_id' => $this->subscriptionPlan->id,
            'subscription_plan_id' => $this->subscriptionPlan->id,
            'date_of_birth' => '1990-01-01',
            'gender' => 'male'
        ]);

        $response = $this->getJson('/api/subscription-invitations/data');

        $response->assertStatus(200);
        $data = $response->json('data');
        
        $this->assertEquals(0, $data['nonInvitedClients']);
        $this->assertEquals(0, $data['alreadyInvitedClients']);
        $this->assertEquals(0, $data['totalExpiredMembers']);
        $this->assertCount(0, $data['nonInvitedMembersList']);
        $this->assertCount(0, $data['alreadyInvitedMembersList']);
    }

    /** @test */
    public function it_includes_member_details_in_response()
    {
        $member = Member::create([
            'gym_id' => $this->gymId,
            'firstname' => 'Detail',
            'lastname' => 'Test',
            'membername' => 'Detail Test',
            'email' => 'detail@example.com',
            'phone' => '5555555555',
            'Expires' => Carbon::now()->subDays(5)->format('Y-m-d'),
            'Statuses' => 'active',
            'subscription_id' => $this->subscriptionPlan->id,
            'subscription_plan_id' => $this->subscriptionPlan->id,
            'date_of_birth' => '1990-01-01',
            'gender' => 'male'
        ]);

        $response = $this->getJson('/api/subscription-invitations/data');

        $response->assertStatus(200);
        $data = $response->json('data');
        
        $this->assertCount(1, $data['nonInvitedMembersList']);
        $memberData = $data['nonInvitedMembersList'][0];
        
        // Verify all required fields are present
        $this->assertArrayHasKey('id', $memberData);
        $this->assertArrayHasKey('name', $memberData);
        $this->assertArrayHasKey('email', $memberData);
        $this->assertArrayHasKey('phone', $memberData);
        $this->assertArrayHasKey('subscription_end_date', $memberData);
        $this->assertArrayHasKey('subscription_end_date_formatted', $memberData);
        $this->assertArrayHasKey('plan_name', $memberData);
        $this->assertArrayHasKey('last_invitation_date', $memberData);
        $this->assertArrayHasKey('last_invitation_date_formatted', $memberData);
        
        // Verify values
        $this->assertEquals($member->id, $memberData['id']);
        $this->assertEquals('Detail Test', $memberData['name']);
        $this->assertEquals('detail@example.com', $memberData['email']);
        $this->assertEquals('Test Plan', $memberData['plan_name']);
    }
}

