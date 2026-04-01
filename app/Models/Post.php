<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'gym_id',
        'content',
        'image_path',
        'video_path',
        'is_pinned'
    ];

    protected $casts = [
        'is_pinned' => 'boolean',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->orderBy('created_at', 'asc');
    }
    
    // Scope to filter comments by gym_id (if needed)
    public function commentsForGym($gymId)
    {
        return $this->hasMany(Comment::class)
            ->where('gym_id', $gymId)
            ->orderBy('created_at', 'asc');
    }

    // Accessors
    public function getLikesCountAttribute()
    {
        return $this->likes()->count();
    }

    public function getCommentsCountAttribute()
    {
        return $this->comments()->count();
    }

    public function getImageUrlAttribute()
    {
        if ($this->image_path) {
            return asset('images/community-uploads/posts/' . $this->image_path);
        }
        return null;
    }

    public function getVideoUrlAttribute()
    {
        if ($this->video_path) {
            return asset('images/community-uploads/posts/' . $this->video_path);
        }
        return null;
    }

    // Check if user has liked this post
    public function isLikedBy($userId)
    {
        return $this->likes()->where('user_id', $userId)->exists();
    }
}
