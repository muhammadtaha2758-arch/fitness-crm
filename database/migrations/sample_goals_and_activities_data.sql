-- =====================================================
-- Sample Goals and Activities Data
-- =====================================================
-- This file contains sample INSERT statements for
-- member goals and activity logs
-- =====================================================
-- IMPORTANT: Replace MEMBER_ID with actual member ID before running
-- =====================================================

SET @MEMBER_ID = 1; -- Change this to your member ID

-- =====================================================
-- PART 1: INSERT DEFAULT GOALS
-- =====================================================

-- Clear existing goals for this member (optional - comment out if you want to keep existing)
-- DELETE FROM goal_activities WHERE member_id = @MEMBER_ID;
-- DELETE FROM member_goals WHERE member_id = @MEMBER_ID;

-- Insert Goals for Member
INSERT INTO `member_goals` 
(`member_id`, `goal_type`, `goal_frequency`, `target_value`, `target_unit`, `target_description`, `is_active`, `start_date`, `current_streak`, `longest_streak`) 
VALUES
-- Basic Fitness Goals
(@MEMBER_ID, 'steps', 'DAILY', 10000, 'steps', '10,000 steps per day', 1, CURDATE(), 5, 12),
(@MEMBER_ID, 'cardio', 'WEEKLY', 3, 'sessions', '3 x per week / 20 min per day', 1, CURDATE(), 2, 4),
(@MEMBER_ID, 'strength', 'WEEKLY', 2, 'sessions', '2 x per week / 8 sets per day', 1, CURDATE(), 1, 3),

-- Additional Health Goals
(@MEMBER_ID, 'water', 'DAILY', 8, 'glasses', '8 glasses of water per day', 1, CURDATE(), 3, 7),
(@MEMBER_ID, 'sleep', 'DAILY', 7, 'hours', '7-8 hours of sleep per night', 1, CURDATE(), 4, 10),
(@MEMBER_ID, 'meditation', 'DAILY', 10, 'minutes', '10 minutes of meditation daily', 1, CURDATE(), 2, 5),

-- Weight Management Goals
(@MEMBER_ID, 'weight_loss', 'WEEKLY', 1, 'pounds', 'Lose 1 pound per week', 1, CURDATE(), 0, 2),
(@MEMBER_ID, 'calories', 'DAILY', 2000, 'calories', 'Maintain 2000 calories per day', 1, CURDATE(), 1, 3),

-- Activity Goals
(@MEMBER_ID, 'yoga', 'WEEKLY', 2, 'sessions', '2 yoga sessions per week', 1, CURDATE(), 1, 2),
(@MEMBER_ID, 'running', 'WEEKLY', 3, 'miles', 'Run 3 miles per week', 1, CURDATE(), 0, 1);

-- =====================================================
-- PART 2: INSERT ACTIVITY LOGS FOR STEPS (Last 14 days)
-- =====================================================

INSERT INTO `goal_activities` 
(`member_id`, `goal_type`, `activity_date`, `activity_value`, `activity_unit`, `is_completed`, `source`, `notes`) 
VALUES
-- Steps activities (last 14 days)
(@MEMBER_ID, 'steps', DATE_SUB(CURDATE(), INTERVAL 13 DAY), 8500, 'steps', 0, 'wearable', 'Busy day, missed target'),
(@MEMBER_ID, 'steps', DATE_SUB(CURDATE(), INTERVAL 12 DAY), 12000, 'steps', 1, 'wearable', 'Great walk in the park'),
(@MEMBER_ID, 'steps', DATE_SUB(CURDATE(), INTERVAL 11 DAY), 10500, 'steps', 1, 'wearable', NULL),
(@MEMBER_ID, 'steps', DATE_SUB(CURDATE(), INTERVAL 10 DAY), 9800, 'steps', 0, 'wearable', 'Almost there'),
(@MEMBER_ID, 'steps', DATE_SUB(CURDATE(), INTERVAL 9 DAY), 11200, 'steps', 1, 'wearable', NULL),
(@MEMBER_ID, 'steps', DATE_SUB(CURDATE(), INTERVAL 8 DAY), 13200, 'steps', 1, 'wearable', 'Long hike'),
(@MEMBER_ID, 'steps', DATE_SUB(CURDATE(), INTERVAL 7 DAY), 10100, 'steps', 1, 'wearable', NULL),
(@MEMBER_ID, 'steps', DATE_SUB(CURDATE(), INTERVAL 6 DAY), 9500, 'steps', 0, 'wearable', 'Rest day'),
(@MEMBER_ID, 'steps', DATE_SUB(CURDATE(), INTERVAL 5 DAY), 11800, 'steps', 1, 'wearable', NULL),
(@MEMBER_ID, 'steps', DATE_SUB(CURDATE(), INTERVAL 4 DAY), 10200, 'steps', 1, 'wearable', NULL),
(@MEMBER_ID, 'steps', DATE_SUB(CURDATE(), INTERVAL 3 DAY), 12500, 'steps', 1, 'wearable', 'Morning jog'),
(@MEMBER_ID, 'steps', DATE_SUB(CURDATE(), INTERVAL 2 DAY), 10800, 'steps', 1, 'wearable', NULL),
(@MEMBER_ID, 'steps', DATE_SUB(CURDATE(), INTERVAL 1 DAY), 9900, 'steps', 0, 'wearable', 'Close but not quite'),
(@MEMBER_ID, 'steps', CURDATE(), 11500, 'steps', 1, 'wearable', 'Today\'s activity');

