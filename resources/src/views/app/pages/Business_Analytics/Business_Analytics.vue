<template>
    <!-- ============ Body content start ============= -->
    <div class="main-content">
        <!-- Breadcrumb Section -->
        <div class="breadcrumb-section mb-3">
            <nav class="breadcrumb-nav" aria-label="breadcrumb">
                <div class="breadcrumb-container d-flex align-items-center">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <router-link to="/app/dashboard">
                                <i class="fas fa-home"></i>
                                Dashboard
                            </router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                            <i class="fas fa-chart-line"></i>
                            Business Analytics
                        </li>
                    </ol>
                </div>
            </nav>
        </div>

        <div
            v-if="loading"
            class="loading_page spinner spinner-primary mr-3"
        ></div>
        <div
            v-else-if="
                !loading &&
                currentUserPermissions &&
                currentUserPermissions.includes('dashboard')
            "
        >
            <!-- Business Analytics Navigation Tabs -->
            <div class="business-analytics-nav mb-4">
                <nav class="nav nav-pills nav-fill">
                    <a 
                        class="nav-link" 
                        :class="{ active: activeTab === 'overview' }"
                        @click="activeTab = 'overview'"
                        href="#"
                    >
                        Overview
                    </a>
                    <a 
                        class="nav-link" 
                        :class="{ active: activeTab === 'members-memberships' }"
                        @click="activeTab = 'members-memberships'"
                        href="#"
                    >
                        Members & Memberships
                    </a>
                    <!-- <a 
                        class="nav-link" 
                        :class="{ active: activeTab === 'sales-retention' }"
                        @click="activeTab = 'sales-retention'"
                        href="#"
                    >
                        Sales & Retention
                    </a> -->
                    <!-- <a 
                        class="nav-link" 
                        :class="{ active: activeTab === 'finance' }"
                        @click="activeTab = 'finance'"
                        href="#"
                    >
                        Finance
                    </a> -->
                    <router-link 
                        class="nav-link" 
                        :class="{ active: activeTab === 'checkins' }"
                        @click="activeTab = 'checkins'"
                        to="/app/checkin"
                    >
                        Check-ins
                    </router-link>
                    <router-link 
                        class="nav-link" 
                        :class="{ active: activeTab === 'invoices' }"
                        @click="activeTab = 'invoices'"
                        to="/app/payments/invoices"
                    >
                        Invoices
                    </router-link>
                    <!-- <a 
                        class="nav-link" 
                        :class="{ active: activeTab === 'schedule' }"
                        @click="activeTab = 'schedule'"
                        href="#"
                    >
                        Schedule
                    </a> -->
                    <!-- <a 
                        class="nav-link" 
                        :class="{ active: activeTab === 'coaches' }"
                        @click="activeTab = 'coaches'"
                        href="#"
                    >
                        Coaches
                    </a> -->
                    <!-- <a 
                        class="nav-link" 
                        :class="{ active: activeTab === 'engagement' }"
                        @click="activeTab = 'engagement'"
                        href="#"
                    >
                        Engagement
                    </a> -->
                </nav>

            </div>

            <!-- Overview Tab Content -->
            <div v-if="activeTab === 'overview'" class="tab-content">
                <h2 class="page-title mb-4">Business Overview</h2>
                
                <!-- KPI Cards Row -->
                <b-row class="mb-4">
                    <b-col md="6" class="mb-3">
                        <div class="kpi-card">
                            <div class="kpi-header">
                                <h5 class="kpi-title">Active Members</h5>
                                <div class="kpi-icons">
                                    <i class="fas fa-upload text-muted mr-2"></i>
                                    <i class="fas fa-sync text-muted mr-2"></i>
                                    <i class="fas fa-info-circle text-muted"></i>
                                </div>
                            </div>
                            <div class="kpi-value">{{ activeMembersCount }}</div>
                        </div>
                    </b-col>
                    <b-col md="6" class="mb-3">
                        <div class="kpi-card">
                            <div class="kpi-header">
                                <h5 class="kpi-title">Revenue this month</h5>
                                <div class="kpi-icons">
                                    <i class="fas fa-info-circle text-muted"></i>
                                </div>
                            </div>
                            <div class="kpi-value">{{ formattedMonthlyRevenue }}</div>
                        </div>
                    </b-col>
                </b-row>

                <!-- Charts Row -->
                <b-row>
                    <b-col md="6" class="mb-3">
                        <div class="chart-card">
                            <div class="chart-header">
                                <h5 class="chart-title">Revenue</h5>
                                <div class="chart-controls">
                                    <i class="fas fa-filter text-muted mr-2"></i>
                                    <i class="fas fa-upload text-muted mr-2"></i>
                                    <i class="fas fa-info-circle text-muted"></i>
                                </div>
                            </div>
                            <div class="chart-period mb-3">
                                <span class="period-btn">Last...</span>
                                <span class="period-btn active">13 Months</span>
                                <span class="period-btn active">by Month</span>
                            </div>
                            <div class="chart-wrapper">
                                <v-chart
                                    :options="revenueChartOptions"
                                    :autoresize="true"
                                    style="height: 100%"
                                ></v-chart>
                            </div>
                        </div>
                    </b-col>
                    <b-col md="6" class="mb-3">
                        <div class="chart-card">
                            <div class="chart-header">
                                <h5 class="chart-title">Active clients (1st of the month)</h5>
                                <div class="chart-controls">
                                    <i class="fas fa-filter text-muted mr-2"></i>
                                    <i class="fas fa-upload text-muted mr-2"></i>
                                    <i class="fas fa-info-circle text-muted"></i>
                                </div>
                            </div>
                            <div class="chart-wrapper">
                                <v-chart
                                    :options="activeClientsChartOptions"
                                    :autoresize="true"
                                    style="height: 100%"
                                ></v-chart>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </div>

            <!-- Members & Memberships Tab Content -->
            <div v-if="activeTab === 'members-memberships'" class="tab-content">
                <h2 class="page-title mb-4">Members & Memberships</h2>
                
                <!-- Charts Row -->
                <b-row>
                    <b-col md="6" class="mb-3">
                        <div class="chart-card">
                            <div class="chart-header">
                                <h5 class="chart-title">Active Memberships</h5>
                                <div class="chart-controls">
                                    <i class="fas fa-filter text-muted mr-2"></i>
                                    <i class="fas fa-upload text-muted mr-2"></i>
                                </div>
                            </div>
                            <div class="chart-period mb-3">
                                <span class="period-btn">Last...</span>
                                <span class="period-btn active">13</span>
                                <span class="period-btn active">Months</span>
                                <span class="period-btn active">by Month</span>
                            </div>
                            <div class="chart-wrapper">
                                <v-chart
                                    :options="activeMembershipsChartOptions"
                                    :autoresize="true"
                                    style="height: 100%"
                                ></v-chart>
                            </div>
                        </div>
                    </b-col>
                    <b-col md="6" class="mb-3">
                        <div class="chart-card">
                            <div class="chart-header">
                                <h5 class="chart-title">Member Status</h5>
                                <div class="chart-controls">
                                    <i class="fas fa-upload text-muted mr-2"></i>
                                </div>
                            </div>
                            <div class="chart-wrapper">
                                <v-chart
                                    :options="clientStatusChartOptions"
                                    :autoresize="true"
                                    style="height: 100%"
                                ></v-chart>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </div>

            <!-- Other tabs placeholder content -->
            <div v-if="activeTab === 'sales-retention'" class="tab-content">
                <h2 class="page-title mb-4">Sales & Retention</h2>
                <div class="placeholder-content">
                    <p>Sales & Retention analytics coming soon...</p>
                </div>
            </div>

            <div v-if="activeTab === 'finance'" class="tab-content">
                <h2 class="page-title mb-4">Finance</h2>
                <div class="placeholder-content">
                    <p>Finance analytics coming soon...</p>
                </div>
            </div>

            <div v-if="activeTab === 'checkins'" class="tab-content">
                <h2 class="page-title mb-4">Check-ins</h2>
                <div class="placeholder-content">
                    <p>Check-ins analytics coming soon...</p>
                </div>
            </div>

            <div v-if="activeTab === 'schedule'" class="tab-content">
                <h2 class="page-title mb-4">Schedule</h2>
                <div class="placeholder-content">
                    <p>Schedule analytics coming soon...</p>
                </div>
            </div>

            <div v-if="activeTab === 'coaches'" class="tab-content">
                <h2 class="page-title mb-4">Coaches</h2>
                <div class="placeholder-content">
                    <p>Coaches analytics coming soon...</p>
                </div>
            </div>

            <div v-if="activeTab === 'engagement'" class="tab-content">
                <h2 class="page-title mb-4">Engagement</h2>
                <div class="placeholder-content">
                    <p>Engagement analytics coming soon...</p>
                </div>
            </div>
        </div>

        <div v-else>
            <h4>Welcome_to_your_Dashboard</h4>
        </div>
    </div>
    <!-- ============ Body content End ============= -->
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

