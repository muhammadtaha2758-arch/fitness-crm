<template>
    <div class="activity-list-page">
        <!-- Modern Header -->
        <div class="page-header">
            <div class="header-content">
                <h1 class="page-title">Activity Library</h1>
                <p class="page-subtitle">
                    Discover and select exercises for your workout routine
                </p>
            </div>
            <div class="header-actions">
                <!-- Delete Selected Activities -->
                <b-button 
                    v-if="selectedForDelete.length > 0"
                    variant="danger" 
                    class="btn-modern btn-delete-selected mr-2" 
                    @click="confirmBulkDelete"
                    :disabled="selectedForDelete.length === 0"
                >
                    <i class="fas fa-trash-alt mr-2"></i>
                    Delete Selected ({{ selectedForDelete.length }})
                </b-button>
                <!-- Create Workout from Selected Activities -->
                <b-button 
                    variant="success" 
                    class="btn-modern btn-create-workout mr-2" 
                    @click="openCreateWorkoutModal"
                    :disabled="selectedActivities.length === 0"
                >
                    <i class="fas fa-dumbbell mr-2"></i>
                    Create Workout ({{ selectedActivities.length }})
                </b-button>
                <!-- Create Activity -->
                <b-button variant="primary" class="btn-modern" @click="openCreateActivityModal">
                    <i class="fas fa-plus mr-2"></i>
                    Create Activity
                </b-button>
            </div>
        </div>

        <!-- Modern Filters Card -->
        <b-card class="filters-card-compact mb-3">
            <!-- Title Row -->
            <div class="filters-header-compact">
                <div class="filters-title-section">
                    <h4 class="filters-title-compact">
                        <i class="fas fa-filter"></i>
                        Filter Activities
                    </h4>
                    <span class="results-count-compact">
                        {{ filteredActivities.length }} activities
                    </span>
                </div>
                <div class="filters-actions-compact">
                    <b-button
                        variant="outline-secondary"
                        size="sm"
                        class="btn-clear-compact"
                        @click="clearFilters"
                    >
                        <i class="fas fa-times"></i>
                        Clear
                    </b-button>
                </div>
            </div>
            
            <!-- Filters Row -->
            <div class="filters-content-compact">
                <div class="filter-group-compact">
                    <label class="filter-label-compact">
                        <i class="fas fa-chevron-down"></i>
                        Category
                    </label>
                    <b-form-select
                        v-model="filters.category"
                        :options="categoryOptions"
                        class="select-compact"
                        size="sm"
                    />
                </div>
                <div class="filter-group-compact">
                    <label class="filter-label-compact">
                        <i class="fas fa-chevron-down"></i>
                        Muscle Group
                    </label>
                    <b-form-select
                        v-model="filters.muscle"
                        :options="muscleOptions"
                        class="select-compact"
                        size="sm"
                    />
                </div>
                <div class="filter-group-compact">
                    <label class="filter-label-compact">
                        <i class="fas fa-chevron-down"></i>
                        Difficulty
                    </label>
                    <b-form-select
                        v-model="filters.difficulty"
                        :options="difficultyOptions"
                        class="select-compact"
                        size="sm"
                    />
                </div>
            </div>
        </b-card>

        <!-- Activities Container -->
        <div class="activities-container">
            <div class="activities-header">
                <h3 class="activities-title">
                    <i class="fas fa-dumbbell mr-2"></i>
                    Available Activities
                </h3>
                <div class="view-toggle">
                    <b-button-group size="sm">
                        <!-- View Toggle Buttons -->
                        <b-button
                            variant="outline-primary"
                            class="btn-outline-modern"
                            :class="{ active: viewMode === 'list' }"
                            @click="setViewMode('list')"
                        >
                            <i class="fas fa-list"></i>
                        </b-button>
                        <b-button
                            variant="outline-primary"
                            class="btn-outline-modern"
                            :class="{ active: viewMode === 'grid' }"
                            @click="setViewMode('grid')"
                        >
                            <i class="fas fa-th-large"></i>
                        </b-button>
                    </b-button-group>
                </div>
            </div>

            <!-- Activities Grid -->
            <div
                class="activities-grid"
                :class="{ 'list-view': viewMode === 'list' }"
            >
                <div
                    v-for="activity in paginatedActivities"
                    :key="activity.id"
                    class="activity-card"
                    :class="{
                        selected: selectedActivities.includes(activity.id),
                        'selected-for-delete': selectedForDelete.includes(activity.id),
                        'list-item': viewMode === 'list',
                    }"
                    @click="toggleSelection(activity)"
                >
                    <!-- Delete Selection Checkbox -->
                    <div class="delete-checkbox-wrapper" @click.stop>
                        <b-form-checkbox
                            :checked="selectedForDelete.includes(activity.id)"
                            @change="toggleDeleteSelection(activity)"
                            class="delete-checkbox"
                            :title="selectedForDelete.includes(activity.id) ? 'Deselect for deletion' : 'Select for deletion'"
                        >
                        </b-form-checkbox>
                    </div>
                    <!-- Activity Thumbnail -->
                    <div class="activity-thumbnail-wrapper">
                        <div class="activity-thumbnail">
                            <img
                                :src="activity.thumbnail || '/images/Kettlebell-swing.webp'"
                                :alt="activity.name"
                                @error="handleImageError"
                                class="thumbnail-image"
                            />
                            <!-- Difficulty Badge Overlay (Grid View Only) -->
                            <div v-if="viewMode === 'grid'" class="thumbnail-overlay">
                                <b-badge
                                    :variant="getBadgeColor(activity.difficulty)"
                                    class="difficulty-badge-overlay-grid"
                                >
                                    {{ activity.difficulty }}
                                </b-badge>
                            </div>
                        </div>
                        <!-- Difficulty Badge Below Thumbnail (List View Only) -->
                        <div v-if="viewMode === 'list'">
                            <b-badge
                                :variant="getBadgeColor(activity.difficulty)"
                                class="difficulty-badge-list"
                            >
                                {{ activity.difficulty }}
                            </b-badge>
                        </div>
                    </div>

                    <div class="activity-card-body">
                        <h4 class="activity-name">{{ activity.name }}</h4>
                        <div class="activity-meta">
                            <div class="meta-item">
                                <i class="fas fa-tag meta-icon"></i>
                                <span>{{ activity.category }}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-dumbbell meta-icon"></i>
                                <span>{{ activity.muscle }}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-clock meta-icon"></i>
                                <span>{{ activity.duration }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="activity-card-footer">
                        <div class="activity-card-actions">
                            <!-- Edit Activity Button in Cards -->
                            <b-button
                                variant="outline-primary"
                                size="sm"
                                class="btn-outline-modern btn-sm view-details-btn"
                                @click.stop="openViewActivityModal(activity)"
                                :title="'Edit ' + activity.name"
                            >
                                <i class="fas fa-edit"></i>
                            </b-button>
                            <!-- Delete Activity Button -->
                            <b-button
                                variant="outline-danger"
                                size="sm"
                                class="btn-outline-modern btn-sm delete-btn"
                                @click.stop="confirmDeleteActivity(activity)"
                                :title="'Delete ' + activity.name"
                            >
                                <i class="fas fa-trash-alt"></i>
                            </b-button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="pagination-container">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="filteredActivities.length"
                    :per-page="itemsPerPage"
                    :page-options="[12, 24, 36, 48]"
                    align="center"
                    class="pagination-modern"
                    @change="onPageChange"
                >
                    <template #first-text>
                        <i class="fas fa-angle-double-left"></i>
                    </template>
                    <template #prev-text>
                        <i class="fas fa-angle-left"></i>
                    </template>
                    <template #next-text>
                        <i class="fas fa-angle-right"></i>
                    </template>
                    <template #last-text>
                        <i class="fas fa-angle-double-right"></i>
                    </template>
                </b-pagination>
                
                <div class="pagination-info">
                    <span class="pagination-text">
                        Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredActivities.length }} activities
                    </span>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredActivities.length === 0" class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>No activities found</h3>
                <p>Try adjusting your filters to find more activities</p>
                <b-button
                    variant="primary"
                    class="btn-modern"
                    @click="clearFilters"
                >
                    Clear All Filters
                </b-button>
            </div>
        </div>
        <!-- Selected Activities Modal -->
        <b-modal
            v-model="showSelectedModal"
            size="md"
            title="Selected Activities"
            centered
            hide-footer
        >
            <div v-if="selectedActivitiesList.length > 0">
                <div class="selected-activities-list">
                    <div
                        v-for="activity in selectedActivitiesList"
                        :key="activity.id"
                        class="selected-activity-item"
                    >
                        <div class="activity-item-content">
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
                                    <span class="meta-badge">{{ activity.muscle }}</span>
                                    <span class="meta-badge">{{ activity.difficulty }}</span>
                                </div>
                            </div>
                            <b-button
                                variant="outline-danger"
                                size="sm"
                                class="remove-btn"
                                @click="removeActivity(activity.id)"
                            >
                                <i class="fas fa-times"></i>
                            </b-button>
                        </div>
                    </div>
                </div>
                <div class="modal-actions mt-3">
                    <b-button
                        variant="success"
                        class="btn-modern btn-create-workout-modal w-100 mb-2"
                        @click="openCreateWorkoutModal"
                    >
                        <i class="fas fa-dumbbell mr-2"></i>
                        Create Workout from Selected ({{ selectedActivities.length }})
                    </b-button>
                    <b-button
                        variant="outline-secondary"
                        class="btn-outline-modern w-100"
                        @click="clearSelection"
                    >
                        <i class="fas fa-times mr-2"></i>
                        Clear Selection
                    </b-button>
                </div>
            </div>
            <div v-else class="text-center py-4">
                <i class="fas fa-inbox text-muted" style="font-size: 2rem"></i>
                <p class="mt-2">No activities selected</p>
            </div>
        </b-modal>
        <ActivityModal
            v-if="showActivityModal"
            :visible="showActivityModal"
            :initialWorkout="selectedActivity"
            @close="closeActivityModal"
            @submit="handleActivitySubmit"
        />
        <WorkoutModal
            v-if="showWorkoutModal"
            :visible="showWorkoutModal"
            :selectedActivities="selectedActivitiesForWorkout"
            @close="closeWorkoutModal"
            @submit="handleWorkoutSubmit"
        />
    </div>
