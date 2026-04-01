<template>
    <div class="financial-page">
        <!-- Main Navigation Tabs -->
        <div class="financial-nav-tabs">
            <nav class="nav nav-tabs" role="tablist">
                <router-link
                    to="/app/Financial/Invoices"
                    class="nav-link"
                    :class="{ active: $route.path.includes('/Invoices') }"
                >
                    <i class="fas fa-file-invoice me-2"></i>
                    Invoices
                </router-link>
                <router-link
                    to="/app/Financial/Sales"
                    class="nav-link"
                    :class="{ active: $route.path.includes('/Sales') }"
                >
                    <i class="fas fa-chart-line me-2"></i>
                    Sales
                </router-link>
                <router-link
                    to="/app/Financial/Taxes"
                    class="nav-link"
                    :class="{ active: $route.path.includes('/Taxes') }"
                >
                    <i class="fas fa-receipt me-2"></i>
                    Taxes
                </router-link>
                <router-link
                    to="/app/Financial/CashFlow"
                    class="nav-link"
                    :class="{ active: $route.path.includes('/CashFlow') }"
                >
                    <i class="fas fa-exchange-alt me-2"></i>
                    Cash flow
                </router-link>
                <router-link
                    to="/app/Financial/CashRegister"
                    class="nav-link"
                    :class="{ active: $route.path.includes('/CashRegister') }"
                >
                    <i class="fas fa-cash-register me-2"></i>
                    Cash register
                </router-link>
            </nav>
        </div>

        <!-- Tab Content -->
        <div class="tab-content mt-4">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: "FinancialIndex",
    metaInfo: {
        title: "Financial"
    },
    data() {
        return {
            activeTab: 'invoices'
        }
    },
    methods: {
        setActiveTab(tab) {
            this.activeTab = tab;
        }
    }
}
</script>

<style scoped lang="scss">
@import "../../../../assets/styles/sass/_variables.scss";

.financial-page {
    padding: $padding-md;
    background-color: $color-background;
    min-height: 100vh;
}

.financial-nav-tabs {
    background: $color-white;
    border-radius: $border-radius-md;
    box-shadow: $box-shadow-sm;
    padding: 0;
    margin-bottom: $margin-md;
    
    .nav-tabs {
        border-bottom: none;
        margin: 0;
        
        .nav-link {
            border: none;
            border-radius: 0;
            padding: $padding-md $padding-lg;
            color: $color-text-dark;
            font-weight: $font-weight-medium;
            font-size: $font-size-sm;
            transition: all 0.3s ease;
            position: relative;
            
            &:hover {
                color: $primary;
                background-color: transparent;
                border-color: transparent;
            }
            
            &.active {
                color: $primary;
                background-color: transparent;
                border-color: transparent;
                
                &::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background-color: $primary;
                    border-radius: $border-radius-sm $border-radius-sm 0 0;
                }
            }
            
            i {
                font-size: $font-size-sm;
            }
        }
    }
}

.tab-content {
    background: $color-white;
    border-radius: $border-radius-md;
    box-shadow: $box-shadow-sm;
    min-height: 600px;
}

// Responsive design
@media (max-width: $breakpoint-md) {
    .financial-nav-tabs {
        .nav-tabs {
            flex-wrap: wrap;
            
            .nav-link {
                padding: $padding-sm $padding-md;
                font-size: $font-size-xs;
                
                i {
                    font-size: $font-size-xs;
                }
            }
        }
    }
}
</style>
