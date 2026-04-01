<?php

namespace App\Http\Controllers;

use App\Models\CoachSetting;
use App\Models\Coach;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class CoachSettingsController extends Controller
{
    /**
     * Get coach settings for a specific coach
     */
    public function getCoachSettings($coachId)
    {
        try {
            // Check if user has permission to view this coach's settings
            $user = Auth::user();
            $gymId = $user->gym_id;
            
            if (!$gymId) {
                return response()->json([
                    'status' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            // Get coach settings
            $settings = CoachSetting::where('coach_id', $coachId)
                ->where('gym_id', $gymId)
                ->first();

            if (!$settings) {
                // Create default settings if none exist
                $settings = $this->createDefaultSettings($coachId, $gymId);
            }

            return response()->json([
                'status' => true,
                'settings' => $this->formatSettingsForFrontend($settings)
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error fetching coach settings: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update coach settings
     */
    public function updateCoachSettings(Request $request, $coachId)
    {
        try {
            $user = Auth::user();
            $gymId = $user->gym_id;
            
            if (!$gymId) {
                return response()->json([
                    'status' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            // Validate request
            $validator = Validator::make($request->all(), [
                'accountStatus' => 'required|in:active,inactive,suspended',
                'accountType' => 'required|in:full-time,part-time,contractor,freelance',
                'joinDate' => 'nullable|date',
                'notifications.email.newTasks' => 'boolean',
                'notifications.email.messages' => 'boolean',
                'notifications.email.memberAssignments' => 'boolean',
                'notifications.email.scheduleUpdates' => 'boolean',
                'notifications.sms.urgentTasks' => 'boolean',
                'notifications.sms.scheduleChanges' => 'boolean',
                'privacy.profileVisibility' => 'required|in:public,members-only,private',
                'privacy.contactVisibility' => 'required|in:public,members-only,private',
                'privacy.scheduleVisibility' => 'required|in:public,members-only,private',
                'workPreferences.defaultSessionDuration' => 'required|integer|min:15|max:180',
                'workPreferences.maxClientsPerDay' => 'required|integer|min:1|max:20',
                'workPreferences.workStartTime' => 'required|date_format:H:i',
                'workPreferences.workEndTime' => 'required|date_format:H:i|after:workPreferences.workStartTime',
                'workPreferences.breakTime' => 'required|integer|min:5|max:60',
                'payment.paymentMethod' => 'required|in:bank-transfer,credit-card,paypal,cash',
                'payment.paymentFrequency' => 'required|in:weekly,bi-weekly,monthly,quarterly',
                'payment.taxId' => 'nullable|string|max:50',
                'security.twoFactorAuth' => 'boolean',
                'security.sessionTimeout' => 'required|integer|min:15|max:120',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Get or create settings
            $settings = CoachSetting::where('coach_id', $coachId)
                ->where('gym_id', $gymId)
                ->first();

            if (!$settings) {
                $settings = new CoachSetting();
                $settings->coach_id = $coachId;
                $settings->gym_id = $gymId;
            }

            // Update settings from request
            $settings->account_status = $request->input('accountStatus');
            $settings->account_type = $request->input('accountType');
            $settings->join_date = $request->input('joinDate');
            $settings->notifications = $request->input('notifications');
            $settings->profile_visibility = $request->input('privacy.profileVisibility');
            $settings->contact_visibility = $request->input('privacy.contactVisibility');
            $settings->schedule_visibility = $request->input('privacy.scheduleVisibility');
            $settings->default_session_duration = $request->input('workPreferences.defaultSessionDuration');
            $settings->max_clients_per_day = $request->input('workPreferences.maxClientsPerDay');
            $settings->work_start_time = $request->input('workPreferences.workStartTime');
            $settings->work_end_time = $request->input('workPreferences.workEndTime');
            $settings->break_time = $request->input('workPreferences.breakTime');
            $settings->payment_method = $request->input('payment.paymentMethod');
            $settings->payment_frequency = $request->input('payment.paymentFrequency');
            $settings->tax_id = $request->input('payment.taxId');
            $settings->two_factor_auth = $request->input('security.twoFactorAuth');
            $settings->session_timeout = $request->input('security.sessionTimeout');

            $settings->save();

            return response()->json([
                'status' => true,
                'message' => 'Coach settings updated successfully',
                'settings' => $this->formatSettingsForFrontend($settings)
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error updating coach settings: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reset coach settings to defaults
     */
    public function resetCoachSettings($coachId)
    {
        try {
            $user = Auth::user();
            $gymId = $user->gym_id;
            
            if (!$gymId) {
                return response()->json([
                    'status' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            // Delete existing settings
            CoachSetting::where('coach_id', $coachId)
                ->where('gym_id', $gymId)
                ->delete();

            // Create new default settings
            $settings = $this->createDefaultSettings($coachId, $gymId);

            return response()->json([
                'status' => true,
                'message' => 'Coach settings reset to defaults',
                'settings' => $this->formatSettingsForFrontend($settings)
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error resetting coach settings: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all coach settings for a gym (admin function)
     */
    public function getGymCoachSettings()
    {
        try {
            $user = Auth::user();
            $gymId = $user->gym_id;
            
            if (!$gymId) {
                return response()->json([
                    'status' => false,
                    'message' => 'User not associated with any gym'
                ], 400);
            }

            $settings = CoachSetting::where('gym_id', $gymId)
                ->with(['coach:id,first_name,last_name,email'])
                ->get();

            return response()->json([
                'status' => true,
                'settings' => $settings->map(function($setting) {
                    return [
                        'id' => $setting->id,
                        'coach' => $setting->coach,
                        'account_status' => $setting->account_status,
                        'account_type' => $setting->account_type,
                        'join_date' => $setting->join_date,
                        'created_at' => $setting->created_at,
                        'updated_at' => $setting->updated_at
                    ];
                })
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error fetching gym coach settings: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create default settings for a coach
     */
    private function createDefaultSettings($coachId, $gymId)
    {
        $defaultSettings = new CoachSetting();
        $defaultSettings->coach_id = $coachId;
        $defaultSettings->gym_id = $gymId;
        $defaultSettings->account_status = 'active';
        $defaultSettings->account_type = 'full-time';
        $defaultSettings->join_date = now();
        $defaultSettings->notifications = [
            'email' => [
                'newTasks' => true,
                'messages' => true,
                'memberAssignments' => true,
                'scheduleUpdates' => false
            ],
            'sms' => [
                'urgentTasks' => true,
                'scheduleChanges' => false
            ]
        ];
        $defaultSettings->profile_visibility = 'public';
        $defaultSettings->contact_visibility = 'members-only';
        $defaultSettings->schedule_visibility = 'members-only';
        $defaultSettings->default_session_duration = 60;
        $defaultSettings->max_clients_per_day = 8;
        $defaultSettings->work_start_time = '09:00:00';
        $defaultSettings->work_end_time = '17:00:00';
        $defaultSettings->break_time = 10;
        $defaultSettings->payment_method = 'bank-transfer';
        $defaultSettings->payment_frequency = 'monthly';
        $defaultSettings->tax_id = '';
        $defaultSettings->two_factor_auth = false;
        $defaultSettings->session_timeout = 30;

        $defaultSettings->save();
        return $defaultSettings;
    }

    /**
     * Format settings for frontend consumption
     */
    private function formatSettingsForFrontend($settings)
    {
        return [
            'accountStatus' => $settings->account_status,
            'accountType' => $settings->account_type,
            'joinDate' => $settings->join_date ? $settings->join_date->format('Y-m-d') : null,
            'notifications' => $settings->notifications,
            'privacy' => [
                'profileVisibility' => $settings->profile_visibility,
                'contactVisibility' => $settings->contact_visibility,
                'scheduleVisibility' => $settings->schedule_visibility
            ],
            'workPreferences' => [
                'defaultSessionDuration' => $settings->default_session_duration,
                'maxClientsPerDay' => $settings->max_clients_per_day,
                'workStartTime' => $settings->work_start_time ? $settings->work_start_time->format('H:i') : '09:00',
                'workEndTime' => $settings->work_end_time ? $settings->work_end_time->format('H:i') : '17:00',
                'breakTime' => $settings->break_time
            ],
            'payment' => [
                'paymentMethod' => $settings->payment_method,
                'paymentFrequency' => $settings->payment_frequency,
                'taxId' => $settings->tax_id
            ],
            'security' => [
                'twoFactorAuth' => $settings->two_factor_auth,
                'sessionTimeout' => $settings->session_timeout
            ]
        ];
    }
}
