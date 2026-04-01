<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Appointment;
use App\Models\NutritionPlan;
use App\Models\CoachAssignment;
use App\Models\AssignedMealsMember;
use App\Traits\Encryptable;
use Carbon\Carbon;

class Member extends Model
{
    use SoftDeletes, Encryptable;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'gym_id',
        'profile_image',
        'subscription_id',
        'subscription_plan_id',
        'membername',
        'firstname',
        'lastname',
        'password_hash',
        'password_setup_token',
        'password_setup_token_expires_at',
        'password_setup_required',
        'email',
        'phone',
        'mobile_phone',
        'landline_phone',
        'date_of_birth',
        'gender',
        'city',
        'zipcode',
        'start_date',
        'end_date',
        'height',
        'weight',
        'medical_condition',
        'instructions',
        'supplements',
        'weight_training_cardio',
        'body_type',
        'free_account',
        'contact_name',
        'contact_phone',
        'plan',
        'Expires',
        'Statuses',
        'tags',
        'address',
        'member_since',
        'last_login',
        'first_mobile_login',
        'created_at',
        'token',
        'coach_id', // Current active coach (denormalized for quick access)
        // Bank details
        'bank_account_number',
        'bank_account_type',
        'bank_account_holder_name',
        'bank_name',
        'routing_number',
        'mandate_id',
        'exclude_from_online_payments',
        // Additional fields
        'extra_address',
        'country',
        'is_business',
        'business_type',
        'subscription_reason',
        'source',
        'own_member_id',
        'custom_export_field',
        // Settings fields
        'preferred_length_unit',
        'preferred_weight_unit',
        'height_feet',
        'height_inches',
    ];

    protected $casts = [
        'gym_id' => 'integer',
        'exclude_from_online_payments' => 'boolean',
        'password_setup_required' => 'boolean',
        'password_setup_token_expires_at' => 'datetime',
        'free_account' => 'boolean',
        'first_mobile_login' => 'datetime',
        'tags' => 'array',
    ];

    /**
     * Get the unsubscribe records for the member
     */
    public function unsubscribes()
    {
        return $this->hasMany(MemberUnsubscribe::class);
    }

    /**
     * Get the active unsubscribe record for the member
     */
    public function activeUnsubscribe()
    {
        return $this->hasOne(MemberUnsubscribe::class)->where('status', 'active');
    }

    /**
     * Get the invoices for the member
     */
    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    /**
     * Get the pending invoices for the member
     */
    public function pendingInvoices()
    {
        return $this->hasMany(Invoice::class)->where('status', 'pending');
    }

    public function getFormattedMemberId()
    {
        if (!$this->id) {
            return "M-000000";
        }
        
        $year = date('Y');
        $paddedId = str_pad($this->id, 5, '0', STR_PAD_LEFT);
        return "M-{$year}-{$paddedId}";
    }

    /**
     * Scope to search by formatted Member ID
     */
    public function scopeByFormattedMemberId($query, $formattedId)
    {
        if (preg_match('/^M-\d{4}-(\d+)$/', $formattedId, $matches)) {
            $numericId = intval($matches[1]);
            return $query->where('id', $numericId);
        }
        
        return $query;
    }

    /**
     * Get all appointments for this member
     */
    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'client_id');
    }

    /**
     * Get upcoming appointments for this member
     */
    public function upcomingAppointments()
    {
        return $this->hasMany(Appointment::class, 'client_id')
            ->where('date', '>=', now()->format('Y-m-d'))
            ->orderBy('date', 'asc')
            ->orderBy('start_time', 'asc');
    }

    /**
     * Get completed appointments for this member
     */
    public function completedAppointments()
    {
        return $this->hasMany(Appointment::class, 'client_id')
            ->where('status', 'completed');
    }

    /**
     * Get all nutrition plans for this member
     */
    public function nutritionPlans()
    {
        return $this->hasMany(NutritionPlan::class, 'member_id');
    }

    /**
     * Get active nutrition plans for this member
     */
    public function activeNutritionPlans()
    {
        return $this->hasMany(NutritionPlan::class, 'member_id')
            ->where(function($query) {
                $query->whereNull('end_date')
                      ->orWhere('end_date', '>=', now()->format('Y-m-d'));
            });
    }

    /**
     * Get assigned meals for this member
     */
    public function assignedMeals()
    {
        return $this->hasMany(AssignedMealsMember::class, 'member_id');
    }

    /**
     * Get active assigned meal plans for this member
     */
    public function activeAssignedMeals()
    {
        return $this->hasMany(AssignedMealsMember::class, 'member_id')
            ->whereNotNull('template_id')
            ->where(function($query) {
                $query->whereNull('end_date')
                      ->orWhere('end_date', '>=', now()->format('Y-m-d'));
            });
    }

    /**
     * Get current nutrition plan for this member
     */
    public function currentNutritionPlan()
    {
        return $this->hasOne(NutritionPlan::class, 'member_id')
            ->where('start_date', '<=', now()->format('Y-m-d'))
            ->where(function($query) {
                $query->whereNull('end_date')
                      ->orWhere('end_date', '>=', now()->format('Y-m-d'));
            });
    }

    /**
     * Get coach assignments for this member
     */
    public function coachAssignments()
    {
        return $this->hasMany(CoachAssignment::class, 'member_id');
    }

    /**
     * Get the active coach assignment for this member
     */
    public function activeCoachAssignment()
    {
        return $this->hasOne(CoachAssignment::class, 'member_id')
            ->where('status', 'active');
    }

    /**
     * Get the current active coach for this member (convenience method)
     */
    public function getCurrentCoachAttribute()
    {
        $assignment = $this->activeCoachAssignment;
        return $assignment ? $assignment->coach : null;
    }

    /**
     * Get the current coach ID (convenience method)
     */
    public function getCurrentCoachIdAttribute()
    {
        $assignment = $this->activeCoachAssignment;
        return $assignment ? $assignment->coach_id : null;
    }

    /**
     * Get the current active coach directly (using denormalized coach_id)
     */
    public function coach()
    {
        return $this->belongsTo(Coach::class, 'coach_id');
    }

    public function coachingProfile()
    {
        return $this->hasOne(MemberCoachingProfile::class, 'member_id');
    }

    /**
     * Groups this member belongs to
     */
    public function groups()
    {
        return $this->belongsToMany(Group::class, 'group_members', 'member_id', 'group_id');
    }

    /**
     * Get the subscription plan for this member
     */
    public function subscriptionPlan()
    {
        return $this->belongsTo(Plan::class, 'subscription_id');
    }

    /**
     * Get the membership assignments for this member
     */
    public function membershipAssignments()
    {
        return $this->hasMany(MemberMembershipAssignment::class, 'member_id');
    }

    /**
     * Get the subscription invitations for this member
     */
    public function subscriptionInvitations()
    {
        return $this->hasMany(SubscriptionInvitation::class);
    }

    /**
     * Get the latest subscription invitation for this member
     */
    public function latestSubscriptionInvitation()
    {
        return $this->hasOne(SubscriptionInvitation::class)->latest();
    }

    /**
     * Check if member's subscription has expired
     */
    public function hasExpiredSubscription()
    {
        if (!$this->Expires) {
            return false;
        }
        
        return Carbon::parse($this->Expires)->isPast();
    }

    /**
     * Check if member's subscription expires within given days
     */
    public function subscriptionExpiresWithinDays($days = 7)
    {
        if (!$this->Expires) {
            return false;
        }
        
        return Carbon::parse($this->Expires)->diffInDays(now()) <= $days;
    }

    /**
     * Get members with expired subscriptions
     */
    public function scopeWithExpiredSubscriptions($query)
    {
        return $query->whereNotNull('Expires')
                    ->where('Expires', '<', now()->format('Y-m-d'))
                    ->where('Statuses', 'active');
    }

    /**
     * Get members whose subscriptions expire soon
     */
    public function scopeWithExpiringSubscriptions($query, $days = 7)
    {
        $expiryDate = now()->addDays($days)->format('Y-m-d');
        return $query->whereNotNull('Expires')
                    ->where('Expires', '<=', $expiryDate)
                    ->where('Expires', '>=', now()->format('Y-m-d'))
                    ->where('Statuses', 'active');
    }

    /**
     * Check if member has an active subscription (package).
     * True if: has an active membership assignment OR (Expires in future AND Statuses === 'active').
     *
     * @param int|null $gymId Optional gym scope for assignment check; defaults to member's gym_id.
     * @return bool
     */
    public function hasActiveSubscription($gymId = null)
    {
        $gymId = $gymId ?? $this->gym_id;
        $today = Carbon::today()->toDateString();

        $hasActiveAssignment = $this->membershipAssignments()
            ->when($gymId, function ($q) use ($gymId) {
                $q->where('gym_id', $gymId);
            })
            ->where('status', 'active')
            ->where(function ($q) use ($today) {
                $q->whereNull('end_date')->orWhere('end_date', '>=', $today);
            })
            ->where('start_date', '<=', $today)
            ->exists();

        if ($hasActiveAssignment) {
            return true;
        }

        $hasValidExpires = $this->Expires && Carbon::parse($this->Expires)->isFuture();
        $statusActive = ($this->Statuses === 'active');

        return $hasValidExpires && $statusActive;
    }

    // ==================== ENCRYPTED BANK FIELDS ====================

    /**
     * Get decrypted bank account number
     */
    public function getBankAccountNumberAttribute($value)
    {
        return $this->decrypt($value);
    }

    /**
     * Set encrypted bank account number
     */
    public function setBankAccountNumberAttribute($value)
    {
        $this->attributes['bank_account_number'] = $this->encrypt($value);
    }

    /**
     * Get masked bank account number for display
     */
    public function getMaskedBankAccountNumberAttribute()
    {
        $value = $this->decrypt($this->attributes['bank_account_number'] ?? null);
        if (empty($value)) return '';
        return $this->mask($value, 'account_number');
    }

    /**
     * Get decrypted routing number
     */
    public function getRoutingNumberAttribute($value)
    {
        return $this->decrypt($value);
    }

    /**
     * Set encrypted routing number
     */
    public function setRoutingNumberAttribute($value)
    {
        $this->attributes['routing_number'] = $this->encrypt($value);
    }

    /**
     * Get masked routing number for display
     */
    public function getMaskedRoutingNumberAttribute()
    {
        $value = $this->decrypt($this->attributes['routing_number'] ?? null);
        if (empty($value)) return '';
        return $this->mask($value, 'routing_number');
    }

    /**
     * Get decrypted bank account holder name
     */
    public function getBankAccountHolderNameAttribute($value)
    {
        return $this->decrypt($value);
    }

    /**
     * Set encrypted bank account holder name
     */
    public function setBankAccountHolderNameAttribute($value)
    {
        $this->attributes['bank_account_holder_name'] = $this->encrypt($value);
    }

    /**
     * Get masked bank account holder name for display
     */
    public function getMaskedBankAccountHolderNameAttribute()
    {
        $value = $this->decrypt($this->attributes['bank_account_holder_name'] ?? null);
        if (empty($value)) return '';
        return $this->mask($value, 'name');
    }

    /**
     * Member check-ins relationship.
     */
    public function checkIns()
    {
        return $this->hasMany(CheckIn::class, 'member_id');
    }

    /**
     * Latest check-in shortcut.
     */
    public function latestCheckIn()
    {
        return $this->hasOne(CheckIn::class, 'member_id')->latestOfMany('check_in_time');
    }

    /**
     * Get all member credits
     */
    public function memberCredits()
    {
        return $this->hasMany(MemberCredit::class, 'member_id');
    }

    /**
     * Get active member credits
     */
    public function activeMemberCredits()
    {
        return $this->hasMany(MemberCredit::class, 'member_id')
            ->where('status', 'active');
    }

    /**
     * Get all credit transactions
     */
    public function creditTransactions()
    {
        return $this->hasMany(MemberCreditTransaction::class, 'member_id');
    }
}
