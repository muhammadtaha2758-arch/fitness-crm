<template>
  <div class="main-content">
    <!-- Breadcrumb and Navigation Row -->
    <div class="breadcrumb-nav-row">
      <!-- Breadcrumb Navigation -->
      <div class="breadcrumb-section">
        <nav class="breadcrumb-nav" aria-label="breadcrumb">
          <div class="breadcrumb-container">
            <button 
              @click.stop="goBack" 
              class="back-button"
              type="button"
              title="Go back"
              style="color: #252525;"
            >
              <i class="fas fa-arrow-left"></i>
            </button>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/app/Members/ViewAllMembers">
                  <i class="fas fa-home"></i>
                  Dashboard
                </router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/app/settings">
                  <i class="fas fa-cogs"></i>
                  Settings
                </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                <i class="fas fa-envelope"></i>
                Email Templates
              </li>
            </ol>
          </div>
        </nav>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner">
        <div class="spinner-border spinner-border-lg text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="loading-text">Loading email templates...</p>
      </div>
    </div>

    <div v-else class="email-templates-container">
      <!-- Notification Client Section -->
      <div class="template-section">
        <div class="section-header">
          <div class="section-icon">
            <i class="fas fa-user me-2"></i>
          </div>
          <div class="section-content">
            <h2 class="section-title">Notification_Client</h2>
            <p class="section-description">Configure email templates sent to your fitness clients</p>
          </div>
        </div>

        <div class="template-card">
          <b-tabs 
            active-nav-item-class="custom-tab-nav" 
            content-class="tab-content-custom"
            class="email-tabs"
          >
            <!-- Membership Tab -->
            <b-tab :title="Membership" class="tab-item">
              <template #title>
                <span class="tab-title-content">
                  <i class="fas fa-id-card me-2"></i>
                  Membership
                </span>
              </template>
              
              <form @submit.prevent="update_custom_email('membership')" class="email-form">
                <div class="available-tags-section">
                  <div class="tags-header">
                    <i class="fas fa-tags me-2"></i>
                    <strong>Available_Tags:</strong>
                  </div>
                  <div class="tags-container">
                    <span class="tag-item">{client_name}</span>
                    <span class="tag-item">{gym_name}</span>
                    <span class="tag-item">{membership_type}</span>
                    <span class="tag-item">{start_date}</span>
                    <span class="tag-item">{end_date}</span>
                    <span class="tag-item">{membership_fee}</span>
                    <span class="tag-item">{payment_status}</span>
                  </div>
                </div>

                <div class="form-section">
                  <div class="form-group">
                    <label for="email_subject_membership" class="form-label">
                      <i class="fas fa-edit me-2"></i>
                      Email_Subject
                    </label>
                    <input 
                      type="text" 
                      v-model="membership.subject" 
                      class="form-control custom-input"
                      name="email_subject_membership" 
                      id="email_subject_membership" 
                      :placeholder="Email_Subject"
                    >
                  </div>
                  
                  <div class="form-group">
                    <label for="email_body_membership" class="form-label">
                      <i class="fas fa-file-alt me-2"></i>
                      Email_body
                    </label>
                    <div class="editor-container">
                      <vue-editor 
                        id="editor_membership" 
                        v-model="membership.body" 
                        :editor-toolbar="customToolbar"
                        class="custom-editor"
                      ></vue-editor>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button 
                    type="submit" 
                    :disabled="Submit_Processing" 
                    class="btn btn-primary custom-btn"
                  >
                    <span v-if="Submit_Processing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    <i class="fas fa-check me-2"></i>
                    submit
                  </button>
                  <button 
                    type="button" 
                    @click="reset_single_template('membership')" 
                    class="btn btn-secondary custom-btn ms-2"
                  >
                    <i class="fas fa-undo me-2"></i>
                    Reset to Defaults
                  </button>
                </div>
              </form>
            </b-tab>

            <!-- Class Booking Tab -->
            <b-tab :title="Class_Booking" class="tab-item">
              <template #title>
                <span class="tab-title-content">
                  <i class="fas fa-calendar-alt me-2"></i>
                  Class_Booking
                </span>
              </template>

              <form @submit.prevent="update_custom_email('class_booking')" class="email-form">
                <div class="available-tags-section">
                  <div class="tags-header">
                    <i class="fas fa-tags me-2"></i>
                    <strong>Available_Tags:</strong>
                  </div>
                  <div class="tags-container">
                    <span class="tag-item">{client_name}</span>
                    <span class="tag-item">{gym_name}</span>
                    <span class="tag-item">{class_name}</span>
                    <span class="tag-item">{class_date}</span>
                    <span class="tag-item">{class_time}</span>
                    <span class="tag-item">{trainer_name}</span>
                    <span class="tag-item">{class_location}</span>
                  </div>
                </div>

                <div class="form-section">
                  <div class="form-group">
                    <label for="email_subject_class_booking" class="form-label">
                      <i class="fas fa-edit me-2"></i>
                      Email_Subject
                    </label>
                    <input 
                      type="text" 
                      v-model="class_booking.subject" 
                      class="form-control custom-input"
                      name="email_subject_class_booking" 
                      id="email_subject_class_booking" 
                      :placeholder="Email_Subject"
                    >
                  </div>

                  <div class="form-group">
                    <label for="email_body_class_booking" class="form-label">
                      <i class="fas fa-file-alt me-2"></i>
                      Email_body
                    </label>
                    <div class="editor-container">
                      <vue-editor 
                        id="editor_class_booking" 
                        v-model="class_booking.body" 
                        :editor-toolbar="customToolbar"
                        class="custom-editor"
                      ></vue-editor>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button 
                    type="submit" 
                    :disabled="Submit_Processing" 
                    class="btn btn-primary custom-btn"
                  >
                    <span v-if="Submit_Processing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    <i class="fas fa-check me-2"></i>
                    submit
                  </button>
                  <button 
                    type="button" 
                    @click="reset_single_template('class_booking')" 
                    class="btn btn-secondary custom-btn ms-2"
                  >
                    <i class="fas fa-undo me-2"></i>
                    Reset to Defaults
                  </button>
                </div>
              </form>
            </b-tab>

            <!-- Payment Received Tab -->
            <b-tab :title="PaiementsReceived" class="tab-item">
              <template #title>
                <span class="tab-title-content">
                  <i class="fas fa-money-bill-wave me-2"></i>
                  PaiementsReceived
                </span>
              </template>

              <form @submit.prevent="update_custom_email('payment_received')" class="email-form">
                <div class="available-tags-section">
                  <div class="tags-header">
                    <i class="fas fa-tags me-2"></i>
                    <strong>Available_Tags:</strong>
                  </div>
                  <div class="tags-container">
                    <span class="tag-item">{client_name}</span>
                    <span class="tag-item">{gym_name}</span>
                    <span class="tag-item">{payment_number}</span>
                    <span class="tag-item">{paid_amount}</span>
                    <span class="tag-item">{payment_method}</span>
                    <span class="tag-item">{payment_date}</span>
                  </div>
                </div>

                <div class="form-section">
                  <div class="form-group">
                    <label for="email_subject_payment_received" class="form-label">
                      <i class="fas fa-edit me-2"></i>
                      Email_Subject
                    </label>
                    <input 
                      type="text" 
                      v-model="payment_received.subject" 
                      class="form-control custom-input"
                      name="email_subject_payment_received" 
                      id="email_subject_payment_received" 
                      :placeholder="Email_Subject"
                    >
                  </div>

                  <div class="form-group">
                    <label for="email_body_payment_received" class="form-label">
                      <i class="fas fa-file-alt me-2"></i>
                      Email_body
                    </label>
                    <div class="editor-container">
                      <vue-editor 
                        id="editor_payment_received" 
                        v-model="payment_received.body" 
                        :editor-toolbar="customToolbar"
                        class="custom-editor"
                      ></vue-editor>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button 
                    type="submit" 
                    :disabled="Submit_Processing" 
                    class="btn btn-primary custom-btn"
                  >
                    <span v-if="Submit_Processing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    <i class="fas fa-check me-2"></i>
                    submit
                  </button>
                  <button 
                    type="button" 
                    @click="reset_single_template('payment_received')" 
                    class="btn btn-secondary custom-btn ms-2"
                  >
                    <i class="fas fa-undo me-2"></i>
                    Reset to Defaults
                  </button>
                </div>
              </form>
            </b-tab>

            <!-- Workout Plan Tab -->
            <b-tab :title="Workout_Plan" class="tab-item">
              <template #title>
                <span class="tab-title-content">
                  <i class="fas fa-dumbbell me-2"></i>
                  Workout_Plan
                </span>
              </template>

              <form @submit.prevent="update_custom_email('workout_plan')" class="email-form">
                <div class="available-tags-section">
                  <div class="tags-header">
                    <i class="fas fa-tags me-2"></i>
                    <strong>Available_Tags:</strong>
                  </div>
                  <div class="tags-container">
                    <span class="tag-item">{client_name}</span>
                    <span class="tag-item">{gym_name}</span>
                    <span class="tag-item">{trainer_name}</span>
                    <span class="tag-item">{plan_name}</span>
                    <span class="tag-item">{plan_duration}</span>
                    <span class="tag-item">{next_session_date}</span>
                    <span class="tag-item">{plan_url}</span>
                  </div>
                </div>

                <div class="form-section">
                  <div class="form-group">
                    <label for="email_subject_workout_plan" class="form-label">
                      <i class="fas fa-edit me-2"></i>
                      Email_Subject
                    </label>
                    <input 
                      type="text" 
                      v-model="workout_plan.subject" 
                      class="form-control custom-input"
                      name="email_subject_workout_plan" 
                      id="email_subject_workout_plan" 
                      :placeholder="Email_Subject"
                    >
                  </div>

                  <div class="form-group">
                    <label for="email_body_workout_plan" class="form-label">
                      <i class="fas fa-file-alt me-2"></i>
                      Email_body
                    </label>
                    <div class="editor-container">
                      <vue-editor 
                        id="editor_workout_plan" 
                        v-model="workout_plan.body" 
                        :editor-toolbar="customToolbar"
                        class="custom-editor"
                      ></vue-editor>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button 
                    type="submit" 
                    :disabled="Submit_Processing" 
                    class="btn btn-primary custom-btn"
                  >
                    <span v-if="Submit_Processing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    <i class="fas fa-check me-2"></i>
                    submit
                  </button>
                  <button 
                    type="button" 
                    @click="reset_single_template('workout_plan')" 
                    class="btn btn-secondary custom-btn ms-2"
                  >
                    <i class="fas fa-undo me-2"></i>
                    Reset to Defaults
                  </button>
                </div>
              </form>
            </b-tab>

            <!-- Password Setup Tab -->
            <b-tab :title="Password_Setup" class="tab-item">
              <template #title>
                <span class="tab-title-content">
                  <i class="fas fa-key me-2"></i>
                  Password_Setup
                </span>
              </template>

              <form @submit.prevent="update_custom_email('password_setup')" class="email-form">
                <div class="available-tags-section">
                  <div class="tags-header">
                    <i class="fas fa-tags me-2"></i>
                    <strong>Available_Tags:</strong>
                  </div>
                  <div class="tags-container">
                    <span class="tag-item">{client_name}</span>
                    <span class="tag-item">{gym_name}</span>
                    <span class="tag-item">{setup_url}</span>
                    <span class="tag-item">{setup_token}</span>
                    <span class="tag-item">{expiration_days}</span>
                  </div>
                </div>

                <div class="form-section">
                  <div class="form-group">
                    <label for="email_subject_password_setup" class="form-label">
                      <i class="fas fa-edit me-2"></i>
                      Email_Subject
                    </label>
                    <input 
                      type="text" 
                      v-model="password_setup.subject" 
                      class="form-control custom-input"
                      name="email_subject_password_setup" 
                      id="email_subject_password_setup" 
                      :placeholder="Email_Subject"
                    >
                  </div>

                  <div class="form-group">
                    <label for="email_body_password_setup" class="form-label">
                      <i class="fas fa-file-alt me-2"></i>
                      Email_body
                    </label>
                    <div class="editor-container">
                      <vue-editor 
                        id="editor_password_setup" 
                        v-model="password_setup.body" 
                        :editor-toolbar="customToolbar"
                        class="custom-editor"
                      ></vue-editor>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button 
                    type="submit" 
                    :disabled="Submit_Processing" 
                    class="btn btn-primary custom-btn"
                  >
                    <span v-if="Submit_Processing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    <i class="fas fa-check me-2"></i>
                    submit
                  </button>
                  <button 
                    type="button" 
                    @click="reset_single_template('password_setup')" 
                    class="btn btn-secondary custom-btn ms-2"
                  >
                    <i class="fas fa-undo me-2"></i>
                    Reset to Defaults
                  </button>
                </div>
              </form>
            </b-tab>
          </b-tabs>
        </div>
      </div>

      <!-- Notification Staff Section -->
      <div class="template-section">
        <div class="section-header">
          <div class="section-icon">
            <i class="fas fa-users me-2"></i>
          </div>
          <div class="section-content">
            <h2 class="section-title">Notification Staff</h2>
            <p class="section-description">Configure email templates sent to your fitness staff and trainers</p>
          </div>
        </div>

        <div class="template-card">
          <b-tabs 
            active-nav-item-class="custom-tab-nav" 
            content-class="tab-content-custom"
            class="email-tabs"
          >
            <!-- Staff Schedule Tab -->
            <b-tab :title="Staff_Schedule" class="tab-item">
              <template #title>
                <span class="tab-title-content">
                  <i class="fas fa-calendar-check me-2"></i>
                  Staff_Schedule
                </span>
              </template>

              <form @submit.prevent="update_custom_email('staff_schedule')" class="email-form">
                <div class="available-tags-section">
                  <div class="tags-header">
                    <i class="fas fa-tags me-2"></i>
                    <strong>Available_Tags:</strong>
                  </div>
                  <div class="tags-container">
                    <span class="tag-item">{staff_name}</span>
                    <span class="tag-item">{gym_name}</span>
                    <span class="tag-item">{schedule_date}</span>
                    <span class="tag-item">{shift_time}</span>
                    <span class="tag-item">{assigned_classes}</span>
                    <span class="tag-item">{location}</span>
                  </div>
                </div>

                <div class="form-section">
                  <div class="form-group">
                    <label for="email_subject_staff_schedule" class="form-label">
                      <i class="fas fa-edit me-2"></i>
                      Email_Subject
                    </label>
                    <input 
                      type="text" 
                      v-model="staff_schedule.subject" 
                      class="form-control custom-input"
                      name="email_subject_staff_schedule" 
                      id="email_subject_staff_schedule" 
                      :placeholder="Email_Subject"
                    >
                  </div>

                  <div class="form-group">
                    <label for="email_body_staff_schedule" class="form-label">
                      <i class="fas fa-file-alt me-2"></i>
                      Email_body
                    </label>
                    <div class="editor-container">
                      <vue-editor 
                        id="editor_staff_schedule" 
                        v-model="staff_schedule.body" 
                        :editor-toolbar="customToolbar"
                        class="custom-editor"
                      ></vue-editor>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button 
                    type="submit" 
                    :disabled="Submit_Processing" 
                    class="btn btn-primary custom-btn"
                  >
                    <span v-if="Submit_Processing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    <i class="fas fa-check me-2"></i>
                    submit
                  </button>
                  <button 
                    type="button" 
                    @click="reset_single_template('staff_schedule')" 
                    class="btn btn-secondary custom-btn ms-2"
                  >
                    <i class="fas fa-undo me-2"></i>
                    Reset to Defaults
                  </button>
                </div>
              </form>
            </b-tab>

            <!-- Payment Sent Tab -->
            <b-tab :title="PaiementsSent" class="tab-item">
              <template #title>
                <span class="tab-title-content">
                  <i class="fas fa-money-bill-wave me-2"></i>
                  PaiementsSent
                </span>
              </template>

              <form @submit.prevent="update_custom_email('payment_sent')" class="email-form">
                <div class="available-tags-section">
                  <div class="tags-header">
                    <i class="fas fa-tags me-2"></i>
                    <strong>Available_Tags:</strong>
                  </div>
                  <div class="tags-container">
                    <span class="tag-item">{staff_name}</span>
                    <span class="tag-item">{gym_name}</span>
                    <span class="tag-item">{payment_number}</span>
                    <span class="tag-item">{paid_amount}</span>
                    <span class="tag-item">{payment_method}</span>
                    <span class="tag-item">{payment_date}</span>
                  </div>
                </div>

                <div class="form-section">
                  <div class="form-group">
                    <label for="email_subject_payment_sent" class="form-label">
                      <i class="fas fa-edit me-2"></i>
                      Email_Subject
                    </label>
                    <input 
                      type="text" 
                      v-model="payment_sent.subject" 
                      class="form-control custom-input"
                      name="email_subject_payment_sent" 
                      id="email_subject_payment_sent" 
                      :placeholder="Email_Subject"
                    >
                  </div>

                  <div class="form-group">
                    <label for="email_body_payment_sent" class="form-label">
                      <i class="fas fa-file-alt me-2"></i>
                      Email_body
                    </label>
                    <div class="editor-container">
                      <vue-editor 
                        id="editor_payment_sent" 
                        v-model="payment_sent.body" 
                        :editor-toolbar="customToolbar"
                        class="custom-editor"
                      ></vue-editor>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button 
                    type="submit" 
                    :disabled="Submit_Processing" 
                    class="btn btn-primary custom-btn"
                  >
                    <span v-if="Submit_Processing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    <i class="fas fa-check me-2"></i>
                    submit
                  </button>
                  <button 
                    type="button" 
                    @click="reset_single_template('payment_sent')" 
                    class="btn btn-secondary custom-btn ms-2"
                  >
                    <i class="fas fa-undo me-2"></i>
                    Reset to Defaults
                  </button>
                </div>
              </form>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NProgress from "nprogress";
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor,
  },
  metaInfo: {
    title: "Fitness Email Templates"
  },
 
  data() {
    return {
      isLoading: true,
      Submit_Processing: false,
      membership: {
        subject: 'Welcome to {gym_name} - Your Membership Confirmation',
        body: `<h2>Welcome to {gym_name}!</h2>
<p>Dear {client_name},</p>
<p>Thank you for joining {gym_name}! We're excited to have you as part of our fitness community.</p>

<h3>Membership Details:</h3>
<ul>
<li><strong>Membership Type:</strong> {membership_type}</li>
<li><strong>Start Date:</strong> {start_date}</li>
<li><strong>End Date:</strong> {end_date}</li>
<li><strong>Membership Fee:</strong> {membership_fee}</li>
<li><strong>Payment Status:</strong> {payment_status}</li>
</ul>

<p>We look forward to helping you achieve your fitness goals!</p>

<p>Best regards,<br>
The {gym_name} Team</p>`,
      },
      class_booking: {
        subject: 'Class Booking Confirmation - {class_name}',
        body: `<h2>Class Booking Confirmed!</h2>
<p>Dear {client_name},</p>
<p>Your class booking has been successfully confirmed. We can't wait to see you!</p>

<h3>Class Details:</h3>
<ul>
<li><strong>Class:</strong> {class_name}</li>
<li><strong>Date:</strong> {class_date}</li>
<li><strong>Time:</strong> {class_time}</li>
<li><strong>Trainer:</strong> {trainer_name}</li>
<li><strong>Location:</strong> {class_location}</li>
</ul>

<p><strong>Important Reminders:</strong></p>
<ul>
<li>Please arrive 10 minutes before class starts</li>
<li>Bring water and appropriate workout attire</li>
<li>Don't forget your gym membership card</li>
</ul>

<p>See you there!</p>

<p>Best regards,<br>
The {gym_name} Team</p>`,
      },
      payment_received: {
        subject: 'Payment Received - {gym_name}',
        body: `<h2>Payment Confirmation</h2>
<p>Dear {client_name},</p>
<p>Thank you! We have successfully received your payment.</p>

<h3>Payment Details:</h3>
<ul>
<li><strong>Payment Number:</strong> {payment_number}</li>
<li><strong>Amount Paid:</strong> {paid_amount}</li>
<li><strong>Payment Method:</strong> {payment_method}</li>
<li><strong>Payment Date:</strong> {payment_date}</li>
</ul>

<p>Your payment has been processed and your account is up to date. Thank you for your continued membership with {gym_name}.</p>

<p>If you have any questions about this payment, please don't hesitate to contact us.</p>

<p>Best regards,<br>
The {gym_name} Team</p>`,
      },
      workout_plan: {
        subject: 'Your Personalized Workout Plan - {gym_name}',
        body: `<h2>Your Workout Plan is Ready!</h2>
<p>Dear {client_name},</p>
<p>Great news! Your personalized workout plan has been created by {trainer_name} and is ready for you.</p>

<h3>Plan Details:</h3>
<ul>
<li><strong>Plan Name:</strong> {plan_name}</li>
<li><strong>Duration:</strong> {plan_duration}</li>
<li><strong>Next Session:</strong> {next_session_date}</li>
<li><strong>Trainer:</strong> {trainer_name}</li>
</ul>

<p>Your workout plan has been designed specifically for your fitness goals and current level. You can access your complete plan details at: {plan_url}</p>

<p><strong>What to expect:</strong></p>
<ul>
<li>Progressive workouts that build strength and endurance</li>
<li>Proper form guidance and modifications</li>
<li>Regular progress tracking and adjustments</li>
</ul>

<p>Ready to get started? Your trainer will guide you through each session to ensure you're performing exercises correctly and safely.</p>

<p>Best regards,<br>
{trainer_name} and the {gym_name} Team</p>`,
      },
      staff_schedule: {
        subject: 'Your Schedule Update - {gym_name}',
        body: `<h2>Schedule Update</h2>
<p>Dear {staff_name},</p>
<p>Your work schedule has been updated. Please review the details below.</p>

<h3>Schedule Details:</h3>
<ul>
<li><strong>Date:</strong> {schedule_date}</li>
<li><strong>Shift Time:</strong> {shift_time}</li>
<li><strong>Assigned Classes:</strong> {assigned_classes}</li>
<li><strong>Location:</strong> {location}</li>
</ul>

<p>Please ensure you arrive 15 minutes before your shift to prepare for your classes and check in with the front desk.</p>

<p>If you have any questions about your schedule or need to make changes, please contact the management team as soon as possible.</p>

<p>Thank you for your dedication to our members!</p>

<p>Best regards,<br>
The {gym_name} Management Team</p>`,
      },
      payment_sent: {
        subject: 'Payment Sent - {gym_name}',
        body: `<h2>Payment Confirmation</h2>
<p>Dear {staff_name},</p>
<p>Your payment has been processed and sent successfully.</p>

<h3>Payment Details:</h3>
<ul>
<li><strong>Payment Number:</strong> {payment_number}</li>
<li><strong>Amount Paid:</strong> {paid_amount}</li>
<li><strong>Payment Method:</strong> {payment_method}</li>
<li><strong>Payment Date:</strong> {payment_date}</li>
</ul>

<p>Your payment will be available according to your bank's processing time. You can view your payment history in your staff portal.</p>

<p>If you have any questions about this payment, please contact the HR department.</p>

<p>Thank you for your hard work and dedication to {gym_name}!</p>

<p>Best regards,<br>
The {gym_name} HR Team</p>`,
      },
      password_setup: {
        subject: 'Welcome! Set Up Your Gym App Password',
        body: `<h2>Welcome to {gym_name}!</h2>
<p>Hello {client_name},</p>
<p>Your account has been successfully created! To access the mobile app and start your fitness journey, you need to set up your password.</p>

<div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center;">
  <p style="margin: 0 0 15px 0;"><strong>Click the button below to set your password:</strong></p>
  <a href="{setup_url}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Set Up Your Password</a>
</div>

<p>Or copy and paste this link into your browser:</p>
<p style="word-break: break-all; color: #007bff;">{setup_url}</p>

<div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
  <p style="margin: 0; color: #856404;"><strong>Important:</strong> This link will expire in <strong>{expiration_days} days</strong>. Please set up your password as soon as possible to ensure uninterrupted access to your account.</p>
</div>

<p>If you didn't expect this email or have any questions, please contact our support team.</p>

<p>Best regards,<br>
<strong>The {gym_name} Team</strong></p>`,
      },

      custom_email_body: '',
      custom_email_subject: '',
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        [{ header: [1, 2, 3, false] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
      ],
    };
  },

  methods: {
    ...mapActions(["refreshUserPermissions"]),

    goBack() {
      // Check if there's a previous page in history
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        // Default fallback to members page
        this.$router.push({ name: 'ViewAllMembers' });
      }
    },

    //------ Toast
    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },

    //---------------------------------- reset_to_defaults ----------------
    reset_to_defaults() {
      this.membership = {
        subject: 'Welcome to {gym_name} - Your Membership Confirmation',
        body: `<h2>Welcome to {gym_name}!</h2>
<p>Dear {client_name},</p>
<p>Thank you for joining {gym_name}! We're excited to have you as part of our fitness community.</p>

<h3>Membership Details:</h3>
<ul>
<li><strong>Membership Type:</strong> {membership_type}</li>
<li><strong>Start Date:</strong> {start_date}</li>
<li><strong>End Date:</strong> {end_date}</li>
<li><strong>Membership Fee:</strong> {membership_fee}</li>
<li><strong>Payment Status:</strong> {payment_status}</li>
</ul>

<p>We look forward to helping you achieve your fitness goals!</p>

<p>Best regards,<br>
The {gym_name} Team</p>`,
      };
      
      this.class_booking = {
        subject: 'Class Booking Confirmation - {class_name}',
        body: `<h2>Class Booking Confirmed!</h2>
<p>Dear {client_name},</p>
<p>Your class booking has been successfully confirmed. We can't wait to see you!</p>

<h3>Class Details:</h3>
<ul>
<li><strong>Class:</strong> {class_name}</li>
<li><strong>Date:</strong> {class_date}</li>
<li><strong>Time:</strong> {class_time}</li>
<li><strong>Trainer:</strong> {trainer_name}</li>
<li><strong>Location:</strong> {class_location}</li>
</ul>

<p><strong>Important Reminders:</strong></p>
<ul>
<li>Please arrive 10 minutes before class starts</li>
<li>Bring water and appropriate workout attire</li>
<li>Don't forget your gym membership card</li>
</ul>

<p>See you there!</p>

<p>Best regards,<br>
The {gym_name} Team</p>`,
      };
      
      this.payment_received = {
        subject: 'Payment Received - {gym_name}',
        body: `<h2>Payment Confirmation</h2>
<p>Dear {client_name},</p>
<p>Thank you! We have successfully received your payment.</p>

<h3>Payment Details:</h3>
<ul>
<li><strong>Payment Number:</strong> {payment_number}</li>
<li><strong>Amount Paid:</strong> {paid_amount}</li>
<li><strong>Payment Method:</strong> {payment_method}</li>
<li><strong>Payment Date:</strong> {payment_date}</li>
</ul>

<p>Your payment has been processed and your account is up to date. Thank you for your continued membership with {gym_name}.</p>

<p>If you have any questions about this payment, please don't hesitate to contact us.</p>

<p>Best regards,<br>
The {gym_name} Team</p>`,
      };
      
      this.workout_plan = {
        subject: 'Your Personalized Workout Plan - {gym_name}',
        body: `<h2>Your Workout Plan is Ready!</h2>
<p>Dear {client_name},</p>
<p>Great news! Your personalized workout plan has been created by {trainer_name} and is ready for you.</p>

<h3>Plan Details:</h3>
<ul>
<li><strong>Plan Name:</strong> {plan_name}</li>
<li><strong>Duration:</strong> {plan_duration}</li>
<li><strong>Next Session:</strong> {next_session_date}</li>
<li><strong>Trainer:</strong> {trainer_name}</li>
</ul>

<p>Your workout plan has been designed specifically for your fitness goals and current level. You can access your complete plan details at: {plan_url}</p>

<p><strong>What to expect:</strong></p>
<ul>
<li>Progressive workouts that build strength and endurance</li>
<li>Proper form guidance and modifications</li>
<li>Regular progress tracking and adjustments</li>
</ul>

<p>Ready to get started? Your trainer will guide you through each session to ensure you're performing exercises correctly and safely.</p>

<p>Best regards,<br>
{trainer_name} and the {gym_name} Team</p>`,
      };
      
      this.staff_schedule = {
        subject: 'Your Schedule Update - {gym_name}',
        body: `<h2>Schedule Update</h2>
<p>Dear {staff_name},</p>
<p>Your work schedule has been updated. Please review the details below.</p>

<h3>Schedule Details:</h3>
<ul>
<li><strong>Date:</strong> {schedule_date}</li>
<li><strong>Shift Time:</strong> {shift_time}</li>
<li><strong>Assigned Classes:</strong> {assigned_classes}</li>
<li><strong>Location:</strong> {location}</li>
</ul>

<p>Please ensure you arrive 15 minutes before your shift to prepare for your classes and check in with the front desk.</p>

<p>If you have any questions about your schedule or need to make changes, please contact the management team as soon as possible.</p>

<p>Thank you for your dedication to our members!</p>

<p>Best regards,<br>
The {gym_name} Management Team</p>`,
      };
      
      this.payment_sent = {
        subject: 'Payment Sent - {gym_name}',
        body: `<h2>Payment Confirmation</h2>
<p>Dear {staff_name},</p>
<p>Your payment has been processed and sent successfully.</p>

<h3>Payment Details:</h3>
<ul>
<li><strong>Payment Number:</strong> {payment_number}</li>
<li><strong>Amount Paid:</strong> {paid_amount}</li>
<li><strong>Payment Method:</strong> {payment_method}</li>
<li><strong>Payment Date:</strong> {payment_date}</li>
</ul>

<p>Your payment will be available according to your bank's processing time. You can view your payment history in your staff portal.</p>

<p>If you have any questions about this payment, please contact the HR department.</p>

<p>Thank you for your hard work and dedication to {gym_name}!</p>

<p>Best regards,<br>
The {gym_name} HR Team</p>`,
      };
      
      this.password_setup = {
        subject: 'Welcome! Set Up Your Gym App Password',
        body: `<h2>Welcome to {gym_name}!</h2>
<p>Hello {client_name},</p>
<p>Your account has been successfully created! To access the mobile app and start your fitness journey, you need to set up your password.</p>

<div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center;">
  <p style="margin: 0 0 15px 0;"><strong>Click the button below to set your password:</strong></p>
  <a href="{setup_url}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Set Up Your Password</a>
</div>

<p>Or copy and paste this link into your browser:</p>
<p style="word-break: break-all; color: #007bff;">{setup_url}</p>

<div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
  <p style="margin: 0; color: #856404;"><strong>Important:</strong> This link will expire in <strong>{expiration_days} days</strong>. Please set up your password as soon as possible to ensure uninterrupted access to your account.</p>
</div>

<p>If you didn't expect this email or have any questions, please contact our support team.</p>

<p>Best regards,<br>
<strong>The {gym_name} Team</strong></p>`,
      };
    },

    //---------------------------------- reset_single_template ----------------
    reset_single_template(email_type) {
      axios.post("/reset_email_template", {
        email_type: email_type
      })
      .then(response => {
        if (response.data.success) {
          // Update the local template with the reset data
          const template = response.data.data;
          if (email_type === 'membership') {
            this.membership = template;
          } else if (email_type === 'class_booking') {
            this.class_booking = template;
          } else if (email_type === 'payment_received') {
            this.payment_received = template;
          } else if (email_type === 'workout_plan') {
            this.workout_plan = template;
          } else if (email_type === 'staff_schedule') {
            this.staff_schedule = template;
          } else if (email_type === 'payment_sent') {
            this.payment_sent = template;
          } else if (email_type === 'password_setup') {
            this.password_setup = template;
          }
          
          this.makeToast(
            "success",
            "Template reset to defaults successfully",
            "Success"
          );
        }
      })
      .catch(error => {
        this.makeToast("danger", "Error resetting template", "Failed");
      });
    },

    //---------------------------------- update_custom_email ----------------
    update_custom_email(email_type) {
      this.Submit_Processing = true;
      NProgress.start();
      NProgress.set(0.1);

      if(email_type == 'membership'){
        this.custom_email_body = this.membership.body;
        this.custom_email_subject = this.membership.subject;
      }else if(email_type == 'class_booking'){
        this.custom_email_body = this.class_booking.body;
        this.custom_email_subject = this.class_booking.subject;
      }else if(email_type == 'payment_received'){
        this.custom_email_body = this.payment_received.body;
        this.custom_email_subject = this.payment_received.subject;
      }else if(email_type == 'workout_plan'){
        this.custom_email_body = this.workout_plan.body;
        this.custom_email_subject = this.workout_plan.subject;
      }else if(email_type == 'staff_schedule'){
        this.custom_email_body = this.staff_schedule.body;
        this.custom_email_subject = this.staff_schedule.subject;
      }else if(email_type == 'payment_sent'){
        this.custom_email_body = this.payment_sent.body;
        this.custom_email_subject = this.payment_sent.subject;
      }else if(email_type == 'password_setup'){
        this.custom_email_body = this.password_setup.body;
        this.custom_email_subject = this.password_setup.subject;
      }
      
      axios.put("/update_custom_email", {
        custom_email_body: this.custom_email_body,
        custom_email_subject: this.custom_email_subject,
        email_type: email_type
      }, {
        headers: {
          'Content-Type': 'text/html'
        }
      })
      .then(response => {
        Fire.$emit("Event_email");
        this.makeToast(
          "success",
          this.Successfully_Updated,
          this.Success
        );
        NProgress.done();
        this.Submit_Processing = false;
      })
      .catch(error => {
        NProgress.done();
        this.makeToast("danger", this.InvalidData, this.Failed);
        this.Submit_Processing = false;
      });
    },

    //---------------------------------- get_emails_template ----------------
    get_emails_template() {
      axios
        .get("get_emails_template")
        .then(response => {
          // Only update if API returns actual data, otherwise keep defaults
          if (response.data.membership && response.data.membership.subject && response.data.membership.body) {
            this.membership = response.data.membership;
          }
          if (response.data.class_booking && response.data.class_booking.subject && response.data.class_booking.body) {
            this.class_booking = response.data.class_booking;
          }
          if (response.data.payment_received && response.data.payment_received.subject && response.data.payment_received.body) {
            this.payment_received = response.data.payment_received;
          }
          if (response.data.workout_plan && response.data.workout_plan.subject && response.data.workout_plan.body) {
            this.workout_plan = response.data.workout_plan;
          }
          if (response.data.staff_schedule && response.data.staff_schedule.subject && response.data.staff_schedule.body) {
            this.staff_schedule = response.data.staff_schedule;
          }
          if (response.data.payment_sent && response.data.payment_sent.subject && response.data.payment_sent.body) {
            this.payment_sent = response.data.payment_sent;
          }
          if (response.data.password_setup && response.data.password_setup.subject && response.data.password_setup.body) {
            this.password_setup = response.data.password_setup;
          }

          this.isLoading = false;
        })
        .catch(error => {
          // Keep default templates on error
          console.log('Using default email templates');
          this.isLoading = false;
        });
    },   
  }, //end Methods

  //----------------------------- Created function-------------------
  created: function() {
    // Load default templates first
    this.reset_to_defaults();
    
    // Then try to load from API
    this.get_emails_template();

    Fire.$on("Event_email", () => {
      this.get_emails_template();
    });
  },

  //----------------------------- Mounted function-------------------
  mounted: function() {
    // Ensure templates are loaded after component is mounted
    if (!this.membership.body || !this.class_booking.body) {
      this.reset_to_defaults();
    }
  }
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

