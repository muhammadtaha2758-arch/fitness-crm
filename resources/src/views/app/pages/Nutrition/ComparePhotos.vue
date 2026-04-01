<template>
    <div class="compare-photos-page">
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
                            <li class="breadcrumb-item">
                                <router-link to="/app/Nutrition">
                                    <i class="fas fa-utensils"></i>
                                    Nutrition
                                </router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                <i class="fas fa-images"></i>
                                Compare Photos
                            </li>
                        </ol>
                    </div>
                </nav>
            </div>
        </div>

        <!-- Photo Comparison Section -->
        <div class="photo-comparison-container">
            <div class="row">
                <!-- Left Photo Area -->
                <div class="col-md-6 mb-4">
                    <div class="photo-area">
                        <div v-if="leftSelected" class="selected-meta-top text-muted small mb-1 text-center">
                            {{ formatDate(leftSelected.uploaded_at || leftSelected.created_at) }}
                        </div>
                        <div class="photo-frame" @click="openPhotoPanel('left')">
                            <div v-if="!leftPhoto" class="empty-photo">
                                <i class="fas fa-camera fa-3x text-muted"></i>
                                <p class="text-muted mt-3">No photo selected</p>
                            </div>
                            <div v-else class="selected-photo">
                                <img :src="leftPhoto" alt="Left Photo" class="img-fluid">
                            </div>
                        </div>
                        <button class="btn btn-outline-primary choose-photo-btn" @click="openPhotoPanel('left')">
                            CHOOSE PHOTO
                        </button>
                    </div>
                </div>

                <!-- Right Photo Area -->
                <div class="col-md-6 mb-4">
                    <div class="photo-area">
                        <div v-if="rightSelected" class="selected-meta-top text-muted small mb-1 text-center">
                            {{ formatDate(rightSelected.uploaded_at || rightSelected.created_at) }}
                        </div>
                        <div class="photo-frame" @click="openPhotoPanel('right')">
                            <div v-if="!rightPhoto" class="empty-photo">
                                <i class="fas fa-camera fa-3x text-muted"></i>
                                <p class="text-muted mt-3">No photo selected</p>
                            </div>
                            <div v-else class="selected-photo">
                                <img :src="rightPhoto" alt="Right Photo" class="img-fluid">
                            </div>
                        </div>
                        <button class="btn btn-outline-primary choose-photo-btn" @click="openPhotoPanel('right')">
                            CHOOSE PHOTO
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right-side Photos Panel -->
        <div v-if="showPhotosPanel" class="photos-panel-overlay" @click.self="closePhotoPanel">
            <div class="photos-panel">
                <div class="d-flex align-items-center justify-content-between border-bottom px-3 py-2">
                    <h6 class="mb-0 font-weight-bold">Select Photo</h6>
                    <button class="btn btn-sm btn-outline-secondary" @click="closePhotoPanel">
                        Close
                    </button>
                </div>
               
                <div class="panel-body p-3">
                    <div v-if="isLoadingPhotos" class="text-center text-muted py-5">
                        <i class="fas fa-spinner fa-spin mr-2"></i> Loading photos...
                    </div>
                    <div v-else>
                        <div v-if="groupedPanelPhotosKeys.length === 0" class="text-center text-muted py-5">
                            <i class="far fa-images fa-2x mb-2"></i>
                            <div>No photos found.</div>
                        </div>
                        <div v-else>
                            <div v-for="dateKey in groupedPanelPhotosKeys" :key="dateKey" class="mb-3">
                                <div class="d-flex align-items-center justify-content-between mb-2">
                                    <span class="font-weight-bold">{{ dateKey }}</span>
                                    <small class="text-muted">{{ groupedPanelPhotos[dateKey].length }} image(s)</small>
                                </div>
                                <div class="row">
                                    <div class="col-6 mb-3" v-for="photo in groupedPanelPhotos[dateKey]" :key="photo.id" @click="handlePanelPhotoClick(photo)">
                                        <div class="card h-100 shadow-sm border-0 selectable">
                                            <img :src="photo.url" :alt="photo.image_name" class="card-img-top panel-thumb">
                                            <div class="card-body p-2">
                                                <small class="text-truncate d-block" :title="photo.image_name">{{ photo.image_name }}</small>
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

        <!-- Fitness Report Section -->
        <!-- <div class="fitness-report-section" v-if="!loadingAssessment"> -->
            <!-- <div class="report-container"> -->
                <!-- Loading State -->
                <!-- <div v-if="loadingAssessment" class="text-center py-5">
                    <i class="fas fa-spinner fa-spin fa-2x text-primary mb-3"></i>
                    <p class="text-muted">Loading assessment data...</p>
                </div> -->

                <!-- Error State -->
                <!-- <div v-else-if="assessmentError" class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle mr-2"></i>
                    {{ assessmentError }}
                    <button class="btn btn-sm btn-outline-danger ml-2" @click="fetchAssessmentData">Retry</button>
                </div> -->

                <!-- No Data State -->
                <!-- <div v-else-if="!assessmentData" class="text-center py-5">
                    <i class="fas fa-clipboard-list fa-3x text-muted mb-3"></i>
                    <p class="text-muted">No assessment data found for the selected date.</p>
                    <p class="text-muted small">Select a date from the photos above or choose a different date.</p>
                </div> -->

                <!-- Assessment Data -->
                <!-- <div v-else> -->
                    <!-- Date Header -->
                    <!-- <div class="date-header">
                        <h4 class="date-title">
                            <i class="fas fa-calendar-alt mr-2"></i>
                            {{ formatDateDisplay(selectedDate) }}
                        </h4>
                    </div> -->

                    <!-- Daily Metrics -->
                    <!-- <div class="daily-metrics">
                        <div class="metric-item">
                            <label><i class="fas fa-weight mr-2"></i>Morning Weight:</label>
                            <span class="metric-value">{{ formatValue(assessmentData.weight, 'lbs') }}</span>
                        </div>
                        <div class="metric-item">
                            <label><i class="fas fa-percentage mr-2"></i>Body Fat %:</label>
                            <span class="metric-value">{{ formatValue(assessmentData.bodyFat, '%') }}</span>
                        </div>
                        <div class="metric-item">
                            <label><i class="fas fa-tint mr-2"></i>Water Intake (oz):</label>
                            <span class="metric-value">{{ formatValue(assessmentData.waterIntake) }}</span>
                        </div>
                        <div class="metric-item">
                            <label><i class="fas fa-hamburger mr-2"></i>Hunger:</label>
                            <span class="metric-value">{{ formatValue(assessmentData.hunger, '/10') }}</span>
                        </div>
                        <div class="metric-item">
                            <label><i class="fas fa-dumbbell mr-2"></i>Strength:</label>
                            <span class="metric-value">{{ formatValue(assessmentData.strength, '/10') }}</span>
                        </div>
                        <div class="metric-item">
                            <label><i class="fas fa-bolt mr-2"></i>Energy:</label>
                            <span class="metric-value">{{ formatValue(assessmentData.energy, '/10') }}</span>
                        </div>
                    </div> -->

                    <!-- Measurements Section -->
                    <!-- <div class="measurements-section">
                        <h3 class="section-title">
                            <i class="fas fa-ruler-combined mr-2"></i>
                            Measurements (In Inches)
                        </h3>
                        <div class="measurements-grid">
                            <div class="measurement-item">
                                <label>Center Chest:</label>
                                <span class="measurement-value">{{ formatValue(assessmentData.centerChest, 'in') }}</span>
                            </div>
                            <div class="measurement-item">
                                <label>Arms:</label>
                                <span class="measurement-value">{{ formatValue(assessmentData.arms, 'in') }}</span>
                            </div>
                            <div class="measurement-item">
                                <label>Waist:</label>
                                <span class="measurement-value">{{ formatValue(assessmentData.waist, 'in') }}</span>
                            </div>
                            <div class="measurement-item">
                                <label>Upper Thigh:</label>
                                <span class="measurement-value">{{ formatValue(assessmentData.upperThigh, 'in') }}</span>
                            </div>
                            <div class="measurement-item">
                                <label>Hips:</label>
                                <span class="measurement-value">{{ formatValue(assessmentData.hips, 'in') }}</span>
                            </div>
                        </div>
                    </div> -->

                    <!-- Self-Assessment Section -->
                    <!-- <div class="self-assessment-section">
                        <h3 class="section-title">
                            <i class="fas fa-clipboard-check mr-2"></i>
                            Self-Assessment
                        </h3>
                        <div class="assessment-items">
                            <div class="assessment-item">
                                <label><i class="fas fa-running mr-2"></i>Daily Activities:</label>
                                <p class="assessment-text">{{ assessmentData.activities || 'N/A' }}</p>
                            </div>
                            <div class="assessment-item">
                                <label><i class="fas fa-heartbeat mr-2"></i>Cardio:</label>
                                <p class="assessment-text">{{ assessmentData.cardio || 'N/A' }}</p>
                            </div>
                            <div class="assessment-item">
                                <label><i class="fas fa-smile mr-2"></i>How I Felt:</label>
                                <p class="assessment-text">{{ assessmentData.feel || 'N/A' }}</p>
                            </div>
                            <div class="assessment-item">
                                <label><i class="fas fa-exclamation-circle mr-2"></i>Deviations:</label>
                                <p class="assessment-text">{{ assessmentData.mealDeviations || 'N/A' }}</p>
                            </div>
                        </div>
                    </div> -->

                    <!-- Nutrition Info -->
                    <!-- <div class="nutrition-section" v-if="assessmentData.calories || assessmentData.protein || assessmentData.carb || assessmentData.fat">
                        <h3 class="section-title">
                            <i class="fas fa-utensils mr-2"></i>
                            Nutrition
                        </h3>
                        <div class="nutrition-grid">
                            <div class="nutrition-item">
                                <label>Calories:</label>
                                <span class="nutrition-value">{{ formatValue(assessmentData.calories, 'kcal') }}</span>
                            </div>
                            <div class="nutrition-item">
                                <label>Protein:</label>
                                <span class="nutrition-value">{{ formatValue(assessmentData.protein, 'g') }}</span>
                            </div>
                            <div class="nutrition-item">
                                <label>Carbs:</label>
                                <span class="nutrition-value">{{ formatValue(assessmentData.carb, 'g') }}</span>
                            </div>
                            <div class="nutrition-item">
                                <label>Fat:</label>
                                <span class="nutrition-value">{{ formatValue(assessmentData.fat, 'g') }}</span>
                            </div>
                        </div>
                    </div> -->

                    <!-- Notes Section -->
                    <!-- <div class="notes-section">
                        <h3 class="section-title">
                            <i class="fas fa-sticky-note mr-2"></i>
                            Notes
                        </h3>
                        <div class="notes-input-container">
                            <textarea 
                                v-model="notes"
                                class="notes-textarea" 
                                :placeholder="isEditingNotes ? 'Add comment to report [Client cannot view]' : 'Click Edit to add notes'"
                                :disabled="!isEditingNotes"
                                rows="4"
                            ></textarea>
                        </div>
                    </div> -->

                    <!-- Action Buttons -->
                    <!-- <div class="edit-button-container"> 
                        <button 
                            v-if="!isEditingNotes" 
                            class="btn btn-edit"
                            @click="startEditingNotes"
                        >
                            <i class="fas fa-edit"></i>
                            EDIT NOTES
                        </button>
                        <div v-else class="edit-actions">
                            <button 
                                class="btn btn-save"
                                @click="saveNotes"
                                :disabled="savingNotes"
                            >
                                <i class="fas fa-spinner fa-spin" v-if="savingNotes"></i>
                                <i class="fas fa-save" v-else></i>
                                {{ savingNotes ? 'SAVING...' : 'SAVE NOTES' }}
                            </button>
                            <button 
                                class="btn btn-cancel"
                                @click="cancelEditingNotes"
                                :disabled="savingNotes"
                            >
                                <i class="fas fa-times"></i>
                                CANCEL
                            </button>
                        </div>
                    </div> -->
                <!-- </div> -->
            <!-- </div> -->
        <!-- </div> -->
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'ComparePhotos',
    data() {
        return {
            leftPhoto: null,
            rightPhoto: null,
            currentSide: null,
            showPhotosPanel: false,
            isLoadingPhotos: false,
            availablePhotos: [],
            selectionCount: 0,
            leftSelected: null,
            rightSelected: null,
            // Assessment data
            memberId: null,
            selectedDate: null,
            assessmentData: null,
            loadingAssessment: false,
            assessmentError: null,
            notes: '',
            isEditingNotes: false,
            savingNotes: false,
            originalNotes: '',
        };
    },
    computed: {
        groupedPanelPhotos() {
            const groups = {};
            (this.availablePhotos || []).forEach((p) => {
                const ts = p.uploaded_at || p.created_at || null;
                const d = ts ? new Date(ts) : null;
                const key = d ? d.toISOString().slice(0, 10) : 'Unknown';
                if (!groups[key]) groups[key] = [];
                const withUrl = Object.assign({}, p, {
                    url: p.url || (p.image_path ? `${window.location.origin}/${p.image_path}` : (p.image_data ? `${window.location.origin}/${p.image_data}` : null)),
                });
                groups[key].push(withUrl);
            });
            // Sort by date desc
            const sorted = {};
            Object.keys(groups)
                .sort((a, b) => (a < b ? 1 : -1))
                .forEach((k) => (sorted[k] = groups[k]));
            return sorted;
        },
        groupedPanelPhotosKeys() {
            return Object.keys(this.groupedPanelPhotos || {});
        },
    },
    mounted() {
        this.initializeComponent();
    },
    watch: {
        '$route.query': {
            handler(newQuery) {
                this.initializeComponent();
            },
            deep: true
        },
        leftSelected: {
            handler(newPhoto) {
                if (newPhoto) {
                    this.updateDateFromPhoto(newPhoto, 'left');
                }
            }
        },
        rightSelected: {
            handler(newPhoto) {
                if (newPhoto) {
                    this.updateDateFromPhoto(newPhoto, 'right');
                }
            }
        }
    },
    methods: {
        initializeComponent() {
            // Get memberId and date from route query params
            const query = this.$route.query || {};
            this.memberId = query.memberId || null;
            this.selectedDate = query.date || null;
            
            // If date is provided, fetch assessment data
            if (this.selectedDate && this.memberId) {
                this.fetchAssessmentData();
            } else if (this.memberId) {
                // Try to get date from selected photos
                const photoDate = this.leftSelected || this.rightSelected;
                if (photoDate) {
                    const photoDateStr = this.getDateFromPhoto(photoDate);
                    if (photoDateStr) {
                        this.selectedDate = photoDateStr;
                        this.fetchAssessmentData();
                    }
                }
            }
        },
        updateDateFromPhoto(photo, side) {
            const photoDate = this.getDateFromPhoto(photo);
            if (photoDate && this.memberId) {
                this.selectedDate = photoDate;
                this.fetchAssessmentData();
                // Update route query without navigation
                this.$router.replace({
                    query: {
                        ...this.$route.query,
                        date: photoDate
                    }
                }).catch(() => {});
            }
        },
        getDateFromPhoto(photo) {
            if (!photo) return null;
            const ts = photo.uploaded_at || photo.created_at || null;
            if (!ts) return null;
            const d = new Date(ts);
            if (isNaN(d.getTime())) return null;
            return d.toISOString().slice(0, 10); // YYYY-MM-DD format
        },
        async fetchAssessmentData() {
            if (!this.memberId || !this.selectedDate) {
                this.assessmentData = null;
                return;
            }

            this.loadingAssessment = true;
            this.assessmentError = null;

            try {
                const response = await axios.get(`/assigned-meals-members/member/${this.memberId}/assessments`, {
                    params: {
                        date: this.selectedDate
                    }
                });

                if (response.data.success) {
                    const assessments = response.data.data || [];
                    // Find assessment for the specific date
                    const assessment = assessments.find(a => a.date === this.selectedDate) || assessments[0];
                    
                    if (assessment) {
                        this.assessmentData = {
                            id: assessment.id,
                            date: assessment.date,
                            weight: assessment.weight,
                            bodyFat: assessment.bodyFat,
                            waterIntake: assessment.waterIntake,
                            hunger: assessment.hunger,
                            strength: assessment.strength,
                            energy: assessment.energy,
                            centerChest: assessment.centerChest,
                            arms: assessment.arms,
                            waist: assessment.waist,
                            upperThigh: assessment.upperThigh,
                            hips: assessment.hips,
                            activities: assessment.activities,
                            cardio: assessment.cardio,
                            feel: assessment.feel,
                            mealDeviations: assessment.mealDeviations,
                            calories: assessment.calories,
                            protein: assessment.protein,
                            carb: assessment.carb,
                            fat: assessment.fat,
                            notes: assessment.notes
                        };
                        this.notes = assessment.notes || '';
                        this.originalNotes = this.notes;
                    } else {
                        this.assessmentData = null;
                    }
                } else {
                    this.assessmentError = response.data.message || 'Failed to fetch assessment data';
                    this.assessmentData = null;
                }
            } catch (error) {
                console.error('Error fetching assessment data:', error);
                this.assessmentError = error.response?.data?.message || error.message || 'Failed to fetch assessment data';
                this.assessmentData = null;
            } finally {
                this.loadingAssessment = false;
            }
        },
        formatValue(value, suffix = '') {
            if (value === null || value === undefined || value === '') {
                return 'N/A';
            }
            if (typeof value === 'number') {
                if (suffix === '%' || suffix === '/10') {
                    return value + suffix;
                }
                if (suffix === 'lbs' || suffix === 'in' || suffix === 'g' || suffix === 'kcal') {
                    return value + ' ' + suffix;
                }
                return value.toString();
            }
            return value.toString();
        },
        formatDateDisplay(dateString) {
            if (!dateString) return 'No date selected';
            const d = new Date(dateString);
            if (isNaN(d.getTime())) return dateString;
            return d.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },
        startEditingNotes() {
            this.isEditingNotes = true;
            this.originalNotes = this.notes;
        },
        cancelEditingNotes() {
            this.notes = this.originalNotes;
            this.isEditingNotes = false;
        },
        async saveNotes() {
            if (!this.assessmentData || !this.assessmentData.id) {
                alert('Cannot save notes: Assessment data is missing');
                return;
            }

            this.savingNotes = true;

            try {
                const response = await axios.put(`/assigned-meals-members/${this.assessmentData.id}`, {
                    notes: this.notes || null
                });

                if (response.data.success) {
                    this.originalNotes = this.notes;
                    this.isEditingNotes = false;
                    this.showSuccessMessage('Notes saved successfully!');
                } else {
                    throw new Error(response.data.message || 'Failed to save notes');
                }
            } catch (error) {
                console.error('Error saving notes:', error);
                const errorMessage = error.response?.data?.message || error.message || 'Failed to save notes';
                alert('Error saving notes: ' + errorMessage);
            } finally {
                this.savingNotes = false;
            }
        },
        showSuccessMessage(message) {
            const successDiv = document.createElement("div");
            successDiv.className = "success-message";
            successDiv.textContent = message;
            successDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #28a745;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                font-weight: 600;
                animation: slideInRight 0.3s ease;
            `;
            
            document.body.appendChild(successDiv);
            
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.parentNode.removeChild(successDiv);
                }
            }, 3000);
        },
        goBack() {
            this.$router.go(-1);
        },
        openPhotoPanel(side) {
            this.currentSide = side;
            this.showPhotosPanel = true;
            this.fetchAvailablePhotos();
        },
        closePhotoPanel() {
            this.showPhotosPanel = false;
        },
        async fetchAvailablePhotos() {
            this.isLoadingPhotos = true;
            try {
                const params = {};
                if (this.$route && this.$route.query && this.$route.query.memberId) {
                    params.memberId = this.$route.query.memberId;
                }
                const { data } = await axios.get('/comparison-photos', { params });
                if (data && data.success) {
                    const items = Array.isArray(data.data) ? data.data : [];
                    // Ensure each has a url property
                    this.availablePhotos = items.map((p) => ({
                        ...p,
                        url: p.url || (p.image_path ? `${window.location.origin}/${p.image_path}` : (p.image_data ? `${window.location.origin}/${p.image_data}` : null)),
                    }));
                } else {
                    this.availablePhotos = [];
                }
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error('Failed to fetch available photos', e);
                this.availablePhotos = [];
            } finally {
                this.isLoadingPhotos = false;
            }
        },
        handlePanelPhotoClick(photo) {
            if (this.currentSide === 'left') {
                this.leftPhoto = photo.url;
                this.leftSelected = photo;
            } else if (this.currentSide === 'right') {
                this.rightPhoto = photo.url;
                this.rightSelected = photo;
            }
            this.closePhotoPanel();
        },
        formatDate(value) {
            if (!value) return '';
            const d = new Date(value);
            if (isNaN(d.getTime())) return '';
            return d.toLocaleDateString();
        },
    }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/sass/_variables.scss";
.compare-photos-page {
    padding: 20px;
    min-height: 100vh;
}

.page-header {
    .page-title {
        color: #252525;
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0;
    }
}

.btn-outline-primary {
    color: #252525;
    border-color: #252525;
    background-color: transparent;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.btn-outline-primary:hover {
    color: #ffffff;
    background-color: #ff4040;
    border-color: #ff4040;
}

.btn-outline-primary:focus {
    box-shadow: 0 0 0 0.2rem rgba(255, 64, 64, 0.25);
}

.photo-comparison-container {
    max-width: 1200px;
    margin: 0 auto;
}

.photo-area {
    text-align: center;
}

.photo-frame {
    width: 100%;
    height: 400px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
}

.photo-frame:hover {
    border-color: #ff4040;
    box-shadow: 0 4px 12px rgba(255, 64, 64, 0.1);
}

.empty-photo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #6c757d;
}

.selected-photo {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.selected-photo img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 6px;
}

.choose-photo-btn {
    width: 200px;
    margin: 0 auto;
    display: block;
}

.selected-meta-top {
    line-height: 1;
}

@media (max-width: 768px) {
    .compare-photos-page {
        padding: 15px;
    }
    
    .page-title {
        font-size: 2rem;
    }
    
    .photo-frame {
        height: 300px;
    }
    
    .choose-photo-btn {
        width: 100%;
        max-width: 200px;
    }
}

@media (max-width: 576px) {
    .page-header .d-flex {
        flex-direction: column;
        align-items: flex-start !important;
    }
    
    .page-header .btn {
        margin-top: 15px;
        width: 100%;
    }
    
    .photo-frame {
        height: 250px;
    }
}

/* Fitness Report Section Styles */
.fitness-report-section {
    margin-top: 2rem;
    padding: 2rem;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.report-container {
    max-width: 900px;
    margin: 0 auto;
}

.date-header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #ff4040;
}

.date-title {
    color: #252525;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    display: flex;
    align-items: center;
}

.date-title i {
    color: #ff4040;
}

.daily-metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
}

.metric-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 8px;
    border-left: 4px solid #ff4040;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

.metric-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 64, 64, 0.15);
}

.metric-item label {
    font-weight: 600;
    color: #495057;
    margin: 0;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
}

.metric-item label i {
    color: #ff4040;
    margin-right: 0.5rem;
}

.metric-value {
    font-weight: 700;
    color: #252525;
    font-size: 1.1rem;
}

.section-title {
    color: #ff4040;
    font-size: 1.35rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #ff4040;
    display: flex;
    align-items: center;
}

.section-title i {
    margin-right: 0.5rem;
}

.measurements-section {
    margin-bottom: 2rem;
}

.measurements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
}

.measurement-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.875rem 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    transition: all 0.3s ease;
}

.measurement-item:hover {
    background: #ffffff;
    border-color: #ff4040;
    box-shadow: 0 2px 8px rgba(255, 64, 64, 0.1);
}

.measurement-item label {
    font-weight: 600;
    color: #495057;
    margin: 0;
    font-size: 0.9rem;
}

.measurement-value {
    font-weight: 600;
    color: #6c757d;
    font-size: 1rem;
}

.self-assessment-section {
    margin-bottom: 2rem;
}

.assessment-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.assessment-item {
    padding: 1.25rem;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 8px;
    border-left: 4px solid #ff4040;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
}

.assessment-item:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(255, 64, 64, 0.15);
}

.assessment-item label {
    font-weight: 700;
    color: #252525;
    margin-bottom: 0.5rem;
    display: block;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
}

.assessment-item label i {
    color: #ff4040;
    margin-right: 0.5rem;
}

.assessment-text {
    color: #495057;
    margin: 0;
    line-height: 1.6;
    font-size: 0.95rem;
}

.nutrition-section {
    margin-bottom: 2rem;
}

.nutrition-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
}

.nutrition-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.875rem 1rem;
    background: linear-gradient(135deg, #fff5f5 0%, #ffffff 100%);
    border-radius: 8px;
    border: 1px solid #ffe0e0;
    transition: all 0.3s ease;
}

.nutrition-item:hover {
    background: linear-gradient(135deg, #ffffff 0%, #fff5f5 100%);
    border-color: #ff4040;
    box-shadow: 0 2px 8px rgba(255, 64, 64, 0.15);
}

.nutrition-item label {
    font-weight: 600;
    color: #495057;
    margin: 0;
    font-size: 0.9rem;
}

.nutrition-value {
    font-weight: 700;
    color: #ff4040;
    font-size: 1rem;
}

.notes-section {
    margin-bottom: 2rem;
}

.notes-input-container {
    position: relative;
}

.notes-textarea {
    width: 100%;
    padding: 1rem;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 0.95rem;
    line-height: 1.6;
    resize: vertical;
    min-height: 120px;
    transition: all 0.3s ease;
    font-family: inherit;
    background: #ffffff;
}

.notes-textarea:focus {
    outline: none;
    border-color: #ff4040;
    box-shadow: 0 0 0 3px rgba(255, 64, 64, 0.1);
}

.notes-textarea:disabled {
    background: #f8f9fa;
    cursor: not-allowed;
    opacity: 0.7;
}

.notes-textarea::placeholder {
    color: #adb5bd;
    font-style: italic;
}

.edit-button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
    gap: 1rem;
}

.edit-actions {
    display: flex;
    gap: 0.75rem;
}

.btn-edit {
    background: linear-gradient(135deg, #ff4040 0%, #e63939 100%);
    color: #ffffff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 2px 8px rgba(255, 64, 64, 0.3);
}

.btn-edit:hover {
    background: linear-gradient(135deg, #e63939 0%, #cc2e2e 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 64, 64, 0.4);
}

.btn-edit:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 64, 64, 0.3);
}

.btn-edit:active {
    transform: translateY(0);
}

.btn-save {
    background: linear-gradient(135deg, #28a745 0%, #218838 100%);
    color: #ffffff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
}

.btn-save:hover:not(:disabled) {
    background: linear-gradient(135deg, #218838 0%, #1e7e34 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
}

.btn-save:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-cancel {
    background: #6c757d;
    color: #ffffff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-cancel:hover:not(:disabled) {
    background: #5a6268;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
}

.btn-cancel:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-edit i,
.btn-save i,
.btn-cancel i {
    font-size: 1rem;
}

/* Right-side photos panel */
.photos-panel-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0.25);
    z-index: 1050;
}

.photos-panel {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 380px;
    background: #fff;
    box-shadow: -4px 0 16px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
}

.panel-body {
    overflow-y: auto;
}

.panel-thumb {
    height: 140px;
    object-fit: cover;
}

.selectable {
    cursor: pointer;
    transition: transform .1s ease-in-out;
}

.selectable:hover {
    transform: translateY(-2px);
}

/* Responsive Design for Fitness Report */
@media (max-width: 992px) {
    .fitness-report-section {
        margin-top: 1.5rem;
        padding: 1.5rem;
    }
    
    .daily-metrics {
        grid-template-columns: 1fr;
        gap: 0.875rem;
    }
    
    .measurements-grid,
    .nutrition-grid {
        grid-template-columns: 1fr;
    }
    
    .section-title {
        font-size: 1.2rem;
    }
    
    .date-title {
        font-size: 1.25rem;
    }
}

@media (max-width: 768px) {
    .fitness-report-section {
        padding: 1rem;
        margin-top: 1rem;
    }
    
    .date-header {
        margin-bottom: 1.5rem;
    }
    
    .date-title {
        font-size: 1.1rem;
    }
    
    .metric-item,
    .measurement-item,
    .assessment-item,
    .nutrition-item {
        padding: 0.75rem;
    }
    
    .edit-button-container {
        flex-direction: column;
    }
    
    .edit-actions {
        width: 100%;
        flex-direction: column;
    }
    
    .btn-edit,
    .btn-save,
    .btn-cancel {
        width: 100%;
        justify-content: center;
    }
}

@media (max-width: 576px) {
    .fitness-report-section {
        padding: 0.75rem;
    }
    
    .section-title {
        font-size: 1.1rem;
    }
    
    .metric-item label,
    .measurement-item label,
    .nutrition-item label {
        font-size: 0.85rem;
    }
    
    .metric-value {
        font-size: 1rem;
    }
}
</style>