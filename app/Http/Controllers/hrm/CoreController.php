<?php

namespace App\Http\Controllers\hrm;
use App\Http\Controllers\Controller;

use App\Models\OfficeShift;
use App\Models\Award;
use App\Models\Travel;
use App\Models\Complaint;
use App\Models\Project;
use App\Models\Task;
use App\Models\Training;
use App\utils\helpers;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;

class CoreController extends Controller
{

    // Designations and departments removed - tables no longer used

    public function Get_designations_by_department(Request $request)
    {
        return response()->json([]);
    }

    public function Get_departments_by_company(Request $request)
    {
        return response()->json([]);
    }

    public function Get_office_shift_by_company(Request $request)
    {
        // Companies table removed - returning empty result
        return response()->json([]);
    }

    public function Get_employees_by_company(Request $request)
    {
        return response()->json([]);
    }

}
