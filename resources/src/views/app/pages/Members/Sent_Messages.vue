<template>
    <div class="sent-messages-page">
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
                                <router-link to="/app/Members/ViewAllMembers">
                                    <i class="fas fa-users"></i>
                                    Members
                                </router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                <i class="fas fa-envelope"></i>
                                Sent Messages
                            </li>
                        </ol>
                    </div>
                </nav>
            </div>
        </div>

        <!-- Main Container -->
        <div class="container-fluid">
            <div class="row">
                <!-- Sidebar -->
                <div class="col-md-3 col-lg-2">
                    <div class="sidebar">
                        <nav class="nav nav-pills flex-column">
                            <router-link 
                                to="/app/Members/send-message" 
                                class="nav-link mb-2"
                            >
                                <i class="fas fa-inbox mr-2"></i>
                                Inbox
                            </router-link>
                            <a 
                                class="nav-link mb-2 active" 
                                href="#"
                            >
                                <i class="fas fa-paper-plane mr-2"></i>
                                Sent messages
                            </a>
                        </nav>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="col-md-9 col-lg-10">
                    <div class="main-content">
                        <!-- Header with Search -->
                        <div class="sent-header mb-4">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="input-group">
                                        <input 
                                            v-model="searchQuery" 
                                            type="text" 
                                            class="form-control" 
                                            placeholder="Search messages..."
                                            @input="searchMessages"
                                        >
                                        <div class="input-group-append">
                                            <button 
                                                class="btn" 
                                                style="background-color: #dc3545; border-color: #dc3545; color: white;" 
                                                @click="searchMessages"
                                            >
                                                <i class="fas fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 text-right">
                                    <small class="text-muted">
                                        Showing {{ pagination.from || 0 }} to {{ pagination.to || 0 }} of {{ pagination.total || 0 }} messages
                                    </small>
                                </div>
                            </div>
                        </div>

                        <!-- Messages List -->
                        <div class="row">
                            <!-- Loading State -->
                            <div v-if="isLoadingMessages" class="col-12 text-center py-5">
                                <div class="spinner-border" style="color: #dc3545;" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <p class="mt-3 text-muted">Loading sent messages...</p>
                            </div>
                            
                            <!-- No Messages State -->
                            <div v-else-if="sentMessages.length === 0" class="col-12 text-center py-5">
                                <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                                <h4 class="text-muted">No sent messages</h4>
                                <p class="text-muted">You haven't sent any messages yet.</p>
                                <button 
                                    class="btn btn-primary mt-3" 
                                    @click="goToComposeMessage"
                                >
                                    <i class="fas fa-plus mr-2"></i>
                                    Send your first message
                                </button>
                            </div>
                            
                            <!-- Messages List -->
                            <div v-else class="col-12">
                                <div 
                                    v-for="message in filteredMessages" 
                                    :key="message.id" 
                                    class="card mb-3"
                                >
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-1 text-center">
                                                <i class="fas fa-envelope-open fa-2x" style="color: #dc3545;"></i>
                                            </div>
                                            <div class="col-md-9">
                                                <h5 class="card-title" style="color: #dc3545;">{{ message.subject }}</h5>
                                                <div class="card-text">
                                                    <div class="mb-2">
                                                        <strong class="text-dark">To:</strong> 
                                                        <span class="text-dark">{{ message.member_name }}</span>
                                                        <span v-if="message.member_email" class="text-muted">({{ message.member_email }})</span>
                                                    </div>
                                                    <div class="mb-2">
                                                        <small class="text-muted">
                                                            <i class="fas fa-clock"></i> 
                                                            <strong>Sent:</strong> {{ message.sent_datetime }}
                                                        </small>
                                                    </div>
                                                    <div class="alert alert-light" style="border-left: 3px solid #dc3545;">
                                                        <small class="text-muted">
                                                            {{ message.body.substring(0, 100) }}{{ message.body.length > 100 ? '...' : '' }}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-2 text-right">
                                                <div class="btn-group-vertical" role="group">
                                                    <button 
                                                        type="button" 
                                                        class="btn btn-sm mb-1" 
                                                        style="background-color: #dc3545; border-color: #dc3545; color: white;" 
                                                        @click="viewMessage(message)" 
                                                        title="View Message"
                                                    >
                                                        <i class="fas fa-eye"></i> View
                                                    </button>
                                                    <button 
                                                        type="button" 
                                                        class="btn btn-sm" 
                                                        style="background-color: #dc3545; border-color: #dc3545; color: white;" 
                                                        @click="deleteMessage(message.id)" 
                                                        title="Delete Message"
                                                    >
                                                        <i class="fas fa-trash"></i> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Pagination -->
                        <nav aria-label="Page navigation" class="mt-4">
                            <ul class="pagination justify-content-center">
                                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                    <button 
                                        class="page-link" 
                                        @click="goToPage(currentPage - 1)"
                                        :disabled="currentPage === 1"
                                    >
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                </li>
                                <li 
                                    v-for="page in visiblePages" 
                                    :key="page" 
                                    class="page-item"
                                    :class="{ active: page === currentPage }"
                                >
                                    <button 
                                        class="page-link" 
                                        @click="goToPage(page)"
                                        :style="page === currentPage ? 'background-color: #dc3545; border-color: #dc3545; color: white;' : ''"
                                    >
                                        {{ page }}
                                    </button>
                                </li>
                                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                    <button 
                                        class="page-link" 
                                        @click="goToPage(currentPage + 1)"
                                        :disabled="currentPage === totalPages"
                                    >
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SentMessages",
    data() {
        return {
            searchQuery: "",
            currentPage: 1,
            totalPages: 1,
            isLoadingMessages: false,
            sentMessages: [],
            pagination: {
                current_page: 1,
                last_page: 1,
                per_page: 15,
                total: 0,
                from: 0,
                to: 0
            }
        };
    },
    computed: {
        filteredMessages() {
            if (!this.searchQuery.trim()) {
                return this.sentMessages;
            }
            return this.sentMessages.filter(message => 
                message.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                message.member_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                message.member_email.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        visiblePages() {
            const pages = [];
            const start = Math.max(1, this.currentPage - 2);
            const end = Math.min(this.totalPages, this.currentPage + 2);
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        }
    },
    async created() {
        await this.loadSentMessages();
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

        goToComposeMessage() {
            this.$router.push({ name: 'SendMessage' });
        },

        async loadSentMessages() {
            this.isLoadingMessages = true;
            try {
                console.log('Loading sent messages...');
                // Use relative URL so axios baseURL (/api/) is applied
                const response = await axios.get('members/sent-messages', {
                    params: {
                        page: this.currentPage,
                        per_page: this.pagination.per_page
                    }
                });

                console.log('Sent messages response:', response.data);

                if (response.data.success) {
                    this.sentMessages = response.data.messages;
                    this.pagination = response.data.pagination;
                    this.totalPages = response.data.pagination.last_page;
                    console.log('Loaded messages:', this.sentMessages.length);
                } else {
                    console.error('Failed to load sent messages:', response.data.message);
                    this.showError('Failed to load sent messages');
                }
            } catch (error) {
                console.error('Error loading sent messages:', error);
                this.showError('Error loading sent messages');
            } finally {
                this.isLoadingMessages = false;
            }
        },

        searchMessages() {
            // Search is handled by computed property filteredMessages
            // This method can be used for additional search logic if needed
        },

        viewMessage(message) {
            this.$swal({
                title: message.subject,
                html: `
                    <div style="text-align: left;">
                        <p><strong>To:</strong> ${message.member_name} ${message.member_email ? `(${message.member_email})` : ''}</p>
                        <p><strong>Sent:</strong> ${message.sent_datetime}</p>
                        <hr>
                        <div style="white-space: pre-wrap; margin-top: 15px;">${message.body}</div>
                    </div>
                `,
                showCancelButton: false,
                confirmButtonText: 'Close',
                confirmButtonColor: '#dc3545',
                width: '600px'
            });
        },

        deleteMessage(messageId) {
            this.$swal({
                title: 'Delete Message',
                text: 'Are you sure you want to delete this message?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d'
            }).then((result) => {
                if (result.isConfirmed) {
                    // TODO: Implement actual delete API call
                    this.$swal({
                        title: 'Deleted!',
                        text: 'Message has been deleted.',
                        icon: 'success',
                        confirmButtonColor: '#dc3545'
                    });
                    // Reload messages after deletion
                    this.loadSentMessages();
                }
            });
        },

        goToPage(page) {
            this.currentPage = page;
            this.loadSentMessages();
        },

        showError(message) {
            this.$swal({
                title: 'Error',
                text: message,
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#dc3545'
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/sass/_variables.scss";

/* Custom styles for your color scheme */
.nav-pills .nav-link.active {
    background-color: #dc3545 !important;
    border-color: #dc3545 !important;
    color: white !important;
}

.nav-pills .nav-link {
    color: #6c757d;
    border: 1px solid transparent;
    border-radius: 0.375rem;
    padding: 0.5rem 1rem;
}

.nav-pills .nav-link:hover {
    background-color: rgba(220, 53, 69, 0.1);
    color: #dc3545;
    border-color: rgba(220, 53, 69, 0.2);
}

.page-link:hover {
    background-color: rgba(220, 53, 69, 0.1);
    border-color: #dc3545;
    color: #dc3545;
}

/* Layout adjustments */
.sent-messages-page {
    min-height: 100vh;
    background-color: #f8f9fa;
}

.sent-header {
    padding: 1rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.sent-header .form-control {
    border-radius: 0.375rem;
    border: 1px solid #ced4da;
}

.sent-header .form-control:focus {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.sent-header .btn {
    border-radius: 0.375rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .sidebar {
        margin-bottom: 1rem;
    }
}
</style>
