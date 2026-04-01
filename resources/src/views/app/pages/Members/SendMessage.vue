<template>
    <div class="send-message-page">
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
                                {{ showSentMessages ? 'Sent Messages' : 'Inbox' }}
                            </li>
                        </ol>
                    </div>
                </nav>
            </div>

            <!-- New Message Button -->
            <!-- <div class="action-section">
                <button 
                    class="btn btn-lg px-4" 
                    style="background-color: #dc3545; border-color: #dc3545; color: white;" 
                    @click="composeNewMessage"
                >
                    <i class="fas fa-plus mr-2"></i>
                    New message
                </button>
            </div> -->
        </div>

        <!-- Main Container -->
        <div class="container-fluid">
            <div class="row">
                <!-- Sidebar -->
                <div class="col-md-3 col-lg-2">
                    <div class="sidebar">
                        <nav class="nav nav-pills flex-column">
                            <a 
                                class="nav-link mb-2" 
                                :class="{ active: !showSentMessages }"
                                @click="showInbox"
                                href="#"
                            >
                                Inbox
                            </a>
                            <router-link 
                                to="/app/Members/sent-messages" 
                                class="nav-link mb-2"
                            >
                                Sent messages
                            </router-link>
                        </nav>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="col-md-9 col-lg-10">
                    <div class="main-content">
                        <!-- Compose Message -->
                        <div class="message-compose">
                            <div class="row justify-content-center">
                                <div class="col-lg-8 col-xl-6">
                                    <div class="card shadow-sm">
                                        <div class="card-body p-4">
                                            <!-- Following Section -->
                                            <!-- <div class="form-group mb-3">
                                                <label class="form-label font-weight-bold">Following</label>
                                                <select v-model="selectedCoach" class="form-control">
                                                    <option value="coach-kc">Coach KC</option>
                                                    <option value="coach-john">Coach John</option>
                                                    <option value="coach-sarah">Coach Sarah</option>
                                                </select>
                                            </div> -->

                                            <!-- Search Section -->
                                            <!-- <div class="form-group mb-3"> -->
                                                <!-- <label class="form-label font-weight-bold">Search</label> -->
                                                <!-- <div class="position-relative"> -->
                                                    <!-- <div class="input-group">
                                                        <input 
                                                            v-model="searchName" 
                                                            type="text" 
                                                            class="form-control"
                                                            placeholder="Search members by name or email"
                                                            @focus="onSearchFocus"
                                                            @blur="onSearchBlur"
                                                        >
                                                        <div class="input-group-append">
                                                            <button 
                                                                class="btn btn-primary" 
                                                                @click="addRecipient"
                                                            >
                                                                Add
                                                            </button>
                                                        </div>
                                                    </div> -->
                                                    <!-- Suggestions Dropdown -->
                                                    <!-- <div 
                                                        v-if="showSuggestions && suggestions.length"
                                                        class="dropdown-menu show w-100 mt-1 shadow"
                                                        style="max-height: 320px; overflow-y: auto;"
                                                    >
                                                        <div 
                                                            v-for="s in suggestions" 
                                                            :key="`sugg-${s.id}`" 
                                                            class="dropdown-item d-flex align-items-center"
                                                            @mousedown.prevent="selectSuggestion(s)"
                                                        >
                                                            <img 
                                                                v-if="s.avatar"
                                                                :src="s.avatar"
                                                                alt="avatar"
                                                                class="rounded-circle mr-2"
                                                                style="width: 32px; height: 32px; object-fit: cover;"
                                                            >
                                                            <div class="ml-0">
                                                                <div class="font-weight-bold">{{ s.name || 'Unknown Member' }}</div>
                                                                <small class="text-muted">{{ s.email || 'No email' }}</small>
                                                            </div>
                                                        </div>
                                                        <div v-if="isSearching" class="dropdown-item text-center text-muted">
                                                            <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                                            Searching...
                                                        </div>
                                                        <div v-if="!isSearching && !suggestions.length" class="dropdown-item text-muted">
                                                            No results
                                                        </div>
                                                    </div> -->
                                                <!-- </div> -->
                                            <!-- </div> -->

                                            <!-- Recipients Section -->
                                            <div class="form-group mb-3">
                                                <label class="form-label font-weight-bold">Recipients:</label>
                                                <div class="recipients-list">
                                                    <span 
                                                        v-for="recipient in recipients" 
                                                        :key="recipient" 
                                                        class="badge badge-secondary mr-2 mb-2 p-2 d-inline-flex align-items-center"
                                                        style="font-size: 14px;"
                                                    >
                                                        <img 
                                                            v-if="getRecipientAvatar(recipient)"
                                                            :src="getRecipientAvatar(recipient)"
                                                            alt="avatar"
                                                            class="rounded-circle mr-2"
                                                            style="width: 20px; height: 20px; object-fit: cover;"
                                                        >
                                                        <i v-else class="fas fa-user-circle mr-2" style="font-size: 16px;"></i>
                                                        {{ getRecipientDisplayName(recipient) }}
                                                        <i class="fas fa-times ml-2" @click="removeRecipient(recipient)" style="cursor: pointer;"></i>
                                                    </span>
                                                </div>
                                                <div v-if="isLoadingMember" class="text-center mt-2">
                                                    <div class="spinner-border spinner-border-sm" style="color: #dc3545;" role="status">
                                                        <span class="sr-only">Loading...</span>
                                                    </div>
                                                    <small class="ml-2 text-muted">Loading member details...</small>
                                                </div>
                                            </div>

                                            <!-- Subject Section -->
                                            <div class="form-group mb-3">
                                                <label class="form-label font-weight-bold">Subject:</label>
                                                <input 
                                                    v-model="messageSubject" 
                                                    type="text" 
                                                    class="form-control" 
                                                    placeholder="Enter subject"
                                                >
                                            </div>

                                            <!-- Message Body -->
                                            <div class="form-group mb-4">
                                                <textarea 
                                                    v-model="messageBody" 
                                                    class="form-control" 
                                                    placeholder="Type your message here..."
                                                    rows="8"
                                                ></textarea>
                                            </div>

                                            <!-- Send Button -->
                                            <div class="text-right">
                                                <button 
                                                    class="btn btn-primary" 
                                                    @click="sendMessage"
                                                >
                                                    Send
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
</template>

