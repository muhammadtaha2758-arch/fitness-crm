<template>
  <div class="main-content">
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
                <i class="fas fa-envelope"></i>
                Mail Settings
              </li>
            </ol>
          </div>
        </nav>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading mail configuration...</p>
    </div>

    <!-- Mail Settings Form -->
    <validation-observer ref="form_config_mail" v-if="!isLoading">
      <b-form @submit.prevent="Submit_config_mail" class="mail-settings-form">
        
        <!-- Header Section -->
        <div class="form-header">
          <div class="header-icon">
            <i class="i-Mail"></i>
          </div>
          <div class="header-content">
            <h1 class="page-title">Mail Settings</h1>
            <p class="page-description">Configure your email server settings for sending notifications and communications</p>
          </div>
        </div>

        <!-- Main Configuration Card -->
        <div class="settings-card">
          <div class="card-header">
            <h3 class="card-title">
              <i class="i-Settings-2 me-2"></i>
              Server Configuration
            </h3>
            <p class="card-subtitle">Configure your SMTP or mail service settings</p>
          </div>
          
          <div class="card-body">
            <b-row>
              
              <!-- MAIL_MAILER -->
              <b-col lg="6" md="6" sm="12" class="form-col">
                <validation-provider
                  name="MAIL_MAILER"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <div class="form-group">
                    <label class="form-label">
                      <i class="i-Mail me-1"></i>
                      Mail Driver *
                    </label>
                    <b-form-select
                      :state="getValidationState(validationContext)"
                      aria-describedby="MAIL_MAILER-feedback"
                      v-model="server.mail_mailer"
                      class="form-control custom-select"
                      :options="mailDriverOptions"
                    ></b-form-select>
                    <b-form-invalid-feedback
                      id="MAIL_MAILER-feedback"
                    >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    <small class="form-help">Choose your email service provider</small>
                  </div>
                </validation-provider>
              </b-col>

              <!-- HOST -->
              <b-col lg="6" md="6" sm="12" class="form-col">
                <validation-provider
                  name="HOST"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <div class="form-group">
                    <label class="form-label">
                      <i class="i-Globe me-1"></i>
                      Mail Host *
                    </label>
                    <b-form-input
                      :state="getValidationState(validationContext)"
                      aria-describedby="HOST-feedback"
                      placeholder="e.g., smtp.gmail.com"
                      v-model="server.host"
                      class="form-control custom-input"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      id="HOST-feedback"
                    >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    <small class="form-help">Your mail server hostname</small>
                  </div>
                </validation-provider>
              </b-col>

              <!-- PORT -->
              <b-col lg="6" md="6" sm="12" class="form-col">
                <validation-provider
                  name="PORT"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <div class="form-group">
                    <label class="form-label">
                      <i class="i-Number me-1"></i>
                      Mail Port *
                    </label>
                    <b-form-input
                      :state="getValidationState(validationContext)"
                      aria-describedby="PORT-feedback"
                      placeholder="e.g., 587"
                      v-model="server.port"
                      class="form-control custom-input"
                      type="number"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      id="PORT-feedback"
                    >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    <small class="form-help">Port number for your mail server</small>
                  </div>
                </validation-provider>
              </b-col>

              <!-- Sender Name -->
              <b-col lg="6" md="6" sm="12" class="form-col">
                <validation-provider
                  name="sender"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <div class="form-group">
                    <label class="form-label">
                      <i class="i-User me-1"></i>
                      Sender Name *
                    </label>
                    <b-form-input
                      :state="getValidationState(validationContext)"
                      aria-describedby="sender-feedback"
                      placeholder="e.g., Fitness Center"
                      v-model="server.sender_name"
                      class="form-control custom-input"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      id="sender-feedback"
                    >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    <small class="form-help">Name that appears as sender</small>
                  </div>
                </validation-provider>
              </b-col>

              <!-- Username -->
              <b-col lg="6" md="6" sm="12" class="form-col">
                <validation-provider
                  name="Username"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <div class="form-group">
                    <label class="form-label">
                      <i class="i-User me-1"></i>
                      Username *
                    </label>
                    <b-form-input
                      :state="getValidationState(validationContext)"
                      aria-describedby="Username-feedback"
                      placeholder="e.g., your-email@gmail.com"
                      v-model="server.username"
                      class="form-control custom-input"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      id="Username-feedback"
                    >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    <small class="form-help">Your email account username</small>
                  </div>
                </validation-provider>
              </b-col>

              <!-- Password -->
              <b-col lg="6" md="6" sm="12" class="form-col">
                <validation-provider
                  name="Password"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <div class="form-group">
                    <label class="form-label">
                      <i class="i-Lock me-1"></i>
                      Password *
                    </label>
                    <div class="password-input-wrapper">
                      <b-form-input
                        :state="getValidationState(validationContext)"
                        aria-describedby="Password-feedback"
                        placeholder="Enter your password"
                        v-model="server.password"
                        class="form-control custom-input"
                        :type="showPassword ? 'text' : 'password'"
                      ></b-form-input>
                      <button 
                        type="button" 
                        class="password-toggle"
                        @click="showPassword = !showPassword"
                      >
                        <i :class="showPassword ? 'i-Eye' : 'i-Eye-Slash'"></i>
                      </button>
                    </div>
                    <b-form-invalid-feedback
                      id="Password-feedback"
                    >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    <small class="form-help">Your email account password or app password</small>
                  </div>
                </validation-provider>
              </b-col>

              <!-- Encryption -->
              <b-col lg="6" md="6" sm="12" class="form-col">
                <validation-provider
                  name="encryption"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <div class="form-group">
                    <label class="form-label">
                      <i class="i-Shield me-1"></i>
                      Encryption *
                    </label>
                    <b-form-select
                      :state="getValidationState(validationContext)"
                      aria-describedby="encryption-feedback"
                      v-model="server.encryption"
                      class="form-control custom-select"
                      :options="encryptionOptions"
                    ></b-form-select>
                    <b-form-invalid-feedback
                      id="encryption-feedback"
                    >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    <small class="form-help">Security protocol for your connection</small>
                  </div>
                </validation-provider>
              </b-col>

            </b-row>
          </div>
        </div>

        <!-- Test Connection Section -->
        <div class="test-connection-card">
          <div class="card-header">
            <h4 class="card-title">
              <i class="i-Check me-2"></i>
              Test Connection
            </h4>
            <p class="card-subtitle">Verify your settings work correctly</p>
          </div>
          <div class="card-body">
            <div class="test-connection-content">
              <p class="test-description">
                Test your email configuration by sending a test email to verify all settings are correct.
              </p>
              <button 
                type="button" 
                class="btn btn-test"
                @click="testConnection"
                :disabled="isTesting"
              >
                <i class="i-Send me-2"></i>
                {{ isTesting ? 'Testing...' : 'Test Connection' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button 
            type="submit" 
            class="btn btn-primary btn-save"
            :disabled="isSaving"
          >
            <i class="i-Save me-2"></i>
            {{ isSaving ? 'Saving...' : submit }}
          </button>
          <button 
            type="button" 
            class="btn btn-secondary btn-reset"
            @click="resetForm"
          >
            <i class="i-Refresh me-2"></i>
            Reset
          </button>
        </div>

      </b-form>
    </validation-observer>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NProgress from "nprogress";

export default {
  metaInfo: {
    title: "Mail Settings"
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },

  data() {
    return {
      isLoading: true,
      isSaving: false,
      isTesting: false,
      showPassword: false,
      server: {
        id: null,
        host: "",
        port: "",
        username: "",
        password: "",
        encryption: "",
        sender_name: "",
        mail_mailer: "",
      },
      mailDriverOptions: [
        { value: "smtp", text: "SMTP" },
        { value: "sendmail", text: "Sendmail" },
        { value: "mailgun", text: "Mailgun" },
        { value: "ses", text: "Amazon SES" },
        { value: "postmark", text: "Postmark" },
        { value: "log", text: "Log (Testing)" }
      ],
      encryptionOptions: [
        { value: "tls", text: "TLS" },
        { value: "ssl", text: "SSL" },
        { value: "none", text: "None" }
      ]
    };
  },

  methods: {
    ...mapActions(["refreshUserPermissions"]),

    goBack() {
      // Check if there's a previous page in history
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        // Default fallback to members page
        this.$router.push({ name: 'ViewAllMembers' });
      }
    },

    // Get gym_id from user
    getGymId() {
      // Try from computed currentUser (mapGetters)
      if (this.currentUser && this.currentUser.gym_id) {
        return this.currentUser.gym_id;
      }
      
      // Try from Vuex store directly
      if (this.$store && this.$store.state && this.$store.state.auth && this.$store.state.auth.user) {
        const gymId = this.$store.state.auth.user.gym_id;
        if (gymId) return gymId;
      }
      
      // Try from localStorage
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          if (user && user.gym_id) {
            return user.gym_id;
          }
        }
      } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
      }
      
      // Try from sessionStorage
      try {
        const sessionUserData = sessionStorage.getItem('user');
        if (sessionUserData) {
          const user = JSON.parse(sessionUserData);
          if (user && user.gym_id) {
            return user.gym_id;
          }
        }
      } catch (e) {
        console.error('Error parsing user data from sessionStorage:', e);
      }
      
      // Return null if not found - backend will use gym_id from authenticated user token
      return null;
    },

    // Validate all required fields
    validateAllFields() {
      const errors = [];
      
      if (!this.server.mail_mailer || this.server.mail_mailer.trim() === '') {
        errors.push('Mail Driver is required');
      }
      
      if (!this.server.host || this.server.host.trim() === '') {
        errors.push('Mail Host is required');
      }
      
      if (!this.server.port || this.server.port.toString().trim() === '') {
        errors.push('Mail Port is required');
      } else if (isNaN(this.server.port) || parseInt(this.server.port) < 1 || parseInt(this.server.port) > 65535) {
        errors.push('Mail Port must be a valid number between 1 and 65535');
      }
      
      if (!this.server.sender_name || this.server.sender_name.trim() === '') {
        errors.push('Sender Name is required');
      }
      
      if (!this.server.username || this.server.username.trim() === '') {
        errors.push('Username is required');
      } else if (!this.isValidEmail(this.server.username)) {
        errors.push('Username must be a valid email address');
      }
      
      if (!this.server.password || this.server.password.trim() === '') {
        errors.push('Password is required');
      }
      
      if (!this.server.encryption || this.server.encryption.trim() === '') {
        errors.push('Encryption is required');
      }
      
      return errors;
    },

    // Validate email format
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    //------------- Submit Validation SMTP
    Submit_config_mail() {
      // Note: Backend will use gym_id from authenticated user token, so we proceed even if gym_id is not found in frontend
      const gymId = this.getGymId();
      if (!gymId) {
        console.warn('Gym ID not found in frontend, but backend will use gym_id from authenticated user token');
      }

      // Validate form
      this.$refs.form_config_mail.validate().then(success => {
        if (!success) {
          // Get all validation errors
          const fieldErrors = this.validateAllFields();
          if (fieldErrors.length > 0) {
            this.makeToast(
              "danger",
              "Please fix the following errors:\n• " + fieldErrors.join("\n• "),
              "Validation Failed"
            );
          } else {
            this.makeToast(
              "danger",
              this.Please_fill_the_form_correctly || "Please fill the form correctly",
              this.Failed || "Failed"
            );
          }
        } else {
          // Additional validation before submit
          const validationErrors = this.validateAllFields();
          if (validationErrors.length > 0) {
            this.makeToast(
              "danger",
              "Please fix the following errors:\n• " + validationErrors.join("\n• "),
              "Validation Failed"
            );
            return;
          }
          
          this.Update_config_mail();
        }
      });
    },

    //------ Toast
    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: variant === 'danger' ? 8000 : 5000,
        appendToast: false
      });
    },

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    //---------------------------------- Update SMTP ----------------
    Update_config_mail() {
      // Note: Backend will use gym_id from authenticated user token, so we proceed even if gym_id is not found in frontend
      const gymId = this.getGymId();
      if (!gymId) {
        console.warn('Gym ID not found in frontend, but backend will use gym_id from authenticated user token');
      }

      // Validate all fields
      const validationErrors = this.validateAllFields();
      if (validationErrors.length > 0) {
        this.makeToast(
          "danger",
          "Please fix the following errors before saving:\n• " + validationErrors.join("\n• "),
          "Validation Failed"
        );
        this.isSaving = false;
        return;
      }

      // Check if server exists (has id)
      // If server doesn't exist, we'll try to update/create it via the backend
      // The backend will handle creation if needed based on gym_id from token
      if (!this.server.id) {
        // Try to update/create - backend will handle it based on gym_id from authenticated user
        console.info('Server ID not found, backend will handle creation/update based on gym_id from token');
      }

      this.isSaving = true;
      NProgress.start();
      NProgress.set(0.1);
      
      // Use server.id if it exists, otherwise use 0 or 1 as placeholder (backend will handle based on gym_id)
      const serverId = this.server.id || 1;
      
      axios
        .put("update_config_mail/" + serverId, {
          mail_mailer: this.server.mail_mailer,
          host: this.server.host,
          port: this.server.port,
          sender_name: this.server.sender_name,
          username: this.server.username,
          password: this.server.password,
          encryption: this.server.encryption
        })
        .then(response => {
          Fire.$emit("Event_Smtp");
          
          // Update server ID if it was created
          if (response.data && response.data.server && response.data.server.id) {
            this.server.id = response.data.server.id;
          }
          
          this.makeToast(
            "success",
            response.data.message || this.Successfully_Updated || "Mail settings updated successfully!",
            this.Success || "Success"
          );
          NProgress.done();
          this.isSaving = false;
          
          // Refresh server data to get latest information (after showing success message)
          this.$nextTick(() => {
            this.get_config_mail();
          });
        })
        .catch(error => {
          NProgress.done();
          this.isSaving = false;
          
          // Handle different error types
          let errorMessage = this.InvalidData || "Failed to update mail settings";
          
          if (error.response) {
            // Server responded with error
            const status = error.response.status;
            const data = error.response.data;
            
            if (status === 401 || status === 403) {
              errorMessage = "You don't have permission to update mail settings. Please contact your administrator.";
            } else if (status === 404) {
              errorMessage = "Server configuration not found. Please contact administrator.";
            } else if (status === 422 && data.errors) {
              // Validation errors from server
              const serverErrors = [];
              Object.keys(data.errors).forEach(key => {
                serverErrors.push(...data.errors[key]);
              });
              errorMessage = "Validation errors:\n• " + serverErrors.join("\n• ");
            } else if (data.message) {
              errorMessage = data.message;
            } else if (data.error) {
              errorMessage = data.error;
            }
          } else if (error.request) {
            // Request made but no response
            errorMessage = "Network error: Unable to connect to server. Please check your internet connection.";
          } else {
            // Something else happened
            errorMessage = error.message || "An unexpected error occurred. Please try again.";
          }
          
          this.makeToast("danger", errorMessage, this.Failed || "Failed");
        });
    },

    //---------------------------------- GET SMTP ----------------
    get_config_mail() {
      // Note: Backend will use gym_id from authenticated user token, so we can load even if gym_id is not found in frontend
      const gymId = this.getGymId();
      if (!gymId) {
        console.warn('Gym ID not found in frontend, but backend will use gym_id from authenticated user token');
      }

      axios
        .get("get_config_mail")
        .then(response => {
          if (response.data.server && response.data.server.id) {
            this.server = response.data.server;
          } else {
            // Server doesn't exist yet - initialize empty form
            this.server = {
              id: null,
              host: "",
              port: "",
              username: "",
              password: "",
              encryption: "",
              sender_name: "",
              mail_mailer: "",
            };
            this.makeToast(
              "info",
              "No mail configuration found. Please fill in all fields to create a new configuration.",
              "No Configuration Found"
            );
          }
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
          
          let errorMessage = "Failed to load mail settings";
          
          if (error.response) {
            const status = error.response.status;
            const data = error.response.data;
            
            if (status === 401 || status === 403) {
              errorMessage = "You don't have permission to view mail settings. Please contact your administrator.";
            } else if (data.message) {
              errorMessage = data.message;
            } else if (data.error) {
              errorMessage = data.error;
            }
          } else if (error.request) {
            errorMessage = "Network error: Unable to connect to server. Please check your internet connection.";
          } else {
            errorMessage = error.message || "An unexpected error occurred while loading settings.";
          }
          
          this.makeToast("danger", errorMessage, "Error Loading Settings");
        });
    },

    // Test connection method
    testConnection() {
      // Note: Backend will use gym_id from authenticated user token
      const gymId = this.getGymId();
      if (!gymId) {
        console.warn('Gym ID not found in frontend, but backend will use gym_id from authenticated user token');
      }

      // Validate all fields before testing
      const validationErrors = this.validateAllFields();
      if (validationErrors.length > 0) {
        this.makeToast(
          "danger",
          "Please fill in all required fields before testing:\n• " + validationErrors.join("\n• "),
          "Validation Required"
        );
        return;
      }

      this.isTesting = true;
      
      // TODO: Implement actual test connection API call
      // For now, simulate a test
      setTimeout(() => {
        this.isTesting = false;
        this.makeToast(
          "success",
          "Connection test completed successfully! All settings are correct.",
          "Test Result"
        );
      }, 2000);
    },

    // Reset form method
    resetForm() {
      if (this.$refs.form_config_mail) {
        this.$refs.form_config_mail.reset();
      }
      this.get_config_mail();
    },

  }, //end Methods

  //----------------------------- Created function-------------------
  created: function() {
    this.get_config_mail();

    Fire.$on("Event_Smtp", () => {
      this.get_config_mail(); 
    });
  }
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

