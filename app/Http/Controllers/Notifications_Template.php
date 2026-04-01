<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Models\User;
use App\Models\SMSMessage;
use App\Models\EmailMessage;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Http\Request;
use HTMLPurifier;
use HTMLPurifier_Config;

class Notifications_Template extends Controller
{


    //-------------- get_sms_template ---------------\\

    public function get_sms_template(Request $request)
    {

        $this->authorizeForUser($request->user('api'), 'notification_template', Setting::class);

        //---get sms body for Sale

        $get_type_sale = SMSMessage::where('name', 'sale')->where('deleted_at', '=', null)->first();
        
        if($get_type_sale){
            $sms_body_sale = $get_type_sale->text;
        }else{
            $sms_body_sale = '';
        }

        //---get sms body for quotation

        $get_type_quotation = SMSMessage::where('name', 'quotation')->where('deleted_at', '=', null)->first();
    
        if($get_type_quotation){
            $sms_body_quotation = $get_type_quotation->text;
        }else{
            $sms_body_quotation = '';
        }

        //---get sms body for payment_received

        $get_type_payment_received = SMSMessage::where('name', 'payment_received')->where('deleted_at', '=', null)->first();

        if($get_type_payment_received){
            $sms_body_payment_received = $get_type_payment_received->text;
        }else{
            $sms_body_payment_received = '';
        }

        //---get sms body for purchase

        $get_type_purchase = SMSMessage::where('name', 'purchase')->where('deleted_at', '=', null)->first();

        if($get_type_purchase){
            $sms_body_purchase = $get_type_purchase->text;
        }else{
            $sms_body_purchase = '';
        }

        //---get sms body for payment_sent

        $get_type_payment_sent = SMSMessage::where('name', 'payment_sent')->where('deleted_at', '=', null)->first();

        if($get_type_payment_sent){
            $sms_body_payment_sent = $get_type_payment_sent->text;
        }else{
            $sms_body_payment_sent = '';
        }

          
        return response()->json([
            'sms_body_sale' => $sms_body_sale,
            'sms_body_quotation' => $sms_body_quotation,
            'sms_body_payment_received' => $sms_body_payment_received,
            'sms_body_purchase' => $sms_body_purchase,
            'sms_body_payment_sent' => $sms_body_payment_sent,
        ], 200);
       
       
    }


   
     //-------------- update_sms_body ---------------\\

     public function update_sms_body(Request $request)
     {
 
        $this->authorizeForUser($request->user('api'), 'notification_template', Setting::class);

        $smsMessage = SMSMessage::firstOrNew(['name' => $request['sms_body_type']]);
        $smsMessage->name = $request['sms_body_type'];
        $smsMessage->text = $request['sms_body'];
        $smsMessage->save();

        return response()->json(['success' => true]);

 
     }


     //-------------- get_emails_template ---------------\\

