<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;

class Note extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $table = 'notes';
    
    protected $fillable = [
        'member_id',
        'target_member_id',
        'description',
        'category',
        'created_by',
        'created_by_name',
        'created_by_user_id',
        'coach_id',
        'target_coach_id',
        'is_shared',
        'gym_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
        'is_shared' => 'boolean',
    ];

    /**
     * Boot the model
     */
    protected static function boot()
    {
        parent::boot();

        // Ensure deleted_at is null when creating to prevent MySQL storing 0000-00-00 00:00:00
        static::creating(function ($note) {
            $note->deleted_at = null;
        });
    }

    // Relationship with Member
    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    // Relationship with Coach (who the note is for)
    public function coach()
    {
        return $this->belongsTo(Coach::class, 'coach_id');
    }

    // Relationship with User (who created the note - admin or coach)
    public function createdByUser()
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }
}
