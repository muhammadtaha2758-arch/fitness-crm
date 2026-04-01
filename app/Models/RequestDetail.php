<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestDetail extends Model
{

    protected $fillable = [
        'id', 'requests_id','request_unit_id', 'quantity', 'product_id', 'total', 'product_variant_id',
        'cost', 'TaxNet', 'discount', 'discount_method', 'tax_method',
    ];

    protected $casts = [
        'total' => 'double',
        'cost' => 'double',
        'TaxNet' => 'double',
        'discount' => 'double',
        'quantity' => 'double',
        'requests_id' => 'integer',
        'request_unit_id' => 'integer',
        'product_id' => 'integer',
        'product_variant_id' => 'integer',
    ];

    public function request()
    {
        return $this->belongsTo('App\Models\Requests');
    }

    public function product()
    {
        return $this->belongsTo('App\Models\Product');
    }

}
