<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoachSignupVerification extends Model
{
    protected $table = 'coach_signup_verifications';

    protected $fillable = [
        'email',
        'token',
        'first_name',
        'last_name',
        'sex',
        'business_name',
        'business_phone',
        'password',
        'expires_at',
    ];

    protected $hidden = ['password'];

    protected $casts = [
        'expires_at' => 'datetime',
        'used_at' => 'datetime',
    ];

    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    public function isUsed(): bool
    {
        return $this->used_at !== null;
    }

    public function markAsUsed(): void
    {
        $this->update(['used_at' => now()]);
    }
}
