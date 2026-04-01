<template>
  <div class="main-content">
    <div class="page-header">
      <h1>{{ isEditMode ? 'Edit Membership Plan' : 'Create Membership Plan' }}</h1>
      <button type="button" class="btn-back" @click="$router.push('/app/Settings/system_settings')">
        <i class="fas fa-arrow-left"></i> Back to Settings
      </button>
    </div>

    <div class="membership-form-page">
      <validation-observer ref="membershipForm">
        <form @submit.prevent="handleCreateMembership">
          <div class="membership-form-sections">
            <!-- Section 1: Membership Information -->
            <div class="form-section-card">
              <h3 class="section-title">
                
                Membership Information
              </h3>
              <div class="form-fields">
                <!-- Membership Name -->
                <div class="form-field">
                  <label class="field-label">
                    Membership Name <span class="required">*</span>
                    <i class="fas fa-info-circle info-icon" title="Enter the name of the membership plan"></i>
                  </label>
                  <validation-provider
                    name="Membership Name"
                    rules="required"
                    v-slot="validationContext"
                  >
                    <input
                      type="text"
                      :class="['field-input', { 'is-invalid': validationContext.errors.length > 0 }]"
                      v-model="membershipForm.name"
                      placeholder="e.g., Basic Plan, Premium Plan"
                      required
                    />
                    <div v-if="validationContext.errors.length > 0" class="invalid-feedback">
                      {{ validationContext.errors[0] }}
                    </div>
                  </validation-provider>
                </div>

                <!-- Membership Description -->
                <div class="form-field">
                  <label class="field-label">
                    Membership Description
                    <i class="fas fa-info-circle info-icon" title="Describe what this membership includes"></i>
                  </label>
                  <textarea
                    class="field-input field-textarea"
                    rows="3"
                    v-model="membershipForm.description"
                    placeholder="Enter membership description"
                  ></textarea>
                </div>

                <!-- Webshop Image -->
                <div class="form-field">
                  <label class="field-label">
                    Webshop Image (optional)
                    <i class="fas fa-info-circle info-icon" title="Upload an image for the webshop"></i>
                  </label>
                  <div class="image-upload-wrapper">
                    <div class="image-preview" v-if="membershipForm.webshop_image">
                      <img :src="membershipForm.webshop_image" alt="Preview" />
                      <button type="button" class="remove-image-btn" @click="membershipForm.webshop_image = ''">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                    <div class="image-placeholder" v-else>
                      <i class="fas fa-image"></i>
                      <p>No image selected</p>
                    </div>
                    <input
                      type="file"
                      ref="webshopImageInput"
                      accept="image/*"
                      @change="handleWebshopImageUpload"
                      style="display: none"
                    />
                    <button
                      type="button"
                      class="change-image-btn"
                      @click="$refs.webshopImageInput.click()"
                    >
                      Change
                    </button>
                  </div>
                </div>

                <!-- Group -->
                <div class="form-field">
                  <label class="field-label">
                    Group
                    <i class="fas fa-info-circle info-icon" title="Select the membership group"></i>
                  </label>
                  <select class="field-input field-select" v-model="membershipForm.group">
                    <option value="">Select a group</option>
                    <option v-for="group in membershipGroups" :key="group.id" :value="group.name">
                      {{ group.name }}
                    </option>
                  </select>
                </div>

                <!-- Specific Terms & Conditions -->
                <div class="form-field">
                  <label class="field-label">
                    Specific terms & conditions
                    <i class="fas fa-info-circle info-icon" title="Select terms and conditions"></i>
                  </label>
                  <select class="field-input field-select" v-model="membershipForm.terms_conditions">
                    <option value="general">Only General Terms</option>
                    <option value="custom">Custom Terms</option>
                  </select>
                </div>

                <!-- Start Date -->
                <div class="form-field">
                  <label class="field-label">
                    Start date
                    <i class="fas fa-info-circle info-icon" title="When can members start this membership"></i>
                  </label>
                  <div class="radio-group">
                    <label class="radio-label">
                      <input
                        type="radio"
                        name="start_date_type"
                        value="any"
                        v-model="membershipForm.start_date_type"
                      />
                      <span class="radio-text">Any start date</span>
                    </label>
                    <label class="radio-label">
                      <input
                        type="radio"
                        name="start_date_type"
                        value="between"
                        v-model="membershipForm.start_date_type"
                      />
                      <span class="radio-text">Start date between</span>
                    </label>
                  </div>
                  <div v-if="membershipForm.start_date_type === 'between'" class="date-range-inputs">
                    <input type="date" class="field-input" v-model="membershipForm.start_date_from" />
                    <span class="date-separator">to</span>
                    <input type="date" class="field-input" v-model="membershipForm.start_date_to" />
                  </div>
                </div>

                <!-- Status -->
                <div class="form-field">
                  <label class="field-label">
                    Status
                    <i class="fas fa-info-circle info-icon" title="Membership status"></i>
                  </label>
                  <div class="radio-group">
                    <label class="radio-label">
                      <input
                        type="radio"
                        name="status_type"
                        value="active"
                        v-model="membershipForm.status_type"
                      />
                      <span class="radio-text">Active</span>
                    </label>
                    <label class="radio-label">
                      <input
                        type="radio"
                        name="status_type"
                        value="active_between"
                        v-model="membershipForm.status_type"
                      />
                      <span class="radio-text">Active between</span>
                    </label>
                  </div>
                  <div v-if="membershipForm.status_type === 'active_between'" class="date-range-inputs">
                    <input type="date" class="field-input" v-model="membershipForm.status_from" />
                    <span class="date-separator">to</span>
                    <input type="date" class="field-input" v-model="membershipForm.status_to" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 2: Membership Scope -->
            <div class="form-section-card">
              <h3 class="section-title">
               
                Membership Scope
              </h3>
              <div class="form-fields">
                <!-- Access Times -->
                <div class="form-field">
                  <label class="field-label">
                    Access times
                    <i class="fas fa-info-circle info-icon" title="Restrict access times for this membership"></i>
                  </label>
                  <div class="radio-group">
                    <label class="radio-label">
                      <input
                        type="radio"
                        name="access_times"
                        value="no_restriction"
                        v-model="membershipForm.access_times"
                      />
                      <span class="radio-text">No restriction</span>
                    </label>
                    <label class="radio-label">
                      <input
                        type="radio"
                        name="access_times"
                        value="limited"
                        v-model="membershipForm.access_times"
                      />
                      <span class="radio-text">Limited access</span>
                    </label>
                  </div>
                </div>

                <!-- Duration -->
                <div class="form-field">
                  <label class="field-label">
                    Duration
                    <i class="fas fa-info-circle info-icon" title="Membership duration"></i>
                  </label>
                  <div class="duration-input-group">
                    <input
                      type="number"
                      min="1"
                      class="field-input"
                      v-model.number="membershipForm.duration_value"
                      placeholder="1"
                    />
                    <select class="field-input field-select" v-model="membershipForm.duration_unit">
                      <option value="days">Days</option>
                      <option value="weeks">Weeks</option>
                      <option value="months" selected>Months</option>
                      <option value="years">Years</option>
                    </select>
                  </div>
                </div>

                <!-- Auto Renewed -->
                <div class="form-field">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      class="checkbox-input"
                      v-model="membershipForm.auto_renewed"
                    />
                    <span class="checkbox-text">Auto renewed?</span>
                    <i class="fas fa-info-circle info-icon" title="Automatically renew this membership"></i>
                  </label>
                </div>
              </div>
            </div>

            <!-- Section 3: Price -->
            <div class="form-section-card">
              <h3 class="section-title">
             
                Price
              </h3>
              <div class="form-fields">
                <!-- Regular Price -->
                <div class="form-field">
                  <label class="field-label">
                    Regular price (inc. VAT/tax) <span class="required">*</span>
                    <i class="fas fa-info-circle info-icon" title="Regular price including tax"></i>
                  </label>
                  <validation-provider
                    name="Regular Price"
                    rules="required|numeric|min_value:0"
                    v-slot="validationContext"
                  >
                    <div class="price-input-group">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        :class="['field-input', { 'is-invalid': validationContext.errors.length > 0 }]"
                        v-model.number="membershipForm.price"
                        placeholder="0.00"
                        required
                      />
                      <select class="field-input field-select" v-model="membershipForm.currency">
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>
                    <div v-if="validationContext.errors.length > 0" class="invalid-feedback">
                      {{ validationContext.errors[0] }}
                    </div>
                  </validation-provider>
                </div>

                <!-- Sales Tax -->
                <div class="form-field">
                  <label class="field-label">
                    Sales tax
                    <i class="fas fa-info-circle info-icon" title="Sales tax percentage"></i>
                  </label>
                  <select class="field-input field-select" v-model="membershipForm.sales_tax">
                    <option value="default">Default tax (0.00%)</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="20">20%</option>
                  </select>
                </div>

                <!-- Billing Cycle -->
                <div class="form-field">
                  <label class="field-label">
                    Billing cycle
                    <i class="fas fa-info-circle info-icon" title="How often to bill"></i>
                  </label>
                  <validation-provider
                    name="Billing Cycle"
                    rules="required"
                    v-slot="validationContext"
                  >
                    <select
                      :class="['field-input', 'field-select', { 'is-invalid': validationContext.errors.length > 0 }]"
                      v-model="membershipForm.interval"
                      required
                    >
                      <option value="">Select</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="weekly">Weekly</option>
                      <option value="daily">Daily</option>
                    </select>
                    <div v-if="validationContext.errors.length > 0" class="invalid-feedback">
                      {{ validationContext.errors[0] }}
                    </div>
                  </validation-provider>
                </div>

                <!-- Recurring Billing Date -->
                <div class="form-field">
                  <label class="field-label">
                    Recurring billing date
                    <i class="fas fa-info-circle info-icon" title="When to generate invoices"></i>
                  </label>
                  <div class="radio-group">
                    <label class="radio-label">
                      <input
                        type="radio"
                        name="recurring_billing"
                        value="from_start"
                        v-model="membershipForm.recurring_billing"
                      />
                      <div>
                        <span class="radio-text">From membership start date</span>
                        <small class="radio-hint">The invoices will generate each month starting from the membership start date</small>
                      </div>
                    </label>
                    <label class="radio-label">
                      <input
                        type="radio"
                        name="recurring_billing"
                        value="first_of_month"
                        v-model="membershipForm.recurring_billing"
                      />
                      <div>
                        <span class="radio-text">From 1st of the month</span>
                        <small class="radio-hint">The first invoice will be prorated until the beginning of the next month</small>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Income Category -->
                <div class="form-field">
                  <label class="field-label">
                    Income Category
                    <i class="fas fa-info-circle info-icon" title="Category for income tracking"></i>
                  </label>
                  <select class="field-input field-select" v-model="membershipForm.income_category">
                    <option value="">Select</option>
                    <option value="membership">Membership</option>
                    <option value="training">Training</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <!-- Default Payment Method -->
                <div class="form-field">
                  <label class="field-label">
                    Default payment method
                    <i class="fas fa-info-circle info-icon" title="Default payment method"></i>
                  </label>
                  <select class="field-input field-select" v-model="membershipForm.default_payment_method">
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="stripe">Stripe</option>
                  </select>
                </div>

                <!-- Next Invoice Creation -->
                <div class="form-field">
                  <label class="field-label">
                    Next invoice will be created
                    <i class="fas fa-info-circle info-icon" title="When to create the next invoice"></i>
                  </label>
                  <div class="invoice-timing-group">
                    <input
                      type="number"
                      min="0"
                      class="field-input"
                      v-model.number="membershipForm.invoice_before_value"
                      placeholder="1"
                    />
                    <select class="field-input field-select" v-model="membershipForm.invoice_before_unit">
                      <option value="days">Days</option>
                      <option value="weeks" selected>Weeks</option>
                      <option value="months">Months</option>
                    </select>
                    <span class="timing-text">before the start of the new billing cycle.</span>
                  </div>
                </div>

                <!-- One-time Payment/Registration Fee -->
                <div class="form-field">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      class="checkbox-input"
                      v-model="membershipForm.one_time_payment"
                    />
                    <span class="checkbox-text">One-time payment/registration fee</span>
                    <i class="fas fa-info-circle info-icon" title="Charge a one-time fee"></i>
                  </label>
                  <div v-if="membershipForm.one_time_payment" class="one-time-fee-input">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      class="field-input"
                      v-model="membershipForm.registration_fee"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 4: Credits -->
            <div class="form-section-card">
              <h3 class="section-title">
            
                Credits
              </h3>
              <div class="credits-section">
                <div class="credits-table-header">
                  <div class="credits-col-checkbox"></div>
                  <div class="credits-col-service">Service</div>
                  <div class="credits-col-amount">
                    Amount
                    <i class="fas fa-info-circle info-icon"></i>
                  </div>
                  <div class="credits-col-frequency">
                    Frequency
                    <i class="fas fa-info-circle info-icon"></i>
                  </div>
                  <div class="credits-col-validity">
                    Validity
                    <i class="fas fa-info-circle info-icon"></i>
                  </div>
                  <div class="credits-col-extra">
                    Extra of start
                    <i class="fas fa-info-circle info-icon"></i>
                  </div>
                </div>
                <div class="credits-services-list">
                  <div
                    v-for="service in availableServices"
                    :key="service.id"
                    class="credits-service-row"
                  >
                    <div class="credits-col-checkbox">
                      <input
                        type="checkbox"
                        :id="`service-${service.id}`"
                        v-model="service.enabled"
                      />
                    </div>
                    <div class="credits-col-service">
                      <label :for="`service-${service.id}`">{{ service.name }}</label>
                    </div>
                    <div class="credits-col-amount" v-if="service.enabled">
                      <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        class="field-input"
                        :class="{ 'is-invalid': service.enabled && (!service.amount || service.amount <= 0) }"
                        v-model.number="service.amount"
                        placeholder="Enter credits"
                        required
                      />
                      <span>Credits</span>
                      <small v-if="service.enabled && (!service.amount || service.amount <= 0)" class="text-danger d-block mt-1">
                        Amount must be greater than 0
                      </small>
                    </div>
                    <div class="credits-col-frequency" v-if="service.enabled">
                      <input
                        type="number"
                        min="0"
                        class="field-input"
                        v-model.number="service.frequency_value"
                        placeholder="1"
                      />
                      <select class="field-input field-select" v-model="service.frequency_unit">
                        <option value="days">Days</option>
                        <option value="weeks">Weeks</option>
                        <option value="months" selected>Months</option>
                      </select>
                    </div>
                    <div class="credits-col-validity" v-if="service.enabled">
                      <input
                        type="number"
                        min="0"
                        class="field-input"
                        v-model.number="service.validity_value"
                        placeholder="1"
                      />
                      <select class="field-input field-select" v-model="service.validity_unit">
                        <option value="days">Days</option>
                        <option value="weeks">Weeks</option>
                        <option value="months" selected>Months</option>
                      </select>
                    </div>
                    <div class="credits-col-extra" v-if="service.enabled">
                      <input
                        type="checkbox"
                        v-model="service.extra_of_start"
                      />
                    </div>
                  </div>
                </div>
                <div class="credits-distribution">
                  <label class="field-label">Credit Distribution monthly</label>
                  <div class="radio-group">
                    <label class="radio-label">
                      <input
                        type="radio"
                        name="credit_distribution"
                        value="first_of_month"
                        v-model="membershipForm.credit_distribution"
                      />
                      <span class="radio-text">Every 1st of the month</span>
                    </label>
                    <label class="radio-label">
                      <input
                        type="radio"
                        name="credit_distribution"
                        value="from_assign_date"
                        v-model="membershipForm.credit_distribution"
                      />
                      <span class="radio-text">Based on membership assign date</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 5: Digital Services -->
            <div class="form-section-card">
              <h3 class="section-title">
              
                Digital Services
              </h3>
              <div class="form-fields">
                <!-- Enable PRO -->
                <div class="form-field">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      class="checkbox-input"
                      v-model="membershipForm.enable_pro"
                    />
                    <span class="checkbox-text">Enable PRO?</span>
                    <i class="fas fa-info-circle info-icon" title="Enable PRO features"></i>
                  </label>
                </div>

                <!-- Early Booking Access -->
                <div class="form-field">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      class="checkbox-input"
                      v-model="membershipForm.early_booking_access"
                    />
                    <span class="checkbox-text">Early booking access</span>
                    <i class="fas fa-info-circle info-icon" title="Allow early booking access"></i>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <button type="button" class="btn-cancel" @click="$router.push('/app/Settings/system_settings')">
              Cancel
            </button>
            <button type="submit" class="btn-submit" :disabled="formProcessing">
              <span v-if="formProcessing" class="spinner-border spinner-border-sm me-2" role="status"></span>
              {{ isEditMode ? 'Update' : 'Finish' }}
            </button>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import NProgress from "nprogress";
