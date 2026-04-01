<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FitnessPose extends Model
{
    use SoftDeletes;

    protected $table = 'fitnessPoses';

    protected $guarded = [];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];


}
