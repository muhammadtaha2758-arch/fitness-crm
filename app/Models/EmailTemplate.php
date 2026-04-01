<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'gym_id',
        'email_type',
        'subject',
        'body',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get the gym that owns the email template.
     */
    public function gym()
    {
        return $this->belongsTo(Gym::class);
    }

    /**
     * Scope to get templates by gym
     */
    public function scopeByGym($query, $gymId)
    {
        return $query->where('gym_id', $gymId);
    }

    /**
     * Scope to get active templates
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get template by type and gym
     */
    public static function getByTypeAndGym($emailType, $gymId)
    {
        return self::where('email_type', $emailType)
                   ->where('gym_id', $gymId)
                   ->active()
                   ->first();
    }

    /**
     * Get all templates for a gym
     */
    public static function getAllForGym($gymId)
    {
        return self::where('gym_id', $gymId)
                   ->active()
                   ->get()
                   ->keyBy('email_type');
    }
}
