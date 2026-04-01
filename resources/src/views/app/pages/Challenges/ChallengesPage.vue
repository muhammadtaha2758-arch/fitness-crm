<template>
    <div class="main-content">
        <div class="challenges-page container py-4">
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
                                    <i class="fas fa-trophy"></i>
                                    Challenges
                                </li>
                            </ol>
            <!-- Custom Tab Navigation -->
            <div class="tab-navigation">
                <div class="tab-container">
                    <button
                        class="tab-button"
                        :class="{ active: activeTab === 0 }"
                        @click="activeTab = 0"
                    >
                        <i class="fas fa-trophy"></i>
                        All Challenges
                    </button>
                    <button
                        class="tab-button"
                        :class="{ active: activeTab === 1 }"
                        @click="activeTab = 1"
                    >
                        <i class="fas fa-users"></i>
                        Participants
                    </button>
                    <button
                        class="tab-button"
                        :class="{ active: activeTab === 2 }"
                        @click="activeTab = 2"
                    >
                        <i class="fas fa-medal"></i>
                        Leaderboard
                    </button>
                    <!-- <button
                        class="tab-button"
                        :class="{ active: activeTab === 3 }"
                        @click="activeTab = 3"
                    >
                        <i class="fas fa-chart-line"></i>
                        Reports
                    </button> -->
                    <button
                        class="tab-button"
                        :class="{ active: activeTab === 4 }"
                        @click="activeTab = 4"
                    >
                        <i class="fas fa-gift"></i>
                        Rewards
                    </button>
                </div>
            </div>
                        </div>
                    </nav>
                </div>
            </div>

            <!-- Page Header -->
            <div class="page-header">
                <div>
                    <h2 class="page-title">🏆 Challenges</h2>
                    <p class="page-subtitle">Manage and view all challenges</p>
                </div>
            </div>



            <!-- Tab Content -->
            <div class="tab-content-container">
                <!-- Tab 1: Active Challenges -->
                <div v-show="activeTab === 0" class="tab-content">
                    <div class="mt-3">
                        <div
                            class="d-flex justify-content-between align-items-center mb-3"
                        >
                            <h4>Current Challenges</h4>
                           <!-- Create Button -->
                <div class="action-section">
                    <b-button
                        variant="primary"
                        class="action-btn"
                        @click="showCreateModal = true"
                    >
                        <i class="fas fa-plus"></i> Create New Challenge
                    </b-button>
                </div>
                        </div>
                        <div v-if="loading" class="text-center py-4">
                            <b-spinner variant="primary" label="Loading..."></b-spinner>
                            <p class="mt-2">Loading challenges...</p>
                        </div>
                        <div v-else-if="challenges.length === 0" class="text-center py-5">
                            <i class="fas fa-trophy fa-3x text-muted mb-3"></i>
                            <h5 class="text-muted">No Challenges Found</h5>
                            <p class="text-muted">Create your first challenge to get started!</p>
                            <b-button
                                variant="primary"
                                @click="showCreateModal = true"
                            >
                                <i class="fas fa-plus"></i> Create First Challenge
                            </b-button>
                        </div>
                        <b-table
                            v-else
                            striped
                            hover
                            :items="challengesWithRemainingDays"
                            :fields="challengeFields"
                            responsive
                        >
                            <template #cell(name)="data">
                                <span 
                                    class="challenge-name-link"
                                    @click="viewChallenge(data.item)"
                                    :title="'Click to view participants for ' + data.item.name"
                                >
                                    {{ data.item.name }}
                                </span>
                            </template>
                            <template #cell(reward)="data">
                                <span class="custom-badge badge-reward">
                                    {{ data.item.reward }}
                                </span>
                            </template>
                            <template #cell(participants)="data">
                                <span class="custom-badge badge-participants">
                                    <i class="fas fa-users mr-1"></i>
                                    {{ data.item.participants }}
                                </span>
                            </template>
                            <template #cell(status)="data">
                                <span
                                    class="custom-badge"
                                    :class="
                                        data.item.status === 'Active'
                                            ? 'badge-active'
                                            : 'badge-completed'
                                    "
                                >
                                    {{ data.item.status }}
                                </span>
                            </template>
                            <template #cell(actions)="data">
                                <div class="action-buttons">
                                    <button
                                        class="action-btn edit-btn"
                                        @click="editChallenge(data.item)"
                                        title="Edit Challenge"
                                    >
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button
                                        class="action-btn delete-btn"
                                        @click="deleteChallenge(data.item)"
                                        title="Delete Challenge"
                                    >
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </template>
                        </b-table>
                    </div>
                </div>

                <!-- Tab 2: Participants -->
                <div v-show="activeTab === 1" class="tab-content">
                    <div class="mt-3">
                        <div
                            class="d-flex justify-content-between align-items-center mb-3"
                        >
                            <h4>Challenge Participants</h4>
                            <div>
                                <b-form-select
                                    v-model="selectedChallengeFilter"
                                    :options="challengeOptions"
                                    class="d-inline-block w-auto mr-2"
                                ></b-form-select>
                                <span class="custom-badge badge-info"
                                    >{{
                                        filteredParticipants.length
                                    }}
                                    Participants</span
                                >
                                <b-button
                                    variant="primary"
                                    size="sm"
                                    class="ml-2"
                                    @click="openAddMemberModal"
                                >
                                    <i class="fas fa-plus"></i> Add Member
                                </b-button>
                            </div>
                        </div>
                        <b-table
                            striped
                            hover
                            :items="filteredParticipants"
                            :fields="participantFields"
                            responsive
                        >
                            <template #cell(progress)="data">
                                <b-progress
                                    :value="data.item.progress"
                                    :max="100"
                                    show-value
                                ></b-progress>
                            </template>
                            <template #cell(status)="data">
                                <span
                                    class="custom-badge"
                                    :class="getStatusClass(data.item.status)"
                                >
                                    {{ data.item.status }}
                                </span>
                            </template>
                            <!-- <template #cell(actions)="data">
                                <div class="action-buttons">
                                    <button
                                        class="action-btn view-btn"
                                        @click="viewParticipant(data.item)"
                                        title="View Participant"
                                    >
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button
                                        class="action-btn message-btn"
                                        @click="sendMessage(data.item)"
                                        title="Send Message"
                                    >
                                        <i class="fas fa-envelope"></i>
                                    </button>
                                </div>
                            </template> -->
                        </b-table>
                    </div>
                </div>

                <!-- Tab 3: Leaderboard -->
                <div v-show="activeTab === 2" class="tab-content">
                    <div class="mt-3">
                        <div
                            class="d-flex justify-content-between align-items-center mb-3"
                        >
                            <h4>Challenge Leaderboard</h4>
                            <div>
                                <b-form-select
                                    v-model="selectedLeaderboardChallenge"
                                    :options="challengeOptions"
                                    class="d-inline-block w-auto mr-2"
                                ></b-form-select>
                                <span class="custom-badge badge-warning"
                                    >Top Performers</span
                                >
                            </div>
                        </div>
                        <b-table
                            striped
                            hover
                            :items="filteredLeaderboard"
                            :fields="leaderboardFields"
                            responsive
                        >
                            <template #cell(rank)="data">
                                <div class="d-flex align-items-center">
                                    <span
                                        v-if="data.item.rank === 1"
                                        class="mr-2"
                                        >🥇</span
                                    >
                                    <span
                                        v-else-if="data.item.rank === 2"
                                        class="mr-2"
                                        >🥈</span
                                    >
                                    <span
                                        v-else-if="data.item.rank === 3"
                                        class="mr-2"
                                        >🥉</span
                                    >
                                    <span v-else class="mr-2"
                                        >#{{ data.item.rank }}</span
                                    >
                                </div>
                            </template>
                            <template #cell(points)="data">
                                <span class="custom-badge badge-points"
                                    >{{ data.item.points }} pts</span
                                >
                            </template>
                            <template #cell(achievements)="data">
                                <div>
                                    <span
                                        v-for="achievement in data.item
                                            .achievements"
                                        :key="achievement"
                                        class="custom-badge badge-achievement mr-1"
                                    >
                                        {{ achievement }}
                                    </span>
                                </div>
                            </template>
                            <template #cell(actions)="data">
                                <div class="action-buttons">
                                    <button
                                        class="action-btn profile-btn"
                                        @click="viewLeaderboardProfile(data.item)"
                                        title="View Profile"
                                    >
                                        <i class="fas fa-user"></i>
                                    </button>
                                </div>
                            </template>
                        </b-table>
                    </div>
                </div>

                <!-- Tab 4: Reports -->
                 <div v-show="activeTab === 3" class="tab-content">
                    <div class="mt-3">
                        <h4>Challenge Reports & Analytics</h4>

                        <div class="row mb-4">
                            <div class="col-md-3">
                                <b-card
                                    bg-variant="primary"
                                    text-variant="white"
                                    class="text-center"
                                >
                                    <h3>{{ challenges.length }}</h3>
                                    <p>Active Challenges</p>
                                </b-card>
                            </div>
                            <div class="col-md-3">
                                <b-card
                                    bg-variant="success"
                                    text-variant="white"
                                    class="text-center"
                                >
                                    <h3>{{ totalParticipants }}</h3>
                                    <p>Total Participants</p>
                                </b-card>
                            </div>
                            <div class="col-md-3">
                                <b-card
                                    bg-variant="warning"
                                    text-variant="white"
                                    class="text-center"
                                >
                                    <h3>{{ completedChallenges }}</h3>
                                    <p>Completed</p>
                                </b-card>
                            </div>
                            <div class="col-md-3">
                                <b-card
                                    bg-variant="info"
                                    text-variant="white"
                                    class="text-center"
                                >
                                    <h3>{{ averageCompletionRate }}%</h3>
                                    <p>Success Rate</p>
                                </b-card>
                            </div>
                        </div>

                        <b-card title="Challenge Performance" class="mb-4">
                            <div class="row">
                                <div class="col-md-6">
                                    <h6>Most Popular Challenges</h6>
                                    <ul class="list-group" v-if="topChallenges.length > 0">
                                        <li
                                            v-for="challenge in topChallenges"
                                            :key="challenge.id"
                                            class="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            {{ challenge.name }}
                                            <span
                                                class="custom-badge badge-primary"
                                                >{{
                                                    challenge.participants
                                                }}
                                                participants</span
                                            >
                                        </li>
                                    </ul>
                                    <p v-else class="text-muted">No challenges with participants yet.</p>
                                </div>
                                <div class="col-md-6">
                                    <h6>Recent Activity</h6>
                                    <div
                                        v-if="generatedRecentActivities.length > 0"
                                    >
                                        <div
                                            v-for="activity in generatedRecentActivities"
                                            :key="activity.id"
                                            class="border-bottom pb-2 mb-2"
                                        >
                                            <small class="text-muted">{{
                                                activity.time
                                            }}</small>
                                            <div>{{ activity.message }}</div>
                                        </div>
                                    </div>
                                    <p v-else class="text-muted">No recent activity.</p>
                                </div>
                            </div>
                        </b-card>
                    </div>
                </div>

                <!-- Tab 5: Rewards -->
                <div v-show="activeTab === 4" class="tab-content">
                    <div class="mt-3">
                        <div
                            class="d-flex justify-content-between align-items-center mb-3"
                        >
                            <h4>Rewards & Prizes Setup</h4>
                            <div>
                                <b-button
                                    variant="outline-primary"
                                    @click="fetchRewards"
                                    :disabled="loading"
                                    class="mr-2"
                                >
                                    <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i> Refresh
                                </b-button>
                                <b-button
                                    variant="success"
                                    @click="showRewardModal = true"
                                >
                                    <i class="fas fa-plus"></i> Add New Reward
                                </b-button>
                            </div>
                        </div>
                        <div v-if="loading" class="text-center py-4">
                            <b-spinner variant="primary" label="Loading..."></b-spinner>
                            <p class="mt-2">Loading rewards...</p>
                        </div>
                        <div v-else-if="rewards.length === 0" class="text-center py-5">
                            <i class="fas fa-gift fa-3x text-muted mb-3"></i>
                            <h5 class="text-muted">No Rewards Found</h5>
                            <p class="text-muted">Create your first reward to get started!</p>
                            <b-button
                                variant="primary"
                                @click="showRewardModal = true"
                            >
                                <i class="fas fa-plus"></i> Create First Reward
                            </b-button>
                        </div>
                        <b-table
                            v-else
                            striped
                            hover
                            :items="rewards"
                            :fields="rewardFields"
                            responsive
                            class="mt-3"
                        >
                            <template #cell(status)="data">
                                <span
                                    class="custom-badge"
                                    :class="
                                        data.item.status === 'Active'
                                            ? 'badge-active'
                                            : 'badge-secondary'
                                    "
                                >
                                    {{ data.item.status }}
                                </span>
                            </template>
                            <template #cell(points)="data">
                                <span class="custom-badge badge-points"
                                    >{{ data.item.points }} pts</span
                                >
                            </template>
                            <template #cell(actions)="data">
                                <div class="action-buttons">
                                    <button
                                        class="action-btn edit-btn"
                                        @click="editReward(data.item)"
                                        title="Edit Reward"
                                    >
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button
                                        class="action-btn delete-btn"
                                        @click="deleteReward(data.item)"
                                        title="Delete Reward"
                                    >
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </template>
                        </b-table>
                    </div>
                </div>
            </div>

            <!-- Modal: Create New Challenge -->
            <b-modal
                v-model="showCreateModal"
                title="🏆 Create New Challenge"
                @ok="createChallenge"
                @cancel="resetForm"
                class="modal-text challenge-create-modal"
                :ok-disabled="!isFormValid"
                size="xl"
                :centered="true"
                :scrollable="true"
                ok-title="Create Challenge"
                cancel-title="Cancel"
            >
                <!-- Progress Indicator -->
                <div class="form-progress mb-4">
                    <div class="progress-steps">
                        <div class="step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
                            <div class="step-number">1</div>
                            <div class="step-label">Basic Info</div>
                        </div>
                        <div class="step-line"></div>
                        <div class="step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
                            <div class="step-number">2</div>
                            <div class="step-label">Details</div>
                        </div>
                        <div class="step-line"></div>
                        <div class="step" :class="{ active: currentStep >= 3, completed: currentStep > 3 }">
                            <div class="step-number">3</div>
                            <div class="step-label">Settings</div>
                        </div>
                    </div>
                </div>

                <b-form @submit.stop.prevent="createChallenge">
                    <!-- Step 1: Basic Information -->
                    <div v-show="currentStep === 1" class="form-step">
                        <div class="step-header">
                            <h5><i class="fas fa-info-circle text-primary"></i> Basic Information</h5>
                            <p class="text-muted">Let's start with the essential details of your challenge</p>
                        </div>

                        <div class="row">
                            <div class="col-md-8">
                                <b-form-group 
                                    label="Challenge Name *" 
                                    :state="validation.name"
                                    invalid-feedback="Challenge name is required"
                                >
                                    <b-form-input
                                        v-model="newChallenge.name"
                                        placeholder="e.g., 30-Day Weight Loss Challenge"
                                        class="modal-text"
                                        :state="validation.name"
                                        @input="validateField('name')"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                            <!-- Duration field removed from create modal -->
                        </div>

                        <b-form-group 
                            label="Challenge Goal *" 
                            :state="validation.goal"
                            invalid-feedback="Challenge goal is required"
                        >
                            <b-form-textarea
                                v-model="newChallenge.goal"
                                placeholder="What do you want participants to achieve? (e.g., Lose 10 pounds, Run a marathon, Build muscle mass)"
                                class="modal-text"
                                :state="validation.goal"
                                @input="validateField('goal')"
                                rows="3"
                                required
                            ></b-form-textarea>
                        </b-form-group>

                        <b-form-group 
                            label="Reward *" 
                            :state="validation.reward"
                            invalid-feedback="Please select a reward"
                        >
                            <b-form-select
                                v-model="newChallenge.reward"
                                :options="rewardOptions"
                                placeholder="Select a reward"
                                class="modal-text"
                                :state="validation.reward"
                                @change="validateField('reward')"
                                required
                            >
                                <template #first>
                                    <b-form-select-option value="" disabled>🎁 Select a reward for participants</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-form-group>
                    </div>

                    <!-- Step 2: Detailed Information -->
                    <div v-show="currentStep === 2" class="form-step">
                        <div class="step-header">
                            <h5><i class="fas fa-file-alt text-success"></i> Detailed Information</h5>
                            <p class="text-muted">Provide more details about your challenge</p>
                        </div>

                        <b-form-group 
                            label="Challenge Description *" 
                            :state="validation.description"
                            invalid-feedback="Description is required"
                        >
                            <b-form-textarea
                                v-model="newChallenge.description"
                                placeholder="Describe what this challenge is about, what participants will do, and what they can expect..."
                                class="modal-text"
                                :state="validation.description"
                                @input="validateField('description')"
                                rows="4"
                                required
                            ></b-form-textarea>
                        </b-form-group>

                        <div class="row">
                            <div class="col-md-6">
                                <b-form-group 
                                    label="Start Date *" 
                                    :state="validation.startDate"
                                    invalid-feedback="Start date is required"
                                >
                                    <b-form-input
                                        type="date"
                                        v-model="newChallenge.startDate"
                                        class="modal-text"
                                        :state="validation.startDate"
                                        @input="validateField('startDate')"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-6">
                                <b-form-group 
                                    label="End Date *" 
                                    :state="validation.endDate"
                                    invalid-feedback="End date is required and must be after start date"
                                >
                                    <b-form-input
                                        type="date"
                                        v-model="newChallenge.endDate"
                                        class="modal-text"
                                        :state="validation.endDate"
                                        @input="validateField('endDate')"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                        </div>

                        <b-form-group 
                            label="Participation Fee *" 
                            :state="validation.participationFee"
                            invalid-feedback="Participation fee is required and must be a valid amount"
                        >
                            <b-input-group>
                                <b-input-group-prepend>
                                    <b-input-group-text>$</b-input-group-text>
                                </b-input-group-prepend>
                                <b-form-input
                                    type="number"
                                    v-model="newChallenge.participationFee"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    class="modal-text"
                                    :state="validation.participationFee"
                                    @input="validateField('participationFee')"
                                    required
                                ></b-form-input>
                            </b-input-group>
                            <small class="form-text text-muted">Set to $0.00 for free challenges</small>
                        </b-form-group>
                    </div>

                    <!-- Step 3: Rules and Settings -->
                    <div v-show="currentStep === 3" class="form-step">
                        <div class="step-header">
                            <h5><i class="fas fa-cog text-warning"></i> Rules and Settings</h5>
                            <p class="text-muted">Define the rules and configure participation settings</p>
                        </div>

                        <b-form-group 
                            label="Challenge Rules *" 
                            :state="validation.rules"
                            invalid-feedback="Challenge rules are required"
                        >
                            <b-form-textarea
                                v-model="newChallenge.rules"
                                placeholder="Define clear rules and guidelines for participants. For example:&#10;• Complete daily workouts&#10;• Track nutrition daily&#10;• Attend weekly check-ins&#10;• No cheating or false reporting&#10;• Submit progress photos weekly"
                                class="modal-text"
                                :state="validation.rules"
                                @input="validateField('rules')"
                                rows="6"
                                required
                            ></b-form-textarea>
                        </b-form-group>

                        <div class="enrollment-section">
                            <h6><i class="fas fa-users"></i> Member Enrollment Settings</h6>
                            <b-form-group>
                                <b-form-checkbox v-model="newChallenge.allowEnrollment" switch @change="onEnrollmentToggle">
                                    <strong>Allow members to sign up for this challenge</strong>
                                </b-form-checkbox>
                                <small class="form-text text-muted">Enable this to allow members to join your challenge</small>
                            </b-form-group>

                            <b-form-group 
                                v-if="newChallenge.allowEnrollment"
                                label="Maximum Participants" 
                                :state="validation.maxParticipants"
                                invalid-feedback="Maximum participants must be a positive number"
                            >
                                <b-form-input
                                    type="number"
                                    v-model="newChallenge.maxParticipants"
                                    placeholder="50"
                                    min="1"
                                    class="modal-text"
                                    :state="validation.maxParticipants"
                                    @input="validateField('maxParticipants')"
                                ></b-form-input>
                                <small class="form-text text-muted">Leave empty for unlimited participants</small>
                            </b-form-group>
                        </div>

                        <b-form-group label="Challenge Status">
                            <b-form-select
                                v-model="newChallenge.status"
                                class="modal-text"
                            >
                                <b-form-select-option value="Active">✅ Active - Challenge is live and accepting participants</b-form-select-option>
                                <b-form-select-option value="Inactive">⏸️ Inactive - Challenge is paused</b-form-select-option>
                            </b-form-select>
                        </b-form-group>
                    </div>

                    <!-- Navigation Buttons -->
                    <div class="form-navigation mt-4">
                        <div class="d-flex justify-content-between align-items-center">
                            <b-button 
                                v-if="currentStep > 1" 
                                variant="outline-secondary" 
                                @click="previousStep"
                                class="nav-btn"
                            >
                                <i class="fas fa-arrow-left"></i> Previous
                            </b-button>
                            <div v-else></div>
                            
                            <div class="step-indicator">
                                Step {{ currentStep }} of 3
                            </div>
                            
                            <b-button 
                                v-if="currentStep < 3" 
                                variant="primary" 
                                @click="nextStep"
                                class="nav-btn"
                                :disabled="!isCurrentStepValid"
                            >
                                Next <i class="fas fa-arrow-right"></i>
                            </b-button>
                            <div v-else></div>
                        </div>
                    </div>
                </b-form>
            </b-modal>

            <!-- Modal: Add New Reward -->
            <!-- Button to Open Reward Modal -->
            <!-- <b-button variant="success" @click="showRewardModal = true">
                🎁 Add New Reward
            </b-button> -->

            <!-- Modal: Edit Challenge -->
            <b-modal
                v-model="showEditModal"
                title="✏️ Edit Challenge"
                @ok="updateChallenge"
                @cancel="resetEditForm"
                class="modal-text challenge-edit-modal"
                :ok-disabled="!isEditFormValid"
                size="xl"
                :centered="true"
                :scrollable="true"
                ok-title="Update Challenge"
                cancel-title="Cancel"
            >
                <!-- Progress Indicator -->
                <div class="form-progress mb-4">
                    <div class="progress-steps">
                        <div class="step" :class="{ active: currentEditStep >= 1, completed: currentEditStep > 1 }">
                            <div class="step-number">1</div>
                            <div class="step-label">Basic Info</div>
                        </div>
                        <div class="step-line"></div>
                        <div class="step" :class="{ active: currentEditStep >= 2, completed: currentEditStep > 2 }">
                            <div class="step-number">2</div>
                            <div class="step-label">Details</div>
                        </div>
                        <div class="step-line"></div>
                        <div class="step" :class="{ active: currentEditStep >= 3, completed: currentEditStep > 3 }">
                            <div class="step-number">3</div>
                            <div class="step-label">Settings</div>
                        </div>
                    </div>
                </div>

                <b-form @submit.stop.prevent="updateChallenge">
                    <!-- Step 1: Basic Information -->
                    <div v-show="currentEditStep === 1" class="form-step">
                        <div class="step-header">
                            <h5><i class="fas fa-info-circle text-primary"></i> Basic Information</h5>
                            <p class="text-muted">Update the essential details of your challenge</p>
                        </div>

                        <div class="row">
                            <div class="col-md-8">
                                <b-form-group 
                                    label="Challenge Name *" 
                                    :state="editValidation.name"
                                    invalid-feedback="Challenge name is required"
                                >
                                    <b-form-input
                                        v-model="editingChallenge.name"
                                        placeholder="e.g., 30-Day Weight Loss Challenge"
                                        class="modal-text"
                                        :state="editValidation.name"
                                        @input="validateEditField('name')"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                            <!-- Duration field removed from edit modal -->
                        </div>

                        <b-form-group 
                            label="Challenge Goal *" 
                            :state="editValidation.goal"
                            invalid-feedback="Challenge goal is required"
                        >
                            <b-form-textarea
                                v-model="editingChallenge.goal"
                                placeholder="What do you want participants to achieve? (e.g., Lose 10 pounds, Run a marathon, Build muscle mass)"
                                class="modal-text"
                                :state="editValidation.goal"
                                @input="validateEditField('goal')"
                                rows="3"
                                required
                            ></b-form-textarea>
                        </b-form-group>

                        <b-form-group 
                            label="Reward *" 
                            :state="editValidation.reward"
                            invalid-feedback="Please select a reward"
                        >
                            <b-form-select
                                v-model="editingChallenge.reward"
                                :options="rewardOptions"
                                placeholder="Select a reward"
                                class="modal-text"
                                :state="editValidation.reward"
                                @change="validateEditField('reward')"
                                required
                            >
                                <template #first>
                                    <b-form-select-option value="" disabled>🎁 Select a reward for participants</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-form-group>
                    </div>

                    <!-- Step 2: Detailed Information -->
                    <div v-show="currentEditStep === 2" class="form-step">
                        <div class="step-header">
                            <h5><i class="fas fa-file-alt text-success"></i> Detailed Information</h5>
                            <p class="text-muted">Update the detailed information about your challenge</p>
                        </div>

                        <b-form-group 
                            label="Challenge Description *" 
                            :state="editValidation.description"
                            invalid-feedback="Description is required"
                        >
                            <b-form-textarea
                                v-model="editingChallenge.description"
                                placeholder="Describe what this challenge is about, what participants will do, and what they can expect..."
                                class="modal-text"
                                :state="editValidation.description"
                                @input="validateEditField('description')"
                                rows="4"
                                required
                            ></b-form-textarea>
                        </b-form-group>

                        <div class="row">
                            <div class="col-md-6">
                                <b-form-group 
                                    label="Start Date *" 
                                    :state="editValidation.startDate"
                                    invalid-feedback="Start date is required"
                                >
                                    <b-form-input
                                        type="date"
                                        v-model="editingChallenge.startDate"
                                        class="modal-text"
                                        :state="editValidation.startDate"
                                        @input="validateEditField('startDate')"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-6">
                                <b-form-group 
                                    label="End Date *" 
                                    :state="editValidation.endDate"
                                    invalid-feedback="End date is required and must be after start date"
                                >
                                    <b-form-input
                                        type="date"
                                        v-model="editingChallenge.endDate"
                                        class="modal-text"
                                        :state="editValidation.endDate"
                                        @input="validateEditField('endDate')"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                        </div>

                        <b-form-group 
                            label="Participation Fee *" 
                            :state="editValidation.participationFee"
                            invalid-feedback="Participation fee is required and must be a valid amount"
                        >
                            <b-input-group>
                                <b-input-group-prepend>
                                    <b-input-group-text>$</b-input-group-text>
                                </b-input-group-prepend>
                                <b-form-input
                                    type="number"
                                    v-model="editingChallenge.participationFee"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    class="modal-text"
                                    :state="editValidation.participationFee"
                                    @input="validateEditField('participationFee')"
                                    required
                                ></b-form-input>
                            </b-input-group>
                            <small class="form-text text-muted">Set to $0.00 for free challenges</small>
                        </b-form-group>
                    </div>

                    <!-- Step 3: Rules and Settings -->
                    <div v-show="currentEditStep === 3" class="form-step">
                        <div class="step-header">
                            <h5><i class="fas fa-cog text-warning"></i> Rules and Settings</h5>
                            <p class="text-muted">Update the rules and configure participation settings</p>
                        </div>

                        <b-form-group 
                            label="Challenge Rules *" 
                            :state="editValidation.rules"
                            invalid-feedback="Challenge rules are required"
                        >
                            <b-form-textarea
                                v-model="editingChallenge.rules"
                                placeholder="Define clear rules and guidelines for participants. For example:&#10;• Complete daily workouts&#10;• Track nutrition daily&#10;• Attend weekly check-ins&#10;• No cheating or false reporting&#10;• Submit progress photos weekly"
                                class="modal-text"
                                :state="editValidation.rules"
                                @input="validateEditField('rules')"
                                rows="6"
                                required
                            ></b-form-textarea>
                        </b-form-group>

                        <div class="enrollment-section">
                            <h6><i class="fas fa-users"></i> Member Enrollment Settings</h6>
                            <b-form-group>
                                <b-form-checkbox v-model="editingChallenge.allowEnrollment" switch @change="onEditEnrollmentToggle">
                                    <strong>Allow members to sign up for this challenge</strong>
                                </b-form-checkbox>
                                <small class="form-text text-muted">Enable this to allow members to join your challenge</small>
                            </b-form-group>

                            <b-form-group 
                                v-if="editingChallenge.allowEnrollment"
                                label="Maximum Participants" 
                                :state="editValidation.maxParticipants"
                                invalid-feedback="Maximum participants must be a positive number"
                            >
                                <b-form-input
                                    type="number"
                                    v-model="editingChallenge.maxParticipants"
                                    placeholder="50"
                                    min="1"
                                    class="modal-text"
                                    :state="editValidation.maxParticipants"
                                    @input="validateEditField('maxParticipants')"
                                ></b-form-input>
                                <small class="form-text text-muted">Leave empty for unlimited participants</small>
                            </b-form-group>
                        </div>

                        <b-form-group label="Challenge Status">
                            <b-form-select
                                v-model="editingChallenge.status"
                                class="modal-text"
                            >
                                <b-form-select-option value="Active">✅ Active - Challenge is live and accepting participants</b-form-select-option>
                                <b-form-select-option value="Inactive">⏸️ Inactive - Challenge is paused</b-form-select-option>
                            </b-form-select>
                        </b-form-group>
                    </div>

                    <!-- Navigation Buttons -->
                    <div class="form-navigation mt-4">
                        <div class="d-flex justify-content-between align-items-center">
                            <b-button 
                                v-if="currentEditStep > 1" 
                                variant="outline-secondary" 
                                @click="previousEditStep"
                                class="nav-btn"
                            >
                                <i class="fas fa-arrow-left"></i> Previous
                            </b-button>
                            <div v-else></div>
                            
                            <div class="step-indicator">
                                Step {{ currentEditStep }} of 3
                            </div>
                            
                            <b-button 
                                v-if="currentEditStep < 3" 
                                variant="primary" 
                                @click="nextEditStep"
                                class="nav-btn"
                                :disabled="!isCurrentEditStepValid"
                            >
                                Next <i class="fas fa-arrow-right"></i>
                            </b-button>
                            <div v-else></div>
                        </div>
                    </div>
                </b-form>
            </b-modal>

            <!-- Modal: Add New Reward -->
            <b-modal
                v-model="showRewardModal"
                title="Add New Reward"
                ok-title="Save Reward"
                cancel-title="Cancel"
                @ok="createReward"
                @cancel="resetRewardForm"
                size="lg"
                :ok-disabled="!isRewardFormValid"
            >
                <b-form @submit.stop.prevent="createReward">
                    <!-- Reward Name -->
                    <b-form-group 
                        label="Reward Name *" 
                        :state="rewardValidation.name"
                        invalid-feedback="Reward name is required"
                    >
                        <b-form-input
                            v-model="newReward.name"
                            placeholder="e.g. Free 1-Month Membership"
                            :state="rewardValidation.name"
                            @input="validateRewardField('name')"
                            required
                        ></b-form-input>
                    </b-form-group>

                    <!-- Description -->
                    <b-form-group 
                        label="Description *" 
                        :state="rewardValidation.description"
                        invalid-feedback="Description is required"
                    >
                        <b-form-textarea
                            v-model="newReward.description"
                            placeholder="Describe what the reward offers"
                            rows="3"
                            :state="rewardValidation.description"
                            @input="validateRewardField('description')"
                            required
                        ></b-form-textarea>
                    </b-form-group>

                    <!-- Points Required -->
                    <b-form-group 
                        label="Points Required *" 
                        :state="rewardValidation.points"
                        invalid-feedback="Points are required and must be a positive number"
                    >
                        <b-form-input
                            type="number"
                            min="1"
                            v-model="newReward.points"
                            placeholder="e.g. 500"
                            :state="rewardValidation.points"
                            @input="validateRewardField('points')"
                            required
                        ></b-form-input>
                    </b-form-group>

                    <!-- Category -->
                    <b-form-group 
                        label="Category *" 
                        :state="rewardValidation.category"
                        invalid-feedback="Category is required"
                    >
                        <b-form-select
                            v-model="newReward.category"
                            class="modal-text"
                            :state="rewardValidation.category"
                            @change="validateRewardField('category')"
                            required
                        >
                            <b-form-select-option value="">Select Category</b-form-select-option>
                            <b-form-select-option value="Trophy">Trophy</b-form-select-option>
                            <b-form-select-option value="Medal">Medal</b-form-select-option>
                            <b-form-select-option value="Achievement">Achievement</b-form-select-option>
                            <b-form-select-option value="Badge">Badge</b-form-select-option>
                            <b-form-select-option value="Certificate">Certificate</b-form-select-option>
                            <b-form-select-option value="Other">Other</b-form-select-option>
                        </b-form-select>
                    </b-form-group>

                    <!-- Optional Image -->
                    <!-- <b-form-group label="Reward Image (Optional)">
                        <b-form-file
                            v-model="newReward.image"
                            placeholder="Choose an image or drag & drop"
                            browse-text="Browse"
                            accept="image/*"
                        ></b-form-file>
                    </b-form-group> -->

                    <!-- Expiry Date -->
                    <!-- <b-form-group label="Expiry Date (Optional)">
                        <b-form-datepicker
                            v-model="newReward.expiry_date"
                            placeholder="Select expiry date"
                        ></b-form-datepicker>
                    </b-form-group> -->

                    <!-- Quantity -->
                    <!-- <b-form-group label="Available Quantity (Optional)">
                        <b-form-input
                            type="number"
                            min="1"
                            v-model="newReward.quantity"
                            placeholder="e.g. 10 (leave blank for unlimited)"
                        ></b-form-input>
                    </b-form-group> -->

                    <!-- Active Toggle -->
                    <b-form-group>
                        <b-form-checkbox v-model="newReward.active" switch>
                            Reward is Active
                        </b-form-checkbox>
                    </b-form-group>
                </b-form>
            </b-modal>

            <!-- Modal: Edit Reward -->
            <b-modal
                v-model="showEditRewardModal"
                title="✏️ Edit Reward"
                ok-title="Update Reward"
                cancel-title="Cancel"
                @ok="updateReward"
                @cancel="resetEditRewardForm"
                size="lg"
                :ok-disabled="!isEditRewardFormValid"
            >
                <b-form @submit.stop.prevent="updateReward">
                    <!-- Reward Name -->
                    <b-form-group 
                        label="Reward Name *" 
                        :state="editRewardValidation.name"
                        invalid-feedback="Reward name is required"
                    >
                        <b-form-input
                            v-model="editingReward.name"
                            placeholder="e.g. Free 1-Month Membership"
                            :state="editRewardValidation.name"
                            @input="validateEditRewardField('name')"
                            required
                        ></b-form-input>
                    </b-form-group>

                    <!-- Description -->
                    <b-form-group 
                        label="Description *" 
                        :state="editRewardValidation.description"
                        invalid-feedback="Description is required"
                    >
                        <b-form-textarea
                            v-model="editingReward.description"
                            placeholder="Describe what the reward offers"
                            rows="3"
                            :state="editRewardValidation.description"
                            @input="validateEditRewardField('description')"
                            required
                        ></b-form-textarea>
                    </b-form-group>

                    <!-- Points Required -->
                    <b-form-group 
                        label="Points Required *" 
                        :state="editRewardValidation.points"
                        invalid-feedback="Points are required and must be a positive number"
                    >
                        <b-form-input
                            type="number"
                            min="1"
                            v-model="editingReward.points"
                            placeholder="e.g. 500"
                            :state="editRewardValidation.points"
                            @input="validateEditRewardField('points')"
                            required
                        ></b-form-input>
                    </b-form-group>

                    <!-- Category -->
                    <b-form-group 
                        label="Category *" 
                        :state="editRewardValidation.category"
                        invalid-feedback="Category is required"
                    >
                        <b-form-select
                            v-model="editingReward.category"
                            class="modal-text"
                            :state="editRewardValidation.category"
                            @change="validateEditRewardField('category')"
                            required
                        >
                            <b-form-select-option value="">Select Category</b-form-select-option>
                            <b-form-select-option value="Trophy">Trophy</b-form-select-option>
                            <b-form-select-option value="Medal">Medal</b-form-select-option>
                            <b-form-select-option value="Achievement">Achievement</b-form-select-option>
                            <b-form-select-option value="Badge">Badge</b-form-select-option>
                            <b-form-select-option value="Certificate">Certificate</b-form-select-option>
                            <b-form-select-option value="Other">Other</b-form-select-option>
                        </b-form-select>
                    </b-form-group>

                    <!-- Active Toggle -->
                    <b-form-group>
                        <b-form-checkbox v-model="editingReward.active" switch>
                            Reward is Active
                        </b-form-checkbox>
                    </b-form-group>
                </b-form>
            </b-modal>

            <!-- Add Member to Challenge Modal -->
            <b-modal
                ref="addMemberModal"
                title="Add Member to Challenge"
                size="md"
                @hidden="resetAddMemberForm"
                @show="onModalShow"
            >
                <b-form id="addMemberForm" @submit.prevent="addMemberToChallenge">
                    <b-form-group label="Select Challenge" label-for="challenge-select">
                        <b-form-select
                            id="challenge-select"
                            v-model="addMemberForm.challengeId"
                            :options="challengeOptions"
                            required
                            :state="addMemberValidation.challengeId"
                            @change="validateChallengeSelection"
                        >
                            <template #first>
                                <b-form-select-option :value="null" disabled>
                                    Choose a challenge...
                                </b-form-select-option>
                            </template>
                        </b-form-select>
                        <b-form-invalid-feedback>
                            Please select a challenge
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group label="Select Member" label-for="member-select">
                        <b-form-select
                            id="member-select"
                            v-model="addMemberForm.memberId"
                            :options="availableMembers"
                            required
                            :state="addMemberValidation.memberId"
                            :disabled="loadingMembers"
                            @change="validateMemberSelection"
                        >
                            <template #first>
                                <b-form-select-option :value="null" disabled>
                                    {{ loadingMembers ? 'Loading members...' : 'Choose a member...' }}
                                </b-form-select-option>
                            </template>
                        </b-form-select>
                        <b-form-invalid-feedback>
                            Please select a member
                        </b-form-invalid-feedback>
                        <b-form-text v-if="availableMembers.length === 0 && !loadingMembers" class="text-warning">
                            <i class="fas fa-exclamation-triangle"></i> No members available. Please add members first.
                        </b-form-text>
                    </b-form-group>

                    <b-form-group label="Initial Progress (%)" label-for="progress-input">
                        <b-form-input
                            id="progress-input"
                            type="number"
                            v-model="addMemberForm.progress"
                            min="0"
                            max="100"
                            placeholder="0"
                        ></b-form-input>
                        <small class="form-text text-muted">
                            Optional: Set initial progress percentage (0-100)
                        </small>
                    </b-form-group>

                    <b-form-group label="Status" label-for="status-select">
                        <b-form-select
                            id="status-select"
                            v-model="addMemberForm.status"
                            :options="statusOptions"
                            required
                        ></b-form-select>
                    </b-form-group>

                    <div class="alert alert-info">
                        <i class="fas fa-info-circle"></i>
                        <strong>Note:</strong> Select a challenge and member to add them to the challenge. The member will be able to start participating immediately.
                    </div>
                </b-form>

                <template #modal-footer>
                    <b-button variant="secondary" @click="$refs.addMemberModal.hide()">
                        Cancel
                    </b-button>
                    <b-button 
                        variant="primary" 
                        type="submit"
                        form="addMemberForm"
                        :disabled="!isAddMemberFormValid || addingMember"
                    >
                        <span v-if="addingMember">
                            <i class="fas fa-spinner fa-spin"></i> Adding...
                        </span>
                        <span v-else>
                            <i class="fas fa-plus"></i> Add Member
                        </span>
                    </b-button>
                </template>
            </b-modal>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTab: 0,
            showCreateModal: false,
            showEditModal: false,
            showAddMemberModal: false,
            selectedChallenge: null,
            currentStep: 1,
            currentEditStep: 1,
            loading: false,
            addingMember: false,
            loadingMembers: false,

            // Challenge data - will be loaded from API
            challenges: [],
            challengeFields: [
                { key: "name", label: "Challenge Name", sortable: true },
                { key: "duration", label: "Duration", sortable: true },
                { key: "participants", label: "Participants", sortable: true },
                { key: "reward", label: "Reward", sortable: true },
                { key: "remainingDays", label: "Remaining Days", sortable: true }, // <-- new field
                { key: "status", label: "Status", sortable: true },
                { key: "actions", label: "Actions" },
            ],

            participants: [], // Will be loaded from API
            participantFields: [
                { key: "name", label: "Participant Name", sortable: true },
                { key: "email", label: "Email", sortable: true },
                { key: "progress", label: "Progress", sortable: true },
                { key: "status", label: "Status", sortable: true },
                { key: "lastActivity", label: "Last Activity", sortable: true },
            ],
            selectedChallengeFilter: null,

            leaderboard: [], // Will be calculated from participants data
            leaderboardFields: [
                { key: "rank", label: "Rank", sortable: true },
                { key: "name", label: "Participant", sortable: true },
                { key: "points", label: "Points", sortable: true },
                { key: "achievements", label: "Achievements" },
                { key: "level", label: "Level", sortable: true },
                { key: "actions", label: "Actions" },
            ],
            selectedLeaderboardChallenge: null,

            // Reports data - will be calculated from API data
            recentActivities: [], // Will be generated from participants/challenges data

            // Rewards data - will be loaded from API
            rewards: [],
            rewardFields: [
                { key: "name", label: "Reward Name", sortable: true },
                { key: "description", label: "Description" },
                { key: "points", label: "Points Required", sortable: true },
                { key: "category", label: "Category", sortable: true },
                { key: "status", label: "Status", sortable: true },
                { key: "actions", label: "Actions" },
                
            ],

            // New challenge form
            newChallenge: {
                name: "",
                // duration: "",
                goal: "",
                reward: "",
                description: "",
                startDate: "",
                endDate: "",
                participationFee: "",
                rules: "",
                allowEnrollment: true,
                maxParticipants: "",
                status: "Active",
            },

            // Edit challenge form
            editingChallenge: {
                id: null,
                name: "",
                // duration: "",
                goal: "",
                reward: "",
                description: "",
                startDate: "",
                endDate: "",
                participationFee: "",
                rules: "",
                allowEnrollment: true,
                maxParticipants: "",
                status: "Active",
            },

            // Edit validation state
            editValidation: {
                name: null,
                // duration: null,
                goal: null,
                reward: null,
                description: null,
                startDate: null,
                endDate: null,
                participationFee: null,
                rules: null,
                maxParticipants: null,
            },

            // Validation state
            validation: {
                name: null,
                // duration: null,
                goal: null,
                reward: null,
                description: null,
                startDate: null,
                endDate: null,
                participationFee: null,
                rules: null,
                maxParticipants: null,
            },

            // Reward modal
            showRewardModal: false,
            showEditRewardModal: false,
            newReward: {
                name: "",
                description: "",
                points: "",
                category: "",
                active: true,
            },

            // Edit reward form
            editingReward: {
                id: null,
                name: "",
                description: "",
                points: "",
                category: "",
                active: true,
            },

            // Reward validation state
            rewardValidation: {
                name: null,
                description: null,
                points: null,
                category: null,
            },

            // Edit reward validation state
            editRewardValidation: {
                name: null,
                description: null,
                points: null,
                category: null,
            },

            // Add Member form data
            addMemberForm: {
                challengeId: null,
                memberId: null,
                progress: 0,
                status: 'Active'
            },

            // Add Member validation state
            addMemberValidation: {
                challengeId: null,
                memberId: null
            },

            // Available members for selection
            availableMembers: [],

            // Status options for member assignment
            statusOptions: [
                { value: 'Active', text: 'Active' },
                { value: 'Inactive', text: 'Inactive' },
                { value: 'Completed', text: 'Completed' },
                { value: 'Dropped', text: 'Dropped' }
            ],

            // API base URL - using axios which is already configured in main.js
        };
    },
    methods: {
        goBack() {
            // Check if there's a previous page in history
            if (window.history.length > 1) {
                this.$router.go(-1);
            } else {
                // Default fallback to members page
                this.$router.push({ name: 'ViewAllMembers' });
            }
        },
        
        // API Methods
        async fetchRewards() {
            try {
                this.loading = true;
                const response = await axios.get('rewards');
                if (response && response.data && response.data.success === true) {
                    this.rewards = response.data.data || [];
                } else {
                    throw new Error(response?.data?.message || 'Failed to load rewards');
                }
            } catch (error) {
                console.error('Error fetching rewards:', error);
                this.$bvToast.toast("Failed to load rewards", {
                    title: "Error",
                    variant: "danger",
                    solid: true,
                });
            } finally {
                this.loading = false;
            }
        },

        async createRewardAPI(rewardData) {
            try {
                const response = await axios.post('rewards', {
                    name: rewardData.name,
                    description: rewardData.description,
                    points: parseInt(rewardData.points),
                    category: rewardData.category,
                    status: rewardData.active ? 'Active' : 'Inactive',
                });

                // Backend returns reward directly on HTTP 201, or wrapped in {success: true, data: ...}
                if (response && response.status === 201 && response.data) {
                    // If response has success property, use data property, otherwise use response.data directly
                    const reward = response.data.success === true ? response.data.data : response.data;
                    this.rewards.push(reward);
                    return true;
                } else {
                    throw new Error(response?.data?.message || 'Failed to create reward');
                }
            } catch (error) {
                console.error('Error creating reward:', error);
                
                // Handle validation errors
                if (error.response && error.response.status === 422 && error.response.data.errors) {
                    const validationErrors = Object.values(error.response.data.errors).flat();
                    this.$bvToast.toast(validationErrors.join(', '), {
                        title: "Validation Error",
                        variant: "danger",
                        solid: true,
                        autoHideDelay: 5000,
                    });
                } else {
                    // Handle other errors
                    const errorMessage = error.response?.data?.message 
                        || error.response?.data?.error 
                        || error.message 
                        || "Failed to create reward";
                    this.$bvToast.toast(errorMessage, {
                        title: "Error",
                        variant: "danger",
                        solid: true,
                        autoHideDelay: 5000,
                    });
                }
                return false;
            }
        },

        async updateRewardAPI(rewardId, rewardData) {
            try {
                const response = await axios.put(`rewards/${rewardId}`, {
                    name: rewardData.name,
                    description: rewardData.description,
                    points: parseInt(rewardData.points),
                    category: rewardData.category,
                    status: rewardData.status,
                });

                if (response && response.data && response.data.success === true) {
                    const index = this.rewards.findIndex(r => r.id === rewardId);
                    if (index !== -1) {
                        this.rewards[index] = response.data.data;
                    }
                    return true;
                } else {
                    throw new Error(response?.data?.message || 'Failed to update reward');
                }
            } catch (error) {
                console.error('Error updating reward:', error);
                
                // Handle validation errors
                if (error.response && error.response.status === 422 && error.response.data.errors) {
                    const validationErrors = Object.values(error.response.data.errors).flat();
                    this.$bvToast.toast(validationErrors.join(', '), {
                        title: "Validation Error",
                        variant: "danger",
                        solid: true,
                        autoHideDelay: 5000,
                    });
                } else {
                    // Handle other errors
                    const errorMessage = error.response?.data?.message 
                        || error.response?.data?.error 
                        || error.message 
                        || "Failed to update reward";
                    this.$bvToast.toast(errorMessage, {
                        title: "Error",
                        variant: "danger",
                        solid: true,
                        autoHideDelay: 5000,
                    });
                }
                return false;
            }
        },

        async deleteRewardAPI(rewardId) {
            try {
                const response = await axios.delete(`rewards/${rewardId}`);
                if (response && response.data && response.data.success === true) {
                    const index = this.rewards.findIndex(r => r.id === rewardId);
                    if (index !== -1) {
                        this.rewards.splice(index, 1);
                    }
                } else {
                    throw new Error(response?.data?.message || 'Failed to delete reward');
                }
                return true;
            } catch (error) {
                console.error('Error deleting reward:', error);
                
                // Handle different error types
                const errorMessage = error.response?.data?.message 
                    || error.response?.data?.error 
                    || error.message 
                    || "Failed to delete reward";
                this.$bvToast.toast(errorMessage, {
                    title: "Error",
                    variant: "danger",
                    solid: true,
                    autoHideDelay: 5000,
                });
                return false;
            }
        },

        // Challenge API Methods
        async fetchChallenges() {
            try {
                this.loading = true;
                const response = await axios.get('challenges');
                this.challenges = response.data.map(challenge => ({
                    ...challenge,
                    duration: `${challenge.duration} days`,
                    startDate: challenge.start_date,
                    endDate: challenge.end_date,
                    participationFee: challenge.participation_fee,
                    maxParticipants: challenge.max_participants,
                    allowEnrollment: challenge.allow_enrollment,
                    reward: challenge.reward ? challenge.reward.name : 'No Reward',
                    rewardId: challenge.reward_id,
                    participants: challenge.participants_count || 0, // Use actual count from API
                    participants_count: challenge.participants_count || 0,
                }));
            } catch (error) {
                console.error('Error fetching challenges:', error);
                this.$bvToast.toast("Failed to load challenges", {
                    title: "Error",
                    variant: "danger",
                    solid: true,
                });
            } finally {
                this.loading = false;
            }
        },

        async createChallengeAPI(challengeData) {
            try {
                const response = await axios.post('challenges', {
                    name: challengeData.name,
                    // duration: parseInt(challengeData.duration),
                    goal: challengeData.goal,
                    reward_id: parseInt(challengeData.reward),
                    description: challengeData.description,
                    start_date: challengeData.startDate,
                    end_date: challengeData.endDate,
                    participation_fee: parseFloat(challengeData.participationFee) || 0,
                    rules: challengeData.rules,
                    allow_enrollment: challengeData.allowEnrollment,
                    max_participants: challengeData.allowEnrollment ? parseInt(challengeData.maxParticipants) || null : null,
                    status: challengeData.status,
                });

                const newChallenge = {
                    ...response.data,
                    duration: `${response.data.duration} days`,
                    startDate: response.data.start_date,
                    endDate: response.data.end_date,
                    participationFee: response.data.participation_fee,
                    maxParticipants: response.data.max_participants,
                    allowEnrollment: response.data.allow_enrollment,
                    reward: response.data.reward ? response.data.reward.name : 'No Reward',
                    rewardId: response.data.reward_id,
                    participants: 0,
                    progress: 0,
                };

                this.challenges.push(newChallenge);
                return true;
            } catch (error) {
                console.error('Error creating challenge:', error);
                const errorMessage = error.response?.data?.message || "Failed to create challenge";
                this.$bvToast.toast(errorMessage, {
                    title: "Error",
                    variant: "danger",
                    solid: true,
                });
                return false;
            }
        },

        async updateChallengeAPI(challengeId, challengeData) {
            try {
                const response = await axios.put(`challenges/${challengeId}`, {
                    name: challengeData.name,
                    // duration: parseInt(challengeData.duration),
                    goal: challengeData.goal,
                    reward_id: parseInt(challengeData.reward),
                    description: challengeData.description,
                    start_date: challengeData.startDate,
                    end_date: challengeData.endDate,
                    participation_fee: parseFloat(challengeData.participationFee) || 0,
                    rules: challengeData.rules,
                    allow_enrollment: challengeData.allowEnrollment,
                    max_participants: challengeData.allowEnrollment ? parseInt(challengeData.maxParticipants) || null : null,
                    status: challengeData.status,
                });

                const updatedChallenge = {
                    ...response.data,
                    duration: `${response.data.duration} days`,
                    startDate: response.data.start_date,
                    endDate: response.data.end_date,
                    participationFee: response.data.participation_fee,
                    maxParticipants: response.data.max_participants,
                    allowEnrollment: response.data.allow_enrollment,
                    reward: response.data.reward ? response.data.reward.name : 'No Reward',
                    rewardId: response.data.reward_id,
                    participants: 0,
                    progress: 0,
                };

                const index = this.challenges.findIndex(c => c.id === challengeId);
                if (index !== -1) {
                    this.challenges[index] = updatedChallenge;
                }
                return true;
            } catch (error) {
                console.error('Error updating challenge:', error);
                const errorMessage = error.response?.data?.message || "Failed to update challenge";
                this.$bvToast.toast(errorMessage, {
                    title: "Error",
                    variant: "danger",
                    solid: true,
                });
                return false;
            }
        },

        async deleteChallengeAPI(challengeId) {
            try {
                const response = await axios.delete(`challenges/${challengeId}`);
                if (response && response.data && response.data.success === true) {
                    // Refresh challenges list instead of manual array manipulation
                    await this.fetchChallenges();
                    await this.fetchChallengeParticipants();
                    return true;
                } else {
                    throw new Error(response?.data?.message || 'Failed to delete challenge');
                }
            } catch (error) {
                console.error('Error deleting challenge:', error);
                const errorMessage = error.response?.data?.message || "Failed to delete challenge";
                this.$bvToast.toast(errorMessage, {
                    title: "Error",
                    variant: "danger",
                    solid: true,
                });
                return false;
            }
        },

        viewChallenge(challenge) {
            this.selectedChallenge = challenge;
            this.activeTab = 1; // Switch to Participants tab
        },
        async createChallenge() {
            // Validate all fields first
            this.validateAllFields();
            
            if (!this.isFormValid) {
                // Show error notification
                this.$bvToast.toast("Please fill all required fields correctly!", {
                    title: "Validation Error",
                    variant: "danger",
                    solid: true,
                    autoHideDelay: 5000,
                });
                return false; // Prevent modal from closing
            }

            // Create the challenge via API
            const success = await this.createChallengeAPI(this.newChallenge);
            
            if (success) {
                // Reset form and validation
                this.resetForm();

                // Refresh challenges list
                await this.fetchChallenges();
                await this.fetchChallengeParticipants();

                // Show success notification
                this.$bvToast.toast("Challenge created successfully!", {
                    title: "Success",
                    variant: "success",
                    solid: true,
                    autoHideDelay: 3000,
                });

                return true; // Allow modal to close
            }

            return false; // Prevent modal from closing
        },

        validateField(fieldName) {
            const value = this.newChallenge[fieldName];
            
            switch (fieldName) {
                case 'name':
                    this.validation.name = value && value.trim().length > 0;
                    break;
                case 'goal':
                    this.validation.goal = value && value.trim().length > 0;
                    break;
                case 'reward':
                    this.validation.reward = value && value !== "";
                    break;
                case 'description':
                    this.validation.description = value && value.trim().length > 0;
                    break;
                case 'startDate':
                    this.validation.startDate = value && value.trim().length > 0;
                    break;
                case 'endDate':
                    this.validation.endDate = value && value.trim().length > 0;
                    if (this.newChallenge.startDate && value) {
                        this.validation.endDate = new Date(value) > new Date(this.newChallenge.startDate);
                    }
                    break;
                case 'participationFee':
                    this.validation.participationFee = value && !isNaN(value) && parseFloat(value) >= 0;
                    break;
                case 'rules':
                    this.validation.rules = value && value.trim().length > 0;
                    break;
                case 'maxParticipants':
                    if (this.newChallenge.allowEnrollment) {
                        this.validation.maxParticipants = value && !isNaN(value) && parseInt(value) > 0;
                    } else {
                        this.validation.maxParticipants = true; // Not required if enrollment is disabled
                    }
                    break;
            }
        },

        validateAllFields() {
            this.validateField('name');
            this.validateField('goal');
            this.validateField('reward');
            this.validateField('description');
            this.validateField('startDate');
            this.validateField('endDate');
            this.validateField('participationFee');
            this.validateField('rules');
            this.validateField('maxParticipants');
        },

        resetForm() {
            this.newChallenge = {
                name: "",
                goal: "",
                reward: "",
                description: "",
                startDate: "",
                endDate: "",
                participationFee: "",
                rules: "",
                allowEnrollment: true,
                maxParticipants: "",
                status: "Active",
            };
            
            // Reset validation state
            this.validation = {
                name: null,
                goal: null,
                reward: null,
                description: null,
                startDate: null,
                endDate: null,
                participationFee: null,
                rules: null,
                maxParticipants: null,
            };
        },
        setActiveTabFromRoute() {
            // Since this is now a direct route, we'll default to the first tab
            this.activeTab = 0;
        },
        async createReward() {
            // Validate all reward fields first
            this.validateAllRewardFields();
            
            if (!this.isRewardFormValid) {
                // Show error notification
                this.$bvToast.toast("Please fill all required fields correctly!", {
                    title: "Validation Error",
                    variant: "danger",
                    solid: true,
                    autoHideDelay: 5000,
                });
                return false; // Prevent modal from closing
            }

            // Create the reward via API
            const success = await this.createRewardAPI(this.newReward);
            
                            if (success) {
                    // Reset form and validation
                    this.resetRewardForm();

                    // Refresh the rewards list
                    await this.fetchRewards();

                    // Show success notification
                    this.$bvToast.toast("Reward created successfully!", {
                        title: "Success",
                        variant: "success",
                        solid: true,
                        autoHideDelay: 3000,
                    });

                    return true; // Allow modal to close
            }

            return false; // Prevent modal from closing
        },

        validateRewardField(fieldName) {
            const value = this.newReward[fieldName];
            
            switch (fieldName) {
                case 'name':
                    this.rewardValidation.name = value && value.trim().length > 0;
                    break;
                case 'description':
                    this.rewardValidation.description = value && value.trim().length > 0;
                    break;
                case 'points':
                    this.rewardValidation.points = value && !isNaN(value) && parseInt(value) > 0;
                    break;
                case 'category':
                    this.rewardValidation.category = value && value.trim().length > 0;
                    break;
            }
        },

        validateAllRewardFields() {
            this.validateRewardField('name');
            this.validateRewardField('description');
            this.validateRewardField('points');
            this.validateRewardField('category');
        },

        resetRewardForm() {
            this.newReward = {
                name: "",
                description: "",
                points: "",
                category: "",
                active: true,
            };
            
            // Reset validation state
            this.rewardValidation = {
                name: null,
                description: null,
                points: null,
                category: null,
            };
        },

        onEnrollmentToggle() {
            // When enrollment is toggled, validate maxParticipants field
            if (this.newChallenge.allowEnrollment) {
                this.validateField('maxParticipants');
            } else {
                this.validation.maxParticipants = true; // Not required when disabled
            }
        },
        // Edit validation state
        onEditEnrollmentToggle() {
            // When enrollment is toggled, validate maxParticipants field for edit form
            if (this.editingChallenge.allowEnrollment) {
                this.validateEditField('maxParticipants');
            } else {
                this.editValidation.maxParticipants = true; // Not required when disabled
            }
        },

        nextEditStep() {
            if (this.isCurrentEditStepValid && this.currentEditStep < 3) {
                this.currentEditStep++;
            }
        },

        previousEditStep() {
            if (this.currentEditStep > 1) {
                this.currentEditStep--;
            }
        },

        nextStep() {
            if (this.isCurrentStepValid && this.currentStep < 3) {
                this.currentStep++;
            }
        },


        previousStep() {
            if (this.currentStep > 1) {
                this.currentStep--;
            }
        },

        resetForm() {
            this.newChallenge = {
                name: "",
                // duration: "",
                goal: "",
                reward: "",
                description: "",
                startDate: "",
                endDate: "",
                participationFee: "",
                rules: "",
                allowEnrollment: true,
                maxParticipants: "",
                status: "Active",
            };
            
            // Reset validation state
            this.validation = {
                name: null,
                // duration: null,
                goal: null,
                reward: null,
                description: null,
                startDate: null,
                endDate: null,
                participationFee: null,
                rules: null,
                maxParticipants: null,
            };

            // Reset step
            this.currentStep = 1;
        },
        async updateChallenge() {
            // Validate all fields first
            this.validateAllEditFields();
            
            if (!this.isEditFormValid) {
                // Show error notification
                this.$bvToast.toast("Please fill all required fields correctly!", {
                    title: "Validation Error",
                    variant: "danger",
                    solid: true,
                    autoHideDelay: 5000,
                });
                return false; // Prevent modal from closing
            }

            // Update the challenge via API
            const success = await this.updateChallengeAPI(this.editingChallenge.id, this.editingChallenge);
            
            if (success) {
                // Reset form and validation
                this.resetEditForm();

                // Refresh challenges list
                await this.fetchChallenges();
                await this.fetchChallengeParticipants();

                // Show success notification
                this.$bvToast.toast("Challenge updated successfully!", {
                    title: "Success",
                    variant: "success",
                    solid: true,
                    autoHideDelay: 3000,
                });

                return true; // Allow modal to close
            }

            return false; // Prevent modal from closing
        },

        validateEditField(fieldName) {
            const value = this.editingChallenge[fieldName];
            
            switch (fieldName) {
                case 'name':
                    this.editValidation.name = value && value.trim().length > 0;
                    break;
                case 'goal':
                    this.editValidation.goal = value && value.trim().length > 0;
                    break;
                case 'reward':
                    this.editValidation.reward = value && value !== "";
                    break;
                case 'description':
                    this.editValidation.description = value && value.trim().length > 0;
                    break;
                case 'startDate':
                    this.editValidation.startDate = value && value.trim().length > 0;
                    break;
                case 'endDate':
                    this.editValidation.endDate = value && value.trim().length > 0;
                    if (this.editingChallenge.startDate && value) {
                        this.editValidation.endDate = new Date(value) > new Date(this.editingChallenge.startDate);
                    }
                    break;
                case 'participationFee':
                    this.editValidation.participationFee = value && !isNaN(value) && parseFloat(value) >= 0;
                    break;
                case 'rules':
                    this.editValidation.rules = value && value.trim().length > 0;
                    break;
                case 'maxParticipants':
                    if (this.editingChallenge.allowEnrollment) {
                        this.editValidation.maxParticipants = value && !isNaN(value) && parseInt(value) > 0;
                    } else {
                        this.editValidation.maxParticipants = true; // Not required if enrollment is disabled
                    }
                    break;
            }
        },

        validateAllEditFields() {
            this.validateEditField('name');
            this.validateEditField('goal');
            this.validateEditField('reward');
            this.validateEditField('description');
            this.validateEditField('startDate');
            this.validateEditField('endDate');
            this.validateEditField('participationFee');
            this.validateEditField('rules');
            this.validateEditField('maxParticipants');
        },

        resetEditValidation() {
            this.editValidation = {
                name: null,
                goal: null,
                reward: null,
                description: null,
                startDate: null,
                endDate: null,
                participationFee: null,
                rules: null,
                maxParticipants: null,
            };
        },

        resetEditForm() {
            this.editingChallenge = {
                id: null,
                name: "",
                goal: "",
                reward: "",
                description: "",
                startDate: "",
                endDate: "",
                participationFee: "",
                rules: "",
                allowEnrollment: true,
                maxParticipants: "",
                status: "Active",
            };
            
            // Reset validation state
            this.resetEditValidation();

            // Reset step
            this.currentEditStep = 1;
        },
        async editReward(reward) {
            // Populate the editing form with reward data
            this.editingReward = {
                id: reward.id,
                name: reward.name,
                description: reward.description,
                points: reward.points.toString(),
                category: reward.category,
                active: reward.status === 'Active',
            };

            // Reset validation state
            this.resetEditRewardValidation();

            // Validate all fields to set initial validation state
            this.validateAllEditRewardFields();

            // Show the edit modal
            this.showEditRewardModal = true;
        },
        async updateReward() {
            // Validate all reward fields first
            this.validateAllEditRewardFields();
            
            if (!this.isEditRewardFormValid) {
                // Show error notification
                this.$bvToast.toast("Please fill all required fields correctly!", {
                    title: "Validation Error",
                    variant: "danger",
                    solid: true,
                    autoHideDelay: 5000,
                });
                return false; // Prevent modal from closing
            }

            // Update the reward via API
            const success = await this.updateRewardAPI(this.editingReward.id, {
                name: this.editingReward.name,
                description: this.editingReward.description,
                points: parseInt(this.editingReward.points),
                category: this.editingReward.category,
                status: this.editingReward.active ? 'Active' : 'Inactive',
            });
            
                            if (success) {
                    // Reset form and validation
                    this.resetEditRewardForm();

                    // Refresh the rewards list
                    await this.fetchRewards();

                    // Show success notification
                    this.$bvToast.toast("Reward updated successfully!", {
                        title: "Success",
                        variant: "success",
                        solid: true,
                        autoHideDelay: 3000,
                    });

                    return true; // Allow modal to close
            }

            return false; // Prevent modal from closing
        },

        validateEditRewardField(fieldName) {
            const value = this.editingReward[fieldName];
            
            switch (fieldName) {
                case 'name':
                    this.editRewardValidation.name = value && value.trim().length > 0;
                    break;
                case 'description':
                    this.editRewardValidation.description = value && value.trim().length > 0;
                    break;
                case 'points':
                    this.editRewardValidation.points = value && !isNaN(value) && parseInt(value) > 0;
                    break;
                case 'category':
                    this.editRewardValidation.category = value && value.trim().length > 0;
                    break;
            }
        },

        validateAllEditRewardFields() {
            this.validateEditRewardField('name');
            this.validateEditRewardField('description');
            this.validateEditRewardField('points');
            this.validateEditRewardField('category');
        },

        resetEditRewardValidation() {
            this.editRewardValidation = {
                name: null,
                description: null,
                points: null,
                category: null,
            };
        },

        resetEditRewardForm() {
            this.editingReward = {
                id: null,
                name: "",
                description: "",
                points: "",
                category: "",
                active: true,
            };
            
            // Reset validation state
            this.resetEditRewardValidation();
        },

        async deleteReward(reward) {
            // Show confirmation dialog
            const confirmed = await this.$bvModal.msgBoxConfirm(
                `Are you sure you want to delete the reward "${reward.name}"?`,
                {
                    title: 'Confirm Delete',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'Delete',
                    cancelTitle: 'Cancel',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                }
            );

            if (confirmed) {
                const success = await this.deleteRewardAPI(reward.id);
                if (success) {
                    // Refresh the rewards list
                    await this.fetchRewards();

                    this.$bvToast.toast("Reward deleted successfully!", {
                        title: "Success",
                        variant: "success",
                        solid: true,
                        autoHideDelay: 3000,
                    });
                }
            }
        },
        editChallenge(challenge) {
            // Populate the editing form with challenge data
            this.editingChallenge = {
                id: challenge.id,
                name: challenge.name,
                // duration: challenge.duration ? challenge.duration.replace(' days', '') : '',
                goal: challenge.goal || '',
                reward: challenge.rewardId || '',
                description: challenge.description || '',
                startDate: challenge.startDate || '',
                endDate: challenge.endDate || '',
                participationFee: challenge.participationFee || '',
                rules: challenge.rules || '',
                allowEnrollment: challenge.allowEnrollment !== undefined ? challenge.allowEnrollment : true,
                maxParticipants: challenge.maxParticipants || '',
                status: challenge.status || 'Active',
            };

            // Reset validation state
            this.resetEditValidation();

            // Validate all fields to set initial validation state
            this.validateAllEditFields();

            // Reset step to 1
            this.currentEditStep = 1;

            // Show the edit modal
            this.showEditModal = true;
        },
        async deleteChallenge(challenge) {
            // Show confirmation dialog
            const confirmed = await this.$bvModal.msgBoxConfirm(
                `Are you sure you want to delete the challenge "${challenge.name}"?`,
                {
                    title: 'Confirm Delete',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'Delete',
                    cancelTitle: 'Cancel',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                }
            );

            if (confirmed) {
                const success = await this.deleteChallengeAPI(challenge.id);
                if (success) {
                    this.$bvToast.toast("Challenge deleted successfully!", {
                        title: "Success",
                        variant: "success",
                        solid: true,
                        autoHideDelay: 3000,
                    });
                }
            }
        },
        viewParticipant(participant) {
            console.log("View participant:", participant);
            // Implementation for viewing participant details
        },
        sendMessage(participant) {
            console.log("Send message to:", participant);
            // Implementation for sending message
        },
        viewLeaderboardProfile(participant) {
            console.log("View leaderboard profile:", participant);
            // Implementation for viewing profile
        },
        getStatusClass(status) {
            switch (status) {
                case "Active":
                    return "badge-active";
                case "Completed":
                    return "badge-completed";
                case "Inactive":
                    return "badge-inactive";
                default:
                    return "badge-info";
            }
        },
        async fetchChallengeParticipants(challengeId = null) {
            try {
                this.loading = true;
              
                const response = await axios.get('challenge_participants');
                
                if (response && response.data && response.data.success === true) {
                    // The backend returns { success: true, data: [...] }
                    // Transform the data to include name and email from member relationship
                    this.participants = response.data.data.map(participant => ({
                        ...participant,
                        id: participant.id,
                        name: participant.member ? (participant.member.membername || participant.member.name || `${participant.member.firstname || ''} ${participant.member.lastname || ''}`.trim() || 'Unknown') : 'Unknown',
                        email: participant.member ? participant.member.email : 'No email',
                        challengeId: participant.challenge_id,
                        challenge_id: participant.challenge_id,
                        progress: participant.progress || 0,
                        status: participant.status || 'Active',
                        joinDate: participant.created_at ? new Date(participant.created_at).toLocaleDateString() : 'N/A',
                        lastActivity: participant.last_activity
                            ? new Date(participant.last_activity).toLocaleString()
                            : 'N/A',
                        memberId: participant.member_id
                    }));
                } else {
                    throw new Error(response?.data?.message || 'Failed to fetch participants');
                }
            } catch (error) {
                console.error('Error fetching participants:', error);
                this.$bvToast.toast("Failed to load participants", {
                    title: "Error",
                    variant: "danger",
                    solid: true,
                });
            } finally {
                this.loading = false;
            }
        },
        async fetchAvailableMembers() {
            this.loadingMembers = true;
            
            try {
                const response = await axios.get('members?limit=all');
                
                let membersData = null;
                if (response.data && response.data.clients && Array.isArray(response.data.clients)) {
                    membersData = response.data.clients;
                } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
                    membersData = response.data.data;
                } else if (response.data && Array.isArray(response.data)) {
                    membersData = response.data;
                }
                
                if (membersData && membersData.length > 0) {
                    this.availableMembers = membersData.map(member => ({
                        value: member.id,
                        text: `${member.membername || member.name || (member.firstname + ' ' + member.lastname) || 'Unknown'} (${member.email || 'No email'})`
                    }));
                } else {
                    this.availableMembers = [];
                    this.$bvToast.toast('No members found', {
                        title: 'Warning',
                        variant: 'warning',
                        solid: true,
                    });
                }
            } catch (err) {
                this.availableMembers = [];
                this.$bvToast.toast('Error loading members', {
                    title: 'Error',
                    variant: 'danger',
                    solid: true,
                });
            }
            
            this.loadingMembers = false;
        },
        async openAddMemberModal() {
            await this.fetchAvailableMembers();
            
            if (this.selectedChallengeFilter) {
                this.addMemberForm.challengeId = this.selectedChallengeFilter;
            }
            
            this.$nextTick(() => {
                if (this.$refs.addMemberModal) {
                    this.$refs.addMemberModal.show();
                }
            });
        },

        
        async addMemberToChallenge() {
            this.addingMember = true;
            
            try {
                // Validate form
                if (!this.addMemberForm.challengeId || !this.addMemberForm.memberId) {
                    this.$bvToast.toast('Please select both challenge and member', {
                        title: 'Error',
                        variant: 'danger',
                        solid: true,
                    });
                    this.addingMember = false;
                    return;
                }

                const payload = {
                    challenge_id: parseInt(this.addMemberForm.challengeId),
                    member_id: parseInt(this.addMemberForm.memberId),
                    progress: parseInt(this.addMemberForm.progress) || 0,
                    status: this.addMemberForm.status,
                    last_activity: new Date().toISOString().split('T')[0]
                };

                const response = await axios.post('challenge_participants', payload);
                
                // Bulletproof response handling - check everything step by step
                let isSuccess = false;
                let successMessage = 'Member added to challenge successfully!';
                
                // Check response exists
                if (response) {
                    // Check HTTP status codes
                    if (response.status === 200 || response.status === 201) {
                        isSuccess = true;
                    }
                    
                    // Check response data structure
                    if (response.data && typeof response.data === 'object') {
                        // Check for success property
                        if (response.data.success === true) {
                            isSuccess = true;
                            if (response.data.message) {
                                successMessage = response.data.message;

                                this.addingMember = false;
                            }
                        }
                        // Check for error property
                        else if (response.data.success === false) {
                            isSuccess = false;
                            if (response.data.message) {
                                this.$bvToast.toast(response.data.message, {
                                    title: 'Error',
                                    variant: 'danger',
                                    solid: true,
                                });
                                this.addingMember = false;
                                return;
                            }
                        }
                        // Check for Laravel validation errors
                        else if (response.data.errors && typeof response.data.errors === 'object') {
                            const errors = Object.values(response.data.errors).flat();
                            this.$bvToast.toast(errors.join(', '), {
                                title: 'Error',
                                variant: 'danger',
                                solid: true,
                            });
                            this.addingMember = false;
                            return;
                        }
                    }
                }
                
                // Handle success
                if (isSuccess) {
                    // this.$toast.success(successMessage);
                    this.$bvToast.toast(
                        successMessage,
                        {
                            title: 'Success',
                            variant: 'success',
                            solid: true,
                        }
                    );
                    this.$refs.addMemberModal.hide();
                    this.resetAddMemberForm();
                    this.fetchChallengeParticipants();
                } else {
                    this.$bvToast.toast('Failed to add member to challenge', {
                        title: 'Error',
                        variant: 'danger',
                        solid: true,
                    });
                }
                
            } catch (err) {
                console.error('Error adding member to challenge:', err);

                let errorMsg = 'Failed to add member to challenge';
                
                // Bulletproof error handling
                if (err && typeof err === 'object') {
                    // Check for response object
                    if (err.response && typeof err.response === 'object') {
                        // Handle HTTP status codes
                        if (err.response.status === 422) {
                            errorMsg = 'Validation failed. Please check your input.';
                        } else if (err.response.status === 404) {
                            errorMsg = 'Challenge or member not found.';
                        } else if (err.response.status === 409) {
                            errorMsg = 'Member is already participating in this challenge.';
                        } else if (err.response.status === 500) {
                            errorMsg = 'Server error. Please try again later.';
                        } else if (err.response.status === 401) {
                            errorMsg = 'Unauthorized. Please login again.';
                        } else if (err.response.status === 403) {
                            errorMsg = 'Access denied.';
                        }
                        
                        // Safely access response data
                        if (err.response.data && typeof err.response.data === 'object') {
                            if (err.response.data.message && typeof err.response.data.message === 'string') {
                                errorMsg = err.response.data.message;
                            } else if (err.response.data.error && typeof err.response.data.error === 'string') {
                                errorMsg = err.response.data.error;
                            } else if (err.response.data.errors && typeof err.response.data.errors === 'object') {
                                const errors = Object.values(err.response.data.errors).flat();
                                errorMsg = errors.join(', ');
                            }
                        } else if (err.response.statusText && typeof err.response.statusText === 'string') {
                            errorMsg = err.response.statusText;
                        }
                    }
                    // Check for request object (network error)
                    else if (err.request) {
                        errorMsg = 'Network error. Please check your connection.';
                    }
                    // Check for message property
                    else if (err.message && typeof err.message === 'string') {
                        errorMsg = err.message;
                    }
                }
                
                this.$bvToast.toast(errorMsg, {
                    title: 'Error',
                    variant: 'danger',
                    solid: true,
                });
            }
            
            this.addingMember = false;
        },

        resetAddMemberForm() {
            this.addMemberForm = {
                challengeId: null,
                memberId: null,
                progress: 0,
                status: 'Active'
            };
            this.addMemberValidation = {
                challengeId: null,
                memberId: null
            };
        },


    },
    computed: {
        challengeOptions() {
            return [
                { value: null, text: "All Challenges" },
                ...this.challenges.map((c) => ({ value: c.id, text: c.name })),
            ];
        },
        filteredParticipants() {
            if (!this.selectedChallengeFilter) {
                return this.participants;
            }
            return this.participants.filter(
                (p) => p.challenge_id === this.selectedChallengeFilter
            );
        },
        filteredLeaderboard() {
            // Use calculated leaderboard instead of static data
            return this.calculatedLeaderboard;
        },
        totalParticipants() {
            return this.participants.length;
        },
        isAddMemberFormValid() {
            return this.addMemberForm.challengeId && 
                   this.addMemberForm.memberId && 
                   this.addMemberForm.status;
        },
        averageCompletionRate() {
            if (this.participants.length === 0) return 0;
            const completed = this.participants.filter(
                (p) => p.status === "Completed" || (p.progress >= 100)
            ).length;
            return (
                Math.round((completed / this.participants.length) * 100) || 0
            );
        },
        isFormValid() {
            const baseValidation = (
                this.validation.name === true &&
                this.validation.goal === true &&
                this.validation.reward === true &&
                this.validation.description === true &&
                this.validation.startDate === true &&
                this.validation.endDate === true &&
                this.validation.participationFee === true &&
                this.validation.rules === true
            );

            // If enrollment is allowed, maxParticipants is required
            if (this.newChallenge.allowEnrollment) {
                return baseValidation && this.validation.maxParticipants === true;
            }

            return baseValidation;
        },
        isRewardFormValid() {
            return (
                this.rewardValidation.name === true &&
                this.rewardValidation.description === true &&
                this.rewardValidation.points === true &&
                this.rewardValidation.category === true
            );
        },
        isEditRewardFormValid() {
            return (
                this.editRewardValidation.name === true &&
                this.editRewardValidation.description === true &&
                this.editRewardValidation.points === true &&
                this.editRewardValidation.category === true
            );
        },
        isCurrentStepValid() {
            switch (this.currentStep) {
                case 1:
                    return (
                        this.validation.name === true &&
                        this.validation.goal === true &&
                        this.validation.reward === true
                    );
                case 2:
                    return (
                        this.validation.description === true &&
                        this.validation.startDate === true &&
                        this.validation.endDate === true &&
                        this.validation.participationFee === true
                    );
                case 3:
                    const baseValidation = this.validation.rules === true;
                    if (this.newChallenge.allowEnrollment) {
                        return baseValidation && this.validation.maxParticipants === true;
                    }
                    return baseValidation;
                default:
                    return false;
            }
        },
        isEditFormValid() {
            const baseValidation = (
                this.editValidation.name === true &&
                this.editValidation.goal === true &&
                this.editValidation.reward === true &&
                this.editValidation.description === true &&
                this.editValidation.startDate === true &&
                this.editValidation.endDate === true &&
                this.editValidation.participationFee === true &&
                this.editValidation.rules === true
            );

            // If enrollment is allowed, maxParticipants is required
            if (this.editingChallenge.allowEnrollment) {
                return baseValidation && this.editValidation.maxParticipants === true;
            }

            return baseValidation;
        },
        isCurrentEditStepValid() {
            switch (this.currentEditStep) {
                case 1:
                    return (
                        this.editValidation.name === true &&
                        // this.editValidation.duration === true &&
                        this.editValidation.goal === true &&
                        this.editValidation.reward === true
                    );
                case 2:
                    return (
                        this.editValidation.description === true &&
                        this.editValidation.startDate === true &&
                        this.editValidation.endDate === true &&
                        this.editValidation.participationFee === true
                    );
                case 3:
                    const baseValidation = this.editValidation.rules === true;
                    if (this.editingChallenge.allowEnrollment) {
                        return baseValidation && this.editValidation.maxParticipants === true;
                    }
                    return baseValidation;
                default:
                    return false;
            }
        },
        rewardOptions() {
            return this.rewards
                .filter(reward => reward.status === 'Active')
                .map(reward => ({
                    value: reward.id,
                    text: `${reward.name} (${reward.points} pts)`
                }));
        },
        challengesWithRemainingDays() {
            return this.challenges.map(challenge => {
                let remaining = 0;
                if (challenge.endDate && challenge.startDate) {
                    const end = new Date(challenge.endDate);
                    const start = new Date(challenge.startDate);
                    remaining = Math.max(0, Math.ceil((end - new Date()) / (1000 * 60 * 60 * 24)));
                }
                return {
                    ...challenge,
                    remainingDays: remaining,
                    participants: challenge.participants_count || 0
                };
            });
        },
        // Calculate leaderboard from participants data
        calculatedLeaderboard() {
            if (!this.selectedLeaderboardChallenge) {
                // All challenges leaderboard - aggregate by member
                const memberStats = {};
                
                this.participants.forEach(participant => {
                    const memberId = participant.memberId || participant.member_id;
                    if (!memberStats[memberId]) {
                        memberStats[memberId] = {
                            id: memberId,
                            name: participant.name,
                            points: 0,
                            progress: 0,
                            challenges: [],
                            achievements: []
                        };
                    }
                    // Use progress as points (or you can calculate based on your business logic)
                    memberStats[memberId].points += participant.progress || 0;
                    memberStats[memberId].challenges.push(participant.challengeId);
                    
                    // Add achievements based on progress
                    if (participant.progress >= 100) {
                        memberStats[memberId].achievements.push('Completed');
                    }
                    if (participant.progress >= 90) {
                        memberStats[memberId].achievements.push('Almost There');
                    }
                    if (participant.progress >= 75) {
                        memberStats[memberId].achievements.push('Consistent');
                    }
                });
                
                // Convert to array and sort by points
                return Object.values(memberStats)
                    .sort((a, b) => b.points - a.points)
                    .map((member, index) => {
                        // Calculate level inline
                        let level = 'Bronze';
                        if (member.points >= 1000) level = 'Gold';
                        else if (member.points >= 500) level = 'Silver';
                        
                        return {
                            ...member,
                            rank: index + 1,
                            level: level,
                            challengeId: member.challenges[0] // Use first challenge for display
                        };
                    });
            } else {
                // Filter by selected challenge
                const challengeParticipants = this.participants
                    .filter(p => p.challengeId === this.selectedLeaderboardChallenge || p.challenge_id === this.selectedLeaderboardChallenge)
                    .sort((a, b) => (b.progress || 0) - (a.progress || 0))
                    .map((participant, index) => {
                        const achievements = [];
                        if (participant.progress >= 100) achievements.push('Completed');
                        if (participant.progress >= 90) achievements.push('Almost There');
                        if (participant.progress >= 75) achievements.push('Consistent');
                        
                        // Calculate level inline
                        const points = participant.progress || 0;
                        let level = 'Bronze';
                        if (points >= 1000) level = 'Gold';
                        else if (points >= 500) level = 'Silver';
                        
                        return {
                            id: participant.id,
                            rank: index + 1,
                            name: participant.name,
                            points: points,
                            challengeId: participant.challengeId || participant.challenge_id,
                            achievements: achievements.length > 0 ? achievements : ['Participant'],
                            level: level
                        };
                    });
                
                return challengeParticipants;
            }
        },
        // Get top challenges by participant count
        topChallenges() {
            return this.challenges
                .filter(c => c.participants_count > 0)
                .sort((a, b) => (b.participants_count || 0) - (a.participants_count || 0))
                .slice(0, 5)
                .map(challenge => ({
                    id: challenge.id,
                    name: challenge.name,
                    participants: challenge.participants_count || 0
                }));
        },
        // Calculate completed challenges
        completedChallenges() {
            const now = new Date();
            return this.challenges.filter(challenge => {
                // Challenge is completed if status is Completed or end date has passed
                return challenge.status === 'Completed' || 
                       (challenge.endDate && new Date(challenge.endDate) < now);
            }).length;
        },
        // Generate recent activities from participants and challenges
        generatedRecentActivities() {
            const activities = [];
            const now = new Date();
            
            // Get recent participant activities
            const recentParticipants = [...this.participants]
                .sort((a, b) => {
                    const dateA = a.lastActivity && a.lastActivity !== 'N/A' ? new Date(a.lastActivity) : new Date(0);
                    const dateB = b.lastActivity && b.lastActivity !== 'N/A' ? new Date(b.lastActivity) : new Date(0);
                    return dateB - dateA;
                })
                .slice(0, 10);
            
            recentParticipants.forEach(participant => {
                if (participant.lastActivity && participant.lastActivity !== 'N/A') {
                    const activityDate = new Date(participant.lastActivity);
                    const timeDiff = now - activityDate;
                    const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
                    const daysAgo = Math.floor(hoursAgo / 24);
                    
                    let timeText = '';
                    if (hoursAgo < 1) {
                        timeText = 'Just now';
                    } else if (hoursAgo < 24) {
                        timeText = `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
                    } else {
                        timeText = `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
                    }
                    
                    const challenge = this.challenges.find(c => c.id === (participant.challengeId || participant.challenge_id));
                    const challengeName = challenge ? challenge.name : 'Challenge';
                    
                    if (participant.progress >= 100) {
                        activities.push({
                            id: `completed-${participant.id}`,
                            time: timeText,
                            message: `${participant.name} completed ${challengeName}`
                        });
                    } else if (participant.progress >= 90) {
                        activities.push({
                            id: `progress-${participant.id}`,
                            time: timeText,
                            message: `${participant.name} achieved ${participant.progress}% progress in ${challengeName}`
                        });
                    }
                }
            });
            
            // Get recent challenge creations
            const recentChallenges = [...this.challenges]
                .sort((a, b) => {
                    const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
                    const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
                    return dateB - dateA;
                })
                .slice(0, 3);
            
            recentChallenges.forEach(challenge => {
                if (challenge.created_at) {
                    const activityDate = new Date(challenge.created_at);
                    const timeDiff = now - activityDate;
                    const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
                    const daysAgo = Math.floor(hoursAgo / 24);
                    
                    let timeText = '';
                    if (hoursAgo < 24) {
                        timeText = `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
                    } else {
                        timeText = `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
                    }
                    
                    activities.push({
                        id: `challenge-${challenge.id}`,
                        time: timeText,
                        message: `New challenge "${challenge.name}" created with ${challenge.participants_count || 0} participants`
                    });
                }
            });
            
            // Sort all activities by time and return top 10
            return activities
                .sort((a, b) => {
                    // Simple sort by time text (could be improved)
                    return a.time.localeCompare(b.time);
                })
                .slice(0, 10);
        },
        onModalShow() {
            // Reset validation states when modal opens
            this.addMemberValidation = {
                challengeId: null,
                memberId: null
            };
        },

        // Helper method to get level from points
        getLevelFromPoints(points) {
            if (points >= 1000) return 'Gold';
            if (points >= 500) return 'Silver';
            return 'Bronze';
        },

        // Validation methods
        validateChallengeSelection() {
            this.addMemberValidation.challengeId = this.addMemberForm.challengeId ? true : false;
        },

        validateMemberSelection() {
            this.addMemberValidation.memberId = this.addMemberForm.memberId ? true : false;
        },
    },
    created() {
        // Ensure modal is closed when component is created
        this.showAddMemberModal = false;
    },
    mounted() {
        this.setActiveTabFromRoute();
        this.fetchRewards(); // Load rewards from API when component mounts
        this.fetchChallenges(); // Load challenges from API when component mounts
        this.fetchChallengeParticipants(); // Load participants from API when component mounts
    },
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

