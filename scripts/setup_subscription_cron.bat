@echo off
REM Setup Task Scheduler for Laravel Scheduler (Windows)
REM This script creates a Windows Task Scheduler entry to run Laravel scheduler

echo ==========================================
echo Laravel Scheduler Setup (Windows)
echo ==========================================
echo.

REM Get the project path
set PROJECT_PATH=%~dp0..
cd /d "%PROJECT_PATH%"
set PROJECT_PATH=%CD%

echo Project path: %PROJECT_PATH%
echo.

REM Check if task already exists
schtasks /query /tn "Laravel Scheduler" >nul 2>&1
if %errorlevel% == 0 (
    echo Warning: Task "Laravel Scheduler" already exists!
    echo.
    echo Current task:
    schtasks /query /tn "Laravel Scheduler" /fo list
    echo.
    set /p OVERWRITE="Do you want to overwrite it? (y/n): "
    if /i not "%OVERWRITE%"=="y" (
        echo Setup cancelled.
        exit /b 0
    )
    echo Deleting existing task...
    schtasks /delete /tn "Laravel Scheduler" /f >nul 2>&1
)

REM Find PHP executable
where php >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: PHP not found in PATH!
    echo Please add PHP to your system PATH or update this script with full PHP path.
    echo Example: set PHP_PATH=C:\xampp\php\php.exe
    pause
    exit /b 1
)

for /f "delims=" %%i in ('where php') do set PHP_PATH=%%i
echo PHP found at: %PHP_PATH%
echo.

REM Create scheduled task
echo Creating scheduled task...
schtasks /create /tn "Laravel Scheduler" /tr "\"%PHP_PATH%\" \"%PROJECT_PATH%\artisan\" schedule:run" /sc minute /mo 1 /ru SYSTEM /f >nul 2>&1

if %errorlevel% == 0 (
    echo.
    echo Success: Task "Laravel Scheduler" created!
    echo.
    echo The scheduler will run every minute and execute scheduled tasks:
    echo   - Daily at 9:00 AM: Check expiring subscriptions (7 days)
    echo   - Daily at 10:00 AM: Check expired subscriptions
    echo.
    echo To verify, run: schtasks /query /tn "Laravel Scheduler"
    echo To test manually, run: cd "%PROJECT_PATH%" ^&^& php artisan schedule:run
    echo.
) else (
    echo.
    echo Error: Failed to create scheduled task!
    echo You may need to run this script as Administrator.
    echo.
)

pause


