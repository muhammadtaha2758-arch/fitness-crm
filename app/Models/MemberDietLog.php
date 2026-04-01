<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MemberDietLog extends Model
{
    use SoftDeletes;

    protected $table = 'memberDietLogs';

    protected $guarded = [];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function diet()
    {
        return $this->belongsTo(DietPlan::class, 'diet_id');
    }

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }
}
