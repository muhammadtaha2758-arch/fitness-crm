<template>
    <div class="topnav-wrapper">
    	<div class="main-header container-fluid px-2 px-sm-3 px-md-4">
        <!-- Dumbbell Sidebar Toggle -->
        <div 
            class="sidebar-toggle-wrapper" 
            :class="{ 'sidebar-open': getSideBarToggleProperties.isSideNavOpen }"
            @click="sideBarToggle"
        >
            <div class="dumbbell-toggle">
                <div class="weight left"></div>
                <div class="bar"></div>
                <div class="weight right"></div>
            </div>
        </div>

        <!-- Logo and Fitness Name Container -->
        <div class="center-container">
            <!-- Logo -->
            <div class="logo">
                <router-link to="/app/dashboard">
                    <img
                        :src="'/images/tf.png'"
                        alt="Thor Strength Fitness Logo"
                        width="60"
                        height="60"
                        style="background: linear-gradient(to bottom, #23415a, #0f1c29) !important;"
                    />
                </router-link>
            </div>

            <!-- Fitness Name -->
            <div class="fitness-name-container d-none d-lg-flex">
                <h1 class="fitness-name">Thor Strength Fitness</h1>
            </div>
        </div>

        <!-- Search Members Field -->
        <div class="search-members-container d-none d-md-flex flex-shrink-1" :class="{ 'search-active': isSearchOpen }">
            <div class="search-members-field" :class="{ 'active': isSearchOpen }">
                <i class="fas fa-search search-icon" v-if="!searchQuery"></i>
                <i class="fas fa-times search-clear" v-else @click="clearSearch" title="Clear search"></i>
                <input 
                    ref="searchInput"
                    type="text" 
                    placeholder="Search members..." 
                    class="search-input"
                    v-model="searchQuery"
                    @input="handleSearch"
                    @focus="openSearch"
                    @blur="handleBlur"
                    @keydown.esc="closeSearch"
                    @keydown.enter="selectFirstResult"
                />
            </div>
            
            <!-- Search Results Dropdown -->
            <div v-if="isSearchOpen" class="search-results-dropdown">
                <div v-if="searchQuery && searchResults.length > 0" class="search-results-content">
                    <div class="search-results-header">
                        <small class="text-muted">
                            <i class="fas fa-search me-1"></i>
                            Found {{ searchResults.length }} member{{ searchResults.length !== 1 ? 's' : '' }}
                        </small>
                    </div>
                    <div class="search-results-list">
                        <div 
                            v-for="(member, index) in searchResults" 
                            :key="member.id" 
                            class="search-result-item"
                            :class="{ 'active': selectedResultIndex === index }"
                            @click="goToMember(member)"
                            @mouseenter="selectedResultIndex = index"
                        >
                            <div class="member-avatar-small">
                                <img 
                                    :src="getProfileImageUrl(member.profile_image)" 
                                    :alt="member.membername"
                                    class="member-image-small"
                                    @error="handleImageError"
                                />
                            </div>
                            <div class="member-info">
                                <div class="member-name">{{ member.membername || member.name }}</div>
                                <div class="member-email">{{ member.email }}</div>
                                <div class="member-phone" v-if="member.phone">{{ member.phone }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- No Results -->
                <div v-else-if="searchQuery && searchResults.length === 0" class="search-no-results">
                    <i class="fas fa-search me-2"></i>
                    <span>No members found for "{{ searchQuery }}"</span>
                </div>
                
                <!-- Empty State -->
                <div v-else class="search-empty">
                    <i class="fas fa-search me-2"></i>
                    <span>Start typing to search members...</span>
                </div>
            </div>
        </div>

        <!-- Background Blur Overlay -->
        <div v-if="isSearchOpen" class="search-blur-overlay" @click="closeSearch"></div>

        <!-- Header Right -->
        <div class="header-part-right d-flex align-items-center flex-nowrap ms-auto flex-shrink-0">
            <!-- Full screen toggle -->
            <i
                class="i-Full-Screen header-icon d-none d-sm-inline-block"
                @click="handleFullScreen"
            ></i>
            <div class="dropdown">
                <b-dropdown
                    id="notification-dropdown"
                    class="m-md-2 badge-top-container d-none d-sm-inline-block"
                    toggle-class="text-decoration-none"
                    no-caret
                    variant="link"
                    @show="loadNotifications"
                >
                    <template slot="button-content">
                        <span
                            class="badge badge-primary notification-badge"
                            v-if="totalUnreadCount > 0"
                        >{{ totalUnreadCount > 99 ? '99+' : totalUnreadCount }}</span>
                        <i class="i-Bell header-icon"></i>
                    </template>
                    
                    <vue-perfect-scrollbar
                        :settings="{
                            suppressScrollX: true,
                            wheelPropagation: false,
                        }"
                        class="dropdown-menu-right rtl-ps-none notification-dropdown ps scroll"
                        style="max-height: 400px; min-width: 350px;"
                    >
                        <!-- Header -->
                        <div class="notification-header">
                            <div class="d-flex justify-content-between align-items-center">
                                <h6 class="notification-header-title">Notifications</h6>
                                <button 
                                    v-if="unreadNotificationCount > 0"
                                    @click.stop="markAllAsRead"
                                    class="notification-mark-all-btn"
                                    :disabled="markAllReadLoading"
                                >
                                    <span v-if="markAllReadLoading">Updating...</span>
                                    <span v-else>Mark all as read</span>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Notifications List -->
                        <div v-if="adminNotifications.length > 0 || notifs_alert > 0">
                            <!-- Product Quantity Alerts -->
                            <div
                                v-if="notifs_alert > 0"
                                class="notification-item unread"
                                @click="currentUserPermissions && currentUserPermissions.includes('Reports_quantity_alerts') && $router.push('/app/reports/quantity_alerts')"
                            >
                                <div class="notification-item-inner">
                                    <div class="notification-icon-wrapper">
                                        <div class="notification-icon notification-icon-primary">
                                            <i class="fas fa-box"></i>
                                        </div>
                                    </div>
                                    <div class="notification-content">
                                        <div class="notification-title">
                                            Product Quantity Alerts
                                        </div>
                                        <div class="notification-message">
                                            {{ notifs_alert }} product{{ notifs_alert !== 1 ? 's' : '' }} need attention
                                        </div>
                                    </div>
                                    <div class="notification-indicator"></div>
                                </div>
                            </div>
                            
                            <!-- Admin Notifications -->
                            <div
                                v-for="notification in adminNotifications"
                                :key="notification.id"
                                class="notification-item"
                                :class="{ 'unread': !notification.is_read, 'read': notification.is_read }"
                                @click="handleNotificationClick(notification)"
                            >
                                <div class="notification-item-inner">
                                    <div class="notification-icon-wrapper">
                                        <div class="notification-icon" :class="'notification-icon-' + notification.color">
                                            <i :class="'fas ' + notification.icon"></i>
                                        </div>
                                    </div>
                                    <div class="notification-content">
                                        <div class="notification-title">
                                            {{ notification.title }}
                                        </div>
                                        <div class="notification-message">
                                            {{ notification.message }}
                                        </div>
                                        <div class="notification-time">
                                            <i class="far fa-clock"></i>
                                            {{ formatTime(notification.created_at) }}
                                        </div>
                                    </div>
                                    <div v-if="!notification.is_read" class="notification-indicator"></div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Empty State -->
                        <div v-else class="notification-empty-state">
                            <i class="i-Bell"></i>
                            <p>No notifications</p>
                        </div>
                    </vue-perfect-scrollbar>
                </b-dropdown>
            </div>
            <!-- Notification End -->

            <!-- User avatar dropdown -->
            <div class="dropdown">
                <b-dropdown
                    id="dropdown-1"
                    text="Dropdown Button"
                    class="m-md-2 user col align-self-end d-md-block"
                    toggle-class="text-decoration-none"
                    no-caret
                    variant="link"
                >
                    <template slot="button-content">
                        <img
                            :src="avatarUrl"
                            id="userDropdown"
                            alt
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            style="background-color: white"
                        />
                    </template>

                    <div
                        class="dropdown-menu-right"
                        aria-labelledby="userDropdown"
                    >
                        <div class="dropdown-header">
                            <i class="i-Lock-User mr-1"></i>
                            <span>{{ currentUser ? currentUser.username : 'User' }}</span>
                        </div>
                        <router-link
                            to="/app/profile"
                            class="dropdown-item"
                            >Profile</router-link
                        >
                        <router-link
                            v-if="
                                currentUserPermissions &&
                                currentUserPermissions.includes(
                                    'setting_system'
                                )
                            "
                            to="/app/settings/System_settings"
                            class="dropdown-item"
                            >Settings</router-link
                        >
                        <a
                            class="dropdown-item"
                            href="#"
                            @click.prevent="logoutUser"
                            >Logout</a
                        >
                    </div>
                </b-dropdown>
            </div>
        </div>
    	</div>
    	<!-- Spacer to prevent content from sliding under fixed header -->
    	<div aria-hidden="true" class="header-spacer"></div>
    </div>
    <!-- header top menu end -->
