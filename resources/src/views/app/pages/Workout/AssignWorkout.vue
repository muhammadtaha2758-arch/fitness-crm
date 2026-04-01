<template>
    <div class="main-content">
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-dumbbell me-2"></i>
                Assign Workouts
            </h1>
            <breadcumb :page="'Assign Workouts'" :folder="'Workout'" />
        </div>
        <div class="page-description">
            <p>
                Assign personalized workout plans to your members and track
                their progress effectively.
            </p>
        </div>
        <div
            v-if="isLoading"
            class="loading_page spinner spinner-primary mr-3"
        ></div>

        <div v-else>
            <!-- Statistics Overview -->
            <div class="stats-container mb-4">
                <div class="row">
                    <div class="col-lg-3 col-md-6 mb-3">
                        <div class="stat-card stat-card-primary">
                            <div class="stat-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <div class="stat-content">
                                <h3>{{ totalMembers }}</h3>
                                <p>Total Members</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-3">
                        <div class="stat-card stat-card-success">
                            <div class="stat-icon">
                                <i class="fas fa-dumbbell"></i>
                            </div>
                            <div class="stat-content">
                                <h3>{{ totalWorkouts }}</h3>
                                <p>Available Workouts</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-3">
                        <div class="stat-card stat-card-warning">
                            <div class="stat-icon">
                                <i class="fas fa-calendar-check"></i>
                            </div>
                            <div class="stat-content">
                                <h3>{{ activeAssignments }}</h3>
                                <p>Active Assignments</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-3">
                        <div class="stat-card stat-card-info">
                            <div class="stat-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="stat-content">
                                <h3>{{ completionRate }}%</h3>
                                <p>Completion Rate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Assignment Form -->
            <div class="assignment-form-container mb-4">
                <div class="form-card">
                    <div class="form-header">
                        <div class="header-icon">
                            <i class="fas fa-user-plus"></i>
                        </div>
                        <h2 class="form-title">Assign Workouts to Members</h2>
                        <p class="form-subtitle">
                            Create personalized workout assignments for your
                            members
                        </p>
                    </div>

                    <form
                        @submit.prevent="assignWorkout"
                        class="assignment-form"
                    >
                        <!-- Section: Member and Workout Selection -->
                        <div class="form-section">
                            <div class="section-header">
                                <div class="section-icon">
                                    <i class="fas fa-users"></i>
                                </div>
                                <h5 class="section-title">
                                    Member & Workout Selection
                                </h5>
                            </div>
                            <div class="section-content">
                                <div class="row g-4">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label"
                                                >Select Member</label
                                            >
                                            <v-select
                                                v-model="form.member"
                                                :options="memberOptions"
                                                placeholder="Choose a member..."
                                                :reduce="(label) => label.value"
                                                class="form-control"
                                                :class="{
                                                    'has-value': form.member,
                                                }"
                                            />
                                            <div class="input-icon">
                                                <i class="fas fa-user"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label"
                                                >Workout or Plan</label
                                            >
                                            <v-select
                                                v-model="form.assignment"
                                                :options="workoutOptions"
                                                placeholder="Choose workout or plan..."
                                                :reduce="(label) => label.value"
                                                class="form-control"
                                                :class="{
                                                    'has-value':
                                                        form.assignment,
                                                }"
                                            />
                                            <div class="input-icon">
                                                <i class="fas fa-dumbbell"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Section: Schedule Settings -->
                        <div class="form-section">
                            <div class="section-header">
                                <div class="section-icon">
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <h5 class="section-title">Schedule Settings</h5>
                            </div>
                            <div class="section-content">
                                <div class="row g-4">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label"
                                                >Start Date:</label
                                            >
                                            <b-form-datepicker
                                                v-model="form.startDate"
                                                class="form-control"
                                                :class="{
                                                    'has-value': form.startDate,
                                                }"
                                                placeholder="Select start date"
                                            ></b-form-datepicker>
                                            <div class="input-icon">
                                                <i class="fas fa-calendar"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label"
                                                >End Date (Optional)</label
                                            >
                                            <b-form-datepicker
                                                v-model="form.endDate"
                                                class="form-control"
                                                :class="{
                                                    'has-value': form.endDate,
                                                }"
                                                placeholder="Select end date"
                                            ></b-form-datepicker>
                                            <div class="input-icon">
                                                <i
                                                    class="fas fa-calendar-times"
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label"
                                                >Frequency</label
                                            >
                                            <select
                                                v-model="form.frequency"
                                                class="form-control"
                                                :class="{
                                                    'has-value': form.frequency,
                                                }"
                                            >
                                                <option disabled value="">
                                                    Select Frequency
                                                </option>
                                                <option value="daily">
                                                    Daily
                                                </option>
                                                <option value="weekly">
                                                    Weekly
                                                </option>
                                                <option value="biweekly">
                                                    Bi-weekly
                                                </option>
                                                <option value="monthly">
                                                    Monthly
                                                </option>
                                                <option value="custom">
                                                    Custom
                                                </option>
                                            </select>
                                            <div class="input-icon">
                                                <i class="fas fa-clock"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Section: Additional Settings -->
                        <div class="form-section">
                            <div class="section-header">
                                <div class="section-icon">
                                    <i class="fas fa-cog"></i>
                                </div>
                                <h5 class="section-title">
                                    Additional Settings
                                </h5>
                            </div>
                            <div class="section-content">
                                <div class="row g-4">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label"
                                                >Difficulty Level</label
                                            >
                                            <select
                                                v-model="form.difficulty"
                                                class="form-control"
                                                :class="{
                                                    'has-value':
                                                        form.difficulty,
                                                }"
                                            >
                                                <option disabled value="">
                                                    Select Difficulty
                                                </option>
                                                <option value="beginner">
                                                    Beginner
                                                </option>
                                                <option value="intermediate">
                                                    Intermediate
                                                </option>
                                                <option value="advanced">
                                                    Advanced
                                                </option>
                                            </select>
                                            <div class="input-icon">
                                                <i
                                                    class="fas fa-chart-line"
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label"
                                                >Priority</label
                                            >
                                            <select
                                                v-model="form.priority"
                                                class="form-control"
                                                :class="{
                                                    'has-value': form.priority,
                                                }"
                                            >
                                                <option disabled value="">
                                                    Select Priority
                                                </option>
                                                <option value="low">Low</option>
                                                <option value="medium">
                                                    Medium
                                                </option>
                                                <option value="high">
                                                    High
                                                </option>
                                                <option value="urgent">
                                                    Urgent
                                                </option>
                                            </select>
                                            <div class="input-icon">
                                                <i
                                                    class="fas fa-exclamation-triangle"
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group mt-3">
                                    <label class="form-label"
                                        >Notes (Optional)</label
                                    >
                                    <textarea
                                        v-model="form.notes"
                                        class="form-control"
                                        rows="3"
                                        placeholder="Add any special instructions or notes for this assignment..."
                                        :class="{ 'has-value': form.notes }"
                                    ></textarea>
                                    <div class="input-icon textarea-icon">
                                        <i class="fas fa-sticky-note"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Submit Section -->
                        <div class="submit-section">
                            <div class="submit-buttons">
                                <b-button
                                    type="submit"
                                    variant="primary"
                                    class="submit-btn"
                                    :disabled="!isFormValid"
                                >
                                    <i class="fas fa-plus"></i>
                                    Assign Workout
                                </b-button>
                                <b-button
                                    @click="assignToAllMembers"
                                    variant="success"
                                    class="submit-btn submit-btn-all"
                                    :disabled="!isBulkFormValid"
                                >
                                    <i class="fas fa-users"></i>
                                    Assign to All Members
                                </b-button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Assignments Table -->
            <div class="assignments-container">
                <div class="assignments-card">
                    <div class="assignments-header">
                        <h4>Current Assignments</h4>
                        <div class="header-actions">
                            <b-button
                                variant="outline-info"
                                size="sm"
                                class="btn-filter"
                            >
                                <i class="fas fa-filter"></i>
                                Filter
                            </b-button>
                            <b-button
                                variant="outline-success"
                                size="sm"
                                class="btn-export"
                            >
                                <i class="fas fa-file-export"></i>
                                Export
                            </b-button>
                            <span class="assignment-count"
                                >{{ assignedWorkouts.length }} assignments</span
                            >
                        </div>
                    </div>

                    <!-- Professional Table -->
                    <div class="table-responsive">
                        <table class="table table-hover assignments-table">
                            <thead>
                                <tr>
                                    <th>
                                        <b-form-checkbox
                                            v-model="selectAll"
                                            @change="toggleSelectAll"
                                        ></b-form-checkbox>
                                    </th>
                                    <th>Member</th>
                                    <th>Workout/Plan</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Status</th>
                                    <th>Progress</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(
                                        assignment, index
                                    ) in assignedWorkouts"
                                    :key="index"
                                    class="assignment-row"
                                >
                                    <td>
                                        <b-form-checkbox
                                            v-model="assignment.selected"
                                        ></b-form-checkbox>
                                    </td>
                                    <td>
                                        <div class="member-info">
                                            <div class="member-avatar">
                                                <img
                                                    :src="
                                                        assignment.memberAvatar ||
                                                        '/images/avatar/no_avatar.png'
                                                    "
                                                    :alt="assignment.memberName"
                                                />
                                            </div>
                                            <div class="member-details">
                                                <div class="member-name">
                                                    {{ assignment.memberName }}
                                                </div>
                                                <div class="member-email">
                                                    {{ assignment.memberEmail }}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="workout-info">
                                            <div class="workout-name">
                                                {{ assignment.workoutName }}
                                            </div>
                                            <div class="workout-category">
                                                {{ assignment.workoutCategory }}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="date-badge">{{
                                            formatDate(assignment.startDate)
                                        }}</span>
                                    </td>
                                    <td>
                                        <span
                                            class="date-badge"
                                            v-if="assignment.endDate"
                                            >{{
                                                formatDate(assignment.endDate)
                                            }}</span
                                        >
                                        <span class="no-date" v-else>-</span>
                                    </td>
                                    <td>
                                        <span
                                            :class="
                                                getStatusBadgeClass(
                                                    assignment.status
                                                )
                                            "
                                            class="status-badge"
                                        >
                                            {{ assignment.status }}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="progress-container">
                                            <div class="progress-bar">
                                                <div
                                                    class="progress-fill"
                                                    :style="{
                                                        width:
                                                            assignment.progress +
                                                            '%',
                                                    }"
                                                ></div>
                                            </div>
                                            <span class="progress-text"
                                                >{{
                                                    assignment.progress
                                                }}%</span
                                            >
                                        </div>
                                    </td>
                                    <td>
                                        <div class="action-buttons">
                                            <b-button
                                                size="sm"
                                                variant="outline-primary"
                                                @click="editAssignment(index)"
                                                class="action-btn"
                                            >
                                                <i class="fas fa-edit"></i>
                                            </b-button>
                                            <b-button
                                                size="sm"
                                                variant="outline-success"
                                                @click="viewProgress(index)"
                                                class="action-btn"
                                            >
                                                <i class="fas fa-chart-bar"></i>
                                            </b-button>
                                            <b-button
                                                size="sm"
                                                variant="outline-danger"
                                                @click="removeAssignment(index)"
                                                class="action-btn"
                                            >
                                                <i class="fas fa-trash"></i>
                                            </b-button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Empty State -->
                    <div
                        v-if="assignedWorkouts.length === 0"
                        class="empty-state"
                    >
                        <i class="fas fa-clipboard-list"></i>
                        <h4>No Assignments Yet</h4>
                        <p>
                            Start by assigning workouts to your members using
                            the form above.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Progress Modal -->
        <b-modal
            id="progress-modal"
            title="Workout Progress"
            size="lg"
            centered
        >
            <div class="progress-modal-content">
                <div class="member-progress-header">
                    <div class="member-info-large">
                        <img
                            :src="
                                getSelectedAssignmentValue('memberAvatar') ||
                                '/images/avatar/no_avatar.png'
                            "
                            :alt="getSelectedAssignmentValue('memberName')"
                            class="member-avatar-large"
                        />
                        <div class="member-details-large">
                            <h5>
                                {{ getSelectedAssignmentValue("memberName") }}
                            </h5>
                            <p>
                                {{ getSelectedAssignmentValue("memberEmail") }}
                            </p>
                        </div>
                    </div>
                    <div class="workout-info-large">
                        <h6>{{ getSelectedAssignmentValue("workoutName") }}</h6>
                        <span class="workout-category-badge">{{
                            getSelectedAssignmentValue("workoutCategory")
                        }}</span>
                    </div>
                </div>

                <div class="progress-stats">
                    <div class="stat-item">
                        <div class="stat-value">
                            {{ getSelectedAssignmentValue("progress") }}%
                        </div>
                        <div class="stat-label">Completion</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">
                            {{ getSelectedAssignmentValue("status") }}
                        </div>
                        <div class="stat-label">Status</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">
                            {{
                                formatDate(
                                    getSelectedAssignmentValue("startDate")
                                )
                            }}
                        </div>
                        <div class="stat-label">Start Date</div>
                    </div>
                </div>

                <div class="progress-chart">
                    <h6>Progress Timeline</h6>
                    <div class="timeline">
                        <div class="timeline-item completed">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <h6>Workout Started</h6>
                                <p>
                                    {{
                                        formatDate(
                                            getSelectedAssignmentValue(
                                                "startDate"
                                            )
                                        )
                                    }}
                                </p>
                            </div>
                        </div>
                        <div
                            class="timeline-item"
                            :class="{
                                completed:
                                    getSelectedAssignmentValue('progress') >=
                                    25,
                            }"
                        >
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <h6>25% Complete</h6>
                                <p>First milestone reached</p>
                            </div>
                        </div>
                        <div
                            class="timeline-item"
                            :class="{
                                completed:
                                    getSelectedAssignmentValue('progress') >=
                                    50,
                            }"
                        >
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <h6>50% Complete</h6>
                                <p>Halfway there!</p>
                            </div>
                        </div>
                        <div
                            class="timeline-item"
                            :class="{
                                completed:
                                    getSelectedAssignmentValue('progress') >=
                                    75,
                            }"
                        >
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <h6>75% Complete</h6>
                                <p>Almost finished</p>
                            </div>
                        </div>
                        <div
                            class="timeline-item"
                            :class="{
                                completed:
                                    getSelectedAssignmentValue('progress') >=
                                    100,
                            }"
                        >
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <h6>100% Complete</h6>
                                <p>Workout finished!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
            selectAll: false,
            selectedAssignment: null,
            form: {
                member: null,
                assignment: null,
                startDate: null,
                endDate: null,
                frequency: "",
                difficulty: "",
                priority: "",
                notes: "",
            },
            assignedWorkouts: [
                {
                    memberName: "John Doe",
                    memberEmail: "john@example.com",
                    memberAvatar: "/images/avatar/no_avatar.png",
                    workoutName: "Full Body HIIT (Workout)",
                    workoutCategory: "HIIT",
                    startDate: "2024-01-15",
                    endDate: "2024-02-15",
                    frequency: "weekly",
                    difficulty: "intermediate",
                    priority: "high",
                    notes: "Focus on form and consistency",
                    status: "Active",
                    progress: 75,
                    selected: false,
                },
                {
                    memberName: "Jane Smith",
                    memberEmail: "jane@example.com",
                    memberAvatar: "/images/avatar/no_avatar.png",
                    workoutName: "30-Day Fat Burn Plan (Plan)",
                    workoutCategory: "Weight Loss",
                    startDate: "2024-01-10",
                    endDate: "2024-02-10",
                    frequency: "daily",
                    difficulty: "beginner",
                    priority: "medium",
                    notes: "Great progress so far!",
                    status: "Active",
                    progress: 90,
                    selected: false,
                },
                {
                    memberName: "Mike Johnson",
                    memberEmail: "mike@example.com",
                    memberAvatar: "/images/avatar/no_avatar.png",
                    workoutName: "Upper Body Strength (Workout)",
                    workoutCategory: "Strength",
                    startDate: "2024-01-05",
                    endDate: null,
                    frequency: "biweekly",
                    difficulty: "advanced",
                    priority: "low",
                    notes: "Increase weight gradually",
                    status: "Completed",
                    progress: 100,
                    selected: false,
                },
                {
                    memberName: "Sarah Wilson",
                    memberEmail: "sarah@example.com",
                    memberAvatar: "/images/avatar/no_avatar.png",
                    workoutName: "Cardio Blast (Workout)",
                    workoutCategory: "Cardio",
                    startDate: "2024-01-20",
                    endDate: "2024-01-25",
                    frequency: "weekly",
                    difficulty: "intermediate",
                    priority: "high",
                    notes: "Paused due to injury",
                    status: "Paused",
                    progress: 25,
                    selected: false,
                },
            ],
            memberOptions: [
                {
                    value: "1",
                    label: "John Doe",
                    email: "john@example.com",
                    avatar: "/images/avatar/no_avatar.png",
                },
                {
                    value: "2",
                    label: "Jane Smith",
                    email: "jane@example.com",
                    avatar: "/images/avatar/no_avatar.png",
                },
                {
                    value: "3",
                    label: "Mike Johnson",
                    email: "mike@example.com",
                    avatar: "/images/avatar/no_avatar.png",
                },
                {
                    value: "4",
                    label: "Sarah Wilson",
                    email: "sarah@example.com",
                    avatar: "/images/avatar/no_avatar.png",
                },
                {
                    value: "5",
                    label: "David Brown",
                    email: "david@example.com",
                    avatar: "/images/avatar/no_avatar.png",
                },
            ],
            workoutOptions: [
                {
                    value: "w1",
                    label: "Full Body HIIT (Workout)",
                    category: "HIIT",
                },
                {
                    value: "w2",
                    label: "Upper Body Strength (Workout)",
                    category: "Strength",
                },
                {
                    value: "w3",
                    label: "Cardio Blast (Workout)",
                    category: "Cardio",
                },
                {
                    value: "p1",
                    label: "30-Day Fat Burn Plan (Plan)",
                    category: "Weight Loss",
                },
                {
                    value: "p2",
                    label: "Muscle Building Program (Plan)",
                    category: "Strength",
                },
                {
                    value: "p3",
                    label: "Beginner Fitness Plan (Plan)",
                    category: "General",
                },
            ],
            // Statistics data
            totalMembers: 125,
            totalWorkouts: 45,
            activeAssignments: 89,
            completionRate: 78,
        };
    },
    computed: {
        isFormValid() {
            return (
                this.form.member && this.form.assignment && this.form.startDate
            );
        },
        isBulkFormValid() {
            return (
                this.form.assignment && this.form.startDate
            );
        },
    },
    methods: {
        assignWorkout() {
            if (this.isFormValid) {
                const member = this.memberOptions.find(
                    (m) => m.value === this.form.member
                );
                const workout = this.workoutOptions.find(
                    (w) => w.value === this.form.assignment
                );

                const newAssignment = {
                    memberName: member.label,
                    memberEmail: member.email,
                    memberAvatar: member.avatar,
                    workoutName: workout.label,
                    workoutCategory: workout.category,
                    startDate: this.form.startDate,
                    endDate: this.form.endDate,
                    frequency: this.form.frequency,
                    difficulty: this.form.difficulty,
                    priority: this.form.priority,
                    notes: this.form.notes,
                    status: "Active",
                    progress: 0,
                    selected: false,
                };

                this.assignedWorkouts.push(newAssignment);
                this.resetForm();
                this.$bvToast.toast("Workout assigned successfully!", {
                    title: "Success",
                    variant: "success",
                    solid: true,
                });
            }
        },
        resetForm() {
            this.form = {
                member: null,
                assignment: null,
                startDate: null,
                endDate: null,
                frequency: "",
                difficulty: "",
                priority: "",
                notes: "",
            };
        },
        removeAssignment(index) {
            this.$bvModal
                .msgBoxConfirm(
                    "Are you sure you want to remove this assignment?",
                    {
                        title: "Confirm Removal",
                        size: "sm",
                        buttonSize: "sm",
                        okVariant: "danger",
                        okTitle: "Remove",
                        cancelTitle: "Cancel",
                        footerClass: "p-2",
                        hideHeaderClose: false,
                        centered: true,
                    }
                )
                .then((value) => {
                    if (value) {
                        this.assignedWorkouts.splice(index, 1);
                        this.$bvToast.toast(
                            "Assignment removed successfully!",
                            {
                                title: "Success",
                                variant: "success",
                                solid: true,
                            }
                        );
                    }
                });
        },
        editAssignment(index) {
            const assignment = this.assignedWorkouts[index];
            const member = this.memberOptions.find(
                (m) => m.label === assignment.memberName
            );
            const workout = this.workoutOptions.find(
                (w) => w.label === assignment.workoutName
            );

            this.form = {
                member: member ? member.value : null,
                assignment: workout ? workout.value : null,
                startDate: assignment.startDate,
                endDate: assignment.endDate,
                frequency: assignment.frequency,
                difficulty: assignment.difficulty,
                priority: assignment.priority,
                notes: assignment.notes,
            };
            this.assignedWorkouts.splice(index, 1);
        },
        viewProgress(index) {
            this.selectedAssignment = this.assignedWorkouts[index];
            this.$bvModal.show("progress-modal");
        },
        toggleSelectAll() {
            this.assignedWorkouts.forEach((assignment) => {
                assignment.selected = this.selectAll;
            });
        },
        formatDate(date) {
            if (!date) return "-";
            return new Date(date).toLocaleDateString();
        },
        getStatusBadgeClass(status) {
            const classes = {
                Active: "status-active",
                Completed: "status-completed",
                Paused: "status-paused",
                Expired: "status-expired",
            };
            return classes[status] || "status-default";
        },
        getSelectedAssignmentValue(property) {
            return this.selectedAssignment && this.selectedAssignment[property]
                ? this.selectedAssignment[property]
                : "";
        },
        assignToAllMembers() {
            if (this.isBulkFormValid) {
                const workout = this.workoutOptions.find(
                    (w) => w.value === this.form.assignment
                );

                // Show confirmation modal
                this.$bvModal
                    .msgBoxConfirm(
                        `Are you sure you want to assign "${workout.label}" to all ${this.memberOptions.length} members?`,
                        {
                            title: "Confirm Bulk Assignment",
                            size: "md",
                            buttonSize: "sm",
                            okVariant: "success",
                            okTitle: "Assign to All",
                            cancelTitle: "Cancel",
                            footerClass: "p-2",
                            hideHeaderClose: false,
                            centered: true,
                        }
                    )
                    .then((confirmed) => {
                        if (confirmed) {
                            this.performBulkAssignment(workout);
                        }
                    });
            }
        },
        performBulkAssignment(workout) {
            let assignmentsCreated = 0;
            
            this.memberOptions.forEach((member) => {
                // Check if assignment already exists for this member and workout
                const existingAssignment = this.assignedWorkouts.find(
                    (assignment) => 
                        assignment.memberName === member.label && 
                        assignment.workoutName === workout.label
                );

                if (!existingAssignment) {
                    const newAssignment = {
                        memberName: member.label,
                        memberEmail: member.email,
                        memberAvatar: member.avatar,
                        workoutName: workout.label,
                        workoutCategory: workout.category,
                        startDate: this.form.startDate,
                        endDate: this.form.endDate,
                        frequency: this.form.frequency,
                        difficulty: this.form.difficulty,
                        priority: this.form.priority,
                        notes: this.form.notes,
                        status: "Active",
                        progress: 0,
                        selected: false,
                    };

                    this.assignedWorkouts.push(newAssignment);
                    assignmentsCreated++;
                }
            });

            // Show success message
            if (assignmentsCreated > 0) {
                this.$bvToast.toast(
                    `Successfully assigned "${workout.label}" to ${assignmentsCreated} members!`,
                    {
                        title: "Bulk Assignment Complete",
                        variant: "success",
                        solid: true,
                    }
                );
            } else {
                this.$bvToast.toast(
                    "All members already have this workout assigned.",
                    {
                        title: "No New Assignments",
                        variant: "info",
                        solid: true,
                    }
                );
            }

            // Reset form after successful assignment
            this.resetForm();
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/sass/_variables.scss";

// Main Container
.main-content {
    padding: 2rem;
    background: $color-background;
    min-height: 100vh;
    position: relative;

    &::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
                circle at 20% 80%,
                rgba(255, 64, 64, 0.1) 0%,
                transparent 50%
            ),
            radial-gradient(
                circle at 80% 20%,
                rgba(40, 167, 69, 0.1) 0%,
                transparent 50%
            ),
            radial-gradient(
                circle at 40% 40%,
                rgba(23, 162, 184, 0.05) 0%,
                transparent 50%
            );
        pointer-events: none;
        z-index: -1;
    }
}

