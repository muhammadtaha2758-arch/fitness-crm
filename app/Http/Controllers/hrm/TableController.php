<?php

namespace App\Http\Controllers\hrm;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Department;
use App\Models\Company;
use App\Models\ResturantTable;
use Carbon\Carbon;
use DB;

class TableController extends Controller
{

    //----------- GET ALL  company --------------\\

    public function index(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', Company::class);

        // How many items do you want to display.
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;

        $companies = ResturantTable::where('deleted_at', '=', null)

        // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('tablename', 'LIKE', "%{$request->search}%")
                        // ->orWhere('phone', 'LIKE', "%{$request->search}%")
                        // ->orWhere('country', 'LIKE', "%{$request->search}%")
                        // ->orWhere('email', 'LIKE', "%{$request->search}%")
                        ;
                });
            });
        $totalRows = $companies->count();
        if($perPage == "-1"){
            $perPage = $totalRows;
        }
        $companies = $companies->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get()
            ->map(function ($company) {
                // Set 'assigned' based on the value in the 'assigned' column from the table
                $company->assigned = $company->assigned == 1;


                // Set 'assignedPerson' to the value of 'client_id' from the table
                $company->assignedPerson = $company['client']->name;

                return $company;
            });


        return response()->json([
            'companies' => $companies,
            'totalRows' => $totalRows,
        ]);
    }


    public function get_tables(Request $request)
    {
        

        // How many items do you want to display.
       
            $tables = ResturantTable::whereNull('deleted_at')
                ->select('id', 'tablename', 'assigned', 'client_id') // only fetch necessary columns
                ->with('client:id,name') // eager load client name only
                ->get()
                ->map(function ($table) {
                    return [
                        'id' => $table->id,
                        'tablename' => $table->tablename,
                        'assigned' => $table->assigned == 1,
                        'assignedPerson' => optional($table->client)->name,
                    ];
                });
            
            return response()->json([
                'tables' => $tables,
            ]);
    
    }

    //----------- Store new Company --------------\\

    public function store(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'create', Company::class);

        request()->validate([
            'tablename'      => 'required|string',
        ]);

        ResturantTable::create([
            'tablename'    => $request['tablename'],
            'space'   => $request['space'],
            'location'   => $request['location'],
            // 'country' => $request['country'],
        ]);

        return response()->json(['success' => true]);
    }

    //------------ function show -----------\\

    public function show($id){
        //
        
        }

    //-----------Update Warehouse --------------\\

    public function update(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'update', Company::class);

        request()->validate([
            'tablename'      => 'required|string',
        ]);

        ResturantTable::whereId($id)->update([
            'tablename'    => $request['tablename'],
            'space'   => $request['space'],
            'location'   => $request['location'],
        ]);

        return response()->json(['success' => true]);
    }

    //----------- Delete  company --------------\\

    public function destroy(Request $request, $id)
    {
        $this->authorizeForUser($request->user('api'), 'delete', Company::class);

        ResturantTable::whereId($id)->update([
            'deleted_at' => Carbon::now(),
        ]);


        return response()->json(['success' => true]);
    }

    //-------------- Delete by selection  ---------------\\

    public function delete_by_selection(Request $request)
    {

        $this->authorizeForUser($request->user('api'), 'delete', Company::class);

        $selectedIds = $request->selectedIds;
        foreach ($selectedIds as $company_id) {
            ResturantTable::whereId($company_id)->update([
                'deleted_at' => Carbon::now(),
            ]);
        }

        return response()->json(['success' => true]);
    }

    //----------- GET ALL  Company --------------\\
    
    public function Get_all_Company()
    {
        $companies = ResturantTable::where('deleted_at', '=', null)
        ->orderBy('id', 'desc')
        ->get(['id','tablename']);

        return response()->json($companies);
    }

}