import ECharts from "vue-echarts/components/ECharts.vue";

// import ECharts modules manually to reduce bundle size
import "echarts/lib/chart/pie";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";

export default {
    components: {
        "v-chart": ECharts,
    },
    metaInfo: {
        title: "Business Analytics",
    },
    data() {
        return {
            activeTab: 'overview',
            sales: [],
            warehouses: [],
            warehouse_id: "",
            stock_alerts: [],
            report_today: {
                revenue: 0,
                today_purchases: 0,
                today_sales: 0,
                return_sales: 0,
                return_purchases: 0,
            },
            products: [],
            cash_balances: [],
            CurrentMonth: "",
            loading: false,
            // Real data from API
            dashboardStats: null,
            revenueData: null,
            activeClientsData: null,
            activeMembershipsData: null,
            clientStatusData: null,
            echartSales: {},
            echartProduct: {
                color: ["#10b981", "#f59e42", "#6366f1", "#f43f5e", "#fbbf24"],
                tooltip: {
                    show: true,
                    backgroundColor: "rgba(0, 0, 0, .8)",
                },
                legend: {
                    orient: "vertical",
                    left: "left",
                    data: ["Alice", "Bob", "Charlie", "Diana", "Eve"],
                },
                title: {
                    text: "Top Trainers",
                    left: "center",
                    top: 10,
                    textStyle: { fontWeight: "bold", fontSize: 16 },
                },
                series: [
                    {
                        name: "Top Trainers",
                        type: "pie",
                        radius: "60%",
                        center: ["60%", "55%"],
                        data: [
                            { value: 40, name: "Alice" },
                            { value: 32, name: "Bob" },
                            { value: 28, name: "Charlie" },
                            { value: 20, name: "Diana" },
                            { value: 15, name: "Eve" },
                        ],
                        label: { formatter: "{b} {d}%" },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    },
                ],
            },
            echartCustomer: {},
            echartPayment: {},
            echartMemberSummary: {
                tooltip: { trigger: "axis" },
                legend: {
                    data: [
                        "Active Days",
                        "Total Steps",
                        "Calories Burned",
                        "Avg Sleep (hrs)",
                    ],
                },
                xAxis: [
                    {
                        type: "category",
                        data: [
                            "Sarah Khan",
                            "John Smith",
                            "Aisha Malik",
                            "Mike Johnson",
                            "Sana Iqbal",
                        ],
                    },
                ],
                yAxis: [{ type: "value", name: "Axis Title" }],
                series: [
                    {
                        name: "Active Days",
                        type: "bar",
                        data: [155, 143, 120, 170, 110],
                        color: "#60a5fa",
                    },
                    {
                        name: "Total Steps",
                        type: "bar",
                        data: [1250000, 1100000, 950000, 1350000, 800000],
                        color: "#f59e42",
                    },
                    {
                        name: "Calories Burned",
                        type: "bar",
                        data: [85000, 79000, 65000, 92000, 70000],
                        color: "#6366f1",
                    },
                    {
                        name: "Avg Sleep (hrs)",
                        type: "bar",
                        data: [7.2, 6.9, 7.4, 6.8, 7.0],
                        color: "#fbbf24",
                    },
                ],
            },
            echartMonthlyActivity: {
                tooltip: { trigger: "axis" },
                legend: {
                    data: [
                        "Avg Sleep (hrs)",
                        "Total Calories Burned",
                        "Total Steps",
                        "Total Users Active",
                    ],
                },
                yAxis: {
                    type: "category",
                    data: ["May", "April", "March", "February", "January"],
                },
                xAxis: { type: "value" },
                series: [
                    {
                        name: "Avg Sleep (hrs)",
                        type: "bar",
                        stack: "total",
                        data: [7.2, 7.1, 7.0, 6.9, 6.8],
                        color: "#fbbf24",
                    },
                    {
                        name: "Total Calories Burned",
                        type: "bar",
                        stack: "total",
                        data: [8500000, 8000000, 7800000, 7600000, 7400000],
                        color: "#f87171",
                    },
                    {
                        name: "Total Steps",
                        type: "bar",
                        stack: "total",
                        data: [
                            35000000, 32000000, 30000000, 28000000, 26000000,
                        ],
                        color: "#f59e42",
                    },
                    {
                        name: "Total Users Active",
                        type: "bar",
                        stack: "total",
                        data: [120, 110, 105, 100, 95],
                        color: "#38bdf8",
                    },
                ],
            },
            echartWorkoutType: {
                tooltip: { trigger: "item", formatter: "{b}: {d}%" },
                legend: {
                    orient: "vertical",
                    left: "left",
                    data: ["Cardio", "Strength", "Yoga", "HIIT", "Walking"],
                },
                series: [
                    {
                        name: "Workout Type",
                        type: "pie",
                        radius: "60%",
                        center: ["60%", "55%"],
                        data: [
                            { value: 35, name: "Cardio" },
                            { value: 24, name: "Strength" },
                            { value: 14, name: "Yoga" },
                            { value: 9, name: "HIIT" },
                            { value: 18, name: "Walking" },
                        ],
                        color: [
                            "#38bdf8",
                            "#f87171",
                            "#a3a3a3",
                            "#fbbf24",
                            "#60a5fa",
                        ],
                        label: { formatter: "{b} {d}%" },
                    },
                ],
            },
            echartSalesVsCost: {
                title: {
                    text: "Sales vs Cost of Sales",
                    left: "center",
                    top: 10,
                    textStyle: { fontWeight: "bold", fontSize: 18 },
                },
                tooltip: { trigger: "axis" },
                legend: {
                    data: ["Sales ($)", "Cost of Sales ($)"],
                    bottom: 10,
                },
                xAxis: {
                    type: "category",
                    data: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ],
                },
                yAxis: {
                    type: "value",
                    min: 0,
                },
                series: [
                    {
                        name: "Sales ($)",
                        type: "line",
                        data: [
                            12000, 15000, 17000, 16000, 18000, 17500, 19000,
                            18500, 18000, 16500, 15500, 17000,
                        ],
                        color: "#38bdf8",
                        symbol: "circle",
                        symbolSize: 8,
                        lineStyle: { width: 3 },
                        itemStyle: { borderWidth: 2 },
                    },
                    {
                        name: "Cost of Sales ($)",
                        type: "line",
                        data: [
                            7000, 8500, 9500, 9000, 10000, 9700, 10500, 10200,
                            9800, 9000, 8700, 9300,
                        ],
                        color: "#f87171",
                        symbol: "circle",
                        symbolSize: 8,
                        lineStyle: { width: 3 },
                        itemStyle: { borderWidth: 2 },
                    },
                ],
            },
            // Business Analytics Charts - will be populated from API
            revenueChart: {
                tooltip: { trigger: "axis" },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    data: [],
                    axisLabel: {
                        rotate: 45,
                        fontSize: 10
                    }
                },
                yAxis: {
                    type: "value",
                    min: 0,
                    axisLabel: {
                        formatter: function(value) {
                            if (value >= 1000) {
                                return (value / 1000).toFixed(1) + 'K';
                            }
                            return value;
                        }
                    }
                },
                series: [{
                    name: "Revenue",
                    type: "bar",
                    data: [],
                    color: "#ff8c00",
                    barWidth: "60%"
                }]
            },
            activeClientsChart: {
                tooltip: { trigger: "axis" },
                legend: {
                    data: ["Total clients", "#Unique Clients with Active Membership"],
                    bottom: 10
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "15%",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    data: [],
                    axisLabel: {
                        rotate: 45,
                        fontSize: 10
                    }
                },
                yAxis: {
                    type: "value",
                    min: 0
                },
                series: [
                    {
                        name: "Total clients",
                        type: "line",
                        data: [],
                        color: "#8b5cf6",
                        symbol: "circle",
                        symbolSize: 6,
                        lineStyle: { width: 2 }
                    },
                    {
                        name: "#Unique Clients with Active Membership",
                        type: "line",
                        data: [],
                        color: "#3b82f6",
                        symbol: "triangle",
                        symbolSize: 6,
                        lineStyle: { width: 2 }
                    }
                ]
            },
            activeMembershipsChart: {
                tooltip: { trigger: "axis" },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    data: [],
                    axisLabel: {
                        rotate: 45,
                        fontSize: 10
                    }
                },
                yAxis: {
                    type: "value",
                    min: 0
                },
                series: [{
                    name: "Active memberships",
                    type: "bar",
                    data: [],
                    color: "#8b5cf6",
                    barWidth: "60%"
                }]
            },
            clientStatusChart: {
                tooltip: { trigger: "item", formatter: "{b}: {d}%" },
                legend: {
                    orient: "vertical",
                    left: "left",
                    data: ["Active Memberships", "No Memberships", "Upcoming Memberships", "Paused Memberships"],
                },
                series: [{
                    name: "Member Status",
                    type: "pie",
                    radius: ["40%", "70%"],
                    center: ["60%", "50%"],
                    data: [],
                    label: { formatter: "{b}: {d}%" },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                    }
                }]
            },
        };
    },
    computed: {
        ...mapGetters(["currentUserPermissions", "currentUser"]),
        activeMembersCount() {
            return this.dashboardStats?.kpis?.total_active_members || 0;
        },
        formattedMonthlyRevenue() {
            const revenue = this.dashboardStats?.kpis?.monthly_revenue || 0;
            if (revenue >= 1000) {
                return (revenue / 1000).toFixed(2) + 'K';
            }
            return revenue.toFixed(2);
        },
        revenueChartOptions() {
            if (!this.revenueData) return this.revenueChart;
            
            return {
                ...this.revenueChart,
                xAxis: {
                    ...this.revenueChart.xAxis,
                    data: this.revenueData.labels || []
                },
                series: [{
                    ...this.revenueChart.series[0],
                    data: this.revenueData.revenue || []
                }]
            };
        },
        activeClientsChartOptions() {
            if (!this.activeClientsData) return this.activeClientsChart;
            
            return {
                ...this.activeClientsChart,
                xAxis: {
                    ...this.activeClientsChart.xAxis,
                    data: this.activeClientsData.labels || []
                },
                series: [
                    {
                        ...this.activeClientsChart.series[0],
                        data: this.activeClientsData.total_clients || []
                    },
                    {
                        ...this.activeClientsChart.series[1],
                        data: this.activeClientsData.active_membership_clients || []
                    }
                ]
            };
        },
        activeMembershipsChartOptions() {
            if (!this.activeMembershipsData) return this.activeMembershipsChart;
            
            return {
                ...this.activeMembershipsChart,
                xAxis: {
                    ...this.activeMembershipsChart.xAxis,
                    data: this.activeMembershipsData.labels || []
                },
                series: [{
                    ...this.activeMembershipsChart.series[0],
                    data: this.activeMembershipsData.memberships || []
                }]
            };
        },
        clientStatusChartOptions() {
            if (!this.clientStatusData) return this.clientStatusChart;
            
            const data = [
                { 
                    value: this.clientStatusData.active_memberships?.count || 0, 
                    name: "Active Memberships", 
                    itemStyle: { color: "#8b5cf6" } 
                },
                { 
                    value: this.clientStatusData.no_memberships?.count || 0, 
                    name: "No Memberships", 
                    itemStyle: { color: "#ec4899" } 
                },
                { 
                    value: this.clientStatusData.upcoming_memberships?.count || 0, 
                    name: "Upcoming Memberships", 
                    itemStyle: { color: "#06b6d4" } 
                },
                { 
                    value: this.clientStatusData.paused_memberships?.count || 0, 
                    name: "Paused Memberships", 
                    itemStyle: { color: "#f97316" } 
                }
            ];
            
            return {
                ...this.clientStatusChart,
                series: [{
                    ...this.clientStatusChart.series[0],
                    data: data
                }]
            };
        },
        columns_sales() {
            return [
                {
                    label: this.Reference,
                    field: "Ref",
                    tdClass: "gull-border-none text-left",
                    thClass: "text-left",
                    sortable: false,
                },
                {
                    label: this.Customer,
                    field: "client_name",
                    tdClass: "gull-border-none text-left",
                    thClass: "text-left",
                    sortable: false,
                },
                {
                    label: this.warehouse,
                    field: "warehouse_name",
                    tdClass: "text-left",
                    thClass: "text-left",
                },
                {
                    label: this.Status,
                    field: "statut",
                    html: true,
                    tdClass: "gull-border-none text-left",
                    thClass: "text-left",
                    sortable: false,
                },
                {
                    label: this.Total,
                    field: "GrandTotal",
                    type: "decimal",
                    tdClass: "gull-border-none text-left",
                    thClass: "text-left",
                    sortable: false,
                },
                {
                    label: this.Paid,
                    field: "paid_amount",
                    type: "decimal",
                    tdClass: "gull-border-none text-left",
                    thClass: "text-left",
                    sortable: false,
                },
                {
                    label: this.Due,
                    field: "due",
                    type: "decimal",
                    tdClass: "gull-border-none text-left",
                    thClass: "text-left",
                    sortable: false,
                },
                {
                    label: this.PaymentStatus,
                    field: "payment_status",
                    html: true,
                    sortable: false,
                    tdClass: "text-left gull-border-none",
                    thClass: "text-left",
                },
            ];
        },
        columns_stock() {
            return [
                {
                    label: this.ProductCode,
                    field: "code",
                    tdClass: "text-left",
                    thClass: "text-left",
                    sortable: false,
                },
                {
                    label: this.ProductName,
                    field: "name",
                    tdClass: "text-left",
                    thClass: "text-left",
                    sortable: false,
                },
                {
                    label: this.warehouse,
                    field: "warehouse",
                    tdClass: "text-left",
                    thClass: "text-left",
                    sortable: false,
                },
                {
                    label: this.Quantity,
                    field: "quantity",
                    tdClass: "text-left",
                    thClass: "text-left",
                    sortable: false,
                },
                {
                    label: this.AlertQuantity,
                    field: "stock_alert",
                    tdClass: "text-left",
                    thClass: "text-left",
                    sortable: false,
                },
            ];
        },
        columns_products() {
            return [
                {
                    label: this.ProductName,
                    field: "name",
                    tdClass: "text-left",
                    thClass: "text-left",
                    sortable: false,
                },
                {
                    label: this.TotalSales,
                    field: "total_sales",
                    tdClass: "text-left",
                    thClass: "text-left",
                    sortable: false,
                },
                {
                    label: this.TotalAmount,
                    field: "total",
                    tdClass: "text-left",
                    thClass: "text-left",
                    sortable: false,
                },
            ];
        },
        columns_cash() {
            return [
                // {
                //   label: this.Accound Id,
                //   field: "account_id",
                //   tdClass: "text-left",
                //   thClass: "text-left",
                //   sortable: false
                // },
                {
                    label: this.Name,
                    field: "account_name",
                    tdClass: "text-left",
                    thClass: "text-left",
                    sortable: false,
                },
                {
                    label: this.Balance,
                    field: "balance",
                    tdClass: "text-left",
                    thClass: "text-left",
                    sortable: false,
                },
            ];
        },
    },

    methods: {

        //------------------------------Get Month -------------------------\\
        GetMonth() {
            var months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            var now = new Date();
            this.CurrentMonth = months[now.getMonth()];
        },

        //------------------------------Formetted Numbers -------------------------\\
        formatNumber(number, dec) {
            const value = (
                typeof number === "string" ? number : number.toString()
            ).split(".");
            if (dec <= 0) return value[0];
            let formated = value[1] || "";
            if (formated.length > dec)
                return `${value[0]}.${formated.substr(0, dec)}`;
            while (formated.length < dec) formated += "0";
            return `${value[0]}.${formated}`;
        },
        
        //------------------------------Load Business Analytics Data -------------------------\\
        async loadBusinessAnalytics() {
            this.loading = true;
            try {
                // Parallelize all independent API calls for optimal performance
                // Dashboard stats and chart data can load simultaneously
                await Promise.all([
                    this.loadDashboardStats(),
                    this.loadRevenueTrend(),
                    this.loadActiveClientsTrend(),
                    this.loadActiveMembershipsTrend(),
                    this.loadClientStatus()
                ]);
            } catch (error) {
                console.error("Error loading business analytics:", error);
                this.$swal({
                    title: "Error!",
                    text: error.response?.data?.message || "Failed to load business analytics data. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            } finally {
                this.loading = false;
            }
        },
        
        async loadDashboardStats() {
            try {
                const response = await axios.get("/dashboard/stats");
                if (response.data.success) {
                    this.dashboardStats = response.data.data;
                }
            } catch (error) {
                console.error("Error loading dashboard stats:", error);
                throw error;
            }
        },
        
        async loadRevenueTrend() {
            try {
                const response = await axios.get("/dashboard/revenue-trend", {
                    params: { months: 13 }
                });
                if (response.data.success) {
                    this.revenueData = response.data.data;
                }
            } catch (error) {
                console.error("Error loading revenue trend:", error);
                throw error;
            }
        },
        
        async loadActiveClientsTrend() {
            try {
                const response = await axios.get("/dashboard/active-clients-trend", {
                    params: { months: 13 }
                });
                if (response.data.success) {
                    this.activeClientsData = response.data.data;
                }
            } catch (error) {
                console.error("Error loading active clients trend:", error);
                throw error;
            }
        },
        
        async loadActiveMembershipsTrend() {
            try {
                const response = await axios.get("/dashboard/active-memberships-trend", {
                    params: { months: 13 }
                });
                if (response.data.success) {
                    this.activeMembershipsData = response.data.data;
                }
            } catch (error) {
                console.error("Error loading active memberships trend:", error);
                throw error;
            }
        },
        
        async loadClientStatus() {
            try {
                const response = await axios.get("/dashboard/client-status");
                if (response.data.success) {
                    this.clientStatusData = response.data.data;
                }
            } catch (error) {
                console.error("Error loading Member Status:", error);
                throw error;
            }
        },
    },
    async mounted() {
        this.GetMonth();
        if (this.currentUserPermissions && this.currentUserPermissions.includes('dashboard')) {
            await this.loadBusinessAnalytics();
        }
    },
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

.main-content {
  margin: 0;
  padding: 20px;
  font-family: 'Inter', "Nunito", sans-serif;
  font-size: 0.813rem;
  font-weight: 400;
  line-height: 1.5;
  color: #252525;
  text-align: left;
  background-color: #f5f5f3;
  min-height: 100vh;
}

// Breadcrumb Section Styles
.breadcrumb-section {
  background: white;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
  margin-bottom: 20px;
}

.breadcrumb-nav {
  margin-bottom: 0;
}

.breadcrumb-container {
  gap: 15px;
}

.breadcrumb {
  background: transparent;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  
  + .breadcrumb-item::before {
    content: "/";
    padding: 0 8px;
    color: #6c757d;
  }
  
  a {
    color: $primary;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.3s ease;
    
    &:hover {
      color: color.adjust($primary, $lightness: -10%);
      text-decoration: none;
    }
    
    i {
      font-size: 0.875rem;
    }
  }
  
  &.active {
    color: #6c757d;
    font-weight: 500;
    
    i {
      color: $primary;
      margin-right: 6px;
    }
  }
}

// Business Analytics Navigation
.business-analytics-nav {
  .nav-pills {
    background: white;
    border-radius: 8px;
    padding: 4px;
    box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
    
    .nav-link {
      color: #6c757d;
      font-weight: 500;
      border-radius: 6px;
      margin: 0 2px;
      transition: all 0.3s ease;
      
      &:hover {
        color: $primary;
        background-color: rgba($primary, 0.1);
      }
      
      &.active {
        background-color: $primary;
        color: white;
        font-weight: 600;
      }
    }
  }
}

// Page Title
.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

// KPI Cards
.kpi-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
  border: none;
  height: 100%;
  
  .kpi-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    
    .kpi-title {
      font-size: 0.9rem;
      font-weight: 500;
      color: #6c757d;
      margin: 0;
    }
    
    .kpi-icons {
      display: flex;
      align-items: center;
    }
  }
  
  .kpi-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    line-height: 1;
  }
}

