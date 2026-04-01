<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MemberProfile extends Model
{
    use SoftDeletes;

    protected $table = 'memberProfiles';

    protected $guarded = [];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }
}
