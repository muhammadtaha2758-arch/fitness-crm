<?php

namespace App\Mail;

use App\Models\Member;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MemberCreationConfirmationEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $member;
    public $adminEmail;

    /**
     * Create a new message instance.
     *
     * @param Member $member
     * @param string $adminEmail
     * @return void
     */
    public function __construct(Member $member, $adminEmail)
    {
        $this->member = $member;
        $this->adminEmail = $adminEmail;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $memberName = $this->member->firstname . ' ' . $this->member->lastname;
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
        
        return $this->subject('New Member Created - ' . $memberName)
            ->from($fromEmail, $fromName)
            ->view('emails.member-creation-confirmation')
            ->with([
                'memberName' => $memberName,
                'member' => $this->member,
                'companyName' => $companyName,
            ]);
    }
}

