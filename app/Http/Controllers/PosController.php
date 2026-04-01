<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\UserWarehouse;
use App\Models\Member;
// PaymentSale model removed - table dropped
use App\Models\Product;
use App\Models\Setting;

use App\Models\SaleReturn;


use App\Models\Counter;

use App\Services\AccountCodes;

use App\Models\CombinedProduct;

use App\Services\LedgerService;
use App\Models\AccountsLedger;

use App\Models\ResturantTable;
use App\Models\StockMaintenance;
use App\Models\Recipe;
use App\Models\RecipeDetail;
use App\Models\PosSetting;
use App\Models\ProductVariant;
use App\Models\product_warehouse;
// PaymentWithCreditCard model removed - table dropped
// Role model removed - table dropped
// use App\Models\Role;
use App\Models\Sale;
use App\Models\Unit;
use App\Models\SaleDetail;
use App\Models\Warehouse;
use App\utils\helpers;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Stripe;

class PosController extends BaseController
{
    public function __construct(LedgerService $ledgerService)
    {
        $this->ledgerService = $ledgerService;
    }
    //------------ Create New  POS --------------\\

    public function CreatePOS(Request $request)
    {
        // dd($request->all());
        $this->authorizeForUser($request->user('api'), 'Sales_pos', Sale::class);
        if ( $request->sale_id == null){

            request()->validate([
                'client_id' => 'required',
                'warehouse_id' => 'required',
                // 'payment.amount' => 'required',
                'date' => 'required',
            ]);


            
            if($request->table_id && ResturantTable::whereId($request->table_id)->where('assigned', 1)->exists()){


                return response()->json(['success' => false, 'message' => 'table_exists']);


            }



             $item = \DB::transaction(function () use ($request) {
                $helpers = new helpers();
                // Role table dropped - set view_records to true (allow all records)
                // $role = Auth::user()->roles()->first();
                // $view_records = Role::findOrFail($role->id)->inRole('record_view');
                $view_records = true;
                $order = new Sale;

                $order->is_pos = 1;
                $order->date = $request->date;//Carbon::now();
                $order->Ref = app('App\Http\Controllers\SalesController')->getNumberOrder();
                $order->client_id = $request->client_id;
                $order->person_id = $request->person_id;
                $order->table_id = $request->table_id;


                $order->extratables = implode(',', $request->extratables);




                $order->sale_type = 'standard';
                $order->orderType = $request->orderType;
                $order->warehouse_id = $request->warehouse_id;
                $order->tax_rate = $request->tax_rate;
                $order->TaxNet = $request->TaxNet;
                $order->discount = $request->discount;
                $order->shipping = $request->shipping;
                $order->GrandTotal = $request->GrandTotal;
                $order->notes = $request->notes;
                $order->statut = 'ordered';
                $order->payment_statut = 'unpaid';
                $order->user_id = Auth::user()->id;
                $order->adresse = $request->adresse ?? '';

                //temporary
                // $order->preparation = 'completed';


                if ($request->filled('time')) {
                    $order->created_at = $request->time ;
                }

                $order->save();




                // table assign
                // ResturantTable::whereId($request->table_id)->update([
                //     // 'client_id' => $request->client_id,
                //     'assigned' => 1,
                // ]);
                // ResturantTable::whereIn('id',  [$request->extratables])->update([
                //     'assigned' => 1,
                // ]);
                if ($request->table_id && ResturantTable::whereId($request->table_id)->exists()) {
                    ResturantTable::whereId($request->table_id)->update([
                        'assigned' => 1,
                    ]);
                }

                if (!empty($request->extratables)) {
                    ResturantTable::whereIn('id', (array) $request->extratables)->update([
                        'assigned' => 1,
                    ]);
                }



                $total_cost = 0;

                $data = $request['details'];
                foreach ($data as $key => $value) {





                    $unit = Unit::where('id', $value['sale_unit_id'])
                        ->first();
                    $orderDetails[] = [
                        'date' => Carbon::now(),
                        'sale_id' => $order->id,
                        'sale_unit_id' =>  $value['sale_unit_id'],
                        'quantity' => $value['quantity'],
                        'product_id' => $value['product_id'],
                        'product_variant_id' => $value['product_variant_id'],
                        'total' => $value['subtotal'],
                        'price' => $value['Unit_price'],
                        'TaxNet' => $value['tax_percent'],
                        'tax_method' => $value['tax_method'],
                        'discount' => $value['discount'],
                        'discount_method' => $value['discount_Method'],
                        'imei_number' => $value['imei_number'],
                    ];

                    if ($value['product_variant_id'] !== null) {
                        $product_warehouse = product_warehouse::where('warehouse_id', $order->warehouse_id)
                            ->where('product_id', $value['product_id'])->where('product_variant_id', $value['product_variant_id'])
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
                        $stock->warehouse_id = $order->warehouse_id;
                        $stock->product_id = $value['product_id'];
                        $stock->purchased_id = $order->id;
                        $stock->unit_id = $value['sale_unit_id'];
                        $stock->date = $request->date;//Carbon::now();
                        $stock->unit_price = $value['Unit_cost'];
                        $stock->type = 'out'; // Stock out
                        $stock->stockIn = 0; // Quantity added to stock
                        $stock->stockOut = $value['quantity']; // No stock out in this case
                        $stock->total = $value['Unit_cost'] *  $value['quantity']; // No stock out in this case
                        $stock->stock_type = 'SL'; // stock type case
                        $stock->save();

                        $this->minusPackagingItem( $order->warehouse_id,
                            $value['product_id'] ,
                            $order->id,
                            $value['sale_unit_id'] ,
                            $request->date,
                            $value['Unit_cost'],
                            $value['quantity'],
                            $value['Unit_cost'] *  $value['quantity'],
                            $request->orderType,
                        );

                        $total_cost += $value['Unit_cost'] *  $value['quantity'];

                    } else {





                        $product = Product::where('id', $value['product_id'])->first();
                        $Ordertype = $request->orderType ;
                        if($product["type"] =="is_combo"){


                            // new logic packaging material redirect deal combos from product table
                            $CombinedProduct = CombinedProduct::with('product')
                            ->where('product_id', $value['product_id'])
                            ->whereHas('product', function ($query) use ($Ordertype) {
                                $query->where(function ($q) use ($Ordertype) {
                                    $q->where( $Ordertype , 1)
                                    ->orWhere(function ($q) {
                                        $q->where('dinein', 0)
                                            ->where('takeaway', 0)
                                            ->where('delivery', 0);
                                    });
                                });
                            })
                            ->get();


                            foreach ($CombinedProduct as $key => $value2){

                                $stock = new StockMaintenance;
                                $stock->warehouse_id = $order->warehouse_id;
                                $stock->product_id = $value2['combined_product_id'];
                                $stock->purchased_id = $order->id;
                                $stock->unit_id = $value2->product['unit_sale_id'];//['unit_sale_id'];
                                $stock->unit_price = $value2['price'];
                                $stock->date = $request->date;//Carbon::now();
                                $stock->type = 'out'; // Stock out
                                $stock->stockIn = 0; // Quantity added to stock
                                $stock->stockOut = $value2['quantity'] * $value['quantity']; // No stock out in this case
                                $stock->total = $value2['price'] *  $value2['quantity'] * $value['quantity']; // No stock out in this case
                                $stock->stock_type = 'DL'; // stock type case
                                $stock->save();

                                // $this->minusPackagingItem( $order->warehouse_id,
                                //     $value2['combined_product_id'] ,
                                //     $order->id,
                                //     $value2->product['unit_sale_id'] ,
                                //     $request->date,
                                //     $value2['price'],
                                //     $value2['quantity'] * $value['quantity'],
                                //     $value2['price'] *  $value2['quantity'] * $value['quantity'],
                                //     $request->orderType,
                                // );

                                $total_cost += $value2['price'] *  $value2['quantity'] * $value['quantity'];

                                $product_warehouse = product_warehouse::where('warehouse_id', $order->warehouse_id)
                                    ->where('product_id', $value2['product_id'])
                                    ->first();

                                    $unit2 = Unit::where('id', $value2->product['unit_sale_id'])
                                    ->first();


                                if ($unit && $product_warehouse) {
                                    if ($unit->operator == '/') {
                                        $product_warehouse->qte -= $value2['quantity'] * $value['quantity'] / $unit2->operator_value;
                                    } else {
                                        $product_warehouse->qte -= $value2['quantity'] * $value['quantity'] * $unit2->operator_value;
                                    }
                                    $product_warehouse->save();
                                }


                            }
                            $stock = new StockMaintenance;
                            $stock->warehouse_id = $order->warehouse_id;
                            $stock->product_id = $value['product_id'];
                            $stock->purchased_id = $order->id;
                            $stock->unit_id = $value['sale_unit_id'];
                            $stock->unit_price = $value['Unit_cost'];
                            $stock->date =  $request->date;//Carbon::now();
                            $stock->type = 'in'; // Stock out
                            $stock->stockIn = $value['quantity']; // Quantity added to stock
                            $stock->stockOut = 0; // No stock out in this case
                            $stock->total =  $value['Unit_cost'] *  $value['quantity']; // No stock out in this case
                            $stock->stock_type = 'DP'; // stock type case
                            $stock->save();

                            $stock = new StockMaintenance;
                            $stock->warehouse_id = $order->warehouse_id;
                            $stock->product_id = $value['product_id'];
                            $stock->purchased_id = $order->id;
                            $stock->unit_id = $value['sale_unit_id'];
                            $stock->unit_price = $value['Unit_cost'];
                            $stock->date =  $request->date;//Carbon::now();
                            $stock->type = 'out'; // Stock out
                            $stock->stockIn = 0; // Quantity added to stock
                            $stock->stockOut = $value['quantity']; // No stock out in this case
                            $stock->total =  $value['Unit_cost'] *  $value['quantity']; // No stock out in this case
                            $stock->stock_type = 'SL'; // stock type case
                            $stock->save();

                            // $this->minusPackagingItem( $order->warehouse_id,
                            // $value['product_id'] ,
                            // $order->id,
                            // $value['sale_unit_id'] ,
                            // $request->date,
                            // $value['Unit_cost'],
                            // $value['quantity'],
                            // $value['Unit_cost'] *  $value['quantity'],
                            // $request->orderType,
                            // );

                        }
                        else{



                            // $recipe_id = 0;

                            // if($recipe_id == 0 ){



                            $stock = new StockMaintenance;
                            $stock->warehouse_id = $order->warehouse_id;
                            $stock->product_id = $value['product_id'];
                            $stock->purchased_id = $order->id;
                            $stock->unit_id = $value['sale_unit_id'];
                            $stock->unit_price = $value['Unit_cost'];
                            $stock->date = $request->date;//Carbon::now();
                            $stock->type = 'out'; // Stock out
                            $stock->stockIn = 0; // Quantity added to stock
                            $stock->stockOut = $value['quantity']; // No stock out in this case
                            $stock->total = $value['Unit_cost'] *  $value['quantity']; // No stock out in this case
                            $stock->stock_type = 'SL'; // stock type case
                            $stock->save();

                            $this->minusPackagingItem( $order->warehouse_id,
                                $value['product_id'] ,
                                $order->id,
                                $value['sale_unit_id'] ,
                                $request->date,
                                $value['Unit_cost'],
                                $value['quantity'],
                                $value['Unit_cost'] *  $value['quantity'],
                                $request->orderType,
                            );

                            $total_cost += $value['Unit_cost'] *  $value['quantity'];

                            $product_warehouse = product_warehouse::where('warehouse_id', $order->warehouse_id)
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

                        // }else{




                        // }

                    }


                    }


                    // echo $product->recipe_id;
                    // Check if the product and recipe exist

                    // not using coz of production feature in
                    // if ($product && $product->recipe_id) {
                    //     // Loop through the recipe items
                    //     foreach ($product->recipe->details as $detail) {
                    //         // Access individual recipe detail properties


                    //     $unit_detail = Unit::where('id', $detail->purchase_unit_id)
                    //     ->first();


                    //     $product_warehouse = product_warehouse::where('warehouse_id', $order->warehouse_id)
                    //         ->where('product_id', $detail->product_id)
                    //         ->first();
                    //     if ($unit_detail && $product_warehouse) {
                    //         if ($unit_detail->operator == '/') {
                    //             $product_warehouse->qte -= $detail->quantity / $unit_detail->operator_value;
                    //         } else {
                    //             $product_warehouse->qte -= $detail->quantity * $unit_detail->operator_value;
                    //         }
                    //         $product_warehouse->save();
                    //     }


                    //         // echo $detail->product_id;
                    //         // echo $detail->cost;  // Example of how to access a field
                    //     }
                    // }



                }

                SaleDetail::insert($orderDetails);

                $sale = Sale::findOrFail($order->id);
                // Check If User Has Permission view All Records
                if (!$view_records) {
                    // Check If User->id === sale->id
                    $this->authorizeForUser($request->user('api'), 'check_record', $sale);
                }

                try {

                    $total_paid = $sale->paid_amount + $request['amount'];
                    $due = $sale->GrandTotal - $total_paid;

                    if ($due === 0.0 || $due < 0.0) {
                        $payment_statut = 'paid';
                    } else if ($due != $sale->GrandTotal) {
                        $payment_statut = 'partial';
                    } else if ($due == $sale->GrandTotal) {
                        $payment_statut = 'unpaid';
                    }

                    if($request['amount'] > 0){
                        if ($request->payment['Reglement'] == 'credit card') {
                            // Check if member is excluded from online payments
                            $member = Member::where('id', $request->client_id)->first();
                            if ($member && $member->exclude_from_online_payments) {
                                return response()->json([
                                    'success' => false,
                                    'message' => 'This member is excluded from online payments. Please use an offline payment method.',
                                    'code' => 'EXCLUDED_FROM_ONLINE_PAYMENTS'
                                ], 422);
                            }
                            
                            $member = Member::whereId($request->client_id)->first();
                            Stripe\Stripe::setApiKey(config('app.STRIPE_SECRET'));

                            // PaymentWithCreditCard table dropped - check disabled
                            $PaymentWithCreditCard = null;
                            if (!$PaymentWithCreditCard && $member) {

                                // Create a new customer and charge the customer with a new credit card
                                $customer = \Stripe\Customer::create([
                                    'source' => $request->token,
                                    'email'  => $member->email ?? '',
                                    'name'   => $member->name ?? '',
                                ]);

                                // Charge the Customer instead of the card:
                                $charge = \Stripe\Charge::create([
                                    'amount'   => $request['amount'] * 100,
                                    'currency' => 'usd',
                                    'customer' => $customer->id,
                                ]);
                                $PaymentCard['customer_stripe_id'] = $customer->id;

                            // Check if the payment record not exists
                            } else {

                                 // Retrieve the customer ID and card ID
                                $customer_id = $PaymentWithCreditCard->customer_stripe_id;
                                $card_id = $request->card_id;

                                // Charge the customer with the new credit card or the selected card
                                if ($request->is_new_credit_card || $request->is_new_credit_card == 'true' || $request->is_new_credit_card === 1) {
                                    // Retrieve the customer
                                    $customer = \Stripe\Customer::retrieve($customer_id);

                                    // Create New Source
                                    $card = \Stripe\Customer::createSource(
                                        $customer_id,
                                        [
                                          'source' => $request->token,
                                        ]
                                      );

                                    $charge = \Stripe\Charge::create([
                                        'amount'   => $request['amount'] * 100,
                                        'currency' => 'usd',
                                        'customer' => $customer_id,
                                        'source'   => $card->id,
                                    ]);
                                    $PaymentCard['customer_stripe_id'] = $customer_id;

                                } else {
                                    $charge = \Stripe\Charge::create([
                                        'amount'   => $request['amount'] * 100,
                                        'currency' => 'usd',
                                        'customer' => $customer_id,
                                        'source'   => $card_id,
                                    ]);
                                    $PaymentCard['customer_stripe_id'] = $customer_id;
                                }
                            }




                            // PaymentSale table dropped - payment record creation disabled
                            // $PaymentSale            = new PaymentSale();
                            // $PaymentSale->sale_id   = $order->id;
                            // $PaymentSale->Ref       = app('App\Http\Controllers\PaymentSalesController')->getNumberOrder();
                            // $PaymentSale->date      = $request->date;//Carbon::now();
                            // $PaymentSale->Reglement = $request->payment['Reglement'];
                            // $PaymentSale->montant   = $request['amount'];
                            // $PaymentSale->change    = $request['change'];
                            // $PaymentSale->notes     = $request->payment['notes'];
                            // $PaymentSale->user_id   = Auth::user()->id;
                            // $PaymentSale->save();

                            $sale->update([
                                'paid_amount'    => $total_paid,
                                'payment_statut' => $payment_statut,
                            ]);

                            $PaymentCard['customer_id'] = $request->client_id;
                            $PaymentCard['payment_id']  = $PaymentSale->id;
                            $PaymentCard['charge_id']   = $charge->id;
                            PaymentWithCreditCard::create($PaymentCard);

                            // Paying Method Cash
                        } else {

                            $PaymentSale = PaymentSale::create([
                                'sale_id' => $order->id,
                                'Ref' => app('App\Http\Controllers\PaymentSalesController')->getNumberOrder(),
                                'date' => Carbon::now(),
                                'Reglement' => $request->payment['Reglement'],
                                'montant' => $request['amount'],
                                'change' => $request['change'],
                                'notes' => $request->payment['notes'],
                                'user_id' => Auth::user()->id,
                            ]);

                            $sale->update([
                                'paid_amount' => $total_paid,
                                'payment_statut' => $payment_statut,
                            ]);
                        }


                        $account_id_dr = $request->payment['Reglement'];
                        $account_id_cr = AccountCodes::CUSTOMER_ACCOUNTS_RECEIVABLE;



                        $AccountsLedger = new AccountsLedger;
                        $AccountsLedger = AccountsLedger::where('voucher_number', $order->id)
                        ->where('voucher_type', 'RCV')
                        ->delete();


                        $this->ledgerService->createLedgerEntry(
                            $PaymentSale->id,
                            'RCV', // Assuming you have this method
                            $account_id_dr,
                            $request['amount'],
                            0,
                            'Sale Payment Transaction',
                            $order->id,
                            $request['date']
                        );


                        $this->ledgerService->createLedgerEntry(
                            $PaymentSale->id,
                            'RCV',
                            $account_id_cr,
                            0,
                            $request['amount'],
                            'Sale Payment Transaction',
                            $order->id,
                            $request['date']
                        );


                    }

                } catch (Exception $e) {
                    return response()->json(['message' => $e->getMessage()], 500);
                }


            // $account_id_dr = 1103;
            // $account_id_cr = 40011; // Acounts Payable
            $account_id_dr = AccountCodes::CUSTOMER_ACCOUNTS_RECEIVABLE ;
            $account_id_cr = AccountCodes::DINE_IN_FOOD_SALES;

            $AccountsLedger = new AccountsLedger;
            $AccountsLedger = AccountsLedger::where('voucher_number', $order->id)
            ->where('voucher_type', 'SL')
            ->delete();


            $this->ledgerService->createLedgerEntry(
                $order->id,
                'SL', // Assuming you have this method
                $account_id_dr,
                $request->GrandTotal,
                0,
                'Sale Transaction',
                $order->id,
                $request->date
            );


            $this->ledgerService->createLedgerEntry(
                $order->id,
                'SL',
                $account_id_cr,
                0,
                $request->GrandTotal,
                'Sale Transaction',
                $order->id,
                $request->date
            );



            // $account_id_dr = 5001;
            // $account_id_cr = 11041; // Acounts Payable
            $account_id_dr = AccountCodes::PURCHASES;
            $account_id_cr = AccountCodes::RAW_MATERIAL;


            $this->ledgerService->createLedgerEntry(
                $order->id,
                'SL', // Assuming you have this method
                $account_id_dr,
                $total_cost,
                0,
                'Sale Transaction',
                $order->id,
                $request->date
            );


            $this->ledgerService->createLedgerEntry(
                $order->id,
                'SL',
                $account_id_cr,
                0,
                $total_cost,
                'Sale Transaction',
                $order->id,
                $request->date
            );





            $sale->update([
                'NetCost'         => $total_cost
            ]);



                return $order->id;





            }, 10);

            return response()->json(['success' => true, 'id' => $item]);
        }
        else{


            $id = $request->sale_id;
            $this->authorizeForUser($request->user('api'), 'update', Sale::class);

            request()->validate([
                'warehouse_id' => 'required',
                'client_id' => 'required',
            ]);



            // if($request->table_id && ResturantTable::whereId($request->table_id)->where('assigned', 1)->exists()){


            //     return response()->json([
            //         'success' => false,
            //         'message' => 'table_exists',
            //     ]);


            // }


            $item = \DB::transaction(function () use ($request, $id) {

                // Role table dropped - set view_records to true (allow all records)
                // $role = Auth::user()->roles()->first();
                // $view_records = Role::findOrFail($role->id)->inRole('record_view');
                $view_records = true;
                $current_Sale = Sale::findOrFail($id);


                $total_cost = 0;

                StockMaintenance::where('purchased_id', $id)
                // ->where('warehouse_id', $current_Sale->warehouse_id)
                ->whereIn('stock_type', ['SL','DL','DP'])
                ->delete(); //

                if (SaleReturn::where('sale_id', $id)->where('deleted_at', '=', null)->exists()) {
                    return response()->json(['success' => false , 'Return exist for the Transaction' => false], 403);
                }else{
                    // Check If User Has Permission view All Records
                    if (!$view_records) {
                        // Check If User->id === Sale->id
                        $this->authorizeForUser($request->user('api'), 'check_record', $current_Sale);
                    }
                    $old_sale_details = SaleDetail::where('sale_id', $id)->get();
                    $new_sale_details = $request['details'];
                    $length = sizeof($new_sale_details);

                    // Get Ids for new Details


                    $new_products_id = [];
                    foreach ($new_sale_details as $new_detail) {
                        $new_products_id[] = $new_detail['id'] ?? 0;
                    }


                    $old_products_kot_essentials = [];
                    // Init Data with old Parametre
                    $old_products_id = [];
                    foreach ($old_sale_details as $key => $value) {
                        $old_products_id[] = $value->id;

                        $old_products_kot_essentials[] = [
                            'id' => $value->product_id,
                            'qty' => $value->quantity
                        ];

                        //check if detail has sale_unit_id Or Null
                        if($value['sale_unit_id'] !== null){
                            $old_unit = Unit::where('id', $value['sale_unit_id'])->first();
                        }else{
                            $product_unit_sale_id = Product::with('unitSale')
                            ->where('id', $value['product_id'])
                            ->first();

                            if($product_unit_sale_id['unitSale']){
                                $old_unit = Unit::where('id', $product_unit_sale_id['unitSale']->id)->first();
                            }{
                                $old_unit = NULL;
                            }
                        }

                        if ($current_Sale->statut == "completed") {

                            if ($value['product_variant_id'] !== null) {
                                $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                    ->where('warehouse_id', $current_Sale->warehouse_id)
                                    ->where('product_id', $value['product_id'])
                                    ->where('product_variant_id', $value['product_variant_id'])
                                    ->first();

                                if ($product_warehouse && $old_unit) {
                                    if ($old_unit->operator == '/') {
                                        $product_warehouse->qte += $value['quantity'] / $old_unit->operator_value;
                                    } else {
                                        $product_warehouse->qte += $value['quantity'] * $old_unit->operator_value;
                                    }
                                    $product_warehouse->save();
                                }

                            } else {
                                $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                    ->where('warehouse_id', $current_Sale->warehouse_id)
                                    ->where('product_id', $value['product_id'])
                                    ->first();
                                if ($product_warehouse && $old_unit) {
                                    if ($old_unit->operator == '/') {
                                        $product_warehouse->qte += $value['quantity'] / $old_unit->operator_value;
                                    } else {
                                        $product_warehouse->qte += $value['quantity'] * $old_unit->operator_value;
                                    }
                                    $product_warehouse->save();
                                }
                            }
                        }
                        // Delete Detail
                        if (!in_array($old_products_id[$key], $new_products_id)) {
                            $SaleDetail = SaleDetail::findOrFail($value->id);
                            $SaleDetail->delete();
                        }
                    }


                    // Update Data with New request
                    foreach ($new_sale_details as $prd => $prod_detail) {

                        $get_type_product = Product::where('id', $prod_detail['product_id'])->first()->type;


                        if($prod_detail['sale_unit_id'] !== null || $get_type_product == 'is_service'){
                            $unit_prod = Unit::where('id', $prod_detail['sale_unit_id'])->first();

                            // if ($request['statut'] == "completed") {

                                if ($prod_detail['product_variant_id'] !== null) {

                                          $stock = new StockMaintenance;
                                        $stock->warehouse_id = $current_Sale->warehouse_id;
                                        $stock->product_id = $prod_detail['product_id'];
                                        $stock->purchased_id = $id;
                                        $stock->unit_id = $prod_detail['sale_unit_id'];
                                        $stock->unit_price = $prod_detail['Unit_price'];
                                        $stock->date = $request['date'];//$current_Sale->date;
                                        $stock->type = 'out'; // Stock out
                                        $stock->stockIn = 0; // Quantity added to stock
                                        $stock->stockOut = $prod_detail['quantity']; // No stock out in this case
                                        $stock->total = $prod_detail['subtotal']; // No stock out in this case
                                        $stock->stock_type = 'SL'; // stock type case
                                        $stock->save();

                                    $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                        ->where('warehouse_id', $request->warehouse_id)
                                        ->where('product_id', $prod_detail['product_id'])
                                        ->where('product_variant_id', $prod_detail['product_variant_id'])
                                        ->first();

                                    if ($product_warehouse && $unit_prod) {
                                        if ($unit_prod->operator == '/') {
                                            $product_warehouse->qte -= $prod_detail['quantity'] / $unit_prod->operator_value;
                                        } else {
                                            $product_warehouse->qte -= $prod_detail['quantity'] * $unit_prod->operator_value;
                                        }
                                        $product_warehouse->save();
                                    }

                                } else {



                                    if($get_type_product =="is_combo"){

                                        $CombinedProduct = CombinedProduct::with('product')->where('product_id', $prod_detail['product_id'])->get();


                                        foreach ($CombinedProduct as $key => $value2){

                                            // $stock = new StockMaintenance;
                                            // $stock->warehouse_id = $current_Sale->warehouse_id;
                                            // $stock->product_id = $prod_detail['product_id'];
                                            // $stock->purchased_id = $id;
                                            // $stock->unit_id = $prod_detail['sale_unit_id'];
                                            // $stock->unit_price = $prod_detail['Unit_price'];
                                            // $stock->date = $request['date'];//$current_Sale->date;
                                            // $stock->type = 'out'; // Stock out
                                            // $stock->stockIn = 0; // Quantity added to stock
                                            // $stock->stockOut = $prod_detail['quantity']; // No stock out in this case
                                            // $stock->total = $prod_detail['subtotal']; // No stock out in this case
                                            // $stock->stock_type = 'SL'; // stock type case
                                            // $stock->save();


                                            $stock = new StockMaintenance;
                                            $stock->warehouse_id = $current_Sale->warehouse_id;
                                            $stock->product_id = $value2['combined_product_id'];
                                            $stock->purchased_id = $id;
                                            $stock->unit_id = $value2->product['unit_sale_id'];//['unit_sale_id'];
                                            $stock->unit_price = $value2['price'];
                                            $stock->date = $request['date'];//Carbon::now();
                                            $stock->type = 'out'; // Stock out
                                            $stock->stockIn = 0; // Quantity added to stock
                                            $stock->stockOut = $value2['quantity'] * $prod_detail['quantity']; // No stock out in this case
                                            $stock->total = $value2['price'] *  $value2['quantity'] * $prod_detail['quantity']; // No stock out in this case
                                            $stock->stock_type = 'DL'; // stock type case
                                            $stock->save();

                                            // $total_cost += $value2['price'] *  $value2['quantity'] * $prod_detail['quantity'];

                                            // $product_warehouse = product_warehouse::where('warehouse_id', $order->warehouse_id)
                                            //     ->where('product_id', $value2['product_id'])
                                            //     ->first();

                                            //     $unit2 = Unit::where('id', $value2->product['unit_sale_id'])
                                            //     ->first();


                                            // if ($unit && $product_warehouse) {
                                            //     if ($unit->operator == '/') {
                                            //         $product_warehouse->qte -= $value2['quantity'] * $prod_detail['quantity'] / $unit2->operator_value;
                                            //     } else {
                                            //         $product_warehouse->qte -= $value2['quantity'] * $prod_detail['quantity'] * $unit2->operator_value;
                                            //     }
                                            //     $product_warehouse->save();
                                            // }

                                            $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                            ->where('warehouse_id', $request->warehouse_id)
                                            ->where('product_id', $value2['product_id'])
                                            ->first();

                                            $unit2 = Unit::where('id', $value2->product['unit_sale_id'])
                                                ->first();


                                            if ($product_warehouse && $unit_prod) {
                                                if ($unit_prod->operator == '/') {
                                                    $product_warehouse->qte -= $value2['quantity'] *  $prod_detail['quantity'] / $unit2->operator_value;
                                                } else {
                                                    $product_warehouse->qte -= $value2['quantity'] *  $prod_detail['quantity'] * $unit2->operator_value;
                                                }
                                                $product_warehouse->save();
                                            }


                                        }




                                        $stock = new StockMaintenance;
                                        $stock->warehouse_id = $current_Sale->warehouse_id;
                                        $stock->product_id = $prod_detail['product_id'];
                                        $stock->purchased_id = $id;
                                        $stock->unit_id = $prod_detail['sale_unit_id'];
                                        $stock->unit_price = $prod_detail['Unit_price'];
                                        $stock->date = $request['date'];//$current_Sale->date;
                                        $stock->type = 'in'; // Stock out
                                        $stock->stockIn =  $prod_detail['quantity']; // Quantity added to stock
                                        $stock->stockOut =  0;// No stock out in this case
                                        $stock->total =  $prod_detail['subtotal']; // No stock out in this case
                                        $stock->stock_type = 'DP'; // stock type case
                                        $stock->save();

                                        $stock = new StockMaintenance;
                                        $stock->warehouse_id = $current_Sale->warehouse_id;
                                        $stock->product_id = $prod_detail['product_id'];
                                        $stock->purchased_id = $id;
                                        $stock->unit_id = $prod_detail['sale_unit_id'];
                                        $stock->unit_price = $prod_detail['Unit_price'];
                                        $stock->date = $request['date'];//$current_Sale->date;
                                        $stock->type = 'out'; // Stock out
                                        $stock->stockIn = 0; // Quantity added to stock
                                        $stock->stockOut = $prod_detail['quantity']; // No stock out in this case
                                        $stock->total =  $prod_detail['subtotal'];
                                        $stock->stock_type = 'SL'; // stock type case
                                        $stock->save();

                                    }
                                    else{

                                        $stock = new StockMaintenance;
                                        $stock->warehouse_id = $current_Sale->warehouse_id;
                                        $stock->product_id = $prod_detail['product_id'];
                                        $stock->purchased_id = $id;
                                        $stock->unit_id = $prod_detail['sale_unit_id'];
                                        $stock->unit_price = $prod_detail['Unit_price'];
                                        $stock->date = $request['date'];//$current_Sale->date;
                                        $stock->type = 'out'; // Stock out
                                        $stock->stockIn = 0; // Quantity added to stock
                                        $stock->stockOut = $prod_detail['quantity']; // No stock out in this case
                                        $stock->total = $prod_detail['subtotal']; // No stock out in this case
                                        $stock->stock_type = 'SL'; // stock type case
                                        $stock->save();

                                        // $total_cost += $prod_detail['Unit_cost'] *  $prod_detail['quantity'];

                                        $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                        ->where('warehouse_id', $request->warehouse_id)
                                        ->where('product_id', $prod_detail['product_id'])
                                        ->first();

                                        if ($product_warehouse && $unit_prod) {
                                            if ($unit_prod->operator == '/') {
                                                $product_warehouse->qte -= $prod_detail['quantity'] / $unit_prod->operator_value;
                                            } else {
                                                $product_warehouse->qte -= $prod_detail['quantity'] * $unit_prod->operator_value;
                                            }
                                            $product_warehouse->save();
                                        }

                                    }



                                    // $product_warehouse = product_warehouse::where('deleted_at', '=', null)
                                    //     ->where('warehouse_id', $request->warehouse_id)
                                    //     ->where('product_id', $prod_detail['product_id'])
                                    //     ->first();

                                    // if ($product_warehouse && $unit_prod) {
                                    //     if ($unit_prod->operator == '/') {
                                    //         $product_warehouse->qte -= $prod_detail['quantity'] / $unit_prod->operator_value;
                                    //     } else {
                                    //         $product_warehouse->qte -= $prod_detail['quantity'] * $unit_prod->operator_value;
                                    //     }
                                    //     $product_warehouse->save();
                                    // }
                                }

                            // }


                            // disabled
                            // $stock = new StockMaintenance;
                            // $stock->warehouse_id = $current_Sale->warehouse_id;
                            // $stock->product_id = $prod_detail['product_id'];
                            // $stock->purchased_id = $id;
                            // $stock->unit_id = $prod_detail['sale_unit_id'];
                            // $stock->unit_price = $prod_detail['Unit_price'];
                            // $stock->date = $request['date'];//$current_Sale->date;
                            // $stock->type = 'out'; // Stock out
                            // $stock->stockIn = 0; // Quantity added to stock
                            // $stock->stockOut = $prod_detail['quantity']; // No stock out in this case
                            // $stock->total = $prod_detail['subtotal']; // No stock out in this case
                            // $stock->stock_type = 'SL'; // stock type case
                            // $stock->save();


                            $total_cost += $prod_detail['Unit_price'] *  $prod_detail['quantity'];


                            $orderDetails['sale_id']      = $id;
                            $orderDetails['date']         = $request['date'];
                            $orderDetails['price']        = $prod_detail['Unit_price'];
                            $orderDetails['sale_unit_id'] = $prod_detail['sale_unit_id'];
                            $orderDetails['TaxNet']       = $prod_detail['tax_percent'];
                            $orderDetails['tax_method']   = $prod_detail['tax_method'];
                            $orderDetails['discount']     = $prod_detail['discount'];
                            $orderDetails['discount_method'] = $prod_detail['discount_Method'];
                            $orderDetails['quantity']        = $prod_detail['quantity'];
                            $orderDetails['product_id']      = $prod_detail['product_id'];
                            $orderDetails['product_variant_id'] = $prod_detail['product_variant_id'];
                            $orderDetails['total']              = $prod_detail['subtotal'];
                            $orderDetails['imei_number']        = $prod_detail['imei_number'];


                            // print_r($old_products_kot_essentials);
                            $orderDetails['prepared_quantity'] = 0; // default
                            foreach ($old_products_kot_essentials as $item) {
                                if ($item['id'] == $prod_detail['product_id']) {
                                    $orderDetails['prepared_quantity'] = $item['qty'];
                                    // break; // Stop after first match
                                }
                            }




                            if (empty($prod_detail['id']) || !in_array($prod_detail['id'], $old_products_id)) {
                                // Insert logic
                                $orderDetails['date'] = Carbon::now();
                                $orderDetails['sale_unit_id'] = $unit_prod ? $unit_prod->id : null;
                                SaleDetail::create($orderDetails);
                            } else {
                                // Update logic
                                SaleDetail::where('id', $prod_detail['id'])->update($orderDetails);
                            }






                            // if (!in_array($prod_detail['id'], $old_products_id)) {
                            //     $orderDetails['date'] = Carbon::now();
                            //     $orderDetails['sale_unit_id'] = $unit_prod ? $unit_prod->id : Null;
                            //     SaleDetail::Create($orderDetails);
                            // } else {
                            //     SaleDetail::where('id', $prod_detail['id'])->update($orderDetails);
                            // })



                            $prep_qty = SaleDetail::where('sale_id', '=', $id)
                            ->where('product_id', $prod_detail['product_id'])
                            ->first();

                            if($prep_qty->prepared_quantity < $prod_detail['quantity']){

                                // $current_Sale->update([
                                //     'preparation'         => 'completed',
                                // ]);
                            }

                        }
                    }

                    $due = $request['GrandTotal'] - $current_Sale->paid_amount;
                    if ($due === 0.0 || $due < 0.0) {
                        $payment_statut = 'paid';
                    } else if ($due != $request['GrandTotal']) {
                        $payment_statut = 'partial';
                    } else if ($due == $request['GrandTotal']) {
                        $payment_statut = 'unpaid';
                    }

                    try {
                        $sale = $current_Sale;
                        $total_paid = $sale->paid_amount + $request['amount'];
                        $due = $sale->GrandTotal - $total_paid;

                        if ($due === 0.0 || $due < 0.0) {
                            $payment_statut = 'paid';
                        } else if ($due !== $sale->GrandTotal) {
                            $payment_statut = 'partial';
                        } else if ($due === $sale->GrandTotal) {
                            $payment_statut = 'unpaid';
                        }

                        if($request['amount'] > 0){
                            if ($request['Reglement'] == 'credit card') {
                                // Check if member is excluded from online payments
                                $member = Member::where('id', $sale->client_id)->first();
                                if ($member && $member->exclude_from_online_payments) {
                                    return response()->json([
                                        'success' => false,
                                        'message' => 'This member is excluded from online payments. Please use an offline payment method.',
                                        'code' => 'EXCLUDED_FROM_ONLINE_PAYMENTS'
                                    ], 422);
                                }
                                
                                $member = Member::whereId($sale->client_id)->first();
                                Stripe\Stripe::setApiKey(config('app.STRIPE_SECRET'));

                                // Check if the payment record exists
                                $PaymentWithCreditCard = PaymentWithCreditCard::where('customer_id', $sale->client_id)->first();
                                if (!$PaymentWithCreditCard && $member) {

                                    // Create a new customer and charge the customer with a new credit card
                                    $customer = \Stripe\Customer::create([
                                        'source' => $request->token,
                                        'email'  => $member->email ?? '',
                                        'name'   => $member->name ?? '',
                                    ]);

                                    // Charge the Customer instead of the card:
                                    $charge = \Stripe\Charge::create([
                                        'amount'   => $request['amount'] * 100,
                                        'currency' => 'usd',
                                        'customer' => $customer->id,
                                    ]);
                                    $PaymentCard['customer_stripe_id'] = $customer->id;

                                // Check if the payment record not exists
                                } else {

                                     // Retrieve the customer ID and card ID
                                    $customer_id = $PaymentWithCreditCard->customer_stripe_id;
                                    $card_id = $request->card_id;

                                    // Charge the customer with the new credit card or the selected card
                                    if ($request->is_new_credit_card || $request->is_new_credit_card == 'true' || $request->is_new_credit_card === 1) {
                                        // Retrieve the customer
                                        $customer = \Stripe\Customer::retrieve($customer_id);

                                        // Create New Source
                                        $card = \Stripe\Customer::createSource(
                                            $customer_id,
                                            [
                                              'source' => $request->token,
                                            ]
                                          );

                                        $charge = \Stripe\Charge::create([
                                            'amount'   => $request['amount'] * 100,
                                            'currency' => 'usd',
                                            'customer' => $customer_id,
                                            'source'   => $card->id,
                                        ]);
                                        $PaymentCard['customer_stripe_id'] = $customer_id;

                                    } else {
                                        $charge = \Stripe\Charge::create([
                                            'amount'   => $request['amount'] * 100,
                                            'currency' => 'usd',
                                            'customer' => $customer_id,
                                            'source'   => $card_id,
                                        ]);
                                        $PaymentCard['customer_stripe_id'] = $customer_id;
                                    }
                                }


                                $PaymentSale            = new PaymentSale();
                                $PaymentSale->sale_id   = $sale->id;
                                $PaymentSale->Ref       = app('App\Http\Controllers\PaymentSalesController')->getNumberOrder();
                                $PaymentSale->date      = $request->date;//Carbon::now();
                                $PaymentSale->Reglement = $request->payment['Reglement'];
                                $PaymentSale->montant   = $request['amount'];
                                $PaymentSale->change    = $request['change'];
                                $PaymentSale->notes     = $request->payment['notes'];
                                $PaymentSale->user_id   = Auth::user()->id;
                                $PaymentSale->save();

                                $sale->update([
                                    'paid_amount'    => $total_paid,
                                    'payment_statut' => $payment_statut,
                                ]);

                                $PaymentCard['customer_id'] = $sale->client_id;
                                $PaymentCard['payment_id']  = $PaymentSale->id;
                                $PaymentCard['charge_id']   = $charge->id;
                                PaymentWithCreditCard::create($PaymentCard);

                                // Paying Method Cash
                            } else {

                                $PaymentSale =PaymentSale::create([
                                    'sale_id'   => $sale->id,
                                    'Ref'       => app('App\Http\Controllers\PaymentSalesController')->getNumberOrder(),
                                    'date'      => Carbon::now(),
                                    'Reglement' => $request->payment['Reglement'],
                                    'montant'   => $request['amount'],
                                    'change'    => $request['change'],
                                    'notes'     => $request->payment['notes'],
                                    'user_id'   => Auth::user()->id,
                                ]);

                                $sale->update([
                                    'paid_amount'    => $total_paid,
                                    'payment_statut' => $payment_statut,
                                ]);
                            }
                            // $account_id_dr = $request->payment['Reglement'];
                            // $account_id_cr = 1103; // Acounts Payable

                            $account_id_dr = $request->payment['Reglement'];
                            $account_id_cr = AccountCodes::CUSTOMER_ACCOUNTS_RECEIVABLE;



                            $AccountsLedger = new AccountsLedger;
                            $AccountsLedger = AccountsLedger::where('voucher_number', $PaymentSale->id)
                            ->where('voucher_type', 'RCV')
                            ->delete();


                            $this->ledgerService->createLedgerEntry(
                                $PaymentSale->id,
                                'RCV', // Assuming you have this method
                                $account_id_dr,
                                $request['amount'],
                                0,
                                'Sale Payment Transaction',
                                $sale->id,
                                $request['date']
                            );


                            $this->ledgerService->createLedgerEntry(
                                $PaymentSale->id,
                                'RCV',
                                $account_id_cr,
                                0,
                                $request['amount'],
                                'Sale Payment Transaction',
                                $sale->id,
                                $request['date']
                            );
                        }

                    } catch (Exception $e) {
                        return response()->json(['message' => $e->getMessage()], 500);
                    }

                    $statut = $request['statut'];





                    // ResturantTable::whereId($current_Sale->table_id)->update([
                    //     // 'client_id' => $request['client_id'],
                    //     'assigned' => 0,
                    // ]);

                    // ResturantTable::whereIn('id',  [$current_Sale->extratables])->update([
                    //     'assigned' => 0,
                    // ]);

                    // ResturantTable::whereId($request['table_id'])->update([
                    //     // 'client_id' => $request['client_id'],
                    //     'assigned' => 1,
                    // ]);
                    // ResturantTable::whereIn('id', (array) $request->extratables)->update([
                    //     'assigned' => 1,
                    // ]);

                    // if ($payment_statut == 'paid' && $current_Sale['preparation'] == 'completed') {

                    //     $statut = 'completed';

                    //     ResturantTable::whereId($request['table_id'])->update([
                    //         // 'client_id' => $request['client_id'],
                    //         'assigned' => 0,
                    //     ]);

                    //     ResturantTable::whereIn('id', (array) $request->extratables)->update([
                    //         'assigned' => 0,
                    //     ]);


                    // }
                    if ($current_Sale->table_id && ResturantTable::whereId($current_Sale->table_id)->exists()) {
                        ResturantTable::whereId($current_Sale->table_id)->update([
                            'assigned' => 0,
                        ]);
                    }

                    if (!empty($current_Sale->extratables)) {
                        ResturantTable::whereIn('id', (array) $current_Sale->extratables)->update([
                            'assigned' => 0,
                        ]);
                    }

                    if ($request->table_id && ResturantTable::whereId($request->table_id)->exists()) {
                        ResturantTable::whereId($request->table_id)->update([
                            'assigned' => 1,
                        ]);
                    }

                    if (!empty($request->extratables)) {
                        ResturantTable::whereIn('id', (array) $request->extratables)->update([
                            'assigned' => 1,
                        ]);
                    }

// && $current_Sale['preparation'] == 'completed'
                    if ($payment_statut == 'paid' ) {
                        $statut = 'completed';

                        if ($request->table_id && ResturantTable::whereId($request->table_id)->exists()) {
                            ResturantTable::whereId($request->table_id)->update([
                                'assigned' => 0,
                            ]);
                        }

                        if (!empty($request->extratables)) {
                            ResturantTable::whereIn('id', (array) $request->extratables)->update([
                                'assigned' => 0,
                            ]);
                        }
                    }








                    $current_Sale->update([
                        'date'         => $request['date'],
                        'client_id'    => $request['client_id'],
                        'warehouse_id' => $request['warehouse_id'],
                        'person_id'    => $request['person_id'],
                        'table_id'     => $request['table_id'],
                        'notes'        => $request['notes'],
                        'statut'       => $statut,
                        'orderType'    => $request['orderType'],

                        // 'extratables'    =>  1, //implode(',', $request->extratables),
                        'extratables' => !empty($request->extratables) ? implode(',', (array) $request->extratables) : null,


                        'tax_rate'     => $request['tax_rate'],
                        'TaxNet'       => $request['TaxNet'],
                        'discount'     => $request['discount'],
                        'shipping'     => $request['shipping'],
                        'GrandTotal'   => $request['GrandTotal'],
                        'payment_statut' => $payment_statut,
                    ]);

                    // table assign




                    $current_Sale = Sale::findOrFail($id);


                    $sale = $current_Sale;
                    $total_paid = $sale->paid_amount;
                    $due = $sale->GrandTotal - $total_paid;

                    // if ($due === 0.0 || $due < 0.0) {
                    //     $payment_statut = 'paid';
                    // } else if ($due !== $sale->GrandTotal) {
                    //     $payment_statut = 'partial';
                    // } else if ($due === $sale->GrandTotal) {
                    //     $payment_statut = 'unpaid';
                    // }

                    if ($due === 0.0 || $due < 0.0)  {
                        $payment_statut = 'paid';
                    } else if ($due != $current_Sale->GrandTotal) {
                        $payment_statut = 'partial';
                    } else if ($due == $current_Sale->GrandTotal) {
                        $payment_statut = 'unpaid';
                    }

                    $current_Sale->update([
                         'payment_statut' => $payment_statut,
                    ]);
                }

                        // $account_id_dr = 1103;
                    // $account_id_cr = 40011; // Acounts Payable
                    $account_id_dr = AccountCodes::CUSTOMER_ACCOUNTS_RECEIVABLE ;
                    $account_id_cr = AccountCodes::DINE_IN_FOOD_SALES;

                    $AccountsLedger = new AccountsLedger;
                    $AccountsLedger = AccountsLedger::where('voucher_number', $id)
                    ->where('voucher_type', 'SL')
                    ->delete();


                    $this->ledgerService->createLedgerEntry(
                        $id,
                        'SL', // Assuming you have this method
                        $account_id_dr,
                        $request['GrandTotal'],
                        0,
                        'Sale Transaction',
                        $id,
                        $request['date']
                    );


                    $this->ledgerService->createLedgerEntry(
                        $id,
                        'SL',
                        $account_id_cr,
                        0,
                        $request['GrandTotal'],
                        'Sale Transaction',
                        $id,
                        $request['date']
                    );

                    $AccountsLedger = new AccountsLedger;
                    // $AccountsLedger = AccountsLedger::where('voucher_number', $id)
                    // ->where('voucher_type', 'SL')
                    // ->delete();

                    // $account_id_dr = 5001;
                    // $account_id_cr = 11041; // Acounts Payable
                    $account_id_dr = AccountCodes::PURCHASES;
                    $account_id_cr = AccountCodes::RAW_MATERIAL;


                    $this->ledgerService->createLedgerEntry(
                        $id,
                        'SL', // Assuming you have this method
                        $account_id_dr,
                        $total_cost,
                        0,
                        'Sale Transaction',
                        $id,
                        $request['date']
                    );


                    $this->ledgerService->createLedgerEntry(
                        $id,
                        'SL',
                        $account_id_cr,
                        0,
                        $total_cost,
                        'Sale Transaction',
                        $id,
                        $request['date']
                    );


                    $current_Sale->update([
                        'NetCost'         => $total_cost,

                        'adresse' => $request['adresse']?? ''


                    ]);
            }, 10);

            // return response()->json(['success' => true]);

            return response()->json(['success' => true, 'id' => $id]);

        }


    }