    public function get_emails_template(Request $request)
    {

        $this->authorizeForUser($request->user('api'), 'notification_template', Setting::class);

        //---get sms body for Sale

        $email_sale = EmailMessage::where('name', 'sale')->where('deleted_at', '=', null)->first();
        
        if($email_sale){
            $sale['subject'] = $email_sale->subject;
            $sale['body'] = $email_sale->body;
        }else{
            $sale['subject'] = '';
            $sale['body'] = '';
        }


        //---get sms body for quotation

        $email_quotation = EmailMessage::where('name', 'quotation')->where('deleted_at', '=', null)->first();
        
            
        if($email_quotation){
            $quotation['subject'] = $email_quotation->subject;
            $quotation['body'] = $email_quotation->body;
        }else{
            $quotation['subject'] = '';
            $quotation['body'] = '';
        }
 
        //---get sms body for payment_received

        $email_payment_received = EmailMessage::where('name', 'payment_received')->where('deleted_at', '=', null)->first();
        
            
        if($email_payment_received){
            $payment_received['subject'] = $email_payment_received->subject;
            $payment_received['body'] = $email_payment_received->body;
        }else{
            $payment_received['subject'] = '';
            $payment_received['body'] = '';
        }

        //---get sms body for purchase

        $email_purchase = EmailMessage::where('name', 'purchase')->where('deleted_at', '=', null)->first();

            
        if($email_purchase){
            $purchase['subject'] = $email_purchase->subject;
            $purchase['body'] = $email_purchase->body;
        }else{
            $purchase['subject'] = '';
            $purchase['body'] = '';
        }
 
        //---get sms body for payment_sent

        $email_payment_sent = EmailMessage::where('name', 'payment_sent')->where('deleted_at', '=', null)->first();

            
        if($email_payment_sent){
            $payment_sent['subject'] = $email_payment_sent->subject;
            $payment_sent['body'] = $email_payment_sent->body;
        }else{
            $payment_sent['subject'] = '';
            $payment_sent['body'] = '';
        }

        return response()->json([
            'sale' => $sale,
            'quotation' => $quotation,
            'payment_received' => $payment_received,
            'purchase' => $purchase,
            'payment_sent' => $payment_sent,
        ], 200);
       
    }


    //-------------- update_custom_email ---------------\\

    public function update_custom_email(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'notification_template', Setting::class);
        
        $requestData = $request->json();
        $email_type = $requestData->get('email_type');

        $config = HTMLPurifier_Config::createDefault();
        $config->set('Core.Encoding', 'UTF-8');
        $config->set('HTML.Allowed', 'div[style],h1,h2,h3,h4,h5,h6,p[style],b,strong,i,em,u,ul,ol,li,br,hr,pre,blockquote,span[style]');
        $config->set('CSS.AllowedProperties', 'font-size, color, background-color, text-align');
        $purifier = new HTMLPurifier($config);

        $custom_email_body = $purifier->purify($requestData->get('custom_email_body'));

        $custom_email_subject = $purifier->purify($requestData->get('custom_email_subject'));


        $emailMessage = EmailMessage::firstOrNew(['name' => $email_type]);
        $emailMessage->name = $email_type;
        $emailMessage->subject = $custom_email_subject;
        $emailMessage->body = $custom_email_body;
        $emailMessage->save();

