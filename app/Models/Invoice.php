<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'invoice_number',
        'member_id',
        'subscription_plan_id',
        'amount',
        'description',
        'status',
        'due_date',
        'paid_date',
        'gym_id',
        'payment_method',
        'invoice_text',
        'supplementary_text',
        'sold_by',
        'is_guest'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'due_date' => 'date',
        'paid_date' => 'date',
        'gym_id' => 'integer',
        'member_id' => 'integer',
        'subscription_plan_id' => 'integer'
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * Get the member that owns the invoice
     */
    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    /**
     * Get the subscription plan associated with the invoice
     */
    public function subscriptionPlan()
    {
        return $this->belongsTo(Plan::class, 'subscription_plan_id');
    }

    /**
     * Get the gym that owns the invoice
     */
    public function gym()
    {
        return $this->belongsTo(Gym::class, 'gym_id');
    }

    /**
     * Generate a unique invoice number
     */
    public static function generateInvoiceNumber()
    {
        $prefix = 'INV';
        $year = date('Y');
        $month = date('m');
        
        // Get the last invoice number for this month
        $lastInvoice = self::where('invoice_number', 'like', $prefix . $year . $month . '%')
            ->orderBy('invoice_number', 'desc')
            ->first();
        
        if ($lastInvoice) {
            $lastNumber = intval(substr($lastInvoice->invoice_number, -4));
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }
        
        return $prefix . $year . $month . str_pad($newNumber, 4, '0', STR_PAD_LEFT);
    }

    /**
     * Scope for gym-specific invoices
     */
    public function scopeByGym($query, $gymId)
    {
        return $query->where('gym_id', $gymId);
    }

    /**
     * Scope for pending invoices
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope for paid invoices
     */
    public function scopePaid($query)
    {
        return $query->where('status', 'paid');
    }
}
