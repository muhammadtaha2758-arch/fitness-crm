<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    protected $table = 'activity_logs';
    
    protected $fillable = [
        'gym_id',
        'member_id',
        'login_time',
        'ip_address',
        'device_info',
        'login_status',
        'session_id',
    ];

    protected $casts = [
        'login_time' => 'datetime',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function gym()
    {
        return $this->belongsTo(Gym::class);
    }
}
