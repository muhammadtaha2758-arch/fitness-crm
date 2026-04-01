<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureSubscribed
{
    /**
     * Paths that do not require an active gym subscription (allowed without subscription check).
     * get_user_auth is used on every app load to fetch user/permissions; frontend then checks
     * subscription/status and redirects to subscription page if needed.
     */
    protected $except = [
        'api/user',
        'api/subscription/status',
        'api/get_user_auth',
        'api/super-admin',  // prefix: super-admin/*
    ];

    /**
     * Handle an incoming request.
     * Blocks access when the user's gym has no active subscription (unless path is in $except).
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($this->inExceptArray($request)) {
            return $next($request);
        }

        $user = $request->user('api') ?? $request->user();

        if (!$user || !$user->subscribed()) {
            return response()->json([
                'success' => false,
                'message' => 'Your gym subscription has ended. Please resubscribe to continue using the system.',
                'subscribed' => false,
                'code' => 'subscription_required',
            ], 403);
        }

        return $next($request);
    }

    /**
     * Determine if the request path is in the exception list.
     */
    protected function inExceptArray(Request $request): bool
    {
        $path = $request->path();

        foreach ($this->except as $except) {
            if ($except === $path) {
                return true;
            }
            $prefix = rtrim($except, '*');
            if ($prefix !== $except && strpos($path, $prefix) === 0) {
                return true;
            }
        }

        return false;
    }
}
