<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\TransferMoney;
use App\Models\Role;
use App\Models\AccountsLedger;
use App\Services\AccountCodes;
use App\Services\LedgerService;

use DB;


use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransferMoneyController extends BaseController
{


    public function __construct(LedgerService $ledgerService)
    {
        $this->ledgerService = $ledgerService;
    }



    //-------------- Get All Transfer Money ---------------\\

    public function index(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', Transfer::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;

        // Check If User Has Permission View  All Records
        $transfers = TransferMoney::with('from_account', 'to_account')->where('deleted_at', '=', null)

            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return  $query->where(function ($query) use ($request) {
                        return $query->whereHas('from_account', function ($q) use ($request) {
                            $q->where('account_name', 'LIKE', "%{$request->search}%");
                        });
                    })
                    ->orWhere(function ($query) use ($request) {
                        return $query->whereHas('to_account', function ($q) use ($request) {
                            $q->where('account_name', 'LIKE', "%{$request->search}%");
                        });
                    });
                });
            });


        $accounts = Account::where('parent_id', '=', '1.1.1')->get(['account_number', 'account_name']);
        $totalRows = $transfers->count();
        if($perPage == "-1"){
            $perPage = $totalRows;
        }
        $transfer_data = $transfers->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        $data = [];
        foreach ($transfer_data as $transfer) {
            $fromAccountName = $accounts->firstWhere('account_number', $transfer->from_account_id)->account_name ?? 'N/A';

            // Find the to_account name in the accounts array
            $toAccountName = $accounts->firstWhere('account_number', $transfer->to_account_id)->account_name ?? 'N/A';
            $item['id']           = $transfer->id;
            $item['from_account'] = $fromAccountName ?? 'N/A';
            $item['to_account']   = $toAccountName ?? 'N/A';
            $item['from_account_id']     = $transfer->from_account_id;
            $item['to_account_id']       = $transfer->to_account_id;
            $item['amount']       = $transfer->amount;
            $item['date']         = $transfer->date;

            $data[] = $item;
        }



        return response()->json([
            'transfers' => $data,
            'accounts' => $accounts,
            'totalRows' => $totalRows,
        ]);

    }

    //-------------- Store New TransferMoney ---------------\\

    public function store(Request $request)
    {
        // $this->authorizeForUser($request->user('api'), 'create', TransferMoney::class);


        request()->validate([
            'from_account_id' => 'required|different:to_account_id',
            'to_account_id' => 'required|different:from_account_id',
            'amount' => 'required',
            'date' => 'required',
        ],
        [
        'from_account_id.different' => 'From and to accounts cannot be the same.',
        'to_account_id.different' => 'To and from accounts cannot be the same.'
        ]);


        // Additional check if from_account_id and to_account_id are not the same
        if ($request->from_account_id === $request->to_account_id) {
            return response()->json(['error' => 'Account From and to account cannot be the same.'], 400);
        }

        // Retrieve account balances
        // $from_account = Account::findOrFail($request->from_account_id);
        // $to_account   = Account::findOrFail($request->to_account_id);



        $from_account = DB::table('accounts_ledger')
        ->where('account_id', $request->from_account_id)
        ->selectRaw('SUM(credit_amount - debit_amount) as balance')
        ->value('balance');

        // $to_account   = Account::findOrFail($transfer->to_account_id);

        $to_account = DB::table('accounts_ledger')
        ->where('account_id',$request->to_account_id)
        ->selectRaw('SUM(credit_amount - debit_amount) as balance')
        ->value('balance');

        // Check if from_account has enough balance
        if ($from_account < $request->amount) {
            return response()->json(['error' => 'Insufficient balance in the from account.'.$request->from_account_id], 400);
        }

        \DB::transaction(function () use ($request, $from_account, $to_account) {



            $transfer = TransferMoney::create([
                'from_account_id' => $request['from_account_id'],
                'to_account_id'   => $request['to_account_id'],
                'amount'          => $request['amount'],
                'date'            => $request['date'],
            ]);


            $account_id_dr = $request['from_account_id'];
            $account_id_cr =  $request['to_account_id'];


            $this->ledgerService->createLedgerEntry(
                $transfer->id,
                'TM', // Assuming you have this method
                $account_id_dr,
                $request['amount'],
                0,
                'Transfer Money',
                $transfer->id,
                $request['date']
            );


            $this->ledgerService->createLedgerEntry(
                $transfer->id,
                'TM',
                $account_id_cr,
                0,
                $request['amount'],
                'Transfer Money',
                $transfer->id,
                $request['date']
            );

            // $from_account->update([
            //     'balance' => $from_account->balance - $request->amount,
            // ]);

            // $to_account->update([
            //     'balance' => $to_account->balance + $request->amount,
            // ]);

        }, 10);

        return response()->json(['success' => true], 200);
    }



    public function getBalance($account_id)
    {
        $balance = DB::table('accounts_ledger')
            ->where('account_id', $account_id)
            ->selectRaw('SUM(credit_amount - debit_amount) as balance')
            ->value('balance');

        return response()->json(['balance' => round($balance,2)]);
    }
    //------------ function show -----------\\

    public function show($id){
    //

    }

    //-------------- Update TransferMoney ---------------\\

    public function update(Request $request, $id)
    {
        // $this->authorizeForUser($request->user('api'), 'update', TransferMoney::class);


        $transfer = TransferMoney::findOrFail($id);


        request()->validate([
            'amount' => 'required',
            'date' => 'required',
        ]);

        // Retrieve account
        // $from_account = AccountsLedger::findOrFail($transfer->from_account_id);


        $from_account = DB::table('accounts_ledger')
        ->where('account_id', $transfer->from_account_id)
        ->selectRaw('SUM(credit_amount - debit_amount) as balance')
        ->value('balance');

        // $to_account   = Account::findOrFail($transfer->to_account_id);

        $to_account = DB::table('accounts_ledger')
        ->where('account_id', $transfer->to_account_id)
        ->selectRaw('SUM(credit_amount - debit_amount) as balance')
        ->value('balance');


        // Additional check if from_account_id and to_account_id are not the same
        if ($request->from_account_id === $request->to_account_id) {
            return response()->json(['error' => 'Account From and to account cannot be the same.'], 400);
        }

        // Check if from_account has enough balance
        if (($from_account + $transfer->amount) < $request->amount) {
            return response()->json(['error' => 'Insufficient balance in the from account.'], 400);
        }


        \DB::transaction(function () use ($request, $id, $from_account, $to_account, $transfer) {


            AccountsLedger::where('voucher_number', $id)
            ->where('voucher_type', 'TM')
            ->delete();





            $account_id_dr = $request['from_account_id'];
            $account_id_cr =  $request['to_account_id'];


            $this->ledgerService->createLedgerEntry(
                $id,
                'TM', // Assuming you have this method
                $account_id_dr,
                $request['amount'],
                0,
                'Transfer Money',
                $id,
                $request['date']
            );


            $this->ledgerService->createLedgerEntry(
                $transfer->id,
                'TM',
                $account_id_cr,
                0,
                $request['amount'],
                'Transfer Money',
                $transfer->id,
                $request['date']
            );

            // $from_account->update([
            //     'balance' => $from_account->balance + $transfer->amount - $request->amount,
            // ]);

            // $to_account->update([
            //     'balance' => $to_account->balance - $transfer->amount + $request->amount,
            // ]);


            $transfer->update([
                'amount'          => $request['amount'],
                'date'            => $request['date'],
            ]);

        }, 10);
        return response()->json(['success' => true], 200);

    }

    //-------------- Delete TransferMoney ---------------\\

    public function destroy(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'delete', TransferMoney::class);

        \DB::transaction(function () use ($request, $id) {

           $transfer = TransferMoney::findOrFail($id);

            // Retrieve account
            $from_account = Account::findOrFail($transfer->from_account_id);
            $to_account   = Account::findOrFail($transfer->to_account_id);

            $from_account->update([
                'balance' => $from_account->balance + $transfer->amount,
            ]);

            $to_account->update([
                'balance' => $to_account->balance - $transfer->amount,
            ]);


            AccountsLedger::where('voucher_number', $id)
            ->where('voucher_type', 'TM')
            ->delete();

            $transfer->update([
                'deleted_at' => Carbon::now(),
            ]);

        }, 10);

        return response()->json(['success' => true], 200);
    }


}
