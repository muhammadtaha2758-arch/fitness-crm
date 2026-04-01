<template>
  <div class="members-page-wrapper">
    <!-- Breadcrumb and Navigation Row -->
    <div class="breadcrumb-nav-row">
      <!-- Breadcrumb Navigation -->
      <div class="breadcrumb-section">
        <nav class="breadcrumb-nav" aria-label="breadcrumb">
          <div class="breadcrumb-container d-flex align-items-center">
            <button 
              @click.stop="goBack" 
              class="back-button"
              type="button"
              title="Go back"
              style="color: #dc3545;"
            >
              <i class="fas fa-arrow-left"></i>
            </button>
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <router-link to="/app/dashboard">
                  <i class="fas fa-home"></i>
                  Dashboard
                </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                <i class="fas fa-file-invoice"></i>
                Invoices & Receipts
              </li>
            </ol>
          </div>
        </nav>
      </div>

      <!-- Action Buttons -->
      <div class="action-section">
        <button class="btn btn-success action-btn mr-2" @click="createInvoice">
          <i class="fas fa-plus mr-2"></i>
          Create invoice
        </button>
        <button class="btn btn-primary action-btn" @click="refreshInvoices">
          <i class="fas fa-sync-alt"></i>
          Refresh
        </button>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="text-white">Invoices & Receipts</h4>
        </div>
      </div>
      
      <div class="card-body">
        <!-- Search and Filter Section -->
        <div class="search-filter-section">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label>Search</label>
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  class="form-control" 
                  :placeholder="'Search by invoice number, member name...'"
                  @input="filterInvoices"
                >
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label>Status</label>
                <select v-model="statusFilter" class="form-control" @change="filterInvoices">
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label>Date Range</label>
                <select v-model="dateFilter" class="form-control" @change="filterInvoices">
                  <option value="">All Dates</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-group">
                <label>Per Page</label>
                <select v-model="perPage" class="form-control" @change="filterInvoices">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
          </div>
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

        <!-- Invoices Table -->
        <div v-if="!loading && filteredInvoices.length > 0" class="table-responsive">
          <table class="meals-table">
            <thead>
              <tr>
                <th class="sortable" @click="sortBy('invoice_number')">
                  Invoice #
                  <i v-if="sortKey === 'invoice_number'" :class="sortOrders.invoice_number === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down'"></i>
                  <i v-else class="fas fa-sort"></i>
                </th>
                <th class="sortable" @click="sortBy('member_name')">
                  Member
                  <i v-if="sortKey === 'member_name'" :class="sortOrders.member_name === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down'"></i>
                  <i v-else class="fas fa-sort"></i>
                </th>
                <th class="sortable" @click="sortBy('plan_name')">
                  Plan
                  <i v-if="sortKey === 'plan_name'" :class="sortOrders.plan_name === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down'"></i>
                  <i v-else class="fas fa-sort"></i>
                </th>
                <th class="sortable" @click="sortBy('amount')">
                  Amount
                  <i v-if="sortKey === 'amount'" :class="sortOrders.amount === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down'"></i>
                  <i v-else class="fas fa-sort"></i>
                </th>
                <th class="sortable" @click="sortBy('status')">
                  Status
                  <i v-if="sortKey === 'status'" :class="sortOrders.status === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down'"></i>
                  <i v-else class="fas fa-sort"></i>
                </th>
                <th class="sortable" @click="sortBy('due_date')">
                  Due Date
                  <i v-if="sortKey === 'due_date'" :class="sortOrders.due_date === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down'"></i>
                  <i v-else class="fas fa-sort"></i>
                </th>
                <th class="sortable" @click="sortBy('created_at')">
                  Created
                  <i v-if="sortKey === 'created_at'" :class="sortOrders.created_at === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down'"></i>
                  <i v-else class="fas fa-sort"></i>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="invoice in paginatedInvoices" :key="invoice.id" class="meal-row">
                <td class="invoice-number">
                  <strong>{{ invoice.invoice_number }}</strong>
                </td>
                <td class="member-name">
                  <div class="member-info">
                    <div class="member-name-text">{{ invoice.member && invoice.member.membername ? invoice.member.membername : 'N/A' }}</div>
                    <small class="text-muted">{{ invoice.member && invoice.member.email ? invoice.member.email : 'N/A' }}</small>
                  </div>
                </td>
                <td class="plan-name">
                  <span class="plan-badge">{{ invoice.subscription_plan && invoice.subscription_plan.name ? invoice.subscription_plan.name : 'N/A' }}</span>
                </td>
                <td class="amount">
                  <span class="amount-value">${{ parseFloat(invoice.amount).toFixed(2) }}</span>
                </td>
                <td class="status">
                  <span :class="getStatusBadgeClass(invoice.status)">
                    {{ getStatusText(invoice.status) }}
                  </span>
                </td>
                <td class="due-date">
                  <span :class="getDueDateClass(invoice.due_date)">
                    {{ formatDate(invoice.due_date) }}
                  </span>
                </td>
                <td class="created-date">
                  {{ formatDate(invoice.created_at) }}
                </td>
                <td class="actions">
                  <div class="action-buttons">
                    <button 
                      class="action-btn view-btn" 
                      @click="viewInvoice(invoice)"
                      :title="'View Invoice'"
                    >
                      <i class="fas fa-eye"></i>
                    </button>
                    <button 
                      v-if="invoice.status === 'pending'"
                      class="action-btn edit-btn" 
                      @click="markAsPaid(invoice)"
                      :title="'Mark as Paid'"
                    >
                      <i class="fas fa-check"></i>
                    </button>
                    <button 
                      v-if="invoice.status === 'pending'"
                      class="action-btn delete-btn" 
                      @click="cancelInvoice(invoice)"
                      :title="'Cancel Invoice'"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                    <button 
                      class="action-btn view-btn" 
                      @click="downloadInvoice(invoice)"
                      :title="'Download PDF'"
                    >
                      <i class="fas fa-download"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- No Invoices Message -->
        <div v-if="!loading && filteredInvoices.length === 0" class="text-center py-5">
          <i class="fas fa-file-invoice-dollar fa-3x text-muted mb-3"></i>
          <h5 class="text-muted">No invoices found</h5>
          <p class="text-muted">No invoices match your current filters.</p>
        </div>

        <!-- Pagination -->
        <div v-if="!loading && filteredInvoices.length > 0" class="pagination-section">
          <div class="d-flex justify-content-between align-items-center">
            <div class="pagination-info">
              Showing {{ paginationStart }} - {{ paginationEnd }} of {{ filteredInvoices.length }} invoices
            </div>
            <nav>
              <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                    Previous
                  </a>
                </li>
                <li 
                  v-for="page in visiblePages" 
                  :key="page" 
                  class="page-item" 
                  :class="{ active: page === currentPage }"
                >
                  <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
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
              <input
                v-model="invoiceForm.date"
                type="text"
                readonly
                class="form-control"
              >
            </div>

            <!-- Payment Method -->
            <div class="form-group mb-3">
              <label class="d-flex align-items-center">
                <span class="me-2">Payment method</span>
              </label>
              <select
                v-model="invoiceForm.payment_method"
                class="form-control"
                required
              >
                <option :value="null">Select payment method</option>
                <option value="cash">Cash</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="check">Check</option>
                <option value="other">Other</option>
              </select>
            </div>

            <!-- Invoice Text -->
            <div class="form-group mb-3">
              <label class="d-flex align-items-center">
                <span class="me-2">Invoice text</span>
              </label>
              <select
                v-model="invoiceForm.invoice_text"
                class="form-control"
              >
                <option value="Default invoice text">Default invoice text</option>
                <option value="Custom text 1">Custom text 1</option>
                <option value="Custom text 2">Custom text 2</option>
              </select>
            </div>

            <!-- Supplementary Invoice Text -->
            <div class="form-group mb-3">
              <label class="d-flex align-items-center">
                <span class="me-2">Supplementary invoice text</span>
                <i class="fas fa-info-circle text-muted ms-2" style="font-size: 0.875rem;"></i>
              </label>
              <textarea
                v-model="invoiceForm.supplementary_text"
                rows="4"
                class="form-control"
                placeholder="Enter supplementary invoice text"
              ></textarea>
            </div>
          </div>

          <!-- Billing Information Section -->
          <div class="col-md-6 mb-4">
            <h5 class="section-title mb-3">Billing Information</h5>
            
            <!-- Bill To -->
            <div class="form-group mb-3">
              <label class="d-flex align-items-center">
                <span class="me-2">Bill to</span>
              </label>
              <select
                v-model="invoiceForm.bill_to"
                class="form-control"
                required
              >
                <option :value="null">Select member</option>
                <option v-for="member in members" :key="member.id" :value="member.id">
                  {{ getMemberName(member) }}{{ member.email ? ` (${member.email})` : '' }}
                </option>
              </select>
            </div>

            <!-- Plan Name -->
            <div class="form-group mb-3">
              <label class="d-flex align-items-center">
                <span class="me-2">Plan</span>
              </label>
              <select
                v-model="invoiceForm.subscription_plan_id"
                class="form-control"
                @change="onPlanChange"
              >
                <option :value="null">Select plan (optional)</option>
                <option v-for="plan in plans" :key="plan.id" :value="plan.id">
                  {{ plan.name }} - ${{ parseFloat(plan.price || 0).toFixed(2) }}
                </option>
              </select>
            </div>

            <!-- Sold By -->
            <div class="form-group mb-3">
              <label class="d-flex align-items-center">
                <span class="me-2">Sold by</span>
              </label>
              <input
                v-model="invoiceForm.sold_by"
                type="text"
                readonly
                class="form-control"
              >
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
      invoices: [],
      filteredInvoices: [],
      loading: false,
      error: null,
      searchQuery: '',
      statusFilter: '',
      dateFilter: '',
      perPage: 25,
      currentPage: 1,
      sortKey: 'created_at',
      sortOrders: {
        invoice_number: 'desc',
        member_name: 'asc',
        plan_name: 'asc',
        amount: 'desc',
        status: 'asc',
        due_date: 'asc',
        created_at: 'desc'
      },
      showCreateInvoiceModal: false,
      isSubmitting: false,
      members: [],
      plans: [],
      invoiceForm: {
        date: this.getCurrentDate(),
        payment_method: null,
        invoice_text: 'Default invoice text',
        supplementary_text: '',
        bill_to: null,
        sold_by: '',
        member_id: null,
        subscription_plan_id: null,
        amount: 0
      }
    };
  },
  computed: {
    paginatedInvoices() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredInvoices.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredInvoices.length / this.perPage);
    },
    paginationStart() {
      return (this.currentPage - 1) * this.perPage + 1;
    },
    paginationEnd() {
      const end = this.currentPage * this.perPage;
      return end > this.filteredInvoices.length ? this.filteredInvoices.length : end;
    },
    visiblePages() {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(this.totalPages, start + maxVisible - 1);
      
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      return pages;
    }
  },
  async mounted() {
    await this.loadInvoices();
    await this.loadMembers();
    await this.loadPlans();
    this.loadAdminName();
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
    },
    
    async loadInvoices() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await window.axios.get('invoices');
        if (response.data.success) {
          this.invoices = response.data.data;
          this.filterInvoices();
        } else {
          this.error = response.data.message || 'Failed to load invoices';
        }
      } catch (error) {
        console.error('Error loading invoices:', error);
        this.error = 'Failed to load invoices. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    
    filterInvoices() {
      let filtered = [...this.invoices];
      
      // Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(invoice => 
          invoice.invoice_number.toLowerCase().includes(query) ||
          (invoice.member?.membername && invoice.member.membername.toLowerCase().includes(query)) ||
          (invoice.member?.email && invoice.member.email.toLowerCase().includes(query)) ||
          (invoice.subscription_plan?.name && invoice.subscription_plan.name.toLowerCase().includes(query))
        );
      }
      
      // Status filter
      if (this.statusFilter) {
        filtered = filtered.filter(invoice => invoice.status === this.statusFilter);
      }
      
      // Date filter
      if (this.dateFilter) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        switch (this.dateFilter) {
          case 'today':
            filtered = filtered.filter(invoice => {
              const invoiceDate = new Date(invoice.created_at);
              return invoiceDate >= today;
            });
            break;
          case 'week':
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            filtered = filtered.filter(invoice => {
              const invoiceDate = new Date(invoice.created_at);
              return invoiceDate >= weekAgo;
            });
            break;
          case 'month':
            const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            filtered = filtered.filter(invoice => {
              const invoiceDate = new Date(invoice.created_at);
              return invoiceDate >= monthAgo;
            });
            break;
          case 'overdue':
            filtered = filtered.filter(invoice => {
              const dueDate = new Date(invoice.due_date);
              return dueDate < today && invoice.status === 'pending';
            });
            break;
        }
      }
      
      // Sort the filtered results
      this.sortInvoices(filtered);
      this.filteredInvoices = filtered;
      this.currentPage = 1; // Reset to first page when filtering
    },
    
    sortInvoices(invoices) {
      invoices.sort((a, b) => {
        let aValue, bValue;
        
        switch (this.sortKey) {
          case 'invoice_number':
            aValue = a.invoice_number;
            bValue = b.invoice_number;
            break;
          case 'member_name':
            aValue = a.member?.membername || '';
            bValue = b.member?.membername || '';
            break;
          case 'plan_name':
            aValue = a.subscription_plan?.name || '';
            bValue = b.subscription_plan?.name || '';
            break;
          case 'amount':
            aValue = parseFloat(a.amount);
            bValue = parseFloat(b.amount);
            break;
          case 'status':
            aValue = a.status;
            bValue = b.status;
            break;
          case 'due_date':
            aValue = new Date(a.due_date);
            bValue = new Date(b.due_date);
            break;
          case 'created_at':
            aValue = new Date(a.created_at);
            bValue = new Date(b.created_at);
            break;
          default:
            aValue = a[this.sortKey];
            bValue = b[this.sortKey];
        }
        
        const order = this.sortOrders[this.sortKey];
        if (order === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    },
    
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrders[key] = this.sortOrders[key] === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrders[key] = 'asc';
      }
      this.filterInvoices();
    },
    
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    
    refreshInvoices() {
      this.loadInvoices();
    },
    
    getStatusBadgeClass(status) {
      switch (status) {
        case 'paid':
          return 'badge bg-success';
        case 'pending':
          return 'badge bg-warning';
        case 'cancelled':
          return 'badge bg-danger';
        default:
          return 'badge bg-secondary';
      }
    },
    
    getStatusText(status) {
      switch (status) {
        case 'paid':
          return 'Paid';
        case 'pending':
          return 'Pending';
        case 'cancelled':
          return 'Cancelled';
        default:
          return 'Unknown';
      }
    },
    
    getDueDateClass(dueDate) {
      const due = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (due < today) {
        return 'text-danger fw-bold';
      } else if (due.getTime() === today.getTime()) {
        return 'text-warning fw-bold';
      } else {
        return 'text-muted';
      }
    },
    
    formatDate(date) {
      if (!date) return 'N/A';
      return new Date(date).toLocaleDateString();
    },
    
    async viewInvoice(invoice) {
      // TODO: Implement invoice view modal
      this.$swal({
        title: "Invoice Details",
        html: `
          <div class="text-start">
            <p><strong>Invoice Number:</strong> ${invoice.invoice_number}</p>
            <p><strong>Member:</strong> ${invoice.member?.membername || 'N/A'}</p>
            <p><strong>Plan:</strong> ${invoice.subscription_plan?.name || 'N/A'}</p>
            <p><strong>Amount:</strong> $${parseFloat(invoice.amount).toFixed(2)}</p>
            <p><strong>Status:</strong> ${this.getStatusText(invoice.status)}</p>
            <p><strong>Due Date:</strong> ${this.formatDate(invoice.due_date)}</p>
            <p><strong>Description:</strong> ${invoice.description || 'N/A'}</p>
          </div>
        `,
        confirmButtonText: 'Close'
      });
    },
    
    async markAsPaid(invoice) {
      try {
        const response = await window.axios.put(`invoices/${invoice.id}/mark-as-paid`);
        
        if (response.data.success) {
          this.$swal({
            title: 'Success',
            text: 'Invoice marked as paid successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          await this.loadInvoices();
        } else {
          this.$swal({
            title: 'Error',
            text: response.data.message || 'Failed to update invoice',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      } catch (error) {
        console.error('Error updating invoice:', error);
        this.$swal({
          title: 'Error',
          text: 'Failed to update invoice. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    },
    
    async cancelInvoice(invoice) {
      const result = await this.$swal({
        title: 'Confirm Cancellation',
        text: 'Are you sure you want to cancel this invoice?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Cancel',
        cancelButtonText: 'No, Keep'
      });
      
      if (result.isConfirmed) {
        try {
          const response = await window.axios.put(`invoices/${invoice.id}/cancel`);
          
          if (response.data.success) {
            this.$swal({
              title: 'Success',
              text: 'Invoice cancelled successfully',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            await this.loadInvoices();
          } else {
            this.$swal({
              title: 'Error',
              text: response.data.message || 'Failed to cancel invoice',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        } catch (error) {
          console.error('Error cancelling invoice:', error);
          this.$swal({
            title: 'Error',
            text: 'Failed to cancel invoice. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    },
    
    async downloadInvoice(invoice) {
      // TODO: Implement PDF download
      this.$swal({
        title: 'Download Invoice',
        text: 'PDF download functionality will be implemented here.',
        icon: 'info',
        confirmButtonText: 'OK'
      });
    },
    
    getCurrentDate() {
      const today = new Date();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const year = today.getFullYear();
      return `${month}/${day}/${year}`;
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
        bill_to: null,
        sold_by: this.invoiceForm.sold_by || '',
        member_id: null,
        subscription_plan_id: null,
        amount: 0
      };
    },
    
    async loadPlans() {
      try {
        const response = await window.axios.get('plans', {
          params: { status: 'active' }
        });
        if (response.data.success) {
          this.plans = response.data.data || [];
        }
      } catch (error) {
        console.error('Error loading plans:', error);
        this.$swal({
          title: 'Error',
          text: 'Failed to load plans',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    },
    
    onPlanChange() {
      if (this.invoiceForm.subscription_plan_id) {
        const selectedPlan = this.plans.find(p => p.id === this.invoiceForm.subscription_plan_id);
        if (selectedPlan && selectedPlan.price) {
          this.invoiceForm.amount = parseFloat(selectedPlan.price);
        }
      } else {
        this.invoiceForm.amount = 0;
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
        this.$swal({
          title: 'Error',
          text: 'Failed to load members',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    },
    
    getMemberName(member) {
      return member.membername || 
             (member.firstname && member.lastname ? `${member.firstname} ${member.lastname}` : '') ||
             member.name || 
             'Unknown';
    },
    
    loadAdminName() {
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
        this.$swal({
          title: 'Validation Error',
          text: 'Please select a payment method',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }

      if (!this.invoiceForm.bill_to) {
        this.$swal({
          title: 'Validation Error',
          text: 'Please select a member to bill',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }

      this.isSubmitting = true;

      try {
        // Prepare invoice data
        const invoiceData = {
          member_id: this.invoiceForm.bill_to,
          subscription_plan_id: this.invoiceForm.subscription_plan_id || null,
          payment_method: this.invoiceForm.payment_method,
          invoice_text: this.invoiceForm.invoice_text,
          supplementary_text: this.invoiceForm.supplementary_text,
          sold_by: this.invoiceForm.sold_by,
          is_guest: false,
          due_date: this.formatDateForBackend(this.invoiceForm.date),
          amount: this.invoiceForm.amount || 0,
          description: this.invoiceForm.supplementary_text || 'Invoice created'
        };

        console.log('Submitting invoice data:', invoiceData);
        const response = await window.axios.post('invoices', invoiceData);

        if (response.data.success) {
          this.$swal({
            title: 'Success',
            text: 'Invoice created successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          
          this.closeCreateInvoiceModal();
          await this.loadInvoices();
        } else {
          throw new Error(response.data.message || 'Failed to create invoice');
        }
      } catch (error) {
        console.error('Error creating invoice:', error);
        console.error('Error response:', error.response);
        console.error('Error data:', error.response?.data);
        
        let errorMessage = 'Failed to create invoice';
        
        if (error.response) {
          // Server responded with error
          if (error.response.data) {
            if (error.response.data.message) {
              errorMessage = error.response.data.message;
            } else if (error.response.data.error) {
              errorMessage = error.response.data.error;
            } else if (error.response.data.errors) {
              // Validation errors
              const errors = error.response.data.errors;
              const errorList = Object.keys(errors).map(key => {
                return `${key}: ${Array.isArray(errors[key]) ? errors[key].join(', ') : errors[key]}`;
              }).join('\n');
              errorMessage = `Validation errors:\n${errorList}`;
            }
          }
          
          // Add status code info for debugging
          if (error.response.status === 500) {
            errorMessage += '\n\nServer error. Please check the server logs for details.';
          }
        } else if (error.request) {
          errorMessage = 'No response from server. Please check your connection.';
        } else {
          errorMessage = error.message || 'An unexpected error occurred';
        }
        
        this.$swal({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK'
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
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/sass/_variables.scss";

.invoices-container {
  padding: 20px;
  background: linear-gradient(135deg, $color-background 0%, #e8e8e6 100%);
  min-height: 100vh;
}

.card {
  border: none;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background: $color-white;
}

.card-header {
  background: $color-background-sidebar;
  color: white !important;
  border-radius: 15px 15px 0 0 !important;
  padding: 20px;
  border: none;
}

.card-header h4 {
  margin: 0;
  font-weight: 600;
}

.header-actions .btn {
  border-radius: 8px;
  font-weight: 500;
}

.card-body {
  padding: 30px;
}

.search-filter-section {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid #e9ecef;
}

.form-group {
  margin-bottom: 0;
}

.form-group label {
  font-weight: 600;
  color: $color-subtitle;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.form-control {
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: $primary;
  box-shadow: 0 0 0 0.2rem rgba(79, 112, 92, 0.25);
}

// Meals Table Styling
.meals-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  margin-bottom: 0;

  th {
    background: #f8f9fa;
    color: $color-text-dark;
    font-weight: 600;
    padding: 1rem 0.75rem;
    text-align: left;
    border-bottom: 2px solid #dee2e6;
    white-space: nowrap;

    &.sortable {
      cursor: pointer;
      user-select: none;
      transition: background-color 0.2s ease;

      &:hover {
        background: #e9ecef;
      }

      i {
        margin-left: 0.5rem;
        opacity: 0.5;
        transition: opacity 0.2s ease;
      }

      &:hover i {
        opacity: 0.8;
      }
    }
  }

  td {
    padding: 0.75rem;
    border-bottom: 1px solid #dee2e6;
    vertical-align: top;

    &.invoice-number {
      font-weight: 500;
      color: $color-text-dark;
    }

    &.member-name {
      font-weight: 500;
      color: $color-text-dark;
    }

    &.plan-name {
      .plan-badge {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
        color: #000000;
        font-weight: 500;
        text-transform: capitalize;
        background: #e9ecef;
        color: #495057;
      }
    }

    &.amount {
      text-align: right;
      font-weight: 500;
      color: $color-text-dark;
    }

    &.status {
      .badge {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: capitalize;
      }
    }

    &.due-date,
    &.created-date {
      font-size: 0.8rem;
      color: $color-muted;
    }

    &.actions {
      white-space: nowrap;

      .action-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-right: 0.5rem;

        &.view-btn {
          background: #e3f2fd;
          color: #1976d2;

          &:hover {
            background: #bbdefb;
          }
        }

        &.edit-btn {
          background: #fff3e0;
          color: #f57c00;

          &:hover {
            background: #ffe0b2;
          }
        }

        &.delete-btn {
          background: #ffebee;
          color: #d32f2f;

          &:hover {
            background: #ffcdd2;
          }
        }
      }
    }
  }

  .meal-row {
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f8f9fa;
    }
  }
}

.member-info {
  display: flex;
  flex-direction: column;
}

.member-name-text {
  font-weight: 600;
  color: $color-subtitle;
}

.amount-value {
  font-weight: 700;
  color: $primary;
  font-size: 1.1rem;
}

.badge {
  padding: 6px 12px;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 20px;
}

.action-buttons {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.pagination-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.pagination-info {
  color: $color-subtitle;
  font-size: 0.9rem;
}

.pagination .page-link {
  color: $primary;
  border: 1px solid #dee2e6;
  padding: 8px 12px;
  margin: 0 2px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.pagination .page-link:hover {
  background: $primary;
  color: white;
  border-color: $primary;
}

.pagination .page-item.active .page-link {
  background: $primary;
  border-color: $primary;
}

.pagination .page-item.disabled .page-link {
  color: #6c757d;
  background: #f8f9fa;
  border-color: #dee2e6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .invoices-container {
    padding: 10px;
  }
  
  .card-body {
    padding: 20px;
  }
  
  .search-filter-section {
    padding: 15px;
  }
  
  .meals-table {
    font-size: 0.8rem;

    th,
    td {
      padding: 0.5rem 0.4rem;
    }
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 3px;
  }
  
  .action-buttons .action-btn {
    width: 100%;
    justify-content: center;
  }
}

/* Loading Animation */
.spinner-border {
  width: 3rem;
  height: 3rem;
}

/* Alert Styling */
.alert {
  border-radius: 10px;
  border: none;
  padding: 15px 20px;
}

/* Empty State */
.text-center.py-5 {
  color: $color-subtitle;
}

.text-center.py-5 i {
  opacity: 0.5;
}

.action-section {
  display: flex;
  gap: 10px;
  align-items: center;
}

.create-invoice-modal {
  .section-title {
    font-size: 1rem;
    font-weight: 600;
    color: $color-heading;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #dee2e6;
  }
  
  .form-group {
    label {
      font-weight: 500;
      color: $color-text-dark;
      margin-bottom: 0.5rem;
    }
    
    .form-control {
      border-color: #ced4da;
      
      &:focus {
        border-color: $primary;
        box-shadow: 0 0 0 0.2rem rgba(79, 112, 92, 0.25);
      }
      
      &:disabled,
      &[readonly] {
        background-color: #f8f9fa;
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
    padding-top: 1rem;
  }
}
</style>