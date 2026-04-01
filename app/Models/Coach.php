<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coach extends Model
{
    use HasFactory;

    protected $table = 'coaches';

    /**
     * Mass assignable attributes (all fields from your form)
     */
    protected $fillable = [
        // Personal & Professional Info
        'first_name',
        'last_name',
        'mobile_phone',
        'landline_phone',
        'gym_id',
        'email',
        'dob',
        'gender',
        'coach_experience',
        'coach_certifications',
        'specializations',
        'specialization', // Single column for specialization (JSON string)
        'years_of_experience',
        'status',

        // Physical Info
        'height_cm',
        'weight_kg',
        'chest_inch',
        'blood_group',
        'medical_conditions',

        // Address Info
        'address',
        'city',
        'state',
        'zip',

        // Additional Info
        'referred_by',
        'locker_number',
        'bio',
        'social_media',
        'notes',

        // Availability / Schedule
        'weekly_availability',
        'session_duration',
        'max_clients_per_day',

        // Payment Info
        'is_trial',
        'trial_start',
        'trial_end',
        'payment_plan',
        'payment_method',
        'rate_salary',
        'commission_percent',
        'payment_start_date',
        'bank_account_name',
        'bank_account_number',
        'payment_notes',

        // New fields
        'own_employee_id',
        'custom_export_field',
        'coach_since',
        'subscription_reason',
        'language',
        'privileges',
        'country',
        'routing_number',
        'bank_account_type',
        'bank_name',
        'send_invitation',

        // Profile Picture (database field name)
        'profile_image',
        
        // Password Setup Fields
        'password_hash',
        'password_setup_token',
        'password_setup_token_expires_at',
        'password_setup_required',
        
        // Mobile App Login Tracking
        'activated_on',
        'last_online',
    ];

    /**
     * Casts for correct data types
     */
    protected $casts = [
        'dob' => 'date',
        'trial_start' => 'date',
        'trial_end' => 'date',
        'payment_start_date' => 'date',
        'coach_since' => 'date',
        'specializations' => 'array',  // JSON multi-select
        'privileges' => 'array',  // JSON privileges
        'is_trial' => 'boolean',
        'send_invitation' => 'boolean',
        'rate_salary' => 'decimal:2',
        'commission_percent' => 'decimal:2',
        'height_cm' => 'decimal:2',
        'weight_kg' => 'decimal:2',
        'chest_inch' => 'decimal:2',
        'password_setup_required' => 'boolean',
        'password_setup_token_expires_at' => 'datetime',
        'activated_on' => 'datetime',
        'last_online' => 'datetime',
    ];

    /**
     * Validation rules for creating/updating coaches
     */
    public static $rules = [
        'first_name' => 'required|string|max:100',
        'last_name' => 'required|string|max:100',
        'mobile_phone' => 'required|string|max:20',
        'landline_phone' => 'nullable|string|max:20',
        'email' => 'required|email|unique:coaches,email',
        'address' => 'required|string|max:255',
        'city' => 'required|string|max:100',
        'state' => 'required|string|max:100',
        'zip' => 'required|string|max:20',
        'dob' => 'nullable|date',
        'gender' => 'nullable|in:Male,Female,Other',
        
        // These fields are no longer required as columns were removed from database
        'years_of_experience' => 'nullable|integer|min:0|max:50',
        'status' => 'nullable|in:Active,Inactive,On Leave,Suspended,Terminated',
        'height_cm' => 'nullable|numeric|min:0',
        'weight_kg' => 'nullable|numeric|min:0',
        'chest_inch' => 'nullable|numeric|min:0',
        'blood_group' => 'nullable|in:A+,A-,B+,B-,O+,O-,AB+,AB-',
        'medical_conditions' => 'nullable|string',
        'referred_by' => 'nullable|string|max:100',
        'locker_number' => 'nullable|string|max:10',
        'bio' => 'nullable|string',
        'social_media' => 'nullable|string',
        'notes' => 'nullable|string',
        'weekly_availability' => 'nullable|string|max:100',
        'session_duration' => 'nullable|string|max:50',
        'max_clients_per_day' => 'nullable|integer|min:1|max:20',
        'is_trial' => 'nullable|boolean',
        'trial_start' => 'nullable|date',
        'trial_end' => 'nullable|date',
        'payment_plan' => 'nullable|in:Per Session,Monthly,Commission Based',
        'payment_method' => 'nullable|in:Bank,Flutterwave,Stripe,Zelle,Paypal,Mollie,Razorpay',
        'rate_salary' => 'nullable|numeric|min:0',
        'commission_percent' => 'nullable|numeric|min:0|max:100',
        'payment_start_date' => 'nullable|date',
        'bank_account_name' => 'nullable|string|max:150',
        'bank_account_number' => 'nullable|string|max:50',
        'payment_notes' => 'nullable|string',
        'profile_image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        'own_employee_id' => 'nullable|string|max:50',
        'custom_export_field' => 'nullable|string|max:255',
        'coach_since' => 'nullable|date',
        'subscription_reason' => 'nullable|string|max:100',
        'language' => 'nullable|string|max:50',
        'privileges' => 'nullable|array',
        'country' => 'nullable|string|max:100',
        'routing_number' => 'nullable|string|max:50',
        'bank_account_type' => 'nullable|string|max:50',
        'bank_name' => 'nullable|string|max:150',
        'send_invitation' => 'nullable|boolean',
    ];

    /**
     * Get the full name of the coach
     */
    public function getFullNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    /**
     * Get the full address of the coach
     */
    public function getFullAddressAttribute()
    {
        return $this->address . ', ' . $this->city . ', ' . $this->state . ' ' . $this->zip;
    }

    /**
     * Scope to get only active coaches
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'Active');
    }

    /**
     * Check if coach has required information
     */
    public function hasRequiredInfo()
    {
        return !empty($this->first_name) && 
               !empty($this->last_name) && 
               !empty($this->mobile_phone) && 
               !empty($this->email) && 
               !empty($this->coach_id) && 
               !empty($this->years_of_experience) && 
               !empty($this->status) && 
               !empty($this->address) && 
               !empty($this->city) && 
               !empty($this->state) && 
               !empty($this->zip);
    }

    /**
     * Get coaches with missing required information
     */
    public static function scopeMissingRequiredInfo($query)
    {
        return $query->where(function($q) {
            $q->whereNull('first_name')
              ->orWhereNull('last_name')
              ->orWhereNull('mobile_phone')
              ->orWhereNull('landline_phone')
              ->orWhereNull('email')
              ->orWhereNull('coach_id')
              ->orWhereNull('years_of_experience')
              ->orWhereNull('status')
              ->orWhereNull('address')
              ->orWhereNull('city')
              ->orWhereNull('state')
              ->orWhereNull('zip');
        });
    }

    /**
     * Get coaches with complete required information
     */
    public static function scopeWithRequiredInfo($query)
    {
        return $query->whereNotNull('first_name')
                    ->whereNotNull('last_name')
                    ->whereNotNull('mobile_phone')
                    ->whereNotNull('landline_phone')
                    ->whereNotNull('email')
                    ->whereNotNull('coach_id')
                    ->whereNotNull('years_of_experience')
                    ->whereNotNull('status')
                    ->whereNotNull('address')
                    ->whereNotNull('city')
                    ->whereNotNull('state')
                    ->whereNotNull('zip');
    }

    /**
     * Get the coach's display name (with fallback)
     */
    public function getDisplayNameAttribute()
    {
        if ($this->first_name && $this->last_name) {
            return $this->first_name . ' ' . $this->last_name;
        }
        return $this->first_name ?: $this->email ?: 'Unknown Coach';
    }

    /**
     * Check if coach has profile picture
     */
    public function hasProfilePicture()
    {
        return !empty($this->profile_image);
    }

    /**
     * Get profile picture URL
     */
    public function getProfileImageUrlAttribute()
    {
        return $this->profile_image 
            ? asset('storage/' . $this->profile_image) 
            : asset('images/default-profile.jpg');
    }
    

    /**
     * Get all tasks assigned to this coach
     */
    public function tasks()
    {
        return $this->hasMany(Task::class)->where('task_type', 'coach');
    }

    /**
     * Get pending tasks assigned to this coach
     */
    public function pendingTasks()
    {
        return $this->hasMany(Task::class)->where('task_type', 'coach')->where('status', 'pending');
    }

    /**
     * Get overdue tasks assigned to this coach
     */
    public function overdueTasks()
    {
        return $this->hasMany(Task::class)
            ->where('task_type', 'coach')
            ->where('due_date', '<', now()->toDateString())
            ->whereNotIn('status', ['completed', 'cancelled']);
    }

    /**
     * Get tasks due soon (within specified days)
     */
    public function tasksDueSoon($days = 7)
    {
        $dueDate = now()->addDays($days)->toDateString();
        return $this->hasMany(Task::class)
            ->where('task_type', 'coach')
            ->where('due_date', '<=', $dueDate)
            ->whereNotIn('status', ['completed', 'cancelled']);
    }

    /**
     * Get all trainer tasks assigned to this coach
     */
    public function trainerTasks()
    {
        return $this->hasMany(TrainerTask::class, 'trainer_id');
    }

    /**
     * Get pending trainer tasks assigned to this coach
     */
    public function pendingTrainerTasks()
    {
        return $this->hasMany(TrainerTask::class, 'trainer_id')->where('status', 'pending');
    }

    /**
     * Get overdue trainer tasks assigned to this coach
     */
    public function overdueTrainerTasks()
    {
        return $this->hasMany(TrainerTask::class, 'trainer_id')->overdue();
    }

    /**
     * Get trainer tasks due soon (within specified days)
     */
    public function trainerTasksDueSoon($days = 7)
    {
        return $this->hasMany(TrainerTask::class, 'trainer_id')->dueSoon($days);
    }
}