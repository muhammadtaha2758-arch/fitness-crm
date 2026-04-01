<?php
namespace App\Http\Controllers;
use App\Models\Client;
use App\Models\Member;
use App\Models\MemberTask;
use App\Models\Task;
use App\Models\MemberTrainer;
use App\Models\MemberUnsubscribe;
use App\Models\Setting;
use App\Models\CoachAssignment;
use App\Models\Coach;
use App\Models\Invoice;
use App\Models\SaleReturn;
// PaymentSaleReturns model removed - table dropped
use App\Models\Sale;
// PaymentSale model removed - table dropped
use App\Models\AssignedMealsMember;
// NutritionPlan model removed - nutrition_plans table dropped
// use App\Models\NutritionPlan;
use App\Models\CheckIn;
use App\Models\Plan;
use App\Models\MemberMembershipAssignment;
use App\Models\Memberprogress;
use App\Models\MemberGoal;
use App\Models\GoalActivity;
use App\Models\MemberMessage;

use App\utils\helpers;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

use Illuminate\Http\Request;

use Carbon\Carbon;

use DB;
use App\Mail\MemberPasswordSetupEmail;
use App\Mail\MemberCreationConfirmationEmail;
use App\Mail\ProMembershipActivationEmail;
use App\Mail\CustomEmail;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Services\NotificationService;

class MemberController extends BaseController
{
    //------------- Get ALL Customers -------------\\

    public function index(request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', Client::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        
        $pageStart = \Request::get('page', 1);
        
        // Convert to integers for mathematical operations
        $pageStart = (int)$pageStart;
        
        // Handle special cases for perPage
        if ($perPage === 'all' || $perPage === '9999' || $perPage === -1) {
            $perPage = -1; // Special value for "show all"
            $offSet = 0; // No offset when showing all
        } else {
            $perPage = (int)$perPage;
            // Start displaying items from this number;
            $offSet = ($pageStart * $perPage) - $perPage;
        }
        $order = $request->SortField;
        $dir = $request->SortType;
        $helpers = new helpers();
        $gym_id = $request->user('api')->gym_id ?? 1;
        
        $data = array();
        $members = Member::whereNull('deleted_at')
                        ->where('gym_id', $gym_id)
                        ->where(function($query) {
                            $query->where('Statuses', '!=', 'coach_converted')
                                  ->orWhereNull('Statuses'); // Include members with NULL Statuses
                        }); // Only show non-deleted members and exclude converted coaches

        // Apply filters
        if ($request->filled('name')) {
            $members->where('membername', 'LIKE', "%{$request->name}%");
        }
        
        if ($request->filled('code')) {
            $code = $request->code;
            
            // Handle formatted Member ID search (e.g., M-2024-00001)
            if (preg_match('/^M-\d{4}-(\d+)$/', $code, $matches)) {
                // Use the scope method for cleaner code
                $members->byFormattedMemberId($code);
            } else {
                // Fallback to original gym_id search for backward compatibility
                $members->where('gym_id', 'LIKE', "%{$code}%");
            }
        }
        
        if ($request->filled('phone')) {
            $members->where('phone', 'LIKE', "%{$request->phone}%");
        }
        
        if ($request->filled('email')) {
            $members->where('email', 'LIKE', "%{$request->email}%");
        }
        
        if ($request->filled('plan')) {
            $members->where('plan', 'LIKE', "%{$request->plan}%");
        }
        
        if ($request->filled('status')) {
            $status = $request->status;
            // Handle comma-separated status values (e.g., "active,inactive")
            $statusArray = explode(',', $status);
            $statusArray = array_map('trim', $statusArray); // Remove any whitespace
            
            // New filter logic: 
            // - "active" = members who have activated their app login (first_mobile_login IS NOT NULL)
            // - "inactive" = members who haven't activated yet (first_mobile_login IS NULL) OR have been unsubscribed
            $hasActive = in_array('active', $statusArray);
            $hasInactive = in_array('inactive', $statusArray);
            
            if ($hasActive && $hasInactive) {
                // Show all members - don't apply any filter
                // No need to add any where clause
            } elseif ($hasActive) {
                // Only active: members with first_mobile_login
                $members->whereNotNull('first_mobile_login');
            } elseif ($hasInactive) {
                // Only inactive: members without first_mobile_login OR with active unsubscribe
                $members->where(function ($q) {
                    $q->whereNull('first_mobile_login')
                      ->orWhereHas('activeUnsubscribe');
                });
            }
        }
        
        // Body type filter
        if ($request->filled('body_type')) {
            $members->where('body_type', $request->body_type);
        }
        
        // Gender filter
        if ($request->filled('gender')) {
            $members->where('gender', $request->gender);
        }
        
        // Client group filter (using groups relationship)
        if ($request->filled('client_group')) {
            $members->whereHas('groups', function ($query) use ($request) {
                $query->where('group_id', $request->client_group);
            });
        }
        
        // Free account filter
        if ($request->filled('free_account')) {
            if ($request->free_account === '1' || $request->free_account === 'true') {
                $members->where('free_account', true);
            } elseif ($request->free_account === '0' || $request->free_account === 'false') {
                $members->where('free_account', false);
            }
        }
        
        if ($request->filled('coach')) {
            $coachParam = $request->coach;
            // Handle comma-separated coach values (e.g., "coach1,coach2,no-coach")
            $coachArray = explode(',', $coachParam);
            $coachArray = array_map('trim', $coachArray); // Remove any whitespace
            
            // Get total count of active coaches in the gym
            $totalActiveCoaches = Coach::where('gym_id', $gym_id)
                ->whereNull('deleted_at')
                ->where(function($q) {
                    $q->whereNull('status')
                      ->orWhere('status', 'Active');
                })
                ->count();
            
            $members->where(function ($query) use ($coachArray, $gym_id, $totalActiveCoaches) {
                foreach ($coachArray as $coachValue) {
                    if ($coachValue === 'no-coach') {
                        // Filter for members with no coach assignment
                        $query->orWhereDoesntHave('coachAssignments', function ($subQuery) {
                            $subQuery->where('status', 'active');
                        });
                    } elseif ($coachValue === 'all') {
                        // Filter for members who have ALL coaches assigned
                        // A member has all coaches if they have active assignments to all active coaches
                        if ($totalActiveCoaches > 0) {
                            $query->orWhereExists(function ($subQuery) use ($gym_id, $totalActiveCoaches) {
                                $subQuery->select(DB::raw(1))
                                        ->from('coach_assignments')
                                        ->whereColumn('coach_assignments.member_id', 'members.id')
                                        ->where('coach_assignments.status', 'active')
                                        ->where('coach_assignments.gym_id', $gym_id)
                                        ->groupBy('coach_assignments.member_id')
                                        ->havingRaw('COUNT(DISTINCT coach_assignments.coach_id) >= ?', [$totalActiveCoaches]);
                            });
                        } else {
                            // If no active coaches exist, show no members
                            $query->orWhereRaw('1 = 0');
                        }
                    } else {
                        // Filter for members with specific coach assignment
                        $query->orWhereHas('coachAssignments', function ($subQuery) use ($coachValue) {
                            $subQuery->where('coach_id', $coachValue)
                                    ->where('status', 'active');
                        });
                    }
                }
            });
        }
        
        // Handle membership filter (by plan name)
        if ($request->filled('membership')) {
            $membershipParam = $request->membership;
            // Handle comma-separated membership values (e.g., "Plan1,Plan2,Plan3")
            $membershipArray = explode(',', $membershipParam);
            $membershipArray = array_map('trim', $membershipArray); // Remove any whitespace
            
            $members->where(function ($query) use ($membershipArray) {
                foreach ($membershipArray as $membershipValue) {
                    if ($membershipValue === 'all') {
                        // If 'all' is selected, don't apply any membership filter
                        // This means show all members regardless of membership
                        continue;
                    } else {
                        // Filter for members with specific subscription plan name
                        $query->orWhere('plan', 'LIKE', "%{$membershipValue}%");
                    }
                }
            });
        }
        
        // Handle ending membership filter
        if ($request->filled('ending_membership')) {
            $endingParam = $request->ending_membership;
            $today = \Carbon\Carbon::now();
            
            if ($endingParam === 'august') {
                // Last month (August)
                $startDate = $today->copy()->subMonth()->startOfMonth();
                $endDate = $today->copy()->subMonth()->endOfMonth();
            } elseif ($endingParam === 'september') {
                // This month (September)
                $startDate = $today->copy()->startOfMonth();
                $endDate = $today->copy()->endOfMonth();
            } elseif ($endingParam === 'october') {
                // Next month (October)
                $startDate = $today->copy()->addMonth()->startOfMonth();
                $endDate = $today->copy()->addMonth()->endOfMonth();
            } elseif (preg_match('/^\d{4}-\d{2}-\d{2}$/', $endingParam)) {
                // Custom date
                $customDate = \Carbon\Carbon::parse($endingParam);
                $startDate = $customDate->copy()->startOfMonth();
                $endDate = $customDate->copy()->endOfMonth();
            } else {
                // Default to current month
                $startDate = $today->copy()->startOfMonth();
                $endDate = $today->copy()->endOfMonth();
            }
            
            $members->where(function ($query) use ($startDate, $endDate) {
                $query->whereNotNull('Expires')
                      ->whereBetween('Expires', [$startDate->format('Y-m-d'), $endDate->format('Y-m-d')]);
            });
        }
        
        // Handle paused membership filter
        if ($request->filled('paused_membership') && $request->paused_membership === '1') {
            // Filter for members with paused membership
            // Check if Statuses field indicates paused, or if they have a paused membership assignment
            $members->where(function ($query) {
                $query->where('Statuses', 'paused')
                      ->orWhereHas('membershipAssignments', function ($subQuery) {
                          $subQuery->where('status', 'paused');
                      });
            });
        }
        
        // Handle no membership filter
        if ($request->filled('no_membership') && $request->no_membership === '1') {
            // Filter for members with no membership:
            // - No plan field (or plan is N/A/empty/0)
            // - No active membership assignments
            // - No subscription_plan_id
            $members->where(function ($query) {
                $query->where(function ($subQuery) {
                    // Check for no plan field or plan is N/A/empty/0
                    $subQuery->whereNull('plan')
                          ->orWhere('plan', '')
                          ->orWhere('plan', 'N/A')
                          ->orWhere('plan', '0');
                })
                // Check for no active membership assignments
                ->whereDoesntHave('membershipAssignments', function ($subQuery) {
                    $subQuery->where('status', 'active')
                            ->where(function ($dateQuery) {
                                $dateQuery->whereNull('end_date')
                                         ->orWhere('end_date', '>=', now()->format('Y-m-d'))
                                         ->orWhereNull('calculated_end_date')
                                         ->orWhere('calculated_end_date', '>=', now()->format('Y-m-d'));
                            });
                })
                // Check for no subscription_plan_id
                ->where(function ($subQuery) {
                    $subQuery->whereNull('subscription_plan_id')
                            ->orWhere('subscription_plan_id', 0);
                });
            });
        }

        // Handle tag filter
        if ($request->filled('tag')) {
            $tagParam = $request->tag;
            
            if ($tagParam === 'all') {
                // If 'all' is selected, show members with any tags (not null and not empty)
                $members->whereNotNull('tags')
                        ->where('tags', '!=', '[]')
                        ->where('tags', '!=', '');
            } elseif ($tagParam !== null && $tagParam !== '') {
                // Filter for members with the specific tag
                $members->whereJsonContains('tags', $tagParam);
            }
        }

        // Handle no tag filter
        if ($request->filled('no_tag') && $request->no_tag === '1') {
            // Filter for members with no tags (null, empty, or empty array)
            $members->where(function ($query) {
                $query->whereNull('tags')
                      ->orWhere('tags', '')
                      ->orWhere('tags', '[]')
                      ->orWhereJsonLength('tags', 0);
            });
        }

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $members->where(function ($query) use ($search) {
                $query->where('membername', 'LIKE', "%{$search}%")
                      ->orWhere('email', 'LIKE', "%{$search}%")
                      ->orWhere('phone', 'LIKE', "%{$search}%")
                    //   ->orWhere('gym_id', 'LIKE', "%{$search}%")
                      ->orWhere('plan', 'LIKE', "%{$search}%");
                      // Handle formatted Member ID search in general search
                if (preg_match('/^M-\d{4}-(\d+)$/', $search, $matches)) {
                    $numericId = intval($matches[1]);
                    $query->orWhere('id', $numericId);
                } else {
                    // Fallback to gym_id search for backward compatibility
                    $query->orWhere('gym_id', 'LIKE', "%{$search}%");
                }
            });
        }

        $totalRows = $members->count();
        
        // Get total count of active coaches in the gym (needed for has_all_coaches check)
        $totalActiveCoaches = Coach::where('gym_id', $gym_id)
            ->whereNull('deleted_at')
            ->where(function($q) {
                $q->whereNull('status')
                  ->orWhere('status', 'Active');
            })
            ->count();
        
        // Apply pagination
        if($perPage == "-1"){
            $perPage = $totalRows;
            $offSet = 0; // Reset offset when showing all records
        }
        
        $members = $members->with('activeUnsubscribe')
                          ->with('coachAssignments')
                          ->offset($offSet)
                          ->limit($perPage)
                          ->orderBy($order ?? 'created_at', $dir ?? 'desc')
                          ->get();

        $memberIds = $members->pluck('id')->filter()->all();
        $latestCheckins = collect();
        $latestMemberships = collect();

        if (!empty($memberIds)) {
            $latestCheckins = CheckIn::whereIn('member_id', $memberIds)
                ->orderBy('check_in_time', 'desc')
                ->get()
                ->unique('member_id')
                ->keyBy('member_id');
            
            // Get latest active membership assignments for each member
            $latestMemberships = MemberMembershipAssignment::whereIn('member_id', $memberIds)
                ->where('status', 'active')
                ->orderBy('start_date', 'desc')
                ->get()
                ->unique('member_id')
                ->keyBy('member_id');
        }

        foreach ($members as $member) {
            $item = []; // Reset item array for each member
            $item['id'] = $member->id;
            $item['profile_image'] = $member->profile_image;
            $item['membername'] = $member->membername ?? $member->firstname . ' ' . $member->lastname;
            $item['firstname'] = $member->firstname;
            $item['lastname'] = $member->lastname;
            $item['first_name'] = $member->firstname; // Alternative field name
            $item['last_name'] = $member->lastname; // Alternative field name
            $item['name'] = $member->membername ?? $member->firstname . ' ' . $member->lastname;
            $item['email'] = $member->email;
            $item['phone'] = $member->phone;
            $item['mobile_phone'] = $member->mobile_phone;
            $item['landline_phone'] = $member->landline_phone;
            $item['landline'] = $member->landline_phone; // Alternative field name
            $item['language'] = $member->language;
            $item['date_of_birth'] = $member->date_of_birth;
            $item['dob'] = $member->date_of_birth; // Alternative field name
            $item['birthday'] = $member->date_of_birth; // Alternative field name
            $item['gender'] = $member->gender;
            $item['sex'] = $member->gender; // Alternative field name
            $item['gym_id'] = $member->gym_id;
            $item['address'] = $member->address;
            $item['city'] = $member->city;
            $item['zip'] = $member->zipcode;
            $item['zipcode'] = $member->zipcode; // Alternative field name
            $item['height'] = $member->height;
            $item['weight'] = $member->weight;
            $item['start_weight'] = $member->weight; // For nutrition hub compatibility
            $item['body_type'] = $member->body_type;
            $item['free_account'] = $member->free_account ?? false;
            $item['medical_condition'] = $member->medical_condition;
            $item['medical'] = $member->medical_condition; // Alternative field name
            $item['contact_name'] = $member->contact_name;
            $item['contact_phone'] = $member->contact_phone;
            $item['emergency_name'] = $member->contact_name; // Alternative field name
            $item['emergency_phone'] = $member->contact_phone; // Alternative field name
            $item['start_date'] = $member->start_date;
            $item['end_date'] = $member->end_date;
            $item['member_since'] = $member->member_since ?? $member->created_at;
            $item['status'] = $member->Statuses;
            $item['subscription_plan_id'] = $member->subscription_plan_id;
            // Bank details
            $item['bank_account_number'] = $member->masked_bank_account_number ?? '';
            $item['bank_account_type'] = $member->bank_account_type ?? '';
            $item['bank_account_holder_name'] = $member->masked_bank_account_holder_name ?? '';
            $item['bank_name'] = $member->bank_name ?? '';
            $item['routing_number'] = $member->masked_routing_number ?? '';
            $item['mandate_id'] = $member->mandate_id ?? '';
            $item['exclude_from_online_payments'] = $member->exclude_from_online_payments ?? false;
            $coachAssignment = $this->getCoachAssignment($member->id);
            $item['coach'] = ($coachAssignment && 
                            $coachAssignment->getData()->success && 
                            $coachAssignment->getData()->assignment && 
                            isset($coachAssignment->getData()->assignment->coach_name)) 
                            ? $coachAssignment->getData()->assignment->coach_name 
                            : 'NA';

            $item['coach_id'] = ($coachAssignment && 
            $coachAssignment->getData()->success && 
            $coachAssignment->getData()->assignment && 
            isset($coachAssignment->getData()->assignment->coach_id)) 
            ? $coachAssignment->getData()->assignment->coach_id 
            : '0';
            
            // Check if member has all coaches assigned
            $memberActiveCoachAssignments = $member->coachAssignments()
                ->where('status', 'active')
                ->where('gym_id', $gym_id)
                ->distinct('coach_id')
                ->count('coach_id');
            
            $item['has_all_coaches'] = ($totalActiveCoaches > 0 && $memberActiveCoachAssignments >= $totalActiveCoaches);
            
            $item['formatted_member_id'] = $member->getFormattedMemberId();
            $item['plan'] = $member->plan;
            $item['Expires'] = $member->Expires;
            $item['Statuses'] = $member->Statuses;
            $item['active'] = $member->active;
            $item['created_at'] = $member->created_at;
            $item['last_login'] = $member->last_login;
            $item['first_mobile_login'] = $member->first_mobile_login;
            // Get latest subscription activation date from pre-loaded membership assignments
            $latestMembership = $latestMemberships->get($member->id);
            // Use subscription activation date if available, otherwise fallback to first mobile login
            $item['activated_on'] = $latestMembership ? $latestMembership->start_date : ($member->first_mobile_login ?? null);
            // Add unsubscribe data
            $activeUnsubscribe = $member->activeUnsubscribe;
            $item['unsubscribed_date'] = $activeUnsubscribe ? $activeUnsubscribe->effective_date : null;
            $item['unsubscribed_since'] = $activeUnsubscribe ? $activeUnsubscribe->effective_date : null;
            $latestCheckIn = $latestCheckins->get($member->id);
            $item['last_checkin'] = $latestCheckIn ? $latestCheckIn->check_in_time : null;
            $item['last_checkin_time'] = $latestCheckIn ? $latestCheckIn->check_in_time : null;
            $item['last_checkin_name'] = $latestCheckIn ? ($latestCheckIn->member_name ?? $latestCheckIn->visitor_name) : null;
            // Add tags
            $item['tags'] = $member->tags ?? [];
            $data[] = $item;
        }

        $company_info = Setting::where('deleted_at', '=', null)->first();

        // Sanitize all data before encoding to JSON to prevent UTF-8 encoding errors
        $data = $this->sanitizeUtf8($data);
        $company_info = $company_info ? $this->sanitizeUtf8($company_info->toArray()) : null;

