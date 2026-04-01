# Member Goals Database Setup Guide

## Overview
This guide explains the database structure needed to support the Goals feature (Steps, Cardio, Strength) in the mobile app.

## Tables Required

### 1. `member_goals` Table
Stores goal configurations for each member.

**Key Columns:**
- `member_id` - Links to members table
- `goal_type` - Type of goal: 'steps', 'cardio', 'strength'
- `goal_frequency` - 'DAILY' or 'WEEKLY'
- `target_value` - Target number (e.g., 10000 for steps)
- `target_description` - Human-readable description
- `current_streak` - Current consecutive days/weeks
- `longest_streak` - Longest streak achieved
- `is_active` - Whether goal is currently active

### 2. `goal_activities` Table
Stores daily/weekly activity logs for tracking progress.

**Key Columns:**
- `member_id` - Links to members table
- `goal_type` - Type of goal
- `activity_date` - Date of the activity
- `activity_value` - Value achieved (steps, minutes, sets)
- `is_completed` - Whether goal was met
- `source` - How activity was logged (manual, calendar, wearable, app)

## Installation

### Option 1: Using Laravel Migration (Recommended)
```bash
cd crm_frontend_backend
php artisan migrate
```

### Option 2: Using SQL File Directly
```bash
mysql -u your_username -p your_database_name < database/migrations/create_member_goals_tables.sql
```

## Sample Data

### Quick Start - Insert Default Goals
```sql
-- Replace MEMBER_ID with actual member ID
INSERT INTO `member_goals` 
(`member_id`, `goal_type`, `goal_frequency`, `target_value`, `target_unit`, `target_description`, `is_active`, `start_date`) 
VALUES
(1, 'steps', 'DAILY', 10000, 'steps', '10,000 steps per day', 1, CURDATE()),
(1, 'cardio', 'WEEKLY', 3, 'sessions', '3 x per week / 20 min per day', 1, CURDATE()),
(1, 'strength', 'WEEKLY', 2, 'sessions', '2 x per week / 8 sets per day', 1, CURDATE());
```

### Comprehensive Sample Data
For extensive sample data with multiple goals and activity logs, see:
- `sample_goals_and_activities_data.sql` - Contains 10+ goal types and weeks of activity data

### Quick Activity Log Examples
```sql
-- Log steps activity
INSERT INTO `goal_activities` 
(`member_id`, `goal_type`, `activity_date`, `activity_value`, `activity_unit`, `is_completed`, `source`) 
VALUES
(1, 'steps', CURDATE(), 12500, 'steps', 1, 'manual');

-- Log cardio activity
INSERT INTO `goal_activities` 
(`member_id`, `goal_type`, `activity_date`, `activity_value`, `activity_unit`, `is_completed`, `source`) 
VALUES
(1, 'cardio', CURDATE(), 25, 'minutes', 1, 'calendar');
```

## Common Queries

### Get All Active Goals for a Member
```sql
SELECT * FROM member_goals 
WHERE member_id = 1 AND is_active = 1;
```

### Get Activity Count for Current Week (Cardio/Strength)
```sql
SELECT COUNT(*) as completed_sessions
FROM goal_activities 
WHERE member_id = 1 
  AND goal_type = 'cardio' 
  AND activity_date >= DATE_SUB(CURDATE(), INTERVAL DAYOFWEEK(CURDATE())-1 DAY)
  AND is_completed = 1;
```

### Get Activities for a Specific Month
```sql
SELECT * FROM goal_activities 
WHERE member_id = 1 
  AND goal_type = 'steps' 
  AND YEAR(activity_date) = 2025 
  AND MONTH(activity_date) = 12
ORDER BY activity_date DESC;
```

### Calculate Progress Percentage (Weekly Goals)
```sql
SELECT 
  mg.goal_type,
  mg.target_value,
  COUNT(ga.id) as completed_count,
  ROUND((COUNT(ga.id) / mg.target_value) * 100, 0) as progress_percentage
FROM member_goals mg
LEFT JOIN goal_activities ga ON 
  mg.member_id = ga.member_id 
  AND mg.goal_type = ga.goal_type 
  AND ga.activity_date >= DATE_SUB(CURDATE(), INTERVAL DAYOFWEEK(CURDATE())-1 DAY)
  AND ga.is_completed = 1
WHERE mg.member_id = 1 
  AND mg.goal_type = 'cardio'
  AND mg.is_active = 1
GROUP BY mg.id;
```

### Update Streak
```sql
-- Update current streak when activity is logged
UPDATE member_goals 
SET current_streak = current_streak + 1,
    longest_streak = GREATEST(longest_streak, current_streak + 1),
    last_activity_date = CURDATE()
WHERE member_id = 1 
  AND goal_type = 'steps'
  AND (last_activity_date IS NULL OR last_activity_date = DATE_SUB(CURDATE(), INTERVAL 1 DAY));
```

## Goal Types Reference

| Goal Type | Frequency | Target Example | Unit | Description |
|-----------|-----------|----------------|------|-------------|
| steps | DAILY | 10000 | steps | Daily step count goal |
| cardio | WEEKLY | 3 | sessions | Cardio sessions per week (20 min each) |
| strength | WEEKLY | 2 | sessions | Strength training sessions per week (8 sets each) |
| water | DAILY | 8 | glasses | Daily water intake in glasses |
| sleep | DAILY | 7 | hours | Daily sleep hours (7-8 hours) |
| meditation | DAILY | 10 | minutes | Daily meditation time |
| weight_loss | WEEKLY | 1 | pounds | Weekly weight loss target |
| calories | DAILY | 2000 | calories | Daily calorie intake goal |
| yoga | WEEKLY | 2 | sessions | Yoga sessions per week |
| running | WEEKLY | 3 | miles | Weekly running distance |

## Notes

- **Foreign Keys**: Both tables have foreign key constraints that cascade delete when a member is deleted
- **Unique Constraints**: 
  - One goal type per member in `member_goals`
  - One activity per goal type per date in `goal_activities`
- **Indexes**: Added for performance on common query patterns
- **Soft Deletes**: Not implemented, but can be added if needed

## Backend Integration

After creating these tables, you'll need to:
1. Create Eloquent models (`MemberGoal`, `GoalActivity`)
2. Create API endpoints to:
   - Get member goals
   - Create/update goals
   - Log activities
   - Get activity history
   - Calculate streaks and progress
3. Update `MemberController` to include goals data in member details

