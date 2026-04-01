<template>
    <div class="sales-page">
        <!-- Page Header -->
        <div class="page-header mb-4">
            <h2 class="page-title mb-0">Sales (55)</h2>
        </div>

        <!-- Filters -->
        <div class="filters-row mb-4">
            <div class="row g-3">
                <div class="col-md-2">
                    <div class="dropdown">
                        <button class="btn btn-outline-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown">
                            Options
                        </button>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="dropdown">
                        <button class="btn btn-outline-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown">
                            This month (August)
                        </button>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="dropdown">
                        <button class="btn btn-outline-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown">
                            Invoice date
                        </button>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="dropdown">
                        <button class="btn btn-outline-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown">
                            Income Category
                        </button>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="dropdown">
                        <button class="btn btn-outline-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown">
                            Payment method
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Summary Section with Pie Chart -->
        <div class="summary-section mb-4">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <!-- Pie Chart -->
                        <div class="col-md-4">
                            <div class="pie-chart-container">
                                <canvas ref="pieChart" width="200" height="200"></canvas>
                            </div>
                        </div>
                        
                        <!-- Legend -->
                        <div class="col-md-3">
                            <div class="chart-legend">
                                <div class="legend-item">
                                    <div class="legend-color" style="background-color: #ff9800;"></div>
                                    <span>Personal training</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color" style="background-color: #4caf50;"></div>
                                    <span>Memberships</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color" style="background-color: #2e7d32;"></div>
                                    <span>Other</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color" style="background-color: #2196f3;"></div>
                                    <span>Retail</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color" style="background-color: #f44336;"></div>
                                    <span>Group training</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Data Table -->
                        <div class="col-md-5">
                            <div class="summary-table">
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Final</th>
                                            <th>Pro forma</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Personal training</td>
                                            <td>575.00</td>
                                            <td>0.00</td>
                                            <td>575.00</td>
                                        </tr>
                                        <tr>
                                            <td>Memberships</td>
                                            <td>1,840.00</td>
                                            <td>0.00</td>
                                            <td>1,840.00</td>
                                        </tr>
                                        <tr>
                                            <td>Other</td>
                                            <td>2,091.14</td>
                                            <td>0.00</td>
                                            <td>2,091.14</td>
                                        </tr>
                                        <tr>
                                            <td>Retail</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                        </tr>
                                        <tr>
                                            <td>Group training</td>
                                            <td>4,550.50</td>
                                            <td>250.00</td>
                                            <td>4,800.50</td>
                                        </tr>
                                        <tr class="table-active">
                                            <td><strong>Total</strong></td>
                                            <td><strong>9,056.64</strong></td>
                                            <td><strong>250.00</strong></td>
                                            <td><strong>9,306.64</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sales List Section -->
        <div class="sales-list-section">
            <div class="card">
                <div class="card-body">
                    <!-- Summary Line -->
                    <div class="summary-line mb-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <span class="text-muted">Total</span>
                                <span class="fw-bold ms-2">9,306.64</span>
                            </div>
                            <div>
                                <span class="text-muted">Selected: 0 / 0.00</span>
                            </div>
                        </div>
                    </div>

                    <!-- Sales Table -->
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" class="form-check-input">
                                    </th>
                                    <th class="sortable">
                                        No. <i class="fas fa-sort-down ms-1"></i>
                                    </th>
                                    <th class="sortable">
                                        Invoice date <i class="fas fa-sort-down ms-1"></i>
                                    </th>
                                    <th>First name</th>
                                    <th class="sortable">
                                        Last Name <i class="fas fa-sort-down ms-1"></i>
                                    </th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="sale in sales" :key="sale.id">
                                    <td>
                                        <input type="checkbox" class="form-check-input">
                                    </td>
                                    <td>
                                        <span class="invoice-number" :class="{ 'pro-forma': sale.isProForma }">
                                            {{ sale.number }}
                                        </span>
                                    </td>
                                    <td>{{ sale.date }}</td>
                                    <td>{{ sale.firstName }}</td>
                                    <td>{{ sale.lastName }}</td>
                                    <td>{{ sale.description }}</td>
                                    <td>{{ sale.price }}</td>
                                    <td>
                                        <span class="status-badge" :class="sale.statusClass">
                                            {{ sale.status }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Sales",
    data() {
        return {
            sales: [
                {
                    id: 1,
                    number: '(Pro forma)',
                    isProForma: true,
                    date: '08/21/2025',
                    firstName: 'Charles',
                    lastName: 'Fox',
                    description: 'Unlimited Discounted Small Group Classes',
                    price: '250.00',
                    status: '250.00 Outstanding',
                    statusClass: 'outstanding'
                },
                {
                    id: 2,
                    number: '4124',
                    isProForma: false,
                    date: '08/20/2025',
                    firstName: 'Kristopher',
                    lastName: 'Hampton',
                    description: 'Unlimited Small Group Training',
                    price: '300.00',
                    status: 'Paid',
                    statusClass: 'paid'
                },
                {
                    id: 3,
                    number: '4123',
                    isProForma: false,
                    date: '08/19/2025',
                    firstName: 'Jason',
                    lastName: 'Fischer',
                    description: 'Group Training (12)',
                    price: '250.00',
                    status: 'Paid',
                    statusClass: 'paid'
                }
            ]
        }
    },
    mounted() {
        this.drawPieChart();
    },
    methods: {
        drawPieChart() {
            const canvas = this.$refs.pieChart;
            const ctx = canvas.getContext('2d');
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 80;

            // Data for pie chart
            const data = [
                { label: 'Personal training', value: 575.00, color: '#ff9800' },
                { label: 'Memberships', value: 1840.00, color: '#4caf50' },
                { label: 'Other', value: 2091.14, color: '#2e7d32' },
                { label: 'Retail', value: 0.00, color: '#2196f3' },
                { label: 'Group training', value: 4800.50, color: '#f44336' }
            ];

            const total = data.reduce((sum, item) => sum + item.value, 0);
            let currentAngle = 0;

            data.forEach(item => {
                const sliceAngle = (item.value / total) * 2 * Math.PI;
                
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
                ctx.closePath();
                ctx.fillStyle = item.color;
                ctx.fill();
                
                currentAngle += sliceAngle;
            });
        }
    }
}
</script>

