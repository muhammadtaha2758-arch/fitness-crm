<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExcelFile extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'filename',
        'original_name',
        'filepath',
        'file_size',
        'file_type',
        'uploaded_by',
        'description',
        'status'
    ];

    protected $casts = [
        'uploaded_at' => 'datetime',
        'file_size' => 'integer'
    ];

    // Disable timestamps since your table doesn't have created_at/updated_at
    public $timestamps = false;

    /**
     * Get the user who uploaded the file
     */
    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    /**
     * Get the full file path
     */
    public function getFullPathAttribute()
    {
        return storage_path('app/public/' . $this->filepath);
    }

    /**
     * Get the file URL for download
     */
    public function getFileUrlAttribute()
    {
        return asset('storage/' . $this->filepath);
    }

    /**
     * Get formatted file size
     */
    public function getFormattedSizeAttribute()
    {
        $bytes = $this->file_size;
        $units = ['B', 'KB', 'MB', 'GB'];
        
        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, 2) . ' ' . $units[$i];
    }

    /**
     * Scope for active files
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope for files uploaded by specific user
     */
    public function scopeByUser($query, $userId)
    {
        return $query->where('uploaded_by', $userId);
    }
}
