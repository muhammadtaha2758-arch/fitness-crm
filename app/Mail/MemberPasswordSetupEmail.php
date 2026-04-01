<?php

namespace App\Mail;

use App\Models\Member;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MemberPasswordSetupEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $member;
    public $setupToken;
    public $setupUrl;

    /**
     * Create a new message instance.
     *
     * @param Member $member
     * @param string $setupToken
     * @return void
     */
    public function __construct(Member $member, $setupToken)
    {
        $this->member = $member;
        $this->setupToken = $setupToken;
        
        // Generate setup URL - improved for production
        // Priority: APP_URL env > config app.url > url() helper
        $mobileAppUrl = env('APP_URL', config('app.url', url('/')));
        
        // Generate a unique invitation code (member_id + token)
        $invitationCode = $member->id . '-' . substr($setupToken, 0, 20);
        
        // Ensure URL is valid
        if (empty($mobileAppUrl) || !filter_var($mobileAppUrl, FILTER_VALIDATE_URL)) {
            $mobileAppUrl = url('/');
        }
        
        $this->setupUrl = $mobileAppUrl . '/setup-password?token=' . $setupToken;
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
        
        return $this->subject('Hello & Welcome!')
            ->from($fromEmail, $fromName)
            ->view('emails.member-invitation')
            ->with([
                'memberName' => $memberName,
                'setupUrl' => $this->setupUrl,
                'setupToken' => $this->setupToken,
                'companyName' => $companyName,
            ]);
    }
}

