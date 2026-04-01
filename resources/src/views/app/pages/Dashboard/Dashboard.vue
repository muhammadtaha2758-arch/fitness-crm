<template>
    <div class="dashboard-container">
        <div class="container-fluid">
            <!-- Header Section -->
            <div class="dashboard-header">
                <div class="header-content">
                    <div class="header-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="header-text">
                        <h2 class="dashboard-title">Dashboard</h2>
                        <p class="dashboard-subtitle">
                            Welcome back! Here's what's happening with your fitness business today.
                        </p>
                    </div>
                </div>
                <div class="header-actions">
                    <div class="last-updated" v-if="lastUpdated">
                        <i class="fas fa-clock"></i>
                        <span>Last updated: {{ formatLastUpdated() }}</span>
                    </div>
                    <button 
                        class="auto-refresh-btn" 
                        @click="toggleAutoRefresh" 
                        :class="{ 'active': autoRefreshEnabled }"
                        :title="autoRefreshEnabled ? 'Auto-refresh enabled' : 'Auto-refresh disabled'"
                    >
                        <i class="fas" :class="autoRefreshEnabled ? 'fa-toggle-on' : 'fa-toggle-off'"></i>
                    </button>
                    <button class="refresh-btn" @click="refreshDashboard" :disabled="loading">
                        <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading && !dashboardData" class="loading-container">
                <div class="spinner spinner-primary"></div>
                <p>Loading dashboard data...</p>
            </div>

            <!-- Dashboard Content -->
            <div v-else class="dashboard-content">
                <!-- KPI Cards Row -->
                <div class="row mb-4">
                    <div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-3" v-for="(kpi, index) in kpiCards" :key="index">
                        <div class="kpi-card" :class="kpi.colorClass">
                            <div class="kpi-icon">
                                <i :class="kpi.icon"></i>
                            </div>
                            <div class="kpi-content">
                                <h3 class="kpi-value">{{ formatValue(kpi.value, kpi.format) }}</h3>
                                <p class="kpi-label">{{ kpi.label }}</p>
                            </div>
                            <div class="kpi-trend" v-if="kpi.trend">
                                <i :class="kpi.trend.icon"></i>
                                <span>{{ kpi.trend.text }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Charts and Stats Row -->
                <div class="row mb-4">
                    <!-- Revenue Trend Chart -->
                    <div class="col-lg-8 mb-3">
                        <div class="chart-card">
                            <div class="chart-header">
                                <h5 class="chart-title">Revenue Trend</h5>
                                <div class="chart-controls">
                                    <select v-model="revenueMonths" @change="loadRevenueTrend" class="period-select">
                                        <option value="6">Last 6 Months</option>
                                        <option value="12">Last 12 Months</option>
                                        <option value="24">Last 24 Months</option>
                                    </select>
                                </div>
                            </div>
                            <div class="chart-wrapper" v-if="revenueChartData">
                                <v-chart
                                    :options="revenueChartOptions"
                                    :autoresize="true"
                                    style="height: 300px"
                                ></v-chart>
                            </div>
                        </div>
                    </div>

                    <!-- Member Growth Chart -->
                    <div class="col-lg-4 mb-3">
                        <div class="chart-card">
                            <div class="chart-header">
                                <h5 class="chart-title">Member Growth</h5>
                                <div class="chart-controls">
                                    <select v-model="growthMonths" @change="loadMemberGrowth" class="period-select">
                                        <option value="6">6 Months</option>
                                        <option value="12">12 Months</option>
                                    </select>
                                </div>
                            </div>
                            <div class="chart-wrapper" v-if="growthChartData">
                                <v-chart
                                    :options="growthChartOptions"
                                    :autoresize="true"
                                    style="height: 300px"
                                ></v-chart>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Secondary Stats and Activity Row -->
                <div class="row mb-4">
                    <!-- Appointments Status -->
                    <div class="col-lg-4 mb-3">
                        <div class="stats-card">
                            <div class="stats-header">
                                <h5 class="stats-title">Appointments</h5>
                                <i class="fas fa-calendar-alt"></i>
                            </div>
                            <div class="stats-content">
                                <div class="stat-item" v-for="(stat, key) in appointmentsStats" :key="key">
                                    <span class="stat-label">{{ stat.label }}</span>
                                    <span class="stat-value">{{ stat.value }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Members by Status -->
                    <div class="col-lg-4 mb-3">
                        <div class="stats-card">
                            <div class="stats-header">
                                <h5 class="stats-title">Members by Status</h5>
                                <i class="fas fa-users"></i>
                            </div>
                            <div class="stats-content">
                                <div class="stat-item" v-for="(stat, key) in membersByStatus" :key="key">
                                    <span class="stat-label">{{ stat.label }}</span>
                                    <span class="stat-value">{{ stat.value }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Top Coaches -->
                    <div class="col-lg-4 mb-3">
                        <div class="stats-card">
                            <div class="stats-header">
                                <h5 class="stats-title">Top Performing Coaches</h5>
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="stats-content" v-if="topCoaches.length > 0">
                                <div class="coach-item" v-for="(coach, index) in topCoaches" :key="coach.id">
                                    <div class="coach-rank">{{ index + 1 }}</div>
                                <div class="coach-info">
                                        <div class="coach-name">{{ coach.name }}</div>
                                        <div class="coach-stats">
                                            <span>{{ coach.total_appointments }} sessions</span>
                                            <span class="rating">
                                                <i class="fas fa-star"></i>
                                                <span v-if="coach.average_rating && coach.average_rating > 0">
                                                    {{ coach.average_rating }} ({{ coach.ratings_count || coach.ratingsCount || 0 }})
                                                </span>
                                                <span v-else>
                                                    N/A ({{ coach.ratings_count || coach.ratingsCount || 0 }})
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="empty-state">
                                <p>No coach data available</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Alerts and Recent Activity Row -->
                <div class="row">
                    <!-- Alerts -->
                    <div class="col-lg-4 mb-3">
                        <div class="alerts-card">
                            <div class="alerts-header">
                                <h5 class="alerts-title">Alerts & Notifications</h5>
                                <i class="fas fa-bell"></i>
                            </div>
                            <div class="alerts-content" v-if="alerts.length > 0">
                                <div 
                                    class="alert-item" 
                                    v-for="(alert, index) in alerts" 
                                    :key="index"
                                    :class="'alert-' + alert.type"
                                >
                                    <div class="alert-icon">
                                        <i :class="alert.icon"></i>
                                    </div>
                                    <div class="alert-content">
                                        <div class="alert-title">{{ alert.title }}</div>
                                        <div class="alert-message">{{ alert.message }}</div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="empty-state">
                                <p>No alerts at this time</p>
                            </div>
                        </div>
                    </div>

                    <!-- Upcoming Appointments -->
                    <div class="col-lg-4 mb-3">
                        <div class="appointments-card">
                            <div class="appointments-header">
                                <h5 class="appointments-title">Upcoming Appointments</h5>
                                <router-link to="/app/Appointment" class="view-all-link">
                                    View All <i class="fas fa-arrow-right"></i>
                                </router-link>
                            </div>
                            <div class="appointments-content" v-if="upcomingAppointments.length > 0">
                                <div 
                                    class="appointment-item" 
                                    v-for="appointment in upcomingAppointments.slice(0, 5)" 
                                    :key="appointment.id"
                                >
                                    <div class="appointment-date">
                                        <div class="date-day">{{ formatDate(appointment.date, 'day') }}</div>
                                        <div class="date-month">{{ formatDate(appointment.date, 'month') }}</div>
                                    </div>
                                    <div class="appointment-info">
                                        <div class="appointment-member">{{ appointment.member_name }}</div>
                                        <div class="appointment-time">
                                            <i class="fas fa-clock"></i> {{ appointment.time }}
                                        </div>
                                        <div class="appointment-coach">
                                            <i class="fas fa-user"></i> {{ appointment.coach_name }}
                                        </div>
                                    </div>
                                    <div class="appointment-status" :class="'status-' + appointment.status">
                                        {{ appointment.status }}
                                    </div>
                                </div>
                            </div>
                            <div v-else class="empty-state">
                                <p>No upcoming appointments</p>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Activity -->
                    <div class="col-lg-4 mb-3">
                        <div class="activity-card">
                            <div class="activity-header">
                                <h5 class="activity-title">Recent Activity</h5>
                                <i class="fas fa-history"></i>
                            </div>
                            <div class="activity-content" v-if="recentActivities.length > 0">
                                <div 
                                    class="activity-item" 
                                    v-for="(activity, index) in recentActivities.slice(0, 5)" 
                                    :key="index"
                                >
                                    <div class="activity-icon">
                                        <i :class="activity.icon"></i>
                                    </div>
                                    <div class="activity-content-text">
                                        <div class="activity-title">{{ activity.title }}</div>
                                        <div class="activity-message">{{ activity.message }}</div>
                                        <div class="activity-time">{{ activity.time }}</div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="empty-state">
                                <p>No recent activity</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import ECharts from "vue-echarts/components/ECharts.vue";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";

export default {
    components: {
        "v-chart": ECharts,
    },
    metaInfo: {
        title: "Dashboard",
    },
    data() {
        return {
            loading: false,
            dashboardData: null,
            revenueChartData: null,
            growthChartData: null,
            topCoaches: [],
            alerts: [],
            upcomingAppointments: [],
            recentActivities: [],
            revenueMonths: 12,
            growthMonths: 12,
            lastUpdated: null,
            autoRefreshInterval: null,
            autoRefreshEnabled: true,
            refreshInterval: 60000, // 60 seconds
        };
    },
    computed: {
        ...mapGetters(["currentUserPermissions"]),
        kpiCards() {
            if (!this.dashboardData) return [];
            
            const kpis = this.dashboardData.kpis || {};
            
            return [
                {
                    label: "Active Members",
                    value: kpis.total_active_members || 0,
                    icon: "fas fa-users",
                    colorClass: "kpi-primary",
                    format: "number",
                },
                {
                    label: "New Members This Month",
                    value: kpis.new_members_this_month || 0,
                    icon: "fas fa-user-plus",
                    colorClass: "kpi-success",
                    format: "number",
                },
                {
                    label: "Today's Appointments",
                    value: kpis.today_appointments || 0,
                    icon: "fas fa-calendar-check",
                    colorClass: "kpi-info",
                    format: "number",
                },
                {
                    label: "Monthly Revenue",
                    value: kpis.monthly_revenue || 0,
                    icon: "fas fa-dollar-sign",
                    colorClass: "kpi-warning",
                    format: "currency",
                },
                {
                    label: "Completion Rate",
                    value: kpis.completion_rate || 0,
                    icon: "fas fa-chart-line",
                    colorClass: "kpi-purple",
                    format: "percentage",
                },
                {
                    label: "Active Challenges",
                    value: kpis.active_challenges || 0,
                    icon: "fas fa-trophy",
                    colorClass: "kpi-secondary",
                    format: "number",
                },
                {
                    label: "Check-ins Today",
                    value: kpis.check_ins_today || 0,
                    icon: "fas fa-sign-in-alt",
                    colorClass: "kpi-primary",
                    format: "number",
                },
                {
                    label: "Pending Invoices",
                    value: kpis.pending_invoices || 0,
                    icon: "fas fa-file-invoice-dollar",
                    colorClass: "kpi-danger",
                    format: "number",
                },
            ];
        },
        appointmentsStats() {
            if (!this.dashboardData || !this.dashboardData.appointments) return [];
            
            return [
                {
                    label: "Today",
                    value: this.dashboardData.appointments.today || 0,
                },
                {
                    label: "This Week",
                    value: this.dashboardData.appointments.this_week || 0,
                },
                {
                    label: "This Month",
                    value: this.dashboardData.appointments.this_month || 0,
                },
            ];
        },
        membersByStatus() {
            if (!this.dashboardData || !this.dashboardData.members_by_status) return [];
            
            const statuses = this.dashboardData.members_by_status;
            return [
                {
                    label: "Active",
                    value: statuses.active || 0,
                },
                {
                    label: "Inactive",
                    value: statuses.inactive || 0,
                },
                {
                    label: "Pending",
                    value: statuses.pending || 0,
                },
            ];
        },
        revenueChartOptions() {
            if (!this.revenueChartData) return {};
            
            return {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                    },
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: this.revenueChartData.labels || [],
                },
                yAxis: {
                    type: "value",
                    axisLabel: {
                        formatter: "${value}",
                    },
                },
                series: [
                    {
                        name: "Revenue",
                        type: "line",
                        smooth: true,
                        data: this.revenueChartData.revenue || [],
                        itemStyle: {
                            color: "#dc3545",
                        },
                        areaStyle: {
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "rgba(220, 53, 69, 0.3)",
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(220, 53, 69, 0.05)",
                                    },
                                ],
                            },
                        },
                    },
                ],
            };
        },
        growthChartOptions() {
            if (!this.growthChartData) return {};
            
            return {
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    data: ["New Members", "Active Members"],
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    data: this.growthChartData.labels || [],
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        name: "New Members",
                        type: "bar",
                        data: this.growthChartData.growth?.map((g) => g.new) || [],
                        itemStyle: {
                            color: "#10b981",
                        },
                    },
                    {
                        name: "Active Members",
                        type: "bar",
                        data: this.growthChartData.growth?.map((g) => g.active) || [],
                        itemStyle: {
                            color: "#3b82f6",
                        },
                    },
                ],
            };
        },
    },
    methods: {
        async loadDashboard() {
            this.loading = true;
            try {
                // Load main dashboard stats
                const statsResponse = await axios.get("/dashboard/stats");
                if (statsResponse.data.success) {
                    this.dashboardData = statsResponse.data.data;
                    this.upcomingAppointments = this.dashboardData.upcoming_appointments || [];
                    this.recentActivities = this.dashboardData.recent_activities || [];
                    this.lastUpdated = new Date();
                }
                
                // Load revenue trend
                await this.loadRevenueTrend();
                
                // Load member growth
                await this.loadMemberGrowth();
                
                // Load top coaches
                await this.loadTopCoaches();
                
                // Load alerts
                await this.loadAlerts();
                
            } catch (error) {
                console.error("Error loading dashboard:", error);
                console.error("Error details:", error.response);
                this.$swal({
                    title: "Error!",
                    text: error.response?.data?.message || "Failed to load dashboard data. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            } finally {
                this.loading = false;
            }
        },
        async loadRevenueTrend() {
            try {
                const response = await axios.get(`/dashboard/revenue-trend`, {
                    params: { months: this.revenueMonths },
                });
                if (response.data.success) {
                    this.revenueChartData = response.data.data;
                }
            } catch (error) {
                console.error("Error loading revenue trend:", error);
            }
        },
        async loadMemberGrowth() {
            try {
                const response = await axios.get(`/dashboard/member-growth`, {
                    params: { months: this.growthMonths },
                });
                if (response.data.success) {
                    this.growthChartData = response.data.data;
                }
            } catch (error) {
                console.error("Error loading member growth:", error);
                // Silently fail for member growth as it's not critical
            }
        },
        async loadTopCoaches() {
            try {
                const response = await axios.get("/dashboard/top-coaches", {
                    params: { limit: 5 },
                });
                if (response.data.success) {
                    this.topCoaches = response.data.data;
                }
            } catch (error) {
                console.error("Error loading top coaches:", error);
            }
        },
        async loadAlerts() {
            try {
                const response = await axios.get("/dashboard/alerts");
                if (response.data.success) {
                    this.alerts = response.data.data;
                }
            } catch (error) {
                console.error("Error loading alerts:", error);
            }
        },
        refreshDashboard() {
            this.loadDashboard();
        },
        formatValue(value, format) {
            if (value === null || value === undefined) return "0";
            
            switch (format) {
                case "currency":
                    return `$${parseFloat(value).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}`;
                case "percentage":
                    return `${parseFloat(value).toFixed(1)}%`;
                default:
                    return parseFloat(value).toLocaleString("en-US");
            }
        },
        formatDate(dateString, type) {
            if (!dateString) return "";
            
            const date = new Date(dateString);
            if (type === "day") {
                return date.getDate();
            } else if (type === "month") {
                return date.toLocaleString("en-US", { month: "short" });
            }
            return date.toLocaleDateString("en-US");
        },
        formatLastUpdated() {
            if (!this.lastUpdated) return "";
            const now = new Date();
            const diff = Math.floor((now - this.lastUpdated) / 1000);
            
            if (diff < 60) return "Just now";
            if (diff < 3600) return `${Math.floor(diff / 60)} minute(s) ago`;
            if (diff < 86400) return `${Math.floor(diff / 3600)} hour(s) ago`;
            return this.lastUpdated.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        },
        startAutoRefresh() {
            if (this.autoRefreshInterval) {
                clearInterval(this.autoRefreshInterval);
            }
            
            if (this.autoRefreshEnabled) {
                this.autoRefreshInterval = setInterval(() => {
                    if (!this.loading) {
                        this.loadDashboard();
                    }
                }, this.refreshInterval);
            }
        },
        stopAutoRefresh() {
            if (this.autoRefreshInterval) {
                clearInterval(this.autoRefreshInterval);
                this.autoRefreshInterval = null;
            }
        },
        toggleAutoRefresh() {
            this.autoRefreshEnabled = !this.autoRefreshEnabled;
            if (this.autoRefreshEnabled) {
                this.startAutoRefresh();
            } else {
                this.stopAutoRefresh();
            }
        },
    },
    async mounted() {
        await this.loadDashboard();
        this.startAutoRefresh();
    },
    beforeDestroy() {
        this.stopAutoRefresh();
    },
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

.dashboard-container {
    // min-height: 100vh;
    padding: 15px;
    box-sizing: border-box;
}

.dashboard-header {
    background: $color-white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(79, 112, 92, 0.15);
    padding: 25px 30px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}

.header-content {
    display: flex;
    align-items: center;
    gap: 20px;
    flex: 1;
}

.header-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, $primary 0%, #e52e2e 100%);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
}

.header-text {
    flex: 1;
}

.dashboard-title {
    font-size: 28px;
    font-weight: 700;
    color: $color-heading;
    margin: 0 0 5px 0;
}

.dashboard-subtitle {
    font-size: 14px;
    color: $color-muted;
    margin: 0;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
}

.last-updated {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: $color-muted;
    padding: 8px 12px;
    background: $color-input-bg;
    border-radius: 6px;
    
    i {
        color: $primary;
    }
}

.auto-refresh-btn {
    background: transparent;
    border: 2px solid $color-border;
    color: $color-muted;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        border-color: $primary;
        color: $primary;
    }
    
    &.active {
        border-color: $color-success;
        color: $color-success;
    }
}

