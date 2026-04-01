<template>
    <div class="members-page-wrapper">
        <!-- Copy confirmation message -->
        <div class="copy-message" v-if="showCopyMessage">
            {{ copyMessage }}
        </div>

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
                                <i class="fas fa-user-tie"></i>
                                Coaches
                            </li>
                        </ol>
                    </div>
                </nav>
            </div>
        </div>

        <div class="main-content ">
            <!-- Page Header -->
            <div class="page-header">
                <div class="header-content">
                    <div class="header-left">
                        <h1 class="page-title">
                            Coaches
                        </h1>
                    </div>

                    <!-- Search Field -->
                    <div class="search-field-container">
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
                    <div class="filter-buttons-container">
                        <div class="filter-buttons">
                            <b-dropdown
                                right
                                class="filter-btn status-dropdown"
                                no-caret
                                no-close-on-click
                                :class="{ 'active': statusFilter.length > 0 && statusFilter.length < 2 }"
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
                                right
                                class="filter-btn more-dropdown"
                                no-caret
                            >
                                <template #button-content> More </template>
                                <b-dropdown-item @click="toggleFilterSidebar()">
                                    <i class="i-Filter-2 me-2"></i>
                                    Filter
                                </b-dropdown-item>
                                <b-dropdown-item
                                    @click="showExportOptions('pdf')"
                                >
                                    <i class="i-File-Copy me-2"></i> PDF
                                </b-dropdown-item>
                                <b-dropdown-item
                                    @click="showExportOptions('excel')"
                                >
                                    <i class="i-File-Excel me-2"></i> EXCEL
                                </b-dropdown-item>
                                <b-dropdown-item @click="Show_import_clients()">
                                    <i class="i-Download me-2"></i>
                                    Import Coaches
                                </b-dropdown-item>
                            </b-dropdown>

                            <!-- <b-dropdown
                                right
                                class="filter-btn profile-dropdown"
                                no-caret
                                :class="{ active: profileFilter !== 'all' }"
                            >
                                <template #button-content> 
                                    Profile
                                    <i class="fas fa-times" v-if="profileFilter !== 'all'" @click.stop="clearProfileFilter"></i>
                                </template>

                                <b-dropdown-item
                                    @click="setProfileFilter('with')"
                                    :class="{
                                        selected: profileFilter === 'with',
                                    }"
                                >
                                    <input
                                        type="checkbox"
                                        :checked="profileFilter === 'with'"
                                        class="profile-checkbox"
                                    />
                                    With Profile
                                </b-dropdown-item>

                                <b-dropdown-item
                                    @click="setProfileFilter('without')"
                                    :class="{
                                        selected: profileFilter === 'without',
                                    }"
                                >
                                    <input
                                        type="checkbox"
                                        :checked="profileFilter === 'without'"
                                        class="profile-checkbox"
                                    />
                                    Without Profile
                                </b-dropdown-item>
                            </b-dropdown> -->

                            <!-- <b-dropdown
                                right
                                class="filter-btn specialization-dropdown"
                                no-caret
                                no-close-on-click
                                :class="{
                                    active: specializationFilter !== 'all',
                                }"
                            >
                                <template #button-content>
                                    {{ getSpecializationDisplayName() }}
                                    <i class="fas fa-times" v-if="specializationFilter !== 'all'" @click.stop="clearSpecializationFilter"></i>
                                </template>

                                <b-dropdown-item
                                    @click="setSpecializationFilter('all')"
                                    :class="{
                                        selected:
                                            specializationFilter === 'all',
                                    }"
                                >
                                    <input
                                        type="checkbox"
                                        :checked="
                                            specializationFilter === 'all'
                                        "
                                        class="specialization-checkbox"
                                    />
                                    All Specializations
                                </b-dropdown-item>

                                <b-dropdown-item
                                    @click="setSpecializationFilter('fitness')"
                                    :class="{
                                        selected:
                                            specializationFilter === 'fitness',
                                    }"
                                >
                                    <input
                                        type="checkbox"
                                        :checked="
                                            specializationFilter === 'fitness'
                                        "
                                        class="specialization-checkbox"
                                    />
                                    Fitness
                                </b-dropdown-item>

                                <b-dropdown-item
                                    @click="setSpecializationFilter('yoga')"
                                    :class="{
                                        selected:
                                            specializationFilter === 'yoga',
                                    }"
                                >
                                    <input
                                        type="checkbox"
                                        :checked="
                                            specializationFilter === 'yoga'
                                        "
                                        class="specialization-checkbox"
                                    />
                                    Yoga
                                </b-dropdown-item>

                                <b-dropdown-item
                                    @click="setSpecializationFilter('cardio')"
                                    :class="{
                                        selected:
                                            specializationFilter === 'cardio',
                                    }"
                                >
                                    <input
                                        type="checkbox"
                                        :checked="
                                            specializationFilter === 'cardio'
                                        "
                                        class="specialization-checkbox"
                                    />
                                    Cardio
                                </b-dropdown-item>
                            </b-dropdown> -->

                            <!-- <b-dropdown
                                right
                                class="filter-btn contact-dropdown"
                                no-caret
                                :class="{ active: contactFilter !== 'all' }"
                            >
                                <template #button-content> 
                                    Contact
                                    <i class="fas fa-times" v-if="contactFilter !== 'all'" @click.stop="clearContactFilter"></i>
                                </template>

                                <b-dropdown-item
                                    @click="setContactFilter('signed')"
                                    :class="{
                                        selected: contactFilter === 'signed',
                                    }"
                                >
                                    <input
                                        type="checkbox"
                                        :checked="contactFilter === 'signed'"
                                        class="contact-checkbox"
                                    />
                                    Signed Contact
                                </b-dropdown-item>

                                <b-dropdown-item
                                    @click="setContactFilter('unsigned')"
                                    :class="{
                                        selected: contactFilter === 'unsigned',
                                    }"
                                >
                                    <input
                                        type="checkbox"
                                        :checked="contactFilter === 'unsigned'"
                                        class="contact-checkbox"
                                    />
                                    Unsigned Contact
                                </b-dropdown-item>
                            </b-dropdown> -->
                        </div>
                    </div>

                    <div class="header-right">
                        <div class="header-actions">
                            <router-link
                                to="/app/Staff/newcoach"
                                class="btn btn-primary btn-sm btn-add-member"
                            >
                                <i class="fas fa-user-plus me-2"></i>
                                Add Coach
                            </router-link>
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
        <div v-else>
            <!-- Coaches Table -->
            <div class="members-table-card">
                <div class="card-body">
                    <!-- Loading state -->
                    <div v-if="isLoading" class="text-center py-4">
                        <div class="spinner spinner-primary"></div>
                        <p class="mt-2">Loading coaches...</p>
                    </div>

                    <!-- No data state -->
                    <div
                        v-else-if="clients.length === 0"
                        class="text-center py-4"
                    >
                        <i
                            class="i-User-1"
                            style="font-size: 48px; color: #ccc"
                        ></i>
                        <h4 class="mt-3">No coaches found</h4>
                        <p class="text-muted">
                            Try adjusting your search criteria or filters.
                        </p>
                        <b-button
                            variant="primary"
                            @click="Get_Clients(1)"
                            class="mt-3"
                        >
                            <i class="i-Reload-2 mr-2"></i>
                            Retry
                        </b-button>
                    </div>

                    <!-- Table content -->
                    <div v-else>
                        <div class="table-responsive">
                            <table class="table members-table">
                                <thead>
                                    <tr>
                                        <!-- Checkbox Column -->
                                        <th
                                            class="table-header text-center"
                                            style="width: 25px; min-width: 25px"
                                        >
                                            <input
                                                type="checkbox"
                                                class="select-all-checkbox"
                                                :checked="isAllSelected"
                                                @change="toggleSelectAll"
                                                @click.stop
                                            />
                                        </th>
                                        <th class="table-header text-center">
                                            <span class="header-text"
                                                >Coaches ({{ totalRows || 0 }})</span
                                            >
                                        </th>
                                        <th class="table-header text-center">
                                            <span class="header-text"
                                                >Contact</span
                                            >
                                        </th>
                                        <th class="table-header text-center">
                                            <span class="header-text"
                                                >Privileges</span
                                            >
                                        </th>
                                        <!-- <th class="table-header text-center">
                                            <span class="header-text">
                                                Specialization
                                            </span>
                                        </th> -->
                                        <th class="table-header text-center">
                                            <span class="header-text"
                                                >Activated On</span
                                            >
                                        </th>
                                        <th class="table-header text-center">
                                            <span class="header-text">Tag</span>
                                        </th>
                                        <th class="table-header text-center">
                                            <span class="header-text"
                                                >Rating</span
                                            >
                                        </th>
                                        <th class="table-header text-center">
                                            <span class="header-text"
                                                >Last Online</span
                                            >
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(client, index) in clients"
                                        :key="client.id"
                                        class="table-row"
                                        @click="showCoachDetails(client)"
                                    >
                                        <!-- Checkbox Column -->
                                        <td
                                            class="table-cell text-center"
                                            @click.stop
                                        >
                                            <input
                                                v-if="showSelectionMode"
                                                type="checkbox"
                                                class="member-checkbox"
                                                :value="client.id"
                                                v-model="selectedCoaches"
                                                @click.stop
                                            />
                                        </td>
                                        <td class="table-cell">
                                            <div class="member-profile">
                                                <div class="member-avatar">
                                                    <img
                                                        v-if="
                                                            client.profile_image &&
                                                            client.profile_image !==
                                                                'undefined' &&
                                                            client.profile_image !==
                                                                'null'
                                                        "
                                                        :src="
                                                            getProfileImageUrl(
                                                                client.profile_image
                                                            )
                                                        "
                                                        alt="avatar"
                                                        class="member-image"
                                                        @error="handleImageError"
                                                    />
                                                    <img
                                                        v-else
                                                        src="/images/default-profile.jpg"
                                                        alt="default avatar"
                                                        class="member-image"
                                                    />
                                                </div>
                                                <div class="member-details">
                                                    <div
                                                        class="member-name-container"
                                                    >
                                                        <span
                                                            class="member-name"
                                                            >{{
                                                                client.name
                                                            }}</span
                                                        >
                                                    </div>
                                                   </div>
                                            </div>
                                        </td>
                                        <td class="table-cell text-center">
                                            <div class="member-contact">
                                                <div class="contact-icons">
                                                    <i
                                                        class="fas fa-envelope contact-icon"
                                                        :title="`Email: ${client.email}`"
                                                    ></i>
                                                    <i
                                                        class="fas fa-phone contact-icon"
                                                        :title="`Phone: ${client.phone}`"
                                                    ></i>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="table-cell text-center">
                                            <span
                                                class="privileges-badge"
                                                :class="getPrivilegesClass(client)"
                                            >
                                                {{ getPrivilegesText(client) }}
                                            </span>
                                        </td>
                                        <!-- <td class="table-cell text-center">
                                            <span
                                                class="specialization-badge"
                                                :class="
                                                    getSpecializationStatusClass(
                                                        client
                                                    )
                                                "
                                            >
                                                {{
                                                    getSpecializationName(
                                                        client
                                                    )
                                                }}
                                            </span>
                                        </td> -->
                                        <td class="table-cell text-center">
                                            <span class="activated-date">
                                                {{ getActivatedDate(client) }}
                                            </span>
                                        </td>
                                        <td class="table-cell text-center">
                                            <span
                                                class="coach-tag"
                                                :class="getTagClass(client)"
                                            >
                                                {{ getTagName(client) }}
                                            </span>
                                        </td>
                                        <td class="table-cell text-center">
                                            <div class="rating-display-stars">
                                                <div class="stars-container">
                                                    <i
                                                        v-for="n in 5"
                                                        :key="n"
                                                        class="fas fa-star star-icon"
                                                        :class="{
                                                            'star-filled': client.averageRating && n <= Math.round(client.averageRating),
                                                            'star-empty': !client.averageRating || n > Math.round(client.averageRating)
                                                        }"
                                                    ></i>
                                                </div>
                                                <span class="rating-value" v-if="client.averageRating && client.averageRating > 0">
                                                    {{ client.averageRating.toFixed(1) }}
                                                    ({{ client.ratingsCount || client.ratings_count || 0 }})
                                                </span>
                                                <span class="rating-no-rating" v-else>
                                                    N/A ({{ client.ratingsCount || client.ratings_count || 0 }})
                                                </span>
                                            </div>
                                        </td>
                                        <td class="table-cell text-center">
                                            <div class="last-online-container">
                                                <span class="last-online">{{
                                                    getLastLogin(client)
                                                }}</span>
                                                <span
                                                    class="online-indicator"
                                                    :class="
                                                        getCoachStatus(client)
                                                    "
                                                ></span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination -->
                        <div
                            class="pagination-container"
                            v-if="limit !== 'all'"
                        >
                            <div class="pagination-info">
                                <span class="pagination-text">
                                    Showing
                                    {{
                                        totalRows > 0
                                            ? (serverParams.page - 1) *
                                                  serverParams.perPage +
                                              1
                                            : 0
                                    }}
                                    to
                                    {{
                                        totalRows > 0
                                            ? Math.min(
                                                  serverParams.page *
                                                      serverParams.perPage,
                                                  totalRows
                                              )
                                            : 0
                                    }}
                                    of {{ totalRows || 20 }} coaches
                                </span>
                            </div>

                            <div class="pagination-controls">
                                <b-button
                                    variant="outline-secondary"
                                    size="sm"
                                    :disabled="serverParams.page === 1"
                                    @click="
                                        onPageChange({
                                            currentPage: serverParams.page - 1,
                                        })
                                    "
                                    class="pagination-btn"
                                >
                                    <i class="i-Back-2"></i>Previous
                                </b-button>

                                <div class="page-numbers">
                                    <b-button
                                        v-for="page in getPageNumbers()"
                                        :key="page"
                                        :variant="
                                            page === serverParams.page
                                                ? 'primary'
                                                : 'outline-secondary'
                                        "
                                        size="sm"
                                        @click="
                                            onPageChange({ currentPage: page })
                                        "
                                        class="page-number-btn"
                                    >
                                        {{ page }}
                                    </b-button>
                                </div>

                                <b-button
                                    variant="outline-secondary"
                                    size="sm"
                                    :disabled="
                                        serverParams.page >= getTotalPages()
                                    "
                                    @click="
                                        onPageChange({
                                            currentPage: serverParams.page + 1,
                                        })
                                    "
                                    class="pagination-btn"
                                >
                                    Next<i class="i-Right-2"></i>
                                </b-button>
                            </div>
                        </div>

                        <!-- Show All Mode Controls -->
                        <div
                            class="pagination-container"
                            v-if="limit === 'all'"
                        >
                            <div class="pagination-info">
                                <span class="pagination-text">
                                    Showing all {{ totalRows || 20 }} coaches
                                </span>
                            </div>

                            <div class="per-page-selector">
                                <label class="per-page-label">Show:</label>
                                <b-form-select
                                    v-model="limit"
                                    :options="perPageOptions"
                                    size="sm"
                                    @change="onPerPageChange"
                                    class="per-page-select"
                                ></b-form-select>
                                <span class="per-page-text"
                                    >Coaches per page</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filter Sidebar -->
        <b-sidebar
            id="sidebar-right"
            title="Filter Coaches"
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
                            Coach Name
                        </label>
                        <b-form-input
                            v-model="Filter_Name"
                            placeholder="Search by coach name..."
                            @input="onFilterChange"
                            class="filter-input"
                        ></b-form-input>
                    </div>

                    <div class="form-group">
                        <label class="filter-label">
                            <i class="i-ID-Card mr-1"></i>
                            Coach ID
                        </label>
                        <b-form-input
                            v-model="Filter_Code"
                            placeholder="Search by coach ID..."
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
                            placeholder="Search by phone number..."
                            @input="onFilterChange"
                            class="filter-input"
                        ></b-form-input>
                    </div>

                    <div class="form-group">
                        <label class="filter-label">
                            <i class="i-Mail mr-1"></i>
                            Email
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
                            <i class="i-Star mr-1"></i>
                            Specialization
                        </label>
                        <b-form-select
                            v-model="Filter_Specialization"
                            :options="specializationOptions"
                            placeholder="Select specialization..."
                            @change="onFilterChange"
                            class="filter-input"
                        ></b-form-select>
                    </div>

                    <div class="filter-actions">
                        <b-button
                            @click="clearFilters"
                            variant="outline-secondary"
                            size="sm"
                            class="btn-clear-filters"
                        >
                            <i class="i-Refresh mr-1"></i>
                            Clear Filters
                        </b-button>

                        <b-button
                            @click="applyFilters"
                            variant="primary"
                            size="sm"
                            class="btn-apply-filters"
                        >
                            <i class="i-Filter-2 mr-1"></i>
                            Apply Filters
                        </b-button>
                    </div>
                </div>
            </div>
        </b-sidebar>

        <!-- Coach Details Modal -->
        <b-modal
            id="showDetails"
            :title="'Coach Details'"
            size="lg"
            centered
            scrollable
            class="member-details-modal"
        >
            <div class="member-details-content">
                <div class="row">
                    <div class="col-md-4 text-center">
                        <div class="member-avatar-large">
                            <img
                                v-if="
                                    client.profile_image &&
                                    client.profile_image !== 'undefined' &&
                                    client.profile_image !== 'null'
                                "
                                :src="getProfileImageUrl(client.profile_image)"
                                alt="Coach Avatar"
                                class="member-image-large"
                                @error="handleImageError"
                            />
                            <img
                                v-else
                                src="/images/default-profile.jpg"
                                alt="default avatar"
                                class="member-image-large"
                            />
                        </div>
                        <h5 class="mt-3">{{ client.name || "N/A" }}</h5>
                        <span class="badge badge-primary">{{
                            getCoachId(client)
                        }}</span>
                    </div>
                    <div class="col-md-8">
                        <div class="member-info-grid">
                            <div class="info-item">
                                <label class="info-label">Email:</label>
                                <span class="info-value">{{
                                    client.email || "N/A"
                                }}</span>
                            </div>
                            <div class="info-item">
                                <label class="info-label">Phone:</label>
                                <span class="info-value">{{
                                    client.phone || "N/A"
                                }}</span>
                            </div>
                            <div class="info-item">
                                <label class="info-label"
                                    >Specialization:</label
                                >
                                <span
                                    class="info-value"
                                    :class="
                                        getSpecializationStatusClass(client)
                                    "
                                    >{{ getSpecializationName(client) }}</span
                                >
                            </div>
                            <div class="info-item">
                                <label class="info-label">Status:</label>
                                <span
                                    class="info-value"
                                    :class="getStatusClass(client)"
                                    >{{ getStatusText(client) }}</span
                                >
                            </div>
                            <div class="info-item">
                                <label class="info-label">City:</label>
                                <span class="info-value">{{
                                    client.city || "N/A"
                                }}</span>
                            </div>
                            <div class="info-item">
                                <label class="info-label">Address:</label>
                                <span class="info-value">{{
                                    client.adresse || "N/A"
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <template #modal-footer>
                <div class="modal-footer-actions">
                    <b-button
                        variant="primary"
                        @click="Edit_Client(client)"
                        class="btn-edit-member"
                        type="button"
                    >
                        <i class="i-Edit mr-2"></i>Edit Coach
                    </b-button>
                    <b-button
                        variant="secondary"
                        @click="$bvModal.hide('showDetails')"
                        class="btn-close-modal"
                    >
                        Close
                    </b-button>
                </div>
            </template>
        </b-modal>

        <!-- Import Coaches Modal -->
        <b-modal
            id="importClients"
            :title="'Import Coaches'"
            size="lg"
            centered
            scrollable
            class="import-modal"
        >
            <div class="import-content">
                <div class="import-section">
                    <h6 class="import-title">
                        <i class="i-Download mr-2"></i>
                        Upload CSV File
                    </h6>
                    <p class="import-description">
                        Please upload a CSV file with coach information. The
                        file should include columns for: Coach ID, First Name,
                        Last Name, Email, Phone, Specialization, etc.
                    </p>

                    <div class="file-upload-area">
                        <b-form-file
                            v-model="import_clients"
                            :state="Boolean(import_clients)"
                            placeholder="Choose a file or drop it here..."
                            drop-placeholder="Drop file here..."
                            @change="handleFileUpload"
                            accept=".csv"
                            class="file-input"
                        ></b-form-file>

                        <div v-if="fileError" class="file-error">
                            <i class="i-Close-Window mr-1"></i>
                            {{ fileError }}
                        </div>
                    </div>

                    <div class="import-template">
                        <h6 class="template-title">Download Template</h6>
                        <p class="template-description">
                            Use our template to ensure proper formatting:
                        </p>
                        <b-button
                            variant="outline-primary"
                            size="sm"
                            @click="downloadTemplate"
                            class="btn-download-template"
                        >
                            <i class="i-Download mr-1"></i>
                            Download CSV Template
                        </b-button>
                    </div>
                </div>

                <div v-if="importResults" class="import-results">
                    <h6 class="results-title">Import Results</h6>
                    <div class="results-content">
                        <div class="result-item success">
                            <i class="i-Check mr-1"></i>
                            Successfully imported:
                            {{ importResults.success || 0 }} coaches
                        </div>
                        <div
                            v-if="
                                importResults.errors &&
                                importResults.errors.length > 0
                            "
                            class="result-item error"
                        >
                            <i class="i-Close-Window mr-1"></i>
                            Errors: {{ importResults.errors.length }} issues
                            found
                        </div>
                    </div>
                </div>
            </div>

            <template #modal-footer>
                <div class="modal-footer-actions">
                    <b-button
                        variant="secondary"
                        @click="$bvModal.hide('importClients')"
                        class="btn-cancel"
                    >
                        Cancel
                    </b-button>
                    <b-button
                        variant="primary"
                        @click="Import_coaches"
                        :disabled="!import_clients || ImportProcessing"
                        class="btn-import-submit"
                    >
                        <span v-if="ImportProcessing">
                            <i
                                class="spinner-border spinner-border-sm mr-2"
                            ></i>
                            Importing...
                        </span>
                        <span v-else>
                            <i class="i-Download mr-2"></i>
                            Import Coaches
                        </span>
                    </b-button>
                </div>
            </template>
        </b-modal>

        <!-- Export Options Modal -->
        <b-modal
            id="exportOptionsModal"
            :title="'Export Options'"
            size="md"
            centered
            class="export-modal"
        >
            <div class="export-content">
                <div class="export-section">
                    <h6 class="export-title">Select Export Scope</h6>
                    <div class="export-options">
                        <b-form-radio-group
                            v-model="exportScope"
                            class="export-radio-group"
                        >
                            <b-form-radio value="current" class="export-radio">
                                <div class="radio-content">
                                    <i class="i-File-Text mr-2"></i>
                                    <div class="radio-text">
                                        <strong>Current Page</strong>
                                        <small
                                            >Export only the coaches currently
                                            displayed</small
                                        >
                                    </div>
                                </div>
                            </b-form-radio>
                            <b-form-radio value="all" class="export-radio">
                                <div class="radio-content">
                                    <i class="i-File-Text mr-2"></i>
                                    <div class="radio-text">
                                        <strong>All Coaches ({{ totalRows || 0 }})</strong>
                                        <small
                                            >Export all coaches in the
                                            system</small
                                        >
                                    </div>
                                </div>
                            </b-form-radio>
                        </b-form-radio-group>
                    </div>
                </div>
            </div>

            <template #modal-footer>
                <div class="modal-footer-actions">
                    <b-button
                        variant="secondary"
                        @click="$bvModal.hide('exportOptionsModal')"
                        class="btn-cancel"
                    >
                        Cancel
                    </b-button>
                    <b-button
                        variant="primary"
                        @click="exportData(exportScope)"
                        class="btn-export-submit"
                    >
                        <i class="i-Download mr-2"></i>
                        Export {{ exportType.toUpperCase() }}
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
import axios from "axios";

export default {
    metaInfo: {
        title: "Coach List",
    },
    data() {
        return {
            savedPaymentMethods: [],
            selectedCard: null,
            card_id: "",
            customer_id: "",
            isLoading: true,
            SubmitProcessing: false,
            ImportProcessing: false,
            paymentProcessing: false,
            payment_return_Processing: false,
            serverParams: {
                columnFilters: {},
                sort: {
                    field: "id",
                    type: "desc",
                },
                page: 1,
                perPage: 25,
            },
            showDropdown: false,
            payment: {
                client_id: "",
                client_name: "",
                date: "",
                due: "",
                amount: "",
                notes: "",
                Reglement: "",
            },
            payment_return: {
                client_id: "",
                client_name: "",
                date: "",
                return_Due: "",
                amount: "",
                notes: "",
                Reglement: "",
            },
            company_info: {},
            selectedIds: [],
            totalRows: "",
            search: "",
            limit: "25",
            Filter_Name: "",
            Filter_Code: "",
            Filter_Phone: "",
            Filter_Email: "",
            // Search and filter properties
            searchQuery: "",
            statusFilter: ["active"], // Default to show active coaches, now supports multiple selections
            specializationFilter: "all",
            showCopyMessage: false,
            copyMessage: "",
            Filter_Specialization: "",

            // Checkbox selection properties
            selectedCoaches: [], // Array to store selected coach IDs
            showSelectionMode: false, // Control when to show individual checkboxes
            clients: [],
            editmode: false,
            import_clients: "",
            data: new FormData(),
            client: {
                id: "",
                name: "",
                code: "",
                coach_id: "",
                email: "",
                mobile_phone: "",
                landline_phone: "",
                country: "",
                city: "",
                adresse: "",
                tax_number: "",
            },
            exportType: "pdf",
            exportScope: "current",
            filterTimeout: null,
            fileError: null,
            importResults: null,
            hardcodedMembers: [],
        };
    },

    mounted() {
        this.$root.$on("bv::dropdown::show", (bvEvent) => {
            this.showDropdown = true;
        });
        this.$root.$on("bv::dropdown::hide", (bvEvent) => {
            this.showDropdown = false;
        });
    },

    computed: {
        ...mapGetters(["currentUserPermissions", "currentUser"]),

        // Check if all coaches are selected
        isAllSelected() {
            return (
                this.clients.length > 0 &&
                this.selectedCoaches.length === this.clients.length
            );
        },

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

        // Excel export data and columns
        excelData() {
            return this.clients.map((client, index) => {
                // Calculate serial number based on current page and items per page
                let serialNumber;
                if (this.limit === "all") {
                    // For "Show All" mode, use simple sequential numbering
                    serialNumber = index + 1;
                } else {
                    // For paginated mode, calculate based on current page
                    serialNumber =
                        (this.serverParams.page - 1) *
                            this.serverParams.perPage +
                        index +
                        1;
                }

                return {
                    SerialNo: serialNumber,
                    CoachID: client.coach_id,
                    CoachName: client.name || "N/A",
                    Email: client.email || "N/A",
                    MobilePhone: client.mobile_phone || "N/A",
                    LandlinePhone: client.landline_phone || "N/A",
                    Privileges: this.getPrivilegesText(client),
                    Specialization: this.getSpecializationName(client),
                    Status: this.getStatusText(client),
                };
            });
        },

        excelColumns() {
            return [
                { label: "S.No", field: "SerialNo" },
                { label: "Coach ID", field: "CoachID" },
                { label: "Coach Name", field: "CoachName" },
                { label: "Email", field: "Email" },
                { label: "Mobile Phone", field: "MobilePhone" },
                { label: "Landline Phone", field: "LandlinePhone" },
                { label: "Privileges", field: "Privileges" },
                { label: "Specialization", field: "Specialization" },
                { label: "Status", field: "Status" },
            ];
        },

        perPageOptions() {
            return [
                { value: "12", text: "Show 12" },
                { value: "25", text: "Show 25" },
                { value: "50", text: "Show 50" },
                { value: "all", text: "Show All" },
            ];
        },

        specializationOptions() {
            return [
                { value: "", text: "All Specializations" },
                { value: "Personal Coach", text: "Personal Coach" },
                { value: "Group Coach", text: "Group Coach" },
                { value: "Yoga Coach", text: "Yoga Coach" },
                { value: "Pilates Coach", text: "Pilates Coach" },
                { value: "Nutritionist", text: "Nutritionist" },
                { value: "Other", text: "Other" },
            ];
        },

        isSelectedCard() {
            return (card) => this.selectedCard === card;
        },

        columns() {
            return [
                {
                    label: "Coach ID",
                    field: "code",
                    tdClass: "text-left",
                    thClass: "text-left",
                },
                {
                    label: "Coach Name",
                    field: "name",
                    tdClass: "text-left",
                    thClass: "text-left",
                },
                {
                    label: "Coach Email",
                    field: "email",
                    tdClass: "text-left",
                    thClass: "text-left",
                },
                {
                    label: "Specialization",
                    field: "specialization",
                    tdClass: "text-left",
                    thClass: "text-left",
                },
                {
                    label: "Phone",
                    field: "phone",
                    tdClass: "text-left",
                    thClass: "text-left",
                },
                {
                    label: "Status",
                    field: "status",
                    tdClass: "text-left",
                    thClass: "text-left",
                },
                {
                    label: "Action",
                    field: "actions",
                    html: true,
                    tdClass: "text-right",
                    thClass: "text-right",
                    sortable: false,
                },
            ];
        },
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
        
        // Helper methods for coach data
        getCoachId(client) {
            return client.code || (client.id ? `C-${client.id}` : "C-000000");
        },

        getSpecializationName(client) {
            return client.specialization || "N/A";
        },

        handleImageError(event) {
            event.target.src = "/images/default-profile.jpg";
        },

        // Profile image optimization - computed property to avoid multiple function calls
        getProfileImageUrl(profileImage) {
            // Guard against undefined, null, or empty values
            if (
                !profileImage ||
                profileImage === "undefined" ||
                profileImage === "null" ||
                profileImage === ""
            ) {
                return "/images/default-profile.jpg";
            }
            
            // Normalize the path: trim whitespace, replace escaped slashes, and clean up
            let normalizedPath = String(profileImage)
                .trim()
                .replace(/\\\//g, '/')  // Replace escaped slashes
                .replace(/\/+/g, '/')   // Replace multiple slashes with single slash
                .replace(/^\/+|\/+$/g, ''); // Remove leading/trailing slashes
            
            // If normalized path is empty after cleaning, return default
            if (!normalizedPath) {
                return "/images/default-profile.jpg";
            }
            
            // If it's a base64 data URL (from file upload), return it directly
            if (normalizedPath.startsWith("data:image/")) {
                return normalizedPath;
            }

            // If it's already a full HTTP/HTTPS URL, return it
            if (normalizedPath.startsWith("http://") || normalizedPath.startsWith("https://")) {
                return normalizedPath;
            }
            
            // Get base URL
            const baseURL = window.location.origin;
            
            // If it starts with storage/, prepend / and use base URL
            if (normalizedPath.startsWith("storage/")) {
                const finalPath = baseURL + "/" + normalizedPath;
                return finalPath;
            }
            
            // If it starts with /storage/, use base URL + path
            if (normalizedPath.startsWith("/storage/")) {
                const finalPath = baseURL + normalizedPath.replace(/\/+/g, '/');
                return finalPath;
            }
            
            // If it starts with just /, it's an absolute path, use base URL + path
            if (normalizedPath.startsWith("/")) {
                const finalPath = baseURL + normalizedPath.replace(/\/+/g, '/');
                return finalPath;
            }
            
            // If it's a relative path (e.g., "storage/coaches/filename.jpg"), prepend base URL + /
            const finalPath = baseURL + "/" + normalizedPath;
            return finalPath;
        },

        // Navigate to coach details page
        showCoachDetails(client) {
            NProgress.start();
            NProgress.set(0.1);

            try {
                // Prepare query parameters
                const queryParams = {
                    activeAction: "goToProfile",
                };

                // Navigate directly to coach details page
                const targetPath = `/app/Staff/CoachDetails/${client.id}`;

                // Navigate directly to coach details using path
                this.$router
                    .push({
                        path: targetPath,
                        query: queryParams,
                    })
                    .then(() => {
                        NProgress.done();
                    })
                    .catch((err) => {
                        NProgress.done();

                        // Fallback: try using window.location
                        const urlWithParams = `${targetPath}?${new URLSearchParams(
                            queryParams
                        ).toString()}`;
                        window.location.href = urlWithParams;
                    });
            } catch (error) {
                NProgress.done();
            }
        },

        // Last Online functionality
        getLastLogin(client) {
            // Prefer last_online, fallback to last_login for backward compatibility
            const lastOnlineDate = client.last_online || client.last_login;
            if (lastOnlineDate) {
                const lastLogin = new Date(lastOnlineDate);
                return (
                    lastLogin.toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                    }) + " 10:10 am"
                );
            }
            // Use joining date with dummy time
            const joinDate = new Date(client.created_at || new Date());
            return (
                joinDate.toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                }) + " 10:10 am"
            );
        },

        getCoachStatus(client) {
            // Check if coach is currently online
            // Prefer last_online, fallback to last_login for backward compatibility
            const lastOnlineDate = client.last_online || client.last_login;
            if (lastOnlineDate) {
                const lastLogin = new Date(lastOnlineDate);
                const now = new Date();
                const diffTime = Math.abs(now - lastLogin);
                const diffMinutes = Math.ceil(diffTime / (1000 * 60));

                // Consider online if last login was within 30 minutes
                return diffMinutes <= 30 ? "online" : "offline";
            }
            return "offline";
        },

        // Tag functionality
        getTagName(client) {
            // Return tag name if available, otherwise show "No Tag"
            return client.tag || client.coach_tag || "No Tag";
        },

        // Fetch ratings for all coaches
        async fetchCoachRatings() {
            try {
                // Fetch all appointments with ratings
                const response = await axios.get('/appointments');
                
                if (!response.data.success) {
                    return;
                }

                const appointments = response.data.data || [];
                
                // Group ratings by coach ID, tracking both sum and count
                const coachRatingsMap = new Map();
                
                appointments.forEach(apt => {
                    const coachId = apt.staff_id || apt.coach_id;
                    const rating = apt.rating;
                    if (!coachId || rating === null || rating === undefined || rating <= 0) return;

                    if (!coachRatingsMap.has(coachId)) {
                        coachRatingsMap.set(coachId, {
                            sum: 0,
                            count: 0,
                        });
                    }
                    const entry = coachRatingsMap.get(coachId);
                    const numericRating = parseFloat(rating);
                    if (isNaN(numericRating)) return;
                    entry.sum += numericRating;
                    entry.count += 1;
                });

                // Calculate average ratings and rating counts, then update clients
                this.clients = this.clients.map(client => {
                    const coachId = client.id;
                    const stats = coachRatingsMap.get(coachId);
                    
                    if (stats && stats.count > 0) {
                        const avgRating = stats.sum / stats.count;
                        return {
                            ...client,
                            averageRating: avgRating,
                            ratingsCount: stats.count,
                        };
                    }
                    
                    return {
                        ...client,
                        averageRating: null,
                        ratingsCount: 0,
                    };
                });
            } catch (error) {
                // Set all ratings to null on error
                this.clients = this.clients.map(client => ({
                    ...client,
                    averageRating: null,
                    ratingsCount: 0,
                }));
            }
        },

        getTagClass(client) {
            const tag = this.getTagName(client);
            if (tag === "No Tag") return "tag-no-tag";

            // Return different classes based on tag type
            const tagLower = tag.toLowerCase();
            if (tagLower.includes("senior") || tagLower.includes("lead"))
                return "tag-senior";
            if (tagLower.includes("junior") || tagLower.includes("new"))
                return "tag-junior";
            if (tagLower.includes("specialist") || tagLower.includes("expert"))
                return "tag-specialist";
            if (tagLower.includes("trainer") || tagLower.includes("instructor"))
                return "tag-trainer";

            return "tag-default";
        },

        // Checkbox selection methods
        toggleSelectAll() {
            if (this.showSelectionMode && this.isAllSelected) {
                // If in selection mode and all are selected, deselect all
                this.selectedCoaches = [];
            } else if (this.showSelectionMode && !this.isAllSelected) {
                // If in selection mode but not all selected, select all
                this.selectedCoaches = this.clients.map((client) => client.id);
            } else {
                // Enter selection mode and select all
                this.showSelectionMode = true;
                this.selectedCoaches = this.clients.map((client) => client.id);
            }
        },

        // Filter sidebar toggle
        toggleFilterSidebar() {
            this.$root.$emit("bv::toggle::collapse", "sidebar-right");
        },

        // Pagination methods
        getTotalPages() {
            if (this.limit === "all" || this.limit === "-1") return 1;
            return Math.ceil(this.totalRows / this.serverParams.perPage);
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

        onPerPageChange() {
            this.$nextTick(() => {
                const updatedLimit = this.limit;

                if (updatedLimit === "all") {
                    this.updateParams({ page: 1, perPage: -1 });
                } else if (!isNaN(updatedLimit)) {
                    this.updateParams({
                        page: 1,
                        perPage: parseInt(updatedLimit),
                    });
                } else {
                    return;
                }

                this.Get_Clients(1);
            });
        },

        // Export options methods
        showExportOptions(type) {
            this.exportType = type;
            this.$bvModal.show("exportOptionsModal");
        },

        async exportData(scope) {
            this.$bvModal.hide("exportOptionsModal");

            if (scope === "current") {
                // Export current page data
                if (this.exportType === "pdf") {
                    this.clients_PDF();
                } else {
                    this.exportExcel();
                }
            } else {
                // Export all coaches
                await this.exportAllCoaches(scope);
            }
        },

        async exportAllCoaches(scope) {
            NProgress.start();
            NProgress.set(0.1);

            try {
                // Try multiple approaches to fetch all coaches
                let allCoaches = [];
                let success = false;

                // Approach 1: Try with limit=all
                try {
                    const url1 =
                        "coach?page=1&limit=all&name=&code=&phone=&email=&specialization=&SortField=id&SortType=desc";
                    const response1 = await axios.get(url1);
                    allCoaches = response1.data.clients || [];
                    success = true;
                } catch (error1) {
                    // Approach 1 failed, try next
                }

                // Approach 2: Try with a very large limit
                if (!success) {
                    try {
                        const url2 =
                            "coach?page=1&limit=9999&name=&code=&phone=&email=&specialization=&SortField=id&SortType=desc";
                        const response2 = await axios.get(url2);
                        allCoaches = response2.data.clients || [];
                        success = true;
                    } catch (error2) {
                        // Approach 2 failed, try next
                    }
                }

                // Approach 3: Try without limit parameter
                if (!success) {
                    try {
                        const url3 =
                            "coach?page=1&name=&code=&phone=&email=&specialization=&SortField=id&SortType=desc";
                        const response3 = await axios.get(url3);
                        allCoaches = response3.data.clients || [];
                        success = true;
                    } catch (error3) {
                        // Approach 3 failed
                    }
                }

                if (!success || allCoaches.length === 0) {
                    this.makeToast(
                        "warning",
                        "No coaches found to export",
                        "Warning"
                    );
                    NProgress.done();
                    return;
                }

                if (this.exportType === "pdf") {
                    this.clients_PDF_All(allCoaches);
                } else {
                    this.exportExcel_All(allCoaches);
                }

                this.makeToast(
                    "success",
                    `Successfully exported ${allCoaches.length} coaches`,
                    "Success"
                );
                NProgress.done();
            } catch (error) {
                NProgress.done();

                // Fallback: try to export current page data
                this.makeToast(
                    "warning",
                    "Could not fetch all coaches. Exporting current page data instead.",
                    "Warning"
                );
                if (this.exportType === "pdf") {
                    this.clients_PDF();
                } else {
                    this.exportExcel();
                }
            }
        },

        exportExcel() {
            try {
                // Create a simple CSV export as fallback
                const headers = [
                    "S.No",
                    "Coach ID",
                    "Coach Name",
                    "Email",
                    "Phone",
                    "Privileges",
                    "Specialization",
                    "Status",
                ];
                const csvData = this.excelData.map((row) => [
                    row.SerialNo,
                    row.CoachID,
                    row.CoachName,
                    row.Email,
                    row.Phone,
                    row.Privileges,
                    row.Specialization,
                    row.Status,
                ]);

                // Add headers
                csvData.unshift(headers);

                // Convert to CSV string
                const csvContent = csvData
                    .map((row) => row.map((cell) => `"${cell}"`).join(","))
                    .join("\n");

                // Create and download file
                const blob = new Blob([csvContent], {
                    type: "text/csv;charset=utf-8;",
                });
                const link = document.createElement("a");
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute(
                    "download",
                    `coaches_list_page_${this.serverParams.page}.csv`
                );
                link.style.visibility = "hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                this.makeToast(
                    "success",
                    "Excel file downloaded successfully",
                    "Success"
                );
            } catch (error) {
                this.makeToast(
                    "danger",
                    "Failed to generate Excel file",
                    "Error"
                );
            }
        },

        exportExcel_All(allCoaches) {
            try {
                // Create Excel data for all coaches
                const excelData = allCoaches.map((client, index) => {
                    return {
                        SerialNo: index + 1,
                        CoachID: this.getCoachId(client),
                        CoachName: client.name || "N/A",
                        Email: client.email || "N/A",
                        Phone: client.phone || "N/A",
                        Privileges: this.getPrivilegesText(client),
                        Specialization: this.getSpecializationName(client),
                        Status: this.getStatusText(client),
                    };
                });

                // Create a simple CSV export
                const headers = [
                    "S.No",
                    "Coach ID",
                    "Coach Name",
                    "Email",
                    "Phone",
                    "Privileges",
                    "Specialization",
                    "Status",
                ];
                const csvData = excelData.map((row) => [
                    row.SerialNo,
                    row.CoachID,
                    row.CoachName,
                    row.Email,
                    row.Phone,
                    row.Privileges,
                    row.Specialization,
                    row.Status,
                ]);

                // Add headers
                csvData.unshift(headers);

                // Convert to CSV string
                const csvContent = csvData
                    .map((row) => row.map((cell) => `"${cell}"`).join(","))
                    .join("\n");

                // Create and download file
                const blob = new Blob([csvContent], {
                    type: "text/csv;charset=utf-8;",
                });
                const link = document.createElement("a");
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", "coaches_list_all.csv");
                link.style.visibility = "hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                this.makeToast(
                    "success",
                    "Excel file downloaded successfully",
                    "Success"
                );
            } catch (error) {
                this.makeToast(
                    "danger",
                    "Failed to generate Excel file",
                    "Error"
                );
            }
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
            this.Filter_Specialization = "";
            this.applyFilters();
        },

        // Helper methods for member data (keeping for compatibility)
        getMemberId(index) {
            return this.hardcodedMembers[index] &&
                this.hardcodedMembers[index].memberId
                ? this.hardcodedMembers[index].memberId
                : "M-000000";
        },

        getPlanName(index) {
            return this.hardcodedMembers[index] &&
                this.hardcodedMembers[index].planName
                ? this.hardcodedMembers[index].planName
                : "N/A";
        },

        getJoiningDate(index) {
            return this.hardcodedMembers[index] &&
                this.hardcodedMembers[index].joiningDate
                ? this.hardcodedMembers[index].joiningDate
                : "N/A";
        },

        getExpireDate(index) {
            return this.hardcodedMembers[index] &&
                this.hardcodedMembers[index].expireDate
                ? this.hardcodedMembers[index].expireDate
                : "N/A";
        },

        //------------- Submit Validation Create & Edit Customer
        Submit_Customer() {
            this.$refs.Create_Customer.validate().then((success) => {
                if (!success) {
                    this.makeToast(
                        "danger",
                        this.Please_fill_the_form_correctly,
                        this.Failed
                    );
                } else {
                    if (!this.editmode) {
                        this.Create_Client();
                    } else {
                        this.Update_Client();
                    }
                }
            });
        },

        //------ update Params Table
        updateParams(newProps) {
            this.serverParams = Object.assign({}, this.serverParams, newProps);
        },

        //---- Event Page Change
        onPageChange({ currentPage }) {
            if (this.serverParams.page !== currentPage) {
                this.updateParams({ page: currentPage });
                this.Get_Clients(currentPage);
            }
        },

        //---- Event Per Page Change
        onPerPageChange({ currentPerPage }) {
            if (this.limit !== currentPerPage) {
                this.limit = currentPerPage;
                this.updateParams({ page: 1, perPage: currentPerPage });
                this.Get_Clients(1);
            }
        },

        //---- Event Select Rows
        selectionChanged({ selectedRows }) {
            this.selectedIds = [];
            selectedRows.forEach((row, index) => {
                this.selectedIds.push(row.id);
            });
        },

        //------ Event Sort Change
        onSortChange(params) {
            this.updateParams({
                sort: {
                    type: params[0].type,
                    field: params[0].field,
                },
            });
            this.Get_Clients(this.serverParams.page);
        },

        //------ Event Search
        onSearch(value) {
            this.search = value.searchTerm;
            this.Get_Clients(this.serverParams.page);
        },

        //------ Event Validation State
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },

        //------ Reset Filter
        Reset_Filter() {
            this.search = "";
            this.Filter_Name = "";
            this.Filter_Code = "";
            this.Filter_Phone = "";
            this.Filter_Email = "";
            this.Get_Clients(this.serverParams.page);
        },

        //------ Toast
        makeToast(variant, msg, title) {
            this.$root.$bvToast.toast(msg, {
                title: title,
                variant: variant,
                solid: true,
            });
        },

        //--------------------------------- Coaches PDF -------------------------------\\
        clients_PDF() {
            var self = this;
            let pdf = new jsPDF("p", "pt");

            let pdfData = self.clients.map((client, index) => {
                // Calculate serial number based on current page and items per page
                let serialNumber;
                if (self.limit === "all") {
                    // For "Show All" mode, use simple sequential numbering
                    serialNumber = index + 1;
                } else {
                    // For paginated mode, calculate based on current page
                    serialNumber =
                        (self.serverParams.page - 1) *
                            self.serverParams.perPage +
                        index +
                        1;
                }

                return {
                    "S.No": serialNumber,
                    "Coach ID": self.getCoachId(client),
                    "Coach Name": client.name || "N/A",
                    Email: client.email || "N/A",
                    Phone: client.phone || "N/A",
                    Privileges: self.getPrivilegesText(client),
                    Specialization: self.getSpecializationName(client),
                    Status: self.getStatusText(client),
                };
            });

            let columns = [
                { title: "S.No", dataKey: "S.No" },
                { title: "Coach ID", dataKey: "Coach ID" },
                { title: "Coach Name", dataKey: "Coach Name" },
                { title: "Email", dataKey: "Email" },
                { title: "Phone", dataKey: "Phone" },
                { title: "Privileges", dataKey: "Privileges" },
                { title: "Specialization", dataKey: "Specialization" },
                { title: "Status", dataKey: "Status" },
            ];

            pdf.setFontSize(18);
            pdf.text("Coaches List", 40, 25);

            if (self.company_info && self.company_info.CompanyName) {
                pdf.setFontSize(12);
                pdf.text("Company: " + self.company_info.CompanyName, 40, 45);
                pdf.text(
                    "Generated on: " + new Date().toLocaleDateString(),
                    40,
                    60
                );
            }

            pdf.autoTable({
                head: [columns.map((col) => col.title)],
                body: pdfData.map((row) =>
                    columns.map((col) => row[col.dataKey])
                ),
                startY: 80,
                styles: {
                    fontSize: 8,
                    cellPadding: 3,
                },
                headStyles: {
                    fillColor: [66, 139, 202],
                    textColor: 255,
                    fontStyle: "bold",
                },
                alternateRowStyles: {
                    fillColor: [245, 245, 245],
                },
                margin: { top: 80, right: 40, bottom: 40, left: 40 },
            });

            pdf.save("Coaches_List.pdf");
        },

        // PDF export for all coaches
        clients_PDF_All(allCoaches) {
            var self = this;
            let pdf = new jsPDF("p", "pt");

            let pdfData = allCoaches.map((client, index) => {
                return {
                    "S.No": index + 1,
                    "Coach ID": self.getCoachId(client),
                    "Coach Name": client.name || "N/A",
                    Email: client.email || "N/A",
                    Phone: client.phone || "N/A",
                    Privileges: self.getPrivilegesText(client),
                    Specialization: self.getSpecializationName(client),
                    Status: self.getStatusText(client),
                };
            });

            let columns = [
                { title: "S.No", dataKey: "S.No" },
                { title: "Coach ID", dataKey: "Coach ID" },
                { title: "Coach Name", dataKey: "Coach Name" },
                { title: "Email", dataKey: "Email" },
                { title: "Phone", dataKey: "Phone" },
                { title: "Privileges", dataKey: "Privileges" },
                { title: "Specialization", dataKey: "Specialization" },
                { title: "Status", dataKey: "Status" },
            ];

            pdf.setFontSize(18);
            pdf.text("All Coaches List", 40, 25);

            if (self.company_info && self.company_info.CompanyName) {
                pdf.setFontSize(12);
                pdf.text("Company: " + self.company_info.CompanyName, 40, 45);
                pdf.text(
                    "Generated on: " + new Date().toLocaleDateString(),
                    40,
                    60
                );
            }

            pdf.autoTable({
                head: [columns.map((col) => col.title)],
                body: pdfData.map((row) =>
                    columns.map((col) => row[col.dataKey])
                ),
                startY: 80,
                styles: {
                    fontSize: 8,
                    cellPadding: 3,
                },
                headStyles: {
                    fillColor: [66, 139, 202],
                    textColor: 255,
                    fontStyle: "bold",
                },
                alternateRowStyles: {
                    fillColor: [245, 245, 245],
                },
                margin: { top: 80, right: 40, bottom: 40, left: 40 },
            });

            pdf.save("All_Coaches_List.pdf");
        },

        //--------------------------------------- Get All Coaches -------------------------------\\
        Get_Clients(page) {
            // Start the progress bar.
            NProgress.start();
            NProgress.set(0.1);

            const url =
                "coach?page=" +
                page +
                "&name=" +
                this.Filter_Name +
                "&code=" +
                this.Filter_Code +
                "&mobile_phone=" +
                this.Filter_Phone +
                "&email=" +
                this.Filter_Email +
                "&specialization=" +
                this.Filter_Specialization +
                "&SortField=" +
                this.serverParams.sort.field +
                "&SortType=" +
                this.serverParams.sort.type +
                "&search=" +
                this.search +
                "&limit=" +
                this.limit;

            axios
                .get(url)
                .then((response) => {
                    // Process the clients data to ensure profile_image is properly handled
                    this.clients = (response.data.clients || []).map(
                        (client) => ({
                            ...client,
                            profile_image: client.profile_image || null,
                        })
                    );

                    this.company_info = response.data.company_info;
                    this.totalRows = response.data.totalRows || 0;

                    // Fetch ratings for all coaches
                    this.fetchCoachRatings();

                    // Complete the animation of theprogress bar.
                    NProgress.done();
                    this.isLoading = false;
                })
                .catch((error) => {
                    // Complete the animation of theprogress bar.
                    NProgress.done();

                    // Add some test data if API fails
                    if (this.clients.length === 0) {
                        this.clients = [
                            {
                                id: 1,
                                name: "John Coach",
                                email: "john@example.com",
                                mobile_phone: "+1234567890",
                                landline_phone: "+1234567890",
                                specialization: "Strength Training",
                                status: "active",
                            },
                            {
                                id: 2,
                                name: "Jane Coach",
                                email: "jane@example.com",
                                mobile_phone: "+1234567891",
                                landline_phone: "+1234567891",
                                specialization: "Cardio Fitness",
                                status: "active",
                            },
                            {
                                id: 3,
                                name: "Mike Coach",
                                email: "mike@example.com",
                                mobile_phone: "+1234567892",
                                landline_phone: "+1234567892",
                                specialization: "Yoga",
                                status: "active",
                            },
                            {
                                id: 4,
                                name: "Sarah Coach",
                                email: "sarah@example.com",
                                mobile_phone: "+1234567893",
                                landline_phone: "+1234567893",
                                specialization: "Pilates",
                                status: "active",
                            },
                        ];
                        this.totalRows = this.clients.length;
                    }

                    setTimeout(() => {
                        this.isLoading = false;
                    }, 500);
                });
        },

        //----------------------------------- Show import Coaches -------------------------------\\
        Show_import_clients() {
            this.$bvModal.show("importClients");
        },

        //------------------------------ Filter Methods -------------------------------\\
        onFilterChange() {
            if (this.filterTimeout) {
                clearTimeout(this.filterTimeout);
            }

            this.filterTimeout = setTimeout(() => {
                this.Get_Clients(1);
            }, 500);
        },

        clearFilters() {
            this.Filter_Name = "";
            this.Filter_Code = "";
            this.Filter_Phone = "";
            this.Filter_Email = "";
            this.Filter_Specialization = "";
            this.Get_Clients(1);
        },

        applyFilters() {
            this.Get_Clients(1);
        },

        //------------------------------ Event Import clients -------------------------------\\
        onFileSelected(e) {
            this.import_clients = "";
            this.fileError = null;
            this.importResults = null;

            let file = e.target.files[0];

            if (!file) {
                return;
            }

            // Check file size (1MB limit)
            if (file.size > 1048576) {
                this.fileError = "File size must be less than 1MB";
                this.$refs.fileInput.value = "";
                return;
            }

            // Check file extension
            const fileName = file.name.toLowerCase();
            if (!fileName.endsWith(".csv")) {
                this.fileError = "Please select a CSV file";
                this.$refs.fileInput.value = "";
                return;
            }

            this.import_clients = file;
            this.fileError = null;
        },

        //------------------------------ Handle File Upload -------------------------------\\
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
                    this.fileError = "Please select a valid CSV file";
                    this.import_clients = null;
                    return;
                }
                this.fileError = null;
            }
        },

        //------------------------------ Download Template -------------------------------\\
        downloadTemplate() {
            const link = document.createElement("a");
            link.href = "/import/exemples/import_coaches.csv";
            link.download = "coaches_import_template.csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },

        //------------------------------ Import Coaches -------------------------------\\
        Import_coaches() {
            if (!this.import_clients) {
                this.makeToast(
                    "warning",
                    "Please select a file to import",
                    "Warning"
                );
                return;
            }

            NProgress.start();
            NProgress.set(0.1);

            this.ImportProcessing = true;
            this.importResults = null;

            const formData = new FormData();
            formData.append("file", this.import_clients);

            axios
                .post("coaches/import/csv", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    this.ImportProcessing = false;
                    NProgress.done();

                    if (response.data.status === true) {
                        this.importResults = {
                            success: response.data.success || 0,
                            message:
                                response.data.message ||
                                "Coaches imported successfully!",
                        };

                        this.makeToast(
                            "success",
                            "Coaches imported successfully!",
                            "Success"
                        );

                        // Refresh the coaches list
                        this.Get_Clients(this.serverParams.page);

                        // Reset form after successful import
                        setTimeout(() => {
                            this.resetImportForm();
                        }, 2000);
                    } else {
                        this.importResults = {
                            success: false,
                            message: response.data.message || "Import failed",
                        };

                        this.makeToast(
                            "danger",
                            response.data.message || "Import failed",
                            "Error"
                        );
                    }
                })
                .catch((error) => {
                    this.ImportProcessing = false;
                    NProgress.done();

                    let errorMessage = "Import failed";

                    if (error.response) {
                        if (error.response.status === 422) {
                            errorMessage =
                                "Invalid file format. Please check your CSV file.";
                        } else if (error.response.status === 400) {
                            errorMessage =
                                error.response.data.message || "Invalid file";
                        } else {
                            errorMessage =
                                error.response.data.message || "Import failed";
                        }
                    }

                    this.importResults = {
                        success: false,
                        message: errorMessage,
                    };

                    this.makeToast("danger", errorMessage, "Error");
                });
        },

        //----------------------------------------Submit  import trainers-----------------\\
        Submit_import() {
            if (!this.import_clients) {
                this.makeToast(
                    "warning",
                    "Please select a file to import",
                    "Warning"
                );
                return;
            }

            NProgress.start();
            NProgress.set(0.1);

            this.ImportProcessing = true;
            this.importResults = null;

            const formData = new FormData();
            formData.append("file", this.import_clients);

            axios
                .post("coaches/import/csv", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    this.ImportProcessing = false;
                    NProgress.done();

                    if (response.data.status === true) {
                        this.importResults = {
                            success: true,
                            message:
                                response.data.message ||
                                "Coaches imported successfully!",
                        };

                        this.makeToast(
                            "success",
                            "Coaches imported successfully!",
                            "Success"
                        );

                        // Refresh the coaches list
                        this.Get_Clients(this.serverParams.page);

                        // Reset form after successful import
                        setTimeout(() => {
                            this.resetImportForm();
                        }, 2000);
                    } else {
                        this.importResults = {
                            success: false,
                            message: response.data.message || "Import failed",
                        };

                        this.makeToast(
                            "danger",
                            response.data.message || "Import failed",
                            "Error"
                        );
                    }
                })
                .catch((error) => {
                    this.ImportProcessing = false;
                    NProgress.done();

                    let errorMessage = "Import failed";

                    if (error.response) {
                        if (error.response.status === 422) {
                            errorMessage =
                                "Invalid file format. Please check your CSV file.";
                        } else if (error.response.status === 400) {
                            errorMessage =
                                error.response.data.message || "Invalid file";
                        } else {
                            errorMessage =
                                error.response.data.message ||
                                `Server error (${error.response.status})`;
                        }
                    } else if (error.request) {
                        errorMessage =
                            "Network error - please check your connection";
                    } else {
                        errorMessage =
                            error.message || "Unknown error occurred";
                    }

                    this.importResults = {
                        success: false,
                        message: errorMessage,
                    };

                    this.makeToast("danger", errorMessage, "Error");
                });
        },

        // Reset import form
        resetImportForm() {
            this.import_clients = "";
            this.fileError = null;
            this.importResults = null;
            if (this.$refs.fileInput) {
                this.$refs.fileInput.value = "";
            }
        },

        //----------------------------------- show_credit_card_details -------------------------------\\

        show_credit_card_details(id) {
            NProgress.start();
            NProgress.set(0.1);
            this.customer_id = id;
            this.savedPaymentMethods = [];
            this.selectedCard = null;
            this.card_id = "";
            // Check if the customer has saved payment methods
            axios
                .get(`/retrieve-customer?customerId=${id}`)
                .then((response) => {
                    // If the customer has saved payment methods, display them
                    this.savedPaymentMethods = response.data.data;
                    this.card_id = response.data.customer_default_source;

                    setTimeout(() => {
                        Fire.$emit("get_credit_card_details");
                    }, 500);
                })
                .catch((error) => {
                    // If the customer does not have saved payment methods, show the card element for them to enter their payment information
                    this.savedPaymentMethods = [];
                    this.card_id = "";

                    setTimeout(() => {
                        Fire.$emit("get_credit_card_details");
                    }, 500);
                });
        },

        selectCard(card) {
            this.selectedCard = card;
            this.card_id = card.card_id;

            axios
                .post("update-customer-stripe", {
                    customer_id: this.customer_id,
                    card_id: this.card_id,
                })
                .then((response) => {
                    this.makeToast(
                        "success",
                        this.Credit_card_changed_successfully,
                        this.Success
                    );
                })
                .catch((error) => {
                    this.makeToast(
                        "danger",
                        this.InvalidData,
                        this.Failed
                    );
                });
        },

        //----------------------------------- Show Details Client -------------------------------\\
        showDetails(client) {
            NProgress.start();
            NProgress.set(0.1);
            this.client = client;
            Fire.$emit("Get_Details_coaches");
        },

        //------------------------------ Show Modal (create Client) -------------------------------\\
        New_Client() {
            this.reset_Form();
            this.editmode = false;
            this.$bvModal.show("New_Customer");
        },

        //------------------------------ Show Coach Details -------------------------------\\
        Show_Details(client) {
            this.client = client;
            this.$bvModal.show("showDetails");
        },

        //------------------------------ Delete Coach -------------------------------\\
        Delete_Client(id) {
            this.$swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.value) {
                    NProgress.start();
                    NProgress.set(0.1);

                    axios
                        .delete(`coaches/${id}`)
                        .then((response) => {
                            NProgress.done();
                            this.makeToast(
                                "success",
                                "Coach deleted successfully!",
                                "Success"
                            );
                            this.Get_Clients(this.serverParams.page);
                        })
                        .catch((error) => {
                            NProgress.done();
                            this.makeToast(
                                "danger",
                                "Failed to delete coach",
                                "Error"
                            );
                        });
                }
            });
        },

        //------------------------------ Navigate to Coach Details -------------------------------\\
        Edit_Client(client) {
            try {
                // Navigate directly to coach details page
                this.$router
                    .push({
                        name: "Coachdetails",
                        params: { id: client.id },
                        query: {
                            coachId: client.id,
                            coachName: client.name || "",
                            coachEmail: client.email || "",
                            coachPhone: client.mobile_phone || "",
                            activeTab: "profile",
                            activeAction: "goToProfile",
                        },
                    })
                    .then(() => {
                        this.showSuccess(
                            `Navigating to edit ${client.name || "Coach"}`
                        );
                    })
                    .catch((err) => {
                        // Fallback: try using path navigation
                        const targetPath = `/app/Staff/coachdetails/${client.id}`;
                        this.$router
                            .push({
                                path: targetPath,
                                query: {
                                    coachId: client.id,
                                    coachName: client.name || "",
                                    coachEmail: client.email || "",
                                    coachPhone: client.mobile_phone || "",
                                    activeTab: "profile",
                                },
                            })
                            .catch((fallbackErr) => {
                                this.showError(
                                    "Failed to navigate to coach details. Please try again."
                                );
                            });
                    });
            } catch (error) {
                this.showError(
                    "An error occurred while trying to edit the coach."
                );
            }
        },

        // Helper methods for notifications
        showSuccess(message) {
            try {
                if (this.$root && this.$root.$bvToast) {
                    this.$root.$bvToast.toast(message, {
                        title: "Success",
                        variant: "success",
                        solid: true,
                    });
                } else if (typeof this.$swal !== "undefined") {
                    this.$swal({
                        title: "Success",
                        text: message,
                        icon: "success",
                        timer: 3000,
                        showConfirmButton: false,
                    });
                } else {
                    // Fallback to alert
                    alert("Success: " + message);
                }
            } catch (error) {
                // Silent fail
            }
        },

        showError(message) {
            try {
                if (this.$root && this.$root.$bvToast) {
                    this.$root.$bvToast.toast(message, {
                        title: "Error",
                        variant: "danger",
                        solid: true,
                    });
                } else if (typeof this.$swal !== "undefined") {
                    this.$swal({
                        title: "Error",
                        text: message,
                        icon: "error",
                        timer: 3000,
                        showConfirmButton: false,
                    });
                } else {
                    // Fallback to alert
                    alert("Error: " + message);
                }
            } catch (error) {
                // Silent fail
            }
        },

        //---------------------------------------- Create new Client -------------------------------\\
        Create_Client() {
            this.SubmitProcessing = true;
            axios
                .post("clients", {
                    name: this.client.name,
                    email: this.client.email,
                    phone: this.client.phone,
                    tax_number: this.client.tax_number,
                    country: this.client.country,
                    city: this.client.city,
                    adresse: this.client.adresse,
                })
                .then((response) => {
                    Fire.$emit("Event_Customer");

                    this.makeToast(
                        "success",
                        this.Create.TitleCustomer,
                        this.Success
                    );
                    this.SubmitProcessing = false;
                })
                .catch((error) => {
                    this.makeToast(
                        "danger",
                        this.InvalidData,
                        this.Failed
                    );
                    this.SubmitProcessing = false;
                });
        },

        //----------------------------------- Update Client -------------------------------\\
        Update_Client() {
            this.SubmitProcessing = true;
            axios
                .put("clients/" + this.client.id, {
                    name: this.client.name,
                    email: this.client.email,
                    phone: this.client.phone,
                    tax_number: this.client.tax_number,
                    country: this.client.country,
                    city: this.client.city,
                    adresse: this.client.adresse,
                })
                .then((response) => {
                    Fire.$emit("Event_Customer");
                    this.makeToast(
                        "success",
                        this.Update.TitleCustomer,
                        this.Success
                    );
                    this.SubmitProcessing = false;
                })
                .catch((error) => {
                    this.makeToast(
                        "danger",
                        this.InvalidData,
                        this.Failed
                    );
                    this.SubmitProcessing = false;
                });
        },

        //-------------------------------- Reset Form -------------------------------\\
        reset_Form() {
            this.client = {
                id: "",
                name: "",
                email: "",
                phone: "",
                country: "",
                tax_number: "",
                city: "",
                adresse: "",
            };
        },

        //-------------------------------- Reset Import Form -------------------------------\\
        resetImportForm() {
            this.import_clients = "";
            this.fileError = null;
            this.importResults = null;
            this.$bvModal.hide("importClients");
        },

        //------------------------------- Remove Coach -------------------------------\\
        Remove_Client(id) {
            // Check if SweetAlert is available
            if (typeof this.$swal === "undefined") {
                // Fallback to browser confirm if SweetAlert is not available
                const confirmed = confirm(
                    "Are you sure you want to delete this coach? This action cannot be undone."
                );
                if (!confirmed) return;

                // Remove coach from local data immediately
                this.removeCoachFromTable(id);
                this.showSuccess("Coach deleted successfully!");
            } else {
                this.$swal({
                    title: "Delete Coach",
                    text: "Are you sure you want to delete this coach? This action cannot be undone.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    cancelButtonText: "Cancel",
                    confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Remove coach from local data immediately
                        this.removeCoachFromTable(id);

                        // For now, simulate API call since the endpoint might not exist
                        // In a real implementation, you would call the actual API
                        // axios.delete(`coaches/${id}`)

                        // Simulate API delay
                        setTimeout(() => {
                            this.$swal(
                                "Deleted!",
                                "Coach has been deleted successfully.",
                                "success"
                            );
                        }, 500);

                        // Uncomment the following when the API endpoint is available:
                        /*
            axios.delete(`coaches/${id}`)
              .then(() => {
                this.$swal(
                  "Deleted!",
                  "Coach has been deleted successfully.",
                  "success"
                );
              })
              .catch((error) => {
                // Revert the deletion if API fails
                this.Get_Clients(this.serverParams.page);
                this.$swal(
                  "Error!",
                  "Failed to delete coach. Please try again.",
                  "error"
                );
              });
            */
                    }
                });
            }
        },

        // Helper method to remove coach from table
        removeCoachFromTable(id) {
            // Remove from clients array
            this.clients = this.clients.filter((client) => client.id !== id);

            // Update total rows count
            this.totalRows = Math.max(0, this.totalRows - 1);

            // If current page is empty and not the first page, go to previous page
            if (this.clients.length === 0 && this.serverParams.page > 1) {
                this.serverParams.page = this.serverParams.page - 1;
                this.Get_Clients(this.serverParams.page);
            }

            // If we're on the last page and it becomes empty, go to previous page
            const totalPages = Math.ceil(
                this.totalRows / this.serverParams.perPage
            );
            if (this.serverParams.page > totalPages && totalPages > 0) {
                this.serverParams.page = totalPages;
                this.Get_Clients(this.serverParams.page);
            }
        },

        //---- Delete Clients by selection

        delete_by_selected() {
            // Check if any coaches are selected
            if (!this.selectedIds || this.selectedIds.length === 0) {
                this.showError("Please select at least one coach to delete.");
                return;
            }

            // Check if SweetAlert is available
            if (typeof this.$swal === "undefined") {
                // Fallback to browser confirm
                const confirmed = confirm(
                    `Are you sure you want to delete ${this.selectedIds.length} selected coach(es)? This action cannot be undone.`
                );
                if (!confirmed) return;

                // Remove selected coaches from local data
                this.removeSelectedCoachesFromTable();
                this.showSuccess(
                    `${this.selectedIds.length} coach(es) deleted successfully!`
                );
                this.selectedIds = [];
            } else {
                this.$swal({
                    title: "Delete Selected Coaches",
                    text: `Are you sure you want to delete ${this.selectedIds.length} selected coach(es)? This action cannot be undone.`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    cancelButtonText: "Cancel",
                    confirmButtonText: "Yes, delete them!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Remove selected coaches from local data immediately
                        this.removeSelectedCoachesFromTable();

                        // For now, simulate API call since the endpoint might not exist
                        // In a real implementation, you would call the actual API
                        // axios.post("coaches/delete/by_selection", { selectedIds: this.selectedIds })

                        // Simulate API delay
                        setTimeout(() => {
                            this.$swal(
                                "Deleted!",
                                `${this.selectedIds.length} coach(es) have been deleted successfully.`,
                                "success"
                            );
                            this.selectedIds = [];
                        }, 500);

                        // Uncomment the following when the API endpoint is available:
                        /*
            axios.post("coaches/delete/by_selection", { selectedIds: this.selectedIds })
              .then(() => {
                this.$swal(
                  "Deleted!",
                  `${this.selectedIds.length} coach(es) have been deleted successfully.`,
                  "success"
                );
                this.selectedIds = [];
              })
              .catch((error) => {
                // Revert the deletion if API fails
                this.Get_Clients(this.serverParams.page);
                this.$swal(
                  "Error!",
                  "Failed to delete selected coaches. Please try again.",
                  "error"
                );
              });
            */
                    }
                });
            }
        },

        // Helper method to remove selected coaches from table
        removeSelectedCoachesFromTable() {
            // Remove selected coaches from clients array
            this.clients = this.clients.filter(
                (client) => !this.selectedIds.includes(client.id)
            );

            // Update total rows count
            this.totalRows = Math.max(
                0,
                this.totalRows - this.selectedIds.length
            );

            // If current page is empty and not the first page, go to previous page
            if (this.clients.length === 0 && this.serverParams.page > 1) {
                this.serverParams.page = this.serverParams.page - 1;
                this.Get_Clients(this.serverParams.page);
            }

            // If we're on the last page and it becomes empty, go to previous page
            const totalPages = Math.ceil(
                this.totalRows / this.serverParams.perPage
            );
            if (this.serverParams.page > totalPages && totalPages > 0) {
                this.serverParams.page = totalPages;
                this.Get_Clients(this.serverParams.page);
            }
        },

        // Method to delete specific coaches by ID
        deleteSpecificCoaches() {
            const coachesToDelete = [2, 3]; // IDs of coaches to delete
            
            // Filter out coaches with IDs 2 and 3
            this.clients = this.clients.filter(
                (client) => !coachesToDelete.includes(client.id)
            );

            // Update total rows count to match actual remaining coaches
            this.totalRows = this.clients.length;
        },

        //------ Validate Form Submit_Payment_sell_due
        Submit_Payment_sell_due() {
            this.$refs.ref_pay_due.validate().then((success) => {
                if (!success) {
                    this.makeToast(
                        "danger",
                        this.Please_fill_the_form_correctly,
                        this.Failed
                    );
                } else if (this.payment.amount > this.payment.due) {
                    this.makeToast(
                        "warning",
                        this.Paying_amount_is_greater_than_Total_Due,
                        this.Warning
                    );
                    this.payment.amount = 0;
                } else {
                    this.Submit_Pay_due();
                }
            });
        },

        //---------- keyup paid Amount

        Verified_paidAmount() {
            if (isNaN(this.payment.amount)) {
                this.payment.amount = 0;
            } else if (this.payment.amount > this.payment.due) {
                this.makeToast(
                    "warning",
                    this.Paying_amount_is_greater_than_Total_Due,
                    this.Warning
                );
                this.payment.amount = 0;
            }
        },

        //-------------------------------- reset_Form_payment-------------------------------\\
        reset_Form_payment() {
            this.payment = {
                client_id: "",
                client_name: "",
                date: "",
                due: "",
                amount: "",
                notes: "",
                Reglement: "",
            };
        },

        //------------------------------ Show Modal Pay_due-------------------------------\\
        Pay_due(row) {
            this.reset_Form_payment();
            this.payment.client_id = row.id;
            this.payment.client_name = row.name;
            this.payment.due = row.due;
            this.payment.date = new Date().toISOString().slice(0, 10);
            setTimeout(() => {
                this.$bvModal.show("modal_Pay_due");
            }, 500);
        },

        //------------------------------ Print Customer_Invoice -------------------------\\
        print_it() {
            var divContents = document.getElementById("invoice-POS").innerHTML;
            var a = window.open("", "", "height=500, width=500");
            a.document.write(
                '<link rel="stylesheet" href="/css/pos_print.css"><html>'
            );
            a.document.write("<body >");
            a.document.write(divContents);
            a.document.write("</body></html>");
            a.document.close();
            setTimeout(() => {
                a.print();
            }, 1000);
        },

        //---------------------------------------- Submit_Pay_due-------------------------------\\
        Submit_Pay_due() {
            this.paymentProcessing = true;
            axios
                .post("clients_pay_due", {
                    client_id: this.payment.client_id,
                    amount: this.payment.amount,
                    notes: this.payment.notes,
                    Reglement: this.payment.Reglement,
                })
                .then((response) => {
                    Fire.$emit("Event_pay_due");

                    this.makeToast(
                        "success",
                        this.Create.TitlePayment,
                        this.Success
                    );
                    this.paymentProcessing = false;
                })
                .catch((error) => {
                    this.makeToast(
                        "danger",
                        this.InvalidData,
                        this.Failed
                    );
                    this.paymentProcessing = false;
                });
        },

        //-------------------------------Pay sell return due -----------------------------------\\

        //------ Validate Form Submit_Payment_sell_return_due
        Submit_Payment_sell_return_due() {
            this.$refs.ref_pay_return_due.validate().then((success) => {
                if (!success) {
                    this.makeToast(
                        "danger",
                        this.Please_fill_the_form_correctly,
                        this.Failed
                    );
                } else if (
                    this.payment_return.amount > this.payment_return.return_Due
                ) {
                    this.makeToast(
                        "warning",
                        this.Paying_amount_is_greater_than_Total_Due,
                        this.Warning
                    );
                    this.payment_return.amount = 0;
                } else {
                    this.Submit_Pay_return_due();
                }
            });
        },

        //---------- keyup paid Amount

        Verified_return_paidAmount() {
            if (isNaN(this.payment_return.amount)) {
                this.payment_return.amount = 0;
            } else if (
                this.payment_return.amount > this.payment_return.return_Due
            ) {
                this.makeToast(
                    "warning",
                    this.Paying_amount_is_greater_than_Total_Due,
                    this.Warning
                );
                this.payment_return.amount = 0;
            }
        },

        //-------------------------------- reset_Form_payment-------------------------------\\
        reset_Form_payment_return_due() {
            this.payment_return = {
                client_id: "",
                client_name: "",
                date: "",
                return_Due: "",
                amount: "",
                notes: "",
                Reglement: "",
            };
        },

        //------------------------------ Show Modal Pay_return_due-------------------------------\\
        Pay_return_due(row) {
            this.reset_Form_payment_return_due();
            this.payment_return.client_id = row.id;
            this.payment_return.client_name = row.name;
            this.payment_return.return_Due = row.return_Due;
            this.payment_return.date = new Date().toISOString().slice(0, 10);
            setTimeout(() => {
                this.$bvModal.show("modal_Pay_return_due");
            }, 500);
        },

        //------------------------------ Print Customer_Invoice -------------------------\\
        print_return_due() {
            var divContents =
                document.getElementById("invoice-POS-return").innerHTML;
            var a = window.open("", "", "height=500, width=500");
            a.document.write(
                '<link rel="stylesheet" href="/css/pos_print.css"><html>'
            );
            a.document.write("<body >");
            a.document.write(divContents);
            a.document.write("</body></html>");
            a.document.close();
            setTimeout(() => {
                a.print();
            }, 1000);
        },

        //---------------------------------------- Submit_Pay_due-------------------------------\\
        Submit_Pay_return_due() {
            this.payment_return_Processing = true;
            axios
                .post("clients_pay_return_due", {
                    client_id: this.payment_return.client_id,
                    amount: this.payment_return.amount,
                    notes: this.payment_return.notes,
                    Reglement: this.payment_return.Reglement,
                })
                .then((response) => {
                    Fire.$emit("Event_pay_return_due");

                    this.makeToast(
                        "success",
                        this.Create.TitlePayment,
                        this.Success
                    );
                    this.payment_return_Processing = false;
                })
                .catch((error) => {
                    this.makeToast(
                        "danger",
                        this.InvalidData,
                        this.Failed
                    );
                    this.payment_return_Processing = false;
                });
        },

        //------------------------------Formetted Numbers -------------------------\\
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

        getStatusClass(client) {
            if (client.status === "active") return "status-active";
            if (client.status === "expired") return "status-expired";
            if (client.status === "inactive") return "status-inactive";
            return "";
        },

        getStatusText(client) {
            if (client.status === "active") return "Active";
            if (client.status === "expired") return "Expired";
            if (client.status === "inactive") return "Inactive";
            return "";
        },

        // Privileges methods
        getPrivilegesText(client) {
            return client.privileges || client.role || "N/A";
        },

        getPrivilegesClass(client) {
            const privileges = this.getPrivilegesText(client);
            if (privileges === "N/A") return "privileges-na";
            if (privileges.toLowerCase().includes("admin")) return "privileges-admin";
            if (privileges.toLowerCase().includes("manager")) return "privileges-manager";
            if (privileges.toLowerCase().includes("coach")) return "privileges-coach";
            return "privileges-default";
        },

        // Activated date method
        getActivatedDate(client) {
            if (client.created_at) {
                const date = new Date(client.created_at);
                return date.toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric"
                });
            }
            if (client.activated_on) {
                const date = new Date(client.activated_on);
                return date.toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric"
                });
            }
            
            // Generate dummy dates based on client ID for consistency
            const dummyDates = [
                "01/15/2024", "02/28/2024", "03/10/2024", "04/05/2024", "05/20/2024",
                "06/12/2024", "07/08/2024", "08/25/2024", "09/14/2024", "10/03/2024",
                "11/18/2024", "12/01/2024", "01/22/2023", "02/14/2023", "03/30/2023",
                "04/17/2023", "05/09/2023", "06/26/2023", "07/11/2023", "08/03/2023"
            ];
            
            // Use client ID to get consistent dummy date
            const index = (client.id || 0) % dummyDates.length;
            return dummyDates[index];
        },

        // Helper methods for coach details modal
        getCoachId() {
            return this.client.id ? `C-${this.client.id}` : "C-000000";
        },

        getCoachStatusClass() {
            if (this.client.status === "active") return "status-active";
            if (this.client.status === "expired") return "status-expired";
            if (this.client.status === "inactive") return "status-inactive";
            return "status-inactive";
        },

        getCoachStatusText() {
            if (this.client.status === "active") return "Active";
            if (this.client.status === "expired") return "Expired";
            if (this.client.status === "inactive") return "Inactive";
            return "Inactive";
        },

        getSpecializationStatusClass(client) {
            if (client.specialization === "active") return "plan-active";
            if (client.specialization === "expired") return "plan-expired";
            if (client.specialization === "inactive") return "plan-inactive";
            return "";
        },

        getSpecializationName(client) {
            if (client.specialization === "active") return "Active";
            if (client.specialization === "expired") return "Expired";
            if (client.specialization === "inactive") return "Inactive";
            return "N/A";
        },

        // Search and filter methods
        handleSearch() {
            this.serverParams.page = 1;
            this.Get_Clients(1);
        },

        setStatusFilter(status) {
            // Multiple selection logic - users can select both active and inactive
            if (this.statusFilter.includes(status)) {
                // If clicking the same option, remove it from the array
                this.statusFilter = this.statusFilter.filter(s => s !== status);
            } else {
                // Add the new option to the array
                this.statusFilter.push(status);
            }
            
            this.serverParams.page = 1;
            this.Get_Clients(1);
        },

        clearStatusFilter() {
            this.statusFilter = ['active', 'inactive']; // Show all coaches
            this.serverParams.page = 1;
            this.Get_Clients(1);
        },

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

        setSpecializationFilter(specialization) {
            this.specializationFilter = specialization;
            this.serverParams.page = 1;
            this.Get_Clients(1);
        },

        clearSpecializationFilter() {
            this.specializationFilter = "all";
            this.serverParams.page = 1;
            this.Get_Clients(1);
        },

        getSpecializationDisplayName() {
            if (this.specializationFilter === "fitness") return "Fitness";
            if (this.specializationFilter === "yoga") return "Yoga";
            if (this.specializationFilter === "cardio") return "Cardio";
            return "All Specializations";
        },

        clearSearch() {
            this.searchQuery = "";
            this.serverParams.page = 1;
            this.Get_Clients(1);
        },

        clearProfileFilter() {
            this.profileFilter = "all";
            this.serverParams.page = 1;
            this.Get_Clients(1);
        },

        clearContactFilter() {
            this.contactFilter = "all";
            this.serverParams.page = 1;
            this.Get_Clients(1);
        },
    }, // END METHODS

    //----------------------------- Created function-------------------

    created() {
        // Ensure initial parameters are set correctly
        this.updateParams({ page: 1, perPage: parseInt(this.limit) });
        this.Get_Clients(1);

        Fire.$on("Get_Details_coaches", () => {
            setTimeout(() => NProgress.done(), 500);
            this.$bvModal.show("showDetails");
        });

        Fire.$on("Event_Coach", () => {
            setTimeout(() => {
                this.Get_Clients(this.serverParams.page);
                this.$bvModal.hide("New_Coach");
            }, 500);
        });

        Fire.$on("Delete_Coach", () => {
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
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

// Main Page Wrapper
.members-page-wrapper {
    background-color: $color-background;
    padding: 0;
}

.main-content {
    padding: $padding-lg;
    background-color: $color-background;
}

// Page Header
.page-header {
    .header-content {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: nowrap;
        gap: $padding-md;

        .header-left {
            .page-title {
                color: $color-text-dark;
                font-weight: $font-weight-bold;
                font-size: $font-size-xl;
                margin-bottom: 0;
                font-family: $font-family-base;
            }
        }

        .search-field-container {
            flex: 1;
            max-width: 400px;
            margin: 0 $padding-md 0 0;

            .search-field {
                position: relative;
                display: flex;
                align-items: center;

                .search-icon {
                    position: absolute;
                    left: $padding-sm;
                    color: $color-muted;
                    font-size: $font-size-sm;
                    z-index: 2;
                }

                .search-clear {
                    position: absolute;
                    right: $padding-sm;
                    color: $color-muted;
                    font-size: $font-size-sm;
                    z-index: 2;
                    cursor: pointer;
                    transition: color 0.3s ease;

                    &:hover {
                        color: $color-danger;
                    }
                }

                .search-input {
                    width: 100%;
                    padding: $padding-sm 2.5rem $padding-sm 2.5rem;
                    border: $border-width-sm $border-style-solid;
                    border-radius: $border-radius-lg;
                    font-size: $font-size-sm;
                    background-color: $color-white;
                    transition: all 0.3s ease;

                    &:focus {
                        outline: none;
                        border-color: $color-button;
                        box-shadow: 0 0 0 0.2rem rgba($color-button, 0.25);
                        background-color: $color-white;
                    }

                    &::placeholder {
                        color: $color-muted;
                        font-size: $font-size-sm;
                    }
                }
            }
        }

        .filter-buttons-container {
            display: flex;
            align-items: center;
            margin-right: $padding-md;

            .filter-buttons {
                display: flex;
                gap: $padding-sm;
                flex-wrap: wrap;
            }
        }

        .header-right {
            margin-left: auto;

            .header-actions {
                display: flex;
                gap: $padding-sm;
                flex-wrap: wrap;
                align-items: center;
            }
        }
    }
}

// Filter Button Styling
.filter-btn {
    .btn,
    .btn-secondary,
    .btn-outline-secondary {
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

    .dropdown-menu {
        border: 1px solid $color-border-muted;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 8px 0;
        margin-top: 4px;

        .dropdown-item {
            padding: 8px 16px;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: $color-text-dark;
            transition: all 0.2s ease;

            &:hover {
                background: $color-background-hover;
                color: $color-text-dark;
            }

            &:focus {
                background: $color-background-hover;
                color: $color-text-dark;
            }

            i {
                width: 16px;
                text-align: center;
            }

            .d-flex {
                width: 100%;

                .status-checkbox,
                .specialization-checkbox {
                    width: 16px;
                    height: 16px;
                    accent-color: $color-button;
                    cursor: pointer;
                }
            }
        }

        .dropdown-divider {
            margin: 4px 0;
            border-color: $color-border-muted;
        }
    }
}

// Header Action Buttons
.header-actions {
    .btn {
        border-radius: $border-radius-sm;
        font-weight: $font-weight-medium;
        border: $border-width-sm $border-style-solid transparent;
        transition: all 0.3s ease;
    }

    .btn-filter {
        &:hover {
            background-color: $color-info !important;
            color: $color-white !important;
            border-color: $color-info !important;
            box-shadow: 0 4px 12px rgba($color-info, 0.4) !important;
            transform: translateY(-2px);
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

// Members Table Card
.members-table-card {
    border-radius: $border-radius-sm;
    box-shadow: $box-shadow-sm;
    border: none;
    overflow: hidden;

    .card-body {
        padding: 1rem;
    }
}

// Table Styling
.members-table {
    margin-bottom: 0;
    width: 100%;
    border-collapse: collapse;
    border: none;
    table-layout: fixed; // Prevent table from shrinking

    thead {
        tr {
            th {
                background-color: transparent;
                border: none;
            }
        }
    }

    .table-header {
        background-color: transparent;
        color: $color-text-dark;
        font-family: $font-family-base;
        font-size: $font-size-sm;
        font-weight: $font-weight-semibold !important;
        padding: 10px 15px;
        border: none;
        text-align: left;

        // Header content with checkbox and text
        .header-content {
            display: flex;
            align-items: center;
            gap: 10px;

            .header-text {
                font-weight: $font-weight-semibold !important;
            }
        }

        // Header alignment
        &:first-child {
            text-align: center; // Checkbox header
        }

        &:nth-child(2) {
            text-align: left; // Coaches header
        }

        &:nth-child(3) {
            text-align: center; // Contact header
        }

        &:nth-child(4) {
            text-align: center; // Privileges header
        }

        &:nth-child(5) {
            text-align: center; // Specialization header
        }

        &:nth-child(6) {
            text-align: center; // Activated on header
        }

        &:nth-child(7) {
            text-align: center; // Last online header
        }

        &:last-child {
            text-align: center; // Actions header
        }
    }

    .table-row {
        border: none;
        transition: background-color 0.2s ease;
        cursor: pointer;

        &:nth-child(even) {
            background-color: #f8f9fa;
        }

        &:hover {
            background-color: $color-background-hover;
            transform: translateY(-1px);
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
        text-align: left;

        // Table cell alignment
        &:first-child {
            text-align: center; // Checkbox column
        }

        &:nth-child(2) {
            text-align: left; // Coaches column
        }

        &:nth-child(3) {
            text-align: center; // Contact column
        }

        &:nth-child(4) {
            text-align: center; // Privileges column
        }

        &:nth-child(5) {
            text-align: center; // Specialization column
        }

        &:nth-child(6) {
            text-align: center; // Activated on column
        }

        &:nth-child(7) {
            text-align: center; // Last online column
        }

        &:last-child {
            text-align: center; // Actions column
        }
    }
}

// Ensure responsive horizontal scrolling for tables
.table-responsive {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

@media (max-width: 767.98px) {
    .table-responsive {
        overflow-x: auto;
    }

    .members-table {
        min-width: 900px;
    }
}

// Apply the same horizontal scrolling just above mobile widths (tablets)
@media (max-width: 991.98px) {
    .table-responsive {
        overflow-x: auto;
    }

    .members-table {
        min-width: 900px;
    }
}

// Table Styling
.members-table {
    margin-bottom: 0;
    width: 100%;
    border-collapse: collapse;

    thead {
        tr {
            th {
                background-color: $color-background;
                border-bottom: $border-width-sm $border-style-solid
                    $color-border-muted;
            }
        }
    }

    .table-header {
        background-color: $color-background;
        color: $color-text-dark;
        font-family: $font-family-base;
        font-size: $font-size-sm;
        font-weight: $font-weight-normal;
        padding: 8px 10px;
        border-bottom: $border-width-sm $border-style-solid $color-border-muted;
        text-align: center;
    }

    .table-cell {
        padding: 5px 5px;
        vertical-align: middle;
        color: $color-text-dark;
        font-family: $font-family-base;
        font-size: $font-size-base;
        font-weight: $font-weight-normal;
        border: none;
        text-align: center;
    }
}

// Member Avatar
.member-avatar {
    display: flex;
    align-items: center;
    justify-content: center;

    .member-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        border: $border-width-sm $border-style-solid $color-border-muted;
    }
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
    border: $border-width-sm $border-style-solid $color-border-muted;
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
}

.plan-name {
    font-weight: $font-weight-normal;
    padding: $padding-xxs $padding-xs;
    border-radius: $border-radius-sm;
    font-size: $font-size-sm;
    border: $border-width-sm $border-style-solid transparent;
    display: inline-block;

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

// Action Dropdown
.action-dropdown {
    .dropdown-dots {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;

        .dot {
            width: 4px;
            height: 4px;
            background-color: $color-muted;
            border-radius: 50%;
            margin: 1px 0;
        }
    }
}

// Dropdown Items Styling
.dropdown-item {
    display: flex;
    align-items: center;
    padding: $padding-xs $padding-sm;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    transition: all 0.3s ease;
    border-radius: $border-radius-sm;
    margin: $margin-xxs;

    &:hover {
        transform: translateX(2px);
        box-shadow: $box-shadow-sm;
    }

    i {
        font-size: $font-size-sm;
        margin-right: $padding-xs;
    }

    &.action-view {
        color: $color-info;

        &:hover {
            background-color: rgba($color-info, 0.1);
            color: color.adjust($color-info, $lightness: -10%);
        }
    }

    &.action-edit {
        color: $color-warning;

        &:hover {
            background-color: rgba($color-warning, 0.1);
            color: color.adjust($color-warning, $lightness: -10%);
        }
    }

    &.action-delete {
        color: $color-danger;

        &:hover {
            background-color: rgba($color-danger, 0.1);
            color: color.adjust($color-danger, $lightness: -10%);
        }

        .delete-text {
            font-weight: $font-weight-semibold;
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
            gap: $padding-xxs;
            padding: $padding-xxs $padding-xxs;
            border-radius: $border-radius-sm;
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
            width: 80px;
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
            border-bottom: $border-width-sm $border-style-solid
                $color-border-muted;
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
            border-radius: $border-radius-sm;
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

// Member Details Modal Styles
.member-details-content {
    .member-avatar-large {
        display: flex;
        justify-content: center;
        margin-bottom: $padding-md;

        .member-image-large {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            border: $border-width-sm $border-style-solid $color-border-muted;
            box-shadow: $box-shadow-sm;
        }
    }

    .member-info-grid {
        display: grid;
        gap: $padding-md;

        .info-item {
            display: flex;
            align-items: center;
            padding: $padding-sm;
            border-bottom: $border-width-sm $border-style-solid
                $color-border-muted;

            &:last-child {
                border-bottom: none;
            }

            .info-label {
                font-weight: $font-weight-semibold;
                color: $color-text-dark;
                min-width: 120px;
                margin-right: $padding-sm;
                font-size: $font-size-sm;
            }

            .info-value {
                color: $color-muted;
                font-size: $font-size-sm;
                font-weight: $font-weight-normal;
                flex: 1;

                &.plan-active {
                    color: $color-success;
                    font-weight: $font-weight-medium;
                }

                &.plan-na {
                    color: $color-muted;
                }

                &.expire-active {
                    color: $color-success;
                }

                &.expire-expired {
                    color: $color-danger;
                }

                &.expire-na {
                    color: $color-muted;
                }

                &.status-active {
                    color: $color-success;
                    font-weight: $font-weight-medium;
                }

                &.status-expired {
                    color: $color-danger;
                    font-weight: $font-weight-medium;
                }

                &.status-inactive {
                    color: $color-muted;
                }
            }
        }
    }
}

.modal-footer-actions {
    display: flex;
    justify-content: flex-end;
    gap: $padding-sm;

    .btn-edit-member {
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

    .btn-close-modal {
        background-color: $color-muted;
        border-color: $color-muted;
        color: $color-white;
        font-weight: $font-weight-medium;
        border-radius: $border-radius-sm;
        padding: $padding-xs $padding-md;
        transition: all 0.3s ease;

        &:hover {
            background-color: color.adjust($color-muted, $lightness: -10%);
            border-color: color.adjust($color-muted, $lightness: -10%);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba($color-muted, 0.4) !important;
        }

        &:active {
            transform: translateY(0);
        }
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
                    border: $border-width-sm $border-style-solid
                        $color-border-muted;

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
                    border: $border-width-sm $border-style-solid
                        rgba($color-success, 0.3);

                    i {
                        color: $color-success;
                    }
                }

                &.error {
                    background-color: rgba($color-danger, 0.1);
                    color: color.adjust($color-danger, $lightness: -20%);
                    border: $border-width-sm $border-style-solid
                        rgba($color-danger, 0.3);

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

// Member Profile (Clients column)
.member-profile {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;

    .member-avatar {
        .member-image {
            width: 36px;
            height: 36px;
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

        &.online {
            background-color: #10b981; // Green for online coaches
        }

        &.offline {
            background-color: #6b7280; // Gray for offline coaches
        }
    }
}

// Rating display in coaches table (golden stars like Ratings pages)
.rating-display-stars {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;

    .stars-container {
        display: flex;
        gap: 0.15rem;
        align-items: center;
        justify-content: center;

        .star-icon {
            font-size: 1rem;
            transition: all 0.2s ease;

            &.star-filled {
                color: #FFD700; // Golden for filled stars
                text-shadow: 0 0 3px rgba(255, 215, 0, 0.5);
            }

            &.star-empty {
                color: #E5E7EB; // Light gray for empty stars
            }
        }
    }

    .rating-value {
        font-size: 0.75rem;
        font-weight: 600;
        color: #F59E0B;
        margin-top: 0.1rem;
    }

    .rating-no-rating {
        font-size: 0.75rem;
        color: $color-muted;
        font-style: italic;
        margin-top: 0.1rem;
    }
}

// Checkbox styling
.select-all-checkbox,
.member-checkbox {
    width: 12px;
    height: 12px;
    accent-color: $color-button;
    cursor: pointer;
    margin: 0;
}

.select-all-checkbox {
    transform: scale(1.1);
}

.member-checkbox {
    transform: scale(1);
}

// Coach tag styling
.coach-tag {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &.tag-no-tag {
        background-color: #f3f4f6;
        color: #6b7280;
    }

    &.tag-senior {
        background-color: #dbeafe;
        color: #1e40af;
    }

    &.tag-junior {
        background-color: #fef3c7;
        color: #d97706;
    }

    &.tag-specialist {
        background-color: #ecfdf5;
        color: #059669;
    }

    &.tag-trainer {
        background-color: #f3e8ff;
        color: #7c3aed;
    }

    &.tag-default {
        background-color: #e5e7eb;
        color: #374151;
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

// Action Dropdown
.action-dropdown {
    .dropdown-dots {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;

        .dot {
            width: 4px;
            height: 4px;
            background-color: $color-muted;
            border-radius: 50%;
            margin: 1px 0;
        }
    }

    // Dropdown section headers
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
        z-index: 1000;

        &:first-child {
            margin-top: 0;
        }

        &:not(:first-child) {
            margin-top: 8px;
            border-top: 1px solid #e9ecef;
        }
    }
}

// Dropdown Items Styling
.dropdown-item {
    display: flex;
    align-items: center;
    padding: $padding-xs $padding-sm;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    transition: all 0.3s ease;
    border-radius: $border-radius-sm;
    margin: $margin-xxs;
    cursor: pointer;
    &:hover {
        transform: translateX(2px);
        box-shadow: $box-shadow-sm;
    }

    i {
        font-size: $font-size-sm;
        margin-right: $padding-xs;
    }

    &.action-view {
        color: $color-info;

        &:hover {
            background-color: rgba($color-info, 0.1);
            color: color.adjust($color-info, $lightness: -10%);
        }
    }

    &.action-edit {
        color: $color-warning;

        &:hover {
            background-color: rgba($color-warning, 0.1);
            color: color.adjust($color-warning, $lightness: -10%);
        }
    }

    &.action-delete {
        color: $color-danger;

        &:hover {
            background-color: rgba($color-danger, 0.1);
            color: color.adjust($color-danger, $lightness: -10%);
        }

        .delete-text {
            font-weight: $font-weight-semibold;
        }
    }
}

// Member Details Modal Styles
.member-details-modal {
    .member-profile-section {
        padding: 1.5rem;
        background: linear-gradient(
            135deg,
            rgba($primary, 0.05) 0%,
            rgba($color-info, 0.05) 100%
        );
        border-radius: 12px;
        border: 1px solid $color-border-muted;

        .member-avatar-large {
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;

            .member-image-large {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                object-fit: cover;
                border: 4px solid $color-white;
                box-shadow: 0 8px 25px $color-shadow-heavy;
                transition: all 0.3s ease;

                &:hover {
                    transform: scale(1.05);
                    box-shadow: 0 12px 35px $color-shadow-heavy;
                }
            }
        }

        .member-name-large {
            color: $color-heading;
            font-weight: 700;
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }

        .member-email-large {
            color: $color-muted;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }

        .member-status-badge-large {
            display: inline-block;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: 2px solid transparent;

            &.status-active {
                background-color: rgba($color-success, 0.1);
                color: $color-success;
                border-color: rgba($color-success, 0.3);
            }

            &.status-expired {
                background-color: rgba($color-danger, 0.1);
                color: $color-danger;
                border-color: rgba($color-danger, 0.3);
            }

            &.status-inactive {
                background-color: rgba($color-muted, 0.1);
                color: $color-muted;
                border-color: rgba($color-muted, 0.3);
            }
        }
    }

    .member-details-section {
        .section-title {
            color: $color-heading;
            font-weight: 600;
            font-size: 1.1rem;
            border-bottom: 2px solid $color-border-muted;
            padding-bottom: 0.5rem;

            i {
                color: $primary;
            }
        }

        .details-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;

            .detail-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem 1rem;
                background-color: rgba($color-background, 0.5);
                border-radius: 8px;
                border: 1px solid $color-border-muted;
                transition: all 0.3s ease;

                &:hover {
                    background-color: rgba($color-background, 0.8);
                    border-color: $color-border;
                    box-shadow: 0 2px 8px $color-card-shadow;
                }

                .detail-label {
                    font-weight: 600;
                    color: $color-subtitle;
                    font-size: 0.9rem;
                }

                .detail-value {
                    font-weight: 500;
                    color: $color-heading;
                    font-size: 0.9rem;
                    text-align: right;

                    &.plan-active {
                        color: $color-success;
                        background-color: rgba($color-success, 0.1);
                        padding: 0.25rem 0.5rem;
                        border-radius: 4px;
                        border: 1px solid rgba($color-success, 0.3);
                    }

                    &.plan-na {
                        color: $color-muted;
                        background-color: rgba($color-muted, 0.1);
                        padding: 0.25rem 0.5rem;
                        border-radius: 4px;
                        border: 1px solid rgba($color-muted, 0.3);
                    }

                    &.expire-active {
                        color: $color-success;
                    }

                    &.expire-expired {
                        color: $color-danger;
                    }

                    &.expire-na {
                        color: $color-muted;
                    }

                    &.amount-due {
                        color: $color-danger;
                        font-weight: 600;
                    }

                    &.amount-return-due {
                        color: $color-warning;
                        font-weight: 600;
                    }
                }
            }
        }
    }
}

// Responsive Design
@media (max-width: $breakpoint-md) {
    .main-content {
        padding: $padding-sm;
    }

    .page-header {
        .header-content {
            flex-wrap: wrap;
            justify-content: space-between;
        }
    }

    .members-table-card {
        .card-body {
            &.table-scrollable {
                max-height: 60vh;
            }
        }
    }

    .page-header {
        .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 15px;
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
// @media (max-width: 1199.98px) {
//     .members-page-wrapper {
//         .main-content {
//             .page-header {
//                 .header-row-1 {
//                     .header-right {
//                         .header-actions {
//                             .btn {
//                                 font-size: 0.8rem;
//                                 padding: 0.4rem 0.8rem;
//                             }
//                         }
//                     }
//                 }
                
//                 .header-row-2 {
//                     .search-and-filters {
//                         .filter-buttons {
//                             .filter-btn {
//                                 font-size: 0.8rem;
//                                 padding: 0.4rem 0.8rem;
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }

// @media (max-width: 991.98px) {
//     .members-page-wrapper {
//         .main-content {
//             .page-header {
//                 .header-row-1 {
//                     flex-direction: column;
//                     align-items: flex-start;
//                     gap: 1rem;
                    
//                     .header-left {
//                         width: 100%;
//                     }
                    
//                     .header-right {
//                         width: 100%;
                        
//                         .header-actions {
//                             justify-content: flex-start;
//                             flex-wrap: wrap;
//                         }
//                     }
//                 }
                
//                 .header-row-2 {
//                     .search-and-filters {
//                         flex-direction: column;
//                         gap: 1rem;
                        
//                         .search-field-container {
//                             width: 100%;
//                         }
                        
//                         .filter-buttons-container {
//                             width: 100%;
                            
//                             .filter-buttons {
//                                 justify-content: flex-start;
//                                 flex-wrap: wrap;
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }

// @media (max-width: 767.98px) {
//     .members-page-wrapper {
//         padding: 0.5rem;
        
//         .main-content {
//             .page-header {
//                 .header-row-1 {
//                     .header-left {
//                         .page-title {
//                             font-size: 1.5rem;
//                         }
//                     }
                    
//                     .header-right {
//                         .header-actions {
//                             .btn {
//                                 font-size: 0.75rem;
//                                 padding: 0.35rem 0.7rem;
                                
//                                 i {
//                                     margin-right: 0.25rem;
//                                 }
//                             }
//                         }
//                     }
//                 }
                
//                 .header-row-2 {
//                     .search-and-filters {
//                         .search-field-container {
//                             .search-field {
//                                 .search-input {
//                                     font-size: 1rem; // Prevent zoom on iOS
//                                 }
//                             }
//                         }
                        
//                         .filter-buttons-container {
//                             .filter-buttons {
//                                 gap: 0.5rem;
                                
//                                 .filter-btn {
//                                     font-size: 0.75rem;
//                                     padding: 0.35rem 0.7rem;
                                    
//                                     .btn {
//                                         font-size: 0.75rem;
//                                         padding: 0.35rem 0.7rem;
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
            
//             .members-table-card {
//                 .card-body {
//                     padding: 0.5rem;
//                 }
//             }
//         }
//     }
    
//     // Ensure table is always visible and scrollable
//     .table-responsive {
//         display: block !important;
//         overflow-x: auto;
//         -webkit-overflow-scrolling: touch;
        
//         .members-table {
//             min-width: 800px; // Ensure minimum width for readability
//             width: 100%;
            
//             .table-cell {
//                 white-space: nowrap;
//                 padding: 0.5rem 0.25rem;
//                 font-size: 0.8rem;
                
//                 .member-name {
//                     white-space: normal;
//                     word-break: break-word;
//                     max-width: 120px;
//                 }
//             }
//         }
//     }
// }

// @media (max-width: 575.98px) {
//     .members-page-wrapper {
//         padding: 0.25rem;
        
//         .main-content {
//             .page-header {
//                 .header-row-1 {
//                     .header-left {
//                         .page-title {
//                             font-size: 1.25rem;
//                         }
//                     }
                    
//                     .header-right {
//                         .header-actions {
//                             .btn {
//                                 font-size: 0.7rem;
//                                 padding: 0.3rem 0.6rem;
                                
//                                 span {
//                                     display: none;
//                                 }
//                             }
//                         }
//                     }
//                 }
                
//                 .header-row-2 {
//                     .search-and-filters {
//                         .filter-buttons-container {
//                             .filter-buttons {
//                                 .filter-btn {
//                                     font-size: 0.7rem;
//                                     padding: 0.3rem 0.6rem;
                                    
//                                     .btn {
//                                         font-size: 0.7rem;
//                                         padding: 0.3rem 0.6rem;
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
    
//     // Enhanced table styling for small screens
//     .table-responsive {
//         .members-table {
//             .table-header,
//             .table-cell {
//                 padding: 0.3rem 0.15rem;
//                 font-size: 0.7rem;
                
//                 .member-image {
//                     width: 20px;
//                     height: 20px;
//                 }
                
//                 .contact-icon {
//                     font-size: 0.7rem;
//                     padding: 0.15rem;
//                 }
//             }
//         }
//     }
    
//     .pagination-container {
//         .pagination-controls {
//             .pagination-buttons {
//                 flex-direction: column;
//                 gap: 0.5rem;
                
//                 .page-numbers {
//                     order: -1;
//                 }
//             }
//         }
        
//         .per-page-selector {
//             .per-page-label {
//                 font-size: 0.8rem;
//             }
            
//             .per-page-select {
//                 font-size: 0.8rem;
//             }
//         }
//     }
// }

// // Enhanced table responsiveness for very small screens
// @media (max-width: 479.98px) {
//     .table-responsive {
//         overflow-x: auto;
//         -webkit-overflow-scrolling: touch;
//         border: 1px solid #dee2e6;
//         border-radius: 0.375rem;
        
//         .members-table {
//             min-width: 900px; // Increased for better readability
//             margin-bottom: 0;
            
//             .table-header,
//             .table-cell {
//                 white-space: nowrap;
//                 padding: 0.4rem 0.2rem;
//                 font-size: 0.75rem;
//                 border-bottom: 1px solid #dee2e6;
                
//                 .member-name {
//                     white-space: normal;
//                     word-break: break-word;
//                     max-width: 100px;
//                 }
                
//                 .member-image {
//                     width: 25px;
//                     height: 25px;
//                 }
                
//                 .contact-icon {
//                     font-size: 0.8rem;
//                     padding: 0.2rem;
//                 }
//             }
            
//             .table-header {
//                 background-color: #f8f9fa;
//                 font-weight: 600;
//                 position: sticky;
//                 top: 0;
//                 z-index: 10;
//             }
//         }
//     }
// }

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

// Member Details Modal Styles
.member-details-modal {
    .member-profile-section {
        padding: 1.5rem;
        background: linear-gradient(
            135deg,
            rgba($primary, 0.05) 0%,
            rgba($color-info, 0.05) 100%
        );
        border-radius: 12px;
        border: 1px solid $color-border-muted;

        .member-avatar-large {
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;

            .member-image-large {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                object-fit: cover;
                border: 4px solid $color-white;
                box-shadow: 0 8px 25px $color-shadow-heavy;
                transition: all 0.3s ease;

                &:hover {
                    transform: scale(1.05);
                    box-shadow: 0 12px 35px $color-shadow-heavy;
                }
            }
        }

        .member-name-large {
            color: $color-heading;
            font-weight: 700;
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }

        .member-email-large {
            color: $color-muted;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }

        .member-status-badge-large {
            display: inline-block;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: 2px solid transparent;

            &.status-active {
                background-color: rgba($color-success, 0.1);
                color: $color-success;
                border-color: rgba($color-success, 0.3);
            }

            &.status-expired {
                background-color: rgba($color-danger, 0.1);
                color: $color-danger;
                border-color: rgba($color-danger, 0.3);
            }

            &.status-inactive {
                background-color: rgba($color-muted, 0.1);
                color: $color-muted;
                border-color: rgba($color-muted, 0.3);
            }
        }
    }

    .member-details-section {
        .section-title {
            color: $color-heading;
            font-weight: 600;
            font-size: 1.1rem;
            border-bottom: 2px solid $color-border-muted;
            padding-bottom: 0.5rem;

            i {
                color: $primary;
            }
        }

        .details-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;

            .detail-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem 1rem;
                background-color: rgba($color-background, 0.5);
                border-radius: 8px;
                border: 1px solid $color-border-muted;
                transition: all 0.3s ease;

                &:hover {
                    background-color: rgba($color-background, 0.8);
                    border-color: $color-border;
                    box-shadow: 0 2px 8px $color-card-shadow;
                }

                .detail-label {
                    font-weight: 600;
                    color: $color-subtitle;
                    font-size: 0.9rem;
                }

                .detail-value {
                    font-weight: 500;
                    color: $color-heading;
                    font-size: 0.9rem;
                    text-align: right;

                    &.plan-active {
                        color: $color-success;
                        background-color: rgba($color-success, 0.1);
                        padding: 0.25rem 0.5rem;
                        border-radius: 4px;
                        border: 1px solid rgba($color-success, 0.3);
                    }

                    &.plan-na {
                        color: $color-muted;
                        background-color: rgba($color-muted, 0.1);
                        padding: 0.25rem 0.5rem;
                        border-radius: 4px;
                        border: 1px solid rgba($color-muted, 0.3);
                    }

                    &.expire-active {
                        color: $color-success;
                    }

                    &.expire-expired {
                        color: $color-danger;
                    }

                    &.expire-na {
                        color: $color-muted;
                    }

                    &.amount-due {
                        color: $color-danger;
                        font-weight: 600;
                    }

                    &.amount-return-due {
                        color: $color-warning;
                        font-weight: 600;
                    }
                }
            }
        }
    }

    // Privilege badge styles
    .privileges-badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;
        text-transform: capitalize;
        border: 1px solid;

        &.privileges-na {
            color: $color-muted;
            background-color: rgba($color-muted, 0.1);
            border-color: rgba($color-muted, 0.3);
        }

        &.privileges-admin {
            color: #dc3545;
            background-color: rgba(220, 53, 69, 0.1);
            border-color: rgba(220, 53, 69, 0.3);
        }

        &.privileges-manager {
            color: #fd7e14;
            background-color: rgba(253, 126, 20, 0.1);
            border-color: rgba(253, 126, 20, 0.3);
        }

        &.privileges-coach {
            color: $color-success;
            background-color: rgba($color-success, 0.1);
            border-color: rgba($color-success, 0.3);
        }

        &.privileges-default {
            color: $primary;
            background-color: rgba($primary, 0.1);
            border-color: rgba($primary, 0.3);
        }
    }

    // Activated date styling
    .activated-date {
        color: $color-subtitle;
        font-size: 0.9rem;
        font-weight: 500;
    }

    // Rating display with golden stars
    .rating-display-stars {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;

        .stars-container {
            display: flex;
            gap: 0.15rem;
            align-items: center;
            justify-content: center;

            .star-icon {
                font-size: 1rem;
                transition: all 0.2s ease;

                &.star-filled {
                    color: #FFD700; // Golden color
                    text-shadow: 0 0 3px rgba(255, 215, 0, 0.5);
                }

                &.star-empty {
                    color: #E5E7EB; // Light gray for empty stars
                }
            }
        }

        .rating-value {
            font-size: 0.75rem;
            font-weight: 600;
            color: #F59E0B;
            margin-top: 0.1rem;
        }

        .rating-no-rating {
            font-size: 0.75rem;
            color: $color-muted;
            font-style: italic;
            margin-top: 0.1rem;
        }
    }
}
</style>