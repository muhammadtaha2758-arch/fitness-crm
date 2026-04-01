<template>
  <div class="opening-hours-page">
    <!-- Page Title -->
    <div class="page-title">
      <h1>Opening Hours</h1>
      <p class="page-description">Enter this club's opening hours here.</p>
    </div>

    <!-- Opening Hours Card -->
    <div class="opening-hours-card">
      <!-- Opening Hours Configuration -->
      <div class="hours-configuration">
        <div v-for="(day, index) in daysOfWeek" :key="day.key" class="day-row">
          <div class="day-name">{{ day.name }}</div>
          
          <div class="day-controls">
            <!-- Add Time Slot Button -->
            <button 
              v-if="!day.isClosed && day.timeSlots.length < 3"
              class="add-btn"
              @click="addTimeSlot(index)"
              type="button"
            >
              <i class="fas fa-plus"></i>
            </button>

            <!-- Time Slots -->
            <div v-if="!day.isClosed" class="time-slots">
              <div 
                v-for="(slot, slotIndex) in day.timeSlots" 
                :key="slotIndex"
                class="time-slot"
              >
                <!-- Start Time -->
                <div class="time-input-group">
                  <select 
                    v-model="slot.startHour" 
                    class="time-select"
                    @change="validateTimeSlot(index, slotIndex)"
                  >
                    <option v-for="hour in hours" :key="hour" :value="hour">
                      {{ hour.toString().padStart(2, '0') }}
                    </option>
                  </select>
                  <span class="time-separator">:</span>
                  <select 
                    v-model="slot.startMinute" 
                    class="time-select"
                    @change="validateTimeSlot(index, slotIndex)"
                  >
                    <option v-for="minute in minutes" :key="minute" :value="minute">
                      {{ minute.toString().padStart(2, '0') }}
                    </option>
                  </select>
                </div>

                <span class="till-text">till</span>

                <!-- End Time -->
                <div class="time-input-group">
                  <select 
                    v-model="slot.endHour" 
                    class="time-select"
                    @change="validateTimeSlot(index, slotIndex)"
                  >
                    <option v-for="hour in hours" :key="hour" :value="hour">
                      {{ hour.toString().padStart(2, '0') }}
                    </option>
                  </select>
                  <span class="time-separator">:</span>
                  <select 
                    v-model="slot.endMinute" 
                    class="time-select"
                    @change="validateTimeSlot(index, slotIndex)"
                  >
                    <option v-for="minute in minutes" :key="minute" :value="minute">
                      {{ minute.toString().padStart(2, '0') }}
                    </option>
                  </select>
                </div>

                <!-- Remove Time Slot Button -->
                <button 
                  class="remove-btn"
                  @click="removeTimeSlot(index, slotIndex)"
                  type="button"
                >
                  <i class="fas fa-minus"></i>
                </button>
              </div>
            </div>

            <!-- Closed Display -->
            <div v-if="day.isClosed" class="closed-display">
              Closed
            </div>

            <!-- 24 Hours Toggle -->
            <button 
              class="twenty-four-btn"
              :class="{ active: day.is24Hours }"
              @click="toggle24Hours(index)"
              type="button"
            >
              <i class="fas fa-store"></i>
              <span>24</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Opening Hours Notes -->
      <div class="notes-section">
        <div class="notes-header">
          <label class="notes-label">Opening Hours Notes</label>
          <i class="fas fa-info-circle info-icon"></i>
        </div>
        <textarea 
          v-model="openingHoursNotes"
          class="notes-textarea"
          placeholder="Call today to schedule your assessment!"
          rows="4"
        ></textarea>
      </div>

      <!-- Save Button -->
      <div class="form-actions">
        <button 
          class="save-btn"
          @click="saveOpeningHours"
          :disabled="isSaving"
          type="button"
        >
          <span v-if="isSaving">Saving...</span>
          <span v-else>Save</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import NProgress from "nprogress";