import axios from "axios";

export default {
  name: "CreateMembership",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      isEditMode: false,
      membershipId: null,
      formProcessing: false,
      membershipForm: {
        // Basic Info
        name: '',
        description: '',
        webshop_image: '',
        group: '',
        terms_conditions: 'general',
        start_date_type: 'any',
        start_date_from: '',
        start_date_to: '',
        status_type: 'active',
        status_from: '',
        status_to: '',
        // Scope
        access_times: 'no_restriction',
        duration_value: 1,
        duration_unit: 'months',
        auto_renewed: false,
        // Price
        price: 0,
        currency: 'USD',
        sales_tax: 'default',
        interval: 'monthly',
        recurring_billing: 'from_start',
        income_category: '',
        default_payment_method: 'cash',
        invoice_before_value: 1,
        invoice_before_unit: 'weeks',
        one_time_payment: false,
        registration_fee: '',
        // Credits
        credit_distribution: 'from_assign_date',
        // Digital Services
        enable_pro: false,
        early_booking_access: false,
        // Legacy fields
        stripe_price_id: '',
        features: [''],
        is_active: true,
        sort_order: 0
      },
      availableServices: [
        { id: 1, name: 'Compensation sleeves', enabled: false, amount: 0, frequency_value: 1, frequency_unit: 'months', validity_value: 1, validity_unit: 'months', extra_of_start: false },
        { id: 2, name: 'Cryo-therapy', enabled: false, amount: 0, frequency_value: 1, frequency_unit: 'months', validity_value: 1, validity_unit: 'months', extra_of_start: false },
        { id: 3, name: 'Group Classes', enabled: false, amount: 0, frequency_value: 1, frequency_unit: 'months', validity_value: 1, validity_unit: 'months', extra_of_start: false },
        { id: 4, name: 'Infrared Sauna', enabled: false, amount: 0, frequency_value: 1, frequency_unit: 'months', validity_value: 1, validity_unit: 'months', extra_of_start: false },
        { id: 5, name: 'Personal training 1 hour', enabled: false, amount: 0, frequency_value: 1, frequency_unit: 'months', validity_value: 1, validity_unit: 'months', extra_of_start: false },
        { id: 6, name: 'Personal training 30 mins', enabled: false, amount: 0, frequency_value: 1, frequency_unit: 'months', validity_value: 1, validity_unit: 'months', extra_of_start: false }
      ],
      membershipGroups: []
    };
  },
  mounted() {
    this.fetchMembershipGroups();
    // Check if we're in edit mode
    if (this.$route.query.id) {
      this.isEditMode = true;
      this.membershipId = this.$route.query.id;
      this.fetchMembershipData(this.membershipId);
    }
  },
  methods: {
    // Fetch membership groups from backend
    async fetchMembershipGroups() {
      try {
        const response = await axios.get('plans/membership-groups/list');
        if (response.data.success) {
          this.membershipGroups = response.data.data;
        }
      } catch (error) {
        console.error('Error fetching membership groups:', error);
        this.makeToast("warning", "Failed to load membership groups", "Warning");
      }
    },

    // Fetch membership data for editing
    async fetchMembershipData(id) {
      try {
        NProgress.start();
        const response = await axios.get(`plans/${id}`);
        if (response.data.success && response.data.data) {
          const plan = response.data.data;
          
          // Populate basic fields
          this.membershipForm.name = plan.name || '';
          // Convert price to number for v-model.number - handle both number and string formats
          if (plan.price !== null && plan.price !== undefined) {
            const priceValue = typeof plan.price === 'number' ? plan.price : parseFloat(plan.price);
            this.membershipForm.price = isNaN(priceValue) ? 0 : priceValue;
          } else {
            this.membershipForm.price = 0;
          }
          this.membershipForm.interval = plan.interval || 'monthly';
          this.membershipForm.stripe_price_id = plan.stripe_price_id || '';
          this.membershipForm.features = plan.features && Array.isArray(plan.features) && plan.features.length > 0 
            ? [...plan.features] 
            : [''];
          this.membershipForm.is_active = plan.is_active !== undefined ? plan.is_active : true;
          this.membershipForm.sort_order = plan.sort_order || 0;

          // Parse membership_data if it exists
          let membershipData = {};
          if (plan.membership_data) {
            try {
              membershipData = typeof plan.membership_data === 'string' 
                ? JSON.parse(plan.membership_data) 
                : plan.membership_data;
            } catch (e) {
              console.error('Error parsing membership_data:', e);
            }
          }

          // Populate extended fields from membership_data
          if (membershipData) {
            this.membershipForm.description = membershipData.description || '';
            this.membershipForm.webshop_image = membershipData.webshop_image || '';
            this.membershipForm.group = membershipData.group || '';
            this.membershipForm.terms_conditions = membershipData.terms_conditions || 'general';
            this.membershipForm.start_date_type = membershipData.start_date_type || 'any';
            this.membershipForm.start_date_from = membershipData.start_date_from || '';
            this.membershipForm.start_date_to = membershipData.start_date_to || '';
            this.membershipForm.status_type = membershipData.status_type || 'active';
            this.membershipForm.status_from = membershipData.status_from || '';
            this.membershipForm.status_to = membershipData.status_to || '';
            this.membershipForm.access_times = membershipData.access_times || 'no_restriction';
            this.membershipForm.duration_value = membershipData.duration_value || 1;
            this.membershipForm.duration_unit = membershipData.duration_unit || 'months';
            this.membershipForm.auto_renewed = membershipData.auto_renewed || false;
            this.membershipForm.currency = membershipData.currency || 'USD';
            this.membershipForm.sales_tax = membershipData.sales_tax || 'default';
            this.membershipForm.recurring_billing = membershipData.recurring_billing || 'from_start';
            this.membershipForm.income_category = membershipData.income_category || '';
            this.membershipForm.default_payment_method = membershipData.default_payment_method || 'cash';
            this.membershipForm.invoice_before_value = membershipData.invoice_before_value || 1;
            this.membershipForm.invoice_before_unit = membershipData.invoice_before_unit || 'weeks';
            this.membershipForm.one_time_payment = membershipData.one_time_payment || false;
            this.membershipForm.registration_fee = membershipData.registration_fee || '';
            this.membershipForm.credit_distribution = membershipData.credit_distribution || 'from_assign_date';
            this.membershipForm.enable_pro = membershipData.enable_pro || false;
            this.membershipForm.early_booking_access = membershipData.early_booking_access || false;

            // Populate services if they exist
            if (membershipData.services && Array.isArray(membershipData.services)) {
              this.availableServices.forEach(service => {
                const serviceData = membershipData.services.find(s => s.id === service.id || s.name === service.name);
                if (serviceData) {
                  service.enabled = true;
                  service.amount = serviceData.amount || 0;
                  service.frequency_value = serviceData.frequency_value || 1;
                  service.frequency_unit = serviceData.frequency_unit || 'months';
                  service.validity_value = serviceData.validity_value || 1;
                  service.validity_unit = serviceData.validity_unit || 'months';
                  service.extra_of_start = serviceData.extra_of_start || false;
                }
              });
            }
          }

          // Reset validation after data is loaded to clear any false errors
          this.$nextTick(() => {
            if (this.$refs.membershipForm) {
              // Reset validation state only (doesn't clear form values)
              this.$refs.membershipForm.reset();
            }
          });
        } else {
          this.makeToast("danger", "Failed to load membership data", "Error");
          this.$router.push({ path: '/app/Settings/system_settings', query: { tab: 'memberships' } });
        }
        NProgress.done();
      } catch (error) {
        console.error('Error fetching membership data:', error);
        this.makeToast("danger", "Error loading membership data", "Error");
        NProgress.done();
        this.$router.push({ path: '/app/Settings/system_settings', query: { tab: 'memberships' } });
      }
    },
    // Handle webshop image upload
    handleWebshopImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          this.makeToast("warning", "Image size should be less than 5MB", "Warning");
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          this.membershipForm.webshop_image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    // Handle create/update membership
    handleCreateMembership() {
      // Validate that enabled services have credits > 0
      const enabledServicesWithoutCredits = this.availableServices.filter(
        s => s.enabled && (!s.amount || s.amount <= 0)
      );
      
      if (enabledServicesWithoutCredits.length > 0) {
        const serviceNames = enabledServicesWithoutCredits.map(s => s.name).join(', ');
        this.makeToast(
          "warning", 
          `Please set credit amounts greater than 0 for enabled services: ${serviceNames}`, 
          "Validation Error"
        );
        return;
      }

      this.$refs.membershipForm.validate().then(success => {
        if (!success) {
          return;
        }

        this.formProcessing = true;
        NProgress.start();

        // Prepare form data - include all fields
        const formData = {
          // Basic fields for plans table
          name: this.membershipForm.name,
          price: typeof this.membershipForm.price === 'number' 
            ? this.membershipForm.price 
            : (this.membershipForm.price && this.membershipForm.price !== '' 
                ? parseFloat(this.membershipForm.price) 
                : 0),
          interval: this.membershipForm.interval,
          stripe_price_id: this.membershipForm.stripe_price_id && this.membershipForm.stripe_price_id.trim() !== '' ? this.membershipForm.stripe_price_id : null,
          features: this.membershipForm.features.filter(f => f.trim() !== ''),
          is_active: this.membershipForm.is_active,
          sort_order: this.membershipForm.sort_order || 0,
          // Extended membership data (store as JSON)
          membership_data: {
            description: this.membershipForm.description,
            webshop_image: this.membershipForm.webshop_image,
            group: this.membershipForm.group,
            terms_conditions: this.membershipForm.terms_conditions,
            start_date_type: this.membershipForm.start_date_type,
            start_date_from: this.membershipForm.start_date_from,
            start_date_to: this.membershipForm.start_date_to,
            status_type: this.membershipForm.status_type,
            status_from: this.membershipForm.status_from,
            status_to: this.membershipForm.status_to,
            access_times: this.membershipForm.access_times,
            duration_value: this.membershipForm.duration_value,
            duration_unit: this.membershipForm.duration_unit,
            auto_renewed: this.membershipForm.auto_renewed,
            currency: this.membershipForm.currency,
            sales_tax: this.membershipForm.sales_tax,
            recurring_billing: this.membershipForm.recurring_billing,
            income_category: this.membershipForm.income_category,
            default_payment_method: this.membershipForm.default_payment_method,
            invoice_before_value: this.membershipForm.invoice_before_value,
            invoice_before_unit: this.membershipForm.invoice_before_unit,
            one_time_payment: this.membershipForm.one_time_payment,
            registration_fee: this.membershipForm.registration_fee ? parseFloat(this.membershipForm.registration_fee) : null,
            credit_distribution: this.membershipForm.credit_distribution,
            enable_pro: this.membershipForm.enable_pro,
            early_booking_access: this.membershipForm.early_booking_access,
            services: this.availableServices.filter(s => s.enabled).map(s => ({
              id: s.id,
              name: s.name,
              enabled: true, // Explicitly set enabled to true
              amount: s.amount,
              frequency_value: s.frequency_value,
              frequency_unit: s.frequency_unit,
              validity_value: s.validity_value,
              validity_unit: s.validity_unit,
              extra_of_start: s.extra_of_start
            }))
          }
        };

        // Use PUT for update, POST for create
        const apiCall = this.isEditMode
          ? axios.put(`plans/${this.membershipId}`, formData)
          : axios.post('plans', formData);

        apiCall
          .then(response => {
            if (response.data.success) {
              const message = this.isEditMode 
                ? "Membership plan updated successfully" 
                : "Membership plan created successfully";
              this.makeToast("success", message, "Success");
              this.$router.push({ path: '/app/Settings/system_settings', query: { tab: 'memberships' } });
            } else {
              const errorMessage = this.isEditMode
                ? response.data.message || "Failed to update membership plan"
                : response.data.message || "Failed to create membership plan";
              this.makeToast("danger", errorMessage, "Failed");
            }
            NProgress.done();
            this.formProcessing = false;
          })
          .catch(error => {
            console.error(`Error ${this.isEditMode ? 'updating' : 'creating'} membership plan:`, error);
            let errorMessage = this.isEditMode 
              ? "Error updating membership plan" 
              : "Error creating membership plan";
            if (error.response && error.response.data) {
              if (error.response.data.errors) {
                const errors = Object.values(error.response.data.errors).flat();
                errorMessage = errors.join(', ');
              } else if (error.response.data.message) {
                errorMessage = error.response.data.message;
              }
            }
            this.makeToast("danger", errorMessage, "Failed");
            NProgress.done();
            this.formProcessing = false;
          });
      });
    },

    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../../../assets/styles/sass/_variables.scss";

.main-content {
  padding: $padding-lg;
  background: $color-white;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $margin-xl;
  padding-bottom: $padding-md;
  border-bottom: $border-width-sm solid $color-border-muted;

  h1 {
    font-size: $font-size-xxl;
    font-weight: $font-weight-bold;
    color: $color-heading;
    margin: 0;
  }
}

.btn-back {
  background: $color-background-hover;
  color: $color-heading;
  border: $border-width-sm solid $color-border-muted;
  padding: $padding-sm $padding-lg;
  border-radius: $border-radius-md;
  font-weight: $font-weight-semibold;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: $padding-xs;

  &:hover {
    background: $color-border-muted;
    border-color: $color-button;
    color: $color-button;
  }

  i {
    font-size: $font-size-xs;
  }
}

.membership-form-page {
  max-width: 1200px;
  margin: 0 auto;
}

.membership-form-sections {
  display: flex;
  flex-direction: column;
  gap: $margin-xl;
}

.form-section-card {
  background: $color-card-bg;
  border-radius: $border-radius-lg;
  padding: $padding-xl;
  box-shadow: $box-shadow-md;
  border: $border-width-sm solid $color-border-muted;
}

.section-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  color: $color-heading;
  margin-bottom: $margin-lg;
  padding-bottom: $padding-md;
  border-bottom: $border-width-sm solid $color-border-muted;
  display: flex;
  align-items: center;

  i {
    color: $color-link;
  }
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: $margin-md;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: $padding-xs;
}

