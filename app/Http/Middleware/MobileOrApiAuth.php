<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Member;
use App\Models\User;
use App\Models\Coach;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;

class MobileOrApiAuth
{
    private function isCoachUser($user): bool
    {
        try {
            return $user && isset($user->role_id) && (int) $user->role_id === 3;
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Handle an incoming request.
     * 
     * This middleware accepts both:
     * 1. Laravel Passport tokens (auth:api)
     * 2. Mobile app tokens (from users/members table)
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Prefer Authorization header, but fallback to Stocky_token cookie for CRM web sessions
        $token = $request->header('Authorization') ?: $request->cookie('Stocky_token');
        
        if (!$token) {
            // CRM fallback: if the user is logged in via normal web (session) auth, allow access.
            // This is required because CRM uses POST /login (session), and some browsers may not have Stocky_token.
            try {
                $sessionUser = Auth::guard('web')->user();
                if ($sessionUser) {
                    // If user is inactive, block (match other flows)
                    if (isset($sessionUser->status) && (int) $sessionUser->status === 0) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Account is not active',
                        ], 403);
                    }

                    // Make $request->user('api') work for controllers expecting api guard
                    Auth::guard('api')->setUser($sessionUser);
                    $request->setUserResolver(function ($guardName = null) use ($sessionUser) {
                        if ($guardName === 'api' || $guardName === null) {
                            return $sessionUser;
                        }
                        return null;
                    });

                    // Maintain existing compatibility fields used around the codebase
                    $request->merge(['auth_user' => $sessionUser]);
                    if (!$this->isCoachUser($sessionUser)) {
                        $request->merge(['auth_member' => $sessionUser]);
                    }

                    return $next($request);
                }
            } catch (\Throwable $e) {
                // If session auth fails, fall through to standard 401
            }