// Main Container
.email-templates-container {
  max-width: 1600px;
  margin: 0 auto;
}

// Loading State
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  
  .loading-spinner {
    text-align: center;
    
    .loading-text {
      margin-top: $margin-md;
      color: $color-muted;
      font-size: $font-size-md;
    }
  }
}

// Page Header Section
.page-header-section {
  background: linear-gradient(135deg, $color-background 0%, color.adjust($color-background, $lightness: 5%) 100%);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid $color-border-muted;

  .header-content {
    .header-left {
      .page-title {
        color: $color-heading;
        font-size: $font-size-xxl;
        font-weight: $font-weight-bold;
        margin: 0 0 $margin-sm 0;
        display: flex;
        align-items: center;
        
        i {
          color: $color-button;
          font-size: $font-size-xl;
        }
      }
      
      .page-subtitle {
        color: $color-muted;
        font-size: $font-size-md;
        margin: 0;
        line-height: $line-height-lg;
      }
    }
  }
}

// Template Section
.template-section {
  margin-bottom: 20px;
  
  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: $margin-lg;
    padding: $padding-md;
    background: $color-white;
    border-radius: $border-radius-md;
    box-shadow: $box-shadow-sm;
    border-left: $border-width-md $border-style-solid $color-button;
    
    .section-icon {
      background: $color-button;
      color: $color-white;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: $margin-md;
      font-size: $font-size-lg;
    }
    
    .section-content {
      .section-title {
        color: $color-heading;
        font-size: $font-size-xl;
        font-weight: $font-weight-semibold;
        margin: 0 0 $margin-xs 0;
      }
      
      .section-description {
        color: $color-muted;
        font-size: $font-size-sm;
        margin: 0;
        line-height: $line-height-base;
      }
    }
  }
}

