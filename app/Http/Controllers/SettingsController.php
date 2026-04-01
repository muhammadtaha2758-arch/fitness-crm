<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Models\PosSetting;
use App\Models\User;
use App\Models\sms_gateway;
use App\Models\FinancialSetting;
use Illuminate\Support\Facades\Auth;

use DB;
use File;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;
use \Nwidart\Modules\Facades\Module;
use Illuminate\Support\Facades\Config;

class SettingsController extends Controller
{


    //-------------- Update  Settings ---------------\\

    public function update(Request $request, $id)
    {
        // $this->authorizeForUser($request->user('api'), 'update', Setting::class);

        $setting = Setting::findOrFail($id);
        $currentAvatar = $setting->logo;
        if ($request->logo != $currentAvatar) {

            $image = $request->file('logo');
            $path = public_path() . '/images';
            $filename = rand(11111111, 99999999) . $image->getClientOriginalName();

            $image_resize = Image::make($image->getRealPath());
            $image_resize->resize(80, 80);
            $image_resize->save(public_path('/images/' . $filename));

            $userPhoto = $path . '/' . $currentAvatar;
            if (file_exists($userPhoto)) {
                if ($setting->logo != 'logo-default.png') {
                    @unlink($userPhoto);
                }
            }
        } else {
            $filename = $currentAvatar;
        }
        if ($request['currency'] != 'null') {
            $currency = $request['currency'];
        } else {
            $currency = null;
        }

        if ($request['client'] != 'null') {
            $client = $request['client'];
        } else {
            $client = null;
        }

        if ($request['warehouse'] != 'null') {
            $warehouse = $request['warehouse'];
        } else {
            $warehouse = null;
        }

        if ($request['sms_gateway'] != 'null') {
            $sms_gateway = $request['sms_gateway'];
        } else {
            $sms_gateway = null;
        }

        if ($request['default_language'] != 'null') {
            $default_language = $request['default_language'];
        } else {
            $default_language = 'en';
        }

        if($request['is_invoice_footer'] == '1' || $request['is_invoice_footer'] == 'true'){
            $is_invoice_footer = 1;
        }else{
            $is_invoice_footer = 0;
        }

        if($request['quotation_with_stock'] == '1' || $request['quotation_with_stock'] == 'true'){
            $quotation_with_stock = 1;
        }else{
            $quotation_with_stock = 0;
        }

        Setting::whereId($id)->update([
            'currency_id' => null,
            'client_id' => null,
            'warehouse_id' => $warehouse,
            'email' => $request['email'] ?? '',
            'default_language' =>  $default_language,
            'CompanyName' => $request['CompanyName'] ?? '',
            'CompanyPhone' => $request['CompanyPhone'] ?? '',
            'CompanyAdress' => $request['CompanyAdress'] ?? '',
            'footer' => $request['footer'] ?? '',
            'developed_by' => $request['developed_by'] ?? '',
            'is_invoice_footer' => $is_invoice_footer,
            'quotation_with_stock' => $quotation_with_stock,
            'invoice_footer' => $request['invoice_footer'] ?? '',
            'sms_gateway' => $sms_gateway,
            'logo' => $filename,
            // New business info fields
            'business_type' => $request['business_type'] ?? '',
            'description' => $request['description'] ?? '',
            'zip_code' => $request['zip_code'] ?? '',
            'city' => $request['city'] ?? '',
            'country' => $request['country'] ?? '',
            'phone' => $request['phone'] ?? '',
            'facebook_page' => $request['facebook_page'] ?? '',
            'website' => $request['website'] ?? '',
            'primary_language' => $request['primary_language'] ?? '',
            'secondary_language' => $request['secondary_language'] ?? '',
            'company_registration_number' => $request['company_registration_number'] ?? '',
            'vat_number' => $request['vat_number'] ?? '',
            // Advanced fields
            'club_external_id' => $request['club_external_id'] ?? '',
            'club_key' => $request['club_key'] ?? '',
            'advanced_passwords' => $request['advanced_passwords'] ?? '',
            'hide_for_non_members' => $request['hide_for_non_members'] == '1' ? 1 : 0,
            // Opening hours fields
            'opening_hours' => $request['opening_hours'] ?? null,
            'opening_hours_notes' => $request['opening_hours_notes'] ?? '',
        ]);

        $this->setEnvironmentValue([
            'APP_TIMEZONE' => $request['timezone'] !== null?'"' . $request['timezone'] . '"':'"UTC"',
        ]);

        Artisan::call('config:cache');
        Artisan::call('config:clear');

        return response()->json(['success' => true]);
    }

