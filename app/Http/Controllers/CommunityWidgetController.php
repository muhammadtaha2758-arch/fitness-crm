<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CommunityWidget;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class CommunityWidgetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Get the current user
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        // Get gym_id from user, default to 1
        $gymId = $user && is_object($user) && isset($user->gym_id) ? (int) $user->gym_id : 1;

        $widgets = CommunityWidget::where('gym_id', $gymId)
            ->where('is_active', true)
            ->orderBy('order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        // Ensure image_url is included in response
        $widgets->each(function ($widget) {
            $widget->image_url = $widget->image_url;
        });

        return response()->json([
            'success' => true,
            'data' => $widgets
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Get the current user
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        // Get gym_id from user, default to 1
        $gymId = $user && is_object($user) && isset($user->gym_id) ? (int) $user->gym_id : 1;

        $request->validate([
            'type' => 'required|string|in:advertisement,activity',
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string|max:5000',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'link_url' => 'nullable|url|max:500',
            'link_text' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
            'order' => 'nullable|integer|min:0',
            'metadata' => 'nullable|array'
        ]);

        $widgetData = [
            'gym_id' => $gymId,
            'type' => $request->type,
            'title' => $request->title,
            'content' => $request->content,
            'link_url' => $request->link_url,
            'link_text' => $request->link_text,
            'is_active' => $request->has('is_active') ? $request->is_active : true,
            'order' => $request->order ?? 0,
            'metadata' => $request->metadata
        ];

        // Handle image upload
        if ($request->hasFile('image')) {
            try {
                $image = $request->file('image');
                $extension = $image->getClientOriginalExtension();
                if (empty($extension)) {
                    $extension = $image->guessExtension();
                }
                
                $imageName = Str::uuid() . '.' . $extension;
                $uploadPath = public_path('images/community-uploads/widgets');
                
                if (!file_exists($uploadPath)) {
                    mkdir($uploadPath, 0755, true);
                }
                
                $image->move($uploadPath, $imageName);
                // Save full public path in database
                $widgetData['image_path'] = 'images/community-uploads/widgets/' . $imageName;
            } catch (\Exception $e) {
                Log::error('Widget image upload failed', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to upload image: ' . $e->getMessage()
                ], 500);
            }
        }

        try {
            $widget = CommunityWidget::create($widgetData);
            // Ensure image_url is included in response
            $widget->image_url = $widget->image_url;
            
            return response()->json([
                'success' => true,
                'message' => 'Widget created successfully',
                'data' => $widget
            ], 201);
        } catch (\Exception $e) {
            Log::error('Failed to create widget', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create widget: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        // Get the current user
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        // Get gym_id from user, default to 1
        $gymId = $user && is_object($user) && isset($user->gym_id) ? (int) $user->gym_id : 1;

        $widget = CommunityWidget::where('gym_id', $gymId)->findOrFail($id);
        // Ensure image_url is included in response
        $widget->image_url = $widget->image_url;

        return response()->json([
            'success' => true,
            'data' => $widget
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Get the current user
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        // Get gym_id from user, default to 1
        $gymId = $user && is_object($user) && isset($user->gym_id) ? (int) $user->gym_id : 1;

        $widget = CommunityWidget::where('gym_id', $gymId)->findOrFail($id);

        $request->validate([
            'type' => 'sometimes|string|in:advertisement,activity',
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string|max:5000',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'link_url' => 'nullable|url|max:500',
            'link_text' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
            'order' => 'nullable|integer|min:0',
            'metadata' => 'nullable|array'
        ]);

        $widgetData = [];
        
        if ($request->has('type')) {
            $widgetData['type'] = $request->type;
        }
        if ($request->has('title')) {
            $widgetData['title'] = $request->title;
        }
        if ($request->has('content')) {
            $widgetData['content'] = $request->content;
        }
        if ($request->has('link_url')) {
            $widgetData['link_url'] = $request->link_url;
        }
        if ($request->has('link_text')) {
            $widgetData['link_text'] = $request->link_text;
        }
        if ($request->has('is_active')) {
            $widgetData['is_active'] = $request->is_active;
        }
        if ($request->has('order')) {
            $widgetData['order'] = $request->order;
        }
        if ($request->has('metadata')) {
            $widgetData['metadata'] = $request->metadata;
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            try {
                // Delete old image if exists
                if ($widget->image_path) {
                    // Handle both full path and filename formats
                    $oldImagePath = strpos($widget->image_path, 'images/') === 0 
                        ? public_path($widget->image_path)
                        : public_path('images/community-uploads/widgets/' . $widget->image_path);
                    
                    if (file_exists($oldImagePath)) {
                        @unlink($oldImagePath);
                    }
                }

                $image = $request->file('image');
                $extension = $image->getClientOriginalExtension();
                if (empty($extension)) {
                    $extension = $image->guessExtension();
                }
                
                $imageName = Str::uuid() . '.' . $extension;
                $uploadPath = public_path('images/community-uploads/widgets');
                
                if (!file_exists($uploadPath)) {
                    mkdir($uploadPath, 0755, true);
                }
                
                $image->move($uploadPath, $imageName);
                // Save full public path in database
                $widgetData['image_path'] = 'images/community-uploads/widgets/' . $imageName;
            } catch (\Exception $e) {
                Log::error('Widget image upload failed', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to upload image: ' . $e->getMessage()
                ], 500);
            }
        }

        try {
            $widget->update($widgetData);
            $widget->refresh();
            // Ensure image_url is included in response
            $widget->image_url = $widget->image_url;
            
            return response()->json([
                'success' => true,
                'message' => 'Widget updated successfully',
                'data' => $widget
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to update widget', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update widget: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        // Get the current user
        $user = $request->user('api') ?? auth()->user() ?? $request->get('auth_user') ?? $request->get('auth_member');
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        // Get gym_id from user, default to 1
        $gymId = $user && is_object($user) && isset($user->gym_id) ? (int) $user->gym_id : 1;

        $widget = CommunityWidget::where('gym_id', $gymId)->findOrFail($id);

        // Delete associated image
        if ($widget->image_path) {
            // Handle both full path and filename formats
            $imagePath = strpos($widget->image_path, 'images/') === 0 
                ? public_path($widget->image_path)
                : public_path('images/community-uploads/widgets/' . $widget->image_path);
            
            if (file_exists($imagePath)) {
                @unlink($imagePath);
            }
        }

        $widget->delete();

        return response()->json([
            'success' => true,
            'message' => 'Widget deleted successfully'
        ]);
    }
}
