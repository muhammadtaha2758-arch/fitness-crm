<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Instructor extends Model
{
    use SoftDeletes;

    protected $table = 'Instructors';

    protected $guarded = [];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];


}
