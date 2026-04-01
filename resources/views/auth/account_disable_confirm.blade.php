<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/images/favicon.ico">
    <link rel="stylesheet" href="/css/master.css">
    <title>Confirm Disable Account</title>
</head>
<body class="text-left">
    <div class="auth-layout-wrap d-flex align-items-center justify-content-center min-vh-100">
        <div class="auth-content">
            <div class="card o-hidden shadow-sm">
                <div class="card-body p-4 p-md-5">
                    <div class="text-center mb-4">
                        <img src="/images/logo.png" alt="Logo" class="auth-logo" style="max-height: 60px;">
                    </div>
                    <h1 class="h4 mb-3 text-center">Confirm Disable Account</h1>
                    <p class="text-muted text-center mb-4">
                        You requested to disable your account. Click the button below to confirm. This action will deactivate your account and you will no longer be able to sign in.
                    </p>
                    <form method="POST" action="{{ url('/account/disable/confirm/' . $token) }}">
                        @csrf
                        <div class="form-group text-center">
                            <button type="submit" class="btn btn-danger btn-block btn-lg">
                                Confirm Disable My Account
                            </button>
                        </div>
                    </form>
                    <div class="text-center mt-3">
                        <a href="/login" class="text-muted">Cancel and return to sign in</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
