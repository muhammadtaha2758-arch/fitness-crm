<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoCatalog extends Model
{
    protected $table = 'video_catalog';
    
    protected $fillable = [
        'filename',
        'name',
        'category',
        'equipment',
        'file_size_mb',
        'modified_date',
        'relative_path',
        'full_path',
        'video_url',
        'thumbnail_url',
        'is_active',
        'level',
        'targeted_muscle',
        'exercise_instructions',
        'exercise_tips',
        'primary_activating_muscles',
        'secondary_activating_muscles',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'file_size_mb' => 'decimal:2',
        'modified_date' => 'datetime',
        'is_active' => 'boolean',
    ];

    /**
     * Scope to get only active videos
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to filter by category
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Scope to search by name, filename, category, equipment, level, targeted_muscle, and exercise metadata
     */
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', '%' . $search . '%')
                ->orWhere('filename', 'like', '%' . $search . '%')
                ->orWhere('category', 'like', '%' . $search . '%')
                ->orWhere('equipment', 'like', '%' . $search . '%')
                ->orWhere('level', 'like', '%' . $search . '%')
                ->orWhere('targeted_muscle', 'like', '%' . $search . '%')
                ->orWhere('exercise_instructions', 'like', '%' . $search . '%')
                ->orWhere('exercise_tips', 'like', '%' . $search . '%')
                ->orWhere('primary_activating_muscles', 'like', '%' . $search . '%')
                ->orWhere('secondary_activating_muscles', 'like', '%' . $search . '%');
        });
    }

    /**
     * Get formatted file size
     */
    public function getFormattedFileSizeAttribute()
    {
        if ($this->file_size_mb >= 1024) {
            return round($this->file_size_mb / 1024, 2) . ' GB';
        }
        return $this->file_size_mb . ' MB';
    }

}
