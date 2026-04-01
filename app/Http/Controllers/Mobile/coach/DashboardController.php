<?php

namespace App\Http\Controllers\Mobile\coach;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\HandlesApiErrors;
use App\Http\Controllers\Traits\ApiResponse;
use App\Models\Appointment;
use App\Models\Coach;
use App\Models\CoachAssignment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Throwable;

class DashboardController extends Controller
{
    use HandlesApiErrors, ApiResponse;
    /**
     * Get dashboard data for coach app
     * This is specifically designed for coaches using the mobile app
     */
    public function dashboard_data(Request $request)
    {
        try {
            // Get authenticated user (works with both Passport and Mobile auth)
            $user_auth = auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
            
            if (!$user_auth) {
                return $this->errorResponse('Unauthorized', 401);
            }

            // Check if user is a coach
            if (($user_auth->role_id ?? null) != 3) {
                return $this->errorResponse('Access denied. Coach access only.', 403);
            }

            // Get period parameter (Today, Week, Month) - default to Today
            $period = $request->input('period', 'Today');
            
            // Get coach-specific stats based on period
            $coach_stats = $this->getCoachStatsByPeriod($user_auth, $period);
            
            // Return only camelCase keys (standard for mobile apps)
            // Always include averageRating and ratingsCount so the app can show
            // both the rating value and how many ratings it is based on.
            return $this->successResponse([
                'activeClients'   => $coach_stats['activeClients'],
                'sessionsToday'   => $coach_stats['sessionsToday'],
                'completionRate'  => $coach_stats['completionRate'],
                'averageRating'   => $coach_stats['averageRating'],
                'ratingsCount'    => $coach_stats['ratingsCount'],
                'period'          => $period,
            ], 'Dashboard data retrieved successfully');

        } catch (Throwable $e) {
            return $this->handleApiError($e, 'DashboardController@dashboard_data');
        }
    }

    /**
     * Get Coach Stats by Period
     * This method is specifically for coach app dashboard
     */
    private function getCoachStatsByPeriod($user_auth, $period = 'Today')
    {
        try {
            // Get coach record
            $coach = Coach::where('email', $user_auth->email)->first();
            if (!$coach) {
                return [
                    'activeClients' => 0,
                    'sessionsToday' => 0,
                    'completionRate' => 0,
                    'averageRating' => 0,
                    'ratingsCount'  => 0,
                ];
            }
            
            // Get assigned member IDs
            $assignedMemberIds = CoachAssignment::where('coach_id', $coach->id)
                ->where('status', 'active')
                ->pluck('member_id')
                ->toArray();
            
            $activeClients = count($assignedMemberIds);
            
            // Calculate date range based on period
            $startDate = null;
            $endDate = Carbon::now();
            
            switch (strtolower($period)) {
                case 'today':
                    $startDate = Carbon::today();
                    $endDate = Carbon::today()->endOfDay();
                    break;
                case 'week':
                    $startDate = Carbon::now()->startOfWeek();
                    $endDate = Carbon::now()->endOfWeek();
                    break;
                case 'month':
                    $startDate = Carbon::now()->startOfMonth();
                    $endDate = Carbon::now()->endOfMonth();
                    break;
                default:
                    $startDate = Carbon::today();
                    $endDate = Carbon::today()->endOfDay();
            }
            
            // Get appointments for the period (used for completion rate calculation)
            // Include both mobile and CRM appointments
            $appointmentsQuery = Appointment::whereIn('member_id', $assignedMemberIds)
                ->where('coach_id', $coach->id)
                ->where(function($query) {
                    // Show mobile-booked appointments (coach booked from mobile)
                    $query->where('source', 'mobile')
                          // OR CRM-assigned appointments (admin assigned to coach)
                          ->orWhere('source', 'crm')
                          // OR old appointments without source (backward compatibility)
                          ->orWhereNull('source');
                })
                ->whereBetween('date', [$startDate->toDateString(), $endDate->toDateString()]);
            
            $totalSessions = $appointmentsQuery->count();
            $completedSessions = (clone $appointmentsQuery)->where('status', 'completed')->count();
            
            // Debug logging (remove in production if not needed)
            \Log::info('Dashboard Stats Calculation', [
                'coach_id' => $coach->id,
                'period' => $period,
                'start_date' => $startDate->toDateString(),
                'end_date' => $endDate->toDateString(),
                'total_sessions' => $totalSessions,
                'completed_sessions' => $completedSessions,
                'completion_rate' => $totalSessions > 0 ? round(($completedSessions / $totalSessions) * 100, 2) : 0,
            ]);
            
            // Sessions Today: Always show today's sessions regardless of period filter
            $sessionsToday = Appointment::whereIn('member_id', $assignedMemberIds)
                ->where('coach_id', $coach->id)
                ->where(function($query) {
                    $query->where('source', 'mobile')
                          ->orWhere('source', 'crm')
                          ->orWhereNull('source');
                })
                ->whereDate('date', now()->toDateString())
                ->count();
            
            // Calculate completion rate based on selected period
            $completionRate = $totalSessions > 0 ? round(($completedSessions / $totalSessions) * 100, 2) : 0;
            
            // Get average rating and ratings count (if ratings exist in appointments)
            // NOTE: For coach dashboard we show the rating based on ALL rated appointments
            // for this coach (lifetime), not limited by the current period filter. This
            // ensures the coach always sees their true overall rating, even if there are
            // no ratings in the selected period (Today/Week/Month).
            $averageRating = 0;
            $ratingsCount  = 0;
            if (Schema::hasColumn('appointments', 'rating')) {
                $ratingsQuery = Appointment::whereIn('member_id', $assignedMemberIds)
                    ->where('coach_id', $coach->id)
                    ->whereNotNull('rating')
                    ->where('rating', '>', 0);

                $avgRating = $ratingsQuery->avg('rating');
                $averageRating = $avgRating ? round($avgRating, 1) : 0;

                // Count how many rated appointments this coach has (lifetime)
                $ratingsCount = $ratingsQuery->count();
            }
            
            return [
                'activeClients' => $activeClients,
                'sessionsToday' => $sessionsToday,
                'completionRate' => $completionRate,
                'averageRating' => $averageRating,
                'ratingsCount'  => $ratingsCount,
            ];
            
        } catch (\Exception $e) {
            \Log::error('Get coach stats by period error: ' . $e->getMessage());
            return [
                'activeClients' => 0,
                'sessionsToday' => 0,
                'completionRate' => 0,
                'averageRating' => 0,
                'ratingsCount'  => 0,
            ];
        }
    }
}
