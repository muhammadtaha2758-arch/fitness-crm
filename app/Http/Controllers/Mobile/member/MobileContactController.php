<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MobileContactController extends Controller
{
    /**
     * Submit contact form for mobile
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function submitContact(Request $request)
    {
        try {
            $member = $request->get('auth_member');

            // Validate the request
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'subject' => 'nullable|string|max:255',
                'message' => 'required|string|max:5000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Get gym_id from member (default to 1 if not set)
            $gymId = $member ? ($member->gym_id ?? 1) : 1;
            
            // Prepare data for insertion
            $contactData = [
                'name' => $request->name,
                'email' => $request->email,
                'subject' => $request->subject,
                'message' => $request->message,
                'member_id' => $member ? ($member->member_id ?? $member->id) : null,
                'gym_id' => $gymId,
                'created_at' => now(),
                'updated_at' => now(),
            ];

            // Insert into contact_messages table
            // Note: Adjust table name if your table has a different name
            DB::table('contact_messages')->insert($contactData);

            return response()->json([
                'success' => true,
                'message' => 'Thank you for contacting us! We will get back to you soon.',
                'data' => [
                    'name' => $request->name,
                    'email' => $request->email,
                    'subject' => $request->subject,
                    'submitted_at' => now()->format('Y-m-d H:i:s'),
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error submitting contact form: ' . $e->getMessage()
            ], 500);
        }
    }
}

