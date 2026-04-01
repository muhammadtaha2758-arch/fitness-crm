<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ScheduleEventBooking extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'schedule_event_bookings';

    protected $fillable = [
        'schedule_event_id',
        'member_id',
        'gym_id',
        'status',
        'booked_at',
        'cancelled_at',
        'cancellation_reason',
    ];

    protected $casts = [
        'booked_at' => 'datetime',
        'cancelled_at' => 'datetime',
    ];

    public function scheduleEvent()
    {
        return $this->belongsTo(ScheduleEvent::class, 'schedule_event_id');
    }

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }
}
