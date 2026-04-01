<template>
  <div>
    <!-- Single Modal for All Steps -->
    <b-modal
      :visible="isVisible"
      :title="getModalTitle()"
      @hide="handleModalHide"
      @hidden="handleClose"
      size="md"
      :no-close-on-backdrop="true"
      :no-close-on-esc="currentStep !== 1"
      ref="workoutAssignModal"
    >
      <!-- Step 1: Mass Assign Content -->
      <template v-if="currentStep === 1">
        <div class="row">
          <!-- Member Selection -->
          <div class="col-md-12 mb-3">
            <validation-provider
              name="Member"
              rules="required"
              v-slot="validationContext"
            >
              <b-form-group label="Select Member *">
                <v-select
                  v-model="form.member_id"
                  :reduce="member => member.id"
                  :options="members"
                  label="membername"
                  placeholder="Select Member"
                  :state="getValidationState(validationContext)"
                  aria-describedby="Member-feedback"
                  @input="handleMemberSelect"
                  @search:blur="handleMemberBlur"
                />
                <b-form-invalid-feedback id="Member-feedback" :state="getValidationState(validationContext)">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
              <span v-show="false">{{ memberValidationContext = validationContext }}</span>
            </validation-provider>
          </div>

          <!-- Goal Selection -->
          <div class="col-md-12 mb-3">
            <b-form-group label="Select Goal">
              <v-select
                v-model="form.goal"
                :reduce="goal => goal.value"
                :options="goalOptions"
                label="label"
                placeholder="Select Goal (Optional)"
              />
            </b-form-group>
          </div>

          <!-- Tag Selection -->
          <div class="col-md-12 mb-3">
            <b-form-group label="Select Tag">
              <v-select
                v-model="form.tag"
                :reduce="tag => tag"
                :options="availableTags"
                placeholder="Select Tag (Optional)"
              />
            </b-form-group>
          </div>
        </div>
      </template>

      <!-- Step 2: Assign Workout Content -->
      <template v-if="currentStep === 2">
        <div class="row">
          <!-- Display Selected Details from Step 1 -->
          <div class="col-md-12 mb-3">
            <div class="selected-details-container">
              <h6 class="mb-2">Selected Details:</h6>
              <div class="selected-item">
                <strong>Member:</strong> {{ getSelectedMemberName() }}
              </div>
              <div class="selected-item" v-if="form.goal">
                <strong>Goal:</strong> {{ getSelectedGoalLabel() }}
              </div>
              <div class="selected-item" v-if="form.tag">
                <strong>Tag:</strong> {{ form.tag }}
              </div>
            </div>
          </div>

          <!-- Start Date -->
          <div class="col-md-12 mb-3">
            <validation-provider
              name="Start Date"
              rules="required"
              v-slot="validationContext"
            >
              <b-form-group label="Start Date *">
                <div class="date-picker-container">
                  <input
                    type="date"
                    v-model="form.start_date"
                    class="form-control date-input"
                    :class="{ 'is-invalid': validationContext.errors.length > 0 }"
                    placeholder="Select start date"
                    :min="getCurrentDate()"
                  />
                  <i class="fas fa-calendar-alt date-picker-icon"></i>
                </div>
                <b-form-invalid-feedback v-if="validationContext.errors.length > 0">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </div>

          <!-- Amount of Weeks -->
          <div class="col-md-12 mb-3">
            <validation-provider
              name="Amount of Weeks"
              rules="required|min_value:1"
              v-slot="validationContext"
            >
              <b-form-group label="Amount of Weeks *">
                <b-form-input
                  type="number"
                  v-model="form.amount_of_weeks"
                  min="1"
                  placeholder="Enter number of weeks"
                  :state="getValidationState(validationContext)"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </div>

          <!-- Select Days -->
          <div class="col-md-12 mb-3">
            <validation-provider
              name="Select Days"
              rules="required"
              v-slot="validationContext"
            >
              <b-form-group label="Select Days *">
                <div class="days-checkbox-container">
                  <b-form-checkbox
                    v-for="day in daysOfWeek"
                    :key="day.value"
                    v-model="form.selected_days"
                    :value="day.value"
                    class="day-checkbox"
                  >
                    {{ day.label }}
                  </b-form-checkbox>
                </div>
                <b-form-invalid-feedback v-if="validationContext.errors.length > 0">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </div>
        </div>
      </template>

      <!-- Step 3: Confirmation Content -->
      <template v-if="currentStep === 3">
        <div class="row">
          <div class="col-md-12">
            <div class="confirmation-details">
              <h6 class="mb-3">Please review your selections:</h6>
              
              <div class="confirmation-section mb-3">
                <strong>Member:</strong>
                <p class="mb-0">{{ getSelectedMemberName() }}</p>
              </div>

              <div class="confirmation-section mb-3" v-if="form.goal">
                <strong>Goal:</strong>
                <p class="mb-0">{{ getSelectedGoalLabel() }}</p>
              </div>

              <div class="confirmation-section mb-3" v-if="form.tag">
                <strong>Tag:</strong>
                <p class="mb-0">{{ form.tag }}</p>
              </div>

              <div class="confirmation-section mb-3">
                <strong>Start Date:</strong>
                <p class="mb-0">{{ formatDate(form.start_date) }}</p>
              </div>

              <div class="confirmation-section mb-3">
                <strong>Amount of Weeks:</strong>
                <p class="mb-0">{{ form.amount_of_weeks }} week(s)</p>
              </div>

              <div class="confirmation-section mb-3">
                <strong>Selected Days:</strong>
                <p class="mb-0">{{ getSelectedDaysLabels() }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Modal Footer -->
      <template #modal-footer>
        <!-- Step 1 Footer -->
        <template v-if="currentStep === 1">
          <b-button
            variant="secondary"
            size="sm"
            @click="handleClose"
          >
            Cancel
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            @click="goToStep2"
          >
            Continue
          </b-button>
        </template>

        <!-- Step 2 Footer -->
        <template v-if="currentStep === 2">
          <b-button
            variant="secondary"
            size="sm"
            @click="goToStep1"
          >
            Back
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            @click="goToStep3"
            :disabled="!isStep2Valid"
          >
            Continue
          </b-button>
        </template>

        <!-- Step 3 Footer -->
        <template v-if="currentStep === 3">
          <b-button
            variant="secondary"
            size="sm"
            @click="goToStep2"
          >
            Back
          </b-button>
          <b-button
            variant="secondary"
            size="sm"
            @click="handleClose"
          >
            Cancel
          </b-button>
          <b-button
            variant="success"
            size="sm"
            @click="submit"
            :disabled="loading"
          >
            <span v-if="loading">Loading...</span>
            <span v-else>Yes</span>
          </b-button>
        </template>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
import NProgress from 'nprogress';

export default {
  name: 'WorkoutAssignModal',
  components: {
    ValidationProvider
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    workoutId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      currentStep: 1,
      loading: false,
      members: [],
      availableTags: [],
      goalOptions: [
        { label: 'Lose Weight', value: 'Lose Weight' },
        { label: 'Build Muscle', value: 'Build Muscle' },
        { label: 'Get Fit', value: 'Get Fit' },
        { label: 'Increase Strength', value: 'Increase Strength' },
        { label: 'Improve Endurance', value: 'Improve Endurance' },
        { label: 'Tone Body', value: 'Tone Body' },
        { label: 'Flexibility', value: 'Flexibility' },
        { label: 'General Fitness', value: 'General Fitness' }
      ],
      daysOfWeek: [
        { label: 'Mon', value: 'Mon' },
        { label: 'Tue', value: 'Tue' },
        { label: 'Wed', value: 'Wed' },
        { label: 'Thu', value: 'Thu' },
        { label: 'Fri', value: 'Fri' },
        { label: 'Sat', value: 'Sat' },
        { label: 'Sun', value: 'Sun' }
      ],
      form: {
        member_id: null,
        goal: null,
        tag: null,
        start_date: null,
        amount_of_weeks: 1,
        selected_days: [],
        description: ''
      },
      memberValidationContext: null
    };
  },
  computed: {
    isStep2Valid() {
      return this.form.start_date && 
             this.form.amount_of_weeks && 
             this.form.amount_of_weeks > 0 &&
             this.form.selected_days && 
             this.form.selected_days.length > 0;
    }
  },
  methods: {
    getModalTitle() {
      switch (this.currentStep) {
        case 1:
          return 'Mass Assign';
        case 2:
          return 'Assign Workout';
        case 3:
          return 'Confirm Assignment';
        default:
          return 'Mass Assign';
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    getSelectedMemberName() {
      if (!this.form.member_id) return '';
      const member = this.members.find(m => m.id === this.form.member_id);
      return member ? member.membername : '';
    },
    getSelectedGoalLabel() {
      if (!this.form.goal) return '';
      const goal = this.goalOptions.find(g => g.value === this.form.goal);
      return goal ? goal.label : this.form.goal;
    },
    getSelectedDaysLabels() {
      if (!this.form.selected_days || this.form.selected_days.length === 0) {
        return 'None selected';
      }
      return this.form.selected_days.join(', ');
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    },
    goToStep1() {
      this.currentStep = 1;
    },
    handleMemberSelect(value) {
      // Blur the input after selection to remove cursor blinking
      this.$nextTick(() => {
        const memberSelect = document.querySelector('.v-select input');
        if (memberSelect) {
          memberSelect.blur();
        }
      });
    },
    handleMemberBlur() {
      // Ensure input is blurred
      this.$nextTick(() => {
        const memberSelect = document.querySelector('.v-select input');
        if (memberSelect) {
          memberSelect.blur();
        }
      });
    },
    handleModalHide(bvModalEvt) {
      // Prevent modal from closing when navigating between steps
      if (this.currentStep !== 1) {
        bvModalEvt.preventDefault();
        return;
      }
      // Allow closing only on step 1
    },
    async goToStep2() {
      // Validate step 1 using vee-validate
      if (this.memberValidationContext) {
        // Mark as dirty to trigger validation display
        this.memberValidationContext.dirty = true;
        const { valid } = await this.memberValidationContext.validate();
        if (!valid) {
          // Validation errors will be shown automatically by vee-validate
          return;
        }
      } else if (!this.form.member_id) {
        // Fallback validation if context is not available
        this.$bvToast.toast('Please select a member', {
          title: 'Validation Error',
          variant: 'warning',
          solid: true,
        });
        return;
      }
      
      // Set default values if not already set
      if (!this.form.start_date) {
        this.form.start_date = this.getCurrentDate();
      }
      if (!this.form.amount_of_weeks) {
        this.form.amount_of_weeks = 1;
      }
      
      // Use $nextTick to ensure modal stays open
      this.$nextTick(() => {
        this.currentStep = 2;
      });
    },
    goToStep3() {
      // Validate step 2
      if (!this.isStep2Valid) {
        this.$bvToast.toast('Please fill all required fields', {
          title: 'Validation Error',
          variant: 'warning',
          solid: true,
        });
        return;
      }
      // Use $nextTick to ensure modal stays open
      this.$nextTick(() => {
        this.currentStep = 3;
      });
    },
    handleClose() {
      this.currentStep = 1;
      this.resetForm();
      this.$emit('close');
    },
    resetForm() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const currentDate = `${year}-${month}-${day}`;
      
      this.form = {
        member_id: null,
        goal: null,
        tag: null,
        start_date: currentDate,
        amount_of_weeks: 1,
        selected_days: [],
        description: ''
      };
    },
    async loadMembers() {
      try {
        const response = await axios.get('/get_members_without_paginate');
        this.members = response.data || [];
      } catch (error) {
        let errorMessage = 'Failed to load members';
        
        if (error && error.response) {
          if (error.response.status === 401) {
            errorMessage = 'Your session has expired. Please log in again.';
          } else if (error.response.data) {
            const data = error.response.data;
            if (typeof data === 'string') {
              errorMessage = data;
            } else if (data && typeof data === 'object') {
              if (data.message) {
                errorMessage = data.message;
              } else if (data.error) {
                errorMessage = data.error;
              } else if (data.errors && Array.isArray(data.errors)) {
                errorMessage = data.errors.join(', ');
              }
            }
          } else if (error.response.statusText) {
            errorMessage = error.response.statusText;
          }
        } else if (error && error.message) {
          errorMessage = error.message;
        }
        
        this.$bvToast.toast(errorMessage, {
          title: 'Error',
          variant: 'danger',
          solid: true,
        });
        
        this.members = [];
      }
    },
    async loadTags() {
      try {
        const response = await axios.get('members/tags/available');
        if (response.data && response.data.success && response.data.tags) {
          this.availableTags = response.data.tags.map(t => t.name || t.value || t);
          this.availableTags.sort();
        } else {
          this.availableTags = [];
        }
      } catch (error) {
        // Silently fail - tags are optional
        this.availableTags = [];
      }
    },
    async submit() {
      try {
        this.loading = true;
        NProgress.start();

        const payload = {
          workout_id: this.workoutId,
          member_id: this.form.member_id,
          start_date: this.form.start_date,
          amount_of_weeks: this.form.amount_of_weeks,
          selected_days: this.form.selected_days.join(','),
          goal: this.form.goal,
          tag: this.form.tag,
          description: this.form.description
        };

        const response = await axios.post('/workout/assign', payload);
        
        if (response.data.success) {
          this.$bvToast.toast('Workout assigned successfully!', {
            title: 'Success',
            variant: 'success',
            solid: true,
          });
          
          this.$emit('assigned');
          this.handleClose();
        } else {
          throw new Error(response.data.message || 'Assignment failed');
        }
      } catch (error) {
        let errorMessage = 'Failed to assign workout';
        
        if (error && error.response) {
          if (error.response.data) {
            if (typeof error.response.data === 'string') {
              errorMessage = error.response.data;
            } else if (error.response.data.message) {
              errorMessage = error.response.data.message;
            } else if (error.response.data.error) {
              errorMessage = error.response.data.error;
            }
          } else if (error.response.statusText) {
            errorMessage = error.response.statusText;
          }
        } else if (error && error.message) {
          errorMessage = error.message;
        }
        
        this.$bvToast.toast(errorMessage, {
          title: 'Error',
          variant: 'danger',
          solid: true,
        });
      } finally {
        this.loading = false;
        NProgress.done();
      }
    }
  },
  created() {
    this.loadMembers();
    this.loadTags();
  },
  watch: {
    isVisible(val) {
      if (val) {
        this.currentStep = 1;
        this.resetForm();
        this.loadMembers();
        this.loadTags();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.selected-details-container {
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0.375rem;
  border: 1px solid #dee2e6;
}

.selected-item {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  strong {
    color: #495057;
    margin-right: 0.5rem;
  }
}

.confirmation-details {
  .confirmation-section {
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #e9ecef;
    
    &:last-child {
      border-bottom: none;
    }
    
    strong {
      color: #495057;
      display: block;
      margin-bottom: 0.25rem;
      font-size: 0.875rem;
    }
    
    p {
      color: #6c757d;
      font-size: 0.875rem;
      padding-left: 0.5rem;
    }
  }
}

.days-checkbox-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: #f8f9fa;
  border-radius: 0.375rem;
  border: 1px solid #dee2e6;
  justify-content: flex-start;
  align-items: center;
}

.day-checkbox {
  margin-bottom: 0;
  
  ::v-deep .custom-control-label {
    cursor: pointer;
    padding-left: 0.5rem;
  }
}

/* Date Picker Styles */
.date-picker-container {
  position: relative;
  display: flex;
  align-items: center;
}

.date-input {
  padding-right: 2.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: all 0.15s ease-in-out;
  background-color: #fff;
  font-size: 0.875rem;
  height: calc(1.5em + 0.75rem + 2px);
}

.date-input:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.date-input.is-invalid {
  border-color: #dc3545;
}

.date-input.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.date-picker-icon {
  position: absolute;
  right: 0.75rem;
  color: #6c757d;
  pointer-events: none;
  font-size: 0.875rem;
  z-index: 1;
}

.date-input:focus + .date-picker-icon {
  color: #007bff;
}

.date-input::-webkit-calendar-picker-indicator {
  position: absolute;
  right: 0.5rem;
  opacity: 0;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  z-index: 2;
}

.date-input::-webkit-datetime-edit-text {
  color: #495057;
  padding: 0 0.25rem;
}

.date-input::-webkit-datetime-edit-month-field,
.date-input::-webkit-datetime-edit-day-field,
.date-input::-webkit-datetime-edit-year-field {
  color: #495057;
}

.date-input::-moz-placeholder {
  color: #6c757d;
  opacity: 1;
}

.date-input::placeholder {
  color: #6c757d;
  opacity: 1;
}

/* Prevent cursor blinking in v-select after selection */
::v-deep .v-select input {
  caret-color: transparent;
}

::v-deep .v-select.vs--open input {
  caret-color: auto;
}

::v-deep .v-select.vs--single.vs--open .vs__selected {
  opacity: 1;
}
</style>