-- =====================================================
-- PART 3: INSERT ACTIVITY LOGS FOR CARDIO (Last 4 weeks)
-- =====================================================

INSERT INTO `goal_activities` 
(`member_id`, `goal_type`, `activity_date`, `activity_value`, `activity_unit`, `is_completed`, `source`, `notes`) 
VALUES
-- Cardio activities (3 sessions per week target)
(@MEMBER_ID, 'cardio', DATE_SUB(CURDATE(), INTERVAL 20 DAY), 25, 'minutes', 1, 'calendar', 'Morning run'),
(@MEMBER_ID, 'cardio', DATE_SUB(CURDATE(), INTERVAL 18 DAY), 20, 'minutes', 1, 'calendar', 'Cycling'),
(@MEMBER_ID, 'cardio', DATE_SUB(CURDATE(), INTERVAL 16 DAY), 30, 'minutes', 1, 'calendar', 'Swimming'),
(@MEMBER_ID, 'cardio', DATE_SUB(CURDATE(), INTERVAL 13 DAY), 22, 'minutes', 1, 'calendar', 'Treadmill'),
(@MEMBER_ID, 'cardio', DATE_SUB(CURDATE(), INTERVAL 11 DAY), 20, 'minutes', 1, 'calendar', 'Elliptical'),
(@MEMBER_ID, 'cardio', DATE_SUB(CURDATE(), INTERVAL 9 DAY), 25, 'minutes', 1, 'calendar', 'Running'),
(@MEMBER_ID, 'cardio', DATE_SUB(CURDATE(), INTERVAL 6 DAY), 18, 'minutes', 1, 'calendar', 'Quick session'),
(@MEMBER_ID, 'cardio', DATE_SUB(CURDATE(), INTERVAL 4 DAY), 20, 'minutes', 1, 'calendar', 'Cycling'),
(@MEMBER_ID, 'cardio', DATE_SUB(CURDATE(), INTERVAL 2 DAY), 28, 'minutes', 1, 'calendar', 'Long run'),
(@MEMBER_ID, 'cardio', CURDATE(), 20, 'minutes', 1, 'calendar', 'Today\'s cardio');

-- =====================================================
-- PART 4: INSERT ACTIVITY LOGS FOR STRENGTH (Last 4 weeks)
-- =====================================================

