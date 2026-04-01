<template>
    <div class="members-page-wrapper">
        <!-- Copy confirmation message -->
        <div class="copy-message" v-if="showCopyMessage">
            {{ copyMessage }}
        </div>
        
        <!-- Breadcrumb and Navigation Row -->
        <div class="breadcrumb-nav-row p-2 p-md-3">
            <!-- Breadcrumb Navigation -->
            <div class="breadcrumb-section">
                <nav class="breadcrumb-nav" aria-label="breadcrumb">
                    <div class="breadcrumb-container d-flex align-items-center">
                        <button 
                            @click.stop="goBack" 
                            class="back-button text-danger"
                            type="button"
                            title="Go back"
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
                                <i class="fas fa-users"></i>
                                Members
                            </li>
                        </ol>
                    </div>
                </nav>
            </div>
        </div>
        
        <div class="main-content">
            <!-- Page Header -->
            <div class="page-header p-2 p-md-3">
                <!-- First Row: Title and Action Buttons -->
                <div class="header-row-1 d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center mb-3">
                    <div class="header-left mb-2 mb-md-0">
                        <h1 class="page-title m-0">
                            Members
                        </h1>
                    </div>
                    
                    <div class="header-right d-flex justify-content-center justify-content-md-end">
                        <div class="header-actions d-flex flex-wrap">
                            <!-- Add New Member Button -->
                            <router-link
                                to="/app/members/addnewmember"
                                class="btn btn-primary btn-sm btn-add-member"
                            >
                                <i class="fas fa-user-plus me-1 me-sm-2"></i>
                                <span class="d-none d-sm-inline">Add Member</span>
                                <span class="d-sm-none">Add</span>
                            </router-link>
                            
                            <!-- Mail Button -->
                            <button
                                class="btn btn-lg btn-mail p-2"
                                @click="openInvitationModal"
                                title="Send Invitation"
                            >
                                <i class="fas fa-envelope"></i>
                            </button>

                            <!-- Video Tutorial Button -->
                            <button
                                class="btn btn-lg btn-mail p-2"
                                @click="openVideoTutorialModal"
                                title="Video Tutorial"
                            >
                                <i class="fas fa-video"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Second Row: Search and Filter Controls -->
                <div class="header-row-2 d-flex flex-column flex-md-row flex-wrap align-items-center align-items-md-center pb-2">
                    <div class="search-and-filters d-flex flex-wrap flex-grow-1 align-items-center w-100">
                        <!-- Search Field -->
                        <div class="search-field-container order-1 order-md-1 flex-grow-1 w-100">
                            <div class="search-field">
                                <i class="fas fa-search search-icon" v-if="!searchQuery"></i>
                                <i class="fas fa-times search-clear" v-else @click="clearSearch" title="Clear search"></i>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    class="search-input"
                                    v-model="searchQuery"
                                    @input="handleSearch"
                                />
                            </div>
                        </div>
                        
                        <!-- Filter Buttons -->
                        <div class="filter-buttons-container order-2 order-md-2 d-flex align-items-center justify-content-center justify-content-md-start w-100">
                            <div class="filter-buttons d-flex flex-wrap">
                            <b-dropdown
                                right
                                class="filter-btn status-dropdown"
                                no-caret
                                no-close-on-click
                                :class="{ 'active': statusFilter.length > 0 && statusFilter.length < 2 }"
                                @show="preventBodyScroll"
                                @hide="restoreBodyScroll"
                            >
                                <template #button-content>
                                    {{ getStatusDisplayName() }}
                                    <i class="fas fa-times" v-if="statusFilter.length > 0 && statusFilter.length < 2" @click.stop="clearStatusFilter"></i>
                                </template>
                                
                                <b-dropdown-item @click="setStatusFilter('active')" :class="{ 'selected': isActiveSelected }" :key="'active-' + statusFilter.join(',')">
                                    <input 
                                        type="checkbox" 
                                        :checked="isActiveSelected" 
                                        class="status-checkbox" 
                                        @click.stop
                                        @change="setStatusFilter('active')"
                                        :key="'active-checkbox-' + statusFilter.join(',')"
                                    />
                                    Active
                                </b-dropdown-item>
                                
                                <b-dropdown-item @click="setStatusFilter('inactive')" :class="{ 'selected': isInactiveSelected }" :key="'inactive-' + statusFilter.join(',')">
                                    <input 
                                        type="checkbox" 
                                        :checked="isInactiveSelected" 
                                        class="status-checkbox" 
                                        @click.stop
                                        @change="setStatusFilter('inactive')"
                                        :key="'inactive-checkbox-' + statusFilter.join(',')"
                                    />
                                    Inactive
                                </b-dropdown-item>
                            </b-dropdown>
                            <b-dropdown
                                id="coach-dropdown"
                                right
                                class="filter-btn coach-dropdown"
                                no-caret
                                no-close-on-click
                                :class="{ 'active': coachFilter.length > 0 && coachFilter.length < 2 }"
                                @show="onCoachDropdownShow"
                                @hide="restoreBodyScroll"
                            >
                                <template #button-content>
                                    {{ getCoachButtonText() }}
                                    <i class="fas fa-times" v-if="coachFilter.length > 0 && coachFilter.length < 2" @click.stop="clearCoachFilter"></i>
                                </template>
                                
                                <b-dropdown-item @click.stop.prevent="selectCoach('all', $event)" :key="'all-item-' + coachFilter.join(',')">
                                    <div class="d-flex align-items-center">
                                        <input 
                                            type="checkbox" 
                                            :checked="isAllCoachesSelected"
                                            class="coach-checkbox"
                                            @click.stop.prevent="selectCoach('all', $event)"
                                            :key="'all-checkbox-' + coachFilter.join(',')"
                                        />
                                        <span class="ml-2">All ({{ isAllCoachesSelected ? 'checked' : 'unchecked' }})</span>
                                    </div>
                                </b-dropdown-item>
                                
                                <b-dropdown-item 
                                    v-for="coach in availableCoaches" 
                                    :key="'coach-item-' + coach.value + '-' + coachFilter.join(',')"
                                    @click.stop.prevent="selectCoach(coach.value, $event)"
                                >
                                    <div class="d-flex align-items-center">
                                        <input 
                                            type="checkbox" 
                                            :checked="isCoachSelected(coach.value)"
                                            class="coach-checkbox"
                                            @click.stop.prevent="selectCoach(coach.value, $event)"
                                            :key="'coach-checkbox-' + coach.value + '-' + coachFilter.join(',')"
                                        />
                                        <span class="ml-2">{{ coach.name }} </span>
                                    </div>
                                </b-dropdown-item>
                                
                                <b-dropdown-item @click.stop.prevent="selectCoach('no-coach', $event)" :key="'no-coach-item-' + coachFilter.join(',')">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span>No coach</span>
                                        <div class="toggle-switch" :class="{ 'active': isNoCoachSelected }" @click.stop.prevent="selectCoach('no-coach', $event)">
                                            <div class="toggle-handle"></div>
                                        </div>
                                    </div>
                                </b-dropdown-item>
                            </b-dropdown>
                            <b-dropdown
                                id="membership-dropdown"
                                right
                                class="filter-btn membership-dropdown"
                                no-caret
                                no-close-on-click
                                :class="{ 'active': membershipFilter.length > 0 || endingMembership || pausedMembership || noMembership }"
                                @show="onMembershipDropdownShow"
                                @hide="restoreBodyScroll"
                            >
                                <template #button-content>
                                    {{ getMembershipButtonText() }}
                                    <i v-if="membershipFilter.length === 0 && !endingMembership && !pausedMembership && !noMembership"></i>
                                    <i v-else @click.stop="clearMembershipFilter"></i>
                                </template>
                                
                                <b-dropdown-item @click.stop.prevent="selectMembership('all', $event)" :key="'all-membership-item-' + membershipFilter.join(',')">
                                    <div class="d-flex align-items-center">
                                        <input 
                                            type="checkbox" 
                                            :checked="isAllMembershipsSelected"
                                            class="membership-checkbox"
                                            @click.stop.prevent="selectMembership('all', $event)"
                                            :key="'all-membership-checkbox-' + membershipFilter.join(',')"
                                        />
                                        <span class="ml-2">All</span>
                                    </div>
                                </b-dropdown-item>
                                
                                <b-dropdown-item 
                                    v-for="membership in availableMemberships" 
                                    :key="'membership-item-' + membership.value + '-' + membershipFilter.join(',')"
                                    @click.stop.prevent="selectMembership(membership.value, $event)"
                                >
                                    <div class="d-flex align-items-center">
                                        <input 
                                            type="checkbox" 
                                            :checked="isMembershipSelected(membership.value)"
                                            class="membership-checkbox"
                                            @click.stop.prevent="selectMembership(membership.value, $event)"
                                            :key="'membership-checkbox-' + membership.value + '-' + membershipFilter.join(',')"
                                        />
                                        <span class="ml-2">{{ membership.name }}</span>
                                    </div>
                                </b-dropdown-item>
                                
                                <b-dropdown-divider></b-dropdown-divider>
                                
                                <b-dropdown-item @click.stop.prevent="toggleEndingMembership">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span>Ending membership</span>
                                        <div class="toggle-switch" :class="{ 'active': endingMembership }" @click.stop.prevent="toggleEndingMembership">
                                            <div class="toggle-handle"></div>
                                        </div>
                                    </div>
                                </b-dropdown-item>
                                
                                <!-- Ending membership options - shown when toggle is on -->
                                <div v-if="endingMembership">
                                    <b-dropdown-item @click.stop.prevent="selectEndingMonth('august')">
                                        <div class="d-flex align-items-center">
                                            <input 
                                                type="radio" 
                                                name="endingMembershipMonth"
                                                value="august"
                                                :checked="endingMembershipMonth === 'august'"
                                                class="membership-radio"
                                                @click.stop
                                            />
                                            <span class="ml-2">August (Last month)</span>
                                        </div>
                                    </b-dropdown-item>
                                    
                                    <b-dropdown-item @click.stop.prevent="selectEndingMonth('september')">
                                        <div class="d-flex align-items-center">
                                            <input 
                                                type="radio" 
                                                name="endingMembershipMonth"
                                                value="september"
                                                :checked="endingMembershipMonth === 'september'"
                                                class="membership-radio"
                                                @click.stop
                                            />
                                            <span class="ml-2">September (This month)</span>
                                        </div>
                                    </b-dropdown-item>
                                    
                                    <b-dropdown-item @click.stop.prevent="selectEndingMonth('october')">
                                        <div class="d-flex align-items-center">
                                            <input 
                                                type="radio" 
                                                name="endingMembershipMonth"
                                                value="october"
                                                :checked="endingMembershipMonth === 'october'"
                                                class="membership-radio"
                                                @click.stop
                                            />
                                            <span class="ml-2">October (Next month)</span>
                                        </div>
                                    </b-dropdown-item>
                                    
                                    <b-dropdown-item @click.stop.prevent="selectEndingMonth('custom')">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex align-items-center">
                                                <input 
                                                    type="radio" 
                                                    name="endingMembershipMonth"
                                                    value="custom"
                                                    :checked="endingMembershipMonth === 'custom'"
                                                    class="membership-radio"
                                                    @click.stop
                                                />
                                                <span class="ml-2">Custom</span>
                                            </div>
                                            <div v-if="endingMembershipMonth === 'custom'" class="custom-date-picker">
                                                <input 
                                                    type="date" 
                                                    v-model="customEndingDate"
                                                    class="custom-date-input"
                                                    @click.stop
                                                    @change="onCustomDateChange"
                                                />
                                            </div>
                                        </div>
                                    </b-dropdown-item>
                                </div>
                                
                                <b-dropdown-item @click.stop.prevent="togglePausedMembership">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span>Paused membership</span>
                                        <div class="toggle-switch" :class="{ 'active': pausedMembership }" @click.stop.prevent="togglePausedMembership">
                                            <div class="toggle-handle"></div>
                                        </div>
                                    </div>
                                </b-dropdown-item>
                                
                                <b-dropdown-item @click.stop.prevent="toggleNoMembership">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span>No membership</span>
                                        <div class="toggle-switch" :class="{ 'active': noMembership }" @click.stop.prevent="toggleNoMembership">
                                            <div class="toggle-handle"></div>
                                        </div>
                                    </div>
                                </b-dropdown-item>
                            </b-dropdown>
                            <b-dropdown
                                id="tag-dropdown"
                                right
                                class="filter-btn tag-dropdown"
                                no-caret
                                no-close-on-click
                                :class="{ 'active': tagFilter !== null || noTag }"
                                @show="onTagDropdownShow"
                                @hide="restoreBodyScroll"
                            >
                                <template #button-content>
                                    {{ getTagButtonText() }}
                                    <i v-if="!tagFilter && !noTag"></i>
                                    <i v-else @click.stop="clearTagFilter"></i>
                                </template>
                                
                                <b-dropdown-item @click.stop.prevent="selectTag('all', $event)">
                                    <div class="d-flex align-items-center">
                                        <input 
                                            type="checkbox" 
                                            :checked="tagFilter === 'all'"
                                            class="tag-checkbox"
                                            @click.stop
                                        />
                                        <span class="ml-2">All</span>
                                    </div>
                                </b-dropdown-item>
                                
                                <b-dropdown-item 
                                    v-for="tag in availableTags" 
                                    :key="tag.value"
                                    @click.stop.prevent="selectTag(tag.value, $event)"
                                >
                                    <div class="d-flex align-items-center">
                                        <input 
                                            type="checkbox" 
                                            :checked="tagFilter === 'all' || tagFilter === tag.value"
                                            class="tag-checkbox"
                                            @click.stop
                                        />
                                        <span class="ml-2">{{ tag.name }}</span>
                                    </div>
                                </b-dropdown-item>
                                
                                <b-dropdown-item @click.stop.prevent="toggleNoTag">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span>No tag</span>
                                        <div class="toggle-switch" :class="{ 'active': noTag }" @click.stop.prevent="toggleNoTag">
                                            <div class="toggle-handle"></div>
                                        </div>
                                    </div>
                                </b-dropdown-item>
                            </b-dropdown>
                            <b-dropdown
                                right
                                class="filter-btn more-dropdown"
                                no-caret
                                @show="preventBodyScroll"
                                @hide="restoreBodyScroll"
                            >
                                <template  #button-content>
                                    More
                                </template>
                                <!-- <b-dropdown-item-dropdown text="Profile" right no-close-on-click>
                                    <template #text>
                                        <i class="i-User me-2"></i>
                                        Profile
                                    </template>
                                    <b-dropdown-item @click.stop.prevent="setProfileFilter('all')">
                                        <div class="d-flex align-items-center" style="gap: 10px;">
                                            <input
                                                type="checkbox"
                                                :checked="profileFilter === 'all'"
                                                class="profile-checkbox me-3"
                                                @click.stop
                                            />
                                            <span>All</span>
                                        </div>
                                    </b-dropdown-item>
                                    <b-dropdown-item @click.stop.prevent="setProfileFilter('with')">
                                        <div class="d-flex align-items-center" style="gap: 10px;">
                                            <input
                                                type="checkbox"
                                                :checked="profileFilter === 'all' || profileFilter === 'with'"
                                                class="profile-checkbox me-3"
                                                @click.stop
                                            />
                                            <span>With Profile</span>
                                        </div>
                                    </b-dropdown-item>
                                    <b-dropdown-item @click.stop.prevent="setProfileFilter('without')">
                                        <div class="d-flex align-items-center" style="gap: 10px;">
                                            <input
                                                type="checkbox"
                                                :checked="profileFilter === 'all' || profileFilter === 'without'"
                                                class="profile-checkbox me-3"
                                                @click.stop
                                            />
                                            <span>Without Profile</span>
                                        </div>
                                    </b-dropdown-item>
                                </b-dropdown-item-dropdown> -->
                                
                                <!-- <b-dropdown-divider></b-dropdown-divider> -->
                                
                                <b-dropdown-item @click="toggleFilterDropdown">
                                    <i class="i-Filter-2 me-2"></i>
                                    Filter
                                </b-dropdown-item>
                                
                                <b-dropdown-divider></b-dropdown-divider>
                                
                                <b-dropdown-item @click="showExportOptions('pdf')">
                                    <i class="i-File-Copy me-2"></i>
                                    Export PDF
                                </b-dropdown-item>
                                
                                <b-dropdown-item @click="showExportOptions('excel')">
                                    <i class="i-File-Excel me-2"></i>
                                    Export Excel
                                </b-dropdown-item>
                                
                                <b-dropdown-divider></b-dropdown-divider>
                                
                                <b-dropdown-item @click="Show_import_members()">
                                    <i class="i-Download me-2"></i>
                                    Import Members
                                </b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div
                v-if="isLoading"
                class="loading_page spinner spinner-primary mr-3"
            ></div>
            
            <!-- Main Content -->
            <div v-else class="main-content-wrapper">

                <!-- Members Table -->
                <div class="members-table-card">
                    <div class="card-body p-0 p-sm-3">

                        
                        <!-- Loading state -->
                        <div v-if="isLoading" class="text-center py-4">
                            <div class="spinner spinner-primary"></div>
                            <p class="mt-2">Loading members...</p>
                        </div>
                        
                        <!-- No data state -->
                        <div v-else-if="clients.length === 0" class="text-center py-4">
                            <i class="i-User-1" style="font-size: 48px; color: #ccc;"></i>
                            <h4 class="mt-3">No members found</h4>
                            <p class="text-muted" v-if="searchQuery">
                                No members match your search for "{{ searchQuery }}". Try different keywords.
                            </p>
                            <p class="text-muted" v-else>
                                Try adjusting your search criteria or filters.
                            </p>
                            <b-button variant="primary" @click="searchQuery ? clearSearch() : Get_Clients(1)" class="mt-3">
                                <i class="i-Reload-2 mr-2"></i>
                                {{ searchQuery ? 'Clear Search' : 'Retry' }}
                            </b-button>
                        </div>
                        
                        <!-- Search results info -->
                        <div v-if="searchQuery && clients.length > 0" class="search-results-info mb-3">
                            <small class="text-muted">
                                <i class="fas fa-search me-1"></i>
                                Found {{ clients.length }} member{{ clients.length !== 1 ? 's' : '' }} matching "{{ searchQuery }}"
                                <button class="btn btn-sm btn-link p-0 ms-2" @click="clearSearch">
                                    <i class="fas fa-times me-1"></i>Clear
                                </button>
                            </small>
                        </div>
                        
                        <!-- Table content -->
                        <div v-if="clients.length > 0" class="table-content-wrapper">
                            <!-- Table View - Always visible with horizontal scroll on small devices -->
                            <div class="table-responsive" ref="tableContainer">
                                <table class="table table-hover members-table" :class="{ 'selection-mode': showSelectionMode }">
                                <thead>
                                    <tr>
                                        <!-- Checkbox Column -->
                                        <th class="table-header text-center" style="width: 10px; min-width: 10px;">
                                            <input 
                                                type="checkbox" 
                                                class="select-all-checkbox"
                                                :checked="isAllSelected"
                                                @change="toggleSelectAll"
                                                @click.stop
                                            />
                                        </th>
                                        
                                        <!-- Members Column -->
                                        <th class="table-header text-left" style="width: 120px; min-width: 120px;">
                                            <div class="header-with-sort">
                                                <span class="header-text">Members ({{ displayTotalRows }})</span>
                                                <div class="sort-arrows">
                                                    <i class="fas fa-chevron-up sort-arrow" 
                                                       :class="{ 'active': sortOrder === 'asc' && sortField === 'name' }"
                                                       @click="sortMembers('asc', 'name')" 
                                                       title="Sort A-Z"></i>
                                                    <i class="fas fa-chevron-down sort-arrow" 
                                                       :class="{ 'active': sortOrder === 'desc' && sortField === 'name' }"
                                                       @click="sortMembers('desc', 'name')" 
                                                       title="Sort Z-A"></i>
                                                </div>
                                            </div>
                                        </th>
                                        
                                        <th class="table-header text-center" style="width: 50px; min-width: 50px;">Contact</th>
                                        <th class="table-header text-center" style="width: 100px; min-width: 100px;">Coach</th>
                                        <th class="table-header text-center" style="width: 75px; min-width: 75px;">
                                            <div class="header-with-sort">
                                                <span class="header-text">Member since</span>
                                                <div class="sort-arrows">
                                                    <i class="fas fa-chevron-up sort-arrow" 
                                                       :class="{ 'active': sortOrder === 'asc' && sortField === 'member_since' }"
                                                       @click="sortMembers('asc', 'member_since')" 
                                                       title="Sort Oldest First"></i>
                                                    <i class="fas fa-chevron-down sort-arrow" 
                                                       :class="{ 'active': sortOrder === 'desc' && sortField === 'member_since' }"
                                                       @click="sortMembers('desc', 'member_since')" 
                                                       title="Sort Newest First"></i>
                                                </div>
                                            </div>
                                        </th>
                                        <th class="table-header text-center" style="width: 75px; min-width: 75px;">
                                            <div class="header-with-sort">
                                                <span class="header-text">Activated on</span>
                                                <div class="sort-arrows">
                                                    <i class="fas fa-chevron-up sort-arrow" 
                                                       :class="{ 'active': sortOrder === 'asc' && sortField === 'activated_on' }"
                                                       @click="sortMembers('asc', 'activated_on')" 
                                                       title="Sort Oldest First"></i>
                                                    <i class="fas fa-chevron-down sort-arrow" 
                                                       :class="{ 'active': sortOrder === 'desc' && sortField === 'activated_on' }"
                                                       @click="sortMembers('desc', 'activated_on')" 
                                                       title="Sort Newest First"></i>
                                                </div>
                                            </div>
                                        </th>
                                        <th class="table-header text-center" style="width: 105px; min-width: 105px;">
                                            <div class="header-with-sort">
                                                <span class="header-text">Check In</span>
                                                <div class="sort-arrows">
                                                    <i class="fas fa-chevron-up sort-arrow" 
                                                       :class="{ 'active': sortOrder === 'asc' && sortField === 'check_in' }"
                                                       @click="sortMembers('asc', 'check_in')" 
                                                       title="Sort Oldest First"></i>
                                                    <i class="fas fa-chevron-down sort-arrow" 
                                                       :class="{ 'active': sortOrder === 'desc' && sortField === 'check_in' }"
                                                       @click="sortMembers('desc', 'check_in')" 
                                                       title="Sort Newest First"></i>
                                                </div>
                                            </div>
                                        </th>
                                        <th class="table-header text-center" style="width: 105px; min-width: 105px;">
                                            <div class="header-with-sort">
                                                <span class="header-text">Last online</span>
                                                <div class="sort-arrows">
                                                    <i class="fas fa-chevron-up sort-arrow" 
                                                       :class="{ 'active': sortOrder === 'asc' && sortField === 'last_online' }"
                                                       @click="sortMembers('asc', 'last_online')" 
                                                       title="Sort Oldest First"></i>
                                                    <i class="fas fa-chevron-down sort-arrow" 
                                                       :class="{ 'active': sortOrder === 'desc' && sortField === 'last_online' }"
                                                       @click="sortMembers('desc', 'last_online')" 
                                                       title="Sort Newest First"></i>
                                                </div>
                                            </div>
                                        </th>
                                        <!-- Unsubscribed since Column - Only show when inactive filter is selected -->
                                        <th v-if="isInactiveOnlySelected" class="table-header text-center" style="width: 120px; min-width: 120px;">
                                            <span class="header-text">Unsubscribed since</span>
                                        </th>
                                        <th class="table-header text-center" style="width: 10px; min-width: 10px;"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(client, index) in clients" :key="client.id" class="table-row" @click="showDetails(client)">
                                        <!-- Checkbox Column -->
                                        <td class="table-cell text-center members-column" @click.stop>
                                            <input 
                                                v-if="showSelectionMode"
                                                type="checkbox" 
                                                class="member-checkbox"
                                                :value="client.id"
                                                v-model="selectedMembers"
                                                @click.stop
                                            />
                                        </td>
                                        
                                        <!-- Members Column -->
                                        <td class="table-cell text-left members-column">
                                            <div class="member-profile">
                                            <div class="member-avatar">
                                                <img
                                                    :src="getProfileImageUrl(client.profile_image)"
                                                    alt="avatar"
                                                    class="member-image"
                                                    @error="handleImageError"
                                                />
                                            </div>
                                                <div class="member-details">
                                                    <div class="member-name-container">
                                            <span class="member-name">{{ client.membername }}</span>
                                                        <span class="pro-badge" v-if="getPlanName(client).toLowerCase().includes('pro')">PRO</span>
                                            </div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <!-- Contact Column -->
                                        <td class="table-cell text-center">
                                            <div class="member-contact">
                                                <div class="contact-icons">
                                                    <i class="fas fa-envelope contact-icon" 
                                                       :title="`${client.email || 'N/A'}`"
                                                       @click.stop="copyToClipboard(client.email, 'Email')"></i>
                                                    <i class="fas fa-phone contact-icon" 
                                                       :title="getPhoneNumber(client)"
                                                       style="transform: rotate(90deg);"
                                                       @click.stop="copyToClipboard(getPhoneNumber(client), 'Mobile Phone')"></i>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <!-- Coach Column -->
                                        <td class="table-cell text-center">
                                            <span class="coach-name">{{ getCoachName(client) }}</span>
                                        </td>
                                        
                                        <!-- Member since Column -->
                                        <td class="table-cell text-center">
                                            <span class="member-since">{{ getJoiningDate(client) }}</span>
                                        </td>
                                        
                                        <!-- Activated on Column -->
                                        <td class="table-cell text-center">
                                            <span class="activated-on">{{ getActivatedDate(client) }}</span>
                                        </td>
                                        
                                        <!-- Check In Column -->
                                        <td class="table-cell text-center">
                                            <span class="check-in">{{ getCheckInStatus(client) }}</span>
                                        </td>
                                        
                                        <!-- Last online Column -->
                                        <td class="table-cell text-center">
                                            <div class="last-online-container">
                                                <span class="last-online">{{ getLastLogin(client) }}</span>
                                                <span class="online-indicator" :class="getMemberStatus(client)"></span>
                                            </div>
                                        </td>
                                        
                                        <!-- Unsubscribed since Column - Only show when inactive filter is selected -->
                                        <td v-if="isInactiveOnlySelected" class="table-cell text-center">
                                            <span class="unsubscribed-since">{{ getUnsubscribedDate(client) }}</span>
                                        </td>
                                        
                                        <!-- Actions Column -->
                                        <td class="table-cell text-center" @click.stop>
                                            <div class="action-dropdown">
                                                <b-dropdown 
                                                    variant="link" 
                                                    toggle-class="text-decoration-none" 
                                                    size="lg" 
                                                    right 
                                                    no-caret
                                                    boundary="viewport"
                                                    :popper-opts="{ positionFixed: true }"
                                                >
                                                    <template v-slot:button-content>
                                                        <div class="dropdown-dots">
                                                            <i class="fas fa-ellipsis-v"></i>
                                                        </div>
                                                    </template>
                                                    
                                                    <!-- ACTIONS Section -->
                                                    <div class="dropdown-section-header">ACTIONS</div>
                                                    
                                                    <b-dropdown-item @click="Edit_Member(client)" class="dropdown-item action-edit">
                                                        <i class="nav-icon i-Edit font-weight-bold mr-2"></i>Edit Details
                                                    </b-dropdown-item>
                                                    
                                                    <b-dropdown-item @click="assignMembership(client)" class="dropdown-item action-assign">
                                                        <i class="nav-icon i-User font-weight-bold mr-2"></i>Assign Membership
                                                    </b-dropdown-item>
                
                                                    
                                                    <!-- GO TO Section -->
                                                    <div class="dropdown-section-header">GO TO</div>
                                                    
                                                    <!-- <b-dropdown-item @click="goToCoaching(client)" class="dropdown-item action-coaching">
                                                        <i class="nav-icon i-Clock font-weight-bold mr-2"></i>Coaching
                                                    </b-dropdown-item> -->
                                                    
                                                    <b-dropdown-item @click="goToInvoices(client)" class="dropdown-item action-invoices">
                                                        <i class="nav-icon i-File font-weight-bold mr-2"></i>Invoices
                                                    </b-dropdown-item>
                                                    
                                                    <b-dropdown-item @click="goToFiles(client)" class="dropdown-item action-files">
                                                        <i class="nav-icon i-Folder font-weight-bold mr-2"></i>Files
                                                    </b-dropdown-item>
                                                    
                                                    <b-dropdown-item @click="goToNotes(client)" class="dropdown-item action-notes">
                                                        <i class="nav-icon i-Notepad font-weight-bold mr-2"></i>Notes
                                                    </b-dropdown-item>
                                                    
                                                    <b-dropdown-divider></b-dropdown-divider>
                                                    
                                                    <b-dropdown-item @click="openMailModal(client)" class="dropdown-item action-mail">
                                                        <i class="nav-icon i-Email font-weight-bold mr-2"></i>Send Email
                                                    </b-dropdown-item>                                                                                                     
                                                </b-dropdown>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td :colspan="isInactiveOnlySelected ? 10 : 9" class="pagination-cell">
                                            <!-- Pagination -->
                                            <div class="pagination-container" v-if="limit !== 'all'">
                            <div class="pagination-info d-none d-md-block">
                                <span class="pagination-text">
                                    Showing {{ displayTotalRows > 0 ? ((serverParams.page - 1) * serverParams.perPage) + 1 : 0 }} to 
{{ displayTotalRows > 0 ? Math.min(serverParams.page * serverParams.perPage, displayTotalRows) : 0 }} of 
{{ displayTotalRows }} members (Page {{ serverParams.page }} of {{ getTotalPages() }})
                                </span>
                            </div>
                            
                            <div class="pagination-controls d-flex flex-column flex-sm-row align-items-center gap-2">
                                <div class="pagination-buttons d-flex align-items-center gap-1"
                                style="gap: 10px;"
                                >
                                    <b-button
                                        variant="outline-secondary"
                                        size="sm"
                                        :disabled="serverParams.page === 1"
                                        @click="onPageChange({ currentPage: serverParams.page - 1 })"
                                        class="pagination-btn"
                                    >
                                        <i class="i-Back-2"></i>
                                        <span class="d-none d-sm-inline">Previous</span>
                                    </b-button>
                                    
                                    <div class="page-numbers d-flex flex-wrap justify-content-center gap-1">
                                        <b-button
                                            v-for="page in getPageNumbers()"
                                            :key="page"
                                            :variant="page === serverParams.page ? 'primary' : 'outline-secondary'"
                                            size="sm"
                                            @click="onPageChange({ currentPage: page })"
                                            class="page-number-btn"
                                        >
                                            {{ page }}
                                        </b-button>
                                    </div>
                                    
                                    <b-button
                                        variant="outline-secondary"
                                        size="sm"
                                        :disabled="serverParams.page >= getTotalPages()"
                                        @click="onPageChange({ currentPage: serverParams.page + 1 })"
                                        class="pagination-btn"
                                    >
                                        <span class="d-none d-sm-inline">Next</span>
                                        <i class="i-Right-2"></i>
                                    </b-button>
                                </div>
                            </div>
                            
                            <div class="per-page-selector d-flex flex-column flex-sm-row align-items-center gap-2 mt-2 mt-sm-0">
                                <b-form-select
                                    v-model="limit"
                                    :options="perPageOptions"
                                    size="sm"
                                    @change="onPerPageChange"
                                    class="per-page-select"
                                ></b-form-select>
                                                <span class="per-page-text d-none d-sm-inline">Members per page</span>
                                            </div>
                                        </div>

                                            <!-- Show All Mode Controls -->
                                            <div class="pagination-container" v-if="limit === 'all'">
                                                <div class="pagination-info d-none d-md-block">
                                                    <span class="pagination-text">
                                                        Showing all {{ displayTotalRows }} members (All pages)
                                                    </span>
                                                </div>
                                                
                                                <div class="per-page-selector d-flex flex-column flex-sm-row align-items-center gap-2">
                                                    <label class="per-page-label">Show:</label>
                                                    <b-form-select
                                                        v-model="limit"
                                                        :options="perPageOptions"
                                                        size="sm"
                                                        @change="onPerPageChange"
                                                        class="per-page-select"
                                                    ></b-form-select>
                                                    <span class="per-page-text d-none d-sm-inline">Members per page</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filter Sidebar -->
        <b-sidebar
            id="sidebar-right"
            title="Filter Members"
            right
            shadow
            backdrop
            width="400px"
            class="filter-sidebar"
        >
            <div class="filter-container">
                <div class="filter-section">
                    <div class="form-group">
                        <label class="filter-label">
                            <i class="i-User mr-1"></i>
                            Member Name
                        </label>
                        <b-form-input
                            v-model="Filter_Name"
                            placeholder="Search by member name..."
                            @input="onFilterChange"
                            class="filter-input"
                        ></b-form-input>
                    </div>

                    <div class="form-group">
                        <label class="filter-label">
                            <i class="i-ID-Card mr-1"></i>
                            Member ID
                        </label>
                        <b-form-input
                            v-model="Filter_Code"
                            placeholder="Search by member ID..."
                            @input="onFilterChange"
                            class="filter-input"
                        ></b-form-input>
                    </div>

                    <div class="form-group">
                        <label class="filter-label">
                            <i class="i-Phone-2 mr-1"></i>
                            Phone Number
                        </label>
                        <b-form-input
                            v-model="Filter_Phone"
                            placeholder="Search by mobile phone number..."
                            @input="onFilterChange"
                            class="filter-input"
                        ></b-form-input>
                    </div>

                    <div class="form-group">
                        <label class="filter-label">
                            <i class="i-Email mr-1"></i>
                            Email Address
                        </label>
                        <b-form-input
                            v-model="Filter_Email"
                            placeholder="Search by email..."
                            @input="onFilterChange"
                            class="filter-input"
                        ></b-form-input>
                    </div>

                    <div class="form-group">
                        <label class="filter-label">
                            <i class="i-Calendar-4 mr-1"></i>
                            Plan Name
                        </label>
                        <b-form-input
                            v-model="Filter_PlanName"
                            placeholder="Search by plan name..."
                            @input="onFilterChange"
                            class="filter-input"
                        ></b-form-input>
                    </div>
                </div>

                <div class="filter-actions">
                    <b-button
                        variant="primary"
                        @click="applyFilters"
                        class="btn-apply-filters"
                        size="sm"
                    >
                        <i class="i-Filter-2 mr-2"></i>
                        Apply Filters
                    </b-button>

                    <b-button
                        variant="outline-secondary"
                        @click="clearFilters"
                        class="btn-clear-filters"
                        size="sm"
                    >
                        <i class="i-Close-Window mr-2"></i>
                        Clear All
                    </b-button>
                </div>
            </div>
        </b-sidebar>

        <!-- Export Options Modal -->
        <b-modal
            id="exportOptionsModal"
            :title="exportType === 'pdf' ? 'Export PDF' : 'Export Excel'"
            size="md"
            centered
        >
            <div class="text-center">
                <p class="mb-3">What would you like to export?</p>
                
                <div class="d-flex flex-column gap-2">
                    <b-button
                        variant="outline-primary"
                        @click="exportData('current')"
                        class="mb-2"
                    >
                        <i class="i-File-Copy mr-2"></i>
                        Current Page Only ({{ clients.length }} members)
                    </b-button>
                    
                    <b-button
                        variant="outline-success"
                        @click="exportData('all')"
                        class="mb-2"
                    >
                        <i class="i-Download mr-2"></i>
                        All Members ({{ totalRows }} members)
                    </b-button>
                </div>
            </div>
            
            <template #modal-footer>
                <b-button 
                    variant="secondary" 
                    @click="$bvModal.hide('exportOptionsModal')"
                    class="btn-cancel-export"
                >
                    Cancel
                </b-button>
            </template>
        </b-modal>


        <!-- Import Members Modal -->
        <b-modal
            id="importClients"
            :title="'Import Members'"
            size="lg"
            centered
            scrollable
        >
            <div class="import-content">
                <div class="import-instructions">
                    <h6 class="import-title">
                        <i class="i-Info mr-2"></i>
                        Import Instructions
                    </h6>
                    <p class="import-text">
                        Upload a CSV file with member information. The file should include the following columns:
                    </p>
                    
                    <div class="required-fields">
                        <h6 class="fields-title">Required Fields:</h6>
                        <ul class="fields-list">
                            <li><strong>firstName</strong> - Member's first name</li>
                            <li><strong>lastName</strong> - Member's last name</li>
                            <li><strong>email</strong> - Member's email address</li>
                        </ul>
                    </div>
                    
                    <div class="optional-fields">
                        <h6 class="fields-title">Optional Fields:</h6>
                        <ul class="fields-list">
                            <li><strong>mobile_phone</strong> - Mobile phone number</li>
                            <li><strong>dob</strong> - Date of birth (YYYY-MM-DD)</li>
                            <li><strong>gender</strong> - Male/Female</li>
                            <li><strong>address</strong> - Street address</li>
                            <li><strong>city</strong> - City</li>
                            <li><strong>state</strong> - State/Province</li>
                            <li><strong>zip</strong> - ZIP/Postal code</li>
                            <li><strong>height</strong> - Height in inches (stored as cm in database)</li>
                            <li><strong>weight</strong> - Weight in pounds (stored as kg in database)</li>
                            <li><strong>medical</strong> - Medical conditions</li>
                            <li><strong>emergencyName</strong> - Emergency contact name</li>
                            <li><strong>emergencyPhone</strong> - Emergency contact phone</li>
                            <li><strong>plan</strong> - Membership plan</li>
                            <li><strong>startDate</strong> - Membership start date (YYYY-MM-DD)</li>
                            <li><strong>endDate</strong> - Membership end date (YYYY-MM-DD)</li>
                        </ul>
                    </div>
                </div>

                <b-form @submit.prevent="Submit_import" enctype="multipart/form-data" class="import-form">
                    <div class="file-upload-section">
                        <div class="file-input-wrapper">
                            <input 
                                type="file" 
                                @change="onFileSelected" 
                                accept=".csv"
                                class="file-input"
                                ref="fileInput"
                            >
                            <div class="file-input-display">
                                <i class="i-Upload mr-2"></i>
                                <span v-if="!import_members">Choose CSV file...</span>
                                <span v-else class="file-selected">{{ import_members.name }}</span>
                            </div>
                        </div>
                        
                        <div v-if="fileError" class="file-error">
                            <i class="i-Close-Window mr-1"></i>
                            {{ fileError }}
                        </div>
                    </div>

                    <div class="import-actions">
                        <div class="action-buttons">
                            <b-button 
                                type="submit" 
                                variant="primary" 
                                :disabled="ImportProcessing || !import_members" 
                                size="sm" 
                                class="btn-import-submit"
                            >
                                <i class="i-Upload mr-2"></i>
                                {{ ImportProcessing ? 'Importing...' : 'Import Members' }}
                            </b-button>
                            
                            <div v-if="ImportProcessing" class="import-progress">
                                <div class="spinner spinner-primary"></div>
                                <span class="progress-text">Processing import...</span>
                            </div>
                        </div>

                        <div class="download-section">
                            <b-button
                                :href="'/import/exemples/import_members.csv'"
                                variant="outline-info"
                                size="sm"
                                class="btn-download-template"
                                download
                            >
                                <i class="i-Download mr-2"></i>
                                Download Template
                            </b-button>
                        </div>
                    </div>
                </b-form>

                <div class="import-results" v-if="importResults">
                    <div class="results-header">
                        <h6 class="results-title">
                            <i class="i-Info mr-2"></i>
                            Import Results
                        </h6>
                    </div>
                    
                    <div class="results-content">
                        <div class="result-item success" v-if="importResults.success">
                            <i class="i-Yes mr-2"></i>
                            <span>{{ importResults.message }}</span>
                        </div>
                        <div class="result-item error" v-else>
                            <i class="i-Close-Window mr-2"></i>
                            <span>{{ importResults.message }}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <template #modal-footer>
                <b-button 
                    variant="secondary" 
                    @click="$bvModal.hide('importClients')"
                    class="btn-close-import"
                >
                    Close
                </b-button>
            </template>
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
                            <i class="i-Email mr-1"></i>
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
                            <i class="i-User mr-1"></i>
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
                            <i class="i-Text-Width mr-1"></i>
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
                            <i class="i-Notepad mr-1"></i>
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
                            <i class="i-Text-Width mr-1"></i>
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
                        <i class="i-Email mr-2" v-if="!mailForm.sending"></i>
                        <div class="spinner spinner-sm mr-2" v-if="mailForm.sending"></div>
                        {{ mailForm.sending ? 'Sending...' : 'Send Email' }}
                    </b-button>
                </div>
            </template>
        </b-modal>

        <!-- Invitation Modal -->
        <b-modal
            id="invitationModal"
            :title="`Send invitation - ${invitationData.totalExpiredMembers || 0} members`"
            size="lg"
            centered
            @show="loadInvitationData"
            @shown="fixModalBackdrop"
            class="invitation-modal-fix"
        >
            <div class="invitation-modal-content">
                <p class="invitation-description mb-3">
                    There are {{ invitationData.totalExpiredMembers || 0 }} members in your database whose subscriptions have expired. You can send renewal invitations to remind them to reactivate their memberships. Your database also includes members who have received invitations, but haven't renewed their subscriptions. Select 'Members already invited' to re-send invitations to these members. The invitation will only be sent if the last invite was sent more than 7 days ago. You can exit this screen after clicking 'Send invitation.' The system will send a confirmation to the specified email address after all invites have been sent.
                </p>
                
                <div class="invitation-options mb-3">
                    <div class="form-check mb-2">
                        <input 
                            class="form-check-input" 
                            type="checkbox" 
                            id="nonInvitedClients"
                            v-model="invitationForm.nonInvitedClients"
                        />
                        <label class="form-check-label" for="nonInvitedClients">
                            Non-invited members ({{ invitationData.nonInvitedClients }})
                        </label>
                    </div>
                    
                    <div class="form-check mb-3">
                        <input 
                            class="form-check-input" 
                            type="checkbox" 
                            id="alreadyInvitedClients"
                            v-model="invitationForm.alreadyInvitedClients"
                        />
                        <label class="form-check-label" for="alreadyInvitedClients">
                            Members already invited ({{ invitationData.alreadyInvitedClients }})
                        </label>
                    </div>
                </div>

                <!-- Member Lists -->
                <div class="members-list-container">
                    <!-- Non-invited Members List -->
                    <div v-if="invitationData.nonInvitedMembersList && invitationData.nonInvitedMembersList.length > 0" class="member-list-section mb-4">
                        <h6 class="member-list-title mb-2">
                            <i class="fas fa-users me-2"></i>
                            Non-invited Members ({{ invitationData.nonInvitedMembersList.length }})
                        </h6>
                        <div class="table-responsive">
                            <table class="table table-sm table-hover member-list-table">
                                <thead>
                                    <tr>
                                        <th style="width: 40px;">
                                            <input 
                                                type="checkbox" 
                                                class="form-check-input"
                                                :checked="areAllNonInvitedSelected"
                                                @change="toggleAllNonInvitedMembers"
                                                title="Select All"
                                            />
                                        </th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Plan</th>
                                        <th>Expired Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="member in invitationData.nonInvitedMembersList" :key="'non-invited-' + member.id">
                                        <td>
                                            <input 
                                                type="checkbox" 
                                                class="form-check-input"
                                                :value="member.id"
                                                v-model="invitationForm.selectedMemberIds"
                                            />
                                        </td>
                                        <td>{{ member.name }}</td>
                                        <td>{{ member.email }}</td>
                                        <td>{{ member.phone || 'N/A' }}</td>
                                        <td>{{ member.plan_name }}</td>
                                        <td>{{ member.subscription_end_date_formatted }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Already Invited Members List -->
                    <div v-if="invitationData.alreadyInvitedMembersList && invitationData.alreadyInvitedMembersList.length > 0" class="member-list-section mb-4">
                        <h6 class="member-list-title mb-2">
                            <i class="fas fa-user-check me-2"></i>
                            Already Invited Members ({{ invitationData.alreadyInvitedMembersList.length }})
                        </h6>
                        <div class="table-responsive">
                            <table class="table table-sm table-hover member-list-table">
                                <thead>
                                    <tr>
                                        <th style="width: 40px;">
                                            <input 
                                                type="checkbox" 
                                                class="form-check-input"
                                                :checked="areAllAlreadyInvitedSelected"
                                                @change="toggleAllAlreadyInvitedMembers"
                                                title="Select All"
                                            />
                                        </th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Plan</th>
                                        <th>Expired Date</th>
                                        <th>Last Invitation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="member in invitationData.alreadyInvitedMembersList" :key="'invited-' + member.id">
                                        <td>
                                            <input 
                                                type="checkbox" 
                                                class="form-check-input"
                                                :value="member.id"
                                                v-model="invitationForm.selectedMemberIds"
                                            />
                                        </td>
                                        <td>{{ member.name }}</td>
                                        <td>{{ member.email }}</td>
                                        <td>{{ member.phone || 'N/A' }}</td>
                                        <td>{{ member.plan_name }}</td>
                                        <td>{{ member.subscription_end_date_formatted }}</td>
                                        <td>{{ member.last_invitation_date_formatted }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div v-if="invitationData.totalExpiredMembers === 0" class="text-center py-4">
                        <i class="fas fa-check-circle fa-3x text-success mb-3"></i>
                        <p class="text-muted">No members with expired subscriptions found.</p>
                    </div>
                </div>
                
                <div class="email-section mt-3">
                    <label for="confirmationEmail" class="form-label">Confirmation Email</label>
                    <input 
                        type="email" 
                        class="form-control" 
                        id="confirmationEmail"
                        v-model="invitationForm.confirmationEmail"
                        placeholder="Enter confirmation email address"
                    />
                    <small class="form-text text-muted">You will receive a confirmation email after invitations are sent.</small>
                </div>
            </div>
            
            <template #modal-footer>
                <div class="modal-footer-actions">
                    <b-button 
                        variant="secondary" 
                        @click="closeInvitationModal"
                    >
                        Cancel
                    </b-button>
                    <b-button 
                        variant="primary" 
                        @click="sendInvitations"
                        :disabled="(!hasSelectedMembers && !invitationForm.nonInvitedClients && !invitationForm.alreadyInvitedClients) || invitationForm.sending || invitationData.totalExpiredMembers === 0"
                    >
                        <span v-if="invitationForm.sending">
                            <i class="fas fa-spinner fa-spin me-2"></i>
                            Sending...
                        </span>
                        <span v-else>
                            Send invitation
                        </span>
                    </b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NProgress from "nprogress";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
    metaInfo: {
        title: "Members",
    },
    data() {
        return {
            card_id: "",
            member_id: "",
            isLoading: true,
            SubmitProcessing: false,
            ImportProcessing: false,
            searchQuery: "", // Search field for members
            activeFilters: ['active'], // Default active filter
            serverParams: {
                columnFilters: {},
                sort: {
                    field: "created_at",
                    type: "desc",
                },
                page: 1,
                perPage: 25,
            },
            showDropdown: false,
            selectedIds: [],
            selectedMembers: [], // Array to store selected member IDs
            showSelectionMode: false, // Control when to show individual checkboxes
            showCopyMessage: false,
            copyMessage: '',
            statusFilter: ['active', 'inactive'], // Default to show all members (All Status), now supports multiple selections
            totalRows: 0,
            sortOrder: 'asc', // Default sort order: 'asc' or 'desc'
            sortField: 'name', // Default sort field: 'name', 'member_since', 'activated_on', 'check_in', 'last_online'

            limit: "25",
            Filter_Name: "",
            Filter_Code: "",
            Filter_Phone: "",
            Filter_Email: "",
            Filter_PlanName: "",
            clients: [],
            editmode: false,
            import_members: "",
            data: new FormData(),
            client: {
                id: "",
                name: "",
                code: "",
                email: "",
                mobile_phone: "",
                plan: "",
            },
            exportType: 'pdf',
            filterTimeout: null,
            fileError: null,
            importResults: null,
            subscriptionPlans: [],

            // Mail modal related
            mailForm: {
                memberId: null,
                to: "",
                recipientName: "",
                subject: "",
                message: "",
                template: null,
                sending: false
            },

            // Invitation modal related
            invitationForm: {
                nonInvitedClients: false,
                alreadyInvitedClients: false,
                confirmationEmail: "thorstrengthfitness@gmail.com",
                sending: false,
                selectedMemberIds: [] // Array to store selected member IDs
            },
            invitationData: {
                nonInvitedClients: 0,
                alreadyInvitedClients: 0,
                totalExpiredMembers: 0,
                nonInvitedMembersList: [],
                alreadyInvitedMembersList: []
            },
            emailTemplates: [
                { value: 'welcome', text: 'Welcome Message' },
                { value: 'membership_reminder', text: 'Membership Reminder' },
                { value: 'payment_reminder', text: 'Payment Reminder' },
                { value: 'workout_reminder', text: 'Workout Reminder' },
                { value: 'custom', text: 'Custom Message' }
            ],

            // Coach filter data
            coachFilter: [], // Array to support multiple coach selections
            availableCoaches: [],
            showCoachDropdown: false,
            
            // Membership filter data
            membershipFilter: [], // Array to support multiple membership selections
            availableMemberships: [], // Will be populated from database
            showMembershipDropdown: false,
            
            // Membership status toggles
            endingMembership: false,
            endingMembershipMonth: 'september', // Default to current month
            customEndingDate: '', // Custom date for ending membership
            pausedMembership: false,
            noMembership: false,
            
            // Tag filter data
            tagFilter: null, // null (no filter), 'all', or specific tag
            showTagDropdown: false,
            availableTags: [], // Will be populated from database
            
            // Tag status toggles
            noTag: false,
            
            // Selection mode
            showSelectionMode: false,
            
            // Profile filter data
            profileFilter: null, // null, 'with', or 'without'
        };
    },

    computed: {
        ...mapGetters(["currentUserPermissions", "currentUser"]),
        
        currentTime() {
            return new Date().toLocaleString();
        },

        // Computed properties for status filter checkboxes
        isActiveSelected() {
            return this.statusFilter.includes('active');
        },

        isInactiveSelected() {
            return this.statusFilter.includes('inactive');
        },

        // Check if only inactive filter is selected (to show Unsubscribed since column)
        isInactiveOnlySelected() {
            return this.statusFilter.length === 1 && this.statusFilter[0] === 'inactive';
        },

        // Computed properties for invitation member selection
        areAllNonInvitedSelected() {
            if (!this.invitationData.nonInvitedMembersList || this.invitationData.nonInvitedMembersList.length === 0) {
                return false;
            }
            const nonInvitedIds = this.invitationData.nonInvitedMembersList.map(m => m.id);
            return nonInvitedIds.every(id => this.invitationForm.selectedMemberIds.includes(id));
        },

        areAllAlreadyInvitedSelected() {
            if (!this.invitationData.alreadyInvitedMembersList || this.invitationData.alreadyInvitedMembersList.length === 0) {
                return false;
            }
            const alreadyInvitedIds = this.invitationData.alreadyInvitedMembersList.map(m => m.id);
            return alreadyInvitedIds.every(id => this.invitationForm.selectedMemberIds.includes(id));
        },

        hasSelectedMembers() {
            return this.invitationForm.selectedMemberIds && this.invitationForm.selectedMemberIds.length > 0;
        },

        // Computed properties for coach filter checkboxes
        isAllCoachesSelected() {
            return this.coachFilter.includes('all');
        },

        isNoCoachSelected() {
            return this.coachFilter.includes('no-coach');
        },

        // Computed properties for membership filter checkboxes
        isAllMembershipsSelected() {
            return this.membershipFilter.includes('all');
        },

        // Excel export data and columns
        excelData() {
            return this.clients.map((client, index) => {
                return {
                    "SerialNo": client.id, // Use actual database ID for consistency
                    "MemberID": this.getMemberId(client),
                    "MemberName": client.membername || client.name || "N/A",
                    "Email": client.email || "N/A",
                   "Phone": this.getPhoneNumber(client),
                    "Plan": this.getPlanName(client),
                    "JoinedDate": this.getJoiningDate(client),
                    "ExpiryDate": this.getExpireDate(client),
                    "Status": this.getStatusText(client),
                    "LastLogin": this.getLastLogin(client),
                };
            });
        },

        excelColumns() {
            return [
                { label: "S.No", field: "SerialNo" },
                { label: "Member ID", field: "MemberID" },
                { label: "Member Name", field: "MemberName" },
                { label: "Email", field: "Email" },
                { label: "Phone", field: "Phone" },
                { label: "Plan", field: "Plan" },
                { label: "Joined Date", field: "JoinedDate" },
                { label: "Expiry Date", field: "ExpiryDate" },
                { label: "Status", field: "Status" },
                { label: "Last Login", field: "LastLogin" },
            ];
        },

        perPageOptions() {
            return [
                { value: '10', text: 'Show 10' },
                { value: '25', text: 'Show 25' },
                { value: '50', text: 'Show 50' },
                { value: '75', text: 'Show 75' },
                { value: 'all', text: 'Show All' }
            ];
        },

        // Check if all members are selected
        isAllSelected() {
            return this.clients.length > 0 && this.selectedMembers.length === this.clients.length;
        },

        // Get the correct total count for display
        displayTotalRows() {
            // If we have a valid totalRows from API, use it
            if (this.totalRows > 0) {
                return this.totalRows;
            }
            // Otherwise, use the length of current clients array
            return this.clients.length;
        },

    watch: {
        clients() {
            // Reapply styles when clients data changes
            this.$nextTick(() => {
                this.applyTableLayoutStyles();
            });
        },
        isLoading() {
            // Reapply styles when loading state changes
            if (!this.isLoading) {
                this.$nextTick(() => {
                    this.applyTableLayoutStyles();
                });
            }
        }
    },

    },



    methods: {
        goBack() {
            // Always go to dashboard
            this.$router.push({ name: 'dashboard' });
        },
        
        // Method to check if a specific coach is selected
        isCoachSelected(coachValue) {
            return this.coachFilter.includes(coachValue);
        },

        // Method to check if a specific membership is selected
        isMembershipSelected(membershipValue) {
            return this.membershipFilter.includes(membershipValue);
        },

        // Sort members by different fields
        sortMembers(order, field = 'name') {
            this.sortOrder = order;
            this.sortField = field;
            
            this.clients.sort((a, b) => {
                let valueA, valueB;
                
                switch (field) {
                    case 'name':
                        valueA = (a.membername || a.name || '').toLowerCase();
                        valueB = (b.membername || b.name || '').toLowerCase();
                        return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
                    
                    case 'member_since':
                        valueA = new Date(a.created_at || a.member_since || 0);
                        valueB = new Date(b.created_at || b.member_since || 0);
                        return order === 'asc' ? valueA - valueB : valueB - valueA;
                    
                    case 'activated_on':
                        valueA = new Date(a.activated_on || a.activation_date || 0);
                        valueB = new Date(b.activated_on || b.activation_date || 0);
                        return order === 'asc' ? valueA - valueB : valueB - valueA;
                    
                    case 'check_in':
                        valueA = new Date(a.last_check_in || a.check_in_date || 0);
                        valueB = new Date(b.last_check_in || b.check_in_date || 0);
                        return order === 'asc' ? valueA - valueB : valueB - valueA;
                    
                    case 'last_online':
                        valueA = new Date(a.last_online || a.last_seen || 0);
                        valueB = new Date(b.last_online || b.last_seen || 0);
                        return order === 'asc' ? valueA - valueB : valueB - valueA;
                    
                    default:
                        return 0;
                }
            });
        },

        // Search functionality - search via API
        handleSearch() {
            // Reset to first page when searching
            this.updateParams({ page: 1 });
                this.Get_Clients(1);
        },


        // Clear search functionality
        clearSearch() {
            this.searchQuery = '';
            this.updateParams({ page: 1 });
            this.Get_Clients(1); // Reload all members
        },
        
        // Mail functionality
        handleMailAction() {
            // Add your mail functionality here
            // This could open a mail composer, send bulk emails, etc.
        },

        // Invitation modal methods
        openInvitationModal() {
            if (this.$bvModal && typeof this.$bvModal.show === 'function') {
                this.$bvModal.show('invitationModal');
            } else {
                console.error('BootstrapVue modal plugin is not available');
            }
        },

        // Video tutorial method
        openVideoTutorialModal() {
            if (this.$swal && typeof this.$swal === 'function') {
                this.$swal({
                    title: "Video Tutorial",
                    text: "The full CRM tutorial video link will be added here soon.",
                    icon: "info",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#ff4040"
                });
            } else {
                console.error('SweetAlert2 plugin is not available');
                // Fallback to alert if SweetAlert2 is not available
                alert("Video Tutorial\n\nThe full CRM tutorial video link will be added here soon.");
            }
        },

        closeInvitationModal() {
            // Reset selected members when closing
            this.invitationForm.selectedMemberIds = [];
            if (this.$bvModal && typeof this.$bvModal.hide === 'function') {
                this.$bvModal.hide('invitationModal');
            }
        },

        toggleAllNonInvitedMembers(event) {
            const nonInvitedIds = this.invitationData.nonInvitedMembersList.map(m => m.id);
            if (event.target.checked) {
                // Add all non-invited member IDs
                nonInvitedIds.forEach(id => {
                    if (!this.invitationForm.selectedMemberIds.includes(id)) {
                        this.invitationForm.selectedMemberIds.push(id);
                    }
                });
            } else {
                // Remove all non-invited member IDs
                this.invitationForm.selectedMemberIds = this.invitationForm.selectedMemberIds.filter(
                    id => !nonInvitedIds.includes(id)
                );
            }
        },

        toggleAllAlreadyInvitedMembers(event) {
            const alreadyInvitedIds = this.invitationData.alreadyInvitedMembersList.map(m => m.id);
            if (event.target.checked) {
                // Add all already-invited member IDs
                alreadyInvitedIds.forEach(id => {
                    if (!this.invitationForm.selectedMemberIds.includes(id)) {
                        this.invitationForm.selectedMemberIds.push(id);
                    }
                });
            } else {
                // Remove all already-invited member IDs
                this.invitationForm.selectedMemberIds = this.invitationForm.selectedMemberIds.filter(
                    id => !alreadyInvitedIds.includes(id)
                );
            }
        },

        loadInvitationData() {
            // Get logged-in user's email from multiple sources
            const getUserEmail = () => {
                // Try from computed currentUser
                if (this.currentUser && this.currentUser.email) {
                    return this.currentUser.email;
                }
                
                // Try from Vuex store directly
                if (this.$store && this.$store.state && this.$store.state.auth && this.$store.state.auth.user) {
                    const user = this.$store.state.auth.user;
                    if (user && user.email) {
                        return user.email;
                    }
                }
                
                // Try from localStorage
                try {
                    const userData = localStorage.getItem('user');
                    if (userData) {
                        const user = JSON.parse(userData);
                        if (user && user.email) {
                            return user.email;
                        }
                    }
                } catch (e) {
                    console.error('Error parsing user from localStorage:', e);
                }
                
                return null;
            };
            
            // Set confirmation email to default value
            this.$nextTick(() => {
                this.invitationForm.confirmationEmail = "thorstrengthfitness@gmail.com";
            });
            
            // Reset selected members when loading new data
            this.invitationForm.selectedMemberIds = [];
            
            // Load invitation data when modal opens
            axios.get('/subscription-invitations/data')
                .then(response => {
                    if (response.data.success) {
                        const data = response.data.data;
                        
                        // Store the data for display including member lists
                        this.invitationData = {
                            nonInvitedClients: data.nonInvitedClients || 0,
                            alreadyInvitedClients: data.alreadyInvitedClients || 0,
                            totalExpiredMembers: data.totalExpiredMembers || 0,
                            nonInvitedMembersList: data.nonInvitedMembersList || [],
                            alreadyInvitedMembersList: data.alreadyInvitedMembersList || []
                        };
                        
                        // Set form defaults based on available data
                        this.invitationForm.nonInvitedClients = data.nonInvitedClients > 0;
                        this.invitationForm.alreadyInvitedClients = data.alreadyInvitedClients > 0;
                        
                        // Ensure confirmation email is set to default value
                        if (!this.invitationForm.confirmationEmail || this.invitationForm.confirmationEmail === "") {
                            this.invitationForm.confirmationEmail = "thorstrengthfitness@gmail.com";
                        }
                        
                        // Update modal title with actual count
                        this.$nextTick(() => {
                            const modalTitle = document.querySelector('#invitationModal .modal-title');
                            if (modalTitle) {
                                modalTitle.textContent = `Send invitation - ${data.totalExpiredMembers} members`;
                            }
                        });
                        
                        // Update checkbox labels with actual counts
                        this.updateInvitationLabels(data);
                    }
                })
                .catch(error => {
                    console.error('Error loading invitation data:', error);
                    const errorMessage = error.response?.status === 404 
                        ? 'API endpoint not found. Please check if you are logged in.' 
                        : error.response?.data?.message || 'Failed to load invitation data';
                    this.makeToast('error', errorMessage, 'Error');
                    // Reset data on error
                    this.invitationData = {
                        nonInvitedClients: 0,
                        alreadyInvitedClients: 0,
                        totalExpiredMembers: 0,
                        nonInvitedMembersList: [],
                        alreadyInvitedMembersList: []
                    };
                });
        },

        updateInvitationLabels(data) {
            // Update checkbox labels with actual counts
            const nonInvitedLabel = document.querySelector('label[for="nonInvitedClients"]');
            const alreadyInvitedLabel = document.querySelector('label[for="alreadyInvitedClients"]');
            
            if (nonInvitedLabel) {
                nonInvitedLabel.textContent = `Non-invited members (${data.nonInvitedClients})`;
            }
            
            if (alreadyInvitedLabel) {
                alreadyInvitedLabel.textContent = `Members already invited (${data.alreadyInvitedClients})`;
            }
        },

        fixModalBackdrop() {
            // Fix the modal backdrop color dynamically
            this.$nextTick(() => {
                const fixBackdrop = (backdrop) => {
                    if (backdrop) {
                        backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                        backdrop.style.opacity = '0.5';
                        backdrop.style.setProperty('background-color', 'rgba(0, 0, 0, 0.5)', 'important');
                        backdrop.style.setProperty('opacity', '0.5', 'important');
                    }
                };

                // Fix existing backdrop
                const backdrop = document.querySelector('.modal-backdrop');
                fixBackdrop(backdrop);
                
                // Set up observer to fix any new backdrops
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        mutation.addedNodes.forEach((node) => {
                            if (node.classList && node.classList.contains('modal-backdrop')) {
                                fixBackdrop(node);
                            }
                        });
                    });
                });
                
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
                
                // Clean up observer after 5 seconds
                setTimeout(() => {
                    observer.disconnect();
                }, 5000);
            });
        },

        sendInvitations() {
            // Check if individual members are selected or group options are selected
            if (!this.hasSelectedMembers && !this.invitationForm.nonInvitedClients && !this.invitationForm.alreadyInvitedClients) {
                this.makeToast('warning', 'Please select at least one member or group option', 'Warning');
                return;
            }

            if (!this.invitationForm.confirmationEmail) {
                this.makeToast('warning', 'Please enter a confirmation email address', 'Warning');
                return;
            }

            // Show loading state
            this.invitationForm.sending = true;

            // Prepare request data - convert member IDs to integers
            const requestData = {
                nonInvitedClients: this.invitationForm.nonInvitedClients,
                alreadyInvitedClients: this.invitationForm.alreadyInvitedClients,
                confirmationEmail: this.invitationForm.confirmationEmail,
                selectedMemberIds: (this.invitationForm.selectedMemberIds || []).map(id => parseInt(id))
            };

            axios.post('/subscription-invitations/send', requestData)
                .then(response => {
                    if (response.data.success) {
                        this.makeToast('success', response.data.message, 'Success');
                        this.closeInvitationModal();
                        
                        // Reset form with logged-in user's email
                        const getUserEmail = () => {
                            if (this.currentUser && this.currentUser.email) {
                                return this.currentUser.email;
                            }
                            if (this.$store && this.$store.state && this.$store.state.auth && this.$store.state.auth.user) {
                                const user = this.$store.state.auth.user;
                                if (user.email) {
                                    return user.email;
                                }
                            }
                            try {
                                const userData = localStorage.getItem('user');
                                if (userData) {
                                    const user = JSON.parse(userData);
                                    if (user && user.email) {
                                        return user.email;
                                    }
                                }
                            } catch (e) {
                                console.error('Error parsing user from localStorage:', e);
                            }
                            return "";
                        };
                        
                        this.invitationForm = {
                            nonInvitedClients: false,
                            alreadyInvitedClients: false,
                            confirmationEmail: getUserEmail(),
                            sending: false,
                            selectedMemberIds: [] // Reset selected members
                        };
                    } else {
                        this.makeToast('error', response.data.message || 'Failed to send invitations', 'Error');
                    }
                })
                .catch(error => {
                    console.error('Error sending invitations:', error);
                    const errorMessage = error.response?.data?.message || 'Failed to send invitations';
                    this.makeToast('error', errorMessage, 'Error');
                })
                .finally(() => {
                    this.invitationForm.sending = false;
                });
        },

        // Assign membership method
        assignMembership(client) {
            // Prepare member data for the assign membership page
            const memberData = {
                id: client.id,
                name: client.membername || client.name || 'Unknown Member',
                image: client.avatar || client.profile_image || null,
                email: client.email,
                phone: client.phone,
                // Add any other relevant member data
            };

            // Navigate to assign membership page with member data
            this.$router.push({
                name: 'AssignMembership',
                query: {
                    member: JSON.stringify(memberData)
                }
            });
        },

        // Go to coaching method
        goToCoaching(client) {
            // Navigate to MemberDetails page and open the coaching tab
            this.$router.push({
                name: "MemberDetails",
                params: {
                    id: client.id,
                },
                query: {
                    tab: 'coaching',
                    activeAction: null  // Clear activeAction to prevent "Go to this Profile" from being active
                }
            });
        },

        goToInvoices(client) {
            // Navigate to MemberDetails page and open the invoices tab
            this.$router.push({
                name: "MemberDetails",
                params: {
                    id: client.id,
                },
                query: {
                    tab: 'invoices',
                    activeAction: null  // Clear activeAction to prevent "Go to this Profile" from being active
                }
            });
        },

        goToFiles(client) {
            // Navigate to MemberDetails page and open the files tab
            this.$router.push({
                name: "MemberDetails",
                params: {
                    id: client.id,
                },
                query: {
                    tab: 'files',
                    activeAction: null  // Clear activeAction to prevent "Go to this Profile" from being active
                }
            });
        },

        goToNotes(client) {
            // Navigate to MemberDetails page and open the notes tab
            this.$router.push({
                name: "MemberDetails",
                params: {
                    id: client.id,
                },
                query: {
                    tab: 'notes',
                    activeAction: null  // Clear activeAction to prevent "Go to this Profile" from being active
                }
            });
        },

        // Copy to clipboard functionality
        async copyToClipboard(text, type) {
            if (!text) {
                this.showCopyMessage = true;
                this.copyMessage = `${type} not available`;
                setTimeout(() => {
                    this.showCopyMessage = false;
                }, 2000);
                return;
            }

            try {
                await navigator.clipboard.writeText(text);
                this.showCopyMessage = true;
                this.copyMessage = `${type} copied to clipboard!`;
                setTimeout(() => {
                    this.showCopyMessage = false;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
                this.showCopyMessage = true;
                this.copyMessage = `Failed to copy ${type.toLowerCase()}`;
                setTimeout(() => {
                    this.showCopyMessage = false;
                }, 2000);
            }
        },

        // Status filter methods
        // Filter logic:
        // - "active" = members who have activated their app login (first_mobile_login IS NOT NULL)
        // - "inactive" = members who haven't activated yet (first_mobile_login IS NULL) OR have been unsubscribed
        setStatusFilter(status) {
            // Multiple selection logic - users can select both active and inactive
            if (this.statusFilter.includes(status)) {
                // If clicking the same option, remove it from the array
                this.statusFilter = this.statusFilter.filter(s => s !== status);
            } else {
                // Add the new option to the array
                this.statusFilter.push(status);
            }
            
            // If no filters are selected, show all members
            if (this.statusFilter.length === 0) {
                this.statusFilter = ['active', 'inactive']; // Show all by default
            }
            
            this.filterMembers();
        },

        clearStatusFilter() {
            this.statusFilter = ['active', 'inactive']; // Show all members
            this.filterMembers();
        },

        filterMembers() {
            // Reset to first page when filtering
            this.updateParams({ page: 1 });
            // Reload members with the new filter
            this.Get_Clients(1);
        },

        // Get status display name for button
        getStatusDisplayName() {
            if (this.statusFilter.length === 0) {
                return 'Status';
            } else if (this.statusFilter.length === 1) {
                return this.statusFilter[0] === 'active' ? 'Active' : 'Inactive';
            } else if (this.statusFilter.length === 2) {
                return 'All Status';
            } else {
                return 'Status';
            }
        },

        // Get member status for indicator color
        getMemberStatus(client) {
            // Check for last login/online date - try multiple field names
            // Fall back to last check-in when no app login date (e.g. members who only visit gym)
            const lastLoginDate = client.last_login ||
                                client.last_online ||
                                client.last_seen ||
                                client.last_checkin ||
                                client.last_checkin_time ||
                                client.last_checkin_at ||
                                null;

            if (!lastLoginDate) {
                return 'inactive'; // Red dot if no last login or check-in
            }
            
            const lastLogin = new Date(lastLoginDate);
            
            // Validate the date
            if (isNaN(lastLogin.getTime())) {
                return 'inactive'; // Red dot if invalid date
            }
            
            const now = new Date();
            
            // Calculate the difference in months
            const monthsDiff = (now.getFullYear() - lastLogin.getFullYear()) * 12 + 
                               (now.getMonth() - lastLogin.getMonth());
            
            // Same month (0 months difference)
            if (monthsDiff === 0) {
                return 'active'; // Green dot
            }
            // 1 month ago
            else if (monthsDiff === 1) {
                return 'warning'; // Yellow dot
            }
            // 2+ months ago
            else {
                return 'inactive'; // Red dot
            }
        },

        // Toggle select all members
        toggleSelectAll() {
            if (this.showSelectionMode && this.isAllSelected) {
                // If in selection mode and all are selected, deselect all
                this.selectedMembers = [];
            } else if (this.showSelectionMode && !this.isAllSelected) {
                // If in selection mode but not all selected, select all
                this.selectedMembers = this.clients.map(client => client.id);
            } else {
                // Enter selection mode and select all
                this.showSelectionMode = true;
                this.selectedMembers = this.clients.map(client => client.id);
            }
        },
        
        // Toggle filter dropdown (same as original filter button)
        toggleFilterDropdown() {
            this.$root.$emit('bv::toggle::collapse', 'sidebar-right');
        },
        
        // Filter button toggle functionality
        toggleFilter(filterName) {
            // Skip 'more' as it's now a dropdown
            if (filterName === 'more') return;
            
            if (this.activeFilters.includes(filterName)) {
                // Remove filter if already active
                this.activeFilters = this.activeFilters.filter(f => f !== filterName);
            } else {
                // Add filter if not active
                this.activeFilters.push(filterName);
            }
            
            // Apply filters to member data
            this.applyFilters();
        },

        /**
         * Apply table layout styles to ensure full height and fixed pagination
         */
        applyTableLayoutStyles() {
            this.$nextTick(() => {
                // Use multiple selectors to find elements - try different approaches
                const tableWrapper = this.$el?.querySelector('.table-content-wrapper') || 
                                   document.querySelector('.members-page-wrapper .table-content-wrapper') ||
                                   document.querySelector('.table-content-wrapper');
                const tableResponsive = tableWrapper?.querySelector('.table-responsive') ||
                                       this.$el?.querySelector('.table-content-wrapper .table-responsive') ||
                                       document.querySelector('.members-page-wrapper .table-responsive') ||
                                       document.querySelector('.table-responsive');
                const pagination = tableWrapper?.querySelector('.pagination-container') ||
                                 this.$el?.querySelector('.table-content-wrapper .pagination-container') ||
                                 this.$el?.querySelector('tfoot .pagination-container') ||
                                 document.querySelector('.members-page-wrapper tfoot .pagination-container') ||
                                 document.querySelector('.table-content-wrapper tfoot .pagination-container');
                
                console.log('Applying table layout styles:', { tableWrapper, tableResponsive, pagination });
                
                if (tableWrapper) {
                    tableWrapper.style.setProperty('position', 'relative', 'important');
                    tableWrapper.style.setProperty('flex', '1 1 0', 'important');
                    tableWrapper.style.setProperty('height', '100%', 'important');
                    tableWrapper.style.setProperty('display', 'flex', 'important');
                    tableWrapper.style.setProperty('flex-direction', 'column', 'important');
                    tableWrapper.style.setProperty('overflow', 'hidden', 'important');
                    tableWrapper.style.setProperty('min-height', '0', 'important');
                }
                
                if (tableResponsive) {
                    tableResponsive.style.setProperty('flex', '1 1 0', 'important');
                    tableResponsive.style.setProperty('height', '100%', 'important');
                    tableResponsive.style.setProperty('min-height', '0', 'important');
                    tableResponsive.style.setProperty('overflow-x', 'auto', 'important');
                    tableResponsive.style.setProperty('overflow-y', 'auto', 'important');
                }
                
                // Pagination is now inside table, no absolute positioning needed
                if (pagination) {
                    pagination.style.setProperty('margin', '0', 'important');
                    pagination.style.setProperty('padding', '0.75rem 1rem', 'important');
                }
            });
        },

        /**
         * Prevent body and table scrolling when filter dropdown is opened
         */
        preventBodyScroll() {
            // Prevent body scroll
            document.body.style.overflow = "hidden";
            
            // Prevent table scroll (prevent both x and y scrolling)
            if (this.$refs.tableContainer) {
                this.$refs.tableContainer.style.overflowX = "hidden";
                this.$refs.tableContainer.style.overflowY = "hidden";
            }
        },

        /**
         * Restore body and table scrolling when filter dropdown is closed
         */
        restoreBodyScroll() {
            // Restore body scroll
            document.body.style.overflow = "";
            
            // Restore table scroll (restore to auto for both x and y as per CSS)
            if (this.$refs.tableContainer) {
                this.$refs.tableContainer.style.overflowX = "auto";
                this.$refs.tableContainer.style.overflowY = "auto";
            }
        },

        // Coach filter methods
        onCoachDropdownShow() {
            // Prevent body scroll when dropdown opens
            this.preventBodyScroll();
            // Fetch coaches when dropdown is opened if not already loaded
            if (this.availableCoaches.length === 0) {
                this.fetchCoaches();
            }
        },

        // Membership filter methods
        async onMembershipDropdownShow() {
            // Prevent body scroll when dropdown opens
            this.preventBodyScroll();
            // Fetch membership plans when dropdown is opened if not already loaded
            if (this.availableMemberships.length === 0) {
                await this.fetchMemberships();
            }
        },

        async fetchMemberships() {
            try {
                const response = await axios.get('plans?status=active');
                if (response.data && response.data.success && response.data.data) {
                    // Map plans to membership filter format
                    this.availableMemberships = response.data.data.map(plan => ({
                        name: plan.name,
                        value: plan.name // Use plan name as value for filtering
                    }));
                } else {
                    // Fallback: try to get unique plan names from members
                    this.availableMemberships = [];
                }
            } catch (error) {
                console.error('Error fetching memberships:', error);
                this.availableMemberships = [];
            }
        },

        selectCoach(coachValue, event) {
            // Prevent default behavior and event propagation
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            // Special handling for "all" - show all members (no filter)
            if (coachValue === 'all') {
                if (this.coachFilter.includes('all')) {
                    // If "all" is already selected, deselect it (show all members by default)
                    this.coachFilter = [];
                } else {
                    // Select "all" - clear other selections and set only 'all' (no filter applied)
                    this.coachFilter = ['all'];
                }
            }
            // Special handling for "no-coach" - toggle on/off
            else if (coachValue === 'no-coach') {
                // If 'all' is selected, remove it when selecting 'no-coach'
                if (this.coachFilter.includes('all')) {
                    this.coachFilter = this.coachFilter.filter(c => c !== 'all');
                }
                
                if (this.coachFilter.includes('no-coach')) {
                    // Turn off - deselect
                    this.coachFilter = this.coachFilter.filter(c => c !== 'no-coach');
                } else {
                    // Turn on - select
                    this.coachFilter.push('no-coach');
                }
            } else {
                // For individual coach options - multiple selection logic
                // If 'all' is selected, remove it when selecting a specific coach
                if (this.coachFilter.includes('all')) {
                    this.coachFilter = this.coachFilter.filter(c => c !== 'all');
                }
                
                if (this.coachFilter.includes(coachValue)) {
                    // If clicking the same option, remove it from the array
                    this.coachFilter = this.coachFilter.filter(c => c !== coachValue);
                } else {
                    // Add the new option to the array
                    this.coachFilter.push(coachValue);
                }
            }
            
            // Force update to ensure checkboxes re-render
            this.$forceUpdate();
            
            this.applyFilters();
        },

        clearCoachFilter() {
            this.coachFilter = []; // Clear all selections
            this.showSelectionMode = false;
            this.selectedMembers = [];
            this.applyFilters();
            
            // Close the dropdown when clear button is clicked
            this.$nextTick(() => {
                this.$root.$emit('bv::hide::dropdown', 'coach-dropdown');
            });
        },

        // Membership filter methods
        selectMembership(membershipValue, event) {
            // Prevent default behavior and event propagation
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            // Special handling for "all" - select all memberships (no filter)
            if (membershipValue === 'all') {
                if (this.membershipFilter.includes('all')) {
                    // If "all" is already selected, deselect it
                    this.membershipFilter = [];
                } else {
                    // Select "all" - clear other selections and set only 'all' (no filter applied)
                    this.membershipFilter = ['all'];
                }
            } else {
                // For individual membership options - multiple selection logic
                // If 'all' is selected, remove it when selecting a specific membership
                if (this.membershipFilter.includes('all')) {
                    this.membershipFilter = this.membershipFilter.filter(m => m !== 'all');
                }
                
                if (this.membershipFilter.includes(membershipValue)) {
                    // If clicking the same option, remove it from the array
                    this.membershipFilter = this.membershipFilter.filter(m => m !== membershipValue);
                } else {
                    // Add the new option to the array
                    this.membershipFilter.push(membershipValue);
                }
            }
            
            // Force update to ensure checkboxes re-render
            this.$forceUpdate();
            
            this.applyFilters();
        },

        clearMembershipFilter() {
            this.membershipFilter = []; // Clear all selections
            this.endingMembership = false;
            this.pausedMembership = false;
            this.noMembership = false;
            this.showSelectionMode = false;
            this.selectedMembers = [];
            this.applyFilters();
            
            // Close the dropdown when clear button is clicked
            this.$nextTick(() => {
                this.$root.$emit('bv::hide::dropdown', 'membership-dropdown');
            });
        },

        // Membership status toggle methods
        toggleEndingMembership(event) {
            // Prevent default behavior and event propagation
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            // Toggle the "ending membership" filter on/off
            this.endingMembership = !this.endingMembership;
            this.applyFilters();
        },

        selectEndingMonth(month) {
            // Prevent default behavior and event propagation
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            // Set the selected ending membership month
            this.endingMembershipMonth = month;
            
            // If custom is selected, set today's date as default
            if (month === 'custom' && !this.customEndingDate) {
                this.customEndingDate = new Date().toISOString().split('T')[0];
            }
            
            this.applyFilters();
        },

        onCustomDateChange() {
            // Handle custom date change
            this.applyFilters();
        },

        togglePausedMembership(event) {
            // Prevent default behavior and event propagation
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            // Toggle the "paused membership" filter on/off
            this.pausedMembership = !this.pausedMembership;
            this.applyFilters();
        },

        toggleNoMembership(event) {
            // Prevent default behavior and event propagation
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            // Toggle the "no membership" filter on/off
            this.noMembership = !this.noMembership;
            this.applyFilters();
        },

        // Tag filter methods
        selectTag(tagValue, event) {
            // Prevent default behavior and event propagation
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            // Special handling for "all" - select all tags
            if (tagValue === 'all') {
                if (this.tagFilter === 'all') {
                    // If "all" is already selected, deselect it
                    this.tagFilter = null;
                } else {
                    // Select "all" - this means all tags are selected
                    this.tagFilter = 'all';
                }
            } else {
                // For individual tag options - single selection logic
                if (this.tagFilter === tagValue) {
                    // If clicking the same option, deselect it (return to no filter)
                    this.tagFilter = null;
                } else {
                    // Select the new option
                    this.tagFilter = tagValue;
                }
            }
            this.applyFilters();
        },

        clearTagFilter() {
            this.tagFilter = null;
            this.noTag = false;
            this.showSelectionMode = false;
            this.selectedMembers = [];
            this.applyFilters();
            
            // Close the dropdown when clear button is clicked
            this.$nextTick(() => {
                this.$root.$emit('bv::hide::dropdown', 'tag-dropdown');
            });
        },

        toggleNoTag(event) {
            // Prevent default behavior and event propagation
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            // Toggle the "no tag" filter on/off
            this.noTag = !this.noTag;
            this.applyFilters();
        },

        // Fetch available tags from API
        async fetchTags() {
            try {
                const response = await axios.get('members/tags/available');
                if (response.data && response.data.success && response.data.tags) {
                    this.availableTags = response.data.tags;
                } else {
                    this.availableTags = [];
                }
            } catch (error) {
                console.error('Error fetching tags:', error);
                this.availableTags = [];
            }
        },

        // Called when tag dropdown is shown
        onTagDropdownShow() {
            // Prevent body scroll when dropdown opens
            this.preventBodyScroll();
            // Fetch tags if not already loaded
            if (this.availableTags.length === 0) {
                this.fetchTags();
            }
        },

        // Helper method to get coach IDs for API call
        getCoachIds() {
            // If only 'all' is selected, return empty string (no filter - show all members)
            if (this.coachFilter.length === 1 && this.coachFilter[0] === 'all') {
                return '';
            }
            
            // If 'all' is selected with other options, remove 'all' from the filter
            const filtered = this.coachFilter.filter(coachValue => coachValue !== 'all');
            
            // If nothing left after filtering, return empty string
            if (filtered.length === 0) {
                return '';
            }
            
            const coachIds = filtered
                .filter(coachValue => coachValue !== 'no-coach')
                .map(coachValue => coachValue.replace('coach-', ''));
            
            // Add 'no-coach' if it's selected
            if (filtered.includes('no-coach')) {
                coachIds.push('no-coach');
            }
            
            return coachIds.length > 0 ? coachIds.join(',') : '';
        },

        // Dynamic button text methods
        getCoachButtonText() {
            if (this.coachFilter.length === 0) {
                return 'Coach';
            } else if (this.coachFilter.length === 1) {
                if (this.coachFilter[0] === 'no-coach') return 'No coach';
                if (this.coachFilter[0] === 'all') return 'All coaches';
                const coach = this.availableCoaches.find(c => c.value === this.coachFilter[0]);
                return coach ? coach.name : 'Coach';
            } else {
                // Count actual coaches (excluding 'all' and 'no-coach')
                const actualCoaches = this.coachFilter.filter(c => c !== 'all' && c !== 'no-coach');
                const hasNoCoach = this.coachFilter.includes('no-coach');
                
                if (actualCoaches.length === 0 && hasNoCoach) {
                    return 'No coach';
                } else if (actualCoaches.length === 1 && !hasNoCoach) {
                    const coach = this.availableCoaches.find(c => c.value === actualCoaches[0]);
                    return coach ? coach.name : 'Coach';
                } else {
                    return `${actualCoaches.length + (hasNoCoach ? 1 : 0)} selected`;
                }
            }
        },

        getMembershipButtonText() {
            if (this.noMembership) return 'No membership';
            if (this.endingMembership) return 'Ending membership';
            if (this.pausedMembership) return 'Paused membership';
            if (this.membershipFilter.length === 0) {
                return 'Membership';
            } else if (this.membershipFilter.length === 1) {
                if (this.membershipFilter[0] === 'all') return 'All memberships';
                const membership = this.availableMemberships.find(m => m.value === this.membershipFilter[0]);
                return membership ? membership.name : 'Membership';
            } else {
                return `${this.membershipFilter.length} memberships`;
            }
        },

        getTagButtonText() {
            if (this.noTag) return 'No tag';
            if (this.tagFilter === 'all') return 'All tags';
            if (this.tagFilter) {
                const tag = this.availableTags.find(t => t.value === this.tagFilter);
                return tag ? tag.name : 'Tag';
            }
            return 'Tag';
        },

        // Profile filter methods
        setProfileFilter(value) {
            // Special handling for "all" - select all profile options
            if (value === 'all') {
                if (this.profileFilter === 'all') {
                    // If "all" is already selected, deselect it
                    this.profileFilter = null;
                } else {
                    // Select "all" - this means all profile options are selected
                    this.profileFilter = 'all';
                }
            } else {
                // For individual profile options - single selection logic
                if (this.profileFilter === value) {
                    // If clicking the same option, deselect it (return to no filter)
                    this.profileFilter = null;
                } else {
                    // Select the new option
                    this.profileFilter = value;
                }
            }
            this.applyFilters();
        },

        getProfileButtonText() {
            if (this.profileFilter === 'all') return 'All Profiles';
            if (this.profileFilter === 'with') return 'With Profile';
            if (this.profileFilter === 'without') return 'Without Profile';
            return 'Profile';
        },

        // Apply active filters to member data
        applyFilters() {
            // Reset to first page when applying filters
            this.updateParams({ page: 1 });
            this.Get_Clients(1);
        },

getMemberId(client) {
            // Use the formatted Member ID from backend if available, otherwise calculate it
            if (client.formatted_member_id) {
                return client.formatted_member_id;
            }
            
            if (!client.id) return "M-000000";
            const year = new Date().getFullYear();
            const paddedId = client.id.toString().padStart(5, '0');
            return `M-${year}-${paddedId}`;
        },

        getPlanName(client) {
            if (!client || !client.plan) return "N/A";
            
            // If plan is already a string (plan name), return it
            if (typeof client.plan === 'string' && isNaN(client.plan)) {
                return client.plan || "N/A";
            }
            
            // If plan is a number (plan ID), find the corresponding plan name
            if (this.subscriptionPlans && this.subscriptionPlans.length > 0) {
                const plan = this.subscriptionPlans.find(p => p.id == client.plan);
                if (plan && plan.name) {
                    return String(plan.name);
                }
            }
            
            // Fallback to "N/A" if no match found
            return "N/A";
        },
 
// Update the getPlanName method:
getPhoneNumber(client) {
            // Return the best available phone for hover/copy
            if (!client) return 'N/A';
            const candidates = [
                client.mobile_phone,
                client.phone,
                client.landline_phone,
            ];
            const phone = candidates.find(p => typeof p === 'string' && p.trim().length > 0);
            return phone || 'N/A';
        },


        getJoiningDate(client) {
            // Check for member_since first (filled during add new member)
            const memberSinceDate = client.member_since || client.created_at;
            if (!memberSinceDate) return "-";
            const date = new Date(memberSinceDate);
            // Check if date is valid
            if (isNaN(date.getTime())) return "-";
            return date.toLocaleDateString('en-US', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
            });
        },

        getExpireDate(client) {
            if (!client.Expires) return "N/A";
            const date = new Date(client.Expires);
            return date.toLocaleDateString('en-US', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
            });
        },

        getPlanStatusClass(client) {
            const planName = this.getPlanName(client);
            if (planName === "N/A") return "plan-na";
            
            // Color-coded plan classes based on plan name
            const planNameLower = planName.toLowerCase();
            
            if (planNameLower.includes('premium') || planNameLower.includes('gold') || planNameLower.includes('vip')) {
                return "plan-premium";
            } else if (planNameLower.includes('basic')) {
                return "plan-basic";
            } else if (planNameLower.includes('standard') || planNameLower.includes('silver')) {
                return "plan-standard";
            } else if (planNameLower.includes('pro') || planNameLower.includes('professional')) {
                return "plan-pro";
            } else if (planNameLower.includes('student') || planNameLower.includes('youth')) {
                return "plan-student";
            } else if (planNameLower.includes('senior') || planNameLower.includes('elderly')) {
                return "plan-senior";
            } else if (planNameLower.includes('family') || planNameLower.includes('group')) {
                return "plan-family";
            } else if (planNameLower.includes('corporate') || planNameLower.includes('business')) {
                return "plan-corporate";
            } else {
                return "plan-active"; // Default for other plans
            }
        },

        getExpireStatusClass(client) {
            const expireDate = client.Expires;
            if (!expireDate) return "expire-na";

            const today = new Date();
            const expireDateObj = new Date(expireDate);
            if (expireDateObj < today) return "expire-expired";
            return "expire-active";
        },

        getStatusClass(client) {
            if (client.Statuses) {
                const status = client.Statuses.toLowerCase();
                if (status === 'active') return "status-active";
                if (status === 'expired') return "status-expired";
                if (status === 'inactive') return "status-inactive";
            }

            const planName = this.getPlanName(client);
            const expireDate = client.Expires;

            if (!planName || planName === "N/A" || !expireDate)
                return "status-inactive";

            const today = new Date();
            const expireDateObj = new Date(expireDate);
            if (expireDateObj < today) return "status-expired";
            return "status-active";
        },

        getStatusText(client) {
            if (client.Statuses) {
                return client.Statuses;
            }

            const planName = this.getPlanName(client);
            const expireDate = client.Expires;

            if (!planName || planName === "N/A" || !expireDate) return "Inactive";

            const today = new Date();
            const expireDateObj = new Date(expireDate);
            if (expireDateObj < today) return "Expired";
            return "Active";
        },

        getLastLogin(client) {
            // Check for last login/online date - try multiple field names
            const lastLoginDate = client.last_login || 
                                client.last_online || 
                                client.last_seen || 
                                null;
            
            // If no last login date exists, return "-"
            if (!lastLoginDate) {
                return "-";
            }
            
            // Validate and format the date
            const lastLogin = new Date(lastLoginDate);
            
            // Validate the date
            if (isNaN(lastLogin.getTime())) {
                return "-";
            }

            const datePart = lastLogin.toLocaleDateString('en-US', { 
                month: '2-digit', 
                day: '2-digit', 
                year: 'numeric' 
            });
            const timePart = lastLogin.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).replace('AM', 'am').replace('PM', 'pm');
            
            return `${datePart} ${timePart}`;
        },

        getCoachName(client) {
            // Check if member has all coaches assigned
            if (client.has_all_coaches) {
                return "All";
            }
            
            // Return coach name if available
            const coachName = client.coach_name || client.coach;
            
            // Check if coach name exists and is not "N/A", "NA", null, undefined, or empty string
            if (coachName && coachName !== "N/A" && coachName !== "NA" && coachName.trim() !== "") {
                return coachName;
            }
            
            // If no coach is assigned, show "-"
            return "-";
        },

        getActivatedDate(client) {
            // Check for subscription activation date (last membership activation)
            // This field is set from the latest active membership assignment start_date
            // Falls back to first mobile login if no subscription exists
            // Also check created_at as a fallback for account creation date
            const activationDate = client.activated_on || 
                                  client.activation_date ||
                                  client.first_mobile_login ||
                                  (client.created_at && client.Statuses === 'active' ? client.created_at : null) ||
                                  null;
            
            // If no activation date exists, return "-"
            if (!activationDate) {
                return "-";
            }
            
            // Handle empty strings or invalid values
            if (typeof activationDate === 'string' && activationDate.trim() === '') {
                return "-";
            }
            
            // Validate and format the date
            let date;
            try {
                date = new Date(activationDate);
                if (isNaN(date.getTime())) {
                    return "-";
                }
            } catch (e) {
                return "-";
            }
            
            // Format the date consistently with other date columns
            try {
                return date.toLocaleDateString('en-US', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                });
            } catch (e) {
                // Fallback to simple date format if locale formatting fails
                const day = String(date.getDate()).padStart(2, '0');
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const month = monthNames[date.getMonth()];
                const year = date.getFullYear();
                return `${day} ${month}, ${year}`;
            }
        },

        getUnsubscribedDate(client) {
            // Get unsubscribed date from client data
            const unsubscribedDate = client.unsubscribed_since || 
                                     client.unsubscribed_date || 
                                     null;
            
            // If no unsubscribed date exists, return "-"
            if (!unsubscribedDate) {
                return "-";
            }
            
            // Validate and format the date
            const date = new Date(unsubscribedDate);
            if (isNaN(date.getTime())) {
                return "-";
            }
            
            // Format the date consistently with other date columns
            return date.toLocaleDateString('en-US', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
            });
        },

        getCheckInStatus(client) {
            // Check for check-in date - try multiple field names
            const rawDate =
                client.last_checkin ||
                client.last_checkin_time ||
                client.last_checkin_at ||
                client.check_in_date ||
                null;

            // If no check-in date exists, return "-"
            if (!rawDate) {
                return "-";
            }
            
            // Handle empty strings or invalid values
            if (typeof rawDate === 'string' && rawDate.trim() === '') {
                return "-";
            }

            const parsed = new Date(rawDate);

            // Validate the date
            if (isNaN(parsed.getTime())) {
                return "-";
            }

            const datePart = parsed.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
            });

            const timePart = parsed
                .toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                })
                .replace("AM", "am")
                .replace("PM", "pm");

            return `${datePart} ${timePart}`;
        },

        isOnline(client) {
            // Check if member is currently online (you can customize this logic)
            if (client.last_login) {
            const lastLogin = new Date(client.last_login);
            const now = new Date();
            const diffTime = Math.abs(now - lastLogin);
                const diffMinutes = Math.ceil(diffTime / (1000 * 60));
                
                // Consider online if last login was within 30 minutes
                return diffMinutes <= 30;
            }
            return false;
        },

        getProfileImageUrl(profileImage) {
            if (!profileImage) {
                return '/images/default-profile.jpg';
            }
            
            // Check if it's a base64 data URL (legacy support)
            if (profileImage.startsWith('data:image/')) {
                return profileImage;
            }
            
            // If it's already a full path (starts with / or http)
            if (profileImage.startsWith('/') || profileImage.startsWith('http')) {
                return profileImage;
            }
            
            // If it's just a filename, assume it's in the avatar directory
            return '/images/avatar/' + profileImage;
        },

        // Pagination methods
        getTotalPages() {
            if (this.limit === 'all' || this.limit === '-1') return 1;
            return Math.ceil(this.displayTotalRows / this.serverParams.perPage);
        },

        getPageNumbers() {
            const totalPages = this.getTotalPages();
            const currentPage = this.serverParams.page;
            const pages = [];
            
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, currentPage + 2);
            
            if (endPage - startPage < 4 && totalPages > 4) {
                endPage = Math.min(totalPages, startPage + 4);
            }
            
            if (endPage - startPage < 4 && totalPages > 4) {
                startPage = Math.max(1, endPage - 4);
            }
            
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            
            return pages;
        },

        onPageChange({ currentPage }) {
            if (this.serverParams.page !== currentPage) {
                this.updateParams({ page: currentPage });
                this.Get_Clients(currentPage);
            }
        },

        onPerPageChange() {
            this.$nextTick(() => {
                const updatedLimit = this.limit;
                
                if (updatedLimit === 'all') {
                    this.updateParams({ page: 1, perPage: -1 });
                    // When showing all, set totalRows to the actual number of clients
                    this.totalRows = this.clients.length;
                } else if (!isNaN(updatedLimit)) {
                    this.updateParams({ page: 1, perPage: parseInt(updatedLimit) });
                } else {
                    return;
                }

                // Reset to first page when changing per page
                this.serverParams.page = 1;
                this.Get_Clients(1);
            });
        },


        updateParams(newProps) {
            this.serverParams = Object.assign({}, this.serverParams, newProps);
        },

        // Refresh data from database
        refreshData() {
            this.isLoading = true;
            this.Get_Clients(this.serverParams.page);
        },

        // Force refresh total count from database
        async refreshTotalCount() {
            try {
                // Make a separate API call to get the total count
                const response = await axios.get('members?page=1&limit=1');
                if (response.data) {
                    this.totalRows = response.data.totalRows || 
                                   response.data.total || 
                                   response.data.count || 
                                   response.data.total_count || 0;
                }
            } catch (error) {
                console.error('Error refreshing total count:', error);
            }
        },

        // API methods
        Get_Clients(page) {
            NProgress.start();
            NProgress.set(0.1);
            
            // Use serverParams.perPage for proper pagination
            const perPage = this.limit === 'all' ? -1 : this.serverParams.perPage;
            
            const url = "members?page=" +
                        page +
                        "&name=" +
                        (this.searchQuery || this.Filter_Name) +
                        "&code=" +
                        this.Filter_Code +
                        "&mobile_phone=" +
                        this.Filter_Phone +
                        "&email=" +
                        this.Filter_Email +
                        "&plan=" +
                        this.Filter_PlanName +
                        "&membership=" +
                        (this.membershipFilter && this.membershipFilter.length > 0 && !this.membershipFilter.includes('all') ? this.membershipFilter.join(',') : '') +
                        "&ending_membership=" +
                        (this.endingMembership ? (this.endingMembershipMonth === 'custom' ? this.customEndingDate : this.endingMembershipMonth) : '') +
                        "&paused_membership=" +
                        (this.pausedMembership ? '1' : '') +
                        "&no_membership=" +
                        (this.noMembership ? '1' : '') +
                        "&tag=" +
                        (this.tagFilter && this.tagFilter !== 'all' ? this.tagFilter : (this.tagFilter === 'all' ? 'all' : '')) +
                        "&no_tag=" +
                        (this.noTag ? '1' : '') +
                        "&coach=" +
                        (this.coachFilter && this.coachFilter.length > 0 ? this.getCoachIds() : '') +
                        "&status=" +
                        (this.statusFilter && this.statusFilter.length > 0 ? this.statusFilter.join(',') : '') +
                        "&SortField=" +
                        this.serverParams.sort.field +
                        "&SortType=" +
                        this.serverParams.sort.type +
                        "&limit=" +
                        perPage;
            
            axios
                .get(url)
                .then((response) => {
                    this.clients = response.data.clients || [];
                    this.company_info = response.data.company_info;
                    
                    // Set totalRows from database response
                    // Try different possible field names from your API
                    this.totalRows = response.data.totalRows || 
                                   response.data.total || 
                                   response.data.count || 
                                   response.data.total_count ||
                                   this.clients.length;

                    NProgress.done();
                    this.isLoading = false;
                    
                    // Apply table layout styles after data loads
                    this.$nextTick(() => {
                        this.applyTableLayoutStyles();
                    });
                })
                .catch((error) => {
                    NProgress.done();
                    console.error('Error fetching members:', error);
                    
                    // Handle API error gracefully
                    this.clients = [];
                    this.totalRows = 0;
                        this.isLoading = false;
                    
                    // Show error message to user
                    this.makeToast("danger", "Failed to load members. Please try again.", "Error");
                    
                    // Still apply styles even on error
                    this.$nextTick(() => {
                        this.applyTableLayoutStyles();
                    });
                });
        },

        // Fetch coaches from database
        async fetchCoaches() {
            try {
                // Try with a large limit to get all coaches
                const url = "coach?page=1&limit=1000&name=&code=&mobile_phone=&email=&specialization=&SortField=id&SortType=desc";
                const response = await axios.get(url);
                
                // Check if response has clients array
                const allCoaches = response.data?.clients || response.data?.data || [];
                
                if (allCoaches.length > 0) {
                    // Map coaches from API response to format expected by the filter
                    this.availableCoaches = allCoaches.map(coach => {
                        // The API returns coaches with 'name' field already formatted
                        const coachName = coach.name || 
                                        (coach.first_name && coach.last_name ? `${coach.first_name} ${coach.last_name}` : '') ||
                                        (coach.first_name || coach.last_name ? `${coach.first_name || ''} ${coach.last_name || ''}`.trim() : 'Unknown Coach');
                        
                        const coachId = coach.id || coach.coach_id || null;
                        
                        // Format value as 'coach-{id}' to match getCoachIds() expectations
                        return {
                            name: coachName,
                            value: coachId ? `coach-${coachId}` : 'unknown'
                        };
                    }).filter(coach => coach.value !== 'unknown'); // Filter out invalid coaches
                } else {
                    this.availableCoaches = [];
                }
            } catch (error) {
                // Set empty array on error
                this.availableCoaches = [];
            }
        },

        // Action methods
        async showDetails(client) {
            NProgress.start();
            NProgress.set(0.1);
            
            try {
                // Validate client ID before navigation
                if (!client || !client.id) {
                    console.error('Invalid client data:', client);
                    this.$swal({
                        title: "Error",
                        text: "Invalid member data. Please try again.",
                        type: "error",
                    });
                    NProgress.done();
                    return;
                }
                
                // Note: API validation is now handled by the MemberDetails component
                // No need to pre-test the API endpoint as the axios interceptor
                // will properly handle API 404s without redirecting to NotFound
                
                // Only pass essential parameters for security
                // All member data will be fetched securely from API
                const queryParams = {
                    activeAction: null
                };
                
                // Navigate directly to member details page using route name
                this.$router.push({
                    name: 'MemberDetails',
                    params: { id: client.id },
                    query: queryParams
                }).then(() => {
                    NProgress.done();
                }).catch(err => {
                    console.error('Navigation failed:', err);
                    NProgress.done();
                    
                    // Show error message instead of redirecting
                    this.$swal({
                        title: "Navigation Error",
                        text: "Failed to navigate to member details. Please try again.",
                        type: "error",
                    });
                });
                
            } catch (error) {
                console.error('Error in showDetails:', error);
                NProgress.done();
                
                this.$swal({
                    title: "Error",
                    text: "An error occurred while opening member details. Please try again.",
                    type: "error",
                });
            }
        },

        Edit_Member(member) {
            try {
                // Only pass essential parameters for security
                // All member data will be fetched securely from API
                const queryParams = {
                    activeAction: null,
                    tab: 'profile',
                    editMode: 'true'
                };
                
                // Navigate directly to member details using route name
                this.$router.push({
                    name: 'MemberDetails',
                    params: { id: member.id },
                    query: queryParams
                }).then(() => {
                    // Navigation successful
                }).catch(err => {
                    console.error('Navigation failed:', err);
                    
                    // Fallback: try using direct path
                    const targetPath = `/app/Members/MemberDetails/${member.id}`;
                    const urlWithParams = `${targetPath}?${new URLSearchParams(queryParams).toString()}`;
                    window.location.href = urlWithParams;
                });
                
            } catch (error) {
                console.error('Edit_Member error:', error);
                this.$swal({
                    title: "Error",
                    text: "An error occurred while trying to edit the member.",
                    type: "error",
                });
            }
        },

        Remove_Client(id) {
            // Get member details for confirmation
            const member = this.clients.find(client => client.id === id);
            const memberName = member ? (member.membername || member.name || 'Unknown Member') : 'Unknown Member';
            
            this.$swal({
                title: "Delete Member",
                text: `Are you sure you want to delete "${memberName}"? This action cannot be undone.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                cancelButtonText: "Cancel",
                confirmButtonText: "Yes, Delete Member",
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return axios.delete(`members/${id}`)
                        .then(response => {
                            if (response.data.success) {
                                return response.data;
                            } else {
                                throw new Error(response.data.message || 'Delete failed');
                            }
                        })
                        .catch(error => {
                            console.error('Delete error:', error);
                            
                            // Handle different types of errors
                            let errorMessage = 'Delete failed';
                            
                            if (error.response) {
                                // Server responded with error status
                                if (error.response.status === 404) {
                                    errorMessage = 'Member not found';
                                } else if (error.response.status === 403) {
                                    errorMessage = 'You do not have permission to delete this member';
                                } else if (error.response.status === 500) {
                                    errorMessage = 'Server error occurred';
                                } else {
                                    errorMessage = error.response.data?.message || `Server error (${error.response.status})`;
                                }
                            } else if (error.request) {
                                // Network error
                                errorMessage = 'Network error - please check your connection';
                            } else {
                                // Other error
                                errorMessage = error.message || 'Unknown error occurred';
                            }
                            
                            this.$swal.showValidationMessage(errorMessage);
                        });
                },
                allowOutsideClick: () => !this.$swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    // Show success message
                    this.$swal({
                        title: "Deleted!",
                        text: `"${memberName}" has been deleted successfully.`,
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    
                    // Refresh the data from server to ensure consistency
                    this.Get_Clients(this.serverParams.page);
                    
                    // Emit event for other components
                    Fire.$emit("Delete_Member");
                }
            });
        },

        // Bulk delete functionality (for future use)
        deleteSelectedMembers() {
            if (this.selectedIds.length === 0) {
                this.$swal({
                    title: "No Selection",
                    text: "Please select at least one member to delete.",
                    icon: "info"
                });
                return;
            }

            const selectedCount = this.selectedIds.length;
            
            this.$swal({
                title: "Delete Multiple Members",
                text: `Are you sure you want to delete ${selectedCount} selected member(s)? This action cannot be undone.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                cancelButtonText: "Cancel",
                confirmButtonText: `Yes, Delete ${selectedCount} Member(s)`,
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return axios.post('members/delete/by_selection', {
                        selectedIds: this.selectedIds
                    })
                    .then(response => {
                        if (response.data.success) {
                            return response.data;
                        } else {
                            throw new Error(response.data.message || 'Bulk delete failed');
                        }
                    })
                    .catch(error => {
                        console.error('Bulk delete error:', error);
                        this.$swal.showValidationMessage(
                            `Bulk delete failed: ${error.response?.data?.message || error.message || 'Unknown error'}`
                        );
                    });
                },
                allowOutsideClick: () => !this.$swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    // Remove selected members from local array
                    this.clients = this.clients.filter(client => !this.selectedIds.includes(client.id));
                    
                    // Update total count
                    this.totalRows = Math.max(0, this.totalRows - selectedCount);
                    
                    // Clear selection
                    this.selectedIds = [];
                    
                    // Show success message
                    this.$swal({
                        title: "Deleted!",
                        text: `${selectedCount} member(s) have been deleted successfully.`,
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    
                    // Refresh the list if current page becomes empty
                    if (this.clients.length === 0 && this.serverParams.page > 1) {
                        this.Get_Clients(this.serverParams.page - 1);
                    }
                    
                    // Emit event for other components
                    Fire.$emit("Delete_Member");
                }
            });
        },

        // PDF and Excel methods
        clients_PDF() {
            var self = this;
            let pdf = new jsPDF("p", "pt");
            
            let pdfData = self.clients.map((client, index) => {
                // Calculate serial number based on current page and items per page
                let serialNumber;
                if (self.limit === 'all') {
                    // For "Show All" mode, use simple sequential numbering
                    serialNumber = index + 1;
                } else {
                    // For paginated mode, calculate based on current page
                    serialNumber = ((self.serverParams.page - 1) * self.serverParams.perPage) + index + 1;
                }
                
                return {
                    "S.No": serialNumber,
                    "Member ID": self.getMemberId(client),
                    "Member Name": client.membername || client.name || "N/A",
                    "Email": client.email || "N/A",
                    "Mobile Phone": client.mobile_phone || "N/A",
                    "Plan": self.getPlanName(client),
                    "Joined Date": self.getJoiningDate(client),
                    "Expiry Date": self.getExpireDate(client),
                    "Status": self.getStatusText(client),
                };
            });

            let columns = [
                { title: "S.No", dataKey: "S.No" },
                { title: "Member ID", dataKey: "Member ID" },
                { title: "Member Name", dataKey: "Member Name" },
                { title: "Email", dataKey: "Email" },
                { title: "Phone", dataKey: "Phone" },
                { title: "Plan", dataKey: "Plan" },
                { title: "Joined Date", dataKey: "Joined Date" },
                { title: "Expiry Date", dataKey: "Expiry Date" },
                { title: "Status", dataKey: "Status" },
            ];

            pdf.setFontSize(18);
            pdf.text("Members List", 40, 25);
            
            if (self.company_info && self.company_info.CompanyName) {
                pdf.setFontSize(12);
                pdf.text("Company: " + self.company_info.CompanyName, 40, 45);
                pdf.text("Generated on: " + new Date().toLocaleDateString(), 40, 60);
            }

            pdf.autoTable({
                head: [columns.map(col => col.title)],
                body: pdfData.map(row => columns.map(col => row[col.dataKey])),
                startY: 80,
                styles: {
                    fontSize: 8,
                    cellPadding: 3
                },
                headStyles: {
                    fillColor: [66, 139, 202],
                    textColor: 255,
                    fontStyle: 'bold'
                },
                alternateRowStyles: {
                    fillColor: [245, 245, 245]
                },
                margin: { top: 80, right: 40, bottom: 40, left: 40 }
            });

            pdf.save("Members_List.pdf");
        },

        // PDF export for all members
        clients_PDF_All(allMembers) {
            var self = this;
            let pdf = new jsPDF("p", "pt");
            
            let pdfData = allMembers.map((client, index) => {
                return {
                    "S.No": index + 1,
                    "Member ID": self.getMemberId(client),
                    "Member Name": client.membername || client.name || "N/A",
                    "Email": client.email || "N/A",
                    "Mobile Phone": client.mobile_phone || "N/A",
                    "Plan": self.getPlanName(client),
                    "Joined Date": self.getJoiningDate(client),
                    "Expiry Date": self.getExpireDate(client),
                    "Status": self.getStatusText(client),
                };
            });

            let columns = [
                { title: "S.No", dataKey: "S.No" },
                { title: "Member ID", dataKey: "Member ID" },
                { title: "Member Name", dataKey: "Member Name" },
                { title: "Email", dataKey: "Email" },
                { title: "Phone", dataKey: "Phone" },
                { title: "Plan", dataKey: "Plan" },
                { title: "Joined Date", dataKey: "Joined Date" },
                { title: "Expiry Date", dataKey: "Expiry Date" },
                { title: "Status", dataKey: "Status" },
            ];

            pdf.setFontSize(18);
            pdf.text("All Members List", 40, 25);
            
            if (self.company_info && self.company_info.CompanyName) {
                pdf.setFontSize(12);
                pdf.text("Company: " + self.company_info.CompanyName, 40, 45);
                pdf.text("Generated on: " + new Date().toLocaleDateString(), 40, 60);
            }

            pdf.autoTable({
                head: [columns.map(col => col.title)],
                body: pdfData.map(row => columns.map(col => row[col.dataKey])),
                startY: 80,
                styles: {
                    fontSize: 8,
                    cellPadding: 3
                },
                headStyles: {
                    fillColor: [66, 139, 202],
                    textColor: 255,
                    fontStyle: 'bold'
                },
                alternateRowStyles: {
                    fillColor: [245, 245, 245]
                },
                margin: { top: 80, right: 40, bottom: 40, left: 40 }
            });

            pdf.save("All_Members_List.pdf");
        },

        Show_import_members() {
            this.$bvModal.show("importClients");
            this.resetImportForm();
        },

        // File selection handler
        onFileSelected(e) {
            this.import_members = "";
            this.fileError = null;
            this.importResults = null;
            
            let file = e.target.files[0];
            
            if (!file) {
                return;
            }

            // Check file size (1MB limit)
            if (file.size > 1048576) {
                this.fileError = "File size must be less than 1MB";
                if (this.$refs.fileInput) {
                    this.$refs.fileInput.value = '';
                }
                return;
            }

            // Check file extension
            const fileName = file.name.toLowerCase();
            if (!fileName.endsWith('.csv')) {
                this.fileError = "Please select a CSV file";
                if (this.$refs.fileInput) {
                    this.$refs.fileInput.value = '';
                }
                return;
            }

            this.import_members = file;
            this.fileError = null;
        },

        // Submit import
        Submit_import() {
            if (!this.import_members) {
                this.makeToast("warning", "Please select a file to import", "Warning");
                return;
            }

            NProgress.start();
            NProgress.set(0.1);
            
            this.ImportProcessing = true;
            this.importResults = null;
            
            const formData = new FormData();
            formData.append('file', this.import_members);
            
            axios.post('members/import/csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                this.ImportProcessing = false;
                NProgress.done();
                
                if (response.data.status === true) {
                    this.importResults = {
                        success: true,
                        message: response.data.message || 'Members imported successfully!'
                    };
                    
                    this.makeToast("success", "Members imported successfully!", "Success");
                    
                    // Refresh the members list
                    this.Get_Clients(this.serverParams.page);
                    
                    // Reset form after successful import
                    setTimeout(() => {
                        this.resetImportForm();
                    }, 2000);
                    
                } else {
                    this.importResults = {
                        success: false,
                        message: response.data.message || 'Import failed'
                    };
                    
                    this.makeToast("danger", response.data.message || 'Import failed', "Error");
                }
            })
            .catch(error => {
                this.ImportProcessing = false;
                NProgress.done();
                
                let errorMessage = 'Import failed';
                
                if (error.response) {
                    if (error.response.status === 422) {
                        errorMessage = 'Invalid file format. Please check your CSV file.';
                    } else if (error.response.status === 400) {
                        errorMessage = error.response.data.message || 'Invalid file';
                    } else {
                        errorMessage = error.response.data.message || `Server error (${error.response.status})`;
                    }
                } else if (error.request) {
                    errorMessage = 'Network error - please check your connection';
                } else {
                    errorMessage = error.message || 'Unknown error occurred';
                }
                
                this.importResults = {
                    success: false,
                    message: errorMessage
                };
                
                this.makeToast("danger", errorMessage, "Error");
            });
        },

        // Reset import form
        resetImportForm() {
            this.import_members = "";
            this.fileError = null;
            this.importResults = null;
            if (this.$refs.fileInput) {
                this.$refs.fileInput.value = '';
            }
        },

        // Export options methods
        showExportOptions(type) {
            this.exportType = type;
            this.$bvModal.show("exportOptionsModal");
        },

        async exportData(scope) {
            this.$bvModal.hide("exportOptionsModal");
            
            if (scope === 'current') {
                // Export current page data
                if (this.exportType === 'pdf') {
                    this.clients_PDF();
                } else {
                    this.exportExcel();
                }
            } else {
                // Export all members
                await this.exportAllMembers(scope);
            }
        },

        async exportAllMembers(scope) {
            NProgress.start();
            NProgress.set(0.1);
            
            try {
                // Try multiple approaches to fetch all members
                let allMembers = [];
                let success = false;
                
                // Approach 1: Try with limit=all
                try {
                    const url1 = "members?page=1&limit=all&name=&code=&mobile_phone=&email=&plan=&SortField=created_at&SortType=desc";
                    const response1 = await axios.get(url1);
                    allMembers = response1.data.clients || [];
                    success = true;
                } catch (error1) {
                    // Approach 1 failed, try next
                }
                
                // Approach 2: Try with a very large limit
                if (!success) {
                    try {
                        const url2 = "members?page=1&limit=9999&name=&code=&mobile_phone=&email=&plan=&SortField=created_at&SortType=desc";
                        const response2 = await axios.get(url2);
                        allMembers = response2.data.clients || [];
                        success = true;
                    } catch (error2) {
                        // Approach 2 failed, try next
                    }
                }
                
                // Approach 3: Try without limit parameter
                if (!success) {
                    try {
                        const url3 = "members?page=1&name=&code=&mobile_phone=&email=&plan=&SortField=created_at&SortType=desc";
                        const response3 = await axios.get(url3);
                        allMembers = response3.data.clients || [];
                        success = true;
                    } catch (error3) {
                        // Approach 3 failed
                    }
                }
                
                if (!success || allMembers.length === 0) {
                    this.makeToast("warning", "No members found to export", "Warning");
                    NProgress.done();
                    return;
                }
                
                if (this.exportType === 'pdf') {
                    this.clients_PDF_All(allMembers);
                } else {
                    this.exportExcel_All(allMembers);
                }
                
                this.makeToast("success", `Successfully exported ${allMembers.length} members`, "Success");
                NProgress.done();
            } catch (error) {
                NProgress.done();
                
                // Fallback: try to export current page data
                this.makeToast("warning", "Could not fetch all members. Exporting current page data instead.", "Warning");
                if (this.exportType === 'pdf') {
                    this.clients_PDF();
                } else {
                    this.exportExcel();
                }
            }
        },

        exportExcel() {
            try {
                // Create a simple CSV export as fallback
                const headers = ['S.No', 'Member ID', 'Member Name', 'Email', 'Phone', 'Plan', 'Joined Date', 'Expiry Date', 'Status'];
                const csvData = this.excelData.map(row => [
                    row.SerialNo,
                    row.MemberID,
                    row.MemberName,
                    row.Email,
                    row.Phone,
                    row.Plan,
                    row.JoinedDate,
                    row.ExpiryDate,
                    row.Status
                ]);
                
                // Add headers
                csvData.unshift(headers);
                
                // Convert to CSV string
                const csvContent = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
                
                // Create and download file
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', `members_list_page_${this.serverParams.page}.csv`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                this.makeToast("success", "Excel file downloaded successfully", "Success");
            } catch (error) {
                this.makeToast("danger", "Failed to generate Excel file", "Error");
            }
        },

        exportExcel_All(allMembers) {
            try {
                // Create Excel data for all members
                const excelData = allMembers.map((client, index) => {
                    return {
                        "SerialNo": index + 1,
                        "MemberID": this.getMemberId(client),
                        "MemberName": client.membername || client.name || "N/A",
                        "Email": client.email || "N/A",
                        "Mobile Phone": client.mobile_phone || "N/A",
                        "Plan": this.getPlanName(client),
                        "JoinedDate": this.getJoiningDate(client),
                        "ExpiryDate": this.getExpireDate(client),
                        "Status": this.getStatusText(client),
                    };
                });

                // Create a simple CSV export
                const headers = ['S.No', 'Member ID', 'Member Name', 'Email', 'Phone', 'Plan', 'Joined Date', 'Expiry Date', 'Status'];
                const csvData = excelData.map(row => [
                    row.SerialNo,
                    row.MemberID,
                    row.MemberName,
                    row.Email,
                    row.Phone,
                    row.Plan,
                    row.JoinedDate,
                    row.ExpiryDate,
                    row.Status
                ]);
                
                // Add headers
                csvData.unshift(headers);
                
                // Convert to CSV string
                const csvContent = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
                
                // Create and download file
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', 'members_list_all.csv');
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                this.makeToast("success", "Excel file downloaded successfully", "Success");
            } catch (error) {
                this.makeToast("danger", "Failed to generate Excel file", "Error");
            }
        },

        // Utility methods
        handleImageError(event) {
            event.target.src = '/images/default-profile.jpg';
        },

        formatNumber(number, dec) {
            const value = (
                typeof number === "string" ? number : number.toString()
            ).split(".");
            if (dec <= 0) return value[0];
            let formated = value[1] || "";
            if (formated.length > dec)
                return `${value[0]}.${formated.substr(0, dec)}`;
            while (formated.length < dec) formated += "0";
            return `${value[0]}.${formated}`;
        },

        // Toast notification
        makeToast(variant, msg, title) {
            this.$root.$bvToast.toast(msg, {
                title: title,
                variant: variant,
                solid: true,
            });
        },

        // Filter methods
        onFilterChange() {
            // Debounce filter changes
            clearTimeout(this.filterTimeout);
            this.filterTimeout = setTimeout(() => {
                this.applyFilters();
            }, 500);
        },

        applyFilters() {
            this.updateParams({ page: 1 });
            this.Get_Clients(1);
        },

        clearFilters() {
            this.Filter_Name = "";
            this.Filter_Code = "";
            this.Filter_Phone = "";
            this.Filter_Email = "";
            this.Filter_PlanName = "";
            this.applyFilters();
        },

        // Mail modal methods
        openMailModal(client) {
            this.mailForm.memberId = client.id || null;
            this.mailForm.to = client.email || "";
            this.mailForm.recipientName = client.membername || client.name || "";
            this.mailForm.subject = "";
            this.mailForm.message = "";
            this.mailForm.template = null;
            this.mailForm.sending = false;
            
            this.$bvModal.show('mailModal');
        },

        resetMailForm() {
            this.mailForm = {
                memberId: null,
                to: "",
                recipientName: "",
                subject: "",
                message: "",
                template: null,
                sending: false
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
                this.makeToast("danger", "Member not found. Please close and reopen the email form.", "Error");
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
                const errorMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    "Failed to send email. Please try again.";
                this.makeToast("danger", errorMessage, "Error");
            } finally {
                this.mailForm.sending = false;
            }
        },
    },

    created() {
        // Prevent body scrolling - only table should scroll
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        
        // Ensure initial parameters are set correctly
        if (this.limit === 'all') {
            this.updateParams({ page: 1, perPage: -1 });
        } else {
            this.updateParams({ page: 1, perPage: parseInt(this.limit) });
        }
        
        // Initialize pagination with proper values
        this.serverParams.page = 1;
        this.serverParams.perPage = parseInt(this.limit);
        
        // Refresh total count first, then get clients
        this.refreshTotalCount().then(() => {
        this.Get_Clients(1);
        });
        
        // Fetch coaches from database
        this.fetchCoaches();

        Fire.$on("Event_Member", () => {
            setTimeout(() => {
                this.Get_Clients(this.serverParams.page);
                this.$bvModal.hide("New_Member");
            }, 500);
        });

        Fire.$on("Delete_Member", () => {
            setTimeout(() => {
                this.Get_Clients(this.serverParams.page);
            }, 500);
        });

        Fire.$on("Event_import", () => {
            setTimeout(() => {
                this.Get_Clients(this.serverParams.page);
                this.$bvModal.hide("importClients");
            }, 500);
        });
    },
    
    mounted() {
        this.applyTableLayoutStyles();
        // Apply styles after data loads
        setTimeout(() => {
            this.applyTableLayoutStyles();
        }, 1000);
        // Also watch for DOM changes
        const observer = new MutationObserver(() => {
            this.applyTableLayoutStyles();
        });
        if (this.$el) {
            observer.observe(this.$el, {
                childList: true,
                subtree: true
            });
        }
        // Clean up observer after 10 seconds
        setTimeout(() => {
            observer.disconnect();
        }, 10000);
    },
    
    beforeDestroy() {
        // Restore body scrolling when component is destroyed
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
    },
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