        return response()->json([
            'clients' => $data,
            'company_info' => $company_info,
            'totalRows' => $totalRows,
        ]);
    }

    //------------- Store new Customer -------------\\

    public function store(Request $request)
    {
        // Support both Passport (api guard) and mobile coach authentication
        $user = $request->user('api') 
            ?? $request->get('auth_user') 
            ?? $request->get('auth_member')
            ?? $request->user();
        
        // For mobile coaches, check if user exists and has permission
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }
        
        // Check if user is a coach (role_id = 3) - coaches can create members
        // Also check if user has a coach record as fallback
        $isCoach = false;
        $coach = null;
        if (isset($user->role_id) && $user->role_id === 3) {
            $isCoach = true;
            // Get coach record for assignment
            if (Schema::hasColumn('coaches', 'user_id')) {
                $coach = Coach::where('user_id', $user->id)->first();
            }
            if (!$coach) {
                $coach = Coach::where('email', $user->email)->first();
            }
        } else {
            // Fallback: Check if user has a coach record
            $coach = Coach::where('email', $user->email)->first();
            if (!$coach && Schema::hasColumn('coaches', 'user_id')) {
                $coach = Coach::where('user_id', $user->id)->first();
            }
            if ($coach) {
                $isCoach = true;
            }
        }
        
        // Only check authorization policy if user is not a coach
        // Coaches are allowed to create members for their gym
        if (!$isCoach) {
            $this->authorizeForUser($user, 'create', Client::class);
        }

        $gym_id = $user->gym_id ?? 1;
        
        $this->validate($request, [
            'firstname' => 'required|string|max:50',
            'lastname' => 'required|string|max:50',
            'email' => 'required|email|max:50|unique:members,email,NULL,id,gym_id,' . $gym_id,
            'date_of_birth' => 'required|date',
            'gender' => 'required|string|max:10',
            'mobile_phone' => 'nullable|string|max:20',
            'landline_phone' => 'nullable|string|max:20',
            'language' => 'nullable|string|max:200',
            'goals' => 'nullable|string|max:100',
            'address' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:50',
            'zipcode' => 'nullable|string|max:10',
            'plan' => 'nullable|numeric|max:250',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'height' => 'nullable|numeric|min:0|max:300', // Accept cm (up to ~300cm = ~118 inches)
            'weight' => 'nullable|numeric|min:0|max:500', // Accept kg (up to ~500kg = ~1100 lbs, but typically will be much less)
            'height_feet' => 'nullable|numeric|min:3|max:8',
            'height_inches' => 'nullable|numeric|min:0|max:11',
            'preferred_length_unit' => 'nullable|string|in:inches,cm',
            'preferred_weight_unit' => 'nullable|string|in:pounds,kg',
            'medical_condition' => 'nullable|string|max:200',
            'contact_name' => 'nullable|string|max:200',
            'contact_phone' => 'nullable|string|max:20',
            'profile_image' => 'nullable', // Can be file (FormData) or string (base64/path)
            'create_invoice' => 'nullable|boolean',
            'send_invitation' => 'nullable|boolean',
            'member_since' => 'nullable|string|max:50',
            // Bank details validation
            'bank_account_number' => 'nullable|string|max:50',
            'bank_account_type' => 'nullable|string|max:50',
            'bank_account_holder_name' => 'nullable|string|max:150',
            'bank_name' => 'nullable|string|max:100',
            'routing_number' => 'nullable|string|max:20',
            'mandate_id' => 'nullable|string|max:100',
            'exclude_from_online_payments' => 'nullable|boolean',
            'tags' => 'nullable|array',
            'tags.*' => 'nullable|string|max:255',
            // Additional fields
            'extra_address' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'is_business' => 'nullable|string|max:10',
            'business_type' => 'nullable|string|max:100',
            'subscription_reason' => 'nullable|string|max:100',
            'source' => 'nullable|string|max:100',
            'own_member_id' => 'nullable|string|max:50',
            'custom_export_field' => 'nullable|string|max:255'
            ]
        );
        

        try {
            // Handle profile image - support both FormData file upload and base64 string
            $profileImage = null;
            
            // Check if profile_image is a file upload (FormData)
            if ($request->hasFile('profile_image')) {
                try {
                    $file = $request->file('profile_image');
                    
                    // Validate file
                    if ($file->isValid()) {
                        // Generate unique filename
                        $extension = $file->getClientOriginalExtension();
                        $filename = 'member_' . time() . '_' . uniqid() . '.' . $extension;
                        
                        // Create directory if it doesn't exist
                        $uploadPath = public_path('images/avatar');
                        if (!file_exists($uploadPath)) {
                            mkdir($uploadPath, 0755, true);
                        }
                        
                        // Move uploaded file
                        $file->move($uploadPath, $filename);
                        
                        // Store only the filename in database
                        $profileImage = $filename;
                    }
                } catch (\Exception $e) {
                    \Log::error('Profile image file upload failed: ' . $e->getMessage());
                }
            }
            // Check if profile_image is a base64 string (legacy support)
            elseif ($request->has('profile_image') && $request['profile_image']) {
                try {
                    // Check if it's a base64 data URI
                    if (preg_match('/^data:image\/(\w+);base64,/', $request['profile_image'], $matches)) {
                        $imageData = $request['profile_image'];
                        $imageData = str_replace('data:image/' . $matches[1] . ';base64,', '', $imageData);
                        $imageData = base64_decode($imageData);
                        
                        // Validate decoded data
                        if ($imageData === false) {
                            throw new \Exception('Failed to decode base64 image data');
                        }
                        
                        // Check file size (limit to ~2MB after decoding)
                        if (strlen($imageData) > 2097152) { // 2MB
                            \Log::warning('Profile image too large, skipping: ' . strlen($imageData) . ' bytes');
                        } else {
                            // Generate unique filename
                            $extension = $matches[1] === 'jpeg' ? 'jpg' : $matches[1];
                            $filename = 'member_' . time() . '_' . uniqid() . '.' . $extension;
                            
                            // Create directory if it doesn't exist
                            $uploadPath = public_path('images/avatar');
                            if (!file_exists($uploadPath)) {
                                mkdir($uploadPath, 0755, true);
                            }
                            
                            // Save the file
                            file_put_contents($uploadPath . '/' . $filename, $imageData);
                            
                            // Store only the filename in database
                            $profileImage = $filename;
                        }
                    } 
                    // If it's already a file path (not base64), use it as is
                    elseif (!Str::startsWith($request['profile_image'], 'data:image/')) {
                        $profileImage = $request['profile_image'];
                    }
                } catch (\Exception $e) {
                    \Log::error('Profile image base64 upload failed: ' . $e->getMessage());
                }
            }
            
            // Fetch plan details if plan ID is provided
            $plan = null;
            $planName = null;
            if ($request['plan']) {
                $plan = \App\Models\Plan::find($request['plan']);
                if ($plan) {
                    $planName = $plan->name;
                }
            }
            
            $member = Member::create([
                'membername' => $request['firstname'] . ' ' . $request['lastname'],
                'firstname' => $request['firstname'],
                'lastname' => $request['lastname'],
                'email' => $request['email'],
                'date_of_birth' => $request['date_of_birth'],
                'address' => $request['address'],
                'gender' => $request['gender'],
                'mobile_phone' => $request['mobile_phone'] ?? '',
                'landline_phone' => $request['landline_phone'] ?? '',
                'language' => !empty($request['language']) ? $request['language'] : null,
                'goals' => !empty($request['goals']) ? $request['goals'] : null,
                'city' => $request['city'],
                'zipcode' => $request['zipcode'],
                'start_date' => $request['start_date'],
                'end_date' => $request['end_date'],
                'height' => $this->convertHeightToCm($request),
                'weight' => $this->convertWeightToKg($request),
                'height_feet' => $request['height_feet'] ?? null,
                'height_inches' => $request['height_inches'] ?? null,
                'preferred_length_unit' => $request['preferred_length_unit'] ?? 'inches',
                'preferred_weight_unit' => $request['preferred_weight_unit'] ?? 'pounds',
                'medical_condition' => $request['medical_condition'],
                'contact_name' => $request['contact_name'],
                'contact_phone' => $request['contact_phone'],
                'profile_image' => $profileImage,
                'subscription_plan_id' => $request['plan'] ? $request['plan'] : null,
                'plan' => $planName,
                'Expires' => $request['end_date'],
                'Statuses' => 'active',
                'member_since' => $request['member_since'],
                'gym_id' => $gym_id,
                // Bank details
                'bank_account_number' => $request['bank_account_number'],
                'bank_account_type' => $request['bank_account_type'],
                'bank_account_holder_name' => $request['bank_account_holder_name'],
                'bank_name' => $request['bank_name'],
                'routing_number' => $request['routing_number'],
                'mandate_id' => $request['mandate_id'],
                'exclude_from_online_payments' => $request['exclude_from_online_payments'] ?? false,
                'tags' => $request['tags'] ?? [],
                // Additional fields
                'extra_address' => $request['extra_address'] ?? null,
                'country' => $request['country'] ?? null,
                'is_business' => $request['is_business'] ?? null,
                'business_type' => $request['business_type'] ?? null,
                'subscription_reason' => $request['subscription_reason'] ?? null,
                'source' => $request['source'] ?? null,
                'own_member_id' => $request['own_member_id'] ?? null,
                'custom_export_field' => $request['custom_export_field'] ?? null,
            ]);

            // Create corresponding User record for login
            try {
                // Check if user already exists with this email and role
                $existingUser = User::where('email', $member->email)
                    ->where('role_id', 2)
                    ->first();
                
                if (!$existingUser) {
                    // Generate a temporary password (will be changed when member sets up password)
                    $tempPassword = Str::random(16);
                    
                    // Generate username from member name
                    $username = strtolower(str_replace(' ', '', $member->firstname . $member->lastname)) . $member->id;
                    // Ensure username is unique
                    $originalUsername = $username;
                    $counter = 1;
                    while (User::where('username', $username)->exists()) {
                        $username = $originalUsername . $counter;
                        $counter++;
                    }
                    
                    User::create([
                        'firstname' => $member->firstname,
                        'lastname' => $member->lastname,
                        'username' => $username,
                        'email' => $member->email,
                        'phone' => $member->mobile_phone ?? $member->landline_phone ?? '',
                        'password' => Hash::make($tempPassword),
                        'statut' => 1, // Active
                        'role_id' => 2, // Member role
                        'gym_id' => $gym_id,
                        'member_id' => $member->id,
                    ]);
                    
                    \Log::info('User record created for member: ' . $member->email . ' (ID: ' . $member->id . ')');
                } else {
                    // Update existing user with member_id if not already set
                    if (!$existingUser->member_id) {
                        $existingUser->member_id = $member->id;
                        $existingUser->save();
                        \Log::info('Updated existing user with member_id: ' . $member->email . ' (Member ID: ' . $member->id . ')');
                    } else {
                        \Log::info('User record already exists for member: ' . $member->email);
                    }
                }
            } catch (\Exception $e) {
                // Log error but don't fail member creation
                \Log::error('Failed to create User record for member ' . $member->id . ': ' . $e->getMessage());
            }

            // Automatically assign member to coach if created by a coach via coachapp endpoint
            if ($isCoach && $coach) {
                try {
                    // Deactivate any existing active assignments for this member
                    CoachAssignment::where('member_id', $member->id)
                        ->where('status', 'active')
                        ->update(['status' => 'inactive']);
                    
                    // Get dates for assignment
                    $today = now()->toDateString();
                    $startDate = $request['start_date'] ?? $today;
                    
                    // Create coach assignment
                    CoachAssignment::create([
                        'coach_id' => $coach->id,
                        'member_id' => $member->id,
                        'gym_id' => $gym_id,
                        'assigned_date' => $today,
                        'start_date' => $startDate,
                        'end_date' => $request['end_date'] ?? null,
                        'session_frequency' => 'Weekly',
                        'session_duration' => '60 minutes',
                        'goals' => !empty($request['goals']) ? $request['goals'] : 'General fitness improvement',
                        'special_requirements' => $request['medical_condition'] ?? null,
                        'status' => 'active',
                        'notes' => 'Member automatically assigned when created by coach',
                    ]);
                    
                    \Log::info('Member automatically assigned to coach', [
                        'member_id' => $member->id,
                        'coach_id' => $coach->id,
                        'gym_id' => $gym_id,
                    ]);
                } catch (\Exception $e) {
                    // Log error but don't fail member creation
                    \Log::error('Failed to auto-assign member to coach: ' . $e->getMessage(), [
                        'member_id' => $member->id,
                        'user_id' => $user->id ?? null,
                        'error' => $e->getTraceAsString(),
                    ]);
                }
            }

            // Generate password setup token and send invitation email if requested
            // Initialize email status tracking
            $emailSent = false;
            $emailError = null;
            $confirmationEmailSent = false;
            $confirmationEmailError = null;
            
            // Only send invitation email if send_invitation is true
            if ($request['send_invitation']) {
                try {
                    $setupToken = Str::random(60);
                    $member->update([
                        'password_setup_token' => $setupToken,
                        'password_setup_token_expires_at' => now()->addDays(7),
                        'password_setup_required' => true,
                    ]);

                    // Configure mail and validate configuration
                    $mailConfigSet = \App\Http\Controllers\BaseController::Set_config_mail();
                    
                    if (!$mailConfigSet) {
                        $emailError = 'Email configuration not found. Please configure mail settings in Settings → Mail Settings.';
                        $confirmationEmailError = 'Email configuration not found. Please configure mail settings in Settings → Mail Settings.';
                        \Log::error('Email configuration missing for member ' . $member->id . '. Please configure mail settings.');
                    } else {
                        // Send invitation email to member (synchronously - no queue)
                        try {
                            Mail::to($member->email)
                                ->send(new MemberPasswordSetupEmail($member, $setupToken));
                            $emailSent = true;
                            \Log::info('Invitation email sent to member: ' . $member->email . ' (ID: ' . $member->id . ')');
                        } catch (\Exception $e) {
                            // Log the full error for debugging
                            $errorMessage = $e->getMessage();
                            \Log::error('Failed to send invitation email to member ' . $member->id, [
                                'email' => $member->email,
                                'error' => $errorMessage,
                                'trace' => $e->getTraceAsString(),
                                'mail_config' => [
                                    'host' => config('mail.mailers.smtp.host'),
                                    'port' => config('mail.mailers.smtp.port'),
                                    'encryption' => config('mail.mailers.smtp.encryption'),
                                ]
                            ]);
                            
                            // Provide user-friendly error message with troubleshooting tips
                            if (strpos($errorMessage, 'Connection could not be established') !== false || 
                                strpos($errorMessage, 'stream_socket_client') !== false ||
                                strpos($errorMessage, 'SSL') !== false ||
                                strpos($errorMessage, 'forcibly closed') !== false ||
                                strpos($errorMessage, 'timed out') !== false) {
                                $emailError = 'Email server connection failed. Troubleshooting: 1) Try port 587 with TLS instead of 465 with SSL, 2) Check firewall allows outbound connections, 3) Verify credentials. Member was created successfully - you can resend the invitation email later.';
                            } else {
                                $emailError = 'Failed to send email: ' . $errorMessage;
                            }
                        }
                    }
                    
                    // Skip confirmation email to admin to avoid duplicate errors
                    // Admin can view new members in the system
                } catch (\Exception $emailException) {
                    // Log email failure but don't fail member creation
                    \Log::error('Failed to send email for member ' . $member->id . ': ' . $emailException->getMessage());
                    \Log::error('Email exception trace: ' . $emailException->getTraceAsString());
                    // Member is still created successfully, admin can resend email later
                }
            }

            // Create admin notifications for member creation
            try {
                // Get performedByUserId if current user is an admin
                $user = $request->user('api');
                $performedByUserId = null;
                if ($user && isset($user->role_id) && $user->role_id == 1) {
                    $performedByUserId = $user->id;
                }
                
                $query = \App\Models\User::where('role_id', 1);
                
                // Exclude the admin who created the member
                if ($performedByUserId) {
                    $query->where('id', '!=', $performedByUserId);
                }
                
                $adminUsers = $query->get();
                $memberName = trim(($member->firstname ?? '') . ' ' . ($member->lastname ?? ''));
                
                foreach ($adminUsers as $adminUser) {
                    \App\Models\AdminNotification::create([
                        'user_id' => $adminUser->id,
                        'gym_id' => $adminUser->gym_id ?? $member->gym_id ?? 1,
                        'type' => 'member_created',
                        'title' => 'New Member Created',
                        'message' => "A new member {$memberName} has been created. Password setup email sent to {$member->email}.",
                        'icon' => 'fa-user-plus',
                        'color' => 'success',
                        'related_type' => 'member',
                        'related_id' => $member->id,
                        'is_read' => false,
                    ]);
                }
            } catch (\Exception $e) {
                \Log::error('Failed to create notification for member ' . $member->id . ': ' . $e->getMessage());
                // Don't fail member creation if notification creation fails
            }

            // Create invoice if requested
            $invoice = null;
            if ($request['create_invoice'] && $plan) {
                $invoice = \App\Models\Invoice::create([
                    'invoice_number' => \App\Models\Invoice::generateInvoiceNumber(),
                    'member_id' => $member->id,
                    'subscription_plan_id' => $plan->id,
                    'amount' => $plan->price,
                    'description' => 'Membership fee for ' . $plan->name . ' plan (' . $plan->interval . ')',
                    'status' => 'pending',
                    'due_date' => now()->addDays(10), // Due in 10 days
                    'gym_id' => $gym_id,
                ]);
            }

            return response()->json([
                'success' => true,
                'member_id' => $member->id,
                'email_sent' => $emailSent,
                'email_error' => $emailError
            ]);
        } catch (\Exception $e) {
            \Log::error('Error creating member: ' . $e->getMessage());
            \Log::error('Request data: ' . json_encode($request->all()));
            
            $errorMessage = 'Error creating member.';
            if (strpos($e->getMessage(), 'max_allowed_packet') !== false) {
                $errorMessage = 'The profile image is too large. Please select a smaller image (under 500KB).';
            } else {
                $errorMessage = 'Error creating member: ' . $e->getMessage();
            }
            
            return response()->json(['success' => false, 'message' => $errorMessage], 500);
        }
    }

    //------------ function show -----------\\

    public function show(Request $request, $id){
        $this->authorizeForUser($request->user('api'), 'view', Client::class);
        
        $member = Member::where('deleted_at', '=', null)->findOrFail($id);
        
        // Format the member data for the frontend
        $data = [
            'id' => $member->id,
            'member_id' => 'M-' . date('Y') . '-' . str_pad($member->id, 5, '0', STR_PAD_LEFT),
            'membername' => $member->membername,
            'firstname' => $member->firstname,
            'lastname' => $member->lastname,
            'first_name' => $member->firstname,
            'last_name' => $member->lastname,
            'name' => $member->membername ?? $member->firstname . ' ' . $member->lastname,
            'email' => $member->email,
            'phone' => $member->phone ?? '',
            'mobile_phone' => $member->mobile_phone ?? '',
            'landline_phone' => $member->landline_phone ?? '',
            'landline' => $member->landline_phone ?? '',
            'language' => $member->language ?? '',
            'date_of_birth' => $member->date_of_birth,
            'birthday' => $member->date_of_birth,
            'dob' => $member->date_of_birth,
            'gender' => $member->gender,
            'sex' => $member->gender,
            'plan' => $member->plan,
            'subscription_plan_id' => $member->subscription_plan_id,
            'start_date' => $member->start_date ? $member->start_date : ($member->created_at ? $member->created_at->format('Y-m-d') : ''),
            'end_date' => $member->end_date ? $member->end_date : $member->Expires,
            'Expires' => $member->Expires,
            'Statuses' => $member->Statuses,
            'status' => $member->Statuses ?? 'active',
            'profile_image' => $member->profile_image,
            'gym_id' => $member->gym_id,
            'created_at' => $member->created_at,
            'member_since' => $member->member_since ?? $member->created_at,
            'client_since' => $member->created_at ? $member->created_at->format('Y-m-d') : '',
            'address' => $member->address ?? '',
            'street' => $member->address ?? '', // Alternative field name
            'city' => $member->city ?? '',
            'state' => $member->state ?? '',
            'province' => $member->state ?? '', // Alternative field name
            'zip' => $member->zipcode ?? '',
            'zipcode' => $member->zipcode ?? '',
            'zip_code' => $member->zipcode ?? '', // Alternative field name
            'postal_code' => $member->zipcode ?? '', // Alternative field name
            'country' => $member->country ?? '',
            // Height & weight - stored canonically as centimeters and kilograms
            'height' => $member->height ?? '',
            'weight' => $member->weight ?? '',
            // Helpful derived fields for consumers that prefer imperial units
            'height_cm' => $member->height ?? '',
            'height_in' => $member->height !== null
                ? round($member->height / 2.54, 2)
                : null,
            'weight_kg' => $member->weight ?? '',
            'weight_lb' => $member->weight !== null
                ? round($member->weight * 2.20462262, 2)
                : null,
            'preferred_length_unit' => $member->preferred_length_unit ?? 'inches',
            'preferred_weight_unit' => $member->preferred_weight_unit ?? 'pounds',
            'height_feet' => $member->height_feet ?? null,
            'height_inches' => $member->height_inches ?? null,
            'medical_condition' => $member->medical_condition ?? '',
            'medical' => $member->medical_condition ?? '',
            'contact_name' => $member->contact_name ?? '',
            'contact_phone' => $member->contact_phone ?? '',
            'emergency_name' => $member->contact_name ?? '',
            'emergency_phone' => $member->contact_phone ?? '',
            // Bank details
            'bank_account_number' => $member->masked_bank_account_number ?? '',
            'bank_account_type' => $member->bank_account_type ?? '',
            'bank_account_holder_name' => $member->masked_bank_account_holder_name ?? '',
            'bank_name' => $member->bank_name ?? '',
            'routing_number' => $member->masked_routing_number ?? '',
            'mandate_id' => $member->mandate_id ?? '',
            'exclude_from_online_payments' => $member->exclude_from_online_payments ?? false,
            'tags' => $member->tags ?? [],
            // Additional fields
            'own_member_id' => $member->own_member_id ?? '',
            'custom_export_field' => $member->custom_export_field ?? '',
            'subscription_reason' => $member->subscription_reason ?? '',
            'source' => $member->source ?? '',
            'is_business' => $member->is_business ?? 'No',
            'hasBusiness' => $member->is_business ?? 'No',
            'business_type' => $member->business_type ?? '',
            'extra_address' => $member->extra_address ?? '',
            // Pro membership fields
            'pro_membership' => $member->pro_membership ?? false,
            'pro_start_date' => $member->pro_start_date ?? null,
            'pro_end_date' => $member->pro_end_date ?? null,
        ];
        
        // Sanitize all data before encoding to JSON to prevent UTF-8 encoding errors
        $data = $this->sanitizeUtf8($data);
        
        return response()->json([
            'success' => true,
            'client' => $data
        ]);
    }

    //------------ Get Full Member Details for Editing (with unmasked sensitive data) -----------\\
    public function getFullDetails(Request $request, $id)
    {
        $user = $request->user('api') ?? $request->get('auth_user') ?? Auth::guard('api')->user();
        $assignmentData = null; // Initialize assignment data variable
        
        // Check if user is a coach (role_id = 3)
        if ($user && isset($user->role_id) && $user->role_id === 3) {
            // For coaches, check if the member is assigned to them
            $member = Member::where('deleted_at', '=', null)->findOrFail($id);
            
            // Get the coach ID from the user
            $coach = Coach::where('email', $user->email)->first();
            if (!$coach && Schema::hasColumn('coaches', 'user_id')) {
                $coach = Coach::where('user_id', $user->id)->first();
            }
            
            if ($coach) {
                // Check if member is assigned to this coach
                $assignment = CoachAssignment::where('coach_id', $coach->id)
                    ->where('member_id', $member->id)
                    ->where('status', 'active')
                    ->with(['coach:id,first_name,last_name'])
                    ->first();
                
                if (!$assignment) {
                    return response()->json([
                        'success' => false,
                        'message' => 'You are not authorized to view this member\'s details. Member is not assigned to you.',
                    ], 403);
                }
                
                // Store assignment data for later use in response
                $assignmentData = [
                    'assigned_date' => $assignment->assigned_date,
                    'session_frequency' => $assignment->session_frequency,
                    'session_duration' => $assignment->session_duration,
                    'goals' => $assignment->goals,
                    'special_requirements' => $assignment->special_requirements,
                    'coach_name' => $assignment->coach ? trim($assignment->coach->first_name . ' ' . $assignment->coach->last_name) : null,
                ];
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach profile not found',
                ], 404);
            }
        } else {
            // For non-coaches (admins, etc.), use normal authorization
            $this->authorizeForUser($user, 'view', Client::class);
            $member = Member::where('deleted_at', '=', null)->findOrFail($id);
            
            // For admins, also try to get assignment data if available
            // Get the most recent active assignment
            $assignment = CoachAssignment::where('member_id', $member->id)
                ->where('status', 'active')
                ->with(['coach:id,first_name,last_name'])
                ->orderBy('assigned_date', 'desc')
                ->first();
            
            if ($assignment) {
                $assignmentData = [
                    'assigned_date' => $assignment->assigned_date,
                    'session_frequency' => $assignment->session_frequency,
                    'session_duration' => $assignment->session_duration,
                    'goals' => $assignment->goals,
                    'special_requirements' => $assignment->special_requirements,
                    'coach_name' => $assignment->coach ? trim($assignment->coach->first_name . ' ' . $assignment->coach->last_name) : null,
                ];
            }
        }
        
        // Format the member data for editing (with full sensitive data)
        $data = [
            'id' => $member->id,
            'member_id' => 'M-' . date('Y') . '-' . str_pad($member->id, 5, '0', STR_PAD_LEFT),
            'membername' => $member->membername,
            'firstname' => $member->firstname,
            'lastname' => $member->lastname,
            'first_name' => $member->firstname,
            'last_name' => $member->lastname,
            'name' => $member->membername ?? $member->firstname . ' ' . $member->lastname,
            'email' => $member->email,
            'phone' => $member->phone ?? '',
            'mobile_phone' => $member->mobile_phone ?? '',
            'landline_phone' => $member->landline_phone ?? '',
            'landline' => $member->landline_phone ?? '',
            'language' => $member->language ?? '',
            'date_of_birth' => $member->date_of_birth,
            'birthday' => $member->date_of_birth,
            'dob' => $member->date_of_birth,
            'gender' => $member->gender,
            'sex' => $member->gender,
            'plan' => $member->plan,
            'subscription_plan_id' => $member->subscription_plan_id,
            'start_date' => $member->start_date ? $member->start_date : ($member->created_at ? $member->created_at->format('Y-m-d') : ''),
            'end_date' => $member->end_date ? $member->end_date : $member->Expires,
            'Expires' => $member->Expires,
            'Statuses' => $member->Statuses,
            'status' => $member->Statuses ?? 'active',
            'profile_image' => $member->profile_image,
            'gym_id' => $member->gym_id,
            'created_at' => $member->created_at ? ($member->created_at instanceof \Carbon\Carbon ? $member->created_at->toISOString() : (is_string($member->created_at) ? $member->created_at : $member->created_at->format('Y-m-d H:i:s'))) : null,
            'member_since' => $member->member_since ?? $member->created_at,
            'client_since' => $member->created_at ? ($member->created_at instanceof \Carbon\Carbon ? $member->created_at->format('Y-m-d') : (is_string($member->created_at) ? substr($member->created_at, 0, 10) : '')) : '',
            'password_setup_token' => $member->password_setup_token ?? null,
            'password_setup_token_expires_at' => $member->password_setup_token_expires_at ? ($member->password_setup_token_expires_at instanceof \Carbon\Carbon ? $member->password_setup_token_expires_at->toISOString() : (is_string($member->password_setup_token_expires_at) ? $member->password_setup_token_expires_at : $member->password_setup_token_expires_at->format('Y-m-d H:i:s'))) : null,
            'password_setup_required' => $member->password_setup_required ?? false,
            'password_hash' => $member->password_hash ? '***' : null, // Return a placeholder if password is set, null if not set
            'has_password' => !empty($member->password_hash), // Boolean to indicate if password is set
            'address' => $member->address ?? '',
            'street' => $member->address ?? '', // Alternative field name
            'city' => $member->city ?? '',
            'state' => $member->state ?? '',
            'province' => $member->state ?? '', // Alternative field name
            'zip' => $member->zipcode ?? '',
            'zipcode' => $member->zipcode ?? '',
            'zip_code' => $member->zipcode ?? '', // Alternative field name
            'postal_code' => $member->zipcode ?? '', // Alternative field name
            'country' => $member->country ?? '',
            'height' => $member->height ?? '',
            'weight' => $member->weight ?? '',
            'preferred_length_unit' => $member->preferred_length_unit ?? 'inches',
            'preferred_weight_unit' => $member->preferred_weight_unit ?? 'pounds',
            'height_feet' => $member->height_feet ?? null,
            'height_inches' => $member->height_inches ?? null,
            'medical_condition' => $member->medical_condition ?? '',
            'medical' => $member->medical_condition ?? '',
            'contact_name' => $member->contact_name ?? '',
            'contact_phone' => $member->contact_phone ?? '',
            'emergency_name' => $member->contact_name ?? '',
            'emergency_phone' => $member->contact_phone ?? '',
            // Bank details (FULL - unmasked for editing)
            'bank_account_number' => $member->bank_account_number ?? '',
            'bank_account_type' => $member->bank_account_type ?? '',
            'bank_account_holder_name' => $member->bank_account_holder_name ?? '',
            'bank_name' => $member->bank_name ?? '',
            'routing_number' => $member->routing_number ?? '',
            'mandate_id' => $member->mandate_id ?? '',
            'exclude_from_online_payments' => $member->exclude_from_online_payments ?? false,
            'tags' => $member->tags ?? [],
            // Additional fields
            'own_member_id' => $member->own_member_id ?? '',
            'custom_export_field' => $member->custom_export_field ?? '',
            'subscription_reason' => $member->subscription_reason ?? '',
            'source' => $member->source ?? '',
            'is_business' => $member->is_business ?? 'No',
            'hasBusiness' => $member->is_business ?? 'No',
            'business_type' => $member->business_type ?? '',
            'extra_address' => $member->extra_address ?? '',
            // Pro membership fields
            'pro_membership' => $member->pro_membership ?? false,
            'pro_start_date' => $member->pro_start_date ?? null,
            'pro_end_date' => $member->pro_end_date ?? null,
        ];
        
        // Add assignment data if available (for coaches)
        if (isset($assignmentData)) {
            $data['assigned_date'] = $assignmentData['assigned_date'] ? $assignmentData['assigned_date']->format('Y-m-d') : null;
            $data['session_frequency'] = $assignmentData['session_frequency'] ?? null;
            $data['session_duration'] = $assignmentData['session_duration'] ?? null;
            $data['goals'] = $assignmentData['goals'] ?? null;
            $data['special_requirements'] = $assignmentData['special_requirements'] ?? null;
            $data['coach_name'] = $assignmentData['coach_name'] ?? null;
        }
        
        // Add fitness goals data if available (separate from assignment goals)
        $fitnessGoals = MemberGoal::where('member_id', $id)
            ->where('is_active', 1)
            ->get()
            ->map(function ($goal) {
                return [
                    'id' => $goal->id,
                    'goal_type' => $goal->goal_type,
                    'goal_frequency' => $goal->goal_frequency,
                    'target_value' => $goal->target_value,
                    'target_unit' => $goal->target_unit,
                    'target_description' => $goal->target_description,
                    'current_streak' => $goal->current_streak,
                    'longest_streak' => $goal->longest_streak,
                    'progress_percentage' => $goal->getProgressPercentage(),
                ];
            });
        
        $data['fitness_goals'] = $fitnessGoals;
        
        // Sanitize all data before encoding to JSON to prevent UTF-8 encoding errors
        $data = $this->sanitizeUtf8($data);
        
        return response()->json([
            'success' => true,
            'data' => $data,
            'member' => $data // Also include for backward compatibility
        ]);
    }

    //------------- Update Customer -------------\\

    public function update(Request $request, $id)
    {
        $user = $request->user('api') ?? $request->user();
        
        // Check if user is a coach (role_id = 3)
        if ($user && isset($user->role_id) && $user->role_id === 3) {
            // For coaches, check if member is assigned to them
            // Find coach by email (most reliable method)
            $coach = \App\Models\Coach::where('email', $user->email)->first();
            
            if ($coach) {
                // Check if member is assigned to this coach
                $assignment = \App\Models\CoachAssignment::where('member_id', $id)
                    ->where('coach_id', $coach->id)
                    ->first();
                
                if (!$assignment) {
                    return response()->json([
                        'success' => false,
                        'message' => 'You are not authorized to update this member. Member is not assigned to you.',
                    ], 403);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach profile not found',
                ], 404);
            }
        } else {
            // For non-coaches (admins, etc.), use normal authorization
            $this->authorizeForUser($user, 'update', Client::class);
        }
        
        // Build validation rules conditionally - only validate fields that are being updated
        // This allows partial updates (e.g., only updating Pro membership fields)
        $validationRules = [];
        
        // Normalize zipcode fields - convert null/empty/arrays/objects to null, convert other types to string
        // This prevents validation errors when frontend sends null, empty, or non-string values
        $normalizedData = $request->all();
        
        $normalizeZipcode = function($value) {
            // Handle null, empty string, or string "null"
            if ($value === null || $value === '' || $value === 'null') {
                return null;
            }
            // Handle arrays or objects - set to null
            if (is_array($value) || is_object($value)) {
                return null;
            }
            // Convert to string if it's a scalar type (number, boolean, etc.)
            if (is_scalar($value)) {
                return (string) $value;
            }
            // For any other type, return null
            return null;
        };
        
        if (isset($normalizedData['zipcode'])) {
            $normalizedData['zipcode'] = $normalizeZipcode($normalizedData['zipcode']);
        }
        if (isset($normalizedData['zip_code'])) {
            $normalizedData['zip_code'] = $normalizeZipcode($normalizedData['zip_code']);
        }
        if (isset($normalizedData['postal_code'])) {
            $normalizedData['postal_code'] = $normalizeZipcode($normalizedData['postal_code']);
        }
        
        // Replace request data with normalized data
        // This ensures zipcode fields are either null or string before validation
        $request->merge($normalizedData);
        
        // Only require membername and email if they're being updated
        if ($request->has('membername')) {
            $validationRules['membername'] = 'required';
        }
        if ($request->has('email')) {
            $validationRules['email'] = 'required|email';
        }
        
        // Add validation for other fields if they're present
        if ($request->has('firstname')) {
            $validationRules['firstname'] = 'nullable|string|max:255';
        }
        if ($request->has('lastname')) {
            $validationRules['lastname'] = 'nullable|string|max:255';
        }
        if ($request->has('first_name')) {
            $validationRules['first_name'] = 'nullable|string|max:255';
        }
        if ($request->has('last_name')) {
            $validationRules['last_name'] = 'nullable|string|max:255';
        }
        // Note: 'phone' column doesn't exist in database, it's mapped to 'mobile_phone'
        if ($request->has('phone')) {
            $validationRules['mobile_phone'] = 'nullable|string';
        }
        if ($request->has('plan')) {
            $validationRules['plan'] = 'nullable|numeric';
        }
        if ($request->has('Expires')) {
            $validationRules['Expires'] = 'nullable|date';
        }
        if ($request->has('Statuses')) {
            $validationRules['Statuses'] = 'nullable|string';
        }
        if ($request->has('profile_image')) {
            $validationRules['profile_image'] = 'nullable|string';
        }
        if ($request->has('date_of_birth')) {
            $validationRules['date_of_birth'] = 'nullable|date';
        }
        if ($request->has('gender')) {
            $validationRules['gender'] = 'nullable|string';
        }
        if ($request->has('address')) {
            $validationRules['address'] = 'nullable|string';
        }
        if ($request->has('city')) {
            $validationRules['city'] = 'nullable|string';
        }
        if ($request->has('zipcode')) {
            // After normalization, zipcode is either null or a string, so nullable|string is safe
            $validationRules['zipcode'] = 'nullable|string|max:20';
        }
        if ($request->has('zip_code')) {
            $validationRules['zip_code'] = 'nullable|string';
        }
        if ($request->has('postal_code')) {
            $validationRules['postal_code'] = 'nullable|string';
        }
        if ($request->has('state')) {
            $validationRules['state'] = 'nullable|string';
        }
        if ($request->has('province')) {
            $validationRules['province'] = 'nullable|string';
        }
        if ($request->has('country')) {
            $validationRules['country'] = 'nullable|string|max:100';
        }
        if ($request->has('street')) {
            $validationRules['street'] = 'nullable|string';
        }
        if ($request->has('bank_account_number')) {
            $validationRules['bank_account_number'] = 'nullable|string';
        }
        if ($request->has('bank_account')) {
            $validationRules['bank_account'] = 'nullable|string';
        }
        if ($request->has('routing_number')) {
            $validationRules['routing_number'] = 'nullable|string';
        }
        if ($request->has('bank_routing_number')) {
            $validationRules['bank_routing_number'] = 'nullable|string';
        }
        if ($request->has('bank_name')) {
            $validationRules['bank_name'] = 'nullable|string';
        }
        if ($request->has('account_holder_name')) {
            $validationRules['account_holder_name'] = 'nullable|string';
        }
        if ($request->has('bank_account_holder')) {
            $validationRules['bank_account_holder'] = 'nullable|string';
        }
        if ($request->has('goals')) {
            $validationRules['goals'] = 'nullable|string';
        }
        if ($request->has('height')) {
            $validationRules['height'] = 'nullable|numeric';
        }
        if ($request->has('weight')) {
            $validationRules['weight'] = 'nullable|numeric';
        }
        if ($request->has('medical_condition')) {
            $validationRules['medical_condition'] = 'nullable|string';
        }
        if ($request->has('contact_name')) {
            $validationRules['contact_name'] = 'nullable|string';
        }
        if ($request->has('contact_phone')) {
            $validationRules['contact_phone'] = 'nullable';
        }
        if ($request->has('language')) {
            $validationRules['language'] = 'nullable|string|max:50';
        }
        
        // Validate Pro membership fields if present
        if ($request->has('pro_membership')) {
            $validationRules['pro_membership'] = 'nullable|boolean';
        }
        if ($request->has('pro_start_date')) {
            $validationRules['pro_start_date'] = 'nullable|date';
        }
        if ($request->has('pro_end_date')) {
            $validationRules['pro_end_date'] = 'nullable|date';
        }
        
        // Only validate if there are rules to validate
        if (!empty($validationRules)) {
            $this->validate($request, $validationRules);
        }

        // Handle profile image - convert base64 to file if needed
        $profileImage = $request['profile_image'];
        if ($request['profile_image']) {
            try {
                $member = Member::find($id);
                
                // Check if it's a base64 data URI
                if (preg_match('/^data:image\/(\w+);base64,/', $request['profile_image'], $matches)) {
                    // Delete old image if exists (only if it's a file, not base64)
                    if ($member && $member->profile_image && !Str::startsWith($member->profile_image, 'data:image/')) {
                        $oldImagePath = public_path('images/avatar/' . $member->profile_image);
                        if (file_exists($oldImagePath)) {
                            @unlink($oldImagePath);
                        }
                    }
                    
                    // Convert base64 to file
                    $imageData = $request['profile_image'];
                    $imageData = str_replace('data:image/' . $matches[1] . ';base64,', '', $imageData);
                    $imageData = base64_decode($imageData);
                    
                    // Validate decoded data
                    if ($imageData === false) {
                        throw new \Exception('Failed to decode base64 image data');
                    }
                    
                    // Check file size (limit to ~2MB after decoding)
                    if (strlen($imageData) > 2097152) { // 2MB
                        \Log::warning('Profile image too large, skipping: ' . strlen($imageData) . ' bytes');
                        $profileImage = $member ? $member->profile_image : null; // Keep old image
                    } else {
                        // Generate unique filename
                        $extension = $matches[1] === 'jpeg' ? 'jpg' : $matches[1];
                        $filename = 'member_' . time() . '_' . uniqid() . '.' . $extension;
                        
                        // Create directory if it doesn't exist
                        $uploadPath = public_path('images/avatar');
                        if (!file_exists($uploadPath)) {
                            mkdir($uploadPath, 0755, true);
                        }
                        
                        // Save the file
                        file_put_contents($uploadPath . '/' . $filename, $imageData);
                        $profileImage = $filename;
                    }
                }
                // If it's already a file path (not base64), use it as is
                // No need to delete old file if the new one is the same
            } catch (\Exception $e) {
                \Log::error('Profile image update failed: ' . $e->getMessage());
                // Keep existing image on error
                if (isset($member) && $member->profile_image) {
                    $profileImage = $member->profile_image;
                }
            }
        }

        // Handle firstname and lastname - support both naming conventions
        // Only include if they have values (not null, not empty string)
        $firstname = $request['firstname'] ?? $request['first_name'] ?? null;
        $lastname = $request['lastname'] ?? $request['last_name'] ?? null;

        // Get existing member data for required fields if not provided
        $member = Member::find($id);
        if (!$member) {
            return response()->json(['success' => false, 'message' => 'Member not found'], 404);
        }

        // Build update data - only include fields that are provided in the request
        // Required fields (membername, email) are always included using existing values if not provided
        $updateData = [
            'membername' => $request->has('membername') ? $request['membername'] : $member->membername,
            'email' => $request->has('email') ? $request['email'] : $member->email,
        ];
        
        // Only add optional fields if they're present in the request
        // Note: 'phone' column doesn't exist in database, it will be mapped to mobile_phone
        $optionalFields = [
            'mobile_phone', 'landline_phone', 'phone', 'phone_number', 'language', 'date_of_birth', 'gender',
            'Expires', 'Statuses', 'address', 'street', 'city', 'zipcode', 'zip_code', 'postal_code', 
            'state', 'province', 'country', 'height', 'weight',
            'preferred_length_unit', 'preferred_weight_unit', 'height_feet', 'height_inches',
            'medical_condition', 'contact_name', 'contact_phone', 'start_date', 'end_date',
            'bank_account_number', 'bank_account', 'bank_account_type', 'bank_account_holder_name',
            'account_holder_name', 'bank_account_holder', 'bank_name', 'routing_number', 
            'bank_routing_number', 'mandate_id', 'exclude_from_online_payments',
            'own_member_id', 'custom_export_field', 'subscription_reason', 'source',
            'is_business', 'hasBusiness', 'business_type', 'extra_address',
            'pro_membership', 'pro_start_date', 'pro_end_date', 'goals'
        ];
        
        foreach ($optionalFields as $field) {
            if ($request->has($field)) {
                if ($field === 'hasBusiness') {
                    // Handle hasBusiness as is_business
                    $updateData['is_business'] = $request['hasBusiness'];
                } elseif ($field === 'zip_code' || $field === 'postal_code') {
                    // Map zip_code and postal_code to zipcode
                    // Only set if value is not empty, otherwise set to null
                    $value = $request[$field];
                    $updateData['zipcode'] = (!empty($value) && trim($value) !== '') ? trim($value) : null;
                } elseif ($field === 'zipcode') {
                    // Handle zipcode directly (database column name)
                    // Only set if value is not empty, otherwise set to null
                    $value = $request[$field];
                    $updateData['zipcode'] = (!empty($value) && trim($value) !== '') ? trim($value) : null;
                } elseif ($field === 'country') {
                    // Handle country - only set if value is not empty, otherwise set to null
                    $value = $request[$field];
                    $updateData['country'] = (!empty($value) && trim($value) !== '') ? trim($value) : null;
                } elseif ($field === 'province') {
                    // Map province to state
                    $updateData['state'] = $request[$field];
                } elseif ($field === 'street') {
                    // Map street to address
                    $updateData['address'] = $request[$field];
                } elseif ($field === 'phone_number') {
                    // Map phone_number to mobile_phone (phone column doesn't exist in DB)
                    $updateData['mobile_phone'] = $request[$field];
                } elseif ($field === 'phone') {
                    // Map phone to mobile_phone (phone column doesn't exist in DB)
                    $updateData['mobile_phone'] = $request[$field];
                } elseif ($field === 'mobile_phone') {
                    // mobile_phone exists in database, use it directly
                    $updateData['mobile_phone'] = $request[$field];
                } elseif ($field === 'bank_account') {
                    // Map bank_account to bank_account_number
                    $updateData['bank_account_number'] = $request[$field];
                } elseif ($field === 'bank_routing_number') {
                    // Map bank_routing_number to routing_number
                    $updateData['routing_number'] = $request[$field];
                } elseif ($field === 'account_holder_name' || $field === 'bank_account_holder') {
                    // Map account_holder_name and bank_account_holder to bank_account_holder_name
                    $updateData['bank_account_holder_name'] = $request[$field];
                } else {
                    $updateData[$field] = $request[$field];
                }
            }
        }
        
        // Handle profile_image separately (may be set from processing above)
        if (isset($profileImage)) {
            $updateData['profile_image'] = $profileImage;
        }
        
        // Remove 'phone' from updateData if it exists (column doesn't exist in database)
        // Only mobile_phone and landline_phone columns exist
        if (isset($updateData['phone'])) {
            unset($updateData['phone']);
        }
        
        // Handle height conversion - convert to cm for storage
        if ($request->has('height') || $request->has('height_feet')) {
            $updateData['height'] = $this->convertHeightToCm($request);
        }
        
        // Handle weight conversion - convert to kg for storage
        if ($request->has('weight')) {
            $updateData['weight'] = $this->convertWeightToKg($request);
        }
        
        // Handle preferred_length_unit and preferred_weight_unit defaults if not provided but other fields are
        if (!isset($updateData['preferred_length_unit']) && ($request->has('height') || $request->has('height_feet'))) {
            $updateData['preferred_length_unit'] = $request->preferred_length_unit ?? $member->preferred_length_unit ?? 'inches';
        }
        if (!isset($updateData['preferred_weight_unit']) && $request->has('weight')) {
            $updateData['preferred_weight_unit'] = $request->preferred_weight_unit ?? $member->preferred_weight_unit ?? 'pounds';
        }

        // Add firstname and lastname only if they have values
        if ($firstname !== null && $firstname !== '') {
            $updateData['firstname'] = $firstname;
        }
        if ($lastname !== null && $lastname !== '') {
            $updateData['lastname'] = $lastname;
        }

        // Handle tags if provided
        if ($request->has('tags')) {
            $updateData['tags'] = $request['tags'];
        }

        // Handle subscription_plan_id update
        if ($request->has('subscription_plan_id')) {
            $subscriptionPlanId = $request['subscription_plan_id'];
            if ($subscriptionPlanId !== null && $subscriptionPlanId !== '' && $subscriptionPlanId !== '0') {
                $subscriptionPlanId = (int)$subscriptionPlanId;
                
                // Validate that the plan exists before updating (using Plan model from plans table)
                try {
                    $plan = Plan::find($subscriptionPlanId);
                    if ($plan) {
                        // Plan exists, safe to update
                        $updateData['subscription_plan_id'] = $subscriptionPlanId;
                        $updateData['plan'] = $plan->name;
                        \Log::info("Setting plan for member {$id}: subscription_plan_id={$subscriptionPlanId}, plan={$plan->name}");
                    } else {
                        // Plan doesn't exist, log warning and don't update subscription_plan_id
                        \Log::warning("Plan ID {$subscriptionPlanId} not found, skipping subscription_plan_id update for member {$id}");
                        // Don't update subscription_plan_id if plan doesn't exist
                    }
                } catch (\Exception $e) {
                    // If there's an error checking the plan, log it and don't update
                    \Log::error("Error checking plan ID {$subscriptionPlanId}: " . $e->getMessage());
                }
            } else {
                // Allow clearing the plan
                $updateData['subscription_plan_id'] = null;
                // Don't clear plan field if it's not explicitly requested
            }
        } elseif ($request->has('plan') && $request['plan'] && $request['plan'] !== '0' && $request['plan'] !== '') {
            // Backward compatibility: if plan name is provided, try to find the ID
            $planName = $request['plan'];
            $plan = Plan::where('name', $planName)->first();
            if ($plan) {
                $updateData['subscription_plan_id'] = $plan->id;
                $updateData['plan'] = $plan->name;
            } else {
                // If plan name not found, just set the plan name as provided
                $updateData['plan'] = $planName;
            }
        }
        // If neither subscription_plan_id nor plan is provided, don't update plan field (preserves existing value)
        
        // Remove plan from updateData if it's empty, 0, or null to prevent overwriting with invalid value
        if (isset($updateData['plan']) && ($updateData['plan'] === '' || $updateData['plan'] === '0' || $updateData['plan'] === 0 || $updateData['plan'] === null)) {
            unset($updateData['plan']);
        }
        
        \Log::info("Updating member {$id} with subscription_plan_id and plan: " . json_encode([
            'subscription_plan_id' => $updateData['subscription_plan_id'] ?? 'not set',
            'plan' => $updateData['plan'] ?? 'not set'
        ]));

        // Check if Pro membership is being activated (before update)
        $memberBeforeUpdate = Member::find($id);
        $wasProMember = $memberBeforeUpdate && ($memberBeforeUpdate->pro_membership === true);
        
        // Pro membership is being activated if:
        // 1. pro_membership is being set to true
        // 2. Member didn't have active Pro membership before (was false or null)
        // 3. pro_start_date is being set
        $isActivatingPro = isset($updateData['pro_membership']) && 
                           $updateData['pro_membership'] === true && 
                           !$wasProMember &&
                           isset($updateData['pro_start_date']) &&
                           !empty($updateData['pro_start_date']);

        Member::whereId($id)->update($updateData);
        
        // Update corresponding User record with member_id
        try {
            $member = Member::find($id);
            if ($member) {
                $user = User::where('email', $member->email)
                    ->where('role_id', 2)
                    ->first();
                
                if ($user) {
                    // Update member_id if not already set or if member was updated
                    if (!$user->member_id || $user->member_id != $member->id) {
                        $user->member_id = $member->id;
                        $user->save();
                        \Log::info('Updated User record with member_id: ' . $member->email . ' (Member ID: ' . $member->id . ')');
                    }
                }
                
                // Send Pro membership activation email if this is a new activation
                if ($isActivatingPro && $member->email) {
                    try {
                        Mail::to($member->email)->send(new ProMembershipActivationEmail($member));
                        \Log::info('Pro membership activation email sent to member: ' . $member->email . ' (Member ID: ' . $member->id . ')');
                    } catch (\Exception $e) {
                        // Log error but don't fail the update
                        \Log::error('Failed to send Pro membership activation email to member ' . $member->id . ': ' . $e->getMessage());
                    }
                }
            }
        } catch (\Exception $e) {
            // Log error but don't fail member update
            \Log::error('Failed to update User record with member_id for member ' . $id . ': ' . $e->getMessage());
        }
        
        return response()->json(['success' => true]);

    }

    //------------- delete client -------------\\

    public function destroy(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'delete', Client::class);

        try {
            $member = Member::find($id);
            
            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found'
                ], 404);
            }

            // Use soft delete
            $member->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Member deleted successfully'
            ]);
        } catch (\Exception $e) {
            \Log::error('Error deleting member: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error deleting member'
            ], 500);
        }
    }

    //-------------- Delete by selection  ---------------\\

    public function delete_by_selection(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'delete', Client::class);
        
        try {
            $selectedIds = $request->selectedIds;
            $deletedCount = 0;

            foreach ($selectedIds as $member_id) {
                $member = Member::find($member_id);
                if ($member) {
                    $member->delete(); // Use soft delete
                    $deletedCount++;
                }
            }
            
            return response()->json([
                'success' => true,
                'message' => "Successfully deleted {$deletedCount} member(s)"
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in bulk delete: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error deleting members'
            ], 500);
        }
    }


    //------------- get Number Order Customer -------------\\

    public function getNumberOrder()
    {
        $last = DB::table('clients')->latest('id')->first();

        if ($last) {
            $code = $last->code + 1;
        } else {
            $code = 1;
        }
        return $code;
    }

    //------------- Get Clients Without Paginate -------------\\

    public function Get_Clients_Without_Paginate(Request $request)
    {

        $gymId = $request->user('api')->gym_id ;

        if (!$gymId) {
            return response()->json([
                'success' => false,
                'message' => 'User not associated with any gym'
            ], 400);
        }   
        $clients = Member::where('gym_id', '=', $gymId)->where('deleted_at', '=', null)->get();
        return response()->json($clients);
    }

    // import clients
    public function import_clients(Request $request)
    {
        $file_upload = $request->file('clients');
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
           
            $rules = array('name' => 'required');

            //-- Create New Client
            foreach ($data as $key => $value) {
                $input['name'] = $value['name'];

                $validator = Validator::make($input, $rules);
                if (!$validator->fails()) {
                    
                    Client::create([
                        'name' => $value['name'],
                        'code' => $this->getNumberOrder(),
                        'adresse' => $value['adresse'] == '' ? null : $value['adresse'],
                        'phone' => $value['phone'] == '' ? null : $value['phone'],
                        'email' => $value['email'] == '' ? null : $value['email'],
                        'country' => $value['country'] == '' ? null : $value['country'],
                        'city' => $value['city'] == '' ? null : $value['city'],
                        'tax_number' => $value['tax_number'] == '' ? null : $value['tax_number'],
                    ]);

                }
               

            }

            return response()->json([
                'status' => true,
            ], 200);
        }

    }


     //------------- clients_pay_due -------------\\

     public function clients_pay_due(Request $request)
     {
         $this->authorizeForUser($request->user('api'), 'pay_due', Client::class);
        
         if($request['amount'] > 0){
            $client_sales_due = Sale::where('deleted_at', '=', null)
            ->where([
                ['payment_statut', '!=', 'paid'],
                ['client_id', $request->client_id]
            ])->get();

            $paid_amount_total = $request->amount;

            foreach($client_sales_due as $key => $client_sale){
                if($paid_amount_total == 0)
                break;
                $due = $client_sale->GrandTotal  - $client_sale->paid_amount;

                if($paid_amount_total >= $due){
                    $amount = $due;
                    $payment_status = 'paid';
                }else{
                    $amount = $paid_amount_total;
                    $payment_status = 'partial';
                }

                // PaymentSale table dropped - payment record creation disabled
                // $payment_sale = new PaymentSale();
                // $payment_sale->sale_id = $client_sale->id;
                // $payment_sale->Ref = app('App\Http\Controllers\PaymentSalesController')->getNumberOrder();
                // $payment_sale->date = Carbon::now();
                // $payment_sale->Reglement = $request['Reglement'];
                // $payment_sale->montant = $amount;
                // $payment_sale->change = 0;
                // $payment_sale->notes = $request['notes'];
                // $payment_sale->user_id = Auth::user()->id;
                // $payment_sale->save();

                $client_sale->paid_amount += $amount;
                $client_sale->payment_statut = $payment_status;
                $client_sale->save();

                $paid_amount_total -= $amount;
            }
        }
        
         return response()->json(['success' => true]);
 
     }

    //------------- clients_pay_sale_return_due -------------\\

    public function pay_sale_return_due(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'pay_sale_return_due', Client::class);
        
        if($request['amount'] > 0){
            $client_sell_return_due = SaleReturn::where('deleted_at', '=', null)
            ->where([
                ['payment_statut', '!=', 'paid'],
                ['client_id', $request->client_id]
            ])->get();

            $paid_amount_total = $request->amount;

            foreach($client_sell_return_due as $key => $client_sale_return){
                if($paid_amount_total == 0)
                break;
                $due = $client_sale_return->GrandTotal  - $client_sale_return->paid_amount;

                if($paid_amount_total >= $due){
                    $amount = $due;
                    $payment_status = 'paid';
                }else{
                    $amount = $paid_amount_total;
                    $payment_status = 'partial';
                }

                // PaymentSaleReturns table dropped - payment record creation disabled
                // $payment_sale_return = new PaymentSaleReturns();
                // $payment_sale_return->sale_return_id = $client_sale_return->id;
                // $payment_sale_return->Ref = app('App\Http\Controllers\PaymentSaleReturnsController')->getNumberOrder();
                // $payment_sale_return->date = Carbon::now();
                // $payment_sale_return->Reglement = $request['Reglement'];
                // $payment_sale_return->montant = $amount;
                // $payment_sale_return->change = 0;
                // $payment_sale_return->notes = $request['notes'];
                // $payment_sale_return->user_id = Auth::user()->id;
                // $payment_sale_return->save();

                $client_sale_return->paid_amount += $amount;
                $client_sale_return->payment_statut = $payment_status;
                $client_sale_return->save();

                $paid_amount_total -= $amount;
            }
        }
        
        return response()->json(['success' => true]);

    }

    //------------- Create Task for Member -------------\\
    public function createTask(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', Client::class);
        
        // Validate request with better error messages
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'priority' => 'required|string|in:Low,Medium,High,Urgent,low,medium,high,urgent',
            'dueDate' => 'required|date',
            'description' => 'nullable|string',
            'assignedTo' => 'nullable|integer|exists:users,id',
            'status' => 'required|string|in:pending,in-progress,completed,cancelled',
            'member_id' => 'nullable|integer',
            'task_type' => 'nullable|string|in:member,coach'
        ], [
            'title.required' => 'Task name is required. Please enter a task name.',
            'title.string' => 'Task name must be text.',
            'title.max' => 'Task name cannot exceed 255 characters.',
            'category.required' => 'Category is required. Please select a category.',
            'priority.required' => 'Priority is required. Please select a priority level.',
            'priority.in' => 'Priority must be one of: Low, Medium, High, or Urgent.',
            'dueDate.required' => 'Due date is required. Please select a due date.',
            'dueDate.date' => 'Due date must be a valid date.',
            'status.required' => 'Status is required.',
            'status.in' => 'Status must be one of: pending, in-progress, completed, or cancelled.',
            'assignedTo.integer' => 'Assigned to must be a valid user ID.',
            'assignedTo.exists' => 'The assigned user does not exist.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Get gym_id and user_id from authenticated user
            $user = $request->user('api');
            $gym_id = $user->gym_id ?? 1;
            $user_id = $user->id ?? Auth::id() ?? 1;
            
            // Normalize priority to proper case
            $priority = ucfirst(strtolower($request->priority));
            
            // Create task in tasks table
            $task = Task::create([
                'gym_id' => $gym_id,
                'member_id' => $id,
                'coach_id' => null,
                'user_id' => $user_id,
                'assigned_to' => $request->assignedTo,
                'title' => $request->title,
                'description' => $request->description,
                'category' => $request->category,
                'priority' => $priority,
                'status' => $request->status,
                'due_date' => $request->dueDate,
                'task_type' => 'member',
                'created_at' => now(),
                'updated_at' => now()
            ]);

            // Load relationships for response
            $task->load(['member', 'assignedTo', 'user']);

            // Create notification for the member
            try {
                NotificationService::taskCreated($task, $gym_id, $user_id);
            } catch (\Exception $notificationException) {
                // Log notification error but don't fail the task creation
                Log::warning('Failed to create notification for task', [
                    'task_id' => $task->id,
                    'member_id' => $id,
                    'error' => $notificationException->getMessage()
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Task created successfully',
                'task' => $task
            ], 201);
            
        } catch (\Exception $e) {
            \Log::error('Error creating task: ' . $e->getMessage(), [
                'member_id' => $id,
                'request' => $request->all(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error creating task: ' . $e->getMessage()
            ], 500);
        }
    }

    //------------- Get Member Tasks -------------\\
    public function getMemberTasks($id)
    {
        $this->authorizeForUser(request()->user('api'), 'view', Client::class);
        
        try {
            // Get gym_id from authenticated user to filter tasks
            $gym_id = request()->user('api')->gym_id ?? 1;
            
            // Get tasks from tasks table where task_type is 'member'
            $tasks = Task::where('member_id', $id)
                ->where('gym_id', $gym_id)
                ->where('task_type', 'member')
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($task) {
                    return [
                        'id' => $task->id,
                        'title' => $task->title,
                        'description' => $task->description,
                        'category' => $task->category,
                        'priority' => $task->priority,
                        'due_date' => $task->due_date,
                        'status' => $task->status,
                        'assigned_to' => $task->assigned_to,
                        'assigned_to_name' => $task->assignedTo ? $task->assignedTo->name : null,
                        'member_id' => $task->member_id,
                        'task_type' => $task->task_type,
                        'created_at' => $task->created_at,
                        'updated_at' => $task->updated_at
                    ];
                });

            return response()->json([
                'success' => true,
                'tasks' => $tasks
            ]);
            
        } catch (\Exception $e) {
            \Log::error('Error fetching member tasks: ' . $e->getMessage(), [
                'member_id' => $id,
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error fetching tasks: ' . $e->getMessage()
            ], 500);
        }
    }

    //------------- Update Task -------------\\
    public function updateTask(Request $request, $id, $taskId)
    {
        $this->authorizeForUser($request->user('api'), 'update', Client::class);
        
        // Validate request with better error messages
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'priority' => 'required|string|in:Low,Medium,High,Urgent,low,medium,high,urgent',
            'dueDate' => 'required|date',
            'description' => 'nullable|string',
            'assignedTo' => 'nullable|integer|exists:users,id',
            'status' => 'required|string|in:pending,in-progress,completed,cancelled',
            'member_id' => 'nullable|integer',
            'task_type' => 'nullable|string|in:member,coach'
        ], [
            'title.required' => 'Task name is required. Please enter a task name.',
            'title.string' => 'Task name must be text.',
            'title.max' => 'Task name cannot exceed 255 characters.',
            'category.required' => 'Category is required. Please select a category.',
            'priority.required' => 'Priority is required. Please select a priority level.',
            'priority.in' => 'Priority must be one of: Low, Medium, High, or Urgent.',
            'dueDate.required' => 'Due date is required. Please select a due date.',
            'dueDate.date' => 'Due date must be a valid date.',
            'status.required' => 'Status is required.',
            'status.in' => 'Status must be one of: pending, in-progress, completed, or cancelled.',
            'assignedTo.integer' => 'Assigned to must be a valid user ID.',
            'assignedTo.exists' => 'The assigned user does not exist.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Get gym_id from authenticated user to ensure user can only update their gym's tasks
            $gym_id = $request->user('api')->gym_id ?? 1;
            
            // Find task in tasks table
            $task = Task::where('id', $taskId)
                ->where('member_id', $id)
                ->where('gym_id', $gym_id)
                ->where('task_type', 'member')
                ->first();

            if (!$task) {
                return response()->json([
                    'success' => false,
                    'message' => 'Task not found'
                ], 404);
            }

            // Normalize priority to proper case
            $priority = ucfirst(strtolower($request->priority));

            // Store old status to check if it changed to completed
            $oldStatus = $task->status;

            $task->update([
                'title' => $request->title,
                'category' => $request->category,
                'priority' => $priority,
                'due_date' => $request->dueDate,
                'description' => $request->description,
                'assigned_to' => $request->assignedTo,
                'status' => $request->status,
                'updated_at' => now()
            ]);

            // Refresh task to get updated status
            $task->refresh();

            // If status changed to completed, send notifications
            if ($oldStatus !== 'completed' && $request->status === 'completed') {
                try {
                    $user_id = $request->user('api')->id ?? null;
                    NotificationService::taskCompleted($task, $gym_id, $user_id);
                } catch (\Exception $notificationException) {
                    // Log notification error but don't fail the task update
                    Log::warning('Failed to create notification for task completion', [
                        'task_id' => $task->id,
                        'member_id' => $id,
                        'error' => $notificationException->getMessage()
                    ]);
                }
            }

            // Load relationships for response
            $task->load(['member', 'assignedTo', 'user']);

            return response()->json([
                'success' => true,
                'message' => 'Task updated successfully',
                'task' => $task
            ]);
            
        } catch (\Exception $e) {
            \Log::error('Error updating task: ' . $e->getMessage(), [
                'member_id' => $id,
                'task_id' => $taskId,
                'request' => $request->all(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error updating task: ' . $e->getMessage()
            ], 500);
        }
    }

    //------------- Delete Task -------------\\
    public function deleteTask($id, $taskId)
    {
        $this->authorizeForUser(request()->user('api'), 'update', Client::class);
        
        try {
            // Get gym_id from authenticated user to ensure user can only delete their gym's tasks
            $gym_id = request()->user('api')->gym_id ?? 1;
            
            // Find task in tasks table
            $task = Task::where('id', $taskId)
                ->where('member_id', $id)
                ->where('gym_id', $gym_id)
                ->where('task_type', 'member')
                ->first();

            if (!$task) {
                return response()->json([
                    'success' => false,
                    'message' => 'Task not found'
                ], 404);
            }

            $task->delete();

            return response()->json([
                'success' => true,
                'message' => 'Task deleted successfully'
            ]);
            
        } catch (\Exception $e) {
            \Log::error('Error deleting task: ' . $e->getMessage(), [
                'member_id' => $id,
                'task_id' => $taskId,
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error deleting task: ' . $e->getMessage()
            ], 500);
        }
    }

    //------------- Get Trainer Assignment for Member -------------\\
    public function getTrainerAssignment($id)
    {
        $this->authorizeForUser(request()->user('api'), 'view', Client::class);
        
        try {
            $assignment = MemberTrainer::where('member_id', $id)
                ->with('trainer:id,first_name,last_name,trainer_type')
                ->latest()
                ->first();
            
            if ($assignment) {
                return response()->json([
                    'success' => true,
                    'assignment' => [
                        'id' => $assignment->id,
                        'trainerId' => $assignment->trainer_id,
                        'trainerName' => $assignment->trainer ? $assignment->trainer->first_name . ' ' . $assignment->trainer->last_name : '',
                        'trainerSpecialization' => $assignment->trainer ? $assignment->trainer->trainer_type : '',
                        'assigned_date' => $assignment->assigned_date,
                        'sessionFrequency' => $assignment->session_frequency,
                        'sessionDuration' => $assignment->session_duration,
                        'goals' => $assignment->goals,
                        'specialRequirements' => $assignment->special_requirements,
                        'startDate' => $assignment->start_date,
                        'endDate' => $assignment->end_date,
                        'status' => $assignment->status
                    ]
                ]);
            }
            
            return response()->json([
                'success' => true,
                'assignment' => null
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching trainer assignment: ' . $e->getMessage()
            ], 500);
        }
    }

    //------------- Assign Trainer to Member -------------\\
    public function assignTrainer(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', Client::class);
        
        $this->validate($request, [
            'trainerId' => 'required',
            'assigned_date' => 'required|date',
            'sessionFrequency' => 'required|string',
            // 'sessionDuration' => 'required|string',
            'goals' => 'required|string',
            'startDate' => 'required|date'
        ]);

        try {
            // Check if there's an existing assignment
            $existingAssignment = MemberTrainer::where('member_id', $id)->first();
            
            $assignmentData = [
                'member_id' => $id,
                'trainer_id' => $request->trainerId,
                'assigned_date' => $request->assigned_date,
                'session_frequency' => $request->sessionFrequency,
                'session_duration' => $request->sessionDuration,
                'goals' => $request->goals,
                'special_requirements' => $request->specialRequirements,
                'start_date' => $request->startDate,
                'end_date' => $request->endDate,
                'updated_at' => now()
            ];

            if ($existingAssignment) {
                // Update existing assignment
                $existingAssignment->update($assignmentData);
                $message = 'Trainer assignment updated successfully';
            } else {
                // Create new assignment
                $assignmentData['created_at'] = now();
                MemberTrainer::create($assignmentData);
                $message = 'Trainer assigned successfully';
            }

            return response()->json([
                'success' => true,
                'message' => $message,
                'assignment' => $assignmentData
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error assigning trainer: ' . $e->getMessage()
            ], 500);
        }
    }

    //------------- Convert Member to Staff -------------\\
    public function convertToStaff(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', Client::class);
        
        $this->validate($request, [
            'position' => 'required|string',
            'department' => 'required|string',
            'startDate' => 'required|date',
            'salary' => 'required|numeric',
            'employmentType' => 'required|string',
            'responsibilities' => 'required|string'
        ]);

        // Here you would typically:
        // 1. Create a new staff record
        // 2. Update the member status
        // 3. Handle any necessary data migration

        $staffData = [
            'member_id' => $id,
            'position' => $request->position,
            'department' => $request->department,
            'start_date' => $request->startDate,
            'salary' => $request->salary,
            'employment_type' => $request->employmentType,
            'responsibilities' => $request->responsibilities,
            'created_at' => now(),
            'updated_at' => now()
        ];

        // You can create a Staff model and save here
        // Staff::create($staffData);

        // Update member status
        Member::whereId($id)->update([
            'Statuses' => 'staff'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Member converted to staff successfully',
            'staff' => $staffData
        ]);
    }

    //------------- Convert Member to Coach -------------\\
    public function convertToCoach(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', Client::class);
        
        try {
            $member = Member::findOrFail($id);
            
            // Get gym_id from authenticated user
            $user = $request->user('api');
            $gym_id = $user ? $user->gym_id : null;
            
            if (!$gym_id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Gym ID not found'
                ], 400);
            }

            // Check if member belongs to the user's gym
            if ($member->gym_id !== $gym_id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Member not found'
                ], 404);
            }

            // Check if a coach with the same email already exists
            $existingCoach = \App\Models\Coach::where('email', $member->email)
                ->where('gym_id', $gym_id)
                ->first();
                
            if ($existingCoach) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'A coach with this email already exists'
                ], 422);
            }

            // Create coach data from member data
            $coachData = [
                'gym_id' => $gym_id,
                'first_name' => $member->firstname,
                'last_name' => $member->lastname,
                'email' => $member->email,
                'mobile_phone' => $member->phone,
                'dob' => $member->date_of_birth,
                'gender' => $member->gender,
                'city' => $member->city,
                'zip' => $member->zipcode,
                'height_cm' => $member->height,
                'weight_kg' => $member->weight,
                'medical_conditions' => $member->medical_condition,
                'emergency_name' => $member->contact_name,
                'emergency_phone' => $member->contact_phone,
                'address' => $member->address,
                'coach_type' => $request->coach_type ?? 'Personal Trainer',
                'coach_experience' => $request->coach_experience ?? 'Beginner',
                'years_of_experience' => $request->years_of_experience ?? 0,
                'status' => 'Active',
                'specializations' => $request->specializations ?? [],
                'bio' => $request->bio ?? 'Converted from member',
                'weekly_availability' => $request->weekly_availability ?? 'Monday-Friday',
                'session_duration' => $request->session_duration ?? 60,
                'max_clients_per_day' => $request->max_clients_per_day ?? 8,
                'payment_plan' => $request->payment_plan ?? 'Monthly',
                'rate_salary' => $request->rate_salary ?? 0,
                'commission_percent' => $request->commission_percent ?? 0,
            ];

            // Add optional fields only if they have values
            if ($member->profile_image) {
                $coachData['profile_image'] = $member->profile_image;
            }

            // Remove any null values that might cause issues
            $coachData = array_filter($coachData, function($value) {
                return $value !== null && $value !== '';
            });

            // Log the data we're trying to insert for debugging
            \Log::info('Attempting to create coach with data:', $coachData);

            // Create the coach
            $coach = \App\Models\Coach::create($coachData);

            // Log the conversion
            \Log::info('Member converted to coach:', [
                'member_id' => $member->id,
                'coach_id' => $coach->id,
                'member_name' => $member->firstname . ' ' . $member->lastname,
                'coach_email' => $coach->email,
                'gym_id' => $gym_id
            ]);

            // Update member status to indicate conversion
            $member->update([
                'Statuses' => 'coach_converted'
            ]);

            // Update user role_id from 2 (member) to 3 (coach) and set coach_id
            $user = User::where('email', $member->email)->first();
            if ($user) {
                // Only update if current role_id is 2 (member)
                if ($user->role_id == 2) {
                    $user->update([
                        'role_id' => 3,
                        'coach_id' => $coach->id
                    ]);
                    \Log::info('User role updated to coach:', [
                        'user_id' => $user->id,
                        'email' => $user->email,
                        'old_role_id' => 2,
                        'new_role_id' => 3,
                        'coach_id' => $coach->id
                    ]);
                } else {
                    // Even if role is not 2, update coach_id if not set
                    if (!$user->coach_id) {
                        $user->coach_id = $coach->id;
                        $user->save();
                        \Log::info('Updated User record with coach_id for converted member:', [
                            'user_id' => $user->id,
                            'email' => $user->email,
                            'coach_id' => $coach->id
                        ]);
                    }
                }
            } else {
                \Log::warning('User not found for member conversion:', [
                    'member_id' => $member->id,
                    'member_email' => $member->email
                ]);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Member successfully converted to coach',
                'coach' => $coach,
                'coach_id' => $coach->id
            ]);

        } catch (\Exception $e) {
            \Log::error('Error converting member to coach:', [
                'member_id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to convert member to coach: ' . $e->getMessage()
            ], 500);
        }
    }

    //------------- Unsubscribe Member -------------\\
    public function unsubscribeMember(Request $request, $id)
    {
        $user = $request->user('api') ?? $request->get('auth_user') ?? Auth::guard('api')->user();
        
        // Check if user is a coach (role_id = 3)
        if ($user && isset($user->role_id) && $user->role_id === 3) {
            // For coaches, check if member is assigned to them
            $coach = Coach::where('email', $user->email)->first();
            
            if ($coach) {
                // Check if member is assigned to this coach
                $assignment = CoachAssignment::where('coach_id', $coach->id)
                    ->where('member_id', $id)
                    ->where('status', 'active')
                    ->first();
                
                if (!$assignment) {
                    return response()->json([
                        'success' => false,
                        'message' => 'You are not authorized to unsubscribe this member. Member is not assigned to you.',
                    ], 403);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach profile not found',
                ], 404);
            }
        } else {
            // For non-coaches (admins, etc.), use normal authorization
            if ($user) {
                $this->authorizeForUser($user, 'update', Client::class);
            }
        }
        
        $this->validate($request, [
            'type' => 'required|string',
            'reason' => 'required|string',
            'refundOption' => 'required|string',
            'effectiveDate' => 'nullable|date',
            'comments' => 'nullable|string'
        ]);

        try {
            // Cancel any existing active unsubscribe records
            MemberUnsubscribe::where('member_id', $id)
                ->where('status', 'active')
                ->update(['status' => 'cancelled']);

            // Create new unsubscribe record
            $unsubscribe = MemberUnsubscribe::create([
                'member_id' => $id,
                'unsubscribe_type' => $request->type,
                'effective_date' => $request->effectiveDate,
                'reason' => $request->reason,
                'comments' => $request->comments,
                'refund_option' => $request->refundOption,
                'status' => 'active',
                'processed_at' => $request->effectiveDate && $request->effectiveDate <= now()->format('Y-m-d') ? now() : null
            ]);

            // Update member status based on effective date
            $effectiveDate = $request->effectiveDate ?? now()->format('Y-m-d');
            Member::whereId($id)->update([
                'Statuses' => 'unsubscribed',
                'Expires' => $effectiveDate
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Member unsubscribed successfully',
                'unsubscribe' => $unsubscribe
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error unsubscribing member: ' . $e->getMessage()
            ], 500);
        }
    }

    //------------- Member Documents/Files Methods -------------\\

    /**
     * Upload document for a member
     */
    public function uploadDocument(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', Client::class);
        
        $member = Member::where('deleted_at', '=', null)->findOrFail($id);
        
        $request->validate([
            'file' => 'required|file|max:10240', // 10MB max
            'description' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:50'
        ]);

        try {
            $file = $request->file('file');
            $originalName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $size = $file->getSize();
            
            // Generate unique filename
            $filename = time() . '_' . uniqid() . '.' . $extension;
            
            // Store file
            $path = $file->storeAs('member_documents/' . $member->id, $filename, 'public');
            
            // Create document record in database
            $document = \DB::table('member_documents')->insertGetId([
                'member_id' => $member->id,
                'gym_id' => $member->gym_id,
                'file_name' => $filename,
                'original_name' => $originalName,
                'file_path' => $path,
                'file_type' => $extension,
                'file_size' => $size,
                'description' => $request->description ?? '',
                'category' => $request->category ?? 'general',
                'created_at' => now(),
                'updated_at' => now()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Document uploaded successfully',
                'document_id' => $document,
                'file_path' => $path
            ]);

        } catch (\Exception $e) {
            \Log::error('Document upload error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload document: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get documents for a member
     */
    public function getDocuments($id)
    {
        $this->authorizeForUser(request()->user('api'), 'view', Client::class);
        
        $member = Member::where('deleted_at', '=', null)->findOrFail($id);
        
        try {
            $documents = \DB::table('member_documents')
                ->where('member_id', $member->id)
                ->whereNull('deleted_at')
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function($doc) {
                    return [
                        'id' => $doc->id,
                        'member_id' => $doc->member_id,
                        'original_name' => $doc->original_name,
                        'file_name' => $doc->file_name,
                        'file_path' => $doc->file_path,
                        'file_extension' => $doc->file_type,
                        'file_type' => $doc->file_type,
                        'file_size' => $doc->file_size,
                        'file_size_formatted' => $this->formatFileSize($doc->file_size),
                        'file_icon' => $this->getFileIcon($doc->file_type),
                        'description' => $doc->description,
                        'category' => $doc->category,
                        'created_at' => $doc->created_at,
                        'updated_at' => $doc->updated_at
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $documents
            ]);

        } catch (\Exception $e) {
            \Log::error('Get documents error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve documents'
            ], 500);
        }
    }

    /**
     * Download document
     */
    public function downloadDocument($id, $documentId)
    {
        $this->authorizeForUser(request()->user('api'), 'view', Client::class);
        
        $member = Member::where('deleted_at', '=', null)->findOrFail($id);
        
        try {
            $document = \DB::table('member_documents')
                ->where('id', $documentId)
                ->where('member_id', $member->id)
                ->whereNull('deleted_at')
                ->first();

            if (!$document) {
                return response()->json([
                    'success' => false,
                    'message' => 'Document not found'
                ], 404);
            }

            $filePath = storage_path('app/public/' . $document->file_path);
            
            if (!file_exists($filePath)) {
                return response()->json([
                    'success' => false,
                    'message' => 'File not found on server'
                ], 404);
            }

            return response()->download($filePath, $document->original_name);

        } catch (\Exception $e) {
            \Log::error('Download document error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to download document'
            ], 500);
        }
    }

    /**
     * Delete document
     */
    public function deleteDocument($id, $documentId)
    {
        $this->authorizeForUser(request()->user('api'), 'update', Client::class);
        
        $member = Member::where('deleted_at', '=', null)->findOrFail($id);
        
        try {
            $document = \DB::table('member_documents')
                ->where('id', $documentId)
                ->where('member_id', $member->id)
                ->whereNull('deleted_at')
                ->first();

            if (!$document) {
                return response()->json([
                    'success' => false,
                    'message' => 'Document not found'
                ], 404);
            }

            // Soft delete record from database (set deleted_at)
            \DB::table('member_documents')
                ->where('id', $documentId)
                ->update([
                    'deleted_at' => now(),
                    'updated_at' => now()
                ]);

            return response()->json([
                'success' => true,
                'message' => 'Document deleted successfully'
            ]);

        } catch (\Exception $e) {
            \Log::error('Delete document error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete document'
            ], 500);
        }
    }

    /**
     * Format file size
     */
    private function formatFileSize($bytes)
    {
        if ($bytes >= 1073741824) {
            return number_format($bytes / 1073741824, 2) . ' GB';
        } elseif ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 2) . ' MB';
        } elseif ($bytes >= 1024) {
            return number_format($bytes / 1024, 2) . ' KB';
        } else {
            return $bytes . ' bytes';
        }
    }

    /**
     * Get file icon based on extension
     */
    private function getFileIcon($extension)
    {
        $icons = [
            'pdf' => 'fas fa-file-pdf',
            'doc' => 'fas fa-file-word',
            'docx' => 'fas fa-file-word',
            'xls' => 'fas fa-file-excel',
            'xlsx' => 'fas fa-file-excel',
            'ppt' => 'fas fa-file-powerpoint',
            'pptx' => 'fas fa-file-powerpoint',
            'txt' => 'fas fa-file-alt',
            'jpg' => 'fas fa-file-image',
            'jpeg' => 'fas fa-file-image',
            'png' => 'fas fa-file-image',
            'gif' => 'fas fa-file-image',
            'zip' => 'fas fa-file-archive',
            'rar' => 'fas fa-file-archive',
        ];

        return $icons[strtolower($extension)] ?? 'fas fa-file';
    }

    //------------- Send Email to Member -------------\\
    public function sendMessage(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', Client::class);

        $this->validate($request, [
            'recipients' => 'required|string',
            'subject' => 'required|string',
            'body' => 'required|string'
        ]);

        $member = Member::find($id);
        $recipientEmail = $member && $member->email ? $member->email : trim($request->recipients);

        if (!$recipientEmail) {
            return response()->json([
                'success' => false,
                'message' => 'No email address found for this member. Please add an email in the member profile.',
            ], 422);
        }

        // Use mail config from CRM Settings (database) so SMTP username/password are applied
        $gymId = $request->user('api')->gym_id ?? ($member ? $member->gym_id : null);
        static::Set_config_mail($gymId);

        try {
            $emailBody = '<div style="font-family: Arial, sans-serif; max-width: 600px;">'
                . nl2br(e($request->body))
                . '</div>';
            $emailData = [
                'subject' => $request->subject,
                'body' => $emailBody,
                'company_name' => config('app.name', 'Fitness CRM'),
            ];
            Mail::to($recipientEmail)->send(new CustomEmail($emailData));

            Log::info('Email sent to member', [
                'member_id' => $id,
                'recipient' => $recipientEmail,
                'sender_id' => $request->user('api')->id,
                'subject' => $request->subject,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Email sent successfully',
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to send email to member', [
                'member_id' => $id,
                'recipient' => $recipientEmail,
                'error' => $e->getMessage(),
                'sender_id' => $request->user('api')->id,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to send email. Please check Settings → Mail (SMTP username and password).',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    //------------- Get Messages for Member -------------\\
    public function getMemberMessages($id)
    {
        $this->authorizeForUser(request()->user('api'), 'view', Client::class);
        
        try {
            $messages = MemberMessage::where('receiver_member_id', $id)
                ->with(['senderMember:id,membername,firstname,lastname,email,profile_image'])
                ->orderBy('sent_date', 'desc')
                ->get()
                ->map(function($message) {
                    return [
                        'id' => $message->message_id, // Use message_id as the primary key
                        'member_id' => $message->receiver_member_id,
                        'member_name' => $message->senderMember ? ($message->senderMember->membername ?: $message->senderMember->firstname . ' ' . $message->senderMember->lastname) : 'Unknown Member',
                        'member_email' => $message->senderMember ? $message->senderMember->email : '',
                        'member_avatar' => $message->senderMember && $message->senderMember->profile_image ? "/images/avatar/{$message->senderMember->profile_image}" : null,
                        'recipients' => $message->senderMember ? $message->senderMember->email : '',
                        'subject' => 'Message from Admin', // Default subject since table doesn't have subject field
                        'body' => $message->message_text,
                        'sender_id' => $message->sender_member_id,
                        'sender_type' => 'Admin',
                        'sent_at' => $message->sent_date,
                        'sent_date' => $message->sent_date ? $message->sent_date->format('Y-m-d') : '',
                        'sent_time' => $message->sent_date ? $message->sent_date->format('H:i:s') : '',
                        'sent_datetime' => $message->sent_date ? $message->sent_date->format('Y-m-d H:i:s') : '',
                        'created_at' => $message->created_at,
                        'updated_at' => $message->updated_at
                    ];
                });

            return response()->json([
                'success' => true,
                'messages' => $messages,
                'total_count' => $messages->count()
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to retrieve messages for member', [
                'member_id' => $id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve messages',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    //------------- Get All Sent Messages -------------\\
    public function getAllSentMessages(Request $request)
    {
        // return 'hi';
        $this->authorizeForUser($request->user('api'), 'view', Client::class);
        
        try {
            $query = MemberMessage::with(['receiverMember:id,membername,firstname,lastname,email,profile_image'])
                ->orderBy('sent_date', 'desc');

            // Add pagination
            $perPage = $request->get('per_page', 15);
            $messages = $query->paginate($perPage);

            $formattedMessages = $messages->map(function($message) {
                return [
                    'id' => $message->id,
                    'member_id' => $message->receiver_member_id,
                    'member_name' => $message->receiverMember ? ($message->receiverMember->membername ?: $message->receiverMember->firstname . ' ' . $message->receiverMember->lastname) : 'Unknown Member',
                    'member_email' => $message->receiverMember ? $message->receiverMember->email : '',
                    'member_avatar' => $message->receiverMember && $message->receiverMember->profile_image ? "/images/avatar/{$message->receiverMember->profile_image}" : null,
                    'recipients' => $message->receiverMember ? $message->receiverMember->email : '',
                    'subject' => 'Message from Admin', // Default subject since table doesn't have subject field
                    'body' => $message->message_text,
                    'sender_id' => $message->sender_member_id,
                    'sender_type' => 'Admin',
                    'sent_at' => $message->sent_date,
                    'sent_date' => $message->sent_date ? $message->sent_date->format('Y-m-d') : '',
                    'sent_time' => $message->sent_date ? $message->sent_date->format('H:i:s') : '',
                    'sent_datetime' => $message->sent_date ? $message->sent_date->format('Y-m-d H:i:s') : '',
                    'created_at' => $message->created_at,
                    'updated_at' => $message->updated_at
                ];
            });

            return response()->json([
                'success' => true,
                'messages' => $formattedMessages,
                'pagination' => [
                    'current_page' => $messages->currentPage(),
                    'last_page' => $messages->lastPage(),
                    'per_page' => $messages->perPage(),
                    'total' => $messages->total(),
                    'from' => $messages->firstItem(),
                    'to' => $messages->lastItem()
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to retrieve all sent messages', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve sent messages',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    //------------- Get Unsubscribe History -------------\\
    public function getUnsubscribeHistory($id)
    {
        $this->authorizeForUser(request()->user('api'), 'view', Client::class);
        
        try {
            $unsubscribe = MemberUnsubscribe::where('member_id', $id)
                ->where('status', 'active')
                ->latest()
                ->first();
            
            if ($unsubscribe) {
                return response()->json([
                    'success' => true,
                    'history' => [
                        'id' => $unsubscribe->id,
                        'type' => $unsubscribe->unsubscribe_type,
                        'effectiveDate' => $unsubscribe->effective_date,
                        'reason' => $unsubscribe->reason,
                        'comments' => $unsubscribe->comments,
                        'refundOption' => $unsubscribe->refund_option,
                        'status' => $unsubscribe->status,
                        'processedAt' => $unsubscribe->processed_at
                    ]
                ]);
            }
            
            return response()->json([
                'success' => true,
                'history' => null
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching unsubscribe history: ' . $e->getMessage()
            ], 500);
        }
    }

    //------------- Update Unsubscribe -------------\\
    public function updateUnsubscribe(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', Client::class);
        
        $this->validate($request, [
            'type' => 'required|string',
            'reason' => 'required|string',
            'refundOption' => 'required|string',
            'effectiveDate' => 'nullable|date',
            'comments' => 'nullable|string'
        ]);

        try {
            $unsubscribe = MemberUnsubscribe::where('member_id', $id)
                ->where('status', 'active')
                ->latest()
                ->first();

            if (!$unsubscribe) {
                return response()->json([
                    'success' => false,
                    'message' => 'No active unsubscribe record found'
                ], 404);
            }

            // Update the unsubscribe record
            $unsubscribe->update([
                'unsubscribe_type' => $request->type,
                'effective_date' => $request->effectiveDate,
                'reason' => $request->reason,
                'comments' => $request->comments,
                'refund_option' => $request->refundOption
            ]);

            // Update member status if effective date is in the past
            if ($request->effectiveDate && $request->effectiveDate <= now()->format('Y-m-d')) {
                Member::whereId($id)->update([
                    'Statuses' => 'unsubscribed',
                    'Expires' => $request->effectiveDate
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Unsubscribe details updated successfully',
                'unsubscribe' => $unsubscribe
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating unsubscribe details: ' . $e->getMessage()
            ], 500);
        }
    }

    //------------- Resubscribe Member -------------\\
    public function resubscribeMember(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', Client::class);
        
        try {
            // Cancel any active unsubscribe records
            MemberUnsubscribe::where('member_id', $id)
                ->where('status', 'active')
                ->update(['status' => 'cancelled']);

            // Update member status back to active
            $member = Member::find($id);
            if ($member) {
                $member->update([
                    'Statuses' => 'active',
                    'Expires' => null // Reset expiration date
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Member resubscribed successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error resubscribing member: ' . $e->getMessage()
            ], 500);
        }
    }

    //------------- Get Members Without Paginate -------------\\
    public function Get_Members_Without_Paginate(Request $request)
    {
        try {
            // Get the current user's gym ID
            $user = $request->user('api');
            $gymId = $user ? $user->gym_id : null;
            
            // Build query - start with base filters
            $query = Member::whereNull('deleted_at')
                ->where('Statuses', '!=', 'coach_converted'); // Exclude converted coaches like in index method
            
            // Filter by gym_id if user has one
            if ($gymId) {
                $query->where('gym_id', '=', $gymId);
            } else {
                // If user doesn't have gym_id, log warning but still return members
                // This handles cases where members might have NULL gym_id
                \Log::warning('Get_Members_Without_Paginate: User has no gym_id', [
                    'user_id' => $user ? $user->id : null
                ]);
                // Optionally, you can return all members or members with NULL gym_id
                // For now, we'll return all non-deleted members
            }
            
            $members = $query->get();
            
            // Log for debugging
            if (config('app.debug')) {
                \Log::debug('Get_Members_Without_Paginate', [
                    'user_id' => $user ? $user->id : null,
                    'gym_id' => $gymId,
                    'members_count' => $members->count(),
                    'member_ids' => $members->pluck('id')->toArray()
                ]);
            }
            
            return response()->json($members);
        } catch (\Exception $e) {
            \Log::error('Get_Members_Without_Paginate error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error fetching members: ' . $e->getMessage()
            ], 500);
        }
    }

    //------------- Get Unassigned Members -------------\\
    public function Get_Unassigned_Members()
    {
        try {
            // Get the current user's gym ID
            $gymId = auth()->user()->gym_id ;
            
            // Get all members from this gym
            $allMembers = Member::where('deleted_at', '=', null)
                ->where('gym_id', $gymId)
                ->get();
            
            // Get member IDs that have active coach assignments
            $assignedMemberIds = CoachAssignment::where('gym_id', $gymId)
                ->where('status', 'active')
                ->pluck('member_id')
                ->toArray();
            
            // Filter out assigned members
            $unassignedMembers = $allMembers->filter(function($member) use ($assignedMemberIds) {
                return !in_array($member->id, $assignedMemberIds);
            });
            
            return response()->json($unassignedMembers->values());
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error fetching unassigned members: ' . $e->getMessage()
            ], 500);
        }
    }

    //------------- Import Members -------------\\
    public function import_members(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'create', Client::class);

        $file = $request->file('file');
        if (!$file) {
            return response()->json([
                'status' => false,
                'message' => 'No file uploaded'
            ], 400);
        }

        $filename = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();

        if ($extension != 'csv') {
            return response()->json([
                'status' => false,
                'message' => 'File must be a CSV'
            ], 400);
        }

        $filepath = $file->getRealPath();
        $data = array_map('str_getcsv', file($filepath));
        $header = array_shift($data);

        $rules = array('firstName' => 'required', 'lastName' => 'required', 'email' => 'required|email');

        // Create new members
        foreach ($data as $key => $value) {
            if (count($header) == count($value)) {
                $input = array_combine($header, $value);
                
                $validator = Validator::make($input, $rules);
                if (!$validator->fails()) {
                    
                    Member::create([
                        'membername' => $input['firstName'] . ' ' . $input['lastName'],
                        'email' => $input['email'] ?? '',
                        'phone' => $input['phone'] ?? '',
                        'date_of_birth' => $input['dob'] ?? null,
                        'gender' => $input['gender'] ?? '',
                        'language' => $input['language'] ?? '',
                        'address' => $input['address'] ?? '',
                        'city' => $input['city'] ?? '',
                        'zipcode' => $input['zip'] ?? '',
                        'height' => $input['height'] ?? null,
                        'weight' => $input['weight'] ?? null,
                        'medical_condition' => $input['medical'] ?? '',
                        'contact_name' => $input['emergencyName'] ?? '',
                        'contact_phone' => $input['emergencyPhone'] ?? '',
                        'plan' => $input['plan'] ?? '',
                        'start_date' => $input['startDate'] ?? null,
                        'end_date' => $input['endDate'] ?? null,
                        'Expires' => $input['endDate'] ?? null,
                        'Statuses' => 'active',
                        'gym_id' => $request->user('api')->gym_id ?? 1,
                        // Bank details (default empty for imports)
                        'bank_account_number' => $input['bank_account_number'] ?? '',
                        'bank_account_type' => $input['bank_account_type'] ?? '',
                        'bank_account_holder_name' => $input['bank_account_holder_name'] ?? '',
                        'bank_name' => $input['bank_name'] ?? '',
                        'routing_number' => $input['routing_number'] ?? '',
                        'mandate_id' => $input['mandate_id'] ?? '',
                        'exclude_from_online_payments' => $input['exclude_from_online_payments'] ?? false,
                    ]);
                    
                    // Create corresponding User record for login with member_id
                    try {
                        $member = Member::where('email', $input['email'])->first();
                        if ($member) {
                            $existingUser = User::where('email', $member->email)
                                ->where('role_id', 2)
                                ->first();
                            
                            if (!$existingUser) {
                                // Generate a temporary password
                                $tempPassword = Str::random(16);
                                
                                // Generate username from member name
                                $username = strtolower(str_replace(' ', '', ($input['firstName'] ?? '') . ($input['lastName'] ?? ''))) . $member->id;
                                // Ensure username is unique
                                $originalUsername = $username;
                                $counter = 1;
                                while (User::where('username', $username)->exists()) {
                                    $username = $originalUsername . $counter;
                                    $counter++;
                                }
                                
                                User::create([
                                    'firstname' => $input['firstName'] ?? '',
                                    'lastname' => $input['lastName'] ?? '',
                                    'username' => $username,
                                    'email' => $member->email,
                                    'phone' => $input['phone'] ?? '',
                                    'password' => Hash::make($tempPassword),
                                    'statut' => 1, // Active
                                    'role_id' => 2, // Member role
                                    'gym_id' => $request->user('api')->gym_id ?? 1,
                                    'member_id' => $member->id,
                                ]);
                                
                                \Log::info('User record created for imported member: ' . $member->email . ' (ID: ' . $member->id . ')');
                            } else {
                                // Update existing user with member_id if not already set
                                if (!$existingUser->member_id) {
                                    $existingUser->member_id = $member->id;
                                    $existingUser->save();
                                    \Log::info('Updated existing user with member_id for imported member: ' . $member->email . ' (Member ID: ' . $member->id . ')');
                                }
                            }
                        }
                    } catch (\Exception $e) {
                        // Log error but don't fail member import
                        \Log::error('Failed to create User record for imported member ' . ($input['email'] ?? 'unknown') . ': ' . $e->getMessage());
                    }
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Members imported successfully'
        ], 200);
    }

    //------------- Coach Assignment Methods -------------\\

    /**
     * Get coach assignment for a member
     */
    public function getCoachAssignment($id)
    {
        try {
            $member = Member::findOrFail($id);
            
            // Get the active coach assignment
            $assignment = CoachAssignment::where('member_id', $id)
                ->where('status', 'active')
                ->with(['coach:id,first_name,last_name,coach_type'])
                ->first();

            if ($assignment) {
                $assignmentData = [
                    'id' => $assignment->id,
                    'coach_id' => $assignment->coach_id,
                    'assigned_date' => $assignment->assigned_date->format('Y-m-d'),
                    'start_date' => $assignment->start_date->format('Y-m-d'),
                    'end_date' => $assignment->end_date ? $assignment->end_date->format('Y-m-d') : null,
                    'session_frequency' => $assignment->session_frequency,
                    'session_duration' => $assignment->session_duration,
                    'goals' => $assignment->goals,
                    'special_requirements' => $assignment->special_requirements,
                    'status' => $assignment->status,
                    'notes' => $assignment->notes,
                    'coach_name' => $assignment->coach ? $assignment->coach->first_name . ' ' . $assignment->coach->last_name : 'Unknown Coach',
                    'coach_type' => $assignment->coach ? $assignment->coach->coach_type : 'Unknown Type'
                ];

                // Include coach object if available
                if ($assignment->coach) {
                    $assignmentData['coach'] = [
                        'id' => $assignment->coach->id,
                        'first_name' => $assignment->coach->first_name,
                        'last_name' => $assignment->coach->last_name,
                        'coach_type' => $assignment->coach->coach_type,
                        'name' => $assignment->coach->first_name . ' ' . $assignment->coach->last_name
                    ];
                }

                return response()->json([
                    'success' => true,
                    'assignment' => $assignmentData
                ]);
            }

            return response()->json([
                'success' => true,
                'assignment' => null
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching coach assignment: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Assign a coach to a member
     */
    public function assignCoach(Request $request, $id)
    {
        try {
            $member = Member::findOrFail($id);
            $user = $request->user('api');
            $isAdmin = $user && (isset($user->role_id) && $user->role_id == 1);
            
            // Normalize input - accept both camelCase and snake_case
            $coachId = $request->coachId ?? $request->coach_id ?? $request->input('coachId');
            $assignedDate = $request->assigned_date ?? now()->format('Y-m-d');
            $startDate = $request->startDate ?? $request->start_date ?? $assignedDate;
            $endDate = $request->endDate ?? $request->end_date ?? null;
            $sessionFrequency = $request->sessionFrequency ?? $request->session_frequency ?? null;
            $sessionDuration = $request->sessionDuration ?? $request->session_duration ?? null;
            $goals = $request->goals ?? null;
            $specialRequirements = $request->specialRequirements ?? $request->special_requirements ?? null;
            
            // For admins, only coachId is required; other fields get defaults
            if ($isAdmin) {
                // Minimal validation for admin - only coachId required
                $validator = Validator::make(['coachId' => $coachId], [
                    'coachId' => 'required|exists:coaches,id',
                ]);
                
                // Set defaults for missing fields
                if (!$sessionFrequency) {
                    $sessionFrequency = 'Weekly';
                }
                if (!$sessionDuration) {
                    $sessionDuration = '60 minutes';
                }
                if (!$goals) {
                    $goals = 'General fitness goals';
                }
            } else {
                // Full validation for non-admins
                $validator = Validator::make([
                    'coachId' => $coachId,
                    'assigned_date' => $assignedDate,
                    'startDate' => $startDate,
                    'endDate' => $endDate,
                    'sessionFrequency' => $sessionFrequency,
                    'sessionDuration' => $sessionDuration,
                    'goals' => $goals,
                ], [
                    'coachId' => 'required|exists:coaches,id',
                    'assigned_date' => 'required|date',
                    'startDate' => 'required|date|after_or_equal:assigned_date',
                    'endDate' => 'nullable|date|after:startDate',
                    'sessionFrequency' => 'required|string|max:100',
                    'sessionDuration' => 'required|string|max:100',
                    'goals' => 'required|string|max:1000',
                ]);
            }

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Deactivate any existing active assignments
            CoachAssignment::where('member_id', $id)
                ->where('status', 'active')
                ->update(['status' => 'inactive']);

            // Create new coach assignment
            $assignment = CoachAssignment::create([
                'member_id' => $id,
                'coach_id' => $coachId,
                'gym_id' => $member->gym_id ?? 1, // Default to gym_id 1 if not set
                'assigned_date' => $assignedDate,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'session_frequency' => $sessionFrequency,
                'session_duration' => $sessionDuration,
                'goals' => $goals,
                'special_requirements' => $specialRequirements,
                'status' => 'active',
                'notes' => 'Coach assigned via member management system'
            ]);

            // Update member's coach_id for quick access (hybrid approach)
            $member->update(['coach_id' => $coachId]);

            // Create notifications for coach assignment
            try {
                $coach = \App\Models\Coach::find($coachId);
                $performedByUserId = null;
                if ($user && isset($user->role_id) && $user->role_id == 1) {
                    $performedByUserId = $user->id;
                }
                
                if ($coach) {
                    \App\Services\NotificationService::coachAssigned(
                        $assignment,
                        $member,
                        $coach,
                        $member->gym_id ?? 1,
                        $performedByUserId
                    );
                }
            } catch (\Exception $notificationException) {
                \Log::error('Failed to create assignment notification from MemberController', [
                    'error' => $notificationException->getMessage(),
                    'trace' => $notificationException->getTraceAsString(),
                    'coach_id' => $coachId,
                    'member_id' => $id,
                ]);
                // Don't fail the assignment if notification creation fails
            }

            return response()->json([
                'success' => true,
                'message' => 'Coach assigned successfully',
                'assignment' => $assignment
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error assigning coach: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove coach assignment from a member
     */
    public function removeCoachAssignment(Request $request, $id)
    {
        try {
            $user = $request->user('api') ?? $request->get('auth_user') ?? Auth::guard('api')->user();
            $member = Member::whereNull('deleted_at')->findOrFail($id);
            
            // Check if user is a coach (role_id = 3)
            if ($user && isset($user->role_id) && $user->role_id === 3) {
                // For coaches, check if member is assigned to them
                $coach = Coach::where('email', $user->email)->first();
                
                if ($coach) {
                    // Check if member is assigned to this coach
                    $assignment = CoachAssignment::where('coach_id', $coach->id)
                        ->where('member_id', $id)
                        ->where('status', 'active')
                        ->first();
                    
                    if (!$assignment) {
                        return response()->json([
                            'success' => false,
                            'message' => 'You are not authorized to disconnect this member. Member is not assigned to you.',
                        ], 403);
                    }
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Coach profile not found',
                    ], 404);
                }
            } else {
                // For non-coaches (admins, etc.), use normal authorization
                if ($user) {
                    $this->authorizeForUser($user, 'update', Client::class);
                }
                // Find any active assignment
                $assignment = CoachAssignment::where('member_id', $id)
                    ->where('status', 'active')
                    ->first();
            }

            if ($assignment) {
                $assignment->update(['status' => 'cancelled']);
                
                // Clear member's coach_id (hybrid approach)
                $member->update(['coach_id' => null]);
                
                // Create notifications for coach unassignment
                try {
                    $coach = \App\Models\Coach::find($assignment->coach_id);
                    $user = request()->user('api');
                    $performedByUserId = null;
                    if ($user && isset($user->role_id) && $user->role_id == 1) {
                        $performedByUserId = $user->id;
                    }
                    
                    if ($coach) {
                        \App\Services\NotificationService::coachUnassigned(
                            $assignment,
                            $member,
                            $coach,
                            $member->gym_id ?? 1,
                            $performedByUserId
                        );
                    }
                } catch (\Exception $notificationException) {
                    \Log::error('Failed to create unassignment notification from MemberController', [
                        'error' => $notificationException->getMessage(),
                        'trace' => $notificationException->getTraceAsString(),
                        'coach_id' => $assignment->coach_id ?? null,
                        'member_id' => $id,
                    ]);
                    // Don't fail the unassignment if notification creation fails
                }
                
                return response()->json([
                    'success' => true,
                    'message' => 'Coach assignment removed successfully'
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'No active coach assignment found'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error removing coach assignment: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Assign membership to a member with coach and subscription plan
     */
    public function assignMembership(Request $request, $id)
    {
        try {
            // Get authenticated user (works with both Passport and Mobile auth)
            $user = $request->user('api') 
                ?? $request->get('auth_user') 
                ?? $request->get('auth_member')
                ?? auth()->user()
                ?? auth('api')->user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
            
            // Get gym_id from authenticated user (default to 1 if not set)
            $gym_id = $user->gym_id ?? 1;
            
            $member = Member::findOrFail($id);
            
            // Validate the request
            $validator = Validator::make($request->all(), [
                'coach_id' => 'required|exists:coaches,id',
                'plan_id' => 'required|exists:member_plans,id',
                'start_date' => 'required|date',
                'payment_method' => 'required|string|max:255',
                'subtotal' => 'required|numeric|min:0',
                'discount' => 'nullable|numeric|min:0',
                'tax' => 'nullable|numeric|min:0',
                'total' => 'required|numeric|min:0',
                'notes' => 'nullable|string|max:1000',
                'package_name' => 'nullable|string|max:255',
                'package_details' => 'nullable|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Verify coach exists and belongs to the same gym
            $coach = Coach::where('id', $request->coach_id)
                ->where('gym_id', $gym_id)
                ->first();
            
            if (!$coach) {
                return response()->json([
                    'success' => false,
                    'message' => 'Coach not found or does not belong to the same gym'
                ], 404);
            }

            // Verify plan exists
            $plan = \App\Models\Plan::find($request->plan_id);
            if (!$plan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Plan not found'
                ], 404);
            }

            // Start database transaction
            DB::beginTransaction();

            try {
                // Calculate end date based on plan duration
                $calculatedEndDate = null;
                if ($plan && $request->start_date) {
                    $calculatedEndDate = $plan->calculateEndDate($request->start_date);
                }
                
                // Use provided end_date if available, otherwise use calculated
                $endDate = $request->end_date ?? $calculatedEndDate;

                // Update member with subscription plan
                $member->update([
                    'subscription_plan_id' => $request->plan_id,
                    'plan' => $plan->name,
                    'start_date' => $request->start_date,
                    'end_date' => $endDate,
                    'Expires' => $endDate,
                    'Statuses' => 'active'
                ]);

                // Create membership assignment record
                $assignment = \App\Models\MemberMembershipAssignment::create([
                    'member_id' => $id,
                    'plan_id' => $request->plan_id,
                    'coach_id' => $request->coach_id,
                    'gym_id' => $gym_id,
                    'start_date' => $request->start_date,
                    'end_date' => $endDate,
                    'calculated_end_date' => $calculatedEndDate,
                    'package_name' => $request->package_name ?? $plan->name,
                    'package_details' => $request->package_details,
                    'payment_method' => $request->payment_method,
                    'subtotal' => $request->subtotal,
                    'discount' => $request->discount ?? 0,
                    'tax' => $request->tax ?? 0,
                    'total' => $request->total,
                    'notes' => $request->notes,
                    'status' => 'active'
                ]);

                // Initialize credits for membership if plan has services configured
                try {
                    $creditService = new \App\Services\MemberCreditService();
                    $creditInitResult = $creditService->initializeCreditsForMembership($assignment);
                    
                    if ($creditInitResult['success']) {
                        \Log::info('Credits initialized automatically for membership assignment', [
                            'assignment_id' => $assignment->id,
                            'member_id' => $id,
                            'plan_id' => $request->plan_id,
                            'credits_created' => isset($creditInitResult['credits']) ? count($creditInitResult['credits']) : 0
                        ]);
                    } else {
                        // Log warning but don't fail the assignment
                        \Log::warning('Failed to initialize credits for membership assignment', [
                            'assignment_id' => $assignment->id,
                            'member_id' => $id,
                            'plan_id' => $request->plan_id,
                            'error' => $creditInitResult['message']
                        ]);
                    }
                } catch (\Exception $e) {
                    // Log error but don't fail the assignment
                    \Log::error('Exception while initializing credits for membership assignment: ' . $e->getMessage(), [
                        'assignment_id' => $assignment->id,
                        'member_id' => $id,
                        'plan_id' => $request->plan_id,
                        'trace' => $e->getTraceAsString()
                    ]);
                }

                // Deactivate any existing active coach assignments
                CoachAssignment::where('member_id', $id)
                    ->where('status', 'active')
                    ->update(['status' => 'inactive']);

                // Create new coach assignment
                $coachAssignment = CoachAssignment::create([
                    'member_id' => $id,
                    'coach_id' => $request->coach_id,
                    'gym_id' => $gym_id,
                    'assigned_date' => $request->start_date,
                    'start_date' => $request->start_date,
                    'end_date' => null,
                    'session_frequency' => 'Weekly',
                    'session_duration' => '60 minutes',
                    'goals' => 'General fitness improvement',
                    'special_requirements' => null,
                    'status' => 'active',
                    'notes' => $request->notes ?? 'Membership assigned via assign membership system'
                ]);

                // Create invoice for the membership
                $invoice = Invoice::create([
                    'invoice_number' => Invoice::generateInvoiceNumber(),
                    'member_id' => $id,
                    'subscription_plan_id' => $request->plan_id,
                    'amount' => $request->total,
                    'status' => 'pending',
                    'due_date' => now()->addDays(30),
                    'description' => "Membership: {$plan->name}",
                    'gym_id' => $gym_id
                ]);

                DB::commit();

                return response()->json([
                    'success' => true,
                    'message' => 'Membership assigned successfully',
                    'data' => [
                        'member' => $member,
                        'assignment' => $assignment,
                        'coach_assignment' => $coachAssignment,
                        'invoice' => $invoice
                    ]
                ]);

            } catch (\Exception $e) {
                DB::rollback();
                throw $e;
            }

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error assigning membership: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get assigned meal plans for a specific member
     * Uses assigned_meals_members table (nutrition_plans table was dropped)
     */
    public function getMemberAssignedMealPlans($id)
    {
        try {
            $member = Member::findOrFail($id);
            $plans = collect();
            
            // Check assigned_meals_members table (new system)
            // First try with template_id, but also check if records exist without it
            $assignedPlans = AssignedMealsMember::where('member_id', $id)
                ->where(function($query) {
                    $query->whereNotNull('template_id')
                          ->where('template_id', '>', 0);
                })
                ->with(['template' => function($query) {
                    $query->withTrashed();
                }])
                ->with(['template.details' => function($query) {
                    $query->with('food');
                }])
                ->with('template.category')
                ->with('template.createdByMember')
                ->with('template.createdByAdmin')
                ->with('assignedBy')
                ->with(['memberDetails' => function($query) {
                    $query->with('food');
                }])
                ->orderBy('start_date', 'desc')
                ->orderBy('created_at', 'desc')
                ->get()
                ->filter(function($assignment) {
                    return $assignment->template !== null;
                });
            
            // Transform assigned_meals_members data
            $assignedPlans->each(function($assignment) use ($plans) {
                $template = $assignment->template;
                
                // Get the user who assigned this plan (assigned_by)
                $createdBy = 'N/A';
                if ($assignment->assigned_by && $assignment->assignedBy) {
                    $createdBy = $assignment->assignedBy->name ?? 'Admin';
                } elseif ($assignment->assigned_by) {
                    // Fallback: try to get user name directly
                    $user = \App\Models\User::find($assignment->assigned_by);
                    if ($user) {
                        $createdBy = $user->name ?? 'Admin';
                    }
                }
                
                // Use assigned plan macros if available, otherwise use template macros
                $calories = $assignment->calories ?? $template->calories ?? 0;
                $protein = $assignment->protein ?? $template->protein ?? 0;
                $carbs = $assignment->carbs ?? $template->carbs ?? 0;
                $fats = $assignment->fat_macros ?? $template->fats ?? 0;
                
                // Check if plan is customized (has overrides)
                $isCustomized = !is_null($assignment->calories) || 
                               !is_null($assignment->protein) || 
                               !is_null($assignment->carbs) || 
                               !is_null($assignment->fat_macros) ||
                               !is_null($assignment->plan); // plan field can store custom name
                
                // Use custom name if available, otherwise template name
                $name = $assignment->plan ?? $template->name;
                
                $mealsByType = collect();
                
                // Prioritize member-specific meal details over template details
                if ($assignment->memberDetails && $assignment->memberDetails->count() > 0) {
                    // Use member-specific customizations
                    $mealsByType = $assignment->memberDetails->groupBy(function($detail) {
                        // Normalize only generic snack bucket; keep snacks1/snacks2/snacks3 as-is
                        $type = strtolower($detail->nutrition_type);
                        if (in_array($type, ['snacks'])) {
                            return 'snack';
                        }
                        return $type;
                    })->map(function($details, $type) {
                        return $details->map(function($detail) {
                            $nutritionType = strtolower((string) $detail->nutrition_type) === 'snacks' ? 'snack' : $detail->nutrition_type;
                            return [
                                'id' => $detail->id,
                                'nutrition_type' => $nutritionType,
                                'food' => $detail->food ? [
                                    'id' => $detail->food->id,
                                    'name' => $detail->food->name,
                                    'serving_description' => $detail->food->serving_description,
                                ] : null,
                                'quantity' => $detail->quantity,
                                'calories' => $detail->calories,
                                'protein' => $detail->protein,
                                'carbs' => $detail->carbs,
                                'fats' => $detail->fats,
                                'label_serving' => $detail->label_serving,
                                'unit' => $detail->unit,
                                'notes' => $detail->notes,
                            ];
                        });
                    });
                } elseif ($template->details && $template->details->count() > 0) {
                    // Fallback to template details
                    $mealsByType = $template->details->groupBy(function($detail) {
                        // Normalize only generic snack bucket; keep snacks1/snacks2/snacks3 as-is
                        $type = strtolower($detail->nutrition_type);
                        if (in_array($type, ['snacks'])) {
                            return 'snack';
                        }
                        return $type;
                    })->map(function($details, $type) {
                        return $details->map(function($detail) {
                            $nutritionType = strtolower((string) $detail->nutrition_type) === 'snacks' ? 'snack' : $detail->nutrition_type;
                            return [
                                'id' => $detail->id,
                                'nutrition_type' => $nutritionType,
                                'food' => $detail->food ? [
                                    'id' => $detail->food->id,
                                    'name' => $detail->food->name,
                                    'serving_description' => $detail->food->serving_description,
                                ] : null,
                                'quantity' => $detail->quantity,
                                'calories' => $detail->calories,
                                'protein' => $detail->protein,
                                'carbs' => $detail->carbs,
                                'fats' => $detail->fats,
                                'label_serving' => $detail->label_serving,
                                'unit' => $detail->unit,
                                'notes' => $detail->notes,
                            ];
                        });
                    });
                }
                
                $plans->push([
                    'id' => $assignment->id,
                    'template_id' => $template->id,
                    'name' => $name,
                    'template_name' => $template->name,
                    'description' => $assignment->description ?? $template->description,
                    'start_date' => $assignment->start_date ? $assignment->start_date->format('Y-m-d') : null,
                    'end_date' => $assignment->end_date ? $assignment->end_date->format('Y-m-d') : null,
                    'category' => $template->category ? $template->category->name : null,
                    'created_by' => $createdBy,
                    'created_at' => $assignment->created_at ? $assignment->created_at->format('Y-m-d H:i:s') : null,
                    'updated_at' => $assignment->updated_at ? $assignment->updated_at->format('Y-m-d H:i:s') : null,
                    'last_modified' => $assignment->updated_at ? $assignment->updated_at->format('Y-m-d H:i:s') : null,
                    'calories' => $calories,
                    'protein' => $protein,
                    'carbs' => $carbs,
                    'fats' => $fats,
                    'total_calories' => $calories,
                    'total_protein' => $protein,
                    'total_carbs' => $carbs,
                    'total_fats' => $fats,
                    'is_customized' => $isCustomized,
                    'is_favorite' => false, // Can be added later if needed
                    'meals' => $mealsByType,
                ]);
            });
            
            // nutrition_plans table dropped - data migrated to assigned_meals_members
            // All plans are now retrieved from assigned_meals_members table above
            
            return response()->json([
                'success' => true,
                'data' => $plans->values()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching meal plans: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update assigned meal plan for a member
     * This updates only the assigned plan, not the template
     */
    public function updateAssignedMealPlan(Request $request, $memberId, $assignmentId)
    {
        try {
            $member = Member::findOrFail($memberId);
            
            // Find the assigned meal plan
            $assignment = AssignedMealsMember::where('id', $assignmentId)
                ->where('member_id', $memberId)
                ->firstOrFail();
            
            // Validate request
            $request->validate([
                'name' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'calories' => 'nullable|integer|min:0',
                'protein' => 'nullable|numeric|min:0',
                'carbs' => 'nullable|numeric|min:0',
                'fats' => 'nullable|numeric|min:0',
                'start_date' => 'nullable|date',
                'end_date' => 'nullable|date|after_or_equal:start_date',
                'notes' => 'nullable|string',
                'meal_products' => 'nullable|array',
                'meal_products.*.food_id' => 'required|exists:foods,id',
                'meal_products.*.nutrition_type' => 'required|string|in:breakfast,lunch,dinner,snack,snacks,snacks1,snacks2,snacks3',
                'meal_products.*.quantity' => 'required|numeric|min:0',
                'meal_products.*.calories' => 'nullable|numeric|min:0',
                'meal_products.*.protein' => 'nullable|numeric|min:0',
                'meal_products.*.carbs' => 'nullable|numeric|min:0',
                'meal_products.*.fats' => 'nullable|numeric|min:0',
                'meal_products.*.label_serving' => 'nullable|string|max:255',
                'meal_products.*.unit' => 'nullable|string|max:20',
                'meal_products.*.notes' => 'nullable|string',
            ]);
            
            // Update only the assigned plan fields
            $updateData = [];
            
            if ($request->has('name')) {
                $updateData['plan'] = $request->name;
            }
            
            if ($request->has('description')) {
                $updateData['description'] = $request->description;
            }
            
            if ($request->has('calories')) {
                $updateData['calories'] = $request->calories;
            }
            
            if ($request->has('protein')) {
                $updateData['protein'] = $request->protein;
            }
            
            if ($request->has('carbs')) {
                $updateData['carbs'] = $request->carbs;
            }
            
            if ($request->has('fats')) {
                $updateData['fat_macros'] = $request->fats;
            }
            
            if ($request->has('start_date')) {
                $updateData['start_date'] = $request->start_date;
            }
            
            if ($request->has('end_date')) {
                $updateData['end_date'] = $request->end_date;
            }
            
            if ($request->has('notes')) {
                $updateData['notes'] = $request->notes;
            }
            
            $assignment->update($updateData);
            
            // Handle meal products if provided
            if ($request->has('meal_products') && is_array($request->meal_products)) {
                // Get gym_id from authenticated user
                $gym_id = $request->user('api')->gym_id ?? 1;
                
                // Delete existing member-specific meal details
                \App\Models\AssignedMealsMemberDetail::where('assigned_meal_id', $assignment->id)
                    ->where('member_id', $memberId)
                    ->delete();
                
                // Create new meal details
                foreach ($request->meal_products as $product) {
                    \App\Models\AssignedMealsMemberDetail::create([
                        'assigned_meal_id' => $assignment->id,
                        'member_id' => $memberId,
                        'gym_id' => $gym_id,
                        'food_id' => $product['food_id'],
                        'nutrition_type' => $product['nutrition_type'],
                        'label_serving' => array_key_exists('label_serving', $product) ? ($product['label_serving'] !== '' ? $product['label_serving'] : null) : null,
                        'unit' => array_key_exists('unit', $product) ? ($product['unit'] !== '' ? $product['unit'] : null) : null,
                        'quantity' => $product['quantity'] ?? 1,
                        'calories' => $product['calories'] ?? null,
                        'protein' => $product['protein'] ?? null,
                        'carbs' => $product['carbs'] ?? null,
                        'fats' => $product['fats'] ?? null,
                        'notes' => array_key_exists('notes', $product) ? ($product['notes'] !== '' ? $product['notes'] : null) : null,
                    ]);
                }
            }
            
            // Reload assignment with member details
            $assignment->load('memberDetails.food');
            
            return response()->json([
                'success' => true,
                'message' => 'Assigned meal plan updated successfully',
                'data' => $assignment
            ]);
            
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Assigned meal plan not found'
            ], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating meal plan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update label_serving / notes / unit for a single food item inside an assigned meal plan (member-specific details)
     * This is used by inline editing in the Member Detail > Edit Assigned Meal Plan modal.
     */
    public function updateAssignedMealPlanMealProductServing(Request $request, $memberId, $assignmentId)
    {
        try {
            $request->validate([
                'food_id' => 'required|integer|exists:foods,id',
                'nutrition_type' => 'required|string|in:breakfast,lunch,dinner,snack,snacks,snacks1,snacks2,snacks3',
                'label_serving' => 'nullable|string|max:255',
                'unit' => 'nullable|string|max:20',
                'notes' => 'nullable|string',
            ]);

            // Ensure assignment exists and belongs to member
            $assignment = AssignedMealsMember::where('id', $assignmentId)
                ->where('member_id', $memberId)
                ->firstOrFail();

            // Find matching details (could be multiple if same food added multiple times to the same meal)
            $details = \App\Models\AssignedMealsMemberDetail::where('assigned_meal_id', $assignment->id)
                ->where('member_id', $memberId)
                ->where('food_id', $request->food_id)
                ->where('nutrition_type', $request->nutrition_type)
                ->get();

            if ($details->isEmpty()) {
                // This assigned plan may still be based on template details (no member-specific rows yet).
                // On first inline edit, "materialize" the template into assigned_meals_member_details so we can persist changes.
                $gymId = $request->user('api')->gym_id ?? $assignment->gym_id ?? 1;

                $existingCount = \App\Models\AssignedMealsMemberDetail::where('assigned_meal_id', $assignment->id)
                    ->where('member_id', $memberId)
                    ->count();

                if ((int) $existingCount === 0) {
                    if (!$assignment->template_id) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Assigned meal plan has no template to materialize'
                        ], 422);
                    }

                    $templateDetails = \App\Models\MealPlanTemplateDetail::where('template_id', $assignment->template_id)->get();

                    if ($templateDetails->isEmpty()) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Template has no meal details to materialize'
                        ], 422);
                    }

                    DB::beginTransaction();
                    try {
                        foreach ($templateDetails as $td) {
                            \App\Models\AssignedMealsMemberDetail::create([
                                'assigned_meal_id' => $assignment->id,
                                'member_id' => $memberId,
                                'gym_id' => $gymId,
                                'food_id' => $td->food_id,
                                'nutrition_type' => $td->nutrition_type,
                                'label_serving' => $td->label_serving ?? null,
                                'unit' => 'gm',
                                'quantity' => $td->quantity ?? 1,
                                'calories' => $td->calories ?? null,
                                'protein' => $td->protein ?? null,
                                'carbs' => $td->carbs ?? null,
                                'fats' => $td->fats ?? null,
                                'notes' => $td->notes ?? null,
                            ]);
                        }
                        DB::commit();
                    } catch (\Exception $e) {
                        DB::rollBack();
                        throw $e;
                    }
                } else {
                    // Plan is already customized but this specific row is missing; create just one row.
                    $templateDetail = null;
                    if ($assignment->template_id) {
                        $templateDetail = \App\Models\MealPlanTemplateDetail::where('template_id', $assignment->template_id)
                            ->where('food_id', $request->food_id)
                            ->where('nutrition_type', $request->nutrition_type)
                            ->first();
                    }

                    if ($templateDetail) {
                        \App\Models\AssignedMealsMemberDetail::create([
                            'assigned_meal_id' => $assignment->id,
                            'member_id' => $memberId,
                            'gym_id' => $gymId,
                            'food_id' => $templateDetail->food_id,
                            'nutrition_type' => $templateDetail->nutrition_type,
                            'label_serving' => $templateDetail->label_serving ?? null,
                            'unit' => 'gm',
                            'quantity' => $templateDetail->quantity ?? 1,
                            'calories' => $templateDetail->calories ?? null,
                            'protein' => $templateDetail->protein ?? null,
                            'carbs' => $templateDetail->carbs ?? null,
                            'fats' => $templateDetail->fats ?? null,
                            'notes' => $templateDetail->notes ?? null,
                        ]);
                    } else {
                        $food = \App\Models\Food::find($request->food_id);
                        if ($food) {
                            \App\Models\AssignedMealsMemberDetail::create([
                                'assigned_meal_id' => $assignment->id,
                                'member_id' => $memberId,
                                'gym_id' => $gymId,
                                'food_id' => $food->id,
                                'nutrition_type' => $request->nutrition_type,
                                'label_serving' => null,
                                'unit' => 'gm',
                                'quantity' => 1,
                                'calories' => $food->calories ?? null,
                                'protein' => $food->protein ?? null,
                                'carbs' => $food->carbohydrate ?? null,
                                'fats' => $food->fat ?? null,
                                'notes' => null,
                            ]);
                        }
                    }
                }

                // Re-query now that we've materialized/created rows
                $details = \App\Models\AssignedMealsMemberDetail::where('assigned_meal_id', $assignment->id)
                    ->where('member_id', $memberId)
                    ->where('food_id', $request->food_id)
                    ->where('nutrition_type', $request->nutrition_type)
                    ->get();

                if ($details->isEmpty()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Product not found in this meal plan'
                    ], 404);
                }
            }

            $updateData = [];
            $all = $request->all();

            if ($request->has('label_serving') || array_key_exists('label_serving', $all)) {
                $rawValue = $request->input('label_serving');
                $trimmed = $rawValue === null ? null : trim((string) $rawValue);
                $updateData['label_serving'] = ($trimmed === null || $trimmed === '') ? null : $trimmed;
            }

            if ($request->has('unit') || array_key_exists('unit', $all)) {
                $rawValue = $request->input('unit');
                $trimmed = $rawValue === null ? null : trim((string) $rawValue);
                $updateData['unit'] = ($trimmed === null || $trimmed === '') ? null : $trimmed;
            }

            if ($request->has('notes') || array_key_exists('notes', $all)) {
                $rawValue = $request->input('notes');
                $trimmed = $rawValue === null ? null : trim((string) $rawValue);
                $updateData['notes'] = ($trimmed === null || $trimmed === '') ? null : $trimmed;
            }

            if (empty($updateData)) {
                return response()->json([
                    'success' => true,
                    'message' => 'No changes provided',
                    'data' => [
                        'food_id' => (int) $request->food_id,
                        'nutrition_type' => (string) $request->nutrition_type,
                        'label_serving' => $details->first()->label_serving,
                        'unit' => $details->first()->unit,
                        'notes' => $details->first()->notes,
                    ]
                ]);
            }

            DB::beginTransaction();
            try {
                $detailIds = $details->pluck('id')->toArray();
                DB::table('assigned_meals_member_details')
                    ->whereIn('id', $detailIds)
                    ->update($updateData);
                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }

            // Read back fresh values
            $fresh = DB::table('assigned_meals_member_details')
                ->where('assigned_meal_id', $assignment->id)
                ->where('member_id', $memberId)
                ->where('food_id', $request->food_id)
                ->where('nutrition_type', $request->nutrition_type)
                ->first();

            return response()->json([
                'success' => true,
                'message' => 'Updated successfully',
                'data' => [
                    'food_id' => (int) $request->food_id,
                    'nutrition_type' => (string) $request->nutrition_type,
                    'label_serving' => $fresh && $fresh->label_serving !== null && $fresh->label_serving !== '' ? (string) $fresh->label_serving : null,
                    'unit' => $fresh && $fresh->unit !== null && $fresh->unit !== '' ? (string) $fresh->unit : null,
                    'notes' => $fresh && $fresh->notes !== null && $fresh->notes !== '' ? (string) $fresh->notes : null,
                ]
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Assigned meal plan not found'
            ], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error updating assigned meal product serving: ' . $e->getMessage(), [
                'member_id' => $memberId,
                'assignment_id' => $assignmentId,
                'food_id' => $request->food_id ?? null,
                'nutrition_type' => $request->nutrition_type ?? null,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error updating: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete assigned meal plan for a member
     */
    public function deleteAssignedMealPlan(Request $request, $memberId, $assignmentId)
    {
        try {
            $member = Member::findOrFail($memberId);
            
            // Find the assigned meal plan
            $assignment = AssignedMealsMember::where('id', $assignmentId)
                ->where('member_id', $memberId)
                ->first();
            
            if (!$assignment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Assigned meal plan not found'
                ], 404);
            }
            
            // Delete associated member details first
            \App\Models\AssignedMealsMemberDetail::where('assigned_meal_id', $assignment->id)
                ->where('member_id', $memberId)
                ->delete();
            
            // Delete the assignment
            $assignment->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Assigned meal plan deleted successfully'
            ]);
            
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Member or assigned meal plan not found'
            ], 404);
        } catch (\Exception $e) {
            \Log::error('Error deleting assigned meal plan: ' . $e->getMessage(), [
                'member_id' => $memberId,
                'assignment_id' => $assignmentId,
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error deleting meal plan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get member instructions
     */
    public function getInstructions($id)
    {
        try {
            $member = Member::findOrFail($id);
            return response()->json([
                'success' => true,
                'instructions' => $member->instructions ?? '',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching instructions: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update member instructions
     */
    public function updateInstructions(Request $request, $id)
    {
        try {
            $member = Member::findOrFail($id);
            $member->instructions = $request->instructions;
            $member->save();

            return response()->json([
                'success' => true,
                'message' => 'Instructions updated successfully',
                'instructions' => $member->instructions,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating instructions: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get member supplements
     */
    public function getSupplements($id)
    {
        try {
            $member = Member::findOrFail($id);
            return response()->json([
                'success' => true,
                'supplements' => $member->supplements ?? '',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching supplements: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update member supplements
     */
    public function updateSupplements(Request $request, $id)
    {
        try {
            $member = Member::findOrFail($id);
            $member->supplements = $request->supplements;
            $member->save();

            return response()->json([
                'success' => true,
                'message' => 'Supplements updated successfully',
                'supplements' => $member->supplements,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating supplements: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all unique tags from members
     */
    public function getAvailableTags(Request $request)
    {
        try {
            $gym_id = $request->user('api')->gym_id ?? 1;
            
            // Get all members with tags for this gym
            $members = Member::where('gym_id', $gym_id)
                ->whereNotNull('tags')
                ->where('tags', '!=', '[]')
                ->where('tags', '!=', '')
                ->get();
            
            // Collect all unique tags
            $allTags = [];
            foreach ($members as $member) {
                if ($member->tags && is_array($member->tags)) {
                    $allTags = array_merge($allTags, $member->tags);
                }
            }
            
            // Get unique tags and sort them
            $uniqueTags = array_values(array_unique(array_filter($allTags)));
            sort($uniqueTags);
            
            // Format tags for frontend
            $formattedTags = array_map(function($tag) {
                return [
                    'name' => $tag,
                    'value' => $tag
                ];
            }, $uniqueTags);
            
            return response()->json([
                'success' => true,
                'tags' => $formattedTags
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching tags: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get member weight training & cardio
     */
    public function getWeightTrainingCardio($id)
    {
        try {
            $member = Member::findOrFail($id);
            return response()->json([
                'success' => true,
                'weight_training_cardio' => $member->weight_training_cardio ?? '',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching weight training & cardio: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update member weight training & cardio
     */
    public function updateWeightTrainingCardio(Request $request, $id)
    {
        try {
            $member = Member::findOrFail($id);
            $member->weight_training_cardio = $request->weight_training_cardio;
            $member->save();

            return response()->json([
                'success' => true,
                'message' => 'Weight training & cardio updated successfully',
                'weight_training_cardio' => $member->weight_training_cardio,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating weight training & cardio: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Save progress tracker data
     */
    public function saveProgress(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', Client::class);
        
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'metrics' => 'required|array',
            'metrics.*.type' => 'required|string|max:255',
            'metrics.*.value' => 'nullable|numeric',
            'metrics.*.unit' => 'nullable|string|max:50',
            'metrics.*.start_value' => 'nullable|numeric',
            'metrics.*.change' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $member = Member::findOrFail($id);
            // Use gym_id from user, default to 1 (users table id)
            $gym_id = $request->user('api')->gym_id ?? 1;
            $date = $request->date;

            // Delete existing progress entries for this date
            Memberprogress::where('member_id', $id)
                ->where('date', $date)
                ->delete();

            // Save new progress entries
            foreach ($request->metrics as $metric) {
                if (!empty($metric['value']) || $metric['value'] === '0' || $metric['value'] === 0) {
                    Memberprogress::create([
                        'member_id' => $id,
                        'date' => $date,
                        'metric_type' => $metric['type'],
                        'value' => $metric['value'] ?? null,
                        'unit' => $metric['unit'] ?? null,
                        'start_value' => $metric['start_value'] ?? null,
                        'change' => $metric['change'] ?? null,
                        'gym_id' => $gym_id,
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Progress values saved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save progress values: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get progress tracker data for a member
     */
    public function getProgress(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'view', Client::class);
        
        try {
            $date = $request->query('date');
            $gym_id = $request->user('api')->gym_id ?? 1;
            
            $query = Memberprogress::where('member_id', $id)
                ->where('gym_id', $gym_id);
            
            if ($date) {
                $query->where('date', $date);
            }
            
            $progressData = $query->orderBy('date', 'desc')
                ->orderBy('created_at', 'desc')
                ->get();

        return response()->json([
            'success' => true,
            'progress' => $progressData
        ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load progress data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get progress graph data for a member
     */
    public function getProgressGraph(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'view', Client::class);
        
        try {
            $metricType = $request->query('metric_type');
            $gym_id = $request->user('api')->gym_id ?? 1;
            
            $query = Memberprogress::where('member_id', $id)
                ->where('gym_id', $gym_id)
                ->whereNotNull('value');
            
            if ($metricType) {
                $query->where('metric_type', $metricType);
            }
            
            $progressData = $query->orderBy('date', 'asc')
                ->get(['date', 'metric_type', 'value']);

            // Group by metric type
            $groupedData = $progressData->groupBy('metric_type')->map(function ($items) {
                return $items->map(function ($item) {
                    return [
                        'date' => $item->date->format('Y-m-d'),
                        'value' => (float) $item->value
                    ];
                })->values()->toArray();
            });

            return response()->json([
                'success' => true,
                'data' => $groupedData
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load graph data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Check if email already exists in members or users table
     */
    public function checkEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $email = $request->input('email');
        $gym_id = $request->user('api')->gym_id ?? 1;

        // Check if email exists in members table
        $memberExists = Member::where('email', $email)
            ->where('gym_id', $gym_id)
            ->exists();

        // Check if email exists in users table
        $userExists = User::where('email', $email)
            ->where('gym_id', $gym_id)
            ->exists();

        $exists = $memberExists || $userExists;

        return response()->json([
            'success' => true,
            'exists' => $exists,
            'message' => $exists 
                ? 'This email is already registered. Please use a different email address.' 
                : 'Email is available.'
        ]);
    }

    // =====================================================
    // Height/Weight Conversion Helpers
    // =====================================================

    /**
     * Convert height to centimeters for storage
     * Accepts either direct height (cm) or feet/inches
     */
    private function convertHeightToCm($request)
    {
        // If feet/inches provided, convert to cm
        if ($request->has('height_feet') && $request->has('height_inches')) {
            $feet = (float)($request->height_feet ?? 0);
            $inches = (float)($request->height_inches ?? 0);
            $totalInches = ($feet * 12) + $inches;
            return $totalInches > 0 ? $totalInches * 2.54 : null;
        }
        
        // If preferred_length_unit is inches and height is provided, convert
        if ($request->has('height') && $request->preferred_length_unit === 'inches') {
            $heightInches = (float)$request->height;
            return $heightInches > 0 ? $heightInches * 2.54 : null;
        }
        
        // Otherwise assume height is already in cm
        return $request->has('height') ? (float)$request->height : null;
    }

    /**
     * Convert weight to kilograms for storage
     * Accepts either direct weight (kg) or pounds
     */
    private function convertWeightToKg($request)
    {
        // If preferred_weight_unit is pounds, convert to kg
        if ($request->has('weight') && $request->preferred_weight_unit === 'pounds') {
            $weightPounds = (float)$request->weight;
            return $weightPounds > 0 ? $weightPounds / 2.20462262 : null;
        }
        
        // Otherwise assume weight is already in kg
        return $request->has('weight') ? (float)$request->weight : null;
    }

    // =====================================================
    // Member Goals Methods
    // =====================================================

    /**
     * Sanitize UTF-8 strings recursively to ensure valid encoding
     * 
     * @param mixed $data
     * @return mixed
     */
    private function sanitizeUtf8($data)
    {
        if (is_string($data)) {
            // Remove invalid UTF-8 characters using iconv (most robust method)
            if (function_exists('iconv')) {
                $sanitized = @iconv('UTF-8', 'UTF-8//IGNORE', $data);
                if ($sanitized !== false) {
                    return $sanitized;
                }
            }
            // Fallback: use mb_convert_encoding to remove invalid sequences
            if (function_exists('mb_convert_encoding')) {
                // Convert from UTF-8 to UTF-8, which will remove invalid sequences
                $sanitized = @mb_convert_encoding($data, 'UTF-8', 'UTF-8');
                if ($sanitized !== false && mb_check_encoding($sanitized, 'UTF-8')) {
                    return $sanitized;
                }
            }
            // Last resort: remove invalid UTF-8 bytes using regex
            return preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $data);
        } elseif (is_array($data)) {
            return array_map([$this, 'sanitizeUtf8'], $data);
        } elseif (is_object($data)) {
            // Handle Eloquent models and objects
            if (method_exists($data, 'toArray')) {
                return $this->sanitizeUtf8($data->toArray());
            }
            // For stdClass objects, convert to array first
            $array = (array) $data;
            return $this->sanitizeUtf8($array);
        }
        return $data;
    }

    /**
     * Get all goals for a member
     */
    public function getMemberGoals(Request $request, $id)
    {
        $user = $request->user('api') ?? $request->user();
        $gym_id = $user->gym_id ?? 1;

        // Check authorization for coaches
        if ($user && isset($user->role_id) && $user->role_id === 3) {
            $coach = Coach::where('email', $user->email)->first();
            if ($coach) {
                $assignment = CoachAssignment::where('coach_id', $coach->id)
                    ->where('member_id', $id)
                    ->where('status', 'active')
                    ->first();
                
                if (!$assignment) {
                    return response()->json([
                        'success' => false,
                        'message' => 'You are not authorized to view this member\'s goals.',
                    ], 403);
                }
            }
        } else {
            $this->authorizeForUser($user, 'view', Client::class);
        }

        $goals = MemberGoal::where('member_id', $id)
            ->where('gym_id', $gym_id)
            ->get()
            ->map(function ($goal) {
                return [
                    'id' => $goal->id,
                    'goal_type' => $goal->goal_type,
                    'goal_frequency' => $goal->goal_frequency,
                    'target_value' => $goal->target_value,
                    'target_unit' => $goal->target_unit,
                    'target_description' => $goal->target_description,
                    'is_active' => $goal->is_active,
                    'start_date' => $goal->start_date ? $goal->start_date->format('Y-m-d') : null,
                    'end_date' => $goal->end_date ? $goal->end_date->format('Y-m-d') : null,
                    'current_streak' => $goal->current_streak,
                    'longest_streak' => $goal->longest_streak,
                    'last_activity_date' => $goal->last_activity_date ? $goal->last_activity_date->format('Y-m-d') : null,
                    'progress_percentage' => $goal->getProgressPercentage(),
                ];
            });

        // Sanitize the data before encoding to JSON
        $goals = $this->sanitizeUtf8($goals->toArray());

        return response()->json([
            'success' => true,
            'data' => $goals,
            'goals' => $goals, // For backward compatibility
        ]);
    }

    /**
     * Create or update a goal for a member
     */
    public function saveMemberGoal(Request $request, $id)
    {
        $user = $request->user('api') ?? $request->user();
        $gym_id = $user->gym_id ?? 1;

        // Check authorization for coaches
        if ($user && isset($user->role_id) && $user->role_id === 3) {
            $coach = Coach::where('email', $user->email)->first();
            if ($coach) {
                $assignment = CoachAssignment::where('coach_id', $coach->id)
                    ->where('member_id', $id)
                    ->where('status', 'active')
                    ->first();
                
                if (!$assignment) {
                    return response()->json([
                        'success' => false,
                        'message' => 'You are not authorized to update this member\'s goals.',
                    ], 403);
                }
            }
        } else {
            $this->authorizeForUser($user, 'update', Client::class);
        }

        $validator = Validator::make($request->all(), [
            'goal_type' => 'required|string|in:steps,cardio,strength,water,sleep,meditation,weight_loss,calories,yoga,running',
            'goal_frequency' => 'required|string|in:DAILY,WEEKLY',
            'target_value' => 'nullable|numeric',
            'target_unit' => 'nullable|string|max:50',
            'target_description' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Sanitize input data to ensure valid UTF-8 encoding
        $updateData = [
            'goal_frequency' => $request->goal_frequency,
            'target_value' => $request->target_value,
            'target_unit' => $request->target_unit ? mb_convert_encoding($request->target_unit, 'UTF-8', 'UTF-8') : null,
            'target_description' => $request->target_description ? mb_convert_encoding($request->target_description, 'UTF-8', 'UTF-8') : null,
            'is_active' => $request->has('is_active') ? $request->is_active : true,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ];

        $goal = MemberGoal::updateOrCreate(
            [
                'gym_id' => $gym_id,
                'member_id' => $id,
                'goal_type' => $request->goal_type,
            ],
            $updateData
        );

        // Sanitize the goal data before encoding to JSON
        $goalData = $this->sanitizeUtf8($goal->toArray());

        return response()->json([
            'success' => true,
            'message' => $goal->wasRecentlyCreated ? 'Goal created successfully' : 'Goal updated successfully',
            'data' => $goalData,
        ]);
    }

    /**
     * Get activities for a specific goal
     */
    public function getGoalActivities(Request $request, $id, $goalType = null)
    {
        $user = $request->user('api') ?? $request->user();
        $gym_id = $user->gym_id ?? 1;

        // Check authorization for coaches
        if ($user && isset($user->role_id) && $user->role_id === 3) {
            $coach = Coach::where('email', $user->email)->first();
            if ($coach) {
                $assignment = CoachAssignment::where('coach_id', $coach->id)
                    ->where('member_id', $id)
                    ->where('status', 'active')
                    ->first();
                
                if (!$assignment) {
                    return response()->json([
                        'success' => false,
                        'message' => 'You are not authorized to view this member\'s activities.',
                    ], 403);
                }
            }
        } else {
            $this->authorizeForUser($user, 'view', Client::class);
        }

        $query = GoalActivity::where('member_id', $id)
            ->where('gym_id', $gym_id);

        if ($goalType) {
            $query->where('goal_type', $goalType);
        }

        // Date range filters
        if ($request->has('start_date')) {
            $query->where('activity_date', '>=', $request->start_date);
        }
        if ($request->has('end_date')) {
            $query->where('activity_date', '<=', $request->end_date);
        }
        if ($request->has('month')) {
            $query->whereMonth('activity_date', $request->month);
        }
        if ($request->has('year')) {
            $query->whereYear('activity_date', $request->year);
        }

        $activities = $query->orderBy('activity_date', 'desc')
            ->get()
            ->map(function ($activity) {
                return [
                    'id' => $activity->id,
                    'goal_type' => $activity->goal_type,
                    'activity_date' => $activity->activity_date->format('Y-m-d'),
                    'activity_value' => $activity->activity_value,
                    'activity_unit' => $activity->activity_unit,
                    'is_completed' => $activity->is_completed,
                    'notes' => $activity->notes,
                    'source' => $activity->source,
                ];
            });

        // Sanitize the data before encoding to JSON
        $activities = $this->sanitizeUtf8($activities->toArray());

        return response()->json([
            'success' => true,
            'data' => $activities,
            'activities' => $activities, // For backward compatibility
        ]);
    }

    /**
     * Log an activity for a goal
     */
    public function logGoalActivity(Request $request, $id)
    {
        $user = $request->user('api') ?? $request->user();
        $gym_id = $user->gym_id ?? 1;

        // Check authorization for coaches
        if ($user && isset($user->role_id) && $user->role_id === 3) {
            $coach = Coach::where('email', $user->email)->first();
            if ($coach) {
                $assignment = CoachAssignment::where('coach_id', $coach->id)
                    ->where('member_id', $id)
                    ->where('status', 'active')
                    ->first();
                
                if (!$assignment) {
                    return response()->json([
                        'success' => false,
                        'message' => 'You are not authorized to log activities for this member.',
                    ], 403);
                }
            }
        } else {
            $this->authorizeForUser($user, 'update', Client::class);
        }

        $validator = Validator::make($request->all(), [
            'goal_type' => 'required|string|in:steps,cardio,strength,water,sleep,meditation,weight_loss,calories,yoga,running',
            'activity_date' => 'required|date',
            'activity_value' => 'nullable|numeric',
            'activity_unit' => 'nullable|string|max:50',
            'is_completed' => 'nullable|boolean',
            'notes' => 'nullable|string',
            'source' => 'nullable|string|in:manual,calendar,wearable,app',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Get the goal to check target
        $goal = MemberGoal::where('member_id', $id)
            ->where('goal_type', $request->goal_type)
            ->where('is_active', 1)
            ->first();

        // Determine if goal is completed based on target
        $isCompleted = $request->is_completed;
        if ($goal && $request->has('activity_value') && $goal->target_value) {
            if ($goal->goal_frequency === 'DAILY') {
                // For daily goals, check if value meets target
                $isCompleted = $request->activity_value >= $goal->target_value;
            } else {
                // For weekly goals, we'll count sessions
                $isCompleted = $request->is_completed ?? false;
            }
        }

        // Sanitize input data to ensure valid UTF-8 encoding
        $activityData = [
            'activity_value' => $request->activity_value,
            'activity_unit' => $request->activity_unit ? mb_convert_encoding($request->activity_unit, 'UTF-8', 'UTF-8') : null,
            'is_completed' => $isCompleted,
            'notes' => $request->notes ? mb_convert_encoding($request->notes, 'UTF-8', 'UTF-8') : null,
            'source' => $request->source ?? 'manual',
        ];

        $activity = GoalActivity::updateOrCreate(
            [
                'gym_id' => $gym_id,
                'member_id' => $id,
                'goal_type' => $request->goal_type,
                'activity_date' => $request->activity_date,
            ],
            $activityData
        );

        // Update goal's last_activity_date and streaks
        if ($goal) {
            $goal->last_activity_date = $request->activity_date;
            
            // Update streaks (simplified - you can enhance this logic)
            if ($isCompleted) {
                $lastActivity = GoalActivity::where('member_id', $id)
                    ->where('goal_type', $request->goal_type)
                    ->where('activity_date', '<', $request->activity_date)
                    ->where('is_completed', 1)
                    ->orderBy('activity_date', 'desc')
                    ->first();
                
                if ($lastActivity) {
                    $daysDiff = Carbon::parse($request->activity_date)->diffInDays(Carbon::parse($lastActivity->activity_date));
                    if ($daysDiff == 1) {
                        // Consecutive day
                        $goal->current_streak = ($goal->current_streak ?? 0) + 1;
                        $goal->longest_streak = max($goal->longest_streak ?? 0, $goal->current_streak);
                    } else {
                        // Reset streak
                        $goal->current_streak = 1;
                    }
                } else {
                    $goal->current_streak = 1;
                    $goal->longest_streak = max($goal->longest_streak ?? 0, 1);
                }
            }
            
            $goal->save();
        }

        // Sanitize the activity data before encoding to JSON
        $activityData = $this->sanitizeUtf8($activity->toArray());

        return response()->json([
            'success' => true,
            'message' => $activity->wasRecentlyCreated ? 'Activity logged successfully' : 'Activity updated successfully',
            'data' => $activityData,
        ]);
    }

    /**
     * Send invitation email to member
     * 
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendInvitation(Request $request, $id)
    {
        try {
            $member = Member::findOrFail($id);
            
            // Check if member has email
            if (!$member->email) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member does not have an email address.',
                ], 400);
            }

            // Generate password setup token
            $setupToken = Str::random(60);
            $member->update([
                'password_setup_token' => $setupToken,
                'password_setup_token_expires_at' => now()->addDays(7),
                'password_setup_required' => true,
            ]);

            // Configure mail and validate configuration
            $mailConfigSet = \App\Http\Controllers\BaseController::Set_config_mail();
            
            if (!$mailConfigSet) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email configuration not found. Please configure mail settings in Settings → Mail Settings.',
                ], 400);
            }

            // Send invitation email to member
            try {
                Mail::to($member->email)
                    ->send(new MemberPasswordSetupEmail($member, $setupToken));
                
                \Log::info('Invitation email sent to member: ' . $member->email . ' (ID: ' . $member->id . ')');
                
                return response()->json([
                    'success' => true,
                    'message' => 'Invitation email sent successfully to ' . $member->email,
                    'email_sent' => true,
                ]);
            } catch (\Exception $e) {
                // Log the full error for debugging
                $errorMessage = $e->getMessage();
                \Log::error('Failed to send invitation email to member ' . $member->id, [
                    'email' => $member->email,
                    'error' => $errorMessage,
                    'trace' => $e->getTraceAsString(),
                    'mail_config' => [
                        'host' => config('mail.mailers.smtp.host'),
                        'port' => config('mail.mailers.smtp.port'),
                        'encryption' => config('mail.mailers.smtp.encryption'),
                    ]
                ]);
                
                // Provide user-friendly error message
                if (strpos($errorMessage, 'Connection could not be established') !== false || 
                    strpos($errorMessage, 'stream_socket_client') !== false ||
                    strpos($errorMessage, 'SSL') !== false ||
                    strpos($errorMessage, 'forcibly closed') !== false ||
                    strpos($errorMessage, 'timed out') !== false) {
                    $userMessage = 'Email server connection failed. Please check your mail server settings in Settings → Mail Settings.';
                } else {
                    $userMessage = 'Failed to send email: ' . $errorMessage;
                }
                
                return response()->json([
                    'success' => false,
                    'message' => $userMessage,
                    'email_sent' => false,
                    'email_error' => $userMessage,
                ], 500);
            }
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Member not found.',
            ], 404);
        } catch (\Exception $e) {
            \Log::error('Error sending invitation email: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while sending the invitation email.',
            ], 500);
        }
    }
}