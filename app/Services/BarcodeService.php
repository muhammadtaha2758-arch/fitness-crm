<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Food;

class BarcodeService
{
    /**
     * Fetch nutrition data from barcode using OpenFoodFacts API
     * 
     * @param string $barcode The barcode/UPC/EAN code
     * @return array
     */
    public function fetchFromBarcode($barcode)
    {
        try {
            // Clean barcode (remove spaces, dashes)
            $barcode = preg_replace('/[^0-9]/', '', $barcode);
            
            if (empty($barcode)) {
                return [
                    'success' => false,
                    'message' => 'Invalid barcode format'
                ];
            }
            
            // Try OpenFoodFacts API
            $response = Http::timeout(10)->get("https://world.openfoodfacts.org/api/v0/product/{$barcode}.json");
            
            if ($response->successful() && $response->json('status') === 1) {
                $product = $response->json('product');
                
                // Extract nutrition data (per 100g)
                $nutriments = $product['nutriments'] ?? [];
                
                return [
                    'success' => true,
                    'name' => $product['product_name'] ?? $product['product_name_en'] ?? $product['product_name_fr'] ?? 'Unknown Product',
                    'description' => $product['generic_name'] ?? $product['generic_name_en'] ?? null,
                    'serving_description' => $product['serving_size'] ?? '100g',
                    'calories' => $nutriments['energy-kcal_100g'] ?? $nutriments['energy-kcal'] ?? 0,
                    'protein' => $nutriments['proteins_100g'] ?? $nutriments['proteins'] ?? 0,
                    'carbohydrate' => $nutriments['carbohydrates_100g'] ?? $nutriments['carbohydrates'] ?? 0,
                    'fat' => $nutriments['fat_100g'] ?? $nutriments['fat'] ?? 0,
                    'saturated_fat' => $nutriments['saturated-fat_100g'] ?? $nutriments['saturated-fat'] ?? 0,
                    'fiber' => $nutriments['fiber_100g'] ?? $nutriments['fiber'] ?? 0,
                    'sugar' => $nutriments['sugars_100g'] ?? $nutriments['sugars'] ?? 0,
                    'sodium' => $nutriments['sodium_100g'] ?? $nutriments['sodium'] ?? 0,
                    'cholesterol' => $nutriments['cholesterol_100g'] ?? $nutriments['cholesterol'] ?? 0,
                    'image_url' => $product['image_url'] ?? $product['image_front_url'] ?? null,
                    'brand' => $product['brands'] ?? null,
                    'barcode' => $barcode,
                ];
            }
            
            // If OpenFoodFacts doesn't have it, try UPCitemdb as fallback
            return $this->fetchFromUPCitemdb($barcode);
            
        } catch (\Exception $e) {
            Log::error('BarcodeService: Error fetching from barcode', [
                'barcode' => $barcode,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return [
                'success' => false,
                'message' => 'Error fetching product data: ' . $e->getMessage()
            ];
        }
    }
    
    /**
     * Fallback: Fetch from UPCitemdb API
     */
    private function fetchFromUPCitemdb($barcode)
    {
        try {
            $response = Http::timeout(10)->get("https://api.upcitemdb.com/prod/trial/lookup", [
                'upc' => $barcode
            ]);
            
            if ($response->successful()) {
                $data = $response->json();
                
                if (isset($data['items']) && count($data['items']) > 0) {
                    $item = $data['items'][0];
                    
                    return [
                        'success' => true,
                        'name' => $item['title'] ?? 'Unknown Product',
                        'description' => $item['description'] ?? null,
                        'serving_description' => '1 item',
                        'calories' => 0, // UPCitemdb doesn't provide nutrition data
                        'protein' => 0,
                        'carbohydrate' => 0,
                        'fat' => 0,
                        'image_url' => $item['images'][0] ?? null,
                        'brand' => $item['brand'] ?? null,
                        'barcode' => $barcode,
                        'note' => 'Nutrition data not available from this source'
                    ];
                }
            }
            
            return [
                'success' => false,
                'message' => 'Product not found in any database'
            ];
            
        } catch (\Exception $e) {
            Log::error('BarcodeService: Error fetching from UPCitemdb', [
                'barcode' => $barcode,
                'error' => $e->getMessage()
            ]);
            
            return [
                'success' => false,
                'message' => 'Product not found'
            ];
        }
    }
    
    /**
     * Create or find food from barcode
     * 
     * @param string $barcode
     * @return array
     */
    public function createFoodFromBarcode($barcode)
    {
        $data = $this->fetchFromBarcode($barcode);
        
        if (!$data['success']) {
            return $data;
        }
        
        // Check if food already exists by barcode (stored in food_id or name)
        $food = Food::where('food_id', $barcode)
            ->orWhere(function($query) use ($barcode, $data) {
                $query->where('name', $data['name'])
                      ->whereNotNull('food_id');
            })
            ->first();
        
        if ($food) {
            return [
                'success' => true,
                'food' => $food,
                'from_cache' => true,
                'message' => 'Food already exists in database'
            ];
        }
        
        // Create new food
        try {
            $food = Food::create([
                'food_id' => $barcode,
                'name' => $data['name'],
                'description' => $data['description'] ?? null,
                'serving_description' => $data['serving_description'] ?? '100g',
                'calories' => $data['calories'] ?? 0,
                'protein' => $data['protein'] ?? 0,
                'carbohydrate' => $data['carbohydrate'] ?? 0,
                'fat' => $data['fat'] ?? 0,
                'saturated_fat' => $data['saturated_fat'] ?? 0,
                'fiber' => $data['fiber'] ?? 0,
                'sugar' => $data['sugar'] ?? 0,
                'sodium' => $data['sodium'] ?? 0,
                'cholesterol' => $data['cholesterol'] ?? 0,
                'fatsecret_url' => $data['image_url'] ?? null,
                'food_type' => $this->determineFoodType($data['name'] ?? ''),
            ]);
            
            return [
                'success' => true,
                'food' => $food,
                'from_cache' => false,
                'message' => 'Food created successfully'
            ];
            
        } catch (\Exception $e) {
            Log::error('BarcodeService: Error creating food from barcode', [
                'barcode' => $barcode,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return [
                'success' => false,
                'message' => 'Error creating food: ' . $e->getMessage()
            ];
        }
    }
    
    /**
     * Determine food type from name (simple keyword matching)
     */
    private function determineFoodType($name)
    {
        $name = strtolower($name);
        
        $types = [
            'Fruit' => ['apple', 'banana', 'orange', 'berry', 'grape', 'mango', 'pineapple'],
            'Vegetable' => ['broccoli', 'carrot', 'spinach', 'lettuce', 'tomato', 'cucumber'],
            'Protein' => ['chicken', 'beef', 'fish', 'pork', 'turkey', 'egg', 'tofu'],
            'Dairy' => ['milk', 'cheese', 'yogurt', 'butter', 'cream'],
            'Grain' => ['rice', 'bread', 'pasta', 'wheat', 'oats', 'quinoa'],
            'Snack' => ['chip', 'cracker', 'cookie', 'candy', 'chocolate'],
            'Beverage' => ['juice', 'soda', 'water', 'coffee', 'tea', 'drink'],
        ];
        
        foreach ($types as $type => $keywords) {
            foreach ($keywords as $keyword) {
                if (strpos($name, $keyword) !== false) {
                    return $type;
                }
            }
        }
        
        return 'Other';
    }
}