// Statistics Container
.stats-container {
    .stat-card {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        height: 120px;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.1) 0%,
                transparent 100%
            );
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        &:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15),
                0 8px 16px rgba(0, 0, 0, 0.1);

            &::before {
                opacity: 1;
            }

            .stat-icon {
                transform: scale(1.1) rotate(5deg);
            }
        }

        .stat-icon {
            width: 60px;
            height: 60px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1.5rem;
            transition: all 0.3s ease;
            position: relative;

            &::after {
                content: "";
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                border-radius: 18px;
                background: linear-gradient(
                    45deg,
                    transparent,
                    rgba(255, 255, 255, 0.3),
                    transparent
                );
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            &:hover::after {
                opacity: 1;
            }

            i {
                font-size: 1.8rem;
                color: white;
                filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
            }
        }

        .stat-content {
            h3 {
                font-size: 1.8rem;
                font-weight: 700;
                margin: 0;
                color: $color-text;
                background: linear-gradient(135deg, $color-text, #666);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            p {
                margin: 0;
                color: $color-subtitle;
                font-weight: 500;
                font-size: 0.85rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
        }

        &.stat-card-primary {
            .stat-icon {
                // background: $color-gradient-primary;
                box-shadow: 0 8px 20px rgba(255, 64, 64, 0.3);
            }
        }

        &.stat-card-success {
            .stat-icon {
                // background: $color-gradient-success;
                box-shadow: 0 8px 20px rgba(40, 167, 69, 0.3);
            }
        }

        &.stat-card-warning {
            .stat-icon {
                // background: $color-gradient-warning;
                box-shadow: 0 8px 20px rgba(255, 193, 7, 0.3);
            }
        }

        &.stat-card-info {
            .stat-icon {
                // background: $color-gradient-info;
                box-shadow: 0 8px 20px rgba(23, 162, 184, 0.3);
            }
        }
    }
}

// Assignment Form Container
.assignment-form-container {
    .form-card {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(15px);
        border-radius: 24px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1),
            0 8px 16px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.3);
        overflow: hidden;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            // background: $color-gradient-primary;
        }
    }

    .form-header {
        background: $color-background;
        color: $color-text;
        padding: 1rem 2rem;
        text-align: center;
        position: relative;
        overflow: hidden;

        &::before {
            content: "";
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(
                circle,
                rgba(255, 255, 255, 0.1) 0%,
                transparent 70%
            );
            animation: float 6s ease-in-out infinite;
        }

        .header-icon {
            width: 100px;
            height: 100px;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            position: relative;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;

            &:hover {
                transform: scale(1.05) rotate(5deg);
                background: rgba(255, 255, 255, 0.25);
            }

            i {
                font-size: 2.5rem;
                color: white;
                filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
            }
        }

        .form-title {
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            position: relative;
        }

        .form-subtitle {
            font-size: 1rem;
            opacity: 0.95;
            margin: 0;
            font-weight: 400;
            position: relative;
        }
    }

    .assignment-form {
        padding: 3rem;
    }

    .form-section {
        margin-bottom: 3rem;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            top: -1rem;
            left: -1rem;
            right: -1rem;
            bottom: -1rem;
            background: linear-gradient(
                135deg,
                rgba(255, 64, 64, 0.02) 0%,
                rgba(255, 255, 255, 0.02) 100%
            );
            border-radius: 16px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        &:hover::before {
            opacity: 1;
        }

        .section-header {
            display: flex;
            align-items: center;
            margin-bottom: 2rem;
            position: relative;

            .section-icon {
                width: 50px;
                height: 50px;
                // background: $color-gradient-primary;
                border-radius: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1.5rem;
                position: relative;
                box-shadow: 0 8px 20px rgba(255, 64, 64, 0.2);
                transition: all 0.3s ease;

                &::after {
                    content: "";
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    border-radius: 16px;
                    background: linear-gradient(
                        45deg,
                        transparent,
                        rgba(255, 255, 255, 0.3),
                        transparent
                    );
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                &:hover {
                    transform: scale(1.1) rotate(5deg);

                    &::after {
                        opacity: 1;
                    }
                }

                i {
                    color: white;
                    font-size: 1.4rem;
                    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
                }
            }

            .section-title {
                font-size: 1.2rem;
                font-weight: 600;
                color: $color-text;
                margin: 0;
                background: linear-gradient(135deg, $color-text, #666);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
        }
    }

    .form-group {
        position: relative;
    }

    .form-label {
        font-weight: 600;
        color: $color-text;
        margin-bottom: 0.5rem;
        display: block;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        position: relative;

        &::after {
            content: "";
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 25px;
            height: 2px;
            // background: $color-gradient-primary;
            border-radius: 1px;
        }
    }

    .form-control {
        width: 100%;
        border: 2px solid $color-divider;
        border-radius: 8px;
        font-size: 0.9rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        background: $color-input-bg;
        color: $color-text;
        padding: 0.75rem 1rem 0.75rem 2.5rem;
        box-sizing: border-box;
        position: relative;
        min-height: 45px;

        &:focus {
            outline: none;
            border-color: $primary;
            box-shadow: 0 0 0 3px rgba(255, 64, 64, 0.1),
                0 4px 12px rgba(0, 0, 0, 0.1);
            transform: translateY(-1px);
            background: white;
        }

        &.has-value {
            border-color: $primary;
            background: white;
            box-shadow: 0 2px 8px rgba(255, 64, 64, 0.1);
        }

        &::placeholder {
            color: #999;
            font-weight: 400;
        }
    }

    // v-select specific styling
    .v-select {
        .vs__dropdown-toggle {
            border: 2px solid $color-divider;
            border-radius: 8px;
            background: $color-input-bg;
            padding: 0.75rem 1rem 0.75rem 2.5rem;
            min-height: 45px;

            &:focus-within {
                border-color: $primary;
                box-shadow: 0 0 0 3px rgba(255, 64, 64, 0.1),
                    0 4px 12px rgba(0, 0, 0, 0.1);
                transform: translateY(-1px);
                background: white;
            }
        }

        .vs__selected-options {
            padding: 0;
        }

        .vs__actions {
            padding: 0;
        }

        .vs__search {
            margin: 0;
            padding: 0;
            font-size: 0.9rem;
            color: $color-text;

            &::placeholder {
                color: #999;
                font-weight: 400;
            }
        }

        .vs__dropdown-menu {
            border: 2px solid $primary;
            border-radius: 8px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            background: white;
        }

        .vs__dropdown-option {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
            color: $color-text;

            &--highlight {
                background: rgba(255, 64, 64, 0.1);
                color: $primary;
            }
        }
    }

    .input-icon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: $primary;
        font-size: 1rem;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 2;
    }

    .textarea-icon {
        top: 25px;
        transform: none;
    }

    .form-control:focus + .input-icon {
        color: $primary;
        transform: translateY(-50%) scale(1.05);
    }

    .submit-section {
        text-align: center;
        margin-top: 3rem;
        padding-top: 3rem;
        border-top: 2px solid $color-divider;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            top: -1px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 2px;
            // background: $color-gradient-primary;
            border-radius: 1px;
        }

        .submit-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        }
    }

    .submit-btn {
        // background: $color-gradient-primary;
        color: white;
        border: none;
        padding: 1rem 2.5rem;
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 8px 25px rgba(255, 64, 64, 0.3),
            0 4px 12px rgba(0, 0, 0, 0.1);
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        position: relative;
        overflow: hidden;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.2),
                transparent
            );
            transition: left 0.5s ease;
        }

        &:hover:not(:disabled) {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 20px 40px rgba(255, 64, 64, 0.4),
                0 8px 16px rgba(0, 0, 0, 0.15);

            &::before {
                left: 100%;
            }
        }

        &:active:not(:disabled) {
            transform: translateY(-1px) scale(1.02);
        }

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        i {
            font-size: 1rem;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
        }

        &.submit-btn-all {
            background: linear-gradient(135deg, #28a745, #20c997);
            box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3),
                0 4px 12px rgba(0, 0, 0, 0.1);

            &:hover:not(:disabled) {
                box-shadow: 0 20px 40px rgba(40, 167, 69, 0.4),
                    0 8px 16px rgba(0, 0, 0, 0.15);
            }
        }
    }
}

