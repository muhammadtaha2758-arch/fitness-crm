<?php

namespace App\Console;

use Illuminate\Support\Facades\Cookie;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Http\Controllers\BaseController;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
        'App\Console\Commands\DatabaseBackUp',
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
       
        $schedule->command('database:backup');

        // Check expiring subscriptions daily at 9 AM
        $schedule->command('subscriptions:check-expiring --days=7')
            ->dailyAt('09:00')
            ->withoutOverlapping();
        
        // Check expired subscriptions daily at 10 AM
        $schedule->command('subscriptions:check-expiring --expired')
            ->dailyAt('10:00')
            ->withoutOverlapping();

                    // Generate monthly invoices daily (only creates invoices when next_billing_date <= today)
        $schedule->command('invoices:generate-monthly')
        ->daily()
        ->at('02:00')
        ->withoutOverlapping()
        ->runInBackground()
        ->onFailure(function () {
            \Log::error('Monthly invoice generation job failed');
        });
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}