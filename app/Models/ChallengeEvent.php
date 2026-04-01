<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChallengeEvent extends Model
{
    use SoftDeletes;

    protected $table = 'ChallengeEvents';

    protected $guarded = [];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];


}