.refresh-btn {
    background: $primary;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    
    &:hover:not(:disabled) {
        background: $color-button-hover;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    i.fa-spin {
        animation: spin 1s linear infinite;
    }
}

.loading-container {
    text-align: center;
    padding: 60px 20px;
    
    p {
        margin-top: 20px;
        color: $color-muted;
    }
}

// KPI Cards
.kpi-card {
    background: $color-white;
    border-radius: 12px;
    padding: 18px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 15px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    
    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
    
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: 100%;
    }
    
    &.kpi-primary::before {
        background: $primary;
    }
    
    &.kpi-success::before {
        background: $color-success;
    }
    
    &.kpi-info::before {
        background: $color-info;
    }
    
    &.kpi-warning::before {
        background: $color-warning;
    }
    
    &.kpi-purple::before {
        background: $purple;
    }
    
    &.kpi-secondary::before {
        background: $btn-secondary-bg;
    }
    
    &.kpi-danger::before {
        background: $color-danger;
    }
}

.kpi-icon {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
}

.kpi-primary .kpi-icon {
    background: rgba(220, 53, 69, 0.1);
    color: $primary;
}

.kpi-success .kpi-icon {
    background: rgba(76, 175, 80, 0.1);
    color: $color-success;
}

.kpi-info .kpi-icon {
    background: rgba(33, 150, 243, 0.1);
    color: $color-info;
}

