<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{

    protected $fillable = [
        'currency_id', 'email', 'CompanyName', 'CompanyPhone', 'CompanyAdress','quotation_with_stock',
         'logo','footer','developed_by','client_id','warehouse_id','default_language',
         'is_invoice_footer','invoice_footer','sms_gateway','timezone',
         // New business info fields
         'business_type','description','zip_code','city','country','phone',
         'facebook_page','website','primary_language','secondary_language',
         'company_registration_number','vat_number',
         // Advanced fields
         'club_external_id','club_key','advanced_passwords','hide_for_non_members',
         // Opening hours fields
         'opening_hours','opening_hours_notes',
         // Facilities fields
         'facilities',
        // Contracts fields
        'terms_and_conditions','contracts_additional_fields',
        // Client settings fields
        'client_settings',
        // Module settings fields
        'module_settings',
    ];

    protected $casts = [
        'currency_id' => 'integer',
        'client_id' => 'integer',
        'quotation_with_stock' => 'integer',
        'is_invoice_footer' => 'integer',
        'warehouse_id' => 'integer',
        'opening_hours' => 'array',
        'client_settings' => 'array',
        'module_settings' => 'array',
    ];


}