    public function getCurrentUser()
    {
    return response()->json(['username' => auth()->user()->username]);
    }

    public function minusPackagingItem($warehouse_id,$product_id,$purchased_id,$unit_id,$date,$unit_price,$stockOut,$total,$orderType){



        $recipe_id = Product::where('id', $product_id)->pluck('recipe_id');

        $recipe_data = RecipeDetail::where('recipe_id', $recipe_id)->where($orderType, 1)->get();
        foreach ($recipe_data as $data1) {

                $stock = new StockMaintenance;
                $stock->warehouse_id = $warehouse_id;
                $stock->product_id = $data1->product_id;
                $stock->purchased_id = $purchased_id;
                $stock->unit_id = $unit_id;
                $stock->date = $date;//Carbon::now();
                $stock->unit_price = $data1->cost;
                $stock->type = 'out'; // Stock out
                $stock->stockIn = 0; // Quantity added to stock
                $stock->stockOut = $data1->quantity * $stockOut; // No stock out in this case
                $stock->total = $total; // No stock out in this case
                $stock->stock_type = 'SL'; // stock type case
                $stock->save();

        }

    }
    public function HoldPOS(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'Sales_pos', Sale::class);

            request()->validate([
                'client_id' => 'required',
                'warehouse_id' => 'required',
                'payment.amount' => 'required',
            ]);

