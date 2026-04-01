<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommunityWidget extends Model
{
    use HasFactory;

    protected $fillable = [
        'gym_id',
        'type',
        'title',
        'content',
        'image_path',
        'link_url',
        'link_text',
        'is_active',
        'order',
        'metadata'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'metadata' => 'array',
        'order' => 'integer'
    ];

    protected $appends = [
        'image_url'
    ];

    // Relationships
    public function gym()
    {
        return $this->belongsTo(Gym::class);
    }

    // Accessors
    public function getImageUrlAttribute()
    {
        if ($this->image_path) {
            // If image_path already contains the full path, use it directly
            // Otherwise, construct it (for backward compatibility)
            if (strpos($this->image_path, 'images/') === 0) {
                return asset($this->image_path);
            }
            return asset('images/community-uploads/widgets/' . $this->image_path);
        }
        return null;
    }
}
