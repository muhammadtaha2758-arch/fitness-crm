<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MemberSignupVerificationEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $firstname;
    public $lastname;
    public $verifyUrl;
    public $gymName;

    /**
     * Create a new message instance.
     *
     * @param string $firstname
     * @param string $lastname
     * @param string $verifyUrl
     * @param string $gymName
     * @return void
     */
    public function __construct($firstname, $lastname, $verifyUrl, $gymName = 'Fitness App')
    {
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->verifyUrl = $verifyUrl;
        $this->gymName = $gymName;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $fromEmail = config('mail.from.address');
        $fromName = config('mail.from.name', $this->gymName);
        $smtpUsername = config('mail.mailers.smtp.username');
        if ($smtpUsername && $smtpUsername !== $fromEmail) {
            $fromEmail = $smtpUsername;
        }

        return $this->subject('Verify your email - ' . $this->gymName)
            ->from($fromEmail, $fromName)
            ->view('emails.signup-verify')
            ->with([
                'firstname' => $this->firstname,
                'lastname' => $this->lastname,
                'verifyUrl' => $this->verifyUrl,
                'gymName' => $this->gymName,
            ]);
    }
}
