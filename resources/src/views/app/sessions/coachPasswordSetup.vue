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
              
              <h1 class="mb-3 text-18">Set Up Your Password</h1>
              <p class="text-muted mb-4">Please create a password for your coach account. This link will expire in 7 days.</p>
              
              <validation-observer ref="PasswordSetup">
                <b-form @submit.prevent="Submit_Setup">
                  <validation-provider
                    name="password"
                    :rules="{ required: true, min: 6 }"
                    v-slot="validationContext"
                  >
                    <b-form-group label="Password" class="text-12">
                      <div class="password-input-wrapper">
                        <b-form-input
                          style="color: #252525"
                          :state="getValidationState(validationContext)"
                          aria-describedby="password-feedback"
                          class="form-control-rounded"
                          :type="showPassword ? 'text' : 'password'"
                          v-model="password"
                          placeholder="Enter your password"
                        ></b-form-input>
                        <button
                          type="button"
                          class="password-toggle-btn"
                          @click="togglePasswordVisibility"
                          tabindex="-1"
                        >
                          <i
                            :class="
                              showPassword
                                ? 'fas fa-eye-slash'
                                : 'fas fa-eye'
                            "
                          ></i>
                        </button>
                      </div>
                      <b-form-invalid-feedback
                        id="password-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>

                  <validation-provider
                    name="password_confirmation"
                    rules="confirmed:password|required:true"
                    v-slot="validationContext"
                  >
                    <b-form-group label="Confirm Password" class="text-12">
                      <div class="password-input-wrapper">
                        <b-form-input
                          style="color: #252525"
                          :state="getValidationState(validationContext)"
                          aria-describedby="password_confirmation-feedback"
                          class="form-control-rounded"
                          :type="showPasswordConfirmation ? 'text' : 'password'"
                          v-model="password_confirmation"
                          placeholder="Confirm your password"
                        ></b-form-input>
                        <button
                          type="button"
                          class="password-toggle-btn"
                          @click="togglePasswordConfirmationVisibility"
                          tabindex="-1"
                        >
                          <i
                            :class="
                              showPasswordConfirmation
                                ? 'fas fa-eye-slash'
                                : 'fas fa-eye'
                            "
                          ></i>
                        </button>
                      </div>
                      <b-form-invalid-feedback
                        id="password_confirmation-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>

                  <button
                    type="submit"
                    :disabled="loading"
                    class="btn btn-primary btn-block btn-rounded mt-3"
                  >Set Password</button>
                  <div v-once class="typo__p" v-if="loading">
                    <div class="spinner sm spinner-primary mt-3"></div>
                  </div>
                </b-form>
              </validation-observer>
              <div class="mt-3 text-center">
                <a href="/login"  class="text-muted">
                  <u>Back to Sign In</u>
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
  props: ['token'],
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Set Up Password"
  },
  data() {
    return {
      token : this.token,
      password: null,
      password_confirmation: null,
      loading: false,
      showPassword: false,
      showPasswordConfirmation: false
    };
  },
  methods: {
    //------------- Submit Password Setup
    Submit_Setup() {
      this.$refs.PasswordSetup.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            "Please fill in all required fields correctly.",
            "Validation Failed"
          );
        } else {
          this.Setup_Password();
        }
      });
    },

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    //------ Toggle Password Visibility
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    togglePasswordConfirmationVisibility() {
      this.showPasswordConfirmation = !this.showPasswordConfirmation;
    },

    //------ Toast
    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },

    Setup_Password() {
      let self = this;
      // Start the progress bar.
      NProgress.start();
      NProgress.set(0.1);
      self.loading = true;
      axios
        .post("/api/coachapp/auth/setup-password", {
          token: self.token,
          password: self.password,
          password_confirmation: self.password_confirmation
        })
        .then(response => {
          if (response.data.success === true) {
            this.makeToast(
              "success",
              response.data.message || "Password set successfully! Please download the app to login.",
              "Success"
            );
            // Redirect to app download page after a short delay
            setTimeout(() => {
              window.location = '/app-download';
            }, 2000);
          } else {
            this.makeToast(
              "danger",
              response.data.message || "Failed to set password. Please try again.",
              "Error"
            );
          }
          NProgress.done();
          this.loading = false;
        })
        .catch(error => {
          let errorMessage = "Failed to set password. Please try again.";
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
</style>
