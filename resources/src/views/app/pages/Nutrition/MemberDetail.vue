<template>
    <div class="member-detail-wrapper">
        <!-- Loading State -->
        <div v-if="loading" class="loading-container text-center py-5">
            <div class="spinner spinner-primary"></div>
            <p class="mt-2">Loading member details...</p>
        </div>

        <!-- Main Content -->
        <div v-else class="main-content">
            <!-- Breadcrumb Navigation -->
            <div class="breadcrumb-section mb-4">
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
                                    <i class="fas fa-utensils"></i>
                                    Nutrition Hub
                                </router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/app/nutrition/members">
                                    <i class="fas fa-users"></i>
                                    Members
                                </router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                <i class="fas fa-user mr-1"></i>
                                {{ memberName || 'Loading...' }}
                            </li>
                        </ol>
                        <div class="ml-auto">
                            <b-dropdown right no-caret variant="link" class="options-dropdown">
                                <template #button-content>
                                    <button class="btn btn-primary btn-sm">
                                        Options <i class="fas fa-caret-down ml-1"></i>
                                    </button>
                                </template>
                                <b-dropdown-item @click="editMember">Edit Member</b-dropdown-item>
                                <b-dropdown-item @click="emailMember">Send Email</b-dropdown-item>
                                <b-dropdown-divider></b-dropdown-divider>
                                <b-dropdown-item @click="deleteMember" class="text-danger">Delete Member</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
                </nav>
            </div>

            <!-- Member Header -->
            <div class="member-header mb-4">
                <h1 class="member-name">{{ memberName }}</h1>
                <div class="member-details d-flex flex-wrap mt-3">
                    <div class="detail-item mr-4 mb-2">
                        <span class="detail-label">Member Since:</span>
                        <span class="detail-value">{{ formatDate(member.date_joined || member.created_at) }}</span>
                    </div>
                    <div class="detail-item mr-4 mb-2">
                        <span class="detail-label">Assigned Coach:</span>
                        <span class="detail-value">
                            <router-link 
                                v-if="member.coach_id"
                                :to="`/app/nutrition/members?coach=${member.coach_id}`"
                                class="coach-link"
                            >
                                {{ member.coach || 'N/A' }}
                            </router-link>
                            <span v-else>N/A</span>
                        </span>
                    </div>
                    <div class="detail-item mb-2">
                        <span class="detail-label">Last Report Submitted:</span>
                        <span class="detail-value">{{ formatDate(member.last_report_submitted) || 'N/A' }}</span>
                    </div>
                </div>
            </div>

            <!-- Assigned Meal Plans Section -->
            <div class="meal-plans-section mb-4">
                <h3 class="section-title mb-3">Assigned Meal Plans</h3>
                <div class="meal-plans-cards d-flex flex-wrap gap-3">
                    <div 
                        v-for="plan in mealPlans" 
                        :key="plan.id"
                        class="meal-plan-card"
                    >
                        <div class="plan-header">
                            <div class="plan-header-left">
                                <i class="fas fa-star text-danger mr-2" v-if="plan.is_favorite"></i>
                                <i class="fas fa-edit text-primary mr-2" v-if="plan.is_customized" title="Customized Plan"></i>
                                <span 
                                    class="plan-name clickable" 
                                    @click="editPlan(plan)"
                                    :title="'Click to edit ' + (plan.name || plan.template_name || 'NONE TRAINING')"
                                >
                                    {{ plan.name || plan.template_name || 'NONE TRAINING' }}
                                </span>
                            </div>
                            <b-dropdown right no-caret variant="link" class="plan-menu">
                                <template #button-content>
                                    <i class="fas fa-ellipsis-v"></i>
                                </template>
                                <b-dropdown-item @click="editPlan(plan)">Edit</b-dropdown-item>
                                <b-dropdown-item @click="deletePlan(plan)">Delete</b-dropdown-item>
                            </b-dropdown>
                        </div>
                        <div class="plan-body">
                            <div class="plan-info">
                                <div class="info-item">
                                    <span class="info-label">Created By:</span>
                                    <span class="info-value">{{ plan.created_by || 'N/A' }}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Last Modified:</span>
                                    <span class="info-value">{{ formatDateTime(plan.updated_at || plan.last_modified) }}</span>
                                </div>
                            </div>
                            <div class="plan-macros">
                                <div class="macros-label">Macros</div>
                                <div class="macros-values">
                                    {{ formatMacro(plan.carbs || plan.total_carbs) }}g / {{ formatMacro(plan.protein || plan.total_protein) }}g / {{ formatMacro(plan.fats || plan.total_fats) }}g
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!mealPlans || !Array.isArray(mealPlans) || mealPlans.length === 0" class="no-plans-message">
                        <p class="text-muted">No meal plans assigned</p>
                    </div>
                </div>
            </div>

            <!-- Tab Navigation -->
            <div class="tab-navigation mb-4">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a 
                            class="nav-link" 
                            :class="{ active: activeTab === 'instructions' }"
                            @click="activeTab = 'instructions'"
                            href="#"
                        >
                            Instructions
                        </a>
                    </li>
                    <li class="nav-item">
                        <a 
                            class="nav-link" 
                            :class="{ active: activeTab === 'weight-training' }"
                            @click="activeTab = 'weight-training'"
                            href="#"
                        >
                            Weight Training & Cardio
                        </a>
                    </li>
                    <li class="nav-item">
                        <a 
                            class="nav-link" 
                            :class="{ active: activeTab === 'supplements' }"
                            @click="activeTab = 'supplements'"
                            href="#"
                        >
                            Supplements
                        </a>
                    </li>
                    <li class="nav-item">
                        <a 
                            class="nav-link" 
                            :class="{ active: activeTab === 'notes' }"
                            @click="activeTab = 'notes'"
                            href="#"
                        >
                            Member Notes
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Tab Content -->
            <div class="tab-content-wrapper">
                <!-- Instructions Tab -->
                <div v-show="activeTab === 'instructions'" class="tab-content">
                    <div class="instructions-header d-flex justify-content-between align-items-center mb-3">
                        <h3 class="section-title mb-0">Instructions</h3>
                        <button 
                            class="btn btn-primary btn-sm"
                            @click="toggleEditInstructions"
                        >
                            <i class="fas fa-edit mr-2"></i>
                            EDIT
                        </button>
                    </div>

                    <div v-if="!editingInstructions" class="instructions-content">
                        <h4 class="instructions-subtitle">Read carefully:</h4>
                        <div v-html="instructions || '<p>No instructions available.</p>'"></div>
                    </div>

                    <div v-else class="instructions-edit">
                        <vue-editor 
                            v-model="instructionsEdit"
                            :editor-toolbar="customToolbar"
                            class="instructions-editor"
                        ></vue-editor>
                        <div class="edit-actions mt-3">
                            <button 
                                class="btn btn-primary"
                                @click="saveInstructions"
                                :disabled="savingInstructions"
                            >
                                <span v-if="savingInstructions" class="spinner-border spinner-border-sm mr-2"></span>
                                Save
                            </button>
                            <button 
                                class="btn btn-secondary ml-2"
                                @click="cancelEditInstructions"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                    <!-- Attachments Section -->
                    <div class="attachments-section mt-5">
                        <div class="attachments-header d-flex justify-content-between align-items-center mb-3">
                            <h3 class="section-title mb-0">Attachments</h3>
                            <button 
                                class="btn btn-primary btn-sm"
                                @click="showAttachmentModal = true"
                            >
                                <i class="fas fa-plus mr-2"></i>
                                ADD ATTACHMENT
                            </button>
                        </div>
                        <div class="attachments-list">
                            <div 
                                v-for="attachment in attachments" 
                                :key="attachment.id"
                                class="attachment-item d-flex justify-content-between align-items-center p-3 mb-2 border rounded"
                            >
                                <div class="attachment-info">
                                    <i class="fas fa-file mr-2"></i>
                                    <span>{{ attachment.name || attachment.file_name }}</span>
                                </div>
                                <div class="attachment-actions">
                                    <a 
                                        :href="attachment.download_url || attachment.url"
                                        class="btn btn-sm btn-outline-primary mr-2"
                                        download
                                    >
                                        <i class="fas fa-download"></i>
                                    </a>
                                    <button 
                                        class="btn btn-sm btn-outline-danger"
                                        @click="deleteAttachment(attachment.id)"
                                    >
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <div v-if="!attachments || !Array.isArray(attachments) || attachments.length === 0" class="no-attachments text-muted text-center py-4">
                                <p>No attachments</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Weight Training & Cardio Tab -->
                <div v-show="activeTab === 'weight-training'" class="tab-content">
                    <div class="tab-header d-flex justify-content-between align-items-center mb-3">
                        <h3 class="section-title mb-0">Weight Training & Cardio</h3>
                        <button 
                            class="btn btn-primary btn-sm"
                            @click="toggleEditWeightTraining"
                        >
                            <i class="fas fa-edit mr-2"></i>
                            EDIT
                        </button>
                    </div>
                    <div v-if="!editingWeightTraining" class="content-display">
                        <div v-html="weightTrainingCardio || '<p>No content available.</p>'"></div>
                    </div>
                    <div v-else class="content-edit">
                        <vue-editor 
                            v-model="weightTrainingCardioEdit"
                            :editor-toolbar="customToolbar"
                            class="content-editor"
                        ></vue-editor>
                        <div class="edit-actions mt-3">
                            <button 
                                class="btn btn-primary"
                                @click="saveWeightTraining"
                                :disabled="savingWeightTraining"
                            >
                                <span v-if="savingWeightTraining" class="spinner-border spinner-border-sm mr-2"></span>
                                Save
                            </button>
                            <button 
                                class="btn btn-secondary ml-2"
                                @click="cancelEditWeightTraining"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Supplements Tab -->
                <div v-show="activeTab === 'supplements'" class="tab-content">
                    <div class="tab-header d-flex justify-content-between align-items-center mb-3">
                        <h3 class="section-title mb-0">Supplements</h3>
                        <button 
                            class="btn btn-primary btn-sm"
                            @click="toggleEditSupplements"
                        >
                            <i class="fas fa-edit mr-2"></i>
                            EDIT
                        </button>
                    </div>
                    <div v-if="!editingSupplements" class="content-display">
                        <div v-html="supplements || '<p>No content available.</p>'"></div>
                    </div>
                    <div v-else class="content-edit">
                        <vue-editor 
                            v-model="supplementsEdit"
                            :editor-toolbar="customToolbar"
                            class="content-editor"
                        ></vue-editor>
                        <div class="edit-actions mt-3">
                            <button 
                                class="btn btn-primary"
                                @click="saveSupplements"
                                :disabled="savingSupplements"
                            >
                                <span v-if="savingSupplements" class="spinner-border spinner-border-sm mr-2"></span>
                                Save
                            </button>
                            <button 
                                class="btn btn-secondary ml-2"
                                @click="cancelEditSupplements"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Member Notes Tab -->
                <div v-show="activeTab === 'notes'" class="tab-content">
                    <div class="tab-header d-flex justify-content-between align-items-center mb-3">
                        <h3 class="section-title mb-0">Member Notes</h3>
                        <button 
                            class="btn btn-primary btn-sm"
                            @click="toggleEditNotes"
                        >
                            <i class="fas fa-edit mr-2"></i>
                            EDIT
                        </button>
                    </div>
                    <div v-if="!editingNotes" class="content-display">
                        <div v-html="notes || '<p>No notes available.</p>'"></div>
                    </div>
                    <div v-else class="content-edit">
                        <vue-editor 
                            v-model="notesEdit"
                            :editor-toolbar="customToolbar"
                            class="content-editor"
                        ></vue-editor>
                        <div class="edit-actions mt-3">
                            <button 
                                class="btn btn-primary"
                                @click="saveNotes"
                                :disabled="savingNotes"
                            >
                                <span v-if="savingNotes" class="spinner-border spinner-border-sm mr-2"></span>
                                Save
                            </button>
                            <button 
                                class="btn btn-secondary ml-2"
                                @click="cancelEditNotes"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Attachment Upload Modal -->
        <b-modal 
            v-model="showAttachmentModal" 
            title="Add Attachment"
            @ok="uploadAttachment"
            @cancel="cancelAttachmentUpload"
        >
            <div class="attachment-upload-form">
                <input 
                    type="file" 
                    ref="fileInput"
                    @change="handleFileSelect"
                    class="form-control mb-3"
                />
                <div v-if="selectedFile" class="selected-file-info">
                    <p><strong>Selected file:</strong> {{ selectedFile.name }}</p>
                </div>
            </div>
        </b-modal>

        <!-- Edit Meal Plan Modal - Full Screen -->
        <div
            v-if="showEditMealPlanModal"
            class="modal-overlay"
            @click="closeEditMealPlanModal"
            @keydown.esc="closeEditMealPlanModal"
        >
            <div class="modal-content full-screen-modal" @click.stop>
                <!-- Header -->
                <div class="modal-header modern-header">
                    <div class="header-content">
                        <h3 class="modal-title">Edit Assigned Meal Plan</h3>
                    </div>
                    <button
                        class="modal-close modern-close"
                        @click="closeEditMealPlanModal"
                    >
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Main Content -->
                <div class="modal-body modern-body">
                    <form @submit.prevent="saveEditedPlan" class="modern-form">
                        <div class="advanced-configuration">
                <!-- Admin Info Header -->
                <div class="admin-info-header">
                    <div class="admin-info-item">
                        <span class="info-label">Created By:</span>
                        <span class="info-value">{{ editPlanForm.created_by || 'N/A' }}</span>
                    </div>
                    <div class="admin-info-item">
                        <span class="info-label">Date Created:</span>
                        <span class="info-value">{{ formatDate(editPlanForm.created_at) }}</span>
                    </div>
                    <div class="admin-info-item">
                        <span class="info-label">Last Modified:</span>
                        <span class="info-value">{{ formatDateTime(editPlanForm.updated_at || editPlanForm.last_modified) }}</span>
                    </div>
                </div>

                <!-- Top Sections: Meal Plan Targets and Nutrition Levels -->
                <div class="top-sections-container-vertical">
                    <!-- Meal Plan Targets Section -->
                    <div class="meal-plan-targets-section">
                        <div class="targets-header">
                            <h4 class="targets-title">Meal Plan Targets</h4>
                        </div>

                        <div class="targets-grid">
                            <div class="target-item protein-target">
                                <div class="target-header">
                                    <span class="target-label">PROTEIN</span>
                                    <span class="target-value">{{ formatMacro(editPlanForm.protein) }}g</span>
                                </div>
                                <div class="target-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill protein-fill" :style="{ width: getProgressPercentage('protein') + '%' }"></div>
                                    </div>
                                    <span class="current-intake">{{ formatMacro(editPlanForm.protein) }}g</span>
                                </div>
                            </div>

                            <div class="target-item carbs-target">
                                <div class="target-header">
                                    <span class="target-label">CARBS</span>
                                    <span class="target-value">{{ formatMacro(editPlanForm.carbs) }}g</span>
                                </div>
                                <div class="target-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill carbs-fill" :style="{ width: getProgressPercentage('carbs') + '%' }"></div>
                                    </div>
                                    <span class="current-intake">{{ formatMacro(editPlanForm.carbs) }}g</span>
                                </div>
                            </div>

                            <div class="target-item fat-target">
                                <div class="target-header">
                                    <span class="target-label">FAT</span>
                                    <span class="target-value">{{ formatMacro(editPlanForm.fats) }}g</span>
                                </div>
                                <div class="target-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill fat-fill" :style="{ width: getProgressPercentage('fat') + '%' }"></div>
                                    </div>
                                    <span class="current-intake">{{ formatMacro(editPlanForm.fats) }}g</span>
                                </div>
                            </div>
                        </div>

                        <div class="targets-visual-bar">
                            <div class="visual-segment protein-segment" :style="{ width: getVisualBarWidth('protein') + '%' }">
                                <span class="segment-label">{{ formatMacro(editPlanForm.protein) }}g</span>
                            </div>
                            <div class="visual-segment carbs-segment" :style="{ width: getVisualBarWidth('carbs') + '%' }">
                                <span class="segment-label">{{ formatMacro(editPlanForm.carbs) }}g</span>
                            </div>
                            <div class="visual-segment fat-segment" :style="{ width: getVisualBarWidth('fat') + '%' }">
                                <span class="segment-label">{{ formatMacro(editPlanForm.fats) }}g</span>
                            </div>
                        </div>
                    </div>

                    <!-- Nutrition Levels Summary -->
                    <div class="nutrition-levels-summary">
                        <h4 class="nutrition-levels-header">Nutrition Levels</h4>
                        <p class="nutrition-levels-subtitle">(Current/Daily Target)</p>
                        
                        <div class="nutrition-metrics">
                            <div class="nutrition-metric calories">
                                <span class="metric-label">Total Calories:</span>
                                <span class="metric-value">{{ editPlanForm.calories || 0 }} / {{ editPlanForm.calories || 0 }}</span>
                            </div>
                            
                            <div class="nutrition-metric protein">
                                <span class="metric-label">Total Protein:</span>
                                <span class="metric-value">{{ formatMacro(editPlanForm.protein) }}g / {{ formatMacro(editPlanForm.protein) }}g</span>
                            </div>
                            
                            <div class="nutrition-metric carbs">
                                <span class="metric-label">Total Carbs:</span>
                                <span class="metric-value">{{ formatMacro(editPlanForm.carbs) }}g / {{ formatMacro(editPlanForm.carbs) }}g</span>
                            </div>
                            
                            <div class="nutrition-metric fat">
                                <span class="metric-label">Total Fat:</span>
                                <span class="metric-value">{{ formatMacro(editPlanForm.fats) }}g / {{ formatMacro(editPlanForm.fats) }}g</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Editable Fields Section -->
                <div class="editable-fields-section">
                    <h4 class="section-title mb-3">Edit Plan Details</h4>
                    
                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-utensils mr-1"></i>
                            Plan Name
                        </label>
                        <b-form-input
                            v-model="editPlanForm.name"
                            type="text"
                            placeholder="Enter plan name"
                            class="form-input"
                        ></b-form-input>
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-file-alt mr-1"></i>
                            Description
                        </label>
                        <b-form-textarea
                            v-model="editPlanForm.description"
                            placeholder="Enter description"
                            rows="3"
                            class="form-textarea"
                        ></b-form-textarea>
                    </div>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label">
                                    <i class="fas fa-fire mr-1"></i>
                                    Calories
                                </label>
                                <b-form-input
                                    v-model.number="editPlanForm.calories"
                                    type="number"
                                    min="0"
                                    placeholder="Calories"
                                    class="form-input"
                                ></b-form-input>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label">
                                    <i class="fas fa-dumbbell mr-1"></i>
                                    Protein (g)
                                </label>
                                <b-form-input
                                    v-model.number="editPlanForm.protein"
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    placeholder="Protein"
                                    class="form-input"
                                ></b-form-input>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label">
                                    <i class="fas fa-bread-slice mr-1"></i>
                                    Carbs (g)
                                </label>
                                <b-form-input
                                    v-model.number="editPlanForm.carbs"
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    placeholder="Carbs"
                                    class="form-input"
                                ></b-form-input>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label class="form-label">
                                    <i class="fas fa-oil-can mr-1"></i>
                                    Fats (g)
                                </label>
                                <b-form-input
                                    v-model.number="editPlanForm.fats"
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    placeholder="Fats"
                                    class="form-input"
                                ></b-form-input>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">
                                    <i class="fas fa-calendar-alt mr-1"></i>
                                    Start Date
                                </label>
                                <b-form-input
                                    v-model="editPlanForm.start_date"
                                    type="date"
                                    class="form-input"
                                ></b-form-input>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">
                                    <i class="fas fa-calendar-check mr-1"></i>
                                    End Date
                                </label>
                                <b-form-input
                                    v-model="editPlanForm.end_date"
                                    type="date"
                                    class="form-input"
                                ></b-form-input>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-sticky-note mr-1"></i>
                            Notes
                        </label>
                        <b-form-textarea
                            v-model="editPlanForm.notes"
                            placeholder="Enter notes"
                            rows="3"
                            class="form-textarea"
                        ></b-form-textarea>
                    </div>
                </div>

                <!-- Meals for This Plan Section -->
                <div class="meals-section">
                    <div class="meals-header">
                        <h4 class="section-title">Meals for This Plan</h4>
                    </div>
                    <div class="meal-tables-container">
                        <div
                            v-for="(meal, mealIndex) in mealCards"
                            :key="meal.key"
                            class="meal-table-section"
                        >
                            <div class="meal-table-header">
                                <div class="meal-title-section">
                                    <span class="meal-icon">
                                        <i :class="meal.icon"></i>
                                    </span>
                                    <div class="meal-title-container">
                                        <h5 class="meal-table-title">
                                            MEAL #{{ mealIndex + 1 }} - {{ meal.label }}
                                        </h5>
                                    </div>
                                </div>
                                <div class="meal-header-actions">
                                    <button
                                        type="button"
                                        class="add-product-btn-table"
                                        @click="openAddProductModal(meal.key)"
                                        title="Add"
                                    >
                                        <i class="fas fa-plus"></i> Add
                                    </button>
                                </div>
                            </div>
                            
                            <div class="nutrition-table-container">
                                <table class="nutrition-table">
                                    <thead>
                                        <tr>
                                            <th>Food Name</th>
                                            <th>Label Serving</th>
                                            <th>Protein</th>
                                            <th>Total Carb</th>
                                            <th>Net Carbs</th>
                                            <th>Fat</th>
                                            <th>Fiber</th>
                                            <th>Sod (mg)</th>
                                            <th>Potass (mg)</th>
                                            <th>Kcal</th>
                                            <th>Notes</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-if="!mealProducts[meal.key] || mealProducts[meal.key].length === 0">
                                            <tr>
                                                <td colspan="12" class="empty-meal-row">
                                                    <div class="empty-meal-content">
                                                        <i class="fas fa-utensils"></i>
                                                        <span>No foods added</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </template>
                                        <template v-else>
                                            <tr
                                                v-for="(product, idx) in mealProducts[meal.key]"
                                                :key="idx"
                                                class="product-row"
                                            >
                                                <td class="product-name-cell">
                                                    <span class="product-name">{{ product.name }}</span>
                                                </td>
                                                <td class="label-serving-cell">
                                                    <div class="serving-edit-container">
                                                        <template v-if="!editingServingFields[`${meal.key}-${idx}-label`]">
                                                            <span class="serving-value">
                                                                {{ ((product.label_serving !== null && product.label_serving !== undefined && product.label_serving !== '') ? product.label_serving : (product.serving_description || '')) || 'N/A' }}<span class="unit-suffix">{{ product.unit || 'gm' }}</span>
                                                            </span>
                                                            <span v-if="savingFields && savingFields[`${editPlanForm.id}-${product.id}-${meal.key}-label`]" class="saving-loader">
                                                                <i class="fas fa-spinner fa-spin"></i>
                                                            </span>
                                                            <button
                                                                v-else
                                                                type="button"
                                                                @click.stop="startEditingServing(meal.key, idx, 'label')"
                                                                class="edit-serving-icon-btn"
                                                                title="Edit Label Serving"
                                                            >
                                                                <i class="fas fa-edit"></i>
                                                            </button>
                                                        </template>
                                                        <template v-else>
                                                            <div class="serving-input-with-unit">
                                                                <input
                                                                    type="text"
                                                                    v-model="product.editLabelServing"
                                                                    @blur="saveServingField(meal.key, idx, 'label')"
                                                                    @keydown.enter.prevent.stop
                                                                    @keyup.enter="saveServingField(meal.key, idx, 'label')"
                                                                    @keyup.esc="cancelEditingServing(meal.key, idx, 'label')"
                                                                    class="serving-input"
                                                                    :ref="`label-serving-${meal.key}-${idx}`"
                                                                    :disabled="savingFields && savingFields[`${editPlanForm.id}-${product.id}-${meal.key}-label`]"
                                                                />
                                                                <span class="unit-suffix-input">{{ product.unit || 'gm' }}</span>
                                                                <span v-if="savingFields && savingFields[`${editPlanForm.id}-${product.id}-${meal.key}-label`]" class="saving-loader-input">
                                                                    <i class="fas fa-spinner fa-spin"></i>
                                                                </span>
                                                            </div>
                                                        </template>
                                                    </div>
                                                </td>
                                                <td class="protein-cell">
                                                    {{ Math.round((product.protein || 0) * (product.quantity || 1) * 10) / 10 }}
                                                </td>
                                                <td class="total-carb-cell">
                                                    {{ Math.round(((product.carbohydrate || product.carbs || 0) * (product.quantity || 1)) * 10) / 10 }}
                                                </td>
                                                <td class="net-carbs-cell">
                                                    {{ Math.round((((product.carbohydrate || product.carbs || 0) - (product.fiber || 0)) * (product.quantity || 1)) * 10) / 10 }}
                                                </td>
                                                <td class="fat-cell">
                                                    {{ Math.round((product.fat || 0) * (product.quantity || 1) * 10) / 10 }}
                                                </td>
                                                <td class="fiber-cell">
                                                    {{ Math.round((product.fiber || 0) * (product.quantity || 1) * 10) / 10 }}
                                                </td>
                                                <td class="sodium-cell">
                                                    {{ Math.round((product.sodium || 0) * (product.quantity || 1)) }}
                                                </td>
                                                <td class="potassium-cell">
                                                    {{ Math.round((product.potassium || 0) * (product.quantity || 1)) }}
                                                </td>
                                                <td class="calories-cell">
                                                    {{ Math.round((product.calories || 0) * (product.quantity || 1)) }}
                                                </td>
                                                <td class="notes-cell">
                                                    <div class="notes-edit-container">
                                                        <template v-if="!editingServingFields[`${meal.key}-${idx}-notes`]">
                                                            <span class="notes-value">
                                                                {{ product.notes || 'N/A' }}
                                                            </span>
                                                            <span v-if="savingFields && savingFields[`${editPlanForm.id}-${product.id}-${meal.key}-notes`]" class="saving-loader">
                                                                <i class="fas fa-spinner fa-spin"></i>
                                                            </span>
                                                            <button
                                                                v-else
                                                                type="button"
                                                                @click.stop="startEditingServing(meal.key, idx, 'notes')"
                                                                class="edit-serving-icon-btn"
                                                                title="Edit Notes"
                                                            >
                                                                <i class="fas fa-edit"></i>
                                                            </button>
                                                        </template>
                                                        <template v-else>
                                                            <div class="serving-input-with-unit">
                                                                <input
                                                                    type="text"
                                                                    v-model="product.editNotes"
                                                                    @blur="saveServingField(meal.key, idx, 'notes')"
                                                                    @keydown.enter.prevent.stop
                                                                    @keyup.enter="saveServingField(meal.key, idx, 'notes')"
                                                                    @keyup.esc="cancelEditingServing(meal.key, idx, 'notes')"
                                                                    class="serving-input"
                                                                    :ref="`notes-${meal.key}-${idx}`"
                                                                    :disabled="savingFields && savingFields[`${editPlanForm.id}-${product.id}-${meal.key}-notes`]"
                                                                />
                                                                <span v-if="savingFields && savingFields[`${editPlanForm.id}-${product.id}-${meal.key}-notes`]" class="saving-loader-input">
                                                                    <i class="fas fa-spinner fa-spin"></i>
                                                                </span>
                                                            </div>
                                                        </template>
                                                    </div>
                                                </td>
                                                <td class="actions-cell">
                                                    <button
                                                        type="button"
                                                        @click.stop="removeProductFromMeal(meal.key, idx)"
                                                        class="remove-product-btn"
                                                        title="Remove food"
                                                    >
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <!-- Totals Row -->
                                            <tr class="meal-totals-row">
                                                <td class="totals-label-cell" colspan="2" style="padding: 10px;">
                                                    <strong>Total</strong>
                                                </td>
                                                <td class="protein-cell">
                                                    <strong>{{ getMealTotal(meal.key, 'protein') }}</strong>
                                                </td>
                                                <td class="total-carb-cell">
                                                    <strong>{{ getMealTotal(meal.key, 'totalCarb') }}</strong>
                                                </td>
                                                <td class="net-carbs-cell">
                                                    <strong>{{ getMealTotal(meal.key, 'netCarbs') }}</strong>
                                                </td>
                                                <td class="fat-cell">
                                                    <strong>{{ getMealTotal(meal.key, 'fat') }}</strong>
                                                </td>
                                                <td class="fiber-cell">
                                                    <strong>{{ getMealTotal(meal.key, 'fiber') }}</strong>
                                                </td>
                                                <td class="sodium-cell">
                                                    <strong>{{ getMealTotal(meal.key, 'sodium') }}</strong>
                                                </td>
                                                <td class="potassium-cell">
                                                    <strong>{{ getMealTotal(meal.key, 'potassium') }}</strong>
                                                </td>
                                                <td class="calories-cell">
                                                    <strong>{{ getMealTotal(meal.key, 'calories') }}</strong>
                                                </td>
                                                <td class="notes-cell" colspan="2"></td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                        </div>

                        <!-- Add Products Modal (Inside Edit Meal Plan Modal) -->
                        <div
                            v-if="showAddProductModal && showEditMealPlanModal"
                            class="nested-modal-overlay"
                            @click="closeAddProductModal"
                        >
                            <div class="nested-modal-content" @click.stop>
                                <!-- Header -->
                                <div class="nested-modal-header">
                                    <h4 class="nested-modal-title">
                                        <i class="fas fa-utensils mr-2"></i>
                                        Add Products - {{ getMealName(currentMealKey) }}
                                    </h4>
                                    <button
                                        class="nested-modal-close"
                                        @click="closeAddProductModal"
                                    >
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>

                                <!-- Content -->
                                <div class="nested-modal-body">
                                    <div class="add-products-container">
                                        <!-- Search Section -->
                                        <div class="search-section">
                                            <div class="search-box-wrapper">
                                                <i class="fas fa-search search-icon"></i>
                                                <input
                                                    id="productName"
                                                    v-model="newProductName"
                                                    type="text"
                                                    placeholder="Search products..."
                                                    class="search-input-large"
                                                    @input="filterProducts"
                                                />
                                                <span v-if="foodsTotal > 0" class="results-count">
                                                    {{ (filteredProducts && Array.isArray(filteredProducts) ? filteredProducts.length : 0) }} of {{ foodsTotal }} found
                                                </span>
                                            </div>
                                        </div>

                                        <!-- Products Layout -->
                                        <div class="products-layout">
                                            <!-- Available Products -->
                                            <div class="available-products-column">
                                                <div v-if="loadingFoods" class="loading-products">
                                                    <i class="fas fa-spinner fa-spin"></i> Loading foods...
                                                </div>
                                                <div v-else-if="foodsError" class="error-products">
                                                    <i class="fas fa-exclamation-triangle"></i>
                                                    {{ foodsError }}
                                                    <button @click="fetchAllFoods" class="retry-btn mt-2">Retry</button>
                                                </div>
                                                <div v-else-if="(!filteredProducts || !Array.isArray(filteredProducts) || filteredProducts.length === 0) && !loadingFoods" class="no-products">
                                                    <i class="fas fa-search"></i>
                                                    <p v-if="newProductName && newProductName.trim()">No products found matching "{{ newProductName }}"</p>
                                                    <p v-else>Start typing to search for products...</p>
                                                </div>
                                                <div v-else class="fetched-products-list">
                                                    <div
                                                        v-for="(product, index) in filteredProducts"
                                                        :key="`${product.food_id || product.id || index}`"
                                                        class="product-item-display clickable-product"
                                                        @click="addFetchedProductToMeal(product)"
                                                        title="Click to add to meal"
                                                    >
                                                        <div class="product-info">
                                                            <div class="product-header">
                                                                <span class="product-name">{{ product.name }}</span>
                                                                <span
                                                                    v-if="product.serving_description"
                                                                    class="product-serving"
                                                                >{{ product.serving_description }}</span>
                                                            </div>
                                                            <div
                                                                v-if="product.description"
                                                                class="product-description"
                                                            >
                                                                {{ product.description }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- Load More Button -->
                                                    <div v-if="foodsCurrentPage < foodsLastPage" class="load-more-container mt-3">
                                                        <button 
                                                            @click="loadMoreFoods" 
                                                            :disabled="foodsLoadingMore"
                                                            class="btn btn-primary btn-sm load-more-btn"
                                                        >
                                                            <i v-if="foodsLoadingMore" class="fas fa-spinner fa-spin"></i>
                                                            <span v-else>Load More</span>
                                                            <span v-if="foodsLoadingMore">Loading...</span>
                                                        </button>
                                                        <p class="text-muted mt-2 small">
                                                            Showing {{ (filteredProducts && Array.isArray(filteredProducts) ? filteredProducts.length : 0) }} of {{ foodsTotal }} foods
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Current Products -->
                                            <div class="current-products-column">
                                                <div class="current-products-header">
                                                    <span class="current-count">
                                                        {{ (mealProducts[currentMealKey] && Array.isArray(mealProducts[currentMealKey]) && mealProducts[currentMealKey].length > 0) ? mealProducts[currentMealKey].length : 0 }} added
                                                    </span>
                                                </div>
                                                <div class="current-products-list">
                                                    <div
                                                        v-if="!mealProducts[currentMealKey] || !Array.isArray(mealProducts[currentMealKey]) || mealProducts[currentMealKey].length === 0"
                                                        class="no-products"
                                                    >
                                                        <i class="fas fa-inbox"></i>
                                                        <p>No products added yet</p>
                                                    </div>
                                                    <div v-else class="products-grid">
                                                        <div
                                                            v-for="(product, index) in (mealProducts[currentMealKey] || [])"
                                                            :key="index"
                                                            class="product-item-display"
                                                        >
                                                            <div class="product-info">
                                                                <div class="product-header">
                                                                    <span class="product-name">{{
                                                                        typeof product === "string" ? product : product.name
                                                                    }}</span>
                                                                    <span
                                                                        v-if="typeof product === 'object' && product.serving_description"
                                                                        class="product-serving"
                                                                    >{{ product.serving_description }}</span>
                                                                </div>
                                                                <div
                                                                    v-if="typeof product === 'object' && product.description"
                                                                    class="product-description"
                                                                >
                                                                    {{ product.description }}
                                                                </div>
                                                                <span
                                                                    v-if="typeof product === 'object' && product.calories"
                                                                    class="product-calories"
                                                                >
                                                                    {{ Math.round((product.calories || 0) * (product.quantity || 1)) }} kcal
                                                                </span>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                class="remove-product-btn"
                                                                @click="removeProductFromMeal(currentMealKey, index)"
                                                                title="Remove product"
                                                            >
                                                                <i class="fas fa-times"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="form-actions-modern">
                            <button
                                type="button"
                                @click="closeEditMealPlanModal"
                                class="btn-secondary-modern"
                            >
                                Cancel
                            </button>
                            
                            <button 
                                type="submit" 
                                :disabled="editPlanForm.saving"
                                class="btn-primary-modern"
                            >
                                <span v-if="editPlanForm.saving" class="spinner-border spinner-border-sm mr-2"></span>
                                <i v-if="!editPlanForm.saving" class="fas fa-save"></i>
                                {{ editPlanForm.saving ? 'Saving...' : 'Save Changes' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Add Products Modal (Only shown when Edit Meal Plan modal is NOT open) -->
        <b-modal
            id="add-products-modal"
            v-model="showAddProductModal"
            v-if="!showEditMealPlanModal"
            title="Add Products"
            size="lg"
            centered
            hide-footer
            class="add-products-modal"
            @hide="closeAddProductModal"
            :no-enforce-focus="true"
            :no-close-on-backdrop="false"
        >
            <div class="modal-header-content">
                <h3>{{ getMealName(currentMealKey) }}</h3>
            </div>

            <div class="add-products-container">
                <!-- Search Section -->
                <div class="search-section">
                    <div class="search-box-wrapper">
                        <i class="fas fa-search search-icon"></i>
                        <input
                            id="productName"
                            v-model="newProductName"
                            type="text"
                            placeholder="Search products..."
                            class="search-input-large"
                            @input="filterProducts"
                        />
                        <span v-if="foodsTotal > 0" class="results-count">
                            {{ (filteredProducts && Array.isArray(filteredProducts) ? filteredProducts.length : 0) }} of {{ foodsTotal }} found
                        </span>
                    </div>
                </div>

                <!-- Single Column Layout -->
                <div class="products-layout">
                    <!-- Available Products -->
                    <div class="available-products-column">
                        <div v-if="loadingFoods" class="loading-products">
                            <i class="fas fa-spinner fa-spin"></i> Loading foods...
                        </div>
                        <div v-else-if="foodsError" class="error-products">
                            <i class="fas fa-exclamation-triangle"></i>
                            {{ foodsError }}
                            <button @click="fetchAllFoods" class="retry-btn mt-2">Retry</button>
                        </div>
                        <div v-else-if="(!filteredProducts || !Array.isArray(filteredProducts) || filteredProducts.length === 0) && !loadingFoods" class="no-products">
                            <i class="fas fa-search"></i>
                            <p v-if="newProductName && newProductName.trim()">No products found matching "{{ newProductName }}"</p>
                            <p v-else>Start typing to search for products...</p>
                        </div>
                        <div v-else class="fetched-products-list">
                            <div
                                v-for="(product, index) in filteredProducts"
                                :key="`${product.food_id || product.id || index}`"
                                class="product-item-display clickable-product"
                                @click="addFetchedProductToMeal(product)"
                                title="Click to add to meal"
                            >
                                <div class="product-info">
                                    <div class="product-header">
                                        <span class="product-name">{{ product.name }}</span>
                                        <span
                                            v-if="product.serving_description"
                                            class="product-serving"
                                        >{{ product.serving_description }}</span>
                                    </div>
                                    <div
                                        v-if="product.description"
                                        class="product-description"
                                    >
                                        {{ product.description }}
                                    </div>
                                </div>
                            </div>
                            <!-- Load More Button -->
                            <div v-if="foodsCurrentPage < foodsLastPage" class="load-more-container mt-3">
                                <button 
                                    @click="loadMoreFoods" 
                                    :disabled="foodsLoadingMore"
                                    class="btn btn-primary btn-sm load-more-btn"
                                >
                                    <i v-if="foodsLoadingMore" class="fas fa-spinner fa-spin"></i>
                                    <span v-else>Load More</span>
                                    <span v-if="foodsLoadingMore">Loading...</span>
                                </button>
                                <p class="text-muted mt-2 small">
                                    Showing {{ (filteredProducts && Array.isArray(filteredProducts) ? filteredProducts.length : 0) }} of {{ foodsTotal }} foods
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Current Products -->
                    <div class="current-products-column">
                        <div class="current-products-header">
                            <span class="current-count">
                                {{ (mealProducts[currentMealKey] && Array.isArray(mealProducts[currentMealKey]) && mealProducts[currentMealKey].length > 0) ? mealProducts[currentMealKey].length : 0 }} added
                            </span>
                        </div>
                        <div class="current-products-list">
                            <div
                                v-if="!mealProducts[currentMealKey] || !Array.isArray(mealProducts[currentMealKey]) || mealProducts[currentMealKey].length === 0"
                                class="no-products"
                            >
                                <i class="fas fa-inbox"></i>
                                <p>No products added yet</p>
                            </div>
                            <div v-else class="products-grid">
                                <div
                                    v-for="(product, index) in (mealProducts[currentMealKey] || [])"
                                    :key="index"
                                    class="product-item-display"
                                >
                                    <div class="product-info">
                                        <div class="product-header">
                                            <span class="product-name">{{
                                                typeof product === "string" ? product : product.name
                                            }}</span>
                                            <span
                                                v-if="typeof product === 'object' && product.serving_description"
                                                class="product-serving"
                                            >{{ product.serving_description }}</span>
                                        </div>
                                        <div
                                            v-if="typeof product === 'object' && product.description"
                                            class="product-description"
                                        >
                                            {{ product.description }}
                                        </div>
                                        <span
                                            v-if="typeof product === 'object' && product.calories"
                                            class="product-calories"
                                        >
                                            {{ Math.round((product.calories || 0) * (product.quantity || 1)) }} kcal
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        class="remove-product-btn"
                                        @click="removeProductFromMeal(currentMealKey, index)"
                                        title="Remove product"
                                    >
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>

        <!-- Mail Modal -->
        <b-modal
            id="mailModal"
            title="Send Email"
            size="lg"
            centered
            scrollable
            @hidden="resetMailForm"
        >
            <div class="mail-content">
                <div class="mail-form">
                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-envelope mr-1"></i>
                            To
                        </label>
                        <b-form-input
                            v-model="mailForm.to"
                            type="email"
                            placeholder="Enter recipient email"
                            class="form-input"
                            readonly
                        ></b-form-input>
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-user mr-1"></i>
                            Recipient Name
                        </label>
                        <b-form-input
                            v-model="mailForm.recipientName"
                            type="text"
                            placeholder="Recipient name"
                            class="form-input"
                            readonly
                        ></b-form-input>
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-heading mr-1"></i>
                            Subject
                        </label>
                        <b-form-input
                            v-model="mailForm.subject"
                            type="text"
                            placeholder="Enter email subject"
                            class="form-input"
                        ></b-form-input>
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-file-alt mr-1"></i>
                            Message
                        </label>
                        <b-form-textarea
                            v-model="mailForm.message"
                            placeholder="Enter your message here..."
                            rows="8"
                            class="form-textarea"
                        ></b-form-textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-file-alt mr-1"></i>
                            Template
                        </label>
                        <b-form-select
                            v-model="mailForm.template"
                            :options="emailTemplates"
                            class="form-select"
                            @change="applyTemplate"
                        >
                            <template #first>
                                <b-form-select-option :value="null">Select a template (optional)</b-form-select-option>
                            </template>
                        </b-form-select>
                    </div>
                </div>
            </div>
            
            <template #modal-footer>
                <div class="modal-footer-actions">
                    <b-button 
                        variant="secondary" 
                        @click="$bvModal.hide('mailModal')"
                        class="btn-cancel-mail"
                    >
                        Cancel
                    </b-button>
                    <b-button 
                        variant="primary" 
                        @click="sendEmail"
                        :disabled="mailForm.sending"
                        class="btn-send-mail"
                    >
                        <i class="fas fa-envelope mr-2" v-if="!mailForm.sending"></i>
                        <div class="spinner spinner-sm mr-2" v-if="mailForm.sending"></div>
                        {{ mailForm.sending ? 'Sending...' : 'Send Email' }}
                    </b-button>
                </div>
            </template>
        </b-modal>

        <!-- Add Products Modal (Only shown when Edit Meal Plan modal is NOT open) -->
        <b-modal
            id="add-products-modal"
            v-model="showAddProductModal"
            v-if="!showEditMealPlanModal"
            title="Add Products"
            size="lg"
            centered
            hide-footer
            class="add-products-modal"
            @hide="closeAddProductModal"
            :no-enforce-focus="true"
            :no-close-on-backdrop="false"
        >
            <div class="modal-header-content">
                <h3>{{ getMealName(currentMealKey) }}</h3>
            </div>

            <div class="add-products-container">
                <!-- Search Section -->
                <div class="search-section">
                    <div class="search-box-wrapper">
                        <i class="fas fa-search search-icon"></i>
                        <input
                            id="productName"
                            v-model="newProductName"
                            type="text"
                            placeholder="Search products..."
                            class="search-input-large"
                            @input="filterProducts"
                        />
                        <span v-if="foodsTotal > 0" class="results-count">
                            {{ (filteredProducts && Array.isArray(filteredProducts) ? filteredProducts.length : 0) }} of {{ foodsTotal }} found
                        </span>
                    </div>
                </div>

                <!-- Single Column Layout -->
                <div class="products-layout">
                    <!-- Available Products -->
                    <div class="available-products-column">
                        <div v-if="loadingFoods" class="loading-products">
                            <i class="fas fa-spinner fa-spin"></i> Loading foods...
                        </div>
                        <div v-else-if="foodsError" class="error-products">
                            <i class="fas fa-exclamation-triangle"></i>
                            {{ foodsError }}
                            <button @click="fetchAllFoods" class="retry-btn mt-2">Retry</button>
                        </div>
                        <div v-else-if="(!filteredProducts || !Array.isArray(filteredProducts) || filteredProducts.length === 0) && !loadingFoods" class="no-products">
                            <i class="fas fa-search"></i>
                            <p v-if="newProductName && newProductName.trim()">No products found matching "{{ newProductName }}"</p>
                            <p v-else>Start typing to search for products...</p>
                        </div>
                        <div v-else class="fetched-products-list">
                            <div
                                v-for="(product, index) in filteredProducts"
                                :key="`${product.food_id || product.id || index}`"
                                class="product-item-display clickable-product"
                                @click="addFetchedProductToMeal(product)"
                                title="Click to add to meal"
                            >
                                <div class="product-info">
                                    <div class="product-header">
                                        <span class="product-name">{{ product.name }}</span>
                                        <span
                                            v-if="product.serving_description"
                                            class="product-serving"
                                        >{{ product.serving_description }}</span>
                                    </div>
                                    <div
                                        v-if="product.description"
                                        class="product-description"
                                    >
                                        {{ product.description }}
                                    </div>
                                </div>
                            </div>
                            <!-- Load More Button -->
                            <div v-if="foodsCurrentPage < foodsLastPage" class="load-more-container mt-3">
                                <button 
                                    @click="loadMoreFoods" 
                                    :disabled="foodsLoadingMore"
                                    class="btn btn-primary btn-sm load-more-btn"
                                >
                                    <i v-if="foodsLoadingMore" class="fas fa-spinner fa-spin"></i>
                                    <span v-else>Load More</span>
                                    <span v-if="foodsLoadingMore">Loading...</span>
                                </button>
                                <p class="text-muted mt-2 small">
                                    Showing {{ (filteredProducts && Array.isArray(filteredProducts) ? filteredProducts.length : 0) }} of {{ foodsTotal }} foods
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Current Products -->
                    <div class="current-products-column">
                        <div class="current-products-header">
                            <span class="current-count">
                                {{ (mealProducts[currentMealKey] && Array.isArray(mealProducts[currentMealKey]) && mealProducts[currentMealKey].length > 0) ? mealProducts[currentMealKey].length : 0 }} added
                            </span>
                        </div>
                        <div class="current-products-list">
                            <div
                                v-if="!mealProducts[currentMealKey] || !Array.isArray(mealProducts[currentMealKey]) || mealProducts[currentMealKey].length === 0"
                                class="no-products"
                            >
                                <i class="fas fa-inbox"></i>
                                <p>No products added yet</p>
                            </div>
                            <div v-else class="products-grid">
                                <div
                                    v-for="(product, index) in (mealProducts[currentMealKey] || [])"
                                    :key="index"
                                    class="product-item-display"
                                >
                                    <div class="product-info">
                                        <div class="product-header">
                                            <span class="product-name">{{
                                                typeof product === "string" ? product : product.name
                                            }}</span>
                                            <span
                                                v-if="typeof product === 'object' && product.serving_description"
                                                class="product-serving"
                                            >{{ product.serving_description }}</span>
                                        </div>
                                        <div
                                            v-if="typeof product === 'object' && product.description"
                                            class="product-description"
                                        >
                                            {{ product.description }}
                                        </div>
                                        <span
                                            v-if="typeof product === 'object' && product.calories"
                                            class="product-calories"
                                        >
                                            {{ Math.round((product.calories || 0) * (product.quantity || 1)) }} kcal
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        class="remove-product-btn"
                                        @click="removeProductFromMeal(currentMealKey, index)"
                                        title="Remove product"
                                    >
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
import NProgress from 'nprogress';
import { VueEditor } from 'vue2-editor';

export default {
    name: 'MemberDetail',
    components: {
        VueEditor,
    },
    metaInfo() {
        return {
            title: `${this.memberName} - Member Detail - Nutrition Hub`,
        };
    },
    data() {
        return {
            loading: false,
            member: {},
            mealPlans: [],
            instructions: '',
            weightTrainingCardio: '',
            supplements: '',
            notes: '',
            attachments: [],
            activeTab: 'instructions',
            editingInstructions: false,
            editingWeightTraining: false,
            editingSupplements: false,
            editingNotes: false,
            instructionsEdit: '',
            weightTrainingCardioEdit: '',
            supplementsEdit: '',
            notesEdit: '',
            savingInstructions: false,
            savingWeightTraining: false,
            savingSupplements: false,
            savingNotes: false,
            showAttachmentModal: false,
            showEditMealPlanModal: false,
            selectedFile: null,
            customToolbar: [
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'header': [1, 2, 3, false] }],
                ['link'],
                [{ 'align': [] }],
            ],
            // Mail modal related
            mailForm: {
                to: "",
                recipientName: "",
                subject: "",
                message: "",
                template: null,
                sending: false,
                memberId: null
            },
            emailTemplates: [
                { value: 'welcome', text: 'Welcome Message' },
                { value: 'membership_reminder', text: 'Membership Reminder' },
                { value: 'payment_reminder', text: 'Payment Reminder' },
                { value: 'workout_reminder', text: 'Workout Reminder' },
                { value: 'custom', text: 'Custom Message' }
            ],
            // Edit plan form
            editPlanForm: {
                id: null,
                name: '',
                description: '',
                calories: null,
                protein: null,
                carbs: null,
                fats: null,
                start_date: '',
                end_date: '',
                notes: '',
                created_by: 'N/A',
                created_at: null,
                updated_at: null,
                last_modified: null,
                saving: false
            },
            // Meal cards and products
            mealCards: [
                { key: "breakfast", label: "Breakfast", icon: "fas fa-coffee" },
                { key: "snacks1", label: "Snacks (Morning)", icon: "fas fa-apple-alt" },
                { key: "lunch", label: "Lunch", icon: "fas fa-hamburger" },
                { key: "snacks2", label: "Snacks (Afternoon)", icon: "fas fa-ice-cream" },
                { key: "dinner", label: "Dinner", icon: "fas fa-drumstick-bite" },
                { key: "snacks3", label: "Snacks (Evening)", icon: "fas fa-cookie-bite" },
            ],
            mealProducts: {
                breakfast: [],
                snacks1: [],
                lunch: [],
                snacks2: [],
                dinner: [],
                snacks3: [],
            },
            expandedMeals: {
                breakfast: false,
                snacks1: false,
                lunch: false,
                snacks2: false,
                dinner: false,
                snacks3: false,
            },
            // Editing serving fields
            editingServingFields: {},
            savingFields: {},
            // Add Products Modal
            showAddProductModal: false,
            currentMealKey: '',
            newProductName: '',
            fetchedProducts: [],
            foodsTotal: 0,
            foodsCurrentPage: 1,
            foodsLastPage: 1,
            loadingFoods: false,
            foodsLoadingMore: false,
            foodsError: null,
            // Math object for template use
            Math: Math,
        };
    },
    computed: {
        memberName() {
            if (!this.member || Object.keys(this.member).length === 0) {
                return 'Loading...';
            }
            if (this.member.membername) return this.member.membername;
            if (this.member.first_name || this.member.last_name) {
                return `${this.member.first_name || ''} ${this.member.last_name || ''}`.trim();
            }
            // Also check for firstname/lastname (without underscore) as fallback
            if (this.member.firstname || this.member.lastname) {
                return `${this.member.firstname || ''} ${this.member.lastname || ''}`.trim();
            }
            return this.member.name || 'Member';
        },
        filteredProducts() {
            const products = this.fetchedProducts || [];
            if (!Array.isArray(products)) {
                return [];
            }
            if (!this.newProductName || !this.newProductName.trim()) {
                return products;
            }
            const query = this.newProductName.toLowerCase();
            return products.filter(product => {
                if (!product || !product.name) return false;
                return product.name.toLowerCase().includes(query) ||
                    (product.description && product.description.toLowerCase().includes(query));
            });
        },
    },
    mounted() {
        // Initialize meal products and expanded meals
        this.initializeMealData();
        this.fetchMemberData();
    },
    watch: {
        '$route.params.memberId'() {
            this.fetchMemberData();
        },
    },
    methods: {
        getMealProducts(mealKey) {
            const products = this.mealProducts[mealKey];
            if (!products || !Array.isArray(products)) {
                return [];
            }
            const isExpanded = this.expandedMeals[mealKey] === true;
            return isExpanded ? products : products.slice(0, 2);
        },
        getExpandedState(mealKey) {
            return this.expandedMeals[mealKey] === true;
        },
        getMoreProductsCount(mealKey) {
            const products = this.mealProducts[mealKey];
            if (!products || !Array.isArray(products)) {
                return 0;
            }
            return Math.max(0, products.length - 2);
        },
        hasMoreProducts(mealKey) {
            const products = this.mealProducts[mealKey];
            return products && Array.isArray(products) && products.length > 2;
        },
        initializeMealData() {
            // Initialize meal products for all meal keys
            if (this.mealCards && Array.isArray(this.mealCards)) {
                this.mealCards.forEach(meal => {
                    if (meal && meal.key) {
                        if (!this.mealProducts[meal.key]) {
                            this.$set(this.mealProducts, meal.key, []);
                        }
                        if (this.expandedMeals[meal.key] === undefined) {
                            this.$set(this.expandedMeals, meal.key, false);
                        }
                    }
                });
            }
        },
        goBack() {
            this.$router.push('/app/nutrition/members');
        },
        async fetchMemberData() {
            const memberId = this.$route.params.memberId;
            if (!memberId) {
                this.$router.push('/app/nutrition/members');
                return;
            }

            this.loading = true;
            NProgress.start();

            try {
                // Fetch member basic info
                const memberResponse = await axios.get(`members/${memberId}`);
                if (memberResponse.data) {
                    // API returns data in 'client' property, but also check for 'member' for compatibility
                    this.member = memberResponse.data.client || memberResponse.data.member || memberResponse.data;
                }

                // Fetch meal plans
                await this.fetchMealPlans();

                // Fetch instructions, supplements, weight training
                await Promise.all([
                    this.fetchInstructions(),
                    this.fetchSupplements(),
                    this.fetchWeightTrainingCardio(),
                    this.fetchNotes(),
                    this.fetchAttachments(),
                ]);
            } catch (error) {
                console.error('Error fetching member data:', error);
                this.$swal({
                    title: 'Error',
                    text: 'Failed to load member data. Please try again.',
                    icon: 'error',
                });
            } finally {
                this.loading = false;
                NProgress.done();
            }
        },
        async fetchMealPlans() {
            try {
                const response = await axios.get(`members/${this.$route.params.memberId}/assigned-meal-plans`);
                if (response.data && response.data.success) {
                    this.mealPlans = response.data.data || [];
                }
            } catch (error) {
                console.error('Error fetching meal plans:', error);
                this.mealPlans = [];
            }
        },
        async fetchInstructions() {
            try {
                const response = await axios.get(`members/${this.$route.params.memberId}/instructions`);
                this.instructions = response.data.instructions || '';
                this.instructionsEdit = this.instructions;
            } catch (error) {
                console.error('Error fetching instructions:', error);
                // If endpoint doesn't exist yet, use empty string
                this.instructions = '';
                this.instructionsEdit = '';
            }
        },
        async fetchSupplements() {
            try {
                const response = await axios.get(`members/${this.$route.params.memberId}/supplements`);
                this.supplements = response.data.supplements || '';
                this.supplementsEdit = this.supplements;
            } catch (error) {
                console.error('Error fetching supplements:', error);
                this.supplements = '';
                this.supplementsEdit = '';
            }
        },
        async fetchWeightTrainingCardio() {
            try {
                const response = await axios.get(`members/${this.$route.params.memberId}/weight-training-cardio`);
                this.weightTrainingCardio = response.data.weight_training_cardio || '';
                this.weightTrainingCardioEdit = this.weightTrainingCardio;
            } catch (error) {
                console.error('Error fetching weight training cardio:', error);
                this.weightTrainingCardio = '';
                this.weightTrainingCardioEdit = '';
            }
        },
        async fetchNotes() {
            try {
                const response = await axios.get(`notes/member/${this.$route.params.memberId}`);
                if (response.data && response.data.length > 0) {
                    // Get the latest note or combine all notes
                    this.notes = response.data[0].description || '';
                } else {
                    this.notes = '';
                }
                this.notesEdit = this.notes;
            } catch (error) {
                console.error('Error fetching notes:', error);
                this.notes = '';
                this.notesEdit = '';
            }
        },
        async fetchAttachments() {
            try {
                const response = await axios.get(`members/${this.$route.params.memberId}/documents`);
                if (response.data && Array.isArray(response.data)) {
                    this.attachments = response.data;
                } else if (response.data && response.data.documents) {
                    this.attachments = response.data.documents;
                } else {
                    this.attachments = [];
                }
            } catch (error) {
                console.error('Error fetching attachments:', error);
                this.attachments = [];
            }
        },
        toggleEditInstructions() {
            this.editingInstructions = !this.editingInstructions;
            if (this.editingInstructions) {
                this.instructionsEdit = this.instructions;
            }
        },
        async saveInstructions() {
            this.savingInstructions = true;
            try {
                await axios.put(`members/${this.$route.params.memberId}/instructions`, {
                    instructions: this.instructionsEdit,
                });
                this.instructions = this.instructionsEdit;
                this.editingInstructions = false;
                this.$swal({
                    title: 'Success',
                    text: 'Instructions saved successfully',
                    icon: 'success',
                });
            } catch (error) {
                console.error('Error saving instructions:', error);
                this.$swal({
                    title: 'Error',
                    text: 'Failed to save instructions. Please try again.',
                    icon: 'error',
                });
            } finally {
                this.savingInstructions = false;
            }
        },
        cancelEditInstructions() {
            this.instructionsEdit = this.instructions;
            this.editingInstructions = false;
        },
        toggleEditWeightTraining() {
            this.editingWeightTraining = !this.editingWeightTraining;
            if (this.editingWeightTraining) {
                this.weightTrainingCardioEdit = this.weightTrainingCardio;
            }
        },
        async saveWeightTraining() {
            this.savingWeightTraining = true;
            try {
                await axios.put(`members/${this.$route.params.memberId}/weight-training-cardio`, {
                    weight_training_cardio: this.weightTrainingCardioEdit,
                });
                this.weightTrainingCardio = this.weightTrainingCardioEdit;
                this.editingWeightTraining = false;
                this.$swal({
                    title: 'Success',
                    text: 'Weight Training & Cardio saved successfully',
                    icon: 'success',
                });
            } catch (error) {
                console.error('Error saving weight training:', error);
                this.$swal({
                    title: 'Error',
                    text: 'Failed to save. Please try again.',
                    icon: 'error',
                });
            } finally {
                this.savingWeightTraining = false;
            }
        },
        cancelEditWeightTraining() {
            this.weightTrainingCardioEdit = this.weightTrainingCardio;
            this.editingWeightTraining = false;
        },
        toggleEditSupplements() {
            this.editingSupplements = !this.editingSupplements;
            if (this.editingSupplements) {
                this.supplementsEdit = this.supplements;
            }
        },
        async saveSupplements() {
            this.savingSupplements = true;
            try {
                await axios.put(`members/${this.$route.params.memberId}/supplements`, {
                    supplements: this.supplementsEdit,
                });
                this.supplements = this.supplementsEdit;
                this.editingSupplements = false;
                this.$swal({
                    title: 'Success',
                    text: 'Supplements saved successfully',
                    icon: 'success',
                });
            } catch (error) {
                console.error('Error saving supplements:', error);
                this.$swal({
                    title: 'Error',
                    text: 'Failed to save. Please try again.',
                    icon: 'error',
                });
            } finally {
                this.savingSupplements = false;
            }
        },
        cancelEditSupplements() {
            this.supplementsEdit = this.supplements;
            this.editingSupplements = false;
        },
        toggleEditNotes() {
            this.editingNotes = !this.editingNotes;
            if (this.editingNotes) {
                this.notesEdit = this.notes;
            }
        },
        async saveNotes() {
            this.savingNotes = true;
            try {
                // Use notes API endpoint
                const response = await axios.get(`notes/member/${this.$route.params.memberId}`);
                if (response.data && response.data.length > 0) {
                    // Update existing note
                    await axios.put(`notes/${response.data[0].id}`, {
                        description: this.notesEdit,
                    });
                } else {
                    // Create new note
                    await axios.post('notes', {
                        member_id: this.$route.params.memberId,
                        description: this.notesEdit,
                    });
                }
                this.notes = this.notesEdit;
                this.editingNotes = false;
                this.$swal({
                    title: 'Success',
                    text: 'Notes saved successfully',
                    icon: 'success',
                });
            } catch (error) {
                console.error('Error saving notes:', error);
                this.$swal({
                    title: 'Error',
                    text: 'Failed to save. Please try again.',
                    icon: 'error',
                });
            } finally {
                this.savingNotes = false;
            }
        },
        cancelEditNotes() {
            this.notesEdit = this.notes;
            this.editingNotes = false;
        },
        handleFileSelect(event) {
            this.selectedFile = event.target.files[0];
        },
        async uploadAttachment() {
            if (!this.selectedFile) {
                this.$swal({
                    title: 'Error',
                    text: 'Please select a file',
                    icon: 'error',
                });
                return;
            }

            const formData = new FormData();
            formData.append('file', this.selectedFile);

            try {
                await axios.post(`members/${this.$route.params.memberId}/documents`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                await this.fetchAttachments();
                this.showAttachmentModal = false;
                this.selectedFile = null;
                if (this.$refs.fileInput) {
                    this.$refs.fileInput.value = '';
                }
                this.$swal({
                    title: 'Success',
                    text: 'Attachment uploaded successfully',
                    icon: 'success',
                });
            } catch (error) {
                console.error('Error uploading attachment:', error);
                this.$swal({
                    title: 'Error',
                    text: 'Failed to upload attachment. Please try again.',
                    icon: 'error',
                });
            }
        },
        cancelAttachmentUpload() {
            this.selectedFile = null;
            if (this.$refs.fileInput) {
                this.$refs.fileInput.value = '';
            }
        },
        async deleteAttachment(attachmentId) {
            try {
                const result = await this.$swal({
                    title: 'Are you sure?',
                    text: 'This action cannot be undone',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it',
                });

                if (result.isConfirmed) {
                    await axios.delete(`members/${this.$route.params.memberId}/documents/${attachmentId}`);
                    await this.fetchAttachments();
                    this.$swal({
                        title: 'Deleted',
                        text: 'Attachment deleted successfully',
                        icon: 'success',
                    });
                }
            } catch (error) {
                console.error('Error deleting attachment:', error);
                this.$swal({
                    title: 'Error',
                    text: 'Failed to delete attachment. Please try again.',
                    icon: 'error',
                });
            }
        },
        formatDate(date) {
            if (!date) return 'N/A';
            const d = new Date(date);
            return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
        },
        formatDateTime(dateTime) {
            if (!dateTime) return 'N/A';
            const d = new Date(dateTime);
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const year = d.getFullYear();
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            return `${month}/${day}/${year} ${hours}:${minutes}`;
        },
        formatMacro(value) {
            if (!value && value !== 0) return 0;
            // If it's a string, try to parse it
            const num = typeof value === 'string' ? parseFloat(value) : value;
            // Return as integer if it's a whole number, otherwise round to 1 decimal
            return num % 1 === 0 ? num : num.toFixed(1);
        },
        editMember() {
            this.$router.push(`/app/members/memberdetails/${this.$route.params.memberId}`);
        },
        emailMember() {
            // Set form data from member
            this.mailForm.to = this.member.email || "";
            this.mailForm.recipientName = this.memberName;
            this.mailForm.subject = "";
            this.mailForm.message = "";
            this.mailForm.template = null;
            this.mailForm.sending = false;
            this.mailForm.memberId = this.$route.params.memberId || null;
            
            // Show modal
            this.$bvModal.show('mailModal');
        },
        
        resetMailForm() {
            this.mailForm = {
                to: "",
                recipientName: "",
                subject: "",
                message: "",
                template: null,
                sending: false,
                memberId: null
            };
        },
        
        applyTemplate() {
            if (!this.mailForm.template) return;

            const templates = {
                welcome: {
                    subject: "Welcome to Our Fitness Center!",
                    message: `Dear ${this.mailForm.recipientName},\n\nWelcome to our fitness center! We're excited to have you as a member of our community.\n\nYour membership is now active and you can start enjoying all our facilities and services.\n\nIf you have any questions or need assistance, please don't hesitate to contact us.\n\nBest regards,\nThe Fitness Team`
                },
                membership_reminder: {
                    subject: "Membership Reminder",
                    message: `Dear ${this.mailForm.recipientName},\n\nThis is a friendly reminder about your membership status.\n\nPlease ensure your membership is up to date to continue enjoying our services.\n\nIf you have any questions about your membership, please contact us.\n\nBest regards,\nThe Fitness Team`
                },
                payment_reminder: {
                    subject: "Payment Reminder",
                    message: `Dear ${this.mailForm.recipientName},\n\nThis is a reminder that your membership payment is due.\n\nPlease ensure your payment is processed to avoid any interruption in your services.\n\nIf you have already made the payment, please disregard this message.\n\nBest regards,\nThe Fitness Team`
                },
                workout_reminder: {
                    subject: "Workout Reminder",
                    message: `Dear ${this.mailForm.recipientName},\n\nDon't forget about your scheduled workout today!\n\nWe look forward to seeing you at the gym and helping you achieve your fitness goals.\n\nIf you need to reschedule, please let us know in advance.\n\nBest regards,\nThe Fitness Team`
                },
                custom: {
                    subject: "",
                    message: ""
                }
            };

            const template = templates[this.mailForm.template];
            if (template) {
                this.mailForm.subject = template.subject;
                this.mailForm.message = template.message;
            }
        },
        
        async sendEmail() {
            // Validate form
            if (!this.mailForm.to || !this.mailForm.subject || !this.mailForm.message) {
                this.makeToast("warning", "Please fill in all required fields", "Warning");
                return;
            }

            if (!this.mailForm.memberId) {
                this.makeToast("danger", "Member ID not found. Please try again.", "Error");
                return;
            }

            this.mailForm.sending = true;

            try {
                const response = await axios.post(
                    `members/${this.mailForm.memberId}/send-message`,
                    {
                        recipients: this.mailForm.to,
                        subject: this.mailForm.subject,
                        body: this.mailForm.message
                    }
                );

                if (response.data && response.data.success) {
                    this.makeToast("success", response.data.message || "Email sent successfully!", "Success");
                    this.$bvModal.hide('mailModal');
                    this.resetMailForm();
                } else {
                    this.makeToast("danger", response.data.message || "Failed to send email.", "Error");
                }
            } catch (error) {
                console.error('Error sending email:', error);
                const errorMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    "Failed to send email. Please try again.";
                this.makeToast("danger", errorMessage, "Error");
            } finally {
                this.mailForm.sending = false;
            }
        },
        
        makeToast(variant, msg, title) {
            this.$root.$bvToast.toast(msg, {
                title: title || (variant === "success" ? "Success" : variant === "error" ? "Error" : "Info"),
                variant: variant === "error" ? "danger" : variant,
                solid: true,
                toaster: "b-toaster-top-right",
                autoHideDelay: 3000
            });
        },
        deleteMember() {
            this.$swal({
                title: 'Are you sure?',
                text: `Are you sure you want to delete ${this.memberName}? This action cannot be undone.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const memberId = this.$route.params.memberId;
                        const response = await axios.delete(`members/${memberId}`);
                        
                        if (response.data && response.data.success) {
                            this.$swal({
                                title: 'Deleted!',
                                text: response.data.message || 'Member has been deleted.',
                                icon: 'success',
                            });
                            // Redirect to members list after successful deletion
                            this.$router.push('/app/nutrition/members');
                        } else {
                            throw new Error(response.data?.message || 'Failed to delete member');
                        }
                    } catch (error) {
                        console.error('Error deleting member:', error);
                        this.$swal({
                            title: 'Error!',
                            text: error.response?.data?.message || 'Failed to delete member. Please try again.',
                            icon: 'error',
                        });
                    }
                }
            });
        },
        editPlan(plan) {
            // Populate edit form with current plan data
            this.editPlanForm = {
                id: plan.id,
                name: plan.name || plan.template_name || '',
                description: plan.description || '',
                calories: plan.calories || plan.total_calories || null,
                protein: plan.protein || plan.total_protein || null,
                carbs: plan.carbs || plan.total_carbs || null,
                fats: plan.fats || plan.total_fats || null,
                start_date: plan.start_date || '',
                end_date: plan.end_date || '',
                notes: plan.notes || '',
                created_by: plan.created_by || 'N/A',
                created_at: plan.created_at || null,
                updated_at: plan.updated_at || plan.last_modified || null,
                last_modified: plan.last_modified || plan.updated_at || null,
                saving: false
            };
            
            // Reset mealProducts to ensure fresh data
            this.mealProducts = {
                breakfast: [],
                snacks1: [],
                lunch: [],
                snacks2: [],
                dinner: [],
                snacks3: [],
            };
            
            // Populate mealProducts from the fetched plan's meals
            if (plan.meals) {
                // Track snack items separately to distribute across snacks1, snacks2, snacks3
                const snackItems = [];
                const snackKeys = ['snacks1', 'snacks2', 'snacks3'];
                let snackIndex = 0;
                
                Object.keys(plan.meals).forEach(mealType => {
                    if (plan.meals[mealType] && Array.isArray(plan.meals[mealType]) && plan.meals[mealType].length > 0) {
                        // Map meal type to our meal keys
                        let mealKey = mealType.toLowerCase();
                        
                        // Handle snack types - backend may return 'snack' or 'snacks1', 'snacks2', 'snacks3'
                        if (mealKey === 'snack' || mealKey.startsWith('snack')) {
                            // If it's a specific snack type (snacks1, snacks2, snacks3), use it directly
                            if (mealKey === 'snacks1' || mealKey === 'snacks2' || mealKey === 'snacks3') {
                                this.$set(this.mealProducts, mealKey, plan.meals[mealType].map(item => ({
                                    id: item.food?.id || item.food_id,
                                    food_id: item.food?.id || item.food_id,
                                    nutrition_type: item.nutrition_type || mealKey,
                                    name: item.food?.name || '',
                                    serving_description: item.food?.serving_description || '',
                                    quantity: item.quantity || 1,
                                    calories: item.calories || null,
                                    protein: item.protein || null,
                                    carbs: item.carbs || null,
                                    fats: item.fats || null,
                                    label_serving: item.label_serving || null,
                                    notes: item.notes || null,
                                    unit: item.unit || 'gm',
                                })));
                            } else {
                                // If it's generic 'snack', collect items to distribute
                                snackItems.push(...plan.meals[mealType]);
                            }
                        } else {
                            // Regular meal types (breakfast, lunch, dinner)
                            this.$set(this.mealProducts, mealKey, plan.meals[mealType].map(item => ({
                                id: item.food?.id || item.food_id,
                                food_id: item.food?.id || item.food_id,
                                nutrition_type: item.nutrition_type || mealKey,
                                name: item.food?.name || '',
                                serving_description: item.food?.serving_description || '',
                                quantity: item.quantity || 1,
                                calories: item.calories || null,
                                protein: item.protein || null,
                                carbs: item.carbs || null,
                                fats: item.fats || null,
                                label_serving: item.label_serving || null,
                                notes: item.notes || null,
                                unit: item.unit || 'gm',
                            })));
                        }
                    }
                });
                
                // Distribute snack items across snacks1, snacks2, snacks3
                if (snackItems.length > 0) {
                    const itemsPerSnack = Math.ceil(snackItems.length / 3);
                    snackKeys.forEach((snackKey, index) => {
                        const startIndex = index * itemsPerSnack;
                        const endIndex = Math.min(startIndex + itemsPerSnack, snackItems.length);
                        const snackItemsForThisSlot = snackItems.slice(startIndex, endIndex);
                        
                        if (snackItemsForThisSlot.length > 0) {
                            this.$set(this.mealProducts, snackKey, snackItemsForThisSlot.map(item => ({
                                id: item.food?.id || item.food_id,
                                food_id: item.food?.id || item.food_id,
                                // Keep original nutrition_type from backend (often "snack") so inline edits can update correctly
                                nutrition_type: item.nutrition_type || 'snack',
                                name: item.food?.name || '',
                                serving_description: item.food?.serving_description || '',
                                quantity: item.quantity || 1,
                                calories: item.calories || null,
                                protein: item.protein || null,
                                carbs: item.carbs || null,
                                fats: item.fats || null,
                                label_serving: item.label_serving || null,
                                notes: item.notes || null,
                                unit: item.unit || 'gm',
                            })));
                        }
                    });
                }
            }
            
            // Set currentMealKey to the first meal that has products, or default to 'breakfast'
            this.currentMealKey = Object.keys(this.mealProducts).find(key => 
                this.mealProducts[key] && Array.isArray(this.mealProducts[key]) && this.mealProducts[key].length > 0
            ) || 'breakfast';
            
            // Show modal
            this.showEditMealPlanModal = true;
        },
        closeEditMealPlanModal() {
            this.showEditMealPlanModal = false;
            this.resetEditPlanForm();
        },
        resetEditPlanForm() {
            this.editPlanForm = {
                id: null,
                name: '',
                description: '',
                calories: null,
                protein: null,
                carbs: null,
                fats: null,
                start_date: '',
                end_date: '',
                notes: '',
                created_by: 'N/A',
                created_at: null,
                updated_at: null,
                last_modified: null,
                saving: false
            };
            // Reset meal products
            this.mealProducts = {
                breakfast: [],
                snacks1: [],
                lunch: [],
                snacks2: [],
                dinner: [],
                snacks3: [],
            };
            this.expandedMeals = {
                breakfast: false,
                snacks1: false,
                lunch: false,
                snacks2: false,
                dinner: false,
                snacks3: false,
            };
        },
        // Meal products methods
        toggleMealExpansion(mealKey) {
            if (!this.expandedMeals[mealKey]) {
                this.$set(this.expandedMeals, mealKey, false);
            }
            this.$set(this.expandedMeals, mealKey, !this.expandedMeals[mealKey]);
        },
        increaseQuantity(mealKey, index) {
            if (!this.mealProducts[mealKey]) {
                this.$set(this.mealProducts, mealKey, []);
            }
            if (this.mealProducts[mealKey] && Array.isArray(this.mealProducts[mealKey]) && this.mealProducts[mealKey][index]) {
                this.$set(this.mealProducts[mealKey][index], 'quantity', (this.mealProducts[mealKey][index].quantity || 1) + 1);
            }
        },
        decreaseQuantity(mealKey, index) {
            if (!this.mealProducts[mealKey]) {
                this.$set(this.mealProducts, mealKey, []);
            }
            if (this.mealProducts[mealKey] && Array.isArray(this.mealProducts[mealKey]) && this.mealProducts[mealKey][index]) {
                const currentQty = this.mealProducts[mealKey][index].quantity || 1;
                if (currentQty > 1) {
                    this.$set(this.mealProducts[mealKey][index], 'quantity', currentQty - 1);
                }
            }
        },
        openAddProductModal(mealKey) {
            this.currentMealKey = mealKey;
            this.newProductName = '';
            this.showAddProductModal = true;
            this.fetchAllFoods();
        },
        closeAddProductModal() {
            this.showAddProductModal = false;
            this.currentMealKey = '';
            this.newProductName = '';
            this.fetchedProducts = [];
        },
        getMealName(mealKey) {
            const meal = this.mealCards.find(m => m.key === mealKey);
            return meal ? meal.label : 'Meal';
        },
        async fetchAllFoods() {
            this.loadingFoods = true;
            this.foodsError = null;
            this.foodsCurrentPage = 1;
            
            try {
                const params = {
                    page: 1,
                    per_page: 50,
                };
                
                if (this.newProductName && this.newProductName.trim()) {
                    params.search = this.newProductName.trim();
                }
                
                const response = await axios.get('/foods', { params });
                
                if (response.data && response.data.success) {
                    this.fetchedProducts = response.data.data || [];
                    this.foodsTotal = response.data.total || 0;
                    this.foodsLastPage = response.data.last_page || 1;
                } else {
                    throw new Error(response.data?.message || 'Failed to fetch foods');
                }
            } catch (error) {
                console.error('Error fetching foods:', error);
                this.foodsError = error.response?.data?.message || 'Failed to load foods. Please try again.';
                this.fetchedProducts = [];
            } finally {
                this.loadingFoods = false;
            }
        },
        async loadMoreFoods() {
            if (this.foodsCurrentPage >= this.foodsLastPage || this.foodsLoadingMore) return;
            
            this.foodsLoadingMore = true;
            
            try {
                const params = {
                    page: this.foodsCurrentPage + 1,
                    per_page: 50,
                };
                
                if (this.newProductName && this.newProductName.trim()) {
                    params.search = this.newProductName.trim();
                }
                
                const response = await axios.get('/foods', { params });
                
                if (response.data && response.data.success) {
                    const newProducts = response.data.data || [];
                    this.fetchedProducts = [...this.fetchedProducts, ...newProducts];
                    this.foodsCurrentPage = response.data.current_page || this.foodsCurrentPage + 1;
                }
            } catch (error) {
                console.error('Error loading more foods:', error);
            } finally {
                this.foodsLoadingMore = false;
            }
        },
        filterProducts() {
            // Filtering is handled by computed property
            // If search changes significantly, refetch
            if (this.newProductName && this.newProductName.length > 2) {
                this.fetchAllFoods();
            }
        },
        addFetchedProductToMeal(product) {
            if (!this.currentMealKey) return;
            
            if (!this.mealProducts[this.currentMealKey]) {
                this.$set(this.mealProducts, this.currentMealKey, []);
            }
            
            // Ensure it's an array
            if (!Array.isArray(this.mealProducts[this.currentMealKey])) {
                this.$set(this.mealProducts, this.currentMealKey, []);
            }
            
            // Check if product already exists
            const existingIndex = this.mealProducts[this.currentMealKey].findIndex(
                p => (p.food_id && p.food_id === product.food_id) || 
                     (p.food_id && p.food_id === product.id) ||
                     (p.id && p.id === product.food_id) ||
                     (p.id && p.id === product.id)
            );
            
            if (existingIndex >= 0) {
                // Increase quantity if exists
                this.increaseQuantity(this.currentMealKey, existingIndex);
            } else {
                // Add new product
                const productToAdd = {
                    food_id: product.food_id || product.id,
                    id: product.food_id || product.id,
                    nutrition_type: this.currentMealKey,
                    name: product.name,
                    description: product.description,
                    serving_description: product.serving_description,
                    calories: parseFloat(product.calories) || 0,
                    protein: parseFloat(product.protein) || 0,
                    carbs: parseFloat(product.carbohydrate || product.carbs) || 0,
                    fats: parseFloat(product.fat || product.fats) || 0,
                    fiber: parseFloat(product.fiber) || 0,
                    sodium: parseFloat(product.sodium) || 0,
                    potassium: parseFloat(product.potassium) || 0,
                    quantity: 1,
                    label_serving: product.label_serving || product.serving_description || null,
                    notes: product.notes || null,
                    unit: product.unit || 'gm',
                };
                
                this.mealProducts[this.currentMealKey].push(productToAdd);
            }
        },
        removeProductFromMeal(mealKey, index) {
            if (this.mealProducts[mealKey] && Array.isArray(this.mealProducts[mealKey]) && this.mealProducts[mealKey][index]) {
                this.mealProducts[mealKey].splice(index, 1);
            }
        },
        startEditingServing(mealKey, productIndex, fieldType) {
            const key = `${mealKey}-${productIndex}-${fieldType}`;
            const product = this.mealProducts[mealKey][productIndex];
            
            if (!product) return;
            
            // Set editing state
            this.$set(this.editingServingFields, key, true);
            
            // Initialize edit values
            if (fieldType === 'label') {
                const currentValue = (product.label_serving !== null && product.label_serving !== undefined && product.label_serving !== '') 
                    ? product.label_serving 
                    : (product.serving_description || '');
                const valueWithoutUnit = String(currentValue).replace(/\s*(gm|ml)$/i, '').trim();
                this.$set(product, 'editLabelServing', valueWithoutUnit);
                
                if (!product.unit) {
                    this.$set(product, 'unit', 'gm');
                }
            } else if (fieldType === 'notes') {
                const currentValue = product.notes || '';
                this.$set(product, 'editNotes', currentValue);
            }
            
            // Focus the input
            this.$nextTick(() => {
                const refName = fieldType === 'label'
                    ? `label-serving-${mealKey}-${productIndex}`
                    : `notes-${mealKey}-${productIndex}`;
                const ref = this.$refs[refName];
                if (ref && ref[0]) {
                    ref[0].focus();
                }
            });
        },
        cancelEditingServing(mealKey, productIndex, fieldType) {
            const key = `${mealKey}-${productIndex}-${fieldType}`;
            this.$set(this.editingServingFields, key, false);
            
            const product = this.mealProducts[mealKey][productIndex];
            if (product) {
                if (fieldType === 'label') {
                    this.$delete(product, 'editLabelServing');
                } else if (fieldType === 'notes') {
                    this.$delete(product, 'editNotes');
                }
            }
        },
        async saveServingField(mealKey, productIndex, fieldType) {
            const key = `${mealKey}-${productIndex}-${fieldType}`;
            const product = this.mealProducts[mealKey][productIndex];
            
            if (!product) return;
            
            // Get the edited value
            let editValue = '';
            if (fieldType === 'label') {
                editValue = product.editLabelServing !== undefined && product.editLabelServing !== null 
                    ? String(product.editLabelServing) : '';
            } else if (fieldType === 'notes') {
                editValue = product.editNotes !== undefined && product.editNotes !== null 
                    ? String(product.editNotes) : '';
            }
            
            const newValue = editValue.trim();
            
            const oldLabelServing = product.label_serving;
            const oldNotes = product.notes;

            // Set saving flag
            const saveKey = `${this.editPlanForm.id}-${product.id}-${mealKey}-${fieldType}`;
            this.$set(this.savingFields, saveKey, true);
            
            try {
                // Update editing state (close the input)
                this.$set(this.editingServingFields, key, false);

                // Persist to API so it survives refresh/reopen
                const memberId = this.$route.params.memberId;
                const assignmentId = this.editPlanForm.id;
                const foodId = product.food_id || product.id;
                const nutritionType = product.nutrition_type || mealKey;

                if (!memberId || !assignmentId || !foodId) {
                    throw new Error('Missing required identifiers to save');
                }

                const payload = {
                    food_id: foodId,
                    nutrition_type: nutritionType,
                };

                if (fieldType === 'label') {
                    const unit = product.unit || 'gm';
                    this.$set(product, 'unit', unit);
                    payload.label_serving = newValue || null;
                    payload.unit = unit;
                } else if (fieldType === 'notes') {
                    payload.notes = newValue || null;
                }

                const response = await axios.put(
                    `members/${memberId}/assigned-meal-plans/${assignmentId}/meal-products/serving`,
                    payload
                );

                if (!response.data || response.data.success !== true) {
                    throw new Error(response.data?.message || 'Failed to save');
                }

                const saved = response.data.data || {};

                // Apply server-confirmed values
                if (fieldType === 'label') {
                    this.$set(product, 'label_serving', saved.label_serving ?? null);
                    this.$set(product, 'unit', saved.unit ?? (product.unit || 'gm'));
                    this.$delete(product, 'editLabelServing');
                } else if (fieldType === 'notes') {
                    this.$set(product, 'notes', saved.notes ?? null);
                    this.$delete(product, 'editNotes');
                }
            } catch (error) {
                console.error('Error saving serving field:', error);
                // Revert on failure
                if (fieldType === 'label') {
                    this.$set(product, 'label_serving', oldLabelServing ?? null);
                } else if (fieldType === 'notes') {
                    this.$set(product, 'notes', oldNotes ?? null);
                }
                this.makeToast("danger", "Failed to save. Please try again.", "Error");
            } finally {
                this.$delete(this.savingFields, saveKey);
            }
        },
        getMealTotal(mealKey, field) {
            if (!this.mealProducts[mealKey] || this.mealProducts[mealKey].length === 0) {
                return '0';
            }

            const total = this.mealProducts[mealKey].reduce((sum, product) => {
                const quantity = product.quantity || 1;
                let value = 0;

                switch (field) {
                    case 'protein':
                        value = (product.protein || 0) * quantity;
                        break;
                    case 'totalCarb':
                        value = ((product.carbohydrate || product.carbs || 0) * quantity);
                        break;
                    case 'netCarbs':
                        const totalCarb = (product.carbohydrate || product.carbs || 0) * quantity;
                        const fiber = (product.fiber || 0) * quantity;
                        value = totalCarb - fiber;
                        break;
                    case 'fat':
                        value = (product.fat || 0) * quantity;
                        break;
                    case 'fiber':
                        value = (product.fiber || 0) * quantity;
                        break;
                    case 'sodium':
                        value = (product.sodium || 0) * quantity;
                        break;
                    case 'potassium':
                        value = (product.potassium || 0) * quantity;
                        break;
                    case 'calories':
                        value = (product.calories || 0) * quantity;
                        break;
                    default:
                        value = 0;
                }

                return sum + value;
            }, 0);

            // Round appropriately based on field type
            if (field === 'sodium' || field === 'potassium' || field === 'calories') {
                return Math.round(total);
            } else {
                return (Math.round(total * 10) / 10).toFixed(1);
            }
        },
        getProgressPercentage(type) {
            const current = this.editPlanForm[type === 'fat' ? 'fats' : type] || 0;
            const target = this.editPlanForm[type === 'fat' ? 'fats' : type] || 1;
            if (!target || target === 0) return 0;
            const percentage = (current / target) * 100;
            return Math.min(100, Math.max(0, percentage));
        },
        getVisualBarWidth(type) {
            const protein = parseFloat(this.editPlanForm.protein) || 0;
            const carbs = parseFloat(this.editPlanForm.carbs) || 0;
            const fats = parseFloat(this.editPlanForm.fats) || 0;
            const total = protein + carbs + fats;
            
            if (total === 0) return 0;
            
            if (type === 'protein') {
                return (protein / total) * 100;
            } else if (type === 'carbs') {
                return (carbs / total) * 100;
            } else if (type === 'fat') {
                return (fats / total) * 100;
            }
            return 0;
        },
        async saveEditedPlan() {
            if (!this.editPlanForm.id) {
                this.makeToast("danger", "Invalid plan ID", "Error");
                return;
            }

            this.editPlanForm.saving = true;

            // Prepare meal products array
            const mealProductsArray = [];
            if (this.mealProducts) {
                Object.keys(this.mealProducts).forEach(mealKey => {
                    if (this.mealProducts[mealKey] && Array.isArray(this.mealProducts[mealKey])) {
                        this.mealProducts[mealKey].forEach(product => {
                            if (product && product.food_id) {
                                mealProductsArray.push({
                                    food_id: product.food_id,
                                    nutrition_type: mealKey, // This will be snacks1, snacks2, snacks3, breakfast, lunch, dinner
                                    quantity: product.quantity || 1,
                                    calories: product.calories || null,
                                    protein: product.protein || null,
                                    carbs: product.carbs || null,
                                    fats: product.fats || null,
                                    label_serving: product.label_serving || null,
                                    unit: product.unit || null,
                                    notes: product.notes || null,
                                });
                            }
                        });
                    }
                });
            }

            try {
                const response = await axios.put(
                    `members/${this.$route.params.memberId}/assigned-meal-plans/${this.editPlanForm.id}`,
                    {
                        name: this.editPlanForm.name,
                        description: this.editPlanForm.description,
                        calories: this.editPlanForm.calories,
                        protein: this.editPlanForm.protein,
                        carbs: this.editPlanForm.carbs,
                        fats: this.editPlanForm.fats,
                        start_date: this.editPlanForm.start_date,
                        end_date: this.editPlanForm.end_date,
                        notes: this.editPlanForm.notes,
                        meal_products: mealProductsArray,
                    }
                );
                
                if (response.data && response.data.success) {
                    this.makeToast("success", "Meal plan updated successfully!", "Success");
                    this.showEditMealPlanModal = false;
                    // Refresh meal plans
                    await this.fetchMealPlans();
                } else {
                    throw new Error(response.data?.message || 'Failed to update meal plan');
                }
                
            } catch (error) {
                console.error('Error updating meal plan:', error);
                const errorMessage = error.response?.data?.message || "Failed to update meal plan. Please try again.";
                this.makeToast("danger", errorMessage, "Error");
            } finally {
                this.editPlanForm.saving = false;
            }
        },
        async deletePlan(plan) {
            if (!plan || !plan.id) {
                this.makeToast("danger", "Invalid plan selected", "Error");
                return;
            }

            const planName = plan.name || plan.template_name || 'this plan';
            
            const result = await this.$swal({
                title: 'Delete Meal Plan?',
                text: `Are you sure you want to delete "${planName}"? This action cannot be undone.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, delete it',
                cancelButtonText: 'Cancel'
            });

            if (!result.isConfirmed) {
                return;
            }

            try {
                const response = await axios.delete(
                    `members/${this.$route.params.memberId}/assigned-meal-plans/${plan.id}`
                );
                
                if (response.data && response.data.success) {
                    this.makeToast("success", "Meal plan deleted successfully!", "Success");
                    // Refresh meal plans
                    await this.fetchMealPlans();
                } else {
                    throw new Error(response.data?.message || 'Failed to delete meal plan');
                }
                
            } catch (error) {
                console.error('Error deleting meal plan:', error);
                const errorMessage = error.response?.data?.message || "Failed to delete meal plan. Please try again.";
                this.makeToast("danger", errorMessage, "Error");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@import '../../../../assets/styles/sass/_variables.scss';

.member-detail-wrapper {
    padding: 1rem;

    .loading-container {
        padding: 3rem 1rem;
    }

    .breadcrumb-section {
        .breadcrumb-container {
            .back-button {
                background: none;
                border: none;
                font-size: 1.2rem;
                margin-right: 0.5rem;
                cursor: pointer;
                padding: 0.25rem 0.5rem;

                &:hover {
                    opacity: 0.7;
                }
            }

            .breadcrumb {
                margin-bottom: 0;

                .breadcrumb-item {
                    a {
                        color: $primary;
                        text-decoration: none;

                        &:hover {
                            text-decoration: underline;
                        }
                    }

                    &.active {
                        color: $text-muted;
                    }
                }
            }
        }
    }

    .member-header {
        .member-name {
            font-size: 2rem;
            font-weight: 600;
            color: $dark;
            margin-bottom: 0.5rem;
        }

        .member-details {
            .detail-item {
                .detail-label {
                    font-weight: 600;
                    color: $text-muted;
                    margin-right: 0.5rem;
                }

                .detail-value {
                    color: $dark;

                    .coach-link {
                        color: $primary;
                        text-decoration: none;

                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
    }

    .meal-plans-section {
        .meal-plans-cards {
            .meal-plan-card {
                flex: 1;
                min-width: 300px;
                max-width: 400px;
                border-radius: 0.5rem;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

                .plan-header {
                    background-color: #e3e5e7;
                    color: $dark;
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .plan-header-left {
                        display: flex;
                        align-items: center;
                    }

                    .plan-name {
                        font-weight: 600;
                        font-size: 1.1rem;
                        
                        &.clickable {
                            cursor: pointer;
                            transition: all 0.2s ease;
                            user-select: none;
                            
                            &:hover {
                                color: $primary;
                                text-decoration: underline;
                            }
                            
                            &:active {
                                opacity: 0.8;
                            }
                        }
                    }

                    .plan-menu {
                        color: $dark;

                        ::v-deep .btn-link {
                            color: $dark;
                            padding: 0.25rem 0.5rem;

                            &:hover {
                                opacity: 0.8;
                            }
                        }
                    }
                }

                .plan-body {
                    background: $gray-bg;
                    padding: 1rem;

                    .plan-info {
                        margin-bottom: 1rem;

                        .info-item {
                            margin-bottom: 0.5rem;

                            .info-label {
                                font-weight: 600;
                                color: $text-muted;
                                margin-right: 0.5rem;
                            }

                            .info-value {
                                color: $dark;
                            }
                        }
                    }

                    .plan-macros {
                        .macros-label {
                            font-weight: 600;
                            color: $dark;
                            margin-bottom: 0.5rem;
                        }

                        .macros-values {
                            font-size: 1.1rem;
                            color: $primary;
                        }
                    }
                }
            }

            .no-plans-message {
                width: 100%;
                padding: 2rem;
                text-align: center;
            }
        }
    }

    .tab-navigation {
        border-bottom: 2px solid #e9ecef;

        .nav-tabs {
            border-bottom: none;

            .nav-item {
                .nav-link {
                    color: $text-muted;
                    border: none;
                    border-bottom: 3px solid transparent;
                    padding: 1rem 1.5rem;
                    transition: all 0.3s ease;

                    &:hover {
                        color: $primary;
                        border-bottom-color: rgba($primary, 0.3);
                    }

                    &.active {
                        color: $primary;
                        border-bottom-color: $primary;
                        font-weight: 600;
                    }
                }
            }
        }
    }

    .tab-content-wrapper {
        .tab-content {
            padding: 2rem 0;

            .section-title {
                font-size: 1.5rem;
                font-weight: 600;
                color: $dark;
            }

            .instructions-subtitle {
                font-size: 1.2rem;
                font-weight: 600;
                color: $primary;
                margin-bottom: 1rem;
            }

            .instructions-content,
            .content-display {
                padding: 1rem;
                background: #f8f9fa;
                border-radius: 0.5rem;
                min-height: 200px;
            }

            .instructions-editor,
            .content-editor {
                min-height: 300px;
            }

            .edit-actions {
                display: flex;
                justify-content: flex-end;
            }

            .attachments-section {
                .attachments-list {
                    .attachment-item {
                        background: white;
                        transition: background-color 0.2s ease;

                        &:hover {
                            background-color: #f8f9fa;
                        }
                    }

                    .no-attachments {
                        padding: 2rem;
                    }
                }
            }
        }
    }
}

// Responsive design
@media (max-width: 768px) {
    .member-detail-wrapper {
        .member-header {
            .member-details {
                flex-direction: column;
                gap: 1rem;
            }
        }

        .meal-plans-section {
            .meal-plans-cards {
                .meal-plan-card {
                    min-width: 100%;
                }
            }
        }

        .tab-navigation {
            .nav-tabs {
                .nav-item {
                    .nav-link {
                        padding: 0.75rem 1rem;
                        font-size: 0.9rem;
                    }
                }
            }
        }
    }
}

// Mail Modal Styles
.mail-content {
    .mail-form {
        .form-group {
            margin-bottom: 1.5rem;
            
            .form-label {
                display: flex;
                align-items: center;
                font-weight: 600;
                color: $dark;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
                
                i {
                    color: $primary;
                    margin-right: 0.5rem;
                }
            }
            
            .form-input,
            .form-textarea,
            .form-select {
                width: 100%;
                border: 1px solid #dee2e6;
                border-radius: 0.25rem;
                font-size: 0.9rem;
                transition: all 0.3s ease;
                
                &:focus {
                    outline: none;
                    border-color: $primary;
                    box-shadow: 0 0 0 0.2rem rgba($primary, 0.25);
                }
                
                &[readonly] {
                    background-color: #f8f9fa;
                    color: $text-muted;
                    cursor: not-allowed;
                }
            }
            
            .form-textarea {
                resize: vertical;
                min-height: 120px;
                font-family: inherit;
                line-height: 1.5;
            }
            
            .form-select {
                cursor: pointer;
                
                &:focus {
                    outline: none;
                    border-color: $primary;
                    box-shadow: 0 0 0 0.2rem rgba($primary, 0.25);
                }
            }
        }
    }
}

// Modal Overlay and Full Screen Modal Styles - High Specificity
.modal-overlay {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background: rgba(0, 0, 0, 0.5) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    z-index: 1050 !important;
    padding: 1.5rem !important;
    // Allow Bootstrap modals to appear above by not creating a blocking stacking context
    pointer-events: auto !important;
}

.modal-content {
    background: white !important;
    border-radius: 12px !important;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3) !important;
    max-width: 1000px !important;
    width: 90% !important;
    max-height: 85vh !important;
    overflow-y: auto !important;
    animation: modalSlideIn 0.3s ease !important;
    position: relative !important;
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.full-screen-modal {
    background: white !important;
    border-radius: 8px !important;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3) !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
    animation: slideInUp 0.3s ease !important;
    width: 100% !important;
    max-width: 100% !important;
    max-height: 85vh !important;
    position: relative !important;
    z-index: 1 !important;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.modern-header {
    background: #f8f9fa !important;
    color: #333333 !important;
    padding: 1rem 1.25rem !important;
    border-radius: 12px 12px 0 0 !important;
    position: relative !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    border: none !important;
    margin: 0 !important;

    .header-content {
        h3 {
            color: #333333 !important;
            font-size: 1.5rem !important;
            font-weight: 700 !important;
            margin: 0 !important;
        }
    }

    .modern-close {
        background: rgba(255, 255, 255, 0.2) !important;
        border: none !important;
        font-size: 1.2rem !important;
        cursor: pointer !important;
        padding: 0.5rem !important;
        border-radius: 8px !important;
        transition: all 0.2s !important;
        width: 40px !important;
        height: 40px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        color: #333333 !important;

        &:hover {
            background: rgba(255, 255, 255, 0.3) !important;
            transform: scale(1.1) !important;
        }
    }
}

.modern-body {
    padding: 0.75rem 1rem !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
    max-height: calc(85vh - 100px) !important;
    -webkit-overflow-scrolling: touch !important;
    position: relative !important;
    background: white !important;
    
    @media (max-width: 768px) {
        padding: 0.5rem 0.75rem !important;
        max-height: calc(85vh - 80px) !important;
    }
}

.modern-form {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;

    .form-group {
        display: flex !important;
        flex-direction: column !important;
        margin-bottom: 1rem !important;
        
        label {
            color: #333333 !important;
            font-weight: 600 !important;
            font-size: 0.9rem !important;
            margin-bottom: 0.5rem !important;
        }
        
        // Override Bootstrap Vue form components
        ::v-deep .form-control,
        ::v-deep input,
        ::v-deep textarea,
        ::v-deep select,
        .form-input,
        .form-textarea {
            width: 100% !important;
            padding: 0.5rem 1rem !important;
            border: 1px solid #dee2e6 !important;
            border-radius: 8px !important;
            font-size: 0.9rem !important;
            background: white !important;
            color: #333333 !important;
            transition: border-color 0.2s !important;
            
            &:focus {
                outline: none !important;
                border-color: $primary !important;
                box-shadow: 0 0 0 2px rgba($primary, 0.1) !important;
            }
            
            &::placeholder {
                color: #6c757d !important;
            }
        }
        
        ::v-deep textarea,
        .form-textarea {
            resize: vertical !important;
            min-height: 80px !important;
        }
    }
    
    .form-row {
        display: flex !important;
        gap: 1.5rem !important;
        
        > .form-group {
            flex: 1 1 0 !important;
        }
    }
    
    // Override Bootstrap row/col classes
    .row {
        display: flex !important;
        flex-wrap: wrap !important;
        margin-left: -0.75rem !important;
        margin-right: -0.75rem !important;
        
        [class*="col-"] {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
        }
    }
}

.form-actions-modern {
    display: flex !important;
    gap: 0.75rem !important;
    margin-top: 1rem !important;
    padding-top: 1rem !important;
    border-top: 1px solid #e9ecef !important;
    justify-content: flex-end !important;
}

.btn-primary-modern,
.btn-secondary-modern {
    padding: 0.75rem 1.5rem !important;
    border: none !important;
    border-radius: 8px !important;
    font-weight: 600 !important;
    font-size: 0.9rem !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
    display: flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    min-width: 140px !important;
    justify-content: center !important;
}

.btn-primary-modern {
    background: linear-gradient(
        135deg,
        $primary 0%,
        color.adjust($primary, $lightness: -15%) 100%
    ) !important;
    color: white !important;

    &:hover:not(:disabled) {
        transform: translateY(-1px) !important;
        box-shadow: 0 4px 12px rgba($primary, 0.4) !important;
    }
    
    &:disabled {
        opacity: 0.6 !important;
        cursor: not-allowed !important;
    }
}

.btn-secondary-modern {
    background: #f8f9fa !important;
    color: #333333 !important;
    border: 2px solid #dee2e6 !important;

    &:hover {
        background: #e9ecef !important;
        border-color: #ced4da !important;
    }
}

// Edit Meal Plan Modal - Large Width (kept for backward compatibility)
::v-deep .edit-meal-plan-modal-large {
    max-width: 95% !important;
    width: 1400px !important;
    
    @media (max-width: 1440px) {
        width: 95% !important;
        max-width: 95% !important;
    }
}

// Advanced Configuration Modal Styles
.advanced-configuration {
    color: #333333 !important;
    width: 100% !important;
    
    .admin-info-header {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        background: #f8f9fa !important;
        border: 1px solid #e9ecef !important;
        border-radius: 8px !important;
        padding: 0.75rem 1rem !important;
        margin-bottom: 1rem !important;
        flex-wrap: wrap !important;
        gap: 0.75rem !important;

        .admin-info-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            .info-label {
                font-weight: 500;
                color: #333333;
                font-size: 0.9rem;
            }

            .info-value {
                font-weight: 600;
                color: #333333;
                font-size: 0.9rem;
            }
        }
    }

    .top-sections-container-vertical {
        display: flex !important;
        flex-direction: row !important;
        gap: 1rem !important;
        margin-bottom: 1.25rem !important;
        width: 100% !important;

        @media (max-width: 991px) {
            flex-direction: column !important;
        }
        
        .meal-plan-targets-section {
            flex: 1 !important;
        }
        
        .nutrition-levels-summary {
            flex: 0 0 350px !important;
            
            @media (max-width: 991px) {
                flex: 1 !important;
            }
        }
    }

    .meal-plan-targets-section {
        background: #f8f9fa !important;
        border: 1px solid #e9ecef !important;
        border-radius: 8px !important;
        padding: 1rem !important;
        margin-bottom: 0 !important;
        color: #333333 !important;
        
        .targets-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            margin-bottom: 1rem !important;
            
            .targets-title {
                color: #333333 !important;
                font-size: 1.1rem !important;
                font-weight: 600 !important;
                margin: 0 !important;
            }
        }
        
        .targets-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
            margin-bottom: 0.75rem;
            
            .target-item {
                .target-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.75rem;
                    
                    .target-label {
                        font-size: 0.9rem;
                        font-weight: 700;
                        letter-spacing: 0.5px;
                        color: #333333;
                    }
                    
                    .target-value {
                        font-size: 1.1rem;
                        font-weight: 700;
                        color: #333333;
                    }
                }
                
                .target-progress {
                    .progress-bar {
                        width: 100%;
                        height: 8px;
                        background: #e9ecef;
                        border-radius: 4px;
                        overflow: hidden;
                        margin-bottom: 0.5rem;
                        
                        .progress-fill {
                            height: 100%;
                            border-radius: 4px;
                            transition: width 0.3s ease;
                        }
                    }
                    
                    .current-intake {
                        font-size: 0.85rem;
                        font-weight: 600;
                        color: #333333;
                    }
                }
                
                &.protein-target {
                    .progress-fill.protein-fill {
                        background: #6f42c1;
                    }
                }
                
                &.carbs-target {
                    .progress-fill.carbs-fill {
                        background: #20c997;
                    }
                }
                
                &.fat-target {
                    .progress-fill.fat-fill {
                        background: #dc3545;
                    }
                }
            }
        }
        
        .targets-visual-bar {
            display: flex;
            height: 24px;
            border-radius: 4px;
            overflow: hidden;
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            
            .visual-segment {
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                transition: width 0.3s ease;
                
                .segment-label {
                    color: white;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
                }
                
                &.protein-segment {
                    background: #6f42c1;
                }
                
                &.carbs-segment {
                    background: #20c997;
                }
                
                &.fat-segment {
                    background: #dc3545;
                }
            }
        }
    }

    .nutrition-levels-summary {
        background: #f8f9fa !important;
        border: 1px solid #e9ecef !important;
        border-radius: 8px !important;
        padding: 1rem;
        margin-bottom: 0 !important;
        color: #333333;
        min-height: auto;

        .nutrition-levels-header {
            font-size: 1.25rem;
            font-weight: 600;
            color: #333333;
            margin: 0 0 0.25rem 0;
        }

        .nutrition-levels-subtitle {
            font-size: 0.875rem;
            color: #333333;
            margin: 0 0 1.25rem 0;
        }

        .nutrition-metrics {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            color: #333333;
        }

        .nutrition-metric {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 0.75rem;
            border-bottom: 1px solid #e9ecef;
            border-radius: 4px;
            margin-bottom: 0.25rem;
            transition: all 0.3s ease;
            background: white;
            color: #333333;

            &:last-child {
                border-bottom: none;
                margin-bottom: 0;
            }

            &:hover {
                transform: translateX(4px);
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .metric-label {
                font-weight: 600;
                color: #333333;
                font-size: 0.95rem;
                display: flex;
                align-items: center;
                
                &::before {
                    content: '';
                    width: 4px;
                    height: 20px;
                    border-radius: 2px;
                    margin-right: 0.75rem;
                    display: inline-block;
                }
            }

            .metric-value {
                font-weight: 700;
                font-size: 0.95rem;
                padding: 0.25rem 0.75rem;
                border-radius: 4px;
                background: rgba(0,0,0,0.05);
                color: #333333;
            }

            &.calories {
                .metric-label::before {
                    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
                }
                .metric-value {
                    background: rgba(255, 107, 107, 0.1);
                }
            }

            &.protein {
                .metric-label::before {
                    background: linear-gradient(135deg, #6f42c1, #5a32a3);
                }
                .metric-value {
                    background: rgba(111, 66, 193, 0.1);
                }
            }

            &.carbs {
                .metric-label::before {
                    background: linear-gradient(135deg, #20c997, #17a085);
                }
                .metric-value {
                    background: rgba(32, 201, 151, 0.1);
                }
            }

            &.fat {
                .metric-label::before {
                    background: linear-gradient(135deg, #dc3545, #c82333);
                }
                .metric-value {
                    background: rgba(220, 53, 69, 0.1);
                }
            }
        }
    }

    .editable-fields-section {
        background: #f8f9fa !important;
        border: 1px solid #e9ecef !important;
        border-radius: 8px !important;
        padding: 1rem !important;
        margin-top: 1rem !important;

        .section-title {
            font-size: 1.25rem !important;
            font-weight: 600 !important;
            color: #333333 !important;
        }

        .form-group {
            margin-bottom: 1.5rem !important;
            
            .form-label {
                display: flex !important;
                align-items: center !important;
                font-weight: 600 !important;
                color: #333333 !important;
                margin-bottom: 0.5rem !important;
                font-size: 0.9rem !important;
                
                i {
                    color: $primary !important;
                    margin-right: 0.5rem !important;
                }
            }
            
            .form-input,
            .form-textarea {
                width: 100% !important;
                border: 1px solid #dee2e6 !important;
                border-radius: 8px !important;
                font-size: 0.9rem !important;
                padding: 0.5rem 1rem !important;
                transition: all 0.3s ease !important;
                background: white !important;
                color: #333333 !important;
                
                &:focus {
                    outline: none !important;
                    border-color: $primary !important;
                    box-shadow: 0 0 0 2px rgba($primary, 0.1) !important;
                }
            }
            
            .form-textarea {
                resize: vertical !important;
                min-height: 80px !important;
                font-family: inherit !important;
                line-height: 1.5 !important;
            }
        }
    }

    // Meals Section - Inside advanced-configuration to match modal context
    .meals-section {
        width: 100% !important;
        margin-top: 1rem !important;
        padding-top: 1rem !important;
        border-top: 2px solid rgba(233, 236, 239, 0.2) !important;

        .meals-header {
            margin-bottom: 1.5rem !important;

            .section-title {
                color: #333333 !important;
                font-size: 1.1rem !important;
                font-weight: 700 !important;
                margin: 0 !important;
            }
        }
        
        .meal-tables-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 0.75rem !important;
            margin-top: 0.75rem !important;

            .meal-table-section {
                background: #ffffff !important;
                border: 1px solid #e9ecef !important;
                border-radius: 12px !important;
                overflow: visible !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
                position: relative !important;

                .meal-table-header {
                    display: flex !important;
                    justify-content: space-between !important;
                    align-items: center !important;
                    padding: 1rem !important;
                    background: #f8f9fa !important;
                    border-bottom: 1px solid #e9ecef !important;
                    border-radius: 12px 12px 0 0 !important;

                    .meal-title-section {
                        display: flex !important;
                        align-items: center !important;
                        gap: 0.75rem !important;

                        .meal-icon {
                            display: flex !important;
                            align-items: center !important;
                            justify-content: center !important;
                            width: 32px !important;
                            height: 32px !important;
                            background: #dc3545 !important;
                            color: white !important;
                            border-radius: 6px !important;
                            font-size: 0.9rem !important;
                        }

                        .meal-title-container {
                            display: flex !important;
                            align-items: center !important;
                            gap: 0.5rem !important;

                            .meal-table-title {
                                font-size: 0.95rem !important;
                                font-weight: 700 !important;
                                color: #333333 !important;
                                margin: 0 !important;
                                cursor: pointer !important;
                            }
                        }
                    }

                    .meal-header-actions {
                        display: flex !important;
                        align-items: center !important;
                        gap: 0.5rem !important;

                        .add-product-btn-table {
                            display: flex !important;
                            align-items: center !important;
                            gap: 0.5rem !important;
                            background: #dc3545 !important;
                            color: white !important;
                            border: none !important;
                            padding: 6px 12px !important;
                            border-radius: 6px !important;
                            font-size: 0.85rem !important;
                            font-weight: 500 !important;
                            cursor: pointer !important;
                            transition: all 0.3s ease !important;

                            &:hover {
                                background: #c82333 !important;
                                transform: translateY(-1px) !important;
                            }

                            i {
                                font-size: 0.75rem !important;
                            }
                        }
                    }
                }

                .nutrition-table-container {
                    overflow-x: auto !important;
                    overflow-y: visible !important;

                    .nutrition-table {
                        width: 100% !important;
                        border-collapse: collapse !important;
                        font-size: 0.85rem !important;

                        thead {
                            background: #f8f9fa !important;

                            th {
                                padding: 10px 8px !important;
                                text-align: left !important;
                                font-weight: 600 !important;
                                color: #333333 !important;
                                border-bottom: 1px solid #dee2e6 !important;
                                white-space: nowrap !important;
                                font-size: 0.8rem !important;
                            }
                        }

                        tbody {
                            tr {
                                border-bottom: 1px solid #f0f0f0 !important;
                                transition: background-color 0.2s ease !important;

                                &:hover {
                                    background-color: #f8f9fa !important;
                                }

                                &.meal-totals-row {
                                    background: #f8f9fa !important;
                                    font-weight: 600 !important;
                                    border-top: 2px solid #dee2e6 !important;

                                    td {
                                        padding: 10px 8px !important;
                                    }
                                }

                                &.product-row {
                                    td {
                                        padding: 10px 8px !important;
                                        color: #333333 !important;
                                        vertical-align: middle !important;
                                    }
                                }
                            }

                            .empty-meal-row {
                                td {
                                    padding: 2rem !important;
                                    text-align: center !important;

                                    .empty-meal-content {
                                        display: flex !important;
                                        flex-direction: column !important;
                                        align-items: center !important;
                                        gap: 0.5rem !important;
                                        color: #6c757d !important;

                                        i {
                                            font-size: 2rem !important;
                                            color: #ced4da !important;
                                        }
                                    }
                                }
                            }
                        }

                        .product-name-cell {
                            .product-name {
                                font-weight: 500 !important;
                                color: #333333 !important;
                            }
                        }

                        .label-serving-cell,
                        .notes-cell {
                            .serving-edit-container,
                            .notes-edit-container {
                                display: flex !important;
                                align-items: center !important;
                                gap: 0.5rem !important;

                                .serving-value,
                                .notes-value {
                                    flex: 1 !important;
                                    color: #333333 !important;
                                }

                                .edit-serving-icon-btn {
                                    background: transparent !important;
                                    border: none !important;
                                    color: #dc3545 !important;
                                    cursor: pointer !important;
                                    padding: 4px !important;
                                    border-radius: 4px !important;
                                    transition: all 0.2s ease !important;

                                    &:hover {
                                        background: rgba(220, 53, 69, 0.1) !important;
                                    }

                                    i {
                                        font-size: 0.75rem !important;
                                    }
                                }

                                .serving-input-with-unit {
                                    display: flex !important;
                                    align-items: center !important;
                                    gap: 0.25rem !important;

                                    .serving-input {
                                        flex: 1 !important;
                                        padding: 4px 8px !important;
                                        border: 1px solid #dee2e6 !important;
                                        border-radius: 4px !important;
                                        font-size: 0.85rem !important;
                                    }

                                    .unit-suffix-input {
                                        color: #6c757d !important;
                                        font-size: 0.8rem !important;
                                    }
                                }

                                .saving-loader,
                                .saving-loader-input {
                                    color: #dc3545 !important;
                                }
                            }
                        }

                        .remove-product-btn {
                            background: rgba(220, 53, 69, 0.1) !important;
                            border: none !important;
                            color: #dc3545 !important;
                            padding: 6px 8px !important;
                            border-radius: 4px !important;
                            cursor: pointer !important;
                            transition: all 0.2s ease !important;

                            &:hover {
                                background: #dc3545 !important;
                                color: white !important;
                            }

                            i {
                                font-size: 0.8rem !important;
                            }
                        }
                    }
                }
            }
        }

        .meal-cards-modern {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            width: 100%;
            padding-bottom: 0.5rem;
        }

        .meal-card-modern {
            background: $color-white;
            border: 2px solid $color-border-muted;
            border-radius: 12px;
            padding: 1.5rem;
            transition: all 0.2s ease;
            width: 100%;
            display: flex;
            flex-direction: column;
            height: fit-content;

            &:hover {
                border-color: $color-button;
                box-shadow: 0 4px 12px rgba($color-button, 0.1);
                transform: translateY(-2px);
            }

            .meal-card-header-modern {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin-bottom: 1.25rem;
                padding-bottom: 0.75rem;
                border-bottom: 1px solid rgba($color-border, 0.2);

                .meal-icon {
                    width: 36px;
                    height: 36px;
                    background: $color-background-hover;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: $color-muted;
                    flex-shrink: 0;
                }

                .meal-title {
                    font-weight: 700;
                    color: $color-text-dark;
                    font-size: 1rem;
                    letter-spacing: 0.3px;
                }
            }

            .meal-card-body-modern {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                flex: 1;
                min-height: 120px;

                .meal-products-modern {
                    flex: 1;
                    min-height: 0;

                    .empty-meal {
                        color: $color-muted;
                        font-size: 0.85rem;
                        font-style: italic;
                        padding: 1rem 0;
                        text-align: center;
                        background: rgba($color-background, 0.5);
                        border-radius: 8px;
                        border: 1px dashed rgba($color-border, 0.3);
                    }

                    .products-list {
                        display: flex;
                        flex-direction: column;
                        gap: 0.75rem;
                        max-height: 200px;
                        overflow-y: auto;
                        padding-right: 0.5rem;
                        transition: max-height 0.3s ease;

                        /* Custom scrollbar styling */
                        &::-webkit-scrollbar {
                            width: 6px;
                        }

                        &::-webkit-scrollbar-track {
                            background: rgba($color-background, 0.3);
                            border-radius: 3px;
                        }

                        &::-webkit-scrollbar-thumb {
                            background: rgba($color-border, 0.4);
                            border-radius: 3px;
                            
                            &:hover {
                                background: rgba($color-border, 0.6);
                            }
                        }

                        .product-item {
                            color: $color-text-dark;
                            font-size: 0.85rem;
                            font-weight: 500;
                            padding: 0.75rem;
                            background: rgba($color-background, 0.3);
                            border-radius: 8px;
                            border: 1px solid rgba($color-border, 0.1);
                            transition: all 0.2s ease;
                            flex-shrink: 0;

                            &:hover {
                                background: rgba($color-background, 0.5);
                                border-color: rgba($color-border, 0.3);
                            }

                            .product-name-quantity {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                gap: 0.75rem;

                                .product-info {
                                    flex: 1;
                                    display: flex;
                                    flex-direction: column;
                                    gap: 0.3rem;

                                    .product-name {
                                        font-weight: 600;
                                        color: $color-text-dark;
                                        font-size: 0.9rem;
                                        line-height: 1.3;
                                    }

                                    .product-calories {
                                        color: $color-text-dark;
                                        font-size: 0.8rem;
                                        font-weight: 500;
                                        opacity: 0.7;
                                        background: rgba($color-info-light, 0.3);
                                        padding: 0.2rem 0.5rem;
                                        border-radius: 4px;
                                        display: inline-block;
                                    }
                                }

                                .quantity-controls {
                                    display: flex;
                                    align-items: center;
                                    gap: 0.3rem;
                                    flex-shrink: 0;

                                    .quantity {
                                        background: $color-white;
                                        color: $color-text-dark;
                                        padding: 0.3rem 0.6rem;
                                        border-radius: 6px;
                                        font-size: 0.8rem;
                                        font-weight: 600;
                                        min-width: 10px;
                                        text-align: center;
                                        border: 1px solid rgba($color-border, 0.3);
                                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                                    }

                                    .quantity-btn {
                                        border: none;
                                        border-radius: 6px;
                                        width: 26px;
                                        height: 26px;
                                        cursor: pointer;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        transition: all 0.2s ease;
                                        font-weight: 600;
                                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

                                        &.minus-btn {
                                            background: #dc3545;
                                            color: white;

                                            &:hover {
                                                background: #c82333;
                                                transform: scale(1.05);
                                                box-shadow: 0 3px 6px rgba(220, 53, 69, 0.3);
                                            }
                                        }

                                        &.plus-btn {
                                            background: #28a745;
                                            color: white;

                                            &:hover {
                                                background: #218838;
                                                transform: scale(1.05);
                                                box-shadow: 0 3px 6px rgba(40, 167, 69, 0.3);
                                            }
                                        }

                                        i {
                                            font-size: 0.7rem;
                                        }
                                    }
                                }
                            }
                        }

                        .more-products {
                            color: $color-button;
                            font-size: 0.8rem;
                            font-weight: 600;
                            padding: 0.5rem;
                            cursor: pointer;
                            transition: all 0.2s ease;
                            text-align: center;
                            background: rgba($color-button, 0.1);
                            border-radius: 6px;
                            border: 1px dashed rgba($color-button, 0.3);
                            margin-top: 0.5rem;
                            user-select: none;

                            &:hover {
                                color: $color-button-hover;
                                background: rgba($color-button, 0.15);
                                border-color: rgba($color-button, 0.5);
                                transform: translateY(-1px);
                            }

                            &:active {
                                transform: translateY(0);
                            }

                            i {
                                margin-right: 0.3rem;
                                font-size: 0.7rem;
                            }
                        }
                    }
                }

                .add-product-btn-modern {
                    width: 40px;
                    height: 40px;
                    background: $color-button;
                    color: $color-white;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    align-self: flex-end;
                    margin-top: 0.5rem;
                    box-shadow: 0 2px 6px rgba($color-button, 0.3);

                    &:hover {
                        background: $color-button-hover;
                        transform: scale(1.05);
                        box-shadow: 0 4px 12px rgba($color-button, 0.4);
                    }

                    i {
                        font-size: 0.9rem;
                    }
                }
            }
        }
    }
}

.modal-footer-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    
    .btn-cancel-mail {
        padding: 0.5rem 1.5rem;
        font-weight: 500;
        border-radius: 0.25rem;
        transition: all 0.3s ease;
    }
    
    .btn-send-mail {
        padding: 0.5rem 1.5rem;
        font-weight: 500;
        border-radius: 0.25rem;
        background-color: $primary;
        border-color: $primary;
        transition: all 0.3s ease;
        
        &:hover:not(:disabled) {
            background-color: color.adjust($primary, $lightness: -10%);
            border-color: color.adjust($primary, $lightness: -10%);
        }
        
        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
        }
    }
}

// Add Products Modal Styles - Ensure it appears above Edit Meal Plan modal
// Edit Meal Plan modal overlay is at 1050, so Add Products modal needs to be much higher
// Using very high z-index to ensure it's always on top
#add-products-modal {
    z-index: 2000 !important;
    position: fixed !important;
    
    &.modal {
        z-index: 2000 !important;
        position: fixed !important;
    }
    
    .modal-dialog {
        max-width: 750px;
        max-height: 85vh;
        z-index: 2000 !important;
        position: relative !important;
        margin: 1.75rem auto !important;
    }

    .modal-content {
        max-height: 85vh;
        display: flex;
        flex-direction: column;
        z-index: 2000 !important;
        position: relative !important;
    }
}

// BootstrapVue backdrop id convention: {id}___BV_modal_backdrop_
#add-products-modal___BV_modal_backdrop_ {
    z-index: 1990 !important;
    background-color: rgba(0, 0, 0, 0.6) !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
}

// Also target by class for additional specificity
::v-deep .add-products-modal {
    z-index: 2000 !important;
    
    &.modal {
        z-index: 2000 !important;
    }
    
    .modal-dialog {
        max-width: 750px;
        max-height: 85vh;
        z-index: 2000 !important;
        position: relative;
    }

    .modal-content {
        max-height: 85vh;
        display: flex;
        flex-direction: column;
        z-index: 2000 !important;
        position: relative;
    }
}

// Ensure Add Products modal backdrop appears above Edit modal
// Target the last backdrop (which is for Add Products modal)
body.modal-open .modal-backdrop.show:last-of-type {
    z-index: 1990 !important;
    background-color: rgba(0, 0, 0, 0.6) !important;
}

// Force higher z-index for nested modal - target modal that comes after overlay
.modal-overlay + .modal,
body > .modal:last-of-type {
    z-index: 2000 !important;
    
    .modal-dialog {
        z-index: 2000 !important;
    }
    
    .modal-content {
        z-index: 2000 !important;
    }
}

// Target backdrop that comes after overlay
.modal-overlay + .modal-backdrop,
body > .modal-backdrop:last-of-type {
    z-index: 1990 !important;
}

// Additional global override for nested modals
body.modal-open {
    .modal {
        &:last-of-type {
            z-index: 2000 !important;
        }
    }
    
    .modal-backdrop {
        &:last-of-type {
            z-index: 1990 !important;
        }
    }
}

// Nested Modal Styles (Add Products Modal inside Edit Meal Plan Modal)
.nested-modal-overlay {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background: rgba(0, 0, 0, 0.7) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    z-index: 2000 !important;
    padding: 2rem !important;
    animation: fadeIn 0.2s ease !important;
}

.nested-modal-content {
    background: white !important;
    border-radius: 12px !important;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4) !important;
    max-width: 900px !important;
    width: 100% !important;
    max-height: 85vh !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
    animation: slideInUp 0.3s ease !important;
    position: relative !important;
}

.nested-modal-header {
    background: #f8f9fa !important;
    padding: 1rem 1.5rem !important;
    border-bottom: 1px solid #dee2e6 !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    border-radius: 12px 12px 0 0 !important;

    .nested-modal-title {
        margin: 0 !important;
        font-size: 1.25rem !important;
        font-weight: 600 !important;
        color: #333333 !important;
        display: flex !important;
        align-items: center !important;
    }

    .nested-modal-close {
        background: transparent !important;
        border: none !important;
        font-size: 1.5rem !important;
        cursor: pointer !important;
        padding: 0.5rem !important;
        color: #6c757d !important;
        transition: all 0.2s !important;
        width: 36px !important;
        height: 36px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 6px !important;

        &:hover {
            background: rgba(0, 0, 0, 0.05) !important;
            color: #333333 !important;
        }
    }
}

.nested-modal-body {
    padding: 1.5rem !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
    flex: 1 !important;
    max-height: calc(85vh - 80px) !important;
    -webkit-overflow-scrolling: touch !important;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.add-products-container {
        .search-section {
            margin-bottom: 1.5rem;

            .search-box-wrapper {
                position: relative;
                display: flex;
                align-items: center;

                .search-icon {
                    position: absolute;
                    left: 1rem;
                    color: #6c757d;
                    z-index: 1;
                }

                .search-input-large {
                    width: 100%;
                    padding: 0.75rem 1rem 0.75rem 3rem;
                    border: 1px solid #dee2e6;
                    border-radius: 8px;
                    font-size: 1rem;
                    transition: all 0.2s ease;

                    &:focus {
                        outline: none;
                        border-color: $primary;
                        box-shadow: 0 0 0 0.2rem rgba($primary, 0.25);
                    }
                }

                .results-count {
                    position: absolute;
                    right: 1rem;
                    font-size: 0.85rem;
                    color: #6c757d;
                    background: rgba(248, 249, 250, 0.8);
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                }
            }
        }

        .products-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            max-height: 500px;
            overflow-y: auto;

            @media (max-width: 768px) {
                grid-template-columns: 1fr;
            }
        }

        .available-products-column,
        .current-products-column {
            .loading-products,
            .error-products,
            .no-products {
                text-align: center;
                padding: 2rem;
                color: #6c757d;
                font-style: italic;

                i {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                    display: block;
                    opacity: 0.5;
                }
            }

            .fetched-products-list,
            .products-grid {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                max-height: 450px;
                overflow-y: auto;
                padding-right: 0.5rem;

                &::-webkit-scrollbar {
                    width: 6px;
                }

                &::-webkit-scrollbar-track {
                    background: rgba(248, 249, 250, 0.3);
                    border-radius: 3px;
                }

                &::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 3px;
                    
                    &:hover {
                        background: rgba(0, 0, 0, 0.3);
                    }
                }
            }

            .product-item-display {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: white;
                border: 1px solid #e9ecef;
                border-radius: 8px;
                padding: 0.75rem 1rem;
                transition: all 0.2s ease;

                &:hover {
                    border-color: $primary;
                    box-shadow: 0 2px 8px rgba($primary, 0.1);
                }

                &.clickable-product {
                    cursor: pointer;

                    &:hover {
                        background: rgba($primary, 0.05);
                        border-color: $primary;
                        box-shadow: 0 2px 8px rgba($primary, 0.15);
                        transform: translateY(-1px);
                    }

                    &:active {
                        transform: translateY(0);
                        box-shadow: 0 1px 4px rgba($primary, 0.2);
                    }
                }

                .product-info {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                    flex: 1;

                    .product-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 0.25rem;

                        .product-name {
                            color: #333333;
                            font-weight: 600;
                            font-size: 0.95rem;
                        }

                        .product-serving {
                            color: #6c757d;
                            font-size: 0.75rem;
                            font-style: italic;
                        }
                    }

                    .product-description {
                        color: #6c757d;
                        font-size: 0.8rem;
                        line-height: 1.3;
                        margin-bottom: 0.25rem;
                        font-style: italic;
                    }

                    .product-calories {
                        color: #333333;
                        font-weight: 600;
                        font-size: 0.85rem;
                        margin-bottom: 0.25rem;
                    }
                }

                .remove-product-btn {
                    width: 32px;
                    height: 32px;
                    background: rgba(220, 53, 69, 0.1);
                    color: #dc3545;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    margin-left: 1rem;

                    i {
                        font-size: 0.8rem;
                    }

                    &:hover {
                        background: #dc3545;
                        color: white;
                        transform: scale(1.05);
                        box-shadow: 0 2px 6px rgba(220, 53, 69, 0.3);
                    }
                }
            }

            .current-products-header {
                margin-bottom: 1rem;
                padding-bottom: 0.75rem;
                border-bottom: 1px solid #e9ecef;

                .current-count {
                    font-weight: 600;
                    color: #333333;
                    font-size: 0.95rem;
                }
            }
        }
    }
</style>

