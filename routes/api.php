<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Three Project Structure
|--------------------------------------------------------------------------
|
| This file contains routes for three separate projects:
|
| 1. CRM (Web Interface)
|    - Routes use 'auth:api' middleware (Laravel Passport)
|    - Controllers are in root Controllers folder
|    - Example: /api/members, /api/appointments, /api/workouts
|
| 2. MemberApp (Member Mobile Application)
|    - Routes use 'memberapp' prefix
|    - Controllers are in Mobile\member namespace
|    - Example: /api/memberapp/auth/login, /api/memberapp/workouts
|
| 3. CoachApp (Coach Mobile Application)
|    - Routes use 'coachapp' prefix
|    - Controllers are in Mobile\coach namespace
|    - Example: /api/coachapp/auth/login, /api/coachapp/dashboard
|
| All mobile apps use 'mobile.auth' middleware for authentication.
|
*/

// Public routes for React frontend (no authentication required)
Route::get('/public/plans', 'Api\PublicPlanController@index');
Route::post('/subscribe', 'Api\SubscriptionController@subscribe');

// Thumbnail images (no auth so <img src="..."> works; same route as below but matched first)
Route::get('workout_exercises/thumbnail/{filename}', 'WorkoutActivityController@serveThumbnail')->where('filename', '[^/]+');
// Video files (no auth so <video src="..."> works)
Route::get('workout_exercises/video/{path}', 'WorkoutActivityController@serveVideo')->where('path', '.*');

// Webhook routes (no authentication or CSRF)
Route::post('/webhook/stripe', 'WebhookController@handleWebhook');

// Protected routes (subscription check skips: user, subscription/status, super-admin)
Route::middleware(['auth:api', 'subscribed'])->group(function () {
    Route::get('/user', function (Request $request) {
        $user = $request->user('api');
        // Ensure is_super_admin from users table is included so super admin can see Billing & Add Gym
        if ($user) {
            $user->makeVisible(['is_super_admin']);
        }
        return $user;
    });
    
    // Subscription status (requires authentication)
    Route::get('/subscription/status', 'Api\SubscriptionController@status');
    
    // Super Admin Routes
    Route::middleware('super_admin')->prefix('super-admin')->group(function () {
        Route::get('/gyms', 'Api\SuperAdminController@myGyms');
        Route::get('/gym-plans', 'Api\SuperAdminController@getGymPlans');
        Route::get('/users', 'Api\SuperAdminController@getAllUsers');
        Route::post('/gyms/subscribe', 'Api\SuperAdminController@createGymSubscription');
        Route::get('/invoices', 'Api\SuperAdminController@getAllInvoices');
        Route::get('/invoices/gym/{gymId}', 'Api\SuperAdminController@getGymInvoices');
    });
    
    // Admin Notifications Routes
    Route::prefix('admin/notifications')->group(function () {
        Route::get('/', 'AdminNotificationController@index');
        Route::get('/unread-count', 'AdminNotificationController@unreadCount');
        Route::get('/recent', 'AdminNotificationController@recent');
        Route::get('/statistics', 'AdminNotificationController@statistics');
        Route::get('/by-category', 'AdminNotificationController@byCategory');
        Route::get('/{id}', 'AdminNotificationController@show');
        Route::post('/{id}/mark-read', 'AdminNotificationController@markAsRead');
        Route::post('/mark-all-read', 'AdminNotificationController@markAllAsRead');
    });
    
    // Assigned Meals Members API Routes (Protected)
    Route::prefix('assigned-meals-members')->group(function () {
        Route::get('/', 'AssignedMealsMemberController@index');
        Route::post('/', 'AssignedMealsMemberController@store');
        Route::get('/recent-messages', 'AssignedMealsMemberController@getRecentMessages');
        Route::get('/member/{memberId}/assessments', 'AssignedMealsMemberController@getMemberAssessments');
        Route::get('/member/{memberId}/notes', 'AssignedMealsMemberController@getMemberNotes');
        Route::put('/member/{memberId}/notes', 'AssignedMealsMemberController@updateMemberNotes');
        Route::get('/{id}', 'AssignedMealsMemberController@show');
        Route::put('/{id}', 'AssignedMealsMemberController@update');
        Route::delete('/{id}', 'AssignedMealsMemberController@destroy');
    });

    // Comparison Photos API Routes (CRM - protected)
    Route::prefix('comparison-photos')->group(function () {
        Route::get('/', 'ComparisonPhotoController@index');
        Route::post('/', 'ComparisonPhotoController@store');
        Route::post('/migrate-existing', 'ComparisonPhotoController@migrateExistingImages');
        Route::delete('/{id}', 'ComparisonPhotoController@destroy');
    });

    // Support API Routes (CRM - protected)
    Route::prefix('support')->group(function () {
        Route::get('/', 'SupportController@index');
        Route::post('/', 'SupportController@store');
        Route::get('/statistics', 'SupportController@statistics');
        Route::get('/{id}', 'SupportController@show');
        Route::put('/{id}', 'SupportController@update');
        Route::delete('/{id}', 'SupportController@destroy');
    });

    // Meals Messages API Routes (CRM - protected)
    Route::prefix('meals-messages')->group(function () {
        Route::get('/', 'MealsMessageController@index');
        Route::post('/', 'MealsMessageController@store');
        Route::get('/recent-messages', 'MealsMessageController@getRecentMessages');
        Route::get('/{id}', 'MealsMessageController@show');
        Route::put('/{id}', 'MealsMessageController@update');
        Route::delete('/{id}', 'MealsMessageController@destroy');
    });
});

//--------------------------- Reset Password  ---------------------------

Route::group([
    'prefix' => 'password',
], function () {
    Route::post('create', 'PasswordResetController@create');
    Route::post('reset', 'PasswordResetController@reset');
});

Route::post('account/disable-request', 'AccountDisableController@requestDisable');

Route::post('getAccessToken', 'AuthController@getAccessToken');

// ============================================================================
// Member App Routes
// These routes are specifically for the member mobile application
// All memberapp controllers are in Mobile\member namespace
// ============================================================================
// Public auth routes (no authentication required)
Route::prefix('mobile/auth')->group(function () {
    Route::post('login', 'Mobile\member\MobileAuthController@login');
    Route::post('register', 'Mobile\member\MobileAuthController@register');
    Route::post('signup-request', 'Mobile\member\MemberSignupController@requestSignup');
    Route::get('verify-email', 'Mobile\member\MemberSignupController@verifyEmail');
    Route::post('verify-email', 'Mobile\member\MemberSignupController@verifyEmail');
       Route::post('forgot-password', 'Mobile\member\MobileAuthController@forgotPassword');
     Route::post('setup-password', 'Mobile\member\MobileAuthController@setupPassword');
    
    // Protected routes
    Route::middleware('mobile.auth')->group(function () {
        Route::get('me', 'Mobile\member\MobileAuthController@me');
        Route::get('profile', 'Mobile\member\MobileAuthController@profile');
        Route::put('profile', 'Mobile\member\MobileAuthController@updateProfile');
        Route::put('change-password', 'Mobile\member\MobileAuthController@changePassword');
        Route::post('complete-registration', 'Mobile\member\MobileAuthController@completeRegistration');
        Route::post('logout', 'Mobile\member\MobileAuthController@logout');
        Route::post('refresh', 'Mobile\member\MobileAuthController@refresh');
        Route::post('app-launch', 'Mobile\member\MobileAuthController@logAppLaunch');
    });
});


// Mobile Workout Routes
Route::prefix('mobile/workouts')->middleware('mobile.auth')->group(function () {
    Route::get('/', 'Mobile\member\MemberWorkoutController@index');
    Route::post('/', 'Mobile\member\MemberWorkoutController@store')->middleware('member.subscription'); // Create new workout
    Route::get('/all', 'Mobile\member\MemberWorkoutController@getAllWorkouts');
    Route::get('/member', 'Mobile\member\MemberWorkoutController@getMemberWorkouts'); // Get member workouts
    Route::get('/available-exercises', 'Mobile\member\MemberWorkoutController@getAvailableExercises'); // Get exercises for workout creation
    Route::get('/metadata', 'Mobile\member\MemberWorkoutController@getWorkoutMetadata'); // Get workout creation metadata
    Route::get('/statistics', 'Mobile\member\MemberWorkoutController@statistics');
    Route::get('/assignment/{id}', 'Mobile\member\MemberWorkoutController@show');
    Route::post('/assignment/{id}/start', 'Mobile\member\MemberWorkoutController@startAssignmentWorkout')->middleware('member.subscription');
    Route::post('/assignment/{id}/complete', 'Mobile\member\MemberWorkoutController@completeAssignmentWorkout')->middleware('member.subscription');
    // Member-created workout: get one, update, delete (must be after static routes)
    Route::get('/{id}', 'Mobile\member\MemberWorkoutController@showMemberWorkout')->whereNumber('id');
    Route::put('/{id}', 'Mobile\member\MemberWorkoutController@updateMemberWorkout')->middleware('member.subscription')->whereNumber('id');
    Route::delete('/{id}', 'Mobile\member\MemberWorkoutController@destroyMemberWorkout')->middleware('member.subscription')->whereNumber('id');
});

// Mobile Member Workout Routes
Route::prefix('mobile/member-workouts')->middleware('mobile.auth')->group(function () {
    Route::get('/', 'Mobile\member\MemberWorkoutController@getAssignedWorkouts');
    Route::post('/assign', 'Mobile\member\MemberWorkoutController@assignWorkout')->middleware('member.subscription'); // Assign/Plan workout to member
    Route::get('/{workoutId}', 'Mobile\member\MemberWorkoutController@getWorkoutDetails');
    Route::post('/{workoutId}/start', 'Mobile\member\MemberWorkoutController@startWorkout')->middleware('member.subscription');
    Route::post('/{workoutId}/day/{dayNumber}/start', 'Mobile\member\MemberWorkoutController@startDay')->middleware('member.subscription');
    Route::post('/{workoutId}/day/{dayNumber}/complete', 'Mobile\member\MemberWorkoutController@completeDay')->middleware('member.subscription');
    Route::get('/{workoutId}/status', 'Mobile\member\MemberWorkoutController@getWorkoutStatus');
    Route::get('/{workoutId}/day/{dayNumber}/activities', 'Mobile\member\MemberWorkoutController@getDayActivityStatus');
    Route::get('/{workoutId}/day/{dayNumber}/summary', 'Mobile\member\MemberWorkoutController@getWorkoutSummary');
});

// Mobile Workout Activity Routes
Route::prefix('mobile/workout-activities')->middleware('mobile.auth')->group(function () {
    Route::get('/workout/{workoutId}', 'Mobile\member\MobileWorkoutActivityController@getWorkoutActivities');
    Route::get('/', 'Mobile\member\MobileWorkoutActivityController@getAllActivities');
    Route::get('/categories', 'Mobile\member\MobileWorkoutActivityController@getActivityCategories');
    Route::get('/levels', 'Mobile\member\MobileWorkoutActivityController@getActivityLevels');
    Route::get('/muscle-groups', 'Mobile\member\MobileWorkoutActivityController@getMuscleGroups');
    Route::get('/{activityId}', 'Mobile\member\MobileWorkoutActivityController@getActivityDetails');
});