// Template Card
.template-card {
  background: $color-white;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-md;
  border: $border-width-sm $border-style-solid $color-border-muted;
  overflow: hidden;
}

// Custom Tabs
.email-tabs {
  gap: 10px;
  .nav-tabs {
    background: linear-gradient(135deg, $color-background 0%, color.adjust($color-background, $lightness: 3%) 100%);
    border-bottom: $border-width-sm $border-style-solid $color-border-muted;
    padding: 0;
    
    .nav-item {
      .nav-link {
        border: none;
        background: transparent;
        color: $color-muted;
        font-weight: $font-weight-medium;
        padding: $padding-md $padding-lg;
        border-radius: 0;
        transition: all 0.3s ease;
        position: relative;
        
        &:hover {
          color: $color-button;
          background: rgba($color-button, 0.05);
        }
        
        &.active {
          color: $color-button;
          background: $color-white;
          border-bottom: $border-width-md $border-style-solid $color-button;
          
          &::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            right: 0;
            height: $border-width-md;
            background: $color-button;
          }
        }
      }
    }
  }
  
  .tab-title-content {
    display: flex;
    align-items: center;
    font-size: $font-size-sm;
    gap: 10px;
    
    i {
      font-size: $font-size-md;
    }
  }
}

// Tab Content
.tab-content-custom {
  padding: $padding-xl;
}