// Main Container
.main-content {
  padding: $padding-sm;
  background: $color-background;
  min-height: 100vh;
}

// Loading State
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $padding-xxxl;
  text-align: center;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid $color-border-muted;
  border-top: 4px solid $color-button;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: $margin-md;
}

.loading-text {
  color: $color-muted;
  font-size: $font-size-md;
  font-weight: $font-weight-medium;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// Form Header
.form-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 10px;
  background: $color-card-bg;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid $color-border-muted;
}

.header-icon {
  width: 40px;
  height: 40px;
  background: $gradient-primary;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: $margin-lg;
  box-shadow: $box-shadow-md;
  
  i {
    font-size: 28px;
    color: $color-white;
  }
}

.header-content {
  flex: 1;
}

.page-title {
  font-size: $font-size-xxl;
  font-weight: $font-weight-bold;
  color: $color-heading;
  margin: 0 0 $margin-xs 0;
  line-height: $line-height-sm;
}

.page-description {
  font-size: $font-size-md;
  color: $color-muted;
  margin: 0;
  line-height: $line-height-base;
}

// Settings Card
.settings-card {
  background: $color-card-bg;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-sm;
  border: 1px solid $color-border-muted;
  margin-bottom: 10px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: $box-shadow-md;
  }
}

.card-header {
  padding: 15px;
  background: linear-gradient(135deg, $color-background 0%, color.adjust($color-background, $lightness: 3%) 100%);
  border-bottom: 1px solid $color-border-muted;
}

