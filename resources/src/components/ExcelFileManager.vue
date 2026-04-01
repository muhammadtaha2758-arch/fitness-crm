<template>
  <div class="excel-file-manager">
    <!-- Header Section -->
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">
          <i class="fas fa-file-excel text-success mr-2"></i>
          Excel File Manager
        </h5>
        <div class="d-flex gap-2">
          <button 
            class="btn btn-primary btn-sm" 
            @click="showUploadModal = true"
          >
            <i class="fas fa-upload mr-1"></i>
            Upload File
          </button>
          <button 
            class="btn btn-info btn-sm" 
            @click="loadStats"
          >
            <i class="fas fa-chart-bar mr-1"></i>
            Statistics
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Card -->
    <div v-if="stats" class="row mb-4">
      <div class="col-md-3">
        <div class="card bg-primary text-white">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div>
                <h6 class="card-title">Total Files</h6>
                <h3>{{ stats.total_files }}</h3>
              </div>
              <i class="fas fa-file fa-2x opacity-75"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-success text-white">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div>
                <h6 class="card-title">Active Files</h6>
                <h3>{{ stats.active_files }}</h3>
              </div>
              <i class="fas fa-check-circle fa-2x opacity-75"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-warning text-white">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div>
                <h6 class="card-title">Total Size</h6>
                <h3>{{ formatFileSize(stats.total_size) }}</h3>
              </div>
              <i class="fas fa-hdd fa-2x opacity-75"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-info text-white">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div>
                <h6 class="card-title">Recent Uploads</h6>
                <h3>{{ stats.recent_uploads }}</h3>
              </div>
              <i class="fas fa-clock fa-2x opacity-75"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-search"></i>
                </span>
              </div>
              <input 
                type="text" 
                class="form-control" 
                placeholder="Search files..."
                v-model="searchQuery"
                @input="debounceSearch"
              >
            </div>
          </div>
          <div class="col-md-3">
            <select class="form-control" v-model="statusFilter">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div class="col-md-3">
            <button 
              class="btn btn-danger btn-sm" 
              @click="bulkDelete"
              :disabled="selectedFiles.length === 0"
            >
              <i class="fas fa-trash mr-1"></i>
              Delete Selected ({{ selectedFiles.length }})
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Files Table -->
    <div class="card">
      <div class="card-body">
        <div v-if="loading" class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <div v-else-if="files.length === 0" class="text-center py-4">
          <i class="fas fa-file-excel fa-3x text-muted mb-3"></i>
          <p class="text-muted">No Excel files found</p>
        </div>

        <div v-else>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>
                    <input 
                      type="checkbox" 
                      @change="toggleSelectAll"
                      :checked="selectedFiles.length === files.length"
                    >
                  </th>
                  <th>File Name</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Uploaded By</th>
                  <th>Upload Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="file in files" :key="file.id">
                  <td>
                    <input 
                      type="checkbox" 
                      :value="file.id"
                      v-model="selectedFiles"
                    >
                  </td>
                  <td>
                    <div>
                      <strong>{{ file.original_name }}</strong>
                      <br>
                      <small class="text-muted">{{ file.description || 'No description' }}</small>
                    </div>
                  </td>
                  <td>
                    <span class="badge badge-secondary">
                      {{ file.file_type.toUpperCase() }}
                    </span>
                  </td>
                  <td>{{ formatFileSize(file.file_size) }}</td>
                  <td>{{ file.uploader ? file.uploader.username : 'Unknown' }}</td>
                  <td>{{ formatDate(file.created_at) }}</td>
                  <td>
                    <span 
                      class="badge"
                      :class="{
                        'badge-success': file.status === 'active',
                        'badge-warning': file.status === 'archived',
                        'badge-danger': file.status === 'deleted'
                      }"
                    >
                      {{ file.status }}
                    </span>
                  </td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <button 
                        class="btn btn-success btn-sm"
                        @click="downloadFile(file)"
                        title="Download"
                      >
                        <i class="fas fa-download"></i>
                      </button>
                      <button 
                        class="btn btn-info btn-sm"
                        @click="editFile(file)"
                        title="Edit"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button 
                        class="btn btn-danger btn-sm"
                        @click="deleteFile(file)"
                        title="Delete"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <nav v-if="pagination" class="mt-3">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: !pagination.prev_page_url }">
                <button class="page-link" @click="loadPage(pagination.current_page - 1)">
                  Previous
                </button>
              </li>
              <li 
                v-for="page in visiblePages" 
                :key="page"
                class="page-item"
                :class="{ active: page === pagination.current_page }"
              >
                <button class="page-link" @click="loadPage(page)">
                  {{ page }}
                </button>
              </li>
              <li class="page-item" :class="{ disabled: !pagination.next_page_url }">
                <button class="page-link" @click="loadPage(pagination.current_page + 1)">
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <b-modal 
      v-model="showUploadModal" 
      title="Upload Excel File"
      size="md"
      @ok="uploadFile"
      @cancel="resetUploadForm"
    >
      <form @submit.prevent="uploadFile">
        <div class="form-group">
          <label>Select Excel File</label>
          <input 
            type="file" 
            class="form-control" 
            ref="fileInput"
            accept=".xlsx,.xls,.csv"
            @change="handleFileSelect"
            required
          >
          <small class="form-text text-muted">
            Supported formats: .xlsx, .xls, .csv (Max 10MB)
          </small>
        </div>
        <div class="form-group">
          <label>Description (Optional)</label>
          <textarea 
            class="form-control" 
            rows="3"
            v-model="uploadForm.description"
            placeholder="Enter file description..."
          ></textarea>
        </div>
      </form>
    </b-modal>

    <!-- Edit Modal -->
    <b-modal 
      v-model="showEditModal" 
      title="Edit File Details"
      size="md"
      @ok="updateFile"
    >
      <form @submit.prevent="updateFile">
        <div class="form-group">
          <label>Description</label>
          <textarea 
            class="form-control" 
            rows="3"
            v-model="editForm.description"
            placeholder="Enter file description..."
          ></textarea>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select class="form-control" v-model="editForm.status">
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ExcelFileManager',
  data() {
    return {
      files: [],
      stats: null,
      loading: false,
      searchQuery: '',
      statusFilter: '',
      selectedFiles: [],
      pagination: null,
      showUploadModal: false,
      showEditModal: false,
      uploadForm: {
        file: null,
        description: ''
      },
      editForm: {
        id: null,
        description: '',
        status: 'active'
      },
      searchTimeout: null
    };
  },
  computed: {
    visiblePages() {
      if (!this.pagination) return [];
      const current = this.pagination.current_page;
      const last = this.pagination.last_page;
      const pages = [];
      
      for (let i = Math.max(1, current - 2); i <= Math.min(last, current + 2); i++) {
        pages.push(i);
      }
      
      return pages;
    }
  },
  mounted() {
    this.loadFiles();
    this.loadStats();
  },
  methods: {
    async loadFiles(page = 1) {
      this.loading = true;
      try {
        const params = {
          page,
          search: this.searchQuery,
          status: this.statusFilter
        };
        
        const response = await axios.get('/api/excel-files', { params });
        this.files = response.data.data.data;
        this.pagination = response.data.data;
      } catch (error) {
        this.showError('Error loading files: ' + error.message);
      } finally {
        this.loading = false;
      }
    },
    
    async loadStats() {
      try {
        const response = await axios.get('/api/excel-files/stats');
        this.stats = response.data.data;
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    },
    
    handleFileSelect(event) {
      this.uploadForm.file = event.target.files[0];
    },
    
    async uploadFile() {
      if (!this.uploadForm.file) {
        this.showError('Please select a file');
        return;
      }
      
      const formData = new FormData();
      formData.append('file', this.uploadForm.file);
      formData.append('description', this.uploadForm.description);
      
      try {
        await axios.post('/api/excel-files', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        this.showSuccess('File uploaded successfully');
        this.showUploadModal = false;
        this.resetUploadForm();
        this.loadFiles();
        this.loadStats();
      } catch (error) {
        this.showError('Error uploading file: ' + error.message);
      }
    },
    
    async downloadFile(file) {
      try {
        const response = await axios.get(`/api/excel-files/${file.id}/download`, {
          responseType: 'blob'
        });
        
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.original_name);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        this.showError('Error downloading file: ' + error.message);
      }
    },
    
    editFile(file) {
      this.editForm = {
        id: file.id,
        description: file.description || '',
        status: file.status
      };
      this.showEditModal = true;
    },
    
    async updateFile() {
      try {
        await axios.put(`/api/excel-files/${this.editForm.id}`, {
          description: this.editForm.description,
          status: this.editForm.status
        });
        
        this.showSuccess('File updated successfully');
        this.showEditModal = false;
        this.loadFiles();
      } catch (error) {
        this.showError('Error updating file: ' + error.message);
      }
    },
    
    async deleteFile(file) {
      if (!confirm(`Are you sure you want to delete "${file.original_name}"?`)) {
        return;
      }
      
      try {
        await axios.delete(`/api/excel-files/${file.id}`);
        this.showSuccess('File deleted successfully');
        this.loadFiles();
        this.loadStats();
      } catch (error) {
        this.showError('Error deleting file: ' + error.message);
      }
    },
    
    async bulkDelete() {
      if (this.selectedFiles.length === 0) {
        this.showError('Please select files to delete');
        return;
      }
      
      if (!confirm(`Are you sure you want to delete ${this.selectedFiles.length} files?`)) {
        return;
      }
      
      try {
        await axios.post('/api/excel-files/bulk-delete', {
          file_ids: this.selectedFiles
        });
        
        this.showSuccess(`${this.selectedFiles.length} files deleted successfully`);
        this.selectedFiles = [];
        this.loadFiles();
        this.loadStats();
      } catch (error) {
        this.showError('Error deleting files: ' + error.message);
      }
    },
    
    toggleSelectAll() {
      if (this.selectedFiles.length === this.files.length) {
        this.selectedFiles = [];
      } else {
        this.selectedFiles = this.files.map(file => file.id);
      }
    },
    
    loadPage(page) {
      this.loadFiles(page);
    },
    
    debounceSearch() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.loadFiles();
      }, 500);
    },
    
    resetUploadForm() {
      this.uploadForm = {
        file: null,
        description: ''
      };
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';
      }
    },
    
    formatFileSize(bytes) {
      if (!bytes) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    
    showSuccess(message) {
      this.$swal({
        icon: 'success',
        title: 'Success',
        text: message,
        timer: 3000
      });
    },
    
    showError(message) {
      this.$swal({
        icon: 'error',
        title: 'Error',
        text: message
      });
    }
  },
  
  watch: {
    statusFilter() {
      this.loadFiles();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/sass/_variables.scss';

.excel-file-manager {
  .card {
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .table {
    th {
      border-top: none;
      font-weight: 600;
      color: $primary;
    }
  }
  
  .badge {
    font-size: 0.75rem;
  }
  
  .btn-group-sm .btn {
    padding: 0.25rem 0.5rem;
  }
  
  .pagination {
    .page-link {
      color: $primary;
      border-color: $primary;
      
      &:hover {
        background-color: $primary;
        border-color: $primary;
        color: white;
      }
    }
    
    .page-item.active .page-link {
      background-color: $primary;
      border-color: $primary;
    }
  }
}
</style>
