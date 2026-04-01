<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel=icon href=/images/favicon.ico>
    <link rel="stylesheet" href="/css/master.css">

    <title>{{ $title ?? 'Registration Error' }} - {{ config('app.name', 'Fitness Suite') }}</title>
    <link rel="icon" href="/images/favicon.ico">
  </head>

  <body class="text-left">
    <div class="auth-layout-wrap">
      <div class="auth-content">
        <div class="card o-hidden mt-5 mb-5">
          <div class="row">
            <div class="col-md-12">
              <div class="p-4">
                <div class="auth-logo text-center mb-30">
                  <img src="/images/logo.png" alt="Logo">
                </div>
                
                <h1 class="mb-3 text-18">{{ $title ?? 'Registration Error' }}</h1>
                <div class="alert alert-danger" role="alert">
                  {{ $error ?? 'An error occurred during registration.' }}
                </div>
                
                <div class="mt-3 text-center">
                  <a href="/login" class="text-muted">
                    <u>Go to Login Page</u>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

