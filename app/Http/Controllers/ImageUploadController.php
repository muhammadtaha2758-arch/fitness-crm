<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageUploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,png,jpeg,gif|max:2048',
        ]);

        $path = $request->file('image')->store('images/groups', 'public');

        return response()->json(['path' => '/storage/' . $path], 201);
    }
}
