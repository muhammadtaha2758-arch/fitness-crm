<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CoachSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'coach_id',
        'gym_id',
        'account_status',
        'account_type',
        'join_date',
        'notifications',
        'profile_visibility',
        'contact_visibility',
        'schedule_visibility',
        'default_session_duration',
        'max_clients_per_day',
        'work_start_time',
        'work_end_time',
        'break_time',
        'payment_method',
        'payment_frequency',
        'tax_id',
        'two_factor_auth',
        'session_timeout',
    ];

    protected $casts = [
        'join_date' => 'date',
        'work_start_time' => 'datetime:H:i:s',
        'work_end_time' => 'datetime:H:i:s',
        'notifications' => 'array',
        'two_factor_auth' => 'boolean',
        'default_session_duration' => 'integer',
        'max_clients_per_day' => 'integer',
        'break_time' => 'integer',
        'session_timeout' => 'integer',
    ];

    // Relationships
    public function coach()
    {
        return $this->belongsTo(Coach::class);
    }

    public function gym()
    {
        return $this->belongsTo(Gym::class);
    }

    // Scopes
    public function scopeByGym($query, $gymId)
    {
        return $query->where('gym_id', $gymId);
    }

    public function scopeByCoach($query, $coachId)
    {
        return $query->where('coach_id', $coachId);
    }

    public function scopeActive($query)
    {
        return $query->where('account_status', 'active');
    }

    // Helper methods
    public function isActive()
    {
        return $this->account_status === 'active';
    }

    public function getDefaultNotifications()
    {
        return [
            'email' => [
                'newTasks' => true,
                'messages' => true,
                'memberAssignments' => true,
                'scheduleUpdates' => false
            ],
            'sms' => [
                'urgentTasks' => true,
                'scheduleChanges' => false
            ]
        ];
    }

    public function getDefaultSettings()
    {
        return [
            'accountStatus' => 'active',
            'accountType' => 'full-time',
            'joinDate' => now()->format('Y-m-d'),
            'notifications' => $this->getDefaultNotifications(),
            'privacy' => [
                'profileVisibility' => 'public',
                'contactVisibility' => 'members-only',
                'scheduleVisibility' => 'members-only'
            ],
            'workPreferences' => [
                'defaultSessionDuration' => 60,
                'maxClientsPerDay' => 8,
                'workStartTime' => '09:00',
                'workEndTime' => '17:00',
                'breakTime' => 10
            ],
            'payment' => [
                'paymentMethod' => 'bank-transfer',
                'paymentFrequency' => 'monthly',
                'taxId' => ''
            ],
            'security' => [
                'twoFactorAuth' => false,
                'sessionTimeout' => 30
            ]
        ];
    }
}
