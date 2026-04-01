<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Support\Facades\Auth;
class Is_Active
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        
        // Only check user status for web requests, not API requests
        // API requests use Passport tokens and don't have session-based auth
        if ($request->is('api/*')) {
            return $response;
        }
        
        //If the status is not approved redirect to login 
        if(Auth::check() && !Auth::user()->status){
            Auth::logout();
            return redirect('/login')->with('erro_login', 'Your error text');
        }
        return $response;
    }
}