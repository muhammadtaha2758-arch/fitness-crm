<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\TestDbController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;
// Role and Permission models removed - tables dropped
// use App\Models\Role;
use App\Models\Setting;
use App\Models\sms_gateway;

use Auth;
// use App\Models\Permission;

class UpdateController extends Controller
{

    public function get_version_info(request $request){

        $this->authorizeForUser($request->user('api'), 'update', Setting::class);
        $version = $this->check();
        
        return response()->json($version);
    }


    /*
    * Return current version (as plain text).
    */
    public function getCurrentVersion(){
        // todo: env file version
        $version = File::get(base_path().'/version.txt');
        return $version;
    }

    /*
    * Check if a new Update exist.
    */
    public function check()
    {
        $lastVersionInfo = $this->getLastVersion();
        if( version_compare($lastVersionInfo['version'], $this->getCurrentVersion(), ">") )
            return $lastVersionInfo['version'];

        return '';
    }

    private function getLastVersion(){
        $content = file_get_contents('https://update-stocky.ui-lib.com/stocky_version.json');
        $content = json_decode($content, true);
        return $content;
    }

    
    public function viewStep1(Request $request)
    {
        // Role table dropped - allow access
        // $role = Auth::user()->roles()->first();
        // $permission = Role::findOrFail($role->id)->inRole('setting_system');
        $permission = true;
        if($permission){
            return view('update.viewStep1');
        }
    }
    
    public function lastStep(Request $request)
    {
        // Role and Permission tables dropped - allow access
        $permission = true;

        if($permission){
            ini_set('max_execution_time', 600); //600 seconds = 10 minutes 

            try {
            
                Artisan::call('config:cache');
                Artisan::call('config:clear');

                // Migrations table dropped - Laravel will recreate it automatically when migrations run
                // Artisan::call('migrate --force');

                // Role and Permission tables dropped - removed all related code
                // $role = Role::findOrFail(1);
                // $role->permissions()->detach();
                // ... permission creation code removed ...

                //create new sms gateway infobip
                sms_gateway::firstOrCreate(['title' => 'infobip']);
                
            } catch (\Exception $e) {
                
                return $e->getMessage();
                
                return 'Something went wrong';
            }
            
            return view('update.finishedUpdate');
        }
    }

}
