<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['sender_id', 'group_id', 'message', 'seen', 'sender_type', 'recipient_id', 'recipient_type', 'gym_id'];

    public function sender() {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function group() {
        return $this->belongsTo(Group::class, 'group_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($message) {
            if (!$message->sender_type && $message->sender_id) {
                // Check User table (Admin)
                $sender = User::find($message->sender_id);
                if ($sender) {
                    $message->sender_type = 'Admin';
                    return;
                }
                
                // Check Member table
                $sender = Member::find($message->sender_id);
                if ($sender) {
                    $message->sender_type = 'Member';
                    return;
                }
                
                // Check Trainer table
                $sender = Trainer::find($message->sender_id);
                if ($sender) {
                    $message->sender_type = 'Trainer';
                    return;
                }
            }
        });
    }
}
