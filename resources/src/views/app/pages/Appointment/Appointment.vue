<template>
  <div class="appointment-page">
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
                <i class="fas fa-calendar-check"></i>
                Appointments Calendar
              </li>
            </ol>
          </div>
        </nav>
      </div>

      <!-- Refresh Button -->
      <div class="refresh-section">
        <button 
          @click="refreshCalendar" 
          class="btn btn-primary refresh-btn"
          :disabled="loading"
        >
          <i class="fas fa-sync-alt me-2"></i>
          {{ loading ? 'Loading...' : 'Refresh Calendar' }}
        </button>
      </div>
    </div>
    
    <!-- Calendar -->
    <div class="container-fluid text-center">
      <div class="row justify-content-center">
        <vue-cal
          ref="vuecal"
          style="height: 700px"
          :time="true"
          default-view="week"
          :available-views="['week', 'day']"
          :events="events"
          :disable-views="['years', 'year', 'month']"
          :allow-overlapping-events="true"
          :allow-multiple-events="true"
          @cell-click="handleCellClick"
          @event-click="handleEventClick"
          @event-dblclick="handleEventClick"
          @event-focus="handleEventClick"
        />
      </div>
    </div>

    <!-- Appointment Modal -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-box">
        <h3 class="fw-bold">{{ isEditing ? 'Edit Gym Appointment' : 'Set Gym Appointment' }}</h3>
        <form @submit.prevent="saveAppointment">
          <!-- Date -->
          <div>
            <label>Date:</label>
            <input type="date" v-model="appointmentDate" required />
          </div>

          <!-- Start Time -->
          <div>
            <label>Start Time:</label>
            <input type="time" v-model="appointmentStartTime" required />
          </div>

          <!-- End Time -->
          <div>
            <label>End Time:</label>
            <input type="time" v-model="appointmentEndTime" required />
          </div>

          <!-- Staff -->
          <div>
            <label>Coach:</label>
            <select v-model="selectedStaffId" required>
              <option value="" disabled>Select staff</option>
              <option v-for="member in staff" :key="member.id" :value="member.id">
                {{ member.name }}
              </option>
            </select>
          </div>

          <!-- Client -->
          <div>
            <label>Member:</label>
            <select v-model="selectedClientId" required>
              <option value="" disabled>Select Client</option>
              <option v-for="member in clients" :key="member.id" :value="member.id">
                {{ member.name }}
              </option>
            </select>
          </div>

          <!-- Workout Type -->
          <div>
            <label>Workout Type:</label>
            <select v-model="workoutType" required>
              <option value="" disabled>Select Workout Type</option>
              <option v-for="type in workouts" :key="type.id" :value="type.id">{{ type.label }}</option>
            </select>
          </div>

          <!-- Rating Display (Read-only for completed appointments) -->
          <div v-if="isEditing && currentAppointmentStatus === 'completed'">
            <label>Rating:</label>
            <div class="rating-display">
              <span v-if="currentAppointmentRating" class="rating-value">
                <i class="fas fa-star" style="color: #FBBF24;"></i>
                {{ currentAppointmentRating.toFixed(1) }} / 5.0
              </span>
              <span v-else class="no-rating">
                <i class="far fa-star" style="color: #ccc;"></i>
                Not rated yet
              </span>
            </div>
          </div>

          <!-- Buttons -->
          <div class="modal-actions">
            <button type="submit" :disabled="saving">
              <span v-if="saving">
                <i class="fas fa-spinner fa-spin me-2"></i>
                {{ isEditing ? 'Updating...' : 'Saving...' }}
              </span>
              <span v-else>{{ isEditing ? 'Update' : 'Save' }}</span>
            </button>
            <button type="button" @click="closeModal" :disabled="saving">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import axios from 'axios';