</template>

<script>
import Util from "./../../../utils";
import { isMobile } from "mobile-device-detect";
import { mapGetters, mapActions } from "vuex";
import { mixin as clickaway } from "vue-clickaway";
import FlagIcon from "vue-flag-icon";
import axios from "axios";

export default {
    name: "DumbbellIcon",
    mixins: [clickaway],
    components: {
        FlagIcon,
    },

    data() {
        return {
            searchQuery: "",
            searchResults: [],
            allMembers: [],
            isSearchOpen: false,
            selectedResultIndex: -1,
            isDisplay: true,
            isStyle: true,
            isMouseOnMegaMenu: true,
            isMegaMenuOpen: false,
            is_Load: false,
            unreadCountInterval: null,
            visibilityChangeHandler: null,
            isPollingUnreadCount: false, // Flag to prevent concurrent API calls
            markAllReadLoading: false,
        };
    },

    computed: {
        ...mapGetters([
            "currentUser",
            "getSideBarToggleProperties",
            "currentUserPermissions",
            "notifs_alert",
            "adminNotifications",
            "unreadNotificationCount",
        ]),
        
        totalUnreadCount() {
            let count = this.unreadNotificationCount || 0;
            if (this.notifs_alert > 0) {
                count += 1; // Add 1 for product quantity alerts
            }
            return count;
        },
        
        allNotifications() {
            const notifications = [...this.adminNotifications];
            // Product quantity alerts are shown separately in the template
            return notifications;
        },
        
        avatarUrl() {
            if (!this.currentUser || !this.currentUser.avatar) {
                return '/images/avatar/no_avatar.png';
            }
            return '/images/avatar/' + this.currentUser.avatar;
        },
    },

    methods: {
        openSearch() {
            this.isSearchOpen = true;
        },

        closeSearch() {
            this.isSearchOpen = false;
            this.searchQuery = '';
            this.searchResults = [];
            this.selectedResultIndex = -1;
        },

        handleBlur() {
            setTimeout(() => {
                this.isSearchOpen = false;
            }, 200);
        },

        handleSearch() {
            if (this.searchQuery.trim() === '') {
                this.searchResults = [];
                this.selectedResultIndex = -1;
                return;
            }
            
            this.filterMembersBySearch();
            this.selectedResultIndex = 0;
        },

        filterMembersBySearch() {
            const query = this.searchQuery.toLowerCase().trim();
            
            if (query === '') {
                this.searchResults = [];
                return;
            }

            this.searchResults = this.allMembers.filter(member => {
                return (
                    (member.membername && member.membername.toLowerCase().includes(query)) ||
                    (member.name && member.name.toLowerCase().includes(query)) ||
                    (member.email && member.email.toLowerCase().includes(query)) ||
                    (member.phone && member.phone.toLowerCase().includes(query)) ||
                    (member.code && member.code.toLowerCase().includes(query))
                );
            });
        },

        clearSearch() {
            this.searchQuery = '';
            this.searchResults = [];
            this.selectedResultIndex = -1;
            if (this.$refs.searchInput) {
                this.$refs.searchInput.focus();
            }
        },

        goToMember(member) {
            this.$router.push({
                name: 'MemberDetails',
                params: { id: member.id }
            }).catch(err => {
                this.$router.push(`/app/Members/MemberDetails/${member.id}`);
            });
            this.closeSearch();
        },

        selectFirstResult() {
            if (this.searchResults.length > 0) {
                this.goToMember(this.searchResults[this.selectedResultIndex]);
            }
        },

        getProfileImageUrl(profileImage) {
            if (profileImage && profileImage !== '') {
                return `/images/avatar/${profileImage}`;
            }
            return 'https://randomuser.me/api/portraits/men/1.jpg';
        },

        handleImageError(event) {
            event.target.src = 'https://randomuser.me/api/portraits/men/1.jpg';
        },

        async loadMembersForSearch() {
            try {
                const url = 'members?page=1&limit=1000&SortField=id&SortType=asc';
                const response = await axios.get(url);
                this.allMembers = response.data.clients || [];
            } catch (error) {
                this.allMembers = [];
                const msg = error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : "Could not load members for search. Please try again.";
                this.makeToast("danger", msg, this.$t("Error") || "Error");
            }
        },
        ...mapActions([
            "changeSecondarySidebarProperties",
            "changeSidebarProperties",
            "changeThemeMode",
            "logout",
            "fetchAdminNotifications",
            "fetchUnreadCount",
            "markNotificationAsRead",
            "markAllNotificationsAsRead",
        ]),

        SetLocal(locale) {
            this.$i18n.locale = locale;
            this.$store.dispatch("language/setLanguage", locale);
            Fire.$emit("ChangeLanguage");
        },

        handleFullScreen() {
            Util.toggleFullScreen();
        },
        async logoutUser() {
            try {
                await this.logout();
            } catch (error) {
                const msg = error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : "Logout failed. Please try again.";
                this.makeToast("danger", msg, this.$t("Error") || "Error");
            }
        },

        closeMegaMenu() {
            this.isMegaMenuOpen = false;
        },
        toggleMegaMenu() {
            this.isMegaMenuOpen = !this.isMegaMenuOpen;
        },
        toggleSearch() {
            this.isSearchOpen = !this.isSearchOpen;
        },

        sideBarToggle(el) {
            if (this.getSideBarToggleProperties.isSideNavOpen) {
                this.changeSidebarProperties();
                
                if (this.getSideBarToggleProperties.isSecondarySideNavOpen) {
                    this.changeSecondarySidebarProperties();
                }
            } else {
                this.changeSidebarProperties();
            }
        },

        handleClick() {
            this.$emit("dumbbell-clicked");
        },
        
        async loadNotifications() {
            await this.fetchAdminNotifications();
            await this.fetchUnreadCount();
        },
        
        async handleNotificationClick(notification) {
            if (!notification.is_read) {
                try {
                    await this.markNotificationAsRead(notification.id);
                    await this.fetchUnreadCount();
                } catch (error) {
                    const msg = error.response && error.response.data && error.response.data.message
                        ? error.response.data.message
                        : "Could not update notification. Please try again.";
                    this.makeToast("danger", msg, this.$t("Error") || "Error");
                }
            }
        },
        
        async markAllAsRead() {
            if (this.markAllReadLoading) return;
            this.markAllReadLoading = true;
            try {
                await this.markAllNotificationsAsRead();
                await this.loadNotifications();
            } catch (error) {
                const msg = error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : "Could not mark all as read. Please try again.";
                this.makeToast("danger", msg, this.$t("Error") || "Error");
            } finally {
                this.markAllReadLoading = false;
            }
        },
        
        formatTime(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const diff = now - date;
            const minutes = Math.floor(diff / 60000);
            const hours = Math.floor(diff / 3600000);
            const days = Math.floor(diff / 86400000);
            
            if (minutes < 1) return 'Just now';
            if (minutes < 60) return `${minutes}m ago`;
            if (hours < 24) return `${hours}h ago`;
            if (days < 7) return `${days}d ago`;
            return date.toLocaleDateString();
        },
        
        startUnreadCountPolling() {
            this.stopUnreadCountPolling();
            const POLLING_INTERVAL = 300000;
            
            const pollUnreadCount = async () => {
                if (document.hidden) {
                    return;
                }
                
                if (this.isPollingUnreadCount) {
                    return;
                }
                
                this.isPollingUnreadCount = true;
                
                try {
                    await this.fetchUnreadCount();
                } catch (error) {
                } finally {
                    this.isPollingUnreadCount = false;
                }
            };
            
            pollUnreadCount();
            this.unreadCountInterval = setInterval(pollUnreadCount, POLLING_INTERVAL);
        },
        
        setupVisibilityHandler() {
            this.removeVisibilityHandler();
            
            this.visibilityChangeHandler = () => {
                if (document.hidden) {
                    this.stopUnreadCountPolling();
                } else {
                    if (!this.unreadCountInterval) {
                        this.startUnreadCountPolling();
                    }
                }
            };
            
            document.addEventListener('visibilitychange', this.visibilityChangeHandler);
        },
        
        removeVisibilityHandler() {
            if (this.visibilityChangeHandler) {
                document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
                this.visibilityChangeHandler = null;
            }
        },
        
        stopUnreadCountPolling() {
            if (this.unreadCountInterval) {
                clearInterval(this.unreadCountInterval);
                this.unreadCountInterval = null;
            }
            this.isPollingUnreadCount = false;
        },
    },

    mounted() {
        this.loadMembersForSearch();
        this.loadNotifications();
        this.setupVisibilityHandler();
        this.startUnreadCountPolling();
    },

    beforeDestroy() {
        this.stopUnreadCountPolling();
        this.removeVisibilityHandler();
    },
    
    activated() {
        if (!this.visibilityChangeHandler) {
            this.setupVisibilityHandler();
        }
        
        if (!this.unreadCountInterval && !document.hidden) {
            this.startUnreadCountPolling();
        }
    },
    
    deactivated() {
        this.stopUnreadCountPolling();
        this.removeVisibilityHandler();
    },
};
</script>

