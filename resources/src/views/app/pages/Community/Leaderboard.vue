<template>
  <div class="leaderboard-page">
    <!-- Header Section -->
    <div class="leaderboard-header">
      <div class="header-content">
        <h1 class="page-title">Fitness Points Top 100</h1>
        
        <!-- Time Period Navigation -->
        <div class="time-period-tabs">
          <button 
            v-for="period in timePeriods" 
            :key="period.id"
            :class="['time-tab', { active: activePeriod === period.id }]"
            @click="setActivePeriod(period.id)"
          >
            {{ period.label }}
          </button>
        </div>
      </div>
      
      <!-- Filter Option -->
      <div class="filter-section">
        <label class="filter-checkbox">
          <input 
            type="checkbox" 
            v-model="showOutsideClub"
            @change="filterLeaderboard"
          />
          <span class="checkmark"></span>
          Also show users outside my club
        </label>
      </div>
    </div>

    <!-- Leaderboard Table -->
    <div class="leaderboard-table-container">
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Fitness Points</th>
            <th>Kcal</th>
            <th>Minutes</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredLeaderboard" :key="user.id" class="leaderboard-row">
            <td class="rank-cell">{{ user.rank }}</td>
            <td class="username-cell">
              <div class="user-info">
                <div class="user-avatar">
                  <img v-if="user.avatar" :src="user.avatar" :alt="user.username" />
                  <i v-else class="fas fa-user"></i>
                </div>
                <a href="#" class="username-link" @click.prevent="viewProfile(user.id)">
                  {{ user.username }}
                </a>
              </div>
            </td>
            <td class="points-cell">{{ user.fitnessPoints.toLocaleString() }}</td>
            <td class="kcal-cell">{{ user.kcal.toLocaleString() }}</td>
            <td class="minutes-cell">{{ user.minutes.toLocaleString() }}</td>
            <td class="country-cell">
              <span class="country-flag">🇺🇸</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Leaderboard",
  data() {
    return {
      activePeriod: 'this-month', // Set "This month" as default active
      showOutsideClub: false,
      timePeriods: [
        { id: 'overall', label: 'Overall' },
        { id: 'this-month', label: 'This month' },
        { id: 'august', label: 'August' },
        { id: 'july', label: 'July' },
        { id: 'june', label: 'June' },
        { id: 'may', label: 'May' }
      ],
      leaderboard: [
        {
          id: 1,
          rank: 1,
          username: 'Paul Steffen',
          avatar: null,
          fitnessPoints: 42420,
          kcal: 27796,
          minutes: 6665,
          country: 'US',
          isInClub: true
        },
        {
          id: 2,
          rank: 2,
          username: 'Cheryl Chen',
          avatar: null,
          fitnessPoints: 41467,
          kcal: 22511,
          minutes: 3421,
          country: 'US',
          isInClub: true
        },
        {
          id: 3,
          rank: 3,
          username: 'Monica Morgan',
          avatar: null,
          fitnessPoints: 38923,
          kcal: 17255,
          minutes: 2413,
          country: 'US',
          isInClub: true
        },
        {
          id: 4,
          rank: 4,
          username: 'Sarah Johnson',
          avatar: null,
          fitnessPoints: 35678,
          kcal: 19876,
          minutes: 2890,
          country: 'US',
          isInClub: true
        },
        {
          id: 5,
          rank: 5,
          username: 'Mike Wilson',
          avatar: null,
          fitnessPoints: 32145,
          kcal: 16543,
          minutes: 2156,
          country: 'US',
          isInClub: true
        },
        {
          id: 6,
          rank: 6,
          username: 'Lisa Davis',
          avatar: null,
          fitnessPoints: 29876,
          kcal: 14234,
          minutes: 1987,
          country: 'US',
          isInClub: true
        },
        {
          id: 7,
          rank: 7,
          username: 'John Smith',
          avatar: null,
          fitnessPoints: 27654,
          kcal: 12345,
          minutes: 1765,
          country: 'US',
          isInClub: true
        },
        {
          id: 8,
          rank: 8,
          username: 'Emily Brown',
          avatar: null,
          fitnessPoints: 25432,
          kcal: 11234,
          minutes: 1543,
          country: 'US',
          isInClub: true
        },
        {
          id: 9,
          rank: 9,
          username: 'David Lee',
          avatar: null,
          fitnessPoints: 23210,
          kcal: 10123,
          minutes: 1321,
          country: 'US',
          isInClub: true
        },
        {
          id: 10,
          rank: 10,
          username: 'Amy Taylor',
          avatar: null,
          fitnessPoints: 20988,
          kcal: 9012,
          minutes: 1099,
          country: 'US',
          isInClub: true
        },
        {
          id: 11,
          rank: 11,
          username: 'Chris Anderson',
          avatar: null,
          fitnessPoints: 18766,
          kcal: 7901,
          minutes: 877,
          country: 'US',
          isInClub: true
        }
      ]
    };
  },
  computed: {
    filteredLeaderboard() {
      if (this.showOutsideClub) {
        return this.leaderboard;
      }
      return this.leaderboard.filter(user => user.isInClub);
    }
  },
  methods: {
    setActivePeriod(periodId) {
      this.activePeriod = periodId;
      // Here you would typically fetch data for the selected period
      console.log('Selected period:', periodId);
    },
    
    filterLeaderboard() {
      // Filter logic is handled by computed property
      console.log('Show outside club:', this.showOutsideClub);
    },
    
    viewProfile(userId) {
      // Navigate to user profile
      console.log('View profile for user:', userId);
    }
  }
};
</script>

