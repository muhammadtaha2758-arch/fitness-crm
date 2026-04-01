<?php

namespace Database\Seeders;

use App\Models\GymPlan;
use Illuminate\Database\Seeder;

class GymPlanSeeder extends Seeder
{
    /**
     * Seed the gym_plans table with 6 default subscription packages for new gym owners.
     * Plans will only appear on signup (GET /api/gym/plans) after stripe_price_id is set in Stripe Dashboard.
     */
    public function run(): void
    {
        $defaults = [
            [
                'name' => 'Basic Plan',
                'price' => 99.99,
                'interval' => 'monthly',
                'features' => ['Core CRM features', 'Member management', 'Basic reporting'],
                'sort_order' => 1,
            ],
            [
                'name' => 'Starter',
                'price' => 49.99,
                'interval' => 'monthly',
                'features' => ['Essential tools', 'Up to 50 members', 'Email support'],
                'sort_order' => 2,
            ],
            [
                'name' => 'Growth',
                'price' => 149.99,
                'interval' => 'monthly',
                'features' => ['Everything in Basic', 'Up to 200 members', 'Workouts & nutrition', 'Priority support'],
                'sort_order' => 3,
            ],
            [
                'name' => 'Pro',
                'price' => 249.99,
                'interval' => 'monthly',
                'features' => ['Everything in Growth', 'Unlimited members', 'Custom branding', 'API access'],
                'sort_order' => 4,
            ],
            [
                'name' => 'Business',
                'price' => 399.99,
                'interval' => 'monthly',
                'features' => ['Everything in Pro', 'Multi-location', 'Dedicated account manager', 'Advanced analytics'],
                'sort_order' => 5,
            ],
            [
                'name' => 'Enterprise',
                'price' => 599.99,
                'interval' => 'monthly',
                'features' => ['Everything in Business', 'Custom integrations', 'SLA guarantee', 'Onboarding & training'],
                'sort_order' => 6,
            ],
        ];

        foreach ($defaults as $data) {
            GymPlan::updateOrCreate(
                ['name' => $data['name']],
                [
                    'stripe_price_id' => null, // Set in Stripe Dashboard and update here so plan appears on signup
                    'price' => $data['price'],
                    'interval' => $data['interval'],
                    'features' => $data['features'],
                    'is_active' => true,
                    'sort_order' => $data['sort_order'],
                    'membership_data' => null,
                ]
            );
        }

        $this->command->info('Gym plans seeded: 6 default packages (stripe_price_id left null – add in Stripe and update records for signup checkout).');
    }
}
