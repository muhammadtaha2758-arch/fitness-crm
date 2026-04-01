<template>
    <div class="main-content">
        <!-- Breadcrumb and Navigation Row -->
        <div class="breadcrumb-nav-row">
            <!-- Breadcrumb Navigation -->
            <div class="breadcrumb-section">
                <nav class="breadcrumb-nav" aria-label="breadcrumb">
                    <div class="breadcrumb-container d-flex align-items-center">
                        <button 
                            @click.stop="goBack" 
                            class="back-button"
                            type="button"
                            title="Go back"
                            style="color: #dc3545;"
                        >
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/app/dashboard">
                                    <i class="fas fa-home"></i>
                                    Dashboard
                                </router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                <i class="fas fa-dumbbell"></i>
                                <span v-if="!showAllWorkouts && filteredMemberName">
                                    {{ filteredMemberName }}'s Workouts
                                </span>
                                <span v-else>
                                    Workout Library
                                </span>
                            </li>
                        </ol>
                    </div>
                </nav>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-section" v-if="!showAllWorkouts && filteredMemberName">
            <div class="action-container">
                <button 
                    @click="showAllWorkoutsView" 
                    class="btn btn-secondary action-btn"
                >
                    <i class="fas fa-dumbbell me-2"></i>
                    Show All Workouts
                </button>
            </div>
        </div>

        <!-- Tab Navigation -->
        <div class="tab-navigation">
            <button 
                class="tab-item" 
                :class="{ active: activeTab === 'workout-plans' }"
                @click="switchToWorkoutPlans"
            >
                <i class="fas fa-dumbbell"></i>
                Workout Collections
            </button>
            <button 
                class="tab-item" 
                :class="{ active: activeTab === 'workout-editor' }"
                @click="switchToPlanBuilder"
            >
                <i class="fas fa-edit"></i>
                Plan Builder
            </button>
            <!-- <button 
                class="tab-item" 
                :class="{ active: activeTab === 'my-activities' }"
                @click="activeTab = 'my-activities'"
            >
                <i class="fas fa-star"></i>
                My Saved Activities
            </button> -->
        </div>

        <!-- Loading Spinner -->
        <div
            v-if="isLoading"
            class="loading_page spinner spinner-primary mr-3"
        ></div>

        <!-- Tab Content -->
        <div>
            <!-- Tab 1: Workout Collections -->
            <div v-if="activeTab === 'workout-plans'" class="tab-content">
                <!-- <div class="page-header">
                    <div style="display: flex; align-items: center; gap: 1.5rem;">
                        <h1 class="page-title" style="margin-bottom: 0;">Workout Collections</h1>
                        <p class="page-subtitle" style="margin-bottom: 0;">
                            Browse and select exercises for your workout routine
                        </p>
                    </div>
                </div> -->
                <!-- Container 1: Statistics Overview -->
                <!-- <div class="stats-container">
                    <div class="row">
                        <div class="col-lg-3 col-md-6 mb-2">
                            <div class="stat-card stat-card-primary">
                                <div class="stat-icon">
                                    <i class="fas fa-dumbbell"></i>
                                </div>
                                <div class="stat-content">
                                    <h3>{{ totalWorkouts }}</h3>
                                    <p>Total Workouts</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-2">
                            <div class="stat-card stat-card-success">
                                <div class="stat-icon">
                                    <i class="fas fa-heart"></i>
                                </div>
                                <div class="stat-content">
                                    <h3>{{ cardioCount }}</h3>
                                    <p>Cardio</p>
                                </div>
                            </div>
                        </div>
                            <div class="col-lg-3 col-md-6 mb-2">
                            <div class="stat-card stat-card-warning">
                                <div class="stat-icon">
                                    <i class="fas fa-dumbbell"></i>
                                </div>
                                <div class="stat-content">
                                    <h3>{{ strengthCount }}</h3>
                                    <p>Strength</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-2">
                            <div class="stat-card stat-card-info">
                                <div class="stat-icon">
                                    <i class="fas fa-clock"></i>
                                </div>
                                <div class="stat-content">
                                    <h3>{{ hiitCount }}</h3>
                                    <p>HIIT</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->

                <!-- Container 2: Search and Filters -->
                <div class="search-container mb-2">
                    <div class="search-card">
                        <!-- Single Row: Main Search and Filters -->
                        <div class="row align-items-end">
                            <div class="col-lg-3 col-md-4 col-sm-12 mb-2">
                                <label class="form-label">Search</label>
                                <b-input-group>
                                    <b-form-input
                                        v-model="search"
                                        placeholder="Search workouts..."
                                        class="search-input"
                                        @input="filterWorkouts"
                                    ></b-form-input>
                                    <b-input-group-append>
                                        <b-button
                                            variant="primary"
                                            @click="filterWorkouts"
                                            class="search-btn"
                                        >
                                            <i class="fas fa-search"></i>
                                        </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                            </div>
                            <div class="col-lg-2 col-md-3 col-sm-6 mb-2">
                                <label class="form-label">Category</label>
                                <v-select
                                    :reduce="(label) => label.value"
                                    placeholder="All Categories"
                                    v-model="selectedCategory"
                                    :options="categoryOptions"
                                    @input="filterWorkouts"
                                    class="filter-select"
                                />
                            </div>
                            <div class="col-lg-2 col-md-3 col-sm-6 mb-2">
                                <label class="form-label">Level</label>
                                <v-select
                                    :reduce="(label) => label.value"
                                    placeholder="All Levels"
                                    v-model="selectedLevel"
                                    :options="levelOptions"
                                    @input="filterWorkouts"
                                    class="filter-select"
                                />
                            </div>
                            <div class="col-lg-2 col-md-3 col-sm-6 mb-2">
                                <label class="form-label">Goal</label>
                                <v-select
                                    :reduce="(label) => label.value"
                                    placeholder="All Goals"
                                    v-model="selectedGoal"
                                    :options="goalOptions"
                                    @input="filterWorkouts"
                                    class="filter-select"
                                />
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-6 mb-2">
                                <label class="form-label">&nbsp;</label>
                                <b-button
                                    variant="primary"
                                    class="btn-add w-100"
                                    @click="showWorkoutModal = true"
                                >
                                    <i class="fas fa-plus"></i>
                                    New Workout Plan
                                </b-button>
                            </div>
                            <div class="col-lg-1 col-md-2 col-sm-6 mb-2">
                                <label class="form-label">&nbsp;</label>
                                <b-button
                                    variant="outline-secondary"
                                    class="btn-clear w-100"
                                    @click="clearFilters"
                                >
                                    <i class="fas fa-times"></i>
                                    Clear
                                </b-button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Container 3: Workout Grid -->
                <div class="workouts-container">
                    <div class="workouts-card">
                        <div class="workouts-header">
                            <h4>Workout Plans</h4>
                            <span class="workout-count"
                                >{{ (Array.isArray(filteredWorkouts) ? filteredWorkouts.length : 0) }} workouts found</span
                            >
                        </div>

                        <div class="workouts-grid">
                            <div
                                v-for="workout in (Array.isArray(filteredWorkouts) ? filteredWorkouts : [])"
                                :key="workout.id"
                                class="workout-item"
                                @click="openEditOptionsModal(workout)"
                            >
                                <div class="workout-thumbnail">
                                    <span
                                        v-if="workout.last_edited_by_type"
                                        :class="['creator-tag', 'badge', getCreatorTagClass(workout)]"
                                    >
                                        {{ getCreatorTagLabel(workout) }}
                                    </span>
                                    <img
                                        :src="getWorkoutImage(workout)"
                                        :alt="workout.exercise_name || workout.name || 'Workout'"
                                        @error="handleImageError"
                                    />
                                </div>

                                <div class="workout-info">
                                    <div class="workout-header">
                                        <h5>{{ workout.exercise_name || workout.name || 'Unnamed Workout' }}</h5>
                                    </div>

                                    <p class="workout-description">
                                        {{ truncateDescription(workout.description || '') }}
                                    </p>

                                    <div class="workout-meta-compact">
                                        <div class="meta-item member-count" 
                                             @click.stop="showMemberDetails(workout)"
                                             style="cursor: pointer;">
                                            <i class="fas fa-users"></i>
                                            <span>{{ workout.member_count || 0 }}</span>
                                        </div>
                                    </div>

                                    <!-- Actions when collapsed -->
                                    <div class="workout-actions-compact" v-if="!isExpanded(workout.id)">
                                        <button
                                            type="button"
                                            @click.stop="assignWorkout(workout)"
                                            class="action-icon-btn assign-btn"
                                            title="Assign Workout"
                                        >
                                            <i class="fas fa-user-plus"></i>
                                        </button>
                                        <button
                                            type="button"
                                            v-if="workout.member_count > 0"
                                            @click.stop="confirmUnassignWorkout(workout)"
                                            class="action-icon-btn unassign-btn"
                                            title="Unassign All Members"
                                        >
                                            <i class="fas fa-user-minus"></i>
                                        </button>
                                        <button
                                            type="button"
                                            @click.stop="openEditOptionsModal(workout)"
                                            class="action-icon-btn edit-btn"
                                            title="Edit Workout"
                                        >
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button
                                            type="button"
                                            @click.stop="deleteWorkout(workout.id)"
                                            class="action-icon-btn delete-btn"
                                            title="Delete Workout"
                                        >
                                            <i class="fas fa-trash"></i>
                                        </button>
                                        <button
                                            type="button"
                                            v-if="hasExtraDetails(workout)"
                                            @click.stop="toggleExpand(workout.id)"
                                            class="action-icon-btn expand-btn"
                                            title="Show More"
                                        >
                                            <i class="fas fa-chevron-down"></i>
                                        </button>
                                    </div>

                                    <!-- Expandable extra details -->
                                    <div class="extra-details" v-if="isExpanded(workout.id)">
                                        <div class="extra-details-content">
                                            <div class="meta-item" v-if="workout.level">
                                                <i class="fas fa-signal"></i>
                                                <span :class="getLevelBadgeClass(workout.level)" class="level-text">
                                                    {{ workout.level }}
                                                </span>
                                            </div>
                                            <div class="meta-item" v-if="workout.duration">
                                                <i class="fas fa-clock"></i>
                                                <span>{{ workout.duration }} min</span>
                                            </div>
                                            <div class="meta-item" v-if="workout.category">
                                                <i class="fas fa-tag"></i>
                                                <span>{{ workout.category }}</span>
                                            </div>
                                            <div class="meta-item" v-if="workout.calories || workout.calories_burned">
                                                <i class="fas fa-fire"></i>
                                                <span>{{ workout.calories || workout.calories_burned || 0 }} cal</span>
                                            </div>
                                            <div class="meta-item" v-if="workout.goal">
                                                <i class="fas fa-bullseye"></i>
                                                <span>{{ workout.goal }}</span>
                                            </div>
                                            <div class="meta-item" v-if="workout.equipment">
                                                <i class="fas fa-dumbbell"></i>
                                                <span>{{ workout.equipment }}</span>
                                            </div>
                                            <div class="meta-item" v-if="workout.muscles_targeted">
                                                <i class="fas fa-user-md"></i>
                                                <span>{{ workout.muscles_targeted }}</span>
                                            </div>
                                            <div class="meta-item" v-if="workout.trainingDays">
                                                <i class="fas fa-calendar-alt"></i>
                                                <span>{{ workout.trainingDays }} days</span>
                                            </div>
                                            <div class="meta-item full-description" v-if="workout.description && workout.description.length > 100">
                                                <i class="fas fa-align-left"></i>
                                                <span>{{ workout.description }}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Actions at bottom when expanded -->
                                    <div class="workout-actions-compact" v-if="isExpanded(workout.id)">
                                        <button
                                            type="button"
                                            @click.stop="assignWorkout(workout)"
                                            class="action-icon-btn assign-btn"
                                            title="Assign Workout"
                                        >
                                            <i class="fas fa-user-plus"></i>
                                        </button>
                                        <button
                                            type="button"
                                            @click.stop="openEditOptionsModal(workout)"
                                            class="action-icon-btn edit-btn"
                                            title="Edit Workout"
                                        >
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button
                                            type="button"
                                            @click.stop="deleteWorkout(workout.id)"
                                            class="action-icon-btn delete-btn"
                                            title="Delete Workout"
                                        >
                                            <i class="fas fa-trash"></i>
                                        </button>
                                        <button
                                            type="button"
                                            v-if="hasExtraDetails(workout)"
                                            @click.stop="toggleExpand(workout.id)"
                                            class="action-icon-btn expand-btn"
                                            title="Show Less"
                                        >
                                            <i class="fas fa-chevron-up"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Empty State -->
                        <div
                            v-if="(Array.isArray(filteredWorkouts) ? filteredWorkouts.length : 0) === 0"
                            class="empty-state"
                        >
                            <i class="fas fa-dumbbell"></i>
                            <h4>No workouts found</h4>
                            <p>
                                Try adjusting your search criteria or add new
                                workouts.
                            </p>
                           
                            <b-button
                                    variant="primary"
                                    size="sm"
                                    class="btn-add"
                                    @click="showWorkoutModal = true"
                                >
                                    <i class="fas fa-plus"></i>
                                    Add New Workout Plan
                                </b-button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab 2: Plan Builder -->
            <div v-if="activeTab === 'workout-editor'">
                <!-- <div class="page-header">
                    <h1 class="page-title">Plan Builder</h1>
                </div> -->
                <div class="editor-container">
                    <WorkoutEditor 
                        :editWorkoutData="selectedWorkout"
                        @workout-saved="handleWorkoutSaved"
                        @workout-activity-plan-saved="handleWorkoutActivityPlanSaved"
                        @edit-workout="openEditModal"
                        @workout-changed="handleWorkoutChanged"
                    />
                </div>
            </div>

            <!-- Tab 3: My Saved Activities -->
            <!-- <div v-if="activeTab === 'my-activities'" class="tab-content"> -->
                <!-- <div class="page-header">
                    <h1 class="page-title">My Saved Activities</h1>
                </div> -->
                <!-- <div class="activities-container">
                    <div class="activities-card"> -->
                        <!-- <div class="activities-header">
                            <h4><i class="fas fa-star"></i> Activity Library</h4>
                            <p>Discover and select exercises for your workout routine</p>
                        </div> -->
                        <!-- <div class="activities-content">
                            <ActivityList @workout-created="handleWorkoutCreated" />
                        </div> -->
                    <!-- </div> -->
                <!-- </div> -->
            <!-- </div> -->
        </div>

        <!-- Members Modal -->
        <b-modal
            v-model="showMembersModal"
            size="md"
            :title="selectedWorkout ? `Members Assigned to ${selectedWorkout.exercise_name}` : 'Assigned Members'"
            centered
        >
            <div v-if="loadingMembers" class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <p class="mt-2">Loading members...</p>
            </div>
            <div v-else-if="safeAssignedMembers.length > 0">
                <!-- Bulk Actions -->
                <div class="mb-3 d-flex justify-content-between align-items-center">
                    <div>
                        <b-form-checkbox
                            v-model="selectAllMembers"
                            @change="toggleSelectAllMembers"
                        >
                            Select All ({{ selectedMembersForBulk.length }} selected)
                        </b-form-checkbox>
                    </div>
                    <b-button
                        v-if="selectedMembersForBulk.length > 0"
                        variant="danger"
                        size="sm"
                        @click="confirmBulkUnassign"
                    >
                        <i class="fas fa-trash"></i> Unassign Selected ({{ selectedMembersForBulk.length }})
                    </b-button>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th width="50">
                                    <b-form-checkbox
                                        v-model="selectAllMembers"
                                        @change="toggleSelectAllMembers"
                                    />
                                </th>
                                <th>Member Name</th>
                                <th>Assigned Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="member in safeAssignedMembers" :key="member.id">
                                <td>
                                    <b-form-checkbox
                                        v-model="selectedMembersForBulk"
                                        :value="member.id"
                                    />
                                </td>
                                <td>{{ member.membername }}</td>
                                <td>{{ formatDate(member.assigned_date) }}</td>
                                <td>
                                    <span :class="getStatusBadgeClass(member.status)">
                                        {{ member.status }}
                                    </span>
                                </td>
                                <td>
                                    <b-button 
                                        variant="danger" 
                                        size="sm"
                                        @click="confirmUnassignMember(member)"
                                    >
                                        <i class="fas fa-trash"></i>
                                    </b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else class="text-center py-4">
                <i class="fas fa-users text-muted" style="font-size: 2rem"></i>
                <p class="mt-2">No members assigned to this workout yet.</p>
            </div>
            <template #modal-footer>
                <b-button variant="secondary" @click="showMembersModal = false">Close</b-button>
            </template>
        </b-modal>

        <!-- Video Preview Modal -->
        <b-modal
            v-model="showModal"
            size="lg"
            :title="modalWorkout ? modalWorkout.exercise_name : 'Workout Preview'"
            centered
            hide-footer
        >
            <div v-if="modalWorkout">
                <div v-if="isVideoLoading" class="text-center py-4">
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <p class="mt-2">Loading video...</p>
                </div>
                <video
                    v-else-if="modalVideo"
                    :src="modalVideo"
                    controls
                    class="w-100 rounded"
                    style="max-height: 400px"
                    @loadstart="isVideoLoading = false"
                    @error="handleVideoError"
                ></video>
                <div v-else class="text-center py-4">
                    <i
                        class="fas fa-exclamation-triangle text-warning"
                        style="font-size: 2rem"
                    ></i>
                    <p class="mt-2">Video not available</p>
                </div>
                <div class="mt-3">
                    <h6>{{ modalWorkout.exercise_name }}</h6>
                    <p class="text-muted">{{ modalWorkout.description }}</p>
                    <div class="row">
                        <div class="col-md-4">
                            <small class="text-muted">Duration</small>
                            <p class="mb-0">{{ modalWorkout.duration || 0 }} min</p>
                        </div>
                        <div class="col-md-4">
                            <small class="text-muted">Level</small>
                            <p class="mb-0">{{ modalWorkout.level }}</p>
                        </div>
                        <div class="col-md-4">
                            <small class="text-muted">Calories</small>
                            <p class="mb-0">{{ modalWorkout.calories }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>

        <!-- Edit Options Modal -->
        <b-modal
            v-model="showEditOptionsModal"
            title="What would you like to do?"
            centered
            hide-footer
            @hide="onEditOptionsModalHide"
        >
            <div class="edit-options-modal">
                <b-form-group>
                    <b-form-radio
                        v-model="editOption"
                        value="edit"
                        class="edit-option-radio"
                    >
                        Edit this workout plan
                    </b-form-radio>
                    <b-form-radio
                        v-model="editOption"
                        value="edit-save-as-new"
                        class="edit-option-radio"
                    >
                        Edit this workout plan and save as new
                    </b-form-radio>
                    <b-form-radio
                        v-model="editOption"
                        value="edit-apply-to-clients"
                        class="edit-option-radio"
                    >
                        Edit and apply changes to clients using this workout plan
                    </b-form-radio>
                </b-form-group>
                
                <div class="modal-actions mt-4 d-flex justify-content-end">
                    <b-button
                        variant="secondary"
                        size="sm"
                        class="mr-2"
                        @click="cancelEditOptions"
                    >
                        Cancel
                    </b-button>
                    <b-button
                        variant="primary"
                        size="sm"
                        @click="proceedWithEditOption"
                        :disabled="!editOption"
                    >
                        Continue
                    </b-button>
                </div>
            </div>
        </b-modal>

        <!-- Workout Modal -->
        <WorkoutModal
            v-if="showWorkoutModal"
            :visible="showWorkoutModal"
            :initialWorkout="selectedWorkout"
            @close="closeWorkoutModal"
            @submit="handleWorkoutSubmit"
        />

        <!-- Assign Workout Modal -->
        <WorkoutAssignModal
            v-if="showAssignModal"
            :isVisible="showAssignModal"
            :workoutId="selectedWorkout ? selectedWorkout.id : null"
            @close="showAssignModal = false"
            @assigned="handleAssignmentSuccess"
        />

        <!-- Restore Changes Modal -->
        <b-modal
            v-model="showRestoreChangesModal"
            title="Restore last changes"
            centered
            hide-footer
            @hide="onRestoreModalHide"
        >
            <div class="restore-changes-modal">
                <div class="restore-message">
                    <i class="fas fa-exclamation-triangle text-warning mb-3" style="font-size: 2rem;"></i>
                    <p class="mb-3">
                        The last time you made changes to the workout <strong>{{ lastWorkoutName || 'Untitled Workout' }}</strong> 
                        on {{ lastWorkoutDate }}, your changes weren't saved. 
                        Click 'Continue' to load the most recent version of this workout, 
                        or click on 'Cancel' to create a new workout.
                    </p>
                </div>
                
                <div class="modal-actions mt-4 d-flex justify-content-end">
                    <b-button
                        variant="secondary"
                        size="sm"
                        class="mr-2"
                        @click="handleRestoreCancel"
                    >
                        Cancel
                    </b-button>
                    <b-button
                        variant="primary"
                        size="sm"
                        @click="handleRestoreContinue"
                    >
                        Continue
                    </b-button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import WorkoutModal from "../../../../components/WorkoutModal.vue";
import ActivityModal from "../../../../components/ActivityModal.vue";
import ActivityList from "./ActivityList.vue";
import WorkoutEditor from "./WorkoutEditor.vue";
import WorkoutAssignModal from "../../../../components/WorkoutAssignModal.vue";
import axios from 'axios';
import VueCookies from 'vue-cookies';

export default {
    name: "WorkoutLibrary",
    components: {
        WorkoutModal,
        ActivityModal,
        ActivityList,
        WorkoutEditor,
        WorkoutAssignModal,
    },
    data() {
        return {
            activeTab: 'workout-plans',
            showMembersModal: false,
            loadingMembers: false,
            assignedMembers: [],
            showWorkoutModal: false,
            showAssignModal: false,
            showEditOptionsModal: false,
            showRestoreChangesModal: false,
            editOption: null,
            workoutForEdit: null,
            selectedWorkout: null,
            workoutEditPreferences: {},
            lastWorkoutName: null,
            lastWorkoutDate: null,
            lastWorkoutData: null,
            isLoading: false,
            isVideoLoading: false,
            search: "",
            selectedType: null,
            selectedCategory: null,
            selectedLevel: null,
            selectedGoal: null,
            selectedTrainingDays: null,
            selectedEquipment: null,
            selectedDuration: null,
            selectedOrder: "alphabetical",
            showModal: false,
            modalVideo: null,
            modalWorkout: null,
            // Member filtering properties
            filteredMemberId: null,
            filteredMemberName: null,
            showAllWorkouts: true,
            workouts: [], // Changed from static data to empty array
            availableVideos: [], // Initialize available videos array
            filteredAvailableVideos: [], // Safe default - always an array
            expandedWorkouts: {}, // Track which workout cards are expanded
            categoryOptions: [
                { label: "All Categories", value: null },
                { label: "Cardio", value: "Cardio" },
                { label: "Strength", value: "Strength" },
                { label: "HIIT", value: "HIIT" },
                { label: "Stretching", value: "Stretching" },
                { label: "Yoga", value: "Yoga" },
                { label: "Pilates", value: "Pilates" },
                { label: "Mobility", value: "Mobility" },
                { label: "Balance", value: "Balance" },
                { label: "Core", value: "Core" },
                { label: "Flexibility", value: "Flexibility" },
            ],
            levelOptions: [
                { label: "All Levels", value: null },
                { label: "Novice", value: "Novice" },
                { label: "Beginner", value: "Beginner" },
                { label: "Intermediate", value: "Intermediate" },
                { label: "Advanced", value: "Advanced" },
                { label: "Expert", value: "Expert" },
            ],
            goalOptions: [
                { label: "All Goals", value: null },
                { label: "Lose Weight", value: "Lose Weight" },
                { label: "Build Muscle", value: "Build Muscle" },
                { label: "Get Fit", value: "Get Fit" },
                { label: "Increase Strength", value: "Increase Strength" },
                { label: "Improve Endurance", value: "Improve Endurance" },
                { label: "Tone Body", value: "Tone Body" },
                { label: "Flexibility", value: "Flexibility" },
                { label: "General Fitness", value: "General Fitness" }
            ],
            typeOptions: [
                { label: "All Plans", value: null },
                { label: "Full Body", value: "Full Body" },
                { label: "Upper Body", value: "Upper Body" },
                { label: "Lower Body", value: "Lower Body" },
                { label: "Core", value: "Core" },
                { label: "Cardio", value: "Cardio" },
                { label: "Flexibility", value: "Flexibility" },
                { label: "Yoga", value: "Yoga" },
                { label: "Pilates", value: "Pilates" },
                { label: "Mobility", value: "Mobility" },
                { label: "Balance", value: "Balance" },
                { label: "Core", value: "Core" },
                { label: "Flexibility", value: "Flexibility" },
            ],
            goalOptions: [
                { label: "All Goals", value: null },
                { label: "Weight Loss", value: "Weight Loss" },
                { label: "Muscle Gain", value: "Muscle Gain" },
                { label: "Strength", value: "Strength" },
                { label: "Endurance", value: "Endurance" },
                { label: "Flexibility", value: "Flexibility" },
                { label: "General Fitness", value: "General Fitness" },
                { label: "Athletic Performance", value: "Athletic Performance" },
                { label: "Balance", value: "Balance" },
            ],
            trainingDaysOptions: [
                { label: "Any Days", value: null },
                { label: "1 Day", value: 1 },
                { label: "2 Days", value: 2 },
                { label: "3 Days", value: 3 },
                { label: "4 Days", value: 4 },
                { label: "5 Days", value: 5 },
                { label: "6 Days", value: 6 },
                { label: "7 Days", value: 7 },
            ],
            equipmentOptions: [
                { label: "Any Equipment", value: null },
                { label: "No Equipment", value: "No Equipment" },
                { label: "Dumbbells", value: "Dumbbells" },
                { label: "Resistance Bands", value: "Resistance Bands" },
                { label: "Kettlebells", value: "Kettlebells" },
                { label: "Barbell", value: "Barbell" },
                { label: "Pull-up Bar", value: "Pull-up Bar" },
                { label: "Yoga Mat", value: "Yoga Mat" },
                { label: "Cardio Machine", value: "Cardio Machine" },
                
            ],
            durationOptions: [
                { label: "Any Duration", value: null },
                { label: "15 min or less", value: "15 min or less" },
                { label: "15-30 min", value: "15-30 min" },
                { label: "30-45 min", value: "30-45 min" },
                { label: "45-60 min", value: "45-60 min" },
                { label: "60+ min", value: "60+ min" },
            ],
            orderOptions: [
                { label: "Alphabetical", value: "alphabetical" },
                { label: "Duration (Low to High)", value: "duration-asc" },
                { label: "Duration (High to Low)", value: "duration-desc" },
                { label: "Calories (Low to High)", value: "calories-asc" },
                { label: "Calories (High to Low)", value: "calories-desc" },
                { label: "Level (Beginner to Advanced)", value: "level-asc" },
                { label: "Level (Advanced to Beginner)", value: "level-desc" },
                { label: "Newest First", value: "newest" },
                { label: "Oldest First", value: "oldest" },
            ],
        };
    },
    watch: {
        selectedMembersForBulk(newVal) {
            // Update selectAllMembers based on selection
            if (this.safeAssignedMembers.length > 0) {
                this.selectAllMembers = newVal.length === this.safeAssignedMembers.length;
            } else {
                this.selectAllMembers = false;
            }
        },
        selectedWorkout (newVal) {
            // Save unsaved changes when user is working on Plan Builder
            if (this.activeTab === 'workout-editor' && newVal) {
                this.saveUnsavedWorkoutData(newVal);
            }
        },
        activeTab(newTab, oldTab) {
            // When switching away from Plan Builder, save current state if there's a selected workout
            if (oldTab === 'workout-editor' && this.selectedWorkout) {
                this.saveUnsavedWorkoutData(this.selectedWorkout);
            }
        },
    },
    computed: {
        filteredWorkouts() {
            try {
                const source = Array.isArray(this.workouts) ? this.workouts : [];
                
                let filtered = source.filter((workout) => {
                    // Ensure workout is defined
                    if (!workout) {
                        return false;
                    }
                    
                    // Search filter
                    const workoutName = (workout && workout.exercise_name ? workout.exercise_name : '').toLowerCase();
                    const workoutDesc = (workout && workout.description ? workout.description : '').toLowerCase();
                    const searchText = (this.search || '').toLowerCase();
                    const matchesSearch = !searchText || workoutName.includes(searchText) || workoutDesc.includes(searchText);

                    // Type filter
                    const matchesType = !this.selectedType || workout.type === this.selectedType;

                    // Category filter
                    const matchesCategory = !this.selectedCategory || workout.category === this.selectedCategory;

                    // Level filter
                    const matchesLevel = !this.selectedLevel || workout.level === this.selectedLevel;

                    // Goal filter
                    const matchesGoal = !this.selectedGoal || workout.goal === this.selectedGoal;

                    // Training days filter - using rest_period as training days for now
                    const matchesTrainingDays = !this.selectedTrainingDays || workout.rest_period === this.selectedTrainingDays;

                    // Equipment filter
                    const matchesEquipment = !this.selectedEquipment || workout.equipment === this.selectedEquipment;

                    // Duration filter
                    const matchesDuration = this.filterByDuration(workout && workout.duration);

                    return (
                        matchesSearch &&
                        matchesType &&
                        matchesCategory &&
                        matchesLevel &&
                        matchesGoal &&
                        matchesTrainingDays &&
                        matchesEquipment &&
                        matchesDuration
                    );
                });

                // Apply sorting
                const sorted = this.sortWorkouts(filtered || []);
                
                return sorted;
            } catch (error) {
                return [];
            }
        },
        totalWorkouts() {
            try {
                const result = Array.isArray(this.workouts) ? this.workouts.length : 0;
                return result;
            } catch (error) {
                return 0;
            }
        },
        cardioCount() {
            try {
                const src = Array.isArray(this.workouts) ? this.workouts : [];
                return src.filter((w) => {
                    if (!w || !w.category) return false;
                    const category = w.category.toLowerCase();
                    return category === "cardio";
                }).length;
            } catch (error) {
                return 0;
            }
        },
        strengthCount() {
            try {
                const src = Array.isArray(this.workouts) ? this.workouts : [];
                return src.filter((w) => {
                    if (!w || !w.category) return false;
                    const category = w.category.toLowerCase();
                    return category === "strength";
                }).length;
            } catch (error) {
                return 0;
            }
        },
        hiitCount() {
            try {
                const src = Array.isArray(this.workouts) ? this.workouts : [];
                return src.filter((w) => {
                    if (!w || !w.category) return false;
                    const category = w.category.toLowerCase();
                    return category === "hiit";
                }).length;
            } catch (error) {
                return 0;
            }
        },
        safeAssignedMembers() {
            // Ensure assignedMembers is always an array
            return Array.isArray(this.assignedMembers) ? this.assignedMembers : [];
        },
        // currentUserPermissions() {
        //     return [
        //         "workout_view",
        //         "workout_add",
        //         "workout_edit",
        //         "workout_delete",
        //         "workout_assign",
        //     ];
        // },
    },
    methods: {
        // Get workout image with proper fallback
        getWorkoutImage(workout) {
            if (workout.thumbnail) {
                // If thumbnail is a full URL, return as is
                if (workout.thumbnail.startsWith('http://') || workout.thumbnail.startsWith('https://')) {
                    return workout.thumbnail;
                }
                // If thumbnail is a relative path, ensure it starts with /
                if (workout.thumbnail.startsWith('/')) {
                    return workout.thumbnail;
                }
                // If thumbnail doesn't start with /, add it
                return '/' + workout.thumbnail;
            }
            // Default fallback image
            return '/images/closeup.webp';
        },
        // Expand/Collapse methods for workout cards
        isExpanded(workoutId) {
            return !!this.expandedWorkouts[workoutId];
        },
        toggleExpand(workoutId) {
            this.$set(this.expandedWorkouts, workoutId, !this.expandedWorkouts[workoutId]);
        },
        hasExtraDetails(workout) {
            // Check if workout has any of the extra detail fields that should be hidden
            return !!(workout.level || workout.duration || workout.category || workout.calories || workout.calories_burned || 
                     workout.goal || workout.equipment || workout.muscles_targeted || workout.trainingDays ||
                     (workout.description && workout.description.length > 100));
        },
        truncateDescription(description) {
            if (!description) return '';
            const maxLength = 80;
            if (description.length <= maxLength) return description;
            return description.substring(0, maxLength) + '...';
        },
        goBack() {
            // Check if there's a previous page in history
            if (window.history.length > 1) {
                this.$router.go(-1);
            } else {
                // Default fallback to dashboard
                this.$router.push({ name: 'dashboard' });
            }
        },
        
        checkMemberFilter() {
            // Check if we have member filtering parameters from the route
            if (this.$route.query.memberId) {
                this.filteredMemberId = this.$route.query.memberId;
                this.filteredMemberName = this.$route.query.memberName || 'Unknown Member';
                this.showAllWorkouts = false;
            } else {
                this.showAllWorkouts = true;
            }
        },
        
        showAllWorkoutsView() {
            // Clear the filter and reload all workouts
            this.filteredMemberId = null;
            this.filteredMemberName = null;
            this.showAllWorkouts = true;
            
            // Update the URL to remove query parameters
            this.$router.replace({ name: 'WorkoutLibrary' });
            
            // Reload workouts to show all
            this.loadWorkouts();
        },
        
        async loadWorkouts() {
            try {
                this.isLoading = true;

                let response;

                if (this.filteredMemberId) {
                    // Load workouts assigned to specific member
                    response = await axios.get(`/workout/assignments/${this.filteredMemberId}`);
                    
                    if (response.data.success && response.data.assignments && Array.isArray(response.data.assignments)) {
                        // Transform assignment data to match the expected format
                        this.workouts = response.data.assignments.map(assignment => {
                            const name = (assignment.workout && (assignment.workout.exercise_name || assignment.workout.name)) || assignment.workout_name || assignment.exercise_name;
                            const goalVal = (assignment.goal != null && String(assignment.goal).trim() !== '') ? String(assignment.goal).trim() : (assignment.workout && assignment.workout.goal) || 'General Fitness';
                            return {
                                id: assignment.workout_id || assignment.id,
                                exercise_id: assignment.workout_id || assignment.id,
                                exercise_name: (name != null && String(name).trim() !== '') ? String(name).trim() : 'Unnamed Workout',
                                type: assignment.type || assignment.category,
                                category: assignment.category || 'General',
                                duration: assignment.duration ?? '30',
                                level: assignment.level || 'Beginner',
                                calories: assignment.calories_burned ?? 0,
                                goal: goalVal,
                                trainingDays: assignment.rest_period ?? 3,
                                equipment: assignment.equipment || 'No Equipment',
                                description: assignment.description != null ? String(assignment.description) : '',
                                video: assignment.video_link,
                                thumbnail: assignment.thumbnail 
                                    ? (assignment.thumbnail.startsWith('/') ? assignment.thumbnail : '/' + assignment.thumbnail)
                                    : '/images/closeup.webp',
                                createdAt: assignment.assigned_date || assignment.created_at,
                                member_count: 1,
                                muscles_targeted: assignment.muscles_targeted,
                                instructions: assignment.instructions,
                                difficulty: assignment.difficulty,
                                rest_period: assignment.rest_period,
                                tags: assignment.tags,
                                visible_for: assignment.visible_for,
                                primary_muscle_groups: assignment.primary_muscle_groups,
                                secondary_muscle_groups: assignment.secondary_muscle_groups,
                                primary_joint: assignment.primary_joint,
                                uses_weights: assignment.uses_weights,
                                intensity: assignment.intensity,
                                sets_configuration: assignment.sets_configuration,
                                rest_period_seconds: assignment.rest_period_seconds,
                                qr_link: assignment.qr_link,
                                manufacturer: assignment.manufacturer,
                                last_edited_by_type: (assignment.workout && assignment.workout.last_edited_by_type) ? assignment.workout.last_edited_by_type : null,
                            };
                        });
                        
                        // Extract videos from member-specific workouts
                        this.availableVideos = response.data.assignments.filter(assignment => 
                            assignment.video_link && assignment.video_link.trim() !== ''
                        );
                        
                        // Update filteredAvailableVideos as well
                            this.filteredAvailableVideos = this.availableVideos.filter((video) => {
                            return video && video.video_link;
                        });
                    } else {
                        this.workouts = [];
                        this.availableVideos = [];
                        this.filteredAvailableVideos = [];
                    }
                } else {
                    // Load all workouts (original behavior)
                    response = await axios.get('workout');
                    if (response.data.exercises && Array.isArray(response.data.exercises)) {
                        // Transform API data to match the expected format
                        this.workouts = response.data.exercises.map(exercise => ({
                            id: exercise.id,
                            exercise_id: exercise.id,
                            exercise_name: (exercise.exercise_name != null && String(exercise.exercise_name).trim() !== '') ? String(exercise.exercise_name).trim() : (exercise.name != null && String(exercise.name).trim() !== '') ? String(exercise.name).trim() : 'Unnamed Workout',
                            type: exercise.type || exercise.category,
                            category: (exercise.category != null && String(exercise.category).trim() !== '') ? String(exercise.category).trim() : 'General',
                            duration: exercise.duration != null ? String(exercise.duration) : '30',
                            level: (exercise.level != null && String(exercise.level).trim() !== '') ? String(exercise.level).trim() : 'Beginner',
                            calories: exercise.calories_burned ?? 0,
                            goal: (exercise.goal != null && String(exercise.goal).trim() !== '') ? String(exercise.goal).trim() : 'General Fitness',
                            trainingDays: exercise.rest_period ?? 3,
                            equipment: (exercise.equipment != null && String(exercise.equipment).trim() !== '') ? String(exercise.equipment) : 'No Equipment',
                            description: exercise.description != null ? String(exercise.description) : '',
                            video: exercise.video_link,
                            thumbnail: exercise.thumbnail 
                                ? (exercise.thumbnail.startsWith('/') ? exercise.thumbnail : '/' + exercise.thumbnail)
                                : '/images/closeup.webp',
                            createdAt: exercise.created_at,
                            member_count: exercise.member_count ?? 0,
                            muscles_targeted: exercise.muscles_targeted,
                            instructions: exercise.instructions,
                            difficulty: exercise.difficulty,
                            rest_period: exercise.rest_period,
                            tags: exercise.tags,
                            visible_for: exercise.visible_for,
                            primary_muscle_groups: exercise.primary_muscle_groups,
                            secondary_muscle_groups: exercise.secondary_muscle_groups,
                            primary_joint: exercise.primary_joint,
                            uses_weights: exercise.uses_weights,
                            intensity: exercise.intensity,
                            sets_configuration: exercise.sets_configuration,
                            rest_period_seconds: exercise.rest_period_seconds,
                            qr_link: exercise.qr_link,
                            manufacturer: exercise.manufacturer,
                            last_edited_by_type: exercise.last_edited_by_type || null,
                        }));
                        
                        // Extract videos from workouts for availableVideos
                        this.availableVideos = response.data.exercises.filter(exercise => 
                            exercise.video_link && exercise.video_link.trim() !== ''
                        );
                        
                        // Update filteredAvailableVideos as well
                        this.filteredAvailableVideos = this.availableVideos.filter((video) => {
                            return video && video.video_link;
                        });
                    }
                }
            } catch (error) {
                // Don't show generic "Failed to load" for auth errors; interceptor will redirect to login
                const isAuthError = error.response?.status === 401 || error.isAuthError;
                if (!isAuthError) {
                    this.$bvToast.toast("Failed to load workouts", {
                        title: "Error",
                        variant: "danger",
                        solid: true,
                    });
                }
                // Ensure arrays are always defined even on error
                this.workouts = [];
                this.availableVideos = [];
                this.filteredAvailableVideos = [];
            } finally {
                this.isLoading = false;
            }
        },

        previewVideo(workout) {
            if (!workout.video) {
                this.$bvToast.toast("No video available for this workout", {
                    title: "Warning",
                    variant: "warning",
                    solid: true,
                });
                return;
            }

            // Check if it's a YouTube URL
            if (workout.video.includes('youtube.com') || workout.video.includes('youtu.be')) {
                // Open YouTube video in new tab
                window.open(workout.video, '_blank');
            } else {
                // For other video types, use the modal
                this.modalWorkout = workout;
                this.modalVideo = workout.video;
                this.isVideoLoading = true;
                this.showModal = true;
            }
        },

        assignWorkout(workout) {
            this.selectedWorkout = workout;
            this.showAssignModal = true;
        },

        async handleAssignmentSuccess() {
            try {
                // Show success message
                this.$bvToast.toast(
                    `Workout "${this.selectedWorkout.exercise_name}" assigned successfully!`,
                    {
                        title: "Success",
                        variant: "success",
                        solid: true,
                    }
                );
                
                // Close the assignment modal
                this.showAssignModal = false;
                
                // Clear selected workout
                this.selectedWorkout = null;
                
                // Refresh the workout data to show updated member counts
                await this.loadWorkouts();
                
            } catch (error) {
                this.$bvToast.toast("Assignment successful but failed to refresh data", {
                    title: "Warning",
                    variant: "warning",
                    solid: true,
                });
            }
        },

        async openEditModal(workout) {
            // If workout has an id, fetch fresh data from backend to ensure all fields are up to date
            if (workout && workout.id) {
                try {
                    const response = await axios.get(`workout/${workout.id}`);
                    if (response.data.success && response.data.exercise) {
                        this.selectedWorkout = response.data.exercise;
                    } else {
                        // Fallback to workout from list if fetch fails
                        this.selectedWorkout = { ...workout };
                    }
                } catch (error) {
                    // Fallback to workout from list if fetch fails
                    this.selectedWorkout = { ...workout };
                }
            } else {
                // New workout or no id, use as is
                this.selectedWorkout = { ...workout };
            }
            this.showWorkoutModal = true;
        },
        
        openEditOptionsModal(workout) {
            // Store the workout and show the edit options modal
            this.workoutForEdit = { ...workout };
            
            // Restore previously selected option for this workout if it exists
            if (workout && workout.id && this.workoutEditPreferences && this.workoutEditPreferences[workout.id]) {
                this.editOption = this.workoutEditPreferences[workout.id];
            } else {
                // No previous selection, start with null
                this.editOption = null;
            }
            
            this.showEditOptionsModal = true;
        },
        
        cancelEditOptions() {
            // Close the modal but preserve the selection
            this.showEditOptionsModal = false;
            // Don't reset editOption - keep it for next time
            // Only clear workoutForEdit when canceling
            // this.workoutForEdit = null; // Optional: clear only on cancel
        },
        
        resetEditOptions() {
            // Don't reset editOption - preserve it for next time
            // Only reset workoutForEdit when modal is actually closed
            // this.editOption = null; // Keep the selection
            // this.workoutForEdit = null; // Only reset if user cancels
        },
        
        onEditOptionsModalHide() {
            // When modal is hidden (e.g., clicking outside), preserve the selection
            // Don't reset editOption - keep it for next time
            // Only clear workoutForEdit if user explicitly cancels
        },
        
        proceedWithEditOption() {
            if (!this.editOption || !this.workoutForEdit) {
                return;
            }
            
            // Close the edit options modal
            this.showEditOptionsModal = false;
            
            // Store the selected option for this workout to preserve it
            if (this.workoutForEdit && this.workoutForEdit.id) {
                // Store the option preference for this specific workout
                if (!this.workoutEditPreferences) {
                    this.workoutEditPreferences = {};
                }
                this.workoutEditPreferences[this.workoutForEdit.id] = this.editOption;
            }
            
            // Handle based on selected option
            switch (this.editOption) {
                case 'edit':
                    this.handleEditWorkout();
                    break;
                case 'edit-save-as-new':
                    this.handleEditAndSaveAsNew();
                    break;
                case 'edit-apply-to-clients':
                    this.handleEditAndApplyToClients();
                    break;
            }
            
            // Don't reset editOption - preserve it for next time
            // Only clear workoutForEdit after proceeding
            // this.workoutForEdit = null; // Clear after use
        },
        
        async handleEditWorkout() {
            // Option 1: Edit this workout plan (normal edit)
            // Fetch fresh data from backend to ensure all fields are up to date
            if (this.workoutForEdit && this.workoutForEdit.id) {
                try {
                    const response = await axios.get(`workout/${this.workoutForEdit.id}`);
                    if (response.data.success && response.data.exercise) {
                        this.selectedWorkout = response.data.exercise;
                    } else {
                        // Fallback to workout from list if fetch fails
                        this.selectedWorkout = { ...this.workoutForEdit };
                    }
                } catch (error) {
                    // Fallback to workout from list if fetch fails
                    this.selectedWorkout = { ...this.workoutForEdit };
                }
            } else {
                this.selectedWorkout = { ...this.workoutForEdit };
            }
            this.showWorkoutModal = true;
        },
        
        async handleEditAndSaveAsNew() {
            // Option 2: Edit this workout plan and save as new
            try {
                // Fetch fresh data from backend to ensure all fields are up to date
                let workoutData = { ...this.workoutForEdit };
                if (this.workoutForEdit && this.workoutForEdit.id) {
                    try {
                        const response = await axios.get(`workout/${this.workoutForEdit.id}`);
                        if (response.data.success && response.data.exercise) {
                            workoutData = response.data.exercise;
                        }
                    } catch (error) {
                        // Use workoutForEdit as fallback
                    }
                }
                
                // Create a copy of the workout without the ID
                const workoutCopy = { ...workoutData };
                delete workoutCopy.id;
                workoutCopy.exercise_name = workoutCopy.exercise_name + ' (Copy)';
                
                // Set as selected workout and open modal for editing
                this.selectedWorkout = workoutCopy;
                this.showWorkoutModal = true;
            } catch (error) {
                this.$bvToast.toast('Error preparing workout copy', {
                    title: 'Error',
                    variant: 'danger',
                    solid: true,
                });
            }
        },
        
        async handleEditAndApplyToClients() {
            // Option 3: Edit and apply changes to clients using this workout plan
            // Fetch fresh data from backend to ensure all fields are up to date
            if (this.workoutForEdit && this.workoutForEdit.id) {
                try {
                    const response = await axios.get(`workout/${this.workoutForEdit.id}`);
                    if (response.data.success && response.data.exercise) {
                        this.selectedWorkout = response.data.exercise;
                    } else {
                        // Fallback to workout from list if fetch fails
                        this.selectedWorkout = { ...this.workoutForEdit };
                    }
                } catch (error) {
                    // Fallback to workout from list if fetch fails
                    this.selectedWorkout = { ...this.workoutForEdit };
                }
            } else {
                this.selectedWorkout = { ...this.workoutForEdit };
            }
            // Set a flag to indicate this is a client-wide edit
            this.selectedWorkout.applyToClients = true; // Flag to track this mode
            this.showWorkoutModal = true;
        },

        closeWorkoutModal() {
            // Close the modal
            this.showWorkoutModal = false;
            
            // Preserve selectedWorkout data so it can be reopened with all fields intact
            // Don't clear selectedWorkout - keep it for reopening
            // Keep selectedWorkout even if no id - user might reopen the modal
        },

        async handleWorkoutCreated(workoutData) {
            try {
                // Refresh workouts to show the newly created workout
                await this.loadWorkouts();
                
                // Switch to workout-plans tab to show the new workout
                if (this.activeTab !== 'workout-plans') {
                    this.activeTab = 'workout-plans';
                }
                
                // Show success message
                this.$bvToast.toast('Workout created and added to Available Workouts!', {
                    title: 'Success',
                    variant: 'success',
                    solid: true,
                    autoHideDelay: 1000
                });
            } catch (error) {
                this.$bvToast.toast('Workout created but failed to refresh list. Please refresh the page.', {
                    title: 'Warning',
                    variant: 'warning',
                    solid: true,
                });
            }
        },

        async handleWorkoutSubmit(updatedWorkout) {
            try {
                // Close modal first
                this.showWorkoutModal = false;
                
                // Clear unsaved changes since workout was saved
                this.clearUnsavedWorkoutData();
                
                // Reload workouts from backend to get the latest data
                await this.loadWorkouts();
                
                // Show success message - small toast with minimal display time
                this.$bvToast.toast(
                    `Workout ${
                        updatedWorkout.id ? "updated" : "added"
                    } successfully!`,
                    {
                        title: "Success",
                        variant: "success",
                        solid: true,
                        autoHideDelay: 1000,
                        noCloseButton: true,
                        toaster: "b-toaster-top-right",
                        appendToast: false,
                    }
                );
                
                // Update selectedWorkout with the latest data and navigate to Plan Builder
                if (updatedWorkout.id) {
                    this.selectedWorkout = { ...updatedWorkout };
                    // Switch to workout editor tab for further editing
                    this.activeTab = 'workout-editor';
                } else {
                    // If it's a new workout, clear selection
                    this.selectedWorkout = null;
                }
            } catch (error) {
                this.$bvToast.toast("Failed to save workout", {
                    title: "Error",
                    variant: "danger",
                    solid: true,
                });
            }
        },

        async handleWorkoutSaved(updatedWorkout) {
            if (updatedWorkout === null) {
                // Cancel edit - just clear and go back
                this.selectedWorkout = null;
                this.activeTab = 'workout-plans';
                // Clear unsaved changes when canceling
                this.clearUnsavedWorkoutData();
                return;
            }

            try {
                // Clear unsaved changes since workout was saved
                this.clearUnsavedWorkoutData();
                
                // Clear selected workout and switch back to plans tab
                this.selectedWorkout = null;
                this.activeTab = 'workout-plans';
                
                // Reload workouts from backend to get the latest data
                await this.loadWorkouts();
                
                // Show success message - small toast with minimal display time
                this.$bvToast.toast(
                    `Workout ${
                        updatedWorkout.id ? "updated" : "added"
                    } successfully!`,
                    {
                        title: "Success",
                        variant: "success",
                        solid: true,
                        autoHideDelay: 1000,
                        noCloseButton: true,
                        toaster: "b-toaster-top-right",
                        appendToast: false,
                    }
                );
            } catch (error) {
                this.$bvToast.toast("Failed to save workout", {
                    title: "Error",
                    variant: "danger",
                    solid: true,
                });
            }
        },

        handleWorkoutActivityPlanSaved(activityPlanData) {
            // Clear unsaved changes since workout was saved
            this.clearUnsavedWorkoutData();
            
            // Switch to Workout Collections tab (first tab) after successful save
            this.activeTab = 'workout-plans';
            
            // Show success message - small toast with minimal display time
            this.$bvToast.toast(
                "Workout saved successfully!",
                {
                    title: "Success",
                    variant: "success",
                    solid: true,
                    autoHideDelay: 1000,
                    noCloseButton: true,
                    toaster: "b-toaster-top-right",
                    appendToast: false,
                }
            );
        },

        async deleteWorkout(id) {
            try {
                const value = await this.$bvModal.msgBoxConfirm(
                    "Are you sure you want to delete this workout?",
                    {
                        title: "Please confirm",
                        size: "sm",
                        buttonSize: "sm",
                        okVariant: "danger",
                        okTitle: "YES",
                        cancelTitle: "NO",
                        footerClass: "p-2",
                        hideHeaderClose: false,
                        centered: true,
                    }
                );
                
                if (value) {
                    // Show loading toast
                    this.$bvToast.toast("Deleting workout...", {
                        title: "Processing",
                        variant: "info",
                        solid: true,
                        autoHideDelay: 1000,
                        noCloseButton: true,
                        toaster: "b-toaster-top-right",
                        appendToast: false,
                    });
                    
                    // Make API call to delete workout - ensure path starts with /
                    const response = await axios.delete(`/workout/${id}`);
                    
                    // Check if deletion was successful
                    if (response.data && response.data.success) {
                        // Remove the workout from the local array immediately for better UX
                        this.workouts = this.workouts.filter(workout => workout.id !== id);
                        
                        // Reload workouts from backend to get the latest data
                        await this.loadWorkouts();
                        
                        this.$bvToast.toast("Workout deleted successfully!", {
                            title: "Success",
                            variant: "success",
                            solid: true,
                            autoHideDelay: 1000,
                            noCloseButton: true,
                            toaster: "b-toaster-top-right",
                            appendToast: false,
                        });
                    } else {
                        throw new Error("Delete operation did not return success");
                    }
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message || "Failed to delete workout";
                this.$bvToast.toast(errorMessage, {
                    title: "Error",
                    variant: "danger",
                    solid: true,
                    autoHideDelay: 1000,
                    noCloseButton: true,
                    toaster: "b-toaster-top-right",
                    appendToast: false,
                });
            }
        },

        getLevelBadgeClass(level) {
            switch (level) {
                case "Beginner":
                    return "badge-success";
                case "Intermediate":
                    return "badge-warning";
                case "Advanced":
                    return "badge-danger";
                default:
                    return "badge-secondary";
            }
        },
        getCreatorTagLabel(workout) {
            const t = (workout && workout.last_edited_by_type) ? String(workout.last_edited_by_type).toLowerCase() : '';
            if (t === 'admin') return 'Admin';
            if (t === 'coach') return 'Coach';
            if (t === 'member') return 'Member';
            return '';
        },
        getCreatorTagClass(workout) {
            const t = (workout && workout.last_edited_by_type) ? String(workout.last_edited_by_type).toLowerCase() : '';
            if (t === 'admin') return 'badge-primary';
            if (t === 'coach') return 'badge-info';
            if (t === 'member') return 'badge-success';
            return 'badge-secondary';
        },

        handleImageError(event) {
            // Try the default image, and if that fails, use a fallback
            const img = event.target;
            if (img.dataset.fallbackTried === '1') {
                img.onerror = null; // Stop the loop
                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='; // 1x1 transparent gif
                return;
            }
            img.dataset.fallbackTried = '1';
            img.src = '/images/closeup.webp';
        },

        handleVideoError() {
            this.isVideoLoading = false;
            this.$bvToast.toast("Failed to load video", {
                title: "Error",
                variant: "danger",
                solid: true,
            });
        },

        filterWorkouts() {
            // This method is called when search or filters change
            // The filtering logic is handled in the computed property filteredWorkouts
            // This method can be used for additional filtering logic if needed
        },

        filterByDuration(duration) {
            if (!this.selectedDuration) return true;

            const durationNum = parseInt(duration);
            switch (this.selectedDuration) {
                case "15 min or less":
                    return durationNum <= 15;
                case "15-30 min":
                    return durationNum > 15 && durationNum <= 30;
                case "30-45 min":
                    return durationNum > 30 && durationNum <= 45;
                case "45-60 min":
                    return durationNum > 45 && durationNum <= 60;
                case "60+ min":
                    return durationNum > 60;
                default:
                    return true;
            }
        },

        sortWorkouts(workouts) {
            try {
                const list = Array.isArray(workouts) ? workouts : [];
                
                switch (this.selectedOrder) {
                    case "alphabetical":
                        return list.sort((a, b) => (a.exercise_name || '').localeCompare(b.exercise_name || ''));
                    case "duration-asc":
                        return list.sort((a, b) => {
                            const aDur = parseInt(a && a.duration);
                            const bDur = parseInt(b && b.duration);
                            return aDur - bDur;
                        });
                    case "duration-desc":
                        return list.sort((a, b) => {
                            const aDur = parseInt(a && a.duration);
                            const bDur = parseInt(b && b.duration);
                            return bDur - aDur;
                        });
                    case "calories-asc":
                        return list.sort((a, b) => (a.calories || 0) - (b.calories || 0));
                    case "calories-desc":
                        return list.sort((a, b) => (b.calories || 0) - (a.calories || 0));
                    case "level-asc":
                        const levelOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };
                        return list.sort((a, b) => (levelOrder[a.level] || 0) - (levelOrder[b.level] || 0));
                    case "level-desc":
                        const levelOrderDesc = { Beginner: 1, Intermediate: 2, Advanced: 3 };
                        return list.sort((a, b) => (levelOrderDesc[b.level] || 0) - (levelOrderDesc[a.level] || 0));
                    case "newest":
                        return list.sort((a, b) => new Date(b && b.createdAt) - new Date(a && a.createdAt));
                    case "oldest":
                        return list.sort((a, b) => new Date(a && a.createdAt) - new Date(b && b.createdAt));
                    default:
                        return list;
                }
            } catch (error) {
                return Array.isArray(workouts) ? workouts : [];
            }
        },

        clearFilters() {
            this.search = "";
            this.selectedType = null;
            this.selectedCategory = null;
            this.selectedLevel = null;
            this.selectedGoal = null;
            this.selectedTrainingDays = null;
            this.selectedEquipment = null;
            this.selectedDuration = null;
            this.selectedOrder = "alphabetical";
        },

        switchToWorkoutPlans() {
            this.activeTab = 'workout-plans';
            this.selectedWorkout = null; // Clear selected workout when switching back
        },

        switchToPlanBuilder() {
            // Check for unsaved changes in localStorage
            const unsavedData = this.getUnsavedWorkoutData();
            
            if (unsavedData && unsavedData.workoutData) {
                // There are unsaved changes, show restore modal
                // Try to get workout name from multiple sources
                let workoutName = unsavedData.workoutName;
                
                // If saved name is 'Untitled Workout' or missing, try to get it from workoutData
                if (!workoutName || workoutName === 'Untitled Workout') {
                    const workoutData = unsavedData.workoutData;
                    workoutName = workoutData.exercise_name || 
                                 workoutData.name || 
                                 workoutData.workout_name ||
                                 null;
                    
                    // If workout has an ID, try to find it in the workouts list
                    if ((!workoutName || workoutName.trim() === '') && workoutData.id) {
                        const existingWorkout = this.workouts.find(w => w.id === workoutData.id);
                        if (existingWorkout) {
                            workoutName = existingWorkout.exercise_name || existingWorkout.name || null;
                        }
                    }
                }
                
                this.lastWorkoutName = workoutName && workoutName.trim() !== '' ? workoutName : 'Untitled Workout';
                this.lastWorkoutDate = this.formatDateTime(unsavedData.timestamp);
                this.lastWorkoutData = unsavedData.workoutData;
                this.showRestoreChangesModal = true;
            } else {
                // No unsaved changes, open WorkoutModal to create new workout
                this.openNewWorkoutModal();
            }
        },

        openNewWorkoutModal() {
            // Clear selected workout and open modal for new workout
            this.selectedWorkout = null;
            this.showWorkoutModal = true;
            // Switch to Plan Builder tab after modal opens
            this.activeTab = 'workout-editor';
        },

        handleRestoreContinue() {
            // Restore the unsaved workout data
            if (this.lastWorkoutData) {
                this.selectedWorkout = this.lastWorkoutData;
                this.showRestoreChangesModal = false;
                this.activeTab = 'workout-editor';
                // Clear the unsaved data from localStorage since we're restoring it
                this.clearUnsavedWorkoutData();
            }
        },

        handleRestoreCancel() {
            // User wants to start fresh, clear unsaved data and open new workout modal
            this.clearUnsavedWorkoutData();
            this.showRestoreChangesModal = false;
            this.openNewWorkoutModal();
        },

        onRestoreModalHide() {
            // If modal is closed without action, don't switch tabs
            // User stays on current tab
        },

        getUnsavedWorkoutData() {
            try {
                const data = localStorage.getItem('workout_unsaved_changes');
                if (data) {
                    return JSON.parse(data);
                }
            } catch (error) {
                // If parsing fails, return null
            }
            return null;
        },

        saveUnsavedWorkoutData(workoutData) {
            try {
                if (!workoutData) return;
                
                // Try to get workout name from current data, checking multiple possible property names
                let workoutName = workoutData.exercise_name || 
                                 workoutData.name || 
                                 workoutData.workout_name ||
                                 null;
                
                // If workout has an ID, try to find it in the workouts list to get the actual name
                if ((!workoutName || workoutName.trim() === '') && workoutData.id) {
                    const existingWorkout = this.workouts.find(w => w.id === workoutData.id);
                    if (existingWorkout) {
                        workoutName = existingWorkout.exercise_name || existingWorkout.name || null;
                    }
                }
                
                // If still no name found, try to preserve existing saved name
                if (!workoutName || workoutName.trim() === '') {
                    const existingData = this.getUnsavedWorkoutData();
                    if (existingData && existingData.workoutName && existingData.workoutName !== 'Untitled Workout') {
                        workoutName = existingData.workoutName;
                    } else {
                        workoutName = 'Untitled Workout';
                    }
                }
                
                const dataToSave = {
                    workoutName: workoutName.trim(),
                    workoutData: workoutData,
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem('workout_unsaved_changes', JSON.stringify(dataToSave));
            } catch (error) {
                // If saving fails, silently continue
            }
        },

        clearUnsavedWorkoutData() {
            try {
                localStorage.removeItem('workout_unsaved_changes');
            } catch (error) {
                // If clearing fails, silently continue
            }
        },

        formatDateTime(isoString) {
            if (!isoString) return '';
            try {
                const date = new Date(isoString);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');
                return `${day}/${month}/${year} at ${hours}:${minutes}:${seconds}`;
            } catch (error) {
                return '';
            }
        },

        handleWorkoutChanged(workoutData) {
            // Handle changes from WorkoutEditor component
            if (this.activeTab === 'workout-editor' && workoutData) {
                this.selectedWorkout = workoutData;
                this.saveUnsavedWorkoutData(workoutData);
            }
        },

        async showMemberDetails(workout) {
            this.selectedWorkout = workout;
            this.showMembersModal = true;
            this.loadingMembers = true;
            this.assignedMembers = [];
            this.selectedMembersForBulk = [];
            this.selectAllMembers = false;

            try {
                const response = await axios.get(`/workout/workout-assignments/${workout.id}`);
                if (response.data.success && response.data.assignments && Array.isArray(response.data.assignments)) {
                    this.assignedMembers = response.data.assignments.map(assignment => {
                        // Get member name from the member relationship
                        let memberName = 'Unknown Member';
                        if (assignment.member && assignment.member.membername) {
                            memberName = assignment.member.membername;
                        }
                        
                        return {
                            id: assignment.id,
                            membername: memberName,
                            assigned_date: assignment.created_at || assignment.start_date || assignment.assigned_date,
                            status: assignment.status || 'Active'
                        };
                    });
                }
            } catch (error) {
                this.$bvToast.toast('Failed to load assigned members', {
                    title: 'Error',
                    variant: 'danger',
                    solid: true
                });
            } finally {
                this.loadingMembers = false;
            }
        },

        confirmUnassignMember(member) {
            this.memberToUnassign = member;
            this.$bvModal.msgBoxConfirm(
                `Are you sure you want to unassign ${member.membername} from this workout?`,
                {
                    title: 'Confirm Unassign',
                    size: 'md',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'Unassign',
                    cancelTitle: 'Cancel',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true,
                }
            ).then(value => {
                if (value) {
                    this.unassignMember(member.id);
                }
                this.memberToUnassign = null;
            });
        },
        async unassignMember(assignmentId) {
            try {
                await axios.delete(`/workout/assignments/${assignmentId}`);
                const members = Array.isArray(this.assignedMembers) ? this.assignedMembers : [];
                this.assignedMembers = members.filter(m => m.id !== assignmentId);
                
                // Remove from bulk selection if selected
                this.selectedMembersForBulk = this.selectedMembersForBulk.filter(id => id !== assignmentId);
                
                // Refresh the workout list to update member count
                await this.loadWorkouts();
                
                this.$bvToast.toast('Member unassigned successfully', {
                    title: 'Success',
                    variant: 'success',
                    solid: true
                });
            } catch (error) {
                let errorMessage = 'Failed to unassign member';
                if (error && error.response && error.response.data) {
                    if (typeof error.response.data === 'string') {
                        errorMessage = error.response.data;
                    } else if (error.response.data.message) {
                        errorMessage = error.response.data.message;
                    }
                }
                this.$bvToast.toast(errorMessage, {
                    title: 'Error',
                    variant: 'danger',
                    solid: true
                });
            }
        },
        confirmUnassignWorkout(workout) {
            this.$bvModal.msgBoxConfirm(
                `Are you sure you want to unassign all ${workout.member_count || 0} members from "${workout.exercise_name}"?`,
                {
                    title: 'Confirm Unassign All',
                    size: 'md',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'Unassign All',
                    cancelTitle: 'Cancel',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true,
                }
            ).then(value => {
                if (value) {
                    this.unassignAllMembers(workout);
                }
            });
        },
        async unassignAllMembers(workout) {
            try {
                // Load all assignments for this workout
                const response = await axios.get(`/workout/workout-assignments/${workout.id}`);
                if (response.data.success && response.data.assignments && Array.isArray(response.data.assignments)) {
                    const assignmentIds = response.data.assignments.map(a => a.id);
                    
                    // Unassign all members
                    let successCount = 0;
                    let errorCount = 0;
                    
                    for (const assignmentId of assignmentIds) {
                        try {
                            await axios.delete(`/workout/assignments/${assignmentId}`);
                            successCount++;
                        } catch (error) {
                            errorCount++;
                        }
                    }
                    
                    // Refresh the workout list
                    await this.loadWorkouts();
                    
                    // Close members modal if open
                    if (this.showMembersModal && this.selectedWorkout && this.selectedWorkout.id === workout.id) {
                        this.showMembersModal = false;
                        this.selectedMembersForBulk = [];
                    }
                    
                    if (errorCount === 0) {
                        this.$bvToast.toast(`Successfully unassigned all ${successCount} members`, {
                            title: 'Success',
                            variant: 'success',
                            solid: true
                        });
                    } else {
                        this.$bvToast.toast(`Unassigned ${successCount} members, ${errorCount} failed`, {
                            title: 'Partial Success',
                            variant: 'warning',
                            solid: true
                        });
                    }
                }
            } catch (error) {
                let errorMessage = 'Failed to unassign members';
                if (error && error.response && error.response.data) {
                    if (typeof error.response.data === 'string') {
                        errorMessage = error.response.data;
                    } else if (error.response.data.message) {
                        errorMessage = error.response.data.message;
                    }
                }
                this.$bvToast.toast(errorMessage, {
                    title: 'Error',
                    variant: 'danger',
                    solid: true
                });
            }
        },
        toggleSelectAllMembers() {
            if (this.selectAllMembers) {
                this.selectedMembersForBulk = this.safeAssignedMembers.map(m => m.id);
            } else {
                this.selectedMembersForBulk = [];
            }
        },
        confirmBulkUnassign() {
            const count = this.selectedMembersForBulk.length;
            this.$bvModal.msgBoxConfirm(
                `Are you sure you want to unassign ${count} member(s) from this workout?`,
                {
                    title: 'Confirm Bulk Unassign',
                    size: 'md',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'Unassign',
                    cancelTitle: 'Cancel',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true,
                }
            ).then(value => {
                if (value) {
                    this.bulkUnassignMembers();
                }
            });
        },
        async bulkUnassignMembers() {
            if (this.selectedMembersForBulk.length === 0) {
                return;
            }
            
            try {
                let successCount = 0;
                let errorCount = 0;
                
                for (const assignmentId of this.selectedMembersForBulk) {
                    try {
                        await axios.delete(`/workout/assignments/${assignmentId}`);
                        successCount++;
                    } catch (error) {
                        errorCount++;
                    }
                }
                
                // Remove unassigned members from the list
                const members = Array.isArray(this.assignedMembers) ? this.assignedMembers : [];
                this.assignedMembers = members.filter(m => !this.selectedMembersForBulk.includes(m.id));
                
                // Clear selection
                this.selectedMembersForBulk = [];
                this.selectAllMembers = false;
                
                // Refresh the workout list to update member count
                await this.loadWorkouts();
                
                if (errorCount === 0) {
                    this.$bvToast.toast(`Successfully unassigned ${successCount} member(s)`, {
                        title: 'Success',
                        variant: 'success',
                        solid: true
                    });
                } else {
                    this.$bvToast.toast(`Unassigned ${successCount} member(s), ${errorCount} failed`, {
                        title: 'Partial Success',
                        variant: 'warning',
                        solid: true
                    });
                }
            } catch (error) {
                this.$bvToast.toast('Failed to unassign members', {
                    title: 'Error',
                    variant: 'danger',
                    solid: true
                });
            }
        },

        formatDate(date) {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        },

        getStatusBadgeClass(status) {
            switch (status.toLowerCase()) {
                case 'active':
                    return 'badge badge-success-1';
                case 'completed':
                    return 'badge badge-info';
                case 'cancelled':
                    return 'badge badge-danger';
                default:
                    return 'badge badge-secondary';
            }
        },

        openCreateActivityModal() {
            // Method to handle activity creation modal
            // This method is called from somewhere but was missing
            // You can implement the actual functionality here
        },
    },
    mounted() {
        // Check for member filtering parameters
        this.checkMemberFilter();

        // Defer first load so cookie/token is available to axios interceptor
        this.$nextTick(() => {
            this.loadWorkouts();
        });
    },
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/sass/_variables.scss";

// Loading spinner styling
.loading_page.spinner {
    width: 1.5rem !important;
    height: 1.5rem !important;
    font-size: 0.6rem !important;
    border-width: 0.15rem !important;
    margin: 1rem auto !important;
    display: block !important;
}

// Action section styling
.action-section {
    margin: 20px 0;
    padding: 0 20px;
    
    .action-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        
        .action-btn {
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 500;
            transition: all 0.3s ease;
            
            &:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
        }
    }
}

// Global text color override
.main-content {
    color: #252525 !important;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    span,
    div,
    label,
    small {
        color: #252525 !important;
    }

    .text-muted {
        color: #6a6a6a !important;
    }
}

// Tab Navigation
.tab-navigation {
    background: transparent;
    margin: 0px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 100%;
    max-width: fit-content;

    .tab-item {
        padding: 6px 12px;
        border-radius: 15px;
        color: #6c757d;
        background: transparent;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        font-weight: 500;
        font-size: 13px;
        transition: all 0.3s ease;
        position: relative;

        &:hover {
            background: #f8f9fa;
            color: #495057;
        }

        &.active {
            background: #dc3545;
            color: white;
            font-weight: 600;
        }

        i {
            font-size: 14px;
            transition: color 0.3s ease;
        }
    }
}

// Page Header
.page-header {
    
    .page-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #252525 !important;
        margin: 0;
        line-height: 1;
    }
}

// Tab Content
.tab-content {
    padding: 5px;
}

// Container 1: Statistics Overview
.stats-container {
    .stat-card {
        display: flex;
        align-items: center;
        height: 75px;

        .stat-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;

            i {
                font-size: 1.5rem;
                color: white;
            }
        }

        .stat-content {
            flex: 1;

            h3 {
                font-size: 1.75rem;
                font-weight: 700;
                margin: 0;
                line-height: 1.2;
            }

            p {
                font-size: 0.875rem;
                color: #6a6a6a !important;
                margin: 0;
                font-weight: 500;
            }
        }

        &.stat-card-primary .stat-icon {
            background: linear-gradient(135deg, #dc3545, #e52e2e);
        }

        &.stat-card-success .stat-icon {
            background: linear-gradient(135deg, #4caf50, #45a049);
        }

        &.stat-card-warning .stat-icon {
            background: linear-gradient(135deg, #ff9800, #f57c00);
        }

        &.stat-card-info .stat-icon {
            background: linear-gradient(135deg, #2196f3, #1976d2);
        }
    }
}

// Container 2: Search and Filters
.search-container {
    .search-card {
        // background: white;
        // border-radius: 8px;
        padding: 8px;
        // box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);

        .form-label {
            font-size: 0.7rem;
            font-weight: 600;
            color: #252525 !important;
            margin-bottom: 0.25rem;
            line-height: 1.2;
        }

        .search-input {
            height: 32px;
            font-size: 0.8rem;
            border-radius: 6px;
            border: 1px solid #e0e0e0;
            color: #252525 !important;

            &:focus {
                border-color: $color-button;
                box-shadow: 0 0 0 0.2rem rgba(255, 64, 64, 0.25);
            }

            &::placeholder {
                color: #999999 !important;
            }
        }

        .search-btn {
            background: $color-button;
            border-color: $color-button;
            border-radius: 6px;
            height: 32px;
            width: 32px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                background: $color-button-hover;
                border-color: $color-button-hover;
            }

            i {
                color: white !important;
                font-size: 0.75rem;
            }
        }

        .filter-select {
            .vs__dropdown-toggle {
                height: 32px;
                font-size: 0.8rem;
                border: 1px solid #e0e0e0;
                border-radius: 6px;

                &:focus-within {
                    border-color: $color-button;
                    box-shadow: 0 0 0 0.15rem rgba(255, 64, 64, 0.2);
                }
            }

            .vs__selected-options {
                color: #252525 !important;
            }

            .vs__placeholder {
                color: #999999 !important;
            }
        }

        .btn-add {
            background: $color-button;
            border-color: $color-button;
            border-radius: 6px;
            height: 32px;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;

            &:hover {
                background: $color-button-hover;
                border-color: $color-button-hover;
            }

            i {
                color: white !important;
                font-size: 0.7rem;
            }
        }

        .btn-clear {
            background: transparent;
            border-color: #6c757d;
            border-radius: 6px;
            height: 32px;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            color: #6c757d !important;

            &:hover {
                background: #6c757d;
                border-color: #6c757d;
                color: white !important;
            }

            i {
                font-size: 0.7rem;
            }
        }
    }
}

// Container 3: Workout Grid
.workouts-container {
    .workouts-card {
        .workouts-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            // margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            // border-bottom: 1px solid #e0e0e0;

            h4 {
                font-size: 1.25rem;
                font-weight: 700;
                color: #252525 !important;
                margin: 0;
            }

            .workout-count {
                font-size: 0.875rem;
                color: #6a6a6a !important;
                font-weight: 500;
            }
        }

        .workouts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;

            .workout-item {
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                overflow: hidden;
                transition: all 0.3s ease;
                display: flex;
                flex-direction: column;
                min-height: 100%;
                height: auto;
                cursor: pointer;
                background: white;

                &:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
                }

                .workout-thumbnail {
                    position: relative;
                    height: 80px;
                    min-height: 80px;
                    max-height: 80px;
                    overflow: hidden;
                    background: #f5f5f5;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .creator-tag {
                        position: absolute;
                        top: 4px;
                        right: 4px;
                        z-index: 2;
                        font-size: 0.65rem;
                        padding: 0.2rem 0.4rem;
                        text-transform: capitalize;
                    }

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                        object-position: center;
                        transition: transform 0.3s ease;
                        display: block;
                    }

                    &:hover img {
                        transform: scale(1.05);
                    }
                }

                .workout-info {
                    padding: 0.6rem;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    overflow: visible;
                    min-height: 0;

                    .workout-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        margin-bottom: 0.4rem;
                        gap: 0.3rem;

                        h5 {
                            font-size: 0.95rem;
                            font-weight: 700;
                            color: #252525 !important;
                            margin: 0;
                            line-height: 1.3;
                            flex: 1;
                            word-wrap: break-word;
                            overflow-wrap: break-word;
                            min-width: 0;
                        }
                    }

                    .workout-description {
                        font-size: 0.75rem;
                        color: #6a6a6a !important;
                        line-height: 1.4;
                        margin-bottom: 0.5rem;
                        word-wrap: break-word;
                        overflow-wrap: break-word;
                        flex: 0 0 auto;
                        min-height: 1.5rem;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        
                        &:empty {
                            display: none;
                        }
                    }

                    .workout-meta-compact {
                        display: flex;
                        margin-bottom: 0.5rem;

                        .meta-item {
                            display: flex;
                            align-items: center;
                            font-size: 0.7rem;
                            background: #e3f2fd;
                            padding: 0.2rem 0.4rem;
                            border-radius: 6px;
                            border: 1px solid #90caf9;
                            color: #1976d2;
                            font-weight: 600;

                            &.member-count {
                                cursor: pointer;
                                transition: all 0.2s ease;

                                &:hover {
                                    background: #bbdefb;
                                    border-color: #64b5f6;
                                }

                                i {
                                    color: #1976d2 !important;
                                    margin-right: 0.25rem;
                                    font-size: 0.7rem;
                                }

                                span {
                                    color: #1976d2 !important;
                                }
                            }
                        }
                    }

                    .workout-actions-compact {
                        display: flex;
                        gap: 0.3rem;
                        margin-top: auto;
                        padding-top: 0.5rem;
                        border-top: 1px solid #f0f0f0;

                        .action-icon-btn {
                            flex: 1;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 0.35rem;
                            border-radius: 6px;
                            border: 1px solid transparent;
                            background: transparent;
                            cursor: pointer;
                            transition: all 0.2s ease;
                            font-size: 0.8rem;

                            i {
                                pointer-events: none;
                            }

                            &.assign-btn {
                                color: $color-button;
                                border-color: $color-button;

                                &:hover {
                                    background: $color-button;
                                    color: white;
                                }
                            }

                            &.edit-btn {
                                color: $color-button;
                                border-color: $color-button;

                                &:hover {
                                    background: $color-button;
                                    color: white;
                                }
                            }

                            &.unassign-btn {
                                color: #ff9800;
                                border-color: #ff9800;

                                &:hover {
                                    background: #ff9800;
                                    color: white;
                                }
                            }

                            &.delete-btn {
                                color: $color-danger;
                                border-color: $color-danger;

                                &:hover {
                                    background: $color-danger;
                                    color: white;
                                }
                            }

                            &.expand-btn {
                                color: #6a6a6a;
                                border-color: #e0e0e0;

                                &:hover {
                                    background: #f8f9fa;
                                    color: #252525;
                                    border-color: #d0d0d0;
                                }
                            }
                        }
                    }

                    .extra-details {
                        margin-top: 0.5rem;
                        margin-bottom: 0.5rem;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        border-top: 1px solid #f0f0f0;
                        animation: slideDown 0.3s ease forwards;
                        overflow: visible;
                        max-height: none !important;
                        height: auto;

                        .extra-details-content {
                            display: flex;
                            flex-direction: column;
                            gap: 0.3rem;
                            overflow: visible;
                            width: 100%;

                            .meta-item {
                                display: flex;
                                align-items: flex-start;
                                font-size: 0.7rem;
                                background: #f8f9fa;
                                padding: 0.3rem 0.5rem;
                                border-radius: 6px;
                                border: 1px solid #e9ecef;
                                flex: 1 1 auto;
                                min-width: 0;
                                width: 100%;
                                overflow: visible;
                                margin-bottom: 0.3rem;

                                i {
                                    color: #6a6a6a !important;
                                    margin-right: 0.4rem;
                                    font-size: 0.7rem;
                                    flex-shrink: 0;
                                    margin-top: 0.1rem;
                                }

                                span {
                                    color: #6a6a6a !important;
                                    font-weight: 500;
                                    word-wrap: break-word;
                                    overflow-wrap: break-word;
                                    white-space: normal;
                                    line-height: 1.4;
                                    overflow: visible;
                                    text-overflow: clip;
                                    width: 100%;
                                    flex: 1;
                                    min-width: 0;

                                    &.level-text {
                                        font-weight: 600;
                                        padding: 0.15rem 0.4rem;
                                        border-radius: 4px;
                                        white-space: nowrap;
                                        flex: 0 0 auto;
                                        width: auto;
                                        display: inline-block;

                                        &.badge-success,
                                        &.badge-success-1 {
                                            background: #4caf50 !important;
                                            color: white !important;
                                        }

                                        &.badge-warning {
                                            background: #ff9800 !important;
                                            color: white !important;
                                        }

                                        &.badge-danger {
                                            background: #f44336 !important;
                                            color: white !important;
                                        }

                                        &.badge-secondary {
                                            background: #6c757d !important;
                                            color: white !important;
                                        }
                                    }
                                }

                                &.full-description {
                                    width: 100%;
                                    flex-direction: column;
                                    align-items: flex-start;
                                    padding: 0.5rem;
                                    overflow: visible;

                                    i {
                                        margin-bottom: 0.3rem;
                                    }

                                    span {
                                        font-size: 0.75rem;
                                        line-height: 1.6;
                                        width: 100%;
                                        word-wrap: break-word;
                                        overflow-wrap: break-word;
                                        white-space: normal;
                                        overflow: visible;
                                        text-overflow: clip;
                                    }
                                }
                            }
                        }
                    }

                }
            }
        }

        .empty-state {
            text-align: center;
            padding: 3rem 2rem;

            i {
                font-size: 3rem;
                color: #6a6a6a !important;
                margin-bottom: 1rem;
            }

            h4 {
                color: #252525 !important;
                font-weight: 600;
                margin-bottom: 0.5rem;
            }

            p {
                color: #6a6a6a !important;
                margin-bottom: 1.5rem;
            }

            .btn-primary,
            .btn-add {
                background: $color-button;
                border-color: $color-button;
                border-radius: 6px;
                padding: 0.4rem 0.8rem;
                font-weight: 600;
                font-size: 0.875rem;

                &:hover {
                    background: $color-button-hover;
                    border-color: $color-button-hover;
                }

                i {
                    margin-right: 0.4rem;
                    color: white !important;
                    font-size: 0.8rem;
                }
            }
        }
    }
}