// Email Form
.email-form {
  .available-tags-section {
    border: $border-width-sm $border-style-solid color.adjust($color-button, $lightness: 30%);
    border-radius: $border-radius-md;
    padding: $padding-md;
    margin-bottom: $margin-lg;
    
    .tags-header {
      color: $color-button;
      font-size: $font-size-sm;
      margin-bottom: $margin-sm;
      display: flex;
      align-items: center;
      gap: 10px;
      
      i {
        font-size: $font-size-md;
      }
    }
    
    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: $margin-xs;
      
      .tag-item {
        background: $color-white;
        color: $color-button;
        padding: $padding-xs $padding-sm;
        border-radius: $border-radius-sm;
        font-size: $font-size-xs;
        font-family: 'Courier New', monospace;
        border: $border-width-sm $border-style-solid color.adjust($color-button, $lightness: 20%);
        transition: all 0.2s ease;
        
        &:hover {
          background: $color-button;
          color: $color-white;
          transform: translateY(-1px);
          box-shadow: $box-shadow-sm;
        }
      }
    }
  }
  
  .form-section {
    .form-group {
      margin-bottom: $margin-lg;
      
      .form-label {
        color: $color-heading;
        font-weight: $font-weight-semibold;
        font-size: $font-size-sm;
        margin-bottom: $margin-sm;
        display: flex;
        align-items: center;
        gap: 10px;
        
        i {
          color: $color-button;
          font-size: $font-size-md;
        }
      }
      
      .custom-input {
        border: $border-width-sm $border-style-solid $color-border;
        border-radius: $border-radius-md;
        padding: $padding-md;
        font-size: $font-size-sm;
        transition: all 0.3s ease;
        
        &:focus {
          border-color: $color-button;
          box-shadow: 0 0 0 0.2rem rgba($color-button, 0.15);
          outline: none;
        }
        
        &::placeholder {
          color: $color-muted;
        }
      }
      
      .editor-container {
        border: $border-width-sm $border-style-solid $color-border;
        border-radius: $border-radius-md;
        overflow: hidden;
        
        .custom-editor {
          .ql-toolbar {
            background: $color-background;
            border-bottom: $border-width-sm $border-style-solid $color-border-muted;
          }
          
          .ql-container {
            min-height: 200px;
            font-size: $font-size-sm;
          }
        }
      }
    }
  }
  
  .form-actions {
    padding-top: $padding-md;
    border-top: $border-width-sm $border-style-solid $color-border-muted;
    
    .custom-btn {
      background: $color-button;
      border: none;
      border-radius: $border-radius-md;
      padding: 10px 20px;
      font-weight: $font-weight-semibold;
      font-size: $font-size-sm;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      
      &:hover:not(:disabled) {
        background: $color-button-hover;
        transform: translateY(-1px);
        box-shadow: $box-shadow-md;
      }
      
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
      
      i {
        font-size: $font-size-md;
      }
    }
  }
}