INSERT INTO `goal_activities` 
(`member_id`, `goal_type`, `activity_date`, `activity_value`, `activity_unit`, `is_completed`, `source`, `notes`) 
VALUES
-- Strength activities (2 sessions per week, 8 sets per day)
(@MEMBER_ID, 'strength', DATE_SUB(CURDATE(), INTERVAL 19 DAY), 8, 'sets', 1, 'manual', 'Upper body workout'),
(@MEMBER_ID, 'strength', DATE_SUB(CURDATE(), INTERVAL 17 DAY), 8, 'sets', 1, 'manual', 'Lower body workout'),
(@MEMBER_ID, 'strength', DATE_SUB(CURDATE(), INTERVAL 12 DAY), 10, 'sets', 1, 'manual', 'Full body'),
(@MEMBER_ID, 'strength', DATE_SUB(CURDATE(), INTERVAL 10 DAY), 8, 'sets', 1, 'manual', 'Chest and back'),
(@MEMBER_ID, 'strength', DATE_SUB(CURDATE(), INTERVAL 5 DAY), 8, 'sets', 1, 'manual', 'Legs and core'),
(@MEMBER_ID, 'strength', DATE_SUB(CURDATE(), INTERVAL 3 DAY), 9, 'sets', 1, 'manual', 'Arms and shoulders'),
(@MEMBER_ID, 'strength', CURDATE(), 8, 'sets', 1, 'manual', 'Today\'s strength training');

-- =====================================================
-- PART 5: INSERT ACTIVITY LOGS FOR WATER (Last 7 days)
-- =====================================================

INSERT INTO `goal_activities` 
(`member_id`, `goal_type`, `activity_date`, `activity_value`, `activity_unit`, `is_completed`, `source`, `notes`) 
VALUES
-- Water intake (8 glasses per day)
(@MEMBER_ID, 'water', DATE_SUB(CURDATE(), INTERVAL 6 DAY), 7, 'glasses', 0, 'manual', 'Need to drink more'),
(@MEMBER_ID, 'water', DATE_SUB(CURDATE(), INTERVAL 5 DAY), 8, 'glasses', 1, 'manual', NULL),
(@MEMBER_ID, 'water', DATE_SUB(CURDATE(), INTERVAL 4 DAY), 9, 'glasses', 1, 'manual', 'Extra hydration'),
(@MEMBER_ID, 'water', DATE_SUB(CURDATE(), INTERVAL 3 DAY), 8, 'glasses', 1, 'manual', NULL),
(@MEMBER_ID, 'water', DATE_SUB(CURDATE(), INTERVAL 2 DAY), 6, 'glasses', 0, 'manual', 'Busy day'),
(@MEMBER_ID, 'water', DATE_SUB(CURDATE(), INTERVAL 1 DAY), 8, 'glasses', 1, 'manual', NULL),
(@MEMBER_ID, 'water', CURDATE(), 7, 'glasses', 0, 'manual', 'Still working on it');

-- =====================================================
-- PART 6: INSERT ACTIVITY LOGS FOR SLEEP (Last 7 days)
-- =====================================================

INSERT INTO `goal_activities` 
(`member_id`, `goal_type`, `activity_date`, `activity_value`, `activity_unit`, `is_completed`, `source`, `notes`) 
VALUES
-- Sleep (7-8 hours per night)
(@MEMBER_ID, 'sleep', DATE_SUB(CURDATE(), INTERVAL 6 DAY), 7.5, 'hours', 1, 'wearable', 'Good sleep'),
(@MEMBER_ID, 'sleep', DATE_SUB(CURDATE(), INTERVAL 5 DAY), 8, 'hours', 1, 'wearable', NULL),
(@MEMBER_ID, 'sleep', DATE_SUB(CURDATE(), INTERVAL 4 DAY), 6.5, 'hours', 0, 'wearable', 'Restless night'),
(@MEMBER_ID, 'sleep', DATE_SUB(CURDATE(), INTERVAL 3 DAY), 7.5, 'hours', 1, 'wearable', NULL),
(@MEMBER_ID, 'sleep', DATE_SUB(CURDATE(), INTERVAL 2 DAY), 8, 'hours', 1, 'wearable', 'Perfect sleep'),
(@MEMBER_ID, 'sleep', DATE_SUB(CURDATE(), INTERVAL 1 DAY), 7, 'hours', 1, 'wearable', NULL),
(@MEMBER_ID, 'sleep', CURDATE(), 7.5, 'hours', 1, 'wearable', 'Last night');

-- =====================================================
-- PART 7: INSERT ACTIVITY LOGS FOR MEDITATION (Last 7 days)
-- =====================================================

