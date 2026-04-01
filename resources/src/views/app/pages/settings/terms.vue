<template>
  <div class="contracts-agreements-page">
    <!-- Page Header -->
    <div class="content-header">
      <h2>Contracts agreements and conditions</h2>
      <p class="content-description">
        Manage and personalize the legal text shown on your contracts. Variables you can use: {PAYMENT_METHOD}
      </p>
    </div>

    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <div v-if="!isLoading">
      <validation-observer ref="form_contracts">
        <form @submit.prevent="Submit_Contracts">
          <!-- Terms and Conditions Section -->
          <div class="terms-section">
            <div class="section-header">
              <h3>Terms and Conditions</h3>
              <a href="#" class="add-field-link" @click.prevent="addNewField">
                Add a new field
              </a>
            </div>

            <!-- Language Selector -->
            <div class="language-selector">
              <label class="field-label">Language</label>
              <select class="field-input field-select" v-model="selectedLanguage" @change="loadTermsForLanguage">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="nl">Dutch</option>
              </select>
            </div>

            <!-- Terms Text Area -->
            <div class="terms-textarea">
              <textarea
                class="field-input field-textarea terms-textarea-input"
                rows="12"
                placeholder="Enter your terms and conditions here..."
                v-model="termsContent"
              ></textarea>
            </div>

            <!-- Additional Fields -->
            <div v-if="additionalFields.length > 0" class="additional-fields">
              <div v-for="(field, index) in additionalFields" :key="index" class="additional-field">
                <div class="field-header">
                  <input
                    type="text"
                    class="field-input field-title-input"
                    v-model="field.title"
                    placeholder="Field title"
                  />
                  <button type="button" class="remove-field-btn" @click="removeField(index)">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <textarea
                  class="field-input field-textarea"
                  rows="6"
                  v-model="field.content"
                  :placeholder="`Enter ${field.title || 'field'} content...`"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <div class="form-actions">
            <button class="submit-btn" type="submit">
              Save and update agreements
            </button>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import NProgress from "nprogress";

export default {
  metaInfo: {
    title: "Contracts Agreements and Conditions"
  },
  data() {
    return {
      isLoading: true,
      selectedLanguage: 'en',
      termsContent: '',
      additionalFields: [],
      contractsData: {
        terms_and_conditions: {},
        additional_fields: []
      }
    };
  },
  methods: {
    ...mapActions(["refreshUserPermissions"]),

    // Load terms and conditions data
    async loadContractsData() {
      try {
        const response = await axios.get('get_contracts_data');
        if (response.data.success && response.data.data) {
          this.contractsData = response.data.data;
          this.loadTermsForLanguage();
        } else {
          // Initialize with empty data if no data exists
          this.contractsData = {
            terms_and_conditions: {},
            additional_fields: {}
          };
          this.loadTermsForLanguage();
        }
      } catch (error) {
        console.error('Error loading contracts data:', error);
        this.makeToast("danger", "Failed to load contracts data", "Error");
        // Initialize with empty data on error
        this.contractsData = {
          terms_and_conditions: {},
          additional_fields: {}
        };
        this.loadTermsForLanguage();
      } finally {
        this.isLoading = false;
      }
    },

    // Load terms for selected language
    loadTermsForLanguage() {
      // Load terms content
      if (this.contractsData.terms_and_conditions && this.contractsData.terms_and_conditions[this.selectedLanguage]) {
        this.termsContent = this.contractsData.terms_and_conditions[this.selectedLanguage];
      } else {
        this.termsContent = '';
      }
      
      // Load additional fields for selected language
      if (this.contractsData.additional_fields && this.contractsData.additional_fields[this.selectedLanguage]) {
        this.additionalFields = Array.isArray(this.contractsData.additional_fields[this.selectedLanguage]) 
          ? this.contractsData.additional_fields[this.selectedLanguage].map(field => ({
              ...field,
              language: this.selectedLanguage
            }))
          : [];
      } else {
        this.additionalFields = [];
      }
    },

    // Add new field
    addNewField() {
      this.additionalFields.push({
        title: '',
        content: '',
        language: this.selectedLanguage
      });
    },

    // Remove field
    removeField(index) {
      this.additionalFields.splice(index, 1);
    },

    // Submit form
    Submit_Contracts() {
      this.$refs.form_contracts.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            "Please fill the form correctly",
            "Failed"
          );
        } else {
          this.Update_Contracts();
        }
      });
    },

    // Update contracts
    Update_Contracts() {
      NProgress.start();
      NProgress.set(0.1);

      const data = {
        language: this.selectedLanguage,
        terms_content: this.termsContent,
        additional_fields: this.additionalFields
      };

      axios
        .post("update_contracts", data)
        .then(response => {
          this.makeToast(
            "success",
            "Contracts updated successfully",
            "Success"
          );
          this.refreshUserPermissions();
          NProgress.done();
        })
        .catch(error => {
          this.makeToast("danger", "Failed to update contracts", "Failed");
          NProgress.done();
        });
    },

    // Toast notification
    makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    }
  },

  // Created hook
  created: function() {
    this.loadContractsData();
  }
};
</script>

<style lang="scss">
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

.contracts-agreements-page {
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

.terms-section {
  background: $color-white;
  border-radius: $border-radius-lg;
  padding: $margin-lg;
  box-shadow: $box-shadow-md;
  margin-bottom: $margin-lg;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $margin-lg;
  
  h3 {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-heading;
    margin: 0;
  }
}

.add-field-link {
  color: $color-button;
  text-decoration: none;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  
  &:hover {
    color: $color-button-hover;
    text-decoration: underline;
  }
}

.language-selector {
  margin-bottom: $margin-lg;
  
  .field-label {
    font-weight: $font-weight-semibold;
    color: $color-heading;
    margin-bottom: $padding-xs;
    font-size: $font-size-sm;
    display: block;
  }
}

.field-input {
  width: 100%;
  padding: $padding-sm $padding-md;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-md;
  font-size: $font-size-sm;
  background: $color-input-bg;
  color: $color-heading;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: $color-button;
    background: $color-white;
    box-shadow: 0 0 0 3px rgba($color-button, 0.1);
  }
}

.field-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right $padding-sm center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: $padding-xl;
  appearance: none;
  max-width: 200px;
}

.field-textarea {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

.terms-textarea {
  margin-bottom: $margin-lg;
}

.terms-textarea-input {
  min-height: 300px;
  font-family: 'Courier New', monospace;
  line-height: 1.5;
}

.additional-fields {
  margin-top: $margin-lg;
  border-top: $border-width-sm solid $color-border-muted;
  padding-top: $margin-lg;
}

.additional-field {
  margin-bottom: $margin-lg;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.field-header {
  display: flex;
  align-items: center;
  gap: $padding-sm;
  margin-bottom: $padding-sm;
}

.field-title-input {
  flex: 1;
  max-width: 300px;
}

.remove-field-btn {
  background: $color-danger;
  color: $color-white;
  border: none;
  border-radius: $border-radius-sm;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: color.adjust($color-danger, $lightness: -10%);
  }
  
  i {
    font-size: $font-size-xs;
  }
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: $margin-lg;
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
  .contracts-agreements-page {
    padding: $padding-md;
  }
  
  .terms-section {
    padding: $padding-md;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: $padding-sm;
  }
  
  .field-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .field-title-input {
    max-width: 100%;
  }
}
</style>