<?php

namespace App\Http\Controllers;

use App\Models\EmailTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class EmailTemplateController extends Controller
{
    /**
     * Get email templates for the current gym
     */
    public function getEmailTemplates(Request $request)
    {
        try {
            $gymId = $this->getCurrentGymId();
            
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gym ID not found'
                ], 400);
            }

            $templates = EmailTemplate::getAllForGym($gymId);

            // Return templates organized by type
            $response = [
                'membership' => $templates->get('membership') ?? null,
                'class_booking' => $templates->get('class_booking') ?? null,
                'payment_received' => $templates->get('payment_received') ?? null,
                'workout_plan' => $templates->get('workout_plan') ?? null,
                'staff_schedule' => $templates->get('staff_schedule') ?? null,
                'payment_sent' => $templates->get('payment_sent') ?? null,
                'appointment_created' => $templates->get('appointment_created') ?? null,
                'appointment_updated' => $templates->get('appointment_updated') ?? null,
                'appointment_cancelled' => $templates->get('appointment_cancelled') ?? null,
                'schedule_assigned' => $templates->get('schedule_assigned') ?? null,
                'workout_assigned' => $templates->get('workout_assigned') ?? null,
                'nutrition_assigned' => $templates->get('nutrition_assigned') ?? null,
            ];

            return response()->json([
                'success' => true,
                'data' => $response
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching email templates: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update or create email template
     */
    public function updateEmailTemplate(Request $request)
    {
        try {
            $gymId = $this->getCurrentGymId();
            
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gym ID not found'
                ], 400);
            }

            $validator = Validator::make($request->all(), [
                'email_type' => 'required|string|in:membership,class_booking,payment_received,workout_plan,staff_schedule,payment_sent,appointment_created,appointment_updated,appointment_cancelled,schedule_assigned,workout_assigned,nutrition_assigned',
                'custom_email_subject' => 'required|string|max:255',
                'custom_email_body' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $emailType = $request->input('email_type');
            $subject = $request->input('custom_email_subject');
            $body = $request->input('custom_email_body');

            // Update or create template
            $template = EmailTemplate::updateOrCreate(
                [
                    'gym_id' => $gymId,
                    'email_type' => $emailType
                ],
                [
                    'subject' => $subject,
                    'body' => $body,
                    'is_active' => true
                ]
            );

            return response()->json([
                'success' => true,
                'message' => 'Email template updated successfully',
                'data' => $template
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating email template: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reset email template to defaults
     */
    public function resetToDefaults(Request $request)
    {
        try {
            $gymId = $this->getCurrentGymId();
            
            if (!$gymId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gym ID not found'
                ], 400);
            }

            $emailType = $request->input('email_type');
            
            $validTypes = [
                'membership',
                'class_booking',
                'payment_received',
                'workout_plan',
                'staff_schedule',
                'payment_sent',
                'appointment_created',
                'appointment_updated',
                'appointment_cancelled',
                'schedule_assigned',
                'workout_assigned',
                'nutrition_assigned',
            ];
            
            if (!in_array($emailType, $validTypes)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid email type'
                ], 400);
            }

            // Get default template
            $defaultTemplate = $this->getDefaultTemplate($emailType);
            
            // Update or create with default values
            $template = EmailTemplate::updateOrCreate(
                [
                    'gym_id' => $gymId,
                    'email_type' => $emailType
                ],
                [
                    'subject' => $defaultTemplate['subject'],
                    'body' => $defaultTemplate['body'],
                    'is_active' => true
                ]
            );

            return response()->json([
                'success' => true,
                'message' => 'Email template reset to defaults successfully',
                'data' => $template
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error resetting email template: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get default template content
     */
    private function getDefaultTemplate($emailType)
    {
        $defaults = [
            'membership' => [
                'subject' => 'Welcome to {gym_name} - Your Membership Confirmation',
                'body' => '<h2>Welcome to {gym_name}!</h2><p>Dear {client_name},</p><p>Thank you for joining {gym_name}! We\'re excited to have you as part of our fitness community.</p><h3>Membership Details:</h3><ul><li><strong>Membership Type:</strong> {membership_type}</li><li><strong>Start Date:</strong> {start_date}</li><li><strong>End Date:</strong> {end_date}</li><li><strong>Membership Fee:</strong> {membership_fee}</li><li><strong>Payment Status:</strong> {payment_status}</li></ul><p>We look forward to helping you achieve your fitness goals!</p><p>Best regards,<br>The {gym_name} Team</p>'
            ],
            'class_booking' => [
                'subject' => 'Class Booking Confirmation - {class_name}',
                'body' => '<h2>Class Booking Confirmed!</h2><p>Dear {client_name},</p><p>Your class booking has been successfully confirmed. We can\'t wait to see you!</p><h3>Class Details:</h3><ul><li><strong>Class:</strong> {class_name}</li><li><strong>Date:</strong> {class_date}</li><li><strong>Time:</strong> {class_time}</li><li><strong>Trainer:</strong> {trainer_name}</li><li><strong>Location:</strong> {class_location}</li></ul><p><strong>Important Reminders:</strong></p><ul><li>Please arrive 10 minutes before class starts</li><li>Bring water and appropriate workout attire</li><li>Don\'t forget your gym membership card</li></ul><p>See you there!</p><p>Best regards,<br>The {gym_name} Team</p>'
            ],
            'payment_received' => [
                'subject' => 'Payment Received - {gym_name}',
                'body' => '<h2>Payment Confirmation</h2><p>Dear {client_name},</p><p>Thank you! We have successfully received your payment.</p><h3>Payment Details:</h3><ul><li><strong>Payment Number:</strong> {payment_number}</li><li><strong>Amount Paid:</strong> {paid_amount}</li><li><strong>Payment Method:</strong> {payment_method}</li><li><strong>Payment Date:</strong> {payment_date}</li></ul><p>Your payment has been processed and your account is up to date. Thank you for your continued membership with {gym_name}.</p><p>If you have any questions about this payment, please don\'t hesitate to contact us.</p><p>Best regards,<br>The {gym_name} Team</p>'
            ],
            'workout_plan' => [
                'subject' => 'Your Personalized Workout Plan - {gym_name}',
                'body' => '<h2>Your Workout Plan is Ready!</h2><p>Dear {client_name},</p><p>Great news! Your personalized workout plan has been created by {trainer_name} and is ready for you.</p><h3>Plan Details:</h3><ul><li><strong>Plan Name:</strong> {plan_name}</li><li><strong>Duration:</strong> {plan_duration}</li><li><strong>Next Session:</strong> {next_session_date}</li><li><strong>Trainer:</strong> {trainer_name}</li></ul><p>Your workout plan has been designed specifically for your fitness goals and current level. You can access your complete plan details at: {plan_url}</p><p><strong>What to expect:</strong></p><ul><li>Progressive workouts that build strength and endurance</li><li>Proper form guidance and modifications</li><li>Regular progress tracking and adjustments</li></ul><p>Ready to get started? Your trainer will guide you through each session to ensure you\'re performing exercises correctly and safely.</p><p>Best regards,<br>{trainer_name} and the {gym_name} Team</p>'
            ],
            'staff_schedule' => [
                'subject' => 'Your Schedule Update - {gym_name}',
                'body' => '<h2>Schedule Update</h2><p>Dear {staff_name},</p><p>Your work schedule has been updated. Please review the details below.</p><h3>Schedule Details:</h3><ul><li><strong>Date:</strong> {schedule_date}</li><li><strong>Shift Time:</strong> {shift_time}</li><li><strong>Assigned Classes:</strong> {assigned_classes}</li><li><strong>Location:</strong> {location}</li></ul><p>Please ensure you arrive 15 minutes before your shift to prepare for your classes and check in with the front desk.</p><p>If you have any questions about your schedule or need to make changes, please contact the management team as soon as possible.</p><p>Thank you for your dedication to our members!</p><p>Best regards,<br>The {gym_name} Management Team</p>'
            ],
            'payment_sent' => [
                'subject' => 'Payment Sent - {gym_name}',
                'body' => '<h2>Payment Confirmation</h2><p>Dear {staff_name},</p><p>Your payment has been processed and sent successfully.</p><h3>Payment Details:</h3><ul><li><strong>Payment Number:</strong> {payment_number}</li><li><strong>Amount Paid:</strong> {paid_amount}</li><li><strong>Payment Method:</strong> {payment_method}</li><li><strong>Payment Date:</strong> {payment_date}</li></ul><p>Your payment will be available according to your bank\'s processing time. You can view your payment history in your staff portal.</p><p>If you have any questions about this payment, please contact the HR department.</p><p>Thank you for your hard work and dedication to {gym_name}!</p><p>Best regards,<br>The {gym_name} HR Team</p>'
            ],
            'appointment_created' => [
                'subject' => 'Appointment Scheduled - {gym_name}',
                'body' => '<h2>Appointment Confirmed!</h2><p>Dear {client_name},</p><p>Your appointment has been successfully scheduled. We look forward to seeing you!</p><h3>Appointment Details:</h3><ul><li><strong>Trainer:</strong> {trainer_name}</li><li><strong>Date:</strong> {appointment_date}</li><li><strong>Time:</strong> {appointment_time}</li><li><strong>Duration:</strong> {appointment_duration}</li></ul><p><strong>Important Reminders:</strong></p><ul><li>Please arrive 10 minutes before your appointment</li><li>Bring water and appropriate workout attire</li><li>If you need to reschedule or cancel, please contact us at least 24 hours in advance</li></ul><p>We\'re excited to help you achieve your fitness goals!</p><p>Best regards,<br>{trainer_name} and the {gym_name} Team</p>'
            ],
            'appointment_updated' => [
                'subject' => 'Appointment Rescheduled - {gym_name}',
                'body' => '<h2>Appointment Rescheduled</h2><p>Dear {client_name},</p><p>Your appointment has been rescheduled. Please note the new details below.</p><h3>Updated Appointment Details:</h3><ul><li><strong>Trainer:</strong> {trainer_name}</li><li><strong>New Date:</strong> {appointment_date}</li><li><strong>New Time:</strong> {appointment_time}</li><li><strong>Duration:</strong> {appointment_duration}</li></ul><p>If you have any questions or need to make further changes, please don\'t hesitate to contact us.</p><p>Best regards,<br>{trainer_name} and the {gym_name} Team</p>'
            ],
            'appointment_cancelled' => [
                'subject' => 'Appointment Cancelled - {gym_name}',
                'body' => '<h2>Appointment Cancellation Notice</h2><p>Dear {client_name},</p><p>This email confirms that your appointment has been cancelled.</p><h3>Cancelled Appointment Details:</h3><ul><li><strong>Trainer:</strong> {trainer_name}</li><li><strong>Date:</strong> {appointment_date}</li><li><strong>Time:</strong> {appointment_time}</li></ul><p>If you would like to schedule a new appointment, please contact us at your earliest convenience. We\'re here to help you stay on track with your fitness journey.</p><p>Best regards,<br>The {gym_name} Team</p>'
            ],
            'schedule_assigned' => [
                'subject' => 'Schedule Assignment - {gym_name}',
                'body' => '<h2>You\'ve Been Assigned to a Schedule!</h2><p>Dear {client_name},</p><p>You have been assigned to a new schedule event. Please review the details below.</p><h3>Schedule Details:</h3><ul><li><strong>Event:</strong> {event_title}</li><li><strong>Date:</strong> {event_date}</li><li><strong>Time:</strong> {event_time}</li><li><strong>Coach:</strong> {coach_name}</li></ul><p><strong>Important Reminders:</strong></p><ul><li>Please arrive on time for your scheduled event</li><li>Bring any necessary equipment or materials</li><li>If you have any questions, please contact your coach or the front desk</li></ul><p>We look forward to seeing you there!</p><p>Best regards,<br>The {gym_name} Team</p>'
            ],
            'workout_assigned' => [
                'subject' => 'New Workout Assigned - {gym_name}',
                'body' => '<h2>New Workout Assigned</h2><p>Dear {client_name},</p><p>You have been assigned a new workout: <strong>{workout_name}</strong>.</p><p>This workout has been created specifically for your goals. Please review it in your account before your next session.</p><p>If you have any questions about the exercises or how to perform them safely, please contact your trainer.</p><p>Best regards,<br>The {gym_name} Team</p>'
            ],
            'nutrition_assigned' => [
                'subject' => 'New Nutrition Plan Assigned - {gym_name}',
                'body' => '<h2>New Nutrition Plan Assigned</h2><p>Dear {client_name},</p><p>You have been assigned a new nutrition plan: <strong>{plan_name}</strong>.</p><p>This plan has been tailored to support your training and health goals. Please review the details carefully and follow the guidelines provided.</p><p>If you have any allergies, dietary restrictions, or questions, please contact your coach or nutritionist before making changes.</p><p>Best regards,<br>The {gym_name} Team</p>'
            ]
        ];

        return $defaults[$emailType] ?? $defaults['membership'];
    }

    /**
     * Get current gym ID from authenticated user
     */
    private function getCurrentGymId()
    {
        // This method should be implemented based on your authentication system
        // For now, returning a default gym ID - you should modify this based on your setup
        
        if (Auth::check()) {
            // If user has gym_id field
            if (Auth::user()->gym_id) {
                return Auth::user()->gym_id;
            }
            
            // If user belongs to a gym through relationship
            if (Auth::user()->gym) {
                return Auth::user()->gym->id;
            }
        }
        
        // For testing purposes - remove this in production
        return 1;
    }
}
