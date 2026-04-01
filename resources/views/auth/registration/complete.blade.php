<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel=icon href=/images/favicon.ico>
    <link rel="stylesheet" href="/css/master.css">

    <title>Complete Your Registration - {{ config('app.name', 'Fitness Suite') }}</title>
    <link rel="icon" href="/images/favicon.ico">
  </head>

  <body class="text-left">
    <noscript>
      <strong>
        We're sorry but {{ config('app.name', 'Fitness Suite') }} doesn't work properly without JavaScript
        enabled. Please enable it to continue.</strong
      >
    </noscript>

    <!-- built files will be auto injected -->
    <div class="loading_wrap" id="loading_wrap">
      <div class="loader_logo">
      <img src="/images/logo.png" class="" alt="logo" />

      </div>

      <div class="loading"></div>
    </div>
    <div id="registration">
        <registration-complete-component token="{{$token}}"></registration-complete-component>
      </div>

      <script src="/js/login.min.js"></script>
  </body>
</html>