export default {
  metaInfo: {
    title: "Opening Hours"
  },
  data() {
    return {
      isSaving: false,
      openingHoursNotes: "Call today to schedule your assessment!",
      hours: Array.from({ length: 24 }, (_, i) => i),
      minutes: Array.from({ length: 60 }, (_, i) => i),
      daysOfWeek: [
        { 
          key: 'monday', 
          name: 'Monday', 
          isClosed: false, 
          is24Hours: false,
          timeSlots: [{ startHour: 9, startMinute: 0, endHour: 18, endMinute: 0 }]
        },
        { 
          key: 'tuesday', 
          name: 'Tuesday', 
          isClosed: false, 
          is24Hours: false,
          timeSlots: [{ startHour: 9, startMinute: 0, endHour: 18, endMinute: 0 }]
        },
        { 
          key: 'wednesday', 
          name: 'Wednesday', 
          isClosed: false, 
          is24Hours: false,
          timeSlots: [{ startHour: 9, startMinute: 0, endHour: 18, endMinute: 0 }]
        },
        { 
          key: 'thursday', 
          name: 'Thursday', 
          isClosed: false, 
          is24Hours: false,
          timeSlots: [{ startHour: 9, startMinute: 0, endHour: 18, endMinute: 0 }]
        },
        { 
          key: 'friday', 
          name: 'Friday', 
          isClosed: false, 
          is24Hours: false,
          timeSlots: [{ startHour: 9, startMinute: 0, endHour: 18, endMinute: 0 }]
        },
        { 
          key: 'saturday', 
          name: 'Saturday', 
          isClosed: false, 
          is24Hours: false,
          timeSlots: [{ startHour: 9, startMinute: 0, endHour: 18, endMinute: 0 }]
        },
        { 
          key: 'sunday', 
          name: 'Sunday', 
          isClosed: true, 
          is24Hours: false,
          timeSlots: []
        }
      ]
    };
  },

  methods: {
    ...mapActions(["refreshUserPermissions"]),

    addTimeSlot(dayIndex) {
      const day = this.daysOfWeek[dayIndex];
      if (day.timeSlots.length < 3) {
        day.timeSlots.push({
          startHour: 9,
          startMinute: 0,
          endHour: 18,
          endMinute: 0
        });
      }
    },

    removeTimeSlot(dayIndex, slotIndex) {
      const day = this.daysOfWeek[dayIndex];
      if (day.timeSlots.length > 1) {
        day.timeSlots.splice(slotIndex, 1);
      }
    },

    toggle24Hours(dayIndex) {
      const day = this.daysOfWeek[dayIndex];
      day.is24Hours = !day.is24Hours;
      
      if (day.is24Hours) {
        day.isClosed = false;
        day.timeSlots = [{ startHour: 0, startMinute: 0, endHour: 23, endMinute: 59 }];
      } else {
        day.timeSlots = [{ startHour: 9, startMinute: 0, endHour: 18, endMinute: 0 }];
      }
    },

    validateTimeSlot(dayIndex, slotIndex) {
      const slot = this.daysOfWeek[dayIndex].timeSlots[slotIndex];
      const startTime = slot.startHour * 60 + slot.startMinute;
      const endTime = slot.endHour * 60 + slot.endMinute;
      
      if (endTime <= startTime) {
        slot.endHour = slot.startHour;
        slot.endMinute = slot.startMinute + 30;
        if (slot.endMinute >= 60) {
          slot.endHour = (slot.endHour + 1) % 24;
          slot.endMinute = slot.endMinute - 60;
        }
      }
    },

    saveOpeningHours() {
      this.isSaving = true;
      NProgress.start();
      
      const data = {
        opening_hours: this.daysOfWeek,
        opening_hours_notes: this.openingHoursNotes
      };

      axios.post('settings/opening-hours', data)
        .then(response => {
          this.makeToast("success", "Opening hours saved successfully", "Success");
          NProgress.done();
          this.isSaving = false;
        })
        .catch(error => {
          this.makeToast("danger", "Failed to save opening hours", "Error");
          NProgress.done();
          this.isSaving = false;
        });
    },

    //------ Toast
    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },

    loadOpeningHours() {
      axios.get('settings/opening-hours')
        .then(response => {
          if (response.data.opening_hours) {
            this.daysOfWeek = response.data.opening_hours;
          }
          if (response.data.opening_hours_notes) {
            this.openingHoursNotes = response.data.opening_hours_notes;
          }
        })
        .catch(error => {
          console.error('Failed to load opening hours:', error);
        });
    }
  },

  created() {
    this.loadOpeningHours();
  }
};
</script>

<style lang="scss">
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

.opening-hours-page {
  min-height: 100vh;
  background: $color-background;
  padding: $padding-md;
}

