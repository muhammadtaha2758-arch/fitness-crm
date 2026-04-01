<template>
    <div>
        <div v-if="showBreadcrumb" class="breadcrumb-nav-row mb-3">
            <div class="breadcrumb-section">
                <nav class="breadcrumb-nav" aria-label="breadcrumb">
                    <div class="breadcrumb-container d-flex align-items-center">
                        <button 
                            @click.stop="goBackToMember" 
                            class="back-button"
                            type="button"
                            title="Go back to member details"
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
                            <li class="breadcrumb-item">
                                <router-link to="/app/members/viewallmembers">
                                    <i class="fas fa-users"></i>
                                    Members
                                </router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link :to="`/app/Members/MemberDetails/${memberId}`">
                                    <i class="fas fa-user"></i>
                                    {{ memberName }}
                                </router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                <i class="fas fa-dumbbell"></i>
                                Workout Editor
                            </li>
                        </ol>
                    </div>
                </nav>
            </div>
        </div>

        <!-- Page Header -->
        <div class="page-header">
            <div class="header-content">
                <h1 class="page-title">
                    Workout Editor
                </h1>
                <!-- Workout Select Box for Editing -->
                <div class="workout-select-row" v-if="!editWorkoutData">
                    <b-form-group label="Select a workout to edit:" label-for="workout-select">
                        <b-form-select
                            id="workout-select"
                            v-model="selectedWorkoutId"
                            :options="workoutSelectOptions"
                            @change="onSelectWorkout"
                            placeholder="Choose a workout..."
                        />
                    </b-form-group>
                </div>
            </div>
            <div class="header-actions">
                <!-- Save Workout Button -->
                <b-button 
                    variant="success" 
                    size="sm" 
                    @click="saveWorkoutActivityPlan"
                    :disabled="!selectedDay || workoutSections.length === 0"
                    class="save-workout-btn"
                >
                    <i class="fas fa-save mr-2"></i>
                    Save Workout
                </b-button>
                <!-- Cancel Edit Button - Only show when editing -->
                <b-button 
                    v-if="editWorkoutData" 
                    variant="outline-secondary" 
                    class="btn-outline-modern ml-2" 
                    @click="cancelEdit"
                >
                    <i class="fas fa-times mr-2"></i>
                    Cancel Edit
                </b-button>
            </div>
        </div> 

        <!-- Three Column Layout -->
        <div class="editor-layout">

            <!-- First Column: Training Plan -->
            <div class="editor-column training-plan" :class="{ 'section-disabled': !editWorkoutData }">
                <div class="column-header">
                    <h3><i class="fas fa-calendar-alt mr-2"></i>Training Plan <span class="header-subtitle">- Create weekly training schedules</span></h3>
                    <b-button variant="outline-primary" size="sm" @click="addDay" class="add-day-btn">
                        <i class="fas fa-plus"></i>
                    </b-button>
                </div>

                <!-- Thumbnail Grid Section -->
                <div v-if="showThumbnailGrid" class="thumbnail-grid-section">
                    <div class="thumbnail-grid-header">
                        <h4>Search results</h4>
                        <b-button variant="link" size="sm" @click="closeThumbnailGrid" class="close-thumbnail-btn">
                            <i class="fas fa-times"></i>
                        </b-button>
                    </div>
                    
                    <!-- Filter Container -->
                    <div class="filter-container">
                        <div class="filter-row">
                            <b-form-input
                                v-model="thumbnailSearch"
                                placeholder="Search activities"
                                class="filter-input"
                            ></b-form-input>
                            <b-form-select v-model="filterBodyPart" :options="bodyPartOptions" class="filter-select"></b-form-select>
                            <b-form-select v-model="filterMuscleGroup" :options="muscleGroupOptions" class="filter-select"></b-form-select>
                        </div>
                        <div class="filter-row">
                            <b-form-select v-model="filterExerciseType" :options="exerciseTypeOptions" class="filter-select"></b-form-select>
                            <b-form-select v-model="filterLevel" :options="levelOptions" class="filter-select"></b-form-select>
                            <b-form-select v-model="filterEquipment" :options="equipmentOptions" class="filter-select"></b-form-select>
                        </div>
                    </div>
                    
                    <!-- Thumbnail Grid -->
                    <div v-if="loadingThumbnails" class="loading-thumbnails">
                        <i class="fas fa-spinner fa-spin"></i> Loading thumbnails...
                    </div>
                    <div v-else class="thumbnail-grid-wrapper">
                        <div ref="thumbnailGrid" class="thumbnail-grid" @scroll="handleThumbnailGridScroll">
                            <div
                                v-for="(thumbnail, thumbIndex) in filteredThumbnails"
                                :key="(thumbnail.id != null ? 'id-' + thumbnail.id : 'fn-' + thumbIndex) + '-' + (thumbnail.filename || '')"
                                class="thumbnail-item"
                                :class="{ 'selected': selectedThumbnails.find(t => t.filename === thumbnail.filename) }"
                                @click="toggleThumbnailSelection(thumbnail)"
                            >
                                <img
                                    :src="getThumbnailSrc(thumbnail)"
                                    :alt="thumbnail.name"
                                    loading="lazy"
                                    @error="onThumbnailImgError($event, thumbnail)"
                                />
                                <div class="thumbnail-overlay">
                                    <span class="thumbnail-name">{{ thumbnail.name }}</span>
                                </div>
                            </div>
                        </div>
                        <!-- Load more thumbnails (paginated) -->
                        <div v-if="thumbnailCurrentPage < thumbnailLastPage && !loadingThumbnails" class="load-more-thumbnails">
                            <div class="d-flex align-items-center justify-content-between w-100">
                                <b-button
                                    variant="outline-primary"
                                    size="sm"
                                    :disabled="loadingMoreThumbnails"
                                    @click="loadMoreThumbnails"
                                >
                                    <i v-if="loadingMoreThumbnails" class="fas fa-spinner fa-spin mr-1"></i>
                                    {{ loadingMoreThumbnails ? 'Loading...' : 'Load more' }}
                                </b-button>
                                <small class="text-muted ml-2">{{ allThumbnails.length }} of {{ thumbnailTotal }} loaded</small>
                            </div>
                        </div>
                        <div v-else-if="thumbnailTotal > 0" class="load-more-thumbnails">
                            <small class="text-muted">{{ thumbnailTotal }} activities loaded</small>
                            <small class="d-block mt-1 text-muted">If thumbnails are missing, run: <code>php artisan videos:generate-thumbnails</code></small>
                        </div>
                        <!-- Scroll to Top Button -->
                        <b-button
                            v-if="showScrollToTop"
                            variant="primary"
                            size="sm"
                            class="scroll-to-top-btn"
                            @click="scrollToTop"
                            title="Scroll to top"
                        >
                            <i class="fas fa-arrow-up"></i>
                        </b-button>
                    </div>
                </div>

                <!-- Existing Training Plan Content -->
                <div v-else class="training-plan-content">
                    <div class="plan-overview">
                    
                        <div class="weekly-schedule">
                            <!-- <div class="schedule-header">
                                <h5>Training Schedule</h5>
                            </div> -->
                            
                            <!-- Selected Day Display -->
                            <div class="selected-day-display" v-if="selectedDay" style="display: none;">
                                <div class="selected-day-info">
                                    <h6><i class="fas fa-calendar-day mr-2"></i>Selected Day: {{ selectedDay }}</h6>
                                    <p class="text-muted">Exercises will be added to this day's workout</p>
                                </div>
                                <b-button variant="outline-secondary" size="sm" @click="clearSelectedDay">
                                    <i class="fas fa-times"></i> Clear
                                </b-button>
                            </div>
                            
                            <div class="days-overview">
                                <div
                                    v-for="(day, index) in trainingPlan.days"
                                    :key="index"
                                    class="day-overview"
                                    :class="{ 'selected': selectedDay === day.name }"
                                    @click="selectDay(day.name)"
                                >
                                    <div class="day-header" style="display: flex; align-items: center; justify-content: space-between;">
                                        <template v-if="day.isNew">
                                            <b-form-select
                                                v-model="day.name"
                                                :options="getDaySelectOptions(index)"
                                                placeholder="Select day..."
                                                class="day-select"
                                                size="md"
                                                @change="onDayNameChange(index, $event)"
                                                @focus="currentEditingIndex = index"
                                                @blur="currentEditingIndex = null"
                                                style="flex: 1; min-width: 0; margin-right: 12px;"
                                            ></b-form-select>
                                        </template>
                                        <template v-else>
                                            <span class="day-name">{{ day.name || 'No day selected' }}</span>
                                        </template>
                                        <b-button variant="danger" size="sm" @click.stop="removeDay(index)" class="delete-day-btn ml-2">
                                            <i class="fas fa-trash"></i>
                                        </b-button>
                                    </div>
                                    <div class="day-info" v-if="day.name">
                                        <small class="text-muted">Selected: {{ day.name }}</small>
                                        <div class="day-exercise-count" v-if="getDayExerciseCount(day.name) > 0">
                                            <small class="text-primary">{{ getDayExerciseCount(day.name) }} exercises</small>
                                        </div>
                                    </div>
                                    <div class="day-info" v-else>
                                        <small class="text-muted">No day selected</small>
                                    </div>
                                </div>
                            </div>
                            <div class="schedule-summary" v-if="trainingPlan.days.length > 0">
                                <div class="summary-header">
                                    <h6>Selected Days:</h6>
                                </div>
                                <div class="selected-days">
                                    <span 
                                        v-for="day in trainingPlan.days.filter(d => d.name)" 
                                        :key="day.name"
                                        class="day-badge"
                                    >
                                        {{ day.name }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

        
                </div>
            </div>

            <!-- Second Column: Exercise Library -->
            <div class="editor-column exercise-library" :class="{ 'section-disabled': !editWorkoutData }">
                <div class="column-header" style="display: flex; align-items: center; justify-content: space-between;">
                    <h3 style="margin: 0;">
                        <i class="fas fa-dumbbell mr-2"></i>
                        Exercises 
                        <span class="header-subtitle">- Browse and select exercises for your workout</span>
                    </h3>
                    <b-button variant="link" size="sm" class="ml-2 add-exercise-btn" style="border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; border: none; padding: 0;" title="Add Exercise" @click="loadAllThumbnails">
                        <i class="fas fa-plus" style="color: #ff4040;"></i>
                    </b-button>
                </div>
                
                <!-- Selected Exercises List -->
                <div class="selected-exercises-list">
                    <div
                        v-for="exercise in selectedThumbnails"
                        :key="exercise.filename"
                        class="selected-exercise-item"
                    >
                        <img :src="resolveAssetUrl(exercise.thumbnail_url)" :alt="exercise.name" class="exercise-thumbnail-small" />
                        <div class="exercise-content">
                            <span class="exercise-name">{{ exercise.name }}</span>
                            <!-- Activity Metadata with Colorful Icons -->
                            <div class="exercise-metadata" v-if="hasMetadata(exercise)">
                                <span v-if="exercise.category" class="metadata-item metadata-category" :title="formatCategory(exercise.category)">
                                    <i class="fas fa-tag"></i>
                                    <span>{{ formatCategory(exercise.category) }}</span>
                                </span>
                                <span v-if="exercise.equipment" class="metadata-item metadata-equipment" :title="exercise.equipment">
                                    <i class="fas fa-dumbbell"></i>
                                    <span>{{ exercise.equipment }}</span>
                                </span>
                                <span v-if="exercise.level" class="metadata-item metadata-level" :title="exercise.level">
                                    <i class="fas fa-signal"></i>
                                    <span>{{ exercise.level }}</span>
                                </span>
                                <span v-if="exercise.targeted_muscle" class="metadata-item metadata-muscle" :title="exercise.targeted_muscle">
                                    <i class="fas fa-fire"></i>
                                    <span>{{ formatMuscle(exercise.targeted_muscle) }}</span>
                                </span>
                            </div>
                        </div>
                        <b-form-checkbox
                            v-model="exercise.selected"
                            @change="toggleThumbnailSelection(exercise)"
                            class="exercise-checkbox"
                        ></b-form-checkbox>
                    </div>
                    <div v-if="selectedThumbnails.length === 0" class="empty-selected-exercises">
                        <p>No exercises selected. Click the + icon to browse exercises.</p>
                    </div>
                </div>
            </div>

            <!-- Third Column: Workout Builder -->
            <div class="editor-column workout-builder" :class="{ 'section-disabled': !editWorkoutData }">
                <div class="column-header">
                    <h3><i class="fas fa-edit mr-2"></i>Workout Builder <span class="header-subtitle">- Drag and drop exercises to build your routine</span></h3>
                </div>

                <div class="workout-sections">
                    <div class="section-header">
                        <h4>Workout Sections</h4>
                    </div>

                    <div class="sections-list">
                        <div v-if="allWorkoutSections.length === 0" class="empty-sections">
                            <div class="empty-state">
                                <i class="fas fa-dumbbell empty-icon"></i>
                                <h5>No workout sections yet</h5>
                                <p v-if="!selectedDay">Select a day to view existing workout plans</p>
                                <p v-else>No workout plans found for {{ selectedDay }}</p>
                            </div>
                        </div>
                        <div
                            v-for="(section, sectionIndex) in allWorkoutSections"
                            :key="section.id || sectionIndex"
                            class="workout-section"
                            :class="{ 'view-only': section.isViewOnly }"
                        >
                            <div class="section-header">
                                <b-form-input
                                    v-model="section.name"
                                    placeholder="Section name..."
                                    class="section-name-input"
                                    :disabled="section.isViewOnly"
                                ></b-form-input>
                                <div class="section-actions">
                                    <b-button 
                                        v-if="section.isViewOnly && section.planData" 
                                        variant="info" 
                                        size="sm" 
                                        @click="loadExistingPlanToEditor(section.planData)"
                                        class="edit-plan-btn"
                                    >
                                        <i class="fas fa-edit"></i> Edit
                                    </b-button>
                                    <b-button 
                                        v-if="section.planData" 
                                        variant="danger" 
                                        size="sm" 
                                        @click="deleteWorkoutPlan(section.planData.id)"
                                    >
                                        <i class="fas fa-trash"></i>
                                    </b-button>
                                    <b-button 
                                        v-if="!section.isViewOnly" 
                                        variant="danger" 
                                        size="sm" 
                                        @click="removeSection(sectionIndex)"
                                    >
                                        <i class="fas fa-times"></i>
                                    </b-button>
                                </div>
                            </div>

                            <div class="exercises-in-section">
                                <!-- Exercise Thumbnails List -->
                                <div class="exercises-thumbnails-list">
                                    <div
                                        v-for="(exercise, exerciseIndex) in section.exercises"
                                        :key="exerciseIndex"
                                        class="exercise-thumbnail-item"
                                    >
                                        <!-- Exercise Image/Video Preview -->
                                        <div class="exercise-preview" v-if="exercise.thumbnail_url || exercise.image">
                                            <img :src="resolveAssetUrl(exercise.thumbnail_url || exercise.image)" :alt="exercise.name" />
                                            <div class="play-button-overlay" @click="playExerciseVideo(exercise)">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="exercise-title-bar">
                                            <h6 class="exercise-title">{{ exercise.name }}</h6>
                                            <b-button 
                                                v-if="!section.isViewOnly" 
                                                variant="danger" 
                                                size="sm" 
                                                class="exercise-delete-btn" 
                                                @click="removeExercise(sectionIndex, exerciseIndex)"
                                            >
                                                <i class="fas fa-trash"></i>
                                            </b-button>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Shared Exercise Details (shown once per section) -->
                                <div class="exercise-details" v-if="section.exercises && section.exercises.length > 0">
                                    <!-- Exercise Type Selection -->
                                    <div class="exercise-type-selection">
                                        <b-form-radio-group 
                                            v-model="section.exerciseType" 
                                            class="exercise-type-radio"
                                            :disabled="section.isViewOnly"
                                        >
                                            <b-form-radio value="repetition">Repetition-based</b-form-radio>
                                            <b-form-radio value="time">Time-based</b-form-radio>
                                        </b-form-radio-group>
                                    </div>

                                    <!-- Sets Configuration Table -->
                                    <div class="sets-configuration">
                                        <table class="sets-table">
                                            <thead>
                                                <tr>
                                                    <th>Reps (x)</th>
                                                    <th>Rest (s)</th>
                                                    <th v-if="enablePresetWeights">Weight (kg/lbs)</th>
                                                    <th v-if="section.setsConfiguration && section.setsConfiguration.length > 3 && !section.isViewOnly">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(set, setIndex) in section.setsConfiguration" :key="setIndex">
                                                    <td>
                                                        <b-form-input
                                                            v-model.number="set.reps"
                                                            type="number"
                                                            min="0"
                                                            class="set-input"
                                                            placeholder="0"
                                                            :disabled="section.isViewOnly"
                                                        ></b-form-input>
                                                    </td>
                                                    <td>
                                                        <b-form-input
                                                            v-model.number="set.rest"
                                                            type="number"
                                                            min="0"
                                                            class="set-input"
                                                            placeholder="0"
                                                            :disabled="section.isViewOnly"
                                                        ></b-form-input>
                                                    </td>
                                                    <td v-if="enablePresetWeights">
                                                        <b-form-input
                                                            v-model.number="set.weight"
                                                            type="number"
                                                            min="0"
                                                            step="0.5"
                                                            class="set-input"
                                                            placeholder="0"
                                                            :disabled="section.isViewOnly"
                                                        ></b-form-input>
                                                    </td>
                                                    <td v-if="section.setsConfiguration && section.setsConfiguration.length > 3 && !section.isViewOnly">
                                                        <b-button 
                                                            variant="danger" 
                                                            size="sm" 
                                                            class="delete-set-row-btn" 
                                                            @click="deleteSetByIndex(section, setIndex)"
                                                            title="Delete this set"
                                                        >
                                                            <i class="fas fa-trash"></i>
                                                        </b-button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="sets-actions" v-if="!section.isViewOnly">
                                            <b-button variant="link" class="add-set-btn" @click="addSetToSection(section)">
                                                <i class="fas fa-plus"></i> Add a set
                                            </b-button>
                                            <b-button 
                                                v-if="section.setsConfiguration && section.setsConfiguration.length > 3"
                                                variant="link" 
                                                class="delete-set-btn" 
                                                @click="deleteSetFromSection(section)"
                                            >
                                                <i class="fas fa-minus"></i> Delete last set
                                            </b-button>
                                        </div>
                                        <!-- Info text for delete feature -->
                                        <div class="sets-info-text" v-if="section.setsConfiguration && section.setsConfiguration.length > 3 && !section.isViewOnly">
                                            <small class="text-muted">
                                                <i class="fas fa-info-circle"></i>
                                                To delete a set below 3, set the Reps(x) to 0. The set will disappear next time you load the exercise.
                                            </small>
                                        </div>
                                    </div>

                                    <!-- Intensity Section -->
                                    <div class="intensity-section">
                                        <b-form-radio-group 
                                            v-model="section.intensityType" 
                                            class="intensity-radio"
                                            :disabled="section.isViewOnly"
                                        >
                                            <b-form-radio value="max">Max Intensity</b-form-radio>
                                            <b-form-radio value="percentage">
                                                <span class="intensity-input-wrapper">
                                                    <b-form-input
                                                        v-model.number="section.intensityValue"
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        class="intensity-input"
                                                        placeholder="0"
                                                        :disabled="section.isViewOnly"
                                                    ></b-form-input>
                                                    <span class="intensity-label">%1RM</span>
                                                </span>
                                            </b-form-radio>
                                        </b-form-radio-group>
                                    </div>

                                    <!-- Notes Section -->
                                    <div class="notes-section">
                                        <label class="notes-label">Notes</label>
                                        <b-form-textarea
                                            v-model="section.notes"
                                            placeholder="Write a note"
                                            rows="4"
                                            class="notes-textarea"
                                            :disabled="section.isViewOnly"
                                        ></b-form-textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Saved Workout Activity Plans Section -->
                <div class="saved-plans-section" v-if="false">
                    <div class="section-header">
                        <h4><i class="fas fa-history mr-2"></i>
                            {{ isUserFiltered ? 'My Saved Workout Plans' : 'Saved Workout Plans' }}
                        </h4>
                        <b-button variant="info" size="sm" @click="loadWorkoutActivityPlans">
                            <i class="fas fa-sync-alt mr-1"></i>Refresh
                        </b-button>
                    </div>
                    
                    <!-- User Filter Info -->
                    <div v-if="isUserFiltered" class="user-filter-info">
                        <small class="text-muted">
                            <i class="fas fa-user mr-1"></i>
                            Showing plans for User ID: {{ currentUserId }} ({{ userPlansCount }} plans)
                        </small>
                    </div>

                    <div class="saved-plans-list">
                        <div v-if="loadingPlans" class="loading-plans">
                            <div class="loading-state">
                                <i class="fas fa-spinner fa-spin loading-icon"></i>
                                <p>Loading saved workout plans...</p>
                            </div>
                        </div>
                        
                        <div v-else-if="workoutActivityPlans.length === 0" class="empty-plans">
                            <div class="empty-state">
                                <i class="fas fa-calendar-times empty-icon"></i>
                                <h5>No saved workout plans</h5>
                                <p>Save a workout plan to see it here</p>
                            </div>
                        </div>
                        
                        <div v-else class="plans-container">
                            <div
                                v-for="(plan, planIndex) in workoutActivityPlans"
                                :key="planIndex"
                                class="saved-plan-card"
                            >
                                <div class="plan-header">
                                    <div class="plan-info">
                                        <h6 class="plan-name">{{ plan.exercise_name || 'Unnamed Workout' }}</h6>
                                        <div class="plan-meta">
                                            <span class="day-badge">{{ plan.day }}</span>
                                            <span class="date-badge">{{ formatDate(plan.created_at) }}</span>
                                        </div>
                                    </div>
                                    <div class="plan-actions">
                                        <b-button variant="primary" size="sm" @click="loadPlanToEditor(plan)">
                                            <i class="fas fa-edit"></i>
                                        </b-button>
                                        <b-button variant="danger" size="sm" @click="deleteWorkoutPlan(plan.id)">
                                            <i class="fas fa-trash"></i>
                                        </b-button>
                                    </div>
                                </div>
                                
                                <div class="plan-details" v-if="plan.exercise_data">
                                    <div class="exercise-summary">
                                        <div class="exercise-item">
                                            <div class="exercise-info">
                                                <h6>{{ plan.exercise_data.exercise_name }}</h6>
                                                <div class="exercise-stats">
                                                    <span class="stat">
                                                        <i class="fas fa-layer-group"></i>
                                                        {{ plan.sets }} sets
                                                    </span>
                                                    <span class="stat">
                                                        <i class="fas fa-redo"></i>
                                                        {{ plan.reps }} reps
                                                    </span>
                                                    <span class="stat">
                                                        <i class="fas fa-pause"></i>
                                                        {{ plan.rest_seconds }}s rest
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="exercise-category">
                                                <span class="category-badge">{{ plan.exercise_data.category }}</span>
                                                <span class="level-badge">{{ plan.exercise_data.level }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Video Player Modal: video loads only when user clicks Play (lazy load) -->
        <b-modal
            v-model="showVideoModal"
            hide-header
            hide-footer
            centered
            size="md"
            class="video-player-modal"
            @hide="closeVideoModal"
            no-close-on-backdrop
        >
            <div class="video-modal-content">
                <button class="close-video-btn" @click="closeVideoModal">
                    <i class="fas fa-times"></i>
                </button>
                <template v-if="currentVideo">
                    <!-- Play button: load and play video only on click -->
                    <div v-if="!videoSrcToPlay" class="video-modal-placeholder" @click="startVideoPlayback">
                        <div class="video-modal-poster" :style="posterStyle"></div>
                        <button class="video-modal-play-btn" aria-label="Play video">
                            <i class="fas fa-play"></i>
                        </button>
                        <span class="video-modal-exercise-name">{{ currentVideo.name }}</span>
                    </div>
                    <!-- Video element: src set only after user clicks play -->
                    <video
                        v-show="videoSrcToPlay"
                        ref="exerciseVideoPlayer"
                        :key="videoSrcToPlay"
                        :src="videoSrcToPlay"
                        loop
                        muted
                        class="exercise-video-modal"
                        @error="handleVideoModalError"
                        @loadeddata="onVideoLoadedData"
                    ></video>
                </template>
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';

/**
 * WorkoutEditor Component
 * 
 * Usage with user filtering:
 * 
 * 1. Pass userId as prop:
 *    <WorkoutEditor :userId="currentUser.id" />
 * 
 * 2. Or let it auto-detect from store/localStorage:
 *    <WorkoutEditor />
 * 
 * The component will automatically:
 * - Filter saved workout plans by user ID
 * - Include user ID when saving new plans
 * - Show user-specific information in the UI
 * - Handle user authentication automatically
 */
export default {
    name: "WorkoutEditor",
    props: {
        editWorkoutData: {
            type: Object,
            default: null
        },
        userId: {
            type: [Number, String],
            default: null
        }
    },
    data() {
        return {
            // Navigation tracking
            showBreadcrumb: false,
            memberId: null,
            memberName: 'Member',
            cameFromMemberDetails: false,
            
            // Search and filter properties
            exerciseSearch: "",
            selectedCategory: "",
            selectedMuscle: "",
            
            // Workout information
            workoutName: "",
            workoutDescription: "",
            enablePresetWeights: false, // Track if preset weights are enabled for this workout
            
            // Filter options for exercise library
            categoryOptions: [
                { value: "", text: "All Categories" },
                { value: "strength", text: "Strength" },
                { value: "cardio", text: "Cardio" },
                { value: "core", text: "Core" },
                { value: "flexibility", text: "Flexibility" },
                { value: "balance", text: "Balance" },
                { value: "mobility", text: "Mobility" },
                { value: "recovery", text: "Recovery" },
                { value: "yoga", text: "Yoga" },
                { value: "pilates", text: "Pilates" },
                { value: "stretching", text: "Stretching" },
                { value: "upper-body", text: "Upper Body" },
                { value: "lower-body", text: "Lower Body" },
                { value: "full-body", text: "Full Body" },
                { value: "other", text: "Other" }
            ],
            muscleOptions: [
                { value: "", text: "All Muscles" },
                { value: "chest", text: "Chest" },
                { value: "back", text: "Back" },
                { value: "legs", text: "Legs" },
                { value: "arms", text: "Arms" },
                { value: "shoulders", text: "Shoulders" },
                { value: "abs", text: "Abs" },
                { value: "full-body", text: "Full Body" },
                { value: "other", text: "Other" }
            ],
            
            // Exercise library data (will be loaded from API)
            exercises: [],
            loadingExercises: false,
            
            // Workout builder data
            workoutSections: [],
            selectedDay: null,
            editingPlanKey: null, // Track which plan is being edited using stable composite key
            editingPlanIds: [], // Track which plan IDs are in edit mode
            
            // Training plan data
            trainingPlan: {
                name: "Training Plan",
                description: "A comprehensive training schedule",
                days: []
            },
            dayOptions: [
                { value: "Monday", text: "Monday" },
                { value: "Tuesday", text: "Tuesday" },
                { value: "Wednesday", text: "Wednesday" },
                { value: "Thursday", text: "Thursday" },
                { value: "Friday", text: "Friday" },
                { value: "Saturday", text: "Saturday" },
                { value: "Sunday", text: "Sunday" }
            ],
            
            // Workout activity plans data
            workoutActivityPlans: [],
            loadingPlans: false,
            // For workout select box
            allWorkouts: [],
            workoutSelectOptions: [],
            selectedWorkoutId: null,
            currentEditingIndex: null, // Add this to track which day is being edited
            
            // Thumbnail management (paginated so we don't load 2000+ at once)
            showThumbnailGrid: false,
            allThumbnails: [],
            loadingThumbnails: false,
            loadingMoreThumbnails: false,
            thumbnailCurrentPage: 1,
            thumbnailLastPage: 1,
            thumbnailTotal: 0,
            thumbnailPerPage: 48,
            failedThumbnailKeys: {}, // Track failed loads to show placeholder and stop blinking
            selectedThumbnails: [], // Array of selected exercise objects
            showScrollToTop: false, // Control scroll to top button visibility
            
            // Video playing state (lazy: video loads only when user clicks Play)
            playingVideos: {}, // Track which exercises are currently playing { exerciseId: true/false }
            showVideoModal: false,
            currentVideo: null, // { url, name, exercise } – set when modal opens
            videoSrcToPlay: null, // Set only when user clicks Play so video loads on demand
            
            // Filter properties for thumbnails
            thumbnailSearch: "",
            filterBodyPart: "",
            filterMuscleGroup: "",
            filterExerciseType: "",
            filterLevel: "",
            filterExerciseList: "",
            filterEquipment: "",
            filterPrimaryJoint: "",
            filterMotion: "",
            
            // Filter options – only targeted muscles that exist in DB: Chest, Triceps, Shoulders, Full Body
            bodyPartOptions: [
                { value: "", text: "All Body Parts" },
                { value: "Chest", text: "Chest" },
                { value: "Triceps", text: "Triceps" },
                { value: "Shoulders", text: "Shoulders" },
                { value: "Full Body", text: "Full Body" }
            ],
            muscleGroupOptions: [
                { value: "", text: "All Muscle Groups" },
                { value: "Chest", text: "Chest" },
                { value: "Triceps", text: "Triceps" },
                { value: "Shoulders", text: "Shoulders" },
                { value: "Full Body", text: "Full Body" }
            ],
            // Exercise Types = video_catalog.category (only DB values)
            exerciseTypeOptions: [
                { value: "", text: "All Exercise Types" },
                { value: "Chest", text: "Chest" },
                { value: "Calisthenics-Cardio-Functional", text: "Calisthenics-Cardio-Functional" },
                { value: "Back", text: "Back" },
                { value: "Abdominals", text: "Abdominals" },
                { value: "Biceps", text: "Biceps" },
                { value: "Triceps", text: "Triceps" }
            ],
            levelOptions: [
                { value: "", text: "All Levels" },
                { value: "beginner", text: "Beginner" },
                { value: "intermediate", text: "Intermediate" },
                { value: "advanced", text: "Advanced" }
            ],
            equipmentOptions: [
                { value: "", text: "All Equipment" },
                { value: "dumbbell", text: "Dumbbell" },
                { value: "barbell", text: "Barbell" },
                { value: "cable", text: "Cable" },
                { value: "bodyweight", text: "Bodyweight" },
                { value: "resistance-band", text: "Resistance Band" }
            ],
            primaryJointOptions: [
                { value: "", text: "All Joints" },
                { value: "shoulder", text: "Shoulder" },
                { value: "elbow", text: "Elbow" },
                { value: "hip", text: "Hip" },
                { value: "knee", text: "Knee" }
            ],
            motionOptions: [
                { value: "", text: "All Motions" },
                { value: "push", text: "Push" },
                { value: "pull", text: "Pull" },
                { value: "squat", text: "Squat" },
                { value: "lunge", text: "Lunge" }
            ],
        };
    },
    computed: {
        posterStyle() {
            if (!this.currentVideo) return {};
            const thumb = this.currentVideo.thumbnail_url || (this.currentVideo.exercise && this.currentVideo.exercise.thumbnail_url);
            if (!thumb) return {};
            return { backgroundImage: `url(${this.resolveAssetUrl(thumb)})` };
        },
        // Filter exercises based on search and category/muscle selection
        filteredExercises() {
            return this.exercises.filter(exercise => {
                const matchesSearch = exercise.name.toLowerCase().includes(this.exerciseSearch.toLowerCase());
                const matchesCategory = !this.selectedCategory || exercise.category === this.selectedCategory;
                const matchesMuscle = !this.selectedMuscle || exercise.muscle === this.selectedMuscle;
                
                return matchesSearch && matchesCategory && matchesMuscle;
            });
        },
        
        // Filter thumbnails: server-side via video-catalog-thumbnails API (params: search, category, equipment, level, targeted_muscle).
        // Display the current result set; no client-side filter needed.
        filteredThumbnails() {
            return this.allThumbnails || [];
        },
        
        // Calculate total number of exercises in workout
        totalExercises() {
            if (!this.workoutSections || this.workoutSections.length === 0) {
                return 0;
            }
            return this.workoutSections.reduce((total, section) => {
                return total + (section.exercises ? section.exercises.length : 0);
            }, 0);
        },
        
        // Calculate estimated workout duration
        totalDuration() {
            const exerciseTime = this.totalExercises * 2; // 2 minutes per exercise
            const restTime = this.workoutSections.reduce((total, section) => {
                return total + (section.exercises ? section.exercises.reduce((sectionTotal, exercise) => {
                    return sectionTotal + (exercise.rest || 0);
                }, 0) : 0);
            }, 0) / 60; // Convert seconds to minutes
            
            return Math.round(exerciseTime + restTime);
        },
        
        // Calculate estimated calories burned
        estimatedCalories() {
            return this.totalDuration * 10; // Rough estimate: 10 calories per minute
        },
        
        // Check if user filtering is active
        isUserFiltered() {
            return this.getCurrentUserId() !== null;
        },
        
        // Get filtered plans count for current user
        userPlansCount() {
            const currentUserId = this.getCurrentUserId();
            if (!currentUserId) return this.workoutActivityPlans.length;
            return this.workoutActivityPlans.filter(plan => plan.user_id == currentUserId).length;
        },
        
        // Get current user ID for display
        currentUserId() {
            return this.getCurrentUserId();
        },
        availableDayOptions() {
            // Get all selected days except the current one being edited
            const existingDays = this.trainingPlan.days
                .map((d, index) => ({ name: d.name, index }))
                .filter(d => d.name && d.index !== this.currentEditingIndex)
                .map(d => d.name);
            
            return this.dayOptions.filter(day => !existingDays.includes(day.value));
        },
        
        // Convert existing plans for selected day to workout sections (view-only)
        viewOnlyWorkoutSections() {
            if (!this.selectedDay) return [];
            
            const existingPlans = this.getExistingPlansForDay(this.selectedDay);
            if (existingPlans.length === 0) return [];
            
            // Filter out plans that are currently being edited
            const plansToShow = existingPlans.filter(plan => !this.editingPlanIds.includes(plan.id));
            
            return plansToShow.map(plan => {
                // Determine setsConfiguration
                let setsConfig;
                if (plan.sets_configuration && Array.isArray(plan.sets_configuration) && plan.sets_configuration.length > 0) {
                    setsConfig = plan.sets_configuration.filter(set => set.reps > 0).map(set => ({
                        reps: set.reps,
                        rest: set.rest || 30,
                        weight: set.weight || 0
                    }));
                } else if (plan.sets && plan.reps && plan.rest_seconds) {
                    setsConfig = [];
                    for (let i = 0; i < plan.sets; i++) {
                        setsConfig.push({
                            reps: plan.reps,
                            rest: plan.rest_seconds,
                            weight: 0
                        });
                    }
                } else {
                    setsConfig = [
                        { reps: 10, rest: 30, weight: 0 },
                        { reps: 10, rest: 30, weight: 0 },
                        { reps: 10, rest: 30, weight: 0 }
                    ];
                }
                
                // Ensure at least 3 sets
                while (setsConfig.length < 3) {
                    setsConfig.push({ reps: 10, rest: 30, weight: 0 });
                }
                
                // Create exercise object
                const isThumbnailExercise = !plan.exercise_id && plan.thumbnail_url;
                let exercise;
                
                if (isThumbnailExercise) {
                    exercise = {
                        id: null,
                        name: plan.exercise_name || plan.exercise_data?.exercise_name,
                        thumbnail_url: plan.thumbnail_url || plan.exercise_data?.thumbnail,
                        filename: plan.thumbnail_filename || plan.exercise_data?.thumbnail_filename,
                        day: plan.day
                    };
                } else if (plan.exercise_data) {
                    exercise = {
                        id: plan.exercise_id,
                        name: plan.exercise_data.exercise_name,
                        category: plan.exercise_data.category,
                        muscle: plan.exercise_data.muscles_targeted || 'Full Body',
                        difficulty: plan.exercise_data.level,
                        image: plan.exercise_data.thumbnail || '/images/99078543gym logo.png',
                        description: plan.exercise_data.description,
                        instructions: plan.exercise_data.instructions,
                        equipment: plan.exercise_data.equipment,
                        duration: plan.exercise_data.duration,
                        calories: plan.exercise_data.calories_burned,
                        videoLink: plan.exercise_data.video_link,
                        tags: plan.exercise_data.tags,
                        restPeriod: plan.exercise_data.rest_period,
                        thumbnail_url: plan.exercise_data.thumbnail,
                        day: plan.day
                    };
                } else {
                    exercise = {
                        id: plan.exercise_id,
                        name: plan.exercise_name,
                        day: plan.day
                    };
                }
                
                return {
                    id: plan.id, // Store plan ID for reference
                    name: plan.exercise_name || 'Main Section',
                    exercises: [exercise],
                    exerciseType: plan.exercise_type || 'repetition',
                    setsConfiguration: setsConfig,
                    intensityType: plan.intensity_type || 'max',
                    intensityValue: plan.intensity_value || 0,
                    notes: plan.notes || '',
                    isViewOnly: !this.editingPlanIds.includes(plan.id), // Mark as view-only if not in edit mode
                    planData: plan // Store full plan data for reference
                };
            });
        },
        
        // Combine view-only sections with editable sections
        allWorkoutSections() {
            // Combine view-only sections (excluding those being edited) with editable sections
            const allSections = [...this.viewOnlyWorkoutSections];
            
            // Add editable sections
            if (this.workoutSections.length > 0) {
                allSections.push(...this.workoutSections);
            }
            
            return allSections;
        }
    },
    methods: {
        // Helper method to create a default set object
        createDefaultSet(reps = 10, rest = 30) {
            const set = { reps, rest };
            if (this.enablePresetWeights) {
                set.weight = 0;
            }
            return set;
        },
        // Load exercises from API
        async loadActivities() {
            this.loadingExercises = true;
            try {
                const response = await axios.get('workout_exercises');
                if (response.data && response.data.exercises) {
                    // Transform API data to match expected format
                    this.exercises = response.data.exercises.map(exercise => ({
                        id: exercise.id,
                        name: exercise.exercise_name || 'Unnamed Exercise',
                        category: exercise.category || 'Other',
                        muscle: exercise.muscles_targeted || "Full Body",
                        difficulty: exercise.level || 'Beginner',
                        image: exercise.thumbnail ? '/' + exercise.thumbnail : '/images/99078543gym logo.png',
                        duration: exercise.duration ? `${exercise.duration} min` : "30 sec",
                        description: exercise.description || '',
                        instructions: exercise.instructions || '',
                        equipment: exercise.equipment || 'None',
                        calories: exercise.calories_burned || 0,
                        videoLink: exercise.video_link || '',
                        tags: exercise.tags || [],
                        restPeriod: exercise.rest_period || 60,
                        // Additional API fields
                        visibleFor: exercise.visible_for,
                        primaryMuscleGroups: exercise.primary_muscle_groups || [],
                        secondaryMuscleGroups: exercise.secondary_muscle_groups || [],
                        primaryJoint: exercise.primary_joint || '',
                        type: exercise.type || 'exercise',
                        usesWeights: exercise.uses_weights || false,
                        intensity: exercise.intensity || 'medium',
                        setsConfiguration: exercise.sets_configuration || { sets: 3, reps: 10 },
                        restPeriodSeconds: exercise.rest_period_seconds || 60,
                        qrLink: exercise.qr_link || '',
                        manufacturer: exercise.manufacturer || '',
                    }));
                } else {
                    throw new Error('Invalid response format from API');
                }
            } catch (error) {
                // Don't log authentication errors that are being handled by the interceptor
                // (they will redirect to login)
                if (!error.isHandled && !error.isAuthError) {
                    console.error('Error loading activities:', error);
                    this.$bvToast.toast("Failed to load exercises. Please refresh the page.", {
                        title: "Error",
                        variant: "danger",
                        solid: true
                    });
                }
                // Keep using empty array if API fails
            } finally {
                this.loadingExercises = false;
            }
        },
        addExerciseToWorkout(exercise) {
            // Validate exercise data
            if (!exercise || !exercise.id || !exercise.name) {
                this.$bvToast.toast("Invalid exercise data. Please try again.", {
                    title: "Error",
                    variant: "danger",
                    solid: true
                });
                return;
            }

            // Check if a day is selected
            if (!this.selectedDay) {
                this.$bvToast.toast("Please select a day from the training plan first!", {
                    title: "No Day Selected",
                    variant: "warning",
                    solid: true
                });
                return;
            }
            
            // Clear editing plan key when manually adding exercises (starting new plan)
            if (this.editingPlanKey && this.workoutSections.length === 0) {
                this.editingPlanKey = null;
            }
            
            // Check if exercise already exists in current day
            const existingExercise = this.workoutSections.some(section => 
                section.exercises && section.exercises.some(ex => 
                    ex.id === exercise.id && ex.day === this.selectedDay
                )
            );
            
            if (existingExercise) {
                this.$bvToast.toast(`${exercise.name} is already added to ${this.selectedDay}'s workout!`, {
                    title: "Exercise Already Added",
                    variant: "warning",
                    solid: true
                });
                return;
            }
            
            // Create a section if none exists
            if (this.workoutSections.length === 0) {
                this.addSection();
            }
            
            // Add to the first section
            const targetSection = this.workoutSections[0];
            
            // Create exercise object with API data and default workout settings
            const workoutExercise = {
                id: exercise.id,
                name: exercise.name,
                category: exercise.category || 'Other',
                muscle: exercise.muscle || 'Full Body',
                difficulty: exercise.difficulty || 'Beginner',
                image: exercise.image || '/images/99078543gym logo.png',
                description: exercise.description || '',
                instructions: exercise.instructions || '',
                equipment: exercise.equipment || 'None',
                duration: exercise.duration || '30 sec',
                calories: exercise.calories || 0,
                videoLink: exercise.videoLink || '',
                tags: exercise.tags || [],
                restPeriod: exercise.restPeriod || 60,
                // Workout-specific settings with validation
                sets: Math.max(1, exercise.setsConfiguration ? exercise.setsConfiguration.sets || 3 : 3),
                reps: Math.max(1, exercise.setsConfiguration ? exercise.setsConfiguration.reps || 10 : 10),
                rest: Math.max(0, exercise.restPeriodSeconds || exercise.restPeriod || 60),
                // Day association
                day: this.selectedDay
            };
            
            targetSection.exercises.push(workoutExercise);
            
            // Ensure section has at least 3 sets in setsConfiguration
            if (!targetSection.setsConfiguration || targetSection.setsConfiguration.length < 3) {
                const defaultSets = [
                    this.createDefaultSet(10, 30),
                    this.createDefaultSet(10, 30),
                    this.createDefaultSet(10, 30)
                ];
                // If setsConfiguration exists but has less than 3, pad it
                if (targetSection.setsConfiguration && targetSection.setsConfiguration.length > 0) {
                    while (targetSection.setsConfiguration.length < 3) {
                        targetSection.setsConfiguration.push(this.createDefaultSet(10, 30));
                    }
                } else {
                    targetSection.setsConfiguration = defaultSets;
                }
            }
            
            // Show success message (optional - can be removed if too many toasts)
            // this.$bvToast.toast(`${exercise.name} added to ${this.selectedDay}'s workout!`, {
            //     title: "Exercise Added",
            //     variant: "success",
            //     solid: true
            // });
        },
        addSection() {
            this.workoutSections.push({
                name: `Section ${this.workoutSections.length + 1}`,
                exercises: [],
                exerciseType: 'repetition', // Shared exercise type
                setsConfiguration: [
                    this.createDefaultSet(10, 30),
                    this.createDefaultSet(10, 30),
                    this.createDefaultSet(10, 30)
                ],
                intensityType: 'max', // Shared intensity type
                intensityValue: 0,
                notes: '' // Shared notes
            });
        },
        removeSection(sectionIndex) {
            this.workoutSections.splice(sectionIndex, 1);
            
            // If this was the last section, show a message (optional)
            // if (this.workoutSections.length === 0) {
            //     this.$bvToast.toast("All sections removed. Add exercises from the library to create new sections.", {
            //         title: "Sections Cleared",
            //         variant: "info",
            //         solid: true
            //     });
            // }
        },
        // Resolve thumbnail/video URL so it loads from current origin (fixes thumbnails not displaying when API returns relative path)
        resolveAssetUrl(url) {
            if (!url || typeof url !== 'string') return '';
            const u = url.trim();
            if (u.startsWith('http://') || u.startsWith('https://')) return u;
            const path = u.startsWith('/') ? u : '/' + u;
            return window.location.origin + path;
        },
        // Normalize thumbnail filename to image extension (.jpg), never video extension (.mp4)
        // Thumbnails are images, not videos - this ensures we always send the correct image filename
        normalizeThumbnailFilename(filename) {
            if (!filename || typeof filename !== 'string') return filename || '';
            const ext = filename.split('.').pop().toLowerCase();
            // If it's a video extension, convert to .jpg
            if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(ext)) {
                const basename = filename.substring(0, filename.lastIndexOf('.'));
                return basename + '.jpg';
            }
            return filename;
        },
        // Placeholder when thumbnail fails (data URL so no extra request; stops blinking)
        thumbnailPlaceholderDataUrl() {
            return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120"><rect fill="#e9ecef" width="200" height="120"/><text x="50%" y="50%" fill="#6c757d" font-size="12" font-family="sans-serif" text-anchor="middle" dy=".3em">No image</text></svg>');
        },
        getThumbnailSrc(thumbnail) {
            const key = thumbnail.id != null ? String(thumbnail.id) : (thumbnail.filename || thumbnail.name || '');
            if (this.failedThumbnailKeys[key]) return this.thumbnailPlaceholderDataUrl();
            return this.resolveAssetUrl(thumbnail.thumbnail_url);
        },
        onThumbnailImgError(event, thumbnail) {
            const key = thumbnail.id != null ? String(thumbnail.id) : (thumbnail.filename || thumbnail.name || '');
            if (!this.failedThumbnailKeys[key]) {
                this.$set(this.failedThumbnailKeys, key, true);
            }
        },
        // Build request params for video-catalog-thumbnails API (matches video_catalog columns).
        getVideoCatalogFilterParams() {
            const search = (this.thumbnailSearch || '').trim();
            const category = (this.filterExerciseType || '').trim();
            const equipment = (this.filterEquipment || '').trim();
            const level = (this.filterLevel || '').trim();
            const targetedMuscle = [this.filterBodyPart, this.filterMuscleGroup].filter(Boolean).map(v => (v || '').trim()).filter(Boolean);
            return {
                ...(search ? { search } : {}),
                ...(category ? { category } : {}),
                ...(equipment ? { equipment } : {}),
                ...(level ? { level } : {}),
                ...(targetedMuscle.length ? { targeted_muscle: targetedMuscle } : {})
            };
        },
        // Load first page of thumbnails only (paginated – avoids 2000+ requests and hanging UI)
        async loadAllThumbnails() {
            this.loadingThumbnails = true;
            this.allThumbnails = [];
            this.failedThumbnailKeys = {};
            this.thumbnailCurrentPage = 1;
            this.thumbnailLastPage = 1;
            this.thumbnailTotal = 0;
            try {
                const catalogResponse = await axios.get('workout_exercises/video-catalog-thumbnails', {
                    params: { page: 1, per_page: this.thumbnailPerPage, ...this.getVideoCatalogFilterParams() }
                });
                if (catalogResponse.data && catalogResponse.data.success && Array.isArray(catalogResponse.data.thumbnails)) {
                    this.allThumbnails = catalogResponse.data.thumbnails.map(t => this.normalizeThumbnailItem(t));
                    this.thumbnailTotal = catalogResponse.data.total ?? this.allThumbnails.length;
                    this.thumbnailCurrentPage = catalogResponse.data.current_page ?? 1;
                    this.thumbnailLastPage = catalogResponse.data.last_page ?? 1;
                    this.showThumbnailGrid = true;
                } else {
                    const response = await axios.get('workout_exercises/all-thumbnails');
                    if (response.data && response.data.success) {
                        this.allThumbnails = (response.data.thumbnails || []).map(t => ({ ...t, id: null }));
                        this.thumbnailTotal = this.allThumbnails.length;
                        this.thumbnailLastPage = 1;
                        this.showThumbnailGrid = true;
                    } else {
                        this.$bvToast.toast('Failed to load thumbnails', {
                            title: 'Error',
                            variant: 'danger',
                            solid: true
                        });
                    }
                }
            } catch (error) {
                try {
                    const response = await axios.get('workout_exercises/all-thumbnails');
                    if (response.data && response.data.success) {
                        this.allThumbnails = (response.data.thumbnails || []).map(t => ({ ...t, id: null }));
                        this.thumbnailTotal = this.allThumbnails.length;
                        this.thumbnailLastPage = 1;
                        this.showThumbnailGrid = true;
                    } else {
                        this.$bvToast.toast('Failed to load thumbnails', {
                            title: 'Error',
                            variant: 'danger',
                            solid: true
                        });
                    }
                } catch (fallbackError) {
                    console.error('Failed to load thumbnails:', fallbackError);
                    this.$bvToast.toast('Failed to load thumbnails', {
                        title: 'Error',
                        variant: 'danger',
                        solid: true
                    });
                }
            } finally {
                this.loadingThumbnails = false;
            }
        },
        normalizeThumbnailItem(t) {
            // Extract filename from thumbnail_url (should be .jpg) or fallback to name + .jpg
            let filename = (t.thumbnail_url && t.thumbnail_url.split('/').pop()) ? t.thumbnail_url.split('/').pop() : (t.name + '.jpg');
            // Decode URL-encoded filename and normalize to ensure it's .jpg, not .mp4
            try {
                filename = decodeURIComponent(filename);
            } catch (e) {
                // If decoding fails, use as-is
            }
            filename = this.normalizeThumbnailFilename(filename);
            return {
                id: t.id,
                name: t.name,
                filename: filename,
                thumbnail_url: t.thumbnail_url,
                video_url: t.video_url,
                modified: t.modified,
                // Preserve metadata fields
                category: t.category || null,
                equipment: t.equipment || null,
                level: t.level || null,
                targeted_muscle: t.targeted_muscle || null
            };
        },
        async loadMoreThumbnails() {
            if (this.loadingMoreThumbnails || this.thumbnailCurrentPage >= this.thumbnailLastPage) return;
            this.loadingMoreThumbnails = true;
            try {
                const nextPage = this.thumbnailCurrentPage + 1;
                const res = await axios.get('workout_exercises/video-catalog-thumbnails', {
                    params: { page: nextPage, per_page: this.thumbnailPerPage, ...this.getVideoCatalogFilterParams() }
                });
                if (res.data && res.data.success && Array.isArray(res.data.thumbnails)) {
                    const more = res.data.thumbnails.map(t => this.normalizeThumbnailItem(t));
                    this.allThumbnails = this.allThumbnails.concat(more);
                    this.thumbnailCurrentPage = res.data.current_page ?? nextPage;
                    this.thumbnailLastPage = res.data.last_page ?? this.thumbnailLastPage;
                }
            } catch (err) {
                console.error('Load more thumbnails failed:', err);
                this.$bvToast.toast('Failed to load more thumbnails', { title: 'Error', variant: 'danger', solid: true });
            } finally {
                this.loadingMoreThumbnails = false;
            }
        },
        
        // Toggle thumbnail selection
        toggleThumbnailSelection(thumbnail) {
            const index = this.selectedThumbnails.findIndex(t => t.filename === thumbnail.filename);
            if (index > -1) {
                // Remove from selected
                this.selectedThumbnails.splice(index, 1);
                // Remove from workout builder too
                this.removeExerciseByThumbnail(thumbnail.filename);
            } else {
                // Add to selected
                this.selectThumbnail(thumbnail);
            }
        },
        
        // Select a thumbnail (id = video_catalog id when from video-catalog-thumbnails → correct video on play)
        selectThumbnail(thumbnail) {
            const exists = this.selectedThumbnails.find(t => (t.id != null && t.id === thumbnail.id) || t.filename === thumbnail.filename);
            if (!exists) {
                const exercise = {
                    id: thumbnail.id != null ? thumbnail.id : null,
                    name: thumbnail.name,
                    thumbnail_url: thumbnail.thumbnail_url,
                    filename: thumbnail.filename,
                    video_url: thumbnail.video_url || null,
                    selected: true,
                    // Include metadata fields
                    category: thumbnail.category || null,
                    equipment: thumbnail.equipment || null,
                    level: thumbnail.level || null,
                    targeted_muscle: thumbnail.targeted_muscle || null
                };
                this.selectedThumbnails.push(exercise);
                
                // Also add to workout builder if a day is selected
                if (this.selectedDay) {
                    this.addExerciseFromThumbnail(exercise);
                } else {
                    this.$bvToast.toast('Please select a day from the training plan first!', {
                        title: 'No Day Selected',
                        variant: 'warning',
                        solid: true
                    });
                }
            }
        },
        
        // Add exercise from thumbnail to workout builder
        addExerciseFromThumbnail(exercise) {
            if (!this.selectedDay) {
                this.$bvToast.toast('Please select a day first!', {
                    title: 'No Day Selected',
                    variant: 'warning',
                    solid: true
                });
                return;
            }
            
            // Check if exercise already exists in current day
            const existingExercise = this.workoutSections.some(section => 
                section.exercises && section.exercises.some(ex => 
                    ex.filename === exercise.filename && ex.day === this.selectedDay
                )
            );
            
            if (existingExercise) {
                this.$bvToast.toast(`${exercise.name} is already added to ${this.selectedDay}'s workout!`, {
                    title: 'Exercise Already Added',
                    variant: 'warning',
                    solid: true
                });
                return;
            }
            
            // Clear editing plan key when manually adding exercises (starting new plan)
            if (this.editingPlanKey && this.workoutSections.length === 0) {
                this.editingPlanKey = null;
            }
            
            if (this.workoutSections.length === 0) {
                this.addSection();
            }
            
            const workoutExercise = {
                id: exercise.id,
                name: exercise.name,
                thumbnail_url: exercise.thumbnail_url,
                filename: exercise.filename,
                video_url: exercise.video_url || null,
                day: this.selectedDay
            };

            this.workoutSections[0].exercises.push(workoutExercise);
        },
        
        // Remove exercise by thumbnail filename
        removeExerciseByThumbnail(filename) {
            this.workoutSections.forEach(section => {
                if (section.exercises) {
                    section.exercises.forEach(ex => {
                        if (ex.filename === filename && this.playingVideos[ex.id]) {
                            this.stopVideo(ex.id);
                        }
                    });
                    section.exercises = section.exercises.filter(ex => ex.filename !== filename);
                }
            });
        },
        
        // Handle video modal error
        handleVideoModalError(event) {
            console.error('Video error:', event);
            const exerciseName = this.currentVideo ? this.currentVideo.name : 'Unknown';
            this.$bvToast.toast(`Failed to load video for ${exerciseName}. Please check if the video file exists.`, {
                title: 'Video Error',
                variant: 'warning',
                solid: true
            });
            this.closeVideoModal();
        },
        
        // Close thumbnail grid
        closeThumbnailGrid() {
            this.showThumbnailGrid = false;
            this.showScrollToTop = false;
        },
        
        // Scroll to top of thumbnail grid
        scrollToTop() {
            if (this.$refs.thumbnailGrid) {
                this.$refs.thumbnailGrid.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        },
        
        // Handle scroll event on thumbnail grid
        handleThumbnailGridScroll() {
            if (this.$refs.thumbnailGrid) {
                const scrollTop = this.$refs.thumbnailGrid.scrollTop;
                // Show button when scrolled down more than 200px
                this.showScrollToTop = scrollTop > 200;
            }
        },
        
        // Play exercise video in modal
        async playExerciseVideo(exercise) {
            // Get video URL
            const videoUrl = await this.getVideoUrl(exercise);
            if (!videoUrl) {
                this.$bvToast.toast(`Video not found for ${exercise.name}`, {
                    title: 'Video Error',
                    variant: 'warning',
                    solid: true
                });
                return;
            }
            
            // Set current video and show modal (video src set only when user clicks Play)
            this.videoSrcToPlay = null;
            this.currentVideo = {
                url: this.resolveAssetUrl(videoUrl),
                name: exercise.name,
                exercise: exercise,
                thumbnail_url: exercise.thumbnail_url ? this.resolveAssetUrl(exercise.thumbnail_url) : null
            };
            this.showVideoModal = true;
        },
        
        // Load and play video only when user clicks Play (lazy load)
        startVideoPlayback() {
            if (!this.currentVideo || !this.currentVideo.url) return;
            this.videoSrcToPlay = this.currentVideo.url;
            this.$nextTick(() => {
                const el = this.$refs.exerciseVideoPlayer;
                if (el) {
                    el.play().catch(err => console.warn('Video play failed:', err));
                }
            });
        },
        
        onVideoLoadedData() {
            const el = this.$refs.exerciseVideoPlayer;
            if (el && this.videoSrcToPlay && el.paused) {
                el.play().catch(() => {});
            }
        },
        
        // Reject malformed video URLs (e.g. stored "http://localhost/APP_URL=http://localhost:8080/...")
        isInvalidVideoUrl(url) {
            if (!url || typeof url !== 'string') return true;
            return /APP_URL\s*=/i.test(url.trim());
        },
        // Get video URL for exercise. Prefer resolving by name so we get the correct path (e.g. Back_compressed/...) from catalog; stored video_url may be relative and point to wrong host.
        async getVideoUrl(exercise) {
            const nameToResolve = exercise.name || (exercise.filename && exercise.filename.replace(/\.(jpg|jpeg|png|mp4)$/i, ''));
            // Resolve from video_catalog by name first (correct path + absolute URL from API; fixes "45 degree hyperextension arms to chest" etc.)
            if (nameToResolve) {
                try {
                    const res = await axios.get('workout_exercises/video-url-by-name', { params: { name: nameToResolve } });
                    if (res.data && res.data.success && res.data.video_url && !this.isInvalidVideoUrl(res.data.video_url)) {
                        return res.data.video_url;
                    }
                } catch (e) {
                    console.warn('video-url-by-name failed:', e);
                }
            }
            // Use stored video_url only if absolute and not malformed
            if (exercise.video_url && !this.isInvalidVideoUrl(exercise.video_url)) {
                const u = String(exercise.video_url).trim();
                if (u.startsWith('http://') || u.startsWith('https://')) {
                    return exercise.video_url;
                }
                if (u.startsWith('/api/workout_exercises/video/')) {
                    return u.startsWith('/') ? window.location.origin + u : u;
                }
            }

            const baseName = exercise.filename ? exercise.filename.replace(/\.(jpg|jpeg|png)$/i, '') : nameToResolve;
            if (!baseName) return null;
            try {
                const response = await axios.get('workout_exercises/available-videos');
                if (response.data && response.data.success && response.data.videos) {
                    const matchingVideo = response.data.videos.find(video => {
                        const videoName = video.name.toLowerCase();
                        const exerciseName = baseName.toLowerCase();
                        return videoName === exerciseName ||
                               videoName.includes(exerciseName) ||
                               exerciseName.includes(videoName);
                    });
                    if (matchingVideo && matchingVideo.url && !this.isInvalidVideoUrl(matchingVideo.url)) {
                        return matchingVideo.url;
                    }
                }
            } catch (error) {
                console.error('Error fetching available videos:', error);
            }

            return null;
        },
        
        // Close video modal
        closeVideoModal() {
            this.showVideoModal = false;
            this.currentVideo = null;
            this.videoSrcToPlay = null;
        },
        
        // Stop video
        stopVideo(exerciseId) {
            this.$set(this.playingVideos, exerciseId, false);
        },
        
        removeExercise(sectionIndex, exerciseIndex) {
            const exercise = this.workoutSections[sectionIndex].exercises[exerciseIndex];
            // Stop video if playing
            if (exercise && this.playingVideos[exercise.id]) {
                this.stopVideo(exercise.id);
            }
            this.workoutSections[sectionIndex].exercises.splice(exerciseIndex, 1);
            
            // If this was the last exercise in the section, remove the section too
            if (this.workoutSections[sectionIndex].exercises.length === 0) {
                this.removeSection(sectionIndex);
            }
        },
        // Save workout activity plan to database
        async saveWorkoutActivityPlan() {
            // Validate required data
            if (!this.selectedDay) {
                this.$bvToast.toast("Please select a day first!", {
                    title: "No Day Selected",
                    variant: "warning",
                    solid: true
                });
                return;
            }

            if (!this.workoutSections || this.workoutSections.length === 0) {
                this.$bvToast.toast("No exercises to save!", {
                    title: "No Exercises",
                    variant: "warning",
                    solid: true
                });
                return;
            }

            // Validate that exercises exist for the selected day
            const exercisesForDay = this.workoutSections.reduce((total, section) => {
                return total + (section.exercises ? section.exercises.filter(ex => ex.day === this.selectedDay).length : 0);
            }, 0);

            if (exercisesForDay === 0) {
                this.$bvToast.toast(`No exercises found for ${this.selectedDay}!`, {
                    title: "No Exercises for Day",
                    variant: "warning",
                    solid: true
                });
                return;
            }

            try {
                // Prepare activity plan data with validation
                // Get workout_id from editWorkoutData or from the first exercise's plan (if editing)
                let workoutId = null;
                if (this.editWorkoutData && this.editWorkoutData.id) {
                    workoutId = this.editWorkoutData.id;
                } else if (this.workoutSections.length > 0) {
                    // Try to get workout_id from the plan if we're editing
                    const firstSection = this.workoutSections[0];
                    if (firstSection && firstSection.exercises && firstSection.exercises.length > 0) {
                        const firstExercise = firstSection.exercises[0];
                        if (firstExercise.workout_id) {
                            workoutId = firstExercise.workout_id;
                        }
                    }
                }
                
                const workoutActivityPlanData = {
                    day: this.selectedDay,
                    workout_name: this.workoutName || `${this.selectedDay} Workout`,
                    workout_id: workoutId, // Use workout_id if available (for updates)
                    description: this.workoutDescription || `Workout plan for ${this.selectedDay}`,
                    user_id: this.getCurrentUserId(), // Include user ID for filtering
                    exercises: []
                };

                // Flatten all exercises from all sections with validation
                this.workoutSections.forEach(section => {
                    if (section.exercises && Array.isArray(section.exercises)) {
                        // Get setsConfiguration from section (shared across exercises in section)
                        // Filter out sets with reps=0 (marked for deletion)
                        // Ensure weight is included if enablePresetWeights is true
                        let setsConfig = (section.setsConfiguration || [
                            this.createDefaultSet(10, 30),
                            this.createDefaultSet(10, 30),
                            this.createDefaultSet(10, 30)
                        ]).filter(set => set.reps > 0);
                        
                        // Ensure all sets have weight field if enablePresetWeights is true
                        if (this.enablePresetWeights) {
                            setsConfig = setsConfig.map(set => ({
                                reps: set.reps,
                                rest: set.rest || 30,
                                weight: set.weight !== undefined ? set.weight : 0
                            }));
                        }
                        
                        section.exercises.forEach(exercise => {
                            if (exercise && exercise.day === this.selectedDay) {
                                // Check if this is a thumbnail-based exercise (has filename but no valid exercise_id)
                                const isThumbnailExercise = exercise.filename && (!exercise.id || !Number.isInteger(exercise.id));
                                
                                // Build exercise data object
                                const exerciseData = {
                                    exercise_name: exercise.name || 'Unnamed Exercise',
                                    sets: setsConfig.length,
                                    reps: setsConfig[0]?.reps || 10, // Keep for backward compatibility
                                    rest_period: setsConfig[0]?.rest || 30, // Keep for backward compatibility
                                    sets_configuration: setsConfig, // Save full array
                                };
                                
                                // Set exercise_id - null for thumbnail exercises, integer for regular exercises
                                if (isThumbnailExercise) {
                                    exerciseData.exercise_id = null; // Explicitly set to null for thumbnail exercises
                                } else if (exercise.id) {
                                    exerciseData.exercise_id = parseInt(exercise.id);
                                }
                                
                                // Add plan_id only if we're editing (not creating new)
                                if (this.editingPlanKey) {
                                    exerciseData.plan_id = this.editingPlanKey;
                                }
                                
                                // Add thumbnail and video fields for thumbnail-based exercises (video_url ensures correct video plays)
                                if (isThumbnailExercise) {
                                    exerciseData.thumbnail_url = exercise.thumbnail_url || '';
                                    // Normalize thumbnail filename to image extension (.jpg), never video (.mp4)
                                    exerciseData.thumbnail_filename = this.normalizeThumbnailFilename(exercise.filename || '');
                                    exerciseData.video_url = exercise.video_url || null;
                                } else {
                                    exerciseData.thumbnail_url = null;
                                    exerciseData.thumbnail_filename = null;
                                    exerciseData.video_url = null;
                                }
                                
                                workoutActivityPlanData.exercises.push(exerciseData);
                            }
                        });
                    }
                });

                // Final validation - ensure we have exercises to save
                if (workoutActivityPlanData.exercises.length === 0) {
                    this.$bvToast.toast("No valid exercises found to save!", {
                        title: "Validation Error",
                        variant: "danger",
                        solid: true
                    });
                    return;
                }

                // Save to workout_activity_plan table
                let activityPlanResponse;
                
                console.log('Saving plan. editingPlanKey:', this.editingPlanKey);
                console.log('Workout data being sent:', {
                    workout_id: workoutActivityPlanData.workout_id,
                    workout_name: workoutActivityPlanData.workout_name,
                    day: workoutActivityPlanData.day,
                    exercises_count: workoutActivityPlanData.exercises.length,
                    first_exercise_plan_id: workoutActivityPlanData.exercises[0]?.plan_id || 'none'
                });
                console.log('First exercise data:', workoutActivityPlanData.exercises[0]);
                console.log('Full workout data:', JSON.stringify(workoutActivityPlanData, null, 2));

                if (this.editingPlanKey) {
                    // Update existing plan - backend will check for plan_id and update if exists
                    console.log('Updating existing plan with plan_id:', this.editingPlanKey);
                    activityPlanResponse = await axios.post('workout_activity_plan', workoutActivityPlanData);
                } else {
                    // Create new plan
                    console.log('Creating new plan (no editingPlanKey set)');
                    activityPlanResponse = await axios.post('workout_activity_plan', workoutActivityPlanData);
                }

                if (activityPlanResponse.data.success) {
                    this.$bvToast.toast(`Activity plan ${this.editingPlanKey ? 'updated' : 'saved'} successfully for ${this.selectedDay}!`, {
                        title: "Success",
                        variant: "success",
                        solid: true
                    });

                    // Clear the workout sections after successful save
                    this.workoutSections = [];
                    this.selectedDay = null;
                    this.editingPlanKey = null; // Clear editing key

                    // Refresh the saved plans list
                    await this.loadWorkoutActivityPlans();

                    // Emit event to parent component
                    this.$emit('workout-activity-plan-saved', {
                        activity_plan: activityPlanResponse.data.data
                    });
                    
                    // Navigate back to member details if we came from there
                    if (this.cameFromMemberDetails && this.memberId) {
                        // Small delay to show success message
                        setTimeout(() => {
                            this.goBackToMember();
                        }, 500);
                    }
                } else {
                    throw new Error(activityPlanResponse.data.message || 'Failed to save activity plan');
                }

            } catch (error) {
                console.error('Error saving activity plan:', error);
                console.error('Error response:', error.response?.data);
                
                // Handle specific error types
                if (error.response && error.response.status === 403) {
                    this.$bvToast.toast("You don't have permission to save activity plans. Please contact your administrator.", {
                        title: "Authorization Error",
                        variant: "danger",
                        solid: true
                    });
                } else if (error.response && error.response.status === 422) {
                    // Validation error - show detailed errors
                    const errors = error.response.data.errors || {};
                    const errorMessages = Object.keys(errors).map(key => {
                        const messages = Array.isArray(errors[key]) ? errors[key] : [errors[key]];
                        return `${key}: ${messages.join(', ')}`;
                    }).join('\n');
                    
                    console.error('Validation errors:', errors);
                    console.error('Full error response:', error.response.data);
                    
                    this.$bvToast.toast(`Validation failed: ${errorMessages}`, {
                        title: "Validation Error",
                        variant: "danger",
                        solid: true,
                        toaster: 'b-toaster-top-center',
                        autoHideDelay: 10000
                    });
                } else if (error.response && error.response.data && error.response.data.message) {
                    this.$bvToast.toast(error.response.data.message, {
                        title: "Error",
                        variant: "danger",
                        solid: true
                    });
                } else if (error.message) {
                    this.$bvToast.toast(error.message, {
                        title: "Error",
                        variant: "danger",
                        solid: true
                    });
                } else {
                    this.$bvToast.toast("Failed to save activity plan", {
                        title: "Error",
                        variant: "danger",
                        solid: true
                    });
                }
            }
        },



        async loadWorkoutData() {
            if (this.editWorkoutData) {
                let workoutData = this.editWorkoutData;
                
                // If only id is provided, fetch the full workout data
                if (this.editWorkoutData.id && !this.editWorkoutData.exercise_name) {
                    try {
                        const response = await axios.get(`workout/${this.editWorkoutData.id}`);
                        if (response.data.success) {
                            workoutData = response.data.exercise;
                        }
                    } catch (error) {
                        console.error('Error fetching workout data:', error);
                        return;
                    }
                }
                
                // Load workout name and description
                this.workoutName = workoutData.exercise_name || '';
                this.workoutDescription = workoutData.description || '';
                // Load preset weights setting
                this.enablePresetWeights = workoutData.enable_preset_weights || false;
                
                // Load sections if available
                if (workoutData.sections && workoutData.sections.length > 0) {
                    this.workoutSections = workoutData.sections;
                } else {
                    this.workoutSections = [];
                }
                
                // Load training plan if available
                if (workoutData.trainingPlan) {
                    this.trainingPlan = workoutData.trainingPlan;
                }

                // Load existing workout days
                try {
                    const workoutId = workoutData.exercise_id || workoutData.id;
                    const response = await axios.get(`workout_days/${workoutId}`);
                    
                    if (response.data.success && response.data.data.length > 0) {
                        // Convert workout days to training plan format
                        this.trainingPlan.days = response.data.data.map(workoutDay => ({
                            name: workoutDay.day,
                            workout: '',
                            notes: ''
                        }));
                        
                        // If there are days, select the first one by default
                        if (this.trainingPlan.days.length > 0) {
                            this.selectedDay = this.trainingPlan.days[0].name;
                        }
                    }
                } catch (error) {
                    console.error('Error loading workout days:', error);
                    // If no workout days found, that's fine - it's a new workout
                }

                // Load existing workout activity plans for this workout
                try {
                    const workoutId = workoutData.exercise_id || workoutData.id;
                    const currentUserId = this.getCurrentUserId();
                    
                    let plansUrl = 'workout_activity_plan';
                    if (currentUserId) {
                        plansUrl += `?user_id=${currentUserId}`;
                    }
                    
                    const plansResponse = await axios.get(plansUrl);
                    
                    if (plansResponse.data.success) {
                        // Filter plans for this specific workout and user
                        let plans = plansResponse.data.data;
                        if (currentUserId) {
                            plans = plans.filter(plan => plan.user_id == currentUserId);
                        }
                        this.workoutActivityPlans = plans.filter(plan => 
                            plan.workout_id === workoutId
                        );
                    }
                } catch (error) {
                    console.error('Error loading workout activity plans:', error);
                }
            }
        },

        // Cancel editing and return to workout list
        cancelEdit() {
            this.enablePresetWeights = false;
            this.$emit('workout-saved', null);
            
            // Navigate back to member details if we came from there
            if (this.cameFromMemberDetails && this.memberId) {
                this.goBackToMember();
            }
        },
        
        goBackToMember() {
            // Get memberId from query params if not already set (in case component was reloaded)
            const memberId = this.memberId || this.$route.query.memberId;
            
            if (memberId) {
                // Ensure memberId is a string (Vue Router params should be strings)
                const memberIdStr = String(memberId);
                
                this.$router.push({
                    name: 'MemberDetails',
                    params: { id: memberIdStr }
                }).catch(err => {
                    console.error('Navigation failed:', err);
                    // Fallback: try using direct path
                    const targetPath = `/app/Members/MemberDetails/${memberIdStr}`;
                    window.location.href = targetPath;
                });
            } else {
                // If no memberId, go back in history
                this.$router.go(-1);
            }
        },
        // Add a new day to the training plan
        addDay() {
            // Check if all days are already added
            const existingDays = this.trainingPlan.days.map(d => d.name).filter(Boolean);
            const availableDays = this.dayOptions.filter(day => !existingDays.includes(day.value));
            
            if (availableDays.length === 0) {
                this.$bvToast.toast("All days have already been added to the training plan!", {
                    title: "No More Days",
                    variant: "warning",
                    solid: true
                });
                return;
            }

            // Take the first available day (e.g., Monday or the next free)
            const firstAvailable = availableDays[0];
            
            // Prefill the new day with this name
            this.trainingPlan.days.push({
                name: firstAvailable.value,
                workout: "",
                notes: "",
                isNew: true
            });

            // Also select this day in the UI so related data loads for it
            this.selectDay(firstAvailable.value);
        },
        selectDay(dayName) {
            if (dayName) {
                this.selectedDay = dayName;
                this.editingPlanKey = null; // Clear editing key when selecting a new day
                this.editingPlanIds = []; // Clear editing plan IDs
                this.workoutSections = []; // Clear editable sections
                this.loadWorkoutActivityPlans();
            }
        },
        
        clearSelectedDay() {
            this.selectedDay = null;
        },
        
        onDayNameChange(dayIndex, newName) {
            const oldName = this.trainingPlan.days[dayIndex].name;
            if (this.selectedDay === oldName) {
                this.selectedDay = newName;
                
                // Update exercises that were associated with the old day name
                this.workoutSections.forEach(section => {
                    if (section.exercises) {
                        section.exercises.forEach(exercise => {
                            if (exercise.day === oldName) {
                                exercise.day = newName;
                            }
                        });
                    }
                });
            }
        },
        
        // Get the number of exercises for a specific day
        getDayExerciseCount(dayName) {
            if (!this.workoutSections || this.workoutSections.length === 0) {
                return 0;
            }
            return this.workoutSections.reduce((total, section) => {
                return total + (section.exercises ? section.exercises.filter(ex => ex.day === dayName).length : 0);
            }, 0);
        },
        
        // Remove a day from the training plan
        removeDay(dayIndex) {
            const dayToRemove = this.trainingPlan.days[dayIndex].name;
            
            // If this day was selected, clear selection
            if (this.selectedDay === dayToRemove) {
                this.selectedDay = null;
            }
            
            // Remove exercises for this day
            this.workoutSections.forEach(section => {
                if (section.exercises) {
                    section.exercises = section.exercises.filter(ex => ex.day !== dayToRemove);
                }
            });
            
            // Remove empty sections
            this.workoutSections = this.workoutSections.filter(section => 
                section.exercises && section.exercises.length > 0
            );
            
            this.trainingPlan.days.splice(dayIndex, 1);
            
            // Optional toast for day removal
            // this.$bvToast.toast(`Removed ${dayToRemove} and its exercises`, {
            //     title: "Day Removed",
            //     variant: "warning",
            //     solid: true
            // });
        },
        // Duplicate the current training plan
        duplicatePlan() {
            const duplicatedPlan = JSON.parse(JSON.stringify(this.trainingPlan));
            duplicatedPlan.name = `${this.trainingPlan.name} (Copy)`;
            // Optional toast for plan duplication
            // this.$bvToast.toast("Training plan duplicated!", {
            //     title: "Success",
            //     variant: "success",
            //     solid: true
            // });
        },
        // Handle image loading errors by setting a default image
        handleImageError(event) {
            const img = event.target;
            // If the replacement also fails, fall back to a tiny inline image and stop retrying
            if (img.dataset.fallbackTried === '1') {
                img.onerror = null; // stop the loop permanently
                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='; // 1x1 transparent gif
                return;
            }
            // Try project placeholder once
            img.dataset.fallbackTried = '1';
            img.src = '/images/no-image.png';
        },
        
        // Format category name for display (e.g., "upper-body" -> "Upper Body")
        formatCategory(category) {
            if (!category) return 'Other';
            return category.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
        },
        
        // Format muscle group name for display (e.g., "full-body" -> "Full Body")
        formatMuscle(muscle) {
            if (!muscle) return 'Full Body';
            return muscle.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
        },
        
        // Check if exercise has metadata
        hasMetadata(exercise) {
            return !!(exercise.category || exercise.equipment || exercise.level || exercise.targeted_muscle);
        },

        // Methods for workout activity plans
        async loadWorkoutActivityPlans() {

            if (!this.editWorkoutData) {
                return;
            }
            
            this.loadingPlans = true;
            try {
                // Get current user ID (for potential future use, but not filtering client-side)
                const currentUserId = this.getCurrentUserId();
                
                // Build API URL - backend handles gym_id filtering automatically
                let apiUrl = 'workout_activity_plan/' + this.editWorkoutData.id;
                if (currentUserId) {
                    // Pass user_id as query param if needed for backend filtering
                    apiUrl += `?user_id=${currentUserId}`;
                }
                
                const response = await axios.get(apiUrl);
                if (response.data.success) {
                    // Use all plans returned by API (backend already filters by gym_id)
                    // Note: API response doesn't include user_id field, so don't filter client-side
                    let plans = response.data.data || [];
                    
                    // Ensure plans is an array
                    if (!Array.isArray(plans)) {
                        plans = [];
                    }
                    
                    this.workoutActivityPlans = plans;
                    
                    // Optional success toasts for loading plans
                    // if (this.selectedDay) {
                    //     const dayPlans = this.workoutActivityPlans.filter(plan => plan.day === this.selectedDay);
                    //     this.$bvToast.toast(`Loaded ${dayPlans.length} workout plans for ${this.selectedDay}`, {
                    //         title: "Success",
                    //         variant: "success",
                    //         solid: true
                    //     });
                    // } else {
                    //     this.$bvToast.toast(`Loaded ${this.workoutActivityPlans.length} total workout plans`, {
                    //         title: "Success",
                    //         variant: "success",
                    //         solid: true
                    //     });
                    // }
                } else {
                    throw new Error(response.data.message || 'Failed to load workout plans');
                }
            } catch (error) {
                console.error('Error loading workout activity plans:', error);
                
                // Handle specific error types
                if (error.response && error.response.status === 403) {
                    this.$bvToast.toast("You don't have permission to view workout plans. Please contact your administrator.", {
                        title: "Authorization Error",
                        variant: "danger",
                        solid: true
                    });
                } else if (error.response && error.response.data && error.response.data.message) {
                    this.$bvToast.toast(error.response.data.message, {
                        title: "Error",
                        variant: "danger",
                        solid: true
                    });
                } else {
                    this.$bvToast.toast("Failed to load workout plans", {
                        title: "Error",
                        variant: "danger",
                        solid: true
                    });
                }
            } finally {
                this.loadingPlans = false;
            }
        },

        

        // Generate a stable composite key for a plan (doesn't change with auto-increment ID)
        generatePlanKey(plan) {
            // First, try to use plan_id if it exists (preferred method)
            if (plan.plan_id) {
                return plan.plan_id;
            }
            
            // Fallback: Generate a stable key for plans without plan_id (backward compatibility)
            const workoutId = plan.workout_id || (this.editWorkoutData ? this.editWorkoutData.id : null);
            const day = plan.day;
            const exerciseId = plan.exercise_id;
            const thumbnailFilename = plan.thumbnail_filename;
            
            // Create stable key: workout_id:day:exercise_id or workout_id:day:thumbnail_filename
            if (exerciseId) {
                return `plan_${workoutId}_${day}_exercise_${exerciseId}`;
            } else if (thumbnailFilename) {
                return `plan_${workoutId}_${day}_thumbnail_${thumbnailFilename}`;
            } else {
                // Fallback: use exercise_name if available
                const exerciseName = plan.exercise_name || 'unknown';
                return `plan_${workoutId}_${day}_name_${exerciseName}`;
            }
        },
        
        async loadPlanToEditor(plan) {
            try {
                // Debug: Log the plan data to verify sets_configuration is received
                console.log('Loading plan to editor:', plan);
                console.log('sets_configuration from API:', plan.sets_configuration);
                console.log('sets_configuration type:', typeof plan.sets_configuration);
                console.log('sets_configuration is array:', Array.isArray(plan.sets_configuration));
                if (plan.sets_configuration && Array.isArray(plan.sets_configuration)) {
                    console.log('sets_configuration length:', plan.sets_configuration.length);
                    console.log('sets_configuration content:', JSON.stringify(plan.sets_configuration));
                }
                
                // Set the editing plan key using stable composite identifier
                this.editingPlanKey = this.generatePlanKey(plan);
                console.log('Setting editingPlanKey to:', this.editingPlanKey, 'from plan:', plan);
                
                // Set editWorkoutData if workout_id is available in the plan
                console.log('Plan workout_id:', plan.workout_id, 'Current editWorkoutData:', this.editWorkoutData);
                if (plan.workout_id && !this.editWorkoutData) {
                    this.editWorkoutData = { id: plan.workout_id };
                    console.log('Set editWorkoutData to:', this.editWorkoutData);
                    // Load workout data to get enable_preset_weights
                    try {
                        const workoutResponse = await axios.get(`workout/${plan.workout_id}`);
                        if (workoutResponse.data.success && workoutResponse.data.exercise) {
                            this.enablePresetWeights = workoutResponse.data.exercise.enable_preset_weights || false;
                        }
                    } catch (error) {
                        console.error('Error loading workout data for preset weights:', error);
                    }
                }
                
                // Set the selected day
                this.selectedDay = plan.day;
                
                // Set workout name and description
                this.workoutName = plan.exercise_name || 'Unnamed Workout';
                this.workoutDescription = plan.description || '';
                
                // Clear existing sections
                this.workoutSections = [];
                
                // Create a new section with the exercise
                if (plan.exercise_data) {
                    // Check if this is a thumbnail-based exercise
                    const isThumbnailExercise = !plan.exercise_id && plan.thumbnail_url;
                    
                    // Determine setsConfiguration with proper fallbacks
                    let setsConfig;
                    if (plan.sets_configuration && Array.isArray(plan.sets_configuration) && plan.sets_configuration.length > 0) {
                        // Use saved sets_configuration, but filter out sets with reps=0
                        setsConfig = plan.sets_configuration.filter(set => set.reps > 0).map(set => {
                            // Ensure weight is included if enablePresetWeights is true
                            const setObj = { reps: set.reps, rest: set.rest || 30 };
                            if (this.enablePresetWeights) {
                                setObj.weight = set.weight || 0;
                            }
                            return setObj;
                        });
                        console.log('Filtered setsConfig (after removing reps=0):', setsConfig);
                        console.log('Filtered setsConfig length:', setsConfig.length);
                    } else if (plan.sets && plan.reps && plan.rest_seconds) {
                        // Fallback: create array from single values (create new objects for each element)
                        setsConfig = [];
                        for (let i = 0; i < plan.sets; i++) {
                            setsConfig.push(this.createDefaultSet(plan.reps, plan.rest_seconds));
                        }
                    } else {
                        // Final fallback: default 3 sets
                        setsConfig = [
                            this.createDefaultSet(10, 30),
                            this.createDefaultSet(10, 30),
                            this.createDefaultSet(10, 30)
                        ];
                    }
                    
                    // Ensure at least 3 sets
                    while (setsConfig.length < 3) {
                        setsConfig.push(this.createDefaultSet(10, 30));
                    }
                    
                    console.log('Final setsConfig before assigning to section:', setsConfig);
                    console.log('Final setsConfig length:', setsConfig.length);
                    
                    let exercise;
                    if (isThumbnailExercise) {
                        // Thumbnail-based or video_catalog exercise (video_link from backend → correct play)
                        exercise = {
                            id: plan.exercise_id || null,
                            name: plan.exercise_name || plan.exercise_data?.exercise_name,
                            thumbnail_url: plan.thumbnail_url || plan.exercise_data?.thumbnail,
                            filename: plan.thumbnail_filename || plan.exercise_data?.thumbnail_filename,
                            video_url: plan.video_link || plan.video_url || null,
                            exerciseType: 'repetition',
                            intensityType: 'max',
                            intensityValue: 0,
                            notes: plan.notes || '',
                            // Workout-specific settings (backward compatibility)
                            sets: plan.sets || setsConfig.length,
                            reps: plan.reps || setsConfig[0]?.reps || 10,
                            rest: plan.rest_seconds || setsConfig[0]?.rest || 30,
                            // Day association
                            day: plan.day
                        };
                    } else {
                        // Regular exercise from workout_activities table
                        exercise = {
                            id: plan.exercise_id,
                            name: plan.exercise_data.exercise_name,
                            category: plan.exercise_data.category,
                            muscle: plan.exercise_data.muscles_targeted || 'Full Body',
                            difficulty: plan.exercise_data.level,
                            image: plan.exercise_data.thumbnail || '/images/99078543gym logo.png',
                            description: plan.exercise_data.description,
                            instructions: plan.exercise_data.instructions,
                            equipment: plan.exercise_data.equipment,
                            duration: plan.exercise_data.duration,
                            calories: plan.exercise_data.calories_burned,
                            videoLink: plan.exercise_data.video_link,
                            tags: plan.exercise_data.tags,
                            restPeriod: plan.exercise_data.rest_period,
                            exerciseType: 'repetition',
                            intensityType: 'max',
                            intensityValue: 0,
                            notes: plan.notes || '',
                            // Workout-specific settings (backward compatibility)
                            sets: plan.sets || setsConfig.length,
                            reps: plan.reps || setsConfig[0]?.reps || 10,
                            rest: plan.rest_seconds || setsConfig[0]?.rest || 30,
                            // Day association
                            day: plan.day
                        };
                    }
                    
                    // Add to a new section with setsConfiguration
                    console.log('Creating section with setsConfiguration:', setsConfig);
                    console.log('Section setsConfiguration length:', setsConfig.length);
                    this.workoutSections.push({
                        name: 'Main Section',
                        exercises: [exercise],
                        exerciseType: 'repetition',
                        setsConfiguration: setsConfig,
                        intensityType: 'max',
                        intensityValue: 0,
                        notes: plan.notes || ''
                    });
                }
                
                // Optional toast for plan loading
                // this.$bvToast.toast(`Loaded workout plan for ${plan.day}`, {
                //     title: "Plan Loaded",
                //     variant: "success",
                //     solid: true
                // });
            } catch (error) {
                console.error('Error loading plan to editor:', error);
                this.$bvToast.toast("Failed to load plan to editor", {
                    title: "Error",
                    variant: "danger",
                    solid: true
                });
            }
        },

        async deleteWorkoutPlan(planId) {
            try {
                const response = await axios.delete(`workout_activity_plan/${planId}`);
                if (response.data.success) {
                    // Remove from local array
                    this.workoutActivityPlans = this.workoutActivityPlans.filter(plan => plan.id !== planId);
                    
                    // Optional toast for successful deletion
                    // this.$bvToast.toast("Workout plan deleted successfully", {
                    //     title: "Success",
                    //     variant: "success",
                    //     solid: true
                    // });
                } else {
                    throw new Error(response.data.message || 'Failed to delete workout plan');
                }
            } catch (error) {
                console.error('Error deleting workout plan:', error);
                
                // Handle specific error types
                if (error.response && error.response.status === 403) {
                    this.$bvToast.toast("You don't have permission to delete workout plans. Please contact your administrator.", {
                        title: "Authorization Error",
                        variant: "danger",
                        solid: true
                    });
                } else if (error.response && error.response.data && error.response.data.message) {
                    this.$bvToast.toast(error.response.data.message, {
                        title: "Error",
                        variant: "danger",
                        solid: true
                    });
                } else {
                    this.$bvToast.toast("Failed to delete workout plan", {
                        title: "Error",
                        variant: "danger",
                        solid: true
                    });
                }
            }
        },

        formatDate(dateString) {
            if (!dateString) return 'Unknown date';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        },
        getExistingPlansForDay(dayName) {
            return this.workoutActivityPlans.filter(plan => plan.day === dayName);
        },
        loadExistingPlanToEditor(plan) {
            // Add plan ID to editing list
            if (!this.editingPlanIds.includes(plan.id)) {
                this.editingPlanIds.push(plan.id);
            }
            // Load the plan into editable sections
            this.loadPlanToEditor(plan);
        },

        // Add a set to section
        addSetToSection(section) {
            if (!section.setsConfiguration) {
                this.$set(section, 'setsConfiguration', []);
            }
            section.setsConfiguration.push(this.createDefaultSet(0, 30));
        },
        
        // Delete a set from section
        deleteSetFromSection(section) {
            if (!section.setsConfiguration || section.setsConfiguration.length === 0) {
                return;
            }
            // Don't allow deleting if already at minimum of 3 sets
            if (section.setsConfiguration.length <= 3) {
                return;
            }
            // Remove the last set
            section.setsConfiguration.pop();
        },
        
        // Delete a set by index (for per-row delete buttons)
        deleteSetByIndex(section, setIndex) {
            if (!section.setsConfiguration || !section.setsConfiguration[setIndex]) {
                return;
            }
            
            // If we have more than 3 sets, delete directly
            if (section.setsConfiguration.length > 3) {
                section.setsConfiguration.splice(setIndex, 1);
            } else {
                // If at 3 sets or below, set reps to 0 (will be filtered out on load)
                section.setsConfiguration[setIndex].reps = 0;
            }
        },
        
        // Add a set to exercise (backward compatibility)
        addSet(exercise) {
            if (!exercise.setsConfiguration) {
                this.$set(exercise, 'setsConfiguration', []);
            }
            exercise.setsConfiguration.push({ reps: 0, rest: 30 });
            // Update sets count for backward compatibility
            exercise.sets = exercise.setsConfiguration.length;
        },
        
        // Delete a set from exercise (backward compatibility)
        deleteSet(exercise) {
            if (!exercise.setsConfiguration || exercise.setsConfiguration.length === 0) {
                return;
            }
            // Remove the last set
            exercise.setsConfiguration.pop();
            // Update sets count for backward compatibility
            exercise.sets = exercise.setsConfiguration.length;
        },
        
        // Validate exercise input values
        validateExerciseInput(exercise, field) {
            if (!exercise || !field) return;

            const value = exercise[field];
            
            // Ensure value is a number
            if (isNaN(value) || value === null || value === undefined) {
                exercise[field] = field === 'rest' ? 0 : 1;
                return;
            }

            // Apply min/max constraints
            switch (field) {
                case 'sets':
                    exercise.sets = Math.max(1, Math.min(50, Math.floor(value)));
                    break;
                case 'reps':
                    exercise.reps = Math.max(1, Math.min(100, Math.floor(value)));
                    break;
                case 'rest':
                    exercise.rest = Math.max(0, Math.min(600, Math.floor(value)));
                    break;
            }
        },

        // Get current user ID from various sources
        getCurrentUserId() {
            // First check if userId prop is provided
            if (this.userId) {
                return this.userId;
            }
            
            // Try to get from Vuex store
            if (this.$store && this.$store.state.auth && this.$store.state.auth.user) {
                return this.$store.state.auth.user.id;
            }
            
            // Try to get from localStorage
            const userData = localStorage.getItem('user');
            if (userData) {
                try {
                    const user = JSON.parse(userData);
                    return user.id;
                } catch (e) {
                    console.error('Error parsing user data from localStorage:', e);
                }
            }
            
            // Try to get from sessionStorage
            const sessionUserData = sessionStorage.getItem('user');
            if (sessionUserData) {
                try {
                    const user = JSON.parse(sessionUserData);
                    return user.id;
                } catch (e) {
                    console.error('Error parsing user data from sessionStorage:', e);
                }
            }
            
            return null;
        },
        async loadAllWorkouts() {
            try {
                const response = await axios.get('workout');
                if (response.data && response.data.exercises) {
                    this.allWorkouts = response.data.exercises;
                    this.workoutSelectOptions = [
                        { value: null, text: 'Choose a workout...' },
                        ...this.allWorkouts.map(w => ({
                            value: w.id || w.exercise_id,
                            text: w.exercise_name || w.name || 'Unnamed Workout'
                        }))
                    ];
                }
            } catch (error) {
                this.$bvToast.toast('Failed to load workouts for selection.', {
                    title: 'Error',
                    variant: 'danger',
                    solid: true
                });
            }
        },
        async onSelectWorkout() {
            if (!this.selectedWorkoutId) return;
            // Find the selected workout object
            const selected = this.allWorkouts.find(w => (w.id || w.exercise_id) == this.selectedWorkoutId);
            if (selected) {
                // Emit to parent or set editWorkoutData directly if local
                this.$emit('edit-workout', selected);
                // If you want to set it locally:
                // this.editWorkoutData = selected;
            }
        },
        getDaySelectOptions(index) {
            const currentName = this.trainingPlan.days[index].name;
            // Start with placeholder
            let options = [{ value: '', text: 'No day selected' }];
            // Get all selected days except the current one
            const selectedByOthers = this.trainingPlan.days
                .map((d, i) => (i !== index ? d.name : null))
                .filter(Boolean);
            // Add all available days except those selected by others
            const available = this.dayOptions.filter(day => !selectedByOthers.includes(day.value));
            options = options.concat(available);
            // If current value is not in options, add it (for edit case)
            if (currentName && !options.some(opt => opt.value === currentName)) {
                options.push({ value: currentName, text: currentName });
            }
            return options;
        },
    },
    // Component lifecycle
    mounted() {
        try {
            // Check if we came from MemberDetails
            if (this.$route.query.from === 'memberDetails') {
                this.cameFromMemberDetails = true;
                this.showBreadcrumb = true;
                this.memberId = this.$route.query.memberId || null;
                this.memberName = this.$route.query.memberName || 'Member';
            }
            
            // Check for workoutId in query params
            if (this.$route.query.workoutId && !this.editWorkoutData) {
                const workoutId = this.$route.query.workoutId;
                this.editWorkoutData = { id: parseInt(workoutId) };
            }
            
            // Load exercises from API
            this.loadActivities();
            // Load workout data if editing
            this.loadWorkoutData();
            // Load saved workout activity plans
            this.loadWorkoutActivityPlans();
            this.loadAllWorkouts();
        } catch (error) {
            console.error('Error in component mounted:', error);
            this.$bvToast.toast("Failed to initialize workout editor. Please refresh the page.", {
                title: "Initialization Error",
                variant: "danger",
                solid: true
            });
        }
    },
    
    // Watch for changes in props and data
    watch: {
        editWorkoutData: {
            handler(newData) {
                if (newData) {
                    this.loadWorkoutData();
                    // Load workout activity plans when workout data changes
                    this.loadWorkoutActivityPlans();
                } else {
                    // Reset preset weights when no workout is selected
                    this.enablePresetWeights = false;
                    // Clear workout activity plans when no workout is selected
                    this.workoutActivityPlans = [];
                }
            },
            immediate: true
        },
        showThumbnailGrid(newVal) {
            if (newVal) {
                // Reset scroll position and button visibility when grid opens
                this.$nextTick(() => {
                    if (this.$refs.thumbnailGrid) {
                        this.$refs.thumbnailGrid.scrollTop = 0;
                        this.showScrollToTop = false;
                    }
                });
            } else {
                // Hide button when grid closes
                this.showScrollToTop = false;
            }
        },
        // Refetch thumbnails when filters change (server-side filtering by video_catalog columns)
        filterBodyPart() {
            if (this.showThumbnailGrid) this.loadAllThumbnails();
        },
        filterMuscleGroup() {
            if (this.showThumbnailGrid) this.loadAllThumbnails();
        },
        filterExerciseType() {
            if (this.showThumbnailGrid) this.loadAllThumbnails();
        },
        filterLevel() {
            if (this.showThumbnailGrid) this.loadAllThumbnails();
        },
        filterEquipment() {
            if (this.showThumbnailGrid) this.loadAllThumbnails();
        },
        thumbnailSearch: {
            handler() {
                if (!this.showThumbnailGrid) return;
                if (this._searchDebounce) clearTimeout(this._searchDebounce);
                this._searchDebounce = setTimeout(() => this.loadAllThumbnails(), 400);
            }
        }
    }

};
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/sass/_variables.scss";

// Override danger buttons to have light background and reduced size
::v-deep .btn-danger {
    background-color: #f1e8e9 !important;
    border-color: #f1e8e9 !important;
    color: #dc3545 !important;
    padding: $padding-xxs $padding-xs;
    font-size: $font-size-xs;
    border-radius: $border-radius-sm;

    i {
        font-size: $font-size-xs;
    }

    &:hover:not(:disabled) {
        background-color: #f1e8e9 !important;
        border-color: #f1e8e9 !important;
        color: #dc3545 !important;
    }

    &:focus {
        background-color: #f1e8e9 !important;
        border-color: #f1e8e9 !important;
        color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(248, 215, 218, 0.5) !important;
    }

    &:active {
        background-color: #f1e8e9 !important;
        border-color: #f1e8e9 !important;
        color: #dc3545 !important;
    }
}

// Reduce size of edit-plan-btn
.edit-plan-btn {
    padding: $padding-xxs $padding-xs;
    font-size: $font-size-xs;
    border-radius: $border-radius-sm;

    i {
        font-size: $font-size-xs;
        margin-right: $margin-xxs;
    }
}

// Add Exercise Button Styles
.add-exercise-btn {
    border: none !important;
    background: transparent !important;
    padding: 0;
    text-decoration: none !important;
    
    &:hover, &:focus, &:active {
        border: none !important;
        background: transparent !important;
        box-shadow: none !important;
        outline: none !important;
        text-decoration: none !important;
    }
    
    i {
        color: #ff4040;
    }
}

/* Main container styles */
.workout-editor-page {
    padding: 1rem;
    color: $color-text-dark;
    min-height: 100vh;
    background: #f8f9fa;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    @media (max-width: $breakpoint-md) {
        flex-direction: column;
        gap: 1rem;
    }

    .header-content {
        flex: 1;

        .page-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: #252525;
            margin: 0 0 0.5rem 0;
        }

        .page-subtitle {
            font-size: 1rem;
            color: #6c757d;
            margin: 0;
        }
    }

    .header-actions {
        display: flex;
        gap: 0.3rem;
        align-items: center;

        .btn-modern {
            background: linear-gradient(135deg, $color-button, $color-button-hover);
            border: none;
            border-radius: 6px;
            padding: 0.4rem 0.7rem;
            font-weight: 600;
            font-size: 0.875rem;
            color: $color-white;
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba($color-button, 0.3);
            }
        }

        .btn-outline-modern {
            border: 2px solid #e9ecef;
            border-radius: 6px;
            padding: 0.4rem 0.7rem;
            font-weight: 600;
            font-size: 0.875rem;
            color: #6c757d;
            background: $color-white;
            transition: all 0.3s ease;

            &:hover {
                border-color: $color-button;
                color: $color-button;
            }
        }

        .save-workout-btn {
            background: linear-gradient(135deg, #28a745, #20c997);
            border: none;
            border-radius: 6px;
            padding: 0.4rem 0.7rem;
            font-weight: 600;
            font-size: 0.875rem;
            color: $color-white;
            transition: all 0.3s ease;

            &:hover:not(:disabled) {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
            }

            &:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
        }

        .action-icons {
            display: flex;
            gap: 0.5rem;
            margin-left: 1rem;
            padding-left: 1rem;
            border-left: 2px solid #e9ecef;

            .icon-btn {
                width: 40px;
                height: 40px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
                transition: all 0.3s ease;
                border: 2px solid;

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
                }

                &.btn-outline-info {
                    border-color: #17a2b8;
                    color: #17a2b8;

                    &:hover {
                        background: #17a2b8;
                        color: white;
                    }
                }

                &.btn-outline-success {
                    border-color: #28a745;
                    color: #28a745;

                    &:hover {
                        background: #28a745;
                        color: white;
                    }
                }

                &.btn-outline-warning {
                    border-color: #ffc107;
                    color: #ffc107;

                    &:hover {
                        background: #ffc107;
                        color: white;
                    }
                }

                i {
                    font-size: 1rem;
                }
            }
        }
    }
}

