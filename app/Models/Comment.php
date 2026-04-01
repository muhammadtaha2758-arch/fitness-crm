<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'post_id',
        'gym_id',
        'content',
        'image_path'
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function likes()
    {
        return $this->hasMany(CommentLike::class);
    }

    // Accessors
    public function getImageUrlAttribute()
    {
        if ($this->image_path) {
            return asset('images/community-uploads/comments/' . $this->image_path);
        }
        return null;
    }

    public function getLikesCountAttribute()
    {
        return $this->likes()->count();
    }

    // Check if user has liked this comment
    public function isLikedBy($userId)
    {
        return $this->likes()->where('user_id', $userId)->exists();
    }
}
