<?php

namespace App\Http\Controllers;

use Twilio\Rest\Client as Client_Twilio;
use GuzzleHttp\Client as Client_guzzle;
use App\Models\SMSMessage;
use Infobip\Api\SendSmsApi;
use Infobip\Configuration;
use Infobip\Model\SmsAdvancedTextualRequest;
use Infobip\Model\SmsDestination;
use Infobip\Model\SmsTextualMessage;
use Illuminate\Support\Str;
use App\Mail\CustomEmail;
use App\Models\EmailMessage;
use App\Models\AccountsLedger;


use App\Services\LedgerService;
use App\Services\AccountCodes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\PurchaseMail;
use App\Models\PaymentPurchase;
use App\Models\Product;
use App\Models\Unit;
use App\Models\ProductVariant;
use App\Models\product_warehouse;
use App\Models\PurchaseReturn;
use App\Models\PurchaseReturnDetails;
use App\Models\Provider;
use App\Models\Purchase;
use App\Models\PurchaseDetail;
use App\Models\Role;
use App\Models\Setting;
use App\Models\Warehouse;
use App\Models\JVSummaries;

use App\Models\User;
use App\Models\UserWarehouse;
use App\utils\helpers;
use App\Models\StockMaintenance;


use Carbon\Carbon;
use \Nwidart\Modules\Facades\Module;
use App\Models\sms_gateway;
use DB;
use PDF;
use ArPHP\I18N\Arabic;

class JVController extends BaseController
{


    public function __construct(LedgerService $ledgerService)
    {
        $this->ledgerService = $ledgerService;
    }
    //------------- Show ALL Purchases ----------\\