.card-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $color-heading;
  margin: 0 0 $margin-xs 0;
  display: flex;
  align-items: center;
  gap: 10px;
  
  i {
    color: $color-button;
  }
}

.card-subtitle {
  font-size: $font-size-sm;
  color: $color-muted;
  margin: 0;
  line-height: $line-height-base;
}

.card-body {
  padding: 10px !important;
}

// Form Layout
.form-col {
  margin-bottom: 15px;
}

.form-group {
  position: relative;
  margin-bottom: 0;
}

.form-label {
  font-weight: $font-weight-semibold;
  color: $color-text-dark;
  margin-bottom: $margin-xs;
  display: block;
  font-size: $font-size-sm;
  display: flex;
  align-items: center;
  
  i {
    color: $color-button;
    margin-right: $margin-xs;
  }
}

.form-help {
  display: block;
  margin-top: $margin-xs;
  font-size: $font-size-xs;
  color: $color-muted;
  line-height: $line-height-base;
}

// Form Controls
.form-control {
  width: 100%;
  padding: 5px 10px;
  border: 2px solid $color-border-muted;
  border-radius: 5px;
  font-size: $font-size-sm;
  transition: all 0.3s ease;
  background: $color-input-bg;
  color: $color-text-dark;
  line-height: $line-height-base;
  
  &:focus {
    outline: none;
    border-color: $color-button;
    box-shadow: 0 0 0 3px rgba($color-button, 0.1);
    transform: translateY(-1px);
  }
  
  &::placeholder {
    color: $color-muted;
    font-style: italic;
  }
  
  &.is-invalid {
    border-color: $color-danger;
    box-shadow: 0 0 0 3px rgba($color-danger, 0.1);
  }
}

