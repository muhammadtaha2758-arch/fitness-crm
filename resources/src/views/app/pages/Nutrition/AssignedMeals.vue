<template>
    <div class="assigned-meals-container">
        <!-- Page Header -->
        <div class="page-header">
            <div class="header-content">
                <h1 class="page-title">🍽️ Assigned Meals</h1>
                <p class="page-subtitle">Track and manage member meal assignments and progress</p>
            </div>
            
            <!-- Action Buttons -->
            <div class="header-actions">
                <button class="btn btn-primary" @click="exportData">
                    <i class="fas fa-download"></i>
                    Export Data
                </button>
                <button class="btn btn-secondary" @click="refreshData">
                    <i class="fas fa-sync"></i>
                    Refresh
                </button>
            </div>
        </div>

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
            <div class="scroll-indicator">
                <i class="fas fa-arrows-alt-h"></i>
                <span>Scroll horizontally to see more columns</span>
            </div>
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th class="sticky-column">USER</th>
                            <th>Date</th>
                            <th>Body Fat</th>
                            <th>Water Intake</th>
                            <th>Hunger</th>
                            <th>Strength</th>
                            <th>Energy</th>
                            <th>Feel</th>
                            <th>Cardio</th>
                            <th>Plan</th>
                            <th>Calories</th>
                            <th>Protein</th>
                            <th>Carbs</th>
                            <th>Fat</th>
                            <th>Meal Deviations</th>
                            <th>Activities</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(log, index) in filteredLogs" :key="index" class="data-row">
                            <td class="sticky-column user-cell">
                                <div class="user-info">
                                    <span class="user-name">{{ log.user }}</span>
                                </div>
                            </td>
                            <td class="date-cell">{{ log.date }}</td>
                            <td class="data-cell">{{ log.bodyFat || 'N/A' }}</td>
                            <td class="data-cell">{{ log.waterIntake || 'N/A' }}</td>
                            <td class="data-cell">{{ log.hunger || 'N/A' }}</td>
                            <td class="data-cell">{{ log.strength || 'N/A' }}</td>
                            <td class="data-cell">{{ log.energy || 'N/A' }}</td>
                            <td class="text-cell">{{ log.feel || 'N/A' }}</td>
                            <td class="text-cell">{{ log.cardio || 'N/A' }}</td>
                            <td class="data-cell">{{ log.plan || 'N/A' }}</td>
                            <td class="data-cell">{{ log.calories || 'N/A' }}</td>
                            <td class="data-cell">{{ log.protein || 'N/A' }}</td>
                            <td class="data-cell">{{ log.carbs || 'N/A' }}</td>
                            <td class="data-cell">{{ log.fat || 'N/A' }}</td>
                            <td class="text-cell">{{ log.mealDeviations || 'N/A' }}</td>
                            <td class="text-cell">{{ log.activities || 'N/A' }}</td>
                            <td class="text-cell">{{ log.notes || 'N/A' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Pagination -->
        <div class="pagination-section">
            <div class="pagination-info">
                Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalLogs }} entries
            </div>
            <div class="pagination-controls">
                <button 
                    class="btn btn-pagination" 
                    :disabled="currentPage === 1"
                    @click="goToPage(currentPage - 1)"
                >
                    Previous
                </button>
                <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
                <button 
                    class="btn btn-pagination" 
                    :disabled="currentPage === totalPages"
                    @click="goToPage(currentPage + 1)"
                >
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AssignedMeals',
    data() {
        return {
            searchQuery: '',
            dateFrom: '',
            dateTo: '',
            statusFilter: '',
            currentPage: 1,
            itemsPerPage: 10,
            
            // Sample data based on the images
            logs: [
                {
                    user: 'Lundy, Nathan',
                    date: '2025-09-15',
                    bodyFat: 'N/A',
                    waterIntake: 128,
                    hunger: 0,
                    strength: 0,
                    energy: 0,
                    feel: 'N/A',
                    cardio: 'N/A',
                    plan: 'N/A',
                    calories: 'N/A',
                    protein: 'N/A',
                    carbs: 'N/A',
                    fat: 'N/A',
                    mealDeviations: 'N/A',
                    activities: 'N/A',
                    notes: 'N/A'
                },
                {
                    user: 'Muise, Loretta',
                    date: '2025-09-14',
                    bodyFat: 'N/A',
                    waterIntake: 109,
                    hunger: 0,
                    strength: 0,
                    energy: 0,
                    feel: 'N/A',
                    cardio: 'N/A',
                    plan: 'N/A',
                    calories: 'N/A',
                    protein: 'N/A',
                    carbs: 'N/A',
                    fat: 'N/A',
                    mealDeviations: 'Started new macros today. Q...',
                    activities: '1.5-2 mile walk before brea... Great.',
                    notes: 'N/A'
                },
                {
                    user: 'Burton, Sharonda',
                    date: '2025-09-14',
                    bodyFat: 30,
                    waterIntake: 128,
                    hunger: 6,
                    strength: 7,
                    energy: 9,
                    feel: 'N/A',
                    cardio: 'N/A',
                    plan: 'N/A',
                    calories: 'N/A',
                    protein: 'N/A',
                    carbs: 'N/A',
                    fat: 'N/A',
                    mealDeviations: 'I sometimes drink alcohol...',
                    activities: 'I lift weights at least 4 d... I feel p',
                    notes: 'N/A'
                },
                {
                    user: 'Mcveigh, Jerry',
                    date: '2025-09-13',
                    bodyFat: 'N/A',
                    waterIntake: '',
                    hunger: 3,
                    strength: 9,
                    energy: 9,
                    feel: 'N/A',
                    cardio: 'N/A',
                    plan: 'N/A',
                    calories: 'N/A',
                    protein: 'N/A',
                    carbs: 'N/A',
                    fat: 'N/A',
                    mealDeviations: 'N/A',
                    activities: 'Long w',
                    notes: 'N/A'
                },
                {
                    user: 'Mcvicker, Donnie',
                    date: '2025-09-13',
                    bodyFat: 'N/A',
                    waterIntake: '',
                    hunger: 5,
                    strength: 8,
                    energy: 6,
                    feel: 'N/A',
                    cardio: 'N/A',
                    plan: 'N/A',
                    calories: 'N/A',
                    protein: 'N/A',
                    carbs: 'N/A',
                    fat: 'N/A',
                    mealDeviations: 'Food was inline most of the...',
                    activities: 'Weights Tuesday thru Saturd...',
                    notes: 'N/A'
                },
                {
                    user: 'Scott, Theodore',
                    date: '2025-09-12',
                    bodyFat: 12.6,
                    waterIntake: 165,
                    hunger: 0,
                    strength: 9,
                    energy: 9,
                    feel: 'N/A',
                    cardio: 'N/A',
                    plan: 'N/A',
                    calories: 'N/A',
                    protein: 'N/A',
                    carbs: 'N/A',
                    fat: 'N/A',
                    mealDeviations: 'None',
                    activities: 'Lifted 4 days Blood du',
                    notes: 'N/A'
                },
                {
                    user: 'CHEN, CHERYL',
                    date: '2025-09-12',
                    bodyFat: 'N/A',
                    waterIntake: '',
                    hunger: 7,
                    strength: 9,
                    energy: 10,
                    feel: 'N/A',
                    cardio: 'N/A',
                    plan: 'N/A',
                    calories: 'N/A',
                    protein: 'N/A',
                    carbs: 'N/A',
                    fat: 'N/A',
                    mealDeviations: 'N/A',
                    activities: 'Fasting MISS in the morning... This wa',
                    notes: 'N/A'
                },
                {
                    user: 'Davis, Jerome',
                    date: '2025-09-12',
                    bodyFat: 'N/A',
                    waterIntake: 128,
                    hunger: 6,
                    strength: 9,
                    energy: 9,
                    feel: 'N/A',
                    cardio: 'N/A',
                    plan: 'N/A',
                    calories: 'N/A',
                    protein: 'N/A',
                    carbs: 'N/A',
                    fat: 'N/A',
                    mealDeviations: 'None',
                    activities: 'Workouts and cardio',
                    notes: 'N/A'
                },
                {
                    user: 'Poe, Gena',
                    date: '2025-09-10',
                    bodyFat: 'N/A',
                    waterIntake: '',
                    hunger: 4,
                    strength: 7,
                    energy: 7,
                    feel: 'N/A',
                    cardio: 'N/A',
                    plan: 'N/A',
                    calories: 'N/A',
                    protein: 'N/A',
                    carbs: 'N/A',
                    fat: 'N/A',
                    mealDeviations: 'N/A',
                    activities: 'N/A',
                    notes: 'N/A'
                },
                {
                    user: 'Yarbrough, Quintes',
                    date: '2025-09-08',
                    bodyFat: 'N/A',
                    waterIntake: '',
                    hunger: 0,
                    strength: 0,
                    energy: 0,
                    feel: 'N/A',
                    cardio: 'N/A',
                    plan: 'N/A',
                    calories: 'N/A',
                    protein: 'N/A',
                    carbs: 'N/A',
                    fat: 'N/A',
                    mealDeviations: 'N/A',
                    activities: 'N/A',
                    notes: 'N/A'
                },
                // Additional sample data with different metrics
                {
                    user: 'Smith, John',
                    date: '2025-09-11',
                    bodyFat: 'N/A',
                    waterIntake: 150,
                    hunger: 0,
                    strength: 0,
                    energy: 0,
                    feel: 'Great. Some silly things th...',
                    cardio: 'N/A',
                    plan: 'N/A',
                    calories: 'N/A',
                    protein: 'N/A',
                    carbs: 'N/A',
                    fat: 'N/A',
                    mealDeviations: 'N/A',
                    activities: 'N/A',
                    notes: 'N/A'
                },
                {
                    user: 'Johnson, Sarah',
                    date: '2025-09-11',
                    bodyFat: 'N/A',
                    waterIntake: 120,
                    hunger: 0,
                    strength: 0,
                    energy: 0,
                    feel: 'I feel pretty good most days',
                    cardio: 'I get 10k steps a day at le...',
                    plan: 'N/A',
                    calories: 'N/A',
                    protein: 'N/A',
                    carbs: 'N/A',
                    fat: 'N/A',
                    mealDeviations: 'N/A',
                    activities: 'N/A',
                    notes: 'N/A'
                },
                {
                    user: 'Wilson, Mike',
                    date: '2025-09-10',
                    bodyFat: 'N/A',
                    waterIntake: 200,
                    hunger: 0,
                    strength: 0,
                    energy: 0,
                    feel: 'N/A',
                    cardio: '30min fasted daily',
                    plan: 'N/A',
                    calories: 'N/A',
                    protein: 'N/A',
                    carbs: 'N/A',
                    fat: 'N/A',
                    mealDeviations: 'N/A',
                    activities: 'N/A',
                    notes: 'N/A'
                },
                {
                    user: 'Brown, Lisa',
                    date: '2025-09-09',
                    bodyFat: 'N/A',
                    waterIntake: 180,
                    hunger: 0,
                    strength: 0,
                    energy: 0,
                    feel: 'N/A',
                    cardio: 'Cardio only on Sunday and M...',
                    plan: 'TD',
                    calories: 2295,
                    protein: 200,
                    carbs: 250,
                    fat: 55,
                    mealDeviations: 'N/A',
                    activities: 'N/A',
                    notes: 'N/A'
                },
                {
                    user: 'Garcia, Carlos',
                    date: '2025-09-08',
                    bodyFat: 'N/A',
                    waterIntake: 160,
                    hunger: 0,
                    strength: 0,
                    energy: 0,
                    feel: 'Good',
                    cardio: 'Cardio 5x\'s so far this week',
                    plan: 'TRAINING DAY',
                    calories: 2803,
                    protein: 250,
                    carbs: 300,
                    fat: 67,
                    mealDeviations: 'N/A',
                    activities: 'N/A',
                    notes: 'N/A'
                }
            ]
        }
    },
    computed: {
        filteredLogs() {
            let filtered = this.logs;

            // Search filter
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(log => 
                    log.user.toLowerCase().includes(query) ||
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

            return filtered;
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
        }
    },
    methods: {
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        exportData() {
            // Implement export functionality
            console.log('Exporting data...');
        },
        refreshData() {
            // Implement refresh functionality
            console.log('Refreshing data...');
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/sass/_variables.scss";

.assigned-meals-container {
    padding: 20px;
    background: $color-background;
    min-height: 100vh;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    
    .header-content {
        .page-title {
            color: $color-text-dark;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        
        .page-subtitle {
            color: $color-muted;
            font-size: 1rem;
            margin: 0;
        }
    }
    
    .header-actions {
        display: flex;
        gap: 1rem;
        
        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            
            &.btn-primary {
                background: $primary;
                color: white;
                
                &:hover {
                    background: $color-button-hover;
                }
            }
            
            &.btn-secondary {
                background: $color-muted;
                color: white;
                
                &:hover {
                    background: darken($color-muted, 10%);
                }
            }
        }
    }
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
    
    .filter-input {
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        
        &:focus {
            outline: none;
            border-color: $primary;
            box-shadow: 0 0 0 2px rgba($primary, 0.2);
        }
        
        &.search-input {
            flex: 2;
            min-width: 200px;
        }
        
        &.date-input {
            flex: 1;
            min-width: 140px;
        }
        
        &.select-input {
            flex: 1;
            min-width: 120px;
        }
    }
}

.table-container {
    background: white;
    border-radius: $border-radius-sm;
    box-shadow: $box-shadow-sm;
    border: none;
    overflow: hidden;
    position: relative;
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
    
    // Show scroll indicators
    &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 100%;
        background: linear-gradient(to left, rgba(255, 255, 255, 0.8), transparent);
        pointer-events: none;
        z-index: 1;
    }
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 1400px; // Increased to ensure horizontal scrolling
    margin-bottom: 0;
    border: none;
    table-layout: auto; // Changed to auto for better column sizing
    
    thead {
        background-color: $color-background-hover;
        position: sticky;
        top: 0;
        z-index: 10;
        
        tr {
            th {
                background-color: $color-background-hover;
                border: none;
            }
        }
        
        th {
            background-color: $color-background-hover;
            color: $color-text-dark;
            font-family: $font-family-base;
            font-size: 0.9rem;
            font-weight: 700;
            padding: 15px 12px;
            border: none;
            text-align: left;
            border-radius: 5px;
            white-space: nowrap;
        }
    }
    
    tbody {
        .data-row {
            border: none;
            transition: background-color 0.2s ease;
            cursor: pointer;
            
            &:nth-child(even) {
                background-color: #f8f9fa;
            }

            &:hover {
                background-color: $color-background-hover;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            
            td {
                padding: 12px 8px;
                vertical-align: middle;
                color: $color-text-dark;
                font-family: $font-family-base;
                font-size: $font-size-sm;
                font-weight: $font-weight-normal;
                border: none;
                text-align: left;
            }
        }
    }
}

.sticky-column {
    position: sticky;
    left: 0;
    background: white;
    z-index: 5;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
    
    &.user-cell {
        background: white;
        min-width: 150px;
        padding: 12px 8px;
        
        .user-info {
            .user-name {
                color: $color-text-dark;
                font-weight: $font-weight-normal;
                font-size: $font-size-sm;
            }
        }
    }
}

.date-cell {
    color: $color-text-dark;
    font-weight: $font-weight-normal;
    min-width: 100px;
    padding: 12px 8px;
}

.data-cell {
    text-align: center;
    min-width: 80px;
    color: $color-text-dark;
    padding: 12px 8px;
}

.text-cell {
    min-width: 150px;
    max-width: 200px;
    color: $color-text-dark;
    word-wrap: break-word;
    white-space: normal;
    padding: 12px 8px;
}

.pagination-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    .pagination-info {
        color: $color-muted;
        font-size: 0.9rem;
    }
    
    .pagination-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
        
        .btn-pagination {
            padding: 0.5rem 1rem;
            border: 1px solid #ddd;
            background: white;
            color: $color-text-dark;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s ease;
            
            &:hover:not(:disabled) {
                background: $primary;
                color: white;
                border-color: $primary;
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

// Responsive design
@media (max-width: 768px) {
    .page-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
    }
    
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
</style>