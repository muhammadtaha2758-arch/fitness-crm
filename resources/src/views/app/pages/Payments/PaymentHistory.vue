<template>
    <div class="payment-history-container">
        <!-- Breadcrumb and Navigation Row -->
        <div class="breadcrumb-nav-row">
            <!-- Breadcrumb Navigation -->
            <div class="breadcrumb-section">
                <nav class="breadcrumb-nav" aria-label="breadcrumb">
                    <div class="breadcrumb-container">
                        <button 
                            @click.stop="goBack" 
                            class="back-button"
                            type="button"
                            title="Go back"
                        >
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link to="/app/Members/ViewAllMembers">
                                    <i class="fas fa-home"></i>
                                    Dashboard
                                </router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                <i class="fas fa-credit-card"></i>
                                Payment History
                            </li>
                        </ol>
                    </div>
                </nav>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h4>Payment History</h4>
            </div>
            <div class="card-body">
                <p>Payment history functionality will be implemented here.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PaymentHistory",
    data() {
        return {};
    },
    methods: {
        goBack() {
            // Check if there's a previous page in history
            if (window.history.length > 1) {
                this.$router.go(-1);
            } else {
                // Default fallback to members page
                this.$router.push({ name: 'ViewAllMembers' });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/sass/_variables.scss";

.payment-history-container {
    padding: 20px;
}
</style> 