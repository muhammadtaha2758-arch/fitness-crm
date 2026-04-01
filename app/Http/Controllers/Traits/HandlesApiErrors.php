<?php

namespace App\Http\Controllers\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

trait HandlesApiErrors
{
    /**
     * Handle API errors with secure error messages
     * 
     * @param Throwable $exception
     * @param string $context Additional context for logging
     * @return JsonResponse
     */
    protected function handleApiError(Throwable $exception, string $context = ''): JsonResponse
    {
        // Log full error details server-side
        Log::error('API Error: ' . $exception->getMessage(), [
            'context' => $context,
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
            'trace' => $exception->getTraceAsString(),
            'request_path' => request()->path(),
            'request_method' => request()->method(),
        ]);

        // Handle specific exception types
        if ($exception instanceof ValidationException) {
            return $this->handleValidationError($exception);
        }

        if ($exception instanceof ModelNotFoundException) {
            return $this->handleModelNotFound($exception);
        }

        if ($exception instanceof NotFoundHttpException) {
            return $this->handleNotFound();
        }

        // Generic error response
        return response()->json([
            'success' => false,
            'message' => $this->getSafeErrorMessage($exception),
        ], $this->getStatusCode($exception));
    }

    /**
     * Handle validation errors
     */
    protected function handleValidationError(ValidationException $exception): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $exception->errors(),
        ], 422);
    }

    /**
     * Handle model not found errors
     */
    protected function handleModelNotFound(ModelNotFoundException $exception): JsonResponse
    {
        $model = class_basename($exception->getModel());
        return response()->json([
            'success' => false,
            'message' => ucfirst(str_replace('_', ' ', Str::snake($model))) . ' not found',
        ], 404);
    }

    /**
     * Handle not found errors
     */
    protected function handleNotFound(): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => 'Resource not found',
        ], 404);
    }

    /**
     * Get safe error message that doesn't expose sensitive information
     */
    protected function getSafeErrorMessage(Throwable $exception): string
    {
        // In debug mode, show more details (but still sanitized)
        if (config('app.debug')) {
            // Remove file paths and sensitive info
            $message = $exception->getMessage();
            $message = preg_replace('/\/[^\s]+\.php/', '[file]', $message);
            return $message;
        }

        // In production, return generic messages
        $message = $exception->getMessage();
        
        // Check for common error patterns and return safe messages
        if (str_contains($message, 'SQLSTATE')) {
            return 'A database error occurred. Please try again later.';
        }

        if (str_contains($message, 'Connection') || str_contains($message, 'timeout')) {
            return 'Unable to connect to the server. Please try again later.';
        }

        if (str_contains($message, 'Permission') || str_contains($message, 'Access denied')) {
            return 'You do not have permission to perform this action.';
        }

        // Generic fallback
        return 'An error occurred. Please try again later.';
    }

    /**
     * Get appropriate HTTP status code for exception
     */
    protected function getStatusCode(Throwable $exception): int
    {
        // Check if exception has a status code method
        if (method_exists($exception, 'getStatusCode')) {
            return $exception->getStatusCode();
        }

        // Check if exception has a status property
        if (property_exists($exception, 'status')) {
            return $exception->status;
        }

        // Default to 500 for unknown errors
        return 500;
    }
}

