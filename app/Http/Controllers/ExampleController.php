<?php


// app/Http/Controllers/ExampleController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExampleController extends Controller
{
    public function index()
    {
        // Core PHP logic
        $result = 5 * 4;
        
        // Pass data to a view
        return view('example', compact('result'));
    }
}
