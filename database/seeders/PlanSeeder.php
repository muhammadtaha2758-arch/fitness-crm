<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Starter',
                'stripe_price_id' => 'price_starter_monthly',
                'price' => 19.99,
                'interval' => 'monthly',
                'features' => json_encode(['Access to basic workout plans', 'Nutrition tracking basics', 'Progress photos up to 10', 'Community support']),
                'is_active' => 1,
                'sort_order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pro',
                'stripe_price_id' => 'price_pro_monthly',
                'price' => 39.99,
                'interval' => 'monthly',
                'features' => json_encode(['Everything in Starter', 'Personal trainer consultation', 'Custom meal plans', 'Advanced workout programs']),
                'is_active' => 1,
                'sort_order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Elite',
                'stripe_price_id' => 'price_elite_monthly',
                'price' => 79.99,
                'interval' => 'monthly',
                'features' => json_encode(['Everything in Pro', '1-on-1 personal training', 'Custom supplement recommendations']),
                'is_active' => 1,
                'sort_order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'VIP',
                'stripe_price_id' => 'price_vip_monthly',
                'price' => 149.99,
                'interval' => 'monthly',
                'features' => json_encode(['Everything in Elite', 'Unlimited 1-on-1 training', 'Personal nutritionist consultation']),
                'is_active' => 1,
                'sort_order' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Starter Annual',
                'stripe_price_id' => 'price_starter_yearly',
                'price' => 199.99,
                'interval' => 'yearly',
                'features' => json_encode(['Access to basic workout plans', 'Nutrition tracking basics', 'Progress photos up to 10', 'Community support', 'Save 17% with annual billing', '2 months free']),
                'is_active' => 1,
                'sort_order' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pro Annual',
                'stripe_price_id' => 'price_pro_yearly',
                'price' => 399.99,
                'interval' => 'yearly',
                'features' => json_encode(['Everything in Starter Annual', 'Personal trainer consultation', 'Custom meal plans', 'Advanced workout programs', 'Progress photos unlimited', 'Save 17% with annual billing', '2 months free']),
                'is_active' => 1,
                'sort_order' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Elite Annual',
                'stripe_price_id' => 'price_elite_yearly',
                'price' => 799.99,
                'interval' => 'yearly',
                'features' => json_encode(['Everything in Pro Annual', '1-on-1 personal training (24 sessions)', 'Custom supplement recommendations', 'Weekly check-ins with trainer', '24/7 priority support', 'Save 17% with annual billing', '2 months free']),
                'is_active' => 1,
                'sort_order' => 7,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'VIP Annual',
                'stripe_price_id' => 'price_vip_yearly',
                'price' => 1499.99,
                'interval' => 'yearly',
                'features' => json_encode(['Everything in Elite Annual', 'Unlimited 1-on-1 training', 'Personal nutritionist consultation', 'Custom supplement stack', 'Daily check-ins', 'Dedicated account manager', 'Exclusive VIP events', 'Save 17% with annual billing', '2 months free']),
                'is_active' => 1,
                'sort_order' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('member_plans')->insert($plans);
    }
}