</template>

<script>
import ActivityModal from "../../../../components/ActivityModal.vue";
import WorkoutModal from "../../../../components/WorkoutModal.vue";
import axios from 'axios'; // Added axios import

export default {
    components: {
        ActivityModal,
        WorkoutModal,
    },
    data() {
        return {
            selectedActivities: [],
            selectedForDelete: [],
            filters: {
                category: "",
                muscle: "",
                difficulty: "",
            },
            viewMode: "grid", // 'grid' or 'list'
            currentPage: 1,
            itemsPerPage: 24,
            showActivityModal: false,
            showWorkoutModal: false,
            showSelectedModal: false,
            selectedActivity: null,
            dummyActivities: [
                {
                    id: 1,
                    name: "Push Ups",
                    category: "Strength",
                    muscle: "Chest",
                    difficulty: "Beginner",
                    duration: "30 sec",
                },
                {
                    id: 2,
                    name: "Jumping Jacks",
                    category: "Cardio",
                    muscle: "Full Body",
                    difficulty: "Beginner",
                    duration: "60 sec",
                },
                {
                    id: 3,
                    name: "Plank",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 4,
                    name: "Squats",
                    category: "Strength",
                    muscle: "Legs",
                    difficulty: "Beginner",
                    duration: "45 sec",
                },
                {
                    id: 5,
                    name: "Burpees",
                    category: "Cardio",
                    muscle: "Full Body",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 6,
                    name: "Lunges",
                    category: "Strength",
                    muscle: "Legs",
                    difficulty: "Intermediate",
                    duration: "40 sec",
                },
                {
                    id: 7,
                    name: "Sit Ups",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Beginner",
                    duration: "30 sec",
                },
                {
                    id: 8,
                    name: "Mountain Climbers",
                    category: "Cardio",
                    muscle: "Core",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 9,
                    name: "Bench Press",
                    category: "Strength",
                    muscle: "Chest",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 10,
                    name: "Deadlift",
                    category: "Strength",
                    muscle: "Back",
                    difficulty: "Advanced",
                    duration: "90 sec",
                },
                {
                    id: 11,
                    name: "Bicycle Crunches",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Intermediate",
                    duration: "30 sec",
                },
                {
                    id: 12,
                    name: "High Knees",
                    category: "Cardio",
                    muscle: "Full Body",
                    difficulty: "Beginner",
                    duration: "60 sec",
                },
                {
                    id: 13,
                    name: "Tricep Dips",
                    category: "Strength",
                    muscle: "Arms",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 14,
                    name: "Russian Twists",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Intermediate",
                    duration: "30 sec",
                },
                {
                    id: 15,
                    name: "Jump Rope",
                    category: "Cardio",
                    muscle: "Full Body",
                    difficulty: "Beginner",
                    duration: "60 sec",
                },
                {
                    id: 16,
                    name: "Leg Raises",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Intermediate",
                    duration: "30 sec",
                },
                {
                    id: 17,
                    name: "Shoulder Press",
                    category: "Strength",
                    muscle: "Shoulders",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 18,
                    name: "Bicep Curls",
                    category: "Strength",
                    muscle: "Arms",
                    difficulty: "Beginner",
                    duration: "30 sec",
                },
                {
                    id: 19,
                    name: "Box Jumps",
                    category: "Cardio",
                    muscle: "Legs",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 20,
                    name: "Plank Jacks",
                    category: "Core",
                    muscle: "Full Body",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 21,
                    name: "Kettlebell Swings",
                    category: "Strength",
                    muscle: "Full Body",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 22,
                    name: "Wall Sit",
                    category: "Strength",
                    muscle: "Legs",
                    difficulty: "Intermediate",
                    duration: "30 sec",
                },
                {
                    id: 23,
                    name: "Flutter Kicks",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Beginner",
                    duration: "30 sec",
                },
                {
                    id: 24,
                    name: "Side Lunges",
                    category: "Strength",
                    muscle: "Legs",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 25,
                    name: "Treadmill Sprints",
                    category: "Cardio",
                    muscle: "Full Body",
                    difficulty: "Advanced",
                    duration: "30 sec",
                },
                {
                    id: 26,
                    name: "Hip Thrusts",
                    category: "Strength",
                    muscle: "Glutes",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 27,
                    name: "Plank Shoulder Taps",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Beginner",
                    duration: "30 sec",
                },
                {
                    id: 28,
                    name: "Battle Ropes",
                    category: "Cardio",
                    muscle: "Full Body",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 29,
                    name: "Goblet Squats",
                    category: "Strength",
                    muscle: "Legs",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 30,
                    name: "Medicine Ball Slams",
                    category: "Cardio",
                    muscle: "Full Body",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 31,
                    name: "Pull Ups",
                    category: "Strength",
                    muscle: "Back",
                    difficulty: "Advanced",
                    duration: "45 sec",
                },
                {
                    id: 32,
                    name: "Diamond Push Ups",
                    category: "Strength",
                    muscle: "Arms",
                    difficulty: "Advanced",
                    duration: "45 sec",
                },
                {
                    id: 33,
                    name: "Jump Squats",
                    category: "Cardio",
                    muscle: "Legs",
                    difficulty: "Intermediate",
                    duration: "60 sec",
                },
                {
                    id: 34,
                    name: "Side Plank",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 35,
                    name: "Inchworm Walk",
                    category: "Strength",
                    muscle: "Full Body",
                    difficulty: "Intermediate",
                    duration: "60 sec",
                },
                {
                    id: 36,
                    name: "Bear Crawl",
                    category: "Cardio",
                    muscle: "Full Body",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 37,
                    name: "Reverse Crunches",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Beginner",
                    duration: "30 sec",
                },
                {
                    id: 38,
                    name: "Wall Balls",
                    category: "Strength",
                    muscle: "Full Body",
                    difficulty: "Intermediate",
                    duration: "60 sec",
                },
                {
                    id: 39,
                    name: "Burpee Pull Ups",
                    category: "Cardio",
                    muscle: "Full Body",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 40,
                    name: "Pike Push Ups",
                    category: "Strength",
                    muscle: "Shoulders",
                    difficulty: "Advanced",
                    duration: "45 sec",
                },
                {
                    id: 41,
                    name: "Single Leg Deadlift",
                    category: "Strength",
                    muscle: "Legs",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 42,
                    name: "Plank to Downward Dog",
                    category: "Core",
                    muscle: "Full Body",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 43,
                    name: "Jump Rope Double Unders",
                    category: "Cardio",
                    muscle: "Full Body",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 44,
                    name: "Renegade Rows",
                    category: "Strength",
                    muscle: "Back",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 45,
                    name: "Mountain Climber Burpees",
                    category: "Cardio",
                    muscle: "Full Body",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 46,
                    name: "Hollow Hold",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 47,
                    name: "Pistol Squats",
                    category: "Strength",
                    muscle: "Legs",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 48,
                    name: "Handstand Push Ups",
                    category: "Strength",
                    muscle: "Shoulders",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 49,
                    name: "L-Sit Hold",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Advanced",
                    duration: "45 sec",
                },
                {
                    id: 50,
                    name: "Muscle Ups",
                    category: "Strength",
                    muscle: "Full Body",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 51,
                    name: "Turkish Get Up",
                    category: "Strength",
                    muscle: "Full Body",
                    difficulty: "Advanced",
                    duration: "90 sec",
                },
                {
                    id: 52,
                    name: "Windshield Wipers",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Advanced",
                    duration: "45 sec",
                },
                {
                    id: 53,
                    name: "Dragon Flags",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 54,
                    name: "Planche Hold",
                    category: "Strength",
                    muscle: "Arms",
                    difficulty: "Advanced",
                    duration: "45 sec",
                },
                {
                    id: 55,
                    name: "Front Lever",
                    category: "Strength",
                    muscle: "Back",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 56,
                    name: "Back Lever",
                    category: "Strength",
                    muscle: "Back",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 57,
                    name: "Human Flag",
                    category: "Strength",
                    muscle: "Full Body",
                    difficulty: "Advanced",
                    duration: "45 sec",
                },
                {
                    id: 58,
                    name: "One Arm Pull Up",
                    category: "Strength",
                    muscle: "Back",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 59,
                    name: "One Arm Push Up",
                    category: "Strength",
                    muscle: "Chest",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 60,
                    name: "One Arm Handstand",
                    category: "Strength",
                    muscle: "Shoulders",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 61,
                    name: "Ring Muscle Up",
                    category: "Strength",
                    muscle: "Full Body",
                    difficulty: "Advanced",
                    duration: "90 sec",
                },
                {
                    id: 62,
                    name: "Ring Dips",
                    category: "Strength",
                    muscle: "Arms",
                    difficulty: "Advanced",
                    duration: "45 sec",
                },
                {
                    id: 63,
                    name: "Ring Rows",
                    category: "Strength",
                    muscle: "Back",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 64,
                    name: "Ring Push Ups",
                    category: "Strength",
                    muscle: "Chest",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 65,
                    name: "Ring Support Hold",
                    category: "Strength",
                    muscle: "Arms",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 66,
                    name: "Ring L-Sit",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Advanced",
                    duration: "45 sec",
                },
                {
                    id: 67,
                    name: "Ring Tuck Front Lever",
                    category: "Strength",
                    muscle: "Back",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 68,
                    name: "Ring Tuck Back Lever",
                    category: "Strength",
                    muscle: "Back",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 69,
                    name: "Ring Skin the Cat",
                    category: "Strength",
                    muscle: "Back",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 70,
                    name: "Ring Inverted Hang",
                    category: "Strength",
                    muscle: "Back",
                    difficulty: "Advanced",
                    duration: "45 sec",
                },
                {
                    id: 71,
                    name: "Ring Pull Ups",
                    category: "Strength",
                    muscle: "Back",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 72,
                    name: "Ring Chin Ups",
                    category: "Strength",
                    muscle: "Back",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 73,
                    name: "Ring Australian Pull Ups",
                    category: "Strength",
                    muscle: "Back",
                    difficulty: "Beginner",
                    duration: "45 sec",
                },
                {
                    id: 74,
                    name: "Ring Pike Push Ups",
                    category: "Strength",
                    muscle: "Shoulders",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 75,
                    name: "Ring Tricep Extensions",
                    category: "Strength",
                    muscle: "Arms",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 76,
                    name: "Ring Bicep Curls",
                    category: "Strength",
                    muscle: "Arms",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 77,
                    name: "Ring Face Pulls",
                    category: "Strength",
                    muscle: "Shoulders",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 78,
                    name: "Ring Y-Raises",
                    category: "Strength",
                    muscle: "Shoulders",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 79,
                    name: "Ring T-Raises",
                    category: "Strength",
                    muscle: "Shoulders",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 80,
                    name: "Ring W-Raises",
                    category: "Strength",
                    muscle: "Shoulders",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 81,
                    name: "Ring L-Raises",
                    category: "Strength",
                    muscle: "Shoulders",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 82,
                    name: "Ring I-Raises",
                    category: "Strength",
                    muscle: "Shoulders",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 83,
                    name: "Ring Hanging Knee Raises",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 84,
                    name: "Ring Hanging Leg Raises",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Advanced",
                    duration: "45 sec",
                },
                {
                    id: 85,
                    name: "Ring Hanging Windshield Wipers",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 86,
                    name: "Ring Hanging Pike",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Advanced",
                    duration: "45 sec",
                },
                {
                    id: 87,
                    name: "Ring Hanging Tuck",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Intermediate",
                    duration: "45 sec",
                },
                {
                    id: 88,
                    name: "Ring Hanging Straddle",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Advanced",
                    duration: "45 sec",
                },
                {
                    id: 89,
                    name: "Ring Hanging Full",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 90,
                    name: "Ring Hanging Dragon Flag",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 91,
                    name: "Ring Hanging L-Sit",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Advanced",
                    duration: "45 sec",
                },
                {
                    id: 92,
                    name: "Ring Hanging V-Sit",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Advanced",
                    duration: "45 sec",
                },
                {
                    id: 93,
                    name: "Ring Hanging Manna",
                    category: "Core",
                    muscle: "Abs",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 94,
                    name: "Ring Hanging Planche",
                    category: "Strength",
                    muscle: "Arms",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 95,
                    name: "Ring Hanging Front Lever",
                    category: "Strength",
                    muscle: "Back",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 96,
                    name: "Ring Hanging Back Lever",
                    category: "Strength",
                    muscle: "Back",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 97,
                    name: "Ring Hanging Iron Cross",
                    category: "Strength",
                    muscle: "Full Body",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 98,
                    name: "Ring Hanging Maltese",
                    category: "Strength",
                    muscle: "Full Body",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 99,
                    name: "Ring Hanging Victorian",
                    category: "Strength",
                    muscle: "Full Body",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
                {
                    id: 100,
                    name: "Ring Hanging Inverted Cross",
                    category: "Strength",
                    muscle: "Full Body",
                    difficulty: "Advanced",
                    duration: "60 sec",
                },
            ],
        };
    },
    computed: {
        filteredActivities() {
            const activities = Array.isArray(this.dummyActivities) ? this.dummyActivities : [];
            return activities.filter((activity) => {
                return (
                    (!this.filters.category ||
                        activity.category === this.filters.category) &&
                    (!this.filters.muscle ||
                        activity.muscle === this.filters.muscle) &&
                    (!this.filters.difficulty ||
                        activity.difficulty === this.filters.difficulty)
                );
            });
        },
        paginatedActivities() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredActivities.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredActivities.length / this.itemsPerPage);
        },
        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage;
        },
        endIndex() {
            return Math.min(this.currentPage * this.itemsPerPage, this.filteredActivities.length);
        },
        categoryOptions() {
            return [
                { value: "", text: "Choose Category" },
                { value: "Strength", text: "Strength" },
                { value: "Cardio", text: "Cardio" },
                { value: "Core", text: "Core" },
            ];
        },
        muscleOptions() {
            return [
                { value: "", text: "Choose Muscle Group" },
                { value: "Chest", text: "Chest" },
                { value: "Legs", text: "Legs" },
                { value: "Abs", text: "Abs" },
                { value: "Back", text: "Back" },
                { value: "Full Body", text: "Full Body" },
                { value: "Core", text: "Core" },
                { value: "Shoulders", text: "Shoulders" },
                { value: "Arms", text: "Arms" },
            ];
        },
        difficultyOptions() {
            return [
                { value: "", text: "Choose Difficulty" },
                { value: "Beginner", text: "Beginner" },
                { value: "Intermediate", text: "Intermediate" },
                { value: "Advanced", text: "Advanced" },
            ];
        },
        selectedActivitiesList() {
            const activities = Array.isArray(this.dummyActivities) ? this.dummyActivities : [];
            return activities.filter(activity => 
                this.selectedActivities.includes(activity.id)
            );
        },
        selectedActivitiesForWorkout() {
            // Return full activity objects for selected activities
            const activities = Array.isArray(this.dummyActivities) ? this.dummyActivities : [];
            return activities.filter(activity => 
                this.selectedActivities.includes(activity.id)
            );
        },
    },
    methods: {
        toggleSelection(item) {
            const exists = this.selectedActivities.includes(item.id);
            if (exists) {
                this.selectedActivities = this.selectedActivities.filter(
                    (id) => id !== item.id
                );
            } else {
                this.selectedActivities.push(item.id);
            }
            // Show modal after toggling selection
            if (this.selectedActivities.length > 0) {
                this.showSelectedModal = true;
            } else {
                this.showSelectedModal = false;
            }
        },
        removeActivity(activityId) {
            this.selectedActivities = this.selectedActivities.filter(
                (id) => id !== activityId
            );
            // Close modal if no activities selected
            if (this.selectedActivities.length === 0) {
                this.showSelectedModal = false;
            }
        },
        getBadgeColor(difficulty) {
            switch (difficulty) {
                case "Beginner":
                    return "success";
                case "Intermediate":
                    return "warning";
                case "Advanced":
                    return "danger";
                default:
                    return "secondary";
            }
        },
        clearFilters() {
            this.filters = {
                category: null,
                muscle: null,
                difficulty: null,
            };
            this.currentPage = 1; // Reset pagination
        },
        clearSelection() {
            this.selectedActivities = [];
            this.showSelectedModal = false;
        },
        viewActivity(activity) {
            console.log("Viewing activity:", activity);
        },
        setViewMode(mode) {
            this.viewMode = mode;
        },
        onPageChange(page) {
            this.currentPage = page;
        },
        openCreateActivityModal() {
            this.selectedActivity = null;
            this.showActivityModal = true;
        },
        openCreateWorkoutModal() {
            if (this.selectedActivities.length === 0) {
                this.$bvToast.toast('Please select at least one activity first', {
                    title: 'No Activities Selected',
                    variant: 'warning',
                    solid: true,
                });
                return;
            }
            // Close the selected activities modal
            this.showSelectedModal = false;
            // Open the workout modal
            this.showWorkoutModal = true;
        },
        closeWorkoutModal() {
            this.showWorkoutModal = false;
        },
        async handleWorkoutSubmit(workoutData) {
            try {
                this.closeWorkoutModal();
                
                // Refresh the activities list from the API
                await this.loadActivities();
                
                // Emit event to parent component (WorkoutLibrary) to refresh workouts
                this.$emit('workout-created', workoutData);
                
                // Show success message
                this.$bvToast.toast('Workout created successfully!', {
                    title: 'Success',
                    variant: 'success',
                    solid: true,
                    autoHideDelay: 1000
                });
                
                // Optionally clear selection after creating workout
                // this.selectedActivities = [];
            } catch (error) {
                console.error('Error handling workout submit:', error);
                
                // Show error message
                this.$bvToast.toast('Failed to create workout. Please try again.', {
                    title: 'Error',
                    variant: 'danger',
                    solid: true,
                    autoHideDelay: 1000
                });
            }
        },
        async openViewActivityModal(activity) {
            try {
                // Fetch the full activity details from the API using the exercise_id
                const response = await axios.get(`workout_exercises/${activity.id}`);
                if (response.data.success) {
                    this.selectedActivity = response.data.exercise;
                    this.showActivityModal = true;
                } else {
                    // Fallback to the activity data we already have
                    this.selectedActivity = { ...activity };
                    this.showActivityModal = true;
                }
            } catch (error) {
                console.error('Error fetching activity details:', error);
                // Fallback to the activity data we already have
                this.selectedActivity = { ...activity };
                this.showActivityModal = true;
            }
        },
        closeActivityModal() {
            this.selectedActivity = null;
            this.showActivityModal = false;
        },
        async handleActivitySubmit(activityData) {
            try {
                this.closeActivityModal();
                
                // Refresh the activities list from the API
                await this.loadActivities();
                
                // Show success message based on whether it's a create or update
                const message = this.selectedActivity ? 'Activity updated successfully!' : 'Activity created successfully!';
                this.$bvToast.toast(message, {
                    title: 'Success',
                    variant: 'success',
                    solid: true,
                    autoHideDelay: 1000
                });
            } catch (error) {
                console.error('Error handling activity submit:', error);
                
                // Show error message
                const message = this.selectedActivity ? 'Failed to update activity. Please try again.' : 'Failed to create activity. Please try again.';
                this.$bvToast.toast(message, {
                    title: 'Error',
                    variant: 'danger',
                    solid: true,
                    autoHideDelay: 1000
                });
            }
        },
        
        async confirmDeleteActivity(activity) {
            // Show confirmation dialog using SweetAlert2
            const result = await this.$swal({
                title: 'Are you sure?',
                text: `Do you want to delete "${activity.name}"? This action cannot be undone.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                reverseButtons: true
            });
            
            if (result.isConfirmed) {
                await this.deleteActivity(activity);
            }
        },
        
        async deleteActivity(activity) {
            try {
                // Show loading toast
                const loadingToast = this.$bvToast.toast('Deleting activity...', {
                    title: 'Please wait',
                    variant: 'info',
                    solid: true,
                    autoHideDelay: 0,
                    noCloseButton: false
                });
                
                // Call delete API
                const response = await axios.delete(`workout_exercises/${activity.id}`);
                
                // Close loading toast
                this.$bvToast.hide(loadingToast);
                
                if (response.data.success) {
                    // Remove from selected activities if it was selected
                    this.selectedActivities = this.selectedActivities.filter(
                        id => id !== activity.id
                    );
                    
                    // Refresh the activities list
                    await this.loadActivities();
                    
                    // Show success message
                    this.$swal({
                        icon: 'success',
                        title: 'Deleted!',
                        text: `"${activity.name}" has been deleted successfully.`,
                        timer: 2000,
                        showConfirmButton: false
                    });
                } else {
                    throw new Error('Delete operation failed');
                }
            } catch (error) {
                console.error('Error deleting activity:', error);
                
                // Show error message
                this.$swal({
                    icon: 'error',
                    title: 'Error!',
                    text: error.response?.data?.message || `Failed to delete "${activity.name}". Please try again.`,
                });
            }
        },
        
        toggleDeleteSelection(activity) {
            const index = this.selectedForDelete.indexOf(activity.id);
            if (index > -1) {
                this.selectedForDelete.splice(index, 1);
            } else {
                this.selectedForDelete.push(activity.id);
            }
        },
        
        async confirmBulkDelete() {
            if (this.selectedForDelete.length === 0) {
                return;
            }
            
            const count = this.selectedForDelete.length;
            const activityText = count === 1 ? 'activity' : 'activities';
            
            // Show confirmation dialog using SweetAlert2
            const result = await this.$swal({
                title: 'Are you sure?',
                text: `Do you want to delete ${count} ${activityText}? This action cannot be undone.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: `Yes, delete ${count} ${activityText}!`,
                cancelButtonText: 'Cancel',
                reverseButtons: true
            });
            
            if (result.isConfirmed) {
                await this.bulkDeleteActivities();
            }
        },
        
        async bulkDeleteActivities() {
            if (this.selectedForDelete.length === 0) {
                return;
            }
            
            try {
                const count = this.selectedForDelete.length;
                
                // Show loading toast
                const loadingToast = this.$bvToast.toast(`Deleting ${count} activities...`, {
                    title: 'Please wait',
                    variant: 'info',
                    solid: true,
                    autoHideDelay: 0,
                    noCloseButton: false
                });
                
                // Call bulk delete API
                const response = await axios.post('workout_exercises/delete/by_selection', {
                    selectedIds: this.selectedForDelete
                });
                
                // Close loading toast
                this.$bvToast.hide(loadingToast);
                
                if (response.data.success) {
                    // Remove from selected activities if they were selected
                    this.selectedActivities = this.selectedActivities.filter(
                        id => !this.selectedForDelete.includes(id)
                    );
                    
                    // Clear delete selection
                    const deletedCount = this.selectedForDelete.length;
                    this.selectedForDelete = [];
                    
                    // Refresh the activities list
                    await this.loadActivities();
                    
                    // Show success message
                    const activityText = deletedCount === 1 ? 'activity' : 'activities';
                    this.$swal({
                        icon: 'success',
                        title: 'Deleted!',
                        text: `${deletedCount} ${activityText} have been deleted successfully.`,
                        timer: 2000,
                        showConfirmButton: false
                    });
                } else {
                    throw new Error('Bulk delete operation failed');
                }
            } catch (error) {
                console.error('Error deleting activities:', error);
                
                // Show error message
                const count = this.selectedForDelete.length;
                const activityText = count === 1 ? 'activity' : 'activities';
                this.$swal({
                    icon: 'error',
                    title: 'Error!',
                    text: error.response?.data?.message || `Failed to delete ${count} ${activityText}. Please try again.`,
                });
            }
        },
        
        async loadActivities() {
            try {
                const response = await axios.get('workout_exercises');
                if (response.data.exercises && Array.isArray(response.data.exercises)) {
                    // Transform the API data to match the expected format
                    this.dummyActivities = response.data.exercises.map(exercise => ({
                        id: exercise.exercise_id, // Use exercise_id instead of id
                        name: exercise.exercise_name,
                        category: exercise.category,
                        muscle: exercise.muscles_targeted || "Full Body",
                        difficulty: exercise.level,
                        duration: exercise.duration ? `${exercise.duration} min` : "30 sec",
                        description: exercise.description,
                        instructions: exercise.instructions,
                        equipment: exercise.equipment,
                        calories: exercise.calories_burned,
                        thumbnail: exercise.thumbnail ? '/' + exercise.thumbnail : '/images/Kettlebell-swing.webp',
                        videoLink: exercise.video_link,
                        tags: exercise.tags,
                        restPeriod: exercise.rest_period,
                        // New fields
                        visibleFor: exercise.visible_for,
                        primaryMuscleGroups: exercise.primary_muscle_groups,
                        secondaryMuscleGroups: exercise.secondary_muscle_groups,
                        primaryJoint: exercise.primary_joint,
                        type: exercise.type,
                        usesWeights: exercise.uses_weights,
                        intensity: exercise.intensity,
                        setsConfiguration: exercise.sets_configuration,
                        restPeriodSeconds: exercise.rest_period_seconds,
                        qrLink: exercise.qr_link,
                        manufacturer: exercise.manufacturer,
                    }));
                }
            } catch (error) {
                // Don't log authentication errors that are being handled by the interceptor
                // (they will redirect to login)
                if (!error.isHandled && !error.isAuthError) {
                    console.error('Error loading activities:', error);
                }
                // Keep using dummy data if API fails
            }
        },
        
        handleImageError(event) {
            event.target.src = '/images/Kettlebell-swing.webp';
        },
    },
    mounted() {
        // Load activities when component is mounted
        this.loadActivities();
    },
    watch: {
        filters: {
            handler() {
                // Reset to first page when filters change
                this.currentPage = 1;
            },
            deep: true,
        },
    },
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

