<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Member;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;

class MobileAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Prefer Authorization header, but fallback to Stocky_token cookie for browser sessions
        $token = $request->header('Authorization') ?: $request->cookie('Stocky_token');
        
        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Authorization token required',
            ], 401);
        }

        // Remove 'Bearer ' prefix if present (case-insensitive, handle multiple spaces)
        // Handle both "Bearer token" and "bearer token" formats
        $token = preg_replace('/^Bearer\s+/i', '', $token);
        $token = trim($token);
        
        // Debug logging (remove in production or use Log::debug)
        \Log::info('MobileAuthMiddleware - Token extraction', [
            'original_header' => $request->header('Authorization') ? substr($request->header('Authorization'), 0, 30) . '...' : 'null',
            'extracted_token_length' => strlen($token),
            'extracted_token_preview' => substr($token, 0, 20) . '...',
            'endpoint' => $request->path(),
        ]);

        // First, try to find a User (coach) by token
        $user = null;
        
        // PRIORITY 1: Check database token column (most reliable for mobile app)
        if (Schema::hasColumn('users', 'token')) {
            $user = User::where('token', $token)->first();
            
            // If user found, check token expiration if expires_at column exists
            if ($user && Schema::hasColumn('users', 'token_expires_at')) {
                if ($user->token_expires_at && $user->token_expires_at->isPast()) {
                    // Token expired, but don't crash - return clear error
                    return response()->json([
                        'success' => false,
                        'message' => 'Your session has expired. Please login again.',
                        'code' => 'TOKEN_EXPIRED',
                    ], 401);
                }
            }
        }
        
        // PRIORITY 2: If not found in database, try Passport token validation
        if (!$user) {
            try {
                $tokenRepository = app(\Laravel\Passport\TokenRepository::class);
                
                // Extract token ID from the token string
                // Passport tokens can be in format: "token_id|token_hash" or just "token_id"
                $tokenId = $token;
                if (strpos($token, '|') !== false) {
                    [$tokenId, $tokenPart] = explode('|', $token, 2);
                }
                
                // Try to find Passport token by ID
                $passportToken = $tokenRepository->find($tokenId);
                
                if ($passportToken && !$tokenRepository->isAccessTokenRevoked($tokenId)) {
                    // Check if token is expired
                    if ($passportToken->expires_at && $passportToken->expires_at->isPast()) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Your session has expired. Please login again.',
                            'code' => 'TOKEN_EXPIRED',
                        ], 401);
                    }
                    
                    // Get user associated with this token
                    $user = User::find($passportToken->user_id);
                    
                    // If user found and token column exists, sync token to database for faster future lookups
                    if ($user && Schema::hasColumn('users', 'token')) {
                        $user->token = $token;
                        if (Schema::hasColumn('users', 'token_expires_at') && $passportToken->expires_at) {
                            $user->token_expires_at = $passportToken->expires_at;
                        }
                        $user->save();
                    }
                }
            } catch (\Exception $e) {
                // Passport token lookup failed - log but don't crash
                // Continue with member lookup as fallback
                \Log::warning('Passport token validation failed in MobileAuthMiddleware', [
                    'error' => $e->getMessage(),
                    'token_preview' => substr($token, 0, 20) . '...',
                ]);
            }
        }
        
        // If user found, check their role and handle accordingly
        if ($user) {
            // Check if user is active
            if ($user->status === 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Account is not active',
                ], 403);
            }

            // Set user for the API guard (makes $request->user('api') work)
            Auth::guard('api')->setUser($user);
            
            // Also set user resolver for request
            $request->setUserResolver(function ($guard = null) use ($user) {
                if ($guard === 'api' || $guard === null) {
                    return $user;
                }
                return null;
            });

            // Handle based on role
            if ($user->role_id === 3) {
                // Coach - set auth_user
                $request->merge(['auth_user' => $user]);
                // Don't set auth_member for coaches - it causes confusion in controllers
                // that check instanceof Member
            } else {
                // Member (role_id = 2) or Admin (role_id = 1) - set auth_member for compatibility
                // Even though it's in users table, controllers expect auth_member
                $request->merge(['auth_member' => $user]);
            }
            
            return $next($request);
        }

        // If no user found, try to find a Member by token
        $member = null;
        
        // PRIORITY 1: Check database token column (most reliable for mobile app)
        if (Schema::hasColumn('members', 'token')) {
            $member = Member::where('token', $token)->first();
            
            // If member found, check token expiration if expires_at column exists
            if ($member && Schema::hasColumn('members', 'token_expires_at')) {
                if ($member->token_expires_at && $member->token_expires_at->isPast()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Your session has expired. Please login again.',
                        'code' => 'TOKEN_EXPIRED',
                    ], 401);
                }
            }
        }
        
        // PRIORITY 2: If not found in database, try Passport token validation for Members
        if (!$member) {
            try {
                $tokenRepository = app(\Laravel\Passport\TokenRepository::class);
                
                // Extract token ID from the token string
                // Passport tokens can be in format: "token_id|token_hash" or just "token_id"
                $tokenId = $token;
                if (strpos($token, '|') !== false) {
                    [$tokenId, $tokenPart] = explode('|', $token, 2);
                }
                
                // Try to find Passport token by ID
                $passportToken = $tokenRepository->find($tokenId);
                
                if ($passportToken && !$tokenRepository->isAccessTokenRevoked($tokenId)) {
                    // Check if token is expired
                    if ($passportToken->expires_at && $passportToken->expires_at->isPast()) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Your session has expired. Please login again.',
                            'code' => 'TOKEN_EXPIRED',
                        ], 401);
                    }
                    
                    // Get member associated with this token
                    // Passport tokens for members should have user_id pointing to member
                    $member = Member::find($passportToken->user_id);
                    
                    // If member found and token column exists, sync token to database for faster future lookups
                    if ($member && Schema::hasColumn('members', 'token')) {
                        $member->token = $token;
                        if (Schema::hasColumn('members', 'token_expires_at') && $passportToken->expires_at) {
                            $member->token_expires_at = $passportToken->expires_at;
                        }
                        $member->save();
                    }
                }
            } catch (\Exception $e) {
                // Passport token lookup failed - log but continue
                \Log::warning('Passport token validation failed for Member in MobileAuthMiddleware', [
                    'error' => $e->getMessage(),
                    'token_preview' => substr($token, 0, 20) . '...',
                ]);
            }
        }
        
        // Debug logging
        if (!$member) {
            \Log::warning('MobileAuthMiddleware - Member not found by token', [
                'token_length' => strlen($token),
                'token_preview' => substr($token, 0, 20) . '...',
                'endpoint' => $request->path(),
                'total_members_with_tokens' => Schema::hasColumn('members', 'token') ? Member::whereNotNull('token')->count() : 0,
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Invalid or expired token',
            ], 401);
        }

        // Check if member is active
        if (isset($member->Statuses) && $member->Statuses === 0) {
            return response()->json([
                'success' => false,
                'message' => 'Account is not active',
            ], 403);
        }
        
        // Also check statut field
        if (isset($member->statut) && $member->statut === 0) {
            return response()->json([
                'success' => false,
                'message' => 'Account is not active',
            ], 403);
        }

        // Note: We don't set member on Auth guard because Member doesn't implement Authenticatable
        // Instead, we use request attributes which controllers access via $request->get('auth_member')
        
        // Set user resolver for request (for compatibility)
        $request->setUserResolver(function ($guard = null) use ($member) {
            if ($guard === 'api' || $guard === null) {
                return $member;
            }
            return null;
        });

        // Add member to request for use in controllers
        $request->merge(['auth_member' => $member]);
        
        return $next($request);
    }
}