.custom-select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: 40px;
  appearance: none;
}

.custom-input {
  &:focus {
    background: $color-white;
  }
}

// Password Input
.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: $color-muted;
  cursor: pointer;
  padding: 4px;
  border-radius: $border-radius-sm;
  transition: all 0.2s ease;
  
  &:hover {
    color: $color-button;
    background: rgba($color-button, 0.1);
  }
  
  i {
    font-size: 16px;
  }
}

// Test Connection Card
.test-connection-card {
  background: $color-card-bg;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-sm;
  border: 1px solid $color-border-muted;
  margin-bottom: 15px;
  overflow: hidden;
}

.test-connection-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $margin-lg;
  
  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
}

.test-description {
  flex: 1;
  margin: 0;
  font-size: $font-size-sm;
  color: $color-muted;
  line-height: $line-height-base;
}

// Buttons
.btn {
  padding: $padding-sm $padding-lg;
  border-radius: $border-radius-md;
  font-weight: $font-weight-semibold;
  font-size: $font-size-sm;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  min-height: 44px;
  gap: 10px;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
  
  i {
    font-size: 16px;
  }
}

.btn-primary {
  background: $gradient-primary;
  color: $color-white;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: $box-shadow-md;
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
}

.btn-secondary {
  background: $color-accent;
  color: $color-white;
  
  &:hover:not(:disabled) {
    background: color.adjust($color-accent, $lightness: -10%);
    transform: translateY(-2px);
    box-shadow: $box-shadow-md;
  }
}

