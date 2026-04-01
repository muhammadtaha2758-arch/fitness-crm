<template>
    <b-modal
        id="activity-modal"
        size="lg"
        :title="modalTitle"
        :visible="visible"
        @hide="$emit('close')"
        hide-footer
        class="activity-modal"
        centered
        scrollable
        no-close-on-backdrop
        no-close-on-esc
        @close="showActivityModal = false"
        @submit="addActivity"
    >
        <!-- Progress Indicator -->
        <div class="progress-indicator">
            <div class="progress-steps">
                <div 
                    v-for="(step, index) in steps" 
                    :key="index"
                    :class="['step', { active: currentStep >= index, completed: currentStep > index }]"
                    @click="goToStep(index)"
                >
                    <div class="step-number">{{ index + 1 }}</div>
                    <div class="step-label">{{ step.label }}</div>
                </div>
            </div>
        </div>

        <form @submit.prevent="handleSubmit" class="activity-form">
            <!-- Step Navigation -->
            <div class="step-navigation" v-if="steps.length > 1">
                <button 
                    type="button" 
                    class="btn btn-outline-secondary" 
                    @click="previousStep"
                    :disabled="currentStep === 0"
                >
                    <i class="fas fa-chevron-left"></i> Previous
                </button>
                <span class="step-counter">{{ currentStep + 1 }} of {{ steps.length }}</span>
                <button 
                    type="button" 
                    class="btn btn-primary" 
                    @click="nextStep"
                    :disabled="currentStep === steps.length - 1"
                >
                    Next <i class="fas fa-chevron-right"></i>
                </button>
            </div>

            <!-- Step 1: Basic Info + Details & Media -->
            <div v-show="currentStep === 0" class="form-section step-content">
                <h4 class="section-title">Basic Information</h4>
                <b-row>
                    <b-col md="6">
                        <b-form-group
                            class="form-group-modern"
                        >
                            <template slot="label">
                                Activity Name <span class="required-asterisk">*</span>
                            </template>
                            <b-form-input
                                v-model="form.name"
                                required
                                placeholder="Enter title (e.g., Full Body Burn)"
                                class="form-input-modern"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group
                            class="form-group-modern"
                        >
                            <template slot="label">
                                Category <span class="required-asterisk">*</span>
                            </template>
                            <b-form-select
                                v-model="form.category"
                                :options="[
                                    { value: null, text: 'Choose category' },
                                    ...categories,
                                ]"
                                required
                                class="form-select-modern"
                            />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group
                            class="form-group-modern"
                        >
                            <template slot="label">
                                Duration (minutes) <span class="required-asterisk">*</span>
                            </template>
                            <b-form-input
                                type="number"
                                v-model="form.duration"
                                required
                                placeholder="e.g., 30"
                                class="form-input-modern"
                            />
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group class="form-group-modern">
                            <template slot="label">
                                Level <span class="required-asterisk">*</span>
                            </template>
                            <b-form-select
                                v-model="form.level"
                                :options="levels"
                                required
                                class="form-select-modern"
                                placeholder="Select level"
                            />
                        </b-form-group>
                    </b-col>
                    <b-col md="0" style="display: none;">
                        <b-form-group
                            label="Calories Burned"
                            class="form-group-modern"
                         
                        >
                            <b-form-input
                                type="number"
                                v-model="form.calories"
                                placeholder="e.g., 200"
                                class="form-input-modern"
                            />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group
                            label="Difficulty Level"
                            class="form-group-modern"
                        >
                            <div class="difficulty-slider">
                                <input
                                    type="range"
                                    v-model="form.difficulty"
                                    min="1"
                                    max="10"
                                    class="form-range"
                                    @input="updateDifficultyLabel"
                                />
                                <div class="difficulty-label">
                                    <span class="difficulty-value">{{ difficultyLabel }}</span>
                                    <span class="difficulty-number">({{ form.difficulty || 1 }}/10)</span>
                                </div>
                            </div>
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group
                            label="Visible for"
                            class="form-group-modern"
                        >
                            <b-form-select
                                v-model="form.visibleFor"
                                :options="visibleForOptions"
                                class="form-select-modern"
                            />
                        </b-form-group>
                    </b-col>
                </b-row>

                <hr class="section-divider">

                <h4 class="section-title">Activity Details & Media</h4>

                <b-form-group class="form-group-modern">
                    <template slot="label">
                        Description <span class="required-asterisk">*</span>
                    </template>
                    <b-form-textarea
                        v-model="form.description"
                        rows="3"
                        class="form-textarea-modern"
                        placeholder="Briefly describe the workout focus and goals"
                        required
                    />
                </b-form-group>

                <b-form-group label="Instructions" class="form-group-modern">
                    <b-form-textarea
                        v-model="form.instructions"
                        rows="4"
                        class="form-textarea-modern"
                        placeholder="Step-by-step guide on how to perform this workout"
                    />
                </b-form-group>

                <b-row>
                    <b-col md="6">
                        <b-form-group
                            label="Equipment Needed"
                            class="form-group-modern"
                        >
                            <b-form-input
                                v-model="form.equipment"
                                class="form-input-modern"
                                placeholder="e.g., Dumbbells, Resistance Bands, Yoga Mat"
                            />
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
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

                <hr class="section-divider">

                <h5 class="subsection-title">Media & Visuals</h5>
                
                <!-- Thumbnail Upload -->
                <b-form-group label="Activity Thumbnail" class="form-group-modern">
                    <div class="upload-hint">
                        <i class="fas fa-info-circle"></i>
                        Add a clear image that represents this activity (recommended: 800x600px)
                    </div>
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

                        <div
                            class="file-upload-overlay"
                            v-if="!thumbnailUrl"
                            @click="$refs.thumbnailInput.click()"
                        >
                            <i class="fas fa-image"></i>
                            <span>Click to upload or drag image here</span>
                            <small>JPG, PNG, GIF up to 5MB</small>
                        </div>

                        <!-- Thumbnail Preview inside the box -->
                        <div
                            v-if="thumbnailUrl"
                            class="thumbnail-overlay-preview"
                        >
                            <img
                                :src="thumbnailUrl"
                                alt="Thumbnail Preview"
                                class="thumbnail-image"
                            />
                            <div class="thumbnail-actions">
                                <button
                                    type="button"
                                    class="btn btn-sm btn-outline-light me-2"
                                    @click="$refs.thumbnailInput.click()"
                                >
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-sm btn-outline-danger"
                                    @click="removeThumbnail"
                                >
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </b-form-group>

                <!-- Video Selection -->
                <b-form-group
                    label="Video Tutorial"
                    class="form-group-modern"
                >
                    <div class="upload-hint">
                        <i class="fas fa-info-circle"></i>
                        Select from available videos or add a custom link
                    </div>
                    
                    <!-- Video Selection Tabs -->
                    <b-nav tabs class="video-tabs">
                        <b-nav-item 
                            :active="videoSelectionMode === 'uploaded'" 
                            @click="videoSelectionMode = 'uploaded'"
                        >
                            <i class="fas fa-video"></i> Library
                        </b-nav-item>
                        <b-nav-item 
                            :active="videoSelectionMode === 'custom'" 
                            @click="videoSelectionMode = 'custom'"
                        >
                            <i class="fas fa-link"></i> Link
                        </b-nav-item>
                    </b-nav>

                    <!-- Uploaded Videos Tab -->
                    <div v-if="videoSelectionMode === 'uploaded'" class="video-selection-content">
                        <!-- Enhanced Filters Row -->
                        <div v-if="Object.keys(enhancedVideoFilters).length" class="video-filters mb-3">
                            <div class="row">
                                <div 
                                    class="col-md-3 mb-2"
                                    v-for="(options, header) in enhancedVideoFilters" 
                                    :key="header"
                                >
                                    <label class="form-label">{{ header }}</label>
                                    <b-form-select
                                        :options="[{ value: '', text: 'All ' + header }]"
                                        v-model="selectedVideoFilters[header]"
                                        class="form-select-modern"
                                        @change="applyVideoFilters"
                                    >
                                        <option 
                                            v-for="option in options" 
                                            :key="option" 
                                            :value="option"
                                        >
                                            {{ option }}
                                        </option>
                                    </b-form-select>
                                </div>
                                <div class="col-md-3 mb-2">
                                    <label class="form-label">Search</label>
                                    <b-form-input
                                        v-model="videoSearchQuery"
                                        placeholder="Search videos..."
                                        class="form-input-modern"
                                        @input="applyVideoFilters"
                                    />
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-12">
                                    <button 
                                        type="button" 
                                        class="btn btn-sm btn-outline-secondary"
                                        @click="clearVideoFilters"
                                    >
                                        <i class="fas fa-times"></i> Clear Filters
                                    </button>
                                    <span class="ml-2 text-muted">
                                        Showing {{ filteredAvailableVideos.length }} of {{ availableVideos.length }} videos
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div v-if="loadingVideos" class="text-center py-3">
                            <div class="spinner-border text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <p class="mt-2 mb-0">Loading videos...</p>
                        </div>
                        
                        <div v-else-if="filteredAvailableVideos && filteredAvailableVideos.length > 0" class="video-grid">
                            <div 
                                v-for="video in filteredAvailableVideos" 
                                :key="video.filename"
                                class="video-item"
                                :class="{ selected: selectedVideo && selectedVideo.filename === video.filename }"
                                @click="selectVideo(video)"
                            >
                                <div class="video-preview">
                                    <div v-if="video.thumbnail_url" class="thumbnail-container">
                                        <img 
                                            :src="video.thumbnail_url" 
                                            :alt="video.name"
                                            class="video-thumbnail"
                                            @click="playVideo(video)"
                                        />
                                        <div class="play-overlay" @click="playVideo(video)">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div v-else class="no-thumbnail" @click="playVideo(video)">
                                        <i class="fas fa-video"></i>
                                        <span>No thumbnail</span>
                                        <div class="play-overlay">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="video-info">
                                    <h6 class="video-name">{{ video.name }}</h6>
                                    <small class="video-size">{{ formatFileSize(video.size) }}</small>
                                </div>
                                <div v-if="selectedVideo && selectedVideo.filename === video.filename" class="selected-indicator">
                                    <i class="fas fa-check-circle"></i>
                                </div>
                            </div>
                        </div>
                        
                        <!-- DEBUG: Force show videos for testing -->
                        <div v-else-if="availableVideos && availableVideos.length > 0" class="video-grid">
                            <div class="alert alert-info mb-3">
                                <strong>DEBUG:</strong> Showing {{ availableVideos.length }} videos directly from availableVideos
                                <br>filteredAvailableVideos: {{ filteredAvailableVideos ? filteredAvailableVideos.length : 'undefined' }}
                            </div>
                            <div 
                                v-for="video in availableVideos.slice(0, 10)" 
                                :key="video.filename || video.name"
                                class="video-item"
                                :class="{ selected: selectedVideo && selectedVideo.filename === video.filename }"
                                @click="selectVideo(video)"
                            >
                                <div class="video-preview">
                                    <div v-if="video.thumbnail_url" class="thumbnail-container">
                                        <img 
                                            :src="video.thumbnail_url" 
                                            :alt="video.name"
                                            class="video-thumbnail"
                                            @click="playVideo(video)"
                                        />
                                        <div class="play-overlay" @click="playVideo(video)">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div v-else class="no-thumbnail" @click="playVideo(video)">
                                        <i class="fas fa-video"></i>
                                        <span>No thumbnail</span>
                                        <div class="play-overlay">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="video-info">
                                    <h6 class="video-name">{{ video.name || video.filename }}</h6>
                                    <small class="video-size">{{ formatFileSize(video.size) }}</small>
                                </div>
                                <div v-if="selectedVideo && selectedVideo.filename === video.filename" class="selected-indicator">
                                    <i class="fas fa-check-circle"></i>
                                </div>
                            </div>
                        </div>
                        
                        <div v-else class="text-center py-4">
                            <i class="fas fa-video text-muted" style="font-size: 2rem"></i>
                            <p class="mt-2 mb-0">No videos available</p>
                            <small class="text-muted">
                                Total videos: {{ availableVideos.length }}, 
                                Filtered: {{ filteredAvailableVideos ? filteredAvailableVideos.length : 0 }}
                            </small>
                        </div>
                    </div>

                    <!-- Custom Link Tab -->
                    <div v-if="videoSelectionMode === 'custom'" class="video-selection-content">
                        <b-form-input
                            v-model="form.video_link"
                            placeholder="https://youtube.com/watch?v=..."
                            class="form-input-modern"
                        />
                        <small class="form-text text-muted">
                            Enter a YouTube, Vimeo, or other video URL
                        </small>
                    </div>
                </b-form-group>
            </div>

            <!-- Step 2: Exercise Setup + Advanced Settings -->
            <div v-show="currentStep === 1" class="form-section step-content">
                <h4 class="section-title">Exercise Setup</h4>
                
                <b-row>
                    <b-col md="6">
                        <b-form-group
                            label="Primary Muscle Group(s)"
                            class="form-group-modern"
                        >
                            <b-form-select
                                v-model="form.primaryMuscleGroups"
                                :options="muscleGroupOptions"
                                multiple
                                class="form-select-modern"
                                placeholder="Select primary muscle groups"
                            />
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group
                            label="Secondary Muscle Group(s)"
                            class="form-group-modern"
                        >
                            <b-form-select
                                v-model="form.secondaryMuscleGroups"
                                :options="muscleGroupOptions"
                                multiple
                                class="form-select-modern"
                                placeholder="Select secondary muscle groups"
                            />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group
                            label="Primary Joint"
                            class="form-group-modern"
                        >
                            <b-form-select
                                v-model="form.primaryJoint"
                                :options="[
                                    { value: null, text: 'Select primary joint' },
                                    ...jointOptions,
                                ]"
                                class="form-select-modern"
                            />
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
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
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group
                            label="Uses Weights"
                            class="form-group-modern"
                        >
                            <b-form-checkbox
                                v-model="form.usesWeights"
                                class="form-checkbox-modern"
                            >
                                This exercise uses weights or resistance
                            </b-form-checkbox>
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group
                            label="Intensity (%1RM)"
                            class="form-group-modern"
                        >
                            <b-form-input
                                type="number"
                                v-model="form.intensity"
                                min="0"
                                max="100"
                                class="form-input-modern"
                                placeholder="75"
                            />
                            <small class="form-text text-muted">Percentage of 1 Rep Maximum</small>
                        </b-form-group>
                    </b-col>
                </b-row>

                <!-- Sets Configuration -->
                <div v-if="form.type === 'Set based' || form.type === 'Repetition-based'" class="sets-configuration">
                    <h5 class="sets-title">
                        <i class="fas fa-dumbbell"></i>
                        Sets Configuration
                    </h5>
                    <div class="sets-table">
                        <div class="sets-header">
                            <div class="set-number">Set</div>
                            <div class="reps-column">Reps (x)</div>
                            <div class="pause-column">Pause (s)</div>
                        </div>
                        <div 
                            v-for="(set, index) in form.sets" 
                            :key="index" 
                            class="set-row"
                        >
                            <div class="set-number">{{ index + 1 }}</div>
                            <div class="reps-column">
                                <b-form-input
                                    v-model="set.reps"
                                    type="number"
                                    min="0"
                                    class="form-input-modern set-input"
                                    placeholder="0"
                                />
                                <span class="unit">x</span>
                            </div>
                            <div class="pause-column">
                                <b-form-input
                                    v-model="set.pause"
                                    type="number"
                                    min="0"
                                    class="form-input-modern set-input"
                                    placeholder="0"
                                />
                                <span class="unit">s</span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="section-divider">

                <h4 class="section-title">Advanced Settings</h4>
                
                <b-row>
                    <b-col md="6">
                        <b-form-group
                            label="Rest Period"
                            class="form-group-modern"
                        >
                            <b-form-input
                                type="number"
                                v-model="form.restPeriod"
                                class="form-input-modern"
                                placeholder="30"
                            />
                            <small class="form-text text-muted">Seconds between sets</small>
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group
                            label="QR Link"
                            class="form-group-modern"
                        >
                            <b-form-input
                                v-model="form.qrLink"
                                class="form-input-modern"
                                placeholder="Enter QR code link"
                            />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col md="6">
                        <b-form-group
                            label="Manufacturer"
                            class="form-group-modern"
                        >
                            <b-form-select
                                v-model="form.manufacturer"
                                :options="manufacturerOptions"
                                class="form-select-modern"
                            />
                        </b-form-group>
                    </b-col>
                </b-row>

                                 <div class="completion-summary">
                     <h5><i class="fas fa-check-circle text-success"></i> Almost Done!</h5>
                     <p>Review your activity details and click "{{ initialWorkout && initialWorkout.exercise_id ? 'Update Activity' : 'Create Activity' }}" to finish.</p>
                 </div>
            </div>

            <!-- Form Actions -->
            <div class="form-actions">
                <div class="action-buttons">
                    <button 
                        type="button" 
                        class="btn btn-outline-secondary" 
                        @click="$emit('close')"
                    >
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    
                    <div class="primary-actions">
                        <button 
                            v-if="currentStep < steps.length - 1"
                            type="button" 

                            class="btn btn-primary" 
                            
                            @click.prevent="nextStep"
                        >
                            Continue <i class="fas fa-arrow-right"></i>
                        </button>
                        
                        <button 
                            v-if="currentStep === steps.length - 1"
                            type="submit" 
                            class="btn btn-success submit-btn"
                            :disabled="loading"
                        >
                            <i v-if="!loading" class="fas fa-check-circle"></i>
                            <i v-else class="fas fa-spinner fa-spin"></i>
                                                         {{ loading ? (initialWorkout && initialWorkout.exercise_id ? 'Updating...' : 'Creating...') : (initialWorkout && initialWorkout.exercise_id ? 'Update Activity' : 'Create Activity') }}
                        </button>
                    </div>
                </div>
            </div>
        </form>
        
        <!-- Video Player Modal -->
        <VideoPlayerModal
            :visible="showVideoPlayer"
            :video="selectedVideoForPlayback"
            @close="closeVideoPlayer"
        />
    </b-modal>
