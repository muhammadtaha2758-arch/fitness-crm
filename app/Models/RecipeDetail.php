<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecipeDetail extends Model
{

    protected $fillable = [
        'id', 'recipe_id', 'purchase_unit_id', 'quantity', 'product_id', 'total', 
        'cost', 'TaxNet', 'discount', 'discount_method', 'tax_method','dinein','takeaway' ,'delivery' 
    ];

    protected $casts = [
        'total' => 'double',
        'cost' => 'double',
        'TaxNet' => 'double',
        'discount' => 'double',
        'quantity' => 'double',
        'recipe_id' => 'integer',
        'purchase_unit_id' => 'integer',
        'product_id' => 'integer',
        'dinein' => 'integer',
        'takeaway' => 'integer',
        'delivery' => 'integer',
    ];

    public function purchase()
    {
        return $this->belongsTo('App\Models\Recipe');
    }

    public function product()
    {
        return $this->belongsTo('App\Models\Product');
    }

}