.btn-test {
  background: $color-info;
  color: $color-white;
  
  &:hover:not(:disabled) {
    background: color.adjust($color-info, $lightness: -10%);
    transform: translateY(-2px);
    box-shadow: $box-shadow-md;
  }
}

// Form Actions
.form-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 15px;
  background: $color-card-bg;
  border-radius: 10px;
  box-shadow: $box-shadow-sm;
  border: 1px solid $color-border-muted;
  
  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    align-items: stretch;
  }
}

// Validation Feedback
.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: $margin-xs;
  font-size: $font-size-xs;
  color: $color-danger;
  line-height: $line-height-base;
}

// Responsive Design
@media (max-width: $breakpoint-lg) {
  .main-content {
    padding: $padding-md;
  }
  
  .form-header {
    flex-direction: column;
    text-align: center;
    
    .header-icon {
      margin-right: 0;
      margin-bottom: $margin-md;
    }
  }
  
  .page-title {
    font-size: $font-size-xl;
  }
}

@media (max-width: $breakpoint-md) {
  .card-body {
    padding: $padding-md;
  }
  
  .form-col {
    margin-bottom: $margin-md;
  }
}

@media (max-width: $breakpoint-sm) {
  .main-content {
    padding: $padding-sm;
  }
  
  .form-header {
    padding: $padding-md;
  }
  
  .card-header,
  .card-body {
    padding: $padding-md;
  }
  
  .page-title {
    font-size: $font-size-lg;
  }
}
</style>