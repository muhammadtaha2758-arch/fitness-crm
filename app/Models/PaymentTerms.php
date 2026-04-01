<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentTerms extends Model
{
    protected $dates = ['deleted_at'];

    protected $fillable = [
        'value', 'name',
    ];

    // public function products()
    // {
    //     return $this->hasMany('App\Models\Product', 'category_id', 'id');
    // }

}