export default {
  components: { VueCal },
        data() {
        return {
          showModal: false,
          isEditing: false,
          appointmentDate: '',
          appointmentStartTime: '',
          appointmentEndTime: '',
          workoutType: '',
          selectedStaffName: '',
          selectedClientName: '',
          appointments: [],
          allStaffSelected: false,
          staff: [],
          clients: [],
          events: [],
          searchQuery: '',
          loading: false,
          saving: false, // Add saving state for form submission
          workouts: [
            { id: 1, label: 'Cardio' },
            { id: 2, label: 'Strength' },
            { id: 3, label: 'Yoga' },
            { id: 4, label: 'HIIT' },
            { id: 5, label: 'Pilates' },
            { id: 6, label: 'Crossfit' }
          ],
          selectedStaffId: '',
          selectedClientId: '',
          editingEventId: null,
          currentAppointmentRating: null,
          currentAppointmentStatus: '',
        }
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
    
    handleCellClick(date) {
      const clickedDate = date?.start ? new Date(date.start) : new Date(date)
      if (isNaN(clickedDate)) {
        return
      }
      
      // Fix timezone issue by using local date methods
      this.appointmentDate = clickedDate.getFullYear() + '-' + 
        String(clickedDate.getMonth() + 1).padStart(2, '0') + '-' + 
        String(clickedDate.getDate()).padStart(2, '0')
      const hour = clickedDate.getHours()
      this.appointmentStartTime = `${hour.toString().padStart(2, '0')}:00`
      this.appointmentEndTime = `${(hour + 1).toString().padStart(2, '0')}:00`
      this.showModal = true
    },
    handleEventClick(event) {
      this.isEditing = true;
      this.editingEventId = event.id; // Store the event ID for editing
      
      // Populate form fields from the event
      // Fix timezone issue by using local date methods
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      
      this.appointmentDate = startDate.getFullYear() + '-' + 
        String(startDate.getMonth() + 1).padStart(2, '0') + '-' + 
        String(startDate.getDate()).padStart(2, '0');
      this.appointmentStartTime = String(startDate.getHours()).padStart(2, '0') + ':' + 
        String(startDate.getMinutes()).padStart(2, '0');
      this.appointmentEndTime = String(endDate.getHours()).padStart(2, '0') + ':' + 
        String(endDate.getMinutes()).padStart(2, '0');
      
      // Set the dropdown values using the IDs
      this.selectedClientId = event.client_id || '';
      this.selectedStaffId = event.staff_id || '';
      this.workoutType = event.workout_id || '';
      
      // Capture rating and status from event
      this.currentAppointmentRating = event.rating || null;
      this.currentAppointmentStatus = event.status || '';
      
      this.showModal = true;
    },
    
    addEventClickListeners() {
      // This method is no longer needed as we're using Vue-Cal's built-in event handling
    },

    async saveAppointment() {
      try {
        // Set saving state to prevent multiple submissions
        this.saving = true;
        
        // Validate required fields
        if (!this.appointmentDate || !this.appointmentStartTime || !this.appointmentEndTime || 
            !this.selectedStaffId || !this.selectedClientId || !this.workoutType) {
          this.$bvToast.toast('Please fill in all required fields', {
            title: 'Validation Error',
            variant: 'warning',
            solid: true
          });
          this.saving = false;
          return;
        }

        // Convert to integers and validate
        const staffId = parseInt(this.selectedStaffId, 10);
        const clientId = parseInt(this.selectedClientId, 10);
        const workoutId = parseInt(this.workoutType, 10);

        // Check if conversions resulted in valid numbers
        if (isNaN(staffId) || isNaN(clientId) || isNaN(workoutId)) {
          this.$bvToast.toast('Invalid selection. Please select valid options.', {
            title: 'Validation Error',
            variant: 'warning',
            solid: true
          });
          this.saving = false;
          return;
        }

        const appointmentData = {
          date: this.appointmentDate,
          start_time: this.appointmentStartTime,
          end_time: this.appointmentEndTime,
          staff_id: staffId,
          client_id: clientId,
          workout_id: workoutId
        };
        
        let response;
        if (this.isEditing && this.editingEventId) {
          // Update existing appointment
          response = await axios.put(`/appointments/${this.editingEventId}`, appointmentData);
        } else {
          // Create new appointment
          response = await axios.post('/appointments', appointmentData);
        }
        
        if (response.data.success) {
          // Reload appointments from backend to get updated data
          await this.loadAppointments();
          
          // Force calendar refresh by updating events
          if (this.$refs.vuecal) {
            // VueCal doesn't have a refresh method, but we can force a re-render
            // by using Vue's reactivity system
            this.$forceUpdate();
          }
          
          this.$bvToast.toast(`Appointment ${this.isEditing ? 'updated' : 'saved'} successfully!`, {
            title: 'Success',
            variant: 'success',
            solid: true
          });
          this.closeModal();
          this.isEditing = false;
          this.editingEventId = null;
        } else {
          this.$bvToast.toast(`Backend error: ${response.data.message || 'Unknown error'}`, {
            title: 'Error',
            variant: 'danger',
            solid: true
          });
        }
      } catch (error) {
        // Provide more specific error messages
        let errorMessage = 'Unknown error occurred';
        if (error.response) {
          // Server responded with error status
          if (error.response.status === 422) {
            // Validation error - show detailed validation errors
            const validationErrors = error.response.data?.errors;
            if (validationErrors) {
              const errorList = Object.keys(validationErrors).map(key => {
                return validationErrors[key].join(', ');
              }).join('; ');
              errorMessage = `Validation error: ${errorList}`;
            } else if (error.response.data?.message) {
              errorMessage = error.response.data.message;
            } else {
              errorMessage = 'Validation error: Please check your input';
            }
          } else if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.status === 500) {
            errorMessage = 'Server error: Please try again later';
          } else {
            errorMessage = `Server error (${error.response.status})`;
          }
        } else if (error.request) {
          // Request was made but no response received
          errorMessage = 'Network error: Please check your connection';
        } else {
          // Something else happened
          errorMessage = error.message || 'Unknown error occurred';
        }
        
        this.$bvToast.toast(`Failed to ${this.isEditing ? 'update' : 'save'} appointment: ${errorMessage}`, {
          title: 'Error',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000
        });
      } finally {
        // Always reset saving state
        this.saving = false;
      }
    },
    async loadClients() {
      try {
        const response = await axios.get('/appointments/clients');
        if (response.data.success) {
          this.clients = response.data.data;
        }
      } catch (error) {
        // Error loading clients
      }
    },
    async loadStaff() {
      try {
        const response = await axios.get('/appointments/staff');
        if (response.data.success) {
          this.staff = response.data.data || [];
          
          // Log for debugging
          if (this.staff.length === 0) {
            console.warn('No staff/coaches found. Check database and gym_id filter.');
          } else {
            console.log(`Loaded ${this.staff.length} staff/coaches`);
          }
        } else {
          this.$bvToast.toast(response.data.message || 'Failed to load staff', {
            title: 'Error',
            variant: 'warning',
            solid: true
          });
        }
      } catch (error) {
        console.error('Error loading staff:', error);
        this.$bvToast.toast('Failed to load coaches. Please try refreshing the page.', {
          title: 'Error',
          variant: 'danger',
          solid: true
        });
      }
    },
    async loadAppointments() {
      this.loading = true;
      try {
        const response = await axios.get('/appointments');
        
        if (response.data.success) {
          // Clear existing events
          this.events = [];
          
          // Process each appointment
          response.data.data.forEach(appointment => {
            // Handle different possible date field names
            let startDate, endDate;
            
            if (appointment.start && appointment.end) {
              // If start/end fields exist
              startDate = new Date(appointment.start);
              endDate = new Date(appointment.end);
            } else if (appointment.start_time && appointment.end_time) {
              // If start_time/end_time fields exist
              const dateStr = appointment.date || new Date().toISOString().split('T')[0];
              startDate = new Date(`${dateStr}T${appointment.start_time}`);
              endDate = new Date(`${dateStr}T${appointment.end_time}`);
            } else if (appointment.date && appointment.start_time && appointment.end_time) {
              // If separate date, start_time, end_time fields exist
              startDate = new Date(`${appointment.date}T${appointment.start_time}`);
              endDate = new Date(`${appointment.date}T${appointment.end_time}`);
            } else {
              return; // Skip this appointment
            }
            
            // Validate dates
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
              return; // Skip this appointment
            }
            
            // Find staff and client names
            const staffObj = this.staff.find(s => s.id == appointment.staff_id || s.id == appointment.coach_id);
            const clientObj = this.clients.find(c => c.id == appointment.client_id || c.id == appointment.member_id);
            
            // Use title from backend (which includes rating if available), or build our own
            const eventTitle = appointment.title || 
              `${clientObj ? clientObj.name : 'Unknown Client'} - ${this.getWorkoutTypeLabel(appointment.workout_id)}`;
            
            const event = {
              id: appointment.id,
              start: startDate,
              end: endDate,
              title: eventTitle,
              client_id: appointment.client_id || appointment.member_id,
              staff_id: appointment.staff_id || appointment.coach_id,
              workout_id: appointment.workout_id,
              status: appointment.status || '',
              rating: appointment.rating || null,
              notes: appointment.notes || '',
              appointment_data: appointment
            };
            
            this.events.push(event);
          });
        }
        
      } catch (error) {
        // Error loading appointments
      } finally {
        this.loading = false;
      }
    },
    getWorkoutTypeLabel(workoutTypeId) {
      const workout = this.workouts.find(w => w.id == workoutTypeId);
      return workout ? workout.label : 'Unknown';
    },
    closeModal() {
      this.showModal = false
      this.isEditing = false
      this.editingEventId = null
      this.appointmentDate = ''
      this.appointmentStartTime = ''
      this.appointmentEndTime = ''
      this.selectedStaffId = ''
      this.selectedClientId = ''
      this.workoutType = ''
      this.currentAppointmentRating = null
      this.currentAppointmentStatus = ''
    },
    
    // Add a manual refresh method
    async refreshCalendar() {
      await this.loadAppointments();
      if (this.$refs.vuecal) {
        // VueCal doesn't have a refresh method, but we can force a re-render
        // by using Vue's reactivity system
        this.$forceUpdate();
      }
    }
  },
  async mounted() {
    // Load data in sequence to ensure dependencies are available
    try {
      await this.loadClients();
      await this.loadStaff();
      await this.loadAppointments();
      
      // Force calendar refresh after all data is loaded
      this.$nextTick(() => {
        if (this.$refs.vuecal) {
          // VueCal doesn't have a refresh method, but we can force a re-render
          // by using Vue's reactivity system
          this.$forceUpdate();
        }
      });
    } catch (error) {
      // Error during component initialization
    }
  },
  
  // Add error boundary for better debugging
  errorCaptured(err, vm, info) {
    return false; // Prevent error from propagating
  },
  
  updated() {
    // Vue-Cal should handle event clicks automatically
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/sass/_variables.scss";

/* ===========================================
   BREADCRUMB NAVIGATION STYLES
   =========================================== */

// Breadcrumb and Navigation Row
.breadcrumb-nav-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 1rem 0;
    gap: 1rem;
}

