<template>
  <div class="auth-layout-wrap">
    <div class="auth-content">
      <div class="card o-hidden mt-5 mb-5">
        <div class="row">
          <div class="col-md-12">
            <div class="p-4">
              <div class="auth-logo text-center mb-30">
                <img :src="'/images/logo.png'" alt>
              </div>
              
              <h1 class="mb-3 text-18">Reset Your Password</h1>
              <p class="text-muted mb-4">Please enter your new password. This link will expire in 24 hours.</p>
              
              <validation-observer ref="PasswordReset">
                <b-form @submit.prevent="Submit_Reset">
                  <validation-provider
                    name="password"
                    :rules="{ required: true, min: 6 }"
                    v-slot="validationContext"
                  >
                    <div class="form-group mb-3">
                      <label for="password" class="form-label text-12 font-weight-bold mb-2">
                        New Password
                      </label>
                      <div class="password-input-wrapper">
                        <b-form-input
                          id="password"
                          style="color: #252525"
                          :state="getValidationState(validationContext)"
                          aria-describedby="password-feedback"
                          class="form-control-rounded"
                          :type="showPassword ? 'text' : 'password'"
                          v-model="password"
                          placeholder="Enter your new password"
                          autocomplete="new-password"
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
                    name="password_confirmation"
                    rules="confirmed:password|required:true"
                    v-slot="validationContext"
                  >
                    <div class="form-group mb-3">
                      <label for="password_confirmation" class="form-label text-12 font-weight-bold mb-2">
                        Confirm New Password
                      </label>
                      <div class="password-input-wrapper">
                        <b-form-input
                          id="password_confirmation"
                          style="color: #252525"
                          :state="getValidationState(validationContext)"
                          aria-describedby="password_confirmation-feedback"
                          class="form-control-rounded"
                          :type="showPasswordConfirmation ? 'text' : 'password'"
                          v-model="password_confirmation"
                          placeholder="Confirm your new password"
                          autocomplete="new-password"
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
                        id="password_confirmation-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </div>
                  </validation-provider>

                  <button
                    type="submit"
                    :disabled="loading"
                    class="btn btn-primary btn-block btn-rounded mt-3"
                  >Reset Password</button>
                  <div v-once class="typo__p" v-if="loading">
                    <div class="spinner sm spinner-primary mt-3"></div>
                  </div>
                </b-form>
              </validation-observer>
              <div class="mt-3 text-center">
                <a href="/login"  class="text-muted">
                  <u>Go to Login Page</u>
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
  props: ['token', 'email'],
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Reset Your Password"
  },
  data() {
    return {
      token : this.token,
      email: this.email || '',
      password: null,
      password_confirmation: null,
      loading: false,
      showPassword: false,
      showPasswordConfirmation: false
    };
  },
  methods: {
    //------------- Submit Password Reset
    Submit_Reset() {
      this.$refs.PasswordReset.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            "Please fill in all required fields correctly.",
            "Validation Failed"
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
        .post("/api/mobile/auth/setup-password", {
          token: self.token,
          password: self.password,
          password_confirmation: self.password_confirmation
        })
        .then(response => {
          if (response.data.success === true) {
            this.makeToast(
              "success",
              response.data.message || "Password reset successfully! Please download the app to login.",
              "Success"
            );
            // Redirect to app download page after a short delay
            setTimeout(() => {
              window.location = '/app-download';
            }, 2000);
          } else {
            this.makeToast(
              "danger",
              response.data.message || "Failed to reset password. Please try again.",
              "Error"
            );
          }
          NProgress.done();
          this.loading = false;
        })
        .catch(error => {
          let errorMessage = "Failed to reset password. Please try again.";
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
          this.makeToast("danger", errorMessage, "Error");
          NProgress.done();
          this.loading = false;
        });
    }
  }
};
</script>

<style>
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
    color: #252525 !important;
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
}

.form-group {
  margin-bottom: 1.5rem;
}
</style>

