<template>
    <div class="checkin-page">
        <!-- Breadcrumb Navigation -->
        <div class="breadcrumb-nav-row">
            <div class="breadcrumb-section">
                <nav class="breadcrumb-nav" aria-label="breadcrumb">
                    <div class="breadcrumb-container">
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
                                <i class="fas fa-sign-in-alt"></i>
                                Check-in
                            </li>
                        </ol>
                    </div>
                </nav>
            </div>
            <div class="action-section ms-3">
                <button 
                    class="action-btn btn btn-outline-secondary filter-btn"
                    @click="exportData"
                    :disabled="loading"
                >
                    <i class="fas fa-download"></i>
                    Export
                </button>
            </div>
        </div>

        <!-- Visitors Summary Card with Filters -->
        <div class="row mb-4">
            <div class="col-md-12">
                <div class="card visitors-card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-3">
                                <div class="d-flex align-items-center">
                                    <div class="visitors-icon">
                                        <i class="fas fa-wifi"></i>
                                    </div>
                                    <div class="visitors-content">
                                        <h6 class="visitors-title">Visitors right now</h6>
                                        <div class="visitors-count">
                                            <span class="count-number">{{ currentVisitors.active_visitors }}</span>
                                            <span class="count-divider">/</span>
                                            <span class="count-total">{{ currentVisitors.total_today }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="form-label small">Date Filter</label>
                                        <select class="form-select form-select-sm" v-model="selectedDate" @change="loadCheckIns">
                                            <option value="today">Today ({{ formatDate(today) }})</option>
                                            <option value="yesterday">Yesterday</option>
                                            <option value="week">This Week</option>
                                            <option value="month">This Month</option>
                                            <option value="custom">Custom Date</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3" v-if="selectedDate === 'custom'">
                                        <label class="form-label small">Select Date</label>
                                        <input 
                                            type="date" 
                                            class="form-control form-control-sm" 
                                            v-model="customDate"
                                            @change="loadCheckIns"
                                        >
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label small">Status Filter</label>
                                        <select class="form-select form-select-sm" v-model="visitorFilter" @change="loadCheckIns">
                                            <option value="all">All visitors</option>
                                            <option value="active">Active visitors</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-label small">Search Visitor</label>
                                        <input 
                                            type="text" 
                                            class="form-control form-control-sm" 
                                            v-model="searchVisitorName"
                                            @input="onSearchInput"
                                            placeholder="Search by name..."
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Check-in Form -->
        <div class="row mb-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row g-3 align-items-end">
                            <div class="col-12">
                                <div class="btn-group checkin-mode-toggle" role="group">
                                    <button
                                        type="button"
                                        class="btn"
                                        :class="checkInMode === 'member' ? 'btn-primary' : 'btn-outline-primary'"
                                        @click="setCheckInMode('member')"
                                    >
                                        <i class="fas fa-users me-2"></i>
                                        Existing Member
                                    </button>
                                    <button
                                        type="button"
                                        class="btn"
                                        :class="checkInMode === 'visitor' ? 'btn-primary' : 'btn-outline-primary'"
                                        @click="setCheckInMode('visitor')"
                                    >
                                        <i class="fas fa-user-plus me-2"></i>
                                        New Visitor
                                    </button>
                                </div>
                            </div>

                            <div class="col-md-6" v-if="isMemberMode">
                                <label class="form-label">Search Member</label>
                                <div class="position-relative">
                                    <input
                                        type="text"
                                        class="form-control search-input"
                                        v-model="memberSearchQuery"
                                        @input="onMemberSearchInput"
                                        :placeholder="'Type name, email, or ID...'"
                                        :disabled="memberSearchLoading"
                                    >
                                    <i class="fas fa-search search-icon"></i>

                                    <div 
                                        class="search-suggestions" 
                                        v-if="showMemberSuggestions"
                                    >
                                        <button
                                            type="button"
                                            class="suggestion-item"
                                            v-for="member in memberSearchResults"
                                            :key="member.id"
                                            @click="selectMember(member)"
                                        >
                                            <div class="fw-semibold">
                                                {{ member.name }}
                                            </div>
                                            <small class="text-muted d-block">
                                                {{ member.email || 'No email on file' }}
                                            </small>
                                        </button>
                                        <div 
                                            v-if="!memberSearchResults.length && !memberSearchLoading"
                                            class="px-3 py-2 text-muted small"
                                        >
                                            No members found
                                        </div>
                                        <div 
                                            v-if="memberSearchLoading"
                                            class="px-3 py-2 text-muted small"
                                        >
                                            Searching...
                                        </div>
                                    </div>
                                </div>
                                <div 
                                    v-if="selectedMember" 
                                    class="selected-member-pill mt-2"
                                >
                                    <div>
                                        <strong>{{ selectedMember.name }}</strong>
                                        <small class="d-block text-muted">
                                            {{ selectedMember.email || selectedMember.membername || 'No email' }}
                                        </small>
                                    </div>
                                    <button 
                                        type="button" 
                                        class="btn btn-link text-danger p-0 ms-auto"
                                        @click="clearSelectedMember"
                                    >
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="col-md-6" v-else>
                                <label class="form-label">Visitor Name</label>
                                <div class="position-relative">
                                    <input
                                        type="text"
                                        class="form-control search-input"
                                        v-model="visitorName"
                                        @keyup.enter="handleCheckIn"
                                        :placeholder="'Enter visitor name...'"
                                    >
                                    <i class="fas fa-user-plus search-icon"></i>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <label class="form-label">Message (Optional)</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="visitorMessage"
                                    @keyup.enter="handleCheckIn"
                                    placeholder="Optional note..."
                                >
                            </div>
                            <div class="col-md-3">
                                <label class="form-label">&nbsp;</label>
                                <button 
                                    class="btn btn-primary checkin-btn w-100"
                                    @click="handleCheckIn"
                                    :disabled="loading || !canSubmitCheckIn"
                                >
                                    <i class="fas fa-sign-in-alt me-2"></i>
                                    {{ isMemberMode ? 'Check-in Member' : 'Check-in Visitor' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Check-ins Table -->
        <div class="row">
            <div class="col-12">
                <div class="card checkins-table-card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">
                            Check-ins ({{ checkIns.length }})
                        </h5>
                    </div>
                    <div class="card-body p-0">
                        <div v-if="loading" class="loading-container">
                            <div class="modern-spinner">
                                <div class="spinner-ring"></div>
                                <div class="spinner-ring"></div>
                                <div class="spinner-ring"></div>
                            </div>
                            <p class="loading-text">Loading visitors...</p>
                        </div>
                        <div v-else-if="checkIns.length === 0" class="text-center p-4">
                            <i class="fas fa-users fa-3x text-muted mb-3"></i>
                            <p class="text-muted">No visitors found</p>
                        </div>
                        <div v-else class="table-responsive">
                            <table class="table table-hover checkins-table">
                                <thead>
                                    <tr>
                                        <th class="table-header text-left">Name</th>
                                        <th class="table-header text-center">Check-in Time</th>
                                        <th class="table-header text-center">Check-out Time</th>
                                        <th class="table-header text-center">Message</th>
                                        <th class="table-header text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="checkIn in checkIns" :key="checkIn.id" class="table-row">
                                        <td class="table-cell text-left">
                                            <div class="d-flex align-items-center">
                                                <div class="member-avatar">
                                                    <i class="fas fa-user"></i>
                                                </div>
                                                <div class="member-details">
                                                    <div class="member-name">
                                                        {{ checkIn.member_name || checkIn.visitor_name || (checkIn.member && checkIn.member.membername) || 'N/A' }}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="table-cell text-center">
                                            <span class="checkin-time">
                                                {{ formatDateTime(checkIn.check_in_time) }}
                                            </span>
                                        </td>
                                        <td class="table-cell text-center">
                                            <span v-if="checkIn.check_out_time" class="checkout-time">
                                                {{ formatDateTime(checkIn.check_out_time) }}
                                            </span>
                                            <span v-else class="text-success">
                                                <i class="fas fa-circle me-1"></i>
                                                Active
                                            </span>
                                        </td>
                                        <td class="table-cell text-center">
                                            <div class="message-content">
                                                <span class="status-dot"></span>
                                                {{ checkIn.message || 'N/A' }}
                                            </div>
                                        </td>
                                        <td class="table-cell text-center">
                                            <div class="btn-group" role="group">
                                                <button 
                                                    v-if="!checkIn.check_out_time"
                                                    class="btn btn-sm btn-outline-success"
                                                    @click.stop="checkOut(checkIn.id)"
                                                    :title="'Check out'"
                                                >
                                                    <i class="fas fa-sign-out-alt"></i>
                                                </button>
                                                <button 
                                                    class="btn btn-sm btn-outline-danger"
                                                    @click.stop="deleteCheckIn(checkIn.id)"
                                                    :title="'Delete'"
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
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "CheckIn",

    data() {
        return {
            loading: false,
            checkInMode: "visitor",
            visitorName: "",
            visitorMessage: "",
            checkIns: [],
            currentVisitors: {
                active_visitors: 0,
                total_today: 0,
            },
            selectedDate: "today",
            visitorFilter: "all",
            searchVisitorName: "",
            customDate: "",
            today: new Date(),
            searchDebounceTimer: null,
            memberSearchQuery: "",
            memberSearchResults: [],
            memberSearchLoading: false,
            memberSearchDebounce: null,
            selectedMember: null,
        };
    },

    computed: {
        isMemberMode() {
            return this.checkInMode === "member";
        },
        canSubmitCheckIn() {
            return this.isMemberMode
                ? !!this.selectedMember
                : this.visitorName.trim().length > 0;
        },
        showMemberSuggestions() {
            return (
                this.isMemberMode &&
                !this.selectedMember &&
                this.memberSearchQuery.trim().length >= 2 &&
                (this.memberSearchResults.length > 0 || this.memberSearchLoading)
            );
        },
    },

    mounted() {
        this.loadCheckIns();
        this.loadCurrentVisitorsCount();
    },

    beforeDestroy() {
        if (this.searchDebounceTimer) {
            clearTimeout(this.searchDebounceTimer);
        }
        if (this.memberSearchDebounce) {
            clearTimeout(this.memberSearchDebounce);
        }
    },

    methods: {
        handleCheckIn() {
            if (this.isMemberMode) {
                this.checkInMember();
            } else {
                this.checkInVisitor();
            }
        },

        setCheckInMode(mode) {
            if (this.checkInMode === mode) {
                return;
            }
            this.checkInMode = mode;
            this.visitorMessage = "";

            if (mode === "visitor") {
                this.clearSelectedMember();
            } else {
                this.visitorName = "";
            }
        },

        goBack() {
            this.$router.go(-1);
        },

        // Toast notification helper
        makeToast(variant, msg, title) {
            this.$root.$bvToast.toast(msg, {
                title: title || (variant === "success" ? "Success" : variant === "error" ? "Error" : "Info"),
                variant: variant === "error" ? "danger" : variant,
                solid: true,
                toaster: "b-toaster-top-right",
                autoHideDelay: 3000,
            });
        },

        // -------------------------------------------------------------------
        // CHECK-IN VISITOR (FULLY FIXED)
        // -------------------------------------------------------------------
        async checkInVisitor() {
            if (!this.visitorName.trim()) {
                this.makeToast("error", "Please enter a valid visitor name");
                return;
            }

            this.loading = true;

            try {
                const payload = {
                    visitor_name: this.visitorName.trim(),
                    check_in_type: "manual",
                };
                
                // Only include message if it has a value
                if (this.visitorMessage && this.visitorMessage.trim()) {
                    payload.message = this.visitorMessage.trim();
                }

                const { data } = await axios.post("check-ins", payload);

                if (data?.success) {
                    this.makeToast("success", "Visitor checked in successfully");

                    if (data?.data) {
                        this.checkIns.unshift(data.data);
                    }

                    this.currentVisitors.active_visitors++;
                    this.currentVisitors.total_today++;

                    this.visitorName = "";
                    this.visitorMessage = "";

                    await this.loadCheckIns();
                    await this.loadCurrentVisitorsCount();
                } else {
                    this.makeToast("error", data?.message || "Unexpected server response.");
                }
            } catch (error) {
                const response = error?.response?.data || {};

                // Laravel validation errors
                if (response.errors && typeof response.errors === "object") {
                    const validationMsg = Object.values(response.errors)
                        .flat()
                        .join(", ");

                    this.makeToast("error", validationMsg);
                    return;
                }

                // General Laravel error message
                const msg = response.message || "Error checking in visitor. Please try again.";
                this.makeToast("error", msg);
            } finally {
                this.loading = false;
            }
        },

        async checkInMember() {
            if (!this.selectedMember) {
                this.makeToast("error", "Please select a member to check in");
                return;
            }

            this.loading = true;

            try {
                const payload = {
                    member_id: this.selectedMember.id,
                    member_name: this.selectedMember.name,
                    check_in_type: "manual",
                };
                
                // Only include message if it has a value
                if (this.visitorMessage && this.visitorMessage.trim()) {
                    payload.message = this.visitorMessage.trim();
                }

                const { data } = await axios.post("check-ins", payload);

                if (data?.success) {
                    this.makeToast("success", "Member checked in successfully");

                    if (data?.data) {
                        this.checkIns.unshift(data.data);
                    }

                    this.currentVisitors.active_visitors++;
                    this.currentVisitors.total_today++;

                    this.clearSelectedMember();
                    this.memberSearchQuery = "";
                    this.visitorMessage = "";

                    await this.loadCheckIns();
                    await this.loadCurrentVisitorsCount();
                } else {
                    this.makeToast("error", data?.message || "Unexpected server response.");
                }
            } catch (error) {
                const response = error?.response?.data || {};
                const msg = response.message || "Error checking in member. Please try again.";
                this.makeToast("error", msg);
            } finally {
                this.loading = false;
            }
        },

        // -------------------------------------------------------------------
        // CHECK-OUT
        // -------------------------------------------------------------------
        async checkOut(id) {
            try {
                const { data } = await axios.put(`check-ins/${id}`);

                if (data?.success) {
                    this.makeToast("success", "Visitor checked out successfully");
                    await this.loadCheckIns();
                    await this.loadCurrentVisitorsCount();
                } else {
                    this.makeToast("error", data?.message || "Check-out failed");
                }
            } catch {
                this.makeToast("error", "Error checking out visitor");
            }
        },

        // -------------------------------------------------------------------
        // DELETE VISITOR
        // -------------------------------------------------------------------
        async deleteCheckIn(id) {
            if (!confirm("Are you sure you want to delete this entry?")) return;

            try {
                const { data } = await axios.delete(`check-ins/${id}`);

                if (data?.success) {
                    this.makeToast("success", "Deleted successfully");
                    this.checkIns = this.checkIns.filter((item) => item.id !== id);
                    await this.loadCurrentVisitorsCount();
                } else {
                    this.makeToast("error", data?.message || "Delete failed");
                }
            } catch {
                this.makeToast("error", "Error deleting check-in");
            }
        },

        // -------------------------------------------------------------------
        // LOAD ALL CHECK-INS
        // -------------------------------------------------------------------
        async loadCheckIns() {
            this.loading = true;

            try {
                const params = {};
                
                // Handle date filtering
                if (this.selectedDate === "custom" && this.customDate) {
                    params.date = this.customDate;
                } else if (this.selectedDate === "today") {
                    params.date = new Date().toISOString().split('T')[0];
                } else if (this.selectedDate === "yesterday") {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    params.date = yesterday.toISOString().split('T')[0];
                } else if (this.selectedDate === "week") {
                    // For week, we'll let the backend handle it or send start of week
                    const weekStart = new Date();
                    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                    params.date = weekStart.toISOString().split('T')[0];
                } else if (this.selectedDate === "month") {
                    // For month, send first day of month
                    const monthStart = new Date();
                    monthStart.setDate(1);
                    params.date = monthStart.toISOString().split('T')[0];
                }

                // Map status filter to visitor_type (controller expects visitor_type)
                if (this.visitorFilter === "active") {
                    params.visitor_type = "active";
                }

                // Add search parameter
                if (this.searchVisitorName) {
                    params.search = this.searchVisitorName;
                }

                const { data } = await axios.get("check-ins", { params });

                if (data?.success) {
                    this.checkIns = data.data || [];
                }
            } catch {
                this.makeToast("error", "Unable to load visitors");
            } finally {
                this.loading = false;
            }
        },

        // -------------------------------------------------------------------
        // SUMMARY
        // -------------------------------------------------------------------
        async loadCurrentVisitorsCount() {
            try {
                const { data } = await axios.get("check-ins/summary");
                if (data?.success) {
                    this.currentVisitors = data.data;
                }
            } catch (error) {
                console.warn("Summary load error:", error);
            }
        },

        // -------------------------------------------------------------------
        // SEARCH DEBOUNCE
        // -------------------------------------------------------------------
        onSearchInput() {
            clearTimeout(this.searchDebounceTimer);
            this.searchDebounceTimer = setTimeout(() => {
                this.loadCheckIns();
            }, 400);
        },

        onMemberSearchInput() {
            this.selectedMember = null;

            if (this.memberSearchDebounce) {
                clearTimeout(this.memberSearchDebounce);
            }

            const query = this.memberSearchQuery.trim();
            if (!query || query.length < 2) {
                this.memberSearchResults = [];
                return;
            }

            this.memberSearchDebounce = setTimeout(() => {
                this.fetchMemberSuggestions();
            }, 300);
        },

        async fetchMemberSuggestions() {
            const query = this.memberSearchQuery.trim();
            if (query.length < 2) {
                this.memberSearchResults = [];
                return;
            }

            this.memberSearchLoading = true;
            try {
                const params = {
                    page: 1,
                    limit: 6,
                    name: query,
                };
                const { data } = await axios.get("members", { params });
                const clients = data?.clients || [];
                this.memberSearchResults = clients.map((client) => ({
                    id: client.id,
                    name:
                        client.membername ||
                        [client.firstname, client.lastname].filter(Boolean).join(" ") ||
                        `Member #${client.id}`,
                    email: client.email,
                    membername: client.membername,
                }));
            } catch (error) {
                console.error("Member search failed", error);
                this.memberSearchResults = [];
            } finally {
                this.memberSearchLoading = false;
            }
        },

        selectMember(member) {
            this.selectedMember = member;
            this.memberSearchResults = [];
            this.memberSearchQuery = member.name;
        },

        clearSelectedMember() {
            this.selectedMember = null;
            this.memberSearchQuery = "";
            this.memberSearchResults = [];
        },

        exportData() {
            window.open("check-ins/export", "_blank");
        },

        formatDate(date) {
            return new Date(date).toLocaleDateString();
        },

        formatDateTime(datetime) {
            return new Date(datetime).toLocaleString();
        },
    },
};
</script>


<style lang="scss" scoped>
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

.checkin-page {
    padding: $padding-md;
}

.breadcrumb-nav-row {
    margin-bottom: $margin-md;
    gap: $margin-md;
}

.breadcrumb-section {
    display: flex;
    align-items: center;
    gap: $margin-sm;
}

.breadcrumb {
    .breadcrumb-item {
        &:not(:last-child)::after {
            margin: 0 $margin-sm;
            color: $color-muted;
        }
    }
}

.back-btn {
    border-radius: $border-radius-md;
    padding: 0.5rem 0.75rem;
    border: 1px solid $color-border;
    background: $color-white;
    color: $color-text-dark;
    transition: all 0.2s ease;
    
    &:hover {
        background: $color-background-hover;
        border-color: $primary;
        color: $primary;
    }
    
    &:focus {
        box-shadow: 0 0 0 0.2rem rgba($primary, 0.25);
    }
    
    i {
        font-size: $font-size-sm;
    }
}

.visitors-card {
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    border: none;
    border-radius: $border-radius-lg;
    box-shadow: $box-shadow-sm;
    
    .visitors-icon {
        width: 50px;
        height: 50px;
        background: $color-success;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: $margin-md;
        
        i {
            color: $color-white;
            font-size: 1.2rem;
        }
    }
    
    .visitors-title {
        color: $color-text-dark;
        font-weight: $font-weight-medium;
        margin-bottom: $margin-xs;
    }
    
    .visitors-count {
        .count-number {
            font-size: 2rem;
            font-weight: $font-weight-bold;
            color: $color-success;
        }
        
        .count-divider {
            font-size: 1.5rem;
            color: $color-muted;
            margin: 0 $margin-xs;
        }
        
        .count-total {
            font-size: 1.2rem;
            color: $color-muted;
        }
    }
}

.search-input {
    padding-left: 2.5rem;
    border-radius: $border-radius-md;
    border: 1px solid $color-border;
    
    &:focus {
        border-color: $primary;
        box-shadow: 0 0 0 0.2rem rgba($primary, 0.25);
    }
}

.search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: $color-muted;
    z-index: 10;
}

.checkin-btn {
    border-radius: $border-radius-md;
    font-weight: $font-weight-medium;
    padding: 0.75rem 1rem;
}

.checkin-mode-toggle .btn {
    min-width: 180px;
    font-weight: $font-weight-medium;
}

.selected-member-pill {
    display: flex;
    align-items: center;
    gap: $margin-sm;
    padding: 0.5rem 0.75rem;
    border: 1px dashed $primary;
    border-radius: $border-radius-md;
    background-color: rgba($primary, 0.05);
}

.search-suggestions {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    width: 100%;
    max-height: 220px;
    overflow-y: auto;
    background: $color-white;
    border: 1px solid $color-border;
    border-radius: $border-radius-md;
    box-shadow: $box-shadow-lg;
    z-index: 20;
}

.suggestion-item {
    width: 100%;
    text-align: left;
    border: none;
    background: transparent;
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid $color-border-muted;
    transition: background 0.2s ease;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background: $color-background;
    }
}

