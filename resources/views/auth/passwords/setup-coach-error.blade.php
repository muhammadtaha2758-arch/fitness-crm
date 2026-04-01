<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel=icon href=/images/favicon.ico>
    <link rel="stylesheet" href="/css/master.css">

    <title>{{ $title ?? 'Error' }} - {{ config('app.name', 'Fitness Suite') }}</title>
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
                  <img src="/images/logo.png" alt>
                </div>
                
                <h1 class="mb-3 text-18">{{ $title ?? 'Error' }}</h1>
                
                <div class="alert alert-danger" role="alert">
                  <strong>Error:</strong> {{ $error ?? 'An error occurred while processing your request.' }}
                </div>
                
                <p class="text-muted mb-4">
                  If you believe this is an error, please contact support for assistance.
                </p>
                
                <div class="text-center">
                  <a href="/login" class="btn btn-primary">Go to Login</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

