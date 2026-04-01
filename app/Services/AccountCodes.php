<?php

namespace App\Services;

class AccountCodes
{
    // Assets
    const CASH_AND_CASH_EQUIVALENTS = '1.1.1';
    const CUSTOMER_ACCOUNTS_RECEIVABLE = '1.1.2.1';
    const RAW_MATERIAL = '1.1.3.1';
    const PRODUCTION_WIP = '1.1.3.2';
    const FINISH_INV = '1.1.3.3';
    // Liabilities
    const VENDOR_ACCOUNTS_PAYABLE = '2.1.1.1';

    // Equity
    const OWNERS_CAPITAL = '3.1.1';
    const RETAINED_EARNINGS = '3.1.2';
    const OWNERS_DRAWINGS = '3.1.3';

    // Income
    const DINE_IN_FOOD_SALES = '4.1.1.1';
    const TAKEOUT_FOOD_SALES = '4.1.1.2';
    const DELIVERY_FOOD_SALES = '4.1.1.3';
    const SALES_RETURN = '4.1.2.1';

    // Expenses
    const PURCHASES = '5.1.1.1';
    const PURCHASES_RETURN = '5.1.2';
    const OPERATING_EXPENSES = '5.2';
    const SUPPLIES_EXPENSE = '5.2.3';
    const MARKETING_AND_ADVERTISING = '5.2.4';



}
