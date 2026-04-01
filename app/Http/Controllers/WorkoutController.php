<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use App\Models\Client;
use App\Models\Member;
use App\Models\Setting;
use App\Models\WorkoutAssignment;
use App\Models\WorkoutActivityPlan;
use App\Models\WorkoutSession;
use App\Models\User;
use App\utils\helpers;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use DB;
use Illuminate\Http\Request;

class WorkoutController extends BaseController
{
    private function requireCoachOrAdmin(Request $request): void
    {
        $actor = $request->user('api');

        if (!$actor) {
            abort(401, 'Unauthenticated.');
        }

        // Members must never create/modify workout templates or assignments via these endpoints
        if ($actor instanceof Member) {
            abort(403, 'Only coaches/admins can perform this action.');
        }

        $roleId = (int) ($actor->role_id ?? 0);
        if (!in_array($roleId, [1, 3], true)) {
            abort(403, 'Not authorized.');
        }
    }

    /**
     * Get last-edited-by id and type for the current API user (admin, coach, or member).
     *
     * @return array{id: int, type: string}
     */
    private function getLastEditedBy(Request $request): array
    {
        $actor = $request->user('api');
        if (!$actor) {
            return ['id' => 0, 'type' => 'admin'];
        }
        if ($actor instanceof Member) {
            return ['id' => (int) $actor->id, 'type' => 'member'];
        }
        $roleId = (int) ($actor->role_id ?? 0);
        $type = $roleId === 1 ? 'admin' : ($roleId === 3 ? 'coach' : 'admin');
        return ['id' => (int) $actor->id, 'type' => $type];
    }

    public function checkAssignments(Request $request)
    {
        try {
            $gymId = $request->user('api')->gym_id;
            
            // Get all workouts with their assignment counts - filter out soft-deleted workouts
            $workouts = Workout::withCount(['assignments' => function($query) use ($gymId) {
                $query->where('gym_id', $gymId);
            }])
            ->whereNull('deleted_at')
            ->get();

            // Get all assignments for debugging
            $allAssignments = WorkoutAssignment::where('gym_id', $gymId)
                ->with(['workout', 'member'])
                ->get();

            return response()->json([
                'success' => true,
                'workouts_with_counts' => $workouts,
                'all_assignments' => $allAssignments,
                'gym_id' => $gymId
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error checking assignments: ' . $e->getMessage(),
                'error' => $e->getTrace()
            ], 500);
        }
    }

