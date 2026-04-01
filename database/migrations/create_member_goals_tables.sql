-- =====================================================
-- Member Goals Database Tables
-- =====================================================
-- This file contains SQL queries to create tables for
-- tracking member fitness goals (Steps, Cardio, Strength)
-- =====================================================

-- Table 1: member_goals
-- Stores goal configurations for each member
-- =====================================================
CREATE TABLE IF NOT EXISTS `member_goals` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `member_id` BIGINT UNSIGNED NOT NULL,
  `goal_type` VARCHAR(50) NOT NULL COMMENT 'steps, cardio, strength',
  `goal_frequency` VARCHAR(20) NOT NULL DEFAULT 'DAILY' COMMENT 'DAILY, WEEKLY',
  `target_value` DECIMAL(10, 2) DEFAULT NULL COMMENT 'Target number (e.g., 10000 for steps)',
  `target_unit` VARCHAR(50) DEFAULT NULL COMMENT 'steps, minutes, sets, etc.',
  `target_description` VARCHAR(255) DEFAULT NULL COMMENT 'e.g., "10,000 steps per day", "3 x 20 mins"',
  `is_active` TINYINT(1) DEFAULT 1 COMMENT 'Whether this goal is currently active',
  `start_date` DATE DEFAULT NULL COMMENT 'When the goal was started',
  `end_date` DATE DEFAULT NULL COMMENT 'When the goal ends (optional)',
  `current_streak` INT UNSIGNED DEFAULT 0 COMMENT 'Current consecutive days/weeks',
  `longest_streak` INT UNSIGNED DEFAULT 0 COMMENT 'Longest streak achieved',
  `last_activity_date` DATE DEFAULT NULL COMMENT 'Last date activity was logged',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_member_goal` (`member_id`, `goal_type`),
  KEY `idx_member_id` (`member_id`),
  KEY `idx_goal_type` (`goal_type`),
  KEY `idx_is_active` (`is_active`),
  CONSTRAINT `fk_member_goals_member` FOREIGN KEY (`member_id`) 
    REFERENCES `members` (`id`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table 2: goal_activities
-- Stores daily/weekly activity logs for each goal
-- =====================================================
CREATE TABLE IF NOT EXISTS `goal_activities` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `member_id` BIGINT UNSIGNED NOT NULL,
  `goal_type` VARCHAR(50) NOT NULL COMMENT 'steps, cardio, strength',
  `activity_date` DATE NOT NULL COMMENT 'Date of the activity',
  `activity_value` DECIMAL(10, 2) DEFAULT NULL COMMENT 'Value achieved (steps, minutes, sets, etc.)',
  `activity_unit` VARCHAR(50) DEFAULT NULL COMMENT 'steps, minutes, sets, etc.',
  `is_completed` TINYINT(1) DEFAULT 0 COMMENT 'Whether goal was met for this day/week',
  `notes` TEXT DEFAULT NULL COMMENT 'Optional notes about the activity',
  `source` VARCHAR(50) DEFAULT 'manual' COMMENT 'manual, calendar, wearable, app',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_member_goal_date` (`member_id`, `goal_type`, `activity_date`),
  KEY `idx_member_id` (`member_id`),
  KEY `idx_goal_type` (`goal_type`),
  KEY `idx_activity_date` (`activity_date`),
  KEY `idx_is_completed` (`is_completed`),
  CONSTRAINT `fk_goal_activities_member` FOREIGN KEY (`member_id`) 
    REFERENCES `members` (`id`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Sample Data Insertion (Optional)
-- =====================================================
-- Uncomment and modify these to add default goals for existing members

/*
-- Insert default goals for a member (replace MEMBER_ID with actual member ID)
INSERT INTO `member_goals` (`member_id`, `goal_type`, `goal_frequency`, `target_value`, `target_unit`, `target_description`, `is_active`, `start_date`) VALUES
(MEMBER_ID, 'steps', 'DAILY', 10000, 'steps', '10,000 steps per day', 1, CURDATE()),
(MEMBER_ID, 'cardio', 'WEEKLY', 3, 'sessions', '3 x per week / 20 min per day', 1, CURDATE()),
(MEMBER_ID, 'strength', 'WEEKLY', 2, 'sessions', '2 x per week / 8 sets per day', 1, CURDATE());
*/

-- =====================================================
-- Indexes for Performance Optimization
-- =====================================================
-- Additional indexes are already created above, but you can add these if needed:

-- For querying active goals by member
-- CREATE INDEX idx_member_active_goals ON member_goals(member_id, is_active);

-- For querying activities in date range
-- CREATE INDEX idx_activities_date_range ON goal_activities(member_id, goal_type, activity_date);

-- =====================================================
-- Useful Queries for Reference
-- =====================================================

-- Get all active goals for a member:
-- SELECT * FROM member_goals WHERE member_id = ? AND is_active = 1;

-- Get activity count for a goal in current week:
-- SELECT COUNT(*) FROM goal_activities 
-- WHERE member_id = ? AND goal_type = 'cardio' 
-- AND activity_date >= DATE_SUB(CURDATE(), INTERVAL DAYOFWEEK(CURDATE())-1 DAY)
-- AND is_completed = 1;

-- Get current streak for a goal:
-- SELECT current_streak FROM member_goals 
-- WHERE member_id = ? AND goal_type = ?;

-- Get all activities for a goal in a month:
-- SELECT * FROM goal_activities 
-- WHERE member_id = ? AND goal_type = ? 
-- AND YEAR(activity_date) = ? AND MONTH(activity_date) = ?
-- ORDER BY activity_date DESC;