// Assignments Container
.assignments-container {
    .assignments-card {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(15px);
        border-radius: 24px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1),
            0 8px 16px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.3);
        overflow: hidden;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            // background: $color-gradient-primary;
        }
    }

    .assignments-header {
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(248, 249, 250, 0.9) 100%
        );
        backdrop-filter: blur(10px);
        padding: 2rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                135deg,
                rgba(255, 64, 64, 0.05) 0%,
                transparent 100%
            );
            pointer-events: none;
        }

        h4 {
            font-size: 1.4rem;
            font-weight: 700;
            color: $color-text;
            margin: 0;
            background: linear-gradient(135deg, $color-text, #666);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            position: relative;
        }

        .header-actions {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            position: relative;

            .btn-filter,
            .btn-export {
                border-radius: 12px;
                font-weight: 700;
                padding: 0.75rem 1.5rem;
                transition: all 0.3s ease;
                border: 2px solid transparent;

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                }

                i {
                    margin-right: 0.5rem;
                    font-size: 1.1rem;
                }
            }

            .btn-filter {
                background: linear-gradient(135deg, #17a2b8, #6f42c1);
                color: white;
                border-color: #17a2b8;
            }

            .btn-export {
                background: linear-gradient(135deg, #28a745, #20c997);
                color: white;
                border-color: #28a745;
            }

            .assignment-count {
                color: $color-subtitle;
                font-weight: 500;
                font-size: 0.85rem;
                background: rgba(255, 64, 64, 0.1);
                padding: 0.4rem 0.8rem;
                border-radius: 15px;
                border: 1px solid rgba(255, 64, 64, 0.2);
            }
        }
    }

    .assignments-table {
        margin: 0;

        thead {
            background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.9) 0%,
                rgba(248, 249, 250, 0.9) 100%
            );
            backdrop-filter: blur(10px);

            th {
                border: none;
                padding: 1rem;
                font-weight: 600;
                color: $color-text;
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                position: relative;

                &::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 1rem;
                    right: 1rem;
                    height: 2px;
                    // background: $color-gradient-primary;
                    border-radius: 1px;
                }
            }
        }

        tbody {
            tr {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;

                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(
                        135deg,
                        rgba(255, 64, 64, 0.02) 0%,
                        transparent 100%
                    );
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

                    &::before {
                        opacity: 1;
                    }
                }

                &:nth-child(even) {
                    background: rgba(255, 255, 255, 0.3);
                }

                td {
                    border: none;
                    padding: 1rem;
                    vertical-align: middle;
                    position: relative;
                }
            }
        }
    }

    .member-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        .member-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .member-details {
            .member-name {
                font-weight: 600;
                color: $color-text;
                font-size: 0.9rem;
            }

            .member-email {
                color: $color-subtitle;
                font-size: 0.8rem;
            }
        }
    }

    .workout-info {
        .workout-name {
            font-weight: 600;
            color: $color-text;
            font-size: 0.9rem;
        }

        .workout-category {
            color: $color-subtitle;
            font-size: 0.8rem;
        }
    }

    .date-badge {
        background: rgba($primary, 0.1);
        color: $primary;
        padding: 0.25rem 0.5rem;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 500;
    }

    .no-date {
        color: $color-subtitle;
        font-style: italic;
    }

    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;

        &.status-active {
            background: rgba(#28a745, 0.1);
            color: #28a745;
        }

        &.status-completed {
            background: rgba(#17a2b8, 0.1);
            color: #17a2b8;
        }

        &.status-paused {
            background: rgba(#ffc107, 0.1);
            color: #ffc107;
        }

        &.status-expired {
            background: rgba(#dc3545, 0.1);
            color: #dc3545;
        }
    }

    .progress-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .progress-bar {
            flex: 1;
            height: 8px;
            background: #e9ecef;
            border-radius: 4px;
            overflow: hidden;

            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, $primary, #6b8c7a);
                border-radius: 4px;
                transition: width 0.3s ease;
            }
        }

        .progress-text {
            font-size: 0.8rem;
            font-weight: 600;
            color: $color-text;
            min-width: 35px;
        }
    }

    .action-buttons {
        display: flex;
        gap: 0.25rem;

        .action-btn {
            width: 32px;
            height: 32px;
            padding: 0;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;

            i {
                font-size: 0.8rem;
            }
        }
    }

    .empty-state {
        text-align: center;
        padding: 4rem 2rem;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            background: radial-gradient(
                circle,
                rgba(255, 64, 64, 0.05) 0%,
                transparent 70%
            );
            border-radius: 50%;
            animation: pulse 2s ease-in-out infinite;
        }

        i {
            font-size: 4rem;
            color: $primary;
            margin-bottom: 1.5rem;
            filter: drop-shadow(0 4px 8px rgba(255, 64, 64, 0.2));
            animation: float 3s ease-in-out infinite;
        }

        h4 {
            color: $color-text;
            font-weight: 600;
            margin-bottom: 0.75rem;
            font-size: 1.2rem;
            background: linear-gradient(135deg, $color-text, #666);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        p {
            color: $color-subtitle;
            margin-bottom: 0;
            font-size: 0.95rem;
            font-weight: 500;
        }
    }
}