             $item = \DB::transaction(function () use ($request) {
                $helpers = new helpers();
                // Role table dropped - set view_records to true (allow all records)
                // $role = Auth::user()->roles()->first();
                // $view_records = Role::findOrFail($role->id)->inRole('record_view');
                $view_records = true;
                $order = new Sale;
                $order->is_pos = 1;
                $order->date = $request->date;//Carbon::now();
                $order->Ref = app('App\Http\Controllers\SalesController')->getNumberOrder();
                $order->client_id = $request->client_id;
                $order->person_id = $request->person_id;
                $order->table_id = $request->table_id;
                $order->orderType = $request->orderType;
                $order->warehouse_id = $request->warehouse_id;
                $order->tax_rate = $request->tax_rate;
                $order->TaxNet = $request->TaxNet;
                $order->discount = $request->discount;
                $order->shipping = $request->shipping;
                $order->GrandTotal = $request->GrandTotal;
                $order->notes = $request->notes;
                $order->statut = 'hold';
                $order->payment_statut = 'unpaid';
                $order->user_id = Auth::user()->id;

                $order->save();

                $total_cost = 0;

                $data = $request['details'];
                foreach ($data as $key => $value) {


                $unit = Unit::where('id', $value['sale_unit_id'])
                    ->first();
                $orderDetails[] = [
                    'date' => Carbon::now(),
                    'sale_id' => $order->id,
                    'sale_unit_id' =>  $value['sale_unit_id'],
                    'quantity' => $value['quantity'],
                    'product_id' => $value['product_id'],
                    'product_variant_id' => $value['product_variant_id'],
                    'total' => $value['subtotal'],
                    'price' => $value['Unit_price'],
                    'TaxNet' => $value['tax_percent'],
                    'tax_method' => $value['tax_method'],
                    'discount' => $value['discount'],
                    'discount_method' => $value['discount_Method'],
                    'imei_number' => $value['imei_number'],
                ];


                }

                SaleDetail::insert($orderDetails);

                $sale = Sale::findOrFail($order->id);
                // Check If User Has Permission view All Records
                if (!$view_records) {
                    // Check If User->id === sale->id
                    $this->authorizeForUser($request->user('api'), 'check_record', $sale);
                }


            $sale->update([
                'NetCost'         => $total_cost
            ]);

                return $order->id;


            }, 10);