// Mobile Day Activity Routes
Route::prefix('mobile/day-activities')->middleware('mobile.auth')->group(function () {
    Route::post('/', 'Mobile\member\MobileWorkoutActivityController@createDayActivityPlan')->middleware('member.subscription');
    Route::get('/', 'Mobile\member\MobileWorkoutActivityController@getDayActivityPlan');
    Route::post('/start', 'Mobile\member\MobileWorkoutActivityController@startDayActivitySession')->middleware('member.subscription');
    Route::post('/complete', 'Mobile\member\MobileWorkoutActivityController@completeDayActivitySession')->middleware('member.subscription');
});

// Mobile Appointment Routes
Route::prefix('mobile/appointments')->middleware('mobile.auth')->group(function () {
    Route::get('/', 'Mobile\member\MobileAppointmentController@index');
    Route::get('/upcoming', 'Mobile\member\MobileAppointmentController@upcoming');
    Route::get('/statistics', 'Mobile\member\MobileAppointmentController@statistics');
    Route::get('/workout-types', 'Mobile\member\MobileAppointmentController@getWorkoutTypes');
    Route::get('/{id}', 'Mobile\member\MobileAppointmentController@show');
    Route::post('/{id}/rate', 'Mobile\member\MobileAppointmentController@rateAppointment');
});

// Mobile Schedule Routes (for booking schedule events/classes)
Route::prefix('mobile/schedule')->middleware('mobile.auth')->group(function () {
    Route::get('/events', 'Mobile\member\MobileScheduleController@getAvailableEvents');
    Route::get('/events/{eventId}', 'Mobile\member\MobileScheduleController@getEventDetails');
     Route::get('/all', 'Mobile\member\MobileScheduleController@getAllSchedules');
    Route::get('/my-bookings', 'Mobile\member\MobileScheduleController@getMyBookings');
    Route::get('/calendar', 'Mobile\member\MobileScheduleController@getCalendarView');
    Route::get('/statistics', 'Mobile\member\MobileScheduleController@getStatistics');
    Route::post('/events/{eventId}/book', 'Mobile\member\MobileScheduleController@bookEvent');
    Route::post('/events/{eventId}/cancel', 'Mobile\member\MobileScheduleController@cancelBooking');
});

// Mobile Nutrition Routes
Route::prefix('mobile/nutrition')->middleware('mobile.auth')->group(function () {
    Route::get('/', 'Mobile\member\MobileNutritionController@index');
    Route::get('/current', 'Mobile\member\MobileNutritionController@current');
    Route::get('/statistics', 'Mobile\member\MobileNutritionController@statistics');
    Route::get('/categories', 'Mobile\member\MobileNutritionController@getCategories');
    Route::get('/templates', 'Mobile\member\MobileNutritionController@getAvailableTemplates');
    Route::get('/by-date', 'Mobile\member\MobileNutritionController@getByDate');
    Route::get('/foods/all', 'Mobile\member\MobileNutritionController@getAllFoods');
    Route::get('/foods/by-date', 'Mobile\member\MobileNutritionController@getFoodsByDate');
    Route::get('/foods/filter-options', 'Mobile\member\MobileNutritionController@getFoodFilterOptions');
        Route::get('/foods/initial', 'Mobile\member\MobileNutritionController@getInitialFoods');
    Route::get('/foods/search', 'Mobile\member\MobileNutritionController@searchFoods');
       Route::get('/assigned-meals', 'Mobile\member\MobileNutritionController@getAssignedMeals');
    Route::post('/assign', 'Mobile\member\MobileNutritionController@assignMealPlan')->middleware('member.subscription');
    Route::put('/assigned-meals/{id}', 'Mobile\member\MobileNutritionController@updateAssignedMeal')->middleware('member.subscription');
    Route::get('/check-assignment/{templateId}', 'Mobile\member\MobileNutritionController@checkAssignment');
    Route::get('/{id}', 'Mobile\member\MobileNutritionController@show');

    // CRUD operations (create, update, delete require subscription)
    Route::post('/', 'Mobile\member\MobileNutritionController@store')->middleware('member.subscription');
    Route::put('/{id}', 'Mobile\member\MobileNutritionController@update')->middleware('member.subscription');
    Route::delete('/{id}', 'Mobile\member\MobileNutritionController@destroy')->middleware('member.subscription');
});

Route::prefix('mobile/invoices')->middleware('mobile.auth')->group(function () {
    Route::get('/', 'Mobile\member\MobileInvoiceController@index');
    Route::get('/statistics', 'Mobile\member\MobileInvoiceController@statistics');
    Route::get('/{id}', 'Mobile\member\MobileInvoiceController@show');
    Route::get('/status/{status}', 'Mobile\member\MobileInvoiceController@getByStatus');
});

// Mobile Payment Routes (Stripe Integration)
Route::prefix('mobile/payments')->middleware('mobile.auth')->group(function () {
    Route::post('/process-payment', 'Mobile\member\MobilePaymentController@processPayment');
    Route::post('/create-payment-intent', 'Mobile\member\MobilePaymentController@createPaymentIntent');
    Route::post('/confirm-payment', 'Mobile\member\MobilePaymentController@confirmPayment');
});

// Stripe Webhook Route (no authentication required - Stripe verifies signature)
Route::post('/mobile/payments/webhook', 'Mobile\member\MobilePaymentController@handleWebhook');

// Mobile Notification Routes
Route::prefix('mobile/notifications')->middleware('mobile.auth')->group(function () {
    Route::get('/', 'Mobile\member\MobileNotificationController@index');
    Route::get('/unread-count', 'Mobile\member\MobileNotificationController@unreadCount');
    Route::get('/recent', 'Mobile\member\MobileNotificationController@recent');
    Route::get('/statistics', 'Mobile\member\MobileNotificationController@statistics');
    Route::get('/{id}', 'Mobile\member\MobileNotificationController@show');
    Route::post('/{id}/mark-read', 'Mobile\member\MobileNotificationController@markAsRead');
    Route::post('/{id}/mark-unread', 'Mobile\member\MobileNotificationController@markAsUnread');
    Route::post('/mark-all-read', 'Mobile\member\MobileNotificationController@markAllAsRead');
    Route::delete('/{id}', 'Mobile\member\MobileNotificationController@destroy');
    
    // Admin/Coach routes for creating and updating notifications
    Route::post('/', 'Mobile\member\MobileNotificationController@store');
    Route::put('/{id}', 'Mobile\member\MobileNotificationController@update');
});

// Mobile Communication Routes
Route::prefix('mobile/communication')->middleware('mobile.auth')->group(function () {
    Route::get('/community-groups', 'Mobile\member\MobileCommunicationController@getCommunityGroups');
    Route::get('/posts', 'Mobile\member\MobileCommunicationController@getPosts');
    Route::post('/posts', 'Mobile\member\MobileCommunicationController@createPost');
    Route::post('/posts/{postId}/like', 'Mobile\member\MobileCommunicationController@toggleLike');
    Route::post('/posts/{postId}/comment', 'Mobile\member\MobileCommunicationController@createComment');
    Route::delete('/comments/{commentId}', 'Mobile\member\MobileCommunicationController@deleteComment');
});



// Mobile Video Catalog Routes
Route::prefix('mobile/video-catalog')->middleware('mobile.auth')->group(function () {
    Route::get('/', 'Mobile\member\MobileVideoCatalogController@index');
    Route::get('/categories', 'Mobile\member\MobileVideoCatalogController@getCategories');
    Route::get('/qualities', 'Mobile\member\MobileVideoCatalogController@getQualities');
    Route::get('/subcategories', 'Mobile\member\MobileVideoCatalogController@getSubcategories');
    Route::get('/statistics', 'Mobile\member\MobileVideoCatalogController@statistics');
    Route::get('/search', 'Mobile\member\MobileVideoCatalogController@search');
    Route::get('/{id}', 'Mobile\member\MobileVideoCatalogController@show');
});

// Mobile Chat Routes (Direct Messaging)
Route::prefix('mobile/chat')->middleware('mobile.auth')->group(function () {
    Route::get('/conversations', 'Mobile\member\MobileChatController@getConversations');
    Route::get('/messages/{recipientId}/{recipientType}', 'Mobile\member\MobileChatController@getMessages');
    Route::post('/send', 'Mobile\member\MobileChatController@sendMessage');
    Route::post('/mark-seen/{recipientId}/{recipientType}', 'Mobile\member\MobileChatController@markAsSeen');
    Route::get('/unread-count', 'Mobile\member\MobileChatController@getUnreadCount');
    Route::get('/contacts', 'Mobile\member\MobileChatController@getAvailableContacts');
});

// Mobile Comparison Photos Routes
Route::prefix('mobile/comparison-photos')->middleware('mobile.auth')->group(function () {
    Route::post('/upload', 'Mobile\member\MobileComparisonPhotoController@upload');
    Route::get('/{member_id}', 'Mobile\member\MobileComparisonPhotoController@getUserPhotos');
    Route::put('/{photo_id}/set-before', 'Mobile\member\MobileComparisonPhotoController@setBeforePhoto');
    Route::put('/{photo_id}/set-after', 'Mobile\member\MobileComparisonPhotoController@setAfterPhoto');
    Route::get('/{member_id}/comparison', 'Mobile\member\MobileComparisonPhotoController@getComparison');
    Route::delete('/{photo_id}', 'Mobile\member\MobileComparisonPhotoController@deletePhoto');
});

// Mobile Challenge Routes
Route::prefix('mobile/challenges')->middleware('mobile.auth')->group(function () {
    Route::get('/', 'Mobile\member\MobileChallengeController@index');
    Route::get('/member', 'Mobile\member\MobileChallengeController@getMemberChallenges');
    Route::get('/statistics', 'Mobile\member\MobileChallengeController@statistics');
    Route::get('/{id}', 'Mobile\member\MobileChallengeController@show');
    Route::post('/{id}/enroll', 'Mobile\member\MobileChallengeController@enroll');
    Route::put('/progress/{participationId}', 'Mobile\member\MobileChallengeController@updateProgress');
});

// Mobile Subscription Plan Routes
Route::prefix('mobile/subscription-plans')->middleware('mobile.auth')->group(function () {
    Route::get('/my-plan', 'Mobile\member\MobileSubscriptionPlanController@myPlan');
    Route::get('/credits','Mobile\member\MobileSubscriptionPlanController@extractCreditsFromPlan');
    Route::get('/', 'Mobile\member\MobileSubscriptionPlanController@index');
    Route::get('/statistics', 'Mobile\member\MobileSubscriptionPlanController@statistics');
    Route::get('/features/list', 'Mobile\member\MobileSubscriptionPlanController@getFeatures');
    Route::get('/{id}', 'Mobile\member\MobileSubscriptionPlanController@show');
});