// Editor Container
.editor-container {
    // WorkoutEditor component will handle its own styling
    // This container provides the tab context
    min-height: 200px;
}

// Activities Container - Now using ActivityList component
.activities-container {
    .activities-card {
        .activities-header {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 0.75rem;
            border-bottom: 1px solid #e0e0e0;

            h4 {
                font-size: 1.25rem;
                font-weight: 700;
                color: #252525 !important;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 0.5rem;

                i {
                    font-size: 1.1rem;
                    color: $color-info;
                }
            }

            p {
                font-size: 0.875rem;
                color: #6a6a6a !important;
                margin: 10px;
            }
        }

        // .activities-content {
            // ActivityList component will handle its own styling
        // }
    }
}

// Modal Styling
.modal-content {
    color: #252525 !important;
    border: none;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

    .modal-header {
        border-bottom: 1px solid #e0e0e0;
        padding: 1.5rem;

        .modal-title {
            color: #252525 !important;
            font-weight: 700;
            font-size: 1.25rem;
        }
    }

    .modal-body {
        padding: 1.5rem;

        h6 {
            color: #252525 !important;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        p {
            color: #6a6a6a !important;
            margin-bottom: 1rem;
        }

        small {
            color: #6a6a6a !important;
            font-weight: 500;
        }

        .mb-0 {
            color: #252525 !important;
            font-weight: 600;
        }
    }
}

