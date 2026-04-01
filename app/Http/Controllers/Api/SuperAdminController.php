<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\GymOwnerInvitationEmail;
use App\Models\Gym;
use App\Models\GymPlan;
use App\Models\GymSubscription;
use App\Models\GymInvoice;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\PasswordReset;

class SuperAdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('super_admin');
    }
    
    /**
     * Get all gyms owned by the super admin
     */
    public function myGyms(Request $request)
    {
        $superAdmin = Auth::user();
        
        $gyms = Gym::where('super_admin_id', $superAdmin->id)
            ->with(['users', 'superAdmin'])
            ->get();
        
        return response()->json([
            'success' => true,
            'gyms' => $gyms
        ]);
    }
    
    /**
     * Get all users across all owned gyms
     */
    public function getAllUsers(Request $request)
    {
        $superAdmin = Auth::user();
        
        $gymIds = Gym::where('super_admin_id', $superAdmin->id)
            ->pluck('id');
        
        $users = User::whereIn('gym_id', $gymIds)
            ->with('gym')
            ->get();
        
        return response()->json([
            'success' => true,
            'users' => $users
        ]);
    }
    
    /**
     * Get all active gym plans for super admin (e.g. Add gym dropdown).
     * Returns all active plans regardless of stripe_price_id so seeded plans show.
     */
    public function getGymPlans(Request $request)
    {
        $plans = GymPlan::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get(['id', 'name', 'price', 'interval', 'features', 'sort_order']);

        return response()->json([
            'success' => true,
            'plans' => $plans,
        ]);
    }

    /**
     * Create a new gym subscription for another user
     */
    public function createGymSubscription(Request $request)
    {
        $request->validate([
            'gym_name' => 'required|string|max:255',
            'contact_email' => 'required|email',
            'owner_email' => 'required|email|unique:users,email',
            'owner_name' => 'required|string|max:255',
            'owner_phone' => 'nullable|string|max:255',
            'plan_id' => 'nullable|integer|exists:gym_plans,id',
        ], [
            'owner_email.unique' => 'This email is already registered. Please use a different email for the gym owner.',
        ]);
        
        $superAdmin = Auth::user();
        
        DB::beginTransaction();
        try {
            // Create gym (only columns that exist: gym_name, contact_email, subscription_status, super_admin_id)
            $gym = Gym::create([
                'gym_name' => $request->gym_name,
                'contact_email' => $request->contact_email,
                'subscription_status' => 'active',
                'super_admin_id' => $superAdmin->id,
            ]);

            // If plan_id provided, create gym subscription and optional initial invoice
            if ($request->filled('plan_id')) {
                $gymPlan = GymPlan::find($request->plan_id);
                if ($gymPlan) {
                    $nextBilling = Carbon::now()->addMonth();
                    $sub = GymSubscription::create([
                        'gym_id' => $gym->id,
                        'gym_plan_id' => $gymPlan->id,
                        'amount' => $gymPlan->price,
                        'next_billing_date' => $nextBilling,
                        'status' => 'active',
                    ]);
                    $billingMonth = Carbon::now()->startOfMonth();
                    $dueDate = Carbon::now()->addDays(30);
                    GymInvoice::create([
                        'invoice_number' => GymInvoice::generateInvoiceNumber(),
                        'gym_id' => $gym->id,
                        'gym_subscription_id' => $sub->id,
                        'amount' => $gymPlan->price,
                        'billing_month' => $billingMonth,
                        'status' => 'pending',
                        'due_date' => $dueDate,
                        'description' => "Subscription: {$gymPlan->name} - {$billingMonth->format('F Y')}",
                    ]);
                }
            }
            
            // Create gym owner user with random password (they set it via email link)
            $nameParts = explode(' ', $request->owner_name, 2);
            $owner = User::create([
                'firstname' => $nameParts[0] ?? $request->owner_name,
                'lastname' => $nameParts[1] ?? '',
                'email' => $request->owner_email,
                'username' => $request->owner_email,
                'password' => Hash::make(Str::random(32)),
                'phone' => $request->owner_phone ?? '',
                'role_id' => 1,
                'gym_id' => $gym->id,
                'statut' => 1,
                'is_super_admin' => false,
                'password_change_required' => true,
                'onboarding_required' => true,
            ]);
            
            // Create password-set token so owner can set password via email link.
            // Important: the link must point to the same app/database where this token is saved.
            // If APP_BACKEND_URL is your live site, add the gym from the live CRM so the token exists on the live DB.
            $passwordReset = PasswordReset::updateOrCreate(
                ['email' => $owner->email],
                ['token' => Str::random(60)]
            );
            // Base URL for the link (where Laravel serves password/find). Use APP_BACKEND_URL if set, else APP_URL.
            $baseUrl = rtrim(env('APP_BACKEND_URL', config('app.url')), '/');
            $setPasswordUrl = $baseUrl . '/password/find/' . $passwordReset->token;
            
            DB::commit();
            
            // Send invitation email with set-password link (no temp password)
            $emailSent = false;
            $emailError = null;
            try {
                \App\Http\Controllers\BaseController::Set_config_mail();
                Mail::to($owner->email)->send(new GymOwnerInvitationEmail($owner, $gym, $setPasswordUrl));
                $emailSent = true;
                Log::info('Gym owner invitation email sent', ['owner_id' => $owner->id, 'email' => $owner->email]);
            } catch (\Exception $e) {
                $emailError = $e->getMessage();
                Log::error('Failed to send gym owner invitation email', ['owner_id' => $owner->id, 'error' => $e->getMessage()]);
            }
            
            return response()->json([
                'success' => true,
                'message' => $emailSent
                    ? 'Gym created. Invitation email sent to the gym owner with a link to set their password.'
                    : 'Gym created. Email could not be sent: ' . $emailError,
                'gym' => $gym,
                'owner' => $owner,
                'email_sent' => $emailSent,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to create gym: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all invoices from all owned gyms
     */
    public function getAllInvoices(Request $request)
    {
        $superAdmin = Auth::user();
        
        $gymIds = Gym::where('super_admin_id', $superAdmin->id)
            ->pluck('id');
        
        $invoices = \App\Models\Invoice::whereIn('gym_id', $gymIds)
            ->with(['gym', 'member', 'subscriptionPlan'])
            ->orderBy('created_at', 'desc')
            ->get();
        
        // Group invoices by gym for easier display
        $groupedInvoices = $invoices->groupBy('gym_id');
        
        $result = [];
        foreach ($groupedInvoices as $gymId => $gymInvoices) {
            $gym = Gym::find($gymId);
            $result[] = [
                'gym_id' => $gymId,
                'gym_name' => $gym ? $gym->gym_name : 'Unknown Gym',
                'gym_email' => $gym ? $gym->contact_email : null,
                'total_invoices' => $gymInvoices->count(),
                'total_amount' => $gymInvoices->sum('amount'),
                'pending_amount' => $gymInvoices->where('status', 'pending')->sum('amount'),
                'paid_amount' => $gymInvoices->where('status', 'paid')->sum('amount'),
                'latest_invoice' => $gymInvoices->first(), // Most recent invoice
                'invoices' => $gymInvoices
            ];
        }
        
        return response()->json([
            'success' => true,
            'data' => $result,
            'summary' => [
                'total_gyms' => count($result),
                'total_invoices' => $invoices->count(),
                'total_amount' => $invoices->sum('amount'),
                'pending_amount' => $invoices->where('status', 'pending')->sum('amount'),
                'paid_amount' => $invoices->where('status', 'paid')->sum('amount'),
            ]
        ]);
    }

    /**
     * Get invoices for a specific gym
     */
    public function getGymInvoices($gymId, Request $request)
    {
        $superAdmin = Auth::user();
        
        // Verify the gym belongs to this super admin
        $gym = Gym::where('id', $gymId)
            ->where('super_admin_id', $superAdmin->id)
            ->first();
        
        if (!$gym) {
            return response()->json([
                'success' => false,
                'message' => 'Gym not found or access denied'
            ], 404);
        }
        
        $invoices = \App\Models\Invoice::where('gym_id', $gymId)
            ->with(['member', 'subscriptionPlan'])
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json([
            'success' => true,
            'gym' => $gym,
            'invoices' => $invoices,
            'summary' => [
                'total_invoices' => $invoices->count(),
                'total_amount' => $invoices->sum('amount'),
                'pending_amount' => $invoices->where('status', 'pending')->sum('amount'),
                'paid_amount' => $invoices->where('status', 'paid')->sum('amount'),
            ]
        ]);
    }
}