// Breadcrumb Navigation Styles
.breadcrumb-section {
    flex: 1;
    
    .breadcrumb-nav {
        .breadcrumb-container {
            display: flex;
            align-items: center;
            gap: 1rem;
            
            .back-button {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                color: $color-text-dark;
                cursor: pointer;
                transition: all 0.3s ease;
                
                &:hover {
                    background: rgba(255, 255, 255, 0.15);
                    border-color: rgba(255, 255, 255, 0.3);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    color: $primary;
                }
                
                i {
                    font-size: 1.1em;
                }
            }
            
            .breadcrumb {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin: 0;
                padding: 0;
                background: none;
                border-radius: 0;
                
                .breadcrumb-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: $font-size-sm;
                    color: $color-muted;
                    
                    &.active {
                        color: $color-text-dark;
                        font-weight: 600;
                        
                        i {
                            color: $primary;
                        }
                    }
                    
                    a {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        color: $color-muted;
                        text-decoration: none;
                        transition: color 0.3s ease;
                        
                        &:hover {
                            color: $primary;
                            
                            i {
                                color: $primary;
                            }
                        }
                        
                        i {
                            font-size: 0.9em;
                            transition: color 0.3s ease;
                        }
                    }
                    
                    &:not(:last-child)::after {
                        content: "›";
                        margin-left: 0.5rem;
                        color: $color-muted;
                        font-size: 1.2em;
                    }
                }
            }
        }
    }
}

