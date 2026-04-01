<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\TableController ;
use App\Http\Controllers\NoteController ;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

//------------------------------------------------------------------\\

Route::post('/login', [
    'uses' => 'Auth\LoginController@login',
    'middleware' => 'Is_Active',
]);

// SPA: return current CSRF token so frontend can refresh before sensitive actions (e.g. logout)
Route::get('/csrf-token', function () {
    return response()->json(['token' => csrf_token()]);
})->middleware('web');

Route::get('password/reset', function () {
    return view('auth.passwords.email');
});
Route::get('password/find/{token}', 'PasswordResetController@find');
Route::get('/setup-password', 'MemberPasswordSetupController@showSetupForm');
Route::get('/setup-password-coach', 'CoachPasswordSetupController@showSetupForm');
Route::get('/reset-password', 'MemberPasswordResetController@showResetForm');
Route::get('/signup/invite/{invitationCode}', 'MemberPasswordSetupController@showInvitationForm');
Route::get('/complete-registration', 'MemberRegistrationController@showRegistrationForm');
Route::get('/app-download', function () {
    return view('auth.app-download');
});

//------------------------------------------------------------------\\
// Account disable (member/coach self-service)
Route::get('/account/disable/confirm/{token}', 'AccountDisableController@showConfirmForm');
Route::post('/account/disable/confirm/{token}', 'AccountDisableController@confirmDisable');
$installed = Storage::disk('public')->exists('installed');

if ($installed === false) {
    Route::get('/setup', [
        'uses' => 'SetupController@viewCheck',
    ])->name('setup');

    Route::get('/setup/step-1', [
        'uses' => 'SetupController@viewStep1',
    ]);

    Route::post('/setup/step-2', [
        'as' => 'setupStep1', 'uses' => 'SetupController@setupStep1',
    ]);

    Route::post('/setup/testDB', [
        'as' => 'testDB', 'uses' => 'TestDbController@testDB',
    ]);

    Route::get('/setup/step-2', [
        'uses' => 'SetupController@viewStep2',
    ]);

    Route::get('/setup/step-3', [
        'uses' => 'SetupController@viewStep3',
    ]);

    Route::get('/setup/finish', function () {

        return view('setup.finishedSetup');
    });

    Route::get('/setup/getNewAppKey', [
        'as' => 'getNewAppKey', 'uses' => 'SetupController@getNewAppKey',
    ]);

    Route::get('/setup/getPassport', [
        'as' => 'getPassport', 'uses' => 'SetupController@getPassport',
    ]);

    Route::get('/setup/getMegrate', [
        'as' => 'getMegrate', 'uses' => 'SetupController@getMegrate',
    ]);

    Route::post('/setup/step-3', [
        'as' => 'setupStep2', 'uses' => 'SetupController@setupStep2',
    ]);

    Route::post('/setup/step-4', [
        'as' => 'setupStep3', 'uses' => 'SetupController@setupStep3',
    ]);

    Route::post('/setup/step-5', [
        'as' => 'setupStep4', 'uses' => 'SetupController@setupStep4',
    ]);

    Route::post('/setup/lastStep', [
        'as' => 'lastStep', 'uses' => 'SetupController@lastStep',
    ]);

    Route::get('setup/lastStep', function () {
        return redirect('/setup', 301);
    });

} else {
    Route::any('/setup/{vue}', function () {
        abort(403);
    });
}


// Public route: disable account page (no login required)
Route::get('/disable-account', function () {
    $installed = Storage::disk('public')->exists('installed');
    if ($installed === false) {
        return redirect('/setup');
    }
    return view('layouts.master');
});

// When app is served from a subpath (e.g. /crm/), allow /crm/disable-account without auth
Route::get('{base}/disable-account', function () {
    $installed = Storage::disk('public')->exists('installed');
    if ($installed === false) {
        return redirect('/setup');
    }
    return view('layouts.master');
})->where('base', '[^/]+');

// Public route: privacy policy (no login required)
Route::get('/app/privacy-policy', function () {
    $installed = Storage::disk('public')->exists('installed');
    if ($installed === false) {
        return redirect('/setup');
    }
    return view('layouts.master');
});

// When app is served from a subpath (e.g. /crm/), allow /crm/app/privacy-policy without auth
Route::get('{base}/app/privacy-policy', function () {
    $installed = Storage::disk('public')->exists('installed');
    if ($installed === false) {
        return redirect('/setup');
    }
    return view('layouts.master');
})->where('base', '[^/]+');


//------------------------------------------------------------------\\

Route::group(['middleware' => ['auth', 'Is_Active']], function () {

    // Notes routes for web authentication - must be defined BEFORE catch-all route
    // Using explicit route definitions to ensure they're matched before the Vue catch-all
    Route::post('/notes', [NoteController::class, 'store'])->name('notes.store');
    Route::get('/notes/member/{memberId}', [NoteController::class, 'getMemberNotes'])->name('notes.member')->where('memberId', '[0-9]+');
    Route::get('/notes/coach/{coachId}', [NoteController::class, 'getCoachNotes'])->name('notes.coach')->where('coachId', '[0-9]+');
    Route::put('/notes/{id}', [NoteController::class, 'update'])->name('notes.update')->where('id', '[0-9]+');
    Route::delete('/notes/{id}', [NoteController::class, 'destroy'])->name('notes.destroy')->where('id', '[0-9]+');

    Route::get('/login', function () {
        $installed = Storage::disk('public')->exists('installed');
        if ($installed === false) {
            return redirect('/setup');
        } else {
            return redirect('/login');
        }
    });


    Route::get('/{vue?}',
        function () {
            $installed = Storage::disk('public')->exists('installed');

            if ($installed === false) {
                return redirect('/setup');
            } else {
                return view('layouts.master');
            }
        })->where('vue', '^(?!api|setup|update|password|setup-password|setup-password-coach|complete-registration|app-download|notes|csrf-token).*$');


    });
    
    Auth::routes([
        'register' => false,
    ]);


//------------------------------------------------------------------\\

Route::group(['middleware' => ['auth', 'Is_Active']], function () {

    Route::get('/update', 'UpdateController@viewStep1');

    Route::get('/update/finish', function () {

        return view('update.finishedUpdate');
    });

    Route::post('/update/lastStep', [
        'as' => 'update_lastStep', 'uses' => 'UpdateController@lastStep',
    ]);

});


    //new
    
    Route::get('/setup/tables', [TableController::class, 'index']);
    Route::get('/setup/tables/{id}', [TableController::class, 'show']);
    Route::post('/setup/tables', [TableController::class, 'store']);
    Route::put('/setup/tables/{id}', [TableController::class, 'update']);
    Route::delete('/setup/tables/{id}', [TableController::class, 'destroy']);
    
    
    
    Route::get('/example', function () {
    return view('example');
});