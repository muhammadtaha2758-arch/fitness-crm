<template>
    <b-modal
        id="workout-modal"
        size="lg"
        title="Workout Information"
        :visible="visible"
        @hide="$emit('close')"
        hide-footer
        class="workout-modal"
        @submit="addWorkout"
        no-close-on-backdrop
        no-close-on-esc
    >
        <form @submit.prevent="handleSubmit" class="workout-form">
                <b-row>
                    <b-col md="6">
                        <b-form-group class="form-group-modern">
                            <template #label>
                                Name <span class="text-danger">*</span>
                            </template>
                            <b-form-input
                                v-model="form.exercise_name"
                                required
                                placeholder="Enter title (e.g., Full Body Burn)"
                                class="form-input-modern"
                                :class="{ 'is-invalid': validationErrors.exercise_name }"
                            ></b-form-input>
                            <div v-if="validationErrors.exercise_name" class="invalid-feedback d-block">
                                {{ validationErrors.exercise_name[0] }}
                            </div>
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group class="form-group-modern">
                            <template #label>
                                Category <span class="text-danger">*</span>
                            </template>
                            <b-form-select
                                v-model="form.category"
                                :options="categories"
                                required
                                class="form-select-modern"
                                :class="{ 'is-invalid': validationErrors.category }"
                            />
                            <div v-if="validationErrors.category" class="invalid-feedback d-block">
                                {{ validationErrors.category[0] }}
                            </div>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="3">
                        <b-form-group class="form-group-modern">
                            <template #label>
                                Duration (minutes) <span class="text-danger">*</span>
                            </template>
                            <b-form-input
                                type="number"
                                v-model="form.duration"
                                required
                                placeholder="e.g., 30"
                                class="form-input-modern"
                                :class="{ 'is-invalid': validationErrors.duration }"
                            />
                            <div v-if="validationErrors.duration" class="invalid-feedback d-block">
                                {{ validationErrors.duration[0] }}
                            </div>
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group class="form-group-modern">
                            <template #label>
                                Level <span class="text-danger">*</span>
                            </template>
                            <b-form-select
                                v-model="form.level"
                                :options="levels"
                                required
                                class="form-select-modern"
                                :class="{ 'is-invalid': validationErrors.level }"
                                placeholder="Select level"
                            />
                            <div v-if="validationErrors.level" class="invalid-feedback d-block">
                                {{ validationErrors.level[0] }}
                            </div>
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group class="form-group-modern">
                            <template #label>
                                Calories Burned <span class="text-danger">*</span>
                            </template>
                            <b-form-input
                                type="number"
                                v-model="form.calories_burned"
                                placeholder="e.g., 200"
                                class="form-input-modern"
                                :class="{ 'is-invalid': validationErrors.calories_burned }"
                            />
                            <div v-if="validationErrors.calories_burned" class="invalid-feedback d-block">
                                {{ validationErrors.calories_burned[0] }}
                            </div>
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group
                            label="Exercise Type"
                            class="form-group-modern"
                        >
                            <b-form-select
                                v-model="form.type"
                                :options="typeOptions"
                                class="form-select-modern"
                            />
                        </b-form-group>
                    </b-col>
                    <b-col md="3">
                        <b-form-group
                            label="Goal"
                            class="form-group-modern"
                        >
                            <b-form-select
                                v-model="form.goal"
                                :options="goalOptions"
                                class="form-select-modern"
                            />
                        </b-form-group>
                    </b-col>
                </b-row>

            <!-- Selected Activities Section -->
            <div v-if="selectedActivities && selectedActivities.length > 0" class="form-section selected-activities-section">
                <h4 class="section-title">
                    <i class="fas fa-dumbbell mr-2"></i>
                    Selected Activities ({{ selectedActivities.length }})
                </h4>
                <div class="selected-activities-info">
                    <p class="text-muted mb-3">
                        <i class="fas fa-info-circle mr-2"></i>
                        These activities will be available in the Exercise Library when you use the Plan Builder.
                    </p>
                    
                    <!-- Day Selection for Activities -->
                    <b-form-group label="Assign Activities to Day" class="form-group-modern">
                        <template slot="label">
                            Assign Activities to Day <span class="text-muted">(Optional)</span>
                        </template>
                        <b-form-select
                            v-model="selectedDay"
                            :options="dayOptions"
                            class="form-select-modern"
                        >
                            <template slot="first">
                                <option :value="null">No day selected (activities will be in Exercise Library only)</option>
                            </template>
                        </b-form-select>
                        <small class="form-text text-muted">
                            <i class="fas fa-info-circle mr-1"></i>
                            If you select a day, all selected activities will be assigned to that day when you edit this workout in Plan Builder.
                        </small>
                    </b-form-group>
                    
                    <div class="selected-activities-list">
                        <div
                            v-for="(activity, index) in selectedActivities"
                            :key="activity.id || index"
                            class="selected-activity-item"
                        >
                            <div class="activity-item-thumbnail">
                                <img
                                    :src="activity.thumbnail || '/images/Kettlebell-swing.webp'"
                                    :alt="activity.name"
                                    @error="handleImageError"
                                />
                            </div>
                            <div class="activity-item-info">
                                <h6 class="activity-item-name">{{ activity.name }}</h6>
                                <div class="activity-item-meta">
                                    <span class="meta-badge">{{ activity.category }}</span>
                                    <span class="meta-badge">{{ activity.muscle || 'Full Body' }}</span>
                                    <span class="meta-badge">{{ activity.difficulty || activity.level }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Description & Instructions -->
            <b-row>
                <b-col md="6">
                    <b-form-group label="Description" class="form-group-modern">
                        <b-form-textarea
                            v-model="form.description"
                            rows="3"
                            class="form-textarea-modern"
                            :class="{ 'is-invalid': validationErrors.description }"
                            placeholder="Briefly describe the workout focus and goals"
                        />
                        <div v-if="validationErrors.description" class="invalid-feedback d-block">
                            {{ validationErrors.description[0] }}
                        </div>
                    </b-form-group>
                </b-col>
                <b-col md="6">
                    <b-form-group label="Instructions" class="form-group-modern">
                        <b-form-textarea
                            v-model="form.instructions"
                            rows="3"
                            class="form-textarea-modern"
                            placeholder="Step-by-step guide on how to perform this workout"
                        />
                    </b-form-group>
                </b-col>
            </b-row>

            <!-- Thumbnail Upload and Additional Fields -->
            <b-row>
                <!-- Left Half: Workout Image -->
                <b-col md="6">
                    <b-form-group label="Workout Image" class="form-group-modern">
                        <div
                            class="file-upload-wrapper position-relative thumbnail-box"
                        >
                            <input
                                type="file"
                                ref="thumbnailInput"
                                @change="previewThumbnail"
                                accept="image/*"
                                class="file-input-modern"
                            />

                            <!-- Always show thumbnail preview (default or custom) -->
                            <div
                                class="thumbnail-overlay-preview"
                                style="cursor: pointer;"
                            >
                                <img
                                    :key="`thumbnail-${displayThumbnail}`"
                                    :src="displayThumbnail"
                                    alt="Workout Thumbnail"
                                    class="thumbnail-image"
                                    @error="handleThumbnailError"
                                    @load="onThumbnailLoad"
                                    style="width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;"
                                />
                                
                                <!-- Navigation Arrows for Default Images -->
                                <div 
                                    v-if="!hasCustomThumbnail && defaultWorkoutImages.length > 1" 
                                    class="thumbnail-navigation"
                                >
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-navigation btn-navigation-left"
                                        @click.stop="previousDefaultImage"
                                        title="Previous Image"
                                    >
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-navigation btn-navigation-right"
                                        @click.stop="nextDefaultImage"
                                        title="Next Image"
                                    >
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                </div>

                                <div class="thumbnail-actions">
                                    <button
                                        v-if="hasCustomThumbnail"
                                        type="button"
                                        class="btn btn-sm btn-outline-danger"
                                        @click.stop="removeThumbnail"
                                        title="Remove Custom Image"
                                    >
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                                <div 
                                    class="thumbnail-overlay-hint" 
                                    v-if="!hasCustomThumbnail"
                                    @click="$refs.thumbnailInput.click()"
                                >
                                    <i class="fas fa-image"></i>
                                    <span>Click to change image</span>
                                </div>
                            </div>
                        </div>
                    </b-form-group>
                </b-col>

                <!-- Right Half: Last Three Form Groups -->
                <b-col md="6">
                    <b-form-group
                        label="Difficulty (1-10)"
                        class="form-group-modern"
                    >
                        <b-form-input
                            type="number"
                            v-model="form.difficulty"
                            min="1"
                            max="10"
                            class="form-input-modern"
                            placeholder="Rate the workout difficulty from 1 (easy) to 10 (extreme)"
                        />
                    </b-form-group>

                    <b-form-group
                        label="Tags (comma separated)"
                        class="form-group-modern"
                    >
                        <b-form-input
                            v-model="form.tags"
                            class="form-input-modern"
                            placeholder="e.g., fat burn, full body, strength"
                        />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                    <b-col md="12" class="mb-3 d-flex align-items-center">
                        <h5 class="mb-0 mr-2">Settings</h5>
                        <b-tooltip
                            target="settings-info-icon"
                            triggers="hover"
                            placement="right"
                        >
                            Set a default rest time, number of sets and reps/time per activity, with a max of 10 sets. You can come back to this screen to change the default at any time, which won't affect activities that have already been added.
                        </b-tooltip>
                        <i 
                            id="settings-info-icon" 
                            class="ml-1 fas fa-info-circle info-icon-red"
                            style="cursor: pointer; font-size: 1.1rem;"
                        ></i>
                    </b-col>
                    
                    <!-- Days per week, Repeat, Rest (s) -->
                    <b-col md="4">
                        <b-form-group
                            label="Days per week"
                            class="form-group-modern"
                        >
                            <b-form-select
                                v-model="form.days_per_week"
                                :options="daysPerWeekOptions"
                                class="form-select-modern"
                            />
                        </b-form-group>
                    </b-col>
                    <b-col md="4">
                        <b-form-group
                            label="Repeat"
                            class="form-group-modern"
                        >
                            <b-form-select
                                v-model="form.repeat"
                                :options="repeatOptions"
                                class="form-select-modern"
                            />
                        </b-form-group>
                    </b-col>
                    <b-col md="4">
                        <b-form-group
                            label="Rest (s)"
                            class="form-group-modern"
                        >
                            <b-form-input
                                v-model="form.rest_seconds"
                                type="number"
                                min="0"
                                class="form-input-modern"
                                placeholder="0"
                            />
                        </b-form-group>
                    </b-col>
                    
                    <!-- Reps (x) Section -->
                    <b-col md="12" class="mt-3">
                        <div class="d-flex align-items-center mb-2">
                            <h6 class="mb-0 mr-2">Reps (x)</h6>
                            <b-tooltip
                                target="reps-info-icon"
                                triggers="hover"
                                placement="right"
                            >
                                For rep-based activities. To remove a set, either empty the field or put 0 as the number of reps.
                            </b-tooltip>
                            <i 
                                id="reps-info-icon" 
                                class="ml-1 fas fa-info-circle info-icon-red"
                                style="cursor: pointer; font-size: 0.9rem;"
                            ></i>
                        </div>
                        <div class="reps-inputs-row">
                            <b-form-input
                                v-for="(rep, index) in form.default_reps"
                                :key="index"
                                v-model="form.default_reps[index]"
                                type="number"
                                min="0"
                                class="form-input-modern reps-input"
                                :placeholder="`Rep ${index + 1}`"
                            />
                        </div>
                    </b-col>
                    
                    <!-- Enable Preset Weights Toggle -->
                    <b-col md="12" class="mt-3">
                        <div class="preset-weights-wrapper">
                            <b-form-checkbox
                                v-model="form.enable_preset_weights"
                                switch
                                class="preset-weights-toggle"
                            >
                                <span class="preset-weights-label">Enable adding preset weights</span>
                            </b-form-checkbox>
                            <b-tooltip
                                target="preset-weights-info-icon"
                                triggers="hover"
                                placement="right"
                            >
                                When enabled, you can add preset weight values for exercises
                            </b-tooltip>
                            <i 
                                id="preset-weights-info-icon" 
                                class="preset-weights-info-icon fas fa-info-circle info-icon-red"
                            ></i>
                        </div>
                    </b-col>
                    
                    <b-col md="6">
                        <b-form-group
                            label="Equipments"
                            class="form-group-modern"
                        >
                            <b-form-select
                                v-model="form.equipment"
                                :options="equipmentOptions"
                                multiple
                                class="form-select-modern"
                            >
                            </b-form-select>
                            <small class="form-text text-muted">
                                <i class="fas fa-info-circle mr-1"></i>
                                Hold Ctrl (or Cmd on Mac) to select multiple items
                            </small>
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group
                            label="Target Muscle Groups"
                            class="form-group-modern"
                        >
                            <b-form-select
                                v-model="form.muscles_targeted"
                                :options="muscleGroupsOptions"
                                multiple
                                class="form-select-modern"
                            >
                            </b-form-select>
                            <small class="form-text text-muted">
                                <i class="fas fa-info-circle mr-1"></i>
                                Hold Ctrl (or Cmd on Mac) to select multiple items
                            </small>
                        </b-form-group>
                    </b-col>
            </b-row>


            <!-- Submit -->
            <div class="form-actions">
                <b-button 
                    variant="success" 
                    type="submit" 
                    class="submit-btn"
                    :disabled="loading"
                >
                    <i v-if="!loading" class="fas fa-check-circle"></i>
                    <i v-else class="fas fa-spinner fa-spin"></i>
                    {{ loading ? (initialWorkout && initialWorkout.id ? 'Updating...' : 'Creating...') : (initialWorkout && initialWorkout.id ? 'Update and Continue' : 'Continue') }}
                </b-button>
            </div>
        </form>
    </b-modal>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        visible: Boolean,
        initialWorkout: {
            type: Object,
            default: null,
        },
        selectedActivities: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            form: {
                exercise_name: "New Workout",
                category: "full-body",
                duration: 15,
                level: "Beginner",
                calories_burned: 100,
                description: "A comprehensive workout designed to maximize your fitness potential. This routine targets multiple muscle groups and energy systems to help you achieve your fitness goals efficiently.",
                instructions: "1. Warm up for 5 minutes with light cardio\n2. Perform each exercise with proper form\n3. Rest 30-60 seconds between sets\n4. Complete all sets before moving to the next exercise\n5. Cool down with stretching after completing the workout",
                equipment: [],
                muscles_targeted: [],
                difficulty: 5,
                rest_period: null,
                tags: "",
                video_link: "",
                type: "Set based",
                goal: "Lose Weight",
                sets: [
                    { reps: 0, pause: 0 },
                    { reps: 0, pause: 0 },
                    { reps: 0, pause: 0 }
                ],
                // Settings fields
                days_per_week: "3 days/week",
                repeat: "1x",
                rest_seconds: null,
                default_reps: [null, null, null, null, null, null, null, null, null],
                enable_preset_weights: false,
            },
            categories: [
                { value: "full-body", text: "Full Body" },
                { value: "upper-body", text: "Upper Body" },
                { value: "lower-body", text: "Lower Body" },
                { value: "core", text: "Core" },
                { value: "flexibility", text: "Flexibility" },
                { value: "cardio", text: "Cardio" },
                { value: "strength", text: "Strength" },
                { value: "yoga", text: "Yoga" },
                // Mobile app categories
                { value: "General", text: "General" },
                { value: "HIIT", text: "HIIT" },
                { value: "Mobility", text: "Mobility" },
            ],
            levels: [
                { value: "Beginner", text: "Beginner" },
                { value: "Intermediate", text: "Intermediate" },
                { value: "Advanced", text: "Advanced" },
            ],
            typeOptions: [
                { value: "Set based", text: "Set based" },
                { value: "Repetition-based", text: "Repetition-based" },
                { value: "Time-based", text: "Time-based" },
                { value: "Distance-based", text: "Distance-based" }
            ],
            goalOptions: [
                { value: "Lose Weight", text: "Lose Weight" },
                { value: "Build Muscle", text: "Build Muscle" },
                { value: "Get Fit", text: "Get Fit" },
                { value: "Increase Strength", text: "Increase Strength" },
                { value: "Improve Endurance", text: "Improve Endurance" },
                { value: "Tone Body", text: "Tone Body" },
                { value: "Flexibility", text: "Flexibility" },
                { value: "General Fitness", text: "General Fitness" }
            ],
            dayOptions: [
                { value: "Monday", text: "Monday" },
                { value: "Tuesday", text: "Tuesday" },
                { value: "Wednesday", text: "Wednesday" },
                { value: "Thursday", text: "Thursday" },
                { value: "Friday", text: "Friday" },
                { value: "Saturday", text: "Saturday" },
                { value: "Sunday", text: "Sunday" }
            ],
            daysPerWeekOptions: [
                { value: "1 day/week", text: "1 day/week" },
                { value: "2 days/week", text: "2 days/week" },
                { value: "3 days/week", text: "3 days/week" },
                { value: "4 days/week", text: "4 days/week" },
                { value: "5 days/week", text: "5 days/week" },
                { value: "6 days/week", text: "6 days/week" },
                { value: "7 days/week", text: "7 days/week" },
            ],
            repeatOptions: [
                { value: "1x", text: "1x" },
                { value: "2x", text: "2x" },
                { value: "3x", text: "3x" },
                { value: "4x", text: "4x" },
                { value: "5x", text: "5x" },
                { value: "6x", text: "6x" },
                { value: "7x", text: "7x" },
                { value: "8x", text: "8x" },
                { value: "9x", text: "9x" },
                { value: "10x", text: "10x" },
                { value: "11x", text: "11x" },
                { value: "12x", text: "12x" },
                { value: "13x", text: "13x" },
                { value: "14x", text: "14x" },
                { value: "15x", text: "15x" },
                { value: "16x", text: "16x" },
                { value: "17x", text: "17x" },
                { value: "18x", text: "18x" },
                { value: "19x", text: "19x" },
                { value: "20x", text: "20x" },
            ],
            equipmentOptions: [
                { value: "Dumbbells", text: "Dumbbells" },
                { value: "Resistance Bands", text: "Resistance Bands" },
                { value: "Yoga Mat", text: "Yoga Mat" },
                { value: "Barbell", text: "Barbell" },
                { value: "Kettlebell", text: "Kettlebell" },
                { value: "Pull-up Bar", text: "Pull-up Bar" },
                { value: "Medicine Ball", text: "Medicine Ball" },
                { value: "TRX Suspension Trainer", text: "TRX Suspension Trainer" },
                { value: "Foam Roller", text: "Foam Roller" },
                { value: "Exercise Ball", text: "Exercise Ball" },
                { value: "Jump Rope", text: "Jump Rope" },
                { value: "Bench", text: "Bench" },
                { value: "Cable Machine", text: "Cable Machine" },
                { value: "Smith Machine", text: "Smith Machine" },
                { value: "Leg Press Machine", text: "Leg Press Machine" },
                { value: "Lat Pulldown Machine", text: "Lat Pulldown Machine" },
                { value: "Chest Press Machine", text: "Chest Press Machine" },
                { value: "Treadmill", text: "Treadmill" },
                { value: "Elliptical", text: "Elliptical" },
                { value: "Stationary Bike", text: "Stationary Bike" },
                { value: "Rowing Machine", text: "Rowing Machine" },
                { value: "Stair Climber", text: "Stair Climber" },
                { value: "Battle Ropes", text: "Battle Ropes" },
                { value: "Sandbag", text: "Sandbag" },
                { value: "Weighted Vest", text: "Weighted Vest" },
                { value: "Ankle Weights", text: "Ankle Weights" },
                { value: "Resistance Tubes", text: "Resistance Tubes" },
                { value: "Pilates Ring", text: "Pilates Ring" },
                { value: "Yoga Blocks", text: "Yoga Blocks" },
                { value: "Yoga Strap", text: "Yoga Strap" },
                { value: "Bosu Ball", text: "Bosu Ball" },
                { value: "Stability Ball", text: "Stability Ball" },
                { value: "Ab Wheel", text: "Ab Wheel" },
                { value: "Push-up Bars", text: "Push-up Bars" },
                { value: "Dip Bars", text: "Dip Bars" },
                { value: "Plyometric Box", text: "Plyometric Box" },
                { value: "Agility Ladder", text: "Agility Ladder" },
                { value: "Cone Markers", text: "Cone Markers" },
                { value: "None (Bodyweight)", text: "None (Bodyweight)" },
            ],
            muscleGroupsOptions: [
                { value: "Biceps", text: "Biceps" },
                { value: "Triceps", text: "Triceps" },
                { value: "Shoulders", text: "Shoulders" },
                { value: "Chest", text: "Chest" },
                { value: "Back", text: "Back" },
                { value: "Lats", text: "Lats" },
                { value: "Core", text: "Core" },
                { value: "Abs", text: "Abs" },
                { value: "Obliques", text: "Obliques" },
                { value: "Glutes", text: "Glutes" },
                { value: "Quadriceps", text: "Quadriceps" },
                { value: "Hamstrings", text: "Hamstrings" },
                { value: "Calves", text: "Calves" },
                { value: "Forearms", text: "Forearms" },
                { value: "Traps", text: "Traps" },
                { value: "Deltoids", text: "Deltoids" },
                { value: "Pectorals", text: "Pectorals" },
                { value: "Rhomboids", text: "Rhomboids" },
                { value: "Lower Back", text: "Lower Back" },
                { value: "Upper Back", text: "Upper Back" },
                { value: "Full Body", text: "Full Body" },
                { value: "Legs", text: "Legs" },
                { value: "Arms", text: "Arms" },
                { value: "Cardiovascular", text: "Cardiovascular" },
            ],
            selectedDay: null,
            thumbnailUrl: null,
            videoUrl: null,
            loading: false,
            validationErrors: {},
            defaultWorkoutImages: [
                '/images/workout_default/workout-1.jpg',
                '/images/workout_default/workout-2.jpg',
                '/images/workout_default/workout-3.jpg',
                '/images/workout_default/workout-4.jpg',
                '/images/workout_default/workout-5.jpg',
                '/images/workout_default/workout-6.jpg',
                '/images/workout_default/workout-7.jpg',
                '/images/workout_default/workout-8.jpg',
                '/images/workout_default/workout-9.jpg',
                '/images/workout_default/workout-10.jpg',
                '/images/workout_default/workout-11.jpg',
                '/images/workout_default/workout-12.jpg',
                '/images/workout_default/workout-13.jpg',
                '/images/workout_default/workout-14.jpg',
                '/images/workout_default/workout-15.jpg',
                '/images/workout_default/schedule-1.jpg',
                '/images/workout_default/schedule-2.jpg',
                '/images/workout_default/Sets.png',
                '/images/workout_default/startpagegirl.png',
                '/images/workout_default/weeklychallenge.png',
            ],
            currentDefaultImageIndex: 0,
        };
    },
    watch: {
        initialWorkout: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    // If category exists but is not in the categories list, add it dynamically
                    if (newVal.category && newVal.category.trim() !== '') {
                        const categoryExists = this.categories.some(cat => cat.value === newVal.category);
                        if (!categoryExists) {
                            // Add the category to the list so it can be displayed in the dropdown
                            this.categories.push({
                                value: newVal.category,
                                text: newVal.category
                            });
                        }
                    }
                    
                    this.form = {
                        ...this.form,
                        exercise_name: newVal.exercise_name || newVal.name || "",
                        category: newVal.category || this.categories[0]?.value || "full-body",
                        duration: newVal.duration,
                        level: newVal.level || "Beginner",
                        calories_burned: newVal.calories_burned,
                        description: newVal.description,
                        instructions: newVal.instructions,
                        equipment: this.getEquipmentValue(newVal.equipment),
                        muscles_targeted: this.getMuscleGroupValue(newVal.muscles_targeted || newVal.muscleGroups),
                        difficulty: newVal.difficulty,
                        rest_period: newVal.rest_period || newVal.restPeriod,
                        tags: newVal.tags,
                        video_link: newVal.video_link || newVal.videoLink || "",
                        type: newVal.type || this.typeOptions[0]?.value || "Set based",
                        goal: newVal.goal || this.goalOptions[0]?.value || "Lose Weight",
                        sets: newVal.sets_configuration || [
                            { reps: 0, pause: 0 },
                            { reps: 0, pause: 0 },
                            { reps: 0, pause: 0 }
                        ],
                        // Load settings fields
                        days_per_week: newVal.days_per_week || "3 days/week",
                        repeat: newVal.repeat || "1x",
                        rest_seconds: newVal.rest_seconds || null,
                        default_reps: (() => {
                            // Initialize with 9 null values
                            const defaultArray = [null, null, null, null, null, null, null, null, null];
                            
                            if (!newVal.default_reps) {
                                return defaultArray;
                            }
                            
                            let repsArray = null;
                            
                            // If it's a string (JSON), parse it
                            if (typeof newVal.default_reps === 'string') {
                                try {
                                    repsArray = JSON.parse(newVal.default_reps);
                                } catch (e) {
                                    return defaultArray;
                                }
                            } else if (Array.isArray(newVal.default_reps)) {
                                // If it's already an array, use it
                                repsArray = newVal.default_reps;
                            } else {
                                return defaultArray;
                            }
                            
                            // Ensure we have an array and normalize values
                            if (!Array.isArray(repsArray)) {
                                return defaultArray;
                            }
                            
                            // Process the array: convert to numbers, handle empty strings, and pad to 9 elements
                            const processedArray = repsArray.map(rep => {
                                // Convert empty string or null to null
                                if (rep === '' || rep === null || rep === undefined) {
                                    return null;
                                }
                                // Convert to number if it's a valid number string
                                const num = Number(rep);
                                return isNaN(num) ? null : num;
                            });
                            
                            // Pad array to exactly 9 elements
                            while (processedArray.length < 9) {
                                processedArray.push(null);
                            }
                            
                            // Trim to 9 elements if longer
                            return processedArray.slice(0, 9);
                        })(),
                        enable_preset_weights: (() => {
                            const value = newVal.enable_preset_weights;
                            // Handle all possible formats: boolean true, integer 1, string '1', or truthy values
                            const result = (value === true || value === 1 || value === '1' || value === 'true');
                            return result;
                        })(),
                    };
                    // Set thumbnail URL - always load from initialWorkout when it changes
                    // Only preserve blob URLs (user's new selection) if they exist
                    const hasUserSelection = this.thumbnailUrl && this.thumbnailUrl.startsWith('blob:');
                    
                    if (!hasUserSelection) {
                        // No user selection, load from initialWorkout
                        if (newVal.thumbnail && newVal.thumbnail.trim() !== '') {
                            // Ensure thumbnail path starts with / for proper display
                            let thumbPath = newVal.thumbnail.trim();
                            if (!thumbPath.startsWith('/') && !thumbPath.startsWith('http://') && !thumbPath.startsWith('https://')) {
                                thumbPath = '/' + thumbPath;
                            }
                            // Set thumbnail URL - even if it's the default image path
                            this.thumbnailUrl = thumbPath;
                            
                            // Check if it's a default workout image and set the index
                            const defaultIndex = this.defaultWorkoutImages.findIndex(img => {
                                const imgName = img.split('/').pop();
                                return thumbPath.includes(imgName);
                            });
                            if (defaultIndex !== -1) {
                                this.currentDefaultImageIndex = defaultIndex;
                            }
                        } else {
                            // No thumbnail in database, set to null (will show default via computed property)
                            this.thumbnailUrl = null;
                            this.currentDefaultImageIndex = 0;
                        }
                    }
                    // If thumbnailUrl is a blob URL, keep it (user's selection)
                    this.videoUrl = newVal.video || null;
                    // Clear validation errors when loading workout data
                    this.validationErrors = {};
                } else {
                    this.resetForm();
                }
            },
        },
        visible(val) {
            if (val) {
                // When modal opens, load thumbnail from initialWorkout if available
                // Only preserve blob URLs (user's new selection) if they exist
                const hasUserSelection = this.thumbnailUrl && this.thumbnailUrl.startsWith('blob:');
                
                if (!hasUserSelection) {
                    // Load from initialWorkout or set to null
                    if (this.initialWorkout && this.initialWorkout.thumbnail && this.initialWorkout.thumbnail.trim() !== '') {
                        let thumbPath = this.initialWorkout.thumbnail.trim();
                        if (!thumbPath.startsWith('/') && !thumbPath.startsWith('http://') && !thumbPath.startsWith('https://')) {
                            thumbPath = '/' + thumbPath;
                        }
                        // Set thumbnail URL - even if it's the default image path
                        // Use Vue.set to ensure reactivity
                        this.$set(this, 'thumbnailUrl', thumbPath);
                        
                        // Check if it's a default workout image and set the index
                        const defaultIndex = this.defaultWorkoutImages.findIndex(img => {
                            const imgName = img.split('/').pop();
                            return thumbPath.includes(imgName);
                        });
                        if (defaultIndex !== -1) {
                            this.currentDefaultImageIndex = defaultIndex;
                        }
                    } else {
                        // No thumbnail in database, set to null (will show default via computed property)
                        this.$set(this, 'thumbnailUrl', null);
                        this.currentDefaultImageIndex = 0;
                    }
                }
                // Force update in next tick to ensure image displays
                this.$nextTick(() => {
                    this.$forceUpdate();
                });
            } else {
                this.resetForm();
                this.selectedDay = null;
                // Clear validation errors when modal closes
                this.validationErrors = {};
            }
        },
    },
    computed: {
        displayThumbnail() {
            // Always return a valid image path
            // Priority: blob URL (user selection) > thumbnailUrl > initialWorkout.thumbnail > default image from navigation
            
            // First check if user selected a new image (blob URL)
            if (this.thumbnailUrl && typeof this.thumbnailUrl === 'string' && this.thumbnailUrl.startsWith('blob:')) {
                return this.thumbnailUrl;
            }
            
            // Then check if thumbnailUrl is set (from database or initialWorkout)
            if (this.thumbnailUrl && typeof this.thumbnailUrl === 'string' && this.thumbnailUrl.trim() !== '') {
                const trimmed = this.thumbnailUrl.trim();
                // Ensure path starts with / if it's a relative path
                if (!trimmed.startsWith('/') && !trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
                    return '/' + trimmed;
                }
                return trimmed;
            }
            
            // Fallback to initialWorkout thumbnail if available
            if (this.initialWorkout && this.initialWorkout.thumbnail && this.initialWorkout.thumbnail.trim() !== '') {
                let thumbPath = this.initialWorkout.thumbnail.trim();
                if (!thumbPath.startsWith('/') && !thumbPath.startsWith('http://') && !thumbPath.startsWith('https://')) {
                    thumbPath = '/' + thumbPath;
                }
                return thumbPath;
            }
            
            // Return current default image from navigation
            if (this.defaultWorkoutImages && this.defaultWorkoutImages.length > 0) {
                return this.defaultWorkoutImages[this.currentDefaultImageIndex] || this.defaultWorkoutImages[0];
            }
            
            // Always return default image as last resort
            return '/images/closeup.webp';
        },
        hasCustomThumbnail() {
            // Check if a custom thumbnail has been selected (blob URL or file input has a file)
            return !!(this.thumbnailUrl && this.thumbnailUrl.startsWith('blob:')) || 
                   (this.$refs.thumbnailInput && this.$refs.thumbnailInput.files && this.$refs.thumbnailInput.files.length > 0);
        },
    },
    methods: {
        previewVideo(event) {
            const file = event.target.files[0];
            if (file) {
                this.videoUrl = URL.createObjectURL(file);
            }
        },
        removeVideo() {
            this.videoUrl = null;
            if (this.$refs.videoInput) {
                this.$refs.videoInput.value = null;
            }
        },
        previewThumbnail(event) {
            const file = event.target.files[0];
            if (file) {
                // Create object URL for immediate preview
                this.thumbnailUrl = URL.createObjectURL(file);
                // Reset default image index when user selects custom image
                this.currentDefaultImageIndex = 0;
            } else {
                // If no file selected, keep existing thumbnail or set to null
                if (!this.initialWorkout || !this.initialWorkout.thumbnail) {
                    this.thumbnailUrl = null;
                }
            }
        },
        removeThumbnail() {
            this.thumbnailUrl = null;
            if (this.$refs.thumbnailInput) {
                this.$refs.thumbnailInput.value = null;
            }
        },
        validateForm() {
            // Clear previous validation errors
            this.validationErrors = {};
            let isValid = true;
            const errors = {};

            // Required field validations
            if (!this.form.exercise_name || this.form.exercise_name.trim() === '') {
                errors.exercise_name = ['Name is required'];
                isValid = false;
            }

            if (!this.form.category || this.form.category === null) {
                errors.category = ['Category is required'];
                isValid = false;
            }

            if (!this.form.duration || this.form.duration === null || this.form.duration === '') {
                errors.duration = ['Duration is required'];
                isValid = false;
            }

            if (!this.form.level || this.form.level === null || this.form.level === '') {
                errors.level = ['Level is required'];
                isValid = false;
            }

            // Check if calories_burned is provided (allow 0 as valid value)
            if (this.form.calories_burned === null || this.form.calories_burned === undefined || this.form.calories_burned === '') {
                errors.calories_burned = ['Calories Burned is required'];
                isValid = false;
            } else {
                // Validate calories_burned is a valid non-negative number (allow 0)
                const calories = Number(this.form.calories_burned);
                if (isNaN(calories) || calories < 0) {
                    errors.calories_burned = ['Calories Burned must be a valid number (0 or greater)'];
                    isValid = false;
                }
            }

            // Validate duration is a valid positive number
            if (this.form.duration) {
                const duration = Number(this.form.duration);
                if (isNaN(duration) || duration <= 0) {
                    errors.duration = ['Duration must be a valid positive number'];
                    isValid = false;
                }
            }

            // Set validation errors
            if (!isValid) {
                this.validationErrors = errors;
                
                // Scroll to first error field
                this.$nextTick(() => {
                    try {
                        if (!this._isDestroyed && this.$el && this.$el.nodeType === 1 && typeof this.$el.querySelector === 'function') {
                            const firstErrorField = Object.keys(errors)[0];
                            const errorElement = this.$el.querySelector(`.is-invalid`);
                            if (errorElement) {
                                errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                errorElement.focus();
                            }
                        }
                    } catch (error) {
                        // Silently fail if element is not available
                    }
                });

                // Show error message
                this.$swal({
                    icon: 'error',
                    title: 'Validation Error',
                    html: `
                        <div style="text-align: left;">
                            <p style="margin-bottom: 10px;"><strong>Please fix the following errors:</strong></p>
                            <ul style="margin-left: 20px;">
                                ${Object.entries(errors).map(([field, messages]) => {
                                    const fieldLabel = this.getFieldLabel(field);
                                    return `<li>${fieldLabel}: ${messages[0]}</li>`;
                                }).join('')}
                            </ul>
                        </div>
                    `,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#ff4040',
                });
            }

            return isValid;
        },
        async handleSubmit() {
            // Validate form before submitting
            if (!this.validateForm()) {
                return; // Stop submission if validation fails
            }

            try {
                this.loading = true;
                
                // Check if this is an edit (has initialWorkout with id) or create (new workout)
                const isEdit = this.initialWorkout && this.initialWorkout.id;
                const workoutId = isEdit ? this.initialWorkout.id : null;
                
                // Create FormData for file upload
                const formData = new FormData();
                
                // Add text fields - ensure required fields are not null/undefined
                formData.append('exercise_name', this.form.exercise_name || '');
                formData.append('category', this.form.category || '');
                formData.append('duration', this.form.duration || '');
                formData.append('level', this.form.level || '');
                formData.append('description', this.form.description || '');
                // Send equipment value as JSON array
                formData.append('equipment', Array.isArray(this.form.equipment) && this.form.equipment.length > 0 
                    ? JSON.stringify(this.form.equipment) 
                    : '[]');
                // Send muscles_targeted value as JSON array
                formData.append('muscles_targeted', Array.isArray(this.form.muscles_targeted) && this.form.muscles_targeted.length > 0 
                    ? JSON.stringify(this.form.muscles_targeted) 
                    : '[]');
                formData.append('video_link', this.form.video_link || '');
                // Handle calories_burned - ensure it's a valid integer (allow 0)
                if (this.form.calories_burned !== null && this.form.calories_burned !== undefined && this.form.calories_burned !== '') {
                    const parsed = parseInt(this.form.calories_burned);
                    if (!isNaN(parsed) && parsed >= 0) {
                        formData.append('calories_burned', parsed.toString());
                    } else {
                        formData.append('calories_burned', '0');
                    }
                } else {
                    // If validation passed but value is missing, default to 0 (backend requires a value)
                    formData.append('calories_burned', '0');
                }
                formData.append('instructions', this.form.instructions || '');
                formData.append('difficulty', this.form.difficulty || 1);
                formData.append('rest_period', this.form.rest_period || 30);
                formData.append('tags', this.form.tags || '');
                formData.append('type', this.form.type || '');
                formData.append('goal', this.form.goal || 'Lose Weight');
                formData.append('sets', JSON.stringify(this.form.sets || []));
                
                // Add settings fields
                formData.append('days_per_week', this.form.days_per_week || '');
                formData.append('repeat', this.form.repeat || '');
                // Only append rest_seconds if it has a value (not null or empty)
                if (this.form.rest_seconds !== null && this.form.rest_seconds !== '') {
                    formData.append('rest_seconds', parseInt(this.form.rest_seconds) || 0);
                }
                // Process default_reps: convert empty strings to null and ensure proper format
                const processedReps = this.form.default_reps.map(rep => {
                    // Convert empty string, null, or undefined to null
                    if (rep === '' || rep === null || rep === undefined) {
                        return null;
                    }
                    // Convert to number if it's a valid number
                    const num = Number(rep);
                    return isNaN(num) ? null : num;
                });
                formData.append('default_reps', JSON.stringify(processedReps));
                const presetWeightsValue = this.form.enable_preset_weights ? 1 : 0;
                formData.append('enable_preset_weights', presetWeightsValue);
                
                // Add thumbnail file if selected
                if (this.$refs.thumbnailInput && this.$refs.thumbnailInput.files[0]) {
                    // New file selected - upload it (works for both create and update)
                    formData.append('thumbnail', this.$refs.thumbnailInput.files[0]);
                } else {
                    // No file selected - determine what to send
                    if (!isEdit) {
                        // Creating new workout - use selected default image or fallback
                        const defaultImagePath = this.defaultWorkoutImages[this.currentDefaultImageIndex] || '/images/closeup.webp';
                        formData.append('thumbnail', defaultImagePath);
                    } else {
                        // Updating existing workout
                        const originalThumbnail = this.initialWorkout?.thumbnail || '';
                        const currentDefaultImage = this.defaultWorkoutImages[this.currentDefaultImageIndex] || '/images/closeup.webp';
                        
                        // If thumbnailUrl is set to a default image path (not blob) and it's different from original
                        if (this.thumbnailUrl && 
                            !this.thumbnailUrl.startsWith('blob:') && 
                            this.thumbnailUrl !== originalThumbnail) {
                            // Check if it's a default image path
                            const isDefaultImage = this.defaultWorkoutImages.some(img => {
                                const imgName = img.split('/').pop();
                                return this.thumbnailUrl.includes(imgName);
                            });
                            
                            if (isDefaultImage) {
                                // User selected a different default image - send it
                                formData.append('thumbnail', this.thumbnailUrl);
                            } else if (this.thumbnailUrl === currentDefaultImage && currentDefaultImage !== originalThumbnail) {
                                // User navigated to a different default image - send it
                                formData.append('thumbnail', currentDefaultImage);
                            }
                            // Otherwise, don't send thumbnail field - backend will keep existing thumbnail
                        }
                        // If thumbnailUrl is null, empty, or same as original, don't send - backend keeps existing
                    }
                }

                // Make API call - use POST with _method=PUT for update (Laravel FormData workaround), POST for create
                let response;
                if (isEdit && workoutId) {
                    // Update existing workout - use POST with _method=PUT for FormData compatibility
                    formData.append('_method', 'PUT');
                    response = await axios.post(`workout/${workoutId}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                } else {
                    // Create new workout
                    response = await axios.post('workout', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
                
                if (response.data.success) {
                    const responseWorkoutId = response.data.id || workoutId;
                    
                    // If selected activities and day are provided, save activities to the day
                    if (this.selectedActivities && this.selectedActivities.length > 0 && this.selectedDay) {
                        try {
                            await this.saveActivitiesToDay(responseWorkoutId, this.selectedDay, this.selectedActivities);
                        } catch (error) {
                            // Still show success but warn about activities
                            this.$swal({
                                icon: 'warning',
                                title: isEdit ? 'Workout Updated' : 'Workout Created',
                                text: `Workout ${isEdit ? 'updated' : 'created'} but failed to assign activities to day. You can assign them manually in Plan Builder.`,
                                timer: 3000,
                            });
                        }
                    }
                    
                    // Show success message
                    const successMessage = this.selectedDay 
                        ? `Workout ${isEdit ? 'updated' : 'created'} successfully! Activities assigned to ${this.selectedDay}.`
                        : `Workout ${isEdit ? 'updated' : 'created'} successfully!`;
                    
                    this.$swal({
                        icon: 'success',
                        title: 'Success!',
                        text: successMessage,
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    
                    // Emit the workout data with selected day info
                    // If response includes exercise data (from update), merge it at top level
                    const workoutData = response.data.exercise 
                        ? { ...response.data.exercise, ...response.data }
                        : { ...response.data };
                    
                    this.$emit("submit", {
                        ...workoutData,
                        id: responseWorkoutId,
                        selectedDay: this.selectedDay,
                        selectedActivities: this.selectedActivities,
                        isUpdate: isEdit
                    });
                    
                    // Close modal
                    this.$emit("close");
                    
                    // Reset form
                    this.resetForm();
                }
            } catch (error) {
                // Handle validation errors from backend (should rarely happen now with frontend validation)
                if (error.response?.data?.errors) {
                    // Store validation errors for display
                    this.validationErrors = error.response.data.errors;
                    
                    // Build error message with field names
                    const errorMessages = [];
                    for (const [field, messages] of Object.entries(this.validationErrors)) {
                        if (Array.isArray(messages) && messages.length > 0) {
                            const fieldLabel = this.getFieldLabel(field);
                            errorMessages.push(`${fieldLabel}: ${messages[0]}`);
                        }
                    }
                    
                    // Scroll to first error field
                    this.$nextTick(() => {
                        try {
                            if (!this._isDestroyed && this.$el && this.$el.nodeType === 1 && typeof this.$el.querySelector === 'function') {
                                const firstErrorField = Object.keys(this.validationErrors)[0];
                                const errorElement = this.$el.querySelector(`.is-invalid`);
                                if (errorElement) {
                                    errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    errorElement.focus();
                                }
                            }
                        } catch (error) {
                            // Silently fail if element is not available
                        }
                    });
                    
                    // Show error message with validation details
                    this.$swal({
                        icon: 'error',
                        title: 'Validation Error',
                        html: `
                            <div style="text-align: left;">
                                <p style="margin-bottom: 10px;"><strong>Please fix the following errors:</strong></p>
                                <ul style="margin-left: 20px;">
                                    ${errorMessages.map(msg => `<li>${msg}</li>`).join('')}
                                </ul>
                            </div>
                        `,
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#ff4040',
                    });
                } else {
                    // Show generic error message for network or server errors
                    this.$swal({
                        icon: 'error',
                        title: 'Error!',
                        text: error.response?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} workout. Please try again.`,
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#ff4040',
                    });
                }
            } finally {
                this.loading = false;
            }
        },
        getFieldLabel(fieldName) {
            const fieldLabels = {
                'exercise_name': 'Name',
                'category': 'Category',
                'duration': 'Duration',
                'level': 'Level',
                'description': 'Description',
                'equipment': 'Equipment',
                'muscles_targeted': 'Target Muscle Groups',
                'calories_burned': 'Calories Burned',
                'instructions': 'Instructions',
                'difficulty': 'Difficulty',
                'rest_period': 'Rest Period',
                'tags': 'Tags',
                'video_link': 'Video Link',
                'days_per_week': 'Days per week',
                'repeat': 'Repeat',
                'rest_seconds': 'Rest (s)',
                'default_reps': 'Reps (x)',
                'enable_preset_weights': 'Enable preset weights',
            };
            return fieldLabels[fieldName] || fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        },
        getEquipmentValue(equipmentValue) {
            // If no value, return empty array
            if (!equipmentValue) {
                return [];
            }
            
            // If it's already an array, validate and return it
            if (Array.isArray(equipmentValue)) {
                return equipmentValue.filter(val => val !== null && val !== undefined && val !== '');
            }
            
            // If it's a JSON string, parse it
            if (typeof equipmentValue === 'string') {
                const trimmed = equipmentValue.trim();
                
                // Try to parse as JSON first
                if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
                    try {
                        const parsed = JSON.parse(trimmed);
                        if (Array.isArray(parsed)) {
                            return parsed.filter(val => val !== null && val !== undefined && val !== '');
                        }
                    } catch (e) {
                        // Not valid JSON, continue to handle as comma-separated
                    }
                }
                
                // Handle comma-separated string
                if (trimmed.includes(',')) {
                    return trimmed.split(',').map(val => val.trim()).filter(val => val !== '');
                }
                
                // Single value string
                if (trimmed !== '') {
                    return [trimmed];
                }
            }
            
            return [];
        },
        getMuscleGroupValue(muscleGroupValue) {
            // If no value, return empty array
            if (!muscleGroupValue) {
                return [];
            }
            
            // If it's already an array, validate and return it
            if (Array.isArray(muscleGroupValue)) {
                return muscleGroupValue.filter(val => val !== null && val !== undefined && val !== '');
            }
            
            // If it's a JSON string, parse it
            if (typeof muscleGroupValue === 'string') {
                const trimmed = muscleGroupValue.trim();
                
                // Try to parse as JSON first
                if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
                    try {
                        const parsed = JSON.parse(trimmed);
                        if (Array.isArray(parsed)) {
                            return parsed.filter(val => val !== null && val !== undefined && val !== '');
                        }
                    } catch (e) {
                        // Not valid JSON, continue to handle as comma-separated
                    }
                }
                
                // Handle comma-separated string
                if (trimmed.includes(',')) {
                    return trimmed.split(',').map(val => val.trim()).filter(val => val !== '');
                }
                
                // Single value string
                if (trimmed !== '') {
                    return [trimmed];
                }
            }
            
            return [];
        },
        
        addWorkout(newWorkout) {
            this.$emit("add-workout", newWorkout);
        },

        async saveActivitiesToDay(workoutId, day, activities) {
            // Prepare exercises data for WorkoutActivityPlan
            const exercises = activities.map(activity => ({
                exercise_id: activity.id || activity.exercise_id,
                exercise_name: activity.name || activity.exercise_name,
                sets: activity.sets || 3,
                reps: activity.reps || 12,
                rest_period: activity.restPeriod || activity.rest_period_seconds || 60
            }));

            const activityPlanData = {
                workout_id: workoutId,
                day: day,
                workout_name: this.form.exercise_name,
                description: this.form.description || '',
                exercises: exercises
            };

            // Save activities to the selected day using WorkoutActivityPlan API
            const response = await axios.post('workout_activity_plan', activityPlanData);
            
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to save activities to day');
            }
            
            return response.data;
        },
        resetForm() {
            this.form = {
                exercise_name: "New Workout",
                category: "full-body",
                duration: 15,
                level: "Beginner",
                calories_burned: 100,
                description: "A comprehensive workout designed to maximize your fitness potential. This routine targets multiple muscle groups and energy systems to help you achieve your fitness goals efficiently.",
                instructions: "1. Warm up for 5 minutes with light cardio\n2. Perform each exercise with proper form\n3. Rest 30-60 seconds between sets\n4. Complete all sets before moving to the next exercise\n5. Cool down with stretching after completing the workout",
                equipment: [],
                muscles_targeted: [],
                difficulty: 5,
                rest_period: null,
                tags: "",
                video_link: "",
                type: "Set based",
                goal: "Lose Weight",
                sets: [
                    { reps: 0, pause: 0 },
                    { reps: 0, pause: 0 },
                    { reps: 0, pause: 0 }
                ],
                // Reset settings fields
                days_per_week: "3 days/week",
                repeat: "1x",
                rest_seconds: null,
                default_reps: [null, null, null, null, null, null, null, null, null],
                enable_preset_weights: false,
            };
            this.selectedDay = null;
            this.thumbnailUrl = null;
            this.videoUrl = null;
            this.currentDefaultImageIndex = 0;
            this.validationErrors = {}; // Clear validation errors
            if (this.$refs.thumbnailInput)
                this.$refs.thumbnailInput.value = null;
            if (this.$refs.videoInput) this.$refs.videoInput.value = null;
            
            // Clear any HTML5 validation states
            this.$nextTick(() => {
                try {
                    if (!this._isDestroyed && this.$el && this.$el.nodeType === 1 && typeof this.$el.querySelector === 'function') {
                        const form = this.$el.querySelector('form');
                        if (form) {
                            form.classList.remove('was-validated');
                        }
                    }
                } catch (error) {
                    // Silently fail if element is not available
                }
            });
        },
        handleImageError(event) {
            event.target.src = '/images/Kettlebell-swing.webp';
        },
        handleThumbnailError(event) {
            // If thumbnail fails to load, try alternative paths
            const currentSrc = event.target.src;
            const defaultPath = '/images/closeup.webp';
            
            // If not already trying to load default image, try it
            if (!currentSrc.includes('/images/closeup.webp')) {
                // Try to load default image
                event.target.src = defaultPath;
            } else {
                // Already tried default, try alternative default images
                const alternatives = [
                    '/images/closeup.webp',
                    // '/images/default-workout.webp',
                    // '/images/default-workout.jpg'
                ];
                
                // Try next alternative if available
                const currentIndex = alternatives.findIndex(alt => currentSrc.includes(alt));
                if (currentIndex < alternatives.length - 1) {
                    event.target.src = alternatives[currentIndex + 1];
                }
            }
        },
        onThumbnailLoad(event) {
            // Image loaded successfully - ensure it's visible
            event.target.style.display = 'block';
            event.target.style.opacity = '1';
        },
        previousDefaultImage() {
            if (this.defaultWorkoutImages.length === 0) return;
            this.currentDefaultImageIndex = (this.currentDefaultImageIndex - 1 + this.defaultWorkoutImages.length) % this.defaultWorkoutImages.length;
            // Set thumbnailUrl to the selected default image
            this.thumbnailUrl = this.defaultWorkoutImages[this.currentDefaultImageIndex];
            // Clear file input if it has a file
            if (this.$refs.thumbnailInput) {
                this.$refs.thumbnailInput.value = null;
            }
        },
        nextDefaultImage() {
            if (this.defaultWorkoutImages.length === 0) return;
            this.currentDefaultImageIndex = (this.currentDefaultImageIndex + 1) % this.defaultWorkoutImages.length;
            // Set thumbnailUrl to the selected default image
            this.thumbnailUrl = this.defaultWorkoutImages[this.currentDefaultImageIndex];
            // Clear file input if it has a file
            if (this.$refs.thumbnailInput) {
                this.$refs.thumbnailInput.value = null;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@use "sass:color";
// ===================================
// Typography
// ===================================
$font-family-heading: "Inter", Arial, sans-serif;
$font-family-base: "Inter", Arial, sans-serif;
$font-size-xs: 0.75rem;
$font-size-sm: 0.875rem;
$font-size-base: 0.813rem;
$font-size-md: 1rem;
$font-size-lg: 1.25rem;
$font-size-xl: 1.5rem;
$font-size-xxl: 2rem;
$line-height-base: 1.6;

// ===================================
// Layout
// ===================================
$topbar-height: 70px;
$topbar-height-mobile: 60px;
$sidebar-left-width: 125px;
$sidebar-left-width-mobile: 90px;
$sidebar-left-secondary-width: 220px;
$sidebar-left-secondary-width-mobile: 190px;
$side-clearance: 10px;

// ===================================
// Core Palette
// ===================================
$color-white: #ffffff;
$color-black: #000000;
$color-background: #f5f5f3;
$color-background-dark: #1c1c1c;
$color-background-sidebar: #252525;
$color-toggle-bg: #e4e7d6;
$color-input-bg: #dededc;
$color-muted: #6a6a6a;
$color-button: #ff4040;
$color-button-hover: #e52e2e;
$color-text: #ffffff;
$color-text-dark: #252525;
$color-heading: #252525;
$color-subtitle: #252525;
$color-link: #007bff;
$color-link-hover: color.adjust($color-link, $lightness: -10%);

// ===================================
// Extended Variants
// ===================================
$color-border: #cccccc;
$color-border-muted: #e0e0e0;
$color-divider: #dcdcdc;
$color-card-bg: #ffffff;
$color-card-bg-dark: #2f2f2f;
$color-card-shadow: rgba(0, 0, 0, 0.05);
$color-shadow-heavy: rgba(0, 0, 0, 0.15);

// ===================================
// Alerts & Status
// ===================================
$color-success: #4caf50;
$color-success-light: #e8f5e9;
$color-warning: #ff9800;
$color-warning-light: #fff3e0;
$color-danger: #f44336;
$color-danger-light: #ffebee;
$color-info: #2196f3;
$color-info-light: #e3f2fd;
$color-badge-bg: #252525;
$color-badge-text: #ffffff;

$status-online: #4caf50;
$status-offline: #9e9e9e;
$status-away: #ff9800;
$status-busy: #f44336;

// ===================================
// Forms
// ===================================
$input-border-color: #ccc;
$input-focus-border: $color-button;
$input-focus-bg: #ffffff;
$input-placeholder-color: #999999;
$input-disabled-bg: #f0f0f0;
$input-disabled-text: #bcbcbc;

// ===================================
// Buttons
// ===================================
$btn-primary-bg: $color-button;
$btn-primary-hover-bg: $color-button-hover;
$btn-secondary-bg: #6c757d;
$btn-secondary-hover-bg: color.adjust($btn-secondary-bg, $lightness: -10%);
$btn-light-bg: #f8f9fa;
$btn-light-hover-bg: color.adjust($btn-light-bg, $lightness: -5%);
$btn-dark-bg: #343a40;
$btn-dark-hover-bg: color.adjust($btn-dark-bg, $lightness: 5%);

// ===================================
// Sidebar
// ===================================
$sidebar-bg: $color-button;
$sidebar-hover-bg: #3a3a3a;
$sidebar-active-bg: $color-button;
$sidebar-text: #e0e0e0;
$sidebar-active-text: $color-white;
$sidebar-muted-text: #a0a0a0;
$sidebar-divider: #3f3f3f;

// ===================================
// Gradients
// ===================================
$gradient-primary: linear-gradient(to right, #ff4040, #e52e2e);
$gradient-dark: linear-gradient(to right, #252525, #111111);
$gradient-info: linear-gradient(to right, #2196f3, #1976d2);

// ===================================
// Accents & Utility
// ===================================
$color-accent: #ff4081;
$color-accent-light: #ff80ab;
$color-highlight: #ffffcc;
$color-disabled: #e0e0e0;
$color-overlay: rgba(0, 0, 0, 0.5);

// ===================================
// Social Brand Colors
// ===================================
$facebook: #3b5998;
$google: #db4437;
$twitter: #1da1f2;
$instagram: #c13584;
$linkedin: #0077b5;
$dribble: #ea4c89;
$youtube: #ff0000;

// ===================================
// Z-indexes
// ===================================
$z-navbar: 1000;
$z-sidebar: 900;
$z-overlay: 1100;
$z-modal: 1200;
$z-tooltip: 1300;

// ===================================
// Breakpoints
// ===================================
$breakpoint-xs: 0;
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;

// ===================================
// Shadow Utilities
// ===================================
$shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.2);

// Theme Colors (override Bootstrap)
$body-bg: $color-background;
$body-color: $color-text;
$primary: $color-button;
$secondary: $color-button;
$light: $color-toggle-bg;
$dark: $color-heading;
$text-muted: $color-muted;
$color-white: $color-text;

// Sidebar
$sidebar-bg: $color-button;
$sidebar-hover-bg: #3a3a3a;
$sidebar-active-bg: $primary;
$sidebar-text: #e0e0e0;
$sidebar-active-text: $color-white;
$sidebar-muted-text: #a0a0a0;
$sidebar-divider: #3f3f3f;

// Accent & Utility
$color-accent: $primary;
$color-divider: #dcdcdc;

// ===================================
// Workout Modal Styles
// ===================================

.workout-modal {
    .modal-content {
        border: none;
        border-radius: 16px;
        box-shadow: $shadow-lg;
        background: $color-white;
        overflow: hidden;
        color: $color-text-dark !important;
    }

    .modal-header {
        background: $gradient-primary;
        color: $color-white;
        border-bottom: none;
        padding: 1.5rem 2rem;

        .modal-title {
            font-family: $font-family-heading;
            font-size: $font-size-xl;
            font-weight: 600;
            margin: 0;
        }

        .close {
            color: $color-white;
            opacity: 0.8;
            transition: opacity 0.2s ease;

            &:hover {
                opacity: 1;
            }
        }
    }

    .modal-body {
        padding: 2rem;
        background: $color-background;
        color: $color-text-dark;

    }

    .modal-dialog {
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }

    &.show .modal-dialog {
        transform: scale(1);
    }

    .modal-body {
        &::-webkit-scrollbar {
            width: 6px;
        }

        &::-webkit-scrollbar-track {
            background: $color-background;
            border-radius: 3px;
        }

        &::-webkit-scrollbar-thumb {
            background: $color-button;
            border-radius: 3px;

            &:hover {
                background: $color-button-hover;
            }
        }
    }
}

.workout-form {
    .form-section {
        background: $color-white;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        box-shadow: $shadow-sm;
        border: 1px solid $color-border-muted;
        color: $color-text-dark;
        transition: box-shadow 0.3s ease;

        &:hover {
            box-shadow: $shadow-md;
        }

        .section-title {
            font-family: $font-family-heading;
            font-size: $font-size-lg;
            font-weight: 600;
            color: $color-heading;
            margin-bottom: 1.25rem;
            padding-bottom: 0.75rem;
            border-bottom: 2px solid $color-divider;
            position: relative;

            &::after {
                content: "";
                position: absolute;
                bottom: -2px;
                left: 0;
                width: 60px;
                height: 2px;
                background: $gradient-primary;
                border-radius: 1px;
            }
        }
    }

    .form-group-modern {
        margin-bottom: 1.25rem;

        label {
            font-family: $font-family-base;
            font-size: $font-size-sm;
            font-weight: 600;
            color: $color-text-dark;
            margin-bottom: 0.5rem;
            display: block;

            .text-danger {
                color: $color-danger !important;
                font-weight: bold;
                margin-left: 2px;
            }
        }
    }

    .form-input-modern,
    .form-select-modern,
    .form-textarea-modern {
        border: 2px solid $color-border-muted;
        border-radius: 8px;
        font-size: $font-size-base;
        font-family: $font-family-base;
        transition: all 0.3s ease;
        box-shadow: none;
        color: $color-text-dark;

        &:focus {
            border-color: $color-button;
            box-shadow: 0 0 0 3px rgba($color-button, 0.1);
            outline: none;
        }

        &::placeholder {
            color: $input-placeholder-color;
        }

        &.is-invalid {
            border-color: $color-danger;
            box-shadow: 0 0 0 3px rgba($color-danger, 0.1);

            &:focus {
                border-color: $color-danger;
                box-shadow: 0 0 0 3px rgba($color-danger, 0.2);
            }
        }
    }

    .invalid-feedback {
        display: block;
        width: 100%;
        margin-top: 0.25rem;
        font-size: $font-size-xs;
        color: $color-danger;
        font-weight: 500;
    }

    .form-textarea-modern {
        resize: vertical;
        min-height: 70px;
    }

    .file-upload-wrapper {
        position: relative;
        border: 2px dashed $color-border;
        border-radius: 12px;
        padding: 2rem;
        text-align: center;
        background: $color-background;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
            border-color: $color-button;
            background: rgba($color-button, 0.02);
        }

        .file-input-modern {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
            z-index: 2;
        }

        .file-upload-overlay {
            position: relative;
            z-index: 1;
            color: $color-muted;

            i {
                font-size: 2rem;
                margin-bottom: 0.5rem;
                display: block;
                color: $color-button;
            }

            span {
                font-size: $font-size-sm;
                font-weight: 500;
            }
        }
    }

    .thumbnail-box {
        @extend .file-upload-wrapper;
        height: 150px;
        padding: 0;
    }

    .file-upload-overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: $color-muted;
        font-size: 1rem;
        pointer-events: none;
        z-index: 1;
    }

    .thumbnail-overlay-preview {
        position: relative;
        height: 100%;
        width: 100%;
        z-index: 2;
    }

    .thumbnail-image {
        object-fit: contain;
        object-position: center;
        height: 100%;
        width: 100%;
        min-height: 150px;
        border-radius: 12px;
        background: $color-background;
        display: block;
    }

    .thumbnail-actions {
        position: absolute;
        top: 8px;
        right: 8px;
        display: flex;
        gap: 5px;
        z-index: 3;

        .btn {
            padding: 0.3rem 0.5rem;
        }
    }

    .thumbnail-overlay-hint {
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        pointer-events: auto;
        cursor: pointer;
        z-index: 3;
        transition: background 0.2s ease;

        &:hover {
            background: rgba(0, 0, 0, 0.85);
        }

        i {
            font-size: 0.8rem;
        }
    }

    .thumbnail-navigation {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem;
        pointer-events: none;
        z-index: 4;

        .btn-navigation {
            pointer-events: auto;
            background: rgba(255, 255, 255, 0.9);
            border: 2px solid rgba(255, 64, 64, 0.8);
            color: $color-button;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

            &:hover {
                background: $color-white;
                border-color: $color-button;
                transform: scale(1.1);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }

            &:active {
                transform: scale(0.95);
            }

            i {
                font-size: 0.875rem;
                font-weight: bold;
            }
        }

        .btn-navigation-left {
            margin-right: auto;
        }

        .btn-navigation-right {
            margin-left: auto;
        }
    }

    .video-preview {
        margin-top: 1rem;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: $shadow-sm;

        .video-player {
            width: 100%;
            max-height: 300px;
            object-fit: cover;
            border-radius: 8px;
        }
    }

    .reps-inputs-row {
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        gap: 0.75rem;
        
        .reps-input {
            min-width: 0;
        }
    }

    .preset-weights-wrapper {
        display: flex !important;
        align-items: center !important;
        gap: 0.75rem;
        flex-wrap: nowrap;
        margin-left: 40px !important;
        padding: 0 !important;
        width: 100%;
        
        .preset-weights-toggle {
            margin: 0 !important;
            padding: 0 !important;
            flex-shrink: 0;
            display: inline-flex !important;
            align-items: center !important;
            position: relative;
            
            // Override Bootstrap's default custom-control styles
            &.custom-control {
                padding-left: 0 !important;
                min-height: auto !important;
                height: auto !important;
                display: inline-flex !important;
            }
            
            &.custom-switch {
                padding-left: 0 !important;
                margin-bottom: 0 !important;
                min-height: auto !important;
                height: auto !important;
                
                .custom-control-input {
                    margin: 0 !important;
                    position: absolute;
                    z-index: -1;
                    opacity: 0;
                }
                
                .custom-control-label {
                    padding-left: 2.25rem !important;
                    padding-top: 0 !important;
                    padding-bottom: 0 !important;
                    padding-right: 0 !important;
                    margin-bottom: 0 !important;
                    margin-top: 0 !important;
                    margin-left: 0 !important;
                    margin-right: 0 !important;
                    display: flex;
                    align-items: center;
                    line-height: 1.5 !important;
                    cursor: pointer;
                    position: relative;
                    min-height: auto !important;
                    vertical-align: middle;
                    
                    &::before {
                        left: 0 !important;
                        top: 0.125rem !important;
                        height: 1.25rem !important;
                        width: 2rem !important;
                        border-radius: 0.625rem !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        position: absolute !important;
                    }
                    
                    &::after {
                        left: 0.25rem !important;
                        top: 0.375rem !important;
                        width: 0.875rem !important;
                        height: 0.875rem !important;
                        border-radius: 50% !important;
                        margin: 0 !important;
                        margin-top: 0 !important;
                        margin-bottom: 0 !important;
                        margin-left: 0 !important;
                        margin-right: 0 !important;
                        padding: 0 !important;
                        position: absolute !important;
                        transform: translateX(0) translateY(0) !important;
                        box-sizing: border-box !important;
                        content: "" !important;
                        pointer-events: none !important;
                    }
                }
            }
            
            .preset-weights-label {
                font-family: $font-family-base;
                font-size: $font-size-sm;
                font-weight: 600;
                color: $color-text-dark;
                margin-left: 0.5rem !important;
                margin-right: 0 !important;
                margin-top: 0 !important;
                margin-bottom: 0 !important;
                padding: 0 !important;
                white-space: nowrap;
                line-height: 1.5 !important;
                cursor: pointer;
                user-select: none;
                display: inline-block;
                vertical-align: middle;
                position: relative;
            }
        }
        
        .preset-weights-info-icon {
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 0.9rem;
            line-height: 1;
            width: 1.25rem;
            height: 1.25rem;
            transition: transform 0.2s ease;
            margin: 0 !important;
            padding: 0 !important;
            
            &:hover {
                transform: scale(1.1);
            }
        }
    }

    .info-icon-red {
        color: $color-button !important;
    }

    .selected-activities-section {
        .selected-activities-info {
            .selected-activities-list {
                max-height: 300px;
                overflow-y: auto;
                padding: 0.5rem 0;

                .selected-activity-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.75rem;
                    margin-bottom: 0.75rem;
                    background: $color-background;
                    border-radius: 8px;
                    border: 1px solid $color-border-muted;
                    transition: all 0.3s ease;

                    &:hover {
                        background: rgba($color-button, 0.02);
                        border-color: rgba($color-button, 0.2);
                    }

                    .activity-item-thumbnail {
                        flex-shrink: 0;
                        width: 60px;
                        height: 60px;
                        border-radius: 8px;
                        overflow: hidden;
                        background: #f8f9fa;

                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: contain;
                            object-position: center;
                        }
                    }

                    .activity-item-info {
                        flex: 1;
                        min-width: 0;

                        .activity-item-name {
                            font-size: $font-size-sm;
                            font-weight: 600;
                            color: $color-text-dark;
                            margin: 0 0 0.5rem 0;
                            line-height: 1.3;
                        }

                        .activity-item-meta {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 0.5rem;

                            .meta-badge {
                                font-size: $font-size-xs;
                                padding: 0.25rem 0.5rem;
                                background: $color-white;
                                border-radius: 6px;
                                color: $color-muted;
                                font-weight: 500;
                                border: 1px solid $color-border-muted;
                            }
                        }
                    }
                }
            }
        }
    }

    .form-actions {
        text-align: right;

        .submit-btn {
            background: $gradient-primary;
            border: none;
            border-radius: 8px;
            padding: 0.75rem 2rem;
            font-size: $font-size-base;
            font-weight: 600;
            color: $color-white;
            transition: all 0.3s ease;
            box-shadow: $shadow-sm;

            &:hover {
                transform: translateY(-2px);
                box-shadow: $shadow-md;
            }

            &:active {
                transform: translateY(0);
            }

            i {
                margin-right: 0.5rem;
            }
        }
    }
}

// Responsive
@media (max-width: $breakpoint-md) {
    .workout-form {
        .form-section {
            padding: 1rem;
            margin-bottom: 1rem;
        }

        .form-actions {
            padding: 1rem;
            text-align: center;

            .submit-btn {
                width: 100%;
            }
        }

        .reps-inputs-row {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .workout-modal .modal-body {
        padding: 1rem;
    }
}
</style>