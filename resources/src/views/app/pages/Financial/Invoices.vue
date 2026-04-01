<template>
    <div class="invoices-page">
        <!-- Page Header -->
        <div class="page-header mb-4">
            <div class="d-flex justify-content-between align-items-center">
                <h2 class="page-title mb-0">Invoices</h2>
                <button type="button" class="btn btn-primary" @click="createInvoice">
                    <i class="fas fa-plus mr-2"></i>
                    Create invoice
                </button>
            </div>
        </div>

        <!-- Sub Navigation Tabs -->
        <div class="sub-nav-tabs mb-4">
            <nav class="nav nav-pills">
                <button
                    class="nav-link"
                    :class="{ active: activeSubTab === 'invoices' }"
                    @click="setActiveSubTab('invoices')"
                >
                    Invoices
                </button>
                <button
                    class="nav-link"
                    :class="{ active: activeSubTab === 'downloads' }"
                    @click="setActiveSubTab('downloads')"
                >
                    Created downloads
                </button>
            </nav>
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
                    <input type="text" class="form-control" placeholder="Invoice">
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
                            Status
                        </button>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="dropdown">
                        <button class="btn btn-outline-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown">
                            Payment method
                        </button>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="dropdown">
                        <button class="btn btn-outline-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown">
                            All invoices
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Summary Statistics -->
        <div class="summary-stats mb-4">
            <div class="row">
                <div class="col-md-6">
                    <div class="summary-left">
                        <span class="text-muted">Total: 50</span>
                        <span class="text-muted ms-3">Selected: 0 - USD 0.00</span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="summary-right d-flex justify-content-end gap-4">
                        <div class="stat-item">
                            <div class="d-flex align-items-center">
                                <span class="text-muted me-2">Final</span>
                                <i class="fas fa-info-circle text-muted"></i>
                            </div>
                            <div class="stat-value">9,056.64</div>
                            <div class="stat-status text-muted">0.00 Outstanding</div>
                        </div>
                        <div class="stat-item">
                            <div class="d-flex align-items-center">
                                <span class="text-muted me-2">Pro forma</span>
                                <i class="fas fa-info-circle text-muted"></i>
                            </div>
                            <div class="stat-value">250.00</div>
                            <div class="stat-status text-muted">250.00 Outstanding</div>
                        </div>
                        <div class="stat-item">
                            <div class="d-flex align-items-center">
                                <span class="text-muted me-2">Total</span>
                                <i class="fas fa-info-circle text-muted"></i>
                            </div>
                            <div class="stat-value">9,306.64</div>
                            <div class="stat-status text-muted">250.00 Outstanding</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Invoices Table -->
        <div class="invoices-table" v-if="activeSubTab === 'invoices'">
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" class="form-check-input">
                            </th>
                            <th class="sortable">
                                No. <i class="fas fa-sort-down ms-1"></i>
                            </th>
                            <th>Date</th>
                            <th>First name</th>
                            <th>Last Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="invoice in invoices" :key="invoice.id">
                            <td>
                                <input type="checkbox" class="form-check-input">
                            </td>
                            <td>
                                <span class="invoice-number" :class="{ 'pro-forma': invoice.isProForma }">
                                    {{ invoice.number }}
                                </span>
                            </td>
                            <td>{{ invoice.date }}</td>
                            <td>{{ invoice.firstName }}</td>
                            <td>{{ invoice.lastName }}</td>
                            <td>{{ invoice.description }}</td>
                            <td>{{ invoice.price }}</td>
                            <td>
                                <span class="status-badge" :class="invoice.statusClass">
                                    {{ invoice.status }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Created Downloads Tab -->
        <div class="downloads-content" v-if="activeSubTab === 'downloads'">
            <div class="text-center py-5">
                <i class="fas fa-download fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">No downloads created yet</h5>
                <p class="text-muted">Created downloads will appear here</p>
            </div>
        </div>

        <!-- Create Invoice Modal -->
        <b-modal
            v-model="showCreateInvoiceModal"
            title="Create invoice"
            size="lg"
            centered
            @hide="closeCreateInvoiceModal"
            hide-footer
            class="create-invoice-modal"
        >
            <form @submit.prevent="submitInvoice">
                <div class="row">
                    <!-- Invoice Details Section -->
                    <div class="col-md-6 mb-4">
                        <h5 class="section-title mb-3">Invoice Details</h5>
                        
                        <!-- Date -->
                        <div class="form-group mb-3">
                            <label class="d-flex align-items-center">
                                <span class="me-2">Date</span>
                            </label>
                            <b-form-input
                                v-model="invoiceForm.date"
                                type="text"
                                readonly
                                class="form-control"
                            ></b-form-input>
                        </div>

                        <!-- Payment Method -->
                        <div class="form-group mb-3">
                            <label class="d-flex align-items-center">
                                <span class="me-2">Payment method</span>
                            </label>
                            <b-form-select
                                v-model="invoiceForm.payment_method"
                                :options="paymentMethodOptions"
                                class="form-control"
                                required
                            ></b-form-select>
                        </div>

                        <!-- Invoice Text -->
                        <div class="form-group mb-3">
                            <label class="d-flex align-items-center">
                                <span class="me-2">Invoice text</span>
                            </label>
                            <b-form-select
                                v-model="invoiceForm.invoice_text"
                                :options="invoiceTextOptions"
                                class="form-control"
                            ></b-form-select>
                        </div>

                        <!-- Supplementary Invoice Text -->
                        <div class="form-group mb-3">
                            <label class="d-flex align-items-center">
                                <span class="me-2">Supplementary invoice text</span>
                                <i class="fas fa-info-circle text-muted ms-2" style="font-size: 0.875rem;"></i>
                            </label>
                            <b-form-textarea
                                v-model="invoiceForm.supplementary_text"
                                rows="4"
                                class="form-control"
                                placeholder="Enter supplementary invoice text"
                            ></b-form-textarea>
                        </div>
                    </div>

                    <!-- Billing Information Section -->
                    <div class="col-md-6 mb-4">
                        <h5 class="section-title mb-3">Billing Information</h5>
                        
                        <!-- Guest Checkbox -->
                        <div class="form-group mb-3">
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    v-model="invoiceForm.is_guest"
                                    id="guestCheckbox"
                                    @change="handleGuestChange"
                                >
                                <label class="form-check-label" for="guestCheckbox">
                                    Guest?
                                </label>
                            </div>
                        </div>

                        <!-- Bill To -->
                        <div class="form-group mb-3">
                            <label class="d-flex align-items-center">
                                <span class="me-2">Bill to</span>
                            </label>
                            <b-form-select
                                v-model="invoiceForm.bill_to"
                                :options="billToOptions"
                                class="form-control"
                                :disabled="invoiceForm.is_guest"
                                required
                            ></b-form-select>
                        </div>

                        <!-- Sold By -->
                        <div class="form-group mb-3">
                            <label class="d-flex align-items-center">
                                <span class="me-2">Sold by</span>
                            </label>
                            <b-form-input
                                v-model="invoiceForm.sold_by"
                                type="text"
                                readonly
                                class="form-control"
                            ></b-form-input>
                        </div>
                    </div>
                </div>

                <!-- Form Actions -->
                <div class="modal-footer-actions d-flex justify-content-between mt-4 pt-3 border-top">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        @click="closeCreateInvoiceModal"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="isSubmitting"
                    >
                        <span v-if="isSubmitting" class="spinner-border spinner-border-sm mr-2"></span>
                        Create invoice
                    </button>
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "Invoices",
    data() {
        return {
            activeSubTab: 'invoices',
            showCreateInvoiceModal: false,
            isSubmitting: false,
            members: [],
            invoiceForm: {
                date: this.getCurrentDate(),
                payment_method: null,
                invoice_text: 'Default invoice text',
                supplementary_text: '',
                is_guest: false,
                bill_to: null,
                sold_by: '',
                member_id: null
            },
            paymentMethodOptions: [
                { value: null, text: 'Select payment method' },
                { value: 'cash', text: 'Cash' },
                { value: 'credit_card', text: 'Credit Card' },
                { value: 'debit_card', text: 'Debit Card' },
                { value: 'bank_transfer', text: 'Bank Transfer' },
                { value: 'check', text: 'Check' },
                { value: 'other', text: 'Other' }
            ],
            invoiceTextOptions: [
                { value: 'Default invoice text', text: 'Default invoice text' },
                { value: 'Custom text 1', text: 'Custom text 1' },
                { value: 'Custom text 2', text: 'Custom text 2' }
            ],
            invoices: [
                {
                    id: 1,
                    number: '(Pro forma)',
                    isProForma: true,
                    date: '08/21/2025',
                    firstName: 'Charles',
                    lastName: 'Fox',
                    description: 'Unlimited Discounted Small Group Classes (08/1...',
                    price: '250.00',
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
                    description: 'General Nutrition (08/20/2025 - 09/19/2025)',
                    price: '250.00',
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
                    description: 'Unlimited Small Group Training (08/20/2025 - 0...',
                    price: '300.00',
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
                    description: 'Group Training (12) (08/18/2025 - 09/17/2025)',
                    price: '250.00',
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
                    description: 'Small Group Training (8) (08/19/2025 - 09/18/20...',
                    price: '175.00',
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
                    description: '$10 Open Gym Membership (08/23/2025 - 09/2...)',
                    price: '10.00',
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
                    description: '$25 Open Gym Membership, Custom discount (0...',
                    price: '10.00',
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
                    description: 'Meal Plan (08/13/2025 - 09/12/2025)',
                    price: '150.00',
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
                    description: 'Unlimited Small Group Training (08/16/2025 - 0...',
                    price: '300.00',
                    status: 'Paid',
                    statusClass: 'paid'
                }
            ]
        }
    },
    computed: {
        billToOptions() {
            if (this.invoiceForm.is_guest) {
                return [{ value: 'guest', text: 'Guest' }];
            }
            const options = [{ value: null, text: 'Select member' }];
            this.members.forEach(member => {
                const name = member.membername || 
                           (member.firstname && member.lastname ? `${member.firstname} ${member.lastname}` : '') ||
                           member.name || 
                           'Unknown';
                options.push({
                    value: member.id,
                    text: `${name}${member.email ? ` (${member.email})` : ''}`
                });
            });
            return options;
        }
    },
    mounted() {
        this.loadMembers();
        this.loadAdminName();
    },
    methods: {
        getCurrentDate() {
            const today = new Date();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const year = today.getFullYear();
            return `${month}/${day}/${year}`;
        },
        setActiveSubTab(tab) {
            this.activeSubTab = tab;
        },
        createInvoice() {
            this.showCreateInvoiceModal = true;
        },
        closeCreateInvoiceModal() {
            this.showCreateInvoiceModal = false;
            this.resetInvoiceForm();
        },
        resetInvoiceForm() {
            this.invoiceForm = {
                date: this.getCurrentDate(),
                payment_method: null,
                invoice_text: 'Default invoice text',
                supplementary_text: '',
                is_guest: false,
                bill_to: null,
                sold_by: this.invoiceForm.sold_by || '',
                member_id: null
            };
        },
        handleGuestChange() {
            if (this.invoiceForm.is_guest) {
                this.invoiceForm.bill_to = 'guest';
                this.invoiceForm.member_id = null;
            } else {
                this.invoiceForm.bill_to = null;
                this.invoiceForm.member_id = null;
            }
        },
        async loadMembers() {
            try {
                const response = await window.axios.get('get_clients_without_paginate');
                if (response.data && Array.isArray(response.data)) {
                    this.members = response.data;
                } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
                    this.members = response.data.data;
                }
            } catch (error) {
                console.error('Error loading members:', error);
                this.$bvToast.toast('Failed to load members', {
                    title: 'Error',
                    variant: 'danger',
                    solid: true
                });
            }
        },
        async loadAdminName() {
            try {
                // Try to get admin name from various sources
                if (this.$store && this.$store.state.auth && this.$store.state.auth.user) {
                    const user = this.$store.state.auth.user;
                    this.invoiceForm.sold_by = user.name || user.username || user.email || 'Admin';
                    return;
                }
                
                // Try localStorage
                const userData = localStorage.getItem('user');
                if (userData) {
                    try {
                        const user = JSON.parse(userData);
                        this.invoiceForm.sold_by = user.name || user.username || user.email || 'Admin';
                        return;
                    } catch (e) {
                        console.error('Error parsing user data:', e);
                    }
                }
                
                // Try sessionStorage
                const sessionUserData = sessionStorage.getItem('user');
                if (sessionUserData) {
                    try {
                        const user = JSON.parse(sessionUserData);
                        this.invoiceForm.sold_by = user.name || user.username || user.email || 'Admin';
                        return;
                    } catch (e) {
                        console.error('Error parsing session user data:', e);
                    }
                }
                
                // Default fallback
                this.invoiceForm.sold_by = 'Admin';
            } catch (error) {
                console.error('Error loading admin name:', error);
                this.invoiceForm.sold_by = 'Admin';
            }
        },
        async submitInvoice() {
            // Validation
            if (!this.invoiceForm.payment_method) {
                this.$bvToast.toast('Please select a payment method', {
                    title: 'Validation Error',
                    variant: 'warning',
                    solid: true
                });
                return;
            }

            if (!this.invoiceForm.is_guest && (!this.invoiceForm.bill_to || this.invoiceForm.bill_to === 'guest')) {
                this.$bvToast.toast('Please select a member to bill', {
                    title: 'Validation Error',
                    variant: 'warning',
                    solid: true
                });
                return;
            }

            this.isSubmitting = true;

            try {
                // Prepare invoice data
                const invoiceData = {
                    member_id: this.invoiceForm.is_guest ? null : (this.invoiceForm.bill_to === 'guest' ? null : this.invoiceForm.bill_to),
                    payment_method: this.invoiceForm.payment_method,
                    invoice_text: this.invoiceForm.invoice_text,
                    supplementary_text: this.invoiceForm.supplementary_text,
                    sold_by: this.invoiceForm.sold_by,
                    is_guest: this.invoiceForm.is_guest ? 1 : 0,
                    due_date: this.formatDateForBackend(this.invoiceForm.date),
                    amount: 0, // Will be set when products are added
                    description: this.invoiceForm.supplementary_text || 'Invoice created'
                };

                const response = await window.axios.post('invoices', invoiceData);

                if (response.data.success) {
                    this.$bvToast.toast('Invoice created successfully', {
                        title: 'Success',
                        variant: 'success',
                        solid: true
                    });
                    
                    this.closeCreateInvoiceModal();
                    // Reload invoices list if needed
                    // this.loadInvoices();
                } else {
                    throw new Error(response.data.message || 'Failed to create invoice');
                }
            } catch (error) {
                console.error('Error creating invoice:', error);
                const errorMessage = error.response?.data?.message || 
                                   error.response?.data?.error || 
                                   error.message || 
                                   'Failed to create invoice';
                
                this.$bvToast.toast(errorMessage, {
                    title: 'Error',
                    variant: 'danger',
                    solid: true
                });
            } finally {
                this.isSubmitting = false;
            }
        },
        formatDateForBackend(dateString) {
            // Convert MM/DD/YYYY to YYYY-MM-DD
            const parts = dateString.split('/');
            if (parts.length === 3) {
                return `${parts[2]}-${parts[0]}-${parts[1]}`;
            }
            return new Date().toISOString().split('T')[0];
        }
    }
}
</script>

