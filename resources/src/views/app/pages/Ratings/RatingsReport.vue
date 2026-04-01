<template>
  <div class="ratings-report-container">
    <!-- Breadcrumb and Navigation Row -->
    <div class="breadcrumb-nav-row">
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
                <i class="fas fa-star"></i>
                Ratings Report
              </li>
            </ol>
          </div>
        </nav>
      </div>

      <!-- Refresh Button -->
      <div class="refresh-section">
        <button 
          @click="loadRatingsData" 
          class="btn btn-primary refresh-btn"
          :disabled="loading"
        >
          <i class="fas fa-sync-alt me-2" :class="{ 'fa-spin': loading }"></i>
          {{ loading ? 'Loading...' : 'Refresh' }}
        </button>
      </div>
    </div>

    <!-- Header -->
    <div class="report-header">
      <div class="header-content">
        <div class="header-icon">
          <i class="fas fa-star"></i>
        </div>
        <div class="header-text">
          <h2 class="report-title">Coach Ratings Report</h2>
          <p class="report-subtitle">
            View average ratings and performance metrics for all coaches
          </p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-section">
      <div class="filter-group">
        <label>Period:</label>
        <select v-model="selectedPeriod" @change="loadRatingsData" class="period-select">
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>
      <div class="filter-group">
        <label>Sort By:</label>
        <select v-model="sortBy" @change="sortRatings" class="sort-select">
          <option value="rating">Rating (High to Low)</option>
          <option value="rating-low">Rating (Low to High)</option>
          <option value="name">Coach Name</option>
          <option value="sessions">Total Sessions</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && !coachRatings.length" class="loading-container">
      <div class="spinner spinner-primary"></div>
      <p>Loading ratings data...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="error-container">
      <i class="fas fa-exclamation-triangle"></i>
      <p>{{ error }}</p>
      <button @click="loadRatingsData" class="btn btn-primary">Retry</button>
    </div>

    <!-- Ratings Content -->
    <div v-if="!loading || coachRatings.length" class="ratings-content">
      <!-- Summary Cards -->
      <div class="row mb-4">
        <div class="col-lg-3 col-md-6 col-12 mb-3">
          <div class="summary-card average-rating">
            <div class="card-icon">
              <i class="fas fa-star"></i>
            </div>
            <div class="card-content">
              <h3 class="card-value">
                {{ overallAverage > 0 ? overallAverage.toFixed(1) : 'N/A' }}
              </h3>
              <p class="card-label">
                Overall Average Rating
              </p>
              <p class="card-subtext" v-if="totalRatedSessions > 0">
                Based on {{ totalRatedSessions }} ratings
              </p>
              <p class="card-subtext" v-else>
                Based on 0 ratings
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-12 mb-3">
          <div class="summary-card total-coaches">
            <div class="card-icon">
              <i class="fas fa-users"></i>
            </div>
            <div class="card-content">
              <h3 class="card-value">{{ coachRatings.length }}</h3>
              <p class="card-label">Total Coaches</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-12 mb-3">
          <div class="summary-card total-sessions">
            <div class="card-icon">
              <i class="fas fa-calendar-check"></i>
            </div>
            <div class="card-content">
              <h3 class="card-value">{{ totalSessions }}</h3>
              <p class="card-label">Total Rated Sessions</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-12 mb-3">
          <div class="summary-card top-rated">
            <div class="card-icon">
              <i class="fas fa-trophy"></i>
            </div>
            <div class="card-content">
              <h3 class="card-value">{{ topRatedCoach ? topRatedCoach.rating.toFixed(1) : 'N/A' }}</h3>
              <p class="card-label">Top Rated Coach</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Coach Ratings Table -->
      <div class="ratings-table-card">
        <div class="table-header">
          <h5 class="table-title">
            <i class="fas fa-list"></i>
            Coach Ratings Breakdown
          </h5>
        </div>
        <div class="table-responsive">
          <table class="table ratings-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Coach Name</th>
                <th>Average Rating</th>
                <th>Total Sessions</th>
                <th>Rated Sessions</th>
                <th>Rating Distribution</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(coach, index) in sortedRatings" :key="coach.id" class="coach-row">
                <td class="rank-cell">
                  <span class="rank-badge" :class="getRankClass(index)">
                    {{ index + 1 }}
                  </span>
                </td>
                <td class="coach-name-cell">
                  <div class="coach-info">
                    <i class="fas fa-user-circle"></i>
                    <span>{{ coach.name }}</span>
                  </div>
                </td>
                <td class="rating-cell">
                  <div class="rating-display">
                    <div class="stars">
                      <i 
                        v-for="n in 5" 
                        :key="n" 
                        class="fas fa-star"
                        :class="{ 'filled': n <= Math.round(coach.rating), 'empty': n > Math.round(coach.rating) }"
                      ></i>
                    </div>
                    <span class="rating-value" v-if="coach.ratedSessions > 0">
                      {{ coach.rating.toFixed(1) }} (based on {{ coach.ratedSessions }} ratings)
                    </span>
                    <span class="rating-value" v-else>
                      N/A (0 ratings)
                    </span>
                  </div>
                </td>
                <td class="sessions-cell">
                  <span class="badge badge-info">{{ coach.totalSessions }}</span>
                </td>
                <td class="rated-sessions-cell">
                  <span class="badge badge-success">{{ coach.ratedSessions }}</span>
                </td>
                <td class="distribution-cell">
                  <div class="rating-distribution">
                    <div class="dist-bar">
                      <div 
                        class="dist-fill" 
                        :style="{ width: (coach.ratedSessions / coach.totalSessions * 100) + '%' }"
                      ></div>
                    </div>
                    <span class="dist-text">{{ ((coach.ratedSessions / coach.totalSessions) * 100).toFixed(0) }}%</span>
                  </div>
                </td>
                <td class="status-cell">
                  <span 
                    class="status-badge" 
                    :class="getStatusClass(coach.rating)"
                  >
                    {{ getStatusText(coach.rating) }}
                  </span>
                </td>
              </tr>
              <tr v-if="coachRatings.length === 0" class="no-data-row">
                <td colspan="7" class="text-center">
                  <i class="fas fa-info-circle"></i>
                  <p>No ratings data available for the selected period.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RatingsReport',
  data() {
    return {
      loading: false,
      error: null,
      coachRatings: [],
      selectedPeriod: 'all',
      sortBy: 'rating',
      staff: [],
    };
  },
  computed: {
    overallAverage() {
      if (this.coachRatings.length === 0) return 0;
      const sum = this.coachRatings.reduce((acc, coach) => acc + (coach.rating * coach.ratedSessions), 0);
      const totalRated = this.coachRatings.reduce((acc, coach) => acc + coach.ratedSessions, 0);
      return totalRated > 0 ? sum / totalRated : 0;
    },
    totalSessions() {
      return this.coachRatings.reduce((acc, coach) => acc + coach.ratedSessions, 0);
    },
    // Total number of individual ratings across all coaches
    totalRatedSessions() {
      return this.coachRatings.reduce((acc, coach) => acc + coach.ratedSessions, 0);
    },
    topRatedCoach() {
      if (this.coachRatings.length === 0) return null;
      return this.coachRatings.reduce((top, coach) => 
        coach.rating > top.rating ? coach : top
      );
    },
    sortedRatings() {
      const sorted = [...this.coachRatings];
      switch (this.sortBy) {
        case 'rating':
          return sorted.sort((a, b) => b.rating - a.rating);
        case 'rating-low':
          return sorted.sort((a, b) => a.rating - b.rating);
        case 'name':
          return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'sessions':
          return sorted.sort((a, b) => b.totalSessions - a.totalSessions);
        default:
          return sorted;
      }
    },
  },
  methods: {
    async loadStaff() {
      try {
        const response = await axios.get('/appointments/staff');
        if (response.data.success) {
          this.staff = response.data.data || [];
        }
      } catch (error) {
        console.warn('Error loading staff:', error);
      }
    },
    async loadRatingsData() {
      this.loading = true;
      this.error = null;
      
      try {
        // Fetch all appointments with ratings
        const response = await axios.get('/appointments');
        
        if (!response.data.success) {
          throw new Error('Failed to fetch appointments');
        }

        const appointments = response.data.data || [];
        
        // Calculate date range based on selected period
        const now = new Date();
        let startDate = null;
        
        switch (this.selectedPeriod) {
          case 'today':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
          case 'week':
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 7);
            break;
          case 'month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
          case 'quarter':
            const quarter = Math.floor(now.getMonth() / 3);
            startDate = new Date(now.getFullYear(), quarter * 3, 1);
            break;
          case 'year':
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
          default:
            startDate = null; // All time
        }

        // Filter appointments by period
        let filteredAppointments = appointments;
        if (startDate) {
          filteredAppointments = appointments.filter(apt => {
            const aptDate = new Date(apt.date || apt.start);
            return aptDate >= startDate;
          });
        }

        // Group by coach and calculate ratings
        const coachMap = new Map();
        
        filteredAppointments.forEach(apt => {
          const coachId = apt.staff_id || apt.coach_id;
          if (!coachId) return;

          if (!coachMap.has(coachId)) {
            coachMap.set(coachId, {
              id: coachId,
              name: this.getCoachName(apt),
              ratings: [],
              totalSessions: 0,
              ratedSessions: 0,
            });
          }

          const coach = coachMap.get(coachId);
          coach.totalSessions++;

          if (apt.rating && apt.rating > 0) {
            coach.ratings.push(parseFloat(apt.rating));
            coach.ratedSessions++;
          }
        });

        // Calculate average ratings
        this.coachRatings = Array.from(coachMap.values()).map(coach => {
          const avgRating = coach.ratings.length > 0
            ? coach.ratings.reduce((sum, r) => sum + r, 0) / coach.ratings.length
            : 0;

          return {
            id: coach.id,
            name: coach.name,
            rating: avgRating,
            totalSessions: coach.totalSessions,
            ratedSessions: coach.ratedSessions,
          };
        });

        // Sort by rating by default
        this.sortRatings();
      } catch (err) {
        console.error('Error loading ratings:', err);
        this.error = err.response?.data?.message || 'Failed to load ratings data';
      } finally {
        this.loading = false;
      }
    },
    getCoachName(appointment) {
      // Try to get coach name from appointment data
      if (appointment.appointment_data?.coach) {
        const coach = appointment.appointment_data.coach;
        const name = `${coach.first_name || ''} ${coach.last_name || ''}`.trim();
        return name || 'Unknown Coach';
      }
      // Fallback: try to get from staff list if available
      if (this.staff && this.staff.length > 0) {
        const staffId = appointment.staff_id || appointment.coach_id;
        const staffMember = this.staff.find(s => s.id == staffId);
        if (staffMember) {
          return staffMember.name;
        }
      }
      return 'Unknown Coach';
    },
    sortRatings() {
      // Sorting is handled by computed property
      this.$forceUpdate();
    },
    getRankClass(index) {
      if (index === 0) return 'rank-gold';
      if (index === 1) return 'rank-silver';
      if (index === 2) return 'rank-bronze';
      return 'rank-default';
    },
    getStatusClass(rating) {
      if (rating >= 4.5) return 'status-excellent';
      if (rating >= 4.0) return 'status-good';
      if (rating >= 3.0) return 'status-fair';
      return 'status-poor';
    },
    getStatusText(rating) {
      if (rating >= 4.5) return 'Excellent';
      if (rating >= 4.0) return 'Good';
      if (rating >= 3.0) return 'Fair';
      if (rating > 0) return 'Needs Improvement';
      return 'No Ratings';
    },
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push({ name: 'dashboard' });
      }
    },
  },
  async mounted() {
    await this.loadStaff();
    await this.loadRatingsData();
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/sass/_variables.scss";

.ratings-report-container {
  padding: 1.5rem;
}

.breadcrumb-nav-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  gap: 1rem;
}