.member-avatar {
    width: 32px;
    height: 32px;
    background: $color-background-hover;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: $margin-sm;
    
    i {
        color: $color-muted;
        font-size: 0.875rem;
    }
}

.member-name {
    font-size: $font-size-sm;
    color: $color-text-dark;
    font-weight: $font-weight-semibold;
    margin-bottom: 0;
}

.checkin-time, .checkout-time {
    font-family: $font-family-base;
    font-size: $font-size-sm;
    color: $color-text-dark;
    font-weight: $font-weight-normal;
}

.message-content {
    display: flex;
    align-items: center;
    justify-content: center;
    
    .status-dot {
        width: 8px;
        height: 8px;
        background: $color-success;
        border-radius: 50%;
        margin-right: $margin-xs;
    }
}

.checkins-table-card {
    .card-body {
        padding: 0 !important;
    }
}

.checkins-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
    margin-bottom: 0;
    
    th {
        background: #f8f9fa;
        color: $color-text-dark;
        font-weight: 600;
        padding: 1rem 0.75rem;
        text-align: left;
        border-bottom: 2px solid #dee2e6;
        white-space: nowrap;
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
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        
        &:first-child {
            text-align: left;
        }
    }

    td {
        padding: 0.75rem;
        border-bottom: 1px solid #dee2e6;
        vertical-align: top;
    }

    .table-row {
        transition: background-color 0.2s ease;
        cursor: pointer;
        
        &:nth-child(even) {
            background-color: #f8f9fa;
        }

        &:hover {
            background-color: $color-background-hover;
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
        
        &:first-child {
            text-align: left;
        }
    }
}

