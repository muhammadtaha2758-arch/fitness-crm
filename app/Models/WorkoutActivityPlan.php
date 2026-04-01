<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WorkoutActivityPlan extends Model
{
    use SoftDeletes;

    protected $table = 'workout_activity_plans';

    protected $fillable = [
        'plan_id',
        'workout_id',
        'day',
        'exercise_id',
        'exercise_name',
        'video_link',
        'thumbnail_url',
        'thumbnail_filename',
        'sets',
        'reps',
        'rest_seconds',
        'sets_configuration',
        'personal_note',
        'activity_intensity',
        'input_mode',
        'day_id',
        'gym_id',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    protected $casts = [
        'workout_id' => 'integer',
        'day' => 'string',
        'video_link' => 'string',
        'exercise_id' => 'integer',
        'exercise_name' => 'string',
        'thumbnail_url' => 'string',
        'thumbnail_filename' => 'string',
        'sets' => 'integer',
        'reps' => 'integer',
        'rest_seconds' => 'integer',
        'sets_configuration' => 'array',
        'personal_note' => 'string',
        'activity_intensity' => 'integer',
        'input_mode' => 'string',
        'day_id' => 'integer',
        'gym_id' => 'integer',
    ];

    /**
     * Get the workout day that owns this activity plan.
     */
    public function workoutDay()
    {
        return $this->belongsTo(WorkoutDay::class, 'day_id');
    }

    /**
     * Get the exercise for this activity plan.
     */
// WorkoutActivityPlan.php
public function exercise()
{
    // This must point to VideoCatalog, not WorkoutActivity
    return $this->belongsTo(VideoCatalog::class, 'exercise_id', 'id');
}

    /**
     * Get the workout through workout day.
     */
    public function workout()
    {
        return $this->hasOneThrough(
            Workout::class,
            WorkoutDay::class,
            'id', // Foreign key on workout_days table
            // 'exercise_id', // Foreign key on workouts table
            'workout_id', // Local key on workout_activity_plan table
            'workout_id' // Local key on workout_days table
        );
    }

    /**
     * Set exercise data from workout_activities table
     */
    public function setExerciseData($exerciseId)
    {
        $exercise = WorkoutActivity::where('exercise_id', $exerciseId)->first();
        
        if ($exercise) {
            $this->exercise_id = $exercise->exercise_id;
            $this->exercise_name = $exercise->exercise_name;
        }
        
        return $this;
    }

    /**
     * Get exercise data with fallback to stored values
     */
    // public function getExerciseData()
    // {
    //     // If this is a thumbnail-based exercise (no exercise_id)
    //     if (empty($this->exercise_id) && !empty($this->thumbnail_url)) {
    //         return [
    //             'exercise_id' => null,
    //             'exercise_name' => $this->exercise_name,
    //             'thumbnail' => $this->thumbnail_url,
    //             'thumbnail_filename' => $this->thumbnail_filename,
    //             'category' => null,
    //             'level' => null,
    //             'description' => null,
    //             'equipment' => null,
    //             'muscles_targeted' => null,
    //             'calories_burned' => null,
    //             'instructions' => null,
    //             'difficulty' => null,
    //             'rest_period' => null,
    //             'tags' => null,
    //             'video_link' => null,
    //         ];
    //     }
        
    //     // Regular exercise from workout_activities table
    //     if ($this->exercise) {
    //         return [
    //             'exercise_id' => $this->exercise->exercise_id,
    //             'exercise_name' => $this->exercise->exercise_name,
    //             'category' => $this->exercise->category,
    //             'level' => $this->exercise->level,
    //             'description' => $this->exercise->description,
    //             'equipment' => $this->exercise->equipment,
    //             'thumbnail' => $this->exercise->thumbnail,
    //             'muscles_targeted' => $this->exercise->muscles_targeted,
    //             'calories_burned' => $this->exercise->calories_burned,
    //             'instructions' => $this->exercise->instructions,
    //             'difficulty' => $this->exercise->difficulty,
    //             'rest_period' => $this->exercise->rest_period,
    //             'tags' => $this->exercise->tags,
    //             'video_link' => $this->exercise->video_link,
    //         ];
    //     }
        
    //     // Fallback to stored values if relationship fails
    //     return [
    //         'exercise_id' => $this->exercise_id,
    //         'exercise_name' => $this->exercise_name,
    //         'thumbnail' => $this->thumbnail_url,
    //         'thumbnail_filename' => $this->thumbnail_filename,
    //     ];
    // }

  
public function getExerciseData()
{
    // If this is a thumbnail-based exercise (no exercise_id)
    if (empty($this->exercise_id) && !empty($this->thumbnail_url)) {
        return [
            'exercise_id' => null,
            'exercise_name' => $this->exercise_name,
            'thumbnail' => $this->thumbnail_url,
            'thumbnail_filename' => $this->thumbnail_filename,
            'category' => null,
            'level' => null,
            'description' => null,
            'equipment' => null,
            'muscles_targeted' => null,
            'calories_burned' => null,
            'instructions' => null,
            'difficulty' => null,
            'rest_period' => $this->rest_seconds,
            'tags' => null,
            'video_link' => $this->video_link ?? null, // <-- fallback for video_link
        ];
    }

    // Regular exercise from workout_activities table
    if ($this->exercise) {
        return [
            'exercise_id' => $this->exercise->exercise_id,
            'exercise_name' => $this->exercise->exercise_name,
            'category' => $this->exercise->category,
            'level' => $this->exercise->level,
            'description' => $this->exercise->description,
            'equipment' => $this->exercise->equipment,
            'thumbnail' => $this->exercise->thumbnail,
            'muscles_targeted' => $this->exercise->muscles_targeted,
            'calories_burned' => $this->exercise->calories_burned,
            'instructions' => $this->exercise->instructions,
            'difficulty' => $this->exercise->difficulty,
            'rest_period' => $this->exercise->rest_period,
            'tags' => $this->exercise->tags,
            'video_link' => $this->exercise->video_link,
        ];
    }

    // Fallback to stored values if relationship fails
    return [
        'exercise_id' => $this->exercise_id,
        'exercise_name' => $this->exercise_name,
        'thumbnail' => $this->thumbnail_url,
        'thumbnail_filename' => $this->thumbnail_filename,
        'video_link' => $this->video_link ?? null, // <-- fallback here too
    ];
}


    /**
     * Create workout activity plan with exercise data from workout_activities table
     */
    public static function createWithExerciseData($data)
    {
        // Fetch exercise data from workout_activities table
        $exercise = WorkoutActivity::where('exercise_id', $data['exercise_id'])->first();
        
        if (!$exercise) {
            throw new \Exception("Exercise with ID {$data['exercise_id']} not found in workout_activities table");
        }
        
        // Merge exercise data with provided data
        $planData = array_merge($data, [
            'exercise_id' => $exercise->exercise_id,
            'exercise_name' => $exercise->exercise_name,
        ]);
        
        return self::create($planData);
    }

    /**
     * Bulk create workout activity plans with exercise data
     */
    public static function bulkCreateWithExerciseData($plansData)
    {
        $createdPlans = [];
        
        foreach ($plansData as $data) {
            $createdPlans[] = self::createWithExerciseData($data);
        }
        
        return $createdPlans;
    }

    /**
     * Validate that an exercise exists in workout_activities table
     */
    public static function validateExerciseExists($exerciseId)
    {
        return WorkoutActivity::where('exercise_id', $exerciseId)
            ->whereNull('deleted_at')
            ->exists();
    }

  



    /**
     * Get available exercises from workout_activities table
     */
    public static function getAvailableExercises()
    {
        return WorkoutActivity::whereNull('deleted_at')
            ->select('exercise_id', 'exercise_name', 'category', 'level', 'description')
            ->orderBy('exercise_name')
            ->get();
    }
} 