// Refresh Section Styles
.refresh-section {
    display: flex;
    align-items: center;
    
    .refresh-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: $font-size-sm;
        font-weight: 500;
        transition: all 0.3s ease;
        
        &:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        i {
            font-size: 0.9em;
        }
    }
}

// Responsive Design
@media (max-width: $breakpoint-md) {
    .breadcrumb-nav-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
    
    .breadcrumb-section {
        width: 100%;
        
        .breadcrumb-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            
            .breadcrumb {
                flex-wrap: wrap;
                
                .breadcrumb-item {
                    font-size: 0.8rem;
                    
                    a {
                        font-size: 0.8rem;
                    }
                }
            }
        }
    }
    
    .refresh-section {
        width: 100%;
        justify-content: flex-end;
        
        .refresh-btn {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
        }
    }
}

/* Override main content font size */
:deep(.layout-sidebar-large .main-content-wrap) {
  font-size: 0.8rem !important;
}

/* Target the appointment page specifically */
.appointment-page {
  font-size: 0.8rem !important;
}

/* Target all content within the appointment page */
.appointment-page * {
  font-size: 0.8rem !important;
}

h2 {
  font-size: $font-size-lg;
  margin-bottom: 15px;
  color: $color-heading;
}
label{
  padding-top: 10px !important;
  color: $color-text-dark;
  font-weight: 600;
}
input {
  max-width: 440px;
  border-radius: 20px;
  border: 1px solid $input-border-color;
  background-color: $input-focus-bg;
  color: $color-text-dark;
}

