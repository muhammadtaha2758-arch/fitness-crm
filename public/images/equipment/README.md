# Equipment Images Directory

This directory stores equipment images that are displayed in the mobile app for workout activities.

## Setup Instructions

1. **Create the directory** (if it doesn't exist):
   ```bash
   mkdir -p public/images/equipment
   ```

2. **Add equipment images** with the following naming convention:
   - Use lowercase with hyphens (kebab-case)
   - Examples:
     - `weight-plate.png` - for "Weight Plate" or "Plate" equipment
     - `dumbbell.png` - for "Dumbbell" or "Dumbbells"
     - `barbell.png` - for "Barbell"
     - `kettlebell.png` - for "Kettlebell" or "Kettlebells"
     - `resistance-band.png` - for "Resistance Band" or "Band"
     - `yoga-mat.png` - for "Yoga Mat"
     - `medicine-ball.png` - for "Medicine Ball"
     - `exercise-ball.png` - for "Exercise Ball"
     - `bench.png` - for "Bench"
     - `pull-up-bar.png` - for "Pull-up Bar"
     - `trx.png` - for "TRX Suspension Trainer"
     - `foam-roller.png` - for "Foam Roller"
     - `jump-rope.png` - for "Jump Rope"
     - `cable-machine.png` - for "Cable Machine"
     - `smith-machine.png` - for "Smith Machine"
     - `leg-press.png` - for "Leg Press Machine"
     - `lat-pulldown.png` - for "Lat Pulldown Machine"
     - `chest-press.png` - for "Chest Press Machine"
     - `treadmill.png` - for "Treadmill"
     - `elliptical.png` - for "Elliptical"
     - `bike.png` - for "Stationary Bike"
     - `rowing-machine.png` - for "Rowing Machine"
     - `stair-climber.png` - for "Stair Climber"
     - `battle-ropes.png` - for "Battle Ropes"
     - `sandbag.png` - for "Sandbag"
     - `weighted-vest.png` - for "Weighted Vest"
     - `ankle-weights.png` - for "Ankle Weights"
     - `resistance-tube.png` - for "Resistance Tubes"
     - `pilates-ring.png` - for "Pilates Ring"
     - `yoga-blocks.png` - for "Yoga Blocks"
     - `yoga-strap.png` - for "Yoga Strap"

## Image Requirements

- **Format**: PNG, JPG, or JPEG
- **Recommended size**: 200x200px to 400x400px
- **Background**: Transparent PNG preferred, or white/light background
- **Aspect ratio**: Square (1:1) recommended

## How It Works

1. **Automatic Matching**: The app will automatically match equipment names to image filenames
   - Example: "Weight Plate" → `weight-plate.png`
   - Example: "Front raise - Plate" → `weight-plate.png` (matches "Plate")

2. **Database Column**: You can also set `equipment_image` column in `workout_activities` table:
   - Set to filename only: `weight-plate.png`
   - Set to relative path: `/images/equipment/weight-plate.png`
   - Set to full URL: `https://yourdomain.com/images/equipment/weight-plate.png`

3. **Fallback**: If no image is found, the app will display an icon instead

## Example Usage

For an activity with equipment "Weight Plate":
- The app will look for: `public/images/equipment/weight-plate.png`
- If found, it displays the image
- If not found, it displays a weight icon

## Adding New Equipment Images

1. Add the image file to `public/images/equipment/` with the correct filename
2. The app will automatically detect and use it based on equipment name matching
3. No code changes needed if using standard naming convention

