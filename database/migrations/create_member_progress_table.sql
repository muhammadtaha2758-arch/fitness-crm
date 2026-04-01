-- Create member_progress table
CREATE TABLE IF NOT EXISTS `member_progress` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) unsigned NOT NULL,
  `date` date NOT NULL,
  `metric_type` varchar(255) NOT NULL,
  `value` decimal(10,2) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `start_value` decimal(10,2) DEFAULT NULL,
  `change` decimal(10,2) DEFAULT NULL,
  `gym_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `member_progress_member_id_index` (`member_id`),
  KEY `member_progress_member_id_date_index` (`member_id`,`date`),
  KEY `member_progress_member_id_metric_type_date_index` (`member_id`,`metric_type`,`date`),
  KEY `member_progress_date_index` (`date`),
  CONSTRAINT `member_progress_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;