<style>
/* Sidebar Toggle - Dumbbell Icon */
.sidebar-toggle-wrapper {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    margin-left: 8px;
    background: transparent;
    transition: all 0.3s ease;
    position: relative;
}

.sidebar-toggle-wrapper:hover {
    transform: translateY(-2px);
}

.sidebar-toggle-wrapper:active {
    transform: translateY(0) scale(0.95);
    background: rgba(255, 64, 64, 0.15);
}

.sidebar-toggle-wrapper.sidebar-open .dumbbell-toggle {
    animation: dumbbell-rotate 0.3s ease-in-out;
}

.sidebar-toggle-wrapper:not(.sidebar-open) .dumbbell-toggle {
    animation: dumbbell-bounce 0.3s ease-in-out;
}

.dumbbell-toggle {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
    transition: all 0.3s ease;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.weight {
    width: 16px;
    height: 24px;
    background: linear-gradient(135deg, #f5f5f3, #e0e0e0);
    border-radius: 3px;
    position: relative;
    box-shadow: 0 3px 6px rgba(255, 64, 64, 0.4);
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.weight.left {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.weight.right {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.bar {
    width: 22px;
    height: 5px;
    background: linear-gradient(90deg, #252525, #444);
    margin: 0 -2px;
    position: relative;
    z-index: 1;
    border-radius: 3px;
    box-shadow: 0 2px 5px rgba(255, 64, 64, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Animation Keyframes */
@keyframes dumbbell-bounce {
    0%, 100% {
        transform: translateY(0) scale(1);
    }
    50% {
        transform: translateY(-3px) scale(1.05);
    }
}

@keyframes dumbbell-rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(90deg);
    }
}

@keyframes dumbbell-pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}

/* Hover animations - only when not animating state change */
.sidebar-toggle-wrapper:hover .dumbbell-toggle:not(:active) {
    filter: drop-shadow(0 4px 8px rgba(255, 64, 64, 0.5));
    transform: scale(1.05);
}

.sidebar-toggle-wrapper:hover .weight {
    animation: dumbbell-pulse 0.8s ease-in-out infinite;
    box-shadow: 0 4px 8px rgba(255, 64, 64, 0.6);
}

.sidebar-toggle-wrapper:hover .bar {
    box-shadow: 0 3px 7px rgba(255, 64, 64, 0.6);
    transform: scale(1.05);
}

.center-container {
    flex: 0 1 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-width: 0; /* allow shrink */
}

/* Fitness Name */
.fitness-name-container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 15px;
}

.fitness-name {
    font-size: 1.75rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
    text-shadow: 1px 1px 2px #dc3545;
    letter-spacing: 0.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    text-transform: uppercase;
}

/* Responsive Design */
@media (max-width: 768px) {
    .fitness-name {
        font-size: 1.1rem;
        letter-spacing: 0.3px;
    }

    .fitness-name-container {
        padding: 0 10px;
    }
}

@media (max-width: 576px) {
    .fitness-name {
        font-size: 0.9rem;
        letter-spacing: 0.2px;
    }

    .fitness-name-container {
        padding: 0 5px;
    }
}

@media (max-width: 480px) {
    .fitness-name {
        font-size: 0.7rem;
        letter-spacing: 0.1px;
    }
}

/* Logo styling */
.logo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo img {
    background: linear-gradient(to bottom, #23415a, #0f1c29) !important;
    border-radius: 8px;
    padding: 5px;
    width: 90px;
    height: 70px;
    display: block;
}

/* Main Header Layout */
.topnav-wrapper .main-header {
    flex-wrap: nowrap !important; /* override global _header.scss wrap */
}

/* Spacer that matches header height per breakpoint */
.header-spacer {
    height: 60px;
}


.topnav-wrapper .header-part-right {
    display: flex;
    align-items: center;
    gap: 15px;
}

/* Avoid global logo width constraint */
.topnav-wrapper .logo { width: auto !important; }

/* Responsive adjustments for the sidebar toggle */
@media (max-width: 768px) {
    .sidebar-toggle-wrapper {
        width: 50px;
        height: 50px;
        margin-left: 10px;
        padding: 8px;
    }
    
    .weight {
        width: 12px;
        height: 18px;
    }
    
    .bar {
        width: 16px;
        height: 4px;
    }
}

@media (max-width: 576px) {
    .sidebar-toggle-wrapper {
        width: 40px;
        height: 40px;
        margin-left: 8px;
        padding: 6px;
    }
    
    .weight {
        width: 10px;
        height: 16px;
    }
    
    .bar {
        width: 14px;
        height: 3px;
    }
    
    .main-header {
        padding: 0 15px;
        min-height: 70px;
    }
}

/* Mobile Responsiveness - Comprehensive */
@media (max-width: 768px) {
    .topnav-wrapper .main-header {
        padding: 0 15px;
        min-height: 70px;
        gap: 10px;
        overflow: hidden; /* avoid second row */
    }
    .header-spacer {
        height: 70px;
    }
    
    .center-container {
        gap: 10px;
        flex: 1;
        justify-content: center;
    }
    
    .logo img {
        width: 70px;
        height: 55px;
        padding: 3px;
    }
    
    .fitness-name {
        font-size: 1.2rem;
        letter-spacing: 0.3px;
    }
    
    .fitness-name-container {
        padding: 0 8px;
    }
    
    .header-part-right {
        gap: 10px;
    }
    
    /* Hide fullscreen button on mobile */
    .i-Full-Screen {
        display: none !important;
    }
    
    /* Adjust notification and user dropdown spacing */
    .badge-top-container,
    .user {
        margin: 0 5px !important;
    }
    
    /* Make user avatar smaller on mobile */
    .user img {
        width: 35px !important;
        height: 35px !important;
    }
}

@media (max-width: 576px) {
    .topnav-wrapper .main-header {
        padding: 0 10px;
        min-height: 65px;
        gap: 8px;
        overflow: hidden;
    }
    .header-spacer {
        height: 65px;
    }
    
    .center-container {
        gap: 8px;
    }
    
    .logo img {
        width: 55px;
        height: 40px;
        padding: 2px;
    }
    
    .fitness-name {
        font-size: 1rem;
        letter-spacing: 0.2px;
    }
    
    .fitness-name-container {
        padding: 0 5px;
    }
    
    .header-part-right {
        gap: 8px;
    }
    
    .badge-top-container,
    .user {
        margin: 0 3px !important;
    }
    
    .user img {
        width: 30px !important;
        height: 30px !important;
    }
    
    /* Adjust notification badge positioning */
    .badge {
        font-size: 0.7rem;
        padding: 0.25rem 0.4rem;
    }
}

@media (max-width: 480px) {
    .topnav-wrapper .main-header {
        padding: 0 8px;
        min-height: 60px;
        gap: 6px;
        overflow: hidden;
    }
    .header-spacer {
        height: 60px;
    }
    
    .center-container {
        gap: 6px;
    }
    
    .logo img {
        width: 50px;
        height: 40px;
        padding: 2px;
    }
    
    .fitness-name {
        font-size: 0.9rem;
        letter-spacing: 0.1px;
    }
    
    .fitness-name-container {
        padding: 0 3px;
    }
    
    .header-part-right {
        gap: 6px;
    }
    
    .badge-top-container,
    .user {
        margin: 0 2px !important;
    }
    
    .user img {
        width: 28px !important;
        height: 28px !important;
    }
    
    /* Further reduce spacing for very small screens */
    .sidebar-toggle-wrapper {
        width: 35px;
        height: 35px;
        margin-left: 5px;
        padding: 5px;
    }
    
    .weight {
        width: 8px;
        height: 14px;
    }
    
    .bar {
        width: 12px;
        height: 2px;
    }
}

@media (max-width: 375px) {
    .topnav-wrapper .main-header {
        padding: 0 6px;
        min-height: 55px;
        gap: 4px;
    }
    .header-spacer {
        height: 55px;
    }
    
    .center-container {
        gap: 4px;
    }
    
    .logo img {
        width: 45px;
        height: 35px;
        padding: 1px;
    }
    
    .fitness-name {
        font-size: 0.8rem;
        letter-spacing: 0.05px;
    }
    
    .fitness-name-container {
        padding: 0 2px;
    }
    
    .header-part-right {
        gap: 4px;
    }
    
    .badge-top-container,
    .user {
        margin: 0 1px !important;
    }
    
    .user img {
        width: 25px !important;
        height: 25px !important;
    }
    
    .sidebar-toggle-wrapper {
        width: 35px;
        height: 35px;
        margin-left: 3px;
        padding: 4px;
    }
    
    .weight {
        width: 7px;
        height: 12px;
    }
    
    .bar {
        width: 10px;
        height: 2px;
    }
}

/* Ensure all content stays in the same row on mobile */
@media (max-width: 768px) {
    .topnav-wrapper .main-header {
        flex-direction: row;
        flex-wrap: nowrap;
        overflow: hidden;
    }
    
    .center-container {
        flex-shrink: 1;
        min-width: 0;
    }
    
    .fitness-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    }
    
    .header-part-right {
        flex-shrink: 0;
        white-space: nowrap;
    }
}

/* Optimize for very small screens */
@media (max-width: 320px) {
    .main-header {
        padding: 0 4px;
        min-height: 50px;
        gap: 3px;
    }
    .header-spacer {
        height: 50px;
    }
    
    .center-container {
        gap: 3px;
    }
    
    .logo img {
        width: 40px;
        height: 30px;
        padding: 1px;
    }
    
    .fitness-name {
        font-size: 0.7rem;
        letter-spacing: 0;
    }
    
    .fitness-name-container {
        padding: 0 1px;
    }
    
    .header-part-right {
        gap: 3px;
    }
    
    .badge-top-container,
    .user {
        margin: 0 !important;
    }
    
    .user img {
        width: 22px !important;
        height: 22px !important;
    }
    
    .sidebar-toggle-wrapper {
        width: 30px;
        height: 30px;
        margin-left: 2px;
        padding: 3px;
    }
    
    .weight {
        width: 6px;
        height: 10px;
    }
    
    .bar {
        width: 8px;
        height: 1px;
    }
}

/* Search Members Field Styles */
.search-members-container {
    flex: 0 1 380px;
    max-width: 400px;
    margin: 0 20px;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 1000; /* Higher than blur overlay */
}

.search-members-container.search-active {
    z-index: 1001; /* Even higher when active */
}

.search-members-field {
    position: relative;
    width: 100%;
    max-width: 300px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    transition: all 0.3s ease;
    z-index: 1002; /* Higher than everything */
}

.search-members-field:focus-within {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 2px rgba(255, 64, 64, 0.2);
}

.search-icon {
    color: #fff;
    font-size: 16px;
    margin-right: 10px;
    opacity: 0.7;
}

.search-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    position: relative;
}

.search-input::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
}

.search-clear {
    color: #fff;
    font-size: 16px;
    margin-left: 10px;
    opacity: 0.7;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    z-index: 1003; /* Highest z-index */
}

.search-clear:hover {
    color: #dc3545;
    opacity: 1;
}

/* Background Blur Overlay */
.search-blur-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    z-index: 998;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* Search Results Dropdown */
.search-results-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    z-index: 1004; /* Higher than search field */
    max-height: 400px;
    overflow: hidden;
    margin-top: 4px;
    animation: slideDown 0.3s ease;
}

@keyframes slideDown {
    from { 
        opacity: 0;
        transform: translateY(-10px);
    }
    to { 
        opacity: 1;
        transform: translateY(0);
    }
}

.search-results-content {
    max-height: 400px;
    overflow-y: auto;
}

.search-results-header {
    padding: 12px 16px;
    background: #f8f9fa;
    border-bottom: 1px solid #e0e0e0;
    font-size: 14px;
    color: #666;
}

.search-results-list {
    max-height: 300px;
    overflow-y: auto;
}

.search-result-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    border-bottom: 1px solid #f5f5f5;
}

