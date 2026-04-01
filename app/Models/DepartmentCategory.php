<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DepartmentCategory extends Model
{
    protected $dates = ['deleted_at'];

    protected $fillable = [
        'code', 'name',
    ];

    public function products()
    {
        return $this->hasMany('App\Models\Product', 'department_category_id', 'id');
    }

}
