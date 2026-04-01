<template>
    <div class="self-assessments-page">
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
                                <router-link to="/app/nutrition">
                                    <i class="fas fa-apple-alt"></i>
                                    Nutrition Hub
                                </router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                <i class="fas fa-chart-pie"></i>
                                Self-Assessments
                            </li>
                        </ol>
                    </div>
                </nav>
            </div>
        </div>

        <!-- Header Section -->
        <div class="page-header mb-4">
            <div class="d-flex justify-content-between align-items-center">
                <h1 class="page-title">{{ memberName }} - Self-Assessments</h1>
                <div class="action-buttons">
                    <button class="btn btn-teal mr-2" @click="navigateToComparePhotos">
                        <i class="fas fa-images mr-1"></i>
                        Compare Photos
                    </button>
                    <button class="btn btn-teal mr-2" @click="exportCurrentView">
                        <i class="fas fa-download mr-1"></i>
                        Export Current View
                    </button>
                    <button class="btn btn-teal" @click="exportAllColumns">
                        <i class="fas fa-table mr-1"></i>
                        Export All Columns
                    </button>
                </div>
            </div>
        </div>

        <!-- Notes Section -->
        <div class="notes-section mb-4">
            <div class="notes-container">
                <label class="notes-label">Notes</label>
                <div class="notes-input-wrapper">
                    <textarea 
                        v-model="notes" 
                        class="notes-textarea" 
                        rows="2"
                        placeholder="Add your notes here..."
                    ></textarea>
                    <button class="btn btn-teal btn-update-notes" @click="updateNotes">
                        <i class="fas fa-save mr-1"></i>
                        Update
                    </button>
                </div>
            </div>
        </div>

        <!-- Data Table Section -->
        <div class="table-section">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="table-controls">
                    <!-- Empty space on left -->
                </div>
                <div class="table-controls-right">
                    <div class="dropdown" :class="{ 'show': showColumnDropdown }">
                        <button 
                            class="btn btn-teal dropdown-toggle" 
                            type="button" 
                            id="columnToggle"
                            @click.stop="toggleColumnDropdown"
                            aria-haspopup="true"
                            :aria-expanded="showColumnDropdown"
                        >
                            <i class="fas fa-columns"></i>
                            <span class="ml-2">Show/Hide Columns</span>
                        </button>
                        <div 
                            class="dropdown-menu dropdown-menu-right" 
                            :class="{ 'show': showColumnDropdown }"
                            aria-labelledby="columnToggle"
                            @click.stop
                        >
                            <div class="dropdown-item-text">
                                <h6 class="mb-2 font-weight-bold">Show/Hide Columns</h6>
                                <div class="form-check" v-for="column in columns" :key="column.key">
                                    <input 
                                        class="form-check-input" 
                                        type="checkbox" 
                                        :id="column.key"
                                        v-model="column.visible"
                                        @change="toggleColumn(column.key)"
                                    >
                                    <label class="form-check-label" :for="column.key">
                                        {{ column.label }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="text-center p-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading</span>
                </div>
                <p class="mt-2">Loading assessments</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="alert alert-danger m-3" role="alert">
                <strong>Error:</strong> {{ error }}
                <button class="btn btn-sm btn-outline-danger ml-2" @click="fetchMemberData">Retry</button>
            </div>

            <!-- Empty State -->
            <div v-else-if="!loading && assessments.length === 0" class="text-center p-4">
                <p class="text-muted">No assessments found for this member.</p>
            </div>

            <!-- Data Table -->
            <div v-else class="table-responsive">
                <table class="table table-striped assessment-table">
                    <thead class="thead-dark">
                        <tr>
                            <th 
                                v-for="column in visibleColumns" 
                                :key="column.key"
                                class="sortable"
                                @click="sortBy(column.key)"
                                :class="{ 'sort-asc': sortField === column.key && sortDirection === 'asc', 'sort-desc': sortField === column.key && sortDirection === 'desc' }"
                            >
                                {{ column.label }}
                                <i class="fas fa-sort ml-1" v-if="sortField !== column.key"></i>
                                <i class="fas fa-sort-up ml-1" v-if="sortField === column.key && sortDirection === 'asc'"></i>
                                <i class="fas fa-sort-down ml-1" v-if="sortField === column.key && sortDirection === 'desc'"></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(assessment, index) in sortedAssessments" :key="assessment.id || index">
                            <td v-for="column in visibleColumns" :key="column.key" 
                                :class="{ 'viewable-cell': column.viewable && assessment[column.key] }"
                            >
                                <span v-if="column.key === 'date'" class="date-cell">
                                    <router-link 
                                        :to="{ name: 'ComparePhotos', params: { date: assessment[column.key] } }"
                                        class="date-link"
                                        :title="`View photos for ${formatDate(assessment[column.key])}`"
                                        @click.stop
                                    >
                                        {{ formatDate(assessment[column.key]) }}
                                    </router-link>
                                </span>
                                <span v-else-if="column.viewable && assessment[column.key] !== null && assessment[column.key] !== '' && assessment[column.key] !== undefined" 
                                    class="viewable-text-cell"
                                    @click.stop="showFullText(column.label, assessment[column.key])"
                                    :title="`Click to view full text`"
                                >
                                    {{ truncateText(assessment[column.key], 50) }}
                                    <i class="fas fa-eye ml-1 text-muted" style="font-size: 0.75rem;"></i>
                                </span>
                                <span v-else-if="assessment[column.key] !== null && assessment[column.key] !== '' && assessment[column.key] !== undefined" 
                                    class="cell-value"
                                >
                                    {{ formatCellValue(assessment[column.key], column.key) }}
                                </span>
                                <span v-else class="text-muted">
                                    N/A
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Text Viewer Modal -->
        <div v-if="showTextModal" class="text-viewer-modal-overlay" @click="closeTextModal">
            <div class="text-viewer-modal" @click.stop>
                <div class="text-viewer-modal-header">
                    <h5 class="mb-0">{{ textModalTitle }}</h5>
                    <button type="button" class="close-btn" @click="closeTextModal" aria-label="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="text-viewer-modal-body">
                    <p class="mb-0">{{ textModalContent }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MemberReports',
    data() {
        return {
            memberName: 'Loading...', // Default name
            memberId: null,
            notes: '',
            loading: false,
            error: null,
            sortField: 'date',
            sortDirection: 'desc',
            editingCell: null, // Format: 'rowId-columnKey'
            savingCell: null,
            originalCellValue: null,
            saveTimeout: null,
            showColumnDropdown: false,
            showTextModal: false,
            textModalTitle: '',
            textModalContent: '',
            columns: [
                // Important columns - visible by default
                { key: 'date', label: 'DATE', visible: true, editable: false },
                { key: 'weight', label: 'Weight (lbs)', visible: true, editable: false },
                { key: 'bodyFat', label: 'Body Fat', visible: true, editable: false },
                { key: 'calories', label: 'Calories', visible: true, editable: false },
                { key: 'protein', label: 'Protein', visible: true, editable: false },
                { key: 'carb', label: 'Carbs', visible: true, editable: false },
                { key: 'fat', label: 'Fat', visible: true, editable: false },
                // Optional columns - hidden by default, user can enable if needed
                { key: 'waterIntake', label: 'Water Intake', visible: false, editable: false },
                { key: 'hunger', label: 'Hunger', visible: false, editable: false },
                { key: 'strength', label: 'Strength', visible: false, editable: false },
                { key: 'energy', label: 'Energy', visible: false, editable: false },
                { key: 'centerChest', label: 'Center Chest', visible: false, editable: false },
                { key: 'arms', label: 'Arms', visible: false, editable: false },
                { key: 'waist', label: 'Waist', visible: false, editable: false },
                { key: 'upperThigh', label: 'Upper Thigh', visible: false, editable: false },
                { key: 'hips', label: 'Hips', visible: false, editable: false },
                { key: 'mealDeviations', label: 'Meal Deviations', visible: false, editable: false, viewable: true },
                { key: 'activities', label: 'Activities', visible: false, editable: false, viewable: true },
                { key: 'feel', label: 'Feel', visible: false, editable: false, viewable: true },
                { key: 'cardio', label: 'Cardio', visible: false, editable: false, viewable: true },
                { key: 'plan', label: 'Plan', visible: false, editable: false }
            ],
            assessments: []
        }
    },
    mounted() {
        this.initializeMember();
        // Close dropdown when clicking outside
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    watch: {
        '$route.params.memberId': {
            handler(newMemberId) {
                if (newMemberId) {
                    this.memberId = newMemberId;
                    this.fetchMemberData();
                }
            },
            immediate: true
        }
    },
    computed: {
        visibleColumns() {
            return this.columns.filter(column => column.visible);
        },
        sortedAssessments() {
            return [...this.assessments].sort((a, b) => {
                let aVal = a[this.sortField];
                let bVal = b[this.sortField];
                
                if (aVal === null || aVal === '') aVal = '';
                if (bVal === null || bVal === '') bVal = '';
                
                if (this.sortField === 'date') {
                    aVal = new Date(aVal);
                    bVal = new Date(bVal);
                }
                
                if (this.sortDirection === 'asc') {
                    return aVal > bVal ? 1 : -1;
                } else {
                    return aVal < bVal ? 1 : -1;
                }
            });
        }
    },
    methods: {
        async updateNotes() {
            if (!this.memberId) {
                alert('Member ID is missing');
                return;
            }
            
            try {
                const response = await axios.put(`/assigned-meals-members/member/${this.memberId}/notes`, {
                    notes: this.notes
                });
                
                if (response.data.success) {
                    this.showSuccessMessage('Notes updated successfully!');
                } else {
                    throw new Error(response.data.message || 'Failed to update notes');
                }
            } catch (error) {
                console.error('Error updating notes:', error);
                const errorMessage = error.response?.data?.message || error.message || 'Failed to update notes';
                alert('Error updating notes: ' + errorMessage);
            }
        },
        toggleColumn(columnKey) {
            // Column visibility is already handled by v-model
            // Force reactivity update
            this.$forceUpdate();
        },
        toggleColumnDropdown() {
            this.showColumnDropdown = !this.showColumnDropdown;
        },
        handleClickOutside(event) {
            const dropdown = this.$el.querySelector('.dropdown');
            if (dropdown && !dropdown.contains(event.target)) {
                this.showColumnDropdown = false;
            }
        },
        showFullText(title, content) {
            this.textModalTitle = title;
            this.textModalContent = content || 'No content available';
            this.showTextModal = true;
        },
        closeTextModal() {
            this.showTextModal = false;
            this.textModalTitle = '';
            this.textModalContent = '';
        },
        truncateText(text, maxLength) {
            if (!text) return 'N/A';
            if (text.length <= maxLength) return text;
            return text.substring(0, maxLength) + '...';
        },
        sortBy(field) {
            if (this.sortField === field) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortField = field;
                this.sortDirection = 'asc';
            }
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
        },
        goBack() {
            this.$router.go(-1);
        },
        navigateToComparePhotos() {
            this.$router.push({ 
                name: 'ComparePhotos'
            }).catch(err => {
                console.log('Navigation completed');
            });
        },
        initializeMember() {
            // Get member ID from route params
            this.memberId = this.$route.params.memberId;
            if (this.memberId) {
                this.fetchMemberData();
            }
        },
        async fetchMemberData() {
            if (!this.memberId) return;
            
            this.loading = true;
            this.error = null;
            
            try {
                // Fetch member assessments
                const response = await axios.get(`/assigned-meals-members/member/${this.memberId}/assessments`);
                
                if (response.data.success) {
                    // Normalize and ensure data types are correct
                    const rawAssessments = response.data.data || [];
                    
                    // Group assessments by date to prevent duplicates
                    // If multiple assessments exist for the same date, keep the most recent one (by ID or updated_at)
                    const assessmentsByDate = new Map();
                    
                    rawAssessments.forEach(assessment => {
                        const normalizedAssessment = {
                            id: assessment.id,
                            date: assessment.date,
                            weight: assessment.weight !== null && assessment.weight !== undefined ? parseFloat(assessment.weight) : null,
                            bodyFat: assessment.bodyFat !== null && assessment.bodyFat !== undefined ? parseFloat(assessment.bodyFat) : null,
                            waterIntake: assessment.waterIntake !== null && assessment.waterIntake !== undefined ? parseFloat(assessment.waterIntake) : null,
                            hunger: assessment.hunger !== null && assessment.hunger !== undefined ? parseInt(assessment.hunger) : null,
                            strength: assessment.strength !== null && assessment.strength !== undefined ? parseInt(assessment.strength) : null,
                            energy: assessment.energy !== null && assessment.energy !== undefined ? parseInt(assessment.energy) : null,
                            centerChest: assessment.centerChest !== null && assessment.centerChest !== undefined ? parseFloat(assessment.centerChest) : null,
                            arms: assessment.arms !== null && assessment.arms !== undefined ? parseFloat(assessment.arms) : null,
                            waist: assessment.waist !== null && assessment.waist !== undefined ? parseFloat(assessment.waist) : null,
                            upperThigh: assessment.upperThigh !== null && assessment.upperThigh !== undefined ? parseFloat(assessment.upperThigh) : null,
                            hips: assessment.hips !== null && assessment.hips !== undefined ? parseFloat(assessment.hips) : null,
                            mealDeviations: assessment.mealDeviations || null,
                            activities: assessment.activities || null,
                            feel: assessment.feel || null,
                            cardio: assessment.cardio || null,
                            plan: assessment.plan || null,
                            calories: assessment.calories !== null && assessment.calories !== undefined ? parseInt(assessment.calories) : null,
                            protein: assessment.protein !== null && assessment.protein !== undefined ? parseFloat(assessment.protein) : null,
                            carb: assessment.carb !== null && assessment.carb !== undefined ? parseFloat(assessment.carb) : null,
                            fat: assessment.fat !== null && assessment.fat !== undefined ? parseFloat(assessment.fat) : null,
                            updated_at: assessment.updated_at || null,
                        };
                        
                        const dateKey = normalizedAssessment.date;
                        
                        if (!assessmentsByDate.has(dateKey)) {
                            // First assessment for this date - add it
                            assessmentsByDate.set(dateKey, normalizedAssessment);
                        } else {
                            // Multiple assessments for the same date - keep the most recent one
                            const existingAssessment = assessmentsByDate.get(dateKey);
                            
                            // Compare by updated_at if available, otherwise by ID (higher ID = more recent)
                            const isNewer = normalizedAssessment.updated_at && existingAssessment.updated_at
                                ? new Date(normalizedAssessment.updated_at) > new Date(existingAssessment.updated_at)
                                : normalizedAssessment.id > existingAssessment.id;
                            
                            if (isNewer) {
                                // Update with newer assessment data
                                assessmentsByDate.set(dateKey, normalizedAssessment);
                            } else {
                                // Merge non-null values from newer assessment into existing one
                                // This ensures we don't lose data when updating
                                Object.keys(normalizedAssessment).forEach(key => {
                                    if (normalizedAssessment[key] !== null && normalizedAssessment[key] !== undefined && normalizedAssessment[key] !== '') {
                                        if (existingAssessment[key] === null || existingAssessment[key] === undefined || existingAssessment[key] === '') {
                                            existingAssessment[key] = normalizedAssessment[key];
                                        }
                                    }
                                });
                            }
                        }
                    });
                    
                    // Convert Map to array and sort by date descending
                    this.assessments = Array.from(assessmentsByDate.values()).sort((a, b) => {
                        const dateA = new Date(a.date);
                        const dateB = new Date(b.date);
                        return dateB - dateA; // Most recent first
                    });
                    
                    this.memberName = response.data.member?.name || 'Unknown Member';
                    
                    // Fetch member notes if available
                    try {
                        const notesResponse = await axios.get(`/assigned-meals-members/member/${this.memberId}/notes`);
                        if (notesResponse.data.success && notesResponse.data.data) {
                            // Handle both empty string and null notes
                            this.notes = notesResponse.data.data.notes || '';
                        }
                    } catch (notesError) {
                        console.warn('Could not fetch notes:', notesError);
                        // Set empty string on error to ensure notes field is initialized
                        this.notes = '';
                    }
                } else {
                    this.error = response.data.message || 'Failed to fetch assessments';
                }
            } catch (error) {
                console.error('Error fetching member data:', error);
                this.error = error.response?.data?.message || error.message || 'Failed to fetch member assessments';
                this.memberName = 'Error Loading Member';
            } finally {
                this.loading = false;
            }
        },
        isEditingCell(rowId, columnKey) {
            return this.editingCell === `${rowId}-${columnKey}`;
        },
        isSavingCell(rowId, columnKey) {
            return this.savingCell === `${rowId}-${columnKey}`;
        },
        startEditCell(assessment, column) {
            if (!column.editable || !assessment.id) return;
            
            const cellKey = `${assessment.id}-${column.key}`;
            this.editingCell = cellKey;
            this.originalCellValue = assessment[column.key];
            
            // Focus the input after it's rendered
            this.$nextTick(() => {
                const inputs = this.$refs.cellInput;
                if (inputs && inputs.length > 0) {
                    const input = Array.isArray(inputs) ? inputs[inputs.length - 1] : inputs;
                    if (input && input.focus) {
                        input.focus();
                        input.select();
                    }
                }
            });
        },
        cancelEditCell(assessment, columnKey) {
            if (this.originalCellValue !== null) {
                assessment[columnKey] = this.originalCellValue;
            }
            this.editingCell = null;
            this.originalCellValue = null;
        },
        async saveCell(assessment, columnKey) {
            if (!assessment.id) {
                console.error('Cannot save: Assessment ID is missing');
                return;
            }
            
            if (!columnKey) {
                console.error('Cannot save: Column key is missing');
                return;
            }
            
            // Get the current value and normalize it
            let newValue = assessment[columnKey];
            
            // Convert empty string to null for consistency
            if (newValue === '' || newValue === undefined) {
                newValue = null;
            }
            
            // Convert numeric strings to numbers for numeric fields
            const numericFields = ['weight', 'bodyFat', 'waterIntake', 'hunger', 'strength', 'energy', 
                                 'calories', 'protein', 'carb', 'fat', 'centerChest', 'arms', 'waist', 'upperThigh', 'hips'];
            if (numericFields.includes(columnKey) && newValue !== null && newValue !== '') {
                const parsed = columnKey === 'hunger' || columnKey === 'strength' || columnKey === 'energy' || columnKey === 'calories'
                    ? parseInt(newValue)
                    : parseFloat(newValue);
                if (!isNaN(parsed)) {
                    newValue = parsed;
                } else {
                    newValue = null;
                }
            }
            
            // Check if value actually changed (normalize original value too)
            let originalValue = this.originalCellValue;
            if (originalValue === '' || originalValue === undefined) {
                originalValue = null;
            }
            if (numericFields.includes(columnKey) && originalValue !== null && originalValue !== '') {
                const parsed = columnKey === 'hunger' || columnKey === 'strength' || columnKey === 'energy' || columnKey === 'calories'
                    ? parseInt(originalValue)
                    : parseFloat(originalValue);
                if (!isNaN(parsed)) {
                    originalValue = parsed;
                } else {
                    originalValue = null;
                }
            }
            
            // Compare values (handle null and number comparisons)
            const valuesEqual = (newValue === null && originalValue === null) || 
                               (newValue === originalValue) ||
                               (newValue !== null && originalValue !== null && 
                                parseFloat(newValue) === parseFloat(originalValue));
            
            if (valuesEqual) {
                this.editingCell = null;
                this.originalCellValue = null;
                return;
            }
            
            const cellKey = `${assessment.id}-${columnKey}`;
            this.savingCell = cellKey;
            
            // Clear any existing timeout
            if (this.saveTimeout) {
                clearTimeout(this.saveTimeout);
            }
            
            try {
                // Prepare update data with only the changed field
                const updateData = {};
                
                // Use the frontend field name - the controller handles the mapping
                // Send null explicitly if value is null (to allow clearing fields)
                updateData[columnKey] = newValue;
                
                const response = await axios.put(`/assigned-meals-members/${assessment.id}`, updateData);
                
                if (response.data.success) {
                    // Update local data with response to ensure consistency
                    const updatedData = response.data.data;
                    
                    // Map backend response back to frontend format
                    // Backend returns: body, water, carbs, fat_macros
                    // Frontend expects: bodyFat, waterIntake, carb, fat
                    if (updatedData) {
                        // Update all fields from backend response to ensure consistency
                        // Normalize data types to match frontend expectations
                        if (updatedData.body !== undefined) {
                            assessment.bodyFat = updatedData.body !== null ? parseFloat(updatedData.body) : null;
                        }
                        if (updatedData.water !== undefined) {
                            assessment.waterIntake = updatedData.water !== null ? parseFloat(updatedData.water) : null;
                        }
                        if (updatedData.carbs !== undefined) {
                            assessment.carb = updatedData.carbs !== null ? parseFloat(updatedData.carbs) : null;
                        }
                        if (updatedData.fat_macros !== undefined) {
                            assessment.fat = updatedData.fat_macros !== null ? parseFloat(updatedData.fat_macros) : null;
                        }
                        if (updatedData.weight !== undefined) {
                            assessment.weight = updatedData.weight !== null ? parseFloat(updatedData.weight) : null;
                        }
                        if (updatedData.hunger !== undefined) {
                            assessment.hunger = updatedData.hunger !== null ? parseInt(updatedData.hunger) : null;
                        }
                        if (updatedData.strength !== undefined) {
                            assessment.strength = updatedData.strength !== null ? parseInt(updatedData.strength) : null;
                        }
                        if (updatedData.energy !== undefined) {
                            assessment.energy = updatedData.energy !== null ? parseInt(updatedData.energy) : null;
                        }
                        if (updatedData.cardio !== undefined) {
                            assessment.cardio = updatedData.cardio;
                        }
                        if (updatedData.plan !== undefined) {
                            assessment.plan = updatedData.plan;
                        }
                        if (updatedData.calories !== undefined) {
                            assessment.calories = updatedData.calories !== null ? parseInt(updatedData.calories) : null;
                        }
                        if (updatedData.protein !== undefined) {
                            assessment.protein = updatedData.protein !== null ? parseFloat(updatedData.protein) : null;
                        }
                        if (updatedData.centerChest !== undefined) {
                            assessment.centerChest = updatedData.centerChest !== null ? parseFloat(updatedData.centerChest) : null;
                        }
                        if (updatedData.arms !== undefined) {
                            assessment.arms = updatedData.arms !== null ? parseFloat(updatedData.arms) : null;
                        }
                        if (updatedData.waist !== undefined) {
                            assessment.waist = updatedData.waist !== null ? parseFloat(updatedData.waist) : null;
                        }
                        if (updatedData.upperThigh !== undefined) {
                            assessment.upperThigh = updatedData.upperThigh !== null ? parseFloat(updatedData.upperThigh) : null;
                        }
                        if (updatedData.hips !== undefined) {
                            assessment.hips = updatedData.hips !== null ? parseFloat(updatedData.hips) : null;
                        }
                        if (updatedData.mealDeviations !== undefined) {
                            assessment.mealDeviations = updatedData.mealDeviations;
                        }
                        if (updatedData.activities !== undefined) {
                            assessment.activities = updatedData.activities;
                        }
                        if (updatedData.feel !== undefined) {
                            assessment.feel = updatedData.feel;
                        }
                    } else {
                        // Fallback: use the normalized value we just set
                        assessment[columnKey] = newValue;
                    }
                    
                    this.editingCell = null;
                    this.originalCellValue = null;
                } else {
                    throw new Error(response.data.message || 'Failed to update cell');
                }
            } catch (error) {
                console.error('Error saving cell:', error);
                
                // Restore original value on error
                assessment[columnKey] = this.originalCellValue;
                
                const errorMessage = error.response?.data?.message || error.message || 'Failed to save';
                alert(`Error saving ${columnKey}: ${errorMessage}`);
            } finally {
                this.savingCell = null;
            }
        },
        formatCellValue(value, columnKey) {
            if (value === null || value === undefined || value === '') {
                return 'N/A';
            }
            
            // Format numeric values appropriately
            if (columnKey === 'weight' || columnKey === 'bodyFat' || columnKey === 'centerChest' || columnKey === 'arms' || columnKey === 'waist' || columnKey === 'upperThigh' || columnKey === 'hips') {
                return parseFloat(value).toFixed(1);
            }
            
            if (columnKey === 'waterIntake' || columnKey === 'calories' || columnKey === 'protein' || 
                columnKey === 'carb' || columnKey === 'fat' || columnKey === 'hunger' || 
                columnKey === 'strength' || columnKey === 'energy') {
                return value;
            }
            
            return value;
        },
        showSuccessMessage(message) {
            // Create a temporary success message element
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
            
            // Remove after 3 seconds
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.parentNode.removeChild(successDiv);
                }
            }, 3000);
        },
        exportCurrentView() {
            // Export only the currently visible columns
            const visibleData = this.sortedAssessments.map(assessment => {
                const row = {};
                this.visibleColumns.forEach(column => {
                    if (column.key === 'date') {
                        row[column.label] = this.formatDate(assessment[column.key]);
                    } else {
                        row[column.label] = assessment[column.key] !== null && assessment[column.key] !== '' 
                            ? assessment[column.key] 
                            : 'N/A';
                    }
                });
                return row;
            });

            this.downloadCSV(visibleData, `${this.memberName}_Current_View_${this.getCurrentDateString()}.csv`);
        },
        exportAllColumns() {
            // Export all columns regardless of visibility
            const allData = this.sortedAssessments.map(assessment => {
                const row = {};
                this.columns.forEach(column => {
                    if (column.key === 'date') {
                        row[column.label] = this.formatDate(assessment[column.key]);
                    } else {
                        row[column.label] = assessment[column.key] !== null && assessment[column.key] !== '' 
                            ? assessment[column.key] 
                            : 'N/A';
                    }
                });
                return row;
            });

            this.downloadCSV(allData, `${this.memberName}_All_Columns_${this.getCurrentDateString()}.csv`);
        },
        downloadCSV(data, filename) {
            if (!data || data.length === 0) {
                alert('No data to export');
                return;
            }

            // Get headers from the first row
            const headers = Object.keys(data[0]);
            
            // Create CSV content
            const csvContent = [
                headers.join(','),
                ...data.map(row => 
                    headers.map(header => {
                        const value = row[header];
                        // Escape commas and quotes in values
                        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
                            return `"${value.replace(/"/g, '""')}"`;
                        }
                        return value;
                    }).join(',')
                )
            ].join('\n');

            // Create and download file
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } else {
                // Fallback for older browsers
                alert('CSV export not supported in this browser');
            }
        },
        getCurrentDateString() {
            const now = new Date();
            return now.toISOString().split('T')[0]; // YYYY-MM-DD format
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/sass/_variables.scss";

.self-assessments-page {
    padding: 20px;
    min-height: 100vh;
}

.page-title {
    color: #252525;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
}

.btn-teal {
    background-color: #dc3545;
    border-color: #dc3545;
    color: white;
    font-weight: 600;
    padding: 7px 16px;
    border-radius: 20px;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);
}

