<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Member;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureMemberHasSubscription
{
    /**
     * Handle an incoming request.
     * Requires that the authenticated member has an active subscription to perform the action.
     * Skips check when a coach/user is authenticated (auth_user set).
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $authMember = $request->get('auth_member');

        if (!$authMember) {
            return response()->json([
                'success' => false,
                'message' => 'Authentication required.',
                'code' => 'UNAUTHENTICATED',
            ], 401);
        }

        // If coach/user is authenticated (not a member), allow through
        if ($request->get('auth_user')) {
            return $next($request);
        }

        $member = $this->resolveMember($authMember);
        if (!$member) {
            return response()->json([
                'success' => false,
                'message' => 'Member not found.',
                'code' => 'MEMBER_NOT_FOUND',
            ], 403);
        }

        if (!$member->hasActiveSubscription()) {
            return response()->json([
                'success' => false,
                'message' => 'You need an active subscription to perform this action.',
                'code' => 'SUBSCRIPTION_REQUIRED',
                'subscribed' => false,
            ], 403);
        }

        return $next($request);
    }

    /**
     * Resolve the Member model from auth_member (can be Member or User with member_id).
     *
     * @param mixed $authMember
     * @return Member|null
     */
    protected function resolveMember($authMember): ?Member
    {
        if ($authMember instanceof Member) {
            return $authMember;
        }

        $memberId = $authMember->member_id ?? $authMember->id ?? null;
        if (!$memberId) {
            return null;
        }

        return Member::find($memberId);
    }
}