<style scoped>
.leaderboard-page {
  min-height: 100vh;
  background: #f5f5f3;
  padding: 20px;
}

/* Header Section */
.leaderboard-header {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 32px;
  font-weight: bold;
  color: #252525;
  margin: 0;
}

/* Time Period Tabs */
.time-period-tabs {
  display: flex;
  gap: 8px;
}

.time-tab {
  background: transparent;
  border: 1px solid #dcdcdc;
  color: #686868;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.time-tab:hover {
  background: #f8f9fa;
  color: #252525;
}

.time-tab.active {
  background: #252525;
  color: white;
  border-color: #252525;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Filter Section */
.filter-section {
  display: flex;
  align-items: center;
}

.filter-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #686868;
  gap: 8px;
}

.filter-checkbox input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #dcdcdc;
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
}

.filter-checkbox input[type="checkbox"]:checked + .checkmark {
  background: #ff4040;
  border-color: #ff4040;
}

.filter-checkbox input[type="checkbox"]:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

/* Table Container */
.leaderboard-table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Table Styles */
.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
}

.leaderboard-table thead {
  background: #f8f9fa;
}

.leaderboard-table th {
  padding: 16px 20px;
  text-align: left;
  font-weight: 600;
  color: #252525;
  font-size: 14px;
  border-bottom: 1px solid #e9ecef;
}

.leaderboard-table td {
  padding: 16px 20px;
  border-bottom: 1px solid #f8f9fa;
  font-size: 14px;
}

.leaderboard-row:hover {
  background: #f8f9fa;
}

/* Table Cell Styles */
.rank-cell {
  font-weight: 600;
  color: #252525;
  width: 80px;
}

.username-cell {
  width: 200px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 14px;
  flex-shrink: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.username-link {
  color: #ff4040;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.username-link:hover {
  color: #e52e2e;
  text-decoration: underline;
}

.points-cell {
  font-weight: 600;
  color: #252525;
  text-align: right;
  width: 120px;
}

.kcal-cell {
  text-align: right;
  color: #686868;
  width: 100px;
}

.minutes-cell {
  text-align: right;
  color: #686868;
  width: 100px;
}

.country-cell {
  text-align: center;
  width: 80px;
}

.country-flag {
  font-size: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .leaderboard-page {
    padding: 10px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
  
  .time-period-tabs {
    flex-wrap: wrap;
  }
  
  .leaderboard-table-container {
    overflow-x: auto;
  }
  
  .leaderboard-table {
    min-width: 600px;
  }
  
  .page-title {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .leaderboard-header {
    padding: 20px;
  }
  
  .time-tab {
    padding: 6px 12px;
    font-size: 12px;
  }
  
  .leaderboard-table th,
  .leaderboard-table td {
    padding: 12px 15px;
  }
}
</style>
