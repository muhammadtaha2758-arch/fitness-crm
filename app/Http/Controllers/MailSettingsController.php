<?php

namespace App\Http\Controllers;

use App\Models\Server;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;


class MailSettingsController extends Controller
{

    //-------------- Get mail_settings ---------------\\

      public function get_config_mail(Request $request)
      {
          $this->authorizeForUser($request->user('api'), 'mail_settings', Setting::class);
  
          $server = Server::where('deleted_at', '=', null) 
          ->where('gym_id', $request->user('api')->gym_id)->   first();
  
          if ($server) {
              return response()->json(['server' => $server], 200);
          } else {
              return response()->json(['server' => ''], 200);
          }
      }

    
    //-------------- Update mail settings ---------------\\

    public function update_config_mail(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'mail_settings', Setting::class);

        $user = $request->user('api');
        $gymId = $user->gym_id;

        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User is not associated with any gym. Please contact administrator.'
            ], 400);
        }

        // Validate required fields
        $request->validate([
            'mail_mailer' => 'required|string',
            'host' => 'required|string',
            'port' => 'required|integer|min:1|max:65535',
            'sender_name' => 'required|string',
            'username' => 'required|string|email',
            'password' => 'required|string',
            'encryption' => 'required|string|in:tls,ssl,none',
        ]);

        // Find or create server for this gym
        $server = Server::where('gym_id', $gymId)
            ->where('deleted_at', '=', null)
            ->first();

        if ($server) {
            // Update existing server
            $server->update([
                'mail_mailer' => $request['mail_mailer'],
                'host' => $request['host'],
                'port' => $request['port'],
                'sender_name' => $request['sender_name'],
                'username' => $request['username'],
                'password' => $request['password'],
                'encryption' => $request['encryption'],
            ]);
        } else {
            // Create new server
            $server = Server::create([
                'gym_id' => $gymId,
                'mail_mailer' => $request['mail_mailer'],
                'host' => $request['host'],
                'port' => $request['port'],
                'sender_name' => $request['sender_name'],
                'username' => $request['username'],
                'password' => $request['password'],
                'encryption' => $request['encryption'],
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Mail settings saved successfully',
            'server' => $server
        ]);

    }

    //-------------- Test mail connection (send test email) ---------------\\

    public function test_config_mail(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'mail_settings', Setting::class);

        $request->validate([
            'mail_mailer' => 'required|string',
            'host' => 'required|string',
            'port' => 'required|integer|min:1|max:65535',
            'sender_name' => 'required|string',
            'username' => 'required|string|email',
            'password' => 'required|string',
            'encryption' => 'required|string|in:tls,ssl,none',
            'test_email' => 'nullable|email',
        ]);

        $testEmail = $request->input('test_email', $request->user('api')->email);
        if (!$testEmail) {
            return response()->json([
                'success' => false,
                'message' => 'No recipient email available. Please provide test_email or ensure your account has an email.',
            ], 422);
        }

        $mailer = $request->mail_mailer;
        $validMailers = ['smtp', 'sendmail', 'log', 'array'];
        if (!in_array($mailer, $validMailers)) {
            $mailer = 'smtp';
        }

        Config::set('mail.default', $mailer);

        if ($mailer === 'smtp') {
            $encryption = strtolower(trim($request->encryption ?? ''));
            if (!in_array($encryption, ['ssl', 'tls', ''])) {
                $encryption = 'ssl';
            }
            if (empty($encryption) || $encryption === 'none') {
                $encryption = null;
            }
            if ((int) $request->port === 465 && $encryption !== 'ssl') {
                $encryption = 'ssl';
            }

            Config::set('mail.mailers.smtp', [
                'transport' => 'smtp',
                'host' => $request->host,
                'port' => (int) $request->port,
                'encryption' => $encryption,
                'username' => $request->username,
                'password' => $request->password,
                'timeout' => 30,
                'auth_mode' => null,
            ]);
        }

        Config::set('mail.from', [
            'address' => $request->username,
            'name' => $request->sender_name,
        ]);

        try {
            Mail::raw(
                "This is a test email from your Fitness Suite mail configuration.\n\nIf you received this, your SMTP settings are correct and emails will be sent successfully.",
                function ($message) use ($testEmail, $request) {
                    $message->to($testEmail)
                        ->subject('Fitness Suite – Test Connection');
                }
            );

            return response()->json([
                'success' => true,
                'message' => 'Test email sent successfully to ' . $testEmail . '. Check your inbox.',
            ], 200);
        } catch (\Exception $e) {
            \Log::warning('Mail test connection failed', [
                'host' => $request->host,
                'port' => $request->port,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to send test email: ' . $e->getMessage(),
            ], 422);
        }
    }

}