.activity-list-page {
    padding: 1rem;
    color: $color-text-dark;

    @media (max-width: $breakpoint-md) {
        padding: 1rem;
    }
}

.page-header {
    display: flex;
    border-radius: 10px;

    @media (max-width: $breakpoint-md) {
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem;
    }

    .header-content {
        flex: 1;
        display: flex;

        .page-title {
            font-family: $font-family-base;
            font-size: $font-size-xl;
            font-weight: 700;
            color: #252525;
            background: linear-gradient(
                135deg,
                $color-text-dark,
                $color-text-light
            );
            background-clip: text;
        }

        .page-subtitle {
            font-size: $font-size-md;
            color: #6c757d;
            margin: 0;
            font-weight: 400;
            line-height: 1.6;
        }
    }

    .header-actions {
        .btn-modern {
            background: linear-gradient(
                135deg,
                $color-button,
                $color-button-hover
            );
            border-radius: 12px;
            font-size: $font-size-sm;
            transition: all 0.3s ease;
            color: $color-white;

            &:hover {
                transform: translateY(-3px);
                box-shadow: 0 12px 35px rgba($color-button, 0.4);
                color: $color-white;
            }

            &:active {
                transform: translateY(-1px);
            }

            &.btn-delete-selected {
                background: linear-gradient(135deg, #dc3545, #c82333);
                box-shadow: 0 8px 25px rgba(220, 53, 69, 0.3);

                &:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 35px rgba(220, 53, 69, 0.4);
                    background: linear-gradient(135deg, #c82333, #bd2130);
                }

                &:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    transform: none;
                    box-shadow: none;
                }
            }
        }
    }
}

