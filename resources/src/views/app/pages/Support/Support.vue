<template>
    <div class="support-page-wrapper">
        <!-- Loading State -->
        <div v-if="isLoading" class="loading-container">
            <div class="loading-spinner">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <p class="loading-text">Loading support tickets...</p>
            </div>
        </div>

        <!-- Main Content -->
        <div v-else class="main-content">
            <!-- Page Header -->
            <div class="page-header">
                <!-- Breadcrumb and Navigation Row -->
                <div class="breadcrumb-nav-row d-flex justify-content-between align-items-center mb-3">
                    <!-- Breadcrumb Navigation -->
                    <div class="breadcrumb-section">
                        <nav class="breadcrumb-nav" aria-label="breadcrumb">
                            <div class="breadcrumb-container d-flex align-items-center">
                                <button
                                    @click="goBack"
                                    class="back-button me-2 me-sm-3"
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
                                        <i class="fas fa-life-ring"></i>
                                        Support
                                    </li>
                                </ol>
                            </div>
                        </nav>
                    </div>

                    <!-- Action Section -->
                    <div class="action-section">
                        <button
                            class="btn btn-primary action-btn"
                            @click="openCreateModal"
                        >
                            <i class="fas fa-plus"></i>
                            New Ticket
                        </button>
                    </div>
                </div>

                <!-- Page Title -->
                <div class="page-title-section">
                    <h1 class="page-title">
                        <i class="fas fa-life-ring me-2"></i>
                        Support Tickets
                    </h1>
                    <p class="page-subtitle">Manage and track support requests</p>
                </div>
            </div>

            <!-- Statistics Cards -->
            <div class="statistics-section mb-4">
                <div class="row">
                    <div class="col-md-3 col-sm-6 mb-3">
                        <div class="stat-card-simple">
                            <span class="stat-number">{{ statistics.total || 0 }}</span>
                            <span class="stat-label">Total Tickets</span>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 mb-3">
                        <div class="stat-card-simple">
                            <span class="stat-number">{{ statistics.pending || 0 }}</span>
                            <span class="stat-label">Pending</span>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 mb-3">
                        <div class="stat-card-simple">
                            <span class="stat-number">{{ statistics.in_progress || 0 }}</span>
                            <span class="stat-label">In Progress</span>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6 mb-3">
                        <div class="stat-card-simple">
                            <span class="stat-number">{{ statistics.resolved || 0 }}</span>
                            <span class="stat-label">Resolved</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filters and Search -->
            <div class="filters-section mb-4">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-4 mb-3 mb-md-0">
                                <div class="search-box">
                                    <i class="fas fa-search search-icon"></i>
                                    <input
                                        type="text"
                                        class="form-control search-input"
                                        placeholder="Search tickets..."
                                        v-model="filters.search"
                                        @input="debouncedSearch"
                                    />
                                </div>
                            </div>
                            <div class="col-md-2 mb-3 mb-md-0">
                                <select class="form-select" v-model="filters.status" @change="applyFilters">
                                    <option value="">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="resolved">Resolved</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>
                            <div class="col-md-2 mb-3 mb-md-0">
                                <select class="form-select" v-model="filters.priority" @change="applyFilters">
                                    <option value="">All Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div class="col-md-2 mb-3 mb-md-0">
                                <select class="form-select" v-model="filters.per_page" @change="applyFilters">
                                    <option value="15">15 per page</option>
                                    <option value="25">25 per page</option>
                                    <option value="50">50 per page</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <button class="btn btn-outline-secondary w-100" @click="clearFilters">
                                    <i class="fas fa-times"></i>
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tickets Table -->
            <div class="tickets-section">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">
                            <i class="fas fa-list me-2"></i>
                            Support Tickets
                        </h5>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table mb-0">
                                <thead class="table-header">
                                    <tr>
                                        <th>Ticket #</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Subject</th>
                                        <th>Status</th>
                                        <th>Priority</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="tickets.length === 0 && !isLoading">
                                        <td colspan="8" class="text-center py-4">
                                            <div class="empty-state">
                                                <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                                                <h5 class="text-muted">No tickets found</h5>
                                                <p class="text-muted">No support tickets match your current filters.</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-for="ticket in tickets" :key="ticket.id" class="ticket-row">
                                        <td>
                                            <span class="ticket-number">{{ ticket.ticket_number || 'N/A' }}</span>
                                        </td>
                                        <td>
                                            <div class="user-info">
                                                <span class="user-name">{{ ticket.name }}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span class="user-email">{{ ticket.email }}</span>
                                        </td>
                                        <td>
                                            <div class="subject-text" :title="ticket.subject">
                                                {{ ticket.subject }}
                                            </div>
                                        </td>
                                        <td>
                                            <span :class="getStatusTextClass(ticket.status)">
                                                {{ formatStatus(ticket.status) }}
                                            </span>
                                        </td>
                                        <td>
                                            <span :class="getPriorityTextClass(ticket.priority)">
                                                {{ formatPriority(ticket.priority) }}
                                            </span>
                                        </td>
                                        <td>
                                            <span class="date-text">{{ formatDate(ticket.created_at) }}</span>
                                        </td>
                                        <td>
                                            <div class="action-buttons">
                                                <button
                                                    class="btn btn-sm btn-outline-primary"
                                                    @click="viewTicket(ticket)"
                                                    title="View Details"
                                                >
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                                <button
                                                    class="btn btn-sm btn-outline-warning"
                                                    @click="editTicket(ticket)"
                                                    title="Edit Ticket"
                                                >
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button
                                                    class="btn btn-sm btn-outline-danger"
                                                    @click="deleteTicket(ticket)"
                                                    title="Delete Ticket"
                                                >
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

            <!-- Pagination -->
            <div class="pagination-section mt-4" v-if="pagination.total > pagination.per_page">
                <nav aria-label="Support tickets pagination">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
                            <button class="page-link" @click="changePage(pagination.current_page - 1)" :disabled="pagination.current_page === 1">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                        </li>
                        <li
                            v-for="page in visiblePages"
                            :key="page"
                            class="page-item"
                            :class="{ active: page === pagination.current_page }"
                        >
                            <button class="page-link" @click="changePage(page)">
                                {{ page }}
                            </button>
                        </li>
                        <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
                            <button class="page-link" @click="changePage(pagination.current_page + 1)" :disabled="pagination.current_page === pagination.last_page">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <!-- Create/Edit Ticket Modal -->
        <div class="modal fade" id="ticketModal" tabindex="-1" aria-labelledby="ticketModalLabel" aria-hidden="true" @click="handleBackdropClick('ticketModal', $event)">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ticketModalLabel">
                            {{ isEditing ? 'Edit Ticket' : 'Create New Ticket' }}
                        </h5>
                        <button type="button" class="btn-close" @click="hideModal('ticketModal')" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveTicket">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="name" class="form-label">Name *</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="name"
                                        v-model="form.name"
                                        required
                                    />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="email" class="form-label">Email *</label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="email"
                                        v-model="form.email"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="subject" class="form-label">Subject *</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="subject"
                                    v-model="form.subject"
                                    required
                                />
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="priority" class="form-label">Priority</label>
                                    <select class="form-select" id="priority" v-model="form.priority">
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                <div class="col-md-6 mb-3" v-if="isEditing">
                                    <label for="status" class="form-label">Status</label>
                                    <select class="form-select" id="status" v-model="form.status">
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="message" class="form-label">Message *</label>
                                <textarea
                                    class="form-control"
                                    id="message"
                                    rows="5"
                                    v-model="form.message"
                                    required
                                ></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="hideModal('ticketModal')">
                            Cancel
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="saveTicket"
                            :disabled="isSaving"
                        >
                            <i class="fas fa-spinner fa-spin" v-if="isSaving"></i>
                            {{ isSaving ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- View Ticket Modal -->
        <div class="modal fade" id="viewModal" tabindex="-1" aria-labelledby="viewModalLabel" aria-hidden="true" @click="handleBackdropClick('viewModal', $event)">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="viewModalLabel">
                            Ticket Details - {{ selectedTicket && selectedTicket.ticket_number }}
                        </h5>
                        <button type="button" class="btn-close" @click="hideModal('viewModal')" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div v-if="selectedTicket">
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <strong>Name:</strong> {{ selectedTicket.name }}
                                </div>
                                <div class="col-md-6">
                                    <strong>Email:</strong> {{ selectedTicket.email }}
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <strong>Status:</strong>
                                    <span class="ms-2" :class="getStatusTextClass(selectedTicket.status)">
                                        {{ formatStatus(selectedTicket.status) }}
                                    </span>
                                </div>
                                <div class="col-md-6">
                                    <strong>Priority:</strong>
                                    <span class="ms-2" :class="getPriorityTextClass(selectedTicket.priority)">
                                        {{ formatPriority(selectedTicket.priority) }}
                                    </span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <strong>Subject:</strong>
                                <p class="mt-1">{{ selectedTicket.subject }}</p>
                            </div>
                            <div class="mb-3">
                                <strong>Message:</strong>
                                <div class="message-content mt-2">
                                    {{ selectedTicket.message }}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <strong>Created:</strong> {{ formatDate(selectedTicket.created_at) }}
                                </div>
                                <div class="col-md-6">
                                    <strong>Updated:</strong> {{ formatDate(selectedTicket.updated_at) }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="hideModal('viewModal')">
                            Close
                        </button>
                        <button type="button" class="btn btn-primary" @click="editTicket(selectedTicket)">
                            Edit Ticket
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" @click="handleBackdropClick('deleteModal', $event)">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteModalLabel">
                            <i class="fas fa-exclamation-triangle text-warning me-2"></i>
                            Confirm Delete
                        </h5>
                        <button type="button" class="btn-close" @click="hideModal('deleteModal')" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div v-if="selectedTicket">
                            <p class="mb-3">Are you sure you want to delete this ticket?</p>
                            <div class="alert alert-warning">
                                <strong>Ticket:</strong> {{ selectedTicket.subject }}<br>
                                <strong>From:</strong> {{ selectedTicket.name }} ({{ selectedTicket.email }})<br>
                                <strong>Status:</strong> {{ formatStatus(selectedTicket.status) }}<br>
                                <strong>Priority:</strong> {{ formatPriority(selectedTicket.priority) }}
                            </div>
                            <p class="text-muted small">This action cannot be undone.</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="hideModal('deleteModal')">
                            Cancel
                        </button>
                        <button type="button" class="btn btn-danger" @click="confirmDelete">
                            <i class="fas fa-trash me-1"></i>
                            Delete Ticket
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Support",
    data() {
        return {
            // Loading states
            isLoading: true,
            isSaving: false,

            // Data
            tickets: [],
            statistics: {},
            selectedTicket: null,

            // Pagination
            pagination: {
                current_page: 1,
                last_page: 1,
                per_page: 15,
                total: 0
            },

            // Filters
            filters: {
                search: '',
                status: '',
                priority: '',
                per_page: 15
            },

            // Form data
            form: {
                id: null,
                name: '',
                email: '',
                subject: '',
                message: '',
                status: 'pending',
                priority: 'medium'
            },

            // Modal states
            isEditing: false,

            // Search debounce
            searchTimeout: null
        };
    },

    computed: {
        visiblePages() {
            const current = this.pagination.current_page;
            const last = this.pagination.last_page;
            const pages = [];
            
            let start = Math.max(1, current - 2);
            let end = Math.min(last, current + 2);
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            
            return pages;
        }
    },

    mounted() {
        this.loadData();
        this.loadStatistics();
    },

    methods: {
        async loadData() {
            try {
                this.isLoading = true;
                const params = {
                    page: this.pagination.current_page,
                    per_page: this.filters.per_page
                };

                // Only add non-empty filters
                if (this.filters.search && this.filters.search.trim() !== '') {
                    params.search = this.filters.search;
                }
                if (this.filters.status && this.filters.status !== '') {
                    params.status = this.filters.status;
                }
                if (this.filters.priority && this.filters.priority !== '') {
                    params.priority = this.filters.priority;
                }

                const response = await axios.get('support', { params });
                
                if (response.data && response.data.success) {
                    // Handle different response structures
                    let ticketsData = [];
                    
                    if (response.data.data && response.data.data.data) {
                        // Laravel pagination structure: { success: true, data: { data: [...] } }
                        ticketsData = response.data.data.data;
                    } else if (response.data.data && Array.isArray(response.data.data)) {
                        // Direct array structure: { success: true, data: [...] }
                        ticketsData = response.data.data;
                    } else if (Array.isArray(response.data)) {
                        // Direct response array
                        ticketsData = response.data;
                    }
                    
                    this.tickets = ticketsData;
                    
                    // Set pagination if available
                    if (response.data.data && response.data.data.current_page) {
                        this.pagination = {
                            current_page: response.data.data.current_page || 1,
                            last_page: response.data.data.last_page || 1,
                            per_page: response.data.data.per_page || 15,
                            total: response.data.data.total || ticketsData.length
                        };
                    } else {
                        this.pagination = {
                            current_page: 1,
                            last_page: 1,
                            per_page: 15,
                            total: ticketsData.length
                        };
                    }
                } else {
                    console.error('API response not successful:', response.data);
                    this.tickets = [];
                }
            } catch (error) {
                console.error('Error loading tickets:', error);
                console.error('Error details:', error.response);
                this.showError('Failed to load support tickets: ' + (error.message || 'Unknown error'));
                this.tickets = [];
            } finally {
                this.isLoading = false;
            }
        },

        async loadStatistics() {
            try {
                const response = await axios.get('support/statistics');
                if (response.data.success) {
                    this.statistics = response.data.data;
                }
            } catch (error) {
                console.error('Error loading statistics:', error);
            }
        },

        goBack() {
            // Go back to previous page in browser history
            if (window.history.length > 1) {
                this.$router.go(-1);
            } else {
                // Fallback to dashboard if no history
                this.$router.push('/app/Members/ViewAllMembers');
            }
        },

        applyFilters() {
            this.pagination.current_page = 1;
            this.loadData();
        },

        debouncedSearch() {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.applyFilters();
            }, 500);
        },

        clearFilters() {
            this.filters = {
                search: '',
                status: '',
                priority: '',
                per_page: 15
            };
            this.applyFilters();
        },

        changePage(page) {
            if (page >= 1 && page <= this.pagination.last_page) {
                this.pagination.current_page = page;
                this.loadData();
            }
        },

        openCreateModal() {
            this.isEditing = false;
            this.form = {
                id: null,
                name: '',
                email: '',
                subject: '',
                message: '',
                status: 'pending',
                priority: 'medium'
            };
            this.showModal('ticketModal');
        },

        viewTicket(ticket) {
            this.selectedTicket = ticket;
            this.showModal('viewModal');
        },

        editTicket(ticket) {
            this.isEditing = true;
            this.form = { ...ticket };
            this.hideModal('viewModal');
            this.showModal('ticketModal');
        },

        async saveTicket() {
            try {
                this.isSaving = true;
                
                const url = this.isEditing 
                    ? `support/${this.form.id}` 
                    : 'support';
                
                const method = this.isEditing ? 'put' : 'post';
                
                const response = await axios[method](url, this.form);
                
                if (response.data.success) {
                    console.log('Ticket saved successfully:', response.data); // Debug log
                    this.showSuccess(
                        this.isEditing 
                            ? 'Ticket updated successfully' 
                            : 'Ticket created successfully'
                    );
                    this.hideModal('ticketModal');
                    
                    // Reset form
                    this.form = {
                        id: null,
                        name: '',
                        email: '',
                        subject: '',
                        message: '',
                        status: 'pending',
                        priority: 'medium'
                    };
                    this.isEditing = false;
                    
                    // Refresh data
                    await this.loadData();
                    
                    // Force a small delay to ensure data is loaded
                    setTimeout(() => {
                        console.log('Final tickets count:', this.tickets.length);
                        if (this.tickets.length === 0) {
                            console.log('No tickets found, forcing reload...');
                            this.loadData();
                        }
                    }, 500);
                }
            } catch (error) {
                console.error('Error saving ticket:', error);
                this.showError('Failed to save ticket');
            } finally {
                this.isSaving = false;
            }
        },

        async deleteTicket(ticket) {
            this.selectedTicket = ticket;
            this.showModal('deleteModal');
        },

        async confirmDelete() {
            if (!this.selectedTicket) return;
            
            try {
                const response = await axios.delete(`support/${this.selectedTicket.id}`);
                
                if (response.data.success) {
                    this.showSuccess('Ticket deleted successfully');
                    this.hideModal('deleteModal');
                    this.loadData();
                }
            } catch (error) {
                console.error('Error deleting ticket:', error);
                this.showError('Failed to delete ticket');
            }
        },

        showModal(modalId) {
            // Wait for DOM to be ready
            this.$nextTick(() => {
                const modalElement = document.getElementById(modalId);
                if (modalElement) {
                    modalElement.style.display = 'block';
                    modalElement.classList.add('show');
                    document.body.classList.add('modal-open');
                    
                    // Add backdrop
                    const backdrop = document.createElement('div');
                    backdrop.className = 'modal-backdrop fade show';
                    backdrop.id = 'modal-backdrop';
                    backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Dark semi-transparent overlay
                    document.body.appendChild(backdrop);
                }
            });
        },

        hideModal(modalId) {
            const modalElement = document.getElementById(modalId);
            if (modalElement) {
                modalElement.style.display = 'none';
                modalElement.classList.remove('show');
                document.body.classList.remove('modal-open');
                
                // Remove backdrop
                const backdrop = document.getElementById('modal-backdrop');
                if (backdrop) {
                    backdrop.remove();
                }
            }
        },

        handleBackdropClick(modalId, event) {
            // Only close if clicking on the backdrop (not the modal content)
            if (event.target.id === modalId) {
                this.hideModal(modalId);
            }
        },

        getStatusTextClass(status) {
            const classes = {
                'pending': 'text-warning',
                'in_progress': 'text-info',
                'resolved': 'text-success',
                'closed': 'text-secondary'
            };
            return classes[status] || 'text-muted';
        },

        getPriorityTextClass(priority) {
            const classes = {
                'low': 'text-success',
                'medium': 'text-warning',
                'high': 'text-danger'
            };
            return classes[priority] || 'text-muted';
        },

        formatStatus(status) {
            return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
        },

        formatPriority(priority) {
            return priority.charAt(0).toUpperCase() + priority.slice(1);
        },

        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },

        showSuccess(message) {
            try {
                if (this.$root && this.$root.$bvToast) {
                    this.$root.$bvToast.toast(message, {
                        title: "Success",
                        variant: "success",
                        solid: true,
                    });
                } else {
                    // Fallback to console log if toast is not available
                    console.log("Success:", message);
                    alert("Success: " + message);
                }
            } catch (error) {
                console.log("Success:", message);
                alert("Success: " + message);
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
                } else {
                    // Fallback to console log if toast is not available
                    console.error("Error:", message);
                    alert("Error: " + message);
                }
            } catch (error) {
                console.error("Error:", message);
                alert("Error: " + message);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

.support-page-wrapper {
    min-height: 100vh;
    background-color: #f5f5f3;
    padding: 20px;
}

// Modal backdrop styling
:deep(.modal-backdrop) {
    background-color: rgba(0, 0, 0, 0.5) !important;
    opacity: 1 !important;
}

// Modal styling
:deep(.modal) {
    z-index: 1050;
}

:deep(.modal-dialog) {
    margin: 1.75rem auto;
    max-width: 500px;
}

:deep(.modal-content) {
    border: none;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

:deep(.modal-header) {
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
    border-radius: 8px 8px 0 0;
}

:deep(.modal-body) {
    padding: 1.5rem;
}

:deep(.modal-footer) {
    background-color: #f8f9fa;
    border-top: 1px solid #dee2e6;
    border-radius: 0 0 8px 8px;
}

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
            color: #dc3545;
        }
        
        .loading-text {
            margin-top: 20px;
            color: #6a6a6a;
            font-size: 18px;
        }
    }
}

