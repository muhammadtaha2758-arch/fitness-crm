<?php

namespace App\Http\Controllers;

// Role and role_user models removed - tables dropped
// use App\Models\Role;
use App\Models\Setting;
use App\Models\User;
// use App\Models\role_user;
use App\Models\product_warehouse;
use App\Models\Warehouse;
use App\Models\UserWarehouse;
use App\utils\helpers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Schema;
use File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Intervention\Image\ImageManagerStatic as Image;
use \Nwidart\Modules\Facades\Module;

class UserController extends BaseController
{

    //------------- GET ALL USERS---------\\

    public function index(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'view', User::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;
        $helpers = new helpers();
        // Filter fields With Params to retrieve
        $columns = array(0 => 'username', 1 => 'status', 2 => 'phone', 3 => 'email');
        $param = array(0 => 'like', 1 => '=', 2 => 'like', 3 => 'like');
        $data = array();

        $Role = Auth::user()->roles()->first();
        $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');

        $users = User::where(function ($query) use ($ShowRecord) {
            if (!$ShowRecord) {
                return $query->where('id', '=', Auth::user()->id);
            }
        });

        //Multiple Filter
        $Filtred = $helpers->filter($users, $columns, $param, $request)
        // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('username', 'LIKE', "%{$request->search}%")
                        ->orWhere('firstname', 'LIKE', "%{$request->search}%")
                        ->orWhere('lastname', 'LIKE', "%{$request->search}%")
                        ->orWhere('email', 'LIKE', "%{$request->search}%")
                        ->orWhere('phone', 'LIKE', "%{$request->search}%");
                });
            });
        $totalRows = $Filtred->count();
        if($perPage == "-1"){
            $perPage = $totalRows;
        }
        $users = $Filtred->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        // Role table dropped - return empty array
        // $roles = Role::where('deleted_at', null)->get(['id', 'name']);
        $roles = [];
        
        // Check if warehouses table exists before querying
        $warehouses = [];
        try {
            if (Schema::hasTable('warehouses')) {
                $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
            }
        } catch (\Exception $e) {
            // If warehouses table doesn't exist, set empty array
            $warehouses = [];
        }

        return response()->json([
            'users' => $users,
            'roles' => $roles,
            'warehouses' => $warehouses,
            'totalRows' => $totalRows,
        ]);
    }

    //------------- GET USER Auth ---------\\

    public function GetUserAuth(Request $request)
    {
        $helpers = new helpers();
        $authUser = $request->user('api') ?? Auth::user();
        
        // Get full user data including is_super_admin (from users table)
        $user = $authUser->toArray();
        $user['avatar'] = $authUser->avatar;
        $user['username'] = $authUser->username;
        
        // Ensure is_super_admin is visible in response
        $user['is_super_admin'] = $authUser->is_super_admin ?? false;
        $user['password_change_required'] = $authUser->password_change_required ?? false;
        $user['onboarding_required'] = $authUser->onboarding_required ?? false;
        
        // Try to get currency, but handle if currencies table doesn't exist
        try {
            $user['currency'] = $helpers->Get_Currency();
        } catch (\Exception $e) {
            $user['currency'] = '$'; // Default currency symbol
        }
        
        $setting = Setting::first();
        $user['logo'] = $setting ? $setting->logo : null;
        $user['default_language'] = $setting ? $setting->default_language : 'en';
        $user['footer'] = $setting ? $setting->footer : null;
        $user['developed_by'] = $setting ? $setting->developed_by : null;
        
        // Role and Permission tables dropped - return all permissions so sidebar menu items display
        // $role = $authUser->roles()->first();
        // $permissions = $role ? $role->permissions->pluck('name') : [];
        // Return all permissions that the sidebar expects so all menu items are visible
        $permissions = [
            'dashboard',
            'members_view',
            'staff_view',
            'appointments_view',
            'schedule_view',
            'workout_view',
            'challenges_view',
            'nutrition_view',
            'community_view',
            'checkin_view',
            'setting_system',
            'support_view',
            'payments_invoices',
            'questionnaires_view',
            'financial_view',
            'user_role_view',
            'backup_view',
            'notification_view',
            'payment_gateway_view',
            'mail_settings_view',
            'email_templates_view',
            'subscription_plans_view'
        ];
        
        // $products_alerts = product_warehouse::join('products', 'product_warehouse.product_id', '=', 'products.id')
        //     ->whereRaw('qte <= stock_alert')
        //     ->where('product_warehouse.deleted_at', null)
        //     ->count();
        $products_alerts = [];
        return response()->json([
            'success' => true,
            'user' => $user,
            'notifs' => $products_alerts,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Complete onboarding: save gym/owner details and clear onboarding_required.
     * Password is set only via the email link; this endpoint does not accept password.
     */
    public function completeOnboarding(Request $request)
    {
        $request->validate([
            'gym_name' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:500',
            'phone' => 'nullable|string|max:255',
            'owner_phone' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:50',
            'country' => 'nullable|string|max:10',
            'business_type' => 'nullable|string|max:100',
            'description' => 'nullable|string|max:2000',
        ]);

        $user = $request->user('api');
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthenticated.'], 401);
        }

        if ($user->gym_id) {
            $gym = \App\Models\Gym::find($user->gym_id);
            if ($gym) {
                $gymData = [];
                $gymColumns = ['gym_name', 'address', 'phone', 'city', 'zip_code', 'country', 'business_type', 'description'];
                foreach ($gymColumns as $col) {
                    if ($request->filled($col) && Schema::hasColumn('gyms', $col)) {
                        $gymData[$col] = $request->$col;
                    }
                }
                if (!empty($gymData)) {
                    $gym->update($gymData);
                }
            }
        }

        if ($request->filled('owner_phone')) {
            $user->phone = $request->owner_phone;
        }
        $user->onboarding_required = false;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Registration complete. You can now use the CRM.',
        ]);
    }

    //------------- GET USER ROLES ---------\\

    public function GetUserRole(Request $request)
    {
        // Role and Permission tables dropped - return empty data
        // $roles = Auth::user()->roles()->with('permissions')->first();
        $roles = null;

        $data = [];
        if ($roles) {
            foreach ($roles->permissions as $permission) {
                $data[] = $permission->name;

            }
            return response()->json(['success' => true, 'data' => $data]);
        }

    }

    //------------- STORE NEW USER ---------\\

    public function store(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'create', User::class);
        $this->validate($request, [
            'email' => 'required|unique:users',
        ], [
            'email.unique' => 'This Email already taken.',
        ]);
        \DB::transaction(function () use ($request) {
            if ($request->hasFile('avatar')) {

                $image = $request->file('avatar');
                $filename = rand(11111111, 99999999) . $image->getClientOriginalName();

                $image_resize = Image::make($image->getRealPath());
                $image_resize->resize(128, 128);
                $image_resize->save(public_path('/images/avatar/' . $filename));

            } else {
                $filename = 'no_avatar.png';
            }

            if($request['is_all_warehouses'] == '1' || $request['is_all_warehouses'] == 'true'){
                $is_all_warehouses = 1;
            }else{
                $is_all_warehouses = 0;
            }

            $User = new User;
            $User->firstname = $request['firstname'];
            $User->lastname  = $request['lastname'];
            $User->username  = $request['username'];
            $User->email     = $request['email'];
            $User->phone     = $request['phone'];
            $User->password  = Hash::make($request['password']);
            $User->avatar    = $filename;
            $User->role_id   = $request['role'];
            $User->is_all_warehouses   = $is_all_warehouses;
            $User->save();

            $role_user = new role_user;
            $role_user->user_id = $User->id;
            $role_user->role_id = $request['role'];
            $role_user->save();

            if(!$User->is_all_warehouses){
                $User->assignedWarehouses()->sync($request['assigned_to']);
            }
    
        }, 10);

        return response()->json(['success' => true]);
    }

    //------------ function show -----------\\

    public function show($id){
        //
        
    }

    public function edit(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', User::class);

        $assigned_warehouses = UserWarehouse::where('user_id', $id)->pluck('warehouse_id')->toArray();
        $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $assigned_warehouses)->pluck('id')->toArray();

        return response()->json([
            'assigned_warehouses' => $warehouses,
        ]);
    }

    //------------- UPDATE  USER ---------\\

    public function update(Request $request, $id)
    {        
        $this->authorizeForUser($request->user('api'), 'update', User::class);
        
        $this->validate($request, [
            'email' => 'required|email|unique:users',
            'email' => Rule::unique('users')->ignore($id),
        ], [
            'email.unique' => 'This Email already taken.',
        ]);

        \DB::transaction(function () use ($id ,$request) {
            $user = User::findOrFail($id);
            $current = $user->password;

            if ($request->NewPassword != 'null') {
                if ($request->NewPassword != $current) {
                    $pass = Hash::make($request->NewPassword);
                } else {
                    $pass = $user->password;
                }

            } else {
                $pass = $user->password;
            }

            $currentAvatar = $user->avatar;
            if ($request->avatar != $currentAvatar) {

                $image = $request->file('avatar');
                $path = public_path() . '/images/avatar';
                $filename = rand(11111111, 99999999) . $image->getClientOriginalName();

                $image_resize = Image::make($image->getRealPath());
                $image_resize->resize(128, 128);
                $image_resize->save(public_path('/images/avatar/' . $filename));

                $userPhoto = $path . '/' . $currentAvatar;
                if (file_exists($userPhoto)) {
                    if ($user->avatar != 'no_avatar.png') {
                        @unlink($userPhoto);
                    }
                }
            } else {
                $filename = $currentAvatar;
            }

            if($request['is_all_warehouses'] == '1' || $request['is_all_warehouses'] == 'true'){
                $is_all_warehouses = 1;
            }else{
                $is_all_warehouses = 0;
            }

            User::whereId($id)->update([
                'firstname' => $request['firstname'],
                'lastname' => $request['lastname'],
                'username' => $request['username'],
                'email' => $request['email'],
                'phone' => $request['phone'],
                'password' => $pass,
                'avatar' => $filename,
                'status' => $request['status'],
                'is_all_warehouses' => $is_all_warehouses,
                'role_id' => $request['role'],

            ]);

            role_user::where('user_id' , $id)->update([
                'user_id' => $id,
                'role_id' => $request['role'],
            ]);

            $user_saved = User::where('deleted_at', '=', null)->findOrFail($id);
            $user_saved->assignedWarehouses()->sync($request['assigned_to']);

        }, 10);
        
        return response()->json(['success' => true]);

    }


    //------------- UPDATE PROFILE ---------\\

    public function updateProfile(Request $request)
    {
        $id = Auth::user()->id;
        $user = User::findOrFail($id);
        $current = $user->password;

        if ($request->NewPassword != 'undefined') {
            if ($request->NewPassword != $current) {
                $pass = Hash::make($request->NewPassword);
            } else {
                $pass = $user->password;
            }

        } else {
            $pass = $user->password;
        }

        $currentAvatar = $user->avatar;
        if ($request->avatar != $currentAvatar) {

            $image = $request->file('avatar');
            $path = public_path() . '/images/avatar';
            $filename = rand(11111111, 99999999) . $image->getClientOriginalName();

            $image_resize = Image::make($image->getRealPath());
            $image_resize->resize(128, 128);
            $image_resize->save(public_path('/images/avatar/' . $filename));

            $userPhoto = $path . '/' . $currentAvatar;

            if (file_exists($userPhoto)) {
                if ($user->avatar != 'no_avatar.png') {
                    @unlink($userPhoto);
                }
            }
        } else {
            $filename = $currentAvatar;
        }

        User::whereId($id)->update([
            'firstname' => $request['firstname'],
            'lastname' => $request['lastname'],
            'username' => $request['username'],
            'email' => $request['email'],
            'phone' => $request['phone'],
            'password' => $pass,
            'avatar' => $filename,

        ]);

        return response()->json(['avatar' => $filename, 'user' => $request['username']]);

    }

    //----------- IsActivated (Update Statut User) -------\\

    public function IsActivated(request $request, $id)
    {

        $this->authorizeForUser($request->user('api'), 'update', User::class);

        $user = Auth::user();
        if ($request['id'] !== $user->id) {
            User::whereId($id)->update([
                'status' => $request['status'],
            ]);
            return response()->json([
                'success' => true,
            ]);
        } else {
            return response()->json([
                'success' => false,
            ]);
        }
    }

    public function GetPermissions()
    {
        // Role and Permission tables dropped - return empty array
        // $roles = Auth::user()->roles()->with('permissions')->first();
        $roles = null;
        $data = [];
        if ($roles) {
            foreach ($roles->permissions as $permission) {
                $item[$permission->name]['slug'] = $permission->name;
                $item[$permission->name]['id'] = $permission->id;

            }
            $data[] = $item;
        }
        // Return empty array instead of $data[0] to avoid undefined index error
        return $data;

    }

    //------------- GET USER Auth ---------\\

    public function GetInfoProfile(Request $request)
    {
        $data = Auth::user();
        return response()->json(['success' => true, 'user' => $data]);
    }

}