// ===================================
// Compact Filters Card
// ===================================

.filters-card-compact {
    padding: 5px;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: $box-shadow-md;
        border-color: #dc3545;
    }

    .filters-header-compact {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid $color-border-muted;

        .filters-title-section {
            display: flex;
            align-items: center;
            gap: 10px;

            .filters-title-compact {
                font-size: $font-size-lg;
                font-weight: $font-weight-semibold;
                color: $heading;
                margin: 0;
                display: flex;
                align-items: center;
                gap: $padding-xs;

                i {
                    color: #dc3545;
                    font-size: $font-size-sm;
                }
            }

            .results-count-compact {
                font-size: $font-size-sm;
                color: $color-muted;
                background: $gray-100;
                padding: $padding-xs $padding-sm;
                border-radius: $border-radius-sm;
                font-weight: $font-weight-medium;
            }
        }

        .filters-actions-compact {
            .btn-clear-compact {
                background: transparent;
                border: 1px solid $color-border-muted;
                color: $color-muted;
                border-radius: $border-radius-sm;
                padding: $padding-xs $padding-sm;
                font-size: $font-size-sm;
                font-weight: $font-weight-medium;
                transition: all 0.2s ease;

                &:hover {
                    background: #dc3545;
                    border-color: #dc3545;
                    color: $white;
                    transform: translateY(-1px);
                }

                i {
                    margin-right: $padding-xs;
                }
            }
        }
    }

    .filters-content-compact {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: $padding-md;
        align-items: end;

        .filter-group-compact {
            display: flex;
            flex-direction: column;
            gap: $padding-xs;

            .filter-label-compact {
                font-size: $font-size-sm;
                font-weight: $font-weight-medium;
                color: $heading;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 4px;

                i {
                    font-size: 10px;
                    color: #dc3545;
                    opacity: 0.7;
                }
            }

            .select-compact {
                border: 1px solid $color-border-muted;
                border-radius: $border-radius-sm;
                font-size: $font-size-sm;
                background: $white;
                transition: all 0.2s ease;

                &:focus {
                    border-color: #dc3545;
                    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
                    outline: none;
                }

                &:hover {
                    border-color: #dc3545;
                }
            }
        }
    }
}

