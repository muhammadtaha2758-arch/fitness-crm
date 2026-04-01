<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Gym;

class PaysafeCardService
{
    protected $accountNumber;
    protected $apiKey;
    protected $environment;
    protected $baseUrl;

    public function __construct($gymId = null)
    {
        if ($gymId) {
            $this->loadGymConfiguration($gymId);
        } else {
            // Fallback to environment variables for backward compatibility
            $this->accountNumber = env('PAYSAFECARD_ACCOUNT_NUMBER');
            $this->apiKey = env('PAYSAFECARD_API_KEY');
            $this->environment = env('PAYSAFECARD_ENVIRONMENT', 'TEST');
            $this->baseUrl = $this->environment === 'PRODUCTION'
                ? 'https://api.paysafecard.com/v1'
                : 'https://apitest.paysafecard.com/v1';
        }
    }

    /**
     * Load configuration from a specific gym
     */
    public function loadGymConfiguration($gymId)
    {
        $gym = Gym::find($gymId);
        
        if (!$gym || $gym->active_payment_gateway !== 'paysafecard') {
            throw new \Exception('PaysafeCard is not configured for this gym');
        }

        $this->accountNumber = $gym->paysafecard_account_number;
        $this->apiKey = $gym->paysafecard_api_key;
        $this->environment = $gym->paysafecard_environment;
        $this->baseUrl = $this->environment === 'PRODUCTION'
            ? 'https://api.paysafecard.com/v1'
            : 'https://apitest.paysafecard.com/v1';
    }

    public function createPayment($amount, $currency = 'EUR', $customerData = [], $merchantRefId = null)
    {
        if (!$this->isConfigured()) {
            throw new \Exception('PaysafeCard is not properly configured');
        }

        $payload = [
            'amount' => $amount,
            'currency' => $currency,
            'merchant_customer_id' => $customerData['id'] ?? null,
            'merchant_ref_id' => $merchantRefId,
            'customer' => [
                'first_name' => $customerData['firstname'] ?? '',
                'last_name' => $customerData['lastname'] ?? '',
                'email' => $customerData['email'] ?? '',
                'phone' => $customerData['phone'] ?? '',
            ],
            'redirect' => [
                'success_url' => route('paysafecard.success'),
                'failure_url' => route('paysafecard.failure'),
            ]
        ];

        Log::info('PaysafeCard createPayment request', $payload);

        $response = Http::withHeaders([
            'Authorization' => 'Basic ' . base64_encode($this->accountNumber . ':' . $this->apiKey),
            'Content-Type' => 'application/json',
        ])->post($this->baseUrl . '/payments', $payload);

        Log::info('PaysafeCard createPayment response', [
            'status' => $response->status(),
            'body' => $response->body()
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        throw new \Exception('Failed to create PaysafeCard payment: ' . $response->body());
    }

    public function getPaymentStatus($paymentId)
    {
        if (!$this->isConfigured()) {
            throw new \Exception('PaysafeCard is not properly configured');
        }

        $response = Http::withHeaders([
            'Authorization' => 'Basic ' . base64_encode($this->accountNumber . ':' . $this->apiKey),
            'Content-Type' => 'application/json',
        ])->get($this->baseUrl . '/payments/' . $paymentId);

        Log::info('PaysafeCard getPaymentStatus response', [
            'payment_id' => $paymentId,
            'status' => $response->status(),
            'body' => $response->body()
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        throw new \Exception('Failed to get PaysafeCard payment status: ' . $response->body());
    }

    public function capturePayment($paymentId, $amount = null)
    {
        if (!$this->isConfigured()) {
            throw new \Exception('PaysafeCard is not properly configured');
        }

        $payload = [];
        if ($amount) {
            $payload['amount'] = $amount;
        }

        $response = Http::withHeaders([
            'Authorization' => 'Basic ' . base64_encode($this->accountNumber . ':' . $this->apiKey),
            'Content-Type' => 'application/json',
        ])->post($this->baseUrl . '/payments/' . $paymentId . '/capture', $payload);

        Log::info('PaysafeCard capturePayment response', [
            'payment_id' => $paymentId,
            'status' => $response->status(),
            'body' => $response->body()
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        throw new \Exception('Failed to capture PaysafeCard payment: ' . $response->body());
    }

    public function refundPayment($paymentId, $amount = null)
    {
        if (!$this->isConfigured()) {
            throw new \Exception('PaysafeCard is not properly configured');
        }

        $payload = [];
        if ($amount) {
            $payload['amount'] = $amount;
        }

        $response = Http::withHeaders([
            'Authorization' => 'Basic ' . base64_encode($this->accountNumber . ':' . $this->apiKey),
            'Content-Type' => 'application/json',
        ])->post($this->baseUrl . '/payments/' . $paymentId . '/refund', $payload);

        Log::info('PaysafeCard refundPayment response', [
            'payment_id' => $paymentId,
            'status' => $response->status(),
            'body' => $response->body()
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        throw new \Exception('Failed to refund PaysafeCard payment: ' . $response->body());
    }

    public function validateWebhook($payload, $signature)
    {
        // Implement webhook signature validation
        // This is a simplified version - you should implement proper signature validation
        return true;
    }

    public function isConfigured()
    {
        return !empty($this->accountNumber) && !empty($this->apiKey);
    }

    public function getAvailableCurrencies()
    {
        return [
            'EUR' => 'Euro',
            'USD' => 'US Dollar',
            'GBP' => 'British Pound',
            'CHF' => 'Swiss Franc',
            'PLN' => 'Polish Złoty',
            'CZK' => 'Czech Koruna',
            'HUF' => 'Hungarian Forint',
            'BGN' => 'Bulgarian Lev',
            'RON' => 'Romanian Leu',
            'HRK' => 'Croatian Kuna'
        ];
    }
} 