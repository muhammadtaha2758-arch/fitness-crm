#!/bin/bash

# Setup Cron Job for Laravel Scheduler
# This script helps set up the Laravel scheduler to run automatically

echo "=========================================="
echo "Laravel Scheduler Setup"
echo "=========================================="
echo ""

# Get the project path (adjust if needed)
PROJECT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
echo "Project path: $PROJECT_PATH"
echo ""

# Check if crontab entry already exists
if crontab -l 2>/dev/null | grep -q "schedule:run"; then
    echo "⚠️  Cron job already exists!"
    echo ""
    echo "Current crontab entries:"
    crontab -l | grep "schedule:run"
    echo ""
    read -p "Do you want to add another entry? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 0
    fi
fi

# Add cron job
CRON_ENTRY="* * * * * cd $PROJECT_PATH && php artisan schedule:run >> /dev/null 2>&1"

echo "Adding cron job..."
(crontab -l 2>/dev/null; echo "$CRON_ENTRY") | crontab -

echo ""
echo "✅ Cron job added successfully!"
echo ""
echo "The scheduler will run every minute and execute scheduled tasks:"
echo "  - Daily at 9:00 AM: Check expiring subscriptions (7 days)"
echo "  - Daily at 10:00 AM: Check expired subscriptions"
echo ""
echo "To verify, run: crontab -l"
echo "To test manually, run: cd $PROJECT_PATH && php artisan schedule:run"
echo ""