    public function getWorkoutAssignments($workoutId, Request $request)
    {
        try {
            $gymId = $request->user('api')->gym_id;
            
            // Get assignments for a specific workout
            $assignments = WorkoutAssignment::where('workout_id', $workoutId)
                ->where('gym_id', $gymId)
                ->with(['member:id,membername,email']) // Use 'membername' field from members table
                ->get();

            return response()->json([
                'success' => true,
                'assignments' => $assignments,
                'workout_id' => $workoutId,
                'gym_id' => $gymId
            ]);
        } catch (\Exception $e) {
            \Log::error('Error getting workout assignments: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Error getting workout assignments: ' . $e->getMessage()
            ], 500);
        }
    }

    //------------- Get ALL Workout Exercises -------------\\

    public function index(request $request)
    {
        // $this->authorizeForUser($request->user('api'), 'create', Client::class);
        // How many items do you want to display.

        $gymId = $request->user('api')->gym_id;
        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }
        
        // Get all workouts for this gym (from CRM, coach app, or member app) with assignment count
        $exercises = Workout::withCount(['assignments as member_count' => function($query) use ($gymId) {
            $query->where('gym_id', $gymId);
        }])
        ->where('gym_id', $gymId)
        ->whereNull('deleted_at');

        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;
        $helpers = new helpers();
        // Filter fields With Params to retrieve
        $columns = array(0 => 'exercise_name', 1 => 'category', 2 => 'level', 3 => 'muscles_targeted');
        $param = array(0 => 'like', 1 => 'like', 2 => 'like', 3 => 'like');
        $data = array();
        
        // Get the filtered workouts (already filtered by gym_id and deleted_at)
        $exercises = $exercises->get();

        $totalRows = $exercises->count();
        foreach ($exercises as $exercise) {
                $item['id'] = $exercise->id;
                $item['exercise_name'] = trim((string) ($exercise->exercise_name ?? '')) ?: 'Unnamed Workout';
                $item['category'] = trim((string) ($exercise->category ?? '')) ?: 'General';
                $item['duration'] = $exercise->duration ?? '30';
                $item['level'] = trim((string) ($exercise->level ?? '')) ?: 'Beginner';
                $item['description'] = $exercise->description;
                $item['equipment'] = $exercise->equipment;
                $item['thumbnail'] = $exercise->thumbnail;
                $item['muscles_targeted'] = $exercise->muscles_targeted;
                $item['calories_burned'] = $exercise->calories_burned;
                $item['goal'] = $exercise->goal;
                $item['instructions'] = $exercise->instructions;
                $item['difficulty'] = $exercise->difficulty;
                $item['rest_period'] = $exercise->rest_period;
                $item['tags'] = $exercise->tags;
                $item['video_link'] = $exercise->video_link;
                // New fields
                $item['visible_for'] = $exercise->visible_for;
                $item['primary_muscle_groups'] = $exercise->primary_muscle_groups;
                $item['secondary_muscle_groups'] = $exercise->secondary_muscle_groups;
                $item['primary_joint'] = $exercise->primary_joint;
                $item['type'] = $exercise->type;
                $item['uses_weights'] = $exercise->uses_weights;
                $item['intensity'] = $exercise->intensity;
                $item['sets_configuration'] = $exercise->sets_configuration;
                $item['rest_period_seconds'] = $exercise->rest_period_seconds;
                $item['qr_link'] = $exercise->qr_link;
                $item['manufacturer'] = $exercise->manufacturer;
                $item['days_per_week'] = $exercise->days_per_week;
                $item['repeat'] = $exercise->repeat;
                $item['rest_seconds'] = $exercise->rest_seconds;
                $item['default_reps'] = $exercise->default_reps;
                $item['enable_preset_weights'] = $exercise->enable_preset_weights;
                $item['created_at'] = $exercise->created_at;
                $item['member_count'] = $exercise->member_count ?? 0; // Add member count to response
                $item['last_edited_by_type'] = $exercise->last_edited_by_type;
                $data[] = $item;
        }

        $company_info = Setting::where('deleted_at', '=', null)->first();

        return response()->json([
            'exercises' => $data,
            'company_info' => $company_info,
            'totalRows' => $totalRows,
        ]);
    }

    //------------- Store new Workout Exercise -------------\\

    public function store(Request $request)
    {
        // $this->authorizeForUser($request->user('api'), 'create', Client::class);
        $this->requireCoachOrAdmin($request);

        $this->validate($request, [
            'exercise_name' => 'required|string|min:1|max:255',
            'category' => 'required|string|min:1|max:100',
            'duration' => 'required',
            'level' => 'required|string|min:1|max:50',
            'description' => 'nullable|string',
            'equipment' => 'nullable',
            'thumbnail' => 'nullable',
            'calories_burned' => 'nullable',
            'instructions' => 'nullable',
            'difficulty' => 'nullable',
            'rest_period' => 'nullable',
            'sets' => 'nullable',
            'tags' => 'nullable',
            'video_link' => 'nullable',
            'muscles_targeted' => 'nullable',
            'type' => 'nullable',
            'goal' => 'nullable|string',
            'sets' => 'nullable',
            'days_per_week' => 'nullable|string',
            'repeat' => 'nullable|string',
            'rest_seconds' => 'nullable|integer',
            'default_reps' => 'nullable|string',
            'enable_preset_weights' => 'nullable|boolean',
            'member_id' => 'nullable|integer|exists:members,id',
        ]);

        // Normalize required fields (FormData/mobile may send empty strings)
        $exerciseName = trim((string) $request->input('exercise_name', ''));
        $category = trim((string) $request->input('category', ''));
        $level = trim((string) $request->input('level', ''));
        if ($exerciseName === '') {
            $exerciseName = 'Unnamed Workout';
        }
        if ($category === '') {
            $category = 'General';
        }
        if ($level === '') {
            $level = 'Beginner';
        }

        // Log incoming request for debugging coach-app vs CRM creates
        \Log::info('WorkoutController store - Request received', [
            'has_exercise_name' => $request->has('exercise_name'),
            'exercise_name_length' => strlen($exerciseName),
            'content_type' => $request->header('Content-Type'),
            'gym_id' => $request->user('api')->gym_id ?? null,
        ]);

        // Handle thumbnail upload if provided
        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail');
            $thumbnailName = time() . '_' . $thumbnail->getClientOriginalName();
            
            // Create directory if it doesn't exist
            $uploadPath = public_path('images/workout_thumbnails');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }
            
            // Move file to public/images/workout_thumbnails
            $thumbnail->move($uploadPath, $thumbnailName);
            $thumbnailPath = 'images/workout_thumbnails/' . $thumbnailName;
        } elseif ($request->thumbnail) {
            // If thumbnail is a path (default image or URL), store it as is
            $thumbnailPath = $request->thumbnail;
        } else {
            // Default image if no thumbnail provided
            $thumbnailPath = '/images/closeup.webp';
        }

        // Prepare sets configuration
        $setsConfiguration = null;
        if ($request->sets && is_array($request->sets)) {
            $setsConfiguration = json_encode($request->sets);
        }

        // Prepare default_reps - always process if present in request
        $defaultReps = null;
        if ($request->has('default_reps') && $request->default_reps !== null && $request->default_reps !== '') {
            if (is_array($request->default_reps)) {
                $defaultReps = json_encode($request->default_reps);
            } elseif (is_string($request->default_reps)) {
                // Validate it's valid JSON
                $decoded = json_decode($request->default_reps, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $defaultReps = $request->default_reps;
                }
            }
        }

        try {
            $exercise = new Workout();
            $exercise->gym_id = $request->user('api')->gym_id;
            
            // Save member_id if provided (for member-specific workouts, otherwise NULL for templates)
            if ($request->has('member_id') && $request['member_id'] !== null && $request['member_id'] !== '') {
                $exercise->member_id = (int) $request['member_id'];
            } else {
                $exercise->member_id = null; // Templates don't have member_id
            }
            
            $exercise->exercise_name = $exerciseName;
            $exercise->category = $category;
            $exercise->duration = (string) $request->input('duration', '30');
            $exercise->level = $level;
            $exercise->description = (string) ($request['description'] ?? '');
            $exercise->equipment = (string) ($request['equipment'] ?? '');
            $exercise->thumbnail = $thumbnailPath;
            $exercise->muscles_targeted = (string) ($request['muscles_targeted'] ?? '');
            // DB column is NOT NULL in production; default to 0 if not provided
            $exercise->calories_burned = ($request->has('calories_burned') && $request['calories_burned'] !== null && $request['calories_burned'] !== '')
                ? (int) $request['calories_burned']
                : 0;
            $exercise->instructions = (string) ($request['instructions'] ?? '');
            $exercise->difficulty = (int) ($request['difficulty'] ?? 1);
            $exercise->rest_period = (int) ($request['rest_period'] ?? 30);
            $exercise->tags = (string) ($request['tags'] ?? '');
            $exercise->goal = (string) ($request['goal'] ?? '');
            $exercise->sets = $request['sets'] ?? [];
            
            // Settings fields
            $exercise->days_per_week = $request['days_per_week'] ?? null;
            $exercise->repeat = $request['repeat'] ?? null;
            $exercise->rest_seconds = $request->has('rest_seconds') && $request['rest_seconds'] !== null && $request['rest_seconds'] !== '' 
                ? (int) $request['rest_seconds'] 
                : null;
            $exercise->default_reps = $defaultReps;
            $exercise->enable_preset_weights = $request->has('enable_preset_weights') 
                ? (bool) $request['enable_preset_weights'] 
                : false;
            
            // $exercise->video_link = (string) ($request['video_link'] ?? '');
            // Set default values for new fields to prevent null issues
            // $exercise->visible_for = 'all';
            // $exercise->primary_muscle_groups = (string) ($request['muscles_targeted'] ?? '');
            // $exercise->secondary_muscle_groups = '';
            // $exercise->primary_joint = '';
            $exercise->type = (string) ($request['type'] ?? null);
            // $exercise->uses_weights = false;
            // $exercise->intensity = (int) ($request['difficulty'] ?? 5);
            // $exercise->sets_configuration = $setsConfiguration;
            // $exercise->rest_period_seconds = (int) ($request['rest_period'] ?? 30);
            // $exercise->qr_link = '';
            // $exercise->manufacturer = '';

            $lastEditedBy = $this->getLastEditedBy($request);
            $exercise->last_edited_by_id = $lastEditedBy['id'];
            $exercise->last_edited_by_type = $lastEditedBy['type'];
            
            // Log before saving
            \Log::info('WorkoutController store - Saving workout:', [
                'exercise_name' => $exercise->exercise_name,
                'category' => $exercise->category,
                'duration' => $exercise->duration,
                'level' => $exercise->level,
                'gym_id' => $exercise->gym_id,
                'member_id' => $exercise->member_id,
                'goal' => $exercise->goal,
                'description' => substr($exercise->description, 0, 50) . '...',
                'calories_burned' => $exercise->calories_burned,
                'instructions' => substr($exercise->instructions, 0, 50) . '...',
            ]);
            
            $exercise->save();
            
            // Log after saving
            \Log::info('WorkoutController store - Workout saved successfully:', [
                'id' => $exercise->id,
                'exercise_name' => $exercise->exercise_name,
            ]);
            
            return response()->json(['success' => true, 'id' => $exercise->id]);
        } catch (\Exception $e) {
            \Log::error('WorkoutController store - Error saving workout:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all(),
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to save workout',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred while saving the workout. Please try again.'
            ], 500);
        }
    }

    //------------ function show -----------\\

    public function show($id){
        // $this->authorizeForUser(request()->user('api'), 'view', Workout::class);
        
        $exercise = Workout::where('id', $id)->where('deleted_at', '=', null)->firstOrFail();
        
        // Get activities count from workout_activity_plans
        $activitiesCount = \App\Models\WorkoutActivityPlan::where('workout_id', $id)->count();
        
        // Format the exercise data for the frontend
        $data = [
            'id' => $exercise->id,
            // 'exercise_id' => $exercise->exercise_id,
            'exercise_name' => $exercise->exercise_name,
            'category' => $exercise->category,
            'duration' => $exercise->duration,
            'level' => $exercise->level,
            'description' => $exercise->description,
            'equipment' => $exercise->equipment,
            'thumbnail' => $exercise->thumbnail,
            'muscles_targeted' => $exercise->muscles_targeted,
            'calories_burned' => $exercise->calories_burned,
            'instructions' => $exercise->instructions,
            'difficulty' => $exercise->difficulty,
            'rest_period' => $exercise->rest_period,
            'tags' => $exercise->tags,
            'goal' => $exercise->goal,
            // 'video_link' => $exercise->video_link,
            // New fields
            // 'visible_for' => $exercise->visible_for,
            'primary_muscle_groups' => $exercise->primary_muscle_groups,
            // 'secondary_muscle_groups' => $exercise->secondary_muscle_groups,
            // 'primary_joint' => $exercise->primary_joint,
            'type' => $exercise->type,
            // 'uses_weights' => $exercise->uses_weights,
            // 'intensity' => $exercise->intensity,
            // 'sets_configuration' => $exercise->sets_configuration,
            // 'rest_period_seconds' => $exercise->rest_period_seconds,
            // 'qr_link' => $exercise->qr_link,
            // 'manufacturer' => $exercise->manufacturer,
            'days_per_week' => $exercise->days_per_week,
            'repeat' => $exercise->repeat,
            'rest_seconds' => $exercise->rest_seconds,
            'default_reps' => $exercise->default_reps,
            'enable_preset_weights' => $exercise->enable_preset_weights,
            'activities_count' => $activitiesCount,
            'last_edited_by_type' => $exercise->last_edited_by_type,
            // 'created_at' => $exercise->created_at,
            // 'updated_at' => $exercise->updated_at,
        ];
        
        return response()->json([
            'success' => true,
            'exercise' => $data
        ]);
    }

    //------------- Update Workout Exercise -------------\\

    public function update(Request $request, $id)
    {
        // $this->authorizeForUser($request->user('api'), 'update', Workout::class);
        $this->requireCoachOrAdmin($request);
        
        // Make all fields nullable for updates - only validate if they are provided
        $this->validate($request, [
            'exercise_name' => 'nullable|string',
            'category' => 'nullable|string',
            'duration' => 'nullable',
            'level' => 'nullable|string',
            'description' => 'nullable|string',
            'equipment' => 'nullable|string',
            'thumbnail' => 'nullable',
            'muscles_targeted' => 'nullable|string',
            'calories_burned' => 'nullable|integer',
            'instructions' => 'nullable|string',
            'difficulty' => 'nullable|integer',
            'rest_period' => 'nullable|integer',
            'tags' => 'nullable|string',
            // New validation rules for additional fields
            'visible_for' => 'nullable|string',
            'primary_muscle_groups' => 'nullable|array',
            'secondary_muscle_groups' => 'nullable|array',
            'primary_joint' => 'nullable|string',
            'uses_weights' => 'nullable|boolean',
            'intensity' => 'nullable|integer',
            'sets' => 'nullable|string',
            'rest_period_seconds' => 'nullable|integer',
            'qr_link' => 'nullable|string',
            'manufacturer' => 'nullable|string',
            'days_per_week' => 'nullable|string',
            'repeat' => 'nullable|string',
            'rest_seconds' => 'nullable|integer',
            'default_reps' => 'nullable|string',
            'enable_preset_weights' => 'nullable|boolean',
        ]);

        // Handle thumbnail upload if provided
        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail');
            $thumbnailName = time() . '_' . $thumbnail->getClientOriginalName();
            
            // Create directory if it doesn't exist
            $uploadPath = public_path('images/workout_thumbnails');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }
            
            // Move file to public/images/workout_thumbnails
            $thumbnail->move($uploadPath, $thumbnailName);
            $thumbnailPath = 'images/workout_thumbnails/' . $thumbnailName;
        } elseif ($request->thumbnail) {
            // If thumbnail is a path (default image or URL), store it as is
            $thumbnailPath = $request->thumbnail;
        } else {
            // Keep existing thumbnail if no new one provided
            $existingWorkout = Workout::find($id);
            if ($existingWorkout) {
                $thumbnailPath = $existingWorkout->thumbnail;
            }
        }

        // Prepare sets array for database
        $setsArray = [];
        if ($request->sets) {
            if (is_string($request->sets)) {
                $decodedSets = json_decode($request->sets, true);
                $setsArray = is_array($decodedSets) ? $decodedSets : [];
            } elseif (is_array($request->sets)) {
                $setsArray = $request->sets;
            }
        }

        // Prepare default_reps - always process if present in request
        $defaultReps = null;
        if ($request->has('default_reps') && $request->default_reps !== null && $request->default_reps !== '') {
            if (is_array($request->default_reps)) {
                $defaultReps = json_encode($request->default_reps);
            } elseif (is_string($request->default_reps)) {
                // Validate it's valid JSON
                $decoded = json_decode($request->default_reps, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $defaultReps = $request->default_reps;
                }
            }
        }

        // Build update array with only fields that exist and have values
        $updateData = [
            'exercise_name' => $request['exercise_name'],
            'category' => $request['category'],
            'duration' => $request['duration'],
            'level' => $request['level'],
            'description' => $request['description'],
            'equipment' => $request['equipment'],
            'thumbnail' => $thumbnailPath,
            'muscles_targeted' => $request['muscles_targeted'],
            'instructions' => $request['instructions'],
            'difficulty' => $request['difficulty'],
            'rest_period' => $request['rest_period'],
            'tags' => $request['tags'],
            'goal' => $request['goal'] ?? '',
            'sets' => $setsArray,
            'days_per_week' => $request['days_per_week'],
            'repeat' => $request['repeat'],
            'type' => $request['type'] ?? null,
        ];

        // Handle calories_burned - DB column is NOT NULL in production; default to 0 if empty
        if ($request->has('calories_burned')) {
            $updateData['calories_burned'] = ($request['calories_burned'] !== null && $request['calories_burned'] !== '')
                ? (int) $request['calories_burned']
                : 0;
        }

        // Add optional fields only if they exist in request
        if ($request->has('rest_seconds')) {
            $updateData['rest_seconds'] = ($request['rest_seconds'] !== null && $request['rest_seconds'] !== '') 
                ? (int) $request['rest_seconds'] 
                : null;
        }
        
        // Always include default_reps if it's in the request (even if all nulls)
        if ($request->has('default_reps')) {
            $updateData['default_reps'] = $defaultReps !== null ? $defaultReps : json_encode([null, null, null, null, null, null, null, null, null]);
        }
        
        // Always include enable_preset_weights if it's in the request
        if ($request->has('enable_preset_weights')) {
            $updateData['enable_preset_weights'] = (bool) $request['enable_preset_weights'];
        }

        $lastEditedBy = $this->getLastEditedBy($request);
        $updateData['last_edited_by_id'] = $lastEditedBy['id'];
        $updateData['last_edited_by_type'] = $lastEditedBy['type'];

        Workout::where('id', $id)->update($updateData);
        
        // Fetch the updated workout to return full data
        $updatedWorkout = Workout::find($id);
        
        return response()->json([
            'success' => true, 
            'id' => $id,
            'exercise' => [
                'id' => $updatedWorkout->id,
                'exercise_name' => $updatedWorkout->exercise_name,
                'category' => $updatedWorkout->category,
                'duration' => $updatedWorkout->duration,
                'level' => $updatedWorkout->level,
                'description' => $updatedWorkout->description,
                'equipment' => $updatedWorkout->equipment,
                'thumbnail' => $updatedWorkout->thumbnail,
                'muscles_targeted' => $updatedWorkout->muscles_targeted,
                'calories_burned' => $updatedWorkout->calories_burned,
                'instructions' => $updatedWorkout->instructions,
                'difficulty' => $updatedWorkout->difficulty,
                'rest_period' => $updatedWorkout->rest_period,
                'tags' => $updatedWorkout->tags,
                'goal' => $updatedWorkout->goal,
                'type' => $updatedWorkout->type,
                'days_per_week' => $updatedWorkout->days_per_week,
                'repeat' => $updatedWorkout->repeat,
                'rest_seconds' => $updatedWorkout->rest_seconds,
                'default_reps' => $updatedWorkout->default_reps,
                'enable_preset_weights' => $updatedWorkout->enable_preset_weights,
                'last_edited_by_type' => $updatedWorkout->last_edited_by_type,
            ]
        ]);
    }

    //------------- delete workout exercise -------------\\

    public function destroy(Request $request, $id)
    {
        // $this->authorizeForUser($request->user('api'), 'delete', Workout::class);
        $this->requireCoachOrAdmin($request);

        Workout::where('id', $id)->update([
            'deleted_at' => Carbon::now(),
        ]);
        return response()->json(['success' => true]);
    }

    //-------------- Delete by selection  ---------------\\

    public function delete_by_selection(Request $request)
    {
        // $this->authorizeForUser($request->user('api'), 'delete', Workout::class);
        $this->requireCoachOrAdmin($request);
        $selectedIds = $request->selectedIds;

        foreach ($selectedIds as $exercise_id) {
            Workout::where('id', $exercise_id)->update([
                'deleted_at' => Carbon::now(),
            ]);
        }
        return response()->json(['success' => true]);
    }

    //------------- get Number Order Exercise -------------\\

    // public function getNumberOrder()
    // {
    //     try {
    //         // Try to get the last exercise by exercise_id first
    //         $last = Workout::orderBy('id', 'desc')->first();
            
    //         if ($last) {
    //             $code = $last->exercise_id + 1;
    //         } else {
    //             // If no exercises exist, start with 1
    //             $code = 1;
    //         }
            
    //         return $code;
    //     } catch (\Exception $e) {
    //         // If there's an error with exercise_id, try using the primary key
    //         try {
    //             $last = Workout::orderBy('exercise_id', 'desc')->first();
                
    //             if ($last) {
    //                 $code = $last->exercise_id + 1;
    //             } else {
    //                 $code = 1;
    //             }
                
    //             return $code;
    //         } catch (\Exception $e2) {
    //             // If all else fails, return a timestamp-based ID
    //             return time();
    //         }
    //     }
    // }

    //------------- Get Exercises Without Paginate -------------\\

    public function Get_Exercises_Without_Paginate()
    {
        $exercises = Workout::where('deleted_at', '=', null)->get();
        return response()->json($exercises);
    }

    // import exercises
    public function import_exercises(Request $request)
    {
        $file_upload = $request->file('exercises');
        $ext = pathinfo($file_upload->getClientOriginalName(), PATHINFO_EXTENSION);
        if ($ext != 'csv') {
            return response()->json([
                'msg' => 'must be in csv format',
                'status' => false,
            ]);
        } else {
            $data = array();
            $rowcount = 0;
            if (($handle = fopen($file_upload, "r")) !== false) {
                $max_line_length = defined('MAX_LINE_LENGTH') ? MAX_LINE_LENGTH : 10000;
                $header = fgetcsv($handle, $max_line_length);
                $header_colcount = count($header);
                while (($row = fgetcsv($handle, $max_line_length)) !== false) {
                    $row_colcount = count($row);
                    if ($row_colcount == $header_colcount) {
                        $entry = array_combine($header, $row);
                        $data[] = $entry;
                    } else {
                        return null;
                    }
                    $rowcount++;
                }
                fclose($handle);
            } else {
                return null;
            }
           
            $rules = array('exercise_name' => 'required');

            //-- Create New Exercise
            foreach ($data as $key => $value) {
                $input['exercise_name'] = $value['exercise_name'];

                $validator = Validator::make($input, $rules);
                if (!$validator->fails()) {
                    
                    Workout::create([
                        'exercise_name' => $value['exercise_name'],
                        'category' => $value['category'] == '' ? null : $value['category'],
                        'duration' => $value['duration'] == '' ? null : $value['duration'],
                        'level' => $value['level'] == '' ? null : $value['level'],
                        'description' => $value['description'] == '' ? null : $value['description'],
                        'equipment' => $value['equipment'] == '' ? null : $value['equipment'],
                        'thumbnail' => $value['thumbnail'] == '' ? null : $value['thumbnail'],
                        'muscles_targeted' => $value['muscles_targeted'] == '' ? null : $value['muscles_targeted'],
                    ]);

                }
            }

            return response()->json([
                'status' => true,
            ], 200);
        }
    }

    //------------- Assign Workout to Member -------------\\
    public function assignWorkout(Request $request)
    {
        $this->requireCoachOrAdmin($request);
        $this->validate($request, [
            'workout_id' => 'required|exists:workouts,id',
            'member_id' => 'required|exists:members,id', // validate against members table
            'start_date' => 'nullable|date',
            'description' => 'nullable|string',
            'amount_of_weeks' => 'nullable|integer|min:1',
            'selected_days' => 'nullable|string',
            'goal' => 'nullable|string|max:255',
            'tag' => 'nullable|string|max:255'
        ]);

        $gymId = $request->user('api')->gym_id;
        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }

        // Get workout to retrieve thumbnail
        $workout = \App\Models\Workout::find($request->workout_id);
        $thumbnail = $workout->thumbnail ?? $workout->thumbnail_url ?? $workout->thumbnail_filename ?? null;

        $assignment = WorkoutAssignment::create([
            'workout_id' => $request->workout_id,
            'member_id' => $request->member_id,
            'gym_id' => $gymId,
            'start_date' => $request->start_date,
            'description' => $request->description,
            'assigned_by' => $request->user('api')->id,
            'thumbnail' => $thumbnail,
            'amount_of_weeks' => $request->amount_of_weeks,
            'selected_days' => $request->selected_days,
            'goal' => $request->goal,
            'tag' => $request->tag
        ]);

        // Create notifications for workout assignment
        $notificationStatus = true;
        $notificationError = null;
        $memberNotification = null;
        try {
            $member = \App\Models\Member::find($request->member_id);
            $workout = \App\Models\Workout::find($request->workout_id);
            
            // Get performedByUserId if current user is an admin
            $user = $request->user('api');
            $performedByUserId = null;
            if ($user && isset($user->role_id) && $user->role_id == 1) {
                $performedByUserId = $user->id;
            }
            
            if ($member && $workout) {
                $notificationResults = \App\Services\NotificationService::workoutAssigned($assignment, $member, $workout, $gymId, $performedByUserId);
                $memberNotification = $notificationResults['member'] ?? null;
                
                if ($memberNotification && !$memberNotification['success']) {
                    $notificationStatus = false;
                    $notificationError = 'member: ' . ($memberNotification['error'] ?? 'Notification failed');
                }
            } else {
                $notificationStatus = false;
                $notificationError = 'Notification not sent: member or workout not found.';
            }
        } catch (\Exception $e) {
            \Log::error('Failed to create workout assignment notifications: ' . $e->getMessage(), [
                'assignment_id' => $assignment->id,
                'trace' => $e->getTraceAsString()
            ]);
            $notificationStatus = false;
            $notificationError = 'Notification failed: ' . $e->getMessage();
        }

        return response()->json([
            'success' => true,
            'data' => [
                'assignment' => $assignment,
                'member_notification' => $memberNotification,
                'notification_status' => $notificationStatus,
                'notification_error' => $notificationError,
            ]
        ]);
    }

    // ------------- Get Member Assignments -------------\\
    public function getMemberAssignments(Request $request, $memberId)
    {
        $gymId = $request->user('api')->gym_id;
        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }

        $assignments = WorkoutAssignment::with(['workout', 'member', 'assignedBy'])
            ->where('gym_id', $gymId)
            ->where('member_id', $memberId)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($assignment) {
                // Ensure thumbnail is included from assignment or workout
                if (!$assignment->thumbnail && $assignment->workout) {
                    $assignment->thumbnail = $assignment->workout->thumbnail ?? 
                                             $assignment->workout->thumbnail_url ?? 
                                             $assignment->workout->thumbnail_filename ?? 
                                             null;
                }
                
                // Get completion data from workout_sessions
                try {
                    $workoutSessions = WorkoutSession::where('workout_id', $assignment->workout_id)
                        ->where('member_id', $assignment->member_id)
                        ->where('status', 'completed')
                        ->orderBy('completed_at', 'desc')
                        ->get();
                    
                    $assignment->completion_count = $workoutSessions->count();
                    $assignment->last_completed = $workoutSessions->first() ? $workoutSessions->first()->completed_at : null;
                } catch (\Exception $e) {
                    $assignment->completion_count = 0;
                    $assignment->last_completed = null;
                }
                
                return $assignment;
            });

        return response()->json([
            'success' => true,
            'assignments' => $assignments
        ]);
    }




    //------------- Delete Assignment -------------\\
    public function deleteAssignment(Request $request, $id)
    {
        $this->requireCoachOrAdmin($request);
        $assignment = WorkoutAssignment::where('id', $id)
            ->where('gym_id', $request->user('api')->gym_id)
            ->firstOrFail();

        $assignment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Assignment deleted successfully'
        ]);
    }
}
