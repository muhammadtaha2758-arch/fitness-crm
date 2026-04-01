<?php



namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $table = 'accounts';

    protected $fillable = [
        'account_name',
        'account_type',
        'account_number',
        'opening_balance',
        'current_balance',
        'parent_id',
        'control_account',
        'level'
    ];
}