// Mobile Credit Routes
Route::prefix('mobile/credits')->middleware('mobile.auth')->group(function () {
    Route::get('/', 'Mobile\member\MobileCreditController@getCredits');
    Route::get('/history', 'Mobile\member\MobileCreditController@getCreditTransactions');
    Route::get('/transactions', 'Mobile\member\MobileCreditController@getCreditTransactions'); // Alias for history
    Route::get('/check', 'Mobile\member\MobileCreditController@checkSufficientCredits');
});

// Mobile Weekly Progress Routes
Route::prefix('mobile/weekly-progress')->middleware('mobile.auth')->group(function () {
    Route::get('/', 'Mobile\member\MemberWeeklyProgressController@index');
    Route::post('/', 'Mobile\member\MemberWeeklyProgressController@store');
    Route::get('/{id}', 'Mobile\member\MemberWeeklyProgressController@show');
});

// Mobile Member Task Routes
Route::prefix('mobile/tasks')->middleware('mobile.auth')->group(function () {
    Route::get('/', 'Mobile\member\MobileMemberTaskController@index');
    Route::get('/statistics', 'Mobile\member\MobileMemberTaskController@statistics');
    Route::get('/{id}', 'Mobile\member\MobileMemberTaskController@show');
    Route::put('/{id}/status', 'Mobile\member\MobileMemberTaskController@updateStatus');
});

// Mobile Contact Routes
Route::prefix('mobile/contact')->middleware('mobile.auth')->group(function () {
    Route::post('/', 'Mobile\member\MobileContactController@submitContact');
});

// Mobile Member Routes
Route::prefix('mobile/member')->middleware('mobile.auth')->group(function () {
    Route::get('/details', 'Mobile\member\MobileMemberController@getMemberDetails');
    Route::put('/details', 'Mobile\member\MobileMemberController@updateMemberDetails');
   Route::post('/profile-photo', 'Mobile\member\MobileMemberController@uploadProfilePhoto');
});

// Mobile Check-In/Check-Out Routes
Route::prefix('mobile/check-in')->middleware('mobile.auth')->group(function () {
    Route::post('/', 'Mobile\member\MobileCheckInController@checkIn');
    Route::post('/check-out', 'Mobile\member\MobileCheckInController@checkOut');
    Route::get('/status', 'Mobile\member\MobileCheckInController@getStatus');
    Route::get('/history', 'Mobile\member\MobileCheckInController@getHistory');
});

// Alias for check-out route (for consistency with mobile app)
Route::prefix('mobile/check-out')->middleware('mobile.auth')->group(function () {
    Route::post('/', 'Mobile\member\MobileCheckInController@checkOut');
});

// Mobile Notes Routes (Member can create and manage their own notes)
Route::prefix('mobile/notes')->middleware('mobile.auth')->group(function () {
    Route::get('/', 'Mobile\member\MemberNotesController@index');
    Route::post('/', 'Mobile\member\MemberNotesController@store');
    Route::put('/{id}', 'Mobile\member\MemberNotesController@update');
    Route::delete('/{id}', 'Mobile\member\MemberNotesController@destroy');
});


// ============================================================================
// Coach App Routes
// These routes are specifically for the coach mobile application
// All coachapp controllers are in Mobile\coach namespace
// ============================================================================
// Public auth routes (no authentication required)
Route::prefix('coachapp/auth')->group(function () {
    Route::post('login', 'Mobile\coach\MobileAuthController@login');
    Route::post('register', 'Mobile\coach\MobileAuthController@register');
    Route::post('signup', 'Mobile\coach\MobileAuthController@signUpGymOwner');
    Route::get('confirm-signup', 'Mobile\coach\MobileAuthController@confirmSignupGymOwner');
    Route::post('setup-password', 'Mobile\coach\MobileAuthController@setupPassword');
});

