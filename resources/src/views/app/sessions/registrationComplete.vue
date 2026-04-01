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
              
              <h1 class="mb-3 text-18">Almost there!</h1>
              <p class="text-muted mb-4">Thank you for registering! Finally, we need some extra information to create your Fit-profile.</p>
              
              <validation-observer ref="RegistrationForm">
                <b-form @submit.prevent="Submit_Registration">
                  <validation-provider
                    name="firstname"
                    rules="required"
                    v-slot="validationContext"
                  >
                    <div class="form-group mb-3">
                      <label for="firstname" class="form-label text-12 font-weight-bold mb-2">
                        First name
                      </label>
                      <b-form-input
                        id="firstname"
                        style="color: #252525"
                        :state="getValidationState(validationContext)"
                        aria-describedby="firstname-feedback"
                        class="form-control"
                        type="text"
                        v-model="form.firstname"
                        placeholder="First name"
                      ></b-form-input>
                      <b-form-invalid-feedback
                        id="firstname-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </div>
                  </validation-provider>

                  <validation-provider
                    name="lastname"
                    rules="required"
                    v-slot="validationContext"
                  >
                    <div class="form-group mb-3">
                      <label for="lastname" class="form-label text-12 font-weight-bold mb-2">
                        Last name
                      </label>
                      <b-form-input
                        id="lastname"
                        style="color: #252525"
                        :state="getValidationState(validationContext)"
                        aria-describedby="lastname-feedback"
                        type="text"
                        v-model="form.lastname"
                        placeholder="Last name"
                      ></b-form-input>
                      <b-form-invalid-feedback
                        id="lastname-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </div>
                  </validation-provider>

                  <div class="form-group mb-3">
                    <label class="custom-checkbox">
                      <input type="checkbox" v-model="form.hide_real_name" />
                      <span class="checkmark"></span>
                      <span class="checkbox-label">Do not display my real name on my profile</span>
                    </label>
                  </div>

                  <validation-provider
                    name="gender"
                    rules="required"
                    v-slot="validationContext"
                  >
                    <div class="form-group mb-3">
                      <label for="gender" class="form-label text-12 font-weight-bold mb-2">
                        Sex
                      </label>
                      <b-form-select
                        id="gender"
                        style="color: #252525"
                        :state="getValidationState(validationContext)"
                        aria-describedby="gender-feedback"
                        v-model="form.gender"
                      >
                        <option value="">Select Sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </b-form-select>
                      <b-form-invalid-feedback
                        id="gender-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </div>
                  </validation-provider>

                  <validation-provider
                    name="date_of_birth"
                    rules="required"
                    v-slot="validationContext"
                  >
                    <div class="form-group mb-3">
                      <label for="date_of_birth" class="form-label text-12 font-weight-bold mb-2">
                        Date of birth
                      </label>
                      <b-form-input
                        id="date_of_birth"
                        style="color: #252525"
                        :state="getValidationState(validationContext)"
                        aria-describedby="date_of_birth-feedback"
                        type="date"
                        v-model="form.date_of_birth"
                      ></b-form-input>
                      <b-form-invalid-feedback
                        id="date_of_birth-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </div>
                  </validation-provider>

                  <validation-provider
                    name="height_feet"
                    rules="required|numeric|min_value:3|max_value:8"
                    v-slot="validationContext"
                  >
                    <div class="form-group mb-3">
                      <label for="height" class="form-label text-12 font-weight-bold mb-2">
                        Height
                      </label>
                      <div class="input-group">
                        <b-form-input
                          id="height_feet"
                          style="color: #252525"
                          :state="getValidationState(validationContext)"
                          aria-describedby="height-feedback"
                          type="number"
                          v-model.number="form.height_feet"
                          placeholder="Feet"
                          min="3"
                          max="8"
                        ></b-form-input>
                        <div class="input-group-append">
                          <span class="input-group-text">ft</span>
                        </div>
                        <b-form-input
                          id="height_inches"
                          style="color: #252525"
                          type="number"
                          v-model.number="form.height_inches"
                          placeholder="Inches"
                          min="0"
                          max="11"
                        ></b-form-input>
                        <div class="input-group-append">
                          <span class="input-group-text">in</span>
                        </div>
                      </div>
                      <b-form-invalid-feedback
                        id="height-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </div>
                  </validation-provider>

                  <validation-provider
                    name="weight"
                    rules="required|numeric|min_value:50|max_value:500"
                    v-slot="validationContext"
                  >
                    <div class="form-group mb-3">
                      <label for="weight" class="form-label text-12 font-weight-bold mb-2">
                        Weight
                      </label>
                      <div class="input-group">
                        <b-form-input
                          id="weight"
                          style="color: #252525"
                          :state="getValidationState(validationContext)"
                          aria-describedby="weight-feedback"
                          type="number"
                          v-model="form.weight"
                          placeholder="Weight"
                          min="50"
                          max="500"
                          step="0.1"
                        ></b-form-input>
                        <div class="input-group-append">
                          <span class="input-group-text">lbs</span>
                        </div>
                      </div>
                      <b-form-invalid-feedback
                        id="weight-feedback"
                      >{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </div>
                  </validation-provider>

                  <button
                    type="submit"
                    :disabled="loading"
                    class="btn btn-primary btn-block btn-rounded mt-3"
                  >{{ loading ? 'Processing...' : 'Complete Your Registration' }}</button>
                  <div v-once class="typo__p" v-if="loading">
                    <div class="spinner sm spinner-primary mt-3"></div>
                  </div>
                </b-form>
              </validation-observer>
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
    title: "Complete Your Registration"
  },
  data() {
    return {
      token: null,
      loading: false,
      loadingData: false,
      form: {
        firstname: '',
        lastname: '',
        gender: '',
        date_of_birth: '',
        height: '',
        weight: '',
        hide_real_name: false
      }
    };
  },
  mounted() {
    // Get token from URL query parameter or prop
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    const tokenFromProp = this.$props.token || this.token;
    
    // Prioritize URL token, then prop token
    this.token = tokenFromUrl || tokenFromProp;
    
    console.log('Registration Complete - Token:', this.token ? (this.token.substring(0, 20) + '...') : 'MISSING');
    
    // Load member data using the token
    if (this.token) {
      this.loadMemberData();
    } else {
      console.error('No token found in URL or props');
      this.makeToast(
        "danger",
        "Registration token is missing. Please use the link from your email.",
        "Error"
      );
    }
  },
  methods: {
    loadMemberData() {
      if (!this.token) {
        this.makeToast(
          "danger",
          "Registration token is missing. Please use the link from your email.",
          "Error"
        );
        return;
      }
      
      this.loadingData = true;
      console.log('Loading member data with token:', this.token.substring(0, 20) + '...');
      
      // Use token to get member info
      axios.get('/api/mobile/auth/me', {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      })
      .then(response => {
        console.log('Member data response:', response.data);
        if (response.data && response.data.success && response.data.member) {
          const member = response.data.member;
          this.form.firstname = member.firstname || '';
          this.form.lastname = member.lastname || '';
          this.form.gender = member.gender || '';
          // Format date_of_birth for date input (YYYY-MM-DD)
          if (member.date_of_birth) {
            const date = new Date(member.date_of_birth);
            if (!isNaN(date.getTime())) {
              this.form.date_of_birth = date.toISOString().split('T')[0];
            } else {
              // Try parsing as YYYY-MM-DD directly
              this.form.date_of_birth = member.date_of_birth;
            }
          }
          // Convert height from cm to feet/inches if available
          if (member.height) {
            const heightCm = parseFloat(member.height);
            if (!isNaN(heightCm)) {
              const totalInches = heightCm / 2.54;
              this.form.height_feet = Math.floor(totalInches / 12);
              this.form.height_inches = Math.round(totalInches % 12);
            }
          }
          // Convert weight from kg to pounds if available
          if (member.weight) {
            const weightKg = parseFloat(member.weight);
            if (!isNaN(weightKg)) {
              this.form.weight = (weightKg * 2.20462262).toFixed(1);
            }
          }
          
          console.log('Form data populated:', this.form);
          this.loadingData = false;
        } else {
          console.error('Invalid response structure:', response.data);
          this.loadingData = false;
          this.makeToast(
            "warning",
            "Could not load your information automatically. Please fill in the form manually.",
            "Notice"
          );
        }
      })
      .catch(error => {
        console.error('Error loading member data:', error);
        console.error('Error response:', error.response);
        this.loadingData = false;
        let errorMessage = "Could not load your information automatically. You can still fill in the form manually.";
        if (error.response) {
          console.error('Error status:', error.response.status);
          console.error('Error data:', error.response.data);
          if (error.response.status === 401) {
            errorMessage = "Your session has expired. Please use the link from your email again, or fill in the form manually.";
          } else if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message + " You can still fill in the form manually.";
          }
        } else if (error.request) {
          errorMessage = "Unable to connect to the server. Please check your internet connection and fill in the form manually.";
        }
        this.makeToast(
          "warning",
          errorMessage,
          "Notice"
        );
      });
    },
    
    Submit_Registration() {
      // Manual validation check before calling vee-validate
      const invalidFields = [];
      if (!this.form.firstname || this.form.firstname.trim() === '') {
        invalidFields.push('First name');
      }
      if (!this.form.lastname || this.form.lastname.trim() === '') {
        invalidFields.push('Last name');
      }
      if (!this.form.gender || this.form.gender === '') {
        invalidFields.push('Sex');
      }
      if (!this.form.date_of_birth || this.form.date_of_birth === '') {
        invalidFields.push('Date of birth');
      }
      if (!this.form.height_feet || this.form.height_feet === '' || isNaN(this.form.height_feet) ||
          this.form.height_inches === null || this.form.height_inches === '' || isNaN(this.form.height_inches)) {
        invalidFields.push('Height');
      }
      if (!this.form.weight || this.form.weight === '' || isNaN(this.form.weight)) {
        invalidFields.push('Weight');
      }
      
      if (invalidFields.length > 0) {
        const errorMsg = `Please fill in: ${invalidFields.join(', ')}`;
        this.makeToast(
          "danger",
          errorMsg,
          "Validation Failed"
        );
        return;
      }
      
      this.$refs.RegistrationForm.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            "Please fill in all required fields correctly.",
            "Validation Failed"
          );
        } else {
          this.Complete_Registration();
        }
      });
    },

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },

    Complete_Registration() {
      let self = this;
      NProgress.start();
      NProgress.set(0.1);
      self.loading = true;
      
      // Convert height from feet/inches to total inches, then to cm for storage
      const totalInches = (self.form.height_feet || 0) * 12 + (self.form.height_inches || 0);
      const heightCm = totalInches > 0 ? totalInches * 2.54 : null;
      
      // Convert weight from pounds to kg for storage
      const weightKg = self.form.weight ? self.form.weight / 2.20462262 : null;
      
      axios.post("/api/mobile/auth/complete-registration", {
        firstname: self.form.firstname,
        lastname: self.form.lastname,
        gender: self.form.gender,
        date_of_birth: self.form.date_of_birth,
        height: heightCm,
        weight: weightKg,
        height_feet: self.form.height_feet,
        height_inches: self.form.height_inches,
        preferred_length_unit: 'inches',
        preferred_weight_unit: 'pounds',
        hide_real_name: self.form.hide_real_name
      }, {
        headers: {
          'Authorization': 'Bearer ' + self.token
        }
      })
      .then(response => {
        if (response.data.success === true) {
          this.makeToast(
            "success",
            response.data.message || "Registration completed successfully!",
            "Success"
          );
          setTimeout(() => {
            window.location = '/login';
          }, 2000);
        } else {
          this.makeToast(
            "danger",
            response.data.message || "Failed to complete registration. Please try again.",
            "Error"
          );
        }
        NProgress.done();
        this.loading = false;
      })
      .catch(error => {
        let errorMessage = "Failed to complete registration. Please try again.";
        if (error.response && error.response.data) {
          if (error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.data.errors) {
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
.form-label {
  display: block;
  color: #333;
  margin-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.custom-checkbox {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 0;
}

.custom-checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: relative;
  height: 18px;
  width: 18px;
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  transition: all 0.3s ease;
}

.custom-checkbox:hover .checkmark {
  border-color: #007bff;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: #007bff;
  border-color: #007bff;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-label {
  font-size: 14px;
  color: #333;
}

.input-group-append {
  display: flex;
}

.input-group-text {
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  text-align: center;
  white-space: nowrap;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-left: 0;
  border-radius: 0 0.25rem 0.25rem 0;
}
</style>