.field-label {
  font-weight: $font-weight-semibold;
  font-size: $font-size-sm;
  color: $color-heading;
  display: flex;
  align-items: center;
  gap: $padding-xs;
}

.required {
  color: $color-danger;
}

.info-icon {
  color: $color-muted;
  font-size: $font-size-xs;
  cursor: help;
}

.field-input {
  padding: $padding-sm $padding-md;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-md;
  font-size: $font-size-sm;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: $color-link;
    box-shadow: 0 0 0 3px rgba($color-link, 0.1);
  }

  &.is-invalid {
    border-color: $color-danger;
  }
}

.field-textarea {
  resize: vertical;
  min-height: 80px;
}

.field-select {
  cursor: pointer;
}

.invalid-feedback {
  color: $color-danger;
  font-size: $font-size-xs;
  margin-top: $padding-xxs;
}

.image-upload-wrapper {
  display: flex;
  flex-direction: column;
  gap: $padding-md;
}

.image-preview {
  position: relative;
  width: 200px;
  height: 200px;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-md;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.remove-image-btn {
  position: absolute;
  top: $padding-xs;
  right: $padding-xs;
  background: rgba($color-danger, 0.9);
  color: $color-white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: $color-danger;
  }
}

.image-placeholder {
  width: 200px;
  height: 200px;
  border: 2px dashed $color-border-muted;
  border-radius: $border-radius-md;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $padding-sm;
  color: $color-muted;
  background: $color-background-hover;

  i {
    font-size: $font-size-xxl;
  }

  p {
    margin: 0;
    font-size: $font-size-xs;
  }
}

