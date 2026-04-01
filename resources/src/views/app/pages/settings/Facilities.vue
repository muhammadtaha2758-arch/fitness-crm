<template>
  <div class="facilities-component">
    <div class="content-header">
      <h2>Facilities</h2>
      <p class="content-description">
        This company information is publicly available to your clients and to our millions of Virtuagym users to learn about your business.
      </p>
    </div>

    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <div v-if="!isLoading">
      <div class="facilities-section">
        <h3 class="section-title">Your available services</h3>
        
        <div class="services-list">
          <div 
            v-for="service in services" 
            :key="service.id" 
            class="service-item"
            :class="{ 'service-active': service.enabled }"
          >
            <div class="service-content">
              <div class="service-icon">
                <i :class="service.icon"></i>
              </div>
              <span class="service-name">{{ service.name }}</span>
            </div>
            <div class="service-toggle">
              <label class="toggle-switch">
                <input 
                  type="checkbox" 
                  v-model="service.enabled"
                  @change="updateService(service)"
                />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="form-actions">
        <button class="submit-btn" type="button" @click="saveSettings">
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import NProgress from "nprogress";

export default {
  name: "Facilities",
  data() {
    return {
      isLoading: true,
      services: [
        {
          id: 'gym-strength',
          name: 'Gym / Strength Training',
          icon: 'fas fa-dumbbell',
          enabled: true
        },
        {
          id: 'group-exercise-live',
          name: 'Group Exercise - Live',
          icon: 'fas fa-users',
          enabled: true
        },
        {
          id: 'group-exercise-virtual',
          name: 'Group Exercise - Virtual',
          icon: 'fas fa-users',
          enabled: true
        },
        {
          id: 'personal-training',
          name: 'Personal Training',
          icon: 'fas fa-user-friends',
          enabled: true
        },
        {
          id: 'physiotherapy',
          name: 'Physiotherapy',
          icon: 'fas fa-running',
          enabled: false
        },
        {
          id: 'female-only',
          name: 'Female only',
          icon: 'fas fa-venus',
          enabled: false
        },
        {
          id: '24h',
          name: '24H',
          icon: 'fas fa-clock',
          enabled: false
        },
        {
          id: 'bootcamp',
          name: 'Bootcamp',
          icon: 'fas fa-fire',
          enabled: true
        },
        {
          id: 'crossfit',
          name: 'Crossfit',
          icon: 'fas fa-weight-hanging',
          enabled: false
        },
        {
          id: 'martial-arts',
          name: 'Martial Arts',
          icon: 'fas fa-fist-raised',
          enabled: false
        },
        {
          id: 'swimming',
          name: 'Swimming',
          icon: 'fas fa-swimmer',
          enabled: false
        },
        {
          id: 'ems-training',
          name: 'EMS Training',
          icon: 'fas fa-bolt',
          enabled: false
        },
        {
          id: 'sauna',
          name: 'Sauna',
          icon: 'fas fa-hot-tub',
          enabled: false
        }
      ]
    };
  },

  methods: {
    ...mapActions(["refreshUserPermissions"]),

    updateService(service) {
      // You can add any immediate feedback or validation here
      console.log(`${service.name} is now ${service.enabled ? 'enabled' : 'disabled'}`);
    },

    saveSettings() {
      NProgress.start();
      NProgress.set(0.1);

      // Prepare data for API call
      const facilitiesData = {
        services: this.services.map(service => ({
          id: service.id,
          enabled: service.enabled
        }))
      };

      // Make API call to save facilities settings
      axios
        .post("settings/facilities", facilitiesData)
        .then(response => {
          this.makeToast(
            "success",
            "Facilities settings updated successfully",
            "Success"
          );
          this.refreshUserPermissions();
          NProgress.done();
        })
        .catch(error => {
          this.makeToast("danger", "Failed to update facilities settings", "Error");
          NProgress.done();
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

    // Load facilities settings from API
    loadFacilitiesSettings() {
      axios
        .get("settings/facilities")
        .then(response => {
          if (response.data.services) {
            // Update services with saved data
            this.services.forEach(service => {
              const savedService = response.data.services.find(s => s.id === service.id);
              if (savedService) {
                service.enabled = savedService.enabled;
              }
            });
          }
          this.isLoading = false;
        })
        .catch(error => {
          console.error('Failed to load facilities settings:', error);
          this.isLoading = false;
        });
    }
  },

  created() {
    this.loadFacilitiesSettings();
  }
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

.facilities-component {
  padding: $margin-lg;
}

.content-header {
  margin-bottom: $margin-lg;
  
  h2 {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-heading;
    margin: 0 0 $padding-xs 0;
  }
  
  .content-description {
    color: $color-muted;
    font-size: $font-size-sm;
    line-height: $line-height-sm;
    margin: 0;
  }
}

.facilities-section {
  margin-bottom: $margin-lg;
}

.section-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  color: $color-heading;
  margin-bottom: $margin-md;
}

.services-list {
  display: flex;
  flex-direction: column;
  gap: $padding-xs;
}

.service-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $padding-md;
  background: $color-background-hover;
  border-radius: $border-radius-md;
  transition: all 0.2s ease;
  
  &:hover {
    background: color.adjust($color-background-hover, $lightness: 2%);
  }
  
  &.service-active {
    background: color.adjust($color-button, $lightness: 45%);
  }
}

.service-content {
  display: flex;
  align-items: center;
  gap: $padding-md;
}

.service-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  i {
    font-size: $font-size-md;
    color: $color-heading;
  }
}

.service-name {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $color-heading;
}

.service-toggle {
  display: flex;
  align-items: center;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  cursor: pointer;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $color-border-muted;
  transition: 0.3s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-switch input:checked + .toggle-slider {
  background-color: $color-button;
}

.toggle-switch input:checked + .toggle-slider:before {
  transform: translateX(26px);
}

.form-actions {
  margin-top: $margin-lg;
  display: flex;
  justify-content: flex-end;
  gap: $padding-sm;
}

.submit-btn {
  background: $color-button;
  color: $color-white;
  border: none;
  padding: $padding-sm $padding-lg;
  border-radius: $border-radius-md;
  font-weight: $font-weight-semibold;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: $color-button-hover;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.loading_page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

/* Responsive Design */
@media (max-width: $breakpoint-md) {
  .facilities-component {
    padding: $padding-md;
  }
  
  .service-item {
    padding: $padding-sm;
  }
  
  .service-content {
    gap: $padding-sm;
  }
  
  .service-icon {
    width: 20px;
    height: 20px;
    
    i {
      font-size: $font-size-sm;
    }
  }
  
  .service-name {
    font-size: $font-size-xs;
  }
}
</style>
