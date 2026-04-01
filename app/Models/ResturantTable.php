<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResturantTable extends Model
{
    protected $table = 'restaurant_tables'; // The table you created manually
    protected $fillable = ['tablename', 'location', 'space','client_id','assigned'];
    protected $casts = [
        'assigned' => 'integer',
        'client_id' => 'integer',
        'space' => 'integer',
        
    ];
    public function client()
    {
        return $this->belongsTo('App\Models\Client');
    }
}
