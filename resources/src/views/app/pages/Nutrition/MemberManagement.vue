<template>
    <div class="member-management-wrapper">
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
                                    <i class="fas fa-utensils"></i>
                                    Nutrition Hub
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
            <div class="page-header">
                <h1 class="page-title">Member Management</h1>
                
                <!-- Instructions Section -->
                <div class="instructions-section mb-4">
                    <h3 class="instructions-title">Member Management Instructions</h3>
                    <p class="instructions-text">
                        View and manage all members here. Use filters or email members as needed.
                    </p>
                </div>

                <!-- Search Bar -->
                <div class="search-section mb-3">
                    <div class="search-field-container">
                        <div class="search-field">
                            <i class="fas fa-search search-icon" v-if="!searchQuery"></i>
                            <i class="fas fa-times search-clear" v-else @click="clearSearch" title="Clear search"></i>
                            <input
                                type="text"
                                placeholder="Search..."
                                class="search-input"
                                v-model="searchQuery"
                                @input="handleSearch"
                            />
                        </div>
                    </div>
                </div>

                <!-- Filters and Actions Row -->
                <div class="filters-actions-row mb-3">
                    <div class="filters-container d-flex flex-wrap gap-2 align-items-center">
                        <!-- Gender Filter -->
                        <b-dropdown
                            right
                            class="filter-dropdown"
                            no-caret
                            :text="getGenderDisplay()"
                        >
                            <b-dropdown-item @click="setGenderFilter('')">All Genders</b-dropdown-item>
                            <b-dropdown-item @click="setGenderFilter('male')">Male</b-dropdown-item>
                            <b-dropdown-item @click="setGenderFilter('female')">Female</b-dropdown-item>
                        </b-dropdown>

                        <!-- Active Status Filter -->
                        <b-dropdown
                            right
                            class="filter-dropdown"
                            no-caret
                            :text="getActiveStatusDisplay()"
                        >
                            <b-dropdown-item @click="setActiveStatusFilter('')">All</b-dropdown-item>
                            <b-dropdown-item @click="setActiveStatusFilter('active')">Active</b-dropdown-item>
                            <b-dropdown-item @click="setActiveStatusFilter('inactive')">Inactive</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="loading-state text-center py-5">
                <div class="spinner spinner-primary"></div>
                <p class="mt-2">Loading members...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="error-state text-center py-5">
                <i class="fas fa-exclamation-triangle text-danger" style="font-size: 48px;"></i>
                <h4 class="mt-3">Error loading members</h4>
                <p class="text-muted">{{ error }}</p>
                <button @click="fetchMembers" class="btn btn-primary mt-3">Retry</button>
            </div>

            <!-- Members Table -->
            <div v-else class="members-table-card">
                <div class="card-body p-0 p-sm-3">
                    <!-- Empty State -->
                    <div v-if="members.length === 0" class="text-center py-5">
                        <i class="fas fa-users" style="font-size: 48px; color: #ccc;"></i>
                        <h4 class="mt-3">No members found</h4>
                        <p class="text-muted">
                            <span v-if="searchQuery">No members match your search for "{{ searchQuery }}".</span>
                            <span v-else>Try adjusting your filters.</span>
                        </p>
                    </div>

                    <!-- Table -->
                    <div v-else class="table-responsive">
                        <table class="table table-hover members-table">
                            <thead>
                                <tr>
                                    <th class="table-header text-left">Member</th>
                                    <th class="table-header text-left">Coach</th>
                                    <th class="table-header text-left">Cellphone</th>
                                    <th class="table-header text-left">Start Weight</th>
                                    <th class="table-header text-left">Gender</th>
                                    <th class="table-header text-center">Active</th>
                                    <th class="table-header text-left">Member Since</th>
                                    <th class="table-header text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="member in members" :key="member.id" class="table-row">
                                    <!-- Member Column -->
                                    <td class="table-cell text-left">
                                        <router-link 
                                            :to="`/app/nutrition/members/${member.id}`"
                                            class="member-link"
                                        >
                                            {{ formatMemberName(member) }}
                                        </router-link>
                                    </td>

                                    <!-- Coach Column -->
                                    <td class="table-cell text-left">
                                        {{ member.coach || '-' }}
                                    </td>

                                    <!-- Phone Column -->
                                    <td class="table-cell text-left">
                                        {{ member.mobile_phone || member.phone || '-' }}
                                    </td>

                                    <!-- Start Weight Column -->
                                    <td class="table-cell text-left">
                                        {{ member.start_weight || '-' }}
                                    </td>

                                    <!-- Gender Column -->
                                    <td class="table-cell text-left">
                                        {{ member.gender ? member.gender.charAt(0).toUpperCase() + member.gender.slice(1) : '-' }}
                                    </td>

                                    <!-- Active Column -->
                                    <td class="table-cell text-center">
                                        <i v-if="member.status === 'active' || member.Statuses === 'active'" class="fas fa-check text-success"></i>
                                        <i v-else class="fas fa-times text-danger"></i>
                                    </td>

                                    <!-- Date Added Column -->
                                    <td class="table-cell text-left">
                                        {{ formatDate(member.created_at) }}
                                    </td>

                                    <!-- Actions Column -->
                                    <td class="table-cell text-center" @click.stop>
                                        <div class="action-icons d-flex justify-content-center gap-3">
                                            <router-link 
                                                :to="`/app/nutrition/members/${member.id}`"
                                                class="action-icon edit-icon"
                                                title="Edit"
                                            >
                                                <i class="fas fa-edit"></i>
                                            </router-link>
                                            <a 
                                                href="#"
                                                class="action-icon email-icon"
                                                title="Email"
                                                @click.prevent="emailMember(member)"
                                            >
                                                <i class="fas fa-envelope"></i>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div v-if="members.length > 0 && totalPages > 1" class="pagination-container mt-3">
                        <div class="pagination-controls d-flex justify-content-between align-items-center">
                            <div class="pagination-info">
                                <span class="pagination-text">
                                    Page {{ currentPage }} of {{ totalPages }}
                                </span>
                            </div>
                            <div class="pagination-buttons d-flex gap-2">
                                <button
                                    class="btn btn-sm btn-outline-secondary"
                                    :disabled="currentPage === 1"
                                    @click="goToPage(currentPage - 1)"
                                >
                                    <i class="fas fa-chevron-left"></i>
                                    Previous
                                </button>
                                <button
                                    class="btn btn-sm btn-outline-secondary"
                                    :disabled="currentPage >= totalPages"
                                    @click="goToPage(currentPage + 1)"
                                >
                                    Next
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

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
    </div>