.btn-teal:hover {
    background-color: #c82333;
    border-color: #bd2130;
    color: white;
    box-shadow: 0 3px 8px rgba(220, 53, 69, 0.3);
    transform: translateY(-1px);
}

.btn-teal:active {
    transform: translateY(0);
    box-shadow: 0 1px 3px rgba(220, 53, 69, 0.3);
}

.btn-teal i {
    margin-right: 0;
    font-size: 0.875rem;
}

.btn-teal:hover {
    background-color: #dc3545;
    border-color: #dc3545;
    color: white;
}

.btn-teal:focus {
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.notes-section {
    background: white;
    padding: 1rem 1.25rem;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    border: 1px solid #e9ecef;
}

.notes-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.notes-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #495057;
    margin: 0;
}

.notes-input-wrapper {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
}

.notes-textarea {
    flex: 1;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    resize: vertical;
    font-family: inherit;
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
    line-height: 1.5;
    min-height: 60px;
    max-height: 120px;
}

.notes-textarea:focus {
    outline: none;
    border-color: #dc3545;
    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
}

.notes-textarea::placeholder {
    color: #adb5bd;
    font-style: italic;
}

.btn-update-notes {
    align-self: flex-end;
    white-space: nowrap;
}

.table-section {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.assessment-table {
    margin-bottom: 0;
}

.assessment-table thead th {
    font-family: "Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
    color: #252525;
    border: none;
    font-weight: 600;
    padding: 1rem 0.75rem;
    vertical-align: middle;
    font-size: 0.9rem;
    text-align: left;
    border-bottom: 2px solid #dee2e6;
    border-radius: 5px;
}

.assessment-table tbody td {
    padding: 12px 8px;
    vertical-align: middle;
    border-top: 1px solid #dee2e6;
}

.assessment-table tbody tr:nth-of-type(odd) {
    background-color: #f8f9fa;
}

.assessment-table tbody tr:hover {
    background-color: #e9ecef;
}

.sortable {
    cursor: pointer;
    user-select: none;
}

.sortable:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.date-cell {
    font-weight: 500;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
}

.date-link {
    color: #ff4040;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
    border-radius: 3px;
    padding: 2px 4px;
    display: inline-block;
}

.date-link:hover {
    color: #e63939;
    text-decoration: underline;
    background-color: rgba(255, 64, 64, 0.1);
    transform: translateY(-1px);
}

.date-link:focus {
    outline: 2px solid rgba(255, 64, 64, 0.3);
    outline-offset: 1px;
}

.action-buttons .btn {
    margin-right: 8px;
}

.action-buttons .btn:last-child {
    margin-right: 0;
}

.viewable-cell {
    cursor: default;
}

.viewable-text-cell {
    cursor: pointer;
    color: #ff4040;
    text-decoration: none;
    transition: all 0.2s ease;
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
}

.viewable-text-cell:hover {
    background-color: rgba(255, 64, 64, 0.1);
    text-decoration: underline;
}

.cell-input {
    border: 2px solid #ff4040;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 0.9rem;
}

.cell-input:focus {
    outline: none;
    border-color: #ff4040;
    box-shadow: 0 0 0 3px rgba(255, 64, 64, 0.1);
}

.saving-indicator {
    color: #ff4040;
    font-size: 0.8rem;
    margin-left: 4px;
}

.table-controls,
.table-controls-right {
    display: flex;
    align-items: center;
}

.table-controls .dropdown-menu,
.table-controls-right .dropdown-menu {
    min-width: 280px;
    max-width: 320px;
    max-height: 450px;
    overflow-y: auto;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);
    padding: 0;
    margin-top: 0.5rem;
    background: #ffffff;
}

