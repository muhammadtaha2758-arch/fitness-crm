<template>
  <div class="auth-layout-wrap">
    <div class="auth-content">
      <div class="card o-hidden mt-5 mb-5 reset-password-card">
        <div class="row">
          <div class="col-md-12">
            <div class="p-4 reset-password-content">
              <div class="auth-logo text-center mb-30">
                <img :src="'/images/logo.png'" alt class="reset-logo">
              </div>
              
              <h1 class="mb-3 text-18 reset-title">Reset Your Password</h1>
              <p class="text-muted text-center mb-4 reset-subtitle">
                Enter your new password below. Make sure it's at least 6 characters long.
              </p>
              <validation-observer ref="Reset_password">
                <b-form @submit.prevent="Submit_Reset">
                  <validation-provider
                    name="Email Address"
                    :rules="{ required: true}"
                    v-slot="validationContext"
                  >
                    <div class="form-group mb-3">
                      <label for="email" class="form-label text-12 font-weight-bold mb-2">
                        Email Address
                      </label>
                      <b-form-input
                        id="email"
                        :state="getValidationState(validationContext)"
                        aria-describedby="Email-feedback"
                        class="form-control-rounded reset-input"
                        type="email"
                        v-model="email"
                        :readonly="emailPreFilled"
                        :placeholder="emailPreFilled ? 'Email address' : 'Enter your email address'"
                        email
                      ></b-form-input>
                      <small v-if="emailPreFilled" class="form-text text-muted mt-1">
                        <i class="fas fa-lock"></i> Email verified from reset link
                      </small>
                      <b-form-invalid-feedback id="Email-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </div>
                  </validation-provider>

                  <validation-provider
                    name="password"
                    :rules="{ required: true}"
                    v-slot="validationContext"
                  >
                    <div class="form-group mb-3">
                      <label for="password" class="form-label text-12 font-weight-bold mb-2">
                        Password
                      </label>
                      <div class="password-input-wrapper">
                        <b-form-input
                          id="password"
                          style="color: #252525"
                          :state="getValidationState(validationContext)"
                          aria-describedby="password-feedback"
                          class="form-control-rounded reset-input"
                          :type="showPassword ? 'text' : 'password'"
                          v-model="password"
                          placeholder="Enter your new password (min. 6 characters)"
                        ></b-form-input>
                        <button 
                          type="button" 
                          class="password-toggle-btn"
                          @click="showPassword = !showPassword"
                          :aria-label="showPassword ? 'Hide password' : 'Show password'"
                          tabindex="-1"
                        >
                          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                      </div>
                      <b-form-invalid-feedback
                        id="password-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </div>
                  </validation-provider>

                  <validation-provider
                    name="confirmation"
                    rules="confirmed:password|required:true"
                    v-slot="validationContext"
                  >
                    <div class="form-group mb-3">
                      <label for="password_confirmation" class="form-label text-12 font-weight-bold mb-2">
                        Confirm Password
                      </label>
                      <div class="password-input-wrapper">
                        <b-form-input
                          id="password_confirmation"
                          style="color: #252525"
                          :state="getValidationState(validationContext)"
                          aria-describedby="confirmation-feedback"
                          class="form-control-rounded reset-input"
                          :type="showPasswordConfirmation ? 'text' : 'password'"
                          v-model="password_confirmation"
                          placeholder="Confirm your new password"
                        ></b-form-input>
                        <button 
                          type="button" 
                          class="password-toggle-btn"
                          @click="showPasswordConfirmation = !showPasswordConfirmation"
                          :aria-label="showPasswordConfirmation ? 'Hide password' : 'Show password'"
                          tabindex="-1"
                        >
                          <i :class="showPasswordConfirmation ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                      </div>
                      <b-form-invalid-feedback
                        id="confirmation-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </div>
                  </validation-provider>

                  <button
                    type="submit"
                    :disabled="loading"
                    class="btn btn-primary btn-block btn-rounded mt-4 reset-submit-btn"
                  >
                    <span v-if="!loading">Reset Password</span>
                    <span v-else>
                      <i class="fas fa-spinner fa-spin"></i> Resetting...
                    </span>
                  </button>
                  <div v-if="loading" class="text-center mt-3">
                    <div class="spinner sm spinner-primary"></div>
                    <p class="text-muted mt-2 small">Please wait...</p>
                  </div>
                </b-form>
              </validation-observer>
              <div class="mt-4 text-center">
                <a href="/login" class="text-muted reset-back-link">
                  <i class="fas fa-arrow-left"></i> Back to Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NProgress from "nprogress";
