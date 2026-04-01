<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Throwable;
use Exception;
use App\Http\Controllers\BaseController;




class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var arrays
     */
 
    protected $dontReport = [
        \Illuminate\Auth\AuthenticationException::class,
        \Illuminate\Auth\Access\AuthorizationException::class,
        \Symfony\Component\HttpKernel\Exception\HttpException::class,
        \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException::class,
        \Symfony\Component\HttpKernel\Exception\NotFoundHttpException::class,
        \Illuminate\Database\Eloquent\ModelNotFoundException::class,
        \Illuminate\Session\TokenMismatchException::class,
        \Illuminate\Validation\ValidationException::class,
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
      

        // public function destroyCookie($cookie_name){
        
        //     $domain = ($_SERVER['SERVER_NAME'] != 'localhost') ? $_SERVER['SERVER_NAME'] : '.'.$_SERVER['SERVER_NAME'];

        //     if (isset($_COOKIE[$cookie_name])) {
        //         unset($_COOKIE[$cookie_name]);  
        //         setcookie($cookie_name, '', time() - 2147483647, '/', $domain); // empty value and old timestamp
        //     }
        // }
        // protected function unauthenticated($request, AuthenticationException $exception)
        // {
        //     if ($request->expectsJson()) {
        //         $this->destroyCookie('Stocky_token');

        //         return response()->json([
        //             'message' => 'Unauthenticated.',
        //             'status' => 401,
        //         ], 401);
        //     }

        // }


        public function render($request, Throwable $exception)
        {
            // For API routes, always return JSON responses
            if ($request->is('api/*') || $request->expectsJson()) {
                // Handle ModelNotFoundException
                if ($exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Resource not found',
                    ], 404);
                }

                // Handle AuthorizationException
                if ($exception instanceof \Illuminate\Auth\Access\AuthorizationException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'You are not authorized to perform this action',
                    ], 403);
                }

                // Handle AuthenticationException
                if ($exception instanceof \Illuminate\Auth\AuthenticationException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Unauthenticated. Please login.',
                        'code' => 'UNAUTHENTICATED',
                    ], 401);
                }

                // Handle ValidationException
                if ($exception instanceof \Illuminate\Validation\ValidationException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Validation failed',
                        'errors' => $exception->errors(),
                    ], 422);
                }

                // Handle NotFoundHttpException
                if ($exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Endpoint not found',
                    ], 404);
                }

                // Handle other HTTP exceptions
                if ($exception instanceof \Symfony\Component\HttpKernel\Exception\HttpException) {
                    $statusCode = $exception->getStatusCode();
                    return response()->json([
                        'success' => false,
                        'message' => $exception->getMessage() ?: 'An error occurred',
                    ], $statusCode);
                }

                // Handle CSRF token mismatch (e.g. stale token on logout)
                if ($exception instanceof \Illuminate\Session\TokenMismatchException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'CSRF token mismatch. Please refresh the page and try again.',
                    ], 419);
                }

                // Generic error handler for API routes
                // Never expose sensitive information
                $message = config('app.debug') 
                    ? $this->sanitizeErrorMessage($exception->getMessage())
                    : 'An error occurred. Please try again later.';

                // Log full error details server-side
                \Log::error('Unhandled API Exception', [
                    'message' => $exception->getMessage(),
                    'file' => $exception->getFile(),
                    'line' => $exception->getLine(),
                    'trace' => $exception->getTraceAsString(),
                    'request_path' => $request->path(),
                    'request_method' => $request->method(),
                ]);

                return response()->json([
                    'success' => false,
                    'message' => $message,
                ], 500);
            }

            // For non-API routes, use default Laravel handling
            return parent::render($request, $exception);
        }

        /**
         * Sanitize error message to remove sensitive information
         */
        private function sanitizeErrorMessage(string $message): string
        {
            // Remove file paths
            $message = preg_replace('/\/[^\s]+\.php/', '[file]', $message);
            
            // Remove database connection strings
            $message = preg_replace('/mysql:\/\/[^\s]+/', '[database]', $message);
            
            return $message;
        }
       

    
}