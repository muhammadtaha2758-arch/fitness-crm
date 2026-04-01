<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Member;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;

class CoachMobileAuthMiddleware
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
            // Log for debugging
            \Log::warning('CoachMobileAuthMiddleware: No Authorization header', [
                'endpoint' => $request->path(),
                'method' => $request->method(),
            ]);
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
        \Log::info('CoachMobileAuthMiddleware: Processing request', [
            'endpoint' => $request->path(),
            'method' => $request->method(),
            'token_length' => strlen($token),
            'token_preview' => substr($token, 0, 30) . '...',
            'has_token_column' => Schema::hasColumn('users', 'token'),
        ]);

        // First, try to find a User (coach) by token
        $user = null;
        
        // PRIORITY 1: Check database token column (most reliable for mobile app)
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
                        if (!$u || !isset($u->id)) {
                            return null;
                        }
                        return [
                            'id' => $u->id ?? null,
                            'email' => $u->email ?? null,
                            'token_preview' => isset($u->token) ? substr($u->token, 0, 30) . '...' : null,
                            'token_length' => isset($u->token) ? strlen($u->token) : 0,
                        ];
                    })
                    ->filter(function($item) {
                        return $item !== null;
                    })
                    ->values();
                
                \Log::warning('CoachMobileAuthMiddleware: User not found by token', [
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
                if ($partialMatch && isset($partialMatch->id)) {
                    \Log::info('CoachMobileAuthMiddleware: Found partial token match', [
                        'user_id' => $partialMatch->id ?? null,
                        'user_email' => $partialMatch->email ?? null,
                        'db_token_preview' => isset($partialMatch->token) ? substr($partialMatch->token, 0, 30) . '...' : null,
                        'db_token_length' => isset($partialMatch->token) ? strlen($partialMatch->token) : 0,
                        'request_token_preview' => substr($token, 0, 30) . '...',
                        'request_token_length' => strlen($token),
                        'tokens_match' => isset($partialMatch->token) ? ($partialMatch->token === $token) : false,
                    ]);
                }
            }
            
            if ($user && isset($user->id)) {
                \Log::info('CoachMobileAuthMiddleware: User found by database token', [
                    'user_id' => $user->id ?? null,
                    'user_email' => $user->email ?? null,
                    'role_id' => $user->role_id ?? null,
                    'status' => $user->status ?? 'not_set',
                    'coach_id' => $user->coach_id ?? 'not_set',
                    'endpoint' => $request->path(),
                ]);
            }
            
            // If user found, check token expiration if expires_at column exists
            if ($user && isset($user->id) && Schema::hasColumn('users', 'token_expires_at')) {
                if (isset($user->token_expires_at) && $user->token_expires_at) {
                    // Handle both Carbon instance and string (defensive coding)
                    $expiresAt = $user->token_expires_at;
                    if (is_string($expiresAt)) {
                        try {
                            $expiresAt = \Carbon\Carbon::parse($expiresAt);
                        } catch (\Exception $e) {
                            \Log::warning('CoachMobileAuthMiddleware: Failed to parse token_expires_at', [
                                'user_id' => isset($user->id) ? $user->id : null,
                                'expires_at' => $expiresAt,
                                'error' => $e->getMessage(),
                            ]);
                            // If we can't parse it, skip expiration check
                            $expiresAt = null;
                        }
                    }
                    
                    // Check if token is expired (only if we have a valid date)
                    if ($expiresAt && $expiresAt->isPast()) {
                    // Log expired token for debugging
                    if (config('app.debug')) {
                        \Log::debug('CoachMobileAuthMiddleware: Token expired', [
                            'user_id' => isset($user->id) ? $user->id : null,
                            'endpoint' => $request->path(),
                            'expires_at' => $expiresAt ? $expiresAt->toDateTimeString() : null,
                        ]);
                    }
                    // Token expired, but don't crash - return clear error
                    return response()->json([
                        'success' => false,
                        'message' => 'Your session has expired. Please login again.',
                        'code' => 'TOKEN_EXPIRED',
                    ], 401);
                    }
                }
            }
        }
        
        // PRIORITY 2: If not found in database, try Passport token validation
        if (!$user) {
            try {
                $tokenRepository = app(\Laravel\Passport\TokenRepository::class);
                
                // Passport tokens are stored in oauth_access_tokens table
                // The token in the request is the actual access token (hash)
                // We need to find it by matching the token hash
                $passportToken = \Laravel\Passport\Token::where('id', $token)
                    ->orWhere(function($query) use ($token) {
                        // Some Passport implementations store tokens differently
                        // Try to find by token hash if the token column exists
                        if (Schema::hasColumn('oauth_access_tokens', 'token')) {
                            $query->where('token', hash('sha256', $token));
                        }
                    })
                    ->first();
                
                // Alternative: Try to find token by looking up all tokens and checking hash
                if (!$passportToken) {
                    // Get all active tokens and check if any match
                    $allTokens = \Laravel\Passport\Token::where('revoked', false)
                        ->where('expires_at', '>', now())
                        ->get();
                    
                    foreach ($allTokens as $tokenRecord) {
                        // Passport stores tokens as hashed values
                        // We need to check if the provided token matches any stored token
                        // This is a fallback - ideally tokens should be in the database
                        if (isset($tokenRecord->id) && $tokenRecord->id === $token) {
                            $passportToken = $tokenRecord;
                            break;
                        }
                    }
                }
                
                if ($passportToken && isset($passportToken->id) && !$tokenRepository->isAccessTokenRevoked($passportToken->id)) {
                    // Check if token is expired
                    if (isset($passportToken->expires_at) && $passportToken->expires_at && $passportToken->expires_at->isPast()) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Your session has expired. Please login again.',
                            'code' => 'TOKEN_EXPIRED',
                        ], 401);
                    }
                    
                    // Get user associated with this token
                    $user = isset($passportToken->user_id) ? User::find($passportToken->user_id) : null;
                    
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
                \Log::warning('Passport token validation failed in CoachMobileAuthMiddleware', [
                    'error' => $e->getMessage(),
                    'token_preview' => substr($token, 0, 20) . '...',
                    'endpoint' => $request->path(),
                    'trace' => $e->getTraceAsString(),
                ]);
            }
        }
        
        // If user found and is a coach (role_id = 3)
        if ($user && isset($user->role_id) && $user->role_id === 3) {
            // Check if user is active
            if (isset($user->status) && $user->status === 0) {
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

            // Add user to request for use in controllers
            // Only set auth_user for coaches, not auth_member (to avoid confusion)
            $request->merge(['auth_user' => $user]);
            // Don't set auth_member for coaches - it causes confusion in controllers
            // that check instanceof Member
            
            return $next($request);
        }

        // If no user found, try to find a Member by token
        $member = Member::where('token', $token)->first();
        
        if (!$member) {
            // Log for debugging
            \Log::warning('CoachMobileAuthMiddleware: Token not found for user or member', [
                'endpoint' => $request->path(),
                'token_preview' => substr($token, 0, 20) . '...',
                'user_found' => $user ? true : false,
                'user_role_id' => $user ? $user->role_id : null,
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