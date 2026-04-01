<?php

namespace App\Policies;

use App\Models\Client;
use App\Models\User;
// Permission model removed - table dropped
// use App\Models\Permission;
use Illuminate\Auth\Access\HandlesAuthorization;

class ClientPolicy
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
     * @param  \App\Models\Client  $client
     * @return mixed
     */
    public function view(User $user)
    {
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
        // $permission = Permission::where('name', 'Customers_add')->first();
        // Permission table dropped - allow all users
        return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Client  $client
     * @return mixed
     */
    public function update(User $user)
    {
        // Permission table dropped - allow all users
        return true;
        // $permission = Permission::where('name', 'Customers_edit')->first();
        // Permission table dropped - allow all users
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Client  $client
     * @return mixed
     */
    public function delete(User $user)
    {
        // Permission table dropped - allow all users
        return true;
        // $permission = Permission::where('name', 'Customers_delete')->first();
        // Permission table dropped - allow all users
        return true;
    }

    public function Reports_customers(User $user)
    {
        // Permission table dropped - allow all users
        return true;
        // $permission = Permission::where('name', 'Reports_customers')->first();
        // Permission table dropped - allow all users
        return true;
    }

    public function Reports_profit(User $user)
    {
        // Permission table dropped - allow all users
        return true;
        // $permission = Permission::where('name', 'Reports_profit')->first();
        // Permission table dropped - allow all users
        return true;
    }

    public function Top_customers(User $user)
    {
        // Permission table dropped - allow all users
        return true;
        // $permission = Permission::where('name', 'Top_customers')->first();
        // Permission table dropped - allow all users
        return true;
    }

    public function pay_due(User $user)
    {
        // Permission table dropped - allow all users
        return true;
        // $permission = Permission::where('name', 'pay_due')->first();
        // Permission table dropped - allow all users
        return true;
    }

    public function pay_sale_return_due(User $user)
    {
        // Permission table dropped - allow all users
        return true;
        // $permission = Permission::where('name', 'pay_sale_return_due')->first();
        // Permission table dropped - allow all users
        return true;
    }


    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Client  $client
     * @return mixed
     */
    public function restore(User $user, Client $client)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Client  $client
     * @return mixed
     */
    public function forceDelete(User $user, Client $client)
    {
        //
    }
}


