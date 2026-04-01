<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;
use App\Models\Appointment;
use App\Models\Invoice;
use App\Models\Challenge;
use App\Models\Workout;
use App\Models\WorkoutAssignment;
use App\Models\WorkoutSession;
use App\Models\CheckIn;
use App\Models\Coach;
use App\Models\SubscriptionPlan;
use App\Models\MemberMembershipAssignment;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DashboardController extends Controller
{
    /**
     * Get dashboard statistics
     */
    public function stats(Request $request)
    {
        try {
            $period = $request->get('period', 'month'); // today, week, month, year
            
            // Calculate date ranges
            $dateRanges = $this->getDateRanges($period);
            $gym_id = $request->user('api')->gym_id;
            // Total Active Members
            $totalActiveMembers = Member::where('Statuses', 'active')
                ->whereNull('deleted_at')
                ->where('gym_id', $gym_id)
                ->count();
            
            // New Members This Month
            $newMembersThisMonth = Member::whereMonth('created_at', Carbon::now()->month)
                ->whereYear('created_at', Carbon::now()->year)
                ->whereNull('deleted_at')
                ->where('gym_id', $gym_id)
                ->count();
            
            // Today's Appointments
            $todayAppointments = Appointment::whereDate('date', Carbon::today())
                ->where('gym_id', $gym_id)
                ->count();
            
            // This Week's Appointments
            $weekAppointments = Appointment::whereBetween('date', [
                Carbon::now()->startOfWeek(),
                Carbon::now()->endOfWeek()
            ])->where('gym_id', $gym_id)->count();
            
            // This Month's Appointments
            $monthAppointments = Appointment::whereMonth('date', Carbon::now()->month)
                ->whereYear('date', Carbon::now()->year)
                ->where('gym_id', $gym_id)
                ->count();
            
            // Monthly Revenue
            // Handle NULL paid_date by using created_at as fallback
            $monthStart = Carbon::now()->startOfMonth();
            $monthEnd = Carbon::now()->endOfMonth();
            
            // Get revenue from invoices with paid_date in current month
            $revenueWithPaidDate = Invoice::where('status', 'paid')
                ->where('gym_id', $gym_id)
                ->whereNotNull('paid_date')
                ->whereBetween('paid_date', [$monthStart, $monthEnd])
                ->sum('amount');
            
            // Get revenue from invoices with NULL paid_date but created in current month
            $revenueWithCreatedDate = Invoice::where('status', 'paid')
                ->where('gym_id', $gym_id)
                ->whereNull('paid_date')
                ->whereBetween('created_at', [$monthStart, $monthEnd])
                ->sum('amount');
            
            $monthlyRevenue = $revenueWithPaidDate + $revenueWithCreatedDate;
            
            // Debug logging (remove after testing)
            $allStatuses = Invoice::select('status', DB::raw('count(*) as count'))
                ->where('gym_id', $gym_id)
                ->groupBy('status')
                ->pluck('count', 'status')
                ->toArray();
            
            \Log::info('Monthly Revenue Calculation', [
                'month_start' => $monthStart->toDateString(),
                'month_end' => $monthEnd->toDateString(),
                'revenue_with_paid_date' => $revenueWithPaidDate,
                'revenue_with_created_date' => $revenueWithCreatedDate,
                'total_monthly_revenue' => $monthlyRevenue,
                'total_paid_invoices' => Invoice::where('status', 'paid')->where('gym_id', $gym_id)->count(),
                'all_invoice_statuses' => $allStatuses,
                'paid_invoices_this_month_with_date' => Invoice::where('status', 'paid')
                    ->where('gym_id', $gym_id)
                    ->whereNotNull('paid_date')
                    ->whereBetween('paid_date', [$monthStart, $monthEnd])
                    ->count(),
                'paid_invoices_this_month_without_date' => Invoice::where('status', 'paid')
                    ->where('gym_id', $gym_id)
                    ->whereNull('paid_date')
                    ->whereBetween('created_at', [$monthStart, $monthEnd])
                    ->count(),
                'sample_paid_invoice' => Invoice::where('status', 'paid')->where('gym_id', $gym_id)->first(),
            ]);
            
            // Total Revenue
            $totalRevenue = Invoice::where('status', 'paid')
                ->where('gym_id', $gym_id)
                ->sum('amount');
            
            // Active Challenges
            $activeChallenges = Challenge::where('status', 'active')
                ->where('gym_id', $gym_id)
                ->count();
            
            // Workout Completion Rate (last 30 days)
            $workoutSessions = WorkoutSession::whereHas('member', function($query) use ($gym_id) {
                    $query->where('gym_id', $gym_id)->whereNull('deleted_at');
                })
                ->where('created_at', '>=', Carbon::now()->subDays(30))
                ->count();
            $completedWorkouts = WorkoutSession::whereHas('member', function($query) use ($gym_id) {
                    $query->where('gym_id', $gym_id)->whereNull('deleted_at');
                })
                ->where('created_at', '>=', Carbon::now()->subDays(30))
                ->where('status', 'completed')
                ->count();
            $completionRate = $workoutSessions > 0 
                ? round(($completedWorkouts / $workoutSessions) * 100, 1) 
                : 0;
            
            // Check-ins Today (both members and visitors)
            $checkInsToday = CheckIn::whereDate('created_at', Carbon::today())
                ->where('gym_id', $gym_id)
                ->count();
            
            // Pending Invoices
            $pendingInvoices = Invoice::where('status', 'pending')
                ->where('gym_id', $gym_id)
                ->count();
            
            // Upcoming Appointments (next 7 days)
            $upcomingAppointments = Appointment::with(['member', 'coach'])
            ->where('gym_id', $gym_id)
            ->whereBetween('date', [
                Carbon::today(),
                Carbon::today()->addDays(7)
            ])
            ->where('status', '!=', 'cancelled')
            ->orderBy('date', 'asc')
            ->orderBy('start_time', 'asc')
            ->limit(10)
            ->get()
            ->map(function ($appointment) {
                $coachName = 'Unassigned';
                if ($appointment->coach) {
                    if ($appointment->coach->first_name || $appointment->coach->last_name) {
                        $coachName = trim(($appointment->coach->first_name ?? '') . ' ' . ($appointment->coach->last_name ?? ''));
                    } elseif ($appointment->coach->name) {
                        $coachName = $appointment->coach->name;
                    }
                }
                
                return [
                    'id' => $appointment->id,
                    'member_name' => $appointment->member ? $appointment->member->membername : 'Unknown',
                    'coach_name' => $coachName,
                    'date' => $appointment->date ? $appointment->date->format('Y-m-d') : null,
                    'time' => $appointment->start_time,
                    'status' => $appointment->status,
                ];
            });
            
            // Recent Activity (last 10 activities)
            $recentActivities = $this->getRecentActivities($gym_id);
            
            // Members by Status
            $membersByStatus = [
                'active' => Member::where('Statuses', 'active')->whereNull('deleted_at')->where('gym_id', $gym_id)->count(),
                'inactive' => Member::where('Statuses', 'inactive')->whereNull('deleted_at')->where('gym_id', $gym_id)->count(),
                'pending' => Member::where('Statuses', 'pending')->whereNull('deleted_at')->where('gym_id', $gym_id)->count(),
            ];
            
            // Appointments by Status
            $appointmentsByStatus = [
                'scheduled' => Appointment::where('status', 'scheduled')->where('gym_id', $gym_id)->count(),
                'completed' => Appointment::where('status', 'completed')->where('gym_id', $gym_id)->count(),
                'cancelled' => Appointment::where('status', 'cancelled')->where('gym_id', $gym_id)->count(),
            ];
            
            return response()->json([
                'success' => true,
                'data' => [
                    'kpis' => [
                        'total_active_members' => $totalActiveMembers,
                        'new_members_this_month' => $newMembersThisMonth,
                        'today_appointments' => $todayAppointments,
                        'monthly_revenue' => round($monthlyRevenue, 2),
                        'active_challenges' => $activeChallenges,
                        'completion_rate' => $completionRate,
                        'check_ins_today' => $checkInsToday,
                        'pending_invoices' => $pendingInvoices,
                    ],
                    'appointments' => [
                        'today' => $todayAppointments,
                        'this_week' => $weekAppointments,
                        'this_month' => $monthAppointments,
                    ],
                    'members_by_status' => $membersByStatus,
                    'appointments_by_status' => $appointmentsByStatus,
                    'upcoming_appointments' => $upcomingAppointments,
                    'recent_activities' => $recentActivities,
                ]
            ], 200);
            
        } catch (\Exception $e) {
            \Log::error('Dashboard stats error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching dashboard statistics: ' . $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Get revenue trend data
     */
    public function revenueTrend(Request $request)
    {
        try {
            $months = $request->get('months', 12);
            
            $revenueData = [];
            $labels = [];
            $gym_id = $request->user('api')->gym_id;
            for ($i = $months - 1; $i >= 0; $i--) {
                $date = Carbon::now()->subMonths($i);
                $monthStart = $date->copy()->startOfMonth();
                $monthEnd = $date->copy()->endOfMonth();
                
                // Handle NULL paid_date by using created_at as fallback
                // Get revenue from invoices with paid_date in this month
                $revenueWithPaidDate = Invoice::where('status', 'paid')
                    ->where('gym_id', $gym_id)
                    ->whereNotNull('paid_date')
                    ->whereBetween('paid_date', [$monthStart, $monthEnd])
                    ->sum('amount');
                
                // Get revenue from invoices with NULL paid_date but created in this month
                $revenueWithCreatedDate = Invoice::where('status', 'paid')
                    ->where('gym_id', $gym_id)
                    ->whereNull('paid_date')
                    ->whereBetween('created_at', [$monthStart, $monthEnd])
                    ->sum('amount');
                
                $revenue = $revenueWithPaidDate + $revenueWithCreatedDate;
                
                $revenueData[] = round($revenue, 2);
                $labels[] = $date->format('M Y');
            }
            
            return response()->json([
                'success' => true,
                'data' => [
                    'labels' => $labels,
                    'revenue' => $revenueData,
                ]
            ], 200);
            
        } catch (\Exception $e) {
            \Log::error('Revenue trend error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching revenue trend: ' . $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Get member growth data
     */
    public function memberGrowth(Request $request)

    {
        try {
            $months = $request->get('months', 12);
            $gym_id = $request->user('api')->gym_id;
            $growthData = [];
            $labels = [];
            
            for ($i = $months - 1; $i >= 0; $i--) {
                $date = Carbon::now()->subMonths($i);
                $monthStart = $date->copy()->startOfMonth();
                $monthEnd = $date->copy()->endOfMonth();
                
                $newMembers = Member::whereBetween('created_at', [$monthStart, $monthEnd])
                    ->where('gym_id', $gym_id)
                    ->whereNull('deleted_at')
                    ->count();
                
                $activeMembers = Member::where('Statuses', 'active')
                    ->where('created_at', '<=', $monthEnd)
                    ->where('gym_id', $gym_id)
                    ->whereNull('deleted_at')
                    ->count();
                
                $growthData[] = [
                    'new' => $newMembers,
                    'active' => $activeMembers,
                ];
                $labels[] = $date->format('M Y');
            }
            
            return response()->json([
                'success' => true,
                'data' => [
                    'labels' => $labels,
                    'growth' => $growthData,
                ]
            ], 200);
            
        } catch (\Exception $e) {
            \Log::error('Member growth error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching member growth: ' . $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Get top performing coaches
     */
    public function topCoaches(Request $request)
    {
        try {
            $limit = $request->get('limit', 5);
            $gym_id = $request->user('api')->gym_id;
            
            // Check if rating column exists in appointments table
            $hasRatingColumn = Schema::hasColumn('appointments', 'rating');
            
            // Get coaches with completed appointments in last 30 days
            // Use a subquery approach to avoid GROUP BY issues
            $query = DB::table('coaches')
                ->select('coaches.id', 'coaches.first_name', 'coaches.last_name')
                ->selectRaw('COUNT(appointments.id) as total_appointments');
            
            // Only include rating calculation if the column exists
            if ($hasRatingColumn) {
                // average_rating: mean of all non-null ratings for this coach
                // ratings_count: how many rated appointments (> 0) for this coach
                $query->selectRaw('COALESCE(AVG(appointments.rating), 0) as average_rating')
                      ->selectRaw('SUM(CASE WHEN appointments.rating IS NOT NULL AND appointments.rating > 0 THEN 1 ELSE 0 END) as ratings_count');
            } else {
                $query->selectRaw('0 as average_rating')
                      ->selectRaw('0 as ratings_count');
            }
            
            $topCoaches = $query
                ->leftJoin('appointments', function($join) use ($gym_id) {
                    $join->on('coaches.id', '=', 'appointments.coach_id')
                         ->where('appointments.status', '=', 'completed')
                         ->where('appointments.gym_id', '=', $gym_id)
                         ->where('appointments.created_at', '>=', Carbon::now()->subDays(30));
                })
                ->groupBy('coaches.id', 'coaches.first_name', 'coaches.last_name')
                ->havingRaw('COUNT(appointments.id) > 0')
                ->orderBy('total_appointments', 'desc');
            
            // Only order by rating if the column exists
            if ($hasRatingColumn) {
                $topCoaches->orderBy('average_rating', 'desc');
            }
            
            $topCoaches = $topCoaches
                ->limit($limit)
                ->get()
                ->map(function ($coach) {
                    $coachName = 'Unknown';
                    if ($coach->first_name || $coach->last_name) {
                        $coachName = trim(($coach->first_name ?? '') . ' ' . ($coach->last_name ?? ''));
                    } elseif ($coach->name) {
                        $coachName = $coach->name;
                    }
                    
                    return [
                        'id' => $coach->id,
                        'name' => $coachName,
                        'total_appointments' => $coach->total_appointments ?? 0,
                        'average_rating' => round($coach->average_rating ?? 0, 1),
                        // How many ratings this average is based on (aligns with coach app semantics)
                        'ratings_count' => (int) ($coach->ratings_count ?? 0),
                    ];
                });
            
            return response()->json([
                'success' => true,
                'data' => $topCoaches
            ], 200);
            
        } catch (\Exception $e) {
            \Log::error('Top coaches error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching top coaches: ' . $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Get alerts and notifications
     */
    public function alerts(Request $request)
    {
        try {
            $gym_id = $request->user('api')->gym_id;
            $alerts = [];
            
            // Expiring memberships (next 7 days)
            $expiringMemberships = Member::whereBetween('end_date', [
                Carbon::today(),
                Carbon::today()->addDays(7)
            ])
            ->where('Statuses', 'active')
            ->whereNull('deleted_at')
            ->where('gym_id', $gym_id)
            ->count();
            
            if ($expiringMemberships > 0) {
                $alerts[] = [
                    'type' => 'warning',
                    'icon' => 'fa-exclamation-triangle',
                    'title' => 'Expiring Memberships',
                    'message' => "{$expiringMemberships} membership(s) expiring in the next 7 days",
                    'count' => $expiringMemberships,
                ];
            }
            
            // Pending payments
            $pendingPayments = Invoice::where('status', 'pending')
                ->where('gym_id', $gym_id)
                ->where('due_date', '<=', Carbon::today()->addDays(7))
                ->count();
            
            if ($pendingPayments > 0) {
                $alerts[] = [
                    'type' => 'danger',
                    'icon' => 'fa-credit-card',
                    'title' => 'Pending Payments',
                    'message' => "{$pendingPayments} invoice(s) pending payment",
                    'count' => $pendingPayments,
                ];
            }
            
            // Upcoming appointments today
            $todayAppointments = Appointment::whereDate('date', Carbon::today())
                ->where('status', 'scheduled')
                ->where('gym_id', $gym_id)
                ->count();
            
            if ($todayAppointments > 0) {
                $alerts[] = [
                    'type' => 'info',
                    'icon' => 'fa-calendar-alt',
                    'title' => 'Today\'s Appointments',
                    'message' => "{$todayAppointments} appointment(s) scheduled for today",
                    'count' => $todayAppointments,
                ];
            }
            
            return response()->json([
                'success' => true,
                'data' => $alerts
            ], 200);
            
        } catch (\Exception $e) {
            \Log::error('Alerts error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching alerts: ' . $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Helper: Get date ranges based on period
     */
    private function getDateRanges($period)
    {
        switch (strtolower($period)) {
            case 'today':
                return [
                    'start' => Carbon::today(),
                    'end' => Carbon::today()->endOfDay(),
                ];
            case 'week':
                return [
                    'start' => Carbon::now()->startOfWeek(),
                    'end' => Carbon::now()->endOfWeek(),
                ];
            case 'month':
                return [
                    'start' => Carbon::now()->startOfMonth(),
                    'end' => Carbon::now()->endOfMonth(),
                ];
            case 'year':
                return [
                    'start' => Carbon::now()->startOfYear(),
                    'end' => Carbon::now()->endOfYear(),
                ];
            default:
                return [
                    'start' => Carbon::now()->startOfMonth(),
                    'end' => Carbon::now()->endOfMonth(),
                ];
        }
    }
    
    /**
     * Helper: Get recent activities
     */
    private function getRecentActivities($gym_id)
    {
        $activities = [];
        
        // Recent member registrations
        $recentMembers = Member::where('created_at', '>=', Carbon::now()->subDays(7))
            ->whereNull('deleted_at')
            ->where('gym_id', $gym_id)
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
        
        foreach ($recentMembers as $member) {
            $activities[] = [
                'type' => 'member_registered',
                'icon' => 'fa-user-plus',
                'title' => 'New Member Registered',
                'message' => "{$member->membername} joined",
                'time' => $member->created_at->diffForHumans(),
                'date' => $member->created_at->format('Y-m-d H:i:s'),
            ];
        }
        
        // Recent check-ins (both members and visitors)
        $recentCheckIns = CheckIn::where('created_at', '>=', Carbon::now()->subDays(7))
            ->where('gym_id', $gym_id)
            ->with('member')
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get();
        
        foreach ($recentCheckIns as $checkIn) {
            if ($checkIn->member) {
                // Member check-in
                $activities[] = [
                    'type' => 'check_in',
                    'icon' => 'fa-sign-in-alt',
                    'title' => 'Member Check-in',
                    'message' => "{$checkIn->member->membername} checked in",
                    'time' => $checkIn->created_at->diffForHumans(),
                    'date' => $checkIn->created_at->format('Y-m-d H:i:s'),
                ];
            } elseif ($checkIn->visitor_name) {
                // Visitor check-in
                $activities[] = [
                    'type' => 'visitor_check_in',
                    'icon' => 'fa-user-tag',
                    'title' => 'Visitor Check-in',
                    'message' => "{$checkIn->visitor_name} checked in",
                    'time' => $checkIn->created_at->diffForHumans(),
                    'date' => $checkIn->created_at->format('Y-m-d H:i:s'),
                ];
            }
        }
        
        // Recent completed appointments
        $recentAppointments = Appointment::where('status', 'completed')
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->where('gym_id', $gym_id)
            ->with('member')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
        
        foreach ($recentAppointments as $appointment) {
            if ($appointment->member) {
                $activities[] = [
                    'type' => 'appointment_completed',
                    'icon' => 'fa-check-circle',
                    'title' => 'Appointment Completed',
                    'message' => "Session with {$appointment->member->membername} completed",
                    'time' => $appointment->created_at->diffForHumans(),
                    'date' => $appointment->created_at->format('Y-m-d H:i:s'),
                ];
            }
        }
        
        // Sort by date and limit to 10
        usort($activities, function ($a, $b) {
            return strtotime($b['date']) - strtotime($a['date']);
        });
        
        return array_slice($activities, 0, 10);
    }
    
    /**
     * Get active memberships trend data
     */
    public function activeMembershipsTrend(Request $request)
    {
        try {
            $months = $request->get('months', 13);
            $gym_id = $request->user('api')->gym_id;
            
            $membershipData = [];
            $labels = [];
            
            for ($i = $months - 1; $i >= 0; $i--) {
                $date = Carbon::now()->subMonths($i);
                $monthStart = $date->copy()->startOfMonth();
                $monthEnd = $date->copy()->endOfMonth();
                $firstOfMonth = $date->copy()->startOfMonth();
                
                // Count active memberships on the 1st of that month
                // Active membership = MemberMembershipAssignment with status='active' 
                // and end_date is null or >= first of month
                $activeMemberships = MemberMembershipAssignment::where('gym_id', $gym_id)
                    ->where('status', 'active')
                    ->where(function($query) use ($firstOfMonth) {
                        $query->whereNull('end_date')
                              ->orWhere('end_date', '>=', $firstOfMonth->toDateString());
                    })
                    ->where('start_date', '<=', $firstOfMonth->toDateString())
                    ->whereNull('deleted_at')
                    ->count();
                
                $membershipData[] = $activeMemberships;
                $labels[] = $date->format('Y-M');
            }
            
            return response()->json([
                'success' => true,
                'data' => [
                    'labels' => $labels,
                    'memberships' => $membershipData,
                ]
            ], 200);
            
        } catch (\Exception $e) {
            \Log::error('Active memberships trend error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching active memberships trend: ' . $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Get client status breakdown
     */
    public function clientStatus(Request $request)
    {
        try {
            $gym_id = $request->user('api')->gym_id;
            $today = Carbon::today();
            
            // Get all members (not deleted)
            $allMembers = Member::where('gym_id', $gym_id)
                ->whereNull('deleted_at')
                ->get();
            
            $activeMemberships = 0;
            $noMemberships = 0;
            $upcomingMemberships = 0;
            $pausedMemberships = 0;
            
            foreach ($allMembers as $member) {
                // Check if member has active membership assignment
                $hasActiveAssignment = MemberMembershipAssignment::where('member_id', $member->id)
                    ->where('gym_id', $gym_id)
                    ->where('status', 'active')
                    ->where(function($query) use ($today) {
                        $query->whereNull('end_date')
                              ->orWhere('end_date', '>=', $today->toDateString());
                    })
                    ->where('start_date', '<=', $today->toDateString())
                    ->whereNull('deleted_at')
                    ->exists();
                
                // Check member's Expires field
                $hasValidExpires = $member->Expires && Carbon::parse($member->Expires)->isFuture();
                $expiresInFuture = $member->Expires && Carbon::parse($member->Expires)->isFuture();
                $expiresTodayOrPast = $member->Expires && Carbon::parse($member->Expires)->lte($today);
                
                // Check if member status is paused
                $isPaused = in_array(strtolower($member->Statuses ?? ''), ['paused', 'inactive']);
                
                if ($hasActiveAssignment || ($hasValidExpires && $member->Statuses === 'active')) {
                    $activeMemberships++;
                } elseif ($isPaused) {
                    $pausedMemberships++;
                } elseif ($expiresInFuture && !$hasActiveAssignment && $member->Statuses !== 'active') {
                    $upcomingMemberships++;
                } else {
                    $noMemberships++;
                }
            }
            
            $total = $allMembers->count();
            
            return response()->json([
                'success' => true,
                'data' => [
                    'active_memberships' => [
                        'count' => $activeMemberships,
                        'percentage' => $total > 0 ? round(($activeMemberships / $total) * 100, 2) : 0
                    ],
                    'no_memberships' => [
                        'count' => $noMemberships,
                        'percentage' => $total > 0 ? round(($noMemberships / $total) * 100, 2) : 0
                    ],
                    'upcoming_memberships' => [
                        'count' => $upcomingMemberships,
                        'percentage' => $total > 0 ? round(($upcomingMemberships / $total) * 100, 2) : 0
                    ],
                    'paused_memberships' => [
                        'count' => $pausedMemberships,
                        'percentage' => $total > 0 ? round(($pausedMemberships / $total) * 100, 2) : 0
                    ],
                    'total' => $total
                ]
            ], 200);
            
        } catch (\Exception $e) {
            \Log::error('Client status error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching client status: ' . $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Get active clients data (total clients vs unique clients with active membership)
     */
    public function activeClientsTrend(Request $request)
    {
        try {
            $months = $request->get('months', 13);
            $gym_id = $request->user('api')->gym_id;
            
            $totalClientsData = [];
            $activeMembershipClientsData = [];
            $labels = [];
            
            for ($i = $months - 1; $i >= 0; $i--) {
                $date = Carbon::now()->subMonths($i);
                $firstOfMonth = $date->copy()->startOfMonth();
                
                // Total clients (all members not deleted, created before or on 1st of month)
                $totalClients = Member::where('gym_id', $gym_id)
                    ->whereNull('deleted_at')
                    ->where('created_at', '<=', $firstOfMonth->endOfDay())
                    ->count();
                
                // Unique clients with active membership on 1st of month
                $activeMembershipClients = Member::where('gym_id', $gym_id)
                    ->whereNull('deleted_at')
                    ->where('created_at', '<=', $firstOfMonth->endOfDay())
                    ->whereHas('membershipAssignments', function($query) use ($firstOfMonth, $gym_id) {
                        $query->where('gym_id', $gym_id)
                              ->where('status', 'active')
                              ->where(function($q) use ($firstOfMonth) {
                                  $q->whereNull('end_date')
                                    ->orWhere('end_date', '>=', $firstOfMonth->toDateString());
                              })
                              ->where('start_date', '<=', $firstOfMonth->toDateString())
                              ->whereNull('deleted_at');
                    })
                    ->distinct()
                    ->count();
                
                $totalClientsData[] = $totalClients;
                $activeMembershipClientsData[] = $activeMembershipClients;
                $labels[] = $date->format('M');
            }
            
            return response()->json([
                'success' => true,
                'data' => [
                    'labels' => $labels,
                    'total_clients' => $totalClientsData,
                    'active_membership_clients' => $activeMembershipClientsData,
                ]
            ], 200);
            
        } catch (\Exception $e) {
            \Log::error('Active clients trend error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching active clients trend: ' . $e->getMessage(),
            ], 500);
        }
    }
}