            return response()->json([
                'success' => false,
                'message' => 'Authorization token required',
            ], 401);
        }

        // Remove 'Bearer ' prefix if present (case-insensitive)
        $token = preg_replace('/^Bearer\s+/i', '', $token);
        $token = trim($token);
        
        // Clean token - remove any extra whitespace, quotes, or newlines
        $token = trim($token, " \t\n\r\0\x0B\"'");
        
        // Always log token processing for debugging authentication issues
        \Log::info('MobileOrApiAuth: Processing request', [
            'endpoint' => $request->path(),
            'method' => $request->method(),
            'token_length' => strlen($token),
            'token_preview' => substr($token, 0, 30) . '...',
            'has_token_column' => Schema::hasColumn('users', 'token'),
        ]);

        // First, try Laravel Passport authentication (auth:api)
        // Passport uses JWT tokens, so we need to validate them properly
        try {
            // Use Passport's TokenGuard to validate the token
            // Create a temporary request with the Authorization header
            $tempRequest = clone $request;
            $tempRequest->headers->set('Authorization', 'Bearer ' . $token);
            
            // Try to get user via Passport's guard
            $guard = Auth::guard('api');
            $passportUser = $guard->setRequest($tempRequest)->user();
            
            if ($passportUser) {
                \Log::info('MobileOrApiAuth: User authenticated via Passport', [
                    'user_id' => $passportUser->id,
                    'user_email' => $passportUser->email,
                    'role_id' => $passportUser->role_id ?? 'not_set',
                    'status' => $passportUser->status ?? 'not_set',
                    'endpoint' => $request->path(),
                ]);
                
                // Check if user is active
                if (!isset($passportUser->status) || $passportUser->status !== 0) {
                    // User is authenticated via Passport
                    // Set user for the API guard
                    Auth::guard('api')->setUser($passportUser);
                    
                    // Set user resolver to ensure $request->user('api') works
                    $request->setUserResolver(function ($guardName = null) use ($passportUser) {
                        if ($guardName === 'api' || $guardName === null) {
                            return $passportUser;
                        }
                        return null;
                    });
                    
                    // Also merge for backward compatibility
                    // For coaches (role_id=3), do NOT set auth_member to avoid confusing controllers
                    // that expect auth_member to be an actual Member model.
                    $request->merge(['auth_user' => $passportUser]);
                    if (!$this->isCoachUser($passportUser)) {
                        $request->merge(['auth_member' => $passportUser]);
                    }
                    
                    return $next($request);
                } else {
                    \Log::warning('MobileOrApiAuth: Passport user found but account is inactive', [
                        'user_id' => $passportUser->id,
                        'status' => $passportUser->status,
                    ]);
                }
            }
        } catch (\Exception $e) {
            // Passport authentication failed, continue to mobile auth
            \Log::debug('MobileOrApiAuth: Passport authentication failed', [
                'error' => $e->getMessage(),
                'endpoint' => $request->path(),
            ]);
        }

        // PRIORITY: Always check database token first (most reliable)
        // Check for User (coach) by token in users table
        $user = null;
        if (Schema::hasColumn('users', 'token')) {
            // Build base query - select only columns that exist to avoid errors
            $baseColumns = ['id', 'email', 'token', 'status', 'role_id', 'gym_id', 'coach_id', 'member_id', 'firstname', 'lastname'];
            if (Schema::hasColumn('users', 'token_expires_at')) {
                $baseColumns[] = 'token_expires_at';
            }
            
            // Try exact match first
            $user = User::select($baseColumns)->where('token', $token)->first();
            
            // If not found, try with trimmed token (in case of whitespace issues)
            if (!$user && $token !== trim($token)) {
                $user = User::select($baseColumns)->where('token', trim($token))->first();
            }
            
            // Also try case-insensitive match if still not found (some databases are case-sensitive)
            if (!$user) {
                $user = User::select($baseColumns)->whereRaw('LOWER(token) = ?', [strtolower($token)])->first();
            }
            
            // Log if user not found for debugging
            if (!$user) {
                // Get sample tokens from database for comparison
                $sampleTokens = User::whereNotNull('token')
                    ->select('id', 'email', 'token')
                    ->limit(3)
                    ->get()
                    ->map(function($u) {
                        return [
                            'id' => $u->id,
                            'email' => $u->email,
                            'token_preview' => substr($u->token, 0, 30) . '...',
                            'token_length' => strlen($u->token),
                        ];
                    });
                
                \Log::warning('MobileOrApiAuth: User not found by token', [
                    'endpoint' => $request->path(),
                    'token_length' => strlen($token),
                    'token_preview' => substr($token, 0, 30) . '...',
                    'token_first_50' => substr($token, 0, 50),
                    'total_users_with_tokens' => User::whereNotNull('token')->count(),
                    'sample_tokens_in_db' => $sampleTokens,
                    'token_has_pipe' => strpos($token, '|') !== false,
                    'token_trimmed_length' => strlen(trim($token)),
                ]);
                
                // Try to find by partial match (first 20 chars) for debugging
                $partialMatch = User::whereNotNull('token')
                    ->whereRaw('SUBSTRING(token, 1, 20) = ?', [substr($token, 0, 20)])
                    ->first();
                if ($partialMatch) {
                    \Log::info('MobileOrApiAuth: Found partial token match', [
                        'user_id' => $partialMatch->id,
                        'user_email' => $partialMatch->email,
                        'db_token_preview' => substr($partialMatch->token, 0, 30) . '...',
                        'db_token_length' => strlen($partialMatch->token),
                        'request_token_preview' => substr($token, 0, 30) . '...',
                        'request_token_length' => strlen($token),
                        'tokens_match' => $partialMatch->token === $token,
                    ]);
                }
            }
            
            // Check token expiration if expires_at column exists
            if ($user && Schema::hasColumn('users', 'token_expires_at')) {
                // Use getAttribute to safely access the column
                $tokenExpiresAt = $user->getAttribute('token_expires_at');
                if ($tokenExpiresAt) {
                    // Handle both Carbon instance and string
                    if (is_string($tokenExpiresAt)) {
                        try {
                            $tokenExpiresAt = \Carbon\Carbon::parse($tokenExpiresAt);
                        } catch (\Exception $e) {
                            \Log::warning('MobileOrApiAuth: Failed to parse token_expires_at', [
                                'user_id' => $user->id,
                                'error' => $e->getMessage(),
                            ]);
                            $tokenExpiresAt = null;
                        }
                    }
                    
                    if ($tokenExpiresAt && $tokenExpiresAt->isPast()) {
                        // Token expired
                        \Log::warning('MobileOrApiAuth: Token expired', [
                            'user_id' => $user->id,
                            'user_email' => $user->email,
                            'token_expires_at' => $tokenExpiresAt->toDateTimeString(),
                            'endpoint' => $request->path(),
                        ]);
                        return response()->json([
                            'success' => false,
                            'message' => 'Your session has expired. Please login again.',
                            'code' => 'SESSION_EXPIRED',
                        ], 401);
                    }
                }
            }
            
            if ($user) {
                \Log::info('MobileOrApiAuth: User found by database token', [
                    'user_id' => $user->id,
                    'user_email' => $user->email,
                    'role_id' => $user->role_id,
                    'status' => $user->status ?? 'not_set',
                    'coach_id' => $user->coach_id ?? 'not_set',
                    'endpoint' => $request->path(),
                ]);
            }
        } else {
            \Log::warning('MobileOrApiAuth: users table does not have token column');
        }
        
        // If not found in database, try Passport token validation
        // This is a fallback for tokens that might not be in the database yet
        if (!$user) {
            try {
                $tokenRepository = app(\Laravel\Passport\TokenRepository::class);
                
                // Extract token ID from the token string
                $tokenId = $token;
                if (strpos($token, '|') !== false) {
                    [$tokenId, $tokenPart] = explode('|', $token, 2);
                }
                
                // Try to find by Passport token
                $passportToken = $tokenRepository->find($tokenId);
                if ($passportToken && !$tokenRepository->isAccessTokenRevoked($tokenId)) {
                    $user = User::find($passportToken->user_id);
                    
                    // IMPORTANT: If Passport token is valid but not in database, save it
                    // This ensures future requests can use database lookup (faster)
                    if ($user && Schema::hasColumn('users', 'token')) {
                        $user->token = $token; // Save the token to database
                        // Only set token_expires_at if column exists
                        if (Schema::hasColumn('users', 'token_expires_at') && $passportToken->expires_at) {
                            $user->token_expires_at = $passportToken->expires_at;
                        }
                        $user->save();
                        
                        if (config('app.debug')) {
                            \Log::debug('MobileOrApiAuth: Passport token found, saved to database', [
                                'user_id' => $user->id,
                            ]);
                        }
                    }
                }
            } catch (\Exception $e) {
                // Passport lookup failed
                if (config('app.debug')) {
                    \Log::debug('MobileOrApiAuth: Passport token lookup failed: ' . $e->getMessage());
                }
            }
        }
        
        // If user found
        if ($user) {
            // Check if user is active
            if (isset($user->status) && $user->status === 0) {
                \Log::warning('MobileOrApiAuth: User account is not active', [
                    'user_id' => $user->id,
                    'user_email' => $user->email,
                    'status' => $user->status,
                    'endpoint' => $request->path(),
                ]);
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
            
            // Also add to request for backward compatibility
            $request->merge(['auth_user' => $user]);
            // For coaches (role_id=3), do NOT set auth_member to avoid confusing controllers
            if (!$this->isCoachUser($user)) {
                $request->merge(['auth_member' => $user]);
            }
            
            // Debug logging
            if (config('app.debug')) {
                \Log::debug('MobileOrApiAuth: User authenticated', [
                    'user_id' => $user->id ?? 'unknown',
                    'user_email' => $user->email ?? 'unknown',
                    'gym_id' => $user->gym_id ?? 'null',
                ]);
            }
            
            return $next($request);
        }

        // FALLBACK: If user not found in users table, check coaches table (migration support)
        // This helps during the transition period when tokens might still be in coaches table
        if (!$user && Schema::hasColumn('coaches', 'token')) {
            $coach = Coach::where('token', $token)->first();
            if ($coach) {
                \Log::info('MobileOrApiAuth: Token found in coaches table (migration fallback)', [
                    'coach_id' => $coach->id,
                    'coach_email' => $coach->email,
                ]);
                
                // Find associated user by coach_id
                $user = User::where('coach_id', $coach->id)->first();
                if ($user && Schema::hasColumn('users', 'token')) {
                    // Migrate token to users table for future requests
                    $user->token = $token;
                    if (Schema::hasColumn('users', 'token_expires_at')) {
                        $user->token_expires_at = now()->addDays(30);
                    }
                    $user->save();
                    
                    \Log::info('MobileOrApiAuth: Token migrated from coaches to users table', [
                        'coach_id' => $coach->id,
                        'user_id' => $user->id,
                        'user_email' => $user->email,
                    ]);
                } else {
                    \Log::warning('MobileOrApiAuth: Coach found but no associated user found', [
                        'coach_id' => $coach->id,
                    ]);
                }
            }
        }
        
        // If no user found, try to find a Member by token
        $member = Member::where('token', $token)->first();
        
        if ($member) {
            // Check if member is active
            if ((isset($member->Statuses) && $member->Statuses === 0) || 
                (isset($member->statut) && $member->statut === 0)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Account is not active',
                ], 403);
            }

            // For members, we need to check if they can access these routes
            // Usually members shouldn't access coach routes, but set for compatibility
            // Note: We don't set member on Auth guard because Member doesn't implement Authenticatable
            // Instead, we use request attributes which controllers access via $request->get('auth_member')
            
            $request->setUserResolver(function ($guard = null) use ($member) {
                if ($guard === 'api' || $guard === null) {
                    return $member;
                }
                return null;
            });
            
            $request->merge(['auth_member' => $member]);
            
            return $next($request);
        }

        // No authentication method worked
        \Log::warning('MobileOrApiAuth: Authentication failed - no user or member found', [
            'endpoint' => $request->path(),
            'method' => $request->method(),
            'token_length' => strlen($token),
            'token_preview' => substr($token, 0, 20) . '...',
            'has_auth_header' => $request->hasHeader('Authorization'),
            'total_users_with_tokens' => Schema::hasColumn('users', 'token') ? User::whereNotNull('token')->count() : 0,
            'total_members_with_tokens' => Schema::hasColumn('members', 'token') ? Member::whereNotNull('token')->count() : 0,
        ]);
        
        return response()->json([
            'success' => false,
            'message' => 'Invalid or expired token',
        ], 401);
    }
}