</template>

<script>
import axios from 'axios';
import VideoPlayerModal from './VideoPlayerModal.vue';

export default {
    components: {
        VideoPlayerModal
    },
    props: {
        visible: Boolean,
        initialWorkout: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            currentStep: 0,
            steps: [
                { label: "Basic Info & Details" },
                { label: "Exercise Setup & Advanced" }
            ],
            form: {
                name: "", // Changed from exercise_name to match template
                category: null,
                duration: null,
                level: "Beginner",
                calories: null, // Changed from calories_burned to match template
                description: "",
                instructions: "",
                equipment: "",
                muscles_targeted: "",
                difficulty: 1, // Added default value
                rest_period: null,
                tags: "",
                video_link: "",
                // Additional fields used in template
                visibleFor: null,
                primaryMuscleGroups: [],
                secondaryMuscleGroups: [],
                primaryJoint: null,
                type: null,
                usesWeights: false,
                intensity: null,
                sets: [
                    { reps: 0, pause: 0 },
                    { reps: 0, pause: 0 },
                    { reps: 0, pause: 0 }
                ],
                restPeriod: null, // Added for template
                qrLink: "",
                manufacturer: null,
            },
            categories: [
                { value: "full-body", text: "Full Body " },
                { value: "upper-body", text: "Upper Body" },
                { value: "lower-body", text: "Lower Body" },
                { value: "core", text: "Core" },
                { value: "flexibility", text: "Flexibility" },
                { value: "cardio", text: "Cardio" },
                { value: "strength", text: "Strength" },
                { value: "yoga", text: "Yoga" },
            ],
            levels: [
                { value: "Beginner", text: "Beginner" },
                { value: "Intermediate", text: "Intermediate" },
                { value: "Advanced", text: "Advanced" },
            ],
            // Additional options for template
            visibleForOptions: [
                { value: null, text: "Select visibility" },
                { value: "all", text: "All Members" },
                { value: "premium", text: "Premium Members" },
                { value: "trainers", text: "Trainers Only" }
            ],
            muscleGroupOptions: [
                { value: "chest", text: "Chest" },
                { value: "back", text: "Back" },
                { value: "shoulders", text: "Shoulders" },
                { value: "biceps", text: "Biceps" },
                { value: "triceps", text: "Triceps" },
                { value: "forearms", text: "Forearms" },
                { value: "abs", text: "Abs" },
                { value: "obliques", text: "Obliques" },
                { value: "quads", text: "Quadriceps" },
                { value: "hamstrings", text: "Hamstrings" },
                { value: "calves", text: "Calves" },
                { value: "glutes", text: "Glutes" }
            ],
            jointOptions: [
                { value: "shoulder", text: "Shoulder" },
                { value: "elbow", text: "Elbow" },
                { value: "wrist", text: "Wrist" },
                { value: "hip", text: "Hip" },
                { value: "knee", text: "Knee" },
                { value: "ankle", text: "Ankle" },
                { value: "spine", text: "Spine" }
            ],
            typeOptions: [
                { value: null, text: "Select exercise type" },
                { value: "Set based", text: "Set based" },
                { value: "Repetition-based", text: "Repetition-based" },
                { value: "Time-based", text: "Time-based" },
                { value: "Distance-based", text: "Distance-based" }
            ],
            manufacturerOptions: [
                { value: null, text: "Select manufacturer" },
                { value: "generic", text: "Generic" },
                { value: "nike", text: "Nike" },
                { value: "adidas", text: "Adidas" },
                { value: "reebok", text: "Reebok" },
                { value: "under_armour", text: "Under Armour" }
            ],
            thumbnailUrl: null,
            videoUrl: null,
            loading: false,
            // Video selection properties
            videoSelectionMode: 'uploaded', // 'uploaded' or 'custom'
            availableVideos: [],
            selectedVideo: null,
            loadingVideos: false,
            availableVideoFilters: {},
            selectedVideoFilters: {},
            generatedThumbnailBlob: null,
            // Video player modal properties
            showVideoPlayer: false,
            selectedVideoForPlayback: null,
            // Enhanced filtering
            videoSearchQuery: '',
        };
    },
    computed: {
        difficultyLabel() {
            const difficulty = this.form.difficulty || 1;
            if (difficulty <= 2) return "Very Easy";
            if (difficulty <= 4) return "Easy";
            if (difficulty <= 6) return "Moderate";
            if (difficulty <= 8) return "Hard";
            return "Very Hard";
        }
    },
    computed: {
        modalTitle() {
            return this.initialWorkout && this.initialWorkout.exercise_id 
                ? `Edit Activity: ${this.initialWorkout.exercise_name || this.initialWorkout.name || 'Untitled'}`
                : 'Create New Activity';
        },
        filteredVideoFilters() {
            // Only show Category, Body part, and Level filters
            const allowedFilters = ['Category', 'Body part', 'Level'];
            const filtered = {};
            
            Object.keys(this.availableVideoFilters).forEach(key => {
                if (allowedFilters.includes(key)) {
                    filtered[key] = this.availableVideoFilters[key];
                }
            });
            
            return filtered;
        },
        enhancedVideoFilters() {
            // Enhanced filters with more options
            const filters = {};
            
            // Add category filters based on video paths
            const categories = new Set();
            const bodyParts = new Set();
            const levels = new Set();
            
            this.availableVideos.forEach(video => {
                // Extract category from path
                const pathParts = video.path.split('/');
                if (pathParts.length > 1) {
                    categories.add(pathParts[0]);
                }
                if (pathParts.length > 2) {
                    bodyParts.add(pathParts[1]);
                }
                
                // Add existing meta filters
                if (video.meta) {
                    if (video.meta.Category) categories.add(video.meta.Category);
                    if (video.meta['Body part']) bodyParts.add(video.meta['Body part']);
                    if (video.meta.Level) levels.add(video.meta.Level);
                }
            });
            
            if (categories.size > 0) {
                filters['Category'] = Array.from(categories).sort();
            }
            if (bodyParts.size > 0) {
                filters['Body Part'] = Array.from(bodyParts).sort();
            }
            if (levels.size > 0) {
                filters['Level'] = Array.from(levels).sort();
            }
            
            // Add file size filter
            filters['File Size'] = ['Small (< 10MB)', 'Medium (10-50MB)', 'Large (> 50MB)'];
            
            return filters;
        },
        filteredAvailableVideos() {
            try {                
                // Apply selectedVideoFilters to availableVideos meta
                const videos = Array.isArray(this.availableVideos) ? this.availableVideos : [];                
                const filters = this.selectedVideoFilters || {};
                const searchQuery = this.videoSearchQuery || '';
                
                // Apply search filter first
                let filtered = videos;
                if (searchQuery.trim()) {
                    const query = searchQuery.toLowerCase();
                    filtered = videos.filter(video => 
                        video.name.toLowerCase().includes(query) ||
                        video.filename.toLowerCase().includes(query) ||
                        (video.meta && Object.values(video.meta).some(value => 
                            value.toString().toLowerCase().includes(query)
                        ))
                    );
                }
                
                // Apply category filters
                const activeFilters = Object.keys(filters).filter(k => filters[k]);
                if (activeFilters.length > 0) {
                    filtered = filtered.filter(video => {
                        return activeFilters.every(filterKey => {
                            const filterValue = filters[filterKey];
                            if (!filterValue) return true;
                            
                            // Handle different filter types
                            if (filterKey === 'Category') {
                                const pathParts = video.path.split('/');
                                return pathParts[0] === filterValue || 
                                       (video.meta && video.meta.Category === filterValue);
                            }
                            
                            if (filterKey === 'Body Part') {
                                const pathParts = video.path.split('/');
                                return pathParts[1] === filterValue || 
                                       (video.meta && video.meta['Body part'] === filterValue);
                            }
                            
                            if (filterKey === 'Level') {
                                return video.meta && video.meta.Level === filterValue;
                            }
                            
                            if (filterKey === 'File Size') {
                                const sizeMB = video.size / (1024 * 1024);
                                if (filterValue === 'Small (< 10MB)') return sizeMB < 10;
                                if (filterValue === 'Medium (10-50MB)') return sizeMB >= 10 && sizeMB <= 50;
                                if (filterValue === 'Large (> 50MB)') return sizeMB > 50;
                            }
                            
                            // Default meta matching
                            const meta = video.meta || {};
                            const have = (meta[filterKey] || '').toString();
                            return have === filterValue;
                        });
                    });
                }
                
                return filtered;
            } catch (error) {
                console.error('Error filtering videos:', error);
                return [];
            }
        }
    },
    watch: {
        initialWorkout: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    this.form = {
                        ...this.form,
                        name: newVal.exercise_name || newVal.name || "",
                        category: newVal.category,
                        duration: newVal.duration,
                        level: newVal.level || "Beginner",
                        calories: newVal.calories_burned || newVal.calories,
                        description: newVal.description,
                        instructions: newVal.instructions,
                        equipment: newVal.equipment,
                        muscles_targeted: newVal.muscles_targeted || newVal.muscleGroups || "",
                        difficulty: newVal.difficulty || 1,
                        rest_period: newVal.rest_period || newVal.restPeriod,
                        tags: newVal.tags,
                        video_link: newVal.video_link || newVal.videoLink || "",
                        // Map new fields
                        visibleFor: newVal.visible_for,
                        primaryMuscleGroups: newVal.primary_muscle_groups || [],
                        secondaryMuscleGroups: newVal.secondary_muscle_groups || [],
                        primaryJoint: newVal.primary_joint,
                        type: newVal.type,
                        usesWeights: newVal.uses_weights || false,
                        intensity: newVal.intensity,
                        sets: newVal.sets || newVal.sets_configuration || [
                            { reps: 0, pause: 0 },
                            { reps: 0, pause: 0 },
                            { reps: 0, pause: 0 }
                        ],
                        restPeriod: newVal.rest_period_seconds,
                        qrLink: newVal.qr_link,
                        manufacturer: newVal.manufacturer,
                    };
                    // Handle thumbnail path correctly - if it's already a full path, use it; otherwise add leading slash
                    if (newVal.thumbnail) {
                        this.thumbnailUrl = newVal.thumbnail.startsWith('/') ? newVal.thumbnail : '/' + newVal.thumbnail;
                    } else {
                        this.thumbnailUrl = '';
                    }
                    this.videoUrl = newVal.video || null;
                } else {
                    this.resetForm();
                    this.thumbnailUrl = '';
                }
            },
        },
        visible(val) {
            if (!val) {
                this.resetForm();
            } else {
                // Ensure videos load when modal becomes visible
                if (!this.loadingVideos && (!this.availableVideos || !Array.isArray(this.availableVideos) || this.availableVideos.length === 0)) {
                    this.loadAvailableVideos();
                }
            }
        },
    },
    methods: {
        // Step navigation methods
        nextStep() {
            if (this.currentStep < this.steps.length - 1) {
                this.currentStep++;
            }
        },
        
        previousStep() {
            if (this.currentStep > 0) {
                this.currentStep--;
            }
        },
        
        goToStep(stepIndex) {
            if (stepIndex >= 0 && stepIndex < this.steps.length) {
                this.currentStep = stepIndex;
            }
        },
        applyVideoFilters() {
            // Trigger recompute; v-model already updates selectedVideoFilters
        },
        
        clearVideoFilters() {
            this.selectedVideoFilters = {};
            this.videoSearchQuery = '';
        },
        
        updateDifficultyLabel() {
            // This method is called by the difficulty slider input event
            // The computed property difficultyLabel will automatically update
        },
        
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
                this.thumbnailUrl = URL.createObjectURL(file);
            }
        },
        removeThumbnail() {
            this.thumbnailUrl = null;
            if (this.$refs.thumbnailInput) {
                this.$refs.thumbnailInput.value = null;
            }
        },
        
        // Video selection methods
        async loadAvailableVideos() {
            try {
                this.loadingVideos = true;
                console.log('Loading available videos...');
                const response = await axios.get('workout_exercises/available-videos');
                console.log('API response:', response.data);
                
                if (response.data.success) {
                    this.availableVideos = response.data.videos || [];
                    this.availableVideoFilters = response.data.filters || {};
                    console.log('Loaded videos:', this.availableVideos);
                    console.log('Loaded filters:', this.availableVideoFilters);
                } else {
                    console.log('API returned success: false');
                    this.availableVideos = [];
                    this.availableVideoFilters = {};
                }
            } catch (error) {
                console.error('Error loading videos:', error);
                this.$bvToast.toast('Failed to load videos', {
                    title: 'Error',
                    variant: 'danger',
                    solid: true,
                });
                this.availableVideos = [];
                this.availableVideoFilters = {};
            } finally {
                this.loadingVideos = false;
            }
        },
        
        // Debug method to force computed property evaluation
        debugFilteredVideos() {
            console.log('Manually calling filteredAvailableVideos...');
            const result = this.filteredAvailableVideos;
            console.log('Manual call result:', result);
            return result;
        },
        
        async selectVideo(video) {
            this.selectedVideo = video;
            this.form.video_link = video.url;
            this.videoSelectionMode = 'uploaded';
            
            // If thumbnail exists, use it; otherwise generate one from video
            if (video.thumbnail_url) {
                this.thumbnailUrl = video.thumbnail_url;
            } else {
                // Generate a thumbnail from the first frame and populate the thumbnail field
                try {
                    const { url } = video;
                    const dataUrl = await this.generateVideoThumbnail(url);
                    if (dataUrl) {
                        this.thumbnailUrl = dataUrl;
                        // Convert dataURL to Blob for upload on submit
                        this.generatedThumbnailBlob = this.dataURLtoBlob(dataUrl);
                    }
                } catch (e) {
                    // Ignore thumbnail generation failures
                }
            }
        },
        
        playVideo(video) {
            // Open video in a modal for playback
            this.selectedVideoForPlayback = video;
            this.showVideoPlayer = true;
        },
        
        closeVideoPlayer() {
            this.showVideoPlayer = false;
            this.selectedVideoForPlayback = null;
        },
        
        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },
        
        onVideoLoaded(event) {
            // Video metadata loaded successfully
        },
        
        async generateVideoThumbnail(srcUrl) {
            return new Promise((resolve) => {
                const video = document.createElement('video');
                video.src = srcUrl;
                video.crossOrigin = 'anonymous';
                video.muted = true;
                const onCapture = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
                    cleanup();
                    resolve(dataUrl);
                };
                const onLoaded = () => {
                    // seek a bit forward to ensure frame is available
                    try {
                        video.currentTime = Math.min(0.1, (video.duration || 1) * 0.01);
                    } catch (e) {
                        // fallback to capture immediately
                        onCapture();
                    }
                };
                const onSeeked = () => onCapture();
                const onError = () => { cleanup(); resolve(null); };
                const cleanup = () => {
                    video.removeEventListener('loadeddata', onLoaded);
                    video.removeEventListener('seeked', onSeeked);
                    video.removeEventListener('error', onError);
                };
                video.addEventListener('loadeddata', onLoaded, { once: true });
                video.addEventListener('seeked', onSeeked, { once: true });
                video.addEventListener('error', onError, { once: true });
            });
        },
        dataURLtoBlob(dataUrl) {
            const arr = dataUrl.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        },
        async handleSubmit() {
            try {
                this.loading = true;
                
                // Create FormData for file upload
                const formData = new FormData();
                
                // Add text fields
                formData.append('exercise_name', this.form.name);
                formData.append('category', this.form.category);
                formData.append('duration', this.form.duration);
                formData.append('level', this.form.level);
                formData.append('description', this.form.description);
                formData.append('equipment', this.form.equipment || '');
                formData.append('muscles_targeted', this.form.muscles_targeted || '');
                formData.append('video_link', this.form.video_link || '');
                formData.append('calories_burned', this.form.calories || 0);
                formData.append('instructions', this.form.instructions || '');
                formData.append('difficulty', this.form.difficulty || 1);
                formData.append('rest_period', this.form.rest_period || 30);
                formData.append('tags', this.form.tags || '');
                formData.append('visible_for', this.form.visibleFor || 'all');
                // Handle arrays properly for FormData
                if (this.form.primaryMuscleGroups && this.form.primaryMuscleGroups.length > 0) {
                    this.form.primaryMuscleGroups.forEach((muscle, index) => {
                        formData.append(`primary_muscle_groups[${index}]`, muscle);
                    });
                }
                if (this.form.secondaryMuscleGroups && this.form.secondaryMuscleGroups.length > 0) {
                    this.form.secondaryMuscleGroups.forEach((muscle, index) => {
                        formData.append(`secondary_muscle_groups[${index}]`, muscle);
                    });
                }
                formData.append('primary_joint', this.form.primaryJoint || '');
                formData.append('type', this.form.type || '');
                formData.append('uses_weights', this.form.usesWeights || false);
                formData.append('intensity', this.form.intensity || 5);
                formData.append('sets', JSON.stringify(this.form.sets || []));
                formData.append('rest_period_seconds', this.form.restPeriod || 30);
                formData.append('qr_link', this.form.qrLink || '');
                formData.append('manufacturer', this.form.manufacturer || '');
                
                // Handle thumbnail - either new file, generated from selected video, or existing path
                if (this.$refs.thumbnailInput && this.$refs.thumbnailInput.files[0]) {
                    // New file selected
                    formData.append('thumbnail', this.$refs.thumbnailInput.files[0]);
                } else if (this.generatedThumbnailBlob) {
                    formData.append('thumbnail', this.generatedThumbnailBlob, (this.selectedVideo?.name || 'video') + '.jpg');
                } else if (this.thumbnailUrl && !this.thumbnailUrl.startsWith('blob:')) {
                    // Existing thumbnail - send the path (remove leading slash if present)
                    const thumbnailPath = this.thumbnailUrl.startsWith('/') ? this.thumbnailUrl.substring(1) : this.thumbnailUrl;
                    formData.append('thumbnail_path', thumbnailPath);
                }

                // Determine if this is a create or update operation
                const isUpdate = this.initialWorkout && this.initialWorkout.exercise_id;
                const url = isUpdate ? `workout_exercises/${this.initialWorkout.exercise_id}` : 'workout_exercises';
                
                let response;
                if (isUpdate) {
                    // For updates, use POST with _method=PUT (Laravel convention)
                    formData.append('_method', 'PUT');
                    response = await axios.post(url, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                } else {
                    // For creates, use regular POST
                    response = await axios.post(url, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                }
                
                if (response.data.success) {
                    // Show success message
                    const message = isUpdate ? 'Workout updated successfully!' : 'Workout created successfully!';
                    this.$swal({
                        icon: 'success',
                        title: 'Success!',
                        text: message,
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    
                    // Emit the created workout data
                    this.$emit("submit", response.data);
                    
                    // Close modal
                    this.$emit("close");
                    
                    // Reset form
                    this.resetForm();
                }
            } catch (error) {
                console.error('Error creating workout:', error);
                
                // Show error message
                const isUpdate = this.initialWorkout && this.initialWorkout.exercise_id;
                const errorMessage = isUpdate ? 'Failed to update workout. Please try again.' : 'Failed to create workout. Please try again.';
                this.$swal({
                    icon: 'error',
                    title: 'Error!',
                    text: error.response?.data?.message || errorMessage,
                });
            } finally {
                this.loading = false;
            }
        },
        
        addWorkout(newWorkout) {
            this.$emit("add-workout", newWorkout);
        },

        resetForm() {
            this.form = {
                name: "",
                category: null,
                duration: null,
                level: "Beginner",
                calories: null,
                description: "",
                instructions: "",
                equipment: "",
                muscles_targeted: "",
                difficulty: 1,
                rest_period: null,
                tags: "",
                video_link: "",
                visibleFor: null,
                primaryMuscleGroups: [],
                secondaryMuscleGroups: [],
                primaryJoint: null,
                type: null,
                usesWeights: false,
                intensity: null,
                sets: [
                    { reps: 0, pause: 0 },
                    { reps: 0, pause: 0 },
                    { reps: 0, pause: 0 }
                ],
                restPeriod: null,
                qrLink: "",
                manufacturer: null,
            };
            this.thumbnailUrl = '';
            this.videoUrl = null;
            this.currentStep = 0;
            this.videoSelectionMode = 'uploaded';
            this.selectedVideo = null;
            this.availableVideoFilters = {};
            this.selectedVideoFilters = {};
            this.generatedThumbnailBlob = null;
            this.showVideoPlayer = false;
            this.selectedVideoForPlayback = null;
            this.videoSearchQuery = '';
            if (this.$refs.thumbnailInput)
                this.$refs.thumbnailInput.value = null;
            if (this.$refs.videoInput) this.$refs.videoInput.value = null;
        },
    },
    mounted() {
        // Load available videos when component is mounted
        this.loadAvailableVideos();
        
        // Debug: Force computed property evaluation after a delay
        setTimeout(() => {
            console.log('=== DEBUG: Forcing computed property evaluation ===');
            this.debugFilteredVideos();
        }, 2000);
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
// Activity Modal Styles
// ===================================

.activity-modal {
    .modal-content {
        border: none;
        border-radius: 16px;
        box-shadow: $shadow-lg;
        background: $color-white;
        overflow: hidden;
        color: $color-text-dark !important;
    }

    .modal-header {
        background: $color-background;
        color: $color-text-dark;
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

// Progress Indicator
.progress-indicator {
    margin-bottom: 2rem;
    padding: 1rem;
    background: $color-white;
    border-radius: 12px;
    box-shadow: $shadow-sm;

    .progress-steps {
        display: flex;
    align-items: center;
    position: relative;
    gap: 100px;
    justify-content: center;

        &::before {
            content: '';
            position: absolute;
            top: 20px;
            left: 0;
            right: 0;
            height: 2px;
            background: $color-border-muted;
            z-index: 1;
        }

        .step {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s ease;

            .step-number {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: $color-background;
                border: 2px solid $color-border-muted;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                color: $color-muted;
                margin-bottom: 0.5rem;
                transition: all 0.3s ease;
            }

            .step-label {
                font-size: $font-size-xs;
                color: $color-muted;
                text-align: center;
                font-weight: 500;
                transition: color 0.3s ease;
            }

            &.active {
                .step-number {
                    background: $color-button;
                    border-color: $color-button;
                    color: $color-white;
                }

                .step-label {
                    color: $color-button;
                    font-weight: 600;
                }
            }

            &.completed {
                .step-number {
                    background: $color-success;
                    border-color: $color-success;
                    color: $color-white;
                }

                .step-label {
                    color: $color-success;
                }
            }

            &:hover {
                transform: translateY(-2px);
            }
        }
    }
}

// Step Navigation
.step-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: $color-white;
    border-radius: 8px;
    box-shadow: $shadow-sm;

    .step-counter {
        font-weight: 600;
        color: $color-heading;
        font-size: $font-size-sm;
    }

    .btn {
        padding: 0.5rem 1rem;
        font-size: $font-size-sm;
        font-weight: 500;
        border-radius: 6px;
        transition: all 0.3s ease;

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
}

// Step Content
.step-content {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.activity-form {
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

    .subsection-title {
        font-family: $font-family-heading;
        font-size: $font-size-md;
        font-weight: 600;
        color: $color-heading;
        margin: 1.5rem 0 1rem 0;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid $color-border-muted;
    }

    .section-divider {
        border: none;
        height: 1px;
        background: $color-border-muted;
        margin: 2rem 0;
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
        }

        .required-asterisk {
            color: $color-danger;
            font-weight: 700;
            margin-left: 2px;
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
    }

    .form-textarea-modern {
        resize: vertical;
        min-height: 70px;
    }

    .upload-hint {
        background: $color-info-light;
        border: 1px solid $color-info;
        border-radius: 6px;
        padding: 0.75rem;
        margin-bottom: 0.75rem;
        font-size: $font-size-sm;
        color: color.adjust($color-info, $lightness: -10%);

        i {
            margin-right: 0.5rem;
            color: $color-info;
        }
    }

    .difficulty-slider {
        .form-range {
            width: 100%;
            height: 6px;
            border-radius: 3px;
            background: $color-border-muted;
            outline: none;
            -webkit-appearance: none;
            appearance: none;

            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: $color-button;
                cursor: pointer;
                box-shadow: $shadow-sm;
            }

            &::-moz-range-thumb {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: $color-button;
                cursor: pointer;
                border: none;
                box-shadow: $shadow-sm;
            }
        }

        .difficulty-label {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0.5rem;

            .difficulty-value {
                font-weight: 600;
                color: $color-button;
            }

            .difficulty-number {
                color: $color-muted;
                font-size: $font-size-sm;
            }
        }
    }

    .completion-summary {
        background: $color-success-light;
        border: 1px solid $color-success;
        border-radius: 8px;
        padding: 1rem;
        margin-top: 1rem;
        text-align: center;

        h5 {
            color: $color-success;
            margin-bottom: 0.5rem;
            font-weight: 600;

            i {
                margin-right: 0.5rem;
            }
        }

        p {
            color: color.adjust($color-success, $lightness: -10%);
            margin: 0;
            font-size: $font-size-sm;
        }
    }

    .form-checkbox-modern {
        .custom-control-label {
            font-size: $font-size-sm;
            color: $color-text-dark;
            cursor: pointer;
        }

        .custom-control-input:checked ~ .custom-control-label::before {
            background-color: $color-button;
            border-color: $color-button;
        }
    }

    .sets-configuration {
        margin-top: 1.5rem;
        padding: 1rem;
        background: $color-background;
        border-radius: 8px;
        border: 1px solid $color-border-muted;

        .sets-title {
            font-size: $font-size-md;
            font-weight: 600;
            color: $color-heading;
            margin-bottom: 1rem;
        }

        .sets-table {
            .sets-header {
                display: grid;
                grid-template-columns: 60px 1fr 1fr;
                gap: 1rem;
                padding: 0.5rem 0;
                border-bottom: 2px solid $color-divider;
                font-weight: 600;
                color: $color-heading;
                font-size: $font-size-sm;
            }

            .set-row {
                display: grid;
                grid-template-columns: 60px 1fr 1fr;
                gap: 1rem;
                padding: 0.75rem 0;
                border-bottom: 1px solid $color-border-muted;
                align-items: center;

                &:last-child {
                    border-bottom: none;
                }

                .set-number {
                    font-weight: 600;
                    color: $color-button;
                    text-align: center;
                }

                .reps-column,
                .pause-column {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;

                    .set-input {
                        flex: 1;
                        max-width: 80px;
                    }

                    .unit {
                        font-size: $font-size-sm;
                        color: $color-muted;
                        font-weight: 500;
                    }
                }
            }
        }
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
        height: 370px;
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
        object-fit: cover;
        height: 100%;
        width: 100%;
        border-radius: 12px;
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

    // Video Selection Styles
    .video-tabs {
        margin-bottom: 1rem;
        border-bottom: 2px solid $color-border-muted;

        .nav-link {
            border: none;
            border-radius: 8px 8px 0 0;
            color: $color-muted;
            font-weight: 500;
            padding: 0.75rem 1rem;
            transition: all 0.3s ease;

            &:hover {
                color: $color-button;
                background: rgba($color-button, 0.05);
            }

            &.active {
                color: $color-button;
                background: rgba($color-button, 0.1);
                border-bottom: 2px solid $color-button;
            }

            i {
                margin-right: 0.5rem;
            }
        }
    }

    .video-selection-content {
        min-height: 200px;
        padding: 1rem;
        background: $color-background;
        border-radius: 8px;
        border: 1px solid $color-border-muted;
    }

    .video-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 1rem;
        max-height: 300px;
        overflow-y: auto;
        padding: 0.5rem;

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

    .video-item {
        position: relative;
        background: $color-white;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid transparent;

        &:hover {
            transform: translateY(-2px);
            box-shadow: $shadow-md;
            border-color: rgba($color-button, 0.3);
        }

        &.selected {
            border-color: $color-button;
            box-shadow: 0 0 0 3px rgba($color-button, 0.1);
        }

        .video-preview {
            position: relative;
            height: 100px;
            margin: 0;
            cursor: pointer;

            .thumbnail-container {
                position: relative;
                height: 100%;
                width: 100%;
            }

            .video-thumbnail {
                width: 100%;
                height: 100%;
                object-fit: cover;
                background: $color-background;
                border-radius: 8px;
            }

            .no-thumbnail {
                width: 100%;
                height: 100%;
                background: $color-background;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: $color-muted;
                border-radius: 8px;
                position: relative;

                i {
                    font-size: 1.5rem;
                    margin-bottom: 0.25rem;
                }

                span {
                    font-size: $font-size-xs;
                }
            }

            .play-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
                border-radius: 8px;

                i {
                    color: $color-white;
                    font-size: 1.5rem;
                    background: rgba(0, 0, 0, 0.7);
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.3s ease;
                }
            }

            &:hover .play-overlay {
                opacity: 1;

                i {
                    transform: scale(1.1);
                }
            }
        }

        .video-info {
            padding: 0.5rem;

            .video-name {
                font-size: $font-size-sm;
                font-weight: 600;
                color: $color-text-dark;
                margin: 0 0 0.25rem 0;
                line-height: 1.2;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .video-size {
                color: $color-muted;
                font-size: $font-size-xs;
            }
        }

        .selected-indicator {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: $color-button;
            color: $color-white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            box-shadow: $shadow-sm;
        }
    }

    .form-actions {
        background: $color-white;
        border-radius: 12px;
        padding: 1.5rem;
        margin-top: 2rem;
        box-shadow: $shadow-sm;
        border: 1px solid $color-border-muted;

        .action-buttons {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .primary-actions {
                display: flex;
                gap: 1rem;
            }

            .btn {
                padding: 0.75rem 1.5rem;
                font-size: $font-size-base;
                font-weight: 600;
                border-radius: 8px;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: $shadow-md;
                }

                &:active {
                    transform: translateY(0);
                }

                &.btn-outline-secondary {
                    border: 2px solid $color-border;
                    color: $color-muted;

                    &:hover {
                        border-color: $color-button;
                        color: $color-white;
                    }
                }

                &.btn-primary {
                    background: $gradient-primary;
                    border: none;
                    color: $color-white;
                }

                &.btn-success {
                    background: $gradient-primary;
                    border: none;
                    color: $color-white;
                }
            }
        }
    }
}

// Responsive
@media (max-width: $breakpoint-md) {
    .progress-indicator {
        .progress-steps {
            flex-wrap: wrap;
            gap: 1rem;

            .step {
                flex: 1;
                min-width: 80px;

                .step-label {
                    font-size: 0.7rem;
                }
            }
        }
    }

    .step-navigation {
        flex-direction: column;
        gap: 1rem;

        .btn {
            width: 100%;
        }
    }

    .activity-form {
        .form-section {
            padding: 1rem;
            margin-bottom: 1rem;
        }

        .form-actions {
            padding: 1rem;

            .action-buttons {
                flex-direction: column;
                gap: 1rem;

                .primary-actions {
                    width: 100%;

                    .btn {
                        flex: 1;
                    }
                }
            }
        }

        .sets-configuration {
            .sets-table {
                .sets-header,
                .set-row {
                    grid-template-columns: 50px 1fr 1fr;
                    gap: 0.5rem;
                }

                .reps-column,
                .pause-column {
                    .set-input {
                        max-width: 60px;
                    }
                }
            }
        }
    }

    .activity-modal .modal-body {
        padding: 1rem;
    }
}
</style>