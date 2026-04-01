<?php

namespace App\Http\Controllers;

use App\Models\ExcelFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ExcelFileController extends Controller
{
    /**
     * Display a listing of uploaded Excel files
     */
    public function index(Request $request)
    {
        $query = ExcelFile::with('uploader')
            ->active()
            ->orderBy('created_at', 'desc');

        // Filter by user if specified
        if ($request->has('user_id')) {
            $query->byUser($request->user_id);
        }

        // Search by filename
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('original_name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $files = $query->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $files
        ]);
    }

    /**
     * Upload a new Excel file
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|mimes:xlsx,xls,csv|max:10240', // 10MB max
            'description' => 'nullable|string|max:500'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $file = $request->file('file');
            $originalName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $fileSize = $file->getSize();

            // Generate unique filename
            $filename = time() . '_' . Str::random(10) . '.' . $extension;

            // Store file in public disk
            $path = $file->storeAs('excel_files', $filename, 'public');

            // Create database record
            $excelFile = ExcelFile::create([
                'filename' => $filename,
                'original_name' => $originalName,
                'filepath' => $path,
                'file_size' => $fileSize,
                'file_type' => $extension,
                'uploaded_by' => auth()->id(),
                'description' => $request->description ?? '',
                'status' => 'active'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'File uploaded successfully',
                'data' => $excelFile->load('uploader')
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error uploading file: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified Excel file
     */
    public function show($id)
    {
        $file = ExcelFile::with('uploader')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $file
        ]);
    }

    /**
     * Download the specified Excel file
     */
    public function download($id)
    {
        $file = ExcelFile::findOrFail($id);

        if (!Storage::disk('public')->exists($file->filepath)) {
            return response()->json([
                'success' => false,
                'message' => 'File not found'
            ], 404);
        }

        return Storage::disk('public')->download($file->filepath, $file->original_name);
    }

    /**
     * Update the specified Excel file
     */
    public function update(Request $request, $id)
    {
        $file = ExcelFile::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'description' => 'nullable|string|max:500',
            'status' => 'nullable|in:active,archived'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $file->update($request->only(['description', 'status']));

        return response()->json([
            'success' => true,
            'message' => 'File updated successfully',
            'data' => $file->load('uploader')
        ]);
    }

    /**
     * Remove the specified Excel file
     */
    public function destroy($id)
    {
        $file = ExcelFile::findOrFail($id);

        try {
            // Delete physical file
            if (Storage::disk('public')->exists($file->filepath)) {
                Storage::disk('public')->delete($file->filepath);
            }

            // Soft delete database record
            $file->delete();

            return response()->json([
                'success' => true,
                'message' => 'File deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting file: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get file statistics
     */
    public function stats()
    {
        $stats = [
            'total_files' => ExcelFile::count(),
            'active_files' => ExcelFile::active()->count(),
            'total_size' => ExcelFile::sum('file_size'),
            'recent_uploads' => ExcelFile::where('created_at', '>=', now()->subDays(7))->count(),
            'files_by_type' => ExcelFile::selectRaw('file_type, COUNT(*) as count')
                ->groupBy('file_type')
                ->get()
                ->pluck('count', 'file_type')
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    /**
     * Bulk delete files
     */
    public function bulkDelete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file_ids' => 'required|array',
            'file_ids.*' => 'integer|exists:excel_files,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $files = ExcelFile::whereIn('id', $request->file_ids)->get();
        $deletedCount = 0;

        foreach ($files as $file) {
            try {
                // Delete physical file
                if (Storage::disk('public')->exists($file->filepath)) {
                    Storage::disk('public')->delete($file->filepath);
                }

                // Soft delete database record
                $file->delete();
                $deletedCount++;

            } catch (\Exception $e) {
                // Log error but continue with other files
                \Log::error("Error deleting file {$file->id}: " . $e->getMessage());
            }
        }

        return response()->json([
            'success' => true,
            'message' => "Successfully deleted {$deletedCount} files"
        ]);
    }
}