// Responsive adjustments for compact filters
@media (max-width: $breakpoint-md) {
    .filters-card-compact {
        .filters-header-compact {
            flex-direction: column;
            gap: $padding-sm;
            align-items: flex-start;

            .filters-title-section {
                flex-direction: column;
                align-items: flex-start;
                gap: $padding-xs;
            }
        }

        .filters-content-compact {
            grid-template-columns: 1fr;
            gap: $padding-sm;
        }
    }
}

// ===================================
// Filters Card (Original)
// ===================================

.filters-card {
    background: $color-white;
    border: none;
    border-radius: 10px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        transform: translateY(-2px);
    }

    .filters-header {
        background: linear-gradient(135deg, $color-button, $color-button-hover);
        padding: 1rem;
        margin: -1rem -1rem 2rem -1rem;
        position: relative;
        overflow: hidden;

        &::before {
            content: "";
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(
                circle,
                $color-button 0%,
                transparent 50%
            );
            animation: float 6s ease-in-out infinite;
        }

        .filters-title {
            color: $color-white;
            font-size: $font-size-md;
            font-weight: 600;
            margin: 0;
            display: flex;
            align-items: center;
            position: relative;
            z-index: 1;

            i {
                font-size: $font-size-sm;
                opacity: 0.9;
                margin-right: 0.75rem;
            }
        }
    }

    .filters-row {
        margin-bottom: 5px;
        padding: 5px;

        .filter-col {
            @media (max-width: $breakpoint-md) {
                margin-bottom: 1.5rem;
            }
        }
    }

    .form-group-modern {
        margin-bottom: 0;

        label {
            font-weight: 600;
            color: #252525;
            font-size: $font-size-sm;
            margin-bottom: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .select-modern {
            border: 2px solid #e9ecef;
            border-radius: 12px;
            // padding: 1rem;
            font-size: $font-size-sm;
            transition: all 0.3s ease;
            // background: #f8f9fa;
            color: #252525;

            &:focus {
                border-color: $color-button;
                box-shadow: 0 0 0 0.2rem rgba($color-button, 0.15);
                background: $color-white;
            }

            &:hover {
                border-color: $color-button;
                background: $color-white;
            }
        }
        .select-modern option[value=""] {
            color: #999 !important;
        }
    }

    .filters-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .btn-outline-modern {
            border: 2px solid #dee2e6;
            border-radius: 12px;
            padding: 0.25rem 0.5rem;
            font-weight: 550;
            font-size: $font-size-xs;
            color: #6c757d;
            transition: all 0.3s ease;
            background: $color-white;

            &:hover {
                border-color: $color-button;
                color: $color-button;
                background: rgba($color-button, 0.05);
                transform: translateY(-1px);
            }
        }

        .results-count {
            font-size: $font-size-sm;
            color: #6c757d;
            font-weight: 600;
            background: $color-white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            border: 1px solid #e9ecef;
        }
    }
}