<script>
export default {
    name: "SendMessage",
    data() {
        return {
            selectedCoach: "coach-kc",
            searchName: "",
            recipients: [],
            recipientData: {}, // Store recipient details with ID as key
            messageSubject: "",
            messageBody: "",
            isLoadingMember: false,
            // Search dropdown state
            suggestions: [],
            isSearching: false,
            showSuggestions: false,
            searchDebounceTimer: null
        };
    },
    watch: {
        searchName(newVal) {
            clearTimeout(this.searchDebounceTimer);
            this.searchDebounceTimer = setTimeout(() => {
                this.fetchSuggestions(newVal.trim());
            }, 300);
        }
    },
    async created() {
        // Pre-populate recipient if member ID is provided in query
        if (this.$route.query.memberId) {
            await this.loadMemberDetails(this.$route.query.memberId);
        }
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

        // Method to navigate to sent messages tab (can be called from other components)
        goToSentMessages() {
            this.showSentMessagesView();
        },

        // Method to navigate to inbox tab (can be called from other components)
        goToInbox() {
            this.showInbox();
        },

        // Static method to navigate to SendMessage with specific tab (can be called from other components)
        staticNavigateToSentMessages() {
            this.$router.push({
                name: 'SendMessage',
                query: { tab: 'sent' }
            });
        },

        // Static method to navigate to SendMessage with member and specific tab
        staticNavigateToSendMessage(memberId, tab = 'inbox') {
            this.$router.push({
                name: 'SendMessage',
                query: { 
                    memberId: memberId,
                    tab: tab
                }
            });
        },
        
        async loadMemberDetails(memberId) {
            this.isLoadingMember = true;
            try {
                // Try to fetch member details from API
                const response = await axios.get(`members/${memberId}`);
                const member = response.data;
                
                // Store member data with ID as key
                // Handle profile image - support both base64 (legacy) and file paths
                let avatar = null;
                if (member.profile_image) {
                    if (member.profile_image.startsWith('data:image/')) {
                        // Base64 data URI (legacy)
                        avatar = member.profile_image;
                    } else if (member.profile_image.startsWith('/') || member.profile_image.startsWith('http')) {
                        // Already a full path
                        avatar = member.profile_image;
                    } else {
                        // Just a filename, construct full path
                        avatar = `/images/avatar/${member.profile_image}`;
                    }
                }
                
                this.recipientData[memberId] = {
                    id: member.id,
                    name: `${member.first_name} ${member.last_name}`,
                    email: member.email,
                    phone: member.mobile_phone || member.phone,
                    avatar: avatar
                };
                
                // Add to recipients list
                this.recipients.push(memberId);
                
            } catch (error) {
                console.error('Error loading member details:', error);
                
                // Fallback: Use member ID as name if API fails
                this.recipientData[memberId] = {
                    id: memberId,
                    name: `Member ${memberId}`,
                    email: null,
                    phone: null
                };
                
                // Add to recipients list with fallback name
                this.recipients.push(memberId);
                
                // Show a less intrusive message
                console.warn('Using fallback member data due to API error');
            } finally {
                this.isLoadingMember = false;
            }
        },

        composeNewMessage() {
            // Reset form for new message
            this.searchName = "";
            this.suggestions = [];
            this.showSuggestions = false;
            this.recipients = [];
            this.recipientData = {};
            this.messageSubject = "";
            this.messageBody = "";
        },

        // --- Search dropdown handlers ---
        onSearchFocus() {
            if (this.searchName && this.suggestions.length) {
                this.showSuggestions = true;
            }
        },
        onSearchBlur() {
            // Delay hiding to allow click via mousedown on items
            setTimeout(() => {
                this.showSuggestions = false;
            }, 120);
        },
        async fetchSuggestions(query) {
            if (!query || query.length < 2) {
                this.suggestions = [];
                this.isSearching = false;
                return;
            }
            this.isSearching = true;
            try {
                const resp = await axios.get('communication/members', {
                    params: { search: query }
                });
                if (resp.data && resp.data.success) {
                    this.suggestions = resp.data.members || [];
                } else if (resp.data && resp.data.data && resp.data.data.members) {
                    // Fallback if using index endpoint structure
                    this.suggestions = resp.data.data.members || [];
                } else {
                    this.suggestions = [];
                }
            } catch (e) {
                // Silent fail to keep UX smooth
                this.suggestions = [];
            } finally {
                this.isSearching = false;
                this.showSuggestions = !!this.suggestions.length;
            }
        },
        selectSuggestion(s) {
            const recipientId = s.id;
            if (!this.recipients.includes(recipientId)) {
                this.recipients.push(recipientId);
                this.recipientData[recipientId] = {
                    id: s.id,
                    name: s.name,
                    email: s.email,
                    avatar: s.avatar || null
                };
            }
            this.searchName = '';
            this.suggestions = [];
            this.showSuggestions = false;
        },
        
        addRecipient() {
            const searchTerm = this.searchName.trim();
            if (searchTerm && !this.recipients.includes(searchTerm)) {
                // Check if it's a numeric ID (member ID)
                if (/^\d+$/.test(searchTerm)) {
                    // It's a member ID, fetch details
                    this.loadMemberDetails(searchTerm);
                } else {
                    // It's a name, add directly
                    this.recipients.push(searchTerm);
                    this.recipientData[searchTerm] = {
                        id: null,
                        name: searchTerm,
                        email: null,
                        phone: null
                    };
                }
                this.searchName = "";
            }
        },
        
        removeRecipient(recipient) {
            const index = this.recipients.indexOf(recipient);
            if (index > -1) {
                this.recipients.splice(index, 1);
                // Clean up recipient data
                delete this.recipientData[recipient];
            }
        },

        getRecipientName(recipient) {
            // Return the name if we have recipient data, otherwise return the recipient as-is
            return this.recipientData[recipient]?.name || recipient;
        },

        getRecipientDisplayName(recipient) {
            // Return the name with ID in braces if we have recipient data
            const recipientData = this.recipientData[recipient];
            if (recipientData && recipientData.id) {
                return `${recipientData.name} (${recipientData.id})`;
            }
            // Fallback for legacy entries without proper data
            return recipient;
        },

        getRecipientAvatar(recipient) {
            // Return the avatar URL if we have recipient data
            return this.recipientData[recipient]?.avatar || null;
        },

        showInbox() {
            // This method is no longer needed as we navigate to separate components
        },

        showError(message) {
            this.$swal({
                title: 'Error',
                text: message,
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#dc3545'
            });
        },
        
        async sendMessage() {
            if (this.recipients.length === 0) {
                this.$swal({
                    title: 'No Recipients',
                    text: 'Please add at least one recipient before sending.',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#dc3545'
                });
                return;
            }
            
            if (!this.messageSubject.trim()) {
                this.$swal({
                    title: 'Missing Subject',
                    text: 'Please enter a subject for your message.',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#dc3545'
                });
                return;
            }
            
            if (!this.messageBody.trim()) {
                this.$swal({
                    title: 'Empty Message',
                    text: 'Please enter a message before sending.',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#dc3545'
                });
                return;
            }
            
            try {
                // Get the member ID from route query or use the first recipient
                const memberId = this.$route.query.memberId || this.recipients[0];
                
                if (!memberId) {
                    this.showError('No member ID found');
                    return;
                }

                // Prepare message data
                const messageData = {
                    recipients: this.recipients.join(', '),
                    subject: this.messageSubject,
                    body: this.messageBody
                };

                // Send message via API
                const response = await axios.post(`members/${memberId}/send-message`, messageData);

                if (response.data.success) {
                    this.$swal({
                        title: 'Message Sent!',
                        text: response.data.message || 'Your message has been sent successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#dc3545'
                    }).then(() => {
                        // Reset form after successful send
                        this.composeNewMessage();
                    });
                } else {
                    this.showError(response.data.message || 'Failed to send message');
                }
            } catch (error) {
                console.error('Error sending message:', error);
                this.showError('Error sending message. Please try again.');
            }
        },
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

.badge-secondary {
    background-color: #6c757d !important;
}

/* Layout adjustments */
.send-message-page {
    min-height: 100vh;
    background-color: #f8f9fa;
}

.sent-messages-modal {
    padding: 1rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.message-compose {
    padding: 0;
}

.message-compose .card {
    border: none;
    border-radius: 0.5rem;
    padding: 10px;
}

.message-compose .form-label {
    margin-bottom: 0.5rem;
    color: #495057;
}

.message-compose .form-control {
    border-radius: 0.375rem;
    border: 1px solid #ced4da;
}

.message-compose .form-control:focus {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.message-compose .btn-primary {
    background-color: #dc3545;
    border-color: #dc3545;
    border-radius: 0.375rem;
    padding: 0.5rem 1.5rem;
}

.message-compose .btn-primary:hover {
    background-color: #c82333;
    border-color: #bd2130;
}

.message-compose .btn-primary:focus {
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .sidebar {
        margin-bottom: 1rem;
    }
    
    .message-compose .col-lg-8 {
        padding: 0 1rem;
    }
}
</style>