.page-header {
    margin-bottom: 30px;
    
    .breadcrumb-nav-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
}

// Breadcrumb Section Styles
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

.breadcrumb {
    background: transparent;
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.breadcrumb-item {
    display: flex;
    align-items: center;
    
    + .breadcrumb-item::before {
        content: "/";
        padding: 0 8px;
        color: #6c757d;
    }
    
    a {
        color: $primary;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: color 0.3s ease;
        
        &:hover {
            color: color.adjust($primary, $lightness: -10%);
            text-decoration: none;
        }
        
        i {
            font-size: 0.875rem;
        }
    }
    
    &.active {
        color: #6c757d;
        font-weight: 500;
        
        i {
            color: $primary;
            margin-right: 6px;
        }
    }
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
    
    &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
    }
}

.page-title-section {
    margin-top: 20px;
    
    .page-title {
        font-size: 32px;
        font-weight: 700;
        color: #252525;
        margin-bottom: 8px;
        
        i {
            color: #dc3545;
        }
    }
    
    .page-subtitle {
        color: #6a6a6a;
        font-size: 18px;
        margin-bottom: 0;
        
        .debug-info {
            color: #dc3545;
            font-weight: 600;
            font-size: 14px;
        }
    }
}

.statistics-section {
    .stat-card-simple {
        background: #ffffff;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        border: 1px solid #e0e0e0;
        text-align: center;
        
        .stat-number {
            display: block;
            font-size: 28px;
            font-weight: 700;
            color: #dc3545;
            margin-bottom: 5px;
        }
        
        .stat-label {
            display: block;
            font-size: 14px;
            color: #6c757d;
            font-weight: 500;
            margin: 0;
        }
    }
    
    .stat-card {
        background: #ffffff;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        border: 1px solid #e0e0e0;
        transition: none; // Remove transitions
        
        .stat-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
            
            i {
                font-size: 20px;
                color: #ffffff;
            }
            
            &.warning {
                background: #ff9800;
            }
            
            &.info {
                background: #2196f3;
            }
            
            &.success {
                background: #4caf50;
            }
            
            &:not(.warning):not(.info):not(.success) {
                background: #dc3545;
            }
        }
        
        .stat-content {
            .stat-number {
                font-size: 24px;
                font-weight: 700;
                color: #252525;
                margin-bottom: 8px;
            }
            
            .stat-label {
                color: #6a6a6a;
                font-size: 14px;
                margin-bottom: 0;
            }
        }
    }
}