.kpi-warning .kpi-icon {
    background: rgba(255, 152, 0, 0.1);
    color: $color-warning;
}

.kpi-purple .kpi-icon {
    background: rgba(139, 92, 246, 0.1);
    color: $purple;
}

.kpi-secondary .kpi-icon {
    background: rgba(108, 117, 125, 0.1);
    color: $btn-secondary-bg;
}

.kpi-danger .kpi-icon {
    background: rgba(244, 67, 54, 0.1);
    color: $color-danger;
}

.kpi-content {
    flex: 1;
    min-width: 0;
}

.kpi-value {
    font-size: 26px;
    font-weight: 700;
    color: $color-heading;
    margin: 0 0 4px 0;
    line-height: 1.2;
}

.kpi-label {
    font-size: 13px;
    color: $color-muted;
    margin: 0;
    font-weight: 500;
    line-height: 1.3;
}

// Chart Cards
.chart-card {
    background: $color-white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    height: 100%;
}

.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.chart-title {
    font-size: 18px;
    font-weight: 600;
    color: $color-heading;
    margin: 0;
}

.chart-controls {
    display: flex;
    gap: 10px;
    align-items: center;
}

.period-select {
    padding: 6px 12px;
    border: 1px solid $color-border;
    border-radius: 6px;
    font-size: 13px;
    background: $color-white;
    color: $color-heading;
    cursor: pointer;
    
    &:focus {
        outline: none;
        border-color: $primary;
    }
}

