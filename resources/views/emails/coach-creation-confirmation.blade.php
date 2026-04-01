<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Coach Created</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
        <tr>
            <td style="padding: 20px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #28a745; border-radius: 8px 8px 0 0; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                                New Coach Created
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                                Hello,
                            </p>
                            
                            <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                                This is to confirm that a new coach has been successfully created in your system.
                            </p>
                            
                            <!-- Coach Details -->
                            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                                <h3 style="margin: 0 0 15px 0; color: #333333; font-size: 18px;">Coach Details:</h3>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 8px 0; color: #666666; font-size: 14px; width: 40%;"><strong>Name:</strong></td>
                                        <td style="padding: 8px 0; color: #333333; font-size: 14px;">{{ $coachName }}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Email:</strong></td>
                                        <td style="padding: 8px 0; color: #333333; font-size: 14px;">{{ $coach->email }}</td>
                                    </tr>
                                    @if($coach->mobile_phone)
                                    <tr>
                                        <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Phone:</strong></td>
                                        <td style="padding: 8px 0; color: #333333; font-size: 14px;">{{ $coach->mobile_phone }}</td>
                                    </tr>
                                    @endif
                                    @if($coach->coach_type)
                                    <tr>
                                        <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Coach Type:</strong></td>
                                        <td style="padding: 8px 0; color: #333333; font-size: 14px;">{{ $coach->coach_type }}</td>
                                    </tr>
                                    @endif
                                    @if($coach->dob)
                                    <tr>
                                        <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Date of Birth:</strong></td>
                                        <td style="padding: 8px 0; color: #333333; font-size: 14px;">{{ \Carbon\Carbon::parse($coach->dob)->format('F j, Y') }}</td>
                                    </tr>
                                    @endif
                                    <tr>
                                        <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Coach ID:</strong></td>
                                        <td style="padding: 8px 0; color: #333333; font-size: 14px;">#{{ $coach->id }}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Status:</strong></td>
                                        <td style="padding: 8px 0; color: #28a745; font-size: 14px; font-weight: bold;">{{ ucfirst($coach->status ?? 'Active') }}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #666666; font-size: 14px;"><strong>Created:</strong></td>
                                        <td style="padding: 8px 0; color: #333333; font-size: 14px;">{{ $coach->created_at->format('F j, Y \a\t g:i A') }}</td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- Password Setup Notice -->
                            <div style="background-color: #d1ecf1; border-left: 4px solid #0c5460; padding: 15px; margin: 20px 0; border-radius: 4px;">
                                <p style="margin: 0; color: #0c5460; font-size: 14px; line-height: 1.5;">
                                    <strong>Password Setup:</strong> A password setup email has been automatically sent to the coach at <strong>{{ $coach->email }}</strong>. The coach will need to set up their password to access the mobile app.
                                </p>
                            </div>
                            
                            <p style="margin: 20px 0 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                                You can view and manage this coach in your CRM dashboard.
                            </p>
                            
                            <p style="margin: 30px 0 0 0; color: #333333; font-size: 16px; line-height: 1.6;">
                                Best regards,<br>
                                <strong>The {{ $companyName }} System</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0; color: #6c757d; font-size: 12px; line-height: 1.5;">
                                &copy; {{ date('Y') }} {{ $companyName }}. All rights reserved.
                            </p>
                            <p style="margin: 10px 0 0 0; color: #6c757d; font-size: 12px;">
                                This is an automated confirmation message.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>