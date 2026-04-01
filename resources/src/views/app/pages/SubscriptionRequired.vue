<template>
  <div class="subscription-required-wrap">
    <b-row>
      <b-col>
        <div class="subscription-required-card text-center">
          <div class="icon-wrap mb-3">
            <i class="fas fa-exclamation-triangle text-warning"></i>
          </div>
          <h1 class="text-primary mb-2">Subscription Required</h1>
          <p class="lead text-muted mb-3">
            Your gym subscription has ended or is inactive.
          </p>
          <p class="text-muted mb-4">
            You need an active subscription to use the system. Please resubscribe to continue
            managing your gym, members, and services.
          </p>
          <div v-if="statusMessage" class="alert alert-info text-left mb-4">
            {{ statusMessage }}
          </div>
          <div v-if="subscriptionDetails" class="subscription-details text-left mb-4 p-3 bg-light rounded">
            <p class="mb-1"><strong>Gym:</strong> {{ subscriptionDetails.gym_name || '—' }}</p>
            <p class="mb-1"><strong>Status:</strong> {{ subscriptionDetails.status || 'Inactive' }}</p>
            <p v-if="subscriptionDetails.plan_name" class="mb-1">
              <strong>Plan:</strong> {{ subscriptionDetails.plan_name }}
            </p>
            <p v-if="subscriptionDetails.next_billing_date" class="mb-0">
              <strong>Next billing:</strong> {{ subscriptionDetails.next_billing_date }}
            </p>
          </div>
          <div class="actions">
            <router-link
              :to="{ name: 'SystemSettings', query: { section: 'billing' } }"
              class="btn btn-lg btn-primary btn-rounded mr-2"
            >
              <i class="fas fa-credit-card mr-2"></i>
              Go to Billing &amp; Resubscribe
            </router-link>
            <button type="button" class="btn btn-lg btn-outline-secondary btn-rounded" @click="refreshStatus">
              <i class="fas fa-sync-alt mr-2"></i>
              Refresh status
            </button>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionRequired',
  data() {
    return {
      statusMessage: '',
      subscriptionDetails: null,
    };
  },
  metaInfo: {
    title: 'Subscription Required',
  },
  created() {
    this.loadStatus();
  },
  methods: {
    async loadStatus() {
      try {
        const { data } = await window.axios.get('subscription/status');
        if (data.success && data.message) {
          this.statusMessage = data.message;
        }
        if (data.success && (data.subscription || data.gym_name)) {
          this.subscriptionDetails = {
            gym_name: data.gym_name,
            status: data.subscription ? data.subscription.status : 'none',
            plan_name: data.subscription ? data.subscription.plan_name : null,
            next_billing_date: data.subscription ? data.subscription.next_billing_date : null,
          };
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          this.statusMessage = err.response.data.message;
        } else {
          this.statusMessage = 'Unable to load subscription details.';
        }
      }
    },
    async refreshStatus() {
      await this.loadStatus();
      if (this.subscriptionDetails && this.subscriptionDetails.status === 'active') {
        this.$router.replace({ name: 'dashboard' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/sass/_variables.scss";

.subscription-required-wrap {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $padding-lg;
}

.subscription-required-card {
  max-width: 560px;
  margin: 0 auto;
}

.icon-wrap {
  font-size: 4rem;
}

.subscription-details {
  font-size: $font-size-sm;
}
</style>