// Protected coach app routes (authentication required)
Route::prefix('coachapp')->middleware('coach.mobile.auth')->group(function () {
    // Dashboard route for coach app
    Route::get('/dashboard', 'Mobile\coach\DashboardController@dashboard_data');
    
    // Workout Exercises Routes (accessible from mobile coach app)
    Route::get('/workout_exercises/without_paginate', 'WorkoutActivityController@Get_Exercises_Without_Paginate');
    
    // Auth routes (protected)
    Route::prefix('auth')->group(function () {
        Route::get('profile', 'Mobile\coach\MobileAuthController@profile');
        Route::put('profile', 'Mobile\coach\MobileAuthController@updateProfile');
        Route::put('change-password', 'Mobile\coach\MobileAuthController@changePassword');
        Route::post('logout', 'Mobile\coach\MobileAuthController@logout');
        Route::post('refresh', 'Mobile\coach\MobileAuthController@refresh');
        Route::post('app-launch', 'Mobile\coach\MobileAuthController@logAppLaunch');
    });
    
    // Appointments routes
    Route::prefix('appointments')->group(function () {
        Route::get('/', 'Mobile\coach\MobileAppointmentController@index');
        Route::post('/', 'AppointmentController@store'); // Use AppointmentController@store for creating appointments
        Route::get('/upcoming', 'Mobile\coach\MobileAppointmentController@upcoming');
        Route::get('/statistics', 'Mobile\coach\MobileAppointmentController@statistics');
        Route::get('/workout-types', 'Mobile\coach\MobileAppointmentController@getWorkoutTypes');
        // PUT and DELETE must come before GET /{id} to ensure proper route matching
        Route::put('/{id}', 'Mobile\coach\MobileAppointmentController@update');
        Route::delete('/{id}', 'Mobile\coach\MobileAppointmentController@destroy');
        Route::get('/{id}', 'Mobile\coach\MobileAppointmentController@show');
    });
    
    // Schedule routes (for schedule events/classes)
    Route::prefix('schedule')->group(function () {
        Route::get('/events', 'Mobile\coach\MobileScheduleController@getEvents');
        Route::get('/events/{id}', 'Mobile\coach\MobileScheduleController@getEvent');
        Route::post('/events', 'Mobile\coach\MobileScheduleController@createEvent');
        Route::put('/events/{id}', 'Mobile\coach\MobileScheduleController@updateEvent');
        Route::delete('/events/{id}', 'Mobile\coach\MobileScheduleController@deleteEvent');
        // Schedule Activities (shared with CRM - uses ScheduleActivityController)
        Route::get('/activities', 'ScheduleActivityController@index');
        Route::post('/activities', 'ScheduleActivityController@store');
        Route::get('/schedules', 'Mobile\coach\MobileScheduleController@getSchedules');
        Route::get('/locations', 'Mobile\coach\MobileScheduleController@getLocations');
    });
    
    // Workouts routes
    Route::prefix('workouts')->group(function () {
        Route::get('/', 'Mobile\coach\MobileWorkoutController@index');
        Route::post('/', 'Mobile\coach\MobileWorkoutController@store');
        Route::get('/available-exercises', 'Mobile\coach\MobileWorkoutController@getAvailableExercises');
        Route::get('/metadata', 'Mobile\coach\MobileWorkoutController@getWorkoutMetadata');
        Route::get('/statistics', 'Mobile\coach\MobileWorkoutController@statistics');
        Route::get('/assignment/{id}', 'Mobile\coach\MobileWorkoutController@show');
        Route::post('/assignment/{id}/start', 'Mobile\coach\MobileWorkoutController@startWorkout');
        Route::post('/assignment/{id}/complete', 'Mobile\coach\MobileWorkoutController@completeWorkout');
    });
    
    // Workout Activities routes
    Route::prefix('workout-activities')->group(function () {
        Route::get('/workout/{workoutId}', 'Mobile\coach\MobileWorkoutActivityController@getWorkoutActivities');
        Route::get('/', 'Mobile\coach\MobileWorkoutActivityController@getAllActivities');
        Route::get('/categories', 'Mobile\coach\MobileWorkoutActivityController@getActivityCategories');
        Route::get('/levels', 'Mobile\coach\MobileWorkoutActivityController@getActivityLevels');
        Route::get('/muscle-groups', 'Mobile\coach\MobileWorkoutActivityController@getMuscleGroups');
        Route::get('/{activityId}', 'Mobile\coach\MobileWorkoutActivityController@getActivityDetails');
    });
    
    // Activity Plan routes (for saving/loading activity plan data)
    Route::get('/activity-plan', 'Mobile\coach\MobileActivityPlanController@get');
    Route::post('/activity-plan', 'Mobile\coach\MobileActivityPlanController@save');
    
    // Nutrition routes
    Route::prefix('nutrition')->group(function () {
        Route::get('/', 'Mobile\coach\MobileNutritionController@index');
        Route::get('/current', 'Mobile\coach\MobileNutritionController@current');
        Route::get('/statistics', 'Mobile\coach\MobileNutritionController@statistics');
        Route::get('/categories', 'Mobile\coach\MobileNutritionController@getCategories');
        Route::get('/templates', 'Mobile\coach\MobileNutritionController@getAvailableTemplates');
        Route::get('/by-date', 'Mobile\coach\MobileNutritionController@getByDate');
        // IMPORTANT: keep dynamic {id} routes after static routes like /categories, /statistics, etc.
        // Otherwise "categories" is treated as {id} and routes to @show, causing 500s.
        Route::get('/{id}', 'Mobile\coach\MobileNutritionController@show')->whereNumber('id');
        Route::post('/', 'Mobile\coach\MobileNutritionController@store');
        Route::put('/{id}', 'Mobile\coach\MobileNutritionController@update')->whereNumber('id');
        Route::delete('/{id}', 'Mobile\coach\MobileNutritionController@destroy')->whereNumber('id');
    });

    // Food & Meal routes
    Route::prefix('foods')->group(function () {
        Route::get('/', 'Mobile\coach\MobileFoodController@getFoods');
        Route::post('/', 'Mobile\coach\MobileFoodController@createFood');
        Route::get('/barcode/{barcode}', 'Mobile\coach\MobileFoodController@getFoodFromBarcode');
        Route::post('/from-barcode', 'Mobile\coach\MobileFoodController@createFoodFromBarcode');
        Route::put('/{foodId}', 'Mobile\coach\MobileFoodController@updateFood');
        Route::delete('/{foodId}', 'Mobile\coach\MobileFoodController@deleteFood');
    });
    
    // Assigned Meals routes
    Route::prefix('assigned-meals')->group(function () {
        Route::get('/', 'Mobile\coach\MobileFoodController@getAssignedMeals');
        Route::post('/add-food', 'Mobile\coach\MobileFoodController@addFoodToMember');
        Route::put('/food-item/{foodItemId}', 'Mobile\coach\MobileFoodController@updateFoodItem');
        Route::delete('/food-item/{foodItemId}', 'Mobile\coach\MobileFoodController@deleteFoodItem');
    });
    
    // Meal Plan Templates routes
    Route::prefix('meal-plan-templates')->group(function () {
        Route::get('/', 'Mobile\coach\MobileFoodController@getMealPlanTemplates');
        Route::post('/', 'Mobile\coach\MobileFoodController@createMealPlanTemplate');
        Route::post('/assign', 'Mobile\coach\MobileFoodController@assignMealPlanToMember');
        Route::put('/{templateId}', 'Mobile\coach\MobileFoodController@updateMealPlanTemplate');
        Route::delete('/{templateId}', 'Mobile\coach\MobileFoodController@deleteMealPlanTemplate');
        Route::delete('/unassign/{memberId}/{assignmentId}', 'Mobile\coach\MobileFoodController@unassignMealPlanFromMember');
        Route::put('/detail/{detailId}', 'Mobile\coach\MobileFoodController@updateTemplateDetail');
        Route::delete('/detail/{detailId}', 'Mobile\coach\MobileFoodController@deleteTemplateDetail');
    });
    
    // Invoices routes
    Route::prefix('invoices')->group(function () {
        Route::get('/', 'Mobile\coach\MobileInvoiceController@index');
        Route::get('/statistics', 'Mobile\coach\MobileInvoiceController@statistics');
        Route::get('/{id}', 'Mobile\coach\MobileInvoiceController@show');
        Route::get('/status/{status}', 'Mobile\coach\MobileInvoiceController@getByStatus');
    });
    
    // Notifications routes
    Route::prefix('notifications')->group(function () {
        // Coach Notifications - Using unified AdminNotificationController
        Route::get('/', 'AdminNotificationController@index');
        Route::get('/unread-count', 'AdminNotificationController@unreadCount');
        Route::get('/recent', 'AdminNotificationController@recent');
        Route::get('/statistics', 'AdminNotificationController@statistics');
        Route::get('/by-category', 'AdminNotificationController@byCategory');
        Route::get('/{id}', 'AdminNotificationController@show');
        Route::post('/{id}/mark-read', 'AdminNotificationController@markAsRead');
        Route::post('/mark-all-read', 'AdminNotificationController@markAllAsRead');
        Route::delete('/{id}', 'AdminNotificationController@destroy');
    });
    
    // Communication routes
    Route::prefix('communication')->group(function () {
        Route::get('/groups', 'Mobile\coach\MobileCommunicationController@getGroups');
        Route::get('/groups/{groupId}', 'Mobile\coach\MobileCommunicationController@getGroupDetails');
        Route::get('/groups/{groupId}/chat-history', 'Mobile\coach\MobileCommunicationController@getGroupChatHistory');
        Route::post('/groups/{groupId}/messages', 'Mobile\coach\MobileCommunicationController@sendGroupMessage');
        Route::get('/unread-count', 'Mobile\coach\MobileCommunicationController@getUnreadCount');
        
        // Direct messaging routes for coach app (uses CommunicationController)
        Route::get('/members', 'CommunicationController@getMembers');
        Route::get('/coaches', 'CommunicationController@getCoaches');
        Route::get('/chat-history/{recipientId}/{recipientType?}', 'CommunicationController@getChatHistory');
        Route::post('/send-message', 'CommunicationController@sendMessage');
    });
    
    // Challenges routes
    Route::prefix('challenges')->group(function () {
        Route::get('/', 'Mobile\coach\MobileChallengeController@index');
        Route::get('/statistics', 'Mobile\coach\MobileChallengeController@statistics');
        // Challenge participants routes (coach can join/remove their assigned members)
        // These must come before /{id} route to avoid route conflicts
        Route::post('/join-member', 'Mobile\coach\MobileChallengeController@joinMember');
        Route::get('/{challengeId}/participants', 'Mobile\coach\MobileChallengeController@getParticipants');
        Route::delete('/participants/{participantId}', 'Mobile\coach\MobileChallengeController@removeMember');
        // Challenge CRUD routes
        Route::get('/{id}', 'Mobile\coach\MobileChallengeController@show');
        Route::post('/', 'Mobile\coach\MobileChallengeController@store');
        Route::put('/{id}', 'Mobile\coach\MobileChallengeController@update');
        Route::delete('/{id}', 'Mobile\coach\MobileChallengeController@destroy');
    });
    
    // Rewards routes (for challenge creation)
    Route::get('/rewards', 'ChallengeRewardController@index');
    
    // Coach Assignment routes - moved inside coachapp prefix
    Route::get('/coaches/{coachId}/assigned-members', 'Mobile\coach\MobileCoachAssignmentController@getAssignedMembers');

    // Members routes (accessible via /api/coachapp/members/{id}/full-details)
    Route::get('/members/{id}/full-details', 'MemberController@getFullDetails');
    // Create member route for coaches
    Route::post('/members', 'MemberController@store');
    // Update member route for coaches (PUT and PATCH)
    Route::put('/members/{id}', 'MemberController@update');
    Route::patch('/members/{id}', 'MemberController@update');
    // Send invitation email to member
    Route::post('/members/{id}/send-invitation', 'MemberController@sendInvitation');
    // Disconnect member (remove coach assignment)
    Route::delete('/members/{id}/remove-coach-assignment', 'MemberController@removeCoachAssignment');
    // Unsubscribe member
    Route::post('/members/{id}/unsubscribe', 'MemberController@unsubscribeMember');
    
    // Member Goals routes
    Route::get('/members/{id}/goals', 'MemberController@getMemberGoals');
    Route::post('/members/{id}/goals', 'MemberController@saveMemberGoal');
    Route::put('/members/{id}/goals', 'MemberController@saveMemberGoal'); // Update uses same method
    Route::get('/members/{id}/goals/{goalType}/activities', 'MemberController@getGoalActivities');
    Route::get('/members/{id}/activities', 'MemberController@getGoalActivities'); // Get all activities
    Route::post('/members/{id}/activities', 'MemberController@logGoalActivity');
    
    // Notes/Feedback routes for coaches
    Route::prefix('notes')->group(function () {
        Route::get('/', 'NoteController@index');
        Route::get('/member/{memberId}', 'NoteController@getMemberNotes');
        Route::get('/coach/{coachId}', 'NoteController@getCoachNotes');
        Route::post('/', 'NoteController@store');
        Route::put('/{id}', 'NoteController@update');
        Route::delete('/{id}', 'NoteController@destroy');
    });
    
    // Community Posts routes for coach app
    Route::prefix('posts')->group(function () {
        Route::get('/', 'PostController@index');
        Route::post('/', 'PostController@store');
        Route::get('/{id}', 'PostController@show');
        Route::put('/{id}', 'PostController@update');
        Route::delete('/{id}', 'PostController@destroy');
        Route::post('/{id}/like', 'PostController@toggleLike');
        Route::post('/{id}/comment', 'PostController@addComment');
        Route::post('/{id}/pin', 'PostController@togglePin');
        Route::post('/comments/{id}/like', 'PostController@toggleCommentLike');
        Route::delete('/comments/{id}', 'PostController@deleteComment');
    });
    
    // Community Group routes for coach app
    Route::prefix('community')->group(function () {
        Route::post('/cover-photo', 'CommunityController@uploadCoverPhoto');
        Route::put('/cover-position', 'CommunityController@saveCoverPosition');
        Route::get('/group-info', 'CommunityController@getGroupInfo');
        Route::put('/group-info', 'CommunityController@updateGroupInfo');
    });
    
    // Poll routes for coach app
    Route::prefix('polls')->group(function () {
        Route::get('/', 'PollController@index');
        Route::post('/', 'PollController@store');
        Route::put('/{poll}', 'PollController@update');
        Route::delete('/{poll}', 'PollController@destroy');
        Route::post('/{poll}/vote', 'PollController@vote');
    });
    
    // Community Widgets routes for coach app
    Route::prefix('community-widgets')->group(function () {
        Route::get('/', 'CommunityWidgetController@index');
        Route::post('/', 'CommunityWidgetController@store');
        Route::get('/{id}', 'CommunityWidgetController@show');
        Route::put('/{id}', 'CommunityWidgetController@update');
        Route::delete('/{id}', 'CommunityWidgetController@destroy');
    });
    
    // Tasks routes for coach app
    Route::prefix('tasks')->group(function () {
        Route::get('/', 'TaskController@index');
        Route::post('/', 'TaskController@store');
        Route::put('/{id}', 'TaskController@update');
        Route::delete('/{id}', 'TaskController@destroy');
    });
    
    // Coach-specific task routes (for backward compatibility)
    Route::prefix('coaches')->group(function () {
        Route::get('/{coachId}/tasks', 'TaskController@getCoachTasks');
        Route::post('/{coachId}/create-task', 'TaskController@createCoachTask');
        Route::put('/{coachId}/tasks/{taskId}', 'TaskController@updateCoachTask');
        Route::delete('/{coachId}/tasks/{taskId}', 'TaskController@deleteCoachTask');
    });
    
    // Support Tickets routes for coach app
    Route::prefix('support')->group(function () {
        Route::get('/statistics', 'SupportController@statistics');
        Route::prefix('tickets')->group(function () {
            Route::get('/', 'SupportController@index');
            Route::post('/', 'SupportController@store');
            Route::get('/{id}', 'SupportController@show');
            Route::put('/{id}', 'SupportController@update');
            Route::delete('/{id}', 'SupportController@destroy');
        });
    });
    
    // Member Credits routes for coach app
    Route::prefix('members')->group(function () {
        Route::get('/{memberId}/credits', 'Mobile\coach\MobileCreditController@getMemberCredits');
        Route::get('/{memberId}/credit-transactions', 'Mobile\coach\MobileCreditController@getCreditTransactions');
        Route::post('/{memberId}/adjust-credits', 'Mobile\coach\MobileCreditController@adjustCredits');
        Route::get('/{memberId}/scheduled-items', 'Mobile\coach\MobileCreditController@getScheduledItems');
    });
});

// Community Posts API Routes
Route::prefix('posts')->middleware(['auth:api', 'subscribed'])->group(function () {
    Route::get('/', 'PostController@index');
    Route::post('/', 'PostController@store');
    Route::get('/{id}', 'PostController@show');
    Route::put('/{id}', 'PostController@update');
    Route::delete('/{id}', 'PostController@destroy');
    Route::post('/{id}/like', 'PostController@toggleLike');
    Route::post('/{id}/comment', 'PostController@addComment');
    Route::post('/{id}/pin', 'PostController@togglePin');
    Route::post('/comments/{id}/like', 'PostController@toggleCommentLike');
    Route::delete('/comments/{id}', 'PostController@deleteComment');
});

// Community Group API Routes
Route::prefix('community')->middleware(['auth:api', 'subscribed'])->group(function () {
    Route::post('/cover-photo', 'CommunityController@uploadCoverPhoto');
    Route::put('/cover-position', 'CommunityController@saveCoverPosition');
    Route::get('/group-info', 'CommunityController@getGroupInfo');
    Route::put('/group-info', 'CommunityController@updateGroupInfo');
});

