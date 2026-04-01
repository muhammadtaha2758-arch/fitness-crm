<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname', 'lastname', 'username', 'email', 'password', 'phone', 'status', 'statut', 'avatar', 'role_id','is_all_warehouses', 'gym_id', 'theme', 'background_color', 'background_image', 'token', 'token_expires_at', 'member_id', 'coach_id', 'is_super_admin', 'password_change_required', 'onboarding_required'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'token_expires_at' => 'datetime',
        'role_id' => 'integer',
        'status' => 'integer',
        'is_all_warehouses' => 'integer',
        'is_super_admin' => 'boolean',
        'password_change_required' => 'boolean',
        'onboarding_required' => 'boolean',
    ];

    // OauthAccessToken model removed - table dropped
    // public function oauthAccessToken()
    // {
    //     return $this->hasMany('\App\Models\OauthAccessToken');
    // }

    // Role and Permission models removed - tables dropped
    // public function roles()
    // {
    //     return $this->belongsToMany(Role::class);
    // }
    //
    // public function assignRole(Role $role)
    // {
    //     return $this->roles()->save($role);
    // }
    //
    // public function hasRole($role)
    // {
    //     if (is_string($role)) {
    //         return $this->roles->contains('name', $role);
    //     }
    //     return !!$role->intersect($this->roles)->count();
    // }

    public function assignedWarehouses()
    {
        return $this->belongsToMany('App\Models\Warehouse');
    }

    // Community Posts Relationships
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function gym()
    {
        return $this->belongsTo(Gym::class, 'gym_id');
    }

    /**
     * Get the member associated with this user
     */
    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    /**
     * Check if user is a super admin
     */
    public function isSuperAdmin()
    {
        return $this->is_super_admin === true;
    }

    /**
     * Get all gyms owned by this super admin
     */
    public function ownedGyms()
    {
        return $this->hasMany(Gym::class, 'super_admin_id');
    }

    /**
     * Check if user can access a specific gym
     * Super admins can access all their owned gyms
     * Regular users can only access their own gym
     */
    public function canAccessGym($gymId)
    {
        if ($this->isSuperAdmin()) {
            return $this->ownedGyms()->where('id', $gymId)->exists();
        }
        
        return $this->gym_id == $gymId;
    }

    /**
     * Whether the user's gym has an active subscription (gym owner can use the system).
     * Super admins are exempt. Users with no gym_id are not subscribed.
     */
    public function subscribed()
    {
        if ($this->isSuperAdmin()) {
            return true;
        }

        if (!$this->gym_id) {
            return false;
        }

        $gym = $this->gym;
        if (!$gym) {
            return false;
        }

        return $gym->hasActiveSubscription();
    }
}