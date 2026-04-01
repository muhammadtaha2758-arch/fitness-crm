<?php

namespace App\Mail;

use App\Models\Coach;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CoachCreationConfirmationEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $coach;
    public $adminEmail;

    /**
     * Create a new message instance.
     *
     * @param Coach $coach
     * @param string $adminEmail
     * @return void
     */
    public function __construct(Coach $coach, $adminEmail)
    {
        $this->coach = $coach;
        $this->adminEmail = $adminEmail;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $coachName = $this->coach->first_name . ' ' . $this->coach->last_name;
        $companyName = config('app.name', 'Fitness Suite');
        
        // Get from address from settings, fallback to SMTP username if available
        $fromEmail = config('mail.from.address');
        $fromName = config('mail.from.name', $companyName);
        
        // If from email doesn't match SMTP username, try to use SMTP username
        $smtpUsername = config('mail.mailers.smtp.username');
        if ($smtpUsername && $smtpUsername !== $fromEmail) {
            // Use SMTP username as from address to avoid authorization issues
            $fromEmail = $smtpUsername;
        }
        
        return $this->subject('New Coach Created - ' . $coachName)
            ->from($fromEmail, $fromName)
            ->view('emails.coach-creation-confirmation')
            ->with([
                'coachName' => $coachName,
                'coach' => $this->coach,
                'companyName' => $companyName,
            ]);
    }
}

