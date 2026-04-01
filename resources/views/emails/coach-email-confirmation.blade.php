@component('mail::message')

Hello {{ $coachName }},

Please confirm your coach account by clicking the button below. You will be able to log in to the coach app only after confirming your email.

@component('mail::button', ['url' => $url])
Confirm my account
@endcomponent

If you did not create an account, you can ignore this email.

Regards,<br>
{{ config('app.name') }}

@endcomponent