.page-title {
  margin-bottom: $margin-lg;
  
  h1 {
    font-size: $font-size-xxl;
    font-weight: $font-weight-bold;
    color: $color-heading;
    margin: 0 0 $padding-xs 0;
  }
  
  .page-description {
    color: $color-muted;
    font-size: $font-size-sm;
    margin: 0;
  }
}

.opening-hours-card {
  background: $color-white;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-md;
  padding: $margin-lg;
  max-width: 800px;
  margin: 0 auto;
}

.hours-configuration {
  margin-bottom: $margin-xl;
}

.day-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $padding-md 0;
  border-bottom: $border-width-sm solid $color-border-muted;
  
  &:last-child {
    border-bottom: none;
  }
}

.day-name {
  font-weight: $font-weight-semibold;
  color: $color-heading;
  font-size: $font-size-sm;
  min-width: 100px;
}

.day-controls {
  display: flex;
  align-items: center;
  gap: $padding-sm;
  flex: 1;
}

.add-btn {
  background: $color-button;
  color: $color-white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: $color-button-hover;
    transform: scale(1.05);
  }
  
  i {
    font-size: $font-size-xs;
  }
}

.time-slots {
  display: flex;
  flex-direction: column;
  gap: $padding-sm;
  flex: 1;
}

.time-slot {
  display: flex;
  align-items: center;
  gap: $padding-sm;
}

.time-input-group {
  display: flex;
  align-items: center;
  gap: 2px;
}

.time-select {
  background: $color-white;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-sm;
  padding: $padding-xs $padding-sm;
  font-size: $font-size-sm;
  color: $color-heading;
  min-width: 50px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: $color-button;
    box-shadow: 0 0 0 2px rgba($color-button, 0.1);
  }
}

.time-separator {
  color: $color-muted;
  font-weight: $font-weight-semibold;
}

.till-text {
  color: $color-muted;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  margin: 0 $padding-sm;
}

.remove-btn {
  background: $color-danger;
  color: $color-white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: color.adjust($color-danger, $lightness: -10%);
    transform: scale(1.05);
  }
  
  i {
    font-size: $font-size-xs;
  }
}

.closed-display {
  color: $color-muted;
  font-size: $font-size-sm;
  font-style: italic;
  padding: $padding-sm;
}

.twenty-four-btn {
  background: $color-background-hover;
  color: $color-muted;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-md;
  padding: $padding-xs $padding-sm;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: $padding-xs;
  font-size: $font-size-xs;
  
  &:hover {
    background: $color-white;
    border-color: $color-button;
    color: $color-button;
  }
  
  &.active {
    background: $color-button;
    color: $color-white;
    border-color: $color-button;
  }
  
  i {
    font-size: $font-size-xs;
  }
}

.notes-section {
  margin-bottom: $margin-xl;
  border-top: $border-width-sm solid $color-border-muted;
  padding-top: $margin-lg;
}

.notes-header {
  display: flex;
  align-items: center;
  gap: $padding-xs;
  margin-bottom: $padding-sm;
}

.notes-label {
  font-weight: $font-weight-semibold;
  color: $color-heading;
  font-size: $font-size-sm;
}

.info-icon {
  color: $color-muted;
  font-size: $font-size-xs;
  cursor: help;
  
  &:hover {
    color: $color-button;
  }
}

.notes-textarea {
  width: 100%;
  background: $color-input-bg;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-md;
  padding: $padding-md;
  font-size: $font-size-sm;
  color: $color-heading;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: $color-button;
    background: $color-white;
    box-shadow: 0 0 0 3px rgba($color-button, 0.1);
  }
  
  &::placeholder {
    color: $color-muted;
  }
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.save-btn {
  background: $color-button;
  color: $color-white;
  border: none;
  border-radius: $border-radius-md;
  padding: $padding-sm $padding-lg;
  font-weight: $font-weight-semibold;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: $color-button-hover;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: $color-muted;
    cursor: not-allowed;
    transform: none;
  }
}

/* Responsive Design */
@media (max-width: $breakpoint-md) {
  .opening-hours-page {
    padding: $padding-sm;
  }
  
  .opening-hours-card {
    padding: $padding-md;
  }
  
  .day-row {
    flex-direction: column;
    align-items: flex-start;
    gap: $padding-sm;
  }
  
  .day-name {
    min-width: auto;
  }
  
  .day-controls {
    width: 100%;
    justify-content: space-between;
  }
  
  .time-slot {
    flex-wrap: wrap;
    gap: $padding-xs;
  }
}
</style>
