<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MemberUnsubscribe extends Model
{
    use HasFactory;

    protected $table = 'member_unsubscribes';

    protected $fillable = [
        'member_id',
        'unsubscribe_type',
        'effective_date',
        'reason',
        'comments',
        'refund_option',
        'status',
        'processed_at'
    ];

    protected $casts = [
        'effective_date' => 'date',
        'processed_at' => 'datetime'
    ];

    /**
     * Get the member that owns the unsubscribe record
     */
    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    /**
     * Scope to get active unsubscribe records
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope to get processed unsubscribe records
     */
    public function scopeProcessed($query)
    {
        return $query->where('status', 'processed');
    }
} 