select {
  max-width: 440px;
  border-radius: 20px;
  padding: 5px 10px;
  border: 1px solid $input-border-color;
  background-color: $input-focus-bg;
  color: $color-text-dark;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $color-overlay;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050; // Standard Bootstrap modal z-index
  opacity: 1 !important;
}

.modal-box {
  background-color: $color-card-bg;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: $shadow-lg;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 1 !important;
  position: relative;
  z-index: 1051; // Slightly above backdrop
}

.modal-box:hover {
  transform: scale(1.01);
  box-shadow: 0 15px 35px $color-shadow-heavy;
}

.modal-box h3 {
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 700;
  color: $color-button;
}



.modal-box input,
.modal-box select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid $input-border-color;
  border-radius: 6px;
  transition: border-color 0.3s;
  box-shadow: $shadow-sm;
  background-color: $input-focus-bg;
  color: $color-text-dark;
}

.modal-box input:focus,
.modal-box select:focus {
  border-color: $input-focus-border;
  outline: none;
  box-shadow: 0 4px 10px rgba($color-button, 0.3);
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 20px;
}

.modal-actions button {
  flex: 1;
  padding: 0.6rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.modal-actions button[type="submit"] {
  background-color: $btn-primary-bg;
  color: $color-white;
}

.modal-actions button[type="submit"]:hover {
  background-color: $btn-primary-hover-bg;
  transform: scale(1.03);
}

.modal-actions button[type="button"] {
  background-color: $btn-secondary-bg;
  color: $color-white;
}

.modal-actions button[type="button"]:hover {
  background-color: $btn-secondary-hover-bg;
  transform: scale(1.03);
}

/* Rating Display Styles */
.rating-display {
  padding: 0.75rem;
  background-color: $input-focus-bg;
  border: 1px solid $input-border-color;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  
  .rating-value {
    color: #F59E0B;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    i {
      font-size: 1.2rem;
    }
  }
  
  .no-rating {
    color: $color-muted;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    i {
      font-size: 1.2rem;
    }
  }
}
/* Header styling */
.refresh-btn {
  background: $gradient-primary;
  border: none;
  border-radius: $border-radius-md;
  padding: $padding-sm $padding-md;
  font-weight: $font-weight-medium;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: $box-shadow-md;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  i {
    margin-right: $margin-xs;
  }
}

