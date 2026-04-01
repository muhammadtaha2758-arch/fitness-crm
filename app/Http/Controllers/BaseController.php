<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Config;
use DB;
use \Nwidart\Modules\Facades\Module;

class BaseController extends Controller
{
    /**
     * Compute cookie domain safely.
     * - Browsers generally reject Domain=.localhost, so for localhost/IP we omit Domain (host-only cookie).
     */
    private function getCookieDomain(): ?string
    {
        $serverName = $_SERVER['SERVER_NAME'] ?? null;
        if (!$serverName) {
            return null;
        }

        $serverName = strtolower(trim($serverName));
        $isLocal = in_array($serverName, ['localhost', '127.0.0.1', '::1'], true);

        return $isLocal ? null : $serverName;
    }

    public function sendResponse($result,$msg){
        $response=[
            'success'=>true,
            'message'=>$msg,
        ];
        if(!empty($result)){
            $response['data']=$result;
        }
        return response()->json($response, 200);
    }

    public function sendError($error_msg, $error=null){
        $response=[
            'success'=>false,
            'message'=>$error_msg,
        ];
        if(isset($error)){
            $response['errors']= $error;
        }

        return response()->json($response, 400);
    }

    //    Set cookie
    public function setCookie($cookie_name, $cookie_value)
    {
        $this->destroyCookie($cookie_name);
        $domain = $this->getCookieDomain();
        if ($domain) {
            setcookie($cookie_name, $cookie_value, time() + 2147483647, '/', $domain);
        } else {
            // Host-only cookie (required for localhost / IP hosts)
            setcookie($cookie_name, $cookie_value, time() + 2147483647, '/');
        }
    }

    // Get cookie
    public function getCookie($cookie_name)
    {
        if (isset($_COOKIE[$cookie_name])) {
            return $_COOKIE[$cookie_name];
        } else {
            return false;
        }
    }
    // Has cookie
    public function hasCookie($cookie_name)
    {
        if (isset($_COOKIE[$cookie_name])) {
            return true;
        } else {
            return false;
        }
    }

    // Destroy cookie
    public function destroyCookie($cookie_name)
    {
        if (isset($_COOKIE[$cookie_name])) {
            unset($_COOKIE[$cookie_name]);
            $domain = $this->getCookieDomain();
            if ($domain) {
                setcookie($cookie_name, '', time() - 2147483647, '/', $domain);
            } else {
                setcookie($cookie_name, '', time() - 2147483647, '/');
            }

        }
    }

    // Clear cookie
    public function clearCookie()
    {
        if (isset($_COOKIE['Stocky_token'])) {
            unset($_COOKIE['Stocky_token']);
            $domain = $this->getCookieDomain();
            if ($domain) {
                setcookie('Stocky_token', '', time() - 2147483647, '/', $domain); // empty value and old timestamp
            } else {
                setcookie('Stocky_token', '', time() - 2147483647, '/'); // host-only
            }
        }
    }

    // Set config mail
    public static function Set_config_mail($gym_id = null)
    {
        // Get gym_id from authenticated user if not provided
        if (!$gym_id) {
            try {
                $user = auth('api')->user();
                $gym_id = $user ? $user->gym_id : null;
            } catch (\Exception $e) {
                // If auth fails, try to get from request
                try {
                    $gym_id = request()->user('api')->gym_id ?? null;
                } catch (\Exception $e2) {
                    $gym_id = null;
                }
            }
        }

        // Build query for server with gym_id filtering
        $serverQuery = DB::table('servers')->where('deleted_at', '=', null);
        if ($gym_id) {
            $serverQuery->where('gym_id', $gym_id);
        }
        $server = $serverQuery->first();

        // Build query for settings with gym_id filtering
        $settingsQuery = DB::table('settings')->where('deleted_at', '=', null);
        if ($gym_id) {
            $settingsQuery->where('gym_id', $gym_id);
        }
        $settings = $settingsQuery->first();

        // Log warning if configuration is missing
        if (!$server || !$settings) {
            \Log::warning('Email configuration missing', [
                'gym_id' => $gym_id,
                'server_exists' => $server ? true : false,
                'settings_exists' => $settings ? true : false,
            ]);
            return false; // Return false to indicate config is missing
        }

        // Map old driver names to valid mailers
        $mailer = $server->mail_mailer;
        $validMailers = ['smtp', 'sendmail', 'log', 'array'];
        
        // If mailer is not valid or not installed (like postmark, mailgun, ses), fallback to smtp
        if (!in_array($mailer, $validMailers)) {
            $mailer = 'smtp';
        }
        
        // For Laravel 8+ compatibility, configure mail using the new format
        Config::set('mail.default', $mailer);
        
        // Configure SMTP settings if using smtp mailer
        if ($mailer === 'smtp') {
            // Normalize encryption value (should be lowercase: ssl, tls, or null)
            $encryption = strtolower(trim($server->encryption ?? ''));
            if (!in_array($encryption, ['ssl', 'tls', ''])) {
                $encryption = 'ssl'; // Default to ssl if invalid
            }
            if (empty($encryption)) {
                $encryption = null;
            }
            
            // For port 465, ensure SSL encryption is used
            if ($server->port == 465 && $encryption !== 'ssl') {
                $encryption = 'ssl';
                \Log::info('Auto-corrected encryption to SSL for port 465', [
                    'host' => $server->host,
                    'port' => $server->port,
                    'original_encryption' => $server->encryption,
                    'corrected_encryption' => $encryption
                ]);
            }
            
            Config::set('mail.mailers.smtp', [
                'transport' => 'smtp',
                'host' => $server->host,
                'port' => (int)$server->port,
                'encryption' => $encryption,
                'username' => $server->username,
                'password' => $server->password,
                'timeout' => 30, // Increased timeout for SSL connections
                'auth_mode' => null,
            ]);
            
            \Log::info('SMTP configuration set', [
                'host' => $server->host,
                'port' => $server->port,
                'encryption' => $encryption,
                'username' => $server->username ? '***' : null,
            ]);
        }
        
        // Set from address
        // Use SMTP username if it's different from settings email to avoid authorization errors
        // This prevents "not authorized to send on behalf of" errors
        $fromEmail = $settings->email;
        if ($mailer === 'smtp' && $server->username && $server->username !== $settings->email) {
            // If SMTP username is different, use it as from address to match authenticated user
            // This ensures the authenticated SMTP user can send emails
            $fromEmail = $server->username;
            \Log::info('Using SMTP username as from address to avoid authorization errors', [
                'smtp_username' => $server->username,
                'settings_email' => $settings->email,
                'gym_id' => $gym_id
            ]);
        }
        
        Config::set('mail.from', [
            'address' => $fromEmail,
            'name' => $server->sender_name
        ]);

        return true; // Return true to indicate config was set successfully
    }

    public static function get_Module_Info()
    {
        $allModules = Module::all();
        $allEnabledModules = Module::allEnabled();

        $ModulesInstalled = [];
        $ModulesEnabled = [];

        foreach($allModules as $key => $modules_name){
            $ModulesInstalled[] = $key;
        }

        foreach($allEnabledModules as $key => $modules_name){
            $ModulesEnabled[] = $key;
        }

        return [
            'ModulesInstalled' => $ModulesInstalled, 
            'ModulesEnabled' => $ModulesEnabled, 
        ];
    }

}
