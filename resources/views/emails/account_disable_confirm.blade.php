@component('mail::message')

<span>You are receiving this email because we received a request to disable your account.</span>

<span>If you did not request this, please ignore this email and your account will remain active. If you did request to disable your account, click the button below to confirm.</span>

@component('mail::button', ['url' => $url])
Confirm Disable Account
@endcomponent

<span>This link will expire in 24 hours.</span>

<span>Regards,</span><br>
{{ config('app.name') }}
@endcomponent