            return response()->json(['success' => true, 'id' => $item]);

    }

    public function feedback(Request $request)
    {

        $id = $request->sale_id;
        $this->authorizeForUser($request->user('api'), 'update', Sale::class);

                $current_Sale = Sale::findOrFail($id);

                $current_Sale->update([

                    'notes'        => $request['notes'],

                ]);



            return response()->json(['success' => true, 'id' => $id]);


    }

    public function index(request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', Sale::class);
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
            1 => 'like',
            2 => '=',
            3 => 'like',
            4 => '=',
            5 => '=',
            6 => 'like',
        );
        $columns = array(
            0 => 'Ref',
            1 => 'statut',
            2 => 'client_id',
            3 => 'payment_statut',
            4 => 'warehouse_id',
            5 => 'date',
            6 => 'shipping_status',
        );
        $data = array();

        // Check If User Has Permission View  All Records
        $Sales = Sale::with('facture', 'warehouse','user')
            ->where('deleted_at', '=', null)
            ->where('statut', '!=', "completed")
            ->where(function ($query) use ($view_records) {
                if (!$view_records) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            });
        //Multiple Filter
        $Filtred = $helpers->filter($Sales, $columns, $param, $request)
        // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere('GrandTotal', $request->search)
                        ->orWhere('payment_statut', 'like', "%{$request->search}%")
                        ->orWhere('shipping_status', 'like', "%{$request->search}%")
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $Filtred->count();
        if($perPage == "-1"){
            $perPage = $totalRows;
        }

        $Sales = $Filtred->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        foreach ($Sales as $Sale) {

            $item['id'] = $Sale['id'];
            $item['date'] = $Sale['date'];
            $item['Ref'] = $Sale['Ref'];
            $item['created_by'] = $Sale['user']->username;
            $item['time'] = $Sale['created_at']->format('H:i:s');
            $item['updated_at'] = $Sale['updated_at'];
            $item['statut'] = $Sale['statut'];
            $item['preparation'] = $Sale['preparation'];
            $item['shipping_status'] =  $Sale['shipping_status'];
            $item['discount'] = $Sale['discount'];
            $item['shipping'] = $Sale['shipping'];
            $item['warehouse_name'] = $Sale['warehouse']['name'];
            $item['client_id'] = $Sale->client_id ?? null;
            $item['client_name'] = '';
            $item['client_email'] = '';
            $item['client_tele'] = '';
            $item['client_code'] = '';
            $item['client_adr'] = '';
            $item['GrandTotal'] = number_format($Sale['GrandTotal'], 2, '.', '');
            $item['paid_amount'] = number_format($Sale['paid_amount'], 2, '.', '');
            $item['due'] = number_format($item['GrandTotal'] - $item['paid_amount'], 2, '.', '');
            $item['payment_status'] = $Sale['payment_statut'];

            if (SaleReturn::where('sale_id', $Sale['id'])->where('deleted_at', '=', null)->exists()) {
                $sellReturn = SaleReturn::where('sale_id', $Sale['id'])->where('deleted_at', '=', null)->first();
                $item['salereturn_id'] = $sellReturn->id;
                $item['sale_has_return'] = 'yes';
            }else{
                $item['sale_has_return'] = 'no';
            }

            $data[] = $item;
        }

        $stripe_key = config('app.STRIPE_KEY');
        $customers = Member::where('deleted_at', '=', null)->get(['id', 'name']);

       //get warehouses assigned to user
       $user_auth = auth()->user();
       if($user_auth->is_all_warehouses){
           $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
       }else{
           $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
           $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
       }

        return response()->json([
            'stripe_key' => $stripe_key,
            'totalRows' => $totalRows,
            'sales' => $data,
            'customers' => $customers,
            'warehouses' => $warehouses,
        ]);
    }
    public function openCounter(Request $request)
    {
        $validatedData = $request->validate([
            'open_amount' => 'required|numeric|min:0',
            'open_account_number' => 'required',
        ]);

        // Check if a counter session is already open
        $existingCounter = Counter::whereNull('close_counter_time')->first();
        if ($existingCounter) {
            return response()->json([
                'status' => 'error',
                'message' => 'A counter session is already open.',
            ], 400);
        }

        // Open a new counter session
        $counter = Counter::create([
            'session_date' => date('Y-m-d H:i:s'),
            'open_counter_time' => now(),
            'open_user_id' => auth()->id(),
            'open_amount' => $validatedData['open_amount'],
            'open_account_number' => $validatedData['open_account_number'],
        ]);

        $reset_table = DB::table('restaurant_tables')->update(['assigned' => 0]);

        return response()->json([
            'status' => 'success',
            'message' => 'Counter opened successfully.',
            'data' => $counter,
        ]);
    }
    public function getCounterReport($id)
    {
        try {
            // Find the counter by ID
            $counter = Counter::findOrFail($id);


            $formattedCounter = [
                'id' => $counter->id,
                'name' => $counter->name,
                'open_amount' =>  $counter->open_amount,
                'open_counter_time' => Carbon::parse($counter->open_counter_time)->format('Y-m-d\TH:i'),
                'close_counter_time' => Carbon::parse($counter->close_counter_time)->format('Y-m-d\TH:i'),
                // Include other fields as needed
            ];

            return response()->json([
                'success' => true,
                'data' => $formattedCounter,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Counter not found',
            ], 404);
        }
    }

    public function getAllCounters()
    {
        $counters = Counter::all(); // Fetch all counters
        return response()->json([
            'status' => 'success',
            'data' => $counters,
        ]);
    }

    public function closeCounter(Request $request)
    {
        $validatedData = $request->validate([
            'close_amount' => 'required|numeric|min:0',
            'close_account_number' => 'required'
        ]);

        // Fetch the open counter session
        $counter = Counter::whereNull('close_counter_time')->first();
        if (!$counter) {
            return response()->json([
                'status' => 'error',
                'message' => 'No open counter session found.',
            ], 400);
        }

        // Close the session
        $counter->update([
            'close_counter_time' => now(),
            'close_user_id' => auth()->id(),
            'close_amount' => $validatedData['close_amount'],
            'close_account_number' => $validatedData['close_account_number'],
        ]);

        // Calculate session duration
        $duration = $counter->open_counter_time->diff(now());

        return response()->json([
            'status' => 'success',
            'message' => 'Counter closed successfully.',
            'data' => [
                'session_duration' => $duration->format('%h hours, %i minutes'),
                'counter' => $counter,
            ],
        ]);
    }


    public function getCounterDetails()
    {
        $counter = Counter::whereNull('close_counter_time')->first();

        return response()->json([
            'status' => 'success',
            'counter' => $counter,
        ]);
    }



    public function checkCounterStatus()
    {
        $counter = Counter::select('counters.*', DB::raw("concat(users.firstname, ' ', users.lastname) as username"))
        ->leftJoin('users', 'users.id', '=', 'counters.open_user_id')
        ->whereNull('close_counter_time')
        ->orderByDesc('counters.close_counter_time')
        ->first();

        return response()->json([
            'open' => $counter !== null,
            'counter' => $counter, // True if a session exists and is open
        ]);
    }
    //------------ Get Products--------------\\

    public function GetProductsByParametre(request $request)
    {

        if (isset($request->date)) {

            $filter_date = $request->date;
        }else{
            $filter_date = Carbon::now();
        }



        //pos old
        $this->authorizeForUser($request->user('api'), 'Sales_pos', Sale::class);
        // How many items do you want to display.
        $perPage = 15;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $data = array();

        // use Illuminate\Support\Facades\DB;
        $category_id = $request->category_id ?? 0;
        $date = '2025-04-22';
        $warehouseId = $request->warehouse_id;
        $filter_date = $date; // Alias if needed below
        // $data = [];
       
        // Query for regular products
            $product_warehouse_data = DB::table('products as p')
            ->leftJoin('units as us', 'p.unit_sale_id', '=', 'us.id')
            ->leftJoin('stock_maintenance as sm', function ($join) use ($warehouseId, $date) {
                $join->on('sm.product_id', '=', 'p.id')
                    ->where('sm.warehouse_id', '=', $warehouseId)
                    ->where('sm.date', '<=', $date)
                    ->whereNull('sm.deleted_at');
            })
            ->where('p.not_selling', '=', 0)
            // ->where('p.type', '!=', 'is_combo')
            ->whereNull('p.deleted_at')
            ->when($request->filled('category_id'), function ($query) use ($request,$category_id) {
                if ($category_id === 'deal') {
                    return $query->where('p.type', '=', 'is_combo');
                }
            })
            ->select(
                'p.*',
                'us.name as unit_name',
                DB::raw('COALESCE(SUM(sm.stockIn - sm.StockOut), 0) as balance')
            )
            ->groupBy('p.id', 'us.name')
            ->orderBy('p.name')
            ->get();
        
        $totalRows = $product_warehouse_data->count();
        
        foreach ($product_warehouse_data as $product_warehouse) {


          



            $RStock = $product_warehouse->balance ?? 0;
            $product = Product::with('unitSale')->find($product_warehouse->id);
        
            $item = [];



            

            // $product_warehouse->is_variant = null;
            
            
        
                
            
            if ($product_warehouse->is_variant) {


                    $varient_ids = product_warehouse::where('product_id', $product_warehouse->id)
                                ->where('warehouse_id', $warehouseId)
                                ->pluck('product_variant_id')
                                ->toArray();

                
                    foreach ( $varient_ids as $variant_id) {
                        $variant = ProductVariant::find($variant_id);
                        // $variant = ProductVariant::where('id', $variant_id)
                        // ->whereNull('deleted_at')
                        // ->first();

                        $item['product_variant_id'] = $variant->id ?? null;
                        $item['Variant'] = '[' . ($variant->name ?? '') . ']' . ($product->name ?? '');
                        $item['name'] = '[' . ($variant->name ?? '') . ']' . ($product->name ?? '');
                        $item['code'] = $variant->code ?? '';
                        $item['barcode'] = $variant->code ?? '';
                        $product_price = $variant->price ?? 0;

                        $item['id'] = $product_warehouse->id;
                            $images = explode(',', $product->image ?? '');
                            $item['image'] = $images[0] ?? '';
                        
                            if ($product->unitSale) {
                                if ($product->unitSale->operator == '/') {
                                    $item['qte_sale'] = $RStock * $product->unitSale->operator_value;
                                    $price = $product_price / $product->unitSale->operator_value;
                                } else {
                                    $item['qte_sale'] = $RStock / $product->unitSale->operator_value;
                                    $price = $product_price * $product->unitSale->operator_value;
                                }
                            } else {
                                $item['qte_sale'] = $product->type != 'is_service' ? $RStock : '---';
                                $price = $product_price;
                            }
                        
                            $item['unitSale'] = $product->unitSale->ShortName ?? '';
                
                            if($product_warehouse->type  == 'is_combo'){
                
                                $item['qte'] = $this->comboProduct($request->category_id ,$warehouseId,$filter_date,$product->id);
                
                            }else{
                            $item['qte'] = $product->type != 'is_service' ? $RStock : '---';
                            }
                            $item['product_type'] = $product->type;
                        
                            if ($product->TaxNet != 0.0) {
                                if ($product->tax_method == '1') {
                                    $item['Net_price'] = $price + ($price * $product->TaxNet / 100);
                                } else {
                                    $item['Net_price'] = $price;
                                }
                            } else {
                                $item['Net_price'] = $price;
                            }
                        
                            $item['recipe_ids'] = [0, 3, 4, 5];
                            $item['recipe_quantity'] = [0, 3, 4, 5];
                
                
                
                            $item['image'] = 'no-image.png';

                            $data[] = $item;


                    }

                       
               
                
            } else              {


                    $item['product_variant_id'] = null;
                    $item['Variant'] = null;
                    $item['code'] = $product->code ?? '';
                    $item['name'] = $product->name ?? '';
                    $item['barcode'] = $product->code ?? '';
                    $product_price = $product->price ?? 0;

                            $item['id'] = $product_warehouse->id;
                            $images = explode(',', $product->image ?? '');
                            $item['image'] = $images[0] ?? '';
                        
                            if ($product->unitSale) {
                                if ($product->unitSale->operator == '/') {
                                    $item['qte_sale'] = $RStock * $product->unitSale->operator_value;
                                    $price = $product_price / $product->unitSale->operator_value;
                                } else {
                                    $item['qte_sale'] = $RStock / $product->unitSale->operator_value;
                                    $price = $product_price * $product->unitSale->operator_value;
                                }
                            } else {
                                $item['qte_sale'] = $product->type != 'is_service' ? $RStock : '---';
                                $price = $product_price;
                            }
                        
                            $item['unitSale'] = $product->unitSale->ShortName ?? '';
                
                            if($product_warehouse->type  == 'is_combo'){
                
                                $item['qte'] = $this->comboProduct($request->category_id ,$warehouseId,$filter_date,$product->id);
                
                            }else{
                            $item['qte'] = $product->type != 'is_service' ? $RStock : '---';
                            }
                            $item['product_type'] = $product->type;
                        
                            if ($product->TaxNet != 0.0) {
                                if ($product->tax_method == '1') {
                                    $item['Net_price'] = $price + ($price * $product->TaxNet / 100);
                                } else {
                                    $item['Net_price'] = $price;
                                }
                            } else {
                                $item['Net_price'] = $price;
                            }
                        
                            $item['recipe_ids'] = [0, 3, 4, 5];
                            $item['recipe_quantity'] = [0, 3, 4, 5];
                
                
                
                            $item['image'] = 'no-image.png';

                            $data[] = $item;

            }
        
           
        



            
        }
        
        
      
        
        return response()->json([
            'products' => $data,
            'totalRows' => $totalRows,
        ]);
        
    }



    public function comboProduct($category_id, $warehouseId, $filter_date, $productId)
    {
        $results = DB::table('combined_products as cp')
            ->leftjoin('stock_maintenance as sm', 'cp.combined_product_id', '=', 'sm.product_id')
            ->select(
                'cp.combined_product_id',
                'cp.quantity',
                DB::raw('SUM(sm.stockIn - sm.stockOut) as remainingStock')
            )
            ->where('cp.product_id', $productId)
            ->where('sm.warehouse_id', $warehouseId)
            ->where('sm.date', '<=', $filter_date)
            ->whereNull('sm.deleted_at')
            ->groupBy('cp.combined_product_id', 'cp.quantity')
            ->get();
    
        // Now calculate the adjusted stock for each combined product
        $adjustedStocks = [];
        foreach ($results as $row) {
            $requiredQty = $row->quantity;
            $availableStock = $row->remainingStock;
            $adjustedStocks[$row->combined_product_id] = floor($availableStock / $requiredQty);
        }
    
        // Get the minimum available across all components
        $lowestStock = count($adjustedStocks) > 0 ? min($adjustedStocks) : 0;
    
        return $lowestStock;
    }
    public function GetProductsByParametre2(request $request)
    {

        if (isset($request->date)) {

            $filter_date = $request->date;
        }else{
            $filter_date = Carbon::now();
        }



        //pos old
        $this->authorizeForUser($request->user('api'), 'Sales_pos', Sale::class);
        // How many items do you want to display.
        $perPage = 15;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $data = array();

        $product_warehouse_data = product_warehouse::where('warehouse_id', $request->warehouse_id)

            ->with('product', 'product.unitSale')
            ->where('deleted_at', '=', null)
            ->where(function ($query) use ($request) {
                return $query->whereHas('product', function ($q) use ($request) {
                    $q->where('not_selling', '=', 0);
                    $q->where('type', '!=', 'is_combo');
                    $q->where('deleted_at', '=', null);
                })

                // ->where(function ($query) use ($request) {
                //     if ($request->stock == '1' && $request->product_service == '1') {
                //         return $query->where('qte', '>', 0)->orWhere('manage_stock', false);

                //     }elseif($request->stock == '1' && $request->product_service == '0') {
                //         return $query->where('qte', '>', 0)->orWhere('manage_stock', true);

                //     }else{
                //         return $query->where('manage_stock', true);
                //     }
                // })

                ;
            })

        // Filter
        ->where(function ($query) use ($request) {
            return $query->when($request->filled('category_id'), function ($query) use ($request) {
                if ($request->category_id === 'deal') {
                    // If 'category_id' is 'deal', filter by 'type' with 'is_combo'
                    return $query->whereHas('product', function ($q) {
                        $q->where('type', '=', 'is_combo');
                    });
                }
            });
        });

        $totalRows = $product_warehouse_data->count();

        $product_warehouse_data = $product_warehouse_data
            // ->offset($offSet)
            // ->limit(15)
            ->get();

        foreach ($product_warehouse_data as $product_warehouse) {




            $remainingStock = DB::table('stock_maintenance')
            ->selectRaw('SUM(stockIn - StockOut) as remainingStock')
            ->where('product_id', $product_warehouse->product_id)
            ->where('warehouse_id', $request->warehouse_id)
            ->where('date', '<=', $filter_date)
            ->whereNull('deleted_at')
            ->value('remainingStock'); // Fetch only the calculated value

            $RStock = $remainingStock ?? 0;
            // if($RStock > 0){
                // if($RStock){

            if ($product_warehouse->product_variant_id) {
                $productsVariants = ProductVariant::where('product_id', $product_warehouse->product_id)
                    ->where('id', $product_warehouse->product_variant_id)
                    ->where('deleted_at', null)
                    ->first();

                $item['product_variant_id'] = $product_warehouse->product_variant_id;
                $item['Variant'] = '['.$productsVariants->name . ']' . $product_warehouse['product']->name;
                $item['name'] = '['.$productsVariants->name . ']' . $product_warehouse['product']->name;

                $item['code'] = $productsVariants->code;
                $item['barcode'] = $productsVariants->code;

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
            $firstimage = explode(',', $product_warehouse['product']->image);
            $item['image'] = $firstimage[0];

            if($product_warehouse['product']['unitSale']){

                if ($product_warehouse['product']['unitSale']->operator == '/') {
                    $item['qte_sale'] = $RStock * $product_warehouse['product']['unitSale']->operator_value;
                    $price = $product_price / $product_warehouse['product']['unitSale']->operator_value;

                } else {
                    $item['qte_sale'] = $RStock / $product_warehouse['product']['unitSale']->operator_value;
                    $price = $product_price * $product_warehouse['product']['unitSale']->operator_value;

                }

            }else{
                $item['qte_sale'] = $product_warehouse['product']->type!='is_service'? $RStock :'---';
                $price = $product_price;
            }

            $item['unitSale'] = $product_warehouse['product']['unitSale']?$product_warehouse['product']['unitSale']->ShortName:'';
            $item['qte'] = $product_warehouse['product']->type!='is_service' ? $RStock :'---';

            $item['product_type'] = $product_warehouse['product']->type;

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
            $item['recipe_ids'] = [0,3,4,5];
            $item['recipe_quantity'] = [0,3,4,5];




            $item['image'] = 'no-image.png';
            $data[] = $item;
        // }
        }


        $product_warehouse_data = Product::where('not_selling', '=', 0)
            ->where('type', '=', 'is_combo')
            ->with( 'unitSale')
            ->where('deleted_at', '=', null)


        // Filter
        ->where(function ($query) use ($request) {
            return $query->when($request->filled('category_id'), function ($query) use ($request) {
                // Check if the category_id is 'deal'
                if ($request->category_id === 'deal') {
                    return $query->where('type', '=', 'is_combo');
                } else {
                    // Regular category filter
                    return $query->where('category_id', '=', $request->category_id);
                }
            });
        })

        );


        $totalRows += $product_warehouse_data->count();

        $product_warehouse_data = $product_warehouse_data
        // ->offset($offSet)
        // ->limit(15)

            ->get();

        foreach ($product_warehouse_data as $product_warehouse) {
            $qte_combo = [];
            $RStock2 = 0 ;
            // $cps = CombinedProduct::where('product_id', $product_warehouse->id)->get();
            // $combinedProductIds = $cps->pluck('combined_product_id')->toArray();
            // $quantities = $cps->pluck('quantity')->toArray();

            // $lowestStock = DB::table('stock_maintenance')
            // ->selectRaw('product_id, SUM(stockIn - stockOut) as remainingStock')
            // ->whereIn('product_id', $combinedProductIds)
            // ->where('warehouse_id', $request->warehouse_id)
            // ->where('date', '<=', $filter_date)
            // ->whereNull('deleted_at')
            // ->groupBy('product_id')
            // ->orderBy('remainingStock', 'asc')
            // ->value('remainingStock');
            $cps = CombinedProduct::where('product_id', $product_warehouse->id)->get();
            $combinedProductIds = $cps->pluck('combined_product_id')->toArray();
            $quantities = $cps->pluck('quantity', 'combined_product_id')->toArray(); // Key-value pair of product ID and quantity

            // Retrieve remaining stocks for the combined products
            $stocks = DB::table('stock_maintenance')
                ->selectRaw('product_id, SUM(stockIn - stockOut) as remainingStock')
                ->whereIn('product_id', $combinedProductIds)
                ->where('warehouse_id', $request->warehouse_id)
                ->where('date', '<=', $filter_date)
                ->whereNull('deleted_at')
                ->groupBy('product_id')
                ->pluck('remainingStock', 'product_id'); // Key-value pair of product ID and remaining stock

            // Calculate the adjusted remaining stock based on the deal quantities
            $adjustedStocks = [];
            foreach ($quantities as $productId => $requiredQuantity) {
                if (isset($stocks[$productId])) {
                    // Calculate the number of deals possible for this product
                    $adjustedStocks[$productId] = floor($stocks[$productId] / $requiredQuantity);
                } else {
                    // If the product is not in stock, set its adjusted stock to 0
                    $adjustedStocks[$productId] = 0;
                }
            }

            // Find the lowest adjusted stock across all products
            $lowestStock = !empty($adjustedStocks) ? min($adjustedStocks) : 0;





            $remainingStock = DB::table('stock_maintenance')
            ->selectRaw('SUM(stockIn - StockOut) as remainingStock')
            ->where('product_id', $product_warehouse->id)
            ->where('warehouse_id', $request->warehouse_id)
            ->where('date', '<=', $filter_date)
            ->whereNull('deleted_at')
            ->value('remainingStock'); // Fetch only the calculated value

            $RStock = $remainingStock ?? 0;

        if( $product_warehouse->type == 'is_combo' )
        {

            if ($product_warehouse->is_variant == 1) {
                $productsVariants = ProductVariant::where('product_id', $product_warehouse->id)
                    ->where('id', $product_warehouse->product_variant_id)
                    ->where('deleted_at', null)
                    ->first();

                $item['product_variant_id'] = $product_warehouse->product_variant_id;
                $item['Variant'] = '['.$productsVariants->name . ']' . $product_warehouse['product']->name;
                $item['name'] = '['.$productsVariants->name . ']' . $product_warehouse['product']->name;

                $item['code'] = $productsVariants->code;
                $item['barcode'] = $productsVariants->code;

                $product_price = $product_warehouse['productVariant']->price;

            } else {
                $item['product_variant_id'] = null;
                $item['Variant'] = null;
                $item['code'] = $product_warehouse->code;
                $item['name'] = $product_warehouse->name;
                $item['barcode'] = $product_warehouse->code;

                $product_price =  $product_warehouse->price;

            }
            $item['gttt'] = $lowestStock;
            $item['id'] = $product_warehouse->id;
            $firstimage = explode(',', $product_warehouse->image);
            $item['image'] = $firstimage[0];

            if($product_warehouse['unitSale']){

                if ($product_warehouse['unitSale']->operator == '/') {
                    $item['qte_sale'] = $lowestStock * $product_warehouse['unitSale']->operator_value;
                    $price = $product_price / $product_warehouse['unitSale']->operator_value;

                } else {
                    $item['qte_sale'] = $lowestStock / $product_warehouse['unitSale']->operator_value;
                    $price = $product_price * $product_warehouse['unitSale']->operator_value;

                }

            }else{
                $item['qte_sale'] = $product_warehouse->type!='is_service'? $lowestStock :'---';
                $price = $product_price;
            }

            $item['unitSale'] = $product_warehouse['unitSale']?$product_warehouse['unitSale']->ShortName:'';
            $item['qte'] = $product_warehouse->type!='is_service' ? $lowestStock :'---';

            $item['product_type'] = $product_warehouse->type;

            if ($product_warehouse->TaxNet !== 0.0) {

                //Exclusive
                if ($product_warehouse->tax_method == '1') {
                    $tax_price = $price * $product_warehouse->TaxNet / 100;

                    $item['Net_price'] = $price + $tax_price;

                    // Inxclusive
                } else {
                    $item['Net_price'] = $price;
                }
            } else {
                $item['Net_price'] = $price;
            }
            $item['type'] = $product_warehouse->type;

            $item['dataStock'] = $qte_combo;


            $item['image'] = 'no-image.png';

            $data[] = $item;





        }}

        return response()->json([
            'products' => $data,
            'totalRows' => $totalRows,
        ]);
    }

    //--------------------- Get Element POS ------------------------\\

    // Employee methods removed - employees table no longer used

    public function show(Request $request)
    {
        return response()->json([
            'employees' => [],
            'companies' => [],
            'totalRows' => 0,
        ]);
    }

    public function GetEmployees(Request $request)
    {
        return response()->json([
            'employees' => [],
            'companies' => [],
            'totalRows' => 0,
        ]);
    }

    public function GetELementPos(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'Sales_pos', Sale::class);
        $clients = Member::where('deleted_at', '=', null)->get(['id', 'name','phone','email','address']);
        $settings = Setting::where('deleted_at', '=', null)->first();

          //get warehouses assigned to user
          $user_auth = auth()->user();
          if($user_auth->is_all_warehouses){
             $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);

             if ($settings->warehouse_id) {
                if (Warehouse::where('id', $settings->warehouse_id)->where('deleted_at', '=', null)->first()) {
                    $defaultWarehouse = $settings->warehouse_id;
                } else {
                    $defaultWarehouse = '';
                }
            } else {
                $defaultWarehouse = '';
            }

          }else{
             $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
             $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);

             if ($settings->warehouse_id) {
                if (Warehouse::where('id', $settings->warehouse_id)->whereIn('id', $warehouses_id)->where('deleted_at', '=', null)->first()) {
                    $defaultWarehouse = $settings->warehouse_id;
                } else {
                    $defaultWarehouse = '';
                }
            } else {
                $defaultWarehouse = '';
            }
          }





        $defaultClient = '';
        $default_client_name = '';
        $stripe_key = config('app.STRIPE_KEY');

        return response()->json([
            'stripe_key' => $stripe_key,
            'defaultWarehouse' => $defaultWarehouse,
            'defaultClient' => $defaultClient,
            'default_client_name' => $default_client_name,
            'clients' => $clients,
            'categories' => [],
            'warehouses' => $warehouses,
            'categories' => $categories,
            'sales_password' => 'mypassword',
        ]);
    }

}