.search-result-item:hover,
.search-result-item.active {
    background-color: #f8f9fa;
}

.search-result-item:last-child {
    border-bottom: none;
}

.member-avatar-small {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 12px;
    flex-shrink: 0;
}

.member-image-small {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.member-info {
    min-width: 0;
}

.member-name {
    font-weight: 600;
    color: #333;
    font-size: 14px;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.member-email {
    color: #666;
    font-size: 12px;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.member-phone {
    color: #999;
    font-size: 11px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.search-no-results,
.search-empty {
    padding: 20px 16px;
    text-align: center;
    color: #666;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-empty {
    color: #999;
}

/* Search field active state */
.search-members-field.active {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 2px rgba(255, 64, 64, 0.3);
}

.search-indicator {
    width: 8px;
    height: 8px;
    background: #dc3545;
    border-radius: 50%;
    margin-left: 10px;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.5;
        transform: scale(1.1);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .search-members-container {
        margin: 0 10px;
        max-width: 250px;
    }
    
    .search-members-field {
        max-width: 200px;
        height: 35px;
        padding: 0 12px;
    }
    
    .search-input {
        font-size: 13px;
    }
    
    .search-input::placeholder {
        font-size: 13px;
    }
}

@media (max-width: 576px) {
    .search-members-container {
        display: none; /* Hide on very small screens */
    }
}

/* Notification Badge Styles */
.notification-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    font-size: 10px;
    font-weight: 600;
    padding: 3px 7px;
    border-radius: 12px;
    min-width: 15px;
    text-align: center;
    z-index: 10;
    background: #dc3545;
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

/* Notification Dropdown Styles */
.notification-dropdown {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12) !important;
    border: 1px solid rgba(0, 0, 0, 0.08) !important;
    border-radius: 12px !important;
    overflow: hidden;
}

.notification-header {
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    padding: 12px 16px;
    border-bottom: none;
}

.notification-header-title {
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
    letter-spacing: 0.3px;
}

.notification-mark-all-btn {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #ffffff;
    font-size: 10px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.notification-mark-all-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-1px);
}

.notification-mark-all-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
}

.notification-mark-all-btn:disabled:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
    transform: none;
}

