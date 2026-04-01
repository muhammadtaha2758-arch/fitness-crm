<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommunityCoverPhoto extends Model
{
    use HasFactory;

    protected $fillable = [
        'image_path',
        'image_url',
        'position_x',
        'position_y',
        'scale',
        'user_id',
        'is_active',
        'gym_id'
    ];

    protected $casts = [
        'position_x' => 'decimal:2',
        'position_y' => 'decimal:2',
        'scale' => 'decimal:2',
        'is_active' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function getActiveCoverPhoto()
    {
        return self::where('is_active', true)->latest()->first();
    }
}
