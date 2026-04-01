<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RequestRaw extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'request_raw';

    protected $fillable = [
        
        'warehouse_id',
        'product_id',
        'purchased_id',
        'unit_id',
        'unit_price',
        'date',
        'type',
        'stock_type',
        'stockIn',
        'stockOut',
        'total',
    ];

    protected $dates = ['deleted_at'];

    // Relationships
    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    // public function purchase()
    // {
    //     return $this->belongsTo(Purchase::class, 'purchased_id');
    // }
    // public function sale()
    // {
    //     return $this->belongsTo(Sale::class, 'sale_id');
    // }
    
}

?>