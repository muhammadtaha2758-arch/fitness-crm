<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SessionReview extends Model
{
    use SoftDeletes;

    protected $table = 'SessionReviews';

    protected $guarded = [];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function session()
    {
        return $this->belongsTo(FitnessSession::class, 'session_id');
    }

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }
}
