<template>
    <div class="cash-flow-page">
        <!-- Page Header -->
        <div class="page-header mb-4">
            <h2 class="page-title mb-0">Cash Flow</h2>
        </div>

        <!-- Coming Soon Content -->
        <div class="coming-soon-content">
            <div class="card">
                <div class="card-body text-center py-5">
                    <i class="fas fa-exchange-alt fa-4x text-muted mb-4"></i>
                    <h4 class="text-muted mb-3">Cash Flow Management</h4>
                    <p class="text-muted mb-4">
                        Track your cash flow, monitor income and expenses, and analyze financial trends.
                    </p>
                    <div class="feature-list">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="feature-item">
                                    <i class="fas fa-chart-line text-primary mb-2"></i>
                                    <h6>Cash Flow Analysis</h6>
                                    <p class="text-muted small">Visualize cash flow trends and patterns</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="feature-item">
                                    <i class="fas fa-calendar-alt text-primary mb-2"></i>
                                    <h6>Period Reports</h6>
                                    <p class="text-muted small">Generate monthly and yearly cash flow reports</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="feature-item">
                                    <i class="fas fa-predictions text-primary mb-2"></i>
                                    <h6>Forecasting</h6>
                                    <p class="text-muted small">Predict future cash flow based on historical data</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <span class="badge bg-warning">Coming Soon</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CashFlow",
    metaInfo: {
        title: "Cash Flow"
    }
}
</script>

<style scoped lang="scss">
@import "../../../../assets/styles/sass/_variables.scss";

.cash-flow-page {
    padding: $padding-lg;
}

.page-header {
    .page-title {
        font-size: $font-size-xxl;
        font-weight: $font-weight-bold;
        color: $color-heading;
    }
}

.coming-soon-content {
    .card {
        border: none;
        box-shadow: $box-shadow-sm;
        border-radius: $border-radius-md;
        background-color: $color-white;
    }
    
    .feature-list {
        .feature-item {
            padding: $padding-md;
            
            i {
                font-size: $font-size-xl;
            }
            
            h6 {
                font-weight: $font-weight-semibold;
                color: $color-heading;
                margin-bottom: $margin-xs;
            }
        }
    }
}

// Responsive design
@media (max-width: $breakpoint-md) {
    .feature-list {
        .row {
            .col-md-4 {
                margin-bottom: $margin-md;
            }
        }
    }
}
</style>