        return response()->json(['success' => true]);

       

    }

    //-------------- reset_email_template ---------------\\

    public function reset_email_template(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'notification_template', Setting::class);
        
        $requestData = $request->json();
        $email_type = $requestData->get('email_type');

        // Get default template based on email type
        $defaultTemplate = $this->getDefaultEmailTemplate($email_type);

        if (!$defaultTemplate) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid email type'
            ], 400);
        }

        // Update or create email message with default values
        $emailMessage = EmailMessage::firstOrNew(['name' => $email_type]);
        $emailMessage->name = $email_type;
        $emailMessage->subject = $defaultTemplate['subject'];
        $emailMessage->body = $defaultTemplate['body'];
        $emailMessage->save();

        return response()->json([
            'success' => true,
            'data' => [
                'subject' => $emailMessage->subject,
                'body' => $emailMessage->body
            ]
        ]);
    }

    /**
     * Get default email template content
     */
    private function getDefaultEmailTemplate($emailType)
    {
        $defaults = [
            'membership' => [
                'subject' => 'Welcome to {gym_name} - Your Membership Confirmation',
                'body' => '<h2>Welcome to {gym_name}!</h2><p>Dear {member_name},</p><p>Thank you for joining {gym_name}! We\'re excited to have you as part of our fitness community.</p><h3>Membership Details:</h3><ul><li><strong>Membership Type:</strong> {membership_type}</li><li><strong>Start Date:</strong> {start_date}</li><li><strong>End Date:</strong> {end_date}</li><li><strong>Membership Fee:</strong> {membership_fee}</li><li><strong>Payment Status:</strong> {payment_status}</li></ul><p>We look forward to helping you achieve your fitness goals!</p><p>Best regards,<br>The {gym_name} Team</p>'
            ],
            'class_booking' => [
                'subject' => 'Class Booking Confirmation - {class_name}',
                'body' => '<h2>Class Booking Confirmed!</h2><p>Dear {member_name},</p><p>Your class booking has been successfully confirmed. We can\'t wait to see you!</p><h3>Class Details:</h3><ul><li><strong>Class:</strong> {class_name}</li><li><strong>Date:</strong> {class_date}</li><li><strong>Time:</strong> {class_time}</li><li><strong>Trainer:</strong> {trainer_name}</li><li><strong>Location:</strong> {class_location}</li></ul><p>See you there!</p><p>Best regards,<br>The {gym_name} Team</p>'
            ],
            'payment_received' => [
                'subject' => 'Payment Received - {gym_name}',
                'body' => '<h2>Payment Confirmation</h2><p>Dear {member_name},</p><p>Thank you! We have successfully received your payment.</p><h3>Payment Details:</h3><ul><li><strong>Payment Number:</strong> {payment_number}</li><li><strong>Amount Paid:</strong> {paid_amount}</li><li><strong>Payment Method:</strong> {payment_method}</li><li><strong>Payment Date:</strong> {payment_date}</li></ul><p>Best regards,<br>The {gym_name} Team</p>'
            ],
            'workout_plan' => [
                'subject' => 'Your Personalized Workout Plan - {gym_name}',
                'body' => '<h2>Your Workout Plan is Ready!</h2><p>Dear {member_name},</p><p>Great news! Your personalized workout plan has been created by {trainer_name} and is ready for you.</p><h3>Plan Details:</h3><ul><li><strong>Plan Name:</strong> {plan_name}</li><li><strong>Duration:</strong> {plan_duration}</li><li><strong>Next Session:</strong> {next_session_date}</li></ul><p>Best regards,<br>{trainer_name} and the {gym_name} Team</p>'
            ],
            'password_setup' => [
                'subject' => 'Welcome! Set Up Your Gym App Password',
                'body' => '<h2>Welcome to {gym_name}!</h2><p>Hello {member_name},</p><p>Your account has been successfully created! To access the mobile app and start your fitness journey, you need to set up your password.</p><p><a href="{setup_url}">Set Up Your Password</a></p><p>Best regards,<br><strong>The {gym_name} Team</strong></p>'
            ],
            'staff_schedule' => [
                'subject' => 'Your Schedule Update - {gym_name}',
                'body' => '<h2>Schedule Update</h2><p>Dear {coach_name},</p><p>Your work schedule has been updated. Please review the details below.</p><h3>Schedule Details:</h3><ul><li><strong>Date:</strong> {schedule_date}</li><li><strong>Shift Time:</strong> {shift_time}</li><li><strong>Assigned Classes:</strong> {assigned_classes}</li><li><strong>Location:</strong> {location}</li></ul><p>Best regards,<br>The {gym_name} Management Team</p>'
            ],
            'payment_sent' => [
                'subject' => 'Payment Sent - {gym_name}',
                'body' => '<h2>Payment Confirmation</h2><p>Dear {coach_name},</p><p>Your payment has been processed and sent successfully.</p><h3>Payment Details:</h3><ul><li><strong>Payment Number:</strong> {payment_number}</li><li><strong>Amount Paid:</strong> {paid_amount}</li><li><strong>Payment Method:</strong> {payment_method}</li><li><strong>Payment Date:</strong> {payment_date}</li></ul><p>Best regards,<br>The {gym_name} HR Team</p>'
            ],
            'appointment_created' => [
                'subject' => 'Appointment Scheduled - {gym_name}',
                'body' => '<h2>Appointment Confirmed!</h2><p>Dear {member_name},</p><p>Your appointment has been successfully scheduled. We look forward to seeing you!</p><h3>Appointment Details:</h3><ul><li><strong>Trainer:</strong> {trainer_name}</li><li><strong>Date:</strong> {appointment_date}</li><li><strong>Time:</strong> {appointment_time}</li><li><strong>Duration:</strong> {appointment_duration}</li></ul><p><strong>Important Reminders:</strong></p><ul><li>Please arrive 10 minutes before your appointment</li><li>Bring water and appropriate workout attire</li><li>If you need to reschedule or cancel, please contact us at least 24 hours in advance</li></ul><p>We\'re excited to help you achieve your fitness goals!</p><p>Best regards,<br>{trainer_name} and the {gym_name} Team</p>'
            ],
            'appointment_updated' => [
                'subject' => 'Appointment Rescheduled - {gym_name}',
                'body' => '<h2>Appointment Rescheduled</h2><p>Dear {member_name},</p><p>Your appointment has been rescheduled. Please note the new details below.</p><h3>Updated Appointment Details:</h3><ul><li><strong>Trainer:</strong> {trainer_name}</li><li><strong>New Date:</strong> {appointment_date}</li><li><strong>New Time:</strong> {appointment_time}</li><li><strong>Duration:</strong> {appointment_duration}</li></ul><p>If you have any questions or need to make further changes, please don\'t hesitate to contact us.</p><p>Best regards,<br>{trainer_name} and the {gym_name} Team</p>'
            ],
            'appointment_cancelled' => [
                'subject' => 'Appointment Cancelled - {gym_name}',
                'body' => '<h2>Appointment Cancellation Notice</h2><p>Dear {member_name},</p><p>This email confirms that your appointment has been cancelled.</p><h3>Cancelled Appointment Details:</h3><ul><li><strong>Trainer:</strong> {trainer_name}</li><li><strong>Date:</strong> {appointment_date}</li><li><strong>Time:</strong> {appointment_time}</li></ul><p>If you would like to schedule a new appointment, please contact us at your earliest convenience. We\'re here to help you stay on track with your fitness journey.</p><p>Best regards,<br>The {gym_name} Team</p>'
            ],
            'schedule_assigned' => [
                'subject' => 'Schedule Assignment - {gym_name}',
                'body' => '<h2>You\'ve Been Assigned to a Schedule!</h2><p>Dear {member_name},</p><p>You have been assigned to a new schedule event. Please review the details below.</p><h3>Schedule Details:</h3><ul><li><strong>Event:</strong> {event_title}</li><li><strong>Date:</strong> {event_date}</li><li><strong>Time:</strong> {event_time}</li><li><strong>Coach:</strong> {coach_name}</li></ul><p><strong>Important Reminders:</strong></p><ul><li>Please arrive on time for your scheduled event</li><li>Bring any necessary equipment or materials</li><li>If you have any questions, please contact your coach or the front desk</li></ul><p>We look forward to seeing you there!</p><p>Best regards,<br>The {gym_name} Team</p>'
            ],
            'workout_assigned' => [
                'subject' => 'New Workout Assigned - {gym_name}',
                'body' => '<h2>New Workout Assigned</h2><p>Dear {member_name},</p><p>You have been assigned a new workout: <strong>{workout_name}</strong>.</p><p>This workout has been created specifically for your goals. Please review it in your account before your next session.</p><p>If you have any questions about the exercises or how to perform them safely, please contact your trainer.</p><p>Best regards,<br>The {gym_name} Team</p>'
            ],
            'nutrition_assigned' => [
                'subject' => 'New Nutrition Plan Assigned - {gym_name}',
                'body' => '<h2>New Nutrition Plan Assigned</h2><p>Dear {member_name},</p><p>You have been assigned a new nutrition plan: <strong>{plan_name}</strong>.</p><p>This plan has been tailored to support your training and health goals. Please review the details carefully and follow the guidelines provided.</p><p>If you have any allergies, dietary restrictions, or questions, please contact your coach or nutritionist before making changes.</p><p>Best regards,<br>The {gym_name} Team</p>'
            ]
        ];

        return $defaults[$emailType] ?? null;
    }


   
}
