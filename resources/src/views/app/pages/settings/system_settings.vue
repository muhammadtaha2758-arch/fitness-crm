<template>
  <div class="settings-page">
    <!-- Page Title -->
    <div class="page-title">
      <h1>System settings</h1>
      <button 
        class="help-btn" 
        @click="openVideoTutorialModal"
        title="Help"
      >
        <i class="fas fa-video"></i>
        <span>Help</span>
      </button>
    </div>

        <!-- Two-pane Settings Layout: left nav + right content -->
        <div class="settings-layout">
          <!-- Left Sidebar Sections -->
          <aside class="settings-sidebar">
        <div v-for="group in filteredSideNav" :key="group.key" class="nav-group">
          <div class="nav-group-title">{{ group.title }}</div>
          <ul class="nav-items">
                <li
                  v-for="item in group.items"
                  :key="item.id"
              :class="['nav-item', { active: item.id === selectedSectionId }]"
                  @click="selectSection(item.id)"
                >
                  <span class="nav-item-label">{{ item.label }}</span>
                  <div class="nav-item-actions">
                    <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
                    <i v-if="item.external" class="fas fa-external-link-alt external-icon"></i>
                  </div>
                </li>
              </ul>
            </div>
          </aside>

          <!-- Right Content Area -->
          <section class="settings-content">
        <!-- Business Info Section -->
        <div v-show="selectedSectionId === 'business-info'" class="content-card">
          <div class="content-header">
            <h2>Business Info</h2>
            <p class="content-description">
              This company information is publicly available to your members and to our millions of Virtuagym users to learn about your business.
            </p>
        </div>

				<div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

				<div v-if="!isLoading">
          <validation-observer ref="form_setting">
            <form @submit.prevent="Submit_Setting">
                <div class="form-fields">
                    <!-- Company Name -->
                  <div class="form-field">
                    <label class="field-label">Company Name</label>
                      <validation-provider
                        name="Company Name"
                        :rules="{ required: true }"
                        v-slot="validationContext"
                      >
                          <input
                            type="text"
                            :class="[
                          'field-input',
                              {
                                'is-invalid': validationContext.errors.length > 0,
                              },
                            ]"
                            v-model="setting.CompanyName"
                        placeholder="Enter company name"
                            required
                          />
                          <div
                            v-if="validationContext.errors.length > 0"
                            class="invalid-feedback"
                          >
                            {{ validationContext.errors[0] }}
                        </div>
                      </validation-provider>
                    </div>

                     <!-- Business Type -->
                     <div class="form-field">
                       <label class="field-label">Business type</label>
                       <select class="field-input field-select" v-model="setting.business_type">
                         <option value="bootcamp">Bootcamp</option>
                         <option value="community-services">Community Services</option>
                         <option value="corporate-health">Corporate Health</option>
                         <option value="crossfit-box">CrossFit Box</option>
                         <option value="dance-studio">Dance Studio</option>
                         <option value="dietitian">Dietitian</option>
                         <option value="educational-institute">Educational Institute</option>
                         <option value="fitness-center">Fitness Center</option>
                         <option value="hospital-clinic">Hospital or Clinic</option>
                         <option value="lifestyle-coach">Lifestyle Coach</option>
                         <option value="martial-arts-center">Martial Arts Center</option>
                         <option value="online-coach">Online Coach</option>
                         <option value="personal-trainer">Personal Trainer</option>
                         <option value="personal-training-studio">Personal Training Studio</option>
                         <option value="physiotherapy-clinic">Physiotherapy Clinic</option>
                         <option value="yoga-pilates-studio">Yoga or Pilates Studio</option>
                         <option value="other">Other</option>
                       </select>
                  </div>

                  <!-- Description -->
                  <div class="form-field">
                    <label class="field-label">Description</label>
                      <textarea
                      class="field-input field-textarea"
                      rows="4"
                      placeholder="Enter business description"
                      v-model="setting.description"
                      ></textarea>
              </div>

                  <!-- Street Address -->
                  <div class="form-field">
                    <label class="field-label">Street address</label>
                      <validation-provider
                      name="Street Address"
                        :rules="{ required: true }"
                        v-slot="validationContext"
                      >
                          <input
                        type="text"
                            ref="addressInput"
                            :class="[
                          'field-input',
                              {
                                'is-invalid': validationContext.errors.length > 0,
                              },
                            ]"
                        v-model="setting.CompanyAdress"
                        placeholder="Enter street address"
                            required
                          />
                          <div
                            v-if="validationContext.errors.length > 0"
                            class="invalid-feedback"
                          >
                            {{ validationContext.errors[0] }}
                        </div>
                      </validation-provider>
                    </div>

                  <!-- ZIP Code -->
                  <div class="form-field">
                    <label class="field-label">ZIP code</label>
                        <input
                          type="text"
                      class="field-input"
                      placeholder="Enter ZIP code"
                      v-model="setting.zip_code"
                    />
              </div>

                  <!-- City -->
                  <div class="form-field">
                    <label class="field-label">City</label>
                          <input
                            type="text"
                      class="field-input"
                      placeholder="Enter city"
                      v-model="setting.city"
                    />
                          </div>

                  <!-- Country -->
                  <div class="form-field">
                    <label class="field-label">Country</label>
                    <select class="field-input field-select" v-model="setting.country">
                      <option value="us">United States</option>
                      <option value="ca">Canada</option>
                      <option value="uk">United Kingdom</option>
                      <option value="au">Australia</option>
                    </select>
                          </div>
                    </div>

                 <!-- Map Section -->
                 <div class="map-section">
                   <div class="map-tabs">
                     <button 
                       class="map-tab" 
                       :class="{ active: mapType === 'roadmap' }"
                       @click="setMapType('roadmap')"
                     >
                       Map
                     </button>
                     <button 
                       class="map-tab" 
                       :class="{ active: mapType === 'satellite' }"
                       @click="setMapType('satellite')"
                     >
                       Satellite
                     </button>
                          </div>
                   <div class="map-container" ref="mapContainer">
                     <div id="google-map" class="google-map"></div>
                     <div class="map-controls">
                       <button class="map-control-btn" @click="toggleFullscreen" title="Fullscreen">
                         <i class="fas fa-expand"></i>
                       </button>
                       <button class="map-control-btn" @click="zoomIn" title="Zoom In">
                         <i class="fas fa-plus"></i>
                       </button>
                       <button class="map-control-btn" @click="zoomOut" title="Zoom Out">
                         <i class="fas fa-minus"></i>
                       </button>
                        </div>
                    </div>
                  </div>

                 <!-- Additional Contact Information -->
                 <div class="additional-fields">
                   <div class="form-fields">
                     <!-- Phone -->
                     <div class="form-field">
                       <label class="field-label">Phone</label>
                          <input
                         type="tel"
                         class="field-input"
                         placeholder="Enter phone number"
                         v-model="setting.phone"
                       />
                          </div>

                     <!-- Email -->
                     <div class="form-field">
                       <label class="field-label">Email</label>
                          <input
                         type="email"
                         class="field-input"
                         placeholder="Enter email address"
                         v-model="setting.email"
                       />
                          </div>

                     <!-- Facebook Page -->
                     <div class="form-field">
                       <label class="field-label">Facebook page</label>
                          <input
                         type="url"
                         class="field-input"
                         placeholder="Enter Facebook page URL"
                         v-model="setting.facebook_page"
                       />
                    </div>

                     <!-- Website -->
                     <div class="form-field">
                       <label class="field-label">Website</label>
                          <input
                         type="url"
                         class="field-input"
                         placeholder="Enter website URL"
                         v-model="setting.website"
                       />
                          </div>

                     <!-- Timezone -->
                     <div class="form-field">
                       <label class="field-label">Timezone</label>
                       <select class="field-input field-select" v-model="setting.timezone">
                         <option value="America/New_York">America/New_York</option>
                         <option value="America/Chicago">America/Chicago</option>
                         <option value="America/Denver">America/Denver</option>
                         <option value="America/Los_Angeles">America/Los_Angeles</option>
                         <option value="Europe/London">Europe/London</option>
                         <option value="Europe/Paris">Europe/Paris</option>
                         <option value="Asia/Tokyo">Asia/Tokyo</option>
                       </select>
                          </div>

                     <!-- Primary Language -->
                     <div class="form-field">
                       <label class="field-label">
                         Primary language
                         <i class="fas fa-info-circle info-icon"></i>
                       </label>
                       <select class="field-input field-select" v-model="setting.primary_language">
                         <option value="en">English</option>
                         <option value="es">Spanish</option>
                         <option value="fr">French</option>
                         <option value="de">German</option>
                         <option value="it">Italian</option>
                         <option value="pt">Portuguese</option>
                         <option value="nl">Dutch</option>
                       </select>
                        </div>

                     <!-- Secondary Language -->
                     <div class="form-field">
                       <label class="field-label">
                         Secondary language
                         <i class="fas fa-info-circle info-icon"></i>
                       </label>
                       <select class="field-input field-select" v-model="setting.secondary_language">
                         <option value="en">English</option>
                         <option value="es">Spanish</option>
                         <option value="fr">French</option>
                         <option value="de">German</option>
                         <option value="it">Italian</option>
                         <option value="pt">Portuguese</option>
                         <option value="nl">Dutch</option>
                       </select>
                  </div>

                     <!-- Company Registration Number -->
                     <div class="form-field">
                       <label class="field-label">
                         Company Registr. Nr.
                         <i class="fas fa-info-circle info-icon"></i>
                       </label>
                          <input
                            type="text"
                         class="field-input"
                         placeholder="Enter company registration number"
                         v-model="setting.company_registration_number"
                       />
              </div>

                     <!-- VAT Number -->
                     <div class="form-field">
                       <label class="field-label">
                         VAT number (EU only)
                         <i class="fas fa-info-circle info-icon"></i>
                       </label>
                            <input
                         type="text"
                         class="field-input"
                         placeholder="Enter VAT number"
                         v-model="setting.vat_number"
                       />
                            </div>
                            </div>
                          </div>

                 <!-- Advanced Section -->
                 <div class="advanced-section" v-show="showAdvanced">
                   <div class="advanced-header">
                     <h3>Advanced Settings</h3>
                     <p>Configure advanced integration and security settings</p>
                    </div>

                   <div class="form-fields">
                     <!-- Club External ID -->
                     <div class="form-field">
                       <label class="field-label">
                         Club External ID
                         <i class="fas fa-info-circle info-icon"></i>
                       </label>
                          <input
                            type="text"
                         class="field-input"
                         placeholder="Enter club external ID"
                         v-model="setting.club_external_id"
                       />
                  </div>

                     <!-- Club Key -->
                     <div class="form-field">
                       <label class="field-label">
                         Club Key
                         <i class="fas fa-info-circle info-icon"></i>
                       </label>
                          <input
                            type="text"
                         class="field-input"
                         placeholder="Enter club key"
                         v-model="setting.club_key"
                       />
                    </div>

                     <!-- API Key -->
                     <div class="form-field">
                       <label class="field-label">
                         API Key
                         <i class="fas fa-info-circle info-icon"></i>
                        </label>
                       <div class="api-key-field">
                         <a href="#" class="api-key-link" @click.prevent="requestApiKey">
                           Request an API Key
                         </a>
                    </div>
                  </div>

                     <!-- Advanced Passwords -->
                     <div class="form-field">
                       <label class="field-label">
                         Advanced Passwords
                         <i class="fas fa-info-circle info-icon"></i>
                       </label>
                       <select class="field-input field-select" v-model="setting.advanced_passwords">
                         <option value="off">Off</option>
                         <option value="on">On</option>
                       </select>
                  </div>

                     <!-- Hide for non members -->
                     <div class="form-field">
                       <label class="field-label checkbox-label">
                         <input
                           type="checkbox"
                           class="field-checkbox"
                           v-model="setting.hide_for_non_members"
                         />
                         <span class="checkbox-text">Hide for non members</span>
                         <i class="fas fa-info-circle info-icon"></i>
                    </label>
                  </div>
                </div>
              </div>

                 <!-- Action Buttons -->
                 <div class="form-actions">
                   <button class="advanced-btn" type="button" @click="toggleAdvanced">
                     {{ showAdvanced ? 'Hide Advanced' : 'Advanced' }}
                  </button>
                   <button class="submit-btn" type="submit">
                     Save
                  </button>
              </div>
					</form>
				  </validation-observer>
				</div>
			  </div>

        <!-- Opening Hours Section -->
        <div v-show="selectedSectionId === 'opening-hours'" class="content-card">
          <OpeningHours />
              </div>

        <!-- Facilities Section -->
        <div v-show="selectedSectionId === 'facilities'" class="content-card">
          <Facilities />
              </div>

        <!-- Contracts Section -->
        <div v-show="selectedSectionId === 'contracts'" class="content-card">
          <Terms />
              </div>

        <!-- Member Settings Section -->
        <div v-show="selectedSectionId === 'member-settings'" class="content-card">
          <validation-observer ref="form_member_settings">
            <form @submit.prevent="Submit_Member_Settings">
              <!-- Member Settings Header -->
              <div class="content-header">
                <h2>Member Settings</h2>
                <p class="content-description">
                  In this section, you can determine what information your members can access in their accounts, such as viewing invoices or credits. You can also enable them to perform certain actions, like pausing or ending their contracts.
                </p>
              </div>

              <!-- My services Section -->
              <div class="settings-section">
                <h3 class="section-title">My services</h3>
                
                <div class="form-field">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      class="field-checkbox"
                      v-model="clientSettings.clients_can_edit_info"
                    />
                    <span class="checkbox-text">Members can directly edit their information</span>
                  </label>
                </div>

                <div class="form-field">
                  <label class="field-label">
                    Send changes / change requests to:
                    <i class="fas fa-info-circle info-icon"></i>
                  </label>
                  <input
                    type="email"
                    class="field-input"
                    v-model="clientSettings.change_requests_email"
                    placeholder="Enter email address"
                  />
                </div>

                <div class="form-field">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      class="field-checkbox"
                      v-model="clientSettings.show_payment_methods"
                    />
                    <span class="checkbox-text">Show payment methods</span>
                  </label>
                </div>

                <div class="form-field">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      class="field-checkbox"
                      v-model="clientSettings.show_invoices"
                    />
                    <span class="checkbox-text">Show invoices</span>
                  </label>
                </div>

                <div class="form-field">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      class="field-checkbox"
                      v-model="clientSettings.show_credits"
                    />
                    <span class="checkbox-text">Show credits</span>
                  </label>
                </div>

                <div class="form-field">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      class="field-checkbox"
                      v-model="clientSettings.show_memberships"
                    />
                    <span class="checkbox-text">Show memberships</span>
                  </label>
                </div>

                <!-- Nested under Show memberships -->
                <div v-if="clientSettings.show_memberships" class="nested-settings">
                  <div class="form-field">
                    <label class="checkbox-label">
                      <input
                        type="checkbox"
                        class="field-checkbox"
                        v-model="clientSettings.clients_can_end_contract"
                      />
                      <span class="checkbox-text">Members can end their own contract</span>
                    </label>
                  </div>

                  <div class="form-field">
                    <label class="checkbox-label">
                      <input
                        type="checkbox"
                        class="field-checkbox"
                        v-model="clientSettings.clients_can_pause_contract"
                      />
                      <span class="checkbox-text">Members can pause their own contract</span>
                    </label>
                  </div>

                  <!-- Pause settings (shown when members can pause) -->
                  <div v-if="clientSettings.clients_can_pause_contract" class="nested-settings">
                    <div class="form-fields">
                      <div class="form-field">
                        <label class="field-label">
                          Minimum days of pause:
                          <i class="fas fa-info-circle info-icon"></i>
                        </label>
                        <input
                          type="number"
                          class="field-input"
                          v-model.number="clientSettings.min_pause_days"
                          min="0"
                          placeholder="0"
                        />
                      </div>

                      <div class="form-field">
                        <label class="field-label">
                          Maximum days of pause:
                          <i class="fas fa-info-circle info-icon"></i>
                        </label>
                        <input
                          type="number"
                          class="field-input"
                          v-model.number="clientSettings.max_pause_days"
                          min="0"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div class="form-field">
                      <label class="field-label">
                        Allow
                        <i class="fas fa-info-circle info-icon"></i>
                      </label>
                      <div class="pause-period-controls">
                        <input
                          type="number"
                          class="field-input pause-input"
                          v-model.number="clientSettings.allowed_pauses"
                          min="0"
                          placeholder="1"
                        />
                        <span class="pause-label">pauses per every</span>
                        <input
                          type="number"
                          class="field-input pause-input"
                          v-model.number="clientSettings.pause_period_value"
                          min="1"
                          placeholder="1"
                        />
                        <select class="field-input field-select pause-select" v-model="clientSettings.pause_period_unit">
                          <option value="days">Days</option>
                          <option value="weeks">Weeks</option>
                          <option value="months">Months</option>
                          <option value="years">Years</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-field">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      class="field-checkbox"
                      v-model="clientSettings.show_bought_products"
                    />
                    <span class="checkbox-text">Show bought products</span>
                  </label>
                </div>

                <div class="form-field">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      class="field-checkbox"
                      v-model="clientSettings.show_bookings"
                    />
                    <span class="checkbox-text">Show bookings</span>
                  </label>
                </div>

                <div class="form-field">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      class="field-checkbox"
                      v-model="clientSettings.show_member_last_visits"
                    />
                    <span class="checkbox-text">Show member last visits</span>
                  </label>
                </div>

                <div class="form-field">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      class="field-checkbox"
                      v-model="clientSettings.show_mandate_id"
                    />
                    <span class="checkbox-text">Show mandate ID</span>
                  </label>
                </div>

                <div class="form-field">
                  <label class="field-label">
                    Visibility period for member's service history
                    <i class="fas fa-info-circle info-icon"></i>
                  </label>
                  <select class="field-input field-select" v-model="clientSettings.service_history_visibility">
                    <option value="all">All</option>
                    <option value="1month">1 Month</option>
                    <option value="3months">3 Months</option>
                    <option value="6months">6 Months</option>
                    <option value="1year">1 Year</option>
                    <option value="2years">2 Years</option>
                  </select>
                </div>
              </div>

              <!-- Gender Options Section -->
              <div class="settings-section">
                <h3 class="section-title">Gender Options</h3>
                
                <div class="form-field">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      class="field-checkbox"
                      v-model="clientSettings.show_additional_gender_options"
                    />
                    <span class="checkbox-text">Show additional gender options</span>
                  </label>
                </div>
              </div>

              <!-- Privacy Section -->
              <div class="settings-section">
                <div class="content-header">
                  <h3>Privacy</h3>
                  <p class="content-description">Options set here will apply for each new member</p>
                </div>

                <div class="form-fields">
                  <div class="form-field">
                    <label class="field-label">
                      Visible name
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <select class="field-input field-select" v-model="clientSettings.visible_name">
                      <option value="full">Full name</option>
                      <option value="first">First name only</option>
                      <option value="last">Last name only</option>
                      <option value="nickname">Nickname</option>
                    </select>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Allow posts and follows of my profile
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <select class="field-input field-select" v-model="clientSettings.allow_posts_follows">
                      <option value="anyone">Anyone in the community</option>
                      <option value="network">Employees of my network</option>
                      <option value="coaches">My coaches only</option>
                      <option value="nobody">Nobody</option>
                    </select>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      FitProfile
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <select class="field-input field-select" v-model="clientSettings.fitprofile_visibility">
                      <option value="anyone">Anyone in the community</option>
                      <option value="network">Employees of my network</option>
                      <option value="coaches">My coaches only</option>
                      <option value="nobody">Nobody</option>
                    </select>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Progress Pictures
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <select class="field-input field-select" v-model="clientSettings.progress_pictures_visibility">
                      <option value="anyone">Anyone in the community</option>
                      <option value="network">Employees of my network</option>
                      <option value="coaches">My coaches only</option>
                      <option value="nobody">Nobody</option>
                    </select>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Nutrition
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <select class="field-input field-select" v-model="clientSettings.nutrition_visibility">
                      <option value="anyone">Anyone in the community</option>
                      <option value="network">Employees of my network</option>
                      <option value="coaches">My coaches only</option>
                      <option value="nobody">Nobody</option>
                    </select>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Progress graphs and challenges
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <select class="field-input field-select" v-model="clientSettings.progress_graphs_visibility">
                      <option value="anyone">Anyone in the community</option>
                      <option value="network">Employees of my network</option>
                      <option value="coaches">My coaches only</option>
                      <option value="nobody">Nobody</option>
                    </select>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Who can see your followers and people you follow
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <select class="field-input field-select" v-model="clientSettings.followers_visibility">
                      <option value="anyone">Anyone in the community</option>
                      <option value="network">Employees of my network</option>
                      <option value="coaches">My coaches only</option>
                      <option value="nobody">Nobody</option>
                    </select>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Exercises
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <select class="field-input field-select" v-model="clientSettings.exercises_visibility">
                      <option value="everybody">Everybody</option>
                      <option value="anyone">Anyone in the community</option>
                      <option value="network">Employees of my network</option>
                      <option value="coaches">My coaches only</option>
                      <option value="nobody">Nobody</option>
                    </select>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Leaderboard
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <select class="field-input field-select" v-model="clientSettings.leaderboard_visibility">
                      <option value="everyone">Visible for everyone</option>
                      <option value="anyone">Anyone in the community</option>
                      <option value="network">Employees of my network</option>
                      <option value="coaches">My coaches only</option>
                      <option value="nobody">Nobody</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Advanced security Section -->
              <div class="settings-section">
                <h3 class="section-title">Advanced security</h3>
                
                <div class="form-field">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      class="field-checkbox"
                      v-model="clientSettings.enable_advanced_security"
                    />
                    <span class="checkbox-text">Enable advanced security</span>
                  </label>
                </div>
              </div>

              <!-- Date & time format Section -->
              <div class="settings-section">
                <h3 class="section-title">Date & time format</h3>
                
                <div class="form-fields">
                  <div class="form-field">
                    <label class="field-label">
                      Default date format
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <select class="field-input field-select" v-model="clientSettings.default_date_format">
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                    </select>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Default time format
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <select class="field-input field-select" v-model="clientSettings.default_time_format">
                      <option value="12h">AM/PM format</option>
                      <option value="24h">24-hour format</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Coaching Emails Section -->
              <div class="settings-section">
                <h3 class="section-title">Coaching Emails</h3>
                
                <div class="form-fields">
                  <div class="form-field">
                    <label class="field-label">
                      Frequency of Update Email
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <select class="field-input field-select" v-model="clientSettings.update_email_frequency">
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="never">Never</option>
                    </select>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Frequency of Progress Email
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <select class="field-input field-select" v-model="clientSettings.progress_email_frequency">
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="form-actions">
                <button class="submit-btn" type="submit">
                  Save
                </button>
              </div>
            </form>
          </validation-observer>
        </div>

        <!-- Financial Info Section -->
        <div v-show="selectedSectionId === 'financial-info'" class="content-card">
          <validation-observer ref="form_financial_info">
            <form @submit.prevent="Submit_Financial_Info">
              <!-- Financial Info Section -->
              <div class="settings-section">
                <div class="content-header">
                  <div class="financial-header-row">
                    <div>
                      <h2>Financial Info</h2>
                      <p class="content-description">
                        Set up your business's financial information to ensure accurate and efficient transaction handling.
                      </p>
                    </div>
                    <button type="button" class="play-icon-btn" @click="playFinancialInfo">
                      <i class="fas fa-play"></i>
                    </button>
                  </div>
                </div>

                <div class="form-fields">
                  <div class="form-field">
                    <label class="field-label">
                      Bank account holder name
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <input
                      type="text"
                      class="field-input"
                      v-model="financialInfo.bank_account_holder"
                      placeholder="Enter bank account holder name"
                    />
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Bank account number
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <input
                      type="text"
                      class="field-input"
                      v-model="financialInfo.bank_account_number"
                      placeholder="Enter bank account number"
                    />
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      BIC/Swift Code
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <input
                      type="text"
                      class="field-input"
                      v-model="financialInfo.bic_swift_code"
                      placeholder="Enter BIC/Swift Code"
                    />
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Default Sales Tax
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <div class="field-with-edit">
                      <select class="field-input field-select" v-model="financialInfo.default_sales_tax">
                        <option value="default">Default Tax (6.00%)</option>
                        <option value="tax1">Tax 1 (5.00%)</option>
                        <option value="tax2">Tax 2 (10.00%)</option>
                      </select>
                      <a href="#" class="edit-link" @click.prevent="editSalesTax">Edit</a>
                    </div>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Income Category
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <div class="field-with-edit">
                      <div class="income-categories">
                        <span class="category-tag">Personal training</span>
                        <span class="category-tag">Memberships</span>
                        <span class="category-tag">Other</span>
                        <span class="category-tag">Retail</span>
                        <span class="category-tag">Group training</span>
                      </div>
                      <a href="#" class="edit-link" @click.prevent="editIncomeCategory">Edit</a>
                    </div>
                  </div>

                  <div class="form-field">
                    <div class="toggle-field">
                      <label class="switch">
                        <input type="checkbox" v-model="financialInfo.vat_percentage_manual" />
                        <span class="slider"></span>
                      </label>
                      <span class="toggle-label">
                        VAT percentage cannot be manually changed when connected to an income category.
                        <i class="fas fa-info-circle info-icon"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Invoices Section -->
              <div class="settings-section">
                <div class="content-header">
                  <h3>Invoices</h3>
                  <p class="content-description">
                    In this section, you can choose what information appears on your Invoices and set up rules for merging different types of Invoices.
                  </p>
                </div>

                <div class="form-fields">
                  <div class="form-field">
                    <div class="toggle-field">
                      <label class="switch">
                        <input type="checkbox" v-model="financialInfo.show_employee_name" />
                        <span class="slider"></span>
                      </label>
                      <span class="toggle-label">
                        Show employee name
                        <i class="fas fa-info-circle info-icon"></i>
                      </span>
                    </div>
                  </div>

                  <div class="form-field">
                    <div class="toggle-field">
                      <label class="switch">
                        <input type="checkbox" v-model="financialInfo.append_club_id" />
                        <span class="slider"></span>
                      </label>
                      <span class="toggle-label">
                        Append Club ID to the Invoice ID
                        <i class="fas fa-info-circle info-icon"></i>
                      </span>
                    </div>
                  </div>

                  <div class="form-field">
                    <div class="toggle-field">
                      <label class="switch">
                        <input type="checkbox" v-model="financialInfo.show_date_on_entry" />
                        <span class="slider"></span>
                      </label>
                      <span class="toggle-label">
                        Show date on each invoice entry
                        <i class="fas fa-info-circle info-icon"></i>
                      </span>
                    </div>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Invoice text
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <div class="field-with-edit">
                      <input
                        type="text"
                        class="field-input"
                        v-model="financialInfo.invoice_text"
                        placeholder="Enter invoice text"
                      />
                      <a href="#" class="edit-link" @click.prevent="editInvoiceText">Edit</a>
                    </div>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Extra Invoice field - Coach
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <div class="field-with-edit">
                      <input
                        type="text"
                        class="field-input"
                        v-model="financialInfo.extra_field_staff"
                        placeholder="Enter extra field for coach"
                      />
                      <a href="#" class="edit-link" @click.prevent="editExtraFieldStaff">Edit</a>
                    </div>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Extra Invoice field 1 - Members
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <div class="field-with-edit">
                      <input
                        type="text"
                        class="field-input"
                        v-model="financialInfo.extra_field_clients_1"
                        placeholder="Enter extra field 1 for members"
                      />
                      <a href="#" class="edit-link" @click.prevent="editExtraFieldClients1">Edit</a>
                    </div>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Extra Invoice field 2 - Members
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <div class="field-with-edit">
                      <input
                        type="text"
                        class="field-input"
                        v-model="financialInfo.extra_field_clients_2"
                        placeholder="Enter extra field 2 for members"
                      />
                      <a href="#" class="edit-link" @click.prevent="editExtraFieldClients2">Edit</a>
                    </div>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Cc email address
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <input
                      type="email"
                      class="field-input"
                      v-model="financialInfo.cc_email"
                      placeholder="Enter CC email address"
                    />
                  </div>
                </div>
              </div>

              <!-- Invoice merging options Section -->
              <div class="settings-section">
                <div class="content-header">
                  <h3>Invoice merging options</h3>
                </div>

                <div class="form-fields">
                  <div class="form-field">
                    <label class="field-label">
                      Manual Invoices can be merged with
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <select class="field-input field-select" v-model="financialInfo.manual_invoices_merge">
                      <option value="none">no other Invoices</option>
                      <option value="pos">Point of Sale Invoices</option>
                      <option value="membership">Membership Invoices</option>
                      <option value="both">Both</option>
                    </select>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Point of Sale Invoices can be merged with
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <select class="field-input field-select" v-model="financialInfo.pos_invoices_merge">
                      <option value="none">no other Invoices</option>
                      <option value="manual">Manual Invoices</option>
                      <option value="membership">Membership Invoices</option>
                      <option value="both">Both</option>
                    </select>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Membership Invoices can be merged with
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <select class="field-input field-select" v-model="financialInfo.membership_invoices_merge">
                      <option value="none">no other Invoices</option>
                      <option value="manual">Manual Invoices</option>
                      <option value="pos">Point of Sale Invoices</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Action Button -->
              <div class="form-actions">
                <button class="submit-btn" type="submit">
                  Save
                </button>
              </div>
            </form>
          </validation-observer>
        </div>

        <!-- Payment Methods Section -->
        <div v-show="selectedSectionId === 'payment-methods'" class="content-card">
          <div v-if="paymentGatewayLoading" class="loading_page spinner spinner-primary mr-3"></div>
          
          <validation-observer ref="form_payment_gateway" v-if="!paymentGatewayLoading">
            <form @submit.prevent="Submit_Payment_Gateway">
              <div class="content-header">
                <h2>Payment Gateway</h2>
                <p class="content-description">
                  Configure your payment gateway settings to process payments from members.
                </p>
              </div>

              <div class="settings-section">
                <!-- Active Gateway Selection -->
                <div class="form-field">
                  <label class="field-label">
                    Select Active Payment Gateway
                    <i class="fas fa-info-circle info-icon"></i>
                  </label>
                  <p class="field-description">
                    Only one payment gateway can be active at a time for your gym.
                  </p>
                  <select class="field-input field-select" v-model="paymentGateway.active_payment_gateway" @change="onGatewayChange">
                    <option value="none">No Payment Gateway</option>
                    <option value="stripe">Stripe Payment Gateway</option>
                    <option value="paysafecard">PaysafeCard Payment Gateway</option>
                  </select>
                </div>

                <!-- Stripe Configuration -->
                <div v-if="paymentGateway.active_payment_gateway === 'stripe'" class="gateway-config-section">
                  <h3 class="section-subtitle">
                    <i class="fas fa-credit-card me-2"></i>
                    Stripe Payment Gateway Configuration
                  </h3>
                  
                  <div class="form-field">
                    <label class="field-label">STRIPE_KEY</label>
                    <input
                      type="password"
                      class="field-input"
                      v-model="paymentGateway.stripe_key"
                      placeholder="Enter Stripe Public Key"
                    />
                  </div>

                  <div class="form-field">
                    <label class="field-label">STRIPE_SECRET</label>
                    <input
                      type="password"
                      class="field-input"
                      v-model="paymentGateway.stripe_secret"
                      placeholder="Enter Stripe Secret Key"
                    />
                  </div>
                </div>

                <!-- PaysafeCard Configuration -->
                <div v-if="paymentGateway.active_payment_gateway === 'paysafecard'" class="gateway-config-section">
                  <h3 class="section-subtitle">
                    <i class="fas fa-credit-card me-2"></i>
                    PaysafeCard Payment Gateway Configuration
                  </h3>
                  
                  <div class="form-field">
                    <label class="field-label">PAYSAFECARD_ACCOUNT_NUMBER</label>
                    <input
                      type="password"
                      class="field-input"
                      v-model="paymentGateway.paysafecard_account_number"
                      placeholder="Enter PaysafeCard Account Number"
                    />
                  </div>

                  <div class="form-field">
                    <label class="field-label">PAYSAFECARD_API_KEY</label>
                    <input
                      type="password"
                      class="field-input"
                      v-model="paymentGateway.paysafecard_api_key"
                      placeholder="Enter PaysafeCard API Key"
                    />
                  </div>

                  <div class="form-field">
                    <label class="field-label">PAYSAFECARD_ENVIRONMENT</label>
                    <select class="field-input field-select" v-model="paymentGateway.paysafecard_environment">
                      <option value="TEST">Test Environment</option>
                      <option value="PRODUCTION">Production Environment</option>
                    </select>
                  </div>
                </div>

                <!-- No Gateway Selected -->
                <div v-if="paymentGateway.active_payment_gateway === 'none'" class="no-gateway-message">
                  <i class="fas fa-info-circle"></i>
                  <h4>No Payment Gateway Selected</h4>
                  <p>
                    Please select a payment gateway above to configure payment processing for your gym.
                  </p>
                </div>
              </div>

              <!-- Action Button -->
              <div class="form-actions">
                <button class="submit-btn" type="submit" :disabled="paymentGateway.active_payment_gateway === 'none'">
                  Save
                </button>
              </div>
            </form>
          </validation-observer>
        </div>

        <!-- Memberships Section -->
        <div v-show="selectedSectionId === 'memberships'" class="content-card">
          <!-- Memberships Tabs -->
          <div class="memberships-tabs">
            <button
              type="button"
              class="membership-tab"
              :class="{ active: membershipActiveTab === 'memberships' }"
              @click="membershipActiveTab = 'memberships'"
            >
              Memberships
            </button>
            <!-- <button
              type="button"
              class="membership-tab"
              :class="{ active: membershipActiveTab === 'addons' }"
              @click="membershipActiveTab = 'addons'"
            >
              Add-ons
            </button>
            <button
              type="button"
              class="membership-tab"
              :class="{ active: membershipActiveTab === 'terms' }"
              @click="membershipActiveTab = 'terms'"
            >
              Terms and Conditions
            </button> -->
          </div>

          <!-- Memberships Tab Content -->
          <div v-show="membershipActiveTab === 'memberships'" class="memberships-content">
            <!-- Header -->
            <div class="memberships-header">
              <div>
                <h2>Memberships</h2>
                <p class="content-description">
                  Create and manage the membership options available to your members. Set their prices, durations, billing periods, discounts, and more.
                </p>
              </div>
              <button type="button" class="play-icon-btn" @click="playMembershipsHelp">
                <i class="fas fa-play"></i>
              </button>
            </div>

            <!-- Status Filters -->
            <div class="status-filters">
              <button
                type="button"
                class="status-filter-btn"
                :class="{ active: membershipStatusFilter === 'active' }"
                @click="membershipStatusFilter = 'active'"
              >
                Active
              </button>
              <button
                type="button"
                class="status-filter-btn"
                :class="{ active: membershipStatusFilter === 'inactive-contracts' }"
                @click="membershipStatusFilter = 'inactive-contracts'"
              >
                Inactive, with active contracts
              </button>
              <button
                type="button"
                class="status-filter-btn"
                :class="{ active: membershipStatusFilter === 'inactive' }"
                @click="membershipStatusFilter = 'inactive'"
              >
                Inactive
              </button>
            </div>

            <!-- Membership Categories -->
            <div class="membership-categories">
              <div
                v-for="category in filteredMembershipCategories"
                :key="category.id"
                class="membership-category-section"
              >
                <h3 class="category-title">{{ category.name }}</h3>
                <div class="membership-table-wrapper">
                  <table class="membership-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Prolongation price</th>
                        <th>Active</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="membership in category.memberships" :key="membership.id">
                        <td>{{ membership.name }}</td>
                        <td>{{ membership.price }}</td>
                        <td>{{ membership.prolongation_price }}</td>
                        <td>{{ membership.active }}</td>
                        <td>
                          <div class="table-actions">
                            <button
                              type="button"
                              class="action-icon-btn edit-btn"
                              @click="editMembership(membership)"
                              title="Edit"
                            >
                              <i class="fas fa-edit"></i>
                            </button>
                            <button
                              type="button"
                              class="action-icon-btn view-btn"
                              @click="viewMembershipUsers(membership)"
                              title="View users"
                            >
                              <i class="fas fa-user"></i>
                            </button>
                            <button
                              type="button"
                              class="action-icon-btn delete-btn"
                              @click="deleteMembership(membership)"
                              title="Delete"
                            >
                              <i class="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Create Membership Button -->
            <div class="memberships-actions">
              <button type="button" class="create-membership-btn" @click="$router.push('/app/Settings/memberships/create')">
                Create membership
              </button>
            </div>
          </div>

          <!-- Create Membership Modal -->
          <b-modal
            id="create-membership-modal"
            ref="createMembershipModal"
            title="Create New Membership Plan"
            size="xl"
            @hidden="resetMembershipForm"
            @ok="handleCreateMembership"
            ok-title="Create"
            cancel-title="Cancel"
            :ok-disabled="membershipFormProcessing"
            scrollable
          >
            <validation-observer ref="membershipForm">
              <form @submit.prevent="handleCreateMembership">
                <div class="membership-form-sections">
                  <!-- Section 1: Membership Information -->
                  <div class="form-section-card">
                    <h3 class="section-title">
                      <i class="fas fa-info-circle me-2"></i>
                      Membership Information
                    </h3>
                    <div class="form-fields">
                      <!-- Membership Name -->
                      <div class="form-field">
                        <label class="field-label">
                          Membership Name <span class="required">*</span>
                          <i class="fas fa-info-circle info-icon" title="Enter the name of the membership plan"></i>
                        </label>
                        <validation-provider
                          name="Membership Name"
                          rules="required"
                          v-slot="validationContext"
                        >
                          <input
                            type="text"
                            :class="['field-input', { 'is-invalid': validationContext.errors.length > 0 }]"
                            v-model="newMembershipForm.name"
                            placeholder="e.g., Basic Plan, Premium Plan"
                            required
                          />
                          <div v-if="validationContext.errors.length > 0" class="invalid-feedback">
                            {{ validationContext.errors[0] }}
                          </div>
                        </validation-provider>
                      </div>

                      <!-- Membership Description -->
                      <div class="form-field">
                        <label class="field-label">
                          Membership Description
                          <i class="fas fa-info-circle info-icon" title="Describe what this membership includes"></i>
                        </label>
                        <textarea
                          class="field-input field-textarea"
                          rows="3"
                          v-model="newMembershipForm.description"
                          placeholder="Enter membership description"
                        ></textarea>
                      </div>

                      <!-- Webshop Image -->
                      <div class="form-field">
                        <label class="field-label">
                          Webshop Image (optional)
                          <i class="fas fa-info-circle info-icon" title="Upload an image for the webshop"></i>
                        </label>
                        <div class="image-upload-wrapper">
                          <div class="image-preview" v-if="newMembershipForm.webshop_image">
                            <img :src="newMembershipForm.webshop_image" alt="Preview" />
                            <button type="button" class="remove-image-btn" @click="newMembershipForm.webshop_image = ''">
                              <i class="fas fa-times"></i>
                            </button>
                          </div>
                          <div class="image-placeholder" v-else>
                            <i class="fas fa-image"></i>
                            <p>No image selected</p>
                          </div>
                          <input
                            type="file"
                            ref="webshopImageInput"
                            accept="image/*"
                            @change="handleWebshopImageUpload"
                            style="display: none"
                          />
                          <button
                            type="button"
                            class="change-image-btn"
                            @click="$refs.webshopImageInput.click()"
                          >
                            Change
                          </button>
                        </div>
                      </div>

                      <!-- Group -->
                      <div class="form-field">
                        <label class="field-label">
                          Group
                          <i class="fas fa-info-circle info-icon" title="Select the membership group"></i>
                        </label>
                        <select class="field-input field-select" v-model="newMembershipForm.group">
                          <option v-for="group in membershipGroups" :key="group.id" :value="group.name">
                            {{ group.name }}
                          </option>
                        </select>
                      </div>

                      <!-- Specific Terms & Conditions -->
                      <div class="form-field">
                        <label class="field-label">
                          Specific terms & conditions
                          <i class="fas fa-info-circle info-icon" title="Select terms and conditions"></i>
                        </label>
                        <select class="field-input field-select" v-model="newMembershipForm.terms_conditions">
                          <option value="general">Only General Terms</option>
                          <option value="custom">Custom Terms</option>
                        </select>
                      </div>

                      <!-- Start Date -->
                      <div class="form-field">
                        <label class="field-label">
                          Start date
                          <i class="fas fa-info-circle info-icon" title="When can members start this membership"></i>
                        </label>
                        <div class="radio-group">
                          <label class="radio-label">
                            <input
                              type="radio"
                              name="start_date_type"
                              value="any"
                              v-model="newMembershipForm.start_date_type"
                            />
                            <span class="radio-text">Any start date</span>
                          </label>
                          <label class="radio-label">
                            <input
                              type="radio"
                              name="start_date_type"
                              value="between"
                              v-model="newMembershipForm.start_date_type"
                            />
                            <span class="radio-text">Start date between</span>
                          </label>
                        </div>
                        <div v-if="newMembershipForm.start_date_type === 'between'" class="date-range-inputs">
                          <input type="date" class="field-input" v-model="newMembershipForm.start_date_from" />
                          <span class="date-separator">to</span>
                          <input type="date" class="field-input" v-model="newMembershipForm.start_date_to" />
                        </div>
                      </div>

                      <!-- Status -->
                      <div class="form-field">
                        <label class="field-label">
                          Status
                          <i class="fas fa-info-circle info-icon" title="Membership status"></i>
                        </label>
                        <div class="radio-group">
                          <label class="radio-label">
                            <input
                              type="radio"
                              name="status_type"
                              value="active"
                              v-model="newMembershipForm.status_type"
                            />
                            <span class="radio-text">Active</span>
                          </label>
                          <label class="radio-label">
                            <input
                              type="radio"
                              name="status_type"
                              value="active_between"
                              v-model="newMembershipForm.status_type"
                            />
                            <span class="radio-text">Active between</span>
                          </label>
                        </div>
                        <div v-if="newMembershipForm.status_type === 'active_between'" class="date-range-inputs">
                          <input type="date" class="field-input" v-model="newMembershipForm.status_from" />
                          <span class="date-separator">to</span>
                          <input type="date" class="field-input" v-model="newMembershipForm.status_to" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Section 2: Membership Scope -->
                  <div class="form-section-card">
                    <h3 class="section-title">
                      <i class="fas fa-calendar-alt me-2"></i>
                      Membership Scope
                    </h3>
                    <div class="form-fields">
                      <!-- Access Times -->
                      <div class="form-field">
                        <label class="field-label">
                          Access times
                          <i class="fas fa-info-circle info-icon" title="Restrict access times for this membership"></i>
                        </label>
                        <div class="radio-group">
                          <label class="radio-label">
                            <input
                              type="radio"
                              name="access_times"
                              value="no_restriction"
                              v-model="newMembershipForm.access_times"
                            />
                            <span class="radio-text">No restriction</span>
                          </label>
                          <label class="radio-label">
                            <input
                              type="radio"
                              name="access_times"
                              value="limited"
                              v-model="newMembershipForm.access_times"
                            />
                            <span class="radio-text">Limited access</span>
                          </label>
                        </div>
                      </div>

                      <!-- Duration -->
                      <div class="form-field">
                        <label class="field-label">
                          Duration
                          <i class="fas fa-info-circle info-icon" title="Membership duration"></i>
                        </label>
                        <div class="duration-input-group">
                          <input
                            type="number"
                            min="1"
                            class="field-input"
                            v-model.number="newMembershipForm.duration_value"
                            placeholder="1"
                          />
                          <select class="field-input field-select" v-model="newMembershipForm.duration_unit">
                            <option value="days">Days</option>
                            <option value="weeks">Weeks</option>
                            <option value="months" selected>Months</option>
                            <option value="years">Years</option>
                          </select>
                        </div>
                      </div>

                      <!-- Auto Renewed -->
                      <div class="form-field">
                        <label class="checkbox-label">
                          <input
                            type="checkbox"
                            class="checkbox-input"
                            v-model="newMembershipForm.auto_renewed"
                          />
                          <span class="checkbox-text">Auto renewed?</span>
                          <i class="fas fa-info-circle info-icon" title="Automatically renew this membership"></i>
                        </label>
                      </div>
                    </div>
                  </div>

                  <!-- Section 3: Price -->
                  <div class="form-section-card">
                    <h3 class="section-title">
                      <i class="fas fa-dollar-sign me-2"></i>
                      Price
                    </h3>
                    <div class="form-fields">
                      <!-- Regular Price -->
                      <div class="form-field">
                        <label class="field-label">
                          Regular price (inc. VAT/tax) <span class="required">*</span>
                          <i class="fas fa-info-circle info-icon" title="Regular price including tax"></i>
                        </label>
                        <validation-provider
                          name="Regular Price"
                          rules="required|numeric|min_value:0"
                          v-slot="validationContext"
                        >
                          <div class="price-input-group">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              :class="['field-input', { 'is-invalid': validationContext.errors.length > 0 }]"
                              v-model="newMembershipForm.price"
                              placeholder="0.00"
                              required
                            />
                            <select class="field-input field-select" v-model="newMembershipForm.currency">
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                            </select>
                          </div>
                          <div v-if="validationContext.errors.length > 0" class="invalid-feedback">
                            {{ validationContext.errors[0] }}
                          </div>
                        </validation-provider>
                      </div>

                      <!-- Sales Tax -->
                      <div class="form-field">
                        <label class="field-label">
                          Sales tax
                          <i class="fas fa-info-circle info-icon" title="Sales tax percentage"></i>
                        </label>
                        <select class="field-input field-select" v-model="newMembershipForm.sales_tax">
                          <option value="default">Default tax (0.00%)</option>
                          <option value="5">5%</option>
                          <option value="10">10%</option>
                          <option value="20">20%</option>
                        </select>
                      </div>

                      <!-- Billing Cycle -->
                      <div class="form-field">
                        <label class="field-label">
                          Billing cycle
                          <i class="fas fa-info-circle info-icon" title="How often to bill"></i>
                        </label>
                        <validation-provider
                          name="Billing Cycle"
                          rules="required"
                          v-slot="validationContext"
                        >
                          <select
                            :class="['field-input', 'field-select', { 'is-invalid': validationContext.errors.length > 0 }]"
                            v-model="newMembershipForm.interval"
                            required
                          >
                            <option value="">Select</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                            <option value="weekly">Weekly</option>
                            <option value="daily">Daily</option>
                          </select>
                          <div v-if="validationContext.errors.length > 0" class="invalid-feedback">
                            {{ validationContext.errors[0] }}
                          </div>
                        </validation-provider>
                      </div>

                      <!-- Recurring Billing Date -->
                      <div class="form-field">
                        <label class="field-label">
                          Recurring billing date
                          <i class="fas fa-info-circle info-icon" title="When to generate invoices"></i>
                        </label>
                        <div class="radio-group">
                          <label class="radio-label">
                            <input
                              type="radio"
                              name="recurring_billing"
                              value="from_start"
                              v-model="newMembershipForm.recurring_billing"
                            />
                            <div>
                              <span class="radio-text">From membership start date</span>
                              <small class="radio-hint">The invoices will generate each month starting from the membership start date</small>
                            </div>
                          </label>
                          <label class="radio-label">
                            <input
                              type="radio"
                              name="recurring_billing"
                              value="first_of_month"
                              v-model="newMembershipForm.recurring_billing"
                            />
                            <div>
                              <span class="radio-text">From 1st of the month</span>
                              <small class="radio-hint">The first invoice will be prorated until the beginning of the next month</small>
                            </div>
                          </label>
                        </div>
                      </div>

                      <!-- Income Category -->
                      <div class="form-field">
                        <label class="field-label">
                          Income Category
                          <i class="fas fa-info-circle info-icon" title="Category for income tracking"></i>
                        </label>
                        <select class="field-input field-select" v-model="newMembershipForm.income_category">
                          <option value="">Select</option>
                          <option value="membership">Membership</option>
                          <option value="training">Training</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <!-- Default Payment Method -->
                      <div class="form-field">
                        <label class="field-label">
                          Default payment method
                          <i class="fas fa-info-circle info-icon" title="Default payment method"></i>
                        </label>
                        <select class="field-input field-select" v-model="newMembershipForm.default_payment_method">
                          <option value="cash">Cash</option>
                          <option value="card">Card</option>
                          <option value="bank_transfer">Bank Transfer</option>
                          <option value="stripe">Stripe</option>
                        </select>
                      </div>

                      <!-- Next Invoice Creation -->
                      <div class="form-field">
                        <label class="field-label">
                          Next invoice will be created
                          <i class="fas fa-info-circle info-icon" title="When to create the next invoice"></i>
                        </label>
                        <div class="invoice-timing-group">
                          <input
                            type="number"
                            min="0"
                            class="field-input"
                            v-model.number="newMembershipForm.invoice_before_value"
                            placeholder="1"
                          />
                          <select class="field-input field-select" v-model="newMembershipForm.invoice_before_unit">
                            <option value="days">Days</option>
                            <option value="weeks" selected>Weeks</option>
                            <option value="months">Months</option>
                          </select>
                          <span class="timing-text">before the start of the new billing cycle.</span>
                        </div>
                      </div>

                      <!-- One-time Payment/Registration Fee -->
                      <div class="form-field">
                        <label class="checkbox-label">
                          <input
                            type="checkbox"
                            class="checkbox-input"
                            v-model="newMembershipForm.one_time_payment"
                          />
                          <span class="checkbox-text">One-time payment/registration fee</span>
                          <i class="fas fa-info-circle info-icon" title="Charge a one-time fee"></i>
                        </label>
                        <div v-if="newMembershipForm.one_time_payment" class="one-time-fee-input">
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            class="field-input"
                            v-model="newMembershipForm.registration_fee"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Section 4: Credits -->
                  <div class="form-section-card">
                    <h3 class="section-title">
                      <i class="fas fa-coins me-2"></i>
                      Credits
                    </h3>
                    <div class="credits-section">
                      <div class="credits-table-header">
                        <div class="credits-col-checkbox"></div>
                        <div class="credits-col-service">Service</div>
                        <div class="credits-col-amount">
                          Amount
                          <i class="fas fa-info-circle info-icon"></i>
                        </div>
                        <div class="credits-col-frequency">
                          Frequency
                          <i class="fas fa-info-circle info-icon"></i>
                        </div>
                        <div class="credits-col-validity">
                          Validity
                          <i class="fas fa-info-circle info-icon"></i>
                        </div>
                        <div class="credits-col-extra">
                          Extra of start
                          <i class="fas fa-info-circle info-icon"></i>
                        </div>
                      </div>
                      <div class="credits-services-list">
                        <div
                          v-for="service in availableServices"
                          :key="service.id"
                          class="credits-service-row"
                        >
                          <div class="credits-col-checkbox">
                            <input
                              type="checkbox"
                              :id="`service-${service.id}`"
                              v-model="service.enabled"
                            />
                          </div>
                          <div class="credits-col-service">
                            <label :for="`service-${service.id}`">{{ service.name }}</label>
                          </div>
                          <div class="credits-col-amount" v-if="service.enabled">
                            <input
                              type="number"
                              min="0"
                              class="field-input"
                              v-model.number="service.amount"
                              placeholder="0"
                            />
                            <span>Credits</span>
                          </div>
                          <div class="credits-col-frequency" v-if="service.enabled">
                            <input
                              type="number"
                              min="0"
                              class="field-input"
                              v-model.number="service.frequency_value"
                              placeholder="1"
                            />
                            <select class="field-input field-select" v-model="service.frequency_unit">
                              <option value="days">Days</option>
                              <option value="weeks">Weeks</option>
                              <option value="months" selected>Months</option>
                            </select>
                          </div>
                          <div class="credits-col-validity" v-if="service.enabled">
                            <input
                              type="number"
                              min="0"
                              class="field-input"
                              v-model.number="service.validity_value"
                              placeholder="1"
                            />
                            <select class="field-input field-select" v-model="service.validity_unit">
                              <option value="days">Days</option>
                              <option value="weeks">Weeks</option>
                              <option value="months" selected>Months</option>
                            </select>
                          </div>
                          <div class="credits-col-extra" v-if="service.enabled">
                            <input
                              type="checkbox"
                              v-model="service.extra_of_start"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="credits-distribution">
                        <label class="field-label">Credit Distribution monthly</label>
                        <div class="radio-group">
                          <label class="radio-label">
                            <input
                              type="radio"
                              name="credit_distribution"
                              value="first_of_month"
                              v-model="newMembershipForm.credit_distribution"
                            />
                            <span class="radio-text">Every 1st of the month</span>
                          </label>
                          <label class="radio-label">
                            <input
                              type="radio"
                              name="credit_distribution"
                              value="from_assign_date"
                              v-model="newMembershipForm.credit_distribution"
                            />
                            <span class="radio-text">Based on membership assign date</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Section 5: Digital Services -->
                  <div class="form-section-card">
                    <h3 class="section-title">
                      <i class="fas fa-digital-tachograph me-2"></i>
                      Digital Services
                    </h3>
                    <div class="form-fields">
                      <!-- Enable PRO -->
                      <div class="form-field">
                        <label class="checkbox-label">
                          <input
                            type="checkbox"
                            class="checkbox-input"
                            v-model="newMembershipForm.enable_pro"
                          />
                          <span class="checkbox-text">Enable PRO?</span>
                          <i class="fas fa-info-circle info-icon" title="Enable PRO features"></i>
                        </label>
                      </div>

                      <!-- Early Booking Access -->
                      <div class="form-field">
                        <label class="checkbox-label">
                          <input
                            type="checkbox"
                            class="checkbox-input"
                            v-model="newMembershipForm.early_booking_access"
                          />
                          <span class="checkbox-text">Early booking access</span>
                          <i class="fas fa-info-circle info-icon" title="Allow early booking access"></i>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </validation-observer>
          </b-modal>

          <!-- Edit Membership Modal -->
          <b-modal
            id="edit-membership-modal"
            ref="editMembershipModal"
            title="Edit Membership Plan"
            size="lg"
            @hidden="resetEditMembershipForm"
            @ok="handleUpdateMembership"
            ok-title="Update"
            cancel-title="Cancel"
            :ok-disabled="membershipFormProcessing"
          >
            <validation-observer ref="editMembershipForm">
              <form @submit.prevent="handleUpdateMembership">
                <div class="form-fields">
                  <!-- Plan Name -->
                  <div class="form-field">
                    <label class="field-label">Plan Name <span class="required">*</span></label>
                    <validation-provider
                      name="Plan Name"
                      rules="required"
                      v-slot="validationContext"
                    >
                      <input
                        type="text"
                        :class="['field-input', { 'is-invalid': validationContext.errors.length > 0 }]"
                        v-model="editMembershipForm.name"
                        placeholder="e.g., Basic Plan, Premium Plan"
                        required
                      />
                      <div v-if="validationContext.errors.length > 0" class="invalid-feedback">
                        {{ validationContext.errors[0] }}
                      </div>
                    </validation-provider>
                  </div>

                  <!-- Price and Interval -->
                  <div class="form-fields-row">
                    <div class="form-field">
                      <label class="field-label">Price <span class="required">*</span></label>
                      <validation-provider
                        name="Price"
                        rules="required|numeric|min_value:0"
                        v-slot="validationContext"
                      >
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          :class="['field-input', { 'is-invalid': validationContext.errors.length > 0 }]"
                          v-model="editMembershipForm.price"
                          placeholder="0.00"
                          required
                        />
                        <div v-if="validationContext.errors.length > 0" class="invalid-feedback">
                          {{ validationContext.errors[0] }}
                        </div>
                      </validation-provider>
                    </div>

                    <div class="form-field">
                      <label class="field-label">Billing Interval <span class="required">*</span></label>
                      <validation-provider
                        name="Interval"
                        rules="required"
                        v-slot="validationContext"
                      >
                        <select
                          :class="['field-input', 'field-select', { 'is-invalid': validationContext.errors.length > 0 }]"
                          v-model="editMembershipForm.interval"
                          required
                        >
                          <option value="">Select interval</option>
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                        </select>
                        <div v-if="validationContext.errors.length > 0" class="invalid-feedback">
                          {{ validationContext.errors[0] }}
                        </div>
                      </validation-provider>
                    </div>
                  </div>

                  <!-- Stripe Price ID -->
                  <div class="form-field">
                    <label class="field-label">Stripe Price ID</label>
                    <input
                      type="text"
                      class="field-input"
                      v-model="editMembershipForm.stripe_price_id"
                      placeholder="price_xxxxx (optional)"
                    />
                    <small class="field-hint">Optional: Stripe price ID for payment processing</small>
                  </div>

                  <!-- Features -->
                  <div class="form-field">
                    <label class="field-label">Features</label>
                    <div class="features-input-wrapper">
                      <div
                        v-for="(feature, index) in editMembershipForm.features"
                        :key="index"
                        class="feature-input-row"
                      >
                        <input
                          type="text"
                          class="field-input"
                          v-model="editMembershipForm.features[index]"
                          :placeholder="`Feature ${index + 1}`"
                        />
                        <button
                          type="button"
                          class="remove-feature-btn"
                          @click="removeEditFeature(index)"
                          v-if="editMembershipForm.features.length > 1"
                        >
                          <i class="fas fa-times"></i>
                        </button>
                      </div>
                      <button
                        type="button"
                        class="add-feature-btn"
                        @click="addEditFeature"
                      >
                        <i class="fas fa-plus"></i> Add Feature
                      </button>
                    </div>
                  </div>

                  <!-- Sort Order -->
                  <div class="form-field">
                    <label class="field-label">Sort Order</label>
                    <input
                      type="number"
                      min="0"
                      class="field-input"
                      v-model.number="editMembershipForm.sort_order"
                      placeholder="0"
                    />
                    <small class="field-hint">Lower numbers appear first in the list</small>
                  </div>

                  <!-- Active Status -->
                  <div class="form-field">
                    <label class="checkbox-label">
                      <input
                        type="checkbox"
                        class="checkbox-input"
                        v-model="editMembershipForm.is_active"
                      />
                      <span class="checkbox-text">Active (Plan will be visible to members)</span>
                    </label>
                  </div>
                </div>
              </form>
            </validation-observer>
          </b-modal>

          <!-- Add-ons Tab Content -->
          <div v-show="membershipActiveTab === 'addons'" class="memberships-content">
            <div class="content-header">
              <h2>Add-ons</h2>
              <p class="content-description">Content coming soon...</p>
            </div>
          </div>

          <!-- Terms and Conditions Tab Content -->
          <div v-show="membershipActiveTab === 'terms'" class="memberships-content">
            <div class="content-header">
              <h2>Terms and Conditions</h2>
              <p class="content-description">Content coming soon...</p>
            </div>
          </div>
        </div>

        <!-- Subscription Management Section -->
        <div v-show="selectedSectionId === 'subscription-management'" class="content-card">
          <div class="content-header">
            <h2>Subscription Management</h2>
            <p class="content-description">
              Monitor and manage member subscriptions, set up automatic reminders, and track expiring plans.
            </p>
          </div>

          <!-- Statistics Cards -->
          <div class="row mb-4">
            <div class="col-md-4">
              <div class="card text-center">
                <div class="card-body">
                  <h3 class="text-primary">{{ subscriptionStats.total_active || 0 }}</h3>
                  <p class="mb-0">Active Subscriptions</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card text-center">
                <div class="card-body">
                  <h3 class="text-warning">{{ subscriptionStats.expiring_7_days || 0 }}</h3>
                  <p class="mb-0">Expiring in 7 Days</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card text-center">
                <div class="card-body">
                  <h3 class="text-danger">{{ subscriptionStats.expired || 0 }}</h3>
                  <p class="mb-0">Expired Subscriptions</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Expiring Subscriptions -->
          <div class="subscription-section mt-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h3>Expiring Subscriptions (Next 7 Days)</h3>
              <button class="btn btn-sm btn-primary" @click="loadExpiringSubscriptions">
                <i class="fas fa-sync-alt"></i> Refresh
              </button>
            </div>
            <div v-if="loadingExpiring" class="text-center p-4">
              <div class="spinner spinner-primary"></div>
            </div>
            <div v-else-if="expiringSubscriptions.length === 0" class="alert alert-info">
              No subscriptions expiring in the next 7 days.
            </div>
            <div v-else class="table-responsive">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Plan</th>
                    <th>End Date</th>
                    <th>Days Remaining</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="sub in expiringSubscriptions" :key="sub.id">
                    <td>
                      <strong>{{ sub.member.name }}</strong><br>
                      <small class="text-muted">{{ sub.member.email }}</small>
                    </td>
                    <td>{{ sub.plan.name }}</td>
                    <td>{{ formatDate(sub.end_date) }}</td>
                    <td>
                      <span :class="getDaysClass(sub.days_until_expiry)">
                        {{ sub.days_until_expiry }} days
                      </span>
                    </td>
                    <td>
                      <span :class="getStatusBadgeClass(sub.status)">
                        {{ sub.status.replace('_', ' ') }}
                      </span>
                    </td>
                    <td>
                      <button 
                        class="btn btn-sm btn-primary"
                        @click="sendReminder(sub.id)"
                        :disabled="sub.reminder_sent"
                        title="Send renewal reminder"
                      >
                        <i class="fas fa-bell"></i> Remind
                      </button>
                      <button 
                        class="btn btn-sm btn-success ml-2"
                        @click="renewSubscription(sub.id)"
                        title="Renew subscription"
                      >
                        <i class="fas fa-sync"></i> Renew
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Expired Subscriptions -->
          <div class="subscription-section mt-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h3>Expired Subscriptions</h3>
              <button class="btn btn-sm btn-primary" @click="loadExpiredSubscriptions">
                <i class="fas fa-sync-alt"></i> Refresh
              </button>
            </div>
            <div v-if="loadingExpired" class="text-center p-4">
              <div class="spinner spinner-primary"></div>
            </div>
            <div v-else-if="expiredSubscriptions.length === 0" class="alert alert-info">
              No expired subscriptions.
            </div>
            <div v-else class="table-responsive">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Plan</th>
                    <th>End Date</th>
                    <th>Days Expired</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="sub in expiredSubscriptions" :key="sub.id">
                    <td>
                      <strong>{{ sub.member.name }}</strong><br>
                      <small class="text-muted">{{ sub.member.email }}</small>
                    </td>
                    <td>{{ sub.plan.name }}</td>
                    <td>{{ formatDate(sub.end_date) }}</td>
                    <td>
                      <span class="text-danger font-weight-bold">
                        {{ sub.days_expired }} days ago
                      </span>
                    </td>
                    <td>
                      <button 
                        class="btn btn-sm btn-success"
                        @click="renewSubscription(sub.id)"
                        title="Renew subscription"
                      >
                        <i class="fas fa-sync"></i> Renew
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Reminder Settings -->
          <div class="subscription-settings mt-5">
            <h3 class="mb-3">Reminder Settings</h3>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Days before expiry to send reminder</label>
                  <input 
                    type="number" 
                    v-model="reminderSettings.days_before_expiry"
                    class="form-control"
                    min="1"
                    max="30"
                    placeholder="7"
                  />
                  <small class="form-text text-muted">
                    Members will receive reminders this many days before their subscription expires.
                  </small>
                </div>
                <button class="btn btn-primary" @click="saveReminderSettings">
                  <i class="fas fa-save"></i> Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Module Settings Section -->
        <div v-show="selectedSectionId === 'module-settings'" class="content-card">
          <validation-observer ref="form_module_settings">
            <form @submit.prevent="Submit_Module_Settings">
              <!-- Module Settings Tabs -->
              <div class="module-settings-tabs">
                <button
                  type="button"
                  class="module-tab"
                  :class="{ active: moduleSettingsActiveTab === 'settings' }"
                  @click="moduleSettingsActiveTab = 'settings'"
                >
                  Module Settings
                </button>
                <!-- <button
                  type="button"
                  class="module-tab"
                  :class="{ active: moduleSettingsActiveTab === 'devices' }"
                  @click="moduleSettingsActiveTab = 'devices'"
                >
                  Connected Devices
                </button>
                <button
                  type="button"
                  class="module-tab"
                  :class="{ active: moduleSettingsActiveTab === 'user-modules' }"
                  @click="moduleSettingsActiveTab = 'user-modules'"
                >
                  User Modules
                </button> -->
              </div>

              <!-- Module Settings Tab Content -->
              <div v-show="moduleSettingsActiveTab === 'settings'" class="module-settings-content">
                <p class="module-intro">
                  On this page, you can set up and configure the settings for the Coach module.
                </p>

                <!-- Coaching Section -->
                <div class="settings-section">
                  <h3 class="section-title">Coaching</h3>
                  
                  <div class="form-field">
                    <label class="checkbox-label">
                      <input
                        type="checkbox"
                        class="field-checkbox"
                        v-model="moduleSettings.all_coaches_coach_all_clients"
                      />
                      <span class="checkbox-text">All coaches can coach all members</span>
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                  </div>

                  <div class="form-field">
                    <label class="checkbox-label">
                      <input
                        type="checkbox"
                        class="field-checkbox"
                        v-model="moduleSettings.coaches_can_use_max_ai"
                      />
                      <span class="checkbox-text">Coaches can use MAX AI Coach</span>
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                  </div>

                  <div class="form-field">
                    <label class="checkbox-label">
                      <input
                        type="checkbox"
                        class="field-checkbox"
                        v-model="moduleSettings.coaches_can_see_club_visitors"
                      />
                      <span class="checkbox-text">Coaches can see club visitors in the Coach app</span>
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                  </div>
                </div>

                <!-- Community Section -->
                <div class="settings-section">
                  <h3 class="section-title">Community</h3>
                  
                  <div class="form-field">
                    <label class="field-label">
                      Members are able to see:
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <div class="radio-group">
                      <label class="radio-label">
                        <input
                          type="radio"
                          name="groups_visibility"
                          class="field-radio"
                          value="all"
                          v-model="moduleSettings.groups_visibility"
                        />
                        <span class="radio-text">All groups</span>
                      </label>
                      <label class="radio-label">
                        <input
                          type="radio"
                          name="groups_visibility"
                          class="field-radio"
                          value="club"
                          v-model="moduleSettings.groups_visibility"
                        />
                        <span class="radio-text">Only club groups</span>
                      </label>
                    </div>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Members are able to see:
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <div class="radio-group">
                      <label class="radio-label">
                        <input
                          type="radio"
                          name="challenges_visibility"
                          class="field-radio"
                          value="all"
                          v-model="moduleSettings.challenges_visibility"
                        />
                        <span class="radio-text">All challenges</span>
                      </label>
                      <label class="radio-label">
                        <input
                          type="radio"
                          name="challenges_visibility"
                          class="field-radio"
                          value="club"
                          v-model="moduleSettings.challenges_visibility"
                        />
                        <span class="radio-text">Only club challenges</span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Clients and Staff Section -->
                <div class="settings-section">
                  <h3 class="section-title">Clients and Staff</h3>
                  
                  <div class="form-field">
                    <label class="checkbox-label">
                      <input
                        type="checkbox"
                        class="field-checkbox"
                        v-model="moduleSettings.auto_make_new_members_pro"
                      />
                      <span class="checkbox-text">Automatically make all new members PRO</span>
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                  </div>

                  <div class="form-field">
                    <label class="checkbox-label">
                      <input
                        type="checkbox"
                        class="field-checkbox"
                        v-model="moduleSettings.auto_invite_new_clients"
                      />
                      <span class="checkbox-text">Auto-Invite newly added members</span>
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                  </div>
                </div>

                <!-- Nutrition Section -->
                <div class="settings-section">
                  <h3 class="section-title">Nutrition</h3>
                  
                  <div class="form-field">
                    <label class="checkbox-label">
                      <input
                        type="checkbox"
                        class="field-checkbox"
                        v-model="moduleSettings.add_calories_burned_to_nutrition"
                      />
                      <span class="checkbox-text">Add calories burned with activities to the nutrition plan</span>
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                  </div>
                </div>

                <!-- Workout Plans Section -->
                <div class="settings-section">
                  <h3 class="section-title">Workout Plans</h3>
                  
                  <div class="form-field">
                    <label class="checkbox-label">
                      <input
                        type="checkbox"
                        class="field-checkbox"
                        v-model="moduleSettings.clients_can_create_workout_plans"
                      />
                      <span class="checkbox-text">Members can create workout plans</span>
                    </label>
                  </div>

                  <div class="form-field">
                    <label class="field-label">
                      Members are able to see:
                      <i class="fas fa-info-circle info-icon"></i>
                    </label>
                    <div class="radio-group">
                      <label class="radio-label">
                        <input
                          type="radio"
                          name="workout_plans_visibility"
                          class="field-radio"
                          value="all"
                          v-model="moduleSettings.workout_plans_visibility"
                        />
                        <span class="radio-text">All workout plans</span>
                      </label>
                      <label class="radio-label">
                        <input
                          type="radio"
                          name="workout_plans_visibility"
                          class="field-radio"
                          value="club"
                          v-model="moduleSettings.workout_plans_visibility"
                        />
                        <span class="radio-text">Only club workout plans</span>
                      </label>
                      <label class="radio-label">
                        <input
                          type="radio"
                          name="workout_plans_visibility"
                          class="field-radio"
                          value="none"
                          v-model="moduleSettings.workout_plans_visibility"
                        />
                        <span class="radio-text">No workout plans</span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Action Button -->
                <div class="form-actions">
                  <button class="submit-btn" type="submit">
                    Save
                  </button>
                </div>
              </div>

              <!-- Connected Devices Tab Content -->
              <div v-show="moduleSettingsActiveTab === 'devices'" class="module-settings-content">
                <div class="content-header">
                  <h2>Connected Devices</h2>
                  <p class="content-description">Content coming soon...</p>
                </div>
              </div>

              <!-- User Modules Tab Content -->
              <div v-show="moduleSettingsActiveTab === 'user-modules'" class="module-settings-content">
                <div class="content-header">
                  <h2>User Modules</h2>
                  <p class="content-description">Content coming soon...</p>
                </div>
              </div>
            </form>
          </validation-observer>
        </div>

        <!-- Coach Finder Section -->
        <div v-show="selectedSectionId === 'coach-finder'" class="content-card">
          <div class="content-header">
            <h2>Coach Finder</h2>
            <p class="content-description">
              All Coaches in your business are shown in the list below. Coaches can provide their own Business Profile through their Mobile Coach App. Afterward, it is up to you as Manager to review and approve the submitted content. Use the Edit icon to review the content and make any desired changes. The toggle on the right side shows or hides the Coach profile in the Coach Finder part of your member-facing fitness app.
            </p>
          </div>

          <div class="coach-finder-table-wrapper">
            <table class="coach-finder-table">
              <thead>
                <tr>
                  <th>Coach</th>
                  <th>Status</th>
                  <th>Last updated</th>
                  <th>Visible</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="coach in coachList" :key="coach.id">
                  <td>
                    <div class="coach-profile-cell">
                      <div class="coach-avatar">
                        <img
                          v-if="coach.profile_image"
                          :src="getCoachProfileImage(coach.profile_image)"
                          :alt="coach.name"
                          class="coach-image"
                          @error="handleImageError"
                        />
                        <div v-else class="coach-placeholder">
                          <i class="fas fa-user"></i>
                        </div>
                      </div>
                      <a href="#" class="coach-name-link" @click.prevent="viewCoachProfile(coach)">
                        {{ coach.name }}
                      </a>
                    </div>
                  </td>
                  <td>
                    <span class="status-badge" :class="getStatusClass(coach.status)">
                      {{ coach.status }}
                    </span>
                  </td>
                  <td>
                    <div class="last-updated-cell">
                      <span v-if="coach.last_updated">{{ coach.last_updated }}</span>
                      <span v-else class="dash">-</span>
                      <button
                        v-if="coach.last_updated"
                        type="button"
                        class="edit-icon-btn"
                        @click="editCoachProfile(coach)"
                        title="Edit"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                    </div>
                  </td>
                  <td>
                    <div v-if="coach.has_profile" class="visibility-toggle-cell">
                      <label class="switch">
                        <input
                          type="checkbox"
                          :checked="coach.visible"
                          @change="toggleCoachVisibility(coach)"
                        />
                        <span class="slider"></span>
                      </label>
                    </div>
                    <span v-else class="dash">-</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Email Templates Section -->
        <div v-show="selectedSectionId === 'email-templates'" class="content-card">
          <div v-if="emailTemplatesLoading" class="loading_page spinner spinner-primary mr-3"></div>

          <div v-else class="email-templates-container">
            <!-- Main Header -->
            <div class="section-header">
              <!-- <div class="section-icon">
                <i class="fas fa-envelope me-2"></i>
              </div> -->
              <div class="section-content">
                <h2 class="section-title">Notification Emails</h2>
                <p class="section-description">Configure email templates sent to your fitness members and coaches</p>
              </div>
            </div>

            <!-- Main Tabs: Members and Coaches -->
            <div class="main-tabs-wrapper">
              <b-tabs 
                active-nav-item-class="custom-tab-nav" 
                content-class="tab-content-custom"
                class="main-email-tabs"
              >
                <!-- Members Tab -->
                <b-tab title="Members" class="main-tab-item">
                  <template #title>
                    <span class="tab-title-content">
                      <i class="fas fa-users me-2"></i>
                      Members
                    </span>
                  </template>

                  <div class="template-card">
                <b-tabs 
                  active-nav-item-class="custom-tab-nav" 
                  content-class="tab-content-custom"
                  class="email-tabs"
                >
                  <!-- Membership Tab -->
                  <b-tab :title="Membership" class="tab-item">
                    <template #title>
                      <span class="tab-title-content">
                        <i class="fas fa-id-card me-2"></i>
                        Membership
                      </span>
                    </template>
                    
                    <form @submit.prevent="update_custom_email('membership')" class="email-form">
                      <div class="available-tags-section">
                        <div class="tags-header">
                          <i class="fas fa-tags me-2"></i>
                          <strong>Available_Tags:</strong>
                        </div>
                        <div class="tags-container">
                          <span class="tag-item">{member_name}</span>
                          <span class="tag-item">{gym_name}</span>
                          <span class="tag-item">{membership_type}</span>
                          <span class="tag-item">{start_date}</span>
                          <span class="tag-item">{end_date}</span>
                          <span class="tag-item">{membership_fee}</span>
                          <span class="tag-item">{payment_status}</span>
                        </div>
                      </div>

                      <div class="form-section">
                        <div class="form-group">
                          <label for="email_subject_membership" class="form-label">
                            <i class="fas fa-edit me-2"></i>
                            Email_Subject
                          </label>
                          <input 
                            type="text" 
                            v-model="emailTemplatesData.membership.subject" 
                            class="form-control custom-input"
                            name="email_subject_membership" 
                            id="email_subject_membership" 
                            :placeholder="Email_Subject"
                          >
                        </div>
                        
                        <div class="form-group">
                          <label for="email_body_membership" class="form-label">
                            <i class="fas fa-file-alt me-2"></i>
                            Email_body
                          </label>
                          <div class="editor-container">
                            <vue-editor 
                              id="editor_membership" 
                              v-model="emailTemplatesData.membership.body" 
                              :editor-toolbar="emailTemplatesToolbar"
                              class="custom-editor"
                            ></vue-editor>
                          </div>
                        </div>
                      </div>

                      <div class="form-actions">
                        <button 
                          type="submit" 
                          :disabled="emailTemplatesSubmitProcessing" 
                          class="btn btn-primary custom-btn"
                        >
                          <span v-if="emailTemplatesSubmitProcessing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          <i class="fas fa-check me-2"></i>
                          submit
                        </button>
                        <button 
                          type="button" 
                          @click="reset_single_template('membership')" 
                          class="btn btn-secondary custom-btn ms-2"
                        >
                          <i class="fas fa-undo me-2"></i>
                          Reset to Defaults
                        </button>
                      </div>
                    </form>
                  </b-tab>

                  <!-- Class Booking Tab -->
                  <b-tab title="Booking" class="tab-item">
                    <template #title>
                      <span class="tab-title-content">
                        <i class="fas fa-calendar-alt me-2"></i>
                        Booking
                      </span>
                    </template>

                    <form @submit.prevent="update_custom_email('class_booking')" class="email-form">
                      <div class="available-tags-section">
                        <div class="tags-header">
                          <i class="fas fa-tags me-2"></i>
                          <strong>Available Tags:</strong>
                        </div>
                        <div class="tags-container">
                          <span class="tag-item">{member_name}</span>
                          <span class="tag-item">{gym_name}</span>
                          <span class="tag-item">{class_name}</span>
                          <span class="tag-item">{class_date}</span>
                          <span class="tag-item">{class_time}</span>
                          <span class="tag-item">{trainer_name}</span>
                          <span class="tag-item">{class_location}</span>
                        </div>
                      </div>

                      <div class="form-section">
                        <div class="form-group">
                          <label for="email_subject_class_booking" class="form-label">
                            <i class="fas fa-edit me-2"></i>
                            Email_Subject
                          </label>
                          <input 
                            type="text" 
                            v-model="emailTemplatesData.class_booking.subject" 
                            class="form-control custom-input"
                            name="email_subject_class_booking" 
                            id="email_subject_class_booking" 
                            :placeholder="Email_Subject"
                          >
                        </div>

                        <div class="form-group">
                          <label for="email_body_class_booking" class="form-label">
                            <i class="fas fa-file-alt me-2"></i>
                            Email body
                          </label>
                          <div class="editor-container">
                            <vue-editor 
                              id="editor_class_booking" 
                              v-model="emailTemplatesData.class_booking.body" 
                              :editor-toolbar="emailTemplatesToolbar"
                              class="custom-editor"
                            ></vue-editor>
                          </div>
                        </div>
                      </div>

                      <div class="form-actions">
                        <button 
                          type="submit" 
                          :disabled="emailTemplatesSubmitProcessing" 
                          class="btn btn-primary custom-btn"
                        >
                          <span v-if="emailTemplatesSubmitProcessing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          <i class="fas fa-check me-2"></i>
                          submit
                        </button>
                        <button 
                          type="button" 
                          @click="reset_single_template('class_booking')" 
                          class="btn btn-secondary custom-btn ms-2"
                        >
                          <i class="fas fa-undo me-2"></i>
                          Reset to Defaults
                        </button>
                      </div>
                    </form>
                  </b-tab>

                  <!-- Payment Received Tab -->
                  <b-tab title="Payments Received" class="tab-item">
                    <template #title>
                      <span class="tab-title-content">
                        <i class="fas fa-money-bill-wave me-2"></i>
                        Payments Received
                      </span>
                    </template>

                    <form @submit.prevent="update_custom_email('payment_received')" class="email-form">
                      <div class="available-tags-section">
                        <div class="tags-header">
                          <i class="fas fa-tags me-2"></i>
                          <strong>Available Tags:</strong>
                        </div>
                        <div class="tags-container">
                          <span class="tag-item">{member_name}</span>
                          <span class="tag-item">{gym_name}</span>
                          <span class="tag-item">{payment_number}</span>
                          <span class="tag-item">{paid_amount}</span>
                          <span class="tag-item">{payment_method}</span>
                          <span class="tag-item">{payment_date}</span>
                        </div>
                      </div>

                      <div class="form-section">
                        <div class="form-group">
                          <label for="email_subject_payment_received" class="form-label">
                            <i class="fas fa-edit me-2"></i>
                            Email_Subject
                          </label>
                          <input 
                            type="text" 
                            v-model="emailTemplatesData.payment_received.subject" 
                            class="form-control custom-input"
                            name="email_subject_payment_received" 
                            id="email_subject_payment_received" 
                            :placeholder="Email_Subject"
                          >
                        </div>

                        <div class="form-group">
                          <label for="email_body_payment_received" class="form-label">
                            <i class="fas fa-file-alt me-2"></i>
                            Email_body
                          </label>
                          <div class="editor-container">
                            <vue-editor 
                              id="editor_payment_received" 
                              v-model="emailTemplatesData.payment_received.body" 
                              :editor-toolbar="emailTemplatesToolbar"
                              class="custom-editor"
                            ></vue-editor>
                          </div>
                        </div>
                      </div>

                      <div class="form-actions">
                        <button 
                          type="submit" 
                          :disabled="emailTemplatesSubmitProcessing" 
                          class="btn btn-primary custom-btn"
                        >
                          <span v-if="emailTemplatesSubmitProcessing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          <i class="fas fa-check me-2"></i>
                          submit
                        </button>
                        <button 
                          type="button" 
                          @click="reset_single_template('payment_received')" 
                          class="btn btn-secondary custom-btn ms-2"
                        >
                          <i class="fas fa-undo me-2"></i>
                          Reset to Defaults
                        </button>
                      </div>
                    </form>
                  </b-tab>

                  <!-- Workout Plan Tab -->
                  <b-tab :title="Workout_Plan" class="tab-item">
                    <template #title>
                      <span class="tab-title-content">
                        <i class="fas fa-dumbbell me-2"></i>
                        Workout_Plan
                      </span>
                    </template>

                    <form @submit.prevent="update_custom_email('workout_plan')" class="email-form">
                      <div class="available-tags-section">
                        <div class="tags-header">
                          <i class="fas fa-tags me-2"></i>
                          <strong>Available_Tags:</strong>
                        </div>
                        <div class="tags-container">
                          <span class="tag-item">{member_name}</span>
                          <span class="tag-item">{gym_name}</span>
                          <span class="tag-item">{trainer_name}</span>
                          <span class="tag-item">{plan_name}</span>
                          <span class="tag-item">{plan_duration}</span>
                          <span class="tag-item">{next_session_date}</span>
                          <span class="tag-item">{plan_url}</span>
                        </div>
                      </div>

                      <div class="form-section">
                        <div class="form-group">
                          <label for="email_subject_workout_plan" class="form-label">
                            <i class="fas fa-edit me-2"></i>
                            Email_Subject
                          </label>
                          <input 
                            type="text" 
                            v-model="emailTemplatesData.workout_plan.subject" 
                            class="form-control custom-input"
                            name="email_subject_workout_plan" 
                            id="email_subject_workout_plan" 
                            :placeholder="Email_Subject"
                          >
                        </div>

                        <div class="form-group">
                          <label for="email_body_workout_plan" class="form-label">
                            <i class="fas fa-file-alt me-2"></i>
                            Email_body
                          </label>
                          <div class="editor-container">
                            <vue-editor 
                              id="editor_workout_plan" 
                              v-model="emailTemplatesData.workout_plan.body" 
                              :editor-toolbar="emailTemplatesToolbar"
                              class="custom-editor"
                            ></vue-editor>
                          </div>
                        </div>
                      </div>

                      <div class="form-actions">
                        <button 
                          type="submit" 
                          :disabled="emailTemplatesSubmitProcessing" 
                          class="btn btn-primary custom-btn"
                        >
                          <span v-if="emailTemplatesSubmitProcessing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          <i class="fas fa-check me-2"></i>
                          submit
                        </button>
                        <button 
                          type="button" 
                          @click="reset_single_template('workout_plan')" 
                          class="btn btn-secondary custom-btn ms-2"
                        >
                          <i class="fas fa-undo me-2"></i>
                          Reset to Defaults
                        </button>
                      </div>
                    </form>
                  </b-tab>

                  <!-- Password Setup Tab -->
                  <b-tab title="Password" class="tab-item">
                    <template #title>
                      <span class="tab-title-content">
                        <i class="fas fa-key me-2"></i>
                        Password
                      </span>
                    </template>

                    <form @submit.prevent="update_custom_email('password_setup')" class="email-form">
                      <div class="available-tags-section">
                        <div class="tags-header">
                          <i class="fas fa-tags me-2"></i>
                          <strong>Available_Tags:</strong>
                        </div>
                        <div class="tags-container">
                          <span class="tag-item">{member_name}</span>
                          <span class="tag-item">{gym_name}</span>
                          <span class="tag-item">{setup_url}</span>
                          <span class="tag-item">{setup_token}</span>
                          <span class="tag-item">{expiration_days}</span>
                        </div>
                      </div>

                      <div class="form-section">
                        <div class="form-group">
                          <label for="email_subject_password_setup" class="form-label">
                            <i class="fas fa-edit me-2"></i>
                            Email_Subject
                          </label>
                          <input 
                            type="text" 
                            v-model="emailTemplatesData.password_setup.subject" 
                            class="form-control custom-input"
                            name="email_subject_password_setup" 
                            id="email_subject_password_setup" 
                            :placeholder="Email_Subject"
                          >
                        </div>

                        <div class="form-group">
                          <label for="email_body_password_setup" class="form-label">
                            <i class="fas fa-file-alt me-2"></i>
                            Email_body
                          </label>
                          <div class="editor-container">
                            <vue-editor 
                              id="editor_password_setup" 
                              v-model="emailTemplatesData.password_setup.body" 
                              :editor-toolbar="emailTemplatesToolbar"
                              class="custom-editor"
                            ></vue-editor>
                          </div>
                        </div>
                      </div>

                      <div class="form-actions">
                        <button 
                          type="submit" 
                          :disabled="emailTemplatesSubmitProcessing" 
                          class="btn btn-primary custom-btn"
                        >
                          <span v-if="emailTemplatesSubmitProcessing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          <i class="fas fa-check me-2"></i>
                          submit
                        </button>
                        <button 
                          type="button" 
                          @click="reset_single_template('password_setup')" 
                          class="btn btn-secondary custom-btn ms-2"
                        >
                          <i class="fas fa-undo me-2"></i>
                          Reset to Defaults
                        </button>
                      </div>
                    </form>
                  </b-tab>

                  <!-- Workout Assigned Tab -->
                  <b-tab title="Workout" class="tab-item">
                    <template #title>
                      <span class="tab-title-content">
                        <i class="fas fa-dumbbell me-2"></i>
                        Workout
                      </span>
                    </template>
                    <form @submit.prevent="update_custom_email('workout_assigned')" class="email-form">
                      <div class="form-content">
                        <div class="form-group">
                          <label for="email_subject_workout_assigned" class="form-label">
                            <i class="fas fa-envelope me-2"></i>
                            Email_Subject
                          </label>
                          <input 
                            type="text" 
                            v-model="emailTemplatesData.workout_assigned.subject" 
                            class="form-control custom-input"
                            name="email_subject_workout_assigned" 
                            id="email_subject_workout_assigned" 
                            :placeholder="Email_Subject"
                          >
                        </div>

                        <div class="form-group">
                          <label for="email_body_workout_assigned" class="form-label">
                            <i class="fas fa-file-alt me-2"></i>
                            Email_body
                          </label>
                          <div class="editor-container">
                            <vue-editor 
                              id="editor_workout_assigned" 
                              v-model="emailTemplatesData.workout_assigned.body" 
                              :editor-toolbar="emailTemplatesToolbar"
                              class="custom-editor"
                            ></vue-editor>
                          </div>
                        </div>
                      </div>

                      <div class="form-actions">
                        <button 
                          type="submit" 
                          :disabled="emailTemplatesSubmitProcessing" 
                          class="btn btn-primary custom-btn"
                        >
                          <span v-if="emailTemplatesSubmitProcessing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          <i class="fas fa-check me-2"></i>
                          submit
                        </button>
                        <button 
                          type="button" 
                          @click="reset_single_template('workout_assigned')" 
                          class="btn btn-secondary custom-btn ms-2"
                        >
                          <i class="fas fa-undo me-2"></i>
                          Reset to Defaults
                        </button>
                      </div>
                    </form>
                  </b-tab>

                  <!-- Nutrition Assigned Tab -->
                  <b-tab title="Nutrition" class="tab-item">
                    <template #title>
                      <span class="tab-title-content">
                        <i class="fas fa-apple-alt me-2"></i>
                        Nutrition
                      </span>
                    </template>
                    <form @submit.prevent="update_custom_email('nutrition_assigned')" class="email-form">
                      <div class="form-content">
                        <div class="form-group">
                          <label for="email_subject_nutrition_assigned" class="form-label">
                            <i class="fas fa-envelope me-2"></i>
                            Email_Subject
                          </label>
                          <input 
                            type="text" 
                            v-model="emailTemplatesData.nutrition_assigned.subject" 
                            class="form-control custom-input"
                            name="email_subject_nutrition_assigned" 
                            id="email_subject_nutrition_assigned" 
                            :placeholder="Email_Subject"
                          >
                        </div>

                        <div class="form-group">
                          <label for="email_body_nutrition_assigned" class="form-label">
                            <i class="fas fa-file-alt me-2"></i>
                            Email_body
                          </label>
                          <div class="editor-container">
                            <vue-editor 
                              id="editor_nutrition_assigned" 
                              v-model="emailTemplatesData.nutrition_assigned.body" 
                              :editor-toolbar="emailTemplatesToolbar"
                              class="custom-editor"
                            ></vue-editor>
                          </div>
                        </div>
                      </div>

                      <div class="form-actions">
                        <button 
                          type="submit" 
                          :disabled="emailTemplatesSubmitProcessing" 
                          class="btn btn-primary custom-btn"
                        >
                          <span v-if="emailTemplatesSubmitProcessing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          <i class="fas fa-check me-2"></i>
                          submit
                        </button>
                        <button 
                          type="button" 
                          @click="reset_single_template('nutrition_assigned')" 
                          class="btn btn-secondary custom-btn ms-2"
                        >
                          <i class="fas fa-undo me-2"></i>
                          Reset to Defaults
                        </button>
                      </div>
                    </form>
                  </b-tab>

                </b-tabs>
                  </div>
                </b-tab>

                <!-- Coaches Tab -->
                <b-tab title="Coaches" class="main-tab-item">
                  <template #title>
                    <span class="tab-title-content">
                      <i class="fas fa-user-tie me-2"></i>
                      Coaches
                    </span>
                  </template>

                  <div class="template-card">
                <b-tabs 
                  active-nav-item-class="custom-tab-nav" 
                  content-class="tab-content-custom"
                  class="email-tabs"
                >
                  <!-- Coach Schedule Tab -->
                  <b-tab title="Schedule" class="tab-item">
                    <template #title>
                      <span class="tab-title-content">
                        <i class="fas fa-calendar-check me-2"></i>
                        Schedule
                      </span>
                    </template>

                    <form @submit.prevent="update_custom_email('staff_schedule')" class="email-form">
                      <div class="available-tags-section">
                        <div class="tags-header">
                          <i class="fas fa-tags me-2"></i>
                          <strong>Available_Tags:</strong>
                        </div>
                        <div class="tags-container">
                          <span class="tag-item">{coach_name}</span>
                          <span class="tag-item">{gym_name}</span>
                          <span class="tag-item">{schedule_date}</span>
                          <span class="tag-item">{shift_time}</span>
                          <span class="tag-item">{assigned_classes}</span>
                          <span class="tag-item">{location}</span>
                        </div>
                      </div>

                      <div class="form-section">
                        <div class="form-group">
                          <label for="email_subject_staff_schedule" class="form-label">
                            <i class="fas fa-edit me-2"></i>
                            Email_Subject
                          </label>
                          <input 
                            type="text" 
                            v-model="emailTemplatesData.staff_schedule.subject" 
                            class="form-control custom-input"
                            name="email_subject_staff_schedule" 
                            id="email_subject_staff_schedule" 
                            :placeholder="Email_Subject"
                          >
                        </div>

                        <div class="form-group">
                          <label for="email_body_staff_schedule" class="form-label">
                            <i class="fas fa-file-alt me-2"></i>
                            Email_body
                          </label>
                          <div class="editor-container">
                            <vue-editor 
                              id="editor_staff_schedule" 
                              v-model="emailTemplatesData.staff_schedule.body" 
                              :editor-toolbar="emailTemplatesToolbar"
                              class="custom-editor"
                            ></vue-editor>
                          </div>
                        </div>
                      </div>

                      <div class="form-actions">
                        <button 
                          type="submit" 
                          :disabled="emailTemplatesSubmitProcessing" 
                          class="btn btn-primary custom-btn"
                        >
                          <span v-if="emailTemplatesSubmitProcessing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          <i class="fas fa-check me-2"></i>
                          submit
                        </button>
                        <button 
                          type="button" 
                          @click="reset_single_template('staff_schedule')" 
                          class="btn btn-secondary custom-btn ms-2"
                        >
                          <i class="fas fa-undo me-2"></i>
                          Reset to Defaults
                        </button>
                      </div>
                    </form>
                  </b-tab>

                  <!-- Payment Sent Tab -->
                  <b-tab title="Payments" class="tab-item">
                    <template #title>
                      <span class="tab-title-content">
                        <i class="fas fa-money-bill-wave me-2"></i>
                        Payments
                      </span>
                    </template>

                    <form @submit.prevent="update_custom_email('payment_sent')" class="email-form">
                      <div class="available-tags-section">
                        <div class="tags-header">
                          <i class="fas fa-tags me-2"></i>
                          <strong>Available_Tags:</strong>
                        </div>
                        <div class="tags-container">
                          <span class="tag-item">{coach_name}</span>
                          <span class="tag-item">{gym_name}</span>
                          <span class="tag-item">{payment_number}</span>
                          <span class="tag-item">{paid_amount}</span>
                          <span class="tag-item">{payment_method}</span>
                          <span class="tag-item">{payment_date}</span>
                        </div>
                      </div>

                      <div class="form-section">
                        <div class="form-group">
                          <label for="email_subject_payment_sent" class="form-label">
                            <i class="fas fa-edit me-2"></i>
                            Email_Subject
                          </label>
                          <input 
                            type="text" 
                            v-model="emailTemplatesData.payment_sent.subject" 
                            class="form-control custom-input"
                            name="email_subject_payment_sent" 
                            id="email_subject_payment_sent" 
                            :placeholder="Email_Subject"
                          >
                        </div>

                        <div class="form-group">
                          <label for="email_body_payment_sent" class="form-label">
                            <i class="fas fa-file-alt me-2"></i>
                            Email_body
                          </label>
                          <div class="editor-container">
                            <vue-editor 
                              id="editor_payment_sent" 
                              v-model="emailTemplatesData.payment_sent.body" 
                              :editor-toolbar="emailTemplatesToolbar"
                              class="custom-editor"
                            ></vue-editor>
                          </div>
                        </div>
                      </div>

                      <div class="form-actions">
                        <button 
                          type="submit" 
                          :disabled="emailTemplatesSubmitProcessing" 
                          class="btn btn-primary custom-btn"
                        >
                          <span v-if="emailTemplatesSubmitProcessing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          <i class="fas fa-check me-2"></i>
                          submit
                        </button>
                        <button 
                          type="button" 
                          @click="reset_single_template('payment_sent')" 
                          class="btn btn-secondary custom-btn ms-2"
                        >
                          <i class="fas fa-undo me-2"></i>
                          Reset to Defaults
                        </button>
                      </div>
                    </form>
                  </b-tab>

                  <!-- Appointment Created Tab -->
                  <b-tab title="Created" class="tab-item">
                    <template #title>
                      <span class="tab-title-content">
                        <i class="fas fa-calendar-plus me-2"></i>
                        Created
                      </span>
                    </template>
                    <form @submit.prevent="update_custom_email('appointment_created')">
                      <div class="form-content">
                        <div class="form-group">
                          <label for="email_subject_appointment_created" class="form-label">
                            <i class="fas fa-envelope me-2"></i>
                            Email_Subject
                          </label>
                          <input 
                            type="text" 
                            v-model="emailTemplatesData.appointment_created.subject" 
                            class="form-control custom-input"
                            name="email_subject_appointment_created" 
                            id="email_subject_appointment_created" 
                            :placeholder="Email_Subject"
                          >
                        </div>

                        <div class="form-group">
                          <label for="email_body_appointment_created" class="form-label">
                            <i class="fas fa-file-alt me-2"></i>
                            Email_body
                          </label>
                          <div class="editor-container">
                            <vue-editor 
                              id="editor_appointment_created" 
                              v-model="emailTemplatesData.appointment_created.body" 
                              :editor-toolbar="emailTemplatesToolbar"
                              class="custom-editor"
                            ></vue-editor>
                          </div>
                        </div>
                      </div>

                      <div class="form-actions">
                        <button 
                          type="submit" 
                          :disabled="emailTemplatesSubmitProcessing" 
                          class="btn btn-primary custom-btn"
                        >
                          <span v-if="emailTemplatesSubmitProcessing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          <i class="fas fa-check me-2"></i>
                          submit
                        </button>
                        <button 
                          type="button" 
                          @click="reset_single_template('appointment_created')" 
                          class="btn btn-secondary custom-btn ms-2"
                        >
                          <i class="fas fa-undo me-2"></i>
                          Reset to Defaults
                        </button>
                      </div>
                    </form>
                  </b-tab>

                  <!-- Appointment Updated Tab -->
                  <b-tab title="Updated" class="tab-item">
                    <template #title>
                      <span class="tab-title-content">
                        <i class="fas fa-calendar-check me-2"></i>
                        Updated
                      </span>
                    </template>
                    <form @submit.prevent="update_custom_email('appointment_updated')">
                      <div class="form-content">
                        <div class="form-group">
                          <label for="email_subject_appointment_updated" class="form-label">
                            <i class="fas fa-envelope me-2"></i>
                            Email_Subject
                          </label>
                          <input 
                            type="text" 
                            v-model="emailTemplatesData.appointment_updated.subject" 
                            class="form-control custom-input"
                            name="email_subject_appointment_updated" 
                            id="email_subject_appointment_updated" 
                            :placeholder="Email_Subject"
                          >
                        </div>

                        <div class="form-group">
                          <label for="email_body_appointment_updated" class="form-label">
                            <i class="fas fa-file-alt me-2"></i>
                            Email_body
                          </label>
                          <div class="editor-container">
                            <vue-editor 
                              id="editor_appointment_updated" 
                              v-model="emailTemplatesData.appointment_updated.body" 
                              :editor-toolbar="emailTemplatesToolbar"
                              class="custom-editor"
                            ></vue-editor>
                          </div>
                        </div>
                      </div>

                      <div class="form-actions">
                        <button 
                          type="submit" 
                          :disabled="emailTemplatesSubmitProcessing" 
                          class="btn btn-primary custom-btn"
                        >
                          <span v-if="emailTemplatesSubmitProcessing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          <i class="fas fa-check me-2"></i>
                          submit
                        </button>
                        <button 
                          type="button" 
                          @click="reset_single_template('appointment_updated')" 
                          class="btn btn-secondary custom-btn ms-2"
                        >
                          <i class="fas fa-undo me-2"></i>
                          Reset to Defaults
                        </button>
                      </div>
                    </form>
                  </b-tab>

                  <!-- Appointment Cancelled Tab -->
                  <b-tab title="Cancelled" class="tab-item">
                    <template #title>
                      <span class="tab-title-content">
                        <i class="fas fa-calendar-times me-2"></i>
                        Cancelled
                      </span>
                    </template>
                    <form @submit.prevent="update_custom_email('appointment_cancelled')">
                      <div class="form-content">
                        <div class="form-group">
                          <label for="email_subject_appointment_cancelled" class="form-label">
                            <i class="fas fa-envelope me-2"></i>
                            Email_Subject
                          </label>
                          <input 
                            type="text" 
                            v-model="emailTemplatesData.appointment_cancelled.subject" 
                            class="form-control custom-input"
                            name="email_subject_appointment_cancelled" 
                            id="email_subject_appointment_cancelled" 
                            :placeholder="Email_Subject"
                          >
                        </div>

                        <div class="form-group">
                          <label for="email_body_appointment_cancelled" class="form-label">
                            <i class="fas fa-file-alt me-2"></i>
                            Email_body
                          </label>
                          <div class="editor-container">
                            <vue-editor 
                              id="editor_appointment_cancelled" 
                              v-model="emailTemplatesData.appointment_cancelled.body" 
                              :editor-toolbar="emailTemplatesToolbar"
                              class="custom-editor"
                            ></vue-editor>
                          </div>
                        </div>
                      </div>

                      <div class="form-actions">
                        <button 
                          type="submit" 
                          :disabled="emailTemplatesSubmitProcessing" 
                          class="btn btn-primary custom-btn"
                        >
                          <span v-if="emailTemplatesSubmitProcessing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          <i class="fas fa-check me-2"></i>
                          submit
                        </button>
                        <button 
                          type="button" 
                          @click="reset_single_template('appointment_cancelled')" 
                          class="btn btn-secondary custom-btn ms-2"
                        >
                          <i class="fas fa-undo me-2"></i>
                          Reset to Defaults
                        </button>
                      </div>
                    </form>
                  </b-tab>

                  <!-- Schedule Assigned Tab -->
                  <b-tab title="Assigned" class="tab-item">
                    <template #title>
                      <span class="tab-title-content">
                        <i class="fas fa-calendar-alt me-2"></i>
                        Assigned
                      </span>
                    </template>
                    <form @submit.prevent="update_custom_email('schedule_assigned')" class="email-form">
                      <div class="form-content">
                        <div class="form-group">
                          <label for="email_subject_schedule_assigned" class="form-label">
                            <i class="fas fa-envelope me-2"></i>
                            Email_Subject
                          </label>
                          <input 
                            type="text" 
                            v-model="emailTemplatesData.schedule_assigned.subject" 
                            class="form-control custom-input"
                            name="email_subject_schedule_assigned" 
                            id="email_subject_schedule_assigned" 
                            :placeholder="Email_Subject"
                          >
                        </div>

                        <div class="form-group">
                          <label for="email_body_schedule_assigned" class="form-label">
                            <i class="fas fa-file-alt me-2"></i>
                            Email_body
                          </label>
                          <div class="editor-container">
                            <vue-editor 
                              id="editor_schedule_assigned" 
                              v-model="emailTemplatesData.schedule_assigned.body" 
                              :editor-toolbar="emailTemplatesToolbar"
                              class="custom-editor"
                            ></vue-editor>
                          </div>
                        </div>
                      </div>

                      <div class="form-actions">
                        <button 
                          type="submit" 
                          :disabled="emailTemplatesSubmitProcessing" 
                          class="btn btn-primary custom-btn"
                        >
                          <span v-if="emailTemplatesSubmitProcessing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          <i class="fas fa-check me-2"></i>
                          submit
                        </button>
                        <button 
                          type="button" 
                          @click="reset_single_template('schedule_assigned')" 
                          class="btn btn-secondary custom-btn ms-2"
                        >
                          <i class="fas fa-undo me-2"></i>
                          Reset to Defaults
                        </button>
                      </div>
                    </form>
                  </b-tab>
                </b-tabs>
                  </div>
                </b-tab>
              </b-tabs>
            </div>
          </div>
        </div>

        <!-- Mail Settings Section -->
        <div v-show="selectedSectionId === 'mail-settings'" class="content-card">
          <div class="content-header">
            <h2>Mail Settings</h2>
            <p class="content-description">
              Configure your email server settings for sending notifications and communications
            </p>
          </div>

          <div v-if="mailSettingsLoading" class="loading_page spinner spinner-primary mr-3"></div>

          <validation-observer ref="form_config_mail" v-if="!mailSettingsLoading">
            <b-form @submit.prevent="Submit_config_mail" class="mail-settings-form">
              
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
                            v-model="mailServer.mail_mailer"
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
                            v-model="mailServer.host"
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
                            v-model="mailServer.port"
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
                            v-model="mailServer.sender_name"
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
                            v-model="mailServer.username"
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
                              v-model="mailServer.password"
                              class="form-control custom-input"
                              :type="showMailPassword ? 'text' : 'password'"
                            ></b-form-input>
                            <button 
                              type="button" 
                              class="password-toggle"
                              @click="showMailPassword = !showMailPassword"
                            >
                              <i :class="showMailPassword ? 'i-Eye' : 'i-Eye-Slash'"></i>
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
                            v-model="mailServer.encryption"
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
                      @click="testMailConnection"
                      :disabled="isTestingMail"
                    >
                      <i class="i-Send me-2"></i>
                      {{ isTestingMail ? 'Testing...' : 'Test Connection' }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="form-actions">
                <button 
                  type="submit" 
                  class="btn btn-primary btn-save"
                  :disabled="isSavingMail"
                >
                  <i class="i-Save me-2"></i>
                  {{ isSavingMail ? 'Saving...' : 'Save Settings' }}
                </button>
                <button 
                  type="button" 
                  class="btn btn-secondary btn-reset"
                  @click="resetMailForm"
                >
                  <i class="i-Refresh me-2"></i>
                  Reset
                </button>
              </div>

            </b-form>
          </validation-observer>
        </div>

        <!-- Unified Billing Section (for both Super Admin and Regular Users) -->
        <div v-show="selectedSectionId === 'billing'" class="content-card">
          <div class="content-header">
            <h2>Billing</h2>
            <p class="content-description">
              <span v-if="isSuperAdmin">View and manage invoices from all your subscribers (gym owners).</span>
              <span v-else>View and manage your gym subscription invoices.</span>
            </p>
          </div>

          <!-- Loading State -->
          <div v-if="gymInvoicesLoading" class="loading_page spinner spinner-primary mr-3">
            <p>Loading invoices...</p>
          </div>

          <div v-else>
            <!-- Summary Cards -->
            <div class="row mb-4" v-if="gymInvoicesSummary">
              <div class="col-md-3">
                <div class="summary-card">
                  <div class="d-flex flex-column flex-md-row align-items-center justify-content-between">
                    <div class="summary-label mb-1 mb-md-0 me-md-2">Total Invoices</div>
                    <div class="summary-value">{{ gymInvoicesSummary.total_invoices }}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="summary-card">
                  <div class="summary-label">Total Amount</div>
                  <div class="summary-value">${{ formatCurrency(gymInvoicesSummary.total_amount) }}</div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="summary-card">
                  <div class="summary-label">Pending Amounts</div>
                  <div class="summary-value text-warning">${{ formatCurrency(gymInvoicesSummary.pending_amount) }}</div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="summary-card">
                  <div class="summary-label">Paid Amounts</div>
                  <div class="summary-value text-success">${{ formatCurrency(gymInvoicesSummary.paid_amount) }}</div>
                </div>
              </div>
            </div>

            <!-- Invoices Table -->
            <div v-if="gymInvoicesData && gymInvoicesData.length > 0" class="invoices-table-wrapper">
              <table class="invoices-table">
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Paid Date</th>
                    <th class="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="invoice in gymInvoicesData" :key="invoice.id">
                    <td class="invoice-number-cell">
                      <span class="invoice-number">{{ invoice.invoice_number }}</span>
                    </td>
                    <td>{{ formatDate(invoice.created_at) }}</td>
                    <td class="amount-cell">${{ formatCurrency(invoice.amount) }}</td>
                    <td>
                      <span :class="['status-badge', getStatusBadgeClass(invoice.status)]">
                        {{ invoice.status }}
                      </span>
                    </td>
                    <td>{{ formatDate(invoice.due_date) }}</td>
                    <td>{{ invoice.paid_date ? formatDate(invoice.paid_date) : '-' }}</td>
                    <td class="actions-cell">
                      <button 
                        v-if="invoice.status === 'pending'"
                        class="pay-button"
                        @click="openPaymentPanel(invoice)"
                        :disabled="paymentProcessing"
                      >
                        Pay Now
                      </button>
                      <span v-else class="text-muted">-</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- No Invoices Message -->
            <div v-else class="alert alert-info mt-4">
              <i class="fas fa-info-circle me-2"></i>
              No invoices found. Your subscription invoices will appear here once generated.
            </div>
          </div>
        </div>

        <!-- Payment Panel (Right Side) -->
        <div 
          v-if="showPaymentPanel"
          class="payment-panel payment-panel-open"
        >
          <div class="payment-panel-overlay" @click="closePaymentPanel"></div>
          <div class="payment-panel-content">
            <div class="payment-panel-header">
              <h3>Pay Invoice</h3>
              <button class="btn btn-sm btn-link text-dark" @click="closePaymentPanel">
                <i class="fas fa-times"></i>
              </button>
            </div>
            
            <div class="payment-panel-body" v-if="selectedInvoice">
              <!-- Invoice Summary Card -->
              <div class="invoice-card">
                <div class="invoice-amount">
                  <span class="amount-label">Amount Due</span>
                  <span class="amount-value">${{ formatCurrency(selectedInvoice.amount) }}</span>
                </div>
                <div class="invoice-details">
                  <div class="detail-item">
                    <span class="detail-label">Invoice #</span>
                    <span class="detail-value">{{ selectedInvoice.invoice_number }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Due Date</span>
                    <span class="detail-value">{{ formatDate(selectedInvoice.due_date) }}</span>
                  </div>
                  <div class="detail-item" v-if="selectedInvoice.description">
                    <span class="detail-label">Description</span>
                    <span class="detail-value">{{ selectedInvoice.description }}</span>
                  </div>
                </div>
              </div>

              <!-- Payment Form -->
              <div v-if="!paymentSuccess" class="payment-form">
                <div v-if="paymentError" class="payment-error">
                  <i class="fas fa-exclamation-circle"></i>
                  {{ paymentError }}
                </div>

                <div class="card-input-section">
                  <label class="card-label">Card Information</label>
                  <div id="stripe-card-element"></div>
                  <div id="stripe-card-errors" role="alert"></div>
                </div>

                <button 
                  class="pay-button"
                  @click="processPayment"
                  :disabled="paymentProcessing || !stripeReady"
                >
                  <span v-if="paymentProcessing" class="button-content">
                    <span class="spinner"></span>
                    Processing Payment...
                  </span>
                  <span v-else class="button-content">
                    <i class="fas fa-lock"></i>
                    Pay ${{ formatCurrency(selectedInvoice.amount) }}
                  </span>
                </button>
              </div>

              <!-- Success State -->
              <div v-if="paymentSuccess" class="payment-success">
                <div class="success-icon">
                  <i class="fas fa-check-circle"></i>
                </div>
                <h4>Payment Successful!</h4>
                <p>Your invoice has been paid successfully. Thank you for your payment!</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Gyms List Section (Super Admin only) -->
        <div v-show="selectedSectionId === 'gyms'" class="content-card">
          <div class="content-header">
            <h2>Gyms</h2>
            <p class="content-description">
              All gyms you have created. Each gym has an owner and can have multiple users.
            </p>
          </div>
          <div v-if="gymsLoading" class="loading_page spinner spinner-primary mr-3">
            <p>Loading gyms...</p>
          </div>
          <div v-else>
            <div v-if="gymsList && gymsList.length > 0" class="invoices-table-wrapper">
              <table class="invoices-table">
                <thead>
                  <tr>
                    <th>Gym name</th>
                    <th>Contact email</th>
                    <th>Subscription status</th>
                    <th>Users</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="gym in gymsList" :key="gym.id">
                    <td class="invoice-number-cell">{{ gym.gym_name }}</td>
                    <td>{{ gym.contact_email }}</td>
                    <td>
                      <span :class="['status-badge', getStatusBadgeClass(gym.subscription_status || 'active')]">
                        {{ gym.subscription_status || 'active' }}
                      </span>
                    </td>
                    <td>{{ (gym.users && gym.users.length) || 0 }}</td>
                    <td>{{ formatDate(gym.created_at) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="alert alert-info mt-4">
              <i class="fas fa-info-circle me-2"></i>
              No gyms yet. Use <strong>Add Gym</strong> to create your first gym.
            </div>
          </div>
        </div>

        <!-- Add Gym Section (Super Admin only) -->
        <div v-show="selectedSectionId === 'add-gym'" class="content-card">
          <div class="content-header">
            <h2>Add Gym</h2>
            <p class="content-description">
              Create a new gym and send CRM access to the gym owner. They will receive an email with a link to set their password; after that they can log in and complete onboarding.
            </p>
          </div>
          <div v-if="addGymLoading" class="loading_page spinner spinner-primary mr-3"></div>
          <validation-observer v-else ref="form_add_gym">
            <form @submit.prevent="submitAddGym">
              <div class="form-fields">
                <div class="form-field">
                  <label class="field-label">Subscription plan <span class="required">*</span></label>
                  <select
                    v-model="addGymForm.plan_id"
                    class="field-input field-select"
                    required
                  >
                    <option value="" disabled>Select a plan</option>
                    <option
                      v-for="plan in gymPlansList"
                      :key="plan.id"
                      :value="plan.id"
                    >
                      {{ plan.name }} — ${{ formatCurrency(plan.price) }} / {{ plan.interval }}
                    </option>
                  </select>
                </div>
                <div class="form-field">
                  <label class="field-label">Gym name <span class="required">*</span></label>
                  <validation-provider name="Gym name" rules="required" v-slot="validationContext">
                    <input
                      type="text"
                      :class="['field-input', { 'is-invalid': validationContext.errors.length > 0 }]"
                      v-model="addGymForm.gym_name"
                      placeholder="Enter gym name"
                    />
                    <div v-if="validationContext.errors.length > 0" class="invalid-feedback">
                      {{ validationContext.errors[0] }}
                    </div>
                  </validation-provider>
                </div>
                <div class="form-field">
                  <label class="field-label">Contact email <span class="required">*</span></label>
                  <validation-provider name="Contact email" rules="required|email" v-slot="validationContext">
                    <input
                      type="email"
                      :class="['field-input', { 'is-invalid': validationContext.errors.length > 0 }]"
                      v-model="addGymForm.contact_email"
                      placeholder="gym@example.com"
                    />
                    <div v-if="validationContext.errors.length > 0" class="invalid-feedback">
                      {{ validationContext.errors[0] }}
                    </div>
                  </validation-provider>
                </div>
                <div class="form-field">
                  <label class="field-label">Owner name <span class="required">*</span></label>
                  <validation-provider name="Owner name" rules="required" v-slot="validationContext">
                    <input
                      type="text"
                      :class="['field-input', { 'is-invalid': validationContext.errors.length > 0 }]"
                      v-model="addGymForm.owner_name"
                      placeholder="Enter gym owner full name"
                    />
                    <div v-if="validationContext.errors.length > 0" class="invalid-feedback">
                      {{ validationContext.errors[0] }}
                    </div>
                  </validation-provider>
                </div>
                <div class="form-field">
                  <label class="field-label">Owner email <span class="required">*</span></label>
                  <validation-provider name="Owner email" rules="required|email" v-slot="validationContext">
                    <input
                      type="email"
                      :class="['field-input', { 'is-invalid': validationContext.errors.length > 0 }]"
                      v-model="addGymForm.owner_email"
                      placeholder="owner@example.com"
                    />
                    <div v-if="validationContext.errors.length > 0" class="invalid-feedback">
                      {{ validationContext.errors[0] }}
                    </div>
                  </validation-provider>
                </div>
                <div class="form-field">
                  <label class="field-label">Owner phone</label>
                  <input
                    type="text"
                    class="field-input"
                    v-model="addGymForm.owner_phone"
                    placeholder="Optional phone number"
                  />
                </div>
              </div>
              <div class="form-actions mt-4">
                <button type="submit" class="btn btn-primary" :disabled="addGymSubmitting">
                  <span v-if="addGymSubmitting" class="spinner-border spinner-border-sm mr-2" role="status"></span>
                  Add Gym &amp; Send Invitation
                </button>
              </div>
            </form>
          </validation-observer>
        </div>

        <!-- Placeholder for other sections -->
        <div v-show="selectedSectionId !== 'business-info' && selectedSectionId !== 'opening-hours' && selectedSectionId !== 'facilities' && selectedSectionId !== 'contracts' && selectedSectionId !== 'member-settings' && selectedSectionId !== 'financial-info' && selectedSectionId !== 'payment-methods' && selectedSectionId !== 'memberships' && selectedSectionId !== 'module-settings' && selectedSectionId !== 'coach-finder' && selectedSectionId !== 'email-templates' && selectedSectionId !== 'mail-settings' && selectedSectionId !== 'subscription-management' && selectedSectionId !== 'billing' && selectedSectionId !== 'gyms' && selectedSectionId !== 'add-gym'" class="content-card">
          <div class="content-header">
            <h2>{{ activeSectionLabel }}</h2>
            <p class="content-description">Content coming soon...</p>
              </div>
            </div>
          </section>
    </div>

    <!-- Video Tutorial Modal -->
    <b-modal
      v-model="showVideoTutorialModal"
      title="System Settings Tutorial"
      size="lg"
      centered
      hide-footer
      class="video-tutorial-modal"
      @hide="closeVideoTutorialModal"
    >
      <div class="video-container">
        <div v-if="videoError" class="text-center py-4">
          <i class="fas fa-exclamation-triangle text-warning" style="font-size: 2rem"></i>
          <p class="mt-2">{{ videoError }}</p>
        </div>
        <div v-else class="position-relative">
          <div v-if="isVideoLoading" class="video-loading-overlay">
            <div class="text-center py-4">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <p class="mt-2">Loading video...</p>
            </div>
          </div>
          <video
            :src="videoTutorialUrl"
            controls
            class="w-100 rounded"
            style="max-height: 500px"
            @loadstart="onVideoLoadStart"
            @canplay="onVideoCanPlay"
            @error="handleVideoError"
            @loadeddata="onVideoLoaded"
            @loadedmetadata="onVideoLoaded"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NProgress from "nprogress";
import OpeningHours from "./Opening_Hours.vue";
import Facilities from "./Facilities.vue";
import Terms from "./terms.vue";
import { VueEditor } from "vue2-editor";

export default {
  metaInfo: {
    title: "System Settings"
  },
  components: {
    OpeningHours,
    Facilities,
    Terms,
    VueEditor
  },
  data() {
    return {
      isLoading: true,
      data: new FormData(),
      settings: [],
      currencies: [],
      members: [],
      coaches: [],
      // Video Tutorial Modal
      showVideoTutorialModal: false,
      isVideoLoading: false,
      videoError: null,
      videoTutorialUrl: '/tutorial_videos/system_settings.mp4',
      // navigation state
      sideNav: [
        {
          key: 'business',
          title: 'My Business',
          items: [
            { id: 'business-info', label: 'Business Info' },
            { id: 'opening-hours', label: 'Opening Hours' },
            { id: 'facilities', label: 'Facilities' },
            { id: 'contracts', label: 'Contracts agreements and conditions' },
          ],
        },
        {
          key: 'essentials',
          title: 'Essentials',
          items: [
            { id: 'member-settings', label: 'Member Settings' },
          ],
        },
        {
          key: 'manage',
          title: 'Manage',
          items: [
            { id: 'financial-info', label: 'Financial Info' },
            { id: 'payment-methods', label: 'Payment Methods' },
            { id: 'memberships', label: 'Memberships' },
            { id: 'subscription-management', label: 'Subscription Management' },
            { id: 'billing', label: 'Billing' },
          ],
        },
        {
          key: 'coach',
          title: 'Coach',
          items: [
            { id: 'module-settings', label: 'Module Settings' },
          ],
        },
        {
          key: 'engage',
          title: 'Engage',
          items: [
            { id: 'email-templates', label: 'Email Templates' },
            { id: 'mail-settings', label: 'Mail Settings' },
          ],
        },
        {
          key: 'super-admin',
          title: 'Super Admin',
          items: [
            { id: 'add-gym', label: 'Add Gym' },
            { id: 'billing', label: 'Billing' },
            { id: 'gyms', label: 'Gyms' },
          ],
        },
      ],
      selectedSectionId: 'business-info',
      selectedTopTabId: '',
      showAdvanced: false,
      // Map properties
      map: null,
      marker: null,
      mapType: 'roadmap',
      isFullscreen: false,
      addressAutocomplete: null,
      clientSettings: {
        clients_can_edit_info: false,
        change_requests_email: 'tharstrengthfitness@gmail.com',
        show_payment_methods: true,
        show_invoices: true,
        show_credits: true,
        show_memberships: true,
        clients_can_end_contract: false,
        clients_can_pause_contract: false,
        min_pause_days: 0,
        max_pause_days: 0,
        allowed_pauses: 1,
        pause_period_value: 1,
        pause_period_unit: 'months',
        show_bought_products: true,
        show_bookings: true,
        show_member_last_visits: true,
        show_mandate_id: true,
        service_history_visibility: 'all',
        show_additional_gender_options: true,
        visible_name: 'full',
        allow_posts_follows: 'anyone',
        fitprofile_visibility: 'anyone',
        progress_pictures_visibility: 'network',
        nutrition_visibility: 'network',
        progress_graphs_visibility: 'anyone',
        followers_visibility: 'anyone',
        exercises_visibility: 'everybody',
        leaderboard_visibility: 'everyone',
        enable_advanced_security: true,
        default_date_format: 'MM/DD/YYYY',
        default_time_format: '12h',
        update_email_frequency: 'weekly',
        progress_email_frequency: 'weekly',
      },
      portalDesign: {
        company_color: '#161413',
        menu_logo: '',
        menu_logo_preview: '',
        menu_logo_file: null,
        print_logo: '',
        print_logo_preview: '',
        print_logo_file: null,
        background_login: '',
        background_login_preview: '',
        background_login_file: null,
      },
      mobileAppDesign: {
        header_color_1: '#fe0019',
        header_color_2: '#fe0019',
        accent_color: '#020d18',
        app_logo: '',
        app_logo_preview: '',
        app_logo_file: null,
      },
      mobileAppActiveTab: 'design',
      scheduleActiveTab: 'schedules',
      scheduleList: [
        { id: 1, name: 'GROUP TRAINING' },
        { id: 2, name: 'Private Gym' },
        { id: 3, name: 'Recovery Center Services' },
      ],
      financialInfo: {
        bank_account_holder: 'Thorstrengthfitness',
        bank_account_number: '7983431748',
        bic_swift_code: 'FTBUS3CXXX',
        default_sales_tax: 'default',
        income_categories: ['Personal training', 'Memberships', 'Other', 'Retail', 'Group training'],
        vat_percentage_manual: false,
        show_employee_name: false,
        append_club_id: false,
        show_date_on_entry: false,
        invoice_text: 'Default Invoice text',
        extra_field_staff: '',
        extra_field_clients_1: '',
        extra_field_clients_2: '',
        cc_email: '',
        manual_invoices_merge: 'none',
        pos_invoices_merge: 'none',
        membership_invoices_merge: 'none',
      },
      paymentGateway: {
        active_payment_gateway: 'none',
        stripe_key: '',
        stripe_secret: '',
        paysafecard_account_number: '',
        paysafecard_api_key: '',
        paysafecard_environment: 'TEST',
      },
      paymentGatewayLoading: false,
      emailTemplatesLoading: false,
      emailTemplatesSubmitProcessing: false,
      membershipFormProcessing: false,
      newMembershipForm: {
        // Basic Info
        name: '',
        description: '',
        webshop_image: '',
        group: '',
        terms_conditions: 'general',
        start_date_type: 'any',
        start_date_from: '',
        start_date_to: '',
        status_type: 'active',
        status_from: '',
        status_to: '',
        // Scope
        access_times: 'no_restriction',
        duration_value: 1,
        duration_unit: 'months',
        auto_renewed: false,
        // Price
        price: '',
        currency: 'USD',
        sales_tax: 'default',
        interval: 'monthly',
        recurring_billing: 'from_start',
        income_category: '',
        default_payment_method: 'cash',
        invoice_before_value: 1,
        invoice_before_unit: 'weeks',
        one_time_payment: false,
        registration_fee: '',
        // Credits
        credit_distribution: 'from_assign_date',
        // Digital Services
        enable_pro: false,
        early_booking_access: false,
        // Legacy fields
        stripe_price_id: '',
        features: [''],
        is_active: true,
        sort_order: 0
      },
      editMembershipForm: {
        id: null,
        // Basic Info
        name: '',
        description: '',
        webshop_image: '',
        group: '',
        terms_conditions: 'general',
        start_date_type: 'any',
        start_date_from: '',
        start_date_to: '',
        status_type: 'active',
        status_from: '',
        status_to: '',
        // Scope
        access_times: 'no_restriction',
        duration_value: 1,
        duration_unit: 'months',
        auto_renewed: false,
        // Price
        price: '',
        currency: 'USD',
        sales_tax: 'default',
        interval: 'monthly',
        recurring_billing: 'from_start',
        income_category: '',
        default_payment_method: 'cash',
        invoice_before_value: 1,
        invoice_before_unit: 'weeks',
        one_time_payment: false,
        registration_fee: '',
        // Credits
        credit_distribution: 'from_assign_date',
        // Digital Services
        enable_pro: false,
        early_booking_access: false,
        // Legacy fields
        stripe_price_id: '',
        features: [''],
        is_active: true,
        sort_order: 0
      },
      availableServices: [
        { id: 1, name: 'Compensation sleeves', enabled: false, amount: 0, frequency_value: 1, frequency_unit: 'months', validity_value: 1, validity_unit: 'months', extra_of_start: false },
        { id: 2, name: 'Cryo-therapy', enabled: false, amount: 0, frequency_value: 1, frequency_unit: 'months', validity_value: 1, validity_unit: 'months', extra_of_start: false },
        { id: 3, name: 'Group Classes', enabled: false, amount: 0, frequency_value: 1, frequency_unit: 'months', validity_value: 1, validity_unit: 'months', extra_of_start: false },
        { id: 4, name: 'Infrared Sauna', enabled: false, amount: 0, frequency_value: 1, frequency_unit: 'months', validity_value: 1, validity_unit: 'months', extra_of_start: false },
        { id: 5, name: 'Personal training 1 hour', enabled: false, amount: 0, frequency_value: 1, frequency_unit: 'months', validity_value: 1, validity_unit: 'months', extra_of_start: false },
        { id: 6, name: 'Personal training 30 mins', enabled: false, amount: 0, frequency_value: 1, frequency_unit: 'months', validity_value: 1, validity_unit: 'months', extra_of_start: false }
      ],
      emailTemplatesData: {
        membership: {
          subject: 'Welcome to {gym_name} - Your Membership Confirmation',
          body: `<h2>Welcome to {gym_name}!</h2><p>Dear {member_name},</p><p>Thank you for joining {gym_name}! We're excited to have you as part of our fitness community.</p><h3>Membership Details:</h3><ul><li><strong>Membership Type:</strong> {membership_type}</li><li><strong>Start Date:</strong> {start_date}</li><li><strong>End Date:</strong> {end_date}</li><li><strong>Membership Fee:</strong> {membership_fee}</li><li><strong>Payment Status:</strong> {payment_status}</li></ul><p>We look forward to helping you achieve your fitness goals!</p><p>Best regards,<br>The {gym_name} Team</p>`,
        },
        class_booking: {
          subject: 'Class Booking Confirmation - {class_name}',
          body: `<h2>Class Booking Confirmed!</h2><p>Dear {member_name},</p><p>Your class booking has been successfully confirmed. We can't wait to see you!</p><h3>Class Details:</h3><ul><li><strong>Class:</strong> {class_name}</li><li><strong>Date:</strong> {class_date}</li><li><strong>Time:</strong> {class_time}</li><li><strong>Trainer:</strong> {trainer_name}</li><li><strong>Location:</strong> {class_location}</li></ul><p>See you there!</p><p>Best regards,<br>The {gym_name} Team</p>`,
        },
        payment_received: {
          subject: 'Payment Received - {gym_name}',
          body: `<h2>Payment Confirmation</h2><p>Dear {member_name},</p><p>Thank you! We have successfully received your payment.</p><h3>Payment Details:</h3><ul><li><strong>Payment Number:</strong> {payment_number}</li><li><strong>Amount Paid:</strong> {paid_amount}</li><li><strong>Payment Method:</strong> {payment_method}</li><li><strong>Payment Date:</strong> {payment_date}</li></ul><p>Best regards,<br>The {gym_name} Team</p>`,
        },
        workout_plan: {
          subject: 'Your Personalized Workout Plan - {gym_name}',
          body: `<h2>Your Workout Plan is Ready!</h2><p>Dear {member_name},</p><p>Great news! Your personalized workout plan has been created by {trainer_name} and is ready for you.</p><h3>Plan Details:</h3><ul><li><strong>Plan Name:</strong> {plan_name}</li><li><strong>Duration:</strong> {plan_duration}</li><li><strong>Next Session:</strong> {next_session_date}</li></ul><p>Best regards,<br>{trainer_name} and the {gym_name} Team</p>`,
        },
        password_setup: {
          subject: 'Welcome! Set Up Your Gym App Password',
          body: `<h2>Welcome to {gym_name}!</h2><p>Hello {member_name},</p><p>Your account has been successfully created! To access the mobile app and start your fitness journey, you need to set up your password.</p><p><a href="{setup_url}">Set Up Your Password</a></p><p>Best regards,<br><strong>The {gym_name} Team</strong></p>`,
        },
        staff_schedule: {
          subject: 'Your Schedule Update - {gym_name}',
          body: `<h2>Schedule Update</h2><p>Dear {coach_name},</p><p>Your work schedule has been updated. Please review the details below.</p><h3>Schedule Details:</h3><ul><li><strong>Date:</strong> {schedule_date}</li><li><strong>Shift Time:</strong> {shift_time}</li><li><strong>Assigned Classes:</strong> {assigned_classes}</li><li><strong>Location:</strong> {location}</li></ul><p>Best regards,<br>The {gym_name} Management Team</p>`,
        },
        payment_sent: {
          subject: 'Payment Sent - {gym_name}',
          body: `<h2>Payment Confirmation</h2><p>Dear {coach_name},</p><p>Your payment has been processed and sent successfully.</p><h3>Payment Details:</h3><ul><li><strong>Payment Number:</strong> {payment_number}</li><li><strong>Amount Paid:</strong> {paid_amount}</li><li><strong>Payment Method:</strong> {payment_method}</li><li><strong>Payment Date:</strong> {payment_date}</li></ul><p>Best regards,<br>The {gym_name} HR Team</p>`,
        },
        appointment_created: {
          subject: 'Appointment Scheduled - {gym_name}',
          body: `<h2>Appointment Confirmed!</h2><p>Dear {member_name},</p><p>Your appointment has been successfully scheduled. We look forward to seeing you!</p><h3>Appointment Details:</h3><ul><li><strong>Trainer:</strong> {trainer_name}</li><li><strong>Date:</strong> {appointment_date}</li><li><strong>Time:</strong> {appointment_time}</li><li><strong>Duration:</strong> {appointment_duration}</li></ul><p><strong>Important Reminders:</strong></p><ul><li>Please arrive 10 minutes before your appointment</li><li>Bring water and appropriate workout attire</li><li>If you need to reschedule or cancel, please contact us at least 24 hours in advance</li></ul><p>We're excited to help you achieve your fitness goals!</p><p>Best regards,<br>{trainer_name} and the {gym_name} Team</p>`,
        },
        appointment_updated: {
          subject: 'Appointment Rescheduled - {gym_name}',
          body: `<h2>Appointment Rescheduled</h2><p>Dear {member_name},</p><p>Your appointment has been rescheduled. Please note the new details below.</p><h3>Updated Appointment Details:</h3><ul><li><strong>Trainer:</strong> {trainer_name}</li><li><strong>New Date:</strong> {appointment_date}</li><li><strong>New Time:</strong> {appointment_time}</li><li><strong>Duration:</strong> {appointment_duration}</li></ul><p>If you have any questions or need to make further changes, please don't hesitate to contact us.</p><p>Best regards,<br>{trainer_name} and the {gym_name} Team</p>`,
        },
        appointment_cancelled: {
          subject: 'Appointment Cancelled - {gym_name}',
          body: `<h2>Appointment Cancellation Notice</h2><p>Dear {member_name},</p><p>This email confirms that your appointment has been cancelled.</p><h3>Cancelled Appointment Details:</h3><ul><li><strong>Trainer:</strong> {trainer_name}</li><li><strong>Date:</strong> {appointment_date}</li><li><strong>Time:</strong> {appointment_time}</li></ul><p>If you would like to schedule a new appointment, please contact us at your earliest convenience. We're here to help you stay on track with your fitness journey.</p><p>Best regards,<br>The {gym_name} Team</p>`,
        },
        schedule_assigned: {
          subject: 'Schedule Assignment - {gym_name}',
          body: `<h2>You've Been Assigned to a Schedule!</h2><p>Dear {member_name},</p><p>You have been assigned to a new schedule event. Please review the details below.</p><h3>Schedule Details:</h3><ul><li><strong>Event:</strong> {event_title}</li><li><strong>Date:</strong> {event_date}</li><li><strong>Time:</strong> {event_time}</li><li><strong>Coach:</strong> {coach_name}</li></ul><p><strong>Important Reminders:</strong></p><ul><li>Please arrive on time for your scheduled event</li><li>Bring any necessary equipment or materials</li><li>If you have any questions, please contact your coach or the front desk</li></ul><p>We look forward to seeing you there!</p><p>Best regards,<br>The {gym_name} Team</p>`,
        },
        workout_assigned: {
          subject: 'New Workout Assigned - {gym_name}',
          body: `<h2>New Workout Assigned</h2><p>Dear {member_name},</p><p>You have been assigned a new workout: <strong>{workout_name}</strong>.</p><p>This workout has been created specifically for your goals. Please review it in your account before your next session.</p><p>If you have any questions about the exercises or how to perform them safely, please contact your trainer.</p><p>Best regards,<br>The {gym_name} Team</p>`,
        },
        nutrition_assigned: {
          subject: 'New Nutrition Plan Assigned - {gym_name}',
          body: `<h2>New Nutrition Plan Assigned</h2><p>Dear {member_name},</p><p>You have been assigned a new nutrition plan: <strong>{plan_name}</strong>.</p><p>This plan has been tailored to support your training and health goals. Please review the details carefully and follow the guidelines provided.</p><p>If you have any allergies, dietary restrictions, or questions, please contact your coach or nutritionist before making changes.</p><p>Best regards,<br>The {gym_name} Team</p>`,
        },
      },
      emailTemplatesToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        [{ header: [1, 2, 3, false] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
      ],
      paymentMethods: {
        region: 'northern-america',
        methods: [
          {
            id: 1,
            name: 'Bank transfer',
            enabled: true,
            hasProvider: true,
            provider: 'offline',
            providers: [
              { value: 'offline', label: 'Offline' },
              { value: 'stripe', label: 'Stripe' },
            ]
          },
          {
            id: 2,
            name: 'Cash',
            enabled: true,
            hasProvider: false,
            provider: null,
            providers: []
          },
          {
            id: 3,
            name: 'Check',
            enabled: true,
            hasProvider: false,
            provider: null,
            providers: []
          },
          {
            id: 4,
            name: 'Card Terminal',
            enabled: true,
            hasProvider: true,
            provider: 'external',
            providers: [
              { value: 'external', label: 'External third party' },
              { value: 'stripe', label: 'Stripe' },
            ]
          },
          {
            id: 5,
            name: 'Credit card',
            enabled: true,
            hasProvider: true,
            provider: 'paysafe',
            providers: [
              { value: 'paysafe', label: 'Paysafe' },
              { value: 'stripe', label: 'Stripe' },
              { value: 'paypal', label: 'PayPal' },
            ]
          },
          {
            id: 6,
            name: 'PayPal',
            enabled: false,
            hasProvider: false,
            provider: null,
            providers: []
          },
        ],
        paypal_status: 'inactive',
        paysafe_status: 'active',
        automated_payments_enabled: true,
        automated_payments_frequency: 'Daily',
      },
      creditsList: [
        {
          id: 1,
          name: 'Compression sleeves',
          minimum_credits: 1,
          deduct_period: '1 days before the event starts'
        },
        {
          id: 2,
          name: 'Cryo-therapy',
          minimum_credits: 1,
          deduct_period: '1 days before the event starts'
        },
        {
          id: 3,
          name: 'Group Classes',
          minimum_credits: 1,
          deduct_period: '1 days before the event starts'
        },
        {
          id: 4,
          name: 'Infa red Sauna',
          minimum_credits: 1,
          deduct_period: '1 days before the event starts'
        },
        {
          id: 5,
          name: 'Personal Training 1 hour',
          minimum_credits: 0,
          deduct_period: 'Immediately'
        },
        {
          id: 6,
          name: 'Personal Training 30 mins',
          minimum_credits: 0,
          deduct_period: 'Immediately'
        },
      ],
      creditsSettings: {
        failed_transaction_email: 'thorstrengthfitness@gmail.com',
      },
      membershipActiveTab: 'memberships',
      membershipStatusFilter: 'active',
      membershipGroups: [],
      membershipCategories: [
        {
          id: 1,
          name: 'Default memberships',
          memberships: [
            {
              id: 1,
              name: 'Advanced Functional Nutrition',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: 'n/a',
              status: 'active'
            }
          ]
        },
        {
          id: 2,
          name: 'Compression Therapy',
          memberships: [
            {
              id: 2,
              name: '4 Compression Sessions',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: 'n/a',
              status: 'active'
            },
            {
              id: 3,
              name: '8 Compression Sessions',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: 'n/a',
              status: 'active'
            },
            {
              id: 4,
              name: 'Unlimited Compression Sessions',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: 'n/a',
              status: 'active'
            }
          ]
        },
        {
          id: 3,
          name: 'Cryo',
          memberships: [
            {
              id: 5,
              name: '10 Cryotherapy Sessions',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: 'n/a',
              status: 'active'
            },
            {
              id: 6,
              name: '4 Cryotherapy Sessions',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: 'n/a',
              status: 'active'
            },
            {
              id: 7,
              name: '8 Cryotherapy Sessions',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: 'n/a',
              status: 'active'
            }
          ]
        },
        {
          id: 4,
          name: 'Group Training Services',
          memberships: [
            {
              id: 8,
              name: 'Group Training (1x)',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: '17/18',
              status: 'active'
            },
            {
              id: 9,
              name: 'Group Training (4)',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: '7/14',
              status: 'active'
            },
            {
              id: 10,
              name: 'Small Group Training (x)',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: '11/16',
              status: 'active'
            },
            {
              id: 11,
              name: 'Unlimited Discounted Small Group Classes',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: '8/10',
              status: 'active'
            },
            {
              id: 12,
              name: 'Unlimited Small Group Training',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: '4/12',
              status: 'active'
            }
          ]
        },
        {
          id: 5,
          name: 'Gym Services',
          memberships: [
            {
              id: 13,
              name: '10x Open Gym Membership',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: '2/12',
              status: 'active'
            },
            {
              id: 14,
              name: '50x Open Gym Membership',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: '8/13',
              status: 'active'
            },
            {
              id: 15,
              name: 'Gym membership',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: '8/10',
              status: 'active'
            },
            {
              id: 16,
              name: 'Gym membership',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: '8/10',
              status: 'active'
            }
          ]
        },
        {
          id: 6,
          name: 'Inbody Scan Services',
          memberships: [
            {
              id: 17,
              name: '2 Inbody Scans',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: 'n/a',
              status: 'active'
            }
          ]
        },
        {
          id: 7,
          name: 'Infrared Sauna',
          memberships: [
            {
              id: 18,
              name: '4 Sauna Sessions',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: 'n/a',
              status: 'active'
            },
            {
              id: 19,
              name: '8 Sauna Sessions',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: 'n/a',
              status: 'active'
            },
            {
              id: 20,
              name: 'Unlimited Sauna Sessions',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: 'n/a',
              status: 'active'
            }
          ]
        },
        {
          id: 8,
          name: 'Nutrition Services',
          memberships: [
            {
              id: 21,
              name: 'Functional Nutrition',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: '7/10',
              status: 'active'
            },
            {
              id: 22,
              name: 'General Nutrition',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: 'n/a',
              status: 'active'
            }
          ]
        },
        {
          id: 9,
          name: 'Online Services',
          memberships: [
            {
              id: 23,
              name: 'Online Coaching',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: '2/17',
              status: 'active'
            },
            {
              id: 24,
              name: 'Student Online Workouts',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: 'n/a',
              status: 'active'
            },
            {
              id: 25,
              name: 'Workouts',
              price: '$100.00 monthly',
              prolongation_price: '$100.00',
              active: '1/11',
              status: 'active'
            }
          ]
        }
      ],
      webshopActiveTab: 'webshop',
      webshopSettings: {
        shop_name: 'Thorfit',
        description: 'OUR ONLINE WEB-SHOP PROVIDES A LIST OF PRODUCTS AND SERVICES THAT WE PROVIDE! THE ONLINE WEB-SHOP ALLOWS US TO REACH OUT GLOBALLY AIMING TO HELP INDIVIDUALS REACH THEIR FULL HEALTH AND WELLNESS GOALS',
        terms_conditions: '',
        shop_email: 'THORSTRENGTHFITNESSNEEDS@GMAIL.COM',
        shop_emails: ['THORSTRENGTHFITNESSNEEDS@GMAIL.COM'],
        shop_main_link: 'https://thorstrengthfitness.virtuagym.com/webshop/?',
        shop_inhouse_link: 'https://thorstrengthfitness.virtuagym.com/webshop/?',
        embed_code: '<iframe width="1200" height="700" src="https://thorstrengthfitness.virtuagym.com/webshop/?"',
        ask_bank_account: true,
        members_agree_terms: true,
        enable_custom_optin: false,
        optin_call: false,
        optin_email_offers: false,
        optin_post: false,
        optin_newsletter: false,
      },
      moduleSettingsActiveTab: 'settings',
      moduleSettings: {
        all_coaches_coach_all_members: false,
        coaches_can_use_max_ai: true,
        coaches_can_see_club_visitors: false,
        groups_visibility: 'club',
        challenges_visibility: 'club',
        auto_make_new_members_pro: false,
        auto_invite_new_members: true,
        add_calories_burned_to_nutrition: true,
        members_can_create_workout_plans: true,
        workout_plans_visibility: 'all',
      },
      coachList: [
        {
          id: 1,
          name: 'Khendal Capers',
          profile_image: '/images/avatar/khendal.jpg',
          status: 'Declined',
          last_updated: '03/18/2023',
          has_profile: true,
          visible: false
        },
        {
          id: 2,
          name: 'Charles Thornton',
          profile_image: null,
          status: 'No profile',
          last_updated: null,
          has_profile: false,
          visible: false
        },
        {
          id: 3,
          name: 'Gena Poe',
          profile_image: null,
          status: 'No profile',
          last_updated: null,
          has_profile: false,
          visible: false
        },
        {
          id: 4,
          name: 'Kat Reese',
          profile_image: null,
          status: 'No profile',
          last_updated: null,
          has_profile: false,
          visible: false
        }
      ],
      emailTemplates: {
        activation: [
          { id: 1, name: 'Coach Invitation', hasToggle: false, enabled: false },
          { id: 2, name: 'Member Invitation', hasToggle: false, enabled: false },
          { id: 3, name: 'Mandatory Intake Questionnaire', hasToggle: true, enabled: true },
          { id: 4, name: 'Pro membership activation', hasToggle: false, enabled: false }
        ],
        scheduling: [
          { id: 5, name: 'Member cancels booking', hasToggle: false, enabled: false },
          { id: 6, name: 'Coach cancels member booking', hasToggle: false, enabled: false },
          { id: 7, name: 'Activity cancellation', hasToggle: false, enabled: false },
          { id: 8, name: 'Activity updated', hasToggle: false, enabled: false },
          { id: 9, name: 'Class booking confirmation', hasToggle: false, enabled: false },
          { id: 10, name: 'Available spot for member on waiting list', hasToggle: false, enabled: false }
        ],
        financial: [
          { id: 11, name: 'Cancel/Stop Contract', hasToggle: false, enabled: false },
          { id: 12, name: 'Sending Invoice to member', hasToggle: false, enabled: false },
          { id: 13, name: 'Pause contract', hasToggle: false, enabled: false },
          { id: 14, name: 'Contract pause end', hasToggle: false, enabled: false },
          { id: 15, name: 'Invoice reminder', hasToggle: false, enabled: false },
          { id: 16, name: 'Online payment', hasToggle: false, enabled: false },
          { id: 17, name: 'Request to e-sign the contract', hasToggle: false, enabled: false },
          { id: 18, name: 'E-sign confirmation for the contract', hasToggle: false, enabled: false }
        ],
        coaching: [
          { id: 19, name: 'Weekly update', hasToggle: false, enabled: false },
          { id: 20, name: 'Progress tracker update', hasToggle: false, enabled: false }
        ],
        other: [
          { id: 21, name: 'Birthday E-mail', hasToggle: true, enabled: true },
          { id: 22, name: 'Purchase Confirmation Member Overview', hasToggle: false, enabled: false },
          { id: 23, name: 'Group Invitation', hasToggle: false, enabled: false },
          { id: 24, name: 'Group Add Member Confirmation', hasToggle: false, enabled: false }
        ]
      },
      promotionalBanners: [
        {
          id: 1,
          image: '/images/banners/waist-trainer.jpg',
          text: 'Click here to order yours today!',
          link: '#'
        },
        {
          id: 2,
          image: '/images/banners/tf-logo.jpg',
          text: 'Click for a list of services!',
          link: '#'
        },
        {
          id: 3,
          image: '/images/banners/apparel.jpg',
          text: 'Shop our TF Apparel line!',
          link: '#'
        }
      ],
      joinLeaveInfo: {
        subscribe_reason: 1,
        unsubscribe_reason: 1,
        source: 1
      },
      subscribeReasons: [
        { id: 1, name: 'Unknown' }
      ],
      unsubscribeReasons: [
        { id: 1, name: 'Unknown' }
      ],
      sources: [
        { id: 1, name: 'Unknown' }
      ],
      notificationActiveTab: 'schedule',
      scheduleTypes: [
        { id: 1, name: 'GROUP TRAINING' },
        { id: 2, name: 'PERSONAL TRAINING' },
        { id: 3, name: 'OPEN GYM' }
      ],
      notificationSettings: {
        schedule_type: 1,
        member_confirmation: {
          email: true,
          push: true
        },
        event_changes: {
          email: true,
          push: true
        },
        waitlist_available: {
          email: true,
          push: true
        },
        planning_email: 'thorstrengthfitnessneeds',
        instructor_email_threshold: 'never',
        planning_email_threshold: 'never'
      },
      setting: {
         id: "",
        member_id: "",
        warehouse_id: "",
        currency_id: "",
        email: "",
        logo: "",
        CompanyName: "",
        CompanyPhone: "",
        CompanyAdress: "",
         footer: "",
         developed_by: "",
         default_language: "",
         sms_gateway: "",
         is_invoice_footer: '',
         invoice_footer: '',
         quotation_with_stock: '',
         timezone: "",
         // New business info fields
         business_type: "",
         description: "",
         zip_code: "",
         city: "",
         country: "",
         phone: "",
         facebook_page: "",
         website: "",
         primary_language: "",
         secondary_language: "",
         company_registration_number: "",
         vat_number: "",
         // Advanced fields
         club_external_id: "",
         club_key: "",
         advanced_passwords: "off",
         hide_for_non_members: false,
      },
      // Mail Settings
      mailSettingsLoading: true,
      isSavingMail: false,
      isTestingMail: false,
      showMailPassword: false,
      mailServer: {
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
      ],
      // Subscription Management
      expiringSubscriptions: [],
      expiredSubscriptions: [],
      loadingExpiring: false,
      loadingExpired: false,
      subscriptionStats: {
        total_active: 0,
        expiring_7_days: 0,
        expired: 0
      },
      reminderSettings: {
        days_before_expiry: 7
      },
      // Subscriber Invoices (Super Admin)
      subscriberInvoicesLoading: false,
      subscriberInvoicesData: [],
      subscriberInvoicesSummary: null,
      expandedGyms: [],
      showGymInvoicesModal: false,
      selectedGymId: null,
      selectedGymName: '',
      selectedGymInvoices: [],
      selectedGymInvoicesLoading: false,
      // Gym Invoices (Billing)
      gymInvoicesLoading: false,
      gymInvoicesData: [],
      gymInvoicesSummary: null,
      // Payment Panel
      showPaymentPanel: false,
      selectedInvoice: null,
      stripe: null,
      cardElement: null,
      stripeReady: false,
      paymentProcessing: false,
      paymentError: null,
      paymentSuccess: false,
      clientSecret: null,
      paymentIntentId: null,
      // Add Gym (Super Admin)
      gymPlansList: [],
      gymsList: [],
      gymsLoading: false,
      addGymForm: {
        plan_id: null,
        gym_name: '',
        contact_email: '',
        owner_name: '',
        owner_email: '',
        owner_phone: '',
      },
      addGymLoading: false,
      addGymSubmitting: false,
    };
  },

  methods: {
    ...mapActions(["refreshUserPermissions"]),
    
    // Refresh user data to get latest is_super_admin status
    async refreshUserData() {
      try {
        // Use the existing refreshUserPermissions action which fetches user data
        await this.refreshUserPermissions();
      } catch (error) {
        // Error refreshing user data
      }
    },

    goBack() {
      // Check if there's a previous page in history
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        // Default fallback to members page
        this.$router.push({ name: 'ViewAllMembers' });
      }
    },

    // Video tutorial method
    openVideoTutorialModal() {
      this.isVideoLoading = true;
      this.videoError = null;
      this.showVideoTutorialModal = true;
      // Reset video loading state after modal is shown
      this.$nextTick(() => {
        // Video element will trigger load events
      });
    },

    closeVideoTutorialModal() {
      this.showVideoTutorialModal = false;
      this.isVideoLoading = false;
      this.videoError = null;
    },

    onVideoLoadStart() {
      // Video started loading
      this.isVideoLoading = true;
    },

    onVideoCanPlay() {
      // Video can start playing
      this.isVideoLoading = false;
      this.videoError = null;
    },

    onVideoLoaded() {
      // Video metadata and data loaded
      this.isVideoLoading = false;
      this.videoError = null;
    },

    handleVideoError(event) {
      this.isVideoLoading = false;
      this.videoError = 'Failed to load video. Please check if the file exists at: ' + this.videoTutorialUrl;
    },

    // navigation handlers
    selectSection(sectionId) {
      this.selectedSectionId = sectionId;
      // Load payment gateway data when payment-methods is selected
      if (sectionId === 'payment-methods') {
        this.Get_Payment_Gateway();
      }
      // Load email templates data when email-templates is selected
      if (sectionId === 'email-templates') {
        this.Get_Email_Templates();
      }
      // Load mail settings data when mail-settings is selected
      if (sectionId === 'mail-settings') {
        this.get_config_mail();
      }
      // Load subscription management data when subscription-management is selected
      if (sectionId === 'subscription-management') {
        this.loadSubscriptionData();
      }
      // Load invoices when billing section is selected
      // Always use gym-invoices endpoint for billing (works for both super admin and regular users)
      if (sectionId === 'billing') {
        this.Get_Gym_Invoices();
      }
      // Initialize map and address autocomplete when business-info is selected
      if (sectionId === 'business-info') {
        this.$nextTick(() => {
          // Wait for DOM to render the map element
          setTimeout(() => {
            const mapElement = document.getElementById('google-map');
            if (mapElement) {
              this.initMap();
              this.initAddressAutocomplete();
            }
          }, 100);
        });
      }
    },


    // Toggle advanced section visibility
    toggleAdvanced() {
      this.showAdvanced = !this.showAdvanced;
    },

    // Handle API key request
    requestApiKey() {
      // You can implement API key request logic here
      this.makeToast("info", "API Key request functionality will be implemented", "Info");
    },

    // Map methods
    initMap() {
      // Check if the map element exists in the DOM
      const mapElement = document.getElementById('google-map');
      if (!mapElement) {
        // Map element is not in the DOM (section not visible), skip initialization
        return;
      }

      if (typeof google === 'undefined') {
        this.loadGoogleMapsScript();
        return;
      }
      
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: this.businessAddress }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          
          this.map = new google.maps.Map(mapElement, {
            zoom: 15,
            center: location,
            mapTypeId: this.mapType === 'roadmap' ? google.maps.MapTypeId.ROADMAP : google.maps.MapTypeId.SATELLITE,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: false,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });

          this.marker = new google.maps.Marker({
            position: location,
            map: this.map,
            title: this.businessAddress,
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="40" viewBox="0 0 24 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.4 0 0 5.4 0 12c0 12 12 28 12 28s12-16 12-28c0-6.6-5.4-12-12-12z" fill="#dc3545"/>
                  <circle cx="12" cy="12" r="8" fill="white"/>
                  <circle cx="12" cy="12" r="4" fill="#dc3545"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(24, 40),
              anchor: new google.maps.Point(12, 40)
            }
          });
        } else {
          this.makeToast("error", "Failed to load map location", "Error");
        }
      });
    },

    loadGoogleMapsScript() {
      // Check if API key is available
      if (!this.googleMapsApiKey) {
        this.makeToast("warning", "Google Maps API key is not configured. Please add MIX_GOOGLE_MAPS_API_KEY to your .env file.", "Warning");
        return;
      }

      if (window.googleMapsLoaded) {
        // Only initialize if business-info section is active
        if (this.selectedSectionId === 'business-info') {
          this.initMap();
          this.initAddressAutocomplete();
        }
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.googleMapsLoaded = true;
        // Only initialize if business-info section is active
        if (this.selectedSectionId === 'business-info') {
          this.initMap();
          // Initialize autocomplete after a short delay to ensure everything is ready
          setTimeout(() => {
            this.initAddressAutocomplete();
          }, 300);
        }
      };
      script.onerror = () => {
        this.makeToast("error", "Failed to load Google Maps. Please check your API key.", "Error");
      };
      document.head.appendChild(script);
    },

    // Initialize Google Places Autocomplete
    initAddressAutocomplete() {
      if (typeof google === 'undefined' || !google.maps || !google.maps.places) {
        // Wait for Google Maps to load
        if (window.googleMapsLoaded) {
          setTimeout(() => this.initAddressAutocomplete(), 200);
        }
        return;
      }

      if (!this.$refs.addressInput) {
        // Retry if input is not yet available
        this.$nextTick(() => {
          if (this.$refs.addressInput) {
            this.initAddressAutocomplete();
          }
        });
        return;
      }

      // Destroy existing autocomplete if it exists
      if (this.addressAutocomplete) {
        google.maps.event.clearInstanceListeners(this.addressAutocomplete);
        this.addressAutocomplete = null;
      }

      try {
        // Create autocomplete instance
        this.addressAutocomplete = new google.maps.places.Autocomplete(
          this.$refs.addressInput,
          {
            types: ['address'],
            componentRestrictions: { country: [] } // Allow all countries, or specify: ['us', 'ca', 'uk', 'au']
          }
        );
      } catch (error) {
        this.makeToast("error", "Failed to initialize address autocomplete", "Error");
        return;
      }

      // Listen for place selection
      this.addressAutocomplete.addListener('place_changed', () => {
        const place = this.addressAutocomplete.getPlace();
        
        if (!place.geometry) {
          this.makeToast("warning", "No details available for the selected place", "Warning");
          return;
        }

        // Extract address components
        let streetNumber = '';
        let route = '';
        let city = '';
        let state = '';
        let zipCode = '';
        let country = '';

        for (const component of place.address_components) {
          const types = component.types;

          // Handle street number
          if (types.includes('street_number')) {
            streetNumber = component.long_name;
          }
          
          // Handle route/street name
          if (types.includes('route')) {
            route = component.long_name;
          }
          
          // Handle city (try multiple types)
          if (types.includes('locality')) {
            city = component.long_name;
          } else if (types.includes('administrative_area_level_2') && !city) {
            city = component.long_name;
          }
          
          // Handle state/province
          if (types.includes('administrative_area_level_1')) {
            state = component.short_name;
          }
          
          // Handle postal code
          if (types.includes('postal_code')) {
            zipCode = component.long_name;
          }
          
          // Handle country
          if (types.includes('country')) {
            country = component.short_name.toLowerCase();
          }
        }

        // Update form fields
        const fullAddress = streetNumber ? `${streetNumber} ${route}` : route;
        this.setting.CompanyAdress = fullAddress || place.formatted_address.split(',')[0];
        
        if (city) {
          this.setting.city = city;
        }
        
        if (zipCode) {
          this.setting.zip_code = zipCode;
        }

        // Map country codes to form values
        if (country) {
          const countryMap = {
            'us': 'us',
            'ca': 'ca',
            'gb': 'uk',
            'au': 'au'
          };
          if (countryMap[country]) {
            this.setting.country = countryMap[country];
          }
        }

        // Update map with selected location
        this.updateMapLocation(place.geometry.location);
      });
    },

    // Update map location
    updateMapLocation(location) {
      // Check if the map element exists in the DOM
      const mapElement = document.getElementById('google-map');
      if (!mapElement) {
        // Map element is not in the DOM, skip update
        return;
      }

      if (!this.map) {
        // Initialize map if it doesn't exist
        this.map = new google.maps.Map(mapElement, {
          zoom: 15,
          center: location,
          mapTypeId: this.mapType === 'roadmap' ? google.maps.MapTypeId.ROADMAP : google.maps.MapTypeId.SATELLITE,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: false,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });
      } else {
        // Update existing map
        this.map.setCenter(location);
        this.map.setZoom(15);
      }

      // Update or create marker
      if (this.marker) {
        this.marker.setPosition(location);
      } else {
        this.marker = new google.maps.Marker({
          position: location,
          map: this.map,
          title: this.setting.CompanyAdress,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="40" viewBox="0 0 24 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.4 0 0 5.4 0 12c0 12 12 28 12 28s12-16 12-28c0-6.6-5.4-12-12-12z" fill="#dc3545"/>
                <circle cx="12" cy="12" r="8" fill="white"/>
                <circle cx="12" cy="12" r="4" fill="#dc3545"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(24, 40),
            anchor: new google.maps.Point(12, 40)
          }
        });
      }
    },

    setMapType(type) {
      this.mapType = type;
      if (this.map) {
        this.map.setMapTypeId(
          type === 'roadmap' ? google.maps.MapTypeId.ROADMAP : google.maps.MapTypeId.SATELLITE
        );
      }
    },

    zoomIn() {
      if (this.map) {
        this.map.setZoom(this.map.getZoom() + 1);
      }
      // Ensure main CRM sidebar stays visible
      this.preserveMainSidebar();
    },

    zoomOut() {
      if (this.map) {
        this.map.setZoom(this.map.getZoom() - 1);
      }
      // Ensure main CRM sidebar stays visible
      this.preserveMainSidebar();
    },

    // Preserve main CRM sidebar visibility
    preserveMainSidebar() {
      this.$nextTick(() => {
        const mainSidebar = document.querySelector('.sidebar-left');
        const sideContentWrap = document.querySelector('.side-content-wrap');
        const mainContentWrap = document.querySelector('.main-content-wrap');
        const appAdminWrap = document.querySelector('.app-admin-wrap');
        
        if (mainSidebar) {
          // Store current open state
          const wasOpen = mainSidebar.classList.contains('open');
          
          // Remove any inline styles that might hide the sidebar (except position/left which are controlled by CSS)
          mainSidebar.style.display = '';
          mainSidebar.style.visibility = '';
          mainSidebar.style.opacity = '';
          mainSidebar.style.zIndex = '';
          mainSidebar.style.right = '';
          mainSidebar.style.top = '';
          mainSidebar.style.bottom = '';
          mainSidebar.style.width = '';
          mainSidebar.style.height = '';
          mainSidebar.style.transform = '';
          
          // Restore open state if it was open (don't modify left/position as CSS handles it)
          if (wasOpen && !mainSidebar.classList.contains('open')) {
            mainSidebar.classList.add('open');
          }
        }
        
        if (sideContentWrap) {
          sideContentWrap.style.display = '';
          sideContentWrap.style.visibility = '';
          sideContentWrap.style.opacity = '';
        }
        
        if (mainContentWrap) {
          mainContentWrap.style.display = '';
          mainContentWrap.style.width = '';
          mainContentWrap.style.marginLeft = '';
        }
        
        if (appAdminWrap) {
          appAdminWrap.style.display = '';
          appAdminWrap.style.width = '';
        }
      });
    },

    toggleFullscreen() {
      const mapContainer = this.$refs.mapContainer;
      if (!this.isFullscreen) {
        // Preserve sidebar state before entering fullscreen
        this.preserveMainSidebar();
        
        if (mapContainer.requestFullscreen) {
          mapContainer.requestFullscreen();
        } else if (mapContainer.webkitRequestFullscreen) {
          mapContainer.webkitRequestFullscreen();
        } else if (mapContainer.msRequestFullscreen) {
          mapContainer.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    },

    handleFullscreenChange() {
      this.isFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      
      // Resize map when exiting fullscreen
      if (!this.isFullscreen && this.map) {
        setTimeout(() => {
          google.maps.event.trigger(this.map, 'resize');
        }, 100);
      }
      
      // Ensure sidebars are visible after exiting fullscreen
      if (!this.isFullscreen) {
        // Use a small delay to ensure fullscreen exit is complete
        setTimeout(() => {
          this.$nextTick(() => {
            // Restore settings sidebar
            const sidebar = document.querySelector('.settings-sidebar');
            const settingsLayout = document.querySelector('.settings-layout');
            if (sidebar) {
              // Remove any inline styles that might hide the sidebar
              sidebar.style.display = 'block';
              sidebar.style.visibility = 'visible';
              sidebar.style.opacity = '1';
              sidebar.style.position = '';
              sidebar.style.left = '';
              sidebar.style.right = '';
              sidebar.style.top = '';
              sidebar.style.bottom = '';
              sidebar.style.width = '';
              sidebar.style.height = '';
              sidebar.style.zIndex = '';
            }
            if (settingsLayout) {
              // Ensure layout is restored
              settingsLayout.style.display = '';
              settingsLayout.style.gridTemplateColumns = '';
            }
            
            // Restore main CRM sidebar
            this.preserveMainSidebar();
          });
        }, 150);
      }
    },

    SetLocal(locale) {
      this.$i18n.locale = locale;
      this.$store.dispatch("language/setLanguage", locale);
      Fire.$emit("ChangeLanguage");
    },

    //------------- Submit Validation Setting
    Submit_Setting() {
      this.$refs.form_setting.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.Please_fill_the_form_correctly,
            this.Failed
          );
        } else {
          this.Update_Settings();
        }
      });
    },

    //------------- Submit Member Settings
    Submit_Member_Settings() {
      this.$refs.form_member_settings.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.Please_fill_the_form_correctly,
            this.Failed
          );
        } else {
          this.Update_Member_Settings();
        }
      });
    },

    //------------- Get Member Settings
    Get_Member_Settings() {
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      
      axios
        .get("settings/member-settings")
        .then(response => {
          if (response.data.success && response.data.memberSettings) {
            // Merge fetched settings with existing defaults
            self.memberSettings = {
              ...self.memberSettings,
              ...response.data.memberSettings
            };
          }
          NProgress.done();
        })
        .catch(error => {
          NProgress.done();
        });
    },

    //------------- Update Member Settings
    Update_Member_Settings() {
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      
      axios
        .post("settings/member-settings", self.memberSettings)
        .then(response => {
          NProgress.done();
          const message = this.Successfully_Updated || "Settings updated successfully";
          const title = this.Success || "Success";
          this.makeToast("success", message, title);
        })
        .catch(error => {
          NProgress.done();
          this.makeToast("danger", this.InvalidData, this.Failed);
        });
    },

    //------------- Submit Portal Design
    Submit_Portal_Design() {
      this.$refs.form_portal_design.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.Please_fill_the_form_correctly,
            this.Failed
          );
        } else {
          this.Update_Portal_Design();
        }
      });
    },

    //------------- Update Portal Design
    Update_Portal_Design() {
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      
      const formData = new FormData();
      formData.append("company_color", self.portalDesign.company_color);
      
      if (self.portalDesign.menu_logo_file) {
        formData.append("menu_logo", self.portalDesign.menu_logo_file);
      }
      
      if (self.portalDesign.print_logo_file) {
        formData.append("print_logo", self.portalDesign.print_logo_file);
      }
      
      if (self.portalDesign.background_login_file) {
        formData.append("background_login", self.portalDesign.background_login_file);
      }
      
      axios
        .post("settings/portal-design", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          NProgress.done();
          const message = this.Successfully_Updated || "Settings updated successfully";
          const title = this.Success || "Success";
          this.makeToast("success", message, title);
        })
        .catch(error => {
          NProgress.done();
          this.makeToast("danger", this.InvalidData, this.Failed);
        });
    },

    //------------- Handle Menu Logo Upload
    handleMenuLogoUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        this.makeToast("danger", "Please select a valid image file", "Error");
        event.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.portalDesign.menu_logo_preview = e.target.result;
        this.portalDesign.menu_logo_file = file;
      };
      reader.readAsDataURL(file);
    },

    //------------- Handle Print Logo Upload
    handlePrintLogoUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        this.makeToast("danger", "Please select a valid image file", "Error");
        event.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.portalDesign.print_logo_preview = e.target.result;
        this.portalDesign.print_logo_file = file;
      };
      reader.readAsDataURL(file);
    },

    //------------- Handle Background Login Upload
    handleBackgroundLoginUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        this.makeToast("danger", "Please select a valid image file", "Error");
        event.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.portalDesign.background_login_preview = e.target.result;
        this.portalDesign.background_login_file = file;
      };
      reader.readAsDataURL(file);
    },

    //------------- Submit Mobile App Design
    Submit_Mobile_App_Design() {
      this.$refs.form_mobile_app.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.Please_fill_the_form_correctly,
            this.Failed
          );
        } else {
          this.Update_Mobile_App_Design();
        }
      });
    },

    //------------- Update Mobile App Design
    Update_Mobile_App_Design() {
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      
      const formData = new FormData();
      formData.append("header_color_1", self.mobileAppDesign.header_color_1);
      formData.append("header_color_2", self.mobileAppDesign.header_color_2);
      formData.append("accent_color", self.mobileAppDesign.accent_color);
      
      if (self.mobileAppDesign.app_logo_file) {
        formData.append("app_logo", self.mobileAppDesign.app_logo_file);
      }
      
      axios
        .post("settings/mobile-app-design", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          this.makeToast(
            "success",
            this.Successfully_Updated,
            this.Success
          );
          NProgress.done();
        })
        .catch(error => {
          this.makeToast("danger", this.InvalidData, this.Failed);
          NProgress.done();
        });
    },

    //------------- Handle App Logo Upload
    handleAppLogoUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        this.makeToast("danger", "Please select a valid image file", "Error");
        event.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.mobileAppDesign.app_logo_preview = e.target.result;
        this.mobileAppDesign.app_logo_file = file;
      };
      reader.readAsDataURL(file);
    },

    //------------- Download App Logo
    downloadAppLogo() {
      if (this.mobileAppDesign.app_logo || this.mobileAppDesign.app_logo_preview) {
        const link = document.createElement('a');
        link.href = this.mobileAppDesign.app_logo_preview || this.mobileAppDesign.app_logo;
        link.download = 'app-logo.png';
        link.click();
      } else {
        this.makeToast("info", "No logo available to download", "Info");
      }
    },

    //------------- Submit Schedule Settings
    Submit_Schedule_Settings() {
      this.$refs.form_schedule_settings.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.Please_fill_the_form_correctly,
            this.Failed
          );
        } else {
          this.Update_Schedule_Settings();
        }
      });
    },

    //------------- Update Schedule Settings
    Update_Schedule_Settings() {
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      
      axios
        .post("settings/schedule-settings", {
          schedules: self.scheduleList
        })
        .then(response => {
          NProgress.done();
          const message = this.Successfully_Updated || "Settings updated successfully";
          const title = this.Success || "Success";
          this.makeToast("success", message, title);
        })
        .catch(error => {
          NProgress.done();
          this.makeToast("danger", this.InvalidData, this.Failed);
        });
    },

    //------------- Move Schedule Up
    moveScheduleUp(index) {
      if (index > 0) {
        const temp = this.scheduleList[index];
        this.scheduleList[index] = this.scheduleList[index - 1];
        this.scheduleList[index - 1] = temp;
        this.Update_Schedule_Settings();
      }
    },

    //------------- Move Schedule Down
    moveScheduleDown(index) {
      if (index < this.scheduleList.length - 1) {
        const temp = this.scheduleList[index];
        this.scheduleList[index] = this.scheduleList[index + 1];
        this.scheduleList[index + 1] = temp;
        this.Update_Schedule_Settings();
      }
    },

    //------------- Delete Schedule
    deleteSchedule(index) {
      this.$swal({
        title: 'Are you sure?',
        text: 'This action cannot be undone',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.scheduleList.splice(index, 1);
          this.Update_Schedule_Settings();
          this.makeToast("success", "Schedule deleted successfully", "Success");
        }
      });
    },

    //------------- Add New Schedule
    addNewSchedule() {
      this.$swal({
        title: 'Add New Schedule',
        input: 'text',
        inputPlaceholder: 'Enter schedule name',
        showCancelButton: true,
        confirmButtonColor: '#e52e2e',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Add',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to enter a schedule name!';
          }
        }
      }).then((result) => {
        if (result.value) {
          const newSchedule = {
            id: Date.now(),
            name: result.value.toUpperCase()
          };
          this.scheduleList.push(newSchedule);
          this.Update_Schedule_Settings();
          this.makeToast("success", "Schedule added successfully", "Success");
        }
      });
    },

    //------------- Open Notification Settings
    openNotificationSettings() {
      // Switch to Schedule Settings tab or open a modal
      this.scheduleActiveTab = 'settings';
    },

    //------------- Submit Financial Info
    Submit_Financial_Info() {
      this.$refs.form_financial_info.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.Please_fill_the_form_correctly,
            this.Failed
          );
        } else {
          this.Update_Financial_Info();
        }
      });
    },

    //------------- Get Financial Info
    Get_Financial_Info() {
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      
      axios
        .get("settings/financial-info")
        .then(response => {
          if (response.data.success && response.data.financialInfo) {
            // Merge fetched settings with existing defaults
            self.financialInfo = {
              ...self.financialInfo,
              ...response.data.financialInfo
            };
          }
          NProgress.done();
        })
        .catch(error => {
          NProgress.done();
        });
    },

    //------------- Update Financial Info
    Update_Financial_Info() {
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      
      axios
        .post("settings/financial-info", self.financialInfo)
        .then(response => {
          NProgress.done();
          const message = this.Successfully_Updated || "Settings updated successfully";
          const title = this.Success || "Success";
          this.makeToast("success", message, title);
        })
        .catch(error => {
          NProgress.done();
          this.makeToast("danger", this.InvalidData, this.Failed);
        });
    },

    //------------- Play Financial Info
    playFinancialInfo() {
      // Play video or show help content
      this.makeToast("info", "Financial info help video will play here", "Info");
    },

    //------------- Edit Sales Tax
    editSalesTax() {
      this.$swal({
        title: 'Edit Default Sales Tax',
        html: '<input id="sales-tax-input" class="swal2-input" placeholder="Enter tax percentage" value="6.00">',
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          const value = document.getElementById('sales-tax-input').value;
          if (!value) {
            this.$swal.showValidationMessage('Please enter a tax percentage');
            return false;
          }
          return value;
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.financialInfo.default_sales_tax = `Default Tax (${result.value}%)`;
          this.makeToast("success", "Sales tax updated", "Success");
        }
      });
    },

    //------------- Edit Income Category
    editIncomeCategory() {
      this.$swal({
        title: 'Edit Income Categories',
        text: 'Income category management will be implemented here',
        icon: 'info',
        confirmButtonText: 'OK'
      });
    },

    //------------- Edit Invoice Text
    editInvoiceText() {
      this.$swal({
        title: 'Edit Invoice Text',
        input: 'textarea',
        inputValue: this.financialInfo.invoice_text,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'Please enter invoice text!';
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.financialInfo.invoice_text = result.value;
          this.makeToast("success", "Invoice text updated", "Success");
        }
      });
    },

    //------------- Edit Extra Field Staff
    editExtraFieldStaff() {
      this.$swal({
        title: 'Edit Extra Invoice Field - Coach',
        input: 'text',
        inputValue: this.financialInfo.extra_field_staff,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.financialInfo.extra_field_staff = result.value;
          this.makeToast("success", "Extra field updated", "Success");
        }
      });
    },

    //------------- Edit Extra Field Clients 1
    editExtraFieldClients1() {
      this.$swal({
        title: 'Edit Extra Invoice Field 1 - Members',
        input: 'text',
          inputValue: this.financialInfo.extra_field_clients_1,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.financialInfo.extra_field_clients_1 = result.value;
          this.makeToast("success", "Extra field updated", "Success");
        }
      });
    },

    //------------- Edit Extra Field Clients 2
    editExtraFieldClients2() {
      this.$swal({
        title: 'Edit Extra Invoice Field 2 - Members',
        input: 'text',
          inputValue: this.financialInfo.extra_field_clients_2,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.financialInfo.extra_field_clients_2 = result.value;
          this.makeToast("success", "Extra field updated", "Success");
        }
      });
    },

    //------------- Submit Payment Methods
    Submit_Payment_Methods() {
      this.$refs.form_payment_methods.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.Please_fill_the_form_correctly,
            this.Failed
          );
        } else {
          this.Update_Payment_Methods();
        }
      });
    },

    //------------- Update Payment Methods
    Update_Payment_Methods() {
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      
      axios
        .post("settings/payment-methods", self.paymentMethods)
        .then(response => {
          NProgress.done();
          const message = this.Successfully_Updated || "Settings updated successfully";
          const title = this.Success || "Success";
          this.makeToast("success", message, title);
        })
        .catch(error => {
          NProgress.done();
          this.makeToast("danger", this.InvalidData, this.Failed);
        });
    },

    //------------- Toggle PayPal Status
    togglePayPalStatus() {
      this.paymentMethods.paypal_status = this.paymentMethods.paypal_status === 'active' ? 'inactive' : 'active';
      this.Update_Payment_Methods();
    },

    //------------- Toggle Paysafe Status
    togglePaysafeStatus() {
      this.paymentMethods.paysafe_status = this.paymentMethods.paysafe_status === 'active' ? 'inactive' : 'active';
      this.Update_Payment_Methods();
    },

    //------------- Get Payment Gateway
    Get_Payment_Gateway() {
      this.paymentGatewayLoading = true;
      axios
        .get("get_payment_gateway")
        .then(response => {
          if (response.data.gateway) {
            this.paymentGateway = response.data.gateway;
          }
          this.paymentGatewayLoading = false;
        })
        .catch(error => {
          this.paymentGatewayLoading = false;
        });
    },

    //------------- Submit Payment Gateway
    Submit_Payment_Gateway() {
      this.$refs.form_payment_gateway.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            "Please fill the form correctly",
            "Failed"
          );
        } else {
          this.Update_Payment_Gateway();
        }
      });
    },

    //------------- Update Payment Gateway
    Update_Payment_Gateway() {
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      
      axios
        .post("payment_gateway", {
          active_payment_gateway: self.paymentGateway.active_payment_gateway,
          stripe_key: self.paymentGateway.stripe_key,
          stripe_secret: self.paymentGateway.stripe_secret,
          paysafecard_account_number: self.paymentGateway.paysafecard_account_number,
          paysafecard_api_key: self.paymentGateway.paysafecard_api_key,
          paysafecard_environment: self.paymentGateway.paysafecard_environment,
        })
        .then(response => {
          this.makeToast(
            "success",
            "Payment gateway updated successfully",
            "Success"
          );
          NProgress.done();
          Fire.$emit("Event_payment");
        })
        .catch(error => {
          this.makeToast("danger", "Failed to update payment gateway", "Failed");
          NProgress.done();
        });
    },

    //------------- Handle Gateway Change
    onGatewayChange() {
      // Clear all configurations when switching gateways
      this.paymentGateway.stripe_key = '';
      this.paymentGateway.stripe_secret = '';
      this.paymentGateway.paysafecard_account_number = '';
      this.paymentGateway.paysafecard_api_key = '';
      this.paymentGateway.paysafecard_environment = 'TEST';
    },

    //------------- Get Email Templates
    Get_Email_Templates() {
      this.emailTemplatesLoading = true;
      axios
        .get("get_emails_template")
        .then(response => {
          if (response.data.membership && response.data.membership.subject && response.data.membership.body) {
            this.emailTemplatesData.membership = response.data.membership;
          }
          if (response.data.class_booking && response.data.class_booking.subject && response.data.class_booking.body) {
            this.emailTemplatesData.class_booking = response.data.class_booking;
          }
          if (response.data.payment_received && response.data.payment_received.subject && response.data.payment_received.body) {
            this.emailTemplatesData.payment_received = response.data.payment_received;
          }
          if (response.data.workout_plan && response.data.workout_plan.subject && response.data.workout_plan.body) {
            this.emailTemplatesData.workout_plan = response.data.workout_plan;
          }
          if (response.data.staff_schedule && response.data.staff_schedule.subject && response.data.staff_schedule.body) {
            this.emailTemplatesData.staff_schedule = response.data.staff_schedule;
          }
          if (response.data.payment_sent && response.data.payment_sent.subject && response.data.payment_sent.body) {
            this.emailTemplatesData.payment_sent = response.data.payment_sent;
          }
          if (response.data.password_setup && response.data.password_setup.subject && response.data.password_setup.body) {
            this.emailTemplatesData.password_setup = response.data.password_setup;
          }
          if (response.data.appointment_created && response.data.appointment_created.subject && response.data.appointment_created.body) {
            this.emailTemplatesData.appointment_created = response.data.appointment_created;
          }
          if (response.data.appointment_updated && response.data.appointment_updated.subject && response.data.appointment_updated.body) {
            this.emailTemplatesData.appointment_updated = response.data.appointment_updated;
          }
          if (response.data.appointment_cancelled && response.data.appointment_cancelled.subject && response.data.appointment_cancelled.body) {
            this.emailTemplatesData.appointment_cancelled = response.data.appointment_cancelled;
          }
          if (response.data.schedule_assigned && response.data.schedule_assigned.subject && response.data.schedule_assigned.body) {
            this.emailTemplatesData.schedule_assigned = response.data.schedule_assigned;
          }
          if (response.data.workout_assigned && response.data.workout_assigned.subject && response.data.workout_assigned.body) {
            this.emailTemplatesData.workout_assigned = response.data.workout_assigned;
          }
          if (response.data.nutrition_assigned && response.data.nutrition_assigned.subject && response.data.nutrition_assigned.body) {
            this.emailTemplatesData.nutrition_assigned = response.data.nutrition_assigned;
          }
          this.emailTemplatesLoading = false;
        })
        .catch(error => {
          this.emailTemplatesLoading = false;
        });
    },

    //------------- Update Custom Email
    update_custom_email(email_type) {
      this.emailTemplatesSubmitProcessing = true;
      NProgress.start();
      NProgress.set(0.1);

      let custom_email_body = '';
      let custom_email_subject = '';

      if(email_type == 'membership'){
        custom_email_body = this.emailTemplatesData.membership.body;
        custom_email_subject = this.emailTemplatesData.membership.subject;
      }else if(email_type == 'class_booking'){
        custom_email_body = this.emailTemplatesData.class_booking.body;
        custom_email_subject = this.emailTemplatesData.class_booking.subject;
      }else if(email_type == 'payment_received'){
        custom_email_body = this.emailTemplatesData.payment_received.body;
        custom_email_subject = this.emailTemplatesData.payment_received.subject;
      }else if(email_type == 'workout_plan'){
        custom_email_body = this.emailTemplatesData.workout_plan.body;
        custom_email_subject = this.emailTemplatesData.workout_plan.subject;
      }else if(email_type == 'coach_schedule'){
        custom_email_body = this.emailTemplatesData.coach_schedule.body;
        custom_email_subject = this.emailTemplatesData.coach_schedule.subject;
      }else if(email_type == 'payment_sent'){
        custom_email_body = this.emailTemplatesData.payment_sent.body;
        custom_email_subject = this.emailTemplatesData.payment_sent.subject;
      }else if(email_type == 'password_setup'){
        custom_email_body = this.emailTemplatesData.password_setup.body;
        custom_email_subject = this.emailTemplatesData.password_setup.subject;
      }else if(email_type == 'appointment_created'){
        custom_email_body = this.emailTemplatesData.appointment_created.body;
        custom_email_subject = this.emailTemplatesData.appointment_created.subject;
      }else if(email_type == 'appointment_updated'){
        custom_email_body = this.emailTemplatesData.appointment_updated.body;
        custom_email_subject = this.emailTemplatesData.appointment_updated.subject;
      }else if(email_type == 'appointment_cancelled'){
        custom_email_body = this.emailTemplatesData.appointment_cancelled.body;
        custom_email_subject = this.emailTemplatesData.appointment_cancelled.subject;
      }else if(email_type == 'schedule_assigned'){
        custom_email_body = this.emailTemplatesData.schedule_assigned.body;
        custom_email_subject = this.emailTemplatesData.schedule_assigned.subject;
      }else if(email_type == 'workout_assigned'){
        custom_email_body = this.emailTemplatesData.workout_assigned.body;
        custom_email_subject = this.emailTemplatesData.workout_assigned.subject;
      }else if(email_type == 'nutrition_assigned'){
        custom_email_body = this.emailTemplatesData.nutrition_assigned.body;
        custom_email_subject = this.emailTemplatesData.nutrition_assigned.subject;
      }
      
      axios.put("/update_custom_email", {
        custom_email_body: custom_email_body,
        custom_email_subject: custom_email_subject,
        email_type: email_type
      }, {
        headers: {
          'Content-Type': 'text/html'
        }
      })
      .then(response => {
        Fire.$emit("Event_email");
        this.makeToast(
          "success",
          "Email template updated successfully",
          "Success"
        );
        NProgress.done();
        this.emailTemplatesSubmitProcessing = false;
      })
      .catch(error => {
        NProgress.done();
        this.makeToast("danger", "Failed to update email template", "Failed");
        this.emailTemplatesSubmitProcessing = false;
      });
    },

    //------------- Reset Single Template
    reset_single_template(email_type) {
      axios.post("/reset_email_template", {
        email_type: email_type
      })
      .then(response => {
        if (response.data.success) {
          const template = response.data.data;
          if (email_type === 'membership') {
            this.emailTemplatesData.membership = template;
          } else if (email_type === 'class_booking') {
            this.emailTemplatesData.class_booking = template;
          } else if (email_type === 'payment_received') {
            this.emailTemplatesData.payment_received = template;
          } else if (email_type === 'workout_plan') {
            this.emailTemplatesData.workout_plan = template;
          } else if (email_type === 'staff_schedule') {
            this.emailTemplatesData.staff_schedule = template;
          } else if (email_type === 'payment_sent') {
            this.emailTemplatesData.payment_sent = template;
          } else if (email_type === 'password_setup') {
            this.emailTemplatesData.password_setup = template;
          } else if (email_type === 'appointment_created') {
            this.emailTemplatesData.appointment_created = template;
          } else if (email_type === 'appointment_updated') {
            this.emailTemplatesData.appointment_updated = template;
          } else if (email_type === 'appointment_cancelled') {
            this.emailTemplatesData.appointment_cancelled = template;
          } else if (email_type === 'schedule_assigned') {
            this.emailTemplatesData.schedule_assigned = template;
          } else if (email_type === 'workout_assigned') {
            this.emailTemplatesData.workout_assigned = template;
          } else if (email_type === 'nutrition_assigned') {
            this.emailTemplatesData.nutrition_assigned = template;
          }
          
          this.makeToast(
            "success",
            "Template reset to defaults successfully",
            "Success"
          );
        }
      })
      .catch(error => {
        this.makeToast("danger", "Error resetting template", "Failed");
      });
    },

    //------------- Edit Frequency
    editFrequency() {
      this.$swal({
        title: 'Edit Frequency',
        input: 'text',
        inputValue: this.paymentMethods.automated_payments_frequency,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'Please enter a frequency!';
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.paymentMethods.automated_payments_frequency = result.value;
          this.makeToast("success", "Frequency updated", "Success");
        }
      });
    },

    //------------- Submit Credits
    Submit_Credits() {
      this.$refs.form_credits.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.Please_fill_the_form_correctly,
            this.Failed
          );
        } else {
          this.Update_Credits();
        }
      });
    },

    //------------- Update Credits
    Update_Credits() {
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      
      axios
        .post("settings/credits", {
          credits: self.creditsList,
          failed_transaction_email: self.creditsSettings.failed_transaction_email
        })
        .then(response => {
          NProgress.done();
          const message = this.Successfully_Updated || "Settings updated successfully";
          const title = this.Success || "Success";
          this.makeToast("success", message, title);
        })
        .catch(error => {
          NProgress.done();
          this.makeToast("danger", this.InvalidData, this.Failed);
        });
    },

    //------------- Play Credits Help
    playCreditsHelp() {
      this.makeToast("info", "Credits help video will play here", "Info");
    },

    //------------- Add New Credit
    addNewCredit() {
      this.$swal({
        title: 'Add New Credit Type',
        html: `
          <input id="credit-name" class="swal2-input" placeholder="Credit name" required>
          <input id="minimum-credits" class="swal2-input" type="number" placeholder="Minimum credits allowed" min="0" value="1" required>
          <select id="deduct-period" class="swal2-select" required>
            <option value="immediately">Immediately</option>
            <option value="1 days before the event starts" selected>1 days before the event starts</option>
            <option value="2 days before the event starts">2 days before the event starts</option>
            <option value="3 days before the event starts">3 days before the event starts</option>
            <option value="7 days before the event starts">7 days before the event starts</option>
          </select>
        `,
        showCancelButton: true,
        confirmButtonText: 'Add',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          const name = document.getElementById('credit-name').value;
          const minimum = document.getElementById('minimum-credits').value;
          const period = document.getElementById('deduct-period').value;
          
          if (!name || !minimum || !period) {
            this.$swal.showValidationMessage('Please fill all fields');
            return false;
          }
          
          return { name, minimum_credits: parseInt(minimum), deduct_period: period };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const newCredit = {
            id: Date.now(),
            name: result.value.name,
            minimum_credits: result.value.minimum_credits,
            deduct_period: result.value.deduct_period
          };
          this.creditsList.push(newCredit);
          this.Update_Credits();
          this.makeToast("success", "Credit type added successfully", "Success");
        }
      });
    },

    //------------- Edit Credit
    editCredit(credit) {
      this.$swal({
        title: 'Edit Credit Type',
        html: `
          <input id="credit-name" class="swal2-input" value="${credit.name}" required>
          <input id="minimum-credits" class="swal2-input" type="number" value="${credit.minimum_credits}" min="0" required>
          <select id="deduct-period" class="swal2-select" required>
            <option value="immediately" ${credit.deduct_period === 'Immediately' ? 'selected' : ''}>Immediately</option>
            <option value="1 days before the event starts" ${credit.deduct_period === '1 days before the event starts' ? 'selected' : ''}>1 days before the event starts</option>
            <option value="2 days before the event starts" ${credit.deduct_period === '2 days before the event starts' ? 'selected' : ''}>2 days before the event starts</option>
            <option value="3 days before the event starts" ${credit.deduct_period === '3 days before the event starts' ? 'selected' : ''}>3 days before the event starts</option>
            <option value="7 days before the event starts" ${credit.deduct_period === '7 days before the event starts' ? 'selected' : ''}>7 days before the event starts</option>
          </select>
        `,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          const name = document.getElementById('credit-name').value;
          const minimum = document.getElementById('minimum-credits').value;
          const period = document.getElementById('deduct-period').value;
          
          if (!name || !minimum || !period) {
            this.$swal.showValidationMessage('Please fill all fields');
            return false;
          }
          
          return { name, minimum_credits: parseInt(minimum), deduct_period: period };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const index = this.creditsList.findIndex(c => c.id === credit.id);
          if (index !== -1) {
            this.creditsList[index].name = result.value.name;
            this.creditsList[index].minimum_credits = result.value.minimum_credits;
            this.creditsList[index].deduct_period = result.value.deduct_period;
            this.Update_Credits();
            this.makeToast("success", "Credit type updated successfully", "Success");
          }
        }
      });
    },

    //------------- Delete Credit
    deleteCredit(credit) {
      this.$swal({
        title: 'Are you sure?',
        text: `Do you want to delete "${credit.name}"? This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          const index = this.creditsList.findIndex(c => c.id === credit.id);
          if (index !== -1) {
            this.creditsList.splice(index, 1);
            this.Update_Credits();
            this.makeToast("success", "Credit type deleted successfully", "Success");
          }
        }
      });
    },

    //------------- Play Memberships Help
    playMembershipsHelp() {
      this.makeToast("info", "Memberships help video will play here", "Info");
    },

    //------------- Create New Membership
    // Open create membership modal
    openCreateMembershipModal() {
      this.$refs.createMembershipModal.show();
    },

    // Reset membership form
    resetMembershipForm() {
      this.newMembershipForm = {
        // Basic Info
        name: '',
        description: '',
        webshop_image: '',
        group: '',
        terms_conditions: 'general',
        start_date_type: 'any',
        start_date_from: '',
        start_date_to: '',
        status_type: 'active',
        status_from: '',
        status_to: '',
        // Scope
        access_times: 'no_restriction',
        duration_value: 1,
        duration_unit: 'months',
        auto_renewed: false,
        // Price
        price: '',
        currency: 'USD',
        sales_tax: 'default',
        interval: 'monthly',
        recurring_billing: 'from_start',
        income_category: '',
        default_payment_method: 'cash',
        invoice_before_value: 1,
        invoice_before_unit: 'weeks',
        one_time_payment: false,
        registration_fee: '',
        // Credits
        credit_distribution: 'from_assign_date',
        // Digital Services
        enable_pro: false,
        early_booking_access: false,
        // Legacy fields
        stripe_price_id: '',
        features: [''],
        is_active: true,
        sort_order: 0
      };
      // Set "Default group" as default selected option if it exists
      const defaultGroup = this.membershipGroups.find(group => group.name === 'Default group');
      if (defaultGroup) {
        this.newMembershipForm.group = defaultGroup.name;
      }
      // Reset services
      this.availableServices.forEach(service => {
        service.enabled = false;
        service.amount = 0;
        service.frequency_value = 1;
        service.frequency_unit = 'months';
        service.validity_value = 1;
        service.validity_unit = 'months';
        service.extra_of_start = false;
      });
      if (this.$refs.membershipForm) {
        this.$refs.membershipForm.reset();
      }
    },

    // Handle webshop image upload
    handleWebshopImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          this.makeToast("warning", "Image size should be less than 5MB", "Warning");
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newMembershipForm.webshop_image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    // Add feature field
    addFeature() {
      this.newMembershipForm.features.push('');
    },

    // Remove feature field
    removeFeature(index) {
      if (this.newMembershipForm.features.length > 1) {
        this.newMembershipForm.features.splice(index, 1);
      }
    },

    // Handle create membership
    handleCreateMembership(bvModalEvt) {
      bvModalEvt.preventDefault();
      
      this.$refs.membershipForm.validate().then(success => {
        if (!success) {
          return;
        }

        this.membershipFormProcessing = true;
        NProgress.start();

        // Prepare form data - include all fields
        const formData = {
          // Basic fields for plans table
          name: this.newMembershipForm.name,
          price: parseFloat(this.newMembershipForm.price),
          interval: this.newMembershipForm.interval,
          stripe_price_id: this.newMembershipForm.stripe_price_id || null,
          features: this.newMembershipForm.features.filter(f => f.trim() !== ''),
          is_active: this.newMembershipForm.is_active,
          sort_order: this.newMembershipForm.sort_order || 0,
          // Extended membership data (store as JSON)
          membership_data: {
            description: this.newMembershipForm.description,
            webshop_image: this.newMembershipForm.webshop_image,
            group: this.newMembershipForm.group,
            terms_conditions: this.newMembershipForm.terms_conditions,
            start_date_type: this.newMembershipForm.start_date_type,
            start_date_from: this.newMembershipForm.start_date_from,
            start_date_to: this.newMembershipForm.start_date_to,
            status_type: this.newMembershipForm.status_type,
            status_from: this.newMembershipForm.status_from,
            status_to: this.newMembershipForm.status_to,
            access_times: this.newMembershipForm.access_times,
            duration_value: this.newMembershipForm.duration_value,
            duration_unit: this.newMembershipForm.duration_unit,
            auto_renewed: this.newMembershipForm.auto_renewed,
            currency: this.newMembershipForm.currency,
            sales_tax: this.newMembershipForm.sales_tax,
            recurring_billing: this.newMembershipForm.recurring_billing,
            income_category: this.newMembershipForm.income_category,
            default_payment_method: this.newMembershipForm.default_payment_method,
            invoice_before_value: this.newMembershipForm.invoice_before_value,
            invoice_before_unit: this.newMembershipForm.invoice_before_unit,
            one_time_payment: this.newMembershipForm.one_time_payment,
            registration_fee: this.newMembershipForm.registration_fee ? parseFloat(this.newMembershipForm.registration_fee) : null,
            credit_distribution: this.newMembershipForm.credit_distribution,
            enable_pro: this.newMembershipForm.enable_pro,
            early_booking_access: this.newMembershipForm.early_booking_access,
            services: this.availableServices.filter(s => s.enabled).map(s => ({
              id: s.id,
              name: s.name,
              amount: s.amount,
              frequency_value: s.frequency_value,
              frequency_unit: s.frequency_unit,
              validity_value: s.validity_value,
              validity_unit: s.validity_unit,
              extra_of_start: s.extra_of_start
            }))
          }
        };

        axios
          .post('plans', formData)
          .then(response => {
            if (response.data.success) {
              this.makeToast("success", "Membership plan created successfully", "Success");
              this.$refs.createMembershipModal.hide();
              this.resetMembershipForm();
              // Reload membership plans
              this.Get_Subscription_Plans();
            } else {
              this.makeToast("danger", response.data.message || "Failed to create membership plan", "Failed");
            }
            NProgress.done();
            this.membershipFormProcessing = false;
          })
          .catch(error => {
            let errorMessage = "Error creating membership plan";
            if (error.response && error.response.data) {
              if (error.response.data.errors) {
                const errors = Object.values(error.response.data.errors).flat();
                errorMessage = errors.join(', ');
              } else if (error.response.data.message) {
                errorMessage = error.response.data.message;
              }
            }
            this.makeToast("danger", errorMessage, "Failed");
            NProgress.done();
            this.membershipFormProcessing = false;
          });
      });
    },

    //------------- Edit Membership
    // Navigate to create membership page with edit mode
    editMembership(membership) {
      // Navigate to create membership page with membership ID as query parameter
      this.$router.push({
        path: '/app/Settings/memberships/create',
        query: { id: membership.id }
      });
    },

    // Reset edit membership form
    resetEditMembershipForm() {
      this.editMembershipForm = {
        id: null,
        name: '',
        price: '',
        interval: 'monthly',
        stripe_price_id: '',
        features: [''],
        is_active: true,
        sort_order: 0
      };
      if (this.$refs.editMembershipForm) {
        this.$refs.editMembershipForm.reset();
      }
    },

    // Add feature field for edit form
    addEditFeature() {
      this.editMembershipForm.features.push('');
    },

    // Remove feature field for edit form
    removeEditFeature(index) {
      if (this.editMembershipForm.features.length > 1) {
        this.editMembershipForm.features.splice(index, 1);
      }
    },

    // Handle update membership
    handleUpdateMembership(bvModalEvt) {
      bvModalEvt.preventDefault();
      
      this.$refs.editMembershipForm.validate().then(success => {
        if (!success) {
          return;
        }

        this.membershipFormProcessing = true;
        NProgress.start();

        // Prepare form data
        const formData = {
          name: this.editMembershipForm.name,
          price: parseFloat(this.editMembershipForm.price),
          interval: this.editMembershipForm.interval,
          stripe_price_id: this.editMembershipForm.stripe_price_id || null,
          features: this.editMembershipForm.features.filter(f => f.trim() !== ''),
          is_active: this.editMembershipForm.is_active,
          sort_order: this.editMembershipForm.sort_order || 0
        };

        axios
          .put(`plans/${this.editMembershipForm.id}`, formData)
          .then(response => {
            if (response.data.success) {
              this.makeToast("success", "Membership plan updated successfully", "Success");
              this.$refs.editMembershipModal.hide();
              this.resetEditMembershipForm();
              // Reload membership plans
              this.Get_Subscription_Plans();
            } else {
              this.makeToast("danger", response.data.message || "Failed to update membership plan", "Failed");
            }
            NProgress.done();
            this.membershipFormProcessing = false;
          })
          .catch(error => {
            let errorMessage = "Error updating membership plan";
            if (error.response && error.response.data) {
              if (error.response.data.errors) {
                const errors = Object.values(error.response.data.errors).flat();
                errorMessage = errors.join(', ');
              } else if (error.response.data.message) {
                errorMessage = error.response.data.message;
              }
            }
            this.makeToast("danger", errorMessage, "Failed");
            NProgress.done();
            this.membershipFormProcessing = false;
          });
      });
    },

    //------------- View Membership Users
    viewMembershipUsers(membership) {
      this.$swal({
        title: 'Membership Users',
        text: `Viewing users for "${membership.name}" - List will be implemented here`,
        icon: 'info',
        confirmButtonText: 'OK'
      });
    },

    //------------- Delete Membership
    deleteMembership(membership) {
      this.$swal({
        title: 'Are you sure?',
        text: `Do you want to delete "${membership.name}"? This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.Delete_Subscription_Plan(membership.id);
        }
      });
    },

    //------------- Get Subscription Plans (from plans table)
    Get_Subscription_Plans() {
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      
      const statusParam = self.membershipStatusFilter === 'active' ? 'active' : 
                         self.membershipStatusFilter === 'inactive' ? 'inactive' : 'all';
      
      axios
        .get(`plans?status=${statusParam}`)
        .then(response => {
          if (response.data.success && response.data.data) {
            // Group plans by their membership_data.group
            const plansByGroup = {};
            const ungroupedPlans = [];
            
            response.data.data.forEach(plan => {
              // Extract group from membership_data
              let groupName = null;
              if (plan.membership_data && plan.membership_data.group) {
                groupName = plan.membership_data.group;
              }
              
              const planData = {
                id: plan.id,
                name: plan.name,
                price: `$${parseFloat(plan.price).toFixed(2)} ${plan.interval}`,
                prolongation_price: `$${parseFloat(plan.price).toFixed(2)}`,
                active: plan.is_active ? 'Yes' : 'No',
                status: plan.is_active ? 'active' : 'inactive',
                interval: plan.interval || 'monthly',
                features: plan.features || [],
                plan_price: plan.price, // Store original price value
                is_active: plan.is_active,
                stripe_price_id: plan.stripe_price_id || '',
                sort_order: plan.sort_order || 0,
                membership_data: plan.membership_data || {}
              };
              
              if (groupName && groupName.trim() !== '') {
                if (!plansByGroup[groupName]) {
                  plansByGroup[groupName] = [];
                }
                plansByGroup[groupName].push(planData);
              } else {
                ungroupedPlans.push(planData);
              }
            });
            
            // Build membership categories from groups
            const categories = [];
            let categoryId = 1;
            
            // Add plans grouped by their membership group
            Object.keys(plansByGroup).forEach(groupName => {
              categories.push({
                id: categoryId++,
                name: groupName,
                memberships: plansByGroup[groupName]
              });
            });
            
            // Add ungrouped plans to a default category if any exist
            if (ungroupedPlans.length > 0) {
              categories.push({
                id: categoryId++,
                name: 'Default memberships',
                memberships: ungroupedPlans
              });
            }
            
            // If no plans at all, show empty state
            if (categories.length === 0) {
              categories.push({
                id: 1,
                name: 'Default memberships',
                memberships: []
              });
            }
            
            self.membershipCategories = categories;
          }
          NProgress.done();
        })
        .catch(error => {
          this.makeToast("danger", "Error loading subscription plans", "Failed");
          NProgress.done();
        });
    },
    
    // Fetch membership groups
    Get_Membership_Groups() {
      var self = this;
      axios
        .get('plans/membership-groups/list')
        .then(response => {
          if (response.data.success && response.data.data) {
            self.membershipGroups = response.data.data;
            // Set "Default group" as default selected option if it exists and form group is empty or has old 'default' value
            const defaultGroup = self.membershipGroups.find(group => group.name === 'Default group');
            if (defaultGroup && (!self.newMembershipForm.group || self.newMembershipForm.group === 'default')) {
              self.newMembershipForm.group = defaultGroup.name;
            }
          }
        })
        .catch(error => {
          // Error fetching membership groups
        });
    },

    //------------- Delete Subscription Plan (from plans table)
    Delete_Subscription_Plan(planId) {
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      
      axios
        .delete(`plans/${planId}`)
        .then(response => {
          if (response.data.success) {
            this.makeToast("success", "Subscription plan deleted successfully", "Success");
            // Reload subscription plans
            this.Get_Subscription_Plans();
          } else {
            this.makeToast("danger", response.data.message || "Failed to delete subscription plan", "Failed");
          }
          NProgress.done();
        })
        .catch(error => {
          this.makeToast("danger", "Error deleting subscription plan", "Failed");
          NProgress.done();
        });
    },

    //------------- Submit Webshop
    Submit_Webshop() {
      this.$refs.form_webshop.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.Please_fill_the_form_correctly,
            this.Failed
          );
        } else {
          this.Update_Webshop();
        }
      });
    },

    //------------- Update Webshop
    Update_Webshop() {
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      
      axios
        .post("settings/webshop", self.webshopSettings)
        .then(response => {
          NProgress.done();
          const message = this.Successfully_Updated || "Settings updated successfully";
          const title = this.Success || "Success";
          this.makeToast("success", message, title);
        })
        .catch(error => {
          NProgress.done();
          this.makeToast("danger", this.InvalidData, this.Failed);
        });
    },

    //------------- Copy to Clipboard
    async copyToClipboard(text, type) {
      if (!text) {
        this.makeToast("info", `${type} not available`, "Info");
        return;
      }

      try {
        await navigator.clipboard.writeText(text);
        this.makeToast("success", `${type} copied to clipboard!`, "Success");
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          this.makeToast("success", `${type} copied to clipboard!`, "Success");
        } catch (fallbackError) {
          this.makeToast("danger", `Failed to copy ${type.toLowerCase()}`, "Error");
        }
        document.body.removeChild(textArea);
      }
    },

    //------------- Refresh Terms
    refreshTerms() {
      this.$swal({
        title: 'Refresh Terms and Conditions',
        text: 'This will reload the terms and conditions from the default template.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Refresh',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          // Load default terms
          this.webshopSettings.terms_conditions = '';
          this.makeToast("success", "Terms and conditions refreshed", "Success");
        }
      });
    },

    //------------- Add Email Address
    addEmailAddress() {
      this.$swal({
        title: 'Add Email Address',
        input: 'email',
        inputPlaceholder: 'Enter email address',
        showCancelButton: true,
        confirmButtonText: 'Add',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'Please enter an email address!';
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Please enter a valid email address!';
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          if (!this.webshopSettings.shop_emails.includes(result.value)) {
            this.webshopSettings.shop_emails.push(result.value);
            this.webshopSettings.shop_email = result.value;
            this.makeToast("success", "Email address added", "Success");
          } else {
            this.makeToast("info", "Email address already exists", "Info");
          }
        }
      });
    },

    //------------- Download Check-in Setup
    downloadCheckinSetup() {
      // In a real application, this would trigger a file download
      // For now, we'll show a message
      this.makeToast("info", "Downloading CheckinClientSetup1.4.8.msi...", "Download");
      
      // Simulate download (replace with actual download logic)
      const link = document.createElement('a');
      link.href = '#';
      link.download = 'CheckinClientSetup1.4.8.msi';
      // In production, this would be the actual file URL
      // link.href = '/downloads/CheckinClientSetup1.4.8.msi';
      // link.click();
    },

    //------------- Create New Setting
    createNewSetting() {
      this.$swal({
        title: 'Create New Setting',
        text: 'New device setting creation form will be implemented here',
        icon: 'info',
        confirmButtonText: 'OK'
      });
    },

    //------------- Submit Module Settings
    Submit_Module_Settings() {
      this.$refs.form_module_settings.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.Please_fill_the_form_correctly,
            this.Failed
          );
        } else {
          this.Update_Module_Settings();
        }
      });
    },

    //------------- Get Module Settings
    Get_Module_Settings() {
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      
      axios
        .get("settings/module-settings")
        .then(response => {
          if (response.data.success && response.data.moduleSettings) {
            // Merge fetched settings with existing defaults
            self.moduleSettings = {
              ...self.moduleSettings,
              ...response.data.moduleSettings
            };
          }
          NProgress.done();
        })
        .catch(error => {
          NProgress.done();
        });
    },

    //------------- Update Module Settings
    Update_Module_Settings() {
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      
      axios
        .post("settings/module-settings", self.moduleSettings)
        .then(response => {
          NProgress.done();
          const message = this.Successfully_Updated || "Settings updated successfully";
          const title = this.Success || "Success";
          this.makeToast("success", message, title);
        })
        .catch(error => {
          NProgress.done();
          this.makeToast(
            "danger", 
            this.InvalidData || "Failed to update settings", 
            this.Failed || "Error"
          );
        });
    },

    //------------- Get Coach Profile Image
    getCoachProfileImage(imagePath) {
      if (!imagePath) {
        return '/images/avatar/no_avatar.png';
      }
      if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
        return imagePath;
      }
      return '/images/avatar/' + imagePath;
    },

    //------------- Handle Image Error
    handleImageError(event) {
      event.target.src = '/images/avatar/no_avatar.png';
    },

    //------------- Get Status Class
    getStatusClass(status) {
      const statusLower = status.toLowerCase();
      if (statusLower === 'declined') {
        return 'status-declined';
      } else if (statusLower === 'no profile') {
        return 'status-no-profile';
      } else if (statusLower === 'approved' || statusLower === 'pending') {
        return 'status-' + statusLower;
      }
      return '';
    },

    //------------- View Coach Profile
    viewCoachProfile(coach) {
      this.$swal({
        title: 'Coach Profile',
        text: `Viewing profile for ${coach.name}`,
        icon: 'info',
        confirmButtonText: 'OK'
      });
    },

    //------------- Edit Coach Profile
    editCoachProfile(coach) {
      this.$swal({
        title: 'Edit Coach Profile',
        text: `Editing profile for ${coach.name}. Profile review form will be implemented here.`,
        icon: 'info',
        confirmButtonText: 'OK'
      });
    },

    //------------- Toggle Coach Visibility
    toggleCoachVisibility(coach) {
      coach.visible = !coach.visible;
      
      // Update via API
      NProgress.start();
      axios
        .post(`coach-finder/${coach.id}/toggle-visibility`, {
          visible: coach.visible
        })
        .then(response => {
          this.makeToast(
            "success",
            `Coach profile ${coach.visible ? 'shown' : 'hidden'} successfully`,
            "Success"
          );
          NProgress.done();
        })
        .catch(error => {
          // Revert on error
          coach.visible = !coach.visible;
          this.makeToast("danger", "Failed to update visibility", "Error");
          NProgress.done();
        });
    },

    //------------- Edit Email Template
    editEmailTemplate(template) {
      // Navigate to email template editor or open modal
      this.$swal({
        title: 'Edit Email Template',
        text: `Editing template: ${template.name}. Template editor will be implemented here.`,
        icon: 'info',
        confirmButtonText: 'OK'
      });
    },

    //------------- Toggle Email Template
    toggleEmailTemplate(template) {
      template.enabled = !template.enabled;
      
      // Update via API
      NProgress.start();
      axios
        .post(`email-templates/${template.id}/toggle`, {
          enabled: template.enabled
        })
        .then(response => {
          this.makeToast(
            "success",
            `Email template ${template.enabled ? 'enabled' : 'disabled'} successfully`,
            "Success"
          );
          NProgress.done();
        })
        .catch(error => {
          // Revert on error
          template.enabled = !template.enabled;
          this.makeToast("danger", "Failed to update template", "Error");
          NProgress.done();
        });
    },

    //------------- Open Advanced Settings
    openAdvancedSettings() {
      this.$swal({
        title: 'Advanced Email Settings',
        text: 'Advanced email template settings will be implemented here.',
        icon: 'info',
        confirmButtonText: 'OK'
      });
    },

    //------------- Handle Banner Image Error
    handleBannerImageError(event) {
      event.target.src = '/images/placeholder-banner.png';
    },

    //------------- Handle Banner Click
    handleBannerClick(banner) {
      // Navigate to banner link or handle click
      if (banner.link && banner.link !== '#') {
        window.open(banner.link, '_blank');
      }
    },

    //------------- Add Banner
    addBanner() {
      this.$swal({
        title: 'Add Promotional Banner',
        html: `
          <input id="banner-text" class="swal2-input" placeholder="Banner text">
          <input id="banner-link" class="swal2-input" placeholder="Banner link (optional)">
          <input type="file" id="banner-image" class="swal2-input" accept="image/*">
        `,
        showCancelButton: true,
        confirmButtonText: 'Add',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          const text = document.getElementById('banner-text').value;
          const link = document.getElementById('banner-link').value;
          const imageFile = document.getElementById('banner-image').files[0];
          
          if (!text) {
            this.$swal.showValidationMessage('Please enter banner text');
            return false;
          }
          
          return { text, link: link || '#', imageFile };
        }
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          // Handle image upload and create banner
          const newBanner = {
            id: Date.now(),
            image: result.value.imageFile ? URL.createObjectURL(result.value.imageFile) : '/images/placeholder-banner.png',
            text: result.value.text,
            link: result.value.link
          };
          this.promotionalBanners.push(newBanner);
          this.makeToast("success", "Banner added successfully", "Success");
        }
      });
    },

    //------------- Edit Banner
    editBanner(banner) {
      this.$swal({
        title: 'Edit Promotional Banner',
        html: `
          <input id="banner-text" class="swal2-input" value="${banner.text}" placeholder="Banner text">
          <input id="banner-link" class="swal2-input" value="${banner.link}" placeholder="Banner link">
          <input type="file" id="banner-image" class="swal2-input" accept="image/*">
        `,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          const text = document.getElementById('banner-text').value;
          const link = document.getElementById('banner-link').value;
          const imageFile = document.getElementById('banner-image').files[0];
          
          if (!text) {
            this.$swal.showValidationMessage('Please enter banner text');
            return false;
          }
          
          return { text, link: link || '#', imageFile };
        }
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          banner.text = result.value.text;
          banner.link = result.value.link;
          if (result.value.imageFile) {
            banner.image = URL.createObjectURL(result.value.imageFile);
          }
          this.makeToast("success", "Banner updated successfully", "Success");
        }
      });
    },

    //------------- Delete Banner
    deleteBanner(banner) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Do you want to delete this banner? This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          const index = this.promotionalBanners.findIndex(b => b.id === banner.id);
          if (index !== -1) {
            this.promotionalBanners.splice(index, 1);
            this.makeToast("success", "Banner deleted successfully", "Success");
          }
        }
      });
    },

    //------------- Add Subscribe Reason
    addSubscribeReason() {
      this.$swal({
        title: 'Add Subscribe Reason',
        input: 'text',
        inputPlaceholder: 'Enter reason name',
        showCancelButton: true,
        confirmButtonText: 'Add',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'Please enter a reason name!';
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const newReason = {
            id: Date.now(),
            name: result.value
          };
          this.subscribeReasons.push(newReason);
          this.makeToast("success", "Subscribe reason added", "Success");
        }
      });
    },

    //------------- Edit Subscribe Reason
    editSubscribeReason() {
      const selectedReason = this.subscribeReasons.find(r => r.id === this.joinLeaveInfo.subscribe_reason);
      if (!selectedReason) {
        this.makeToast("info", "Please select a reason to edit", "Info");
        return;
      }
      
      this.$swal({
        title: 'Edit Subscribe Reason',
        input: 'text',
        inputValue: selectedReason.name,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'Please enter a reason name!';
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          selectedReason.name = result.value;
          this.makeToast("success", "Subscribe reason updated", "Success");
        }
      });
    },

    //------------- Delete Subscribe Reason
    deleteSubscribeReason() {
      const selectedReason = this.subscribeReasons.find(r => r.id === this.joinLeaveInfo.subscribe_reason);
      if (!selectedReason) {
        this.makeToast("info", "Please select a reason to delete", "Info");
        return;
      }
      
      if (this.subscribeReasons.length === 1) {
        this.makeToast("warning", "Cannot delete the last reason", "Warning");
        return;
      }
      
      this.$swal({
        title: 'Are you sure?',
        text: `Do you want to delete "${selectedReason.name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          const index = this.subscribeReasons.findIndex(r => r.id === selectedReason.id);
          if (index !== -1) {
            this.subscribeReasons.splice(index, 1);
            this.joinLeaveInfo.subscribe_reason = this.subscribeReasons[0].id;
            this.makeToast("success", "Subscribe reason deleted", "Success");
          }
        }
      });
    },

    //------------- Add Unsubscribe Reason
    addUnsubscribeReason() {
      this.$swal({
        title: 'Add Unsubscribe Reason',
        input: 'text',
        inputPlaceholder: 'Enter reason name',
        showCancelButton: true,
        confirmButtonText: 'Add',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'Please enter a reason name!';
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const newReason = {
            id: Date.now(),
            name: result.value
          };
          this.unsubscribeReasons.push(newReason);
          this.makeToast("success", "Unsubscribe reason added", "Success");
        }
      });
    },

    //------------- Edit Unsubscribe Reason
    editUnsubscribeReason() {
      const selectedReason = this.unsubscribeReasons.find(r => r.id === this.joinLeaveInfo.unsubscribe_reason);
      if (!selectedReason) {
        this.makeToast("info", "Please select a reason to edit", "Info");
        return;
      }
      
      this.$swal({
        title: 'Edit Unsubscribe Reason',
        input: 'text',
        inputValue: selectedReason.name,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'Please enter a reason name!';
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          selectedReason.name = result.value;
          this.makeToast("success", "Unsubscribe reason updated", "Success");
        }
      });
    },

    //------------- Delete Unsubscribe Reason
    deleteUnsubscribeReason() {
      const selectedReason = this.unsubscribeReasons.find(r => r.id === this.joinLeaveInfo.unsubscribe_reason);
      if (!selectedReason) {
        this.makeToast("info", "Please select a reason to delete", "Info");
        return;
      }
      
      if (this.unsubscribeReasons.length === 1) {
        this.makeToast("warning", "Cannot delete the last reason", "Warning");
        return;
      }
      
      this.$swal({
        title: 'Are you sure?',
        text: `Do you want to delete "${selectedReason.name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          const index = this.unsubscribeReasons.findIndex(r => r.id === selectedReason.id);
          if (index !== -1) {
            this.unsubscribeReasons.splice(index, 1);
            this.joinLeaveInfo.unsubscribe_reason = this.unsubscribeReasons[0].id;
            this.makeToast("success", "Unsubscribe reason deleted", "Success");
          }
        }
      });
    },

    //------------- Add Source
    addSource() {
      this.$swal({
        title: 'Add Source',
        input: 'text',
        inputPlaceholder: 'Enter source name',
        showCancelButton: true,
        confirmButtonText: 'Add',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'Please enter a source name!';
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const newSource = {
            id: Date.now(),
            name: result.value
          };
          this.sources.push(newSource);
          this.makeToast("success", "Source added", "Success");
        }
      });
    },

    //------------- Edit Source
    editSource() {
      const selectedSource = this.sources.find(s => s.id === this.joinLeaveInfo.source);
      if (!selectedSource) {
        this.makeToast("info", "Please select a source to edit", "Info");
        return;
      }
      
      this.$swal({
        title: 'Edit Source',
        input: 'text',
        inputValue: selectedSource.name,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (!value) {
            return 'Please enter a source name!';
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          selectedSource.name = result.value;
          this.makeToast("success", "Source updated", "Success");
        }
      });
    },

    //------------- Delete Source
    deleteSource() {
      const selectedSource = this.sources.find(s => s.id === this.joinLeaveInfo.source);
      if (!selectedSource) {
        this.makeToast("info", "Please select a source to delete", "Info");
        return;
      }
      
      if (this.sources.length === 1) {
        this.makeToast("warning", "Cannot delete the last source", "Warning");
        return;
      }
      
      this.$swal({
        title: 'Are you sure?',
        text: `Do you want to delete "${selectedSource.name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          const index = this.sources.findIndex(s => s.id === selectedSource.id);
          if (index !== -1) {
            this.sources.splice(index, 1);
            this.joinLeaveInfo.source = this.sources[0].id;
            this.makeToast("success", "Source deleted", "Success");
          }
        }
      });
    },

    //------------- Submit Notifications
    Submit_Notifications() {
      this.$refs.form_notifications.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.Please_fill_the_form_correctly,
            this.Failed
          );
        } else {
          this.Update_Notifications();
        }
      });
    },

    //------------- Update Notifications
    Update_Notifications() {
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      
      axios
        .post("settings/notifications", self.notificationSettings)
        .then(response => {
          NProgress.done();
          const message = this.Successfully_Updated || "Settings updated successfully";
          const title = this.Success || "Success";
          this.makeToast("success", message, title);
        })
        .catch(error => {
          NProgress.done();
          this.makeToast("danger", this.InvalidData, this.Failed);
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

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    //------------------------------ Event Upload Logo -------------------------------\\
    async onFileSelected(e) {
      const { valid } = await this.$refs.Logo.validate(e);

      if (valid) {
        this.setting.logo = e.target.files[0];
      } else {
        this.setting.logo = "";
      }
    },

    Selected_Time_Zone(value) {
      if (value === null) {
        this.setting.timezone = "";
      }
    },

    //---------------------------------- Update Settings ----------------
    Update_Settings() {
      NProgress.start();
      NProgress.set(0.1);
      var self = this;
      
      // Clear previous data
      self.data = new FormData();
      
      // Existing fields
      self.data.append("client", self.setting.client_id);
      self.data.append("warehouse", self.setting.warehouse_id);
      self.data.append("currency", self.setting.currency_id);
      self.data.append("email", self.setting.email);
      self.data.append("logo", self.setting.logo);
      self.data.append("CompanyName", self.setting.CompanyName || '');
      self.data.append("CompanyPhone", self.setting.CompanyPhone || '');
      self.data.append("CompanyAdress", self.setting.CompanyAdress || '');
      self.data.append("footer", self.setting.footer);
      self.data.append("developed_by", self.setting.developed_by);
      self.data.append("default_language", self.setting.default_language);
      self.data.append("sms_gateway", self.setting.sms_gateway);
      self.data.append("is_invoice_footer", self.setting.is_invoice_footer);
      self.data.append("invoice_footer", self.setting.invoice_footer);
      self.data.append("quotation_with_stock", self.setting.quotation_with_stock);
      self.data.append("timezone", self.setting.timezone);
      
      // New business info fields
      self.data.append("business_type", self.setting.business_type || '');
      self.data.append("description", self.setting.description || '');
      self.data.append("zip_code", self.setting.zip_code || '');
      self.data.append("city", self.setting.city || '');
      self.data.append("country", self.setting.country || '');
      self.data.append("phone", self.setting.phone);
      self.data.append("facebook_page", self.setting.facebook_page);
      self.data.append("website", self.setting.website);
      self.data.append("primary_language", self.setting.primary_language);
      self.data.append("secondary_language", self.setting.secondary_language);
      self.data.append("company_registration_number", self.setting.company_registration_number);
      self.data.append("vat_number", self.setting.vat_number);
      
      // Advanced fields
      self.data.append("club_external_id", self.setting.club_external_id);
      self.data.append("club_key", self.setting.club_key);
      self.data.append("advanced_passwords", self.setting.advanced_passwords);
      self.data.append("hide_for_non_members", self.setting.hide_for_non_members ? '1' : '0');
      
      self.data.append("_method", "put");

      axios
        .post("settings/" + self.setting.id, self.data)
        .then(response => {
          NProgress.done();
          const message = this.Successfully_Updated || "Settings updated successfully";
          const title = this.Success || "Success";
          this.makeToast("success", message, title);
          
          // Set language first
          this.SetLocal(self.setting.default_language);
          
          // Delay refresh calls to avoid connection reset
          setTimeout(() => {
            // Refresh user permissions with error handling (non-blocking)
            if (this.refreshUserPermissions && typeof this.refreshUserPermissions === 'function') {
              this.refreshUserPermissions().catch(err => {
                // Silently handle refreshUserPermissions errors - not critical
              });
            }
            
            // Reload settings after a short delay
            setTimeout(() => {
              Fire.$emit("Event_Setting");
            }, 200);
          }, 500);
        })
        .catch(error => {
          NProgress.done();
          this.makeToast("danger", this.InvalidData, this.Failed);
        });
    }, 

    //---------------------------------- Clear_Cache ----------------
    Clear_Cache() {
      NProgress.start();
      NProgress.set(0.1);
      axios
        .get("clear_cache")
        .then(response => {
          this.makeToast(
            "success",
            this.Cache_cleared_successfully,
            this.Success
          );
          NProgress.done();
        })
        .catch(error => {
          NProgress.done();
          this.makeToast("danger", this.Failed_to_clear_cache, this.Failed);
        });
    },   

    //---------------------------------- Get SETTINGS ----------------
    Get_Settings() {
      axios
        .get("get_Settings_data")
        .then(response => {
          this.setting         = response.data.settings;
          this.currencies      = response.data.currencies || [];
          this.clients         = response.data.clients || [];
          this.warehouses      = response.data.warehouses || [];
          this.sms_gateway     = response.data.sms_gateway || [];
          this.zones_array    = response.data.zones_array || [];
          this.isLoading = false;
          
          // Initialize map after settings are loaded if on business-info tab
          this.$nextTick(() => {
            if (this.selectedSectionId === 'business-info') {
              this.initMap();
            }
          });
        })
        .catch(error => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
    },

    //------------- Mail Settings Methods ----------------
    
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
        // Error parsing user data from localStorage
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
        // Error parsing user data from sessionStorage
      }
      
      // Return null if not found - backend will use gym_id from authenticated user token
      return null;
    },

    // Validate all required fields
    validateAllMailFields() {
      const errors = [];
      
      if (!this.mailServer.mail_mailer || this.mailServer.mail_mailer.trim() === '') {
        errors.push('Mail Driver is required');
      }
      
      if (!this.mailServer.host || this.mailServer.host.trim() === '') {
        errors.push('Mail Host is required');
      }
      
      if (!this.mailServer.port || this.mailServer.port.toString().trim() === '') {
        errors.push('Mail Port is required');
      } else if (isNaN(this.mailServer.port) || parseInt(this.mailServer.port) < 1 || parseInt(this.mailServer.port) > 65535) {
        errors.push('Mail Port must be a valid number between 1 and 65535');
      }
      
      if (!this.mailServer.sender_name || this.mailServer.sender_name.trim() === '') {
        errors.push('Sender Name is required');
      }
      
      if (!this.mailServer.username || this.mailServer.username.trim() === '') {
        errors.push('Username is required');
      } else if (!this.isValidEmail(this.mailServer.username)) {
        errors.push('Username must be a valid email address');
      }
      
      if (!this.mailServer.password || this.mailServer.password.trim() === '') {
        errors.push('Password is required');
      }
      
      if (!this.mailServer.encryption || this.mailServer.encryption.trim() === '') {
        errors.push('Encryption is required');
      }
      
      return errors;
    },

    // Validate email format
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    // Get validation state for form fields
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },

    // Submit mail configuration
    Submit_config_mail() {
      const gymId = this.getGymId();

      // Validate form
      this.$refs.form_config_mail.validate().then(success => {
        if (!success) {
          // Get all validation errors
          const fieldErrors = this.validateAllMailFields();
          if (fieldErrors.length > 0) {
            this.makeToast(
              "danger",
              "Please fix the following errors:\n• " + fieldErrors.join("\n• "),
              "Validation Failed"
            );
          } else {
            this.makeToast(
              "danger",
              "Please fill the form correctly",
              "Failed"
            );
          }
        } else {
          // Additional validation before submit
          const validationErrors = this.validateAllMailFields();
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

    // Update mail configuration
    Update_config_mail() {
      const gymId = this.getGymId();

      // Validate all fields
      const validationErrors = this.validateAllMailFields();
      if (validationErrors.length > 0) {
        this.makeToast(
          "danger",
          "Please fix the following errors before saving:\n• " + validationErrors.join("\n• "),
          "Validation Failed"
        );
        this.isSavingMail = false;
        return;
      }


      this.isSavingMail = true;
      NProgress.start();
      NProgress.set(0.1);
      
      const serverId = this.mailServer.id || 1;
      
      axios
        .put("update_config_mail/" + serverId, {
          mail_mailer: this.mailServer.mail_mailer,
          host: this.mailServer.host,
          port: this.mailServer.port,
          sender_name: this.mailServer.sender_name,
          username: this.mailServer.username,
          password: this.mailServer.password,
          encryption: this.mailServer.encryption
        })
        .then(response => {
          Fire.$emit("Event_Smtp");
          
          if (response.data && response.data.server && response.data.server.id) {
            this.mailServer.id = response.data.server.id;
          }
          
          this.makeToast(
            "success",
            response.data.message || "Mail settings updated successfully!",
            "Success"
          );
          NProgress.done();
          this.isSavingMail = false;
          
          this.$nextTick(() => {
            this.get_config_mail();
          });
        })
        .catch(error => {
          NProgress.done();
          this.isSavingMail = false;
          
          let errorMessage = "Failed to update mail settings";
          
          if (error.response) {
            const status = error.response.status;
            const data = error.response.data;
            
            if (status === 401 || status === 403) {
              errorMessage = "You don't have permission to update mail settings. Please contact your administrator.";
            } else if (status === 404) {
              errorMessage = "Server configuration not found. Please contact administrator.";
            } else if (status === 422 && data.errors) {
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
            errorMessage = "Network error: Unable to connect to server. Please check your internet connection.";
          } else {
            errorMessage = error.message || "An unexpected error occurred. Please try again.";
          }
          
          this.makeToast("danger", errorMessage, "Failed");
        });
    },

    // Get mail configuration
    get_config_mail() {
      const gymId = this.getGymId();

      this.mailSettingsLoading = true;
      axios
        .get("get_config_mail")
        .then(response => {
          if (response.data.server && response.data.server.id) {
            this.mailServer = response.data.server;
          } else {
            this.mailServer = {
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
          this.mailSettingsLoading = false;
        })
        .catch(error => {
          this.mailSettingsLoading = false;
          
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

    // Test mail connection – sends a real test email using current form settings
    testMailConnection() {
      const validationErrors = this.validateAllMailFields();
      if (validationErrors.length > 0) {
        this.makeToast(
          "danger",
          "Please fill in all required fields before testing:\n• " + validationErrors.join("\n• "),
          "Validation Required"
        );
        return;
      }

      this.isTestingMail = true;
      axios
        .post("test_config_mail", {
          mail_mailer: this.mailServer.mail_mailer,
          host: this.mailServer.host,
          port: parseInt(this.mailServer.port, 10),
          sender_name: this.mailServer.sender_name,
          username: this.mailServer.username,
          password: this.mailServer.password,
          encryption: this.mailServer.encryption
        })
        .then(response => {
          this.isTestingMail = false;
          if (response.data && response.data.success) {
            this.makeToast(
              "success",
              response.data.message || "Test email sent successfully. Check your inbox.",
              "Test Result"
            );
          } else {
            this.makeToast(
              "warning",
              response.data.message || "Test completed with no confirmation.",
              "Test Result"
            );
          }
        })
        .catch(error => {
          this.isTestingMail = false;
          const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            "Failed to send test email. Check your SMTP settings and try again.";
          this.makeToast("danger", message, "Test Failed");
        });
    },

    // Reset mail form
    resetMailForm() {
      if (this.$refs.form_config_mail) {
        this.$refs.form_config_mail.reset();
      }
      this.get_config_mail();
    },

    // Subscription Management Methods
    async loadSubscriptionData() {
      await Promise.all([
        this.loadExpiringSubscriptions(),
        this.loadExpiredSubscriptions(),
        this.loadSubscriptionStatistics()
      ]);
    },

    async loadExpiringSubscriptions() {
      this.loadingExpiring = true;
      try {
        const response = await axios.get('/subscriptions/expiring', {
          params: { days: 7 }
        });
        if (response.data.success) {
          this.expiringSubscriptions = response.data.data || [];
        }
      } catch (error) {
        this.makeToast('danger', 'Failed to load expiring subscriptions', 'Error');
      } finally {
        this.loadingExpiring = false;
      }
    },

    async loadExpiredSubscriptions() {
      this.loadingExpired = true;
      try {
        const response = await axios.get('/subscriptions/expired');
        if (response.data.success) {
          this.expiredSubscriptions = response.data.data || [];
        }
      } catch (error) {
        this.makeToast('danger', 'Failed to load expired subscriptions', 'Error');
      } finally {
        this.loadingExpired = false;
      }
    },

    async loadSubscriptionStatistics() {
      try {
        const response = await axios.get('/subscriptions/statistics');
        if (response.data.success) {
          this.subscriptionStats = response.data.data || {
            total_active: 0,
            expiring_7_days: 0,
            expired: 0
          };
        }
      } catch (error) {
        // Error loading subscription statistics
      }
    },

    async sendReminder(subscriptionId) {
      try {
        const response = await axios.post(`/subscriptions/${subscriptionId}/send-reminder`);
        if (response.data.success) {
          this.makeToast('success', 'Reminder sent successfully', 'Success');
          this.loadExpiringSubscriptions();
        }
      } catch (error) {
        this.makeToast('danger', 'Failed to send reminder', 'Error');
      }
    },

    renewSubscription(subscriptionId) {
      this.$swal({
        title: 'Renew Subscription',
        text: 'Do you want to renew this subscription?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, renew it',
        cancelButtonText: 'Cancel'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.post(`/subscriptions/${subscriptionId}/renew`);
            if (response.data.success) {
              this.makeToast('success', 'Subscription renewed successfully', 'Success');
              this.loadSubscriptionData();
            } else {
              const errorMsg = response.data.message || 'Failed to renew subscription';
              this.makeToast('danger', errorMsg, 'Error');
            }
          } catch (error) {
            const errorMsg = error.response?.data?.message || 'Failed to renew subscription';
            this.makeToast('danger', errorMsg, 'Error');
          }
        }
      });
    },

    async saveReminderSettings() {
      try {
        // Save reminder settings to backend (you may need to create an endpoint for this)
        // For now, we'll just show a success message
        this.makeToast('success', 'Reminder settings saved', 'Success');
      } catch (error) {
        this.makeToast('danger', 'Failed to save reminder settings', 'Error');
      }
    },

    formatDate(date) {
      if (!date) return '-';
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    },

    // Subscriber Invoices Methods (Super Admin)
    async Get_Subscriber_Invoices() {
      this.subscriberInvoicesLoading = true;
      try {
        const { data } = await axios.get('super-admin/invoices');
        if (data.success) {
          this.subscriberInvoicesData = data.data || [];
          this.subscriberInvoicesSummary = data.summary || {
            total_gyms: 0,
            total_invoices: 0,
            total_amount: 0,
            pending_amount: 0,
            paid_amount: 0
          };
        } else {
          this.subscriberInvoicesData = [];
          this.subscriberInvoicesSummary = {
            total_gyms: 0,
            total_invoices: 0,
            total_amount: 0,
            pending_amount: 0,
            paid_amount: 0
          };
        }
      } catch (error) {
        this.makeToast('danger', this.$t('Error'), error.response?.data?.message || 'Failed to load invoices');
        this.subscriberInvoicesData = [];
        this.subscriberInvoicesSummary = {
          total_gyms: 0,
          total_invoices: 0,
          total_amount: 0,
          pending_amount: 0,
          paid_amount: 0
        };
      } finally {
        this.subscriberInvoicesLoading = false;
      }
    },

    toggleGymInvoices(gymId) {
      const index = this.expandedGyms.indexOf(gymId);
      if (index > -1) {
        this.expandedGyms.splice(index, 1);
      } else {
        this.expandedGyms.push(gymId);
      }
    },

    async viewGymAllInvoices(gymId) {
      const gymData = this.subscriberInvoicesData.find(g => g.gym_id === gymId);
      if (gymData) {
        this.selectedGymId = gymId;
        this.selectedGymName = gymData.gym_name;
        this.showGymInvoicesModal = true;
        this.selectedGymInvoicesLoading = true;
        
        try {
          const { data } = await axios.get(`super-admin/invoices/gym/${gymId}`);
          if (data.success) {
            this.selectedGymInvoices = data.invoices;
          }
        } catch (error) {
          this.makeToast('danger', this.$t('Error'), error.response?.data?.message || 'Failed to load gym invoices');
        } finally {
          this.selectedGymInvoicesLoading = false;
        }
      }
    },

    closeGymInvoicesModal() {
      this.showGymInvoicesModal = false;
      this.selectedGymId = null;
      this.selectedGymName = '';
      this.selectedGymInvoices = [];
    },

    async loadGyms() {
      this.gymsLoading = true;
      try {
        const { data } = await axios.get('super-admin/gyms');
        if (data.success && data.gyms) {
          this.gymsList = data.gyms;
        } else {
          this.gymsList = [];
        }
      } catch (e) {
        this.makeToast('danger', this.$t('Error'), e.response?.data?.message || 'Failed to load gyms.');
        this.gymsList = [];
      } finally {
        this.gymsLoading = false;
      }
    },

    async loadGymPlans() {
      if (this.gymPlansList.length) return;
      try {
        const { data } = await axios.get('super-admin/gym-plans');
        if (data.success && data.plans && data.plans.length) {
          this.gymPlansList = data.plans;
          if (this.addGymForm.plan_id == null || !this.gymPlansList.find(p => p.id === this.addGymForm.plan_id)) {
            this.$set(this.addGymForm, 'plan_id', this.gymPlansList[0].id);
          }
        }
      } catch (e) {
        this.makeToast('danger', this.$t('Error'), e.response?.data?.message || 'Failed to load subscription plans.');
      }
    },

    async submitAddGym() {
      const valid = await this.$refs.form_add_gym.validate();
      if (!valid) return;
      this.addGymSubmitting = true;
      try {
        const { data } = await axios.post('super-admin/gyms/subscribe', {
          plan_id: this.addGymForm.plan_id || undefined,
          gym_name: this.addGymForm.gym_name,
          contact_email: this.addGymForm.contact_email,
          owner_name: this.addGymForm.owner_name,
          owner_email: this.addGymForm.owner_email,
          owner_phone: this.addGymForm.owner_phone || undefined,
        });
        if (data.success) {
          this.makeToast('success', this.$t('Success'), data.message || 'Gym created and invitation sent.');
          const firstPlanId = this.gymPlansList.length ? this.gymPlansList[0].id : null;
          this.addGymForm = {
            plan_id: firstPlanId,
            gym_name: '',
            contact_email: '',
            owner_name: '',
            owner_email: '',
            owner_phone: '',
          };
          this.$refs.form_add_gym.reset();
          this.loadGyms();
        } else {
          this.makeToast('danger', this.$t('Error'), data.message || 'Failed to create gym.');
        }
      } catch (error) {
        let msg = error.response?.data?.message || error.message || 'Failed to create gym.';
        if (error.response?.data?.errors) {
          const firstError = Object.values(error.response.data.errors).flat()[0];
          if (firstError) msg = firstError;
        }
        this.makeToast('danger', this.$t('Error'), msg);
      } finally {
        this.addGymSubmitting = false;
      }
    },

    async Get_Gym_Invoices() {
      this.gymInvoicesLoading = true;
      try {
        const { data } = await axios.get('gym-invoices');
        if (data.success) {
          this.gymInvoicesData = data.data || [];
          this.gymInvoicesSummary = data.summary || {
            total_invoices: 0,
            total_amount: 0,
            pending_amount: 0,
            paid_amount: 0,
            cancelled_amount: 0
          };
        } else {
          this.gymInvoicesData = [];
          this.gymInvoicesSummary = {
            total_invoices: 0,
            total_amount: 0,
            pending_amount: 0,
            paid_amount: 0,
            cancelled_amount: 0
          };
        }
      } catch (error) {
        this.makeToast('danger', this.$t('Error'), error.response?.data?.message || 'Failed to load invoices');
        this.gymInvoicesData = [];
        this.gymInvoicesSummary = {
          total_invoices: 0,
          total_amount: 0,
          pending_amount: 0,
          paid_amount: 0,
          cancelled_amount: 0
        };
      } finally {
        this.gymInvoicesLoading = false;
      }
    },

    async openPaymentPanel(invoice) {
      this.selectedInvoice = invoice;
      this.showPaymentPanel = true;
      this.paymentError = null;
      this.paymentSuccess = false;
      this.paymentProcessing = false;
      this.stripeReady = false;

      // Load Stripe.js if not already loaded
      if (typeof Stripe === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        script.onload = () => this.initializeStripe();
        document.head.appendChild(script);
      } else {
        this.initializeStripe();
      }
    },

    async initializeStripe() {
      try {
        // Get Stripe publishable key from backend
        const keyResponse = await axios.get('gym-invoices/stripe-publishable-key');
        
        if (!keyResponse.data.success || !keyResponse.data.publishable_key) {
          this.paymentError = keyResponse.data.message || 'Failed to get Stripe publishable key';
          return;
        }

        const stripeKey = keyResponse.data.publishable_key;
        
        // Validate that it's a publishable key (starts with pk_)
        if (!stripeKey.startsWith('pk_')) {
          this.paymentError = 'Invalid Stripe publishable key format';
          return;
        }
        
        this.stripe = Stripe(stripeKey);
        
        // Create payment intent
        const { data } = await axios.post(`gym-invoices/${this.selectedInvoice.id}/create-payment-intent`);
        
        if (data.success) {
          this.clientSecret = data.clientSecret;
          this.paymentIntentId = data.payment_intent_id;

          // Create card element
          const elements = this.stripe.elements();
          this.cardElement = elements.create('card', {
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          });

          this.cardElement.mount('#stripe-card-element');
          this.cardElement.on('ready', () => {
            this.stripeReady = true;
          });

          this.cardElement.on('change', (event) => {
            const displayError = document.getElementById('stripe-card-errors');
            if (event.error) {
              displayError.textContent = event.error.message;
            } else {
              displayError.textContent = '';
            }
          });
        } else {
          this.paymentError = data.message || 'Failed to initialize payment';
        }
      } catch (error) {
        this.paymentError = error.response?.data?.message || 'Failed to initialize payment';
      }
    },

    async processPayment() {
      if (!this.stripe || !this.cardElement || !this.clientSecret) {
        this.paymentError = 'Payment system not ready';
        return;
      }

      this.paymentProcessing = true;
      this.paymentError = null;

      try {
        const { error, paymentIntent } = await this.stripe.confirmCardPayment(this.clientSecret, {
          payment_method: {
            card: this.cardElement,
          },
        });

        if (error) {
          this.paymentError = error.message;
          this.paymentProcessing = false;
        } else if (paymentIntent.status === 'succeeded') {
          // Confirm payment on backend
          const { data } = await axios.post(`gym-invoices/${this.selectedInvoice.id}/confirm-payment`, {
            payment_intent_id: this.paymentIntentId
          });

          if (data.success) {
            this.paymentSuccess = true;
            this.makeToast('success', 'Payment Successful', 'Your invoice has been paid successfully');
            
            // Refresh invoices list (only for regular users, Super Admin doesn't have payment functionality)
            if (!this.isSuperAdmin) {
              await this.Get_Gym_Invoices();
            }
            
            // Close panel after 2 seconds
            setTimeout(() => {
              this.closePaymentPanel();
            }, 2000);
          } else {
            this.paymentError = data.message || 'Payment confirmation failed';
            this.paymentProcessing = false;
          }
        }
      } catch (error) {
        this.paymentError = error.response?.data?.message || 'Payment processing failed';
        this.paymentProcessing = false;
      }
    },

    closePaymentPanel() {
      if (this.cardElement) {
        this.cardElement.unmount();
        this.cardElement = null;
      }
      this.showPaymentPanel = false;
      this.selectedInvoice = null;
      this.stripe = null;
      this.stripeReady = false;
      this.paymentProcessing = false;
      this.paymentError = null;
      this.paymentSuccess = false;
      this.clientSecret = null;
      this.paymentIntentId = null;
    },

    formatCurrency(amount) {
      return parseFloat(amount || 0).toFixed(2);
    },

    getStatusBadgeClass(status) {
      const classes = {
        'pending': 'badge-warning',
        'paid': 'badge-success',
        'cancelled': 'badge-danger'
      };
      return classes[status] || 'badge-secondary';
    },

    getDaysClass(days) {
      if (days <= 3) return 'text-danger font-weight-bold';
      if (days <= 7) return 'text-warning font-weight-bold';
      return 'text-info';
    },

    getStatusBadgeClass(status) {
      // For invoice status
      const invoiceClasses = {
        'pending': 'badge-warning',
        'paid': 'badge-success',
        'cancelled': 'badge-danger'
      };
      if (invoiceClasses[status]) {
        return invoiceClasses[status];
      }
      // For subscription status
      const subscriptionClasses = {
        'expiring_soon': 'badge badge-warning',
        'expired': 'badge badge-danger',
        'active': 'badge badge-success',
        'cancelled': 'badge badge-secondary'
      };
      return subscriptionClasses[status] || 'badge badge-secondary';
    },

  }, //end Methods

  computed: {
    ...mapGetters(["currentUser"]),
    isSuperAdmin() {
      // Check if user is super admin - handle both boolean true and integer 1
      if (!this.currentUser) {
        return false;
      }
      // Check multiple possible values for is_super_admin
      const isAdmin = this.currentUser.is_super_admin === true || 
                      this.currentUser.is_super_admin === 1 || 
                      this.currentUser.is_super_admin === '1' ||
                      String(this.currentUser.is_super_admin) === '1';
      return isAdmin;
    },
    filteredSideNav() {
      const filtered = this.sideNav
        .filter(group => {
          // Super Admin section (Billing + Add Gym): only when user is super admin (is_super_admin from users table)
          if (group.key === 'super-admin') {
            return this.isSuperAdmin;
          }
          return true;
        })
        .map(group => {
          // For non–super admin: show Manage with Billing. For super admin: remove Billing from Manage so it only appears under Super Admin
          if (group.key === 'manage' && this.isSuperAdmin) {
            return {
              ...group,
              items: group.items.filter(item => item.id !== 'billing'),
            };
          }
          return group;
        });
      return filtered;
    },
    selectedGymTotalAmount() {
      return this.selectedGymInvoices.reduce((sum, invoice) => sum + parseFloat(invoice.amount || 0), 0);
    },
    // Flatten gym invoices for table rendering
    flattenedInvoicesData() {
      const result = [];
      this.subscriberInvoicesData.forEach(gymData => {
        // Add gym header
        result.push({
          type: 'gym-header',
          gym_id: gymData.gym_id,
          gym_name: gymData.gym_name,
          gym_email: gymData.gym_email,
          total_invoices: gymData.total_invoices,
          total_amount: gymData.total_amount
        });
        // Add invoices if expanded
        if (this.expandedGyms.includes(gymData.gym_id)) {
          gymData.invoices.forEach(invoice => {
            result.push({
              type: 'invoice',
              gym_id: gymData.gym_id,
              gym_email: gymData.gym_email,
              invoice: invoice
            });
          });
        }
      });
      return result;
    },
    activeSectionLabel() {
      for (const group of this.sideNav) {
        const found = group.items.find(i => i.id === this.selectedSectionId);
        if (found) return found.label;
      }
      return '';
    },
    googleMapsApiKey() {
      return this.settings.google_maps_api_key || 
             process.env.MIX_GOOGLE_MAPS_API_KEY || 
             process.env.GOOGLE_MAPS_API_KEY;
    },
    businessAddress() {
      // Build address from setting fields
      const parts = [];
      if (this.setting.CompanyAdress) parts.push(this.setting.CompanyAdress);
      if (this.setting.city) parts.push(this.setting.city);
      if (this.setting.zip_code) parts.push(this.setting.zip_code);
      if (this.setting.country) {
        const countryNames = {
          'us': 'United States',
          'ca': 'Canada',
          'uk': 'United Kingdom',
          'au': 'Australia'
        };
        parts.push(countryNames[this.setting.country] || this.setting.country);
      }
      return parts.length > 0 ? parts.join(', ') : '1635 Old 41 Highway Suite: 102, Kennesaw, GA 30144';
    },
    filteredMembershipCategories() {
      // Filter categories based on status filter
      return this.membershipCategories.filter(category => {
        if (this.membershipStatusFilter === 'active') {
          return category.memberships.some(m => m.status === 'active');
        } else if (this.membershipStatusFilter === 'inactive-contracts') {
          return category.memberships.some(m => m.status === 'inactive-contracts');
        } else if (this.membershipStatusFilter === 'inactive') {
          return category.memberships.some(m => m.status === 'inactive');
        }
        return true;
      }).map(category => ({
        ...category,
        memberships: category.memberships.filter(m => {
          if (this.membershipStatusFilter === 'active') {
            return m.status === 'active';
          } else if (this.membershipStatusFilter === 'inactive-contracts') {
            return m.status === 'inactive-contracts';
          } else if (this.membershipStatusFilter === 'inactive') {
            return m.status === 'inactive';
          }
          return true;
        })
      })).filter(category => category.memberships.length > 0);
    },
  },

  //----------------------------- Created function-------------------
  created: function() {
    // Check if there's a tab query parameter in the route
    if (this.$route.query.tab) {
      this.selectedSectionId = this.$route.query.tab;
    }
    
    this.Get_Settings();
    this.Get_Membership_Groups();

    Fire.$on("Event_Setting", () => {
      this.Get_Settings();
    });

    Fire.$on("Event_payment", () => {
      if (this.selectedSectionId === 'payment-methods') {
        this.Get_Payment_Gateway();
      }
    });

    Fire.$on("Event_email", () => {
      if (this.selectedSectionId === 'email-templates') {
        this.Get_Email_Templates();
      }
    });

    Fire.$on("Event_Smtp", () => {
      if (this.selectedSectionId === 'mail-settings') {
        this.get_config_mail();
      }
    });
  },

  //----------------------------- Mounted function-------------------
  mounted() {
      // Refresh user data to ensure is_super_admin is loaded
      this.refreshUserData();
      
      // Initialize map when component is mounted
      this.$nextTick(() => {
        if (this.selectedSectionId === 'business-info') {
          // Wait for the DOM to be fully rendered before initializing map
          setTimeout(() => {
            const mapElement = document.getElementById('google-map');
            if (mapElement) {
              this.initMap();
              // Initialize address autocomplete after a short delay to ensure Google Maps is loaded
              setTimeout(() => {
                this.initAddressAutocomplete();
              }, 500);
            }
          }, 100);
        } else if (this.selectedSectionId === 'member-settings') {
        // Fetch member settings if member-settings tab is active
        this.Get_Member_Settings();
      } else if (this.selectedSectionId === 'module-settings') {
        // Fetch module settings if module-settings tab is active
        this.Get_Module_Settings();
      } else if (this.selectedSectionId === 'financial-info') {
        // Fetch financial info if financial-info tab is active
        this.Get_Financial_Info();
      } else if (this.selectedSectionId === 'memberships') {
        // Fetch subscription plans if memberships tab is active
        this.Get_Subscription_Plans();
      } else if (this.selectedSectionId === 'gyms') {
        this.loadGyms();
      } else if (this.selectedSectionId === 'add-gym') {
        this.loadGymPlans();
      }
    });

    // Add fullscreen event listeners
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange);
  },

  beforeDestroy() {
    // Remove fullscreen event listeners
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange);
  },

  //----------------------------- Watchers -------------------
  watch: {
    selectedSectionId(newSection, oldSection) {
      // Clean up map when leaving business-info section
      if (oldSection === 'business-info' && newSection !== 'business-info') {
        if (this.map) {
          // Clear map instance
          this.map = null;
        }
        if (this.marker) {
          this.marker = null;
        }
      }
      
      // Initialize map when entering business-info section
      if (newSection === 'business-info') {
        this.$nextTick(() => {
          setTimeout(() => {
            const mapElement = document.getElementById('google-map');
            if (mapElement) {
              this.initMap();
            }
          }, 100);
        });
      } else if (newSection === 'member-settings') {
        // Fetch member settings when tab is selected
        this.Get_Member_Settings();
      } else if (newSection === 'module-settings') {
        // Fetch module settings when tab is selected
        this.Get_Module_Settings();
      } else if (newSection === 'financial-info') {
        // Fetch financial info when tab is selected
        this.Get_Financial_Info();
      } else if (newSection === 'memberships') {
        // Fetch subscription plans when memberships tab is selected
        this.Get_Subscription_Plans();
      } else if (newSection === 'gyms') {
        this.loadGyms();
      } else if (newSection === 'add-gym') {
        this.loadGymPlans();
      }
    },
    membershipStatusFilter(newFilter) {
      // Reload subscription plans when filter changes
      if (this.selectedSectionId === 'memberships') {
        this.Get_Subscription_Plans();
      }
    },
    // Watch for address changes to update map
    businessAddress(newAddress, oldAddress) {
      if (newAddress !== oldAddress && this.selectedSectionId === 'business-info') {
        const mapElement = document.getElementById('google-map');
        if (mapElement && this.map) {
          this.initMap();
        }
      }
    }
  }
};
</script>

<style lang="scss">
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

// Override blue colors with CRM red color #e52e2e
$color-link: #e52e2e;
$color-link-hover: #c52626;
$color-button: #e52e2e;
$color-button-hover: #c52626;
$color-info: #e52e2e;
$gradient-primary: linear-gradient(135deg, #e52e2e 0%, #c52626 100%);

.settings-page {
  min-height: 100vh;
  background: $color-white;
  padding: $padding-md;
}

.page-title {
  margin-bottom: $margin-lg;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h1 {
    font-size: $font-size-xxl;
    font-weight: $font-weight-bold;
    color: $color-heading;
    margin: 0;
  }

  .help-btn {
    background: white;
    color: #252525;
    border: 1px solid #dcdcdc;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    font-size: 14px;
    font-weight: 500;

    &:hover {
      transform: scale(1.05);
      background: #f8f9fa;
      border-color: #dc3545;
      color: #dc3545;
    }

    i {
      font-size: 16px;
    }
  }
}

.settings-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: $margin-lg;
  max-width: 1400px;
  margin: 0 auto;
}

.settings-sidebar {
  background: $color-card-bg;
  border-radius: $border-radius-lg;
  padding: $padding-md $padding-sm;
  box-shadow: $box-shadow-md;
  height: fit-content;
  overflow: visible;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.nav-group {
  margin-bottom: $margin-lg;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.nav-group-title {
  font-weight: $font-weight-bold;
  font-size: $font-size-sm;
  color: $color-heading;
  margin-bottom: $margin-sm;
  margin-top: $margin-md;
  padding-left: $padding-md;
  text-transform: uppercase;
  letter-spacing: $letter-spacing-sm;
  
  &:first-child {
    margin-top: 0;
  }
}

.nav-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $padding-xs $padding-xs;
  padding-left: $padding-sm;
  border-radius: 0;
  cursor: pointer;
  color: $color-heading;
  font-size: $font-size-sm;
  transition: all 0.2s ease;
  border-left: 1px solid transparent;
  
  &:hover {
    color: $color-link;
    background: rgba($color-link, 0.05);
  }
  
  &.active {
    color: $color-link;
    font-weight: $font-weight-semibold;
    border-left-color: $color-link;
    background: rgba($color-link, 0.05);
  }
}

.nav-item-label {
  flex: 1;
}

.nav-item-actions {
  display: flex;
  align-items: center;
  gap: $padding-xs;
}

.nav-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 $padding-xxs;
  background: $color-muted;
  color: $color-white;
  border-radius: 50%;
  font-size: $font-size-xxs;
  font-weight: $font-weight-semibold;
  line-height: 1;
}

.external-icon {
  font-size: $font-size-xs;
  opacity: 0.6;
  color: $color-muted;
  
  .nav-item:hover &,
  .nav-item.active & {
    opacity: 0.8;
    color: $color-link;
  }
}

.settings-content {
  background: $color-card-bg;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-md;
  overflow: hidden;
}

.content-card {
  padding: 10px;
}

.content-header {
  margin-bottom: $margin-lg;
  
  h2 {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-heading;
    margin: 0 0 $padding-xs 0;
  }
  
  h3 {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
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

.settings-section {
  margin-bottom: $margin-xl;
  padding-bottom: $margin-lg;
  border-bottom: $border-width-sm solid $color-border-muted;
  
  &:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
}

.section-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $color-heading;
  margin-bottom: $margin-md;
}

.nested-settings {
  margin-left: $margin-lg;
  margin-top: $margin-sm;
  padding-left: $margin-md;
  border-left: 2px solid $color-border-muted;
}

.btn-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-md;
  color: $color-heading;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: $color-background-hover;
    border-color: $color-button;
    color: $color-button;
  }
  
  i {
    font-size: $font-size-sm;
  }
}

.pause-period-controls {
  display: flex;
  align-items: center;
  gap: $padding-sm;
  flex-wrap: wrap;
}

.pause-input {
  width: 80px !important;
}

.pause-select {
  width: 120px !important;
}

.pause-label {
  color: $color-heading;
  font-size: $font-size-sm;
  white-space: nowrap;
}

// Portal Design Styles
.color-picker-wrapper {
  display: flex;
  align-items: center;
  gap: $padding-sm;
}

.color-input {
  flex: 1;
  max-width: 200px;
}

.color-picker-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 120px;
  height: 40px;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-md;
  background: $color-white;
  cursor: pointer;
  overflow: hidden;
}

.color-swatch {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.color-picker {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 2;
}

.color-picker-icon {
  position: absolute;
  right: $padding-xs;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: $color-muted;
  font-size: $font-size-xs;
  z-index: 3;
  background: rgba($color-white, 0.8);
  padding: 2px;
  border-radius: 2px;
}

.image-upload-wrapper {
  margin-top: $padding-sm;
}

.image-preview-container {
  display: flex;
  flex-direction: column;
  gap: $padding-sm;
  align-items: flex-start;
}

.image-preview {
  background: $color-white;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  
  &.menu-logo-preview {
    width: 200px;
    height: 50px;
  }
  
  &.print-logo-preview {
    width: 300px;
    height: 120px;
  }
  
  &.background-login-preview {
    width: 400px;
    height: 225px;
  }
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.preview-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-input-bg;
  color: $color-muted;
  
  i {
    font-size: $font-size-xl;
  }
}

.file-input {
  display: none;
}

.change-link {
  color: #e52e2e;
  text-decoration: none;
  font-size: $font-size-sm;
  transition: color 0.2s ease;
  
  &:hover {
    color: #c52626;
    text-decoration: underline;
  }
}

.download-link {
  color: #e52e2e;
  text-decoration: none;
  font-size: $font-size-sm;
  margin-bottom: $padding-sm;
  display: inline-block;
  transition: color 0.2s ease;
  
  &:hover {
    color: $color-link-hover;
    text-decoration: underline;
  }
}

// Mobile App Design Styles
.mobile-app-tabs {
  display: flex;
  border-bottom: $border-width-sm solid $color-border-muted;
  margin-bottom: $margin-lg;
  gap: 0;
}

.mobile-app-tab {
  padding: $padding-md $padding-lg;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: $color-muted;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: $color-heading;
  }
  
  &.active {
    color: $color-link;
    border-bottom-color: $color-link;
    background: rgba($color-link, 0.05);
  }
}

.mobile-app-content {
  min-height: 400px;
}

.mobile-app-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: $margin-xl;
  margin-bottom: $margin-xl;
  
  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr;
  }
}

.mobile-app-settings {
  .settings-intro {
    color: $color-muted;
    font-size: $font-size-sm;
    line-height: $line-height-sm;
    margin-bottom: $margin-lg;
  }
}

.mobile-app-preview {
  position: sticky;
  top: $padding-md;
  height: fit-content;
}

.phone-frame {
  background: $color-white;
  border-radius: 30px;
  padding: 10px;
  box-shadow: $box-shadow-lg;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.phone-screen {
  background: $color-white;
  border-radius: 25px;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 9 / 16;
  position: relative;
  border: 2px solid $color-border-muted;
}

.status-bar {
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 $padding-sm;
  color: $color-white;
  font-size: $font-size-xxs;
  font-weight: $font-weight-semibold;
}

.status-left,
.status-right {
  display: flex;
  align-items: center;
  gap: $padding-xxs;
  
  i {
    font-size: $font-size-xxs;
  }
}

.app-header {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 $padding-md;
  color: $color-white;
  font-weight: $font-weight-semibold;
  font-size: $font-size-base;
}

.header-menu {
  margin-right: $padding-md;
  font-size: $font-size-lg;
  cursor: pointer;
}

.header-title {
  flex: 1;
}

.app-content {
  flex: 1;
  overflow-y: auto;
  padding: $padding-sm;
  background: $color-white;
  max-height: calc(100% - 74px);
}

.content-item {
  display: flex;
  align-items: center;
  padding: $padding-sm;
  margin-bottom: $margin-xxs;
  border-radius: $border-radius-sm;
  transition: background 0.2s ease;
  
  &:hover {
    background: $color-background-hover;
  }
}

.content-icon {
  width: 8px;
  height: 8px;
  margin-right: $padding-sm;
  color: $color-muted;
  font-size: $font-size-xxs;
}

.content-text {
  color: $color-heading;
  font-size: $font-size-sm;
}

.app-bottom-nav {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 $padding-md;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.nav-button {
  background: $color-button;
  color: $color-white;
  border: none;
  padding: $padding-xs $padding-lg;
  border-radius: $border-radius-md;
  font-weight: $font-weight-semibold;
  font-size: $font-size-sm;
  cursor: pointer;
}

.app-logo-preview {
  width: 250px;
  height: 150px;
  background: $color-black;
}

// Schedule Settings Styles
.schedule-tabs {
  display: flex;
  border-bottom: $border-width-sm solid $color-border-muted;
  margin-bottom: $margin-lg;
  gap: 0;
  background: $color-background-hover;
  padding: 0;
}

.schedule-tab {
  padding: $padding-md $padding-lg;
  background: $color-background-hover;
  border: none;
  border-bottom: 2px solid transparent;
  color: $color-muted;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    color: $color-heading;
  }
  
  &.active {
    color: $color-heading;
    background: $color-white;
    border-bottom-color: transparent;
    font-weight: $font-weight-bold;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: $color-white;
    }
  }
}

.schedule-tab-content {
  min-height: 300px;
}

.schedule-list {
  margin-bottom: $margin-xl;
}

.schedule-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $padding-md;
  margin-bottom: $margin-sm;
  background: $color-background-hover;
  border-radius: $border-radius-md;
  transition: all 0.2s ease;
  
  &:hover {
    background: color.adjust($color-background-hover, $lightness: -2%);
  }
}

.schedule-name {
  color: $color-link;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  text-transform: uppercase;
  flex: 1;
}

.schedule-actions {
  display: flex;
  align-items: center;
  gap: $padding-xs;
}

.action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: $color-muted;
  cursor: pointer;
  border-radius: $border-radius-sm;
  transition: all 0.2s ease;
  
  &:hover:not(.disabled) {
    background: $color-white;
    color: $color-heading;
  }
  
  &.disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  i {
    font-size: $font-size-sm;
  }
}

.delete-btn {
  &:hover {
    background: $color-danger;
    color: $color-white;
  }
}

.schedule-actions-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: $margin-xl;
  padding-top: $margin-lg;
  border-top: $border-width-sm solid $color-border-muted;
}

.notification-btn {
  background: $color-background-hover;
  color: $color-heading;
  border: $border-width-sm solid $color-border-muted;
  padding: $padding-sm $padding-lg;
  border-radius: $border-radius-md;
  font-weight: $font-weight-semibold;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: $color-border-muted;
    border-color: $color-button;
    color: $color-button;
  }
}

.add-btn {
  background: $color-link;
  color: $color-white;
  border: none;
  padding: $padding-sm $padding-lg;
  border-radius: $border-radius-md;
  font-weight: $font-weight-semibold;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: $color-link-hover;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// Financial Info Styles
.financial-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $padding-md;
}

.play-icon-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-link;
  color: $color-white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover {
    background: $color-link-hover;
    transform: scale(1.1);
  }
  
  i {
    font-size: $font-size-sm;
  }
}

.field-with-edit {
  display: flex;
  align-items: center;
  gap: $padding-sm;
  
  .field-input,
  .field-select {
    flex: 1;
  }
}

.edit-link {
  color: $color-link;
  text-decoration: none;
  font-size: $font-size-sm;
  white-space: nowrap;
  transition: color 0.2s ease;
  
  &:hover {
    color: $color-link-hover;
    text-decoration: underline;
  }
}

.income-categories {
  display: flex;
  flex-wrap: wrap;
  gap: $padding-xs;
  flex: 1;
}

.category-tag {
  display: inline-block;
  padding: $padding-xxs $padding-sm;
  background: $color-background-hover;
  color: $color-heading;
  border-radius: $border-radius-sm;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
}

.toggle-field {
  display: flex;
  align-items: center;
  gap: $padding-sm;
  
  .switch {
    flex-shrink: 0;
  }
  
  .toggle-label {
    color: $color-heading;
    font-size: $font-size-sm;
    flex: 1;
    display: flex;
    align-items: center;
    gap: $padding-xxs;
  }
}

// Payment Methods Styles
.payment-methods-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $margin-md;
  gap: $padding-md;
  
  h2 {
    margin: 0;
    flex: 1;
  }
}

.region-selector {
  display: flex;
  align-items: center;
  gap: $padding-xs;
  position: relative;
}

.region-select {
  min-width: 180px;
}

.region-icon {
  color: $color-muted;
  font-size: $font-size-base;
}

.payment-instructions {
  color: $color-muted;
  font-size: $font-size-sm;
  line-height: $line-height-sm;
  margin-bottom: $padding-xs;
  
  .learn-more-link {
    color: $color-link;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.payment-methods-list {
  margin-top: $margin-lg;
}

.payment-method-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $padding-md;
  margin-bottom: $margin-sm;
  background: $color-background-hover;
  border-radius: $border-radius-md;
  transition: all 0.2s ease;
  
  &:hover {
    background: color.adjust($color-background-hover, $lightness: -2%);
  }
}

.method-left {
  display: flex;
  align-items: center;
  gap: $padding-md;
  flex: 1;
}

.method-name {
  color: $color-heading;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
}

.method-right {
  min-width: 200px;
}

.provider-select {
  width: 100%;
}

.integration-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $padding-lg;
  margin-bottom: $margin-lg;
  background: $color-card-bg;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-sm;
}

.integration-logo {
  flex: 1;
}

.paypal-logo {
  display: flex;
  align-items: center;
  gap: $padding-xs;
  
  .paypal-p {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e52e2e;
    color: $color-white;
    border-radius: 50%;
    font-weight: $font-weight-bold;
    font-size: $font-size-lg;
  }
  
  .paypal-text {
    color: #e52e2e;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    letter-spacing: -0.5px;
  }
}

.paysafe-logo {
  display: flex;
  align-items: center;
  gap: $padding-xs;
  
  .paysafe-text {
    color: $color-heading;
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
  }
  
  .paysafe-dots {
    display: flex;
    gap: $padding-xxs;
  }
  
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    
    &.dot-pink {
      background: #ff6b9d;
    }
    
    &.dot-blue {
      background: #e52e2e;
    }
    
    &.dot-green {
      background: #4caf50;
    }
  }
}

.integration-status {
  flex-shrink: 0;
}

.status-btn {
  padding: $padding-xs $padding-md;
  border: none;
  border-radius: $border-radius-md;
  font-weight: $font-weight-semibold;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: $padding-xs;
  
  i {
    font-size: $font-size-xs;
  }
  
  &.status-active {
    background: $color-success;
    color: $color-white;
    
    &:hover {
      background: color.adjust($color-success, $lightness: -10%);
    }
  }
  
  &.status-inactive {
    background: $color-warning;
    color: $color-white;
    
    &:hover {
      background: color.adjust($color-warning, $lightness: -10%);
    }
  }
}

.automated-payments-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $margin-md;
  
  h3 {
    margin: 0;
    flex: 1;
  }
}

.frequency-field {
  display: flex;
  align-items: center;
  gap: $padding-sm;
  
  .frequency-input {
    flex: 1;
    max-width: 200px;
  }
}

.edit-icon-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-md;
  color: $color-muted;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: $color-background-hover;
    border-color: $color-button;
    color: $color-button;
  }
  
  i {
    font-size: $font-size-xs;
  }
}

// Credits Styles
.credits-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: $margin-lg;
  gap: $padding-md;
}

.credits-table-wrapper {
  margin: $margin-lg 0;
  overflow-x: auto;
}

.credits-table {
  width: 100%;
  border-collapse: collapse;
  background: $color-white;
  
  thead {
    background: $color-background-hover;
    
    th {
      padding: $padding-md;
      text-align: left;
      font-weight: $font-weight-semibold;
      font-size: $font-size-sm;
      color: $color-heading;
      border-bottom: $border-width-sm solid $color-border-muted;
    }
  }
  
  tbody {
    tr {
      border-bottom: $border-width-sm solid $color-border-muted;
      transition: background 0.2s ease;
      
      &:hover {
        background: $color-background-hover;
      }
      
      &:last-child {
        border-bottom: none;
      }
    }
    
    td {
      padding: $padding-md;
      font-size: $font-size-sm;
      color: $color-heading;
      vertical-align: middle;
    }
  }
}

.table-actions {
  display: flex;
  align-items: center;
  gap: $padding-xs;
}

.action-icon-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: $border-radius-sm;
  color: $color-muted;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: $color-background-hover;
    
    &.edit-btn {
      color: $color-link;
    }
    
    &.delete-btn {
      color: $color-danger;
      background: rgba($color-danger, 0.1);
    }
  }
  
  i {
    font-size: $font-size-sm;
  }
}

.credits-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: $margin-lg;
  padding-top: $margin-lg;
  border-top: $border-width-sm solid $color-border-muted;
}

.add-credit-btn {
  background: $color-link;
  color: $color-white;
  border: none;
  padding: $padding-sm $padding-lg;
  border-radius: $border-radius-md;
  font-weight: $font-weight-semibold;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: $color-link-hover;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.email-failed-section {
  display: flex;
  flex-direction: column;
  gap: $padding-sm;
  margin-bottom: $margin-lg;
}

// Memberships Styles
.memberships-tabs {
  display: flex;
  border-bottom: $border-width-sm solid $color-border-muted;
  margin-bottom: $margin-lg;
  gap: 0;
}

.membership-tab {
  padding: $padding-md $padding-lg;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: $color-muted;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: $color-heading;
  }
  
  &.active {
    color: $color-heading;
    border-bottom-color: $color-link;
    font-weight: $font-weight-bold;
  }
}

.memberships-content {
  min-height: 400px;
}

.memberships-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: $margin-lg;
  gap: $padding-md;
}

.status-filters {
  display: flex;
  gap: $padding-sm;
  margin-bottom: $margin-xl;
}

.status-filter-btn {
  padding: $padding-sm $padding-lg;
  background: $color-background-hover;
  color: $color-heading;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-md;
  font-weight: $font-weight-semibold;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: $color-border-muted;
    border-color: $color-button;
    color: $color-button;
  }
  
  &.active {
    background: $color-heading;
    color: $color-white;
    border-color: $color-heading;
  }
}

.membership-categories {
  margin-bottom: $margin-xl;
}

.membership-category-section {
  margin-bottom: $margin-xl;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.category-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $color-heading;
  margin-bottom: $margin-md;
  padding-bottom: $padding-sm;
  border-bottom: $border-width-sm solid $color-border-muted;
}

.membership-table-wrapper {
  margin-bottom: $margin-lg;
  overflow-x: auto;
}

.membership-table {
  width: 100%;
  border-collapse: collapse;
  background: $color-white;
  
  thead {
    background: $color-background-hover;
    
    th {
      padding: $padding-md;
      text-align: left;
      font-weight: $font-weight-semibold;
      font-size: $font-size-sm;
      color: $color-heading;
      border-bottom: $border-width-sm solid $color-border-muted;
    }
  }
  
  tbody {
    tr {
      border-bottom: $border-width-sm solid $color-border-muted;
      transition: background 0.2s ease;
      
      &:hover {
        background: $color-background-hover;
      }
      
      &:last-child {
        border-bottom: none;
      }
    }
    
    td {
      padding: $padding-md;
      font-size: $font-size-sm;
      color: $color-heading;
      vertical-align: middle;
    }
  }
}

.view-btn {
  &:hover {
    color: $color-link;
  }
}

.memberships-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: $margin-xl;
  padding-top: $margin-lg;
  border-top: $border-width-sm solid $color-border-muted;
}

.create-membership-btn {
  background: $color-link;
  color: $color-white;
  border: none;
  padding: $padding-sm $padding-lg;
  border-radius: $border-radius-md;
  font-weight: $font-weight-semibold;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: $color-link-hover;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// Membership Modal Form Styles
.form-fields-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $padding-md;
  
  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.field-hint {
  display: block;
  margin-top: $padding-xxs;
  font-size: $font-size-xs;
  color: $color-muted;
}

.required {
  color: $color-danger;
}

.features-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: $padding-sm;
}

.feature-input-row {
  display: flex;
  gap: $padding-sm;
  align-items: center;
  
  .field-input {
    flex: 1;
  }
}

.add-feature-btn,
.remove-feature-btn {
  padding: $padding-xs $padding-sm;
  background: $color-background-hover;
  color: $color-heading;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-sm;
  font-size: $font-size-xs;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: $padding-xxs;
  
  &:hover {
    background: $color-border-muted;
    border-color: $color-button;
    color: $color-button;
  }
  
  i {
    font-size: $font-size-xs;
  }
}

.add-feature-btn {
  align-self: flex-start;
  margin-top: $padding-xs;
}

.remove-feature-btn {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  padding: 0;
  justify-content: center;
  color: $color-danger;
  
  &:hover {
    background: rgba($color-danger, 0.1);
    border-color: $color-danger;
    color: $color-danger;
  }
}

// Webshop Styles
.webshop-tabs {
  display: flex;
  border-bottom: $border-width-sm solid $color-border-muted;
  margin-bottom: $margin-lg;
  gap: 0;
}

.webshop-tab {
  padding: $padding-md $padding-lg;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: $color-muted;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: $color-heading;
  }
  
  &.active {
    color: $color-link;
    border-bottom-color: $color-link;
    font-weight: $font-weight-bold;
  }
}

.webshop-content {
  min-height: 400px;
}

.webshop-intro {
  color: $color-muted;
  font-size: $font-size-sm;
  line-height: $line-height-sm;
  margin-bottom: $margin-xl;
}

.field-with-action {
  display: flex;
  align-items: flex-start;
  gap: $padding-sm;
  
  .field-input,
  .field-textarea {
    flex: 1;
  }
  
  .action-icon-btn {
    margin-top: 0;
    align-self: flex-start;
  }
}

.copy-btn,
.refresh-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-md;
  color: $color-muted;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover {
    background: $color-background-hover;
    border-color: $color-link;
    color: $color-link;
  }
  
  i {
    font-size: $font-size-sm;
  }
}

.add-email-link {
  display: inline-block;
  color: $color-link;
  text-decoration: none;
  font-size: $font-size-sm;
  margin-top: $padding-xs;
  transition: color 0.2s ease;
  
  &:hover {
    color: $color-link-hover;
    text-decoration: underline;
  }
}

.optin-checkboxes {
  margin-left: $margin-lg;
  margin-top: $margin-sm;
  padding-left: $margin-md;
  border-left: 2px solid $color-border-muted;
}

// Hardware & Integrations Styles
.download-section {
  margin-top: $margin-lg;
}

.download-link-card {
  display: flex;
  align-items: center;
  gap: $padding-md;
  padding: $padding-md $padding-lg;
  background: $color-white;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-md;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: $color-background-hover;
    border-color: $color-link;
    box-shadow: $box-shadow-sm;
  }
}

.download-icon {
  color: $color-link;
  font-size: $font-size-xl;
  flex-shrink: 0;
}

.download-content {
  display: flex;
  flex-direction: column;
  gap: $padding-xxs;
  flex: 1;
}

.download-text {
  color: $color-link;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
}

.download-file-info {
  color: $color-muted;
  font-size: $font-size-xs;
}

.created-settings-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: $margin-xl;
  padding-top: $margin-lg;
  border-top: $border-width-sm solid $color-border-muted;
}

.new-btn {
  background: $color-info;
  color: $color-white;
  border: none;
  padding: $padding-sm $padding-lg;
  border-radius: $border-radius-md;
  font-weight: $font-weight-bold;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: color.adjust($color-info, $lightness: -10%);
    transform: translateY(-1px);
    box-shadow: $box-shadow-sm;
  }
  
  &:active {
    transform: translateY(0);
  }
}

// Module Settings Styles
.module-settings-tabs {
  display: flex;
  border-bottom: $border-width-sm solid $color-border-muted;
  margin-bottom: $margin-lg;
  gap: 0;
}

.module-tab {
  padding: $padding-md $padding-lg;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: $color-muted;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: $color-heading;
  }
  
  &.active {
    color: $color-link;
    border-bottom-color: $color-link;
    font-weight: $font-weight-bold;
  }
}

.module-settings-content {
  min-height: 400px;
}

.module-intro {
  color: $color-muted;
  font-size: $font-size-sm;
  line-height: $line-height-sm;
  margin-bottom: $margin-xl;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: $padding-sm;
  margin-top: $padding-xs;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: $padding-sm;
  cursor: pointer;
  padding: $padding-xs 0;
  
  &:hover {
    .radio-text {
      color: $color-link;
    }
  }
}

.field-radio {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: $color-link;
  flex-shrink: 0;
}

.radio-text {
  color: $color-heading;
  font-size: $font-size-sm;
  font-weight: $font-weight-normal;
  transition: color 0.2s ease;
}

// Coach Finder Styles
.coach-finder-table-wrapper {
  margin-top: $margin-lg;
  overflow-x: auto;
}

.coach-finder-table {
  width: 100%;
  border-collapse: collapse;
  background: $color-white;
  
  thead {
    background: $color-background-hover;
    
    th {
      padding: $padding-md;
      text-align: left;
      font-weight: $font-weight-semibold;
      font-size: $font-size-sm;
      color: $color-heading;
      border-bottom: $border-width-sm solid $color-border-muted;
    }
  }
  
  tbody {
    tr {
      border-bottom: $border-width-sm solid $color-border-muted;
      transition: background 0.2s ease;
      
      &:hover {
        background: $color-background-hover;
      }
      
      &:last-child {
        border-bottom: none;
      }
    }
    
    td {
      padding: $padding-md;
      font-size: $font-size-sm;
      color: $color-heading;
      vertical-align: middle;
    }
  }
}

.coach-profile-cell {
  display: flex;
  align-items: center;
  gap: $padding-md;
}

.coach-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: $color-background-hover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.coach-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.coach-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-muted;
  font-size: $font-size-lg;
  background: $color-background-hover;
}

.coach-name-link {
  color: $color-link;
  text-decoration: none;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  transition: color 0.2s ease;
  
  &:hover {
    color: $color-link-hover;
    text-decoration: underline;
  }
}

.status-badge {
  display: inline-block;
  padding: $padding-xxs $padding-sm;
  border-radius: $border-radius-sm;
  font-size: $font-size-xs;
  font-weight: $font-weight-medium;
  
  &.status-declined {
    background: rgba(220, 53, 69, 0.1);
    color: #dc3545;
  }
  
  &.status-no-profile {
    background: $color-background-hover;
    color: $color-muted;
  }
  
  &.status-approved {
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
  }
  
  &.status-pending {
    background: rgba(255, 193, 7, 0.1);
    color: #ffc107;
  }
}

.last-updated-cell {
  display: flex;
  align-items: center;
  gap: $padding-sm;
}

.dash {
  color: $color-muted;
}

.visibility-toggle-cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-icon-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: $color-muted;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: $border-radius-sm;
  
  &:hover {
    background: $color-background-hover;
    color: $color-link;
  }
  
  i {
    font-size: $font-size-xs;
  }
}

// Email Templates Styles
.email-templates-content {
  margin-top: $margin-lg;
}

.template-category {
  margin-bottom: $margin-xl;
  
  &:last-of-type {
    margin-bottom: $margin-lg;
  }
}

.template-list {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: $margin-md;
}

.template-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $padding-sm 0;
  border-bottom: $border-width-sm solid $color-border-muted;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: $color-background-hover;
    margin-left: -$padding-md;
    margin-right: -$padding-md;
    padding-left: $padding-md;
    padding-right: $padding-md;
    border-radius: $border-radius-sm;
  }
}

.template-link {
  color: $color-link;
  text-decoration: none;
  font-size: $font-size-sm;
  font-weight: $font-weight-normal;
  flex: 1;
  transition: color 0.2s ease;
  
  &:hover {
    color: $color-link-hover;
    text-decoration: underline;
  }
}

.template-toggle {
  margin-left: $padding-md;
  flex-shrink: 0;
}

.email-templates-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: $margin-xl;
  padding-top: $margin-lg;
  border-top: $border-width-sm solid $color-border-muted;
}

.advanced-btn {
  background: $color-background-hover;
  color: $color-heading;
  border: $border-width-sm solid $color-border-muted;
  padding: $padding-sm $padding-lg;
  border-radius: $border-radius-md;
  font-weight: $font-weight-semibold;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: $color-border-muted;
    border-color: $color-button;
    color: $color-button;
  }
}

// Marketing Styles
.marketing-section {
  margin-bottom: $margin-xl;
  padding-bottom: $margin-xl;
  border-bottom: $border-width-sm solid $color-border-muted;
  
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
}

.banners-list {
  margin-top: $margin-lg;
  display: flex;
  flex-direction: column;
  gap: $margin-md;
}

.banner-item {
  display: flex;
  align-items: center;
  gap: $padding-lg;
  padding: $padding-md;
  background: $color-white;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-md;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: $box-shadow-sm;
    border-color: $color-link;
  }
}

.banner-image-wrapper {
  width: 200px;
  height: 120px;
  flex-shrink: 0;
  border-radius: $border-radius-sm;
  overflow: hidden;
  background: $color-background-hover;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-text-link {
  flex: 1;
  color: $color-link;
  text-decoration: none;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  transition: color 0.2s ease;
  
  &:hover {
    color: $color-link-hover;
    text-decoration: underline;
  }
}

.banner-actions {
  display: flex;
  align-items: center;
  gap: $padding-sm;
  flex-shrink: 0;
}

.banners-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: $margin-lg;
  padding-top: $margin-lg;
  border-top: $border-width-sm solid $color-border-muted;
}

.join-leave-fields {
  margin-top: $margin-lg;
  display: flex;
  flex-direction: column;
  gap: $margin-lg;
}

.join-leave-field {
  display: flex;
  flex-direction: column;
  gap: $padding-sm;
}

.field-with-actions {
  display: flex;
  align-items: center;
  gap: $padding-sm;
  
  .field-select {
    flex: 1;
  }
}

.field-actions {
  display: flex;
  align-items: center;
  gap: $padding-xs;
  flex-shrink: 0;
}

.add-btn-small {
  &:hover {
    color: $color-success;
  }
}

// Notifications Styles
.notifications-tabs {
  display: flex;
  border-bottom: $border-width-sm solid $color-border-muted;
  margin-bottom: $margin-lg;
  gap: 0;
  background: $color-background-hover;
  padding: $padding-xs;
  border-radius: $border-radius-sm $border-radius-sm 0 0;
}

.notification-tab {
  padding: $padding-sm $padding-lg;
  background: transparent;
  border: none;
  color: $color-muted;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: $border-radius-sm;
  
  &:hover {
    color: $color-heading;
    background: rgba(255, 255, 255, 0.5);
  }
  
  &.active {
    background: $color-white;
    color: $color-heading;
    font-weight: $font-weight-bold;
  }
}

.notifications-content {
  min-height: 400px;
}

.notification-channels-section {
  margin: $margin-lg 0;
}

.notification-channels-table {
  width: 100%;
  border-collapse: collapse;
  background: $color-white;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-md;
  overflow: hidden;
  
  thead {
    background: $color-background-hover;
    
    th {
      padding: $padding-md;
      text-align: center;
      font-weight: $font-weight-semibold;
      font-size: $font-size-sm;
      color: $color-heading;
      border-bottom: $border-width-sm solid $color-border-muted;
      
      &:first-child {
        text-align: left;
      }
    }
  }
  
  tbody {
    tr {
      border-bottom: $border-width-sm solid $color-border-muted;
      transition: background 0.2s ease;
      
      &:hover {
        background: $color-background-hover;
      }
      
      &:last-child {
        border-bottom: none;
      }
    }
    
    td {
      padding: $padding-md;
      font-size: $font-size-sm;
      color: $color-heading;
      vertical-align: middle;
    }
  }
}

.notification-label {
  font-weight: $font-weight-normal;
  color: $color-heading;
  text-align: left;
}

.checkbox-cell {
  text-align: center;
  
  .checkbox-label {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}

.field-with-text {
  display: flex;
  align-items: center;
  gap: $padding-sm;
  
  .field-select {
    flex: 0 0 auto;
    min-width: 150px;
  }
  
  .field-text-suffix {
    color: $color-muted;
    font-size: $font-size-sm;
    white-space: nowrap;
  }
}


.form-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $padding-md;
  margin-bottom: $margin-lg;
}

.form-field {
    display: flex;
  flex-direction: column;
  
  &:nth-child(3) {
    grid-column: 1 / -1;
  }
}

.field-label {
  font-weight: $font-weight-semibold;
  color: $color-heading;
  margin-bottom: $padding-xs;
  font-size: $font-size-sm;
    display: flex;
    align-items: center;
  gap: $padding-xs;
}

.info-icon {
  color: $color-muted;
  font-size: $font-size-xs;
  cursor: help;
  
  &:hover {
    color: $color-button;
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
  
  &.is-invalid {
    border-color: $color-danger;
  }
}

.field-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right $padding-sm center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: $padding-xl;
  appearance: none;
}

.field-textarea {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

.invalid-feedback {
  color: $color-danger;
  font-size: $font-size-xs;
  margin-top: $margin-xxs;
}

.map-section {
  margin-top: $margin-lg;
  border-top: $border-width-sm solid $color-border-muted;
  padding-top: $margin-lg;
}

.additional-fields {
  margin-top: $margin-lg;
  border-top: $border-width-sm solid $color-border-muted;
  padding-top: $margin-lg;
}

.advanced-section {
  margin-top: $margin-lg;
  border-top: $border-width-sm solid $color-border-muted;
  padding-top: $margin-lg;
}

.advanced-header {
  margin-bottom: $margin-lg;
  
  h3 {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $color-heading;
    margin-bottom: $padding-xs;
  }
  
  p {
    color: $color-muted;
    font-size: $font-size-sm;
    margin: 0;
  }
}

.api-key-field {
  display: flex;
  align-items: center;
  min-height: 40px;
}

.api-key-link {
  color: $color-button;
  text-decoration: underline;
  font-size: $font-size-sm;
  cursor: pointer;
  
  &:hover {
    color: $color-button-hover;
  }
}

.checkbox-label {
    display: flex;
    align-items: center;
  gap: $padding-sm;
    cursor: pointer;
  
  .field-checkbox {
    width: 16px;
    height: 16px;
    accent-color: $color-button;
    cursor: pointer;
  }
  
  .checkbox-text {
    font-weight: $font-weight-semibold;
    color: $color-heading;
    font-size: $font-size-sm;
  }
}

.map-tabs {
  display: flex;
  gap: 0;
  margin-bottom: $padding-md;
}

.map-tab {
  background: transparent;
  border: $border-width-sm solid $color-border-muted;
  border-bottom: 3px solid transparent;
  padding: $padding-xs $padding-md;
  cursor: pointer;
  color: $color-muted;
  font-weight: $font-weight-semibold;
  border-radius: $border-radius-md $border-radius-md 0 0;
  transition: all 0.2s ease;
  
  &.active {
    color: $color-button;
    border-color: $color-button;
    background: $color-white;
  }
  
  &:hover:not(.active) {
    background: $color-background-hover;
  }
}

.map-container {
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-md;
  overflow: hidden;
  height: 400px;
  position: relative;
  
  // Fullscreen styles
  &:fullscreen {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
  
  &:-webkit-full-screen {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
  
  &:-moz-full-screen {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
  
  &:-ms-fullscreen {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
}

.google-map {
  width: 100%;
  height: 100%;
  border-radius: $border-radius-md;
}

.map-placeholder {
  width: 100%;
  height: 100%;
  background: $color-input-bg;
  position: relative;
    display: flex;
    align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(45deg, $color-border-muted 25%, transparent 25%),
      linear-gradient(-45deg, $color-border-muted 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, $color-border-muted 75%),
      linear-gradient(-45deg, transparent 75%, $color-border-muted 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    opacity: 0.3;
  }
}

.map-pin {
    width: 20px;
    height: 20px;
  background: $color-danger;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
    position: relative;
  z-index: 2;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background: $color-white;
    border-radius: 50%;
  }
}

.map-controls {
  position: absolute;
  top: $padding-md;
  right: $padding-md;
  display: flex;
  flex-direction: column;
  gap: $padding-xs;
  z-index: 1000;
}

.map-control-btn {
  width: 40px;
  height: 40px;
  background: $color-white;
  border: $border-width-sm solid $color-border-muted;
  border-radius: $border-radius-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: $box-shadow-sm;
  
  &:hover {
    background: $color-background-hover;
    border-color: $color-button;
    box-shadow: $box-shadow-md;
  }
  
  i {
    color: $color-heading;
    font-size: $font-size-sm;
  }
}

.form-actions {
  margin-top: $margin-lg;
  display: flex;
  justify-content: flex-end;
  gap: $padding-sm;
}

.advanced-btn {
  background: $color-background-hover;
  color: $color-heading;
  border: $border-width-sm solid $color-border-muted;
  padding: $padding-sm $padding-lg;
  border-radius: $border-radius-md;
  font-weight: $font-weight-semibold;
  font-size: $font-size-sm;
    cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: $color-border-muted;
    border-color: $color-button;
    color: $color-button;
  }
  
  &:active {
        transform: translateY(0);
    }
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
  .settings-layout {
    grid-template-columns: 1fr;
    gap: $padding-md;
  }
  
  .form-fields {
    grid-template-columns: 1fr;
  }
  
  .content-card {
    padding: $padding-md;
  }
  
  .page-title h1 {
    font-size: $font-size-xl;
  }
}

// Payment Gateway Styles
.gateway-config-section {
  margin-top: $margin-lg;
  padding: $padding-lg;
  background: $color-card-bg;
  border-radius: $border-radius-md;
  border: $border-width-sm solid $color-border-muted;
  
  .section-subtitle {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $color-heading;
    margin-bottom: $margin-md;
    display: flex;
    align-items: center;
    
    i {
      color: $color-link;
    }
  }
}

.no-gateway-message {
  text-align: center;
  padding: $padding-xl;
  background: $color-card-bg;
  border-radius: $border-radius-md;
  border: $border-width-sm solid $color-border-muted;
  margin-top: $margin-lg;
  
  i {
    font-size: 2rem;
    color: $color-muted;
    margin-bottom: $margin-md;
  }
  
  h4 {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $color-muted;
    margin-bottom: $padding-sm;
  }
  
  p {
    color: $color-muted;
    font-size: $font-size-sm;
    margin: 0;
  }
}

.field-description {
  font-size: $font-size-xs;
  color: $color-muted;
  margin-top: $padding-xs;
  margin-bottom: $padding-sm;
}

// Email Templates Styles
.email-templates-container {
  max-width: 100%;
}

.template-section {
  margin-bottom: $margin-xl;
  
  .section-header {
    display: flex;
    // align-items: center;
    // justify-content: flex-start;
    // margin-bottom: $margin-lg;
    // padding: $padding-md;
    // background: $color-white;
    // border-radius: $border-radius-md;
    // box-shadow: $box-shadow-sm;
    // border-left: $border-width-md solid $color-link;
    
    .section-icon {
      background: $color-link;
      color: $color-white;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: $margin-md;
      font-size: $font-size-lg;
      flex-shrink: 0;
    }
    
    .section-content {
      flex: 1;
      
      .section-title {
        color: $color-heading;
        font-size: $font-size-xl;
        font-weight: $font-weight-semibold;
        margin: 0 0 $padding-xs 0;
      }
      
      .section-description {
        color: $color-muted;
        font-size: $font-size-sm;
        margin: 0;
      }
    }
  }
}

.template-card {
  background: $color-white;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-md;
  border: $border-width-sm solid $color-border-muted;
  overflow: hidden;
}

.main-tabs-wrapper {
  margin-top: 10px;
  
  .main-email-tabs {
    .nav-tabs {
      background: $color-card-bg;
      border-bottom: $border-width-sm solid $color-border-muted;
      display: flex;
      // flex-wrap: nowrap;
      white-space: nowrap;
      margin: 0;
      padding: 0;
      
      .nav-item {
        flex-shrink: 0;
        margin: 0;
        
        .nav-link {
          border: none;
          background: transparent;
          color: $color-muted;
          font-weight: $font-weight-medium;
          font-size: $font-size-sm;
          padding: $padding-sm $padding-md;
          white-space: nowrap;
          margin: 0;
          min-width: auto;
          
          &.active {
            color: $color-link;
            background: $color-white;
            border-bottom: $border-width-md solid $color-link;
          }
        }
      }
    }
    
    .tab-title-content {
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      font-size: $font-size-sm;
      
      i {
        font-size: 14px;
      }
    }
  }
}

.email-tabs {
  .nav-tabs {
    background: $color-card-bg;
    border-bottom: $border-width-sm solid $color-border-muted;
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    margin: 0;
    padding: 0;
    gap: 0;
    border-spacing: 0;
    
    .nav-item {
      flex-shrink: 0;
      margin: 0 !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      
      .nav-link {
        border: none;
        background: transparent;
        color: $color-muted;
        font-weight: $font-weight-normal;
        font-size: 10px;
        padding: 4px 6px !important;
        white-space: nowrap;
        margin: 0 !important;
        min-width: auto;
        line-height: 1.1;
        
        &.active {
          color: $color-link;
          background: $color-white;
          border-bottom: $border-width-md solid $color-link;
        }
      }
    }
  }
  
  .tab-title-content {
    display: flex;
    align-items: center;
    gap: 2px;
    white-space: nowrap;
    font-size: 10px;
    
    i {
      font-size: 9px;
      margin: 0;
    }
  }
}

.tab-content-custom {
  padding: $padding-lg;
}

.email-form {
  .available-tags-section {
    border: $border-width-sm solid rgba($color-link, 0.3);
    border-radius: $border-radius-md;
    padding: $padding-md;
    margin-bottom: $margin-lg;
    
    .tags-header {
      color: $color-link;
      font-size: $font-size-sm;
      margin-bottom: $margin-sm;
      display: flex;
      align-items: center;
      gap: $padding-xs;
    }
    
    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: $margin-xs;
      
      .tag-item {
        background: $color-white;
        color: $color-link;
        padding: $padding-xs $padding-sm;
        border-radius: $border-radius-sm;
        font-size: $font-size-xs;
        font-family: 'Courier New', monospace;
        border: $border-width-sm solid rgba($color-link, 0.2);
      }
    }
  }
  
  .form-section {
    .form-group {
      margin-bottom: $margin-lg;
      
      .form-label {
        color: $color-heading;
        font-weight: $font-weight-semibold;
        font-size: $font-size-sm;
        margin-bottom: $margin-sm;
        display: flex;
        align-items: center;
        gap: $padding-xs;
        
        i {
          color: $color-link;
        }
      }
      
      .custom-input {
        border: $border-width-sm solid $color-border;
        border-radius: $border-radius-md;
        padding: $padding-md;
        font-size: $font-size-sm;
        transition: all 0.3s ease;
        width: 100%;
        
        &:focus {
          border-color: $color-link;
          box-shadow: 0 0 0 0.2rem rgba($color-link, 0.15);
          outline: none;
        }
      }
      
      .editor-container {
        border: $border-width-sm solid $color-border;
        border-radius: $border-radius-md;
        overflow: hidden;
        
        .custom-editor {
          .ql-toolbar {
            background: $color-card-bg;
            border-bottom: $border-width-sm solid $color-border-muted;
          }
          
          .ql-container {
            min-height: 200px;
            font-size: $font-size-sm;
          }
        }
      }
    }
  }
  
  .form-actions {
    padding-top: $padding-md;
    border-top: $border-width-sm solid $color-border-muted;
    
    .custom-btn {
      background: $color-link;
      border: none;
      border-radius: $border-radius-md;
      padding: 10px 20px;
      font-weight: $font-weight-semibold;
      font-size: $font-size-sm;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: $padding-xs;
      color: $color-white;
      
      &:hover:not(:disabled) {
        background: color.adjust($color-link, $lightness: -10%);
        transform: translateY(-1px);
        box-shadow: $box-shadow-md;
      }
      
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
      
      &.btn-secondary {
        background: $color-muted;
        
        &:hover {
          background: color.adjust($color-muted, $lightness: -10%);
        }
      }
    }
  }
}

// Mail Settings Styles
.mail-settings-form {
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
    background: #e52e2e;
    color: $color-white;
    
    &:hover:not(:disabled) {
      background: #c52626;
      transform: translateY(-2px);
      box-shadow: $box-shadow-md;
    }
    
    &:active:not(:disabled) {
      background: #a01f1f;
      transform: translateY(0);
    }
  }
  
  .text-primary {
    color: #e52e2e !important;
  }
  
  .text-info {
    color: #e52e2e !important;
  }
  
  .spinner-primary {
    border-color: #e52e2e !important;
  }
  
  .alert-info {
    background-color: rgba(229, 46, 46, 0.1) !important;
    border-color: rgba(229, 46, 46, 0.3) !important;
    color: #e52e2e !important;
    
    .fas, .fa-info-circle {
      color: #e52e2e !important;
    }
  }
  
  .btn-info {
    background-color: #e52e2e !important;
    border-color: #e52e2e !important;
    color: #ffffff !important;
    
    &:hover {
      background-color: #c52626 !important;
      border-color: #c52626 !important;
    }
  }
  
  .badge-info {
    background-color: #e52e2e !important;
    color: #ffffff !important;
  }
  
  a, .link, .btn-link {
    color: #e52e2e !important;
    
    &:hover {
      color: #c52626 !important;
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

  .invalid-feedback {
    display: block;
    width: 100%;
    margin-top: $margin-xs;
    font-size: $font-size-xs;
    color: $color-danger;
    line-height: $line-height-base;
  }
}

/* Video Tutorial Modal Styles */
.video-tutorial-modal {
  .modal-content {
    border: none;
    border-radius: 16px;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  }

  .modal-header {
    background: #f5f5f3;
    color: #252525;
    border-bottom: none;
    padding: 1.5rem 2rem;

    .modal-title {
      font-family: "Inter", Arial, sans-serif;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
    }
  }

  .modal-body {
    padding: 2rem;
    background: #f5f5f3;
    color: #252525;
  }

  .video-container {
    position: relative;

    .video-loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(245, 245, 243, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      border-radius: 8px;
    }

    video {
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      background: #000;
      display: block;
    }
  }

  // Subscriber Invoices Styles
  .summary-card {
    background: #fff;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 1rem;
    text-align: center;
    
    .summary-label {
      font-size: 0.875rem;
      color: #6c757d;
      margin-bottom: 0.5rem;
    }
    
    .summary-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: #212529;
    }
  }

  .gym-header-row:hover {
    background-color: #e9ecef !important;
  }

  .badge {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }
}
// Payment Panel Styles
.payment-panel {
  position: fixed;
  top: 0;
  right: -100%;
  width: 420px;
  height: 100vh;
  background: #ffffff;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;

  &.payment-panel-open {
    right: 0;
  }

  .payment-panel-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9998;
    backdrop-filter: blur(2px);
  }

  .payment-panel-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #ffffff;
    z-index: 10000;
    position: relative;
  }

  .payment-panel-header {
    padding: 24px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;

    h3 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: #1a1a1a;
      letter-spacing: -0.02em;
    }

    .btn-link {
      padding: 8px;
      font-size: 1.25rem;
      line-height: 1;
      text-decoration: none;
      color: #6b7280;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;

      &:hover {
        color: #1a1a1a;
        background: #f5f5f5;
      }
    }
  }

  .payment-panel-body {
    padding: 24px;
    overflow-y: auto;
    flex: 1;
    background: #fafafa;

    // Invoice Card
    .invoice-card {
      background: #ffffff;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

      .invoice-amount {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #f0f0f0;
        margin-bottom: 20px;

        .amount-label {
          display: block;
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 8px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .amount-value {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
          letter-spacing: -0.02em;
        }
      }

      .invoice-details {
        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f5f5f5;

          &:last-child {
            border-bottom: none;
          }

          .detail-label {
            font-size: 0.875rem;
            color: #6b7280;
            font-weight: 500;
          }

          .detail-value {
            font-size: 0.875rem;
            color: #1a1a1a;
            font-weight: 600;
            text-align: right;
          }
        }
      }
    }

    // Payment Form
    .payment-form {
      .payment-error {
        background: #fee2e2;
        border: 1px solid #fecaca;
        color: #991b1b;
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 8px;

        i {
          font-size: 1rem;
        }
      }

      .card-input-section {
        margin-bottom: 24px;

        .card-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }

        #stripe-card-element {
          padding: 14px 16px;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          background: #ffffff;
          transition: all 0.2s ease;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

          &:focus-within {
            border-color: #e52e2e;
            box-shadow: 0 0 0 3px rgba(229, 46, 46, 0.1);
          }
        }

        #stripe-card-errors {
          font-size: 0.8125rem;
          color: #dc2626;
          margin-top: 8px;
          min-height: 20px;
          font-weight: 500;
        }
      }

      .pay-button {
        width: 100%;
        padding: 14px 24px;
        font-size: 1rem;
        font-weight: 600;
        color: #ffffff;
        background: #e52e2e;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(229, 46, 46, 0.2);

        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          .spinner {
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: #ffffff;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
          }

          i {
            font-size: 1rem;
          }
        }

        &:hover:not(:disabled) {
          background: #c52626;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(229, 46, 46, 0.3);
        }

        &:active:not(:disabled) {
          transform: translateY(0);
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
      }
    }

    // Success State
    .payment-success {
      text-align: center;
      padding: 40px 20px;

      .success-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 20px;
        background: #d1fae5;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          font-size: 2rem;
          color: #10b981;
        }
      }

      h4 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1a1a1a;
        margin-bottom: 8px;
      }

      p {
        font-size: 0.875rem;
        color: #6b7280;
        margin: 0;
      }
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .payment-panel {
    width: 100%;
  }
}

// Invoices Table Styles - Enterprise Level
.invoices-table-wrapper {
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.invoices-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;

  thead {
    background: #f9fafb;
    border-bottom: 2px solid #e5e7eb;

    th {
      padding: 14px 16px;
      text-align: left;
      font-weight: 600;
      font-size: 0.8125rem;
      color: #374151;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      white-space: nowrap;

      &.text-right {
        text-align: right;
      }
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #f3f4f6;
      transition: background-color 0.15s ease;

      &:hover {
        background-color: #f9fafb;
      }

      &:last-child {
        border-bottom: none;
      }
    }

    td {
      padding: 16px;
      color: #1f2937;
      vertical-align: middle;

      &.invoice-number-cell {
        .invoice-number {
          font-weight: 600;
          color: #111827;
          font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
          font-size: 0.875rem;
        }
      }

      &.amount-cell {
        font-weight: 600;
        color: #111827;
        font-size: 0.9375rem;
      }

      &.actions-cell {
        text-align: right;
      }
    }
  }

  .status-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;
    letter-spacing: 0.02em;

    &.badge-warning {
      background: #fef3c7;
      color: #92400e;
    }

    &.badge-success {
      background: #d1fae5;
      color: #065f46;
    }

    &.badge-danger {
      background: #fee2e2;
      color: #991b1b;
    }

    &.badge-secondary {
      background: #f3f4f6;
      color: #374151;
    }
  }

  .pay-button {
    padding: 6px 14px;
    background: #e52e2e;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
    white-space: nowrap;

    &:hover:not(:disabled) {
      background: #c52626;
    }

    &:active:not(:disabled) {
      background: #a01f1f;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .text-muted {
    color: #9ca3af;
    font-size: 0.875rem;
  }
}

// Global overrides for Bootstrap info classes and links
.settings-page {
  .alert-info {
    background-color: rgba(229, 46, 46, 0.1) !important;
    border-color: rgba(229, 46, 46, 0.3) !important;
    color: #e52e2e !important;
    
    .fas, .fa-info-circle {
      color: #e52e2e !important;
    }
  }

  .btn-info {
    background-color: #e52e2e !important;
    border-color: #e52e2e !important;
    color: #ffffff !important;
    
    &:hover {
      background-color: #c52626 !important;
      border-color: #c52626 !important;
    }
  }

  .badge-info {
    background-color: #e52e2e !important;
    color: #ffffff !important;
  }

  a, .link, .btn-link, .edit-link, .api-key-link, .coach-name-link, .change-link, .download-link, .template-link, .banner-text-link, .add-email-link {
    color: #e52e2e !important;
    
    &:hover {
      color: #c52626 !important;
    }
  }
}

@media (max-width: 1024px) {
  .invoices-table-wrapper {
    overflow-x: auto;
  }

  .invoices-table {
    min-width: 800px;
  }
}
</style>