// Add Workout Modal Styling
.modal-content {
    color: #252525 !important;
    border: none;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

    .modal-header {
        border-bottom: 1px solid #e0e0e0;
        padding: 1.5rem;

        .modal-title {
            color: #252525 !important;
            font-weight: 700;
            font-size: 1.25rem;
        }
    }

    .modal-body {
        padding: 1.5rem;

        .form-label {
            font-size: 0.875rem;
            font-weight: 600;
            color: #252525 !important;
            margin-bottom: 0.5rem;
        }

        .form-control {
            height: 45px;
            border-radius: 8px;
            border: 2px solid #e0e0e0;
            font-size: 0.9rem;
            color: #252525 !important;

            &:focus {
                border-color: $color-button;
                box-shadow: 0 0 0 0.2rem rgba(255, 64, 64, 0.25);
            }

            &::placeholder {
                color: #999999 !important;
            }
        }

        .vs__dropdown-toggle {
            height: 45px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;

            &:focus-within {
                border-color: $color-button;
                box-shadow: 0 0 0 0.2rem rgba(255, 64, 64, 0.25);
            }
        }

        .thumbnail-preview {
            border: 2px dashed #e0e0e0;
            border-radius: 8px;
            padding: 1rem;
            text-align: center;
            background: #f8f9fa;

            .no-thumbnail {
                color: #6a6a6a !important;

                i {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }

                p {
                    margin: 0;
                    font-size: 0.875rem;
                }
            }

            .img-thumbnail {
                border-radius: 8px;
                border: 2px solid #e0e0e0;
            }
        }
    }

    .modal-footer {
        border-top: 1px solid #e0e0e0;
        padding: 1rem 1.5rem;

        .btn {
            border-radius: 8px;
            font-weight: 600;
            padding: 0.75rem 1.5rem;

            &.btn-primary {
                background: $color-button;
                border-color: $color-button;

                &:hover {
                    background: $color-button-hover;
                    border-color: $color-button-hover;
                }
            }

            &.btn-secondary {
                background: #6c757d;
                border-color: #6c757d;

                &:hover {
                    background: #5a6268;
                    border-color: #545b62;
                }
            }
        }
    }
}