// Animations
@keyframes float {
    0%,
    100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

@keyframes pulse {
    0%,
    100% {
        opacity: 0.5;
        transform: translate(-50%, -50%) scale(1);
    }
    50% {
        opacity: 0.8;
        transform: translate(-50%, -50%) scale(1.1);
    }
}

// Responsive Design
@media (max-width: 768px) {
    .main-content {
        padding: 1rem;
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

    .assignment-form-container .form-header {
        padding: 1.5rem 1rem;

        .form-title {
            font-size: 2rem;
        }
    }

    .submit-section .submit-buttons {
        flex-direction: column;
        gap: 0.75rem;

        .submit-btn {
            width: 100%;
            max-width: 300px;
        }
    }

    .assignments-container .assignments-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;

        .header-actions {
            width: 100%;
            justify-content: space-between;
        }
    }

    .assignments-table {
        font-size: 0.8rem;

        .member-info .member-avatar {
            width: 30px;
            height: 30px;
        }

        .action-buttons .action-btn {
            width: 28px;
            height: 28px;
        }
    }
}

// Progress Modal Styles
.progress-modal-content {
    .member-progress-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 2px solid rgba(255, 64, 64, 0.1);
        position: relative;

        &::after {
            content: "";
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100px;
            height: 2px;
            // background: $color-gradient-primary;
            border-radius: 1px;
        }

        .member-info-large {
            display: flex;
            align-items: center;
            gap: 1.5rem;

            .member-avatar-large {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                object-fit: cover;
                border: 4px solid white;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15),
                    0 4px 12px rgba(255, 64, 64, 0.2);
                transition: all 0.3s ease;

                &:hover {
                    transform: scale(1.05);
                    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2),
                        0 6px 16px rgba(255, 64, 64, 0.3);
                }
            }

            .member-details-large {
                h5 {
                    margin: 0 0 0.5rem 0;
                    color: $color-text;
                    font-weight: 600;
                    font-size: 1.1rem;
                    background: linear-gradient(135deg, $color-text, #666);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                p {
                    margin: 0;
                    color: $color-subtitle;
                    font-size: 0.9rem;
                    font-weight: 500;
                }
            }
        }

        .workout-info-large {
            text-align: right;

            h6 {
                margin: 0 0 0.5rem 0;
                color: $color-text;
                font-weight: 600;
                font-size: 1rem;
            }

            .workout-category-badge {
                // background: $color-gradient-primary;
                color: white;
                padding: 0.4rem 0.8rem;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 500;
                box-shadow: 0 3px 8px rgba(255, 64, 64, 0.3);
                display: inline-block;
            }
        }
    }

    .progress-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-bottom: 2rem;

        .stat-item {
            text-align: center;
            padding: 1rem;
            background: rgba($primary, 0.05);
            border-radius: 12px;
            border: 1px solid rgba($primary, 0.1);

            .stat-value {
                font-size: 1.5rem;
                font-weight: 700;
                color: $primary;
                margin-bottom: 0.25rem;
            }

            .stat-label {
                font-size: 0.8rem;
                color: $color-subtitle;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
        }
    }

    .progress-chart {
        h6 {
            color: $color-text;
            font-weight: 600;
            margin-bottom: 1rem;
        }

        .timeline {
            position: relative;

            &::before {
                content: "";
                position: absolute;
                left: 20px;
                top: 0;
                bottom: 0;
                width: 2px;
                background: $color-border;
            }

            .timeline-item {
                position: relative;
                padding-left: 60px;
                margin-bottom: 1.5rem;

                .timeline-marker {
                    position: absolute;
                    left: 11px;
                    top: 0;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: white;
                    border: 3px solid $color-border;
                    transition: all 0.3s ease;
                }

                .timeline-content {
                    h6 {
                        margin: 0 0 0.25rem 0;
                        color: $color-text;
                        font-weight: 600;
                        font-size: 0.9rem;
                    }

                    p {
                        margin: 0;
                        color: $color-subtitle;
                        font-size: 0.8rem;
                    }
                }

                &.completed {
                    .timeline-marker {
                        background: $primary;
                        border-color: $primary;
                        box-shadow: 0 0 0 3px rgba($primary, 0.2);
                    }

                    .timeline-content {
                        h6 {
                            color: $primary;
                        }
                    }
                }
            }
        }
    }
}

// Modal Styling
.modal-content {
    border: none;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

    .modal-header {
        border-bottom: 1px solid $color-border;
        padding: 1.5rem;

        .modal-title {
            color: $color-text;
            font-weight: 700;
            font-size: 1.25rem;
        }
    }

    .modal-body {
        padding: 1.5rem;
    }
}
</style>
