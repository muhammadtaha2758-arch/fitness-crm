# Body Part Images Feature

## Overview
This feature allows workout activities to display body part images in the mobile app. The images are stored in `mobile-app-coach/assets/images/Body Parts/` and are mapped to muscle groups.

## Database Columns

Two new columns have been added to the `workout_activities` table:
- `primary_body_part_image` (string, nullable) - Stores the filename (without extension) of the primary muscle group image
- `secondary_body_part_image` (string, nullable) - Stores the filename (without extension) of the secondary muscle group image

## Setup Instructions

### Step 1: Run the Migration
```bash
php artisan migrate
```

This will add the `primary_body_part_image` and `secondary_body_part_image` columns to the `workout_activities` table.

### Step 2: Populate Existing Data

Run the population script to automatically populate the image columns based on existing muscle group data:

```bash
php artisan tinker
```

Then in tinker:
```php
require 'database/scripts/populate_body_part_images.php';
```

This script will:
- Read `primary_muscle_groups`, `secondary_muscle_groups`, and `muscles_targeted` from existing activities
- Match muscle names to image filenames
- Update the `primary_body_part_image` and `secondary_body_part_image` columns

### Step 3: Verify Images Display

The mobile app will now:
1. First try to use `primary_body_part_image` / `secondary_body_part_image` if set
2. Fall back to matching muscle names from `primary_muscle_groups` / `secondary_muscle_groups`
3. Show "Full body" image as final fallback

## Available Body Part Images

The following images are available in `mobile-app-coach/assets/images/Body Parts/`:
- Abs.png
- Arms.png
- back.png
- biceps.png
- Calves.png
- Cardiovascular.png
- Chest.png
- Core.png
- Deltoids.png
- Forearms.png
- Full body.png
- Glutes.png
- Hamstrings.png
- lats.png
- Legs.png
- Lower Back.png
- Obliques.png
- Pectorals.png
- Quadriceps.png
- Rhomboids.png
- Shoulder.png
- Traps.png
- triceps.png
- Upper Back.png

## Manual Entry

When creating or editing a workout activity, you can manually set:
- `primary_body_part_image` to the filename (without extension), e.g., "Chest", "Abs", "biceps"
- `secondary_body_part_image` to the filename (without extension)

## API Response

The API endpoints that return workout activity data will automatically include:
- `primary_body_part_image`
- `secondary_body_part_image`

These fields are already included in the `WorkoutActivity` model's `$fillable` array.

## Notes

- Image filenames are case-sensitive in the mapping
- The system will try multiple matching strategies if exact match fails
- If no image is found, the app will display a "Full body" image as fallback
- The matching logic handles variations like "Upper Chest" → "Chest", "Shoulders" → "Shoulder"

