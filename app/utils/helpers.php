<?php
namespace App\utils;

use App\Models\Currency;
// Role model removed - table dropped
// use App\Models\Role;
use App\Models\Setting;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

class helpers
{

    //  Helper Multiple Filter
    public function filter($model, $columns, $param, $request)
    {
        // Loop through the fields checking if they've been input, if they have add
        //  them to the query.
        $fields = [];
        for ($key = 0; $key < count($columns); $key++) {
            $fields[$key]['param'] = $param[$key];
            $fields[$key]['value'] = $columns[$key];
        }

        foreach ($fields as $field) {
            $model->where(function ($query) use ($request, $field, $model) {
                return $model->when($request->filled($field['value']),
                    function ($query) use ($request, $model, $field) {
                        $field['param'] = 'like' ?
                        $model->where($field['value'], 'like', "{$request[$field['value']]}")
                        : $model->where($field['value'], $request[$field['value']]);
                    });
            });
        }

        // Finally return the model
        return $model;
    }

    //  Check If Hass Permission Show All records
    public function Show_Records($model)
    {
        // Role table dropped - allow all records
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        if (!$ShowRecord) {
            return $model->where('user_id', '=', Auth::user()->id);
        }
        return $model;
    }

    // Get Currency
    public function Get_Currency()
    {
        try {
            // Check if currencies table exists
            if (!Schema::hasTable('currencies')) {
                return '$'; // Default currency symbol
            }
            
            $settings = Setting::with('Currency')->where('deleted_at', '=', null)->first();

            if ($settings && $settings->currency_id) {
                $currency = Currency::where('id', $settings->currency_id)
                    ->where('deleted_at', '=', null)
                    ->first();
                if ($currency && isset($settings['Currency']) && $settings['Currency']) {
                    $symbol = $settings['Currency']->symbol;
                } else {
                    $symbol = '$';
                }
            } else {
                $symbol = '$';
            }
            return $symbol;
        } catch (\Exception $e) {
            // If any error occurs (table doesn't exist, etc.), return default
            return '$';
        }
    }

    // Get Currency COde
    public function Get_Currency_Code()
    {
        $settings = Setting::with('Currency')->where('deleted_at', '=', null)->first();

        if ($settings && $settings->currency_id) {
            if (Currency::where('id', $settings->currency_id)
                ->where('deleted_at', '=', null)
                ->first()) {
                $code = $settings['Currency']->code;
            } else {
                $code = 'usd';
            }
        } else {
            $code = 'usd';
        }
        return $code;
    }

}