// Responsive Design
@media (max-width: $breakpoint-lg) {
  .email-templates-container {
    padding: $padding-sm;
  }
  
  .page-header-section {
    padding: $padding-md;
    
    .header-content .header-left .page-title {
      font-size: $font-size-xl;
    }
  }
  
  .template-section .section-header {
    flex-direction: column;
    text-align: center;
    
    .section-icon {
      margin: 0 0 $margin-sm 0;
    }
  }
  
  .tab-content-custom {
    padding: $padding-md;
  }
  
  .email-form .available-tags-section .tags-container {
    justify-content: center;
  }
}

@media (max-width: $breakpoint-md) {
  .email-tabs .nav-tabs .nav-item .nav-link {
    padding: $padding-sm $padding-md;
    font-size: $font-size-xs;
  }
  
  .tab-title-content {
    font-size: $font-size-xs;
    
    i {
      font-size: $font-size-sm;
    }
  }
  
  .email-form .form-actions .custom-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: $breakpoint-sm) {
  .page-header-section {
    .header-content .header-left .page-title {
      font-size: $font-size-lg;
      flex-direction: column;
      text-align: center;
      
      i {
        margin: 0 0 $margin-xs 0;
      }
    }
  }
  
  .template-section .section-header {
    padding: $padding-sm;
    
    .section-icon {
      width: 40px;
      height: 40px;
      font-size: $font-size-md;
    }
    
    .section-content .section-title {
      font-size: $font-size-lg;
    }
  }
}
</style>