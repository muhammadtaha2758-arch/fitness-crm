<template>
    <div class="tasks-page">
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
                                <i class="fas fa-tasks"></i>
                                Tasks
                            </li>
                        </ol>
                    </div>
                </nav>
            </div>
        </div>

        <!-- Page Header -->
        <div class="tasks-header d-flex justify-content-between align-items-center mb-4">
            <h1 class="page-title mb-0">Tasks</h1>
            <button 
                @click="openNewTaskModal" 
                class="btn btn-primary new-task-btn"
            >
                <i class="fas fa-plus me-2"></i>
                New task
            </button>
        </div>

        <!-- Filters -->
        <div class="filters-section mb-4">
            <div class="row">
                <div class="col-md-2 mb-3 mb-md-0">
                    <b-form-select
                        v-model="filters.dateFilter"
                        :options="dateFilterOptions"
                        class="filter-select"
                        @change="loadTasks"
                    ></b-form-select>
                </div>
                <div class="col-md-2 mb-3 mb-md-0">
                    <b-form-select
                        v-model="filters.taskFilter"
                        :options="taskFilterOptions"
                        class="filter-select"
                        @change="loadTasks"
                    ></b-form-select>
                </div>
                <div class="col-md-2 mb-3 mb-md-0">
                    <b-form-select
                        v-model="filters.coachFilter"
                        :options="coachFilterOptions"
                        class="filter-select"
                        @change="loadTasks"
                    ></b-form-select>
                </div>
                <div class="col-md-6">
                    <b-form-input
                        v-model="filters.searchMember"
                        placeholder="Search members"
                        class="filter-input"
                        @input="loadTasks"
                    ></b-form-input>
                </div>
            </div>
        </div>

        <!-- Templates Section (Admin Only) - Unassigned Tasks -->
        <div v-if="isAdmin && templates.length > 0" class="mb-4">
            <div class="tasks-list">
                <div 
                    v-for="template in templates" 
                    :key="template.id" 
                    class="task-item"
                >
                    <div class="task-content flex-grow-1">
                        <div class="task-title">
                            {{ template.title }}
                        </div>
                        <div v-if="template.description" class="task-description">
                            {{ template.description }}
                        </div>
                        <div class="task-meta">
                            <span class="task-category">{{ template.category }}</span>
                            <span v-if="template.due_date" class="task-due-date">
                                Due: {{ formatDate(template.due_date) }}
                            </span>
                        </div>
                    </div>
                    <div class="task-actions">
                        <button 
                            @click="editTask(template)" 
                            class="btn btn-sm btn-link"
                            title="Edit template"
                        >
                            <i class="fas fa-edit"></i>
                        </button>
                        <button 
                            @click="deleteTask(template)" 
                            class="btn btn-sm btn-link text-danger"
                            title="Delete template"
                        >
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tasks List -->
        <div class="tasks-list">
            <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else-if="regularTasks.length === 0 && templates.length === 0" class="text-center py-5">
                <p class="text-muted">No tasks found</p>
            </div>
            <div v-else>
                <!-- Regular Tasks (Assigned) -->
                <div 
                    v-for="task in regularTasks" 
                    :key="task.id" 
                    class="task-item"
                    :class="{ 'task-completed': task.status === 'completed' }"
                >
                    <div class="task-checkbox">
                        <b-form-checkbox
                            :checked="task.status === 'completed'"
                            @change="toggleTaskStatus(task)"
                        ></b-form-checkbox>
                    </div>
                    <div class="task-content flex-grow-1">
                        <div class="task-title">
                            {{ task.title }}
                            <span v-if="task.member_name" class="member-name">
                                - {{ task.member_name }}
                            </span>
                            <span v-if="task.coach_name" class="coach-name">
                                - {{ task.coach_name }}
                            </span>
                        </div>
                        <div v-if="task.description" class="task-description">
                            {{ task.description }}
                        </div>
                        <div class="task-meta">
                            <span class="task-category">{{ task.category }}</span>
                            <span v-if="task.due_date" class="task-due-date">
                                Due: {{ formatDate(task.due_date) }}
                            </span>
                        </div>
                    </div>
                    <div class="task-actions">
                        <button 
                            @click="editTask(task)" 
                            class="btn btn-sm btn-link"
                            title="Edit task"
                        >
                            <i class="fas fa-edit"></i>
                        </button>
                        <button 
                            @click="deleteTask(task)" 
                            class="btn btn-sm btn-link text-danger"
                            title="Delete task"
                        >
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- New Task Modal -->
        <b-modal
            v-model="showTaskModal"
            :title="isEditing ? 'Edit Task' : 'New task'"
            size="md"
            centered
            @hide="closeTaskModal"
            hide-footer
            class="task-modal"
        >
            <form @submit.prevent="saveTask">
                <!-- Task Field -->
                <div class="form-group mb-3">
                    <div class="d-flex align-items-center">
                        <label class="form-label-inline mb-0" style="min-width: 80px; margin-right: 1rem; padding-right: 1rem;">
                            Task
                        </label>
                        <div class="flex-grow-1 task-input-wrapper" style="margin-left: 4rem;">
                            <b-form-input
                                v-model="taskForm.title"
                                placeholder="Enter task title"
                                required
                                :class="{ 'is-invalid': validationErrors.title }"
                                @input="clearValidationError('title')"
                            ></b-form-input>
                        </div>
                    </div>
                    <div v-if="validationErrors.title" class="invalid-feedback d-block mt-1">
                        {{ validationErrors.title }}
                    </div>
                </div>

                <!-- Category Field -->
                <div class="form-group mb-3">
                    <div class="d-flex align-items-center">
                        <label class="form-label-inline mb-0" style="min-width: 80px; margin-right: 1rem; padding-right: 1rem;">
                            Category
                        </label>
                        <div class="flex-grow-1 task-input-wrapper" style="margin-left: 1rem;">
                            <b-form-select
                                v-model="taskForm.category"
                                :options="categoryOptions"
                                required
                                :class="{ 'is-invalid': validationErrors.category }"
                                @change="clearValidationError('category')"
                            ></b-form-select>
                        </div>
                    </div>
                    <div v-if="validationErrors.category" class="invalid-feedback d-block mt-1">
                        {{ validationErrors.category }}
                    </div>
                </div>

                <!-- Show Details Button -->
                <div class="form-group mb-3" v-if="!showDetails">
                    <button 
                        type="button" 
                        @click="showDetails = true"
                        class="btn show-details-btn"
                        style="border: 2px solid #ced4da !important;"
                    >
                        Show details
                    </button>
                </div>

                <!-- Details Section (shown when showDetails is true) -->
                <div v-if="showDetails">
                    <div class="alert alert-info mb-3 py-2">
                        <small><i class="fas fa-info-circle me-1"></i> Optional: Assign this task to a member or coach, or leave blank to save as a general task.</small>
                    </div>
                    <!-- Task Type Selection -->
                <div class="form-group mb-3">
                    <div class="d-flex align-items-center">
                            <label class="form-label-inline mb-0" style="min-width: 80px; margin-right: 1rem; padding-right: 1rem;">
                                Assign To
                            </label>
                            <div class="flex-grow-1 task-input-wrapper" style="margin-left: 1rem;">
                            <b-form-select
                                v-model="taskForm.task_type"
                                :options="[
                                    { value: null, text: 'Not assigned (General Task)' },
                                    { value: 'member', text: 'Assign to Member' },
                                    { value: 'coach', text: 'Assign to Coach' }
                                ]"
                                @change="handleTaskTypeChange"
                                :class="{ 'is-invalid': validationErrors.task_type }"
                            ></b-form-select>
                        </div>
                    </div>
                    <div v-if="validationErrors.task_type" class="invalid-feedback d-block mt-1">
                        {{ validationErrors.task_type }}
                    </div>
                </div>

                <!-- Concerns Field (Member/Coach Search) -->
                <div class="form-group mb-3" v-if="taskForm.task_type">
                    <div class="d-flex align-items-center">
                            <label class="form-label-inline mb-0" style="min-width: 80px; margin-right: 1rem; padding-right: 1rem;">
                                Concerns
                            </label>
                            <div class="flex-grow-1 task-input-wrapper" style="margin-left: 1rem;">
                            <b-form-input
                                v-model="taskForm.concerns"
                                :placeholder="taskForm.task_type === 'member' ? 'Find a member' : 'Find a coach'"
                                @input="handleConcernsInput"
                                @focus="handleConcernsFocus"
                                :class="{ 'is-invalid': validationErrors.member_id || validationErrors.coach_id }"
                            ></b-form-input>
                        </div>
                    </div>
                    <!-- Show member search results if task_type is 'member' -->
                    <div v-if="taskForm.task_type === 'member' && memberSearchResults.length > 0" class="member-search-results mt-2">
                        <div 
                            v-for="member in memberSearchResults" 
                            :key="member.id"
                            @click="selectMember(member)"
                            class="member-result-item p-2 border rounded mb-1 cursor-pointer"
                        >
                            {{ member.membername || `${member.firstname} ${member.lastname}` }}
                        </div>
                    </div>
                    <!-- Show coach search results if task_type is 'coach' -->
                    <div v-if="taskForm.task_type === 'coach' && coachSearchResults.length > 0" class="member-search-results mt-2">
                        <div 
                            v-for="coach in coachSearchResults" 
                            :key="coach.id"
                            @click="selectCoach(coach)"
                            class="member-result-item p-2 border rounded mb-1 cursor-pointer"
                        >
                            {{ coach.name || 'Coach' }}
                        </div>
                    </div>
                    <div v-if="validationErrors.member_id" class="invalid-feedback d-block mt-1">
                        {{ validationErrors.member_id }}
                    </div>
                    <div v-if="validationErrors.coach_id" class="invalid-feedback d-block mt-1">
                        {{ validationErrors.coach_id }}
                    </div>
                </div>
                
                <!-- Coach Selection (if coach task) -->
                <div v-if="taskForm.task_type === 'coach'" class="form-group mb-3">
                    <div class="d-flex align-items-center">
                            <label class="form-label-inline mb-0" style="min-width: 80px; margin-right: 1rem; padding-right: 1rem;">
                                Coach
                            </label>
                            <div class="flex-grow-1 task-input-wrapper" style="margin-left: 1rem;">
                            <b-form-select
                                v-model="taskForm.coach_id"
                                :options="coachSelectOptions"
                                :class="{ 'is-invalid': validationErrors.coach_id }"
                                @change="handleCoachSelectChange"
                            >
                                <template #first>
                                    <option :value="null">Select Coach (Optional)</option>
                                </template>
                            </b-form-select>
                        </div>
                    </div>
                    <div v-if="validationErrors.coach_id" class="invalid-feedback d-block mt-1">
                        {{ validationErrors.coach_id }}
                    </div>
                </div>

                <!-- Details Field -->
                <div class="form-group mb-3">
                    <div class="d-flex align-items-center">
                            <label class="form-label-inline mb-0" style="min-width: 80px; margin-right: 1rem; padding-right: 1rem;">
                                Details
                            </label>
                            <div class="flex-grow-1 task-input-wrapper" style="margin-left: 4rem;">
                            <b-form-textarea
                                v-model="taskForm.description"
                                placeholder="Description"
                                rows="3"
                            ></b-form-textarea>
                        </div>
                    </div>
                </div>

                <!-- Due Date -->
                <div class="form-group mb-3">
                    <div class="d-flex align-items-center">
                            <label class="form-label-inline mb-0" style="min-width: 80px; margin-right: 1rem; padding-right: 1rem;">
                                Due Date
                            </label>
                            <div class="flex-grow-1 task-input-wrapper" style="margin-left: 1rem;">
                            <b-form-input
                                v-model="taskForm.due_date"
                                type="date"
                                placeholder="Select a date"
                            ></b-form-input>
                        </div>
                    </div>
                </div>

                <!-- Time Fields -->
                <div class="form-group mb-3">
                    <div class="d-flex align-items-center">
                            <label class="form-label-inline mb-0" style="min-width: 80px; margin-right: 1rem; padding-right: 1rem;">
                                Time
                            </label>
                            <div class="flex-grow-1 task-input-wrapper" style="margin-left: 4rem;">
                            <div class="d-flex align-items-center">
                                <b-form-select
                                    v-model="taskForm.due_hour"
                                    :options="hourOptions"
                                    class="me-2"
                                    style="width: 80px;"
                                ></b-form-select>
                                <span class="me-2">:</span>
                                <b-form-select
                                    v-model="taskForm.due_minute"
                                    :options="minuteOptions"
                                    style="width: 80px;"
                                ></b-form-select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Duration -->
                <div class="form-group mb-3">
                    <div class="d-flex align-items-center">
                            <label class="form-label-inline mb-0" style="min-width: 80px; margin-right: 1rem; padding-right: 1rem;">
                                Duration
                            </label>
                            <div class="flex-grow-1 task-input-wrapper" style="margin-left: 1rem;">
                            <b-form-select
                                v-model="taskForm.duration"
                                :options="durationOptions"
                            ></b-form-select>
                        </div>
                    </div>
                </div>

                    <!-- Task is Complete Checkbox -->
                    <div class="form-group mb-3">
                        <div class="d-flex align-items-center">
                            <label class="form-label-inline mb-0" style="min-width: 80px; margin-right: 1rem; padding-right: 1rem;">
                                Task is complete
                            </label>
                            <div class="task-input-wrapper" style="margin-left: 1rem;">
                                <b-form-checkbox v-model="taskForm.is_complete" class="mb-0">
                                </b-form-checkbox>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="modal-footer mt-4">
                    <button 
                        type="submit" 
                        class="btn btn-danger modal-save-btn"
                        :disabled="saving"
                    >
                        <span v-if="saving">
                            <i class="fas fa-spinner fa-spin me-2"></i>
                            Saving...
                        </span>
                        <span v-else>Save</span>
                    </button>
                </div>
            </form>
        </b-modal>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Tasks',
    data() {
        // Get current time and date for auto-fill
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        // Format date as YYYY-MM-DD for input field
        const currentDate = now.toISOString().split('T')[0];
        
        return {
            loading: false,
            saving: false,
            tasks: [],
            showTaskModal: false,
            isEditing: false,
            editingTask: null,
            showDetails: false,
            filters: {
                dateFilter: 'history', // Default to history (all tasks)
                taskFilter: 'all',
                coachFilter: 'all',
                searchMember: ''
            },
            taskForm: {
                title: 'New Task',
                category: 'Personal',
                description: 'This is a general task description. Please update with specific details as needed.',
                concerns: '',
                member_id: null,
                coach_id: null,
                is_complete: false,
                due_date: currentDate, // Auto-fill with current date
                due_hour: currentHour, // Auto-fill with current hour
                due_minute: currentMinute, // Auto-fill with current minute
                duration: '60', // Default to 60 minutes
                task_type: 'member' // 'member' or 'coach'
            },
            memberSearchResults: [],
            allMembers: [], // Store all members for filtering
            coaches: [],
            coachSearchResults: [], // Store coach search results
            dateFilterOptions: [
                { value: 'today', text: 'Today' },
                { value: 'week', text: 'This Week' },
                { value: 'month', text: 'This Month' },
                { value: 'history', text: 'History (All Tasks)' }
            ],
            taskFilterOptions: [
                { value: 'all', text: 'All tasks' },
                { value: 'pending', text: 'Pending' },
                { value: 'completed', text: 'Completed' },
                { value: 'in-progress', text: 'In Progress' }
            ],
            coachFilterOptions: [
                { value: 'all', text: 'All Coaches' }
            ],
            categoryOptions: [
                { value: 'Personal', text: 'Personal' },
                { value: 'Training', text: 'Training' },
                { value: 'Member Management', text: 'Member Management' },
                { value: 'Administrative', text: 'Administrative' },
                { value: 'Maintenance', text: 'Maintenance' },
                { value: 'Professional Development', text: 'Professional Development' },
                { value: 'Coaching', text: 'Coaching' },
                { value: 'Follow-up', text: 'Follow-up' },
                { value: 'Assessment', text: 'Assessment' },
                { value: 'Nutrition', text: 'Nutrition' },
                { value: 'Wellness', text: 'Wellness' },
                { value: 'Billing', text: 'Billing' },
                { value: 'Communication', text: 'Communication' },
                { value: 'Other', text: 'Other' }
            ],
            hourOptions: Array.from({ length: 24 }, (_, i) => ({ value: i, text: String(i).padStart(2, '0') })),
            minuteOptions: Array.from({ length: 60 }, (_, i) => ({ value: i, text: String(i).padStart(2, '0') })),
            durationOptions: [
                { value: null, text: 'Duration' },
                { value: '2', text: '2 minutes' },
                { value: '5', text: '5 minutes' },
                { value: '10', text: '10 minutes' },
                { value: '15', text: '15 minutes' },
                { value: '20', text: '20 minutes' },
                { value: '30', text: '30 minutes' },
                { value: '45', text: '45 minutes' },
                { value: '60', text: '1 hour' },
                { value: '90', text: '1.5 hours' },
                { value: '120', text: '2 hours' },
                { value: '180', text: '3 hours' },
                { value: '240', text: '4 hours' },
                { value: '300', text: '5 hours' },
                { value: '360', text: '6 hours' },
                { value: '420', text: '7 hours' },
                { value: '480', text: '8 hours' }
            ],
            coachSelectOptions: [],
            validationErrors: {
                title: '',
                category: '',
                task_type: '',
                coach_id: '',
                member_id: ''
            }
        };
    },
    computed: {
        isAdmin() {
            // Check if user is admin - adjust this based on your role/permission system
            try {
                const user = this.$store.getters.currentUser;
                const permissions = this.$store.getters.currentUserPermissions || [];
                // You can check for specific permission or role name
                // Adjust this condition based on your actual admin check
                // For now, show to all users - you can restrict this later
                return true; // Temporarily show to all - change to: permissions.includes('admin') || permissions.includes('administrator') || user?.role === 'admin' || user?.username === 'admin';
            } catch (error) {
                // If store is not available, show templates anyway
                return true;
            }
        },
        // Templates are tasks that are not assigned to anyone
        templates() {
            return this.tasks.filter(task => {
                // A task is a template if it has no assignment
                return !task.member_id && !task.coach_id && (!task.task_type || task.task_type === null);
            });
        },
        // Regular tasks are those assigned to members or coaches
        regularTasks() {
            return this.tasks.filter(task => {
                // A task is regular if it has an assignment
                return task.member_id || task.coach_id || (task.task_type && task.task_type !== null);
            });
        }
    },
    mounted() {
        this.loadTasks();
        this.loadCoaches();
    },
    methods: {
        goBack() {
            if (window.history.length > 1) {
                this.$router.go(-1);
            } else {
                this.$router.push({ name: 'dashboard' });
            }
        },
        async loadTasks() {
            this.loading = true;
            try {
                const params = {
                    date_filter: this.filters.dateFilter,
                    task_filter: this.filters.taskFilter,
                    coach_filter: this.filters.coachFilter,
                    search: this.filters.searchMember
                };

                const response = await axios.get('tasks', { params });
                
                if (response.data.success) {
                    this.tasks = response.data.data || [];
                } else {
                    this.tasks = [];
                }
            } catch (error) {
                this.$bvToast.toast('Error loading tasks', {
                    title: 'Error',
                    variant: 'danger',
                    solid: true
                });
                this.tasks = [];
            } finally {
                this.loading = false;
            }
        },
        async loadCoaches() {
            try {
                const response = await axios.get('coach', {
                    params: { limit: 1000 }
                });
                // API returns 'clients' array, not 'coaches'
                const coachesData = response.data?.clients || [];
                
                if (coachesData.length > 0) {
                    this.coaches = coachesData;
                    this.coachFilterOptions = [
                        { value: 'all', text: 'All Coaches' },
                        ...this.coaches.map(coach => ({
                            value: coach.id,
                            text: coach.name || 'Coach'
                        }))
                    ];
                    // Map coaches to select options format
                    this.coachSelectOptions = this.coaches.map(coach => ({
                        value: coach.id,
                        text: coach.name || 'Coach'
                    }));
                    // If task_type is 'coach', show all coaches in search results
                    if (this.taskForm.task_type === 'coach') {
                        this.coachSearchResults = this.coaches;
                    }
                } else {
                    // If no coaches returned, reset options
                    this.coaches = [];
                    this.coachSelectOptions = [];
                    this.coachSearchResults = [];
                }
            } catch (error) {
                // Reset on error
                this.coaches = [];
                this.coachSelectOptions = [];
                this.coachSearchResults = [];
            }
        },
        handleConcernsInput(value) {
            if (this.taskForm.task_type === 'member') {
                this.filterMembers(value);
            } else if (this.taskForm.task_type === 'coach') {
                this.filterCoaches(value);
            }
        },
        handleConcernsFocus() {
            // Load all members if not already loaded and task_type is member
            if (this.taskForm.task_type === 'member' && this.allMembers.length === 0) {
                this.loadAllMembers();
            } else if (this.taskForm.task_type === 'member' && this.allMembers.length > 0) {
                // Show all members when field is focused
                this.memberSearchResults = this.allMembers;
            } else if (this.taskForm.task_type === 'coach') {
                // Load coaches if not already loaded
                if (this.coaches.length === 0) {
                    this.loadCoaches();
                } else {
                    // Show all coaches when field is focused
                    this.coachSearchResults = this.coaches;
                }
            }
        },
        async loadAllMembers() {
            try {
                const response = await axios.get('get_members_without_paginate');
                // The API returns a direct array of members
                if (response.data && Array.isArray(response.data)) {
                    this.allMembers = response.data;
                    // Show all members initially
                    this.memberSearchResults = this.allMembers;
                } else {
                    this.allMembers = [];
                    this.memberSearchResults = [];
                }
            } catch (error) {
                this.allMembers = [];
                this.memberSearchResults = [];
            }
        },
        filterMembers(query) {
            if (!this.allMembers || this.allMembers.length === 0) {
                // If allMembers not loaded, load them first
                this.loadAllMembers();
                return;
            }
            
            if (!query || query.trim() === '') {
                // Show all members if query is empty
                this.memberSearchResults = this.allMembers;
                return;
            }
            
            // Filter members by name (case-insensitive)
            const searchQuery = query.toLowerCase().trim();
            this.memberSearchResults = this.allMembers.filter(member => {
                const membername = (member.membername || '').toLowerCase();
                const firstname = (member.firstname || '').toLowerCase();
                const lastname = (member.lastname || '').toLowerCase();
                const fullName = `${firstname} ${lastname}`.trim();
                
                return membername.includes(searchQuery) || 
                       firstname.includes(searchQuery) || 
                       lastname.includes(searchQuery) ||
                       fullName.includes(searchQuery);
            });
        },
        filterCoaches(query) {
            if (!this.coaches || this.coaches.length === 0) {
                // If coaches not loaded, load them first
                this.loadCoaches();
                return;
            }
            
            if (!query || query.trim() === '') {
                // Show all coaches if query is empty
                this.coachSearchResults = this.coaches;
                return;
            }
            
            // Filter coaches by name (case-insensitive)
            // API returns coaches with 'name' field already combined
            const searchQuery = query.toLowerCase().trim();
            this.coachSearchResults = this.coaches.filter(coach => {
                const name = (coach.name || '').toLowerCase();
                // Also check coach_id and code fields if they exist
                const coachId = (coach.coach_id || '').toLowerCase();
                const code = (coach.code || '').toLowerCase();
                
                return name.includes(searchQuery) || 
                       coachId.includes(searchQuery) ||
                       code.includes(searchQuery);
            });
        },
        handleTaskTypeChange() {
            this.taskForm.member_id = null;
            this.taskForm.coach_id = null;
            this.taskForm.concerns = '';
            this.memberSearchResults = [];
            this.coachSearchResults = [];
            // Load all members when task_type is set to 'member'
            if (this.taskForm.task_type === 'member') {
                this.loadAllMembers();
            } else if (this.taskForm.task_type === 'coach') {
                // Load coaches when task_type is set to 'coach'
                this.loadCoaches();
            } else {
                this.allMembers = [];
            }
            // Clear validation errors when task type changes
            this.clearValidationError('member_id');
            this.clearValidationError('coach_id');
            this.clearValidationError('task_type');
        },
        selectMember(member) {
            this.taskForm.member_id = member.id;
            this.taskForm.concerns = member.membername || `${member.firstname} ${member.lastname}`;
            this.memberSearchResults = [];
            // Clear validation error when member is selected
            this.clearValidationError('member_id');
        },
        selectCoach(coach) {
            this.taskForm.coach_id = coach.id;
            this.taskForm.concerns = coach.name || 'Coach';
            this.coachSearchResults = [];
            // Clear validation error when coach is selected
            this.clearValidationError('coach_id');
        },
        handleCoachSelectChange() {
            // When coach is selected from dropdown, update concerns field
            if (this.taskForm.coach_id) {
                const selectedCoach = this.coaches.find(c => c.id === this.taskForm.coach_id);
                if (selectedCoach) {
                    this.taskForm.concerns = selectedCoach.name || 'Coach';
                }
            } else {
                // If coach is cleared, clear concerns field
                this.taskForm.concerns = '';
            }
            this.clearValidationError('coach_id');
        },
        openNewTaskModal() {
            this.isEditing = false;
            this.editingTask = null;
            this.showDetails = false;
            // Reset form with default values including "New Task" title
            this.resetTaskForm();
            // Ensure title is set to "New Task" as default
            this.$nextTick(() => {
                if (!this.taskForm.title || this.taskForm.title.trim() === '') {
                    this.taskForm.title = 'New Task';
                }
                // If task_type is 'coach', ensure coaches are loaded
                if (this.taskForm.task_type === 'coach' && this.coaches.length === 0) {
                    this.loadCoaches();
                }
            });
            this.showTaskModal = true;
        },
        editTask(task) {
            this.isEditing = true;
            this.editingTask = task;
            // If task is unassigned (template), start with showDetails false
            // If task is assigned, show all details
            const isTemplate = !task.member_id && !task.coach_id && (!task.task_type || task.task_type === null);
            this.showDetails = !isTemplate;
            
            // Parse time from task if available (due_time field)
            let dueHour = null;
            let dueMinute = null;
            if (task.due_time) {
                // If due_time is in HH:MM format
                const timeParts = task.due_time.split(':');
                if (timeParts.length === 2) {
                    dueHour = parseInt(timeParts[0], 10);
                    dueMinute = parseInt(timeParts[1], 10);
                }
            }
            // If no time in task, use current time as default
            if (dueHour === null || dueMinute === null) {
                const now = new Date();
                dueHour = now.getHours();
                dueMinute = now.getMinutes();
            }
            
            // Get current date for auto-fill if due_date is empty
            const now = new Date();
            const currentDate = now.toISOString().split('T')[0];
            
            this.taskForm = {
                title: task.title || '',
                category: task.category || 'Personal',
                description: task.description || 'This is a general task description. Please update with specific details as needed.',
                concerns: task.member_name || task.coach_name || '',
                member_id: task.member_id || null,
                coach_id: task.coach_id || null,
                is_complete: task.status === 'completed',
                due_date: task.due_date || currentDate, // Auto-fill with current date if empty
                due_hour: dueHour,
                due_minute: dueMinute,
                duration: task.duration || '60',
                task_type: task.member_id ? 'member' : (task.coach_id ? 'coach' : null),
                task_id: task.id
            };
            // Load all members if editing a member task or if it's a template (user might assign to member)
            if (this.taskForm.task_type === 'member' || isTemplate) {
                this.loadAllMembers();
            } else if (this.taskForm.task_type === 'coach') {
                // Load coaches if editing a coach task
                this.loadCoaches();
            }
            this.showTaskModal = true;
        },
        closeTaskModal() {
            this.showTaskModal = false;
            this.isEditing = false;
            this.editingTask = null;
            this.showDetails = false;
            this.resetTaskForm();
        },
        resetTaskForm() {
            // Get current time and date for auto-fill
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            // Format date as YYYY-MM-DD for input field
            const currentDate = now.toISOString().split('T')[0];
            
            this.taskForm = {
                title: 'New Task',
                category: 'Personal',
                description: 'This is a general task description. Please update with specific details as needed.',
                concerns: '',
                member_id: null,
                coach_id: null,
                is_complete: false,
                due_date: currentDate, // Auto-fill with current date
                due_hour: currentHour, // Auto-fill with current hour
                due_minute: currentMinute, // Auto-fill with current minute
                duration: '60', // Default to 60 minutes
                task_type: 'member'
            };
            this.memberSearchResults = [];
            this.coachSearchResults = [];
            this.allMembers = [];
            this.clearValidationErrors();
        },
        clearValidationErrors() {
            this.validationErrors = {
                title: '',
                category: '',
                task_type: '',
                coach_id: '',
                member_id: ''
            };
        },
        clearValidationError(field) {
            if (this.validationErrors[field]) {
                this.validationErrors[field] = '';
            }
        },
        async saveTask() {
            // Clear previous validation errors
            this.clearValidationErrors();

            // Frontend validation - only require title and category
            let hasErrors = false;

            // Check required fields - only title and category are required
            if (!this.taskForm.title || this.taskForm.title.trim() === '') {
                this.validationErrors.title = 'Task title is required';
                hasErrors = true;
            }

            if (!this.taskForm.category) {
                this.validationErrors.category = 'Category is required';
                hasErrors = true;
            }

            // No other validations - member/coach selection is optional

            // If validation fails, stop and show field-level errors
            if (hasErrors) {
                this.saving = false;
                // Scroll to first error field
                this.$nextTick(() => {
                    const firstError = document.querySelector('.is-invalid');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        firstError.focus();
                    }
                });
                return;
            }

            this.saving = true;
            try {
                // Build task data with only required fields
                const taskData = {
                    title: this.taskForm.title,
                    category: this.taskForm.category,
                    description: this.taskForm.description || '',
                    status: this.taskForm.is_complete ? 'completed' : 'pending',
                    due_date: this.taskForm.due_date || null
                };

                // Only add task_type, member_id, or coach_id if showDetails is opened and they are set
                // Tasks can be saved without assignment (same as templates)
                if (this.showDetails && this.taskForm.task_type) {
                    taskData.task_type = this.taskForm.task_type;
                    
                    // Only add IDs if they are actually selected
                    if (this.taskForm.task_type === 'member' && this.taskForm.member_id) {
                        taskData.member_id = this.taskForm.member_id;
                    } else if (this.taskForm.task_type === 'coach' && this.taskForm.coach_id) {
                        taskData.coach_id = this.taskForm.coach_id;
                    }
                } else if (this.showDetails && !this.taskForm.task_type) {
                    // If showDetails is open but no task_type selected, explicitly set to null
                    // This allows converting assigned tasks back to unassigned
                    taskData.task_type = null;
                    taskData.member_id = null;
                    taskData.coach_id = null;
                }
                // If showDetails is false or task_type is not set, don't send task_type, member_id, or coach_id
                // Task will be saved as unassigned (same as templates)

                let response;
                if (this.isEditing && this.editingTask) {
                    response = await axios.put(`tasks/${this.editingTask.id}`, taskData);
                } else {
                    response = await axios.post('tasks', taskData);
                }

                if (response.data.success) {
                    this.$bvToast.toast(
                        this.isEditing ? 'Task updated successfully' : 'Task created successfully',
                        {
                            title: 'Success',
                            variant: 'success',
                            solid: true
                        }
                    );
                    this.closeTaskModal();
                    this.loadTasks();
                } else {
                    throw new Error(response.data.message || 'Failed to save task');
                }
            } catch (error) {
                this.$bvToast.toast(
                    error.response?.data?.message || 'Error saving task',
                    {
                        title: 'Error',
                        variant: 'danger',
                        solid: true
                    }
                );
            } finally {
                this.saving = false;
            }
        },
        async toggleTaskStatus(task) {
            try {
                const newStatus = task.status === 'completed' ? 'pending' : 'completed';
                const taskData = {
                    status: newStatus
                };
                
                // Only include task_type if it exists (for assigned tasks)
                if (task.task_type) {
                    taskData.task_type = task.task_type;
                } else if (task.member_id) {
                    taskData.task_type = 'member';
                } else if (task.coach_id) {
                    taskData.task_type = 'coach';
                }

                await axios.put(`tasks/${task.id}`, taskData);
                this.loadTasks();
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Error updating task status';
                this.$bvToast.toast(errorMessage, {
                    title: 'Error',
                    variant: 'danger',
                    solid: true
                });
            }
        },
        async deleteTask(task) {
            // Show confirmation dialog using SweetAlert
            const result = await this.$swal({
                title: 'Are you sure?',
                text: `Do you want to delete "${task.title}"? This action cannot be undone.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                reverseButtons: true
            });

            if (!result.isConfirmed) {
                return;
            }

            try {
                // Send task_type if it exists, otherwise don't send it (backend handles null)
                const deleteParams = {};
                if (task.task_type) {
                    deleteParams.task_type = task.task_type;
                }
                await axios.delete(`tasks/${task.id}`, {
                    params: deleteParams
                });
                this.$bvToast.toast('Task deleted successfully', {
                    title: 'Success',
                    variant: 'success',
                    solid: true
                });
                this.loadTasks();
            } catch (error) {
                this.$bvToast.toast(
                    error.response?.data?.message || 'Error deleting task',
                    {
                        title: 'Error',
                        variant: 'danger',
                        solid: true
                    }
                );
            }
        },
        formatDate(date) {
            if (!date) return '';
            const d = new Date(date);
            return d.toLocaleDateString();
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/sass/_variables.scss";

.tasks-page {
    padding: 1.5rem;
}

.breadcrumb-nav-row {
    margin-bottom: 1.5rem;
}

.tasks-header {
    .page-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: #000;
    }

    .new-task-btn {
        background-color: #dc3545;
        border: none;
        border-radius: 8px;
        padding: 0.5rem 1.5rem;
        font-weight: 500;

        &:hover {
            background-color: #dc3545;
        }
    }
}

.filters-section {
    .filter-select,
    .filter-input {
        border-radius: 8px;
        border: 1px solid #ddd;
    }
}

.tasks-list {
    .task-item {
        background-color: #f5f5f5;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 0.75rem;
        display: flex;
        align-items: flex-start;
        gap: 1rem;

        &.task-completed {
            opacity: 0.6;
        }

        .task-checkbox {
            margin-top: 0.25rem;
        }

        .task-content {
            .task-title {
                font-weight: 500;
                margin-bottom: 0.25rem;

                .member-name,
                .coach-name {
                    color: #4A90E2;
                }
            }

            .task-description {
                color: #666;
                font-size: 0.875rem;
                margin-bottom: 0.5rem;
            }

            .task-meta {
                display: flex;
                gap: 1rem;
                font-size: 0.875rem;
                color: #999;

                .task-category {
                    font-weight: 500;
                }
            }
        }

        .task-actions {
            display: flex;
            gap: 0.5rem;
        }
    }
}

.task-modal {
    .member-search-results {
        max-height: 150px;
        overflow-y: auto;
        border: 1px solid #ddd;
        border-radius: 4px;

        .member-result-item {
            cursor: pointer;
            transition: background-color 0.2s;

            &:hover {
                background-color: #f0f0f0;
            }
        }
    }

    .modal-footer {
        border-top: 1px solid #ddd;
        padding-top: 1rem;
        margin-top: 1rem;
    }

    .invalid-feedback {
        display: block;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 0.875rem;
        color: #dc3545;
    }

    .is-invalid {
        border-color: #dc3545;
        
        &:focus {
            border-color: #dc3545;
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
        }
    }
}

.cursor-pointer {
    cursor: pointer;
}


.task-modal {
    .form-label-inline {
        min-width: 140px !important;
        font-weight: 500;
        color: #333;
        margin-right: 4rem !important;
        padding-right: 2rem !important;
    }

    .task-input-wrapper {
        margin-left: 4rem !important;
    }

    .info-icon-label {
        font-size: 0.75rem;
        cursor: help;
        color: #6c757d;
        opacity: 0.7;
        transition: opacity 0.2s;
        flex-shrink: 0;
        line-height: 1;
        margin-top: 2px;

        &:hover {
            opacity: 1;
            color: #495057;
        }
    }

    .show-details-btn {
        border-radius: 20px !important;
        padding: 0.5rem 1.5rem !important;
        font-weight: 400;
        border: 2px solid #ced4da !important;
        background-color: #f8f9fa !important;
        color: #495057 !important;
        transition: all 0.2s;
        text-align: left;
        outline: none !important;
        box-shadow: none !important;

        &:hover {
            background-color: #e9ecef !important;
            border-color: #adb5bd !important;
            color: #495057 !important;
        }

        &:focus {
            box-shadow: none !important;
            border: 2px solid #ced4da !important;
            outline: none !important;
        }

        &:active {
            border: 2px solid #ced4da !important;
            box-shadow: none !important;
        }
    }

    .modal-footer {
        border-top: 1px solid #dee2e6;
        padding-top: 1rem;
        margin-top: 1rem;
        display: flex;
        justify-content: flex-end;
    }

    .modal-save-btn {
        background-color: #dc3545;
        border-color: #dc3545;
        color: #fff;
        padding: 0.5rem 1.5rem;
        border-radius: 4px;
        font-weight: 500;

        &:hover:not(:disabled) {
            background-color: #c82333;
            border-color: #bd2130;
            color: #fff;
        }

        &:focus {
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
        }

        &:disabled {
            opacity: 0.65;
        }
    }
}
</style>

<!-- Global styles for modal (not scoped since modal renders outside component) -->
<style lang="scss">
// Target modal body and content
.modal.task-modal,
.modal.task-modal .modal-body,
.task-modal {
    .form-label-inline {
        min-width: 140px !important;
        font-weight: 500 !important;
        color: #333 !important;
        margin-right: 4rem !important;
        padding-right: 2rem !important;
        display: inline-block !important;
    }

    .task-input-wrapper {
        margin-left: 4rem !important;
        display: inline-block !important;
        flex: 1 1 auto !important;
    }
}

// More aggressive selectors
body .modal.task-modal .form-label-inline,
body .modal.task-modal label.form-label-inline {
    min-width: 140px !important;
    margin-right: 4rem !important;
    padding-right: 2rem !important;
}

body .modal.task-modal .task-input-wrapper,
body .modal.task-modal div.task-input-wrapper {
    margin-left: 4rem !important;
}
</style>

