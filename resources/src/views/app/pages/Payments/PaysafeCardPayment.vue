<template>
  <div class="main-content">
    <breadcumb :page="'PaysafeCard Payment'" :folder="'Payments'"/>
    
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">
              <i class="fas fa-credit-card text-success me-2"></i>
              PaysafeCard Payment
            </h4>
          </div>
          <div class="card-body">
            <div v-if="isLoading" class="text-center py-4">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <p class="mt-2">Processing payment...</p>
            </div>

            <div v-else-if="paymentCreated" class="text-center py-4">
              <div class="alert alert-success">
                <i class="fas fa-check-circle fa-2x mb-3"></i>
                <h5>Payment Created Successfully!</h5>
                <p>You will be redirected to PaysafeCard to complete your payment.</p>
                <button @click="redirectToPayment" class="btn btn-success btn-lg">
                  <i class="fas fa-external-link-alt me-2"></i>
                  Continue to PaysafeCard
                </button>
              </div>
            </div>

            <div v-else>
              <form @submit.prevent="createPayment">
                <div class="row">
                  <!-- Customer Selection -->
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Customer *</label>
                    <select 
                      v-model="paymentData.customer_id" 
                      class="form-control"
                      :class="{ 'is-invalid': errors.customer_id }"
                      required
                    >
                      <option value="">Select Customer</option>
                      <option 
                        v-for="customer in customers" 
                        :key="customer.id" 
                        :value="customer.id"
                      >
                        {{ customer.firstname }} {{ customer.lastname }} ({{ customer.email }})
                      </option>
                    </select>
                    <div v-if="errors.customer_id" class="invalid-feedback">
                      {{ errors.customer_id }}
                    </div>
                  </div>

                  <!-- Amount -->
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Amount *</label>
                    <div class="input-group">
                      <input 
                        type="number" 
                        v-model="paymentData.amount" 
                        class="form-control"
                        :class="{ 'is-invalid': errors.amount }"
                        step="0.01" 
                        min="0.01"
                        placeholder="0.00"
                        required
                      >
                      <select 
                        v-model="paymentData.currency" 
                        class="form-select"
                        :class="{ 'is-invalid': errors.currency }"
                        style="max-width: 100px;"
                      >
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                        <option value="CHF">CHF</option>
                        <option value="PLN">PLN</option>
                        <option value="CZK">CZK</option>
                        <option value="HUF">HUF</option>
                        <option value="RON">RON</option>
                        <option value="BGN">BGN</option>
                        <option value="HRK">HRK</option>
                      </select>
                    </div>
                    <div v-if="errors.amount" class="invalid-feedback">
                      {{ errors.amount }}
                    </div>
                  </div>

                  <!-- Description -->
                  <div class="col-12 mb-3">
                    <label class="form-label">Description</label>
                    <textarea 
                      v-model="paymentData.description" 
                      class="form-control"
                      :class="{ 'is-invalid': errors.description }"
                      rows="3"
                      placeholder="Payment description (optional)"
                    ></textarea>
                    <div v-if="errors.description" class="invalid-feedback">
                      {{ errors.description }}
                    </div>
                  </div>

                  <!-- Payment Summary -->
                  <div class="col-12 mb-4">
                    <div class="card bg-light">
                      <div class="card-body">
                        <h6 class="card-title">Payment Summary</h6>
                        <div class="row">
                          <div class="col-md-6">
                            <p><strong>Amount:</strong> {{ formatCurrency(paymentData.amount, paymentData.currency) }}</p>
                          </div>
                          <div class="col-md-6">
                            <p><strong>Payment Method:</strong> PaysafeCard</p>
                          </div>
                        </div>
                        <div v-if="paymentData.description" class="mt-2">
                          <p><strong>Description:</strong> {{ paymentData.description }}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Submit Button -->
                  <div class="col-12 text-center">
                    <button 
                      type="submit" 
                      class="btn btn-success btn-lg"
                      :disabled="isSubmitting"
                    >
                      <i v-if="isSubmitting" class="fas fa-spinner fa-spin me-2"></i>
                      <i v-else class="fas fa-credit-card me-2"></i>
                      {{ isSubmitting ? 'Creating Payment...' : 'Create PaysafeCard Payment' }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PaysafeCardPayment',
  metaInfo: {
    title: 'PaysafeCard Payment'
  },
  data() {
    return {
      isLoading: false,
      isSubmitting: false,
      paymentCreated: false,
      customers: [],
      paymentData: {
        customer_id: '',
        amount: '',
        currency: 'EUR',
        description: ''
      },
      errors: {},
      redirectUrl: null
    };
  },
  methods: {
    async loadCustomers() {
      try {
        const response = await axios.get('/clients');
        if (response.data.success) {
          this.customers = response.data.data;
        }
      } catch (error) {
        console.error('Error loading customers:', error);
        this.$swal({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load customers'
        });
      }
    },

    async createPayment() {
      this.isSubmitting = true;
      this.errors = {};

      try {
        const response = await axios.post('/paysafecard/create-payment', this.paymentData);
        
        if (response.data.success) {
          this.redirectUrl = response.data.redirect_url;
          this.paymentCreated = true;
          
          this.$swal({
            icon: 'success',
            title: 'Payment Created',
            text: 'Payment has been created successfully. You will be redirected to PaysafeCard.',
            timer: 3000,
            showConfirmButton: false
          });
        } else {
          this.$swal({
            icon: 'error',
            title: 'Error',
            text: response.data.message || 'Failed to create payment'
          });
        }
      } catch (error) {
        console.error('Error creating payment:', error);
        
        if (error.response && error.response.data && error.response.data.errors) {
          this.errors = error.response.data.errors;
        }
        
        this.$swal({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to create payment'
        });
      } finally {
        this.isSubmitting = false;
      }
    },

    redirectToPayment() {
      if (this.redirectUrl) {
        window.open(this.redirectUrl, '_blank');
      }
    },

    formatCurrency(amount, currency) {
      if (!amount) return '0.00';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
      }).format(amount);
    }
  },
  mounted() {
    this.loadCustomers();
  }
};
</script>

<style scoped>
.card {
  border: none;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.card-header {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  border: none;
}

.form-control:focus,
.form-select:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}

.btn-success {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  border: none;
  transition: all 0.3s ease;
}

.btn-success:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
}

.alert-success {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  border: 1px solid #c3e6cb;
  color: #155724;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style> 