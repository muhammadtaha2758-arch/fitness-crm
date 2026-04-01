<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountsLedger extends Model
{
    // Define the table name if it's not the plural of the model name
    protected $table = 'accounts_ledger';

    // The attributes that are mass assignable
    protected $fillable = [
        'voucher_number',
        'voucher_type',
        'entry_date',
        'account_id',
        'description',
        'debit_amount',
        'credit_amount',
        'reference_number',
        'created_by',
    ];

    // Define any relationships here
    // For example, if this ledger entry belongs to an account:
    public function account()
    {
        return $this->belongsTo(Account::class, 'account_id');
    }

    // If there's a relationship with users (who create the entries)
    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