INSERT INTO `goal_activities` 
(`member_id`, `goal_type`, `activity_date`, `activity_value`, `activity_unit`, `is_completed`, `source`, `notes`) 
VALUES
-- Meditation (10 minutes daily)
(@MEMBER_ID, 'meditation', DATE_SUB(CURDATE(), INTERVAL 6 DAY), 10, 'minutes', 1, 'app', 'Morning meditation'),
(@MEMBER_ID, 'meditation', DATE_SUB(CURDATE(), INTERVAL 5 DAY), 15, 'minutes', 1, 'app', 'Extended session'),
(@MEMBER_ID, 'meditation', DATE_SUB(CURDATE(), INTERVAL 4 DAY), 0, 'minutes', 0, 'manual', 'Missed today'),
(@MEMBER_ID, 'meditation', DATE_SUB(CURDATE(), INTERVAL 3 DAY), 10, 'minutes', 1, 'app', NULL),
(@MEMBER_ID, 'meditation', DATE_SUB(CURDATE(), INTERVAL 2 DAY), 0, 'minutes', 0, 'manual', 'Forgot'),
(@MEMBER_ID, 'meditation', DATE_SUB(CURDATE(), INTERVAL 1 DAY), 12, 'minutes', 1, 'app', 'Evening session'),
(@MEMBER_ID, 'meditation', CURDATE(), 10, 'minutes', 1, 'app', 'Today\'s meditation');

-- =====================================================
-- PART 8: INSERT ACTIVITY LOGS FOR YOGA (Last 4 weeks)
-- =====================================================

INSERT INTO `goal_activities` 
(`member_id`, `goal_type`, `activity_date`, `activity_value`, `activity_unit`, `is_completed`, `source`, `notes`) 
VALUES
-- Yoga (2 sessions per week)
(@MEMBER_ID, 'yoga', DATE_SUB(CURDATE(), INTERVAL 21 DAY), 60, 'minutes', 1, 'calendar', 'Vinyasa flow'),
(@MEMBER_ID, 'yoga', DATE_SUB(CURDATE(), INTERVAL 18 DAY), 45, 'minutes', 1, 'calendar', 'Yin yoga'),
(@MEMBER_ID, 'yoga', DATE_SUB(CURDATE(), INTERVAL 14 DAY), 60, 'minutes', 1, 'calendar', 'Power yoga'),
(@MEMBER_ID, 'yoga', DATE_SUB(CURDATE(), INTERVAL 11 DAY), 30, 'minutes', 1, 'calendar', 'Quick session'),
(@MEMBER_ID, 'yoga', DATE_SUB(CURDATE(), INTERVAL 7 DAY), 60, 'minutes', 1, 'calendar', 'Hatha yoga'),
(@MEMBER_ID, 'yoga', DATE_SUB(CURDATE(), INTERVAL 4 DAY), 45, 'minutes', 1, 'calendar', 'Restorative'),
(@MEMBER_ID, 'yoga', CURDATE(), 60, 'minutes', 1, 'calendar', 'Today\'s yoga class');

-- =====================================================
-- PART 9: INSERT ACTIVITY LOGS FOR RUNNING (Last 4 weeks)
-- =====================================================

INSERT INTO `goal_activities` 
(`member_id`, `goal_type`, `activity_date`, `activity_value`, `activity_unit`, `is_completed`, `source`, `notes`) 
VALUES
-- Running (3 miles per week)
(@MEMBER_ID, 'running', DATE_SUB(CURDATE(), INTERVAL 20 DAY), 1.5, 'miles', 1, 'app', 'Morning run'),
(@MEMBER_ID, 'running', DATE_SUB(CURDATE(), INTERVAL 17 DAY), 1.5, 'miles', 1, 'app', 'Evening run'),
(@MEMBER_ID, 'running', DATE_SUB(CURDATE(), INTERVAL 13 DAY), 2, 'miles', 1, 'app', 'Longer run'),
(@MEMBER_ID, 'running', DATE_SUB(CURDATE(), INTERVAL 10 DAY), 1, 'miles', 1, 'app', 'Quick run'),
(@MEMBER_ID, 'running', DATE_SUB(CURDATE(), INTERVAL 6 DAY), 1.5, 'miles', 1, 'app', 'Trail run'),
(@MEMBER_ID, 'running', DATE_SUB(CURDATE(), INTERVAL 3 DAY), 2, 'miles', 1, 'app', 'Park run'),
(@MEMBER_ID, 'running', CURDATE(), 1.5, 'miles', 1, 'app', 'Today\'s run');

