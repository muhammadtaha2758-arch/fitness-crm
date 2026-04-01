<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ComparisonPhoto extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'comparison_photos';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'gym_id',
        'member_id',
        'image_name',
        'image_path',
        'photo_date',
        // Backward-compat fields in case existing records/controllers still use them
        'image_data',
        'is_before',
        'is_after',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    public $timestamps = true;

    protected $casts = [
        'gym_id' => 'integer',
        'is_before' => 'boolean',
        'is_after' => 'boolean',
        'photo_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    public function gym()
    {
        return $this->belongsTo(Gym::class, 'gym_id');
    }

    public function scopeActive($query)
    {
        return $query->whereNull('deleted_at');
    }

    public function scopeForGym($query, $gymId)
    {
        return $query->where('gym_id', $gymId);
    }

    public function getImageUrlAttribute()
    {
        if ($this->image_path) {
            return asset($this->image_path);
        }
        return null;
    }

    public function scopeForMember($query, $memberId)
    {
        return $query->where('member_id', $memberId);
    }

    public function getFormattedSizeAttribute()
    {
        if ($this->image_path && file_exists(public_path($this->image_path))) {
            $bytes = filesize(public_path($this->image_path));
            $units = ['B', 'KB', 'MB', 'GB'];
            
            for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
                $bytes /= 1024;
            }
            
            return round($bytes, 2) . ' ' . $units[$i];
        }
        return 'Unknown';
    }
    /**
     * Get the full URL for the image.
     *
     * @return string
     */
    public function getUrlAttribute(): string
    {
        // Prefer new column image_path; fallback to legacy image_data
        $relativePath = $this->image_path ?: $this->image_data;
        return $relativePath ? asset($relativePath) : '';
    }

    /**
     * Get the file extension.
     *
     * @return string
     */
    public function getExtensionAttribute(): string
    {
        return pathinfo((string) $this->image_name, PATHINFO_EXTENSION);
    }
}
