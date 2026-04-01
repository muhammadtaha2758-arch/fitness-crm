<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PollVote extends Model
{
    use HasFactory;

    protected $fillable = [
        'poll_id',
        'poll_option_id',
        'user_id'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the poll that owns this vote
     */
    public function poll(): BelongsTo
    {
        return $this->belongsTo(Poll::class);
    }

    /**
     * Get the poll option that was voted for
     */
    public function pollOption(): BelongsTo
    {
        return $this->belongsTo(PollOption::class);
    }

    /**
     * Get the user that cast this vote
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
