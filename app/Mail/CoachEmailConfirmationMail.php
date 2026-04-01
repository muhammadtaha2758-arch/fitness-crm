<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CoachEmailConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $url;
    public $coachName;

    public function __construct($url, $coachName)
    {
        $this->url = $url;
        $this->coachName = $coachName;
    }

    public function build()
    {
        return $this->subject('Confirm your coach account')
            ->markdown('emails.coach-email-confirmation')
            ->with([
                'url' => $this->url,
                'coachName' => $this->coachName,
            ]);
    }
}
