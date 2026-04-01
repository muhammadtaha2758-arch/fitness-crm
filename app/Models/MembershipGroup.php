<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MembershipGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'gym_id',
        'name',
        'description',
        'is_active',
        'sort_order'
    ];

    protected $casts = [
        'gym_id' => 'integer',
        'is_active' => 'boolean',
    ];

    /**
     * The attributes that should have default values.
     */
    protected $attributes = [
        'gym_id' => 1,
    ];

    /**
     * Get the gym that this membership group belongs to.
     */
    public function gym()
    {
        return $this->belongsTo(Gym::class, 'gym_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }

    /**
     * Scope to filter by gym_id
     */
    public function scopeForGym($query, $gymId)
    {
        return $query->where('gym_id', $gymId);
    }
}