.chart-wrapper {
    width: 100%;
}

// Stats Cards
.stats-card {
    background: $color-white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    height: 100%;
}

.stats-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid $color-divider;
}

.stats-title {
    font-size: 18px;
    font-weight: 600;
    color: $color-heading;
    margin: 0;
}

.stats-header i {
    font-size: 20px;
    color: $primary;
}

.stats-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: $color-input-bg;
    border-radius: 8px;
}

.stat-label {
    font-size: 14px;
    color: $color-muted;
    font-weight: 500;
}

.stat-value {
    font-size: 18px;
    font-weight: 700;
    color: $color-heading;
}

.coach-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px;
    background: $color-input-bg;
    border-radius: 8px;
    margin-bottom: 10px;
}

.coach-rank {
    width: 35px;
    height: 35px;
    background: $primary;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    flex-shrink: 0;
}

.coach-info {
    flex: 1;
}

.coach-name {
    font-size: 15px;
    font-weight: 600;
    color: $color-heading;
    margin-bottom: 5px;
}

.coach-stats {
    display: flex;
    gap: 15px;
    font-size: 13px;
    color: $color-muted;
}

.rating {
    color: $color-warning;
}

// Alerts Card
.alerts-card {
    background: $color-white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    height: 100%;
}

.alerts-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid $color-divider;
}