.change-image-btn {
  align-self: flex-start;
  background: $color-link;
  color: $color-white;
  border: none;
  padding: $padding-xs $padding-md;
  border-radius: $border-radius-sm;
  font-size: $font-size-xs;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: $color-link-hover;
  }
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: $padding-sm;
}

.radio-label {
  display: flex;
  align-items: flex-start;
  gap: $padding-sm;
  cursor: pointer;

  input[type="radio"] {
    margin-top: 2px;
  }

  .radio-text {
    font-size: $font-size-sm;
    color: $color-heading;
  }

  .radio-hint {
    display: block;
    font-size: $font-size-xs;
    color: $color-muted;
    margin-top: $padding-xxs;
  }
}

.date-range-inputs {
  display: flex;
  align-items: center;
  gap: $padding-sm;
  margin-top: $padding-sm;
}

.date-separator {
  color: $color-muted;
  font-size: $font-size-sm;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: $padding-sm;
  cursor: pointer;

  .checkbox-text {
    font-size: $font-size-sm;
    color: $color-heading;
  }
}

.duration-input-group,
.price-input-group,
.invoice-timing-group {
  display: flex;
  gap: $padding-sm;
  align-items: center;
}

.timing-text {
  color: $color-muted;
  font-size: $font-size-sm;
  white-space: nowrap;
}

