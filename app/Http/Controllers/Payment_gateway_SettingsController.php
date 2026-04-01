<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Models\User;
use App\Models\Gym;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Http\Request;


class Payment_gateway_SettingsController extends Controller
{

    //-------------- Get Payment Gateway ---------------\\

    public function Get_payment_gateway(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'payment_gateway', Setting::class);
        
        // Get the current user's gym_id
        $gymId = $request->user('api')->gym_id ?? 1;
        $gym = Gym::find($gymId);
        
        if (!$gym) {
            return response()->json(['error' => 'Gym not found'], 404);
        }

        $item = [
            'active_payment_gateway' => $gym->active_payment_gateway ?? 'none',
            'stripe_key' => $gym->stripe_key ?? '',
            'stripe_secret' => $gym->stripe_secret ?? '', // Don't return the secret for security
            'paysafecard_account_number' => $gym->paysafecard_account_number ?? '',
            'paysafecard_api_key' => $gym->paysafecard_api_key ?? '', // Don't return the API key for security
            'paysafecard_environment' => $gym->paysafecard_environment ?? 'TEST',
        ];

        return response()->json(['gateway' => $item], 200);
    }

      //-------------- Update  Payment Gateway ---------------\\

      public function Update_payment_gateway(Request $request)
      {
          $this->authorizeForUser($request->user('api'), 'payment_gateway', Setting::class);

          // Get the current user's gym_id
          $gymId = $request->user('api')->gym_id ?? 1;
          $gym = Gym::find($gymId);
          
          if (!$gym) {
              return response()->json(['error' => 'Gym not found'], 404);
          }

          // Validate that only one gateway is active
          $activeGateway = $request->input('active_payment_gateway', 'none');
          
          // Update the gym's payment gateway configuration
          $gym->active_payment_gateway = $activeGateway;
          
          // Clear all gateway configurations first
          $gym->stripe_key = null;
          $gym->stripe_secret = null;
          $gym->paysafecard_account_number = null;
          $gym->paysafecard_api_key = null;
          $gym->paysafecard_environment = 'TEST';
          
          // Set configuration based on active gateway
          if ($activeGateway === 'stripe') {
              $gym->stripe_key = $request->input('stripe_key');
              $gym->stripe_secret = $request->input('stripe_secret');
          } elseif ($activeGateway === 'paysafecard') {
              $gym->paysafecard_account_number = $request->input('paysafecard_account_number');
              $gym->paysafecard_api_key = $request->input('paysafecard_api_key');
              $gym->paysafecard_environment = $request->input('paysafecard_environment', 'TEST');
          }
          
          $gym->save();

          return response()->json(['success' => true]);

      }

    //-------------- Get Gym Payment Gateway Configuration ---------------\\
    
    public function getGymPaymentGateway($gymId)
    {
        $gym = Gym::find($gymId);
        
        if (!$gym) {
            return response()->json(['error' => 'Gym not found'], 404);
        }

        return response()->json([
            'active_gateway' => $gym->active_payment_gateway,
            'stripe_config' => $gym->getStripeConfig(),
            'paysafecard_config' => $gym->getPaysafeCardConfig()
        ]);
    }

   
    //-------------- Set Environment Value ---------------\\

    public function setEnvironmentValue(array $values)
    {
        $envFile = app()->environmentFilePath();
        $str = file_get_contents($envFile);
        $str .= "\r\n";
        if (count($values) > 0) {
            foreach ($values as $envKey => $envValue) {
    
                $keyPosition = strpos($str, "$envKey=");
                $endOfLinePosition = strpos($str, "\n", $keyPosition);
                $oldLine = substr($str, $keyPosition, $endOfLinePosition - $keyPosition);
    
                if (is_bool($keyPosition) && $keyPosition === false) {
                    // variable doesnot exist
                    $str .= "$envKey=$envValue";
                    $str .= "\r\n";
                } else {
                    // variable exist                    
                    $str = str_replace($oldLine, "$envKey=$envValue", $str);
                }            
            }
        }
    
        $str = substr($str, 0, -1);
        if (!file_put_contents($envFile, $str)) {
            return false;
        }
    
        app()->loadEnvironmentFrom($envFile);    
    
        return true;
    }

}
