<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $dates = ['deleted_at'];

    protected $fillable = [
        'date', 'Ref', 'GrandTotal',
        'discount', 'shipping', 'statut', 'notes', 'TaxNet', 'tax_rate',
        'created_at', 'updated_at', 'deleted_at','direct_cost_rate','in_direct_cost_rate','margin_cost','total_in_direct_cost',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'GrandTotal' => 'double',
        'discount' => 'double',
        'shipping' => 'double',
        'TaxNet' => 'double',
        'tax_rate' => 'double',
        'direct_cost_rate' => 'double',
        'in_direct_cost_rate' => 'double',
        'margin_cost' => 'double',
        'total_in_direct_cost' => 'double',
    ];

    public function details()
    {
        return $this->hasMany('App\Models\RecipeDetail');
    }

    // public function provider()
    // {
    //     return $this->belongsTo('App\Models\Provider');
    // }

    public function facture()
    {
        return $this->hasMany('App\Models\PaymentPurchase');
    }

    // public function warehouse()
    // {
    //     return $this->belongsTo('App\Models\Warehouse');
    // }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

}