.filters-section {
    .card {
        border: 1px solid #e0e0e0;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        
        .search-box {
            position: relative;
            
            .search-icon {
                position: absolute;
                left: 12px;
                top: 50%;
                transform: translateY(-50%);
                color: #6a6a6a;
                z-index: 2;
            }
            
            .search-input {
                padding-left: 40px;
                border: 1px solid #cccccc;
                border-radius: 4px;
                
                &:focus {
                    border-color: #dc3545;
                    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
                }
            }
        }
        
        .form-select {
            border: 1px solid #cccccc;
            border-radius: 4px;
            
            &:focus {
                border-color: #dc3545;
                box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
            }
        }
    }
}

.tickets-section {
    .card {
        border: 1px solid #e0e0e0;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        
        .card-header {
            background: #ffffff;
            border-bottom: 1px solid #e0e0e0;
            
            .card-title {
                color: #252525;
                font-weight: 600;
                
                i {
                    color: #dc3545;
                }
            }
        }
        
        .table-header {
            background: #eaeaea;
            
            th {
                border-bottom: 1px solid #e0e0e0;
                font-weight: 600;
                color: #252525;
                padding: 10px 20px;
            }
        }
        
        .ticket-row {
            transition: background-color 0.2s ease;
            
            &:hover {
                background-color: #eaeaea;
            }
            
            td {
                padding: 10px 20px;
                vertical-align: middle;
                border-bottom: 1px solid #e0e0e0;
            }
        }
        
        .ticket-number {
            font-family: 'Courier New', monospace;
            font-weight: 600;
            color: #dc3545;
        }
        
        .user-name {
            font-weight: 500;
            color: #252525;
        }
        
        .user-email {
            color: #6a6a6a;
            font-size: 14px;
        }
        
        .subject-text {
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #010101;
        }
        
        // Status and Priority text styling
        .text-warning {
            font-weight: 600;
            color: #ffc107 !important;
        }
        
        .text-info {
            font-weight: 600;
            color: #17a2b8 !important;
        }
        
        .text-success {
            font-weight: 600;
            color: #28a745 !important;
        }
        
        .text-danger {
            font-weight: 600;
            color: #dc3545 !important;
        }
        
        .text-secondary {
            font-weight: 600;
            color: #6c757d !important;
        }
        
        .text-muted {
            font-weight: 500;
            color: #6c757d !important;
        }
        
        .date-text {
            color: #6a6a6a;
            font-size: 14px;
        }
        
        .action-buttons {
            display: flex;
            gap: 8px;
            
            .btn {
                padding: 8px;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                
                i {
                    font-size: 11px;
                }
            }
        }
        
        .empty-state {
            padding: 40px;
            
            i {
                opacity: 0.5;
            }
            
            h5 {
                margin-bottom: 10px;
            }
        }
    }
}

