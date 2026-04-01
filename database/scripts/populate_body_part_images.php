<?php

/**
 * Script to populate primary_body_part_image and secondary_body_part_image columns
 * based on primary_muscle_groups and secondary_muscle_groups data
 * 
 * Run this script after adding the migration columns:
 * php artisan tinker
 * require 'database/scripts/populate_body_part_images.php';
 */

use App\Models\WorkoutActivity;

// Mapping of muscle names to image filenames (without extension)
$muscleToImageMap = [
    'Abs' => 'Abs',
    'Abdominals' => 'Abs',
    'Abdominal' => 'Abs',
    'Arms' => 'Arms',
    'Back' => 'back',
    'Biceps' => 'biceps',
    'Calves' => 'Calves',
    'Cardiovascular' => 'Cardiovascular',
    'Chest' => 'Chest',
    'Core' => 'Core',
    'Deltoids' => 'Deltoids',
    'Deltoid' => 'Deltoids',
    'Forearms' => 'Forearms',
    'Forearm' => 'Forearms',
    'Full body' => 'Full body',
    'Full Body' => 'Full body',
    'Glutes' => 'Glutes',
    'Glute' => 'Glutes',
    'Hamstrings' => 'Hamstrings',
    'Hamstring' => 'Hamstrings',
    'Lats' => 'lats',
    'Latissimus' => 'lats',
    'Legs' => 'Legs',
    'Lower Back' => 'Lower Back',
    'Lower back' => 'Lower Back',
    'Obliques' => 'Obliques',
    'Oblique' => 'Obliques',
    'Pectorals' => 'Pectorals',
    'Pectoral' => 'Pectorals',
    'Quadriceps' => 'Quadriceps',
    'Quad' => 'Quadriceps',
    'Rhomboids' => 'Rhomboids',
    'Rhomboid' => 'Rhomboids',
    'Shoulder' => 'Shoulder',
    'Shoulders' => 'Shoulder',
    'Traps' => 'Traps',
    'Trapezius' => 'Traps',
    'Triceps' => 'triceps',
    'Tricep' => 'triceps',
    'Upper Back' => 'Upper Back',
    'Upper back' => 'Upper Back',
    'Upper Chest' => 'Chest',
];

function findImageForMuscle($muscleName, $muscleToImageMap) {
    if (!$muscleName) return null;
    
    $normalized = trim($muscleName);
    
    // Try exact match
    if (isset($muscleToImageMap[$normalized])) {
        return $muscleToImageMap[$normalized];
    }
    
    // Try case-insensitive match
    foreach ($muscleToImageMap as $key => $image) {
        if (strtolower($key) === strtolower($normalized)) {
            return $image;
        }
    }
    
    // Try partial matching
    $lower = strtolower($normalized);
    
    if (strpos($lower, 'chest') !== false || strpos($lower, 'pectoral') !== false) {
        return 'Chest';
    }
    if (strpos($lower, 'shoulder') !== false || strpos($lower, 'deltoid') !== false) {
        return 'Shoulder';
    }
    if (strpos($lower, 'tricep') !== false) {
        return 'triceps';
    }
    if (strpos($lower, 'bicep') !== false) {
        return 'biceps';
    }
    if (strpos($lower, 'upper back') !== false) {
        return 'Upper Back';
    }
    if (strpos($lower, 'lower back') !== false) {
        return 'Lower Back';
    }
    if (strpos($lower, 'back') !== false) {
        return 'back';
    }
    if (strpos($lower, 'abs') !== false || strpos($lower, 'abdominal') !== false) {
        return 'Abs';
    }
    if (strpos($lower, 'arm') !== false && strpos($lower, 'forearm') === false) {
        return 'Arms';
    }
    if (strpos($lower, 'forearm') !== false) {
        return 'Forearms';
    }
    if (strpos($lower, 'leg') !== false && strpos($lower, 'quad') === false && strpos($lower, 'hamstring') === false && strpos($lower, 'calf') === false) {
        return 'Legs';
    }
    if (strpos($lower, 'quad') !== false) {
        return 'Quadriceps';
    }
    if (strpos($lower, 'hamstring') !== false) {
        return 'Hamstrings';
    }
    if (strpos($lower, 'calf') !== false) {
        return 'Calves';
    }
    if (strpos($lower, 'glute') !== false) {
        return 'Glutes';
    }
    if (strpos($lower, 'core') !== false) {
        return 'Core';
    }
    if (strpos($lower, 'lat') !== false) {
        return 'lats';
    }
    if (strpos($lower, 'trap') !== false) {
        return 'Traps';
    }
    if (strpos($lower, 'rhomboid') !== false) {
        return 'Rhomboids';
    }
    if (strpos($lower, 'oblique') !== false) {
        return 'Obliques';
    }
    
    return null;
}

// Get all workout activities
$activities = WorkoutActivity::whereNotNull('primary_muscle_groups')
    ->orWhereNotNull('secondary_muscle_groups')
    ->orWhereNotNull('muscles_targeted')
    ->get();

$updated = 0;
$skipped = 0;

foreach ($activities as $activity) {
    $needsUpdate = false;
    
    // Process primary muscles
    if (!$activity->primary_body_part_image) {
        $primaryMuscles = $activity->primary_muscle_groups ?? $activity->muscles_targeted;
        
        if ($primaryMuscles) {
            if (is_array($primaryMuscles)) {
                // Get first muscle from array
                $firstMuscle = !empty($primaryMuscles) ? $primaryMuscles[0] : null;
                if ($firstMuscle) {
                    $imageName = findImageForMuscle($firstMuscle, $muscleToImageMap);
                    if ($imageName) {
                        $activity->primary_body_part_image = $imageName;
                        $needsUpdate = true;
                    }
                }
            } else {
                // String format - split by comma and get first
                $muscles = explode(',', $primaryMuscles);
                $firstMuscle = trim($muscles[0]);
                if ($firstMuscle) {
                    $imageName = findImageForMuscle($firstMuscle, $muscleToImageMap);
                    if ($imageName) {
                        $activity->primary_body_part_image = $imageName;
                        $needsUpdate = true;
                    }
                }
            }
        }
    }
    
    // Process secondary muscles
    if (!$activity->secondary_body_part_image && $activity->secondary_muscle_groups) {
        $secondaryMuscles = $activity->secondary_muscle_groups;
        
        if (is_array($secondaryMuscles)) {
            $firstMuscle = !empty($secondaryMuscles) ? $secondaryMuscles[0] : null;
            if ($firstMuscle) {
                $imageName = findImageForMuscle($firstMuscle, $muscleToImageMap);
                if ($imageName) {
                    $activity->secondary_body_part_image = $imageName;
                    $needsUpdate = true;
                }
            }
        } else {
            $muscles = explode(',', $secondaryMuscles);
            $firstMuscle = trim($muscles[0]);
            if ($firstMuscle) {
                $imageName = findImageForMuscle($firstMuscle, $muscleToImageMap);
                if ($imageName) {
                    $activity->secondary_body_part_image = $imageName;
                    $needsUpdate = true;
                }
            }
        }
    }
    
    if ($needsUpdate) {
        $activity->save();
        $updated++;
        echo "Updated activity ID {$activity->exercise_id}: primary='{$activity->primary_body_part_image}', secondary='{$activity->secondary_body_part_image}'\n";
    } else {
        $skipped++;
    }
}

echo "\nCompleted! Updated: $updated, Skipped: $skipped\n";

