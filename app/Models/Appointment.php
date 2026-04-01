<?php



namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $table = 'appointments';

    protected $fillable = [
        'gym_id',
        'member_id',
        'coach_id',
        'workout_id',
        'date',
        'start_time',
        'end_time',
        'status',
        'notes',
        'source',
        'rating'
    ];

    protected $casts = [
        'date' => 'date',
        'start_time' => 'string',
        'end_time' => 'string',
        'rating' => 'decimal:1',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    public function coach()
    {
        return $this->belongsTo(Coach::class, 'coach_id');
    }

    // Accessor for client name
    public function getClientNameAttribute()
    {
        return $this->member ? $this->member->membername : 'Unknown Client';
    }

    // Accessor for staff name
    public function getStaffNameAttribute()
    {
        if ($this->coach) {
            return $this->coach->first_name . ' ' . $this->coach->last_name;
        }
        return 'Unknown Staff';
    }
}