</template>

<script>
import axios from 'axios';
import NProgress from 'nprogress';

export default {
    name: 'MemberManagement',
    metaInfo: {
        title: 'Member Management - Nutrition Hub',
    },
    data() {
        return {
            loading: false,
            error: null,
            members: [],
            searchQuery: '',
            genderFilter: '',
            activeStatusFilter: '',
            currentPage: 1,
            perPage: 25,
            totalRows: 0,
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
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalRows / this.perPage);
        },
    },
    mounted() {
        this.fetchMembers();
    },
    methods: {
        goBack() {
            this.$router.push('/app/nutrition');
        },
        async fetchMembers() {
            this.loading = true;
            this.error = null;
            NProgress.start();

            try {
                const params = {
                    page: this.currentPage,
                    limit: this.perPage,
                    name: this.searchQuery || '',
                    gender: this.genderFilter || '',
                    status: this.activeStatusFilter || '',
                };

                const response = await axios.get('members', { params });
                
                if (response.data && response.data.clients) {
                    this.members = response.data.clients;
                    this.totalRows = response.data.totalRows || response.data.total || response.data.count || this.members.length;
                } else {
                    this.members = [];
                    this.totalRows = 0;
                }
            } catch (error) {
                console.error('Error fetching members:', error);
                this.error = error.response?.data?.message || 'Failed to load members. Please try again.';
                this.members = [];
                this.totalRows = 0;
            } finally {
                this.loading = false;
                NProgress.done();
            }
        },
        handleSearch() {
            // Debounce search
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.currentPage = 1;
                this.fetchMembers();
            }, 500);
        },
        clearSearch() {
            this.searchQuery = '';
            this.currentPage = 1;
            this.fetchMembers();
        },
        setGenderFilter(value) {
            this.genderFilter = value;
            this.currentPage = 1;
            this.fetchMembers();
        },
        setActiveStatusFilter(value) {
            this.activeStatusFilter = value;
            this.currentPage = 1;
            this.fetchMembers();
        },
        getGenderDisplay() {
            if (!this.genderFilter) return 'All Genders';
            return this.genderFilter.charAt(0).toUpperCase() + this.genderFilter.slice(1);
        },
        getActiveStatusDisplay() {
            if (!this.activeStatusFilter) return 'All';
            return this.activeStatusFilter.charAt(0).toUpperCase() + this.activeStatusFilter.slice(1);
        },
        formatMemberName(member) {
            if (member.membername) return member.membername;
            if (member.first_name || member.last_name) {
                return `${member.last_name || ''}, ${member.first_name || ''}`.trim();
            }
            return member.name || 'Unknown';
        },
        formatDate(date) {
            if (!date) return '-';
            const d = new Date(date);
            return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
        },
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                this.fetchMembers();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        },
        emailMember(member) {
            // Set form data from member
            this.mailForm.to = member.email || "";
            this.mailForm.recipientName = this.formatMemberName(member);
            this.mailForm.subject = "";
            this.mailForm.message = "";
            this.mailForm.template = null;
            this.mailForm.sending = false;
            this.mailForm.memberId = member.id || null;
            
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
    },
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@import '../../../../assets/styles/sass/_variables.scss';

