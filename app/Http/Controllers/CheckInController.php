<?php

namespace App\Http\Controllers;

use App\Models\CheckIn;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CheckInController extends Controller
{
    /**
     * Display a listing of check-ins (members and visitors).
     */
    public function index(Request $request): JsonResponse
    {
        $user = Auth::user();
        $gymId = $user->gym_id ?? 1;
        
        $query = CheckIn::with(['checkedInBy', 'member'])
            ->where('gym_id', $gymId)
            ->where(function ($q) {
                $q->whereNotNull('visitor_name')
                  ->orWhereNotNull('member_id');
            });

        // Filter by name search
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($sub) use ($search) {
                $sub->where('visitor_name', 'like', '%' . $search . '%')
                    ->orWhere('member_name', 'like', '%' . $search . '%');
            });
        }

        // Filter by date
        if ($request->has('date') && $request->date !== null) {
            $date = Carbon::parse($request->date);
            $query->whereDate('check_in_time', $date);
        } else {
            $query->today();
        }

        // Filter by visitor type
        if ($request->has('visitor_type') && $request->visitor_type !== 'all') {
            if ($request->visitor_type === 'active') {
                $query->active();
            }
        }

        $checkIns = $query->orderBy('check_in_time', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $checkIns,
            'message' => 'Visitors retrieved successfully'
        ]);
    }

    /**
     * Store a newly created check-in (member or visitor).
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'member_id' => 'nullable|integer|exists:members,id',
            'member_name' => 'nullable|string|max:255',
            'visitor_name' => 'nullable|string|max:255',
            'check_in_type' => 'sometimes|string|in:manual,automatic,mobile',
            'message' => 'nullable|string|max:500',
            'check_in_time' => 'sometimes|date',
        ]);

        $validator->after(function ($validator) use ($request) {
            if (!$request->filled('member_id') && !$request->filled('visitor_name')) {
                $validator->errors()->add('check_in', 'Provide either member_id or visitor_name for check-in.');
            }
        });

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
                'error' => $validator->errors()->first()
            ], 422);
        }

        $user = Auth::user();
        $gymId = $user->gym_id ?? 1;

        $checkInTime = $request->filled('check_in_time')
            ? Carbon::parse($request->check_in_time)
            : Carbon::now();

        if ($request->filled('member_id')) {
            $member = Member::findOrFail($request->member_id);

            $existingCheckIn = CheckIn::where('gym_id', $gymId)
                ->where('member_id', $member->id)
                ->whereNull('check_out_time')
                ->whereDate('check_in_time', $checkInTime->toDateString())
                ->first();

            if ($existingCheckIn) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member is already checked in'
                ], 400);
            }

            $displayName = $request->member_name
                ?: ($member->membername ?? trim($member->firstname . ' ' . $member->lastname));

            $checkInData = [
                'member_id' => $member->id,
                'member_name' => $displayName,
                'visitor_name' => null,
                'gym_id' => $gymId,
                'check_in_time' => $checkInTime,
                'check_in_type' => $request->check_in_type ?? 'manual',
                'message' => $request->message ?? 'Member check-in',
                'checked_in_by' => Auth::id()
            ];
        } else {
            $existingCheckIn = CheckIn::where('gym_id', $gymId)
                ->where('visitor_name', $request->visitor_name)
                ->whereNull('check_out_time')
                ->whereDate('check_in_time', $checkInTime->toDateString())
                ->first();

            if ($existingCheckIn) {
                return response()->json([
                    'success' => false,
                    'message' => 'Visitor is already checked in'
                ], 400);
            }

            $checkInData = [
                'visitor_name' => $request->visitor_name,
                'gym_id' => $gymId,
                'check_in_time' => $checkInTime,
                'check_in_type' => $request->check_in_type ?? 'manual',
                'message' => $request->message ?? 'Visitor check-in',
                'checked_in_by' => Auth::id()
            ];
        }

        $checkIn = CheckIn::create($checkInData);

        $checkIn->load(['checkedInBy', 'member']);

        return response()->json([
            'success' => true,
            'data' => $checkIn,
            'message' => $request->filled('member_id')
                ? 'Member checked in successfully'
                : 'Visitor checked in successfully'
        ], 201);
    }

    /**
     * Update the specified check-in (check out).
     */
    public function update(Request $request, $id): JsonResponse
    {
        $checkIn = CheckIn::findOrFail($id);

        if ($checkIn->check_out_time) {
            return response()->json([
                'success' => false,
                'message' => 'Visitor is already checked out'
            ], 400);
        }

        $checkIn->update([
            'check_out_time' => Carbon::now()
        ]);

        $checkIn->load(['checkedInBy']);

        return response()->json([
            'success' => true,
            'data' => $checkIn,
            'message' => 'Visitor checked out successfully'
        ]);
    }

    /**
     * Remove the specified check-in.
     */
    public function destroy($id): JsonResponse
    {
        $checkIn = CheckIn::findOrFail($id);
        $checkIn->delete();

        return response()->json([
            'success' => true,
            'message' => 'Check-in record deleted successfully'
        ]);
    }

    /**
     * Get current visitors count.
     */
    public function getCurrentVisitorsCount(): JsonResponse
    {
        $user = Auth::user();
        $gymId = $user->gym_id ?? 1;
        
        $activeCount = CheckIn::where('gym_id', $gymId)
            ->where(function ($q) {
                $q->whereNotNull('visitor_name')
                  ->orWhereNotNull('member_id');
            })
            ->active()
            ->today()
            ->count();
        
        $totalToday = CheckIn::where('gym_id', $gymId)
            ->where(function ($q) {
                $q->whereNotNull('visitor_name')
                  ->orWhereNotNull('member_id');
            })
            ->today()
            ->count();

        return response()->json([
            'success' => true,
            'data' => [
                'active_visitors' => $activeCount,
                'total_today' => $totalToday
            ]
        ]);
    }

    /**
     * Search visitors by name.
     */
    public function searchVisitors(Request $request): JsonResponse
    {
        $query = $request->get('q', '');
        
        if (empty($query)) {
            return response()->json([
                'success' => true,
                'data' => []
            ]);
        }

        $user = Auth::user();
        $gymId = $user->gym_id ?? 1;

        $visitors = CheckIn::where('gym_id', $gymId)
            ->whereNotNull('visitor_name')
            ->where('visitor_name', 'like', "%{$query}%")
            ->whereDate('check_in_time', Carbon::today())
            ->distinct()
            ->pluck('visitor_name')
            ->map(function($name) {
                return ['name' => $name];
            })
            ->take(10);

        return response()->json([
            'success' => true,
            'data' => $visitors
        ]);
    }

    /**
     * Get check-ins summary/statistics.
     */
    public function summary(Request $request): JsonResponse
    {
        $user = Auth::user();
        $gymId = $user->gym_id ?? 1;
        
        // Get date filter (default to today)
        $date = $request->has('date') && $request->date !== null 
            ? Carbon::parse($request->date) 
            : Carbon::today();
        
        // Active visitors count
        $activeCount = CheckIn::where('gym_id', $gymId)
            ->where(function ($q) {
                $q->whereNotNull('visitor_name')
                  ->orWhereNotNull('member_id');
            })
            ->active()
            ->whereDate('check_in_time', $date)
            ->count();
        
        // Total visitors for the date
        $totalCount = CheckIn::where('gym_id', $gymId)
            ->where(function ($q) {
                $q->whereNotNull('visitor_name')
                  ->orWhereNotNull('member_id');
            })
            ->whereDate('check_in_time', $date)
            ->count();
        
        // Checked out count
        $checkedOutCount = CheckIn::where('gym_id', $gymId)
            ->where(function ($q) {
                $q->whereNotNull('visitor_name')
                  ->orWhereNotNull('member_id');
            })
            ->whereNotNull('check_out_time')
            ->whereDate('check_in_time', $date)
            ->count();
        
        // Visitors by type
        $manualCount = CheckIn::where('gym_id', $gymId)
            ->where(function ($q) {
                $q->whereNotNull('visitor_name')
                  ->orWhereNotNull('member_id');
            })
            ->where('check_in_type', 'manual')
            ->whereDate('check_in_time', $date)
            ->count();
        
        $automaticCount = CheckIn::where('gym_id', $gymId)
            ->where(function ($q) {
                $q->whereNotNull('visitor_name')
                  ->orWhereNotNull('member_id');
            })
            ->where('check_in_type', 'automatic')
            ->whereDate('check_in_time', $date)
            ->count();
        
        return response()->json([
            'success' => true,
            'data' => [
                'active_visitors' => $activeCount,
                'total_visitors' => $totalCount,
                'checked_out' => $checkedOutCount,
                'manual_check_ins' => $manualCount,
                'automatic_check_ins' => $automaticCount,
                'date' => $date->toDateString()
            ],
            'message' => 'Summary retrieved successfully'
        ]);
    }

    /**
     * Export check-ins data (visitors only).
     */
    public function export(Request $request): JsonResponse
    {
        $user = Auth::user();
        $gymId = $user->gym_id ?? 1;
        
        $query = CheckIn::with(['checkedInBy', 'member'])
            ->where('gym_id', $gymId)
            ->where(function ($q) {
                $q->whereNotNull('visitor_name')
                  ->orWhereNotNull('member_id');
            });

        // Apply filters
        if ($request->has('date')) {
            $date = Carbon::parse($request->date);
            $query->whereDate('check_in_time', $date);
        }

        if ($request->has('visitor_type') && $request->visitor_type !== 'all') {
            if ($request->visitor_type === 'active') {
                $query->active();
            }
        }
        
        // Filter by search
        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($sub) use ($request) {
                $sub->where('visitor_name', 'like', '%' . $request->search . '%')
                    ->orWhere('member_name', 'like', '%' . $request->search . '%');
            });
        }

        $checkIns = $query->orderBy('check_in_time', 'desc')->get();

        // Format data for export
        $exportData = $checkIns->map(function($checkIn) {
            $displayName = $checkIn->member_name ?? $checkIn->visitor_name;
            return [
                'Name' => $displayName,
                'Check-in Time' => $checkIn->formatted_check_in_time,
                'Check-out Time' => $checkIn->formatted_check_out_time ?? 'Still Active',
                'Duration (minutes)' => $checkIn->duration ?? 'N/A',
                'Type' => ucfirst($checkIn->check_in_type),
                'Message' => $checkIn->message ?? 'N/A',
                'Checked in by' => $checkIn->checkedInBy ? $checkIn->checkedInBy->username : 'System'
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $exportData,
            'message' => 'Export data prepared successfully'
        ]);
    }
}