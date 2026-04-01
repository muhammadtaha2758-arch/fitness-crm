<template>
    <div class="taxes-page">
        <!-- Page Header -->
        <div class="page-header mb-4">
            <h2 class="page-title mb-0">Taxes</h2>
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
                            Taxes
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Summary Card -->
        <div class="summary-card mb-4">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <div class="summary-text">
                                <span class="text-muted">Not enough data available.</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="summary-total text-end">
                                <div class="total-label text-muted">Total</div>
                                <div class="total-value">0.00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Table Summary Bar -->
        <div class="table-summary mb-3">
            <div class="row">
                <div class="col-md-6">
                    <div class="summary-left">
                        <span class="text-muted">Total</span>
                        <span class="text-muted ms-3">Selected: 0/0.00</span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="summary-right text-end">
                        <span class="summary-amount">9,306.64</span>
                        <span class="summary-tax ms-3">0.00</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Taxes Table -->
        <div class="taxes-table">
            <div class="card">
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover mb-0">
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
                                    <th>Sales Tax</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="tax in taxes" :key="tax.id">
                                    <td>
                                        <input type="checkbox" class="form-check-input">
                                    </td>
                                    <td>
                                        <span class="invoice-number" :class="{ 'pro-forma': tax.isProForma }">
                                            {{ tax.number }}
                                        </span>
                                    </td>
                                    <td>{{ tax.date }}</td>
                                    <td>{{ tax.firstName }}</td>
                                    <td>{{ tax.lastName }}</td>
                                    <td>{{ tax.description }}</td>
                                    <td>{{ tax.price }}</td>
                                    <td>{{ tax.salesTax }}</td>
                                    <td>
                                        <span class="status-badge" :class="tax.statusClass">
                                            {{ tax.status }}
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
    name: "Taxes",
    data() {
        return {
            taxes: [
                {
                    id: 1,
                    number: '(Pro forma)',
                    isProForma: true,
                    date: '08/21/2025',
                    firstName: 'Charles',
                    lastName: 'Fox',
                    description: 'Unlimited Discounte...',
                    price: '250.00',
                    salesTax: '',
                    status: '250.00 Outstanding',
                    statusClass: 'outstanding'
                },
                {
                    id: 2,
                    number: '4125',
                    isProForma: false,
                    date: '08/20/2025',
                    firstName: 'Monica',
                    lastName: 'Morgan',
                    description: 'General Nutrition',
                    price: '250.00',
                    salesTax: '',
                    status: 'Paid',
                    statusClass: 'paid'
                },
                {
                    id: 3,
                    number: '4124',
                    isProForma: false,
                    date: '08/20/2025',
                    firstName: 'Kristopher',
                    lastName: 'Hampton',
                    description: 'Unlimited Small Gro...',
                    price: '300.00',
                    salesTax: '',
                    status: 'Paid',
                    statusClass: 'paid'
                },
                {
                    id: 4,
                    number: '4123',
                    isProForma: false,
                    date: '08/19/2025',
                    firstName: 'Jason',
                    lastName: 'Fischer',
                    description: 'Group Training (12)',
                    price: '250.00',
                    salesTax: '',
                    status: 'Paid',
                    statusClass: 'paid'
                },
                {
                    id: 5,
                    number: '4122',
                    isProForma: false,
                    date: '08/19/2025',
                    firstName: 'Donnie',
                    lastName: 'McVicker',
                    description: 'Small Group Training (8)',
                    price: '175.00',
                    salesTax: '',
                    status: 'Paid',
                    statusClass: 'paid'
                },
                {
                    id: 6,
                    number: '4121',
                    isProForma: false,
                    date: '08/17/2025',
                    firstName: 'Shundreyous',
                    lastName: 'Smith',
                    description: '$10 Open Gym Membership',
                    price: '10.00',
                    salesTax: '',
                    status: 'Paid',
                    statusClass: 'paid'
                },
                {
                    id: 7,
                    number: '4120',
                    isProForma: false,
                    date: '08/17/2025',
                    firstName: 'Timothy',
                    lastName: 'Boykin',
                    description: 'Custom discount',
                    price: '-10.00',
                    salesTax: '',
                    status: 'Paid',
                    statusClass: 'paid'
                },
                {
                    id: 8,
                    number: '4119',
                    isProForma: false,
                    date: '08/16/2025',
                    firstName: 'Paul',
                    lastName: 'Steffen',
                    description: 'Meal Plan',
                    price: '150.00',
                    salesTax: '',
                    status: 'Paid',
                    statusClass: 'paid'
                },
                {
                    id: 9,
                    number: '4118',
                    isProForma: false,
                    date: '08/16/2025',
                    firstName: 'Sharonda',
                    lastName: 'Burton',
                    description: 'Unlimited Small Group Training',
                    price: '300.00',
                    salesTax: '',
                    status: 'Paid',
                    statusClass: 'paid'
                }
            ]
        }
    }
}
</script>

<style scoped lang="scss">
@import "../../../../assets/styles/sass/_variables.scss";

.taxes-page {
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

.summary-card {
    .card {
        border: none;
        box-shadow: $box-shadow-sm;
        border-radius: $border-radius-md;
        background-color: $color-background;
    }
    
    .summary-text {
        font-size: $font-size-sm;
        color: $color-muted;
    }
    
    .summary-total {
        .total-label {
            font-size: $font-size-sm;
        }
        
        .total-value {
            font-size: $font-size-lg;
            font-weight: $font-weight-bold;
            color: $color-heading;
        }
    }
}

.table-summary {
    .summary-left {
        display: flex;
        align-items: center;
    }
    
    .summary-right {
        .summary-amount,
        .summary-tax {
            font-size: $font-size-md;
            font-weight: $font-weight-semibold;
            color: $color-text-dark;
        }
    }
}

.taxes-table {
    .card {
        border: none;
        box-shadow: $box-shadow-sm;
        border-radius: $border-radius-md;
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
    .table-summary {
        .summary-right {
            text-align: left !important;
            margin-top: $margin-sm;
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
