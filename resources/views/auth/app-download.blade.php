<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="stylesheet" href="/assets_setup/css/fontawesome.min.css">
    <link rel="stylesheet" href="/css/master.css">

    <title>Download App - Thor Strength Fitness</title>
    <style>
      body {
        background: url("/images/fitness-login-background.jpg") no-repeat center center fixed;
        background-size: cover;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      }
      .app-download-container {
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        padding: 3rem;
        max-width: 600px;
        width: 90%;
        text-align: center;
      }
      .app-download-container img {
        max-width: 200px;
        margin-bottom: 2rem;
      }
      .app-download-container h1 {
        color: #252525;
        font-size: 2rem;
        margin-bottom: 1rem;
        font-weight: 600;
      }
      .app-download-container p {
        color: #666;
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 2rem;
      }
      .download-buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 2rem;
      }
      .download-btn {
        display: inline-block;
        padding: 1rem 2rem;
        background-color: #ff4040;
        color: #ffffff;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 1rem;
        transition: background-color 0.3s ease;
      }
      .download-btn:hover {
        background-color: #e63939;
        color: #ffffff;
        text-decoration: none;
      }
      .download-btn i {
        margin-right: 0.5rem;
      }
      .info-box {
        background-color: #f8f9fa;
        border-left: 4px solid #ff4040;
        padding: 1rem;
        margin-top: 2rem;
        text-align: left;
        border-radius: 4px;
      }
      .info-box p {
        margin: 0;
        color: #555;
        font-size: 0.95rem;
      }
      .info-box strong {
        color: #252525;
      }
      @media (min-width: 768px) {
        .download-buttons {
          flex-direction: row;
          justify-content: center;
        }
        .download-btn {
          flex: 0 0 auto;
        }
      }
    </style>
  </head>

  <body>
    <div class="app-download-container">
      <img src="/images/logo.png" alt="Thor Strength Fitness Logo" />
      
      <h1>Download Our Mobile App</h1>
      
      <p>
        Thank you for setting up your password! To access your account, please download our mobile app.
        The app is currently available in testing build. Once it's published on the app stores, 
        you'll be able to download it directly.
      </p>

      <div class="download-buttons">
        <a href="#" class="download-btn" onclick="alert('The app is currently in testing. Please contact your administrator for the testing build.'); return false;">
          <i class="fab fa-android"></i> Download for Android
        </a>
        <a href="#" class="download-btn" onclick="alert('The app is currently in testing. Please contact your administrator for the testing build.'); return false;">
          <i class="fab fa-apple"></i> Download for iOS
        </a>
      </div>

      <div class="info-box">
        <p>
          <strong>Note:</strong> The mobile apps are currently in testing phase and not yet available 
          on the Play Store or App Store. If you need access to the testing build, please contact 
          your gym administrator or support team.
        </p>
      </div>

      <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #eee;">
        <p style="font-size: 0.9rem; color: #999; margin: 0;">
          Already have the app? <a href="/login" style="color: #ff4040; text-decoration: none;">Go to Login</a>
        </p>
      </div>
    </div>
  </body>
</html>