.alerts-title {
    font-size: 18px;
    font-weight: 600;
    color: $color-heading;
    margin: 0;
}

.alerts-header i {
    font-size: 20px;
    color: $primary;
}

.alerts-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.alert-item {
    display: flex;
    gap: 12px;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid;
    
    &.alert-warning {
        background: rgba(255, 152, 0, 0.1);
        border-color: $color-warning;
    }
    
    &.alert-danger {
        background: rgba(244, 67, 54, 0.1);
        border-color: $color-danger;
    }
    
    &.alert-info {
        background: rgba(33, 150, 243, 0.1);
        border-color: $color-info;
    }
}

.alert-icon {
    font-size: 20px;
    flex-shrink: 0;
}

.alert-warning .alert-icon {
    color: $color-warning;
}

.alert-danger .alert-icon {
    color: $color-danger;
}

.alert-info .alert-icon {
    color: $color-info;
}

.alert-content {
    flex: 1;
}

.alert-title {
    font-size: 14px;
    font-weight: 600;
    color: $color-heading;
    margin-bottom: 5px;
}

.alert-message {
    font-size: 13px;
    color: $color-muted;
}

// Appointments Card
.appointments-card {
    background: $color-white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    height: 100%;
}

.appointments-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid $color-divider;
}

.appointments-title {
    font-size: 18px;
    font-weight: 600;
    color: $color-heading;
    margin: 0;
}

