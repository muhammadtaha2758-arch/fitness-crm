<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CoachSignupVerificationEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $firstname;
    public $lastname;
    public $confirmUrl;
    public $appName;

    /**
     * Create a new message instance.
     */
    public function __construct(string $firstname, string $lastname, string $confirmUrl, string $appName = 'Fitness Suite')
    {
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->confirmUrl = $confirmUrl;
        $this->appName = $appName;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        $fromEmail = config('mail.from.address');
        $fromName = config('mail.from.name', $this->appName);
        $smtpUsername = config('mail.mailers.smtp.username');
        if ($smtpUsername && $smtpUsername !== $fromEmail) {
            $fromEmail = $smtpUsername;
        }

        return $this->subject('Confirm your Coach account - ' . $this->appName)
            ->from($fromEmail, $fromName)
            ->view('emails.coach-signup-verify')
            ->with([
                'firstname' => $this->firstname,
                'lastname' => $this->lastname,
                'confirmUrl' => $this->confirmUrl,
                'appName' => $this->appName,
            ]);
    }
}
