<template>
    <div class="assign-membership-page">
        <!-- Header with Back Button -->
        <div class="page-header">
            <button class="back-button" @click="goBack">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h1 class="page-title">Assign membership</h1>
        </div>

        <!-- Main Content -->
        <div class="main-content">
            <!-- Left Card: Assign membership -->
            <div class="card assign-card">
                <div class="card-body">
                    <h2 class="card-title">Assign membership</h2>
                    
                    <!-- Assign to Field -->
                    <div class="form-group">
                        <label class="form-label">Assign to</label>
                        <div class="user-display">
                            <div class="user-avatar">
                                <img 
                                    v-if="selectedUser.image" 
                                    :src="selectedUser.image" 
                                    :alt="selectedUser.name"
                                    class="avatar-image"
                                />
                                <i v-else class="fas fa-user"></i>
                            </div>
                            <span class="user-name">{{ selectedUser.name || 'Select a member' }}</span>
                        </div>
                    </div>

                    <!-- Sold by Field -->
                    <div class="form-group">
                        <label class="form-label">Sold by</label>
                        <b-form-select 
                            v-model="form.soldBy" 
                            :options="soldByOptions"
                            class="form-select"
                        >
                        </b-form-select>
                    </div>

                    <!-- Membership type Field -->
                    <div class="form-group">
                        <label class="form-label">Membership type</label>
                        <b-form-select 
                            v-model="form.membershipType" 
                            :options="membershipTypeOptions"
                            class="form-select"
                            @change="onMembershipTypeChange"
                        >
                        </b-form-select>
                    </div>

                    <!-- Package Details (shown when membership is selected) -->
                    <div v-if="selectedPlan" class="package-details-section">
                        <h3 class="section-title">Package Details</h3>
                        <div class="package-info">
                            <div class="package-item">
                                <span class="package-label">Plan Name:</span>
                                <span class="package-value">{{ selectedPlan.name }}</span>
                            </div>
                            <div class="package-item">
                                <span class="package-label">Price:</span>
                                <span class="package-value">${{ selectedPlan.price }} / {{ selectedPlan.interval }}</span>
                            </div>
                            <div v-if="selectedPlan.features && selectedPlan.features.length" class="package-item">
                                <span class="package-label">Features:</span>
                                <ul class="features-list">
                                    <li v-for="(feature, index) in selectedPlan.features" :key="index">{{ feature }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Start Date Field -->
                    <div v-if="form.membershipType" class="form-group">
                        <label class="form-label">Start Date</label>
                        <b-form-input 
                            v-model="form.startDate" 
                            type="date"
                            class="form-control"
                            :min="minStartDate"
                        ></b-form-input>
                    </div>

                    <!-- Payment Method Field -->
                    <div v-if="form.membershipType" class="form-group">
                        <label class="form-label">Payment Method</label>
                        <b-form-select 
                            v-model="form.paymentMethod" 
                            :options="paymentMethodOptions"
                            class="form-select"
                        >
                        </b-form-select>
                    </div>

                    <!-- Note Button -->
                    <div v-if="form.membershipType" class="form-group">
                        <button 
                            class="btn btn-sm btn-outline-secondary note-button"
                            @click="showNoteModal = true"
                        >
                            <i class="fas fa-sticky-note mr-2"></i>
                            Add Note
                        </button>
                        <span v-if="form.notes" class="note-preview">{{ form.notes.substring(0, 50) }}...</span>
                    </div>
                </div>
            </div>

            <!-- Right Card: Invoice Details -->
            <div class="card invoice-card">
                <div class="card-body">
                    <h2 class="card-title">Invoice Details</h2>
                    
                    <p class="invoice-note">
                        All prices are including Sales tax where applicable
                    </p>

                    <!-- Calculations Section -->
                    <div class="calculations-section">
                        <div class="calculation-item">
                            <div class="calculation-row">
                                <span class="calculation-label">Subtotal</span>
                                <div class="calculation-value-group">
                                    <span class="calculation-amount">${{ calculations.subtotal.toFixed(2) }}</span>
                                    <button 
                                        class="edit-icon-btn"
                                        @click="editField('subtotal')"
                                        title="Edit subtotal"
                                    >
                                        <i class="fas fa-pencil-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="calculation-item">
                            <div class="calculation-row">
                                <span class="calculation-label">Discount</span>
                                <div class="calculation-value-group">
                                    <span class="calculation-amount">${{ calculations.discount.toFixed(2) }}</span>
                                    <button 
                                        class="edit-icon-btn"
                                        @click="editField('discount')"
                                        title="Edit discount"
                                    >
                                        <i class="fas fa-pencil-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="calculation-item">
                            <div class="calculation-row">
                                <span class="calculation-label">Tax</span>
                                <div class="calculation-value-group">
                                    <span class="calculation-amount">${{ calculations.tax.toFixed(2) }}</span>
                                    <button 
                                        class="edit-icon-btn"
                                        @click="editField('tax')"
                                        title="Edit tax"
                                    >
                                        <i class="fas fa-pencil-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="calculation-item total-item">
                            <div class="calculation-row">
                                <span class="calculation-label">Total</span>
                                <span class="calculation-amount total-amount">${{ calculations.total.toFixed(2) }}</span>
                            </div>
                        </div>
                    </div>

                    <button 
                        class="assign-button"
                        :class="{ 'disabled': !isFormValid || loading.assigning }"
                        :disabled="!isFormValid || loading.assigning"
                        @click="assignMembership"
                    >
                        <span v-if="loading.assigning">
                            <i class="fas fa-spinner fa-spin mr-2"></i>
                            Assigning...
                        </span>
                        <span v-else>
                            Assign membership
                        </span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Note Modal -->
        <b-modal 
            v-model="showNoteModal" 
            title="Add Note" 
            @ok="saveNote"
            @cancel="cancelNote"
        >
            <b-form-textarea
                v-model="tempNote"
                rows="4"
                placeholder="Enter your note here..."
            ></b-form-textarea>
        </b-modal>

        <!-- Edit Field Modal -->
        <b-modal 
            v-model="showEditModal" 
            :title="`Edit ${editingFieldLabel}`" 
            @ok="saveEditedField"
            @cancel="cancelEdit"
        >
            <b-form-group :label="`Enter ${editingFieldLabel}:`">
                <b-form-input
                    v-model="tempEditValue"
                    type="number"
                    step="0.01"
                    min="0"
                ></b-form-input>
            </b-form-group>
        </b-modal>
    </div>
</template>

<script>
import VueCookies from 'vue-cookies';

export default {
    name: 'AssignMembership',
    data() {
        return {
            selectedUser: {
                name: 'Kelly Barnes',
                image: null,
                id: null
            },
            form: {
                soldBy: null,
                membershipType: null,
                startDate: new Date().toISOString().split('T')[0],
                paymentMethod: null,
                notes: null
            },
            soldByOptions: [
                { value: null, text: 'Select coach', disabled: true }
            ],
            membershipTypeOptions: [
                { value: null, text: 'Select membership', disabled: true }
            ],
            paymentMethodOptions: [
                { value: null, text: 'Select payment method', disabled: true },
                { value: 'Cash', text: 'Cash' },
                { value: 'Bank Transfer', text: 'Bank Transfer' },
                { value: 'Credit Card', text: 'Credit Card' },
                { value: 'Card Terminal', text: 'Card Terminal' },
                { value: 'Check', text: 'Check' },
                { value: 'PayPal', text: 'PayPal' }
            ],
            plans: [],
            selectedPlan: null,
            calculations: {
                subtotal: 0.00,
                discount: 0.00,
                tax: 0.00,
                total: 0.00
            },
            loading: {
                coaches: false,
                memberships: false,
                assigning: false
            },
            showNoteModal: false,
            tempNote: '',
            showEditModal: false,
            editingField: null,
            tempEditValue: 0,
            taxRate: 0.10 // 10% tax rate - you can make this configurable
        }
    },
    computed: {
        minStartDate() {
            return new Date().toISOString().split('T')[0];
        },
        isFormValid() {
            return this.form.membershipType && 
                   this.form.soldBy && 
                   this.form.startDate && 
                   this.form.paymentMethod;
        },
        editingFieldLabel() {
            if (!this.editingField) return '';
            const labels = {
                subtotal: 'Subtotal',
                discount: 'Discount',
                tax: 'Tax'
            };
            return labels[this.editingField] || this.editingField;
        }
    },
    created() {
        // Get selected member data from route params or query
        this.loadSelectedMember();
        // Check authentication status
        this.checkAuthStatus();
        // Fetch coaches and membership types from backend
        this.fetchCoaches();
        this.fetchMembershipTypes();
    },
    
    methods: {
        loadSelectedMember() {
            // Check if member data was passed via route query
            if (this.$route.query.member) {
                try {
                    this.selectedUser = JSON.parse(this.$route.query.member);
                } catch (error) {
                    console.error('Error parsing member data:', error);
                    this.selectedUser = {
                        name: 'Unknown Member',
                        image: null,
                        id: null
                    };
                }
            } else if (this.$store.state.selectedMember) {
                // Check if member is stored in Vuex store
                this.selectedUser = { ...this.$store.state.selectedMember };
            }
        },
        
        goBack() {
            this.$router.go(-1);
        },

        // Check authentication status
        checkAuthStatus() {
            const token = VueCookies.get("Stocky_token");
            console.log('Authentication token:', token ? 'Present' : 'Missing');
            if (!token) {
                console.warn('No authentication token found. User may not be logged in.');
                // Note: User needs to be logged in to access coach data
            }
        },
        
        onMembershipTypeChange() {
            if (this.form.membershipType) {
                this.selectedPlan = this.plans.find(p => p.id === this.form.membershipType);
                if (this.selectedPlan) {
                    this.calculations.subtotal = parseFloat(this.selectedPlan.price);
                    this.calculateTotal();
                }
            } else {
                this.selectedPlan = null;
                this.resetCalculations();
            }
        },

        calculateTotal() {
            const subtotal = this.calculations.subtotal;
            const discount = this.calculations.discount;
            const afterDiscount = subtotal - discount;
            this.calculations.tax = afterDiscount * this.taxRate;
            this.calculations.total = afterDiscount + this.calculations.tax;
        },

        resetCalculations() {
            this.calculations = {
                subtotal: 0.00,
                discount: 0.00,
                tax: 0.00,
                total: 0.00
            };
        },

        editField(field) {
            this.editingField = field;
            this.tempEditValue = this.calculations[field];
            this.showEditModal = true;
        },

        saveEditedField() {
            if (this.editingField === 'subtotal' || this.editingField === 'discount' || this.editingField === 'tax') {
                this.calculations[this.editingField] = parseFloat(this.tempEditValue) || 0;
                this.calculateTotal();
            }
            this.showEditModal = false;
            this.editingField = null;
            this.tempEditValue = 0;
        },

        cancelEdit() {
            this.showEditModal = false;
            this.editingField = null;
            this.tempEditValue = 0;
        },

        saveNote() {
            this.form.notes = this.tempNote;
            this.showNoteModal = false;
        },

        cancelNote() {
            this.tempNote = this.form.notes || '';
            this.showNoteModal = false;
        },

        // Fetch coaches from backend
        async fetchCoaches() {
            this.loading.coaches = true;
            let allCoaches = [];
            let success = false;
            
            console.log('Fetching coaches from API...');
            console.log('Current axios base URL:', axios.defaults.baseURL);
            console.log('Current axios headers:', axios.defaults.headers);
            
            // Test basic API connectivity first
            try {
                console.log('Testing basic API connectivity...');
                const testResponse = await axios.get('test-coaches');
                console.log('Test API response:', testResponse);
                console.log('Test API response data:', testResponse.data);
                console.log('Test API response status:', testResponse.status);
                
                // Check if there are coaches in the response
                if (testResponse.data && testResponse.data.clients) {
                    console.log('Test API found coaches:', testResponse.data.clients.length);
                    console.log('Test API coaches:', testResponse.data.clients);
                } else {
                    console.log('Test API response structure:', Object.keys(testResponse.data || {}));
                }
            } catch (testError) {
                console.log('Test API failed:', testError.message);
                console.log('Test API error details:', testError.response);
                if (testError.response) {
                    console.log('Test API error status:', testError.response.status);
                    console.log('Test API error data:', testError.response.data);
                }
            }
            
            // Try a simple call without any parameters to see if there are any coaches
            try {
                console.log('Testing simple coaches call without parameters...');
                const simpleResponse = await axios.get('test-coaches');
                console.log('Simple coaches response:', simpleResponse.data);
                if (simpleResponse.data && simpleResponse.data.clients) {
                    console.log('Simple call found coaches:', simpleResponse.data.clients.length);
                    if (simpleResponse.data.clients.length > 0) {
                        console.log('First coach example:', simpleResponse.data.clients[0]);
                        // Use the coaches from the simple call
                        allCoaches = simpleResponse.data.clients;
                        success = true;
                        console.log('Using coaches from simple call');
                    }
                }
            } catch (simpleError) {
                console.log('Simple coaches call failed:', simpleError.message);
            }
            
            // If simple call didn't work, try the other approaches
            if (!success) {
                // Approach 1: Try test-coaches endpoint
                try {
                    const url1 = "test-coaches?page=1&limit=all&name=&code=&mobile_phone=&email=&specialization=&SortField=id&SortType=desc";
                    console.log('Trying Approach 1 with URL:', url1);
                    const response1 = await axios.get(url1);
                    console.log('Approach 1 response:', response1);
                    allCoaches = response1.data.clients || [];
                    success = true;
                    console.log("Approach 1 success - coaches found:", allCoaches.length);
                } catch (error1) {
                    console.log("Approach 1 failed:", error1.message);
                    console.log("Approach 1 error details:", error1.response);
                }
                
                // Approach 2: Try test-coaches with large limit
                if (!success) {
                    try {
                        const url2 = "test-coaches?page=1&limit=9999&name=&code=&mobile_phone=&email=&specialization=&SortField=id&SortType=desc";
                        console.log('Trying Approach 2 with URL:', url2);
                        const response2 = await axios.get(url2);
                        console.log('Approach 2 response:', response2);
                        allCoaches = response2.data.clients || [];
                        success = true;
                        console.log("Approach 2 success - coaches found:", allCoaches.length);
                    } catch (error2) {
                        console.log("Approach 2 failed:", error2.message);
                        console.log("Approach 2 error details:", error2.response);
                    }
                }
                
                // Approach 3: Try test-coaches without limit parameter
                if (!success) {
                    try {
                        const url3 = "test-coaches?page=1&name=&code=&mobile_phone=&email=&specialization=&SortField=id&SortType=desc";
                        console.log('Trying Approach 3 with URL:', url3);
                        const response3 = await axios.get(url3);
                        console.log('Approach 3 response:', response3);
                        allCoaches = response3.data.clients || [];
                        success = true;
                        console.log("Approach 3 success - coaches found:", allCoaches.length);
                    } catch (error3) {
                        console.log("Approach 3 failed:", error3.message);
                        console.log("Approach 3 error details:", error3.response);
                    }
                }
            }
            
            if (success && allCoaches.length > 0) {
                this.soldByOptions = [
                    { value: null, text: 'Select coach', disabled: true },
                    ...allCoaches.map(coach => ({
                        value: coach.id,
                        text: coach.name
                    }))
                ];
                console.log('Updated soldByOptions:', this.soldByOptions);
            } else {
                console.log('No coaches found with any approach');
                console.warn('No coaches available. Please add coaches first.');
                
                // Add test coaches for debugging
                this.soldByOptions = [
                    { value: null, text: 'Select coach', disabled: true },
                    { value: 'test-1', text: 'Test Coach 1' },
                    { value: 'test-2', text: 'Test Coach 2' }
                ];
                console.log('Using test coaches for debugging:', this.soldByOptions);
            }
            
            this.loading.coaches = false;
        },

        // Fetch membership types from backend
        async fetchMembershipTypes() {
            this.loading.memberships = true;
            try {
                console.log('Fetching membership types from API...');
                const response = await axios.get('plans');
                
                console.log('Plans API response:', response.data);
                
                if (response.data && response.data.success && response.data.data) {
                    this.plans = response.data.data.filter(plan => plan.is_active);
                    this.membershipTypeOptions = [
                        { value: null, text: 'Select membership', disabled: true },
                        ...this.plans.map(plan => ({
                            value: plan.id,
                            text: `${plan.name} - $${plan.price}/${plan.interval}`
                        }))
                    ];
                    console.log('Updated membershipTypeOptions:', this.membershipTypeOptions);
                } else {
                    console.log('No membership types found in response');
                    console.warn('No membership types available');
                }
            } catch (error) {
                console.error('Error fetching membership types:', error);
                this.$swal({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to load membership types',
                    timer: 3000,
                    showConfirmButton: false
                });
            } finally {
                this.loading.memberships = false;
            }
        },
        
        async assignMembership() {
            if (!this.isFormValid) {
                this.$swal({
                    icon: 'warning',
                    title: 'Validation Error!',
                    text: 'Please fill in all required fields',
                    timer: 3000,
                    showConfirmButton: false
                });
                return;
            }

            if (!this.selectedUser.id) {
                this.$swal({
                    icon: 'warning',
                    title: 'Validation Error!',
                    text: 'No member selected',
                    timer: 3000,
                    showConfirmButton: false
                });
                return;
            }

            this.loading.assigning = true;
            
            try {
                const assignmentData = {
                    member_id: this.selectedUser.id,
                    coach_id: this.form.soldBy,
                    plan_id: this.form.membershipType,
                    start_date: this.form.startDate,
                    payment_method: this.form.paymentMethod,
                    package_name: this.selectedPlan.name,
                    package_details: JSON.stringify(this.selectedPlan.features || []),
                    subtotal: this.calculations.subtotal,
                    discount: this.calculations.discount,
                    tax: this.calculations.tax,
                    total: this.calculations.total,
                    notes: this.form.notes
                };

                const response = await axios.post(`members/${this.selectedUser.id}/assign-membership`, assignmentData);
                
                if (response.data.success) {
                    this.$swal({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Membership assigned successfully!',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 2000);
                } else {
                    this.$swal({
                        icon: 'error',
                        title: 'Error!',
                        text: response.data.message || 'Failed to assign membership',
                        timer: 3000,
                        showConfirmButton: false
                    });
                }
                
            } catch (error) {
                let errorMessage = 'Failed to assign membership. Please try again.';
                
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
                
                this.$swal({
                    icon: 'error',
                    title: 'Error!',
                    text: errorMessage,
                    timer: 3000,
                    showConfirmButton: false
                });
            } finally {
                this.loading.assigning = false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.assign-membership-page {
    min-height: 100vh;
    background-color: #f8f9fa;
    padding: 2rem;
}

.page-header {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    
    .back-button {
        background: none;
        border: none;
        font-size: 1.2rem;
        color: #6c757d;
        margin-right: 1rem;
        padding: 0.5rem;
        border-radius: 50%;
        transition: all 0.2s ease;
        
        &:hover {
            background-color: #e9ecef;
            color: #495057;
        }
    }
    
    .page-title {
        font-size: 1.8rem;
        font-weight: 700;
        color: #212529;
        margin: 0;
    }
}

.main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.card {
    background: white;
    border-radius: 15px;
    // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: none;
    padding: 20px;
    
    .card-body {
        padding: 20px;
    }
    
    .card-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: #212529;
        margin-bottom: 1.5rem;
    }
}

.assign-card {
    .form-group {
        margin-bottom: 1.5rem;
        
        .form-label {
            font-weight: 600;
            color: #495057;
            margin-bottom: 0.75rem;
            display: block;
        }
        
        .user-display {
            display: flex;
            align-items: center;
            padding: 0.75rem 1rem;
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            
            .user-avatar {
                width: 40px;
                height: 40px;
                background-color: #6c757d;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 0.75rem;
                overflow: hidden;
                
                i {
                    color: white;
                    font-size: 1.1rem;
                }
                
                .avatar-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }
            }
            
            .user-name {
                font-weight: 500;
                color: #212529;
            }
        }
        
        .form-select, .form-control {
            border: 1px solid #ced4da;
            border-radius: 8px;
            font-size: 1rem;
            
            &:focus {
                border-color: #ff4040;
                box-shadow: 0 0 0 0.2rem rgba(255, 64, 64, 0.25);
            }
        }

        .note-button {
            width: 100%;
            text-align: left;
        }

        .note-preview {
            display: block;
            margin-top: 0.5rem;
            font-size: 0.875rem;
            color: #6c757d;
            font-style: italic;
        }
    }

    .package-details-section {
        margin-top: 1.5rem;
        padding: 1rem;
        background-color: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #dee2e6;

        .section-title {
            font-size: 1rem;
            font-weight: 600;
            color: #495057;
            margin-bottom: 1rem;
        }

        .package-info {
            .package-item {
                margin-bottom: 0.75rem;

                .package-label {
                    font-weight: 600;
                    color: #6c757d;
                    margin-right: 0.5rem;
                }

                .package-value {
                    color: #212529;
                }

                .features-list {
                    margin: 0.5rem 0 0 1.5rem;
                    padding: 0;

                    li {
                        margin-bottom: 0.25rem;
                        color: #495057;
                    }
                }
            }
        }
    }
}

.invoice-card {
    .invoice-note {
        font-size: 0.875rem;
        color: #6c757d;
        margin-bottom: 1.5rem;
        line-height: 1.4;
    }
    
    .calculations-section {
        margin-bottom: 2rem;

        .calculation-item {
            padding: 1rem 0;
            border-bottom: 1px solid #e9ecef;

            &.total-item {
                border-top: 2px solid #dee2e6;
                border-bottom: none;
                margin-top: 0.5rem;
                padding-top: 1rem;
            }

            .calculation-row {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .calculation-label {
                    font-weight: 500;
                    color: #495057;
                }

                .calculation-value-group {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;

                    .calculation-amount {
                        font-weight: 600;
                        color: #212529;
                        min-width: 80px;
                        text-align: right;
                    }

                    .edit-icon-btn {
                        background: none;
                        border: none;
                        color: #6c757d;
                        cursor: pointer;
                        padding: 0.25rem 0.5rem;
                        border-radius: 4px;
                        transition: all 0.2s ease;

                        &:hover {
                            background-color: #e9ecef;
                            color: #495057;
                        }
                    }
                }

                .total-amount {
                    font-weight: 700;
                    font-size: 1.2rem;
                    color: #ff4040;
                }
            }
        }
    }
    
    .assign-button {
        width: 100%;
        padding: 1rem 2rem;
        background-color: #ff4040;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover:not(.disabled) {
            background-color: #e63939;
            transform: translateY(-1px);
        }
        
        &.disabled {
            background-color: #e9ecef;
            color: #6c757d;
            cursor: not-allowed;
        }
    }
}

// Responsive design
@media (max-width: 768px) {
    .main-content {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .assign-membership-page {
        padding: 1rem;
    }
    
    .card .card-body {
        padding: 1.5rem;
    }
}

@media (max-width: 576px) {
    .page-header {
        .page-title {
            font-size: 1.5rem;
        }
    }
    
    .card .card-body {
        padding: 1rem;
    }
}
</style>