.breadcrumb-section {
  flex: 1;
  
  .breadcrumb-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .back-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      color: $color-text-dark;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        color: $primary;
      }
    }
  }
}

.refresh-section {
  .refresh-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
  }
}

.report-header {
  margin-bottom: 2rem;
  
  .header-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .header-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      background: linear-gradient(135deg, #FBBF24, #F59E0B);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
    }
    
    .header-text {
      .report-title {
        margin: 0;
        font-size: 1.75rem;
        font-weight: 700;
        color: $color-heading;
      }
      
      .report-subtitle {
        margin: 0.25rem 0 0 0;
        color: $color-muted;
        font-size: 0.9rem;
      }
    }
  }
}

.filters-section {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: $color-card-bg;
  border-radius: 8px;
  border: 1px solid $color-border-muted;
  
  .filter-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    label {
      font-weight: 600;
      color: $color-text-dark;
      margin: 0;
    }
    
    select {
      padding: 0.5rem 1rem;
      border: 1px solid $input-border-color;
      border-radius: 6px;
      background: $input-focus-bg;
      color: $color-text-dark;
      cursor: pointer;
    }
  }
}

.loading-container,
.error-container {
  text-align: center;
  padding: 3rem;
  
  .spinner {
    margin: 0 auto 1rem;
  }
  
  p {
    color: $color-muted;
    margin-bottom: 1rem;
  }
}