    //-------------- Show Settings ---------------\\

    public function show(Request $request, $id)
    {
        // $this->authorizeForUser($request->user('api'), 'view', Setting::class);

        $settings = Setting::where('id', $id)
            ->where('deleted_at', '=', null)
            ->first();

        if ($settings) {
            $item['id'] = $settings->id;
            $item['email'] = $settings->email;
            $item['CompanyName'] = $settings->CompanyName;
            $item['CompanyPhone'] = $settings->CompanyPhone;
            $item['CompanyAdress'] = $settings->CompanyAdress;
            $item['logo'] = $settings->logo;
            $item['footer'] = $settings->footer;
            $item['developed_by'] = $settings->developed_by;
            $item['default_language'] = $settings->default_language;
            $item['is_invoice_footer'] = $settings->is_invoice_footer;
            $item['invoice_footer'] = $settings->invoice_footer;
            $item['quotation_with_stock'] = $settings->quotation_with_stock;
            $item['timezone'] = env('APP_TIMEZONE') == null?'UTC':env('APP_TIMEZONE');
            // New business info fields
            $item['business_type'] = $settings->business_type ?? '';
            $item['description'] = $settings->description ?? '';
            $item['zip_code'] = $settings->zip_code ?? '';
            $item['city'] = $settings->city ?? '';
            $item['country'] = $settings->country ?? '';
            $item['phone'] = $settings->phone ?? '';
            $item['facebook_page'] = $settings->facebook_page ?? '';
            $item['website'] = $settings->website ?? '';
            $item['primary_language'] = $settings->primary_language ?? '';
            $item['secondary_language'] = $settings->secondary_language ?? '';
            $item['company_registration_number'] = $settings->company_registration_number ?? '';
            $item['vat_number'] = $settings->vat_number ?? '';
            // Advanced fields
            $item['club_external_id'] = $settings->club_external_id ?? '';
            $item['club_key'] = $settings->club_key ?? '';
            $item['advanced_passwords'] = $settings->advanced_passwords ?? 'off';
            $item['hide_for_non_members'] = $settings->hide_for_non_members ?? false;
            // Opening hours fields
            $item['opening_hours'] = $settings->opening_hours ?? null;
            $item['opening_hours_notes'] = $settings->opening_hours_notes ?? '';

            return response()->json([
                'settings' => $item
            ], 200);
        } else {
            return response()->json(['error' => 'Settings not found'], 404);
        }
    }

    public function truncateAndResetData(Request $request)
    {
        $item ='';

        // $item = DB::transaction(function () use ($request) {
        if($request->password != '123456789'){
            return response()->json(['error' => 'Wrong Password'], 500);
        }
        

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Truncate specific tables
        DB::table('stock_maintenance')->truncate();
        DB::table('accounts_ledger')->truncate();
        
        DB::table('j_v_summaries')->truncate();
        
        DB::table('payment_sales')->truncate();
        DB::table('payment_sale_returns')->truncate();
        DB::table('payment_with_credit_card')->truncate();
        DB::table('payment_purchase_returns')->truncate();
        DB::table('payment_purchases')->truncate();
        
        DB::table('sale_return_details')->truncate();
        DB::table('sale_returns')->truncate();
        DB::table('sale_details')->truncate();
        DB::table('sales')->truncate();
        // DB::table('purchase_return_details')->truncate();
        // DB::table('purchase_returns')->truncate();
        // DB::table('purchase_details')->truncate();
        // DB::table('purchases')->truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        // Update 'qte' column to 0 in specified tables
        DB::table('product_warehouse')->update(['qte' => 0]);
        
        // },10);
        // You can add more tables as needed for the update
        return response()->json(['success' => "$item"]);
    }

     //-------------- Get Pos Settings ---------------\\

