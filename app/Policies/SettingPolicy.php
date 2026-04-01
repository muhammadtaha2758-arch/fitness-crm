<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Setting;
// Permission model removed - table dropped
// use App\Models\Permission;
use Illuminate\Auth\Access\HandlesAuthorization;

class SettingPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Setting  $setting
     * @return mixed
     */
    public function view(User $user)
    {
        // Permission table dropped - allow all users
        return true;
        // $permission = Permission::where('name', 'setting_system')->first();
        // Permission table dropped - allow all users
        return true;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        // Permission table dropped - allow all users
        return true;
        // $permission = Permission::where('name', 'setting_system')->first();
        // Permission table dropped - allow all users
        return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Setting  $setting
     * @return mixed
     */
    public function update(User $user)
    {
        // Permission table dropped - allow all users
        return true;
        // $permission = Permission::where('name', 'setting_system')->first();
        // Permission table dropped - allow all users
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Setting  $setting
     * @return mixed
     */
    public function delete(User $user)
    {
        // Permission table dropped - allow all users
        return true;
        // $permission = Permission::where('name', 'setting_system')->first();
        // Permission table dropped - allow all users
        return true;
    }

    public function sms_settings(User $user)
    {
        // Permission table dropped - allow all users
        return true;
        // $permission = Permission::where('name', 'sms_settings')->first();
        // Permission table dropped - allow all users
        return true;
    }

    public function pos_settings(User $user)
    {
        // Permission table dropped - allow all users
        return true;
        // $permission = Permission::where('name', 'pos_settings')->first();
        // Permission table dropped - allow all users
        return true;
    }

    public function payment_gateway(User $user)
    {
        // Permission table dropped - allow all users
        return true;
        // $permission = Permission::where('name', 'payment_gateway')->first();
        // Permission table dropped - allow all users
        return true;
    }

    public function mail_settings(User $user)
    {
        // Permission table dropped - allow all users
        return true;
        // $permission = Permission::where('name', 'mail_settings')->first();
        // Permission table dropped - allow all users
        return true;
    }

    public function notification_template(User $user)
    {
        // Permission table dropped - allow all users
        return true;
        // $permission = Permission::where('name', 'notification_template')->first();
        // Permission table dropped - allow all users
        return true;
    }


    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Setting  $setting
     * @return mixed
     */
    public function restore(User $user)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Setting  $setting
     * @return mixed
     */
    public function forceDelete(User $user)
    {
        //
    }
}