.view-all-link {
    font-size: 13px;
    color: $primary;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: color 0.3s ease;
    
    &:hover {
        color: $color-button-hover;
    }
}

.appointments-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.appointment-item {
    display: flex;
    gap: 15px;
    padding: 15px;
    background: $color-input-bg;
    border-radius: 8px;
    transition: all 0.3s ease;
    
    &:hover {
        background: color.adjust($color-input-bg, $lightness: -2%);
        transform: translateX(5px);
    }
}

.appointment-date {
    width: 50px;
    text-align: center;
    flex-shrink: 0;
}

.date-day {
    font-size: 24px;
    font-weight: 700;
    color: $primary;
    line-height: 1;
}

.date-month {
    font-size: 12px;
    color: $color-muted;
    text-transform: uppercase;
}

.appointment-info {
    flex: 1;
}

.appointment-member {
    font-size: 15px;
    font-weight: 600;
    color: $color-heading;
    margin-bottom: 5px;
}

.appointment-time,
.appointment-coach {
    font-size: 13px;
    color: $color-muted;
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 3px;
}

.appointment-status {
    font-size: 11px;
    padding: 4px 10px;
    border-radius: 12px;
    text-transform: capitalize;
    font-weight: 600;
    align-self: flex-start;
    
    &.status-scheduled {
        background: rgba(33, 150, 243, 0.1);
        color: $color-info;
    }
    
    &.status-completed {
        background: rgba(76, 175, 80, 0.1);
        color: $color-success;
    }
}