     public function get_pos_Settings(Request $request)
     {
        //  $this->authorizeForUser($request->user('api'), 'pos_settings', Setting::class);
 
         $PosSetting = PosSetting::where('deleted_at', '=', null)->first();

         return response()->json([
             'pos_settings' => $PosSetting
            ], 200);
    
    }


    //-------------- Update Pos settings ---------------\\

    public function update_pos_settings(Request $request, $id)
    {
        // $this->authorizeForUser($request->user('api'), 'pos_settings', Setting::class);

        request()->validate([
            'note_customer' => 'required',
        ]);

        if($request['is_printable'] == '1' || $request['is_printable'] == 'true'){
            $is_printable = 1;
        }else{
            $is_printable = 0;
        }

        PosSetting::whereId($id)->update([
            'note_customer'  => $request['note_customer'],
            'show_note'      => $request['show_note'],
            'show_barcode'   => $request['show_barcode'],
            'show_discount'  => $request['show_discount'],
            'show_customer'  => $request['show_customer'],
            'show_email'     => $request['show_email'],
            'show_phone'     => $request['show_phone'],
            'show_address'   => $request['show_address'],
            'is_printable'   => $is_printable,
        ]);

        return response()->json(['success' => true]);

    }
    

    //-------------- Get All Settings ---------------\\

    public function getSettings(Request $request)
    {
        // $this->authorizeForUser($request->user('api'), 'view', Setting::class);

        $settings = Setting::where('deleted_at', '=', null)->first();
        if ($settings) {
    

            $item['id'] = $settings->id;
            $item['email'] = $settings->email;
            $item['CompanyName'] = $settings->CompanyName;
            $item['CompanyPhone'] = $settings->CompanyPhone;
            $item['CompanyAdress'] = $settings->CompanyAdress;
            $item['logo'] = $settings->logo;
            $item['footer'] = $settings->footer;
            $item['developed_by'] = $settings->developed_by;
            $item['default_language'] = $settings->default_language;
            $item['is_invoice_footer'] = $settings->is_invoice_footer;
            $item['invoice_footer'] = $settings->invoice_footer;
            $item['quotation_with_stock'] = $settings->quotation_with_stock;
            $item['timezone'] = env('APP_TIMEZONE') == null?'UTC':env('APP_TIMEZONE');
            // New business info fields
            $item['business_type'] = $settings->business_type ?? '';
            $item['description'] = $settings->description ?? '';
            $item['zip_code'] = $settings->zip_code ?? '';
            $item['city'] = $settings->city ?? '';
            $item['country'] = $settings->country ?? '';
            $item['phone'] = $settings->phone ?? '';
            $item['facebook_page'] = $settings->facebook_page ?? '';
            $item['website'] = $settings->website ?? '';
            $item['primary_language'] = $settings->primary_language ?? '';
            $item['secondary_language'] = $settings->secondary_language ?? '';
            $item['company_registration_number'] = $settings->company_registration_number ?? '';
            $item['vat_number'] = $settings->vat_number ?? '';
            // Advanced fields
            $item['club_external_id'] = $settings->club_external_id ?? '';
            $item['club_key'] = $settings->club_key ?? '';
            $item['advanced_passwords'] = $settings->advanced_passwords ?? 'off';
            $item['hide_for_non_members'] = $settings->hide_for_non_members ?? false;
            // Opening hours fields
            $item['opening_hours'] = $settings->opening_hours ?? null;
            $item['opening_hours_notes'] = $settings->opening_hours_notes ?? '';

  

            return response()->json([
                'settings' => $item ,
         
            ], 200);
        } else {
            return response()->json(['statut' => 'error'], 500);
        }
    }


    //-------------- Clear_Cache ---------------\\