/* Override main content font size */
:deep(.layout-sidebar-large .main-content-wrap) {
  font-size: 0.8rem !important;
}

/* Target the appointment page specifically */
.appointment-page {
  font-size: 0.8rem !important;
}

/* VueCal container styling */
.vuecal {
  font-family: $font-family-base;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: $shadow-lg;
  background-color: $color-card-bg;
  border: 1px solid $color-border-muted;
  color: $color-text-dark;
}

/* Header bar */
.vuecal__header {
  background-color: $color-button;
  color: $color-white;
  padding: 12px;
  font-weight: bold;
  font-size: $font-size-lg;
  border-bottom: 1px solid $color-border-muted;
}

/* Navigation buttons */
.vuecal__arrow {
  color: $color-white;
  font-size: $font-size-xl;
  transition: transform 0.3s;
}

.vuecal__arrow:hover {
  transform: scale(1.1);
}

/* Days of the week */
.vuecal__weekdays {
  background-color: $color-background-hover;
  color: $color-text-dark;
  font-weight: 600;
  border-bottom: 1px solid $color-border-muted;
}

/* Time labels */
.vuecal__time-column {
  background-color: $color-background;
  color: $color-text-dark;
  font-size: $font-size-sm;
}

/* Cells */
.vuecal__cell {
  transition: background-color 0.2s;
}

.vuecal__cell:hover {
  background-color: $color-background-hover;
  cursor: pointer;
}

/* Selected cell (when clicked) */
.vuecal__cell--selected {
  background-color: $color-info-light !important;
  border-left: 3px solid $color-button;
}

/* Events */
.vuecal__event {
  background-color: #bfd7ff;
  color: $color-white;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: $font-size-sm;
  transition: transform 0.2s;
  margin: 2px;
  cursor: pointer;
  user-select: none;
}

.vuecal__event:hover {
  background-color: $color-button-hover;
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Scrollbars (optional for modern feel) */
.vuecal__scroll-area::-webkit-scrollbar {
  width: 6px;
}

.vuecal__scroll-area::-webkit-scrollbar-thumb {
  background-color: $color-border;
  border-radius: 10px;
}

/* Hide year and month view tabs in vue-cal */
.vuecal__view-btn[title="Year"],
.vuecal__view-btn[title="Month"] {
  display: none !important;
}

/* Event Options Modal Styles */
.event-options-modal {
  max-width: 400px !important;
}

.event-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}

.option-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  
  i {
    font-size: 1.2rem;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}

.edit-btn {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  
  &:hover {
    background: linear-gradient(135deg, #0056b3, #004085);
  }
}

.add-btn {
  background: linear-gradient(135deg, #28a745, #1e7e34);
  color: white;
  
  &:hover {
    background: linear-gradient(135deg, #1e7e34, #155724);
  }
}

.delete-btn {
  background: linear-gradient(135deg, #dc3545, #c82333);
  color: white;
  
  &:hover {
    background: linear-gradient(135deg, #c82333, #a71e2a);
  }
}

.cancel-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #5a6268;
    transform: scale(1.05);
  }
}

/* Ensure Bootstrap Vue toasts appear above modals */
:deep(.b-toast) {
  z-index: 1100 !important;
}

:deep(.b-toast-slot) {
  z-index: 1100 !important;
}
</style>