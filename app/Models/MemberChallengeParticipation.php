<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MemberChallengeParticipation extends Model
{
    use SoftDeletes;

    protected $table = 'memberChallengeParticipation';

    protected $guarded = [];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];


}