.notification-item {
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
    background: #ffffff;
}

.notification-item:last-child {
    border-bottom: none;
}

.notification-item.unread {
    background: linear-gradient(to right, #fff5f5 0%, #ffffff 8%);
    border-left: 5px solid #dc3545;
    font-weight: 500;
}

.notification-item.unread:hover {
    background: linear-gradient(to right, #ffeaea 0%, #f8f9ff 8%);
    transform: translateX(2px);
}

.notification-item.read {
    background: #fafafa;
    opacity: 0.7;
    border-left: 5px solid transparent;
}

.notification-item.read:hover {
    background: #f5f5f5;
    opacity: 0.85;
}

.notification-item-inner {
    display: flex;
    align-items: flex-start;
    padding: 12px 16px;
    gap: 12px;
}

.notification-icon-wrapper {
    flex-shrink: 0;
    position: relative;
}

.notification-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.notification-item:hover .notification-icon {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Icon color variants - All using red theme */
.notification-icon-success {
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    color: #ffffff;
}

.notification-icon-primary {
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    color: #ffffff;
}

.notification-icon-info {
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    color: #ffffff;
}

.notification-icon-warning {
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    color: #ffffff;
}

.notification-icon-danger {
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    color: #ffffff;
}

.notification-content {
    flex: 1;
    min-width: 0;
    padding-right: 8px;
}

.notification-title {
    font-size: 14px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 6px;
    line-height: 1.4;
    letter-spacing: 0.2px;
}

.notification-item.unread .notification-title {
    color: #1a252f;
    font-weight: 700;
    font-size: 14px;
}

.notification-item.read .notification-title {
    color: #6c757d;
    font-weight: 500;
}

.notification-message {
    font-size: 13px;
    line-height: 1.5;
    color: #6c757d;
    margin-bottom: 8px;
    word-wrap: break-word;
}

.notification-item.unread .notification-message {
    color: #495057;
    font-weight: 400;
}

.notification-item.read .notification-message {
    color: #9ca3af;
}

.notification-time {
    font-size: 11px;
    color: #adb5bd;
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.3px;
}

.notification-time i {
    font-size: 10px;
}

.notification-indicator {
    width: 10px;
    height: 10px;
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 4px;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15);
    animation: pulse-indicator 2s infinite;
}

@keyframes pulse-indicator {
    0%, 100% {
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15);
    }
    50% {
        box-shadow: 0 0 0 6px rgba(220, 53, 69, 0.05);
    }
}

.notification-footer {
    background: linear-gradient(to top, #f8f9fa 0%, #ffffff 100%);
    padding: 12px 20px;
    border-top: 1px solid #e9ecef;
    text-align: center;
}

.notification-footer-link {
    color: #dc3545;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
    display: inline-block;
    letter-spacing: 0.3px;
}

.notification-footer-link:hover {
    color: #c82333;
    text-decoration: underline;
    transform: translateY(-1px);
}

/* Empty State */
.notification-empty-state {
    padding: 40px 20px;
    text-align: center;
}

.notification-empty-state i {
    font-size: 56px;
    opacity: 0.2;
    color: #6c757d;
    margin-bottom: 12px;
}

.notification-empty-state p {
    color: #adb5bd;
    font-size: 14px;
    margin: 0;
    font-weight: 500;
}

/* Badge positioning */
.badge-top-container {
    position: relative;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .notification-item-inner {
        padding: 14px 16px;
        gap: 12px;
    }
    
    .notification-icon {
        width: 40px;
        height: 40px;
        font-size: 16px;
    }
    
    .notification-title {
        font-size: 13px;
    }
    
    .notification-message {
        font-size: 12px;
    }
}
</style>