<style scoped lang="scss">
@import "../../../../assets/styles/sass/_variables.scss";

.sales-page {
    padding: $padding-lg;
}

.page-header {
    .page-title {
        font-size: $font-size-xxl;
        font-weight: $font-weight-bold;
        color: $color-heading;
    }
}

.filters-row {
    .btn-outline-secondary {
        border-color: $color-border;
        color: $color-text-dark;
        
        &:hover {
            color: $primary;
            border-color: $primary;
        }
    }
}

.summary-section {
    .card {
        border: none;
        box-shadow: $box-shadow-sm;
        border-radius: $border-radius-md;
    }
    
    .pie-chart-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
    }
    
    .chart-legend {
        .legend-item {
            display: flex;
            align-items: center;
            margin-bottom: $margin-sm;
            
            .legend-color {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                margin-right: $margin-sm;
            }
            
            span {
                font-size: $font-size-sm;
                color: $color-text-dark;
            }
        }
    }
    
    .summary-table {
        .table {
            th {
                border-top: none;
                border-bottom: 1px solid $color-border-muted;
                font-weight: $font-weight-semibold;
                color: $color-text-dark;
                font-size: $font-size-sm;
                padding: $padding-sm;
            }
            
            td {
                padding: $padding-sm;
                font-size: $font-size-sm;
                border-bottom: 1px solid $color-border-muted;
            }
            
            .table-active {
                background-color: rgba($primary, 0.1);
                
                td {
                    font-weight: $font-weight-semibold;
                }
            }
        }
    }
}

.sales-list-section {
    .card {
        border: none;
        box-shadow: $box-shadow-sm;
        border-radius: $border-radius-md;
    }
    
    .summary-line {
        padding-bottom: $padding-sm;
        border-bottom: 1px solid $color-border-muted;
    }
    
    .table {
        th {
            border-top: none;
            border-bottom: 2px solid $color-border-muted;
            font-weight: $font-weight-semibold;
            color: $color-text-dark;
            padding: $padding-md;
            
            &.sortable {
                cursor: pointer;
                user-select: none;
                
                &:hover {
                    color: $primary;
                }
            }
        }
        
        td {
            padding: $padding-md;
            vertical-align: middle;
            border-bottom: 1px solid $color-border-muted;
        }
        
        tbody tr:hover {
            background-color: rgba($primary, 0.05);
        }
    }
    
    .invoice-number {
        color: $primary;
        font-weight: $font-weight-medium;
        
        &.pro-forma {
            font-style: italic;
        }
    }
    
    .status-badge {
        padding: $padding-xxs $padding-xs;
        border-radius: $border-radius-sm;
        font-size: $font-size-xs;
        font-weight: $font-weight-medium;
        
        &.paid {
            background-color: $color-success-light;
            color: $color-success;
        }
        
        &.outstanding {
            background-color: $color-warning-light;
            color: $color-warning;
        }
    }
}

// Responsive design
@media (max-width: $breakpoint-md) {
    .summary-section {
        .row {
            flex-direction: column;
            
            .col-md-4,
            .col-md-3,
            .col-md-5 {
                margin-bottom: $margin-md;
            }
        }
    }
    
    .filters-row {
        .row {
            .col-md-2 {
                margin-bottom: $margin-sm;
            }
        }
    }
}
</style>
