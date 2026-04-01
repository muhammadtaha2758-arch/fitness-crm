<?php

namespace App\Http\Controllers;

use App\Models\Unit;
// Payment models removed - tables dropped
use App\Models\Product;

use App\Models\DbAccountdtl;
use App\Models\Transfer;
use App\Models\TransferDetail;
use App\Models\ProductVariant;
use App\Models\product_warehouse;
use App\Models\Provider;
use App\Models\Purchase;
use App\Models\Setting;
use App\Models\PurchaseDetail;
use App\Models\PurchaseReturn;
use App\Models\PurchaseReturnDetails;
use App\Models\Quotation;
use App\Models\QuotationDetail;
// Role model removed - table dropped
// use App\Models\Role;
use App\Models\Sale;
use App\Models\SaleDetail;
use App\Models\StockMaintenance;
use App\Models\JVSummary;
use App\Models\Counter;

use App\Models\DepartmentCategory;



use App\Models\Account;
use App\Models\AccountsLedger;

use App\Models\SaleReturn;
use App\Models\SaleReturnDetails;
use App\Models\User;
use App\Models\UserWarehouse;
use App\Models\Warehouse;
use App\utils\helpers;
use Carbon\Carbon;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use DB;

class ReportController extends BaseController
{


    //----------- Get Last 5 Sales --------------\\