    public function index(request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', Purchase::class);
        $role = Auth::user()->roles()->first();
        $view_records = Role::findOrFail($role->id)->inRole('record_view');
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;
        $helpers = new helpers();
        // Filter fields With Params to retrieve
        $param = array(
            0 => 'like',
            1 => '=',

        );
        $columns = array(
            0 => 'description',
            1 => 'date',

        );
        $data = array();
        $total = 0;

        // Check If User Has Permission View  All Records
        $Purchases = JVSummaries ::where('deleted_at', '=', null);


        //Multiple Filter
        $Filtred = $helpers->filter($Purchases, $columns, $param, $request)
        // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('description', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere('date', $request->search);
                        // ->orWhere('payment_statut', 'like', "$request->search")
                        // ->orWhere(function ($query) use ($request) {
                        //     return $query->whereHas('provider', function ($q) use ($request) {
                        //         $q->where('name', 'LIKE', "%{$request->search}%");
                        //     });
                        // })
                        // ->orWhere(function ($query) use ($request) {
                        //     return $query->whereHas('warehouse', function ($q) use ($request) {
                        //         $q->where('name', 'LIKE', "%{$request->search}%");
                        //     });
                        // });
                });
            });

        $totalRows = $Filtred->count();
        if($perPage == "-1"){
            $perPage = $totalRows;
        }
        $Purchases = $Filtred->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        foreach ($Purchases as $Purchase) {

            $item['id'] = $Purchase->id;
            $item['date'] = $Purchase->date;
            $item['description'] = $Purchase->description;
            $item['total_debit'] = $Purchase->total_debit;
            $item['total_credit'] = $Purchase->total_credit;




            $data[] = $item;
        }



        return response()->json([
            'totalRows' => $totalRows,
            'purchases' => $data,

        ]);
    }

    //------ Store new Purchase -------------\\

    public function store(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'create', Purchase::class);

        request()->validate([
            'supplier_id' => 'required',
            'warehouse_id' => 'required',
        ]);

        \DB::transaction(function () use ($request) {
            $order = new Purchase;

            $order->date = $request->date;
            $order->Ref = $this->getNumberOrder();
            $order->provider_id = $request->supplier_id;
            $order->GrandTotal = $request->GrandTotal;
            $order->warehouse_id = $request->warehouse_id;
            $order->tax_rate = $request->tax_rate;
            $order->TaxNet = $request->TaxNet;
            $order->discount = $request->discount;
            $order->shipping = $request->shipping;
            $order->statut = $request->statut;
            $order->payment_statut = 'unpaid';
            $order->notes = $request->notes;
            $order->user_id = Auth::user()->id;

            $order->save();

            $data = $request['details'];
            foreach ($data as $key => $value) {
                $unit = Unit::where('id', $value['purchase_unit_id'])->first();
                $orderDetails[] = [
                    'purchase_id' => $order->id,
                    'quantity' => $value['quantity'],
                    'cost' => $value['fix_cost'],
                    'purchase_unit_id' =>  $value['purchase_unit_id'],
                    'TaxNet' => $value['tax_percent'],
                    'tax_method' => $value['tax_method'],
                    'discount' => $value['discount'],
                    'discount_method' => $value['discount_Method'],
                    'product_id' => $value['product_id'],
                    'product_variant_id' => $value['product_variant_id'],
                    'total' => $value['subtotal'],
                    'imei_number' => $value['imei_number'],
                    'created_at' => Carbon::now(),
                ];

                if ($order->statut == "received") {
                    if ($value['product_variant_id'] !== null) {
                        $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $order->warehouse_id)
                            ->where('product_id', $value['product_id'])
                            ->where('product_variant_id', $value['product_variant_id'])
                            ->first();
                        $old_quantity = $product_warehouse->qte;
                        if ($unit && $product_warehouse) {
                            if ($unit->operator == '/') {
                                $product_warehouse->qte += $value['quantity'] / $unit->operator_value;
                            } else {
                                $product_warehouse->qte += $value['quantity'] * $unit->operator_value;
                            }
                            $product_warehouse->save();
                        }

                        $stock = new StockMaintenance;
                        $stock->warehouse_id = $order->warehouse_id;
                        $stock->product_id = $value['product_id'];
                        $stock->purchased_id = $order->id;
                        $stock->date = $request->date;
                        $stock->unit_id = $value['purchase_unit_id'];
                        $stock->unit_price = $value['fix_cost'];
                        $stock->type = 'in'; // Stock In
                        $stock->stockIn = $value['quantity']; // Quantity added to stock
                        $stock->stockOut = 0; // No stock out in this case
                        $stock->total = $value['subtotal']; // No stock out in this case
                        $stock->stock_type = 'PR'; // stock type case
                        $stock->save();

                        $product = new Product;
                        $product = Product::where('deleted_at', '=', null)
                        ->where('id', $value['product_id'])
                        ->first();

                        // if ($product) {
                        // $old_product_cost = $product->cost;
                        // }
                        // $average_product_cost = (($old_product_cost * $old_quantity) + ($value['subtotal']))/ ($old_quantity + $value['quantity']);
                        // $product->cost = $average_product_cost;
                        // $product->save();





                    } else {
                        $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $order->warehouse_id)
                            ->where('product_id', $value['product_id'])
                            ->first();
                        $old_quantity = $product_warehouse->qte;
                        if ($unit && $product_warehouse) {
                            if ($unit->operator == '/') {
                                $product_warehouse->qte += $value['quantity'] / $unit->operator_value;
                            } else {
                                $product_warehouse->qte += $value['quantity'] * $unit->operator_value;
                            }
                            $product_warehouse->save();
                        }


                        $stock = new StockMaintenance;
                        $stock->warehouse_id = $order->warehouse_id;
                        $stock->product_id = $value['product_id'];
                        $stock->date = $request->date;
                        $stock->purchased_id = $order->id;
                        $stock->unit_id = $value['purchase_unit_id'];
                        $stock->unit_price = $value['fix_cost'];
                        $stock->type = 'in'; // Stock In
                        $stock->stockIn = $value['quantity']; // Quantity added to stock
                        $stock->stockOut = 0; // No stock out in this case
                        $stock->total = $value['subtotal']; // No stock out in this case
                        $stock->stock_type = 'PR'; // stock type case
                        $stock->save();


                        $product = new Product;
                        $product = Product::where('deleted_at', '=', null)
                        ->where('id', $value['product_id'])
                        ->first();

                        // if ($product) {
                        // $old_product_cost = $product->cost;
                        // }
                        // $average_product_cost = (($old_product_cost * $old_quantity) + ($value['subtotal']))/ ($old_quantity + $value['quantity']);
                        // $product->cost = $average_product_cost;
                        // $product->save();










                    }
                }
            }

                PurchaseDetail::insert($orderDetails);

                // $account_id_dr = 11041;
                // $account_id_cr = 2101;
                $account_id_dr = AccountCodes::RAW_MATERIAL;
                $account_id_cr = AccountCodes::VENDOR_ACCOUNTS_PAYABLE;

                AccountsLedger::where('voucher_number', $order->id)
                ->where('voucher_type', 'PR')
                ->delete();


                $this->ledgerService->createLedgerEntry(
                    $order->id,
                    'PR', // Assuming you have this method
                    $account_id_dr,
                    $request->GrandTotal,
                    0,
                    'Purchased Transaction',
                    null,
                    $request->date
                );


                $this->ledgerService->createLedgerEntry(
                    $order->id,
                    'PR',
                    $account_id_cr,
                    0,
                    $request->GrandTotal,
                    'Purchased Transaction',
                    null,
                    $request->date
                );


        }, 10);

        return response()->json(['success' => true, 'message' => 'Purchase Created !!']);
    }

    //--------- Update Purchase  -------------\\

    public function update(Request $request, $id)
{


    // Calculate total debit and credit
    \DB::transaction(function () use ($request, $id) {


    $rows = $request->input('rows');
    $date = $request->input('date');
    $description = $request->input('description');

    $totalDebit = array_sum(array_column($rows, 'debit'));
    $totalCredit = array_sum(array_column($rows, 'credit'));





    // Check if debit and credit sums are equal
    if ($totalDebit !== $totalCredit) {
        return response()->json(['message' => 'The total debit and credit must be equal.'], 422);
    }

    // Update JV Summary details
    $jvSummary = JVSummaries::find($id);
    if (!$jvSummary) {
        return response()->json(['message' => 'JV Voucher not found.'], 404);
    }

    $jvSummary->update([
        'description' => $description,
        'date' => $date,
        'total_debit'=> $totalDebit,
        'total_credit'=> $totalCredit
    ]);

    // Delete existing ledger entries for the JV
    AccountsLedger::where('voucher_number', $id)
        ->where('voucher_type', 'JV')
        ->delete();

    // Insert updated JV rows and ledger entries
    foreach ($rows as $row) {
        // Insert AccountsLedger rows
        AccountsLedger::create([
            'voucher_number' => $id,
            'account_id' => $row['account_head_id'],
            'description' => $row['description'],
            'voucher_type' => 'JV',
            'entry_date' => $date,
            'debit_amount' => $row['debit'] ,
            'credit_amount' => $row['credit'] ,
            'reference_number' => $id,
        ]);
    }
    },10);
    return response()->json(['message' => 'JV Voucher and Ledger updated successfully']);
}


    //------ Delete Purchase -------------\\

    public function destroy(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'delete', Purchase::class);

        \DB::transaction(function () use ($id, $request) {


        JVSummaries::where('id', $id)->delete();
        AccountsLedger::where('voucher_number', $id)
        ->where('voucher_type', 'JV')
        ->delete();

        }, 10);

        return response()->json(['success' => true, 'message' => 'Voucher Deleted !!']);
    }

    //-------------- Delete by selection  ---------------\\

    public function delete_by_selection(Request $request)
    {

        $this->authorizeForUser($request->user('api'), 'delete', Purchase::class);

        \DB::transaction(function () use ($request) {
            $role = Auth::user()->roles()->first();
            $view_records = Role::findOrFail($role->id)->inRole('record_view');
            $selectedIds = $request->selectedIds;

            foreach ($selectedIds as $purchase_id) {


                JVSummaries::where('id', $purchase_id)->delete();
                AccountsLedger::where('voucher_number', $purchase_id)
                ->where('voucher_type', 'JV')
                ->delete();


            }

        }, 10);
        return response()->json(['success' => true, 'message' => 'Purchase Deleted !!']);

    }


    //---------------- Get Details Purchase -----------------\\

    public function show($id)
    {
    // Fetch JV rows
    $jv = JVVoucher::where('id', $id)
    ->where('deleted_at', null)
    ->get();

    // Fetch associated ledger entries
    $ledgerEntries = AccountsLedger::where('voucher_number', $id)->where('type', 'JV')->get();

    $response = [
        'rows' => $jv->map(function ($row) {
            return [
                'account_head_id' => $row->account_head_id,
                'description' => $row->description,
                'type' => $row->type,
                'debit' => $row->debit,
                'credit' => $row->credit,
            ];
        }),
        'ledger' => $ledgerEntries->map(function ($entry) {
            return [
                'account_head_id' => $entry->account_head_id,
                'description' => $entry->description,
                'debit' => $entry->debit,
                'credit' => $entry->credit,
            ];
        }),
    ];

    return response()->json($response);
    }

    //--------------- Get Payments of Purchase ----------------\\

    public function Get_Payments(Request $request, $id)
    {

        $this->authorizeForUser($request->user('api'), 'view', PaymentPurchase::class);
        $role = Auth::user()->roles()->first();
        $view_records = Role::findOrFail($role->id)->inRole('record_view');
        $purchase = Purchase::findOrFail($id);

        // Check If User Has Permission view All Records
        if (!$view_records) {
            // Check If User->id === purchase->id
            $this->authorizeForUser($request->user('api'), 'check_record', $purchase);
        }

        $payments = PaymentPurchase::with('purchase')
            ->where('purchase_id', $id)
            ->where(function ($query) use ($view_records) {
                if (!$view_records) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            })->orderBy('id', 'DESC')->get();

        $due = $purchase->GrandTotal - $purchase->paid_amount;

        return response()->json(['payments' => $payments, 'due' => $due]);
    }

    //--------------- Reference Number of Purchase ----------------\\

    public function getNumberOrder()
    {

        $last = DB::table('purchases')->latest('id')->first();

        if ($last) {
            $item = $last->Ref;
            $nwMsg = explode("_", $item);
            $inMsg = $nwMsg[1] + 1;
            $code = $nwMsg[0] . '_' . $inMsg;
        } else {
            $code = 'PR_1111';
        }
        return $code;

    }


    public function getvouchernumberOrder()
    {

        $last = DB::table('purchases')->latest('id')->first();

        if ($last) {
            $item = $last->Ref;
            $nwMsg = explode("_", $item);
            $inMsg = $nwMsg[1];
            $code = $nwMsg[0] . '_' . $inMsg;
        } else {
            $code = 'PR_1111';
        }
        return $code;

    }

    //-------------- purchase PDF -----------\\

    public function Purchase_pdf(Request $request, $id)
    {
        $details = array();
        $helpers = new helpers();
        $Purchase_data = Purchase::with('details.product.unitPurchase')
            ->where('deleted_at', '=', null)
            ->findOrFail($id);

        $purchase['supplier_name'] = $Purchase_data['provider']->name;
        $purchase['supplier_phone'] = $Purchase_data['provider']->phone;
        $purchase['supplier_adr'] = $Purchase_data['provider']->adresse;
        $purchase['supplier_email'] = $Purchase_data['provider']->email;
        $purchase['supplier_tax'] = $Purchase_data['provider']->tax_number;
        $purchase['TaxNet'] = number_format($Purchase_data->TaxNet, 2, '.', '');
        $purchase['discount'] = number_format($Purchase_data->discount, 2, '.', '');
        $purchase['shipping'] = number_format($Purchase_data->shipping, 2, '.', '');
        $purchase['statut'] = $Purchase_data->statut;
        $purchase['Ref'] = $Purchase_data->Ref;
        $purchase['date'] = $Purchase_data->date;
        $purchase['GrandTotal'] = number_format($Purchase_data->GrandTotal, 2, '.', '');
        $purchase['paid_amount'] = number_format($Purchase_data->paid_amount, 2, '.', '');
        $purchase['due'] = number_format($purchase['GrandTotal'] - $purchase['paid_amount'], 2, '.', '');
        $purchase['payment_status'] = $Purchase_data->payment_statut;

        $detail_id = 0;
        foreach ($Purchase_data['details'] as $detail) {

            //-------check if detail has purchase_unit_id Or Null
            if($detail->purchase_unit_id !== null){
                $unit = Unit::where('id', $detail->purchase_unit_id)->first();
            }else{
                $product_unit_purchase_id = Product::with('unitPurchase')
                ->where('id', $detail->product_id)
                ->first();
                $unit = Unit::where('id', $product_unit_purchase_id['unitPurchase']->id)->first();
            }

            if ($detail->product_variant_id) {

                $productsVariants = ProductVariant::where('product_id', $detail->product_id)
                    ->where('id', $detail->product_variant_id)->first();

                $data['code'] = $productsVariants->code;
                $data['name'] = '['.$productsVariants->name . ']' . $detail['product']['name'];
            } else {
                $data['code'] = $detail['product']['code'];
                $data['name'] = $detail['product']['name'];
            }

                $data['detail_id'] = $detail_id += 1;
                $data['quantity'] = number_format($detail->quantity, 2, '.', '');
                $data['total'] = number_format($detail->total, 2, '.', '');
                $data['unit_purchase'] = $unit->ShortName;
                $data['cost'] = number_format($detail->cost, 2, '.', '');

            if ($detail->discount_method == '2') {
                $data['DiscountNet'] = number_format($detail->discount, 2, '.', '');
            } else {
                $data['DiscountNet'] = number_format($detail->cost * $detail->discount / 100, 2, '.', '');
            }

            $tax_cost = $detail->TaxNet * (($detail->cost - $data['DiscountNet']) / 100);
            $data['Unit_cost'] = number_format($detail->cost, 2, '.', '');
            $data['discount'] = number_format($detail->discount, 2, '.', '');

            if ($detail->tax_method == '1') {

                $data['Net_cost'] = $detail->cost - $data['DiscountNet'];
                $data['taxe'] = number_format($tax_cost, 2, '.', '');
            } else {
                $data['Net_cost'] = ($detail->cost - $data['DiscountNet']) / (($detail->TaxNet / 100) + 1);
                $data['taxe'] = number_format($detail->cost - $data['Net_cost'] - $data['DiscountNet'], 2, '.', '');
            }

            $data['is_imei'] = $detail['product']['is_imei'];
            $data['imei_number'] = $detail->imei_number;

            $details[] = $data;
        }

        $settings = Setting::where('deleted_at', '=', null)->first();
        $symbol = $helpers->Get_Currency_Code();

        $Html = view('pdf.purchase_pdf', [
            'symbol' => $symbol,
            'setting' => $settings,
            'purchase' => $purchase,
            'details' => $details,
        ])->render();

        $arabic = new Arabic();
        $p = $arabic->arIdentify($Html);

        for ($i = count($p)-1; $i >= 0; $i-=2) {
            $utf8ar = $arabic->utf8Glyphs(substr($Html, $p[$i-1], $p[$i] - $p[$i-1]));
            $Html = substr_replace($Html, $utf8ar, $p[$i-1], $p[$i] - $p[$i-1]);
        }

        $pdf = PDF::loadHTML($Html);
        return $pdf->download('purchase.pdf');

    }

    //---------------- Show Form Create Purchase ---------------\\

    public function create(Request $request)
    {

        $this->authorizeForUser($request->user('api'), 'create', Purchase::class);

         //get warehouses assigned to user
         $user_auth = auth()->user();
         if($user_auth->is_all_warehouses){
             $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
         }else{
             $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
             $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
         }

        $suppliers = Provider::where('deleted_at', '=', null)->get(['id', 'name']);

        return response()->json([
            'warehouses' => $warehouses,
            'suppliers' => $suppliers,
        ]);
    }

    //-------------Show Form Edit Purchase-----------\\

    public function edit(Request $request, $id)
    {
        $jv = JVSummaries::where('id', $id)
        ->where('deleted_at', null)
        ->get();

        // Fetch associated ledger entries
        $ledgerEntries = AccountsLedger::where('voucher_number', $id)->where('voucher_type', 'JV')->get();

        $response = [
            'rows' => $jv->map(function ($row) {
                return [
                    'date' => $row->date,
                    'description' => $row->description,
                    'debit' => $row->total_debit,
                    'credit' => $row->total_credit,
                ];
            }),
            'ledger' => $ledgerEntries->map(function ($entry) {
                return [
                    'account_head_id' => $entry->account_id,
                    'description' => $entry->description,
                    'debit' => $entry->debit_amount,
                    'credit' => $entry->credit_amount,
                ];
            }),
        ];

        return response()->json($response);
    }

    //------------------- get_Products_by_purchase -----------------\\

    public function get_Products_by_purchase(Request $request , $id)
    {

        $this->authorizeForUser($request->user('api'), 'create', PurchaseReturn::class);
        $role = Auth::user()->roles()->first();
        $view_records = Role::findOrFail($role->id)->inRole('record_view');
        $Purchase_data = Purchase::with('details.product.unitPurchase')
            ->where('deleted_at', '=', null)
            ->findOrFail($id);

        $details = array();

        // Check If User Has Permission view All Records
        if (!$view_records) {
            // Check If User->id === Purchase->id
            $this->authorizeForUser($request->user('api'), 'check_record', $Purchase_data);
        }

        $Return_detail['supplier_id'] = $Purchase_data->provider_id;
        $Return_detail['warehouse_id'] = $Purchase_data->warehouse_id;
        $Return_detail['purchase_id'] = $Purchase_data->id;
        $Return_detail['tax_rate'] = 0;
        $Return_detail['TaxNet'] = 0;
        $Return_detail['discount'] = 0;
        $Return_detail['shipping'] = 0;
        $Return_detail['statut'] = "completed";
        $Return_detail['notes'] = "";

        $detail_id = 0;
        foreach ($Purchase_data['details'] as $detail) {

            //-------check if detail has purchase_unit_id Or Null
            if($detail->purchase_unit_id !== null){
                $unit = Unit::where('id', $detail->purchase_unit_id)->first();
                $data['no_unit'] = 1;
            }else{
                $product_unit_purchase_id = Product::with('unitPurchase')
                ->where('id', $detail->product_id)
                ->first();
                $unit = Unit::where('id', $product_unit_purchase_id['unitPurchase']->id)->first();
                $data['no_unit'] = 0;
            }

            if ($detail->product_variant_id) {
                $item_product = product_warehouse::where('product_id', $detail->product_id)
                    ->where('deleted_at', '=', null)
                    ->where('product_variant_id', $detail->product_variant_id)
                    ->where('warehouse_id', $Purchase_data->warehouse_id)
                    ->first();

                $productsVariants = ProductVariant::where('product_id', $detail->product_id)
                    ->where('id', $detail->product_variant_id)->first();

                $item_product ? $data['del'] = 0 : $data['del'] = 1;
                $data['name'] = '['.$productsVariants->name . ']' . $detail['product']['name'];
                $data['code'] = $productsVariants->code;

                $data['product_variant_id'] = $detail->product_variant_id;

                if ($unit && $unit->operator == '/') {
                    $data['stock'] = $item_product ? $item_product->qte * $unit->operator_value : 0;
                } else if ($unit && $unit->operator == '*') {
                    $data['stock'] = $item_product ? $item_product->qte / $unit->operator_value : 0;
                } else {
                    $data['stock'] = 0;
                }

            } else {
                $item_product = product_warehouse::where('product_id', $detail->product_id)
                    ->where('deleted_at', '=', null)->where('product_variant_id', '=', null)
                    ->where('warehouse_id', $Purchase_data->warehouse_id)->first();

                $item_product ? $data['del'] = 0 : $data['del'] = 1;
                $data['product_variant_id'] = null;
                $data['code'] = $detail['product']['code'];
                $data['name'] = $detail['product']['name'];


                if ($unit && $unit->operator == '/') {
                    $data['stock'] = $item_product ? $item_product->qte * $unit->operator_value : 0;
                } else if ($unit && $unit->operator == '*') {
                    $data['stock'] = $item_product ? $item_product->qte / $unit->operator_value : 0;
                } else {
                    $data['stock'] = 0;
                }

            }

            $data['id'] = $detail->id;
            $data['detail_id'] = $detail_id += 1;
            $data['quantity'] = $detail->quantity;
            $data['purchase_quantity'] = $detail->quantity;
            $data['product_id'] = $detail->product_id;
            $data['unitPurchase'] = $unit->ShortName;
            $data['purchase_unit_id'] = $unit->id;

            $data['is_imei'] = $detail['product']['is_imei'];
            $data['imei_number'] = $detail->imei_number;

            if ($detail->discount_method == '2') {
                $data['DiscountNet'] = $detail->discount;
            } else {
                $data['DiscountNet'] = $detail->cost * $detail->discount / 100;
            }

            $tax_cost = $detail->TaxNet * (($detail->cost - $data['DiscountNet']) / 100);
            $data['Unit_cost'] = $detail->cost;
            $data['tax_percent'] = $detail->TaxNet;
            $data['tax_method'] = $detail->tax_method;
            $data['discount'] = $detail->discount;
            $data['discount_Method'] = $detail->discount_method;

            if ($detail->tax_method == '1') {
                $data['Net_cost'] = $detail->cost - $data['DiscountNet'];
                $data['taxe'] = $tax_cost;
                $data['subtotal'] = ($data['Net_cost'] * $data['quantity']) + ($tax_cost * $data['quantity']);
            } else {
                $data['Net_cost'] = ($detail->cost - $data['DiscountNet']) / (($detail->TaxNet / 100) + 1);
                $data['taxe'] = $detail->cost - $data['Net_cost'] - $data['DiscountNet'];
                $data['subtotal'] = ($data['Net_cost'] * $data['quantity']) + ($tax_cost * $data['quantity']);
            }

            $details[] = $data;
        }

        return response()->json([
            'details' => $details,
            'purchase_return' => $Return_detail,
        ]);

    }


     //------------- Send Email -----------\\

    public function Send_Email(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', Purchase::class);

        //purchase
        $purchase = Purchase::with('provider')->where('deleted_at', '=', null)->findOrFail($request->id);

        $helpers = new helpers();
        $currency = $helpers->Get_Currency();

        //settings
        $settings = Setting::where('deleted_at', '=', null)->first();

         //the custom msg of sale
         $emailMessage  = EmailMessage::where('name', 'purchase')->first();

         if($emailMessage){
             $message_body = $emailMessage->body;
             $message_subject = $emailMessage->subject;
         }else{
             $message_body = '';
             $message_subject = '';
         }
        //Tags
        $random_number = Str::random(10);
        $invoice_url = url('/api/purchase_url/' . $request->id.'?'.$random_number);
        $invoice_number = $purchase->Ref;

        $total_amount = $currency . ' '.number_format($purchase->GrandTotal, 2, '.', ',');
        $paid_amount  = $currency . ' '.number_format($purchase->paid_amount, 2, '.', ',');
        $due_amount   = $currency . ' '.number_format($purchase->GrandTotal - $purchase->paid_amount, 2, '.', ',');

        $contact_name = $purchase['provider']->name;
        $business_name = $settings->CompanyName;

        //receiver email
        $receiver_email = $purchase['provider']->email;

        //replace the text with tags
        $message_body = str_replace('{contact_name}', $contact_name, $message_body);
        $message_body = str_replace('{business_name}', $business_name, $message_body);
        $message_body = str_replace('{invoice_url}', $invoice_url, $message_body);
        $message_body = str_replace('{invoice_number}', $invoice_number, $message_body);

        $message_body = str_replace('{total_amount}', $total_amount, $message_body);
        $message_body = str_replace('{paid_amount}', $paid_amount, $message_body);
        $message_body = str_replace('{due_amount}', $due_amount, $message_body);

        $email['subject'] = $message_subject;
        $email['body'] = $message_body;
        $email['company_name'] = $business_name;

        $this->Set_config_mail();
        $mail = Mail::to($receiver_email)->send(new CustomEmail($email));
        return $mail;
    }

     //-------------------Sms Notifications -----------------\\

     public function Send_SMS(Request $request)
     {

        $this->authorizeForUser($request->user('api'), 'view', Purchase::class);

         //purchase
         $purchase = Purchase::with('provider')->where('deleted_at', '=', null)->findOrFail($request->id);

         $helpers = new helpers();
         $currency = $helpers->Get_Currency();

         //settings
         $settings = Setting::where('deleted_at', '=', null)->first();

         $default_sms_gateway = sms_gateway::where('id' , $settings->sms_gateway)
            ->where('deleted_at', '=', null)->first();

         //the custom msg of purchase
         $smsMessage  = SMSMessage::where('name', 'purchase')->first();

         if($smsMessage){
             $message_text = $smsMessage->text;
         }else{
             $message_text = '';
         }

         //Tags
         $random_number = Str::random(10);
         $invoice_url = url('/api/purchase_pdf/' . $request->id.'?'.$random_number);
         $invoice_number = $purchase->Ref;

         $total_amount = $currency . ' '.number_format($purchase->GrandTotal, 2, '.', ',');
         $paid_amount  = $currency . ' '.number_format($purchase->paid_amount, 2, '.', ',');
         $due_amount   = $currency . ' '.number_format($purchase->GrandTotal - $purchase->paid_amount, 2, '.', ',');

         $contact_name = $purchase['provider']->name;
         $business_name = $settings->CompanyName;

         //receiver Number
         $receiverNumber = $purchase['provider']->phone;

         //replace the text with tags
         $message_text = str_replace('{contact_name}', $contact_name, $message_text);
         $message_text = str_replace('{business_name}', $business_name, $message_text);
         $message_text = str_replace('{invoice_url}', $invoice_url, $message_text);
         $message_text = str_replace('{invoice_number}', $invoice_number, $message_text);

         $message_text = str_replace('{total_amount}', $total_amount, $message_text);
         $message_text = str_replace('{paid_amount}', $paid_amount, $message_text);
         $message_text = str_replace('{due_amount}', $due_amount, $message_text);

         //twilio
         if($default_sms_gateway->title == "twilio"){
             try {

                 $account_sid = env("TWILIO_SID");
                 $auth_token = env("TWILIO_TOKEN");
                 $twilio_number = env("TWILIO_FROM");

                 $client = new Client_Twilio($account_sid, $auth_token);
                 $client->messages->create($receiverNumber, [
                     'from' => $twilio_number,
                     'body' => $message_text]);

             } catch (Exception $e) {
                 return response()->json(['message' => $e->getMessage()], 500);
             }
         //nexmo
         }elseif($default_sms_gateway->title == "nexmo"){
             try {

                 $basic  = new \Nexmo\Client\Credentials\Basic(env("NEXMO_KEY"), env("NEXMO_SECRET"));
                 $client = new \Nexmo\Client($basic);
                 $nexmo_from = env("NEXMO_FROM");

                 $message = $client->message()->send([
                     'to' => $receiverNumber,
                     'from' => $nexmo_from,
                     'text' => $message_text
                 ]);

             } catch (Exception $e) {
                 return response()->json(['message' => $e->getMessage()], 500);
             }

         //---- infobip
         }elseif($default_sms_gateway->title == "infobip"){

             $BASE_URL = env("base_url");
             $API_KEY = env("api_key");
             $SENDER = env("sender_from");

             $configuration = (new Configuration())
                 ->setHost($BASE_URL)
                 ->setApiKeyPrefix('Authorization', 'App')
                 ->setApiKey('Authorization', $API_KEY);

             $client = new Client_guzzle();

             $sendSmsApi = new SendSMSApi($client, $configuration);
             $destination = (new SmsDestination())->setTo($receiverNumber);
             $message = (new SmsTextualMessage())
                 ->setFrom($SENDER)
                 ->setText($message_text)
                 ->setDestinations([$destination]);

             $request = (new SmsAdvancedTextualRequest())->setMessages([$message]);

             try {
                 $smsResponse = $sendSmsApi->sendSmsMessage($request);
                 echo ("Response body: " . $smsResponse);
             } catch (Throwable $apiException) {
                 echo("HTTP Code: " . $apiException->getCode() . "\n");
             }

         }

         return response()->json(['success' => true]);

     }




}
