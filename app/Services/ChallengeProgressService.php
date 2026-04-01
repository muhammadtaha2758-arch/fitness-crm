<?php

namespace App\Services;

use App\Models\Challenge;
use App\Models\ChallengeParticipant;
use App\Models\WorkoutDaySession;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ChallengeProgressService
{
    /**
     * Update challenge progress when a member completes a workout
     * 
     * @param int $memberId
     * @param int $workoutId
     * @param Carbon|null $completionDate
     * @return void
     */
    public function updateProgressAfterWorkout($memberId, $workoutId = null, $completionDate = null)
    {
        try {
            $completionDate = $completionDate ?? Carbon::now();
            
            // Get all active workout-based challenges for this member
            $participations = ChallengeParticipant::with('challenge')
                ->where('member_id', $memberId)
                ->whereHas('challenge', function ($query) use ($completionDate) {
                    $query->where('challenge_type', 'workout_based')
                          ->where('status', 'Active')
                          ->where('start_date', '<=', $completionDate)
                          ->where('end_date', '>=', $completionDate);
                })
                ->get();

            foreach ($participations as $participation) {
                $challenge = $participation->challenge;
                
                if (!$challenge->required_workouts) {
                        Log::warning("Challenge missing required_workouts", [
                        'challenge_id' => $challenge->id,
                        'challenge_type' => $challenge->challenge_type
                    ]);
                    continue; // Skip if required_workouts is not set
                }

                // Count completed workouts within challenge period
                $completedWorkouts = $this->countCompletedWorkouts(
                    $memberId,
                    $challenge->start_date,
                    $challenge->end_date
                );

                // Calculate progress percentage
                // Ensure we don't divide by zero and cap at 100%
                if ($challenge->required_workouts > 0) {
                    $progress = min(100, ($completedWorkouts / $challenge->required_workouts) * 100);
                } else {
                    $progress = 0;
                }

                // Update participation record
                $oldProgress = $participation->progress;
                $oldStatus = $participation->status;
                
                $participation->progress = round($progress, 2);
                $participation->last_activity = $completionDate;

                // Update status to "Completed" ONLY if progress reaches exactly 100% or more
                // Use >= 100 to handle edge cases, but log if it's over 100%
                if ($progress >= 100) {
                    if ($progress > 100) {
                        Log::warning("Progress exceeded 100%", [
                            'challenge_id' => $challenge->id,
                            'member_id' => $memberId,
                            'completed_workouts' => $completedWorkouts,
                            'required_workouts' => $challenge->required_workouts,
                            'progress' => $progress
                        ]);
                    }
                    if ($participation->status !== 'Completed') {
                        $participation->status = 'Completed';
                    }
                }

                $participation->save();

                Log::info("Challenge progress updated", [
                    'challenge_id' => $challenge->id,
                    'challenge_name' => $challenge->name,
                    'member_id' => $memberId,
                    'completed_workouts' => $completedWorkouts,
                    'required_workouts' => $challenge->required_workouts,
                    'progress_before' => $oldProgress,
                    'progress_after' => $progress,
                    'status_before' => $oldStatus,
                    'status_after' => $participation->status,
                    'calculation' => "({$completedWorkouts} / {$challenge->required_workouts}) * 100 = {$progress}%"
                ]);
            }
        } catch (\Exception $e) {
            Log::error("Error updating challenge progress", [
                'member_id' => $memberId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }

    /**
     * Count completed workouts for a member within a date range
     * 
     * @param int $memberId
     * @param string|Carbon $startDate
     * @param string|Carbon $endDate
     * @return int
     */
    public function countCompletedWorkouts($memberId, $startDate, $endDate)
    {
        $startDate = Carbon::parse($startDate);
        $endDate = Carbon::parse($endDate);

        // Count unique completed workout days within the challenge period
        // Each completed day session counts as one workout
        // We need to count distinct combinations of workout_session_id and day_number
        // Using raw SQL with DISTINCT for accurate counting
        $result = DB::selectOne(
            "SELECT COUNT(DISTINCT CONCAT(wds.workout_session_id, '-', wds.day_number)) as count
             FROM workout_day_sessions wds
             INNER JOIN workout_sessions ws ON wds.workout_session_id = ws.id
             WHERE ws.member_id = ?
             AND wds.status = 'completed'
             AND wds.completed_at IS NOT NULL
             AND wds.completed_at BETWEEN ? AND ?",
            [$memberId, $startDate, $endDate]
        );

        $count = $result ? (int)$result->count : 0;

        Log::info("Counted completed workouts", [
            'member_id' => $memberId,
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'count' => $count
        ]);

        return $count;
    }

    /**
     * Get challenge progress details including workout counts
     * 
     * @param ChallengeParticipant $participation
     * @return array
     */
    public function getProgressDetails($participation)
    {
        $challenge = $participation->challenge;
        
        if ($challenge->challenge_type !== 'workout_based' || !$challenge->required_workouts) {
            return [
                'progress' => $participation->progress ?? 0,
                'completed_workouts' => null,
                'required_workouts' => null,
                'display_text' => $participation->progress . '%'
            ];
        }

        $completedWorkouts = $this->countCompletedWorkouts(
            $participation->member_id,
            $challenge->start_date,
            $challenge->end_date
        );

        return [
            'progress' => $participation->progress ?? 0,
            'completed_workouts' => $completedWorkouts,
            'required_workouts' => $challenge->required_workouts,
            'display_text' => "{$completedWorkouts}/{$challenge->required_workouts} workouts completed (" . round($participation->progress ?? 0) . "%)"
        ];
    }

    /**
     * Recalculate progress for a specific challenge participation
     * Useful for fixing incorrect progress data
     * 
     * @param int $participationId
     * @return array
     */
    public function recalculateProgress($participationId)
    {
        try {
            $participation = ChallengeParticipant::with('challenge')->findOrFail($participationId);
            $challenge = $participation->challenge;
            
            if (!$challenge || $challenge->challenge_type !== 'workout_based' || !$challenge->required_workouts) {
                return [
                    'success' => false,
                    'message' => 'Challenge is not workout-based or missing required_workouts'
                ];
            }

            // Count completed workouts
            $completedWorkouts = $this->countCompletedWorkouts(
                $participation->member_id,
                $challenge->start_date,
                $challenge->end_date
            );

            // Calculate progress
            $progress = $challenge->required_workouts > 0 
                ? min(100, ($completedWorkouts / $challenge->required_workouts) * 100)
                : 0;

            // Update participation
            $participation->progress = round($progress, 2);
            
            if ($progress >= 100 && $participation->status !== 'Completed') {
                $participation->status = 'Completed';
            } elseif ($progress < 100 && $participation->status === 'Completed') {
                // If progress dropped below 100%, revert status
                $participation->status = 'Enrolled';
            }

            $participation->save();

            Log::info("Progress recalculated", [
                'participation_id' => $participationId,
                'challenge_id' => $challenge->id,
                'member_id' => $participation->member_id,
                'completed_workouts' => $completedWorkouts,
                'required_workouts' => $challenge->required_workouts,
                'progress' => $progress,
                'status' => $participation->status
            ]);

            return [
                'success' => true,
                'completed_workouts' => $completedWorkouts,
                'required_workouts' => $challenge->required_workouts,
                'progress' => $progress,
                'status' => $participation->status
            ];
        } catch (\Exception $e) {
            Log::error("Error recalculating progress", [
                'participation_id' => $participationId,
                'error' => $e->getMessage()
            ]);
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }
}