-- =====================================================
-- PART 10: UPDATE STREAKS BASED ON ACTIVITIES
-- =====================================================

-- Update steps streak (consecutive days with 10000+ steps)
UPDATE member_goals 
SET current_streak = (
    SELECT COUNT(*) 
    FROM (
        SELECT activity_date 
        FROM goal_activities 
        WHERE member_id = @MEMBER_ID 
          AND goal_type = 'steps' 
          AND is_completed = 1 
          AND activity_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        ORDER BY activity_date DESC
        LIMIT 5
    ) as recent_completed
),
longest_streak = GREATEST(longest_streak, (
    SELECT COUNT(*) 
    FROM (
        SELECT activity_date 
        FROM goal_activities 
        WHERE member_id = @MEMBER_ID 
          AND goal_type = 'steps' 
          AND is_completed = 1 
          AND activity_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        ORDER BY activity_date DESC
        LIMIT 12
    ) as longest_completed
))
WHERE member_id = @MEMBER_ID AND goal_type = 'steps';

-- Update cardio streak (consecutive weeks with 3+ sessions)
UPDATE member_goals 
SET current_streak = (
    SELECT COUNT(DISTINCT WEEK(activity_date)) 
    FROM goal_activities 
    WHERE member_id = @MEMBER_ID 
      AND goal_type = 'cardio' 
      AND is_completed = 1 
      AND activity_date >= DATE_SUB(CURDATE(), INTERVAL 8 WEEK)
    HAVING COUNT(*) >= 3
),
longest_streak = GREATEST(longest_streak, 4)
WHERE member_id = @MEMBER_ID AND goal_type = 'cardio';

-- Update strength streak
UPDATE member_goals 
SET current_streak = (
    SELECT COUNT(DISTINCT WEEK(activity_date)) 
    FROM goal_activities 
    WHERE member_id = @MEMBER_ID 
      AND goal_type = 'strength' 
      AND is_completed = 1 
      AND activity_date >= DATE_SUB(CURDATE(), INTERVAL 8 WEEK)
    HAVING COUNT(*) >= 2
),
longest_streak = GREATEST(longest_streak, 3)
WHERE member_id = @MEMBER_ID AND goal_type = 'strength';

-- Update water streak
UPDATE member_goals 
SET current_streak = (
    SELECT COUNT(*) 
    FROM goal_activities 
    WHERE member_id = @MEMBER_ID 
      AND goal_type = 'water' 
      AND is_completed = 1 
      AND activity_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
),
longest_streak = GREATEST(longest_streak, 7)
WHERE member_id = @MEMBER_ID AND goal_type = 'water';

-- Update sleep streak
UPDATE member_goals 
SET current_streak = (
    SELECT COUNT(*) 
    FROM goal_activities 
    WHERE member_id = @MEMBER_ID 
      AND goal_type = 'sleep' 
      AND is_completed = 1 
      AND activity_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
),
longest_streak = GREATEST(longest_streak, 10)
WHERE member_id = @MEMBER_ID AND goal_type = 'sleep';

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- View all goals for the member
-- SELECT * FROM member_goals WHERE member_id = @MEMBER_ID;

-- View all activities for the member
-- SELECT goal_type, activity_date, activity_value, is_completed 
-- FROM goal_activities 
-- WHERE member_id = @MEMBER_ID 
-- ORDER BY activity_date DESC, goal_type;

-- View progress summary
-- SELECT 
--     mg.goal_type,
--     mg.target_description,
--     mg.current_streak,
--     mg.longest_streak,
--     COUNT(ga.id) as total_activities,
--     SUM(CASE WHEN ga.is_completed = 1 THEN 1 ELSE 0 END) as completed_activities
-- FROM member_goals mg
-- LEFT JOIN goal_activities ga ON mg.member_id = ga.member_id AND mg.goal_type = ga.goal_type
-- WHERE mg.member_id = @MEMBER_ID
-- GROUP BY mg.id, mg.goal_type, mg.target_description, mg.current_streak, mg.longest_streak;

