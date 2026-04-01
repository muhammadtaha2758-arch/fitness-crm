<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MemberProgress extends Model
{
    use SoftDeletes;

    protected $table = 'member_progress';

    protected $fillable = [
        'member_id',
        'date',
        'metric_type',
        'value',
        'unit',
        'start_value',
        'change',
        'gym_id'
    ];

    protected $casts = [
        'date' => 'date',
        'value' => 'decimal:2',
        'start_value' => 'decimal:2',
        'change' => 'decimal:2',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at', 'date'];

    /**
     * Get the member that belongs to this progress entry.
     */
    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }
}