// ===================================
// Activities Container
// ===================================

.activities-container {
    .activities-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding: 0.5rem 1rem;
        background: $color-white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);

        @media (max-width: $breakpoint-md) {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
            padding: 1rem;
        }

        .activities-title {
            font-size: $font-size-lg;
            font-weight: 600;
            color: #252525;
            margin: 0;
            display: flex;
            align-items: center;

            i {
                color: $color-button;
                margin-right: 0.75rem;
                font-size: 1.2em;
            }
        }

        .view-toggle {
            .btn-outline-modern {
                border: 2px solid #e9ecef;
                border-radius: 10px;
                padding: 0.5rem;
                color: #6c757d;
                transition: all 0.3s ease;
                background: $color-white;

                &:hover,
                &.active {
                    border-color: $color-button;
                    color: $color-button;
                    background: rgba($color-button, 0.05);
                    transform: translateY(-1px);
                }

                i {
                    font-size: $font-size-sm;
                }
            }
        }
    }
}

// ===================================
// Activities Grid
// ===================================

.activities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
    padding: 0.5rem;

    @media (min-width: 1200px) {
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 1.25rem;
    }

    @media (max-width: $breakpoint-md) {
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 0.75rem;
    }

    @media (max-width: $breakpoint-sm) {
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }

    &.list-view {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;

        @media (max-width: $breakpoint-lg) {
            grid-template-columns: 1fr;
            gap: 0.75rem;
        }

        .activity-card {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.75rem;
            min-height: 80px;

            .delete-checkbox-wrapper {
                position: absolute;
                top: 0.25rem;
                right: 0.25rem;
                z-index: 10;
                transition: all 0.3s ease;

                .delete-checkbox {
                    margin: 0;
                    cursor: pointer;

                    ::v-deep .custom-control-input:checked ~ .custom-control-label::before {
                        background-color: #dc3545;
                        border-color: #dc3545;
                    }

                    ::v-deep .custom-control-input:focus ~ .custom-control-label::before {
                        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
                    }
                }
            }

            &.selected-for-delete {
                border-color: #dc3545;
                background: linear-gradient(
                    135deg,
                    rgba(220, 53, 69, 0.05),
                    rgba(220, 53, 69, 0.02)
                );
                box-shadow: 0 8px 32px rgba(220, 53, 69, 0.15);

                &::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(135deg, #dc3545, #c82333);
                    transform: scaleX(1);
                }
            }

            .activity-thumbnail {
                flex-shrink: 0;
                width: 80px;
                height: 60px;
                margin-bottom: 0;
                border-radius: 8px;

                .thumbnail-image {
                    border-radius: 8px;
                }

                .difficulty-badge-overlay {
                    font-size: 0.5rem;
                    padding: 0.1rem 0.25rem;
                    bottom: 3px;
                    left: 3px;
                }
            }

            .difficulty-badge-list {
                font-size: 0.65rem !important;
                font-weight: 600;
                padding: 0.2rem 0.4rem;
                border-radius: 8px;
                text-transform: uppercase;
                letter-spacing: 0.3px;
            }

            .activity-card-body {
                flex: 1;
                margin: 0;
                min-width: 0; // Prevents flex item from overflowing

                .activity-name {
                    margin: 0 0 0.25rem 0;
                    font-size: $font-size-sm;
                    font-weight: 600;
                    line-height: 1.2;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .activity-meta {
                    flex-direction: column;
                    gap: 0.25rem;

                    .meta-item {
                        font-size: $font-size-xs;
                        color: #6c757d;

                        .meta-icon {
                            width: 12px;
                            margin-right: 0.4rem;
                            color: $color-button;
                            font-size: $font-size-xs;
                        }
                    }
                }
            }

            .activity-card-footer {
                flex-shrink: 0;
                margin: 0;
                padding: 0;
                border: none;
                width: auto;

                .activity-card-actions {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }

                .btn-outline-modern {
                    border: 1px solid #e9ecef;
                    border-radius: 8px;
                    padding: 0.4rem 0.8rem;
                    font-weight: 600;
                    font-size: $font-size-xs;
                    color: $color-white;
                    transition: all 0.3s ease;
                    background: linear-gradient(
                        135deg,
                        $color-button,
                        $color-button-hover
                    );
                    width: 100%;

                    &:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba($color-button, 0.3);
                        color: $color-white;
                        border-color: $color-button;
                    }

                    &.view-details-btn {
                        width: auto;
                        min-width: 28px;
                        height: 28px;
                        padding: 0.3rem;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 0.65rem;

                        i {
                            margin: 0;
                        }

                        &:hover {
                            transform: translateY(-2px) scale(1.05);
                            box-shadow: 0 8px 25px rgba($color-button, 0.3);
                        }
                    }

                    &.delete-btn {
                        background: linear-gradient(135deg, #dc3545, #c82333);
                        border-color: #dc3545;
                        width: auto;
                        min-width: 28px;
                        height: 28px;
                        padding: 0.3rem;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 0.65rem;

                        i {
                            margin: 0;
                        }

                        &:hover {
                            transform: translateY(-2px) scale(1.05);
                            box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
                            background: linear-gradient(135deg, #c82333, #bd2130);
                        }
                    }
                }
            }
        }
    }

    // Activity Thumbnail Styles
    .activity-thumbnail {
        position: relative;
        height: 160px;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 0.75rem;
        background: linear-gradient(135deg, #f8f9fa, #e9ecef);

        @media (min-width: 1200px) {
            height: 180px;
        }

        .thumbnail-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        .thumbnail-overlay {
            position: absolute;
            bottom: 8px;
            left: 2px;
            z-index: 2;
        }

        .difficulty-badge-overlay-grid {
            font-size: 0.65rem !important;
            font-weight: 600;
            padding: 0.2rem 0.4rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
            color: $color-white;
            border: 1px solid rgba(255, 255, 255, 0.9);
            text-transform: uppercase;
            letter-spacing: 0.3px;
            backdrop-filter: blur(4px);
        }

        .difficulty-badge-overlay {
            font-size: 0.65rem !important;
            font-weight: 600;
            padding: 0.2rem 0.4rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
            color: $color-white;
            border: 1px solid rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(4px);
        }
    }

    .activity-card {
        background: $color-white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        padding: 1rem;
        border: 1px solid rgba(0, 0, 0, 0.04);

        .delete-checkbox-wrapper {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            z-index: 10;
            transition: all 0.3s ease;

            .delete-checkbox {
                margin: 0;
                cursor: pointer;

                ::v-deep .custom-control-input:checked ~ .custom-control-label::before {
                    background-color: #dc3545;
                    border-color: #dc3545;
                }

                ::v-deep .custom-control-input:focus ~ .custom-control-label::before {
                    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
                }
            }
        }

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(
                135deg,
                $color-button,
                $color-button-hover
            );
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }

        &:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
            border-color: rgba($color-button, 0.15);

            &::before {
                transform: scaleX(1);
            }

            .activity-thumbnail .thumbnail-image {
                transform: scale(1.05);
            }
        }

        &.selected {
            border-color: $color-button;
            background: linear-gradient(
                135deg,
                rgba($color-button, 0.02),
                rgba($color-button, 0.005)
            );
            box-shadow: 0 8px 32px rgba($color-button, 0.12);

            &::before {
                transform: scaleX(1);
            }
        }

        &.selected-for-delete {
            border-color: #dc3545;
            background: linear-gradient(
                135deg,
                rgba(220, 53, 69, 0.05),
                rgba(220, 53, 69, 0.02)
            );
            box-shadow: 0 8px 32px rgba(220, 53, 69, 0.15);

            &::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(135deg, #dc3545, #c82333);
                transform: scaleX(1);
            }
        }

        .activity-card-body {
            .activity-name {
                font-size: $font-size-md;
                font-weight: 600;
                color: #252525;
                margin: 0 0 0.75rem 0;
                line-height: 1.3;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .activity-meta {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;

                .meta-item {
                    display: flex;
                    align-items: center;
                    font-size: $font-size-xs;
                    color: #6c757d;
                    font-weight: 500;

                    .meta-icon {
                        width: 14px;
                        margin-right: 0.5rem;
                        color: $color-button;
                        font-size: $font-size-xs;
                    }
                }
            }
        }

        .activity-card-footer {
            margin-top: 1rem;
            padding-top: 0.75rem;
            border-top: 1px solid #f0f0f0;

            .activity-card-actions {
                display: flex;
                gap: 0.5rem;
                justify-content: flex-end;
                align-items: center;
            }

            .btn-outline-modern {
                border: 1px solid #e9ecef;
                border-radius: 8px;
                padding: 0.5rem 1rem;
                font-weight: 600;
                font-size: $font-size-xs;
                color: $color-white;
                transition: all 0.3s ease;
                background: linear-gradient(
                    135deg,
                    $color-button,
                    $color-button-hover
                );
                width: 100%;

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba($color-button, 0.3);
                    color: $color-white;
                    border-color: $color-button;
                }

                &.btn-sm {
                    padding: 0.4rem 0.8rem;
                    font-size: $font-size-xs;
                }

                &.view-details-btn {
                    width: auto;
                    min-width: 36px;
                    height: 36px;
                    padding: 0.5rem;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;

                    i {
                        margin: 0;
                    }

                    &:hover {
                        transform: translateY(-2px) scale(1.05);
                        box-shadow: 0 8px 25px rgba($color-button, 0.3);
                    }
                }

                &.delete-btn {
                    background: linear-gradient(135deg, #dc3545, #c82333);
                    border-color: #dc3545;
                    width: auto;
                    min-width: 36px;
                    height: 36px;
                    padding: 0.5rem;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;

                    i {
                        margin: 0;
                    }

                    &:hover {
                        transform: translateY(-2px) scale(1.05);
                        box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
                        background: linear-gradient(135deg, #c82333, #bd2130);
                    }
                }
            }
        }
    }
}

// ===================================
// Pagination
// ===================================

.pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    padding: 0 1rem;

    @media (max-width: $breakpoint-md) {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
    }

    .pagination-modern {
        .page-item {
            .page-link {
                border: 2px solid #e9ecef;
                border-radius: 12px;
                padding: 0.75rem 1rem;
                font-weight: 600;
                font-size: $font-size-sm;
                color: #6c757d;
                transition: all 0.3s ease;
                background: $color-white;

                &:hover {
                    border-color: $color-button;
                    color: $color-button;
                    background: rgba($color-button, 0.05);
                    transform: translateY(-1px);
                }

                &.active {
                    border-color: $color-button;
                    background: $color-button;
                    color: $color-white;
                    font-weight: 700;
                }
            }
        }
    }

    .pagination-info {
        font-size: $font-size-sm;
        color: #6c757d;
        font-weight: 500;
        background: $color-white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        border: 1px solid #e9ecef;
        text-align: center;

        @media (max-width: $breakpoint-md) {
            order: -1;
        }
    }
}

// ===================================
// Empty State
// ===================================

.empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: $color-white;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);

    .empty-icon {
        font-size: 4rem;
        color: #6c757d;
        margin-bottom: 2rem;
        opacity: 0.5;
    }

    h3 {
        font-size: $font-size-xl;
        color: #252525;
        margin-bottom: 0.75rem;
        // font-weight: 700;
    }

    p {
        color: #6c757d;
        font-size: $font-size-md;
        margin-bottom: 2rem;
        line-height: 1.6;
    }

    .btn-modern {
        background: linear-gradient(135deg, $color-button, $color-button-hover);
        border: none;
        border-radius: 12px;
        padding: 0.75rem 1rem;
        font-weight: 600;
        font-size: $font-size-sm;
        transition: all 0.3s ease;
        box-shadow: 0 8px 25px rgba($color-button, 0.3);
        color: $color-white;

        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba($color-button, 0.4);
            color: $color-white;
        }
    }
}