// Prevent page scrolling - only table should scroll
.members-page-wrapper {
    position: relative;
    height: calc(100vh - #{$topbar-height}); // Account for topbar
    overflow: hidden;
    display: flex;
    flex-direction: column;
    z-index: 1; // Ensure it's below sidebar (z-index 1000)
    
    .breadcrumb-nav-row {
        flex-shrink: 0;
    }
    
    .main-content {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        min-height: 0; // Important for flexbox children
        
        .page-header {
            flex-shrink: 0;
        }
        
        .main-content-wrapper {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            min-height: 0;
            
            .members-table-card {
                flex: 1;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                min-height: 0; // Important for flexbox children
                
                .card-body {
                    flex: 1;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    min-height: 0; // Important for flexbox children
                    
                    // Loading and no data states
                    > div.text-center {
                        flex-shrink: 0;
                    }
                    
                    // Search results info
                    .search-results-info {
                        flex-shrink: 0;
                    }
                    
                    // Table content wrapper
                    .table-content-wrapper {
                        position: relative !important;
                        flex: 1 1 0 !important;
                        overflow: hidden !important;
                        min-height: 0 !important;
                        height: 100% !important;
                        display: flex !important;
                        flex-direction: column !important;
                        
                        // Table responsive should take all available space
                        .table-responsive {
                            flex: 1 1 0 !important;
                            height: 100% !important;
                            min-height: 0 !important;
                            overflow-x: auto !important;
                            overflow-y: auto !important;
                            
                            // Table footer with pagination
                            tfoot {
                                position: relative !important;
                                bottom: 0;
                                z-index: 10;
                                background: linear-gradient(135deg, #dededc 0%, #e3e3e1 50%, #dededc 100%);
                                
                                .pagination-cell {
                                    padding: 0 !important;
                                    border-top: 2px solid rgba(0, 0, 0, 0.1) !important;
                                    background: linear-gradient(135deg, #dededc 0%, #e3e3e1 50%, #dededc 100%) !important;
                                    
                                    .pagination-container {
                                        width: 100%;
                                        margin: 0 !important;
                                        padding: 0.75rem 1rem !important;
                                        background: transparent !important;
                                        
                                        .pagination-text {
                                            color: #252525 !important;
                                        }
                                        
                                        .pagination-btn,
                                        .page-number-btn {
                                            background-color: rgba(255, 255, 255, 0.8) !important;
                                            border-color: rgba(0, 0, 0, 0.15) !important;
                                            color: #252525 !important;
                                            
                                            &:hover:not(:disabled) {
                                                background-color: rgba(255, 255, 255, 1) !important;
                                                border-color: rgba(0, 0, 0, 0.25) !important;
                                            }
                                            
                                            &:disabled {
                                                opacity: 0.5;
                                            }
                                        }
                                        
                                        .page-number-btn.btn-primary {
                                            background-color: #dc3545 !important;
                                            color: white !important;
                                            border-color: #dc3545 !important;
                                        }
                                        
                                        .per-page-label,
                                        .per-page-text {
                                            color: #252525 !important;
                                        }
                                        
                                        .form-select {
                                            background-color: rgba(255, 255, 255, 0.9) !important;
                                            border-color: rgba(0, 0, 0, 0.15) !important;
                                            color: #252525 !important;
                                            
                                            option {
                                                background-color: white;
                                                color: #252525;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        
                        // Pagination container styles
                        .pagination-container {
                            margin: 0 !important;
                            padding: 0.75rem 1rem !important;
                        }
                    }
                }
            }
        }
    }
}

// Page Header Styles - layout via Bootstrap classes; only typography and gap (B4 has no gap utility) here
.page-header {
    .header-left .page-title {
        font-family: $font-family-base !important;
        font-size: $font-size-xxl;
        font-weight: $font-weight-bold;
        color: $color-text-dark;
    }
    
    .header-actions {
        gap: 0.5rem;
        @media (min-width: 576px) {
            gap: 0.75rem;
        }
    }
    
    .search-field-container {
        margin: 0;
        @media (min-width: 768px) {
            max-width: 300px;
        }
    }
    
    .header-row-2 .search-and-filters {
        gap: 0.5rem;
        @media (min-width: 576px) {
            gap: 1rem;
        }
    }
}

// Search Field Styles
.search-field-container {
    display: flex;
    justify-content: center;
}

.search-field {
    position: relative;
    width: 100%;
    height: 40px;
    background: $color-white;
    border: 1px solid $color-border-muted;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 0;
    transition: all 0.3s ease;
    
    &:focus-within {
        background: $color-white;
        border-color: $color-button;
        box-shadow: 0 0 0 2px rgba(255, 64, 64, 0.2);
    }
}

.search-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: $color-muted;
    font-size: 16px;
    opacity: 0.7;
    pointer-events: none;
    z-index: 1;
}

.search-clear {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: $color-muted;
    font-size: 16px;
    opacity: 0.7;
    cursor: pointer;
    transition: color 0.2s ease;
    z-index: 2;
    
    &:hover {
        color: #ff4040;
        opacity: 1;
    }
}

.search-input {
    flex: 1;
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: $color-text-dark;
    font-size: 14px;
    font-weight: 400;
    font-family: "Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif !important;
    padding-left: 45px;
    padding-right: 45px;
    
    &::placeholder {
        color: $color-muted;
        font-size: 14px;
    }
}

// Filter Buttons Styles
.filter-buttons-container {
    flex: 1;
}

.filter-buttons {
    display: flex;
    gap: 0.25rem;
}

.filter-btn {
    padding: 5px 8px;
    
    i.fas.fa-times {
        font-size: 12px;
        opacity: 0.8;
        margin-left: 4px;
    }
}

// More Dropdown Button (in filter buttons) - force same styling as other filter buttons
.more-dropdown {
    // Override Bootstrap Vue dropdown button styling
    .btn, .btn-secondary, .btn-outline-secondary {
        background: transparent !important;
        color: #000 !important;
        padding: 5px 8px !important;
        border-color: #6c757d !important;
        font-size: 14px !important;
        transition: all 0.3s ease !important;
        cursor: pointer !important;
        
        &:hover {
            background: transparent !important;
            color: #ff4040 !important;
            border-color: #ff4040 !important;
        }
        
        &:focus {
            box-shadow: none !important;
            background: transparent !important;
            outline: none !important;
        }
        
        &:active {
            background: $color-background-hover !important;
            color: $color-text-dark !important;
        }
    }
}

// Status dropdown styling
.status-dropdown {
    .btn, .btn-secondary, .btn-outline-secondary {
        background: transparent !important;
        border: 1px solid #6c757d !important;
        color: #000 !important;
        border-radius: 20px !important;
        padding: 8px 16px !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        transition: all 0.3s ease !important;
        box-shadow: none !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        white-space: nowrap !important;
        
        &:hover {
            background: $color-background-hover !important;
            border-color: $color-border !important;
            color: $color-text-dark !important;
        }
        
        &:focus {
            box-shadow: none !important;
            background: transparent !important;
            border-color: $color-border-muted !important;
            color: $color-text-dark !important;
            outline: none !important;
        }
        
        &:active {
            background: $color-background-hover !important;
            border-color: $color-border !important;
            color: $color-text-dark !important;
        }
    }
    
    &.active .btn {
        background-color: $color-button !important;
        border-color: $color-button !important;
        color: $color-white !important;
        
        &:hover {
            background-color: $color-button-hover !important;
            border-color: $color-button-hover !important;
            color: $color-white !important;
        }
    }
}

// Coach dropdown styling
.coach-dropdown {
    .btn, .btn-secondary, .btn-outline-secondary {
        background: transparent !important;
        border: 1px solid $color-border-muted !important;
        color: $color-text-dark !important;
        border-radius: 20px !important;
        padding: 8px 16px !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        transition: all 0.3s ease !important;
        box-shadow: none !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        white-space: nowrap !important;
        
        &:hover {
            background: $color-background-hover !important;
            border-color: $color-border !important;
            color: $color-text-dark !important;
        }
        
        &:focus {
            box-shadow: none !important;
            background: transparent !important;
            border-color: $color-border-muted !important;
            outline: none !important;
        }
        
        &:active {
            background: $color-background-hover !important;
            border-color: $color-border !important;
            color: $color-text-dark !important;
        }
    }
    
    &.active .btn {
        background-color: $color-button !important;
        border-color: $color-button !important;
        color: $color-white !important;
        
        &:hover {
            background-color: $color-button-hover !important;
            border-color: $color-button-hover !important;
            color: $color-white !important;
        }
    }
}

// Membership dropdown styling
.membership-dropdown {
    .btn, .btn-secondary, .btn-outline-secondary {
        background: transparent !important;
        border: 1px solid $color-border-muted !important;
        color: $color-text-dark !important;
        border-radius: 20px !important;
        padding: 8px 16px !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        transition: all 0.3s ease !important;
        box-shadow: none !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        white-space: nowrap !important;
        
        &:hover {
            background: $color-background-hover !important;
            border-color: $color-border !important;
            color: $color-text-dark !important;
        }
        
        &:focus {
            box-shadow: none !important;
            background: transparent !important;
            border-color: $color-border-muted !important;
            outline: none !important;
        }
        
        &:active {
            background: $color-background-hover !important;
            border-color: $color-border !important;
            color: $color-text-dark !important;
        }
    }
    
    &.active .btn {
        background-color: $color-button !important;
        border-color: $color-button !important;
        color: $color-white !important;
        
        &:hover {
            background-color: $color-button-hover !important;
            border-color: $color-button-hover !important;
            color: $color-white !important;
        }
    }
    
    // Add scrolling to dropdown menu for many membership plans
    ::v-deep .dropdown-menu {
        max-height: 400px !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        -webkit-overflow-scrolling: touch !important;
        
        // Style scrollbar for better UX
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
    }
}

// Tag dropdown styling
.tag-dropdown {
    .btn, .btn-secondary, .btn-outline-secondary {
        background: transparent !important;
        border: 1px solid $color-border-muted !important;
        color: $color-text-dark !important;
        border-radius: 20px !important;
        padding: 8px 16px !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        transition: all 0.3s ease !important;
        box-shadow: none !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        white-space: nowrap !important;
        
        &:hover {
            background: $color-background-hover !important;
            border-color: $color-border !important;
            color: $color-text-dark !important;
        }
        
        &:focus {
            box-shadow: none !important;
            background: transparent !important;
            border-color: $color-border-muted !important;
            outline: none !important;
        }
        
        &:active {
            background: $color-background-hover !important;
            border-color: $color-border !important;
            color: $color-text-dark !important;
        }
    }
    
    &.active .btn {
        background-color: $color-button !important;
        border-color: $color-button !important;
        color: $color-white !important;
        
        &:hover {
            background-color: $color-button-hover !important;
            border-color: $color-button-hover !important;
            color: $color-white !important;
        }
    }
}

// Profile dropdown styling
.profile-dropdown {
    .btn, .btn-secondary, .btn-outline-secondary {
        background: transparent !important;
        border: 1px solid $color-border-muted !important;
        color: $color-text-dark !important;
        border-radius: 20px !important;
        padding: 8px 16px !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        transition: all 0.3s ease !important;
        box-shadow: none !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        white-space: nowrap !important;
        
        &:hover {
            background: $color-background-hover !important;
            border-color: $color-border !important;
            color: $color-text-dark !important;
        }
        
        &:focus {
            box-shadow: none !important;
            background: transparent !important;
            border-color: $color-border-muted !important;
            outline: none !important;
        }
        
        &:active {
            background: $color-background-hover !important;
            border-color: $color-border !important;
            color: $color-text-dark !important;
        }
    }
    
    &.active .btn {
        background-color: $color-button !important;
        border-color: $color-button !important;
        color: $color-white !important;
        
        &:hover {
            background-color: $color-button-hover !important;
            border-color: $color-button-hover !important;
            color: $color-white !important;
        }
    }
    
    .dropdown-arrow {
        transition: transform 0.3s ease;
        font-size: 12px;
        
        &.rotated {
            transform: rotate(180deg);
        }
    }
}

// Header Action Buttons
.header-actions {
    .btn {
        border-radius: $border-radius-md;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .btn-filter {
        &:hover {
            background-color: $color-info !important;
            color: $color-white !important;
        }
    }

    .btn-export {
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba($color-success, 0.4) !important;
        }
    }

    .btn-import {
        background-color: $color-warning;
        border-color: $color-warning;
        transition: all 0.3s ease;

        &:hover {
            background-color: $color-warning-hover;
            border-color: $color-warning-dark;
            box-shadow: 0 4px 12px rgba($color-warning, 0.4) !important;
            transform: translateY(-2px);
        }
    }

    .btn-mail {
        background: transparent;
        color: $color-button;
        font-weight: 600;
        min-width: 50px;
        font-size: $font-size-md;
        
        &:hover {
            border-color: $color-border;
            color: $color-button;
            transform: translateY(-2px);
        }
        
        &:focus {
            box-shadow: 0 0 0 0.2rem rgba($color-button, 0.25);
        }
    }

    .btn-add-member {
        background-color: $color-button;
        border-color: $color-button;
        font-weight: $font-weight-semibold;

        &:hover {
            background-color: $color-button-hover;
            border-color: $color-button-hover;
            text-decoration: none;
        }
    }
}

.members-table-card {
    height: 100%; // Ensure it takes full height
    display: flex;
    flex-direction: column;
    
    .card-body {
        padding: 0 !important;
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        min-height: 0;
        
        // All direct children should be flex containers
        > div {
            display: flex;
            flex-direction: column;
            flex: 1;
            overflow: hidden;
            min-height: 0;
            
            // Table content wrapper
            &.table-content-wrapper {
                display: flex;
                flex-direction: column;
                flex: 1;
                overflow: hidden;
                min-height: 0;
            }
        }
    }
}

.members-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
    margin-bottom: 0;
    
    // Table footer with pagination
    tfoot {
        position: relative !important;
        bottom: 0;
        z-index: 10;
        background: linear-gradient(135deg, #dededc 0%, #e3e3e1 50%, #dededc 100%);
        
        tr {
            background: linear-gradient(135deg, #dededc 0%, #e3e3e1 50%, #dededc 100%);
        }
        
        .pagination-cell {
            padding: 0 !important;
            border-top: 2px solid rgba(0, 0, 0, 0.1) !important;
            background: linear-gradient(135deg, #dededc 0%, #e3e3e1 50%, #dededc 100%) !important;
            
            .pagination-container {
                width: 100%;
                margin: 0 !important;
                padding: 0.75rem 1rem !important;
                background: transparent !important;
                
                .pagination-text {
                    color: #252525 !important;
                }
                
                .pagination-btn,
                .page-number-btn {
                    background-color: rgba(255, 255, 255, 0.8) !important;
                    border-color: rgba(0, 0, 0, 0.15) !important;
                    color: #252525 !important;
                    
                    &:hover:not(:disabled) {
                        background-color: rgba(255, 255, 255, 1) !important;
                        border-color: rgba(0, 0, 0, 0.25) !important;
                    }
                    
                    &:disabled {
                        opacity: 0.5;
                    }
                }
                
                .page-number-btn.btn-primary {
                    background-color: #dc3545 !important;
                    color: white !important;
                    border-color: #dc3545 !important;
                }
                
                .per-page-label,
                .per-page-text {
                    color: #252525 !important;
                }
                
                .form-select {
                    background-color: rgba(255, 255, 255, 0.9) !important;
                    border-color: rgba(0, 0, 0, 0.15) !important;
                    color: #252525 !important;
                    
                    option {
                        background-color: white;
                        color: #252525;
                    }
                }
            }
        }
    }
    
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

    .table-header {
        background: #f8f9fa;
        color: $color-text-dark;
        font-weight: 600;
        padding: 12px 5px;
        text-align: center;
        border-bottom: 2px solid #dee2e6;
        white-space: nowrap;
        position: sticky;
        top: 0;
        z-index: 10;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1); // Add subtle shadow for better visual separation
        
        // Header content with checkbox and text
        .header-content {
            display: flex;
            align-items: center;
            gap: 10px;
            
            .header-text {
                font-weight: 700;
            }
        }
        
        // Header alignment
        &:first-child {
            text-align: center; // Checkbox header
        }
        
        &:nth-child(2) {
            text-align: left; // Members header
        }
        
        &:nth-child(3) {
            text-align: center; // Contact header
        }
        
        &:nth-child(4) {
            text-align: center; // Coach header
        }
        
        &:nth-child(5) {
            text-align: center; // Member since header
        }
        
        &:nth-child(6) {
            text-align: center; // Activated on header
        }
        
        &:nth-child(7) {
            text-align: center; // Check In header
        }
        
        &:nth-child(8) {
            text-align: center; // Last online header
        }
        
        &:last-child {
            text-align: center; // Actions header
        }
    }

    td {
        padding: 0.75rem;
        border-bottom: 1px solid #dee2e6;
        vertical-align: top;

        &.member-name {
            font-weight: 500;
            color: $color-text-dark;
        }

        &.member-email {
            color: $color-muted;
        }

        &.member-phone {
            font-size: 0.8rem;
            color: $color-muted;
        }

        &.member-plan {
            .plan-badge {
                display: inline-block;
                padding: 0.25rem 0.5rem;
                border-radius: 12px;
                font-size: 0.75rem;
                color: #000000;
                font-weight: 500;
                text-transform: capitalize;

                &.premium {
                    background: #d4edda;
                    color: #155724;
                }
                &.basic {
                    background: #e9ecef;
                    color: #495057;
                }
                &.standard {
                    background: #d1ecf1;
                    color: #0c5460;
                }
                &.pro {
                    background: #f8d7da;
                    color: #721c24;
                }
                &.student {
                    background: #fff3cd;
                    color: #856404;
                }
                &.senior {
                    background: #ffeaa7;
                    color: #6c5ce7;
                }
                &.family {
                    background: #fdcb6e;
                    color: #e17055;
                }
                &.corporate {
                    background: #a29bfe;
                    color: #6c5ce7;
                }
                &.active {
                    background: #d4edda;
                    color: #155724;
                }
                &.na {
                    background: #e9ecef;
                    color: #6c757d;
                }
            }
        }

        &.member-status {
            .status-badge {
                display: inline-block;
                padding: 0.25rem 0.5rem;
                border-radius: 12px;
                font-size: 0.75rem;
                font-weight: 500;
                text-transform: capitalize;

                &.active {
                    background: #d4edda;
                    color: #155724;
                }
                &.inactive {
                    background: #f8d7da;
                    color: #721c24;
                }
                &.expired {
                    background: #fff3cd;
                    color: #856404;
                }
            }
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

                &.delete-btn {
                    background: #ffebee;
                    color: #d32f2f;

                    &:hover {
                        background: #ffcdd2;
                    }
                }
            }
        }
    }

    .table-row {
        transition: background-color 0.2s ease;
        cursor: pointer;

        &:hover {
            background-color: #f8f9fa;
        }
        
        &:nth-child(even) {
            background-color: #f8f9fa;
        }

        &:hover {
            background-color: $color-background-hover;
            // transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
    }

    .table-cell {
        padding: 0px;
        vertical-align: middle;
        color: $color-text-dark;
        font-family: $font-family-base;
        font-size: $font-size-sm;
        font-weight: $font-weight-normal;
        border: none;
        text-align: center;
        
        // Table cell alignment
        &:first-child {
            text-align: center; // Checkbox column
        }
        
        &:nth-child(2) {
            text-align: left; // Members column
        }
        
        &:nth-child(3) {
            text-align: center; // Contact column
        }
        
        &:nth-child(4) {
            text-align: center; // Coach column
        }
        
        &:nth-child(5) {
            text-align: center; // Member since column
        }
        
        &:nth-child(6) {
            text-align: center; // Activated on column
        }
        
        &:nth-child(7) {
            text-align: center; // Check In column
        }
        
        &:nth-child(8) {
            text-align: center; // Last online column
        }
        
        &:last-child {
            text-align: center; // Actions column
        }
    }
}

// Member Profile (Clients column)
.member-profile {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 8px 0;

    .member-avatar {
    .member-image {
            width: 32px;
            height: 32px;
        border-radius: 50%;
        object-fit: cover;
    }
    }

    .member-details {
        .member-name-container {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .member-name {
            font-size: $font-size-sm;
            color: $color-text-dark;
            font-weight: $font-weight-semibold;
            margin-bottom: 0;
        }

        .pro-badge {
            background-color: #fbbf24;
            color: #92400e;
            font-size: 10px;
            font-weight: $font-weight-bold;
            padding: 2px 6px;
            border-radius: 4px;
            text-transform: uppercase;
        }
    }
}

// Member Contact
.member-contact {
    .contact-icons {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
    }

    .contact-icon {
        font-size: 16px;
        color: $color-muted;
        cursor: pointer;
        transition: all 0.2s ease;
        padding: 8px;
        border-radius: 6px;
        display: inline-block;

        &:hover {
            color: $color-button;
            background-color: rgba($color-button, 0.1);
            transform: scale(1.1);
        }
        
        &:active {
            transform: scale(0.95);
        }
    }
}

// Coach, Member since, Activated on, Check In, Last online
.coach-name,
.member-since,
.activated-on,
.check-in {
    font-size: $font-size-sm;
    color: $color-text-dark;
    font-weight: $font-weight-normal;
}

// Coach specific styling
.coach-name {
    font-weight: $font-weight-medium;
    color: $color-text-dark;
}

// Last online with indicator
.last-online-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .last-online {
        font-size: $font-size-sm;
        color: $color-text-dark;
        font-weight: $font-weight-normal;
        flex: 1;
    }

    .online-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;
        margin-left: 8px;
        flex-shrink: 0;
        
        &.active {
            background-color: #10b981; // Green for active members (same month)
        }
        
        &.warning {
            background-color: #f59e0b; // Yellow/Amber for 1 month ago
        }
        
        &.inactive {
            background-color: #ef4444; // Red for 2+ months ago or no login
        }
    }
}

// Action menu
.action-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 8px 0;

    .action-dots {
        font-size: 16px;
        color: $color-muted;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.2s ease;

        &:hover {
            background-color: $color-background-hover;
            color: $color-text-dark;
        }
    }
}

// Checkbox Styling
.select-all-checkbox,
.member-checkbox {
    width: 12px;
    height: 12px;
    cursor: pointer;
    accent-color: $color-button;
    
    &:hover {
        transform: scale(1.1);
    }
}

.select-all-checkbox {
    margin: 0;
}

.member-checkbox {
    margin: 0;
}

// Member avatar styling
.member-avatar {
    position: relative;
    display: inline-block;
}

// Copy message styling
.copy-message {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: $color-button;
    color: $color-white;
    padding: 12px 24px;
    border-radius: 25px;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba($color-button, 0.3);
    animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}

// Member profile styling
.member-profile {
    position: relative;
}

// Serial Number
.serial-number {
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    background-color: $color-background;
    color: $color-text-dark;
    border-radius: 50%;
    font-weight: $font-weight-semibold;
    font-size: $font-size-xxs;
    border: $border-width-sm $border-style-solid $color-border-muted;
}

// Member Data Styling
.member-id {
    font-weight: $font-weight-normal;
    color: $color-text-dark;
    background-color: $color-background;
    padding: $padding-xxs $padding-xs;
    border-radius: $border-radius-sm;
    font-size: $font-size-sm;
    border: none;
    display: inline-block;
}

.member-info {
    display: flex;
    flex-direction: column;
    gap: $padding-xxs;

    .member-name {
        font-size: $font-size-sm;
        color: $color-muted;
        font-weight: $font-weight-normal;
    }

    .member-email {
        font-size: $font-size-sm;
        color: $color-muted;
        font-weight: $font-weight-normal;
    }

    .member-phone {
        font-size: $font-size-sm;
        color: $color-muted;
        font-weight: $font-weight-normal;
    }
}

.plan-name {
    font-weight: $font-weight-normal;
    padding: $padding-xxs $padding-xs;
    border-radius: $border-radius-sm;
    font-size: $font-size-sm;
    border: $border-width-sm $border-style-solid transparent;
    display: inline-block;

    &.plan-premium {
        color: #d4af37;
        background-color: rgba(212, 175, 55, 0.1);
        border-color: rgba(212, 175, 55, 0.3);
        font-weight: $font-weight-semibold;
    }

    &.plan-basic {
        color: #6c757d;
        background-color: rgba(108, 117, 125, 0.1);
        border-color: rgba(108, 117, 125, 0.3);
    }

    &.plan-standard {
        color: #17a2b8;
        background-color: rgba(23, 162, 184, 0.1);
        border-color: rgba(23, 162, 184, 0.3);
    }

    &.plan-pro {
        color: #007bff;
        background-color: rgba(0, 123, 255, 0.1);
        border-color: rgba(0, 123, 255, 0.3);
        font-weight: $font-weight-semibold;
    }

    &.plan-student {
        color: #28a745;
        background-color: rgba(40, 167, 69, 0.1);
        border-color: rgba(40, 167, 69, 0.3);
    }

    &.plan-senior {
        color: #fd7e14;
        background-color: rgba(253, 126, 20, 0.1);
        border-color: rgba(253, 126, 20, 0.3);
    }

    &.plan-family {
        color: #e83e8c;
        background-color: rgba(232, 62, 140, 0.1);
        border-color: rgba(232, 62, 140, 0.3);
    }

    &.plan-corporate {
        color: #6f42c1;
        background-color: rgba(111, 66, 193, 0.1);
        border-color: rgba(111, 66, 193, 0.3);
        font-weight: $font-weight-semibold;
    }

    &.plan-active {
        color: $color-success;
        background-color: $color-success-light;
        border-color: color.adjust($color-success, $lightness: 20%);
    }

    &.plan-na {
        color: $color-muted;
        background-color: $color-background;
        border-color: $color-border-muted;
    }
}

.joining-date,
.expire-date {
    font-size: $font-size-sm;
    color: $color-muted;
    font-weight: $font-weight-normal;
    display: inline-block;

    &.expire-active {
        color: $color-success;
    }

    &.expire-expired {
        color: $color-danger;
    }

    &.expire-na {
        color: $color-muted;
    }
}

// Status Badge
.status-badge {
    display: inline-block;
    padding: $padding-xxs $padding-xs;
    border-radius: $border-radius-sm;
    font-size: $font-size-sm;
    font-weight: $font-weight-normal;
    text-transform: uppercase;
    border: $border-width-sm $border-style-solid transparent;

    &.status-active {
        background-color: $color-success-light;
        color: color.adjust($color-success, $lightness: -20%);
        border-color: color.adjust($color-success, $lightness: 20%);
    }

    &.status-expired {
        background-color: $color-danger-light;
        color: color.adjust($color-danger, $lightness: -20%);
        border-color: color.adjust($color-danger, $lightness: 20%);
    }

    &.status-inactive {
        background-color: $color-background;
        color: $color-muted;
        border-color: $color-border-muted;
    }
}

// Last Login Styling
.last-login {
    font-size: $font-size-sm;
    color: $color-subtitle;
    font-weight: $font-weight-medium;
}

// Members Column Special Styling
.members-column {
    background-color: rgb(229 206 206 / 12%) !important;
}

// Header with Sort Arrows
.header-with-sort {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    
    .header-text {
        flex: 1;
    }
    
    .sort-arrows {
        display: flex;
        flex-direction: column;
        // margin-right: 0px;
        
        .sort-arrow {
            font-size: 8px;
            color: #6c757d;
            cursor: pointer;
            transition: color 0.2s ease;
            
            &:hover {
                color: #333;
            }
            
            &.active {
                color: #000;
                font-weight: bold;
            }
        }
    }
}

// Action Dropdown
.action-dropdown {
    position: relative;
    
    .dropdown-dots {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        z-index: 1051 !important;
        
    }

    .dropdown-section-header {
        padding: 8px 16px 4px 16px;
        font-size: 11px;
        font-weight: 600;
        color: #6c757d;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        background-color: #f8f9fa;
        border-bottom: 1px solid #e9ecef;
        margin: 0;
        
        &:first-child {
            margin-top: 0;
        }
        
        &:not(:first-child) {
            margin-top: 8px;
            border-top: 1px solid #e9ecef;
        }
    }
    
    // Ensure dropdown menu is not clipped by table overflow
    // Use fixed positioning to escape table container
    ::v-deep .dropdown-menu {
        z-index: 1055 !important;
        position: fixed !important;
        max-height: none !important;
        min-width: 200px;
        will-change: transform;
    }
    
    // Ensure dropdown positions correctly relative to button
    ::v-deep .btn-group {
        position: static !important;
    }
    
    // When dropdown is open, ensure parent containers don't clip it
    &.show,
    &[aria-expanded="true"],
    ::v-deep .show {
        overflow: visible !important;
        
        ::v-deep .dropdown-menu {
            overflow: visible !important;
            display: block !important;
            position: fixed !important;
        }
    }
}

// Ensure table cell doesn't clip dropdown
.table-cell {
    &.text-center {
        overflow: visible !important;
        position: relative;
    }
}

// Dropdown Items Styling
.dropdown-item {
    display: flex;
    align-items: center;
    padding: $padding-xs $padding-sm;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    transition: background-color 0.2s ease;
    border-radius: $border-radius-sm;
    margin: $margin-xxs;
    cursor: pointer;
    
    &:hover {
        background-color: #f8f9fa; // Simple light gray background on hover
        color: #252525 !important;
    }
    
    &:active,
    &:focus {
        background-color: transparent !important; // No background change on click
        color: inherit !important;
    }
    
    i {
        font-size: $font-size-sm;
        margin-right: $padding-xs;
        color: #ff4040 !important; // Red color for all action icons
    }
    
    &.action-view {
        color: $color-info;
    }
    
    // &.action-edit {
    //     color: $color-warning;
    // }
    
    &.action-delete {
        color: $color-danger;
        
        .delete-text {
            font-weight: $font-weight-semibold;
        }
    }
}

// Responsive styles - Applied meals-table responsive styling
@media (max-width: 768px) {
    .members-table {
        font-size: 0.8rem;

        th,
        td {
            padding: 0.5rem 0.4rem;
        }

        .member-email {
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

@media (max-width: $breakpoint-md) {
    .members-table {
        font-size: 0.8rem;

        th,
        td {
            padding: 0.5rem 0.4rem;
        }

        .member-email {
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

// Pagination Styles
.pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $padding-xxs;
    background-color: $color-white;
    border-top: $border-width-sm $border-style-solid $color-border-muted;
    border-radius: 0 0 $border-radius-sm $border-radius-sm;
    box-shadow: $box-shadow-sm;
    
    
    .pagination-info {
        .pagination-text {
            color: $color-text-dark;
            font-size: $font-size-sm;
            font-weight: $font-weight-medium;
        }
    }

    .pagination-controls {
        display: flex;
        align-items: center;
        gap: $padding-xs;

        .pagination-btn {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 3px 6px;
            border-radius: 5px;
            font-weight: $font-weight-medium;
            transition: all 0.3s ease;

            &:hover:not(:disabled) {
                transform: translateY(-1px);
                box-shadow: $box-shadow-sm;
            }

            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            i {
                font-size: $font-size-xs;
            }
        }

        .page-numbers {
            display: flex;
            align-items: center;
            gap: $padding-xxs;

            .page-number-btn {
                min-width: 25px;
                height: 25px;
                padding: 2px;
                border-radius: $border-radius-sm;
                font-weight: $font-weight-medium;
                transition: all 0.3s ease;

                &:hover {
                    transform: translateY(-1px);
                    box-shadow: $box-shadow-sm;
                }
            }
        }
    }

    .per-page-selector {
        display: flex;
        align-items: center;
        gap: $padding-xs;

        .per-page-label {
            color: $color-text-dark;
            font-size: $font-size-sm;
            font-weight: $font-weight-medium;
        }

        .per-page-select {
            width: 100px;
            border-radius: $border-radius-sm;
            border-color: $color-border-muted;
            font-size: $font-size-sm;

            &:focus {
                border-color: $color-button;
                box-shadow: 0 0 0 0.2rem rgba($color-button, 0.25);
            }
        }

        .per-page-text {
            color: $color-muted;
            font-size: $font-size-sm;
        }
    }
}



// Loading State
.loading_page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
}

.spinner-primary {
    border-color: $color-link;
    border-top-color: transparent;
}

// Filter Sidebar Styles
.filter-sidebar {
    // background-color: $color-white !important;
    // border: $border-width-sm $border-style-solid $color-border-muted;
    // box-shadow: $box-shadow-lg;

    .b-sidebar-header {
        background-color: $color-white !important;
        border-bottom: $border-width-sm $border-style-solid $color-border-muted;
        padding: $padding-md $padding-lg;
        
        .b-sidebar-header-title {
            color: $color-text-dark;
            font-weight: $font-weight-semibold;
            font-size: $font-size-lg;
            font-family: $font-family-base;
        }
    }
    
    .b-sidebar-body {
        background-color: $color-white !important;
        padding: 0;
        border-radius: 0 0 $border-radius-sm $border-radius-sm;
    }
}

.filter-container {
    padding: $padding-lg;
    background-color: $color-white;
    height: 100%;
    overflow-y: auto;
    border-radius: 0 0 $border-radius-sm $border-radius-sm;

    .filter-section {
        margin-bottom: $padding-xl;

        .filter-title {
            color: $color-text-dark;
            font-weight: $font-weight-semibold;
            font-size: $font-size-base;
            margin-bottom: $padding-md;
            padding-bottom: $padding-sm;
            border-bottom: $border-width-sm $border-style-solid $color-border-muted;
            display: flex;
            align-items: center;
            
            i {
                color: $color-info;
                font-size: $font-size-sm;
            }
        }

        .form-group {
            margin-bottom: $padding-md;

            .filter-label {
                color: $color-text-dark;
                font-weight: $font-weight-medium;
                font-size: $font-size-sm;
                margin-bottom: $padding-xs;
                display: flex;
                align-items: center;
                
                i {
                    color: $color-muted;
                    font-size: $font-size-xs;
                }
            }

            .filter-input {
                border-radius: $border-radius-sm;
                border-color: $color-border-muted;
                font-size: $font-size-sm;
                padding: $padding-xs $padding-sm;
                background-color: $color-white;
                transition: all 0.3s ease;

                &:focus {
                    border-color: $color-button;
                    box-shadow: 0 0 0 0.2rem rgba($color-button, 0.25);
                    background-color: $color-white;
                }

                &::placeholder {
                    color: $color-muted;
                    font-size: $font-size-xs;
                }
            }
        }
    }

    .filter-actions {
        display: flex;
        flex-direction: column;
        gap: $padding-sm;
        padding-top: $padding-md;
        border-top: $border-width-sm $border-style-solid $color-border-muted;

        .btn-apply-filters {
            background-color: $color-button;
            border-color: $color-button;
            font-weight: $font-weight-medium;
            border-radius: $border-radius-sm;
            padding: $padding-xs $padding-md;
            transition: all 0.3s ease;

            &:hover {
                background-color: $color-button-hover;
                border-color: $color-button-hover;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba($color-button, 0.4) !important;
            }

            &:active {
                transform: translateY(0);
            }

            i {
                font-size: $font-size-sm;
            }
        }

        .btn-clear-filters {
            border-color: $color-border-muted;
            color: $color-text-dark;
            font-weight: $font-weight-medium;
            border-radius: $border-radius-md;
            padding: $padding-xs $padding-md;
            transition: all 0.3s ease;

            &:hover {
                background-color: $color-background;
                border-color: $color-muted;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba($color-muted, 0.2) !important;
            }

            &:active {
                transform: translateY(0);
            }

            i {
                font-size: $font-size-sm;
            }
        }
    }
}

// Export Modal Styles
.btn-cancel-export {
    background-color: $color-muted !important;
    border-color: $color-muted !important;
    color: $color-white !important;
    font-weight: $font-weight-medium;
    border-radius: $border-radius-sm;
    padding: $padding-xs $padding-md;
    transition: all 0.3s ease;
    font-size: $font-size-sm;

    &:hover {
        background-color: color.adjust($color-muted, $lightness: -10%) !important;
        border-color: color.adjust($color-muted, $lightness: -10%) !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba($color-muted, 0.4) !important;
    }

    &:active {
        transform: translateY(0);
    }

    &:focus {
        box-shadow: 0 0 0 0.2rem rgba($color-muted, 0.25) !important;
    }
}


// Import Modal Styles
.import-content {
    .import-instructions {
        margin-bottom: $padding-lg;
        padding: $padding-md;
        background-color: $color-background;
        border-radius: $border-radius-sm;
        border: $border-width-sm $border-style-solid $color-border-muted;

        .import-title {
            color: $color-text-dark;
            font-weight: $font-weight-semibold;
            font-size: $font-size-base;
            margin-bottom: $padding-sm;
            display: flex;
            align-items: center;
            
            i {
                color: $color-info;
                font-size: $font-size-sm;
            }
        }

        .import-text {
            color: $color-muted;
            font-size: $font-size-sm;
            margin-bottom: $padding-md;
        }

        .required-fields,
        .optional-fields {
            margin-bottom: $padding-md;

            .fields-title {
                color: $color-text-dark;
                font-weight: $font-weight-semibold;
                font-size: $font-size-sm;
                margin-bottom: $padding-xs;
            }

            .fields-list {
                list-style: none;
                padding-left: 0;
                margin-bottom: 0;

                li {
                    color: $color-muted;
                    font-size: $font-size-xs;
                    margin-bottom: $padding-xxs;
                    padding: $padding-xxs $padding-xs;
                    background-color: $color-white;
                    border-radius: $border-radius-sm;
                    border: $border-width-sm $border-style-solid $color-border-muted;

                    strong {
                        color: $color-text-dark;
                        font-weight: $font-weight-semibold;
                    }
                }
            }
        }

        .required-fields {
            .fields-title {
                color: $color-danger;
            }
        }

        .optional-fields {
            .fields-title {
                color: $color-info;
            }
        }
    }

    .import-form {
        .file-upload-section {
            margin-bottom: $padding-lg;

            .file-input-wrapper {
                position: relative;
                display: inline-block;
                width: 100%;

                .file-input {
                    position: absolute;
                    opacity: 0;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                    z-index: 2;
                }

                .file-input-display {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: $padding-md;
                    border: 2px dashed $color-border-muted;
                    border-radius: $border-radius-sm;
                    background-color: $color-background;
                    color: $color-muted;
                    font-size: $font-size-sm;
                    font-weight: $font-weight-medium;
                    transition: all 0.3s ease;
                    min-height: 60px;

                    &:hover {
                        border-color: $color-button;
                        background-color: rgba($color-button, 0.05);
                    }

                    i {
                        font-size: $font-size-lg;
                        color: $color-info;
                    }

                    .file-selected {
                        color: $color-success;
                        font-weight: $font-weight-semibold;
                    }
                }
            }

            .file-error {
                margin-top: $padding-xs;
                color: $color-danger;
                font-size: $font-size-xs;
                display: flex;
                align-items: center;
                
                i {
                    font-size: $font-size-xs;
                }
            }
        }

        .import-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: $padding-lg;

            .action-buttons {
                display: flex;
                align-items: center;
                gap: $padding-sm;

                .btn-import-submit {
                    background-color: $color-button;
                    border-color: $color-button;
                    font-weight: $font-weight-medium;
                    border-radius: $border-radius-sm;
                    padding: $padding-xs $padding-md;
                    transition: all 0.3s ease;

                    &:hover:not(:disabled) {
                        background-color: $color-button-hover;
                        border-color: $color-button-hover;
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba($color-button, 0.4) !important;
                    }

                    &:disabled {
                        opacity: 0.6;
                        cursor: not-allowed;
                    }

                    i {
                        font-size: $font-size-sm;
                    }
                }

                .import-progress {
                    display: flex;
                    align-items: center;
                    gap: $padding-xs;

                    .spinner {
                        width: 16px;
                        height: 16px;
                    }

                    .progress-text {
                        color: $color-muted;
                        font-size: $font-size-xs;
                    }
                }
            }

            .download-section {
                .btn-download-template {
                    border-color: $color-info;
                    color: $color-info;
                    font-weight: $font-weight-medium;
                    border-radius: $border-radius-sm;
                    padding: $padding-xs $padding-md;
                    transition: all 0.3s ease;

                    &:hover {
                        background-color: $color-info;
                        border-color: $color-info;
                        color: $color-white;
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba($color-info, 0.4) !important;
                    }

                    i {
                        font-size: $font-size-sm;
                    }
                }
            }
        }
    }

    .import-results {
        margin-top: $padding-lg;
        padding: $padding-md;
        border-radius: $border-radius-sm;
        border: $border-width-sm $border-style-solid $color-border-muted;

        .results-header {
            margin-bottom: $padding-sm;

            .results-title {
                color: $color-text-dark;
                font-weight: $font-weight-semibold;
                font-size: $font-size-sm;
                margin-bottom: 0;
                display: flex;
                align-items: center;
                
                i {
                    color: $color-info;
                    font-size: $font-size-xs;
                }
            }
        }

        .results-content {
            .result-item {
                display: flex;
                align-items: center;
                padding: $padding-xs;
                border-radius: $border-radius-sm;
                font-size: $font-size-sm;
                font-weight: $font-weight-medium;

                &.success {
                    background-color: rgba($color-success, 0.1);
                    color: color.adjust($color-success, $lightness: -20%);
                    border: $border-width-sm $border-style-solid rgba($color-success, 0.3);

                    i {
                        color: $color-success;
                    }
                }

                &.error {
                    background-color: rgba($color-danger, 0.1);
                    color: color.adjust($color-danger, $lightness: -20%);
                    border: $border-width-sm $border-style-solid rgba($color-danger, 0.3);

                    i {
                        color: $color-danger;
                    }
                }

                i {
                    font-size: $font-size-sm;
                }
            }
        }
    }
}

.btn-close-import {
    background-color: $color-muted !important;
    border-color: $color-muted !important;
    color: $color-white !important;
    font-weight: $font-weight-medium;
    border-radius: $border-radius-sm;
    padding: $padding-xs $padding-md;
    transition: all 0.3s ease;
    font-size: $font-size-sm;

    &:hover {
        background-color: color.adjust($color-muted, $lightness: -10%) !important;
        border-color: color.adjust($color-muted, $lightness: -10%) !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba($color-muted, 0.4) !important;
    }

    &:active {
        transform: translateY(0);
    }

    &:focus {
        box-shadow: 0 0 0 0.2rem rgba($color-muted, 0.25) !important;
    }
}

// Responsive Design
@media (max-width: $breakpoint-md) {
    .main-content {
        padding: $padding-sm;
    }

    // Removed table-scrollable max-height constraint to allow full height

// Page Header
.page-header {
    .header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: $padding-md;
    }

        .header-right {
            .header-actions {
                justify-content: center;
            }
        }
    }

    .members-table {
        font-size: $font-size-xxs;

        .table-header,
        .table-cell {
            padding: $padding-xs $padding-xxs;
        }

        .member-info {
            .member-name {
                font-size: $font-size-xxs;
            }

            .member-email {
                font-size: $font-size-xxxs;
            }

            .member-phone {
                font-size: $font-size-xxxs;
            }
        }

        .plan-name,
        .status-badge {
            font-size: $font-size-xxxs;
            padding: $margin-xxs $padding-xxs;
        }

        .member-id {
            font-size: $font-size-sm;
            padding: $margin-xxs $padding-xxs;
        }
    }

    .member-image {
        width: 30px;
        height: 30px;
    }

    .serial-number {
        width: 20px;
        height: 20px;
        line-height: 20px;
        font-size: $font-size-xxxs;
    }
}

// Responsive Styles for Mobile Devices
@media (max-width: 767.98px) {
    .members-page-wrapper {
        .page-header {
            .header-content {
                flex-direction: column;
                align-items: stretch;
                
                .filter-buttons-container {
                    order: 2;
                    margin: 10px 0;
                    justify-content: center;
                }
                
                .header-right {
                    order: 3;
                }
                
                .header-left {
                    order: 1;
                    text-align: center;
                    
                    .page-title {
                        font-size: 30px;
                        margin-bottom: 0;
                    }
                }
                
                .header-right {
                    .header-actions {
                        justify-content: center;
                        
                        .btn {
                            padding: 0.375rem 0.75rem;
                            font-size: 0.875rem;
                            
                            i {
                                font-size: 0.875rem;
                            }
                        }
                    }
                }
            }
        }
        
        .members-table-card {
            .card-body {
                padding: 0.5rem;
                
                .table-responsive {
                    border: none;
                    
                    .members-table {
                        font-size: 0.875rem;
                        
                        .table-header {
                            padding: 0.5rem 0.25rem;
                            font-size: 0.9rem !important;
                            font-weight: 700 !important;
                        }
                        
                        .table-cell {
                            padding: 0.5rem 0.25rem;
                            font-size: 0.875rem;
                            
                            .member-image {
                                width: 40px;
                                height: 40px;
                            }
                            
                            .member-name {
                                font-weight: 600;
                                color: #333;
                                
                                .mobile-member-info {
                                    margin-top: 0.25rem;
                                    
                                    small {
                                        font-size: 0.75rem;
                                        line-height: 1.2;
                                    }
                                    
                                    .status-badge-sm {
                                        display: inline-block;
                                        padding: 0.125rem 0.375rem;
                                        border-radius: 0.25rem;
                                        font-size: 0.625rem;
                                        font-weight: 600;
                                        text-transform: uppercase;
                                        margin-top: 0.25rem;
                                        
                                        &.status-active {
                                            background-color: #d4edda;
                                            color: #155724;
                                            border: 1px solid #c3e6cb;
                                        }
                                        
                                        &.status-expired {
                                            background-color: #f8d7da;
                                            color: #721c24;
                                            border: 1px solid #f5c6cb;
                                        }
                                        
                                        &.status-inactive {
                                            background-color: #e2e3e5;
                                            color: #383d41;
                                            border: 1px solid #d6d8db;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
        .pagination-container {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 0.5rem;
            
            .pagination-controls {
                .page-numbers {
                    .page-number-btn {
                        min-width: 32px;
                        height: 32px;
                        font-size: 0.875rem;
                    }
                }
            }
            
            .per-page-selector {
                .per-page-select {
                    width: 100px;
                }
            }
        }
    }
}

@media (max-width: 575.98px) {
    .members-page-wrapper {
        .page-header {
            .header-content {
                .header-right {
                    .header-actions {
                        flex-direction: column;
                        width: 100%;
                        
                        .btn {
                            width: 100%;
                            justify-content: center;
                        }
                    }
                }
            }
        }
        
        .members-table-card {
            .card-body {
                padding: 0.25rem;
                
                .table-responsive {
                    .members-table {
                        .table-header {
                            padding: 0.375rem 0.125rem;
                            font-size: 0.7rem;
                        }
                        
                        .table-cell {
                            padding: 0.375rem 0.125rem;
                            font-size: 0.8rem;
                            
                            .member-image {
                                width: 35px;
                                height: 35px;
                            }
                            
                            .member-name {
                                font-size: 0.875rem;
                                
                                .mobile-member-info {
                                    small {
                                        font-size: 0.7rem;
                                    }
                                    
                                    .status-badge-sm {
                                        font-size: 0.6rem;
                                        padding: 0.1rem 0.25rem;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
        .pagination-container {
            padding: 0.75rem 0.25rem;
            
            .pagination-controls {
                .pagination-btn {
                    padding: 0.375rem 0.5rem;
                    font-size: 0.8rem;
                }
                
                .page-numbers {
                    .page-number-btn {
                        min-width: 28px;
                        height: 28px;
                        font-size: 0.8rem;
                    }
                }
            }
        }
    }
}

// Extra small devices (portrait phones)
@media (max-width: 479.98px) {
    .members-page-wrapper {
        .members-table-card {
            .card-body {
                .table-responsive {
                    .members-table {
                        .table-header {
                            padding: 0.25rem 0.1rem;
                            font-size: 0.65rem;
                        }
                        
                        .table-cell {
                            padding: 0.25rem 0.1rem;
                            font-size: 0.75rem;
                            
                            .member-image {
                                width: 30px;
                                height: 30px;
                            }
                            
                            .member-name {
                                font-size: 0.8rem;
                                
                                .mobile-member-info {
                                    small {
                                        font-size: 0.65rem;
                                    }
                                    
                                    .status-badge-sm {
                                        font-size: 0.55rem;
                                        padding: 0.075rem 0.2rem;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
        .pagination-container {
            .pagination-controls {
                .page-numbers {
                    .page-number-btn {
                        min-width: 24px;
                        height: 24px;
                        font-size: 0.75rem;
                    }
                }
            }
        }
    }
}

// Filter sidebar responsive adjustments
@media (max-width: 767.98px) {
    .filter-sidebar {
        width: 100% !important;
        max-width: 100vw;
        
        .filter-container {
            padding: 1rem;
            
            .filter-section {
                .form-group {
                    .filter-input {
                        font-size: 1rem; // Prevent zoom on iOS
                    }
                }
            }
        }
    }
}

// Table horizontal scroll for very small screens
@media (max-width: 479.98px) {
    .table-responsive {
        .members-table {
            min-width: 600px; // Ensure minimum width for readability
            
            .table-cell {
                white-space: nowrap;
                
                .member-name {
                    white-space: normal;
                    word-break: break-word;
                    max-width: 120px;
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
                color: $color-text-dark;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
                
                i {
                    color: $color-button;
                    margin-right: 0.5rem;
                }
            }
            
            .form-input,
            .form-textarea,
            .form-select {
                width: 100%;
                border: 1px solid $color-border-muted;
                border-radius: 6px;
                font-size: 0.9rem;
                transition: all 0.3s ease;
                
                &:focus {
                    outline: none;
                    border-color: $color-button;
                    box-shadow: 0 0 0 2px rgba(255, 64, 64, 0.2);
                }
                
                &[readonly] {
                    background-color: $color-background;
                    color: $color-muted;
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
                    border-color: $color-button;
                    box-shadow: 0 0 0 2px rgba(255, 64, 64, 0.2);
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
        border-radius: 6px;
        transition: all 0.3s ease;
    }
    &:hover {
        border-color: color.adjust($color-button, $lightness: -10%);
    }
    
    .btn-send-mail {
        padding: 0.5rem 1.5rem;
        font-weight: 500;
        border-radius: 6px;
        background-color: $color-button;
        border-color: $color-button;
        transition: all 0.3s ease;
        
        &:hover:not(:disabled) {
            background-color: color.adjust($color-button, $lightness: -10%);
            border-color: color.adjust($color-button, $lightness: -10%);
        }
        
        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
    }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

// Action dropdown item styling for mail
.action-mail {
    color: $color-text-dark;
    transition: all 0.3s ease;
}

// Action dropdown item styling for assign membership
.action-assign {
    color: #ff4040;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: #ffe6e6;
        color: #e63939;
    }
    
    i {
        color: $color-button;
    }
}

/* Filter button styles - override app.css with maximum specificity */
.filter-btn .btn,
.filter-btn .btn-secondary,
.filter-btn .btn-outline-secondary,
.filter-btn button.btn,
.filter-btn button.btn-secondary {
  color: #000 !important;
  background-color: transparent !important;
  border-color: #6c757d !important;
}

.filter-btn .btn:hover,
.filter-btn .btn-secondary:hover,
.filter-btn .btn-outline-secondary:hover,
.filter-btn button.btn:hover,
.filter-btn button.btn-secondary:hover {
  color: #ff4040 !important;
  background-color: transparent !important;
  border-color: #ff4040 !important;
}

.filter-btn .btn:focus,
.filter-btn .btn-secondary:focus,
.filter-btn .btn-outline-secondary:focus,
.filter-btn button.btn:focus,
.filter-btn button.btn-secondary:focus {
  color: #ff4040 !important;
  background-color: transparent !important;
  border-color: #ff4040 !important;
}

.filter-btn .btn:active,
.filter-btn .btn-secondary:active,
.filter-btn .btn-outline-secondary:active,
.filter-btn button.btn:active,
.filter-btn button.btn-secondary:active {
  color: #ff4040 !important;
  background-color: transparent !important;
  border-color: #ff4040 !important;
}

// ========================================
// RESPONSIVE DESIGN IMPROVEMENTS
// ========================================

// Enhanced Table Responsiveness
.table-responsive {
    width: 100% !important;
    overflow-x: auto !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch;
    position: relative;
    min-height: 0 !important; // Important for flexbox children to allow shrinking
    max-height: none !important; // Remove max-height constraint
    display: block; // Changed from flex to block for table
    
    // When inside table-content-wrapper, fill full height
    .table-content-wrapper & {
        height: 100% !important;
        flex: 1 1 0 !important;
    }
    
    // Allow dropdowns to escape overflow
    .action-dropdown {
        overflow: visible !important;
        position: static !important;
        
        ::v-deep .dropdown-menu {
            position: fixed !important;
            z-index: 1055 !important;
        }
    }
    
    // Add scroll indicators for better UX
    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 20px;
        pointer-events: none;
        z-index: 5;
    }
    
    &::before {
        left: 0;
        background: linear-gradient(to right, rgba(255, 255, 255, 0.9), transparent);
    }
    
    &::after {
        right: 0;
        background: linear-gradient(to left, rgba(255, 255, 255, 0.9), transparent);
    }
    
    .members-table {
        min-width: 100%;
        
        @media (max-width: 767.98px) {
            min-width: 800px;
        }
        
        @media (max-width: 479.98px) {
            min-width: 900px;
        }
    }
}

// Enhanced Responsive Breakpoints
@media (max-width: 1199.98px) {
    .members-page-wrapper {
        .main-content {
            .page-header {
                .header-row-1 {
                    .header-right {
                        .header-actions {
                            .btn {
                                font-size: 0.8rem;
                                padding: 0.4rem 0.8rem;
                            }
                        }
                    }
                }
                
                .header-row-2 {
                    .search-and-filters {
                        .filter-buttons {
                            .filter-btn {
                                font-size: 0.8rem;
                                padding: 0.4rem 0.8rem;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media (max-width: 991.98px) {
    .members-page-wrapper {
        .main-content {
            .page-header {
                .header-row-1 {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 1rem;
                    
                    .header-left {
                        width: 100%;
                    }
                    
                    .header-right {
                        width: 100%;
                        
                        .header-actions {
                            justify-content: flex-start;
                            flex-wrap: wrap;
                        }
                    }
                }
                
                .header-row-2 {
                    .search-and-filters {
                        flex-direction: column;
                        gap: 1rem;
                        
                        .search-field-container {
                            width: 100%;
                        }
                        
                        .filter-buttons-container {
                            width: 100%;
                            
                            .filter-buttons {
                                justify-content: flex-start;
                                flex-wrap: wrap;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media (max-width: 767.98px) {
    .members-page-wrapper {
        padding: 0.5rem;
        
        .main-content {
            .page-header {
                .header-row-1 {
                    .header-left {
                        .page-title {
                            font-size: 1.5rem;
                        }
                    }
                    
                    .header-right {
                        .header-actions {
                            .btn {
                                font-size: 0.75rem;
                                padding: 0.35rem 0.7rem;
                                
                                i {
                                    margin-right: 0.25rem;
                                }
                            }
                        }
                    }
                }
                
                .header-row-2 {
                    .search-and-filters {
                        .search-field-container {
                            .search-field {
                                .search-input {
                                    font-size: 1rem; // Prevent zoom on iOS
                                }
                            }
                        }
                        
                        .filter-buttons-container {
                            .filter-buttons {
                                gap: 0.5rem;
                                
                                .filter-btn {
                                    font-size: 0.75rem;
                                    padding: 0.35rem 0.7rem;
                                    
                                    .btn {
                                        font-size: 0.75rem;
                                        padding: 0.35rem 0.7rem;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
            .members-table-card {
                .card-body {
                    padding: 0.5rem;
                }
            }
        }
    }
    
    // Ensure table is always visible and scrollable
    .table-responsive {
        display: block !important;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        
        .members-table {
            min-width: 800px; // Ensure minimum width for readability
            width: 100%;
            
            .table-cell {
                white-space: nowrap;
                padding: 0.5rem 0.25rem;
                font-size: 0.8rem;
                
                .member-name {
                    white-space: normal;
                    word-break: break-word;
                    max-width: 120px;
                }
            }
        }
    }
}

@media (max-width: 575.98px) {
    .members-page-wrapper {
        padding: 0.25rem;
        
        .main-content {
            .page-header {
                .header-row-1 {
                    .header-left {
                        .page-title {
                            font-size: 1.25rem;
                        }
                    }
                    
                    .header-right {
                        .header-actions {
                            .btn {
                                font-size: 0.7rem;
                                padding: 0.3rem 0.6rem;
                                
                                span {
                                    display: none;
                                }
                            }
                        }
                    }
                }
                
                .header-row-2 {
                    .search-and-filters {
                        .filter-buttons-container {
                            .filter-buttons {
                                .filter-btn {
                                    font-size: 0.7rem;
                                    padding: 0.3rem 0.6rem;
                                    
                                    .btn {
                                        font-size: 0.7rem;
                                        padding: 0.3rem 0.6rem;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    // Enhanced table styling for small screens
    .table-responsive {
        .members-table {
            .table-header,
            .table-cell {
                padding: 0.3rem 0.15rem;
                font-size: 0.7rem;
                
                .member-image {
                    width: 20px;
                    height: 20px;
                }
                
                .contact-icon {
                    font-size: 0.7rem;
                    padding: 0.15rem;
                }
            }
        }
    }
    
    .pagination-container {
        .pagination-controls {
            .pagination-buttons {
                flex-direction: column;
                gap: 0.5rem;
                
                .page-numbers {
                    order: -1;
                }
            }
        }
        
        .per-page-selector {
            .per-page-label {
                font-size: 0.8rem;
            }
            
            .per-page-select {
                font-size: 0.8rem;
            }
        }
    }
}

// Enhanced table responsiveness for very small screens
@media (max-width: 479.98px) {
    .table-responsive {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        border: 1px solid #dee2e6;
        border-radius: 0.375rem;
        
        .members-table {
            min-width: 900px; // Increased for better readability
            margin-bottom: 0;
            
            .table-header,
            .table-cell {
                white-space: nowrap;
                padding: 0.4rem 0.2rem;
                font-size: 0.75rem;
                border-bottom: 1px solid #dee2e6;
                
                .member-name {
                    white-space: normal;
                    word-break: break-word;
                    max-width: 100px;
                }
                
                .member-image {
                    width: 25px;
                    height: 25px;
                }
                
                .contact-icon {
                    font-size: 0.8rem;
                    padding: 0.2rem;
                }
            }
            
            .table-header {
                background-color: #f8f9fa;
                font-weight: 600;
                position: sticky;
                top: 0;
                z-index: 10;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1); // Add subtle shadow for better visual separation
            }
        }
    }
}

// Filter sidebar mobile improvements
@media (max-width: 767.98px) {
    .filter-sidebar {
        width: 100% !important;
        max-width: 100vw;
        
        .filter-container {
            padding: 1rem;
            
            .filter-section {
                .form-group {
                    .filter-input {
                        font-size: 1rem; // Prevent zoom on iOS
                    }
                }
            }
        }
    }
}

// Invitation modal styling
.invitation-modal-content {
    .invitation-description {
        font-size: 14px;
        line-height: 1.5;
        color: #6c757d;
        margin-bottom: 1.5rem;
    }
    
    .invitation-options {
        .form-check {
            .form-check-input {
                margin-top: 0.2rem;
                margin-right: 0.75rem;
                accent-color: #ff4040;
                
                &:checked {
                    background-color: #ff4040;
                    border-color: #ff4040;
                }
                
                &:focus {
                    border-color: #ff4040;
                    box-shadow: 0 0 0 0.2rem rgba(255, 64, 64, 0.25);
                }
            }
            
            .form-check-label {
                font-weight: 500;
                color: #333;
                cursor: pointer;
            }
        }
    }
    
    .email-section {
        .form-label {
            font-weight: 600;
            color: #333;
            margin-bottom: 0.5rem;
        }
        
        .form-control {
            border: 1px solid #ced4da;
            border-radius: 0.375rem;
            padding: 0.5rem 0.75rem;
            
            &:focus {
                border-color: #ff4040;
                box-shadow: 0 0 0 0.2rem rgba(255, 64, 64, 0.25);
            }
        }
    }
    
    .members-list-container {
        max-height: 400px;
        overflow-y: auto;
        margin-bottom: 1rem;
        
        .member-list-section {
            .member-list-title {
                font-weight: 600;
                color: #333;
                font-size: 0.95rem;
                padding-bottom: 0.5rem;
                border-bottom: 2px solid #e9ecef;
                
                i {
                    color: #ff4040;
                }
            }
            
            .member-list-table {
                margin-top: 0.5rem;
                font-size: 0.875rem;
                
                thead {
                    background-color: #f8f9fa;
                    
                    th {
                        font-weight: 600;
                        color: #495057;
                        padding: 0.5rem;
                        border-bottom: 2px solid #dee2e6;
                        white-space: nowrap;
                        
                        // Style for select all checkbox
                        .form-check-input {
                            cursor: pointer;
                            margin: 0;
                            top: 12px
                        }
                    }
                }
                
                tbody {
                    tr {
                        transition: background-color 0.15s ease;
                        
                        &:hover {
                            background-color: #f8f9fa;
                        }
                        
                        td {
                            padding: 0.5rem;
                            vertical-align: middle;
                            border-bottom: 1px solid #e9ecef;
                            color: #495057;
                            
                            &:first-child {
                                text-align: center;
                                
                                .form-check-input {
                                    cursor: pointer;
                                    margin: 0;
                                }
                            }
                            
                            &:nth-child(2) {
                                font-weight: 500;
                                color: #333;
                            }
                        }
                    }
                }
            }
        }
        
        // Empty state styling
        .text-center {
            .fa-check-circle {
                opacity: 0.7;
            }
        }
    }
}

// Fix for invitation modal backdrop color - override purple theme
.modal-backdrop,
.modal-backdrop.show,
.modal-backdrop.fade {
    background-color: rgba(0, 0, 0, 0.5) !important;
    opacity: 0.5 !important;
}

// Additional fix for Bootstrap Vue modal backdrop
body.modal-open .modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5) !important;
    opacity: 0.5 !important;
}

// Specific fix for invitation modal
.invitation-modal-fix + .modal-backdrop,
#invitationModal + .modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5) !important;
    opacity: 0.5 !important;
}

// Override the specific purple color from lite-purple theme
.modal-backdrop[style*="background-color: #0a021e"],
.modal-backdrop[style*="background-color:#0a021e"] {
    background-color: rgba(0, 0, 0, 0.5) !important;
}

// Modal responsiveness
@media (max-width: 767.98px) {
    .modal-dialog {
        margin: 0.5rem;
        max-width: calc(100% - 1rem);
    }
    
    .modal-content {
        border-radius: 8px;
    }
    
    .modal-header {
        padding: 1rem;
        
        .modal-title {
            font-size: 1.1rem;
        }
    }
    
    .modal-body {
        padding: 1rem;
    }
    
    .modal-footer {
        padding: 1rem;
        flex-direction: column;
        gap: 0.5rem;
        
        .btn {
            width: 100%;
        }
    }
}

// Coach filter radio button styling
.coach-radio {
    margin-right: 0.5rem;
    cursor: pointer;
    
    &:checked {
        accent-color: #ff4040;
    }
}

// Ensure consistent styling with checkboxes
.coach-checkbox,
.coach-radio,
.membership-radio,
.membership-checkbox,
.tag-checkbox,
.profile-checkbox,
.status-checkbox {
    margin-right: 0.5rem;
    cursor: pointer;
    
    &:checked {
        accent-color: #ff4040;
    }
}

// Toggle switch styling for "No coach" option
.toggle-switch {
    width: 40px;
    height: 20px;
    background-color: #ccc;
    border-radius: 20px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &.active {
        background-color: #ff4040;
    }
    
    .toggle-handle {
        width: 16px;
        height: 16px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        top: 2px;
        left: 2px;
        transition: transform 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    &.active .toggle-handle {
        transform: translateX(20px);
    }
}

// Membership radio button styling
.membership-radio,
.tag-radio {
    margin-right: 0.5rem;
    cursor: pointer;
    
    &:checked {
        accent-color: #ff4040;
    }
}

// Custom date picker styling
.custom-date-picker {
    margin-left: 1rem;
    
    .custom-date-input {
        padding: 0.25rem 0.5rem;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        background-color: white;
        cursor: pointer;
        
        &:focus {
            outline: none;
            border-color: #ff4040;
            box-shadow: 0 0 0 0.2rem rgba(255, 64, 64, 0.25);
        }
    }
}
</style>

<style lang="scss">
.members-page-wrapper {
    .main-content {
        .main-content-wrapper {
            .members-table-card {
                .card-body {
                    .table-content-wrapper {
                        position: relative !important;
                        flex: 1 1 0 !important;
                        overflow: hidden !important;
                        min-height: 0 !important;
                        height: 100% !important;
                        display: flex !important;
                        flex-direction: column !important;
                        
                        .table-responsive {
                            flex: 1 1 0 !important;
                            height: 100% !important;
                            min-height: 0 !important;
                            overflow-x: auto !important;
                            overflow-y: auto !important;
                            
                            .members-table {
                                tfoot {
                                    position: relative !important;
                                    bottom: 0 !important;
                                    z-index: 10 !important;
                                    background: linear-gradient(135deg, #dededc 0%, #e3e3e1 50%, #dededc 100%) !important;
                                    
                                    tr {
                                        background: linear-gradient(135deg, #dededc 0%, #e3e3e1 50%, #dededc 100%) !important;
                                    }
                                    
                                    .pagination-cell {
                                        padding: 0 !important;
                                        border-top: 2px solid rgba(0, 0, 0, 0.1) !important;
                                        background: linear-gradient(135deg, #dededc 0%, #e3e3e1 50%, #dededc 100%) !important;
                                        
                                        .pagination-container {
                                            width: 100% !important;
                                            margin: 0 !important;
                                            padding: 2px !important;
                                            background: transparent !important;
                                            
                                            .pagination-text {
                                                color: #252525 !important;
                                            }
                                            
                                            .pagination-btn,
                                            .page-number-btn {
                                                background-color: rgba(255, 255, 255, 0.8) !important;
                                                border-color: rgba(0, 0, 0, 0.15) !important;
                                                color: #252525 !important;
                                                
                                                &:hover:not(:disabled) {
                                                    background-color: rgba(255, 255, 255, 1) !important;
                                                    border-color: rgba(0, 0, 0, 0.25) !important;
                                                }
                                                
                                                &:disabled {
                                                    opacity: 0.5;
                                                }
                                            }
                                            
                                            .page-number-btn.btn-primary {
                                                background-color: #dc3545 !important;
                                                color: white !important;
                                                border-color: #dc3545 !important;
                                            }
                                            
                                            .per-page-label,
                                            .per-page-text {
                                                color: #252525 !important;
                                            }
                                            
                                            .form-select {
                                                background-color: rgba(255, 255, 255, 0.9) !important;
                                                border-color: rgba(0, 0, 0, 0.15) !important;
                                                color: #252525 !important;
                                                
                                                option {
                                                    background-color: white;
                                                    color: #252525;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        
                        .pagination-container {
                            margin: 0 !important;
                            padding: 0.75rem 1rem !important;
                        }
                    }
                }
            }
        }
    }
}
</style>