// Chart Cards
.chart-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
  border: none;
  height: 100%;
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    
    .chart-title {
      font-size: 1rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0;
    }
    
    .chart-controls {
      display: flex;
      align-items: center;
    }
  }
  
  .chart-period {
    display: flex;
    gap: 8px;
    margin-bottom: 15px;
    
    .period-btn {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      color: #6c757d;
      background: #f8f9fa;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &.active {
        background-color: $primary;
        color: white;
      }
      
      &:hover:not(.active) {
        background-color: #e9ecef;
      }
    }
  }
  
  .chart-wrapper {
    height: 300px;
    position: relative;
  }
}

// Placeholder content
.placeholder-content {
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
  
  p {
    color: #6c757d;
    font-size: 1.1rem;
    margin: 0;
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .business-analytics-nav {
    .nav-pills {
      flex-wrap: wrap;
      
      .nav-link {
        font-size: 0.8rem;
        padding: 8px 12px;
      }
    }
  }
  
  .kpi-card {
    .kpi-value {
      font-size: 2rem;
    }
  }
  
  .chart-card {
    .chart-wrapper {
      height: 250px;
    }
  }
}

// Bootstrap overrides
.card {
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
  background: white;
  position: relative;
  z-index: 1;
  margin-bottom: 1rem;
}

.b-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
  border: none;
  position: relative;
  z-index: 1;
}

/* Ensure proper spacing between rows */
.row {
  margin-left: -15px;
  margin-right: -15px;
}

.col, [class*="col-"] {
  padding-left: 15px;
  padding-right: 15px;
}

/* Fix for Bootstrap card margins */
.mb-3 {
  margin-bottom: 1rem !important;
}

.mb-4 {
  margin-bottom: 1.5rem !important;
}
</style>