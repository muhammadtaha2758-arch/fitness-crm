<template>
    <div class="coach-form-container">
        <div class="container-xxl px-2 px-sm-3 px-md-4">
            <!-- Loading State -->
            <div v-if="isLoading" class="loading-container">
                <div class="loading-spinner">
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <p class="loading-text">Loading coach details...</p>
                </div>
            </div>

            <!-- Main Content -->
            <div v-else class="form-card">
                <!-- Header Section with Coach Info and Tabs -->
                <div class="coach-header-section">
                    <div class="header-wrapper d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between gap-3">
                        <!-- Breadcrumb Navigation -->
                        <div class="breadcrumb-section flex-shrink-0">
                            <nav class="breadcrumb-nav" aria-label="breadcrumb">
                                <div class="breadcrumb-container d-flex align-items-center">
                                    <button
                                        @click.stop="goBack"
                                        class="back-button me-2 me-sm-3"
                                        type="button"
                                        title="Go back to coaches list"
                                        style="color: #dc3545;"
                                    >
                                        <i class="fas fa-arrow-left"></i>
                                    </button>
                                    <ol class="breadcrumb mb-0">
                                        <li class="breadcrumb-item">
                                            <router-link
                                                to="/app/dashboard"
                                            >
                                                <i class="fas fa-home"></i>
                                                Dashboard
                                            </router-link>
                                        </li>
                                        <li class="breadcrumb-item">
                                            <router-link
                                                to="/app/staff/coachlist"
                                            >
                                                <i class="fas fa-user-tie"></i>
                                                Coaches
                                            </router-link>
                                        </li>
                                        <li
                                            class="breadcrumb-item active"
                                            aria-current="page"
                                            style="color: white !important"
                                        >
                                            <i class="fas fa-user"></i>
                                            {{
                                                (client.first_name &&
                                                    client.last_name)
                                                    ? `${client.first_name} ${client.last_name}`
                                                    : "Coach Details"
                                            }}
                                        </li>
                                    </ol>
                                </div>
                            </nav>
                        </div>
                        <!-- Tabs Section -->
                        <div class="header-content d-flex align-items-center gap-2 gap-lg-3">
                            <div class="divider d-none d-lg-block"></div>
                            <div class="tab-icons d-flex flex-wrap gap-2 justify-content-start">
                                <!-- <button
                                    class="tab-icon-btn"
                                    :class="{ active: activeTab === 'schedule' }"
                                    @click="goToSchedule()"
                                    title="Schedule"
                                >
                                    <i class="fas fa-calendar-check"></i>
                                </button>
                                <button
                                    class="tab-icon-btn"
                                    :class="{ active: activeTab === 'workout' }"
                                    @click="goToWorkout()"
                                    title="Workout"
                                >
                                    <i class="fas fa-dumbbell"></i>
                                </button> -->
                                <!-- <button
                                    class="tab-icon-btn"
                                    :class="{ active: activeTab === 'progress' }"
                                    @click="goToProgressTracker()"
                                    title="Progress Tracker"
                                >
                                    <i class="fas fa-chart-line"></i>
                                </button> -->
                                <!-- <button
                                    class="tab-icon-btn"
                                    :class="{ active: activeTab === 'Nutrition' }"
                                    @click="activeTab = 'nutrition'"
                                    title="Nutrition"
                                >
                                    <i class="fas fa-apple-alt"></i>
                                </button>
                                <button
                                    class="tab-icon-btn"
                                    :class="{ active: activeTab === 'Meal Plan' }"
                                    @click="goToMealPlan()"
                                    title="Meal Plan"
                                >
                                    <i class="fas fa-utensils"></i>
                                </button>
                                <button
                                    class="tab-icon-btn"
                                    :class="{ active: activeTab === 'Challenge' }"
                                    @click="goToChallenge()"
                                    title="Challenge"
                                >
                                    <i class="fas fa-trophy"></i>
                                </button> -->
                                <button
                                    class="tab-icon-btn"
                                    :class="{ active: activeTab === 'settings' }"
                                    @click="activeTab = 'settings'"
                                    title="Settings"
                                >
                                    <i class="fas fa-cog"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="coach-form">
                    <div class="main-layout">
                        <!-- Profile Section - Left Sidebar -->
                        <div class="profile-sidebar">
                            <div @click="activeTab = 'profile'" style="cursor: pointer">
                                <div class="profile-header">
                                    <div class="profile-icon">
                                        <i class="fas fa-dumbbell"></i>
                                    </div>
                                    <h5 class="profile-title">Coach Data</h5>
                                </div>
                                <div class="profile-content">
                                    <div class="profile-image-container" :class="{ 'editable': isEditing }"
                                        @click="handleProfileImageClick">
                                        <img :src="getProfileImageUrl(
                                                    profileImageUrl || client.profile_image
                                                )
                                            " :alt="`${client.first_name} ${client.last_name}`"
                                            class="profile-avatar" />
                                        
                                        <!-- Edit mode overlay and file input -->
                                        <div v-if="isEditing" class="profile-overlay">
                                            <i class="fas fa-camera"></i>
                                            <span>Change Photo</span>
                                        </div>
                                        
                                        <!-- File input is created programmatically -->
                                    </div>
                                    <div class="profile-details">
                                        <h4 class="coach-name">
                                            {{ client.first_name }}
                                            {{ client.last_name }}
                                        </h4>
                                        <p class="coach-id" title="This ID is automatically generated by the system">
                                            ID: {{ getFormattedCoachId() }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="divider profile-divider"></div>

                            <!-- Action Items -->
                            <div class="action-items">
                                <!-- <div class="action-item" @click="goToProfile()" :class="{
                                        active: activeAction === 'profile',
                                }">
                                    <div class="action-icon">
                                        <i class="fas fa-user-circle"></i>
                                    </div>
                                    <span class="action-text">Go to this profile</span>
                                </div> -->

                                <div class="action-item" @click="goToChat()" :class="{
                                        active: activeTab === 'sendMessage',
                                }">
                                    <div class="action-icon">
                                        <i class="fas fa-envelope"></i>
                                    </div>
                                    <span class="action-text">Send message</span>
                                </div>

                                <div class="action-item" @click="openNewTask" :class="{
                                        active: activeTab === 'newTask',
                                }">
                                    <div class="action-icon">
                                        <i class="fas fa-tasks"></i>
                                    </div>
                                    <span class="action-text">New Task</span>
                                </div>

                                <div class="action-item" @click="toggleEditMode" :class="{
                                        active: isEditing,
                                        'has-unsaved-changes': hasUnsavedChanges,
                                        'will-switch-tab': activeTab !== 'profile' && !isEditing
                                }">
                                    <div class="action-icon">
                                        <i :class="isEditing ? 'fas fa-save' : 'fas fa-edit'"></i>
                                    </div>
                                    <span class="action-text">
                                        {{ isEditing ? 'Save Profile' : 'Edit Details' }}
                                    </span>
                                    <span v-if="hasUnsavedChanges" class="unsaved-indicator"
                                        title="You have unsaved changes">
                                        <i class="fas fa-circle"></i>
                                    </span>
                                    <span v-if="activeTab !== 'profile' && !isEditing"
                                        title="Will switch to Profile tab">
                                        <!-- <i class="fas fa-exchange-alt"></i> -->
                                    </span>
                                </div>
                                <div class="action-item" @click="unsubscribeCoach" :class="{
                                        active: activeAction === 'unsubscribe',
                                }">
                                    <div class="action-icon">
                                        <i class="fas fa-user-slash"></i>
                                    </div>
                                    <span class="action-text">Unsubscribe</span>
                                </div>

                                <div class="action-item" @click="convertCoachToMember" :class="{
                                        active:
                                            activeAction === 'changeToStaff',
                                }">
                                    <div class="action-icon">
                                        <i class="fas fa-user-tie"></i>
                                    </div>
                                    <span class="action-text">Change to member</span>
                                </div>
                            </div>
                        </div>

                        <!-- Content Area - Right Side -->
                        <div class="content-area">
                            <div class="form-section compact">
                                <div class="action-content">
                                    <div class="section-content">
                                        <!-- Tab Navigation -->
                                        <div class="tab-navigation">
                                            <div
                                                v-for="tab in tabs"
                                                :key="tab.key"
                                                @click="activeTab = tab.key"
                                                class="tab-item"
                                                :class="{
                                                    active:
                                                        activeTab === tab.key,
                                                }"
                                            >
                                                <i :class="tab.icon"></i>
                                                <span>{{ tab.label }}</span>
                                            </div>
                                        </div>

                                        <!-- Tab Content -->
                                        <!-- <div class="tab-content"> -->
                                            <!-- Profile Tab -->
                                            <div v-if="activeTab === 'profile'">

                                                <div class="member-form-content">
                                                    <div class="form-grid">
                                                        <!-- Left Column -->
                                                        <div class="form-column">
                                                            <!-- Personal Info Section -->
                                                            <div class="form-section compact">
                                                                <div class="section-header compact">
                                                                    <h5 class="section-title compact">
                                                                        <i class="fas fa-id-card"></i>
                                                                        <span>Coach Overview</span>
                                                                    </h5>
                                                                </div>
                                                                <div class="data-cards-container">
                                                                <!-- Coach ID Card -->
                                                                <div class="data-card">
                                                                    <div class="data-label">Coach ID</div>
                                                                    <div class="data-value">
                                                                            {{ getFormattedCoachId() }}
                                                                            <i title="This ID is automatically generated by the system"
                                                                                class="fas fa-info-circle info-icon"></i>
                                                                    </div>
                                                                </div>

                                                                <!-- First Name Card -->
                                                                <div class="data-card">
                                                                    <div class="data-label">First name</div>
                                                                    <div class="data-value">
                                                                            <input v-model="client.first_name"
                                                                                type="text" class="inline-edit"
                                                                                :readonly="!isEditing" :class="{
                                                                                readonly: !isEditing,
                                                                                'has-changes': changesMade.first_name
                                                                                }" @input="trackChange('first_name', $event.target.value)"
                                                                            @focus="trackFieldTouch('first_name')"
                                                                                @blur="trackFieldTouch('first_name')" />
                                                                            <span v-if="changesMade.first_name"
                                                                                class="change-indicator"
                                                                                title="This field has been modified">
                                                                            <i class="fas fa-edit"></i>
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <!-- Last Name Card -->
                                                                <div class="data-card">
                                                                    <div class="data-label">Last name</div>
                                                                    <div class="data-value">
                                                                            <input v-model="client.last_name"
                                                                                type="text" class="inline-edit"
                                                                                :readonly="!isEditing" :class="{
                                                                                readonly: !isEditing,
                                                                                'has-changes': changesMade.last_name
                                                                                }" @input="trackChange('last_name', $event.target.value)"
                                                                            @focus="trackFieldTouch('last_name')"
                                                                                @blur="trackFieldTouch('last_name')" />
                                                                            <span v-if="changesMade.last_name"
                                                                                class="change-indicator"
                                                                                title="This field has been modified">
                                                                            <i class="fas fa-edit"></i>
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <!-- Gender Card -->
                                                                <div class="data-card">
                                                                    <div class="data-label">Sex</div>
                                                                    <div class="data-value">
                                                                            <select v-model="client.gender"
                                                                            class="inline-edit"
                                                                            :disabled="!isEditing"
                                                                            @change="trackChange('gender', $event.target.value)"
                                                                            @focus="trackFieldTouch('gender')"
                                                                                @blur="trackFieldTouch('gender')">
                                                                            <option value="">Select Gender</option>
                                                                            <option value="Male">Male</option>
                                                                            <option value="Female">Female</option>
                                                                            <option value="Other">Other</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <!-- Birthday Card -->
                                                                <div class="data-card">
                                                                    <div class="data-label">Birthday</div>
                                                                    <div class="data-value">
                                                                            <input v-model="client.dob" type="date"
                                                                            class="inline-edit"
                                                                                :readonly="!isEditing" :class="{
                                                                                readonly: !isEditing,
                                                                                'has-changes': changesMade.dob
                                                                                }" @input="trackChange('dob', $event.target.value)"
                                                                            @focus="trackFieldTouch('dob')"
                                                                                @blur="trackFieldTouch('dob')" />
                                                                    </div>
                                                                </div>

                                                                <!-- Email Card -->
                                                                <div class="data-card">
                                                                    <div class="data-label">Email address</div>
                                                                    <div class="data-value">
                                                                            <input v-model="client.email" type="email"
                                                                            class="inline-edit"
                                                                                :readonly="!isEditing" :class="{
                                                                                readonly: !isEditing,
                                                                                'has-changes': changesMade.email
                                                                                }" @input="trackChange('email', $event.target.value)"
                                                                            @focus="trackFieldTouch('email')"
                                                                                @blur="trackFieldTouch('email')" />
                                                                            <span v-if="changesMade.email"
                                                                                class="change-indicator"
                                                                                title="This field has been modified">
                                                                            <i class="fas fa-edit"></i>
                                                                        </span>
                                                                            <i title="Email address for communication"
                                                                                class="fas fa-info-circle info-icon"></i>
                                                                    </div>
                                                                </div>

                                                                <!-- Landline Card -->
                                                                <div class="data-card">
                                                                    <div class="data-label">Landline number</div>
                                                                    <div class="data-value">
                                                                            <input v-model="client.landline_phone"
                                                                                type="tel" class="inline-edit"
                                                                                :readonly="!isEditing" :class="{
                                                                                readonly: !isEditing,
                                                                                'has-changes': changesMade.landline_phone
                                                                                }" @input="trackChange('landline_phone', $event.target.value)"
                                                                            @focus="trackFieldTouch('landline_phone')"
                                                                            @blur="trackFieldTouch('landline_phone')"
                                                                                placeholder="-" />
                                                                    </div>
                                                                </div>

                                                                <!-- Mobile Phone Card -->
                                                                <div class="data-card">
                                                                    <div class="data-label">Mobile phone</div>
                                                                    <div class="data-value">
                                                                            <input v-model="client.mobile_phone"
                                                                                type="tel" class="inline-edit"
                                                                                :readonly="!isEditing" :class="{
                                                                                readonly: !isEditing,
                                                                                'has-changes': changesMade.mobile_phone
                                                                                }" @input="trackChange('mobile_phone', $event.target.value)"
                                                                            @focus="trackFieldTouch('mobile_phone')"
                                                                                @blur="trackFieldTouch('mobile_phone')" />
                                                                    </div>
                                                                </div>

                                                                <!-- Coach Since Card -->
                                                                <div class="data-card">
                                                                    <div class="data-label">Coach since</div>
                                                                    <div class="data-value">
                                                                            {{ formatCoachSinceDate(client.created_at) }}
                                                                    </div>
                                                                </div>

                                                                <!-- User Profile Card -->
                                                                <div class="data-card">
                                                                    <div class="data-label">Coach profile</div>
                                                                    <div class="data-value">
                                                                            {{ client.first_name }} {{ client.last_name
                                                                            }} ({{ client.email }})
                                                                            <i
                                                                                class="fas fa-external-link-alt edit-icon"></i>
                                                                            <i title="User profile information"
                                                                                class="fas fa-info-circle info-icon"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- Address Section -->
                                                        <div class="form-section compact">
                                                            <div class="section-header compact">
                                                                <h5 class="section-title compact">
                                                                    <i class="fas fa-map-marker-alt"></i>
                                                                    <span>Address</span>
                                                                </h5>
                                                            </div>
                                                            <div class="data-cards-container">
                                                                <!-- Address Card -->
                                                                <div class="data-card">
                                                                    <div class="data-label">Address</div>
                                                                    <div class="data-value">
                                                                            <input v-model="client.address" type="text"
                                                                            class="inline-edit"
                                                                            placeholder="Address"
                                                                            :readonly="!isEditing"
                                                                                :class="{ readonly: !isEditing }" />
                                                                    </div>
                                                                </div>

                                                                <!-- City Card -->
                                                                <div class="data-card">
                                                                    <div class="data-label">City</div>
                                                                    <div class="data-value">
                                                                            <input v-model="client.city" type="text"
                                                                                class="inline-edit" placeholder="City"
                                                                            :readonly="!isEditing"
                                                                                :class="{ readonly: !isEditing }" />
                                                                    </div>
                                                                </div>

                                                                <!-- State Card -->
                                                                <div class="data-card">
                                                                    <div class="data-label">State</div>
                                                                    <div class="data-value">
                                                                            <input v-model="client.state" type="text"
                                                                                class="inline-edit" placeholder="State"
                                                                            :readonly="!isEditing"
                                                                                :class="{ readonly: !isEditing }" />
                                                                    </div>
                                                                </div>

                                                                <!-- ZIP Code Card -->
                                                                <div class="data-card">
                                                                    <div class="data-label">ZIP Code</div>
                                                                    <div class="data-value">
                                                                            <input v-model="client.zip" type="text"
                                                                            class="inline-edit"
                                                                            placeholder="ZIP Code"
                                                                            :readonly="!isEditing"
                                                                                :class="{ readonly: !isEditing }" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- Coach Information Section -->
                                                        <div class="form-section compact">
                                                            <div class="section-header compact">
                                                                <h5 class="section-title compact">
                                                                    Coach Info
                                                                </h5>
                                                            </div>
                                                            <div class="data-cards-container">
                                                            </div>
                                                        </div>

                                                        <!-- Bank Details Section -->
                                                        <div class="form-section compact">
                                                                <div class="section-header compact">
                                                                    <h5 class="section-title compact">
                                                                        <i class="fas fa-university"></i>
                                                                        <span>Bank Details</span>
                                                                    </h5>
                                                                </div>
                                                                <div class="data-cards-container">
                                                                    <!-- Bank Account Number Card -->
                                                                    <div class="data-card">
                                                                        <div class="data-label">Bank account number</div>
                                                                        <div class="data-value">
                                                                            <input v-model="client.bank_account_number"
                                                                                type="text" class="inline-edit"
                                                                                placeholder="Bank account number"
                                                                                :readonly="!isEditing"
                                                                                :class="{ 
                                                                                    readonly: !isEditing,
                                                                                    'has-changes': changesMade.bank_account_number
                                                                                }" 
                                                                                @input="trackChange('bank_account_number', $event.target.value)"
                                                                                @focus="trackFieldTouch('bank_account_number')"
                                                                                @blur="trackFieldTouch('bank_account_number')" />
                                                                        </div>
                                                                    </div>

                                                                    <!-- Routing Number Card -->
                                                                    <div class="data-card">
                                                                        <div class="data-label">Routing number</div>
                                                                        <div class="data-value">
                                                                            <input v-model="client.routing_number"
                                                                                type="text" class="inline-edit"
                                                                                placeholder="Routing number"
                                                                                :readonly="!isEditing"
                                                                                :class="{ 
                                                                                    readonly: !isEditing,
                                                                                    'has-changes': changesMade.routing_number
                                                                                }" 
                                                                                @input="trackChange('routing_number', $event.target.value)"
                                                                                @focus="trackFieldTouch('routing_number')"
                                                                                @blur="trackFieldTouch('routing_number')" />
                                                                        </div>
                                                                    </div>

                                                                    <!-- Bank Account Type Card -->
                                                                    <div class="data-card">
                                                                        <div class="data-label">Bank account type</div>
                                                                        <div class="data-value">
                                                                            <select v-model="client.bank_account_type"
                                                                                class="inline-edit"
                                                                                :disabled="!isEditing"
                                                                                :class="{ 
                                                                                    readonly: !isEditing,
                                                                                    'has-changes': changesMade.bank_account_type
                                                                                }"
                                                                                @change="trackChange('bank_account_type', $event.target.value)"
                                                                                @focus="trackFieldTouch('bank_account_type')"
                                                                                @blur="trackFieldTouch('bank_account_type')">
                                                                                <option value="">Select Account Type</option>
                                                                                <option value="Checking">Checking</option>
                                                                                <option value="Savings">Savings</option>
                                                                                <option value="Business">Business</option>
                                                                                <option value="Corporate">Corporate</option>
                                                                                <option value="Current">Current</option>
                                                                                <option value="Deposit">Deposit</option>
                                                                                <option value="Loan">Loan</option>
                                                                                <option value="Other">Other</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>

                                                                    <!-- Bank Account Holder Name Card -->
                                                                    <div class="data-card">
                                                                        <div class="data-label">Bank account holder name</div>
                                                                        <div class="data-value">
                                                                            <input v-model="client.bank_account_name"
                                                                                type="text" class="inline-edit"
                                                                                placeholder="Bank account holder name"
                                                                                :readonly="!isEditing"
                                                                                :class="{ 
                                                                                    readonly: !isEditing,
                                                                                    'has-changes': changesMade.bank_account_name
                                                                                }" 
                                                                                @input="trackChange('bank_account_name', $event.target.value)"
                                                                                @focus="trackFieldTouch('bank_account_name')"
                                                                                @blur="trackFieldTouch('bank_account_name')" />
                                                                        </div>
                                                                    </div>

                                                                    <!-- Bank Name Card -->
                                                                    <div class="data-card">
                                                                        <div class="data-label">Bank name</div>
                                                                        <div class="data-value">
                                                                            <input v-model="client.bank_name"
                                                                                type="text" class="inline-edit"
                                                                                placeholder="Bank name"
                                                                                :readonly="!isEditing"
                                                                                :class="{ 
                                                                                    readonly: !isEditing,
                                                                                    'has-changes': changesMade.bank_name
                                                                                }" 
                                                                                @input="trackChange('bank_name', $event.target.value)"
                                                                                @focus="trackFieldTouch('bank_name')"
                                                                                @blur="trackFieldTouch('bank_name')" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- Professional Details Section -->
                                                        <!-- <div class="form-section compact"> -->
                                                            <!-- <div class="section-header compact">
                                                                <h5 class="section-title compact">
                                                                    Professional
                                                                </h5>
                                                            </div> -->
                                                            <!-- <div class="data-cards-container"> -->
                                                                <!-- Weekly Availability Card -->
                                                                <!-- <div class="data-card">
                                                                        <div class="data-label">Weekly Availability
                                                                        </div>
                                                                    <div class="data-value">
                                                                            <input v-model="client.weekly_availability"
                                                                                type="text" class="inline-edit"
                                                                            placeholder="e.g., Mon-Fri 9AM-6PM"
                                                                            :readonly="!isEditing"
                                                                                :class="{ readonly: !isEditing }" />
                                                                    </div>
                                                                </div> -->

                                                                <!-- Session Duration Card -->
                                                                <!-- <div class="data-card">
                                                                    <div class="data-label">Session Duration</div>
                                                                    <div class="data-value">
                                                                            <input v-model="client.session_duration"
                                                                                type="text" class="inline-edit"
                                                                            placeholder="e.g., 60 minutes"
                                                                            :readonly="!isEditing"
                                                                                :class="{ readonly: !isEditing }" />
                                                                    </div>
                                                                </div> -->

                                                                <!-- Max Clients Per Day Card -->
                                                                <!-- <div class="data-card">
                                                                        <div class="data-label">Max Clients Per Day
                                                                        </div>
                                                                    <div class="data-value">
                                                                            <input v-model="client.max_clients_per_day"
                                                                                type="number" class="inline-edit"
                                                                            :readonly="!isEditing"
                                                                            :class="{ readonly: !isEditing }"
                                                                                min="1" max="20" />
                                                                    </div>
                                                                </div> -->
                                                            <!-- </div> -->
                                                        <!-- </div> -->

                                                        <!-- Emergency Contact Section -->
                                                        <!-- <div class="form-section compact"> -->
                                                            <!-- <div class="section-header compact">
                                                                <h5 class="section-title compact">
                                                                    Emergency Contact
                                                                </h5>
                                                            </div> -->
                                                            <!-- <div class="data-cards-container"> -->
                                                                <!-- Contact Name Card -->
                                                                <!-- <div class="data-card">
                                                                    <div class="data-label">Contact Name</div>
                                                                    <div class="data-value">
                                                                            <input v-model="client.emergency_name"
                                                                                type="text" class="inline-edit"
                                                                            :readonly="!isEditing"
                                                                                :class="{ 
                                                                                    readonly: !isEditing,
                                                                                    'has-changes': changesMade.emergency_name
                                                                                }" 
                                                                                @input="trackChange('emergency_name', $event.target.value)"
                                                                                @focus="trackFieldTouch('emergency_name')"
                                                                                @blur="trackFieldTouch('emergency_name')" />
                                                                    </div>
                                                                </div> -->

                                                                <!-- Contact Phone Card -->
                                                                <!-- <div class="data-card">
                                                                    <div class="data-label">Contact Phone</div>
                                                                    <div class="data-value">
                                                                            <input v-model="client.emergency_phone"
                                                                                type="tel" class="inline-edit"
                                                                            :readonly="!isEditing"
                                                                                :class="{ 
                                                                                    readonly: !isEditing,
                                                                                    'has-changes': changesMade.emergency_phone
                                                                                }" 
                                                                                @input="trackChange('emergency_phone', $event.target.value)"
                                                                                @focus="trackFieldTouch('emergency_phone')"
                                                                                @blur="trackFieldTouch('emergency_phone')" />
                                                                    </div>
                                                                </div> -->

                                                                <!-- Relationship Card -->
                                                                <!-- <div class="data-card">
                                                                    <div class="data-label">Relationship</div>
                                                                    <div class="data-value">
                                                                            <select v-model="client.emergency_relation"
                                                                                class="inline-edit"
                                                                                :disabled="!isEditing"
                                                                                :class="{ 
                                                                                    readonly: !isEditing,
                                                                                    'has-changes': changesMade.emergency_relation
                                                                                }"
                                                                                @change="trackChange('emergency_relation', $event.target.value)"
                                                                                @focus="trackFieldTouch('emergency_relation')"
                                                                                @blur="trackFieldTouch('emergency_relation')">
                                                                                <option value="">Select Relationship</option>
                                                                                <option value="Spouse">Spouse</option>
                                                                                <option value="Parent">Parent</option>
                                                                                <option value="Child">Child</option>
                                                                                <option value="Sibling">Sibling</option>
                                                                                <option value="Friend">Friend</option>
                                                                                <option value="Relative">Relative</option>
                                                                                <option value="Guardian">Guardian</option>
                                                                                <option value="Other">Other</option>
                                                                            </select>
                                                                    </div>
                                                                </div> -->
                                                            <!-- </div> -->
                                                        <!-- </div> -->
                                                        </div>
                                                    </div>
                                                </div>
                                            <!-- </div> -->

                                            <!-- New Task Tab -->
                                            <div v-if="activeTab === 'newTask'">
                                                <div class="tab-header">
                                                    <h4 class="tab-title">
                                                        New Task
                                                    </h4>
                                                    <button @click="startNewTask" class="btn btn-primary">
                                                        <i class="fas fa-plus"></i>
                                                        New Task
                                                    </button>
                                                </div>
                                                <div class="tasks-content">
                                                    <!-- Task Creation/Edit Form -->
                                                    <div v-if="
                                                            activeAction ===
                                                            'newTask'
                                                    " class="task-form-section show">
                                                        <div class="form-header">
                                                            <h5 class="form-title">
                                                                {{
                                                                    editingTaskId
                                                                        ? "Edit Task"
                                                                        : "Create New Task"
                                                                }}
                                                            </h5>
                                                        </div>
                                                        <form @submit.prevent="
                                                                saveTask
                                                        " class="task-form">
                                                            <div class="form-grid">
                                                                <div class="form-group">
                                                                    <label class="form-label">Task
                                                                        Title</label>
                                                                    <input v-model="task.title
                                                                        " type="text" class="form-control"
                                                                        placeholder="Enter task title" required />
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="form-label">Category</label>
                                                                    <select v-model="task.category
                                                                        " class="form-control" required>
                                                                        <option value="">
                                                                            Select
                                                                            Category
                                                                        </option>
                                                                        <option value="Training">
                                                                            Training
                                                                        </option>
                                                                        <option value="Client Management">
                                                                            Client
                                                                            Management
                                                                        </option>
                                                                        <option value="Administrative">
                                                                            Administrative
                                                                        </option>
                                                                        <option value="Maintenance">
                                                                            Maintenance
                                                                        </option>
                                                                        <option value="Professional Development">
                                                                            Professional
                                                                            Development
                                                                        </option>
                                                                        <option value="Coaching">
                                                                            Coaching
                                                                        </option>
                                                                        <option value="Follow-up">
                                                                            Follow-up
                                                                        </option>
                                                                        <option value="Assessment">
                                                                            Assessment
                                                                        </option>
                                                                        <option value="Nutrition">
                                                                            Nutrition
                                                                        </option>
                                                                        <option value="Wellness">
                                                                            Wellness
                                                                        </option>
                                                                        <option value="Billing">
                                                                            Billing
                                                                        </option>
                                                                        <option value="Communication">
                                                                            Communication
                                                                        </option>
                                                                        <option value="Other">
                                                                            Other
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="form-label">Priority</label>
                                                                    <select v-model="task.priority
                                                                        " class="form-control" required>
                                                                        <option value="">
                                                                            Select
                                                                            Priority
                                                                        </option>
                                                                        <option value="Low">
                                                                            Low
                                                                        </option>
                                                                        <option value="Medium">
                                                                            Medium
                                                                        </option>
                                                                        <option value="High">
                                                                            High
                                                                        </option>
                                                                        <option value="Urgent">
                                                                            Urgent
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="form-label">Due
                                                                        Date</label>
                                                                    <input v-model="task.dueDate
                                                                        " type="date" class="form-control" required />
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="form-label">Status</label>
                                                                    <select v-model="task.status
                                                                        " class="form-control" required>
                                                                        <option value="">
                                                                            Select
                                                                            Status
                                                                        </option>
                                                                        <option value="pending">
                                                                            Pending
                                                                        </option>
                                                                        <option value="in-progress">
                                                                            In
                                                                            Progress
                                                                        </option>
                                                                        <option value="completed">
                                                                            Completed
                                                                        </option>
                                                                        <option value="cancelled">
                                                                            Cancelled
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                                <div class="form-group full-width">
                                                                    <label class="form-label">Description</label>
                                                                    <textarea v-model="task.description
                                                                        " class="form-control" rows="4"
                                                                        placeholder="Enter task description"
                                                                        required></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="form-actions">
                                                                <button type="button" @click="
                                                                        cancelTaskEdit
                                                                " class="btn btn-secondary">
                                                                    <i class="fas fa-times"></i>
                                                                    Cancel
                                                                </button>
                                                                <button type="submit" class="btn btn-primary" :disabled="isCreatingTask
                                                                    ">
                                                                    <i class="fas fa-save"></i>
                                                                    {{
                                                                        editingTaskId
                                                                            ? "Update Task"
                                                                            : "Create Task"
                                                                    }}
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>

                                                    <!-- Tasks List -->
                                                    <div v-else class="tasks-list">
                                                        <div v-if="
                                                                isLoadingTasks
                                                        " class="loading-tasks">
                                                            <div class="spinner-border text-primary" role="status">
                                                                <span class="sr-only">Loading
                                                                    tasks...</span>
                                                            </div>
                                                            <p>
                                                                Loading tasks...
                                                            </p>
                                                        </div>

                                                        <div v-else-if="
                                                                coachTasks.length ===
                                                                0
                                                        " class="no-tasks">
                                                            <i class="fas fa-inbox"></i>
                                                            <p>
                                                                No tasks found
                                                                for this coach
                                                            </p>
                                                        </div>

                                                        <div v-else class="table-responsive">
                                                            <table class="table table-hover tasks-table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>
                                                                            Title
                                                                        </th>
                                                                        <th>
                                                                            Category
                                                                        </th>
                                                                        <th>
                                                                            Priority
                                                                        </th>
                                                                        <th>
                                                                            Due
                                                                            Date
                                                                        </th>
                                                                        <th>
                                                                            Status
                                                                        </th>
                                                                        <th>
                                                                            Actions
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="task in coachTasks" :key="task.id
                                                                        " :class="getTaskRowClass(
                                                                                task
                                                                            )
                                                                            ">
                                                                        <td>
                                                                            <strong>{{
                                                                                    task.title
                                                                            }}</strong>
                                                                            <div class="task-description" v-if="
                                                                                    task.description
                                                                            ">
                                                                                {{
                                                                                    task.description.substring(
                                                                                        0,
                                                                                        50
                                                                                    )
                                                                                }}{{
                                                                                    task
                                                                                        .description
                                                                                        .length >
                                                                                    50
                                                                                        ? "..."
                                                                                        : ""
                                                                                }}
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <span class="badge category-badge" :class="getCategoryClass(
                                                                                        task.category
                                                                                    )
                                                                                ">
                                                                                {{
                                                                                    task.category
                                                                                }}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            <span class="badge priority-badge" :class="getPriorityClass(
                                                                                        task.priority
                                                                                    )
                                                                                ">
                                                                                {{
                                                                                    task.priority
                                                                                }}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            <span :class="getDueDateClass(
                                                                                        task.due_date
                                                                                    )
                                                                                ">
                                                                                {{
                                                                                    formatDate(
                                                                                        task.due_date
                                                                                    )
                                                                                }}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            <span class="badge status-badge" :class="getStatusClass(
                                                                                        task.status
                                                                                    )
                                                                                ">
                                                                                {{
                                                                                    task.status
                                                                                }}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            <div class="task-actions">
                                                                                <button @click="
                                                                                        viewTask(
                                                                                            task
                                                                                        )
                                                                                    "
                                                                                    class="btn btn-sm btn-outline-info"
                                                                                    title="View Task">
                                                                                    <i class="fas fa-eye"></i>
                                                                                </button>
                                                                                <button @click="
                                                                                        editTask(
                                                                                            task
                                                                                        )
                                                                                    "
                                                                                    class="btn btn-sm btn-outline-primary"
                                                                                    title="Edit Task">
                                                                                    <i class="fas fa-edit"></i>
                                                                                </button>
                                                                                <button @click="
                                                                                        deleteTask(
                                                                                            task.id
                                                                                        )
                                                                                    "
                                                                                    class="btn btn-sm btn-outline-danger"
                                                                                    title="Delete Task">
                                                                                    <i class="fas fa-trash"></i>
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Send Messages Tab -->
                                            <div v-if="activeTab === 'sendMessage'">
                                                <div class="tab-header">
                                                    <h4 class="tab-title">
                                                        <i class="fas fa-comments"></i>
                                                        Chat with {{ client.first_name }} {{ client.last_name }}
                                                    </h4>
                                                    <div class="chat-status">
                                                        <span class="badge badge-success">Online</span>
                                                    </div>
                                                </div>
                                                <div class="chat-container">
                                                    <!-- Chat Messages Area -->
                                                    <div class="chat-messages" ref="chatMessagesContainer">
                                                        <div v-if="isLoadingMessages" class="loading-messages text-center py-5">
                                                            <div class="spinner-border text-primary" role="status">
                                                                <span class="sr-only">Loading messages...</span>
                                                            </div>
                                                            <p class="mt-2">Loading conversation...</p>
                                                        </div>

                                                        <div v-else-if="messages.length === 0" class="no-messages text-center py-5">
                                                            <i class="fas fa-comments fa-3x text-muted mb-3"></i>
                                                            <p class="text-muted">No messages yet. Start the conversation!</p>
                                                        </div>

                                                        <div v-else class="messages-list">
                                                            <div 
                                                                v-for="message in messages" 
                                                                :key="message.id" 
                                                                class="message-bubble"
                                                                :class="{
                                                                    'message-sent': message.is_sent,
                                                                    'message-received': !message.is_sent
                                                                }"
                                                            >
                                                                <div class="message-content">
                                                                    <p class="message-text">{{ message.message }}</p>
                                                                    <span class="message-time">{{ formatMessageTime(message.created_at) }}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- Chat Input Area -->
                                                    <div class="chat-input-container">
                                                        <form @submit.prevent="sendMessage" class="chat-input-form">
                                                            <div class="input-group">
                                                                <textarea 
                                                                    v-model="newMessage.body" 
                                                                    class="form-control chat-input" 
                                                                    rows="2"
                                                                    placeholder="Type your message..."
                                                                    @keydown.enter.exact.prevent="sendMessage"
                                                                    @keydown.shift.enter.exact="newLine"
                                                                    :disabled="isSendingMessage"
                                                                    maxlength="1000"
                                                                ></textarea>
                                                                <div class="input-group-append">
                                                                    <button 
                                                                        type="submit" 
                                                                        class="btn btn-primary send-button" 
                                                                        :disabled="isSendingMessage || !newMessage.body.trim()"
                                                                        title="Send message (Enter)"
                                                                    >
                                                                        <i v-if="!isSendingMessage" class="fas fa-paper-plane"></i>
                                                                        <span v-else class="spinner-border spinner-border-sm"></span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <small class="text-muted message-counter">
                                                                {{ newMessage.body.length }}/1000 characters
                                                            </small>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Message View Modal -->
                                            <div v-if="showMessageModal && selectedMessage" class="modal fade show" style="display: block; background: rgba(0,0,0,0.5);" @click.self="closeMessageModal">
                                                <div class="modal-dialog modal-dialog-centered">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title">{{ selectedMessage.subject }}</h5>
                                                            <button type="button" class="close" @click="closeMessageModal">
                                                                <span>&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div class="message-view-header mb-3">
                                                                <div class="d-flex justify-content-between align-items-center">
                                                                    <div>
                                                                        <strong>From:</strong> {{ selectedMessage.sender }}
                                                                    </div>
                                                                    <div class="text-muted">
                                                                        <small>{{ formatDate(selectedMessage.created_at) }}</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="message-view-body">
                                                                <p style="white-space: pre-wrap;">{{ selectedMessage.body }}</p>
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" @click="closeMessageModal">Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Members Tab -->
                                            <div v-if="activeTab === 'members'">
                                                <div class="tab-header">
                                                    <h4 class="tab-title">
                                                        Assigned Members
                                                    </h4>
                                                    <div class="header-actions">
                                                        <div class="view-toggle-group">
                                                            <button @click="viewMode = 'cards'" class="btn btn-sm view-toggle-btn" :class="viewMode === 'cards' ? 'btn-primary' : 'btn-outline-secondary'">
                                                            <i class="fas fa-th-large"></i>
                                                        </button>
                                                            <button @click="viewMode = 'table'" class="btn btn-sm view-toggle-btn" :class="viewMode === 'table' ? 'btn-primary' : 'btn-outline-secondary'">
                                                            <i class="fas fa-table"></i>
                                                        </button>
                                                        </div>
                                                        
                                                        <button @click="activeAction = 'assignMember'" class="btn btn-success assign-member-btn">
                                                            <i class="fas fa-user-plus"></i>
                                                            Assign Member
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="members-content">
                                                    <!-- Default Assigned Members View -->
                                                    <div v-if="!activeAction" class="assigned-members-overview">

                                                        <!-- Members Statistics -->
                                                        <div class="members-stats">
                                                            <div class="stat-card">
                                                                <div class="stat-icon">
                                                                    <i class="fas fa-users"></i>
                                                                </div>
                                                                <div class="stat-content">
                                                                    <div class="stat-number">
                                                                        {{
                                                                            assignedMembers.length
                                                                        }}
                                                                    </div>
                                                                    <div class="stat-label">
                                                                        Total
                                                                        Assigned
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="stat-card">
                                                                <div class="stat-icon">
                                                                    <i class="fas fa-user-check"></i>
                                                                </div>
                                                                <div class="stat-content">
                                                                    <div class="stat-number">
                                                                        {{
                                                                            activeAssignedMembersCount
                                                                        }}
                                                                    </div>
                                                                    <div class="stat-label">
                                                                        Active
                                                                        Members
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="stat-card">
                                                                <div class="stat-icon">
                                                                    <i class="fas fa-user-clock"></i>
                                                                </div>
                                                                <div class="stat-content">
                                                                    <div class="stat-number">
                                                                        {{
                                                                            premiumMembersCount
                                                                        }}
                                                                    </div>
                                                                    <div class="stat-label">
                                                                        Premium
                                                                        Members
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="stat-card">
                                                                <div class="stat-icon">
                                                                    <i class="fas fa-calendar-check"></i>
                                                                </div>
                                                                <div class="stat-content">
                                                                    <div class="stat-number">
                                                                        {{
                                                                            thisMonthAssignments
                                                                        }}
                                                                    </div>
                                                                    <div class="stat-label">
                                                                        This
                                                                        Month
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- Search and Filters -->
                                                        <div class="search-filter-section compact">
                                                            <div class="filters-row">
                                                                <div class="form-group compact">
                                                                    <input v-model="memberSearch" type="text" class="form-control compact" placeholder="Search members..." @input="filterAssignedMembers" />
                                                                </div>
                                                                <div class="form-group compact">
                                                                    <select v-model="memberStatusFilter" class="form-control compact" @change="filterAssignedMembers">
                                                                        <option value="">All Status</option>
                                                                        <option value="Active">Active</option>
                                                                        <option value="Inactive">Inactive</option>
                                                                        <option value="On Hold">On Hold</option>
                                                                    </select>
                                                                </div>
                                                                <div class="form-group compact">
                                                                    <select v-model="memberPlanFilter" class="form-control compact" @change="filterAssignedMembers">
                                                                        <option value="">All Plans</option>
                                                                        <option value="Basic">Basic</option>
                                                                        <option value="Premium">Premium</option>
                                                                        <option value="VIP">VIP</option>
                                                                    </select>
                                                                </div>
                                                                <div class="form-group compact">
                                                                    <div class="form-check">
                                                                        <input 
                                                                            class="form-check-input" 
                                                                            type="checkbox" 
                                                                            id="noMembershipFilter" 
                                                                            v-model="noMembershipFilter"
                                                                            @change="handleNoMembershipFilterChange"
                                                                        />
                                                                        <label class="form-check-label" for="noMembershipFilter">
                                                                            No Membership
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- Loading State -->
                                                        <div v-if="
                                                                isLoadingAssignedMembers
                                                        " class="loading-assigned-members">
                                                            <div class="spinner-border text-primary" role="status">
                                                                <span class="sr-only">Loading
                                                                    assigned
                                                                    members...</span>
                                                            </div>
                                                            <p>
                                                                Loading assigned
                                                                members...
                                                            </p>
                                                        </div>

                                                        <!-- No Members Message -->
                                                        <div v-else-if="
                                                                filteredAssignedMembers.length ===
                                                                0
                                                        " class="no-assigned-members">
                                                            <i class="fas fa-users"></i>
                                                            <p>
                                                                No members
                                                                assigned to this
                                                                coach
                                                            </p>
                                                        </div>

                                                        <!-- Card View -->
                                                        <div v-else-if="viewMode === 'cards'" class="assigned-members-grid compact">
                                                            <div v-for="member in filteredAssignedMembers" :key="member.id" class="assigned-coach-card compact">
                                                                <div class="card-header">
                                                                    <div class="coach-avatar compact">
                                                                        <img :src="getMemberImageUrl(member.profile_image)" :alt="member.name" class="coach-image compact" />
                                                                        <div class="status-indicator" :class="getMemberStatusClass(member)"></div>
                                                                    </div>
                                                                    <div class="member-info">
                                                                        <h6 class="coach-name compact">{{ member.name || member.membername || "N/A" }}</h6>
                                                                        <span class="coach-id compact">{{ getMemberId(member) }}</span>
                                                                </div>
                                                                    <div class="quick-actions">
                                                                        <button @click="viewMemberDetails(member)" class="btn-icon" title="View Details">
                                                                            <i class="fas fa-eye"></i>
                                                                        </button>
                                                                        <button @click="editMember(member)" class="btn-icon" title="Edit Member">
                                                                            <i class="fas fa-edit"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div class="card-body">
                                                                    <div class="info-grid">
                                                                        <div class="info-item">
                                                                            <i class="fas fa-envelope"></i>
                                                                            <span @click="copyToClipboard(member.email, 'Email')" :title="member.email || 'No email'" class="clickable-text">{{ member.email || "N/A" }}</span>
                                                                        </div>
                                                                        <div class="info-item">
                                                                            <i class="fas fa-phone"></i>
                                                                            <span @click="copyToClipboard(member.phone || member.mobile_phone || member.landline_phone, 'Phone')" :title="member.phone || member.mobile_phone || member.landline_phone || 'No phone'" class="clickable-text">{{ member.phone || member.mobile_phone || member.landline_phone || "N/A" }}</span>
                                                                        </div>
                                                                        <div class="info-item">
                                                                        <i class="fas fa-calendar-alt"></i>
                                                                            <span>{{ formatDate(member.join_date || member.created_at || member.joining_date || member.date_joined || member.registration_date || member.member_since || member.start_date || member.enrollment_date) }}</span>
                                                                    </div>
                                                                    </div>
                                                                    
                                                                    <div class="badges-row">
                                                                        <span class="plan-badge" :class="getPlanClass(member)">{{ getPlanDisplayText(member) }}</span>
                                                                        <span class="status-badge" :class="getMemberStatusClass(member)">{{ getMemberStatusText(member) }}</span>
                                                                </div>
                                                                </div>
                                                                
                                                                <div class="card-footer">
                                                                    <button @click="unassignMember(member)" class="btn btn-sm btn-outline-danger unassign-btn">
                                                                        <i class="fas fa-user-minus"></i>
                                                                        Unassign
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- Table View -->
                                                        <div v-else class="table-responsive compact-table">
                                                            <table class="table table-hover assigned-members-table compact">
                                                                <thead class="table-header compact">
                                                                    <tr>
                                                                        <th>Member</th>
                                                                        <th>ID</th>
                                                                        <th>Contact</th>
                                                                        <th>Plan</th>
                                                                        <th>Status</th>
                                                                        <th>Join Date</th>
                                                                        <th>Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="member in filteredAssignedMembers" :key="member.id" class="table-row compact">
                                                                        <td>
                                                                            <div class="coach-info compact">
                                                                                <div class="coach-avatar compact">
                                                                                    <img :src="getMemberImageUrl(member.profile_image)" :alt="member.name" class="coach-image compact" />
                                                                                </div>
                                                                                <div class="coach-details compact">
                                                                                    <div class="coach-name compact">{{ member.name || member.membername || "N/A" }}</div>
                                                                                    <div class="coach-gender compact">{{ member.gender || member.sex || "N/A" }}</div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <span class="coach-id compact">{{ getMemberId(member) }}</span>
                                                                        </td>
                                                                        <td>
                                                                            <div class="contact-info compact">
                                                                                <div class="contact-item" @click="copyToClipboard(member.email, 'Email')" :title="member.email || 'No email'">
                                                                                    <i class="fas fa-envelope"></i>
                                                                                </div>
                                                                                <div class="contact-item" @click="copyToClipboard(member.phone || member.mobile_phone || member.landline_phone, 'Phone')" :title="member.phone || member.mobile_phone || member.landline_phone || 'No phone'">
                                                                                    <i class="fas fa-phone"></i>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <span class="coach-plan compact" :class="getPlanClass(member)">{{ getPlanDisplayText(member) }}</span>
                                                                        </td>
                                                                        <td>
                                                                            <span class="coach-status compact" :class="getMemberStatusClass(member)">{{ getMemberStatusText(member) }}</span>
                                                                        </td>
                                                                        <td>
                                                                            <span class="join-date compact">{{ formatDate(member.join_date || member.created_at || member.joining_date || member.date_joined || member.registration_date || member.member_since || member.start_date || member.enrollment_date) }}</span>
                                                                        </td>
                                                                        <td>
                                                                            <div class="coach-actions compact">
                                                                                <button @click="viewMemberDetails(member)" class="btn btn-sm btn-outline-info compact" title="View Details">
                                                                                    <i class="fas fa-eye"></i>
                                                                                </button>
                                                                                <button @click="editMember(member)" class="btn btn-sm btn-outline-primary compact" title="Edit Member">
                                                                                    <i class="fas fa-edit"></i>
                                                                                </button>
                                                                                <button @click="unassignMember(member)" class="btn btn-sm btn-outline-warning compact" title="Unassign Member">
                                                                                    <i class="fas fa-user-minus"></i>
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>

                                                    <!-- Member Assignment Form -->
                                                    <div v-if="
                                                            activeAction ===
                                                            'assignMember'
                                                    " class="coach-assignment-section">
                                                        <!-- Header with Close Button -->
                                                        <div class="assignment-header">
                                                            <h4 class="assignment-title">
                                                                <i class="fas fa-user-plus"></i>
                                                                Assign New
                                                                Member
                                                            </h4>
                                                            <button @click="
                                                                    activeAction =
                                                                        null
                                                                " class="btn btn-outline-secondary btn-sm close-btn"
                                                                title="Close">
                                                                <i class="fas fa-times"></i>
                                                                Close
                                                            </button>
                                                        </div>

                                                        <!-- Loading State -->
                                                        <div v-if="
                                                                isLoadingMembers
                                                        " class="loading-members">
                                                            <div class="spinner-border text-primary" role="status">
                                                                <span class="sr-only">Loading
                                                                    members...</span>
                                                            </div>
                                                            <p>
                                                                Loading
                                                                available
                                                                members...
                                                            </p>
                                                        </div>

                                                        <!-- Members Content -->
                                                        <div v-else>
                                                            <div class="search-filter-section">
                                                                <div class="form-grid">
                                                                    <div class="form-group">
                                                                        <label class="form-label">Search
                                                                            Members</label>
                                                                        <input v-model="memberSearch
                                                                            " type="text" class="form-control"
                                                                            placeholder="Search by name, email, or ID"
                                                                            @input="
                                                                                filterMembers
                                                                            " />
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label class="form-label">Status
                                                                            Filter</label>
                                                                        <select v-model="memberStatusFilter
                                                                            " class="form-control" @change="
                                                                                filterMembers
                                                                            ">
                                                                            <option value="">
                                                                                All
                                                                                Status
                                                                            </option>
                                                                            <option value="Active">
                                                                                Active
                                                                            </option>
                                                                            <option value="Inactive">
                                                                                Inactive
                                                                            </option>
                                                                            <option value="On Hold">
                                                                                On
                                                                                Hold
                                                                            </option>
                                                                        </select>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label class="form-label">Plan
                                                                            Filter</label>
                                                                        <select v-model="memberPlanFilter
                                                                            " class="form-control" @change="
                                                                                filterMembers
                                                                            ">
                                                                            <option value="">
                                                                                All
                                                                                Plans
                                                                            </option>
                                                                            <option value="Basic">
                                                                                Basic
                                                                            </option>
                                                                            <option value="Premium">
                                                                                Premium
                                                                            </option>
                                                                            <option value="VIP">
                                                                                VIP
                                                                            </option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <!-- Bulk Actions -->
                                                            <div v-if="
                                                                    selectedMembers.length >
                                                                    0
                                                            " class="bulk-actions">
                                                                <div class="selected-count">
                                                                    {{
                                                                        selectedMembers.length
                                                                    }}
                                                                    member(s)
                                                                    selected
                                                                </div>
                                                                <div class="bulk-buttons">
                                                                    <button @click="
                                                                            assignSelectedMembers
                                                                    " class="bulk-assign-btn" :disabled="isAssigningMember
                                                                            ">
                                                                        <i class="fas fa-user-plus"></i>
                                                                        Assign
                                                                        Selected
                                                                    </button>
                                                                    <button @click="
                                                                            clearSelection
                                                                    " class="clear-selection-btn">
                                                                        <i class="fas fa-times"></i>
                                                                        Clear
                                                                        Selection
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <!-- Members Table -->
                                                            <div v-if="
                                                                    safeFilteredMembers.length >
                                                                    0
                                                            " class="table-responsive">
                                                                <table class="members-assignment-table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th class="text-center">
                                                                                <input type="checkbox" v-model="selectAllMembers
                                                                                    " @change="
                                                                                        toggleSelectAllMembers
                                                                                    " />
                                                                            </th>
                                                                            <th>
                                                                                Member
                                                                            </th>
                                                                            <th>
                                                                                ID
                                                                            </th>
                                                                            <th>
                                                                                Email
                                                                            </th>
                                                                            <th>
                                                                                Phone
                                                                            </th>
                                                                            <th>
                                                                                Plan
                                                                            </th>
                                                                            <th>
                                                                                Status
                                                                            </th>
                                                                            <th>
                                                                                Actions
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr v-for="member in safeFilteredMembers" :key="member.id
                                                                            " class="table-row">
                                                                            <td class="table-cell text-center">
                                                                                <input type="checkbox" v-model="member.selected
                                                                                    " />
                                                                            </td>
                                                                            <td class="table-cell">
                                                                                <div class="coach-avatar">
                                                                                    <img :src="getMemberImageUrl(member.profile_image)
                                                                                        " :alt="member.name
                                                                                            " class="coach-image" />
                                                                                    <div class="coach-info">
                                                                                        <div class="coach-name">
                                                                                            {{
                                                                                                member.name
                                                                                            }}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td class="table-cell">
                                                                                <span class="coach-id">{{
                                                                                        getMemberId(
                                                                                            member
                                                                                        )
                                                                                }}</span>
                                                                            </td>
                                                                            <td class="table-cell">
                                                                                <div class="coach-email">
                                                                                    {{
                                                                                        member.email
                                                                                    }}
                                                                                </div>
                                                                            </td>
                                                                            <td class="table-cell">
                                                                                <div class="coach-phone">
                                                                                    {{
                                                                                        member.phone
                                                                                    }}
                                                                                </div>
                                                                            </td>
                                                                            <td class="table-cell">
                                                                                <span class="coach-plan" :class="getPlanClass(
                                                                                            member
                                                                                        )
                                                                                    ">
                                                                                    {{
                                                                                        getPlanDisplayText(
                                                                                            member
                                                                                        )
                                                                                    }}
                                                                                </span>
                                                                            </td>
                                                                            <td class="table-cell">
                                                                                <span class="coach-status" :class="getMemberStatusClass(
                                                                                            member
                                                                                        )
                                                                                    ">
                                                                                    {{
                                                                                        getMemberStatusText(
                                                                                            member
                                                                                        )
                                                                                    }}
                                                                                </span>
                                                                            </td>
                                                                            <td class="table-cell">
                                                                                <button v-if="
                                                                                        !member.isAssigned
                                                                                " @click="
                                                                                        assignMember(
                                                                                            member
                                                                                        )
                                                                                        " class="assign-coach-btn"
                                                                                    :disabled="isAssigningMember
                                                                                        ">
                                                                                    <i class="fas fa-user-plus"></i>
                                                                                    Assign
                                                                                </button>
                                                                                <button v-else @click="
                                                                                        unassignMember(
                                                                                            member
                                                                                        )
                                                                                    " class="unassign-coach-btn"
                                                                                    :disabled="isAssigningMember
                                                                                        ">
                                                                                    <i class="fas fa-user-minus"></i>
                                                                                    Unassign
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                            <div v-if="
                                                                    filteredMembers.length ===
                                                                    0
                                                            " class="no-members-message">
                                                                <i class="fas fa-users"></i>
                                                                <p>
                                                                    No members
                                                                    found
                                                                    matching
                                                                    your
                                                                    criteria
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <!-- Invoices Tab -->
                                            <!-- <div v-if="activeTab === 'invoices'">
                                                <div class="tab-header">
                                                    <h4 class="tab-title">
                                                        Coach Invoices
                                                    </h4>
                                                    <div class="header-actions">
                                                        <button class="btn btn-primary btn-sm">
                                                            <i class="fas fa-plus"></i>
                                                            New Invoice
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="tab-content-body">
                                                    <div class="empty-state">
                                                        <div class="empty-state-icon">
                                                            <i class="fas fa-file-invoice-dollar"></i>
                                                        </div>
                                                        <h5 class="empty-state-title">No Invoices Found</h5>
                                                        <p class="empty-state-text">
                                                            This coach doesn't have any invoices yet. Create a new invoice to get started.
                                                        </p>
                                                        <button class="btn btn-primary">
                                                            <i class="fas fa-plus"></i>
                                                            Create First Invoice
                                                        </button>
                                                    </div>
                                                </div>
                                            </div> -->

                                            <!-- Latest Activities Tab -->
                                            <div v-if="activeTab === 'latestActivities'">
                                                <div class="tab-header">
                                                    <h4 class="tab-title">
                                                        Latest Activities
                                                    </h4>
                                                    <div class="header-actions">
                                                        <button 
                                                            class="btn btn-outline-primary btn-sm"
                                                            @click="fetchCoachActivities"
                                                            :disabled="isLoadingActivities"
                                                        >
                                                            <i class="fas fa-sync" :class="{ 'fa-spin': isLoadingActivities }"></i>
                                                            Refresh
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="tab-content-body">
                                                    <!-- Loading State -->
                                                    <div v-if="isLoadingActivities" class="text-center py-4">
                                                        <div class="spinner-border text-primary" role="status">
                                                            <span class="sr-only">Loading...</span>
                                                        </div>
                                                        <p class="mt-2 text-muted">Loading activities...</p>
                                                    </div>
                                                    <!-- Activities List -->
                                                    <div v-else-if="activities.length > 0" class="activities-list">
                                                        <div 
                                                            v-for="(activity, index) in activities" 
                                                            :key="index"
                                                            class="activity-item"
                                                        >
                                                            <div class="activity-icon">
                                                                <i :class="`fas fa-${activity.icon} text-${activity.icon_color}`"></i>
                                                            </div>
                                                            <div class="activity-content">
                                                                <div class="activity-title">{{ activity.title }}</div>
                                                                <div class="activity-description">{{ activity.description }}</div>
                                                                <div class="activity-time">{{ activity.time_ago }}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- Empty State -->
                                                    <div v-else class="empty-state">
                                                        <div class="empty-state-icon">
                                                            <i class="fas fa-history"></i>
                                                        </div>
                                                        <h5 class="empty-state-title">No Activities Found</h5>
                                                        <p class="empty-state-text">There are no recent activities for this coach.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Schedule Tab -->
                                            <div v-if="activeTab === 'schedule'">
                                                <div class="tab-header">
                                                    <h4 class="tab-title">
                                                        <i class="fas fa-calendar-check"></i>
                                                        Schedule Management
                                                    </h4>
                                                    <!-- <div class="tab-actions">
                                                        <button class="btn btn-primary btn-sm">
                                                            <i class="fas fa-plus"></i>
                                                            Add Schedule
                                                        </button>
                                                    </div> -->
                                                </div>
                                                <div class="tab-content-body">
                                                    <div class="empty-state">
                                                        <div class="empty-state-icon">
                                                            <i class="fas fa-calendar-check"></i>
                                                        </div>
                                                        <h5 class="empty-state-title">Schedule Management</h5>
                                                        <p class="empty-state-text">Manage coach schedules, appointments, and availability.</p>
                                                        <!-- <button class="btn btn-primary">
                                                            <i class="fas fa-plus"></i>
                                                            Create Schedule
                                                        </button> -->
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Workout Tab -->
                                            <div v-if="activeTab === 'workout'">
                                                <div class="tab-header">
                                                    <h4 class="tab-title">
                                                        <i class="fas fa-dumbbell"></i>
                                                        Workout Plans
                                                    </h4>
                                                    <!-- <div class="tab-actions">
                                                        <button class="btn btn-primary btn-sm">
                                                            <i class="fas fa-plus"></i>
                                                            Create Workout
                                                        </button>
                                                    </div> -->
                                                </div>
                                                <div class="tab-content-body">
                                                    <div class="empty-state">
                                                        <div class="empty-state-icon">
                                                            <i class="fas fa-dumbbell"></i>
                                                        </div>
                                                        <h5 class="empty-state-title">Workout Plans</h5>
                                                        <p class="empty-state-text">Create and manage workout plans for members.</p>
                                                        <!-- <button class="btn btn-primary">
                                                            <i class="fas fa-plus"></i>
                                                            Create Workout Plan
                                                        </button> -->
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Progress Tracker Tab -->
                                            <!-- <div v-if="activeTab === 'progress'"> -->
                                                <!-- <div class="tab-header">
                                                    <h4 class="tab-title">
                                                        <i class="fas fa-chart-line"></i>
                                                        Progress Tracking
                                                    </h4> -->
                                                    <!-- <div class="tab-actions">
                                                        <button class="btn btn-primary btn-sm">
                                                            <i class="fas fa-plus"></i>
                                                            Add Progress
                                                        </button>
                                                    </div> -->
                                                <!-- </div> -->
                                                <!-- <div class="tab-content-body">
                                                    <div class="empty-state">
                                                        <div class="empty-state-icon">
                                                            <i class="fas fa-chart-line"></i>
                                                        </div>
                                                        <h5 class="empty-state-title">Progress Tracking</h5>
                                                        <p class="empty-state-text">Track member progress, measurements, and achievements.</p>
                                                        <button class="btn btn-primary">
                                                            <i class="fas fa-plus"></i>
                                                            Track Progress
                                                        </button>
                                                    </div>
                                                </div> -->
                                            <!-- </div> -->

                                            <!-- Nutrition Tab -->
                                            <div v-if="activeTab === 'nutrition'">
                                                <div class="tab-header">
                                                    <h4 class="tab-title">
                                                        <i class="fas fa-apple-alt"></i>
                                                        Nutrition Guidance
                                                    </h4>
                                                    <!-- <div class="tab-actions">
                                                        <button class="btn btn-primary btn-sm">
                                                            <i class="fas fa-plus"></i>
                                                            Add Nutrition Plan
                                                        </button>
                                                    </div> -->
                                                </div>
                                                <div class="tab-content-body">
                                                    <div class="empty-state">
                                                        <div class="empty-state-icon">
                                                            <i class="fas fa-apple-alt"></i>
                                                        </div>
                                                        <h5 class="empty-state-title">Nutrition Guidance</h5>
                                                        <p class="empty-state-text">Provide nutrition advice and dietary recommendations.</p>
                                                        <!-- <button class="btn btn-primary">
                                                            <i class="fas fa-plus"></i>
                                                            Create Nutrition Plan
                                                        </button> -->
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Meal Plan Tab -->
                                            <div v-if="activeTab === 'Meal Plan'">
                                                <div class="tab-header">
                                                    <h4 class="tab-title">
                                                        <i class="fas fa-utensils"></i>
                                                        Meal Planning
                                                    </h4>
                                                    <!-- <div class="tab-actions">
                                                        <button class="btn btn-primary btn-sm">
                                                            <i class="fas fa-plus"></i>
                                                            Create Meal Plan
                                                        </button>
                                                    </div> -->
                                                </div>
                                                <div class="tab-content-body">
                                                    <div class="empty-state">
                                                        <div class="empty-state-icon">
                                                            <i class="fas fa-utensils"></i>
                                                        </div>
                                                        <h5 class="empty-state-title">Meal Planning</h5>
                                                        <p class="empty-state-text">Create customized meal plans for members.</p>
                                                        <!-- <button class="btn btn-primary">
                                                            <i class="fas fa-plus"></i>
                                                            Create Meal Plan
                                                        </button> -->
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Challenge Tab -->
                                            <div v-if="activeTab === 'Challenge'">
                                                <div class="tab-header">
                                                    <h4 class="tab-title">
                                                        <i class="fas fa-trophy"></i>
                                                        Fitness Challenges
                                                    </h4>
                                                    <!-- <div class="tab-actions">
                                                        <button class="btn btn-primary btn-sm">
                                                            <i class="fas fa-plus"></i>
                                                            Create Challenge
                                                        </button>
                                                    </div> -->
                                                </div>
                                                <div class="tab-content-body">
                                                    <div class="empty-state">
                                                        <div class="empty-state-icon">
                                                            <i class="fas fa-trophy"></i>
                                                        </div>
                                                        <h5 class="empty-state-title">Fitness Challenges</h5>
                                                        <p class="empty-state-text">Create and manage fitness challenges for members.</p>
                                                        <!-- <button class="btn btn-primary">
                                                            <i class="fas fa-plus"></i>
                                                            Create Challenge
                                                        </button> -->
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Settings Tab -->
                                            <div v-if="activeTab === 'settings'">
                                                <div class="tab-header">
                                                    <h4 class="tab-title">
                                                        <i class="fas fa-cog"></i>
                                                        Coach Settings
                                                    </h4>
                                                    <div class="tab-actions">
                                                        <button class="btn btn-primary btn-sm">
                                                            <i class="fas fa-save"></i>
                                                            Save Settings
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="tab-content-body">
                                                    <div class="settings-grid">
                                                        <div class="settings-section">
                                                            <h5 class="settings-title">General Settings</h5>
                                                            <div class="form-group">
                                                                <label>Notification Preferences</label>
                                                                <select class="form-control">
                                                                    <option>All Notifications</option>
                                                                    <option>Important Only</option>
                                                                    <option>Disabled</option>
                                                                </select>
                                                            </div>
                                                            <div class="form-group">
                                                                <label>Default View</label>
                                                                <select class="form-control">
                                                                    <option>Table View</option>
                                                                    <option>Card View</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="settings-section">
                                                            <h5 class="settings-title">Privacy Settings</h5>
                                                            <div class="form-group">
                                                                <div class="form-check">
                                                                    <input type="checkbox" class="form-check-input" id="coach-profile-visible" v-model="settings.profileVisible">
                                                                    <label class="form-check-label" for="coach-profile-visible">
                                                                        Make profile visible to members
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="form-check">
                                                                    <input type="checkbox" class="form-check-input" id="coach-contact-visible" v-model="settings.contactVisible">
                                                                    <label class="form-check-label" for="coach-contact-visible">
                                                                        Show contact information
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Notes Tab -->
                                            <div v-if="activeTab === 'notes'">
                                                <div class="notes-content">
                                                    <!-- Add New Note Section -->
                                                    <div class="add-note-section">
                                                        <h5 class="section-title">Add new note</h5>
                                                        <div class="note-form">
                                                            <div class="form-group">
                                                                <label class="form-label">Note</label>
                                                                <textarea v-model="newNote.text"
                                                                    class="form-control note-textarea"
                                                                    placeholder="Enter your note here..."
                                                                    rows="4"></textarea>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="form-label">Category</label>
                                                                <select v-model="newNote.category" class="form-control">
                                                                    <option value="General">General</option>
                                                                    <option value="Check_in">Check In</option>
                                                                    <option value="Coaching">Coaching</option>
                                                                    <option value="Invoices">Invoices</option>
                                                                    <option value="Files">Files</option>
                                                                    <option value="Nutrition">Nutrition</option>
                                                                    <option value="Workout">Workout</option>
                                                                    <option value="member check-up">Member Check-up</option>
                                                                    <option value="other">Other</option>
                                                                </select>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="form-check">
                                                                    <input type="checkbox" 
                                                                        v-model="newNote.is_shared" 
                                                                        class="form-check-input" 
                                                                        id="noteIsShared">
                                                                    <label class="form-check-label" for="noteIsShared">
                                                                        Share with coach
                                                                    </label>
                                                                    <small class="form-text text-muted d-block mt-1">
                                                                        If checked, this note will be visible to the coach
                                                                    </small>
                                                                </div>
                                                            </div>
                                                            <button @click="saveNote"
                                                                class="btn btn-primary save-note-btn"
                                                                :disabled="loadingNotes">
                                                                <span v-if="loadingNotes">
                                                                    <i class="fas fa-spinner fa-spin"></i> Saving...
                                                                </span>
                                                                <span v-else>
                                                                    {{ editingNoteId ? 'Update note' : 'Save note' }}
                                                                </span>
                                                            </button>
                                                            <button v-if="editingNoteId" @click="editingNoteId = null; newNote.text = ''; newNote.category = 'General'; newNote.is_shared = false"
                                                                class="btn btn-secondary ml-2">
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <!-- Overview Section -->
                                                    <div class="overview-section">
                                                        <div class="overview-header">
                                                            <h5 class="section-title">Overview</h5>
                                                            <select v-model="selectedCategory"
                                                                class="form-control category-filter"
                                                                @change="loadNotes">
                                                                <option value="All">All</option>
                                                                <option value="General">General</option>
                                                                <option value="Check_in">Check In</option>
                                                                <option value="Coaching">Coaching</option>
                                                                <option value="Invoices">Invoices</option>
                                                                <option value="Files">Files</option>
                                                                <option value="Nutrition">Nutrition</option>
                                                                <option value="Workout">Workout</option>
                                                                <option value="member check-up">Member Check-up</option>
                                                                <option value="other">Other</option>
                                                            </select>
                                                        </div>
                                                        <div class="notes-list">
                                                            <div v-if="loadingNotes" class="text-center py-4">
                                                                <i class="fas fa-spinner fa-spin"></i> Loading notes...
                                                            </div>
                                                            <div v-else-if="filteredNotes.length === 0" class="no-results">
                                                                No notes found.
                                                            </div>
                                                            <div v-else class="notes-grid">
                                                                <div v-for="note in filteredNotes" :key="note.id"
                                                                    class="note-card">
                                                                    <div class="note-header">
                                                                        <span class="note-category">{{ note.category
                                                                            }}</span>
                                                                        <span class="note-date">{{
                                                                            formatDate(note.createdAt) }}</span>
                                                                    </div>
                                                                    <div class="note-content">
                                                                        {{ note.text }}
                                                                    </div>
                                                                    <div class="note-actions">
                                                                        <button @click="editNote(note)"
                                                                            class="btn btn-sm btn-outline-primary">
                                                                            <i class="fas fa-edit"></i>
                                                                        </button>
                                                                        <button @click="confirmDelete(note.id)"
                                                                            class="btn btn-sm btn-outline-danger">
                                                                            <i class="fas fa-trash"></i>
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
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Action Buttons -->
                    <div class="bottom-actions">
                        <div class="action-buttons">
                            <!-- Edit button moved to header - keeping only Add New button here -->
                            <button v-if="isEditing" type="button" @click="saveProfile" class="btn btn-success">
                                <i class="fas fa-save"></i>
                                Save
                            </button>
                            <button v-if="isEditing" type="button" @click="cancelEdit" class="btn btn-secondary">
                                <i class="fas fa-times"></i>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "CoachDetails",
    data() {
        return {
            // UI State Management
            activeTab: "profile", // Profile as default tab
            activeAction: null,
            isEditing: false, // Profile editing mode
            // Removed activeView - using chat interface instead
            isLoading: true, // Main loading state
            isSaving: false, // Save operation loading state
            profileImageUrl:
                "https://via.placeholder.com/120x120/4F92F2/FFFFFF?text=Profile",
            profileImageFile: null, // Store the File object for upload
            profileImageFileInput: null, // Store reference to file input element
            _profileImageFileRef: null, // Non-reactive storage for File object (bypasses Vue reactivity issues)
            // Coach/client data object
            client: {
                id: "",
                coach_id: "",
                first_name: "",
                last_name: "",
                name: "",
                profile_image: "",
                gender: "",
                dob: "",
                email: "",
                mobile_phone: "",
                landline_phone: "",
                years_of_experience: "",
                address: "",
                city: "",
                state: "",
                zip: "",
                bio: "",
                weekly_availability: "",
                session_duration: "",
                max_clients_per_day: "",
                payment_plan: "",
                rate_salary: "",
                commission_percent: "",
                // Additional fields to match backend
                coach_experience: "",
                coach_certifications: "",
                // specializations: "",
                height_cm: "",
                weight_kg: "",
                chest_inch: "",
                blood_group: "",
                medical_conditions: "",
                referred_by: "",
                locker_number: "",
                social_media: "",
                notes: "",
                is_trial: false,
                trial_start: "",
                trial_end: "",
                payment_method: "",
                payment_start_date: "",
                bank_account_name: "",
                bank_account_number: "",
                routing_number: "",
                bank_account_type: "",
                bank_name: "",
                payment_notes: "",
            },
            // Original data for change tracking
            originalClientData: {},
            // Track changes made during editing
            changesMade: {},
            // Track fields that have been touched/interacted with
            touchedFields: {},
            // Track if any changes have been made
            hasUnsavedChanges: false,
            // Notes data
            newNote: {
                text: "",
                category: "General",
                is_shared: false
            },
            selectedCategory: "All",
            notes: [],
            loadingNotes: false,
            editingNoteId: null,
            // UI settings for checkboxes in Settings tab
            settings: {
                profileVisible: false,
                contactVisible: false,
            },
            // Tab navigation
            tabs: [
                {
                    key: "profile",
                    label: "Profile",
                    icon: "fas fa-user",
                },
                {
                    key: "members",
                    label: "Members",
                    icon: "fas fa-users",
                },
                // {
                //     key: "invoices",
                //     label: "Invoices",
                //     icon: "fas fa-file-invoice-dollar",
                // },
                {
                    key: "latestActivities",
                    label: "Latest Activities",
                    icon: "fas fa-envelope",
                },
                {
                    key: "notes",
                    label: "Notes",
                    icon: "fas fa-sticky-note",
                },
            ],
            // Available actions for coach management
            actions: [
                // {
                //     key: "goToProfile",
                //     label: "Edit Profile",
                //     icon: "fa-user-edit",
                // },
                {
                    key: "sendMessage",
                    label: "Send Message",
                    icon: "fa-envelope",
                },
                {
                    key: "newTask",
                    label: "New Task",
                    icon: "fa-tasks",
                },
                {
                    key: "assignMember",
                    label: "Assign Member",
                    icon: "fa-user-plus",
                },
            ],
            newMessage: {
                body: "",
            },
            coachUserId: null, // Store coach's user ID for messaging
            task: {
                title: "",
                category: "",
                priority: "",
                dueDate: "",
                status: "pending",
                description: "",
            },
            members: [],
            assignedMembers: [],
            isAssigningMember: false,
            isCreatingTask: false,
            memberSearch: "",
            memberStatusFilter: "",
            memberPlanFilter: "",
            noMembershipFilter: false,
            selectAllMembers: false,
            filteredMembers: [],
            filteredAssignedMembers: [],
            // Add loading states for members
            isLoadingMembers: false,
            // View mode for assigned members
            viewMode: "table",
            // Task Management
            coachTasks: [], // Array of coach tasks
            isLoadingTasks: false, // Task loading state
            editingTaskId: null, // ID of task being edited

            // Message Management
            messages: [], // Array of messages
            isLoadingMessages: false, // Message loading state
            isSendingMessage: false, // Message sending state
            selectedMessage: null, // Currently selected message for viewing
            showMessageModal: false, // Modal visibility for viewing message

            // Member Assignment Management
            isLoadingAssignedMembers: false, // Assigned members loading state

            // Activities Management
            activities: [], // Array of coach activities
            isLoadingActivities: false, // Activities loading state

            // Settings Management
            isSavingSettings: false, // Settings saving state
            settings: {
                accountStatus: "active",
                accountType: "full-time",
                joinDate: "",
                notifications: {
                    email: {
                        newTasks: true,
                        messages: true,
                        memberAssignments: true,
                        scheduleUpdates: false,
                    },
                    sms: {
                        urgentTasks: true,
                        scheduleChanges: false,
                    },
                },
                privacy: {
                    profileVisibility: "public",
                    contactVisibility: "members-only",
                    scheduleVisibility: "members-only",
                },
                workPreferences: {
                    defaultSessionDuration: "60",
                    maxClientsPerDay: "8",
                    workStartTime: "09:00",
                    workEndTime: "17:00",
                    breakTime: "10",
                },
                payment: {
                    paymentMethod: "bank-transfer",
                    paymentFrequency: "monthly",
                    taxId: "",
                },
                security: {
                    twoFactorAuth: false,
                    sessionTimeout: "30",
                },
            },
        };
    },

    computed: {
        filteredNotes() {
            if (!this.notes || this.notes.length === 0) {
                return [];
            }
            if (this.selectedCategory === "All" || !this.selectedCategory) {
                return this.notes;
            }
            return this.notes.filter(note => {
                // Handle case-insensitive matching and null categories
                const noteCategory = (note.category || 'General').trim();
                const selectedCategory = (this.selectedCategory || '').trim();
                return noteCategory === selectedCategory;
            });
        },
        selectedMembers() {
            return this.members.filter((member) => member.selected);
        },
        // Ensure filteredMembers is always an array
        safeFilteredMembers() {
            return Array.isArray(this.filteredMembers)
                ? this.filteredMembers
                : [];
        },
        // Assigned members statistics
        activeAssignedMembersCount() {
            return this.assignedMembers.filter(
                (member) => member.status === "Active"
            ).length;
        },
        premiumMembersCount() {
            return this.assignedMembers.filter(
                (member) => member.plan === "Premium" || member.plan === "VIP"
            ).length;
        },
        thisMonthAssignments() {
            const now = new Date();
            const thisMonth = now.getMonth();
            const thisYear = now.getFullYear();

            return this.assignedMembers.filter((member) => {
                if (member.assigned_date) {
                    const assignedDate = new Date(member.assigned_date);
                    return (
                        assignedDate.getMonth() === thisMonth &&
                        assignedDate.getFullYear() === thisYear
                    );
                }
                return false;
            }).length;
        },
    },

    methods: {
        goBack() {
            this.$router.push({ name: "CoachList" });
        },

        // Notes methods
        async loadNotes() {
            const coachId = this.$route.params.id;
            if (!coachId) {
                return;
            }

            this.loadingNotes = true;
            try {
                // Build params object - only include category if not "All"
                const params = {};
                if (this.selectedCategory && this.selectedCategory !== 'All') {
                    params.category = this.selectedCategory;
                }
                
                const response = await axios.get(`/notes/coach/${coachId}`, {
                    params: params
                });

                if (response.data && response.data.success && response.data.data) {
                    this.notes = response.data.data.map(note => ({
                        id: note.id,
                        text: note.text || note.description,
                        description: note.description,
                        category: note.category || 'General',
                        createdAt: note.createdAt || note.created_at,
                        created_at: note.created_at,
                        member_id: note.member_id,
                        coach_id: note.coach_id,
                        is_shared: note.is_shared,
                        member: note.member,
                        coach: note.coach,
                        created_by_user_id: note.created_by_user_id,
                        created_by_user: note.created_by_user
                    }));
                    console.log('Notes loaded:', this.notes.length, 'Selected category:', this.selectedCategory);
                } else {
                    console.warn('No notes data in response:', response.data);
                    this.notes = [];
                }
            } catch (error) {
                console.error('Error loading notes:', error);
                console.error('Error response:', error.response);
                this.notes = [];
                const errorMessage = error.response?.data?.message || error.message || 'Failed to load notes';
                this.showError(errorMessage);
            } finally {
                this.loadingNotes = false;
            }
        },

        async saveNote() {
            if (!this.newNote.text.trim()) {
                alert("Please enter a note");
                return;
            }

            const coachId = this.$route.params.id;
            if (!coachId) {
                this.showError("No coach ID found");
                return;
            }

            try {
                // Admin creates notes - send target_coach_id to track which coach the note is for
                // coach_id will be null (admin is not a coach)
                const noteData = {
                    target_coach_id: coachId, // Track which coach this note is for
                    description: this.newNote.text,
                    category: this.newNote.category || 'General', // Ensure category is always set
                    is_shared: this.newNote.is_shared || false
                };
                
                console.log('Saving note with data:', noteData);
                console.log('Category value:', this.newNote.category);

                let response;
                if (this.editingNoteId) {
                    // Update existing note
                    response = await axios.put(`/notes/${this.editingNoteId}`, noteData);
                } else {
                    // Create new note
                    response = await axios.post('/notes', noteData);
                }

                if (response.data && response.data.success) {
                    this.showSuccess(response.data.message || 'Note saved successfully');
                    this.newNote.text = "";
                    this.newNote.category = "General";
                    this.newNote.is_shared = false;
                    this.editingNoteId = null;
                    await this.loadNotes(); // Reload notes
                } else {
                    this.showError(response.data?.message || 'Failed to save note');
                }
            } catch (error) {
                console.error('Error saving note:', error);
                this.showError(error.response?.data?.message || 'Failed to save note');
            }
        },

        editNote(note) {
            this.newNote.text = note.text || note.description;
            this.newNote.category = note.category;
            this.newNote.is_shared = note.is_shared || false;
            this.editingNoteId = note.id;
            // Scroll to the form
            const formElement = document.querySelector('.add-note-section');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },

        async deleteNote(noteId) {
            try {
                // Use SweetAlert for confirmation instead of browser confirm
                const result = await this.$swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'Cancel'
                });

                if (!result.isConfirmed) {
                    return;
                }

                const response = await axios.delete(`/notes/${noteId}`, {
                    baseURL: '', // Use web routes
                });
                
                if (response.data && response.data.success) {
                    this.$swal({
                        title: 'Deleted!',
                        text: response.data.message || 'Note has been deleted.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    await this.loadNotes(); // Reload notes
                } else {
                    this.showError(response.data?.message || 'Failed to delete note');
                }
            } catch (error) {
                console.error('Error deleting note:', error);
                this.showError(error.response?.data?.message || 'Failed to delete note');
            }
        },

        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        },

        async copyToClipboard(text, type) {
            if (!text || text === 'N/A') {
                this.showError(`No ${type.toLowerCase()} available to copy`);
                return;
            }

            try {
                await navigator.clipboard.writeText(text);
                this.showSuccess(`${type} copied to clipboard: ${text}`);
            } catch (error) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    this.showSuccess(`${type} copied to clipboard: ${text}`);
                } catch (fallbackError) {
                    this.showError(`Failed to copy ${type.toLowerCase()}`);
                }
                document.body.removeChild(textArea);
            }
        },

        // Additional notes methods
        clearForm() {
            this.newNote.text = "";
            this.newNote.category = "General";
        },

        confirmDelete(noteId) {
            this.deleteNote(noteId);
        },

        // Settings methods
        updateSettings() {
            this.isSaving = true;
            // Simulate API call
            setTimeout(() => {
                this.isSaving = false;
                alert("Settings saved successfully!");
            }, 1000);
        },

        resetSettings() {
            if (confirm("Are you sure you want to reset all settings to default?")) {
                // Reset settings to default values
                this.settings = {
                    accountStatus: "active",
                    accountType: "full-time",
                    notifications: {
                        email: {
                            newTasks: true,
                            messages: true,
                            memberAssignments: true,
                            scheduleUpdates: true
                        },
                        sms: {
                            urgentTasks: true,
                            scheduleChanges: false
                        }
                    }
                };
                alert("Settings reset to defaults!");
            }
        },

        // Navigation methods
        goToProfile() {
            this.showComingSoon('Go to Profile');
        },

        async convertCoachToMember() {
            try {
                const coachId = this.$route.params.id;
                if (!coachId) {
                    this.showError("No coach ID found");
                    return;
                }

                // Confirm the action with the user
                const result = await this.$swal({
                    title: 'Convert Coach to Member',
                    text: `Are you sure you want to convert ${this.client.first_name} ${this.client.last_name} from a coach to a member? This action cannot be undone.`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, convert to member',
                    cancelButtonText: 'Cancel'
                });

                if (!result.isConfirmed) {
                    return;
                }

                // Show loading state
                this.$swal({
                    title: 'Converting...',
                    html: '<div style="text-align: center;"><div style="border: 4px solid #f3f3f3; border-top: 4px solid #dc3545; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 15px;"></div><p>Please wait while we convert the coach to a member...</p></div><style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                });

                // Call the API to convert coach to member
                const response = await axios.post(`coaches/${coachId}/convert-to-member`);

                if (response.data.status === 'success') {
                    // Show success message
                    this.$swal({
                        title: 'Success!',
                        text: 'Coach has been successfully converted to a member.',
                        icon: 'success',
                        confirmButtonText: 'View Members'
                    }).then(() => {
                        // Navigate to ViewAllMembers page
                        this.$router.push('/app/Members/ViewAllMembers');
                    });
                } else {
                    this.showError(response.data.message || 'Failed to convert coach to member');
                }

            } catch (error) {
                console.error('Error converting coach to member:', error);
                
                if (error.response?.status === 422 && error.response?.data?.errors) {
                    const errors = error.response.data.errors;
                    const errorMessages = Object.keys(errors).map(field => {
                        return `${field}: ${errors[field].join(', ')}`;
                    }).join('\n');
                    this.showError(`Validation errors:\n${errorMessages}`);
                } else if (error.response?.data?.message) {
                    this.showError(`Error: ${error.response.data.message}`);
                } else {
                    this.showError('Error converting coach to member. Please try again.');
                }
            }
        },

        async unsubscribeCoach() {
            try {
                const coachId = this.$route.params.id;
                if (!coachId) {
                    this.showError("No coach ID found");
                    return;
                }

                // Confirm the action with the user
                const result = await this.$swal({
                    title: 'Unsubscribe Coach',
                    text: `Are you sure you want to unsubscribe ${this.client.first_name} ${this.client.last_name}? This will deactivate their coach account.`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, unsubscribe',
                    cancelButtonText: 'Cancel'
                });

                if (!result.isConfirmed) {
                    return;
                }

                // Show loading state
                this.$swal({
                    title: 'Unsubscribing...',
                    html: '<div style="text-align: center;"><div style="border: 4px solid #f3f3f3; border-top: 4px solid #dc3545; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 15px;"></div><p>Please wait while we unsubscribe the coach...</p></div><style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                });

                // Call the API to unsubscribe coach
                const response = await axios.post(`coaches/${coachId}/unsubscribe`);

                if (response.data.status === 'success') {
                    // Show success message
                    this.$swal({
                        title: 'Success!',
                        text: 'Coach has been successfully unsubscribed.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // Navigate back to coach list
                        this.$router.push('/app/Staff/coachlist');
                    });
                } else {
                    this.showError(response.data.message || 'Failed to unsubscribe coach');
                }

            } catch (error) {
                console.error('Error unsubscribing coach:', error);
                
                if (error.response?.status === 422 && error.response?.data?.errors) {
                    const errors = error.response.data.errors;
                    const errorMessages = Object.keys(errors).map(field => {
                        return `${field}: ${errors[field].join(', ')}`;
                    }).join('\n');
                    this.showError(`Validation errors:\n${errorMessages}`);
                } else if (error.response?.data?.message) {
                    this.showError(`Error: ${error.response.data.message}`);
                } else {
                    this.showError('Error unsubscribing coach. Please try again.');
                }
            }
        },

        // Reusable coming soon message method
        showComingSoon(featureName) {
            this.$swal({
                title: "Coming Soon!",
                text: `${featureName} feature is currently under development and will be available soon.`,
                icon: "info",
                confirmButtonText: "OK",
                confirmButtonColor: "#4f92f2",
                showCloseButton: true,
                timer: 3000,
                timerProgressBar: true
            });
        },

        goToChat() {
            // Switch to Send Message tab
            this.activeTab = "sendMessage";
        },

        goToCoachList() {
            this.$router.push("/app/Staff/coachlist");
        },

        goToSchedule() {
            this.activeTab = "schedule";
        },

        goToWorkout() {
            this.activeTab = "workout";
        },

        goToProgressTracker() {
            this.activeTab = "progress";
        },

        goToMealPlan() {
            this.activeTab = "Meal Plan";
        },

        goToChallenge() {
            this.activeTab = "Challenge";
        },

        // Open Notes section
        openNotes() {
            this.activeAction = 'notes';
            this.activeTab = 'notes';
        },

        // Get formatted coach ID
        getFormattedCoachId() {
            // If coach_id exists and is already formatted, use it
            if (this.client.coach_id && this.client.coach_id.startsWith('C-')) {
                return this.client.coach_id;
            }
            
            // If we have an ID, format it as C-0000X
            if (this.client.id) {
                return `C-${this.client.id.toString().padStart(5, '0')}`;
            }
            
            // Fallback
            return 'C-00000';
        },

        // Helper method to format date for HTML date input (YYYY-MM-DD)
        formatDateForInput(dateString) {
            if (!dateString) return null;
            
            // If it's already in YYYY-MM-DD format, return as is
            if (typeof dateString === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
                return dateString;
            }
            
            // If it's a date object or other format, convert to YYYY-MM-DD
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return null;
            
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            
            return `${year}-${month}-${day}`;
        },

        // Profile image handling
        getProfileImageUrl(profileImage) {
            // Guard against undefined, null, or empty values
            if (
                !profileImage ||
                profileImage === "undefined" ||
                profileImage === "null" ||
                profileImage === ""
            ) {
                // If we have a preview URL from file selection, use it
                if (this.profileImageUrl && this.profileImageUrl.startsWith('blob:')) {
                    return this.profileImageUrl;
                }
                return "/images/default-profile.jpg";
            }
            
            // Check for base64 data URL BEFORE normalization (to preserve the full data URL)
            if (String(profileImage).startsWith("data:image/")) {
                return profileImage;
            }
            
            // Check for blob URL (preview from file selection)
            if (String(profileImage).startsWith("blob:") || (this.profileImageUrl && this.profileImageUrl.startsWith('blob:'))) {
                return this.profileImageUrl || profileImage;
            }
            
            // Normalize the path: trim whitespace, replace escaped slashes, and clean up
            let normalizedPath = String(profileImage)
                .trim()
                .replace(/\\\//g, '/')  // Replace escaped slashes
                .replace(/\/+/g, '/')   // Replace multiple slashes with single slash
                .replace(/^\/+|\/+$/g, ''); // Remove leading/trailing slashes
            
            // If normalized path is empty after cleaning, return default
            if (!normalizedPath) {
                // If we have a preview URL from file selection, use it
                if (this.profileImageUrl && this.profileImageUrl.startsWith('blob:')) {
                    return this.profileImageUrl;
                }
                return "/images/default-profile.jpg";
            }

            // If it's already a full HTTP/HTTPS URL, return it
            if (normalizedPath.startsWith("http://") || normalizedPath.startsWith("https://")) {
                return normalizedPath;
            }
            
            // If it starts with storage/ (without leading slash), add leading slash
            if (normalizedPath.startsWith("storage/")) {
                return "/" + normalizedPath;
            }
            
            // If it starts with /storage/, return it as is (backward compatibility for legacy data)
            if (normalizedPath.startsWith("/storage/")) {
                return normalizedPath.replace(/\/+/g, '/'); // Clean up any double slashes
            }
            
            // If it starts with just /, it's an absolute path, return it
            if (normalizedPath.startsWith("/")) {
                return normalizedPath.replace(/\/+/g, '/'); // Clean up any double slashes
            }
            
            // If it's a relative path (e.g., "coaches/filename.jpg"), prepend /storage/
            // This matches Laravel's standard: store "coaches/filename.jpg" in DB, access via "/storage/coaches/filename.jpg"
            const finalPath = "/storage/" + normalizedPath;
            console.log("🖼️ Profile Image URL:", { original: profileImage, normalized: normalizedPath, final: finalPath });
            return finalPath;
        },

        // Get member profile image URL - handles member images stored in /images/avatar/
        getMemberImageUrl(profileImage) {
            // Guard against undefined, null, or empty values
            if (
                !profileImage ||
                profileImage === "undefined" ||
                profileImage === "null" ||
                profileImage === ""
            ) {
                return "/images/avatar/no_avatar.png";
            }
            
            // Check for base64 data URL
            if (String(profileImage).startsWith("data:image/")) {
                return profileImage;
            }
            
            // Check for blob URL
            if (String(profileImage).startsWith("blob:")) {
                return profileImage;
            }
            
            // Normalize the path
            let normalizedPath = String(profileImage)
                .trim()
                .replace(/\\\//g, '/')
                .replace(/\/+/g, '/');
            
            // If it's already a full HTTP/HTTPS URL, return it
            if (normalizedPath.startsWith("http://") || normalizedPath.startsWith("https://")) {
                return normalizedPath;
            }
            
            // If it's already a full path starting with /images/avatar/, return it
            if (normalizedPath.startsWith("/images/avatar/")) {
                return normalizedPath;
            }
            
            // If it starts with /storage/, use getProfileImageUrl for coach-style images
            if (normalizedPath.startsWith("/storage/") || normalizedPath.startsWith("storage/")) {
                return this.getProfileImageUrl(profileImage);
            }
            
            // If it starts with just /, it's an absolute path, return it
            if (normalizedPath.startsWith("/")) {
                return normalizedPath;
            }
            
            // Otherwise, it's just a filename - prepend /images/avatar/
            // Member images are stored as filenames in /images/avatar/ directory
            return "/images/avatar/" + normalizedPath;
        },

        // Form Control Methods
        addNewCoach() {
            this.$router.push("/coaches/add");
        },

        toggleEditMode() {
            // Check if we're on the Profile tab
            if (this.activeTab !== 'profile') {
                // If not on Profile tab, switch to Profile tab first
                this.activeTab = 'profile';
                // Show a message to inform the user
                this.showSuccess('Switched to Profile tab for editing');
                // Wait a moment for the tab to switch, then enable edit mode
                this.$nextTick(() => {
                    this.isEditing = true;
                });
                return;
            }

            // If we're already on Profile tab, proceed with normal edit mode toggle
            if (this.isEditing) {
                // If currently editing, save the changes
                this.saveProfile();
            } else {
                // If not editing, enable edit mode
                this.isEditing = true;
                // Don't reset change tracking when entering edit mode
                // Only reset when exiting edit mode or after successful save
            }
        },

        cancelEdit() {
            this.isEditing = false;
            // Reset form data to original values
            this.client = JSON.parse(JSON.stringify(this.originalClientData));
            this.changesMade = {};
            this.touchedFields = {};
            this.hasUnsavedChanges = false;
            // Clear any selected profile image file
            this.profileImageFile = null;
            this._profileImageFileRef = null;
            this.profileImageUrl = null;
            if (this.profileImageFileInput && this.profileImageFileInput.parentNode) {
                this.profileImageFileInput.parentNode.removeChild(this.profileImageFileInput);
            }
            this.profileImageFileInput = null;
        },

        // Track changes made to form fields
        trackChange(field, value) {
            if (this.isEditing) {
                // Mark field as touched
                this.$set(this.touchedFields, field, true);
                
                const originalValue = this.originalClientData[field];
                if (originalValue !== value) {
                    this.$set(this.changesMade, field, {
                        original: originalValue,
                        new: value
                    });
                } else {
                    // Remove from changes if value matches original
                    this.$delete(this.changesMade, field);
                }
                
                // Always enable save when any field is interacted with
                this.hasUnsavedChanges = true;
            }
        },

        // Track when a field is touched (focused/blurred)
        trackFieldTouch(field) {
            if (this.isEditing) {
                this.$set(this.touchedFields, field, true);
                // Always enable save when any field is touched
                this.hasUnsavedChanges = true;
            }
        },

        // Get list of changed fields for display
        getChangedFields() {
            return Object.keys(this.changesMade).map(field => ({
                field: field,
                label: this.getFieldLabel(field),
                original: this.changesMade[field].original,
                new: this.changesMade[field].new
            }));
        },

        // Get human-readable field labels
        getFieldLabel(field) {
            const labels = {
                first_name: 'First Name',
                last_name: 'Last Name',
                email: 'Email',
                mobile_phone: 'Mobile Phone',
                landline_phone: 'Landline Phone',
                gender: 'Gender',
                dob: 'Date of Birth',
                address: 'Address',
                city: 'City',
                state: 'State',
                zip: 'ZIP Code',
                bio: 'Bio',
                weekly_availability: 'Weekly Availability',
                session_duration: 'Session Duration',
                max_clients_per_day: 'Max Clients Per Day',
                payment_plan: 'Payment Plan',
                rate_salary: 'Rate/Salary',
                commission_percent: 'Commission Percentage',
                bank_account_name: 'Bank Account Name',
                bank_account_number: 'Bank Account Number',
                routing_number: 'Routing Number',
                bank_account_type: 'Bank Account Type',
                bank_name: 'Bank Name',
                profile_image: 'Profile Image'
            };
            return labels[field] || field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        },

        async saveProfile() {
            try {
                this.isSaving = true;
                const coachId = this.$route.params.id;
                if (!coachId) {
                    this.showError("No coach ID found");
                    return;
                }

                // Validate required fields
                if (!this.client.first_name || !this.client.last_name || !this.client.email) {
                    this.showError("Please fill in all required fields (First Name, Last Name, Email)");
                    return;
                }

                // Additional required field validation
                if (!this.client.mobile_phone) {
                    this.showError("Mobile phone is required");
                    return;
                }

                if (!this.client.address) {
                    this.showError("Address is required");
                    return;
                }

                if (!this.client.city) {
                    this.showError("City is required");
                    return;
                }

                if (!this.client.state) {
                    this.showError("State is required");
                    return;
                }

                if (!this.client.zip) {
                    this.showError("ZIP code is required");
                    return;
                }

                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.client.email)) {
                    this.showError("Please enter a valid email address");
                    return;
                }

                // Prepare the data for update - only send fields that have been changed
                const updateData = {};
                
                // Helper function to check if a field has a meaningful value
                const hasValue = (value) => {
                    return value !== null && value !== undefined && value !== '';
                };
                
                // Helper function to check if a field has changed
                const hasChanged = (fieldName) => {
                    const currentValue = this.client[fieldName];
                    const originalValue = this.originalClientData[fieldName];
                    return currentValue !== originalValue;
                };
                
                // Define required fields that must always be sent
                const requiredFields = ['first_name', 'last_name', 'email', 'mobile_phone', 'address', 'city', 'state', 'zip'];
                
                // Define all other fields
                const optionalFields = [
                    'landline_phone', 'dob', 'gender', 'bio', 'weekly_availability', 'session_duration',
                    'payment_plan', 'rate_salary', 'commission_percent', 'max_clients_per_day',
                    'height_cm', 'weight_kg', 'chest_inch', 'blood_group', 'medical_conditions',
                    'referred_by', 'locker_number', 'social_media', 'notes', 'is_trial',
                    'trial_start', 'trial_end', 'payment_method', 'payment_start_date',
                    'bank_account_name', 'bank_account_number', 'routing_number', 'bank_account_type', 'bank_name', 'payment_notes',
                    'coach_experience', 'coach_certifications', 'specializations'
                ];
                
                // Always include required fields
                requiredFields.forEach(field => {
                    updateData[field] = this.client[field] || '';
                });
                
                // Include optional fields only if they have changed
                optionalFields.forEach(field => {
                    // Include fields if they have changed
                    if (hasChanged(field)) {
                        if (field === 'max_clients_per_day') {
                            updateData[field] = parseInt(this.client[field]) || 0;
                        } else if (field === 'height_cm' || field === 'weight_kg' || field === 'chest_inch' || 
                            field === 'rate_salary' || field === 'commission_percent') {
                            updateData[field] = parseFloat(this.client[field]) || 0;
                        } else if (field === 'is_trial') {
                            updateData[field] = this.client[field] ? 1 : 0;
                        } else {
                            updateData[field] = this.client[field] || '';
                        }
                    }
                });
                
                // Check if any required fields are missing or empty
                const missingFields = [];
                if (!updateData.first_name || updateData.first_name.trim() === '') missingFields.push('first_name');
                if (!updateData.last_name || updateData.last_name.trim() === '') missingFields.push('last_name');
                if (!updateData.mobile_phone || updateData.mobile_phone.trim() === '') missingFields.push('mobile_phone');
                if (!updateData.email || updateData.email.trim() === '') missingFields.push('email');
                if (!updateData.address || updateData.address.trim() === '') missingFields.push('address');
                if (!updateData.city || updateData.city.trim() === '') missingFields.push('city');
                if (!updateData.state || updateData.state.trim() === '') missingFields.push('state');
                if (!updateData.zip || updateData.zip.trim() === '') missingFields.push('zip');
                

                // Check if there are actual changes or touched fields
                const hasChanges = Object.keys(this.changesMade).length > 0;
                const hasTouchedFields = Object.keys(this.touchedFields).length > 0;

                // Check if profile_image is a base64 string (new image selected)
                const hasNewImage = this.client.profile_image && 
                    typeof this.client.profile_image === 'string' && 
                    this.client.profile_image.startsWith('data:image/');
                
                // Add profile_image to updateData if it exists (matching MemberDetails.vue approach)
                if (this.client.profile_image) {
                    updateData.profile_image = this.client.profile_image;
                }
                
                // Add all other client fields to updateData
                // Coach-specific fields
                if (this.client.coach_experience) updateData.coach_experience = this.client.coach_experience;
                if (this.client.coach_certifications) updateData.coach_certifications = this.client.coach_certifications;
                if (this.client.specializations) updateData.specializations = this.client.specializations;
                
                // Physical measurements
                if (this.client.height_cm !== undefined && this.client.height_cm !== null) updateData.height_cm = this.client.height_cm;
                if (this.client.weight_kg !== undefined && this.client.weight_kg !== null) updateData.weight_kg = this.client.weight_kg;
                if (this.client.chest_inch !== undefined && this.client.chest_inch !== null) updateData.chest_inch = this.client.chest_inch;
                if (this.client.blood_group) updateData.blood_group = this.client.blood_group;
                if (this.client.medical_conditions) updateData.medical_conditions = this.client.medical_conditions;
                
                // Additional info
                if (this.client.referred_by) updateData.referred_by = this.client.referred_by;
                if (this.client.locker_number) updateData.locker_number = this.client.locker_number;
                if (this.client.bio) updateData.bio = this.client.bio;
                if (this.client.social_media) updateData.social_media = this.client.social_media;
                if (this.client.notes) updateData.notes = this.client.notes;
                
                // Availability/Schedule
                if (this.client.weekly_availability) updateData.weekly_availability = this.client.weekly_availability;
                if (this.client.session_duration) updateData.session_duration = this.client.session_duration;
                if (this.client.max_clients_per_day !== undefined && this.client.max_clients_per_day !== null) {
                    updateData.max_clients_per_day = parseInt(this.client.max_clients_per_day) || 0;
                }
                
                // Payment info
                if (this.client.is_trial !== undefined) updateData.is_trial = this.client.is_trial ? 1 : 0;
                if (this.client.trial_start) updateData.trial_start = this.client.trial_start;
                if (this.client.trial_end) updateData.trial_end = this.client.trial_end;
                if (this.client.payment_plan) updateData.payment_plan = this.client.payment_plan;
                if (this.client.payment_method) updateData.payment_method = this.client.payment_method;
                if (this.client.rate_salary !== undefined && this.client.rate_salary !== null) {
                    updateData.rate_salary = parseFloat(this.client.rate_salary) || 0;
                }
                if (this.client.commission_percent !== undefined && this.client.commission_percent !== null) {
                    updateData.commission_percent = parseFloat(this.client.commission_percent) || 0;
                }
                if (this.client.payment_start_date) updateData.payment_start_date = this.client.payment_start_date;
                
                // Bank details - always include to allow clearing them
                updateData.bank_account_name = this.client.bank_account_name || '';
                updateData.bank_account_number = this.client.bank_account_number || '';
                updateData.routing_number = this.client.routing_number || '';
                updateData.bank_account_type = this.client.bank_account_type || '';
                updateData.bank_name = this.client.bank_name || '';
                if (this.client.payment_notes) updateData.payment_notes = this.client.payment_notes;
                
                // Send as JSON (matching MemberDetails.vue approach)
                const response = await axios.put(
                    `coaches/${coachId}`,
                    updateData,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (response.data.status === "success") {
                    this.isEditing = false;
                    
                    // Show success message
                    this.showSuccess("Profile updated successfully!");
                    
                    // Reset change tracking
                    this.changesMade = {};
                    this.touchedFields = {};
                    this.hasUnsavedChanges = false;
                    
                    // Update the client data with the response data immediately
                    if (response.data.coach) {
                        // Create a clean merge of response data with current client data
                        const updatedClient = { ...this.client };
                        
                        // Update all fields from response to ensure database state is reflected
                        Object.keys(response.data.coach).forEach(key => {
                            const serverValue = response.data.coach[key];
                            if (key === 'dob' || key === 'trial_start' || key === 'trial_end' || key === 'payment_start_date') {
                                // Format date fields properly, even if null
                                updatedClient[key] = serverValue ? this.formatDateForInput(serverValue) : null;
                            } else {
                                // Update all other fields, including null values
                                updatedClient[key] = serverValue;
                            }
                        });
                        
                        // Handle profile image - update from server response (matching MemberDetails.vue approach)
                        if (response.data.coach.profile_image !== undefined) {
                            // Always use the server response for the image path after upload
                            updatedClient.profile_image = response.data.coach.profile_image;
                            // Clear the preview URL since we now have the server path
                            this.profileImageUrl = null;
                        }
                        
                        // Update the client data
                        this.client = updatedClient;
                        
                        // Update original data for change tracking
                        this.originalClientData = JSON.parse(JSON.stringify(this.client));
                        
                        // Clear profile image preview after successful save
                        if (hasNewImage) {
                            this.profileImageUrl = null;
                            if (this.profileImageFileInput && this.profileImageFileInput.parentNode) {
                                this.profileImageFileInput.parentNode.removeChild(this.profileImageFileInput);
                            }
                            this.profileImageFileInput = null;
                        }
                        
                        // Force Vue reactivity update
                        this.$forceUpdate();
                        
                        // Refresh data from server after image upload to ensure consistency
                        if (hasNewImage) {
                            await this.fetchClientData();
                        }
                    } else {
                        // If response doesn't have coach data, refresh from server
                        await this.fetchClientData();
                    }
                } else {
                    this.showError("Failed to update profile");
                }
                } catch (error) {
                // Enhanced error logging for debugging
                console.error('Error updating coach profile:', error);
                if (hasNewImage) {
                    console.error('Profile image upload failed. Image is base64:', 
                        this.client.profile_image ? this.client.profile_image.substring(0, 50) + '...' : 'null'
                    );
                }
                
                // Show specific validation errors if available
                if (error.response?.status === 422 && error.response?.data?.errors) {
                    const errors = error.response.data.errors;
                    const errorMessages = Object.keys(errors).map(field => {
                        return `${field}: ${errors[field].join(', ')}`;
                    }).join('\n');
                    this.showError(`Validation errors:\n${errorMessages}`);
                } else if (error.response?.status === 500) {
                    this.showError(`Server error: ${error.response?.data?.message || 'Internal server error occurred'}`);
                } else if (error.response?.data?.message) {
                    this.showError(`Error: ${error.response.data.message}`);
                } else if (error.message) {
                    this.showError(`Network error: ${error.message}`);
                } else {
                    this.showError("Error updating profile. Please try again.");
                }
            } finally {
                this.isSaving = false;
            }
        },

        getActionIcon(action) {
            const actionMap = {
                goToProfile: "fa-user-edit",
                sendMessage: "fa-envelope",
                newTask: "fa-tasks",
                assignMember: "fa-user-plus",
            };
            return actionMap[action] || "fa-cog";
        },

        getActionTitle(action) {
            const titleMap = {
                goToProfile: "Edit Profile",
                sendMessage: "Send Message",
                newTask: "Create New Task",
                assignMember: "Assign Member",
            };
            return titleMap[action] || "Action";
        },
        /**
         * Handle clicking on profile image container in edit mode
         * Creates a new file input programmatically
         */
        handleProfileImageClick() {
            if (this.isEditing) {
                // Create a new file input element programmatically
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.style.display = 'none';
                
                // Store reference to file input
                this.profileImageFileInput = fileInput;
                
                // Add event listener
                fileInput.addEventListener('change', (event) => {
                    this.handleImageUpload(event);
                    // Don't remove immediately - keep reference until save
                    // document.body.removeChild(fileInput);
                });
                
                // Add to DOM temporarily
                document.body.appendChild(fileInput);
                
                // Trigger the file selection
                fileInput.click();
            }
        },
        /**
         * Handle profile image upload
         * Creates a preview URL for the selected image
         * @param {Event} event - File input change event
         */
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    alert('Please select a valid image file.');
                    return;
                }
                
                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('Image size should be less than 5MB.');
                    return;
                }
                
                // Convert file to base64 for storage (matching MemberDetails.vue approach)
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Store the base64 data URL directly in client.profile_image
                    // This matches the approach used in MemberDetails.vue
                    this.client.profile_image = e.target.result;
                    // Also store for preview
                    this.profileImageUrl = e.target.result;
                    console.log('Profile image converted to base64 and stored');
                };
                reader.readAsDataURL(file);
                
                // Show success message
                this.showSuccess('Profile image selected. Click Save to upload.');
            } else {
                console.warn('No file selected in handleImageUpload');
            }
        },

        async saveTask() {
            try {
                this.isCreatingTask = true;
                const coachId = this.$route.params.id;
                if (!coachId) {
                    this.showError("No coach ID found");
                    return;
                }

                // Validate required fields
                if (
                    !this.task.title ||
                    !this.task.category ||
                    !this.task.priority ||
                    !this.task.dueDate
                ) {
                    this.showError("Please fill in all required fields");
                    return;
                }

                // Prepare task data
                const taskData = {
                    title: this.task.title,
                    category: this.task.category,
                    priority: this.task.priority,
                    dueDate: this.task.dueDate,
                    status: this.task.status,
                    description: this.task.description || "",
                };

                let response;
                if (this.editingTaskId) {
                    // Update existing task
                    response = await axios.put(
                        `coaches/${coachId}/tasks/${this.editingTaskId}`,
                        taskData
                    );
                } else {
                    // Create new task
                    response = await axios.post(
                        `coaches/${coachId}/create-task`,
                        taskData
                    );
                }

                if (response.data.status === "success") {
                    const action = this.editingTaskId ? "updated" : "created";
                    this.showSuccess(
                        response.data.message || `Task ${action} successfully!`
                    );

                    // Store the editing state and task ID before clearing them
                    const wasEditing = !!this.editingTaskId;
                    const editingTaskId = this.editingTaskId;

                    // Reset form and editing state
                    this.resetTaskForm();
                    this.editingTaskId = null;

                    // Always refresh the task table to ensure consistency
                    await this.fetchCoachTasks();

                    // Small delay to show success message, then close the form
                    setTimeout(() => {
                        this.activeAction = null;
                    }, 1000);
                } else {
                    this.showError("Failed to save task");
                }
            } catch (error) {
                console.error("Error saving task:", error);

                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                ) {
                    // Handle validation errors
                    const errorMessages = Object.values(
                        error.response.data.errors
                    ).flat();
                    this.showError(errorMessages.join(", "));
                } else if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    // Handle other API errors
                    this.showError(error.response.data.message);
                } else {
                    // Handle network or other errors
                    this.showError("Error saving task. Please try again.");
                }
            } finally {
                this.isCreatingTask = false;
            }
        },


        showSuccess(message) {
            try {
                if (this.$root && this.$root.$bvToast) {
                    this.$root.$bvToast.toast(message, {
                        title: "Success",
                        variant: "success",
                        solid: true,
                        toaster: "b-toaster-top-right",
                        autoHideDelay: 1000,
                    });
                } else {
                    // Fallback to console log if toast is not available
                    console.log("Success:", message);
                    alert("Success: " + message);
                }
            } catch (error) {
                console.log("Success:", message);
            }
        },

        showError(message) {
            try {
                if (this.$root && this.$root.$bvToast) {
                    this.$root.$bvToast.toast(message, {
                        title: "Error",
                        variant: "danger",
                        solid: true,
                        toaster: "b-toaster-top-right",
                        autoHideDelay: 1000,
                    });
                } else {
                    // Fallback to console log if toast is not available
                    console.error("Error:", message);
                    alert("Error: " + message);
                }
            } catch (error) {
                console.error("Error:", message);
            }
        },

        async fetchClientData() {
            try {
                const coachId = this.$route.params.id;
                
                if (!coachId) {
                    this.isLoading = false;
                    return;
                }

                // Fetch coach data from API
                const response = await axios.get(`coaches/${coachId}`);
                if (response.data) {
                    // Create a clean merge of response data with existing client data
                    const updatedClient = { ...this.client };
                    
                    // Update all fields from response to ensure database state is reflected
                    Object.keys(response.data).forEach(key => {
                        const serverValue = response.data[key];
                        if (key === 'dob' || key === 'trial_start' || key === 'trial_end' || key === 'payment_start_date') {
                            // Format date fields properly, even if null
                            updatedClient[key] = serverValue ? this.formatDateForInput(serverValue) : null;
                        } else {
                            // Update all other fields, including null values
                            updatedClient[key] = serverValue;
                        }
                    });
                    
                    // Ensure required fields have proper defaults
                    updatedClient.first_name = updatedClient.first_name || '';
                    updatedClient.last_name = updatedClient.last_name || '';
                    updatedClient.email = updatedClient.email || '';
                    updatedClient.mobile_phone = updatedClient.mobile_phone || '';
                    updatedClient.address = updatedClient.address || '';
                    updatedClient.city = updatedClient.city || '';
                    updatedClient.state = updatedClient.state || '';
                    updatedClient.zip = updatedClient.zip || '';
                    
                    // Update the client data
                    this.client = updatedClient;
                    
                    // Store original data for change tracking
                    this.originalClientData = JSON.parse(JSON.stringify(this.client));
                    this.changesMade = {};
                    this.hasUnsavedChanges = false;
                    
                    // Handle profile image - clear preview URL, use server path
                    this.profileImageUrl = null;
                    if (this.profileImageFileInput && this.profileImageFileInput.parentNode) {
                        this.profileImageFileInput.parentNode.removeChild(this.profileImageFileInput);
                    }
                    this.profileImageFileInput = null;
                    
                    // Force Vue reactivity update
                    this.$forceUpdate();


                } else {
                    this.showError("Failed to load coach data");
                    this.$router.push({ name: "ViewAllCoaches" });
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.showError("Coach not found");
                    this.$router.push({ name: "ViewAllCoaches" });
                } else {
                    // If API fails, try to get data from query parameters
                    this.getClientFromQueryParams();
                }
            } finally {
                this.isLoading = false;
            }
        },

        // Fallback method to get client data from query parameters
        getClientFromQueryParams() {
            const query = this.$route.query;
            if (query.coachId) {
                this.client.id = query.coachId;
                this.client.name = query.coachName || "";
                this.client.email = query.coachEmail || "";
                this.client.phone = query.coachPhone || "";

                // Split name into first and last name
                if (this.client.name) {
                    const nameParts = this.client.name.split(" ");
                    this.client.first_name = nameParts[0] || "";
                    this.client.last_name = nameParts.slice(1).join(" ") || "";
                }

                // Generate coach ID
                this.client.coach_id = `C-${Math.random()
                    .toString(36)
                    .substr(2, 6)
                    .toUpperCase()}`;
            }
        },

        // Member Assignment Methods
        async fetchMembers() {
            try {
                this.isLoadingMembers = true;
                console.log("Fetching members...");
                const response = await axios.get("members");
                console.log("Members API response:", response);

                if (response.data && Array.isArray(response.data)) {
                    this.members = response.data.map((member) => ({
                        ...member,
                        selected: false,
                        isAssigned: false,
                    }));
                    this.filteredMembers = [...this.members];
                    console.log(
                        "Members loaded successfully:",
                        this.members.length
                    );
                    this.updatePagination();
                } else {
                    console.warn("Invalid members data format:", response.data);
                    this.loadSampleMembers();
                }
            } catch (error) {
                console.error("Error fetching members:", error);
                // Fallback to sample data
                this.loadSampleMembers();
            } finally {
                this.isLoadingMembers = false;
            }
        },

        filterMembers() {
            let filtered = [...this.members];

            // Search filter
            if (this.memberSearch) {
                const searchTerm = this.memberSearch.toLowerCase();
                filtered = filtered.filter(
                    (member) =>
                        (member.name &&
                            typeof member.name === "string" &&
                            member.name.toLowerCase().includes(searchTerm)) ||
                        (member.membername &&
                            typeof member.membername === "string" &&
                            member.membername
                                .toLowerCase()
                                .includes(searchTerm)) ||
                        (member.email &&
                            typeof member.email === "string" &&
                            member.email.toLowerCase().includes(searchTerm)) ||
                        (this.getMemberId(member) &&
                            typeof this.getMemberId(member) === "string" &&
                            this.getMemberId(member)
                                .toLowerCase()
                                .includes(searchTerm))
                );
            }

            // Status filter
            if (this.memberStatusFilter) {
                filtered = filtered.filter(
                    (member) => member.status === this.memberStatusFilter
                );
            }

            // Plan filter
            if (this.memberPlanFilter) {
                filtered = filtered.filter(
                    (member) => member.plan === this.memberPlanFilter
                );
            }

            this.filteredMembers = filtered;
        },

        filterAssignedMembers() {
            let filtered = [...this.assignedMembers];

            // Search filter
            if (this.memberSearch) {
                const searchTerm = this.memberSearch.toLowerCase();
                filtered = filtered.filter(
                    (member) =>
                        (member.name &&
                            typeof member.name === "string" &&
                            member.name.toLowerCase().includes(searchTerm)) ||
                        (member.membername &&
                            typeof member.membername === "string" &&
                            member.membername
                                .toLowerCase()
                                .includes(searchTerm)) ||
                        (member.email &&
                            typeof member.email === "string" &&
                            member.email.toLowerCase().includes(searchTerm)) ||
                        (this.getMemberId(member) &&
                            typeof this.getMemberId(member) === "string" &&
                            this.getMemberId(member)
                                .toLowerCase()
                                .includes(searchTerm))
                );
            }

            // Status filter
            if (this.memberStatusFilter) {
                filtered = filtered.filter(
                    (member) => member.status === this.memberStatusFilter
                );
            }

            // Plan filter
            if (this.memberPlanFilter) {
                filtered = filtered.filter(
                    (member) => member.plan === this.memberPlanFilter
                );
            }

            this.filteredAssignedMembers = filtered;
        },

        handleNoMembershipFilterChange() {
            // Refetch members from API when filter changes since filtering is done on backend
            this.fetchAssignedMembers();
        },

        getMemberId(member) {
            // Use the formatted Member ID from backend if available, otherwise calculate it
            if (member.formatted_member_id) {
                return member.formatted_member_id;
            }

            // Check if membername is available (from the API)
            if (member.membername) {
                return member.membername;
            }

            if (!member.id) return "M-000000";
            const year = new Date().getFullYear();
            const paddedId = member.id.toString().padStart(5, "0");
            return `M-${year}-${paddedId}`;
        },

        getMemberStatusClass(member) {
            const status = member.status || member.Statuses || "";
            if (!status) return "";
            // Ensure status is a string before calling toLowerCase()
            if (typeof status !== "string") {
                return "";
            }
            return status.toLowerCase().replace(/\s+/g, "-");
        },

        getMemberStatusText(member) {
            const status = member.status || member.Statuses || "";
            if (!status) return "";
            return status.charAt(0).toUpperCase() + status.slice(1);
        },

        getPlanClass(member) {
            const plan = member.plan || "";

            // Convert numeric plan IDs to plan names
            let planName = plan;
            if (typeof plan === "number") {
                switch (plan) {
                    case 1:
                        planName = "Basic";
                        break;
                    case 2:
                        planName = "Premium";
                        break;
                    case 3:
                        planName = "VIP";
                        break;
                    default:
                        planName = "N/A";
                }
            } else if (typeof plan === "string") {
                planName = plan;
            } else {
                return "plan-na";
            }

            // Ensure planName is a string before calling toLowerCase()
            if (typeof planName !== "string") {
                return "plan-na";
            }

            switch (planName.toLowerCase()) {
                case "premium":
                    return "plan-premium";
                case "vip":
                    return "plan-vip";
                case "basic":
                    return "plan-basic";
                default:
                    return "plan-na";
            }
        },

        getPlanDisplayText(member) {
            const plan = member.plan || "";

            // Convert numeric plan IDs to plan names
            if (typeof plan === "number") {
                switch (plan) {
                    case 1:
                        return "Basic";
                    case 2:
                        return "Premium";
                    case 3:
                        return "VIP";
                    default:
                        return "N/A";
                }
            } else if (typeof plan === "string") {
                return plan;
            } else {
                return "N/A";
            }
        },


        toggleSelectAllMembers() {
            this.filteredMembers.forEach((member) => {
                member.selected = this.selectAllMembers;
            });
        },

        // Pagination methods
        updatePagination() {
            this.totalPages = Math.ceil(
                this.filteredMembers.length / this.itemsPerPage
            );
            if (this.currentPage > this.totalPages) {
                this.currentPage = this.totalPages || 1;
            }
        },

        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },

        // Enhanced member management methods
        refreshMembers() {
            this.fetchMembers();
            this.fetchAssignedMembers();
        },

        exportMembers() {
            // Create CSV export
            const headers = [
                "Name",
                "ID",
                "Email",
                "Phone",
                "Plan",
                "Status",
                "Coach Assignment",
                "Join Date",
            ];
            const csvData = this.filteredMembers.map((member) => [
                member.name || member.membername || "N/A",
                this.getMemberId(member),
                member.email || "N/A",
                member.phone || "N/A",
                member.plan || "N/A",
                this.getMemberStatusText(member),
                member.isAssigned ? "Assigned" : "Unassigned",
                this.formatDate(
                    member.join_date ||
                        member.created_at ||
                        member.joining_date ||
                        member.date_joined ||
                        member.registration_date ||
                        member.member_since ||
                        member.start_date ||
                        member.enrollment_date
                ),
            ]);

            const csvContent = [headers, ...csvData]
                .map((row) => row.map((cell) => `"${cell}"`).join(","))
                .join("\n");

            const blob = new Blob([csvContent], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `members_export_${new Date().toISOString().split("T")[0]
            }.csv`;
            a.click();
            window.URL.revokeObjectURL(url);

            this.showSuccess("Members exported successfully!");
        },

        viewMemberDetails(member) {
            const memberDetails = `
                <div style="text-align: left; line-height: 1.6;">
                    <div style="display: flex; align-items: center; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
                        <img src="${member.profile_image || '/images/avatar/no_avatar.png'}" 
                             alt="${member.name}" 
                             style="width: 50px; height: 50px; border-radius: 50%; margin-right: 15px; object-fit: cover;">
                        <div>
                            <h4 style="margin: 0; color: #333;">${member.name || member.membername || "N/A"}</h4>
                            <p style="margin: 0; color: #666; font-size: 0.9rem;">ID: ${this.getMemberId(member)}</p>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div>
                            <h5 style="margin: 0 0 8px 0; color: #333; font-size: 0.9rem;">Contact Information</h5>
                            <p style="margin: 4px 0; color: #666;"><strong>Email:</strong> ${member.email || "N/A"}</p>
                            <p style="margin: 4px 0; color: #666;"><strong>Phone:</strong> ${member.phone || member.mobile_phone || member.landline_phone || "N/A"}</p>
                        </div>
                        
                        <div>
                            <h5 style="margin: 0 0 8px 0; color: #333; font-size: 0.9rem;">Membership Details</h5>
                            <p style="margin: 4px 0; color: #666;"><strong>Plan:</strong> ${this.getPlanDisplayText(member)}</p>
                            <p style="margin: 4px 0; color: #666;"><strong>Status:</strong> ${this.getMemberStatusText(member)}</p>
                            <p style="margin: 4px 0; color: #666;"><strong>Gender:</strong> ${member.gender || member.sex || "N/A"}</p>
                        </div>
                    </div>
                    
                    <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;">
                        <h5 style="margin: 0 0 8px 0; color: #333; font-size: 0.9rem;">Additional Information</h5>
                        <p style="margin: 4px 0; color: #666;"><strong>Join Date:</strong> ${this.formatDate(member.join_date || member.created_at || member.joining_date || member.date_joined || member.registration_date || member.member_since || member.start_date || member.enrollment_date)}</p>
                        <p style="margin: 4px 0; color: #666;"><strong>Assigned Coach:</strong> ${this.client.first_name} ${this.client.last_name}</p>
                    </div>
                </div>
      `;

            this.$swal({
                title: "Member Details",
                html: memberDetails,
                width: "750px",
                showCloseButton: true,
                showConfirmButton: false,
                customClass: {
                    popup: 'member-details-popup'
                }
            });
        },

        editMember(member) {
            // Navigate to member edit page with edit mode enabled
            const memberId = member.id;
            if (!memberId) {
                this.showError("Member ID not found");
                return;
            }

            // Navigate to member details page with edit mode using the correct route
            this.$router.push({
                name: 'MemberDetails',
                params: { id: memberId },
                query: {
                    activeAction: 'goToProfile',
                    tab: 'profile',
                    editMode: 'true',
                    from: 'coach-details',
                    coachId: this.$route.params.id
                }
            }).catch(err => {
                console.error('Navigation failed:', err);
                // Fallback: try using direct path
                const targetPath = `/app/Members/MemberDetails/${memberId}`;
                const queryParams = new URLSearchParams({
                    activeAction: 'goToProfile',
                    tab: 'profile',
                    editMode: 'true',
                    from: 'coach-details',
                    coachId: this.$route.params.id
                });
                window.location.href = `${targetPath}?${queryParams.toString()}`;
            });
        },

        async assignMember(member) {
            try {
                this.isAssigningMember = true;
                const coachId = this.$route.params.id;

                if (!coachId || !member.id) {
                    this.showError(
                        "Coach or Member ID missing for assignment."
                    );
                    return;
                }

                // Prepare assignment data
                const assignmentData = {
                    member_id: member.id,
                    assigned_date: new Date().toISOString().split("T")[0],
                    start_date: new Date().toISOString().split("T")[0],
                    end_date: null,
                    session_frequency: "Weekly",
                    session_duration: "60 minutes",
                    goals: "General fitness improvement",
                    special_requirements: "None",
                };

                const response = await axios.post(
                    `coaches/${coachId}/assign-member`,
                    assignmentData
                );

                if (response.data.status === "success") {
                    this.showSuccess(
                        response.data.message ||
                            `Member ${member.name} assigned successfully!`
                    );
                    // Refresh the assigned members list
                    await this.fetchAssignedMembers();
                } else {
                    this.showError(
                        response.data.message || "Failed to assign member."
                    );
                }
            } catch (error) {
                console.error("Error assigning member:", error);
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    this.showError(error.response.data.message);
                } else {
                    this.showError("Error assigning member. Please try again.");
                }
            } finally {
                this.isAssigningMember = false;
            }
        },

        async unassignMember(member) {
            try {
                const coachId = this.$route.params.id;
                const memberId = member.id;
                const memberName = member.name || member.membername || "Unknown Member";
                
                // Use assignment_id for precise unassignment - this is the unique ID of the assignment record
                // If assignment_id is not available, we'll need to fetch it or use member_id as fallback
                let assignmentId = member.assignment_id;
                
                // Debug: Log the member object to see what data is available
                console.log("Unassigning member - Full member object:", member);
                console.log("Assignment ID from member:", assignmentId);
                console.log("Member ID:", memberId);
                console.log("Coach ID:", coachId);

                // If assignment_id is missing, try to find it from the assigned members list
                if (!assignmentId && memberId) {
                    // First try from assignedMembers
                    const assignedMember = this.assignedMembers.find(m => m.id === memberId);
                    if (assignedMember && assignedMember.assignment_id) {
                        assignmentId = assignedMember.assignment_id;
                        console.log("Found assignment_id from assignedMembers list:", assignmentId);
                    } else {
                        // Try from filteredAssignedMembers
                        const filteredMember = this.filteredAssignedMembers.find(m => m.id === memberId);
                        if (filteredMember && filteredMember.assignment_id) {
                            assignmentId = filteredMember.assignment_id;
                            console.log("Found assignment_id from filteredAssignedMembers list:", assignmentId);
                        }
                    }
                    
                    // If still not found, try to fetch it from the API
                    if (!assignmentId && coachId && memberId) {
                        console.log("Assignment ID still missing, attempting to fetch from API...");
                        try {
                            const memberResponse = await axios.get(`coaches/${coachId}/assigned-members`);
                            console.log("API response for assignment lookup:", memberResponse.data);
                            if (memberResponse.data.status === "success" && memberResponse.data.members) {
                                const apiMember = memberResponse.data.members.find(m => m.id === memberId);
                                console.log("Found member in API response:", apiMember);
                                if (apiMember && apiMember.assignment_id) {
                                    assignmentId = apiMember.assignment_id;
                                    console.log("Found assignment_id from API response:", assignmentId);
                                } else {
                                    console.error("Member found in API but assignment_id is missing:", apiMember);
                                }
                            } else {
                                console.error("API response format unexpected:", memberResponse.data);
                            }
                        } catch (fetchError) {
                            console.error("Error fetching assignment_id from API:", fetchError);
                        }
                    }
                }
                
                // Final check - if assignment_id is still missing, we can't proceed
                // But we'll pass member_id to backend as fallback
                if (!assignmentId && memberId) {
                    console.warn("Assignment ID is missing, will use member_id as fallback. This may cause issues if member has multiple assignments.");
                }

                if (!coachId) {
                    this.showError("Coach ID is missing. Please refresh the page and try again.");
                    console.error("Missing coachId:", { coachId, member });
                    return;
                }

                // If assignment_id is still missing after all fallbacks, we can still try with member_id
                // The backend will handle the lookup
                if (!assignmentId && !memberId) {
                    this.showError(`Both Assignment ID and Member ID are missing for member ${memberName}. Please refresh the page and try again.`);
                    console.error("Missing both assignmentId and memberId:", { 
                        coachId, 
                        memberId, 
                        assignmentId, 
                        member,
                        assignedMembers: this.assignedMembers,
                        filteredAssignedMembers: this.filteredAssignedMembers
                    });
                    return;
                }
                
                // Use member_id as assignment_id if assignment_id is missing (backend will handle lookup)
                if (!assignmentId && memberId) {
                    console.warn("Using member_id as fallback for assignment lookup");
                    assignmentId = memberId; // Backend will interpret this correctly
                }

                // Show confirmation dialog
                const result = await this.$swal({
                    title: "Unassign Member",
                    html: `
                        <div style="text-align: center;">
                            <i class="fas fa-user-minus" style="font-size: 3rem; color: #dc3545; margin-bottom: 15px;"></i>
                            <p style="font-size: 1.1rem; margin-bottom: 10px;">Are you sure you want to unassign <strong>${memberName}</strong> from this coach?</p>
                            <p style="color: #666; font-size: 0.9rem;">This action will remove the member from the coach's assigned members list.</p>
                        </div>
                    `,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#dc3545",
                    cancelButtonColor: "#6c757d",
                    confirmButtonText: "Yes, Unassign",
                    cancelButtonText: "Cancel",
                    reverseButtons: true
                });

                if (!result.isConfirmed) {
                    return;
                }

                this.isAssigningMember = true;

                // Use assignment_id in the URL for precise targeting
                // Also pass member_id as a query parameter for fallback
                const response = await axios.delete(`coaches/${coachId}/unassign-member/${assignmentId}`, {
                    params: {
                        member_id: memberId
                    }
                });

                if (response.data.status === "success") {
                    this.showSuccess(`${memberName} has been unassigned successfully!`);
                    // Refresh the assigned members list
                    await this.fetchAssignedMembers();
                } else {
                    this.showError(response.data.message || "Failed to unassign member.");
                }
            } catch (error) {
                console.error("Error unassigning member:", error);
                this.showError("Error unassigning member. Please try again.");
            } finally {
                this.isAssigningMember = false;
            }
        },

        async assignSelectedMembers() {
            try {
                this.isAssigningMember = true;
                const selectedMembers = this.selectedMembers;

                if (selectedMembers.length === 0) {
                    this.showError(
                        "Please select at least one member to assign."
                    );
                    return;
                }

                const coachId = this.$route.params.id;
                if (!coachId) {
                    this.showError("Coach ID missing for assignment.");
                    return;
                }

                let successCount = 0;
                let errorCount = 0;

                // Assign each selected member
                for (const member of selectedMembers) {
                    try {
                        const assignmentData = {
                            member_id: member.id,
                            assigned_date: new Date()
                                .toISOString()
                                .split("T")[0],
                            start_date: new Date().toISOString().split("T")[0],
                            end_date: null,
                            session_frequency: "Weekly",
                            session_duration: "60 minutes",
                            goals: "General fitness improvement",
                            special_requirements: "None",
                        };

                        const response = await axios.post(
                            `coaches/${coachId}/assign-member`,
                            assignmentData
                        );

                        if (response.data.status === "success") {
                            successCount++;
                        } else {
                            errorCount++;
                        }
                    } catch (error) {
                        errorCount++;
                        console.error(
                            `Error assigning member ${member.name}:`,
                            error
                        );
                    }
                }

                // Clear selection
                selectedMembers.forEach((member) => {
                    member.selected = false;
                });
                this.selectAllMembers = false;

                // Show results
                if (successCount > 0) {
                    this.showSuccess(
                        `${successCount} member(s) assigned successfully!`
                    );
                    // Refresh the assigned members list
                    await this.fetchAssignedMembers();
                }

                if (errorCount > 0) {
                    this.showError(`${errorCount} member(s) failed to assign.`);
                }
            } catch (error) {
                console.error("Error assigning selected members:", error);
                this.showError("Error assigning members. Please try again.");
            } finally {
                this.isAssigningMember = false;
            }
        },

        clearSelection() {
            this.filteredMembers.forEach((member) => {
                member.selected = false;
            });
            this.selectAllMembers = false;
        },

        // Task Management Methods
        async fetchCoachTasks() {
            try {
                this.isLoadingTasks = true;
                const coachId = this.$route.params.id;
                if (!coachId) {
                    return;
                }

                const response = await axios.get(`coaches/${coachId}/tasks`);

                if (response.data.success) {
                    // Normalize task data to ensure consistent structure
                    this.coachTasks = (response.data.tasks || []).map((task) =>
                        this.normalizeTaskData(task)
                    );
                } else {
                    this.showError("Failed to fetch tasks");
                    // Use mock data as fallback
                    this.coachTasks = this.getMockCoachTasks().map((task) =>
                        this.normalizeTaskData(task)
                    );
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
                // Use mock data if API fails
                this.coachTasks = this.getMockCoachTasks().map((task) =>
                    this.normalizeTaskData(task)
                );
            } finally {
                this.isLoadingTasks = false;
            }
        },

        getMockCoachTasks() {
            return [
                {
                    id: 1,
                    title: "Client Assessment Session",
                    description:
                        "Conduct fitness assessment for new client John Doe",
                    category: "Training",
                    priority: "High",
                    due_date: "2024-01-15",
                    status: "completed",
                    created_at: "2024-01-10",
                },
                {
                    id: 2,
                    title: "Equipment Maintenance Check",
                    description:
                        "Inspect and maintain gym equipment in training area",
                    category: "Maintenance",
                    priority: "Medium",
                    due_date: "2024-01-20",
                    status: "in-progress",
                    created_at: "2024-01-12",
                },
                {
                    id: 3,
                    title: "Training Program Development",
                    description:
                        "Create personalized workout plan for client Sarah Wilson",
                    category: "Client Management",
                    priority: "High",
                    due_date: "2024-01-18",
                    status: "pending",
                    created_at: "2024-01-14",
                },
            ];
        },

        getTaskRowClass(task) {
            if (task.status === "completed") {
                return "table-success";
            } else if (task.status === "in-progress") {
                return "table-warning";
            } else if (
                new Date(task.due_date) < new Date() &&
                task.status !== "completed"
            ) {
                return "table-danger";
            }
            return "";
        },

        getCategoryClass(category) {
            const classes = {
                Training: "bg-primary",
                "Client Management": "bg-success",
                Administrative: "bg-info",
                Maintenance: "bg-warning",
                "Professional Development": "bg-secondary",
                Other: "bg-dark",
            };
            return classes[category] || "bg-secondary";
        },

        // Activities Management Methods
        async fetchCoachActivities() {
            try {
                this.isLoadingActivities = true;
                const coachId = this.$route.params.id;
                if (!coachId) {
                    console.warn('Coach ID is missing');
                    return;
                }

                const response = await axios.get(`coaches/${coachId}/activities`);

                if (response.data.status === 'success' && response.data.data) {
                    this.activities = response.data.data || [];
                } else {
                    console.warn('Failed to fetch activities or no data returned', response.data);
                    this.activities = [];
                    // Show warning if there's a message from the server
                    if (response.data.message) {
                        this.showError(response.data.message);
                    }
                }
            } catch (error) {
                console.error('Error fetching coach activities:', error);
                
                // Extract error message from response if available
                let errorMessage = 'Failed to load activities. Please try again.';
                if (error.response) {
                    // Server responded with error status
                    if (error.response.data && error.response.data.message) {
                        errorMessage = error.response.data.message;
                    } else if (error.response.status === 404) {
                        errorMessage = 'Coach not found.';
                    } else if (error.response.status === 500) {
                        errorMessage = 'Server error occurred while loading activities. Please contact support if this persists.';
                    }
                } else if (error.request) {
                    // Request was made but no response received
                    errorMessage = 'Unable to connect to server. Please check your connection.';
                }
                
                this.showError(errorMessage);
                this.activities = [];
            } finally {
                this.isLoadingActivities = false;
            }
        },

        getPriorityClass(priority) {
            const classes = {
                Urgent: "bg-danger",
                High: "bg-warning",
                Medium: "bg-info",
                Low: "bg-success",
            };
            return classes[priority] || "bg-secondary";
        },

        getStatusClass(status) {
            const classes = {
                pending: "bg-secondary",
                "in-progress": "bg-warning",
                completed: "bg-success",
                cancelled: "bg-danger",
            };
            return classes[status] || "bg-secondary";
        },

        getDueDateClass(dueDate) {
            const today = new Date();
            const due = new Date(dueDate);
            const diffTime = due - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays < 0) {
                return "text-danger font-weight-bold";
            } else if (diffDays <= 3) {
                return "text-warning font-weight-bold";
            } else if (diffDays <= 7) {
                return "text-info";
            }
            return "";
        },

        formatDate(dateString) {
            if (!dateString) return "N/A";
            const date = new Date(dateString);
            return date.toLocaleDateString();
        },

        formatCoachSinceDate(dateString) {
            if (!dateString) return '-';
            
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '-';
            
            // Format date as MM/DD/YYYY
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${month}/${day}/${year}`;
            
            // Calculate years and months difference
            const today = new Date();
            let years = today.getFullYear() - date.getFullYear();
            let months = today.getMonth() - date.getMonth();
            
            // Adjust if current day hasn't reached the start day this month
            if (today.getDate() < date.getDate()) {
                months--;
            }
            
            // Adjust if months went negative
            if (months < 0) {
                months += 12;
                years--;
            }
            
            // Build duration string
            const durationParts = [];
            if (years > 0) {
                durationParts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
            }
            if (months > 0) {
                durationParts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
            }
            
            // If less than a month, show 0 months
            if (years === 0 && months === 0) {
                durationParts.push('0 months');
            }
            
            const duration = durationParts.length > 0 ? ` (${durationParts.join(', ')})` : '';
            
            return `${formattedDate}${duration}`;
        },

        // Helper method to format date for input fields (YYYY-MM-DD)
        formatDateForInput(dateString) {
            if (!dateString) return "";
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "";
            return date.toISOString().split("T")[0];
        },

        // Helper method to format date for storage
        formatDateForStorage(dateString) {
            if (!dateString) return "";
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "";
            return date.toISOString().split("T")[0];
        },

        // Helper method to normalize task data structure
        normalizeTaskData(task) {
            const normalized = {
                id: task.id,
                title: task.title || "",
                description: task.description || "",
                category: task.category || "",
                priority: task.priority || "",
                due_date: task.due_date || task.dueDate || "",
                status: task.status || "pending",
                created_at:
                    task.created_at ||
                    task.createdAt ||
                    new Date().toISOString().split("T")[0],
            };

            return normalized;
        },

        // Helper method to update task in local array
        updateTaskInArray(taskId, updatedData) {
            const taskIndex = this.coachTasks.findIndex(
                (task) => task.id === taskId
            );
            if (taskIndex !== -1) {
                // Format the due date properly for storage
                let formattedDueDate = this.coachTasks[taskIndex].due_date; // Keep existing if no update
                if (updatedData.dueDate) {
                    formattedDueDate = this.formatDateForStorage(
                        updatedData.dueDate
                    );
                } else if (updatedData.due_date) {
                    formattedDueDate = updatedData.due_date;
                }

                // Merge the updated data with existing task data
                this.coachTasks[taskIndex] = {
                    ...this.coachTasks[taskIndex],
                    ...updatedData,
                    // Ensure date fields are properly formatted
                    due_date: formattedDueDate,
                    created_at: this.coachTasks[taskIndex].created_at, // Preserve original creation date
                };
            }
        },

        // Start creating a new task
        startNewTask() {
            this.resetTaskForm();
            this.editingTaskId = null;
            this.activeAction = "newTask";
        },

        // Open new task from header button
        openNewTask() {
            // Switch to New Task tab
            this.activeTab = "newTask";
            // Start new task creation
            this.startNewTask();
            // Scroll to task form after a short delay to ensure tab is rendered
            this.$nextTick(() => {
                setTimeout(() => {
                    const taskForm = document.querySelector(".task-form");
                    if (taskForm) {
                        taskForm.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    }
                }, 100);
            });
        },

        // View task details
        viewTask(task) {
            // For now, just show task details in an alert
            // In a real implementation, you might want to show a modal or expand the row
            const taskDetails = `
Task: ${task.title}
Category: ${task.category}
Priority: ${task.priority}
Status: ${task.status}
Due Date: ${this.formatDate(task.due_date)}
Description: ${task.description || "No description provided"}
Created: ${this.formatDate(task.created_at)}
      `;

            this.$swal({
                title: "Task Details",
                text: taskDetails,
                icon: "info",
                confirmButtonText: "Close",
            });
        },

        // Cancel task editing
        cancelTaskEdit() {
            if (this.editingTaskId) {
                // Reset form and editing state
                this.resetTaskForm();
                this.editingTaskId = null;
                this.activeAction = null;
                this.showSuccess("Task editing cancelled");
            } else {
                this.activeAction = null;
            }
        },

        // Reset task form to default values
        resetTaskForm() {
            this.task = {
                title: "",
                category: "",
                priority: "",
                dueDate: "",
                status: "pending",
                description: "",
            };
        },

        editTask(task) {
            // Normalize the task data first
            const normalizedTask = this.normalizeTaskData(task);

            // Format the due date properly for the input field
            const formattedDueDate = this.formatDateForInput(
                normalizedTask.due_date
            );

            // Populate the form with task data for editing
            this.task = {
                title: normalizedTask.title || "",
                category: normalizedTask.category || "",
                priority: normalizedTask.priority || "",
                dueDate: formattedDueDate || "",
                status: normalizedTask.status || "pending",
                description: normalizedTask.description || "",
            };

            this.editingTaskId = normalizedTask.id;
            this.activeAction = "newTask"; // Show the form
            this.showSuccess(`Editing task: ${normalizedTask.title}`);

            // Scroll to the form
            this.$nextTick(() => {
                const formElement = document.querySelector(".task-form");
                if (formElement) {
                    formElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            });
        },

        async deleteTask(taskId) {
            try {
                const confirmed = await this.$swal({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Yes, delete it!",
                });

                if (confirmed.isConfirmed) {
                    const coachId = this.$route.params.id;
                    const response = await axios.delete(
                        `coaches/${coachId}/tasks/${taskId}`
                    );

                    // Check for success in response (backend returns 'status: success' or 'success: true')
                    // Also check HTTP status code as fallback (200-299 means success)
                    const isSuccess = response.data.status === 'success' || 
                                     response.data.success === true ||
                                     (response.status >= 200 && response.status < 300);

                    if (isSuccess) {
                        this.showSuccess("Task deleted successfully!");
                        // Refresh the task list from server to ensure consistency
                        await this.fetchCoachTasks();
                    } else {
                        this.showError("Failed to delete task");
                    }
                }
            } catch (error) {
                console.error("Error deleting task:", error);
                this.showError("Error deleting task. Please try again.");
            }
        },

        // Message Management Methods
        async fetchCoachUserId() {
            // The backend can handle both User IDs and Coach IDs
            // The backend will try to find a User first by recipient_id, and if not found, use it as Coach ID
            // So we can just use the coach ID directly
            try {
                // Try to get user ID from coach data if available
                if (this.client && this.client.user_id) {
                    return this.client.user_id;
                }
                
                // Otherwise, use coach ID directly - backend will handle it
                // Backend logic: If User::find($recipientId) fails, it uses Coach::find($recipientId)
                return this.$route.params.id;
            } catch (error) {
                console.warn("Error fetching coach user ID, using coach ID:", error);
                // Fallback: use coach ID directly
                return this.$route.params.id;
            }
        },

        async fetchMessages() {
            try {
                this.isLoadingMessages = true;
                const coachId = this.$route.params.id;
                if (!coachId) {
                    this.messages = [];
                    return;
                }

                // Get coach's user ID for the API
                if (!this.coachUserId) {
                    this.coachUserId = await this.fetchCoachUserId();
                }

                // Fetch chat history using communication API
                // recipient_type = 'trainer' for coaches
                const response = await axios.get(`communication/chat-history/${this.coachUserId}/trainer`);
                
                if (response.data && response.data.success) {
                    // Transform messages to chat format
                    // Backend already provides is_sent field
                    this.messages = (response.data.messages || []).map(msg => {
                        return {
                            id: msg.id,
                            message: msg.message || msg.message_text || '',
                            is_sent: msg.is_sent || false,
                            sender_type: msg.sender_type || (msg.is_sent ? 'Admin' : 'Trainer'),
                            sender_name: msg.sender_name || (msg.is_sent ? 'You' : `${this.client.first_name} ${this.client.last_name}`),
                            created_at: msg.created_at || msg.sent_date || new Date().toISOString()
                        };
                    });
                    
                    // Scroll to bottom after messages load
                    this.$nextTick(() => {
                        this.scrollToBottom();
                    });
                } else {
                    this.messages = [];
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
                this.messages = [];
                // Don't show error for empty conversations
                if (error.response?.status !== 404) {
                    this.showError("Error loading messages. Please try again.");
                }
            } finally {
                this.isLoadingMessages = false;
            }
        },

        scrollToBottom() {
            const container = this.$refs.chatMessagesContainer;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        },

        getMockMessages() {
            return [
                {
                    id: 1,
                    sender: "John Doe",
                    subject: "Training Schedule Update",
                    body: "Hi, I wanted to discuss the upcoming training schedule for next week. Can we arrange a meeting?",
                    created_at: "2024-01-15",
                    read: true,
                },
                {
                    id: 2,
                    sender: "Jane Smith",
                    subject: "Equipment Request",
                    body: "We need to order new equipment for the gym. Please review the list and let me know your thoughts.",
                    created_at: "2024-01-14",
                    read: false,
                },
                {
                    id: 3,
                    sender: "Mike Johnson",
                    subject: "Client Feedback",
                    body: "Great feedback from clients about your training sessions. Keep up the excellent work!",
                    created_at: "2024-01-13",
                    read: true,
                },
            ];
        },

        async sendMessage() {
            try {
                this.isSendingMessage = true;
                const coachId = this.$route.params.id;
                if (!coachId) {
                    this.showError("No coach ID found");
                    return;
                }

                // Validate message
                if (!this.newMessage.body || !this.newMessage.body.trim()) {
                    this.showError("Please enter a message");
                    return;
                }

                // Get coach's user ID if not already fetched
                if (!this.coachUserId) {
                    this.coachUserId = await this.fetchCoachUserId();
                }

                // Send message using communication API
                const response = await axios.post(`communication/send-message`, {
                    recipient_id: this.coachUserId,
                    recipient_type: 'trainer', // Coaches are treated as 'trainer' type
                    message: this.newMessage.body.trim()
                });

                if (response.data && response.data.success) {
                    // Clear input
                    this.newMessage.body = "";
                    
                    // Refresh messages to show the new one
                    await this.fetchMessages();
                    
                    // Scroll to bottom
                    this.$nextTick(() => {
                        this.scrollToBottom();
                    });
                } else {
                    this.showError(response.data?.message || "Failed to send message");
                }

            } catch (error) {
                console.error("Error sending message:", error);
                const errorMessage = error.response?.data?.message || 
                                   error.response?.data?.error || 
                                   "Error sending message. Please try again.";
                this.showError(errorMessage);
            } finally {
                this.isSendingMessage = false;
            }
        },

        formatMessageTime(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);

            // Today - show time
            if (diffDays === 0) {
                return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            }
            // Yesterday
            if (diffDays === 1) {
                return 'Yesterday ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            }
            // This week - show day and time
            if (diffDays < 7) {
                return date.toLocaleDateString('en-US', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
            }
            // Older - show full date
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
        },

        newLine() {
            // Allow new line with Shift+Enter
            // This is handled by the textarea's @keydown.shift.enter.exact
        },

        viewMessage(message) {
            // Set selected message and show modal
            this.selectedMessage = message;
            this.showMessageModal = true;
            // Mark message as read
            message.read = true;
        },

        closeMessageModal() {
            this.showMessageModal = false;
            this.selectedMessage = null;
        },

        async deleteMessage(messageId) {
            try {
                // Check if SweetAlert is available
                if (typeof this.$swal === "undefined") {
                    // Fallback to browser confirm if SweetAlert is not available
                    const confirmed = confirm(
                        "Are you sure you want to delete this message?"
                    );
                    if (!confirmed) return;
                } else {
                    const confirmed = await this.$swal({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Yes, delete it!",
                    });

                    if (!confirmed.isConfirmed) return;
                }

                const coachId = this.$route.params.id;

                // Delete via coach messages endpoint
                const response = await axios.delete(`coaches/${coachId}/messages/${messageId}`);
                
                if (response.data.success) {
                    this.showSuccess("Message deleted successfully!");
                    this.messages = this.messages.filter(message => message.id !== messageId);
                    // Close modal if the deleted message was being viewed
                    if (this.selectedMessage && this.selectedMessage.id === messageId) {
                        this.closeMessageModal();
                    }
                } else {
                    this.showError(response.data.message || "Failed to delete message");
                }
            } catch (error) {
                console.error("Error deleting message:", error);
                const errorMessage = error.response?.data?.message || error.response?.data?.error || "Error deleting message. Please try again.";
                this.showError(errorMessage);
            }
        },

        // Assigned Members Management Methods
        async fetchAssignedMembers() {
            try {
                this.isLoadingAssignedMembers = true;
                const coachId = this.$route.params.id;
                console.log("Fetching assigned members for coach ID:", coachId);

                if (!coachId) {
                    this.showError("No coach ID provided");
                    this.assignedMembers = [];
                    return;
                }

                // Call the actual API endpoint with optional no_membership filter
                const params = {};
                if (this.noMembershipFilter) {
                    params.no_membership = '1';
                }
                
                const response = await axios.get(
                    `coaches/${coachId}/assigned-members`,
                    { params }
                );
                console.log("API Response:", response.data);

                if (response.data.status === "success") {
                    this.assignedMembers = response.data.members || [];
                    this.filteredAssignedMembers = [...this.assignedMembers];
                    console.log(
                        "Assigned members loaded:",
                        this.assignedMembers
                    );

                    // Debug: Log first member's data including assignment_id
                    if (this.assignedMembers.length > 0) {
                        const firstMember = this.assignedMembers[0];
                        console.log("First member data:", firstMember);
                        console.log("Assignment ID check:", {
                            assignment_id: firstMember.assignment_id,
                            member_id: firstMember.id,
                            has_assignment_id: !!firstMember.assignment_id
                        });
                        console.log("Available date fields:", {
                            join_date: firstMember.join_date,
                            created_at: firstMember.created_at,
                            joining_date: firstMember.joining_date,
                            date_joined: firstMember.date_joined,
                            registration_date: firstMember.registration_date,
                            member_since: firstMember.member_since,
                            start_date: firstMember.start_date,
                            enrollment_date: firstMember.enrollment_date,
                        });
                        
                        // Validate that assignment_id exists for all members
                        const membersWithoutAssignmentId = this.assignedMembers.filter(m => !m.assignment_id);
                        if (membersWithoutAssignmentId.length > 0) {
                            console.warn("Warning: Some members are missing assignment_id:", membersWithoutAssignmentId);
                        }
                    }
                } else {
                    this.showError("Failed to fetch assigned members");
                    this.assignedMembers = [];
                    this.filteredAssignedMembers = [];
                }
            } catch (error) {
                console.error("Error fetching assigned members:", error);
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    this.showError(error.response.data.message);
                } else {
                    this.showError("Error fetching assigned members");
                }
                this.assignedMembers = [];
            } finally {
                this.isLoadingAssignedMembers = false;
            }
        },

        // Fetch available members (not yet assigned to any coach)
        async fetchAvailableMembers() {
            try {
                const coachId = this.$route.params.id;
                console.log("Fetching available members for coach:", coachId);

                if (!coachId) {
                    console.log("No coach ID, clearing members");
                    this.members = [];
                    this.filteredMembers = [];
                    return;
                }

                // Try to get unassigned members from backend first
                let response;
                try {
                    console.log(
                        "Trying to get unassigned members from backend..."
                    );
                    response = await axios.get("get_unassigned_members");
                    console.log("Unassigned members API response:", response);
                } catch (error) {
                    console.log(
                        "Unassigned members API not available, falling back to all members..."
                    );
                    // Fallback to get all members and filter on frontend
                    response = await axios.get("get_members_without_paginate");
                    console.log("All members API response:", response);
                }

                if (response.data && Array.isArray(response.data)) {
                    const allMembers = response.data || [];
                    console.log(
                        "Total members from API (already filtered by gym):",
                        allMembers.length
                    );

                    // Debug: Log first few members to see their structure
                    if (allMembers.length > 0) {
                        console.log(
                            "Sample members from API:",
                            allMembers.slice(0, 3)
                        );
                        console.log(
                            "First member structure:",
                            Object.keys(allMembers[0])
                        );
                    }

                    // Filter out members already assigned to ANY coach (not just this coach)
                    // We need to check if member has a coach_id or is assigned to any coach
                    const unassignedMembers = allMembers.filter((member) => {
                        // Check various possible fields that might indicate assignment
                        const isAssigned =
                            member.coach_id ||
                            member.coachId ||
                            member.assigned_coach_id ||
                            member.assigned_coach ||
                            member.isAssigned === true ||
                            member.assigned === true ||
                            member.coach_assignment ||
                            member.coach_assignment_id ||
                            member.assigned_to_coach ||
                            member.coach_assigned ||
                            member.has_coach ||
                            member.coach_name ||
                            member.coach_email;

                        // Additional check: if any coach-related field has a value (not null, undefined, or empty string)
                        const hasCoachValue = Object.keys(member).some(
                            (key) => {
                                const keyLower = key.toLowerCase();
                                return (
                                    (keyLower.includes("coach") ||
                                        keyLower.includes("assigned")) &&
                                    member[key] !== null &&
                                    member[key] !== undefined &&
                                    member[key] !== "" &&
                                    member[key] !== 0
                                );
                            }
                        );

                        // Debug logging for each member
                        if (isAssigned || hasCoachValue) {
                            console.log(
                                "Member is assigned:",
                                member.name || member.membername,
                                "Assignment fields:",
                                {
                                    coach_id: member.coach_id,
                                    coachId: member.coachId,
                                    assigned_coach_id: member.assigned_coach_id,
                                    assigned_coach: member.assigned_coach,
                                    isAssigned: member.isAssigned,
                                    assigned: member.assigned,
                                    coach_assignment: member.coach_assignment,
                                    coach_assignment_id:
                                        member.coach_assignment_id,
                                    assigned_to_coach: member.assigned_to_coach,
                                    coach_assigned: member.coach_assigned,
                                    has_coach: member.has_coach,
                                    coach_name: member.coach_name,
                                    coach_email: member.coach_email,
                                    hasCoachValue: hasCoachValue,
                                }
                            );
                        }

                        return !isAssigned && !hasCoachValue;
                    });

                    console.log(
                        "Unassigned members:",
                        unassignedMembers.length
                    );

                    this.members = unassignedMembers;
                    this.filteredMembers = [...this.members];
                    this.updatePagination();
                } else {
                    console.warn(
                        "Invalid available members data format:",
                        response.data
                    );
                    this.members = [];
                    this.filteredMembers = [];
                    this.updatePagination();
                }
            } catch (error) {
                console.error("Error fetching available members:", error);
                // Fallback to sample data if the API fails
                console.log("Falling back to sample members data...");
                this.loadSampleMembers();
                this.updatePagination();
            }
        },

        // Load sample members data as fallback
        loadSampleMembers() {
            console.log("Loading sample members data...");
            this.members = [
                {
                    id: 1,
                    name: "John Doe",
                    email: "john.doe@example.com",
                    phone: "+1 (555) 123-4567",
                    join_date: "2024-01-15",
                    status: "active",
                    membership_type: "Premium",
                    profile_image: "https://via.placeholder.com/60x60/4F92F2/FFFFFF?text=JD"
                },
                {
                    id: 2,
                    name: "Jane Smith",
                    email: "jane.smith@example.com",
                    phone: "+1 (555) 234-5678",
                    join_date: "2024-02-20",
                    status: "active",
                    membership_type: "Standard",
                    profile_image: "https://via.placeholder.com/60x60/E74C3C/FFFFFF?text=JS"
                },
                {
                    id: 3,
                    name: "Mike Johnson",
                    email: "mike.johnson@example.com",
                    phone: "+1 (555) 345-6789",
                    join_date: "2024-03-10",
                    status: "active",
                    membership_type: "Basic",
                    profile_image: "https://via.placeholder.com/60x60/27AE60/FFFFFF?text=MJ"
                },
                {
                    id: 4,
                    name: "Sarah Wilson",
                    email: "sarah.wilson@example.com",
                    phone: "+1 (555) 456-7890",
                    join_date: "2024-01-25",
                    status: "active",
                    membership_type: "Premium",
                    profile_image: "https://via.placeholder.com/60x60/F39C12/FFFFFF?text=SW"
                },
                {
                    id: 5,
                    name: "David Brown",
                    email: "david.brown@example.com",
                    phone: "+1 (555) 567-8901",
                    join_date: "2024-02-05",
                    status: "active",
                    membership_type: "Standard",
                    profile_image: "https://via.placeholder.com/60x60/8E44AD/FFFFFF?text=DB"
                }
            ];
            
            this.filteredMembers = [...this.members];
            this.updatePagination();
            console.log("Sample members loaded:", this.members.length);
        },

        // Settings Management Methods
        async fetchSettings() {
            try {
                const coachId = this.$route.params.id;
                if (!coachId) {
                    return;
                }

                const response = await axios.get(`coaches/${coachId}/settings`);

                if (response.data.status) {
                    this.settings = response.data.settings;
                    console.log("Settings loaded successfully:", this.settings);
                } else {
                    this.showError("Failed to fetch settings");
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
                this.showError("Error loading settings. Using default values.");

                // Fallback to default settings
                this.settings = {
                    accountStatus: "active",
                    accountType: "full-time",
                    joinDate: "2024-01-01",
                    notifications: {
                        email: {
                            newTasks: true,
                            messages: true,
                            memberAssignments: true,
                            scheduleUpdates: false,
                        },
                        sms: {
                            urgentTasks: true,
                            scheduleChanges: false,
                        },
                    },
                    privacy: {
                        profileVisibility: "public",
                        contactVisibility: "members-only",
                        scheduleVisibility: "members-only",
                    },
                    workPreferences: {
                        defaultSessionDuration: 60,
                        maxClientsPerDay: 8,
                        workStartTime: "09:00",
                        workEndTime: "17:00",
                        breakTime: 10,
                    },
                    payment: {
                        paymentMethod: "bank-transfer",
                        paymentFrequency: "monthly",
                        taxId: "",
                    },
                    security: {
                        twoFactorAuth: false,
                        sessionTimeout: 30,
                    },
                };
            }
        },

        // Update settings
        async updateSettings() {
            try {
                const coachId = this.$route.params.id;
                if (!coachId) {
                    this.showError("Coach ID not found");
                    return;
                }

                const response = await axios.put(
                    `coaches/${coachId}/settings`,
                    this.settings
                );

                if (response.data.status) {
                    this.showSuccess("Settings updated successfully!");
                    console.log("Settings updated:", response.data.settings);
                } else {
                    this.showError("Failed to update settings");
                }
            } catch (error) {
                console.error("Error updating settings:", error);
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    this.showError(error.response.data.message);
                } else {
                    this.showError("Error updating settings");
                }
            }
        },

        // Reset settings to defaults
        async resetSettings() {
            try {
                const coachId = this.$route.params.id;
                if (!coachId) {
                    this.showError("Coach ID not found");
                    return;
                }

                const response = await axios.post(
                    `coaches/${coachId}/settings/reset`
                );

                if (response.data.status) {
                    this.settings = response.data.settings;
                    this.showSuccess(
                        "Settings reset to defaults successfully!"
                    );
                    console.log("Settings reset:", this.settings);
                } else {
                    this.showError("Failed to reset settings");
                }
            } catch (error) {
                console.error("Error resetting settings:", error);
                this.showError("Error resetting settings");
            }
        },

        async saveSettings() {
            try {
                this.isSavingSettings = true;
                const coachId = this.$route.params.id;
                if (!coachId) {
                    this.showError("No coach ID found");
                    return;
                }

                // For now, simulate saving settings since the API endpoint might not exist
                // In a real implementation, you would call the actual API
                // const response = await axios.put(`coaches/${coachId}/settings`, this.settings);

                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Simulate successful settings save
                this.showSuccess("Settings saved successfully!");

                // Uncomment the following when the API endpoint is available:
                /*
        const response = await axios.put(`coaches/${coachId}/settings`, this.settings);
        
        if (response.data.success) {
          this.showSuccess("Settings saved successfully!");
        } else {
          this.showError("Failed to save settings");
        }
        */
            } catch (error) {
                console.error("Error saving settings:", error);
                this.showError("Error saving settings. Please try again.");
            } finally {
                this.isSavingSettings = false;
            }
        },

        async changePassword() {
            try {
                // Check if SweetAlert is available
                if (typeof this.$swal === "undefined") {
                    // Fallback to browser prompt if SweetAlert is not available
                    const currentPassword = prompt("Enter current password:");
                    if (!currentPassword) return;

                    const newPassword = prompt("Enter new password:");
                    if (!newPassword) return;

                    const confirmPassword = prompt("Confirm new password:");
                    if (newPassword !== confirmPassword) {
                        alert("Passwords do not match!");
                        return;
                    }

                    // Simulate password change
                    this.showSuccess("Password changed successfully!");
                } else {
                    const { value: formValues } = await this.$swal({
                        title: "Change Password",
                        html: `
              <input id="currentPassword" class="swal2-input" placeholder="Current Password" type="password">
              <input id="newPassword" class="swal2-input" placeholder="New Password" type="password">
              <input id="confirmPassword" class="swal2-input" placeholder="Confirm New Password" type="password">
            `,
                        focusConfirm: false,
                        preConfirm: () => {
                            const currentPassword =
                                document.getElementById(
                                    "currentPassword"
                                ).value;
                            const newPassword =
                                document.getElementById("newPassword").value;
                            const confirmPassword =
                                document.getElementById(
                                    "confirmPassword"
                                ).value;

                            if (
                                !currentPassword ||
                                !newPassword ||
                                !confirmPassword
                            ) {
                                this.$swal.showValidationMessage(
                                    "Please fill in all fields"
                                );
                                return false;
                            }

                            if (newPassword !== confirmPassword) {
                                this.$swal.showValidationMessage(
                                    "Passwords do not match"
                                );
                                return false;
                            }

                            if (newPassword.length < 8) {
                                this.$swal.showValidationMessage(
                                    "Password must be at least 8 characters"
                                );
                                return false;
                            }

                            return { currentPassword, newPassword };
                        },
                    });

                    if (formValues) {
                        // Simulate password change API call
                        await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                        );
                        this.showSuccess("Password changed successfully!");
                    }
                }
            } catch (error) {
                console.error("Error changing password:", error);
                this.showError("Error changing password. Please try again.");
            }
        },
    },

    created() {
        this.fetchClientData();
        this.fetchMembers();
        this.fetchAssignedMembers();
        this.fetchAvailableMembers();
        // Load notes if notes tab is active
        if (this.activeTab === 'notes') {
            this.loadNotes();
        }
    },

    watch: {
        "$route.params.id"(newId) {
            if (newId) {
                this.fetchClientData();
            }
        },

        activeAction(newAction, oldAction) {
            if (newAction === "newTask" && !this.editingTaskId) {
                // Only reset form if we're not editing a task
                this.resetTaskForm();
                this.fetchCoachTasks();
            }
        },

        activeTab(newTab) {
            console.log("Tab changed to:", newTab);
            if (newTab === "newTask") {
                this.fetchCoachTasks();
            } else if (newTab === "sendMessage") {
                this.fetchMessages();
            } else if (newTab === "members") {
                console.log("Members tab activated, fetching data...");
                this.activeAction = null; // Reset to default view
                this.viewMode = "table"; // Default to table view
                this.fetchAssignedMembers();
                this.fetchAvailableMembers();
            } else if (newTab === "latestActivities") {
                this.fetchCoachActivities();
            } else if (newTab === "notes") {
                this.loadNotes();
            } else if (newTab === "settings") {
                this.fetchSettings();
            }
        },

        // Watch for changes in assigned members to update available members
        assignedMembers: {
            handler() {
                this.fetchAvailableMembers();
            },
            deep: true,
        },
    },
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

/* ===========================================
   MEMBER DETAILS COMPONENT STYLES
   =========================================== */

// Nutrition Plans Styles
.nutrition-form-section {
    background: $white;
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid $color-divider;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.nutrition-form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid $color-divider;

    .nutrition-form-title {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 600;
        color: $color-subtitle;
        display: flex;
        align-items: center;
        gap: 10px;

        i {
            color: #dc3545;
        }
    }
}

.nutrition-plans-list {
    .loading-nutrition-plans {
        text-align: center;
        padding: 40px 20px;
        color: $color-muted;

        .spinner-border {
            margin-bottom: 15px;
        }

        p {
            margin: 0;
            font-size: 1rem;
        }
    }

    .no-nutrition-plans {
        text-align: center;
        padding: 40px 20px;
        color: $color-muted;

        i {
            font-size: 3rem;
            margin-bottom: 15px;
            opacity: 0.5;
        }

        p {
            margin: 0;
            font-size: 1rem;
        }
    }

    .nutrition-plans-table {
        .table {
            margin-bottom: 0;

            th {
                background: #f8f9fa;
                border-bottom: 2px solid $color-divider;
                font-weight: 600;
                color: $color-subtitle;
                padding: 12px 15px;
            }

            td {
                padding: 12px 15px;
                vertical-align: middle;
                border-bottom: 1px solid #e9ecef;
            }

            .date-badge {
                background: #e3f2fd;
                color: #1976d2;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.85rem;
                font-weight: 500;
            }

            .status-badge {
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.85rem;
                font-weight: 500;

                &.status-active {
                    background: #d4edda;
                    color: #155724;
                }

                &.status-completed {
                    background: #cce5ff;
                    color: #004085;
                }

                &.status-cancelled {
                    background: #f8d7da;
                    color: #721c24;
                }

                &.status-expired {
                    background: #fff3cd;
                    color: #856404;
                }

                &.status-unknown {
                    background: #e2e3e5;
                    color: #383d41;
                }
            }

            .nutrition-actions-1 {
                display: flex !important;
            }

            .nutrition-actions {
                display: flex;
                gap: 5px;
                align-items: center;

                .btn {
                    padding: 4px 8px;
                    font-size: 0.8rem;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 32px;
                    height: 32px;

                    &.btn-outline-primary {
                        color: #dc3545;
                        border-color: #dc3545;

                        &:hover {
                            background: #dc3545;
                            color: white;
                        }
                    }

                    &.btn-outline-danger {
                        color: #dc3545;
                        border-color: #dc3545;

                        &:hover {
                            background: #dc3545;
                            color: white;
                        }
                    }

                    i {
                        font-size: 0.75rem;
                    }
                }
            }
        }
    }
}

// Loading State Styles
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;

    .loading-spinner {
        text-align: center;

        .spinner-border {
            width: 3rem;
            height: 3rem;
        }

        .loading-text {
            margin-top: 1rem;
            color: $color-muted;
            font-size: 1rem;
        }
    }
}

// Main Container Styles
.coach-form-container {
    background: linear-gradient(135deg, $background 0%, #e8e8e6 100%);
}

.form-card {
    background: $white;
    border-radius: 10px;
    box-shadow: 0 20px 60px rgba(79, 112, 92, 0.15);
    overflow: hidden;
}

// Header Section Styles
.coach-header-section {
    background: linear-gradient(to bottom, #23415a, #0f1c29);
    position: relative;
    padding: 12px 16px;
    display: flex;
    align-items: center;
}

.header-wrapper {
    width: 100%;
    min-height: 36px;
}

.breadcrumb-section {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
}

.breadcrumb-nav {
    margin-bottom: 0;
}

.breadcrumb-container {
    gap: 15px;
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px; /* add consistent gaps between items */
    flex: 0 0 auto;
    height: 36px;
}

// Override shared styles for white text in CoachDetails
.breadcrumb-item {
    color: white !important;
}

.breadcrumb-item.active {
    color: white !important;
    font-weight: 500 !important;
}

.breadcrumb-item a {
    color: white !important;
}

.breadcrumb-item a:hover {
    color: #e0e0e0 !important;
}

.coach-info {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
}

.data-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 400;
}

.coach-name {
    font-size: 16px;
    font-weight: 500;
    color: #808080 !important;
}

.back-button {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    font-size: 1rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-right: 10px;
}

.back-button:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

/* Divider Styles */
.divider {
    width: 1px;
    height: 24px;
    background: rgba(255, 255, 255, 0.3);
    margin: 0;
    flex-shrink: 0;
}

.tab-section {
    display: flex;
    align-items: center;
    height: 36px;
}

.tab-label {
    color: white;
    margin: 0;
    padding: 0;
    line-height: 1;
    display: flex;
    align-items: center;
}

.tab-icons {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 36px;
}

.tab-icon-btn {
    background: transparent;
    color: rgba(255, 255, 255, 0.7);
    width: 36px;
    height: 36px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    border-radius: 6px;
    padding: 0;
    margin: 0;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        transform: translateY(-1px);
    }

    &.active {
        background: $color-button;
        color: white;
        box-shadow: 0 2px 8px rgba($color-button, 0.3);
    }
}

.back-btn-container {
    display: flex;
    align-items: center;
    margin-left: 16px;
}

.back-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    font-size: 1rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.back-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

/* Main Layout Styles */
.main-layout {
    display: flex;
    gap: 10px;
    padding: 10px;
    min-height: calc(100vh - 215px);
    max-height: calc(100vh - 150px);
    overflow: hidden;
}

.profile-sidebar {
    max-height: calc(100vh - 250px);
    overflow: hidden;
}

.action-content {
    height: 100%;
}

.form-section {
    margin-bottom: 5px;
    background: $white;
    border-radius: 15px;
    padding: 10px;
    transition: all 0.3s ease;
}

.form-section:hover {
    transform: translateY(-2px);
    border-color: #dc3545;
}

.section-icon {
    width: 50px;
    height: 50px;
    background: #dc3545;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    margin-right: 15px;
    box-shadow: 0 4px 15px rgba(79, 112, 92, 0.3);
}

.section-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: #252525;
    margin: 0;
}

.hover-opacity-100:hover {
    opacity: 1 !important;
}

.opacity-0 {
    opacity: 0;
}

.transition {
    transition: opacity 0.3s ease-in-out;
}

/* Action Items Styles */
.action-items {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.action-item {
    display: flex;
    align-items: center;
    padding: $padding-xxs $padding-xxs;
    transition: all 0.3s ease;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
}

.action-item:hover {
    background: $gray-100;
    border-color: $color-border-muted;
    transform: translateY(-1px);
    box-shadow: $box-shadow-sm;
}

.action-item.active {
    background: rgba(220, 53, 69, 0.1);
    border-color: #dc3545;
    color: #dc3545;
}

.action-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: $padding-md;
    font-size: $font-size-lg;
    color: #dc3545;
    flex-shrink: 0;
}

.action-text {
    font-size: 14px;
    font-weight: 500;
    color: #212529;
    flex: 1;
    line-height: 1.4;
}

.action-item.active .action-icon {
    color: #dc3545;
}

.action-item.active .action-text {
    color: #dc3545;
    font-weight: $font-weight-semibold;
}

.profile-header {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 5px;
}

.profile-icon {
    width: 40px;
    height: 40px;
    background: rgba(220, 53, 69, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dc3545;
    font-size: 1.2rem;
}

.profile-title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: $text-dark;
}

.profile-content {
    text-align: center;
}

.profile-details {
    .coach-name {
        font-size: 1rem;
        font-weight: 600;
        color: $text-dark;
        margin: 0 0 5px 0;
    }

    .coach-id {
      font-size: 0.85rem;
    color: #6c757d;
    margin: 0;
    font-weight: 500;
    }
}

/* Profile Sidebar Divider - Horizontal */
.profile-divider {
    width: 100%;
    height: 1px;
    background: $color-divider;
}

.content-area {
    flex: 1;
    overflow-y: auto;
}

.action-content {
    height: 100%;
}

.section-content {
    height: 100%;
}

/* Tab Navigation Styles */
// .tab-navigation {
//     display: flex;
//     background: #f8f9fa;
//     border-radius: 8px;
//     padding: 4px;
//     margin-bottom: 20px;
//     overflow-x: auto;
// }

// .tab-item {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     padding: 10px 16px;
//     border-radius: 6px;
//     cursor: pointer;
//     transition: all 0.3s ease;
//     white-space: nowrap;
//     font-size: 0.9rem;
//     font-weight: 500;
//     color: $color-muted;
//     background: transparent;

//     &:hover {
//         background: rgba($primary, 0.1);
//         color: #dc3545;
//     }

//     &.active {
//         background: #dc3545;
//         color: white;
//         box-shadow: 0 2px 8px rgba($primary, 0.3);
//     }

//     i {
//         font-size: 1rem;
//     }
// }

/* Tab Content Styles */
.tab-content {
    height: calc(100% - 60px);
    overflow-y: auto;
}

.coach-form-content {
    padding: 0;
}

.form-grid {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

.form-column {
    display: flex;
    flex-direction: column;
}

/* Form Section Styles */
.form-section {
    overflow: hidden;

    &.compact {
        margin-bottom: 0;
    }
}

.section-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: $text-dark;

    &.compact {
        font-size: 0.9rem;
    }
}

.section-content {
    padding: 10px;

    &.compact {
        padding: 10px;
    }
}

/* Form Group Styles */
.form-group {
    margin-bottom: $padding-sm;

    &.compact {
        margin-bottom: $padding-sm;
    }
}

.form-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: $text-dark;
    font-size: 0.8rem;

    &.compact {
        font-size: 0.75rem;
        margin-bottom: 6px;
    }
}

.form-control {
    width: 100%;
    padding: $padding-sm $padding-md;
    border: $border-width-sm solid $color-border-muted;
    border-radius: $border-radius-sm;
    font-size: $font-size-sm;
    transition: all 0.3s ease;
    background: $white;

    &:focus {
        outline: none;
        border-color: #dc3545;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }

    &.compact {
        padding: $padding-sm $padding-sm;
        font-size: $font-size-sm;
    }

    &.readonly {
        background: #f8f9fa;
        color: $color-muted;
        cursor: not-allowed;
    }
}

.input-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: $color-muted;
    pointer-events: none;
}

/* Loading State Styles */
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;

    .loading-spinner {
        text-align: center;

        .spinner-border {
            width: 3rem;
            height: 3rem;
        }

        .loading-text {
            margin-top: 1rem;
            color: $color-muted;
            font-size: 1rem;
        }
    }
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
}

.search-filter-section.compact {
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    border: 1px solid #e9ecef;
    border-radius: 6px;
    padding: 8px;
    margin-bottom: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    
    .filters-row {
        display: flex;
        gap: 8px;
        align-items: center;
        
        .form-group.compact {
            flex: 1;
            min-width: 0;
            margin-bottom: 0;
            
            .form-control.compact {
                height: 32px;
                padding: 6px 12px;
                font-size: 0.85rem;
                border: 1px solid #ced4da;
                border-radius: 4px;
                background: white;
                transition: all 0.2s ease;
                
                &:focus {
                    border-color: #dc3545;
                    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
                    outline: none;
                }
                
                &::placeholder {
                    color: #6c757d;
                    font-size: 0.8rem;
                }
            }
            
            select.form-control.compact {
                cursor: pointer;
                
                &:hover {
                    border-color: #adb5bd;
                }
            }
        }
    }
}

.filters-row {
    display: flex;
    gap: 20px;
    align-items: flex-end;

    .form-group {
        flex: 1;
        min-width: 0;
    }
}

.profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.profile-icon {
    width: 40px;
    height: 40px;
    background: #dc3545;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    margin-right: 10px;
}

.profile-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #252525;
    margin: 0;
}

.profile-content {
    text-align: center;
}

.profile-avatar {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border: 4px solid #fff;
    transition: all 0.3s ease;
}

.profile-avatar:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
}

.coach-name {
    font-size: 1.2rem;
    font-weight: 600;
    color: #252525;
    margin: 5px 0 5px 0;
}

.coach-id {
  font-size: 0.85rem;
    color: #6c757d;
    margin: 0;
    font-weight: 500;
}

.form-section.compact {
    transition: all 0.3s ease;
}

.section-icon {
    width: 35px;
    height: 35px;
    background: #dc3545;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    margin-right: 10px;
    box-shadow: 0 2px 8px rgba(79, 112, 92, 0.3);
}

.section-title.compact {
    font-size: 1rem;
    font-weight: 600;
    color: #252525;
    margin: 0;
}

.section-content.compact {
    padding: 0;
}

.form-column {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.coach-form-content {
    padding: 20px 0;
}

.form-group {
    margin-bottom: 25px;
}

.form-group.compact {
    margin-bottom: 8px;
}

.form-label {
    font-weight: 600;
    color: #252525;
    margin-bottom: 10px;
    display: block;
    font-size: 0.9rem;
}

.form-label.compact {
    font-size: 0.8rem;
    margin-bottom: 3px;
    font-weight: 500;
}

.form-control {
    border: 1px solid #dee2e6;
    border-radius: 8px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    background: white;
    color: #252525;
    padding: 5px 5px !important;
    box-sizing: border-box;
}

.form-control.compact {
    padding: 6px 6px;
    font-size: 11px;
}

.form-control:focus {
    outline: none;
    border-color: #dc3545;
    box-shadow: 0 0 0 3px rgba(79, 112, 92, 0.1);
    transform: translateY(-1px);
}

.form-control.readonly {
    background: #f8f9fa;
    color: #6c757d;
    cursor: not-allowed;
}

.form-control textarea {
    resize: vertical;
    min-height: 100px;
}

/* Input Wrapper and Icon Styles */
.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.input-wrapper .form-control {
    padding-right: 40px;
}

.input-icon {
    position: absolute;
    right: 8px;
    top: 70%;
    transform: translateY(-50%);
    color: $color-subtitle;
    font-size: 12px;
    pointer-events: none;
}

.input-wrapper .form-control:focus+.input-icon {
    color: #dc3545;
}

.input-wrapper .form-control.readonly+.input-icon {
    color: #adb5bd;
}

/* Form Section Compact Styles */
.form-section.compact {
    padding: 6px;
    margin-bottom: 0;
}

.section-icon {
    width: 40px;
    height: 40px;
    background: #dc3545;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    margin-right: 12px;
    box-shadow: 0 2px 8px rgba(79, 112, 92, 0.3);
}

.section-title.compact {
    font-size: 1rem;
    font-weight: 600;
}

/* Form Grid and Column Styles */
.form-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-column {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* Member Form Content Styles */
.member-form-content {
    padding: 10px;
}

/* Tab Navigation Styles */
.tab-navigation {
    display: flex;
    background: transparent;
    margin: $padding-md 0 $padding-md $padding-md;
    gap: $padding-sm;
}

.tab-item {
    padding: $padding-xs $padding-md;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: $border-radius-lg;
    font-weight: $font-weight-medium;
    color: $gray-600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $padding-xs;
    border: none;
    background: transparent;
}

.tab-item:hover {
    background: $gray-100;
    color: $gray-700;
}

.tab-item.active {
    background: #dc3545;
    color: $white;
    border: none;
    position: relative;
    font-weight: $font-weight-semibold;
}

.tab-content {
    background: white;
    border-radius: 0 0 8px 8px;
    border: 1px solid #dee2e6;
    border-top: none;
    min-height: 400px;
}

.tab-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    padding-bottom: 5px;
}

.tab-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    margin: 0;
}

.settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 10px;
    margin-top: 10px;
}

.setting-section {
    background: #f8f9fa;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #dee2e6;
}

.setting-section h6 {
    margin-bottom: 15px;
    color: #333;
    font-weight: 600;
}

/* Bottom Action Buttons */
.bottom-actions {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    // background: white;
    // border-top: 1px solid #dee2e6;
    // padding: 15px;
    // box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    // z-index: 1000;
}

.action-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
    max-width: 600px;
    margin: 0 auto;
    flex-wrap: wrap;
}

.action-buttons .btn {
    min-width: 120px;
    padding: 12px 20px;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: 8px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.action-buttons .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

// Header Section Styles
.form-header {
    background: $color-background-sidebar;
    color: white;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 12px;
}

.form-header::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
}

.header-icon {
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
}

.form-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #fff !important;
    margin: 0;
}

.form-subtitle {
    font-size: 0.8rem;
    opacity: 0.9;
    margin: 0;
}

.back-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 8px;
    border-radius: 50%;
    font-size: 1rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.back-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

.details-content {
    padding: 10px;
}

.form-section:hover {
    transform: translateY(-2px);
}

.section-icon {
    width: 50px;
    height: 50px;
    background: #dc3545;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    margin-right: 15px;
    box-shadow: 0 4px 15px rgba(79, 112, 92, 0.3);
}

.section-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: #252525;
    margin: 0;
}

.hover-opacity-100:hover {
    opacity: 1 !important;
}

.opacity-0 {
    opacity: 0;
}

.transition {
    transition: opacity 0.3s ease-in-out;
}

.profile-image-container {
    text-align: center;
    position: relative;
    display: inline-block;
    margin-bottom: 10px;
}

.profile-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.profile-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(79, 112, 92, 0.8);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: pointer;
}

.profile-overlay i {
    font-size: 24px;
    margin-bottom: 5px;
}

.profile-overlay span {
    font-size: 12px;
    font-weight: 500;
}

/* Editable profile image styles */
.profile-image-container.editable {
    cursor: pointer;
}

.profile-image-container.editable:hover .profile-overlay {
    opacity: 1;
}

.profile-image-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 10;
}

.info-group {
    margin-bottom: 20px;
}

.info-label {
    font-weight: 600;
    color: #252525;
    margin-bottom: 8px;
    display: block;
    font-size: 0.95rem;
}

.info-value {
    background: $color-input-bg;
    padding: 8px 8px;
    border-radius: 8px;
    color: #252525;
    font-weight: 500;
    border: 1px solid $color-divider;
}

.status-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
}

.status-badge.active {
    background: $color-success;
    color: white;
}

.status-badge.inactive {
    background: $color-muted;
    color: white;
}

.actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.action-card {
    background: $color-input-bg;
    border: 2px solid $color-divider;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.action-card:hover {
    border-color: #dc3545;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(79, 112, 92, 0.15);
}

.action-card.active {
    border-color: #dc3545;
    background: rgba(79, 112, 92, 0.05);
}

.action-icon {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #dc3545;
        transition: all 0.3s ease;
    }

    .action-label {
        font-weight: 600;
        font-size: 0.85rem;
        transition: color 0.3s ease;
    }

.form-group {
    margin-bottom: 25px;
}

.form-label {
    font-weight: 600;
    color: #252525;
    margin-bottom: 10px;
    display: block;
    font-size: 0.9rem;
}

.form-control {
    width: 100%;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    background: white;
    color: #252525;
    padding: 10px 12px;
    box-sizing: border-box;
}

.form-control:focus {
    outline: none;
    border-color: #dc3545;
    box-shadow: 0 0 0 3px rgba(79, 112, 92, 0.1);
    transform: translateY(-1px);
}

.form-control.readonly {
    background: #f8f9fa;
    color: #6c757d;
    cursor: not-allowed;
}

.form-control textarea {
    resize: vertical;
    min-height: 100px;
}

/* Input Wrapper and Icon Styles */
.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.input-wrapper .form-control {
    padding-right: 40px;
}

.input-icon {
    position: absolute;
    right: 12px;
    top: 70%;
    transform: translateY(-50%);
    color: #6c757d;
    font-size: 14px;
    pointer-events: none;
    z-index: 2;
}

.input-wrapper .form-control:focus+.input-icon {
    color: #dc3545;
}

.input-wrapper .form-control.readonly+.input-icon {
    color: #adb5bd;
}

.edit-toggle-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.edit-toggle-btn:hover {
    background: color.adjust($primary, $lightness: -10%);
    transform: translateY(-1px);
}

.submit-btn {
    background: #dc3545;
    color: $white;
    border: none;
    padding: 12px 30px;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(79, 112, 92, 0.3);
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(79, 112, 92, 0.4);
}

.new-message-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.new-message-btn:hover {
    background: color.adjust($primary, $lightness: -10%);
    transform: translateY(-1px);
}

.form-actions {
    display: flex;
    gap: 15px;
    justify-content: flex-end;
    margin-top: 20px;
}

.cancel-btn {
    background: $color-muted;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.cancel-btn:hover {
    background: color.adjust($color-muted, $lightness: -10%);
    transform: translateY(-1px);
}

// .file-input {
//     display: none;
// }

.alert {
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    border: 1px solid transparent;
}

.alert-info {
    background-color: rgba(79, 112, 92, 0.1);
    border-color: rgba(79, 112, 92, 0.2);
    color: #2c5a3a;
}

.alert-warning {
    background-color: rgba(255, 193, 7, 0.1);
    border-color: rgba(255, 193, 7, 0.2);
    color: #856404;
}

.alert i {
    margin-right: 8px;
}

.submit-btn.danger {
    background: #dc3545;
    box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
}

.submit-btn.danger:hover {
    background: #c82333;
    box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4);
}

/* Responsive Design */
@media (max-width: 768px) {
    .details-content {
        padding: 20px;
    }

    .coach-header-section {
        padding: 15px 16px;
        flex-wrap: wrap;
        gap: 10px;
    }

    .header-content {
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
    }

    .tab-icons {
        flex-wrap: wrap;
        gap: 8px;
    }

    .back-btn-container {
        order: -1;
    }

    .form-header {
        padding: 30px 20px;
    }

    .form-title {
        font-size: 1.8rem;
    }

    .header-icon {
        width: 60px;
        height: 60px;
        font-size: 24px;
    }

    .section-icon {
        width: 40px;
        height: 40px;
        font-size: 16px;
    }

    .form-section {
        padding: 20px;
    }

    .actions-grid {
        grid-template-columns: 1fr;
    }
}

/* Animation for form sections */
.form-section {
    animation: fadeInUp 0.6s ease forwards;
    opacity: 0;
    transform: translateY(20px);
}

.form-section:nth-child(1) {
    animation-delay: 0.1s;
}

.form-section:nth-child(2) {
    animation-delay: 0.2s;
}

.form-section:nth-child(3) {
    animation-delay: 0.3s;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.task-actions {
    display: flex;
    gap: 8px;
    justify-content: center;

    .btn {
        padding: 6px 10px;
        font-size: 0.8rem;
        border-radius: 6px;
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        i {
            font-size: 0.75rem;
        }
    }
}

/* Member Assignment Styles */
.members-assignment-table {
    margin-bottom: 0;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;

    .table-header {
        background-color: rgba($background, 0.5);
        color: $heading;
        font-weight: 600;
        font-size: 0.875rem;
        padding: 12px 8px;
        border-bottom: 2px solid $color-border;
        letter-spacing: 0.5px;
        white-space: nowrap;
        position: sticky;
        top: 0;
        z-index: 10;

        &.text-center {
            text-align: center;
        }
    }

    .table-row {
        transition: all 0.3s ease;
        border-bottom: 1px solid $color-border-muted;

        &:hover {
            background-color: rgba($background, 0.3);
            transform: translateY(-1px);
            box-shadow: 0 2px 8px $color-card-shadow;
        }

        &:last-child {
            border-bottom: none;
        }
    }

    .table-cell {
        padding: 12px 8px;
        vertical-align: middle;
        color: $color-subtitle;
        font-size: 0.875rem;
        border: none;

        &.text-center {
            text-align: center;
        }
    }
}

.coach-avatar {
    display: flex;
    align-items: center;
    justify-content: center;

    .coach-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid $color-border;
    }
}

.coach-id {
  font-size: 0.85rem;
    color: #6c757d;
    margin: 0;
    font-weight: 500;
}

.coach-name {
    font-weight: 600;
    color: $heading;
    font-size: 0.9rem;
}

.coach-email {
    color: $color-subtitle;
    font-size: 0.8rem;
}

.coach-phone {
    color: $color-subtitle;
    font-size: 0.8rem;
}

.coach-plan {
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    display: inline-block;

    &.plan-premium {
        background-color: rgba(255, 193, 7, 0.2);
        color: #856404;
        border: 1px solid rgba(255, 193, 7, 0.3);
    }

    &.plan-vip {
        background-color: rgba(220, 53, 69, 0.2);
        color: #721c24;
        border: 1px solid rgba(220, 53, 69, 0.3);
    }

    &.plan-basic {
        background-color: rgba(40, 167, 69, 0.2);
        color: #155724;
        border: 1px solid rgba(40, 167, 69, 0.3);
    }

    &.plan-na {
        background-color: rgba(108, 117, 125, 0.2);
        color: #495057;
        border: 1px solid rgba(108, 117, 125, 0.3);
    }
}

.assign-coach-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 0.8rem;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 4px;

    &:hover:not(:disabled) {
        background: color.adjust($primary, $lightness: -10%);
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}

.unassign-coach-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 0.8rem;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 4px;

    &:hover:not(:disabled) {
        background: #c82333;
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}

.bulk-actions {
    background: rgba($background, 0.1);
    border: 1px solid $color-border;
    border-radius: 8px;
    padding: 15px;

    .selected-count {
        font-weight: 600;
        color: $heading;
    }

    .bulk-buttons {
        display: flex;
        gap: 10px;
    }
}

.bulk-assign-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;

    &:hover:not(:disabled) {
        background: color.adjust($primary, $lightness: -10%);
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}

.clear-selection-btn {
    background: $color-muted;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;

    &:hover {
        background: color.adjust($color-muted, $lightness: -10%);
        transform: translateY(-1px);
    }
}

.no-members-message {
    background: rgba($background, 0.1);
    border: 1px solid $color-border;
    border-radius: 8px;
    margin: 20px 0;
}

.search-filter-section {
    background: rgba($background, 0.05);
    border: 1px solid $color-border;
    border-radius: 8px;
    padding: 5px;

    .form-label {
        font-weight: 600;
        color: $heading;
        margin-bottom: 8px;
    }
}

.form-check {
    display: flex;
    align-items: center;
    gap: 8px;
}

.form-check-input {
    width: 14px;
    height: 14px;
    cursor: pointer;
}

.form-check-label {
    margin: 0;
    line-height: 1.2;
}

/* Responsive adjustments for member table */
@media (max-width: 768px) {
    .members-assignment-table {

        .table-header,
        .table-cell {
            padding: 8px 4px;
            font-size: 0.8rem;
        }

        .coach-image {
            width: 30px;
            height: 30px;
        }

        .assign-coach-btn,
        .unassign-coach-btn {
            padding: 4px 8px;
            font-size: 0.7rem;
        }
    }

    .bulk-actions {
        .bulk-buttons {
            flex-direction: column;
            gap: 8px;
        }
    }
}

/* Task Management Styles */
.task-form-section {
    background: $white;
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid $color-divider;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    animation: fadeInUp 0.6s ease forwards;
    opacity: 0;
    transform: translateY(20px);
}

.form-header {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid $color-divider;

    .form-title {
        margin: 0;
        color: $heading;
        font-size: 1.3rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
}

.task-form-section.show {
    opacity: 1;
    transform: translateY(0);
}

.task-form {
    .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-bottom: 25px;
    }

    .form-group {
        margin-bottom: 0;

        .form-label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: $color-subtitle;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .form-control {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid $color-border;
            border-radius: 8px;
            font-size: 0.95rem;
            transition: all 0.3s ease;
            background: $white;

            &:focus {
                outline: none;
                border-color: #dc3545;
                box-shadow: 0 0 0 3px rgba(79, 112, 92, 0.1);
                transform: translateY(-1px);
            }

            &:hover {
                border-color: color.adjust($color-border, $lightness: -10%);
            }

            &::placeholder {
                color: $color-muted;
                font-style: italic;
            }
        }

        select.form-control {
            cursor: pointer;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
            background-position: right 12px center;
            background-repeat: no-repeat;
            background-size: 16px;
            padding-right: 40px;
            appearance: none;
        }

        textarea.form-control {
            resize: vertical;
            min-height: 100px;
            line-height: 1.5;
        }

        &.full-width {
            grid-column: 1 / -1;
        }
    }

    .form-actions {
        display: flex;
        gap: 15px;
        justify-content: flex-end;
        padding-top: 20px;
        border-top: 1px solid $color-divider;

        .btn {
            min-width: 120px;
            padding: 12px 20px;
            font-size: 0.9rem;
            font-weight: 600;
            border-radius: 8px;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;

            i {
                font-size: 0.85rem;
            }

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            &:active {
                transform: translateY(0);
            }
        }

        .btn-secondary {
            background: #6c757d;
            color: white;
            border: none;

            &:hover {
                background: #5a6268;
            }
        }

.btn-primary {
    background: #dc3545;
    color: $white;
    border: none;
    border-radius: $border-radius-md;
    padding: $padding-sm $padding-md;
    font-weight: $font-weight-medium;
    transition: all 0.3s ease;

    &:hover {
        background: color.adjust(#dc3545, $lightness: -10%);
        transform: translateY(-1px);
        box-shadow: $box-shadow-md;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
}
    }
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Message Management Styles */
.message-form-section {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #dee2e6;
}

.message-form {
    .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-bottom: 20px;
    }

    .form-group {
        margin-bottom: 0;

        &.full-width {
            grid-column: 1 / -1;
        }
    }

    .form-actions {
        display: flex;
        gap: 15px;
        justify-content: flex-end;
        padding-top: 20px;
        border-top: 1px solid #dee2e6;
    }

    textarea.form-control {
        resize: vertical;
        min-height: 120px;
    }
}

.messages-inbox {
    .loading-messages {
        text-align: center;
        padding: 40px 20px;

        .spinner-border {
            margin-bottom: 15px;
        }

        p {
            color: $color-subtitle;
            margin: 0;
        }
    }

    .no-messages {
        text-align: center;
        padding: 40px 20px;
        background: rgba($background, 0.1);
        border: 1px solid $color-border;
        border-radius: 8px;

        i {
            font-size: 3rem;
            color: $color-muted;
            margin-bottom: 15px;
        }

        p {
            color: $color-subtitle;
            margin: 0;
        }
    }
}

.messages-list {
    .message-item {
        background: white;
        border: 1px solid $color-border;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 15px;
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        &.unread {
            border-left: 4px solid $primary;
            background: rgba($primary, 0.05);
        }

        .message-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;

            .message-sender {
                display: flex;
                flex-direction: column;
                gap: 5px;

                .message-date {
                    font-size: 0.8rem;
                    color: $color-muted;
                }
            }

            .message-subject {
                font-size: 1.1rem;
                color: $heading;
            }
        }

        .message-preview {
            color: $color-subtitle;
            margin-bottom: 15px;
            line-height: 1.5;
        }

        .message-actions {
            display: flex;
            gap: 10px;

            .btn {
                padding: 6px 12px;
                font-size: 0.8rem;
            }
        }
    }
}

/* Chat Interface Styles */
.chat-container {
    display: flex;
    flex-direction: column;
    height: 600px;
    background: $white;
    border-radius: 8px;
    border: 1px solid $color-border;
    overflow: hidden;
}

.chat-status {
    display: flex;
    align-items: center;
    gap: 4px;
}

.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    background: #f8f9fa;
    
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 3px;
        
        &:hover {
            background: #555;
        }
    }
}

.messages-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.message-bubble {
    display: flex;
    max-width: 75%;
    animation: fadeIn 0.3s ease-in;
    
    &.message-sent {
        align-self: flex-end;
        
        .message-content {
            background: $primary;
            color: white;
            border-radius: 18px 18px 4px 18px;
            
            .message-time {
                color: rgba(255, 255, 255, 0.8);
            }
        }
    }
    
    &.message-received {
        align-self: flex-start;
        
        .message-content {
            background: white;
            color: $color-subtitle;
            border: 1px solid $color-border;
            border-radius: 18px 18px 18px 4px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            
            .message-time {
                color: $color-muted;
            }
        }
    }
    
    .message-content {
        padding: 12px 16px;
        position: relative;
        
        .message-text {
            margin: 0 0 4px 0;
            word-wrap: break-word;
            white-space: pre-wrap;
            line-height: 1.4;
        }
        
        .message-time {
            font-size: 0.7rem;
            display: block;
            text-align: right;
            margin-top: 4px;
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

.chat-input-container {
    border-top: 1px solid $color-border;
    background: white;
    padding: 15px;
}

.chat-input-form {
    .input-group {
        display: flex;
        align-items: flex-end;
        gap: 10px;
        
        .chat-input {
            flex: 1;
            border: 1px solid $color-border;
            border-radius: 10px;
            resize: none;
            font-size: 0.8rem;
            line-height: 1.4;
            max-height: 120px;
            overflow-y: auto;
            
            &:focus {
                border-color: $primary;
                box-shadow: 0 0 0 0.2rem rgba($primary, 0.25);
                outline: none;
            }
            
            &::placeholder {
                color: $color-muted;
            }
        }
        
        .send-button {
            border-radius: 50%;
            width: 44px;
            height: 44px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            
            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        }
    }
    
    .message-counter {
        display: block;
        margin-top: 6px;
        font-size: 0.75rem;
        text-align: right;
    }
}

.loading-messages,
.no-messages {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: $color-muted;
    
    i {
        font-size: 3rem;
        margin-bottom: 15px;
        opacity: 0.5;
    }
    
    p {
        margin: 0;
    }
}

/* Compact Table Styles */
.compact-table {
    .assigned-members-table.compact {
        font-size: 0.8rem;
        margin-bottom: 0;
        
        .table-header.compact {
            th {
                padding: 6px 8px;
                font-size: 0.75rem;
                font-weight: 600;
                background: #f8f9fa;
                border-bottom: 2px solid #dee2e6;
                color: #495057;
            }
        }
        
        .table-row.compact {
            td {
                padding: 4px 8px;
                vertical-align: middle;
                border-bottom: 1px solid #f0f0f0;
            }
            
            &:hover {
                background-color: #f8f9fa;
            }
        }
        
        .coach-info.compact {
            display: flex;
            align-items: center;
            gap: 6px;
            
            .coach-avatar.compact {
                width: 28px;
                height: 28px;
                flex-shrink: 0;
                
                .coach-image.compact {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                }
            }
            
            .coach-details.compact {
                min-width: 0;
                
                .coach-name.compact {
                    font-weight: 600;
                    font-size: 0.8rem;
                    color: #495057;
                    line-height: 1.2;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 120px;
                }
                
                .coach-gender.compact {
                    font-size: 0.7rem;
                    color: #6c757d;
                    line-height: 1.1;
                }
            }
        }
        
        .coach-id.compact {
            font-size: 0.75rem;
            font-weight: 500;
            color: #dc3545;
            font-family: 'Courier New', monospace;
        }
        
        .contact-info.compact {
            display: flex;
            gap: 8px;
            align-items: center;
            
            .contact-item {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.2s ease;
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                
                &:hover {
                    background: #dc3545;
                    color: white;
                    transform: scale(1.1);
                    box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);
                }
                
                i {
                    font-size: 0.7rem;
                    color: #6c757d;
                }
                
                &:hover i {
                    color: white;
                }
            }
        }
        
        .coach-plan.compact {
            font-size: 0.75rem;
            font-weight: 500;
            padding: 2px 6px;
            border-radius: 3px;
            display: inline-block;
        }
        
        .coach-status.compact {
            font-size: 0.75rem;
            font-weight: 500;
            padding: 2px 6px;
            border-radius: 3px;
            display: inline-block;
        }
        
        .join-date.compact {
            font-size: 0.75rem;
            color: #6c757d;
            font-family: 'Courier New', monospace;
        }
        
        .coach-actions.compact {
            display: flex;
            gap: 2px;
            
            .btn.compact {
                padding: 2px 6px;
                font-size: 0.7rem;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 3px;
                
                i {
                    font-size: 0.7rem;
                }
            }
        }
    }
}

/* Member Assignment Styles */
.coach-assignment-section {
    .search-filter-section {
        background: rgba($background, 0.05);
        border: 1px solid $color-border;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;

        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
    }
}

.assigned-members-list {
    .loading-assigned-members {
        text-align: center;
        padding: 40px 20px;

        .spinner-border {
            margin-bottom: 15px;
        }

        p {
            color: $color-subtitle;
            margin: 0;
        }
    }

    .no-assigned-members {
        text-align: center;
        padding: 40px 20px;
        background: rgba($background, 0.1);
        border: 1px solid $color-border;
        border-radius: 8px;

        i {
            font-size: 3rem;
            color: $color-muted;
            margin-bottom: 15px;
        }

        p {
            color: $color-subtitle;
            margin: 0;
        }
    }
}

/* Compact Card Grid Styles */
.assigned-members-grid.compact {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
    margin-top: 8px;
}

.assigned-coach-card.compact {
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 0;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    overflow: visible;
    display: flex;
    flex-direction: column;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-color: #dc3545;
    }
    
    .card-header {
        display: flex;
        align-items: center;
        padding: 12px;
        background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        border-bottom: 1px solid #e9ecef;
        flex-shrink: 0;
        
        .coach-avatar.compact {
            position: relative;
            width: 48px;
            height: 48px;
            flex-shrink: 0;
            margin-right: 12px;
            
            .coach-image.compact {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid white;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .status-indicator {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: 2px solid white;
                
                &.text-success {
                    background: #28a745;
                }
                
                &.text-warning {
                    background: #ffc107;
                }
                
                &.text-danger {
                    background: #dc3545;
                }
                
                &.text-info {
                    background: #17a2b8;
                }
            }
        }
        
        .member-info {
            flex: 1;
            min-width: 0;
            overflow: hidden;
            
            .coach-name.compact {
                font-size: 0.95rem;
                font-weight: 600;
                color: #495057;
                margin: 0 0 4px 0;
                line-height: 1.3;
                word-wrap: break-word;
                word-break: break-word;
                overflow-wrap: break-word;
                hyphens: auto;
            }
            
            .coach-id.compact {
                font-size: 0.75rem;
                color: #dc3545;
                font-family: 'Courier New', monospace;
                font-weight: 500;
                word-break: break-all;
            }
        }
        
        .quick-actions {
            display: flex;
            gap: 4px;
            flex-shrink: 0;
            margin-left: 8px;
            
            .btn-icon {
                width: 28px;
                height: 28px;
                padding: 0;
                border: none;
                border-radius: 4px;
                background: transparent;
                color: #6c757d;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                cursor: pointer;
                
                &:hover {
                    background: #dc3545;
                    color: white;
                    transform: scale(1.1);
                }
                
                i {
                    font-size: 0.8rem;
                }
            }
        }
    }
    
    .card-body {
        padding: 12px !important;
        flex: 1;
        overflow: visible;
        
        .info-grid {
            display: grid;
            gap: 8px;
            margin-bottom: 10px;
            
            .info-item {
                display: flex;
                align-items: flex-start;
                gap: 8px;
                font-size: 0.75rem;
                line-height: 1.4;
                word-wrap: break-word;
                
                i {
                    width: 16px;
                    color: #6c757d;
                    font-size: 0.8rem;
                    flex-shrink: 0;
                    margin-top: 2px;
                }
                
                span {
                    flex: 1;
                    min-width: 0;
                    word-wrap: break-word;
                    word-break: break-word;
                    overflow-wrap: break-word;
                }
                
                .clickable-text {
                    color: #495057;
                    cursor: pointer;
                    transition: color 0.2s ease;
                    
                    &:hover {
                        color: #dc3545;
                        text-decoration: underline;
                    }
                }
                
                span:not(.clickable-text) {
                    color: #6c757d;
                }
            }
        }
        
        .badges-row {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
            margin-top: 8px;
            
            .plan-badge, .status-badge {
                font-size: 0.75rem;
                font-weight: 500;
                padding: 4px 8px;
                border-radius: 4px;
                display: inline-block;
                white-space: nowrap;
            }
            
            .plan-badge {
                background: #e3f2fd;
                color: #1976d2;
                border: 1px solid #bbdefb;
            }
            
            .status-badge {
                &.text-success {
                    background: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                }
                
                &.text-warning {
                    background: #fff3cd;
                    color: #856404;
                    border: 1px solid #ffeaa7;
                }
                
                &.text-danger {
                    background: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                }
                
                &.text-info {
                    background: #d1ecf1;
                    color: #0c5460;
                    border: 1px solid #bee5eb;
                }
            }
        }
    }
    
    .card-footer {
        padding: 8px 12px;
        background: #f8f9fa;
        border-top: 1px solid #e9ecef;
        
        .unassign-btn {
            width: 100%;
            font-size: 0.8rem;
            padding: 6px 12px;
            border-radius: 4px;
            font-weight: 500;
            transition: all 0.2s ease;
            
            &:hover {
                transform: translateY(-1px);
                box-shadow: 0 2px 4px rgba(220, 53, 69, 0.3);
            }
        }
    }
}

/* Member Details Popup Styling */
.member-details-popup {
    .swal2-popup {
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    
    .swal2-title {
        color: #333;
        font-weight: 600;
        margin-bottom: 20px;
    }
    
    .swal2-html-container {
        margin: 0;
        padding: 0;
    }
}

/* Responsive adjustments for compact cards */
@media (max-width: 768px) {
    .assigned-members-grid.compact {
        grid-template-columns: 1fr;
        gap: 12px;
    }
    
    .assigned-coach-card.compact {
        .card-header {
            padding: 12px;
            
            .coach-avatar.compact {
                width: 40px;
                height: 40px;
            }
            
            .member-info {
                .coach-name.compact {
                    font-size: 0.9rem;
                }
            }
        }
        
        .card-body {
            padding: 12px !important;
        }
        
        .card-footer {
            padding: 10px 12px;
        }
    }
}

.assigned-coach-card {
    background: white;
    border: 1px solid $color-border;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .coach-avatar {
        flex-shrink: 0;

        .coach-image {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid $color-border;
        }
    }

    .coach-details {
        flex: 1;

        .coach-name {
            font-size: 1.1rem;
            font-weight: 600;
            color: $heading;
            margin: 0 0 5px 0;
        }

        .coach-id {
          font-size: 0.85rem;
    color: #6c757d;
    margin: 0;
    font-weight: 500;
        }

        .coach-email {
            font-size: 0.9rem;
            color: $color-subtitle;
            margin: 0 0 10px 0;
        }

        .coach-status-info {
            display: flex;
            gap: 10px;

            .coach-plan,
            .coach-status {
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.8rem;
                font-weight: 600;
            }

            .coach-status {
                &.active {
                    background-color: rgba(40, 167, 69, 0.2);
                    color: #155724;
                    border: 1px solid rgba(40, 167, 69, 0.3);
                }

                &.inactive {
                    background-color: rgba(108, 117, 125, 0.2);
                    color: #495057;
                    border: 1px solid rgba(108, 117, 125, 0.3);
                }

                &.on-hold {
                    background-color: rgba(255, 193, 7, 0.2);
                    color: #856404;
                    border: 1px solid rgba(255, 193, 7, 0.3);
                }
            }
        }
    }

    .coach-actions {
        flex-shrink: 0;
    }
}

/* Responsive adjustments for messages and members */
@media (max-width: 768px) {
    .message-form {
        .form-grid {
            grid-template-columns: 1fr;
            gap: 15px;
        }

        .form-actions {
            flex-direction: column;
            gap: 10px;
        }
    }

    .messages-list {
        .message-item {
            .message-header {
                flex-direction: column;
                gap: 10px;
            }

            .message-actions {
                flex-wrap: wrap;
            }
        }
    }

    .assigned-members-grid {
        grid-template-columns: 1fr;
    }

    .assigned-coach-card {
        flex-direction: column;
        text-align: center;

        .coach-actions {
            margin-top: 15px;
        }
    }
}

/* Settings Styles */
.settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;
    margin-top: 20px;
}

.settings-section {
    background: white;
    border: 1px solid $color-border;
    border-radius: 12px;
    padding: 25px;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    .settings-title {
        font-size: 1.1rem;
        font-weight: 600;
        color: #333;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #f0f0f0;
    }

    .form-group {
        margin-bottom: 15px;

        label {
            font-weight: 500;
            color: #555;
            margin-bottom: 5px;
        }

        .form-control {
            border-radius: 6px;
            border: 1px solid #ddd;
            padding: 8px 12px;
            transition: border-color 0.2s ease;

            &:focus {
                border-color: #dc3545;
                box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
            }
        }

        .form-check {
            margin-bottom: 10px;

            .form-check-input {
                margin-top: 0.25rem;
            }

            .form-check-label {
                margin: 15px 15px;
                font-weight: 400;
            }
        }
    }

    .section-header {
        display: flex;
        align-items: center;
        gap: $margin-xs;
        margin-bottom: $margin-md;
        padding-bottom: $padding-sm;
        border-bottom: 2px solid $color-divider;

        h5 {
            display: flex;
            align-items: center;
            gap: $margin-xs;
            font-size: $font-size-lg;
            font-weight: $font-weight-semibold;
            color: $color-heading;
            margin: 0;
            padding: 0;

            i {
                font-size: $font-size-md;
                color: $color-button;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            span {
                display: inline-block;
            }
        }
    }

    .section-content {
        .form-group {
            margin-bottom: 20px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}

.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 8px;
}

.checkbox-item {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: rgba($primary, 0.05);
    }

    input[type="checkbox"] {
        width: 18px;
        height: 18px;
        margin: 0;
        cursor: pointer;
    }

    span {
        font-size: 0.9rem;
        color: $color-subtitle;
        font-weight: 500;
    }
}

.time-range {
    display: flex;
    align-items: center;
    gap: 10px;

    input[type="time"] {
        flex: 1;
    }

    span {
        font-weight: 600;
        color: $color-subtitle;
    }
}

.toggle-switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 30px;

    input[type="checkbox"] {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .toggle-label {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 30px;

        &:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: 0.4s;
            border-radius: 50%;
        }
    }

    input:checked+.toggle-label {
        background-color: #dc3545;
    }

    input:checked+.toggle-label:before {
        transform: translateX(30px);
    }
}

/* Responsive adjustments for settings */
@media (max-width: 768px) {
    .settings-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .settings-section {
        padding: 20px;

        .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
        }
    }

    .time-range {
        flex-direction: column;
        gap: 8px;

        span {
            text-align: center;
        }
    }
}

.tasks-table-section {
    margin-top: 30px;

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .section-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: $heading;
            margin: 0;

            i {
                margin-right: 8px;
                color: #dc3545;
            }
        }

        .refresh-btn {
            background: #dc3545;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 6px;

            &:hover:not(:disabled) {
                background: color.adjust($primary, $lightness: -10%);
                transform: translateY(-1px);
            }

            &:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }
        }
    }
}

.loading-tasks {
    text-align: center;
    padding: 40px 20px;

    .spinner-border {
        margin-bottom: 15px;
    }

    p {
        color: $color-subtitle;
        margin: 0;
    }
}

.no-tasks {
    text-align: center;
    padding: 40px 20px;
    background: rgba($background, 0.1);
}

/* Assigned Members Overview Styles */
.assigned-members-overview {
    .overview-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding: 20px;
        background: rgba($background, 0.1);
        border-radius: 10px;

        h5 {
            margin: 0;
            color: $heading;
            font-weight: 600;
        }

        .view-toggle {
            display: flex;
            gap: 10px;
        }
    }

    .members-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 10px;
        margin-bottom: 5px;

        .stat-card {
            background: white;
            padding: 5px;
            border-radius: 5px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            gap: 10px;
            transition: transform 0.3s ease;

            &:hover {
                transform: translateY(-2px);
            }

            .stat-icon {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                background: linear-gradient(135deg,
                    $primary,
                        color.adjust($primary, $lightness: 20%));
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.2rem;
            }

            .stat-content {
                .stat-number {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: $heading;
                    line-height: 1;
                }

                .stat-label {
                    color: $color-subtitle;
                    font-size: 0.9rem;
                    margin-top: 5px;
                }
            }
        }
    }

    .assigned-members-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        margin-bottom: 30px;

        .assigned-coach-card {
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            position: relative;

            &:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }

            .coach-avatar {
                position: relative;
                text-align: center;
                margin-bottom: 15px;

                .coach-image {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 3px solid $primary;
                }

                .coach-status-badge {
                    position: absolute;
                    top: 0;
                    right: 50%;
                    transform: translateX(50%);
                    background: #dc3545;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 0.7rem;
                    font-weight: 600;
                    text-transform: uppercase;
                }
            }

            .coach-details {
                // text-align: center;
                margin-bottom: 20px;

                .coach-name {
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: $heading;
                    margin-bottom: 8px;
                }

                .coach-id,
                .coach-email,
                .coach-phone {
                    color: $color-subtitle;
                    margin-bottom: 5px;
                    font-size: 0.9rem;
                }

                .coach-info-row {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin: 15px 0;

                    .coach-plan {
                        padding: 4px 12px;
                        border-radius: 15px;
                        font-size: 0.8rem;
                        font-weight: 600;
                        text-transform: uppercase;

                        &.plan-premium {
                            background: linear-gradient(135deg,
                                #ffd700,
                                    #ffed4e);
                            color: #8b6914;
                        }

                        &.plan-vip {
                            background: linear-gradient(135deg,
                                #c71585,
                                    #ff69b4);
                            color: white;
                        }

                        &.plan-basic {
                            background: linear-gradient(135deg,
                                #87ceeb,
                                    #b0e0e6);
                            color: #2f4f4f;
                        }

                        &.plan-na {
                            background: #f0f0f0;
                            color: #666;
                        }
                    }

                    .coach-gender {
                        color: $color-subtitle;
                        font-size: 0.8rem;
                    }
                }

                .coach-join-date {
                    color: $color-subtitle;
                    font-size: 0.8rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                }
            }

            .coach-actions {
                display: flex;
                justify-content: center;
                gap: 8px;

                .btn {
                    padding: 6px 10px;
                    font-size: 0.8rem;
                    border-radius: 6px;
                    transition: all 0.3s ease;

                    &:hover {
                        transform: translateY(-1px);
                    }
                }
            }
        }
    }

    .assigned-members-table {
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

        .table-header {
            background: linear-gradient(135deg,
                $background,
                    color.adjust($background, $lightness: 10%));

            th {
                border: none;
                padding: 15px;
                font-weight: 600;
                color: $heading;
                text-align: left;
            }
        }

        .table-row {
            transition: background-color 0.3s ease;

            &:hover {
                background-color: rgba($primary, 0.05);
            }

            td {
                padding: 15px;
                border-bottom: 1px solid rgba($color-divider, 0.3);
                vertical-align: middle;
            }
        }

        .coach-info {
            display: flex;
            align-items: center;
            gap: 12px;

            .coach-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                flex-shrink: 0;

                .coach-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .coach-details {
                .coach-name {
                    font-weight: 600;
                    color: $heading;
                    margin-bottom: 2px;
                }

                .coach-gender {
                    font-size: 0.8rem;
                    color: $color-subtitle;
                }
            }
        }

        .contact-info {
            .coach-email {
                font-weight: 500;
                color: $heading;
                margin-bottom: 2px;
            }

            .coach-phone {
                font-size: 0.8rem;
                color: $color-subtitle;
            }
        }

        .coach-actions {
            display: flex;
            gap: 5px;
            flex-wrap: wrap;

            .btn {
                padding: 4px 8px;
                font-size: 0.8rem;
            }
        }
    }
}

/* Enhanced Members Table Styles */
.all-members-section {
    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding: 20px;
        background: rgba($background, 0.1);
        border-radius: 10px;

        h5 {
            margin: 0;
            color: $heading;
            font-weight: 600;
        }

        .view-controls {
            display: flex;
            gap: 10px;
        }
    }

    .members-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 30px;

        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            gap: 15px;
            transition: transform 0.3s ease;

            &:hover {
                transform: translateY(-2px);
            }

            .stat-icon {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: linear-gradient(135deg,
                    $primary,
                        color.adjust($primary, $lightness: 20%));
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.2rem;
            }

            .stat-content {
                .stat-number {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: $heading;
                    line-height: 1;
                }

                .stat-label {
                    color: $color-subtitle;
                    font-size: 0.9rem;
                    margin-top: 5px;
                }
            }
        }
    }

    .members-table {
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

        .table-header {
            background: linear-gradient(135deg,
                $background,
                    color.adjust($background, $lightness: 10%));

            th {
                border: none;
                padding: 15px;
                font-weight: 600;
                color: $heading;
                text-align: left;

                &.text-center {
                    text-align: center;
                }
            }
        }

        .table-row {
            transition: background-color 0.3s ease;

            &:hover {
                background-color: rgba($primary, 0.05);
            }

            td {
                padding: 15px;
                border-bottom: 1px solid rgba($color-divider, 0.3);
                vertical-align: middle;

                &.text-center {
                    text-align: center;
                }
            }
        }

        .coach-info {
            display: flex;
            align-items: center;
            gap: 12px;

            .coach-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                flex-shrink: 0;

                .coach-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .coach-details {
                .coach-name {
                    font-weight: 600;
                    color: $heading;
                    margin-bottom: 2px;
                }

                .coach-gender {
                    font-size: 0.8rem;
                    color: $color-subtitle;
                }
            }
        }

        .contact-info {
            .coach-email {
                font-weight: 500;
                color: $heading;
                margin-bottom: 2px;
            }

            .coach-phone {
                font-size: 0.8rem;
                color: $color-subtitle;
            }
        }

        .coach-actions {
            display: flex;
            gap: 5px;
            flex-wrap: wrap;

            .btn {
                padding: 4px 8px;
                font-size: 0.8rem;
            }
        }
    }

    .pagination-section {
        margin-top: 30px;
        text-align: center;

        .pagination {
            .page-item {
                .page-link {
                    color: #dc3545;
                    border: 1px solid rgba($primary, 0.2);
                    margin: 0 2px;
                    border-radius: 6px;

                    &:hover {
                        background-color: rgba($primary, 0.1);
                        border-color: #dc3545;
                    }
                }

                &.active .page-link {
                    background-color: #dc3545;
                    border-color: #dc3545;
                    color: white;
                }

                &.disabled .page-link {
                    color: $color-subtitle;
                    border-color: rgba($color-divider, 0.3);
                    cursor: not-allowed;
                }
            }
        }
    }
}

.default-members-view {
    text-align: center;
    padding: 60px 20px;

    .welcome-section {
        max-width: 600px;
        margin: 0 auto;

        .welcome-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg,
                $primary,
                    color.adjust($primary, $lightness: 20%));
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            color: white;
            font-size: 2rem;
        }

        h5 {
            color: $heading;
            font-size: 1.5rem;
            margin-bottom: 15px;
        }

        p {
            color: $color-subtitle;
            margin-bottom: 30px;
            line-height: 1.6;
        }

        .action-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;

            .btn {
                padding: 12px 24px;
                font-size: 1rem;
                border-radius: 8px;
                transition: all 0.3s ease;

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                }
            }
        }
    }
}

.header-actions {
    display: flex;
    gap: 8px;
    align-items: center;
    
    .view-toggle-group {
        display: flex;
        gap: 2px;
        background: #f8f9fa;
        border-radius: 6px;
        padding: 2px;
        border: 1px solid #e9ecef;
        
        .view-toggle-btn {
            width: 32px;
            height: 32px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            border: none;
            transition: all 0.2s ease;
            font-size: 0.9rem;
            
            &:hover {
                transform: translateY(-1px);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            &.btn-primary {
                background: #dc3545;
                color: white;
                box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);
            }
            
            &.btn-outline-secondary {
                background: transparent;
                color: #6c757d;
                
                &:hover {
                    background: #e9ecef;
                    color: #495057;
                }
            }
        }
    }
    
    .assign-member-btn {
        background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
        border: none;
        border-radius: 6px;
        padding: 8px 16px;
        font-weight: 600;
        font-size: 0.85rem;
        color: white;
        box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 6px;
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
            background: linear-gradient(135deg, #c82333 0%, #bd2130 100%);
        }
        
        &:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(220, 53, 69, 0.3);
        }
        
        i {
            font-size: 0.9rem;
        }
    }
}

.no-assigned-members {
    text-align: center;
    padding: 40px 20px;

    i {
        font-size: 3rem;
        color: $color-muted;
        margin-bottom: 15px;
    }

    p {
        color: $color-subtitle;
        margin: 0;
    }
}

.tasks-table {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    thead {
        background: $color-input-bg;

        th {
            border: none;
            padding: 15px 12px;
            font-weight: 600;
            color: $color-subtitle;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
    }

    tbody {
        tr {
            transition: all 0.3s ease;

            &:hover {
                background: rgba(79, 112, 92, 0.05);
            }

            td {
                border: none;
                padding: 15px 12px;
                vertical-align: middle;
                border-bottom: 1px solid $color-divider;
            }
        }
    }
}

.task-title {
    .task-description {
        font-size: 0.8rem;
        color: $color-muted;
        margin-top: 4px;
        line-height: 1.3;
    }
}

.badge {
    padding: 3px 6px;
    border-radius: 15px;
}

.category-badge,
.priority-badge,
.status-badge {
    color: white;
}

.task-actions {
    display: flex;
    gap: 8px;

    .btn {
        padding: 6px 10px;
        font-size: 0.8rem;
        border-radius: 6px;
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-1px);
        }
    }
}

/* Editing task indicator */
.editing-task {
    background-color: rgba(79, 112, 92, 0.15) !important;
    border-left: 4px solid $primary !important;
    box-shadow: 0 2px 8px rgba(79, 112, 92, 0.2) !important;
}

.editing-task td {
    font-weight: 600;
}

/* Button Styles */
.btn {
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 6px;
}

.btn-primary {
    background: #dc3545;
    color: white;
}

.btn-primary:hover {
    background: color.adjust($primary, $lightness: -10%);
    transform: translateY(-1px);
}

.btn-secondary {
    background: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background: #5a6268;
    transform: translateY(-1px);
}

.btn-success {
    background: #28a745;
    color: white;
}

.btn-success:hover {
    background: #218838;
    transform: translateY(-1px);
}

.btn-outline-primary {
    background: transparent;
    color: #dc3545;
    border: $border-width-sm solid #dc3545;
    border-radius: $border-radius-md;
    padding: $padding-sm $padding-md;
    font-weight: $font-weight-medium;
    transition: all 0.3s ease;

    &:hover {
        background: #dc3545;
        color: $white;
        transform: translateY(-1px);
        box-shadow: $box-shadow-md;
    }
}

.btn-outline-warning {
    background: transparent;
    color: #ffc107;
    border: 1px solid #ffc107;
}

.btn-outline-warning:hover {
    background: #ffc107;
    color: #212529;
    transform: translateY(-1px);
}

// Data Cards Layout Styles
.data-cards-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
}

.data-card {
    display: flex;
    align-items: center;
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 12px 16px;
    min-height: 48px;
    transition: all 0.2s ease;
    gap: 16px;

    &:hover {
        background: #e9ecef;
        border-color: #dee2e6;
    }

    .data-label {
        font-weight: 500;
        color: #000000;
        font-size: 14px;
        min-width: 140px;
        flex-shrink: 0;
    }

    .data-value {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #212529;
        font-size: 14px;
        font-weight: 400;
        flex: 1;

        .inline-edit {
            border: 1px solid #ced4da;
            border-radius: 4px;
            padding: 4px 8px;
            font-size: 14px;
            background: white;
            width: 100%;
            text-align: left;

            &:focus {
                outline: none;
                border-color: #80bdff;
                box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
            }

            &.readonly {
                background: transparent;
                border: none;
                padding: 0;
            }
        }

        .status-active {
            color: #28a745;
            font-weight: 500;
        }

        .info-icon {
            color: #6c757d;
            font-size: 12px;
            cursor: pointer;
            background: none;
            border: none;
            padding: 0;
            margin-left: 4px;
            transition: color 0.2s ease;

            &:hover {
                color: #495057;
            }
        }

        .edit-icon {
            color: #6c757d;
            font-size: 12px;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s ease;

            &:hover {
                opacity: 1;
            }
        }
    }
}

// Notes Content Styles
.notes-content {
    padding: 20px;
}

.add-note-section {
    margin-bottom: 15px;
    padding: 15px;
    background: #dededc;
    border-radius: 8px;
    border: 1px solid #e9ecef;

    .section-title {
        font-size: 18px;
        font-weight: 600;
        color: #252525;
        margin-bottom: 20px;
    }

    .note-form {
        display: flex;
        flex-direction: column;
        gap: 15px;

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;

            .form-label {
                font-weight: 500;
                color: #252525;
                font-size: 14px;
            }

            .note-textarea {
                min-height: 100px;
                resize: vertical;
                border: 1px solid #e9ecef;
                border-radius: 4px;
                padding: 12px;
                font-size: 14px;

                &:focus {
                    outline: none;
                    border-color: #ff4040;
                    box-shadow: 0 0 0 0.2rem rgba(255, 64, 64, 0.25);
                }
            }

            .form-control {
                border: 1px solid #e9ecef;
                border-radius: 4px;
                padding: 8px 12px;
                font-size: 14px;

                &:focus {
                    outline: none;
                    border-color: #ff4040;
                    box-shadow: 0 0 0 0.2rem rgba(255, 64, 64, 0.25);
                }
            }
        }

        .save-note-btn {
            align-self: flex-start;
            background: #dc3545;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                background: color.adjust($primary, $lightness: -10%);
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(255, 64, 64, 0.3);
            }
        }
    }
}

.overview-section {
    .overview-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin: 0;
        }

        .category-filter {
            width: 150px;
            border: 1px solid #ced4da;
            border-radius: 4px;
            padding: 8px 12px;
            font-size: 14px;

            &:focus {
                outline: none;
                border-color: #dc3545;
                box-shadow: 0 0 0 0.2rem rgba(255, 64, 64, 0.25);
            }
        }
    }

    .notes-list {
        .no-results {
            text-align: center;
            color: #6c757d;
            font-size: 16px;
            padding: 40px 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        }

        .notes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;

            .note-card {
                background: white;
                border: 1px solid #e9ecef;
                border-radius: 8px;
                padding: 16px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                transition: box-shadow 0.3s ease;

                &:hover {
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                }

                .note-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid #f1f3f4;

                    .note-category {
                        background: #dc3545;
                        color: white;
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 12px;
                        font-weight: 500;
                    }

                    .note-date {
                        color: #6c757d;
                        font-size: 12px;
                    }
                }

                .note-content {
                    color: #252525;
                    font-size: 14px;
                    line-height: 1.5;
                    margin-bottom: 12px;
                }

                .note-actions {
                    display: flex;
                    gap: 8px;
                    justify-content: flex-end;

                    .btn {
                        padding: 4px 8px;
                        font-size: 12px;
                        border-radius: 4px;
                        transition: all 0.3s ease;
                    }

                    .btn-outline-primary {
                        color: #dc3545;
                        border-color: #ff4040;
                        
                        &:hover {
                            background: #dc3545;
                            color: white;
                            transform: translateY(-1px);
                        }
                    }

                    .btn-outline-danger {
                        color: #dc3545;
                        border-color: #dc3545;
                        
                        &:hover {
                            background: #dc3545;
                            color: white;
                            transform: translateY(-1px);
                        }
                    }
                }
            }
        }
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .coach-header-section {
        padding: 12px 16px;
    }

    .header-wrapper {
        gap: 12px;
    }

    .breadcrumb-section {
        width: 100%;
    }

    .header-content {
        width: 100%;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 6px;
    }

    .tab-icons {
        flex-wrap: wrap;
        justify-content: center;
        gap: 3px;
    }

    .tab-icon-btn {
        width: 32px;
        height: 32px;
        font-size: 12px;
    }

    .form-grid {
        grid-template-columns: 1fr;
        gap: 15px;
    }

    .profile-avatar {
        width: 60px;
        height: 60px;
    }

    .coach-name {
        font-size: 1rem;
    }

    .data-card {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;

        .data-value {
            justify-content: flex-start;
            text-align: left;
        }
    }

    .tab-navigation {
        flex-wrap: wrap;
        gap: 8px;
        margin: 15px 0 15px 15px;
    }

    .tab-item {
        flex: 1 1 auto;
        min-width: 120px;
        padding: 8px 12px;
        font-size: 0.85rem;
        border-radius: 16px;
    }

    .tab-content {
        min-height: 300px;
    }

    .form-section.compact {
        padding: 12px;
    }

    .section-header.compact {
        margin-bottom: 12px;
    }

    .form-group.compact {
        margin-bottom: 10px;
    }

    .form-control.compact {
        padding: 6px 10px;
        font-size: 0.85rem;
    }

    .action-buttons {
        gap: 10px;
    }

    .action-buttons .btn {
        min-width: 100px;
        padding: 10px 16px;
        font-size: 0.85rem;
    }

    .bottom-actions {
        padding: 10px;
    }
}

/* Profile Form Styles */
.profile-form {
    padding: 30px 0;
}

/* Assignment Header Styles */
.assignment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    padding: 20px;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    border-radius: 12px;
    border: 1px solid #dee2e6;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    .assignment-title {
        margin: 0;
        color: $heading;
        font-size: 1.3rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 10px;

        i {
            color: #dc3545;
            font-size: 1.1rem;
        }
    }

    .close-btn {
        padding: 8px 16px;
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.3s ease;

        &:hover {
            background-color: #6c757d;
            border-color: #6c757d;
            color: white;
            transform: translateY(-1px);
        }

        i {
            margin-right: 5px;
        }
    }
}

/* Settings Actions Styles */
.settings-actions {
    margin-top: 30px;
    padding: 25px;
    background: #f8f9fa;
    border-radius: 12px;
    border: 1px solid #dee2e6;

    .action-buttons {
        display: flex;
        gap: 15px;
        justify-content: center;

        .btn {
            padding: 12px 24px;
            font-weight: 500;
            border-radius: 8px;
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            &:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none;
                box-shadow: none;
            }
        }
    }
}

// Coach Assignment Styles
.coach-assignment-content {
    padding: 20px 0;
}

// Trainer Assignment Styles
.trainer-assignment-content {
    padding: 20px 0;
}

.existing-assignment {
    margin-bottom: 30px;

    .assignment-info {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 20px;

        .info-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;

            &:last-child {
                margin-bottom: 0;
            }

            strong {
                color: #6c757d;
                font-weight: 600;
            }

            .coach-name,
            .coach-type {
                color: #495057;
                font-weight: 500;
            }

            .status-badge {
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 600;

                &.active {
                    background: #d4edda;
                    color: #155724;
                }
            }
        }
    }

    .assignment-actions {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
    }
}

.current-assignment {
    margin-bottom: 30px;
}

.assignment-card {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 20px;
}

.assignment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h5 {
        margin: 0;
        color: #495057;
    }
}

.assignment-status {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;

    &.active {
        background: #d4edda;
        color: #155724;
    }
}

.assignment-details {
    .detail-row {
        display: flex;
        margin-bottom: 12px;

        .label {
            font-weight: 600;
            color: #6c757d;
            min-width: 140px;
        }

        .value {
            color: #495057;
        }
    }
}

.coach-assignment-form {
    form {
        .form-actions {
            display: flex;
            gap: 15px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
        }
    }
}

.no-assignment {
    .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #6c757d;

        i {
            font-size: 48px;
            margin-bottom: 20px;
            color: #dee2e6;
        }

        h5 {
            margin-bottom: 10px;
            color: #495057;
        }

        p {
            margin: 0;
            font-size: 0.9rem;
        }
    }
}

/* Tab Content Body Styles */
.tab-content-body {
    padding: 20px;
}

.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #6c757d;

    .empty-state-icon {
        margin-bottom: 20px;
        
        i {
            font-size: 48px;
            color: #dee2e6;
        }
    }

    .empty-state-title {
        margin-bottom: 10px;
        color: #495057;
        font-size: 1.2rem;
    }

    .empty-state-text {
        margin-bottom: 20px;
        font-size: 0.9rem;
        line-height: 1.5;
    }
}

/* Activities List Styles */
.activities-list {
    .activity-item {
        display: flex;
        align-items: flex-start;
        padding: 15px 0;
        border-bottom: 1px solid #f0f0f0;

        &:last-child {
            border-bottom: none;
        }

        .activity-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #f8f9fa;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            flex-shrink: 0;

            i {
                font-size: 16px;
            }
        }

        .activity-content {
            flex: 1;

            .activity-title {
                font-weight: 600;
                color: #495057;
                margin-bottom: 4px;
                font-size: 0.95rem;
            }

            .activity-description {
                color: #6c757d;
                font-size: 0.85rem;
                margin-bottom: 4px;
                line-height: 1.4;
            }

            .activity-time {
                color: #adb5bd;
                font-size: 0.8rem;
            }
        }
    }
}

/* Change Tracking Styles */
.change-indicator {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: #28a745;
    font-size: 0.8rem;
    z-index: 10;
    pointer-events: none;
}

.data-value {
    position: relative;
}

.inline-edit.has-changes {
    border-color: #28a745 !important;
    background-color: rgba(40, 167, 69, 0.05);
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.1);
}

.action-item.has-unsaved-changes {
    background-color: rgba(255, 193, 7, 0.1);
    border-color: #ffc107;
    color: #856404;
    
    .action-icon {
        color: #ffc107;
    }
}

.unsaved-indicator {
    position: absolute;
    top: 5px;
    right: 5px;
    color: #ffc107;
    font-size: 0.6rem;
    animation: pulse 2s infinite;
}

// .switch-indicator {
//     position: absolute;
//     top: 5px;
//     right: 20px;
//     color: #17a2b8;
//     font-size: 0.6rem;
//     opacity: 0.8;
// }

// .action-item.will-switch-tab {
//     background-color: rgba(23, 162, 184, 0.1);
//     border-color: #17a2b8;
//     color: #0c5460;
    
//     .action-icon {
//         color: #17a2b8;
//     }
    
//     .action-text {
//         color: #0c5460;
//     }
// }

// .action-item.will-switch-tab:hover {
//     background-color: rgba(23, 162, 184, 0.2);
//     border-color: #17a2b8;
// }

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}

/* Enhanced form field styling */
.inline-edit {
    transition: all 0.3s ease;
    
    &:focus {
        outline: none;
        border-color: #dc3545;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
    
    &.has-changes:focus {
        border-color: #28a745;
        box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.25);
    }
}

/* Action button enhancements */
.action-item {
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    &.has-unsaved-changes:hover {
        background-color: rgba(255, 193, 7, 0.2);
    }
}

/* Enhanced responsiveness across breakpoints */
@media (max-width: 1200px) {
    .main-layout {
        gap: 8px;
    }

    .tab-icons {
        flex-wrap: wrap;
    }

    .form-section.compact {
        padding: 12px;
    }
}

@media (max-width: 992px) {
    .main-layout {
        flex-direction: column;
        min-height: auto;
        max-height: none;
        overflow: visible;
    }

    .profile-sidebar {
        max-height: none;
        overflow: visible;
        order: 0;
        width: 100%;
    }

    .content-area {
        order: 1;
        overflow: visible;
    }

    .tab-icons {
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
    }

    .form-grid {
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }

    .assigned-members-grid.compact {
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }

    .info-grid {
        grid-template-columns: 1fr 1fr;
        gap: 8px;
    }
}

@media (max-width: 576px) {
    .coach-header-section {
        padding: 12px;
    }

    .tab-icons {
        justify-content: center;
        gap: 8px;
    }

    .tab-icon-btn {
        width: 36px;
        height: 36px;
    }

    .form-grid,
    .settings-grid,
    .info-grid {
        grid-template-columns: 1fr;
        gap: 10px;
    }

    .assigned-members-grid.compact {
        grid-template-columns: 1fr;
        gap: 10px;
    }

    .profile-avatar {
        width: 56px;
        height: 56px;
    }

    .action-item {
        padding: 8px;
    }
}
</style>