.table-controls-right .dropdown-menu-right {
    right: 0;
    left: auto;
}

.dropdown.show .dropdown-menu {
    display: block;
}

.dropdown-item-text {
    padding: 1.25rem 1.5rem;
    background: #ffffff;
}

.dropdown-item-text h6 {
    margin: 0 0 1.25rem 0;
    padding: 0 0 0.875rem 0;
    border-bottom: 2px solid #e9ecef;
    font-size: 0.875rem;
    font-weight: 700;
    color: #212529;
    letter-spacing: 0.3px;
    text-transform: uppercase;
}

.form-check {
    margin-bottom: 0.875rem;
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    transition: background-color 0.15s ease;
    border-radius: 4px;
    padding-left: 0.5rem;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
}

.form-check:hover {
    background-color: #f8f9fa;
}

.form-check:last-child {
    margin-bottom: 0;
}

.form-check-input {
    width: 18px;
    height: 18px;
    margin-right: 0.875rem;
    margin-top: 0;
    cursor: pointer;
    border: 2px solid #adb5bd;
    border-radius: 3px;
    transition: all 0.2s ease;
    flex-shrink: 0;
}

.form-check-input:checked {
    background-color: #dc3545;
    border-color: #dc3545;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}

.form-check-input:focus {
    border-color: #dc3545;
    outline: none;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15);
}

