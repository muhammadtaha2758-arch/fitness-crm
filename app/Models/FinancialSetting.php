<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FinancialSetting extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'gym_id',
        'bank_account_holder',
        'bank_account_number',
        'bic_swift_code',
        'default_sales_tax',
        'income_categories',
        'vat_percentage_manual',
        'show_employee_name',
        'append_club_id',
        'show_date_on_entry',
        'invoice_text',
        'extra_field_staff',
        'extra_field_clients_1',
        'extra_field_clients_2',
        'cc_email',
        'manual_invoices_merge',
        'pos_invoices_merge',
        'membership_invoices_merge',
    ];

    protected $casts = [
        'income_categories' => 'array',
        'vat_percentage_manual' => 'boolean',
        'show_employee_name' => 'boolean',
        'append_club_id' => 'boolean',
        'show_date_on_entry' => 'boolean',
    ];
}
