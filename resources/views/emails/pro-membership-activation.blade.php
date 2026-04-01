<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to PRO Membership</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .email-container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #dc3545;
        }
        .header h1 {
            color: #dc3545;
            margin: 0;
            font-size: 24px;
        }
        .content {
            margin-bottom: 30px;
        }
        .content p {
            margin-bottom: 15px;
        }
        .greeting {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .features-list {
            margin: 20px 0;
            padding-left: 20px;
        }
        .features-list li {
            margin-bottom: 10px;
            line-height: 1.8;
        }
        .download-button {
            text-align: center;
            margin: 30px 0;
        }
        .download-button a {
            display: inline-block;
            background-color: #dc3545;
            color: #ffffff;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            font-size: 16px;
        }
        .download-button a:hover {
            background-color: #c82333;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
        .signature {
            margin-top: 20px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Welcome to PRO Membership!</h1>
        </div>
        
        <div class="content">
            <p class="greeting">Hello {{ $memberName }},</p>
            
            <p>Thank you for joining as a PRO member!</p>
            
            <p>As a PRO account user, you now have access to our exclusive features designed to take your health and performance to the next level:</p>
            
            <ul class="features-list">
                <li><strong>Access to over 100 exercises</strong></li>
                <li><strong>Exclusive PRO Challenges</strong></li>
                <li><strong>All 5000+ exercises with animations</strong></li>
                <li><strong>Over 300 motivational tools to track progress</strong></li>
                <li><strong>Advanced nutrition plans</strong></li>
                <li><strong>Customizable meal plans</strong></li>
                <li><strong>And without any advertisements</strong></li>
            </ul>
            
            <div class="download-button">
                <a href="{{ $appDownloadLink }}" target="_blank">Download the fitness app now!</a>
            </div>
            
            <p>Thank you for your support. Thanks to your help, we can continue to improve our platform!</p>
            
            <p>Enjoy and stay healthy!</p>
            
            <p class="signature">{{ $companyName }} Team.</p>
        </div>
        
        <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
        </div>
    </div>
</body>
</html>

