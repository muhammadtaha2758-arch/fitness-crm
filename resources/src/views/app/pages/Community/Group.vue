<template>
    <div class="groups-page">
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
                                <i class="fas fa-users"></i>
                                Groups
                            </li>
                        </ol>
                    </div>
                </nav>
            </div>
        </div>

        <!-- Header Section -->
        <div class="groups-header">
            <div class="header-content">
                <h1 class="page-title">Groups</h1>
                <button class="add-group-btn" @click="addNewGroup">
                    <i class="fas fa-plus"></i>
                    Create New Group
                </button>
            </div>
        </div>

        <!-- Search and Filter Section -->
        <div class="search-filter-section">
            <div class="search-container">
                <div class="search-bar">
                    <i class="fas fa-search search-icon"></i>
                    <input 
                        type="text" 
                        v-model="searchQuery"
                        placeholder="Search groups..." 
                        class="search-input"
                    >
                </div>
                
                <div class="filter-options">
                    <!-- Country Flags -->
                    <div class="country-flags">
                        <div class="flag-icon" title="United Kingdom">
                            <img src="/images/vendor/flag-icon-css/flags/4x3/gb.svg" alt="United Kingdom" class="flag-image">
                        </div>
                        <div class="flag-icon" title="Netherlands">
                            <img src="/images/vendor/flag-icon-css/flags/4x3/nl.svg" alt="Netherlands" class="flag-image">
                        </div>
                        <div class="flag-icon" title="Germany">
                            <img src="/images/vendor/flag-icon-css/flags/4x3/de.svg" alt="Germany" class="flag-image">
                        </div>
                        <div class="flag-icon" title="Spain">
                            <img src="/images/vendor/flag-icon-css/flags/4x3/es.svg" alt="Spain" class="flag-image">
                        </div>
                        <div class="flag-icon" title="France">
                            <img src="/images/vendor/flag-icon-css/flags/4x3/fr.svg" alt="France" class="flag-image">
                        </div>
                        <div class="flag-icon" title="Italy">
                            <img src="/images/vendor/flag-icon-css/flags/4x3/it.svg" alt="Italy" class="flag-image">
                        </div>
                        <div class="flag-icon" title="Portugal">
                            <img src="/images/vendor/flag-icon-css/flags/4x3/pt.svg" alt="Portugal" class="flag-image">
                        </div>
                        <div class="flag-icon" title="Turkey">
                            <img src="/images/vendor/flag-icon-css/flags/4x3/tr.svg" alt="Turkey" class="flag-image">
                        </div>
                        <div class="flag-icon" title="Greece">
                            <img src="/images/vendor/flag-icon-css/flags/4x3/gr.svg" alt="Greece" class="flag-image">
                        </div>
                        <div class="flag-icon" title="Poland">
                            <img src="/images/vendor/flag-icon-css/flags/4x3/pl.svg" alt="Poland" class="flag-image">
                        </div>
                        <div class="flag-icon" title="Sweden">
                            <img src="/images/vendor/flag-icon-css/flags/4x3/se.svg" alt="Sweden" class="flag-image">
                        </div>
                        <div class="flag-icon" title="Denmark">
                            <img src="/images/vendor/flag-icon-css/flags/4x3/dk.svg" alt="Denmark" class="flag-image">
                        </div>
                    </div>
                    
                    <!-- Filter Dropdown -->
                    <div class="filter-dropdown">
                        <select v-model="selectedFilter" class="filter-select">
                            <option value="all">All</option>
                            <option value="my-groups">My Groups</option>
                        </select>
                        <i class="fas fa-chevron-down dropdown-icon"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Groups Grid -->
        <div v-if="isLoading" class="loading-container">
            <p>Loading groups...</p>
        </div>
        <div v-else-if="filteredGroups.length === 0" class="no-groups-container">
            <p v-if="searchQuery">No groups found matching your search.</p>
            <p v-else>No groups found. Create your first group!</p>
        </div>
        <div v-else class="groups-grid">
            <div v-for="group in filteredGroups" :key="group.id" class="group-card" @click="openGroup(group)">
                <div class="group-image">
                    <img :src="getGroupImage(group)" :alt="group.name" class="group-cover-image">
                </div>
                <div class="group-info">
                    <h3 class="group-name">{{ group.name }}</h3>
                    <p v-if="group.description" class="group-description">{{ group.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Groups",
    data() {
        return {
            searchQuery: '',
            selectedFilter: 'all',
            groups: [],
            isLoading: false,
        };
    },
    computed: {
        filteredGroups() {
            // Show all groups with search filtering
            const q = this.searchQuery.trim().toLowerCase();
            if (!q) return this.groups;
            return this.groups.filter(g =>
                (g.name || '').toLowerCase().includes(q) ||
                (g.description || '').toLowerCase().includes(q)
            );
        }
    },
    created(){
        this.loadGroups();
    },
    activated() {
        // Reload groups when component is activated (e.g., after returning from create page)
        this.loadGroups();
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
        
        async addNewGroup() {
            this.$router.push('/app/community/edit-group');
        },
        openGroup(group){
            this.$router.push(`/app/community/feed`);
        },
        getGroupImage(group) {
            // If group has a custom avatar, use it
            if (group.avatar) {
                return group.avatar;
            }
            
            // Assign different images based on group ID or name
            const groupId = group.id;
            const groupName = (group.name || '').toLowerCase();
            
            // Alternative approach: Assign images based on group order/index
            const groupIndex = this.groups.findIndex(g => g.id === groupId);
            
            if (groupIndex === 0) {
                console.log('Using thorstrengthfitness.png for first group:', group.name);
                return '/images/thorstrengthfitness.png';
            } else if (groupIndex === 1) {
                console.log('Using healthyeat.jpg for second group:', group.name);
                return '/images/healthyeat.jpg';
            } else if (groupIndex === 2) {
                console.log('Using Teamworks.png for third group:', group.name);
                return '/images/Teamworks.png';
            }
            
            // Original logic as fallback
            if (groupId === 1 || groupName.includes('fitness') || groupName.includes('strength')) {
                console.log('Using thorstrengthfitness.png for group:', group.name);
                return '/images/thorstrengthfitness.png';
            } else if (groupId === 2 || groupName.includes('cardio') || groupName.includes('running')) {
                console.log('Using healthyeat.jpg for group:', group.name);
                return '/images/healthyeat.jpg';
            } else if (groupId === 3 || groupName.includes('yoga') || groupName.includes('wellness')) {
                console.log('Using Teamworks.png for group:', group.name);
                return '/images/Teamworks.png';
            }
            return '/images/thorstrengthfitness.png';
        },
        
        async loadGroups(){
            try{
                this.isLoading = true;
                const response = await window.axios.get('communication/groups');
                console.log('API Response:', response);
                console.log('Response Data:', response.data);
                
                const data = response.data;
                
                // Check if response has success and groups
                if(data && data.success && Array.isArray(data.groups)){
                    this.groups = data.groups;
                    console.log('Groups loaded:', this.groups.length, this.groups);
                } else if(data && Array.isArray(data.groups)){
                    // Handle case where success might not be in response
                    this.groups = data.groups;
                    console.log('Groups loaded (without success flag):', this.groups.length, this.groups);
                } else if(data && Array.isArray(data)){
                    // Handle case where response is directly an array
                    this.groups = data;
                    console.log('Groups loaded (direct array):', this.groups.length, this.groups);
                } else {
                    this.groups = [];
                    console.warn('Unexpected response structure:', data);
                }
            }catch(e){
                this.groups = [];
                console.error('Error loading groups:', e);
                console.error('Error response:', e.response);
                console.error('Error data:', e.response?.data);
                // If it's a 401 error, redirect to login
                if (e.response?.status === 401) {
                    console.error('Authentication failed. Token may be missing or expired. Redirecting to login...');
                    // The axios interceptor should handle redirect, but if it doesn't, do it here
                    if (!e.isHandled && !e.isAuthError) {
                        window.location.href = '/login';
                    }
                }
            }finally{
                this.isLoading = false;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/sass/_variables.scss";

.groups-page {
    min-height: 100vh;
    background: #f5f5f3;
    padding: 20px;
}

/* Header Section */
.groups-header {
    margin-bottom: 30px;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

.page-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #252525;
    margin: 0;
}

.add-group-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
}

.add-group-btn:hover {
    background: #dc3545;
    transform: translateY(-2px);
}

.add-group-btn i {
    font-size: 14px;
}

/* Search and Filter Section */
.back-button {
    color: #dc3545 !important;
}

.search-filter-section {
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
}

.search-container {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
}

.search-bar {
    position: relative;
    flex: 1;
    min-width: 200px;
}

.search-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #6c757d;
    font-size: 16px;
}

.search-input {
    width: 100%;
    padding: 12px 15px 12px 45px;
    border: 1px solid #e9ecef;
    border-radius: 25px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
}

.search-input:focus {
    border-color: #dc3545;
}

.search-input::placeholder {
    color: #6c757d;
    opacity: 1;
}

.filter-options {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
}

.country-flags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.flag-icon {
    cursor: pointer;
    transition: transform 0.2s ease;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.flag-icon:hover {
    transform: scale(1.2);
    background: #f8f9fa;
}

.flag-image {
    width: 24px;
    height: 18px;
    object-fit: cover;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filter-dropdown {
    position: relative;
    display: flex;
    align-items: center;
}

.filter-select {
    padding: 12px 40px 12px 15px;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    font-size: 16px;
    background: white;
    cursor: pointer;
    outline: none;
    appearance: none;
    min-width: 120px;
}

.dropdown-icon {
    position: absolute;
    right: 15px;
    color: #6c757d;
    pointer-events: none;
}

/* Groups Grid */
.groups-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
}

.group-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.group-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.group-image {
    height: 200px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.group-cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.group-info {
    padding: 20px;
}

.group-name {
    font-size: 18px;
    font-weight: 600;
    color: #252525;
    margin: 0 0 8px 0;
    text-align: center;
}

.group-description {
    font-size: 14px;
    color: #6c757d;
    margin: 0;
    text-align: center;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.loading-container,
.no-groups-container {
    text-align: center;
    padding: 60px 20px;
    color: #6c757d;
    font-size: 16px;
    max-width: 1200px;
    margin: 0 auto;
}



/* Responsive Design */
@media (max-width: 992px) {
    .groups-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
}

@media (max-width: 768px) {
    .groups-page {
        padding: 15px;
    }
    
    .header-content {
        flex-direction: column;
        gap: 20px;
        align-items: stretch;
    }
    
    .page-title {
        font-size: 2rem;
        text-align: center;
    }
    
    .search-container {
        flex-direction: column;
        align-items: stretch;
    }
    
    .filter-options {
        justify-content: center;
    }
    
    .groups-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .country-flags {
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .page-title {
        font-size: 1.5rem;
    }
    
    .add-group-btn {
        padding: 10px 16px;
        font-size: 14px;
    }
    
    .search-input {
        font-size: 14px;
    }
    
    .group-name {
        font-size: 16px;
    }
}
</style>
