<?php

namespace App\Http\Controllers\Mobile\member;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class MobileMemberController extends Controller
{
    /**
     * Get member details
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMemberDetails(Request $request)
    {
        try {
            $user = $request->get('auth_member');

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            // Fetch member details from members table using email to link user to member
            $memberDetails = DB::table('members')
                ->where('email', $user->email)
                ->first();

            if (!$memberDetails) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not found'
                ], 404);
            }

            // Format date of birth if exists
            $dateOfBirth = null;
            if ($memberDetails->date_of_birth) {
                $dateOfBirth = date('d-m-Y', strtotime($memberDetails->date_of_birth));
            }

            // Prepare response data
            $data = [
                'id' => $memberDetails->id,
                'email' => $memberDetails->email ?? '',
                'username' => $memberDetails->membername ?? $memberDetails->username ?? '',
                'firstname' => $memberDetails->firstname ?? '',
                'lastname' => $memberDetails->lastname ?? '',
                'name' => trim(($memberDetails->firstname ?? '') . ' ' . ($memberDetails->lastname ?? '')),
                'date_of_birth' => $dateOfBirth,
                'gender' => $memberDetails->gender ?? '',
                'weight' => $memberDetails->weight ?? null,
                'height' => $memberDetails->height ?? null,
                'weight_unit' => $memberDetails->weight_unit ?? 'kg',
                'distance_unit' => $memberDetails->distance_unit ?? 'km',
                'phone' => $memberDetails->phone ?? '',
                'mobile_phone' => $memberDetails->mobile_phone ?? $memberDetails->phone ?? '',
                'landline_phone' => $memberDetails->landline_phone ?? '',
                'address' => $memberDetails->address ?? '',
                'city' => $memberDetails->city ?? '',
                'state' => $memberDetails->state ?? '',
                'zip_code' => $memberDetails->zipcode ?? '',
                'profile_image' => $memberDetails->profile_image ?? '',
                'gym_id' => $memberDetails->gym_id ?? null,
            ];

            return response()->json([
                'success' => true,
                'message' => 'Member details retrieved successfully',
                'data' => $data
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching member details: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update member details
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateMemberDetails(Request $request)
    {
        try {
            $member = $request->get('auth_member');

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not authenticated'
                ], 401);
            }

            // Find member record by email
            $memberRecord = DB::table('members')
                ->where('email', $member->email)
                ->first();

            if (!$memberRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member record not found'
                ], 404);
            }

            // Handle password update separately if provided
            if ($request->has('current_password') || $request->has('password')) {
                // Validate password fields
                $passwordValidator = Validator::make($request->all(), [
                    'current_password' => 'required|string',
                    'password' => 'required|string|min:6',
                    'password_confirmation' => 'required|string|same:password',
                ]);

                if ($passwordValidator->fails()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Password validation failed',
                        'errors' => $passwordValidator->errors()
                    ], 422);
                }

                // Get user record to verify current password
                $userRecord = User::find($member->id);
                
                if (!$userRecord) {
                    return response()->json([
                        'success' => false,
                        'message' => 'User record not found'
                    ], 404);
                }

                // Verify current password
                if (!Hash::check($request->current_password, $userRecord->password)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Current password is incorrect',
                        'errors' => ['current_password' => ['The current password is incorrect.']]
                    ], 400);
                }

                // Update password in users table
                $userRecord->update([
                    'password' => Hash::make($request->password)
                ]);
            }

            // Validate the request (excluding password fields)
            $validator = Validator::make($request->all(), [
                'firstname' => 'nullable|string|max:255',
                'lastname' => 'nullable|string|max:255',
                'username' => 'nullable|string|max:255|unique:members,membername,' . $memberRecord->id,
                'email' => 'nullable|email|max:255|unique:members,email,' . $memberRecord->id,
                'date_of_birth' => 'nullable|date',
                'gender' => 'nullable|string|in:Male,Female,Other',
                'weight' => 'nullable|numeric|min:0|max:500',
                'height' => 'nullable|numeric|min:0|max:300',
                'weight_unit' => 'nullable|string|in:kg,lb',
                'distance_unit' => 'nullable|string|in:km,miles',
                'phone' => 'nullable|string|max:20',
                'mobile_phone' => 'nullable|string|max:20',
                'address' => 'nullable|string|max:500',
                'city' => 'nullable|string|max:255',
                'state' => 'nullable|string|max:255',
                'zip_code' => 'nullable|string|max:20',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Prepare update data
            $updateData = [];
            
            if ($request->has('firstname')) {
                $updateData['firstname'] = $request->firstname;
            }
            
            if ($request->has('lastname')) {
                $updateData['lastname'] = $request->lastname;
            }
            
            if ($request->has('username')) {
                $updateData['membername'] = $request->username;
            }
            
            if ($request->has('email')) {
                $updateData['email'] = $request->email;
            }
            
            if ($request->has('date_of_birth')) {
                // Convert date format from d-m-Y to Y-m-d for database
                $dateOfBirth = $request->date_of_birth;
                if (strpos($dateOfBirth, '-') !== false) {
                    $dateParts = explode('-', $dateOfBirth);
                    if (count($dateParts) === 3) {
                        // Check if format is d-m-Y or Y-m-d
                        if (strlen($dateParts[0]) === 2) {
                            // Format is d-m-Y, convert to Y-m-d
                            $updateData['date_of_birth'] = $dateParts[2] . '-' . $dateParts[1] . '-' . $dateParts[0];
                        } else {
                            // Format is already Y-m-d
                            $updateData['date_of_birth'] = $dateOfBirth;
                        }
                    } else {
                        $updateData['date_of_birth'] = $dateOfBirth;
                    }
                } else {
                    $updateData['date_of_birth'] = $dateOfBirth;
                }
            }
            
            if ($request->has('gender')) {
                $updateData['gender'] = $request->gender;
            }
            
            if ($request->has('weight')) {
                $updateData['weight'] = $request->weight;
            }
            
            if ($request->has('height')) {
                $updateData['height'] = $request->height;
            }
            
            if ($request->has('weight_unit')) {
                $updateData['weight_unit'] = $request->weight_unit;
            }
            
            if ($request->has('distance_unit')) {
                $updateData['distance_unit'] = $request->distance_unit;
            }
            
            if ($request->has('phone')) {
                $updateData['phone'] = $request->phone;
            }
            
            if ($request->has('address')) {
                $updateData['address'] = $request->address;
            }
            
            if ($request->has('city')) {
                $updateData['city'] = $request->city;
            }
            
            if ($request->has('state')) {
                $updateData['state'] = $request->state;
            }
            
            if ($request->has('zip_code')) {
                $updateData['zipcode'] = $request->zip_code;
            }
            
            if ($request->has('mobile_phone')) {
                $updateData['mobile_phone'] = $request->mobile_phone;
            }

            // Check if there are member fields to update (other than password)
            $hasMemberFieldsToUpdate = !empty($updateData);
            
            // Only update member details if there are fields to update (other than password)
            // Password is already handled separately above
            if ($hasMemberFieldsToUpdate) {
                // Add updated_at timestamp
                $updateData['updated_at'] = now();

                // Update member in database
                $updated = DB::table('members')
                    ->where('id', $memberRecord->id)
                    ->update($updateData);

                if ($updated === false) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to update member details'
                    ], 500);
                }
            }

            // Fetch updated member details
            $updatedMember = DB::table('members')
                ->where('id', $memberRecord->id)
                ->first();

            // Format date of birth for response
            $dateOfBirth = null;
            if ($updatedMember->date_of_birth) {
                $dateOfBirth = date('d-m-Y', strtotime($updatedMember->date_of_birth));
            }

            // Prepare response data
            $data = [
                'id' => $updatedMember->id,
                'email' => $updatedMember->email ?? '',
                'username' => $updatedMember->membername ?? '',
                'firstname' => $updatedMember->firstname ?? '',
                'lastname' => $updatedMember->lastname ?? '',
                'name' => trim(($updatedMember->firstname ?? '') . ' ' . ($updatedMember->lastname ?? '')),
                'date_of_birth' => $dateOfBirth,
                'gender' => $updatedMember->gender ?? '',
                'weight' => $updatedMember->weight ?? null,
                'height' => $updatedMember->height ?? null,
                'weight_unit' => $updatedMember->weight_unit ?? 'kg',
                'distance_unit' => $updatedMember->distance_unit ?? 'km',
                'phone' => $updatedMember->phone ?? '',
                'mobile_phone' => $updatedMember->mobile_phone ?? $updatedMember->phone ?? '',
                'landline_phone' => $updatedMember->landline_phone ?? '',
                'address' => $updatedMember->address ?? '',
                'city' => $updatedMember->city ?? '',
                'state' => $updatedMember->state ?? '',
                'zip_code' => $updatedMember->zipcode ?? '',
                'profile_image' => $updatedMember->profile_image ?? '',
                'gym_id' => $updatedMember->gym_id ?? null,
            ];

            // Determine success message
            $hasPasswordUpdate = $request->has('current_password') || $request->has('password');
            if ($hasPasswordUpdate && $hasMemberFieldsToUpdate) {
                $message = 'Password and member details updated successfully';
            } elseif ($hasPasswordUpdate) {
                $message = 'Password updated successfully';
            } else {
                $message = 'Member details updated successfully';
            }

            return response()->json([
                'success' => true,
                'message' => $message,
                'data' => $data
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating member details: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Upload profile photo
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadProfilePhoto(Request $request)
    {
        try {
            $member = $request->get('auth_member');

            if (!$member) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member not authenticated'
                ], 401);
            }

            // Find member record by email
            $memberRecord = DB::table('members')
                ->where('email', $member->email)
                ->first();

            if (!$memberRecord) {
                return response()->json([
                    'success' => false,
                    'message' => 'Member record not found'
                ], 404);
            }

            // Validate the request
            $validator = Validator::make($request->all(), [
                'profile_photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240', // Max 10MB (same as comparison photos)
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Handle file upload
            if ($request->hasFile('profile_photo')) {
                $file = $request->file('profile_photo');
                $originalName = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                
                // Delete old profile image if exists
                if ($memberRecord->profile_image) {
                    $oldImagePath = $memberRecord->profile_image;
                    // Handle different path formats
                    $fullOldPath = null;
                    if (strpos($oldImagePath, 'images/avatar/') === 0) {
                        // New format: images/avatar/filename.ext
                        $fullOldPath = public_path($oldImagePath);
                    } elseif (strpos($oldImagePath, 'images/') === 0) {
                        // Old format: images/filename.ext
                        $fullOldPath = public_path($oldImagePath);
                    } else {
                        // Just filename: filename.ext (assume it's in images/avatar/)
                        $fullOldPath = public_path('images/avatar/' . $oldImagePath);
                    }
                    
                    if ($fullOldPath && file_exists($fullOldPath)) {
                        unlink($fullOldPath);
                    }
                }
                
                // Generate unique filename
                $filename = 'profile_' . $memberRecord->id . '_' . time() . '_' . Str::random(10) . '.' . $extension;
                
                // Store the file directly in public/images/avatar directory
                $publicPath = public_path('images/avatar');
                if (!file_exists($publicPath)) {
                    mkdir($publicPath, 0755, true);
                }
                
                $file->move($publicPath, $filename);
                // Store only the filename in database (not the full path)
                $imagePath = $filename;

                // Update member record with new profile image path
                DB::table('members')
                    ->where('id', $memberRecord->id)
                    ->update([
                        'profile_image' => $imagePath,
                        'updated_at' => now()
                    ]);

                // Fetch updated member details
                $updatedMember = DB::table('members')
                    ->where('id', $memberRecord->id)
                    ->first();

                // Format date of birth for response
                $dateOfBirth = null;
                if ($updatedMember->date_of_birth) {
                    $dateOfBirth = date('d-m-Y', strtotime($updatedMember->date_of_birth));
                }

                // Prepare response data
                $data = [
                    'id' => $updatedMember->id,
                    'email' => $updatedMember->email ?? '',
                    'username' => $updatedMember->membername ?? '',
                    'firstname' => $updatedMember->firstname ?? '',
                    'lastname' => $updatedMember->lastname ?? '',
                    'name' => trim(($updatedMember->firstname ?? '') . ' ' . ($updatedMember->lastname ?? '')),
                    'date_of_birth' => $dateOfBirth,
                    'gender' => $updatedMember->gender ?? '',
                    'weight' => $updatedMember->weight ?? null,
                    'height' => $updatedMember->height ?? null,
                    'weight_unit' => $updatedMember->weight_unit ?? 'kg',
                    'distance_unit' => $updatedMember->distance_unit ?? 'km',
                    'phone' => $updatedMember->phone ?? '',
                    'mobile_phone' => $updatedMember->mobile_phone ?? $updatedMember->phone ?? '',
                    'landline_phone' => $updatedMember->landline_phone ?? '',
                    'address' => $updatedMember->address ?? '',
                    'city' => $updatedMember->city ?? '',
                    'state' => $updatedMember->state ?? '',
                    'zip_code' => $updatedMember->zipcode ?? '',
                    'profile_image' => $updatedMember->profile_image ?? '',
                    'gym_id' => $updatedMember->gym_id ?? null,
                ];

                return response()->json([
                    'success' => true,
                    'message' => 'Profile photo uploaded successfully',
                    'data' => $data
                ], 200);

            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'No image file provided'
                ], 400);
            }

        } catch (\Exception $e) {
            Log::error('Profile photo upload error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Error uploading profile photo: ' . $e->getMessage()
            ], 500);
        }
    }
}

