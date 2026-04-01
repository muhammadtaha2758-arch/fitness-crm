<?php

namespace App\Services;

use App\Models\AccountsLedger;
use Illuminate\Support\Facades\Auth;

class LedgerService
{
    /**
     * Create a new ledger entry.
     *
     * @param int $voucherNumber
     * @param string $voucherType
     * @param int $accountId
     * @param float $debitAmount
     * @param float $creditAmount
     * @param string|null $description
     * @param string|null $referenceNumber
     * @param string $entryDate
     * @return AccountsLedger
     */
    public function createLedgerEntry(
        int $voucherNumber,
        string $voucherType,
        string $accountId,
        float $debitAmount,
        float $creditAmount,
        ?string $description,
        ?string $referenceNumber,
        string $entryDate
    ): AccountsLedger {




        return AccountsLedger::create([
            'voucher_number' => $voucherNumber,
            'voucher_type' => $voucherType,
            'account_id' => $accountId,
            'debit_amount' => $debitAmount,
            'credit_amount' => $creditAmount,
            'reference_number' => $referenceNumber,
            'description' => $description,
            'entry_date' => $entryDate,
            'created_by' => Auth::user()->id,
        ]);
    }
}