// ===================================
// Selected Summary
// ===================================

.selected-summary {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    background: $color-white;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
    border: 2px solid $color-button;
    z-index: $z-modal;
    min-width: 450px;
    backdrop-filter: blur(10px);

    @media (max-width: $breakpoint-md) {
        left: 1rem;
        right: 1rem;
        transform: none;
        min-width: auto;
    }

    .summary-content {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media (max-width: $breakpoint-md) {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
        }

        .selected-count {
            font-weight: 700;
            color: #252525;
            font-size: $font-size-md;
            display: flex;
            align-items: center;
            margin-right: 10px;

            i {
                color: $color-success;
                margin-right: 0.75rem;
                font-size: 1.2em;
            }
        }

        .summary-actions {
            display: flex;
            gap: 0.5rem;

            @media (max-width: $breakpoint-md) {
                justify-content: center;
            }

            .btn-outline-modern {
                border: 2px solid #e9ecef;
                border-radius: 12px;
                // padding: 0.75rem 1.5rem;
                font-weight: 700;
                font-size: $font-size-sm;
                color: #6c757d;
                transition: all 0.3s ease;
                background: $color-white;

                &:hover {
                    border-color: $color-button;
                    color: $color-button;
                    background: rgba($color-button, 0.05);
                    transform: translateY(-1px);
                }
            }

            .btn-modern {
                background: linear-gradient(
                    135deg,
                    $color-button,
                    $color-button-hover
                );
                border: none;
                border-radius: 12px;
                // padding: 0.75rem 1.5rem;
                font-weight: 700;
                font-size: $font-size-sm;
                transition: all 0.3s ease;
                box-shadow: 0 8px 25px rgba($color-button, 0.3);
                color: $color-white;

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 35px rgba($color-button, 0.4);
                    color: $color-white;
                }
            }
        }
    }
}