.challenges-page {
    background-color: $color-background;
    min-height: 100vh;
    padding: 2rem 0;

    .page-header {
        background: linear-gradient(to bottom, #23415a, #0f1c29);
        border-radius: 15px;
        padding: 1rem;
        margin-bottom: 1rem;
        box-shadow: $shadow-lg;
        color: $color-white;
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
                rgba(255, 255, 255, 0.1) 0%,
                transparent 70%
            );
            animation: float 6s ease-in-out infinite;
        }

        .page-title {
            font-family: $font-family-base;
            font-weight: 700;
            font-size: $font-size-xxl;
            margin-bottom: 0.5rem;
            position: relative;
            z-index: 2;
            color: $color-white;
        }

        .page-subtitle {
            font-size: $font-size-md;
            opacity: 0.9;
            margin-bottom: 1rem;
            position: relative;
            z-index: 2;
            color: $color-white;
        }

        .create-btn {
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            position: relative;
            z-index: 2;

            &:hover {
                background: rgba(255, 255, 255, 0.3);
                border-color: rgba(255, 255, 255, 0.5);
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            }
        }
    }

    .tab-navigation {
        display: flex;

        .tab-container {
            display: flex;
            padding: 2px;
            background: linear-gradient(to bottom, #23415a, #0f1c29);
            border-radius: 10px;
        }

        .tab-button {
            background: none;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            font-weight: 600;
            color: $color-white;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            white-space: nowrap;

            &:hover {
                color: $color-white;
                transform: translateY(-2px);
                box-shadow: $shadow-md;
            }

            &.active {
                background: linear-gradient(to bottom, #23415a, #0f1c29);
                color: $color-white;
                box-shadow: $shadow-lg;
            }

            i {
                font-size: $font-size-sm;
            }
        }
    }

    .tab-content-container {
        position: relative;
        overflow: hidden;
    }

    .tab-content {
        animation: slideIn 0.5s ease-out;
        position: relative;
        z-index: 2;

        // Section headers styling
        h4 {
            font-family: $font-family-base;
            font-weight: 700;
            font-size: $font-size-xl;
            color: #252525;
            margin-bottom: 1.5rem;
            position: relative;
            padding-bottom: 0.5rem;

            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 60px;
                height: 3px;
                background: linear-gradient(
                    90deg,
                    $color-button 0%,
                    color.adjust($color-button, $lightness: 20%) 100%
                );
                border-radius: 2px;
            }
        }

        // Stats cards enhancement
        .card {
            border: none;
            border-radius: 15px;
            box-shadow: $shadow-sm;
            transition: all 0.3s ease;
            overflow: hidden;
            position: relative;

            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                // background: linear-gradient(
                //     90deg,
                //     $color-button 0%,
                //     color.adjust($color-button, $lightness: 30%) 100%
                // );
            }

            &:hover {
                transform: translateY(-5px);
                box-shadow: $shadow-lg;
            }

            h3 {
                font-size: $font-size-xxl;
                font-weight: 800;
                margin-bottom: 0.5rem;
                color: #fff;
            }

            p {
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-size: $font-size-xs;
                opacity: 0.9;
            }
        }

        // Table enhancements
        .table-responsive {
            border-radius: 8px;
            // overflow: hidden;
            box-shadow: $shadow-sm;
            border: 1px solid $color-border-muted;
        }

        // Filter controls styling
        .form-control,
        .custom-select {
            border-radius: 8px;
            border: 2px solid $color-border-muted;
            transition: all 0.3s ease;
            background: $color-input-bg !important;

            &:focus {
                border-color: $color-button;
                box-shadow: 0 0 0 0.2rem rgba($color-button, 0.25);
                background: color.adjust($color-card-bg, $lightness: 1%);
            }
        }

        // Custom badge styling
        .custom-badge {
            display: inline-block;
            padding: 8px;
            border-radius: 20px;
            font-weight: 600;
            font-size: $font-size-xs;
            // text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: $shadow-sm;
            border: none;
            transition: all 0.3s ease;
            color: $color-white;
            text-decoration: none;

            &:hover {
                transform: translateY(-2px);
                box-shadow: $shadow-md;
            }

            &.badge-active {
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                color: $color-white;
            }

            &.badge-completed {
                background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
                color: $color-white;
            }

            &.badge-inactive {
                background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
                color: $color-white;
            }

            &.badge-info {
                background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
                color: $color-white;
            }

            &.badge-warning {
                background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%);
                color: #212529;
            }

            &.badge-primary {
                background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
                color: $color-white;
            }

            &.badge-secondary {
                background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
                color: $color-white;
            }

            &.badge-points {
                background: linear-gradient(135deg, #fd7e14 0%, #e55a00 100%);
                color: $color-white;
            }

            &.badge-achievement {
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                color: $color-white;
                font-size: 0.7rem;
                padding: 0.25rem 0.5rem;
            }

            &.badge-reward {
                background: linear-gradient(135deg, #e83e8c 0%, #d63384 100%);
                color: $color-white;
                font-size: 0.75rem;
                padding: 0.4rem 0.8rem;
            }

            &.badge-participants {
                background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
                color: $color-white;
                font-size: 0.75rem;
                padding: 0.4rem 0.8rem;
            }
        }

        // Progress bar enhancements
        .progress {
            height: 30px;
            border-radius: 15px;
            background: color.adjust($color-border-muted, $lightness: 5%);
            overflow: hidden;
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

            .progress-bar {
                border-radius: 15px;
                background: linear-gradient(
                    90deg,
                    $color-success 0%,
                    color.adjust($color-success, $lightness: 15%) 100%
                );
                transition: width 0.8s ease;
                position: relative;

                &::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(
                        90deg,
                        transparent 0%,
                        rgba(255, 255, 255, 0.3) 50%,
                        transparent 100%
                    );
                    animation: shimmer 2s infinite;
                }
            }
        }

        // List group enhancements
        .list-group {
            border-radius: 12px;
            overflow: hidden;
            box-shadow: $shadow-sm;

            .list-group-item {
                border: none;
                border-bottom: 1px solid $color-border-muted;
                padding: 1rem 1.5rem;
                background: $color-card-bg;
                transition: all 0.3s ease;

                &:last-child {
                    border-bottom: none;
                }

                &:hover {
                    background: color.adjust($color-background, $lightness: 2%);
                    transform: translateX(5px);
                }
            }
        }

        // Activity feed styling
        .border-bottom {
            border-color: $color-border-muted !important;
            padding: 1rem 0;

            small {
                color: $color-muted;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-size: $font-size-xs;
            }

            div {
                color: #252525;
                font-weight: 500;
                margin-top: 0.25rem;
            }
        }
    }

    .stats-card {
        background: linear-gradient(
            135deg,
            $color-card-bg 0%,
            color.adjust($color-card-bg, $lightness: 2%) 100%
        );
        border: none;
        border-radius: 15px;
        padding: 1.5rem;
        box-shadow: $shadow-sm;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: $color-button;
        }

        &:hover {
            transform: translateY(-5px);
            box-shadow: $shadow-lg;
        }

        h3 {
            font-size: $font-size-xl;
            font-weight: 700;
            color: $color-button;
            margin-bottom: 0.5rem;
        }

        p {
            color: $color-muted;
            margin: 0;
            font-size: $font-size-sm;
        }
    }

    // Global table styling for all tables in this component
    ::v-deep .table {
        color: #252525 !important;

        th {
            color: #252525 !important;
        }

        td {
            color: #252525 !important;
        }

        tbody tr {
            color: #252525 !important;
        }
    }

    // Bootstrap table specific styling
    ::v-deep .b-table {
        color: #252525 !important;

        .table {
            color: #252525 !important;

            th {
                color: #252525 !important;
            }

            td {
                color: #252525 !important;
                padding: 1rem;
            }

            tbody tr {
                color: #252525 !important;
            }
        }
    }

    .table-container {
        background: $color-card-bg;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: $shadow-sm;
        border: 1px solid $color-border-muted;
        color: #252525 !important;

        .table {
            margin: 0;
            color: #252525 !important;

            th {
                background: linear-gradient(
                    135deg,
                    $color-button 0%,
                    color.adjust($color-button, $lightness: -5%) 100%
                );
                color: #252525 !important;
                border: none;
                padding: 1rem;
                font-weight: 600;
                text-transform: uppercase;
                font-size: $font-size-xs;
                letter-spacing: 0.5px;
                text-align: center;

                // Specific styling for action column headers
                &:last-child {
                    text-align: center !important;
                    padding: 1rem;
                }
            }

            td {
                padding: 1rem;
                border-color: $color-border-muted;
                vertical-align: middle;

                // Specific styling for action column cells
                &:last-child {
                    text-align: center !important;
                    vertical-align: middle;
                    padding: 0.5rem 1rem;
                    white-space: nowrap;
                }
            }

            tbody tr {
                transition: all 0.3s ease;
                color: #252525 !important;

                &:hover {
                    background: color.adjust($color-background, $lightness: 2%);
                    transform: scale(1.01);
                }
            }
        }
    }

    .progress-custom {
        height: 8px;
        border-radius: 10px;
        background: $color-border-muted;

        .progress-bar {
            border-radius: 10px;
            background: linear-gradient(
                90deg,
                $color-success 0%,
                color.adjust($color-success, $lightness: 10%) 100%
            );
            transition: width 0.6s ease;
        }
    }

    .badge-custom {
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 600;
        font-size: $font-size-xs;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .btn-custom {
        border-radius: 8px;
        padding: 0.5rem 1rem;
        font-weight: 600;
        font-size: $font-size-sm;
        transition: all 0.3s ease;
        border: 2px solid transparent;

        &:hover {
            transform: translateY(-2px);
            box-shadow: $shadow-md;
        }

        &.btn-outline-info {
            color: $color-info;
            border-color: $color-info;

            &:hover {
                background: $color-info;
                color: $color-white;
            }
        }

        &.btn-outline-warning {
            color: $color-warning;
            border-color: $color-warning;

            &:hover {
                background: $color-warning;
                color: $color-white;
            }
        }

        &.btn-outline-danger {
            color: $color-danger;
            border-color: $color-danger;

            &:hover {
                background: $color-danger;
                color: $color-white;
            }
        }

        &.btn-outline-success {
            color: $color-success;
            border-color: $color-success;

            &:hover {
                background: $color-success;
                color: $color-white;
            }
        }
    }

    // Action buttons styling (like Meals page)
    .action-buttons {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 0 auto;
    }

    // Action section container
    .action-section {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    // Main action button (Create New Challenge)
    .action-section .action-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.875rem;
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
        gap: 0.5rem;
        
        i {
            font-size: 0.875rem;
        }
        
        &:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
    }

    // Small action buttons (table icons)
    .action-buttons .action-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.875rem;
        flex-shrink: 0;
        margin: 0;

        &.view-btn {
            background: #e3f2fd;
            color: #1976d2;

            &:hover {
                background: #bbdefb;
                transform: scale(1.05);
            }
        }

        &.edit-btn {
            background: #fff3e0;
            color: #f57c00;

            &:hover {
                background: #ffe0b2;
                transform: scale(1.05);
            }
        }

        &.delete-btn {
            background: #ffebee;
            color: #d32f2f;

            &:hover {
                background: #ffcdd2;
                transform: scale(1.05);
            }
        }

        &.message-btn {
            background: #e8f5e8;
            color: #2e7d32;

            &:hover {
                background: #c8e6c9;
                transform: scale(1.05);
            }
        }

        &.profile-btn {
            background: #f3e5f5;
            color: #7b1fa2;

            &:hover {
                background: #e1bee7;
                transform: scale(1.05);
            }
        }

        &:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }
    }

    // Challenge name link styling
    .challenge-name-link {
        color: $color-button;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
        text-decoration: none;
        display: inline-block;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        margin: -0.25rem -0.5rem;

        &:hover {
            color: color.adjust($color-button, $lightness: -15%);
            background-color: rgba($color-button, 0.1);
            text-decoration: none;
            transform: translateY(-1px);
        }

        &:active {
            transform: translateY(0);
        }
    }

    // Override Bootstrap table defaults for action column
    ::v-deep .b-table {
        .table {
            th:last-child,
            td:last-child {
                text-align: center !important;
            }
        }
    }

    // Bootstrap Vue Modal styling
    ::v-deep .modal-content {
        border-radius: 15px;
        border: none;
        box-shadow: $shadow-lg;

        .modal-header {
            background: linear-gradient(
                135deg,
                $color-button 0%,
                color.adjust($color-button, $lightness: -10%) 100%
            );
            color: $color-white;
            border-radius: 15px 15px 0 0;
            border: none;

            .modal-title {
                font-weight: 600;
            }
        }

        .modal-body {
            padding: 2rem;
            color: #252525 !important;

            .form-group {
                label {
                    color: #252525 !important;
                    font-weight: 600;
                }
            }

            .form-control {
                color: #252525 !important;
                border-radius: 8px;
                border: 2px solid $color-border-muted;
                padding: 0.5rem 1rem;
                transition: all 0.3s ease;

                &:focus {
                    border-color: $color-button;
                    box-shadow: 0 0 0 0.2rem rgba($color-button, 0.25);
                }

                &::placeholder {
                    color: #6c757d;
                }
            }

            .form-textarea {
                color: #252525 !important;
            }

            // Target Bootstrap Vue specific classes
            .b-form-group {
                label {
                    color: #252525 !important;
                    font-weight: 600;
                }
            }

            .b-form-input {
                color: #252525 !important;
            }

            .b-form-textarea {
                color: #252525 !important;
            }
        }
    }

    .activity-item {
        padding: 1rem;
        border-left: 3px solid $color-button;
        margin-bottom: 1rem;
        background: color.adjust($color-background, $lightness: 1%);
        border-radius: 0 8px 8px 0;
        transition: all 0.3s ease;

        &:hover {
            background: color.adjust($color-background, $lightness: 3%);
            transform: translateX(5px);
        }

        .activity-time {
            color: $color-muted;
            font-size: $font-size-xs;
            font-weight: 600;
        }

        .activity-message {
            color: $color-text-dark;
            font-weight: 500;
            margin-top: 0.25rem;
        }
    }

    .challenge-card {
        background: $color-card-bg;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        box-shadow: $shadow-sm;
        border: 1px solid $color-border-muted;
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-3px);
            box-shadow: $shadow-md;
        }
    }
}

