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

use App\Models\Category;


use App\Services\AccountCodes;

use App\Services\LedgerService;
use App\Models\AccountsLedger;

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

use App\Models\Recipe;
use App\Models\RecipeDetail;
use App\Models\StockMaintenance;


use App\Models\Role;
use App\Models\Setting;
use App\Models\Warehouse;
use App\Models\User;
use App\Models\UserWarehouse;
use App\utils\helpers;
use Carbon\Carbon;
use \Nwidart\Modules\Facades\Module;
use App\Models\sms_gateway;
use DB;
use PDF;
use ArPHP\I18N\Arabic;

class ProductionController extends BaseController
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
        
        // if ($order === 'products') {
        //     $order = 'product.id';
        // };
        $dir = $request->SortType;
        $helpers = new helpers();
        // Filter fields With Params to retrieve
        $param = array(
            0 => 'like',
            1 => 'like',
            2 => '=',
            3 => 'like',
            4 => '=',
            5 => '=',
        );
        $columns = array(
            0 => 'Ref',
            1 => 'statut',
            2 => 'provider_id',
            3 => 'payment_statut',
            4 => 'warehouse_id',
            5 => 'date',
        );
        $data = array();
        $total = 0;

        // Check If User Has Permission View  All Records
        $Purchases = Purchase::with('details.product')
            ->where('deleted_at', '=', null)
            ->where('type', '=', 'production')
            ->where(function ($query) use ($view_records) {
                if (!$view_records) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            });

        //Multiple Filter
        $Filtred = $helpers->filter($Purchases, $columns, $param, $request)
        // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere('GrandTotal', $request->search)
                        ->orWhere('payment_statut', 'like', "$request->search")
                        // ->orWhere(function ($query) use ($request) {
                        //     return $query->whereHas('provider', function ($q) use ($request) {
                        //         $q->where('name', 'LIKE', "%{$request->search}%");
                        //     });
                        // })
                        // ->orWhere(function ($query) use ($request) {
                        //     return $query->whereHas('warehouse', function ($q) use ($request) {
                        //         $q->where('name', 'LIKE', "%{$request->search}%");
                        //     });
                        // })
                        ;
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
            $item['Ref'] = $Purchase->Ref;
            $item['name'] = $Purchase->name;
            $item['warehouse_name'] = "abc";//$Purchase['warehouse']->name;
            $item['discount'] = $Purchase->discount;
            $item['shipping'] = $Purchase->shipping;
            $item['statut'] = $Purchase->statut;
            $item['provider_id'] = "abc";//$Purchase['provider']->id;
            $item['provider_name'] = "abc";//$Purchase['provider']->name;
            $item['provider_email'] = "abc";//$Purchase['provider']->email;
            $item['provider_tele'] = "abc";//$Purchase['provider']->phone;
            $item['provider_code'] = "abc";//$Purchase['provider']->code;
            $item['provider_adr'] = "abc";//$Purchase['provider']->adresse;
            $item['GrandTotal'] = number_format($Purchase->GrandTotal, 2, '.', '');
            $item['paid_amount'] = 0;//number_format($Purchase->paid_amount, 2, '.', '');
            $item['due'] = 0;//number_format($item['GrandTotal'] - $item['paid_amount'], 2, '.', '');
            $item['payment_status'] = 'abc';//$Purchase->payment_statut;
            // $item['products'] = $Purchase->details['products'];//$Purchase->payment_statut;
            $products_name = '';
            foreach ($Purchase->details as $detail) {
               
                    // $products_name .=  $detail->product->name.'('. $detail->quantity . ') ,' ;

                    $products_name = collect($Purchase->details)->map(function ($detail) {
                        return $detail->product->name . ' (' . $detail->quantity . ')';
                    })->implode(', ');
            }
            // foreach ($Purchase->details as $detail) {
            //     $item_2['detail'] = $detail->product;
            // }
            $item['products'] =  $products_name;
            // $item['detail2'] = $Purchase->details;

            // if (PurchaseReturn::where('purchase_id', $Purchase['id'])->where('deleted_at', '=', null)->exists()) {
            //     $PurchaseReturn = PurchaseReturn::where('purchase_id', $Purchase['id'])->where('deleted_at', '=', null)->first();
            //     $item['purchasereturn_id'] = $PurchaseReturn->id;
            //     $item['purchase_has_return'] = 'yes';
            // }else{
            //     $item['purchase_has_return'] = 'no';
            // }
            $item['purchase_has_return'] = 'no';


            
            $data[] = $item;
        }

        $suppliers = provider::where('deleted_at', '=', null)->get(['id', 'name']);

         //get warehouses assigned to user
         $user_auth = auth()->user();
         if($user_auth->is_all_warehouses){
             $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
         }else{
             $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
             $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
         } 
         $categories = Category::where('deleted_at', '=', null)->get(['id', 'name']);
        return response()->json([
            'totalRows' => $totalRows,
            'purchases' => $data,
            'suppliers' => $suppliers,
            'warehouses' => $warehouses,
            'categories' => $categories,
        ]);
    }

    //------ Store new Purchase -------------\\

    public function store(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'create', Purchase::class);

        request()->validate([
            // 'supplier_id' => 'required',
            'warehouse_id' => 'required',
        ]);

        \DB::transaction(function () use ($request) {
            $order = new Purchase;
            
            $order->date = $request->date;
            $order->date = $request->date;
            $order->Ref = $this->getNumberOrder();
            $order->name =  $request->name;
            $order->provider_id = 1;
            $order->GrandTotal = $request->GrandTotal;
            $order->warehouse_id = $request->warehouse_id2;
            
            $order->warehouse_id2 = $request->warehouse_id;

            $order->tax_rate = $request->tax_rate;
            $order->TaxNet = $request->TaxNet;
            $order->discount = $request->discount;
            $order->shipping = $request->shipping;
            $order->statut = $request->statut;
            $order->payment_statut = 'unpaid';
            $order->notes = $request->notes;
            $order->user_id = Auth::user()->id;
            $order->type = 'production';


            $order->save();
            $orderDetails = [];
            $data = $request['details'];
            foreach ($data as $key => $value) {
                $unit = Unit::where('id', $value['purchase_unit_id'])->first();
                $orderDetails[] = [
                    'purchase_id' => $order->id,
                    'quantity' => $value['quantity'],
                    'cost' => $value['Net_cost'],//$value['Unit_cost'],
                    'purchase_unit_id' =>  $value['purchase_unit_id'],
                    'TaxNet' => $value['tax_percent'],
                    'tax_method' => $value['tax_method'],
                    'discount' => $value['discount'],
                    'discount_method' => $value['discount_Method'],
                    'product_id' => $value['product_id'],
                    'product_variant_id' => $value['product_variant_id'],
                    'total' => $value['subtotal'] ?? 0,
                    'imei_number' => $value['imei_number'],
                    'created_at' => Carbon::now(),
                ];


                //update product cost
                

                // $product = new Product;
                // $product = Product::where('deleted_at', '=', null)
                // ->where('id', $value['product_id'])
                // ->first();

                // if ($product) {

                //     $average_product_cost =  $value['Net_cost'];
                //     $product->cost = $average_product_cost;
                //     $product->save();

                // }
                

                if ($order->statut == "active") {
                    if ($value['product_variant_id'] !== null) {
                        $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $order->warehouse_id)
                            ->where('product_id', $value['product_id'])
                            ->where('product_variant_id', $value['product_variant_id'])
                            ->first();

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
                        $stock->unit_price = $value['Net_cost'];//$value['Unit_cost'];
                        $stock->type = 'in'; // Stock In
                        $stock->stockIn = $value['quantity']; // Quantity added to stock
                        $stock->stockOut = 0; // No stock out in this case
                        $stock->total = $value['subtotal']; // No stock out in this case
                        $stock->stock_type = 'PD'; // stock type case
                        $stock->save();

                    } else {
                        $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $order->warehouse_id)
                            ->where('product_id', $value['product_id'])
                            ->first();

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
                        $stock->unit_price = $value['Net_cost'];//$value['Unit_cost'];
                        $stock->type = 'in'; // Stock In
                        $stock->stockIn = $value['quantity']; // Quantity added to stock
                        $stock->stockOut = 0; // No stock out in this case
                        $stock->total = $value['subtotal']; // No stock out in this case
                        $stock->stock_type = 'PD'; // stock type case
                        $stock->save();
                        
                    }
                }
            }
            
           
            PurchaseDetail::insert($orderDetails);

            // for raw
            $data = $request['details2'];
            foreach ($data as $key => $value) {

                
                
                $unit = Unit::where('id', $value['purchase_unit_id'])->first();
                // $orderDetails[] = [
                //     'purchase_id' => $order->id,
                //     'quantity' => $value['quantity'],
                //     'cost' => $value['Unit_cost'],
                //     'purchase_unit_id' =>  $value['purchase_unit_id'],
                //     'TaxNet' => $value['tax_percent'],
                //     'tax_method' => $value['tax_method'],
                //     'discount' => $value['discount'],
                //     'discount_method' => $value['discount_Method'],
                //     'product_id' => $value['product_id'],
                //     'product_variant_id' => $value['product_variant_id'],
                //     'total' => $value['subtotal'],
                //     'imei_number' => $value['imei_number'],
                // ];

                // if ($order->statut == "received") {

                if ($value['recipe_id'] == 0){
                    $value['product_variant_id'] = null;
                    if ($value['product_variant_id'] !== null) {
                        $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $order->warehouse_id2)
                            ->where('product_id', $value['product_id'])
                            // ->where('product_variant_id', $value['product_variant_id'])
                            ->first();

                        if ($unit && $product_warehouse) {
                            if ($unit->operator == '/') {
                                $product_warehouse->qte -= $value['quantity'] / $unit->operator_value;
                            } else {
                                $product_warehouse->qte -= $value['quantity'] * $unit->operator_value;
                            }
                            $product_warehouse->save();
                        }

                        $stock = new StockMaintenance;
                        $stock->warehouse_id = $order->warehouse_id2;
                        $stock->product_id = $value['product_id'];
                        $stock->purchased_id = $order->id;
                        $stock->unit_id = $value['purchase_unit_id'];
                        $stock->date = $request->date; 
                        $stock->unit_price = $value['Unit_cost'];
                        $stock->type = 'out'; // Stock In
                        $stock->stockIn = 0; // Quantity added to stock
                        $stock->stockOut = $value['quantity']; // No stock out in this case
                        $stock->total = $value['subtotal']; // No stock out in this case
                        $stock->stock_type = 'PD'; // stock type case..
                        $stock->department_category_id = $value['category_id'];
                        $stock->save();

                    } else {
                        $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                            ->where('warehouse_id', $order->warehouse_id2)
                            ->where('product_id', $value['product_id'])
                            ->first();

                        if ($unit && $product_warehouse) {
                            if ($unit->operator == '/') {
                                $product_warehouse->qte -= $value['quantity'] / $unit->operator_value;
                            } else {
                                $product_warehouse->qte -= $value['quantity'] * $unit->operator_value;
                            }
                            $product_warehouse->save();
                        }


                        $stock = new StockMaintenance;
                        $stock->warehouse_id = $order->warehouse_id2;
                        $stock->product_id = $value['product_id'];
                        $stock->purchased_id = $order->id;
                        $stock->unit_id = $value['purchase_unit_id'];
                        $stock->unit_price = $value['Unit_cost'];
                        $stock->date = $request->date; 
                        $stock->type = 'out'; // Stock In
                        $stock->stockIn = 0; // Quantity added to stock
                        $stock->stockOut = $value['quantity']; // No stock out in this case
                        $stock->total = $value['subtotal']; // No stock out in this case
                        $stock->stock_type = 'PD'; // stock type case
                        $stock->department_category_id = $value['category_id'];
                        $stock->save();
                    }
                }
                // }
            }

            // $account_id_dr = 11041;
            // $account_id_cr = 11043; // Acounts Payable
            $account_id_dr = AccountCodes::PRODUCTION_WIP;
            $account_id_cr = AccountCodes::RAW_MATERIAL;


            $this->ledgerService->createLedgerEntry(
                $order->id,
                'PD', // Assuming you have this method
                $account_id_dr,
                $request->GrandTotal,
                0,
                'Production Transaction',
                $order->id,
                $request->date
            );


            $this->ledgerService->createLedgerEntry(
                $order->id,
                'PD',
                $account_id_cr,
                0,
                $request->GrandTotal,
                'Production Transaction',
                $order->id,
                $request->date
            );



            // $account_id_dr = 11043;
            // $account_id_cr = 11041; // Acounts Payable
            $account_id_dr = AccountCodes::RAW_MATERIAL;
            $account_id_cr = AccountCodes::PRODUCTION_WIP;


            $this->ledgerService->createLedgerEntry(
                $order->id,
                'PD', // Assuming you have this method
                $account_id_dr,
                $request->GrandTotal,
                0,
                'Production Transaction',
                $order->id,
                $request->date
            );


            $this->ledgerService->createLedgerEntry(
                $order->id,
                'PD',
                $account_id_cr,
                0,
                $request->GrandTotal,
                'Production Transaction',
                $order->id,
                $request->date
            );
            // PurchaseDetail::insert($orderDetails);
        }, 10);

        return response()->json(['success' => true, 'message' => 'Purchase Created !!']);
    }

    //--------- Update Purchase  -------------\\

    
    public function update(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', Purchase::class);
        $request['supplier_id'] = 1;
        request()->validate([
            'warehouse_id' => 'required',
            'supplier_id' => 'required',
        ]);

        \DB::transaction(function () use ($request, $id) {
            $role = Auth::user()->roles()->first();
            $view_records = Role::findOrFail($role->id)->inRole('record_view');
            $current_Purchase = Purchase::findOrFail($id);

            if (PurchaseReturn::where('purchase_id', $id)->where('deleted_at', '=', null)->exists()) {
                return response()->json(['success' => false , 'Return exist for the Transaction' => false], 403);
            }else{

                // Check If User Has Permission view All Records
                if (!$view_records) {
                    // Check If User->id === Purchase->id
                    $this->authorizeForUser($request->user('api'), 'check_record', $current_Purchase);
                }

                $old_purchase_details = PurchaseDetail::where('purchase_id', $id)->get();
                $new_purchase_details = $request['details'];
                $length = sizeof($new_purchase_details);

                // Get Ids for new Details
                $new_products_id = [];
                foreach ($new_purchase_details as $new_detail) {
                    $new_products_id[] = $new_detail['id'];
                }

                // Init Data with old Parametre
                $old_products_id = [];
                foreach ($old_purchase_details as $key => $value) {
                    $old_products_id[] = $value->id;

                    //check if detail has purchase_unit_id Or Null
                    if($value['purchase_unit_id'] !== null){
                        $unit = Unit::where('id', $value['purchase_unit_id'])->first();
                    }else{
                        $product_unit_purchase_id = Product::with('unitPurchase')
                        ->where('id', $value['product_id'])
                        ->first();
                        $unit = Unit::where('id', $product_unit_purchase_id['unitPurchase']->id)->first();
                    }

                    if($value['purchase_unit_id'] !== null){
                        if ($current_Purchase->statut == "active") {

                            if ($value['product_variant_id'] !== null) {
                                $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                    ->where('warehouse_id', $current_Purchase->warehouse_id2)
                                    ->where('product_id', $value['product_id'])
                                    ->where('product_variant_id', $value['product_variant_id'])
                                    ->first();

                                if ($unit && $product_warehouse) {
                                    if ($unit->operator == '/') {
                                        $product_warehouse->qte -= $value['quantity'] / $unit->operator_value;
                                    } else {
                                        $product_warehouse->qte -= $value['quantity'] * $unit->operator_value;
                                    }

                                    $product_warehouse->save();
                                }

                                StockMaintenance::where('purchased_id', $id)
                                ->where('product_id', $value['product_id'])
                                // ->where('warehouse_id', $current_Purchase->warehouse_id2)
                                ->where('type', 'in')
                                ->delete(); // remove previous stock entries for the product variant

                            } else {
                                $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                    ->where('warehouse_id', $current_Purchase->warehouse_id2)
                                    ->where('product_id', $value['product_id'])
                                    ->first();

                                if ($unit && $product_warehouse) {
                                    if ($unit->operator == '/') {
                                        $product_warehouse->qte -= $value['quantity'] / $unit->operator_value;
                                    } else {
                                        $product_warehouse->qte -= $value['quantity'] * $unit->operator_value;
                                    }

                                    $product_warehouse->save();
                                }

                                StockMaintenance::where('purchased_id', $id)
                                ->where('product_id', $value['product_id'])
                                // ->where('warehouse_id', $current_Purchase->warehouse_id2)
                                ->where('type', 'in')
                                ->delete(); // remove previous stock entries for the product variant
                            }
                        }

                       






                        // Delete Detail
                        if (!in_array($old_products_id[$key], $new_products_id)) {
                            $PurchaseDetail = PurchaseDetail::findOrFail($value->id);
                            $PurchaseDetail->delete();
                        }
                    }

                }

                $old_stock_details = StockMaintenance::where('purchased_id', $id)
                ->where('type', 'out')
                ->get();

                
                foreach ($old_stock_details as $key => $value) {

                    $outstock_id = $value->id;

                    $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                    ->where('warehouse_id', $current_Purchase->warehouse_id)
                                    ->where('product_id', $value['product_id'])
                                    // ->where('product_variant_id', $value['product_variant_id'])
                                    ->first();

                    if ($unit && $product_warehouse) {
                        if ($unit->operator == '/') {
                            $product_warehouse->qte += $value['StockOut'] / $unit->operator_value;
                        } else {
                            $product_warehouse->qte += $value['StockOut'] * $unit->operator_value;
                        }

                        $product_warehouse->save();
                    }

                    StockMaintenance::where('id', $outstock_id)
                    // ->where('product_id', $value['product_id'])
                    // ->where('warehouse_id', $current_Purchase->warehouse_id)
                    // ->where('type', 'out')
                    ->delete(); // remove previous stock entries for the product variant
                    
                }



                // Update Data with New request
                foreach ($new_purchase_details as $key => $prod_detail) {

                    if($prod_detail['no_unit'] !== 0){
                        $unit_prod = Unit::where('id', $prod_detail['purchase_unit_id'])->first();

                        if ($request['statut'] == "active") {

                            if ($prod_detail['product_variant_id'] !== null) {
                                $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                    ->where('warehouse_id', $request->warehouse_id2)
                                    ->where('product_id', $prod_detail['product_id'])
                                    ->where('product_variant_id', $prod_detail['product_variant_id'])
                                    ->first();

                                if ($unit_prod && $product_warehouse) {
                                    if ($unit_prod->operator == '/') {
                                        $product_warehouse->qte += $prod_detail['quantity'] / $unit_prod->operator_value;
                                    } else {
                                        $product_warehouse->qte += $prod_detail['quantity'] * $unit_prod->operator_value;
                                    }

                                    $product_warehouse->save();
                                }

                            } else {
                                $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                    ->where('warehouse_id', $request->warehouse_id2)
                                    ->where('product_id', $prod_detail['product_id'])
                                    ->first();

                                if ($unit_prod && $product_warehouse) {
                                    if ($unit_prod->operator == '/') {
                                        $product_warehouse->qte += $prod_detail['quantity'] / $unit_prod->operator_value;
                                    } else {
                                        $product_warehouse->qte += $prod_detail['quantity'] * $unit_prod->operator_value;
                                    }

                                    $product_warehouse->save();
                                }
                            }

                            $stock = new StockMaintenance;
                            $stock->warehouse_id = $request->warehouse_id2;
                            $stock->product_id = $prod_detail['product_id'];
                            $stock->purchased_id = $id;
                            $stock->date = $request['date']; 
                            $stock->unit_id = $prod_detail['purchase_unit_id'];
                            $stock->unit_price = $prod_detail['Unit_cost'];
                            $stock->type = 'in';
                            $stock->stockIn = $prod_detail['quantity'];
                            $stock->stockOut = 0; // No stock out on update
                            $stock->total = $prod_detail['subtotal']; // No stock out in this case
                            $stock->stock_type = 'PD'; // stock type case
                            $stock->save();

                        }

                        $orderDetails['purchase_id'] = $id;
                        $orderDetails['cost'] = $prod_detail['Unit_cost'];
                        $orderDetails['purchase_unit_id'] = $prod_detail['purchase_unit_id'];
                        $orderDetails['TaxNet'] = $prod_detail['tax_percent'];
                        $orderDetails['tax_method'] = $prod_detail['tax_method'];
                        $orderDetails['discount'] = $prod_detail['discount'];
                        $orderDetails['discount_method'] = $prod_detail['discount_Method'];
                        $orderDetails['quantity'] = $prod_detail['quantity'];
                        $orderDetails['product_id'] = $prod_detail['product_id'];
                        $orderDetails['product_variant_id'] = $prod_detail['product_variant_id'];
                        $orderDetails['total'] = $prod_detail['subtotal'];
                        $orderDetails['imei_number'] = $prod_detail['imei_number'];

                        if (!in_array($prod_detail['id'], $old_products_id)) {
                            PurchaseDetail::Create($orderDetails);
                        } else {
                            PurchaseDetail::where('id', $prod_detail['id'])->update($orderDetails);
                        }
                    }
                }

                // update new entry in stock and p_warehouse
                // for raw
                $data = $request['details2'];
                foreach ($data as $key => $value) {
                    $unit = Unit::where('id', $value['purchase_unit_id'])->first();
                    // if ($value['recipe_id'] == 0){




                    
                    // $orderDetails[] = [
                    //     'purchase_id' => $order->id,
                    //     'quantity' => $value['quantity'],
                    //     'cost' => $value['Unit_cost'],
                    //     'purchase_unit_id' =>  $value['purchase_unit_id'],
                    //     'TaxNet' => $value['tax_percent'],
                    //     'tax_method' => $value['tax_method'],
                    //     'discount' => $value['discount'],
                    //     'discount_method' => $value['discount_Method'],
                    //     'product_id' => $value['product_id'],
                    //     'product_variant_id' => $value['product_variant_id'],
                    //     'total' => $value['subtotal'],
                    //     'imei_number' => $value['imei_number'],
                    // ];

                    // if ($order->statut == "received") {
                        $value['product_variant_id'] = null;
                        if ($value['product_variant_id'] !== null) {
                            $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                ->where('warehouse_id', $request->warehouse_id)
                                ->where('product_id', $value['product_id'])
                                // ->where('product_variant_id', $value['product_variant_id'])
                                ->first();

                            if ($unit && $product_warehouse) {
                                if ($unit->operator == '/') {
                                    $product_warehouse->qte -= $value['quantity'] / $unit->operator_value;
                                } else {
                                    $product_warehouse->qte -= $value['quantity'] * $unit->operator_value;
                                }
                                $product_warehouse->save();
                            }

                            $stock = new StockMaintenance;
                            $stock->warehouse_id = $request->warehouse_id;
                            $stock->product_id = $value['product_id'];
                            $stock->purchased_id = $id;
                            $stock->unit_id = $value['purchase_unit_id'];
                            $stock->date = $request['date']; 
                            $stock->unit_price = $value['Unit_cost'];
                            $stock->type = 'out'; // Stock In
                            $stock->stockIn = 0; // Quantity added to stock
                            $stock->stockOut = $value['quantity']; // No stock out in this case
                            $stock->total = $value['subtotal']; // No stock out in this case
                            $stock->stock_type = 'PD'; // stock type case
                            
                            $stock->department_category_id = $value['category_id'];
                            $stock->save();

                        } else {
                            $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                ->where('warehouse_id', $request->warehouse_id)
                                ->where('product_id', $value['product_id'])
                                ->first();

                            if ($unit && $product_warehouse) {
                                if ($unit->operator == '/') {
                                    $product_warehouse->qte -= $value['quantity'] / $unit->operator_value;
                                } else {
                                    $product_warehouse->qte -= $value['quantity'] * $unit->operator_value;
                                }
                                $product_warehouse->save();
                            }


                            $stock = new StockMaintenance;
                            $stock->warehouse_id = $request->warehouse_id;
                            $stock->product_id = $value['product_id'];
                            $stock->purchased_id = $id;
                            $stock->unit_id = $value['purchase_unit_id'];
                            $stock->date = $request['date']; 
                            $stock->unit_price = $value['Unit_cost'];
                            $stock->type = 'out'; // Stock In
                            $stock->stockIn = 0; // Quantity added to stock
                            $stock->stockOut = $value['quantity']; // No stock out in this case
                            $stock->total = $value['subtotal']; // No stock out in this case
                            $stock->stock_type = 'PD'; // stock type case
                            
                            $stock->department_category_id = $value['category_id'];
                            $stock->save();
                        }
                    // }
                }
                
                

                $due = $request['GrandTotal'] - $current_Purchase->paid_amount;
                if ($due === 0.0 || $due < 0.0) {
                    $payment_statut = 'paid';
                } else if ($due != $request['GrandTotal']) {
                    $payment_statut = 'partial';
                } else if ($due == $request['GrandTotal']) {
                    $payment_statut = 'unpaid';
                }

                $current_Purchase->update([
                    'date' => $request['date'],
                    'name' => $request['name'],
                    'provider_id' => $request['supplier_id'],
                    'warehouse_id' => $request['warehouse_id2'],
                    'warehouse_id2' => $request['warehouse_id'],
                    
                    'notes' => $request['notes'],
                    'tax_rate' => $request['tax_rate'],
                    'TaxNet' => $request['TaxNet'],
                    'discount1' => $request['discount'],
                    'shipping' => $request['shipping'],
                    'statut' => $request['statut'],
                    'GrandTotal' => $request['GrandTotal'],
                    'payment_statut' => $payment_statut,
                ]);
            }
            $AccountsLedger = new AccountsLedger;
            $AccountsLedger = AccountsLedger::where('voucher_number', $id)
            ->where('voucher_type', 'PD')
            ->delete();


            // $account_id_dr = 11041;
            // $account_id_cr = 11043; // Acounts Payable
            $account_id_dr = AccountCodes::PRODUCTION_WIP;
            $account_id_cr = AccountCodes::RAW_MATERIAL;


            $this->ledgerService->createLedgerEntry(
                $id,
                'PD', // Assuming you have this method
                $account_id_dr,
                $request['GrandTotal'],
                0,
                'Production Transaction',
                $id,
                $request['date']
            );


            $this->ledgerService->createLedgerEntry(
                $id,
                'PD',
                $account_id_cr,
                0,
                $request->GrandTotal,
                'Production Transaction',
                $id,
                $request['date']
            );



            // $account_id_dr = 11043;
            // $account_id_cr = 11041; // Acounts Payable
            $account_id_dr = AccountCodes::RAW_MATERIAL;
            $account_id_cr = AccountCodes::PRODUCTION_WIP;


            $this->ledgerService->createLedgerEntry(
                $id,
                'PD', // Assuming you have this method
                $account_id_dr,
                $request->GrandTotal,
                0,
                'Production Transaction',
                $id,
                $request['date']
            );


            $this->ledgerService->createLedgerEntry(
                $id,
                'PD',
                $account_id_cr,
                0,
                $request->GrandTotal,
                'Production Transaction',
                $id,
                $request['date']
            );

        }, 10);

        return response()->json(['success' => true, 'message' => 'Purchase Updated !!']);

    }
    //------ Delete Purchase -------------\\

    public function destroy(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'delete', Purchase::class);

        \DB::transaction(function () use ($id, $request) {
            $role = Auth::user()->roles()->first();
            $view_records = Role::findOrFail($role->id)->inRole('record_view');
            $current_Purchase = Purchase::findOrFail($id);
            $old_purchase_details = PurchaseDetail::where('purchase_id', $id)->get();

            if (PurchaseReturn::where('purchase_id', $id)->where('deleted_at', '=', null)->exists()) {
                return response()->json(['success' => false , 'Return exist for the Transaction' => false], 403);
            }else{

                // Check If User Has Permission view All Records
                if (!$view_records) {
                    // Check If User->id === current_Purchase->id
                    $this->authorizeForUser($request->user('api'), 'check_record', $current_Purchase);
                }

                foreach ($old_purchase_details as $key => $value) {

                    //check if detail has purchase_unit_id Or Null
                    if($value['purchase_unit_id'] !== null){
                        $unit = Unit::where('id', $value['purchase_unit_id'])->first();
                    }else{
                        $product_unit_purchase_id = Product::with('unitPurchase')
                        ->where('id', $value['product_id'])
                        ->first();
                        $unit = Unit::where('id', $product_unit_purchase_id['unitPurchase']->id)->first();
                    }

                    if ($current_Purchase->statut == "received") {

                        if ($value['product_variant_id'] !== null) {
                            $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                ->where('warehouse_id', $current_Purchase->warehouse_id)
                                ->where('product_id', $value['product_id'])
                                ->where('product_variant_id', $value['product_variant_id'])
                                ->first();

                            if ($unit && $product_warehouse) {
                                if ($unit->operator == '/') {
                                    $product_warehouse->qte -= $value['quantity'] / $unit->operator_value;
                                } else {
                                    $product_warehouse->qte -= $value['quantity'] * $unit->operator_value;
                                }

                                $product_warehouse->save();
                            }

                        } else {
                            $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                ->where('warehouse_id', $current_Purchase->warehouse_id)
                                ->where('product_id', $value['product_id'])
                                ->first();

                            if ($unit && $product_warehouse) {
                                if ($unit->operator == '/') {
                                    $product_warehouse->qte -= $value['quantity'] / $unit->operator_value;
                                } else {
                                    $product_warehouse->qte -= $value['quantity'] * $unit->operator_value;
                                }

                                $product_warehouse->save();
                            }
                        }
                    }
                }


                $Raw_details = StockMaintenance::with('product')
                ->where('deleted_at', '=', null)
                ->where('purchased_id', '=', $id)
                ->where('type', '=', 'out')
                ->get();

                $data = $Raw_details;
                foreach ($data as $key => $value) {
                    $unit = Unit::where('id', $value['purchase_unit_id'])->first();

                        $value['product_variant_id'] = null;
                        if ($value['product_variant_id'] !== null) {
                            $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                ->where('warehouse_id', $current_Purchase->warehouse_id)
                                ->where('product_id', $value['product_id'])
                                // ->where('product_variant_id', $value['product_variant_id'])
                                ->first();

                            if ($unit && $product_warehouse) {
                                if ($unit->operator == '/') {
                                    $product_warehouse->qte += $value['quantity'] / $unit->operator_value;
                                } else {
                                    $product_warehouse->qte += $value['quantity'] * $unit->operator_value;
                                }
                                $product_warehouse->save();
                            }



                        } else {
                            $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                ->where('warehouse_id', $current_Purchase->warehouse_id)
                                ->where('product_id', $value['product_id'])
                                ->first();

                            if ($unit && $product_warehouse) {
                                if ($unit->operator == '/') {
                                    $product_warehouse->qte += $value['quantity'] / $unit->operator_value;
                                } else {
                                    $product_warehouse->qte += $value['quantity'] * $unit->operator_value;
                                }
                                $product_warehouse->save();
                            }



                        }
                    // }
                }




                StockMaintenance::where('purchased_id', $id)
                // ->where('warehouse_id', $current_Purchase->warehouse_id)
                ->where('stock_type', 'PD')
                ->delete(); // remove previous stock entries for the product variant


                $AccountsLedger = new AccountsLedger;
                $AccountsLedger = AccountsLedger::where('voucher_number', $id)
                ->where('voucher_type', 'PD')
                ->delete();


                $current_Purchase->details()->delete();
                $current_Purchase->update([
                    'deleted_at' => Carbon::now(),
                ]);

                PaymentPurchase::where('purchase_id', $id)->update([
                    'deleted_at' => Carbon::now(),
                ]);
            }

        }, 10);

        return response()->json(['success' => true, 'message' => 'Purchase Deleted !!']);
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

                if (PurchaseReturn::where('purchase_id', $purchase_id)->where('deleted_at', '=', null)->exists()) {
                    return response()->json(['success' => false , 'Return exist for the Transaction' => false], 403);
                }else{

                    $current_Purchase = Purchase::findOrFail($purchase_id);
                    $old_purchase_details = PurchaseDetail::where('purchase_id', $purchase_id)->get();
                    // Check If User Has Permission view All Records
                    if (!$view_records) {
                        // Check If User->id === current_Purchase->id
                        $this->authorizeForUser($request->user('api'), 'check_record', $current_Purchase);
                    }
                    foreach ($old_purchase_details as $key => $value) {

                        //check if detail has purchase_unit_id Or Null
                        if($value['purchase_unit_id'] !== null){
                            $unit = Unit::where('id', $value['purchase_unit_id'])->first();
                        }else{
                            $product_unit_purchase_id = Product::with('unitPurchase')
                            ->where('id', $value['product_id'])
                            ->first();
                            $unit = Unit::where('id', $product_unit_purchase_id['unitPurchase']->id)->first();
                        }

                        if ($current_Purchase->statut == "received") {

                            if ($value['product_variant_id'] !== null) {
                                $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                    ->where('warehouse_id', $current_Purchase->warehouse_id)
                                    ->where('product_id', $value['product_id'])
                                    ->where('product_variant_id', $value['product_variant_id'])
                                    ->first();

                                if ($unit && $product_warehouse) {
                                    if ($unit->operator == '/') {
                                        $product_warehouse->qte -= $value['quantity'] / $unit->operator_value;
                                    } else {
                                        $product_warehouse->qte -= $value['quantity'] * $unit->operator_value;
                                    }

                                    $product_warehouse->save();
                                }

                            } else {
                                $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                    ->where('warehouse_id', $current_Purchase->warehouse_id)
                                    ->where('product_id', $value['product_id'])
                                    ->first();

                                if ($unit && $product_warehouse) {
                                    if ($unit->operator == '/') {
                                        $product_warehouse->qte -= $value['quantity'] / $unit->operator_value;
                                    } else {
                                        $product_warehouse->qte -= $value['quantity'] * $unit->operator_value;
                                    }

                                    $product_warehouse->save();
                                }
                            }
                        }
                    }



                $Raw_details = StockMaintenance::with('product')
                ->where('deleted_at', '=', null)
                ->where('purchased_id', '=', $purchase_id)
                ->where('type', '=', 'out')
                ->get();

                $data = $Raw_details;
                foreach ($data as $key =>$value1) {
                    $unit = Unit::where('id',$value1['purchase_unit_id'])->first();

                       $value1['product_variant_id'] = null;
                        if ($value['product_variant_id'] !== null) {
                            $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                ->where('warehouse_id', $current_Purchase->warehouse_id)
                                ->where('product_id',$value1['product_id'])
                                // ->where('product_variant_id',$value1['product_variant_id'])
                                ->first();

                            if ($unit && $product_warehouse) {
                                if ($unit->operator == '/') {
                                    $product_warehouse->qte +=$value1['quantity'] / $unit->operator_value;
                                } else {
                                    $product_warehouse->qte +=$value1['quantity'] * $unit->operator_value;
                                }
                                $product_warehouse->save();
                            }



                        } else {
                            $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                ->where('warehouse_id', $current_Purchase->warehouse_id)
                                ->where('product_id',$value1['product_id'])
                                ->first();

                            if ($unit && $product_warehouse) {
                                if ($unit->operator == '/') {
                                    $product_warehouse->qte +=$value1['quantity'] / $unit->operator_value;
                                } else {
                                    $product_warehouse->qte +=$value1['quantity'] * $unit->operator_value;
                                }
                                $product_warehouse->save();
                            }



                        }
                    // }
                }


                StockMaintenance::where('purchased_id', $purchase_id)
                // ->where('warehouse_id', $current_Purchase->warehouse_id)
                ->where('stock_type', 'PD')
                ->delete(); // remove previous stock entries for the product variant

                $AccountsLedger = new AccountsLedger;
                $AccountsLedger = AccountsLedger::where('voucher_number', $purchase_id)
                ->where('voucher_type', 'PD')
                ->delete();
                    $current_Purchase->details()->delete();
                    $current_Purchase->update([
                        'deleted_at' => Carbon::now(),
                    ]);

                    PaymentPurchase::where('purchase_id', $purchase_id)->update([
                        'deleted_at' => Carbon::now(),
                    ]);
                }
            }

        }, 10);
        return response()->json(['success' => true, 'message' => 'Purchase Deleted !!']);

    }


    //---------------- Get Details Purchase -----------------\\

    public function show(Request $request, $id)
    {

        $this->authorizeForUser($request->user('api'), 'view', Purchase::class);
        $role = Auth::user()->roles()->first();
        $view_records = Role::findOrFail($role->id)->inRole('record_view');
        $purchase = Purchase::with('details.product.unitPurchase')
            ->where('deleted_at', '=', null)
            ->findOrFail($id);

        $Stock_data = StockMaintenance::with('product.unit')
        ->where('purchased_id', $id)
        ->where('stock_type', 'PD')
        ->where('type', 'out')
        ->where('deleted_at', '=', null)
        ->first();


    
        $details = array();

        // Check If User Has Permission view All Records
        if (!$view_records) {
            // Check If User->id === purchase->id
            $this->authorizeForUser($request->user('api'), 'check_record', $purchase);
        }

        $purchase_data['Ref'] = $purchase->Ref;
        $purchase_data['date'] = $purchase->date;
        $purchase_data['statut'] = $purchase->statut;
        $purchase_data['note'] = $purchase->notes;
        $purchase_data['discount'] = $purchase->discount;
        $purchase_data['shipping'] = $purchase->shipping;
        $purchase_data['tax_rate'] = $purchase->tax_rate;
        $purchase_data['TaxNet'] = $purchase->TaxNet;
        $purchase_data['supplier_name'] = "-";//$purchase['provider']->name;
        $purchase_data['supplier_email'] = "-";//$purchase['provider']->email;
        $purchase_data['supplier_phone'] = "-";//$purchase['provider']->phone;
        $purchase_data['supplier_adr'] = "-";//$purchase['provider']->adresse;
        $purchase_data['supplier_tax'] = "-";//$purchase['provider']->tax_number;
        $purchase_data['warehouse'] = "Default Warehouse";//$purchase['warehouse']->name;
        $purchase_data['GrandTotal'] = number_format($purchase->GrandTotal, 2, '.', '');
        $purchase_data['paid_amount'] = 0.00;//number_format($purchase->paid_amount, 2, '.', '');
        $purchase_data['due'] = number_format($purchase_data['GrandTotal'] - $purchase_data['paid_amount'], 2, '.', '');
        $purchase_data['payment_status'] = "";//$purchase->payment_statut;

        if (PurchaseReturn::where('purchase_id', $id)->where('deleted_at', '=', null)->exists()) {
            $PurchaseReturn = PurchaseReturn::where('purchase_id', $id)->where('deleted_at', '=', null)->first();
            $purchase_data['purchasereturn_id'] = $PurchaseReturn->id;
            $purchase_data['purchase_has_return'] = 'yes';
        }else{
            $purchase_data['purchase_has_return'] = 'no';
        }

        foreach ($purchase['details'] as $detail) {

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
            
            $data['quantity'] = $detail->quantity;
            $data['total'] = $detail->total;
            $data['cost'] = $detail->cost;
            $data['unit_purchase'] = $unit->ShortName;

            if ($detail->discount_method == '2') {
                $data['DiscountNet'] = $detail->discount;
            } else {
                $data['DiscountNet'] = $detail->cost * $detail->discount / 100;
            }

            $tax_cost = $detail->TaxNet * (($detail->cost - $data['DiscountNet']) / 100);
            $data['Unit_cost'] = $detail->cost;
            $data['discount'] = $detail->discount;

            if ($detail->tax_method == '1') {

                $data['Net_cost'] = $detail->cost - $data['DiscountNet'];
                $data['taxe'] = $tax_cost;
            } else {
                $data['Net_cost'] = ($detail->cost - $data['DiscountNet']) / (($detail->TaxNet / 100) + 1);
                $data['taxe'] = $detail->cost - $data['Net_cost'] - $data['DiscountNet'];
            }

            $data['is_imei'] = $detail['product']['is_imei'];
            $data['imei_number'] = $detail->imei_number;

            $details[] = $data;
        }




        $details2 = [];
        $detail_id = 0;
        $Raw_details = StockMaintenance::with('product')
        ->where('deleted_at', '=', null)
        ->where('purchased_id', '=', $id)
        ->where('type', '=', 'out')
        ->get();
        // ->findOrFail($id);
        foreach ($Raw_details as $detail) {

            //-------check if detail has purchase_unit_id Or Null
            if($detail->purchase_unit_id !== null){
                $unit = Unit::where('id', $detail->purchase_unit_id)->first();
                $data2['no_unit'] = 1;
            }else{
                $product_unit_purchase_id = Product::with('unitPurchase')
                ->where('id', $detail->product_id)
                ->first();
                $unit = Unit::where('id', $product_unit_purchase_id['unitPurchase']->id)->first();
                $data2['no_unit'] = 0;
            }

            if ($detail->product_variant_id) {
                $item_product = product_warehouse::where('product_id', $detail->product_id)
                    ->where('deleted_at', '=', null)
                    ->where('product_variant_id', $detail->product_variant_id)
                    // ->where('warehouse_id', $Purchase_data->warehouse_id)
                    ->first();

                $productsVariants = ProductVariant::where('product_id', $detail->product_id)
                    ->where('id', $detail->product_variant_id)->first();

                $item_product ? $data2['del'] = 0 : $data2['del'] = 1;

                $data2['code'] = $productsVariants->code;
                $data2['name'] = '['.$productsVariants->name . ']' . $detail['product']['name'];
                // $data2['product_variant_id'] = $detail->product_variant_id;                

                if ($unit && $unit->operator == '/') {
                    $data2['stock'] = $item_product ? $item_product->qte * $unit->operator_value : 0;
                } else if ($unit && $unit->operator == '*') {
                    $data2['stock'] = $item_product ? $item_product->qte / $unit->operator_value : 0;
                } else {
                    $data2['stock'] = 0;
                }

            } else {
                $item_product = product_warehouse::where('product_id', $detail->product_id)
                    ->where('deleted_at', '=', null)//->where('product_variant_id', '=', null)
                    // ->where('warehouse_id', $Purchase_data->warehouse_id)
                    ->first();
                    
                $item_product ? $data2['del'] = 0 : $data2['del'] = 1;
                // $data2['array'] =  json_encode($item_product);
                // $data2['product_variant_id'] = null;

                $data2['code'] = $detail['product']['code'];
                $data2['name'] = $detail['product']['name'];
            

                if ($unit && $unit->operator == '/') {
                    $data2['stock'] = $item_product ? $item_product->qte * $unit->operator_value : 0;
                } else if ($unit && $unit->operator == '*') {
                    $data2['stock'] = $item_product ? $item_product->qte / $unit->operator_value : 0;
                } else {
                    $data2['stock'] = 0;
                }

            }
            // $data2['stock'] = 10;
            $data2['id'] = $detail->id;
            $data2['detail_id'] = $detail_id += 1;
            $data2['quantity'] = $detail->StockOut;
            $data2['product_id'] = $detail->product_id;
            $data2['unit_purchase'] = $unit->ShortName;
            $data2['purchase_unit_id'] = $unit->id;
            
            $data2['is_imei'] = 0;
            $data2['imei_number'] =12 ;
            // $data2['DB'] = $Raw_details ;
            $data2['DiscountNet'] = 0;
            // if ($detail->discount_method == '2') {
            //     $data2['DiscountNet'] = $detail->discount;
            // } else {
            //     $data2['DiscountNet'] = $detail->cost * $detail->discount / 100;
            // }

            $tax_cost = 0;//$detail->TaxNet * (($detail->cost - $data2['DiscountNet']) / 100);
            $data2['Unit_cost'] = $detail->total;
            // $data2['tax_percent'] = $detail->TaxNet;
            // $data2['tax_method'] = $detail->tax_method;
            // $data2['discount'] = $detail->discount;
            // $data2['discount_Method'] = $detail->discount_method;

            if ($detail->tax_method == '1') {
                $data2['Net_cost'] = $detail->total;//$detail->cost - $data2['DiscountNet'];
                $data2['taxe'] = $tax_cost;
                $data2['subtotal'] =  $detail->total;//($data2['Net_cost'] * $data2['quantity']) + ($tax_cost * $data2['quantity']);
                $data2['Unit_cost'] = $detail->total;
            } else {
                $data2['Net_cost'] = $detail->total / $detail->StockOut;//($detail->cost - $data2['DiscountNet']) / (($detail->TaxNet / 100) + 1);
                $data2['taxe'] =  $tax_cost; //$detail->cost - $data2['Net_cost'] - $data2['DiscountNet'];
                $data2['subtotal'] = $detail->total;//($data2['Net_cost'] * $data2['quantity']) + ($tax_cost * $data2['quantity']);
                $data2['Unit_cost'] = $detail->total / $detail->StockOut;
            }
            $data2['total'] = $detail->total;
            $data2['cost'] = $detail->total;
            $details2[] = $data2;
        }
        $company = Setting::where('deleted_at', '=', null)->first();

        return response()->json([
            'details2' => $details2, 
            'details' => $details,
            'purchase' => $purchase_data,
            'company' => $company,
        ]);

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
            // $code = $nwMsg[0] . '_' . $inMsg;
            $code = "PD" . '_' . $inMsg;
        } else {
            $code = 'PD_1111';
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

        $details2 = [];
        $detail_id = 0;
        $Raw_details = StockMaintenance::with('product')
        ->where('deleted_at', '=', null)
        ->where('purchased_id', '=', $id)
        ->where('stock_type', '=', 'PD')
        ->where('type', '=', 'out')
        ->get();
        // ->findOrFail($id);
        foreach ($Raw_details as $detail) {

            //-------check if detail has purchase_unit_id Or Null
            if($detail->purchase_unit_id !== null){
                $unit = Unit::where('id', $detail->purchase_unit_id)->first();
                $data2['no_unit'] = 1;
            }else{
                $product_unit_purchase_id = Product::with('unitPurchase')
                ->where('id', $detail->product_id)
                ->first();
                $unit = Unit::where('id', $product_unit_purchase_id['unitPurchase']->id)->first();
                $data2['no_unit'] = 0;
            }

            if ($detail->product_variant_id) {
                $item_product = product_warehouse::where('product_id', $detail->product_id)
                    ->where('deleted_at', '=', null)
                    ->where('product_variant_id', $detail->product_variant_id)
                    // ->where('warehouse_id', $Purchase_data->warehouse_id)
                    ->first();

                $productsVariants = ProductVariant::where('product_id', $detail->product_id)
                    ->where('id', $detail->product_variant_id)->first();

                $item_product ? $data2['del'] = 0 : $data2['del'] = 1;

                $data2['code'] = $productsVariants->code;
                $data2['name'] = '['.$productsVariants->name . ']' . $detail['product']['name'];
                // $data2['product_variant_id'] = $detail->product_variant_id;                
                    ;
                if ($unit && $unit->operator == '/') {
                    $data2['stock'] = $item_product ? $item_product->qte * $unit->operator_value : 0;
                } else if ($unit && $unit->operator == '*') {
                    $data2['stock'] = $item_product ? $item_product->qte / $unit->operator_value : 0;
                } else {
                    $data2['stock'] = 0;
                }

            } else {
                $item_product = product_warehouse::where('product_id', $detail->product_id)
                    ->where('deleted_at', '=', null)//->where('product_variant_id', '=', null)
                    // ->where('warehouse_id', $Purchase_data->warehouse_id)
                    ->first();
                    
                $item_product ? $data2['del'] = 0 : $data2['del'] = 1;
                // $data2['array'] =  json_encode($item_product);
                // $data2['product_variant_id'] = null;

                $data2['code'] = $detail['product']['code'];
                $data2['name'] = $detail['product']['name'];
            

                if ($unit && $unit->operator == '/') {
                    $data2['stock'] = $item_product ? $item_product->qte * $unit->operator_value : 0;
                } else if ($unit && $unit->operator == '*') {
                    $data2['stock'] = $item_product ? $item_product->qte / $unit->operator_value : 0;
                } else {
                    $data2['stock'] = 0;
                }

            }


            $remainingStock = DB::table('stock_maintenance')
            ->selectRaw('SUM(stockIn - StockOut) as remainingStock')
            ->where('product_id', $detail->product_id)
            ->where('date', '<=', $Purchase_data->date)
            ->whereNull('deleted_at')
            ->value('remainingStock'); // Fetch only the calculated value



            $data2['stock'] = $remainingStock ?? 0;

            // $data2['stock'] = 10;
            $data2['id'] = $detail->id;
            $data2['detail_id'] = $detail_id += 1;
            $data2['quantity'] = $detail->StockOut;
            $data2['product_id'] = $detail->product_id;
            $data2['unit_purchase'] = $unit->ShortName;
            $data2['purchase_unit_id'] = $unit->id;
            $data2['purchase_quantity_in_baseunit'] = $detail->StockOut;
            $data2['is_imei'] = 0;
            $data2['imei_number'] =12 ;
            // $data2['DB'] = $Raw_details ;
            $data2['DiscountNet'] = 0;
            // if ($detail->discount_method == '2') {
            //     $data2['DiscountNet'] = $detail->discount;
            // } else {
            //     $data2['DiscountNet'] = $detail->cost * $detail->discount / 100;
            // }

            $tax_cost = 0;//$detail->TaxNet * (($detail->cost - $data2['DiscountNet']) / 100);
            $data2['Unit_cost'] = $detail->total;
            // $data2['tax_percent'] = $detail->TaxNet;
            // $data2['tax_method'] = $detail->tax_method;
            // $data2['discount'] = $detail->discount;
            // $data2['discount_Method'] = $detail->discount_method;

            if ($detail->tax_method == '1') {
                $data2['Net_cost'] = $detail->total;//$detail->cost - $data2['DiscountNet'];
                $data2['taxe'] = $tax_cost;
                $data2['subtotal'] =  $detail->total;//($data2['Net_cost'] * $data2['quantity']) + ($tax_cost * $data2['quantity']);
                $data2['Unit_cost'] = $detail->total;
            } else {
                $data2['Net_cost'] = $detail->total / $detail->StockOut;//($detail->cost - $data2['DiscountNet']) / (($detail->TaxNet / 100) + 1);
                $data2['taxe'] =  $tax_cost; //$detail->cost - $data2['Net_cost'] - $data2['DiscountNet'];
                $data2['subtotal'] = $detail->total;//($data2['Net_cost'] * $data2['quantity']) + ($tax_cost * $data2['quantity']);
                $data2['Unit_cost'] = $detail->total / $detail->StockOut;
            }
            $data2['total'] = $detail->total;
            $data2['cost'] = $detail->total;
            $details2[] = $data2;
        }

        $settings = Setting::where('deleted_at', '=', null)->first();
        $symbol = $helpers->Get_Currency_Code();

        $Html = view('pdf.purchase_pdf', [
            'symbol' => $symbol,
            'setting' => $settings,
            'purchase' => $purchase,
            'details' => $details,
            'details2' => $details2,
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

        // $categories = Category::where('deleted_at', '=', null)->get(['id', 'name']);
        $categories = Category::whereNull('deleted_at')
        ->with(['products:id,category_id,code']) // Load related products with only necessary columns
        ->get(['id', 'name']);

        
        return response()->json([
            'warehouses' => $warehouses,
            'suppliers' => $suppliers,
            'categories' => $categories,
        ]);
    }

    //-------------Show Form Edit Purchase-----------\\

    public function edit(Request $request, $id)
    {
        if (PurchaseReturn::where('purchase_id', $id)->where('deleted_at', '=', null)->exists()) {
            return response()->json(['success' => false , 'Return exist for the Transaction' => false], 403);
        }else{

            $this->authorizeForUser($request->user('api'), 'update', Purchase::class);
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

            // if ($Purchase_data->provider_id) {
            //     if (Provider::where('id', $Purchase_data->provider_id)->where('deleted_at', '=', null)->first()) {
            //         $purchase['supplier_id'] = $Purchase_data->provider_id;
            //     } else {
            //         $purchase['supplier_id'] = '';
            //     }
            // } else {
                $purchase['supplier_id'] = 1;
                
            // }

            // if ($Purchase_data->warehouse_id) {
            //     if (Warehouse::where('id', $Purchase_data->warehouse_id)->where('deleted_at', '=', null)->first()) {
            //         $purchase['warehouse_id'] = $Purchase_data->warehouse_id;
            //     } else {
            //         $purchase['warehouse_id'] = '';
            //     }
            // } else {
                $purchase['warehouse_id'] = $Purchase_data->warehouse_id2 ;
                $purchase['warehouse_id2'] = $Purchase_data->warehouse_id;
            // }
            $insertType = 'production';
            
            $purchase['date'] = $Purchase_data->date;
            $purchase['tax_rate'] = $Purchase_data->tax_rate;
            $purchase['TaxNet'] = $Purchase_data->TaxNet;
            $purchase['Ref'] = $Purchase_data->Ref;
            $purchase['name'] = $Purchase_data->name;
           
            $purchase['GrandTotal'] = $Purchase_data->GrandTotal;
            $purchase['discount'] = $Purchase_data->discount;
            $purchase['shipping'] = $Purchase_data->shipping;
            $purchase['statut'] = $Purchase_data->statut;
            $purchase['notes'] = $Purchase_data->notes;
            $purchase['notes'] = $Purchase_data->notes;
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
                        ->where('warehouse_id', $Purchase_data->warehouse_id2)
                        ->first();

                    $productsVariants = ProductVariant::where('product_id', $detail->product_id)
                        ->where('id', $detail->product_variant_id)->first();

                    $item_product ? $data['del'] = 0 : $data['del'] = 1;

                    $data['code'] = $productsVariants->code;
                    $data['name'] = '['.$productsVariants->name . ']' . $detail['product']['name'];
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
                        ->where('deleted_at', '=', null)//->where('product_variant_id', '=', null)
                        // ->where('warehouse_id', $Purchase_data->warehouse_id)
                        ->first();
                        
                    $item_product ? $data['del'] = 0 : $data['del'] = 1;
                    // $data['array'] =  json_encode($item_product);
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

                $remainingStock = DB::table('stock_maintenance')
                ->selectRaw('SUM(stockIn - StockOut) as remainingStock')
                ->where('product_id', $detail->product_id)
                ->where('date', '<=', $Purchase_data->date)
                ->whereNull('deleted_at')
                ->value('remainingStock'); // Fetch only the calculated value



                $data['stock'] = $remainingStock ?? 0;


                // $data['stock'] = 10;
                $data['id'] = $detail->id;
                $data['detail_id'] = $detail_id += 1;
                $data['quantity'] = $detail->quantity;
                $data['purchase_quantity_in_baseunit'] = $detail->quantity;
                $data['product_id'] = $detail->product_id;
                $data['unitPurchase'] = $unit->ShortName;
                $data['purchase_unit_id'] = $unit->id;
                
                $data['is_imei'] = 0;
                $data['imei_number'] = 12 ;

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

            $details2 = [];
            $detail_id = 0;
            $Raw_details = StockMaintenance::with('product')
            ->leftJoin('department_categories', 'department_categories.id', '=', 'stock_maintenance.department_category_id')
            ->where('stock_maintenance.deleted_at', '=', null)
            ->where('purchased_id', '=', $id)
            ->where('stock_type', '=', 'PD')
            ->where('type', '=', 'out')
            ->select('stock_maintenance.*', 'department_categories.name as department_name') // Select only name as alias
   
            ->get();
            // ->findOrFail($id);
            foreach ($Raw_details as $detail) {

                //-------check if detail has purchase_unit_id Or Null
                if($detail->purchase_unit_id !== null){
                    $unit = Unit::where('id', $detail->purchase_unit_id)->first();
                    $data2['no_unit'] = 1;
                }else{
                    $product_unit_purchase_id = Product::with('unitPurchase')
                    ->where('id', $detail->product_id)
                    ->first();
                    $unit = Unit::where('id', $product_unit_purchase_id['unitPurchase']->id)->first();
                    $data2['no_unit'] = 0;
                }

                if ($detail->product_variant_id) {
                    $item_product = product_warehouse::where('product_id', $detail->product_id)
                        ->where('deleted_at', '=', null)
                        ->where('product_variant_id', $detail->product_variant_id)
                        // ->where('warehouse_id', $Purchase_data->warehouse_id)
                        ->first();

                    $productsVariants = ProductVariant::where('product_id', $detail->product_id)
                        ->where('id', $detail->product_variant_id)->first();

                    $item_product ? $data2['del'] = 0 : $data2['del'] = 1;

                    $data2['code'] = $productsVariants->code;
                    $data2['name'] = '['.$productsVariants->name . ']' . $detail['product']['name'];
                    // $data2['product_variant_id'] = $detail->product_variant_id;                
                        ;
                    if ($unit && $unit->operator == '/') {
                        $data2['stock'] = $item_product ? $item_product->qte * $unit->operator_value : 0;
                    } else if ($unit && $unit->operator == '*') {
                        $data2['stock'] = $item_product ? $item_product->qte / $unit->operator_value : 0;
                    } else {
                        $data2['stock'] = 0;
                    }

                } else {
                    $item_product = product_warehouse::where('product_id', $detail->product_id)
                        ->where('deleted_at', '=', null)//->where('product_variant_id', '=', null)
                        // ->where('warehouse_id', $Purchase_data->warehouse_id)
                        ->first();
                        
                    $item_product ? $data2['del'] = 0 : $data2['del'] = 1;
                    // $data2['array'] =  json_encode($item_product);
                    // $data2['product_variant_id'] = null;

                    $data2['code'] = $detail['product']['code'];
                    $data2['name'] = $detail['product']['name'];
                

                    if ($unit && $unit->operator == '/') {
                        $data2['stock'] = $item_product ? $item_product->qte * $unit->operator_value : 0;
                    } else if ($unit && $unit->operator == '*') {
                        $data2['stock'] = $item_product ? $item_product->qte / $unit->operator_value : 0;
                    } else {
                        $data2['stock'] = 0;
                    }

                }


                $remainingStock = DB::table('stock_maintenance')
                ->selectRaw('SUM(stockIn - StockOut) as remainingStock')
                ->where('product_id', $detail->product_id)
                ->where('date', '<=', $Purchase_data->date)
                ->whereNull('stock_maintenance.deleted_at')
                ->value('remainingStock'); // Fetch only the calculated value



                $data2['stock'] = $remainingStock ?? 0;

                $sub_unit = Unit::where('base_unit', $unit->id)->first();
                $subUnit = $unit->ShortName; // Default to the unit's short name

                if ($sub_unit) {
                    if ($sub_unit->operator == '/') {
                        $quantity2 = $detail->StockOut / $sub_unit->operator_value;
                        $subUnit = $sub_unit->ShortName;
                    } elseif ($unit->operator == '*') {
                        $quantity2 = $detail->StockOut * $sub_unit->operator_value;
                        $subUnit = $sub_unit->ShortName;
                    } else {
                        $quantity2 = $detail->StockOut;
                    }


                    $operator_value_1 = $sub_unit->operator_value;
                    $operator_1 = $unit->operator;
                } else {
                    $quantity2 = $detail->StockOut;


                    $operator_value_1 = '';
                    $operator_1 = '';
                }



                // $data2['stock'] = 10;
                $data2['id'] = $detail->id;
                $data2['detail_id'] = $detail_id += 1;
                $data2['quantity'] = $detail->StockOut;
                $data2['product_id'] = $detail->product_id;
                $data2['unit_purchase'] = $unit->ShortName;
                $data2['purchase_unit_id'] = $unit->id;
                $data2['purchase_quantity_in_baseunit'] = $quantity2;
                $data2['subUnit'] = $subUnit;
                $data2['category_name'] = $detail->department_name;
                $data2['category_id'] = $detail['product']->category_id;
                
                $data2['is_imei'] = 0;
                $data2['imei_number'] =12 ;
                // $data2['DB'] = $Raw_details ;
                $data2['DiscountNet'] = 0;
                // if ($detail->discount_method == '2') {
                //     $data2['DiscountNet'] = $detail->discount;
                // } else {
                //     $data2['DiscountNet'] = $detail->cost * $detail->discount / 100;
                // }

                $tax_cost = 0;//$detail->TaxNet * (($detail->cost - $data2['DiscountNet']) / 100);
                $data2['Unit_cost'] = $detail->total;
                // $data2['tax_percent'] = $detail->TaxNet;
                // $data2['tax_method'] = $detail->tax_method;
                // $data2['discount'] = $detail->discount;
                // $data2['discount_Method'] = $detail->discount_method;

                if ($detail->tax_method == '1') {
                    $data2['Net_cost'] = $detail->total;//$detail->cost - $data2['DiscountNet'];
                    $data2['taxe'] = $tax_cost;
                    $data2['subtotal'] =  $detail->total;//($data2['Net_cost'] * $data2['quantity']) + ($tax_cost * $data2['quantity']);
                    $data2['Unit_cost'] = $detail->total;
                } else {
                    $data2['Net_cost'] = $detail->total / $detail->StockOut;//($detail->cost - $data2['DiscountNet']) / (($detail->TaxNet / 100) + 1);
                    $data2['taxe'] =  $tax_cost; //$detail->cost - $data2['Net_cost'] - $data2['DiscountNet'];
                    $data2['subtotal'] = $detail->total;//($data2['Net_cost'] * $data2['quantity']) + ($tax_cost * $data2['quantity']);
                    $data2['Unit_cost'] = $detail->total / $detail->StockOut;
                }
                $data2['total'] = $detail->total;
                $data2['cost'] = $detail->total;
                $data2['category_id'] = $detail->department_category_id;

                if($detail->department_category_id){
                  $insertType = 'demand';  
                }
                
                $details2[] = $data2;
            }
            // get warehouses assigned to user
            // $user_auth = auth()->user();
            // if($user_auth->is_all_warehouses){
               
            // }else{
            //     $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
            //     $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
            // }
            
             $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
            // $suppliers = Provider::where('deleted_at', '=', null)->get(['id', 'name']);
            $suppliers= '';
            // $warehouses= '';
            return response()->json([
                'details' => $details,
                'details2' => $details2,
                'purchase' => $purchase,
                'suppliers' => $suppliers,
                'warehouses' => $warehouses,
                'insertType' => $insertType,
            ]);
        }
    }

    //------------------- get_Products_by_purchase -----------------\\

    public function get_Products_by_production(Request $request , $id)
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
    public function Products_by_Warehouse_specific(request $request, $id)
    {
        $data = [];
        $product_warehouse_data = product_warehouse::with('warehouse', 'product', 'productVariant')

        ->where(function ($query) use ($request , $id) {
                return $query->where('warehouse_id', $id)
                    ->where('deleted_at', '=', null)
                    ->where(function ($query) use ($request) {
                        return $query->whereHas('product', function ($q) use ($request) {
                            if ($request->is_sale == '1') {
                                $q->where('not_selling', '=', 1);
                            }
                            else{
                                $q->where('not_selling', '=', $request->isSelling);
                            }
                        });
                    })
                    ->where(function ($query) use ($request) {
                        if ($request->stock == '1' && $request->product_service == '1') {
                            return $query->where('qte', '>', 0)->orWhere('manage_stock', false);
        
                        }elseif($request->stock == '1' && $request->product_service == '0') {
                            return $query->where('qte', '>', 0)->orWhere('manage_stock', true);
        
                        }else{
                            return $query->where('manage_stock', true);
                        }
                    });
        })->get();

        foreach ($product_warehouse_data as $product_warehouse) {

           
    


            if ($product_warehouse->product_variant_id) {
                $item['product_variant_id'] = $product_warehouse->product_variant_id;

                $item['code'] = $product_warehouse['productVariant']->code;
                $item['Variant'] = '['.$product_warehouse['productVariant']->name . ']' . $product_warehouse['product']->name;
                $item['name'] = '['.$product_warehouse['productVariant']->name . ']' . $product_warehouse['product']->name;
                $item['barcode'] = $product_warehouse['productVariant']->code;


                $product_price = $product_warehouse['productVariant']->price;

            } else {
                $item['product_variant_id'] = null;
                $item['Variant'] = null;
                $item['code'] = $product_warehouse['product']->code;
                $item['name'] = $product_warehouse['product']->name;
                $item['barcode'] = $product_warehouse['product']->code;

                $product_price =  $product_warehouse['product']->price;
            }

            $item['id'] = $product_warehouse->product_id;
            $item['product_type'] = $product_warehouse['product']->type;
            $item['category_id'] = $product_warehouse['product']->category_id;
            $item['Type_barcode'] = $product_warehouse['product']->Type_barcode;
            $firstimage = explode(',', $product_warehouse['product']->image);
            $item['image'] = $firstimage[0];

            if($product_warehouse['product']['unitSale']){

                if ($product_warehouse['product']['unitSale']->operator == '/') {
                    $item['qte_sale'] = $product_warehouse->qte * $product_warehouse['product']['unitSale']->operator_value;
                    $price = $product_price / $product_warehouse['product']['unitSale']->operator_value;
                } else {
                    $item['qte_sale'] = $product_warehouse->qte / $product_warehouse['product']['unitSale']->operator_value;
                    $price = $product_price * $product_warehouse['product']['unitSale']->operator_value;
                }

                
            }else{
                $item['qte_sale'] = $product_warehouse['product']->type!='is_service'?$product_warehouse->qte:'---';
                $price = $product_price;
            }

            if($product_warehouse['product']['unitPurchase']) {

                if ($product_warehouse['product']['unitPurchase']->operator == '/') {
                    $item['qte_purchase'] = round($product_warehouse->qte * $product_warehouse['product']['unitPurchase']->operator_value, 5);
                } else {
                    $item['qte_purchase'] = round($product_warehouse->qte / $product_warehouse['product']['unitPurchase']->operator_value, 5);
                }

            }else{
                $item['qte_purchase'] = $product_warehouse->qte;
            }

            $item['manage_stock'] = $product_warehouse->manage_stock;
            $item['qte'] = $product_warehouse['product']->type!='is_service'?$product_warehouse->qte:'---';
            $item['unitSale'] = $product_warehouse['product']['unitSale']?$product_warehouse['product']['unitSale']->ShortName:'';
            $item['unitPurchase'] = $product_warehouse['product']['unitPurchase']?$product_warehouse['product']['unitPurchase']->ShortName:'';

            $remainingStock = DB::table('stock_maintenance')
            ->selectRaw('SUM(stockIn - StockOut) as remainingStock')
            ->where('product_id', $product_warehouse->product_id)
            ->where('date', '<=', $request->date)
            ->whereNull('deleted_at')
            ->value('remainingStock'); // Fetch only the calculated value

            $item['qte'] = $remainingStock ?? 0;
            $item['qte_purchase'] = $remainingStock ?? 0;
            if ($product_warehouse['product']->TaxNet !== 0.0) {
                //Exclusive
                if ($product_warehouse['product']->tax_method == '1') {
                    $tax_price = $price * $product_warehouse['product']->TaxNet / 100;
                    $item['Net_price'] = $price + $tax_price;
                    // Inxclusive
                } else {
                    $item['Net_price'] = $price;
                }
            } else {
                $item['Net_price'] = $price;
            }

            $data[] = $item;
        }

        return response()->json($data);
    }
    public function show_product_data($product_id, Request $request)
    {
        // $date = Carbon::now()->format('Y-m-d');
        $date = $request->query('date'); 
        $date1 = $request->query('date'); 
        $Product_data = Product::with('unit')
        ->where('id', $product_id)
        ->where('deleted_at', '=', null)
        ->first();


        if ( $Product_data['recipe_id']) {

        // If data is found, proceed to get `recipe_id`
        $recipe_id = $Product_data['recipe_id'];
        // $recipe_id = 6;
        
        $variant_id = null;
        // $recipe_data = RecipeDetail::where('recipe_id', $recipe_id)
            // ->first();
            // ->get();

        $recipe_data = RecipeDetail::where('recipe_id', $recipe_id)->get();
        $item2 = [];
        foreach ($recipe_data as $data1) {

                $item2[] = $data1->product_id;
                
        }
 
        $data = [];    
        $output = [];
        for ($i = 0; $i < count($item2); $i++) {

            $id   = $item2[$i];
            

            $Purchase_data = Recipe::with('details.product.unitPurchase')
            ->where('deleted_at', '=', null)
            ->findOrFail($recipe_id);

            $details = array();

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
                    // $unit = Unit::where('id', $detail->purchase_unit_id)->first();
                    // $data['no_unit'] = 1;


                    $product_unit_purchase_id = Product::with('unitPurchase')
                    ->where('id', $detail->product_id)
                    ->first();
                    $unit = Unit::where('id', $product_unit_purchase_id['unitPurchase']->id)->first();
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
                        // ->where('warehouse_id', $Purchase_data->warehouse_id)
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
                        $data['stock'] = $item_product ? $item_product->qte / $unit->operator_value :0;
                    } else {
                        $data['stock'] = 0;
                    }

                } else {
                    $item_product = product_warehouse::where('product_id', $detail->product_id)
                        ->where('deleted_at', '=', null)->where('product_variant_id', '=', null)
                        // ->where('warehouse_id', $Purchase_data->warehouse_id)
                        ->first();

                    $item_product ? $data['del'] = 0 : $data['del'] = 1;
                    $data['product_variant_id'] = null;
                    $data['code'] = $detail['product']['code'];
                    $data['name'] = $detail['product']['name'];
                    

                    if ($unit && $unit->operator == '/') {
                        $data['stock'] = $item_product ? $item_product->qte * $unit->operator_value : 0;
                    } else if ($unit && $unit->operator == '*') {
                        // $data['stock'] = $item_product ? $item_product->qte / $unit->operator_value : 0.8;
                        $data['stock'] = $item_product ? $item_product->qte / $unit->operator_value : 0;
                    } else {
                        $data['stock'] =0;
                    }

                }




                $sub_unit =  Unit::where('base_unit', $unit->id)->first();
                if ($sub_unit) {

                    if ($sub_unit && $sub_unit->operator == '/') {
                        $detail->quantity2 =  ($detail->quantity / $sub_unit->operator_value);
                         $subUnit = $sub_unit->ShortName;
                    } else if ($unit && $unit->operator == '*') {
                        // $data['stock'] = $item_product ? $item_product->qte / $unit->operator_value : 0.8;
                        $detail->quantity2 =  ($detail->quantity * $sub_unit->operator_value);
                         $subUnit = $sub_unit->ShortName;
                    } else {
                        $detail->quantity2 = $detail->quantity;
                         $subUnit = $unit->ShortName;
                    }
                } else {
                    $detail->quantity2 = $detail->quantity;
                     $subUnit = $unit->ShortName;
                }
                $data['id'] = $detail->id;
                $data['detail_id'] = $detail_id += 1;


                $remainingStock = DB::table('stock_maintenance')
                ->selectRaw('SUM(stockIn - StockOut) as remainingStock')
                ->where('product_id', $detail->product_id)
                ->where('date', '<=', $date)
                ->whereNull('deleted_at')
                ->value('remainingStock'); // Fetch only the calculated value



                $data['stock'] = $remainingStock ?? 0;
                $data['quantity'] = $detail->quantity;
                $data['purchase_quantity'] = $detail->quantity;
                $data['purchase_quantity_in_baseunit'] = $detail->quantity2;
                $data['product_id'] = $detail->product_id;
                $data['recipe_id'] = $detail->recipe_id;
                $data['unitPurchase'] = $unit->ShortName;
                $data['purchase_unit_id'] = $unit->id;
                $data['subUnit'] = $subUnit;
                $data['is_imei'] = $detail['product']['is_imei'];
                $data['imei_number'] = $detail->imei_number;

                if ($detail->discount_method == '2') {
                    $data['DiscountNet'] = $detail->discount;
                } else {
                    $data['DiscountNet'] = $detail->cost * $detail->discount / 100;
                }

                $averageCost = $this->getAverageCostForRemainingStock($detail->product_id, $date1, $remainingStock ?? 0);

                $tax_cost = $detail['product']->TaxNet * (($detail['product']->cost - $data['DiscountNet']) / 100);
                $data['Unit_cost'] = $averageCost ;
                $data['Unit_cost1'] = $detail['product']->cost;
                $data['tax_percent'] = $detail['product']->TaxNet;
                $data['tax_method'] = $detail['product']->tax_method;
                $data['discount'] = $detail->discount;
                $data['discount_Method'] = $detail->discount_method;
                
                if ($detail->tax_method == '1') {
                    // $data['Net_cost'] = $detail['product']->cost - $data['DiscountNet'];
                    $data['Net_cost'] =  $averageCost ?? 0;
                    $data['taxe'] = $tax_cost;
                    // $data['subtotal'] = ($data['Net_cost'] * $data['quantity']) + ($tax_cost * $data['quantity']);
                    $data['subtotal'] = ($data['Net_cost'] * $data['quantity']) + ($tax_cost * $data['quantity']);
                } else {
                    // $data['Net_cost'] = ($detail['product']->cost - $data['DiscountNet']) / (($detail['product']->TaxNet / 100) + 1);
                    $data['Net_cost'] =  $averageCost ?? 0;
                    $data['taxe'] = $detail['product']->cost - $data['Net_cost'] - $data['DiscountNet'];
                    // $data['subtotal'] = ($data['Net_cost'] * $data['quantity']) + ($tax_cost * $data['quantity']);
                    $data['subtotal'] = ($data['Net_cost'] * $data['quantity']) + ($tax_cost * $data['quantity']);
                }
               
                
                
                $details[] = $data;
            }

        }
        
        } 
        
        else {
            $details[] = null;
        }

        $data[] = $details;

        return response()->json($data[0]);
    }
    public function getAverageCostForRemainingStock($productId, $date, $remainingStock)
    {

        $datehead = 'date';

        // if($productId=='27'){
        //     $datehead = 'date2';
        //     $date = $remainingStock;
        // }
        // Fetch purchases sorted by date (FIFO method) up to the given date
        $purchases = DB::table('stock_maintenance')
            ->where('product_id', $productId)
            ->where('date', '<=', $date)
            ->whereIn('stock_type', ['PD', 'PR'])
            ->where('deleted_at', '=', null)
            ->select( 'unit_price' ,'stockIn')
            ->orderBy('created_at', 'asc')
            ->get();

        $remainingQuantity = $remainingStock;
        $totalCost = 0;

        foreach ($purchases as $purchase) {
            if ($remainingQuantity <= 0) {
                break; // Stop if we've accounted for the remaining stock
            }

            if ($purchase->stockIn <= $remainingQuantity) {
                // Use the full quantity from this purchase
                $totalCost += $purchase->unit_price * $purchase->stockIn;
                $remainingQuantity -= $purchase->stockIn;
            } else {
                // Use only the remaining quantity needed from this purchase
                $totalCost += $purchase->unit_price * $remainingQuantity;
                $remainingQuantity = 0; // All remaining stock accounted for
            }
        }

        // Calculate the average cost
        $averageCost = $remainingStock > 0 ? $totalCost / $remainingStock : 0;

        return $averageCost;
    }

    public function show_product_data2(Request $request, $product_id)
    {

        $date = '2024-11-20';
        $Value_stock = $request->details['stock'] ;
        $Value_quantity = $request->details['quantity'] ;
        $Unit_cost = $request->details['Unit_cost'] ;
        $SubTotal = 0 ;




        $Product_data = Product::with('unit')
        ->where('id', $product_id)
        ->where('deleted_at', '=', null)
        ->first();


        if ( $Product_data['recipe_id']) {

            // If data is found, proceed to get `recipe_id`
            $recipe_id = $Product_data['recipe_id'];
            // $recipe_id = 6;
            
            $variant_id = null;
            // $recipe_data = RecipeDetail::where('recipe_id', $recipe_id)
                // ->first();
                // ->get();

            $recipe_data = RecipeDetail::where('recipe_id', $recipe_id)->get();
            $item2 = [];
            foreach ($recipe_data as $data1) {

                    $item2[] = $data1->product_id;
                    
            }
    
            $data = [];    
            $output = [];
            for ($i = 0; $i < count($item2); $i++) {

                $id   = $item2[$i];
                

                $Purchase_data = Recipe::with('details.product.unitPurchase')
                ->where('deleted_at', '=', null)
                ->findOrFail($recipe_id);

                $details = array();

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
                            // ->where('warehouse_id', $Purchase_data->warehouse_id)
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
                            $data['stock'] = $item_product ? $item_product->qte / $unit->operator_value :0;
                        } else {
                            $data['stock'] = 0;
                        }

                    } else {
                        $item_product = product_warehouse::where('product_id', $detail->product_id)
                            ->where('deleted_at', '=', null)->where('product_variant_id', '=', null)
                            // ->where('warehouse_id', $Purchase_data->warehouse_id)
                            ->first();

                        $item_product ? $data['del'] = 0 : $data['del'] = 1;
                        $data['product_variant_id'] = null;
                        $data['code'] = $detail['product']['code'];
                        $data['name'] = $detail['product']['name'];
                        

                        if ($unit && $unit->operator == '/') {
                            $data['stock'] = $item_product ? $item_product->qte * $unit->operator_value : 0;
                        } else if ($unit && $unit->operator == '*') {
                            // $data['stock'] = $item_product ? $item_product->qte / $unit->operator_value : 0.8;
                            $data['stock'] = $item_product ? $item_product->qte / $unit->operator_value : 0;
                        } else {
                            $data['stock'] =0;
                        }

                    }
                    // $sub_unit =  Unit::where('base_unit', $product_unit_purchase_id['unitPurchase']->id)->first();
                    // $sub_unit->operator;
                    $data['id'] = $detail->id;
                    $data['detail_id'] = $detail_id += 1;
                    $data['quantity'] = $detail->quantity;
                    $data['purchase_quantity'] = $detail->quantity;
                    $data['product_id'] = $detail->product_id;
                    $data['unitPurchase'] = $unit->ShortName;
                    $data['purchase_unit_id'] = $unit->id;
                    $data['recipe_id'] = $detail->recipe_id;
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

                
            }
        
            foreach ($details as &$detail) {
                $SubTotal += $detail['subtotal']; // Calculate the cumulative total
            }
        } else {
            $details[] = null;
        }
                
        
       
        $SubTotal;

       
        


        $details_new = [
            'subtotal' => $SubTotal,   
            'quantity' => $Value_quantity,    
            // 'average_product_cost' => $average_product_cost,
            
            'average_product_cost' => $SubTotal,
            'Unit_cost' => $Unit_cost, 
            'details' => $details , 
        ];

        $data[] = $details_new;
        
        return response()->json($data[0]);
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
