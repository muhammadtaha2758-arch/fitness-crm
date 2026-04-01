<template>
    <div class="cash-register-page">
        <!-- Page Header -->
        <div class="page-header mb-4">
            <h2 class="page-title mb-0">Cash Register</h2>
        </div>

        <!-- Coming Soon Content -->
        <div class="coming-soon-content">
            <div class="card">
                <div class="card-body text-center py-5">
                    <i class="fas fa-cash-register fa-4x text-muted mb-4"></i>
                    <h4 class="text-muted mb-3">Cash Register Management</h4>
                    <p class="text-muted mb-4">
                        Manage your cash register operations, track daily sales, and monitor cash transactions.
                    </p>
                    <div class="feature-list">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="feature-item">
                                    <i class="fas fa-money-bill-wave text-primary mb-2"></i>
                                    <h6>Daily Cash Tracking</h6>
                                    <p class="text-muted small">Track daily cash inflows and outflows</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="feature-item">
                                    <i class="fas fa-receipt text-primary mb-2"></i>
                                    <h6>Transaction Logs</h6>
                                    <p class="text-muted small">Maintain detailed transaction records</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="feature-item">
                                    <i class="fas fa-balance-scale text-primary mb-2"></i>
                                    <h6>Cash Reconciliation</h6>
                                    <p class="text-muted small">Balance cash register with actual cash on hand</p>
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
    name: "CashRegister",
    metaInfo: {
        title: "Cash Register"
    }
}
</script>

<style scoped lang="scss">
@import "../../../../assets/styles/sass/_variables.scss";

.cash-register-page {
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