// ===================================
// Utility Classes
// ===================================

.btn-modern {
    background: linear-gradient(135deg, $color-button, $color-button-hover);
    border: none;
    border-radius: 12px;
    padding: 0.75rem 1rem;
    font-weight: 600;
    font-size: $font-size-sm;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba($color-button, 0.3);
    color: $color-white;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 35px rgba($color-button, 0.4);
        color: $color-white;
    }

    &:active {
        transform: translateY(-1px);
    }

    &.btn-create-workout {
        background: linear-gradient(135deg, $color-success, color.adjust($color-success, $lightness: -10%));
        box-shadow: 0 8px 25px rgba($color-success, 0.3);

        &:hover:not(:disabled) {
            box-shadow: 0 12px 35px rgba($color-success, 0.4);
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
    }
}

.btn-outline-modern {
    border: 2px solid #e9ecef;
    border-radius: 12px;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    font-size: $font-size-sm;
    color: #6c757d;
    transition: all 0.3s ease;
    background: $color-white;

    &:hover {
        border-color: $color-button;
        color: $color-button;
        background: rgba($color-button, 0.05);
        transform: translateY(-1px);
    }
}

// ===================================
// Animations
// ===================================

@keyframes float {
    0%,
    100% {
        transform: translateY(0px) rotate(0deg);
    }
    50% {
        transform: translateY(-20px) rotate(180deg);
    }
}

// ===================================
// Responsive Adjustments
// ===================================

@media (max-width: $breakpoint-lg) {
    .activities-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1rem;
    }
}

@media (max-width: $breakpoint-md) {
    .activities-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 0.75rem;
    }
}

@media (max-width: $breakpoint-sm) {
    .activity-list-page {
        padding: 0.5rem;
    }

    .page-header {
        .page-title {
            font-size: $font-size-lg;
        }
    }

    .filters-card {
        .filters-header {
            padding: 1rem;
        }
    }

    .activity-card {
        padding: 0.75rem;
    }

    .activities-grid {
        grid-template-columns: 1fr;
        gap: 0.5rem;
        padding: 0.25rem;
    }
}

// ===================================
// Grid View Enhancements
// ===================================

.activities-grid:not(.list-view) {
    .activity-card {
        // Add subtle hover effects
        &:hover {
            .activity-thumbnail {
                .thumbnail-image {
                    transform: scale(1.08);
                }
            }
        }

        // Improve card spacing
        .activity-card-body {
            .activity-name {
                min-height: 2.5rem;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .activity-meta {
                min-height: 3rem;
            }
        }

        // Compact footer
        .activity-card-footer {
            .btn-outline-modern {
                font-size: 0.7rem;
                padding: 0.4rem 0.8rem;
            }

            .view-details-btn {
                width: auto;
                min-width: 36px;
                height: 36px;
                padding: 0.5rem;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;

                i {
                    margin: 0;
                }

                &:hover {
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: 0 8px 25px rgba($color-button, 0.3);
                }
            }
        }
    }
}

button.btn,
.b-button,
.b-btn {
    font-size: $font-size-sm !important;
    border-radius: 12px !important;
}

@media (max-width: $breakpoint-sm) {
    .btn-modern,
    .btn-outline-modern {
        font-size: $font-size-xs;
        padding: 0.5rem 1rem;
    }
}

// ===================================
// Selected Activities Modal
// ===================================

.selected-activities-list {
    max-height: 400px;
    overflow-y: auto;
    padding: 0.5rem 0;

    .selected-activity-item {
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e9ecef;

        &:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }

        .activity-item-content {
            display: flex;
            align-items: center;
            gap: 1rem;

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
                    object-fit: cover;
                }
            }

            .activity-item-info {
                flex: 1;
                min-width: 0;

                .activity-item-name {
                    font-size: $font-size-sm;
                    font-weight: 600;
                    color: #252525;
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
                        background: #f8f9fa;
                        border-radius: 6px;
                        color: #6c757d;
                        font-weight: 500;
                        border: 1px solid #e9ecef;
                    }
                }
            }

            .remove-btn {
                flex-shrink: 0;
                width: 32px;
                height: 32px;
                padding: 0;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                border-color: #dc3545;
                color: #dc3545;

                &:hover {
                    background: #dc3545;
                    color: $color-white;
                    transform: scale(1.1);
                }

                i {
                    font-size: 0.75rem;
                }
            }
        }
    }
}

.modal-actions {
    .btn-outline-modern {
        border: 2px solid #e9ecef;
        border-radius: 8px;
        padding: 0.75rem 1rem;
        font-weight: 600;
        font-size: $font-size-sm;
        color: #6c757d;
        transition: all 0.3s ease;
        background: $color-white;

        &:hover {
            border-color: #dc3545;
            color: #dc3545;
            background: rgba(220, 53, 69, 0.05);
            transform: translateY(-1px);
        }
    }

    .btn-create-workout-modal {
        background: linear-gradient(135deg, $color-success, color.adjust($color-success, $lightness: -10%));
        box-shadow: 0 8px 25px rgba($color-success, 0.3);
        border: none;
        color: $color-white;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba($color-success, 0.4);
        }
    }
}

// Modal content styling
::v-deep .modal-content {
    border-radius: 12px;
    border: none;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);

    .modal-header {
        border-bottom: 1px solid #e9ecef;
        padding: 1.25rem 1.5rem;

        .modal-title {
            font-size: $font-size-lg;
            font-weight: 700;
            color: #252525;
        }
    }

    .modal-body {
        padding: 1.5rem;
        color: #252525;
    }
}
</style>