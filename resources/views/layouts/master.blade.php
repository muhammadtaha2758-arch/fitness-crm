<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets_setup/css/fontawesome.min.css">
    <link rel="stylesheet" href="/css/master.css">
    <link rel="stylesheet" href="/css/app.css">
    <link rel="stylesheet" href="/css/sofia-pro.css">
    <title>Thor Strength Fitness | Ultimate Fitness Management System</title>
  </head>

  <body class="text-left">
    <noscript>
      <strong>
        We're sorry but Thor Strength Fitness doesn't work properly without JavaScript
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
    <div id="app">
    </div>

    <script src="/js/main.min.js?v=4.0.6"></script>
  </body>
</html>