.pagination-section {
    .pagination {
        .page-link {
            color: #dc3545;
            border-color: #cccccc;
            
            &:hover {
                color: #ffffff;
                background-color: #dc3545;
                border-color: #dc3545;
            }
        }
        
        .page-item.active .page-link {
            background-color: #dc3545;
            border-color: #dc3545;
        }
        
        .page-item.disabled .page-link {
            color: #6a6a6a;
            background-color: #f5f5f3;
            border-color: #cccccc;
        }
    }
}

.modal {
    .modal-content {
        border: none;
        border-radius: 8px;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
    }
    
    .modal-header {
        border-bottom: 1px solid #e0e0e0;
        background: #eaeaea;
        
        .modal-title {
            color: #252525;
            font-weight: 600;
        }
    }
    
    .modal-body {
        .form-label {
            font-weight: 500;
            color: #252525;
            margin-bottom: 8px;
        }
        
        .form-control, .form-select {
            border: 1px solid #cccccc;
            border-radius: 4px;
            
            &:focus {
                border-color: #dc3545;
                box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
            }
        }
        
        .message-content {
            background: #eaeaea;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #e0e0e0;
            white-space: pre-wrap;
            font-size: 14px;
            line-height: 1.4;
        }
    }
    
    .modal-footer {
        border-top: 1px solid #e0e0e0;
        background: #eaeaea;
    }
}

.badge {
    font-size: 11px;
    font-weight: 500;
    padding: 8px 10px;
    border-radius: 4px;
}

// Responsive adjustments
@media (max-width: 768px) {
    .support-page-wrapper {
        padding: 10px;
    }
    
    .statistics-section {
        .stat-card {
            margin-bottom: 10px;
        }
    }
    
    .filters-section {
        .row > div {
            margin-bottom: 10px;
        }
    }
    
    .tickets-section {
        .table-responsive {
            font-size: 14px;
        }
        
        .action-buttons {
            flex-direction: column;
            gap: 8px;
        }
    }
}
</style>