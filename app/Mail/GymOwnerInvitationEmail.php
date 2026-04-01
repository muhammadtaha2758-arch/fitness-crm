<?php

namespace App\Mail;

use App\Models\User;
use App\Models\Gym;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class GymOwnerInvitationEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $owner;
    public $gym;
    public $setPasswordUrl;
    public $loginUrl;

    /**
     * Create a new message instance.
     *
     * @param User $owner
     * @param Gym $gym
     * @param string $setPasswordUrl Full URL for the owner to set their password (e.g. /password/find/{token})
     * @return void
     */
    public function __construct(User $owner, Gym $gym, $setPasswordUrl)
    {
        $this->owner = $owner;
        $this->gym = $gym;
        $this->setPasswordUrl = $setPasswordUrl;

        $baseUrl = rtrim(env('APP_URL', config('app.url', url('/'))), '/');
        $this->loginUrl = $baseUrl . '/login';
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $companyName = config('app.name', 'Fitness Suite');
        $ownerName = trim($this->owner->firstname . ' ' . $this->owner->lastname);

        $fromEmail = config('mail.from.address');
        $fromName = config('mail.from.name', $companyName);
        $smtpUsername = config('mail.mailers.smtp.username');
        if ($smtpUsername && $smtpUsername !== $fromEmail) {
            $fromEmail = $smtpUsername;
        }

        return $this->subject('Your Gym CRM Access – ' . $this->gym->gym_name)
            ->from($fromEmail, $fromName)
            ->view('emails.gym-owner-invitation')
            ->with([
                'ownerName' => $ownerName,
                'gymName' => $this->gym->gym_name,
                'loginUrl' => $this->loginUrl,
                'setPasswordUrl' => $this->setPasswordUrl,
                'email' => $this->owner->email,
                'companyName' => $companyName,
            ]);
    }
}