@keyframes float {
    0%,
    100% {
        transform: translateY(0px) rotate(0deg);
    }
    50% {
        transform: translateY(-20px) rotate(180deg);
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

// Responsive adjustments
@media (max-width: $breakpoint-md) {
    .challenges-page {
        padding: 1rem 0;

        .page-header {
            padding: 1rem;
            margin-bottom: 1rem;
        }

        .tab-navigation {
            padding: 0.5rem;
            .tab-container {
                gap: 0.5rem;
                padding: 0.25rem;
            }
            .tab-button {
                padding: 0.5rem 1rem;
                font-size: $font-size-sm;
                i {
                    font-size: $font-size-xs;
                }
            }
        }

        .tab-content-container {
            padding: 1rem;
        }
    }
}

b-modal .modal-text,
b-form .modal-text,
b-form-group .modal-text,
b-form-input .modal-text,
b-form-textarea .modal-text {
    color: #252525 !important;
}

// Custom modal sizing
::v-deep .challenge-create-modal,
::v-deep .challenge-edit-modal {
    .modal-dialog {
        max-width: 90% !important;
        width: 90% !important;
        margin: 1.75rem auto;
    }
    
    .modal-content {
        min-width: 800px;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .modal-body {
        max-height: 70vh;
        overflow-y: auto;
    }
}

// Force larger modal for all xl modals
::v-deep .modal-xl {
    .modal-dialog {
        max-width: 90% !important;
        width: 90% !important;
    }
    
    .modal-content {
        min-width: 800px;
        max-width: 1200px;
    }
}

// Step-by-step form styling
.form-progress {
    .progress-steps {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2rem;
        
        .step {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            
            .step-number {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #e9ecef;
                color: #6c757d;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 16px;
                transition: all 0.3s ease;
                border: 3px solid #e9ecef;
            }
            
            .step-label {
                margin-top: 0.5rem;
                font-size: 12px;
                font-weight: 600;
                color: #6c757d;
                text-align: center;
                transition: all 0.3s ease;
            }
            
            &.active {
                .step-number {
                    background: $color-button;
                    color: white;
                    border-color: $color-button;
                    box-shadow: 0 0 0 3px rgba($color-button, 0.2);
                }
                
                .step-label {
                    color: $color-button;
                }
            }
            
            &.completed {
                .step-number {
                    background: #28a745;
                    color: white;
                    border-color: #28a745;
                }
                
                .step-label {
                    color: #28a745;
                }
            }
        }
        
        .step-line {
            width: 60px;
            height: 2px;
            background: #e9ecef;
            margin: 0 1rem;
            transition: all 0.3s ease;
            
            &.completed {
                background: #28a745;
            }
        }
    }
}

.form-step {
    animation: fadeIn 0.3s ease-in-out;
    
    .step-header {
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #f8f9fa;
        
        h5 {
            color: #252525;
            font-weight: 700;
            margin-bottom: 0.5rem;
            
            i {
                margin-right: 0.5rem;
            }
        }
        
        p {
            margin-bottom: 0;
            font-size: 14px;
        }
    }
}

.form-navigation {
    padding-top: 2rem;
    border-top: 2px solid #f8f9fa;
    
    .nav-btn {
        padding: 0.5rem 1rem;
        font-weight: 600;
        border-radius: 8px;
        transition: all 0.3s ease;
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: $shadow-md;
        }
        
        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }
    
    .step-indicator {
        background: linear-gradient(135deg, $color-button 0%, color.adjust($color-button, $lightness: 10%) 100%);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 600;
        font-size: 14px;
        box-shadow: $shadow-sm;
    }
}

.enrollment-section {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 12px;
    margin: 1.5rem 0;
    border-left: 4px solid $color-button;
    
    h6 {
        color: #252525;
        font-weight: 700;
        margin-bottom: 1rem;
        
        i {
            margin-right: 0.5rem;
            color: $color-button;
        }
    }
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
</style>
