<?php

namespace App\Mail;

use App\Models\Coach;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CoachPasswordSetupEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $coach;
    public $setupToken;
    public $setupUrl;

    /**
     * Create a new message instance.
     *
     * @param Coach $coach
     * @param string $setupToken
     * @return void
     */
    public function __construct(Coach $coach, $setupToken)
    {
        $this->coach = $coach;
        $this->setupToken = $setupToken;
        
        // Generate setup URL - improved for production
        // Priority: APP_URL env > config app.url > url() helper
        $mobileAppUrl = env('APP_URL', config('app.url', url('/')));
        
        // Clean up URL (remove any malformed parts and trailing slashes)
        $mobileAppUrl = preg_replace('/APP_URL=.*$/', '', $mobileAppUrl);
        $mobileAppUrl = rtrim($mobileAppUrl, '/');
        
        // Ensure URL is valid
        if (empty($mobileAppUrl) || !filter_var($mobileAppUrl, FILTER_VALIDATE_URL)) {
            $mobileAppUrl = url('/');
        }
        
        $this->setupUrl = $mobileAppUrl . '/setup-password-coach?token=' . $setupToken;
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
        
        return $this->subject('Welcome! Set Up Your Coach App Password')
            ->from($fromEmail, $fromName)
            ->view('emails.coach-password-setup')
            ->with([
                'coachName' => $coachName,
                'setupUrl' => $this->setupUrl,
                'setupToken' => $this->setupToken,
                'companyName' => $companyName,
            ]);
    }
}