// Community Widgets API Routes
Route::prefix('community-widgets')->middleware(['auth:api', 'subscribed'])->group(function () {
    Route::get('/', 'CommunityWidgetController@index');
    Route::post('/', 'CommunityWidgetController@store');
    Route::get('/{id}', 'CommunityWidgetController@show');
    Route::put('/{id}', 'CommunityWidgetController@update');
    Route::delete('/{id}', 'CommunityWidgetController@destroy');
});

// Poll API Routes
Route::middleware(['auth:api', 'subscribed'])->group(function () {
    Route::get('polls', 'PollController@index');
    Route::post('polls', 'PollController@store');
    Route::put('polls/{poll}', 'PollController@update');
    Route::delete('polls/{poll}', 'PollController@destroy');
    Route::post('polls/{poll}/vote', 'PollController@vote');
});

//-------------------------- Appointments (Moved inside auth middleware) ---------------------------

//-------------------------- Challenges (Moved inside auth middleware) ---------------------------

// ============================================================================
// Routes accessible from BOTH CRM (web) and Mobile App
// These routes accept both Passport tokens (web) and mobile app tokens
// We use 'mobile.or.api' middleware which tries Passport first, then mobile tokens
// ============================================================================
Route::middleware([
    // Enable CRM session auth for these /api/* routes:
    // - Decrypt incoming cookies (laravel_session is encrypted)
    // - Start session so Auth::guard('web')->user() works
    \App\Http\Middleware\EncryptCookies::class,
    \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
    \Illuminate\Session\Middleware\StartSession::class,
    'mobile.or.api',
    'Is_Active',
    'subscribed',
])->group(function () {
    // Dashboard data
    Route::get("dashboard_data", "DashboardController@dashboard_data");
    
    // Coach Assignment Routes
    Route::get('coaches/{coachId}/assigned-members', 'Mobile\coach\MobileCoachAssignmentController@getAssignedMembers');
    
    // Members routes
    Route::get('get_members_without_paginate', 'MemberController@Get_Members_Without_Paginate');
    Route::get('get_unassigned_members', 'MemberController@Get_Unassigned_Members');
    Route::get('members/{id}/full-details', 'MemberController@getFullDetails');
    
    // Rewards and Challenges Routes
    Route::resource('rewards', 'ChallengeRewardController');
    Route::resource('challenges', 'ChallengeController');
    Route::get('challenges/member/{memberId}', 'ChallengeController@getMemberChallenges');
    Route::resource('challenge_participants', 'ChallengeParticipantController');
    Route::get('challenge_participants/challenge/{challengeId}', 'ChallengeParticipantController@participantsByChallenge');
    
    // Appointments Routes
    Route::get('appointments', 'AppointmentController@index');
    Route::post('appointments', 'AppointmentController@store');
    Route::put('appointments/{id}', 'AppointmentController@update');
    Route::delete('appointments/{id}', 'AppointmentController@destroy');
    Route::get('appointments/clients', 'AppointmentController@getClients');
    Route::get('appointments/staff', 'AppointmentController@getStaff');
    Route::get('appointments/member/{memberId}', 'AppointmentController@getMemberAppointments');
    
    // Communication Routes (accessible from both CRM and mobile app)
    Route::get('communication', 'CommunicationController@index');
    Route::get('communication/members', 'CommunicationController@getMembers');
    Route::get('communication/coaches', 'CommunicationController@getCoaches');
    Route::get('communication/chat-history/{recipientId}/{recipientType?}', 'CommunicationController@getChatHistory');
    Route::post('communication/send-message', 'CommunicationController@sendMessage');
    
    // Group Chat Routes
    Route::post('communication/groups', 'CommunicationController@createGroup');
    Route::get('communication/groups', 'CommunicationController@getGroups');
    Route::get('communication/groups/{groupId}', 'CommunicationController@getGroupDetails');
    Route::post('communication/groups/{groupId}', 'CommunicationController@updateGroup');
    Route::post('communication/groups/{groupId}/messages', 'CommunicationController@sendGroupMessage');
    
    // Workout Exercises Routes (accessible from both web and mobile)
    Route::get('workout_exercises/without_paginate', 'WorkoutActivityController@Get_Exercises_Without_Paginate');
    Route::get('workout_exercises/all-thumbnails', 'WorkoutActivityController@getAllThumbnails');
    Route::get('workout_exercises/video-catalog-thumbnails', 'WorkoutActivityController@getVideoCatalogThumbnails');
    Route::get('workout_exercises/video-url-by-name', 'WorkoutActivityController@getVideoUrlByName');

    // Video Catalog (from video_catalog table) - Coach Mobile Activity Library (thumbnails + lazy video loading)
    Route::get('video-catalog/thumbnails', 'Mobile\coach\MobileVideoCatalogController@thumbnails');
    Route::get('video-catalog/categories', 'Mobile\coach\MobileVideoCatalogController@getCategories');
    Route::get('video-catalog/{id}', 'Mobile\coach\MobileVideoCatalogController@show')->whereNumber('id');

    // Activity Plan routes (for saving/loading activity plan data)
    Route::get('activity-plan', 'Mobile\coach\MobileActivityPlanController@get');
    Route::post('activity-plan', 'Mobile\coach\MobileActivityPlanController@save');

    // ------------------------------- Workouts & Plan Builder (Coach Mobile needs these) -------------------------------
    // NOTE: These routes are also defined under auth:api later in this file.
    // Placing them here ensures mobile tokens are accepted via MobileOrApiAuth.
    // IMPORTANT: Do NOT duplicate the same URIs later under auth:api, otherwise auth:api will override these.

    // Keep this explicit route before workout/{id} to avoid route param conflicts
    Route::get('workout/check-assignments', 'WorkoutController@checkAssignments');

    // Workout library (templates) - shared access (web + mobile)
    // Create/update/delete are restricted inside controller to coaches/admins.
    Route::resource('workout', 'WorkoutController')->except(['create', 'edit']);

    // Workout assignment routes
    Route::post('workout/assign', 'WorkoutController@assignWorkout');
    Route::get('workout/assignments/{memberId}', 'WorkoutController@getMemberAssignments')->whereNumber('memberId');
    Route::delete('workout/assignments/{id}', 'WorkoutController@deleteAssignment')->whereNumber('id');

    // Workout activity plan (Plan Builder)
    Route::resource('workout_activity_plan', 'WorkoutActivityPlanController');
    Route::get('workout_activity_plan/day/{day}', 'WorkoutActivityPlanController@show');
    Route::get('workout_activity_plan/exercise/{exerciseId}', 'WorkoutActivityPlanController@getExerciseData');
});

// Also register these routes with auth:api for web interface compatibility
// This ensures Passport authentication works properly for web requests
Route::middleware(['auth:api', 'Is_Active', 'subscribed'])->group(function () {
    // Members routes (duplicate for web compatibility)
    Route::get('get_members_without_paginate', 'MemberController@Get_Members_Without_Paginate');
    Route::get('get_unassigned_members', 'MemberController@Get_Unassigned_Members');
    
    // Coach Assignment Routes (duplicate for web compatibility)
    Route::get('coaches/{coachId}/assigned-members', 'Mobile\coach\MobileCoachAssignmentController@getAssignedMembers');
    
    // Appointments Routes (duplicate for web compatibility)
    Route::get('appointments', 'AppointmentController@index');
    Route::post('appointments', 'AppointmentController@store');
    Route::put('appointments/{id}', 'AppointmentController@update');
    Route::delete('appointments/{id}', 'AppointmentController@destroy');
    Route::get('appointments/clients', 'AppointmentController@getClients');
    Route::get('appointments/staff', 'AppointmentController@getStaff');
    Route::get('appointments/member/{memberId}', 'AppointmentController@getMemberAppointments');

    // Schedule Routes (duplicate for web compatibility)// Schedule Routes
    Route::get('schedule/events', 'ScheduleController@getEvents');
    Route::post('schedule/events', 'ScheduleController@store');
    Route::put('schedule/events/{id}', 'ScheduleController@update');
    Route::delete('schedule/events/{id}', 'ScheduleController@destroy');
    // Schedule Activities (CRM + Coach Mobile App)
    Route::get('schedule/activities', 'ScheduleActivityController@index');
    Route::post('schedule/activities', 'ScheduleActivityController@store');
    Route::get('schedules', 'ScheduleController@getSchedules');
    Route::get('locations', 'ScheduleController@getLocations');
    
    // Challenges Routes (duplicate for web compatibility)
    Route::resource('rewards', 'ChallengeRewardController');
    Route::resource('challenges', 'ChallengeController');
    Route::get('challenges/member/{memberId}', 'ChallengeController@getMemberChallenges');
    Route::resource('challenge_participants', 'ChallengeParticipantController');
    Route::get('challenge_participants/challenge/{challengeId}', 'ChallengeParticipantController@participantsByChallenge');
    
    // Communication Routes (duplicate for web compatibility)
    Route::get('communication', 'CommunicationController@index');
    Route::get('communication/members', 'CommunicationController@getMembers');
    Route::get('communication/coaches', 'CommunicationController@getCoaches');
    Route::get('communication/chat-history/{recipientId}/{recipientType?}', 'CommunicationController@getChatHistory');
    Route::post('communication/send-message', 'CommunicationController@sendMessage');
    
    // Group Chat Routes (duplicate for web compatibility)
    Route::post('communication/groups', 'CommunicationController@createGroup');
    Route::get('communication/groups', 'CommunicationController@getGroups');
    Route::get('communication/groups/{groupId}', 'CommunicationController@getGroupDetails');
    Route::post('communication/groups/{groupId}', 'CommunicationController@updateGroup');
    Route::post('communication/groups/{groupId}/messages', 'CommunicationController@sendGroupMessage');
});

