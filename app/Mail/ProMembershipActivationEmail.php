<?php

namespace App\Mail;

use App\Models\Member;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ProMembershipActivationEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $member;
    public $appDownloadLink;

    /**
     * Create a new message instance.
     *
     * @param Member $member
     * @return void
     */
    public function __construct(Member $member)
    {
        $this->member = $member;
        
        // Get mobile app download link from settings or use default
        // You can configure this in settings later
        $this->appDownloadLink = env('MOBILE_APP_DOWNLOAD_LINK', 'https://thorstrengthfitness.virtuagym.com/app-download');
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $memberName = trim(($this->member->firstname ?? '') . ' ' . ($this->member->lastname ?? ''));
        if (empty($memberName)) {
            $memberName = $this->member->membername ?? 'Member';
        }
        
        $companyName = config('app.name', 'THORSTRENGTH FITNESS');
        
        // Get from address from settings, fallback to SMTP username if available
        $fromEmail = config('mail.from.address');
        $fromName = config('mail.from.name', $companyName);
        
        // If from email doesn't match SMTP username, try to use SMTP username
        $smtpUsername = config('mail.mailers.smtp.username');
        if ($smtpUsername && $smtpUsername !== $fromEmail) {
            // Use SMTP username as from address to avoid authorization issues
            $fromEmail = $smtpUsername;
        }
        
        return $this->subject('Welcome to PRO Membership!')
            ->from($fromEmail, $fromName)
            ->view('emails.pro-membership-activation')
            ->with([
                'memberName' => $memberName,
                'appDownloadLink' => $this->appDownloadLink,
                'companyName' => $companyName,
            ]);
    }
}