    public function Get_last_Sales()
    {

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $Sales = Sale::with('details', 'client', 'facture')->where('deleted_at', '=', null)
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            })
            ->orderBy('id', 'desc')
            ->take(5)
            ->get();

        foreach ($Sales as $Sale) {

            $item['Ref'] = $Sale['Ref'];
            $item['statut'] = $Sale['statut'];
            $item['client_name'] = $Sale['client']['name'];
            $item['GrandTotal'] = $Sale['GrandTotal'];
            $item['paid_amount'] = $Sale['paid_amount'];
            $item['due'] = $Sale['GrandTotal'] - $Sale['paid_amount'];
            $item['payment_status'] = $Sale['payment_statut'];

            $data[] = $item;
        }

        return response()->json($data);
    }


    //----------------- Customers Report -----------------------\\

    // Client reports removed - clients table no longer used

    public function Client_Report(request $request)
    {
        return response()->json([
            'report' => [],
            'totalRows' => 0,
        ]);
    }

    public function Client_Report_detail(request $request, $id)
    {
        return response()->json(['report' => []]);
    }

    //----------------- Provider Report By ID-----------------------\\

    public function Provider_Report_detail(request $request, $id)
    {

        $this->authorizeForUser($request->user('api'), 'Reports_suppliers', Provider::class);

        $provider = Provider::where('deleted_at', '=', null)->findOrFail($id);

        $data['total_purchase'] = DB::table('purchases')->where('deleted_at', '=', null)->where('provider_id', $id)->count();

        $data['total_amount'] = DB::table('purchases')->where('deleted_at', '=', null)->where('provider_id', $id)
            ->sum('GrandTotal');

        $data['total_paid'] = DB::table('purchases')
            ->where('purchases.deleted_at', '=', null)
            ->where('purchases.provider_id', $id)
            ->sum('paid_amount');

        $data['due'] = $data['total_amount'] - $data['total_paid'];

        return response()->json(['report' => $data]);

    }

    //-------------------- Get Sales By Clients -------------\\

    public function Sales_Client(request $request)
    {
        // Client reports removed - clients table no longer used
        return response()->json([
            'sales' => [],
            'totalRows' => 0,
        ]);
    }

    public function Sales_Client_old(request $request)
    {
        // Old method - kept for reference but not used
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $sales = Sale::where('deleted_at', '=', null)->with('client', 'warehouse')
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            })
            ->where('client_id', $request->id)
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere('payment_statut', 'like', "%{$request->search}%")
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('client', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $sales->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $sales = $sales->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        $data = [];
        foreach ($sales as $sale) {
            $item['id'] = $sale->id;
            $item['date'] = $sale->date;
            $item['Ref'] = $sale->Ref;
            $item['warehouse_name'] = $sale['warehouse']->name;
            $item['client_name'] = $sale['client']->name;
            $item['statut'] = $sale->statut;
            $item['GrandTotal'] = $sale->GrandTotal;
            $item['paid_amount'] = $sale->paid_amount;
            $item['due'] = $sale->GrandTotal - $sale->paid_amount;
            $item['payment_status'] = $sale->payment_statut;
            $item['shipping_status'] = $sale->shipping_status;

            $data[] = $item;
        }
        return response()->json([
            'totalRows' => $totalRows,
            'sales' => $data,
        ]);

    }

    //-------------------- Get Payments By Clients -------------\\

    public function Payments_Client(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'Reports_customers', Sale::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $payments = DB::table('payment_sales')
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->where('payment_sales.user_id', '=', Auth::user()->id);
                }
            })
            ->where('payment_sales.deleted_at', '=', null)
            ->join('sales', 'payment_sales.sale_id', '=', 'sales.id')
            ->where('sales.client_id', $request->id)
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('payment_sales.Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('payment_sales.date', 'LIKE', "%{$request->search}%")
                        ->orWhere('payment_sales.Reglement', 'LIKE', "%{$request->search}%");
                });
            })
            ->select(
                'payment_sales.date',
                'payment_sales.Ref AS Ref',
                'sales.Ref AS Sale_Ref',
                'payment_sales.Reglement',
                'payment_sales.montant'
            );

        $totalRows = $payments->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $payments = $payments->offset($offSet)
            ->limit($perPage)
            ->orderBy('payment_sales.id', 'desc')
            ->get();

        return response()->json([
            'payments' => $payments,
            'totalRows' => $totalRows,
        ]);

    }

    //-------------------- Get Quotations By Clients -------------\\

    public function Quotations_Client(request $request)
    {
        // Client reports removed - clients table no longer used
        return response()->json([
            'quotations' => [],
            'totalRows' => 0,
        ]);
    }

    public function Quotations_Client_old(request $request)
    {
        // Old method - kept for reference but not used
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        $offSet = ($pageStart * $perPage) - $perPage;
        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;
        $data = array();

        $Quotations = Quotation::with('warehouse')
            ->where('deleted_at', '=', null)
            ->where('client_id', $request->id)
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            })
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $Quotations->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $Quotations = $Quotations->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        foreach ($Quotations as $Quotation) {
            $item['id'] = $Quotation->id;
            $item['date'] = $Quotation->date;
            $item['Ref'] = $Quotation->Ref;
            $item['statut'] = $Quotation->statut;
            $item['warehouse_name'] = $Quotation['warehouse']->name;
            $item['client_name'] = '';
            $item['GrandTotal'] = $Quotation->GrandTotal;

            $data[] = $item;
        }

        return response()->json([
            'quotations' => $data,
            'totalRows' => $totalRows,
        ]);
    }

    //-------------------- Get Returns By Client -------------\\

    public function Returns_Client(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'Reports_customers', Sale::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $data = array();

        //  Check If User Has Permission Show All Records
        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $SaleReturn = SaleReturn::where('deleted_at', '=', null)->with('sale', 'client', 'warehouse')
            ->where('client_id', $request->id)
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            })
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere('payment_statut', 'like', "$request->search")
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('client', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('sale', function ($q) use ($request) {
                                $q->where('Ref', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $SaleReturn->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $SaleReturn = $SaleReturn->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        foreach ($SaleReturn as $Sale_Return) {
            $item['id'] = $Sale_Return->id;
            $item['Ref'] = $Sale_Return->Ref;
            $item['statut'] = $Sale_Return->statut;
            $item['client_name'] = $Sale_Return['client']->name;
            $item['sale_ref'] = $Sale_Return['sale'] ? $Sale_Return['sale']->Ref : '---';
            $item['sale_id'] = $Sale_Return['sale'] ? $Sale_Return['sale']->id : NULL;
            $item['warehouse_name'] = $Sale_Return['warehouse']->name;
            $item['GrandTotal'] = $Sale_Return->GrandTotal;
            $item['paid_amount'] = $Sale_Return->paid_amount;
            $item['due'] = $Sale_Return->GrandTotal - $Sale_Return->paid_amount;
            $item['payment_status'] = $Sale_Return->payment_statut;

            $data[] = $item;
        }

        return response()->json([
            'totalRows' => $totalRows,
            'returns_customer' => $data,
        ]);
    }



    //------------- Show Report Purchases ----------\\

    public function Report_Purchases(request $request)
    {
        $this->authorizeForUser($request->user('api'), 'ReportPurchases', Purchase::class);
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
        );
        $columns = array(
            0 => 'Ref',
            1 => 'statut',
            2 => 'provider_id',
            3 => 'payment_statut',
            4 => 'warehouse_id',
        );
        $data = array();
        $total = 0;

        $Purchases = Purchase::select('purchases.*')
            ->with('facture', 'provider', 'warehouse')
            ->join('providers', 'purchases.provider_id', '=', 'providers.id')
            ->where('purchases.deleted_at', '=', null)
            ->whereBetween('purchases.date', array($request->from, $request->to));

        //  Check If User Has Permission Show All Records
        $Purchases = $helpers->Show_Records($Purchases);
        //Multiple Filter
        $Filtred = $helpers->filter($Purchases, $columns, $param, $request)
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere('GrandTotal', $request->search)
                        ->orWhere('payment_statut', 'like', "$request->search")
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('provider', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $Filtred->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $Purchases = $Filtred->offset($offSet)
            ->limit($perPage)
            ->orderBy('purchases.' . $order, $dir)
            ->get();

        foreach ($Purchases as $Purchase) {

            $item['id'] = $Purchase->id;
            $item['date'] = $Purchase->date;
            $item['Ref'] = $Purchase->Ref;
            $item['warehouse_name'] = $Purchase['warehouse']->name;
            $item['discount'] = $Purchase->discount;
            $item['shipping'] = $Purchase->shipping;
            $item['statut'] = $Purchase->statut;
            $item['provider_name'] = $Purchase['provider']->name;
            $item['provider_email'] = $Purchase['provider']->email;
            $item['provider_tele'] = $Purchase['provider']->phone;
            $item['provider_code'] = $Purchase['provider']->code;
            $item['provider_adr'] = $Purchase['provider']->adresse;
            $item['GrandTotal'] = $Purchase['GrandTotal'];
            $item['paid_amount'] = $Purchase['paid_amount'];
            $item['due'] = $Purchase['GrandTotal'] - $Purchase['paid_amount'];
            $item['payment_status'] = $Purchase['payment_statut'];

            $data[] = $item;
        }

        $suppliers = provider::where('deleted_at', '=', null)->get(['id', 'name']);

        //get warehouses assigned to user
        $user_auth = auth()->user();
        if ($user_auth->is_all_warehouses) {
            $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
        } else {
            $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
            $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
        }

        return response()->json([
            'totalRows' => $totalRows,
            'purchases' => $data,
            'suppliers' => $suppliers,
            'warehouses' => $warehouses,
        ]);
    }

    //------------- Show Report SALES -----------\\

    public function Report_Sales(request $request)
    {
        $this->authorizeForUser($request->user('api'), 'Reports_sales', Sale::class);
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
        );
        $columns = array(
            0 => 'Ref',
            1 => 'statut',
            2 => 'client_id',
            3 => 'payment_statut',
            4 => 'warehouse_id',
        );

        $data = array();

        $Sales = Sale::select('sales.*')
            ->with('facture', 'warehouse')
            ->where('sales.deleted_at', '=', null)
            ->whereBetween('sales.date', array($request->from, $request->to));

        //  Check If User Has Permission Show All Records
        $Sales = $helpers->Show_Records($Sales);
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
                            return $query->whereHas('client', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $Filtred->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $perPage = $totalRows;
        $Sales = $Filtred->offset($offSet)
            ->limit($perPage)
            ->orderBy('sales.' . $order, $dir)
            ->get();

        foreach ($Sales as $Sale) {

            $item['id'] = $Sale['id'];
            $item['date'] = $Sale['date'];
            $item['Ref'] = $Sale['Ref'];
            $item['statut'] = $Sale['statut'];
            $item['discount'] = $Sale['discount'];
            $item['shipping'] = $Sale['shipping'];
            $item['warehouse_name'] = $Sale['warehouse']['name'];
            $item['client_name'] = $Sale['client']['name'];
            $item['client_email'] = $Sale['client']['email'];
            $item['client_tele'] = $Sale['client']['phone'];
            $item['client_code'] = $Sale['client']['code'];
            $item['client_adr'] = $Sale['client']['adresse'];
            $item['GrandTotal'] = $Sale['GrandTotal'];
            $item['paid_amount'] = $Sale['paid_amount'];
            $item['due'] = $Sale['GrandTotal'] - $Sale['paid_amount'];
            $item['payment_status'] = $Sale['payment_statut'];

            $item['created_at'] = Carbon::parse($Sale['created_at'])->format('H:i:s');
            $item['orderType'] = $Sale['orderType'];

            $data[] = $item;
        }

        $customers = client::where('deleted_at', '=', null)->get(['id', 'name']);

        //get warehouses assigned to user
        $user_auth = auth()->user();
        if ($user_auth->is_all_warehouses) {
            $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
        } else {
            $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
            $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
        }

        return response()->json(
            [
                'totalRows' => $totalRows,
                'sales' => $data,
                'customers' => $customers,
                'warehouses' => $warehouses
            ]
        );
    }

    //----------------- Providers Report -----------------------\\

    public function Providers_Report(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'Reports_suppliers', Provider::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;
        $data = array();

        $providers = Provider::where('deleted_at', '=', null)
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('name', 'LIKE', "%{$request->search}%")
                        ->orWhere('code', 'LIKE', "%{$request->search}%")
                        ->orWhere('phone', 'LIKE', "%{$request->search}%");
                });
            });

        $totalRows = $providers->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $providers = $providers->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        foreach ($providers as $provider) {
            $item['total_purchase'] = DB::table('purchases')
                ->where('deleted_at', '=', null)
                ->where('provider_id', $provider->id)
                ->count();

            $item['total_amount'] = DB::table('purchases')
                ->where('deleted_at', '=', null)
                ->where('provider_id', $provider->id)
                ->sum('GrandTotal');

            $item['total_paid'] = DB::table('purchases')
                ->where('purchases.deleted_at', '=', null)
                ->where('purchases.provider_id', $provider->id)
                ->sum('paid_amount');

            $item['due'] = $item['total_amount'] - $item['total_paid'];

            $item['total_amount_return'] = DB::table('purchase_returns')
                ->where('deleted_at', '=', null)
                ->where('provider_id', $provider->id)
                ->sum('GrandTotal');

            $item['total_paid_return'] = DB::table('purchase_returns')
                ->where('deleted_at', '=', null)
                ->where('provider_id', $provider->id)
                ->sum('paid_amount');

            $item['return_Due'] = $item['total_amount_return'] - $item['total_paid_return'];

            $item['id'] = $provider->id;
            $item['name'] = $provider->name;
            $item['phone'] = $provider->phone;
            $item['code'] = $provider->code;

            $data[] = $item;
        }

        return response()->json([
            'report' => $data,
            'totalRows' => $totalRows,
        ]);

    }

    //-------------------- Get Purchases By Provider -------------\\

    public function Purchases_Provider(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'Reports_suppliers', Provider::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $data = array();

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $purchases = Purchase::where('deleted_at', '=', null)
            ->with('provider', 'warehouse')
            ->where('provider_id', $request->id)
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            })
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere('payment_statut', 'like', "$request->search")
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('provider', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $purchases->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $purchases = $purchases->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        foreach ($purchases as $purchase) {
            $item['id'] = $purchase->id;
            $item['Ref'] = $purchase->Ref;
            $item['warehouse_name'] = $purchase['warehouse']->name;
            $item['provider_name'] = $purchase['provider']->name;
            $item['statut'] = $purchase->statut;
            $item['GrandTotal'] = $purchase->GrandTotal;
            $item['paid_amount'] = $purchase->paid_amount;
            $item['due'] = $purchase->GrandTotal - $purchase->paid_amount;
            $item['payment_status'] = $purchase->payment_statut;

            $data[] = $item;
        }

        return response()->json([
            'totalRows' => $totalRows,
            'purchases' => $data,
        ]);

    }

    //-------------------- Get Payments By Provider -------------\\

    public function Payments_Provider(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'Reports_suppliers', Provider::class);

        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $data = array();

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $payments = DB::table('payment_purchases')
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            })
            ->where('payment_purchases.deleted_at', '=', null)
            ->join('purchases', 'payment_purchases.purchase_id', '=', 'purchases.id')
            ->where('purchases.provider_id', $request->id)
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('payment_purchases.Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('payment_purchases.date', 'LIKE', "%{$request->search}%")
                        ->orWhere('payment_purchases.Reglement', 'LIKE', "%{$request->search}%");
                });
            })
            ->select(
                'payment_purchases.date',
                'payment_purchases.Ref AS Ref',
                'purchases.Ref AS purchase_Ref',
                'payment_purchases.Reglement',
                'payment_purchases.montant'
            );

        $totalRows = $payments->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $payments = $payments->offset($offSet)
            ->limit($perPage)
            ->orderBy('payment_purchases.id', 'desc')
            ->get();

        return response()->json([
            'payments' => $payments,
            'totalRows' => $totalRows,
        ]);
    }

    //-------------------- Get Returns By Providers -------------\\

    public function Returns_Provider(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'Reports_suppliers', Provider::class);

        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $data = array();

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $PurchaseReturn = PurchaseReturn::where('deleted_at', '=', null)
            ->with('purchase', 'provider', 'warehouse')
            ->where('provider_id', $request->id)
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            })
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere('payment_statut', 'like', "$request->search")
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('provider', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('purchase', function ($q) use ($request) {
                                $q->where('Ref', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $PurchaseReturn->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $PurchaseReturn = $PurchaseReturn->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        foreach ($PurchaseReturn as $Purchase_Return) {
            $item['id'] = $Purchase_Return->id;
            $item['Ref'] = $Purchase_Return->Ref;
            $item['statut'] = $Purchase_Return->statut;
            $item['purchase_ref'] = $Purchase_Return['purchase'] ? $Purchase_Return['purchase']->Ref : '---';
            $item['purchase_id'] = $Purchase_Return['purchase'] ? $Purchase_Return['purchase']->id : NULL;
            $item['provider_name'] = $Purchase_Return['provider']->name;
            $item['warehouse_name'] = $Purchase_Return['warehouse']->name;
            $item['GrandTotal'] = $Purchase_Return->GrandTotal;
            $item['paid_amount'] = $Purchase_Return->paid_amount;
            $item['due'] = $Purchase_Return->GrandTotal - $Purchase_Return->paid_amount;
            $item['payment_status'] = $Purchase_Return->payment_statut;

            $data[] = $item;
        }

        return response()->json([
            'totalRows' => $totalRows,
            'returns_supplier' => $data,
        ]);

    }

    //-------------------- Top 5 Suppliers -------------\\

    public function ToProviders(Request $request)
    {

        $this->authorizeForUser($request->user('api'), 'Reports_suppliers', Provider::class);

        $results = DB::table('purchases')->where('purchases.deleted_at', '=', null)
            ->join('providers', 'purchases.provider_id', '=', 'providers.id')
            ->select(DB::raw('providers.name'), DB::raw('count(*) as count'))
            ->groupBy('providers.name')
            ->orderBy('count', 'desc')
            ->take(5)
            ->get();

        $data = [];
        $providers = [];
        foreach ($results as $result) {
            $providers[] = $result->name;
            $data[] = $result->count;
        }
        $data[] = 0;
        return response()->json(['providers' => $providers, 'data' => $data]);
    }

    //----------------- Warehouse Report By ID-----------------------\\

    public function Warehouse_Report(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'WarehouseStock', Product::class);

        $data['sales'] = Sale::where('deleted_at', '=', null)
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('warehouse_id'), function ($query) use ($request) {
                    return $query->where('warehouse_id', $request->warehouse_id);
                });
            })->count();

        $data['purchases'] = Purchase::where('deleted_at', '=', null)
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('warehouse_id'), function ($query) use ($request) {
                    return $query->where('warehouse_id', $request->warehouse_id);
                });
            })->count();

        $data['ReturnPurchase'] = PurchaseReturn::where('deleted_at', '=', null)
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('warehouse_id'), function ($query) use ($request) {
                    return $query->where('warehouse_id', $request->warehouse_id);
                });
            })->count();

        $data['ReturnSale'] = SaleReturn::where('deleted_at', '=', null)
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('warehouse_id'), function ($query) use ($request) {
                    return $query->where('warehouse_id', $request->warehouse_id);
                });
            })->count();

        //get warehouses assigned to user
        $user_auth = auth()->user();
        if ($user_auth->is_all_warehouses) {
            $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
        } else {
            $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
            $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
        }

        return response()->json([
            'data' => $data,
            'warehouses' => $warehouses,
        ], 200);

    }

    //-------------------- Get Sales By Warehouse -------------\\

    public function Sales_Warehouse(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'WarehouseStock', Product::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $data = [];

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $sales = Sale::where('deleted_at', '=', null)->with('client', 'warehouse')
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            })
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('warehouse_id'), function ($query) use ($request) {
                    return $query->where('warehouse_id', $request->warehouse_id);
                });
            })
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere('GrandTotal', $request->search)
                        ->orWhere('payment_statut', 'like', "$request->search")
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('client', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $sales->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $sales = $sales->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        foreach ($sales as $sale) {
            $item['id'] = $sale->id;
            $item['date'] = $sale->date;
            $item['Ref'] = $sale->Ref;
            $item['client_name'] = $sale['client']->name;
            $item['warehouse_name'] = $sale['warehouse']->name;
            $item['statut'] = $sale->statut;
            $item['GrandTotal'] = $sale->GrandTotal;
            $item['paid_amount'] = $sale->paid_amount;
            $item['due'] = $sale->GrandTotal - $sale->paid_amount;
            $item['payment_status'] = $sale->payment_statut;
            $item['shipping_status'] = $sale->shipping_status;

            $data[] = $item;
        }
        return response()->json([
            'totalRows' => $totalRows,
            'sales' => $data,
        ]);

    }

    //-------------------- Get Quotations By Warehouse -------------\\

    public function Quotations_Warehouse(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'WarehouseStock', Product::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $data = [];

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $Quotations = Quotation::where('deleted_at', '=', null)
            ->with('client', 'warehouse')
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            })
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('warehouse_id'), function ($query) use ($request) {
                    return $query->where('warehouse_id', $request->warehouse_id);
                });
            })
            //Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere('GrandTotal', $request->search)
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('client', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });
        $totalRows = $Quotations->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $Quotations = $Quotations->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        foreach ($Quotations as $Quotation) {
            $item['id'] = $Quotation->id;
            $item['date'] = $Quotation->date;
            $item['Ref'] = $Quotation->Ref;
            $item['warehouse_name'] = $Quotation['warehouse']->name;
            $item['client_name'] = $Quotation['client']->name;
            $item['statut'] = $Quotation->statut;
            $item['GrandTotal'] = $Quotation->GrandTotal;

            $data[] = $item;
        }

        return response()->json([
            'quotations' => $data,
            'totalRows' => $totalRows,
        ]);
    }

    //-------------------- Get Returns Sale By Warehouse -------------\\

    public function Returns_Sale_Warehouse(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'WarehouseStock', Product::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $data = array();

        //  Check If User Has Permission Show All Records
        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $SaleReturn = SaleReturn::where('deleted_at', '=', null)
            ->with('sale', 'client', 'warehouse')
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            })
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('warehouse_id'), function ($query) use ($request) {
                    return $query->where('warehouse_id', $request->warehouse_id);
                });
            })
            //Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere('GrandTotal', $request->search)
                        ->orWhere('payment_statut', 'like', "$request->search")

                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('sale', function ($q) use ($request) {
                                $q->where('Ref', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('client', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $SaleReturn->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $SaleReturn = $SaleReturn->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        foreach ($SaleReturn as $Sale_Return) {
            $item['id'] = $Sale_Return->id;
            $item['warehouse_name'] = $Sale_Return['warehouse']->name;
            $item['Ref'] = $Sale_Return->Ref;
            $item['statut'] = $Sale_Return->statut;
            $item['client_name'] = $Sale_Return['client']->name;
            $item['sale_ref'] = $Sale_Return['sale'] ? $Sale_Return['sale']->Ref : '---';
            $item['sale_id'] = $Sale_Return['sale'] ? $Sale_Return['sale']->id : NULL;
            $item['GrandTotal'] = $Sale_Return->GrandTotal;
            $item['paid_amount'] = $Sale_Return->paid_amount;
            $item['due'] = $Sale_Return->GrandTotal - $Sale_Return->paid_amount;
            $item['payment_status'] = $Sale_Return->payment_statut;

            $data[] = $item;
        }

        return response()->json([
            'totalRows' => $totalRows,
            'returns_sale' => $data,
        ]);
    }

    //-------------------- Get Returns Purchase By Warehouse -------------\\

    public function Returns_Purchase_Warehouse(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'WarehouseStock', Product::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $data = array();

        //  Check If User Has Permission Show All Records
        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $PurchaseReturn = PurchaseReturn::where('deleted_at', '=', null)
            ->with('purchase', 'provider', 'warehouse')
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            })
            ->orWhere(function ($query) use ($request) {
                return $query->whereHas('purchase', function ($q) use ($request) {
                    $q->where('Ref', 'LIKE', "%{$request->search}%");
                });
            })
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('warehouse_id'), function ($query) use ($request) {
                    return $query->where('warehouse_id', $request->warehouse_id);
                });
            })
            //Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere('GrandTotal', $request->search)
                        ->orWhere('payment_statut', 'like', "$request->search")
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('provider', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $PurchaseReturn->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $PurchaseReturn = $PurchaseReturn->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        foreach ($PurchaseReturn as $Purchase_Return) {
            $item['id'] = $Purchase_Return->id;
            $item['Ref'] = $Purchase_Return->Ref;
            $item['statut'] = $Purchase_Return->statut;
            $item['purchase_ref'] = $Purchase_Return['purchase'] ? $Purchase_Return['purchase']->Ref : '---';
            $item['purchase_id'] = $Purchase_Return['purchase'] ? $Purchase_Return['purchase']->id : NULL;
            $item['warehouse_name'] = $Purchase_Return['warehouse']->name;
            $item['provider_name'] = $Purchase_Return['provider']->name;
            $item['GrandTotal'] = $Purchase_Return->GrandTotal;
            $item['paid_amount'] = $Purchase_Return->paid_amount;
            $item['due'] = $Purchase_Return->GrandTotal - $Purchase_Return->paid_amount;
            $item['payment_status'] = $Purchase_Return->payment_statut;

            $data[] = $item;
        }

        return response()->json([
            'totalRows' => $totalRows,
            'returns_purchase' => $data,
        ]);
    }

    //-------------------- Get Expenses By Warehouse -------------\\

    public function Expenses_Warehouse(request $request)
    {
        // Expenses removed - expenses table no longer used
        return response()->json([
            'totalRows' => 0,
            'expenses' => [],
        ]);
    }

    //----------------- Warhouse Count Stock -----------------------\\

    public function Warhouse_Count_Stock(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'WarehouseStock', Product::class);

        $stock_count = product_warehouse::join('products', 'product_warehouse.product_id', '=', 'products.id')
            ->join('warehouses', 'product_warehouse.warehouse_id', '=', 'warehouses.id')
            ->where('product_warehouse.deleted_at', '=', null)
            ->select(
                DB::raw("count(DISTINCT products.id) as value"),
                DB::raw("warehouses.name as name"),
                DB::raw('(IFNULL(SUM(qte),0)) AS value1'),
            )
            ->where('qte', '>', 0)
            ->groupBy('warehouses.name')
            ->get();

        $stock_value = product_warehouse::join('products', 'product_warehouse.product_id', '=', 'products.id')
            ->join('warehouses', 'product_warehouse.warehouse_id', '=', 'warehouses.id')
            ->where('product_warehouse.deleted_at', '=', null)
            ->select(
                DB::raw("SUM(products.price * qte ) as price"),
                DB::raw("SUM(products.cost * qte) as cost"),
                DB::raw("warehouses.name as name"),
            )
            ->where('qte', '>', 0)
            ->groupBy('warehouses.name')
            ->get();

        $data = [];
        foreach ($stock_value as $key => $value) {
            $item['name'] = $value->name;
            $item['value'] = $value->price;
            $item['value1'] = $value->cost;
            $data[] = $item;
        }

        //get warehouses assigned to user
        $user_auth = auth()->user();
        if ($user_auth->is_all_warehouses) {
            $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
        } else {
            $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
            $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
        }

        return response()->json([
            'stock_count' => $stock_count,
            'stock_value' => $data,
            'warehouses' => $warehouses,
        ]);

    }

    //-------------- Count  Product Quantity Alerts ---------------\\

    public function count_quantity_alert(request $request)
    {

        $products_alerts = product_warehouse::join('products', 'product_warehouse.product_id', '=', 'products.id')
            ->whereRaw('qte <= stock_alert')
            ->count();

        return response()->json($products_alerts);
    }


    //-----------------Profit And Loss ---------------------------\\
    // [10:28 am, 17/02/2025] Shahbaz zaidi: profit and loss summary errror
    // [10:31 am, 17/02/2025] Shahbaz zaidi: profit and loss detail single product fetch error
    // [10:34 am, 17/02/2025] Shahbaz zaidi: sales profit and loss fetch error on specific customer name generate
    public function ProfitAndLoss(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'Reports_profit', Product::class);

        $role = Auth::user()->roles()->first();
        $view_records = Role::findOrFail($role->id)->inRole('record_view');

        $start_date = $request->from;
        $end_date = $request->to;

        //get warehouses assigned to user
        $user_auth = auth()->user();
        if ($user_auth->is_all_warehouses) {
            $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
            $array_warehouses_id = Warehouse::where('deleted_at', '=', null)->pluck('id')->toArray();
        } else {
            $array_warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
            $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $array_warehouses_id)->get(['id', 'name']);
        }

        if (empty($request->warehouse_id)) {
            $warehouse_id = 0;
        } else {
            $warehouse_id = $request->warehouse_id;
        }

        $data = [];


        //-------------Sale
        $report_total_sales = Sale::where('deleted_at', '=', null)
            // ->where('statut', 'completed')
            ->whereBetween('date', array($start_date, $end_date))

            ->where(function ($query) use ($request, $warehouse_id, $array_warehouses_id) {
                if ($warehouse_id !== 0) {
                    return $query->where('warehouse_id', $warehouse_id);
                } else {
                    return $query->whereIn('warehouse_id', $array_warehouses_id);

                }
            })

            ->select(
                DB::raw('SUM(GrandTotal) AS sum'),
                DB::raw("count(*) as nmbr")
            )->first();

        $item['sales_sum'] = number_format($report_total_sales->sum, 2, '.', ',');

        $item['sales_count'] = $report_total_sales->nmbr;


        //--------Purchase
        $report_total_purchases = Purchase::where('deleted_at', '=', null)
            ->where('statut', 'received')
            ->whereBetween('date', array($start_date, $end_date))

            ->where(function ($query) use ($request, $warehouse_id, $array_warehouses_id) {
                if ($warehouse_id !== 0) {
                    return $query->where('warehouse_id', $warehouse_id);
                } else {
                    return $query->whereIn('warehouse_id', $array_warehouses_id);

                }
            })
            ->select(
                DB::raw('SUM(GrandTotal) AS sum'),
                DB::raw("count(*) as nmbr")
            )->first();

        $item['purchases_sum'] = number_format($report_total_purchases->sum, 2, '.', ',');
        $item['purchases_count'] = $report_total_purchases->nmbr;


        //--------SaleReturn
        $report_total_returns_sales = SaleReturn::where('deleted_at', '=', null)
            // ->where('statut', 'received')
            ->whereBetween('date', array($start_date, $end_date))

            ->where(function ($query) use ($request, $warehouse_id, $array_warehouses_id) {
                if ($warehouse_id !== 0) {
                    return $query->where('warehouse_id', $warehouse_id);
                } else {
                    return $query->whereIn('warehouse_id', $array_warehouses_id);

                }
            })

            ->select(
                DB::raw('SUM(GrandTotal) AS sum'),
                DB::raw("count(*) as nmbr")
            )->first();

        $item['returns_sales_sum'] = number_format($report_total_returns_sales->sum, 2, '.', ',');
        $item['returns_sales_count'] = $report_total_returns_sales->nmbr;



        //--------returns_purchases
        $report_total_returns_purchases = PurchaseReturn::where('deleted_at', '=', null)
            // ->where('statut', 'completed')
            ->whereBetween('date', array($start_date, $end_date))

            ->where(function ($query) use ($request, $warehouse_id, $array_warehouses_id) {
                if ($warehouse_id !== 0) {
                    return $query->where('warehouse_id', $warehouse_id);
                } else {
                    return $query->whereIn('warehouse_id', $array_warehouses_id);

                }
            })

            ->select(
                DB::raw('SUM(GrandTotal) AS sum'),
                DB::raw("count(*) as nmbr")
            )->first();

        $item['returns_purchases_sum'] = number_format($report_total_returns_purchases->sum, 2, '.', ',');
        $item['returns_purchases_count'] = $report_total_returns_purchases->nmbr;


        //--------paiement_sales (table dropped - set to 0)
        $report_total_paiement_sales = (object)['sum' => 0];
        $item['paiement_sales'] = number_format(0, 2, '.', ',');


        //--------PaymentSaleReturns (table dropped - set to 0)
        $report_total_PaymentSaleReturns = (object)['sum' => 0];
        $item['PaymentSaleReturns'] = number_format(0, 2, '.', ',');


        //--------PaymentPurchaseReturns (table dropped - set to 0)
        $report_total_PaymentPurchaseReturns = (object)['sum' => 0];
        $item['PaymentPurchaseReturns'] = number_format(0, 2, '.', ',');


        //--------paiement_purchases (table dropped - set to 0)
        $report_total_paiement_purchases = (object)['sum' => 0];
        $item['paiement_purchases'] = number_format(0, 2, '.', ',');


        //--------expenses
        // $report_total_expenses = Expense::whereBetween('date', array($start_date, $end_date))
        //     ->where('deleted_at', '=', null)

        //     ->where(function ($query) use ($request, $warehouse_id, $array_warehouses_id) {
        //         if ($warehouse_id !== 0) {
        //             return $query->where('warehouse_id', $warehouse_id);
        //         } else {
        //             return $query->whereIn('warehouse_id', $array_warehouses_id);
        //         }
        //     })

        //     ->select(
        //         DB::raw('SUM(amount) AS sum')
        //     )->first();


        $report_total_expenses = DB::table('accounts_ledger')
        ->whereBetween('created_at', array($start_date, $end_date))

        ->where('voucher_type', 'JV')
        ->where('account_id', 'like', '5.%')
        ->select(DB::raw('SUM(debit_amount) AS sum'))
        ->first();


        $item['expenses_sum'] = number_format($report_total_expenses->sum, 2, '.', ',');
            $expenses_sum = number_format($report_total_expenses->sum, 2, '.', ',');
        //calcule COGS and average cost
        $cogs_average_data = $this->CalculeCogsAndAverageCost($start_date, $end_date, $warehouse_id, $array_warehouses_id);

        $cogs = $cogs_average_data['total_cogs_products'];
        $total_average_cost = $cogs_average_data['total_average_cost'];

        $item['product_cost_fifo'] = number_format($cogs, 2, '.', ',');
        $item['averagecost'] = number_format($total_average_cost, 2, '.', ',');

        // $item['profit_fifo'] = number_format($report_total_sales->sum - $cogs, 2, '.', ',');


    $item['profit_fifo'] = number_format($report_total_sales->sum - ($report_total_returns_sales->sum + $report_total_expenses->sum + $report_total_purchases->sum), 2, '.', ',');


        $item['profit_average_cost'] = number_format($report_total_sales->sum - $total_average_cost, 2, '.', ',');

        $item['payment_received'] = number_format($report_total_paiement_sales->sum + $report_total_PaymentPurchaseReturns->sum, 2, '.', ',');
        $item['payment_sent'] = number_format($report_total_paiement_purchases->sum + $report_total_PaymentSaleReturns->sum + $report_total_expenses->sum, 2, '.', ',');
        $item['paiement_net'] = number_format(($report_total_paiement_sales->sum + $report_total_PaymentPurchaseReturns->sum) - ($report_total_paiement_purchases->sum + $report_total_PaymentSaleReturns->sum + $report_total_expenses->sum), 2, '.', ',');
        $item['total_revenue'] = number_format($report_total_sales->sum - $report_total_returns_sales->sum, 2, '.', ',');


        return response()->json([
            'data' => $item,
            'warehouses' => $warehouses,
        ]);

    }

    // Calculating the cost of goods sold (COGS)
    public function CalculeCogsAndAverageCost($start_date, $end_date, $warehouse_id, $array_warehouses_id)
    {

        // Initialize variable to store total COGS averageCost and for all products
        $total_cogs_products = 0;
        $total_average_cost = 0;

        // Get all distinct product IDs for sales between start and end date
        $productIds = SaleDetail::with('sale')
            ->where(function ($query) use ($warehouse_id, $array_warehouses_id) {
                if ($warehouse_id !== 0) {
                    return $query->whereHas('sale', function ($q) use ($array_warehouses_id, $warehouse_id) {
                        $q->where('warehouse_id', $warehouse_id)->where('statut', 'completed');
                    });
                } else {
                    return $query->whereHas('sale', function ($q) use ($array_warehouses_id, $warehouse_id) {
                        $q->whereIn('warehouse_id', $array_warehouses_id)->where('statut', 'completed');
                    });

                }
            })->whereBetween('date', array($start_date, $end_date))
            ->select('product_id', 'product_variant_id')
            ->distinct()
            ->get();

        // Loop through each product
        foreach ($productIds as $productId) {

            // $productId = 1011;
            $totalCogs = 0;
            $average_cost = 0;
            $tax_shipping = 0;

            // Adjustments are no longer used
            $adjustment_quantity = 0;


            // Get total quantity sold before start date
            $totalQuantitySold = SaleDetail::with('sale')
                ->where(function ($query) use ($warehouse_id, $array_warehouses_id) {
                    if ($warehouse_id !== 0) {
                        return $query->whereHas('sale', function ($q) use ($array_warehouses_id, $warehouse_id) {
                            $q->where('warehouse_id', $warehouse_id)->where('statut', 'completed');
                        });
                    } else {
                        return $query->whereHas('sale', function ($q) use ($array_warehouses_id, $warehouse_id) {
                            $q->whereIn('warehouse_id', $array_warehouses_id)->where('statut', 'completed');
                        });

                    }
                })->where('product_id', $productId['product_id'])
                ->where('product_variant_id', $productId['product_variant_id'])
                ->where('date', '<', $start_date)
                ->orderBy('date', 'asc')
                ->sum('quantity');


            // Get purchase details for current product, ordered by date in ascending date
            $purchases = PurchaseDetail::where('product_id', $productId['product_id'])
                ->where('product_variant_id', $productId['product_variant_id'])
                ->join('purchases', 'purchases.id', '=', 'purchase_details.purchase_id')
                ->where('purchases.statut', 'received')
                ->where(function ($query) use ($warehouse_id, $array_warehouses_id) {
                    if ($warehouse_id !== 0) {
                        return $query->where('purchases.warehouse_id', $warehouse_id)->where('purchases.statut', 'received');
                    } else {
                        return $query->whereIn('purchases.warehouse_id', $array_warehouses_id)->where('purchases.statut', 'received');

                    }
                })
                ->orderBy('purchases.date', 'asc')
                ->select(
                    'purchase_details.quantity as quantity',
                    'purchase_details.cost as cost',
                    'purchase_details.total as total',
                    'purchases.GrandTotal as purchase_total',
                    'purchase_details.purchase_id as purchase_id'
                )
                ->get();


            if (count($purchases) > 0) {
                $purchases_to_array = $purchases->toArray();
                $purchases_sum_qty = array_sum(array_column($purchases_to_array, 'quantity'));
            } else {
                $purchases_sum_qty = 0;
            }

            // Get sale details for current product between start and end date, ordered by date in ascending order
            $sales = SaleDetail::with('sale')
                ->where(function ($query) use ($warehouse_id, $array_warehouses_id) {
                    if ($warehouse_id !== 0) {
                        return $query->whereHas('sale', function ($q) use ($array_warehouses_id, $warehouse_id) {
                            $q->where('warehouse_id', $warehouse_id)->where('statut', 'completed');
                        });
                    } else {
                        return $query->whereHas('sale', function ($q) use ($array_warehouses_id, $warehouse_id) {
                            $q->whereIn('warehouse_id', $array_warehouses_id)->where('statut', 'completed');
                        });

                    }
                })->where('product_id', $productId['product_id'])
                ->where('product_variant_id', $productId['product_variant_id'])
                ->whereBetween('date', array($start_date, $end_date))
                ->orderBy('date', 'asc')
                ->get();


            $sales_to_array = $sales->toArray();
            $sales_sum_qty = array_sum(array_column($sales_to_array, 'quantity'));

            $total_sum_sales = $totalQuantitySold + $sales_sum_qty;


            //calcule average Cost
            $average_cost = $this->averageCost($productId['product_id'], $start_date, $end_date, $warehouse_id, $array_warehouses_id);

            if ($total_sum_sales > $purchases_sum_qty) {
                // Handle adjustments only case
                $totalCogs += $sales_sum_qty * $average_cost;
                $total_average_cost += $sales_sum_qty * $average_cost;

            } else {

                foreach ($sales as $sale) {

                    $saleQuantity = $sale->quantity;
                    $total_average_cost += $average_cost * $sale->quantity;

                    while ($saleQuantity > 0) {
                        $purchase = $purchases->first();
                        if ($purchase->quantity > 0) {
                            $totalQuantitySold += $saleQuantity;
                            if ($purchase->quantity >= $totalQuantitySold) {
                                $totalCogs += $saleQuantity * $purchase->cost;
                                $purchase->quantity -= $totalQuantitySold;
                                $saleQuantity = 0;
                                $totalQuantitySold = 0;
                                if ($purchase->quantity == 0) {
                                    $purchase->quantity = 0;
                                    $saleQuantity = 0;
                                    $totalQuantitySold = 0;
                                    $purchases->shift();
                                }

                            } else {


                                $diff = round($totalQuantitySold - $saleQuantity, 4);
                                if ($purchase->quantity > $diff) {

                                    $rest = $purchase->quantity - $diff;
                                    if ($rest <= $saleQuantity) {
                                        $saleQuantity -= $rest;
                                        $totalCogs += $rest * $purchase->cost;
                                        $totalQuantitySold = 0;
                                        $purchase->quantity = 0;
                                        $purchases->shift();

                                    } else {
                                        $totalQuantitySold -= $saleQuantity;
                                        $purchase->quantity = $purchase->quantity - $totalQuantitySold;
                                        $totalCogs += $purchase->quantity * $purchase->cost;
                                        $saleQuantity -= $purchase->quantity;
                                        $purchase->quantity = 0;
                                        $purchases->shift();
                                    }

                                } else {
                                    $totalQuantitySold -= $saleQuantity;
                                    $totalQuantitySold -= $purchase->quantity;
                                    $purchase->quantity = 0;
                                    $purchases->shift();
                                }
                            }
                        } else {
                            $purchases->shift();
                        }


                    }

                }
            }
            $total_cogs_products += $totalCogs;

        }

        return [
            'total_cogs_products' => $total_cogs_products,
            'total_average_cost' => $total_average_cost
        ];


    }

    // Calculate the average cost of a product.
    public function averageCost($product_id, $start_date, $end_date, $warehouse_id, $array_warehouses_id)
    {
        // Get the cost of the product from the products table
        $product = Product::find($product_id);
        $product_cost = $product->cost;

        $purchases = PurchaseDetail::where('product_id', $product_id)
            ->join('purchases', 'purchases.id', '=', 'purchase_details.purchase_id')
            ->where('purchases.statut', 'received')
            ->where(function ($query) use ($warehouse_id, $array_warehouses_id) {
                if ($warehouse_id !== 0) {
                    return $query->where('purchases.warehouse_id', $warehouse_id)->where('purchases.statut', 'received');
                } else {
                    return $query->whereIn('purchases.warehouse_id', $array_warehouses_id)->where('purchases.statut', 'received');

                }
            })
            ->where('purchases.date', '<=', $end_date)
            ->select(
                'purchase_details.quantity as quantity',
                'purchase_details.total as total',
                'purchase_details.cost as cost',
                'purchases.GrandTotal as purchase_total'
            )
            ->get();

        $purchase_cost = 0;
        $purchase_quantity = 0;
        foreach ($purchases as $purchase) {
            $purchase_cost += $purchase->quantity * $purchase->cost;
            $purchase_quantity += $purchase->quantity;
        }

        // Adjustments are no longer used
        $adjustment_cost = 0;
        $adjustment_quantity = 0;

        // Calculate the average cost
        $total_cost = $purchase_cost + $adjustment_cost;
        $total_quantity = $purchase_quantity + $adjustment_quantity;
        if ($total_quantity === 0 || $total_quantity == 0 || $total_quantity == '0') {
            $average_cost = $product_cost;
        } else {
            $average_cost = $total_cost / $total_quantity;
        }

        return $average_cost;
    }


    //-------------------- report_top_products -------------\\

    public function report_top_products(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'Top_products', Product::class);

        $Role = Auth::user()->roles()->first();
        $view_records = Role::findOrFail($Role->id)->inRole('record_view');
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;

        $products_data = SaleDetail::join('sales', 'sale_details.sale_id', '=', 'sales.id')
            ->join('products', 'sale_details.product_id', '=', 'products.id')
            ->where(function ($query) use ($view_records) {
                if (!$view_records) {
                    return $query->where('sales.user_id', '=', Auth::user()->id);
                }
            })
            ->whereBetween('sale_details.date', array($request->from, $request->to))
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('products.name', 'LIKE', "%{$request->search}%")
                        ->orWhere('products.code', 'LIKE', "%{$request->search}%");
                });
            })
            ->select(
                DB::raw('products.name as name'),
                DB::raw('products.code as code'),
                DB::raw('count(*) as total_sales'),
                DB::raw('sum(total) as total'),
            )
            ->groupBy('products.name');

        $totalRows = $products_data->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }


        $products = $products_data->offset($offSet)
            ->limit($perPage)
            ->orderBy('total_sales', 'desc')
            ->get();


        return response()->json([
            'products' => $products,
            'totalRows' => $totalRows,
        ]);

    }


    //-------------------- report_top_customers -------------\\

    public function report_top_customers(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'Top_customers', Sale::class);

        $role = Auth::user()->roles()->first();
        $view_records = Role::findOrFail($role->id)->inRole('record_view');
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;

        $customers_count = Sale::where('sales.deleted_at', '=', null)
            ->where(function ($query) use ($view_records) {
                if (!$view_records) {
                    return $query->where('sales.user_id', '=', Auth::user()->id);
                }
            })

            ->select(DB::raw('sales.client_id'), DB::raw("count(*) as total_sales"))
            ->groupBy('sales.client_id')->get();

        $totalRows = $customers_count->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }

        $customers_data = Sale::where('sales.deleted_at', '=', null)
            ->where(function ($query) use ($view_records) {
                if (!$view_records) {
                    return $query->where('sales.user_id', '=', Auth::user()->id);
                }
            })

            ->select(
                DB::raw('sales.client_id as client_id'),
                DB::raw("count(*) as total_sales"),
                DB::raw('sum(GrandTotal) as total'),
            )
            ->groupBy('clients.name');

        $customers = $customers_data->offset($offSet)
            ->limit($perPage)
            ->orderBy('total_sales', 'desc')
            ->get();

        return response()->json([
            'customers' => $customers,
            'totalRows' => $totalRows,
        ]);

    }


    //----------------- Users Report -----------------------\\

    public function users_Report(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'users_report', User::class);

        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;
        $data = array();

        $users = User::where(function ($query) use ($request) {
            return $query->when($request->filled('search'), function ($query) use ($request) {
                return $query->where('username', 'LIKE', "%{$request->search}%");
            });
        });

        $totalRows = $users->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $users = $users->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        foreach ($users as $user) {
            $item['total_sales'] = DB::table('sales')
                ->where('deleted_at', '=', null)
                ->where('user_id', $user->id)
                ->count();

            $item['total_purchases'] = DB::table('purchases')
                ->where('deleted_at', '=', null)
                ->where('user_id', $user->id)
                ->count();

            $item['total_quotations'] = DB::table('quotations')
                ->where('deleted_at', '=', null)
                ->where('user_id', $user->id)
                ->count();

            $item['total_return_sales'] = DB::table('sale_returns')
                ->where('deleted_at', '=', null)
                ->where('user_id', $user->id)
                ->count();

            $item['total_return_purchases'] = DB::table('purchase_returns')
                ->where('deleted_at', '=', null)
                ->where('user_id', $user->id)
                ->count();

            $item['total_transfers'] = DB::table('transfers')
                ->where('deleted_at', '=', null)
                ->where('user_id', $user->id)
                ->count();

            $item['total_adjustments'] = DB::table('adjustments')
                ->where('deleted_at', '=', null)
                ->where('user_id', $user->id)
                ->count();

            $item['id'] = $user->id;
            $item['username'] = $user->username;
            $data[] = $item;
        }

        return response()->json([
            'report' => $data,
            'totalRows' => $totalRows,
        ]);

    }


    //-------------------- Get Sales By user -------------\\

    public function get_sales_by_user(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'users_report', User::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $sales = Sale::where('deleted_at', '=', null)->with('user', 'client', 'warehouse')
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            })
            ->where('user_id', $request->id)
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere('payment_statut', 'like', "%{$request->search}%")
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('client', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $sales->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $sales = $sales->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        $data = [];
        foreach ($sales as $sale) {
            $item['username'] = $sale['user']->username;
            $item['client_name'] = $sale['client']->name;
            $item['warehouse_name'] = $sale['warehouse']->name;
            $item['date'] = $sale->date;
            $item['Ref'] = $sale->Ref;
            $item['sale_id'] = $sale->id;
            $item['statut'] = $sale->statut;
            $item['GrandTotal'] = $sale->GrandTotal;
            $item['paid_amount'] = $sale->paid_amount;
            $item['due'] = $sale->GrandTotal - $sale->paid_amount;
            $item['payment_status'] = $sale->payment_statut;
            $item['shipping_status'] = $sale->shipping_status;

            $data[] = $item;
        }
        return response()->json([
            'totalRows' => $totalRows,
            'sales' => $data,
        ]);

    }

    //-------------------- Get Quotations By user -------------\\

    public function get_quotations_by_user(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'users_report', User::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;
        $data = array();

        $Quotations = Quotation::with('client', 'warehouse', 'user')
            ->where('deleted_at', '=', null)
            ->where('user_id', $request->id)
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            })
            //Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('client', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $Quotations->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $Quotations = $Quotations->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        foreach ($Quotations as $Quotation) {

            $item['id'] = $Quotation->id;
            $item['date'] = $Quotation->date;
            $item['Ref'] = $Quotation->Ref;
            $item['statut'] = $Quotation->statut;
            $item['username'] = $Quotation['user']->username;
            $item['warehouse_name'] = $Quotation['warehouse']->name;
            $item['client_name'] = $Quotation['client']->name;
            $item['GrandTotal'] = $Quotation->GrandTotal;

            $data[] = $item;
        }

        return response()->json([
            'quotations' => $data,
            'totalRows' => $totalRows,
        ]);
    }

    //-------------------- Get Purchases By user -------------\\

    public function get_purchases_by_user(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'users_report', User::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $data = array();

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $purchases = Purchase::where('deleted_at', '=', null)
            ->with('user', 'provider', 'warehouse')
            ->where('user_id', $request->id)
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            })
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere('payment_statut', 'like', "$request->search")
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('provider', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $purchases->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $purchases = $purchases->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        foreach ($purchases as $purchase) {
            $item['Ref'] = $purchase->Ref;
            $item['purchase_id'] = $purchase->id;
            $item['username'] = $purchase['user']->username;
            $item['provider_name'] = $purchase['provider']->name;
            $item['warehouse_name'] = $purchase['warehouse']->name;
            $item['statut'] = $purchase->statut;
            $item['GrandTotal'] = $purchase->GrandTotal;
            $item['paid_amount'] = $purchase->paid_amount;
            $item['due'] = $purchase->GrandTotal - $purchase->paid_amount;
            $item['payment_status'] = $purchase->payment_statut;

            $data[] = $item;
        }

        return response()->json([
            'totalRows' => $totalRows,
            'purchases' => $data,
        ]);

    }

    //-------------------- Get sale Returns By user -------------\\

    public function get_sales_return_by_user(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'users_report', User::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $data = array();

        //  Check If User Has Permission Show All Records
        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $SaleReturn = SaleReturn::where('deleted_at', '=', null)->with('user', 'client', 'warehouse')
            ->where('user_id', $request->id)
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            })
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere('payment_statut', 'like', "$request->search")
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('client', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $SaleReturn->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $SaleReturn = $SaleReturn->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        foreach ($SaleReturn as $Sale_Return) {
            $item['Ref'] = $Sale_Return->Ref;
            $item['return_sale_id'] = $Sale_Return->id;
            $item['statut'] = $Sale_Return->statut;
            $item['username'] = $Sale_Return['user']->username;
            $item['client_name'] = $Sale_Return['client']->name;
            $item['warehouse_name'] = $Sale_Return['warehouse']->name;
            $item['GrandTotal'] = $Sale_Return->GrandTotal;
            $item['paid_amount'] = $Sale_Return->paid_amount;
            $item['due'] = $Sale_Return->GrandTotal - $Sale_Return->paid_amount;
            $item['payment_status'] = $Sale_Return->payment_statut;

            $data[] = $item;
        }

        return response()->json([
            'totalRows' => $totalRows,
            'sales_return' => $data,
        ]);
    }

    //-------------------- Get purchase Returns By user -------------\\

    public function get_purchase_return_by_user(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'users_report', User::class);

        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $data = array();

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $PurchaseReturn = PurchaseReturn::where('deleted_at', '=', null)
            ->with('user', 'provider', 'warehouse')
            ->where('user_id', $request->id)
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            })
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere('payment_statut', 'like', "$request->search")
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('provider', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $PurchaseReturn->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $PurchaseReturn = $PurchaseReturn->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        foreach ($PurchaseReturn as $Purchase_Return) {
            $item['Ref'] = $Purchase_Return->Ref;
            $item['return_purchase_id'] = $Purchase_Return->id;
            $item['statut'] = $Purchase_Return->statut;
            $item['username'] = $Purchase_Return['user']->username;
            $item['provider_name'] = $Purchase_Return['provider']->name;
            $item['warehouse_name'] = $Purchase_Return['warehouse']->name;
            $item['GrandTotal'] = $Purchase_Return->GrandTotal;
            $item['paid_amount'] = $Purchase_Return->paid_amount;
            $item['due'] = $Purchase_Return->GrandTotal - $Purchase_Return->paid_amount;
            $item['payment_status'] = $Purchase_Return->payment_statut;

            $data[] = $item;
        }

        return response()->json([
            'totalRows' => $totalRows,
            'purchases_return' => $data,
        ]);

    }

    //-------------------- Get transfers By user -------------\\

    public function get_transfer_by_user(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'users_report', User::class);

        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $data = array();

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $transfers = Transfer::with('from_warehouse', 'to_warehouse')
            ->with('user')
            ->where('user_id', $request->id)
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->where('user_id', '=', Auth::user()->id);
                }
            })
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('Ref', 'LIKE', "%{$request->search}%")
                        ->orWhere('statut', 'LIKE', "%{$request->search}%")
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('from_warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('to_warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $transfers->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $transfers = $transfers->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        foreach ($transfers as $transfer) {
            $item['id'] = $transfer->id;
            $item['date'] = $transfer->date;
            $item['Ref'] = $transfer->Ref;
            $item['username'] = $transfer['user']->username;
            $item['from_warehouse'] = $transfer['from_warehouse']->name;
            $item['to_warehouse'] = $transfer['to_warehouse']->name;
            $item['GrandTotal'] = $transfer->GrandTotal;
            $item['items'] = $transfer->items;
            $item['statut'] = $transfer->statut;

            $data[] = $item;
        }
        return response()->json([
            'totalRows' => $totalRows,
            'transfers' => $data,
        ]);

    }

    //-------------------- Get adjustment By user -------------\\
    // Method removed - adjustments table no longer used

    public function get_adjustment_by_user(request $request)
    {
        return response()->json([
            'totalRows' => 0,
            'adjustments' => [],
        ]);
    }


    //----------------- stock Report -----------------------\\

    public function stock_Report(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'stock_report', Product::class);

        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;
        $data = array();


        //get warehouses assigned to user
        $user_auth = auth()->user();
        if ($user_auth->is_all_warehouses) {
            $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
            $warehouses_id = Warehouse::where('deleted_at', '=', null)->pluck('id')->toArray();
        } else {
            $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
            $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
        }

        $products_data = Product::with('unit')
            ->where('deleted_at', '=', null)
            // ->where('type', '!=', 'is_service')
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('products.name', 'LIKE', "%{$request->search}%")
                        ->orWhere('products.code', 'LIKE', "%{$request->search}%");
                });
            });

        $totalRows = $products_data->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $products = $products_data->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        foreach ($products as $product) {


            if ($product->type != 'is_service') {

                $item['id'] = $product->id;
                $item['code'] = $product->code;
                $item['name'] = $product->name;
                $item['category'] = $product['category']->name;

                $current_stock = product_warehouse::where('product_id', $product->id)
                    ->where('deleted_at', '=', null)
                    ->whereIn('warehouse_id', $warehouses_id)
                    ->where(function ($query) use ($request) {
                        return $query->when($request->filled('warehouse_id'), function ($query) use ($request) {
                            return $query->where('warehouse_id', $request->warehouse_id);
                        });
                    })
                    ->sum('qte');

                $item['quantity'] = $current_stock . ' ' . $product['unit']->ShortName;

                $data[] = $item;

            } else {

                $item['id'] = $product->id;
                $item['code'] = $product->code;
                $item['name'] = $product->name;
                $item['category'] = '';
                $item['quantity'] = '---';

                $data[] = $item;
            }



        }


        return response()->json([
            'report' => $data,
            'totalRows' => $totalRows,
            'warehouses' => $warehouses,
        ]);

    }

    //-------------------- Get Sales By product -------------\\

    public function get_sales_by_product(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'stock_report', Product::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $sale_details_data = SaleDetail::with('product', 'sale', 'sale.client', 'sale.warehouse')
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->whereHas('sale', function ($q) use ($request) {
                        $q->where('user_id', '=', Auth::user()->id);
                    });
                }
            })
            ->where('product_id', $request->id)
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where(function ($query) use ($request) {
                        return $query->whereHas('sale.client', function ($q) use ($request) {
                            $q->where('name', 'LIKE', "%{$request->search}%");
                        });
                    })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('sale.warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('sale', function ($q) use ($request) {
                                $q->where('Ref', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('product', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $sale_details_data->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $sale_details = $sale_details_data->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        $data = [];
        foreach ($sale_details as $detail) {


            //check if detail has sale_unit_id Or Null
            if ($detail->sale_unit_id !== null) {
                $unit = Unit::where('id', $detail->sale_unit_id)->first();
            } else {
                $product_unit_sale_id = Product::with('unitSale')
                    ->where('id', $detail->product_id)
                    ->first();

                if ($product_unit_sale_id['unitSale']) {
                    $unit = Unit::where('id', $product_unit_sale_id['unitSale']->id)->first();
                } {
                    $unit = NULL;
                }
            }

            if ($detail->product_variant_id) {
                $productsVariants = ProductVariant::where('product_id', $detail->product_id)
                    ->where('id', $detail->product_variant_id)->first();

                $product_name = '[' . $productsVariants->name . ']' . $detail['product']['name'];

            } else {
                $product_name = $detail['product']['name'];
            }

            $item['date'] = $detail->date;
            $item['Ref'] = $detail['sale']->Ref;
            $item['sale_id'] = $detail['sale']->id;
            $item['client_name'] = $detail['sale']['client']->name;
            $item['unit_sale'] = $unit ? $unit->ShortName : '';
            $item['warehouse_name'] = $detail['sale']['warehouse']->name;
            $item['quantity'] = $detail->quantity . ' ' . $item['unit_sale'];
            $item['total'] = $detail->total;
            $item['product_name'] = $product_name;

            $data[] = $item;
        }
        return response()->json([
            'totalRows' => $totalRows,
            'sales' => $data,
        ]);

    }

    //-------------------- Get quotations By product -------------\\

    public function get_quotations_by_product(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'stock_report', Product::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $quotation_details_data = QuotationDetail::with('product', 'quotation', 'quotation.client', 'quotation.warehouse')
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->whereHas('quotation', function ($q) use ($request) {
                        $q->where('user_id', '=', Auth::user()->id);
                    });
                }
            })
            ->where('product_id', $request->id)
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where(function ($query) use ($request) {
                        return $query->whereHas('quotation.client', function ($q) use ($request) {
                            $q->where('name', 'LIKE', "%{$request->search}%");
                        });
                    })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('quotation.warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('quotation', function ($q) use ($request) {
                                $q->where('Ref', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('product', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $quotation_details_data->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $quotation_details = $quotation_details_data->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        $data = [];
        foreach ($quotation_details as $detail) {

            //check if detail has sale_unit_id Or Null
            if ($detail->sale_unit_id !== null) {
                $unit = Unit::where('id', $detail->sale_unit_id)->first();
            } else {
                $product_unit_sale_id = Product::with('unitSale')
                    ->where('id', $detail->product_id)
                    ->first();
                if ($product_unit_sale_id['unitSale']) {
                    $unit = Unit::where('id', $product_unit_sale_id['unitSale']->id)->first();
                } {
                    $unit = NULL;
                }
            }

            if ($detail->product_variant_id) {
                $productsVariants = ProductVariant::where('product_id', $detail->product_id)
                    ->where('id', $detail->product_variant_id)->first();

                $product_name = '[' . $productsVariants->name . ']' . $detail['product']['name'];

            } else {
                $product_name = $detail['product']['name'];
            }

            $item['date'] = $detail['quotation']->date;
            $item['Ref'] = $detail['quotation']->Ref;
            $item['quotation_id'] = $detail['quotation']->id;
            $item['client_name'] = $detail['quotation']['client']->name;
            $item['warehouse_name'] = $detail['quotation']['warehouse']->name;
            $item['unit_sale'] = $unit ? $unit->ShortName : '';
            $item['quantity'] = $detail->quantity . ' ' . $item['unit_sale'];
            $item['total'] = $detail->total;
            $item['product_name'] = $product_name;

            $data[] = $item;
        }
        return response()->json([
            'totalRows' => $totalRows,
            'quotations' => $data,
        ]);

    }

    //-------------------- Get purchases By product -------------\\

    public function get_purchases_by_product(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'stock_report', Product::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $purchase_details_data = PurchaseDetail::with('product', 'purchase', 'purchase.provider', 'purchase.warehouse')
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->whereHas('purchase', function ($q) use ($request) {
                        $q->where('user_id', '=', Auth::user()->id);
                    });
                }
            })
            ->where('product_id', $request->id)
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where(function ($query) use ($request) {
                        return $query->whereHas('purchase.provider', function ($q) use ($request) {
                            $q->where('name', 'LIKE', "%{$request->search}%");
                        });
                    })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('purchase.warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('purchase', function ($q) use ($request) {
                                $q->where('Ref', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('product', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $purchase_details_data->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $purchase_details = $purchase_details_data->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        $data = [];
        foreach ($purchase_details as $detail) {

            //-------check if detail has purchase_unit_id Or Null
            if ($detail->purchase_unit_id !== null) {
                $unit = Unit::where('id', $detail->purchase_unit_id)->first();
            } else {
                $product_unit_purchase_id = Product::with('unitPurchase')
                    ->where('id', $detail->product_id)
                    ->first();
                $unit = Unit::where('id', $product_unit_purchase_id['unitPurchase']->id)->first();
            }

            if ($detail->product_variant_id) {
                $productsVariants = ProductVariant::where('product_id', $detail->product_id)
                    ->where('id', $detail->product_variant_id)->first();

                $product_name = '[' . $productsVariants->name . ']' . $detail['product']['name'];

            } else {
                $product_name = $detail['product']['name'];
            }

            $item['date'] = $detail['purchase']->date;
            $item['Ref'] = $detail['purchase']->Ref;
            $item['purchase_id'] = $detail['purchase']->id;
            $item['provider_name'] = $detail['purchase']['provider']->name;
            $item['warehouse_name'] = $detail['purchase']['warehouse']->name;
            $item['quantity'] = $detail->quantity . ' ' . $unit->ShortName;
            ;
            $item['total'] = $detail->total;
            $item['product_name'] = $product_name;
            $item['unit_purchase'] = $unit->ShortName;

            $data[] = $item;
        }
        return response()->json([
            'totalRows' => $totalRows,
            'purchases' => $data,
        ]);

    }

    //-------------------- Get purchases return By product -------------\\

    public function get_purchase_return_by_product(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'stock_report', Product::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $purchase_return_details_data = PurchaseReturnDetails::with('product', 'PurchaseReturn', 'PurchaseReturn.provider', 'PurchaseReturn.warehouse')
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->whereHas('PurchaseReturn', function ($q) use ($request) {
                        $q->where('user_id', '=', Auth::user()->id);
                    });
                }
            })
            ->where('quantity', '>', 0)
            ->where('product_id', $request->id)
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where(function ($query) use ($request) {
                        return $query->whereHas('PurchaseReturn.provider', function ($q) use ($request) {
                            $q->where('name', 'LIKE', "%{$request->search}%");
                        });
                    })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('PurchaseReturn.warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('PurchaseReturn', function ($q) use ($request) {
                                $q->where('Ref', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('product', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $purchase_return_details_data->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $purchase_return_details = $purchase_return_details_data->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        $data = [];
        foreach ($purchase_return_details as $detail) {

            //-------check if detail has purchase_unit_id Or Null
            if ($detail->purchase_unit_id !== null) {
                $unit = Unit::where('id', $detail->purchase_unit_id)->first();
            } else {
                $product_unit_purchase_id = Product::with('unitPurchase')
                    ->where('id', $detail->product_id)
                    ->first();
                $unit = Unit::where('id', $product_unit_purchase_id['unitPurchase']->id)->first();
            }

            if ($detail->product_variant_id) {
                $productsVariants = ProductVariant::where('product_id', $detail->product_id)
                    ->where('id', $detail->product_variant_id)->first();

                $product_name = '[' . $productsVariants->name . ']' . $detail['product']['name'];

            } else {
                $product_name = $detail['product']['name'];
            }

            $item['date'] = $detail['PurchaseReturn']->date;
            $item['Ref'] = $detail['PurchaseReturn']->Ref;
            $item['return_purchase_id'] = $detail['PurchaseReturn']->id;
            $item['provider_name'] = $detail['PurchaseReturn']['provider']->name;
            $item['warehouse_name'] = $detail['PurchaseReturn']['warehouse']->name;
            $item['quantity'] = $detail->quantity . ' ' . $unit->ShortName;
            ;
            $item['total'] = $detail->total;
            $item['product_name'] = $product_name;
            $item['unit_purchase'] = $unit->ShortName;

            $data[] = $item;
        }
        return response()->json([
            'totalRows' => $totalRows,
            'purchases_return' => $data,
        ]);

    }


    public function index()
    {
        $salesSummary = DB::table('sales')
            ->selectRaw("
                SUM(GrandTotal) as grossAmount,
                SUM(TaxNet) as tax,
                SUM(discount) as discount,
                SUM(CASE WHEN payment_statut = 'unpaid' THEN GrandTotal ELSE 0 END) as open,
                SUM(CASE WHEN orderType = 'cash' THEN GrandTotal ELSE 0 END) as cashSale,
                SUM(CASE WHEN orderType = 'credit_card' THEN GrandTotal ELSE 0 END) as creditCardSale,
                SUM(CASE WHEN orderType = 'voucher' THEN GrandTotal ELSE 0 END) as voucher,
                SUM(GrandTotal) - SUM(TaxNet) - SUM(discount) as netSale
            ")
            ->whereNull('deleted_at') // Exclude soft-deleted sales
            ->first();

        return response()->json($salesSummary);
    }

    //-------------------- Get sales return By product -------------\\

    public function get_sales_return_by_product(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'stock_report', Product::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $Sale_Return_details_data = SaleReturnDetails::with('product', 'SaleReturn', 'SaleReturn.client', 'SaleReturn.warehouse')
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->whereHas('SaleReturn', function ($q) use ($request) {
                        $q->where('user_id', '=', Auth::user()->id);
                    });
                }
            })
            ->where('quantity', '>', 0)
            ->where('product_id', $request->id)
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where(function ($query) use ($request) {
                        return $query->whereHas('SaleReturn.client', function ($q) use ($request) {
                            $q->where('name', 'LIKE', "%{$request->search}%");
                        });
                    })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('SaleReturn.warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('SaleReturn', function ($q) use ($request) {
                                $q->where('Ref', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('product', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $Sale_Return_details_data->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $Sale_Return_details = $Sale_Return_details_data->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        $data = [];
        foreach ($Sale_Return_details as $detail) {

            //check if detail has sale_unit_id Or Null
            if ($detail->sale_unit_id !== null) {
                $unit = Unit::where('id', $detail->sale_unit_id)->first();
            } else {
                $product_unit_sale_id = Product::with('unitSale')
                    ->where('id', $detail->product_id)
                    ->first();

                if ($product_unit_sale_id['unitSale']) {
                    $unit = Unit::where('id', $product_unit_sale_id['unitSale']->id)->first();
                } {
                    $unit = NULL;
                }

            }

            if ($detail->product_variant_id) {
                $productsVariants = ProductVariant::where('product_id', $detail->product_id)
                    ->where('id', $detail->product_variant_id)->first();

                $product_name = '[' . $productsVariants->name . ']' . $detail['product']['name'];

            } else {
                $product_name = $detail['product']['name'];
            }

            $item['date'] = $detail['SaleReturn']->date;
            $item['Ref'] = $detail['SaleReturn']->Ref;
            $item['return_sale_id'] = $detail['SaleReturn']->id;
            $item['client_name'] = $detail['SaleReturn']['client']->name;
            $item['warehouse_name'] = $detail['SaleReturn']['warehouse']->name;
            $item['unit_sale'] = $unit ? $unit->ShortName : '';
            $item['quantity'] = $detail->quantity . ' ' . $item['unit_sale'];
            $item['total'] = $detail->total;
            $item['product_name'] = $product_name;

            $data[] = $item;
        }
        return response()->json([
            'totalRows' => $totalRows,
            'sales_return' => $data,
        ]);

    }

    //-------------------- Get transfers By product -------------\\

    public function get_transfer_by_product(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'stock_report', Product::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $transfer_details_data = TransferDetail::with('product', 'transfer', 'transfer.from_warehouse', 'transfer.to_warehouse')
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->whereHas('transfer', function ($q) use ($request) {
                        $q->where('user_id', '=', Auth::user()->id);
                    });
                }
            })
            ->where('product_id', $request->id)
            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where(function ($query) use ($request) {
                        return $query->whereHas('transfer.from_warehouse', function ($q) use ($request) {
                            $q->where('name', 'LIKE', "%{$request->search}%");
                        });
                    })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('transfer.to_warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('transfer', function ($q) use ($request) {
                                $q->where('Ref', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('product', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $transfer_details_data->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $transfer_details = $transfer_details_data->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        $data = [];
        foreach ($transfer_details as $detail) {

            if ($detail->product_variant_id) {
                $productsVariants = ProductVariant::where('product_id', $detail->product_id)
                    ->where('id', $detail->product_variant_id)->first();

                $product_name = '[' . $productsVariants->name . ']' . $detail['product']['name'];

            } else {
                $product_name = $detail['product']['name'];
            }

            $item['date'] = $detail['transfer']->date;
            $item['Ref'] = $detail['transfer']->Ref;
            $item['from_warehouse'] = $detail['transfer']['from_warehouse']->name;
            $item['to_warehouse'] = $detail['transfer']['to_warehouse']->name;
            $item['product_name'] = $product_name;

            $data[] = $item;
        }
        return response()->json([
            'totalRows' => $totalRows,
            'transfers' => $data,
        ]);

    }
    public function getStockDetailInventory_audit(Request $request)
    {




        //     $currentBalance = $productBalances[$productId]['balance'];
        //     $currentAvgCost = $productBalances[$productId]['avg_cost'];

        //     // Calculate new balance
        //     $newBalance = $currentBalance + $stock->stockIn - $stock->StockOut;//jawad

        //     // Update the average cost if there is stock in
        //     if ($stock->stockIn > 0) {
        //         $newAvgCost = (($currentBalance * $currentAvgCost) + ($stock->stockIn * $stock->unit_price)) /
        //             max(($currentBalance + $stock->stockIn), 1);
        //     } else {
        //         $newAvgCost = $currentAvgCost;
        //     }

        //     // Append transaction data
        //     $report[] = [
        //         'date' => $stock->date,
        //         'product_name' => $stock->product_name,
        //         'product_id' => $stock->product_id,
        //         'opening_balance' => round($currentBalance, 2),
        //         'stock_in' => round($stock->stockIn, 2),
        //         'stock_in_value' => round($stock->stockIn * $stock->unit_price, 2),
        //         'stock_out' => round($stock->StockOut, 2),
        //         'stock_out_value' => round($stock->StockOut * $stock->unit_price, 2),
        //         'balance' => round($newBalance, 2),
        //         'unit_price' => round($stock->unit_price, 2),
        //         'avg_cost' => round($stock->unit_price, 2),//round($newAvgCost,2),
        //         'stock_type' => $stock->stock_type,
        //         'category_id' => $stock->department_category_id,
        //         'categories' => $stock->department_categories,
        //         'total_value' => round($newBalance * $stock->unit_price, 2),
        //     ];




        //     $tempcurrentBalance += round($currentBalance, 2);
        //     $tempstockIn += round($stock->stockIn, 2);
        //     $tempstockInval += round($stock->stockIn * $stock->unit_price, 2);
        //     $tempStockOut += round($stock->StockOut, 2);
        //     $tempStockOutval += round($stock->StockOut * $newAvgCost, 2);
        //     $tempnewBalance += round($newBalance, 2);
        //     $tempunit_price += round($stock->unit_price, 2);
        //     // $tempunit_price= round($stock->unit_price,2);//round($newAvgCost,2),
        //     $tempnewAvgCost += round($newBalance * $newAvgCost, 2);

        //     // Update running totals
        //     $productBalances[$productId]['balance'] = $newBalance;
        //     $gbalTotal += $newBalance;
        //     $productBalances[$productId]['avg_cost'] = $newAvgCost;
        //     $productBalances[$productId]['total_stock_in'] += $stock->stockIn;
        //     $productBalances[$productId]['total_stock_out'] += $stock->StockOut;
        //     $productBalances[$productId]['total_stock_in_value'] += $stock->stockIn * $stock->unit_price;
        //     $productBalances[$productId]['total_stock_out_value'] += $stock->StockOut * $stock->unit_price;
        //     $productBalances[$productId]['total_value'] = $newBalance * $newAvgCost;

        //     // Store product name for summary row
        //     $productTotals[$productId] = $productBalances[$productId];
        // }

        // // Add summary rows after all transactions for each product
        // $finalReport = [];
        // $currentProductId = null;

        // foreach ($report as $index => $row) {
        //     $finalReport[] = $row;

        //     // Check if this is the last row for the current product
        //     if (
        //         !isset($report[$index + 1]) || // No next row
        //         $report[$index + 1]['product_id'] !== $row['product_id'] // Next row belongs to a different product
        //     ) {
        //         $finalReport[] = [
        //             'date' => 'Summary',
        //             'product_name' => $productTotals[$row['product_id']]['product_name'],
        //             'opening_balance' => null,
        //             'stock_in' => round($productTotals[$row['product_id']]['total_stock_in'], 2),
        //             'stock_out' => round($productTotals[$row['product_id']]['total_stock_out'], 2),
        //             'stock_in_value' => round($productTotals[$row['product_id']]['total_stock_in_value'], 2),
        //             'stock_out_value' => round($productTotals[$row['product_id']]['total_stock_out_value'], 2),
        //             'balance' => round($productTotals[$row['product_id']]['balance'], 2),
        //             'unit_price' => null,
        //             'avg_cost' => round($productTotals[$row['product_id']]['avg_cost'], 2),
        //             'stock_type' => 'Summary',
        //             'category_id' => $productTotals[$row['product_id']]['category_id'],
        //             'categories' => $productTotals[$row['product_id']]['categories'],
        //             'total_value' => round($productTotals[$row['product_id']]['total_value'], 2),
        //         ];

        //     }
        // }
        // $finalReport[] = [


        //     'date' => 'Total',
        //     'product_name' => '',
        //     'opening_balance' => round($tempcurrentBalance, 2),
        //     'stock_in' => round($tempstockIn, 2),
        //     'stock_out' => round($tempStockOut, 2),
        //     'stock_in_value' => round($tempstockInval, 2),
        //     'stock_out_value' => round($tempStockOutval, 2),
        //     'balance' => round($tempnewBalance, 2),
        //     'unit_price' => round($tempnewAvgCost, 2),
        //     'avg_cost' => round($tempnewAvgCost, 2),
        //     'stock_type' => '',
        //     'category_id' => '',
        //     'categories' => '',
        //     'total_value' => round($tempnewAvgCost, 2),
        // ];
        // // $finalReport[] = [
        // //     'date' => '',
        // //     'product_name' => '',
        // //     'opening_balance' => '',
        // //     'stock_in' => '',
        // //     'stock_out' => '',
        // //     'stock_in_value' => '',
        // //     'stock_out_value' => '',
        // //     'balance' => round($gbalTotal, 2),
        // //     'unit_price' => '',
        // //     'avg_cost' => '',
        // //     'stock_type' => '',
        // //     'category_id' => '',
        // //     'categories' => '',
        // //     'total_value' => '',
        // // ];
        // // Group the final report by category_id
        // $groupedReport = [];
        // foreach ($finalReport as $item) {
        //     $category_id = $item['category_id'];
        //     if (!isset($groupedReport[$category_id])) {
        //         $groupedReport[$category_id] = [];
        //     }
        //     $groupedReport[$category_id][] = $item;
        // }

        // return response()->json($groupedReport);
    }

    public function getStockDetailInventory_auditnew(Request $request)
    {


        $fromDate = $request->input('from_date');
        $toDate = $request->input('to_date');
        $product = $request->input('product');
        $warehouse_id = $request->input('warehouse_id');




        $openingStock = DB::table('stock_maintenance as sm')
            ->selectRaw('sm.department_category_id, sm.product_id,
                         SUM(sm.StockIn - sm.StockOut) AS opening_balance,
                         CASE WHEN SUM(sm.StockIn - sm.StockOut) > 0
                         THEN SUM(sm.StockIn * sm.unit_price) / NULLIF(SUM(sm.StockIn), 0)
                         ELSE 0 END AS avg_cost_price')
            ->where('sm.date', '<', '2025-03-25')
            ->where('sm.warehouse_id', 2)
            ->whereNull('sm.deleted_at')
            ->groupBy('sm.department_category_id', 'sm.product_id');


        $transactions = DB::table('stock_maintenance as sm')
            ->leftJoin('products as p', 'sm.product_id', '=', 'p.id')
            ->leftJoin('units as u', 'sm.unit_id', '=', 'u.id')
            ->leftJoin('department_categories as dc', 'sm.department_category_id', '=', 'dc.id')
            ->leftJoinSub($openingStock, 'os', function ($join) {
                $join->on('sm.department_category_id', '=', 'os.department_category_id')
                    ->on('sm.product_id', '=', 'os.product_id');
            })
            ->select(
                'sm.*',
                'p.name as product_name',
                'u.name as unit_name',
                'dc.name as department_name',
                DB::raw('COALESCE(os.opening_balance, 0) AS opening_qty'),
                DB::raw('ROUND(COALESCE(os.avg_cost_price, 0), 2) AS opening_avg_cost')
            )
            ->whereBetween('sm.date', ['2025-03-25', '2025-03-28'])
            ->where('sm.warehouse_id', 2)
            ->whereNull('sm.deleted_at')
            ->orderBy('sm.product_id')
            ->orderBy('sm.date')
            ->get();


        $report = [];

        foreach ($transactions as $i => $stock) {
            $currentBalance = $stock->opening_qty;
            $newBalance = $currentBalance + $stock->StockIn - $stock->StockOut;

            $report[] = [
                'date' => $stock->date,
                'product_name' => $stock->product_name,
                'product_id' => $stock->product_id,
                'opening_balance' => round($currentBalance, 2),
                'stock_in' => round($stock->StockIn, 2),
                'stock_in_value' => round($stock->StockIn * $stock->unit_price, 2),
                'stock_out' => round($stock->StockOut, 2),
                'stock_out_value' => round($stock->StockOut * $stock->unit_price, 2),
                'balance' => round($newBalance, 2),
                'unit_price' => round($stock->unit_price, 2),
                'avg_cost' => round($stock->unit_price, 2), // Placeholder for avg cost calculation
                'stock_type' => $stock->stock_type . $i,
                'category_id' => $stock->department_category_id,
                'categories' => $stock->department_name, // Renamed from department_categories to match the query
                'total_value' => round($newBalance * $stock->unit_price, 2),
            ];
        }
        //jawad
        return response()->json($report);
    }
    public function getStockDetailInventory(Request $request)
    {
        $fromDate = $request->input('from_date');
        $toDate = $request->input('to_date');
        $product = $request->input('product');
        $warehouse_id = $request->input('warehouse_id');
        $DepId = 0;

        $ProdId = 0;
        // Build the query with optional product filter
        $query = DB::table('stock_maintenance')
            ->join('products', 'stock_maintenance.product_id', '=', 'products.id')
            ->join('department_categories', 'department_categories.id', '=', 'stock_maintenance.department_category_id')
            ->select(
                'stock_maintenance.date as date',
                'stock_maintenance.unit_price',
                'products.name as product_name',
                'stock_maintenance.stockIn',
                'stock_maintenance.StockOut',
                'stock_maintenance.product_id',
                'stock_maintenance.stock_type',
                'stock_maintenance.department_category_id',
                // 'products.department_category_id',
                'department_categories.name as department_categories'

            )
            ->whereBetween('stock_maintenance.date', [$fromDate, $toDate])
            ->whereNull('stock_maintenance.deleted_at');

        // Apply product filter if $product is not null
        if ($product) {
            $query->where('stock_maintenance.product_id', $product);
        }

        if ($warehouse_id) {
            $query->where('stock_maintenance.warehouse_id', $warehouse_id);
        }

        //category filter
        if (!empty($request->categories)) {
            $query->whereIn('stock_maintenance.department_category_id', $request->categories);
        }

        $stockDetails = $query
            //
            ->orderBy('stock_maintenance.department_category_id')->orderBy('stock_maintenance.date')
            ->get();

        // Prepare the running balance, average cost, and totals
        $report = [];

        $previousreport = [];
        $productBalances = []; // To track running balance per product
        $productTotals = [];   // To track totals for each product
        $gbalTotal = 0;

        $tempcurrentBalance = 0;
        $tempstockIn = 0;
        $tempstockInval = 0;
        $tempStockOut = 0;
        $tempStockOutval = 0;
        $tempnewBalance = 0;
        $tempunit_price = 0;
        // $tempunit_price= round($stock->unit_price,2);//round($newAvgCost,2),
        $tempnewAvgCost = 0;
        $productOpBalance = 0.0;
        $productOpvalue = 0.0;

        $i = 0;
        foreach ($stockDetails as $stock) {

            $productId = $stock->product_id;





            // Initialize for new product
            if (!isset($productBalances[$productId])) {
                $productBalances[$productId] = [
                    'balance' => 0,
                    'avg_cost' => 0,
                    'total_stock_in' => 0,
                    'total_stock_out' => 0,
                    'total_value' => 0,
                    'total_stock_in_value' => 0,
                    'total_stock_out_value' => 0,
                    'product_name' => $stock->product_name,
                    'product_id' => $stock->product_id,
                    'category_id' => $stock->department_category_id,

                    'categories' => $stock->department_categories
                ];

                // Fetch the opening balance and average cost
                $openingData = DB::table('stock_maintenance')
                    ->where('product_id', $productId)
                    ->whereNull('stock_maintenance.deleted_at')
                    ->where('date', '<', $fromDate)
                    ->where('stock_maintenance.warehouse_id', $warehouse_id)
                    ->where('stock_maintenance.department_category_id', $stock->department_category_id)
                    ->select(
                        DB::raw('SUM(stockIn - StockOut) as opening_balance'),
                        DB::raw('SUM(stockIn * unit_price) / NULLIF(SUM(stockIn), 0) as avg_opening_cost'),
                    )



                    ->first();

                $productBalances[$productId]['balance'] = $openingData->opening_balance ?: 0;
                $productBalances[$productId]['avg_cost'] = $openingData->avg_opening_cost ?: 0;

                $productOpBalance += $productBalances[$productId]['balance'];
                $productOpvalue += $productBalances[$productId]['avg_cost'];

            }


            if ($DepId != $stock->department_category_id && $DepId != 0) {


                // Fetch the opening balance and average cost
                $openingData = DB::table('stock_maintenance')
                    ->where('product_id', $productId)
                    ->whereNull('stock_maintenance.deleted_at')
                    ->where('date', '<', $fromDate)
                    ->where('stock_maintenance.warehouse_id', $warehouse_id)
                    ->where('stock_maintenance.department_category_id', $stock->department_category_id)

                    ->select(
                        DB::raw('SUM(stockIn - StockOut) as opening_balance'),
                        DB::raw('SUM(stockIn * unit_price) / NULLIF(SUM(stockIn), 0) as avg_opening_cost'),
                        DB::raw('unit_price')
                    )



                    ->first();

                $productBalances[$productId]['balance'] = $openingData->opening_balance ?: 0;
                $productBalances[$productId]['avg_cost'] = $openingData->avg_opening_cost ?: 0;
                $productOpBalance += $productBalances[$productId]['balance'];
                // $productOpvalue =  $productBalances[$productId]['avg_cost'];

            }
            // if($ProdId !=  $productId && $ProdId !=  0){

            //     $report[] = [
            //         'date' => 'Summary',
            //         'product_name' => $previousreport[0]['product_name'],// Fixed indexing
            //         'product_id' =>$previousreport[0]['product_id'],
            //         'opening_balance' => $previousreport[0]['opening_balance'],
            //         'stock_in' => round($tempstockIn,2),
            //         'stock_in_value' =>  round($tempstockInval,2),
            //         'stock_out' =>round($tempStockOut ,2),
            //         'stock_out_value' =>round( $tempStockOutval,2),
            //         'balance' => $previousreport[0]['balance'],
            //         'unit_price' => '',
            //         'avg_cost' => '',
            //         'stock_type' => 'Summary'." ".$productId." ".$ProdId,
            //         'category_id' => $previousreport[0]['category_id'],
            //         'categories' => $previousreport[0]['categories'],
            //         'total_value' => $previousreport[0]['total_value'],

            //     ];
            //         $tempcurrentBalance =0;
            //         $tempstockIn  =0;
            //         $tempstockInval  =0;
            //         $tempStockOut  =0;
            //         $tempStockOutval =0;
            //         $tempnewBalance =0;
            //         $tempunit_price =0;
            //         // $tempunit_price= round($stock->unit_price,2);//round($newAvgCost,2),
            //         $tempnewAvgCost  =0;
            //         $i=0;
            // }




            $currentBalance = $productBalances[$productId]['balance'];
            $currentAvgCost = $productBalances[$productId]['avg_cost'];

            // Calculate new balance
            $newBalance = $currentBalance + $stock->stockIn - $stock->StockOut;

            // Update the average cost if there is stock in
            if ($stock->stockIn > 0) {
                $newAvgCost = (($currentBalance * $currentAvgCost) + ($stock->stockIn * $stock->unit_price)) /
                    max(($currentBalance + $stock->stockIn), 1);
            } else {
                $newAvgCost = $currentAvgCost;
            }



            //     if($DepId !=  $stock->department_category_id && $DepId !=  0){

            //         $report[] = [
            //             'date' => 'Summary',
            //             'product_name' => $previousreport[0]['product_name'],// Fixed indexing
            //             'product_id' =>$previousreport[0]['product_id'],
            //             'opening_balance' => $previousreport[0]['opening_balance'],
            //             'stock_in' => round($tempstockIn,2),
            //             'stock_in_value' =>  round($tempstockInval,2),
            //             'stock_out' =>round($tempStockOut ,2),
            //             'stock_out_value' =>round( $tempStockOutval,2),
            //             'balance' => $previousreport[0]['balance'],
            //             'unit_price' => '',
            //             'avg_cost' => '',
            //             'stock_type' => 'Summary',
            //             'category_id' => $previousreport[0]['category_id'],
            //             'categories' => $previousreport[0]['categories'],
            //             'total_value' => $previousreport[0]['total_value'],



            //         ];







            //         $tempcurrentBalance =0;
            //         $tempstockIn  =0;
            //         $tempstockInval  =0;
            //         $tempStockOut  =0;
            //         $tempStockOutval =0;
            //         $tempnewBalance =0;
            //         $tempunit_price =0;
            //         // $tempunit_price= round($stock->unit_price,2);//round($newAvgCost,2),
            //         $tempnewAvgCost  =0;
            //         $i=0;
            // }






            $tempcurrentBalance += round($currentBalance, 2);
            $tempstockIn += round($stock->stockIn, 2);
            $tempstockInval += round($stock->stockIn * $stock->unit_price, 2);
            $tempStockOut += round($stock->StockOut, 2);
            $tempStockOutval += round($stock->StockOut * $stock->unit_price, 2);
            $tempnewBalance += round($newBalance, 2);
            $tempunit_price += round($stock->unit_price, 2);
            // $tempunit_price= round($stock->unit_price,2);//round($newAvgCost,2),
            $tempnewAvgCost += round($newBalance * $stock->unit_price, 2);

            // Append transaction data
            $report[] = [
                'date' => $stock->date,
                'product_name' => $stock->product_name,
                'product_id' => $stock->product_id,
                'opening_balance' => round($currentBalance, 2),
                'stock_in' => round($stock->stockIn, 2),
                'stock_in_value' => round($stock->stockIn * $stock->unit_price, 2),
                'stock_out' => round($stock->StockOut, 2),
                'stock_out_value' => round($stock->StockOut * $stock->unit_price, 2),
                'balance' => round($newBalance, 2),
                'unit_price' => round($stock->unit_price, 2),
                'avg_cost' => round($stock->unit_price, 2),//round($newAvgCost,2),
                'stock_type' => $stock->stock_type . $i,
                'category_id' => $stock->department_category_id,

                'categories' => $stock->department_categories,
                'total_value' => round($newBalance * $stock->unit_price, 2),
            ];
            // if($previousreport){
            //     $report[] = [
            //         'date' => 'Summary',
            //         'product_name' => $previousreport[0]['product_name'],// Fixed indexing
            //         'product_id' => $previousreport[0]['product_id'],
            //         'opening_balance' => $previousreport[0]['opening_balance'],
            //         'stock_in' => round($tempstockIn,2),
            //         'stock_in_value' =>  round($tempstockInval,2),
            //         'stock_out' =>round($tempStockOut ,2),
            //         'stock_out_value' =>round( $tempStockOutval,2),
            //         'balance' => $previousreport[0]['balance'],
            //         'unit_price' => '',
            //         'avg_cost' => '',
            //         'stock_type' => 'Summary'." ".$stock->product_id." ".$ProdId,
            //         'category_id' => $previousreport[0]['category_id'],
            //         'categories' => $previousreport[0]['categories'],
            //         'total_value' => $previousreport[0]['total_value'],
            //     ];
            // }








            // Update running totals
            $productBalances[$productId]['balance'] = $newBalance;
            $gbalTotal += $newBalance;
            $productBalances[$productId]['avg_cost'] = $newAvgCost;
            $productBalances[$productId]['total_stock_in'] += $stock->stockIn;
            $productBalances[$productId]['total_stock_out'] += $stock->StockOut;
            $productBalances[$productId]['total_stock_in_value'] += $stock->stockIn * $stock->unit_price;
            $productBalances[$productId]['total_stock_out_value'] += $stock->StockOut * $stock->unit_price;
            $productBalances[$productId]['total_value'] = $newBalance * $newAvgCost;

            // Store product name for summary row
            $productTotals[$productId] = $productBalances[$productId];




            $previousreport = [];

            $previousreport[] = [
                'date' => 'Summary',
                'product_name' => $stock->product_name,
                'product_id' => $stock->product_id,
                'opening_balance' => null,
                'stock_in' => round($stock->stockIn, 2),
                'stock_in_value' => round($stock->stockIn * $stock->unit_price, 2),
                'stock_out' => round($stock->StockOut, 2),
                'stock_out_value' => round($stock->StockOut * $stock->unit_price, 2),
                'balance' => round($newBalance, 2),
                'unit_price' => round($stock->unit_price, 2),
                'avg_cost' => round($stock->unit_price, 2),//round($newAvgCost,2),
                'stock_type' => 'Summary',
                'category_id' => $stock->department_category_id,

                'categories' => $stock->department_categories,
                'total_value' => round($newBalance * $stock->unit_price, 2),

            ];






            $DepId = $stock->department_category_id;

            $ProdId = $stock->product_id;

            $i++;

        }

        // Add summary rows after all transactions for each product
        $finalReport = [];
        $currentProductId = null;

        foreach ($report as $index => $row) {
            $finalReport[] = $row;

            // Check if this is the last row for the current product
            if (
                !isset($report[$index + 1]) || // No next row
                $report[$index + 1]['product_id'] !== $row['product_id'] // Next row belongs to a different product

            ) {
                // $finalReport[] = [
                //     'date' => 'SummaryT',
                //     'product_name' => $productTotals[$row['product_id']]['product_name'],
                //     'opening_balance' => null,
                //     'stock_in' => round($productTotals[$row['product_id']]['total_stock_in'], 2),
                //     'stock_out' => round($productTotals[$row['product_id']]['total_stock_out'], 2),
                //     'stock_in_value' => round($productTotals[$row['product_id']]['total_stock_in_value'], 2),
                //     'stock_out_value' => round($productTotals[$row['product_id']]['total_stock_out_value'], 2),
                //     'balance' => round($productTotals[$row['product_id']]['balance'], 2),
                //     'unit_price' => null,
                //     'avg_cost' => round($productTotals[$row['product_id']]['avg_cost'], 2),
                //     'stock_type' => 'Summary',
                //     'category_id' => $productTotals[$row['product_id']]['category_id'],

                //     'categories' => $productTotals[$row['product_id']]['categories'],
                //     'total_value' => round($productTotals[$row['product_id']]['total_value'], 2),
                // ];

            }
        }
        #
        $unitprice = 0;
        $stockbalqty = round($productOpBalance + $tempstockIn - $tempStockOut, 2);
        $opval = $productOpBalance * $unitprice;
        $stockvalue = round($tempstockInval - $tempStockOutval, 2);
        $finalReport[] = [



            'date' => 'Total',
            'product_name' => '',
            'opening_balance' => round($productOpBalance, 2),
            'stock_in' => round($tempstockIn, 2),
            'stock_out' => round($tempStockOut, 2),
            'stock_in_value' => round($tempstockInval, 2),
            'stock_out_value' => round($tempStockOutval, 2),
            'balance' => $stockbalqty,
            'unit_price' => $row['product_id'],
            'avg_cost' => null,
            'stock_type' => null,
            'category_id' => '',

            'categories' => '',
            'total_value' => $stockvalue,
        ];
        // $finalReport[] = [
        //     'date' => '',
        //     'product_name' => '',
        //     'opening_balance' => '',
        //     'stock_in' => '',
        //     'stock_out' => '',
        //     'stock_in_value' => '',
        //     'stock_out_value' => '',
        //     'balance' => round($gbalTotal, 2),
        //     'unit_price' => '',
        //     'avg_cost' => '',
        //     'stock_type' => '',
        //     'category_id' => '',
        //     'categories' => '',
        //     'total_value' => '',
        // ];
        // Group the final report by category_id
        $groupedReport = [];
        foreach ($finalReport as $item) {
            $category_id = $item['category_id'];
            if (!isset($groupedReport[$category_id])) {
                $groupedReport[$category_id] = [];
            }
            $groupedReport[$category_id][] = $item;
        }

        return response()->json($groupedReport);
    }

    public function getAverageCostForRemainingStock($productId, $date, $remainingStock)
    {

        $datehead = 'date';

        // Fetch purchases sorted by date (FIFO method) up to the given date
        $purchases = DB::table('stock_maintenance')
            ->where('product_id', $productId)
            ->where('date', '<=', $date)
            ->where('type', '=', 'in')
            // ->where('warehouse_id', 1)
            ->where('deleted_at', '=', null)
            ->select('unit_price', 'stockIn')
            ->orderBy('created_at', 'asc')
            ->get();

        $remainingQuantity = $remainingStock;
        $totalCost = 0;

        $rate = 0;

        foreach ($purchases as $purchase) {


            if ($purchase->unit_price != 0) {
                $rate = $purchase->unit_price;
            }



            if ($remainingQuantity <= 0) {
                break; // Stop if we've accounted for the remaining stock
            }

            if ($purchase->stockIn <= $remainingQuantity) {
                // Use the full quantity from this purchase
                $totalCost += $rate * $purchase->stockIn;
                $remainingQuantity -= $purchase->stockIn;
            } else {
                // Use only the remaining quantity needed from this purchase
                $totalCost += $rate * $remainingQuantity;
                $remainingQuantity = 0; // All remaining stock accounted for
            }
        }

        // Calculate the average cost
        $averageCost = $remainingStock > 0 ? $totalCost / $remainingStock : 0;

        return $averageCost;
    }




      public function getDistinctProducts($categoryId)
{
    $productIds = DB::table('stock_maintenance')
        ->leftJoin('products', 'stock_maintenance.product_id', '=', 'products.id')
        ->where('products.category_id', $categoryId)
        // ->where('products.id',  380)
        ->distinct('product_id')
        ->pluck('product_id');

    return response()->json(['product_ids' => $productIds]);
}

public function updateProductCOGS(Request $request)
{
    $productId = $request->product_id;
    $categoryId = $request->category_id;

    $warehouses = DB::table('warehouses') ->orderBy('id')->get();
    $output = [];

    // foreach ($warehouses as $warehouse) {
        $warehouseId =  1;// $warehouse->id;

        $records = DB::table('stock_maintenance')
            ->leftJoin('products', 'stock_maintenance.product_id', '=', 'products.id')
            ->where('stock_maintenance.product_id', $productId)
            ->where('products.category_id', $categoryId)
            ->where('stock_maintenance.warehouse_id', $warehouseId)
            ->whereNull('stock_maintenance.deleted_at')
            ->orderBy('stock_maintenance.date')
            ->orderBy('stock_maintenance.stockIn', 'desc')
            ->get(['stock_maintenance.*']);

        $totalQty = 0;
        $totalCost = 0;
        $lastAverageCost = 0;
        $unit_cost = 0;
        foreach ($records as $record) {
            if ($record->stockIn > 0) {

                if($record->stock_type == 'PR'){
                    $unit_cost = $record->unit_price;
                }
                $totalCost += $record->stockIn * $unit_cost;
                $totalQty += $record->stockIn;

                if (round($totalQty,2) > 0) {
                    $lastAverageCost = round($totalCost / $totalQty,2);
                }



                $averageCost = (round($totalQty,2) > 0) ? (round($totalCost / $totalQty,2)) : $lastAverageCost;


                if ($record->stock_type == 'AD' || $record->stock_type == 'TRF' || $record->stock_type == 'PD') {

                    DB::table('stock_maintenance')
                        ->whereIn('stock_type', ['AD','TRF','PD'])
                        ->where('type', 'in')
                        ->where('purchased_id', $record->purchased_id)
                        ->where('warehouse_id', $warehouseId)
                        ->where('product_id', $productId)
                        ->update([
                            'unit_price' => $averageCost,
                            'total' => ($record->stockIn + $record->StockOut) * $averageCost,
                        ]);
                }

                $output[] = 'Warehouse: ' .$record->stock_type.'_'. $record->purchased_id. ' | IN => ID=' . $record->id . ' | Qty=' . $totalQty . ' | Cost=' . $totalCost . ' | Avg=' . $lastAverageCost;
            } elseif ($record->StockOut > 0) {

                $averageCost = (round($totalQty,2) > 0) ? (round($totalCost / $totalQty,2)) : $lastAverageCost;

                DB::table('stock_maintenance')
                    ->where('id', $record->id)
                    ->update([
                        'unit_price' => $averageCost,
                        'total' => ($record->stockIn + $record->StockOut) * $averageCost,
                    ]);

                $output[] = 'Warehouse: ' . $record->stock_type.'_'. $record->purchased_id. ' | OUT => ID=' . $record->id . ' | Qty=' . $totalQty . ' | Cost=' . $totalCost . ' | Avg=' . $averageCost;

                // if ($record->stock_type == 'TRF') {
                //     DB::table('stock_maintenance')
                //         ->where('stock_type', 'TRF')
                //         ->where('type', 'out')
                //         ->where('purchased_id', $record->purchased_id)
                //         ->where('product_id', $productId)
                //         ->update([
                //             'unit_price' => $averageCost,
                //             'total' => ($record->stockIn + $record->StockOut) * $averageCost,
                //         ]);
                // }

                $totalQty -= $record->StockOut;
                $totalCost -= $averageCost * $record->StockOut;
            // }
        }
    }

    return response()->json(['status' => $output]);
}

    public function updateSalesCost3(Request $request)
    {



        // ini_set('max_execution_time', 0);
        $sales = Sale::with('details')->where('id', '=', '47')->whereNull('deleted_at')->get(); // Assuming a relation 'details' on Sales

        foreach ($sales as $order) {
            $total_cost = 0;

            // Calculate total cost from sales details
            foreach ($order->details as $detail) {
                $total_cost += $detail->total;
            }

            // Delete old ledger entries if needed
            AccountsLedger::where('voucher_number', $order->id)
                ->where('voucher_type', 'SL')
                ->delete();

            // 1. Customer A/R Debit
            $this->ledgerService->createLedgerEntry(
                $order->id,
                'SL',
                AccountCodes::CUSTOMER_ACCOUNTS_RECEIVABLE,
                $order->GrandTotal,
                0,
                'Record POS RCV # ' . $order->Ref,
                $order->id,
                $order->date
            );



            if ($order->discount > 0) {
                $this->ledgerService->createLedgerEntry(
                    $order->id,
                    'SL',
                    AccountCodes::SALES_DISCOUNT,
                    $order->discount,
                    0,
                    'Record POS Discount # ' . $order->Ref,
                    $order->id,
                    $order->date
                );
            }


            if ($order->shipping > 0) {
                $this->ledgerService->createLedgerEntry(
                    $order->id,
                    'SL',
                    AccountCodes::SHIPPING,
                    $order->shipping,
                    0,
                    'Record POS Shipping Charges # ' . $order->Ref,
                    $order->id,
                    $order->date
                );
            }





            $this->ledgerService->createLedgerEntry(
                $order->id,
                'SL',
                AccountCodes::DINE_IN_FOOD_SALES,
                0,
                $order->GrandTotal + $order->shipping,
                'Record POS Sale # ' . $order->Ref,
                $order->id,
                $order->date
            );

            if ($order->shipping > 0) {
                $this->ledgerService->createLedgerEntry(
                    $order->id,
                    'SL',
                    AccountCodes::SHIPPING_PAYABLE,
                    0,
                    $order->shipping,
                    'Record POS Shipping Charges Payable # ' . $order->Ref,
                    $order->id,
                    $order->date
                );
            }

            // 3. Cost of Goods Sold Debit
            $this->ledgerService->createLedgerEntry(
                $order->id,
                'SL',
                AccountCodes::PURCHASES,
                $total_cost,
                0,
                'Record POS COGS #' . $order->Ref,
                $order->id,
                $order->date
            );

            // 4. Raw Material Inventory Credit
            $this->ledgerService->createLedgerEntry(
                $order->id,
                'SL',
                AccountCodes::RAW_MATERIAL,
                0,
                $total_cost,
                'Record POS COGS #' . $order->Ref,
                $order->id,
                $order->date
            );
        }


    }



    public function updateSalesCost2(Request $request)
    {

        $stockItems = DB::table('stock_maintenance')
            ->leftJoin('products', 'products.id', '=', 'stock_maintenance.product_id')
            ->where('products.not_selling', 1)
            // ->where('products.id', 667)
            ->whereIn('stock_maintenance.stock_type', ['AD', 'TRF', 'PD'])
            ->whereDate('stock_maintenance.date', '<=', '2025-05-12')
            ->whereNull('stock_maintenance.deleted_at')
            ->select('stock_maintenance.*') // or specify columns you need
            ->get();


        $date = '2025-05-12';

        foreach ($stockItems as $product) {
            $remainingStock = DB::table('stock_maintenance')
                ->selectRaw('SUM(stockIn - stockOut) as remainingStock')
                ->where('product_id', $product->product_id)
                ->where('date', '<=', '2025-05-12')
                // ->where('stock_maintenance.warehouse_id', 1)
                ->whereNull('deleted_at')
                ->value('remainingStock');

            if ($remainingStock == 0) {
                $remainingStock = 1;
            }

            $avg = $this->getAverageCostForRemainingStock($product->product_id, $date, $remainingStock ?? 0);
            $averageCost = $avg * ($product->StockOut + $product->StockOut);



            DB::table('stock_maintenance')
                ->where('id', $product->id)
                ->update([
                    'unit_price' => $avg,
                    'total' => $averageCost
                ]);


        }


        return response()->json($stockItems);
    }
    public function updateSalesCost(Request $request)
    {

        ini_set('max_execution_time', 0); // unlimited for heavy processing

        $date = '2025-06-06';
        $datefrom = '2025-05-14';

        DB::table('sale_details')
            ->leftJoin('products', 'products.id', '=', 'product_id')
            ->whereBetween('date', [$datefrom, $date])
            ->orderBy('sale_details.id')
            ->select('sale_details.*', 'products.type') // ensure `type` is loaded
            ->chunk(100, function ($salesDetails) use ($date) {
                foreach ($salesDetails as $sale) {
                    $this->processSale($sale, $date);
                }
            });

        return response()->json(['status' => 'Sales cost update completed']);
    }

    public function processSale($sale, $date)
    {
        if ($sale->type == 'is_combo') {
            $averageCost = 0;

            $products = DB::table('combined_products')
                ->leftJoin('products', 'products.id', '=', 'combined_products.combined_product_id')
                ->where('combined_products.product_id', $sale->product_id)
                ->orderBy('combined_products.combined_product_id', 'ASC')
                ->select('products.*', 'combined_products.quantity as qte')
                ->get();

            foreach ($products as $product) {
                $remainingStock = DB::table('stock_maintenance')
                    ->selectRaw('SUM(stockIn - stockOut) as remainingStock')
                    ->where('product_id', $product->id)
                    ->where('date', '<=', $date)
                    ->whereNull('deleted_at')
                    ->value('remainingStock');

                $avg = $this->getAverageCostForRemainingStock($product->id, $date, $remainingStock ?? 0);
                $averageCost += $avg * $product->qte;
            }

            DB::table('stock_maintenance')
                ->where('product_id', $sale->product_id)
                ->whereIn('stock_type', ['DL', 'DP', 'SL'])
                ->where('purchased_id', $sale->sale_id)
                ->where('date', '<=', $date)
                ->whereNull('deleted_at')
                ->update([
                    'unit_price' => $averageCost,
                    'total' => $averageCost * $sale->quantity
                ]);

        } else {
            $remainingStock = DB::table('stock_maintenance')
                ->selectRaw('SUM(stockIn) as remainingStock')
                ->where('product_id', $sale->product_id)
                ->where('date', '<=', $date)
                ->whereNull('deleted_at')
                ->value('remainingStock');

            $averageCost = $this->getAverageCostForRemainingStock($sale->product_id, $date, $remainingStock ?? 0);

            DB::table('stock_maintenance')
                ->where('product_id', $sale->product_id)
                ->whereIn('stock_type', ['SL', 'DP', 'DL'])
                ->where('purchased_id', $sale->sale_id)
                ->where('date', '<=', $date)
                ->whereNull('deleted_at')
                ->update([
                    'unit_price' => $averageCost,
                    'total' => $averageCost * $sale->quantity
                ]);
        }
    }


    public function updateSalesCost1(Request $request)
    {




        $date = '2025-02-09';
        $datefrom = '2025-02-01';
        $salesDetails = DB::table('sale_details')->where('date', '<=', $date)->where('date', '>=', $datefrom)->get();

        foreach ($salesDetails as $sale) {



            $remainingStock = DB::table('stock_maintenance')
                ->selectRaw('SUM(stockIn) as remainingStock')
                ->where('product_id', $sale->product_id)
                ->where('date', '<=', $date)
                ->whereNull('deleted_at')
                ->value('remainingStock'); // Fetch only the calculated value



            $averageCost = $this->getAverageCostForRemainingStock($sale->product_id, $date, $remainingStock ?? 0);
            // if($sale->product_id == 191){
            DB::table('stock_maintenance')
                ->where('product_id', $sale->product_id)

                ->whereIn('stock_type', ['DL'])

                ->where('purchased_id', '=', $sale->sale_id)
                ->where('date', '<=', $date)
                ->whereNull('deleted_at')
                ->update([
                    'unit_price' => $averageCost,
                    'total' => $averageCost * $sale->quantity
                ]);
            // }





        }
    }
    public function getProducts()
    {
        return Product::
            // where('not_selling', 1)->


            whereNull('deleted_at')
            ->get();
    }


    public function getpreviousStock()
    {

        return StockMaintenance::selectRaw('product_id, SUM(stockIn) as stockIn,unit_price,date')
            ->where('purchased_id', 0)
            ->where('warehouse_id', 1)
            ->where('stock_type', 'PR')
            ->groupBy('product_id')
            ->get();




    }

    public function getAccounts()
    {


        return DbAccountdtl::where('Branch_id', 1)->get(); // Fetch all account heads
    }




    public function getNagitiveStock($warehouse, $department, $date , Request $request)
    {
        $categoryType = $request->query('categoryType');
        $loadType = $request->query('loadType');


        $results = DB::table('stock_maintenance')
            ->leftJoin('products', 'products.id', '=', 'stock_maintenance.product_id')
            ->leftJoin('units', 'units.id', '=', 'products.unit_id')
            ->select(
                'stock_maintenance.product_id',
                'products.name',
                DB::raw('ROUND(SUM(COALESCE(stockIn,0)) - SUM(COALESCE(StockOut,0)), 2) as balance'),
                'units.name as unit',
                'units.id as unit_id',
                DB::raw("'0' as Unit_cost"),
                DB::raw("'0' as Net_cost"),
                'stock_maintenance.department_category_id'
            )
             // ✅ Apply department or category filter depending on categoryType
            ->when($department !== 'null' && $categoryType === 'department', function ($query) use ($department) {
                return $query->where('stock_maintenance.department_category_id', '=', $department);
            })
            ->when($department !== 'null' && $categoryType === 'category', function ($query) use ($department) {
                return $query->where('products.category_id', '=', $department);
            })
            ->where('stock_maintenance.date', '<=', $date) // Replace this
            ->where('stock_maintenance.warehouse_id', '=', $warehouse) // Replace this
            // ->where('products.not_selling', 0)
            // ->where('stock_maintenance.stock_type', 'SL')
            ->whereNull('stock_maintenance.deleted_at')
            ->groupBy('stock_maintenance.product_id')
            ->when($loadType === 'negative', function ($query)  {
                return $query->havingRaw('ROUND(SUM(COALESCE(stockIn,0)) - SUM(COALESCE(StockOut,0)), 3) < 0');
            })
            ->when($loadType === 'positive', function ($query)  {
                return $query->havingRaw('ROUND(SUM(COALESCE(stockIn,0)) - SUM(COALESCE(StockOut,0)), 3) > 0');
            })

            ->havingRaw('ROUND(SUM(COALESCE(stockIn,0)) - SUM(COALESCE(StockOut,0)), 3) != 0')
            ->get();


        foreach ($results as $item) {

            if ($item->balance <= 0) {
                $bal = 1;
            } else {
                $bal = $item->balance;
            }

            $averageCost = $this->getAverageCostForRemainingStock($item->product_id, $date, $bal);
            $item->Unit_cost = $averageCost;
            $item->Net_cost = $averageCost;
            $item->abc = $categoryType;
        }



        return $results;
    }
    public function getCategories()
    {
        $categories = Category::whereNull('deleted_at')
            ->select('id', 'name')
            ->get();

        return response()->json($categories);
    }
    public function getDepartmentCategories()
    {
        $categories = DepartmentCategory::whereNull('deleted_at')
            ->select('id', 'name')
            ->get();

        return response()->json($categories);
    }
    public function getWarehouses()
    {
        $categories = Warehouse::whereNull('deleted_at')
            ->select('id', 'name')
            ->get();

        return response()->json($categories);
    }




    public function getDealItemDetails($productId, Request $request)
    {
        $products = DB::table('combined_products')
            ->leftJoin('products', 'products.id', '=', 'combined_products.combined_product_id')
            ->where('combined_products.product_id', $productId)
            ->orderBy('combined_products.combined_product_id', 'ASC')
            ->select('products.*', 'combined_products.quantity as qte_purchase', 'combined_products.quantity as qte', 'combined_products.combined_product_id as product_variant_id')
            ->get();

        foreach ($products as $product) {
            foreach ($products as $product) {
                $remainingStock = DB::table('stock_maintenance')
                    ->selectRaw('SUM(stockIn - StockOut) as remainingStock')
                    ->where('product_id', $product->id)
                    ->where('date', '<=', $request->date)
                    ->whereNull('deleted_at')
                    ->value('remainingStock'); // Fetch only the calculated value

                // Attach stock value to product object
                $product->stock = $remainingStock ?? 0;
            }

        }

        return response()->json($products);
    }
    public function getAllAccounts()
    {
        return Account::where('control_account', "=", 0)->
            orderBy('account_number', "ASC")->
            orderBy('account_type', "ASC")->
            get(); // Fetch all account heads
    }

    public function getChildAccounts(Request $request)
    {
        $parentId = $request->query('parent_id');
        return Account::where('parent_id', $parentId)->get(); // Fetch all account heads
    }



    public function storeJV(Request $request)
    {
        try {
            \DB::transaction(function () use ($request) {
                $rows = $request->input('rows');

                // Calculate total debit and credit
                $totalDebit = array_sum(array_column($rows, 'debit'));
                $totalCredit = array_sum(array_column($rows, 'credit'));

                // Check if debit and credit sums are equal
                if ($totalDebit !== $totalCredit) {
                    throw new \Exception('The total debit and credit must be equal.');
                    // return response()->json(['message' => 'The total debit and credit must be equal.'], 422);
                }

                // Save JV summary
                $jvSummary = JVSummary::create([
                    'description' => $request->jv_description,  // Optional description
                    'date' => $request->jv_date,
                    'total_debit' => $totalDebit,
                    'total_credit' => $totalCredit,
                ]);

                // Save rows in Accounts Ledger with JV summary ID as reference
                foreach ($rows as $row) {
                    AccountsLedger::create([
                        'voucher_number' => $jvSummary->id,
                        'voucher_type' => 'JV',
                        'account_id' => $row['account_head_id'],
                        'debit_amount' => $row['debit'],
                        'credit_amount' => $row['credit'],
                        'reference_number' => $jvSummary->id,
                        'description' => $row['description'],
                        'entry_date' => $request->jv_date,
                        'created_by' => Auth::user()->id,
                    ]);
                }
            }, 10);

            return response()->json(['message' => 'JV Voucher added successfully']);
        } catch (\Exception $e) {
            // Log the error for debugging purposes
            \Log::error('Error storing JV: ' . $e->getMessage());

            // Return a JSON response with the error message
            return response()->json([
                'message' => 'An error occurred while processing the request.',
                'error' => $e->getMessage(),
            ], 422);
        }
    }



    public function getSalesSummary(Request $request)
    {

        $query = Sale::query()->where('deleted_at', null);

        // Apply date filters if provided
        if ($request->has('start') && $request->has('end')) {
            $query->whereBetween('created_at', [$request->start, $request->end]);
        }
        // Fetch the data from the database or calculations

        $entertainment = 0;
        // Sale::sum('entertainment');
        $tax = $query->sum('TaxNet');

        $counter = Counter::findOrFail($request->counter_id);
        $open = (int) $counter->open_amount;

        //  Sale::sum('open');
        $discount = $query->sum('discount');
        $serviceCharges = $query->sum('shipping');
        ;
        // Sale::sum('service_charges');
        $extraCharges = 0;//Sale::sum('extra_charges');



        $grossAmount = ($query->sum('GrandTotal') + $discount) - ($tax + $serviceCharges);
        $SaleReturn = SaleReturn::query();

        // Apply date filters if provided
        if ($request->has('start') && $request->has('end')) {
            $SaleReturn->whereBetween('created_at', [$request->start, $request->end]);
        }
        $saleReturn = $SaleReturn->sum('GrandTotal');
        $netSale = $grossAmount - ($discount + $serviceCharges + $extraCharges + $saleReturn);

        $cashSale = 0;// Sale::sum('cash_sale');
        $voucher = 0;//Sale::sum('voucher');
        $creditCardSale = 0;// Sale::sum('credit_card_sale');
        $tipOnCreditCard = 0;// Sale::sum('tip_on_credit_card');
        $totalCredit = 0;// $creditCardSale + $tipOnCreditCard;


        $totalOrder = (clone $query)->count(); // Count all orders
        $totalOrder_value = (clone $query)->sum('GrandTotal'); // Count all orders
        $dineInOrder = (clone $query)->where('deleted_at', null)->where('orderType', 'dinein')->count();
        $dineInOrder_sum = (clone $query)->where('deleted_at', null)->where('orderType', 'dinein')->sum('GrandTotal');
        $takeawayOrder = (clone $query)->where('deleted_at', null)->where('orderType', 'takeaway')->count();
        $takeawayOrder_sum = (clone $query)->where('deleted_at', null)->where('orderType', 'takeaway')->sum('GrandTotal');
        $deliveryOrder = (clone $query)->where('deleted_at', null)->where('orderType', 'delivery')->count();
        $deliveryOrder_sum = (clone $query)->where('deleted_at', null)->where('orderType', 'delivery')->sum('GrandTotal');

        $SaleReturn = SaleReturn::query();

        // Apply date filters if provided
        if ($request->has('start') && $request->has('end')) {
            $SaleReturn->whereBetween('created_at', [$request->start, $request->end]);
        }

        // PaymentSale table dropped - set to 0
        $cash = 0;
        $BankTransfer = (clone $cashCounterquery)->where('Reglement', '1.1.1.2')->sum('montant');
        $JazzCash = (clone $cashCounterquery)->where('Reglement', '1.1.1.3')->sum('montant');
        $Easypaisa = (clone $cashCounterquery)->where('Reglement', '1.1.1.4')->sum('montant');
        $Cheque = (clone $cashCounterquery)->where('Reglement', '1.1.1.5')->sum('montant');
        $Card = (clone $cashCounterquery)->where('Reglement', '1.1.1.6')->sum('montant');


        $party_account = (clone $query)->where('deleted_at', null)->where('payment_statut', '!=', 'paid')->sum('GrandTotal');
        $deleted_order_sum = (clone $query)->whereNotNull('deleted_at')->sum('GrandTotal');
        $deleted_order = (clone $query)->whereNotNull('deleted_at')->count();


        return response()->json([


            'grossAmount' => $grossAmount,
            'entertainment' => $entertainment,
            'tax' => $tax,
            'open' => $open,
            'discount' => $discount,
            'serviceCharges' => $serviceCharges,
            'extraCharges' => $extraCharges,
            'saleReturn' => $saleReturn,
            'netSale' => $netSale,
            'cashSale' => $cash,
            'voucher' => $voucher,
            'creditCardSale' => $Card,
            'tipOnCreditCard' => $tipOnCreditCard,
            'totalCredit' => $totalCredit,

            'totalOrder' => $totalOrder,
            'totalOrder_sum' => $totalOrder_value,
            'dineInOrder' => $dineInOrder,
            'dineInOrder_sum' => $dineInOrder_sum,
            'takeawayOrder' => $takeawayOrder,
            'takeawayOrder_sum' => $takeawayOrder_sum,
            'deliveryOrder' => $deliveryOrder,
            'deliveryOrder_sum' => $deliveryOrder_sum,
            'deleted_order_sum' => $deleted_order_sum,
            'JazzCash' => $JazzCash,
            'BankTransfer' => $BankTransfer,
            'Easypaisa' => $Easypaisa,
            'deleted_order' => $deleted_order,
            'party_account' => $party_account,
            'Cheque' => $Cheque,
            'Card' => $Card,
            'cash' => $cash,
        ]);
    }

    public function storeStock(Request $request)
    {
        $rows = $request->input('rows');
        $date = $request->input('date');
        StockMaintenance::where('purchased_id', 0)
            ->where('warehouse_id', 1)
            ->where('stock_type', 'PR')
            ->delete();

        // remove previous stock entries for the product variant
        foreach ($rows as $row) {
            $existingProduct = product_warehouse::where('product_id', $row['product_id'])
                ->where('warehouse_id', 1) // Check in the same warehouse
                ->first();

            if ($existingProduct) {
                // Update the existing product's quantity
                $existingProduct->update([
                    'qte' => $existingProduct->qte + $row['quantity'], // Add the new quantity to the existing one
                ]);
            } else {
                // Create a new record if the product doesn't exist in the warehouse
                product_warehouse::create([
                    'product_id' => $row['product_id'],
                    'qte' => $row['quantity'],
                    'manage_stock' => 1,
                    'warehouse_id' => 1,
                ]);
            }

            $product = new Product;
            $product = Product::where('deleted_at', '=', null)
                ->where('id', $row['product_id'])
                ->first();

            if ($product) {



                $stock = new StockMaintenance;
                $stock->warehouse_id = 1;
                $stock->product_id = $row['product_id'];
                $stock->date = $date;
                $stock->purchased_id = 0;
                $stock->unit_id = $product->unit_purchase_id;
                $stock->unit_price = $row['price'];
                $stock->type = 'in'; // Stock In
                $stock->stockIn = $row['quantity']; // Quantity added to stock
                $stock->stockOut = 0; // No stock out in this case
                $stock->total = $row['quantity'] * $row['price']; // No stock out in this case
                $stock->stock_type = 'PR'; // stock type case
                $stock->save();
            }

        }
        return response()->json(['message' => 'Products added successfully']);
    }

    public function getStockInventory(Request $request)
    {
        $fromDate = $request->input('from_date');
        $toDate = $request->input('to_date');
        $product = $request->input('product');
        $warehouse_id = $request->input('warehouse_id');



        // Opening Balance: Transactions before from_date
        $openingBalances = DB::table('stock_maintenance')
            ->join('products', 'stock_maintenance.product_id', '=', 'products.id')
            ->join('department_categories', 'products.department_category_id', '=', 'department_categories.id')
            ->select(
                'stock_maintenance.product_id',
                'products.name as product_name',
                'department_categories.id as department_category_id',
                'department_categories.name as department_categories',
                DB::raw('SUM(stockIn - StockOut) as opening_balance'),
                DB::raw('SUM(stockIn * unit_price) / NULLIF(SUM(stockIn), 0) as avg_opening_cost'),
                DB::raw('NULL as total_stockIn'),
                DB::raw('NULL as total_stockOut'),
                DB::raw('NULL as avg_stockIn_cost'),
                DB::raw('NULL as avg_stockOut_cost')
            )
            ->where('stock_maintenance.date', '<', $fromDate)
            ->where('stock_maintenance.deleted_at', '=', null);


        // Apply product filter if provided
        if ($product) {
            $openingBalances->where('stock_maintenance.product_id', $product);
        }

        if ($warehouse_id) {
            $openingBalances->where('stock_maintenance.warehouse_id', $warehouse_id);
        }

        $openingBalances = $openingBalances->groupBy('stock_maintenance.product_id', 'products.name', 'department_categories.id');

        // Stock In and Out between from_date and to_date
        $transactions = DB::table('stock_maintenance')
            ->join('products', 'stock_maintenance.product_id', '=', 'products.id')
            ->join('department_categories', 'products.category_id', '=', 'department_categories.id')
            // ->join('categories', 'categories.id', '=', 'products.category_id')
            ->select(
                'stock_maintenance.product_id',
                'products.name as product_name',
                'department_categories.id as department_category_id',
                'department_categories.name as department_categories',
                DB::raw('NULL as opening_balance'),
                DB::raw('NULL as avg_opening_cost'),
                DB::raw('SUM(stockIn) as total_stockIn'),
                DB::raw('SUM(StockOut) as total_stockOut'),
                DB::raw('SUM(stockIn * unit_price) / NULLIF(SUM(stockIn), 0) as avg_stockIn_cost'),
                DB::raw('SUM(StockOut * unit_price) / NULLIF(SUM(StockOut), 0) as avg_stockOut_cost')
            )
            ->whereBetween('stock_maintenance.date', [$fromDate, $toDate])
            ->where('stock_maintenance.deleted_at', '=', null);

        // Apply product filter if provided
        if ($product) {
            $transactions->where('stock_maintenance.product_id', $product);
        }


        if ($warehouse_id) {
            $transactions->where('stock_maintenance.warehouse_id', $warehouse_id);
        }
        $transactions = $transactions->groupBy('stock_maintenance.product_id', 'products.name', 'department_categories.id');

        // Combine Opening Balances and Transactions
        $combinedQuery = DB::query()
            ->fromSub($openingBalances->unionAll($transactions), 'combined')
            ->join('department_categories', 'department_category_id', '=', 'department_categories.id')
            ->select(
                'product_id',
                'product_name',
                'department_category_id',
                'department_categories.name as department_categories',
                DB::raw('COALESCE(SUM(opening_balance), 0) as opening_balance'),
                DB::raw('COALESCE(SUM(avg_opening_cost), 0) as avg_opening_cost'),
                DB::raw('COALESCE(SUM(total_stockIn), 0) as total_stockIn'),
                DB::raw('COALESCE(SUM(total_stockOut), 0) as total_stockOut'),
                DB::raw('COALESCE(SUM(avg_stockIn_cost), 0) as avg_stockIn_cost'),
                DB::raw('COALESCE(SUM(avg_stockOut_cost), 0) as avg_stockOut_cost')
            )
            ->groupBy('product_id', 'product_name', 'department_category_id');


        //category filter
        if (!empty($request->categories)) {
            $combinedQuery->whereIn('department_category_id', $request->categories);
        }



        $combinedQuery = $combinedQuery->get();
        $gbaltotal = 0;
        $gopeningtotal = 0;
        $gopencosttotal = 0;
        $gstckintotal = 0;
        $gstckincosttotal = 0;
        $gstckouttotal = 0;
        $gstckoutcosttotal = 0;
        $gclosingtotal = 0;
        $gqtysoldtotal = 0;
        $gqtyprtotal = 0;
        $gqtyvaltotal = 0;
        // Calculate Closing Balances
        $report = [];
        foreach ($combinedQuery as $row) {
            $closingQuantity = $row->opening_balance + ($row->total_stockIn - $row->total_stockOut);

            $closingValue = ($row->avg_opening_cost * $row->opening_balance) +
                ($row->avg_stockIn_cost * $row->total_stockIn) -
                ($row->avg_stockOut_cost * $row->total_stockOut);

            $avgClosingCost = round($closingQuantity, 2) > 0 ? $closingValue / round($closingQuantity, 2) : 0;

            $report[] = [
                'product_id' => $row->product_id,
                'product_name' => $row->product_name,
                'category_id' => $row->department_category_id,
                'categories' => $row->department_categories,
                'opening_balance' => round($row->opening_balance, 2),
                'avg_opening_cost' => round($row->avg_opening_cost, 2),
                'stock_in' => round($row->total_stockIn, 2),
                'avg_stock_in_cost' => round($row->avg_stockIn_cost, 2),
                'stock_out' => round($row->total_stockOut, 2),
                'avg_stock_out_cost' => round($row->avg_stockOut_cost, 2),
                'closing_balance' => round($closingQuantity, 2),
                'avg_closing_cost' => round($avgClosingCost, 2),
                'qty_sold' => round($row->avg_stockOut_cost * $row->total_stockOut, 2),
                'qty_purchased' => round($row->avg_stockIn_cost * $row->total_stockIn, 2),
                'qty_value' => round($closingQuantity * $avgClosingCost, 2),
            ];

            $gopeningtotal += $row->opening_balance;
            $gopencosttotal += $row->avg_opening_cost;
            $gstckintotal += $row->total_stockIn;
            $gstckincosttotal += $row->avg_stockIn_cost;
            $gstckouttotal += $row->total_stockOut;
            $gstckoutcosttotal += $row->avg_stockOut_cost;
            $gbaltotal += $closingQuantity;//this og
            $gclosingtotal += $avgClosingCost;
            $gqtysoldtotal += ($row->avg_stockOut_cost * $row->total_stockOut);
            $gqtyprtotal += ($row->avg_stockIn_cost * $row->total_stockIn);
            $gqtyvaltotal += ($closingQuantity * $avgClosingCost);

        }
        $report[] = [
            'product_id' => '',
            'product_name' => 'Total',
            'category_id' => '',
            'categories' => '',
            'opening_balance' => round($gopeningtotal, 2),
            'avg_opening_cost' => round($gopencosttotal, 2),
            'stock_in' => round($gstckintotal, 2),
            'avg_stock_in_cost' => round($gstckincosttotal, 2),
            'stock_out' => round($gstckouttotal, 2),
            'avg_stock_out_cost' => round($gstckoutcosttotal, 2),
            'closing_balance' => round($gbaltotal, 2),
            'avg_closing_cost' => round($gclosingtotal, 2),
            'qty_sold' => round($gqtysoldtotal, 2),
            'qty_purchased' => round($gqtyprtotal, 2),
            'qty_value' => round($gqtyvaltotal, 2),
        ];

        return response()->json($report);
    }
    public function getStockInventory_audit(Request $request)
    {
        $fromDate = $request->input('from_date');
        $toDate = $request->input('to_date');
        $product = $request->input('product');
        $warehouse_id = $request->input('warehouse_id');



        // Opening Balance: Transactions before from_date
        $openingBalances = DB::table('stock_maintenance')
            ->join('products', 'stock_maintenance.product_id', '=', 'products.id')
            ->join('department_categories', 'stock_maintenance.department_category_id', '=', 'department_categories.id')
            ->select(
                'stock_maintenance.product_id',
                'products.name as product_name',
                'department_categories.id as department_category_id',
                'department_categories.name as department_categories',
                DB::raw('SUM(stockIn - StockOut) as opening_balance'),
                DB::raw('SUM(stockIn * unit_price) / NULLIF(SUM(stockIn), 0) as avg_opening_cost'),
                DB::raw('NULL as total_stockIn'),
                DB::raw('NULL as total_stockOut'),
                DB::raw('NULL as avg_stockIn_cost'),
                DB::raw('NULL as avg_stockOut_cost')
            )
            ->where('stock_maintenance.date', '<', $fromDate)
            ->where('stock_maintenance.deleted_at', '=', null);


        // Apply product filter if provided
        if ($product) {
            $openingBalances->where('stock_maintenance.product_id', $product);
        }

        if ($warehouse_id) {
            $openingBalances->where('stock_maintenance.warehouse_id', $warehouse_id);
        }

        $openingBalances = $openingBalances->groupBy('stock_maintenance.product_id', 'products.name', 'department_categories.id');

        // Stock In and Out between from_date and to_date
        $transactions = DB::table('stock_maintenance')
            ->join('products', 'stock_maintenance.product_id', '=', 'products.id')
            ->join('department_categories', 'products.category_id', '=', 'department_categories.id')
            // ->join('categories', 'categories.id', '=', 'products.category_id')
            ->select(
                'stock_maintenance.product_id',
                'products.name as product_name',
                'department_categories.id as department_category_id',
                'department_categories.name as department_categories',
                DB::raw('NULL as opening_balance'),
                DB::raw('NULL as avg_opening_cost'),
                DB::raw('SUM(stockIn) as total_stockIn'),
                DB::raw('SUM(StockOut) as total_stockOut'),
                DB::raw('SUM(stockIn * unit_price) / NULLIF(SUM(stockIn), 0) as avg_stockIn_cost'),
                DB::raw('SUM(StockOut * unit_price) / NULLIF(SUM(StockOut), 0) as avg_stockOut_cost')
            )
            ->whereBetween('stock_maintenance.date', [$fromDate, $toDate])
            ->where('stock_maintenance.deleted_at', '=', null);

        // Apply product filter if provided
        if ($product) {
            $transactions->where('stock_maintenance.product_id', $product);
        }


        if ($warehouse_id) {
            $transactions->where('stock_maintenance.warehouse_id', $warehouse_id);
        }
        $transactions = $transactions->groupBy('stock_maintenance.product_id', 'products.name', 'department_categories.id');

        // Combine Opening Balances and Transactions
        $combinedQuery = DB::query()
            ->fromSub($openingBalances->unionAll($transactions), 'combined')
            ->join('department_categories', 'department_category_id', '=', 'department_categories.id')
            ->select(
                'product_id',
                'product_name',
                'department_category_id',
                'department_categories.name as department_categories',
                DB::raw('COALESCE(SUM(opening_balance), 0) as opening_balance'),
                DB::raw('COALESCE(SUM(avg_opening_cost), 0) as avg_opening_cost'),
                DB::raw('COALESCE(SUM(total_stockIn), 0) as total_stockIn'),
                DB::raw('COALESCE(SUM(total_stockOut), 0) as total_stockOut'),
                DB::raw('COALESCE(SUM(avg_stockIn_cost), 0) as avg_stockIn_cost'),
                DB::raw('COALESCE(SUM(avg_stockOut_cost), 0) as avg_stockOut_cost')
            )
            ->groupBy('product_id', 'product_name', 'department_category_id');


        //category filter
        if (!empty($request->categories)) {
            $combinedQuery->whereIn('department_category_id', $request->categories);
        }



        $combinedQuery = $combinedQuery->get();
        $gbaltotal = 0;
        $gopeningtotal = 0;
        $gopencosttotal = 0;
        $gstckintotal = 0;
        $gstckincosttotal = 0;
        $gstckouttotal = 0;
        $gstckoutcosttotal = 0;
        $gclosingtotal = 0;
        $gqtysoldtotal = 0;
        $gqtyprtotal = 0;
        $gqtyvaltotal = 0;
        // Calculate Closing Balances
        $report = [];
        foreach ($combinedQuery as $row) {
            $closingQuantity = $row->opening_balance + ($row->total_stockIn - $row->total_stockOut);

            $closingValue = ($row->avg_opening_cost * $row->opening_balance) +
                ($row->avg_stockIn_cost * $row->total_stockIn) -
                ($row->avg_stockOut_cost * $row->total_stockOut);

            $avgClosingCost = round($closingQuantity, 2) > 0 ? $closingValue / round($closingQuantity, 2) : 0;

            $report[] = [
                'product_id' => $row->product_id,
                'product_name' => $row->product_name,
                'category_id' => $row->department_category_id,
                'categories' => $row->department_categories,
                'opening_balance' => round($row->opening_balance, 2),
                'avg_opening_cost' => round($row->avg_opening_cost, 2),
                'stock_in' => round($row->total_stockIn, 2),
                'avg_stock_in_cost' => round($row->avg_stockIn_cost, 2),
                'stock_out' => round($row->total_stockOut, 2),
                'avg_stock_out_cost' => round($row->avg_stockOut_cost, 2),
                'closing_balance' => round($closingQuantity, 2),
                'avg_closing_cost' => round($avgClosingCost, 2),
                'qty_sold' => round($row->avg_stockOut_cost * $row->total_stockOut, 2),
                'qty_purchased' => round($row->avg_stockIn_cost * $row->total_stockIn, 2),
                'qty_value' => round($closingQuantity * $avgClosingCost, 2),
            ];

            $gopeningtotal += $row->opening_balance;
            $gopencosttotal += $row->avg_opening_cost;
            $gstckintotal += $row->total_stockIn;
            $gstckincosttotal += $row->avg_stockIn_cost;
            $gstckouttotal += $row->total_stockOut;
            $gstckoutcosttotal += $row->avg_stockOut_cost;
            $gbaltotal += $closingQuantity;//this og
            $gclosingtotal += $avgClosingCost;
            $gqtysoldtotal += ($row->avg_stockOut_cost * $row->total_stockOut);
            $gqtyprtotal += ($row->avg_stockIn_cost * $row->total_stockIn);
            $gqtyvaltotal += ($closingQuantity * $avgClosingCost);

        }
        $report[] = [
            'product_id' => '',
            'product_name' => 'Total',
            'category_id' => '',
            'categories' => '',
            'opening_balance' => round($gopeningtotal, 2),
            'avg_opening_cost' => round($gopencosttotal, 2),
            'stock_in' => round($gstckintotal, 2),
            'avg_stock_in_cost' => round($gstckincosttotal, 2),
            'stock_out' => round($gstckouttotal, 2),
            'avg_stock_out_cost' => round($gstckoutcosttotal, 2),
            'closing_balance' => round($gbaltotal, 2),
            'avg_closing_cost' => round($gclosingtotal, 2),
            'qty_sold' => round($gqtysoldtotal, 2),
            'qty_purchased' => round($gqtyprtotal, 2),
            'qty_value' => round($gqtyvaltotal, 2),
        ];

        return response()->json($report);
    }


    //-------------------- Get adjustments By product -------------\\
    public function getBalanceStatement(Request $request)
    {
        $selectedDate = $request->input('date', date('Y-m-d'));

        // Initialize an array to store all account groups with their respective subdivisions.
        $balanceStatement = [];

        // Fetch all top-level accounts (level 2) with specific account types
        $parentAccounts = DB::table('accounts')
            ->where('control_account', 0)
            ->whereIn('account_type', ['asset', 'liability', 'equity'])
            ->where('level', 2)
            ->get();

        foreach ($parentAccounts as $parentAccount) {
            // Fetch subdivisions (level 3 accounts) under each parent account
            $subdivisions = DB::table('accounts')
                ->leftJoin('accounts_ledger', 'accounts.account_number', '=', 'accounts_ledger.account_id')
                ->selectRaw('
                    accounts.account_name,
                    accounts.account_number,
                    COALESCE(SUM(accounts_ledger.debit_amount), 0) as total_debit,
                    COALESCE(SUM(accounts_ledger.credit_amount), 0) as total_credit,
                    COALESCE(accounts.opening_balance, 0) as total_opening,
                    (COALESCE(SUM(accounts_ledger.debit_amount), 0) - COALESCE(SUM(accounts_ledger.credit_amount), 0)) as balance
                ')
                ->where('accounts.parent_id', 'like', $parentAccount->account_number . '%')
                ->whereIn('accounts.level', [3])
                ->groupBy('accounts.account_number', 'accounts.account_name', 'accounts.opening_balance')
                ->get();

            // Calculate the total for the parent account itself by summing its subdivisions
            $parentTotal = $subdivisions->sum('balance');

            // Add parent account and its subdivisions to the balance statement structure
            $balanceStatement[$parentAccount->account_number] = [
                'parent_account_name' => $parentAccount->account_name,
                'subtotal' => $parentTotal,
                'accounts' => $subdivisions->map(function ($subdivision) {
                    $subdivisions1 = DB::table('accounts_ledger')
                        ->selectRaw('
                            account_id,
                            (COALESCE(SUM(debit_amount), 0) - COALESCE(SUM(credit_amount), 0)) as balance
                        ')
                        ->where('account_id', 'like', $subdivision->account_number . '%')
                        ->groupBy('account_id')
                        ->get();

                    // Get the balance from the first record in the subdivisions1 collection, or 0 if empty
                    $balance = $subdivisions1->first()->balance ?? 0;

                    return [
                        'account_name' => $subdivision->account_name,
                        'account_number' => $subdivision->account_number,
                        'balance' => $balance
                    ];
                })->toArray()
            ];
        }

        // Return the data in JSON format
        return response()->json(['accounts' => $balanceStatement]);
    }
    public function getIncomeStatement(Request $request)
    {
        $from = $request->input('from');
        $to = $request->input('to');

        // Sales Revenue (from sales table)
        $salesRevenue = DB::table('sales')
            ->whereBetween('date', [$from, $to])
            ->whereNull('deleted_at')
            ->sum('GrandTotal');

        // Service Revenue (from accounts_ledger with account type 4.1.2)
        $serviceRevenue = DB::table('accounts_ledger')
            ->whereBetween('entry_date', [$from, $to])
            ->where('account_id', 'like', '4.1.2%')
            ->sum('credit_amount');

        // Interest Revenue (from accounts_ledger with account type 4.1.3)
        $interestRevenue = DB::table('accounts_ledger')
            ->whereBetween('entry_date', [$from, $to])
            ->where('account_id', 'like', '4.1.3%')
            ->sum('credit_amount');

        // Gain on Sales of Assets (from accounts_ledger with account type 4.1.4)
        $gainOnSales = DB::table('accounts_ledger')
            ->whereBetween('entry_date', [$from, $to])
            ->where('account_id', 'like', '4.1.4%')
            ->sum('credit_amount');

        // Calculate Total Revenue
        $totalRevenue = $salesRevenue + $serviceRevenue + $interestRevenue + $gainOnSales;

        // Calculate Cost of Goods Sold (COGS)
        // Opening Stock


        $opening = DB::table('opening_inventory')
        ->select('opening','closing')
        ->whereBetween('opening_inventory.date', [$from, $to])
        ->first();


        // $openingStock = DB::table('stock_maintenance')
        //     ->where('date', '<', $from)
        //     ->whereNull('deleted_at')
        //     ->sum(DB::raw('stockIn * unit_price - stockOut * unit_price'));
        $openingStock = $opening ? $opening->opening : 0;



        // Purchases during the period
            $purchases = DB::table('stock_maintenance')
            ->whereBetween('date', [$from, $to])
            ->where('stock_type', 'PR')
            ->whereNull('deleted_at')
            ->sum(DB::raw('stockIn * unit_price'));

        // Ending Stock

        // $endingStock = DB::table('stock_maintenance')
        //     ->where('date', '<=', $to)
        //     ->whereNull('deleted_at')
        //     ->sum(DB::raw('(stockIn - stockOut) * unit_price'));
            // $endingStock = 0;
            $endingStock = $opening ? $opening->closing : 0;
        // Calculate COGS
        $costOfGoodsSold = $openingStock + $purchases - $endingStock;

        // Get all expenses from accounts_ledger (account type 5.2)
        $overheadExpenses = DB::table('accounts_ledger')
            ->leftJoin('accounts', 'accounts.account_number', '=', 'accounts_ledger.account_id')
            ->select('accounts.account_name', DB::raw('SUM(debit_amount) as amount'))
            ->where('accounts_ledger.account_id', 'like', '5%')
            ->where('accounts_ledger.account_id', 'not like', '5.1.1%')
            ->whereBetween('accounts_ledger.entry_date', [$from, $to])
            ->groupBy('accounts_ledger.account_id', 'accounts.account_name')
            ->get();

        // Calculate Total Overhead Expenses
        $totalOverhead = $overheadExpenses->sum('amount');

        // Calculate Gross Profit
        $grossProfit = $totalRevenue - $costOfGoodsSold;

        // Calculate Income Before Tax
        $incomeBeforeTax = $grossProfit - ($totalOverhead);

        // Get Income Tax Expense (from accounts_ledger with account type 5.2.1)
        $incomeTaxExpense = DB::table('accounts_ledger')
            ->whereBetween('entry_date', [$from, $to])
            ->where('account_id', 'like', '5%')
            ->where('account_id', 'not like', '5.1.1%')
            ->sum('debit_amount');
            $incomeTaxExpense = 0;
        // Calculate Net Profit/Loss
        $netProfitLoss = $incomeBeforeTax - $incomeTaxExpense;

        return response()->json([
            'salesRevenue' => $salesRevenue,
            'serviceRevenue' => $serviceRevenue,
            'interestRevenue' => $interestRevenue,
            'gainOnSales' => $gainOnSales,
            'totalRevenue' => $totalRevenue,
            'costOfGoodsSold' => [
                'openingStock' => $openingStock,
                'purchases' => $purchases,
                'endingStock' => $endingStock,
                'total' => $costOfGoodsSold
            ],
            'grossProfit' => $grossProfit,
            'overheadExpenses' => $overheadExpenses,
            'totalOverhead' => $totalOverhead,
            'incomeBeforeTax' => $incomeBeforeTax,
            'incomeTaxExpense' => $incomeTaxExpense,
            'netProfitLoss' => $netProfitLoss
        ]);
    }

    public function getTrialBalanceReport(Request $request)
    {
        // Get the date from the request, defaulting to today if not provided
        $date = $request->input('date', date('Y-m-d'));

        $trialBalance = DB::table('accounts_ledger as a')
            ->join('db_accountdtl', 'db_accountdtl.account_id', '=', 'a.account_id')
            ->join('accounts', 'accounts.account_number', '=', 'db_accountdtl.head_id')
            ->whereDate('a.entry_date', '<=', $date) // Filter by date
            ->select(
                'db_accountdtl.account_name',
                'db_accountdtl.head_id',
                'accounts.account_name as HeadAccountName',
                DB::raw('COALESCE(SUM(a.debit_amount), 0) AS Debit'),
                DB::raw('COALESCE(SUM(a.credit_amount), 0) AS Credit'),
                DB::raw('(COALESCE(SUM(a.debit_amount),0) - COALESCE(SUM(a.credit_amount),0)) AS Balance')
            )
            ->groupBy('db_accountdtl.head_id')
            ->get();

        // Calculate totals for Debit and Credit columns
        $totalDebit = $trialBalance->sum('Debit');
        $totalCredit = $trialBalance->sum('Credit');


        $data = $trialBalance->map(function ($item) {
            // Calculate the difference between debit and credit
            $balance = $item->Balance;

            // Adjust the debit and credit values based on the balance
            if ($balance < 0) {
                // Show negative balance in Debit column
                return [
                    'account_name' => $item->HeadAccountName,
                    'debit' => 0, // Show absolute value as debit
                    'credit' => abs($balance), // Set credit to 0
                ];
            } elseif ($balance > 0) {
                // Show positive balance in Credit column
                return [
                    'account_name' => $item->HeadAccountName,
                    'debit' => $balance, // Set debit to 0
                    'credit' => 0, // Show the balance as credit
                ];
            }
            return null; // Exclude rows with a zero balance
        })->filter(); // Removes null values (zero balance entries)
        return response()->json([
            'totalRows' => $trialBalance->count(),
            'adjustments' => $data,
            'totals' => [
                'debit' => $totalDebit,
                'credit' => $totalCredit,
            ],
        ]);
    }
    public function get_adjustment_by_product(request $request)
    {
        return response()->json([
            'totalRows' => 0,
            'adjustments' => [],
        ]);
    }




    public function getProfitLossReportDate(Request $request)
    {
        $validated = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        $start_date = $validated['start_date'];
        $end_date = $validated['end_date'];
        $product = $request->input('product');
        $sellable_item = $request->input('sellable_item');

        $categories = $request->input('categories');



        $report = DB::table('stock_maintenance')
            ->select(
                'products.name as product_name',
                'stock_maintenance.date',
                'stock_maintenance.product_id',
                'warehouses.name as warehouse_id', // Add warehouse name
                'sale_details.sale_id',
                DB::raw('ROUND(stock_maintenance.unit_price, 2) as cost_price_per_unit'),
                'stock_maintenance.StockOut as quantity_sold',
                DB::raw('ROUND(SUM(stock_maintenance.StockOut), 2) as quantity_sold'),
                DB::raw('ROUND(SUM(stock_maintenance.StockOut * stock_maintenance.unit_price), 2) as total_cost'),
                DB::raw('ROUND(sale_details.price, 2) as sale_price_per_unit'),
                DB::raw('ROUND(SUM(sale_details.total), 2) as total_sale_amount'),
                DB::raw('ROUND(SUM((sale_details.discount * sale_details.price) / 100), 2) as total_discount'),
                DB::raw('ROUND(SUM(sale_details.total - (stock_maintenance.StockOut * stock_maintenance.unit_price) ), 2) as profit_loss')
            )
            ->leftJoin('warehouses', 'warehouses.id', '=', 'stock_maintenance.warehouse_id') // Join with warehouses table
            ->leftJoin('sale_details', function ($join) {
                $join->on('sale_details.sale_id', '=', 'stock_maintenance.purchased_id')
                    ->on('sale_details.product_id', '=', 'stock_maintenance.product_id');
            })
            ->leftJoin('products', 'products.id', '=', 'stock_maintenance.product_id')
            ->where('stock_maintenance.stock_type', 'SL')
            ->whereNull('stock_maintenance.deleted_at')
            ->whereBetween('stock_maintenance.date', [$start_date, $end_date])
            ->when($product, function ($query, $product) {
                return $query->where('stock_maintenance.product_id', $product);
            })
            ->when($sellable_item == 1, function ($query) {
                return $query->where('products.not_selling', 0);
            })
            // Category filtering removed - categories table no longer used
            ->groupby('stock_maintenance.date')
            ->get();

        return response()->json($report);
    }



    public function getProfitLossReportSummary(Request $request)
    {
        $validated = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        $start_date = $validated['start_date'];
        $end_date = $validated['end_date'];
        $product = $request->input('product');
        $sellable_item = $request->input('sellable_item');

        $categories = $request->input('categories');


        $report = DB::table('stock_maintenance')
            ->select(
                'products.name as product_name',
                'stock_maintenance.date',
                'stock_maintenance.product_id',
                'units.ShortName as unit',
                'sale_details.sale_id',
                DB::raw('ROUND(stock_maintenance.unit_price, 2) as cost_price_per_unit'),
                'stock_maintenance.StockOut as quantity_sold',
                DB::raw('ROUND(SUM(stock_maintenance.StockOut), 2) as quantity_sold'),
                DB::raw('ROUND(SUM(stock_maintenance.StockOut * stock_maintenance.unit_price), 2) as total_cost'),
                DB::raw('ROUND(sale_details.price, 2) as sale_price_per_unit'),
                DB::raw('ROUND(SUM(sale_details.total), 2) as total_sale_amount'),
                DB::raw('ROUND(SUM((sale_details.discount * sale_details.price) / 100), 2) as total_discount'),
                DB::raw('ROUND(SUM(sale_details.total - (stock_maintenance.StockOut * stock_maintenance.unit_price) ), 2) as profit_loss')
            )

            ->leftJoin('sale_details', function ($join) {
                $join->on('sale_details.sale_id', '=', 'stock_maintenance.purchased_id')
                    ->on('sale_details.product_id', '=', 'stock_maintenance.product_id');
            })
            ->leftJoin('products', 'products.id', '=', 'stock_maintenance.product_id')
            ->leftJoin('units', 'units.id', '=', 'products.unit_sale_id')
            ->where('stock_maintenance.stock_type', 'SL')
            ->whereNull('stock_maintenance.deleted_at')
            ->whereBetween('stock_maintenance.date', [$start_date, $end_date])
            ->when($product, function ($query, $product) {
                return $query->where('stock_maintenance.product_id', $product);
            })
            ->when($sellable_item == 1, function ($query) {
                return $query->where('products.not_selling', 0);
            })
            // Category filtering removed - categories table no longer used
            ->groupby('stock_maintenance.product_id')
            ->get();

        return response()->json($report);
    }
    public function getProfitLossReportSummaryold(Request $request)
    {
        $validated = $request->validate([
            'start_date' => 'required|date',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        $start_date = $validated['start_date'];
        $end_date = $validated['end_date'];
        $product = $request->input('product');
        $sellable_item = $request->input('sellable_item');

        $categories = $request->input('categories');


        $report = DB::table('stock_maintenance')
            ->select(
                'products.name as product_name',
                'stock_maintenance.date',
                'stock_maintenance.product_id',
                'units.ShortName as unit',
                'sale_details.sale_id',
                DB::raw('ROUND(stock_maintenance.unit_price, 2) as cost_price_per_unit'),
                'stock_maintenance.StockOut as quantity_sold',
                DB::raw('ROUND(SUM(stock_maintenance.StockOut), 2) as quantity_sold'),
                DB::raw('ROUND(SUM(stock_maintenance.StockOut * stock_maintenance.unit_price), 2) as total_cost'),
                DB::raw('ROUND(sale_details.price, 2) as sale_price_per_unit'),
                DB::raw('ROUND(SUM(sale_details.total), 2) as total_sale_amount'),
                DB::raw('ROUND(SUM((sale_details.discount * sale_details.price) / 100), 2) as total_discount'),
                DB::raw('ROUND(SUM(sale_details.total - (stock_maintenance.StockOut * stock_maintenance.unit_price) ), 2) as profit_loss')
            )

            ->leftJoin('sale_details', function ($join) {
                $join->on('sale_details.sale_id', '=', 'stock_maintenance.purchased_id')
                    ->on('sale_details.product_id', '=', 'stock_maintenance.product_id');
            })
            ->leftJoin('products', 'products.id', '=', 'stock_maintenance.product_id')
            ->leftJoin('units', 'units.id', '=', 'products.unit_sale_id')
            ->where('stock_maintenance.stock_type', 'SL')
            ->whereNull('stock_maintenance.deleted_at')
            ->whereBetween('stock_maintenance.date', [$start_date, $end_date])
            ->when($product, function ($query, $product) {
                return $query->where('stock_maintenance.product_id', $product);
            })
            ->when($sellable_item == 1, function ($query) {
                return $query->where('products.not_selling', 0);
            })
            // Category filtering removed - categories table no longer used
            ->groupby('stock_maintenance.product_id')
            ->get();

        return response()->json($report);
    }





    public function getProfitLossReportjawad(Request $request)
    {

        $fromDate = '2025-03-25'; // Replace with your dynamic date input
        $toDate = '2025-03-28';   // Replace with your dynamic date input
        $warehouse_id = 2;        // Replace with your warehouse filter
        $product_ids = [35]; // Replace with your dynamic product selection


        // Function to get Opening Quantity and Opening Value Before a Given Date for a Product
        function getOpeningStockBeforeDate($productId, $fromDate, $warehouse_id, $depart_id)
        {
            // Query to get the opening quantity and opening value (based on unit price)
            $openingStock = DB::table('stock_maintenance as sm')
                ->where('sm.product_id', $productId)
                ->where('sm.date', '<', $fromDate)
                ->where('sm.warehouse_id', $warehouse_id)
                ->where('sm.department_category_id', $depart_id)
                ->whereNull('sm.deleted_at')
                ->select(
                    DB::raw('ROUND(SUM(sm.StockIn - sm.StockOut), 2) AS opening_qty'),
                    DB::raw('ROUND(SUM(sm.StockIn * sm.unit_price) - SUM(sm.StockOut * sm.unit_price), 2) AS opening_value')
                )
                ->first();
            // dd($openingStock->toSql());
            // Return opening quantity and opening value (if not null, else return 0)
            return [
                'opening_qty' => $openingStock->opening_qty ?? 0,
                'opening_value' => $openingStock->opening_value ?? 0
            ];
        }




        // Main Query Without Opening Quantity & Value
        $transactions = DB::table('stock_maintenance as sm')
            ->leftJoin('products as p', 'sm.product_id', '=', 'p.id')
            ->leftJoin('units as u', 'sm.unit_id', '=', 'u.id')
            ->leftJoin('department_categories as dc', 'sm.department_category_id', '=', 'dc.id')
            ->select(
                'sm.department_category_id',
                'dc.name as department_name',
                'sm.product_id',
                'p.name as product_name',
                'u.name as unit',
                DB::raw('ROUND(SUM(COALESCE(sm.StockIn, 0)), 2) AS total_stock_in'),
                DB::raw('ROUND(SUM(COALESCE(sm.StockOut, 0)), 2) AS total_stock_out'),
                DB::raw('ROUND(SUM(COALESCE(sm.StockIn, 0)) - SUM(COALESCE(sm.StockOut, 0)), 2) AS total_balance_qty'),
                DB::raw('ROUND(SUM(COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0)), 2) AS total_stock_in_val'),
                DB::raw('ROUND(SUM(COALESCE(sm.StockOut, 0) * COALESCE(sm.unit_price, 0)), 2) AS total_stock_out_val'),
                DB::raw('ROUND(SUM(sm.StockIn * sm.unit_price) - SUM(sm.StockOut * sm.unit_price), 2) AS closing_value')
            )
            ->whereBetween('sm.date', [$fromDate, $toDate])
            ->where('sm.warehouse_id', $warehouse_id)
            ->whereIn('sm.product_id', $product_ids)
            ->whereNull('sm.deleted_at')
            ->groupBy('sm.department_category_id', 'sm.product_id')
            ->orderBy('sm.department_category_id')
            ->orderBy('sm.product_id')
            ->get();



        $item_data = [];
        $sales_details = [];
        // Initialize Grand Totals
        $grand_total_opening = 0;
        $grand_total_opening_value = 0;
        $grand_total_stock_in = 0;
        $grand_total_stock_in_val = 0;
        $grand_total_stock_out = 0;
        $grand_total_stock_out_val = 0;
        $grand_total_balance = 0;
        $grand_total_balance_value = 0;

        $current_department = null;
        $current_product = null;

        $sales_details = [];

        foreach ($transactions as $row) {
            // Ensure safe numerical values (convert null to 0)
            $stock_in = floatval($row->total_stock_in ?? 0);
            $stock_in_val = floatval($row->total_stock_in_val ?? 0);
            $stock_out = floatval($row->total_stock_out ?? 0);
            $stock_out_val = floatval($row->total_stock_out_val ?? 0);
            $department_category_id = $row->department_category_id ?? 0;
            $opening_stock = getOpeningStockBeforeDate($row->product_id, $fromDate, $warehouse_id, $department_category_id);
            $opening_qty = $opening_stock['opening_qty'];
            $opening_value = $opening_stock['opening_value'];
            $opening_avg_cost = $opening_qty > 0 ? $opening_value / $opening_qty : 0;

            // Check if department has changed
            if ($current_department != $row->department_category_id) {
                // Add department header
                $sales_details[] = [
                    'v_no' => $department_category_id,
                    'v_type' => 'Department: ALI ' . $row->department_name,
                    'date' => '',
                    'product_name' => $row->product_id . " " . $fromDate . " " . $warehouse_id . " " . $department_category_id,
                    'opening_qty' => '',
                    'opening_value' => '',
                    'stock_in' => '',
                    'stock_in_val' => '',
                    'stock_out' => '',
                    'stock_out_val' => '',
                    'balance_inventory' => '',
                    'balance_inventory_value' => '',
                    'unit' => '',
                    'opening_avg_cost' => '',
                    'total_value' => '',
                ];
                $current_department = $row->department_category_id;
            }

            // Check if product has changed (reset product totals)
            if ($current_product !== $row->product_name) {
                $product_total_opening = $opening_qty;
                $product_total_opening_value = $opening_value;
                $product_total_stock_in = 0;
                $product_total_stock_in_val = 0;
                $product_total_stock_out = 0;
                $product_total_stock_out_val = 0;
            }

            // Accumulate stock movements
            $product_total_stock_in += $stock_in;
            $product_total_stock_in_val += $stock_in_val;
            $product_total_stock_out += $stock_out;
            $product_total_stock_out_val += $stock_out_val;

            // Calculate closing balance
            $product_total_balance = $product_total_opening + $product_total_stock_in - $product_total_stock_out;
            $product_total_balance_value = $product_total_opening_value + $product_total_stock_in_val - $product_total_stock_out_val;

            // Store transaction row
            $sales_details[] = [
                'v_no' => '',
                'v_type' => '',
                'date' => '',
                'product_name' => $row->product_name,
                'opening_qty' => number_format($product_total_opening, 2),
                'opening_value' => number_format($product_total_opening_value, 2),
                'stock_in' => number_format($stock_in, 2),
                'stock_in_val' => number_format($stock_in_val, 2),
                'stock_out' => number_format($stock_out, 2),
                'stock_out_val' => number_format($stock_out_val, 2),
                'balance_inventory' => number_format($product_total_balance, 2),
                'balance_inventory_value' => number_format($product_total_balance_value, 2),
                'unit' => $row->unit,
                'opening_avg_cost' => number_format($opening_avg_cost, 2),
                'total_value' => number_format($product_total_balance_value, 2),
            ];

            // Update grand totals
            $grand_total_opening += $product_total_opening;
            $grand_total_opening_value += $product_total_opening_value;
            $grand_total_stock_in += $stock_in;
            $grand_total_stock_in_val += $stock_in_val;
            $grand_total_stock_out += $stock_out;
            $grand_total_stock_out_val += $stock_out_val;
            $grand_total_balance += $product_total_balance;
            $grand_total_balance_value += $product_total_balance_value;

            // Update current product tracker
            $current_product = $row->product_name;
        }

        $grand_total_balance = $grand_total_opening + ($grand_total_stock_in - $grand_total_stock_out);
        $grand_total_balance_value = $grand_total_opening_value + ($grand_total_stock_in_val - $grand_total_stock_out_val);

        // Add Grand Total Row
        $sales_details[] = [
            'v_no' => '',
            'v_type' => 'Grand Total',
            'date' => '',
            'product_name' => '',
            'opening_qty' => number_format($grand_total_opening, 2),
            'opening_value' => number_format($grand_total_opening_value, 2),
            'stock_in' => number_format($grand_total_stock_in, 2),
            'stock_in_val' => number_format($grand_total_stock_in_val, 2),
            'stock_out' => number_format($grand_total_stock_out, 2),
            'stock_out_val' => number_format($grand_total_stock_out_val, 2),
            'balance_inventory' => number_format($grand_total_balance, 2),
            'balance_inventory_value' => number_format($grand_total_balance_value, 2),
            'unit' => '',
            'opening_avg_cost' => '',
            'total_value' => number_format($grand_total_balance_value, 2),
        ];

        return $sales_details;


        // Return the final result
        return response()->json($sales_details);


    }
    public function getStockInventoryReport(Request $request)
    {


        $product_total_opening = 0;
        $product_total_opening_value = 0;
        $product_total_stock_in = 0;
        $product_total_stock_in_val = 0;
        $product_total_stock_out = 0;
        $product_total_stock_out_val = 0;
        $product_total_balance = 0;
        $product_total_balance_value = 0;
        $product_total_value = 0;


        $fromDate = $request->input('start_date');
        $toDate = $request->input('end_date');
        $product = $request->input('product');
        $warehouse_id = $request->input('warehouse_id');

        $sellable_item = $request->input('sellable_item');

        $categories = $request->input('categories');

        $openingStock = DB::table('stock_maintenance as sm')
            ->selectRaw('
                sm.department_category_id,
                sm.product_id,
                SUM(sm.StockIn - sm.StockOut) AS opening_balance,
                CASE
                    WHEN SUM(sm.StockIn) > 0 THEN SUM(sm.StockIn * sm.unit_price) / SUM(sm.StockIn)
                    ELSE NULL
                END AS avg_cost_price
            ')
            ->where('sm.date', '<', $fromDate) // Get opening stock before the selected date
            ->where('sm.warehouse_id', $warehouse_id) // Filter by warehouse
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('product'), function ($query) use ($request) {
                    return $query->where('sm.product_id', $request->product);
                });
            })
            ->whereNull('sm.deleted_at') // Ensure only active records
            ->groupBy('sm.department_category_id', 'sm.product_id');

        // Query to get transaction data separately
        $transactions1 = DB::table('stock_maintenance as sm')
            ->leftJoin('products as p', 'sm.product_id', '=', 'p.id') // Join with products table to get product name
            ->leftJoin('units as u', 'sm.unit_id', '=', 'u.id') // Join with units table to get unit name
            ->leftJoin('department_categories as dc', 'sm.department_category_id', '=', 'dc.id') // Join with department_categories table to get department name
            ->leftJoinSub($openingStock, 'os', function ($join) {
                $join->on('sm.department_category_id', '=', 'os.department_category_id')
                    ->on('sm.product_id', '=', 'os.product_id');
            }) // Join the opening stock subquery
            ->select(
                'sm.stock_type',
                'sm.purchased_id',
                'sm.date',
                'sm.department_category_id',
                'dc.name as department_name',
                'u.name as unit',
                'p.name as product_name',
                DB::raw('(COALESCE(os.opening_balance, 0)) AS opening_qty'),
                DB::raw('(COALESCE(os.avg_cost_price, 0)) AS opening_avg_cost'),
                DB::raw('SUM(sm.StockIn) AS StockIn'),
                DB::raw('SUM(sm.StockOut) AS StockOut'),
                DB::raw('SUM(COALESCE(sm.StockIn * sm.unit_price ,0)) AS StockInVal'),
                DB::raw('SUM(( COALESCE(sm.StockOut,0) * COALESCE(sm.unit_price ,0))) AS StockOutVal'),
            )
            ->whereBetween('sm.date', [$fromDate, $toDate]) // Filter transactions within the date range
            ->where('sm.warehouse_id', $warehouse_id) // Filter by warehouse
            ->when($sellable_item == 1, function ($query) {
                return $query->where('p.not_selling', 0);
            })
            ->when(!empty($request->categories), function ($query) use ($categories) {
                return $query->whereIn('p.department_category_id', $categories);
            })

            ->where(function ($query) use ($request) {
                return $query->when($request->filled('product'), function ($query) use ($request) {
                    return $query->where('sm.product_id', $request->product);
                });
            })

            ->whereNull('sm.deleted_at') // Ensure only active records
            ->groupby('sm.department_category_id', 'sm.product_id')
            ->orderBy('sm.department_category_id')
            ->orderBy('sm.product_id')
            ->orderBy('sm.date'); // Fetch the results



        $openingQuery = DB::table('stock_maintenance as sm')
            ->leftJoin('products as p', 'sm.product_id', '=', 'p.id')
            ->leftJoin('department_categories as dc', 'sm.department_category_id', '=', 'dc.id')
            ->whereNull('sm.deleted_at')
            ->where('sm.date', '<', $fromDate)
            ->where('sm.warehouse_id', $warehouse_id)
            ->when($sellable_item == 1, function ($query) {
                return $query->where('p.not_selling', 0);
            })
            ->when(!empty($request->categories), function ($query) use ($categories) {
                return $query->whereIn('p.department_category_id', $categories);
            })
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('product'), function ($query) use ($request) {
                    return $query->where('sm.product_id', $request->product);
                });
            })
            ->whereNotExists(function ($query) use ($fromDate, $toDate, $warehouse_id) {
                $query->select(DB::raw(1))
                    ->from('stock_maintenance as sm2')
                    ->whereRaw('sm2.product_id = sm.product_id')
                    ->where('sm2.warehouse_id', $warehouse_id)
                    ->whereRaw('sm2.department_category_id = sm.department_category_id')
                    ->whereNull('sm2.deleted_at')
                    ->whereBetween('sm2.date', [$fromDate, $toDate]);
            })
            ->groupBy('sm.department_category_id', 'sm.product_id')
            ->havingRaw('SUM(COALESCE(sm.StockIn, 0) - COALESCE(sm.StockOut, 0)) != 0')
            ->selectRaw("
               'OP' AS stock_type,
    NULL AS purchased_id,
    NULL AS date,
    sm.department_category_id,
    dc.name as department_name,
    '' AS unit,
    p.name AS product_name,
    SUM(COALESCE(sm.StockIn, 0) - COALESCE(sm.StockOut, 0)) AS opening_qty,
    CASE
        WHEN SUM(COALESCE(sm.StockIn, 0)) > 0 THEN
            SUM(COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0)) /
            SUM(COALESCE(sm.StockIn, 0))
        ELSE 0
    END AS opening_avg_cost,
    0 AS StockIn,
    0 AS StockOut,
    0 AS StockInVal,
    0 AS StockOutVal
            ");


        // $transactions = array_merge($transactions1->toArray(), $openingQuery->toArray());
        // $transactions = $openingQuery;

        // Combine with union all
        $finalQuery = $transactions1->unionAll($openingQuery);

        // Execute the query and order the results
        $transactions = DB::table(DB::raw("({$finalQuery->toSql()}) as final"))
            ->mergeBindings($finalQuery)
            ->orderBy('department_category_id')
            ->orderBy('product_name')
            ->orderBy('date')
            ->get();
        //  $transactions = $openingQuery;
        $item_data = [];
        $sales_details = [];
        // Initialize Grand Totals
        $grand_total_opening = 0;
        $grand_total_opening_value = 0;
        $grand_total_stock_in = 0;
        $grand_total_stock_in_val = 0;
        $grand_total_stock_out = 0;
        $grand_total_stock_out_val = 0;
        $grand_total_balance = 0;
        $grand_total_balance_value = 0;
        $grand_total_value = 0;

        // Initialize running totals
        $running_balance_inventory = 0;
        $running_balance_inventory_value = 0;

        // Initialize Department Subtotals
        $current_department = null;

        $sales_details = [];
        $current_product = null;
        $opening_stockOnly_status = 0;

        /// Loop through each transaction to process
        foreach ($transactions as $row) {
            // Ensure safe numerical values (convert null to 0)
            $stock_in = floatval($row->StockIn ?? 0);
            $stock_in_val = floatval($row->StockInVal ?? 0);
            $stock_out = floatval($row->StockOut ?? 0);
            $stock_out_val = floatval($row->StockOutVal ?? 0);
            $cost_price_per_unit = floatval($row->opening_avg_cost ?? 0);
            $opening_qty = floatval($row->opening_qty ?? 0);
            $opening_avg_cost = floatval($row->opening_avg_cost ?? 0);


            // Check if the department has changed and add a department header
            // Detect change in product to add product header and include opening_qty only in first row
            if ($current_product !== $row->product_name || (int) trim($current_department) !== (int) trim($row->department_category_id)) {

                // If switching products, include opening_qty for first row of new product
                $opening_qty = floatval($row->opening_qty ?? 0);
                $opening_value = $opening_qty * $cost_price_per_unit;
                $include_opening_qty = true; // Opening_qty is included in the first row

                // $grand_total_opening_value = $opening_avg_cost;
            } else {
                // Exclude opening_qty from subsequent rows
                $opening_qty = 0;
                $opening_value = 0;
                $include_opening_qty = false;
            }

            // Calculate Balance Inventory and Balance Inventory Value
            $balance_inventory = $running_balance_inventory + $stock_in - $stock_out;
            $balance_inventory_value = $running_balance_inventory_value + $stock_in_val - $stock_out_val;



            // Detect change in product to add product header and include opening_qty only in first row

            if ($current_department === null || (int) trim($current_department) !== (int) trim($row->department_category_id))
            // if ($current_product !== $row->product_name)
            {


                // Add a subtotal row for the previous product if not the first product


                if ($current_product !== $row->product_name || (int) trim($current_department) !== (int) trim($row->department_category_id)) {

                    $current_department = $row->department_category_id;
                    // Add a department header




                    $grand_total_opening += $product_total_opening;
                    $grand_total_stock_in += $product_total_stock_in;
                    $grand_total_stock_in_val += $product_total_stock_in_val;
                    $grand_total_stock_out += $product_total_stock_out;
                    $grand_total_stock_out_val += $product_total_stock_out_val;
                    $grand_total_opening_value += $product_total_opening_value;
                    $grand_total_balance += ($product_total_stock_in - $product_total_stock_out);
                    $grand_total_balance_value += ($product_total_opening_value + $product_total_stock_in_val - $product_total_stock_out_val);

                    $product_total_opening = 0;
                    $product_total_opening_value = 0;
                    $product_total_stock_in = 0;
                    $product_total_stock_in_val = 0;
                    $product_total_stock_out = 0;
                    $product_total_stock_out_val = 0;
                    $product_total_balance = 0;
                    $product_total_balance_value = 0;
                    $product_total_value = 0;
                    // }
                    $sales_details[] = [
                        'v_no' => '',
                        'v_type' => 'Department:' . $row->department_name, // Department header
                        'date' => '',
                        'product_name' => '',
                        'opening_qty' => '',
                        'opening_value' => '',
                        'stock_in' => '',
                        'stock_in_val' => '',
                        'stock_out' => '',
                        'stock_out_val' => '',
                        'balance_inventory' => '',
                        'balance_inventory_value' => '',
                        'unit' => '',
                        'opening_avg_cost' => '',
                        'total_value' => '',
                    ];

                }

                // Reset totals for the new product
                $product_total_opening = $opening_qty;
                $product_total_opening_value = $opening_qty * $cost_price_per_unit;
                $product_total_stock_in = $stock_in;
                $product_total_stock_in_val = $stock_in_val;
                $product_total_stock_out = $stock_out;
                $product_total_stock_out_val = $stock_out_val;
                $product_total_balance = $opening_qty + $stock_in - $stock_out;
                $product_total_balance_value = ($opening_qty * $cost_price_per_unit) + $stock_in_val - $stock_out_val;
                $product_total_value = $product_total_balance_value;

                // Store the first row of the new product
                $sales_details[] = [
                    'v_no' => '',
                    'v_type' => '',
                    'date' => '',
                    'product_name' => $row->product_name,
                    'opening_qty' => number_format($product_total_opening, 2),
                    'opening_value' => number_format($product_total_opening_value, 2),
                    'stock_in' => number_format($stock_in, 2),
                    'stock_in_val' => number_format($stock_in_val, 2),
                    'stock_out' => number_format($stock_out, 2),
                    'stock_out_val' => number_format($stock_out_val, 2),
                    'balance_inventory' => number_format($product_total_balance, 2),
                    'balance_inventory_value' => number_format($product_total_balance_value, 2),
                    'unit' => $row->unit,
                    'opening_avg_cost' => number_format($opening_avg_cost, 2),
                    'total_value' => number_format($product_total_balance_value, 2),
                ];



            } else {


                if ($current_product !== $row->product_name) {



                    if ($current_product !== null) {



                        $grand_total_opening += $product_total_opening;
                        $grand_total_opening_value += $product_total_opening_value;
                        $grand_total_stock_in += $product_total_stock_in;
                        $grand_total_stock_in_val += $product_total_stock_in_val;
                        $grand_total_stock_out += $product_total_stock_out;
                        $grand_total_stock_out_val += $product_total_stock_out_val;
                        $grand_total_balance += ($product_total_opening + $product_total_stock_in - $product_total_stock_out);
                        $grand_total_balance_value += ($product_total_opening_value + $product_total_stock_in_val - $product_total_stock_out_val);


                        $current_department = $row->department_category_id;
                        // Reset product totals when department changes
                        $product_total_opening = 0;
                        $product_total_opening_value = 0;
                        $product_total_stock_in = 0;
                        $product_total_stock_in_val = 0;
                        $product_total_stock_out = 0;
                        $product_total_stock_out_val = 0;
                        $product_total_balance = 0;
                        $product_total_balance_value = 0;
                        $product_total_value = 0;
                    }




                }
                // Update running totals for the current product
                $product_total_opening = $opening_qty;
                $product_total_opening_value = $opening_qty * $cost_price_per_unit;
                $product_total_stock_in += $stock_in;
                $product_total_stock_in_val += $stock_in_val;
                $product_total_stock_out += $stock_out;
                $product_total_stock_out_val += $stock_out_val;
                $product_total_balance = $product_total_opening + $product_total_stock_in - $product_total_stock_out;
                $product_total_balance_value = ($product_total_opening * $cost_price_per_unit) + $product_total_stock_in_val - $product_total_stock_out_val;
                $product_total_value = $product_total_balance_value;


                // Store the row for the current product
                $sales_details[] = [
                    'v_no' => '',
                    'v_type' => '',
                    'date' => '',//$row->date
                    'product_name' => $row->product_name,
                    'opening_qty' => number_format($product_total_opening, 2),
                    'opening_value' => number_format($product_total_opening_value, 2),
                    'stock_in' => number_format($stock_in, 2),
                    'stock_in_val' => number_format($stock_in_val, 2),
                    'stock_out' => number_format($stock_out, 2),
                    'stock_out_val' => number_format($stock_out_val, 2),
                    'balance_inventory' => number_format($product_total_balance, 2),
                    'balance_inventory_value' => number_format($product_total_balance_value, 2),
                    'unit' => $row->unit,
                    'opening_avg_cost' => number_format($opening_avg_cost, 2),
                    'total_value' => number_format($product_total_balance_value, 2),
                ];



            }

            // Update current product tracker
            $current_product = $row->product_name;


            // Update running balances for next row
            $running_balance_inventory = $product_total_balance;
            $running_balance_inventory_value = $product_total_balance_value;
        }

        // Add Subtotal for the last product
        if ($current_product !== null) {



            $grand_total_opening += $product_total_opening;
            $grand_total_stock_in += $product_total_stock_in;
            $grand_total_stock_in_val += $product_total_stock_in_val;
            $grand_total_stock_out += $product_total_stock_out;
            $grand_total_stock_out_val += $product_total_stock_out_val;
            $grand_total_opening_value += $product_total_opening_value;

        }



        $grand_total_balance = $grand_total_opening + ($grand_total_stock_in - $grand_total_stock_out);
        $grand_total_balance_value = $grand_total_opening_value + ($grand_total_stock_in_val - $grand_total_stock_out_val);

        $sales_details[] = [
            'v_no' => '',
            'v_type' => 'Grand Total',
            'date' => '',
            'product_name' => '',
            'opening_qty' => number_format($grand_total_opening, 2),
            'opening_value' => number_format($grand_total_opening_value, 2),
            'stock_in' => number_format($grand_total_stock_in, 2),
            'stock_in_val' => number_format($grand_total_stock_in_val, 2),
            'stock_out' => number_format($grand_total_stock_out, 2),
            'stock_out_val' => number_format($grand_total_stock_out_val, 2),
            'balance_inventory' => number_format($grand_total_balance, 2),
            'balance_inventory_value' => number_format($grand_total_balance_value, 2),
            'unit' => '',
            'opening_avg_cost' => '',
            'total_value' => number_format($grand_total_balance_value, 2),
        ];

        // Return the final result
        return response()->json($sales_details);

    }




    public function getProfitLossReport(Request $request)
    {
        $validated = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        $start_date = $validated['start_date'];
        $end_date = $validated['end_date'];
        $product = $request->input('product');
        $sellable_item = $request->input('sellable_item');

        $categories = $request->input('categories');


        $report = DB::table('stock_maintenance')
            ->select(
                'products.name as product_name',
                'units.ShortName as unit',
                'stock_maintenance.date',
                'stock_maintenance.product_id',
                'sale_details.sale_id',
                DB::raw('ROUND(stock_maintenance.unit_price, 2) as cost_price_per_unit'),
                'stock_maintenance.StockOut as quantity_sold',
                DB::raw('ROUND(stock_maintenance.StockOut * stock_maintenance.unit_price, 2) as total_cost'),
                DB::raw('ROUND((sale_details.discount * sale_details.price) / 100, 2) as total_discount'),
                DB::raw('ROUND(sale_details.price, 2) as sale_price_per_unit'),
                DB::raw('ROUND(sale_details.total, 2) as total_sale_amount'),
                DB::raw('ROUND(sale_details.total - (stock_maintenance.StockOut * stock_maintenance.unit_price), 2) as profit_loss')
            )

            ->leftJoin('sale_details', function ($join) {
                $join->on('sale_details.sale_id', '=', 'stock_maintenance.purchased_id')
                    ->on('sale_details.product_id', '=', 'stock_maintenance.product_id');
            })
            ->leftJoin('products', 'products.id', '=', 'stock_maintenance.product_id')
            ->leftJoin('units', 'units.id', '=', 'products.unit_sale_id')
            ->where('stock_maintenance.stock_type', 'SL')
            ->whereNull('stock_maintenance.deleted_at')
            ->whereBetween('stock_maintenance.date', [$start_date, $end_date])
            ->when($product, function ($query, $product) {
                return $query->where('stock_maintenance.product_id', $product);
            })
            ->when($sellable_item == 1, function ($query) {
                return $query->where('products.not_selling', 0);
            })
            // Category filtering removed - categories table no longer used

            ->orderBy('stock_maintenance.product_id', 'asc')
            ->orderBy('stock_maintenance.date', 'asc')

            ->get();

        return response()->json($report);
    }











    public function getStockInventoryReportDetails_nongrp(Request $request)
    {


        $product_total_opening = 0;
        $product_total_opening_value = 0;
        $product_total_stock_in = 0;
        $product_total_stock_in_val = 0;
        $product_total_stock_out = 0;
        $product_total_stock_out_val = 0;
        $product_total_balance = 0;
        $product_total_balance_value = 0;
        $product_total_value = 0;


        $fromDate = $request->input('start_date');
        $toDate = $request->input('end_date');
        $product = $request->input('product');
        $warehouse_id = $request->input('warehouse_id');

        $sellable_item = $request->input('sellable_item');


        $categories = $request->input('categories');

        // Opening Stock Subquery
        // Opening Stock Subquery
        $openingStock = DB::table('stock_maintenance as sm')
            ->selectRaw('
               sm.product_id,
               SUM(COALESCE(sm.StockIn, 0) - COALESCE(sm.StockOut, 0)) AS opening_balance,
               CASE
                   WHEN SUM(COALESCE(sm.StockIn, 0)) > 0 THEN
                       SUM(COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0)) / SUM(COALESCE(sm.StockIn, 0))
                   ELSE 0
               END AS avg_cost_price,
               CASE
                   WHEN SUM(COALESCE(sm.StockIn, 0)) > 0 THEN
                       (SUM(COALESCE(sm.StockIn, 0) - COALESCE(sm.StockOut, 0)) *
                       SUM(COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0)) / SUM(COALESCE(sm.StockIn, 0)))
                   ELSE 0
               END AS opening_value
           ')
            ->where('sm.date', '<', $fromDate)
            ->where('sm.warehouse_id', $warehouse_id)
            ->groupBy('sm.product_id');

        $transactions1 = DB::table('stock_maintenance as sm')
            ->leftJoin('products as p', 'sm.product_id', '=', 'p.id')
            ->leftJoin('units as u', 'sm.unit_id', '=', 'u.id')
            ->leftJoin('categories as c', 'p.category_id', '=', 'c.id')
            ->select(
                'sm.stock_type',
                'sm.purchased_id',
                'sm.date',
                'p.category_id',
                'c.name as category_name',
                'u.name as unit',
                'p.name as product_name',
                DB::raw('COALESCE(os.opening_balance, 0) AS opening_qty'),
                DB::raw('COALESCE(os.avg_cost_price, 0) AS opening_avg_cost'),
                DB::raw('COALESCE(os.opening_value, 0) AS opening_value'),
                DB::raw('COALESCE(sm.StockIn, 0) AS StockIn'),
                DB::raw('COALESCE(sm.StockOut, 0) AS StockOut'),
                DB::raw('COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0) AS StockInVal'),
                DB::raw('COALESCE(sm.StockOut, 0) * COALESCE(sm.unit_price, 0) AS StockOutVal')
            )
            ->leftJoinSub($openingStock, 'os', function ($join) {
                $join->on('sm.product_id', '=', 'os.product_id');
            })
            ->whereBetween('sm.date', [$fromDate, $toDate])
            ->where('sm.warehouse_id', $warehouse_id)
            ->whereNull('sm.deleted_at')
            //    ->groupBy('p.category_id')
            ->when($product, function ($query) use ($product) {
                return $query->where('sm.product_id', $product); // Filter by single product ID if provided
            });

        ;

        // Apply category filter if provided
        if ($categories) {
            $transactions1->whereIn('p.category_id', $categories) ;// Filter by multiple category IDs
        }

        // Continue with other parts of your query (same as before)
        $openingQuery = DB::table('stock_maintenance as sm')
            ->leftJoin('products as p', 'sm.product_id', '=', 'p.id')
            ->leftJoin('categories as c', 'p.category_id', '=', 'c.id')
            ->whereNull('sm.deleted_at')
            ->where('sm.date', '<', $fromDate)
            ->where('sm.warehouse_id', $warehouse_id)
            ->groupBy('p.category_id', 'sm.product_id')
            ->havingRaw('SUM(COALESCE(sm.StockIn, 0) - COALESCE(sm.StockOut, 0)) != 0')
            ->selectRaw("
               'OP' AS stock_type,
               NULL AS purchased_id,
               NULL AS date,
               p.category_id,
               c.name AS category_name,
               '' AS unit,
               p.name AS product_name,
               SUM(COALESCE(sm.StockIn, 0) - COALESCE(sm.StockOut, 0)) AS opening_qty,
               CASE
                   WHEN SUM(COALESCE(sm.StockIn, 0)) > 0 THEN
                       SUM(COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0)) /
                       SUM(COALESCE(sm.StockIn, 0))
                   ELSE 0
               END AS opening_avg_cost,
               CASE
                   WHEN SUM(COALESCE(sm.StockIn, 0)) > 0 THEN
                       (SUM(COALESCE(sm.StockIn, 0) - COALESCE(sm.StockOut, 0)) *
                        SUM(COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0)) /
                        SUM(COALESCE(sm.StockIn, 0)))
                   ELSE 0
               END AS opening_value,
               0 AS StockIn,
               0 AS StockOut,
               0 AS StockInVal,
               0 AS StockOutVal
           ")
            ->when($product, function ($query) use ($product) {
                return $query->where('sm.product_id', $product); // Filter by single product ID if provided
            });
        ;

        // Apply category filter if provided (same as for $transactions1)
        if ($categories) {
            $openingQuery->whereIn('p.category_id', $categories);
        }


        // Combine the queries with union
        $finalQuery = $transactions1->unionAll($openingQuery);

        // Final result query
        $transactions = DB::table(DB::raw("({$finalQuery->toSql()}) as final"))
            ->mergeBindings($finalQuery)
            ->orderBy('category_id')
            ->orderBy('product_name')
            ->orderBy('date')
            ->orderBy('stockIn', 'desc')
            ->get();




        // $transactions =    $transactions1;

        $item_data = [];
        $sales_details = [];
        // Initialize Grand Totals
        $grand_total_opening = 0;
        $grand_total_opening_value = 0;
        $grand_total_stock_in = 0;
        $grand_total_stock_in_val = 0;
        $grand_total_stock_out = 0;
        $grand_total_stock_out_val = 0;
        $grand_total_balance = 0;
        $grand_total_balance_value = 0;
        $grand_total_value = 0;

        // Initialize running totals
        $running_balance_inventory = 0;
        $running_balance_inventory_value = 0;

        // Initialize Department Subtotals
        $current_department = null;

        $sales_details = [];
        $current_product = null;

        /// Loop through each transaction to process
        foreach ($transactions as $row) {
            // Ensure safe numerical values (convert null to 0)
            $stock_in = floatval($row->StockIn ?? 0);
            $stock_in_val = floatval($row->StockInVal ?? 0);
            $voucherNumber = $row->stock_type . '_' . floatval($row->purchased_id ?? 0);
            $stock_out = floatval($row->StockOut ?? 0);
            $stock_out_val = floatval($row->StockOutVal ?? 0);
            $cost_price_per_unit = floatval($row->opening_avg_cost ?? 0);
            $opening_qty = floatval($row->opening_qty ?? 0);
            $opening_avg_cost = floatval($row->opening_avg_cost ?? 0);



            // Check if the department has changed and add a department header
            // Detect change in product to add product header and include opening_qty only in first row
            if ($current_product !== $row->product_name) {
                // If switching products, include opening_qty for first row of new product
                $opening_qty = floatval($row->opening_qty ?? 0);
                $opening_value = $opening_qty * $cost_price_per_unit;

                $New_opening_rate = $cost_price_per_unit;



                $include_opening_qty = true; // Opening_qty is included in the first row
                // $grand_total_opening += $opening_qty;
                // $grand_total_opening_value = $opening_avg_cost;
            } else {
                // Exclude opening_qty from subsequent rows
                $opening_qty = 0;
                $opening_value = 0;
                $include_opening_qty = false;

            }

            // // Calculate Balance Inventory and Balance Inventory Value
            $balance_inventory = $running_balance_inventory + $stock_in - $stock_out;
            $balance_inventory_value = $running_balance_inventory_value + $stock_in_val - $stock_out_val;



            // Detect change in product to add product header and include opening_qty only in first row

            if ($current_department === null || (int) trim($current_department) !== (int) trim($row->category_id))
            // if ($current_product !== $row->product_name)
            {


                // Add a subtotal row for the previous product if not the first product


                if ($current_product !== $row->product_name) {

                    $current_department = $row->category_id;
                    // Add a department header


                    $sales_details[] = [
                        'v_no' => '',
                        'v_type' => '',
                        'date' => '',
                        'product_name' => 'Subtotal',
                        'opening_qty' => number_format($product_total_opening, 2),
                        'opening_value' => number_format($product_total_opening_value, 2),
                        'stock_in' => number_format($product_total_stock_in, 2),
                        'stock_in_val' => number_format($product_total_stock_in_val, 2),
                        'stock_out' => number_format($product_total_stock_out, 2),
                        'stock_out_val' => number_format($product_total_stock_out_val, 2),
                        'balance_inventory' => number_format($product_total_balance, 2),
                        'balance_inventory_value' => number_format($product_total_balance_value, 2),
                        'unit' => '',
                        'opening_avg_cost' => '',
                        'total_value' => number_format($product_total_balance_value, 2),
                    ];


                    $grand_total_opening += $product_total_opening;
                    $grand_total_stock_in += $product_total_stock_in;
                    $grand_total_stock_in_val += $product_total_stock_in_val;
                    $grand_total_stock_out += $product_total_stock_out;
                    $grand_total_stock_out_val += $product_total_stock_out_val;
                    $grand_total_opening_value += $product_total_opening_value;
                    $grand_total_balance += ($product_total_stock_in - $product_total_stock_out);
                    $grand_total_balance_value += ($product_total_opening_value + $product_total_stock_in_val - $product_total_stock_out_val);

                    $product_total_opening = 0;
                    $product_total_opening_value = 0;
                    $product_total_stock_in = 0;
                    $product_total_stock_in_val = 0;
                    $product_total_stock_out = 0;
                    $product_total_stock_out_val = 0;
                    $product_total_balance = 0;
                    $product_total_balance_value = 0;
                    $product_total_value = 0;
                    // }
                    $sales_details[] = [
                        'v_no' => '',
                        'v_type' => 'Department:' . $row->category_name, // Department header
                        'date' => '',
                        'product_name' => '',
                        'opening_qty' => '',
                        'opening_value' => '',
                        'stock_in' => '',
                        'stock_in_val' => '',
                        'stock_out' => '',
                        'stock_out_val' => '',
                        'balance_inventory' => '',
                        'balance_inventory_value' => '',
                        'unit' => '',
                        'opening_avg_cost' => '',
                        'total_value' => '',
                    ];

                }

                // Reset totals for the new product
                $product_total_opening = $opening_qty;
                $product_total_opening_value = $opening_qty * $cost_price_per_unit;
                $product_total_stock_in = $stock_in;
                $product_total_stock_in_val = $stock_in_val;
                $product_total_stock_out = $stock_out;
                $product_total_stock_out_val = $stock_out_val;
                $product_total_balance = $opening_qty + $stock_in - $stock_out;
                $product_total_balance_value = ($opening_qty * $cost_price_per_unit) + $stock_in_val - $stock_out_val;
                $product_total_value = $product_total_balance_value;

                // Store the first row of the new product
                $sales_details[] = [
                    'v_no' => $voucherNumber . "__",
                    'v_type' => '',
                    'date' => Carbon::parse($row->date)->format('d-m-Y '),
                    'product_name' => $row->product_name,
                    'opening_qty' => number_format($product_total_opening, 2),
                    'opening_value' => number_format($product_total_opening_value, 2),
                    'stock_in' => number_format($stock_in, 2),
                    'stock_in_val' => number_format($stock_in_val, 2),
                    'stock_out' => number_format($stock_out, 2),
                    'stock_out_val' => number_format($stock_out_val, 2),
                    'balance_inventory' => number_format($product_total_balance, 2),
                    'balance_inventory_value' => number_format($product_total_balance_value, 2),
                    'unit' => $row->unit,
                    'opening_avg_cost' => number_format($product_total_balance_value / $product_total_balance, 2),
                    'total_value' => number_format($product_total_balance_value, 2),
                ];



            } else {


                if ($current_product !== $row->product_name) {



                    if ($current_product !== null) {
                        $sales_details[] = [
                            'v_no' => '',
                            'v_type' => '',
                            'date' => '',
                            'product_name' => 'Subtotal',
                            'opening_qty' => number_format($product_total_opening, 2),
                            'opening_value' => number_format($product_total_opening_value, 2),
                            'stock_in' => number_format($product_total_stock_in, 2),
                            'stock_in_val' => number_format($product_total_stock_in_val, 2),
                            'stock_out' => number_format($product_total_stock_out, 2),
                            'stock_out_val' => number_format($product_total_stock_out_val, 2),
                            'balance_inventory' => number_format($product_total_balance, 2),
                            'balance_inventory_value' => number_format($product_total_balance_value, 2),
                            'unit' => '',
                            'opening_avg_cost' => '',
                            'total_value' => number_format($product_total_balance_value, 2),
                        ];

                        $grand_total_opening += $product_total_opening;
                        $grand_total_opening_value += $product_total_opening_value;
                        $grand_total_stock_in += $product_total_stock_in;
                        $grand_total_stock_in_val += $product_total_stock_in_val;
                        $grand_total_stock_out += $product_total_stock_out;
                        $grand_total_stock_out_val += $product_total_stock_out_val;
                        $grand_total_balance += ($product_total_opening + $product_total_stock_in - $product_total_stock_out);
                        $grand_total_balance_value += ($product_total_opening_value + $product_total_stock_in_val - $product_total_stock_out_val);


                        $current_department = $row->category_id;
                        // Reset product totals when department changes
                        $product_total_opening = 0;
                        $product_total_opening_value = 0;
                        $product_total_stock_in = 0;
                        $product_total_stock_in_val = 0;
                        $product_total_stock_out = 0;
                        $product_total_stock_out_val = 0;
                        $product_total_balance = 0;
                        $product_total_balance_value = 0;
                        $product_total_value = 0;
                    }




                }
                // Update running totals for the current product
                $product_total_opening += $opening_qty;
                $product_total_opening_value += $opening_qty * $cost_price_per_unit;
                $product_total_stock_in += $stock_in;
                $product_total_stock_in_val += $stock_in_val;
                $product_total_stock_out += $stock_out;
                $product_total_stock_out_val += $stock_out_val;
                $product_total_balance = $product_total_opening + $product_total_stock_in - $product_total_stock_out;
                $product_total_balance_value = ($product_total_opening * $New_opening_rate) + $product_total_stock_in_val - $product_total_stock_out_val;
                $product_total_value = $product_total_balance_value;


                // Store the row for the current product
                $sales_details[] = [
                    'v_no' => $voucherNumber . "",
                    'v_type' => '',
                    'date' => Carbon::parse($row->date)->format('d-m-Y '),
                    'product_name' => $row->product_name,
                    'opening_qty' => number_format($opening_qty, 2),
                    'opening_value' => number_format($product_total_opening_value, 2),
                    'stock_in' => number_format($stock_in, 2),
                    'stock_in_val' => number_format($stock_in_val, 2),
                    'stock_out' => number_format($stock_out, 2),
                    'stock_out_val' => number_format($stock_out_val, 2),
                    'balance_inventory' => number_format($product_total_balance, 2),
                    'balance_inventory_value' => number_format($product_total_balance_value, 2),
                    'unit' => $row->unit,
                    'opening_avg_cost' => $product_total_balance != 0
                    ? number_format($product_total_balance_value / $product_total_balance, 2)
                    : '0.00',
                    'total_value' => number_format($product_total_balance_value, 2),
                ];



            }

            // Update current product tracker
            $current_product = $row->product_name;


            // Update running balances for next row
            $running_balance_inventory = $product_total_balance;
            $running_balance_inventory_value = $product_total_balance_value;
        }

        // Add Subtotal for the last product
        if ($current_product !== null) {
            $sales_details[] = [
                'v_no' => '',
                'v_type' => '',
                'date' => '',
                'product_name' => 'Subtotal',
                'opening_qty' => number_format($product_total_opening, 2),
                'opening_value' => number_format($product_total_opening_value, 2),
                'stock_in' => number_format($product_total_stock_in, 2),
                'stock_in_val' => number_format($product_total_stock_in_val, 2),
                'stock_out' => number_format($product_total_stock_out, 2),
                'stock_out_val' => number_format($product_total_stock_out_val, 2),
                'balance_inventory' => number_format($product_total_balance, 2),
                'balance_inventory_value' => number_format($product_total_balance_value, 2),
                'unit' => '',
                'opening_avg_cost' => '',
                'total_value' => number_format($product_total_balance_value, 2),
            ];

            $grand_total_opening += $product_total_opening;
            $grand_total_stock_in += $product_total_stock_in;
            $grand_total_stock_in_val += $product_total_stock_in_val;
            $grand_total_stock_out += $product_total_stock_out;
            $grand_total_stock_out_val += $product_total_stock_out_val;
            $grand_total_opening_value += $product_total_opening_value;
            $grand_total_balance += ($product_total_opening + $product_total_stock_in - $product_total_stock_out);
            $grand_total_balance_value += ($product_total_opening_value + $product_total_stock_in_val - $product_total_stock_out_val);
        }





        $grand_total_balance = $grand_total_opening + ($grand_total_stock_in - $grand_total_stock_out);
        $grand_total_balance_value = $grand_total_opening_value + ($grand_total_stock_in_val - $grand_total_stock_out_val);

        $sales_details[] = [
            'v_no' => '',
            'v_type' => 'Grand Total',
            'date' => '',
            'product_name' => '',
            'opening_qty' => number_format($grand_total_opening, 2),
            'opening_value' => number_format($grand_total_opening_value, 2),
            'stock_in' => number_format($grand_total_stock_in, 2),
            'stock_in_val' => number_format($grand_total_stock_in_val, 2),
            'stock_out' => number_format($grand_total_stock_out, 2),
            'stock_out_val' => number_format($grand_total_stock_out_val, 2),
            'balance_inventory' => number_format($grand_total_balance, 2),
            'balance_inventory_value' => number_format($grand_total_balance_value, 2),
            'unit' => '',
            'opening_avg_cost' => '',
            'total_value' => number_format($grand_total_balance_value, 2),
        ];

        // Return the final result
        return response()->json($sales_details);

    }



    public function getStockInventoryReportsummary_nongrp(Request $request)
    {


        $product_total_opening = 0;
        $product_total_opening_value = 0;
        $product_total_stock_in = 0;
        $product_total_stock_in_val = 0;
        $product_total_stock_out = 0;
        $product_total_stock_out_val = 0;
        $product_total_balance = 0;
        $product_total_balance_value = 0;
        $product_total_value = 0;


        $fromDate = $request->input('start_date');
        $toDate = $request->input('end_date');
        $product = $request->input('product');
        $warehouse_id = $request->input('warehouse_id');

        $sellable_item = $request->input('sellable_item');


        $categories = $request->input('categories');

        // Opening Stock Subquery
        // Opening Stock Subquery
        $openingStock = DB::table('stock_maintenance as sm')
            ->selectRaw('
        sm.product_id,
        SUM(COALESCE(sm.StockIn, 0) - COALESCE(sm.StockOut, 0)) AS opening_qty,
        CASE
            WHEN SUM(COALESCE(sm.StockIn, 0)) > 0 THEN
                SUM(COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0)) / SUM(COALESCE(sm.StockIn, 0))
            ELSE 0
        END AS opening_avg_cost,
        CASE
            WHEN SUM(COALESCE(sm.StockIn, 0)) > 0 THEN
                (SUM(COALESCE(sm.StockIn, 0) - COALESCE(sm.StockOut, 0)) *
                SUM(COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0)) / SUM(COALESCE(sm.StockIn, 0)))
            ELSE 0
        END AS opening_value
    ')
            ->where('sm.date', '<', $fromDate)
            ->where('sm.warehouse_id', $warehouse_id)
            ->whereNull('sm.deleted_at')
            ->groupBy('sm.product_id');

        $transactions = DB::table('stock_maintenance as sm')
            ->leftJoin('products as p', 'sm.product_id', '=', 'p.id')
            ->leftJoin('units as u', 'sm.unit_id', '=', 'u.id')
            ->leftJoin('categories as c', 'p.category_id', '=', 'c.id')
            ->leftJoinSub($openingStock, 'os', function ($join) {
                $join->on('sm.product_id', '=', 'os.product_id');
            })
            ->whereBetween('sm.date', [$fromDate, $toDate])
            ->where('sm.warehouse_id', $warehouse_id)
            ->whereNull('sm.deleted_at')
            ->when($product, function ($query) use ($product) {
                return $query->where('sm.product_id', $product);
            })
            ->when($categories, function ($query) use ($categories) {
                return $query->whereIn('p.category_id', $categories);
            })
            ->groupBy('sm.product_id', 'p.name', 'c.name', 'p.category_id', 'os.opening_qty', 'os.opening_avg_cost', 'os.opening_value')
            ->selectRaw("
        'SUMMARY' AS stock_type,
        NULL AS purchased_id,
        NULL AS date,
        p.category_id,
        c.name AS category_name,
        u.name AS unit,
        p.name AS product_name,
        COALESCE(os.opening_qty, 0) AS opening_qty,
        COALESCE(os.opening_avg_cost, 0) AS opening_avg_cost,
        COALESCE(os.opening_value, 0) AS opening_value,
        SUM(COALESCE(sm.StockIn, 0)) AS StockIn,
        SUM(COALESCE(sm.StockOut, 0)) AS StockOut,
        SUM(COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0)) AS StockInVal,
        SUM(COALESCE(sm.StockOut, 0) * COALESCE(sm.unit_price, 0)) AS StockOutVal
    ")
            ->orderBy('p.category_id')
            ->orderBy('p.name')
            ->get();





        // $transactions =    $transactions1;

        $item_data = [];
        $sales_details = [];
        // Initialize Grand Totals
        $grand_total_opening = 0;
        $grand_total_opening_value = 0;
        $grand_total_stock_in = 0;
        $grand_total_stock_in_val = 0;
        $grand_total_stock_out = 0;
        $grand_total_stock_out_val = 0;
        $grand_total_balance = 0;
        $grand_total_balance_value = 0;
        $grand_total_value = 0;

        // Reset totals for the new product
        $sub_total_opening = 0;
        $sub_total_opening_value = 0;
        $sub_total_stock_in = 0;
        $sub_total_stock_in_val = 0;
        $sub_total_stock_out = 0;
        $sub_total_stock_out_val = 0;
        $sub_total_balance = 0;
        $sub_total_balance_value = 0;
        $sub_total_value = 0;

        // Initialize running totals
        $running_balance_inventory = 0;
        $running_balance_inventory_value = 0;

        // Initialize Department Subtotals
        $current_department = null;

        $sales_details = [];
        $current_product = null;

        /// Loop through each transaction to process
        foreach ($transactions as $row) {
            // Ensure safe numerical values (convert null to 0)
            $stock_in = floatval($row->StockIn ?? 0);
            $stock_in_val = floatval($row->StockInVal ?? 0);
            $voucherNumber = $row->stock_type . '_' . floatval($row->purchased_id ?? 0);
            $stock_out = floatval($row->StockOut ?? 0);
            $stock_out_val = floatval($row->StockOutVal ?? 0);
            $cost_price_per_unit = floatval($row->opening_avg_cost ?? 0);
            $opening_qty = floatval($row->opening_qty ?? 0);
            $opening_avg_cost = floatval($row->opening_avg_cost ?? 0);



            // Check if the department has changed and add a department header
            // Detect change in product to add product header and include opening_qty only in first row
            if ($current_product !== $row->product_name) {
                // If switching products, include opening_qty for first row of new product
                $opening_qty = floatval($row->opening_qty ?? 0);



                $New_opening_rate = $cost_price_per_unit;


                $opening_value = $opening_qty * $cost_price_per_unit;
                $include_opening_qty = true; // Opening_qty is included in the first row
                // $grand_total_opening += $opening_qty;
                // $grand_total_opening_value = $opening_avg_cost;
            } else {
                // Exclude opening_qty from subsequent rows
                $opening_qty = 0;
                $opening_value = 0;
                $include_opening_qty = false;

            }

            // Calculate Balance Inventory and Balance Inventory Value
            $balance_inventory = $running_balance_inventory + $stock_in - $stock_out;
            $balance_inventory_value = $running_balance_inventory_value + $stock_in_val - $stock_out_val;



            // Detect change in product to add product header and include opening_qty only in first row

            if ($current_department === null || (int) trim($current_department) !== (int) trim($row->category_id))
            // if ($current_product !== $row->product_name)
            {


                // Add a subtotal row for the previous product if not the first product


                if ($current_product !== $row->product_name || (int) trim($current_department) !== (int) trim($row->category_id)) {

                    $current_department = $row->category_id;
                    // Add a department header




                    $sales_details[] = [
                        'v_no' => '',
                        'v_type' => '',
                        'date' => '',
                        'product_name' => 'Subtotal',
                        'opening_qty' => number_format($sub_total_opening, 2),
                        'opening_value' => number_format($sub_total_opening_value, 2),
                        'stock_in' => number_format($sub_total_stock_in, 2),
                        'stock_in_val' => number_format($sub_total_stock_in_val, 2),
                        'stock_out' => number_format($sub_total_stock_out, 2),
                        'stock_out_val' => number_format($sub_total_stock_out_val, 2),
                        'balance_inventory' => number_format($sub_total_balance, 2),
                        'balance_inventory_value' => number_format($sub_total_balance_value, 2),
                        'unit' => '',
                        'opening_avg_cost' => '',
                        'total_value' => number_format($sub_total_balance_value, 2),
                    ];
                    $grand_total_opening += $sub_total_opening;
                    $grand_total_opening_value += $sub_total_opening_value;
                    $grand_total_stock_in += $sub_total_stock_in;
                    $grand_total_stock_in_val += $sub_total_stock_in_val ;
                    $grand_total_stock_out += $sub_total_stock_out ;
                    $grand_total_stock_out_val += $sub_total_stock_out_val ;
                    $grand_total_balance += $sub_total_balance ;
                    $grand_total_balance_value +=  $sub_total_balance_value ;
                    $grand_total_value += $sub_total_value ;

                    $sub_total_opening = 0;
                    $sub_total_opening_value = 0;
                    $sub_total_stock_in = 0;
                    $sub_total_stock_in_val = 0;
                    $sub_total_stock_out = 0;
                    $sub_total_stock_out_val = 0;
                    $sub_total_balance = 0;
                    $sub_total_balance_value = 0;
                    $sub_total_value = 0;


                    // $grand_total_opening += $product_total_opening;
                    //  $grand_total_stock_in += $product_total_stock_in;
                    //  $grand_total_stock_in_val += $product_total_stock_in_val;
                    //  $grand_total_stock_out += $product_total_stock_out;
                    //  $grand_total_stock_out_val += $product_total_stock_out_val;
                    //  $grand_total_opening_value += $product_total_opening_value;
                    //   $grand_total_balance += ($product_total_stock_in - $product_total_stock_out);
                    //  $grand_total_balance_value += ($product_total_opening_value + $product_total_stock_in_val-$product_total_stock_out_val);

                    $product_total_opening = 0;
                    $product_total_opening_value = 0;
                    $product_total_stock_in = 0;
                    $product_total_stock_in_val = 0;
                    $product_total_stock_out = 0;
                    $product_total_stock_out_val = 0;
                    $product_total_balance = 0;
                    $product_total_balance_value = 0;
                    $product_total_value = 0;
                    // }
                    $sales_details[] = [
                        'v_no' => '',
                        'v_type' => 'Department:' . $row->category_name, // Department header
                        'date' => '',
                        'product_name' => '',
                        'opening_qty' => '',
                        'opening_value' => '',
                        'stock_in' => '',
                        'stock_in_val' => '',
                        'stock_out' => '',
                        'stock_out_val' => '',
                        'balance_inventory' => '',
                        'balance_inventory_value' => '',
                        'unit' => '',
                        'opening_avg_cost' => '',
                        'total_value' => '',
                    ];

                }

                // Reset totals for the new product
                $sub_total_opening += $product_total_opening = $opening_qty;
                $sub_total_opening_value += $product_total_opening_value = $opening_qty * $cost_price_per_unit;
                $sub_total_stock_in += $product_total_stock_in = $stock_in;
                $sub_total_stock_in_val += $product_total_stock_in_val = $stock_in_val;
                $sub_total_stock_out += $product_total_stock_out = $stock_out;
                $sub_total_stock_out_val += $product_total_stock_out_val = $stock_out_val;
                $sub_total_balance += $product_total_balance = $opening_qty + $stock_in - $stock_out;
                $sub_total_balance_value += $product_total_balance_value = ($opening_qty * $cost_price_per_unit) + $stock_in_val - $stock_out_val;
                $sub_total_value += $product_total_value = $product_total_balance_value;

                // Store the first row of the new product
                $sales_details[] = [
                    'v_no' => $voucherNumber,
                    'v_type' => '',
                    'date' => Carbon::parse($toDate)->format('d-m-Y '),
                    'product_name' => $row->product_name,
                    'opening_qty' => number_format($product_total_opening, 2),
                    'opening_value' => number_format($product_total_opening_value, 2),
                    'stock_in' => number_format($stock_in, 2),
                    'stock_in_val' => number_format($stock_in_val, 2),
                    'stock_out' => number_format($stock_out, 2),
                    'stock_out_val' => number_format($stock_out_val, 2),
                    'balance_inventory' => number_format($product_total_balance, 2),
                    'balance_inventory_value' => number_format($product_total_balance_value, 2),
                    'unit' => $row->unit,
                    'opening_avg_cost' => number_format($opening_avg_cost, 2),
                    'total_value' => number_format($product_total_balance_value, 2),
                ];



            } else {


                if ($current_product !== $row->product_name) {



                    if ($current_product !== null) {
                        // $sales_details[] = [
                        //     'v_no' => '',
                        //     'v_type' => '',
                        //     'date' => '',
                        //     'product_name' => 'Subtotal',
                        //     'opening_qty' => number_format($product_total_opening, 2),
                        //     'opening_value' => number_format($product_total_opening_value, 2),
                        //     'stock_in' => number_format($product_total_stock_in, 2),
                        //     'stock_in_val' => number_format($product_total_stock_in_val, 2),
                        //     'stock_out' => number_format($product_total_stock_out, 2),
                        //     'stock_out_val' => number_format($product_total_stock_out_val, 2),
                        //     'balance_inventory' => number_format($product_total_balance, 2),
                        //     'balance_inventory_value' => number_format($product_total_balance_value, 2),
                        //     'unit' => '',
                        //     'opening_avg_cost' => '',
                        //     'total_value' => number_format($product_total_balance_value, 2),
                        // ];

                        // $grand_total_opening += $product_total_opening;
                        // $grand_total_opening_value += $product_total_opening_value;
                        // $grand_total_stock_in += $product_total_stock_in;
                        // $grand_total_stock_in_val += $product_total_stock_in_val;
                        // $grand_total_stock_out += $product_total_stock_out;
                        // $grand_total_stock_out_val += $product_total_stock_out_val;
                        // $grand_total_balance += ($product_total_opening + $product_total_stock_in - $product_total_stock_out);
                        // $grand_total_balance_value += ($product_total_opening_value + $product_total_stock_in_val - $product_total_stock_out_val);


                        $current_department = $row->category_id;
                        // Reset product totals when department changes
                        $product_total_opening = 0;
                        $product_total_opening_value = 0;
                        $product_total_stock_in = 0;
                        $product_total_stock_in_val = 0;
                        $product_total_stock_out = 0;
                        $product_total_stock_out_val = 0;
                        $product_total_balance = 0;
                        $product_total_balance_value = 0;
                        $product_total_value = 0;
                    }




                }



                $sub_total_opening += $product_total_opening += $opening_qty;
                $sub_total_opening_value += $product_total_opening_value += $opening_qty * $cost_price_per_unit;
                $sub_total_stock_in += $product_total_stock_in += $stock_in;
                $sub_total_stock_in_val += $product_total_stock_in_val += $stock_in_val;
                $sub_total_stock_out += $product_total_stock_out += $stock_out;
                $sub_total_stock_out_val += $product_total_stock_out_val += $stock_out_val;
                $sub_total_balance += $product_total_balance = $product_total_opening + $product_total_stock_in - $product_total_stock_out;
                $sub_total_balance_value += $product_total_balance_value = ($product_total_opening * $New_opening_rate) + $product_total_stock_in_val - $product_total_stock_out_val;
                $sub_total_value += $product_total_value = $product_total_balance_value;


                // Store the row for the current product
                $sales_details[] = [
                    'v_no' => $voucherNumber,
                    'v_type' => '',
                    'date' => Carbon::parse($toDate)->format('d-m-Y '),
                    'product_name' => $row->product_name,
                    'opening_qty' => number_format($opening_qty, 2),
                    'opening_value' => number_format($product_total_opening_value, 2),
                    'stock_in' => number_format($stock_in, 2),
                    'stock_in_val' => number_format($stock_in_val, 2),
                    'stock_out' => number_format($stock_out, 2),
                    'stock_out_val' => number_format($stock_out_val, 2),
                    'balance_inventory' => number_format($product_total_balance, 2),
                    'balance_inventory_value' => number_format($product_total_balance_value, 2),
                    'unit' => $row->unit,
                    'opening_avg_cost' => number_format($opening_avg_cost, 2),
                    'total_value' => number_format($product_total_balance_value, 2),
                ];



            }

            // Update current product tracker
            $current_product = $row->product_name;


            // Update running balances for next row
            $running_balance_inventory = $product_total_balance;
            $running_balance_inventory_value = $product_total_balance_value;




        }

        // Add Subtotal for the last product
        if ($current_product !== null) {
            // $sales_details[] = [
            //     'v_no' => '',
            //     'v_type' => '',
            //     'date' => '',
            //     'product_name' =>'Subtotal',
            //     'opening_qty' => number_format($product_total_opening, 2),
            //     'opening_value' => number_format($product_total_opening_value, 2),
            //     'stock_in' => number_format($product_total_stock_in, 2),
            //     'stock_in_val' => number_format($product_total_stock_in_val, 2),
            //     'stock_out' => number_format($product_total_stock_out, 2),
            //     'stock_out_val' => number_format($product_total_stock_out_val, 2),
            //     'balance_inventory' => number_format($product_total_balance, 2),
            //     'balance_inventory_value' => number_format($product_total_balance_value, 2),
            //     'unit' => '',
            //     'opening_avg_cost' => '',
            //     'total_value' => number_format($product_total_balance_value, 2),
            // ];

            // $grand_total_opening += $product_total_opening;
            // $grand_total_stock_in += $product_total_stock_in;
            // $grand_total_stock_in_val += $product_total_stock_in_val;
            // $grand_total_stock_out += $product_total_stock_out;
            // $grand_total_stock_out_val += $product_total_stock_out_val;
            // $grand_total_opening_value += $product_total_opening_value;
            // $grand_total_balance += ($product_total_opening + $product_total_stock_in - $product_total_stock_out);
            // $grand_total_balance_value += ($product_total_opening_value + $product_total_stock_in_val - $product_total_stock_out_val);
        }





        // $grand_total_balance = $grand_total_opening + ($grand_total_stock_in - $grand_total_stock_out);
        // $grand_total_balance_value = $grand_total_opening_value + ($grand_total_stock_in_val - $grand_total_stock_out_val);










            $sales_details[] = [
                'v_no' => '',
                'v_type' => '',
                'date' => '',
                'product_name' => 'Subtotal',
                'opening_qty' => number_format($sub_total_opening, 2),
                'opening_value' => number_format($sub_total_opening_value, 2),
                'stock_in' => number_format($sub_total_stock_in, 2),
                'stock_in_val' => number_format($sub_total_stock_in_val, 2),
                'stock_out' => number_format($sub_total_stock_out, 2),
                'stock_out_val' => number_format($sub_total_stock_out_val, 2),
                'balance_inventory' => number_format($sub_total_balance, 2),
                'balance_inventory_value' => number_format($sub_total_balance_value, 2),
                'unit' => '',
                'opening_avg_cost' => '',
                'total_value' => number_format($sub_total_balance_value, 2),
            ];
            $grand_total_opening += $sub_total_opening;
            $grand_total_opening_value += $sub_total_opening_value;
            $grand_total_stock_in += $sub_total_stock_in;
            $grand_total_stock_in_val += $sub_total_stock_in_val ;
            $grand_total_stock_out += $sub_total_stock_out ;
            $grand_total_stock_out_val += $sub_total_stock_out_val ;
            $grand_total_balance += $sub_total_balance ;
            $grand_total_balance_value +=  $sub_total_balance_value ;
            $grand_total_value += $sub_total_value ;


        $sales_details[] = [
            'v_no' => '',
            'v_type' => 'Grand Total',
            'date' => '',
            'product_name' => '',
            'opening_qty' => number_format($grand_total_opening, 2),
            'opening_value' => number_format($grand_total_opening_value, 2),
            'stock_in' => number_format($grand_total_stock_in, 2),
            'stock_in_val' => number_format($grand_total_stock_in_val, 2),
            'stock_out' => number_format($grand_total_stock_out, 2),
            'stock_out_val' => number_format($grand_total_stock_out_val, 2),
            'balance_inventory' => number_format($grand_total_balance, 2),
            'balance_inventory_value' => number_format($grand_total_balance_value, 2),
            'unit' => '',
            'opening_avg_cost' => '',
            'total_value' => number_format($grand_total_balance_value, 2),
        ];

        // Return the final result
        return response()->json($sales_details);

    }





    public function getStockInventoryReportDetails(Request $request)
    {


        $product_total_opening = 0;
        $product_total_opening_value = 0;
        $product_total_stock_in = 0;
        $product_total_stock_in_val = 0;
        $product_total_stock_out = 0;
        $product_total_stock_out_val = 0;
        $product_total_balance = 0;
        $product_total_balance_value = 0;
        $product_total_value = 0;


        $fromDate = $request->input('start_date');
        $toDate = $request->input('end_date');
        $product = $request->input('product');
        $warehouse_id = $request->input('warehouse_id');

        $sellable_item = $request->input('sellable_item');


        $categories = $request->input('categories');

        // Opening Stock Subquery
        // Opening Stock Subquery
        $openingStock = DB::table('stock_maintenance as sm')
            ->selectRaw('
                sm.department_category_id,
                sm.product_id,
                SUM(COALESCE(sm.StockIn, 0) - COALESCE(sm.StockOut, 0)) AS opening_balance,
                CASE
                    WHEN SUM(COALESCE(sm.StockIn, 0)) > 0 THEN
                        SUM(COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0)) / SUM(COALESCE(sm.StockIn, 0))
                    ELSE 0
                END AS avg_cost_price,
                CASE
                    WHEN SUM(COALESCE(sm.StockIn, 0)) > 0 THEN
                        (SUM(COALESCE(sm.StockIn, 0) - COALESCE(sm.StockOut, 0)) *
                        SUM(COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0)) / SUM(COALESCE(sm.StockIn, 0)))
                    ELSE 0
                END AS opening_value
            ')
            ->where('sm.date', '<', $fromDate)
            ->where('sm.warehouse_id', $warehouse_id)
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('product'), function ($query) use ($request) {
                    return $query->where('sm.product_id', $request->product);
                });
            })
            ->whereNull('sm.deleted_at')
            ->groupBy('sm.department_category_id', 'sm.product_id');

        // Main Transactions Query
        $transactions1 = DB::table('stock_maintenance as sm')
            ->leftJoin('products as p', 'sm.product_id', '=', 'p.id')
            ->leftJoin('units as u', 'sm.unit_id', '=', 'u.id')
            ->leftJoin('department_categories as dc', 'sm.department_category_id', '=', 'dc.id')
            ->leftJoinSub($openingStock, 'os', function ($join) {
                $join->on('sm.department_category_id', '=', 'os.department_category_id')
                    ->on('sm.product_id', '=', 'os.product_id');
            })
            ->select(
                'sm.stock_type',
                'sm.purchased_id',
                'sm.date',
                'sm.department_category_id',
                'dc.name as department_name',
                'u.name as unit',
                'p.name as product_name',

                DB::raw('COALESCE(os.opening_balance, 0) AS opening_qty'),
                DB::raw('COALESCE(os.avg_cost_price, 0) AS opening_avg_cost'),
                DB::raw('COALESCE(os.opening_value, 0) AS opening_value'),
                DB::raw('COALESCE(sm.StockIn, 0) AS StockIn'),
                DB::raw('COALESCE(sm.StockOut, 0) AS StockOut'),
                DB::raw('COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0) AS StockInVal'),
                DB::raw('COALESCE(sm.StockOut, 0) * COALESCE(sm.unit_price, 0) AS StockOutVal'),

            )
            ->whereBetween('sm.date', [$fromDate, $toDate])
            ->when($sellable_item == 1, function ($query) {
                return $query->where('p.not_selling', 0);
            })
            ->when(!empty($request->categories), function ($query) use ($categories) {
                return $query->whereIn('p.department_category_id', $categories);
            })


            ->where('sm.warehouse_id', $warehouse_id)
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('product'), function ($query) use ($request) {
                    return $query->where('sm.product_id', $request->product);
                });
            })
            ->whereNull('sm.deleted_at')
            ->orderBy('sm.department_category_id')
            ->orderBy('sm.product_id')
            ->orderBy('sm.date');
        // ->get();



        $openingQuery = DB::table('stock_maintenance as sm')
            ->leftJoin('products as p', 'sm.product_id', '=', 'p.id')
            ->leftJoin('department_categories as dc', 'sm.department_category_id', '=', 'dc.id')
            ->whereNull('sm.deleted_at')
            ->where('sm.date', '<', $fromDate)
            ->where('sm.warehouse_id', $warehouse_id)
            ->when($sellable_item == 1, function ($query) {
                return $query->where('p.not_selling', 0);
            })
            // ->when(is_array($categories) && count($categories) > 0, function ($query) use ($categories) {
            //     return $query->whereIn('p.category_id', $categories);
            // })
            ->when(!empty($request->categories), function ($query) use ($categories) {
                return $query->whereIn('p.department_category_id', $categories);
            })
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('product'), function ($query) use ($request) {
                    return $query->where('sm.product_id', $request->product);
                });
            })

            ->whereNotExists(function ($query) use ($fromDate, $toDate, $warehouse_id) {
                $query->select(DB::raw(1))
                    ->from('stock_maintenance as sm2')
                    ->whereRaw('sm2.product_id = sm.product_id')
                    ->where('sm2.warehouse_id', $warehouse_id)
                    ->whereRaw('sm2.department_category_id = sm.department_category_id')
                    ->whereNull('sm2.deleted_at')
                    ->whereBetween('sm2.date', [$fromDate, $toDate]);
            })
            ->groupBy('sm.department_category_id', 'sm.product_id')
            ->havingRaw('SUM(COALESCE(sm.StockIn, 0) - COALESCE(sm.StockOut, 0)) != 0')
            ->selectRaw("
               'OP' AS stock_type,
    NULL AS purchased_id,
    NULL AS date,
    sm.department_category_id,
    dc.name as department_name,
    '' AS unit,
    p.name AS product_name,
    SUM(COALESCE(sm.StockIn, 0) - COALESCE(sm.StockOut, 0)) AS opening_qty,
    CASE
        WHEN SUM(COALESCE(sm.StockIn, 0)) > 0 THEN
            SUM(COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0)) /
            SUM(COALESCE(sm.StockIn, 0))
        ELSE 0
    END AS opening_avg_cost,
    CASE
        WHEN SUM(COALESCE(sm.StockIn, 0)) > 0 THEN
            (SUM(COALESCE(sm.StockIn, 0) - COALESCE(sm.StockOut, 0)) *
             SUM(COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0)) /
             SUM(COALESCE(sm.StockIn, 0)))
        ELSE 0
    END AS opening_value,
    0 AS StockIn,
    0 AS StockOut,
    0 AS StockInVal,
    0 AS StockOutVal
            ");


        // $transactions = array_merge($transactions1->toArray(), $openingQuery->toArray());
