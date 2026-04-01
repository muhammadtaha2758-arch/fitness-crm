<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MemberMessage extends Model
{
    use SoftDeletes;

    protected $table = 'membermessages';
    
    /**
     * The primary key for the model.
     * Using 'id' as it's the auto-increment primary key in the database
     *
     * @var string
     */
    protected $primaryKey = 'id';

    protected $fillable = [
        'gym_id',
        // 'id' is auto_increment primary key, so it's not in fillable
        'sender_member_id',
        'sender_coach_id',
        'sender_admin_id', // Admin sender
        'receiver_member_id',
        'receiver_coach_id',
        'receiver_admin_id', // Admin receiver
        'recipient_id', // Recipient ID (can be user ID or coach ID)
        'recipient_type', // Recipient type: 'member', 'trainer', or 'admin'
        'group_id', // For group messages
        'message', // varchar(1000) - legacy column
        'message_text', // text - primary message column
        'sent_date',
        'member_id' // Legacy column (if used)
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at', 'sent_date'];

    /**
     * Get the sender member
     */
    public function senderMember()
    {
        return $this->belongsTo(Member::class, 'sender_member_id');
    }

    /**
     * Get the receiver member
     */
    public function receiverMember()
    {
        return $this->belongsTo(Member::class, 'receiver_member_id');
    }

    /**
     * Get the sender coach
     */
    public function senderCoach()
    {
        return $this->belongsTo(Coach::class, 'sender_coach_id');
    }

    /**
     * Get the receiver coach
     */
    public function receiverCoach()
    {
        return $this->belongsTo(Coach::class, 'receiver_coach_id');
    }

    /**
     * Get the gym
     */
    public function gym()
    {
        return $this->belongsTo(Gym::class, 'gym_id');
    }
}