.member-management-wrapper {
    padding: 1rem;

    .breadcrumb-nav-row {
        margin-bottom: 1.5rem;

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
    }

    .main-content {
        .page-header {
            margin-bottom: 2rem;

            .page-title {
                font-size: 2rem;
                font-weight: 600;
                margin-bottom: 1.5rem;
                color: $dark;
            }

            .instructions-section {
                background-color: #f8f9fa;
                padding: 1.5rem;
                border-radius: 0.5rem;
                border-left: 4px solid $primary;

                .instructions-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    color: $dark;
                }

                .instructions-text {
                    color: $text-muted;
                    line-height: 1.6;
                    margin-bottom: 0;
                }
            }

            .search-section {
                .search-field-container {
                    max-width: 400px;

                    .search-field {
                        position: relative;

                        .search-icon,
                        .search-clear {
                            position: absolute;
                            left: 1rem;
                            top: 50%;
                            transform: translateY(-50%);
                            color: $text-muted;
                            z-index: 1;
                        }

                        .search-clear {
                            cursor: pointer;
                            left: auto;
                            right: 1rem;

                            &:hover {
                                color: $danger;
                            }
                        }

                        .search-input {
                            width: 100%;
                            padding: 0.75rem 1rem 0.75rem 2.5rem;
                            border: 1px solid #dee2e6;
                            border-radius: 0.25rem;
                            font-size: 1rem;
                            color: $dark;
                            background-color: #fff;

                            &::placeholder {
                                color: $text-muted;
                                opacity: 1;
                            }

                            &:focus {
                                outline: none;
                                border-color: $primary;
                                box-shadow: 0 0 0 0.2rem rgba($primary, 0.25);
                            }
                        }
                    }
                }
            }

            .filters-actions-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 1rem;

                .filters-container {
                    flex: 1;
                    min-width: 300px;

                    .filter-dropdown {
                        min-width: 150px;
                    }

                }

                .actions-container {
                    flex-shrink: 0;
                }
            }
        }

        .loading-state,
        .error-state {
            padding: 3rem 1rem;
        }

        .members-table-card {
            background: white;
            border-radius: 0.5rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

            .members-table {
                margin-bottom: 0;

                .table-header {
                    font-weight: 600;
                    color: $dark;
                    background-color: #f8f9fa;
                    padding: 1rem;
                    border-bottom: 2px solid #dee2e6;
                    white-space: nowrap;
                }

                .table-row {
                    transition: background-color 0.15s ease;

                    &:hover {
                        background-color: #f8f9fa;
                    }

                    .table-cell {
                        padding: 1rem;
                        vertical-align: middle;
                        border-bottom: 1px solid #e9ecef;

                        .member-link,
                        .coach-link {
                            color: $primary;
                            text-decoration: none;
                            font-weight: 500;

                            &:hover {
                                text-decoration: underline;
                            }
                        }

                        .action-icons {
                            gap: 1rem; // Additional gap for better spacing
            
                            .action-icon {
                                color: $text-muted;
                                font-size: 1.1rem;
                                text-decoration: none;
                                transition: color 0.2s ease;
                                margin: 0 0.25rem; // Add margin for extra spacing

                                &:hover {
                                    color: $primary;
                                }

                                &.edit-icon:hover {
                                    color: $info;
                                }

                                &.email-icon:hover {
                                    color: $success;
                                }
                            }
                        }
                    }
                }
            }

            .pagination-container {
                padding: 1rem;
                border-top: 1px solid #e9ecef;

                .pagination-controls {
                    .pagination-info {
                        .pagination-text {
                            color: $text-muted;
                            font-size: 0.9rem;
                        }
                    }
                }
            }
        }
    }
}

// Responsive design
@media (max-width: 768px) {
    .member-management-wrapper {
        .main-content {
            .page-header {
                .filters-actions-row {
                    flex-direction: column;
                    align-items: stretch;

                    .filters-container {
                        flex-direction: column;
                        align-items: stretch;
                    }

                    .actions-container {
                        width: 100%;
                        flex-direction: column;

                        .btn {
                            width: 100%;
                        }
                    }
                }
            }

            .members-table-card {
                .table-responsive {
                    overflow-x: auto;
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
</style>