<style scoped lang="scss">
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

.invoices-page {
    padding: $padding-lg;
}

.page-header {
    .page-title {
        font-size: $font-size-xxl;
        font-weight: $font-weight-bold;
        color: $color-heading;
    }
    
    .btn-primary {
        display: inline-flex !important;
        align-items: center;
        white-space: nowrap;
        padding: 0.5rem 1rem;
        font-weight: $font-weight-medium;
        background-color: $primary !important;
        border-color: $primary !important;
        color: $color-white !important;
        
        &:hover {
            background-color: color.adjust($primary, $lightness: -10%) !important;
            border-color: color.adjust($primary, $lightness: -10%) !important;
        }
    }
}

.sub-nav-tabs {
    .nav-pills {
        .nav-link {
            border-radius: $border-radius-sm;
            color: $color-text-dark;
            font-weight: $font-weight-medium;
            padding: $padding-sm $padding-md;
            margin-right: $margin-sm;
            transition: all 0.3s ease;
            
            &:hover {
                color: $primary;
                background-color: rgba($primary, 0.1);
            }
            
            &.active {
                background-color: $primary;
                color: $color-white;
            }
        }
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

.summary-stats {
    .summary-left {
        display: flex;
        align-items: center;
    }
    
    .summary-right {
        .stat-item {
            text-align: center;
            
            .stat-value {
                font-size: $font-size-lg;
                font-weight: $font-weight-bold;
                color: $color-heading;
            }
            
            .stat-status {
                font-size: $font-size-xs;
            }
        }
    }
}

.invoices-table {
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

.downloads-content {
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.create-invoice-modal {
    .section-title {
        font-size: $font-size-md;
        font-weight: $font-weight-semibold;
        color: $color-heading;
        padding-bottom: $padding-sm;
        border-bottom: 2px solid $color-border-muted;
    }
    
    .form-group {
        label {
            font-weight: $font-weight-medium;
            color: $color-text-dark;
            margin-bottom: $margin-xs;
        }
        
        .form-control,
        .form-select {
            border-color: $color-border;
            
            &:focus {
                border-color: $primary;
                box-shadow: 0 0 0 0.2rem rgba($primary, 0.25);
            }
            
            &:disabled,
            &[readonly] {
                background-color: $gray-100;
                cursor: not-allowed;
            }
        }
        
        .form-check-input {
            margin-top: 0.25rem;
            
            &:checked {
                background-color: $primary;
                border-color: $primary;
            }
        }
    }
    
    .modal-footer-actions {
        padding-top: $padding-md;
    }
}

// Responsive design
@media (max-width: $breakpoint-md) {
    .summary-stats {
        .summary-right {
            flex-direction: column;
            gap: $margin-sm;
            
            .stat-item {
                text-align: left;
            }
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
