<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ScheduleEvent extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'schedule_events';

    protected $fillable = [
        'gym_id',
        'title',
        'date',
        'start_time',
        'end_time',
        'tab',
        'coach_id',
        'member_id',
        'activity_id',
        'description',
        'schedule_id',
        'max_participants',
        'recurrency',
        'location_id',
        'note_to_employees',
        'bookable_in_advance',
        'bookable_unit',
        'credit_type',
        'cancel_if_no_participants',
        'free_cancellation_period',
        'link',
        'link_text',
        'show_link_before_booking',
        'enable_online_booking',
    ];

    protected $casts = [
        'date' => 'date',
        'start_time' => 'string',
        'end_time' => 'string',
        'max_participants' => 'integer',
        'bookable_in_advance' => 'integer',
        'show_link_before_booking' => 'boolean',
        'enable_online_booking' => 'boolean',
    ];

    public function coach()
    {
        return $this->belongsTo(Coach::class, 'coach_id');
    }

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    public function activity()
    {
        return $this->belongsTo(ScheduleActivity::class, 'activity_id');
    }

    /**
     * Backward compatibility: older data may have activity_id referencing workout_exercises.exercise_id.
     */
    public function workoutActivity()
    {
        return $this->belongsTo(WorkoutActivity::class, 'activity_id', 'exercise_id');
    }

    public function bookings()
    {
        return $this->hasMany(ScheduleEventBooking::class, 'schedule_event_id');
    }

    public function activeBookings()
    {
        return $this->hasMany(ScheduleEventBooking::class, 'schedule_event_id')
            ->where('status', 'booked');
    }

    // Accessor for coach name
    public function getCoachNameAttribute()
    {
        return $this->coach ? $this->coach->first_name . ' ' . $this->coach->last_name : null;
    }

    // Accessor for member name
    public function getMemberNameAttribute()
    {
        return $this->member ? ($this->member->membername ?? $this->member->firstname . ' ' . $this->member->lastname) : null;
    }

    // Accessor for activity name (placeholder - you may need to create Activity model)
    public function getActivityNameAttribute()
    {
        // This is a placeholder - you may need to create an Activity model or use workout types
        $workoutTypes = [
            1 => 'Cardio',
            2 => 'Strength Training',
            3 => 'Yoga',
            4 => 'HIIT',
            5 => 'Pilates',
            6 => 'Boxing',
            7 => 'Crossfit'
        ];
        return $workoutTypes[$this->activity_id] ?? 'Unknown Activity';
    }
}
