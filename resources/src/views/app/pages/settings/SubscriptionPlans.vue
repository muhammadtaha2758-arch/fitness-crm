<template>
  <div class="container py-5">
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
              style="color: #252525;"
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
              <li class="breadcrumb-item">
                <router-link to="/app/settings">
                  <i class="fas fa-cogs"></i>
                  Settings
                </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                <i class="fas fa-credit-card"></i>
                Subscription Plans
              </li>
            </ol>
          </div>
        </nav>
      </div>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold">Manage Subscription Plans</h2>
      <button class="btn btn-primary" @click="addNewPlan" :disabled="loading">+ Add New Plan</button>
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="alert alert-success" role="alert">
      {{ successMessage }}
    </div>

    <div class="row g-4" v-if="!loading">
      <div class="col-md-4 mb-4" v-for="(plan, index) in plans" :key="plan.id || index">
        <div class="card pricing-card p-3 h-100">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <input 
              v-model="plan.name" 
              class="form-control form-control-sm w-75" 
              :disabled="plan.saving"
              placeholder="Plan Name"
            />
            <label class="checkbox checkbox-outline-primary">
              <input
                type="checkbox"
                v-model="plan.is_active"
                :disabled="plan.saving"
              />
              <span class="features-list">Active</span>
              <span class="checkmark"></span>
            </label>
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Price</label>
            <input 
              type="number" 
              v-model.number="plan.price" 
              class="form-control form-control-sm" 
              :disabled="plan.saving"
              min="0"
              step="0.01"
            />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Interval</label>
            <select 
              v-model="plan.interval" 
              class="form-control form-control-sm" 
              :disabled="plan.saving"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Stripe Price ID (Optional)</label>
            <input 
              type="text" 
              v-model="plan.stripe_price_id" 
              class="form-control form-control-sm" 
              :disabled="plan.saving"
              placeholder="price_xxxxx"
            />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Sort Order</label>
            <input 
              type="number" 
              v-model.number="plan.sort_order" 
              class="form-control form-control-sm" 
              :disabled="plan.saving"
              min="0"
            />
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Included Features</label>
            <div v-for="(feature, i) in featureList" :key="i">
              <label class="checkbox checkbox-outline-primary">
                <input
                  type="checkbox"
                  :value="feature"
                  v-model="plan.features"
                  :disabled="plan.saving"
                />
                <span class="features-list">{{ feature }}</span>
                <span class="checkmark"></span>
              </label>
            </div>
          </div>

          <div class="d-flex justify-content-between">
            <button 
              class="btn btn-outline-danger btn-sm" 
              @click="deletePlan(plan)" 
              :disabled="plan.saving || plan.deleting"
            >
              <span v-if="plan.deleting" class="spinner-border spinner-border-sm me-1"></span>
              {{ plan.deleting ? 'Deleting...' : 'Delete' }}
            </button>
            <button 
              class="btn btn-outline-success btn-sm" 
              @click="savePlan(plan)"
              :disabled="plan.saving"
            >
              <span v-if="plan.saving" class="spinner-border spinner-border-sm me-1"></span>
              {{ plan.saving ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AdminPlanManager",
  data() {
    return {
      loading: false,
      error: null,
      successMessage: null,
      featureList: [],
      plans: []
    };
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    async loadData() {
      this.loading = true;
      this.error = null;
      
      try {
        // Load features and plans in parallel
        const [featuresResponse, plansResponse] = await Promise.all([
          axios.get('/plans/features/list'),
          axios.get('/plans')
        ]);

        if (featuresResponse.data.success) {
          this.featureList = featuresResponse.data.data;
        }

        if (plansResponse.data.success) {
          this.plans = plansResponse.data.data.map(plan => ({
            ...plan,
            features: plan.features || [],
            saving: false,
            deleting: false
          }));
        }
      } catch (error) {
        console.error('Error loading data:', error);
        this.error = 'Failed to load subscription plans. Please try again.';
      } finally {
        this.loading = false;
      }
    },

    addNewPlan() {
      this.plans.unshift({
        id: null,
        name: "New Plan",
        price: 0,
        interval: "monthly",
        stripe_price_id: "",
        features: [],
        is_active: true,
        sort_order: 0,
        saving: false,
        deleting: false
      });
    },

    async deletePlan(plan) {
      if (!confirm("Are you sure you want to delete this plan?")) {
        return;
      }

      // If it's a new plan that hasn't been saved yet
      if (!plan.id) {
        const index = this.plans.findIndex(p => p === plan);
        if (index > -1) {
          this.plans.splice(index, 1);
        }
        return;
      }

      plan.deleting = true;
      
      try {
        const response = await axios.delete(`/plans/${plan.id}`);
        
        if (response.data.success) {
          const index = this.plans.findIndex(p => p.id === plan.id);
          if (index > -1) {
            this.plans.splice(index, 1);
          }
          this.showSuccess('Plan deleted successfully');
        } else {
          this.error = response.data.message || 'Failed to delete plan';
        }
      } catch (error) {
        console.error('Error deleting plan:', error);
        this.error = 'Failed to delete plan. Please try again.';
      } finally {
        plan.deleting = false;
      }
    },

    async savePlan(plan) {
      plan.saving = true;
      this.error = null;
      
      try {
        let response;
        
        if (plan.id) {
          // Update existing plan
          response = await axios.put(`/plans/${plan.id}`, {
            name: plan.name,
            price: plan.price,
            interval: plan.interval,
            stripe_price_id: plan.stripe_price_id || '',
            features: plan.features || [],
            is_active: plan.is_active,
            sort_order: plan.sort_order || 0
          });
        } else {
          // Create new plan
          response = await axios.post('/plans', {
            name: plan.name,
            price: plan.price,
            interval: plan.interval,
            stripe_price_id: plan.stripe_price_id || '',
            features: plan.features || [],
            is_active: plan.is_active,
            sort_order: plan.sort_order || 0
          });
        }
        
        if (response.data.success) {
          // Update the plan with the response data
          Object.assign(plan, {
            ...response.data.data,
            features: response.data.data.features || [],
            saving: false,
            deleting: false
          });
          
          this.showSuccess(plan.id ? 'Plan updated successfully' : 'Plan created successfully');
        } else {
          this.error = response.data.message || 'Failed to save plan';
        }
      } catch (error) {
        console.error('Error saving plan:', error);
        if (error.response && error.response.data && error.response.data.errors) {
          const errors = Object.values(error.response.data.errors).flat();
          this.error = errors.join(', ');
        } else {
          this.error = error.response?.data?.message || 'Failed to save plan. Please try again.';
        }
      } finally {
        plan.saving = false;
      }
    },

    showSuccess(message) {
      this.successMessage = message;
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
    }
  }
};
</script>

<style> 

/* Breadcrumb Navigation Styles */
.breadcrumb-nav-row {
  margin-bottom: 1.5rem;
}

.breadcrumb-section {
  width: 100%;
}

.breadcrumb-nav {
  background: transparent;
  padding: 0;
  margin: 0;
}

.breadcrumb-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.back-button {
  background: linear-gradient(to bottom, #23415a, #0f1c29);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(35, 65, 90, 0.3);
}

.back-button:hover {
  background: linear-gradient(to bottom, #1a2f47, #0a141f);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(35, 65, 90, 0.4);
}

.back-button:active {
  transform: translateY(0);
}

.breadcrumb {
  background: transparent;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  list-style: none;
  flex-wrap: wrap;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 500;
}

.breadcrumb-item:not(:last-child)::after {
  content: '/';
  margin: 0 0.5rem;
  color: #6c757d;
  font-weight: 400;
}

.breadcrumb-item a {
  color: #6c757d;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
}

.breadcrumb-item a:hover {
  color: #23415a;
  background-color: rgba(35, 65, 90, 0.1);
}

.breadcrumb-item.active {
  color: #23415a;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: rgba(35, 65, 90, 0.1);
  border-radius: 0.375rem;
}

.breadcrumb-item i {
  font-size: 0.8rem;
  opacity: 0.8;
}

/* Card Styling */
.pricing-card {
  border: none;
  border-radius: 1rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  background-color: #ffffff;
  position: relative;
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

/* Inputs */
input.form-control,
input[type="number"] {
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #ced4da;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

input.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.15rem rgba(13, 110, 253, 0.25);
}

/* Labels */
.form-label {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #252525;
}

/* Checkbox */
.form-check-input {
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.form-check-label {
  font-size: 0.85rem;
  margin-left: 0.3rem;
  color: #252525;
}

/* Feature Checkboxes */
.form-check {
  margin-bottom: 0.35rem;
}

/* Buttons */
.btn-outline-danger,
.btn-outline-success {
  font-size: 0.85rem;
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  font-weight: 600;
}
.btn-outline-danger{
  background-color: #ff4040;
  color: white;
}
.btn-outline-success{
  background-color: #42aa7a;
  color: white;
}

.btn-outline-danger:hover {
  border-color: #f5c2c7;
}

.btn-outline-success:hover {
  border-color: #badbcc;
  background-color: none !important;
}

/* Add New Plan Button */
.btn-primary {
  padding: 0.55rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
}

/* Title */
h2.fw-bold {
  font-size: 1.8rem;
  color: #252525;
}
.features-list{
  color: #252525;
}
.checkbox{
  margin-top: 10px;
}

</style>