// ============================================================================
// Routes accessible ONLY from CRM Web Interface (Passport auth required)
// Uses 'auth:api' middleware for Laravel Passport authentication
// ============================================================================
Route::middleware(['auth:api', 'Is_Active', 'subscribed'])->group(function () {
    // Dashboard routes
    Route::prefix('dashboard')->group(function () {
        Route::get('/stats', 'DashboardController@stats');
        Route::get('/revenue-trend', 'DashboardController@revenueTrend');
        Route::get('/member-growth', 'DashboardController@memberGrowth');
        Route::get('/top-coaches', 'DashboardController@topCoaches');
        Route::get('/alerts', 'DashboardController@alerts');
        Route::get('/active-memberships-trend', 'DashboardController@activeMembershipsTrend');
        Route::get('/client-status', 'DashboardController@clientStatus');
        Route::get('/active-clients-trend', 'DashboardController@activeClientsTrend');
    });
    
    Route::get('test-coaches', 'CoachController@index');
    Route::get('/retrieve-customer', 'StripeController@retrieveCustomer');
    Route::post('/update-customer-stripe', 'StripeController@updateCustomer');

    //-------------------------- Clear Cache ---------------------------

    Route::get("clear_cache", "SettingsController@Clear_Cache");

    //-------------------------- Reports ---------------------------

    Route::get("report/client", "ReportController@Client_Report");
    Route::get("report/client/{id}", "ReportController@Client_Report_detail");
    Route::get("report/payment_chart", "ReportController@Payment_chart");
    Route::get("report/warehouse_report", "ReportController@Warehouse_Report");
    Route::get("report/warhouse_count_stock", "ReportController@Warhouse_Count_Stock");
    Route::get("report/report_today", "ReportController@report_today");
    Route::get("report/count_quantity_alert", "ReportController@count_quantity_alert");
    Route::get("report/profit_and_loss", "ReportController@ProfitAndLoss");
    Route::get("report/report_dashboard", "ReportController@report_dashboard");
    Route::get("report/datatable1", "ReportController@DataTable1");
    Route::post("report/profit-loss-detail", "ReportController@getProfitLossDetailReport");
    Route::get("report/trial-balance", "ReportController@getTrialBalanceReport");
    Route::get("report/open-inventory", "ReportController@getTrialBalanceReport");
    Route::post('/report/jvEnter', "ReportController@storeJV");


    Route::get('pos/data_create_pos', 'PosController@GetELementPos');
    Route::get('pos/counterDetails', 'PosController@checkCounterStatus');

    Route::post('pos/counteropen', 'PosController@openCounter');
    Route::post('pos/counterclose', 'PosController@closeCounter');
    Route::get('pos/counters', 'PosController@getAllCounters');

    Route::get('/pos/current-user', 'PosController@getCurrentUser');
    Route::get('/pos/counter/{id}', 'PosController@getCounterReport');

//------------------------------- POS 2 --------------------------\\
    //------------------------------------------------------------------\\

    Route::get('pos/counterDetails_2', 'PosController_2@checkCounterStatus');

    Route::post('pos/counteropen_2', 'PosController_2@openCounter');
    Route::post('pos/counterclose_2', 'PosController_2@closeCounter');
    Route::get('pos/counters_2', 'PosController_2@getAllCounters');

    Route::get('/pos/current-user_2', 'PosController_2@getCurrentUser');
    Route::get('/pos/counter_2/{id}', 'PosController_2@getCounterReport');

//------------------------------- JV --------------------------\\
    //------------------------------------------------------------------\\

    Route::resource('jv', 'JVController');
    Route::post('Jv_delete_by_selection', 'JVController@delete_by_selection');


    Route::get("report/ledger_report", "ReportController@ledger_report");

    Route::resource('transfer_money', 'TransferMoneyController');
    Route::get('/transfer_money/balance/{account_id}',  'TransferMoneyController@getBalance');

    Route::get('/report/accounts', "ReportController@getAccounts");




    Route::get('/report/loadNagitive/{warehouse}/{department}/{date}', "ReportController@getNagitiveStock");



    Route::get('/report/recipes', "ReportController@getRecipes");

    Route::get('/report/deal-items/{productId}', "ReportController@getDealItemDetails");


    Route::get('/report/sale-date', "ReportController@getSaleDateItemDetails");

    Route::post("report/stockEnter", "ReportController@storeStock");
    Route::get('/report/previousStock', "ReportController@getpreviousStock");

    Route::resource('kot', 'KotController');
    Route::put("report/kot", "KotController@update");

    Route::get('/report/childaccounts', "ReportController@getChildAccounts");
    Route::get('/report/all_accounts', "ReportController@getAllAccounts");
    Route::get("report/users", "ReportController@users_Report");
    Route::get("report/stock", "ReportController@stock_Report");
    Route::get("report/get_transfer_by_user", "ReportController@get_transfer_by_user");
    Route::get("report/get_transfer_by_product", "ReportController@get_transfer_by_product");
    Route::get("report/client_pdf/{id}", "ReportController@download_report_client_pdf");

    //------------------------------orders------------------------------------\\
    // Route::get( "order/show", "OrderController@show");
    // Route::get('orders/', 'OrderController@index');

    Route::resource('orders',  'OrderController');
    Route::post('orders/done', 'OrderController@done_order');

    // ledger
    Route::get("report/trial-balance", "ReportController@getTrialBalanceReport");
    Route::get("report/balance-statement", "ReportController@getBalanceStatement");
    Route::get("report/income_statement", "ReportController@getIncomeStatement");
    Route::post("report/profit-loss-report", "ReportController@getProfitLossReport");

    Route::post("report/getStockInventoryReport", "ReportController@getStockInventoryReport");
    Route::post("report/getStockInventoryReportDetails", "ReportController@getStockInventoryReportDetails");
    Route::post("report/getStockInventoryReportDetails_nongrp", "ReportController@getStockInventoryReportDetails_nongrp");

    Route::post("report/getStockInventoryReportsummary_nongrp", "ReportController@getStockInventoryReportsummary_nongrp");



    Route::post("report/profit-loss-report-summary", "ReportController@getProfitLossReportSummary");
    Route::post("report/profit-loss-report-date", "ReportController@getProfitLossReportDate");



    Route::post("report/stock-inventory", "ReportController@getStockInventory");
    Route::post("report/stock-inventoryDetail", "ReportController@getStockDetailInventory");

    Route::post("report/stock-inventory_audit", "ReportController@getStockInventory_audit");
    Route::post("report/stock-inventoryDetail_audit", "ReportController@getStockDetailInventory_audit");


    Route::post("report/bom_stock-inventory", "ReportController@bom_getStockInventory");
    Route::post("report/bom_stock-inventoryDetail", "ReportController@bom_getStockDetailInventory");
    //------------------------------Employee------------------------------------\\



     //------------------------------- table --------------------------\\
    //--------------------------------------------------------------------\\
    // Route::resource('table', 'hrm\TableController');
    // Route::get("get_all_table", "hrm\TableController@Get_all_Table");
    // Route::post("table/delete/by_selection", "hrm\TableController@delete_by_selection");


    //------------------------------- office_shift ------------------\\
    //----------------------------------------------------------------\\

    Route::resource('office_shift', 'hrm\OfficeShiftController');
    Route::post("office_shift/delete/by_selection", "hrm\OfficeShiftController@delete_by_selection");




    //------------------------------- Request leave  -----------------------\\
    //----------------------------------------------------------------\\

    Route::resource('leave', 'hrm\LeaveController');
    Route::resource('leave_type', 'hrm\LeaveTypeController');
    Route::post("leave/delete/by_selection", "hrm\LeaveController@delete_by_selection");
    Route::post("leave_type/delete/by_selection", "hrm\LeaveTypeController@delete_by_selection");


     //------------------------------- holiday ----------------------\\
    //----------------------------------------------------------------\\

    Route::resource('holiday', 'hrm\HolidayController');
    Route::post("holiday/delete/by_selection", "hrm\HolidayController@delete_by_selection");


    Route::resource('waiter', 'hrm\WaiterController');
    Route::post("waiter/delete/by_selection", "hrm\WaiterController@delete_by_selection");


    //------------------------------- core --------------------------\\
    //--------------------------------------------------------------------\\

    Route::prefix('core')->group(function () {
       Route::get("get_office_shift_by_company", "hrm\CoreController@Get_office_shift_by_company");
    });

    //------------------------------- CLIENTS --------------------------\\
    //------------------------------------------------------------------\\

    Route::resource('clients', 'MemberController');
    Route::get('get_clients_without_paginate', 'MemberController@Get_Clients_Without_Paginate');


     //------------------------------------------------------------------\\
// New Member Api's
    // Check email route must come before resource route to avoid route conflicts
    Route::get('members/check-email', 'MemberController@checkEmail');
    Route::resource('members', 'MemberController');
    Route::get('members/{id}/full-details', 'MemberController@getFullDetails');
    Route::get('members/{id}/assigned-meal-plans', 'MemberController@getMemberAssignedMealPlans');
    Route::put('members/{memberId}/assigned-meal-plans/{assignmentId}', 'MemberController@updateAssignedMealPlan');
    Route::put('members/{memberId}/assigned-meal-plans/{assignmentId}/meal-products/serving', 'MemberController@updateAssignedMealPlanMealProductServing');
    Route::delete('members/{memberId}/assigned-meal-plans/{assignmentId}', 'MemberController@deleteAssignedMealPlan');
    Route::post('members/{id}/documents', 'MemberController@uploadDocument');
    Route::get('members/{id}/documents', 'MemberController@getDocuments');
    Route::get('members/{id}/documents/{documentId}/download', 'MemberController@downloadDocument');
    Route::delete('members/{id}/documents/{documentId}', 'MemberController@deleteDocument');
    Route::post('members/import/csv', 'MemberController@import_members');
    // Note: get_members_without_paginate and get_unassigned_members routes
    // are moved to mobile.or.api middleware group above for cross-platform access
    Route::post('members/delete/by_selection', 'MemberController@delete_by_selection');
    Route::post('members_pay_due', 'MemberController@members_pay_due');
    Route::post('members_pay_return_due', 'MemberController@pay_sale_return_due');

// Member Actions Routes
    Route::post('members/{id}/create-task', 'MemberController@createTask');
    Route::get('members/{id}/tasks', 'MemberController@getMemberTasks');
    Route::put('members/{id}/tasks/{taskId}', 'MemberController@updateTask');
    Route::delete('members/{id}/tasks/{taskId}', 'MemberController@deleteTask');
    Route::get('members/{id}/coach-assignment', 'MemberController@getCoachAssignment');
    Route::post('members/{id}/assign-coach', 'MemberController@assignCoach');
    Route::post('members/{id}/assign-membership', 'MemberController@assignMembership');
    Route::delete('members/{id}/remove-coach-assignment', 'MemberController@removeCoachAssignment');
    
    // Progress Tracker routes
    Route::post('members/{id}/progress', 'MemberController@saveProgress');
    Route::get('members/{id}/progress', 'MemberController@getProgress');
    Route::get('members/{id}/progress-graph', 'MemberController@getProgressGraph');
    
    // Member Nutrition Fields Routes
    Route::get('members/{id}/instructions', 'MemberController@getInstructions');
    Route::put('members/{id}/instructions', 'MemberController@updateInstructions');
    Route::get('members/{id}/supplements', 'MemberController@getSupplements');
    Route::put('members/{id}/supplements', 'MemberController@updateSupplements');
    Route::get('members/{id}/weight-training-cardio', 'MemberController@getWeightTrainingCardio');
    Route::put('members/{id}/weight-training-cardio', 'MemberController@updateWeightTrainingCardio');
    
    // Member Tags Routes
    Route::get('members/tags/available', 'MemberController@getAvailableTags');
    
    // Member Goals Routes (for web/CRM)
    Route::get('members/{id}/goals', 'MemberController@getMemberGoals');
    Route::post('members/{id}/goals', 'MemberController@saveMemberGoal');
    Route::put('members/{id}/goals', 'MemberController@saveMemberGoal');
    Route::get('members/{id}/goals/{goalType}/activities', 'MemberController@getGoalActivities');
    Route::get('members/{id}/activities', 'MemberController@getGoalActivities');
    Route::post('members/{id}/activities', 'MemberController@logGoalActivity');
});