export default {
  props: {
    token: {
      type: String,
      required: true
    },
    email: {
      type: String,
      default: null
    }
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Reset Password"
  },
  data() {
    return {
      token : this.token,
      email: this.email || null,
      password: null,
      password_confirmation: null,
      loading: false,
      showPassword: false,
      showPasswordConfirmation: false
    };
  },
  computed: {
    emailPreFilled() {
      return !!this.email && this.email.trim() !== '';
    }
  },
  mounted() {
    // If email is pre-filled, log for debugging (remove in production)
    if (this.emailPreFilled && __DEV__) {
      console.log('[Reset Password] Email pre-filled from token:', this.email);
    }
  },
  methods: {
    //------------- Submit Reset Password
    Submit_Reset() {
      this.$refs.Reset_password.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.Please_fill_the_Email_Adress,
            this.Failed
          );
        } else {
          this.Reset_Password();
        }
      });
    },

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    //------ Toast
    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },

    Reset_Password() {
      let self = this;
      // Start the progress bar.
      NProgress.start();
      NProgress.set(0.1);
      self.loading = true;
      axios
        .post("/api/password/reset", {
          token: self.token,
          email: self.email,
          password: self.password,
          password_confirmation: self.password_confirmation
        })
        .then(response => {
          if (response.data.code === 1) {
            this.makeToast(
              "success",
              this.Your_Password_has_been_changed,
              this.Success
            );
            window.location = '/';
          } else if (response.data.code === 2) {
            this.makeToast(
              "danger",
              this.We_cant_find_a_user_with_that_email_addres,
              this.Failed
            );
          } else if (response.data.code === 3) {
            this.makeToast(
              "danger",
              this.This_password_reset_token_is_invalid,
              this.Failed
            );
          }
          NProgress.done();
          this.loading = false;
        })
        .catch(error => {
          let errorMessage = this.InvalidData || 'An error occurred. Please try again.';
          
          // Provide better error messages
          if (error.response && error.response.data) {
            if (error.response.data.message) {
              errorMessage = error.response.data.message;
            } else if (error.response.data.errors) {
              // Handle validation errors
              const errors = error.response.data.errors;
              const firstError = Object.values(errors)[0];
              errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
            }
          }
          
          this.makeToast("danger", errorMessage, this.Failed || "Error");
          NProgress.done();
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
// Mobile-first responsive design
.reset-password-card {
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.reset-password-content {
  padding: 2rem;
}

.reset-logo {
  max-width: 120px;
  height: auto;
  margin-bottom: 1rem;
}

.reset-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 0.5rem;
}

.reset-subtitle {
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.reset-input {
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #ff4040;
    box-shadow: 0 0 0 3px rgba(255, 64, 64, 0.1);
  }
  
  &[readonly] {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
}

.reset-submit-btn {
  font-size: 1rem;
  font-weight: 600;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 64, 64, 0.3);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.reset-back-link {
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #ff4040 !important;
    text-decoration: none;
  }
  
  i {
    margin-right: 0.25rem;
  }
}

.password-input-wrapper {
  position: relative !important;
  width: 100%;
  display: block;
}

.password-input-wrapper .form-control-rounded,
.password-input-wrapper input.form-control-rounded,
.password-input-wrapper .form-control {
  padding-right: 50px !important;
  width: 100% !important;
}

.password-toggle-btn {
  position: absolute !important;
  right: 15px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  background: transparent !important;
  border: none !important;
  color: #666 !important;
  cursor: pointer;
  padding: 8px !important;
  z-index: 1000 !important;
  outline: none !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 36px;
  height: 36px;
  margin: 0 !important;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  transition: all 0.2s ease;
  line-height: 1;
  visibility: visible !important;
  opacity: 1 !important;
}

.password-toggle-btn:hover {
  color: #ff4040 !important;
  background-color: rgba(255, 64, 64, 0.1) !important;
}

.password-toggle-btn i {
  font-size: 18px;
  line-height: 1;
  display: inline-block !important;
  pointer-events: none;
  visibility: visible !important;
  opacity: 1 !important;
}

.password-toggle-btn:hover i {
  color: #ff4040 !important;
}

.password-toggle-btn:focus {
  outline: none !important;
  border: none !important;
}

.password-toggle-btn:active {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
  background: transparent !important;
  transform: translateY(-50%) scale(0.95);
}

.form-label {
  display: block;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

// Mobile Responsive Styles
@media (max-width: 768px) {
  .reset-password-card {
    margin: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .reset-password-content {
    padding: 1.5rem;
  }
  
  .reset-logo {
    max-width: 100px;
    margin-bottom: 0.75rem;
  }
  
  .reset-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .reset-subtitle {
    font-size: 0.875rem;
    margin-bottom: 1.25rem;
  }
  
  .reset-input {
    font-size: 16px; // Prevents zoom on iOS
    padding: 0.875rem 1rem;
  }
  
  .reset-submit-btn {
    font-size: 1rem;
    padding: 1rem 1.5rem;
    width: 100%;
  }
  
  .form-group {
    margin-bottom: 1.25rem;
  }
  
  .form-label {
    font-size: 0.875rem;
  }
}

@media (max-width: 576px) {
  .reset-password-card {
    margin: 0.5rem;
    border-radius: 0;
    box-shadow: none;
  }
  
  .reset-password-content {
    padding: 1.25rem;
  }
  
  .reset-logo {
    max-width: 80px;
  }
  
  .reset-title {
    font-size: 1.35rem;
  }
  
  .reset-subtitle {
    font-size: 0.8rem;
  }
  
  .reset-input {
    padding: 0.75rem 0.875rem;
  }
  
  .password-toggle-btn {
    right: 10px !important;
    padding: 6px !important;
    min-width: 32px;
    height: 32px;
  }
  
  .password-toggle-btn i {
    font-size: 16px;
  }
}

// Tablet styles
@media (min-width: 769px) and (max-width: 1024px) {
  .reset-password-card {
    max-width: 450px;
  }
  
  .reset-password-content {
    padding: 2rem 1.75rem;
  }
}

// Large screens
@media (min-width: 1200px) {
  .reset-password-card {
    max-width: 520px;
  }
}
</style>