.summary-card {
  background: $color-card-bg;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid $color-border-muted;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .card-icon {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
  }
  
  &.average-rating .card-icon {
    background: linear-gradient(135deg, #FBBF24, #F59E0B);
  }
  
  &.total-coaches .card-icon {
    background: linear-gradient(135deg, #3B82F6, #2563EB);
  }
  
  &.total-sessions .card-icon {
    background: linear-gradient(135deg, #10B981, #059669);
  }
  
  &.top-rated .card-icon {
    background: linear-gradient(135deg, #8B5CF6, #7C3AED);
  }
  
  .card-content {
    flex: 1;
    
    .card-value {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
      color: $color-heading;
    }
    
    .card-label {
      margin: 0.25rem 0 0 0;
      font-size: 0.875rem;
      color: $color-muted;
    }

    .card-subtext {
      margin: 0.15rem 0 0 0;
      font-size: 0.8rem;
      color: $color-muted;
    }
  }
}

.ratings-table-card {
  background: $color-card-bg;
  border-radius: 12px;
  border: 1px solid $color-border-muted;
  overflow: hidden;
  
  .table-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid $color-border-muted;
    background: $color-background-hover;
    
    .table-title {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: $color-heading;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
  
  .table-responsive {
    overflow-x: auto;
  }
  
  .ratings-table {
    margin: 0;
    
    thead {
      background: $color-background-hover;
      
      th {
        padding: 1rem;
        font-weight: 600;
        color: $color-heading;
        border-bottom: 2px solid $color-border-muted;
        white-space: nowrap;
      }
    }
    
    tbody {
      tr {
        transition: background-color 0.2s ease;
        
        &:hover {
          background: $color-background-hover;
        }
        
        &.no-data-row {
          td {
            padding: 3rem;
            text-align: center;
            color: $color-muted;
          }
        }
      }
      
      td {
        padding: 1rem;
        vertical-align: middle;
        border-bottom: 1px solid $color-border-muted;
      }
    }
  }
  
  .rank-cell {
    text-align: center;
    
    .rank-badge {
      display: inline-block;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      line-height: 32px;
      font-weight: 700;
      font-size: 0.875rem;
      
      &.rank-gold {
        background: linear-gradient(135deg, #FBBF24, #F59E0B);
        color: white;
      }
      
      &.rank-silver {
        background: linear-gradient(135deg, #9CA3AF, #6B7280);
        color: white;
      }
      
      &.rank-bronze {
        background: linear-gradient(135deg, #D97706, #B45309);
        color: white;
      }
      
      &.rank-default {
        background: $color-background-hover;
        color: $color-text-dark;
      }
    }
  }
  
  .coach-name-cell {
    .coach-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      
      i {
        font-size: 1.5rem;
        color: $primary;
      }
      
      span {
        font-weight: 600;
        color: $color-text-dark;
      }
    }
  }
  
  .rating-cell {
    .rating-display {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      
      .stars {
        display: flex;
        gap: 0.25rem;
        
        .fa-star {
          font-size: 0.875rem;
          
          &.filled {
            color: #FBBF24;
          }
          
          &.empty {
            color: #E5E7EB;
          }
        }
      }
      
      .rating-value {
        font-weight: 700;
        font-size: 1.1rem;
        color: $color-heading;
      }
    }
  }
  
  .sessions-cell,
  .rated-sessions-cell {
    text-align: center;
    
    .badge {
      padding: 0.375rem 0.75rem;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.875rem;
      
      &.badge-info {
        background: #DBEAFE;
        color: #1E40AF;
      }
      
      &.badge-success {
        background: #D1FAE5;
        color: #065F46;
      }
    }
  }
  
  .distribution-cell {
    .rating-distribution {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      
      .dist-bar {
        flex: 1;
        height: 8px;
        background: $color-background-hover;
        border-radius: 4px;
        overflow: hidden;
        
        .dist-fill {
          height: 100%;
          background: linear-gradient(90deg, #10B981, #059669);
          transition: width 0.3s ease;
        }
      }
      
      .dist-text {
        font-size: 0.875rem;
        font-weight: 600;
        color: $color-muted;
        min-width: 40px;
        text-align: right;
      }
    }
  }
  
  .status-cell {
    .status-badge {
      padding: 0.375rem 0.75rem;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.875rem;
      
      &.status-excellent {
        background: #D1FAE5;
        color: #065F46;
      }
      
      &.status-good {
        background: #DBEAFE;
        color: #1E40AF;
      }
      
      &.status-fair {
        background: #FEF3C7;
        color: #92400E;
      }
      
      &.status-poor {
        background: #FEE2E2;
        color: #991B1B;
      }
    }
  }
}

@media (max-width: 768px) {
  .filters-section {
    flex-direction: column;
    gap: 1rem;
  }
  
  .ratings-table {
    font-size: 0.875rem;
    
    th, td {
      padding: 0.75rem 0.5rem;
    }
  }
}
</style>