.one-time-fee-input {
  margin-top: $padding-sm;
  max-width: 200px;
}

.credits-section {
  display: flex;
  flex-direction: column;
  gap: $margin-lg;
}

.credits-table-header {
  display: grid;
  grid-template-columns: 40px 1fr 120px 150px 150px 100px;
  gap: $padding-md;
  padding: $padding-md;
  background: $color-background-hover;
  border-radius: $border-radius-md;
  font-weight: $font-weight-semibold;
  font-size: $font-size-sm;
  color: $color-heading;
  align-items: center;
}

.credits-services-list {
  display: flex;
  flex-direction: column;
  gap: $padding-sm;
}

.credits-service-row {
  display: grid;
  grid-template-columns: 40px 1fr 120px 150px 150px 100px;
  gap: $padding-md;
  padding: $padding-md;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-md;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background: $color-background-hover;
  }
}

.credits-col-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
}

.credits-col-service {
  font-size: $font-size-sm;
  color: $color-heading;
}

.credits-col-amount,
.credits-col-frequency,
.credits-col-validity {
  display: flex;
  gap: $padding-xs;
  align-items: center;

  .field-input {
    flex: 1;
    min-width: 60px;
  }

  span {
    font-size: $font-size-xs;
    color: $color-muted;
    white-space: nowrap;
  }
}