// Note: Coach assignments, members list, rewards, challenges, and appointments routes
// are moved to mobile.or.api middleware group above for cross-platform access

Route::middleware(['auth:api', 'Is_Active', 'subscribed'])->group(function () {
    Route::get('coach-assignments', 'CoachAssignmentController@getGymAssignments');
    Route::get('coaches/{coachId}/assignments', 'CoachAssignmentController@getCoachAssignments');
    Route::post('coaches/{coachId}/assign-member', 'CoachController@assignMemberToCoach');
    Route::delete('coaches/{coachId}/unassign-member/{assignmentId}', 'CoachController@unassignMember');
    Route::put('coach-assignments/{assignmentId}/status', 'CoachAssignmentController@updateStatus');

// Coach Settings Routes
    Route::get('coaches/{coachId}/settings', 'CoachSettingsController@getCoachSettings');
    Route::put('coaches/{coachId}/settings', 'CoachSettingsController@updateCoachSettings');
    Route::post('coaches/{coachId}/settings/reset', 'CoachSettingsController@resetCoachSettings');
    Route::get('coach-settings', 'CoachSettingsController@getGymCoachSettings');

    Route::post('members/{id}/convert-to-staff', 'MemberController@convertToStaff');
    Route::post('members/{id}/convert-to-coach', 'MemberController@convertToCoach');
    Route::post('members/{id}/unsubscribe', 'MemberController@unsubscribeMember');
    Route::get('members/{id}/unsubscribe-history', 'MemberController@getUnsubscribeHistory');
    Route::post('members/{id}/update-unsubscribe', 'MemberController@updateUnsubscribe');
    Route::post('members/{id}/resubscribe', 'MemberController@resubscribeMember');
    Route::post('members/{id}/send-message', 'MemberController@sendMessage');
    Route::get('members/{id}/messages', 'MemberController@getMemberMessages');
    Route::get('members/sent-messages', 'MemberController@getAllSentMessages');

// Member Coaching Profile
    Route::get('members/{id}/coaching', 'MemberCoachingProfileController@show');
    Route::put('members/{id}/coaching', 'MemberCoachingProfileController@upsert');


    //-------------------------- Coach Actions ---------------------------
    Route::post('coaches/{id}/create-task', 'CoachController@createTask');
    Route::get('coaches/{id}/tasks', 'CoachController@getCoachTasks');
    Route::put('coaches/{id}/tasks/{taskId}', 'CoachController@updateTask');
    Route::delete('coaches/{id}/tasks/{taskId}', 'CoachController@deleteTask');
    Route::post('coaches/{id}/send-message', 'CoachController@sendMessage');
    Route::get('coaches/{id}/messages', 'CoachController@getMessages');
    Route::delete('coaches/{id}/messages/{messageId}', 'CoachController@deleteMessage');
    Route::get('coaches/{id}/activities', 'CoachController@getCoachActivities');
    
    //-------------------------- Unified Tasks (Member & Coach) ---------------------------
    Route::get('tasks', 'TaskController@index');
    Route::post('tasks', 'TaskController@store');
    Route::put('tasks/{id}', 'TaskController@update');
    Route::delete('tasks/{id}', 'TaskController@destroy');
    
    //-------------------------- Trainer Tasks ---------------------------
    Route::get('trainers/{trainerId}/tasks', 'TrainerTaskController@getTrainerTasks');
    Route::post('trainers/{trainerId}/tasks', 'TrainerTaskController@createTask');
    Route::put('trainers/{trainerId}/tasks/{taskId}', 'TrainerTaskController@updateTask');
    Route::delete('trainers/{trainerId}/tasks/{taskId}', 'TrainerTaskController@deleteTask');
    Route::get('trainer-tasks', 'TrainerTaskController@index');
    Route::get('trainer-tasks/overdue', 'TrainerTaskController@getOverdueTasks');
    Route::get('trainer-tasks/due-soon', 'TrainerTaskController@getDueSoonTasks');
    
    Route::resource('coaches', 'CoachController');
    Route::get('coach','CoachController@index');
    Route::post('coaches/import/csv', 'CoachController@importCsv');
    Route::post('coaches/fix-auto-increment', 'CoachController@fixAutoIncrement');
    Route::post('coaches/{id}/convert-to-member', 'CoachController@convertToMember');
   
    //------------------------------- Communication --------------------------\\
    //--------------------------------------------------------------------\\
    // Note: Communication routes moved to mobile.or.api middleware group above for cross-platform access

    //------------------------------- Excel Files --------------------------\\
    //--------------------------------------------------------------------\\
    Route::prefix('excel-files')->group(function () {
        Route::get('/', 'ExcelFileController@index');
        Route::post('/', 'ExcelFileController@store');
        Route::get('/stats', 'ExcelFileController@stats');
        Route::get('/{id}', 'ExcelFileController@show');
        Route::get('/{id}/download', 'ExcelFileController@download');
        Route::put('/{id}', 'ExcelFileController@update');
        Route::delete('/{id}', 'ExcelFileController@destroy');
        Route::post('/bulk-delete', 'ExcelFileController@bulkDelete');
    });


    //------------------------------- Workout Activity --------------------------\\
    //--------------------------------------------------------------------\\
    // Define specific routes BEFORE resource to avoid being captured by {id} in resource routes
    Route::get('workout_exercises/available-videos', 'WorkoutActivityController@getAvailableVideos');
    // NOTE: workout_exercises/all-thumbnails + workout_exercises/without_paginate are registered under mobile.or.api above
    // to allow both Passport and mobile tokens. Do not duplicate them here, otherwise auth:api overrides mobile.or.api.
    Route::resource('workout_exercises', 'WorkoutActivityController');
    Route::post('workout_exercises/delete/by_selection', 'WorkoutActivityController@delete_by_selection');
    Route::get('workout_exercises/get_number_order', 'WorkoutActivityController@getNumberOrder');
    // Route::get('workout_exercises/available-videos', 'WorkoutActivityController@getAvailableVideos');
    // Route::post('workout_exercises/import', 'WorkOutExcerciseController@import_exercises');

      //------------------------------- Workout Activity --------------------------\\
    //--------------------------------------------------------------------\\
    // NOTE: workout index/show + assignments are registered under the shared mobile.or.api group above.
    // Keep only write routes here to avoid overriding shared routes with auth:api (Passport-only).
    // NOTE: workout routes are registered under the shared mobile.or.api group above.
    Route::post('workout/delete/by_selection', 'WorkoutController@delete_by_selection');
    Route::get('workout/get_number_order', 'WorkoutController@getNumberOrder');
    Route::get('workout/without_paginate', 'WorkoutController@Get_Exercises_Without_Paginate');
    
    // Workout Assignment Routes
    Route::get('workout/workout-assignments/{workoutId}', 'WorkoutController@getWorkoutAssignments'); // Get assignments for a specific workout
    // Route::post('workout_exercises/import', 'WorkOutExcerciseController@import_exercises');

    //------------------------------- Workout Days --------------------------\\
    //--------------------------------------------------------------------\\
    Route::post('workout_days', 'WorkoutDayController@store');
    Route::get('workout_days/{workoutId}', 'WorkoutDayController@show');
    Route::delete('workout_days/{workoutId}', 'WorkoutDayController@destroy');

    //------------------------------- Workout Activity Plan --------------------------\\
    //--------------------------------------------------------------------\\
    // NOTE: workout_activity_plan routes are registered under the shared mobile.or.api group above.

    //------------------------------- Reward and Challenge routes moved to mobile.or.api middleware group above --------------------------\\
    //--------------------------------------------------------------------\\

    //------------------------------- Subscription Plans --------------------------\\
    //--------------------------------------------------------------------\\
    Route::resource('subscription_plans', 'SubscriptionPlansController');
    Route::get('subscription_plans/features/list', 'SubscriptionPlansController@getFeatures');

    //------------------------------- Subscription Management --------------------------\\
    //--------------------------------------------------------------------\\
    Route::prefix('subscriptions')->group(function () {
        Route::get('/expiring', 'SubscriptionManagementController@getExpiringSubscriptions');
        Route::get('/expired', 'SubscriptionManagementController@getExpiredSubscriptions');
        Route::get('/statistics', 'SubscriptionManagementController@getStatistics');
        Route::post('/{id}/send-reminder', 'SubscriptionManagementController@sendReminder');
        Route::post('/{id}/renew', 'SubscriptionManagementController@renewSubscription');
    });

    //------------------------------- Plans (for subscriptions) --------------------------\\
    //--------------------------------------------------------------------\\
    Route::resource('plans', 'PlanController');
    Route::get('plans/features/list', 'PlanController@getFeatures');
    Route::get('plans/membership-groups/list', 'PlanController@getMembershipGroups');

    //------------------------------- Invoices --------------------------\\
    //--------------------------------------------------------------------\\
    Route::resource('invoices', 'InvoiceController');
    Route::get('invoices/statistics', 'InvoiceController@statistics');
    Route::get('invoices/member/{memberId}', 'InvoiceController@getMemberInvoices');
    Route::put('invoices/{id}/mark-as-paid', 'InvoiceController@markAsPaid');
    Route::put('invoices/{id}/cancel', 'InvoiceController@cancel');

    //---------------------- POS (point of sales) ----------------------\\
    //------------------------------------------------------------------\\


    // Route::resource('pos', 'PosController');
    Route::post('pos/feedback', 'PosController@feedback');

    //------------------------------- POS 2 --------------------------\\
    //------------------------------------------------------------------\\

    // Route::resource('pos', 'PosController');

    Route::post('pos/feedback_2', 'PosController_2@feedback');







    //------------------------------- Departments --------------------------\\
    //------------------------------------------------------------------\\

    Route::resource('department_categories', 'DepartmentCategoryController');
    Route::post('department_categories/delete/by_selection', 'DepartmentCategoryController@delete_by_selection');







    //------------------------------- Currencies --------------------------\\
    //------------------------------------------------------------------\\

    Route::resource('currencies', 'CurrencyController');
    Route::post('currencies/delete/by_selection', 'CurrencyController@delete_by_selection');




    //------------------------------- recipe --------------------------\\
    //------------------------------------------------------------------\\

    Route::resource('recipe', 'RecipeController');
    Route::get('get_payments_by_recipe/{id}', 'RecipeController@Get_Payments');
    Route::post('recipe_send_email', 'RecipeController@Send_Email');
    Route::post('recipe_send_sms', 'RecipeController@Send_SMS');
    Route::post('recipe_delete_by_selection', 'RecipeController@delete_by_selection');
    Route::get('get_Products_by_recipe/{id}', 'RecipeController@get_Products_by_recipe');

    Route::post('recipe/duplicate/{id}', 'RecipeController@duplicate');

    //------------------------------- production --------------------------\\
    //------------------------------------------------------------------\\

    Route::resource('production', 'ProductionController');
    Route::get('get_payments_by_recipe/{id}', 'ProductionController@Get_Payments');
    Route::post('production_send_email', 'ProductionController@Send_Email');
    Route::post('production_send_sms', 'ProductionController@Send_SMS');
    Route::post('production_delete_by_selection', 'ProductionController@delete_by_selection');
    Route::get('get_Products_by_production/{id}', 'ProductionController@get_Products_by_purchase');
    Route::get('get_Products_by_warehouse_specific/{id}', 'ProductionController@Products_by_Warehouse_specific');
    Route::get('get_Products_by_warehouse_specific_ready/{id}', 'RequestController@Products_by_Warehouse_specific_ready');
    Route::get('get_Products_by_recipe_id/{id}', 'ProductionController@show_product_data');
    // Route::get('get_Products_by_recipe_id_request/{id}', 'ProductionController@show_product_data');
    Route::post('get_Products_by_recipe_id_request', 'RequestController@show_product_data_request');


    Route::post('get_Products_by_recipe_id_request_2', 'RequestController@show_product_data_request_2');

    Route::put('get_recipe_details_from_product/{id}', 'ProductionController@show_product_data2');

    Route::resource('request', 'RequestController');
    // Route::get('get_payments_by_recipe/{id}', 'RequestController@Get_Payments');
    // Route::post('production_send_email', 'RequestController@Send_Email');
    // Route::post('production_send_sms', 'RequestController@Send_SMS');
    Route::post('requests_delete_by_selection', 'RequestController@delete_by_selection');
    Route::get('get_Products_by_request/{id}', 'RequestController@get_Products_by_request');


    Route::get('request/edit2/{id}', 'RequestController@edit2');
    // Route::get('get_Products_by_warehouse_specific/{id}', 'RequestController@Products_by_Warehouse_specific');
    // Route::get('get_Products_by_recipe_id/{id}', 'RequestController@show_product_data');
    Route::put('get_request_details_from_product/{id}', 'RequestController@show_product_data2');
















    //------------------------------- Transfers --------------------------\\
    //--------------------------------------------------------------------\\
    Route::resource('transfers', 'TransferController');
    Route::post('transfers/delete/by_selection', 'TransferController@delete_by_selection');

    //------------------------------- Users --------------------------\\
    //------------------------------------------------------------------\\

    Route::get('get_user_auth', 'UserController@GetUserAuth');
    Route::post('user/onboarding', 'UserController@completeOnboarding');
    
    // Subscription Invitations API Routes
    Route::prefix('subscription-invitations')->group(function () {
        Route::get('/data', 'SubscriptionInvitationController@getInvitationData');
        Route::post('/send', 'SubscriptionInvitationController@sendInvitations');
        Route::get('/stats', 'SubscriptionInvitationController@getInvitationStats');
    });
    Route::resource('users', 'UserController');
    Route::put('users_switch_activated/{id}', 'UserController@IsActivated');
    Route::get('Get_user_profile', 'UserController@GetInfoProfile');
    Route::put('update_user_profile/{id}', 'UserController@updateProfile');

    //------------------------------- Permission Groups user -----------\\
    //------------------------------------------------------------------\\
    // Permission and Role tables dropped - routes removed
    // Route::resource('roles', 'PermissionsController');
    // Route::resource('roles/check/create_page', 'PermissionsController@Check_Create_Page');
    // Route::post('roles/delete/by_selection', 'PermissionsController@delete_by_selection');


    //------------------------------- Settings ------------------------\\
    //------------------------------------------------------------------\\
    Route::get('settings/opening-hours', 'SettingsController@getOpeningHours');
    Route::post('settings/opening-hours', 'SettingsController@updateOpeningHours');
    Route::get('settings/facilities', 'SettingsController@getFacilities');
    Route::post('settings/facilities', 'SettingsController@updateFacilities');
    Route::get('settings/client-settings', 'SettingsController@getClientSettings');
    Route::post('settings/client-settings', 'SettingsController@updateClientSettings');
    Route::get('settings/member-settings', 'SettingsController@getMemberSettings');
    Route::post('settings/member-settings', 'SettingsController@updateMemberSettings');
    Route::get('settings/financial-info', 'SettingsController@getFinancialInfo');
    Route::post('settings/financial-info', 'SettingsController@updateFinancialInfo');
    Route::get('settings/module-settings', 'SettingsController@getModuleSettings');
    Route::post('settings/module-settings', 'SettingsController@updateModuleSettings');
    Route::apiResource('settings', 'SettingsController')->only(['show', 'update']);
    Route::get('get_Settings_data', 'SettingsController@getSettings');
    Route::get('get_contracts_data', 'SettingsController@getContractsData');
    Route::post('update_contracts', 'SettingsController@updateContracts');

    //------------------------------- Mail Settings ------------------------\\

    Route::put('update_config_mail/{id}', 'MailSettingsController@update_config_mail');
    Route::get('get_config_mail', 'MailSettingsController@get_config_mail');
    Route::post('test_config_mail', 'MailSettingsController@test_config_mail');


    //------------------------------- SMS Settings ------------------------\\

    Route::get('get_sms_config', 'Sms_SettingsController@get_sms_config');
    Route::post('update_twilio_config', 'Sms_SettingsController@update_twilio_config');
    Route::post('update_nexmo_config', 'Sms_SettingsController@update_nexmo_config');
    Route::post('update_infobip_config', 'Sms_SettingsController@update_infobip_config');

    Route::put('update_Default_SMS', 'Sms_SettingsController@update_Default_SMS');

    // notifications_template
    Route::get('get_sms_template', 'Notifications_Template@get_sms_template');
    Route::put('update_sms_body', 'Notifications_Template@update_sms_body');

    Route::get('get_emails_template', 'Notifications_Template@get_emails_template');
    Route::put('update_custom_email', 'Notifications_Template@update_custom_email');
    Route::post('reset_email_template', 'Notifications_Template@reset_email_template');


    //------------------------------- Payment_gateway Settings ------------------------\\

    Route::post('payment_gateway', 'Payment_gateway_SettingsController@Update_payment_gateway');
    Route::get('get_payment_gateway', 'Payment_gateway_SettingsController@Get_payment_gateway');
    Route::get('gym_payment_gateway/{gymId}', 'Payment_gateway_SettingsController@getGymPaymentGateway');

    //------------------------------- PaysafeCard Payment Routes ------------------------\\
    Route::post('paysafecard/create-payment', 'PaysafeCardController@createPayment');
    Route::get('paysafecard/payment-status/{paymentId}', 'PaysafeCardController@getPaymentStatus');
    Route::post('paysafecard/webhook', 'PaysafeCardController@webhook');
    Route::get('paysafecard/success', 'PaysafeCardController@success');
    Route::get('paysafecard/failure', 'PaysafeCardController@failure');

    //------------------------------- Backup --------------------------\\
    //------------------------------------------------------------------\\

    Route::get("get_backup", "BackupController@Get_Backup");
    Route::get("generate_new_backup", "BackupController@Generate_Backup");
    Route::delete("delete_backup/{name}", "BackupController@Delete_Backup");

    //-------------------------- Appointments routes moved to mobile.or.api middleware group above ---------------------------
    // (Routes are accessible from both CRM and mobile app via mobile.or.api middleware)

    //------------------------------- Challenges --------------------------\\
    //--------------------------------------------------------------------\\
    // (Routes moved to mobile.or.api middleware group above - accessible from both CRM and mobile app)

    //-------------------------------  Print & PDF ------------------------\\
    //------------------------------------------------------------------\\

    Route::get('production_pdf/{id}', 'ProductionController@Purchase_pdf');
    Route::get('recipe_pdf/{id}', 'RecipeController@Purchase_pdf');

    // Route::get('get_tables', 'hrm\TableController@get_tables');

       //------------------------------- Food --------------------------\\
    //--------------------------------------------------------------------\\
    Route::get('foods/test', 'FoodController@test');
    Route::get('foods/food-types', 'FoodController@getFoodTypes');
    Route::get('foods/food-type/{foodType}', 'FoodController@getByFoodType');
    Route::resource('foods', 'FoodController');

    //------------------------------- Nutrition --------------------------\\
    //--------------------------------------------------------------------\\
    Route::resource('nutrition', 'NutritionController');
    Route::post('nutrition/assign', 'NutritionController@assign');
    Route::get('nutrition/member-created', 'NutritionController@getMemberCreatedRecords');
    Route::get('nutrition/activity-logs', 'NutritionController@getActivityLogs');
    Route::put('nutrition/{templateId}/product-serving', 'NutritionController@updateProductServing');
    Route::get('nutrition-categories', 'NutritionCategoryController@index');

        //------------------------------- Nutrition Plans --------------------------\\
    //--------------------------------------------------------------------\\
    Route::resource('nutrition_plans', 'NutritionPlanController');
    Route::get('nutrition_plans/member/{memberId}', 'NutritionPlanController@getMemberNutritionPlans');
    Route::get('nutrition_plans/test', 'NutritionPlanController@test');

    Route::get('notes/member/{memberId}', 'NoteController@getMemberNotes');
    Route::get('notes/coach/{coachId}', 'NoteController@getCoachNotes');
    Route::post('notes', 'NoteController@store');
    Route::put('notes/{id}', 'NoteController@update');
    Route::delete('notes/{id}', 'NoteController@destroy');
    // Check-in Routes
    Route::prefix('check-ins')->group(function () {
        Route::get('/', 'CheckInController@index');
        Route::post('/', 'CheckInController@store');
        // Specific routes must come before parameterized routes to avoid route conflicts
        Route::get('/summary', 'CheckInController@summary');
        Route::get('/current-visitors-count', 'CheckInController@getCurrentVisitorsCount');
        Route::get('/search-visitors', 'CheckInController@searchVisitors');
        Route::get('/export', 'CheckInController@export');
        // Parameterized routes come last
        Route::put('/{id}', 'CheckInController@update');
        Route::delete('/{id}', 'CheckInController@destroy');
    });

});

//------------------------------- Notes (Session-based Auth) --------------------------\\
//--------------------------------------------------------------------\\
Route::middleware(['auth:web', 'Is_Active'])->group(function () {

});

//------------------------------- Gym Owner Sign Up --------------------------\\
Route::post('/gym/register', 'GymOwnerSignUpController@register');
Route::get('/gym/plans', 'GymOwnerSignUpController@getSubscriptionPlans');

//------------------------------- Gym Invoices --------------------------\\
    //--------------------------------------------------------------------\\
    Route::middleware(['auth:api', 'Is_Active', 'subscribed'])->group(function () {
        Route::get('gym-invoices', 'GymInvoiceController@index');
        Route::get('gym-invoices/stripe-publishable-key', 'GymInvoiceController@getStripePublishableKey');
        Route::get('gym-invoices/{id}', 'GymInvoiceController@show');
        Route::post('gym-invoices/{id}/create-payment-intent', 'GymInvoiceController@createPaymentIntent');
        Route::post('gym-invoices/{id}/confirm-payment', 'GymInvoiceController@confirmPayment');
    });

    Route::get('/js-folder/remove', 'JsFolderController@removeJsFolder');