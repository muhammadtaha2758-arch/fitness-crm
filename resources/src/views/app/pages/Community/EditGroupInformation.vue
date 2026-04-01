<template>
  <div class="edit-group-info">
    <!-- Breadcrumb Navigation -->
    <div class="breadcrumb-nav-row">
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
              <li class="breadcrumb-item">
                <router-link to="/app/community/group">
                  Groups
                </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ isEditMode ? 'Edit Group' : 'Create New Group' }}
              </li>
            </ol>
          </div>
        </nav>
      </div>
    </div>

    <div class="form-container">
      <h2>{{ isEditMode ? 'Edit Group Information' : 'Create New Group' }}</h2>
      
      <form @submit.prevent="saveGroupInfo" enctype="multipart/form-data">
        <!-- Group Name -->
        <div class="form-group">
          <label for="groupName">Group Name <span class="required">*</span></label>
          <input
            id="groupName"
            v-model="groupName"
            type="text"
            placeholder="Enter group name"
            required
            class="form-control"
          />
        </div>

        <!-- Group Description -->
        <div class="form-group">
          <label for="groupDescription">Description</label>
          <textarea
            id="groupDescription"
            v-model="groupDescription"
            placeholder="Enter group description (e.g., Check this group for daily updates, promotions and deals to stay in the loop!)"
            rows="4"
            class="form-control"
          ></textarea>
        </div>

        <!-- Avatar/Cover Photo Upload -->
        <div class="form-group">
          <label for="avatar">Group Avatar/Cover Photo</label>
          <div class="avatar-upload-section">
            <div class="avatar-preview" v-if="avatarPreview">
              <img :src="avatarPreview" alt="Avatar preview" />
              <button type="button" class="remove-avatar-btn" @click="removeAvatar">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="avatar-placeholder" v-else>
              <i class="fas fa-image"></i>
              <p>No image selected</p>
            </div>
            <div class="upload-controls">
              <input
                type="file"
                id="avatar"
                ref="avatarInput"
                accept="image/*"
                @change="handleAvatarSelect"
                style="display: none"
              />
              <button type="button" class="btn-upload" @click="$refs.avatarInput.click()">
                <i class="fas fa-upload"></i>
                {{ avatarPreview ? 'Change Image' : 'Upload Image' }}
              </button>
            </div>
            <small class="form-text">Recommended: Square image, max 2MB (JPEG, PNG, JPG, GIF)</small>
          </div>
        </div>

        <!-- Member Selection (Optional) -->
        <div class="form-group">
          <label for="members">Add Members (Optional)</label>
          <div class="member-selection">
            <div class="search-members">
              <input
                type="text"
                v-model="memberSearchQuery"
                @input="searchMembers"
                placeholder="Search members to add..."
                class="form-control"
              />
              <div class="member-suggestions" v-if="memberSuggestions.length > 0 && memberSearchQuery">
                <div
                  v-for="member in memberSuggestions"
                  :key="member.id"
                  class="suggestion-item"
                  @click="addMember(member)"
                >
                  <div class="member-info">
                    <span class="member-name">{{ getMemberName(member) }}</span>
                    <span class="member-email">{{ member.email || '' }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="selected-members" v-if="selectedMembers.length > 0">
              <div
                v-for="member in selectedMembers"
                :key="member.id"
                class="selected-member-tag"
              >
                <span>{{ getMemberName(member) }}</span>
                <button type="button" @click="removeMember(member.id)" class="remove-member-btn">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="goBack">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary" :disabled="isSaving">
            <i class="fas fa-spinner fa-spin" v-if="isSaving"></i>
            <i class="fas fa-save" v-else></i>
            {{ isSaving ? 'Saving...' : (isEditMode ? 'Update Group' : 'Create Group') }}
          </button>
        </div>
      </form>

      <!-- Success/Error Messages -->
      <div v-if="successMessage" class="alert alert-success">
        <i class="fas fa-check-circle"></i>
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="alert alert-danger">
        <i class="fas fa-exclamation-circle"></i>
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditGroupInformation",
  data() {
    return {
      groupName: "",
      groupDescription: "",
      avatarFile: null,
      avatarPreview: null,
      selectedMembers: [],
      memberSearchQuery: "",
      memberSuggestions: [],
      isSaving: false,
      successMessage: "",
      errorMessage: "",
      isEditMode: false,
      groupId: null,
      currentUser: null,
      gymId: null
    };
  },
  mounted() {
    // Check if we're editing an existing group
    if (this.$route.params.id) {
      this.isEditMode = true;
      this.groupId = this.$route.params.id;
      this.loadGroupData();
    }
    // Load current user to potentially add as member
    this.loadCurrentUser();
  },
  methods: {
    goBack() {
      this.$router.push('/app/community/group');
    },
    
    async loadCurrentUser() {
      try {
        const response = await axios.get('user');
        if (response.data && response.data.id) {
          this.currentUser = response.data;
          // Store gym_id from the logged-in user
          this.gymId = response.data.gym_id || null;
        }
      } catch (error) {
        console.error('Error loading current user:', error);
      }
    },

    async loadGroupData() {
      try {
        const response = await axios.get(`communication/groups/${this.groupId}`);
        if (response.data && response.data.success && response.data.group) {
          const group = response.data.group;
          this.groupName = group.name || "";
          this.groupDescription = group.description || "";
          if (group.avatar) {
            this.avatarPreview = group.avatar.startsWith('http') 
              ? group.avatar 
              : `/${group.avatar}`;
          }
          // Load members if available
          if (group.members) {
            this.selectedMembers = group.members;
          }
        }
      } catch (error) {
        console.error('Error loading group data:', error);
        this.showError('Failed to load group information');
      }
    },

    handleAvatarSelect(event) {
      const file = event.target.files[0];
      if (file) {
        // Validate file size (2MB max)
        if (file.size > 2 * 1024 * 1024) {
          this.showError('Image size must be less than 2MB');
          return;
        }
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          this.showError('Please select a valid image file');
          return;
        }

        this.avatarFile = file;
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatarPreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    removeAvatar() {
      this.avatarFile = null;
      this.avatarPreview = null;
      if (this.$refs.avatarInput) {
        this.$refs.avatarInput.value = '';
      }
    },

    async searchMembers() {
      if (!this.memberSearchQuery || this.memberSearchQuery.length < 2) {
        this.memberSuggestions = [];
        return;
      }

      try {
        const response = await axios.get('get_members_without_paginate');
        // Handle both array response and wrapped response
        const allMembers = Array.isArray(response.data) 
          ? response.data 
          : (response.data?.data || response.data?.members || []);
        
        if (!Array.isArray(allMembers)) {
          console.error('Invalid members data format:', response.data);
          this.memberSuggestions = [];
          return;
        }
        
        // Filter members based on search query
        const query = this.memberSearchQuery.toLowerCase();
        this.memberSuggestions = allMembers
          .filter(member => {
            // Ensure member has required properties
            if (!member || !member.id) return false;
            
            const name = this.getMemberName(member).toLowerCase();
            const email = (member.email || '').toLowerCase();
            return (name.includes(query) || email.includes(query)) &&
                   !this.selectedMembers.find(m => m.id === member.id);
          })
          .slice(0, 10); // Limit to 10 suggestions
      } catch (error) {
        console.error('Error searching members:', error);
        this.memberSuggestions = [];
        // Show user-friendly error message
        if (error.response?.status === 401) {
          this.showError('Please log in to search members');
        } else {
          this.showError('Failed to load members. Please try again.');
        }
      }
    },

    addMember(member) {
      if (!this.selectedMembers.find(m => m.id === member.id)) {
        this.selectedMembers.push(member);
        this.memberSearchQuery = '';
        this.memberSuggestions = [];
      }
    },

    removeMember(memberId) {
      this.selectedMembers = this.selectedMembers.filter(m => m.id !== memberId);
    },

    getMemberName(member) {
      if (member.membername) return member.membername;
      if (member.name) return member.name;
      if (member.firstname && member.lastname) {
        return `${member.firstname} ${member.lastname}`;
      }
      return 'Unknown Member';
    },

    async saveGroupInfo() {
      // Clear previous messages
      this.successMessage = "";
      this.errorMessage = "";

      // Validate required fields
      if (!this.groupName.trim()) {
        this.showError('Group name is required');
        return;
      }

      this.isSaving = true;

      try {
        const formData = new FormData();
        formData.append('name', this.groupName.trim());
        formData.append('description', this.groupDescription.trim() || '');
        
        // Add gym_id from the logged-in user
        if (this.gymId) {
          formData.append('gym_id', this.gymId);
        }
        
        // Add avatar if selected
        if (this.avatarFile) {
          formData.append('avatar', this.avatarFile);
        }

        // Add member IDs (at least include current user or empty array)
        // The API requires member_ids, so we'll send at least an empty array
        // or we can modify backend to make it optional
        const memberIds = this.selectedMembers.map(m => m.id);
        
        // If no members selected, send empty array (backend might need at least one)
        // For now, we'll send empty array and let backend handle it
        formData.append('member_ids', JSON.stringify(memberIds.length > 0 ? memberIds : []));

        let response;
        if (this.isEditMode) {
          // Update existing group
          response = await axios.post(`communication/groups/${this.groupId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        } else {
          // Create new group
          response = await axios.post('communication/groups', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        }

        if (response.data && response.data.success) {
          this.showSuccess(response.data.message || 'Group saved successfully!');
          
          // Redirect after 1.5 seconds
          setTimeout(() => {
            this.$router.push('/app/community/group');
          }, 1500);
        } else {
          this.showError(response.data.message || 'Failed to save group');
        }
      } catch (error) {
        console.error('Error saving group:', error);
        const errorMessage = error.response?.data?.message || 
                            error.response?.data?.error || 
                            'Failed to save group. Please try again.';
        this.showError(errorMessage);
      } finally {
        this.isSaving = false;
      }
    },

    showSuccess(message) {
      this.successMessage = message;
      this.errorMessage = "";
      setTimeout(() => {
        this.successMessage = "";
      }, 5000);
    },

    showError(message) {
      this.errorMessage = message;
      this.successMessage = "";
      setTimeout(() => {
        this.errorMessage = "";
      }, 5000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/sass/_variables.scss";

.edit-group-info {
  min-height: 100vh;
  background: #f5f5f3;
  padding: 20px;
}

.breadcrumb-nav-row {
  margin-bottom: 20px;
}

.breadcrumb-section {
  max-width: 1200px;
  margin: 0 auto;
}

.breadcrumb-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.back-button {
  background: none;
  border: none;
  color: #dc3545;
  font-size: 18px;
  cursor: pointer;
  padding: 5px 10px;
  transition: all 0.3s ease;
}

.back-button:hover {
  transform: translateX(-3px);
}

.breadcrumb {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 10px;
  align-items: center;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 10px;
  
  &:not(:last-child)::after {
    content: '/';
    color: #6c757d;
    margin-left: 10px;
    font-weight: normal;
  }
  
  a {
    color: #6c757d;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #dc3545;
    }
  }
  
  &.active {
    color: #252525;
    font-weight: 500;
  }
}

.form-container {
  max-width: 600px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 30px;
  font-size: 24px;
  color: #252525;
  text-align: center;
  font-weight: 600;
}

.form-group {
  margin-bottom: 25px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #495057;
  font-weight: 500;
  font-size: 14px;
}

.required {
  color: #dc3545;
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  font-size: 15px;
  background: #fafbfc;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &:focus {
    border-color: #dc3545;
    outline: none;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
  }
}

textarea.form-control {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

.form-text {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #6c757d;
}

/* Avatar Upload Section */
.avatar-upload-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.avatar-preview {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e9ecef;
  margin: 0 auto;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.remove-avatar-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(220, 53, 69, 1);
    transform: scale(1.1);
  }
}

.avatar-placeholder {
  width: 200px;
  height: 200px;
  border: 2px dashed #dcdcdc;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  margin: 0 auto;
  
  i {
    font-size: 48px;
    margin-bottom: 10px;
  }
  
  p {
    margin: 0;
    font-size: 14px;
  }
}

.upload-controls {
  display: flex;
  justify-content: center;
}

.btn-upload {
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #c82333;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
  }
}

/* Member Selection */
.member-selection {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.search-members {
  position: relative;
}

.member-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-top: 5px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.suggestion-item {
  padding: 12px 15px;
  cursor: pointer;
  transition: background 0.2s ease;
  border-bottom: 1px solid #f8f9fa;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
}

.member-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.member-name {
  font-weight: 500;
  color: #252525;
  font-size: 14px;
}

.member-email {
  font-size: 12px;
  color: #6c757d;
}

.selected-members {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.selected-member-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #e9ecef;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  color: #495057;
}

.remove-member-btn {
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 0;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background: #dc3545;
    color: white;
  }
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.btn-secondary {
  background: #6c757d;
  color: white;
  
  &:hover:not(:disabled) {
    background: #5a6268;
    transform: translateY(-1px);
  }
}

.btn-primary {
  background: #dc3545;
  color: white;
  
  &:hover:not(:disabled) {
    background: #c82333;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
  }
}

/* Alerts */
.alert {
  padding: 12px 15px;
  border-radius: 8px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.alert-success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-danger {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-container {
    padding: 20px;
    margin: 20px;
  }
  
  h2 {
    font-size: 20px;
  }
  
  .avatar-preview,
  .avatar-placeholder {
    width: 150px;
    height: 150px;
  }
  
  .form-actions {
    flex-direction: column;
    
    .btn {
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