.credits-col-extra {
  display: flex;
  align-items: center;
  justify-content: center;
}

.credits-distribution {
  margin-top: $margin-md;
  padding-top: $margin-md;
  border-top: $border-width-sm solid $color-border-muted;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: $padding-md;
  margin-top: $margin-xl;
  padding-top: $margin-lg;
  border-top: $border-width-sm solid $color-border-muted;
}

.btn-cancel {
  background: $color-background-hover;
  color: $color-heading;
  border: $border-width-sm solid $color-border-muted;
  padding: $padding-sm $padding-xl;
  border-radius: $border-radius-md;
  font-weight: $font-weight-semibold;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: $color-border-muted;
    border-color: $color-button;
    color: $color-button;
  }
}

.btn-submit {
  background: $color-link;
  color: $color-white;
  border: none;
  padding: $padding-sm $padding-xl;
  border-radius: $border-radius-md;
  font-weight: $font-weight-semibold;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;

  &:hover:not(:disabled) {
    background: $color-link-hover;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

@media (max-width: $breakpoint-md) {
  .credits-table-header,
  .credits-service-row {
    grid-template-columns: 40px 1fr;
    gap: $padding-sm;
  }

  .credits-col-amount,
  .credits-col-frequency,
  .credits-col-validity,
  .credits-col-extra {
    grid-column: 1 / -1;
    margin-top: $padding-sm;
  }
}
</style>