    public function Clear_Cache(Request $request)
    {
        Artisan::call('cache:clear');
        Artisan::call('view:clear');
        Artisan::call('route:clear');
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

    //-------------- Get Opening Hours ---------------\\

    public function getOpeningHours(Request $request)
    {
        $settings = Setting::where('deleted_at', '=', null)->first();
        
        if ($settings) {
            return response()->json([
                'opening_hours' => $settings->opening_hours,
                'opening_hours_notes' => $settings->opening_hours_notes ?? ''
            ], 200);
        } else {
            return response()->json(['error' => 'Settings not found'], 404);
        }
    }

    //-------------- Update Opening Hours ---------------\\

    public function updateOpeningHours(Request $request)
    {
        $settings = Setting::where('deleted_at', '=', null)->first();
        
        if (!$settings) {
            return response()->json(['error' => 'Settings not found'], 404);
        }

        $settings->update([
            'opening_hours' => $request['opening_hours'],
            'opening_hours_notes' => $request['opening_hours_notes'] ?? ''
        ]);

        return response()->json(['success' => true], 200);
    }

    //-------------- Get Facilities ---------------\\
    public function getFacilities(Request $request)
    {
        $settings = Setting::where('deleted_at', '=', null)->first();
        
        return response()->json([
            'success' => true,
            'services' => json_decode($settings->facilities ?? '[]', true)
        ]);
    }

    //-------------- Update Facilities ---------------\\
    public function updateFacilities(Request $request)
    {
        $settings = Setting::where('deleted_at', '=', null)->first();
        
        $settings->update([
            'facilities' => json_encode($request['services'])
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Facilities updated successfully'
        ]);
    }

    //-------------- Get Contracts Data ---------------\\
    public function getContractsData(Request $request)
    {
        $settings = Setting::where('deleted_at', '=', null)->first();
        
        if ($settings) {
            return response()->json([
                'success' => true,
                'data' => [
                    'terms_and_conditions' => json_decode($settings->terms_and_conditions ?? '{}', true),
                    'additional_fields' => json_decode($settings->contracts_additional_fields ?? '[]', true)
                ]
            ], 200);
        } else {
            return response()->json(['error' => 'Settings not found'], 404);
        }
    }

    //-------------- Update Contracts ---------------\\
    public function updateContracts(Request $request)
    {
        $settings = Setting::where('deleted_at', '=', null)->first();
        
        if (!$settings) {
            return response()->json(['error' => 'Settings not found'], 404);
        }

        $language = $request['language'] ?? 'en';
        $termsContent = $request['terms_content'] ?? '';
        $additionalFields = $request['additional_fields'] ?? [];

        // Get existing terms and conditions
        $existingTerms = json_decode($settings->terms_and_conditions ?? '{}', true);
        $existingTerms[$language] = $termsContent;

        // Get existing additional fields
        $existingAdditionalFields = json_decode($settings->contracts_additional_fields ?? '[]', true);
        
        // Update additional fields for the current language
        $existingAdditionalFields[$language] = $additionalFields;

        $settings->update([
            'terms_and_conditions' => json_encode($existingTerms),
            'contracts_additional_fields' => json_encode($existingAdditionalFields)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Contracts updated successfully'
        ], 200);
    }

    //-------------- Get Client Settings ---------------\\
    public function getClientSettings(Request $request)
    {
        $settings = Setting::where('deleted_at', '=', null)->first();
        
        if ($settings) {
            $clientSettings = $settings->client_settings ?? [];
            
            // Return default values if no settings exist
            if (empty($clientSettings)) {
                $clientSettings = [
                    'clients_can_edit_info' => false,
                    'change_requests_email' => '',
                    'show_payment_methods' => true,
                    'show_invoices' => true,
                    'show_credits' => true,
                    'show_memberships' => true,
                    'clients_can_end_contract' => false,
                    'clients_can_pause_contract' => false,
                    'min_pause_days' => 0,
                    'max_pause_days' => 0,
                    'allowed_pauses' => 1,
                    'pause_period_value' => 1,
                    'pause_period_unit' => 'months',
                    'show_bought_products' => true,
                    'show_bookings' => true,
                    'show_member_last_visits' => true,
                    'show_mandate_id' => true,
                    'service_history_visibility' => 'all',
                    'show_additional_gender_options' => true,
                    'visible_name' => 'full',
                    'allow_posts_follows' => 'anyone',
                    'fitprofile_visibility' => 'anyone',
                    'progress_pictures_visibility' => 'network',
                    'nutrition_visibility' => 'network',
                    'progress_graphs_visibility' => 'anyone',
                    'followers_visibility' => 'anyone',
                    'exercises_visibility' => 'everybody',
                    'leaderboard_visibility' => 'everyone',
                    'enable_advanced_security' => true,
                    'default_date_format' => 'MM/DD/YYYY',
                    'default_time_format' => '12h',
                    'update_email_frequency' => 'weekly',
                    'progress_email_frequency' => 'weekly',
                ];
            }
            
            return response()->json([
                'success' => true,
                'clientSettings' => $clientSettings
            ], 200);
        } else {
            return response()->json(['error' => 'Settings not found'], 404);
        }
    }

    //-------------- Update Client Settings ---------------\\
    public function updateClientSettings(Request $request)
    {
        $settings = Setting::where('deleted_at', '=', null)->first();
        
        if (!$settings) {
            return response()->json(['error' => 'Settings not found'], 404);
        }

        // Get all client settings from request
        $clientSettings = [
            'clients_can_edit_info' => $request->input('clients_can_edit_info', false),
            'change_requests_email' => $request->input('change_requests_email', ''),
            'show_payment_methods' => $request->input('show_payment_methods', true),
            'show_invoices' => $request->input('show_invoices', true),
            'show_credits' => $request->input('show_credits', true),
            'show_memberships' => $request->input('show_memberships', true),
            'clients_can_end_contract' => $request->input('clients_can_end_contract', false),
            'clients_can_pause_contract' => $request->input('clients_can_pause_contract', false),
            'min_pause_days' => $request->input('min_pause_days', 0),
            'max_pause_days' => $request->input('max_pause_days', 0),
            'allowed_pauses' => $request->input('allowed_pauses', 1),
            'pause_period_value' => $request->input('pause_period_value', 1),
            'pause_period_unit' => $request->input('pause_period_unit', 'months'),
            'show_bought_products' => $request->input('show_bought_products', true),
            'show_bookings' => $request->input('show_bookings', true),
            'show_member_last_visits' => $request->input('show_member_last_visits', true),
            'show_mandate_id' => $request->input('show_mandate_id', true),
            'service_history_visibility' => $request->input('service_history_visibility', 'all'),
            'show_additional_gender_options' => $request->input('show_additional_gender_options', true),
            'visible_name' => $request->input('visible_name', 'full'),
            'allow_posts_follows' => $request->input('allow_posts_follows', 'anyone'),
            'fitprofile_visibility' => $request->input('fitprofile_visibility', 'anyone'),
            'progress_pictures_visibility' => $request->input('progress_pictures_visibility', 'network'),
            'nutrition_visibility' => $request->input('nutrition_visibility', 'network'),
            'progress_graphs_visibility' => $request->input('progress_graphs_visibility', 'anyone'),
            'followers_visibility' => $request->input('followers_visibility', 'anyone'),
            'exercises_visibility' => $request->input('exercises_visibility', 'everybody'),
            'leaderboard_visibility' => $request->input('leaderboard_visibility', 'everyone'),
            'enable_advanced_security' => $request->input('enable_advanced_security', true),
            'default_date_format' => $request->input('default_date_format', 'MM/DD/YYYY'),
            'default_time_format' => $request->input('default_time_format', '12h'),
            'update_email_frequency' => $request->input('update_email_frequency', 'weekly'),
            'progress_email_frequency' => $request->input('progress_email_frequency', 'weekly'),
        ];

        $settings->update([
            'client_settings' => $clientSettings
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Client settings updated successfully',
            'clientSettings' => $clientSettings
        ], 200);
    }

    //-------------- Get Module Settings ---------------\\
    public function getModuleSettings(Request $request)
    {
        $settings = Setting::where('deleted_at', '=', null)->first();
        
        if ($settings) {
            $moduleSettings = $settings->module_settings ?? [];
            
            // Return default values if no settings exist
            if (empty($moduleSettings)) {
                $moduleSettings = [
                    'all_coaches_coach_all_clients' => false,
                    'coaches_can_use_max_ai' => true,
                    'coaches_can_see_club_visitors' => false,
                    'groups_visibility' => 'club',
                    'challenges_visibility' => 'club',
                    'auto_make_new_members_pro' => false,
                    'auto_invite_new_clients' => true,
                    'add_calories_burned_to_nutrition' => true,
                    'clients_can_create_workout_plans' => true,
                    'workout_plans_visibility' => 'all',
                ];
            }
            
            return response()->json([
                'success' => true,
                'moduleSettings' => $moduleSettings
            ], 200);
        } else {
            return response()->json(['error' => 'Settings not found'], 404);
        }
    }

    //-------------- Update Module Settings ---------------\\
    public function updateModuleSettings(Request $request)
    {
        $settings = Setting::where('deleted_at', '=', null)->first();
        
        if (!$settings) {
            return response()->json(['error' => 'Settings not found'], 404);
        }

        // Get all module settings from request
        $moduleSettings = [
            'all_coaches_coach_all_clients' => $request->input('all_coaches_coach_all_clients', false),
            'coaches_can_use_max_ai' => $request->input('coaches_can_use_max_ai', true),
            'coaches_can_see_club_visitors' => $request->input('coaches_can_see_club_visitors', false),
            'groups_visibility' => $request->input('groups_visibility', 'club'),
            'challenges_visibility' => $request->input('challenges_visibility', 'club'),
            'auto_make_new_members_pro' => $request->input('auto_make_new_members_pro', false),
            'auto_invite_new_clients' => $request->input('auto_invite_new_clients', true),
            'add_calories_burned_to_nutrition' => $request->input('add_calories_burned_to_nutrition', true),
            'clients_can_create_workout_plans' => $request->input('clients_can_create_workout_plans', true),
            'workout_plans_visibility' => $request->input('workout_plans_visibility', 'all'),
        ];

        $settings->update([
            'module_settings' => $moduleSettings
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Module settings updated successfully',
            'moduleSettings' => $moduleSettings
        ], 200);
    }

    //-------------- Get Member Settings ---------------\\
    public function getMemberSettings(Request $request)
    {
        $settings = Setting::where('deleted_at', '=', null)->first();
        
        if ($settings) {
            $memberSettings = $settings->client_settings ?? [];
            
            // Return default values if no settings exist
            if (empty($memberSettings)) {
                $memberSettings = [
                    'clients_can_edit_info' => false,
                    'change_requests_email' => '',
                    'show_payment_methods' => true,
                    'show_invoices' => true,
                    'show_credits' => true,
                    'show_memberships' => true,
                    'clients_can_end_contract' => false,
                    'clients_can_pause_contract' => false,
                    'min_pause_days' => 0,
                    'max_pause_days' => 0,
                    'allowed_pauses' => 1,
                    'pause_period_value' => 1,
                    'pause_period_unit' => 'months',
                    'show_bought_products' => true,
                    'show_bookings' => true,
                    'show_member_last_visits' => true,
                    'show_mandate_id' => true,
                    'service_history_visibility' => 'all',
                    'show_additional_gender_options' => true,
                    'visible_name' => 'full',
                    'allow_posts_follows' => 'anyone',
                    'fitprofile_visibility' => 'anyone',
                    'progress_pictures_visibility' => 'network',
                    'nutrition_visibility' => 'network',
                    'progress_graphs_visibility' => 'anyone',
                    'followers_visibility' => 'anyone',
                    'exercises_visibility' => 'everybody',
                    'leaderboard_visibility' => 'everyone',
                    'enable_advanced_security' => true,
                    'default_date_format' => 'MM/DD/YYYY',
                    'default_time_format' => '12h',
                    'update_email_frequency' => 'weekly',
                    'progress_email_frequency' => 'weekly',
                ];
            }
            
            return response()->json([
                'success' => true,
                'memberSettings' => $memberSettings
            ], 200);
        } else {
            return response()->json(['error' => 'Settings not found'], 404);
        }
    }

    //-------------- Update Member Settings ---------------\\
    public function updateMemberSettings(Request $request)
    {
        $settings = Setting::where('deleted_at', '=', null)->first();
        
        if (!$settings) {
            return response()->json(['error' => 'Settings not found'], 404);
        }

        // Get all member settings from request (using same structure as client_settings)
        $memberSettings = [
            'clients_can_edit_info' => $request->input('clients_can_edit_info', false),
            'change_requests_email' => $request->input('change_requests_email', ''),
            'show_payment_methods' => $request->input('show_payment_methods', true),
            'show_invoices' => $request->input('show_invoices', true),
            'show_credits' => $request->input('show_credits', true),
            'show_memberships' => $request->input('show_memberships', true),
            'clients_can_end_contract' => $request->input('clients_can_end_contract', false),
            'clients_can_pause_contract' => $request->input('clients_can_pause_contract', false),
            'min_pause_days' => $request->input('min_pause_days', 0),
            'max_pause_days' => $request->input('max_pause_days', 0),
            'allowed_pauses' => $request->input('allowed_pauses', 1),
            'pause_period_value' => $request->input('pause_period_value', 1),
            'pause_period_unit' => $request->input('pause_period_unit', 'months'),
            'show_bought_products' => $request->input('show_bought_products', true),
            'show_bookings' => $request->input('show_bookings', true),
            'show_member_last_visits' => $request->input('show_member_last_visits', true),
            'show_mandate_id' => $request->input('show_mandate_id', true),
            'service_history_visibility' => $request->input('service_history_visibility', 'all'),
            'show_additional_gender_options' => $request->input('show_additional_gender_options', true),
            'visible_name' => $request->input('visible_name', 'full'),
            'allow_posts_follows' => $request->input('allow_posts_follows', 'anyone'),
            'fitprofile_visibility' => $request->input('fitprofile_visibility', 'anyone'),
            'progress_pictures_visibility' => $request->input('progress_pictures_visibility', 'network'),
            'nutrition_visibility' => $request->input('nutrition_visibility', 'network'),
            'progress_graphs_visibility' => $request->input('progress_graphs_visibility', 'anyone'),
            'followers_visibility' => $request->input('followers_visibility', 'anyone'),
            'exercises_visibility' => $request->input('exercises_visibility', 'everybody'),
            'leaderboard_visibility' => $request->input('leaderboard_visibility', 'everyone'),
            'enable_advanced_security' => $request->input('enable_advanced_security', true),
            'default_date_format' => $request->input('default_date_format', 'MM/DD/YYYY'),
            'default_time_format' => $request->input('default_time_format', '12h'),
            'update_email_frequency' => $request->input('update_email_frequency', 'weekly'),
            'progress_email_frequency' => $request->input('progress_email_frequency', 'weekly'),
        ];

        // Store in client_settings column (member settings and client settings are the same)
        $settings->update([
            'client_settings' => $memberSettings
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Member settings updated successfully',
            'memberSettings' => $memberSettings
        ], 200);
    }

    //-------------- Get Financial Info ---------------\\
    public function getFinancialInfo(Request $request)
    {
        $user = Auth::user();
        $gymId = $user->gym_id ?? null;
        
        $financialSetting = FinancialSetting::where('gym_id', $gymId)
            ->where('deleted_at', null)
            ->first();
        
        if ($financialSetting) {
            $financialInfo = [
                'bank_account_holder' => $financialSetting->bank_account_holder ?? '',
                'bank_account_number' => $financialSetting->bank_account_number ?? '',
                'bic_swift_code' => $financialSetting->bic_swift_code ?? '',
                'default_sales_tax' => $financialSetting->default_sales_tax ?? 'default',
                'income_categories' => $financialSetting->income_categories ?? ['Personal training', 'Memberships', 'Other', 'Retail', 'Group training'],
                'vat_percentage_manual' => $financialSetting->vat_percentage_manual ?? false,
                'show_employee_name' => $financialSetting->show_employee_name ?? false,
                'append_club_id' => $financialSetting->append_club_id ?? false,
                'show_date_on_entry' => $financialSetting->show_date_on_entry ?? false,
                'invoice_text' => $financialSetting->invoice_text ?? 'Default Invoice text',
                'extra_field_staff' => $financialSetting->extra_field_staff ?? '',
                'extra_field_clients_1' => $financialSetting->extra_field_clients_1 ?? '',
                'extra_field_clients_2' => $financialSetting->extra_field_clients_2 ?? '',
                'cc_email' => $financialSetting->cc_email ?? '',
                'manual_invoices_merge' => $financialSetting->manual_invoices_merge ?? 'none',
                'pos_invoices_merge' => $financialSetting->pos_invoices_merge ?? 'none',
                'membership_invoices_merge' => $financialSetting->membership_invoices_merge ?? 'none',
            ];
        } else {
            // Return default values if no settings exist
            $financialInfo = [
                'bank_account_holder' => '',
                'bank_account_number' => '',
                'bic_swift_code' => '',
                'default_sales_tax' => 'default',
                'income_categories' => ['Personal training', 'Memberships', 'Other', 'Retail', 'Group training'],
                'vat_percentage_manual' => false,
                'show_employee_name' => false,
                'append_club_id' => false,
                'show_date_on_entry' => false,
                'invoice_text' => 'Default Invoice text',
                'extra_field_staff' => '',
                'extra_field_clients_1' => '',
                'extra_field_clients_2' => '',
                'cc_email' => '',
                'manual_invoices_merge' => 'none',
                'pos_invoices_merge' => 'none',
                'membership_invoices_merge' => 'none',
            ];
        }
        
        return response()->json([
            'success' => true,
            'financialInfo' => $financialInfo
        ], 200);
    }

    //-------------- Update Financial Info ---------------\\
    public function updateFinancialInfo(Request $request)
    {
        $user = Auth::user();
        $gymId = $user->gym_id ?? null;
        
        if (!$gymId) {
            return response()->json([
                'error' => 'User not associated with any gym'
            ], 400);
        }

        // Find or create financial setting for this gym
        $financialSetting = FinancialSetting::where('gym_id', $gymId)
            ->where('deleted_at', null)
            ->first();

        if (!$financialSetting) {
            $financialSetting = new FinancialSetting();
            $financialSetting->gym_id = $gymId;
        }

        // Update all fields from request
        $financialSetting->bank_account_holder = $request->input('bank_account_holder', '');
        $financialSetting->bank_account_number = $request->input('bank_account_number', '');
        $financialSetting->bic_swift_code = $request->input('bic_swift_code', '');
        $financialSetting->default_sales_tax = $request->input('default_sales_tax', 'default');
        $financialSetting->income_categories = $request->input('income_categories', ['Personal training', 'Memberships', 'Other', 'Retail', 'Group training']);
        $financialSetting->vat_percentage_manual = $request->input('vat_percentage_manual', false);
        $financialSetting->show_employee_name = $request->input('show_employee_name', false);
        $financialSetting->append_club_id = $request->input('append_club_id', false);
        $financialSetting->show_date_on_entry = $request->input('show_date_on_entry', false);
        $financialSetting->invoice_text = $request->input('invoice_text', 'Default Invoice text');
        $financialSetting->extra_field_staff = $request->input('extra_field_staff', '');
        $financialSetting->extra_field_clients_1 = $request->input('extra_field_clients_1', '');
        $financialSetting->extra_field_clients_2 = $request->input('extra_field_clients_2', '');
        $financialSetting->cc_email = $request->input('cc_email', '');
        $financialSetting->manual_invoices_merge = $request->input('manual_invoices_merge', 'none');
        $financialSetting->pos_invoices_merge = $request->input('pos_invoices_merge', 'none');
        $financialSetting->membership_invoices_merge = $request->input('membership_invoices_merge', 'none');

        $financialSetting->save();

        return response()->json([
            'success' => true,
            'message' => 'Financial info updated successfully',
            'financialInfo' => [
                'bank_account_holder' => $financialSetting->bank_account_holder,
                'bank_account_number' => $financialSetting->bank_account_number,
                'bic_swift_code' => $financialSetting->bic_swift_code,
                'default_sales_tax' => $financialSetting->default_sales_tax,
                'income_categories' => $financialSetting->income_categories,
                'vat_percentage_manual' => $financialSetting->vat_percentage_manual,
                'show_employee_name' => $financialSetting->show_employee_name,
                'append_club_id' => $financialSetting->append_club_id,
                'show_date_on_entry' => $financialSetting->show_date_on_entry,
                'invoice_text' => $financialSetting->invoice_text,
                'extra_field_staff' => $financialSetting->extra_field_staff,
                'extra_field_clients_1' => $financialSetting->extra_field_clients_1,
                'extra_field_clients_2' => $financialSetting->extra_field_clients_2,
                'cc_email' => $financialSetting->cc_email,
                'manual_invoices_merge' => $financialSetting->manual_invoices_merge,
                'pos_invoices_merge' => $financialSetting->pos_invoices_merge,
                'membership_invoices_merge' => $financialSetting->membership_invoices_merge,
            ]
        ], 200);
    }

}