// Activity Card
.activity-card {
    background: $color-white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    height: 100%;
}

.activity-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid $color-divider;
}

.activity-title {
    font-size: 18px;
    font-weight: 600;
    color: $color-heading;
    margin: 0;
}

.activity-header i {
    font-size: 20px;
    color: $primary;
}

.activity-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.activity-item {
    display: flex;
    gap: 15px;
    padding: 12px;
    background: $color-input-bg;
    border-radius: 8px;
}

.activity-icon {
    width: 40px;
    height: 40px;
    background: rgba(220, 53, 69, 0.1);
    color: $primary;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
}

.activity-content-text {
    flex: 1;
}

.activity-title {
    font-size: 14px;
    font-weight: 600;
    color: $color-heading;
    margin-bottom: 3px;
}

.activity-message {
    font-size: 13px;
    color: $color-muted;
    margin-bottom: 5px;
}

.activity-time {
    font-size: 11px;
    color: $color-muted;
}

.empty-state {
    text-align: center;
    padding: 40px 20px;
    color: $color-muted;
    
    p {
        margin: 0;
        font-size: 14px;
    }
}

// Responsive Design
@media (max-width: 1199px) {
    .kpi-value {
        font-size: 24px;
    }
    
    .kpi-icon {
        width: 45px;
        height: 45px;
        font-size: 18px;
    }
}

@media (max-width: 991px) {
    .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .kpi-value {
        font-size: 22px;
    }
    
    .kpi-label {
        font-size: 12px;
    }
    
    .kpi-card {
        padding: 16px;
        gap: 12px;
    }
    
    .kpi-icon {
        width: 42px;
        height: 42px;
        font-size: 17px;
    }
    
    .dashboard-title {
        font-size: 24px;
    }
}

@media (max-width: 767px) {
    .dashboard-container {
        padding: 10px;
    }
    
    .dashboard-header {
        padding: 20px;
    }
    
    .kpi-card {
        padding: 15px;
        gap: 10px;
    }
    
    .kpi-value {
        font-size: 20px;
    }
    
    .kpi-icon {
        width: 40px;
        height: 40px;
        font-size: 16px;
    }
    
    .chart-card,
    .stats-card,
    .alerts-card,
    .appointments-card,
    .activity-card {
        padding: 20px;
    }
}

@media (max-width: 575px) {
    .kpi-card {
        padding: 14px;
    }
    
    .kpi-value {
        font-size: 18px;
    }
    
    .kpi-label {
        font-size: 11px;
    }
    
    .kpi-icon {
        width: 38px;
        height: 38px;
        font-size: 15px;
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>