.form-check-label {
    cursor: pointer;
    user-select: none;
    font-size: 0.9rem;
    color: #495057;
    font-weight: 500;
    line-height: 1.5;
    flex: 1;
    margin: 0;
}

.form-check-label:hover {
    color: #212529;
}

/* Custom scrollbar for dropdown */
.table-controls .dropdown-menu::-webkit-scrollbar,
.table-controls-right .dropdown-menu::-webkit-scrollbar {
    width: 6px;
}

.table-controls .dropdown-menu::-webkit-scrollbar-track,
.table-controls-right .dropdown-menu::-webkit-scrollbar-track {
    background: #f8f9fa;
    border-radius: 3px;
}

.table-controls .dropdown-menu::-webkit-scrollbar-thumb,
.table-controls-right .dropdown-menu::-webkit-scrollbar-thumb {
    background: #ced4da;
    border-radius: 3px;
}

.table-controls .dropdown-menu::-webkit-scrollbar-thumb:hover,
.table-controls-right .dropdown-menu::-webkit-scrollbar-thumb:hover {
    background: #adb5bd;
}

@media (max-width: 768px) {
    .page-header .d-flex {
        flex-direction: column;
        align-items: flex-start !important;
    }
    
    .action-buttons {
        margin-top: 15px;
        width: 100%;
    }
    
    .action-buttons .btn {
        margin-right: 8px;
        margin-bottom: 8px;
        padding: 5px 12px;
        font-size: 0.8rem;
    }
    
    .page-title {
        font-size: 2rem;
    }
    
    .notes-input-wrapper {
        flex-direction: column;
    }
    
    .btn-update-notes {
        align-self: flex-end;
        width: auto;
    }
}

.text-viewer-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: 20px;
}

.text-viewer-modal {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
}

.text-viewer-modal-header {
    padding: 1.25rem;
    border-bottom: 1px solid #dee2e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text-viewer-modal-header h5 {
    color: #252525;
    font-weight: 600;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.25rem;
    color: #6c757d;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.close-btn:hover {
    background-color: #f8f9fa;
    color: #dc3545;
}

.text-viewer-modal-body {
    padding: 1.25rem;
    overflow-y: auto;
    flex: 1;
}

.text-viewer-modal-body p {
    color: #252525;
    line-height: 1.6;
    white-space: pre-wrap;
    word-wrap: break-word;
}

@media (max-width: 576px) {
    .self-assessments-page {
        padding: 10px;
    }
    
    .action-buttons .btn {
        font-size: 0.8rem;
        padding: 5px 10px;
        border-radius: 18px;
    }
    
    .text-viewer-modal {
        max-width: 95%;
        margin: 10px;
    }
}
</style>