// $transactions = $openingQuery;

        // Combine with union all
        $finalQuery = $transactions1->unionAll($openingQuery);

        // Execute the query and order the results
        $transactions = DB::table(DB::raw("({$finalQuery->toSql()}) as final"))
            ->mergeBindings($finalQuery)
            ->orderBy('department_category_id')
            ->orderBy('product_name')
            ->orderBy('date')
            ->get();


        // $transactions =    $transactions1;

        $item_data = [];
        $sales_details = [];
        // Initialize Grand Totals
        $grand_total_opening = 0;
        $grand_total_opening_value = 0;
        $grand_total_stock_in = 0;
        $grand_total_stock_in_val = 0;
        $grand_total_stock_out = 0;
        $grand_total_stock_out_val = 0;
        $grand_total_balance = 0;
        $grand_total_balance_value = 0;
        $grand_total_value = 0;

        // Initialize running totals
        $running_balance_inventory = 0;
        $running_balance_inventory_value = 0;

        // Initialize Department Subtotals
        $current_department = null;

        $sales_details = [];
        $current_product = null;

        /// Loop through each transaction to process
        foreach ($transactions as $row) {
            // Ensure safe numerical values (convert null to 0)
            $stock_in = floatval($row->StockIn ?? 0);
            $stock_in_val = floatval($row->StockInVal ?? 0);
            $voucherNumber = $row->stock_type . '_' . floatval($row->purchased_id ?? 0);
            $stock_out = floatval($row->StockOut ?? 0);
            $stock_out_val = floatval($row->StockOutVal ?? 0);
            $cost_price_per_unit = floatval($row->opening_avg_cost ?? 0);
            $opening_qty = floatval($row->opening_qty ?? 0);
            $opening_avg_cost = floatval($row->opening_avg_cost ?? 0);



            // Check if the department has changed and add a department header
            // Detect change in product to add product header and include opening_qty only in first row
            if ($current_product !== $row->product_name || (int) trim($current_department) !== (int) trim($row->department_category_id)) {
                // If switching products, include opening_qty for first row of new product
                $opening_qty = floatval($row->opening_qty ?? 0);
                $opening_value = $opening_qty * $cost_price_per_unit;
                $include_opening_qty = true; // Opening_qty is included in the first row
                // $grand_total_opening += $opening_qty;
                // $grand_total_opening_value = $opening_avg_cost;
            } else {
                // Exclude opening_qty from subsequent rows
                $opening_qty = 0;
                $opening_value = 0;
                $include_opening_qty = false;

            }

            // Calculate Balance Inventory and Balance Inventory Value
            $balance_inventory = $running_balance_inventory + $stock_in - $stock_out;
            $balance_inventory_value = $running_balance_inventory_value + $stock_in_val - $stock_out_val;



            // Detect change in product to add product header and include opening_qty only in first row

            if ($current_department === null || (int) trim($current_department) !== (int) trim($row->department_category_id))
            // if ($current_product !== $row->product_name)
            {


                // Add a subtotal row for the previous product if not the first product


                if ($current_product !== $row->product_name || (int) trim($current_department) !== (int) trim($row->department_category_id)) {

                    $current_department = $row->department_category_id;
                    // Add a department header


                    $sales_details[] = [
                        'v_no' => '',
                        'v_type' => '',
                        'date' => '',
                        'product_name' => 'Subtotal',
                        'opening_qty' => number_format($product_total_opening, 2),
                        'opening_value' => number_format($product_total_opening_value, 2),
                        'stock_in' => number_format($product_total_stock_in, 2),
                        'stock_in_val' => number_format($product_total_stock_in_val, 2),
                        'stock_out' => number_format($product_total_stock_out, 2),
                        'stock_out_val' => number_format($product_total_stock_out_val, 2),
                        'balance_inventory' => number_format($product_total_balance, 2),
                        'balance_inventory_value' => number_format($product_total_balance_value, 2),
                        'unit' => '',
                        'opening_avg_cost' => '',
                        'total_value' => number_format($product_total_balance_value, 2),
                    ];


                    $grand_total_opening += $product_total_opening;
                    $grand_total_stock_in += $product_total_stock_in;
                    $grand_total_stock_in_val += $product_total_stock_in_val;
                    $grand_total_stock_out += $product_total_stock_out;
                    $grand_total_stock_out_val += $product_total_stock_out_val;
                    $grand_total_opening_value += $product_total_opening_value;
                    $grand_total_balance += ($product_total_stock_in - $product_total_stock_out);
                    $grand_total_balance_value += ($product_total_opening_value + $product_total_stock_in_val - $product_total_stock_out_val);

                    $product_total_opening = 0;
                    $product_total_opening_value = 0;
                    $product_total_stock_in = 0;
                    $product_total_stock_in_val = 0;
                    $product_total_stock_out = 0;
                    $product_total_stock_out_val = 0;
                    $product_total_balance = 0;
                    $product_total_balance_value = 0;
                    $product_total_value = 0;
                    // }
                    $sales_details[] = [
                        'v_no' => '',
                        'v_type' => 'Department:' . $row->department_name, // Department header
                        'date' => '',
                        'product_name' => '',
                        'opening_qty' => '',
                        'opening_value' => '',
                        'stock_in' => '',
                        'stock_in_val' => '',
                        'stock_out' => '',
                        'stock_out_val' => '',
                        'balance_inventory' => '',
                        'balance_inventory_value' => '',
                        'unit' => '',
                        'opening_avg_cost' => '',
                        'total_value' => '',
                    ];

                }

                // Reset totals for the new product
                $product_total_opening = $opening_qty;
                $product_total_opening_value = $opening_qty * $cost_price_per_unit;
                $product_total_stock_in = $stock_in;
                $product_total_stock_in_val = $stock_in_val;
                $product_total_stock_out = $stock_out;
                $product_total_stock_out_val = $stock_out_val;
                $product_total_balance = $opening_qty + $stock_in - $stock_out;
                $product_total_balance_value = ($opening_qty * $cost_price_per_unit) + $stock_in_val - $stock_out_val;
                $product_total_value = $product_total_balance_value;

                // Store the first row of the new product
                $sales_details[] = [
                    'v_no' => $voucherNumber,
                    'v_type' => '',
                    'date' => Carbon::parse($row->date)->format('d-m-Y '),
                    'product_name' => $row->product_name,
                    'opening_qty' => number_format($product_total_opening, 2),
                    'opening_value' => number_format($product_total_opening_value, 2),
                    'stock_in' => number_format($stock_in, 2),
                    'stock_in_val' => number_format($stock_in_val, 2),
                    'stock_out' => number_format($stock_out, 2),
                    'stock_out_val' => number_format($stock_out_val, 2),
                    'balance_inventory' => number_format($product_total_balance, 2),
                    'balance_inventory_value' => number_format($product_total_balance_value, 2),
                    'unit' => $row->unit,
                    'opening_avg_cost' => number_format($opening_avg_cost, 2),
                    'total_value' => number_format($product_total_balance_value, 2),
                ];



            } else {


                if ($current_product !== $row->product_name) {



                    if ($current_product !== null) {
                        $sales_details[] = [
                            'v_no' => '',
                            'v_type' => '',
                            'date' => '',
                            'product_name' => 'Subtotal',
                            'opening_qty' => number_format($product_total_opening, 2),
                            'opening_value' => number_format($product_total_opening_value, 2),
                            'stock_in' => number_format($product_total_stock_in, 2),
                            'stock_in_val' => number_format($product_total_stock_in_val, 2),
                            'stock_out' => number_format($product_total_stock_out, 2),
                            'stock_out_val' => number_format($product_total_stock_out_val, 2),
                            'balance_inventory' => number_format($product_total_balance, 2),
                            'balance_inventory_value' => number_format($product_total_balance_value, 2),
                            'unit' => '',
                            'opening_avg_cost' => '',
                            'total_value' => number_format($product_total_balance_value, 2),
                        ];

                        $grand_total_opening += $product_total_opening;
                        $grand_total_opening_value += $product_total_opening_value;
                        $grand_total_stock_in += $product_total_stock_in;
                        $grand_total_stock_in_val += $product_total_stock_in_val;
                        $grand_total_stock_out += $product_total_stock_out;
                        $grand_total_stock_out_val += $product_total_stock_out_val;
                        $grand_total_balance += ($product_total_opening + $product_total_stock_in - $product_total_stock_out);
                        $grand_total_balance_value += ($product_total_opening_value + $product_total_stock_in_val - $product_total_stock_out_val);


                        $current_department = $row->department_category_id;
                        // Reset product totals when department changes
                        $product_total_opening = 0;
                        $product_total_opening_value = 0;
                        $product_total_stock_in = 0;
                        $product_total_stock_in_val = 0;
                        $product_total_stock_out = 0;
                        $product_total_stock_out_val = 0;
                        $product_total_balance = 0;
                        $product_total_balance_value = 0;
                        $product_total_value = 0;
                    }




                }
                // Update running totals for the current product
                $product_total_opening += $opening_qty;
                $product_total_opening_value += $opening_qty * $cost_price_per_unit;
                $product_total_stock_in += $stock_in;
                $product_total_stock_in_val += $stock_in_val;
                $product_total_stock_out += $stock_out;
                $product_total_stock_out_val += $stock_out_val;
                $product_total_balance = $product_total_opening + $product_total_stock_in - $product_total_stock_out;
                $product_total_balance_value = ($product_total_opening * $cost_price_per_unit) + $product_total_stock_in_val - $product_total_stock_out_val;
                $product_total_value = $product_total_balance_value;


                // Store the row for the current product
                $sales_details[] = [
                    'v_no' => $voucherNumber,
                    'v_type' => '',
                    'date' => Carbon::parse($row->date)->format('d-m-Y '),
                    'product_name' => $row->product_name,
                    'opening_qty' => number_format($opening_qty, 2),
                    'opening_value' => number_format($product_total_opening_value, 2),
                    'stock_in' => number_format($stock_in, 2),
                    'stock_in_val' => number_format($stock_in_val, 2),
                    'stock_out' => number_format($stock_out, 2),
                    'stock_out_val' => number_format($stock_out_val, 2),
                    'balance_inventory' => number_format($product_total_balance, 2),
                    'balance_inventory_value' => number_format($product_total_balance_value, 2),
                    'unit' => $row->unit,
                    'opening_avg_cost' => number_format($opening_avg_cost, 2),
                    'total_value' => number_format($product_total_balance_value, 2),
                ];



            }

            // Update current product tracker
            $current_product = $row->product_name;


            // Update running balances for next row
            $running_balance_inventory = $product_total_balance;
            $running_balance_inventory_value = $product_total_balance_value;
        }

        // Add Subtotal for the last product
        if ($current_product !== null) {
            $sales_details[] = [
                'v_no' => '',
                'v_type' => '',
                'date' => '',
                'product_name' => 'Subtotal',
                'opening_qty' => number_format($product_total_opening, 2),
                'opening_value' => number_format($product_total_opening_value, 2),
                'stock_in' => number_format($product_total_stock_in, 2),
                'stock_in_val' => number_format($product_total_stock_in_val, 2),
                'stock_out' => number_format($product_total_stock_out, 2),
                'stock_out_val' => number_format($product_total_stock_out_val, 2),
                'balance_inventory' => number_format($product_total_balance, 2),
                'balance_inventory_value' => number_format($product_total_balance_value, 2),
                'unit' => '',
                'opening_avg_cost' => '',
                'total_value' => number_format($product_total_balance_value, 2),
            ];

            $grand_total_opening += $product_total_opening;
            $grand_total_stock_in += $product_total_stock_in;
            $grand_total_stock_in_val += $product_total_stock_in_val;
            $grand_total_stock_out += $product_total_stock_out;
            $grand_total_stock_out_val += $product_total_stock_out_val;
            $grand_total_opening_value += $product_total_opening_value;
            $grand_total_balance += ($product_total_opening + $product_total_stock_in - $product_total_stock_out);
            $grand_total_balance_value += ($product_total_opening_value + $product_total_stock_in_val - $product_total_stock_out_val);
        }





        $grand_total_balance = $grand_total_opening + ($grand_total_stock_in - $grand_total_stock_out);
        $grand_total_balance_value = $grand_total_opening_value + ($grand_total_stock_in_val - $grand_total_stock_out_val);

        $sales_details[] = [
            'v_no' => '',
            'v_type' => 'Grand Total',
            'date' => '',
            'product_name' => '',
            'opening_qty' => number_format($grand_total_opening, 2),
            'opening_value' => number_format($grand_total_opening_value, 2),
            'stock_in' => number_format($grand_total_stock_in, 2),
            'stock_in_val' => number_format($grand_total_stock_in_val, 2),
            'stock_out' => number_format($grand_total_stock_out, 2),
            'stock_out_val' => number_format($grand_total_stock_out_val, 2),
            'balance_inventory' => number_format($grand_total_balance, 2),
            'balance_inventory_value' => number_format($grand_total_balance_value, 2),
            'unit' => '',
            'opening_avg_cost' => '',
            'total_value' => number_format($grand_total_balance_value, 2),
        ];

        // Return the final result
        return response()->json($sales_details);

    }

    public function getProfitLossDetailReport(Request $request)
    {
        $validated = $request->validate([
            'from_date' => 'required|date',
            'to_date' => 'required|date|after_or_equal:from_date',
        ]);

        $from_date = $validated['from_date'];
        $to_date = $validated['to_date'];
        $OrderType = $request->input('OrderType');

        $sales = DB::table('sales')
            ->leftJoinSub(
                DB::table('stock_maintenance')
                    ->select('purchased_id', DB::raw('SUM(unit_price * StockOut) as NetCost'))
                    ->where('stock_type', 'SL')
                    ->whereNull('stock_maintenance.deleted_at')

                    ->groupBy('purchased_id'),
                'stock_maintenance_total',
                'stock_maintenance_total.purchased_id',
                '=',
                'sales.id'
            )
            ->leftJoin('sale_details', 'sale_details.sale_id', '=', 'sales.id')
            ->select(
                'sales.date',
                'sales.Ref',
                DB::raw('NULL as client_name'),
                'sales.GrandTotal',
                'sales.orderType',
                'sales.shipping',
                DB::raw('ROUND(COALESCE(SUM(((sale_details.discount * sale_details.price) / 100 + sales.discount)), 0),2) as totalDiscount'),
                DB::raw('ROUND(COALESCE(stock_maintenance_total.NetCost, 0),2) as NetCost'),
                DB::raw('ROUND((sales.GrandTotal - COALESCE(stock_maintenance_total.NetCost, 0)),2) as profit')
            )
            ->whereBetween('sales.date', [$from_date, $to_date])
            ->whereNull('sales.deleted_at')

            // Apply OrderType filter if it's not "All"
            ->when($OrderType !== 'All', function ($query) use ($OrderType) {
                return $query->where('sales.orderType', '=', $OrderType);
            })

            ->groupBy('sales.id')
            ->orderBy('sales.date', 'asc')
            ->get();




        return response()->json($sales);
    }
    public function getProfitLossReportDetails2(Request $request)
    {


        $product_total_opening = 0;
        $product_total_opening_value = 0;
        $product_total_stock_in = 0;
        $product_total_stock_in_val = 0;
        $product_total_stock_out = 0;
        $product_total_stock_out_val = 0;
        $product_total_balance = 0;
        $product_total_balance_value = 0;
        $product_total_value = 0;


        $fromDate = $request->input('start_date');
        $toDate = $request->input('end_date');
        $product = $request->input('product');
        $warehouse_id = $request->input('warehouse_id');
        $opening_stockOnly_status = 0;


        // Opening Stock Subquery
        // Opening Stock Subquery
        $openingStock = DB::table('stock_maintenance as sm')
            ->selectRaw('
                sm.department_category_id,
                sm.product_id,
                SUM(COALESCE(sm.StockIn, 0) - COALESCE(sm.StockOut, 0)) AS opening_balance,
                CASE
                    WHEN SUM(COALESCE(sm.StockIn, 0)) > 0 THEN
                        SUM(COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0)) / SUM(COALESCE(sm.StockIn, 0))
                    ELSE 0
                END AS avg_cost_price,
                CASE
                    WHEN SUM(COALESCE(sm.StockIn, 0)) > 0 THEN
                        (SUM(COALESCE(sm.StockIn, 0) - COALESCE(sm.StockOut, 0)) *
                        SUM(COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0)) / SUM(COALESCE(sm.StockIn, 0)))
                    ELSE 0
                END AS opening_value
            ')
            ->where('sm.date', '<', $fromDate)
            ->where('sm.warehouse_id', $warehouse_id)
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('product'), function ($query) use ($request) {
                    return $query->where('sm.product_id', $request->product);
                });
            })
            ->whereNull('sm.deleted_at')
            ->groupBy('sm.department_category_id', 'sm.product_id');

        // Main Transactions Query
        $transactions = DB::table('stock_maintenance as sm')
            ->leftJoin('products as p', 'sm.product_id', '=', 'p.id')
            ->leftJoin('units as u', 'sm.unit_id', '=', 'u.id')
            ->leftJoin('department_categories as dc', 'sm.department_category_id', '=', 'dc.id')
            ->rightJoinSub($openingStock, 'os', function ($join) {
                $join->on('sm.department_category_id', '=', 'os.department_category_id')
                    ->on('sm.product_id', '=', 'os.product_id');
            })
            ->select(
                'sm.*',
                'dc.name as department_name',
                'u.name as unit',
                'p.name as product_name',
                DB::raw('COALESCE(sm.StockIn, 0) AS StockIn'),
                DB::raw('COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0) AS StockInVal'),
                DB::raw('COALESCE(sm.StockOut, 0) * COALESCE(sm.unit_price, 0) AS StockOutVal'),
                DB::raw('COALESCE(os.opening_balance, 0) AS opening_qty'),
                DB::raw('COALESCE(os.avg_cost_price, 0) AS opening_avg_cost'),
                DB::raw('COALESCE(os.opening_value, 0) AS opening_value')
            )
            ->whereBetween('sm.date', [$fromDate, $toDate])
            ->where('sm.warehouse_id', $warehouse_id)
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('product'), function ($query) use ($request) {
                    return $query->where('sm.product_id', $request->product);
                });
            })
            ->whereNull('sm.deleted_at')
            ->orderBy('sm.department_category_id')
            ->orderBy('sm.product_id')
            ->orderBy('sm.date')
            ->get();

        $transactionsCount = $transactions->count();

        if ($transactionsCount == 0) {

            // Opening Stock Subquery
            $openingStock = DB::table('stock_maintenance as sm')
                ->leftJoin('products as p', 'sm.product_id', '=', 'p.id')
                ->leftJoin('units as u', 'sm.unit_id', '=', 'u.id')
                ->leftJoin('department_categories as dc', 'sm.department_category_id', '=', 'dc.id')
                ->selectRaw('
                    NULL AS id,
                    NULL AS date,
                    Null As stock_type,
                        sm.department_category_id,
                        sm.product_id,
                        SUM(COALESCE(sm.StockIn, 0)) - SUM(COALESCE(sm.StockOut, 0)) AS opening_qty,
                        CASE
                            WHEN SUM(COALESCE(sm.StockIn, 0)) > 0 THEN
                                SUM(COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0)) / SUM(COALESCE(sm.StockIn, 0))
                            ELSE 0
                        END AS opening_avg_cost,
                        CASE
                            WHEN SUM(COALESCE(sm.StockIn, 0)) > 0 THEN
                                (SUM(COALESCE(sm.StockIn, 0)) - SUM(COALESCE(sm.StockOut, 0))) *
                                (SUM(COALESCE(sm.StockIn, 0) * COALESCE(sm.unit_price, 0)) / SUM(COALESCE(sm.StockIn, 0)))
                            ELSE 0
                        END AS opening_value,
                        dc.name as department_name,
                        u.name as unit,
                        p.name as product_name
                    ')
                ->where('sm.date', '<', $fromDate)
                ->where('sm.warehouse_id', $warehouse_id)
                ->where(function ($query) use ($request) {
                    return $query->when($request->filled('product'), function ($query) use ($request) {
                        return $query->where('sm.product_id', $request->product);
                    });
                })
                ->whereNull('sm.deleted_at')
                ->groupBy('sm.department_category_id', 'sm.product_id')
                ->orderBy('sm.department_category_id')
                ->orderBy('sm.product_id')
                ->get();




            $transactions = $openingStock;
        }

        $item_data = [];
        $sales_details = [];
        // Initialize Grand Totals
        $grand_total_opening = 0;
        $grand_total_opening_value = 0;
        $grand_total_stock_in = 0;
        $grand_total_stock_in_val = 0;
        $grand_total_stock_out = 0;
        $grand_total_stock_out_val = 0;
        $grand_total_balance = 0;
        $grand_total_balance_value = 0;
        $grand_total_value = 0;

        // Initialize running totals
        $running_balance_inventory = 0;
        $running_balance_inventory_value = 0;

        // Initialize Department Subtotals
        $current_department = null;

        $sales_details = [];
        $current_product = null;

        /// Loop through each transaction to process
        foreach ($transactions as $row) {
            // Ensure safe numerical values (convert null to 0)
            $stock_in = floatval($row->StockIn ?? 0);
            $stock_in_val = floatval($row->StockInVal ?? 0);
            $voucherNumber = $row->stock_type . '_' . floatval($row->purchased_id ?? 0);
            $stock_out = floatval($row->StockOut ?? 0);
            $stock_out_val = floatval($row->StockOutVal ?? 0);
            $cost_price_per_unit = floatval($row->opening_avg_cost ?? 0);
            $opening_qty = floatval($row->opening_qty ?? 0);
            $opening_avg_cost = floatval($row->opening_avg_cost ?? 0);

            // Check if the department has changed and add a department header
            // Detect change in product to add product header and include opening_qty only in first row
            if ($current_product !== $row->product_name || (int) trim($current_department) !== (int) trim($row->department_category_id)) {
                // If switching products, include opening_qty for first row of new product
                $opening_qty = floatval($row->opening_qty ?? 0);
                $opening_value = $opening_qty * $cost_price_per_unit;
                $include_opening_qty = true; // Opening_qty is included in the first row
                // $grand_total_opening += $opening_qty;
                // $grand_total_opening_value = $opening_avg_cost;
            } else {
                // Exclude opening_qty from subsequent rows
                $opening_qty = 0;
                $opening_value = 0;
                $include_opening_qty = false;

            }

            // Calculate Balance Inventory and Balance Inventory Value
            $balance_inventory = $running_balance_inventory + $stock_in - $stock_out;
            $balance_inventory_value = $running_balance_inventory_value + $stock_in_val - $stock_out_val;



            // Detect change in product to add product header and include opening_qty only in first row

            if ($transactionsCount == 0 || $current_department === null || (int) trim($current_department) !== (int) trim($row->department_category_id))
            // if ($current_product !== $row->product_name)
            {


                // Add a subtotal row for the previous product if not the first product


                if ($current_product !== $row->product_name || (int) trim($current_department) !== (int) trim($row->department_category_id)) {

                    $current_department = $row->department_category_id;
                    // Add a department header


                    $sales_details[] = [
                        'v_no' => '',
                        'v_type' => '',
                        'date' => '',
                        'product_name' => 'Subtotal',
                        'opening_qty' => number_format($product_total_opening, 2),
                        'opening_value' => number_format($product_total_opening_value, 2),
                        'stock_in' => number_format($product_total_stock_in, 2),
                        'stock_in_val' => number_format($product_total_stock_in_val, 2),
                        'stock_out' => number_format($product_total_stock_out, 2),
                        'stock_out_val' => number_format($product_total_stock_out_val, 2),
                        'balance_inventory' => number_format($product_total_balance, 2),
                        'balance_inventory_value' => number_format($product_total_balance_value, 2),
                        'unit' => '',
                        'opening_avg_cost' => '',
                        'total_value' => number_format($product_total_balance_value, 2),
                    ];


                    $grand_total_opening += $product_total_opening;
                    $grand_total_stock_in += $product_total_stock_in;
                    $grand_total_stock_in_val += $product_total_stock_in_val;
                    $grand_total_stock_out += $product_total_stock_out;
                    $grand_total_stock_out_val += $product_total_stock_out_val;
                    $grand_total_opening_value += $product_total_opening_value;
                    $grand_total_balance += ($product_total_stock_in - $product_total_stock_out);
                    $grand_total_balance_value += ($product_total_opening_value + $product_total_stock_in_val - $product_total_stock_out_val);

                    $product_total_opening = 0;
                    $product_total_opening_value = 0;
                    $product_total_stock_in = 0;
                    $product_total_stock_in_val = 0;
                    $product_total_stock_out = 0;
                    $product_total_stock_out_val = 0;
                    $product_total_balance = 0;
                    $product_total_balance_value = 0;
                    $product_total_value = 0;
                    // }

                    $sales_details[] = [
                        'v_no' => '',
                        'v_type' => 'Department:' . $row->department_name, // Department header
                        'date' => '',
                        'product_name' => '',
                        'opening_qty' => '',
                        'opening_value' => '',
                        'stock_in' => '',
                        'stock_in_val' => '',
                        'stock_out' => '',
                        'stock_out_val' => '',
                        'balance_inventory' => '',
                        'balance_inventory_value' => '',
                        'unit' => '',
                        'opening_avg_cost' => '',
                        'total_value' => '',
                    ];

                }

                // Reset totals for the new product
                $product_total_opening = $opening_qty;
                $product_total_opening_value = $opening_qty * $cost_price_per_unit;
                $product_total_stock_in = $stock_in;
                $product_total_stock_in_val = $stock_in_val;
                $product_total_stock_out = $stock_out;
                $product_total_stock_out_val = $stock_out_val;
                $product_total_balance = $opening_qty + $stock_in - $stock_out;
                $product_total_balance_value = ($opening_qty * $cost_price_per_unit) + $stock_in_val - $stock_out_val;
                $product_total_value = $product_total_balance_value;

                // Store the first row of the new product
                $sales_details[] = [
                    'v_no' => $voucherNumber,
                    'v_type' => '',
                    'date' => Carbon::parse($row->date)->format('d-m-Y '),
                    'product_name' => $row->product_name,
                    'opening_qty' => number_format($product_total_opening, 2),
                    'opening_value' => number_format($product_total_opening_value, 2),
                    'stock_in' => number_format($stock_in, 2),
                    'stock_in_val' => number_format($stock_in_val, 2),
                    'stock_out' => number_format($stock_out, 2),
                    'stock_out_val' => number_format($stock_out_val, 2),
                    'balance_inventory' => number_format($product_total_balance, 2),
                    'balance_inventory_value' => number_format($product_total_balance_value, 2),
                    'unit' => $row->unit,
                    'opening_avg_cost' => number_format($opening_avg_cost, 2),
                    'total_value' => number_format($product_total_balance_value, 2),
                ];



            } else {


                if ($current_product !== $row->product_name) {



                    if ($current_product !== null) {
                        $sales_details[] = [
                            'v_no' => '',
                            'v_type' => '',
                            'date' => '',
                            'product_name' => 'Subtotal',
                            'opening_qty' => number_format($product_total_opening, 2),
                            'opening_value' => number_format($product_total_opening_value, 2),
                            'stock_in' => number_format($product_total_stock_in, 2),
                            'stock_in_val' => number_format($product_total_stock_in_val, 2),
                            'stock_out' => number_format($product_total_stock_out, 2),
                            'stock_out_val' => number_format($product_total_stock_out_val, 2),
                            'balance_inventory' => number_format($product_total_balance, 2),
                            'balance_inventory_value' => number_format($product_total_balance_value, 2),
                            'unit' => '',
                            'opening_avg_cost' => '',
                            'total_value' => number_format($product_total_balance_value, 2),
                        ];

                        $grand_total_opening += $product_total_opening;
                        $grand_total_opening_value += $product_total_opening_value;
                        $grand_total_stock_in += $product_total_stock_in;
                        $grand_total_stock_in_val += $product_total_stock_in_val;
                        $grand_total_stock_out += $product_total_stock_out;
                        $grand_total_stock_out_val += $product_total_stock_out_val;
                        $grand_total_balance += ($product_total_opening + $product_total_stock_in - $product_total_stock_out);
                        $grand_total_balance_value += ($product_total_opening_value + $product_total_stock_in_val - $product_total_stock_out_val);


                        $current_department = $row->department_category_id;
                        // Reset product totals when department changes
                        $product_total_opening = 0;
                        $product_total_opening_value = 0;
                        $product_total_stock_in = 0;
                        $product_total_stock_in_val = 0;
                        $product_total_stock_out = 0;
                        $product_total_stock_out_val = 0;
                        $product_total_balance = 0;
                        $product_total_balance_value = 0;
                        $product_total_value = 0;
                    }




                }
                // Update running totals for the current product
                $product_total_stock_in += $stock_in;
                $product_total_stock_in_val += $stock_in_val;
                $product_total_stock_out += $stock_out;
                $product_total_stock_out_val += $stock_out_val;
                $product_total_balance = $product_total_opening + $product_total_stock_in - $product_total_stock_out;
                $product_total_balance_value = ($product_total_opening * $cost_price_per_unit) + $product_total_stock_in_val - $product_total_stock_out_val;
                $product_total_value = $product_total_balance_value;


                // Store the row for the current product
                $sales_details[] = [
                    'v_no' => $voucherNumber,
                    'v_type' => '',
                    'date' => Carbon::parse($row->date)->format('d-m-Y '),
                    'product_name' => $row->product_name,
                    'opening_qty' => '',
                    'opening_value' => '',
                    'stock_in' => number_format($stock_in, 2),
                    'stock_in_val' => number_format($stock_in_val, 2),
                    'stock_out' => number_format($stock_out, 2),
                    'stock_out_val' => number_format($stock_out_val, 2),
                    'balance_inventory' => number_format($product_total_balance, 2),
                    'balance_inventory_value' => number_format($product_total_balance_value, 2),
                    'unit' => $row->unit,
                    'opening_avg_cost' => number_format($opening_avg_cost, 2),
                    'total_value' => number_format($product_total_balance_value, 2),
                ];



            }

            // Update current product tracker
            $current_product = $row->product_name;


            // Update running balances for next row
            $running_balance_inventory = $product_total_balance;
            $running_balance_inventory_value = $product_total_balance_value;
        }

        // Add Subtotal for the last product
        if ($current_product !== null) {
            $sales_details[] = [
                'v_no' => '',
                'v_type' => '',
                'date' => '',
                'product_name' => 'Subtotal',
                'opening_qty' => number_format($product_total_opening, 2),
                'opening_value' => number_format($product_total_opening_value, 2),
                'stock_in' => number_format($product_total_stock_in, 2),
                'stock_in_val' => number_format($product_total_stock_in_val, 2),
                'stock_out' => number_format($product_total_stock_out, 2),
                'stock_out_val' => number_format($product_total_stock_out_val, 2),
                'balance_inventory' => number_format($product_total_balance, 2),
                'balance_inventory_value' => number_format($product_total_balance_value, 2),
                'unit' => '',
                'opening_avg_cost' => '',
                'total_value' => number_format($product_total_balance_value, 2),
            ];

            $grand_total_opening += $product_total_opening;
            $grand_total_stock_in += $product_total_stock_in;
            $grand_total_stock_in_val += $product_total_stock_in_val;
            $grand_total_stock_out += $product_total_stock_out;
            $grand_total_stock_out_val += $product_total_stock_out_val;
            $grand_total_opening_value += $product_total_opening_value;
            $grand_total_balance += ($product_total_opening + $product_total_stock_in - $product_total_stock_out);
            $grand_total_balance_value += ($product_total_opening_value + $product_total_stock_in_val - $product_total_stock_out_val);
        }


        $grand_total_balance = $grand_total_opening + ($grand_total_stock_in - $grand_total_stock_out);
        $grand_total_balance_value = $grand_total_opening_value + ($grand_total_stock_in_val - $grand_total_stock_out_val);

        $sales_details[] = [
            'v_no' => '',
            'v_type' => 'Grand Total',
            'date' => '',
            'product_name' => '',
            'opening_qty' => number_format($grand_total_opening, 2),
            'opening_value' => number_format($grand_total_opening_value, 2),
            'stock_in' => number_format($grand_total_stock_in, 2),
            'stock_in_val' => number_format($grand_total_stock_in_val, 2),
            'stock_out' => number_format($grand_total_stock_out, 2),
            'stock_out_val' => number_format($grand_total_stock_out_val, 2),
            'balance_inventory' => number_format($grand_total_balance, 2),
            'balance_inventory_value' => number_format($grand_total_balance_value, 2),
            'unit' => '',
            'opening_avg_cost' => '',
            'total_value' => number_format($grand_total_balance_value, 2),
        ];

        // Return the final result
        return response()->json($sales_details);

    }

    // public function getProfitLossDetailReport(Request $request)
    // {
    //     $validated = $request->validate([
    //         'from_date' => 'required|date',
    //         'to_date' => 'required|date|after_or_equal:from_date',
    //     ]);

    //     $from_date = $validated['from_date'];
    //     $to_date = $validated['to_date'];
    //     $OrderType = $request->input('OrderType');

    //     $sales = DB::table('sales')
    //     ->leftJoinSub(
    //         DB::table('stock_maintenance')
    //             ->select('purchased_id', DB::raw('SUM(unit_price * StockOut) as NetCost'))
    //             ->where('stock_type', 'SL')
    //             ->whereNull('stock_maintenance.deleted_at')

    //             ->groupBy('purchased_id'),
    //         'stock_maintenance_total',
    //         'stock_maintenance_total.purchased_id',
    //         '=',
    //         'sales.id'
    //     )
    //     ->leftJoin('sale_details', 'sale_details.sale_id', '=', 'sales.id')
    //     ->join('clients', 'sales.client_id', '=', 'clients.id')
    //     ->select(
    //         'sales.date',
    //         'sales.Ref',
    //         'clients.name as client_name',
    //         'sales.GrandTotal',
    //         'sales.orderType',
    //         'sales.shipping',
    //         DB::raw('ROUND(COALESCE(SUM(((sale_details.discount * sale_details.price) / 100 + sales.discount)), 0),2) as totalDiscount'),
    //         DB::raw('ROUND(COALESCE(stock_maintenance_total.NetCost, 0),2) as NetCost'),
    //         DB::raw('ROUND((sales.GrandTotal - COALESCE(stock_maintenance_total.NetCost, 0)),2) as profit')
    //     )
    //     ->whereBetween('sales.date', [$from_date, $to_date])
    //     ->whereNull('sales.deleted_at')

    //     // Apply OrderType filter if it's not "All"
    //     ->when($OrderType !== 'All', function ($query) use ($OrderType) {
    //         return $query->where('sales.orderType', '=', $OrderType);
    //     })

    //     ->groupBy('sales.id')
    //     ->orderBy('sales.date', 'asc')
    //     ->get();




    //         return response()->json($sales);
    //     }


    //------------- download_report_client_pdf -----------\\

    public function download_report_client_pdf(Request $request, $id)
    {

        $this->authorizeForUser($request->user('api'), 'Reports_customers', Sale::class);

        $helpers = new helpers();
        // Client model removed - using client_id directly

        $Sales = Sale::where('deleted_at', '=', null)
            ->where([
                ['payment_statut', '!=', 'paid'],
                ['client_id', $id]
            ])->get();

        $sales_details = [];

        foreach ($Sales as $Sale) {

            $item_sale['date'] = $Sale['date'];
            $item_sale['Ref'] = $Sale['Ref'];
            $item_sale['GrandTotal'] = number_format($Sale['GrandTotal'], 2, '.', '');
            $item_sale['paid_amount'] = number_format($Sale['paid_amount'], 2, '.', '');
            $item_sale['due'] = number_format($item_sale['GrandTotal'] - $item_sale['paid_amount'], 2, '.', '');
            $item_sale['payment_status'] = $Sale['payment_statut'];

            $sales_details[] = $item_sale;
        }

        $data['client_name'] = '';
        $data['phone'] = '';

        $data['total_sales'] = DB::table('sales')->where('deleted_at', '=', null)->where('client_id', $id)->count();

        $data['total_amount'] = DB::table('sales')
            ->where('deleted_at', '=', null)
            ->where('client_id', $client->id)
            ->sum('GrandTotal');

        $data['total_paid'] = DB::table('sales')
            ->where('deleted_at', '=', null)
            ->where('client_id', $client->id)
            ->sum('paid_amount');

        $data['due'] = $data['total_amount'] - $data['total_paid'];

        $data['total_amount_return'] = DB::table('sale_returns')
            ->where('deleted_at', '=', null)
            ->where('client_id', $client->id)
            ->sum('GrandTotal');

        $data['total_paid_return'] = DB::table('sale_returns')
            ->where('deleted_at', '=', null)
            ->where('client_id', $client->id)
            ->sum('paid_amount');

        $data['return_Due'] = $data['total_amount_return'] - $data['total_paid_return'];

        $symbol = $helpers->Get_Currency();
        $settings = Setting::where('deleted_at', '=', null)->first();

        $pdf = \PDF::loadView('pdf.report_client_pdf', [
            'symbol' => $symbol,
            'client' => $data,
            'sales' => $sales_details,
            'setting' => $settings,
        ]);

        return $pdf->download('report_client.pdf');

    }

    //------------- download_report_provider_pdf -----------\\

    public function download_report_provider_pdf(Request $request, $id)
    {

        $this->authorizeForUser($request->user('api'), 'Reports_suppliers', Provider::class);

        $helpers = new helpers();
        $provider = Provider::where('deleted_at', '=', null)->findOrFail($id);

        $purchases = Purchase::where('deleted_at', '=', null)
            ->where('payment_statut', '!=', 'paid')
            ->where('provider_id', $id)
            ->get();

        $purchases_details = [];

        foreach ($purchases as $purchase) {

            $item_purchase['date'] = $purchase['date'];
            $item_purchase['Ref'] = $purchase['Ref'];
            $item_purchase['GrandTotal'] = number_format($purchase['GrandTotal'], 2, '.', '');
            $item_purchase['paid_amount'] = number_format($purchase['paid_amount'], 2, '.', '');
            $item_purchase['due'] = number_format($item_purchase['GrandTotal'] - $item_purchase['paid_amount'], 2, '.', '');
            $item_purchase['payment_status'] = $purchase['payment_statut'];

            $purchases_details[] = $item_purchase;
        }

        $data['provider_name'] = $provider->name;
        $data['phone'] = $provider->phone;

        $data['total_purchase'] = DB::table('purchases')->where('deleted_at', '=', null)->where('provider_id', $id)->count();

        $data['total_amount'] = DB::table('purchases')->where('deleted_at', '=', null)->where('provider_id', $id)
            ->sum('GrandTotal');

        $data['total_paid'] = DB::table('purchases')
            ->where('deleted_at', '=', null)
            ->where('provider_id', $id)
            ->sum('paid_amount');

        $data['due'] = $data['total_amount'] - $data['total_paid'];

        $data['total_amount_return'] = DB::table('purchase_returns')
            ->where('deleted_at', '=', null)
            ->where('provider_id', $id)
            ->sum('GrandTotal');

        $data['total_paid_return'] = DB::table('purchase_returns')
            ->where('deleted_at', '=', null)
            ->where('provider_id', $id)
            ->sum('paid_amount');

        $data['return_Due'] = $data['total_amount_return'] - $data['total_paid_return'];

        $symbol = $helpers->Get_Currency();
        $settings = Setting::where('deleted_at', '=', null)->first();

        $pdf = \PDF::loadView('pdf.report_provider_pdf', [
            'symbol' => $symbol,
            'provider' => $data,
            'purchases' => $purchases_details,
            'setting' => $settings,
        ]);

        return $pdf->download('report_provider.pdf');

    }


    //-------------------- product_report -------------\\

    public function product_report(request $request)
    {
        $this->authorizeForUser($request->user('api'), 'product_report', Product::class);

        $Role = Auth::user()->roles()->first();
        $view_records = Role::findOrFail($Role->id)->inRole('record_view');
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;

        //get warehouses assigned to user
        $user_auth = auth()->user();
        if ($user_auth->is_all_warehouses) {
            $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
            $array_warehouses_id = Warehouse::where('deleted_at', '=', null)->pluck('id')->toArray();
        } else {
            $array_warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
            $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $array_warehouses_id)->get(['id', 'name']);
        }


        $products_data = Product::where('deleted_at', '=', null)->select('id', 'name', 'code', 'is_variant', 'unit_id', 'type')

            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('name', 'LIKE', "%{$request->search}%")
                        ->orWhere('code', 'LIKE', "%{$request->search}%");
                });
            });

        $totalRows = $products_data->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }


        $products = $products_data->offset($offSet)
            ->limit($perPage)
            ->get();


        $product_details = [];
        $total_sales = 0;
        foreach ($products as $product) {

            if ($product->type != 'is_service') {
                $nestedData['id'] = $product->id;
                $nestedData['name'] = $product->name;
                $nestedData['code'] = $product->code;

                $nestedData['sold_amount'] = SaleDetail::with('sale')->where('product_id', $product->id)
                    ->where(function ($query) use ($view_records) {
                        if (!$view_records) {
                            return $query->whereHas('sale', function ($q) use ($request) {
                                $q->where('user_id', '=', Auth::user()->id);
                            });

                        }
                    })
                    ->where(function ($query) use ($request, $array_warehouses_id) {
                        if ($request->warehouse_id) {
                            return $query->whereHas('sale', function ($q) use ($request, $array_warehouses_id) {
                                $q->where('warehouse_id', $request->warehouse_id);
                            });
                        } else {
                            return $query->whereHas('sale', function ($q) use ($request, $array_warehouses_id) {
                                $q->whereIn('warehouse_id', $array_warehouses_id);
                            });

                        }
                    })
                    ->whereBetween('date', array($request->from, $request->to))
                    ->sum('total');

                $lims_product_sale_data = SaleDetail::select('sale_unit_id', 'quantity')->with('sale')->where('product_id', $product->id)
                    ->where(function ($query) use ($view_records) {
                        if (!$view_records) {
                            return $query->whereHas('sale', function ($q) use ($request) {
                                $q->where('user_id', '=', Auth::user()->id);
                            });

                        }
                    })
                    ->where(function ($query) use ($request, $array_warehouses_id) {
                        if ($request->warehouse_id) {
                            return $query->whereHas('sale', function ($q) use ($request, $array_warehouses_id) {
                                $q->where('warehouse_id', $request->warehouse_id);
                            });
                        } else {
                            return $query->whereHas('sale', function ($q) use ($request, $array_warehouses_id) {
                                $q->whereIn('warehouse_id', $array_warehouses_id);
                            });

                        }
                    })
                    ->whereBetween('date', array($request->from, $request->to))
                    ->get();

                $sold_qty = 0;
                if (count($lims_product_sale_data)) {
                    foreach ($lims_product_sale_data as $product_sale) {
                        $unit = Unit::find($product_sale->sale_unit_id);

                        if ($unit->operator == '*') {
                            $sold_qty += $product_sale->quantity * $unit->operator_value;
                        } elseif ($unit->operator == '/') {
                            $sold_qty += $product_sale->quantity / $unit->operator_value;
                        }

                    }
                }

                $unit_shortname = Unit::where('id', $product->unit_id)->first();

                $nestedData['sold_qty'] = $sold_qty . ' ' . $unit_shortname->ShortName;

                $product_details[] = $nestedData;

            } else {

                $nestedData['id'] = $product->id;
                $nestedData['name'] = $product->name;
                $nestedData['code'] = $product->code;

                $nestedData['sold_amount'] = SaleDetail::with('sale')->where('product_id', $product->id)
                    ->where(function ($query) use ($view_records) {
                        if (!$view_records) {
                            return $query->whereHas('sale', function ($q) use ($request) {
                                $q->where('user_id', '=', Auth::user()->id);
                            });

                        }
                    })
                    ->where(function ($query) use ($request, $array_warehouses_id) {
                        if ($request->warehouse_id) {
                            return $query->whereHas('sale', function ($q) use ($request, $array_warehouses_id) {
                                $q->where('warehouse_id', $request->warehouse_id);
                            });
                        } else {
                            return $query->whereHas('sale', function ($q) use ($request, $array_warehouses_id) {
                                $q->whereIn('warehouse_id', $array_warehouses_id);
                            });

                        }
                    })
                    ->whereBetween('date', array($request->from, $request->to))
                    ->sum('total');

                $sold_qty = SaleDetail::select('sale_unit_id', 'quantity')->with('sale')->where('product_id', $product->id)
                    ->where(function ($query) use ($view_records) {
                        if (!$view_records) {
                            return $query->whereHas('sale', function ($q) use ($request) {
                                $q->where('user_id', '=', Auth::user()->id);
                            });

                        }
                    })
                    ->where(function ($query) use ($request, $array_warehouses_id) {
                        if ($request->warehouse_id) {
                            return $query->whereHas('sale', function ($q) use ($request, $array_warehouses_id) {
                                $q->where('warehouse_id', $request->warehouse_id);
                            });
                        } else {
                            return $query->whereHas('sale', function ($q) use ($request, $array_warehouses_id) {
                                $q->whereIn('warehouse_id', $array_warehouses_id);
                            });

                        }
                    })
                    ->whereBetween('date', array($request->from, $request->to))
                    ->sum('quantity');

                $nestedData['sold_qty'] = $sold_qty;

                $product_details[] = $nestedData;
            }
        }





        return response()->json([
            'products' => $product_details,
            'totalRows' => $totalRows,
            'warehouses' => $warehouses,
        ]);

    }

    public function getComboProducts()
    {
        $products = Product::where('type', 'is_combo')
            ->whereNull('deleted_at')
            ->select('id', 'name')
            ->get();

        return response()->json($products);
    }


    public function getCategoryItemDetails($productId, request $request)
    {

        $products = DB::table('products')
            ->where('category_id', $productId)
            ->where('deleted_at', '=', null)
            ->select('products.*')
            ->get();

        foreach ($products as $product) {
            // Add additional data or modify existing fields
            // $product->additional_data =  2; // Example computation


            $date = $request->date;
            '2024-12-31';
            $stock = DB::table('stock_maintenance')
                ->selectRaw('SUM(stockIn - StockOut) as remainingStock')
                ->where('product_id', $product->id)
                ->where('date', '<=', $date)
                ->whereNull('deleted_at')
                ->value('remainingStock'); // Fetch only the calculated value

            $product->stock = $stock ?? 0;

            // $averageCost = $this->getAverageCostForRemainingStock($product->id, $date,$product->stock);

            // $product->cost =  $averageCost ?? 0;

        }





        return response()->json($products);
    }



    public function getSaleDateItemDetails(request $request)
    {

        // $startdate = $request->startdate;
        // $enddate = $request->enddate;

        // $products = DB::table('products')
        //     ->join('stock_maintenance', 'products.id', '=', 'stock_maintenance.product_id')
        //     ->whereBetween('stock_maintenance.date', [$startdate, $enddate])
        //     ->whereNull('products.deleted_at')
        //     ->whereNull('stock_maintenance.deleted_at')
        //     ->select(
        //         'products.id',
        //         'products.name',
        //         'products.code',
        //         DB::raw('COALESCE(SUM(stock_maintenance.StockOut), 0) as total_sale_qty') // Sum StockOut per product
        //     )
        //     ->groupBy('products.id', 'products.name', 'products.code') // Grouping by product
        //     ->get();


        //new
        $validated = $request->validate([
            'startdate' => 'required|date',
            'enddate' => 'required|date',
        ]);

        $start_date = $validated['startdate'];
        $end_date = $validated['enddate'];
        // $product = $request->input('product');
        // $sellable_item = $request->input('sellable_item');

        // $categories = $request->input('categories');


        $products = DB::table('stock_maintenance')
            ->select(
                'products.name as name',
                'products.code as code',
                'stock_maintenance.date',
                'stock_maintenance.product_id as id',
                // 'units.ShortName as unit',
                // 'sale_details.sale_id',
                DB::raw('ROUND(stock_maintenance.unit_price, 2) as cost_price_per_unit'),
                'stock_maintenance.StockOut as total_sale_qty',
                DB::raw('ROUND(SUM(stock_maintenance.StockOut), 2) as total_sale_qty'),
                DB::raw('ROUND(SUM(stock_maintenance.StockOut * stock_maintenance.unit_price), 2) as total_cost'),
                // DB::raw('ROUND(sale_details.price, 2) as sale_price_per_unit'),
                // DB::raw('ROUND(SUM(sale_details.total), 2) as total_sale_amount'),
                // DB::raw('ROUND(SUM((sale_details.discount * sale_details.price) / 100), 2) as total_discount'),
                // DB::raw('ROUND(SUM(sale_details.total - (stock_maintenance.StockOut * stock_maintenance.unit_price) ), 2) as profit_loss')
            )


            ->leftJoin('products', 'products.id', '=', 'stock_maintenance.product_id')
            // ->leftJoin('units', 'units.id', '=', 'products.unit_sale_id')
            ->where('stock_maintenance.stock_type', 'SL')
            ->whereNull('stock_maintenance.deleted_at')
            ->whereBetween('stock_maintenance.date', [$start_date, $end_date])

            ->groupby('stock_maintenance.product_id')
            ->get();



        foreach ($products as $product) {
            // Add additional data or modify existing fields
            // $product->additional_data =  2; // Example computation


            $date = $end_date;
            '2024-12-31';
            $stock = DB::table('stock_maintenance')
                ->selectRaw('SUM(stockIn - StockOut) as remainingStock')
                ->where('product_id', $product->id)
                ->where('date', '<=', $date)
                ->whereNull('deleted_at')
                ->value('remainingStock'); // Fetch only the calculated value

            $product->stock = $stock ?? 0;

            // $averageCost = $this->getAverageCostForRemainingStock($product->id, $date,$product->stock);

            // $product->cost =  $averageCost ?? 0;

        }


        return response()->json($products);
    }

    //-------------------- sale product details -------------\\

    public function sale_products_details(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'product_report', Product::class);
        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;

        // Role table dropped - set ShowRecord to true (allow all records)
        // $Role = Auth::user()->roles()->first();
        // $ShowRecord = Role::findOrFail($Role->id)->inRole('record_view');
        $ShowRecord = true;

        $sale_details_data = SaleDetail::with('product', 'sale', 'sale.client', 'sale.warehouse', 'sale.user')
            ->where(function ($query) use ($ShowRecord) {
                if (!$ShowRecord) {
                    return $query->whereHas('sale', function ($q) use ($request) {
                        $q->where('user_id', '=', Auth::user()->id);
                    });
                }
            })
            ->whereBetween('date', array($request->from, $request->to))
            ->where('product_id', $request->id)

            //Filters
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('Ref'), function ($query) use ($request) {
                    return $query->where(function ($query) use ($request) {
                        return $query->whereHas('sale', function ($q) use ($request) {
                            $q->where('Ref', 'LIKE', "{$request->Ref}");
                        });
                    });
                });
            })

            ->where(function ($query) use ($request) {
                return $query->when($request->filled('client_id'), function ($query) use ($request) {
                    return $query->where(function ($query) use ($request) {
                        return $query->whereHas('sale.client', function ($q) use ($request) {
                            $q->where('client_id', $request->client_id);
                        });
                    });
                });
            })

            ->where(function ($query) use ($request) {
                return $query->when($request->filled('warehouse_id'), function ($query) use ($request) {
                    return $query->where(function ($query) use ($request) {
                        return $query->whereHas('sale.warehouse', function ($q) use ($request) {
                            $q->where('warehouse_id', $request->warehouse_id);
                        });
                    });
                });
            })

            ->where(function ($query) use ($request) {
                return $query->when($request->filled('user_id'), function ($query) use ($request) {
                    return $query->where(function ($query) use ($request) {
                        return $query->whereHas('sale.user', function ($q) use ($request) {
                            $q->where('user_id', $request->user_id);
                        });
                    });
                });
            })

            //search
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where(function ($query) use ($request) {
                        return $query->whereHas('sale.client', function ($q) use ($request) {
                            $q->where('name', 'LIKE', "%{$request->search}%");
                        });
                    })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('sale.warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('sale', function ($q) use ($request) {
                                $q->where('Ref', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('product', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });

        $totalRows = $sale_details_data->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $sale_details = $sale_details_data->offset($offSet)
            ->limit($perPage)
            ->orderBy('id', 'desc')
            ->get();

        $data = [];
        foreach ($sale_details as $detail) {

            //check if detail has sale_unit_id Or Null
            if ($detail->sale_unit_id !== null) {
                $unit = Unit::where('id', $detail->sale_unit_id)->first();
            } else {
                $product_unit_sale_id = Product::with('unitSale')
                    ->where('id', $detail->product_id)
                    ->first();

                if ($product_unit_sale_id['unitSale']) {
                    $unit = Unit::where('id', $product_unit_sale_id['unitSale']->id)->first();
                } {
                    $unit = NULL;
                }
            }


            if ($detail->product_variant_id) {
                $productsVariants = ProductVariant::where('product_id', $detail->product_id)
                    ->where('id', $detail->product_variant_id)->first();

                $product_name = '[' . $productsVariants->name . ']' . $detail['product']['name'];

            } else {
                $product_name = $detail['product']['name'];
            }

            $item['date'] = $detail->date;
            $item['Ref'] = $detail['sale']->Ref;
            $item['created_by'] = $detail['sale']['user']->username;
            $item['sale_id'] = $detail['sale']->id;
            $item['client_name'] = $detail['sale']['client']->name;
            $item['warehouse_name'] = $detail['sale']['warehouse']->name;
            $item['unit_sale'] = $unit ? $unit->ShortName : '';
            $item['quantity'] = $detail->quantity . ' ' . $item['unit_sale'];
            $item['total'] = $detail->total;
            $item['product_name'] = $product_name;

            $data[] = $item;
        }

        $customers = client::where('deleted_at', '=', null)->get(['id', 'name']);
        $users = User::get(['id', 'username']);

        //get warehouses assigned to user
        $user_auth = auth()->user();
        if ($user_auth->is_all_warehouses) {
            $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
        } else {
            $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
            $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
        }

        return response()->json([
            'totalRows' => $totalRows,
            'sales' => $data,
            'customers' => $customers,
            'warehouses' => $warehouses,
            'users' => $users,
        ]);

    }


    //-------------------- product_sales_report  -------------\\

    public function product_sales_report(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'product_sales_report', Sale::class);
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
            0 => '=',
            1 => '=',
        );
        $columns = array(
            0 => 'client_id',
            1 => 'warehouse_id',
        );
        $data = array();

        $sale_details_data = SaleDetail::with('product', 'sale', 'sale.client', 'sale.warehouse')
            ->where(function ($query) use ($view_records) {
                if (!$view_records) {
                    return $query->whereHas('sale', function ($q) {
                        $q->where('user_id', '=', Auth::user()->id);
                    });
                }
            })
            ->whereBetween('date', array($request->from, $request->to));

        // Filter
        $sale_details_Filtred = $sale_details_data->where(function ($query) use ($request) {
            return $query->when($request->filled('client_id'), function ($query) use ($request) {
                return $query->whereHas('sale.client', function ($q) use ($request) {
                    $q->where('client_id', '=', $request->client_id);
                });
            });
        })

            ->where(function ($query) use ($request) {
                return $query->when($request->filled('warehouse_id'), function ($query) use ($request) {
                    return $query->whereHas('sale.warehouse', function ($q) use ($request) {
                        $q->where('warehouse_id', '=', $request->warehouse_id);
                    });
                });
            })

            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where(function ($query) use ($request) {
                        return $query->whereHas('sale.client', function ($q) use ($request) {
                            $q->where('username', 'LIKE', "%{$request->search}%");
                        });
                    })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('sale.warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('sale', function ($q) use ($request) {
                                $q->where('Ref', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('product', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });



        $totalRows = $sale_details_Filtred->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $perPage = $totalRows;

        $sale_details = $sale_details_Filtred
            ->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        $Gtotal_qty = 0;
        $Gtotal_total = 0;
        $Gtotal_price = 0;
        $Gtotal_discount = 0;
        $Gtotal_discamount = 0;
        $Gtotal_tax = 0;


        foreach ($sale_details as $detail) {

            //check if detail has sale_unit_id Or Null
            if ($detail->sale_unit_id !== null) {
                $unit = Unit::where('id', $detail->sale_unit_id)->first();
            } else {
                $product_unit_sale_id = Product::with('unitSale')
                    ->where('id', $detail->product_id)
                    ->first();

                if ($product_unit_sale_id['unitSale']) {
                    $unit = Unit::where('id', $product_unit_sale_id['unitSale']->id)->first();
                } {
                    $unit = NULL;
                }
            }


            if ($detail->product_variant_id) {
                $productsVariants = ProductVariant::where('product_id', $detail->product_id)
                    ->where('id', $detail->product_variant_id)->first();

                $product_name = '[' . $productsVariants->name . ']' . $detail['product']['name'];

            } else {
                $product_name = $detail['product']['name'];
            }

            if ($detail['product']->category_id) {
                $productscategory = Category::where('id', $detail['product']->category_id)
                    ->first();

                $category_name = $productscategory->name;

            } else {
                $category_name = '';
            }


            if ($detail['product']->department_category_id) {
                $productscategory = DepartmentCategory::where('id', $detail['product']->department_category_id)
                    ->first();

                $department_category_name = $productscategory->name;

            } else {
                $department_category_name = '';
            }

            $item['date'] = $detail->date;
            $item['Ref'] = $detail['sale']->Ref;
            $item['client_name'] = $detail['sale']['client']->name;
            $item['warehouse_name'] = $detail['sale']['warehouse']->name;

            $item['product_name'] = $product_name;
            $item['unit_sale'] = $unit ? $unit->ShortName : '';


            $item['orderType'] = $detail['sale']->orderType;
            $item['time'] = Carbon::parse($detail['sale']->created_at)->format('H:i:s');
            $item['category_name'] = $category_name;
            $item['department_name'] = $department_category_name;


            $Gtotal_qty += $item['quantity'] = $detail->quantity;
            $Gtotal_total += $item['total'] = $detail->total;
            $Gtotal_price += $item['price'] = $detail->price;
            $Gtotal_discount += $item['discount'] = $detail->discount;
            $Gtotal_discamount += $item['discamount'] = ($detail->quantity > 0)
                ? round($detail->price - ($detail->total / $detail->quantity), 3)
                : 0;

            $Gtotal_tax += $item['tax'] = $detail->TaxNet;



            $data[] = $item;
        }




        $item2 = [];

        $item2['date'] = "Grand Total";
        $item2['Ref'] = "";
        $item2['client_name'] = "";
        $item2['warehouse_name'] = "";
        $item2['product_name'] = "";
        $item2['unit_sale'] = "";
        $item2['orderType'] = "";
        $item2['time'] = "";
        $item2['category_name'] = "";
        $item2['department_name'] = "";
        $item2['quantity'] = $Gtotal_qty;
        $item2['total'] = $Gtotal_total;
        $item2['price'] = $Gtotal_price;
        $item2['discount'] = $Gtotal_discount;
        $item2['discamount'] = $Gtotal_discamount;
        $item2['tax'] = $Gtotal_tax;

        $data[] = $item2;

        //get warehouses assigned to user
        $user_auth = auth()->user();
        if ($user_auth->is_all_warehouses) {
            $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
        } else {
            $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
            $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
        }

        $customers = client::where('deleted_at', '=', null)->get(['id', 'name']);

        return response()->json([
            'totalRows' => $totalRows,
            'sales' => $data,
            'customers' => $customers,
            'warehouses' => $warehouses,
        ]);

    }

    // { data: "orderType" },
    // { data: "time" },
    // { data: "category_name" },
    // { data: "price" },
    // { data: "discount" },
    // { data: "discamount" },
    // { data: "tax" },
    //-------------------- product_sales_report  -------------\\


    public function ledger_report(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'product_sales_report', Sale::class);

        $fromDate = $request->query('from_date') ?? '';
        $toDate = $request->query('to_date') ?? '';
        $controlAccounts = $request->query('controlAccounts') ?? '';
        // $ChildId = $request->query('ChildId') ?? [];

        $ChildId = $request->query('ChildId', []);

        // Ensure it's an array
        if (!is_array($ChildId)) {
            $ChildId = [$ChildId]; // Convert to an array if it's a single value
        }

        // Remove empty values
        $ChildId = array_filter($ChildId, function ($id) {
            return !empty($id);
        });

        // Fetch opening balances with account name
        $openingBalances = DB::table('accounts_ledger')
            ->select(
                'accounts_ledger.account_id',
                'db_accountdtl.account_name',
                DB::raw('COALESCE(SUM(accounts_ledger.debit_amount), 0)  - COALESCE(sum(accounts_ledger.credit_amount), 0) as opening_balance')
            )
            ->leftJoin('db_accountdtl', 'accounts_ledger.account_id', '=', 'db_accountdtl.account_id') // Ensure correct join
            ->where('accounts_ledger.entry_date', '<', $fromDate) // Entries before from_date
            ->groupBy('accounts_ledger.account_id', 'db_accountdtl.account_name') // Group by account_id and account_name
            ->get()
            ->keyBy('accounts_ledger.account_id'); // Map by account_id for quick access

        // If openingBalances is empty, return a default empty object with no error
        if ($openingBalances->isEmpty()) {
            $openingBalances = collect([
                0 => (object) [
                    'opening_balance' => 0,
                    'account_name' => 'No Account Found',
                ],
            ])->keyBy('account_id');
        }

        // Fetch ledger entries within the date range
        $query = DB::table('accounts_ledger')
            ->select(
                'accounts_ledger.id',
                'accounts_ledger.voucher_number',
                'accounts_ledger.voucher_type',
                'accounts_ledger.entry_date',
                'accounts_ledger.account_id',
                'db_accountdtl.account_name',
                'accounts_ledger.description',
                'accounts_ledger.debit_amount',
                'accounts_ledger.credit_amount',
                DB::raw('COALESCE(accounts_ledger.debit_amount, 0) as debit_amount'),

                DB::raw('COALESCE(accounts_ledger.credit_amount, 0) as credit_amount')
            )
            ->leftJoin('db_accountdtl', 'accounts_ledger.account_id', '=', 'db_accountdtl.account_id')
            ->orderBy('accounts_ledger.entry_date');

        // Apply filters
        if ($fromDate) {
            $query->where('accounts_ledger.entry_date', '>=', $fromDate);
        }
        if ($toDate) {
            $query->where('accounts_ledger.entry_date', '<=', $toDate);
        }
        if ($controlAccounts) {
            $query->where('db_accountdtl.head_id', 'LIKE', "{$controlAccounts}%");
        }
        // if ($ChildId ) {
        //     $query->whereIn('accounts_ledger.account_id', $ChildId);
        // }

        if (!empty($ChildId)) {
            $query->whereIn('accounts_ledger.account_id', $ChildId);
        }


        $ledgers = $query->get();

        // Group by account ID and add opening balance
        $groupedLedgers = $ledgers->groupBy('accounts_ledger.account_id')->map(function ($entries, $accountId) use ($openingBalances) {
            $openingBalanceData = $openingBalances->get($accountId, (object) [
                'opening_balance' => 0,
                'account_name' => 'Unknown Account',
            ]);

            $openingBalance = $openingBalanceData->opening_balance;
            $accountName = $openingBalanceData->account_name;

            // Prepend opening balance as the first entry
            $entries->prepend((object) [
                'id' => null,
                'voucher_number' => null,
                'voucher_type' => 'OB', // Opening Balance
                'entry_date' => null,
                'account_id' => $accountId,
                'account_name' => $accountName,
                'description' => 'Opening Balance',
                'debit_amount' => 0,//null,
                'credit_amount' => 0,//null,
                'balance' => $openingBalance,
            ]);

            // Calculate balance for each entry
            $balance = $openingBalance;
            foreach ($entries as $entry) {
                if ($entry->voucher_type !== 'OB') {
                    $balance += ($entry->debit_amount ?? 0) - ($entry->credit_amount ?? 0);
                    $entry->balance = $balance;
                }
            }

            return $entries;
        });

        return response()->json($groupedLedgers);
    }


    // return response()->json($groupedLedgers);
    // }


    public function ledger_report1(request $request)
    {



        $this->authorizeForUser($request->user('api'), 'product_sales_report', Sale::class);
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
            0 => '=',
            1 => '=',
        );
        $columns = array(
            0 => 'client_id',
            1 => 'warehouse_id',
        );
        $data = array();

        $sale_details_data = AccountsLedger::where(function ($query) use ($view_records) {
            // Assuming $view_records is used for filtering in this closure.
        })
            ->whereBetween('entry_date', array($request->from, $request->to));
        if ($request->account_id == '0') {
            // Do not filter by account_id when it's '0'
            $sale_details_Filtred = $sale_details_data;
        } else {
            // Apply the account_id filter when it's not '0'
            $sale_details_Filtred = $sale_details_data->where(function ($query) use ($request) {
                return $query->when($request->filled('account_id'), function ($query) use ($request) {
                    return $query->where('account_id', '=', $request->account_id);
                });
            });
        }

        $totalRows = $sale_details_Filtred->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }

        //innovation
        // $perPage = $totalRows;


        $sale_details = $sale_details_Filtred
            ->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        // Initialize an array to hold all the balances
        $data = [];
        $data2 = $sale_details[0]->id;
        // Fetch previous balance for the same account_id before the specified date
        $previousBalanceRecords = AccountsLedger::where('account_id', $request->account_id)
            // ->where('entry_date', '<', $request->from)
            ->where('id', '>', $data2)
            ->get();

        // Initialize variables for the previous balance
        $debitTotal = 0;
        $creditTotal = 0;

        // Calculate previous balance
        foreach ($previousBalanceRecords as $prevDetail) {
            $debitTotal += $prevDetail->debit_amount;
            $creditTotal += $prevDetail->credit_amount;
        }

        // Calculate previous closing balance
        $previousClosingBalance = $debitTotal - $creditTotal;

        // Add previous closing balance as a new entry in the data
        $data[] = [
            'entry_date' => $data2,
            'voucher_number' => '',
            'voucher_type' => '',
            'account_id' => $request->account_id,
            'description' => 'Opening balance as at ' . \Carbon\Carbon::parse($request->from)->format('d-m-Y'),//$request->from,
            'debit_amount' => '0.00',
            'credit_amount' => '0.00',
            'reference_number' => '',
            'balance' => $previousClosingBalance
        ];
        $prev_closing = $previousClosingBalance;
        foreach ($sale_details as $detail) {
            // Build item for current detail
            $item = [];
            $item['entry_date'] = $detail->entry_date;
            $item['voucher_number'] = $detail->voucher_number;
            $item['voucher_type'] = $detail->voucher_type;
            $item['account_id'] = $detail->account_id;
            $item['description'] = $detail->description;
            $item['debit_amount'] = $detail->debit_amount;
            $item['credit_amount'] = $detail->credit_amount;
            $item['reference_number'] = $detail->reference_number;
            $prev_closing += $detail->debit_amount - $detail->credit_amount;
            // Adjusting for the current transaction
            $item['balance'] = $prev_closing;

            $data[] = $item;
        }

        // Now $data contains the detailed results along with the balance calculation and the previous closing balance.



        //get warehouses assigned to user
        $user_auth = auth()->user();
        if ($user_auth->is_all_warehouses) {
            $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
        } else {
            $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
            $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
        }

        $customers = client::where('deleted_at', '=', null)->get(['id', 'name']);


        // $AccountsLedger = Account::get();//->pluck('account_number');

        // $account_ids = [];
        // foreach ($AccountsLedger as $account) {
        //     $item = [];
        //     $item['id'] = $account['account_number'] ; // $account_id is now the direct value
        //     $item['name'] = $account['account_name'] ; // $account_id is now the direct value
        //     $account_ids[] = $item;
        // }

        $AccountsLedger = Account::join('accounts_ledger', 'accounts.account_number', '=', 'accounts_ledger.account_id')
            ->select('accounts.account_number', 'accounts.account_name', \DB::raw('count(accounts_ledger.id) as count'))
            ->groupBy('accounts.account_number', 'accounts.account_name')
            ->orderBy('count')
            ->get();

        $account_ids = [];


        $item = [];
        $item['id'] = '0'; // account_number
        $item['name'] = 'All'; // account_name
        $item['count'] = 0; // count of rows in account_ledgers for each account_number
        $account_ids[] = $item;


        foreach ($AccountsLedger as $account) {
            $item = [];
            $item['id'] = $account->account_number; // account_number
            $item['name'] = $account->account_name . ' (' . $item['id'] . ')'; // account_name
            $item['count'] = $account->count; // count of rows in account_ledgers for each account_number
            $account_ids[] = $item;
        }




        return response()->json([
            'totalRows' => $totalRows,
            'sales' => $data,
            'customers' => $customers,
            'account_ids' => $account_ids,
            'warehouses' => $warehouses,
        ]);

    }

    //-------------------- product_purchases_report  -------------\\

    public function product_purchases_report(request $request)
    {

        $this->authorizeForUser($request->user('api'), 'product_purchases_report', Purchase::class);
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
            0 => '=',
            1 => '=',
        );
        $columns = array(
            0 => 'provider_id',
            1 => 'warehouse_id',
        );
        $data = array();

        $purchase_details_data = PurchaseDetail::with('product', 'purchase', 'purchase.provider', 'purchase.warehouse')
            ->where(function ($query) use ($view_records) {
                if (!$view_records) {
                    return $query->whereHas('purchase', function ($q) use ($request) {
                        $q->where('user_id', '=', Auth::user()->id);
                    });
                }
            })

            ->where(function ($query) use ($request) {
                return $query->whereHas('purchase', function ($q) use ($request) {
                    $q->whereBetween('date', array($request->from, $request->to));
                });
            });

        // Filter
        $purchase_details_Filtred = $purchase_details_data->where(function ($query) use ($request) {
            return $query->when($request->filled('provider_id'), function ($query) use ($request) {
                return $query->whereHas('purchase.provider', function ($q) use ($request) {
                    $q->where('provider_id', '=', $request->provider_id);
                });
            });
        })

            ->where(function ($query) use ($request) {
                return $query->when($request->filled('warehouse_id'), function ($query) use ($request) {
                    return $query->whereHas('purchase.warehouse', function ($q) use ($request) {
                        $q->where('warehouse_id', '=', $request->warehouse_id);
                    });
                });
            })

            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where(function ($query) use ($request) {
                        return $query->whereHas('purchase.provider', function ($q) use ($request) {
                            $q->where('name', 'LIKE', "%{$request->search}%");
                        });
                    })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('purchase', function ($q) use ($request) {
                                $q->where('Ref', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('product', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        })
                        ->orWhere(function ($query) use ($request) {
                            return $query->whereHas('purchase.warehouse', function ($q) use ($request) {
                                $q->where('name', 'LIKE', "%{$request->search}%");
                            });
                        });
                });
            });



        $totalRows = $purchase_details_Filtred->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }

        $purchase_details = $purchase_details_Filtred
            ->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        foreach ($purchase_details as $detail) {

            //-------check if detail has purchase_unit_id Or Null
            if ($detail->purchase_unit_id !== null) {
                $unit = Unit::where('id', $detail->purchase_unit_id)->first();
            } else {
                $product_unit_purchase_id = Product::with('unitPurchase')
                    ->where('id', $detail->product_id)
                    ->first();
                $unit = Unit::where('id', $product_unit_purchase_id['unitPurchase']->id)->first();
            }

            if ($detail->product_variant_id) {
                $productsVariants = ProductVariant::where('product_id', $detail->product_id)
                    ->where('id', $detail->product_variant_id)->first();

                $product_name = '[' . $productsVariants->name . ']' . $detail['product']['name'];

            } else {
                $product_name = $detail['product']['name'];
            }

            $item['date'] = $detail['purchase']->date;
            $item['Ref'] = $detail['purchase']->Ref;
            $item['provider_name'] = $detail['purchase']['provider']->name;
            $item['warehouse_name'] = $detail['purchase']['warehouse']->name;
            $item['quantity'] = $detail->quantity;
            $item['total'] = $detail->total;
            $item['product_name'] = $product_name;
            $item['unit_purchase'] = $unit->ShortName;

            $data[] = $item;
        }

        //get warehouses assigned to user
        $user_auth = auth()->user();
        if ($user_auth->is_all_warehouses) {
            $warehouses = Warehouse::where('deleted_at', '=', null)->get(['id', 'name']);
        } else {
            $warehouses_id = UserWarehouse::where('user_id', $user_auth->id)->pluck('warehouse_id')->toArray();
            $warehouses = Warehouse::where('deleted_at', '=', null)->whereIn('id', $warehouses_id)->get(['id', 'name']);
        }

        $suppliers = Provider::where('deleted_at', '=', null)->get(['id', 'name']);

        return response()->json([
            'totalRows' => $totalRows,
            'purchases' => $data,
            'suppliers' => $suppliers,
            'warehouses' => $warehouses,
        ]);

    }

}