.editor-layout {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    height: calc(96vh - 160px);

    @media (max-width: $breakpoint-xl) {
        grid-template-columns: 1fr 1fr;
        height: auto;
    }

    @media (max-width: $breakpoint-lg) {
        grid-template-columns: 1fr;
        height: auto;
    }
}

.editor-column {
    background: $color-white;
    border-radius: 5px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .column-header {
        padding: 8px;
        border-bottom: 1px solid #e0e0e0;
        background: linear-gradient(45deg, #dededc 25%, #e3e3e1 25%, #e3e3e1 50%, #dededc 50%, #dededc 75%, #e3e3e1 75%);
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        // background-size: 10px 10px;
        h3 {
            font-size: 1rem;
            font-weight: 600;
            color: #252525;
            margin: 0;
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            i {
                color: $color-button;
                font-size: 0.9rem;
                margin-right: 0.4rem;
            }

            .header-subtitle {
                font-size: 0.75rem;
                font-weight: 400;
                color: #6c757d;
                margin-left: 0.3rem;
                white-space: nowrap;
            }
        }

        .add-day-btn {
            flex-shrink: 0;
            padding: 0.25rem 0.5rem;
            font-size: 0.75rem;
        }

        p {
            font-size: 0.875rem;
            color: #6c757d;
            margin: 0;
        }
    }
}

// Exercise Library Column
.exercise-library {
    .search-section {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #e9ecef;

        .search-input {
            border-radius: 8px;
            border: 2px solid #e9ecef;

            &:focus {
                border-color: $color-button;
                box-shadow: 0 0 0 0.2rem rgba($color-button, 0.15);
            }
        }
    }

    .filter-section {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #e9ecef;

        .filter-select {
            border-radius: 8px;
            border: 2px solid #e9ecef;

            &:focus {
                border-color: $color-button;
                box-shadow: 0 0 0 0.2rem rgba($color-button, 0.15);
            }
        }
    }

    .exercise-list {
        flex: 1;
        overflow-y: auto;
        padding: 1rem 1.5rem;

        .loading-exercises,
        .empty-exercises {
            padding: 2rem;
            text-align: center;

            .loading-state,
            .empty-state {
                .loading-icon,
                .empty-icon {
                    font-size: 3rem;
                    color: #dee2e6;
                    margin-bottom: 1rem;
                }

                .loading-icon {
                    color: $color-button;
                }

                h5 {
                    color: #6c757d;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }

                p {
                    color: #6c757d;
                    font-size: 0.9rem;
                    margin: 0;
                }
            }
        }

        .exercise-item {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 1rem;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            margin-bottom: 0.75rem;
            cursor: pointer;
            transition: all 0.3s ease;
            min-height: 120px;

            &:hover {
                border-color: $color-button;
                box-shadow: 0 4px 15px rgba($color-button, 0.1);
                transform: translateY(-2px);
            }

            .exercise-thumbnail {
                margin-right: 1rem;
                flex-shrink: 0;

                .exercise-image {
                    width: 60px;
                    height: 60px;
                    object-fit: cover;
                    border-radius: 8px;
                    border: 2px solid #e9ecef;
                    transition: all 0.3s ease;

                    &:hover {
                        border-color: $color-button;
                        transform: scale(1.05);
                    }
                }
            }

            .exercise-info {
                flex: 1;

                h5 {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #252525;
                    margin: 0 0 0.5rem 0;
                }

                .exercise-meta {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    margin-bottom: 0.5rem;

                    span {
                        font-size: 0.75rem;
                        padding: 0.25rem 0.5rem;
                        border-radius: 12px;
                        font-weight: 500;

                        &.category {
                            background: #e3f2fd;
                            color: #1976d2;
                        }

                        &.muscle {
                            background: #f3e5f5;
                            color: #7b1fa2;
                        }

                        &.difficulty {
                            &.beginner {
                                background: #e8f5e8;
                                color: #2e7d32;
                            }

                            &.intermediate {
                                background: #fff3e0;
                                color: #ef6c00;
                            }

                            &.advanced {
                                background: #ffebee;
                                color: #c62828;
                            }
                        }
                    }
                }

                .exercise-details {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 0.5rem;
                    flex-wrap: wrap;

                    .detail-item {
                        display: flex;
                        align-items: center;
                        gap: 0.25rem;
                        font-size: 0.75rem;
                        color: #6c757d;

                        i {
                            font-size: 0.7rem;
                            color: $color-button;
                        }

                        span {
                            font-weight: 500;
                        }
                    }
                }

                .exercise-description {
                    p {
                        font-size: 0.8rem;
                        color: #6c757d;
                        margin: 0;
                        line-height: 1.4;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                }
            }

            .exercise-actions {
                .btn-outline-primary {
                    border-radius: 6px;
                    padding: 0.5rem;
                }
            }
        }
    }
}

// Workout Builder Column
.workout-builder {
    .workout-info {
        padding: 1.5rem;
        border-bottom: 1px solid #e9ecef;

        .workout-name-input,
        .workout-description-input {
            border-radius: 8px;
            border: 2px solid #e9ecef;

            &:focus {
                border-color: $color-button;
                box-shadow: 0 0 0 0.2rem rgba($color-button, 0.15);
            }
        }
    }

    .workout-actions {
        padding: 1.5rem;
        border-bottom: 1px solid #e9ecef;
        text-align: center;

        .save-workout-btn {
            background: linear-gradient(135deg, #28a745, #20c997);
            border: none;
            border-radius: 8px;
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            color: $color-white;
            transition: all 0.3s ease;
            margin-bottom: 0.5rem;

            &:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
            }

            &:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
        }

        .save-info {
            margin-top: 0.5rem;
        }
    }

    .empty-sections {
        padding: 2rem;
        text-align: center;

        .empty-state {
            .empty-icon {
                font-size: 3rem;
                color: #dee2e6;
                margin-bottom: 1rem;
            }

            h5 {
                color: #6c757d;
                margin-bottom: 0.5rem;
                font-weight: 600;
            }

            p {
                color: #6c757d;
                font-size: 0.9rem;
                margin: 0;
            }
        }
    }

    .workout-sections {
        flex: 1;
        overflow-y: auto;
        padding: 5px;

        .section-header {
            h4 {
                font-size: 1.1rem;
                font-weight: 600;
                color: #252525;
                margin: 0;
            }
        }

        .existing-plans-section {
            margin-bottom: 5px;
            padding: 5px;
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 5px;

            .existing-plans-header {
                margin-bottom: 5px;

                h5 {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #252525;
                    margin: 0 0 0.25rem 0;
                    display: flex;
                    align-items: center;

                    i {
                        color: $color-button;
                    }
                }

                small {
                    font-size: 0.8rem;
                }
            }

            .existing-plans-list {
                .existing-plan-item {
                    background: $color-white;
                    border: 1px solid #e9ecef;
                    border-radius: 6px;
                    margin-bottom: 5px;
                    overflow: hidden;
                    transition: all 0.3s ease;

                    &:hover {
                        border-color: $color-button;
                        box-shadow: 0 2px 8px rgba($color-button, 0.1);
                    }

                    &:last-child {
                        margin-bottom: 0;
                    }

                    .plan-info {
                        .plan-header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 5px;
                            background: #f8f9fa;
                            border-bottom: 1px solid #e9ecef;

                            h6 {
                                font-size: 0.9rem;
                                font-weight: 600;
                                color: #252525;
                                margin: 0;
                            }

                            .plan-actions {
                                display: flex;
                                gap: 0.5rem;

                                .btn-outline-info,
                                .btn-outline-danger {
                                    border-radius: 4px;
                                    padding: 0.25rem 0.5rem;
                                    font-size: 0.75rem;
                                    transition: all 0.3s ease;

                                    &:hover {
                                        transform: scale(1.1);
                                    }
                                }
                            }
                        }

                        .plan-details {
                            padding: 5px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            .exercise-stats {
                                display: flex;
                                gap: 5px;
                                flex-wrap: wrap;

                                .stat {
                                    display: flex;
                                    align-items: center;
                                    gap: 0.25rem;
                                    font-size: 0.75rem;
                                    color: #6c757d;
                                    font-weight: 500;

                                    i {
                                        color: $color-button;
                                        font-size: 0.7rem;
                                    }
                                }
                            }

                            .exercise-category {
                                display: flex;
                                gap: 0.5rem;

                                .category-badge {
                                    background: #e3f2fd;
                                    color: #1976d2;
                                    padding: 0.25rem 0.5rem;
                                    border-radius: 5px;
                                    font-size: 0.7rem;
                                    font-weight: 600;
                                }

                                .level-badge {
                                    background: #fff3e0;
                                    color: #ef6c00;
                                    padding: 0.25rem 0.5rem;
                                    border-radius: 12px;
                                    font-size: 0.7rem;
                                    font-weight: 600;
                                }
                            }
                        }
                    }
                }
            }
        }

        .workout-section {
            border: 1px solid #e9ecef;
            border-radius: 8px;
            margin-bottom: 1rem;
            overflow: hidden;

            &.view-only {
                .section-name-input:disabled,
                .set-input:disabled,
                .intensity-input:disabled,
                .notes-textarea:disabled {
                    background-color: #f8f9fa;
                    cursor: not-allowed;
                    opacity: 0.7;
                }
                
                ::v-deep .exercise-type-radio:disabled,
                ::v-deep .intensity-radio:disabled {
                    opacity: 0.7;
                    pointer-events: none;
                }
            }

            .section-header {
                padding: 0.5rem;
                background: #dededc;
                border-bottom: 1px solid #e9ecef;
                margin: 0;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .section-name-input {
                    border: none;
                    background: transparent;
                    font-weight: 600;
                    color: #252525;
                    flex: 1;
                    margin-right: 0.5rem;

                    &:focus {
                        box-shadow: none;
                        background: $color-white;
                    }
                }

                .section-actions {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }
            }

            .exercises-in-section {
                padding: 1rem;

                // Exercise Thumbnails List
                .exercises-thumbnails-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-bottom: 1.5rem;

                    .exercise-thumbnail-item {
                        background: white;
                        border: 1px solid #e9ecef;
                        border-radius: 8px;
                        padding: 1rem;
                        display: flex;
                        flex-direction: column;
                        gap: 0.75rem;

                        .exercise-preview {
                            width: 100%;
                            height: 200px;
                            margin-bottom: 0;
                        }

                        .exercise-title-bar {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            .exercise-title {
                                font-size: 1rem;
                                font-weight: 600;
                                color: #252525;
                                margin: 0;
                                flex: 1;
                            }

                            .exercise-delete-btn {
                                padding: 0.25rem 0.5rem;
                            }
                        }
                    }
                }
            }
        }
    }
}



// Training Plan Column
.training-plan {
    .training-plan-content {
        overflow-y: auto;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        padding-top: 0.75rem;

        .plan-overview {
            .plan-header {
                text-align: center;
                margin-bottom: 1rem;

                h4 {
                    font-size: 1rem;
                    font-weight: 600;
                    margin: 0 0 0.25rem 0;
                    color: #252525;
                }

                p {
                    margin: 0;
                    color: #6c757d;
                    font-size: 0.875rem;
                }
            }

            .plan-stats {
                display: flex;
                justify-content: space-around;
                margin-bottom: 1rem;

                .stat-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;

                    i {
                        font-size: 1.25rem;
                        color: $color-button;
                    }
                }
            }

            .weekly-schedule {
                .schedule-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.75rem;

                    h5 {
                        font-size: 1rem;
                        font-weight: 600;
                        color: #252525;
                        margin: 0;
                    }

                    .add-day-btn {
                        padding: 0.25rem 0.5rem;
                    }
                }

                .days-overview {
                    .day-overview {
                        margin-bottom: 0.75rem;

                        .day-header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 0.5rem;

                            .day-select {
                                flex: 1;
                                margin-right: 0.5rem;

                                &:focus {
                                    border-color: $color-button;
                                    box-shadow: 0 0 0 0.2rem rgba($color-button, 0.15);
                                }
                            }

                            .delete-day-btn {
                                padding: 0.25rem 0.5rem;
                                border-color: none;
                            }
                        }

                        .day-info {
                            margin-top: 0.5rem;

                            .day-exercise-count {
                                margin-top: 0.25rem;
                                
                                small {
                                    font-weight: 600;
                                }
                            }
                        }
                    }
                }

                .schedule-summary {
                    margin-top: 1rem;

                    .summary-header {
                        margin-bottom: 0.5rem;

                        h6 {
                            font-size: 0.9rem;
                            font-weight: 600;
                            color: #252525;
                            margin: 0;
                        }
                    }

                    .selected-days {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.5rem;

                        .day-badge {
                            background: $color-button;
                            color: $color-white;
                            padding: 0.25rem 0.75rem;
                            border-radius: 15px;
                            font-size: 0.8rem;
                            font-weight: 600;
                        }
                    }
                }
            }

            .weekly-schedule {
                .schedule-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.75rem;

                    h5 {
                        font-size: 1rem;
                        font-weight: 600;
                        color: #252525;
                        margin: 0;
                    }

                    .add-day-btn {
                        padding: 0.25rem 0.5rem;
                    }
                }

                .selected-day-display {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.75rem;

                    .selected-day-info {
                        h6 {
                            font-size: 0.9rem;
                            font-weight: 600;
                            color: #252525;
                            margin: 0 0 0.25rem 0;
                        }

                        p {
                            margin: 0;
                            font-size: 0.875rem;
                        }
                    }
                }

                .days-overview {
                    .day-overview {
                        margin-bottom: 0.5rem;
                        cursor: pointer;

                        .day-header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 0.5rem;

                            .day-name {
                                font-weight: 600;
                                color: #252525;
                                font-size: 0.9rem;
                            }

                            .delete-day-btn {
                                padding: 0.25rem 0.5rem;
                            }
                        }

                        .day-content {
                            .workout-assignment {
                                margin-bottom: 0.5rem;

                                .workout-select {
                                    font-size: 0.875rem;

                                    &:focus {
                                        border-color: $color-button;
                                        box-shadow: 0 0 0 0.2rem rgba($color-button, 0.15);
                                    }
                                }
                            }

                            .notes-assignment {
                                .day-notes-input {
                                    font-size: 0.875rem;

                                    &:focus {
                                        border-color: $color-button;
                                        box-shadow: 0 0 0 0.2rem rgba($color-button, 0.15);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .plan-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.75rem;

            .btn-modern {
                background: linear-gradient(135deg, $color-button, $color-button-hover);
                border: none;
                border-radius: 6px;
                padding: 0.4rem 0.7rem;
                font-weight: 600;
                font-size: 0.875rem;
                color: $color-white;
                transition: all 0.3s ease;

                &:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba($color-button, 0.3);
                }
            }

            .btn-outline-modern {
                border: 2px solid #e9ecef;
                border-radius: 6px;
                padding: 0.4rem 0.7rem;
                font-weight: 600;
                font-size: 0.875rem;
                color: #6c757d;
                background: $color-white;
                transition: all 0.3s ease;

                &:hover {
                    border-color: $color-button;
                    color: $color-button;
                }
            }
        }
    }
}



// Responsive Design
@media (max-width: $breakpoint-xl) {
    .editor-layout {
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
}

@media (max-width: $breakpoint-lg) {
    .editor-layout {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .editor-column {
        height: auto;
        min-height: 400px;
    }
}

@media (max-width: $breakpoint-md) {
    .workout-editor-page {
        padding: 0.5rem;
    }

    .page-header {
        padding: 1rem;
    }

    .editor-column {
        .column-header {
            padding: 1rem;
        }
    }
}

// Saved Workout Activity Plans Section
    .saved-plans-section {
        border-top: 1px solid #e9ecef;
        padding-top: 1.5rem;
        margin-top: 1.5rem;

        .user-filter-info {
            padding: 0.5rem 0;
            margin-bottom: 1rem;
            border-bottom: 1px solid #e9ecef;
            
            small {
                font-size: 0.8rem;
                color: #6c757d;
                
                i {
                    color: $color-button;
                }
            }
        }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;

        h4 {
            font-size: 1.1rem;
            font-weight: 600;
            color: #252525;
            margin: 0;
            display: flex;
            align-items: center;

            i {
                color: $color-button;
            }
        }
    }

    .saved-plans-list {
        .loading-plans {
            padding: 2rem;
            text-align: center;

            .loading-state {
                .loading-icon {
                    font-size: 2rem;
                    color: $color-button;
                    margin-bottom: 1rem;
                }

                p {
                    color: #6c757d;
                    margin: 0;
                }
            }
        }

        .empty-plans {
            padding: 2rem;
            text-align: center;

            .empty-state {
                .empty-icon {
                    font-size: 3rem;
                    color: #dee2e6;
                    margin-bottom: 1rem;
                }

                h5 {
                    color: #6c757d;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }

                p {
                    color: #6c757d;
                    font-size: 0.9rem;
                    margin: 0;
                }
            }
        }

        .plans-container {
            .saved-plan-card {
                border: 1px solid #e9ecef;
                border-radius: 8px;
                margin-bottom: 1rem;
                background: $color-white;
                overflow: hidden;
                transition: all 0.3s ease;

                &:hover {
                    border-color: $color-button;
                    box-shadow: 0 4px 15px rgba($color-button, 0.1);
                }

                .plan-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem;
                    background: #f8f9fa;
                    border-bottom: 1px solid #e9ecef;

                    .plan-info {
                        flex: 1;

                        .plan-name {
                            font-size: 1rem;
                            font-weight: 600;
                            color: #252525;
                            margin: 0 0 0.5rem 0;
                        }

                        .plan-meta {
                            display: flex;
                            gap: 0.5rem;
                            flex-wrap: wrap;

                            .day-badge {
                                background: $color-button;
                                color: $color-white;
                                padding: 0.25rem 0.75rem;
                                border-radius: 15px;
                                font-size: 0.75rem;
                                font-weight: 600;
                            }

                            .date-badge {
                                background: #e9ecef;
                                color: #6c757d;
                                padding: 0.25rem 0.75rem;
                                border-radius: 15px;
                                font-size: 0.75rem;
                                font-weight: 500;
                            }
                        }
                    }

                    .plan-actions {
                        display: flex;
                        gap: 0.5rem;

                        .btn-outline-primary,
                        .btn-outline-danger {
                            border-radius: 6px;
                            padding: 0.5rem;
                            transition: all 0.3s ease;

                            &:hover {
                                transform: scale(1.1);
                            }
                        }
                    }
                }

                .plan-details {
                    padding: 1rem;

                    .exercise-summary {
                        .exercise-item {
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-start;

                            .exercise-info {
                                flex: 1;

                                h6 {
                                    font-size: 0.9rem;
                                    font-weight: 600;
                                    color: #252525;
                                    margin: 0 0 0.5rem 0;
                                }

                                .exercise-stats {
                                    display: flex;
                                    gap: 1rem;
                                    flex-wrap: wrap;

                                    .stat {
                                        display: flex;
                                        align-items: center;
                                        gap: 0.25rem;
                                        font-size: 0.75rem;
                                        color: #6c757d;
                                        font-weight: 500;

                                        i {
                                            color: $color-button;
                                            font-size: 0.7rem;
                                        }
                                    }
                                }
                            }

                            .exercise-category {
                                display: flex;
                                flex-direction: column;
                                gap: 0.25rem;
                                align-items: flex-end;

                                .category-badge {
                                    background: #e3f2fd;
                                    color: #1976d2;
                                    padding: 0.25rem 0.5rem;
                                    border-radius: 12px;
                                    font-size: 0.7rem;
                                    font-weight: 600;
                                }

                                .level-badge {
                                    background: #fff3e0;
                                    color: #ef6c00;
                                    padding: 0.25rem 0.5rem;
                                    border-radius: 12px;
                                    font-size: 0.7rem;
                                    font-weight: 600;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

// Responsive Design
.section-disabled {
    opacity: 0.5;
    pointer-events: none;
    position: relative;
}
.workout-select-row {
    margin-top: 1rem;
    max-width: 350px;
}

.day-select-small {
    min-width: 90px;
    max-width: 120px;
    font-size: 0.85rem;
    padding: 0.1rem 0.5rem;
    height: 28px;
    display: inline-block;
    vertical-align: middle;
}

.thumbnail-grid-section {
    background: #f8f9fa;
    border-radius: 0px;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh);
    overflow: hidden;

    .thumbnail-grid-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h4 {
            font-size: 1rem;
            font-weight: 600;
            color: #252525;
            margin: 0;
        }

        .close-thumbnail-btn {
            padding: 0.25rem 0.5rem;
            color: #6c757d;
            
            &:hover {
                color: #dc3545;
            }
        }
    }

    .filter-container {
        background: white;
        padding: 5px;

        .filter-note {
            display: block;
            margin-top: 0.5rem;
            font-size: 0.875rem;
        }
        margin-bottom: 5px;
        position: relative;
        flex-shrink: 0;
        
        &::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid white;
        }
        
        .filter-row {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            margin-bottom: 5px;
            
            &:last-child {
                margin-bottom: 0;
            }
            
            .filter-input {
                flex: 1 1 230px;
                min-width: 230px;
                border-radius: 4px;
                border: 1px solid #e0e0e0;
                background: #f5f5f5;
                min-height: 30px;
                padding: 0.375rem 0.75rem;
                font-size: 0.8rem;
                
                &:focus {
                    border-color: $color-button;
                    box-shadow: 0 0 0 0.2rem rgba($color-button, 0.15);
                    background: white;
                }
            }
            
            .filter-select {
                flex: 1 1 115px;
                min-width: 115px;
                border-radius: 4px;
                border: 1px solid #e0e0e0;
                background: #f5f5f5;
                min-height: 30px;
                font-size: 0.68rem;
                
                ::v-deep select {
                    padding: 0.375rem 2rem 0.375rem 0.75rem;
                    width: 100%;
                    background: transparent;
                    border: none;
                    font-size: 0.875rem;
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    cursor: pointer;
                }
                
                // Style the dropdown options to show full text
                ::v-deep option {
                    padding: 0.5rem;
                }
                
                &:focus {
                    border-color: $color-button;
                    box-shadow: 0 0 0 0.2rem rgba($color-button, 0.15);
                    background: white;
                    
                    ::v-deep select {
                        background: transparent;
                    }
                }
            }
        }
    }

    // Compact filter layout on laptop & smaller: force at most 2 rows (3 columns per row)
    @media (max-width: $breakpoint-lg) {
        .filter-container {
            .filter-row {
                .filter-input,
                .filter-select {
                    // 3 columns per row → 2 rows total for 6 elements
                    flex: 1 1 calc(33.333% - 8px);
                    min-width: 0; // allow them to shrink so they don't wrap to a 3rd row
                }
            }

            .filter-note {
                font-size: $font-size-xs;   // slightly smaller helper text
                margin-top: $margin-xxs;    // reduce vertical spacing
            }
        }
    }

    .thumbnail-grid-wrapper {
        position: relative;
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
    }

    .load-more-thumbnails {
        padding: 0px;
        text-align: center;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        background: #f8f9fa;

        .btn {
            padding: $padding-xxs $padding-xs;
            font-size: $font-size-xs;
            border-radius: $border-radius-sm;
        }
    }

    .thumbnail-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 5px;
        padding: 5px;
        max-height: calc(100vh);
        overflow-y: auto;
        overflow-x: hidden;
        flex: 1;
        min-height: 0;
        width: 100%;
        box-sizing: border-box;

        &::-webkit-scrollbar {
            width: 8px;
        }
        
        &::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
        }
        
        &::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
            
            &:hover {
                background: #555;
            }
        }

        .thumbnail-item {
            position: relative;
            cursor: pointer;
            border-radius: 4px;
            width: 100%;
            height: 0;
            padding-bottom: 70%;
            background: #f8f9fa;
            box-sizing: border-box;
            
            &:hover {
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            
            &.selected {
                border-color: #28a745;
                box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
            }
            
            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
            }
            
            .thumbnail-overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(to top, rgba(0,0,0,0.1), rgba(0,0,0,0.4), transparent);
                padding: 2px;
                z-index: 1;
                
                .thumbnail-name {
                    color: white;
                    font-size: 0.6rem;
                    font-weight: 500;
                    display: block;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    line-height: 1;
                }
            }
        }
    }

    .scroll-to-top-btn {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10;
        transition: all 0.3s ease;
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
        
        i {
            font-size: 0.875rem;
        }
    }

    .loading-thumbnails {
        text-align: center;
        padding: 1.5rem;
        color: #6c757d;
        flex-shrink: 0;
        
        i {
            margin-right: 0.5rem;
        }
    }

    // Responsive adjustments for small screens
    @media (max-width: 768px) {
        max-height: calc(100vh - 150px);
        
        .thumbnail-grid {
            grid-template-columns: repeat(2, 1fr);
            max-height: calc(100vh - 280px);
            padding: 0.75rem;
            padding-bottom: 4rem;
            gap: 0.75rem;
            
            .thumbnail-item {
                .thumbnail-overlay {
                    padding: 0.625rem 0.5rem;
                    
                    .thumbnail-name {
                        font-size: 0.7rem;
                    }
                }
            }
        }
        
        .filter-container {
            padding: 0.75rem;
        }
        
        .scroll-to-top-btn {
            width: 36px;
            height: 36px;
            bottom: 0.75rem;
            right: 0.75rem;
        }
    }
    
    @media (max-width: 480px) {
        padding: 0.75rem;
        max-height: calc(100vh - 120px);
        
        .thumbnail-grid {
            grid-template-columns: repeat(2, 1fr);
            max-height: calc(100vh - 250px);
            padding: 0.5rem;
            padding-bottom: 5rem;
            gap: 0.5rem;
            
            .thumbnail-item {
                border-radius: 6px;
                
                .thumbnail-overlay {
                    padding: 0.5rem;
                    
                    .thumbnail-name {
                        font-size: 0.65rem;
                    }
                }
            }
        }
        
        .scroll-to-top-btn {
            width: 32px;
            height: 32px;
            bottom: 0.5rem;
            right: 0.5rem;
        }
    }
}

// Selected Exercises List
.selected-exercises-list {
    padding: 5px;
    max-height: calc(100vh - 300px);
    overflow-y: auto;

    .selected-exercise-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 0.75rem;
        background: white;
        border-radius: 8px;
        margin-bottom: 0.5rem;
        border: 1px solid #e9ecef;
        transition: all 0.2s;
        
        &:hover {
            border-color: $color-button;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .exercise-thumbnail-small {
            width: 50px;
            height: 50px;
            object-fit: contain;
            border-radius: 4px;
            flex-shrink: 0;
        }
        
        .exercise-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            min-width: 0; // Allow text to truncate
        }
        
        .exercise-name {
            font-weight: 500;
            color: #252525;
            font-size: $font-size-sm;
        }
        
        .exercise-metadata {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 0.25rem;
        }
        
        .metadata-item {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            padding: 0.25rem 0.5rem;
            border-radius: $border-radius-sm;
            font-size: $font-size-xxs;
            font-weight: $font-weight-medium;
            white-space: nowrap;
            
            i {
                font-size: 0.7rem;
            }
            
            span {
                max-width: 80px;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        
        .metadata-category {
            background-color: rgba(0, 123, 255, 0.1);
            color: #007bff;
            
            i {
                color: #007bff;
            }
        }
        
        .metadata-equipment {
            background-color: rgba(255, 193, 7, 0.1);
            color: #ffc107;
            
            i {
                color: #ffc107;
            }
        }
        
        .metadata-level {
            background-color: rgba(40, 167, 69, 0.1);
            color: #28a745;
            
            i {
                color: #28a745;
            }
        }
        
        .metadata-muscle {
            background-color: rgba(220, 53, 69, 0.1);
            color: #dc3545;
            
            i {
                color: #dc3545;
            }
        }
        
        .exercise-checkbox {
            margin: 0;
            flex-shrink: 0;
        }
    }

    .empty-selected-exercises {
        text-align: center;
        padding: 2rem;
        color: #6c757d;
        
        p {
            margin: 0;
        }
    }
}

// Exercise Preview with Play Button
.exercise-preview {
    position: relative;
    width: 100%;
    height: 200px;
    margin-bottom: 1rem;
    border-radius: 8px;
    overflow: hidden;
    background: #f8f9fa;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    
    .play-button-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60px;
        height: 60px;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        z-index: 10;
        
        &:hover {
            background: rgba(0, 0, 0, 0.8);
            transform: translate(-50%, -50%) scale(1.1);
        }
        
        i {
            color: white;
            font-size: 1.5rem;
            margin-left: 4px; // Adjust play icon position
        }
    }
}

// Exercise Details Section (Shared for all exercises in a section)
.exercises-in-section .exercise-details {
    padding: 1rem;
    background: white;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    margin-top: 1rem;
    
    // Exercise Type Selection
    .exercise-type-selection {
        margin-bottom: 1.5rem;
        
        .exercise-type-radio {
            display: flex;
            gap: 1.5rem;
            
            ::v-deep .custom-control {
                margin-bottom: 0;
                
                .custom-control-label {
                    font-size: 0.875rem;
                    color: #495057;
                    cursor: pointer;
                    
                    &::before {
                        border-color: #ced4da;
                    }
                }
                
                .custom-control-input:checked ~ .custom-control-label::before {
                    background-color: $color-button;
                    border-color: $color-button;
                }
            }
        }
    }
    
    // Sets Configuration
    .sets-configuration {
        margin-bottom: 1.5rem;
        
        .sets-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 0.75rem;
            background: white;
            border-radius: 4px;
            overflow: hidden;
            
            thead {
                background: #f8f9fa;
                
                th {
                    padding: 0.75rem;
                    text-align: left;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #495057;
                    border-bottom: 2px solid #dee2e6;
                }
            }
            
            tbody {
                tr {
                    border-bottom: 1px solid #e9ecef;
                    
                    &:last-child {
                        border-bottom: none;
                    }
                    
                    td {
                        padding: 0.5rem 0.75rem;
                        
                        .set-input {
                            width: 100%;
                            border: 1px solid #ced4da;
                            border-radius: 4px;
                            padding: 0.375rem 0.5rem;
                            font-size: 0.875rem;
                            
                            &:focus {
                                border-color: $color-button;
                                box-shadow: 0 0 0 0.2rem rgba($color-button, 0.15);
                            }
                        }
                    }
                }
            }
        }
        
        .sets-actions {
            display: flex;
            gap: 1rem;
            align-items: center;
            
            .add-set-btn,
            .delete-set-btn {
                padding: 0;
                font-size: 0.875rem;
                color: #495057;
                text-decoration: none;
                border: none;
                background: none;
                
                &:hover {
                    color: $color-button;
                    text-decoration: none;
                }
                
                i {
                    margin-right: 0.25rem;
                    font-size: 0.875rem;
                }
            }
            
            .add-set-btn {
                color: $color-button;
                
                i {
                    color: $color-button;
                }
            }
            
            .delete-set-btn {
                i {
                    color: #6c757d;
                }
            }
        }
    }
    
    // Intensity Section
    .intensity-section {
        margin-bottom: 1.5rem;
        
        .intensity-radio {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            
            ::v-deep .custom-control {
                margin-bottom: 0;
                
                .custom-control-label {
                    font-size: 0.875rem;
                    color: #495057;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    
                    &::before {
                        border-color: #ced4da;
                    }
                }
                
                .custom-control-input:checked ~ .custom-control-label::before {
                    background-color: $color-button;
                    border-color: $color-button;
                }
            }
            
            .intensity-input-wrapper {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-left: 0.5rem;
                
                .intensity-input {
                    width: 60px;
                    border: 1px solid #ced4da;
                    border-radius: 4px;
                    padding: 0.25rem 0.5rem;
                    font-size: 0.875rem;
                    
                    &:focus {
                        border-color: $color-button;
                        box-shadow: 0 0 0 0.2rem rgba($color-button, 0.15);
                    }
                }
                
                .intensity-label {
                    font-size: 0.875rem;
                    color: #495057;
                }
            }
        }
    }
    
    // Notes Section
    .notes-section {
        .notes-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 600;
            color: #495057;
            margin-bottom: 0.5rem;
        }
        
        .notes-textarea {
            width: 100%;
            border: 1px solid #ced4da;
            border-radius: 4px;
            padding: 0.75rem;
            font-size: 0.875rem;
            resize: vertical;
            min-height: 100px;
            
            &:focus {
                border-color: $color-button;
                box-shadow: 0 0 0 0.2rem rgba($color-button, 0.15);
                outline: none;
            }
            
            &::placeholder {
                color: #adb5bd;
            }
        }
    }
}

// Video Player Modal
::v-deep .video-player-modal {
    .modal-dialog {
        max-width: 500px;
        margin: 1.75rem auto;
    }
    
    .modal-content {
        background: transparent;
        border: none;
        box-shadow: none;
    }
    
    .modal-body {
        padding: 0;
        background: transparent;
    }
}

.video-modal-content {
    position: relative;
    width: 100%;
    background: #000;
    border-radius: 8px;
    overflow: hidden;
    
    .close-video-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 35px;
        height: 35px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.2s;
        
        &:hover {
            background: rgba(255, 255, 255, 1);
            transform: scale(1.1);
        }
        
        i {
            color: #333;
            font-size: 1.2rem;
        }
    }
    
    .exercise-video-modal {
        width: 100%;
        height: auto;
        display: block;
        background: #000;
        // Remove all controls
        &::-webkit-media-controls {
            display: none !important;
        }
        &::-webkit-media-controls-enclosure {
            display: none !important;
        }
    }
    
    .video-modal-placeholder {
        position: relative;
        min-height: 280px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: #111;
    }
    
    .video-modal-poster {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        background-position: center;
        opacity: 0.6;
    }
    
    .video-modal-play-btn {
        position: relative;
        z-index: 2;
        width: 72px;
        height: 72px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.9);
        color: #333;
        font-size: 1.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 6px;
        cursor: pointer;
        transition: transform 0.2s, background 0.2s;
        
        &:hover {
            background: #fff;
            transform: scale(1.1);
        }
    }
    
    .video-modal-exercise-name {
        position: relative;
        z-index: 2;
        margin-top: 1rem;
        color: #fff;
        font-size: 1rem;
        text-align: center;
        padding: 0 1rem;
    }
}
</style>
