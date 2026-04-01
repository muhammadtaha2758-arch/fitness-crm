<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Support extends Model
{
    use HasFactory;

    protected $table = 'support';

    protected $fillable = [
        'ticket_number',
        'user_id',
        'name',
        'email',
        'subject',
        'message',
        'status',
        'priority'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Status constants
    const STATUS_PENDING = 'pending';
    const STATUS_IN_PROGRESS = 'in_progress';
    const STATUS_RESOLVED = 'resolved';
    const STATUS_CLOSED = 'closed';

    // Priority constants
    const PRIORITY_LOW = 'low';
    const PRIORITY_MEDIUM = 'medium';
    const PRIORITY_HIGH = 'high';

    // Get status badge class
    public function getStatusBadgeClass()
    {
        switch ($this->status) {
            case self::STATUS_PENDING:
                return 'badge-warning';
            case self::STATUS_IN_PROGRESS:
                return 'badge-info';
            case self::STATUS_RESOLVED:
                return 'badge-success';
            case self::STATUS_CLOSED:
                return 'badge-secondary';
            default:
                return 'badge-light';
        }
    }

    // Get priority badge class
    public function getPriorityBadgeClass()
    {
        switch ($this->priority) {
            case self::PRIORITY_LOW:
                return 'badge-success';
            case self::PRIORITY_MEDIUM:
                return 'badge-warning';
            case self::PRIORITY_HIGH:
                return 'badge-danger';
            default:
                return 'badge-light';
        }
    }

    // Generate ticket number
    public static function generateTicketNumber()
    {
        $prefix = 'TK';
        $timestamp = now()->format('Ymd');
        $random = str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
        return $prefix . $timestamp . $random;
    }

    // Boot method to auto-generate ticket number
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($support) {
            if (empty($support->ticket_number)) {
                $support->ticket_number = self::generateTicketNumber();
            }
        });
    }
}
