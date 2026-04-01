<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Counter extends Model
{
    use HasFactory;

    // Specify the table name if it's not the plural form of the model name
    protected $table = 'counters';

    // Indicate if the model should be timestamped
    public $timestamps = true;

    // Define the primary key
    protected $primaryKey = 'id';

    // Allow Laravel to auto-increment the primary key
    public $incrementing = true;

    // Set the key type
    protected $keyType = 'int';

    // Define the fillable attributes for mass assignment
    protected $fillable = [
        'session_date',
        'open_counter_time',
        'open_user_id',
        'open_account_number',
        'open_amount',
        'close_counter_time',
        'close_user_id',
        'close_account_number',
        'close_amount',
        'created_at',
        'updated_at',
    ];

    // Cast specific fields to appropriate data types
    protected $casts = [
        'session_date' => 'date',
        'open_counter_time' => 'datetime',
        'close_counter_time' => 'datetime',
        'open_amount' => 'decimal:2',
        'close_amount' => 'decimal:2',
    ];
}