.checkins-table .btn-group .btn {
    margin-right: $margin-xs;
    
    &:last-child {
        margin-right: 0;
    }
}

.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    min-height: 300px;
}

.modern-spinner {
    position: relative;
    width: 60px;
    height: 60px;
    margin-bottom: 1.5rem;
}

.spinner-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 4px solid transparent;
    border-top-color: $primary;
    border-radius: 50%;
    animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    
    &:nth-child(1) {
        animation-delay: -0.45s;
        border-top-color: $primary;
        opacity: 1;
    }
    
    &:nth-child(2) {
        animation-delay: -0.3s;
        border-top-color: color.adjust($primary, $lightness: 15%);
        opacity: 0.8;
        width: 80%;
        height: 80%;
        top: 10%;
        left: 10%;
    }
    
    &:nth-child(3) {
        animation-delay: -0.15s;
        border-top-color: color.adjust($primary, $lightness: 30%);
        opacity: 0.6;
        width: 60%;
        height: 60%;
        top: 20%;
        left: 20%;
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.loading-text {
    color: $color-muted;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    margin: 0;
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 0.6;
    }
    50% {
        opacity: 1;
    }
}

// Responsive adjustments
@media (max-width: $breakpoint-md) {
    .checkin-page {
        padding: $padding-sm;
    }
    
    .visitors-card .visitors-count .count-number {
        font-size: 1.5rem;
    }
    
    .table-responsive {
        font-size: $font-size-sm;
    }
}

@media (max-width: $breakpoint-sm) {
    .breadcrumb-nav-row {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .breadcrumb-section {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        
        .back-btn {
            margin-bottom: $margin-sm;
            margin-right: 0;
        }
    }
    
    .action-section {
        width: 100%;
        margin-top: $margin-sm;
    }
    
    .visitors-card .d-flex {
        flex-direction: column;
        text-align: center;
        
        .visitors-icon {
            margin-right: 0;
            margin-bottom: $margin-sm;
        }
    }
}
</style>
