<?php

namespace App\Services;

use App\Models\AdminNotification;
use App\Models\User;
use App\Models\Member;
use App\Models\Coach;
use App\Models\CoachAssignment;
use App\Models\ScheduleEvent;
use App\Models\MemberMessage;
use App\Models\EmailTemplate;
use App\Models\Gym;
use App\Mail\CustomEmail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class NotificationService
{
    /**
     * Create notifications for all admin users in a gym
     *
     * @param string $type Notification type (e.g., 'appointment_created')
     * @param string $title Notification title
     * @param string $message Notification message
     * @param string $icon FontAwesome icon class (default: 'fa-bell')
     * @param string $color Bootstrap color class (default: 'primary')
     * @param string|null $relatedType Related model type (e.g., 'appointment', 'member')
     * @param int|null $relatedId Related model ID
     * @param int $gymId Gym ID
     * @param int|null $excludeUserId User ID to exclude from notifications (e.g., admin who performed the action)
     * @param int|null $senderId ID of the user/member/coach who triggered the notification
     * @param array|null $data Extra payload to store in the notification `data` column
     * @return int Number of notifications created
     */
    public static function createForAdmins(
        $type,
        $title,
        $message,
        $icon = 'fa-bell',
        $color = 'primary',
        $relatedType = null,
        $relatedId = null,
        $gymId = 1,
        $excludeUserId = null,
        $senderId = null,
        $data = null
    ) {
        try {
            $query = User::where('role_id', 1)
                ->where('gym_id', $gymId)
                ->where('status', 1); // Active users only
            
            // Exclude the user who performed the action (if provided and is an admin)
            if ($excludeUserId) {
                $query->where('id', '!=', $excludeUserId);
            }
            
            $adminUsers = $query->get();
            
            $count = 0;
            foreach ($adminUsers as $adminUser) {
                AdminNotification::create([
                    'user_id' => $adminUser->id,
                    'gym_id' => $adminUser->gym_id ?? $gymId,
                    'sender_id' => $senderId,
                    'data' => $data,
                    'type' => $type,
                    'title' => $title,
                    'message' => $message,
                    'icon' => $icon,
                    'color' => $color,
                    'related_type' => $relatedType,
                    'related_id' => $relatedId,
                    'is_read' => false,
                ]);
                $count++;
            }
            
            Log::info("Created {$count} admin notifications for type: {$type}" . ($excludeUserId ? " (excluding user {$excludeUserId})" : ""));
            return $count;
        } catch (\Exception $e) {
            Log::error('Failed to create admin notifications: ' . $e->getMessage(), [
                'type' => $type,
                'gym_id' => $gymId,
                'exclude_user_id' => $excludeUserId,
                'trace' => $e->getTraceAsString()
            ]);
            return 0;
        }
    }

    /**
     * Create notification for a specific member
     *
     * @param int $memberId Member ID
     * @param string $type Notification type
     * @param string $title Notification title
     * @param string $message Notification message
     * @param string $icon FontAwesome icon class
     * @param string $color Bootstrap color class
     * @param string|null $relatedType Related model type
     * @param int|null $relatedId Related model ID
     * @param int|null $senderId ID of the user/member/coach who triggered the notification
     * @param array|null $data Extra payload to store in the notification `data` column
     * @return AdminNotification|null
     */
    public static function createForMember(
        $memberId,
        $type,
        $title,
        $message,
        $icon = 'fa-bell',
        $color = 'primary',
        $relatedType = null,
        $relatedId = null,
        $senderId = null,
        $data = null
    ) {
        try {
            // Verify member exists
            $member = Member::find($memberId);
            if (!$member) {
                Log::warning("Member not found for notification: {$memberId}");
                return ['error' => "Member not found: {$memberId}"];
            }
            
            // Find the user record for this member
            // First try to find by member_id in users table, then by email (like coaches)
            $user = \App\Models\User::where('member_id', $memberId)->first();
            
            // If not found by member_id, try by email (similar to how coaches work)
            if (!$user && $member->email) {
                $user = \App\Models\User::where('email', $member->email)->first();
            }
            
            if (!$user) {
                $memberEmail = $member->email ?? 'N/A';
                Log::warning("User not found for member notification: {$memberId} (email: {$memberEmail})");
                return ['error' => "User not found for member: {$memberId} (email: {$memberEmail})"];
            }
            
            // Use user_id instead of member_id for notifications (like coaches)
            $notification = AdminNotification::create([
                'user_id' => $user->id, // Use user_id from users table
                'gym_id' => $user->gym_id ?? $member->gym_id ?? 1,
                'sender_id' => $senderId,
                'data' => $data,
                'type' => $type,
                'title' => $title,
                'message' => $message,
                'icon' => $icon,
                'color' => $color,
                'related_type' => $relatedType,
                'related_id' => $relatedId,
                'is_read' => false,
            ]);
            
            Log::info("Created member notification for member {$memberId} (user_id: {$user->id}), type: {$type}");
            return $notification;
        } catch (\Exception $e) {
            $errorMessage = $e->getMessage();
            Log::error('Failed to create member notification: ' . $errorMessage, [
                'member_id' => $memberId,
                'type' => $type,
                'trace' => $e->getTraceAsString()
            ]);
            return ['error' => $errorMessage];
        }
    }

    /**
     * Create notification for a specific coach
     * Uses user_id from users table since coaches are linked to users by email
     *
     * @param int $coachId Coach ID (from coaches table)
     * @param string $type Notification type
     * @param string $title Notification title
     * @param string $message Notification message
     * @param string $icon FontAwesome icon class
     * @param string $color Bootstrap color class
     * @param string|null $relatedType Related model type
     * @param int|null $relatedId Related model ID
     * @param int|null $senderId ID of the user/member/coach who triggered the notification
     * @param array|null $data Extra payload to store in the notification `data` column
     * @return AdminNotification|null
     */
    public static function createForCoach(
        $coachId,
        $type,
        $title,
        $message,
        $icon = 'fa-bell',
        $color = 'primary',
        $relatedType = null,
        $relatedId = null,
        $senderId = null,
        $data = null
    ) {
        try {
            // Verify coach exists
            $coach = Coach::find($coachId);
            if (!$coach) {
                Log::warning("Coach not found for notification: {$coachId}");
                return ['error' => "Coach not found: {$coachId}"];
            }
            
            // Find the user record for this coach (coaches are linked to users by email)
            $user = \App\Models\User::where('email', $coach->email)
                ->where('role_id', 3) // Ensure it's a coach user
                ->first();
            
            if (!$user) {
                Log::warning("User not found for coach notification: {$coachId} (email: {$coach->email})");
                return ['error' => "User not found for coach: {$coachId} (email: {$coach->email})"];
            }
            
            // Use user_id instead of coach_id for notifications
            $notification = AdminNotification::create([
                'user_id' => $user->id, // Use user_id from users table
                'gym_id' => $user->gym_id ?? $coach->gym_id ?? 1,
                'sender_id' => $senderId,
                'data' => $data,
                'type' => $type,
                'title' => $title,
                'message' => $message,
                'icon' => $icon,
                'color' => $color,
                'related_type' => $relatedType,
                'related_id' => $relatedId,
                'is_read' => false,
            ]);
            
            Log::info("Created coach notification for coach {$coachId} (user_id: {$user->id}), type: {$type}");
            return $notification;
        } catch (\Exception $e) {
            $errorMessage = $e->getMessage();
            Log::error('Failed to create coach notification: ' . $errorMessage, [
                'coach_id' => $coachId,
                'type' => $type,
                'trace' => $e->getTraceAsString()
            ]);
            return ['error' => $errorMessage];
        }
    }

    /**
     * Create notifications for multiple recipients
     *
     * @param array $recipients Array of ['type' => 'admin'|'member'|'coach', 'id' => ID]
     * @param string $type Notification type
     * @param string $title Notification title
     * @param string $message Notification message
     * @param string $icon FontAwesome icon class
     * @param string $color Bootstrap color class
     * @param string|null $relatedType Related model type
     * @param int|null $relatedId Related model ID
     * @return int Number of notifications created
     */
    public static function createForMultiple(
        array $recipients,
        $type,
        $title,
        $message,
        $icon = 'fa-bell',
        $color = 'primary',
        $relatedType = null,
        $relatedId = null
    ) {
        $count = 0;
        foreach ($recipients as $recipient) {
            if (!isset($recipient['type']) || !isset($recipient['id'])) {
                continue;
            }
            
            if ($recipient['type'] === 'admin') {
                // For admins, we need gym_id - get it from user
                $user = User::find($recipient['id']);
                if ($user) {
                    self::createForAdmins($type, $title, $message, $icon, $color, $relatedType, $relatedId, $user->gym_id ?? 1);
                    $count++;
                }
            } elseif ($recipient['type'] === 'member') {
                if (self::createForMember($recipient['id'], $type, $title, $message, $icon, $color, $relatedType, $relatedId)) {
                    $count++;
                }
            } elseif ($recipient['type'] === 'coach') {
                if (self::createForCoach($recipient['id'], $type, $title, $message, $icon, $color, $relatedType, $relatedId)) {
                    $count++;
                }
            }
        }
        
        return $count;
    }

    /**
     * Helper method for appointment created notifications
     */
    // public static function appointmentCreated($appointment, $member, $trainer, $gymId = 1, $performedByUserId = null)
    // {
    //     $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
    //     $trainerName = trim(($trainer->first_name ?? '') . ' ' . ($trainer->last_name ?? ''));
    //     $dateTime = $appointment->date . ' at ' . $appointment->start_time;

    //     // Build common payload for the data column
    //     $payload = [
    //         'appointment_id' => $appointment->id,
    //         'member_id'      => $member->id,
    //         'coach_id'       => $trainer->id,
    //         'datetime'       => $appointment->date . ' ' . $appointment->start_time,
    //     ];

    //     // By default we treat the member as the sender (adjust if you use another logic)
    //     $senderId = $member->id;
        
    //     // Admin notifications (exclude admin who created it)
    //     self::createForAdmins(
    //         'appointment_created',
    //         'New Appointment Scheduled',
    //         "Member {$memberName} has scheduled an appointment with {$trainerName} on {$dateTime}.",
    //         'fa-calendar-check',
    //         'info',
    //         'appointment',
    //         $appointment->id,
    //         $gymId,
    //         $performedByUserId,
    //         $senderId,
    //         $payload
    //     );
        
    //     // Member notification
    //     self::createForMember(
    //         $member->id,
    //         'appointment_created',
    //         'Appointment Scheduled',
    //         "Your appointment with {$trainerName} is scheduled for {$dateTime}.",
    //         'fa-calendar-check',
    //         'info',
    //         'appointment',
    //         $appointment->id,
    //         $senderId,
    //         $payload
    //     );
        
    //     // Coach notification
    //     self::createForCoach(
    //         $trainer->id,
    //         'appointment_created',
    //         'New Appointment',
    //         "You have a new appointment with {$memberName} on {$dateTime}.",
    //         'fa-calendar-check',
    //         'info',
    //         'appointment',
    //         $appointment->id,
    //         $senderId,
    //         $payload
    //     );
    // }

    /**
     * Helper method for appointment created notifications
     * Returns detailed status for member and coach notifications so frontend can debug.
     *
     * @return array{
     *   member: array{success: bool, error: ?string},
     *   coach: array{success: bool, error: ?string}
     * }
     */
    public static function appointmentCreated($appointment, $member, $trainer, $gymId = 1, $performedByUserId = null)
{
    $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
    $trainerName = trim(($trainer->first_name ?? '') . ' ' . ($trainer->last_name ?? ''));
    
    // Format date to remove time portion (00:00:00)
    $appointmentDate = $appointment->date ?? '';
    if ($appointmentDate) {
        try {
            // If it's a datetime string, extract just the date part
            if (strpos($appointmentDate, ' ') !== false) {
                $appointmentDate = \Carbon\Carbon::parse($appointmentDate)->format('Y-m-d');
            }
        } catch (\Exception $e) {
            // If parsing fails, try to extract date part manually
            $appointmentDate = explode(' ', $appointmentDate)[0];
        }
    }
    
    $dateTime =  $appointmentDate . ' ' . 'at ' . $appointment->start_time . ' ' .'to' . ' ' . $appointment->end_time;

    // Build common payload for the data column
    $payload = [
        'appointment_id' => $appointment->id,
        'member_id'      => $member->id,
        'coach_id'       => $trainer->id,
        'datetime'       => $appointment->start_time . ' to ' . $appointment->end_time,
    ];

    // Correct sender_id
    $senderId = $performedByUserId ?? 1; // default to admin/system if null

        $results = [
            'member' => ['success' => false, 'error' => null],
            'coach'  => ['success' => false, 'error' => null],
        ];

        // Member notification - personalized for the member
        $memberNotification = self::createForMember(
            $member->id,
        'appointment_created',
        'Appointment Scheduled',
        "Your appointment with {$trainerName} is scheduled for {$dateTime}.",
        'fa-calendar-check',
        'info',
        'appointment',
        $appointment->id,
            $senderId,
        $payload
    );

        if ($memberNotification instanceof AdminNotification) {
            $results['member']['success'] = true;
        } else {
            // Check if it's an error array
            if (is_array($memberNotification) && isset($memberNotification['error'])) {
                $results['member']['error'] = $memberNotification['error'];
            } else {
                $results['member']['error'] = 'Member notification was not created (see logs for details).';
            }
        }

        // Coach notification - personalized for the coach
        $coachNotification = self::createForCoach(
        $trainer->id,
        'appointment_created',
        'New Appointment',
        "You have a new appointment with {$memberName} on {$dateTime}.",
        'fa-calendar-check',
        'info',
        'appointment',
        $appointment->id,
            $senderId,
        $payload
    );

        if ($coachNotification instanceof AdminNotification) {
            $results['coach']['success'] = true;
        } else {
            // Check if it's an error array
            if (is_array($coachNotification) && isset($coachNotification['error'])) {
                $results['coach']['error'] = $coachNotification['error'];
            } else {
                $results['coach']['error'] = 'Coach notification was not created (see logs for details).';
            }
        }

        // Send emails
        $gymName = self::getGymName($gymId);
        $appointmentTime = self::formatAppointmentTime($appointment->start_time, $appointment->end_time);
        $duration = self::calculateDuration($appointment->start_time, $appointment->end_time);
        
        // Format appointment date for display
        $formattedDate = '';
        if ($appointmentDate) {
            try {
                $formattedDate = Carbon::parse($appointmentDate)->format('F j, Y');
            } catch (\Exception $e) {
                $formattedDate = $appointmentDate;
            }
        }
        
        // Send email to member
        if ($member->email) {
            $memberReplacements = [
                'gym_name' => $gymName,
                'client_name' => $memberName,
                'trainer_name' => $trainerName,
                'appointment_date' => $formattedDate,
                'appointment_time' => $appointmentTime,
                'appointment_duration' => $duration,
            ];
            self::sendEmail('appointment_created', $member->email, $memberReplacements, $gymId);
        }
        
        // Send email to coach
        if ($trainer->email) {
            $coachReplacements = [
                'gym_name' => $gymName,
                'client_name' => $memberName,
                'trainer_name' => $trainerName,
                'appointment_date' => $formattedDate,
                'appointment_time' => $appointmentTime,
                'appointment_duration' => $duration,
            ];
            self::sendEmail('appointment_created', $trainer->email, $coachReplacements, $gymId);
        }

        return $results;
}


    /**
     * Helper method for appointment updated notifications
     */
    public static function appointmentUpdated($appointment, $member, $trainer, $gymId = 1, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        $trainerName = trim(($trainer->first_name ?? '') . ' ' . ($trainer->last_name ?? ''));
        
        // Format date to remove time portion (00:00:00)
        $appointmentDate = $appointment->date ?? '';
        if ($appointmentDate) {
            try {
                // If it's a datetime string, extract just the date part
                if (strpos($appointmentDate, ' ') !== false) {
                    $appointmentDate = \Carbon\Carbon::parse($appointmentDate)->format('Y-m-d');
                }
            } catch (\Exception $e) {
                // If parsing fails, try to extract date part manually
                $appointmentDate = explode(' ', $appointmentDate)[0];
            }
        }
        
        $dateTime = $appointmentDate . ' at ' . $appointment->start_time . ' ' .'to' . ' ' . $appointment->end_time;
        
        self::createForAdmins(
            'appointment_updated',
            'Appointment Rescheduled',
            "Appointment between {$memberName} and {$trainerName} has been rescheduled to {$dateTime}.",
            'fa-calendar-alt',
            'warning',
            'appointment',
            $appointment->id,
            $gymId,
            $performedByUserId
        );
        
        self::createForMember(
            $member->id,
            'appointment_updated',
            'Appointment Rescheduled',
            "Your appointment with {$trainerName} has been rescheduled to {$dateTime}.",
            'fa-calendar-alt',
            'warning',
            'appointment',
            $appointment->id
        );
        
        self::createForCoach(
            $trainer->id,
            'appointment_updated',
            'Appointment Rescheduled',
            "Your appointment with {$memberName} has been rescheduled to {$dateTime}.",
            'fa-calendar-alt',
            'warning',
            'appointment',
            $appointment->id
        );
        
        // Send emails
        $gymName = self::getGymName($gymId);
        $appointmentTime = self::formatAppointmentTime($appointment->start_time, $appointment->end_time);
        $duration = self::calculateDuration($appointment->start_time, $appointment->end_time);
        
        // Format appointment date for display
        $formattedDate = '';
        if ($appointmentDate) {
            try {
                $formattedDate = Carbon::parse($appointmentDate)->format('F j, Y');
            } catch (\Exception $e) {
                $formattedDate = $appointmentDate;
            }
        }
        
        // Send email to member
        if ($member->email) {
            $memberReplacements = [
                'gym_name' => $gymName,
                'client_name' => $memberName,
                'trainer_name' => $trainerName,
                'appointment_date' => $formattedDate,
                'appointment_time' => $appointmentTime,
                'appointment_duration' => $duration,
            ];
            self::sendEmail('appointment_updated', $member->email, $memberReplacements, $gymId);
        }
        
        // Send email to coach
        if ($trainer->email) {
            $coachReplacements = [
                'gym_name' => $gymName,
                'client_name' => $memberName,
                'trainer_name' => $trainerName,
                'appointment_date' => $formattedDate,
                'appointment_time' => $appointmentTime,
                'appointment_duration' => $duration,
            ];
            self::sendEmail('appointment_updated', $trainer->email, $coachReplacements, $gymId);
        }
    }

    /**
     * Helper method for appointment cancelled notifications
     */
    public static function appointmentCancelled($appointment, $member, $trainer, $gymId = 1, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        $trainerName = trim(($trainer->first_name ?? '') . ' ' . ($trainer->last_name ?? ''));
        
        // Format date to remove time portion (00:00:00)
        $appointmentDate = $appointment->date ?? '';
        if ($appointmentDate) {
            try {
                // If it's a datetime string, extract just the date part
                if (strpos($appointmentDate, ' ') !== false) {
                    $appointmentDate = \Carbon\Carbon::parse($appointmentDate)->format('Y-m-d');
                }
            } catch (\Exception $e) {
                // If parsing fails, try to extract date part manually
                $appointmentDate = explode(' ', $appointmentDate)[0];
            }
        }
        
        $dateTime = $appointmentDate . ' at ' . $appointment->start_time . ' ' .'to' . ' ' . $appointment->end_time;
        
        self::createForAdmins(
            'appointment_cancelled',
            'Appointment Cancelled',
            "Appointment between {$memberName} and {$trainerName} scheduled for {$dateTime} has been cancelled.",
            'fa-calendar-times',
            'danger',
            'appointment',
            $appointment->id,
            $gymId,
            $performedByUserId
        );
        
        self::createForMember(
            $member->id,
            'appointment_cancelled',
            'Appointment Cancelled',
            "Your appointment with {$trainerName} scheduled for {$dateTime} has been cancelled.",
            'fa-calendar-times',
            'danger',
            'appointment',
            $appointment->id
        );
        
        self::createForCoach(
            $trainer->id,
            'appointment_cancelled',
            'Appointment Cancelled',
            "Your appointment with {$memberName} scheduled for {$dateTime} has been cancelled.",
            'fa-calendar-times',
            'danger',
            'appointment',
            $appointment->id
        );
        
        // Send emails
        $gymName = self::getGymName($gymId);
        $appointmentTime = self::formatAppointmentTime($appointment->start_time, $appointment->end_time);
        
        // Format appointment date for display
        $formattedDate = '';
        if ($appointmentDate) {
            try {
                $formattedDate = Carbon::parse($appointmentDate)->format('F j, Y');
            } catch (\Exception $e) {
                $formattedDate = $appointmentDate;
            }
        }
        
        // Send email to member
        if ($member->email) {
            $memberReplacements = [
                'gym_name' => $gymName,
                'client_name' => $memberName,
                'trainer_name' => $trainerName,
                'appointment_date' => $formattedDate,
                'appointment_time' => $appointmentTime,
            ];
            self::sendEmail('appointment_cancelled', $member->email, $memberReplacements, $gymId);
        }
        
        // Send email to coach
        if ($trainer->email) {
            $coachReplacements = [
                'gym_name' => $gymName,
                'client_name' => $memberName,
                'trainer_name' => $trainerName,
                'appointment_date' => $formattedDate,
                'appointment_time' => $appointmentTime,
            ];
            self::sendEmail('appointment_cancelled', $trainer->email, $coachReplacements, $gymId);
        }
    }

    /**
     * Helper method for workout assigned notifications
     * Returns detailed status for member notification so frontend can debug.
     *
     * @return array{
     *   member: array{success: bool, error: ?string}
     * }
     */
    public static function workoutAssigned($assignment, $member, $workout, $gymId = 1, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        $workoutName = $workout->exercise_name ?? $workout->name ?? 'Workout';
        
        // Build payload for the data column
        $payload = [
            'assignment_id' => $assignment->id,
            'member_id' => $member->id,
            'workout_id' => $workout->id,
            'workout_name' => $workoutName,
        ];
        
        $senderId = $performedByUserId ?? 1;
        
        $results = [
            'member' => ['success' => false, 'error' => null],
        ];
        
        // Admin notifications (exclude admin who assigned it)
        self::createForAdmins(
            'workout_assigned',
            'Workout Assigned',
            "Workout '{$workoutName}' has been assigned to {$memberName}.",
            'fa-dumbbell',
            'success',
            'workout_assignment',
            $assignment->id,
            $gymId,
            $performedByUserId,
            $senderId,
            $payload
        );
        
        // Member notification - uses user_id (from createForMember)
        $memberNotification = self::createForMember(
            $member->id,
            'workout_assigned',
            'New Workout Assigned',
            "You have been assigned a new workout: '{$workoutName}'.",
            'fa-dumbbell',
            'success',
            'workout_assignment',
            $assignment->id,
            $senderId,
            $payload
        );
        
        if ($memberNotification instanceof AdminNotification) {
            $results['member']['success'] = true;
        } else {
            // Check if it's an error array
            if (is_array($memberNotification) && isset($memberNotification['error'])) {
                $results['member']['error'] = $memberNotification['error'];
            } else {
                $results['member']['error'] = 'Member notification was not created (see logs for details).';
            }
        }

        // Send workout assignment email to member (if email exists)
        if ($member->email) {
            $gymName = self::getGymName($gymId);
            $replacements = [
                'gym_name' => $gymName,
                'client_name' => $memberName,
                'workout_name' => $workoutName,
            ];
            self::sendEmail('workout_assigned', $member->email, $replacements, $gymId);
        }

        return $results;
    }

    /**
     * Helper method for workout completed notifications
     */
    public static function workoutCompleted($assignment, $member, $workout, $gymId = 1, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        $workoutName = $workout->exercise_name ?? $workout->name ?? 'Workout';
        
        // Admin notifications (exclude admin who marked it complete)
        self::createForAdmins(
            'workout_completed',
            'Workout Completed',
            "{$memberName} has completed the workout '{$workoutName}'.",
            'fa-check-circle',
            'success',
            'workout_assignment',
            $assignment->id,
            $gymId,
            $performedByUserId
        );
        
        // Member notification
        self::createForMember(
            $member->id,
            'workout_completed',
            'Workout Completed',
            "Congratulations! You have completed the workout '{$workoutName}'.",
            'fa-check-circle',
            'success',
            'workout_assignment',
            $assignment->id
        );
    }

    /**
     * Helper method for challenge created notifications
     */
    public static function challengeCreated($challenge, $gymId = 1, $coach = null, $performedByUserId = null)
    {
        $challengeName = $challenge->name ?? 'Challenge';
        $coachName = $coach ? trim(($coach->first_name ?? '') . ' ' . ($coach->last_name ?? '')) : null;
        
        // Admin notifications (exclude admin who created it)
        self::createForAdmins(
            'challenge_created',
            'New Challenge Created',
            $coachName 
                ? "Coach {$coachName} has created a new challenge: '{$challengeName}'."
                : "A new challenge '{$challengeName}' has been created.",
            'fa-trophy',
            'warning',
            'challenge',
            $challenge->id,
            $gymId,
            $performedByUserId
        );
        
        // Coach notification (if created by coach)
        if ($coach) {
            self::createForCoach(
                $coach->id,
                'challenge_created',
                'Challenge Created',
                "You have successfully created the challenge '{$challengeName}'.",
                'fa-trophy',
                'warning',
                'challenge',
                $challenge->id
            );
        }
    }

    /**
     * Helper method for challenge joined notifications
     */
    /**
     * Helper method for challenge joined/assigned notifications
     * Returns detailed status for member notification so frontend can debug.
     *
     * @return array{
     *   member: array{success: bool, error: ?string},
     *   coach: array{success: bool, error: ?string}
     * }
     */
    public static function challengeJoined($challenge, $member, $gymId = 1, $coach = null, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        $challengeName = $challenge->name ?? 'Challenge';
        
        // Build payload for the data column
        $payload = [
            'challenge_id' => $challenge->id,
            'member_id' => $member->id,
            'challenge_name' => $challengeName,
            'coach_id' => $challenge->coach_id ?? null,
        ];
        
        $senderId = $performedByUserId ?? 1;
        
        $results = [
            'member' => ['success' => false, 'error' => null],
            'coach' => ['success' => false, 'error' => null],
        ];
        
        // Admin notifications (exclude admin who added member to challenge)
        self::createForAdmins(
            'challenge_joined',
            'Member Joined Challenge',
            "{$memberName} has joined the challenge '{$challengeName}'.",
            'fa-user-plus',
            'info',
            'challenge',
            $challenge->id,
            $gymId,
            $performedByUserId,
            $senderId,
            $payload
        );
        
        // Member notification - uses user_id (from createForMember)
        $memberNotification = self::createForMember(
            $member->id,
            'challenge_joined',
            'Challenge Joined',
            "You have successfully joined the challenge '{$challengeName}'. Good luck!",
            'fa-user-plus',
            'info',
            'challenge',
            $challenge->id,
            $senderId,
            $payload
        );
        
        if ($memberNotification instanceof AdminNotification) {
            $results['member']['success'] = true;
        } else {
            // Check if it's an error array
            if (is_array($memberNotification) && isset($memberNotification['error'])) {
                $results['member']['error'] = $memberNotification['error'];
            } else {
                $results['member']['error'] = 'Member notification was not created (see logs for details).';
            }
        }
        
        // Coach notification (if challenge has a coach)
        if ($coach) {
            $coachNotification = self::createForCoach(
                $coach->id,
                'challenge_joined',
                'Member Joined Challenge',
                "{$memberName} has joined your challenge '{$challengeName}'.",
                'fa-user-plus',
                'info',
                'challenge',
                $challenge->id,
                $senderId,
                $payload
            );
            
            if ($coachNotification instanceof AdminNotification) {
                $results['coach']['success'] = true;
            } else {
                // Check if it's an error array
                if (is_array($coachNotification) && isset($coachNotification['error'])) {
                    $results['coach']['error'] = $coachNotification['error'];
                } else {
                    $results['coach']['error'] = 'Coach notification was not created (see logs for details).';
                }
            }
        } else {
            // No coach, so mark as success (not applicable)
            $results['coach']['success'] = true;
        }
        
        return $results;
    }

    /**
     * Helper method for challenge completed notifications
     */
    public static function challengeCompleted($challenge, $member, $gymId = 1, $coach = null, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        $challengeName = $challenge->name ?? 'Challenge';
        
        // Admin notifications (exclude admin who marked it complete)
        self::createForAdmins(
            'challenge_completed',
            'Challenge Completed',
            "{$memberName} has completed the challenge '{$challengeName}'.",
            'fa-check-circle',
            'success',
            'challenge',
            $challenge->id,
            $gymId,
            $performedByUserId
        );
        
        // Member notification
        self::createForMember(
            $member->id,
            'challenge_completed',
            'Challenge Completed',
            "Congratulations! You have completed the challenge '{$challengeName}'.",
            'fa-check-circle',
            'success',
            'challenge',
            $challenge->id
        );
        
        // Coach notification (if challenge has a coach)
        if ($coach) {
            self::createForCoach(
                $coach->id,
                'challenge_completed',
                'Member Completed Challenge',
                "{$memberName} has completed your challenge '{$challengeName}'.",
                'fa-check-circle',
                'success',
                'challenge',
                $challenge->id
            );
        }
    }

    /**
     * Helper method for nutrition assigned notifications
     * Returns detailed status for member notification so frontend can debug.
     *
     * @return array{
     *   member: array{success: bool, error: ?string}
     * }
     */
    public static function nutritionAssigned($assignment, $member, $gymId = 1, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        $planName = $assignment->plan ?? 'Nutrition Plan';
        
        // Build payload for the data column
        $payload = [
            'assignment_id' => $assignment->id,
            'member_id' => $member->id,
            'template_id' => $assignment->template_id ?? null,
            'plan_name' => $planName,
        ];
        
        $senderId = $performedByUserId ?? 1;
        
        $results = [
            'member' => ['success' => false, 'error' => null],
        ];
        
        // Admin notifications (exclude admin who assigned it)
        self::createForAdmins(
            'nutrition_assigned',
            'Nutrition Plan Assigned',
            "Nutrition plan '{$planName}' has been assigned to {$memberName}.",
            'fa-utensils',
            'info',
            'nutrition_assignment',
            $assignment->id,
            $gymId,
            $performedByUserId,
            $senderId,
            $payload
        );
        
        // Member notification - uses user_id (from createForMember)
        $memberNotification = self::createForMember(
            $member->id,
            'nutrition_assigned',
            'New Nutrition Plan Assigned',
            "You have been assigned a new nutrition plan: '{$planName}'.",
            'fa-utensils',
            'info',
            'nutrition_assignment',
            $assignment->id,
            $senderId,
            $payload
        );
        
        if ($memberNotification instanceof AdminNotification) {
            $results['member']['success'] = true;
        } else {
            // Check if it's an error array
            if (is_array($memberNotification) && isset($memberNotification['error'])) {
                $results['member']['error'] = $memberNotification['error'];
            } else {
                $results['member']['error'] = 'Member notification was not created (see logs for details).';
            }
        }

        // Send nutrition assignment email to member (if email exists)
        if ($member->email) {
            $gymName = self::getGymName($gymId);
            $replacements = [
                'gym_name' => $gymName,
                'client_name' => $memberName,
                'plan_name' => $planName,
            ];
            self::sendEmail('nutrition_assigned', $member->email, $replacements, $gymId);
        }

        return $results;
    }

    /**
     * Helper method for nutrition updated notifications
     */
    public static function nutritionUpdated($assignment, $member, $gymId = 1, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        $planName = $assignment->plan ?? 'Nutrition Plan';
        
        // Admin notifications (exclude admin who updated it)
        self::createForAdmins(
            'nutrition_updated',
            'Nutrition Plan Updated',
            "Nutrition plan '{$planName}' for {$memberName} has been updated.",
            'fa-edit',
            'warning',
            'nutrition_assignment',
            $assignment->id,
            $gymId,
            $performedByUserId
        );
        
        // Member notification
        self::createForMember(
            $member->id,
            'nutrition_updated',
            'Nutrition Plan Updated',
            "Your nutrition plan '{$planName}' has been updated.",
            'fa-edit',
            'warning',
            'nutrition_assignment',
            $assignment->id
        );
    }

    /**
     * Helper method for nutrition logged notifications
     */
    public static function nutritionLogged($member, $gymId = 1, $coach = null, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        
        // Admin notifications (member logged it, so no exclusion needed, but keep parameter for consistency)
        self::createForAdmins(
            'nutrition_logged',
            'Nutrition Entry Logged',
            "{$memberName} has logged a new nutrition entry.",
            'fa-clipboard-list',
            'info',
            'member',
            $member->id,
            $gymId,
            $performedByUserId
        );
        
        // Coach notification (if member has assigned coach)
        if ($coach) {
            self::createForCoach(
                $coach->id,
                'nutrition_logged',
                'Member Logged Nutrition',
                "{$memberName} has logged a new nutrition entry.",
                'fa-clipboard-list',
                'info',
                'member',
                $member->id
            );
        }
    }

    /**
     * Helper method for post created notifications
     */
    public static function postCreated($post, $author, $gymId = 1, $performedByUserId = null)
    {
        $authorName = trim(($author->firstname ?? '') . ' ' . ($author->lastname ?? '')) 
            ?? trim(($author->first_name ?? '') . ' ' . ($author->last_name ?? ''))
            ?? $author->username ?? 'User';
        
        // Admin notifications (exclude admin who created the post)
        self::createForAdmins(
            'post_created',
            'New Post Created',
            "{$authorName} has created a new post in the community.",
            'fa-comments',
            'primary',
            'post',
            $post->id,
            $gymId,
            $performedByUserId
        );
    }

    /**
     * Helper method for comment added notifications
     */
    public static function commentAdded($comment, $post, $commenter, $postAuthor, $gymId = 1)
    {
        $commenterName = trim(($commenter->firstname ?? '') . ' ' . ($commenter->lastname ?? ''))
            ?? trim(($commenter->first_name ?? '') . ' ' . ($commenter->last_name ?? ''))
            ?? $commenter->username ?? 'Someone';
        
        // Notify post author (if different from commenter)
        if ($postAuthor && $postAuthor->id != $commenter->id) {
            if (isset($postAuthor->member_id) || (isset($postAuthor->id) && \App\Models\Member::find($postAuthor->id))) {
                // It's a member
                $member = \App\Models\Member::find($postAuthor->id ?? $postAuthor->member_id);
                if ($member) {
                    self::createForMember(
                        $member->id,
                        'comment_added',
                        'New Comment on Your Post',
                        "{$commenterName} commented on your post.",
                        'fa-comment',
                        'info',
                        'post',
                        $post->id
                    );
                }
            }
        }
    }

    /**
     * Helper method for post liked notifications
     */
    public static function postLiked($post, $liker, $postAuthor, $gymId = 1)
    {
        $likerName = trim(($liker->firstname ?? '') . ' ' . ($liker->lastname ?? ''))
            ?? trim(($liker->first_name ?? '') . ' ' . ($liker->last_name ?? ''))
            ?? $liker->username ?? 'Someone';
        
        // Notify post author (if different from liker)
        if ($postAuthor && $postAuthor->id != $liker->id) {
            if (isset($postAuthor->member_id) || (isset($postAuthor->id) && \App\Models\Member::find($postAuthor->id))) {
                // It's a member
                $member = \App\Models\Member::find($postAuthor->id ?? $postAuthor->member_id);
                if ($member) {
                    self::createForMember(
                        $member->id,
                        'post_liked',
                        'Your Post Was Liked',
                        "{$likerName} liked your post.",
                        'fa-heart',
                        'danger',
                        'post',
                        $post->id
                    );
                }
            }
        }
    }

    /**
     * Helper method for check-in notifications
     */
    public static function checkIn($checkIn, $member, $gymId = 1, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        
        // Admin notifications (exclude admin who checked in the member)
        self::createForAdmins(
            'check_in',
            'Member Checked In',
            "{$memberName} has checked in.",
            'fa-sign-in-alt',
            'success',
            'check_in',
            $checkIn->id,
            $gymId,
            $performedByUserId
        );
        
        // Member notification
        self::createForMember(
            $member->id,
            'check_in',
            'Check-In Successful',
            "You have successfully checked in. Welcome!",
            'fa-sign-in-alt',
            'success',
            'check_in',
            $checkIn->id
        );
    }

    /**
     * Helper method for check-out notifications
     */
    public static function checkOut($checkIn, $member, $gymId = 1, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        
        // Admin notifications (exclude admin who checked out the member)
        self::createForAdmins(
            'check_out',
            'Member Checked Out',
            "{$memberName} has checked out.",
            'fa-sign-out-alt',
            'info',
            'check_in',
            $checkIn->id,
            $gymId,
            $performedByUserId
        );
    }

    /**
     * Helper method for check-in milestone notifications
     */
    public static function checkInMilestone($member, $milestone, $gymId = 1, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        
        // Admin notifications (milestone is automatic, so no exclusion needed, but keep parameter for consistency)
        self::createForAdmins(
            'check_in_milestone',
            'Check-In Milestone Reached',
            "{$memberName} has reached a milestone: {$milestone} check-ins!",
            'fa-star',
            'warning',
            'member',
            $member->id,
            $gymId,
            $performedByUserId
        );
        
        // Member notification
        self::createForMember(
            $member->id,
            'check_in_milestone',
            'Milestone Reached!',
            "Congratulations! You have reached {$milestone} check-ins!",
            'fa-star',
            'warning',
            'member',
            $member->id
        );
    }

    /**
     * Helper method for invoice created notifications
     */
    public static function invoiceCreated($invoice, $member, $gymId = 1, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        $amount = number_format($invoice->amount, 2);
        $invoiceNumber = $invoice->invoice_number ?? 'N/A';
        
        // Admin notifications (exclude admin who created it)
        self::createForAdmins(
            'invoice_created',
            'New Invoice Created',
            "Invoice #{$invoiceNumber} for {$memberName} (Amount: \${$amount}) has been created.",
            'fa-file-invoice-dollar',
            'warning',
            'invoice',
            $invoice->id,
            $gymId,
            $performedByUserId
        );
        
        // Member notification
        self::createForMember(
            $member->id,
            'invoice_created',
            'New Invoice',
            "A new invoice #{$invoiceNumber} (Amount: \${$amount}) has been created for you.",
            'fa-file-invoice-dollar',
            'warning',
            'invoice',
            $invoice->id
        );
    }

    /**
     * Helper method for invoice paid notifications
     */
    public static function invoicePaid($invoice, $member, $gymId = 1, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        $amount = number_format($invoice->amount, 2);
        $invoiceNumber = $invoice->invoice_number ?? 'N/A';
        
        // Admin notifications (exclude admin who marked it as paid)
        self::createForAdmins(
            'invoice_paid',
            'Invoice Paid',
            "Invoice #{$invoiceNumber} for {$memberName} (Amount: \${$amount}) has been paid.",
            'fa-check-circle',
            'success',
            'invoice',
            $invoice->id,
            $gymId,
            $performedByUserId
        );
        
        // Member notification
        self::createForMember(
            $member->id,
            'invoice_paid',
            'Invoice Paid',
            "Thank you! Invoice #{$invoiceNumber} (Amount: \${$amount}) has been paid successfully.",
            'fa-check-circle',
            'success',
            'invoice',
            $invoice->id
        );
    }

    /**
     * Helper method for invoice overdue notifications
     */
    public static function invoiceOverdue($invoice, $member, $gymId = 1, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        $amount = number_format($invoice->amount, 2);
        $invoiceNumber = $invoice->invoice_number ?? 'N/A';
        
        // Admin notifications (overdue is automatic, so no exclusion needed, but keep parameter for consistency)
        self::createForAdmins(
            'invoice_overdue',
            'Invoice Overdue',
            "Invoice #{$invoiceNumber} for {$memberName} (Amount: \${$amount}) is now overdue.",
            'fa-exclamation-triangle',
            'danger',
            'invoice',
            $invoice->id,
            $gymId,
            $performedByUserId
        );
        
        // Member notification
        self::createForMember(
            $member->id,
            'invoice_overdue',
            'Invoice Overdue',
            "Your invoice #{$invoiceNumber} (Amount: \${$amount}) is now overdue. Please make payment as soon as possible.",
            'fa-exclamation-triangle',
            'danger',
            'invoice',
            $invoice->id
        );
    }

    /**
     * Helper method for coach assigned to member notifications
     * Returns detailed status for member and coach notifications so frontend can debug.
     *
     * @return array{
     *   member: array{success: bool, error: ?string},
     *   coach: array{success: bool, error: ?string}
     * }
     */
    public static function coachAssigned($assignment, $member, $coach, $gymId = 1, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        $coachName = trim(($coach->first_name ?? '') . ' ' . ($coach->last_name ?? ''));
        
        // Build payload for the data column
        $payload = [
            'assignment_id' => $assignment->id,
            'member_id' => $member->id,
            'coach_id' => $coach->id,
            'coach_name' => $coachName,
        ];
        
        $senderId = $performedByUserId ?? 1;
        
        $results = [
            'member' => ['success' => false, 'error' => null],
            'coach' => ['success' => false, 'error' => null],
        ];
        
        // Admin notifications (exclude admin who assigned it)
        self::createForAdmins(
            'coach_assigned',
            'Coach Assigned to Member',
            "Coach {$coachName} has been assigned to member {$memberName}.",
            'fa-user-tie',
            'success',
            'coach_assignment',
            $assignment->id,
            $gymId,
            $performedByUserId,
            $senderId,
            $payload
        );
        
        // Member notification - uses user_id (from createForMember)
        $memberNotification = self::createForMember(
            $member->id,
            'coach_assigned',
            'Coach Assigned',
            "Coach {$coachName} has been assigned to you as your trainer.",
            'fa-user-tie',
            'success',
            'coach_assignment',
            $assignment->id,
            $senderId,
            $payload
        );
        
        if ($memberNotification instanceof AdminNotification) {
            $results['member']['success'] = true;
        } else {
            // Check if it's an error array
            if (is_array($memberNotification) && isset($memberNotification['error'])) {
                $results['member']['error'] = $memberNotification['error'];
            } else {
                $results['member']['error'] = 'Member notification was not created (see logs for details).';
            }
        }
        
        // Coach notification
        $coachNotification = self::createForCoach(
            $coach->id,
            'coach_assigned',
            'New Member Assigned',
            "Member {$memberName} has been assigned to you.",
            'fa-user-plus',
            'success',
            'coach_assignment',
            $assignment->id,
            $senderId,
            $payload
        );
        
        if ($coachNotification instanceof AdminNotification) {
            $results['coach']['success'] = true;
        } else {
            // Check if it's an error array
            if (is_array($coachNotification) && isset($coachNotification['error'])) {
                $results['coach']['error'] = $coachNotification['error'];
            } else {
                $results['coach']['error'] = 'Coach notification was not created (see logs for details).';
            }
        }
        
        return $results;
    }

    /**
     * Helper method for coach unassigned from member notifications
     */
    public static function coachUnassigned($assignment, $member, $coach, $gymId = 1, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        $coachName = trim(($coach->first_name ?? '') . ' ' . ($coach->last_name ?? ''));
        
        // Admin notifications (exclude admin who unassigned it)
        self::createForAdmins(
            'coach_unassigned',
            'Coach Unassigned from Member',
            "Coach {$coachName} has been unassigned from member {$memberName}.",
            'fa-user-minus',
            'warning',
            'coach_assignment',
            $assignment->id,
            $gymId,
            $performedByUserId
        );
        
        // Member notification
        self::createForMember(
            $member->id,
            'coach_unassigned',
            'Coach Unassigned',
            "Coach {$coachName} has been unassigned from you.",
            'fa-user-minus',
            'warning',
            'coach_assignment',
            $assignment->id
        );
        
        // Coach notification
        self::createForCoach(
            $coach->id,
            'coach_unassigned',
            'Member Unassigned',
            "Member {$memberName} has been unassigned from you.",
            'fa-user-minus',
            'warning',
            'coach_assignment',
            $assignment->id
        );
    }

    /**
     * Helper method for schedule assigned notifications
     * Returns detailed status for member notification so frontend can debug.
     *
     * @param ScheduleEvent $event The schedule event
     * @param Member $member The member being assigned
     * @param int $gymId Gym ID
     * @param int|null $performedByUserId User ID who performed the action
     * @return array{
     *   member: array{success: bool, error: ?string}
     * }
     */
    public static function scheduleAssigned($event, $member, $gymId = 1, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        $eventTitle = $event->title ?? 'Schedule Event';
        
        // Format date to remove time portion (00:00:00)
        $eventDate = $event->date ?? '';
        if ($eventDate) {
            try {
                // If it's a datetime string, extract just the date part
                if (strpos($eventDate, ' ') !== false) {
                    $eventDate = \Carbon\Carbon::parse($eventDate)->format('Y-m-d');
                }
            } catch (\Exception $e) {
                // If parsing fails, try to extract date part manually
                $eventDate = explode(' ', $eventDate)[0];
            }
        }
        
        $eventTime = ($event->start_time ?? '') . ($event->end_time ? ' - ' . $event->end_time : '');
        $dateTime = $eventDate . ($eventTime ? ' at ' . $eventTime : '');
        
        // Build payload for the data column
        $payload = [
            'event_id' => $event->id,
            'member_id' => $member->id,
            'title' => $eventTitle,
            'date' => $eventDate,
            'start_time' => $event->start_time,
            'end_time' => $event->end_time,
            'coach_id' => $event->coach_id,
        ];
        
        $senderId = $performedByUserId ?? 1;
        
        $results = [
            'member' => ['success' => false, 'error' => null],
        ];
        
        // Admin notifications (exclude admin who assigned it)
        self::createForAdmins(
            'schedule_assigned',
            'Schedule Assigned',
            "Schedule '{$eventTitle}' has been assigned to {$memberName} on {$dateTime}.",
            'fa-calendar',
            'info',
            'schedule_event',
            $event->id,
            $gymId,
            $performedByUserId,
            $senderId,
            $payload
        );
        
        // Member notification - uses user_id (from createForMember)
        $memberNotification = self::createForMember(
            $member->id,
            'schedule_assigned',
            'Schedule Assigned',
            "You have been assigned to '{$eventTitle}' on {$dateTime}.",
            'fa-calendar',
            'info',
            'schedule_event',
            $event->id,
            $senderId,
            $payload
        );
        
        if ($memberNotification instanceof AdminNotification) {
            $results['member']['success'] = true;
        } else {
            // Check if it's an error array
            if (is_array($memberNotification) && isset($memberNotification['error'])) {
                $results['member']['error'] = $memberNotification['error'];
            } else {
                $results['member']['error'] = 'Member notification was not created (see logs for details).';
            }
        }
        
        // Send email to member
        if ($member->email) {
            $gymName = self::getGymName($gymId);
            
            // Format event date for display
            $formattedDate = '';
            if ($eventDate) {
                try {
                    $formattedDate = Carbon::parse($eventDate)->format('F j, Y');
                } catch (\Exception $e) {
                    $formattedDate = $eventDate;
                }
            }
            
            // Get coach name if coach is assigned
            $coachName = 'N/A';
            if ($event->coach_id) {
                try {
                    $coach = Coach::find($event->coach_id);
                    if ($coach) {
                        $coachName = trim(($coach->first_name ?? '') . ' ' . ($coach->last_name ?? ''));
                    }
                } catch (\Exception $e) {
                    Log::warning("Failed to get coach for schedule email", ['coach_id' => $event->coach_id]);
                }
            }
            
            $eventTimeFormatted = $eventTime ?: 'TBD';
            
            $replacements = [
                'gym_name' => $gymName,
                'client_name' => $memberName,
                'event_title' => $eventTitle,
                'event_date' => $formattedDate,
                'event_time' => $eventTimeFormatted,
                'coach_name' => $coachName,
            ];
            
            self::sendEmail('schedule_assigned', $member->email, $replacements, $gymId);
        }
        
        return $results;
    }

    /**
     * Helper method for message sent notifications
     * Notifies the recipient when they receive a new message
     *
     * @param MemberMessage $message The message that was sent
     * @param int $gymId Gym ID
     * @param int|null $performedByUserId User ID who sent the message
     * @return array{
     *   recipient: array{success: bool, error: ?string}
     * }
     */
    public static function messageSent($message, $gymId = 1, $performedByUserId = null)
    {
        $senderName = 'Someone';
        $messagePreview = mb_substr($message->message_text ?? $message->message ?? '', 0, 50);
        if (strlen($messagePreview) < strlen($message->message_text ?? $message->message ?? '')) {
            $messagePreview .= '...';
        }
        
        // Get sender name and type
        $senderType = 'unknown';
        if ($message->sender_member_id) {
            $sender = Member::find($message->sender_member_id);
            if ($sender) {
                $senderName = trim(($sender->firstname ?? '') . ' ' . ($sender->lastname ?? '')) ?: 'Member';
                $senderType = 'member';
            }
        } elseif ($message->sender_coach_id) {
            $sender = Coach::find($message->sender_coach_id);
            if ($sender) {
                $senderName = trim(($sender->first_name ?? '') . ' ' . ($sender->last_name ?? '')) ?: 'Coach';
                $senderType = 'coach';
            }
        } elseif ($message->sender_admin_id) {
            $sender = User::find($message->sender_admin_id);
            if ($sender) {
                $senderName = trim(($sender->firstname ?? '') . ' ' . ($sender->lastname ?? '')) ?: $sender->name ?? 'Admin';
                $senderType = 'admin';
            }
        }
        
        $payload = [
            'message_id' => $message->id,
            'sender_id' => $message->sender_member_id ?? $message->sender_coach_id ?? $message->sender_admin_id,
            'sender_type' => $senderType,
        ];
        
        $senderId = $performedByUserId ?? 1;
        
        $results = [
            'recipient' => ['success' => false, 'error' => null],
        ];
        
        // Log notification attempt
        Log::info('NotificationService::messageSent - Creating notification', [
            'message_id' => $message->id,
            'sender_type' => $senderType,
            'sender_name' => $senderName,
            'receiver_member_id' => $message->receiver_member_id,
            'receiver_coach_id' => $message->receiver_coach_id,
            'receiver_admin_id' => $message->receiver_admin_id,
            'gym_id' => $gymId,
        ]);
        
        // Notify recipient based on recipient type
        // Member → Coach: receiver_coach_id is set
        // Coach → Member: receiver_member_id is set
        // Check receiver_member_id first, but skip if it's 0 (used as placeholder when sending to coach)
        if ($message->receiver_member_id && $message->receiver_member_id != 0) {
            // Coach sending to Member
            Log::info('NotificationService::messageSent - Creating notification for member', [
                'member_id' => $message->receiver_member_id,
                'sender_type' => $senderType,
                'sender_name' => $senderName,
            ]);
            
            $memberNotification = self::createForMember(
                $message->receiver_member_id,
                'message_received',
                'New Message',
                "You have a new message from {$senderName}: {$messagePreview}",
                'fa-envelope',
                'info',
                'message',
                $message->id,
                $senderId,
                $payload
            );
            
            if ($memberNotification instanceof AdminNotification) {
                $results['recipient']['success'] = true;
                Log::info('NotificationService::messageSent - Member notification created successfully', [
                    'member_id' => $message->receiver_member_id,
                    'notification_id' => $memberNotification->id,
                ]);
            } else {
                if (is_array($memberNotification) && isset($memberNotification['error'])) {
                    $results['recipient']['error'] = $memberNotification['error'];
                } else {
                    $results['recipient']['error'] = 'Member notification was not created (see logs for details).';
                }
                Log::warning('NotificationService::messageSent - Failed to create member notification', [
                    'member_id' => $message->receiver_member_id,
                    'error' => $results['recipient']['error'],
                ]);
            }
        } elseif ($message->receiver_coach_id) {
            // Member sending to Coach
            Log::info('NotificationService::messageSent - Creating notification for coach', [
                'coach_id' => $message->receiver_coach_id,
                'sender_type' => $senderType,
                'sender_name' => $senderName,
            ]);
            
            $coachNotification = self::createForCoach(
                $message->receiver_coach_id,
                'message_received',
                'New Message',
                "You have a new message from {$senderName}: {$messagePreview}",
                'fa-envelope',
                'info',
                'message',
                $message->id,
                $senderId,
                $payload
            );
            
            if ($coachNotification instanceof AdminNotification) {
                $results['recipient']['success'] = true;
                Log::info('NotificationService::messageSent - Coach notification created successfully', [
                    'coach_id' => $message->receiver_coach_id,
                    'notification_id' => $coachNotification->id,
                ]);
            } else {
                if (is_array($coachNotification) && isset($coachNotification['error'])) {
                    $results['recipient']['error'] = $coachNotification['error'];
                } else {
                    $results['recipient']['error'] = 'Coach notification was not created (see logs for details).';
                }
                Log::warning('NotificationService::messageSent - Failed to create coach notification', [
                    'coach_id' => $message->receiver_coach_id,
                    'error' => $results['recipient']['error'],
                ]);
            }
        } elseif ($message->receiver_admin_id) {
            // For admin recipients, create notification directly
            Log::info('NotificationService::messageSent - Creating notification for admin', [
                'admin_id' => $message->receiver_admin_id,
                'sender_type' => $senderType,
                'sender_name' => $senderName,
            ]);
            
            try {
                $adminUser = User::find($message->receiver_admin_id);
                if ($adminUser) {
                    $adminNotification = AdminNotification::create([
                        'user_id' => $adminUser->id,
                        'gym_id' => $adminUser->gym_id ?? $gymId,
                        'sender_id' => $senderId,
                        'data' => $payload,
                        'type' => 'message_received',
                        'title' => 'New Message',
                        'message' => "You have a new message from {$senderName}: {$messagePreview}",
                        'icon' => 'fa-envelope',
                        'color' => 'info',
                        'related_type' => 'message',
                        'related_id' => $message->id,
                        'is_read' => false,
                    ]);
                    $results['recipient']['success'] = true;
                    Log::info('NotificationService::messageSent - Admin notification created successfully', [
                        'admin_id' => $message->receiver_admin_id,
                        'notification_id' => $adminNotification->id,
                    ]);
                } else {
                    $results['recipient']['error'] = 'Admin user not found';
                    Log::warning('NotificationService::messageSent - Admin user not found', [
                        'admin_id' => $message->receiver_admin_id,
                    ]);
                }
            } catch (\Exception $e) {
                $results['recipient']['error'] = $e->getMessage();
                Log::error('NotificationService::messageSent - Failed to create admin notification', [
                    'admin_id' => $message->receiver_admin_id,
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                ]);
            }
        } else {
            // No recipient found
            $results['recipient']['error'] = 'No recipient ID found in message';
            Log::warning('NotificationService::messageSent - No recipient ID found', [
                'message_id' => $message->id,
                'receiver_member_id' => $message->receiver_member_id,
                'receiver_coach_id' => $message->receiver_coach_id,
                'receiver_admin_id' => $message->receiver_admin_id,
            ]);
        }
        
        return $results;
    }

    /**
     * Helper method for task created notifications
     * Returns detailed status for notifications so frontend can debug.
     *
     * @return array{
     *   assigned_to: array{success: bool, error: ?string},
     *   member: array{success: bool, error: ?string},
     *   coach: array{success: bool, error: ?string}
     * }
     */
    public static function taskCreated($task, $gymId = 1, $performedByUserId = null)
    {
        $taskTitle = $task->title ?? 'Task';
        $priority = ucfirst(strtolower($task->priority ?? 'Medium'));
        
        $payload = [
            'task_id' => $task->id,
            'title' => $taskTitle,
            'priority' => $task->priority,
            'category' => $task->category,
            'due_date' => $task->due_date,
        ];
        
        $senderId = $performedByUserId ?? 1;
        
        $results = [
            'assigned_to' => ['success' => false, 'error' => null],
            'member' => ['success' => false, 'error' => null],
            'coach' => ['success' => false, 'error' => null],
        ];
        
        // Admin notifications (exclude admin who created it)
        self::createForAdmins(
            'task_created',
            'New Task Created',
            "A new task '{$taskTitle}' ({$priority} priority) has been created.",
            'fa-tasks',
            'info',
            'task',
            $task->id,
            $gymId,
            $performedByUserId,
            $senderId,
            $payload
        );
        
        // Notify assigned user (if assigned to a specific admin)
        if ($task->assigned_to) {
            try {
                $assignedUser = User::find($task->assigned_to);
                if ($assignedUser) {
                    AdminNotification::create([
                        'user_id' => $assignedUser->id,
                        'gym_id' => $assignedUser->gym_id ?? $gymId,
                        'sender_id' => $senderId,
                        'data' => $payload,
                        'type' => 'task_assigned',
                        'title' => 'Task Assigned to You',
                        'message' => "You have been assigned a new task: '{$taskTitle}' ({$priority} priority).",
                        'icon' => 'fa-tasks',
                        'color' => 'warning',
                        'related_type' => 'task',
                        'related_id' => $task->id,
                        'is_read' => false,
                    ]);
                    $results['assigned_to']['success'] = true;
                } else {
                    $results['assigned_to']['error'] = 'Assigned user not found';
                }
            } catch (\Exception $e) {
                $results['assigned_to']['error'] = $e->getMessage();
                Log::error('Failed to create task assignment notification: ' . $e->getMessage());
            }
        } else {
            $results['assigned_to']['success'] = true; // Not applicable
        }
        
        // Notify member (if task is for a member)
        if ($task->member_id) {
            $memberNotification = self::createForMember(
                $task->member_id,
                'task_created',
                'New Task Created',
                "A new task '{$taskTitle}' has been created for you.",
                'fa-tasks',
                'info',
                'task',
                $task->id,
                $senderId,
                $payload
            );
            
            if ($memberNotification instanceof AdminNotification) {
                $results['member']['success'] = true;
            } else {
                if (is_array($memberNotification) && isset($memberNotification['error'])) {
                    $results['member']['error'] = $memberNotification['error'];
                } else {
                    $results['member']['error'] = 'Member notification was not created (see logs for details).';
                }
            }
        } else {
            $results['member']['success'] = true; // Not applicable
        }
        
        // Notify coach (if task is for a coach)
        if ($task->coach_id) {
            $coachNotification = self::createForCoach(
                $task->coach_id,
                'task_created',
                'New Task Created',
                "A new task '{$taskTitle}' has been created for you.",
                'fa-tasks',
                'info',
                'task',
                $task->id,
                $senderId,
                $payload
            );
            
            if ($coachNotification instanceof AdminNotification) {
                $results['coach']['success'] = true;
            } else {
                if (is_array($coachNotification) && isset($coachNotification['error'])) {
                    $results['coach']['error'] = $coachNotification['error'];
                } else {
                    $results['coach']['error'] = 'Coach notification was not created (see logs for details).';
                }
            }
        } else {
            $results['coach']['success'] = true; // Not applicable
        }
        
        return $results;
    }

    /**
     * Helper method for task updated notifications
     */
    public static function taskUpdated($task, $gymId = 1, $performedByUserId = null)
    {
        $taskTitle = $task->title ?? 'Task';
        
        // Admin notifications (exclude admin who updated it)
        self::createForAdmins(
            'task_updated',
            'Task Updated',
            "Task '{$taskTitle}' has been updated.",
            'fa-edit',
            'warning',
            'task',
            $task->id,
            $gymId,
            $performedByUserId
        );
        
        // Notify assigned user (if assigned to a specific admin)
        if ($task->assigned_to) {
            try {
                $assignedUser = User::find($task->assigned_to);
                if ($assignedUser) {
                    AdminNotification::create([
                        'user_id' => $assignedUser->id,
                        'gym_id' => $assignedUser->gym_id ?? $gymId,
                        'sender_id' => $performedByUserId ?? 1,
                        'type' => 'task_updated',
                        'title' => 'Task Updated',
                        'message' => "Task '{$taskTitle}' assigned to you has been updated.",
                        'icon' => 'fa-edit',
                        'color' => 'warning',
                        'related_type' => 'task',
                        'related_id' => $task->id,
                        'is_read' => false,
                    ]);
                }
            } catch (\Exception $e) {
                Log::error('Failed to create task update notification: ' . $e->getMessage());
            }
        }
        
        // Notify member (if task is for a member)
        if ($task->member_id) {
            self::createForMember(
                $task->member_id,
                'task_updated',
                'Task Updated',
                "Task '{$taskTitle}' has been updated.",
                'fa-edit',
                'warning',
                'task',
                $task->id
            );
        }
        
        // Notify coach (if task is for a coach)
        if ($task->coach_id) {
            self::createForCoach(
                $task->coach_id,
                'task_updated',
                'Task Updated',
                "Task '{$taskTitle}' has been updated.",
                'fa-edit',
                'warning',
                'task',
                $task->id
            );
        }
    }

    /**
     * Helper method for task completed notifications
     */
    public static function taskCompleted($task, $gymId = 1, $performedByUserId = null)
    {
        $taskTitle = $task->title ?? 'Task';
        
        // Admin notifications (exclude admin who marked it complete)
        self::createForAdmins(
            'task_completed',
            'Task Completed',
            "Task '{$taskTitle}' has been completed.",
            'fa-check-circle',
            'success',
            'task',
            $task->id,
            $gymId,
            $performedByUserId
        );
        
        // Notify assigned user (if assigned to a specific admin)
        if ($task->assigned_to) {
            try {
                $assignedUser = User::find($task->assigned_to);
                if ($assignedUser) {
                    AdminNotification::create([
                        'user_id' => $assignedUser->id,
                        'gym_id' => $assignedUser->gym_id ?? $gymId,
                        'sender_id' => $performedByUserId ?? 1,
                        'type' => 'task_completed',
                        'title' => 'Task Completed',
                        'message' => "Task '{$taskTitle}' has been completed.",
                        'icon' => 'fa-check-circle',
                        'color' => 'success',
                        'related_type' => 'task',
                        'related_id' => $task->id,
                        'is_read' => false,
                    ]);
                }
            } catch (\Exception $e) {
                Log::error('Failed to create task completion notification: ' . $e->getMessage());
            }
        }
        
        // Notify member (if task is for a member)
        if ($task->member_id) {
            $member = Member::find($task->member_id);
            if ($member) {
                self::createForMember(
                    $task->member_id,
                    'task_completed',
                    'Task Completed',
                    "Task '{$taskTitle}' has been completed.",
                    'fa-check-circle',
                    'success',
                    'task',
                    $task->id
                );
                
                // Notify the member's assigned coach (if member has a coach)
                // First check if member has direct coach_id
                if ($member->coach_id) {
                    self::createForCoach(
                        $member->coach_id,
                        'task_completed',
                        'Member Task Completed',
                        "Member {$member->firstname} {$member->lastname} has completed task '{$taskTitle}'.",
                        'fa-check-circle',
                        'success',
                        'task',
                        $task->id
                    );
                } else {
                    // Try to find coach via CoachAssignment
                    $coachAssignment = CoachAssignment::where('member_id', $task->member_id)
                        ->where('status', 'active')
                        ->first();
                    
                    if ($coachAssignment && $coachAssignment->coach_id) {
                        self::createForCoach(
                            $coachAssignment->coach_id,
                            'task_completed',
                            'Member Task Completed',
                            "Member {$member->firstname} {$member->lastname} has completed task '{$taskTitle}'.",
                            'fa-check-circle',
                            'success',
                            'task',
                            $task->id
                        );
                    }
                }
            }
        }
        
        // Notify coach (if task is for a coach)
        if ($task->coach_id) {
            self::createForCoach(
                $task->coach_id,
                'task_completed',
                'Task Completed',
                "Task '{$taskTitle}' has been completed.",
                'fa-check-circle',
                'success',
                'task',
                $task->id
            );
        }
    }

    /**
     * Helper method for support ticket created notifications
     * Returns detailed status for notifications so frontend can debug.
     *
     * @return array{
     *   admin: array{success: bool, error: ?string}
     * }
     */
    public static function supportTicketCreated($ticket, $gymId = 1, $performedByUserId = null)
    {
        $ticketNumber = $ticket->ticket_number ?? 'N/A';
        $subject = $ticket->subject ?? 'Support Request';
        $priority = ucfirst(strtolower($ticket->priority ?? 'medium'));
        $senderName = $ticket->name ?? 'User';
        
        $payload = [
            'ticket_id' => $ticket->id,
            'ticket_number' => $ticketNumber,
            'subject' => $subject,
            'priority' => $ticket->priority,
            'status' => $ticket->status,
        ];
        
        $senderId = $performedByUserId ?? $ticket->user_id ?? 1;
        
        $results = [
            'admin' => ['success' => false, 'error' => null],
        ];
        
        // Admin notifications (notify all admins about new support ticket)
        $count = self::createForAdmins(
            'support_ticket_created',
            'New Support Ticket',
            "New support ticket #{$ticketNumber} from {$senderName}: {$subject} ({$priority} priority).",
            'fa-life-ring',
            'warning',
            'support',
            $ticket->id,
            $gymId,
            null, // Don't exclude anyone - all admins should see new tickets
            $senderId,
            $payload
        );
        
        if ($count > 0) {
            $results['admin']['success'] = true;
        } else {
            $results['admin']['error'] = 'No admin notifications were created';
        }
        
        return $results;
    }

    /**
     * Helper method for support ticket updated notifications
     */
    public static function supportTicketUpdated($ticket, $gymId = 1, $performedByUserId = null)
    {
        $ticketNumber = $ticket->ticket_number ?? 'N/A';
        $status = ucfirst(str_replace('_', ' ', $ticket->status ?? 'pending'));
        
        // Admin notifications (exclude admin who updated it)
        self::createForAdmins(
            'support_ticket_updated',
            'Support Ticket Updated',
            "Support ticket #{$ticketNumber} status has been updated to: {$status}.",
            'fa-edit',
            'info',
            'support',
            $ticket->id,
            $gymId,
            $performedByUserId
        );
        
        // Notify ticket creator (if they have a user account)
        if ($ticket->user_id) {
            try {
                $user = User::find($ticket->user_id);
                if ($user) {
                    AdminNotification::create([
                        'user_id' => $user->id,
                        'gym_id' => $user->gym_id ?? $gymId,
                        'sender_id' => $performedByUserId ?? 1,
                        'type' => 'support_ticket_updated',
                        'title' => 'Support Ticket Updated',
                        'message' => "Your support ticket #{$ticketNumber} status has been updated to: {$status}.",
                        'icon' => 'fa-edit',
                        'color' => 'info',
                        'related_type' => 'support',
                        'related_id' => $ticket->id,
                        'is_read' => false,
                    ]);
                }
            } catch (\Exception $e) {
                Log::error('Failed to create support ticket update notification: ' . $e->getMessage());
            }
        }
    }

    /**
     * Helper method for support ticket resolved notifications
     */
    public static function supportTicketResolved($ticket, $gymId = 1, $performedByUserId = null)
    {
        $ticketNumber = $ticket->ticket_number ?? 'N/A';
        
        // Admin notifications (exclude admin who resolved it)
        self::createForAdmins(
            'support_ticket_resolved',
            'Support Ticket Resolved',
            "Support ticket #{$ticketNumber} has been resolved.",
            'fa-check-circle',
            'success',
            'support',
            $ticket->id,
            $gymId,
            $performedByUserId
        );
        
        // Notify ticket creator (if they have a user account)
        if ($ticket->user_id) {
            try {
                $user = User::find($ticket->user_id);
                if ($user) {
                    AdminNotification::create([
                        'user_id' => $user->id,
                        'gym_id' => $user->gym_id ?? $gymId,
                        'sender_id' => $performedByUserId ?? 1,
                        'type' => 'support_ticket_resolved',
                        'title' => 'Support Ticket Resolved',
                        'message' => "Your support ticket #{$ticketNumber} has been resolved. Thank you for contacting us!",
                        'icon' => 'fa-check-circle',
                        'color' => 'success',
                        'related_type' => 'support',
                        'related_id' => $ticket->id,
                        'is_read' => false,
                    ]);
                }
            } catch (\Exception $e) {
                Log::error('Failed to create support ticket resolved notification: ' . $e->getMessage());
            }
        }
    }

    /**
     * Helper method for note created notifications
     * Returns detailed status for notifications so frontend can debug.
     *
     * @return array{
     *   member: array{success: bool, error: ?string},
     *   coach: array{success: bool, error: ?string}
     * }
     */
    public static function noteCreated($note, $gymId = 1, $performedByUserId = null)
    {
        $notePreview = mb_substr($note->description ?? '', 0, 50);
        if (strlen($notePreview) < strlen($note->description ?? '')) {
            $notePreview .= '...';
        }
        $category = $note->category ?? 'General';
        $createdByName = $note->created_by_name ?? 'Admin';
        
        $payload = [
            'note_id' => $note->id,
            'category' => $category,
            'is_shared' => $note->is_shared ?? false,
        ];
        
        $senderId = $performedByUserId ?? $note->created_by_user_id ?? 1;
        
        $results = [
            'member' => ['success' => false, 'error' => null],
            'coach' => ['success' => false, 'error' => null],
        ];
        
        // Admin notifications (exclude admin who created it)
        self::createForAdmins(
            'note_created',
            'New Note Created',
            "A new {$category} note has been created by {$createdByName}.",
            'fa-sticky-note',
            'info',
            'note',
            $note->id,
            $gymId,
            $performedByUserId,
            $senderId,
            $payload
        );
        
        // Notify member (if note is for a member)
        // Notify when target_member_id is set (admin created note for member) OR when member_id is set and is_shared is true
        if ($note->target_member_id) {
            // Admin created note for member - always notify the member
            $memberNotification = self::createForMember(
                $note->target_member_id,
                'note_created',
                'New Note Created',
                "A new {$category} note has been created for you: {$notePreview}",
                'fa-sticky-note',
                'info',
                'note',
                $note->id,
                $senderId,
                $payload
            );
            
            if ($memberNotification instanceof AdminNotification) {
                $results['member']['success'] = true;
            } else {
                if (is_array($memberNotification) && isset($memberNotification['error'])) {
                    $results['member']['error'] = $memberNotification['error'];
                } else {
                    $results['member']['error'] = 'Member notification was not created (see logs for details).';
                }
            }
        } elseif ($note->member_id && ($note->is_shared ?? false)) {
            // Member/Coach created note and it's shared - notify the member
            $memberNotification = self::createForMember(
                $note->member_id,
                'note_shared',
                'New Note Shared',
                "A new {$category} note has been shared with you: {$notePreview}",
                'fa-sticky-note',
                'info',
                'note',
                $note->id,
                $senderId,
                $payload
            );
            
            if ($memberNotification instanceof AdminNotification) {
                $results['member']['success'] = true;
            } else {
                if (is_array($memberNotification) && isset($memberNotification['error'])) {
                    $results['member']['error'] = $memberNotification['error'];
                } else {
                    $results['member']['error'] = 'Member notification was not created (see logs for details).';
                }
            }
        } else {
            $results['member']['success'] = true; // Not applicable
        }
        
        // Notify coach (if note is for a coach)
        if ($note->target_coach_id) {
            $coachNotification = self::createForCoach(
                $note->target_coach_id,
                'note_created',
                'New Note Created',
                "A new {$category} note has been created for you: {$notePreview}",
                'fa-sticky-note',
                'info',
                'note',
                $note->id,
                $senderId,
                $payload
            );
            
            if ($coachNotification instanceof AdminNotification) {
                $results['coach']['success'] = true;
            } else {
                if (is_array($coachNotification) && isset($coachNotification['error'])) {
                    $results['coach']['error'] = $coachNotification['error'];
                } else {
                    $results['coach']['error'] = 'Coach notification was not created (see logs for details).';
                }
            }
        } else {
            $results['coach']['success'] = true; // Not applicable
        }
        
        return $results;
    }

    /**
     * Helper method for schedule updated notifications
     * Returns detailed status for member notification so frontend can debug.
     *
     * @return array{
     *   member: array{success: bool, error: ?string}
     * }
     */
    public static function scheduleUpdated($event, $member, $gymId = 1, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        $eventTitle = $event->title ?? 'Schedule Event';
        
        // Format date to remove time portion (00:00:00)
        $eventDate = $event->date ?? '';
        if ($eventDate) {
            try {
                if (strpos($eventDate, ' ') !== false) {
                    $eventDate = \Carbon\Carbon::parse($eventDate)->format('Y-m-d');
                }
            } catch (\Exception $e) {
                $eventDate = explode(' ', $eventDate)[0];
            }
        }
        
        $eventTime = ($event->start_time ?? '') . ($event->end_time ? ' - ' . $event->end_time : '');
        $dateTime = $eventDate . ($eventTime ? ' at ' . $eventTime : '');
        
        $payload = [
            'event_id' => $event->id,
            'member_id' => $member->id,
            'title' => $eventTitle,
            'date' => $eventDate,
            'start_time' => $event->start_time,
            'end_time' => $event->end_time,
        ];
        
        $senderId = $performedByUserId ?? 1;
        
        $results = [
            'member' => ['success' => false, 'error' => null],
        ];
        
        // Admin notifications (exclude admin who updated it)
        self::createForAdmins(
            'schedule_updated',
            'Schedule Updated',
            "Schedule '{$eventTitle}' for {$memberName} has been updated to {$dateTime}.",
            'fa-calendar-alt',
            'warning',
            'schedule_event',
            $event->id,
            $gymId,
            $performedByUserId,
            $senderId,
            $payload
        );
        
        // Member notification
        $memberNotification = self::createForMember(
            $member->id,
            'schedule_updated',
            'Schedule Updated',
            "Your schedule '{$eventTitle}' has been updated to {$dateTime}.",
            'fa-calendar-alt',
            'warning',
            'schedule_event',
            $event->id,
            $senderId,
            $payload
        );
        
        if ($memberNotification instanceof AdminNotification) {
            $results['member']['success'] = true;
        } else {
            if (is_array($memberNotification) && isset($memberNotification['error'])) {
                $results['member']['error'] = $memberNotification['error'];
            } else {
                $results['member']['error'] = 'Member notification was not created (see logs for details).';
            }
        }
        
        return $results;
    }

    /**
     * Helper method for schedule cancelled notifications
     * Returns detailed status for member notification so frontend can debug.
     *
     * @return array{
     *   member: array{success: bool, error: ?string}
     * }
     */
    public static function scheduleCancelled($event, $member, $gymId = 1, $performedByUserId = null)
    {
        $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
        $eventTitle = $event->title ?? 'Schedule Event';
        
        // Format date to remove time portion (00:00:00)
        $eventDate = $event->date ?? '';
        if ($eventDate) {
            try {
                if (strpos($eventDate, ' ') !== false) {
                    $eventDate = \Carbon\Carbon::parse($eventDate)->format('Y-m-d');
                }
            } catch (\Exception $e) {
                $eventDate = explode(' ', $eventDate)[0];
            }
        }
        
        $eventTime = ($event->start_time ?? '') . ($event->end_time ? ' - ' . $event->end_time : '');
        $dateTime = $eventDate . ($eventTime ? ' at ' . $eventTime : '');
        
        $payload = [
            'event_id' => $event->id,
            'member_id' => $member->id,
            'title' => $eventTitle,
            'date' => $eventDate,
        ];
        
        $senderId = $performedByUserId ?? 1;
        
        $results = [
            'member' => ['success' => false, 'error' => null],
        ];
        
        // Admin notifications (exclude admin who cancelled it)
        self::createForAdmins(
            'schedule_cancelled',
            'Schedule Cancelled',
            "Schedule '{$eventTitle}' for {$memberName} on {$dateTime} has been cancelled.",
            'fa-calendar-times',
            'danger',
            'schedule_event',
            $event->id,
            $gymId,
            $performedByUserId,
            $senderId,
            $payload
        );
        
        // Member notification
        $memberNotification = self::createForMember(
            $member->id,
            'schedule_cancelled',
            'Schedule Cancelled',
            "Your schedule '{$eventTitle}' on {$dateTime} has been cancelled.",
            'fa-calendar-times',
            'danger',
            'schedule_event',
            $event->id,
            $senderId,
            $payload
        );
        
        if ($memberNotification instanceof AdminNotification) {
            $results['member']['success'] = true;
        } else {
            if (is_array($memberNotification) && isset($memberNotification['error'])) {
                $results['member']['error'] = $memberNotification['error'];
            } else {
                $results['member']['error'] = 'Member notification was not created (see logs for details).';
            }
        }
        
        return $results;
    }

    /**
     * Send email using template
     *
     * @param string $emailType Email template type
     * @param string $recipientEmail Recipient email address
     * @param array $replacements Array of placeholder replacements
     * @param int $gymId Gym ID
     * @return bool Success status
     */
    private static function sendEmail($emailType, $recipientEmail, $replacements, $gymId)
    {
        try {
            // Get email template
            $template = EmailTemplate::getByTypeAndGym($emailType, $gymId);
            
            if (!$template) {
                // Use default template if custom template doesn't exist
                $defaultTemplate = self::getDefaultEmailTemplate($emailType);
                if (!$defaultTemplate) {
                    Log::warning("No email template found for type: {$emailType}");
                    return false;
                }
                $subject = $defaultTemplate['subject'];
                $body = $defaultTemplate['body'];
            } else {
                $subject = $template->subject;
                $body = $template->body;
            }
            
            // Replace placeholders
            $subject = self::replacePlaceholders($subject, $replacements);
            $body = self::replacePlaceholders($body, $replacements);
            
            // Send email
            $data = [
                'subject' => $subject,
                'body' => $body,
            ];
            
            Mail::to($recipientEmail)->send(new CustomEmail($data));
            
            Log::info("Email sent successfully", [
                'type' => $emailType,
                'recipient' => $recipientEmail,
                'gym_id' => $gymId
            ]);
            
            return true;
        } catch (\Exception $e) {
            Log::error("Failed to send email", [
                'type' => $emailType,
                'recipient' => $recipientEmail,
                'gym_id' => $gymId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return false;
        }
    }

    /**
     * Replace placeholders in email template
     *
     * @param string $content Template content
     * @param array $replacements Array of [placeholder => value]
     * @return string Content with replaced placeholders
     */
    private static function replacePlaceholders($content, $replacements)
    {
        foreach ($replacements as $placeholder => $value) {
            $content = str_replace('{' . $placeholder . '}', $value ?? '', $content);
        }
        return $content;
    }

    /**
     * Get default email template content
     *
     * @param string $emailType Email template type
     * @return array|null Array with 'subject' and 'body' keys, or null if not found
     */
    private static function getDefaultEmailTemplate($emailType)
    {
        $defaults = [
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
            ]
        ];

        return $defaults[$emailType] ?? null;
    }

    /**
     * Get gym name for email templates
     *
     * @param int $gymId Gym ID
     * @return string Gym name or default
     */
    private static function getGymName($gymId)
    {
        try {
            $gym = Gym::find($gymId);
            if ($gym) {
                return $gym->gym_name ?? $gym->name ?? config('app.name', 'Fitness Suite');
            }
        } catch (\Exception $e) {
            Log::warning("Failed to get gym name", ['gym_id' => $gymId, 'error' => $e->getMessage()]);
        }
        return config('app.name', 'Fitness Suite');
    }

    /**
     * Format appointment time for display
     *
     * @param string $startTime Start time
     * @param string $endTime End time
     * @return string Formatted time string
     */
    private static function formatAppointmentTime($startTime, $endTime)
    {
        if ($startTime && $endTime) {
            return $startTime . ' to ' . $endTime;
        }
        return $startTime ?? $endTime ?? '';
    }

    /**
     * Calculate appointment duration
     *
     * @param string $startTime Start time
     * @param string $endTime End time
     * @return string Duration string
     */
    private static function calculateDuration($startTime, $endTime)
    {
        if (!$startTime || !$endTime) {
            return 'N/A';
        }
        
        try {
            $start = Carbon::parse($startTime);
            $end = Carbon::parse($endTime);
            $diff = $start->diffInMinutes($end);
            
            if ($diff < 60) {
                return $diff . ' minutes';
            } else {
                $hours = floor($diff / 60);
                $minutes = $diff % 60;
                if ($minutes > 0) {
                    return $hours . ' hour' . ($hours > 1 ? 's' : '') . ' ' . $minutes . ' minute' . ($minutes > 1 ? 's' : '');
                }
                return $hours . ' hour' . ($hours > 1 ? 's' : '');
            }
        } catch (\Exception $e) {
            return 'N/A';
        }
    }
}

