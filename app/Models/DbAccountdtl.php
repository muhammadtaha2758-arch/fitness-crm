<?php



namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DbAccountdtl extends Model
{
    protected $table = 'db_accountdtl';

    protected $fillable = [
        'account_name',
        'account_type',
        'account_id',
        'ShortName',
        'head_id',
        'Branch_id'

    ];
}
