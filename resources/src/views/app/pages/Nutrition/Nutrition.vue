<template>
    <div class="members-page-wrapper">
        <!-- Breadcrumb and Navigation Row -->
        <div class="container-fluid px-3 px-md-4">
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
                                <i class="fas fa-utensils"></i>
                                Nutrition Hub
                            </li>
                        </ol>
                    </div>
                </nav>
            </div>

            <!-- Navigation Bar -->
            <div class="navigation">
                <div class="nav-items">
                    <!-- Quick Access Items -->
                    <div 
                        class="nav-item" 
                        :class="{ active: activeTab === 0 }"
                        @click="navigateToAssignedMeals"
                        title="View assigned meal reports"
                    >
                        <i class="fas fa-chart-line"></i>
                        <span>Assigned Meal Reports</span>
                    </div>
                    <div 
                        class="nav-item" 
                        :class="{ active: activeTab === 2 }"
                        @click="navigateToMeals"
                        title="Manage meals"
                    >
                        <i class="fas fa-utensils"></i>
                        <span>Meals</span>
                    </div>
                    <div 
                        class="nav-item" 
                        :class="{ active: activeTab === 1 }"
                        @click="navigateToMealPlans"
                        title="Manage meal plan templates"
                    >
                        <i class="fas fa-clipboard-list"></i>
                        <span>Meal Plans Templates</span>
                    </div>
                    <div 
                        class="nav-item" 
                        @click="navigateToNutritionMembers"
                        title="Manage members"
                    >
                        <i class="fas fa-users"></i>
                        <span>Members</span>
                    </div>
                </div>
                
                <!-- Help Button -->
                <div class="nav-actions">
                    <button
                        class="btn btn-lg btn-mail"
                        @click="openVideoTutorialModal"
                        title="Help"
                        style="padding: 8px 15px; font-size: 16px; min-width: auto;"
                    >
                        <i class="fas fa-video me-2"></i>
                        <span>Help</span>
                    </button>
                </div>
                
                <!-- Mobile Navigation -->
                <div class="mobile-nav">
                    <select 
                        v-model="activeTab" 
                        @change="onTabChange(activeTab)"
                        class="mobile-select"
                    >
                        <option 
                            v-for="(tab, idx) in tabs"
                            :key="tab.key" 
                            :value="idx"
                        >
                            {{ tab.label }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        </div>

        <!-- Assigned Meal Reports Tab (Default) -->
        <div class="container-fluid px-3 px-md-4 px-lg-5 py-3 py-md-4">
            <div v-show="activeTab === 0" class="tab-content">
            <div class="recent-messages-header">
                <h3 class="recent-messages-title">Member Recent Reports</h3>
            </div>
            <div class="assigned-meals-container">
                <!-- Filters Section -->
                <div class="filters-section">
                    <input 
                        v-model="searchQuery" 
                        type="text" 
                        placeholder="Search by name, date, or notes..."
                        class="filter-input search-input"
                    />
                    <input 
                        v-model="dateFrom" 
                        type="date" 
                        class="filter-input date-input"
                        placeholder="From"
                    />
                    <input 
                        v-model="dateTo" 
                        type="date" 
                        class="filter-input date-input"
                        placeholder="To"
                    />
                    <select v-model="statusFilter" class="filter-input select-input">
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>

                <!-- Data Table -->
                <div class="table-container">
                    <!-- Loading State -->
                    <div v-if="loadingLogs" class="loading-state">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Loading assigned meals logs...</p>
                    </div>
                    
                    <!-- Error State -->
                    <div v-else-if="logsError" class="error-state">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>{{ logsError }}</p>
                        <button @click="fetchAssignedMealsLogs" class="retry-btn">Retry</button>
                    </div>
                    
                    <!-- Empty State -->
                    <div v-else-if="!loadingLogs && logs.length === 0" class="empty-state">
                        <i class="fas fa-search"></i>
                        <p>No assigned meals logs found.</p>
                    </div>
                    
                    <!-- Data Table -->
                    <div v-else class="table-responsive">
                        <div class="table-wrapper">
                            <table class="data-table">
                            <thead>
                                <tr>
                                    <th class="sticky-column">Member</th>
                                    <th>Date</th>
                                    <th>Weight</th>
                                    <th>Body Fat</th>
                                    <th>Water Intake</th>
                                    <th>Hunger</th>
                                    <th>Strength</th>
                                    <th>Energy</th>
                                    <th>Meal Deviations</th>
                                    <th>Activities</th>
                                    <th>Feel</th>
                                    <th>Cardio</th>
                                    <th class="plan-column">Plan</th>
                                    <th>Calories</th>
                                    <th>Protein</th>
                                    <th>Carbs</th>
                                    <th>Fat</th>
                                    <th class="notes-column">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(log, index) in paginatedLogs" :key="log.id || index" class="data-row">
                                    <td class="sticky-column user-cell">
                                        <div class="user-info">
                                            <a href="#" class="user-link" @click.prevent="viewUserProfile(log)">
                                                <span class="user-name">{{ log.member }}</span>
                                            </a>
                                        </div>
                                    </td>
                                    <td class="date-cell">
                                        <a href="#" class="user-link" @click.prevent="viewUserProfileWithDate(log)">
                                            <span class="user-name">{{ log.date }}</span>
                                        </a>
                                    </td>
                                    <td class="data-cell">
                                        {{ formatCellValue(log.weight, 'weight') }}
                                    </td>
                                    <td class="data-cell">
                                        {{ formatCellValue(log.bodyFat, 'bodyFat') }}
                                    </td>
                                    <td class="data-cell">
                                        {{ formatCellValue(log.waterIntake, 'waterIntake') }}
                                    </td>
                                    <td class="data-cell">
                                        {{ formatCellValue(log.hunger, 'hunger') }}
                                    </td>
                                    <td class="data-cell">
                                        {{ formatCellValue(log.strength, 'strength') }}
                                    </td>
                                    <td class="data-cell">
                                        {{ formatCellValue(log.energy, 'energy') }}
                                    </td>
                                    <td class="text-cell" style="min-width: 180px; max-width: 180px;">
                                        {{ log.mealDeviations && log.mealDeviations !== 'N/A' && log.mealDeviations !== null && log.mealDeviations !== '' ? log.mealDeviations : 'N/A' }}
                                    </td>
                                    <td class="text-cell" style="min-width: 200px; max-width: 200px;">
                                        {{ log.activities && log.activities !== 'N/A' && log.activities !== null && log.activities !== '' ? log.activities : 'N/A' }}
                                    </td>
                                    <td class="text-cell" style="min-width: 200px; max-width: 200px;">
                                        {{ log.feel && log.feel !== 'N/A' && log.feel !== null && log.feel !== '' ? log.feel : 'N/A' }}
                                    </td>
                                    <td class="text-cell" style="min-width: 200px; max-width: 200px;">
                                        {{ log.cardio && log.cardio !== 'N/A' && log.cardio !== null && log.cardio !== '' ? log.cardio : 'N/A' }}
                                    </td>
                                    <td class="data-cell plan-column">
                                        {{ log.plan && log.plan !== 'N/A' && log.plan !== null && log.plan !== '' ? log.plan : 'N/A' }}
                                    </td>
                                    <td class="data-cell">
                                        {{ formatCellValue(log.calories, 'calories') }}
                                    </td>
                                    <td class="data-cell">
                                        {{ formatCellValue(log.protein, 'protein') }}
                                    </td>
                                    <td class="data-cell">
                                        {{ formatCellValue(log.carbs, 'carbs') }}
                                    </td>
                                    <td class="data-cell">
                                        {{ formatCellValue(log.fat, 'fat') }}
                                    </td>
                                    <td class="text-cell notes-column">
                                        {{ log.notes && log.notes !== 'N/A' && log.notes !== null && log.notes !== '' ? log.notes : 'N/A' }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

        <!-- Recent Messages Table -->
        <!-- <div v-show="activeTab === 0" class="recent-messages-container"> -->
            <!-- <div class="recent-messages-header">
                <h3 class="recent-messages-title">Recent Messages</h3>
                <a href="#" class="all-messages-link">All Messages</a>
            </div> -->
            
            <!-- <div class="recent-messages-table-container">
                <div class="recent-messages-table-wrapper">
                    <table class="recent-messages-table">
                        <thead>
                            <tr>
                                <th>Member</th>
                                <th>Last Message</th>
                                <th>Date</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(message, index) in recentMessages" :key="index" class="data-row">
                                <td class="user-cell">
                                    {{ message.user }}
                                </td>
                                <td class="message-cell">{{ message.lastMessage }}</td>
                                <td class="date-cell">{{ message.date }}</td>
                                <td class="action-cell">
                                    <a href="#" class="view-link">View</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div> -->
        <!-- </div> -->

        <!-- Meal Plans Tab -->
        <div class="container-fluid px-3 px-md-4 px-lg-5 py-3 py-md-4">
            <div v-show="activeTab === 1" class="tab-content">

            <!-- My Plans Sub-tab -->
            <div v-show="activeMealPlanSubTab === 0" class="sub-tab-content">
                <!-- Template Filter Section -->
                <div class="filter-section">
                    <div style="display: flex; gap: 1rem; align-items: center">
                        <div
                            class="search-box"
                            style="flex: 2; min-width: 400px"
                        >
                            <i class="fas fa-search"></i>
                            <input
                                type="text"
                                v-model="templateSearchQuery"
                                placeholder="Search templates by name or description..."
                                class="search-input"
                            />
                        </div>
                        <div
                            class="filter-options"
                            style="
                                display: flex;
                                gap: 1rem;
                                align-items: center;
                            "
                        >
                            <select
                                v-model="selectedTemplateCategory"
                                class="filter-select"
                            >
                                <option value="">All Categories</option>
                                <option
                                    v-for="category in nutritionCategories"
                                    :key="category.id"
                                    :value="category.name"
                                >
                                    {{ category.name }}
                                </option>
                            </select>
                            <select
                                v-model="selectedCalorieRange"
                                class="filter-select"
                            >
                                <option value="">All Calories</option>
                                <option value="1500-1800">
                                    1500-1800 kcal
                                </option>
                                <option value="1800-2200">
                                    1800-2200 kcal
                                </option>
                                <option value="2200-2500">
                                    2200-2500 kcal
                                </option>
                                <option value="2500-3000">
                                    2500-3000 kcal
                                </option>
                                <option value="3000-">3000+ kcal</option>
                            </select>

                            <button
                                @click="clearTemplateFilters"
                                class="clear-filters-btn"
                            >
                                <i class="fas fa-times"></i> Clear Filters
                            </button>
                        </div>
                    </div>
                    <div class="filter-stats">
                        <span class="filter-count"
                            >Showing {{ filteredMealPlanTemplates.length }} of
                            {{ mealPlanTemplates.length }} templates</span
                        >
                    </div>
                </div>

                <!-- Create New Template Button -->
                <div class="create-template-section">
                    <button 
                        @click="openCreateModal" 
                        class="create-template-btn"
                        type="button"
                    >
                        <i class="fas fa-plus"></i>
                        Create New
                    </button>
                </div>

                <div class="template-list" @click="closeDropdown">
                    <div
                        v-for="template in filteredMealPlanTemplates"
                        :key="template.id"
                        class="template-card"
                        @click.stop
                        :data-template-id="template.id"
                    >
                        <!-- Content Container -->
                        <div class="template-content-wrapper">
                        <!-- Top Border Highlight -->
                        <div class="template-top-highlight">
                            <div class="highlight-content">
                                <h4 class="template-name">
                                    <a href="#" class="template-link" @click.prevent="viewTemplateDetails(template.id)">
                                        {{ template.name }}
                                    </a>
                                </h4>
                                <div class="highlight-meta">
                                    <span class="member-count">{{ template.members }} members</span>
                                <span
                                    class="status-badge"
                                    :class="
                                        template.isActive
                                            ? 'active'
                                            : 'inactive'
                                    "
                                >
                                    {{
                                        template.isActive
                                            ? "Active"
                                            : "Inactive"
                                    }}
                                </span>
                            </div>
                                <div class="template-actions">
                                <div class="dropdown-container">
                                    <button
                                        class="dropdown-trigger"
                                        @click.stop="toggleDropdown(template.id)"
                                        type="button"
                                    >
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                    <div
                                        v-show="openDropdownId === template.id"
                                        class="dropdown-menu"
                                        @click.stop
                                        :data-template-id="template.id"
                                        :data-open-dropdown-id="openDropdownId"
                                    >
                                        <button
                                            class="dropdown-item"
                                            @click="assignTemplate(template.id); closeDropdown()"
                                            type="button"
                                        >
                                            <i class="fas fa-user-plus"></i>
                                            Assign
                                        </button>
                                        <button
                                            class="dropdown-item"
                                            @click="editTemplate(template.id); closeDropdown()"
                                            type="button"
                                        >
                                            <i class="fas fa-edit"></i>
                                            Edit
                                        </button>
                                        <button
                                            class="dropdown-item"
                                            @click="deleteTemplate(template.id); closeDropdown()"
                                            type="button"
                                        >
                                            <i class="fas fa-trash"></i>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        
                        <!-- Main Content Area: Left (Info/Macros) and Right (Image) -->
                        <div class="template-main-content">
                            <!-- Left Side: Info and Macros -->
                            <div class="template-left-content">
                                <div class="template-info">
                                    <div class="info-item">
                                        <span class="info-label">Created By:</span>
                                        <span class="info-value">{{ template.createdBy || 'Charles Thornton' }}</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Last Modified:</span>
                                        <span class="info-value">{{ template.lastModified || template.dateCreated || getCurrentDateFormatted() }}</span>
                                    </div>
                                </div>
                                <div class="template-description">
                                    <p 
                                        :class="{ 'description-expanded': expandedDescriptions[template.id] }"
                                        class="description-text"
                                    >
                                        {{ template.description || 'No description available' }}
                                    </p>
                                    <button 
                                        v-if="shouldShowMoreButton(template.description, template.id)"
                                        @click="toggleDescription(template.id)"
                                        class="show-more-btn"
                                        type="button"
                                    >
                                        {{ expandedDescriptions[template.id] ? 'Show less' : 'Show more' }}
                                    </button>
                                </div>
                                <div class="macro-info">
                                <div class="macro-heading-row">
                                    <h5 class="macro-heading">Macros</h5>
                                </div>
                                <div class="macro-items-row">
                                    <div class="macro-row">
                                <div class="macro-item">
                                    <span class="macro-label">Protein (grams)</span>
                                    <span class="macro-value">{{
                                        template.target_protein || (template.targets && template.targets.protein) || 125
                                    }}</span>
                                </div>
                                <div class="macro-item">
                                    <span class="macro-label">Carbs (grams)</span>
                                    <span class="macro-value">{{
                                        template.target_carbs || (template.targets && template.targets.carbs) || 225
                                    }}</span>
                                </div>
                                    </div>
                                    <div class="macro-row">
                                <div class="macro-item">
                                    <span class="macro-label">Fat (grams)</span>
                                    <span class="macro-value">{{
                                        template.target_fat || (template.targets && template.targets.fat) || 67
                                    }}</span>
                                </div>
                                <div class="macro-item">
                                    <span class="macro-label">Total Calories</span>
                                    <span class="macro-value">{{
                                        calculateTemplateCalories(template)
                                    }}</span>
                                </div>
                            </div>
                                </div>
                            </div>
                            </div>
                            
                            <!-- Right Side: Image -->
                            <div class="template-right-image">
                                <img 
                                    :src="getImageUrl(template.meal_image || defaultNutritionImages[0])" 
                                    :alt="template.name"
                                    class="template-image-display"
                                />
                            </div>
                        </div>
                        <!-- End Main Content Area -->
                        </div>
                        <!-- End Content Wrapper -->
                    </div>
                </div>
            </div>

            <!-- My Active Plans Sub-tab -->
            <div v-show="activeMealPlanSubTab === 1" class="sub-tab-content">
                <div class="sub-tab-header">
                    <h4>My Active Plans</h4>
                    <p>Currently active meal plans assigned to members</p>
                </div>

                <div class="active-plans-list">
                    <div
                        v-for="plan in activePlans"
                        :key="plan.id"
                        class="active-plan-card"
                    >
                        <div class="active-plan-header">
                            <h4>{{ plan.templateName }}</h4>
                            <span class="active-members"
                                >{{ plan.activeMembers }} active members</span
                            >
                        </div>
                        <div class="active-plan-details">
                            <p>
                                <strong>Duration:</strong> {{ plan.duration }}
                            </p>
                            <p>
                                <strong>Start Date:</strong>
                                {{ plan.startDate }}
                            </p>
                            <p><strong>End Date:</strong> {{ plan.endDate }}</p>
                            <p>
                                <strong>Success Rate:</strong>
                                {{ plan.successRate }}%
                            </p>
                        </div>
                        <div class="active-plan-actions">
                            <button class="primary-btn">View Details</button>
                            <button class="secondary-btn">
                                Manage Members
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Club Plans Sub-tab -->
            <div v-show="activeMealPlanSubTab === 2" class="sub-tab-content">
                <div class="sub-tab-header">
                    <h4>Club Plans</h4>
                    <p>Shared meal plans available to all club members</p>
                </div>

                <div class="club-plans-list">
                    <div
                        v-for="plan in clubPlans"
                        :key="plan.id"
                        class="club-plan-card"
                    >
                        <div class="club-plan-image">
                            <img
                                :src="plan.image"
                                :alt="plan.name"
                                class="plan-image"
                            />
                            <div class="image-overlay">
                                <span class="plan-type">{{ plan.type }}</span>
                            </div>
                        </div>
                        <div class="club-plan-content">
                            <div class="club-plan-header">
                                <h4>{{ plan.name }}</h4>
                            </div>
                            <p>{{ plan.description }}</p>
                            <div class="club-plan-stats">
                                <span class="usage-count"
                                    >{{ plan.usageCount }} members using</span
                                >
                                <span class="rating">⭐ {{ plan.rating }}</span>
                            </div>
                            <div class="club-plan-actions">
                                <div class="action-icons">
                                    <button
                                        class="action-icon-btn edit-btn"
                                        @click="editClubPlan(plan.id)"
                                        title="Edit Meal Plan"
                                    >
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    
                                    <button
                                        class="action-icon-btn schedule-btn"
                                        @click="scheduleClubPlan(plan.id)"
                                        title="Schedule Meal Plan"
                                    >
                                        <i class="fas fa-calendar-alt"></i>
                                    </button>
                                    <button
                                        class="action-icon-btn delete-btn"
                                        @click="deleteClubPlan(plan.id)"
                                        title="Delete Meal Plan"
                                    >
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                                <a
                                    href="#"
                                    class="more-info-link"
                                    @click.prevent="showMoreInfo(plan.id)"
                                >
                                    More Information
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

        <!-- Meals Tab -->
        <div class="container-fluid px-3 px-md-4 px-lg-5 py-3 py-md-4">
            <div v-show="activeTab === 2" class="tab-content">
            <div class="tab-header">
                <div class="tab-header-content">
                    <h3>Meals Library</h3>
                    <p class="tab-subtitle">
                        Browse and manage all available food items
                    </p>
                </div>
                <button class="new-meal-btn" @click="openNewMealModal">
                    <i class="fas fa-plus"></i> New Meal
                </button>
            </div>

            <!-- Filters Section -->
            <div class="meals-filters-section">
                <div class="filters-row">
                    <!-- Search Bar -->
                    <div class="search-box meals-search">
                        <i class="fas fa-search"></i>
                        <input
                            type="text"
                            v-model="mealsSearchQuery"
                            placeholder="Search meals by name or description..."
                            class="search-input"
                            @input="filterMeals"
                        />
                    </div>

                    <div class="filter-options-group">
                        <!-- Food Type Filter -->
                        <div class="filter-group">
                            <select
                                v-model="selectedFoodType"
                                class="filter-select"
                                @change="filterMeals"
                            >
                                <option value="">All Food Types</option>
                                <option
                                    v-for="foodType in filteredAvailableFoodTypes"
                                    :key="foodType"
                                    :value="foodType"
                                >
                                    {{ foodType }}
                                </option>
                            </select>
                        </div>

                        <!-- Clear Filters -->
                        <button
                            @click="clearMealsFilters"
                            class="clear-filters-btn"
                        >
                            <i class="fas fa-times"></i> Clear Filters
                        </button>
                    </div>
                </div>

                <!-- Filter Stats -->
                <div class="filter-stats">
                    <span class="filter-count">
                        Showing {{ filteredMeals.length }} of
                        {{ mealsTotal || allMeals.length }} meals
                    </span>
                    <span v-if="loadingMeals || mealsLoadingMore" class="loading-indicator">
                        <i class="fas fa-spinner fa-spin"></i> Loading...
                    </span>
                </div>
            </div>

            <!-- Meals Table -->
            <div class="meals-table-container">
                <div v-if="loadingMeals" class="loading-state">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Loading meals...</p>
                </div>

                <div v-else-if="mealsError" class="error-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>{{ mealsError }}</p>
                    <button @click="fetchMeals" class="retry-btn">Retry</button>
                </div>

                <div v-else-if="filteredMeals.length === 0" class="empty-state">
                    <i class="fas fa-search"></i>
                    <p>No meals found matching your criteria</p>
                </div>

                <div v-else class="table-responsive">
                    <table class="meals-table">
                        <thead>
                            <tr>
                                <th class="sortable" @click="sortMeals('name')">
                                    Name
                                    <i
                                        class="fas fa-sort"
                                        :class="getSortIcon('name')"
                                    ></i>
                                </th>

                                <th>Serving</th>
                                <th
                                    class="sortable"
                                    @click="sortMeals('food_type')"
                                >
                                    Food Type
                                    <i
                                        class="fas fa-sort"
                                        :class="getSortIcon('food_type')"
                                    ></i>
                                </th>
                                <th
                                    class="sortable"
                                    @click="sortMeals('calories')"
                                >
                                    Calories
                                    <i
                                        class="fas fa-sort"
                                        :class="getSortIcon('calories')"
                                    ></i>
                                </th>
                                <th
                                    class="sortable"
                                    @click="sortMeals('protein')"
                                >
                                    Protein (g)
                                    <i
                                        class="fas fa-sort"
                                        :class="getSortIcon('protein')"
                                    ></i>
                                </th>
                                <th
                                    class="sortable"
                                    @click="sortMeals('carbohydrate')"
                                >
                                    Carbs (g)
                                    <i
                                        class="fas fa-sort"
                                        :class="getSortIcon('carbohydrate')"
                                    ></i>
                                </th>
                                <th class="sortable" @click="sortMeals('fat')">
                                    Fat (g)
                                    <i
                                        class="fas fa-sort"
                                        :class="getSortIcon('fat')"
                                    ></i>
                                </th>
                                <th>Fiber (g)</th>
                                <th>Sugar (g)</th>
                                <th>Sodium (mg)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="meal in paginatedMeals"
                                :key="meal.id"
                                class="meal-row"
                            >
                                <td class="meal-name">
                                    <div class="meal-name-cell d-flex align-items-center">
                                        <!-- Thumbnail (uses fatsecret_url from backend if present) -->
                                        <div
                                            v-if="meal.fatsecret_url"
                                            class="meal-thumb-wrapper mr-2"
                                        >
                                            <img
                                                :src="meal.fatsecret_url"
                                                :alt="normalizeMealName(meal.name)"
                                                class="meal-thumb-img"
                                            />
                                        </div>

                                        <!-- Placeholder when no image -->
                                        <div
                                            v-else
                                            class="meal-thumb-placeholder mr-2 d-flex align-items-center justify-content-center"
                                        >
                                            <i class="fas fa-utensils"></i>
                                        </div>

                                        <!-- Name + optional serving description + description -->
                                        <div class="meal-name-text">
                                            <strong>{{ normalizeMealName(meal.name) }}</strong>
                                            <div v-if="meal.description" class="meal-description-muted">
                                                {{ meal.description }}
                                            </div>
                                            <div v-if="meal.serving_description" class="meal-serving-muted">
                                                {{ meal.serving_description }}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td class="serving-description">
                                    {{ meal.serving_description || "-" }}
                                </td>
                                <td class="food-type">
                                    <span
                                        class="food-type-badge"
                                        :class="
                                            getFoodTypeClass(meal.food_type)
                                        "
                                    >
                                        {{ meal.food_type }}
                                    </span>
                                </td>
                                <td class="calories">
                                    {{ formatNumber(meal.calories) }}
                                </td>
                                <td class="protein">
                                    {{ formatNumber(meal.protein) }}
                                </td>
                                <td class="carbs">
                                    {{ formatNumber(meal.carbohydrate) }}
                                </td>
                                <td class="fat">
                                    {{ formatNumber(meal.fat) }}
                                </td>
                                <td class="fiber">
                                    {{ formatNumber(meal.fiber) }}
                                </td>
                                <td class="sugar">
                                    {{ formatNumber(meal.sugar) }}
                                </td>
                                <td class="sodium">
                                    {{ formatNumber(meal.sodium) }}
                                </td>
                                <td class="actions">
                                    <button
                                        class="action-btn edit-btn"
                                        @click="editMeal(meal)"
                                        title="Edit Meal"
                                    >
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button
                                        class="action-btn delete-btn"
                                        @click="deleteMealFromDatabase(meal)"
                                        title="Delete Meal"
                                    >
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination Controls for Server-Side Pagination -->
                <div class="pagination-controls mt-3">
                    <!-- Load More Button -->
                    <div v-if="mealsCurrentPage < mealsLastPage" class="load-more-container text-center">
                        <button 
                            @click="loadMoreMeals" 
                            :disabled="mealsLoadingMore"
                            class="btn btn-primary btn-sm load-more-btn"
                        >
                            <i v-if="mealsLoadingMore" class="fas fa-spinner fa-spin"></i>
                            <span v-else>Load More Meals</span>
                            <span v-if="mealsLoadingMore">Loading...</span>
                        </button>
                    </div>
                    
                    <!-- Pagination Info and Jump to Page -->
                    <div class="pagination-info-container d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <p class="text-muted mb-0 small">
                            Showing {{ filteredMeals.length }} of {{ mealsTotal }} meals
                            <span v-if="mealsLastPage > 1">(Page {{ mealsCurrentPage }} of {{ mealsLastPage }})</span>
                        </p>
                        
                        <!-- Jump to Page Control (shown when there are multiple pages) -->
                        <div v-if="mealsLastPage > 1" class="jump-to-page-container d-flex align-items-center gap-2">
                            <label for="jump-to-page-input" class="mb-0 small text-muted">Jump to page:</label>
                            <input
                                id="jump-to-page-input"
                                type="number"
                                v-model.number="jumpToPageInput"
                                :min="1"
                                :max="mealsLastPage"
                                class="form-control form-control-sm"
                                style="width: 80px;"
                                @keyup.enter="jumpToPage"
                                placeholder="Page"
                            />
                            <button
                                @click="jumpToPage"
                                :disabled="!jumpToPageInput || jumpToPageInput < 1 || jumpToPageInput > mealsLastPage || mealsLoadingMore"
                                class="btn btn-outline-primary btn-sm"
                            >
                                <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

        <!-- Create New Meal Plan Modal - Right Side Popup -->
        <div
            v-if="showCreateTemplateModal && !isEditing"
            class="right-side-modal-overlay"
            :class="{ 'sidebar-open': isSidebarOpen }"
            @click="closeCreateModal"
            @keydown.esc="closeCreateModal"
        >
            <div class="right-side-modal-content" :class="{ 'sidebar-open': isSidebarOpen }" @click.stop>
                <!-- Header -->
                <div class="modal-header modern-header">
                    <div class="header-content">
                        <h3 class="modal-title">
                            {{
                                isEditing
                                    ? "Edit Meal Plan"
                                    : "Create New Meal Plan"
                            }}
                        </h3>
                        <p class="modal-subtitle">
                            {{
                                isEditing
                                    ? "Update your nutrition template with all advanced features"
                                    : "Basic information and target macros to create your meal plan"
                            }}
                        </p>
                    </div>
                    <button
                        class="modal-close modern-close"
                        @click="closeCreateModal"
                        :disabled="isSubmitting"
                    >
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Main Content -->
                <div class="modal-body modern-body" :class="{ 'submitting': isSubmitting }">
                    <form @submit.prevent="handleFormSubmit" class="modern-form">
                        <!-- Step 1: Basic Information -->
                        <div v-if="!isEditing" class="step-content">
                            <!-- Basic Information Section -->
                            <div class="form-row">
                            <div class="form-group">
                                <label for="templateName">Meal Plan Name</label>
                                        <input
                                            id="templateName"
                                            v-model="newTemplate.name"
                                            type="text"
                                            placeholder="e.g., Weight Loss (1800 kcal)"
                                            required
                                            :disabled="isSubmitting"
                                    class="modern-input"
                                        />
                                    </div>
                            <div class="form-group">
                                    <label for="templateDescriptionCreate">Description</label>
                                    <textarea
                                        id="templateDescriptionCreate"
                                        ref="descriptionTextarea"
                                        v-model="newTemplate.description"
                                        placeholder="Describe the meal plan template..."
                                        required
                                        :disabled="isSubmitting"
                                        class="modern-textarea auto-resize-textarea"
                                        rows="2"
                                        @input="autoResizeDescriptionTextarea"
                                    ></textarea>
                                </div>
                                </div>

                            <!-- Meal Image Selection Section -->
                            <div class="form-row mt-3">
                                <div class="form-group">
                                    <label>Meal Plan Image</label>
                                    <small class="text-muted d-block mb-2">Use arrows to navigate and select a default image</small>
                                    <div class="image-selector-container">
                                        <button 
                                            type="button"
                                            class="image-nav-btn image-nav-btn-left"
                                            @click="navigateImage(-1)"
                                            :disabled="isSubmitting"
                                        >
                                            <i class="fas fa-chevron-left"></i>
                                        </button>
                                        <div class="single-image-display">
                                            <img 
                                                :src="'/' + defaultNutritionImages[selectedImageIndex]" 
                                                :alt="`Nutrition image ${selectedImageIndex + 1}`"
                                                class="selected-image-preview"
                                            />
                                            <div class="image-counter">
                                                {{ selectedImageIndex + 1 }} / {{ defaultNutritionImages.length }}
                                            </div>
                                        </div>
                                        <button 
                                            type="button"
                                            class="image-nav-btn image-nav-btn-right"
                                            @click="navigateImage(1)"
                                            :disabled="isSubmitting"
                                        >
                                            <i class="fas fa-chevron-right"></i>
                                        </button>
                                    </div>
                                    <small class="text-muted d-block mt-2">
                                        Selected: {{ defaultNutritionImages[selectedImageIndex].split('/').pop() }}
                                    </small>
                                </div>
                            </div>

                            <!-- Target Macros Section -->
                            <div class="target-macros-section">
                                <div class="d-flex justify-content-between align-items-center mb-3 mt-3">
                                    <div>
                                        <h4 class="section-title m-0">Target Macros</h4>
                                        <small class="text-muted d-block mt-1">
                                            <i class="fas fa-info-circle"></i>
                                            Switch between grams and percentage. Values are automatically converted.
                                        </small>
                                    </div>
                                    <div class="btn-group btn-group-sm" role="group">
                                        <button 
                                            type="button" 
                                            class="btn" 
                                            :class="macroInputMode === 'grams' ? 'btn-danger' : 'btn-outline-danger'" 
                                            @click="macroInputMode = 'grams'"
                                        >
                                            <i class="fas fa-weight"></i> Grams
                                        </button>
                                        <button 
                                            type="button" 
                                            class="btn" 
                                            :class="macroInputMode === 'percentage' ? 'btn-danger' : 'btn-outline-danger'" 
                                            @click="macroInputMode = 'percentage'"
                                        >
                                            <i class="fas fa-percentage"></i> Percentage
                                        </button>
                                    </div>
                                </div>

                                <div class="macros-grid target-macros-grid">
                                    <!-- Protein -->
                                    <div class="form-group">
                                        <label for="targetProtein" class="d-flex justify-content-between align-items-center">
                                            <span>
                                                <strong>Protein</strong>
                                                <small class="text-muted d-block mt-1">4 calories per gram</small>
                                            </span>
                                            <span class="badge" v-if="macroInputMode === 'grams' && getMacroPercentage('protein')">
                                                {{ getMacroPercentage('protein') }}%
                                            </span>
                                        </label>
                                        
                                        <div class="input-with-symbol">
                                            <input
                                                v-if="macroInputMode === 'grams'"
                                                id="targetProtein"
                                                v-model.number="newTemplate.targets.protein"
                                                type="number"
                                                min="0"
                                                step="0.1"
                                                placeholder="e.g., 125"
                                                required
                                                :disabled="isSubmitting"
                                                class="form-control modern-input"
                                                @input="updateTargetCalories"
                                            />
                                            <input
                                                v-else
                                                id="targetProteinPct"
                                                :value="getDisplayPercentage('protein')"
                                                @input="updateMacroFromPercentage('protein', $event.target.value)"
                                                type="number"
                                                min="0"
                                                max="100"
                                                step="1"
                                                placeholder="e.g., 30"
                                                :disabled="isSubmitting"
                                                class="form-control modern-input"
                                            />
                                            <span class="input-symbol">
                                                <strong v-if="macroInputMode === 'grams'">g</strong>
                                                <strong v-else>%</strong>
                                            </span>
                                        </div>
                                        <small class="text-muted d-block mt-1" v-if="macroInputMode === 'percentage' && newTemplate.targets.protein">
                                            = {{ newTemplate.targets.protein }}g ({{ (newTemplate.targets.protein * 4).toFixed(0) }} cal)
                                        </small>
                                    </div>
                                    
                                    <!-- Carbs -->
                                    <div class="form-group">
                                        <label for="targetCarbs" class="d-flex justify-content-between align-items-center">
                                            <span>
                                                <strong>Carbs</strong>
                                                <small class="text-muted d-block mt-1">4 calories per gram</small>
                                            </span>
                                            <span class="badge" v-if="macroInputMode === 'grams' && getMacroPercentage('carbs')">
                                                {{ getMacroPercentage('carbs') }}%
                                            </span>
                                        </label>
                                        
                                        <div class="input-with-symbol">
                                            <input
                                                v-if="macroInputMode === 'grams'"
                                                id="targetCarbs"
                                                v-model.number="newTemplate.targets.carbs"
                                                type="number"
                                                min="0"
                                                step="0.1"
                                                placeholder="e.g., 225"
                                                required
                                                :disabled="isSubmitting"
                                                class="form-control modern-input"
                                                @input="updateTargetCalories"
                                            />
                                            <input
                                                v-else
                                                id="targetCarbsPct"
                                                :value="getDisplayPercentage('carbs')"
                                                @input="updateMacroFromPercentage('carbs', $event.target.value)"
                                                type="number"
                                                min="0"
                                                max="100"
                                                step="1"
                                                placeholder="e.g., 50"
                                                :disabled="isSubmitting"
                                                class="form-control modern-input"
                                            />
                                            <span class="input-symbol">
                                                <strong v-if="macroInputMode === 'grams'">g</strong>
                                                <strong v-else>%</strong>
                                            </span>
                                        </div>
                                        <small class="text-muted d-block mt-1" v-if="macroInputMode === 'percentage' && newTemplate.targets.carbs">
                                            = {{ newTemplate.targets.carbs }}g ({{ (newTemplate.targets.carbs * 4).toFixed(0) }} cal)
                                        </small>
                                    </div>
                                    
                                    <!-- Fat -->
                                    <div class="form-group">
                                        <label for="targetFat" class="d-flex justify-content-between align-items-center">
                                            <span>
                                                <strong>Fat</strong>
                                                <small class="text-muted d-block mt-1">9 calories per gram</small>
                                            </span>
                                            <span class="badge" v-if="macroInputMode === 'grams' && getMacroPercentage('fat')">
                                                {{ getMacroPercentage('fat') }}%
                                            </span>
                                        </label>
                                        
                                        <div class="input-with-symbol">
                                            <input
                                                v-if="macroInputMode === 'grams'"
                                                id="targetFat"
                                                v-model.number="newTemplate.targets.fat"
                                                type="number"
                                                min="0"
                                                step="0.1"
                                                placeholder="e.g., 67"
                                                required
                                                :disabled="isSubmitting"
                                                class="form-control modern-input"
                                                @input="updateTargetCalories"
                                            />
                                            <input
                                                v-else
                                                id="targetFatPct"
                                                :value="getDisplayPercentage('fat')"
                                                @input="updateMacroFromPercentage('fat', $event.target.value)"
                                                type="number"
                                                min="0"
                                                max="100"
                                                step="1"
                                                placeholder="e.g., 20"
                                                :disabled="isSubmitting"
                                                class="form-control modern-input"
                                            />
                                            <span class="input-symbol">
                                                <strong v-if="macroInputMode === 'grams'">g</strong>
                                                <strong v-else>%</strong>
                                            </span>
                                        </div>
                                        <small class="text-muted d-block mt-1" v-if="macroInputMode === 'percentage' && newTemplate.targets.fat">
                                            = {{ newTemplate.targets.fat }}g ({{ (newTemplate.targets.fat * 9).toFixed(0) }} cal)
                                        </small>
                                    </div>
                                    
                                    <!-- Total Calories -->
                                    <div class="form-group calories-display">
                                        <label class="d-flex justify-content-between align-items-center">
                                            <span>
                                                <strong>Total Calories</strong>
                                                <small class="text-muted d-block mt-1">Calculated from macros</small>
                                            </span>
                                        </label>
                                        <div class="input-group">
                                            <div v-if="macroInputMode === 'grams'" class="form-control calories-value-display">
                                                <strong>{{ calculateTotalCalories() }}</strong> <span class="text-muted">kcal</span>
                                            </div>
                                            <input
                                                v-else
                                                :value="calculateTotalCalories()"
                                                @change="updateTotalCalories($event.target.value)"
                                                type="number"
                                                min="0"
                                                step="10"
                                                :disabled="isSubmitting"
                                                class="form-control modern-input"
                                            />
                                            <div class="input-group-append" v-if="macroInputMode === 'percentage'">
                                                <span class="input-group-text">kcal</span>
                                            </div>
                                        </div>
                                        <small class="text-muted d-block mt-1" v-if="macroInputMode === 'percentage'">
                                            Changing calories will adjust all macros proportionally
                                        </small>
                                    </div>
                                </div>
                                
                                <!-- Summary Card -->
                                <div class="alert alert-danger mt-3" role="alert">
                                    <div class="d-flex align-items-center">
                                        <i class="fas fa-lightbulb mr-2"></i>
                                        <div>
                                            <strong>Quick Summary:</strong>
                                            <ul class="mb-0 mt-2 pl-3">
                                                <li>Protein: {{ newTemplate.targets.protein }}g ({{ getMacroPercentage('protein') }}%)</li>
                                                <li>Carbs: {{ newTemplate.targets.carbs }}g ({{ getMacroPercentage('carbs') }}%)</li>
                                                <li>Fat: {{ newTemplate.targets.fat }}g ({{ getMacroPercentage('fat') }}%)</li>
                                                <li><strong>Total: {{ calculateTotalCalories() }} calories</strong></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="templateCategory">Category</label>
                                    <select
                                        id="templateCategory"
                                        v-model="newTemplate.category_id"
                                        @change="onCategoryChange"
                                        class="modern-select"
                                    >
                                        <option value="">Select Category</option>
                                        <option
                                            v-for="category in getAvailableCategories()"
                                            :key="category.id"
                                            :value="category.id"
                                        >
                                            {{ category.name }}
                                        </option>
                                    </select>
                                </div>
                            </div> -->
                        </div>

                        <!-- Advanced Configuration (only in edit mode) -->
                        <div v-if="isEditing" class="step-content">
                            <!-- Admin Info Header -->
                            <div class="admin-info-header">
                                <div class="admin-info-item">
                                    <span class="info-label">Created By:</span>
                                    <span class="info-value">{{ editingTemplateCreator || currentUserName }}</span>
                                </div>
                                <div class="admin-info-item">
                                    <span class="info-label">Date Created:</span>
                                    <span class="info-value">{{ editingTemplateDateCreated || getCurrentDateFormatted() }}</span>
                                </div>
                                <div class="admin-info-item">
                                    <span class="info-label">Last Modified:</span>
                                    <span class="info-value">{{ editingTemplateLastModified || getCurrentDateFormatted() }}</span>
                                </div>
                            </div>

                            <!-- Top Sections: Meal Plan Targets and Nutrition Levels Stacked -->
                            <div class="top-sections-container-vertical">
                                <!-- Meal Plan Targets Section -->
                                <div class="meal-plan-targets-section">
                                    <div class="targets-header">
                                        <h4 class="targets-title">Meal Plan Targets</h4>
                                        <button type="button" class="edit-targets-btn" @click="editTargets">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                    </div>

                                    <div class="targets-actual-combined">
                                        <div class="targets-row">
                                            <span class="targets-label">TARGETS:</span>
                                            <div class="targets-content-container">
                                                <div class="targets-macros">
                                                    <span class="target-macro protein-target-text">{{ newTemplate.targets.protein || 0 }}g PROTEIN</span>
                                                    <span class="target-macro carbs-target-text">{{ newTemplate.targets.carbs || 0 }}g CARBS</span>
                                                    <span class="target-macro fat-target-text">{{ newTemplate.targets.fat || 0 }}g FAT</span>
                                                </div>
                                                <span class="target-total-calories">TOTAL CALORIES: {{ calculateTotalCalories() }}</span>
                                            </div>
                                        </div>

                                        <div class="actual-row">
                                            <span class="actual-label">ACTUAL:</span>
                                            <div class="actual-bar-container">
                                                <div class="actual-bar">
                                                    <div class="actual-segment protein-segment" :style="{ width: getVisualBarWidth('protein') + '%' }">
                                                        <span class="segment-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.protein) || 0 }}g</span>
                                                    </div>
                                                    <div class="actual-segment carbs-segment" :style="{ width: getVisualBarWidth('carbs') + '%' }">
                                                        <span class="segment-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.carbs) || 0 }}g</span>
                                                    </div>
                                                    <div class="actual-segment fat-segment" :style="{ width: getVisualBarWidth('fat') + '%' }">
                                                        <span class="segment-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.fat) || 0 }}g</span>
                                                    </div>
                                                </div>
                                                <span class="total-calories">TOTAL CALORIES: {{ getCurrentTotalCalories() }}</span>
                                            </div>
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
                                            <span class="metric-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.calories) || 1900 }} / {{ (newTemplate.targets && newTemplate.targets.calories) || 2000 }}</span>
                                        </div>
                                        
                                        <div class="nutrition-metric protein">
                                            <span class="metric-label">Total Protein:</span>
                                            <span class="metric-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.protein) || 118.5 }}g / {{ (newTemplate.targets && newTemplate.targets.protein) || 125 }}g</span>
                                        </div>
                                        
                                        <div class="nutrition-metric carbs">
                                            <span class="metric-label">Total Carbs:</span>
                                            <span class="metric-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.carbs) || 213.75 }}g / {{ (newTemplate.targets && newTemplate.targets.carbs) || 225 }}g</span>
                                        </div>
                                        
                                        <div class="nutrition-metric fiber">
                                            <span class="metric-label">Total Fiber:</span>
                                            <span class="metric-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.fiber) || 35.2 }}g</span>
                                        </div>
                                        
                                        <div class="nutrition-metric net-carbs">
                                            <span class="metric-label">Total Net Carbs:</span>
                                            <span class="metric-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.netCarbs) || 178.55 }}g</span>
                                        </div>
                                        
                                        <div class="nutrition-metric fat">
                                            <span class="metric-label">Total Fat:</span>
                                            <span class="metric-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.fat) || 63.65 }}g / {{ (newTemplate.targets && newTemplate.targets.fat) || 67 }}g</span>
                                        </div>
                                        
                                        <div class="nutrition-metric sodium">
                                            <span class="metric-label">Total Sodium:</span>
                                            <span class="metric-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.sodium) || 1500 }}mg</span>
                                        </div>
                                        
                                        <div class="nutrition-metric potassium">
                                            <span class="metric-label">Total Potassium (K):</span>
                                            <span class="metric-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.potassium) || 3200 }}mg</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Meal Plan Instructions Section -->
                            <div class="meal-plan-instructions-section">
                                <div class="instructions-header">
                                    <h4 class="instructions-title">Add Meal Plan Instructions</h4>
                                    <button type="button" class="edit-instructions-btn" @click="toggleInstructionsEdit" title="Edit Instructions">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </div>
                                <div class="instructions-content">
                                    <div v-if="!isEditingInstructions" class="instructions-display">
                                        <p class="instructions-text">{{ newTemplate.instructions || 'No instructions added yet.' }}</p>
                                    </div>
                                    <div v-else class="instructions-edit">
                                        <textarea 
                                            v-model="newTemplate.instructions"
                                            class="instructions-input"
                                            placeholder="Enter meal plan instructions..."
                                            rows="3"
                                        ></textarea>
                                        <div class="instructions-actions">
                                            <button type="button" class="save-instructions-btn" @click="saveInstructions">
                                                <i class="fas fa-check"></i> Save
                                            </button>
                                            <button type="button" class="cancel-instructions-btn" @click="cancelInstructionsEdit">
                                                <i class="fas fa-times"></i> Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!-- Bottom Row: Meal Cards -->
                        <div class="meals-section">
                                <div class="meals-header">
                            <h4 class="section-title">Meals for This Plan</h4>
                                </div>
                            <div class="meal-cards-modern">
                                <div
                                    v-for="meal in mealCards"
                                    :key="meal.key"
                                    class="meal-card-modern"
                                    :class="{ 'alternate-meal-card': meal.isAlternate }"
                                >
                                    <div class="meal-card-header-modern">
                                        <span class="meal-icon"
                                            ><i :class="meal.icon"></i
                                        ></span>
                                        <span class="meal-title">{{
                                            meal.label
                                        }}</span>
                                        <span v-if="meal.isAlternate" class="alternate-badge-modern">ALT</span>
                                    </div>
                                    <div class="meal-card-body-modern">
                                        <div class="meal-products-modern">
                                            <div
                                                v-if="
                                                    !mealProducts[meal.key] ||
                                                    mealProducts[meal.key]
                                                        .length === 0
                                                "
                                                class="empty-meal"
                                            >
                                                No selected foods
                                            </div>
                                            <div v-else class="products-list">
                                                <div
                                                    v-for="(
                                                        product, idx
                                                    ) in (expandedMeals[meal.key] 
                                                        ? mealProducts[meal.key] 
                                                        : mealProducts[meal.key].slice(0, 2))"
                                                    :key="idx"
                                                    class="product-item"
                                                >
                                                    <div
                                                        class="product-name-quantity"
                                                    >
                                                        <div
                                                            class="product-info"
                                                        >
                                                            <span
                                                                class="product-name"
                                                                >{{
                                                                    product.name
                                                                }}</span
                                                            >
                                                            <div
                                                                class="product-calories"
                                                            >
                                                                Calories
                                                                {{
                                                                    Math.round(
                                                                        (product.calories ||
                                                                            0) *
                                                                            (product.quantity ||
                                                                                1)
                                                                    )
                                                                }}
                                                            </div>
                                                        </div>
                                                        <span
                                                            class="quantity-controls"
                                                        >
                                                            <button
                                                                type="button"
                                                                @click.stop="
                                                                    decreaseQuantity(
                                                                        meal.key,
                                                                        idx
                                                                    )
                                                                "
                                                                class="quantity-btn minus-btn"
                                                                title="Decrease quantity"
                                                                :disabled="isSubmitting"
                                                            >
                                                                <i
                                                                    class="fas fa-minus"
                                                                ></i>
                                                            </button>
                                                            <span
                                                                class="quantity"
                                                                >{{
                                                                    product.quantity ||
                                                                    1
                                                                }}</span
                                                            >
                                                            <button
                                                                type="button"
                                                                @click.stop="
                                                                    increaseQuantity(
                                                                        meal.key,
                                                                        idx
                                                                    )
                                                                "
                                                                class="quantity-btn plus-btn"
                                                                title="Increase quantity"
                                                                :disabled="isSubmitting"
                                                            >
                                                                <i
                                                                    class="fas fa-plus"
                                                                ></i>
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="
                                                        mealProducts[meal.key]
                                                            .length > 2
                                                    "
                                                    class="more-products"
                                                    @click="toggleMealExpansion(meal.key)"
                                                >
                                                    <span v-if="!expandedMeals[meal.key]">
                                                        +{{
                                                            mealProducts[meal.key]
                                                                .length - 2
                                                        }}
                                                        more
                                                    </span>
                                                    <span v-else>
                                                        <i class="fas fa-chevron-up"></i>
                                                        Show less
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            class="add-product-btn-modern"
                                            @click="
                                                openAddProductModal(meal.key)
                                            "
                                            :disabled="isSubmitting"
                                        >
                                            <i class="fas fa-plus"></i>
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="form-actions-modern">
                            <button
                                type="button"
                                @click="closeCreateModal"
                                class="btn-secondary-modern"
                                :disabled="isSubmitting"
                            >
                                Cancel
                            </button>
                            
                            <!-- Create Mode Actions -->
                            <template v-if="!isEditing">
                            <button type="submit" class="btn-primary-modern" :disabled="isSubmitting">
                                <i v-if="isSubmitting" class="fas fa-spinner fa-spin"></i>
                                <i v-else class="fas fa-save"></i>
                                <span v-if="isSubmitting">
                                    <i class="fas fa-spinner fa-spin"></i> Creating...
                                </span>
                                <span v-else>Create Meal Plan</span>
                            </button>
                            </template>
                            
                            <!-- Edit Mode Actions -->
                            <template v-else-if="isEditing">
                                <button type="submit" class="btn-primary-modern" :disabled="isSubmitting">
                                    <i v-if="isSubmitting" class="fas fa-spinner fa-spin"></i>
                                    <i v-else class="fas fa-save"></i>
                                    <span v-if="isSubmitting">
                                        <i class="fas fa-spinner fa-spin"></i> Updating...
                                    </span>
                                    <span v-else>Update Meal Plan</span>
                                </button>
                            </template>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Add Food or Drinks Modal -->
        <!-- Add Products Modal -->
        <b-modal
            v-model="showAddProductModal"
            title="Add Products"
            size="lg"
            centered
            hide-footer
            class="add-products-modal"
            @hide="closeAddProductModal"
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
                            {{ filteredProducts.length }} of {{ foodsTotal }} found
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
                        <div v-else-if="filteredProducts.length === 0 && !loadingFoods" class="no-products">
                            <i class="fas fa-search"></i>
                            <p v-if="newProductName.trim()">No selected foods found matching "{{ newProductName }}"</p>
                            <p v-else>Start typing to search for selected foods...</p>
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
                                        <span class="product-name">{{
                                            product.name
                                        }}</span>
                                        <span
                                            v-if="product.serving_description"
                                            class="product-serving"
                                            >{{ product.serving_description }}</span
                                        >
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
                                    Showing {{ filteredProducts.length }} of {{ foodsTotal }} foods
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Current Products -->
                    <!-- <div class="current-products-column"> -->
                        <!-- <div class="current-products-header">
                            <span class="current-count">
                                {{ mealProducts[currentMealKey] && mealProducts[currentMealKey].length > 0 ? mealProducts[currentMealKey].length : 0 }} added
                            </span>
                        </div> -->
                        <!-- <div class="current-products-list"> -->
                            <!-- <div
                                v-if="
                                    !mealProducts[currentMealKey] ||
                                    mealProducts[currentMealKey].length === 0
                                "
                                class="no-products"
                            >
                                <i class="fas fa-inbox"></i>
                                <p>No selected foods added yet</p>
                            </div> -->
                            <!-- <div v-else class="products-grid"> -->
                            <!-- <div
                                v-for="(product, index) in mealProducts[
                                    currentMealKey
                                ]"
                                :key="index"
                                class="product-item-display"
                            > -->
                                <!-- <div class="product-info">
                                    <div class="product-header">
                                        <span class="product-name">{{
                                            typeof product === "string"
                                                ? product
                                                : product.name
                                        }}</span>
                                        <span
                                            v-if="
                                                typeof product === 'object' &&
                                                product.serving_description
                                            "
                                            class="product-serving"
                                            >{{
                                                product.serving_description
                                            }}</span
                                        >
                                    </div>

                                    <div
                                        v-if="
                                            typeof product === 'object' &&
                                            product.description
                                        "
                                        class="product-description"
                                    >
                                        {{ product.description }}
                                    </div>

                                    <span
                                        v-if="
                                            typeof product === 'object' &&
                                            (product.food_type ||
                                                product.category)
                                        "
                                        class="product-category"
                                        >{{
                                            product.food_type ||
                                            product.category
                                        }}</span
                                    >
                                    <span
                                        v-if="
                                            typeof product === 'object' &&
                                            product.calories
                                        "
                                        class="product-calories"
                                    >
                                        {{
                                            Math.round(
                                                (product.calories || 0) *
                                                    (product.quantity || 1)
                                            )
                                        }}
                                        kcal
                                        <span
                                            v-if="product.quantity > 1"
                                            class="quantity-note"
                                            >({{ product.calories }} ×
                                            {{ product.quantity }})</span
                                        >
                                    </span>

                                    <div
                                        v-if="
                                            typeof product === 'object' &&
                                            (product.protein ||
                                                product.carbohydrate ||
                                                product.fat)
                                        "
                                        class="product-macros"
                                    >
                                        <span
                                            v-if="product.protein"
                                            class="macro-item protein"
                                        >
                                            {{
                                                Math.round(
                                                    (product.protein || 0) *
                                                        (product.quantity || 1)
                                                )
                                            }}g protein
                                        </span>
                                        <span
                                            v-if="product.carbohydrate"
                                            class="macro-item carbs"
                                        >
                                            {{
                                                Math.round(
                                                    (product.carbohydrate ||
                                                        0) *
                                                        (product.quantity || 1)
                                                )
                                            }}g carbs
                                        </span>
                                        <span
                                            v-if="product.fat"
                                            class="macro-item fats"
                                        >
                                            {{
                                                Math.round(
                                                    (product.fat || 0) *
                                                        (product.quantity || 1)
                                                )
                                            }}g fats
                                        </span>
                                    </div>

                                    <div
                                        v-if="
                                            typeof product === 'object' &&
                                            (product.fiber ||
                                                product.sugar ||
                                                product.sodium)
                                        "
                                        class="product-details"
                                    >
                                        <span
                                            v-if="product.fiber"
                                            class="detail-item"
                                            >Fiber: {{ product.fiber }}g</span
                                        >
                                        <span
                                            v-if="product.sugar"
                                            class="detail-item"
                                            >Sugar: {{ product.sugar }}g</span
                                        >
                                        <span
                                            v-if="product.sodium"
                                            class="detail-item"
                                            >Sodium:
                                            {{ product.sodium }}mg</span
                                        >
                                    </div>

                                    <div
                                        v-if="
                                            typeof product === 'object' &&
                                            (product.cholesterol ||
                                                product.saturated_fat)
                                        "
                                        class="product-cholesterol"
                                    >
                                        <span
                                            v-if="product.cholesterol"
                                            class="detail-item"
                                            >Cholesterol:
                                            {{ product.cholesterol }}mg</span
                                        >
                                        <span
                                            v-if="product.saturated_fat"
                                            class="detail-item"
                                            >Sat. Fat:
                                            {{ product.saturated_fat }}g</span
                                        >
                                    </div>

                                    <div
                                        v-if="
                                            typeof product === 'object' &&
                                            (product.vitamin_a ||
                                                product.vitamin_c ||
                                                product.calcium ||
                                                product.iron)
                                        "
                                        class="product-vitamins"
                                    >
                                        <span
                                            v-if="product.vitamin_a"
                                            class="vitamin-item"
                                            >Vit A:
                                            {{ product.vitamin_a }}%</span
                                        >
                                        <span
                                            v-if="product.vitamin_c"
                                            class="vitamin-item"
                                            >Vit C:
                                            {{ product.vitamin_c }}%</span
                                        >
                                        <span
                                            v-if="product.calcium"
                                            class="vitamin-item"
                                            >Calcium:
                                            {{ product.calcium }}%</span
                                        >
                                        <span
                                            v-if="product.iron"
                                            class="vitamin-item"
                                            >Iron: {{ product.iron }}%</span
                                        >
                                    </div>
                                </div> -->

                                <!-- Quantity Controls for detailed view -->
                                <!-- <div class="product-quantity-controls">
                                    <div class="quantity-controls-detailed">
                                        <button
                                            type="button"
                                            @click="
                                                decreaseQuantity(
                                                    currentMealKey,
                                                    index
                                                )
                                            "
                                            class="quantity-btn minus-btn"
                                            title="Decrease quantity"
                                        >
                                            <i class="fas fa-minus"></i>
                                        </button>
                                        <button
                                            type="button"
                                            @click="
                                                increaseQuantity(
                                                    currentMealKey,
                                                    index
                                                )
                                            "
                                            class="quantity-btn plus-btn"
                                            title="Increase quantity"
                                        >
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <button
                                        @click="
                                            removeProductFromMeal(
                                                currentMealKey,
                                                index
                                            )
                                        "
                                        class="remove-product-btn"
                                        title="Remove product"
                                    >
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div> -->
                            <!-- </div> -->
                        <!-- </div> -->
                    <!-- </div> -->
                    <!-- </div> -->
                </div>
            </div>

            <div class="form-actions-modern">
                <button
                    type="button"
                    @click="closeAddProductModal"
                    class="btn-secondary-modern"
                >
                    Done
                </button>
            </div>
        </b-modal>

        <!-- Schedule Meal Plan Modal -->
        <div
            v-if="showScheduleModal"
            class="modal-overlay"
            @click="closeScheduleModal"
            @keydown.esc="closeScheduleModal"
        >
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h3>Schedule Meal Plan</h3>
                    <button class="modal-close" @click="closeScheduleModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form
                        @submit.prevent="scheduleMealPlan"
                        class="template-form"
                    >
                        <div class="form-group">
                            <label for="scheduleStartDate">Start Date</label>
                            <input
                                id="scheduleStartDate"
                                v-model="scheduleForm.startDate"
                                type="date"
                                class="form-input form-control form-control-sm"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="scheduleCycleDuration"
                                >Cycle Duration (weeks)</label
                            >
                            <input
                                id="scheduleCycleDuration"
                                v-model="scheduleForm.cycleDuration"
                                type="number"
                                min="1"
                                max="52"
                                class="form-input form-control form-control-sm"
                                placeholder="e.g., 4"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="scheduleEndDate">End Date</label>
                            <input
                                id="scheduleEndDate"
                                v-model="scheduleForm.endDate"
                                type="date"
                                class="form-input form-control form-control-sm"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label>Select Days</label>
                            <div class="days-checkboxes">
                                <label
                                    v-for="day in [
                                        'Monday',
                                        'Tuesday',
                                        'Wednesday',
                                        'Thursday',
                                        'Friday',
                                        'Saturday',
                                        'Sunday',
                                    ]"
                                    :key="day"
                                    class="checkbox-label"
                                >
                                    <input
                                        type="checkbox"
                                        :value="day"
                                        v-model="scheduleForm.days"
                                        class="form-checkbox"
                                    />
                                    <span class="checkmark"></span>
                                    {{ day }}
                                </label>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button
                                type="button"
                                @click="closeScheduleModal"
                                class="secondary-btn"
                            >
                                Close
                            </button>
                            <button type="submit" class="primary-btn">
                                Schedule
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Assign Template Modal -->
        <div
            v-if="showAssignModal"
            class="modal-overlay"
            @click="closeAssignModal"
            @keydown.esc="closeAssignModal"
            style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                padding: 1rem;
            "
        >
            <div
                class="modal-content modern-modal"
                @click.stop
                style="
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    max-width: 600px;
                    width: 90%;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                    z-index: 10001;
                    animation: modalSlideIn 0.3s ease;
                "
            >
                <div
                    class="modal-header modern-header"
                    style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 1.5rem;
                        border-bottom: 1px solid #e0e0e0;
                        background: white;
                    "
                >
                    <div class="header-content">
                        <h3
                            class="modal-title"
                            style="
                                color: #333;
                                font-size: 1.5rem;
                                font-weight: 700;
                                margin: 0;
                            "
                        >
                            Assign Meal Plan
                        </h3>
                        <p
                            class="modal-subtitle"
                            style="color: #666; margin: 0.5rem 0 0 0"
                        >
                            Assign this meal plan to a member
                        </p>
                    </div>
                    <button
                        class="modal-close modern-close"
                        @click="closeAssignModal"
                        style="
                            background: none;
                            border: none;
                            color: #666;
                            font-size: 1.5rem;
                            cursor: pointer;
                            padding: 0.5rem;
                            border-radius: 4px;
                            transition: all 0.2s;
                        "
                    >
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div
                    class="modal-body modern-body"
                    style="padding: 1.5rem; background: white"
                    @click="handleModalBodyClick"
                >
                    <form
                        @submit.prevent="submitAssignForm"
                        class="modern-form"
                    >
                        <div class="form-group">
                            <label
                                for="memberSearch"
                                class="form-label"
                                style="
                                    color: #333;
                                    font-weight: 600;
                                    font-size: 1rem;
                                    margin-bottom: 0.5rem;
                                    display: block;
                                "
                            >
                                Select Member
                                <span
                                    class="required-asterisk"
                                    style="color: #e74c3c"
                                    >*</span
                                >
                            </label>

                            <!-- All Members Option -->
                            <div class="all-members-option" style="margin-bottom: 1rem;">
                                <label class="checkbox-label" style="display: flex; align-items: center; cursor: pointer;">
                                    <input
                                        type="checkbox"
                                        v-model="assignForm.assignToAllMembers"
                                        @change="handleAllMembersToggle"
                                        style="margin-right: 0.5rem; transform: scale(1.2);"
                                    />
                                    <span style="font-weight: 500; color: #333;">
                                        Assign to All Members
                                    </span>
                                </label>
                                <p style="margin: 0.25rem 0 0 1.5rem; font-size: 0.875rem; color: #666;">
                                    This will assign the meal plan to all active members in your gym
                                </p>
                            </div>

                            <!-- Member Search Input -->
                            <div
                                class="member-search-container"
                                style="position: relative; margin-bottom: 1rem"
                                :style="{ opacity: assignForm.assignToAllMembers ? 0.5 : 1 }"
                            >
                                <div
                                    class="search-input-wrapper"
                                    style="position: relative"
                                >
                                    <input
                                        id="memberSearch"
                                        v-model="memberSearchQuery"
                                        type="text"
                                        class="modern-input search-input"
                                        placeholder="Search members by name, ID, or email..."
                                        @input="filterMembers"
                                        @focus="showAllMembers"
                                        @click="showAllMembers"
                                        :disabled="loadingMembers || assignForm.assignToAllMembers"
                                        style="
                                            width: 100%;
                                            padding: 0.75rem 2rem;
                                            border: 1px solid #ddd;
                                            border-radius: 8px;
                                            font-size: 1rem;
                                            background: white;
                                            color: #333;
                                        "
                                    />
                                    <div class="search-icon">
                                        <i class="fas fa-search"></i>
                                    </div>
                                </div>

                                <!-- Member Dropdown -->
                                <div
                                    v-if="
                                        showMemberDropdown &&
                                        filteredMembers.length > 0
                                    "
                                    class="member-dropdown"
                                    style="
                                        position: absolute;
                                        top: 100%;
                                        left: 0;
                                        right: 0;
                                        background: white;
                                        border: 1px solid #ddd;
                                        border-radius: 8px;
                                        box-shadow: 0 4px 12px
                                            rgba(0, 0, 0, 0.15);
                                        max-height: 300px;
                                        overflow-y: auto;
                                        z-index: 1000;
                                    "
                                >
                                    <div
                                        v-if="!memberSearchQuery.trim()"
                                        class="dropdown-header"
                                        style="
                                            padding: 0.75rem 1rem;
                                            background: #f8f9fa;
                                            border-bottom: 1px solid #e9ecef;
                                            font-weight: 600;
                                            color: #495057;
                                        "
                                    >
                                        All Members ({{
                                            filteredMembers.length
                                        }})
                                    </div>
                                    <div
                                        v-for="member in filteredMembers"
                                        :key="member.id"
                                        class="member-option"
                                        @click="selectMember(member)"
                                        :class="{
                                            selected:
                                                assignForm.memberId ===
                                                member.id,
                                        }"
                                        style="
                                            padding: 0.75rem 1rem;
                                            border-bottom: 1px solid #f1f3f4;
                                            cursor: pointer;
                                            transition: background-color 0.2s;
                                        "
                                        :style="{
                                            'background-color':
                                                assignForm.memberId ===
                                                member.id
                                                    ? '#e3f2fd'
                                                    : 'transparent',
                                        }"
                                    >
                                        <div
                                            class="member-info"
                                            style="color: #000000"
                                        >
                                            <div class="member-name">
                                                {{
                                                    member.membername ||
                                                    member.firstname +
                                                        " " +
                                                        member.lastname
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Selected Member Display -->
                                <div
                                    v-if="selectedMember && assignForm.memberId"
                                    class="selected-member-display"
                                >
                                    <div class="selected-member-info">
                                        <div class="member-avatar">
                                            <i class="fas fa-user"></i>
                                        </div>
                                        <div class="member-details">
                                            <div class="member-name">
                                                {{
                                                    selectedMember.membername ||
                                                    selectedMember.firstname +
                                                        " " +
                                                        selectedMember.lastname
                                                }}
                                            </div>
                                            <div class="member-id">
                                                {{
                                                    selectedMember.getFormattedMemberId
                                                        ? selectedMember.getFormattedMemberId()
                                                        : "M-" +
                                                          selectedMember.id
                                                }}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            @click="clearSelectedMember"
                                            class="clear-member-btn"
                                        >
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div
                                v-if="loadingMembers"
                                class="loading-indicator"
                            >
                                <i class="fas fa-spinner fa-spin"></i> Loading
                                members...
                            </div>

                            <div
                                v-if="
                                    !loadingMembers &&
                                    filteredMembers.length === 0 &&
                                    memberSearchQuery
                                "
                                class="no-results"
                                style="
                                    padding: 1rem;
                                    text-align: center;
                                    color: #666;
                                    background: #f8f9fa;
                                    border-radius: 8px;
                                    margin-top: 0.5rem;
                                "
                            >
                                <i
                                    class="fas fa-search"
                                    style="margin-right: 0.5rem"
                                ></i>
                                No members found matching "{{
                                    memberSearchQuery
                                }}"
                            </div>
                        </div>

                        <div class="form-group" style="margin-bottom: 1rem">
                            <label
                                for="startDate"
                                class="form-label"
                                style="
                                    color: #333;
                                    font-weight: 600;
                                    font-size: 1rem;
                                    margin-bottom: 0.5rem;
                                    display: block;
                                "
                                >Start Date (Optional)</label
                            >
                            <input
                                id="startDate"
                                v-model="assignForm.startDate"
                                type="date"
                                class="modern-input"
                                :min="new Date().toISOString().split('T')[0]"
                                style="
                                    width: 100%;
                                    padding: 0.75rem 1rem;
                                    border: 1px solid #ddd;
                                    border-radius: 8px;
                                    font-size: 1rem;
                                    background: white;
                                    color: #333;
                                "
                            />
                        </div>

                        <div class="form-group" style="margin-bottom: 1.5rem">
                            <label
                                for="duration"
                                class="form-label"
                                style="
                                    color: #333;
                                    font-weight: 600;
                                    font-size: 1rem;
                                    margin-bottom: 0.5rem;
                                    display: block;
                                "
                                >Duration (Optional)</label
                            >
                            <select
                                id="duration"
                                v-model="assignForm.duration"
                                class="modern-input"
                                style="
                                    width: 100%;
                                    padding: 0.5rem 1rem;
                                    border: 1px solid #ddd;
                                    border-radius: 8px;
                                    font-size: 1rem;
                                    background: white;
                                    color: #333;
                                "
                            >
                                <option value="">Select Duration</option>
                                <option value="1_week">1 Week</option>
                                <option value="2_weeks">2 Weeks</option>
                                <option value="1_month">1 Month</option>
                                <option value="2_months">2 Months</option>
                                <option value="3_months">3 Months</option>
                                <option value="6_months">6 Months</option>
                                <option value="1_year">1 Year</option>
                                <option value="ongoing">Ongoing</option>
                            </select>
                        </div>

                        <div class="form-group" style="margin-bottom: 1.5rem">
                            <label
                                for="description"
                                class="form-label"
                                style="
                                    color: #333;
                                    font-weight: 600;
                                    font-size: 1rem;
                                    margin-bottom: 0.5rem;
                                    display: block;
                                "
                                >Description (Optional)</label
                            >
                            <textarea
                                id="description"
                                v-model="assignForm.description"
                                class="modern-input"
                                placeholder="Add any notes or special instructions for this meal plan assignment..."
                                rows="3"
                                style="
                                    width: 100%;
                                    padding: 0.5rem 1rem;
                                    border: 1px solid #ddd;
                                    border-radius: 8px;
                                    font-size: 1rem;
                                    background: white;
                                    color: #333;
                                    resize: vertical;
                                    font-family: inherit;
                                "
                            ></textarea>
                        </div>

                        <div
                            class="form-actions"
                            style="
                                display: flex;
                                gap: 1rem;
                                justify-content: flex-end;
                                margin-top: 2rem;
                            "
                        >
                            <button
                                type="button"
                                @click="closeAssignModal"
                                class="btn-secondary-modern"
                                style="
                                    padding: 0.75rem 1.5rem;
                                    border: 1px solid #ddd;
                                    border-radius: 8px;
                                    background: white;
                                    color: #666;
                                    cursor: pointer;
                                    font-size: 1rem;
                                "
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                class="btn-primary-modern"
                                :disabled="!assignForm.memberId && !assignForm.assignToAllMembers"
                                style="
                                    padding: 0.75rem 1.5rem;
                                    border: none;
                                    border-radius: 8px;
                                    background: #dc3545;
                                    color: white;
                                    cursor: pointer;
                                    font-size: 1rem;
                                    font-weight: 600;
                                "
                            >
                                <i class="fas fa-user-plus"></i>
                                Assign Plan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- New Meal Modal -->
        <div
            v-if="showNewMealModal"
            class="modal-overlay new-meal-overlay"
            @click="closeNewMealModal"
            @keydown.esc="closeNewMealModal"
        >
            <div class="modal-content new-meal-modal" @click.stop>
                <div class="modal-header">
                    <h3>{{ isEditingMeal ? "Edit Meal" : "Add New Meal" }}</h3>
                    <button class="modal-close" @click="closeNewMealModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="modal-body">
                    <form @submit.prevent="saveNewMeal" class="new-meal-form">
                        <!-- Basic Information -->
                        <div class="form-section">
                            <h4 class="section-title">Basic Information</h4>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="mealName">Meal Name *</label>
                                    <input
                                        id="mealName"
                                        v-model="newMeal.name"
                                        type="text"
                                        placeholder="e.g., Grilled Chicken Breast"
                                        required
                                        class="form-input"
                                    />
                                </div>

                                <div class="form-group">
                                    <label for="foodType">Food Type *</label>
                                    <select
                                        id="foodType"
                                        v-model="newMeal.food_type"
                                        required
                                        class="form-select"
                                    >
                                        <option value="">
                                            Select Food Type
                                        </option>
                                        <option
                                            v-for="foodType in filteredAvailableFoodTypes"
                                            :key="foodType"
                                            :value="foodType"
                                        >
                                            {{ foodType }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group full-width">
                                    <label for="mealDescription"
                                        >Description</label
                                    >
                                    <textarea
                                        id="mealDescription"
                                        v-model="newMeal.description"
                                        placeholder="Brief description of the meal..."
                                        class="form-textarea"
                                        rows="2"
                                    ></textarea>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group full-width">
                                    <label for="mealImage">Meal Image</label>
                                    <div class="image-upload-container">
                                        <input
                                            id="mealImage"
                                            type="file"
                                            @change="handleImageUpload"
                                            accept="image/*"
                                            class="image-upload-input"
                                            ref="imageInput"
                                        />
                                        <div
                                            class="image-upload-area"
                                            @click="$refs.imageInput.click()"
                                        >
                                            <div
                                                v-if="
                                                    !newMeal.fatsecret_url &&
                                                    !imagePreview
                                                "
                                                class="upload-placeholder"
                                            >
                                                <i
                                                    class="fas fa-cloud-upload-alt"
                                                ></i>
                                                <p>
                                                    Click to upload meal image
                                                </p>
                                                <small
                                                    >JPG, PNG, GIF up to
                                                    5MB</small
                                                >
                                            </div>
                                            <div v-else class="image-preview" style="position: relative;">
                                                <img
                                                    :src="imagePreview || newMeal.fatsecret_url"
                                                    alt="Meal preview"
                                                    class="preview-image"
                                                    style="position: relative; z-index: 1;"
                                                />
                                                <div class="image-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                                                    <button
                                                        type="button"
                                                        @click.stop="removeImage"
                                                        class="remove-image-btn"
                                                        style="position: absolute; top: 8px; right: 8px; z-index: 2;"
                                                    >
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group full-width">
                                    <label for="servingDescription"
                                        >Serving Description</label
                                    >
                                    <input
                                        id="servingDescription"
                                        v-model="newMeal.serving_description"
                                        type="text"
                                        placeholder="e.g., 1 cup, 100g, 1 piece"
                                        class="form-input"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Nutritional Information -->
                        <div class="form-section">
                            <h4 class="section-title">
                                Nutritional Information (per serving)
                            </h4>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="calories">Calories</label>
                                    <input
                                        id="calories"
                                        v-model.number="newMeal.calories"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        placeholder="0"
                                        class="form-input"
                                    />
                                </div>

                                <div class="form-group">
                                    <label for="protein">Protein (g)</label>
                                    <input
                                        id="protein"
                                        v-model.number="newMeal.protein"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        placeholder="0"
                                        class="form-input"
                                    />
                                </div>

                                <div class="form-group">
                                    <label for="carbohydrate"
                                        >Carbohydrates (g)</label
                                    >
                                    <input
                                        id="carbohydrate"
                                        v-model.number="newMeal.carbohydrate"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        placeholder="0"
                                        class="form-input"
                                    />
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="fat">Total Fat (g)</label>
                                    <input
                                        id="fat"
                                        v-model.number="newMeal.fat"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        placeholder="0"
                                        class="form-input"
                                    />
                                </div>

                                <div class="form-group">
                                    <label for="fiber">Fiber (g)</label>
                                    <input
                                        id="fiber"
                                        v-model.number="newMeal.fiber"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        placeholder="0"
                                        class="form-input"
                                    />
                                </div>

                                <div class="form-group">
                                    <label for="sugar">Sugar (g)</label>
                                    <input
                                        id="sugar"
                                        v-model.number="newMeal.sugar"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        placeholder="0"
                                        class="form-input"
                                    />
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="sodium">Sodium (mg)</label>
                                    <input
                                        id="sodium"
                                        v-model.number="newMeal.sodium"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        placeholder="0"
                                        class="form-input"
                                    />
                                </div>

                                <div class="form-group">
                                    <label for="cholesterol"
                                        >Cholesterol (mg)</label
                                    >
                                    <input
                                        id="cholesterol"
                                        v-model.number="newMeal.cholesterol"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        placeholder="0"
                                        class="form-input"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Advanced Nutritional Information -->
                        <div class="form-section">
                            <h4 class="section-title">
                                <span>Advanced Nutrition</span>
                                <button
                                    type="button"
                                    class="toggle-btn"
                                    @click="
                                        showAdvancedNutrition =
                                            !showAdvancedNutrition
                                    "
                                >
                                    <i
                                        :class="
                                            showAdvancedNutrition
                                                ? 'fas fa-chevron-up'
                                                : 'fas fa-chevron-down'
                                        "
                                    ></i>
                                </button>
                            </h4>

                            <div
                                v-show="showAdvancedNutrition"
                                class="advanced-nutrition"
                            >
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="saturated_fat"
                                            >Saturated Fat (g)</label
                                        >
                                        <input
                                            id="saturated_fat"
                                            v-model.number="
                                                newMeal.saturated_fat
                                            "
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            placeholder="0"
                                            class="form-input"
                                        />
                                    </div>

                                    <div class="form-group">
                                        <label for="trans_fat"
                                            >Trans Fat (g)</label
                                        >
                                        <input
                                            id="trans_fat"
                                            v-model.number="newMeal.trans_fat"
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            placeholder="0"
                                            class="form-input"
                                        />
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="vitamin_a"
                                            >Vitamin A (mcg)</label
                                        >
                                        <input
                                            id="vitamin_a"
                                            v-model.number="newMeal.vitamin_a"
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            placeholder="0"
                                            class="form-input"
                                        />
                                    </div>

                                    <div class="form-group">
                                        <label for="vitamin_c"
                                            >Vitamin C (mg)</label
                                        >
                                        <input
                                            id="vitamin_c"
                                            v-model.number="newMeal.vitamin_c"
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            placeholder="0"
                                            class="form-input"
                                        />
                                    </div>

                                    <div class="form-group">
                                        <label for="vitamin_d"
                                            >Vitamin D (mcg)</label
                                        >
                                        <input
                                            id="vitamin_d"
                                            v-model.number="newMeal.vitamin_d"
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            placeholder="0"
                                            class="form-input"
                                        />
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="calcium"
                                            >Calcium (mg)</label
                                        >
                                        <input
                                            id="calcium"
                                            v-model.number="newMeal.calcium"
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            placeholder="0"
                                            class="form-input"
                                        />
                                    </div>

                                    <div class="form-group">
                                        <label for="iron">Iron (mg)</label>
                                        <input
                                            id="iron"
                                            v-model.number="newMeal.iron"
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            placeholder="0"
                                            class="form-input"
                                        />
                                    </div>

                                    <div class="form-group">
                                        <label for="potassium"
                                            >Potassium (mg)</label
                                        >
                                        <input
                                            id="potassium"
                                            v-model.number="newMeal.potassium"
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            placeholder="0"
                                            class="form-input"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-actions">
                            <button
                                type="button"
                                @click="closeNewMealModal"
                                class="btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                class="btn-primary"
                                :disabled="!newMeal.name || !newMeal.food_type"
                            >
                                <i class="fas fa-save"></i>
                                {{
                                    isEditingMeal ? "Update Meal" : "Save Meal"
                                }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Edit Meal Plan Modal - Full Screen -->
        <div
            v-if="showCreateTemplateModal && isEditing"
            class="modal-overlay"
            @click="closeCreateModal"
            @keydown.esc="closeCreateModal"
        >
            <div class="modal-content full-screen-modal" @click.stop>
                <!-- Header -->
                <div class="modal-header modern-header">
                    <div class="header-content">
                        <h3 class="modal-title">Edit Meal Plan</h3>
    </div>
                    <button
                        class="modal-close modern-close"
                        @click="closeCreateModal"
                    >
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Main Content -->
                <div class="modal-body modern-body">
                    <form @submit.prevent="handleFormSubmit" class="modern-form">
                                                    <!-- Admin Info Header -->
                                                    <div class="admin-info-header">
                                <div class="admin-info-item">
                                    <span class="info-label">Created By:</span>
                                    <span class="info-value">{{ currentUserName }}</span>
                                </div>
                                <div class="admin-info-item">
                                    <span class="info-label">Date Created:</span>
                                    <span class="info-value">{{ editingTemplateDateCreated || getCurrentDateFormatted() }}</span>
                                </div>
                                <div class="admin-info-item">
                                    <span class="info-label">Last Modified:</span>
                                    <span class="info-value">{{ getCurrentDateFormatted() }}</span>
                                </div>
                            </div>
                                                    <!-- Top Sections: Meal Plan Targets and Nutrition Levels Stacked -->
                                                    <div class="top-sections-container-vertical">
                                <!-- Meal Plan Targets Section -->
                                <div class="meal-plan-targets-section">
                                    <div class="targets-header">
                                        <h4 class="targets-title">Meal Plan Targets</h4>
                                        <button type="button" class="edit-targets-btn" @click="editTargets">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                    </div>

                                    <div class="targets-actual-combined">
                                        <div class="targets-row">
                                            <span class="targets-label">TARGETS:</span>
                                            <div class="targets-content-container">
                                                <div class="targets-macros">
                                                    <span class="target-macro protein-target-text">{{ newTemplate.targets.protein || 0 }}g PROTEIN</span>
                                                    <span class="target-macro carbs-target-text">{{ newTemplate.targets.carbs || 0 }}g CARBS</span>
                                                    <span class="target-macro fat-target-text">{{ newTemplate.targets.fat || 0 }}g FAT</span>
                                                </div>
                                                <span class="target-total-calories">TOTAL CALORIES: {{ calculateTotalCalories() }}</span>
                                            </div>
                                        </div>

                                        <div class="actual-row">
                                            <span class="actual-label">ACTUAL:</span>
                                            <div class="actual-bar-container">
                                                <div class="actual-bar">
                                                    <div class="actual-segment protein-segment" :style="{ width: getVisualBarWidth('protein') + '%' }">
                                                        <span class="segment-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.protein) || 0 }}g</span>
                                                    </div>
                                                    <div class="actual-segment carbs-segment" :style="{ width: getVisualBarWidth('carbs') + '%' }">
                                                        <span class="segment-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.carbs) || 0 }}g</span>
                                                    </div>
                                                    <div class="actual-segment fat-segment" :style="{ width: getVisualBarWidth('fat') + '%' }">
                                                        <span class="segment-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.fat) || 0 }}g</span>
                                                    </div>
                                                </div>
                                                <span class="total-calories">TOTAL CALORIES: {{ getCurrentTotalCalories() }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Nutrition Levels Summary -->
                                <div class="nutrition-levels-summary" style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 1.5rem; margin-bottom: 0; color: #333333; min-height: 300px;">
                                    <h4 class="nutrition-levels-header">Nutrition Levels</h4>
                                    <p class="nutrition-levels-subtitle">(Current/Daily Target)</p>
                                    
                                    <div class="nutrition-metrics">
                                        <div class="nutrition-metric calories">
                                            <span class="metric-label">Total Calories:</span>
                                            <span class="metric-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.calories) || 1900 }} / {{ (newTemplate.targets && newTemplate.targets.calories) || 2000 }}</span>
                                        </div>
                                        
                                        <div class="nutrition-metric protein">
                                            <span class="metric-label">Total Protein:</span>
                                            <span class="metric-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.protein) || 118.5 }}g / {{ (newTemplate.targets && newTemplate.targets.protein) || 125 }}g</span>
                                        </div>
                                        
                                        <div class="nutrition-metric carbs">
                                            <span class="metric-label">Total Carbs:</span>
                                            <span class="metric-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.carbs) || 213.75 }}g / {{ (newTemplate.targets && newTemplate.targets.carbs) || 225 }}g</span>
                                        </div>
                                        
                                        <div class="nutrition-metric fiber">
                                            <span class="metric-label">Total Fiber:</span>
                                            <span class="metric-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.fiber) || 35.2 }}g</span>
                                        </div>
                                        
                                        <div class="nutrition-metric net-carbs">
                                            <span class="metric-label">Total Net Carbs:</span>
                                            <span class="metric-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.netCarbs) || 178.55 }}g</span>
                                        </div>
                                        
                                        <div class="nutrition-metric fat">
                                            <span class="metric-label">Total Fat:</span>
                                            <span class="metric-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.fat) || 63.65 }}g / {{ (newTemplate.targets && newTemplate.targets.fat) || 67 }}g</span>
                                        </div>
                                        
                                        <div class="nutrition-metric sodium">
                                            <span class="metric-label">Total Sodium:</span>
                                            <span class="metric-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.sodium) || 1500 }}mg</span>
                                        </div>
                                        
                                        <div class="nutrition-metric potassium">
                                            <span class="metric-label">Total Potassium (K):</span>
                                            <span class="metric-value">{{ (newTemplate.currentIntake && newTemplate.currentIntake.potassium) || 3200 }}mg</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <!-- Basic Information Section -->
                        <div class="step-content">
                            <!-- Basic Information Section -->
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="templateNameEdit">Meal Plan Name</label>
                                    <input
                                        id="templateNameEdit"
                                        v-model="newTemplate.name"
                                        type="text"
                                        placeholder="e.g., Weight Loss (1800 kcal)"
                                        required
                                        class="modern-input"
                                    />
                                </div>
                            <div class="form-group">
                                    <label for="templateDescriptionEdit">Description</label>
                                <textarea
                                        id="templateDescriptionEdit"
                                    v-model="newTemplate.description"
                                    placeholder="Describe the meal plan template..."
                                    required
                                    class="modern-textarea"
                                    rows="2"
                                ></textarea>
                                </div>
                            </div>

                            <!-- Meal Image Selection Section -->
                            <div class="form-row mt-3">
                                <div class="form-group">
                                    <label>Meal Plan Image</label>
                                    <small class="text-muted d-block mb-2">Use arrows to navigate and select a default image</small>
                                    <div class="image-selector-container">
                                        <button 
                                            type="button"
                                            class="image-nav-btn image-nav-btn-left"
                                            @click="navigateImage(-1)"
                                            :disabled="isSubmitting"
                                        >
                                            <i class="fas fa-chevron-left"></i>
                                        </button>
                                        <div class="single-image-display">
                                            <img 
                                                :src="'/' + defaultNutritionImages[selectedImageIndex]" 
                                                :alt="`Nutrition image ${selectedImageIndex + 1}`"
                                                class="selected-image-preview"
                                            />
                                            <div class="image-counter">
                                                {{ selectedImageIndex + 1 }} / {{ defaultNutritionImages.length }}
                                            </div>
                                        </div>
                                        <button 
                                            type="button"
                                            class="image-nav-btn image-nav-btn-right"
                                            @click="navigateImage(1)"
                                            :disabled="isSubmitting"
                                        >
                                            <i class="fas fa-chevron-right"></i>
                                        </button>
                                    </div>
                                    <small class="text-muted d-block mt-2">
                                        Selected: {{ defaultNutritionImages[selectedImageIndex].split('/').pop() }}
                                    </small>
                                </div>
                            </div>

                            <div class="form-row">
                            <div class="form-group">
                                <label for="templateCategory">Category</label>
                                <select
                                    id="templateCategory"
                                    v-model="newTemplate.category_id"
                                        @change="onCategoryChange"
                                    class="modern-select"
                                >
                                    <option value="">Select Category</option>
                                    <option
                                            v-for="category in getAvailableCategories()"
                                        :key="category.id"
                                        :value="category.id"
                                    >
                                        {{ category.name }}
                                    </option>
                                </select>
                                </div>
                            </div>

                            <!-- Target Macros Section -->
                            <div class="target-macros-section">
                                <h4 class="section-title">Target Macros</h4>
                                <div class="macros-grid target-macros-grid">
                                    <div class="form-group">
                                        <label for="targetProtein">Target Protein (grams)</label>
                                        <input
                                            id="targetProtein"
                                            v-model.number="newTemplate.targets.protein"
                                            type="number"
                                            min="0"
                                            step="0.1"
                                            placeholder="e.g., 125"
                                            required
                                            class="modern-input"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="targetCarbs">Target Carbs (grams)</label>
                                        <input
                                            id="targetCarbs"
                                            v-model.number="newTemplate.targets.carbs"
                                            type="number"
                                            min="0"
                                            step="0.1"
                                            placeholder="e.g., 225"
                                            required
                                            class="modern-input"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="targetFat">Target Fat (grams)</label>
                                        <input
                                            id="targetFat"
                                            v-model.number="newTemplate.targets.fat"
                                            type="number"
                                            min="0"
                                            step="0.1"
                                            placeholder="e.g., 67"
                                            required
                                            class="modern-input"
                                        />
                                    </div>
                                    <div class="form-group calories-display">
                                        <label>Total Calories</label>
                                        <div class="calories-value">{{ calculateTotalCalories() }}</div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!-- Advanced Configuration (only in edit mode) -->
                        <div class="step-content">




                            <!-- Meal Plan Instructions Section -->
                            <div class="meal-plan-instructions-section">
                                <div class="instructions-header">
                                    <h4 class="instructions-title">Add Meal Plan Instructions</h4>
                                    <button type="button" class="edit-instructions-btn" @click="toggleInstructionsEdit" title="Edit Instructions">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </div>
                                <div class="instructions-content">
                                    <div v-if="!isEditingInstructions" class="instructions-display">
                                        <p class="instructions-text">{{ newTemplate.instructions || 'No instructions added yet.' }}</p>
                                    </div>
                                    <div v-else class="instructions-edit">
                                        <textarea 
                                            v-model="newTemplate.instructions"
                                            class="instructions-input"
                                            placeholder="Enter meal plan instructions..."
                                            rows="3"
                                        ></textarea>
                                        <div class="instructions-actions">
                                            <button type="button" class="save-instructions-btn" @click="saveInstructions">
                                                <i class="fas fa-check"></i> Save
                                            </button>
                                            <button type="button" class="cancel-instructions-btn" @click="cancelInstructionsEdit">
                                                <i class="fas fa-times"></i> Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Bottom Row: Meal Tables -->
                            <div class="meals-section">
                                <div class="meals-header">
                                    <h4 class="section-title">Meals for This Plan</h4>
                                </div>
                                <div class="meal-tables-container">
                                    <div
                                        v-for="(meal, mealIndex) in mealCards"
                                        :key="meal.key"
                                        class="meal-table-section"
                                        :class="{ 'alternate-meal': meal.isAlternate }"
                                    >
                                        <div class="meal-table-header">
                                            <div class="meal-title-section">
                                                <span class="meal-icon">
                                                    <i :class="meal.icon"></i>
                                                </span>
                                                <div class="meal-title-container">
                                                    <h5 
                                                        v-if="!meal.isEditingTitle" 
                                                        class="meal-table-title"
                                                        @click="startEditingMealTitle(mealIndex)"
                                                    >
                                                        MEAL #{{ mealIndex + 1 }} - {{ meal.label }}
                                                        <span v-if="meal.isAlternate" class="alternate-badge">ALTERNATIVE</span>
                                                    </h5>
                                                    <div v-else class="meal-title-edit">
                                                        <input 
                                                            v-model="meal.editTitleValue"
                                                            @blur="saveMealTitle(mealIndex)"
                                                            @keyup.enter="saveMealTitle(mealIndex)"
                                                            @keyup.esc="cancelEditingMealTitle(mealIndex)"
                                                            class="meal-title-input"
                                                            :ref="'mealTitleInput' + mealIndex"
                                                            :id="'mealTitleInput' + mealIndex"
                                                        />
                                                    </div>
                                                    <button 
                                                        type="button" 
                                                        class="edit-meal-title-btn"
                                                        @click="startEditingMealTitle(mealIndex)"
                                                        title="Edit Meal Title"
                                                    >
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="meal-header-actions">
                                                <div class="dropdown" :class="{ 'show': meal.showDropdown }">
                                                    <button 
                                                        class="btn btn-link meal-dropdown-btn" 
                                                        type="button" 
                                                        :id="'mealDropdown' + mealIndex"
                                                        @click.stop="handleMealDropdownClick(mealIndex)"
                                                        aria-expanded="false"
                                                    >
                                                        <i class="fas fa-ellipsis-v"></i>
                                                    </button>
                                                    <ul 
                                                        class="dropdown-menu" 
                                                        :class="{ 'show': meal.showDropdown }" 
                                                        :aria-labelledby="'mealDropdown' + mealIndex"
                                                        :style="{ display: meal.showDropdown ? 'block' : 'none' }"
                                                    >
                                                        <li><a class="dropdown-item" href="#" @click.prevent="moveMealUp(mealIndex)">Move Up</a></li>
                                                        <li><a class="dropdown-item" href="#" @click.prevent="moveMealDown(mealIndex)">Move Down</a></li>
                                                        <li><a class="dropdown-item" href="#" @click.prevent="createAlternateMeal(mealIndex)">Create Alternate Meal</a></li>
                                                        <li><a class="dropdown-item" href="#" @click.prevent="duplicateAsNew(mealIndex)">Duplicate As New</a></li>
                                                        <li><a class="dropdown-item" href="#" @click.prevent="duplicateAsAlternate(mealIndex)">Duplicate As Alternate</a></li>
                                                        <li><hr class="dropdown-divider"></li>
                                                        <li><a class="dropdown-item text-danger" href="#" @click.prevent="deleteMeal(mealIndex)"><i class="fas fa-trash-alt me-2"></i>Delete</a></li>
                                                    </ul>
                                                </div>
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
                                                        <!-- <th>Normalized Serving</th> -->
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
                                                        <!-- <td class="normalized-serving-cell">
                                                            <div class="serving-edit-container">
                                                                <template v-if="!editingServingFields[`${meal.key}-${idx}-normalized`]">
                                                                    <span class="serving-value">
                                                                        {{ (product.normalized_serving !== null && product.normalized_serving !== undefined && product.normalized_serving !== '') ? product.normalized_serving : (product.serving_description || 'N/A') }}
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        @click.stop="startEditingServing(meal.key, idx, 'normalized')"
                                                                        class="edit-serving-icon-btn"
                                                                        title="Edit Normalized Serving"
                                                                    >
                                                                        <i class="fas fa-edit"></i>
                                                                    </button>
                                                                </template>
                                                                <template v-else>
                                                                    <input
                                                                        type="text"
                                                                        v-model="product.editNormalizedServing"
                                                                        @blur="saveServingField(meal.key, idx, 'normalized')"
                                                                        @keyup.enter="saveServingField(meal.key, idx, 'normalized')"
                                                                        @keyup.esc="cancelEditingServing(meal.key, idx, 'normalized')"
                                                                        class="serving-input"
                                                                        :ref="`normalized-serving-${meal.key}-${idx}`"
                                                                    />
                                                                </template>
                                                            </div>
                                                        </td> -->
                                                        <td class="label-serving-cell">
                                                            <div class="serving-edit-container">
                                                                <template v-if="!editingServingFields[`${meal.key}-${idx}-label`]">
                                                                    <span class="serving-value">
                                                                        {{ ((product.label_serving !== null && product.label_serving !== undefined && product.label_serving !== '') ? product.label_serving : (product.serving_description || '')) || 'N/A' }}<span class="unit-suffix">{{ product.unit || 'gm' }}</span>
                                                                    </span>
                                                                    <span v-if="savingFields && savingFields[`${editingTemplateId}-${product.id}-${meal.key}-label`]" class="saving-loader">
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
                                                                            :disabled="savingFields && savingFields[`${editingTemplateId}-${product.id}-${meal.key}-label`]"
                                                                        />
                                                                        <span class="unit-suffix-input">{{ product.unit || 'gm' }}</span>
                                                                        <span v-if="savingFields && savingFields[`${editingTemplateId}-${product.id}-${meal.key}-label`]" class="saving-loader-input">
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
                                                                    <span v-if="savingFields && savingFields[`${editingTemplateId}-${product.id}-${meal.key}-notes`]" class="saving-loader">
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
                                                                            :disabled="savingFields && savingFields[`${editingTemplateId}-${product.id}-${meal.key}-notes`]"
                                                                        />
                                                                        <span v-if="savingFields && savingFields[`${editingTemplateId}-${product.id}-${meal.key}-notes`]" class="saving-loader-input">
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

                        <!-- Actions -->
                        <div class="form-actions-modern">
                            <button
                                type="button"
                                @click="closeCreateModal"
                                class="btn-secondary-modern"
                            >
                                Cancel
                            </button>
                            
                            <!-- Edit Mode Actions -->
                            <button type="submit" class="btn-primary-modern">
                                <i class="fas fa-save"></i>
                                Update Meal Plan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Detailed Meal Plan Table Modal -->
        <div class="detailed-meal-plan-modal" v-if="showDetailedMealPlan">
            <div class="modal-overlay" @click="closeDetailedMealPlan">
                <div class="modal-content detailed-meal-content" @click.stop>
                    <!-- <div class="modal-header">
                        <h3 class="modal-title">Detailed Meal Plan</h3>
                        <button type="button" class="close-btn" @click="closeDetailedMealPlan">
                            <i class="fas fa-times"></i>
                        </button>
                    </div> -->
                    <div class="modal-body">
                        <!-- Detailed Meal Plan Table -->
                        <div class="detailed-meal-plan-section">
                            <div class="meal-header">
                                <div class="meal-title-bar">
                                    <span class="meal-number">MEAL #1</span>
                                    <div class="meal-actions">
                                        <button type="button" class="meal-menu-btn" title="Menu">
                                            <i class="fas fa-ellipsis-v"></i>
                                        </button>
                                        <button type="button" class="meal-edit-btn" title="Edit Meal">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Custom 8-4 Grid Layout -->
                            <div class="detailed-meal-grid">
                                <!-- Left Column - 8 columns (Nutrition Table) -->
                                <div class="detailed-meal-left">
                                    <div class="nutrition-table-container">
                                        <table class="nutrition-table">
                                    <thead>
                                        <tr class="table-header">
                                            <th class="remove-col"></th>
                                            <th class="ingredient-col">Ingredient</th>
                                            <!-- <th class="serving-col">Normalized Serving</th> -->
                                            <th class="serving-col">Label Serving</th>
                                            <th class="nutrition-col">Protein</th>
                                            <th class="nutrition-col">Total Carb</th>
                                            <th class="nutrition-col">Net Carbs</th>
                                            <th class="nutrition-col">Fat</th>
                                            <th class="nutrition-col">Fiber</th>
                                            <th class="nutrition-col">Sod</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="ingredient-row">
                                            <td class="remove-cell">
                                                <button type="button" class="remove-ingredient-btn">
                                                    <i class="fas fa-times"></i>
                                                </button>
                                            </td>
                                            <td class="ingredient-cell">
                                                R.W. KNUDSEN FAMILY, 100% ORGANIC JUICE, APPLE
                                            </td>
                                            <!-- <td class="serving-cell">
                                                <span class="serving-value">125 ml</span>
                                                <button type="button" class="edit-serving-btn">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </td> -->
                                            <td class="serving-cell">
                                                <span class="serving-value">N/A</span>
                                                <button type="button" class="edit-serving-btn">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </td>
                                            <td class="nutrition-cell">0.00</td>
                                            <td class="nutrition-cell">15.00</td>
                                            <td class="nutrition-cell">15.00</td>
                                            <td class="nutrition-cell">0.00</td>
                                            <td class="nutrition-cell">0.00</td>
                                            <td class="nutrition-cell">10.0</td>
                                        </tr>
                                        <tr class="ingredient-row">
                                            <td class="remove-cell">
                                                <button type="button" class="remove-ingredient-btn">
                                                    <i class="fas fa-times"></i>
                                                </button>
                                            </td>
                                            <td class="ingredient-cell">
                                                CHIA SEEDS
                                            </td>
                                            <td class="serving-cell">
                                                <span class="serving-value">36 grams</span>
                                                <button type="button" class="edit-serving-btn">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </td>
                                            <td class="serving-cell">
                                                <span class="serving-value">N/A</span>
                                                <button type="button" class="edit-serving-btn">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </td>
                                            <td class="nutrition-cell">6.01</td>
                                            <td class="nutrition-cell">15.98</td>
                                            <td class="nutrition-cell">1.98</td>
                                            <td class="nutrition-cell">11.02</td>
                                            <td class="nutrition-cell">14.00</td>
                                            <td class="nutrition-cell">5.0</td>
                                        </tr>
                                        <tr class="ingredient-row">
                                            <td class="remove-cell">
                                                <button type="button" class="remove-ingredient-btn">
                                                    <i class="fas fa-times"></i>
                                                </button>
                                            </td>
                                            <td class="ingredient-cell">
                                                Protein - pea (NuEthix Medipure DS vanilla)
                                                <button type="button" class="buy-now-btn">BUY NOW</button>
                                            </td>
                                            <td class="serving-cell">
                                                <span class="serving-value">40 grams</span>
                                                <button type="button" class="edit-serving-btn">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </td>
                                            <td class="serving-cell">
                                                <span class="serving-value">1.00 scoop</span>
                                                <button type="button" class="edit-serving-btn">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </td>
                                            <td class="nutrition-cell">14.99</td>
                                            <td class="nutrition-cell">9.01</td>
                                            <td class="nutrition-cell">6.99</td>
                                            <td class="nutrition-cell">5.01</td>
                                            <td class="nutrition-cell">2.02</td>
                                            <td class="nutrition-cell">199.</td>
                                        </tr>
                                        <tr class="ingredient-row">
                                            <td class="remove-cell">
                                                <button type="button" class="remove-ingredient-btn">
                                                    <i class="fas fa-times"></i>
                                                </button>
                                            </td>
                                            <td class="ingredient-cell">
                                                Strawberry - frozen (Kirkland)
                                            </td>
                                            <td class="serving-cell">
                                                <span class="serving-value">140 grams</span>
                                                <button type="button" class="edit-serving-btn">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </td>
                                            <td class="serving-cell">
                                                <span class="serving-value">1.00 cups</span>
                                                <button type="button" class="edit-serving-btn">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </td>
                                            <td class="nutrition-cell">0.28</td>
                                            <td class="nutrition-cell">13.02</td>
                                            <td class="nutrition-cell">10.08</td>
                                            <td class="nutrition-cell">0.00</td>
                                            <td class="nutrition-cell">2.94</td>
                                            <td class="nutrition-cell">0.0</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr class="totals-row">
                                            <td colspan="2" class="totals-label">TOTALS</td>
                                            <td class="totals-cell"></td>
                                            <td class="totals-cell"></td>
                                            <td class="totals-cell">21.28</td>
                                            <td class="totals-cell">53.01</td>
                                            <td class="totals-cell">34.05</td>
                                            <td class="totals-cell">16.03</td>
                                            <td class="totals-cell">18.96</td>
                                            <td class="totals-cell">215.</td>
                                        </tr>
                                    </tfoot>
                                        </table>
                                    </div>
                                </div>

                                <!-- Right Column - 4 columns (Summary & Instructions) -->
                                <div class="detailed-meal-right">
                                    <div class="meal-sidebar">
                                        <div class="meal-summary-bar">
                                <div class="summary-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 85%;"></div>
                                    </div>
                                </div>
                                <div class="summary-text">
                                    CAL: 452.46 / PROT: 21.28 / CARBS: 53.01 / FAT: 16.03
                                </div>
                            </div>

                                        <div class="meal-instructions-section">
                                            <div class="meal-instructions-header">
                                                <h5 class="meal-instructions-title">Meal #1 Instructions:</h5>
                                                <button type="button" class="edit-meal-instructions-btn" title="Edit Instructions">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </div>
                                            <div class="meal-instructions-content">
                                                <p class="meal-instructions-text">Mix all ingredients for a shake. Take 3 optipure with this meal</p>
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

        <!-- Video Tutorial Modal -->
        <b-modal
            v-model="showVideoTutorialModal"
            title="Nutrition Tutorial"
            size="lg"
            centered
            hide-footer
            class="video-tutorial-modal"
            @hide="closeVideoTutorialModal"
        >
            <div class="video-container">
                <div v-if="videoError" class="text-center py-4">
                    <i class="fas fa-exclamation-triangle text-warning" style="font-size: 2rem"></i>
                    <p class="mt-2">{{ videoError }}</p>
                </div>
                <div v-else class="position-relative">
                    <div v-if="isVideoLoading" class="video-loading-overlay">
                        <div class="text-center py-4">
                            <div class="spinner-border text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <p class="mt-2">Loading video...</p>
                        </div>
                    </div>
                    <video
                        :src="videoTutorialUrl"
                        controls
                        class="w-100 rounded"
                        style="max-height: 500px"
                        @loadstart="onVideoLoadStart"
                        @canplay="onVideoCanPlay"
                        @error="handleVideoError"
                        @loadeddata="onVideoLoaded"
                        @loadedmetadata="onVideoLoaded"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "NutritionHub",
    components: {
    },
    data() {
        return {
            // Assign Modal Data
            assignForm: {
                memberId: "",
                assignToAllMembers: false,
                startDate: "",
                duration: "",
                description: "",
            },
            showAssignModal: false,
            selectedTemplateId: null,
            selectedMember: null,
            memberSearchQuery: "",
            showMemberDropdown: false,
            members: [],
            filteredMembers: [],
            loadingMembers: false,
            // Template dropdown states
            openDropdownId: null,
            // Track expanded descriptions for template cards
            expandedDescriptions: {},

            activeTab: 0, // Default to Assigned Meals tab
            
            // Video Tutorial Modal
            showVideoTutorialModal: false,
            isVideoLoading: false,
            videoError: null,
            videoTutorialUrl: '/tutorial_videos/nutrition.mp4',
            
            // Assigned Meals data - using exact structure from AssignedMealReports.vue
            searchQuery: "",
            dateFrom: "",
            dateTo: "",
            statusFilter: "",
            
            // Real data from API - members with assigned meal plans
            logs: [],
            loadingLogs: false,
            logsError: null,
            // Inline editing state for logs table
            editingCell: null, // Format: 'rowId-columnKey'
            savingCell: null,
            originalCellValue: null,
            saveTimeout: null,
            activeMealPlanSubTab: 0, // Default to "My Plans" sub-tab
            showCreateTemplateModal: false,
            showAddProductModal: false,
            currentMealKey: "",
            newProductName: "",
            selectedProductCategory: "",
            selectedProduct: null,
            fetchedProducts: [],
            loadingFoods: false,
            foodsError: null,
            // Pagination for foods
            foodsCurrentPage: 1,
            foodsPerPage: 20,
            foodsTotal: 0,
            foodsLastPage: 1,
            foodsLoadingMore: false,
            foodsSearchDebounceTimer: null,
            // Meal Plan Template Filters
            templateSearchQuery: "",
            selectedTemplateCategory: "",
            selectedCalorieRange: "",
            // Meals Tab Data
            allMeals: [],
            filteredMeals: [],
            loadingMeals: false,
            mealsError: null,
            mealsSearchQuery: "",
            selectedFoodType: "",
            availableFoodTypes: [],
            currentPage: 1,
            itemsPerPage: 20,
            sortColumn: "",
            sortDirection: "asc",
            // Pagination for meals
            mealsCurrentPage: 1,
            mealsPerPage: 30, // Increased from 20 to 30 for better UX
            mealsTotal: 0,
            mealsLastPage: 1,
            mealsLoadingMore: false,
            jumpToPageInput: '', // For jump to page functionality
            mealsSearchDebounceTimer: null,
            // New Meal Modal Data
            showNewMealModal: false,
            isEditingMeal: false,
            editingMealId: null,
            showAdvancedNutrition: false,
            newMeal: {
                name: "",
                description: "",
                serving_description: "",
                food_type: "",
                fatsecret_url: "",
                calories: null,
                protein: null,
                carbohydrate: null,
                fat: null,
                fiber: null,
                sugar: null,
                sodium: null,
                cholesterol: null,
                saturated_fat: null,
                trans_fat: null,
                polyunsaturated_fat: null,
                monounsaturated_fat: null,
                vitamin_a: null,
                vitamin_c: null,
                vitamin_d: null,
                calcium: null,
                iron: null,
                potassium: null,
            },
            imagePreview: null,
            selectedImageFile: null, // Store the actual File object for upload
            // Add loading state for nutrition data
            loadingNutrition: false,
            nutritionError: null,
            // Nutrition categories
            nutritionCategories: [],
            loadingCategories: false,
            // Add editing state
            isEditing: false,
            editingTemplateId: null,
            editingTemplateDateCreated: null,
            editingTemplateCreator: null,
            editingTemplateLastModified: null,
            isSubmitting: false,
            isEditingInstructions: false,
            originalInstructions: "",
            showDetailedMealPlan: false,
            // Add enabled macros state
            enabledMacros: {
                carbs: true,
                proteins: true,
                fats: true,
            },
            macroInputMode: 'grams', // 'grams' or 'percentage'
            macroPercentages: {
                protein: null,
                carbs: null,
                fat: null
            },
            newTemplate: {
                name: "",
                description: "This meal plan template is designed to help you achieve your nutrition goals. It includes balanced macronutrients and can be customized based on your specific dietary needs and preferences. Follow the meal plan consistently for best results.",
                category_id: "",
                calories: null,
                protein: null,
                carbs: null,
                fats: null,
                duration: "",
                category: "",
                isActive: true,
                members: 0,
                instructions: "Follow this custom meal plan for 2 weeks",
                meals_time: "",
                meal_image: "",
                targets: {
                    protein: 125,
                    carbs: 225,
                    fat: 67,
                    calories: 2000
                },
                currentIntake: {
                    protein: 118.5,
                    carbs: 213.75,
                    fat: 63.65,
                    calories: 1900,
                    fiber: 35.2,
                    netCarbs: 178.55,
                    sodium: 1500,
                    potassium: 3200
                }
            },
            defaultNutritionImages: [
                'images/nutrition_default/1.jpg',
                'images/nutrition_default/2.jpg',
                'images/nutrition_default/3.jpg',
                'images/nutrition_default/4.jpg',
                'images/nutrition_default/5.jpg',
                'images/nutrition_default/6.jpg',
                'images/nutrition_default/7.jpg',
                'images/nutrition_default/8.jpg',
                'images/nutrition_default/9.jpg',
                'images/nutrition_default/10.jpg'
            ],
            selectedImageIndex: 0, // Track which image is currently displayed
            tabs: [
                {
                    key: "assigned-meals",
                    label: "Assigned Meals",
                    icon: "fas fa-chart-line",
                    description: "View assigned meal reports",
                    badge: 0
                },
                {
                    key: "meal-plans",
                    label: "Meal Plans",
                    icon: "fas fa-clipboard-list",
                    description: "Manage meal plan templates",
                    badge: 0
                },
                {
                    key: "meals",
                    label: "Meals",
                    icon: "fas fa-utensils",
                    description: "Manage individual meals",
                    badge: 0
                },
                {
                    key: "nutrition-editor",
                    label: "Nutrition Editor",
                    icon: "fas fa-edit",
                    description: "Create and edit nutrition content",
                    badge: 0
                },
                {
                    key: "reports",
                    label: "Reports",
                    icon: "fas fa-chart-bar",
                    description: "View nutrition reports and analytics",
                    badge: 0
                },
                {
                    key: "self-assessments",
                    label: "Self-Assessments",
                    icon: "fas fa-chart-pie",
                    description: "View member self-assessments",
                    badge: 0
                },
            ],
            mealPlanSubTabs: [
                {
                    key: "my-plans",
                    label: "My Plans",
                    icon: "fas fa-folder",
                },
                {
                    key: "active-plans",
                    label: "My Active Plans",
                    icon: "fas fa-play-circle",
                },
                {
                    key: "club-plans",
                    label: "Club Plans",
                    icon: "fas fa-users",
                },
            ],
            activePlans: [
                {
                    id: 1,
                    templateName: "Weight Loss (1800 kcal)",
                    activeMembers: 15,
                    duration: "12 weeks",
                    startDate: "2024-01-01",
                    endDate: "2024-03-25",
                    successRate: 85,
                },
                {
                    id: 2,
                    templateName: "Muscle Gain (2500 kcal)",
                    activeMembers: 8,
                    duration: "16 weeks",
                    startDate: "2024-01-15",
                    endDate: "2024-05-05",
                    successRate: 92,
                },
                {
                    id: 3,
                    templateName: "Vegan Endurance",
                    activeMembers: 12,
                    duration: "8 weeks",
                    startDate: "2024-02-01",
                    endDate: "2024-03-28",
                    successRate: 78,
                },
            ],
            clubPlans: [
                {
                    id: 1,
                    name: "Low Carb Day (3 days straight)",
                    type: "General",
                    description:
                        "Perfect for new members starting their fitness journey",
                    usageCount: 45,
                    rating: 4.7,
                    image: "/images/family-friendly-low-carb-meals.jpg",
                    createdBy: "Charles Thornton",
                    lastModified: "04/07/2025",
                },
                {
                    id: 2,
                    name: "Keto Quick Start",
                    type: "Specialized",
                    description:
                        "Comprehensive plan for serious muscle building",
                    usageCount: 23,
                    rating: 4.9,
                    image: "/images/KETO-QUICKSTART3-min.png",
                    createdBy: "Sarah Johnson",
                    lastModified: "03/15/2025",
                },
                {
                    id: 3,
                    name: "Keto Meal Plan",
                    type: "Nutrition",
                    description:
                        "Focused on mobility, strength, and overall wellness",
                    usageCount: 38,
                    rating: 4.8,
                    image: "/images/article-keto-mealplan.jpg",
                    createdBy: "Michael Chen",
                    lastModified: "02/28/2025",
                },
                {
                    id: 4,
                    name: "Breakfast Only",
                    type: "Nutrition",
                    description:
                        "Optimized for competitive athletes and high-intensity training",
                    usageCount: 31,
                    rating: 4.6,
                    image: "/images/Breakfast-only.jpg",
                },
                {
                    id: 5,
                    name: "Core Strength Training",
                    type: "Specialized",
                    description:
                        "Focused core workouts for stability and strength",
                    usageCount: 28,
                    rating: 4.7,
                    image: "/images/Core Crusher.jpg",
                },
                {
                    id: 6,
                    name: "Keto Nutrition Plan",
                    type: "Nutrition",
                    description:
                        "Low-carb, high-fat meal plans for fat burning",
                    usageCount: 19,
                    rating: 4.8,
                    image: "/images/article-keto-mealplan.jpg",
                },
                {
                    id: 7,
                    name: "Low-Carb Meal Prep",
                    type: "Nutrition",
                    description:
                        "Family-friendly low-carb meal preparation guide",
                    usageCount: 34,
                    rating: 4.6,
                    image: "/images/family-friendly-low-carb-meals.jpg",
                },
                {
                    id: 8,
                    name: "Kettlebell Workouts",
                    type: "Strength",
                    description:
                        "Dynamic kettlebell training for full-body fitness",
                    usageCount: 22,
                    rating: 4.9,
                    image: "/images/Kettlebell-swing.webp",
                },
            ],

            // Initialize mealPlanTemplates as empty array - will be populated from API
            mealPlanTemplates: [],

            mealCards: [
                { 
                    key: "breakfast", 
                    label: "Breakfast", 
                    icon: "fas fa-coffee",
                    showDropdown: false,
                    isEditingTitle: false,
                    editTitleValue: ''
                },
                {
                    key: "snacks1",
                    label: "Snacks (Morning)",
                    icon: "fas fa-apple-alt",
                    showDropdown: false,
                    isEditingTitle: false,
                    editTitleValue: ''
                },
                { 
                    key: "lunch", 
                    label: "Lunch", 
                    icon: "fas fa-hamburger",
                    showDropdown: false,
                    isEditingTitle: false,
                    editTitleValue: ''
                },
                {
                    key: "snacks2",
                    label: "Snacks (Afternoon)",
                    icon: "fas fa-ice-cream",
                    showDropdown: false,
                    isEditingTitle: false,
                    editTitleValue: ''
                },
                {
                    key: "dinner",
                    label: "Dinner",
                    icon: "fas fa-drumstick-bite",
                    showDropdown: false,
                    isEditingTitle: false,
                    editTitleValue: ''
                },
                {
                    key: "snacks3",
                    label: "Snacks (Evening)",
                    icon: "fas fa-cookie-bite",
                    showDropdown: false,
                    isEditingTitle: false,
                    editTitleValue: ''
                },
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
            // Editing state for serving fields: { 'mealKey-index-field': true }
            editingServingFields: {},
            // Track fields currently being saved to prevent duplicate requests
            savingFields: {},
            // Add missing properties for food fetching
            addProductMealKey: "",
            multipleProductsText: "",
            showScheduleModal: false,
            scheduleForm: {
                planId: null,
                startDate: "",
                cycleDuration: "",
                endDate: "",
                days: [],
            },
            
            // Recent Messages data
            // recentMessages: [
            //     {
            //         user: "Sharonda Burton",
            //         lastMessage: "Hey Sharonda,",
            //         date: "09/15/2025"
            //     },
            //     {
            //         user: "Nathan Lundy", 
            //         lastMessage: "Hey Nate,",
            //         date: "09/15/2025"
            //     },
            //     {
            //         user: "Donnie Mcvicker",
            //         lastMessage: "Hey Donnie,",
            //         date: "09/15/2025"
            //     },
            //     {
            //         user: "Jerry Mcveigh",
            //         lastMessage: "Hey Jerry,",
            //         date: "09/14/2025"
            //     },
            //     {
            //         user: "Jerome Davis",
            //         lastMessage: "Hey Jerome,",
            //         date: "09/13/2025"
            //     },
            //     {
            //         user: "Theodore Scott",
            //         lastMessage: "Hey Ted,",
            //         date: "09/12/2025"
            //     },
            //     {
            //         user: "CHERYL CHEN",
            //         lastMessage: "Hey Cheryl,",
            //         date: "09/12/2025"
            //     },
            //     {
            //         user: "Loretta Muise",
            //         lastMessage: "Hey Loretta and Pauyl,",
            //         date: "09/12/2025"
            //     },
            //     {
            //         user: "Gena Poe",
            //         lastMessage: "Hey Gena,",
            //         date: "09/06/2025"
            //     },
            //     {
            //         user: "Theresa Johnson",
            //         lastMessage: "Hey Theresa,",
            //         date: "09/02/2025"
            //     }
            // ]
        };
    },
    computed: {
        // Assigned Meals computed properties - using exact structure from AssignedMealReports.vue
        filteredLogs() {
            let filtered = this.logs;

            // Search filter
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(log => 
                    log.member.toLowerCase().includes(query) ||
                    log.date.includes(query) ||
                    (log.mealDeviations && log.mealDeviations.toLowerCase().includes(query)) ||
                    (log.activities && log.activities.toLowerCase().includes(query)) ||
                    (log.notes && log.notes.toLowerCase().includes(query))
                );
            }

            // Date range filter
            if (this.dateFrom) {
                filtered = filtered.filter(log => log.date >= this.dateFrom);
            }
            if (this.dateTo) {
                filtered = filtered.filter(log => log.date <= this.dateTo);
            }

            // Group by member and show only first occurrence of each member
            // Use member_id if available, otherwise use member name as fallback
            const memberMap = new Map();
            const uniqueMemberLogs = [];
            
            // Sort by date descending to get the most recent entry first for each member
            const sortedFiltered = [...filtered].sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA; // Most recent first
            });
            
            for (const log of sortedFiltered) {
                // Use member_id as primary key, fallback to member name
                const memberKey = log.member_id || log.member;
                
                if (!memberMap.has(memberKey)) {
                    // First occurrence of this member - add to results
                    memberMap.set(memberKey, true);
                    uniqueMemberLogs.push(log);
                }
                // Skip subsequent occurrences - they will be shown in MemberReports page
            }
            
            // Sort by date descending for display
            return uniqueMemberLogs.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA; // Most recent first
            });
        },
        totalLogs() {
            return this.filteredLogs.length;
        },
        totalPages() {
            return Math.ceil(this.totalLogs / this.itemsPerPage);
        },
        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage;
        },
        endIndex() {
            return Math.min(this.startIndex + this.itemsPerPage, this.totalLogs);
        },
        paginatedLogs() {
            return this.filteredLogs.slice(this.startIndex, this.endIndex);
        },
        currentUserName() {
            // Get current user from Vuex store
            const user = this.$store?.state?.auth?.user || {};
            const firstname = user.firstname || user.first_name || '';
            const lastname = user.lastname || user.last_name || '';
            const fullName = `${firstname} ${lastname}`.trim();
            return fullName || user.username || user.email || 'User';
        },
        currentUserGymId() {
            // Get current user's gym_id from Vuex store
            const user = this.$store?.state?.auth?.user || {};
            // Try different possible property names for gym_id
            return user.gym_id || user.gymId || user.gym || 1; // Default to 1 if not found
        },
        isSidebarOpen() {
            // Check if sidebar is open by checking Vuex store or DOM
            if (this.$store?.state?.largeSidebar?.sidebarToggleProperties) {
                return this.$store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen;
            }
            // Fallback: check DOM for sidenav-open class
            const mainContent = document.querySelector('.main-content-wrap');
            return mainContent ? mainContent.classList.contains('sidenav-open') : false;
        },

        filteredMealPlanTemplates() {
            let filtered = this.mealPlanTemplates;

            // Search by name or description
            if (this.templateSearchQuery) {
                const query = this.templateSearchQuery.toLowerCase();
                filtered = filtered.filter(
                    (template) =>
                        template.name.toLowerCase().includes(query) ||
                        template.description.toLowerCase().includes(query)
                );
            }

            // Filter by category
            if (this.selectedTemplateCategory) {
                filtered = filtered.filter(
                    (template) =>
                        template.category === this.selectedTemplateCategory
                );
            }

            // Filter by calorie range
            if (this.selectedCalorieRange) {
                const [min, max] = this.selectedCalorieRange
                    .split("-")
                    .map(Number);
                filtered = filtered.filter((template) => {
                    if (max) {
                        return (
                            template.calories >= min && template.calories <= max
                        );
                    } else {
                        return template.calories >= min;
                    }
                });
            }

            return filtered;
        },

        filteredProducts() {
            // Server-side filtering is now handled, so just return fetched products
            return this.fetchedProducts || [];
        },

        // Meals Tab Computed Properties
        filteredAvailableFoodTypes() {
            // Filter out "Fruit Juices", "Fruits", and "food_type" from available food types
            // These are excluded to prevent showing empty results or unwanted options
            return this.availableFoodTypes.filter(
                foodType => 
                    foodType !== "Fruit Juices" && 
                    foodType !== "Fruits" && 
                    foodType !== "food_type" &&
                    foodType.toLowerCase() !== "food_type"
            );
        },
        paginatedMeals() {
            // Since we're using server-side pagination, just return filtered meals
            // The pagination is handled by the API
            return this.filteredMeals;
        },

        totalPages() {
            // Use server-side pagination info
            return this.mealsLastPage || 1;
        },

        visiblePages() {
            const pages = [];
            const total = this.totalPages;
            const current = this.currentPage;

            // Show up to 5 pages around current page
            const start = Math.max(1, current - 2);
            const end = Math.min(total, current + 2);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            return pages;
        },

        activeNavItem() {
            return 'reports';
        }
    },

    watch: {
        // Watch for route changes to handle tab navigation
        '$route'(to, from) {
            this.handleRouteParams();
        },
        
        // Watch for macro input mode changes
        macroInputMode(newMode, oldMode) {
            // When switching to percentage mode, initialize percentages from current grams
            if (newMode === 'percentage' && this.newTemplate.targets) {
                this.macroPercentages.protein = this.getMacroPercentage('protein');
                this.macroPercentages.carbs = this.getMacroPercentage('carbs');
                this.macroPercentages.fat = this.getMacroPercentage('fat');
            }
            // When switching modes, ensure calories are updated
            if (this.newTemplate.targets) {
                this.updateTargetCalories();
            }
        },
        
        // Watch for changes in target macros and update calories automatically
        'newTemplate.targets.protein'() {
            this.updateTargetCalories();
        },
        'newTemplate.targets.carbs'() {
            this.updateTargetCalories();
        },
        'newTemplate.targets.fat'() {
            this.updateTargetCalories();
        },
        
        // Prevent body scrolling when Create Meal Plan modal is open
        showCreateTemplateModal(newVal) {
            if (newVal) {
                // Prevent body scroll when modal opens
                document.body.style.overflow = 'hidden';
                // Also prevent scroll on html element for better browser compatibility
                document.documentElement.style.overflow = 'hidden';
            } else {
                // Restore body scroll when modal closes
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }
        }
    },

    // Add mounted lifecycle hook to fetch nutrition data
    async mounted() {
        // Add click outside listener for dropdowns
        document.addEventListener('click', this.handleClickOutside);
        
        // Parallelize all independent API calls for optimal performance
        // This reduces total load time from ~1000ms (sequential) to ~200ms (parallel)
        try {
            await Promise.all([
                this.fetchNutritionData(),
                this.fetchNutritionCategories(),
                this.fetchMeals(),
                this.fetchFoodTypes(),
                this.fetchAssignedMealsLogs() // Fetch assigned meals logs
            ]);
        } catch (error) {
            // Individual methods handle their own errors
        }
        
        // Handle route parameters for tab navigation
        this.handleRouteParams();
        
        // Set default URL parameter if no tab is specified
        if (!this.$route.query.tab) {
            this.$router.push({ 
                path: this.$route.path, 
                query: { ...this.$route.query, tab: 'assigned-meals' } 
            }).catch(() => {});
        }
    },
    
    beforeDestroy() {
        // Restore body scroll when component is destroyed
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        // Remove click outside listener
        document.removeEventListener('click', this.handleClickOutside);
    },

    methods: {
        getImageUrl(imagePath) {
            if (!imagePath) return '';
            // Handle both paths with and without leading slash
            return imagePath.startsWith('/') ? imagePath : '/' + imagePath;
        },
        navigateImage(direction) {
            // Navigate through images
            const newIndex = this.selectedImageIndex + direction;
            
            // Wrap around: if going left from first image, go to last; if going right from last, go to first
            if (newIndex < 0) {
                this.selectedImageIndex = this.defaultNutritionImages.length - 1;
            } else if (newIndex >= this.defaultNutritionImages.length) {
                this.selectedImageIndex = 0;
            } else {
                this.selectedImageIndex = newIndex;
            }
            
            // Update the meal_image to match the currently displayed image
            this.newTemplate.meal_image = this.defaultNutritionImages[this.selectedImageIndex];
        },
        // Calculate total calories from macros
        calculateTotalCalories() {
            const protein = this.newTemplate.targets.protein || 0;
            const carbs = this.newTemplate.targets.carbs || 0;
            const fat = this.newTemplate.targets.fat || 0;
            const totalCalories = (protein * 4) + (carbs * 4) + (fat * 9);
            
            return Math.round(totalCalories);
        },
        
        // Update target calories when macros change
        updateTargetCalories() {
            if (this.newTemplate.targets) {
                this.newTemplate.targets.calories = this.calculateTotalCalories();
            }
        },
        
        // Calculate calories for template display
        calculateTemplateCalories(template) {
            const protein = template.target_protein || (template.targets && template.targets.protein) || 125;
            const carbs = template.target_carbs || (template.targets && template.targets.carbs) || 225;
            const fat = template.target_fat || (template.targets && template.targets.fat) || 67;
            
            // Protein: 4 calories per gram
            // Carbs: 4 calories per gram  
            // Fat: 9 calories per gram
            const totalCalories = (protein * 4) + (carbs * 4) + (fat * 9);
            
            return Math.round(totalCalories);
        },
        
        // Assigned Meals methods
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        },

        // Assigned Meals methods - using exact structure from AssignedMealReports.vue
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        exportData() {
            // Implement export functionality
        },
        refreshData() {
            // Refresh assigned meals logs
            this.fetchAssignedMealsLogs();
        },
        
        // Fetch assigned meals logs from API
        async fetchAssignedMealsLogs() {
            this.loadingLogs = true;
            this.logsError = null;
            
            try {
                const params = {
                    per_page: 50, // Reduced from 1000 - use server-side pagination for better performance
                    page: this.currentPage || 1,
                };
                
                // Default to last 30 days if no date filter provided (optimizes initial load)
                if (!this.dateFrom && !this.dateTo) {
                    const today = new Date();
                    const thirtyDaysAgo = new Date(today);
                    thirtyDaysAgo.setDate(today.getDate() - 30);
                    params.date_from = thirtyDaysAgo.toISOString().split('T')[0];
                    params.date_to = today.toISOString().split('T')[0];
                } else {
                    // Add date filters if provided
                    if (this.dateFrom) {
                        params.date_from = this.dateFrom;
                    }
                    if (this.dateTo) {
                        params.date_to = this.dateTo;
                    }
                }
                
                // Add search query if provided
                if (this.searchQuery) {
                    params.search = this.searchQuery;
                }
                
                const response = await axios.get('/assigned-meals-members', { params });
                
                if (response.data.success) {
                    // Transform API data to match expected format
                    // member_id matches the id in the members table (enforced by foreign key)
                    // Normalize data types for proper editing
                    this.logs = response.data.data.map(log => ({
                        id: log.id,
                        member: log.member,
                        member_id: log.member_id, // This ID matches members.id from members table
                        date: log.date,
                        weight: log.weight !== null && log.weight !== undefined ? parseFloat(log.weight) : null,
                        bodyFat: log.bodyFat !== null && log.bodyFat !== undefined ? parseFloat(log.bodyFat) : null,
                        waterIntake: log.waterIntake !== null && log.waterIntake !== undefined ? parseFloat(log.waterIntake) : null,
                        hunger: log.hunger !== null && log.hunger !== undefined ? parseInt(log.hunger) : null,
                        strength: log.strength !== null && log.strength !== undefined ? parseInt(log.strength) : null,
                        energy: log.energy !== null && log.energy !== undefined ? parseInt(log.energy) : null,
                        feel: log.feel || null,
                        cardio: log.cardio || null,
                        plan: log.plan || null,
                        calories: log.calories !== null && log.calories !== undefined ? parseInt(log.calories) : null,
                        protein: log.protein !== null && log.protein !== undefined ? parseFloat(log.protein) : null,
                        carbs: log.carbs !== null && log.carbs !== undefined ? parseFloat(log.carbs) : null,
                        fat: log.fat !== null && log.fat !== undefined ? parseFloat(log.fat) : null,
                        mealDeviations: log.mealDeviations || null,
                        activities: log.activities || null,
                        notes: log.notes || null
                    }));
                    
                    // Update pagination metadata if provided by backend
                    if (response.data.meta) {
                        this.currentPage = response.data.meta.current_page || 1;
                        this.itemsPerPage = response.data.meta.per_page || 50;
                        // Note: totalLogs should be updated if backend provides total count
                        // this.totalLogs = response.data.meta.total || this.logs.length;
                    } else {
                        // Reset to first page after loading new data if no pagination metadata
                        this.currentPage = 1;
                    }
                } else {
                    this.logsError = response.data.message || 'Failed to fetch assigned meals logs';
                    this.logs = [];
                }
            } catch (error) {
                this.logsError = error.response?.data?.message || 'Failed to fetch assigned meals logs';
                this.logs = [];
            } finally {
                this.loadingLogs = false;
            }
        },

        // Inline editing methods for logs table
        isEditingCell(rowId, columnKey) {
            return this.editingCell === `${rowId}-${columnKey}`;
        },
        isSavingCell(rowId, columnKey) {
            return this.savingCell === `${rowId}-${columnKey}`;
        },
        startEditCell(log, columnKey) {
            if (!log.id || !columnKey) return;
            
            const cellKey = `${log.id}-${columnKey}`;
            this.editingCell = cellKey;
            this.originalCellValue = log[columnKey] !== null && log[columnKey] !== undefined ? log[columnKey] : null;
            
            // Focus input after Vue updates DOM
            this.$nextTick(() => {
                const input = this.$el.querySelector(`input[ref="cellInput"]`);
                if (input) {
                    input.focus();
                    input.select();
                }
            });
        },
        cancelEditCell(log, columnKey) {
            if (this.originalCellValue !== null) {
                log[columnKey] = this.originalCellValue;
            }
            this.editingCell = null;
            this.originalCellValue = null;
        },
        async saveCell(log, columnKey) {
            if (!log.id) {
                return;
            }
            
            if (!columnKey) {
                return;
            }
            
            // Get the current value and normalize it
            let newValue = log[columnKey];
            
            // Convert empty string to null for consistency
            if (newValue === '' || newValue === undefined) {
                newValue = null;
            }
            
            // Convert numeric strings to numbers for numeric fields
            const numericFields = ['weight', 'bodyFat', 'waterIntake', 'hunger', 'strength', 'energy', 
                                 'calories', 'protein', 'carbs', 'fat'];
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
            
            const cellKey = `${log.id}-${columnKey}`;
            this.savingCell = cellKey;
            
            // Clear any existing timeout
            if (this.saveTimeout) {
                clearTimeout(this.saveTimeout);
            }
            
            try {
                // Prepare update data with only the changed field
                const updateData = {};
                
                // Map frontend field names to backend field names
                // For logs table, we use the same field names as MemberReports
                updateData[columnKey] = newValue;
                
                const response = await axios.put(`/assigned-meals-members/${log.id}`, updateData);
                
                if (response.data.success) {
                    // Update local data with response to ensure consistency
                    const updatedData = response.data.data;
                    
                    // Map backend response back to frontend format
                    if (updatedData) {
                        // First, directly update the field that was changed
                        // Map backend field names to frontend field names
                        if (columnKey === 'bodyFat') {
                            this.$set(log, 'bodyFat', updatedData.body !== undefined && updatedData.body !== null ? parseFloat(updatedData.body) : newValue);
                        } else if (columnKey === 'waterIntake') {
                            this.$set(log, 'waterIntake', updatedData.water !== undefined && updatedData.water !== null ? parseFloat(updatedData.water) : newValue);
                        } else if (columnKey === 'carbs') {
                            this.$set(log, 'carbs', updatedData.carbs !== undefined && updatedData.carbs !== null ? parseFloat(updatedData.carbs) : newValue);
                        } else if (columnKey === 'fat') {
                            this.$set(log, 'fat', updatedData.fat_macros !== undefined && updatedData.fat_macros !== null ? parseFloat(updatedData.fat_macros) : newValue);
                        } else if (updatedData[columnKey] !== undefined) {
                            // Direct field mapping for fields that match
                            const value = updatedData[columnKey];
                            if (['weight', 'protein'].includes(columnKey)) {
                                this.$set(log, columnKey, value !== null ? parseFloat(value) : null);
                            } else if (['hunger', 'strength', 'energy', 'calories'].includes(columnKey)) {
                                this.$set(log, columnKey, value !== null ? parseInt(value) : null);
                            } else {
                                this.$set(log, columnKey, value);
                            }
                        } else {
                            // Fallback: use the normalized value we just set
                            this.$set(log, columnKey, newValue);
                        }
                        
                        // Also update all other mapped fields to ensure full consistency
                        if (updatedData.body !== undefined) {
                            this.$set(log, 'bodyFat', updatedData.body !== null ? parseFloat(updatedData.body) : null);
                        }
                        if (updatedData.water !== undefined) {
                            this.$set(log, 'waterIntake', updatedData.water !== null ? parseFloat(updatedData.water) : null);
                        }
                        if (updatedData.carbs !== undefined) {
                            this.$set(log, 'carbs', updatedData.carbs !== null ? parseFloat(updatedData.carbs) : null);
                        }
                        if (updatedData.fat_macros !== undefined) {
                            this.$set(log, 'fat', updatedData.fat_macros !== null ? parseFloat(updatedData.fat_macros) : null);
                        }
                        if (updatedData.weight !== undefined) {
                            this.$set(log, 'weight', updatedData.weight !== null ? parseFloat(updatedData.weight) : null);
                        }
                        if (updatedData.hunger !== undefined) {
                            this.$set(log, 'hunger', updatedData.hunger !== null ? parseInt(updatedData.hunger) : null);
                        }
                        if (updatedData.strength !== undefined) {
                            this.$set(log, 'strength', updatedData.strength !== null ? parseInt(updatedData.strength) : null);
                        }
                        if (updatedData.energy !== undefined) {
                            this.$set(log, 'energy', updatedData.energy !== null ? parseInt(updatedData.energy) : null);
                        }
                        if (updatedData.cardio !== undefined) {
                            this.$set(log, 'cardio', updatedData.cardio);
                        }
                        if (updatedData.plan !== undefined) {
                            this.$set(log, 'plan', updatedData.plan);
                        }
                        if (updatedData.calories !== undefined) {
                            this.$set(log, 'calories', updatedData.calories !== null ? parseInt(updatedData.calories) : null);
                        }
                        if (updatedData.protein !== undefined) {
                            this.$set(log, 'protein', updatedData.protein !== null ? parseFloat(updatedData.protein) : null);
                        }
                        if (updatedData.meal_deviations !== undefined) {
                            this.$set(log, 'mealDeviations', updatedData.meal_deviations);
                        }
                        if (updatedData.activities !== undefined) {
                            this.$set(log, 'activities', updatedData.activities);
                        }
                        if (updatedData.feel !== undefined) {
                            this.$set(log, 'feel', updatedData.feel);
                        }
                        if (updatedData.notes !== undefined) {
                            this.$set(log, 'notes', updatedData.notes);
                        }
                    } else {
                        // Fallback: use the normalized value we just set
                        this.$set(log, columnKey, newValue);
                    }
                    
                    this.editingCell = null;
                    this.originalCellValue = null;
                } else {
                    throw new Error(response.data.message || 'Failed to update cell');
                }
            } catch (error) {
                
                // Restore original value on error
                log[columnKey] = this.originalCellValue;
                
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
            
            const numericFields = ['weight', 'bodyFat', 'waterIntake', 'calories', 'protein', 'carbs', 'fat'];
            if (numericFields.includes(columnKey)) {
                return parseFloat(value).toFixed(1);
            }
            
            return value;
        },

        // Navigation methods
        navigateToMembers() {
            this.$router.push({ name: 'ViewAllMembers' });
        },
        
        navigateToNutritionMembers() {
            this.$router.push({ name: 'NutritionMembers' });
        },
        
        navigateToCoaches() {
            this.$router.push({ name: 'CoachList' });
        },
        
        viewUserProfile(log) {
            // Navigate to self-assessments page (MemberReports) for the specific member
            // Use member_id if available, otherwise fall back to member name
            const memberId = log.member_id || log.member;
            this.$router.push({ 
                name: 'SelfAssessments',
                params: { memberId: memberId }
            }).catch(err => {
                // Ignore navigation errors (e.g., same route)
            });
        },
        
        viewUserProfileWithDate(log) {
            // Navigate to Compare Photos page for the specific member with date parameter
            // Use member_id if available, otherwise fall back to member name
            const memberId = log.member_id || log.member;
            this.$router.push({ 
                name: 'ComparePhotos',
                query: { 
                    memberId: memberId,
                    date: log.date 
                }
            }).catch(err => {
            });
        },
        
        viewTemplateDetails(templateId) {
            // Open edit mode for the template
            this.editTemplate(templateId);
        },
        
        // Meal Plan Targets Methods
        getProgressPercentage(macro) {
            if (!this.newTemplate.targets || !this.newTemplate.currentIntake) {
                return 0;
            }
            const target = this.newTemplate.targets[macro] || 0;
            const current = this.newTemplate.currentIntake[macro] || 0;
            return Math.min((current / target) * 100, 100);
        },
        
        getMacroPercentage(macro) {
            const targets = this.newTemplate.targets || {};
            const protein = Number(targets.protein) || 0;
            const carbs = Number(targets.carbs) || 0;
            const fat = Number(targets.fat) || 0;

            const totalCalories = protein * 4 + carbs * 4 + fat * 9;
            if (!totalCalories) {
                return 0;
            }

            const macroCaloriesMap = {
                protein: protein * 4,
                carbs: carbs * 4,
                fat: fat * 9,
            };

            const macroCalories = macroCaloriesMap[macro] || 0;
            return Math.round((macroCalories / totalCalories) * 100);
        },

        updateMacroFromPercentage(macro, percentValue) {
            const percent = parseFloat(percentValue) || 0;
            
            // Store the exact percentage value the user typed
            this.$set(this.macroPercentages, macro, percent);
            
            const totalCalories = this.calculateTotalCalories();
            
            if (totalCalories === 0) return;

            let caloriesForMacro = (totalCalories * percent) / 100;
            
            // Convert calories to grams (Protein/Carbs = 4, Fat = 9)
            let factor = (macro === 'fat') ? 9 : 4;
            let grams = caloriesForMacro / factor;
            
            // Round to 1 decimal
            if (!this.newTemplate.targets) this.newTemplate.targets = {};
            this.$set(this.newTemplate.targets, macro, Math.round(grams * 10) / 10);
        },
        
        // Get the display percentage value - use stored value if available, otherwise calculate
        getDisplayPercentage(macro) {
            if (this.macroInputMode === 'percentage' && this.macroPercentages[macro] !== null) {
                return this.macroPercentages[macro];
            }
            return this.getMacroPercentage(macro);
        },

        // Determine food unit (gm or ml) based on food type or name
        determineFoodUnit(product) {
            if (!product) return 'gm'; // Default to grams
            
            const foodType = (product.food_type || '').toLowerCase();
            const foodName = (product.name || '').toLowerCase();
            const description = (product.description || '').toLowerCase();
            
            // Check for liquid indicators
            const liquidKeywords = ['drink', 'beverage', 'juice', 'milk', 'water', 'soda', 'tea', 'coffee', 'smoothie', 'shake', 'liquid', 'ml', 'liter', 'litre', 'fluid', 'oz', 'ounce'];
            const hasLiquidKeyword = liquidKeywords.some(keyword => 
                foodType.includes(keyword) || 
                foodName.includes(keyword) || 
                description.includes(keyword)
            );
            
            // Check for ml/liter in serving description
            const servingDesc = (product.serving_description || '').toLowerCase();
            const hasMlIndicator = servingDesc.includes('ml') || servingDesc.includes('liter') || servingDesc.includes('litre') || servingDesc.includes('l');
            
            // Return 'ml' if liquid indicators found, otherwise 'gm'
            return (hasLiquidKeyword || hasMlIndicator) ? 'ml' : 'gm';
        },
        
        updateTotalCalories(newTotal) {
            const total = parseFloat(newTotal) || 0;
            if (total <= 0) return;

            const currentTotal = this.calculateTotalCalories();
            
            if (!this.newTemplate.targets) this.newTemplate.targets = {};

            // If in percentage mode and we have stored percentages, recalculate from percentages
            if (this.macroInputMode === 'percentage' && 
                (this.macroPercentages.protein !== null || 
                 this.macroPercentages.carbs !== null || 
                 this.macroPercentages.fat !== null)) {
                
                // Recalculate grams from stored percentages
                ['protein', 'carbs', 'fat'].forEach(macro => {
                    const percent = this.macroPercentages[macro] || 0;
                    const caloriesForMacro = (total * percent) / 100;
                    const factor = (macro === 'fat') ? 9 : 4;
                    const grams = caloriesForMacro / factor;
                    this.$set(this.newTemplate.targets, macro, Math.round(grams * 10) / 10);
                });
                return;
            }

            if (currentTotal === 0) {
                // Fallback: 30/50/20 split if starting from 0
                this.$set(this.newTemplate.targets, 'protein', Math.round((total * 0.3) / 4 * 10) / 10);
                this.$set(this.newTemplate.targets, 'carbs', Math.round((total * 0.5) / 4 * 10) / 10);
                this.$set(this.newTemplate.targets, 'fat', Math.round((total * 0.2) / 9 * 10) / 10);
                return;
            }

            const ratio = total / currentTotal;
            
            this.$set(this.newTemplate.targets, 'protein', Math.round((this.newTemplate.targets.protein || 0) * ratio * 10) / 10);
            this.$set(this.newTemplate.targets, 'carbs', Math.round((this.newTemplate.targets.carbs || 0) * ratio * 10) / 10);
            this.$set(this.newTemplate.targets, 'fat', Math.round((this.newTemplate.targets.fat || 0) * ratio * 10) / 10);
        },
        
        getVisualBarWidth(macro) {
            if (!this.newTemplate.targets || !this.newTemplate.currentIntake) {
                return 0;
            }
            const total = (this.newTemplate.targets.protein || 0) + (this.newTemplate.targets.carbs || 0) + (this.newTemplate.targets.fat || 0);
            const current = this.newTemplate.currentIntake[macro] || 0;
            return total > 0 ? (current / total) * 100 : 0;
        },
        
        getCurrentTotalCalories() {
            if (!this.newTemplate.currentIntake) {
                return '0.00';
            }
            const protein = this.newTemplate.currentIntake.protein || 0;
            const carbs = this.newTemplate.currentIntake.carbs || 0;
            const fat = this.newTemplate.currentIntake.fat || 0;
            // Protein: 4 calories per gram, Carbs: 4 calories per gram, Fat: 9 calories per gram
            const totalCalories = (protein * 4) + (carbs * 4) + (fat * 9);
            return totalCalories.toFixed(2);
        },
        
        calculateCurrentIntake() {
            // Initialize totals
            let totalProtein = 0;
            let totalCarbs = 0;
            let totalFat = 0;
            let totalCalories = 0;
            let totalFiber = 0;
            let totalNetCarbs = 0;
            let totalSodium = 0;
            let totalPotassium = 0;

            // Iterate through all meals
            Object.keys(this.mealProducts).forEach((mealKey) => {
                if (this.mealProducts[mealKey] && Array.isArray(this.mealProducts[mealKey])) {
                    this.mealProducts[mealKey].forEach((product) => {
                        const quantity = parseFloat(product.quantity) || 1;
                        
                        // Calculate values based on quantity
                        const protein = (parseFloat(product.protein) || 0) * quantity;
                        const carbs = (parseFloat(product.carbohydrate || product.carbs) || 0) * quantity;
                        const fat = (parseFloat(product.fat || product.fats) || 0) * quantity;
                        const calories = (parseFloat(product.calories) || 0) * quantity;
                        const fiber = (parseFloat(product.fiber) || 0) * quantity;
                        const sodium = (parseFloat(product.sodium) || 0) * quantity;
                        const potassium = (parseFloat(product.potassium) || 0) * quantity;

                        // Add to totals
                        totalProtein += protein;
                        totalCarbs += carbs;
                        totalFat += fat;
                        totalCalories += calories;
                        totalFiber += fiber;
                        totalSodium += sodium;
                        totalPotassium += potassium;
                    });
                }
            });

            // Calculate net carbs
            totalNetCarbs = totalCarbs - totalFiber;

            // Update currentIntake in newTemplate
            if (!this.newTemplate.currentIntake) {
                this.$set(this.newTemplate, 'currentIntake', {});
            }
            
            this.$set(this.newTemplate.currentIntake, 'protein', Math.round(totalProtein * 100) / 100);
            this.$set(this.newTemplate.currentIntake, 'carbs', Math.round(totalCarbs * 100) / 100);
            this.$set(this.newTemplate.currentIntake, 'fat', Math.round(totalFat * 100) / 100);
            this.$set(this.newTemplate.currentIntake, 'calories', Math.round(totalCalories * 100) / 100);
            this.$set(this.newTemplate.currentIntake, 'fiber', Math.round(totalFiber * 100) / 100);
            this.$set(this.newTemplate.currentIntake, 'netCarbs', Math.round(totalNetCarbs * 100) / 100);
            this.$set(this.newTemplate.currentIntake, 'sodium', Math.round(totalSodium * 100) / 100);
            this.$set(this.newTemplate.currentIntake, 'potassium', Math.round(totalPotassium * 100) / 100);
        },
        
        editTargets() {
            // Scroll to the Target Macros section input fields
            
            this.$nextTick(() => {
                // Find the Target Macros section
                const targetMacrosSection = document.querySelector('.target-macros-section');
                if (targetMacrosSection) {
                    // Scroll to the section with smooth behavior
                    targetMacrosSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    
                    // Optional: Focus on the first input field (Protein)
                    setTimeout(() => {
                        const proteinInput = document.getElementById('targetProtein');
                        if (proteinInput) {
                            proteinInput.focus();
                        }
                    }, 500); // Small delay to allow scroll to complete
                } else {
                }
            });
        },

        // Meal dropdown functionality
        moveMealUp(mealIndex) {
            this.closeAllDropdowns();
            if (mealIndex > 0) {
                // Swap with previous meal
                const temp = this.mealCards[mealIndex];
                this.mealCards[mealIndex] = this.mealCards[mealIndex - 1];
                this.mealCards[mealIndex - 1] = temp;
                this.showSuccessMessage('Meal moved up successfully');
            } else {
                this.showErrorMessage('Cannot move up - already at top');
            }
        },

        moveMealDown(mealIndex) {
            this.closeAllDropdowns();
            if (mealIndex < this.mealCards.length - 1) {
                // Swap with next meal
                const temp = this.mealCards[mealIndex];
                this.mealCards[mealIndex] = this.mealCards[mealIndex + 1];
                this.mealCards[mealIndex + 1] = temp;
                this.showSuccessMessage('Meal moved down successfully');
            } else {
                this.showErrorMessage('Cannot move down - already at bottom');
            }
        },

        createAlternateMeal(mealIndex) {
            this.closeAllDropdowns();
            const meal = this.mealCards[mealIndex];
            // Create a copy of the meal with "Alternate" suffix
            const alternateMeal = {
                ...meal,
                key: meal.key + '_alt_' + Date.now(),
                label: meal.label + ' (Alternate)',
                isAlternate: true,
                showDropdown: false,
                isEditingTitle: false,
                editTitleValue: '',
                products: [...(meal.products || [])], // Copy products array
                icon: meal.icon || 'fas fa-utensils', // Ensure icon is set
                originalMealKey: meal.key // Keep reference to original meal
            };
            this.mealCards.splice(mealIndex + 1, 0, alternateMeal);
            this.showSuccessMessage('Alternate meal created successfully');
        },

        duplicateAsNew(mealIndex) {
            this.closeAllDropdowns();
            const meal = this.mealCards[mealIndex];
            
            // Count existing duplicate meals to generate proper numbering
            const duplicateCount = this.mealCards.filter(m => 
                m.label.includes('Duplicate Meal #') || m.label.includes('(Copy)')
            ).length;
            
            const duplicateNumber = duplicateCount + 1;
            const newMeal = {
                ...meal,
                key: meal.key + '_duplicate_' + Date.now(),
                label: `Duplicate Meal #${duplicateNumber}`,
                products: [...(meal.products || [])],
                showDropdown: false,
                isEditingTitle: false,
                editTitleValue: '',
                isAlternate: false, // Ensure it's not marked as alternate
                originalMealKey: meal.key // Keep reference to original meal
            };
            
            // Always add at the end of the array
            this.mealCards.push(newMeal);
            this.showSuccessMessage(`Meal duplicated as new successfully - ${newMeal.label}`);
        },

        duplicateAsAlternate(mealIndex) {
            this.closeAllDropdowns();
            const meal = this.mealCards[mealIndex];
            
            // Count existing alternate meals to generate proper numbering
            const alternateCount = this.mealCards.filter(m => 
                m.isAlternate && (m.label.includes('Alternate') || m.label.includes('ALT'))
            ).length;
            
            const alternateNumber = alternateCount + 1;
            const alternateMeal = {
                ...meal,
                key: meal.key + '_alternate_' + Date.now(),
                label: `Alternate Meal #${alternateNumber}`,
                isAlternate: true,
                products: [...(meal.products || [])],
                showDropdown: false,
                isEditingTitle: false,
                editTitleValue: '',
                originalMealKey: meal.key // Keep reference to original meal
            };
            
            // Always add at the end of the array
            this.mealCards.push(alternateMeal);
            this.showSuccessMessage(`Meal duplicated as alternate successfully - ${alternateMeal.label}`);
        },

        deleteMeal(mealIndex) {
            this.closeAllDropdowns();
            
            const meal = this.mealCards[mealIndex];
            const mealName = meal.label;
            const productCount = meal.products ? meal.products.length : 0;
            
            // Additional safety check - prevent deletion if it's the last meal
            if (this.mealCards.length <= 1) {
                this.makeToast("warning", "Cannot delete the last remaining meal. Please add another meal first.", "Warning");
                return;
            }
            
            // If SweetAlert is not available, fall back to browser confirm
            if (typeof this.$swal === "undefined") {
                const confirmMessage = `Are you sure you want to delete "${mealName}"?\n\n` +
                    `This meal contains ${productCount} product(s) and this action cannot be undone.\n\n` +
                    `Click OK to delete or Cancel to keep the meal.`;
                
                if (confirm(confirmMessage)) {
                    // Remove the meal from the array
                    this.mealCards.splice(mealIndex, 1);
                    
                    // Show success toast
                    this.makeToast("success", `Meal "${mealName}" deleted successfully`, "Success");
                }
                return;
            }
            
            // SweetAlert confirmation flow
            this.$swal({
                title: "Delete Meal",
                text: `Are you sure you want to delete "${mealName}"?\n\nThis meal contains ${productCount} product(s) and this action cannot be undone.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel",
            }).then((result) => {
                // Support both SweetAlert2 v8 (result.value) and v11+ (result.isConfirmed)
                if (!result || (!result.value && !result.isConfirmed)) {
                    return;
                }
                
                // Remove the meal from the array
                this.mealCards.splice(mealIndex, 1);
                
                // Show success toast notification
                this.makeToast("success", `Meal "${mealName}" deleted successfully`, "Success");
            });
        },

        // Meal title editing functionality
        startEditingMealTitle(mealIndex) {
            const meal = this.mealCards[mealIndex];
            meal.isEditingTitle = true;
            meal.editTitleValue = meal.label; // Store original value
            
            this.$nextTick(() => {
                // Focus on the input field using unique ref
                const inputRef = 'mealTitleInput' + mealIndex;
                const inputId = 'mealTitleInput' + mealIndex;
                
                // Try refs first
                let input = this.$refs[inputRef];
                
                // If refs don't work, try getElementById
                if (!input || typeof input.focus !== 'function') {
                    input = document.getElementById(inputId);
                }
                
                if (input && typeof input.focus === 'function') {
                    input.focus();
                    input.select();
                } else {
                }
            });
        },

        saveMealTitle(mealIndex) {
            const meal = this.mealCards[mealIndex];
            const newTitle = meal.editTitleValue.trim();
            
            if (newTitle && newTitle !== meal.label) {
                meal.label = newTitle;
                this.showSuccessMessage(`Meal title updated to "${newTitle}"`);
            }
            
            meal.isEditingTitle = false;
            meal.editTitleValue = '';
        },

        cancelEditingMealTitle(mealIndex) {
            const meal = this.mealCards[mealIndex];
            meal.isEditingTitle = false;
            meal.editTitleValue = '';
        },

        // Handle meal dropdown click
        handleMealDropdownClick(mealIndex) {
            this.toggleMealDropdown(mealIndex);
        },

        // Meal card dropdown functionality
        toggleMealDropdown(mealIndex) {
            // Close all other dropdowns
            this.mealCards.forEach((meal, index) => {
                if (index !== mealIndex) {
                    meal.showDropdown = false;
                }
            });
            
            // Toggle current dropdown
            const meal = this.mealCards[mealIndex];
            if (meal) {
                meal.showDropdown = !meal.showDropdown;
            }
        },

        closeAllDropdowns() {
            this.mealCards.forEach(meal => {
                meal.showDropdown = false;
            });
        },

        // Close dropdowns when clicking outside
        handleClickOutside(event) {
            // Check if click is outside any dropdown
            if (!event.target.closest('.dropdown')) {
                this.closeAllDropdowns();
            }
        },

        toggleInstructionsEdit() {
            if (!this.isEditingInstructions) {
                // Start editing - save original value
                this.originalInstructions = this.newTemplate.instructions;
                this.isEditingInstructions = true;
            }
        },

        saveInstructions() {
            // Save the instructions and exit edit mode
            this.isEditingInstructions = false;
            this.originalInstructions = "";
        },

        cancelInstructionsEdit() {
            // Cancel editing - restore original value
            this.newTemplate.instructions = this.originalInstructions;
            this.isEditingInstructions = false;
            this.originalInstructions = "";
        },

        autoResizeDescriptionTextarea() {
            this.$nextTick(() => {
                const textarea = this.$refs.descriptionTextarea;
                if (textarea) {
                    // Reset height to auto to get the correct scrollHeight
                    textarea.style.height = 'auto';
                    // Set height based on content, with min height of 2 rows (approximately 60px) and max of 200px
                    const minHeight = 60; // Minimum height for 2 rows
                    const maxHeight = 200; // Maximum height before scrolling
                    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
                    textarea.style.height = newHeight + 'px';
                }
            });
        },

        openDetailedMealPlan() {
            this.showDetailedMealPlan = true;
        },

        closeDetailedMealPlan() {
            this.showDetailedMealPlan = false;
        },


        handleFormSubmit() {
            this.saveTemplate();
        },
        
        navigateToAssignedMeals() {
            // Navigate to the Assigned Meal Reports tab
            this.activeTab = 0; // Assigned Meal Reports tab index
            // Update URL with tab parameter
            this.$router.push({ 
                path: this.$route.path, 
                query: { ...this.$route.query, tab: 'assigned-meals' } 
            }).catch(err => {
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        
        navigateToMealPlans() {
            this.activeTab = 1;
            this.$router.push({ 
                path: this.$route.path, 
                query: { ...this.$route.query, tab: 'meal-plans' } 
            }).catch(err => {
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        
        navigateToReports() {
            // Navigate to the Reports tab within the current Nutrition page
            this.activeTab = 4; // Reports tab index (assigned-meals=0, meal-plans=1, meals=2, nutrition-editor=3, reports=4)
            // Update URL with tab parameter
            this.$router.push({ 
                path: this.$route.path, 
                query: { ...this.$route.query, tab: 'reports' } 
            }).catch(err => {
                // Ignore navigation errors (e.g., same route)
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        navigateToNutritionEditor() {
            // Navigate to the Nutrition Editor tab within the current Nutrition page
            this.activeTab = 3; // Nutrition Editor tab index (assigned-meals=0, meal-plans=1, meals=2, nutrition-editor=3, reports=4)
            // Update URL with tab parameter
            this.$router.push({ 
                path: this.$route.path, 
                query: { ...this.$route.query, tab: 'nutrition-editor' } 
            }).catch(err => {
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        navigateToSelfAssessments() {
            // Navigate to the Self-Assessments page
            this.$router.push({ 
                path: '/app/nutrition/self-assessments'
            }).catch(err => {
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        navigateToMeals() {
            this.activeTab = 2; // Meals tab index (after assigned-meals and meal-plans)
            // Update URL with tab parameter
            this.$router.push({ 
                path: this.$route.path, 
                query: { ...this.$route.query, tab: 'meals' } 
            }).catch(err => {
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        goBack() {
            // Always go to dashboard
            this.$router.push({ name: 'dashboard' });
        },

        // Video tutorial method
        openVideoTutorialModal() {
            this.isVideoLoading = true;
            this.videoError = null;
            this.showVideoTutorialModal = true;
            // Reset video loading state after modal is shown
            this.$nextTick(() => {
                // Video element will trigger load events
            });
        },

        closeVideoTutorialModal() {
            this.showVideoTutorialModal = false;
            this.isVideoLoading = false;
            this.videoError = null;
        },

        onVideoLoadStart() {
            // Video started loading
            this.isVideoLoading = true;
        },

        onVideoCanPlay() {
            // Video can start playing
            this.isVideoLoading = false;
            this.videoError = null;
        },

        onVideoLoaded() {
            // Video metadata and data loaded
            this.isVideoLoading = false;
            this.videoError = null;
        },

        handleVideoError(event) {
            this.isVideoLoading = false;
            this.videoError = 'Failed to load video. Please check if the file exists at: ' + this.videoTutorialUrl;
            console.error('Video error:', event);
            console.error('Video URL:', this.videoTutorialUrl);
        },
        
        handleRouteParams() {
            // Handle route parameters for tab navigation
            const tab = this.$route.query.tab;
            if (tab) {
                switch (tab) {
                    case 'assigned-meals':
                        this.activeTab = 0;
                        break;
                    case 'meal-plans':
                        this.activeTab = 1;
                        break;
                    case 'meals':
                        this.activeTab = 2;
                        break;
                    case 'nutrition-editor':
                        this.activeTab = 3;
                        break;
                    case 'reports':
                        this.activeTab = 4;
                        break;
                    default:
                        this.activeTab = 0; // Default to Assigned Meals tab
                }
            } else {
                // No tab parameter, default to Assigned Meals tab
                this.activeTab = 0;
            }
        },
        
        // Method to handle tab changes and update URL
        onTabChange(tabIndex) {
            this.activeTab = tabIndex;
            const tabNames = ['assigned-meals', 'meal-plans', 'meals', 'nutrition-editor', 'reports'];
            const tabName = tabNames[tabIndex] || 'assigned-meals'; // Default to assigned-meals
            
            // Update URL with tab parameter
            this.$router.push({ 
                path: this.$route.path, 
                query: { ...this.$route.query, tab: tabName } 
            }).catch(() => {});
        },
        
        // Dropdown methods
        toggleDropdown(templateId) {
            // If clicking the same dropdown that's already open, close it
            if (this.openDropdownId === templateId) {
                this.openDropdownId = null;
            } else {
                // Otherwise, close any open dropdown and open the clicked one
                this.openDropdownId = templateId;
            }
        },
        
        closeDropdown() {
            this.openDropdownId = null;
        },

        toggleDescription(templateId) {
            // Toggle the expanded state for this template
            this.$set(this.expandedDescriptions, templateId, !this.expandedDescriptions[templateId]);
        },

        shouldShowMoreButton(description, templateId) {
            // Only show button if description exists and is long enough to be truncated
            if (!description || description.trim().length === 0) {
                return false;
            }
            
            // Estimate if text would exceed 2 lines (approximately 100-120 characters for 2 lines)
            // This is a rough estimate; CSS will handle the actual truncation
            const estimatedCharsPerLine = 60;
            const maxCharsFor2Lines = estimatedCharsPerLine * 2;
            
            return description.length > maxCharsFor2Lines;
        },

        // Fix duplicate template IDs
        fixDuplicateIds() {
            const idCounts = {};
            const duplicates = [];
            
            this.mealPlanTemplates.forEach((template, index) => {
                if (idCounts[template.id]) {
                    duplicates.push({ index, id: template.id, name: template.name });
                } else {
                    idCounts[template.id] = 1;
                }
            });
            
            if (duplicates.length > 0) {
                
                // Fix duplicate IDs
                duplicates.forEach(dup => {
                    const newId = `template_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                    this.mealPlanTemplates[dup.index].id = newId;
                });
                
            }
        },

        
        // Close dropdown when clicking outside
        handleClickOutside(event) {
            // Check if the click is outside any dropdown container or dropdown menu
            const clickedInsideDropdown = event.target.closest('.dropdown-container') || 
                                         event.target.closest('.dropdown-menu') ||
                                         event.target.closest('.dropdown-trigger');
            
            if (!clickedInsideDropdown) {
                this.closeDropdown();
            }
        },
        
        toggleMealExpansion(mealKey) {
            this.$set(this.expandedMeals, mealKey, !this.expandedMeals[mealKey]);
        },

        // Remove product from meal
        removeProductFromMeal(mealKey, productIndex) {
            if (this.mealProducts[mealKey] && this.mealProducts[mealKey][productIndex]) {
                this.mealProducts[mealKey].splice(productIndex, 1);
                this.$forceUpdate();
                this.calculateCurrentIntake();
            }
        },

        // Start editing serving field
        startEditingServing(mealKey, productIndex, fieldType) {
            const key = `${mealKey}-${productIndex}-${fieldType}`;
            const product = this.mealProducts[mealKey][productIndex];
            
            if (!product) return;
            
            // Set editing state
            this.$set(this.editingServingFields, key, true);
            
            // Initialize edit values - show saved value from meal_plan_template_details first,
            // then fallback to original food data from foods table
            if (fieldType === 'normalized') {
                // Priority: 1) saved normalized_serving from meal_plan_template_details, 2) original serving_description from foods table
                const currentValue = (product.normalized_serving !== null && product.normalized_serving !== undefined && product.normalized_serving !== '') 
                    ? product.normalized_serving 
                    : (product.serving_description || '');
                this.$set(product, 'editNormalizedServing', currentValue);
                // Store original food value for reference
                this.$set(product, '_originalNormalizedServing', product.serving_description || '');
            } else if (fieldType === 'label') {
                // Priority: 1) saved label_serving from meal_plan_template_details, 2) original serving_description from foods table
                const currentValue = (product.label_serving !== null && product.label_serving !== undefined && product.label_serving !== '') 
                    ? product.label_serving 
                    : (product.serving_description || '');
                // Remove unit suffix if present in the value (for editing)
                const valueWithoutUnit = String(currentValue).replace(/\s*(gm|ml)$/i, '').trim();
                this.$set(product, 'editLabelServing', valueWithoutUnit);
                // Store original food value for reference
                this.$set(product, '_originalLabelServing', product.serving_description || '');
                
                // Ensure unit is set
                if (!product.unit) {
                    const unit = this.determineFoodUnit({
                        food_type: product.category,
                        name: product.name,
                        description: product.description,
                        serving_description: product.serving_description
                    });
                    this.$set(product, 'unit', unit);
                }
                
                // Ensure original values are stored for scaling
                if (product.original_calories === undefined) {
                    this.$set(product, 'original_calories', product.calories || 0);
                    this.$set(product, 'original_protein', product.protein || 0);
                    this.$set(product, 'original_carbohydrate', product.carbohydrate || product.carbs || 0);
                    this.$set(product, 'original_fat', product.fat || product.fats || 0);
                    this.$set(product, 'original_fiber', product.fiber || 0);
                    this.$set(product, 'original_sodium', product.sodium || 0);
                    this.$set(product, 'original_potassium', product.potassium || 0);
                }
                
                // Store original label serving if not already set
                if (!product.original_label_serving) {
                    this.$set(product, 'original_label_serving', valueWithoutUnit || product.serving_description || '');
                }
            } else if (fieldType === 'notes') {
                // Notes only exist in meal_plan_template_details, no fallback to foods table
                const currentValue = (product.notes !== null && product.notes !== undefined && product.notes !== '') 
                    ? product.notes 
                    : '';
                this.$set(product, 'editNotes', currentValue);
            }
            
            // Focus on input after DOM update
            this.$nextTick(() => {
                let inputRef;
                if (fieldType === 'normalized') {
                    inputRef = `normalized-serving-${mealKey}-${productIndex}`;
                } else if (fieldType === 'label') {
                    inputRef = `label-serving-${mealKey}-${productIndex}`;
                } else if (fieldType === 'notes') {
                    inputRef = `notes-${mealKey}-${productIndex}`;
                }
                
                if (inputRef) {
                    const input = this.$refs[inputRef];
                    if (input && input.length) {
                        input[0].focus();
                        input[0].select();
                    } else if (input && input.focus) {
                        input.focus();
                        input.select();
                    }
                }
            });
        },

        // Cancel editing serving field
        cancelEditingServing(mealKey, productIndex, fieldType) {
            const key = `${mealKey}-${productIndex}-${fieldType}`;
            this.$set(this.editingServingFields, key, false);
            
            const product = this.mealProducts[mealKey][productIndex];
            if (product) {
                if (fieldType === 'normalized') {
                    this.$delete(product, 'editNormalizedServing');
                } else if (fieldType === 'label') {
                    this.$delete(product, 'editLabelServing');
                } else if (fieldType === 'notes') {
                    this.$delete(product, 'editNotes');
                }
            }
        },

        // Save serving field
        async saveServingField(mealKey, productIndex, fieldType) {
            const key = `${mealKey}-${productIndex}-${fieldType}`;
            const product = this.mealProducts[mealKey][productIndex];
            
            if (!product) return;
            
            // Get the edited value, handling undefined/null cases
            let editValue = '';
            if (fieldType === 'normalized') {
                editValue = product.editNormalizedServing !== undefined && product.editNormalizedServing !== null 
                    ? String(product.editNormalizedServing) : '';
            } else if (fieldType === 'label') {
                editValue = product.editLabelServing !== undefined && product.editLabelServing !== null 
                    ? String(product.editLabelServing) : '';
            } else if (fieldType === 'notes') {
                editValue = product.editNotes !== undefined && product.editNotes !== null 
                    ? String(product.editNotes) : '';
            }
            
            // Trim the value - empty string after trimming means user cleared the field
            // IMPORTANT: Keep as empty string, not null, so backend can properly handle it
            const newValue = editValue.trim();
            
            console.log('Saving serving field:', {
                mealKey,
                productIndex,
                fieldType,
                editValue,
                newValue,
                newValueType: typeof newValue,
                isEditing: this.isEditing,
                editingTemplateId: this.editingTemplateId,
                productId: product.id
            });
            
            // Check if value actually changed before updating local state and making API call
            let hasChanged = false;
            if (this.isEditing && this.editingTemplateId && product.id) {
                let originalValue = '';
                if (fieldType === 'normalized') {
                    originalValue = (product.normalized_serving !== null && product.normalized_serving !== undefined && product.normalized_serving !== '') 
                        ? String(product.normalized_serving).trim() 
                        : '';
                } else if (fieldType === 'label') {
                    // For label, compare with the value before editing started
                    const currentLabelServing = product.label_serving || product.original_label_serving || product.serving_description || '';
                    originalValue = String(currentLabelServing).replace(/\s*(gm|ml)$/i, '').trim();
                } else if (fieldType === 'notes') {
                    originalValue = (product.notes !== null && product.notes !== undefined && product.notes !== '') 
                        ? String(product.notes).trim() 
                        : '';
                }
                
                // Compare new value with original value
                const normalizedNewValue = newValue === '' ? '' : String(newValue).trim();
                const normalizedOriginalValue = originalValue === '' ? '' : String(originalValue).trim();
                
                hasChanged = normalizedNewValue !== normalizedOriginalValue;
                
                // If values are the same, skip update and API call
                if (!hasChanged) {
                    console.log('No changes detected, skipping update');
                    // Remove editing state
                    this.$set(this.editingServingFields, key, false);
                    // Clean up edit values
                    if (fieldType === 'normalized') {
                        this.$delete(product, 'editNormalizedServing');
                    } else if (fieldType === 'label') {
                        this.$delete(product, 'editLabelServing');
                    } else if (fieldType === 'notes') {
                        this.$delete(product, 'editNotes');
                    }
                    // Recalculate current intake to update Actual Meal Plan Targets
                    this.calculateCurrentIntake();
                    return;
                }
            }
            
            // Update local state immediately for better UX
            // Store as empty string if empty, null only if truly null
            if (fieldType === 'normalized') {
                this.$set(product, 'normalized_serving', newValue === '' ? null : (newValue || null));
                this.$delete(product, 'editNormalizedServing');
            } else if (fieldType === 'label') {
                // Handle proportional scaling when Label Serving changes
                const oldLabelServing = product.label_serving || product.original_label_serving || product.serving_description || '';
                const newLabelServing = newValue === '' ? null : (newValue || null);
                
                // Ensure original values are stored before scaling
                if (product.original_calories === undefined || product.original_calories === null) {
                    this.$set(product, 'original_calories', product.calories || 0);
                    this.$set(product, 'original_protein', product.protein || 0);
                    this.$set(product, 'original_carbohydrate', product.carbohydrate || product.carbs || 0);
                    this.$set(product, 'original_fat', product.fat || product.fats || 0);
                    this.$set(product, 'original_fiber', product.fiber || 0);
                    this.$set(product, 'original_sodium', product.sodium || 0);
                    this.$set(product, 'original_potassium', product.potassium || 0);
                }
                
                // Calculate scaling ratio if both old and new values exist
                if (oldLabelServing && newLabelServing) {
                    // Extract numeric values (remove any non-numeric characters except decimal point)
                    const oldValue = parseFloat(String(oldLabelServing).replace(/[^\d.]/g, '')) || parseFloat(oldLabelServing) || 0;
                    const newValueNum = parseFloat(String(newLabelServing).replace(/[^\d.]/g, '')) || parseFloat(newLabelServing) || 0;
                    
                    // Use original_label_serving as baseline if available, otherwise use old value
                    const baselineValue = product.original_label_serving 
                        ? (parseFloat(String(product.original_label_serving).replace(/[^\d.]/g, '')) || parseFloat(product.original_label_serving) || 0)
                        : oldValue;
                    
                    if (baselineValue > 0 && newValueNum > 0) {
                        const scaleRatio = newValueNum / baselineValue;
                        
                        console.log('Scaling nutrition values:', {
                            oldLabelServing,
                            newLabelServing,
                            baselineValue,
                            newValueNum,
                            scaleRatio,
                            original_calories: product.original_calories,
                            original_protein: product.original_protein
                        });
                        
                        // Scale all nutrition values proportionally based on original values
                        if (product.original_calories !== undefined && product.original_calories !== null) {
                            this.$set(product, 'calories', Math.round((product.original_calories || 0) * scaleRatio * 10) / 10);
                        }
                        if (product.original_protein !== undefined && product.original_protein !== null) {
                            this.$set(product, 'protein', Math.round((product.original_protein || 0) * scaleRatio * 10) / 10);
                        }
                        if (product.original_carbohydrate !== undefined && product.original_carbohydrate !== null) {
                            const scaledCarbs = (product.original_carbohydrate || 0) * scaleRatio;
                            this.$set(product, 'carbohydrate', Math.round(scaledCarbs * 10) / 10);
                            this.$set(product, 'carbs', Math.round(scaledCarbs * 10) / 10);
                        }
                        if (product.original_fat !== undefined && product.original_fat !== null) {
                            this.$set(product, 'fat', Math.round((product.original_fat || 0) * scaleRatio * 10) / 10);
                            this.$set(product, 'fats', Math.round((product.original_fat || 0) * scaleRatio * 10) / 10);
                        }
                        if (product.original_fiber !== undefined && product.original_fiber !== null) {
                            this.$set(product, 'fiber', Math.round((product.original_fiber || 0) * scaleRatio * 10) / 10);
                        }
                        if (product.original_sodium !== undefined && product.original_sodium !== null) {
                            this.$set(product, 'sodium', Math.round((product.original_sodium || 0) * scaleRatio));
                        }
                        if (product.original_potassium !== undefined && product.original_potassium !== null) {
                            this.$set(product, 'potassium', Math.round((product.original_potassium || 0) * scaleRatio));
                        }
                        
                        // Update original_label_serving to new value for future scaling
                        this.$set(product, 'original_label_serving', String(newLabelServing));
                    }
                } else if (newLabelServing && !product.original_label_serving) {
                    // First time setting label_serving, store as original
                    this.$set(product, 'original_label_serving', String(newLabelServing));
                }
                
                this.$set(product, 'label_serving', newLabelServing);
                this.$delete(product, 'editLabelServing');
            } else if (fieldType === 'notes') {
                this.$set(product, 'notes', newValue === '' ? null : (newValue || null));
                this.$delete(product, 'editNotes');
            }
            
            // Remove editing state
            this.$set(this.editingServingFields, key, false);
            
            // Save to database if editing an existing template
            if (this.isEditing && this.editingTemplateId && product.id && (fieldType === 'normalized' || fieldType === 'label' || fieldType === 'notes')) {
                
                // Prevent duplicate requests - check if already saving
                const saveKey = `${this.editingTemplateId}-${product.id}-${mealKey}-${fieldType}`;
                if (this.savingFields && this.savingFields[saveKey]) {
                    console.log('Already saving this field, skipping duplicate request');
                    return;
                }
                
                // Mark as saving
                if (!this.savingFields) {
                    this.savingFields = {};
                }
                this.savingFields[saveKey] = true;
                
                try {
                    // Send the trimmed value as string (empty string for cleared fields)
                    // Backend will convert empty string to null
                    const response = await this.updateProductServingInDatabase(
                        this.editingTemplateId,
                        product.id,
                        mealKey,
                        fieldType,
                        newValue // This is already a string (empty string if cleared)
                    );
                    
                    // Update local state with the response data to ensure consistency
                    if (response && response.data) {
                        if (fieldType === 'normalized') {
                            const normalizedValue = response.data.normalized_serving;
                            this.$set(product, 'normalized_serving', 
                                (normalizedValue !== null && normalizedValue !== undefined && String(normalizedValue).trim() !== '') 
                                    ? String(normalizedValue).trim() 
                                    : null
                            );
                        } else if (fieldType === 'label') {
                            const labelValue = response.data.label_serving;
                            this.$set(product, 'label_serving', 
                                (labelValue !== null && labelValue !== undefined && String(labelValue).trim() !== '') 
                                    ? String(labelValue).trim() 
                                    : null
                            );
                        } else if (fieldType === 'notes') {
                            const notesValue = response.data.notes;
                            this.$set(product, 'notes', 
                                (notesValue !== null && notesValue !== undefined && String(notesValue).trim() !== '') 
                                    ? String(notesValue).trim() 
                                    : null
                            );
                        }
                    }
                    
                    // Recalculate current intake to update Actual Meal Plan Targets
                    this.calculateCurrentIntake();
                    
                    // No success toast - loading indicator handles feedback
                } catch (error) {
                    console.error('Error saving field:', error);
                    
                    // Provide more specific error messages based on error type
                    let errorMessage = 'Failed to save information. Please try again.';
                    if (error.message) {
                        if (error.message.includes('Product not found') || error.message.includes('Food not found')) {
                            errorMessage = 'Unable to save: Product not found. The product may have been removed. Please refresh the page and try again.';
                        } else if (error.message.includes('not found')) {
                            errorMessage = 'The meal plan or product could not be found. Please refresh the page.';
                        } else {
                            errorMessage = error.message;
                        }
                    }
                    
                    this.makeToast('danger', errorMessage, 'Error');
                    
                    // Revert local changes on error by refreshing from server
                    // Only refresh if product still exists (404 means product was removed)
                    if (!error.message || !error.message.includes('not found')) {
                        await this.refreshProductServingData(mealKey, productIndex);
                    }
                    
                    // Recalculate current intake after refresh
                    this.calculateCurrentIntake();
                } finally {
                    // Remove saving flag
                    delete this.savingFields[saveKey];
                }
            } else {
                // If not editing existing template, just update local state
                // The values will be saved when the template is created/updated
                // Recalculate current intake to update Actual Meal Plan Targets
                this.calculateCurrentIntake();
            }
        },

        // Update product serving in database
        async updateProductServingInDatabase(templateId, productId, mealKey, fieldType, value) {
            try {
                const payload = {
                    food_id: productId,
                    nutrition_type: mealKey,
                };

                // Add the appropriate field based on fieldType
                // CRITICAL: Always send as string, never send null or undefined
                // Empty string means "clear this field" - backend will convert to null
                // This ensures the backend always receives a value and can update it
                if (fieldType === 'normalized') {
                    // Always send as string - empty string if value is empty/null/undefined
                    payload.normalized_serving = (value !== undefined && value !== null && String(value).trim() !== '') 
                        ? String(value).trim() 
                        : '';
                } else if (fieldType === 'label') {
                    payload.label_serving = (value !== undefined && value !== null && String(value).trim() !== '') 
                        ? String(value).trim() 
                        : '';
                } else if (fieldType === 'notes') {
                    payload.notes = (value !== undefined && value !== null && String(value).trim() !== '') 
                        ? String(value).trim() 
                        : '';
                }
                
                console.log('Saving to database:', {
                    templateId,
                    productId,
                    mealKey,
                    fieldType,
                    value,
                    payload
                });
                
                const response = await axios.put(
                    `nutrition/${templateId}/product-serving`,
                    payload
                );
                
                if (response.data.success || response.data.message) {
                    // Log the actual data being returned
                    if (response.data.data) {
                        console.log('Response data values:', {
                            normalized_serving: response.data.data.normalized_serving,
                            label_serving: response.data.data.label_serving,
                            notes: response.data.data.notes
                        });
                    }
                    // Return the full response with data
                    return {
                        success: true,
                        data: response.data.data || {
                            normalized_serving: response.data.normalized_serving,
                            label_serving: response.data.label_serving,
                            notes: response.data.notes
                        }
                    };
                } else {
                    throw new Error(response.data.message || 'Failed to update product information');
                }
            } catch (error) {
                // Handle 404 errors specifically - product not found in meal
                if (error.response && error.response.status === 404) {
                    const errorMessage = error.response.data?.message || 'Product not found in this meal';
                    console.warn('Product not found in meal plan:', {
                        templateId,
                        productId,
                        mealKey,
                        fieldType,
                        error: errorMessage
                    });
                    throw new Error(errorMessage);
                }
                
                // Handle other errors
                console.error('Error updating product information:', error);
                if (error.response) {
                    console.error('Error response:', error.response.data);
                }
                if (error.response && error.response.data && error.response.data.message) {
                    throw new Error(error.response.data.message);
                }
                throw error;
            }
        },

        // Refresh product serving data from server
        async refreshProductServingData(mealKey, productIndex) {
            if (!this.isEditing || !this.editingTemplateId) {
                return;
            }

            try {
                const product = this.mealProducts[mealKey][productIndex];
                if (!product || !product.id) {
                    return;
                }

                // Fetch the latest template data
                const response = await axios.get(`nutrition/${this.editingTemplateId}`);
                
                if (response.data.success && response.data.data && response.data.data.details) {
                    // Find ALL matching detail records - there might be multiple records for same food_id
                    // We need to find the one that matches both food_id and nutrition_type
                    const matchingDetails = response.data.data.details.filter(
                        d => d.food_id === product.id && d.nutrition_type === mealKey
                    );

                    if (matchingDetails.length > 0) {
                        // If multiple, use the first one (or we could use the one with the latest updated_at)
                        const detail = matchingDetails.length === 1 
                            ? matchingDetails[0] 
                            : matchingDetails.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0];
                        
                        console.log('Refreshing product data:', {
                            mealKey,
                            productIndex,
                            productId: product.id,
                            foundDetails: matchingDetails.length,
                            detail: {
                                id: detail.id,
                                normalized_serving: detail.normalized_serving,
                                label_serving: detail.label_serving,
                                notes: detail.notes,
                                updated_at: detail.updated_at
                            },
                            allDetails: response.data.data.details.map(d => ({
                                id: d.id,
                                food_id: d.food_id,
                                nutrition_type: d.nutrition_type,
                                normalized_serving: d.normalized_serving,
                                label_serving: d.label_serving
                            }))
                        });
                        
                        // Update the product with fresh data from server
                        // Preserve null values properly - null means use food's serving_description as fallback
                        const newNormalized = (detail.normalized_serving !== null && detail.normalized_serving !== undefined && detail.normalized_serving !== '') 
                            ? detail.normalized_serving 
                            : null; // null = use food's serving_description
                        const newLabel = (detail.label_serving !== null && detail.label_serving !== undefined && detail.label_serving !== '') 
                            ? detail.label_serving 
                            : null; // null = use food's serving_description
                        const newNotes = (detail.notes !== null && detail.notes !== undefined && detail.notes !== '') 
                            ? detail.notes 
                            : null; // null = no notes
                        
                        console.log('Updating product with values:', {
                            old: {
                                normalized_serving: product.normalized_serving,
                                label_serving: product.label_serving,
                                notes: product.notes
                            },
                            new: {
                                normalized_serving: newNormalized,
                                label_serving: newLabel,
                                notes: newNotes
                            }
                        });
                        
                        this.$set(product, 'normalized_serving', newNormalized);
                        this.$set(product, 'label_serving', newLabel);
                        this.$set(product, 'notes', newNotes);
                        
                        // Preserve unit if not already set
                        if (!product.unit) {
                            const unit = this.determineFoodUnit({
                                food_type: product.category,
                                name: product.name,
                                description: product.description,
                                serving_description: product.serving_description
                            });
                            this.$set(product, 'unit', unit);
                        }
                        
                        // Preserve original values for scaling if not already set
                        if (!product.original_label_serving && newLabel) {
                            this.$set(product, 'original_label_serving', String(newLabel));
                        }
                        if (product.original_calories === undefined) {
                            this.$set(product, 'original_calories', product.calories || 0);
                            this.$set(product, 'original_protein', product.protein || 0);
                            this.$set(product, 'original_carbohydrate', product.carbohydrate || product.carbs || 0);
                            this.$set(product, 'original_fat', product.fat || product.fats || 0);
                            this.$set(product, 'original_fiber', product.fiber || 0);
                            this.$set(product, 'original_sodium', product.sodium || 0);
                            this.$set(product, 'original_potassium', product.potassium || 0);
                        }
                        
                        // Recalculate current intake to update Actual Meal Plan Targets
                        this.calculateCurrentIntake();
                        
                        // Force Vue to update the view
                        this.$nextTick(() => {
                            this.$forceUpdate();
                        });
                    } else {
                        // Product was removed from meal plan - this is expected in some cases
                        // Don't log as error, just silently skip refresh
                        console.debug('Product detail not found for refresh (product may have been removed):', {
                            food_id: product.id,
                            nutrition_type: mealKey,
                            template_id: this.editingTemplateId
                        });
                    }
                } else {
                    console.error('Invalid response structure:', response.data);
                }
            } catch (error) {
                console.error('Error refreshing product serving data:', error);
                // Don't show error to user as this is a background refresh
            }
        },

        // Calculate meal totals for specific nutrition field
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
        async fetchMembers() {
            try {
                this.loadingMembers = true;

                // Use the existing endpoint that's already working in ViewAllMembers
                const response = await axios.get(
                    "get_clients_without_paginate"
                );

                if (
                    response.data &&
                    Array.isArray(response.data) &&
                    response.data.length > 0
                ) {
                    this.members = response.data;
                    // Filter to show only active members
                    this.filterMembers();
                } else {
                    this.loadSampleMembers();
                }
            } catch (error) {
                this.loadSampleMembers();
            } finally {
                this.loadingMembers = false;
            }
        },
        closeAssignModal() {
            this.showAssignModal = false;
            this.assignForm = {
                memberId: "",
                assignToAllMembers: false,
                startDate: "",
                duration: "",
                description: "",
            };
            this.selectedTemplateId = null;
            this.selectedMember = null;
            this.memberSearchQuery = "";
            this.showMemberDropdown = false;

            // Remove click outside handler
            document.removeEventListener("click", this.handleClickOutside);
        },

        handleClickOutside(event) {
            const modal = document.querySelector(".modal-content");
            const dropdown = document.querySelector(".member-dropdown");

            if (
                modal &&
                !modal.contains(event.target) &&
                dropdown &&
                !dropdown.contains(event.target)
            ) {
                this.showMemberDropdown = false;
            }
        },

        handleModalBodyClick(event) {
            // Prevent closing dropdown when clicking inside modal body
            event.stopPropagation();
        },

        async submitAssignForm() {
            if (!this.assignForm.memberId && !this.assignForm.assignToAllMembers) {
                this.showErrorMessage("Please select a member or choose 'All Members'");
                return;
            }

            try {
                const assignData = {
                    template_id: this.selectedTemplateId,
                    member_id: this.assignForm.assignToAllMembers ? null : this.assignForm.memberId,
                    assign_to_all_members: this.assignForm.assignToAllMembers,
                    start_date: this.assignForm.startDate || null,
                    duration: this.assignForm.duration || null,
                    description: this.assignForm.description || null,
                };

                // Try to submit to the API
                const response = await axios.post(
                    "/nutrition/assign",
                    assignData
                );

                if (response.data.success) {
                    this.showSuccessMessage("Meal plan assigned successfully!");
                    
                    // Update member count on the template card immediately
                    if (this.selectedTemplateId) {
                        const template = this.mealPlanTemplates.find(t => t.id === this.selectedTemplateId);
                        if (template) {
                            // Calculate how many members were assigned
                            // If assign_to_all_members was true, response.data.data is an array
                            // Otherwise, it's a single assignment object
                            const assignments = response.data.data;
                            const memberCountIncrement = Array.isArray(assignments) 
                                ? assignments.length 
                                : 1;
                            
                            // Increment member count locally
                            template.members = (template.members || 0) + memberCountIncrement;
                        }
                    }
                    
                    this.closeAssignModal();
                    // Refresh the nutrition data and assigned meals logs to get accurate counts
                    await this.fetchNutritionData();
                    await this.fetchAssignedMealsLogs();
                } else {
                    this.showErrorMessage(
                        "Failed to assign meal plan: " +
                            (response.data.message || "Unknown error")
                    );
                }
            } catch (error) {

                // Handle validation errors (422) with specific message
                if (error.response && error.response.status === 422) {
                    const errorMessage = error.response.data?.message || 
                                       (error.response.data?.errors ? 
                                        Object.values(error.response.data.errors).flat().join(', ') : 
                                        'Validation error occurred');
                    this.showErrorMessage(errorMessage);
                    return;
                }

                // If the API doesn't exist yet, show a success message for demo purposes
                if (error.response && error.response.status === 404) {
                    this.showSuccessMessage(
                        "Meal plan assignment demo completed! (API endpoint not implemented yet)"
                    );
                    this.closeAssignModal();
                } else {
                    this.showErrorMessage(error.message);
                }
            }
        },
        selectMember(member) {
            this.assignForm.memberId = member.id;
            this.selectedMember = member;
            this.memberSearchQuery =
                member.membername || member.firstname + " " + member.lastname;
            this.showMemberDropdown = false;
        },

        clearSelectedMember() {
            this.assignForm.memberId = "";
            this.selectedMember = null;
            this.memberSearchQuery = "";
            this.showMemberDropdown = false;
        },

        handleAllMembersToggle() {
            if (this.assignForm.assignToAllMembers) {
                // Clear individual member selection when "All Members" is selected
                this.assignForm.memberId = "";
                this.selectedMember = null;
                this.memberSearchQuery = "";
                this.showMemberDropdown = false;
            }
        },

        // Add method to fetch nutrition data from the API
        async fetchNutritionData() {
            this.loadingNutrition = true;
            this.nutritionError = null;

            try {
                const response = await axios.get("nutrition");

                if (response.data.success) {
                    // Transform the API data to match the expected format
                    const templates = response.data.data.map(
                        (nutrition) => {
                            return {
                            id: nutrition.id,
                            name: nutrition.name,
                            description:
                                nutrition.description ||
                                "No description available",
                            calories: parseInt(nutrition.calories) || 0,
                            protein: (parseInt(nutrition.protein) || 0) + "g",
                            carbs: (parseInt(nutrition.carbs) || 0) + "g",
                            fats: (parseInt(nutrition.fats) || 0) + "g",
                            // Add target values from API
                            target_protein: parseInt(nutrition.target_protein) || 125,
                            target_carbs: parseInt(nutrition.target_carbs) || 225,
                            target_fat: parseInt(nutrition.target_fat) || 67,
                            target_calories: parseInt(nutrition.target_calories) || 2003,
                            duration: "Custom", // Default duration since it's not in the API
                            category: nutrition.category
                                ? nutrition.category.name
                                : "General", // Use actual category from API
                            members: nutrition.members_count || 0, // Use actual member count from API
                            isActive: nutrition.status === 1,
                            meal_image: nutrition.meal_image
                                ? `/${nutrition.meal_image}`
                                : null,
                            createdBy: nutrition.creator_name || this.currentUserName || 'Admin',
                            dateCreated: nutrition.created_at 
                                ? new Date(nutrition.created_at).toLocaleDateString('en-US', {
                                    month: '2-digit',
                                    day: '2-digit',
                                    year: 'numeric'
                                })
                                : this.getCurrentDateFormatted(),
                            lastModified: nutrition.updated_at 
                                ? new Date(nutrition.updated_at).toLocaleDateString('en-US', {
                                    month: '2-digit',
                                    day: '2-digit',
                                    year: 'numeric'
                                })
                                : this.getCurrentDateFormatted(),
                            details: nutrition.details || [],
                        };
                    });
                    
                    this.mealPlanTemplates = templates;
                    
                    // Check for duplicate IDs and fix them
                    this.fixDuplicateIds();
                } else {
                    this.nutritionError = "Failed to fetch nutrition data";
                }
            } catch (error) {
                // Don't set error for 401 - handled globally by axios interceptor
                if (error.response && error.response.status === 401) {
                    // Error is handled globally, just return
                    return;
                }
                this.nutritionError =
                    error.response?.data?.message ||
                    "Failed to fetch nutrition data";
            } finally {
                this.loadingNutrition = false;
            }
        },

        // Add method to fetch nutrition categories from the API
        async fetchNutritionCategories() {
            this.loadingCategories = true;

            try {
                // Get gym_id from current user
                const gymId = this.currentUserGymId;
                
                // Fetch categories filtered by gym_id
                const response = await axios.get("nutrition-categories", {
                    params: {
                        gym_id: gymId
                    }
                });

                if (response.data.success) {
                    this.nutritionCategories = response.data.data;
                } else {
                    // Set fallback categories if API fails
                    this.nutritionCategories = this.getFallbackCategories();
                }
            } catch (error) {
                // Don't log 401 errors - they're handled globally by axios interceptor
                if (error.response && error.response.status !== 401) {
                    console.error('Error fetching nutrition categories:', error);
                }
                // Set fallback categories if API fails
                this.nutritionCategories = this.getFallbackCategories();
            } finally {
                this.loadingCategories = false;
            }
        },

        // Method to get available categories (API data or fallback)
        getAvailableCategories() {
            if (this.nutritionCategories && this.nutritionCategories.length > 0) {
                return this.nutritionCategories;
            }
            return this.getFallbackCategories();
        },

        // Fallback categories in case API fails
        getFallbackCategories() {
            return [
                { id: "1", name: "Weight Loss" },
                { id: "2", name: "Muscle Gain" },
                { id: "3", name: "Maintenance" },
                { id: "4", name: "Athletic Performance" },
                { id: "5", name: "General Health" },
                { id: "6", name: "Special Diet" }
            ];
        },

        // Generate unique template ID
        generateUniqueTemplateId() {
            const timestamp = Date.now();
            const randomString = Math.random().toString(36).substr(2, 9);
            const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            return `template_${timestamp}_${randomString}_${uuid.substr(0, 8)}`;
        },

        // Get current date formatted for display
        getCurrentDateFormatted() {
            const now = new Date();
            return now.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric'
            });
        },

        // Generate meals_time from mealProducts
        generateMealsTimeFromProducts() {
            const mealLabels = {
                breakfast: 'Breakfast',
                snacks1: 'Snacks (Morning)',
                lunch: 'Lunch',
                snacks2: 'Snacks (Afternoon)',
                dinner: 'Dinner',
                snacks3: 'Snacks (Evening)'
            };

            const mealsWithProducts = [];
            
            // Check each meal type and add to list if it has products
            Object.keys(mealLabels).forEach((mealKey) => {
                if (
                    this.mealProducts[mealKey] &&
                    this.mealProducts[mealKey].length > 0
                ) {
                    mealsWithProducts.push(mealLabels[mealKey]);
                }
            });

            // Return comma-separated list of meals, or null if no meals
            return mealsWithProducts.length > 0 
                ? mealsWithProducts.join(', ') 
                : null;
        },

        onCategoryChange() {
        },

        clearTemplateFilters() {
            this.templateSearchQuery = "";
            this.selectedTemplateCategory = "";
            this.selectedCalorieRange = "";
        },
        closeCreateModal() {
            // Prevent closing modal while submitting
            if (this.isSubmitting) {
                return;
            }
            this.showCreateTemplateModal = false;
            this.isEditing = false;
            this.editingTemplateId = null;
            this.editingTemplateDateCreated = null;
            this.editingTemplateCreator = null;
            this.editingTemplateLastModified = null;
            this.isSubmitting = false;
            this.resetNewTemplate();
            // Restore body scroll (also handled by watcher, but ensure it's done)
            this.$nextTick(() => {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            });
        },

        openCreateModal() {
            // Reset form to ensure fresh state
            this.resetNewTemplate();
            this.showCreateTemplateModal = true;
            // Focus on the first input field when modal opens
            this.$nextTick(() => {
                const firstInput = document.getElementById("templateName");
                // Auto-resize description textarea if there's content
                this.autoResizeDescriptionTextarea();
                if (firstInput) {
                    firstInput.focus();
                }
            });
        },
        resetNewTemplate() {
            this.newTemplate = {
                name: "New Meal Plan",
                description: "Balanced, customizable meal plan to support your nutrition goals.",
                category_id: "",
                calories: null,
                protein: null,
                carbs: null,
                fats: null,
                duration: "",
                category: "",
                isActive: true,
                members: 0,
                instructions: "Follow this custom meal plan for 2 weeks",
                meals_time: "",
                meal_image: this.defaultNutritionImages[0], // Set first image as default
                targets: {
                    protein: 125,
                    carbs: 225,
                    fat: 67,
                    calories: 2000
                },
                currentIntake: {
                    protein: 118.5,
                    carbs: 213.75,
                    fat: 63.65,
                    calories: 1900,
                    fiber: 35.2,
                    netCarbs: 178.55,
                    sodium: 1500,
                    potassium: 3200
                }
            };
            // Reset image index to first image
            this.selectedImageIndex = 0;
            // Reset meal products
            this.mealProducts = {
                breakfast: [],
                snacks1: [],
                lunch: [],
                snacks2: [],
                dinner: [],
                snacks3: [],
            };
            // Calculate current intake (will be 0 since mealProducts is empty)
            this.calculateCurrentIntake();
            // Reset enabled macros to default state
            this.enabledMacros = {
                carbs: true,
                proteins: true,
                fats: true,
            };
            // Reset macro input mode and percentages
            this.macroInputMode = 'grams';
            this.macroPercentages = {
                protein: null,
                carbs: null,
                fat: null
            };
            // Reset the file input
            if (this.$refs.imageInput) {
                this.$refs.imageInput.value = "";
            }
        },
        async saveTemplate() {
            // Basic validation
            if (!this.newTemplate.name.trim()) {
                this.showErrorMessage("Template name is required");
                return;
            }

            if (!this.newTemplate.description.trim()) {
                this.showErrorMessage("Description is required");
                return;
            }

            // Check for duplicate template names (only for new templates)
            if (!this.isEditing) {
                const existingTemplate = this.mealPlanTemplates.find(
                    template => template.name.toLowerCase().trim() === this.newTemplate.name.toLowerCase().trim()
                );
                if (existingTemplate) {
                    this.showErrorMessage(`A template with the name "${this.newTemplate.name}" already exists. Please choose a different name.`);
                    return;
                }
            }

            // Note: Removed meal products validation for simplified creation
            // Users can add meals later in edit mode

            // Set loading state
            this.isSubmitting = true;

            try {
                // Calculate total nutrition from all meals
                let totalCalories = 0;
                let totalProtein = 0;
                let totalCarbs = 0;
                let totalFats = 0;

                // Prepare nutrition details for backend
                const nutritionDetails = [];

                Object.keys(this.mealProducts).forEach((mealKey) => {
                    if (
                        this.mealProducts[mealKey] &&
                        this.mealProducts[mealKey].length > 0
                    ) {
                        this.mealProducts[mealKey].forEach((product) => {
                            const quantity = product.quantity || 1;
                            const calories =
                                (product.calories || 0) * quantity;
                            const protein =
                                (product.protein || 0) * quantity;
                            const carbs =
                                (product.carbohydrate || product.carbs || 0) * quantity;
                            const fats =
                                (product.fat || product.fats || 0) * quantity;
                            const fiber =
                                (product.fiber || 0) * quantity;
                            const sodium =
                                (product.sodium || 0) * quantity;
                            const potassium =
                                (product.potassium || 0) * quantity;

                            totalCalories += calories;
                            totalProtein += protein;
                            totalCarbs += carbs;
                            totalFats += fats;

                            // Add to nutrition details for backend
                            // IMPORTANT: Use actual saved values, not fallback to serving_description
                            // Only use serving_description if the field is truly null/undefined/empty
                            const normalizedServing = (product.normalized_serving !== null && 
                                product.normalized_serving !== undefined && 
                                String(product.normalized_serving).trim() !== '') 
                                ? String(product.normalized_serving).trim() 
                                : null;
                            
                            const labelServing = (product.label_serving !== null && 
                                product.label_serving !== undefined && 
                                String(product.label_serving).trim() !== '') 
                                ? String(product.label_serving).trim() 
                                : null;
                            
                            const notesValue = (product.notes !== null && 
                                product.notes !== undefined && 
                                String(product.notes).trim() !== '') 
                                ? String(product.notes).trim() 
                                : null;
                            
                            nutritionDetails.push({
                                food_id: product.id,
                                nutrition_type: mealKey, // breakfast, lunch, dinner, etc.
                                quantity: quantity,
                                normalized_serving: normalizedServing,
                                label_serving: labelServing,
                                calories: calories.toString(),
                                protein: protein.toString(),
                                carbs: carbs.toString(),
                                fats: fats.toString(),
                                fiber: fiber.toString(),
                                sodium: sodium.toString(),
                                potassium: potassium.toString(),
                                notes: notesValue,
                            });
                        });
                    }
                });

                // Generate unique identifier for this template
                const templateId = this.isEditing ? this.editingTemplateId : this.generateUniqueTemplateId();

                // Generate meals_time from mealProducts
                const mealsTime = this.generateMealsTimeFromProducts();

                // Ensure status is a string
                const status = this.newTemplate.isActive ? "1" : "0";

                // Prepare data using your preferred object format (always)
                const dataObject = {
                    name: this.newTemplate.name.trim(),
                    description: this.newTemplate.description ? this.newTemplate.description.trim() : "",
                    instructions: this.newTemplate.instructions || null,
                    meals_time: mealsTime || null,
                    category_id: this.newTemplate.category_id ? parseInt(this.newTemplate.category_id) : null,
                    status: status,
                    calories: Math.round(totalCalories).toString(),
                    protein: Math.round(totalProtein).toString(),
                    carbs: Math.round(totalCarbs).toString(),
                    fats: Math.round(totalFats).toString(),
                    // Add target macros that user selected
                    target_protein: this.newTemplate.targets ? this.newTemplate.targets.protein.toString() : "125",
                    target_carbs: this.newTemplate.targets ? this.newTemplate.targets.carbs.toString() : "225",
                    target_fat: this.newTemplate.targets ? this.newTemplate.targets.fat.toString() : "67",
                    target_calories: this.newTemplate.targets ? this.newTemplate.targets.calories.toString() : "2003",
                    nutrition_details: JSON.stringify(nutritionDetails),
                };

                // Prepare data for API request (no FormData needed since no file uploads)
                const cleanedData = {
                    name: dataObject.name,
                    status: dataObject.status,
                    calories: dataObject.calories,
                    protein: dataObject.protein,
                    carbs: dataObject.carbs,
                    fats: dataObject.fats,
                    nutrition_details: dataObject.nutrition_details,
                    description: dataObject.description === "" ? null : dataObject.description,
                    instructions: dataObject.instructions || null,
                    meals_time: dataObject.meals_time || null,
                    category_id: (!dataObject.category_id || dataObject.category_id === "") ? null : dataObject.category_id,
                    target_protein: dataObject.target_protein || null,
                    target_carbs: dataObject.target_carbs || null,
                    target_fat: dataObject.target_fat || null,
                    target_calories: dataObject.target_calories || null,
                    meal_image: this.newTemplate.meal_image || null,
                };
                
                // Debug logging
                console.log('Saving meal plan template:', {
                    isEditing: this.isEditing,
                    templateId: this.isEditing ? this.editingTemplateId : 'new',
                    nutritionDetailsCount: nutritionDetails.length,
                    nutritionDetailsSample: nutritionDetails.slice(0, 2),
                    nutritionDetailsJSON: dataObject.nutrition_details.substring(0, 200)
                });
                
                const formData = cleanedData;


                // Prepare request config
                // Note: Don't set Content-Type for FormData - axios sets it automatically with boundary
                const config = {};

                let response;
                if (this.isEditing) {
                    // Update existing nutrition plan
                    response = await axios.put(
                        `nutrition/${this.editingTemplateId}`,
                        formData,
                        config
                    );
                } else {
                    // Create new nutrition plan
                    response = await axios.post("nutrition", formData, config);
                }

                if (response.data.success || response.data.message) {
                    // Log response details
                    console.log('Meal plan save response:', {
                        success: response.data.success,
                        id: response.data.id,
                        details_count: response.data.details_count,
                        message: response.data.message
                    });
                    
                    // Store template name for success message before closing modal
                    const templateName = this.newTemplate.name.trim();
                    const action = this.isEditing ? "updated" : "created";
                    const detailsInfo = response.data.details_count !== undefined 
                        ? ` (${response.data.details_count} meal items saved)`
                        : '';
                    
                    this.isSubmitting = false;
                                        
                    // Close modal after successful save (both create and edit)
                    this.closeCreateModal();
                    
                    setTimeout(async () => {
                        await this.fetchNutritionData();
                    }, 1000);
                } else {
                    this.showErrorMessage(
                        "Failed to save nutrition plan: " +
                            (response.data.message || "Server error occurred")
                    );
                }
            } catch (error) {

                if (error.response?.data?.message) {
                    this.showErrorMessage(
                        "Failed to save nutrition plan: " +
                            error.response.data.message
                    );
                } else if (error.response?.data?.errors) {
                    const errorMessages = Object.values(
                        error.response.data.errors
                    ).flat();
                    this.showErrorMessage(
                        "Validation errors: " + errorMessages.join(", ")
                    );
                } else {
                    this.showErrorMessage(
                        "Failed to save nutrition plan. Please try again. Error: " +
                            error.message
                    );
                }
            } finally {
                this.isSubmitting = false;
            }
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
        background: #4CAF50;
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

        showErrorMessage(message) {
            // Create a temporary error message element
            const errorDiv = document.createElement("div");
            errorDiv.className = "error-message";
            errorDiv.textContent = message;
            errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f44336;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
      `;

            document.body.appendChild(errorDiv);

            // Remove after 5 seconds (longer for error messages)
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.parentNode.removeChild(errorDiv);
                }
            }, 5000);
        },

        showQuantityIncreasedMessage(productName, newQuantity) {
            // Create a temporary quantity increased message
            const messageDiv = document.createElement("div");
            messageDiv.className = "quantity-increased-message";
            const editModeText = this.isEditing ? " (Edit Mode)" : "";
            messageDiv.textContent = `${productName} quantity increased to ${newQuantity}${editModeText}`;
            messageDiv.style.cssText = `
        position: fixed;
        top: 60px;
        right: 20px;
        background: #2196F3;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        z-index: 10000;
        font-weight: 500;
        font-size: 0.9rem;
        animation: slideInRight 0.3s ease;
      `;

            document.body.appendChild(messageDiv);

            // Remove after 2 seconds
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 2000);
        },
        assignTemplate(templateId) {
            this.selectedTemplateId = templateId;
            this.showAssignModal = true;
            this.fetchMembers();

            // Add click outside handler
            this.$nextTick(() => {
                document.addEventListener("click", this.handleClickOutside);
                const memberSearch = document.getElementById("memberSearch");
                if (memberSearch) {
                    memberSearch.focus();
                }
            });
        },
        async editTemplate(templateId) {
            try {
                // Fetch the specific nutrition plan data
                const response = await axios.get(`nutrition/${templateId}`);

                if (response.data.success) {
                    const nutrition = response.data.data;
                    // Get meal_image and normalize it
                    const mealImage = nutrition.meal_image ? (nutrition.meal_image.startsWith('/') ? nutrition.meal_image.substring(1) : nutrition.meal_image) : this.defaultNutritionImages[0];
                    
                    // Find the index of the current meal_image in default images, or default to 0
                    const imageIndex = this.defaultNutritionImages.findIndex(img => img === mealImage);
                    this.selectedImageIndex = imageIndex >= 0 ? imageIndex : 0;
                    
                    // Populate the form with existing data
                    this.newTemplate = {
                        name: nutrition.name,
                        description: nutrition.description || "",
                        instructions: nutrition.instructions || "",
                        meals_time: nutrition.meals_time || "",
                        category_id: nutrition.category_id || "",
                        calories: parseInt(nutrition.calories) || 0,
                        protein: parseInt(nutrition.protein) || 0,
                        carbs: parseInt(nutrition.carbs) || 0,
                        fats: parseInt(nutrition.fats) || 0,
                        duration: "Custom",
                        category: "General",
                        isActive: nutrition.status === 1,
                        members: 0,
                        meal_image: mealImage,
                        targets: {
                            protein: parseInt(nutrition.target_protein) || parseInt(nutrition.protein) || 125,
                            carbs: parseInt(nutrition.target_carbs) || parseInt(nutrition.carbs) || 225,
                            fat: parseInt(nutrition.target_fat) || parseInt(nutrition.fats) || 67,
                            calories: parseInt(nutrition.target_calories) || parseInt(nutrition.calories) || 2000
                        },
                        currentIntake: {
                            protein: 0,
                            carbs: 0,
                            fat: 0,
                            calories: 0,
                            fiber: 0,
                            netCarbs: 0,
                            sodium: 0,
                            potassium: 0
                        }
                    };

                    // Reset macro input mode and percentages when editing
                    this.macroInputMode = 'grams';
                    this.macroPercentages = {
                        protein: null,
                        carbs: null,
                        fat: null
                    };

                    // Populate meal products from nutrition details
                    this.mealProducts = {
                        breakfast: [],
                        snacks1: [],
                        lunch: [],
                        snacks2: [],
                        dinner: [],
                        snacks3: [],
                    };

                    // Process nutrition details to populate meal products
                    if (nutrition.details && nutrition.details.length > 0) {
                        // Group details by food_id to consolidate quantities
                        const groupedDetails = {};

                        nutrition.details.forEach((detail) => {
                            if (this.mealProducts[detail.nutrition_type]) {
                                const foodData = detail.food || {};
                                const foodId = detail.food_id;
                                const mealKey = detail.nutrition_type;

                                // Create a unique key for each food in each meal
                                const uniqueKey = `${mealKey}_${foodId}`;

                                if (!groupedDetails[uniqueKey]) {
                                    const baseQuantity = parseFloat(detail.quantity) || 1;
                                    // First occurrence of this food in this meal
                                    groupedDetails[uniqueKey] = {
                                        name:
                                            detail.food_name || foodData.name ||
                                            `Food ID: ${detail.food_id}`,
                                        description: foodData.description || "",
                                        // Store original food serving_description for reference (from foods table)
                                        serving_description: foodData.serving_description || null,
                                        // Priority: saved value from meal_plan_template_details, fallback to foods table
                                        // null means use food's serving_description as fallback in display
                                        normalized_serving: (detail.normalized_serving !== null && detail.normalized_serving !== undefined && detail.normalized_serving !== '') 
                                            ? detail.normalized_serving 
                                            : null,
                                        label_serving: (detail.label_serving !== null && detail.label_serving !== undefined && detail.label_serving !== '') 
                                            ? detail.label_serving 
                                            : null,
                                        calories:
                                            parseFloat(detail.calories) / baseQuantity, // Base calories per unit
                                        protein:
                                            parseFloat(detail.protein) / baseQuantity, // Base protein per unit
                                        carbs:
                                            parseFloat(detail.carbs) / baseQuantity, // Base carbs per unit
                                        fats:
                                            parseFloat(detail.fats) / baseQuantity, // Base fats per unit
                                        fiber:
                                            detail.fiber ? parseFloat(detail.fiber) / baseQuantity : (foodData.fiber || 0), // Base fiber per unit
                                        sodium:
                                            detail.sodium ? parseFloat(detail.sodium) / baseQuantity : (foodData.sodium || 0), // Base sodium per unit
                                        potassium:
                                            detail.potassium ? parseFloat(detail.potassium) / baseQuantity : (foodData.potassium || 0), // Base potassium per unit
                                        notes: (detail.notes !== null && detail.notes !== undefined && detail.notes !== '') 
                                            ? detail.notes 
                                            : null,
                                        food_id: detail.food_id,
                                        id: detail.food_id,
                                        category:
                                            foodData.food_type || "General",
                                        quantity: baseQuantity, // Use actual quantity from database as number
                                        mealKey: mealKey,
                                    };
                                } else {
                                    // Add to existing quantity if duplicate food in same meal
                                    const additionalQuantity = parseFloat(detail.quantity) || 1;
                                    const totalQuantity = groupedDetails[uniqueKey].quantity + additionalQuantity;
                                    
                                    // Recalculate base values based on total quantity
                                    const totalCalories = parseFloat(detail.calories) + (groupedDetails[uniqueKey].calories * groupedDetails[uniqueKey].quantity);
                                    const totalProtein = parseFloat(detail.protein) + (groupedDetails[uniqueKey].protein * groupedDetails[uniqueKey].quantity);
                                    const totalCarbs = parseFloat(detail.carbs) + (groupedDetails[uniqueKey].carbs * groupedDetails[uniqueKey].quantity);
                                    const totalFats = parseFloat(detail.fats) + (groupedDetails[uniqueKey].fats * groupedDetails[uniqueKey].quantity);
                                    const totalFiber = (detail.fiber ? parseFloat(detail.fiber) : 0) + (groupedDetails[uniqueKey].fiber * groupedDetails[uniqueKey].quantity);
                                    const totalSodium = (detail.sodium ? parseFloat(detail.sodium) : 0) + (groupedDetails[uniqueKey].sodium * groupedDetails[uniqueKey].quantity);
                                    const totalPotassium = (detail.potassium ? parseFloat(detail.potassium) : 0) + (groupedDetails[uniqueKey].potassium * groupedDetails[uniqueKey].quantity);
                                    
                                    groupedDetails[uniqueKey].quantity = totalQuantity;
                                    groupedDetails[uniqueKey].calories = totalCalories / totalQuantity;
                                    groupedDetails[uniqueKey].protein = totalProtein / totalQuantity;
                                    groupedDetails[uniqueKey].carbs = totalCarbs / totalQuantity;
                                    groupedDetails[uniqueKey].fats = totalFats / totalQuantity;
                                    groupedDetails[uniqueKey].fiber = totalFiber / totalQuantity;
                                    groupedDetails[uniqueKey].sodium = totalSodium / totalQuantity;
                                    groupedDetails[uniqueKey].potassium = totalPotassium / totalQuantity;
                                    
                                    // Use notes from the latest detail if available
                                    if (detail.notes) {
                                        groupedDetails[uniqueKey].notes = detail.notes;
                                    }
                                }
                            }
                        });

                        // Add consolidated products to mealProducts
                        Object.values(groupedDetails).forEach((product) => {
                            // Determine unit for this product
                            const unit = this.determineFoodUnit({
                                food_type: product.category,
                                name: product.name,
                                description: product.description,
                                serving_description: product.serving_description
                            });
                            
                            // Store original label serving for scaling
                            const originalLabelServing = product.label_serving || product.serving_description || '';
                            
                            this.mealProducts[product.mealKey].push({
                                name: product.name,
                                description: product.description,
                                serving_description:
                                    product.serving_description,
                                normalized_serving: product.normalized_serving !== null && product.normalized_serving !== undefined 
                                    ? product.normalized_serving 
                                    : null,
                                label_serving: product.label_serving !== null && product.label_serving !== undefined 
                                    ? product.label_serving 
                                    : null,
                                unit: unit, // Store unit (gm or ml)
                                original_label_serving: originalLabelServing, // Store for scaling
                                calories: product.calories,
                                protein: product.protein,
                                carbs: product.carbs,
                                fats: product.fats,
                                fiber: product.fiber || 0,
                                sodium: product.sodium || 0,
                                potassium: product.potassium || 0,
                                notes: product.notes !== null && product.notes !== undefined ? product.notes : null,
                                food_id: product.food_id,
                                id: product.food_id,
                                category: product.category,
                                quantity: product.quantity,
                                unit: unit, // Store unit (gm or ml)
                                original_label_serving: originalLabelServing, // Store for scaling
                                // Store original nutrition values for proportional scaling
                                original_calories: product.calories || 0,
                                original_protein: product.protein || 0,
                                original_carbohydrate: product.carbs || 0,
                                original_fat: product.fats || 0,
                                original_fiber: product.fiber || 0,
                                original_sodium: product.sodium || 0,
                                original_potassium: product.potassium || 0,
                            });
                        });
                        
                        // Calculate current intake after loading meal products
                        this.calculateCurrentIntake();
                    } else {
                        // If no selected foods exist, ensure currentIntake is reset to zeros
                        this.calculateCurrentIntake();
                    }

                    // Store the template ID and creation date for update
                    this.editingTemplateId = templateId;
                    this.editingTemplateDateCreated = nutrition.created_at ? 
                        new Date(nutrition.created_at).toLocaleDateString('en-US', {
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric'
                        }) : this.getCurrentDateFormatted();
                    
                    // Store creator name and last modified date
                    this.editingTemplateCreator = nutrition.creator_name || this.currentUserName || 'Admin';
                    this.editingTemplateLastModified = nutrition.updated_at ? 
                        new Date(nutrition.updated_at).toLocaleDateString('en-US', {
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric'
                        }) : this.getCurrentDateFormatted();

                    // Open the modal AFTER setting the data
                    this.isEditing = true;
                    this.showCreateTemplateModal = true;

                    // Focus on the first input field when modal opens
                    this.$nextTick(() => {
                        const firstInput =
                            document.getElementById("templateNameEdit");
                        const descriptionInput =
                            document.getElementById("templateDescriptionEdit");
                        if (firstInput) {
                            // Force update the input value if it's not showing correctly
                            if (firstInput.value !== this.newTemplate.name) {
                                firstInput.value = this.newTemplate.name;
                                // Trigger input event to update Vue model
                                firstInput.dispatchEvent(new Event('input', { bubbles: true }));
                            }
                            firstInput.focus();
                        }
                        if (descriptionInput) {
                            // Force update the textarea value if it's not showing correctly
                            if (descriptionInput.value !== this.newTemplate.description) {
                                descriptionInput.value = this.newTemplate.description;
                                // Trigger input event to update Vue model
                                descriptionInput.dispatchEvent(new Event('input', { bubbles: true }));
                            }
                        }
                        // Auto-resize description textarea after content is loaded
                        this.autoResizeDescriptionTextarea();
                    });
                } else {
                    this.showErrorMessage(
                        "Failed to fetch nutrition plan data"
                    );
                }
            } catch (error) {
                this.showErrorMessage(
                    "Failed to fetch nutrition plan data. Please try again."
                );
            }
        },
        openAddProductModal(mealKey) {
            this.addProductMealKey = mealKey;
            this.currentMealKey = mealKey;
            this.newProductName = "";
            this.multipleProductsText = "";
            this.showAddProductModal = true;
            // Fetch foods with pagination when modal opens
            this.fetchAllFoods(true, false);
            this.$nextTick(() => {
                const input = document.getElementById("productName");
                if (input) input.focus();
            });
        },
        closeAddProductModal() {
            this.showAddProductModal = false;
            this.addProductMealKey = "";
            this.currentMealKey = "";
            this.newProductName = "";
            this.multipleProductsText = "";
        },

        // Fetch foods from backend with pagination and search (used in Add Single Product)
        async fetchAllFoods(resetPage = false, append = false) {
            try {
                if (resetPage) {
                    this.foodsCurrentPage = 1;
                    if (!append) {
                        this.fetchedProducts = [];
                    }
                }

                if (append) {
                    this.foodsLoadingMore = true;
                } else {
                    this.loadingFoods = true;
                }
                this.foodsError = null;

                const params = {
                    page: this.foodsCurrentPage,
                    per_page: this.foodsPerPage,
                };

                // Add search parameter if provided
                if (this.newProductName && this.newProductName.trim()) {
                    params.search = this.newProductName.trim();
                }

                // Add food_type filter if selected
                if (this.selectedProductCategory && this.selectedProductCategory.trim()) {
                    params.food_type = this.selectedProductCategory.trim();
                }

                const response = await axios.get("/foods", { params });

                if (response.data.success) {
                    const newFoods = response.data.data || [];
                    
                    if (append) {
                        // Append new foods to existing list
                        this.fetchedProducts = [...this.fetchedProducts, ...newFoods];
                    } else {
                        // Replace existing foods
                        this.$set(this, 'fetchedProducts', newFoods);
                    }

                    // Update pagination info
                    if (response.data.pagination) {
                        this.foodsTotal = response.data.pagination.total || 0;
                        this.foodsLastPage = response.data.pagination.last_page || 1;
                        this.foodsCurrentPage = response.data.pagination.current_page || 1;
                    }
                } else {
                    throw new Error(
                        response.data.message || "Failed to fetch foods"
                    );
                }
            } catch (error) {
                this.foodsError =
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to fetch foods from database";
            } finally {
                this.loadingFoods = false;
                this.foodsLoadingMore = false;
            }
        },

        // Load more foods (for infinite scroll or load more button)
        async loadMoreFoods() {
            if (this.foodsCurrentPage < this.foodsLastPage && !this.foodsLoadingMore) {
                this.foodsCurrentPage++;
                await this.fetchAllFoods(false, true);
            }
        },

        // Add fetched product to meal
        addFetchedProductToMeal(product) {
            if (!this.mealProducts[this.currentMealKey]) {
                this.$set(this.mealProducts, this.currentMealKey, []);
            }

            // Determine unit based on food type or name
            const unit = this.determineFoodUnit(product);
            
            const productWithData = {
                name: product.name,
                description: product.description,
                serving_description: product.serving_description,
                normalized_serving: product.normalized_serving || product.serving_description || '',
                label_serving: product.label_serving || product.serving_description || '',
                unit: unit, // Store unit (gm or ml)
                original_label_serving: product.label_serving || product.serving_description || '', // Store original for scaling
                calories: product.calories,
                fat: product.fat,
                saturated_fat: product.saturated_fat,
                trans_fat: product.trans_fat,
                polyunsaturated_fat: product.polyunsaturated_fat,
                monounsaturated_fat: product.monounsaturated_fat,
                cholesterol: product.cholesterol,
                sodium: product.sodium,
                carbohydrate: product.carbohydrate,
                fiber: product.fiber,
                sugar: product.sugar,
                protein: product.protein,
                vitamin_d: product.vitamin_d,
                calcium: product.calcium,
                iron: product.iron,
                potassium: product.potassium,
                vitamin_a: product.vitamin_a,
                vitamin_c: product.vitamin_c,
                food_type: product.food_type,
                fatsecret_url: product.fatsecret_url,
                food_id: product.id, // Use product.id consistently
                id: product.id,
                category: product.food_type || product.category || "",
                quantity: 1,
                notes: product.notes || null,
                // Store original nutrition values for proportional scaling
                original_calories: product.calories || 0,
                original_protein: product.protein || 0,
                original_carbohydrate: product.carbohydrate || product.carbs || 0,
                original_fat: product.fat || 0,
                original_fiber: product.fiber || 0,
                original_sodium: product.sodium || 0,
                original_potassium: product.potassium || 0,
            };

            // Check if product already exists
            const existingIndex = this.findExistingProduct(
                this.currentMealKey,
                productWithData
            );

            if (existingIndex !== -1) {
                // Product exists, increase quantity
                // Ensure quantity is a number, default to 1 if it doesn't exist
                const currentQuantity =
                    parseFloat(
                        this.mealProducts[this.currentMealKey][existingIndex]
                            .quantity
                    ) || 1;
                this.$set(
                    this.mealProducts[this.currentMealKey][existingIndex],
                    "quantity",
                    currentQuantity + 1
                );
                const newQuantity =
                    this.mealProducts[this.currentMealKey][existingIndex]
                        .quantity;
                this.showQuantityIncreasedMessage(
                    productWithData.name,
                    newQuantity
                );
            } else {
                // Product doesn't exist, add new
                this.mealProducts[this.currentMealKey].push(productWithData);
            }
            this.calculateCurrentIntake();
        },

        // Select a product from the fetched list
        selectProduct(product) {
            this.selectedProduct = product;
            this.newProductName = product.name;
        },

        // Filter products based on search input (debounced server-side search)
        filterProducts() {
            // Clear existing debounce timer
            if (this.foodsSearchDebounceTimer) {
                clearTimeout(this.foodsSearchDebounceTimer);
            }

            // Set new debounce timer (500ms delay)
            this.foodsSearchDebounceTimer = setTimeout(() => {
                // Reset to page 1 when searching
                this.fetchAllFoods(true, false);
            }, 500);
        },

        filterMembers() {
            // First, filter to only show active members (current members)
            const activeMembers = this.members.filter((member) => {
                // Check both Statuses (backend field) and status (sample data field) for compatibility
                const status = member.Statuses || member.status || '';
                return status.toLowerCase() === 'active';
            });

            // Then apply search query filter if there is one
            if (!this.memberSearchQuery.trim()) {
                this.filteredMembers = [...activeMembers];
            } else {
                const query = this.memberSearchQuery.toLowerCase();
                this.filteredMembers = activeMembers.filter((member) => {
                    const name = (
                        member.membername ||
                        member.firstname + " " + member.lastname
                    ).toLowerCase();
                    const email = (member.email || "").toLowerCase();
                    const id = (
                        member.getFormattedMemberId
                            ? member.getFormattedMemberId()
                            : "M-" + member.id
                    ).toLowerCase();

                    return (
                        name.includes(query) ||
                        email.includes(query) ||
                        id.includes(query)
                    );
                });
            }
        },

        showAllMembers() {
            this.showMemberDropdown = true;
            this.filterMembers();
        },

        getMemberStatusClass(member) {
            if (member.status === "active") return "status-active";
            if (member.status === "inactive") return "status-inactive";
            return "status-pending";
        },

        getMemberStatusText(member) {
            if (member.status === "active") return "Active";
            if (member.status === "inactive") return "Inactive";
            return "Pending";
        },

        loadSampleMembers() {
            this.members = [
                {
                    id: 1,
                    firstname: "John",
                    lastname: "Doe",
                    membername: "John Doe",
                    email: "john.doe@example.com",
                    status: "active",
                    getFormattedMemberId: () => "M-001",
                },
                {
                    id: 2,
                    firstname: "Jane",
                    lastname: "Smith",
                    membername: "Jane Smith",
                    email: "jane.smith@example.com",
                    status: "active",
                    getFormattedMemberId: () => "M-002",
                },
                {
                    id: 3,
                    firstname: "Mike",
                    lastname: "Johnson",
                    membername: "Mike Johnson",
                    email: "mike.johnson@example.com",
                    status: "inactive",
                    getFormattedMemberId: () => "M-003",
                },
            ];
            this.filteredMembers = [...this.members];
        },

        addSingleProduct() {
            if (!this.newProductName.trim())
                return;
            if (!this.mealProducts[this.currentMealKey]) {
                this.$set(this.mealProducts, this.currentMealKey, []);
            }

            // If a product was selected from the dropdown, use its complete data
            if (this.selectedProduct) {
                const productWithData = {
                    name: this.selectedProduct.name,
                    description: this.selectedProduct.description,
                    serving_description:
                        this.selectedProduct.serving_description,
                    normalized_serving: this.selectedProduct.normalized_serving || this.selectedProduct.serving_description || '',
                    label_serving: this.selectedProduct.label_serving || this.selectedProduct.serving_description || '',
                    calories: this.selectedProduct.calories,
                    fat: this.selectedProduct.fat,
                    saturated_fat: this.selectedProduct.saturated_fat,
                    trans_fat: this.selectedProduct.trans_fat,
                    polyunsaturated_fat:
                        this.selectedProduct.polyunsaturated_fat,
                    monounsaturated_fat:
                        this.selectedProduct.monounsaturated_fat,
                    cholesterol: this.selectedProduct.cholesterol,
                    sodium: this.selectedProduct.sodium,
                    carbohydrate: this.selectedProduct.carbohydrate,
                    fiber: this.selectedProduct.fiber,
                    sugar: this.selectedProduct.sugar,
                    protein: this.selectedProduct.protein,
                    vitamin_d: this.selectedProduct.vitamin_d,
                    calcium: this.selectedProduct.calcium,
                    iron: this.selectedProduct.iron,
                    potassium: this.selectedProduct.potassium,
                    vitamin_a: this.selectedProduct.vitamin_a,
                    vitamin_c: this.selectedProduct.vitamin_c,
                    food_type: this.selectedProduct.food_type,
                    fatsecret_url: this.selectedProduct.fatsecret_url,
                    food_id: this.selectedProduct.id, // Use product.id consistently
                    category: this.selectedProduct.food_type || this.selectedProduct.category || "",
                    quantity: 1,
                    notes: this.selectedProduct.notes || null,
                };

                // Check if product already exists

                const existingIndex = this.findExistingProduct(
                    this.currentMealKey,
                    productWithData
                );

                if (existingIndex !== -1) {
                    // Product exists, increase quantity
                    // Ensure quantity is a number, default to 1 if it doesn't exist
                    const currentQuantity =
                        parseFloat(
                            this.mealProducts[this.currentMealKey][
                                existingIndex
                            ].quantity
                        ) || 1;
                    this.$set(
                        this.mealProducts[this.currentMealKey][existingIndex],
                        "quantity",
                        currentQuantity + 1
                    );
                    const newQuantity =
                        this.mealProducts[this.currentMealKey][existingIndex]
                            .quantity;
                    this.showQuantityIncreasedMessage(
                        productWithData.name,
                        newQuantity
                    );
                } else {
                    // Product doesn't exist, add new
                    this.mealProducts[this.currentMealKey].push(
                        productWithData
                    );
                }
            } else {
                // Fallback to manual entry
                const productWithCategory = {
                    name: this.newProductName.trim(),
                    category: "",
                    quantity: 1,
                };

                // Check if product already exists
                const existingIndex = this.findExistingProduct(
                    this.currentMealKey,
                    productWithCategory
                );

                if (existingIndex !== -1) {
                    // Product exists, increase quantity
                    // Ensure quantity is a number, default to 1 if it doesn't exist
                    const currentQuantity =
                        parseFloat(
                            this.mealProducts[this.currentMealKey][
                                existingIndex
                            ].quantity
                        ) || 1;
                    this.$set(
                        this.mealProducts[this.currentMealKey][existingIndex],
                        "quantity",
                        currentQuantity + 1
                    );
                    const newQuantity =
                        this.mealProducts[this.currentMealKey][existingIndex]
                            .quantity;
                    this.showQuantityIncreasedMessage(
                        productWithCategory.name,
                        newQuantity
                    );
                } else {
                    // Product doesn't exist, add new
                    this.mealProducts[this.currentMealKey].push(
                        productWithCategory
                    );
                }
            }

            this.newProductName = "";
            this.selectedProduct = null;
            this.calculateCurrentIntake();
            // Keep fetchedProducts loaded since we're loading all foods upfront
            this.$nextTick(() => {
                const input = document.getElementById("productName");
                if (input) input.focus();
            });
        },

        removeProductFromMeal(mealKey, index) {
            if (
                this.mealProducts[mealKey] &&
                this.mealProducts[mealKey][index]
            ) {
                this.mealProducts[mealKey].splice(index, 1);
                this.calculateCurrentIntake();
            }
        },

        increaseQuantity(mealKey, index) {
            if (
                this.mealProducts[mealKey] &&
                this.mealProducts[mealKey][index]
            ) {
                // Ensure quantity is a number, default to 1 if it doesn't exist or is invalid
                const currentQuantity =
                    parseFloat(this.mealProducts[mealKey][index].quantity) || 1;
                const newQuantity = currentQuantity + 1;

                // Set the new quantity as a number
                this.$set(
                    this.mealProducts[mealKey][index],
                    "quantity",
                    newQuantity
                );
                this.calculateCurrentIntake();
            }
        },

        decreaseQuantity(mealKey, index) {
            if (
                this.mealProducts[mealKey] &&
                this.mealProducts[mealKey][index]
            ) {
                // Ensure quantity is a number, default to 1 if it doesn't exist or is invalid
                const currentQuantity =
                    parseFloat(this.mealProducts[mealKey][index].quantity) || 1;

                // Decrease quantity by 1, but don't go below 1
                if (currentQuantity > 1) {
                    this.$set(
                        this.mealProducts[mealKey][index],
                        "quantity",
                        currentQuantity - 1
                    );
                } else {
                    // If quantity would become 0, remove the product
                    this.mealProducts[mealKey].splice(index, 1);
                }
                this.calculateCurrentIntake();
            }
        },

        // Helper method to find existing product by food_id or name
        findExistingProduct(mealKey, productToAdd) {
            if (!this.mealProducts[mealKey]) return -1;

            const foundIndex = this.mealProducts[mealKey].findIndex(
                (existingProduct) => {

                    // First try to match by food_id (most reliable)
                    if (productToAdd.food_id && existingProduct.food_id) {
                        // Convert both to strings for comparison to handle type mismatches
                        const foodIdMatch =
                            String(productToAdd.food_id) ===
                            String(existingProduct.food_id);
                        if (foodIdMatch) return true;
                    }

                    // Also check id field as fallback
                    if (productToAdd.id && existingProduct.id) {
                        const idMatch =
                            String(productToAdd.id) ===
                            String(existingProduct.id);
                        if (idMatch) return true;
                    }

                    // Check if food_id matches id
                    if (productToAdd.food_id && existingProduct.id) {
                        const crossMatch =
                            String(productToAdd.food_id) ===
                            String(existingProduct.id);
                        if (crossMatch) return true;
                    }

                    if (productToAdd.id && existingProduct.food_id) {
                        const crossMatch2 =
                            String(productToAdd.id) ===
                            String(existingProduct.food_id);
                        if (crossMatch2) return true;
                    }

                    // Fallback to name matching (case insensitive)
                    if (productToAdd.name && existingProduct.name) {
                        const nameMatch =
                            productToAdd.name.toLowerCase() ===
                            existingProduct.name.toLowerCase();
                        if (nameMatch) return true;
                    }

                    return false;
                }
            );

            return foundIndex;
        },

        getMealName(mealKey) {
            const mealNames = {
                breakfast: "Breakfast",
                lunch: "Lunch",
                dinner: "Dinner",
                snacks1: "Snacks (Morning)",
                snacks2: "Snacks (Afternoon)",
                snacks3: "Snacks (Evening)",
            };
            return mealNames[mealKey] || mealKey;
        },

        deleteClubPlan(planId) {
            if (confirm("Are you sure you want to delete this meal plan?")) {
                alert(`Deleting club plan ID: ${planId}`);
            }
        },

        // Delete template method
        async deleteTemplate(templateId) {
            // Find template name for confirmation message
            const template = this.mealPlanTemplates.find(t => t.id === templateId);
            const templateName = template ? template.name : 'this meal plan template';

            // If SweetAlert is not available, fall back to browser confirm
            if (typeof this.$swal === "undefined") {
                const confirmed = confirm(
                    `Are you sure you want to delete "${templateName}"?\n\n` +
                    `This action cannot be undone.`
                );

                if (!confirmed) {
                    return;
                }

                try {
                    const response = await axios.delete(`nutrition/${templateId}`);
                    
                    if (response.data.success || response.status === 200) {
                        this.mealPlanTemplates = this.mealPlanTemplates.filter(t => t.id !== templateId);
                        this.makeToast("success", `Template "${templateName}" deleted successfully!`, "Success");
                    } else {
                        throw new Error(response.data.message || 'Failed to delete template');
                    }
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        this.mealPlanTemplates = this.mealPlanTemplates.filter(t => t.id !== templateId);
                        this.makeToast("success", `Template "${templateName}" deleted successfully!`, "Success");
                    } else {
                        this.makeToast("danger", "Failed to delete template: " + (error.message || "Unknown error"), "Error");
                    }
                }

                return;
            }

            // SweetAlert confirmation flow
            this.$swal({
                title: "Delete Template",
                text: `Are you sure you want to delete "${templateName}"? This action cannot be undone.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel",
            }).then(async (result) => {
                // Support both SweetAlert2 v8 (result.value) and v11+ (result.isConfirmed)
                if (!result || (!result.value && !result.isConfirmed)) {
                    return;
                }

                try {
                    const response = await axios.delete(`nutrition/${templateId}`);
                    
                    if (response.data.success || response.status === 200) {
                        // Remove template from local array
                        this.mealPlanTemplates = this.mealPlanTemplates.filter(t => t.id !== templateId);
                        
                        // Show success toast
                        this.makeToast("success", `Template "${templateName}" deleted successfully!`, "Success");
                    } else {
                        throw new Error(response.data.message || 'Failed to delete template');
                    }
                } catch (error) {
                    // If API doesn't exist yet, remove from local array for demo purposes
                    if (error.response && error.response.status === 404) {
                        this.mealPlanTemplates = this.mealPlanTemplates.filter(t => t.id !== templateId);
                        this.makeToast("success", `Template "${templateName}" deleted successfully!`, "Success");
                    } else {
                        const message = error.response?.data?.message || error.message || "Failed to delete template. Please try again.";
                        this.makeToast("danger", message, "Error");
                    }
                }
            });
        },
        editClubPlan(planId) {
            this.scheduleForm = {
                planId,
                startDate: "",
                cycleDuration: "",
                endDate: "",
                days: [],
            };
            this.showScheduleModal = true;
        },
        scheduleClubPlan(planId) {
            alert(`Scheduling club plan ID: ${planId}`);
        },
        showMoreInfo(planId) {
            alert(`Showing more information for club plan ID: ${planId}`);
        },
        closeScheduleModal() {
            this.showScheduleModal = false;
        },
        scheduleMealPlan() {
            // You can add validation and actual scheduling logic here
            alert(
                `Scheduled plan ID: ${this.scheduleForm.planId}\nStart: ${
                    this.scheduleForm.startDate
                }\nDuration: ${this.scheduleForm.cycleDuration}\nEnd: ${
                    this.scheduleForm.endDate
                }\nDays: ${this.scheduleForm.days.join(", ")}`
            );
            this.closeScheduleModal();
        },


        toggleMacroEnabled(macroType) {
            this.enabledMacros[macroType] = !this.enabledMacros[macroType];

            // Clear the value when disabling a macro
            if (!this.enabledMacros[macroType]) {
                switch (macroType) {
                    case "carbs":
                        this.newTemplate.carbs = null;
                        break;
                    case "proteins":
                        this.newTemplate.protein = null;
                        break;
                    case "fats":
                        this.newTemplate.fats = null;
                        break;
                }
            }

            // Show feedback message
            const status = this.enabledMacros[macroType]
                ? "enabled"
                : "disabled";
            this.showMacroToggleMessage(macroType, status);
        },

        showMacroToggleMessage(macroType, status) {
            // Create a temporary message element
            const messageDiv = document.createElement("div");
            messageDiv.className = "macro-toggle-message";
            messageDiv.textContent = `${
                macroType.charAt(0).toUpperCase() + macroType.slice(1)
            } ${status}`;
            messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${status === "enabled" ? "#4CAF50" : "#f44336"};
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
      `;

            document.body.appendChild(messageDiv);

            // Remove after 2 seconds
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 2000);
        },

        // Meals Tab Methods - with pagination
        async fetchMeals(resetPage = false, append = false) {
            try {
                if (resetPage) {
                    this.mealsCurrentPage = 1;
                    if (!append) {
                        this.allMeals = [];
                        this.filteredMeals = [];
                    }
                }

                if (append) {
                    this.mealsLoadingMore = true;
                } else {
                    this.loadingMeals = true;
                }
                this.mealsError = null;

                const params = {
                    page: this.mealsCurrentPage,
                    per_page: this.mealsPerPage,
                };

                // Add search parameter if provided
                if (this.mealsSearchQuery && this.mealsSearchQuery.trim()) {
                    params.search = this.mealsSearchQuery.trim();
                }

                // Add food_type filter if selected
                if (this.selectedFoodType && this.selectedFoodType.trim()) {
                    params.food_type = this.selectedFoodType.trim();
                }

                // Add sorting if specified
                if (this.sortColumn) {
                    params.sort_by = this.sortColumn;
                    params.sort_order = this.sortDirection;
                }

                const response = await axios.get("/foods", { params });

                if (response.data.success) {
                    const newMeals = response.data.data || [];
                    
                    if (append) {
                        // Append new meals to existing list
                        this.allMeals = [...this.allMeals, ...newMeals];
                        this.filteredMeals = [...this.allMeals];
                    } else {
                        // Replace existing meals
                        this.allMeals = newMeals;
                        this.filteredMeals = [...this.allMeals];
                    }

                    // Update pagination info
                    if (response.data.pagination) {
                        this.mealsTotal = response.data.pagination.total || 0;
                        this.mealsLastPage = response.data.pagination.last_page || 1;
                        this.mealsCurrentPage = response.data.pagination.current_page || 1;
                    }
                } else {
                    throw new Error(
                        response.data.message || "Failed to fetch meals"
                    );
                }
            } catch (error) {
                this.mealsError =
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to load meals";
            } finally {
                this.loadingMeals = false;
                this.mealsLoadingMore = false;
            }
        },

        // Delete a meal from the Foods database (Meals tab)
        async deleteMealFromDatabase(meal) {
            if (!meal || !meal.id) {
                return;
            }

            const mealName = meal.name || "this meal";

            // If SweetAlert is not available, fall back to browser confirm
            if (typeof this.$swal === "undefined") {
                const confirmed = confirm(
                    `Are you sure you want to delete "${mealName}" from the foods database?\n\n` +
                    `This action cannot be undone.`
                );

                if (!confirmed) {
                    return;
                }

                try {
                    await axios.delete(`/foods/${meal.id}`);

                    // Remove meal locally so UI updates immediately
                    this.allMeals = (this.allMeals || []).filter(m => m.id !== meal.id);
                    this.filteredMeals = (this.filteredMeals || []).filter(m => m.id !== meal.id);
                    if (typeof this.mealsTotal === "number") {
                        this.mealsTotal = Math.max(0, this.mealsTotal - 1);
                    }

                    alert(`Meal "${mealName}" deleted successfully.`);
                } catch (error) {
                    const message =
                        error.response?.data?.message ||
                        "Failed to delete meal. Please try again.";
                    alert(message);
                }

                return;
            }

            // SweetAlert confirmation flow
            this.$swal({
                title: "Delete Meal",
                text: `Are you sure you want to delete "${mealName}" from the foods database? This action cannot be undone.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel",
            }).then(async (result) => {
                // Support both SweetAlert2 v8 (result.value) and v11+ (result.isConfirmed)
                if (!result || (!result.value && !result.isConfirmed)) {
                    return;
                }

                try {
                    const response = await axios.delete(`/foods/${meal.id}`);

                    // Assume success if no error is thrown; some APIs return { success: true }
                    if (response.data && response.data.success === false) {
                        throw new Error(response.data.message || "Failed to delete meal");
                    }

                    // Update local collections so the table refreshes without refetch
                    this.allMeals = (this.allMeals || []).filter(m => m.id !== meal.id);
                    this.filteredMeals = (this.filteredMeals || []).filter(m => m.id !== meal.id);
                    if (typeof this.mealsTotal === "number") {
                        this.mealsTotal = Math.max(0, this.mealsTotal - 1);
                    }

                    this.$swal(
                        "Deleted!",
                        `Meal "${mealName}" has been deleted successfully.`,
                        "success"
                    );
                } catch (error) {
                    const message =
                        error.response?.data?.message ||
                        error.message ||
                        "Failed to delete meal. Please try again.";

                    this.$swal("Error", message, "error");
                }
            });
        },

        // Load more meals (for infinite scroll or load more button)
        async loadMoreMeals() {
            if (this.mealsCurrentPage < this.mealsLastPage && !this.mealsLoadingMore) {
                this.mealsCurrentPage++;
                await this.fetchMeals(false, true);
            }
        },

        // Jump to specific page
        async jumpToPage() {
            const targetPage = parseInt(this.jumpToPageInput);
            
            // Validate page number
            if (!targetPage || targetPage < 1 || targetPage > this.mealsLastPage) {
                this.$swal({
                    title: "Invalid Page",
                    text: `Please enter a page number between 1 and ${this.mealsLastPage}`,
                    icon: "warning",
                    confirmButtonText: "OK",
                });
                return;
            }
            
            // If already on this page, do nothing
            if (targetPage === this.mealsCurrentPage) {
                this.jumpToPageInput = ''; // Clear input
                return;
            }
            
            // Reset and fetch the target page directly
            this.mealsCurrentPage = targetPage;
            this.jumpToPageInput = ''; // Clear input
            
            // Fetch the target page (this will replace current meals)
            await this.fetchMeals(true, false);
            
            // Scroll to top of table for better UX
            this.$nextTick(() => {
                const tableContainer = document.querySelector('.meals-table-container');
                if (tableContainer) {
                    tableContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        },

        async fetchFoodTypes() {
            try {
                const response = await axios.get("/foods/food-types");

                if (response.data.success) {
                    const rawTypes = response.data.data || [];

                    const FOOD_TYPE_CANONICAL = {
                        // Beverages / drinks
                        beverage: "Beverages",
                        beverages: "Beverages",
                        drink: "Beverages",
                        drinks: "Beverages",

                        // Snacks / meals
                        snack: "Snacks",
                        snacks: "Snacks",
                        meal: "Meals",
                        meals: "Meals",

                        // Main meals
                        breakfast: "Breakfast",
                        breakfasts: "Breakfast",
                        lunch: "Lunch",
                        lunches: "Lunch",
                        dinner: "Dinner",
                        dinners: "Dinner",
                        "main course": "Main course",
                        "main-course": "Main course",
                        "maincourse": "Main course",

                        // Courses / sides
                        dessert: "Desserts",
                        desserts: "Desserts",
                        side: "Side dishes",
                        sides: "Side dishes",
                        "side dish": "Side dishes",
                        "side dishes": "Side dishes",
                        "side-dish": "Side dishes",
                        "side-dishes": "Side dishes",

                        // Produce
                        // fruit: "Fruits",
                        // fruits: "Fruits",
                        // "fruit juice": "Fruit Juices",
                        // "fruit juices": "Fruit Juices",
                        // "fruit-juice": "Fruit Juices",
                        // "fruit-juices": "Fruit Juices",
                        // "fruitjuice": "Fruit Juices",
                        // "fruitjuices": "Fruit Juices",
                        // "fruit-juices": "Fruit Juices",
                        // "fruitjuices": "Fruit Juices",
                        // "fruit-juices": "Fruit Juices",
                        // "fruitjuices": "Fruit Juices",
                        vegetable: "Vegetables",
                        vegetables: "Vegetables",
                        legume: "Legumes",
                        legumes: "Legumes",

                        // Macros
                        protein: "Protein",
                        proteins: "Protein",
                        carb: "Carbs",
                        carbs: "Carbs",
                        carbohydrate: "Carbs",
                        carbohydrates: "Carbs",
                        fat: "Fats",
                        fats: "Fats",

                        // Other common groups
                        dairy: "Dairy",
                        seafood: "Seafood",
                        fish: "Seafood",
                        "fish & seafood": "Seafood",
                        "fish and seafood": "Seafood",
                        "fish-and-seafood": "Seafood",
                        poultry: "Poultry",
                        meat: "Meat",
                        meats: "Meat",
                        grain: "Grains",
                        grains: "Grains",
                        cereal: "Grains",
                        cereals: "Grains",
                        "grains and cereals": "Grains",
                        "grains-and-cereals": "Grains",
                        "grainsandcereals": "Grains",
                        nut: "Nuts & seeds",
                        nuts: "Nuts & seeds",
                        seed: "Nuts & seeds",
                        seeds: "Nuts & seeds",
                        "nuts and seeds": "Nuts & seeds",
                        "nuts-and-seeds": "Nuts & seeds",
                        "nutsandseeds": "Nuts & seeds",
                        supplement: "Supplements",
                        supplements: "Supplements",

                        // Soups
                        soup: "Soups",
                        soups: "Soups",

                        // Pasta/Rice/Noodles
                        pasta: "Pasta, rice & noodles",
                        rice: "Pasta, rice & noodles",
                        noodles: "Pasta, rice & noodles",
                        "pasta rice and noodles": "Pasta, rice & noodles",
                        "pasta-rice-and-noodles": "Pasta, rice & noodles",
                        "pasta-rice-noodles": "Pasta, rice & noodles",
                        "pastaandriceandnoodles": "Pasta, rice & noodles",

                        // Salads
                        salad: "Salads",
                        salads: "Salads",

                        // Spreads
                        spread: "Spreads",
                        spreads: "Spreads",

                        // Traditional
                        traditional: "Traditional",
                        "traditional food": "Traditional",
                        "traditional foods": "Traditional",

                        // Vegetarian
                        vegetarian: "Vegetarian",
                        "vegetarian food": "Vegetarian",
                        "vegetarian foods": "Vegetarian",

                        // Fast food variations
                        "fast food": "Fast food",
                        "fast-food": "Fast food",
                        "fastfood": "Fast food",
                        "fast foods": "Fast food",
                        "fast-foods": "Fast food",
                        "fastfoods": "Fast food",

                        // Misc
                        other: "Other",
                        misc: "Other",
                        miscellaneous: "Other",
                    };

                    const typeMap = new Map();

                    rawTypes
                        .filter(t => {
                            if (typeof t !== "string") {
                                return false;
                            }

                            const trimmed = t.trim();
                            if (!trimmed) {
                                return false;
                            }
                            const numericOnly = /^[0-9]+(\.[0-9]+)?$/;
                            if (numericOnly.test(trimmed)) {
                                return false;
                            }

                            return true;
                        })
                        .forEach(t => {
                            const trimmed = t.trim();
                            let baseKey = trimmed.toLowerCase();
                            const normalizedKey = baseKey
                                .replace(/-/g, " ")
                                .replace(/&/g, "and")
                                .replace(/\s+/g, " ")
                                .trim();

                            let label =
                                FOOD_TYPE_CANONICAL[normalizedKey] ||
                                FOOD_TYPE_CANONICAL[baseKey] ||
                                (trimmed.charAt(0).toUpperCase() +
                                    trimmed.slice(1).toLowerCase());

                            // Use the canonical label (lowercased) as the dedupe key
                            const key = label.toLowerCase();

                            if (!typeMap.has(key)) {
                                typeMap.set(key, label);
                            }
                        });

                    // Convert Map → array of labels
                    let normalized = Array.from(typeMap.values());

                    // Custom sort: letters A–Z first, then numeric-leading entries
                    normalized.sort((a, b) => {
                        const isDigitA = /^\d/.test(a);
                        const isDigitB = /^\d/.test(b);

                        if (isDigitA && !isDigitB) return 1;   // numbers after letters
                        if (!isDigitA && isDigitB) return -1;  // letters before numbers

                        // Case-insensitive alphabetical
                        return a.localeCompare(b, undefined, { sensitivity: "base" });
                    });

                    this.availableFoodTypes = normalized;
                } else {
                }
            } catch (error) {
            }
        },

        filterMeals() {
            // Clear existing debounce timer
            if (this.mealsSearchDebounceTimer) {
                clearTimeout(this.mealsSearchDebounceTimer);
            }

            // Set new debounce timer (500ms delay)
            this.mealsSearchDebounceTimer = setTimeout(() => {
                // Reset to page 1 when filtering/searching
                this.fetchMeals(true, false);
            }, 500);
        },

        clearMealsFilters() {
            this.mealsSearchQuery = "";
            this.selectedFoodType = "";
            // Fetch meals with cleared filters
            this.fetchMeals(true, false);
        },

        sortMeals(column) {
            if (this.sortColumn === column) {
                this.sortDirection =
                    this.sortDirection === "asc" ? "desc" : "asc";
            } else {
                this.sortColumn = column;
                this.sortDirection = "asc";
            }

            this.filteredMeals.sort((a, b) => {
                let aValue = a[column];
                let bValue = b[column];

                // Handle null/undefined values
                if (aValue == null) aValue = "";
                if (bValue == null) bValue = "";

                // Convert to numbers for numeric columns
                if (
                    [
                        "calories",
                        "protein",
                        "carbohydrate",
                        "fat",
                        "fiber",
                        "sugar",
                        "sodium",
                    ].includes(column)
                ) {
                    aValue = parseFloat(aValue) || 0;
                    bValue = parseFloat(bValue) || 0;
                } else {
                    // Convert to strings for text columns
                    aValue = String(aValue).toLowerCase();
                    bValue = String(bValue).toLowerCase();
                }

                if (this.sortDirection === "asc") {
                    return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
                } else {
                    return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
                }
            });
        },

        getSortIcon(column) {
            if (this.sortColumn !== column) return "";
            return this.sortDirection === "asc" ? "fa-sort-up" : "fa-sort-down";
        },

        formatNumber(value) {
            if (value == null || value === "") return "-";
            const num = parseFloat(value);
            return isNaN(num) ? "-" : num.toFixed(1);
        },

        getFoodTypeClass(foodType) {
            if (!foodType) return "general";
            return foodType.toLowerCase().replace(/\s+/g, "-");
        },

        // Pagination Methods
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },

        goToPage(page) {
            this.currentPage = page;
        },

        viewMealDetails(meal) {
            // TODO: Implement meal details modal
            this.makeToast("info", `Viewing details for: ${meal.name}`, "Meal Details");
        },

        // Toast notification method
        makeToast(variant, msg, title) {
            this.$root.$bvToast.toast(msg, {
                title: title,
                variant: variant,
                solid: true,
                autoHideDelay: 3000
            });
        },

        editMeal(meal) {
            this.isEditingMeal = true;
            this.editingMealId = meal.id;
            this.newMeal = { ...meal };
            
            // Reset image preview and file selection when editing
            this.selectedImageFile = null;
            // If meal has an existing image URL, show it in preview
            if (meal.fatsecret_url && !meal.fatsecret_url.startsWith('data:')) {
                this.imagePreview = meal.fatsecret_url;
            } else {
                this.imagePreview = null;
            }
            
            this.showNewMealModal = true;
        },

        // New Meal Modal Methods
        openNewMealModal() {
            this.isEditingMeal = false;
            this.editingMealId = null;
            this.showAdvancedNutrition = false;
            this.resetNewMealForm();
            this.showNewMealModal = true;
        },

        closeNewMealModal() {
            this.showNewMealModal = false;
            this.isEditingMeal = false;
            this.editingMealId = null;
            this.showAdvancedNutrition = false;
            this.resetNewMealForm();
        },

        resetNewMealForm() {
            this.newMeal = {
                name: "",
                description: "",
                serving_description: "",
                food_type: "",
                fatsecret_url: "",
                calories: null,
                protein: null,
                carbohydrate: null,
                fat: null,
                fiber: null,
                sugar: null,
                sodium: null,
                cholesterol: null,
                saturated_fat: null,
                trans_fat: null,
                polyunsaturated_fat: null,
                monounsaturated_fat: null,
                vitamin_a: null,
                vitamin_c: null,
                vitamin_d: null,
                calcium: null,
                iron: null,
                potassium: null,
            };

            // Reset image preview and file
            this.imagePreview = null;
            this.selectedImageFile = null;

            // Clear file input if exists
            if (this.$refs.imageInput) {
                this.$refs.imageInput.value = "";
            }
        },

        handleImageUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            // Validate file size (5MB max)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                this.showErrorMessage(
                    `Image size should be less than 5MB. Selected file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`
                );
                event.target.value = '';
                return;
            }

            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                this.showErrorMessage(
                    'Please select a valid image file (JPG, PNG, GIF, or WebP).'
                );
                event.target.value = '';
                return;
            }

            // Store the file object for upload (not base64)
            this.selectedImageFile = file;

            // Create preview for display only
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imagePreview = e.target.result;
            };
            reader.onerror = () => {
                this.showErrorMessage('Failed to read image file. Please try again.');
                this.selectedImageFile = null;
                this.imagePreview = null;
                event.target.value = '';
            };
            reader.readAsDataURL(file);
        },

        removeImage() {
            this.imagePreview = null;
            this.selectedImageFile = null;
            this.newMeal.fatsecret_url = "";
            // Clear the file input
            if (this.$refs.imageInput) {
                this.$refs.imageInput.value = "";
            }
        },

        async saveNewMeal() {
            try {
                // Validate required fields
                if (!this.newMeal.name || !this.newMeal.name.trim()) {
                    this.showErrorMessage('Meal name is required.');
                    return;
                }

                // Use FormData to handle file upload properly
                const formData = new FormData();
                
                // Add all meal data fields
                formData.append('name', this.newMeal.name.trim());
                formData.append('description', this.newMeal.description?.trim() || '');
                formData.append('serving_description', this.newMeal.serving_description?.trim() || '');
                formData.append('food_type', this.newMeal.food_type || '');
                
                // Add nutrition values
                formData.append('calories', this.newMeal.calories || 0);
                formData.append('protein', this.newMeal.protein || 0);
                formData.append('carbohydrate', this.newMeal.carbohydrate || 0);
                formData.append('fat', this.newMeal.fat || 0);
                formData.append('fiber', this.newMeal.fiber || 0);
                formData.append('sugar', this.newMeal.sugar || 0);
                formData.append('sodium', this.newMeal.sodium || 0);
                formData.append('cholesterol', this.newMeal.cholesterol || 0);
                formData.append('saturated_fat', this.newMeal.saturated_fat || 0);
                formData.append('trans_fat', this.newMeal.trans_fat || 0);
                formData.append('polyunsaturated_fat', this.newMeal.polyunsaturated_fat || 0);
                formData.append('monounsaturated_fat', this.newMeal.monounsaturated_fat || 0);
                formData.append('vitamin_a', this.newMeal.vitamin_a || 0);
                formData.append('vitamin_c', this.newMeal.vitamin_c || 0);
                formData.append('vitamin_d', this.newMeal.vitamin_d || 0);
                formData.append('calcium', this.newMeal.calcium || 0);
                formData.append('iron', this.newMeal.iron || 0);
                formData.append('potassium', this.newMeal.potassium || 0);
                
                // Add image file if selected
                if (this.selectedImageFile) {
                    formData.append('image', this.selectedImageFile);
                } else if (this.newMeal.fatsecret_url && !this.newMeal.fatsecret_url.startsWith('data:')) {
                    // If there's an existing URL (not base64), keep it
                    formData.append('fatsecret_url', this.newMeal.fatsecret_url.trim());
                }

                // Set proper headers for file upload
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                };

                let response;
                if (this.isEditingMeal && this.editingMealId) {
                    formData.append('_method', 'PUT'); // Laravel method spoofing for PUT with FormData
                    response = await axios.post(
                        `/foods/${this.editingMealId}`,
                        formData,
                        config
                    );
                } else {
                    response = await axios.post("/foods", formData, config);
                }
                if (response.data.success) {
                    await this.fetchMeals();
                    this.closeNewMealModal();
                    const action = this.isEditingMeal ? "updated" : "created";
                    this.showSuccessMessage(
                        `Meal "${this.newMeal.name}" ${action} successfully!`
                    );
                } else {
                    throw new Error(
                        response.data.message || "Failed to save meal"
                    );
                }
            } catch (error) {
                const action = this.isEditingMeal ? "update" : "create";
                
                let errorMessage = `Failed to ${action} meal. `;
                if (error.response) {
                    if (error.response.status === 422) {
                        const errors = error.response.data?.errors;
                        if (errors) {
                            const errorList = Object.values(errors).flat().join(', ');
                            errorMessage += `Validation errors: ${errorList}`;
                        } else {
                            errorMessage += error.response.data?.message || 'Validation failed';
                        }
                    } else if (error.response.status === 413) {
                        errorMessage += 'Image file is too large. Maximum size is 5MB.';
                    } else if (error.response.status === 500) {
                        errorMessage += 'Server error occurred. Please try again or contact support.';
                    } else {
                        errorMessage += error.response.data?.message || error.message;
                    }
                } else if (error.request) {
                    errorMessage += 'Network error. Please check your connection and try again.';
                } else {
                    errorMessage += error.message || 'An unexpected error occurred.';
                }
                
                this.showErrorMessage(errorMessage);
            }
        },

        normalizeMealName(rawName) {
            if (!rawName) return "N/A";
            let name = String(rawName).trim();
            name = name.replace(/^"+|"+$/g, "");
            name = name.replace(/\\"/g, '"');
            name = name.replace(/\s+/g, " ");
            return name;
        },
    },
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

.members-page-wrapper {
    width: 100%;
    min-height: 100vh;
    background: $color-background;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none; // Firefox - hide scrollbar
    -ms-overflow-style: none; // IE and Edge - hide scrollbar
    
    // Hide scrollbar for Chrome, Safari and Opera
    &::-webkit-scrollbar {
        display: none;
    }
    
    // Ensure no content touches edges on any screen
    .container-fluid {
        @media (max-width: 576px) {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
        }
    }
}

.nutrition-hub {
    max-width: 1580px;
    width: 100%;
}

.page-header {
    .page-title {
        color: $color-text-dark;
        font-size: $font-size-xl;
        font-weight: 700;
        margin-bottom: 0.25rem;
    }
    .page-subtitle {
        color: $color-muted;
        font-size: $font-size-md;
        margin-bottom: 0;
    }
}

// Breadcrumb and Navigation Row Styles
.breadcrumb-nav-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
}

// Breadcrumb Navigation Styles
.breadcrumb-section {
    flex: 1;
    
    .breadcrumb-nav {
        .breadcrumb-container {
            display: flex;
            align-items: center;
            gap: 1rem;
            
            .back-button {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                color: $color-text-dark;
                cursor: pointer;
                transition: all 0.3s ease;
                
                &:hover {
                    background: rgba(255, 255, 255, 0.15);
                    border-color: rgba(255, 255, 255, 0.3);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    color: $primary;
                }
                
                i {
                    font-size: 1.1em;
                }
            }
            
            .breadcrumb {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin: 0;
                padding: 0;
                background: none;
                border-radius: 0;
                
                .breadcrumb-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: $font-size-sm;
                    color: $color-muted;
                    
                    &.active {
                        color: $color-text-dark;
                        font-weight: 600;
                        
                        i {
                            color: $primary;
                        }
                    }
                    
                    a {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        color: $color-muted;
                        text-decoration: none;
                        transition: color 0.3s ease;
                        
                        &:hover {
                            color: $primary;
                            
                            i {
                                color: $primary;
                            }
                        }
                        
                        i {
                            font-size: 0.9em;
                            transition: color 0.3s ease;
                        }
                    }
                    
                    &:not(:last-child)::after {
                        content: "›";
                        margin-left: 0.5rem;
                        color: $color-muted;
                        font-size: 1.2em;
                    }
                }
            }
        }
    }
}

// Navigation Styles
.navigation {
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    gap: 1rem;
    
    .nav-items {
        display: flex;
        gap: 0.5rem;
        flex: 1;
        overflow-x: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        
        &::-webkit-scrollbar {
            display: none;
        }
        
        .nav-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1rem;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            color: $color-text-dark;
            font-size: $font-size-sm;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
            position: relative;
            min-width: fit-content;
            font-family: $font-family-base;
            outline: none;
            
            // For button elements
            &.tab-button {
                background: none;
                border: none;
            }
            
            .badge {
                background: $primary;
                color: white;
                font-size: 0.75em;
                font-weight: 600;
                padding: 0.25rem 0.5rem;
                border-radius: 12px;
                min-width: 20px;
                text-align: center;
                line-height: 1;
            }
            
            i {
                font-size: 1.1em;
                color: $color-muted;
                transition: color 0.3s ease;
            }
            
            span {
                transition: color 0.3s ease;
            }
            
            &:hover {
                background: rgba(255, 255, 255, 0.15);
                border-color: rgba(255, 255, 255, 0.3);
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                
                i {
                    color: $primary;
                }
                
                span {
                    color: $primary;
                }
            }
            
            &.active {
                color: $primary;
                box-shadow: 0 2px 8px rgba($primary, 0.1);
                
                i {
                    color: $primary;
                }
                
                span {
                    color: $primary;
                    font-weight: 600;
                }
            }
            
            &.with-badge {
                span {
                    margin-right: 0.25rem;
                }
            }
        }
    }
    
    // Navigation Actions (Video Tutorial Button)
    .nav-actions {
        display: flex;
        align-items: center;
        flex-shrink: 0;
    }

    // Mobile Navigation
    .mobile-nav {
        display: none;
        
        .mobile-select {
            width: 100%;
            padding: 0.75rem 1rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            color: $color-text-dark;
            font-size: $font-size-sm;
            font-weight: 500;
            cursor: pointer;
            outline: none;
            transition: all 0.3s ease;
            
            &:focus {
                border-color: rgba($primary, 0.5);
                box-shadow: 0 0 0 2px rgba($primary, 0.1);
            }
            
            option {
                background: $color-card-bg-dark;
                color: $color-text-dark;
                padding: 0.5rem;
            }
        }
    }
}

// Template Info Styles
.template-info {
    display: flex;
    flex-direction: column;
    padding: 0.75rem 1rem;
    margin: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    // border-left: 2px solid $primary;
    gap: 0.5rem;
    
    .info-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .info-label {
            font-size: $font-size-sm;
            color: $color-text-dark;
            font-weight: 500;
        }
        
        .info-value {
            font-size: $font-size-sm;
            color: $color-text-dark;
            font-weight: 600;
        }
    }
}

// Template Description Styles
.template-description {
    padding: 0.75rem 1rem;
    margin: 0 1rem;
    
    .description-text {
        color: $color-text-dark;
        font-size: $font-size-sm;
        line-height: 1.5;
        margin: 0;
        padding: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: all 0.3s ease;
        
        &.description-expanded {
            display: block;
            -webkit-line-clamp: unset;
            line-clamp: unset;
            overflow: visible;
        }
    }
    
    .show-more-btn {
        background: none;
        border: none;
        color: $primary;
        font-size: $font-size-xs;
        font-weight: 600;
        padding: 0.25rem 0;
        margin-top: 0.25rem;
        cursor: pointer;
        text-decoration: none;
        transition: color 0.2s ease;
        display: inline-block;
        
        &:hover {
            color: color.adjust($primary, $lightness: -10%);
            text-decoration: underline;
        }
        
        &:focus {
            outline: none;
            text-decoration: underline;
        }
    }
}

// Template Actions Dropdown Styles
.template-actions {
    margin-left: 1rem;
    
    .dropdown-container {
        position: relative;
        display: inline-block;
        
        .dropdown-trigger {
            background: rgba(220, 53, 69, 0.08);
            border: 1px solid rgba(220, 53, 69, 0.15);
            border-radius: 8px;
            color: #2c3e50;
            padding: 0.625rem 0.875rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 36px;
            height: 36px;
            
            i {
                font-size: 1rem;
                color: #2c3e50;
            }
            
            &:hover {
                background: rgba(220, 53, 69, 0.15);
                border-color: rgba(220, 53, 69, 0.25);
                color: #dc3545;
                
                i {
                    color: #dc3545;
                }
            }
            
            &:focus {
                outline: none;
                box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
            }
        }
        
        .dropdown-menu {
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 99999;
            min-width: 140px;
            padding: 0.25rem 0;
            margin-top: 0.25rem;
            margin-left: -95px;
            animation: dropdownFadeIn 0.2s ease-out;
            display: block;
            
            .dropdown-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                width: 100%;
                padding: 0.5rem 0.75rem;
                background: none;
                border: none;
                color: $color-text-dark;
                font-size: $font-size-sm;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s ease;
                text-align: left;
                
                i {
                    font-size: 0.9em;
                    color: $color-muted;
                    width: 16px;
                    text-align: center;
                }
                
                &:hover {
                    background: rgba($primary, 0.1);
                    color: $primary;
                    
                    i {
                        color: $primary;
                    }
                }
                
                &:active {
                    background: rgba($primary, 0.2);
                }
            }
        }
    }
}

@keyframes dropdownFadeIn {
    from {
        opacity: 0;
        transform: translateY(-5px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}


.tab-content-container {
    background: $color-card-bg;
    border-radius: 12px 12px 12px 12px;
    box-shadow: $shadow-sm;
    padding: 1rem;
    min-height: 350px;
    animation: fadeIn 0.3s;
}

.sub-tab-navigation {
    margin-bottom: 1rem;
    .sub-tab-container {
        display: flex;
        gap: 0.5rem;
        background: color.adjust($color-background, $lightness: 3%);
        border-radius: 8px;
        padding: 0.5rem;
        box-shadow: $shadow-sm;
        justify-content: flex-start;
        overflow-x: auto;
    }
    .sub-tab-button {
        background: none;
        border: none;
        outline: none;
        font-family: $font-family-base;
        font-size: $font-size-sm;
        color: $color-muted;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.2s, color 0.2s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        &.active {
            background: $color-button;
            color: $color-white;
            box-shadow: 0 2px 4px rgba($color-button, 0.2);
        }
        &:hover:not(.active) {
            background: rgba($color-button, 0.1);
            color: $color-text-dark;
        }
        i {
            font-size: 1em;
        }
    }
}

.sub-tab-content {
    animation: fadeIn 0.3s;
    .sub-tab-header {
        margin-bottom: 1rem;
        h4 {
            color: $color-text-dark;
            font-size: $font-size-lg;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        p {
            color: $color-muted;
            font-size: $font-size-base;
            margin: 0;
        }
    }
}

.tab-content {
    padding: 0;
    animation: fadeIn 0.3s;
    width: 100%;
    
    .tab-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        flex-wrap: wrap;
        gap: 1rem;
        
        @media (max-width: 768px) {
            flex-direction: column;
            align-items: flex-start;
        }

        .tab-header-content {
            display: flex;
            align-items: center;
            gap: 1rem;

            h3 {
                color: $color-text-dark;
                font-size: $font-size-lg;
                font-weight: 700;
                margin: 0;
            }

            .tab-subtitle {
                color: $color-muted;
                font-size: $font-size-sm;
                margin: 0;
                font-weight: 400;
            }
        }
        .member-selection {
            display: flex;
            align-items: center;
            gap: 1rem;
            .selected-member {
                background: $color-button;
                color: $color-white;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: $font-size-sm;
                font-weight: 600;
            }
            .clear-btn {
                background: $color-muted;
                color: $color-white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: $font-size-sm;
                cursor: pointer;
                transition: background 0.2s;
                &:hover {
                    background: color.adjust($color-muted, $lightness: -10%);
                }
            }
        }
    }
    h3 {
        color: $color-text-dark;
        font-size: $font-size-lg;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }
    h4 {
        color: $color-heading;
        font-size: $font-size-md;
        font-weight: 600;
        margin-bottom: 0.25rem;
    }
    p,
    ul {
        color: $color-muted;
        font-size: $font-size-base;
        margin-bottom: 0.5rem;
    }
    ul {
        margin-left: 1.5rem;
        li {
            margin-bottom: 0.25rem;
        }
    }
    .member-profile {
        background: $color-info-light;
        border-left: 4px solid $color-button;
        border-radius: 8px;
        padding: 1rem 1rem;
        margin-bottom: 1rem;
        ul {
            margin: 0;
            padding: 0;
            list-style: none;
            li {
                margin-bottom: 0.25rem;
            }
        }
    }
    .filter-section {
        background: $color-card-bg;
        border: 1px solid $color-border-muted;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
        box-shadow: $shadow-sm;

        .search-box {
            position: relative;
            margin-bottom: 0.5rem;

            i {
                position: absolute;
                left: 1rem;
                top: 50%;
                transform: translateY(-50%);
                color: $color-muted;
                z-index: 1;
            }

            .search-input {
                width: 100%;
                padding: 0.75rem 1rem 0.75rem 2.5rem;
                border: 1px solid $color-border-muted;
                border-radius: 6px;
                font-size: $font-size-base;
                background: $color-card-bg;
                color: $color-text-dark;
                transition: border-color 0.2s;

                &:focus {
                    outline: none;
                    border-color: $color-button;
                    box-shadow: 0 0 0 2px rgba($color-button, 0.1);
                }

                &::placeholder {
                    color: $color-muted;
                }
            }
        }

        .filter-options {
            display: flex;
            gap: 1rem;
            margin-bottom: 0.5rem;
            flex-wrap: wrap;

            .filter-select {
                padding: 0.5rem 1rem;
                border: 1px solid $color-border-muted;
                border-radius: 6px;
                background: $color-card-bg;
                color: $color-text-dark;
                font-size: $font-size-sm;
                min-width: 150px;
                cursor: pointer;
                transition: border-color 0.2s;

                &:focus {
                    outline: none;
                    border-color: $color-button;
                }
            }

            .clear-filters-btn {
                background: $color-muted;
                color: $color-white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: $font-size-sm;
                cursor: pointer;
                transition: background 0.2s;
                display: flex;
                align-items: center;
                gap: 0.5rem;

                &:hover {
                    background: color.adjust($color-muted, $lightness: -10%);
                }
            }
        }

        .filter-stats {
            .filter-count {
                color: $color-muted;
                font-size: $font-size-sm;
                font-weight: 600;
            }
        }
    }
    .members-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
    }
    .member-card {
        background: $color-card-bg;
        border: 1px solid $color-border-muted;
        border-radius: 8px;
        box-shadow: $shadow-sm;
        padding: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        &:hover {
            transform: translateY(-2px);
            box-shadow: $shadow-md;
        }
        &.selected {
            border: 2px solid $color-button;
            box-shadow: 0 0 0 3px rgba($color-button, 0.1);
            transform: translateY(-2px);
        }
        .member-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            h4 {
                color: $color-text-dark;
                font-size: $font-size-md;
                margin: 0;
            }
            .progress-badge {
                background: $color-button;
                color: $color-white;
                padding: 0.25rem 0.5rem;
                border-radius: 12px;
                font-size: $font-size-xs;
                font-weight: 600;
            }
        }
        .member-details {
            p {
                margin-bottom: 0.5rem;
                font-size: $font-size-sm;
                strong {
                    color: $color-heading;
                }
            }
        }
        .progress-bar {
            height: 6px;
            background: $color-border-muted;
            border-radius: 3px;
            overflow: hidden;
            margin-top: 1rem;
            .progress-fill {
                height: 100%;
                background: $color-button;
                transition: width 0.3s ease;
            }
        }
        .member-actions {
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid $color-border-muted;
            text-align: center;
        }
    }
    
    // Create Template Button Section
    .create-template-section {
        display: flex;
        justify-content: flex-end;
        margin-bottom: .5rem;
        
        .create-template-btn {
            background: $primary;
            color: white;
            border: none;
            padding: 0.25rem 0.25rem;
            border-radius: 4px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.25rem;
            box-shadow: $shadow-sm;
            
            &:hover {
                background: color.adjust($primary, $lightness: -10%);
                transform: translateY(-2px);
                box-shadow: $shadow-md;
            }
            
            &:active {
                transform: translateY(0);
                box-shadow: $shadow-sm;
            }
            
            i {
                font-size: 0.9rem;
            }
        }
    }
    
    .template-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        margin-bottom: 1rem;
        
        // Responsive: 2 cards per row on medium screens
        @media (max-width: 1200px) {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
        }
        
        // Responsive: 1 card per row on small screens
        @media (max-width: 768px) {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
    }
    .template-card {
        background: $color-card-bg;
        border: 2px solid rgba(220, 53, 69, 0.1);
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
        padding: 0;
        margin: 0;
        transition: box-shadow 0.3s ease;
        overflow: hidden;
        width: 100%;
        min-height: 220px;
        display: flex;
        flex-direction: column;
        position: relative;

        // Content wrapper
        .template-content-wrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            height: 100%;
            flex: 1;
            padding: 0;
            margin: 0;
            width: 100%;
        }
        
        // Main content area: Left (Info/Macros) and Right (Image)
        .template-main-content {
            display: flex;
            flex-direction: row;
            flex: 1;
            min-height: 0;
        }
        
        // Left side: Info and Macros
        .template-left-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 0.75rem;
            background: linear-gradient(
                135deg,
                rgba(248, 249, 250, 0.95) 0%,
                rgba(255, 255, 255, 0.98) 100%
            );
            gap: 0.625rem;
        }
        
        // Right side: Image
        .template-right-image {
            flex: 0 0 35%;
            min-width: 0;
            overflow: hidden;
            background: #f8f9fa;
            display: flex;
            align-items: center;
            justify-content: center;
            
            .template-image-display {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
            }
        }
        
        // Responsive: Stack vertically on mobile
        @media (max-width: 768px) {
            .template-main-content {
                flex-direction: column;
            }
            
            .template-right-image {
                flex: 0 0 160px;
                order: -1; // Image appears first on mobile
            }
            
            .template-left-content {
                padding: 0.625rem;
            }
        }
        
        &:hover {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        .template-top-highlight {
            background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.98) 0%,
                rgba(248, 249, 250, 0.98) 100%
            );
            backdrop-filter: blur(10px) saturate(180%);
            -webkit-backdrop-filter: blur(10px) saturate(180%);
            border-bottom: 2px solid rgba(220, 53, 69, 0.15);
            padding: 0.75rem 1rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
            margin: 0;
            width: 100%;
            box-sizing: border-box;
            border-radius: 12px 12px 0 0;
            position: relative;
            left: 0;
            right: 0;
            
            .highlight-content {
            display: flex;
            justify-content: space-between;
                align-items: center;
                gap: 0.75rem;
                
                .template-name {
                color: #2c3e50;
                font-size: 14px;
                font-weight: 700;
                margin: 0;
                flex: 1;
                letter-spacing: 0.15px;
                line-height: 1.3;
                    
                    .template-link {
                        text-decoration: none;
                        color: #2c3e50;
                        transition: color 0.2s ease;
                        display: block;
                        padding: 0.625rem 1rem;
                        border-radius: 8px;
                        background: rgba(220, 53, 69, 0.08);
                        border: 1px solid rgba(220, 53, 69, 0.15);
                        
                        &:hover {
                            color: #dc3545;
                        }
                    }
                }
                
                .highlight-meta {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    
                .member-count {
                    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
                    color: #ffffff;
                    padding: 0.25rem 0.625rem;
                    border-radius: 12px;
                    font-size: 10px;
                    font-weight: 600;
                    border: none;
                    box-shadow: 0 2px 6px rgba(23, 162, 184, 0.25);
                    white-space: nowrap;
                }
                    
                .status-badge {
                    padding: 0.25rem 0.625rem;
                    border-radius: 12px;
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    border: none;
                    white-space: nowrap;
                        
                    &.active {
                        background: linear-gradient(135deg, #28a745 0%, #218838 100%);
                        color: #ffffff;
                        box-shadow: 0 2px 6px rgba(40, 167, 69, 0.25);
                    }
                        
                    &.inactive {
                        background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
                        color: #ffffff;
                        box-shadow: 0 2px 6px rgba(220, 53, 69, 0.25);
                    }
                }
                }
                
                .template-actions {
                    margin-left: 0.75rem;
                    
                    .dropdown-container {
                        .dropdown-trigger {
                            padding: 0.5rem 0.75rem;
                            border-radius: 6px;
                            transition: background 0.2s ease;
                            
                            &:hover {
                                background: rgba(220, 53, 69, 0.1);
                            }
                        }
                    }
                }
            }
        }
        .template-header {
            h4 {
                color: #ffffff;
                font-size: $font-size-md;
                margin: 0;
                flex: 1;
                margin-right: 1rem;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            }
        }
        
        .template-info {
            padding: 0;
            margin: 0;
            
            .info-item {
                margin-bottom: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 0.375rem;
                border-bottom: 1px solid rgba(220, 53, 69, 0.1);
                
                &:last-child {
                    margin-bottom: 0;
                    padding-bottom: 0;
                    border-bottom: none;
                }
                
                .info-label {
                    color: #6c757d;
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.6px;
                    min-width: 100px;
                }
                
                .info-value {
                    color: #2c3e50;
                    font-size: $font-size-xs;
                    font-weight: 700;
                    text-align: right;
                }
            }
        }
        
        .template-description {
            padding: 0;
            margin: 0;
            
            .description-text {
                color: #495057;
                font-size: 10px;
                margin-bottom: 0.375rem;
                line-height: 1.5;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            
            .show-more-btn {
                color: #dc3545;
                background: rgba(220, 53, 69, 0.1);
                border: 1px solid rgba(220, 53, 69, 0.2);
                font-size: 9px;
                cursor: pointer;
                text-decoration: none;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-weight: 600;
                transition: all 0.2s ease;
                display: inline-block;
                
                &:hover {
                    color: #ffffff;
                    background: #dc3545;
                    border-color: #dc3545;
                }
            }
        }
        
        .macro-info {
            padding: 0;
            margin: 0;
            
            .macro-heading-row {
                margin-bottom: 0.5rem;
                padding-bottom: 0.375rem;
                border-bottom: 2px solid rgba(220, 53, 69, 0.2);
                
                .macro-heading {
                    color: #2c3e50;
                    font-size: 10px;
                    font-weight: 800;
                    margin: 0;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                }
            }
            
            .macro-items-row {
                display: flex;
                flex-direction: column;
                gap: 0.375rem;
                
                .macro-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.375rem;
                    
            .macro-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.375rem 0.5rem;
                background: rgba(220, 53, 69, 0.08);
                border-radius: 4px;
                border: 1px solid rgba(220, 53, 69, 0.15);
                        
                .macro-label {
                    color: #6c757d;
                    font-size: 9px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.3px;
                }
                        
                .macro-value {
                    color: #2c3e50;
                    font-weight: 800;
                    font-size: 10px;
                }
            }
        }
            }
        }
        .member-overview {
            background: linear-gradient(
                135deg,
                $color-info-light 0%,
                color.adjust($color-info-light, $lightness: 5%) 100%
            );
            border: 1px solid $color-info;
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            .overview-header {
                margin-bottom: 1rem;
                h4 {
                    color: $color-button;
                    font-size: $font-size-lg;
                    font-weight: 700;
                    margin: 0;
                }
            }
            .overview-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                .overview-card {
                    background: $color-card-bg;
                    border-radius: 8px;
                    padding: 1rem;
                    text-align: center;
                    box-shadow: $shadow-sm;
                    h5 {
                        color: $color-heading;
                        font-size: $font-size-sm;
                        font-weight: 600;
                        margin-bottom: 0.5rem;
                    }
                    p {
                        color: $color-muted;
                        font-size: $font-size-sm;
                        margin: 0.5rem 0 0 0;
                    }
                    .progress-circle {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        background: $color-button;
                        color: $color-white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 0.5rem;
                        font-weight: 700;
                        font-size: $font-size-sm;
                    }
                    .status-indicator {
                        padding: 0.25rem 0.75rem;
                        border-radius: 12px;
                        font-size: $font-size-xs;
                        font-weight: 600;
                        &.on-track {
                            background: $color-success-light;
                            color: $color-success;
                        }
                        &.under-target {
                            background: $color-warning-light;
                            color: $color-warning;
                        }
                    }
                }
            }
        }
    }
    .diary-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 1.5rem;
        margin-bottom: 1.5rem;
    }
    .diary-card {
        background: $color-card-bg;
        border: 1px solid $color-border-muted;
        border-radius: 8px;
        box-shadow: $shadow-sm;
        padding: 1.25rem;
        transition: all 0.3s ease;
        &:hover {
            transform: translateY(-2px);
            box-shadow: $shadow-md;
        }
        .diary-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            h4 {
                color: $color-button;
                font-size: $font-size-md;
                margin: 0;
            }
            .diary-date {
                color: $color-muted;
                font-size: $font-size-sm;
            }
            .status-badge {
                padding: 0.25rem 0.5rem;
                border-radius: 12px;
                font-size: $font-size-xs;
                font-weight: 600;
                &.on-track {
                    background: $color-success-light;
                    color: $color-success;
                }
                &.under-target {
                    background: $color-warning-light;
                    color: $color-warning;
                }
            }
        }
        .meals-list {
            margin-bottom: 1rem;
            .meal-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.5rem 0;
                border-bottom: 1px solid $color-border-muted;
                &:last-child {
                    border-bottom: none;
                }
                .meal-info {
                    .meal-type {
                        font-weight: 600;
                        color: $color-heading;
                        font-size: $font-size-sm;
                        display: block;
                    }
                    .meal-items {
                        color: $color-muted;
                        font-size: $font-size-sm;
                    }
                }
                .meal-calories {
                    color: $color-button;
                    font-weight: 600;
                    font-size: $font-size-sm;
                }
            }
        }
        .diary-summary {
            .calorie-summary {
                span {
                    display: block;
                    color: $color-heading;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }
                .calorie-progress {
                    height: 8px;
                    background: $color-border-muted;
                    border-radius: 4px;
                    overflow: hidden;
                    .calorie-fill {
                        height: 100%;
                        background: $color-button;
                        transition: width 0.3s ease;
                    }
                }
            }
        }
    }
    .goals-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 1.5rem;
        margin-bottom: 1.5rem;
    }
    .goal-card {
        background: $color-card-bg;
        border: 1px solid $color-border-muted;
        border-radius: 8px;
        box-shadow: $shadow-sm;
        padding: 1.25rem;
        transition: all 0.3s ease;
        &:hover {
            transform: translateY(-2px);
            box-shadow: $shadow-md;
        }
        .goal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            h4 {
                color: $color-button;
                font-size: $font-size-md;
                margin: 0;
            }
            .progress-percentage {
                background: $color-button;
                color: $color-white;
                padding: 0.25rem 0.5rem;
                border-radius: 12px;
                font-size: $font-size-xs;
                font-weight: 600;
            }
        }
        .calorie-goal {
            margin-bottom: 1rem;
            .goal-item {
                display: flex;
                align-items: center;
                margin-bottom: 0.5rem;
                .goal-label {
                    color: $color-muted;
                    font-size: $font-size-sm;
                    margin-right: 0.5rem;
                }
                .goal-current {
                    color: $color-button;
                    font-weight: 600;
                    font-size: $font-size-sm;
                }
                .goal-target {
                    color: $color-muted;
                    font-size: $font-size-sm;
                }
            }
            .goal-progress {
                height: 8px;
                background: $color-border-muted;
                border-radius: 4px;
                overflow: hidden;
                .goal-fill {
                    height: 100%;
                    background: $color-button;
                    transition: width 0.3s ease;
                }
            }
        }
        .macro-goals {
            .macro-goal {
                display: flex;
                align-items: center;
                margin-bottom: 0.75rem;
                .macro-name {
                    width: 60px;
                    color: $color-heading;
                    font-weight: 600;
                    font-size: $font-size-sm;
                }
                .macro-progress {
                    flex: 1;
                    height: 6px;
                    background: $color-border-muted;
                    border-radius: 3px;
                    overflow: hidden;
                    margin: 0 0.5rem;
                    .macro-fill {
                        height: 100%;
                        transition: width 0.3s ease;
                        &.protein {
                            background: #6f42c1; // Purple for protein
                        }
                        &.carbs {
                            background: #20c997; // Teal/Cyan for carbs
                        }
                        &.fats {
                            background: #dc3545; // Red/Orange for fat
                        }
                    }
                }
                .macro-values {
                    color: $color-muted;
                    font-size: $font-size-xs;
                    font-weight: 600;
                }
            }
        }
    }

    // Active Plans Styles
    .active-plans-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 1.5rem;
        margin-bottom: 1.5rem;
    }
    .active-plan-card {
        background: $color-card-bg;
        border: 1px solid $color-border-muted;
        border-radius: 8px;
        box-shadow: $shadow-sm;
        padding: 1.25rem;
        transition: all 0.3s ease;
        &:hover {
            transform: translateY(-2px);
            box-shadow: $shadow-md;
        }
        .active-plan-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            h4 {
                color: $color-text-dark;
                font-size: $font-size-md;
                margin: 0;
                flex: 1;
                margin-right: 1rem;
            }
            .active-members {
                background: $color-success-light;
                color: $color-success;
                padding: 0.25rem 0.5rem;
                border-radius: 12px;
                font-size: $font-size-xs;
                font-weight: 600;
            }
        }
        .active-plan-details {
            margin-bottom: 1rem;
            p {
                margin-bottom: 0.5rem;
                font-size: $font-size-sm;
                strong {
                    color: $color-heading;
                }
            }
        }
        .active-plan-actions {
            display: flex;
            gap: 0.5rem;
            button {
                flex: 1;
                margin: 0;
            }
        }
    }

    // Club Plans Styles
    .club-plans-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.5rem;
        margin-bottom: 1.5rem;
    }
    .club-plan-card {
        background: $color-card-bg;
        border: 1px solid $color-border-muted;
        border-radius: 12px;
        box-shadow: $shadow-sm;
        overflow: hidden;
        transition: all 0.3s ease;
        &:hover {
            transform: translateY(-4px);
            box-shadow: $shadow-lg;
            .club-plan-image .plan-image {
                transform: scale(1.05);
            }
        }

        .club-plan-image {
            position: relative;
            height: 200px;
            overflow: hidden;

            .plan-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }

            .image-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(
                    135deg,
                    rgba(0, 0, 0, 0.1) 0%,
                    rgba(0, 0, 0, 0.4) 100%
                );
                display: flex;
                align-items: flex-start;
                justify-content: flex-end;
                padding: 1rem;

                .plan-type {
                    background: rgba(255, 255, 255, 0.9);
                    color: $color-text-dark;
                    padding: 0.4rem 0.8rem;
                    border-radius: 20px;
                    font-size: $font-size-xs;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }
            }
        }

        .club-plan-content {
            padding: 1.5rem;

            .club-plan-header {
                margin-bottom: 1rem;
                h4 {
                    color: $color-text-dark;
                    font-size: $font-size-lg;
                    font-weight: 700;
                    margin: 0;
                    line-height: 1.3;
                }
            }

            p {
                color: $color-muted;
                font-size: $font-size-base;
                margin-bottom: 1.5rem;
                line-height: 1.5;
            }

            .club-plan-stats {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                padding: 1rem;
                background: color.adjust($color-background, $lightness: 2%);
                border-radius: 8px;

                .usage-count {
                    color: $color-muted;
                    font-size: $font-size-sm;
                    font-weight: 600;
                }

                .rating {
                    color: #f39c12;
                    font-size: $font-size-sm;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }
            }

            .club-plan-actions {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 1rem;
                border-top: 1px solid $color-border-muted;

                .action-icons {
                    display: flex;
                    gap: 0.5rem;

                    .action-icon-btn {
                        background: none;
                        border: none;
                        padding: 0.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all 0.2s;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 40px;
                        height: 40px;

                        &.edit-btn {
                            color: $color-info;
                            &:hover {
                                background: $color-info-light;
                                transform: scale(1.1);
                                box-shadow: 0 2px 8px rgba($color-info, 0.2);
                            }
                        }

                        &.schedule-btn {
                            color: $color-success;
                            &:hover {
                                background: $color-success-light;
                                transform: scale(1.1);
                                box-shadow: 0 2px 8px rgba($color-success, 0.2);
                            }
                        }

                        &.delete-btn {
                            color: $color-danger;
                            &:hover {
                                background: $color-danger-light;
                                transform: scale(1.1);
                                box-shadow: 0 2px 8px rgba($color-danger, 0.2);
                            }
                        }

                        i {
                            font-size: 1.1rem;
                        }
                    }
                }

                .more-info-link {
                    color: $color-button;
                    text-decoration: none;
                    font-size: $font-size-sm;
                    font-weight: 600;
                    padding: 0.6rem 1.2rem;
                    border-radius: 8px;
                    transition: all 0.2s;
                    border: 1px solid transparent;

                    &:hover {
                        background: rgba($color-button, 0.1);
                        color: color.adjust($color-button, $lightness: -10%);
                        text-decoration: none;
                        border-color: rgba($color-button, 0.2);
                    }
                }
            }
        }
    }

    // Editor Placeholder Styles
    .editor-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 400px;
        background: color.adjust($color-background, $lightness: 2%);
        border-radius: 8px;
        border: 2px dashed $color-border-muted;

        .editor-content {
            text-align: center;
            max-width: 600px;

            .editor-icon {
                font-size: 4rem;
                color: $color-muted;
                margin-bottom: 1rem;
            }

            h4 {
                color: $color-text-dark;
                font-size: $font-size-lg;
                font-weight: 700;
                margin-bottom: 1rem;
            }

            p {
                color: $color-muted;
                font-size: $font-size-base;
                margin-bottom: 1rem;
            }

            ul {
                text-align: left;
                margin: 1rem 0;
                padding-left: 2rem;

                li {
                    color: $color-muted;
                    font-size: $font-size-sm;
                    margin-bottom: 0.5rem;
                }
            }
        }
    }

    // Modal Styles
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 1rem;
    }

    .modal-content {
        background: $color-card-bg;
        border-radius: 12px;
        box-shadow: $shadow-lg;
        max-width: 1480px;
        width: 100%;
        max-height: 100vh;
        overflow-y: auto;
        animation: modalSlideIn 0.3s ease;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        border-bottom: 1px solid $color-border-muted;

        h3 {
            color: $color-text-dark;
            font-size: $font-size-lg;
            font-weight: 700;
            margin: 0;
        }

        .modal-close {
            background: none;
            border: none;
            color: $color-muted;
            font-size: $font-size-lg;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 4px;
            transition: all 0.2s;

            &:hover {
                background: $color-border-muted;
                color: $color-text-dark;
            }
        }
    }

    .modal-body {
        padding: 12px;
    }

    .template-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 5px;
            margin-top: 3px;
            label {
                color: $color-text-dark;
                font-weight: 600;
                font-size: $font-size-base;
                margin-bottom: 0.25rem;
            }
            .form-input,
            .form-textarea,
            .form-select {
                width: 100%;
                padding: 0.5rem 1rem;
                border: 1px solid $color-border-muted;
                border-radius: 8px;
                font-size: $font-size-base;
                background: $color-card-bg;
                color: $color-text-dark;
                transition: border-color 0.2s;
                &:focus {
                    outline: none;
                    border-color: $color-button;
                    box-shadow: 0 0 0 2px rgba($color-button, 0.1);
                }
                &::placeholder {
                    color: $color-muted;
                }
            }
            .form-textarea {
                resize: vertical;
                min-height: 80px;
            }
        }
        .form-row {
            display: flex;
            gap: 1.5rem;
            > .form-group {
                flex: 1 1 0;
                margin-bottom: 5px;
            }
        }
        .form-section {
            margin-bottom: 1.5rem;
            padding: 1.5rem 1rem;
            background: color.adjust($color-background, $lightness: 2%);
            border-radius: 12px;
            border: 1px solid $color-border-muted;
            h4 {
                color: $color-text-dark;
                font-size: $font-size-md;
                font-weight: 700;
                margin-bottom: 1rem;
            }
        }
        .macro-grid {
            display: flex;
            gap: 1.5rem;
            > .form-group {
                flex: 1 1 0;
                margin-bottom: 5px;
            }
        }
        .checkbox-label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
            .form-checkbox {
                width: 20px;
                height: 20px;
                accent-color: $color-button;
                margin-right: 0.5rem;
            }
        }
        .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid $color-border-muted;
            button {
                min-width: 120px;
            }
        }
    }
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.new-meal-plan-btn {
    background: $color-button;
    color: $color-white;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-size: $font-size-md;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba($color-button, 0.3);
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        background: $color-button;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba($color-button, 0.4);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 2px 8px rgba($color-button, 0.3);
    }

    i {
        font-size: 1.1em;
    }
}

.primary-btn {
    background: $color-button;
    color: $color-white;
    border: none;
    border-radius: 6px;
    padding: 0.5rem;
    // font-size: $font-size-md;
    font-weight: 600;
    cursor: pointer;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
    transition: background 0.2s;
    &:hover {
        background: $color-button-hover;
    }
}
.secondary-btn {
    background: $btn-secondary-bg;
    color: $color-white;
    border: none;
    border-radius: 6px;
    padding: 0.5rem;
    // font-size: $font-size-md;
    font-weight: 600;
    cursor: pointer;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
    transition: background 0.2s;
    &:hover {
        background: $btn-secondary-hover-bg;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeInOut {
    0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
    }
    20% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
    80% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
    }
}

// Responsive
@media (max-width: 992px) {
    .members-page-wrapper {
        .container-fluid {
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }
}

@media (max-width: $breakpoint-md) {
    .nutrition-hub {
        padding: 10px;
    }
    
    .members-page-wrapper {
        .container-fluid {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
        }
    }
    
    // Breadcrumb and Navigation Row responsive
    .breadcrumb-nav-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
    
    // Breadcrumb responsive
    .breadcrumb-section {
        width: 100%;
        
        .breadcrumb-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            
            .breadcrumb {
                flex-wrap: wrap;
                
                .breadcrumb-item {
                    font-size: 0.8rem;
                    
                    a {
                        font-size: 0.8rem;
                    }
                }
            }
        }
    }
    
    // Navigation responsive
    .navigation {
        width: 100%;
        
        .nav-items {
            .nav-item {
                padding: 0.5rem 0.75rem;
                font-size: 0.8rem;
                
                span {
                    display: none;
                }
                
                i {
                    font-size: 1.2em;
                }
            }
        }
        
        .mobile-nav {
            display: block;
        }
    }
    
    // Navigation responsive
    .navigation {
        .nav-items {
            .nav-item {
                padding: 0.5rem 0.75rem;
                font-size: 0.8rem;
                
                span {
                    display: none;
                }
                
                i {
                    font-size: 1.2em;
                }
            }
        }
        
        .nav-actions {
            display: flex;
        }
        
        .mobile-nav {
            display: block;
        }
    }
    
    .tab-content-container {
        padding: 1rem 0.5rem;
    }
    .modal-content {
        max-width: 98vw;
        padding: 0.5rem;
    }
    .modal-header,
    .modal-body {
        padding: 10px !important;
    }
    .template-form {
        gap: 1rem;
        .form-row,
        .macro-grid:not(.macros-grid) {
            flex-direction: column;
            gap: 1rem;
        }
        .form-section {
            padding: 1rem 0.5rem;
            margin-bottom: 1rem;
        }
        .form-actions {
            flex-direction: column;
            gap: 0.5rem;
            align-items: stretch;
            button {
                width: 100%;
                min-width: unset;
            }
        }
        .form-group {
            gap: 0.25rem;
        }
    }

    // Club Plans Responsive
    .club-plans-list {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .club-plan-card {
        .club-plan-image {
            height: 180px;
        }

        .club-plan-content {
            padding: 1rem;

            .club-plan-header h4 {
                font-size: $font-size-md;
            }

            .club-plan-stats {
                flex-direction: column;
                gap: 0.5rem;
                align-items: flex-start;
            }

            .club-plan-actions {
                flex-direction: column;
                gap: 1rem;
                align-items: stretch;

                .action-icons {
                    justify-content: center;
                }

                .more-info-link {
                    text-align: center;
                }
            }
        }
    }
}

.meal-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(
        135deg,
        color.adjust($color-background, $lightness: 2%),
        $color-card-bg 80%
    );
    border-radius: 12px;
    padding: 1.5rem 1rem;
}
.meal-card {
    background: linear-gradient(
        120deg,
        $color-card-bg 80%,
        color.adjust($color-info-light, $lightness: 8%) 100%
    );
    border: 1.5px solid $color-border-muted;
    border-radius: 16px;
    // box-shadow: $shadow-xs, 0 2px 8px rgba($color-info, 0.04);
    padding: 1.25rem 1rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 200px;
    transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
    position: relative;
    overflow: hidden;
    &:hover {
        box-shadow: $shadow-md, 0 6px 24px rgba($color-info, 0.08);
        border-color: $color-info;
        transform: translateY(-3px) scale(1.03);
    }
    .meal-card-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        .meal-card-icon {
            font-size: 1.5rem;
            color: $color-info;
            background: $color-info-light;
            border-radius: 50%;
            padding: 0.3rem 0.5rem;
            margin-right: 0.25rem;
            box-shadow: 0 1px 4px rgba($color-info, 0.08);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .meal-card-title {
            color: $color-text-dark;
            font-size: $font-size-md;
            font-weight: 700;
            letter-spacing: 0.5px;
        }
    }
    .meal-card-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        .meal-products-list {
            list-style: none;
            padding: 0;
            margin: 0 0 0.5rem 0;
            .empty-products {
                color: $color-muted;
                font-size: $font-size-xs;
                font-style: italic;
                margin-bottom: 0.5rem;
            }
            li {
                color: $color-heading;
                font-size: $font-size-sm;
                margin-bottom: 0.25rem;
                padding-left: 1.2em;
                position: relative;
            }
        }
        .add-product-btn {
            background: $color-button;
            color: $color-white;
            border: none;
            border-radius: 8px;
            padding: 0.5rem 1.2rem;
            font-size: $font-size-sm;
            font-weight: 700;
            cursor: pointer;
            margin-top: auto;
            transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 2px 8px rgba($color-danger, 0.08);
            &:hover {
                background: $color-button;
                box-shadow: 0 4px 16px rgba($color-button, 0.12);
                transform: translateY(-2px) scale(1.04);
            }
            i {
                font-size: 1.1em;
            }
        }
    }
}

// Single Image Selector with Arrows Styles
.image-selector-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 0.5rem;
    position: relative;

    .image-nav-btn {
        background: #fff;
        border: 2px solid #dc3545;
        color: #dc3545;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        flex-shrink: 0;
        z-index: 1;

        &:hover:not(:disabled) {
            background: #dc3545;
            color: #fff;
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        }

        &:active:not(:disabled) {
            transform: scale(0.95);
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            border-color: #ccc;
            color: #ccc;
        }

        i {
            font-size: 1.2rem;
        }
    }

    .single-image-display {
        position: relative;
        width: 300px;
        height: 200px;
        border: 2px solid #dc3545;
        border-radius: 8px;
        overflow: hidden;
        background: #f8f9fa;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

        .selected-image-preview {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .image-counter {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
            color: #fff;
            padding: 0.5rem;
            text-align: center;
            font-size: 0.875rem;
            font-weight: 600;
        }
    }
}

@media (max-width: 768px) {
    .image-selector-container {
        gap: 0.5rem;

        .image-nav-btn {
            width: 40px;
            height: 40px;

            i {
                font-size: 1rem;
            }
        }

        .single-image-display {
            width: 100%;
            max-width: 250px;
            height: 180px;
        }
    }
}

.add-product-form {
    .form-group {
        margin-bottom: 1.5rem;
        label {
            display: block;
            color: $color-text-dark;
            font-weight: 600;
            margin-bottom: 0.5rem;
            font-size: $font-size-sm;
        }
    }
    .form-input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid $color-border-muted;
        border-radius: 6px;
        font-size: $font-size-base;
        background: $color-card-bg;
        color: $color-text-dark;
        transition: border-color 0.2s;
        &:focus {
            outline: none;
            border-color: $color-button;
            box-shadow: 0 0 0 2px rgba($color-button, 0.1);
        }
        &::placeholder {
            color: $color-muted;
        }
    }
    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid $color-border-muted;
    }
}

.form-control-sm {
    padding: 0.4rem 0.75rem !important;
    font-size: 0.92em !important;
    border-radius: 10px !important;
    min-height: 32px !important;
    background: color.adjust($color-card-bg, $lightness: 2%) !important;
    border: 1.5px solid $color-border-muted !important;
    color: $color-text-dark !important;
    box-shadow: 0 1px 2px rgba($color-shadow-heavy, 0.03) inset;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}
.form-control-sm:focus {
    border-color: $color-button !important;
    background: $color-white !important;
    box-shadow: 0 0 0 2px rgba($color-button, 0.1),
        0 2px 8px rgba($color-button, 0.04);
    outline: none;
}
.form-control-sm::placeholder {
    color: $color-muted !important;
    opacity: 0.7 !important;
    font-style: italic;
}

.days-checkboxes {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
    margin-top: 0.5rem;
    .checkbox-label {
        margin-bottom: 0.25rem;
        font-size: $font-size-sm;
        .form-checkbox {
            margin-right: 0.5rem;
            width: 18px;
            height: 18px;
            accent-color: $color-button;
        }
        .checkmark {
            display: none;
        }
    }
}

// Unified Nutrition Overview Card styles

.modal-body-flex {
    display: flex;
    flex-direction: column;
    padding: 0 2rem 2rem 2rem;
    gap: 1.5rem;
}

.top-cards-row {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 1rem;

    @media (max-width: $breakpoint-md) {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
}

.modal-main-body {
    flex: 1 1 0%;
    min-width: 0;
    /* Place your tab/content styles here */
}

.modern-modal {
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    max-width: 1400px;
    width: 100%;
    max-height: 100vh;
    overflow: hidden;
    animation: modalSlideIn 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin: 1rem;
    
    @media (max-width: 768px) {
        margin: 0.5rem;
        border-radius: 8px;
        max-width: calc(100% - 1rem);
    }
    
    @media (max-width: 576px) {
        margin: 0.25rem;
        max-width: calc(100% - 0.5rem);
    }
}

.modern-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid $color-border-muted;

    h3 {
        color: $color-text-dark;
        font-size: $font-size-lg;
        font-weight: 700;
        margin: 0;
    }

    .modal-close {
        background: none;
        border: none;
        color: $color-muted;
        font-size: $font-size-lg;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
        transition: all 0.2s;

        &:hover {
            background: $color-border-muted;
            color: $color-text-dark;
        }
    }
}

.modern-body {
    padding: 1rem;
}

.modern-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;

    .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 0;
        label {
            color: $color-text-dark;
            font-weight: 600;
            font-size: $font-size-base;
            margin-bottom: 0.25rem;
        }
        .form-input,
        .form-textarea,
        .form-select {
            width: 100%;
            padding: 0.5rem 1rem;
            border: 1px solid $color-border-muted;
            border-radius: 8px;
            font-size: $font-size-base;
            background: $color-card-bg;
            color: $color-text-dark;
            transition: border-color 0.2s;
            &:focus {
                outline: none;
                border-color: $color-button;
                box-shadow: 0 0 0 2px rgba($color-button, 0.1);
            }
            &::placeholder {
                color: $color-muted;
            }
        }
        .form-textarea {
            resize: vertical;
            min-height: 80px;
        }
    }
    .form-row {
        display: flex;
        gap: 1.5rem;
        > .form-group {
            flex: 1 1 0;
            margin-bottom: 0;
        }
    }
    .form-section {
        margin-bottom: 1.5rem;
        padding: 1.5rem 1rem;
        background: color.adjust($color-background, $lightness: 2%);
        border-radius: 12px;
        border: 1px solid $color-border-muted;
        h4 {
            color: $color-text-dark;
            font-size: $font-size-md;
            font-weight: 700;
            margin-bottom: 1rem;
        }
    }
    .macro-grid {
        display: flex;
        gap: 1.5rem;
        > .form-group {
            flex: 1 1 0;
            margin-bottom: 0;
        }
    }
    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        .form-checkbox {
            width: 20px;
            height: 20px;
            accent-color: $color-button;
            margin-right: 0.5rem;
        }
    }
    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid $color-border-muted;
        button {
            min-width: 120px;
        }
    }
}

.top-row {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 1.5rem;

    @media (max-width: $breakpoint-md) {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
}

.basic-info-section {
    flex: 1;
}

.image-section {
    flex: 1;
}

.section-title {
    color: $color-text-dark;
    font-size: $font-size-lg;
    font-weight: 700;
    margin-bottom: 1rem;
    margin-top: 1rem;
}

.form-row.compact {
    display: flex;
    gap: 1.5rem;
    > .form-group {
        flex: 1 1 0;
        margin-bottom: 0;
    }
}

.modern-input {
    width: 100%;
    padding: 5px;
    border: 1px solid $color-border-muted;
    border-radius: 8px;
    font-size: $font-size-base;
    background: $color-card-bg;
    color: $color-text-dark;
    transition: border-color 0.2s;
    &:focus {
        outline: none;
        border-color: $color-button;
        box-shadow: 0 0 0 2px rgba($color-button, 0.1);
    }
    &::placeholder {
        color: $color-muted;
    }
}

.modern-textarea {
    width: 100%;
    padding: 5px;
    border: 1px solid $color-border-muted;
    border-radius: 8px;
    font-size: $font-size-base;
    background: $color-card-bg;
    color: $color-text-dark;
    transition: border-color 0.2s;
    resize: vertical;
    min-height: 60px;
    
    &:focus {
        outline: none;
        border-color: $color-button;
        box-shadow: 0 0 0 2px rgba($color-button, 0.1);
    }
    &::placeholder {
        color: $color-muted;
    }
    
    &.auto-resize-textarea {
        resize: none;
        overflow-y: hidden;
        min-height: 60px;
        max-height: 200px;
    }
}

.modern-select {
    width: 100%;
    padding: 5px;
    border: 1px solid $color-border-muted;
    border-radius: 8px;
    font-size: $font-size-base;
    background: $color-card-bg;
    color: $color-text-dark;
    transition: border-color 0.2s;
    &:focus {
        outline: none;
        border-color: $color-button;
    }
}

.modern-checkbox {
    width: 20px;
    height: 20px;
    accent-color: $color-button;
    margin-right: 0.5rem;
}

.checkmark-modern {
    display: none;
}

.btn-primary-modern {
    background: $color-button;
    color: $color-white;
    border: none;
    border-radius: 6px;
    padding: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background: $color-button-hover;
    }
}

.btn-secondary-modern {
    background: $btn-secondary-bg;
    color: $color-white;
    border: none;
    border-radius: 6px;
    padding: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background: $btn-secondary-hover-bg;
    }
}

.meal-cards-modern {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(
        135deg,
        color.adjust($color-background, $lightness: 2%),
        $color-card-bg 80%
    );
    border-radius: 12px;
    padding: 1.5rem 1rem;
}
.meal-card-modern {
    background: linear-gradient(
        120deg,
        $color-card-bg 80%,
        color.adjust($color-info-light, $lightness: 8%) 100%
    );
    border: 1.5px solid $color-border-muted;
    border-radius: 16px;
    // box-shadow: $shadow-xs, 0 2px 8px rgba($color-info, 0.04);
    padding: 1.25rem 1rem 1rem 1rem;
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;
    min-height: 200px;
    transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
    position: relative;
    overflow: hidden;
    &:hover {
        box-shadow: $shadow-md, 0 6px 24px rgba($color-info, 0.08);
        border-color: $color-info;
        transform: translateY(-3px) scale(1.03);
    }
    .meal-card-header-modern {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        .meal-icon {
            font-size: 1.5rem;
            color: $color-info;
            background: $color-info-light;
            border-radius: 50%;
            padding: 0.3rem 0.5rem;
            margin-right: 0.25rem;
            box-shadow: 0 1px 4px rgba($color-info, 0.08);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .meal-title {
            color: $color-text-dark;
            font-size: $font-size-md;
            font-weight: 700;
            letter-spacing: 0.5px;
        }
    }
    .meal-card-body-modern {
        flex: 1;
        display: flex;
        flex-direction: column;
        .meal-products-modern {
            list-style: none;
            padding: 0;
            margin: 0 0 0.5rem 0;
            .empty-meal {
                color: $color-muted;
                font-size: $font-size-xs;
                font-style: italic;
                margin-bottom: 0.5rem;
            }
            .product-count {
                color: $color-heading;
                font-size: $font-size-sm;
                font-weight: 600;
            }
        }
        .add-product-btn-modern {
            background: $color-button;
            color: $color-white;
            border: none;
            border-radius: 8px;
            padding: 0.5rem 1.2rem;
            font-size: $font-size-sm;
            font-weight: 700;
            cursor: pointer;
            margin-top: auto;
            transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 2px 8px rgba($color-danger, 0.08);
            &:hover {
                background: $color-button;
                box-shadow: 0 4px 16px rgba($color-button, 0.12);
                transform: translateY(-2px) scale(1.04);
            }
            i {
                font-size: 1.1em;
            }
        }
    }
}

.image-upload-modern {
    width: 100px;
    height: 100px;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px dashed $color-border;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $color-background-hover;

    &:hover {
        border-color: $color-muted;
        background: $color-background;
        transform: scale(1.02);
    }
}

.image-placeholder-modern {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    color: $color-muted;

    i {
        font-size: 1.2rem;
    }

    span {
        font-size: 0.7rem;
        font-weight: 500;
        text-align: center;
    }
}

.meal-plan-image-modern {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}

.image-actions-modern {
    display: flex;
    gap: 0.3rem;
}

.image-action-btn-modern {
    background: $color-white;
    border: 1px solid $color-border-muted;
    border-radius: 6px;
    padding: 0.3rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.7rem;
    color: $color-muted;

    &:hover {
        background: $color-background-hover;
        border-color: $color-border;
        color: $color-text-dark;
    }

    &:first-child:hover {
        color: $color-danger;
        border-color: $color-danger-light;
        background: color.adjust($color-danger-light, $lightness: 5%);
    }
}

.checkbox-label-modern {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    margin-top: 1rem;
    .form-checkbox {
        width: 20px;
        height: 20px;
        accent-color: $color-button;
        margin-right: 0.5rem;
    }
}

.form-actions-modern {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

// Modern Modal Specific Styles
.modern-header {
    background: linear-gradient(
        135deg,
        $color-button 0%,
        color.adjust($color-button, $lightness: -15%) 100%
    );
    color: $color-white;
    padding: 1.5rem;
    border-radius: 16px 16px 0 0;
    position: relative;

    .header-content {
        h3 {
            color: $color-white;
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0 0 0.25rem 0;
        }

        p {
            color: rgba($color-white, 0.9);
            margin: 0;
            font-size: 0.9rem;
        }
    }

    .modern-close {
        background: rgba($color-white, 0.2);
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 8px;
        transition: all 0.2s;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;

        &:hover {
            background: rgba($color-white, 0.3);
            transform: scale(1.1);
        }
    }
}

.modern-body {
    padding: 1.5rem;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: calc(100vh - 200px);
    -webkit-overflow-scrolling: touch;
    position: relative;
    
    @media (max-width: 768px) {
        padding: 1rem;
        max-height: calc(100vh - 180px);
    }

    &.submitting {
        pointer-events: none;
        opacity: 0.7;
    }

    .form-loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        border-radius: 8px;

        .form-loading-spinner {
            text-align: center;

            i {
                font-size: 2.5rem;
                color: #007bff;
                margin-bottom: 1rem;
                display: block;
            }

            p {
                font-size: 1rem;
                font-weight: 500;
                color: #333;
                margin: 0;
            }
        }
    }
}

.top-row {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
}

.middle-row {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;
    width: 100%;
}

.basic-info-section {
    width: 100%;

    .form-group {
        margin-bottom: 1.5rem;
        width: 100%;

        label {
            font-weight: 600;
            color: $color-text-dark;
            margin-bottom: 0.5rem;
            display: block;
            width: 100%;
        }
    }

    .name-image-row {
        display: flex;
        width: 100%;
        align-items: flex-end;
        margin-bottom: 0.5rem;

        .name-group {
            flex: 1;
            margin-bottom: 0;
        }

        .image-section {
            flex-shrink: 0;
            margin-bottom: 0;
        }
    }

    .form-row.compact {
        display: flex;
        gap: 1.5rem;
        width: 100%;

        .form-group {
            flex: 1;
            margin-bottom: 1.5rem;
        }
    }
}

.image-section {
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    label {
        font-weight: 600;
        color: $color-text-dark;
        margin-bottom: 0.5rem;
        display: block;
        width: 100%;
        text-align: center;
        font-size: 0.9rem;
    }
}

.nutrition-section,
.settings-section {
    background: color.adjust($color-background, $lightness: 2%);
    border-radius: 12px;
    padding: 2rem;
    border: 1px solid $color-border-muted;
    width: 100%;

    .section-title {
        color: $color-heading;
        font-size: 1.2rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid $color-divider;
        width: 100%;
    }
}

.macro-selection {
    margin-bottom: 1.5rem;

    label {
        font-weight: 600;
        color: $color-text-dark;
        margin-bottom: 0.75rem;
        display: block;
    }
}

.macro-chips-modern {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    width: 100%;
}

.macro-chip-modern {
    padding: 0.5rem 1rem;
    border: 2px solid $color-border-muted;
    border-radius: 20px;
    background: $color-white;
    color: $color-muted;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
        border-color: $color-button;
        color: $color-button;
        transform: translateY(-1px);
    }

    &.selected {
        background: $color-button;
        border-color: $color-button;
        color: $color-white;
        box-shadow: 0 4px 12px rgba($color-button, 0.3);
    }

    i {
        font-size: 1rem;
    }
}

.macro-values {
    width: 100%;

    .macro-input-group {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }

    .macro-input {
        width: 100%;

        label {
            font-weight: 600;
            color: $color-text-dark;
            margin-bottom: 0.5rem;
            display: block;
            width: 100%;

            &.disabled {
                color: $color-muted;
            }
        }
    }
}

.input-with-toggle {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    width: 100%;

    .modern-input {
        flex: 1;
        width: 100%;

        &.disabled {
            background: $color-input-bg;
            color: $color-muted;
            cursor: not-allowed;
        }
    }

    .toggle-btn {
        width: 40px;
        height: 40px;
        border: 2px solid $color-border-muted;
        border-radius: 8px;
        background: $color-white;
        color: $color-muted;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        &:hover {
            border-color: $color-button;
            color: $color-button;
        }

        &.active {
            background: $color-success;
            border-color: $color-success;
            color: $color-white;
        }

        i {
            font-size: 0.9rem;
        }
    }
}

// Admin Info Header
.admin-info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 1rem 1.5rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;

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

// Top Sections Container
.top-sections-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
    color: #333333;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}

// Meal Plan Targets Section
.meal-plan-targets-section {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 0;
    color: #333333;
    
    .targets-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        
        .targets-title {
            color: #333333;
        font-size: 1.1rem;
            font-weight: 600;
            margin: 0;
        }
        
        .edit-targets-btn {
            background: transparent;
            border: 1px solid #dee2e6;
            border-radius: 4px;
            padding: 0.25rem 0.5rem;
            color: #333333;
            cursor: pointer;
            transition: all 0.2s ease;
            
            &:hover {
                background: $primary;
                color: white;
                border-color: $primary;
            }
            
            i {
                font-size: 0.8rem;
            }
        }
    }
    
    .targets-info {
        display: flex;
        gap: 2rem;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e9ecef;
        color: #333333;
        .target-info-item {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            
            .info-label {
                font-size: 0.8rem;
                color: #333333;
                font-weight: 500;
            }
            
            .info-value {
                font-size: 0.9rem;
                color: #333333;
                font-weight: 600;
            }
        }
    }
    
    .targets-actual-combined {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        
        .targets-row {
            display: flex;
            align-items: center;
            gap: 1rem;
            
            .targets-label {
                font-weight: 700;
                font-size: 0.95rem;
                color: #333333;
                min-width: 70px; // Match actual-label width
            }
            
            .targets-content-container {
                display: flex;
                align-items: center;
                gap: 1rem;
                flex: 1;
                min-width: 0;
                
                .targets-macros {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    flex-wrap: wrap;
                    flex: 1;
                    min-width: 0;
                    
                    .target-macro {
                        font-weight: 600;
                        font-size: 0.9rem;
                        
                        &.protein-target-text {
                            color: #20B2AA; // Teal/Cyan for protein
                        }
                        
                        &.carbs-target-text {
                            color: #6A5ACD; // Purple for carbs
                        }
                        
                        &.fat-target-text {
                            color: #FF4500; // Red for fat
                        }
                    }
                }
                
                .target-total-calories {
                    font-weight: 600;
                    font-size: 0.9rem;
                    color: #333333;
                    white-space: nowrap;
                }
            }
        }
        
        .actual-row {
            display: flex;
            align-items: center;
            gap: 1rem;
            
            .actual-label {
                font-weight: 700;
                font-size: 0.95rem;
                color: #333333;
                min-width: 70px; // Match targets-label width
            }
            
            .actual-bar-container {
                display: flex;
                align-items: center;
                gap: 1rem;
                flex: 1;
                min-width: 0;
                
                .actual-bar {
                    display: flex;
                    height: 32px;
                    border-radius: 4px;
                    overflow: hidden;
                    flex: 1;
                    min-width: 200px;
                    
                    .actual-segment {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                        transition: width 0.3s ease;
                        min-width: 0;
                        
                        .segment-value {
                            color: white;
                            font-size: 0.85rem;
                            font-weight: 600;
                            text-shadow: 0 1px 2px rgba(0,0,0,0.3);
                            white-space: nowrap;
                        }
                        
                        &.protein-segment {
                            background: #20B2AA; // Teal/Cyan for protein
                        }
                        
                        &.carbs-segment {
                            background: #FF0000; // Bright red for carbs
                        }
                        
                        &.fat-segment {
                            background: #FF6347; // Lighter red for fat
                        }
                    }
                }
                
                .total-calories {
                    font-weight: 600;
                    font-size: 0.9rem;
                    color: #333333;
                    white-space: nowrap;
                }
            }
        }
        
        @media (max-width: 768px) {
            .targets-row,
            .actual-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
                
                .targets-content-container {
                    width: 100%;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.5rem;
                    
                    .targets-macros {
                        width: 100%;
                    }
                }
                
                .actual-bar-container {
                    width: 100%;
                    flex-direction: column;
                    align-items: flex-start;
                    
                    .actual-bar {
                        width: 100%;
                        min-width: 100%;
                    }
                }
            }
        }
    }

    // Nutrition Levels Summary
    .nutrition-levels-summary {
        background: #f8f9fa !important;
        border: 1px solid #e9ecef !important;
        border-radius: 8px !important;
        padding: 1.5rem;
        margin-bottom: 0 !important;
        color: #333333;
        min-height: 300px;

        p {
            color: #252525 !important;
        }

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
            visibility: visible;
            opacity: 1;
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

            // Color coding for different metrics
            &.calories {
                .metric-label::before {
                    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
                }
                .metric-value {
                    color: #333333;
                    background: rgba(255, 107, 107, 0.1);
                }
            }

            &.protein {
                .metric-label::before {
                    background: linear-gradient(135deg, #6f42c1, #5a32a3);
                }
                .metric-value {
                    color: #333333;
                    background: rgba(111, 66, 193, 0.1);
                }
            }

            &.carbs {
                .metric-label::before {
                    background: linear-gradient(135deg, #20c997, #17a085);
                }
                .metric-value {
                    color: #333333;
                    background: rgba(32, 201, 151, 0.1);
                }
            }

            &.fiber {
                .metric-label::before {
                    background: linear-gradient(135deg, #28a745, #1e7e34);
                }
                .metric-value {
                    color: #333333;
                    background: rgba(40, 167, 69, 0.1);
                }
            }

            &.net-carbs {
                .metric-label::before {
                    background: linear-gradient(135deg, #fd7e14, #e55a00);
                }
                .metric-value {
                    color: #333333;
                    background: rgba(253, 126, 20, 0.1);
                }
            }

            &.fat {
                .metric-label::before {
                    background: linear-gradient(135deg, #dc3545, #c82333);
                }
                .metric-value {
                    color: #333333;
                    background: rgba(220, 53, 69, 0.1);
                }
            }

            &.sodium {
                .metric-label::before {
                    background: linear-gradient(135deg, #20c997, #17a085);
                }
                .metric-value {
                    color: #333333;
                    background: rgba(32, 201, 151, 0.1);
                }
            }

            &.potassium {
                .metric-label::before {
                    background: linear-gradient(135deg, #dc3545, #c82333);
                }
                .metric-value {
                    color: #333333;
                    background: rgba(220, 53, 69, 0.1);
                }
            }
        }
    }
}

// Meal Plan Instructions Section
.meal-plan-instructions-section {
    margin-bottom: 12px;
    
    .instructions-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
        
        .instructions-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #333333;
            margin: 0;
        }
        
        .edit-instructions-btn {
            background: none;
            border: none;
            color: #dc3545;
            font-size: 0.9rem;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 4px;
            transition: all 0.3s ease;
            
            &:hover {
                background: rgba(220, 53, 69, 0.1);
                color: #c82333;
            }
            
            i {
                font-size: 0.9rem;
            }
        }
    }
    
    .instructions-content {
        .instructions-text {
            font-size: 0.95rem;
            color: #333333;
            margin: 0;
            line-height: 1.5;
        }
        
        .instructions-edit {
            .instructions-input {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid #e9ecef;
                border-radius: 6px;
                font-size: 0.95rem;
                color: #333333;
                background: white;
                resize: vertical;
                min-height: 80px;
                
                &:focus {
                    outline: none;
                    border-color: #dc3545;
                    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
                }
            }
            
            .instructions-actions {
                display: flex;
                gap: 0.5rem;
                margin-top: 0.75rem;
                
                .save-instructions-btn,
                .cancel-instructions-btn {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 4px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }
                
                .save-instructions-btn {
                    background: #28a745;
                    color: white;
                    
                    &:hover {
                        background: #218838;
                    }
                }
                
                .cancel-instructions-btn {
                    background: #6c757d;
                    color: white;
                    
                    &:hover {
                        background: #5a6268;
                    }
                }
            }
        }
    }
}

.meals-section {
    width: 100%;

    .meals-header {

        .section-title {
            color: $color-heading;
            font-size: 1.1rem;
            font-weight: 700;
            margin: 0;
        }

        .detailed-meal-plan-btn {
            background: #ff4040;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;

            &:hover {
                background: #c82333;
                transform: translateY(-1px);
            }

            i {
                font-size: 0.8rem;
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

    // Alternative meal styling
    &.alternate-meal-card {
        border: 2px solid #ffc107;
        background: linear-gradient(
            120deg,
            rgba(255, 193, 7, 0.05) 80%,
            rgba(255, 193, 7, 0.1) 100%
        );
        
        &:hover {
            border-color: #ffb300;
            box-shadow: 0 4px 12px rgba(255, 193, 7, 0.2);
        }

        .meal-card-header-modern {
            border-bottom-color: rgba(255, 193, 7, 0.3);
        }

        .alternate-badge-modern {
            background: #ffc107;
            color: #000;
            font-size: 0.7rem;
            font-weight: 700;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            margin-left: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
    }
}

.btn-primary-modern,
.btn-secondary-modern {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 140px;
    justify-content: center;
}

.btn-primary-modern {
    background: linear-gradient(
        135deg,
        $color-button 0%,
        color.adjust($color-button, $lightness: -15%) 100%
    );
    color: $color-white;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba($color-button, 0.4);
    }
}

.btn-secondary-modern {
    background: $color-background-hover;
    color: $color-text-dark;
    border: 2px solid $color-border-muted;

    &:hover {
        background: $color-border-muted;
        border-color: $color-border;
    }
}

// Enhanced Add Products Modal Styles
.add-products-container {
    display: flex;
    flex-direction: column;
    width: 100%;
}

// Search Section
.search-section {
    margin-bottom: 1rem;
}

.search-box-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;

    .search-icon {
        position: absolute;
        left: 1rem;
        color: $color-muted;
        font-size: 1rem;
        z-index: 1;
    }

    .search-input-large {
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 2.75rem;
        border: 2px solid $color-border-muted;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.2s ease;

        &:focus {
            outline: none;
            border-color: $color-button;
            box-shadow: 0 0 0 3px rgba($color-button, 0.1);
        }
    }

    .results-count {
        position: absolute;
        right: 1rem;
        color: $color-muted;
        font-size: 0.85rem;
        font-weight: 500;
    }
}

// Single Column Layout
.products-layout {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.available-products-column {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 0; // Important for flex items to respect max-height
    max-height: 45vh; // Limit available products height to give more space to current products

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;

        &:hover {
            background: #a8a8a8;
        }
    }
}

.current-products-column {
    padding-top: 5px;
    border-top: 2px solid $color-border-muted;
    margin-top: 10px;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;

        &:hover {
            background: #a8a8a8;
        }
    }
}

.current-products-header {
    .current-count {
        font-size: 0.9rem;
        font-weight: 600;
        color: $color-text-dark;
    }
}

// Responsive styles for modal
@media (max-width: 768px) {
    .products-layout {
        max-height: 70vh;
        min-height: 500px;
    }

    .current-products-column {
        padding-top: 1rem;
        margin-top: 1rem;
        min-height: 250px; // Ensure visibility on mobile
    }

    .add-products-modal {
        ::v-deep .modal-dialog {
            margin: 0.5rem;
            max-height: 95vh;
        }

        ::v-deep .modal-content {
            max-height: 95vh;
        }
    }
}

.single-product-section,
.multiple-products-section,
.quick-add-section,
.current-products-section {
    background: color.adjust($color-background, $lightness: 2%);
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid $color-border-muted;

    .section-title {
        color: $color-heading;
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid $color-divider;
    }
}

.input-with-button {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    .modern-input {
        flex: 1;
    }

    .add-single-btn {
        width: 40px;
        height: 40px;
        background: $color-button;
        color: $color-white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        &:hover {
            background: $color-button-hover;
            transform: scale(1.05);
        }

        i {
            font-size: 0.9rem;
        }
    }
}

.bulk-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;

    button {
        flex: 1;
    }
}

.quick-add-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.75rem;
    margin-top: 1rem;
}

.quick-add-btn {
    background: $color-white;
    border: 2px solid $color-border-muted;
    border-radius: 8px;
    padding: 0.75rem 0.5rem;
    color: $color-text-dark;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;

    &:hover {
        border-color: $color-button;
        color: $color-button;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba($color-button, 0.1);
    }
}

.current-products-list {
    .no-products {
        color: $color-muted;
        font-style: italic;
        text-align: center;
        padding: 1rem;
    }

    .loading-products {
        // color: $color-primary;
        text-align: center;
        padding: 1rem;
        font-weight: 500;

        i {
            margin-right: 0.5rem;
            animation: spin 1s linear infinite;
        }
    }

    .error-products {
        color: $color-danger;
        text-align: center;
        padding: 1rem;
        font-weight: 500;

        i {
            margin-right: 0.5rem;
        }
    }

    .products-grid {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
}

.product-item-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $color-white;
    border: 1px solid $color-border-muted;
    border-radius: 8px;
    padding: 5px 10px;
    transition: all 0.2s ease;
    margin: 5px;

    &:hover {
        border-color: $color-button;
        box-shadow: 0 2px 8px rgba($color-button, 0.1);
    }

    &.clickable-product {
        cursor: pointer;

        &:hover {
            background: color.adjust($color-button, $lightness: 45%);
            border-color: $color-button;
            box-shadow: 0 2px 8px rgba($color-button, 0.15);
            transform: translateY(-1px);
        }

        &:active {
            transform: translateY(0);
            box-shadow: 0 1px 4px rgba($color-button, 0.2);
        }
    }

    .product-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        flex: 1;
    }

    .product-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.25rem;
    }

    .product-name {
        color: $color-text-dark;
        font-weight: 600;
        font-size: 0.95rem;
    }

    .product-serving {
        color: $color-muted;
        font-size: 0.75rem;
        font-style: italic;
    }

    .product-description {
        color: $color-muted;
        font-size: 0.8rem;
        line-height: 1.3;
        margin-bottom: 0.25rem;
        font-style: italic;
    }

    .product-category {
        color: $color-muted;
        font-size: 0.75rem;
        font-weight: 400;
        background: rgba($color-muted, 0.1);
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        display: inline-block;
        max-width: fit-content;
        margin-bottom: 0.25rem;
    }

    .product-calories {
        color: $color-text-dark;
        font-weight: 600;
        font-size: 0.85rem;
        margin-bottom: 0.25rem;

        .quantity-note {
            font-size: 0.7rem;
            color: $color-muted;
            font-weight: 400;
            margin-left: 0.25rem;
        }
    }

    .product-macros {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.25rem;
        flex-wrap: wrap;

        .macro-item {
            font-size: 0.7rem;
            padding: 0.15rem 0.4rem;
            border-radius: 3px;
            font-weight: 500;

            &.protein {
                background: rgba(111, 66, 193, 0.1);
                color: #6f42c1; // Purple for protein
            }

            &.carbs {
                background: rgba(32, 201, 151, 0.1);
                color: #20c997; // Teal/Cyan for carbs
            }

            &.fats {
                background: rgba(220, 53, 69, 0.1);
                color: #dc3545; // Red/Orange for fat
            }
        }
    }

    .product-details {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.25rem;
        flex-wrap: wrap;

        .detail-item {
            font-size: 0.65rem;
            color: $color-muted;
            background: rgba($color-muted, 0.05);
            padding: 0.1rem 0.3rem;
            border-radius: 2px;
        }
    }

    .product-cholesterol {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.25rem;
        flex-wrap: wrap;

        .detail-item {
            font-size: 0.65rem;
            color: $color-muted;
            background: rgba($color-muted, 0.05);
            padding: 0.1rem 0.3rem;
            border-radius: 2px;
        }
    }

    .product-vitamins {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;

        .vitamin-item {
            font-size: 0.65rem;
            color: $color-muted;
            background: rgba(255, 193, 7, 0.1);
            color: #ffc107;
            padding: 0.1rem 0.3rem;
            border-radius: 2px;
            font-weight: 500;
        }
    }

    // Product Quantity Controls
    .product-quantity-controls {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-shrink: 0;
        margin-left: 1rem;
    }

    .quantity-controls-detailed {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba($color-border-muted, 0.3);
        padding: 0.25rem;
        border-radius: 8px;
    }

    .quantity-btn {
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        font-weight: 600;
        font-size: 0;
        position: relative;

        i {
            font-size: 0.75rem;
            line-height: 1;
        }

        &:hover {
            transform: scale(1.1);
        }

        &:active {
            transform: scale(0.95);
        }

        &.minus-btn {
            background: rgba(220, 53, 69, 0.1);
            color: #dc3545;

            &:hover {
                background: rgba(220, 53, 69, 0.2);
                color: #c82333;
                box-shadow: 0 2px 6px rgba(220, 53, 69, 0.3);
            }
        }

        &.plus-btn {
            background: rgba($color-button, 0.1);
            color: $color-button;

            &:hover {
                background: rgba($color-button, 0.2);
                color: color.adjust($color-button, $lightness: -10%);
                box-shadow: 0 2px 6px rgba($color-button, 0.3);
            }
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

        i {
            font-size: 0.8rem;
        }

        &:hover {
            background: #dc3545;
            color: $color-white;
            transform: scale(1.1);
            box-shadow: 0 2px 8px rgba(220, 53, 69, 0.4);
        }

        &:active {
            transform: scale(0.95);
        }
    }
}

// Reduce text sizes in Add Products Modal
.add-products-modal {
    ::v-deep .modal-dialog {
        max-width: 900px;
        max-height: 90vh;
    }

    ::v-deep .modal-content {
        max-height: 90vh;
        display: flex;
        flex-direction: column;
    }

    ::v-deep .modal-body {
        overflow-y: auto;
        flex: 1;
        min-height: 0;
    }

    // Modern add product button - ONLY in modal's available products column
    // Using deep selector to ensure styles apply with scoped CSS
    ::v-deep .add-products-container {
        ::v-deep .available-products-column {
            ::v-deep .fetched-products-list {
                ::v-deep .product-item-display {
                    ::v-deep .add-product-btn-modal {
                        width: 36px !important;
                        height: 36px !important;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                        color: $color-white !important;
                        border: none !important;
                        border-radius: 50% !important;
                        padding: 0 !important;
                        cursor: pointer;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        flex-shrink: 0;
                        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4) !important;
                        position: relative;
                        overflow: hidden;
                        margin-top: 0 !important;
                        margin-bottom: 0 !important;
                        margin-left: 0 !important;
                        margin-right: 0 !important;
                        font-size: 0 !important;
                        font-weight: normal !important;
                        gap: 0 !important;
                        min-width: 36px !important;
                        max-width: 36px !important;
                        min-height: 36px !important;
                        max-height: 36px !important;

                        &::before {
                            content: '';
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            width: 0;
                            height: 0;
                            border-radius: 50%;
                            background: rgba(255, 255, 255, 0.3);
                            transform: translate(-50%, -50%);
                            transition: width 0.6s, height 0.6s;
                        }

                        &:hover {
                            transform: scale(1.15) rotate(90deg) !important;
                            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6) !important;
                            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%) !important;
                        }

                        &:active {
                            transform: scale(1.05) rotate(90deg) !important;
                        }

                        &:hover::before {
                            width: 300px;
                            height: 300px;
                        }

                        i {
                            font-size: 1.1rem !important;
                            position: relative;
                            z-index: 1;
                            color: $color-white !important;
                            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
                            line-height: 1 !important;
                            margin: 0 !important;
                        }
                    }
                }
            }
        }
    }

    .product-item-display {
        padding: 0.5rem 0.75rem;

        .product-name {
            font-size: 0.8rem;
        }

        .product-serving {
            font-size: 0.65rem;
        }

        .product-description {
            font-size: 0.7rem;
            line-height: 1.2;
        }

        .product-category {
            font-size: 0.65rem;
            padding: 0.15rem 0.4rem;
        }

        .product-calories {
            font-size: 0.75rem;

            .quantity-note {
                font-size: 0.6rem;
            }
        }

        .product-macros {
            gap: 0.35rem;

            .macro-item {
                font-size: 0.6rem;
                padding: 0.1rem 0.3rem;
            }
        }

        .product-details {
            gap: 0.35rem;

            .detail-item {
                font-size: 0.55rem;
                padding: 0.08rem 0.25rem;
            }
        }

        .product-cholesterol {
            gap: 0.35rem;

            .detail-item {
                font-size: 0.55rem;
                padding: 0.08rem 0.25rem;
            }
        }

        .product-vitamins {
            gap: 0.35rem;

            .vitamin-item {
                font-size: 0.55rem;
                padding: 0.08rem 0.25rem;
            }
        }
    }

    .fetched-products-section {
        .product-item-display {
            .product-name {
                font-size: 0.8rem;
            }

            .product-serving {
                font-size: 0.65rem;
            }

            .product-description {
                font-size: 0.7rem;
            }
        }
    }

    // Ensure scrolling works in modal columns
    .available-products-column,
    .current-products-column {
        .fetched-products-list,
        .products-grid {
            max-height: none;
            overflow: visible;
        }
    }

    // Modern add product button in available products column
    .available-products-column {
        .fetched-products-list {
            .product-item-display {
                .add-product-btn-modal {
                    width: 36px;
                    height: 36px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: $color-white;
                    border: none;
                    border-radius: 50%;
                    padding: 0;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                    position: relative;
                    overflow: hidden;
                    margin-top: 0;
                    font-size: 0;
                    font-weight: normal;
                    gap: 0;

                    &::before {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 0;
                        height: 0;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.3);
                        transform: translate(-50%, -50%);
                        transition: width 0.6s, height 0.6s;
                    }

                    &:hover {
                        transform: scale(1.15) rotate(90deg);
                        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
                        background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
                    }

                    &:active {
                        transform: scale(1.05) rotate(90deg);
                    }

                    &:hover::before {
                        width: 300px;
                        height: 300px;
                    }

                    i {
                        font-size: 1.1rem;
                        position: relative;
                        z-index: 1;
                        color: $color-white;
                        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
                    }
                }
            }
        }
    }
}

// Foods by Category Section Styles
.foods-by-category-section {
    margin-top: 1rem;
    padding: 0.5rem;
    background: $color-white;
    border-radius: 12px;
    box-shadow: $shadow-sm;
    border: 1px solid $color-border-muted;

    .section-title {
        color: $color-text-dark;
        font-size: $font-size-lg;
        font-weight: 700;
        margin-bottom: 1rem;
    }
}

// Fetched Products Section Styles
.fetched-products-section {
    margin-top: 1rem;
    padding: 0.5rem;
    background: $color-white;
    border-radius: 12px;
    box-shadow: $shadow-sm;
    border: 1px solid $color-border-muted;

    .section-title {
        color: $color-text-dark;
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        &::before {
            content: "🍽️";
            font-size: 1.2rem;
        }
    }

    .fetched-products-list {
        max-height: 300px;
        overflow-y: auto;
        border: 1px solid $color-border-muted;
        border-radius: 8px;
        background: color.adjust($color-background, $lightness: 2%);

        .product-item-display {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            border-bottom: 1px solid $color-border-muted;
            transition: all 0.2s ease;

            &:last-child {
                border-bottom: none;
            }

            &:hover {
                background: rgba($color-button, 0.05);
            }

            .product-info {
                flex: 1;
                margin-right: 1rem;

                .product-header {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.25rem;

                    .product-name {
                        font-weight: 600;
                        color: $color-text-dark;
                        font-size: 0.95rem;
                    }

                    .product-serving {
                        font-size: 0.75rem;
                        color: $color-muted;
                        background: rgba($color-muted, 0.1);
                        padding: 0.1rem 0.4rem;
                        border-radius: 4px;
                    }
                }

                .product-description {
                    font-size: 0.8rem;
                    color: $color-muted;
                    line-height: 1.4;
                    margin-bottom: 0.25rem;
                }
            }

            .add-product-btn-modal {
                width: 36px;
                height: 36px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: $color-white;
                border: none;
                border-radius: 50%;
                padding: 0;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                position: relative;
                overflow: hidden;
                margin-top: 0;
                font-size: 0;
                font-weight: normal;
                gap: 0;

                &::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: translate(-50%, -50%);
                    transition: width 0.6s, height 0.6s;
                }

                &:hover {
                    transform: scale(1.15) rotate(90deg);
                    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
                    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
                }

                &:active {
                    transform: scale(1.05) rotate(90deg);
                }

                &:hover::before {
                    width: 300px;
                    height: 300px;
                }

                i {
                    font-size: 1.1rem;
                    position: relative;
                    z-index: 1;
                    color: $color-white;
                    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
                }
            }
        }
    }
}

// Loading and Error States
.loading-products,
.error-products,
.no-products {
    padding: 2rem;
    text-align: center;
    color: $color-muted;
    font-size: 0.9rem;

    i {
        margin-right: 0.5rem;
        font-size: 1rem;
    }
}

.error-products {
    color: $color-danger;

    i {
        color: $color-danger;
    }
}

.category-selection {
    margin-bottom: 1.5rem;

    .form-label {
        display: block;
        color: $color-text-dark;
        font-weight: 600;
        margin-bottom: 0.5rem;
        font-size: $font-size-base;
    }

    .form-select {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 2px solid $color-border-muted;
        border-radius: 8px;
        font-size: $font-size-base;
        color: $color-text-dark;
        background: $color-white;
        transition: all 0.2s ease;

        &:focus {
            outline: none;
            border-color: $color-button;
            box-shadow: 0 0 0 3px rgba($color-button, 0.1);
        }

        &:hover {
            border-color: $color-button;
        }
    }
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

// Assign Modal Styles
.status-active {
    color: #28a745;
    font-weight: 600;
}

.status-inactive {
    color: #dc3545;
    font-weight: 600;
}

.status-pending {
    color: #ffc107;
    font-weight: 600;
}

.member-option {
    &:hover {
        background-color: #f8f9fa !important;
    }

    &.selected {
        background-color: #e3f2fd !important;
    }
}

.selected-member-display {
    margin-top: 1rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;

    .selected-member-info {
        display: flex;
        align-items: center;
        gap: 1rem;

        .member-avatar {
            width: 40px;
            height: 40px;
            background: #007bff;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
        }

        .member-details {
            flex: 1;

            .member-name {
                font-weight: 600;
                color: #000000;
                margin-bottom: 0.25rem;
            }

            .member-id {
                color: #666;
                font-size: 0.9rem;
            }
        }

        .clear-member-btn {
            background: none;
            border: none;
            color: #dc3545;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 4px;
            transition: background-color 0.2s;

            &:hover {
                background-color: #f8d7da;
            }
        }
    }

    // Member Dropdown Styling
    .member-dropdown {
        .member-option {
            .member-info {
                .member-name {
                    color: #000000 !important;
                    font-weight: 600;
                    font-size: 1rem;
                    margin-bottom: 0.25rem;
                }

                .member-details {
                    .member-id {
                        color: #3498db !important;
                        font-weight: 500;
                        font-size: 0.875rem;
                        margin-right: 0.75rem;
                    }

                    .member-email {
                        color: #7f8c8d !important;
                        font-size: 0.875rem;
                        font-style: italic;
                    }
                }
            }

            &:hover {
                .member-name {
                    color: #1a252f !important;
                }
                .member-id {
                    color: #2980b9 !important;
                }
                .member-email {
                    color: #5d6d7e !important;
                }
            }

            &.selected {
                .member-name {
                    color: #000000 !important;
                }
                .member-id {
                    color: #1976d2 !important;
                }
                .member-email {
                    color: #424242 !important;
                }
            }
        }
    }
}

// Meals Tab Styles
.meals-filters-section {
    background: $color-card-bg;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: $shadow-sm;

    .filters-row {
        display: flex !important;
        gap: 1rem;
        align-items: center;
        flex-wrap: nowrap;
        margin-bottom: 1rem;

        .filter-options-group {
            display: flex;
            gap: 1rem;
            align-items: center;
            flex-shrink: 0;
        }

        .meals-search {
            flex: 1;
            min-width: 250px;
            position: relative;
            margin-bottom: 0 !important; // Override default search-box margin

            i {
                position: absolute;
                left: 1rem;
                top: 50%;
                transform: translateY(-50%);
                color: $color-muted;
                z-index: 1;
            }

            .search-input {
                width: 100%;
                padding: 0.75rem 1rem 0.75rem 2.5rem;
                border: 1px solid $color-border-muted;
                border-radius: 6px;
                font-size: $font-size-base;
                background: $color-card-bg;
                color: $color-text-dark;
                transition: border-color 0.2s;

                &:focus {
                    outline: none;
                    border-color: $color-button;
                    box-shadow: 0 0 0 3px rgba($color-button, 0.1);
                }

                &:hover {
                    border-color: $color-button;
                }

                &::placeholder {
                    color: $color-muted;
                    font-size: $font-size-sm;
                }
            }
        }

        .filter-group {
            min-width: 150px;

            .filter-select {
                padding: 0.5rem 1rem;
                border: 1px solid $color-border-muted;
                border-radius: 6px;
                background: $color-card-bg;
                color: $color-text-dark;
                font-size: $font-size-sm;
                min-width: 150px;
                cursor: pointer;
                transition: border-color 0.2s;
                width: 100%;

                &:focus {
                    outline: none;
                    border-color: $color-button;
                    box-shadow: 0 0 0 3px rgba($color-button, 0.1);
                }

                &:hover {
                    border-color: $color-button;
                }
            }
        }

        .clear-filters-btn {
            background: $color-muted;
            color: $color-white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: $font-size-sm;
            cursor: pointer;
            transition: background 0.2s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            white-space: nowrap;

            &:hover {
                background: color.adjust($color-muted, $lightness: -10%);
            }

            i {
                font-size: 0.875rem;
            }
        }
    }

    .filter-stats {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .filter-count {
            font-size: 0.875rem;
            color: $color-muted;
        }

        .loading-indicator {
            color: $color-button;
            font-size: 0.875rem;

            i {
                margin-right: 0.5rem;
            }
        }
    }
}

.meals-table-container {
    background: $color-card-bg;
    border-radius: 12px;
    box-shadow: $shadow-sm;
    overflow: hidden;

    .loading-state,
    .error-state,
    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        text-align: center;

        i {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: $color-muted;
        }

        p {
            color: $color-muted;
            font-size: 1.1rem;
            margin-bottom: 1rem;
        }

        .retry-btn {
            background: $color-button;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
                background: color.adjust($color-button, $lightness: -10%);
            }
        }
    }

    .error-state i {
        color: #dc3545;
    }
}

.table-responsive {
    overflow-x: auto;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    margin: 0;
    
    @media (max-width: 768px) {
        margin: 0;
        border-radius: 0;
    }
}

.meals-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;

    th {
        background: #f8f9fa;
        color: $color-text-dark;
        font-weight: 600;
        padding: 1rem 0.75rem;
        text-align: left;
        border-bottom: 2px solid #dee2e6;
        white-space: nowrap;

        &.sortable {
            cursor: pointer;
            user-select: none;
            transition: background-color 0.2s ease;

            &:hover {
                background: #e9ecef;
            }

            i {
                margin-left: 0.5rem;
                opacity: 0.5;
                transition: opacity 0.2s ease;
            }

            &:hover i {
                opacity: 0.8;
            }
        }
    }

    td {
        padding: 0.75rem;
        border-bottom: 1px solid #dee2e6;
        vertical-align: top;

        &.meal-name {
            font-weight: 500;
            color: $color-text-dark;

            .meal-name-cell {
                display: flex;
                align-items: center;
            }

            .meal-thumb-wrapper,
            .meal-thumb-placeholder {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                overflow: hidden;
                flex-shrink: 0;
                background: #f1f3f5;
            }

            .meal-thumb-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
            }

            .meal-thumb-placeholder {
                color: #adb5bd;
                font-size: 0.75rem;
            }

            .meal-name-text {
                line-height: 1.2;

                strong {
                    display: block;
                }

                .meal-description-muted {
                    font-size: 0.65rem;
                    color: #6c757d;
                    margin-top: 0.125rem;
                    line-height: 1.2;
                    opacity: 0.8;
                }

                .meal-serving-muted {
                    font-size: 0.75rem;
                    color: #6c757d;
                    margin-top: 0.125rem;
                }
            }
        }

        &.meal-description {
            max-width: 200px;
            word-wrap: break-word;
            color: $color-muted;
        }

        &.serving-description {
            font-size: 0.8rem;
            color: $color-muted;
        }

        &.food-type {
            .food-type-badge {
                display: inline-block;
                padding: 0.25rem 0.5rem;
                border-radius: 12px;
                font-size: 0.75rem;
                color: #000000;
                font-weight: 500;
                text-transform: capitalize;

                &.general {
                    background: #e9ecef;
                    color: #495057;
                }
                &.fruit {
                    background: #d4edda;
                    color: #155724;
                }
                &.vegetable {
                    background: #d1ecf1;
                    color: #0c5460;
                }
                &.meat {
                    background: #f8d7da;
                    color: #721c24;
                }
                &.dairy {
                    background: #fff3cd;
                    color: #856404;
                }
                &.grain {
                    background: #ffeaa7;
                    color: #6c5ce7;
                }
                &.protein {
                    background: #fdcb6e;
                    color: #e17055;
                }
                &.beverage {
                    background: #a29bfe;
                    color: #6c5ce7;
                }
            }
        }

        &.calories,
        &.protein,
        &.carbs,
        &.fat,
        &.fiber,
        &.sugar,
        &.sodium {
            text-align: right;
            font-weight: 500;
            color: $color-text-dark;
        }

        &.actions {
            white-space: nowrap;

            .action-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 32px;
                height: 32px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s ease;
                margin-right: 0.5rem;

                &.view-btn {
                    background: #e3f2fd;
                    color: #1976d2;

                    &:hover {
                        background: #bbdefb;
                    }
                }

                &.edit-btn {
                    background: #fff3e0;
                    color: #f57c00;

                    &:hover {
                        background: #ffe0b2;
                    }
                }
            }
        }
    }

    .meal-row {
        transition: background-color 0.2s ease;

        &:hover {
            background-color: #f8f9fa;
        }
    }
}

.pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: #f8f9fa;
    border-top: 1px solid #dee2e6;

    .pagination-info {
        font-size: 0.875rem;
        color: $color-muted;
    }

    .pagination-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .pagination-btn {
            display: flex;
            align-items: center;
            padding: 0.5rem 1rem;
            background: white;
            border: 1px solid #dee2e6;
            border-radius: 6px;
            color: $color-text-dark;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.875rem;

            &:hover:not(:disabled) {
                background: #e9ecef;
                border-color: #adb5bd;
            }

            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            i {
                font-size: 0.75rem;
            }
        }

        .pagination-numbers {
            display: flex;
            gap: 0.25rem;

            .pagination-number {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                background: white;
                border: 1px solid #dee2e6;
                border-radius: 6px;
                color: $color-text-dark;
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 0.875rem;

                &:hover {
                    background: #e9ecef;
                    border-color: #adb5bd;
                }

                &.active {
                    background: $color-button;
                    border-color: $color-button;
                    color: white;
                }
            }
        }
    }
}

// Editor placeholder styles
.editor-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    background: $color-card-bg;
    border-radius: 12px;
    box-shadow: $shadow-sm;

    .placeholder-content {
        text-align: center;
        color: $color-muted;

        .placeholder-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
            opacity: 0.5;
        }

        h4 {
            margin-bottom: 0.5rem;
            color: $color-text-dark;
        }

        p {
            margin-bottom: 0.5rem;
        }

        small {
            font-size: 0.875rem;
        }
    }
}

// Responsive styles for meals tab
@media (max-width: 768px) {
    .meals-filters-section .filters-row {
        flex-direction: column;
        align-items: stretch;

        .meals-search {
            width: 100%;
            min-width: auto;
        }

        .filter-options-group {
            flex-direction: column;
            align-items: stretch;

            .filter-group,
            .clear-filters-btn {
                width: 100%;
            }
        }
    }
}

@media (max-width: $breakpoint-md) {
    .meals-table {
        font-size: 0.8rem;

        th,
        td {
            padding: 0.5rem 0.4rem;
        }

        td.meal-description {
            max-width: 150px;
        }
    }

    .pagination-container {
        flex-direction: column;
        gap: 1rem;
        text-align: center;

        .pagination-controls {
            justify-content: center;
        }
    }
}

// New Meal Button Styling
.new-meal-btn {
    background: $color-button;
    color: $color-white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: $font-size-base;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
                    background: color.adjust($color-button, $lightness: -8%);
        transform: translateY(-1px);
        box-shadow: $shadow-md;
    }

    i {
        font-size: 0.9rem;
    }
}

// New Meal Modal Overlay
.new-meal-overlay {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background: rgba(0, 0, 0, 0.5) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    z-index: 9999 !important;
}

// New Meal Modal Styles
.new-meal-modal {
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;

    .modal-body {
        padding: 0;
    }

    .new-meal-form {
        .form-section {
            padding: 1.5rem;
            border-bottom: 1px solid #eee;

            &:last-child {
                border-bottom: none;
            }

            .section-title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                color: $color-text-dark;
                font-size: 1.1rem;
                font-weight: 600;

                .toggle-btn {
                    background: none;
                    border: none;
                    color: $color-button;
                    cursor: pointer;
                    padding: 0.25rem;
                    border-radius: 4px;
                    transition: all 0.2s ease;

                    &:hover {
                        background: rgba($color-button, 0.1);
                    }

                    i {
                        font-size: 0.875rem;
                    }
                }
            }
        }

        .form-row {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;

            &:last-child {
                margin-bottom: 0;
            }

            .form-group {
                flex: 1;

                &.full-width {
                    flex: none;
                    width: 100%;
                }

                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: $color-text-dark;
                    font-weight: 500;
                    font-size: 0.9rem;
                }

                .form-input,
                .form-select,
                .form-textarea {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid $color-border-muted;
                    border-radius: 6px;
                    font-size: $font-size-base;
                    background: $color-card-bg;
                    color: $color-text-dark;
                    transition: border-color 0.2s ease;

                    &:focus {
                        outline: none;
                        border-color: $color-button;
                        box-shadow: 0 0 0 3px rgba($color-button, 0.1);
                    }

                    &::placeholder {
                        color: $color-muted;
                    }
                }

                .form-textarea {
                    resize: vertical;
                    min-height: 60px;
                }

                .form-select {
                    cursor: pointer;
                }
            }
        }

        .advanced-nutrition {
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #eee;
            animation: fadeIn 0.3s ease;
        }

        .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            padding: 1.5rem;
            background: #f8f9fa;
            border-top: 1px solid #eee;
            margin: 0;

            .btn-secondary,
            .btn-primary {
                padding: 0.75rem 1.5rem;
                border-radius: 6px;
                font-size: $font-size-base;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;

                &:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            }

            .btn-secondary {
                background: white;
                color: $color-text-dark;
                border: 1px solid $color-border-muted;

                &:hover:not(:disabled) {
                    background: #f8f9fa;
                    border-color: #adb5bd;
                }
            }

            .btn-primary {
                background: $color-button;
                color: white;
                border: none;

                &:hover:not(:disabled) {
                    background: color.adjust($color-button, $lightness: -8%);
                    transform: translateY(-1px);
                }

                i {
                    font-size: 0.875rem;
                }
            }
        }
    }

    // Image Upload Styles
    .image-upload-container {
        .image-upload-input {
            display: none;
        }

        .image-upload-area {
            border: 2px dashed $color-border-muted;
            border-radius: 8px;
            padding: 2rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            background: #fafafa;

            &:hover {
                border-color: $color-button;
                background: rgba($color-button, 0.05);
            }

            .upload-placeholder {
                i {
                    font-size: 3rem;
                    color: $color-muted;
                    margin-bottom: 1rem;
                    display: block;
                }

                p {
                    font-size: 1.1rem;
                    color: $color-text-dark;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                }

                small {
                    color: $color-muted;
                    font-size: 0.875rem;
                }
            }

            .image-preview {
                position: relative;
                display: inline-block;

                .preview-image {
                    max-width: 200px;
                    max-height: 150px;
                    border-radius: 6px;
                    object-fit: cover;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .image-overlay {
                    position: absolute;
                    top: 0;
                    right: 0;
                    transform: translate(50%, -50%);

                    .remove-image-btn {
                        background: #ff4757;
                        color: white;
                        border: none;
                        border-radius: 50%;
                        width: 32px;
                        height: 32px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                        transition: all 0.2s ease;

                        &:hover {
                            background: #ff3838;
                            transform: scale(1.1);
                        }

                        i {
                            font-size: 0.875rem;
                        }
                    }
                }
            }
        }
    }
}

// Responsive styles for new meal modal
@media (max-width: $breakpoint-md) {
    .new-meal-modal {
        max-width: 95%;
        margin: 1rem;

        .new-meal-form {
            .form-row {
                flex-direction: column;
                gap: 0.75rem;
            }

            .form-actions {
                flex-direction: column;

                .btn-secondary,
                .btn-primary {
                    width: 100%;
                    justify-content: center;
                }
            }
        }
    }
}

// Assigned Meals Styles - using exact structure from AssignedMealReports.vue
.assigned-meals-container {
    min-height: 85vh;
}

.filters-section {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    align-items: center;
    flex-wrap: wrap;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.75rem;
        padding: 0.75rem;
    }
    
    .filter-input {
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        background: white;
        color: $color-text-dark;
        
        &::placeholder {
            color: #999 !important;
            opacity: 1 !important;
            font-style: italic;
            font-size: 0.9rem;
        }
        
        &::-webkit-input-placeholder {
            color: #999 !important;
            opacity: 1 !important;
            font-style: italic;
        }
        
        &::-moz-placeholder {
            color: #999 !important;
            opacity: 1 !important;
            font-style: italic;
        }
        
        &:-ms-input-placeholder {
            color: #999 !important;
            opacity: 1 !important;
            font-style: italic;
        }
        
        &:focus {
            outline: none;
            border-color: $primary;
            box-shadow: 0 0 0 2px rgba($primary, 0.2);
            
            &::placeholder {
                color: #ccc !important;
                opacity: 1 !important;
            }
            
            &::-webkit-input-placeholder {
                color: #ccc !important;
                opacity: 1 !important;
            }
            
            &::-moz-placeholder {
                color: #ccc !important;
                opacity: 1 !important;
            }
            
            &:-ms-input-placeholder {
                color: #ccc !important;
                opacity: 1 !important;
            }
        }
        
        &.search-input {
            flex: 2;
            min-width: 200px;
            
            @media (max-width: 768px) {
                flex: 1;
                width: 100%;
                min-width: 100%;
            }
        }
        
        &.date-input {
            flex: 1;
            min-width: 140px;
            
            @media (max-width: 768px) {
                width: 100%;
                min-width: 100%;
            }
        }
        
        &.select-input {
            flex: 1;
            min-width: 120px;
            
            @media (max-width: 768px) {
                width: 100%;
                min-width: 100%;
            }
        }
    }
}

.table-container {
    background: $color-card-bg;
    border-radius: 12px;
    box-shadow: $shadow-sm;
    overflow: hidden;
    position: relative;
    padding: 0;
    width: 100%;
    margin: 0;
    
    @media (max-width: 768px) {
        border-radius: 8px;
        margin: 0;
    }
}

.scroll-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: $color-background-hover;
    color: $color-muted;
    font-size: $font-size-sm;
    border-bottom: 1px solid $color-border-muted;
    
    i {
        color: $primary;
        font-size: 1rem;
    }
    
    span {
        font-weight: 500;
    }
}

.table-wrapper {
    overflow-x: auto;
    overflow-y: auto;
    max-height: 70vh;
    width: 100%;
    position: relative;
    -webkit-overflow-scrolling: touch;
    
    @media (max-width: 768px) {
        max-height: 60vh;
        margin: 0;
        border-radius: 0;
    }
    
    // Custom scrollbar styling
    &::-webkit-scrollbar {
        height: 8px;
        width: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
        
        &:hover {
            background: #a8a8a8;
        }
    }
}

.table-container {
    .loading-state,
    .error-state,
    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        text-align: center;

        i {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: $color-muted;
        }

        p {
            color: $color-muted;
            font-size: 1.1rem;
            margin-bottom: 1rem;
        }

        .retry-btn {
            background: $color-button;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
                background: color.adjust($color-button, $lightness: -10%);
            }
        }
    }

    .error-state i {
        color: #dc3545;
    }
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 1400px; // Increased to ensure horizontal scrolling
    margin-bottom: 0;
    border: none;
    table-layout: auto; // Changed to auto for better column sizing
    font-size: 0.875rem;
    
    thead {
        background-color: #f8f9fa;
        position: sticky;
        top: 0;
        z-index: 10;
        
        tr {
            th {
                background-color: #f8f9fa;
            }
        }
        
        th {
            background-color: #f8f9fa;
            color: $color-text-dark;
            font-family: $font-family-base;
            font-weight: 600;
            padding: 1rem 0.75rem;
            text-align: left;
            white-space: nowrap;
            border-bottom: 2px solid #dee2e6;
        }
    }
    
    tbody {
        .data-row {
            border: none;
            transition: background-color 0.2s ease;
            cursor: pointer;
            
            &:nth-child(even) {
                background-color: transparent;
            }

            &:hover {
                background-color: #f8f9fa;
            }
            
            td {
                padding: 0.75rem;
                vertical-align: middle;
                color: $color-text-dark;
                font-family: $font-family-base;
                font-weight: $font-weight-normal;
                border-bottom: 1px solid #dee2e6;
            }
        }
    }
}

.sticky-column {
    position: sticky;
    left: 0;
    z-index: 5;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
    
    &.user-cell {
        background: white;
        min-width: 130px;
        
        .user-info {
            .user-link {
                text-decoration: none;
                color: $color-text-dark;
                transition: all 0.3s ease;
                
                &:hover {
                    text-decoration: underline;
                    color: $primary;
                }
                
                .user-name {
                color: inherit;
                font-weight: $font-weight-normal;
                font-size: $font-size-sm;
                }
            }
        }
    }
}

.date-cell {
    min-width: 100px;
}

.data-cell {
    text-align: center;
    min-width: 85px;
}

.plan-column {
    min-width: 200px;
}

.notes-column {
    min-width: 250px;
}

.text-cell {
    color: $color-text-dark;
    word-wrap: break-word;
    white-space: normal;
}

.pagination-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: #f8f9fa;
    border-top: 1px solid #dee2e6;
    
    .pagination-info {
        font-size: 0.875rem;
        color: $color-muted;
    }
    
    .pagination-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
        .btn-pagination {
            display: flex;
            align-items: center;
            padding: 0.5rem 1rem;
            background: white;
            border: 1px solid #dee2e6;
            border-radius: 6px;
            color: $color-text-dark;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.875rem;
            
            &:hover:not(:disabled) {
                background: #e9ecef;
                border-color: #adb5bd;
            }
            
            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        }
        
        .page-info {
            color: $color-text-dark;
            font-weight: 500;
        }
    }
}

// Responsive design for Assigned Meals
@media (max-width: 768px) {
    .filters-section {
        flex-direction: column;
        gap: 0.75rem;
        
        .filter-input {
            flex: none;
            min-width: auto;
            width: 100%;
        }
    }
    
    .pagination-section {
        flex-direction: column;
        gap: 1rem;
    }
    
    .table-wrapper {
        max-height: 60vh;
    }
    
    .data-table {
        min-width: 1600px;
    }
}

@media (max-width: 1024px) {
    .filters-section {
        .filter-input {
            &.search-input {
                min-width: 150px;
            }
            
            &.date-input {
                min-width: 120px;
            }
            
            &.select-input {
                min-width: 100px;
            }
        }
    }
}

// Ensure horizontal scrolling is always available
@media (min-width: 769px) {
    .table-wrapper {
        overflow-x: auto;
        overflow-y: auto;
    }
    
    .data-table {
        min-width: 1400px;
    }
}

// Recent Messages Table Styles

// Responsive design for Recent Messages table
// @media (max-width: 768px) {
//     .recent-messages-header {
//         padding: 1rem;
//         flex-direction: column;
//         align-items: flex-start;
//         gap: 0.5rem;
        
//         .recent-messages-title {
//             font-size: 1.1rem;
//         }
//     }
    
//     .recent-messages-table-container {
//         max-height: 60vh;
//     }
    
//     .recent-messages-table {
//         min-width: 1600px;
        
//         thead {
//             tr {
//                 th {
//                     padding: 10px 8px;
//                     font-size: 0.8rem;
//                 }
//             }
//         }
        
//         tbody {
//             tr {
//                 td {
//                     padding: 10px 8px;
//                     font-size: 0.8rem;
                    
//                     &.message-cell {
//                         max-width: 150px;
//                     }
//                 }
//             }
//         }
//     }
// }

// @media (max-width: 1024px) {
//     .recent-messages-table-container {
//         max-height: 60vh;
//     }
    
//     .recent-messages-table {
//         min-width: 1600px;
//     }
// }

// Ensure horizontal scrolling is always available
@media (min-width: 769px) {
    .recent-messages-table-container {
        overflow-x: auto;
        overflow-y: auto;
    }
    
    .recent-messages-table {
        min-width: 1400px;
    }
}

// Right Side Modal Overlay
.right-side-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 0;
    animation: fadeIn 0.3s ease;
    overflow: hidden;
    
    @media (max-width: 576px) {
        align-items: stretch;
    }
}

// Prevent body scrolling when Create Meal Plan modal is open
body:has(.right-side-modal-overlay) {
    overflow: hidden !important;
}

html:has(.right-side-modal-overlay) {
    overflow: hidden !important;
}

.right-side-modal-content {
    max-width: 600px;
    width: 100%;
    max-height: calc(100vh - 2rem);
    height: auto;
    background: white;
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
    transform: translateX(0);
    animation: slideInRight 0.3s ease;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin: 1rem;
    position: relative;
    
    // Adjust width when sidebar is open (sidebar is typically 260-280px)
    // For 1440px screen with sidebar open, we have ~1160px available width
    &.sidebar-open {
        max-width: 600px;
        
        @media (min-width: 1200px) and (max-width: 1600px) {
            max-width: 520px;
        }
        
        // Specific adjustment for 1440px screens with sidebar
        @media (min-width: 1400px) and (max-width: 1500px) {
            max-width: 480px;
        }
    }
    
    // Also check if body or html has sidenav-open class (fallback)
    body:has(.main-content-wrap.sidenav-open) &,
    html:has(.main-content-wrap.sidenav-open) & {
        max-width: 600px;
        
        @media (min-width: 1400px) and (max-width: 1500px) {
            max-width: 480px;
        }
    }
    
    @media (min-width: 1200px) and (max-width: 1600px) {
        max-width: 650px;
    }
    
    @media (max-width: 992px) {
        max-width: 550px;
        max-height: calc(100vh - 1rem);
        
        &.sidebar-open,
        .sidenav-open & {
            max-width: 480px;
        }
    }
    
    @media (max-width: 768px) {
        max-width: calc(100% - 2rem);
        max-height: calc(100vh - 1rem);
        margin: 0.5rem;
        
        &.sidebar-open,
        .sidenav-open & {
            max-width: calc(100% - 2rem);
        }
    }
    
    @media (max-width: 576px) {
        max-width: 100%;
        max-height: 100vh;
        margin: 0;
        border-radius: 0;
        
        &.sidebar-open,
        .sidenav-open & {
            max-width: 100%;
        }
    }

    .modal-header {
        flex-shrink: 0;
        padding: 12px;
        border-bottom: 1px solid #e9ecef;
        background: #f8f9fa;

        .modal-title {
            color: #333333 !important;
            font-weight: 700;
        }

        .modal-subtitle {
            color: #666666 !important;
        }
    }

    .modal-body {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 1.5rem;
        color: #333333;
        min-height: 0;
        -webkit-overflow-scrolling: touch;

        // Ensure all text is visible
        label {
            color: #333333 !important;
            font-weight: 600;
        }

        .modern-input,
        .modern-textarea,
        .modern-select {
            color: #333333 !important;
            background: #ffffff !important;
            border-color: #dee2e6 !important;

            &::placeholder {
                color: #999999 !important;
            }

            &:focus {
                border-color: #dc3545 !important;
                box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.25) !important;
            }
        }
    }

    // Compact image upload for right-side modal
    .image-upload-compact {
        width: 40%;
        height: 120px;
        border: 1px dashed #dee2e6;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        background: #f8f9fa;

        &:hover {
            border-color: #dc3545;
            background: #f8d7da;
        }

        .image-placeholder-compact {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            color: #333333 !important;

            i {
                font-size: 1.5rem;
                color: #dc3545 !important;
            }

            span {
                font-size: 0.9rem;
                font-weight: 500;
                color: #333333 !important;
            }
        }

        .meal-plan-image-compact {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 6px;
        }
    }

    .image-actions-compact {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;

        .image-action-btn-compact {
            background: #6c757d;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                background: #5a6268;
            }

            &:first-child {
                background: #dc3545;

                &:hover {
                    background: #c82333;
                }
            }
        }
    }

    // Horizontal layout for right-side modal
    .top-sections-container-vertical {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin-bottom: 1rem;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;

        .meal-plan-targets-section {
            flex: 1;
            min-width: 0;
            margin-bottom: 0;
        }
        
        .nutrition-levels-summary {
            flex: 0 0 35%;
            min-width: 0;
            margin-bottom: 0;
            
            @media (max-width: 1200px) {
                flex: 0 0 40%;
            }
        }
        
        @media (max-width: 768px) {
            flex-direction: column;
            gap: 1rem;
            
            .meal-plan-targets-section,
            .nutrition-levels-summary {
                width: 100%;
                flex: 1;
            }
        }

        // Responsive behavior for smaller screens
        @media (max-width: 768px) {
            flex-direction: column;

        .meal-plan-targets-section,
        .nutrition-levels-summary {
            width: 100%;
            }
        }

        // Target macros section for step 1
        .target-macros-section {
            margin: 1.5rem 0;
            padding: 1rem;
            margin-top: 10px;
            background: #f8f9fa;
            border-radius: 8px;
            border: 1px solid #e9ecef;

            .section-title {
                color: #333333 !important;
                font-size: 1rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
                text-align: left;
            }

            .macros-grid,
            .target-macros-grid {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 1rem;
                flex-direction: unset !important;

                .form-group {
                    margin-bottom: 1rem;

                    label {
                        font-size: 0.8rem;
                        font-weight: 500;
                        color: #333333 !important;
                        margin-bottom: 0.25rem;
                        display: block;
                        
                        strong {
                            font-size: 1rem;
                            color: #333333;
                        }
                    }

                    .input-with-symbol {
                        position: relative;
                        
                        .form-control.modern-input {
                            text-align: center;
                            font-weight: 600;
                            font-size: 1rem;
                            padding-right: 2.5rem;
                        }
                        
                        .input-symbol {
                            position: absolute;
                            right: 0.75rem;
                            top: 50%;
                            transform: translateY(-50%);
                            pointer-events: none;
                            font-weight: 600;
                            color: #6c757d;
                            font-size: 0.9rem;
                            
                            strong {
                                color: #6c757d;
                            }
                        }
                    }

                    .modern-input {
                        text-align: center;
                        font-weight: 600;
                        font-size: 1rem;
                    }

                    &.calories-display {
                        .calories-value-display {
                            width: 100% !important;
                            padding: 0.5rem 1rem !important;
                            border: 1px solid #dee2e6 !important;
                            border-radius: 8px !important;
                            font-size: 1rem !important;
                            background: #f8f9fa !important;
                            color: #333333 !important;
                            text-align: center !important;
                            font-weight: 600 !important;
                            min-height: 38px !important;
                            display: flex !important;
                            align-items: center !important;
                            justify-content: center !important;
                            transition: border-color 0.2s !important;
                            box-sizing: border-box !important;
                            
                            strong {
                                color: #dc3545;
                                font-size: 1.25rem;
                                margin-right: 0.5rem;
                            }
                        }
                        
                        .calories-value {
                            width: 100% !important;
                            padding: 0.5rem 1rem !important;
                            border: 1px solid #dee2e6 !important;
                            border-radius: 8px !important;
                            font-size: 1rem !important;
                            background: #ffffff !important;
                            color: #333333 !important;
                            text-align: center !important;
                            font-weight: 600 !important;
                            min-height: 38px !important;
                            display: flex !important;
                            align-items: center !important;
                            justify-content: center !important;
                            transition: border-color 0.2s !important;
                            box-sizing: border-box !important;
                        }
                    }
                }

                // Responsive behavior for smaller screens
                @media (max-width: 768px) {
                    grid-template-columns: 1fr !important;
                    
                    .form-group {
                        width: 100%;
                    }
                }
            }
            
            .alert-danger {
                background-color: rgb(243 235 235)a;
                border-color: #f5c6cb;
                color: #721c24;
                
                ul {
                    font-size: 0.9rem;
                    margin-top: 0.5rem;
                    
                    li {
                        margin-bottom: 0.25rem;
                    }
                }
            }
        }

        // Fix text colors in all sections
        .admin-info-header {
            .info-label,
            .info-value {
                color: #333333 !important;
            }
        }

        .meal-plan-targets-section {
            .targets-title {
                color: #333333 !important;
            }

            .target-label,
            .target-value,
            .current-intake {
                color: #333333 !important;
            }
        }

        .nutrition-levels-summary {
            .nutrition-levels-header,
            .nutrition-levels-subtitle {
                color: #333333 !important;
            }

            .nutrition-metric {
                .metric-label,
                .metric-value {
                    color: #333333 !important;
                }
            }
        }

        .meal-plan-instructions-section {
            .instructions-title {
                color: #333333 !important;
            }

            .instructions-text {
                color: #333333 !important;
            }
        }

        .meals-section {
            .section-title {
                color: #333333 !important;
            }
        }

        .form-actions-modern {
            .btn-secondary-modern,
            .btn-primary-modern {
                color: #ffffff !important;
            }
        }

        // Fix meal cards text colors
        .meal-cards-modern {
            .meal-card-modern {
                .meal-title {
                    color: #333333 !important;
                }

                .product-name {
                    color: #333333 !important;
                }

                .product-calories {
                    color: #666666 !important;
                }

                .quantity {
                    color: #333333 !important;
                }

                .empty-meal {
                    color: #666666 !important;
                }

                .more-products {
                    color: #dc3545 !important;
                }
            }
        }
    }

    // Mobile responsiveness
    @media (max-width: 768px) {
        .right-side-modal-content {
            width: 100%;
            max-width: 100%;
        }
    }
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
}

// Full Screen Modal
.full-screen-modal {
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: slideInUp 0.3s ease;

    .modal-header {
        flex-shrink: 0;
        border-bottom: 1px solid #e9ecef;
        background: #f8f9fa;

        .modal-title {
            color: #333333 !important;
            font-weight: 700;
            font-size: 1.5rem;
        }

        .modal-subtitle {
            color: #666666 !important;
            font-size: 1rem;
        }
    }

    .modal-body {
        flex: 1;
        overflow-y: auto;
        padding: 1rem;
        color: #333333;

        // Ensure all text is visible
        label {
            color: #333333 !important;
            font-weight: 600;
        }

        .modern-input,
        .modern-textarea,
        .modern-select {
            color: #333333 !important;
            background: #ffffff !important;
            border-color: #dee2e6 !important;

            &::placeholder {
                color: #999999 !important;
            }

            &:focus {
                border-color: #dc3545 !important;
                box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.25) !important;
            }
        }
    }

    // Image upload for full screen modal
    .image-upload-compact {
        width: 100%;
        height: 200px;
        border: 2px dashed #dee2e6;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        background: #f8f9fa;

        &:hover {
            border-color: #dc3545;
            background: #f8d7da;
        }

        .image-placeholder-compact {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            color: #333333 !important;

            i {
                font-size: 2rem;
                color: #dc3545 !important;
            }

            span {
                font-size: 1rem;
                font-weight: 500;
                color: #333333 !important;
            }
        }

        .meal-plan-image-compact {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 6px;
        }
    }

    .image-actions-compact {
        display: flex;
        gap: 0.5rem;
        margin-top: 0.5rem;

        .image-action-btn-compact {
            background: #6c757d;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                background: #5a6268;
            }

            &:first-child {
                background: #dc3545;

                &:hover {
                    background: #c82333;
                }
            }
        }
    }

    // Layout for full screen modal
    .top-sections-container-vertical {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        margin-bottom: 2rem;

        .meal-plan-targets-section {
            width: 70%;
            margin-bottom: 0;
        }
        
        .nutrition-levels-summary {
            width: 30%;
            margin-bottom: 0;
        }

        // Responsive behavior for smaller screens
        @media (max-width: 768px) {
            flex-direction: column;

        .meal-plan-targets-section,
        .nutrition-levels-summary {
            width: 100%;
            }
        }

        // Target macros section
        .target-macros-section {
            margin: 2rem 0;
            padding: 1.5rem;
            background: #f8f9fa;
            border-radius: 12px;
            border: 1px solid #e9ecef;

            .section-title {
                color: #333333 !important;
                font-size: 1.2rem;
                font-weight: 600;
                margin-bottom: 1.5rem;
                text-align: center;
            }

            .macros-grid,
            .target-macros-grid {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 1.5rem;
                flex-direction: unset !important;

                .form-group {
                    margin-bottom: 5px;

                    label {
                        font-size: 1rem;
                        font-weight: 500;
                        color: #333333 !important;
                        margin-bottom: 0.75rem;
                        display: block;
                    }

                    .modern-input {
                        text-align: center;
                        font-weight: 600;
                        font-size: 1.1rem;
                        padding: 0.75rem;
                    }

                    &.calories-display {
                        .calories-value {
                            width: 100% !important;
                            padding: 0.75rem !important;
                            border: 1px solid #dee2e6 !important;
                            border-radius: 8px !important;
                            font-size: 1.1rem !important;
                            background: #ffffff !important;
                            color: #333333 !important;
                            text-align: center !important;
                            font-weight: 600 !important;
                            min-height: 42px !important;
                            display: flex !important;
                            align-items: center !important;
                            justify-content: center !important;
                            transition: border-color 0.2s !important;
                            box-sizing: border-box !important;
                        }
                    }
                }

                // Responsive behavior for smaller screens
                @media (max-width: 768px) {
                    grid-template-columns: 1fr !important;
                    
                    .form-group {
                        width: 100%;
                    }
                }
            }
        }

        // Fix text colors in all sections
        .admin-info-header {
            .info-label,
            .info-value {
                color: #333333 !important;
            }
        }

        .meal-plan-targets-section {
            .targets-title {
                color: #333333 !important;
            }

            .target-label,
            .target-value,
            .current-intake {
                color: #333333 !important;
            }
        }

        .nutrition-levels-summary {
            .nutrition-levels-header,
            .nutrition-levels-subtitle {
                color: #333333 !important;
            }

            .nutrition-metric {
                .metric-label,
                .metric-value {
                    color: #333333 !important;
                }
            }
        }

        .meal-plan-instructions-section {
            .instructions-title {
                color: #333333 !important;
            }

            .instructions-text {
                color: #333333 !important;
            }
        }

        .meals-section {
            .section-title {
                color: #333333 !important;
            }
        }

        .form-actions-modern {
            .btn-secondary-modern,
            .btn-primary-modern {
                color: #ffffff !important;
            }
        }

        // Fix meal cards text colors
        .meal-cards-modern {
            .meal-card-modern {
                .meal-title {
                    color: #333333 !important;
                }

                .product-name {
                    color: #333333 !important;
                }

                .product-calories {
                    color: #666666 !important;
                }

                .quantity {
                    color: #333333 !important;
                }

                .empty-meal {
                    color: #666666 !important;
                }

                .more-products {
                    color: #dc3545 !important;
                }
            }
        }

        // Mobile responsiveness
        @media (max-width: 768px) {
            width: 100vw;
            height: 100vh;
            border-radius: 0;
            max-width: 100vw;
            max-height: 100vh;
        }
    }

    // Meal Tables Container
    .meal-tables-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;

        .meal-table-section {
            background: #ffffff;
            border: 1px solid #e9ecef;
            border-radius: 12px;
            overflow: visible;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            position: relative;

            .meal-table-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 5px;
                background: #f8f9fa;
                border-bottom: 1px solid #e9ecef;

                .meal-title-section {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;

                    .meal-icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 32px;
                        height: 32px;
                        background: #dc3545;
                        color: white;
                        border-radius: 50%;
                        font-size: 0.9rem;
                    }

                    .meal-title-container {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;

                    .meal-table-title {
                        margin: 0;
                        font-size: 1.1rem;
                        font-weight: 600;
                        color: #333333;
                            cursor: pointer;
                            transition: color 0.2s ease;

                            &:hover {
                                color: #dc3545;
                            }
                        }

                        .meal-title-edit {
                            .meal-title-input {
                                border: 1px solid #dc3545;
                                border-radius: 4px;
                                padding: 0.25rem 0.5rem;
                                font-size: 1.1rem;
                                font-weight: 600;
                                color: #333333;
                                background: white;
                                outline: none;
                                min-width: 200px;

                                &:focus {
                                    box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.25);
                                }
                            }
                        }

                        .edit-meal-title-btn {
                            background: transparent;
                            border: 1px solid #dee2e6;
                            color: #6c757d;
                            padding: 0.25rem 0.5rem;
                            border-radius: 4px;
                            font-size: 0.8rem;
                            cursor: pointer;
                            transition: all 0.2s ease;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            &:hover {
                                background: #f8f9fa;
                                border-color: #dc3545;
                                color: #dc3545;
                            }

                            i {
                                font-size: 0.7rem;
                            }
                        }
                    }
                }

                .meal-header-actions {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;

                    .dropdown {
                        position: relative;
                        z-index: 1000;

                        .meal-dropdown-btn {
                            background: transparent;
                            border: 1px solid #dee2e6;
                            color: #6c757d;
                            padding: 0.375rem 0.75rem;
                            border-radius: 6px;
                            font-size: 0.9rem;
                            cursor: pointer;
                            transition: all 0.2s ease;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            &:hover {
                                background: #f8f9fa;
                                border-color: #dc3545;
                                color: #dc3545;
                            }

                            &:focus {
                                box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
                            }

                            i {
                                font-size: 0.8rem;
                            }
                        }

                        .dropdown-menu {
                            position: absolute;
                            top: 100%;
                            right: 0;
                            left: auto;
                            min-width: 200px;
                            background: white;
                            border: 1px solid #dee2e6;
                            border-radius: 8px;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                            z-index: 10001;
                            margin-top: 0.25rem;
                            padding: 0.25rem 0;
                            list-style: none;
                            margin-bottom: 0;

                            &.show {
                                display: block !important;
                            }

                            .dropdown-item {
                                display: block;
                                width: 100%;
                                padding: 0.5rem 0.75rem;
                                color: #333333;
                                text-decoration: none;
                                background: none;
                                border: none;
                                text-align: left;
                                cursor: pointer;
                                transition: background-color 0.2s ease;
                                font-size: 0.9rem;

                                &:hover {
                                    background-color: #f8f9fa;
                                    color: #dc3545;
                                }

                                i {
                                    margin-right: 0.5rem;
                                    font-size: 0.8rem;
                                }

                                &.text-danger {
                                    color: #dc3545;

                                    &:hover {
                                        background-color: #fff5f5;
                                    }
                                }
                            }

                            .dropdown-divider {
                                height: 0;
                                margin: 0.5rem 0;
                                overflow: hidden;
                                border-top: 1px solid #e9ecef;
                            }
                        }
                    }
                }

                .add-product-btn-table {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: #dc3545;
                    color: white;
                    border: none;
                    padding: 5px 8px;
                    border-radius: 6px;
                    font-size: 0.8rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;

                    &:hover {
                        background: #c82333;
                        transform: translateY(-1px);
                    }

                    i {
                        font-size: 0.7rem;
                        }
                    }
                }
            }

            .nutrition-table-container {
                overflow-x: auto;
                overflow-y: visible;

                .nutrition-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 0.8rem;

                    thead {
                        background: #f8f9fa;

                        th {
                            padding: 10px;
                            text-align: left;
                            font-weight: 600;
                            color: #333333;
                            border-bottom: 1px solid #dee2e6;
                            white-space: nowrap;

                            &:first-child {
                                padding-left: 10px;
                            }

                            &:last-child {
                                padding-right: 10px;
                            }
                        }
                    }

                    tbody {
                        .empty-meal-row {
                            .empty-meal-content {
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                padding: 12px 5px;
                                color: #6c757d;
                                text-align: center;

                                i {
                                    font-size: 1rem;
                                    margin-bottom: 0.5rem;
                                    opacity: 0.5;
                                }
                            }
                        }

                        .product-row {
                            border-bottom: 1px solid #f1f3f4;
                            transition: background-color 0.2s ease;

                            &:hover {
                                background: #f8f9fa;
                            }

                            &:last-child {
                                border-bottom: none;
                            }

                            td {
                                padding: 6px;
                                vertical-align: middle;

                                &:first-child {
                                    padding-left: 10px;
                                }

                                &:last-child {
                                    padding-right: 10px;
                                }

                                &.normalized-serving-cell,
                                &.label-serving-cell,
                                &.notes-cell {
                                    .serving-edit-container,
                                    .notes-edit-container {
                                        display: flex;
                                        align-items: center;
                                        gap: 0.5rem;

                                        .serving-value {
                                            display: inline-flex;
                                            align-items: center;
                                            gap: 0.25rem;
                                        }
                                        
                                        .unit-suffix {
                                            color: #6c757d;
                                            font-size: 0.85em;
                                            font-weight: 500;
                                            user-select: none;
                                            pointer-events: none;
                                        }
                                        
                                        .serving-input-with-unit {
                                            display: flex;
                                            align-items: center;
                                            gap: 0.25rem;
                                        }
                                        
                                        .unit-suffix-input {
                                            color: #6c757d;
                                            font-size: 0.85em;
                                            font-weight: 500;
                                            user-select: none;
                                            pointer-events: none;
                                            padding: 0.25rem 0;
                                        }
                                        
                                        .saving-loader {
                                            display: inline-flex;
                                            align-items: center;
                                            margin-left: 0.5rem;
                                            color: #dc3545;
                                            
                                            i {
                                                font-size: 0.75rem;
                                            }
                                        }
                                        
                                        .saving-loader-input {
                                            display: inline-flex;
                                            align-items: center;
                                            margin-left: 0.25rem;
                                            color: #dc3545;
                                            
                                            i {
                                                font-size: 0.75rem;
                                            }
                                        }
                                        
                                        .serving-input:disabled {
                                            opacity: 0.6;
                                            cursor: not-allowed;
                                        }
                                        
                                        .serving-value,
                                        .notes-value {
                                            flex: 1;
                                            min-width: 0;
                                        }

                                        .edit-serving-icon-btn {
                                            background: transparent;
                                            border: none;
                                            color: #6c757d;
                                            padding: 0.25rem;
                                            cursor: pointer;
                                            transition: all 0.2s ease;
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            border-radius: 4px;
                                            flex-shrink: 0;

                                            i {
                                                font-size: 0.75rem;
                                            }

                                            &:hover {
                                                background: #f8f9fa;
                                                color: #dc3545;
                                            }

                                            &:focus {
                                                outline: none;
                                                box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
                                            }
                                        }

                                        .serving-input {
                                            flex: 1;
                                            padding: 0.25rem 0.5rem;
                                            border: 1px solid #dc3545;
                                            border-radius: 4px;
                                            font-size: 0.8rem;
                                            outline: none;
                                            min-width: 100px;

                                            &:focus {
                                                box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
                                                border-color: #dc3545;
                                            }
                                        }
                                    }
                                }
                            }

                            .product-name-cell {
                                .product-name {
                                    font-weight: 500;
                                    color: #333333;
                                }
                            }

                            .quantity-cell {
                                .quantity-controls {
                                    display: flex;
                                    align-items: center;
                                    gap: 0.5rem;

                                    .quantity-btn {
                                        width: 28px;
                                        height: 28px;
                                        border: 1px solid #dee2e6;
                                        background: white;
                                        color: #6c757d;
                                        border-radius: 4px;
                                        cursor: pointer;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        transition: all 0.2s ease;
                                        font-size: 0.7rem;

                                        &:hover {
                                            background: #f8f9fa;
                                            border-color: #dc3545;
                                            color: #dc3545;
                                        }

                                        &.minus-btn:hover {
                                            background: #f8d7da;
                                            border-color: #dc3545;
                                            color: #dc3545;
                                        }
                                    }

                                    .quantity {
                                        min-width: 30px;
                                        text-align: center;
                                        font-weight: 600;
                                        color: #333333;
                                    }
                                }
                            }

                            .calories-cell,
                            .protein-cell,
                            .carbs-cell,
                            .fat-cell {
                                font-weight: 500;
                                color: #333333;
                                text-align: center;
                            }

                            .actions-cell {
                                .remove-product-btn {
                                    background: #dc3545;
                                    color: white;
                                    border: none;
                                    width: 28px;
                                    height: 28px;
                                    border-radius: 4px;
                                    cursor: pointer;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    transition: all 0.2s ease;
                                    font-size: 0.7rem;

                                    &:hover {
                                        background: #c82333;
                                        transform: scale(1.05);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Alternative meal table styling
            &.alternate-meal {
                border: 2px solid #ffc107;
                background: linear-gradient(
                    120deg,
                    rgba(255, 193, 7, 0.05) 80%,
                    rgba(255, 193, 7, 0.1) 100%
                );

                .meal-table-header {
                    background: rgba(255, 193, 7, 0.1);
                    border-bottom-color: rgba(255, 193, 7, 0.3);
                }

                .alternate-badge {
                    background: #ffc107;
                    color: #000;
                    font-size: 0.7rem;
                    font-weight: 700;
                    padding: 0.2rem 0.5rem;
                    border-radius: 4px;
                    margin-left: 0.5rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
            }
        }
    }

@keyframes slideInUp {
    from {
        transform: translateY(50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
}

// Detailed Meal Plan Modal
.detailed-meal-plan-modal {
    .detailed-meal-content {
        max-width: 95vw;
        width: 1200px;
        max-height: 90vh;
        overflow-y: auto;
    }
}

// Custom Grid Layout for Detailed Meal Plan
.detailed-meal-plan-section {
    .detailed-meal-grid {
        display: flex;
        gap: 20px;
        margin-top: 1rem;
        
        .detailed-meal-left {
            flex: 2; // 8/12 = 66.67%
            min-width: 0; // Prevents flex item from overflowing
        }
        
        .detailed-meal-right {
            flex: 1; // 4/12 = 33.33%
            min-width: 0; // Prevents flex item from overflowing
        }
    }
    
    // Responsive design
    @media (max-width: 768px) {
        .detailed-meal-grid {
            flex-direction: column;
            gap: 15px;
        }
    }
    
    .nutrition-table-container {
        width: 100%;
        overflow-x: auto;
        
        .nutrition-table {
            width: 100%;
            min-width: 800px; // Ensure table doesn't get too cramped
        }
    }
    
    .meal-sidebar {
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        
        .meal-summary-bar {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 1rem;
            
            .summary-progress {
                margin-bottom: 0.5rem;
                
                .progress-bar {
                    height: 8px;
                    background: #e9ecef;
                    border-radius: 4px;
                    overflow: hidden;
                    
                    .progress-fill {
                        height: 100%;
                        background: linear-gradient(90deg, #dc3545, #c82333);
                        transition: width 0.3s ease;
                    }
                }
            }
            
            .summary-text {
                font-size: 0.9rem;
                font-weight: 600;
                color: #333333;
                text-align: center;
            }
        }
        
        .meal-instructions-section {
            background: #ffffff;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 1rem;
            
            .meal-instructions-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.75rem;
                
                .meal-instructions-title {
                    margin: 0;
                    font-size: 1rem;
                    font-weight: 600;
                    color: #333333;
                }
                
                .edit-meal-instructions-btn {
                    background: #dc3545;
                    color: white;
                    border: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 4px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.7rem;
                    transition: all 0.2s ease;
                    
                    &:hover {
                        background: #c82333;
                        transform: scale(1.05);
                    }
                }
            }
            
            // Editable cell styles for logs table
            .editable-cell {
                position: relative;
                cursor: pointer;
                transition: background-color 0.2s ease;
            }

            .editable-cell:hover {
                background-color: rgba(255, 64, 64, 0.05);
            }

            .editable-cell.editing-cell {
                background-color: rgba(255, 64, 64, 0.1);
                padding: 4px;
            }

            .cell-value.editable {
                cursor: pointer;
                padding: 4px 8px;
                border-radius: 4px;
                display: inline-block;
                min-width: 40px;
                transition: all 0.2s ease;
            }

            .cell-value.editable:hover {
                background-color: rgba(255, 64, 64, 0.1);
                color: #ff4040;
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

            .meal-instructions-content {
                .meal-instructions-text {
                    margin: 0;
                    font-size: 0.9rem;
                    color: #666666;
                    line-height: 1.4;
                }
            }
        }
    }
}

.detailed-meal-plan-section {
    .meal-header {
        .meal-title-bar {
            background: #dc3545;
            color: white;
            padding: 0.75rem 1rem;
            border-radius: 6px 6px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .meal-number {
                font-size: 1.1rem;
                font-weight: 700;
                letter-spacing: 0.5px;
            }

            .meal-actions {
                display: flex;
                gap: 0.5rem;

                .meal-menu-btn,
                .meal-edit-btn {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 0.9rem;
                    cursor: pointer;
                    padding: 0.25rem;
                    border-radius: 3px;
                    transition: all 0.3s ease;

                    &:hover {
                        background: rgba(255, 255, 255, 0.2);
                    }
                }
            }
        }
    }

    .nutrition-table-container {
        overflow-x: auto;
        border: 1px solid #e9ecef;
        border-top: none;
        border-radius: 0 0 6px 6px;

        .nutrition-table {
            width: 100%;
            border-collapse: collapse;
            background: white;

            .table-header {
                background: #dc3545;
                color: white;

                th {
                    padding: 0.75rem 0.5rem;
                    text-align: left;
                    font-weight: 600;
                    font-size: 0.9rem;
                    border-right: 1px solid rgba(255, 255, 255, 0.2);

                    &:last-child {
                        border-right: none;
                    }

                    &.remove-col {
                        width: 40px;
                        text-align: center;
                    }

                    &.ingredient-col {
                        min-width: 200px;
                    }

                    &.serving-col {
                        width: 120px;
                    }

                    &.nutrition-col {
                        width: 80px;
                        text-align: center;
                    }
                }
            }

            .ingredient-row {
                border-bottom: 1px solid #e9ecef;

                &:hover {
                    background: #f8f9fa;
                }

                td {
                    padding: 0.75rem 0.5rem;
                    font-size: 0.9rem;
                    border-right: 1px solid #e9ecef;

                    &:last-child {
                        border-right: none;
                    }

                    &.remove-cell {
                        text-align: center;
                        width: 40px;

                        .remove-ingredient-btn {
                            background: #dc3545;
                            color: white;
                            border: none;
                            border-radius: 3px;
                            padding: 0.25rem;
                            cursor: pointer;
                            font-size: 0.8rem;
                            transition: all 0.3s ease;

                            &:hover {
                                background: #c82333;
                            }
                        }
                    }

                    &.ingredient-cell {
                        font-weight: 500;
                        color: #333333;
                        position: relative;

                        .buy-now-btn {
                            background: #28a745;
                            color: white;
                            border: none;
                            padding: 0.25rem 0.5rem;
                            border-radius: 3px;
                            font-size: 0.7rem;
                            font-weight: 600;
                            cursor: pointer;
                            margin-left: 0.5rem;
                            transition: all 0.3s ease;

                            &:hover {
                                background: #218838;
                            }
                        }
                    }

                    &.serving-cell {
                        position: relative;

                        .serving-value {
                            display: block;
                            margin-bottom: 0.25rem;
                            font-weight: 500;
                            color: #333333;
                        }

                        .edit-serving-btn {
                            background: none;
                            border: none;
                            color: #dc3545;
                            font-size: 0.8rem;
                            cursor: pointer;
                            padding: 0.1rem;
                            border-radius: 2px;
                            transition: all 0.3s ease;

                            &:hover {
                                background: rgba(23, 162, 184, 0.1);
                            }
                        }
                    }

                    &.nutrition-cell {
                        text-align: center;
                        font-weight: 500;
                        color: #333333;
                    }
                }
            }

            .totals-row {
                background: #dc3545;
                color: white;
                font-weight: 700;

                .totals-label {
                    padding: 0.75rem 0.5rem;
                    font-size: 1rem;
                    text-align: left;
                }

                .totals-cell {
                    padding: 0.75rem 0.5rem;
                    text-align: center;
                    font-size: 0.95rem;
                    border-right: 1px solid rgba(255, 255, 255, 0.2);

                    &:last-child {
                        border-right: none;
                    }
                }
            }
        }
    }

    .meal-summary-bar {
        background: #dc3545;
        color: white;
        padding: 0.75rem 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;

        .summary-progress {
            flex: 1;

            .progress-bar {
                width: 100%;
                height: 8px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 4px;
                overflow: hidden;

                .progress-fill {
                    height: 100%;
                    background: #ffffff;
                    border-radius: 4px;
                    transition: width 0.3s ease;
                }
            }
        }

        .summary-text {
            font-size: 0.9rem;
            font-weight: 600;
            white-space: nowrap;
        }
    }

    .meal-instructions-section {
        margin-top: 1rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 6px;
        border: 1px solid #e9ecef;

        .meal-instructions-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.75rem;

            .meal-instructions-title {
                font-size: 1rem;
                font-weight: 600;
                color: #333333;
                margin: 0;
            }

            .edit-meal-instructions-btn {
                background: none;
                border: none;
                color: #dc3545;
                font-size: 0.9rem;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 3px;
                transition: all 0.3s ease;

                &:hover {
                    background: rgba(220, 53, 69, 0.1);
                }
            }
        }

        .meal-instructions-content {
            .meal-instructions-text {
                font-size: 0.95rem;
                color: #333333;
                margin: 0;
                line-height: 1.5;
            }
        }
    }
}

// Force grid layout for target macros
.target-macros-grid {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 1rem !important;
    flex-direction: unset !important;
}

@media (max-width: 768px) {
    .target-macros-grid {
        grid-template-columns: 1fr !important;
    }
}

// Force calories display styling
.calories-value {
    width: 100% !important;
    padding: 0.5rem 1rem !important;
    border: 1px solid #dee2e6 !important;
    border-radius: 8px !important;
    font-size: 1rem !important;
    background: #ffffff !important;
    color: #333333 !important;
    text-align: center !important;
    font-weight: 600 !important;
    min-height: 38px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: border-color 0.2s !important;
    box-sizing: border-box !important;
}

// Bootstrap dropdown customization for meal cards
.dropdown {
    position: relative;
    z-index: 1;

    &.show .dropdown-menu {
        display: block !important;
    }

    .dropdown-menu {
        display: none !important;
        position: absolute;
        top: 100%;
        right: 0;
        z-index: 99999;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        padding: 0.5rem 0;
        min-width: 180px;
        background: white;

        &.show {
            display: block !important;
            z-index: 99999;
        }

        .dropdown-item {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
            color: #333333;
            transition: all 0.2s ease;
            cursor: pointer;
            text-decoration: none;

            &:hover {
                background: #f8f9fa;
                color: #dc3545;
                text-decoration: none;
            }

            &.text-danger {
                color: #dc3545 !important;

                &:hover {
                    background: #f8d7da;
                    color: #721c24 !important;
                }
            }
        }

        .dropdown-divider {
            margin: 0.5rem 0;
            border-top: 1px solid #e9ecef;
        }
    }
}

// Force modern button style - highest priority
.add-products-modal button.add-product-btn-modal {
    width: 36px !important;
    height: 36px !important;
    min-width: 36px !important;
    min-height: 36px !important;
    max-width: 36px !important;
    max-height: 36px !important;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    color: #ffffff !important;
    border: none !important;
    border-radius: 50% !important;
    padding: 0 !important;
    margin: 0 !important;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4) !important;
    position: relative;
    overflow: hidden;
    font-size: 0 !important;
    font-weight: normal !important;
    gap: 0 !important;
    line-height: 1 !important;

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
    }

    &:hover {
        transform: scale(1.15) rotate(90deg) !important;
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6) !important;
        background: linear-gradient(135deg, #764ba2 0%, #667eea 100%) !important;
    }

    &:active {
        transform: scale(1.05) rotate(90deg) !important;
    }

    &:hover::before {
        width: 300px;
        height: 300px;
    }

    i {
        font-size: 1.1rem !important;
        position: relative;
        z-index: 1;
        color: #ffffff !important;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
        line-height: 1 !important;
        margin: 0 !important;
        display: block !important;
    }
}

// Video Tutorial Modal Styles
.video-tutorial-modal {
    .modal-content {
        border: none;
        border-radius: 16px;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
    }

    .modal-header {
        background: #f5f5f3;
        color: #252525;
        border-bottom: none;
        padding: 1.5rem 2rem;

        .modal-title {
            font-family: "Inter", Arial, sans-serif;
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0;
        }
    }

    .modal-body {
        padding: 2rem;
        background: #f5f5f3;
        color: #252525;
    }

    .video-container {
        position: relative;

        .video-loading-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(245, 245, 243, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            border-radius: 8px;
        }

        video {
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            background: #000;
            display: block;
        }
    }
}
</style>