// Responsive Design
// Animation for expandable details
@keyframes slideDown {
    from {
        opacity: 0;
        max-height: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        max-height: 2000px;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .tab-navigation {
        margin: 15px auto;
        gap: 8px;
        justify-content: center;
        
        .tab-item {
            padding: 6px 12px;
            font-size: 12px;
            
            i {
                font-size: 12px;
            }
        }
    }

    .stats-container .stat-card {
        height: 80px;
        padding: 1rem;

        .stat-icon {
            width: 40px;
            height: 40px;
            margin-right: 0.75rem;

            i {
                font-size: 1.2rem;
            }
        }

        .stat-content h3 {
            font-size: 1.5rem;
        }
    }

    .search-container .search-card {
        padding: 1rem;
    }

    .workouts-container .workouts-card {
        padding: 1rem;

        .workouts-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .workout-item .workout-thumbnail {
            height: 70px;
            min-height: 70px;
            max-height: 70px;
        }
    }

    .editor-container .editor-card {
        padding: 1rem;
    }
}

@media (max-width: 576px) {
    .tab-navigation {
        margin: 10px auto;
        gap: 6px;
        justify-content: center;
        flex-wrap: wrap;
        
        .tab-item {
            padding: 5px 10px;
            font-size: 11px;
            
            i {
                font-size: 11px;
            }
        }
    }

    .stats-container .stat-card {
        height: 70px;
        padding: 0.75rem;

        .stat-icon {
            width: 35px;
            height: 35px;
            margin-right: 0.5rem;

            i {
                font-size: 1rem;
            }
        }

        .stat-content h3 {
            font-size: 1.25rem;
        }

        .stat-content p {
            font-size: 0.8rem;
        }
    }

    .workouts-container .workouts-card .workouts-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }

    .editor-container .editor-card .editor-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }

    // Edit Options Modal Styles
    .edit-options-modal {
        padding: 1rem 0;

        .edit-option-radio {
            margin-bottom: 1rem;
            padding: 0.75rem;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
                background-color: #f5f5f5;
                border-color: $color-button;
            }

            ::v-deep .custom-control-input:checked ~ .custom-control-label {
                color: $color-button;
                font-weight: 500;
            }

            ::v-deep .custom-control-input:checked ~ .custom-control-label::before {
                border-color: $color-button;
                background-color: $color-button;
            }
        }

        .modal-actions {
            padding-top: 1rem;
            border-top: 1px solid #e0e0e0;
            gap: 0.5rem;

            .btn {
                padding: 0.5rem 1rem;
                font-size: 0.875rem;
                min-width: 80px;
            }
        }
    }

    // Restore Changes Modal Styles
    .restore-changes-modal {
        padding: 1rem 0;

        .restore-message {
            text-align: center;
            padding: 1rem 0;

            i {
                display: block;
                margin-bottom: 1rem;
            }

            p {
                color: #252525 !important;
                font-size: 0.95rem;
                line-height: 1.6;
                margin-bottom: 0;

                strong {
                    color: $color-button;
                    font-weight: 600;
                }
            }
        }

        .modal-actions {
            padding-top: 1rem;
            border-top: 1px solid #e0e0e0;

            .btn {
                padding: 0.5rem 1.5rem;
                font-size: 0.875rem;
                min-width: 100px;
            }
        }
    }
}
</style>